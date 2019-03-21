import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';

import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { throttle } from '@firestitch/common';

import 'hammerjs';

import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfDay,
  endOfMonth,
  endOfYear,
  format,
  getDaysInMonth,
  isAfter,
  isValid,
  isWithinInterval,
  lightFormat,
  startOfDay,
  startOfMonth,
  startOfYear,
  subDays,
  subMonths
} from 'date-fns';

import { FsHammerConfig } from '../../configs/hammer.config';
import { FsDatePickerModel } from '../../services/model.service';
import { FsDatePickerCommon } from '../../services/common.service';


@Component({
    selector: 'fs-date-picker-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    providers: [
      {
        provide: HAMMER_GESTURE_CONFIG,
        useClass: FsHammerConfig
      }
    ]
})
export class FsDatePickerCalendarComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  public date: Date = null;

  @Input()
  public highlightStartDate = null;
  @Input()
  public highlightEndDate = null;

  @Input()
  public dateMode = null;
  @Input()
  public disabledDays = null;
  @Input()
  public drawMonth = null;

  @Output()
  public onChange = new EventEmitter<any>();
  @Output()
  public onDateModeChange = new EventEmitter<any>();
  @Output()
  public onDrawMonth = new EventEmitter<any>();
  @Output()
  public hoverDay = new EventEmitter<any>();
  @Output()
  public mouseLeaveCalendar = new EventEmitter<any>();

  public selected: any = {};
  public iscrollOptions = null;
  public iscrollInstance = null;
  public month = null;
  public years = [];
  public dateDays = [];

  public monthList = [
    { value: 1, name: 'January', abr: 'Jan', disabled: false },
    { value: 2, name: 'February', abr: 'Feb', disabled: false },
    { value: 3, name: 'March', abr: 'Mar', disabled: false },
    { value: 4, name: 'April', abr: 'Apr', disabled: false },
    { value: 5, name: 'May', abr: 'May', disabled: false },
    { value: 6, name: 'June', abr: 'June', disabled: false },
    { value: 7, name: 'July', abr: 'July', disabled: false },
    { value: 8, name: 'August', abr: 'Aug', disabled: false },
    { value: 9, name: 'September', abr: 'Sept', disabled: false },
    { value: 10, name: 'October', abr: 'Oct', disabled: false },
    { value: 11, name: 'November', abr: 'Nov', disabled: false },
    { value: 12, name: 'December', abr: 'Dec', disabled: false }
  ];

  public currentDate = new Date();
  public today: any = {
    date: format(this.currentDate, 'yyyy-MM-dd'),
    month: this.currentDate.getMonth(),
    year: this.currentDate.getFullYear()
  };

  public highlightedRangeDays = null;

  constructor(
    public element: ElementRef,
    public fsDatePickerModel: FsDatePickerModel,
    private fsDatePickerCommon: FsDatePickerCommon,
  ) {}

  public ngOnInit() {

    this.createYearsList();
    this.updateMonthsListDisabledStatus();

    // if (['date', 'datetime'].indexOf(this.fsDatePickerModel.view) !== -1) {
    //   setTimeout(() => {
    //     const $date = this.element.nativeElement.querySelector('.calendar-container');
    //     $date.addEventListener('mousewheel', this.dateScroll);
    //   });
    // }
  }

  public ngOnDestroy() {
    // if (['date', 'datetime'].indexOf(this.fsDatePickerModel.view) !== -1) {
    //   const $date = this.element.nativeElement.querySelector('.calendar-container');
    //   $date.removeEventListener('mousewheel', this.dateScroll);
    // }
  }

  public ngOnChanges(changes) {
    if (changes) {

      if (changes.date) {
        // this.onDrawMonth.emit(this.fsDatePickerCommon.getMomentSafe(this.date));
        this.selected = this.fsDatePickerCommon.getSelected(this.date);
        this.updateDaysHighlighted();
      } else if (changes.highlightStartDate || changes.highlightEndDate) {
        this.updateDaysHighlighted();
      }

      if (changes.drawMonth) {
        if (changes.drawMonth.currentValue) {
          this.drawMonths(changes.drawMonth.currentValue);
        } else {
          this.onDrawMonth.emit(this.fsDatePickerCommon.createMoment());
        }
      }
    }
  }

  public onMouseEnterDay(day) {
    this.hoverDay.emit(day);
  }

  public onMouseLeaveCalendar() {
    this.mouseLeaveCalendar.emit();
  }

  public updateDaysHighlighted() {

    this.highlightedRangeDays = {
      data: {},
      min: null,
      max: null
    };

    let start = null;
    let end = null;

    if (this.highlightStartDate) {

      this.highlightEndDate = this.highlightEndDate || this.highlightStartDate;

      if (isAfter(this.highlightStartDate, this.highlightEndDate)) {
        start = this.highlightEndDate;
        end = this.highlightStartDate;
      } else {
        start = this.highlightStartDate;
        end = this.highlightEndDate;
      }

      start = startOfDay(start);
      end = startOfDay(end);

      const range = Array.from(eachDayOfInterval({ start, end }));

      if (!range.length) {
        return;
      }

      for (const day of range) {
        this.highlightedRangeDays.data[lightFormat(day, 'yyyy-MM-dd')] = true;
      }

      this.highlightedRangeDays.min = lightFormat(range[0], 'yyyy-MM-dd');
      this.highlightedRangeDays.max = lightFormat(range[range.length - 1], 'yyyy-MM-dd');
    }
  }

  public isDayDisabled(date) {
    const startDay = startOfDay(date);
    const endDay = endOfDay(date);

    return this.isRangeDisabled(startDay, endDay);
  }

  public isMonthDisabled(date) {
    const startMonth = startOfMonth(date);
    const endMonth = endOfMonth(date);

    return this.isRangeDisabled(startMonth, endMonth);
  }

  public isYearDisabled(date) {
    const startYear = startOfYear(date);
    const endYear = endOfYear(date);

    return this.isRangeDisabled(startYear, endYear);
  }

  public isRangeDisabled(start, end) {
    if (!this.disabledDays) {
      return false;
    }

    for (let i = 0; i < this.disabledDays.length; i++) {
      const value = this.disabledDays[i];

      const startDay = startOfDay(value[0]);
      const endDay = endOfDay(value[1]);

      const startDayIntersectWithDisabled =
        isWithinInterval(start, { start: startDay, end: endDay })
        || lightFormat(start, 'yyyy-MM-dd') === lightFormat(value[0], 'yyyy-MM-dd');

      const endDayIntersectWithDisabled =
        isWithinInterval(end, { start: startDay, end: endDay })
        || lightFormat(end, 'yyyy-MM-dd') === lightFormat(value[1], 'yyyy-MM-dd');

      if (startDayIntersectWithDisabled && endDayIntersectWithDisabled) {
          return true;
      }
    }
    return false;
  }

  public monthClick(month) {
    Object.assign(month.months, this.monthList);
  }

  public monthViewChange(month) {
    const monthDate = new Date(this.month);
    monthDate.setFullYear(this.month.year, month - 2);

    if (this.isMonthDisabled(monthDate)) {
      return;
    }
    this.setMonth(month);
    this.calendarView();
  }

  public monthChange(month) {

    if (!this.date) {
      this.createModel();
    }

    const newDate = new Date(this.date);
    newDate.setMonth(month - 1);

    this.setDate(newDate);
  }

  public createModel() {
    if (!this.date) {
      this.date = this.fsDatePickerCommon.createMoment();
    }
  }

  public setDate(date) {
    this.date = date;
    this.onChange.emit(date);
  }

  public calendarView() {
    this.onDateModeChange.emit('date');
  }

  public monthView() {
    this.updateMonthsListDisabledStatus();
    this.onDateModeChange.emit('month');
  }

  public yearView(year) {
    this.iscrollOptions = { scrollToElement: `.years .data-year-${ year }` };
    this.onDateModeChange.emit('year');
  }

  /**
   *
   * @param day
   * @param event
   */
  public dayClick(day, event) {
    if (day.disabled) {
      return;
    }

    if (!this.date) {
      this.createModel();
    }

    const date = new Date(this.date);
    date.setFullYear(day.year);
    date.setMonth(day.month);
    date.setDate(day.number);

    this.setDate(date);
  }

  public yearViewChange(year) {
    if (this.isYearDisabled(new Date().setFullYear(year))) {
      return;
    }
    // For some reason for mobile devices click event fired for both year/day modes. setTimeout fix this problem
    setTimeout(() => {
      this.setYear(year);
      this.calendarView();
    });
  }

  public yearChange(year) {

    if (!this.date) {
      this.createModel();
    }

    this.setDate((new Date(this.date).setFullYear(year)));
  }

  public previousMonth(month) {
    const prevMonth = subMonths(month.date, 1);
    if (this.isMonthDisabled(prevMonth)) {
      return;
    }
    this.onDrawMonth.emit(prevMonth);
  }

  public nextMonth(month) {
    const nextMonth = addMonths(month.date, 1);
    if (this.isMonthDisabled(nextMonth)) {
      return;
    }
    this.onDrawMonth.emit(nextMonth);
  }

  public setMonth(monthNumber) {
    const month = new Date(this.month.date);
    month.setMonth(monthNumber - 1);

    this.onDrawMonth.emit(month);
  }

  public setYear(yearNumber) {
    const year = new Date(this.month.datelightFormat).setFullYear(yearNumber);
    this.onDrawMonth.emit(year);
  }

  public drawMonths(date) {
    this.onDrawMonth.emit(date);
    this.month = this.createMonth(date);
  }

  public createMonth(date: Date) {
    date = new Date(date);
    date.setDate(1);

    const days = [], weeks = [];
    let week = [];
    let md = subDays(date, date.getDay());

    const daysInMonth = getDaysInMonth(date);
    const totalDays = daysInMonth + date.getDay() + (6 - addMonths(date, 1).getDay() + 1);

    for (let d = 0; d < totalDays; d++) {
      const dayNumber = lightFormat(md, 'dd');
      days.push({ number: dayNumber });

      if (d % 7 == 0) {
        week = [];
        weeks.push(week);
      }

      week.push({
        mute: (d - date.getDay() < 0 || ((d - date.getDay() + 1) > daysInMonth)),
        date: lightFormat(md, 'yyyy-MM-dd'),
        number: dayNumber,
        month: md.getMonth(),
        year: md.getFullYear(),
        disabled: this.isDayDisabled(md)
      });

      md = addDays(md, 1);
    }

    const monthName = format(date, 'MMMM');

    return {
      name: format(date, 'MMMM'),
      number: date.getMonth(),
      year: date.getFullYear(),
      date: date,
      monthAndYear: `${date.getFullYear()}-${date.getMonth()}`,
      weeks: weeks,
      months: [{ name: monthName, value: date.getMonth() }],
      years: [ date.getFullYear() ]
    }
  }

  public createYearsList() {
    this.years = [];
    for (let y: any = this.fsDatePickerModel.minYear; y < this.fsDatePickerModel.maxYear; y++) {
      const year = new Date().setFullYear(y);
      this.years.push({ value: y, disabled: this.isYearDisabled(year) });
    }
  }

  public updateMonthsListDisabledStatus() {
    const year = this.month ? this.month.year : this.currentDate.getFullYear();

    for (const item of this.monthList) {
      const month = new Date();
      month.setFullYear(year);
      month.setMonth(item.value - 1);
      item.disabled = this.isMonthDisabled(month);
    }
  }

  public updateDateDays() {
    const year = this.selected['year'] || 1904;
    const month = this.selected['month'] || 1;
    const max = new Date(year, month, 0).getDate();
    this.dateDays = [];
    for (let d = 1; d <= max; d++) {
      this.dateDays.push(d);
    }

    return this.dateDays;
  }

  public monthDateViewChange() {
    this.updateDateDays();
    this.updateDate();
  }

  public dayDateViewChange() {
    this.updateDateDays();
    this.updateDate();

  }

  public yearDateViewChange() {
    this.updateDateDays();
    this.updateDate();
  }

  public updateDate() {

    const m = new Date(this.selected['year'], this.selected['month'] - 1, this.selected['day']);
    const max = new Date(this.selected['year'] || 1904, this.selected['month'], 0).getDate();

    if (max < this.selected['day']) {
      this.selected['day'] = null;
    }

    if (m && isValid(m)) {
      this.setDate(m);
    }
  }

  private dateScroll = throttle((e) => {

    // @TODO need better way to detect mobile devices
    if (window.innerWidth <= 499) {
      return;
    }

    if (e.wheelDelta > 0) {
      this.nextMonth(this.month);
    } else {
      this.previousMonth(this.month);
    }
  }, 50);

}

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

import * as moment_ from 'moment-timezone';
const moment = moment_;

import { extendMoment } from 'moment-range';

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
  public date = null;

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

  public today: any = {
    date: moment().format('YYYY-MM-DD'),
    month: moment().format('M'),
    year: parseInt(moment().format('YYYY'))
  };

  public highlightedRangeDays = null;

  private SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  constructor(
    public element: ElementRef,
    public fsDatePickerModel: FsDatePickerModel,
    private fsDatePickerCommon: FsDatePickerCommon,
  ) {
    extendMoment(moment);
  }

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
      }else if (changes.highlightStartDate || changes.highlightEndDate) {
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

      if (moment(this.highlightStartDate).isAfter(this.highlightEndDate)) {
        start = this.highlightEndDate;
        end = this.highlightStartDate;
      } else {
        start = this.highlightStartDate;
        end = this.highlightEndDate;
      }

      start = moment(start).startOf('day');
      end = moment(end).startOf('day');

      const range = Array.from(moment.range(start, end).by('days'));

      if (!range.length) {
        return;
      }

      for (const day of range) {
        this.highlightedRangeDays.data[moment(day).format('YYYY-MM-DD')] = true;
      }

      this.highlightedRangeDays.min = moment(range[0]).format('YYYY-MM-DD');
      this.highlightedRangeDays.max = moment(range[range.length - 1]).format('YYYY-MM-DD');
    }
  }

  public isDayDisabled(date) {
   return this.isRangeDisabled(moment(date).startOf('day'), moment(date).endOf('day'));
  }

  public isMonthDisabled(date) {
    return this.isRangeDisabled(moment(date).startOf('month'), moment(date).endOf('month'));
  }

  public isYearDisabled(date) {
    return this.isRangeDisabled(moment(date).startOf('year'), moment(date).endOf('year'));
  }

  public isRangeDisabled(start, end) {
    if (!this.disabledDays) {
      return false;
    }

    for (let i = 0; i < this.disabledDays.length; i++) {
      const value = this.disabledDays[i];

      const startDayIntersectWithDisabled =
        start.isBetween(value[0].startOf('day'), value[1].endOf('day'))
        || start.format('YYYY-MM-DD') === value[0].format('YYYY-MM-DD');

      const endDayIntersectWithDisabled =
        end.isBetween(value[0].startOf('day'), value[1].endOf('day'))
        || end.format('YYYY-MM-DD') === value[1].format('YYYY-MM-DD');

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
    if (this.isMonthDisabled(moment(this.month.moment).year(this.month.year).month(month - 1))) {
      return;
    }
    this.setMonth(month);
    this.calendarView();
  }

  public monthChange(month) {

    if (!this.date) {
      this.createModel();
    }

    this.setDate(this.date.clone().month(month - 1));
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

    const date = this.date
          .clone()
          .year(day.year)
          .month(day.month - 1)
          .date(day.number);

    this.setDate(date);
  }

  public yearViewChange(year) {
    if (this.isYearDisabled(moment().year(year))) {
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

    this.setDate(this.date.clone().year(year));
  }

  public previousMonth(month) {
    if (this.isMonthDisabled(month.moment.clone().subtract(1, 'months'))) {
      return;
    }
    this.onDrawMonth.emit(month.moment.subtract(1, 'months'));
  }

  public nextMonth(month) {
    if (this.isMonthDisabled(month.moment.clone().add(1, 'months'))) {
      return;
    }
    this.onDrawMonth.emit(month.moment.add(1, 'months'));
  }

  public setMonth(monthNumber) {
    this.onDrawMonth.emit(moment(this.month.moment).set('month', monthNumber - 1));
  }

  public setYear(yearNumber) {
    this.onDrawMonth.emit(moment(this.month.moment).set('year', yearNumber));
  }

  public drawMonths(date) {
    this.onDrawMonth.emit(date);
    this.month = this.createMonth(date);
  }

  public createMonth(date) {
    date = date.clone().date(1);

    let week = [];
    const days = [], weeks = [];
    const md = date.clone();

    md.subtract(date.day(), 'day');
    const daysInMonth = date.daysInMonth();

    for (let d = 0; d < daysInMonth + date.day() + (6 - date.clone().add(1, 'month').day() + 1); d++) {
      const dayNumber = md.format('DD');
      days.push({ number: dayNumber });

      if (d % 7 == 0) {
        week = [];
        weeks.push(week);
      }

      week.push({ mute: (d - date.day() < 0 || ((d - date.day() + 1) > daysInMonth)),
            date: md.format('YYYY-MM-DD'),
            number: md.format('D'),
            month: md.format('M'),
            year: md.format('YYYY'),
            disabled: this.isDayDisabled(md) });

      md.add(1, 'day');
    }

    return {name: date.format('MMMM'),
        number: date.format('M'),
        year: date.format('YYYY'),
        moment: date,
        date: date.format('YYYY') + '-' + date.format('M'),
        weeks: weeks,
        months: [{ name: date.format('MMMM'), value: date.format('M')}],
        years: [date.format('YYYY')] }
  }

  public createYearsList() {
    this.years = [];
    for (let y: any = this.fsDatePickerModel.minYear; y < this.fsDatePickerModel.maxYear; y++) {
      this.years.push({ value: y, disabled: this.isYearDisabled(moment().year(y)) });
    }
  }

  public updateMonthsListDisabledStatus() {
    const year = this.month ? this.month.year : moment().year();

    for (const item of this.monthList) {
      item.disabled = this.isMonthDisabled(moment().year(year).month(item.value - 1));
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

    const m = moment([this.selected['year'], this.selected['month'] - 1, this.selected['day']]);
    const max = new Date(this.selected['year'] || 1904, this.selected['month'], 0).getDate();

    if (max < this.selected['day']) {
      this.selected['day'] = null;
    }

    if (m.isValid()) {
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

import { Component, Inject, Input, Output, EventEmitter, HostListener, ElementRef,
  IterableDiffers, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import 'hammerjs';
import { FsHammerConfig } from './../../configs/fshammer.config';

import * as moment from 'moment-timezone';
import { extendMoment } from 'moment-range';
import { throttle } from '@firestitch/common/util';
import { FsDatePickerModel } from './../../services/fsdatepickermodel.service';
import { FsDatePickerCommon } from './../../services/fsdatepickercommon.service';


@Component({
    selector: 'fs-date-picker-calendar',
    templateUrl: './fsdatepickercalendar.component.html',
    styleUrls: ['./fsdatepickercalendar.component.scss'],
    providers: [
      {
        provide: HAMMER_GESTURE_CONFIG,
        useClass: FsHammerConfig
      }
    ]
})
export class FsDatePickerCalendarComponent implements OnInit, OnChanges, OnDestroy {

  @Input() date = null;

  @Input() highlightStartDate = null;
  @Input() highlightEndDate = null;

  @Input() dateMode = null;
  @Input() disabledDays = null;
  @Input() drawMonth = null;
  @Output() onChange = new EventEmitter<any>();
  @Output() onDateModeChange = new EventEmitter<any>();
  @Output() onDrawMonth = new EventEmitter<any>();
  @Output() hoverDay = new EventEmitter<any>();
  @Output() mouseLeaveCalendar = new EventEmitter<any>();

  selected = {};
  iscrollOptions = null;
  iscrollInstance = null;
  month = null;
  years = [];
  dateDays = [];

  private highlightedRangeDays = null;

  private SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

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

  today = {
    date: moment().format('YYYY-MM-DD'),
    month: moment().format('M'),
    year: parseInt(moment().format('YYYY'))
  };

  constructor(public element: ElementRef, private fsDatePickerCommon: FsDatePickerCommon,
    public fsDatePickerModel: FsDatePickerModel,
    private _iterableDiffers: IterableDiffers) {
      extendMoment(moment);
    }

  ngOnInit() {

    this.createYearsList();
    this.updateMonthsListDisabledStatus();

    // if (['date', 'datetime'].indexOf(this.fsDatePickerModel.view) !== -1) {
    //   setTimeout(() => {
    //     const $date = this.element.nativeElement.querySelector('.calendar-container');
    //     $date.addEventListener('mousewheel', this.dateScroll);
    //   });
    // }
  }

  ngOnChanges(changes) {
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

  onMouseEnterDay(day) {
    this.hoverDay.emit(day);
  }

  onMouseLeaveCalendar() {
    this.mouseLeaveCalendar.emit();
  }

  updateDaysHighlighted() {

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

  isDayDisabled(date) {
   return this.isRangeDisabled(moment(date).startOf('day'), moment(date).endOf('day'));
  }

  isMonthDisabled(date) {
    return this.isRangeDisabled(moment(date).startOf('month'), moment(date).endOf('month'));
  }

  isYearDisabled(date) {
    return this.isRangeDisabled(moment(date).startOf('year'), moment(date).endOf('year'));
  }

  isRangeDisabled(start, end) {
    if (!this.disabledDays) {
      return false;
    }

    for (let i = 0; i < this.disabledDays.length; i++) {
      const value = this.disabledDays[i];
      if (
        (start.isBetween(value[0].startOf('day'), value[1].endOf('day')) || start.format('YYYY-MM-DD') === value[0].format('YYYY-MM-DD'))
      &&
        (end.isBetween(value[0].startOf('day'), value[1].endOf('day')) || end.format('YYYY-MM-DD') === value[1].format('YYYY-MM-DD'))
      ) {
          return true;
      }
    }
    return false;
  }

  monthClick(month) {
    Object.assign(month.months, this.monthList);
  }

  monthViewChange(month) {
    if (this.isMonthDisabled(moment(this.month.moment).year(this.month.year).month(month - 1))) {
      return;
    }
    this.setMonth(month);
    this.calendarView();
  }

  monthChange(month) {

    if (!this.date) {
      this.createModel();
    }

    this.setDate(this.date.clone().month(month - 1));
  }

  createModel() {
    if (!this.date) {
      this.date = this.fsDatePickerCommon.createMoment();
    }
  }

  setDate(date) {
    this.date = date;
    this.onChange.emit(date);
  }

  calendarView() {
    this.onDateModeChange.emit('date');
  }

  monthView(month) {
    this.updateMonthsListDisabledStatus();
    this.onDateModeChange.emit('month');
  }

  yearView(year) {
    this.iscrollOptions = { scrollToElement: `.years .data-year-${ year }` };
    this.onDateModeChange.emit('year');
  }

  /**
   *
   * @param day
   * @param event
   */
  dayClick(day, event) {
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

  yearViewChange(year) {
    if (this.isYearDisabled(moment().year(year))) {
      return;
    }
    // For some reason for mobile devices click event fired for both year/day modes. setTimeout fix this problem
    setTimeout(() => {
      this.setYear(year);
      this.calendarView();
    });
  }

  yearChange(year) {

    if (!this.date) {
      this.createModel();
    }

    this.setDate(this.date.clone().year(year));
  }

  previousMonth(month) {
    if (this.isMonthDisabled(month.moment.clone().subtract(1, 'months'))) {
      return;
    }
    this.onDrawMonth.emit(month.moment.subtract(1, 'months'));
  }

  nextMonth(month) {
    if (this.isMonthDisabled(month.moment.clone().add(1, 'months'))) {
      return;
    }
    this.onDrawMonth.emit(month.moment.add(1, 'months'));
  }

  setMonth(monthNumber) {
    this.onDrawMonth.emit(moment(this.month.moment).set('month', monthNumber - 1));
  }

  setYear(yearNumber) {
    this.onDrawMonth.emit(moment(this.month.moment).set('year', yearNumber));
  }

  drawMonths(date) {
    this.onDrawMonth.emit(date);
    this.month = this.createMonth(date);
  }

  createMonth(date) {
    date = date.clone().date(1);

    let days = [], weeks = [];
    let week = [];
    let md = date.clone();

    md.subtract(date.day(), 'day');
    let daysInMonth = date.daysInMonth();

    for (let d = 0; d < daysInMonth + date.day() + (6 - date.clone().add(1, 'month').day() + 1); d++) {
      let number = md.format('DD');
      days.push({ number: number });

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

  createYearsList() {
    this.years = [];
    for (let y: any = this.fsDatePickerModel.minYear; y < this.fsDatePickerModel.maxYear; y++) {
      this.years.push({ value: y, disabled: this.isYearDisabled(moment().year(y)) });
    }
  }

  updateMonthsListDisabledStatus() {
    const year = this.month ? this.month.year : moment().year();

    for (const item of this.monthList) {
      item.disabled = this.isMonthDisabled(moment().year(year).month(item.value - 1));
    }
  }

  updateDateDays() {
    let year = this.selected['year'] || 1904;
    let month = this.selected['month'] || 1;
    let max = new Date(year, month, 0).getDate();
    this.dateDays = [];
    for (let d = 1; d <= max; d++) {
      this.dateDays.push(d);
    }

    return this.dateDays;
  }

  monthDateViewChange() {
    this.updateDateDays();
    this.updateDate();
  }

  dayDateViewChange() {
    this.updateDateDays();
    this.updateDate();

  }

  yearDateViewChange() {
    this.updateDateDays();
    this.updateDate();
  }

  updateDate() {

    const m = moment([this.selected['year'], this.selected['month'] - 1, this.selected['day']]);
    const max = new Date(this.selected['year'] || 1904, this.selected['month'], 0).getDate();

    if (max < this.selected['day']) {
      this.selected['day'] = null;
    }

    if (m.isValid()) {
      this.setDate(m);
    }
  }

  ngOnDestroy() {
    // if (['date', 'datetime'].indexOf(this.fsDatePickerModel.view) !== -1) {
    //   const $date = this.element.nativeElement.querySelector('.calendar-container');
    //   $date.removeEventListener('mousewheel', this.dateScroll);
    // }
  }
}

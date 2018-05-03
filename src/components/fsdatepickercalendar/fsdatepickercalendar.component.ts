import { Component, Inject, Input, Output, EventEmitter, HostListener, ElementRef,
  IterableDiffers, OnInit, OnChanges, DoCheck, OnDestroy } from '@angular/core';
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
    host: {
      '(mousewheel)': 'onMouseWheel($event)',
      '(touchmove)': 'onTouchMove($event)'
    },
    providers: [
      {
        provide: HAMMER_GESTURE_CONFIG,
        useClass: FsHammerConfig
      }
    ]
})
export class FsDatePickerCalendarComponent implements OnInit, OnChanges, DoCheck, OnDestroy {

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

  private disabledDaysDiffer = null;

  private SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  monthList = [{ value: 1, name: 'January', abr: 'Jan' },
  { value: 2, name: 'February', abr: 'Feb' },
  { value: 3, name: 'March', abr: 'Mar' },
  { value: 4, name: 'April', abr: 'Apr' },
  { value: 5, name: 'May', abr: 'May' },
  { value: 6, name: 'June', abr: 'June' },
  { value: 7, name: 'July', abr: 'July' },
  { value: 8, name: 'August', abr: 'Aug' },
  { value: 9, name: 'September', abr: 'Sept' },
  { value: 10, name: 'October', abr: 'Oct' },
  { value: 11, name: 'November', abr: 'Nov' },
  { value: 12, name: 'December', abr: 'Dec' }];

  today = {
    date: moment().format('YYYY-MM-DD'),
    month: moment().format('M'),
    year: parseInt(moment().format('YYYY'))
  };

  constructor(public element: ElementRef, private fsDatePickerCommon: FsDatePickerCommon,
    public fsDatePickerModel: FsDatePickerModel,
    private _iterableDiffers: IterableDiffers) {
      this.disabledDaysDiffer = this._iterableDiffers.find([]).create(null);
      extendMoment(moment);
    }

  ngOnInit() {
    for (let y: any = this.fsDatePickerModel.minYear; y < this.fsDatePickerModel.maxYear; y++) {
      this.years.push(y);
    }

    if (['date', 'datetime'].indexOf(this.fsDatePickerModel.view) !== -1) {
      setTimeout(() => {
        const $date = this.element.nativeElement.querySelector('.calendar-container');
        $date.addEventListener('mousewheel', this.dateScroll);
      });
    }
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

  ngDoCheck() {
    if (this.disabledDays && this.disabledDaysDiffer.diff(this.disabledDays)) {
      if (this.disabledDays !== undefined && this.month) {
        for (let week of this.month.weeks) {
          for (let day of week) {
            day.disabled = this.isDayDisabled(moment(day.date));
          }
        }
      }
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

  isDayDisabled(md) {
    if (!this.disabledDays) {
      return false;
    }

    let len;
    for (let i = 0, len = this.disabledDays.length; i < len; i++) {
      let value = this.disabledDays[i];
      if (moment.isMoment(value)) {
        if (value.format('YYYY-MM-DD') == md.format('YYYY-MM-DD')) {
          return true;
        }
      } else {
        if (md.isBetween(value[0].startOf('day'),value[1].startOf('day')) || md.format('YYYY-MM-DD')==value[0].format('YYYY-MM-DD')) {
          return true;
        }
      }
    }
    return false;
  }

  monthClick(month) {
    Object.assign(month.months, this.monthList);
  }

  monthViewChange(month) {
    // Changing date
    // this.monthChange(month);
    // Changing calendar view
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
    this.onDateModeChange.emit('month');
  }

  yearView(year) {
    this.iscrollOptions = { scrollToElement: `.years .data-year-${ year }` };
    this.onDateModeChange.emit('year');
  }

  dayClick(day) {

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
    // this.drawMonths(month.moment.subtract(1, 'months'));
    this.onDrawMonth.emit(month.moment.subtract(1, 'months'));
  }

  nextMonth(month) {
    // this.drawMonths(month.moment.add(1, 'months'));
    this.onDrawMonth.emit(month.moment.add(1, 'months'));
  }

  setMonth(monthNumber) {
    // this.drawMonths(moment(this.month.moment).set('month', monthNumber - 1));
    this.onDrawMonth.emit(moment(this.month.moment).set('month', monthNumber - 1));

  }

  setYear(yearNumber) {
    // this.drawMonths(moment(this.month.moment).set('year', yearNumber));
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
      this.selected['day'] = undefined;
    }

    if (m.isValid()) {
      this.setDate(m);
    }
  }

  onMouseWheel($event) {
    // $event.preventDefault();
  }

  onTouchMove($event) {
    $event.preventDefault();
  }

  swipe(action = this.SWIPE_ACTION.RIGHT) {
    if (action === this.SWIPE_ACTION.RIGHT) {
      this.previousMonth(this.month);
    } else if (action === this.SWIPE_ACTION.LEFT) {
      this.nextMonth(this.month);
    }
  }

  ngOnDestroy() {
    if (['date', 'datetime'].indexOf(this.fsDatePickerModel.view) !== -1) {
      const $date = this.element.nativeElement.querySelector('.calendar-container');
      $date.removeEventListener('mousewheel', this.dateScroll);
    }
  }
}

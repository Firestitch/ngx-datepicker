import { Component, Inject, Input, Output, EventEmitter, HostListener, ElementRef,
  IterableDiffers, OnInit, OnChanges, DoCheck, OnDestroy } from '@angular/core';
import { FsUtil } from '@firestitch/common';
import * as moment from 'moment-timezone';
import { FsDatepicker } from './../../services/fsdatepicker.service';

@Component({
    selector: 'fs-date',
    templateUrl: './fsdate.component.html',
    styleUrls: ['./fsdate.component.scss'],
    host: {
      '(mousewheel)': 'onMouseWheel($event)',
      '(touchmove)': 'onTouchMove($event)'
    }
})
export class FsDateComponent implements OnInit, OnChanges, DoCheck, OnDestroy {

  @Input() date;

  @Input() hasDate;
  @Input() hasCalendar;
  @Input() view = 'calendar';
  @Input() yearList = null;
  @Input() minYear = null;
  @Input() maxYear = null;
  @Output() onChange = new EventEmitter<any>();
  selected = {};
  iscrollOptions = null;
  iscrollInstance = null;
  month = null;
  years = [];
  dateDays = [];

  @Input() disabledDays = null;

  private disabledDaysDiffer = null;

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

  constructor(public element: ElementRef, private fsDatepicker: FsDatepicker,
    private fsUtil: FsUtil, private _iterableDiffers: IterableDiffers) {
      this.disabledDaysDiffer = this._iterableDiffers.find([]).create(null);
    }

  ngOnInit() {
    // this.selected = this.fsDatepicker.getSelected(this.date);

    // this.drawMonths(this.date);

    for (let y: any = this.minYear; y < this.maxYear; y++) {
      this.years.push(y);
    }

    if (this.hasDate) {
      setTimeout(() => {
        const $date = this.element.nativeElement.querySelector('.date');
        $date.addEventListener('mousewheel', this.dateScroll);
      });
    }
  }

  ngOnChanges(changes) {
    if (changes && changes.date) {
      this.drawMonths(this.date);
      this.selected = this.fsDatepicker.getSelected(this.date);
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

  private dateScroll = this.fsUtil.throttle((e) => {
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
    this.monthChange(month);
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
      this.setDate(this.fsDatepicker.createMoment());
    }
  }

  setDate(date) {
    this.date = date;
    this.onChange.emit(date);
  }

  calendarView() {
    this.view = 'calendar';
  }

  monthView(month) {
    this.view = 'month';
  }

  yearView(year) {
    this.iscrollOptions = { scrollToElement: '.years [data-year="' + year + '"]' };
    this.view = 'year';
  }

  yearClick(month) {
    Object.assign(month.years, this.yearList);
  }

  dayClick(day) {

    if (day.disabled) {
      return;
    }

    if ( !this.date) {
      this.createModel();
    }

    let date = this.date
          .clone()
          .year(day.year)
          .month(day.month - 1)
          .date(day.number);

    this.setDate(date);
  }

  yearViewChange(year) {
    this.yearChange(year);
    this.calendarView();
  }

  yearChange(year) {

    if (!this.date) {
      this.createModel();
    }

    this.setDate(this.date.clone().year(year));
  }

  previousMonth(month) {
    this.drawMonths(month.moment.subtract(1, 'months'));
  }

  nextMonth(month) {
    this.drawMonths(month.moment.add(1, 'months'));
  }

  drawMonths(date) {

    if (!date) {
      date = this.fsDatepicker.createMoment();
    }

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
    $event.preventDefault();
  }

  onTouchMove($event) {
    $event.preventDefault();
  }

  ngOnDestroy() {
    if (this.hasDate) {
      const $date = this.element.nativeElement.querySelector('.date');
      $date.removeEventListener('mousewheel', this.dateScroll);
    }
  }
}

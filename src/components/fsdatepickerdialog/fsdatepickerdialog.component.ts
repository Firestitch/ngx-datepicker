import { Component, Inject, Input, HostListener, ElementRef,
  IterableDiffers, ViewEncapsulation, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { FsUtil } from '@firestitch/common';
import * as moment from 'moment-timezone';
import { FsDatepicker } from './../../services/fsdatepicker.service';

@Component({
    selector: 'fs-datepicker-dialog',
    templateUrl: './fsdatepickerdialog.component.html',
    styleUrls: ['./fsdatepickerdialog.component.scss'],
    encapsulation: ViewEncapsulation.None
    /*
    host: {
      '(mousewheel)': 'onMouseWheel($event)',
      '(touchmove)': 'onTouchMove($event)'
    }
    */
})
export class FsDatepickerDialogComponent implements OnInit, DoCheck, OnDestroy {

  // month = null;
  // years = [];
  // tab = 'date';
  parentInstance: any = null;
  model = null;
  // hasDate: boolean;
  // iscrollOptions = null;
  // iscrollInstance = null;

  disabledTimeMinutes = {};
  disabledTimeHours = {};
  disabledGroupedMinutes = {};

  // private disabledDaysDiffer = null;
  private disabledMinutesDiffer = null;
  private disabledHoursDiffer = null;
  private disabledTimesDiffer = null;

  /*
  today = {
    date: moment().format('YYYY-MM-DD'),
    month: moment().format('M'),
    year: parseInt(moment().format('YYYY'))
  };
  */

  // dateDays = [];

  /*
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
  */

  timeHours = [[0,12],[1,13],[2,14],[3,15],[4,16],[5,17],[6,18],[7,19],[8,20],[9,21],[10,22],[11,23]];
  timeMinutes = [	[0,1,2,3,4],
              [5,6,7,8,9],
              [10,11,12,13,14],
              [15,16,17,18,19],
              [20,21,22,23,24],
              [25,26,27,28,29],
              [30,31,32,33,34],
              [35,36,37,38,39],
              [40,41,42,43,44],
              [45,46,47,48,49],
              [50,51,52,53,54],
              [55,56,57,58,59]];

  /*
  private dateScroll = this.FsUtil.throttle((e) => {
    if (e.wheelDelta > 0) {
      this.nextMonth(this.month);
    } else {
      this.previousMonth(this.month);
    }
  }, 50);
  */

  constructor(public element: ElementRef, private fsDatepicker: FsDatepicker,
    private FsUtil: FsUtil, private _iterableDiffers: IterableDiffers) {
    // this.disabledDaysDiffer = this._iterableDiffers.find([]).create(null);
    this.disabledHoursDiffer = this._iterableDiffers.find([]).create(null);
    this.disabledMinutesDiffer = this._iterableDiffers.find([]).create(null);
    this.disabledTimesDiffer = this._iterableDiffers.find([]).create(null);
  }

  ngOnInit() {
    // console.log(this.parentInstance);
    // this.tab = this.parentInstance.hasDate ? 'date' : 'time';

    /*
    for (let y: any = this.parentInstance.minYear; y < this.parentInstance.maxYear; y++) {
      this.years.push(y);
    }

    if (this.parentInstance.hasDate) {
      setTimeout(() => {
        const $date = this.element.nativeElement.querySelector('.date');
        $date.addEventListener('mousewheel', this.dateScroll);
      });
    }
    */
    this.model = this.parentInstance.getValue();
    // console.log(this.model);

    this.checkDisabledTime();
  }

  setDate(date) {
    this.model = date;
    this.parentInstance.writeValue(date);
  }

  ngDoCheck() {
    /*
    if (this.parentInstance.disabledDays && this.disabledDaysDiffer.diff(this.parentInstance.disabledDays)) {
      if (this.parentInstance.disabledDays !== undefined && this.month) {
        for (let week of this.month.weeks) {
          for (let day of week) {
            day.disabled = this.isDayDisabled(moment(day.date));
          }
        }
      }
    }
    */

    if (this.disabledHoursDiffer.diff(this.parentInstance.disabledHours) ||
        this.disabledMinutesDiffer.diff(this.parentInstance.disabledMinutes) ||
        this.disabledTimesDiffer.diff(this.parentInstance.disabledTimes)
    ) {
      this.checkDisabledTime();
    }
  }

  checkDisabledTime() {

    this.disabledTimeMinutes = {};
    this.disabledTimeHours = {};
    this.disabledGroupedMinutes = {};

    if (this.parentInstance.disabledMinutes !== undefined) {
      for (let range of this.parentInstance.disabledMinutes) {
        this.addDisabledMinutes(range);
      };
    }

    if (this.parentInstance.disabledHours !== undefined) {
      for (let range of this.parentInstance.disabledHours) {
        this.addDisabledHours(range);
      };
    }

    if (this.parentInstance.disabledTimes !== undefined) {
      for (let range of this.parentInstance.disabledTimes) {

        let min = Math.min(range[0], range[1]);
        let max = Math.max(range[0], range[1]);
        let minMinutes = min % 60;
        let maxMinutes = max % 60;

        let minHour = Math.floor(min / 60);
        let maxHour = Math.floor(max / 60);

        for (let h = 0; h <= 24; h++) {

          this.disabledGroupedMinutes[h] = {};

          if (h > minHour && h < maxHour)  {
            this.addDisabledHours([h, h]);
          } else if (h == minHour && !minMinutes) {
            this.addDisabledHours([h, h]);
          }

          if (h == minHour) {
            for (let m = minMinutes; m < 60; m++) {
              this.disabledGroupedMinutes[h][m] = true;
            }
          }

          if (h == maxHour) {
            for (let m = 0; m < maxMinutes; m++) {
              this.disabledGroupedMinutes[h][m] = true;
            }
          }
        }
      };
    }
  }

  addDisabledMinutes(range) {
    let min = Math.min(range[0], range[1]);
    let max = Math.max(range[0], range[1]);
    if (this.FsUtil.isArray(range)) {
      for (let i = min; i <= max; i++) {
        this.disabledTimeMinutes[i] = true;
      }
    } else {
      this.disabledTimeMinutes[range] = true;
    }
  }

  addDisabledHours(range) {
    let min = Math.min(range[0], range[1]);
    let max = Math.max(range[0], range[1]);
    if (this.FsUtil.isArray(range)) {
      for (let i = min; i <= max; i++) {
        this.disabledTimeHours[i] = true;
      }
    } else {
      this.disabledTimeHours[range] = true;
    }
  }

  /*
  updateDateDays() {
    let year = this.parentInstance.selected.year || 1904;
    let month = this.parentInstance.selected.month || 1;
    let max = new Date(year, month, 0).getDate();
    this.dateDays = [];
    for (let d = 1; d <= max; d++) {
      this.dateDays.push(d);
    }

    return this.dateDays;
  }
  */

  /*
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
  */

  /*
  updateDate() {

    const m = moment([this.parentInstance.selected.year, this.parentInstance.selected.month - 1, this.parentInstance.selected.day]);
    const max = new Date(this.parentInstance.selected.year || 1904, this.parentInstance.selected.month, 0).getDate();

    if (max < this.parentInstance.selected.day) {
      this.parentInstance.selected.day = undefined;
    }

    if (m.isValid()) {
      this.setDate(m);
    }
  }
  */

  close($event?) {
    this.parentInstance.opened = false;
  }

  /*
  onMouseWheel($event) {
    $event.preventDefault();
  }

  onTouchMove($event) {
    $event.preventDefault();
  }
  */

  /*
  drawMonths(date) {

    if (!date) {
      date = this.createMoment();
    }

    this.month = this.createMonth(date);
  }
  */
  /*
  createModel() {
    if (!this.parentInstance.getValue()) {
      this.parentInstance.writeValue(this.createMoment());
    }
  }
  */

  /*
  createMoment() {
    return moment().startOf('day');
  }
  */

  /*
  createMonth(date) {
    date = date.clone().date(1);

    let days = [], weeks = [];
    let week = [];
    let md = date.clone();

    md.subtract(date.day(), 'day');
    let daysInMonth = date.daysInMonth();

    for (let d=0; d<daysInMonth + date.day() + (6 - date.clone().add(1, 'month').day() + 1); d++) {
      let number = md.format('DD');
      days.push({ number: number });

      if (d % 7==0) {
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
  */

  /*
  isDayDisabled(md) {
    if (!this.parentInstance.disabledDays) {
      return false;
    }

    let len;
    for (let i=0, len = this.parentInstance.disabledDays.length; i < len; i++) {
      let value = this.parentInstance.disabledDays[i];
      if (moment.isMoment(value)) {
        if (value.format('YYYY-MM-DD')==md.format('YYYY-MM-DD')) {
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
  */

  /*
  calendarView() {
    this.parentInstance.view = 'calendar';
  }

  monthView(month) {
    this.parentInstance.view = 'month';
  }

  yearView(year) {
    this.iscrollOptions = { scrollToElement: '.years [data-year="' + year + '"]' };
    this.parentInstance.view = 'year';
  }
  */

  @HostListener('document:keydown', ['$event'])
  documentKeydown(e) {
    if (e.keyCode === 27) {
        // Be careful with preventing default events. Breaking page refresh functional
        e.preventDefault();
        this.close(e);
      }
  }
  /*
  monthClick(month) {
    Object.assign(month.months, this.monthList);
  }
  */
  /*
  yearClick(month) {
    Object.assign(month.years, this.parentInstance.yearList);
  }
  */

  /*
  monthViewChange(month) {
    this.monthChange(month);
    this.calendarView();
  }
  */

  /*
  monthChange(month) {

    if (!this.parentInstance.getValue()) {
      this.createModel();
    }

    this.setDate(this.parentInstance.getValue().clone().month(month - 1));
  }
  */

  /*
  dayClick(day) {

    if (day.disabled) {
      return;
    }

    if ( !this.parentInstance.getValue()) {
      this.createModel();
    }

    let date = this.parentInstance.getValue()
          .clone()
          .year(day.year)
          .month(day.month - 1)
          .date(day.number);

    this.setDate(date);

    if (!this.parentInstance.hasTime) {
      this.close();
    }
  }
  */

  /*
  yearViewChange(year) {
    this.yearChange(year);
    this.calendarView();
  }

  yearChange(year) {

    if (!this.parentInstance.getValue()) {
      this.createModel();
    }

    this.setDate(this.parentInstance.getValue().clone().year(year));
  }
  */

  createModel() {}

  hourClick(hour) {

    if (this.disabledTimeHours[hour]) {
      return;
    }

    if (!this.parentInstance.getValue()) {
      this.createModel();
    }

    this.setDate(this.parentInstance.getValue().clone().hour(hour));
  }

  minuteClick(minute) {

    if (this.disabledTimeMinutes[minute]) {
      return;
    }

    if (!this.parentInstance.getValue()) {
      this.createModel();
    }

    this.setDate(this.parentInstance.getValue().clone().minute(minute));
  }

  /*
  previousMonth(month) {
    this.drawMonths(month.moment.subtract(1, 'months'));
  }

  nextMonth(month) {
    this.drawMonths(month.moment.add(1, 'months'));
  }
  */

  ngOnDestroy() {

    /*
    if (this.parentInstance.hasDate) {
      const $date = this.element.nativeElement.querySelector('.date');
      $date.removeEventListener('mousewheel', this.dateScroll);
    }
    */
  }

}

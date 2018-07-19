import { Component, Input, HostListener, ViewChild, ElementRef, IterableDiffers,
  ViewEncapsulation, OnInit, DoCheck } from '@angular/core';
import { FsDatePickerModel } from './../../services/fsdatepickermodel.service';
import { FsDatePickerCommon } from './../../services/fsdatepickercommon.service';
import { FsDatePickerBaseComponent } from './../../classes/fsdatepickerbase.component';
import * as moment from 'moment-timezone';


@Component({
    selector: 'fs-date-picker-range',
    templateUrl: './fsdatepickerrange.component.html',
    styleUrls: ['./fsdatepickerrange.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [FsDatePickerModel]
})
export class FsDatepickerRangeComponent extends FsDatePickerBaseComponent implements OnInit, DoCheck {

  public toDisabledTimes = [];
  public startCalendarMonth = null;
  public endCalendarMonth = null;
  public highlightStartDate = null;
  public highlightEndDate = null;
  public disabledDays = null;
  private modelDiffer = null;

  constructor(
    public fsDatePickerModel: FsDatePickerModel,
    private fsDatePickerCommon: FsDatePickerCommon,
    public element: ElementRef,
    private _iterableDiffers: IterableDiffers
  ) {
    super();
    this.modelDiffer = this._iterableDiffers.find([]).create(null);
  }

  ngOnInit() {
    this.calendarsDrawMonth(this.parentDirective.ngModelStart, this.parentDirective.ngModelEnd);
    this.disabledDays = this.fsDatePickerModel.disabledDays();
  }

  ngDoCheck() {
    if (this.modelDiffer.diff([this.parentDirective.ngModelStart, this.parentDirective.ngModelEnd])) {

      const startDate = this.parentDirective.ngModelStart;
      const endDate = this.parentDirective.ngModelEnd;

      this.toDisabledTimesUpdate(startDate, endDate);

      this.highlightStartDate = startDate;
      this.highlightEndDate = endDate || startDate;
    }
  }

  setStartDate(date) {

    const startDate = date;
    const endDate = this.parentDirective.ngModelEnd;

    this.setDates(startDate, endDate);

    if (startDate && endDate) {
      if (moment(startDate).format('YYYY-MM') === moment(endDate).format('YYYY-MM')) {
        this.endCalendarDrawMonth(moment(endDate).add(1, 'month'));
      } else {
        this.endCalendarDrawMonth(endDate);
      }
    }

    if (startDate) {
      this.startCalendarDrawMonth(startDate);
    }
  }

  setEndDate(date) {

    const startDate = date;
    const endDate = this.parentDirective.ngModelEnd;

    this.setDates(startDate, endDate);

    if (date) {
      this.endCalendarDrawMonth(date);
    }
  }

  setStartTime(date) {
    let endDate = this.parentDirective.ngModelEnd;
    // In time mode, if end date is empty - user not able switch to end time picker
    if (this.fsDatePickerModel.view === 'time' && !endDate) {
      endDate = date;
    }

    if (date && endDate && date.isAfter(endDate)) {
      endDate = date;
    }

    this.parentDirective.writeValue(date, endDate);
  }

  setEndTime(date) {
    this.parentDirective.writeValue(this.parentDirective.ngModelStart, date);
  }

  setDates(startDate, endDate) {

    if (this.parentDirective.ngModelStart && !this.parentDirective.ngModelEnd) {
      endDate = startDate;
      startDate = this.parentDirective.ngModelStart;
    } else if (this.parentDirective.ngModelStart && this.parentDirective.ngModelEnd) {
      endDate = null;
    }

    if (startDate && endDate && startDate.isAfter(endDate)) {
      startDate = endDate;
      endDate = null;
    }

    this.parentDirective.writeValue(startDate, endDate);
  }

  onDatesChange(data) {
    this.setDates(data.start, data.end);
    this.calendarsDrawMonth(data.start, data.end);
  }

  toDisabledTimesUpdate(startDate, endDate) {
    this.toDisabledTimes = [];

    if (startDate && endDate && startDate.isSame(endDate, 'day')) {

      const from = parseInt(startDate.format('m')) + (parseInt(startDate.format('H')) * 60);
      const to = parseInt(endDate.format('m')) + (parseInt(endDate.format('H')) * 60);

      if (startDate) {
        this.toDisabledTimes.push([0, from]);
      }
    }
  }

  setDateModeStart(mode) {
    this.fsDatePickerModel.dateMode.start = mode;
  }

  setDateModeEnd(mode) {
    this.fsDatePickerModel.dateMode.end = mode;
  }

  setComponents(data) {
    this.fsDatePickerModel.components = data;
  }

  calendarsDrawMonth(startDate, endDate) {
    this.endCalendarDrawMonth(endDate);
    this.startCalendarDrawMonth(startDate);
  }

  startCalendarDrawMonth(date) {
    this.startCalendarMonth = this.fsDatePickerCommon.getMomentSafe(date);

    if (this.rangeCalendarsConflict(this.startCalendarMonth, this.endCalendarMonth)) {
      this.endCalendarMonth = moment(this.startCalendarMonth).add(1, 'month');
    }
  }

  endCalendarDrawMonth(date) {
    this.endCalendarMonth = this.fsDatePickerCommon.getMomentSafe(date);

    if (this.rangeCalendarsConflict(this.startCalendarMonth, this.endCalendarMonth)) {
      this.startCalendarMonth = moment(this.endCalendarMonth).subtract(1, 'month');
    }
  }

  private rangeCalendarsConflict(startDate, endDate): boolean {
    return moment(startDate).isAfter(endDate) ||
          moment(startDate).format('YYYY-MM') === moment(endDate).format('YYYY-MM');
  }

  hoverCalendar(day) {
    const date = moment(day.date);

    if (
      this.parentDirective.ngModelStart &&
      !this.parentDirective.ngModelEnd &&
      moment(this.parentDirective.ngModelStart).isBefore(date)
    ) {
      this.highlightEndDate = date;
    } else {
      this.highlightEndDate = this.parentDirective.ngModelEnd;
    }
  }

  onMouseLeaveCalendar() {
    this.highlightEndDate = this.parentDirective.ngModelEnd;
  }

  @HostListener('document:keydown', ['$event'])
  documentKeydown(e) {
    if (e.keyCode === 27) {
        // Be careful with preventing default events. Breaking page refresh functional
        e.preventDefault();
        this.close(e);
      }
  }
}

import { Component, Input, HostListener, ViewChild, ElementRef, IterableDiffers,
  ViewEncapsulation, OnInit, DoCheck } from '@angular/core';
import { FsDatePickerModel } from './../../services/fsdatepickermodel.service';
import { FsDatePickerCommon } from './../../services/fsdatepickercommon.service';
import * as moment from 'moment-timezone';


@Component({
    selector: 'fs-date-picker-range',
    templateUrl: './fsdatepickerrange.component.html',
    styleUrls: ['./fsdatepickerrange.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [FsDatePickerModel]
})
export class FsDatepickerRangeComponent implements OnInit, DoCheck {

  parentInstance: any = null;

  public toDisabledDays = [];
  public toDisabledTimes = [];

  public startCalendarMonth = null;
  public endCalendarMonth = null;

  public highlightStartDate = null;
  public highlightEndDate = null;

  private modelDiffer = null;

  constructor(
    public fsDatePickerModel: FsDatePickerModel,
    private fsDatePickerCommon: FsDatePickerCommon,
    public element: ElementRef,
    private _iterableDiffers: IterableDiffers
  ) {
    this.modelDiffer = this._iterableDiffers.find([]).create(null);
  }

  ngOnInit() {
    this.calendarsDrawMonth(this.parentInstance.ngModelStart, this.parentInstance.ngModelEnd);
  }

  ngDoCheck() {
    if (this.modelDiffer.diff([this.parentInstance.ngModelStart, this.parentInstance.ngModelEnd])) {

      const startDate = this.parentInstance.ngModelStart;
      const endDate = this.parentInstance.ngModelEnd;

      // Don't remove
      // this.toDisabledDaysUpdate(startDate, endDate);
      this.toDisabledTimesUpdate(startDate, endDate);

      this.highlightStartDate = startDate;
      this.highlightEndDate = endDate || startDate;
    }
  }

  setStartDate(date) {

    const startDate = date;
    const endDate = this.parentInstance.ngModelEnd;

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
    const endDate = this.parentInstance.ngModelEnd;

    this.setDates(startDate, endDate);

    if (date) {
      this.endCalendarDrawMonth(date);
    }
  }

  setStartTime(date) {
    let endDate = this.parentInstance.ngModelEnd;
    // In time mode, if end date is empty - user not able switch to end time picker
    if (this.fsDatePickerModel.view === 'time' && !endDate) {
      endDate = date;
    }

    if (date && endDate && date.isAfter(endDate)) {
      endDate = date;
    }

    this.parentInstance.writeValue(date, endDate);
  }

  setEndTime(date) {
    this.parentInstance.writeValue(this.parentInstance.ngModelStart, date);
  }

  setDates(startDate, endDate) {

    if (this.parentInstance.ngModelStart && !this.parentInstance.ngModelEnd) {
      endDate = startDate;
      startDate = this.parentInstance.ngModelStart;
    } else if (this.parentInstance.ngModelStart && this.parentInstance.ngModelEnd) {
      endDate = null;
    }

    if (startDate && endDate && startDate.isAfter(endDate)) {
      startDate = endDate;
      endDate = null;
    }

    this.parentInstance.writeValue(startDate, endDate);
  }

  onDatesChange(data) {
    this.setDates(data.start, data.end);
    this.calendarsDrawMonth(data.start, data.end);
  }

  toDisabledDaysUpdate(startDate, endDate) {
    this.toDisabledDays = startDate ? [[moment().subtract(99, 'year'), startDate.clone()]] : [];
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
    this.fsDatePickerModel.dateMode.start_date = mode;
  }

  setDateModeEnd(mode) {
    this.fsDatePickerModel.dateMode.end_date = mode;
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
      this.parentInstance.ngModelStart &&
      !this.parentInstance.ngModelEnd &&
      moment(this.parentInstance.ngModelStart).isBefore(date)
    ) {
      this.highlightEndDate = date;
    } else {
      this.highlightEndDate = this.parentInstance.ngModelEnd;
    }
  }

  onMouseLeaveCalendar() {
    this.highlightEndDate = this.parentInstance.ngModelEnd;
  }

  close($event?) {

    if (!this.fsDatePickerCommon.isValidRange(this.parentInstance.ngModelStart, this.parentInstance.ngModelEnd)) {
      this.parentInstance.writeValue(null, null);
    }

    this.parentInstance.opened = false;
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

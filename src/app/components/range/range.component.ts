import {
  Component,
  DoCheck,
  ElementRef,
  HostListener,
  IterableDiffers,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import * as moment_ from 'moment-timezone';
const moment = moment_;

import { FsDatePickerModel } from '../../services/model.service';
import { FsDatePickerCommon } from '../../services/common.service';
import { FsDatePickerBaseComponent } from '../../classes/base-component';


@Component({
    selector: 'fs-date-picker-range',
    templateUrl: './range.component.html',
    styleUrls: ['./range.component.scss'],
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

  @HostListener('document:keydown', ['$event'])
  public documentKeydown(e) {
    if (e.keyCode === 27) {
      // Be careful with preventing default events. Breaking page refresh functional
      e.preventDefault();
      this.close(e);
    }
  }

  public ngOnInit() {
    this.calendarsDrawMonth(this.parentDirective.ngModelStart, this.parentDirective.ngModelEnd);
    this.disabledDays = this.fsDatePickerModel.disabledDays();
  }

  public ngDoCheck() {
    if (this.modelDiffer.diff([this.parentDirective.ngModelStart, this.parentDirective.ngModelEnd])) {

      const startDate = this.parentDirective.ngModelStart;
      const endDate = this.parentDirective.ngModelEnd;

      this.toDisabledTimesUpdate(startDate, endDate);

      this.highlightStartDate = startDate;
      this.highlightEndDate = endDate || startDate;
    }
  }

  public setStartDate(date) {

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

  public setEndDate(date) {

    const startDate = date;
    const endDate = this.parentDirective.ngModelEnd;

    this.setDates(startDate, endDate);

    if (date) {
      this.endCalendarDrawMonth(date);
    }
  }

  public setStartTime(date) {
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

  public setEndTime(date) {
    this.parentDirective.writeValue(this.parentDirective.ngModelStart, date);
  }

  public setDates(startDate, endDate) {

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

  public onDatesChange(data) {
    this.setDates(data.start, data.end);
    this.calendarsDrawMonth(data.start, data.end);
  }

  public toDisabledTimesUpdate(startDate, endDate) {
    this.toDisabledTimes = [];

    if (startDate && endDate && startDate.isSame(endDate, 'day')) {

      const from = parseInt(startDate.format('m')) + (parseInt(startDate.format('H')) * 60);

      if (startDate) {
        this.toDisabledTimes.push([0, from]);
      }
    }
  }

  public setDateModeStart(mode) {
    this.fsDatePickerModel.dateMode.start = mode;
  }

  public setDateModeEnd(mode) {
    this.fsDatePickerModel.dateMode.end = mode;
  }

  public setComponents(data) {
    this.fsDatePickerModel.components = data;
  }

  public calendarsDrawMonth(startDate, endDate) {
    this.endCalendarDrawMonth(endDate);
    this.startCalendarDrawMonth(startDate);
  }

  public startCalendarDrawMonth(date) {
    this.startCalendarMonth = this.fsDatePickerCommon.getMomentSafe(date);

    if (this.rangeCalendarsConflict(this.startCalendarMonth, this.endCalendarMonth)) {
      this.endCalendarMonth = moment(this.startCalendarMonth).add(1, 'month');
    }
  }

  public endCalendarDrawMonth(date) {
    this.endCalendarMonth = this.fsDatePickerCommon.getMomentSafe(date);

    if (this.rangeCalendarsConflict(this.startCalendarMonth, this.endCalendarMonth)) {
      this.startCalendarMonth = moment(this.endCalendarMonth).subtract(1, 'month');
    }
  }

  public hoverCalendar(day) {
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

  public onMouseLeaveCalendar() {
    this.highlightEndDate = this.parentDirective.ngModelEnd;
  }

  private rangeCalendarsConflict(startDate, endDate): boolean {
    return moment(startDate).isAfter(endDate) ||
      moment(startDate).format('YYYY-MM') === moment(endDate).format('YYYY-MM');
  }
}

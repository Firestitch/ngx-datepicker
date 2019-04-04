import {
  Component,
  DoCheck,
  ElementRef,
  HostListener,
  IterableDiffers,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { addMonths, isAfter, isBefore, isSameDay, lightFormat, subMonths } from 'date-fns';

import { FsDatePickerModel } from '../../services/model.service';
import { FsDatePickerCommon } from '../../services/common.service';
import { FsDatePickerBaseDialogComponent } from '../../classes/base-dialog-component';


@Component({
    selector: 'fs-date-picker-range',
    templateUrl: './range-dialog.component.html',
    styleUrls: ['./range-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [FsDatePickerModel]
})
export class FsDatePickerRangeDialogComponent extends FsDatePickerBaseDialogComponent implements OnInit, DoCheck {

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
      if (lightFormat(startDate, 'yyyy-MM') === lightFormat(endDate, 'yyyy-MM')) {
        this.endCalendarDrawMonth(addMonths(endDate, 1));
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

    if (date && endDate && isAfter(date, endDate)) {
      endDate = date;
    }

    this.parentDirective.updateValue(date, endDate);
  }

  public setEndTime(date) {
    this.parentDirective.updateValue(this.parentDirective.ngModelStart, date);
  }

  public setDates(startDate, endDate) {

    if (this.parentDirective.ngModelStart && !this.parentDirective.ngModelEnd) {
      endDate = startDate;
      startDate = this.parentDirective.ngModelStart;
    } else if (this.parentDirective.ngModelStart && this.parentDirective.ngModelEnd) {
      endDate = null;
    }

    if (startDate && endDate && isAfter(startDate, endDate)) {
      startDate = endDate;
      endDate = null;
    }

    this.parentDirective.updateValue(startDate, endDate);
  }

  public onDatesChange(data) {
    this.setDates(data.start, data.end);
    this.calendarsDrawMonth(data.start, data.end);
  }

  public toDisabledTimesUpdate(startDate: Date, endDate: Date) {
    this.toDisabledTimes = [];

    if (startDate && endDate && isSameDay(startDate, endDate)) {

      const from = startDate.getMinutes() + (startDate.getHours() * 60);

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
    this.endCalendarMonth = this.fsDatePickerCommon.getMomentSafe(this.endCalendarMonth);

    if (this.rangeCalendarsConflict(this.startCalendarMonth, this.endCalendarMonth)) {
      this.endCalendarMonth = addMonths(this.startCalendarMonth, 1);
    }
  }

  public endCalendarDrawMonth(date) {
    this.startCalendarMonth = this.fsDatePickerCommon.getMomentSafe(this.startCalendarMonth);
    this.endCalendarMonth = this.fsDatePickerCommon.getMomentSafe(date);

    if (this.rangeCalendarsConflict(this.startCalendarMonth, this.endCalendarMonth)) {
      this.startCalendarMonth = subMonths(this.endCalendarMonth, 1);
    }
  }

  public hoverCalendar(day) {
    const date = new Date(day.date);

    if (
      this.parentDirective.ngModelStart &&
      !this.parentDirective.ngModelEnd &&
      isBefore(this.parentDirective.ngModelStart, date)
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
    return isAfter(startDate, endDate) ||
      lightFormat(startDate, 'yyyy-MM') === lightFormat(endDate, 'yyyy-MM');
  }

  public clear($event?) {
    this.parentDirective.cleared();
  }

}

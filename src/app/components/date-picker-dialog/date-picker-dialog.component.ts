import {
  Component,
  ViewEncapsulation,
  OnInit,
  Inject,
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

import { FsDatePickerModel } from '../../services/model.service';
import { FsDatePickerBaseDialogComponent } from '../../classes/base-dialog-component';
import { DIALOG_DATA } from '../../services/dialog-data';
import { FsDateDialogRef } from '../../classes/date-dialog-ref';
import { getSafeDate } from '../../helpers/get-safe-date';
import { takeUntil } from 'rxjs/operators';
import { addYears, isAfter, isBefore, isSameDay, subDays, subYears, startOfDay } from 'date-fns';


@Component({
    selector: 'fs-date-picker',
    templateUrl: './date-picker-dialog.component.html',
    styleUrls: ['./date-picker-dialog.component.scss'],
    providers: [ FsDatePickerModel ],
})
export class FsDatePickerDialogComponent extends FsDatePickerBaseDialogComponent implements OnInit {

  public model = null;
  public calendarMonth = null;
  public disabledDays = [];
  public disabledTimes = [];
  public timePickerExpanded = false;
  public mobileView = this.breakpointObserver.isMatched('(max-width: 737px)');
  public selectedDateTimeTab = 0;

  constructor(
    @Inject(DIALOG_DATA) public dialogData,
    public fsDatePickerModel: FsDatePickerModel,
    public breakpointObserver: BreakpointObserver,
    protected _dialogRef: FsDateDialogRef,
  ) {
    super(_dialogRef, dialogData.parentDirective);

    this._initModel();
    this._initComponents();
  }

  public ngOnInit() {
    this.initCalendar();

    if (this.dialogData.type) {
      if (this.dialogData.type === 'to') {
        this.disabledDays = this.getDisabledDays();
        this.disabledTimes = this.getDisabledTimes();
      }
    } else {
      this.disabledDays = this.getDisabledDays();
      this.disabledTimes = this.getDisabledTimes();
    }

    this._initBaseDate();

    this.breakpointObserver.observe('(max-width: 737px)')
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((state) => {
        this.mobileView = state.matches;
      });
  }
  public initCalendar() {
    this.model = this.dialogData.modelValue;
    this.calendarDrawMonth(this.model);
  }

  public setDate(date, preventClose = false) {

    if (this.dialogData.view === 'date') {
      date = startOfDay(date);
    }

    this.model = date;
    this._dialogRef.updateValue(this.model);
    this.calendarDrawMonth(this.model);

    if (this.fsDatePickerModel.view === 'date' && !preventClose) {
      this.close();
    }
  }

  public toggleTimeExpand() {
    this.timePickerExpanded = !this.timePickerExpanded;
  }

  public selectedDateTimeTabChange(index) {
    this.selectedDateTimeTab = index;
  }

  public setDateMode(mode) {
    this.fsDatePickerModel.dateMode = mode;
  }

  public calendarDrawMonth(date) {
    this.calendarMonth = getSafeDate(date || this.fsDatePickerModel.minDate);
  }

  public updateMonth(month) {
    if (this.model) {
      this.model.setMonth(month);
      this.setDate(new Date(this.model), true);
    }
  }

  public updateYear(year) {
    if (this.model) {
      this.model.setYear(year);
      this.setDate(new Date(this.model), true);
    }
  }

  private _initBaseDate() {

    if (!this.dialogData.pickerRef || this.dialogData.pickerRef.view !== 'time') {
      return;
    }

    const pickerModel = this.fsDatePickerModel;

    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    if (
      (!pickerModel.minDate || isAfter(date, pickerModel.minDate)) &&
      (!pickerModel.maxDate || isBefore(date, pickerModel.maxDate))
    ) {
      this.model = date;
    }
  }

  private _initModel() {
    this.fsDatePickerModel.view = this.dialogData.view;
    this.fsDatePickerModel.minYear = this.dialogData.minYear;
    this.fsDatePickerModel.maxYear = this.dialogData.maxYear;
    this.fsDatePickerModel.minDate = this.dialogData.minDate;
    this.fsDatePickerModel.maxDate = this.dialogData.maxDate;
    this.fsDatePickerModel.dateMode = this.dialogData.dateMode;
  }

  private _initComponents() {
    if (this.dialogData.components) {
      this.fsDatePickerModel.components = this.dialogData.components;
    }
  }

  private getDisabledTimes() {
    const ref = this.dialogData.pickerRef;

    if (!ref) { return }

    const arr = [];
    if (
      (ref.view === 'time' && ref.startDate) ||
      (ref.view === 'datetime' && ref.startDate && ref.endDate && isSameDay(ref.startDate, ref.endDate))
    ) {
      const from = (ref.startDate.getMinutes() + 1) + ((ref.startDate.getHours()) * 60);
      arr.push([0, from]);
    }

    return arr;
  }

  private getDisabledDays() {
    const result = [];

    if (this.fsDatePickerModel.minDate) {
      const from = subYears(new Date(), this.fsDatePickerModel.minYear);
      let to = new Date(this.fsDatePickerModel.minDate);

      if (this.dialogData.pickerRef && this.dialogData.pickerRef.view === 'datetime') {
        to = subDays(this.fsDatePickerModel.minDate, 1);
      }
      result.push([from, to]);
    }

    if (this.fsDatePickerModel.maxDate) {
      result.push([new Date(this.fsDatePickerModel.maxDate), addYears(new Date(), this.fsDatePickerModel.maxYear)]);
    }

    return result;
  }
}

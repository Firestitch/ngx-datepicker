import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Observable } from 'rxjs';
import {
  map,
  shareReplay,
} from 'rxjs/operators';

import { addMonths, isBefore } from 'date-fns';

import { FsDatePickerDialogModel } from '@libs/dialog/classes/dialog-model';

import { FsDatePickerDialogRef } from '../../../../classes/dialog-ref';


@Component({
  selector: 'fs-datepicker-month-range-picker',
  templateUrl: './month-range-picker.component.html',
  styleUrls: ['./month-range-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsMonthRangePickerComponent implements OnChanges {

  @Input()
  public dialogRef: FsDatePickerDialogRef;

  @Input()
  public datePickerModel: FsDatePickerDialogModel;

  public leftCalendarDate$: Observable<Date>;
  public rightCalendarDate$: Observable<Date>;

  public modelFrom$: Observable<Date>;
  public modelTo$: Observable<Date>;

  constructor() {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.datePickerModel?.currentValue
      && changes.datePickerModel?.firstChange
      && this.datePickerModel.view === 'monthrange'
    ) {
      this._initMonthRangeModels();
    }
  }

  public viewModeChanged(mode: string) {
    this.datePickerModel.setCalendarMode(mode);
  }

  public monthChanged(month: number) {
    this.datePickerModel.setCalendarMonth(month);
  }

  public yearChanged(year: number) {
    this.datePickerModel.setCalendarYear(year);
  }

  public nextMonth(): void {
    this.datePickerModel.nextMonth();
  }

  public prevMonth(): void {
    this.datePickerModel.prevMonth();
  }

  public dateChanged(date): void {
    const rangeRef = this.datePickerModel.rangePickerRef;
    const { startDate, endDate } = rangeRef;

    if (!startDate && !endDate) {
      rangeRef.updateStartDate(date);
    } else if (startDate && !endDate) {
      if (isBefore(date, startDate)) {
        rangeRef.updateStartDate(date);
        rangeRef.updateEndDate(null);
      } else {
        rangeRef.updateEndDate(date);
      }
    } else if (startDate && endDate) {
      rangeRef.updateStartDate(date);
      rangeRef.updateEndDate(null);
    }
  }

  public periodChanged(date): void {
    this.datePickerModel.period = date;

    this.close();
  }

  public setDateMode(mode) {
    this.datePickerModel.dateMode = mode;
  }

  public close(): void {
    this.dialogRef.close();
  }

  private _initMonthRangeModels(): void {
    this.leftCalendarDate$ = this.datePickerModel.calendarDate$;
    this.rightCalendarDate$ = this.datePickerModel.calendarDate$
      .pipe(
        map((value) => value && addMonths(value, 1) || null),
      );

    this.modelFrom$ = this.datePickerModel
      .rangePickerRef
      .startDate$
      .pipe(
        shareReplay(),
      );

    this.modelTo$ = this.datePickerModel
      .rangePickerRef
      .endDate$
      .pipe(
        shareReplay(),
      );
  }
}

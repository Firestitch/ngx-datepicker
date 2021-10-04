import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

import { FsDatePickerDialogModel } from '@libs/dialog/classes/dialog-model';

import { FsDatePickerDialogRef } from '../../../../classes/dialog-ref';


@Component({
  templateUrl: './desktop-dialog.component.html',
  styleUrls: ['./desktop-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsDesktopCalendarDialogComponent {

  public timePickerExpanded = false;
  public selectedDateTimeTab = 0;

  constructor(
    private _cd: ChangeDetectorRef,
    protected _dialogRef: FsDatePickerDialogRef,
  ) {}

  public get datePickerModel(): FsDatePickerDialogModel {
    return this._dialogRef.pickerModel;
  }

  public get dialogRef(): FsDatePickerDialogRef {
    return this._dialogRef;
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
    this.datePickerModel.model = date;

    this.close();
  }

  public periodChanged(date): void {
    this.datePickerModel.period = date;

    this.close();
  }

  public toggleTimeExpand() {
    this.timePickerExpanded = !this.timePickerExpanded;
  }

  public selectedDateTimeTabChange(index) {
    this.selectedDateTimeTab = index;
  }

  public setDateMode(mode) {
    this.datePickerModel.dateMode = mode;
  }

  public close(): void {
    this._dialogRef.close();
  }
}

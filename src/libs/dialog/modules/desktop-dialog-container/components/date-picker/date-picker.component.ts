import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { FsDatePickerDialogModel } from '@libs/dialog/classes/dialog-model';

import { FsDatePickerDialogRef } from '../../../../classes/dialog-ref';


@Component({
  selector: 'fs-datepicker-desktop-datepicker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsDesktopDatePickerComponent {

  @Input()
  public dialogRef: FsDatePickerDialogRef;

  @Input()
  public datePickerModel: FsDatePickerDialogModel;

  public timePickerExpanded = false;

  constructor() {}

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

  public setDateMode(mode) {
    this.datePickerModel.dateMode = mode;
  }

  public close(): void {
    this.dialogRef.close();
  }
}

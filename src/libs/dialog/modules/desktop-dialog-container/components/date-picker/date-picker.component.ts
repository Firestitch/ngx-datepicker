import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

import { FsDatePickerDialogModel } from '../../../../../dialog/classes/dialog-model';

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

  public get doneBtnClass(): ThemePalette {
    if (this.datePickerModel.isPickerRangeFrom) {
      return undefined;
    } else {
      return 'primary';
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

  public nextCalendar(): void {
    this.datePickerModel.rangePickerRef.activateToPicker();

    this.close();
  }

  public prevCalendar(): void {
    this.datePickerModel.rangePickerRef.activateFromPicker();

    this.close();
  }

  public dateChanged(date): void {
    this.datePickerModel.model = date;

    if (!this.datePickerModel.isDateTimeView && !this.datePickerModel.isTimeView) {
      this.close();
    }
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

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
} from '@angular/core';

import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { getDaysInMonth } from 'date-fns';

import { FsDatePickerDialogRef } from '@libs/dialog/classes/dialog-ref';


@Component({
  templateUrl: './date-scroll-picker-mobile-dialog.component.html',
  styleUrls: ['./date-scroll-picker-mobile-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsDateScrollPickerMobileDialogComponent {

  public years: number[] = [];
  public months: any[] = [];
  public days: number[] = [];

  public month;
  public day;
  public year;

  public showMonth;
  public showDay;
  public showYear;

  public readonly dialogRef: FsDatePickerDialogRef;

  constructor(
    public element: ElementRef,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    private _data: any,
    private _bottomSheetRef: MatBottomSheetRef<any>,
    private _cdRef: ChangeDetectorRef,
  ) {
    this.dialogRef = _data.dateDialogRef;
  }

  public change(save = false) {

    if (!this.year) {
      this.year = this.showYear ? this.years[0] : 0;
    }

    if (!this.month) {
      this.month = this.months[0];
    }

    if (!this.day) {
      this.day = this.days[0];
    }

    const daysInMonth = getDaysInMonth(new Date(this.year, this.month.value));

    if (this.day > daysInMonth) {
      this.day = daysInMonth;
    }

    if (save) {
      const date = new Date(this.year, this.month.value, this.day);
      this.dialogRef.updateValue(date);
    }

    this._cdRef.markForCheck();
  }

  public close(save = false) {
    if (save) {
      this.change(true);
    }


    this._bottomSheetRef.dismiss();
  }

}

import {
  ChangeDetectionStrategy,
  Component,
  Inject,
} from '@angular/core';

import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { FsDatePickerDialogRef } from '../../../../../dialog/classes/dialog-ref';


@Component({
  templateUrl: './date-scroll-picker-mobile-dialog.component.html',
  styleUrls: ['./date-scroll-picker-mobile-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsDateScrollPickerMobileDialogComponent {

  private _date: Date | null;

  private readonly _dialogRef: FsDatePickerDialogRef;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA)
    private _data: any,
    private _bottomSheetRef: MatBottomSheetRef<any>,
  ) {
    this._dialogRef = _data.dateDialogRef;
  }

  public get dialogRef(): FsDatePickerDialogRef {
    return this._dialogRef;
  }

  public change(date: Date | null) {
    this._date = date;
  }

  public close(save = false) {
    if (save) {
      this._dialogRef.updateValue(this._date);
    }

    this._bottomSheetRef.dismiss();
  }

}
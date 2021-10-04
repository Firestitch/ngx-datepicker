import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
} from '@angular/core';

import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { FsDatePickerDialogModel } from '@libs/dialog/classes/dialog-model';

import { FsDatePickerDialogRef } from '../../../../classes/dialog-ref';


@Component({
  templateUrl: './mobile-dialog.component.html',
  styleUrls: ['./mobile-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsMobileCalendarDialogComponent {

  public selectedDateTimeTab = 0;

  private readonly _dialogRef: FsDatePickerDialogRef;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA)
    private _data: any,
    private _cd: ChangeDetectorRef,
    private _bottomSheetRef: MatBottomSheetRef<any>,
  ) {
    this._dialogRef = this._data.dateDialogRef;
  }

  public get datePickerModel(): FsDatePickerDialogModel {
    return this._dialogRef.pickerModel;
  }

  public get dialogRef(): FsDatePickerDialogRef {
    return this._dialogRef;
  }

  public toggleTimeExpand() {
    this.datePickerModel.timeExpanded = !this.datePickerModel.timeExpanded;
  }

  public selectedDateTimeTabChange(index) {
    this.selectedDateTimeTab = index;
  }

  public close(): void {
    this._bottomSheetRef.dismiss();
  }

  public datetimeTabChanged(index: number) {
    this.selectedDateTimeTab = index;
  }
}

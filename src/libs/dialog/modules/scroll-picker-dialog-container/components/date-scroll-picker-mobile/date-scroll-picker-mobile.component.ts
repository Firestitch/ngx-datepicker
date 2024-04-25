import {
  ChangeDetectionStrategy,
  Component,
  Inject
} from '@angular/core';

import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { FsDatePickerDialogRef } from '../../../../classes/dialog-ref';
import { FsDateScrollPickerBaseComponent } from '../date-scroll-picker-base';


@Component({
  templateUrl: './date-scroll-picker-mobile.component.html',
  styleUrls: ['./date-scroll-picker-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsDateScrollPickerMobileComponent extends FsDateScrollPickerBaseComponent {
  
  private readonly _dialogRef: FsDatePickerDialogRef;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA)
    private _data: any,
    private _bottomSheetRef: MatBottomSheetRef<any>,
  ) {
    super();
    this._dialogRef = this._data.dateDialogRef;
  }

  public get dialogRef(): FsDatePickerDialogRef {
    return this._dialogRef;
  }

  public close(save = false) {
    if (save) {
      this._dialogRef.updateValue(this._date);
    }

    this._bottomSheetRef.dismiss();
  }

}

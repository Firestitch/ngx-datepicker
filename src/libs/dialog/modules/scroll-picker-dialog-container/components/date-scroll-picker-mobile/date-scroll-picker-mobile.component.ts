import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { FsDatePickerDialogRef } from '../../../../classes/dialog-ref';
import { FsDateScrollPickerBaseComponent } from '../date-scroll-picker-base';
import { FsDateScrollPickerDialogComponent } from '../date-scroll-picker/date-scroll-picker.component';
import { MatAnchor } from '@angular/material/button';


@Component({
    templateUrl: './date-scroll-picker-mobile.component.html',
    styleUrls: ['./date-scroll-picker-mobile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FsDateScrollPickerDialogComponent, MatAnchor],
})
export class FsDateScrollPickerMobileComponent extends FsDateScrollPickerBaseComponent {
  private _data = inject(MAT_BOTTOM_SHEET_DATA);
  private _bottomSheetRef = inject<MatBottomSheetRef<any>>(MatBottomSheetRef);

  
  private readonly _dialogRef: FsDatePickerDialogRef;

  constructor() {
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

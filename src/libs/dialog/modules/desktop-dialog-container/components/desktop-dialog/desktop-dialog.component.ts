import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FsDatePickerDialogModel } from '../../../../../dialog/classes/dialog-model';

import { FsDatePickerDialogRef } from '../../../../classes/dialog-ref';


@Component({
  templateUrl: './desktop-dialog.component.html',
  styleUrls: ['./desktop-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsDesktopCalendarDialogComponent {

  constructor(
    protected _dialogRef: FsDatePickerDialogRef,
  ) {}

  public get datePickerModel(): FsDatePickerDialogModel {
    return this._dialogRef.pickerModel;
  }

  public get dialogRef(): FsDatePickerDialogRef {
    return this._dialogRef;
  }

}

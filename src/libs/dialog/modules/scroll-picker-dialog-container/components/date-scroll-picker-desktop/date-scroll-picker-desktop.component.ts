import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

import { FsDatePickerDialogRef } from '@libs/dialog/classes/dialog-ref';


@Component({
  templateUrl: './date-scroll-picker-desktop.component.html',
  styleUrls: ['./date-scroll-picker-desktop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsDateScrollPickerDesktopComponent {

  private _date: Date | null;

  constructor(
    protected _dialogRef: FsDatePickerDialogRef,
  ) {}

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

    this._dialogRef.close();
  }

}

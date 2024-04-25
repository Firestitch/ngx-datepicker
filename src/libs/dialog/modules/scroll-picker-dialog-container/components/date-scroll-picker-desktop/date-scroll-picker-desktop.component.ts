import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

import { FsDatePickerDialogRef } from '../../../../../dialog/classes/dialog-ref';
import { FsDateScrollPickerBaseComponent } from '../date-scroll-picker-base';


@Component({
  templateUrl: './date-scroll-picker-desktop.component.html',
  styleUrls: ['./date-scroll-picker-desktop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsDateScrollPickerDesktopComponent extends FsDateScrollPickerBaseComponent {

  constructor(
    protected _dialogRef: FsDatePickerDialogRef,
  ) {
    super();
  }

  public get dialogRef(): FsDatePickerDialogRef {
    return this._dialogRef;
  }

  public close(save = false) {
    if (save) {
      this._dialogRef.updateValue(this._date);
    }

    this._dialogRef.close();
  }

}

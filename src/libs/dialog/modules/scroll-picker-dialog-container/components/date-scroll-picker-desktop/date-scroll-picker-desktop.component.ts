import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';

import { FsDatePickerDialogRef } from '../../../../../dialog/classes/dialog-ref';
import { FsDateScrollPickerDialogComponent } from '../date-scroll-picker/date-scroll-picker.component';


@Component({
  templateUrl: './date-scroll-picker-desktop.component.html',
  styleUrls: ['./date-scroll-picker-desktop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsDateScrollPickerDesktopComponent {
  public disabledSubmit = false;

  @ViewChild('scrollPickerRef')
  public scrollPickerRef: FsDateScrollPickerDialogComponent;

  private _date: Date | null;

  constructor(
    protected _dialogRef: FsDatePickerDialogRef,
  ) {}

  public get dialogRef(): FsDatePickerDialogRef {
    return this._dialogRef;
  }

  public change(date: Date | null) {
    this._date = date;

    if (this.scrollPickerRef?.maxDate && date > this.scrollPickerRef?.maxDate) {
      this.disabledSubmit = true;
    } else if (this.scrollPickerRef?.minDate && date < this.scrollPickerRef?.minDate) {
      this.disabledSubmit = true;
    } else {
      this.disabledSubmit = false;
    }
  }

  public close(save = false) {
    if (save) {
      this._dialogRef.updateValue(this._date);
    }

    this._dialogRef.close();
  }

}

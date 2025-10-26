import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

import { FsDatePickerDialogRef } from '../../../../../dialog/classes/dialog-ref';
import { FsDateScrollPickerBaseComponent } from '../date-scroll-picker-base';
import { FsDateScrollPickerDialogComponent } from '../date-scroll-picker/date-scroll-picker.component';
import { ActionButtonsComponent } from '../../../../../components/action-buttons/action-buttons.component';
import { MatAnchor } from '@angular/material/button';


@Component({
    templateUrl: './date-scroll-picker-desktop.component.html',
    styleUrls: ['./date-scroll-picker-desktop.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FsDateScrollPickerDialogComponent,
        ActionButtonsComponent,
        MatAnchor,
    ],
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

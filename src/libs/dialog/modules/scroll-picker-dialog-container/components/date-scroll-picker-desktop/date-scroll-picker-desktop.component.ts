import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MatAnchor } from '@angular/material/button';

import { ActionButtonsComponent } from '../../../../../components/action-buttons/action-buttons.component';
import { FsDatePickerDialogRef } from '../../../../../dialog/classes/dialog-ref';
import { FsDateScrollPickerBaseComponent } from '../date-scroll-picker-base';
import { FsDateScrollPickerDialogComponent } from '../date-scroll-picker/date-scroll-picker.component';


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
  protected _dialogRef = inject(FsDatePickerDialogRef);


  public get dialogRef(): FsDatePickerDialogRef {
    return this._dialogRef;
  }

  public close(save = false) {
    // Select is greyed while the wheel sits past min/max. pointer-events stop a mouse, but a
    // scripted click still reaches this handler before MatAnchor's disabled guard runs.
    if (save && this.disabledSubmit) {
      return;
    }

    if (save) {
      this._dialogRef.updateValue(this._date);
    }

    this._dialogRef.close();
  }

}

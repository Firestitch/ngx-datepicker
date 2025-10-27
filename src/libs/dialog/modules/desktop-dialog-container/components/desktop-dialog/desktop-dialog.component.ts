import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { FsDatePickerDialogModel } from '../../../../../dialog/classes/dialog-model';

import { FsDatePickerDialogRef } from '../../../../classes/dialog-ref';
import { NgClass, AsyncPipe } from '@angular/common';
import { FsMonthRangePickerComponent } from '../month-range-picker/month-range-picker.component';
import { FsDesktopDatePickerComponent } from '../date-picker/date-picker.component';


@Component({
    templateUrl: './desktop-dialog.component.html',
    styleUrls: ['./desktop-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgClass,
        FsMonthRangePickerComponent,
        FsDesktopDatePickerComponent,
        AsyncPipe,
    ],
})
export class FsDesktopCalendarDialogComponent {
  protected _dialogRef = inject(FsDatePickerDialogRef);


  public get datePickerModel(): FsDatePickerDialogModel {
    return this._dialogRef.pickerModel;
  }

  public get dialogRef(): FsDatePickerDialogRef {
    return this._dialogRef;
  }

}

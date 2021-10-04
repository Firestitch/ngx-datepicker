import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { FsDatePickerDialogModel } from '@libs/dialog/classes/dialog-model';


@Component({
  selector: 'fs-datepicker-mobile-timepicker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsMobileTimePickerComponent {

  @Input()
  public datePickerModel: FsDatePickerDialogModel;

  @Input()
  public autoClose = true;

  constructor(
    private _bottomSheet: MatBottomSheetRef,
  ) {
  }

  public dateChanged(date): void {
    this.datePickerModel.model = date;

    this.close();
  }

  public close(): void {
    if (this.autoClose) {
      this._bottomSheet.dismiss();
    }
  }

}

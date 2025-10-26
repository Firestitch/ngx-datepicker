import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { FsDatePickerDialogModel } from '../../../../../dialog/classes/dialog-model';
import { FsDatePickerTimeComponent } from '../../../../../calendar/components/time/time.component';
import { AsyncPipe } from '@angular/common';


@Component({
    selector: 'fs-datepicker-mobile-timepicker',
    templateUrl: './time-picker.component.html',
    styleUrls: ['./time-picker.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FsDatePickerTimeComponent, AsyncPipe],
})
export class FsMobileTimePickerComponent {

  @Input()
  public datePickerModel: FsDatePickerDialogModel;

  @Input()
  public autoClose = true;

  @Input()
  public showNotSelected = true;

  constructor(
    private _bottomSheet: MatBottomSheetRef,
  ) {
  }

  public dateChanged(date): void {
    this.datePickerModel.model = date;
  }

  public close(): void {
    if (this.autoClose) {
      this._bottomSheet.dismiss();
    }
  }

}

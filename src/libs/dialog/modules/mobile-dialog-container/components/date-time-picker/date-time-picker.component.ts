import {
  ChangeDetectionStrategy,
  Component, EventEmitter,
  Input, Output,
} from '@angular/core';

import { FsDatePickerDialogModel } from '@libs/dialog/classes/dialog-model';

import { FsDatePickerDialogRef } from '../../../../classes/dialog-ref';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'fs-datepicker-mobile-datetime-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FDatePickerMobileDatetimePickerComponent {

  @Input()
  public datePickerModel: FsDatePickerDialogModel;

  @Output()
  public tabChange = new EventEmitter<number>();

  constructor(
    private _bottomSheet: MatBottomSheetRef,
  ) {
  }

  public selectedDateTimeTabChange(index: number): void {
    this.tabChange.emit(index);
  }

}

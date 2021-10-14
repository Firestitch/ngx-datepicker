import {
  ChangeDetectionStrategy,
  Component, EventEmitter,
  Input, Output,
} from '@angular/core';

import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { FsDatePickerDialogModel } from '../../../../../dialog/classes/dialog-model';

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

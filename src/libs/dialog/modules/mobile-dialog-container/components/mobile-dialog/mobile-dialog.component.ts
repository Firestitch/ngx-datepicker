import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { FsDatePickerDialogModel } from '../../../../../dialog/classes/dialog-model';
import { FsDatePickerDialogRef } from '../../../../classes/dialog-ref';
import { FsDatePickerVirtualScrollCalendarComponent } from '../virtual-scroll-calendar/virtual-scroll-calendar.component';
import { FsMobileTimePickerComponent } from '../time-picker/time-picker.component';
import { FDatePickerMobileDatetimePickerComponent } from '../date-time-picker/date-time-picker.component';
import { ActionButtonsComponent } from '../../../../../components/action-buttons/action-buttons.component';
import { MatAnchor } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';


@Component({
    templateUrl: './mobile-dialog.component.html',
    styleUrls: ['./mobile-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FsDatePickerVirtualScrollCalendarComponent,
        FsMobileTimePickerComponent,
        FDatePickerMobileDatetimePickerComponent,
        ActionButtonsComponent,
        MatAnchor,
        AsyncPipe,
    ],
})
export class FsMobileCalendarDialogComponent {
  private _data = inject(MAT_BOTTOM_SHEET_DATA);
  private _bottomSheetRef = inject(MatBottomSheetRef);


  public selectedDateTimeTab = 0;

  private readonly _dialogRef: FsDatePickerDialogRef;

  constructor() {
    this._dialogRef = this._data.dateDialogRef;
  }

  public get datePickerModel(): FsDatePickerDialogModel {
    return this._dialogRef.pickerModel;
  }

  public get dialogRef(): FsDatePickerDialogRef {
    return this._dialogRef;
  }

  public toggleTimeExpand() {
    this.datePickerModel.timeExpanded = !this.datePickerModel.timeExpanded;
  }

  public selectedDateTimeTabChange(index) {
    this.selectedDateTimeTab = index;
  }

  public close(): void {
    this._bottomSheetRef.dismiss();
  }

  public datetimeTabChanged(index: number) {
    this.selectedDateTimeTab = index;
  }
}

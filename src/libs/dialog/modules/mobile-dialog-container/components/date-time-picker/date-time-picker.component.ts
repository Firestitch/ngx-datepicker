import {
  ChangeDetectionStrategy,
  Component, EventEmitter,
  Input, Output,
} from '@angular/core';

import { FsDatePickerDialogModel } from '../../../../../dialog/classes/dialog-model';
import { MatTabGroup, MatTab, MatTabLabel } from '@angular/material/tabs';
import { FsDatePickerVirtualScrollCalendarComponent } from '../virtual-scroll-calendar/virtual-scroll-calendar.component';
import { FsMobileTimePickerComponent } from '../time-picker/time-picker.component';
import { AsyncPipe, LowerCasePipe, DatePipe } from '@angular/common';

@Component({
    selector: 'fs-datepicker-mobile-datetime-picker',
    templateUrl: './date-time-picker.component.html',
    styleUrls: ['./date-time-picker.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatTabGroup,
        MatTab,
        MatTabLabel,
        FsDatePickerVirtualScrollCalendarComponent,
        FsMobileTimePickerComponent,
        AsyncPipe,
        LowerCasePipe,
        DatePipe,
    ],
})
export class FDatePickerMobileDatetimePickerComponent {

  @Input()
  public datePickerModel: FsDatePickerDialogModel;

  @Output()
  public tabChange = new EventEmitter<number>();

  public selectedDateTimeTabChange(index: number): void {
    this.tabChange.emit(index);
  }

}

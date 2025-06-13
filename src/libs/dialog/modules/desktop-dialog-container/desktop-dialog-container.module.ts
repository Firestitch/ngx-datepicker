import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { FsDateModule } from '@firestitch/date';

import { FsDatePickerCalendarModule } from '../../../calendar/calendar.module';
import { ActionButtonsComponent } from '../../../components/action-buttons/action-buttons.component';

import { FsDesktopDatePickerComponent } from './components/date-picker/date-picker.component';
import { FsDesktopCalendarDialogComponent } from './components/desktop-dialog/desktop-dialog.component';
import { FsDatePickerHeaderMonthRangeComponent } from './components/header-month-range/header-month-range.component';
import { FsDatePickerHeaderComponent } from './components/header/header.component';
import { FsMonthRangePickerComponent } from './components/month-range-picker/month-range-picker.component';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,

    FsDatePickerCalendarModule,
    FsDateModule,
    ActionButtonsComponent,
    ScrollingModule,
  ],
  declarations: [
    FsDesktopCalendarDialogComponent,
    FsDatePickerHeaderComponent,
    FsDesktopDatePickerComponent,
    FsMonthRangePickerComponent,
    FsDatePickerHeaderMonthRangeComponent,
  ],
  exports: [
    FsDesktopCalendarDialogComponent,
    FsDatePickerHeaderComponent,
  ],
})
export class FsDatePickerDesktopDialogContainerModule {}

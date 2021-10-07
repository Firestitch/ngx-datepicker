import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { FsDateModule } from '@firestitch/date';

import { FsDatePickerCalendarModule } from '@libs/calendar/calendar.module';

import { FsDesktopCalendarDialogComponent } from './components/desktop-dialog/desktop-dialog.component';
import { FsDatePickerHeaderComponent } from './components/header/header.component';
import { FsDesktopDatePickerComponent } from './components/date-picker/date-picker.component';
import { FsMonthRangePickerComponent } from './components/month-range-picker/month-range-picker.component';
import { FsDatePickerHeaderMonthRangeComponent } from './components/header-month-range/header-month-range.component';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,

    FsDatePickerCalendarModule,
    FsDateModule,
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
  ],
})
export class FsDatePickerDesktopDialogContainerModule {}

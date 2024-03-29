import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { ScrollingModule } from '@angular/cdk/scrolling';

import { FsDateModule } from '@firestitch/date';

import { FsDatePickerCalendarModule } from '../../../calendar/calendar.module';

import { FsMobileCalendarDialogComponent } from './components/mobile-dialog/mobile-dialog.component';
import { FsDatePickerMobileHeaderComponent } from './components/header/header.component';
import { FsMobileTimePickerComponent } from './components/time-picker/time-picker.component';
import { FDatePickerMobileDatetimePickerComponent } from './components/date-time-picker/date-time-picker.component';
import { FsDatePickerMobileHeaderMonthRangeComponent } from './components/header-month-range/header-month-range.component';
import { FsDatePickerVirtualScrollCalendarComponent } from './components/virtual-scroll-calendar/virtual-scroll-calendar.component';


@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,

    FsDatePickerCalendarModule,
    FsDateModule,
    ScrollingModule,
    MatListModule,
  ],
  declarations: [
    FsMobileCalendarDialogComponent,
    FsDatePickerMobileHeaderComponent,
    FsMobileTimePickerComponent,
    FDatePickerMobileDatetimePickerComponent,
    FsDatePickerMobileHeaderMonthRangeComponent,
    FsDatePickerVirtualScrollCalendarComponent,
  ],
  exports: [
    FsMobileCalendarDialogComponent,
  ],
})
export class FsDatePickerMobileDialogContainerModule {}

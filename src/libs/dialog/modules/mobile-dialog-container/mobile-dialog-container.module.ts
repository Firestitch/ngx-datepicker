import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';

import { FsDateModule } from '@firestitch/date';

import { FsDatePickerCalendarModule } from '../../../calendar/calendar.module';
import { ActionButtonsComponent } from '../../../components';

import { FDatePickerMobileDatetimePickerComponent } from './components/date-time-picker/date-time-picker.component';
import { FsDatePickerMobileHeaderMonthRangeComponent } from './components/header-month-range/header-month-range.component';
import { FsDatePickerMobileHeaderComponent } from './components/header/header.component';
import { FsMobileCalendarDialogComponent } from './components/mobile-dialog/mobile-dialog.component';
import { FsMobileTimePickerComponent } from './components/time-picker/time-picker.component';
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
    ActionButtonsComponent,
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

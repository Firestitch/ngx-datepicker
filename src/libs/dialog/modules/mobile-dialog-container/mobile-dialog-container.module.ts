import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { ScrollingModule } from '@angular/cdk/scrolling';

import { FsDateModule } from '@firestitch/date';

import { FsDatePickerCalendarModule } from '@libs/calendar/calendar.module';

import { FsMobileCalendarDialogComponent } from './components/mobile-dialog/mobile-dialog.component';
import { FsDatePickerMobileHeaderComponent } from './components/header/header.component';
import { FsMobileTimePickerComponent } from './components/time-picker/time-picker.component';
import { FsDatePickerTmpMobileCalendarComponent } from './components/tmp-mobile-calendar/tmp-mobile-calendar.component';
import { FDatePickerMobileDatetimePickerComponent } from './components/date-time-picker/date-time-picker.component';


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
    FsDatePickerTmpMobileCalendarComponent,
    FDatePickerMobileDatetimePickerComponent,
  ],
  exports: [
    FsMobileCalendarDialogComponent,
  ],
})
export class FsDatePickerMobileDialogContainerModule {}

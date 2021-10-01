import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { FsDateModule } from '@firestitch/date';

import { FsDatePickerCalendarModule } from '@libs/calendar/calendar.module';

import { FsDesktopCalendarDialogComponent } from './components/desktop-dialog/desktop-dialog.component';
import { FsDatePickerHeaderComponent } from './components/header/header.component';


@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,

    FsDatePickerCalendarModule,
    FsDateModule,
    ScrollingModule,
  ],
  declarations: [
    FsDesktopCalendarDialogComponent,
    FsDatePickerHeaderComponent,
  ],
  exports: [
    FsDesktopCalendarDialogComponent,
  ],
})
export class FsDatePickerDesktopDialogContainerModule {}

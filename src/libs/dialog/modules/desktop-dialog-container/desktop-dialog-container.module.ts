import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';

import { FsDatePickerCalendarModule } from '@libs/calendar/calendar.module';

import { FsDesktopCalendarDialogComponent } from './components/desktop-dialog/desktop-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,

    FsDatePickerCalendarModule,
  ],
  declarations: [
    FsDesktopCalendarDialogComponent,
  ],
  exports: [
    FsDesktopCalendarDialogComponent,
  ],
})
export class FsDatePickerDesktopDialogContainerModule {}

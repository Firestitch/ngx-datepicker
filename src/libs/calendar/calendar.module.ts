import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';

import { FsDatePickerCalendarComponent } from './components/calendar/calendar.component';
import { FsDatePickerTimeComponent } from './components/time/time.component';


@NgModule({
  imports: [
    CommonModule,

    MatIconModule,
  ],
  declarations: [
    FsDatePickerCalendarComponent,
    FsDatePickerTimeComponent,
  ],
  exports: [
    FsDatePickerCalendarComponent,
    FsDatePickerTimeComponent,
  ],
})
export class FsDatePickerCalendarModule {}

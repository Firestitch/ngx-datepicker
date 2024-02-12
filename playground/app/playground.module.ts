import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { FsDateModule } from '@firestitch/date';
import { FsExampleModule } from '@firestitch/example';
import { FsFormModule } from '@firestitch/form';
import { FsLabelModule } from '@firestitch/label';
import { FsMessageModule } from '@firestitch/message';
import { FsScrollbarModule } from '@firestitch/scrollbar';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FsDatePickerModule } from '../../src/app/datepicker.module';

import { AppComponent } from './app.component';
import {
  BirthdayExampleComponent, CalendarExampleComponent, DateExampleComponent,
  DateRangeExampleComponent, DateScrollPickerComponent, DateTimeExampleComponent,
  DateTimeRangeExampleComponent, DatetimeTzExampleComponent,
  MinMaxComponent, MonthExampleComponent, OnlyHoursExampleComponent,
  TimeExampleComponent, TimeRangeExampleComponent,
  WeekPickerComponent,
} from './components';
import { TzOffsetPipe } from './components/datetime-tz-example/tz-offset.pipe';
import { AppMaterialModule } from './material.module';


@NgModule({
  bootstrap: [AppComponent],
  imports: [
    RouterModule.forRoot([]),
    BrowserModule,
    FsDatePickerModule.forRoot(),
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsScrollbarModule.forRoot(),
    FsExampleModule.forRoot(),
    FsFormModule,
    FsLabelModule,
    FsMessageModule.forRoot(),
    FsDateModule,
  ],
  declarations: [
    AppComponent,
    DateExampleComponent,
    TimeExampleComponent,
    DateTimeExampleComponent,
    DateTimeRangeExampleComponent,
    DateRangeExampleComponent,
    TimeRangeExampleComponent,
    BirthdayExampleComponent,
    DateScrollPickerComponent,
    OnlyHoursExampleComponent,
    WeekPickerComponent,
    MonthExampleComponent,
    DatetimeTzExampleComponent,
    TzOffsetPipe,
    CalendarExampleComponent,
    MinMaxComponent,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'legacy' },
    },
  ],
})
export class PlaygroundModule {}

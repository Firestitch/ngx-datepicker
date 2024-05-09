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
  SelectExampleComponent,
  TimeExampleComponent, TimeRangeExampleComponent,
  WeekPickerComponent,
} from './components';
import { TzOffsetPipe } from './components/datetime-tz-example/tz-offset.pipe';
import { AppMaterialModule } from './material.module';


@NgModule({
  bootstrap: [AppComponent],
  imports: [
    RouterModule.forRoot([]),
    FsDatePickerModule.forRoot(),
    FsScrollbarModule.forRoot(),
    FsExampleModule.forRoot(),
    FsMessageModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    AppMaterialModule,
    FormsModule,
    FsFormModule,
    FsLabelModule,
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
    SelectExampleComponent,
    DatetimeTzExampleComponent,
    TzOffsetPipe,
    CalendarExampleComponent,
    MinMaxComponent,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'auto', appearance: 'outline' },
    },
  ],
})
export class PlaygroundModule {}

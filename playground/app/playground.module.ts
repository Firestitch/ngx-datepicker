import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
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
import { CalendarExampleComponent, MinMaxComponent } from './components';
import { BirthdayExampleComponent } from './components/birthday-example/birthday-example.component';
import { DateExampleComponent } from './components/date-example/date-example.component';
import { DateRangeExampleComponent } from './components/date-range-example/date-range-example.component';
import { DateScrollPickerComponent } from './components/date-scroll-picker/date-scroll-picker.component';
import { DateTimeRangeExampleComponent } from './components/date-time-range-example/date-time-range-example.component';
import { DateTimeExampleComponent } from './components/datetime-example/datetime-example.component';
import { DatetimeTzExampleComponent } from './components/datetime-tz-example/datetime-tz-example.component';
import { TzOffsetPipe } from './components/datetime-tz-example/tz-offset.pipe';
import { MonthExampleComponent } from './components/month-example/month-example.component';
import { OnlyHoursExampleComponent } from './components/only-hours-example/only-hours-example.component';
import { TimeExampleComponent } from './components/time-example/time-example.component';
import { TimeRangeExampleComponent } from './components/timerange-example/timerange-example.component';
import { WeekPickerComponent } from './components/week-example/week-picker.component';
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
    MatBottomSheetModule,
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

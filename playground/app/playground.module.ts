import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FsExampleModule } from '@firestitch/example';
import { FsFormModule } from '@firestitch/form';
import { FsMessageModule } from '@firestitch/message';
import { FsDatePickerModule } from '@firestitch/datepicker';

import { ToastrModule } from 'ngx-toastr';

import { AppMaterialModule } from './material.module';
import { AppComponent } from './app.component';

import { DateExampleComponent } from './components/date-example/date-example.component';
import { TimeExampleComponent } from './components/time-example/time-example.component';
import { DateTimeExampleComponent } from './components/datetime-example/datetime-example.component';
import { DateTimeRangeExampleComponent } from './components/datetimerange-example/datetimerange-example.component';
import { DateRangeExampleComponent } from './components/daterange-example/daterange-example.component';
import { TimeRangeExampleComponent } from './components/timerange-example/timerange-example.component';
import { BirthdayExampleComponent } from './components/birthday-example/birthday-example.component';
import { NewDateRangeExampleComponent } from './components/date-range-example/date-range-example.component';


@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    FsDatePickerModule.forRoot(),
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsExampleModule.forRoot(),
    FsFormModule,
    FsMessageModule.forRoot(),
    ToastrModule.forRoot({ preventDuplicates: true }),
  ],
  entryComponents: [
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
    NewDateRangeExampleComponent,
  ],
  providers: [
  ],
})
export class PlaygroundModule {}

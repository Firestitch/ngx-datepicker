import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FsExampleModule } from '@firestitch/example';
import { FsFormModule } from '@firestitch/form';
import { FsMessageModule } from '@firestitch/message';
import { FsDatePickerModule } from '@firestitch/datepicker';
import { FsScrollbarModule } from '@firestitch/scrollbar';

import { ToastrModule } from 'ngx-toastr';

import { AppMaterialModule } from './material.module';
import { AppComponent } from './app.component';

import { DateExampleComponent } from './components/date-example/date-example.component';
import { TimeExampleComponent } from './components/time-example/time-example.component';
import { DateTimeExampleComponent } from './components/datetime-example/datetime-example.component';
import { DateTimeRangeExampleComponent } from './components/date-time-range-example/date-time-range-example.component';
import { DateRangeExampleComponent } from './components/date-range-example/date-range-example.component';
import { TimeRangeExampleComponent } from './components/timerange-example/timerange-example.component';
import { BirthdayExampleComponent } from './components/birthday-example/birthday-example.component';
import { DateScrollPickerComponent } from './components/date-scroll-picker/date-scroll-picker.component';


@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    FsDatePickerModule.forRoot(),
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsScrollbarModule.forRoot(),
    FsExampleModule.forRoot(),
    FsFormModule,
    FsMessageModule.forRoot(),
    ToastrModule.forRoot({ preventDuplicates: true }),
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
    DateScrollPickerComponent
  ],
  providers: [
  ],
})
export class PlaygroundModule {}

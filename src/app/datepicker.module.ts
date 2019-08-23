import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatSelectModule,
  MatTabsModule
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';

import { FsClearModule } from '@firestitch/clear';
import { FsScrollPickerModule } from '@firestitch/scroll-picker';

import 'hammerjs'

import { FsDatePickerComponent } from './components/date-picker/date-picker.component';

import { FsDatePickerDialogComponent } from './components/date-picker-dialog/date-picker-dialog.component';
import { FsDatePickerCalendarComponent } from './components/calendar/calendar.component';
import { FsDatepickerSummaryComponent } from './components/summary/summary.component';
import { FsDatePickerTimeComponent } from './components/time/time.component';
import { DateRangeSeparatorComponent } from './components/date-range-separator/date-range-separator.component';
import { DateRangePickerToComponent } from './components/range-picker/to/range-picker-to.component';
import { DateRangePickerFromComponent } from './components/range-picker/from/range-picker-from.component';

import { FsDatepickerFactory} from './services/factory.service';
import { FsRangePickerStoreService } from './services/range-picker-store.service';
import { FsDateScrollPickerDialogComponent } from './components/date-scroll-picker-dialog/date-scroll-picker-dialog.component';
import { FsDateScrollPickerComponent } from './components/date-scroll-picker/date-scroll-picker.component';
import { FsDatePickerBirthdayComponent } from './components/date-picker-birthday/date-picker-birthday.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    LayoutModule,
    FsClearModule,
    FsScrollPickerModule
  ],
  entryComponents: [
    FsDatePickerDialogComponent,
    FsDateScrollPickerDialogComponent,
    DateRangeSeparatorComponent
  ],
  declarations: [
    FsDatePickerComponent,
    FsDatepickerSummaryComponent,
    FsDatePickerDialogComponent,
    FsDatePickerCalendarComponent,
    FsDatePickerTimeComponent,
    DateRangeSeparatorComponent,
    DateRangePickerFromComponent,
    DateRangePickerToComponent,
    FsDateScrollPickerDialogComponent,
    FsDateScrollPickerComponent,
    FsDatePickerBirthdayComponent
  ],
  exports: [
    FsDatePickerComponent,
    DateRangeSeparatorComponent,
    DateRangePickerFromComponent,
    DateRangePickerToComponent,
    FsDateScrollPickerComponent,
    FsDatePickerBirthdayComponent
  ],
})
export class FsDatePickerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsDatePickerModule,
      providers: [
        FsDatepickerFactory,
        FsRangePickerStoreService,
      ]
    };
  }
}

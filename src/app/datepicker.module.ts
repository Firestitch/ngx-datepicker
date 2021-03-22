import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { LayoutModule } from '@angular/cdk/layout';

import { FsClearModule } from '@firestitch/clear';
import { FsScrollPickerModule } from '@firestitch/scroll-picker';

import { FsDatePickerComponent } from './components/date-picker/date-picker.component';

import { FsDatePickerDialogComponent } from './components/date-picker-dialog/date-picker-dialog.component';
import { FsDatePickerCalendarComponent } from './components/calendar/calendar.component';
import { FsDatepickerSummaryComponent } from './components/summary/summary.component';
import { FsDatePickerTimeComponent } from './components/time/time.component';
import { DateRangeSeparatorComponent } from './components/date-range-separator/date-range-separator.component';
import { DateTimeRangePickerFromComponent } from './components/range-picker/from/date-time-range-picker-from.component';
import { DateTimeRangePickerToComponent } from './components/range-picker/to/date-time-range-picker-to.component';
import { TimeRangePickerFromComponent } from './components/range-picker/from/time-range-picker-from.component';
import { TimeRangePickerToComponent } from './components/range-picker/to/time-range-picker-to.component';
import { DateRangePickerFromComponent } from './components/range-picker/from/date-range-picker-from.component';
import { DateRangePickerToComponent } from './components/range-picker/to/date-range-picker-to.component';
import { FsDateScrollPickerDialogComponent } from './components/date-scroll-picker-dialog/date-scroll-picker-dialog.component';
import { FsDateScrollPickerComponent } from './components/date-scroll-picker/date-scroll-picker.component';
import { FsDatePickerBirthdayComponent } from './components/date-picker-birthday/date-picker-birthday.component';
import { FsDateWeekPickerComponent } from './components/date-week-picker/date-week-picker.component';
import { FsDateTimePickerComponent } from './components/date-time-picker/date-time-picker.component';
import { FsTimePickerComponent } from './components/time-picker/time-picker.component';

import { FsDatepickerFactory} from './services/factory.service';
import { FsRangePickerStoreService } from './services/range-picker-store.service';


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
    FsDatePickerBirthdayComponent,
    FsDateWeekPickerComponent,
    FsTimePickerComponent,
    DateTimeRangePickerFromComponent,
    DateTimeRangePickerToComponent,
    FsDateTimePickerComponent,
    TimeRangePickerFromComponent,
    TimeRangePickerToComponent,
  ],
  exports: [
    FsDatePickerComponent,
    DateRangeSeparatorComponent,
    DateRangePickerFromComponent,
    DateRangePickerToComponent,
    FsDateScrollPickerComponent,
    FsDatePickerBirthdayComponent,
    FsDateWeekPickerComponent,
    FsTimePickerComponent,
    DateTimeRangePickerFromComponent,
    DateTimeRangePickerToComponent,
    FsDateTimePickerComponent,
    TimeRangePickerFromComponent,
    TimeRangePickerToComponent,
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

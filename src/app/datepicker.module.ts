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

import { FsDatePickerCalendarModule } from '@libs/calendar/calendar.module';
import { FsDatePickerDialogModule } from '@libs/dialog/dialog.module';

import { FsDatePickerComponent } from './components/date-picker/date-picker.component';
import { DateRangeSeparatorComponent } from './components/date-range-separator/date-range-separator.component';
import { DateTimeRangePickerFromComponent } from './components/range-picker/from/date-time-range-picker-from.component';
import { DateTimeRangePickerToComponent } from './components/range-picker/to/date-time-range-picker-to.component';
import { TimeRangePickerFromComponent } from './components/range-picker/from/time-range-picker-from.component';
import { TimeRangePickerToComponent } from './components/range-picker/to/time-range-picker-to.component';
import { DateRangePickerFromComponent } from './components/range-picker/from/date-range-picker-from.component';
import { DateRangePickerToComponent } from './components/range-picker/to/date-range-picker-to.component';
import { FsDateScrollPickerComponent } from './components/date-scroll-picker/date-scroll-picker.component';
import { FsDatePickerBirthdayComponent } from './components/date-picker-birthday/date-picker-birthday.component';
import { FsDateWeekPickerComponent } from './components/date-week-picker/date-week-picker.component';
import { FsDateTimePickerComponent } from './components/date-time-picker/date-time-picker.component';
import { FsTimePickerComponent } from './components/time-picker/time-picker.component';
import { FsDatePickerTriggerComponent } from './components/date-picker-trigger/date-picker-trigger.component';
import { MonthRangePickerFromComponent } from './components/range-picker/from/month-range-picker-from.component';
import { MonthRangePickerToComponent } from './components/range-picker/to/month-range-picker-to.component';

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
    FsScrollPickerModule,
    FsDatePickerCalendarModule,
  ],
  declarations: [
    FsDatePickerComponent,
    DateRangeSeparatorComponent,
    DateRangePickerFromComponent,
    DateRangePickerToComponent,
    FsDateScrollPickerComponent,
    FsDatePickerBirthdayComponent,
    FsDatePickerTriggerComponent,
    FsDateWeekPickerComponent,
    FsTimePickerComponent,
    DateTimeRangePickerFromComponent,
    DateTimeRangePickerToComponent,
    FsDateTimePickerComponent,
    TimeRangePickerFromComponent,
    TimeRangePickerToComponent,
    MonthRangePickerFromComponent,
    MonthRangePickerToComponent,
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
    MonthRangePickerFromComponent,
    MonthRangePickerToComponent,
  ],
})
export class FsDatePickerModule {
  static forRoot(): ModuleWithProviders<FsDatePickerModule> {
    return {
      ngModule: FsDatePickerModule,
      providers: [
        [...FsDatePickerDialogModule.forRoot().providers],
        FsRangePickerStoreService,
      ]
    };
  }
}

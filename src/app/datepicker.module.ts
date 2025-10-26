import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LayoutModule } from '@angular/cdk/layout';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

import { FsClearModule } from '@firestitch/clear';
import { FsScrollPickerModule } from '@firestitch/scroll-picker';


import { FsDatePickerDialogModule } from '../libs/dialog/dialog.module';


import { FsWeekdaySelectComponent } from './components';
import { FsDateCalendarPickerComponent } from './components/calendar-picker/calendar-picker.component';
import { FsDatePickerBirthdayComponent } from './components/date-picker-birthday/date-picker-birthday.component';
import { FsDatePickerTriggerComponent } from './components/date-picker-trigger/date-picker-trigger.component';
import { FsDatePickerComponent } from './components/date-picker/date-picker.component';
import { DateRangeSeparatorComponent } from './components/date-range-separator/date-range-separator.component';
import { FsDateScrollPickerComponent } from './components/date-scroll-picker/date-scroll-picker.component';
import { FsDateTimePickerComponent } from './components/date-time-picker/date-time-picker.component';
import { FsDateWeekPickerComponent } from './components/date-week-picker/date-week-picker.component';
import { DateRangePickerFromComponent } from './components/range-picker/from/date-range-picker-from.component';
import { DateTimeRangePickerFromComponent } from './components/range-picker/from/date-time-range-picker-from.component';
import { MonthRangePickerFromComponent } from './components/range-picker/from/month-range-picker-from.component';
import { TimeRangePickerFromComponent } from './components/range-picker/from/time-range-picker-from.component';
import { DateRangePickerToComponent } from './components/range-picker/to/date-range-picker-to.component';
import { DateTimeRangePickerToComponent } from './components/range-picker/to/date-time-range-picker-to.component';
import { MonthRangePickerToComponent } from './components/range-picker/to/month-range-picker-to.component';
import { TimeRangePickerToComponent } from './components/range-picker/to/time-range-picker-to.component';
import { FsTimePickerComponent } from './components/time-picker/time-picker.component';
import { FsTimeSelectComponent } from './components/time-select';
import { IFsDatePickerConfig } from './interfaces/datepicker-config.interface';
import { FS_DATEPICKER_CONFIG } from './providers/datepicker-config.provider';
import { FsRangePickerStoreService } from './services/range-picker-store.service';


@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatMenuModule,
    MatBottomSheetModule,
    MatSelectModule,
    LayoutModule,
    FsClearModule,
    FsScrollPickerModule,
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
    FsDateCalendarPickerComponent,
    FsWeekdaySelectComponent,
    FsTimeSelectComponent,
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
        FsDateCalendarPickerComponent,
        FsWeekdaySelectComponent,
        FsTimeSelectComponent,
    ],
})
export class FsDatePickerModule {
  public static forRoot(config?: IFsDatePickerConfig): ModuleWithProviders<FsDatePickerModule> {
    const providers: Provider[] = [];

    if (!!config) {
      providers.push(
        {
          provide: FS_DATEPICKER_CONFIG,
          useValue: config,
        },
      )
    }

    return {
      ngModule: FsDatePickerModule,
      providers: [
        [...FsDatePickerDialogModule.forRoot().providers],
        FsRangePickerStoreService,
        ...providers,
      ],
    };
  }
}

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

import 'hammerjs'

import { FsDatePickerBirthdayComponent } from './components/birthday/birthday.component';
import { FsDatePickerComponent } from './components/datepicker/datepicker.component';

import { FsDatePickerDialogComponent } from './components/datepicker-dialog/datepicker-dialog.component';
import { FsDatePickerBirthdayDialogComponent } from './components/birthday-dialog/birthday-dialog.component';
import { FsDatePickerCalendarComponent } from './components/calendar/calendar.component';
import { FsDatepickerPresetsComponent } from './components/presets/presets.component';
import { FsDatepickerSummaryComponent } from './components/summary/summary.component';
import { FsDatePickerTimeComponent } from './components/time/time.component';
import { DateRangeSeparatorComponent } from './components/date-range-separator/date-range-separator.component';
import { DateRangePickerToComponent } from './components/range-picker/to/range-picker-to.component';
import { DateRangePickerFromComponent } from './components/range-picker/from/range-picker-from.component';

import { FsIsscrollDirective } from './directives/is-scroll.directive';
// import { ClickDirective } from './directives/click.directive';

import { FsDatepickerBirthdayFactory, } from './services/birthday-factory.service';
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
    FsClearModule
  ],
  exports: [
    FsDatePickerComponent,
    FsDatePickerBirthdayComponent,
    DateRangeSeparatorComponent,
    DateRangePickerFromComponent,
    DateRangePickerToComponent,
  ],
  entryComponents: [
    FsDatePickerDialogComponent,
    FsDatePickerBirthdayDialogComponent,
    DateRangeSeparatorComponent
  ],
  declarations: [
    FsDatePickerComponent,
    FsDatepickerSummaryComponent,
    FsDatepickerPresetsComponent,
    FsDatePickerDialogComponent,
    FsDatePickerBirthdayDialogComponent,
    FsDatePickerCalendarComponent,
    FsDatePickerTimeComponent,
    FsDatePickerBirthdayComponent,
    DateRangeSeparatorComponent,
    DateRangePickerFromComponent,
    DateRangePickerToComponent,

    FsIsscrollDirective,
    // ClickDirective,
  ],
})
export class FsDatePickerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsDatePickerModule,
      providers: [
        FsDatepickerFactory,
        FsDatepickerBirthdayFactory,
        FsRangePickerStoreService,
      ]
    };
  }
}

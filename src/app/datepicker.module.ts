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

import { FsClearModule } from '@firestitch/clear';

import 'hammerjs'

import { FsDatePickerBirthdayComponent } from './components/birthday/birthday.component';
import { FsDatePickerComponent } from './components/datepicker/datepicker.component';

import { FsDatePickerDialogComponent } from './components/datepicker-dialog/datepicker-dialog.component';
import { FsDatePickerBirthdayDialogComponent } from './components/birthday-dialog/birthday-dialog.component';
import { FsDatePickerCalendarComponent } from './components/calendar/calendar.component';
import { FsDatepickerPresetsComponent } from './components/presets/presets.component';
import { FsDatePickerRangeDialogComponent } from './components/range-dialog/range-dialog.component';
import { FsDatepickerSummaryComponent } from './components/summary/summary.component';
import { FsDatePickerTimeComponent } from './components/time/time.component';
import { FsDatePickerRangeComponent } from './components/range/range.component';
import { DateRangeSeparatorComponent } from './components/date-range-separator/date-range-separator.component';

import { FsIsscrollDirective } from './directives/is-scroll.directive';
import { ClickDirective } from './directives/click.directive';
import { DateRangePickerFromDirective } from './directives/date-range-picker-from.directive';
import { DateRangePickerToDirective } from './directives/date-range-picker-to.directive';

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
    FsClearModule
  ],
  exports: [
    FsDatePickerComponent,
    FsDatePickerRangeComponent,
    FsDatePickerBirthdayComponent,
    DateRangeSeparatorComponent,
    DateRangePickerFromDirective,
    DateRangePickerToDirective,
  ],
  entryComponents: [
    FsDatePickerDialogComponent,
    FsDatePickerRangeDialogComponent,
    FsDatePickerBirthdayDialogComponent,
    DateRangeSeparatorComponent
  ],
  declarations: [
    FsDatePickerComponent,
    FsDatePickerRangeComponent,
    FsDatepickerSummaryComponent,
    FsDatepickerPresetsComponent,
    FsDatePickerDialogComponent,
    FsDatePickerRangeDialogComponent,
    FsDatePickerBirthdayDialogComponent,
    FsDatePickerCalendarComponent,
    FsDatePickerTimeComponent,
    FsDatePickerBirthdayComponent,
    DateRangeSeparatorComponent,

    FsIsscrollDirective,
    ClickDirective,
    DateRangePickerFromDirective,
    DateRangePickerToDirective,
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

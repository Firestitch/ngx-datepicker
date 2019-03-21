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

import 'hammerjs'

import { FsDatePickerBirthdayComponent } from './components/birthday/birthday.component';
import { FsDatePickerComponent } from './components/datepicker/datepicker.component';
import { FsIsscrollDirective } from './directives/is-scroll.directive';

import { FsDatePickerDialogComponent } from './components/datepicker-dialog/datepicker-dialog.component';
import { FsDatePickerBirthdayDialogComponent } from './components/birthday-dialog/birthday-dialog.component';
import { FsDatePickerCalendarComponent } from './components/calendar/calendar.component';
import { FsDatepickerPresetsComponent } from './components/presets/presets.component';
import { FsDatePickerRangeDialogComponent } from './components/range-dialog/range-dialog.component';
import { FsDatepickerSummaryComponent } from './components/summary/summary.component';
import { FsDatePickerTimeComponent } from './components/time/time.component';

import { FsDatepickerBirthdayFactory, } from './services/birthday-factory.service';
import { FsDatePickerCommon } from './services/common.service';
import { FsDatepickerFactory} from './services/factory.service';
import { FsDatepickerRangeFactory} from './services/range-factory.service';

import { FsClearModule } from '@firestitch/clear';
import { FsDatePickerRangeComponent } from './components/range/range.component';
import { ClickDirective } from './directives/click.directive';


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
    FsDatePickerBirthdayComponent
  ],
  entryComponents: [
    FsDatePickerDialogComponent,
    FsDatePickerRangeDialogComponent,
    FsDatePickerBirthdayDialogComponent
  ],
  declarations: [
    FsDatePickerComponent,
    FsDatePickerRangeComponent,
    FsDatepickerSummaryComponent,
    FsDatepickerPresetsComponent,
    FsDatePickerDialogComponent,
    FsDatePickerRangeDialogComponent,
    FsDatePickerBirthdayDialogComponent,
    FsIsscrollDirective,
    FsDatePickerCalendarComponent,
    FsDatePickerTimeComponent,
    FsDatePickerBirthdayComponent,
    ClickDirective
  ],
  providers: [
    FsDatepickerFactory,
    FsDatepickerRangeFactory,
    FsDatePickerCommon,
    FsDatepickerBirthdayFactory
  ],
})
export class FsDatePickerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsDatePickerModule,
      providers: [
        FsDatepickerFactory,
        FsDatepickerRangeFactory,
        FsDatepickerBirthdayFactory,
        FsDatePickerCommon,
      ]
    };
  }
}

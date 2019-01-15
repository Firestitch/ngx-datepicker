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

import { ClickDirective } from './directives/click.directive';
import { FsDatePickBirthdayDirective } from './directives/birthday.directive';
import { FsDatePickDirective } from './directives/datepicker.directive';
import { FsDatePickRangeDirective } from './directives/range.directive';
import { FsIsscrollDirective } from './directives/is-scroll.directive';

import { FsDatepickerComponent } from './components/datepicker/datepicker.component';
import { FsDatepickerBirthdayComponent } from './components/birthday/birthday.component';
import { FsDatePickerCalendarComponent } from './components/calendar/calendar.component';
import { FsDatepickerPresetsComponent } from './components/presets/presets.component';
import { FsDatepickerRangeComponent } from './components/range/range.component';
import { FsDatepickerSummaryComponent } from './components/summary/summary.component';
import { FsDatePickerTimeComponent } from './components/time/time.component';

import { FsDatepickerBirthdayFactory, } from './services/birthday-factory.service';
import { FsDatePickerCommon } from './services/common.service';
import { FsDatepickerFactory} from './services/factory.service';
import { FsDatepickerRangeFactory} from './services/range-factory.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule
  ],
  exports: [
    FsDatePickDirective,
    FsDatePickRangeDirective,
    FsDatePickBirthdayDirective
  ],
  entryComponents: [
    FsDatepickerComponent,
    FsDatepickerRangeComponent,
    FsDatepickerBirthdayComponent
  ],
  declarations: [
    FsDatePickDirective,
    FsDatePickRangeDirective,
    FsDatepickerSummaryComponent,
    FsDatepickerPresetsComponent,
    FsDatepickerComponent,
    FsDatepickerRangeComponent,
    FsIsscrollDirective,
    FsDatePickerCalendarComponent,
    FsDatePickerTimeComponent,
    FsDatePickBirthdayDirective,
    FsDatepickerBirthdayComponent,
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

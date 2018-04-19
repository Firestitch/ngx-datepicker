import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatMenuModule } from '@angular/material';
import { MatTabsModule } from '@angular/material';

import { FsDatePickDirective } from './directives/fsdatepick.directive';
import { FsDatePickRangeDirective } from './directives/fsdatepickrange.directive';
import { FsIsscrollDirective  } from './directives/fsisscroll.directive';

import { FsDatepickerComponent } from './components/fsdatepicker/fsdatepicker.component';
import { FsDatepickerRangeComponent } from './components/fsdatepickerrange/fsdatepickerrange.component';
import { FsDatepickerSummaryComponent } from './components/fsdatepickersummary/fsdatepickersummary.component';
import { FsDatepickerPresetsComponent } from './components/fsdatepickerpresets/fsdatepickerpresets.component';
import { FsDatePickerCalendarComponent } from './components/fsdatepickercalendar/fsdatepickercalendar.component';
import { FsDatePickerTimeComponent } from './components/fsdatepickertime/fsdatepickertime.component';

import { FsDatepickerFactory } from './services/fsdatepickerfactory.service';
import { FsDatepickerRangeFactory } from './services/fsdatepickerrangefactory.service';
import { FsDatePickerCommon } from './services/fsdatepickercommon.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatMenuModule
  ],
  exports: [
    FsDatePickDirective,
    FsDatePickRangeDirective
  ],
  entryComponents: [
    FsDatepickerComponent,
    FsDatepickerRangeComponent
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
    FsDatePickerTimeComponent
  ],
  providers: [
    FsDatepickerFactory,
    FsDatepickerRangeFactory,
    FsDatePickerCommon
  ],
})
export class FsDatePickerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsDatePickerModule,
      providers: [FsDatepickerFactory, FsDatepickerRangeFactory, FsDatePickerCommon]
    };
  }
}

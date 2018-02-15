import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { FsCommonModule } from '@firestitch/common';

import { FsDatePickDirective } from './directives/fsdatepick.directive';
import { FsIsscrollDirective  } from './directives/fsisscroll.directive';

import { FsDatepickerComponent } from './components/fsdatepicker/fsdatepicker.component';
import { FsDatePickerCalendarComponent } from './components/fsdatepickercalendar/fsdatepickercalendar.component';
import { FsDatePickerTimeComponent } from './components/fsdatepickertime/fsdatepickertime.component';

import { FsDatepickerFactory } from './services/fsdatepickerfactory.service';
import { FsDatePickerCommon } from './services/fsdatepickercommon.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FsCommonModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    FsDatePickDirective
  ],
  entryComponents: [
    FsDatepickerComponent
  ],
  declarations: [
    FsDatePickDirective,
    FsDatepickerComponent,
    FsIsscrollDirective,
    FsDatePickerCalendarComponent,
    FsDatePickerTimeComponent
  ],
  providers: [
    FsDatepickerFactory,
    FsDatePickerCommon
  ],
})
export class FsDatePickerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsDatePickerModule,
      providers: [FsDatepickerFactory, FsDatePickerCommon]
    };
  }
}

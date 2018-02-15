import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { FsDatePickerDirective } from './directives/fsdatepicker.directive';
import { FsDatepickerDialogComponent } from './components/fsdatepickerdialog/fsdatepickerdialog.component';
import { FsDateComponent } from './components/fsdate/fsdate.component';
import { FsTimeComponent } from './components/fstime/fstime.component';
import { FsDatepickerDialogFactory } from './services/fsdatepickerdialogfactory.service';
import { FsDatePickerModel } from './services/fsdatepickermodel.service';
import { FsCommonModule } from '@firestitch/common';
import { FsIsscrollDirective  } from './directives/fsisscroll.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FsCommonModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    FsDatePickerDirective
  ],
  entryComponents: [
    FsDatepickerDialogComponent
  ],
  declarations: [
    FsDatePickerDirective,
    FsDatepickerDialogComponent,
    FsIsscrollDirective,
    FsDateComponent,
    FsTimeComponent
  ],
  providers: [
    FsDatepickerDialogFactory,
    FsDatePickerModel
  ],
})
export class FsDatePickerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsDatePickerModule,
      providers: [FsDatepickerDialogFactory, FsDatePickerModel]
    };
  }
}

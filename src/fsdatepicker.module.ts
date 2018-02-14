import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { FsDatepickerDirective } from './directives/fsdatepicker.directive';
import { FsDatepickerDialogComponent } from './components/fsdatepickerdialog/fsdatepickerdialog.component';
import { FsDateComponent } from './components/fsdate/fsdate.component';
import { FsDatepickerDialogFactory } from './services/fsdatepickerdialogfactory.service';
import { FsDatepicker } from './services/fsdatepicker.service';
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
    FsDatepickerDirective
  ],
  entryComponents: [
    FsDatepickerDialogComponent
  ],
  declarations: [
    FsDatepickerDirective,
    FsDatepickerDialogComponent,
    FsIsscrollDirective,
    FsDateComponent
  ],
  providers: [
    FsDatepickerDialogFactory,
    FsDatepicker
  ],
})
export class FsDatepickerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsDatepickerModule,
      providers: [FsDatepickerDialogFactory, FsDatepicker]
    };
  }
}

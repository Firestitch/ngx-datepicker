import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FsDatepickerDirective } from './fsdatepicker.directive';
import { FsDatepickerDialogComponent } from './fsdatepickerdialog.component';
import { FsDatepickerDialogFactory } from './fsdatepickerdialogfactory.service';
import { FsUtil } from '@firestitch/common';
import { FsIsscrollDirective  } from './fsisscroll.directive';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatIconModule
],
declarations: [
  FsDatepickerDirective,
  FsDatepickerDialogComponent,
  FsIsscrollDirective
],
providers: [
  FsDatepickerDialogFactory,
  FsUtil
],
entryComponents: [
  FsDatepickerDialogComponent
],
exports: [
  FsDatepickerDirective
})
export class FsDatepickerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsDatepickerModule,
      providers: [
        FsDatepickerDirective
      ]
    };
  }
}

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { FsDatepickerDirective } from './fsdatepicker.directive';
import { FsDatepickerDialogComponent } from './fsdatepickerdialog.component';
import { FsDatepickerDialogFactory } from './fsdatepickerdialogfactory.service';
import { FsCommonModule } from '@firestitch/common';
import { FsIsscrollDirective  } from './fsisscroll.directive';

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
    FsIsscrollDirective
  ],
  providers: [
    FsDatepickerDialogFactory
  ],
})
export class FsDatepickerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsDatepickerModule,
      providers: [FsDatepickerDialogFactory]
    };
  }
}

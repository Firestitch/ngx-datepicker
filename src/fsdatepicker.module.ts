import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FsDatepickerDirective } from './fsdatepicker.directive';
import { FsDatepickerDialogComponent } from './fsdatepickerdialog.component';
import { FsDatepickerDialogFactory } from './fsdatepickerdialogfactory.service';
import { FsUtil } from './../common/fsutil.service';
import { FsIsscrollDirective  } from './fsisscroll.directive';

@NgModule({
    imports: [
      CommonModule,
      FlexLayoutModule,
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
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class FsDatepickerModule {

}

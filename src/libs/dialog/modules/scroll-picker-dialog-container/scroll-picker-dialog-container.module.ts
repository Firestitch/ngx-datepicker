import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';

import { FsScrollPickerModule } from '@firestitch/scroll-picker';

import { FsDateScrollPickerDialogComponent } from './components/date-scroll-picker-dialog/date-scroll-picker-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    MatButtonModule,

    FsScrollPickerModule,
  ],
  declarations: [
    FsDateScrollPickerDialogComponent,
  ],
  exports: [
    FsDateScrollPickerDialogComponent,
  ],
})
export class FsDatePickerScrollPickerDialogContainerModule {}

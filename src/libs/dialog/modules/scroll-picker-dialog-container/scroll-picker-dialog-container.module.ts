import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';

import { FsScrollPickerModule } from '@firestitch/scroll-picker';

import { FsDateScrollPickerMobileDialogComponent } from './components/date-scroll-picker-mobile-dialog/date-scroll-picker-mobile-dialog.component';
import { FsDateScrollPickerDesktopComponent } from './components/date-scroll-picker-desktop/date-scroll-picker-desktop.component';
import { FsDateScrollPickerDialogComponent } from './components/date-scroll-picker/date-scroll-picker.component';
import { MatListModule } from '@angular/material/list';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    MatButtonModule,

    FsScrollPickerModule,
    MatListModule,
  ],
  declarations: [
    FsDateScrollPickerDesktopComponent,
    FsDateScrollPickerMobileDialogComponent,
    FsDateScrollPickerDialogComponent,
  ],
  exports: [
    FsDateScrollPickerDesktopComponent,
    FsDateScrollPickerMobileDialogComponent,
  ],
})
export class FsDatePickerScrollPickerDialogContainerModule {}

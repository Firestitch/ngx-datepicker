import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { FsScrollPickerModule } from '@firestitch/scroll-picker';

import { ActionButtonsComponent } from '../../../components';

import { FsDateScrollPickerDesktopComponent } from './components/date-scroll-picker-desktop/date-scroll-picker-desktop.component';
import { FsDateScrollPickerMobileComponent } from './components/date-scroll-picker-mobile/date-scroll-picker-mobile.component';
import { FsDateScrollPickerDialogComponent } from './components/date-scroll-picker/date-scroll-picker.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    
    MatButtonModule,

    FsScrollPickerModule,
    MatListModule,
    ActionButtonsComponent,
  ],
  declarations: [
    FsDateScrollPickerDesktopComponent,
    FsDateScrollPickerMobileComponent,
    FsDateScrollPickerDialogComponent,
  ],
  exports: [
    FsDateScrollPickerDesktopComponent,
    FsDateScrollPickerMobileComponent,
  ],
})
export class FsDatePickerScrollPickerDialogContainerModule {}

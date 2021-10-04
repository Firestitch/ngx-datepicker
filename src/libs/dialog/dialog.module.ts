import { ModuleWithProviders, NgModule } from '@angular/core';

import { FsDatePickerDialogFactory } from './services/dialog-factory.service';
import { FsDatePickerDesktopDialogContainerModule } from './modules/desktop-dialog-container/desktop-dialog-container.module';
import { FsDatePickerScrollPickerDialogContainerModule } from './modules/scroll-picker-dialog-container/scroll-picker-dialog-container.module';
import { FsDatePickerMobileDialogContainerModule } from './modules/mobile-dialog-container/mobile-dialog-container.module';


@NgModule({
  imports: [
    FsDatePickerDesktopDialogContainerModule,
    FsDatePickerScrollPickerDialogContainerModule,
    FsDatePickerMobileDialogContainerModule,
  ],
})
export class FsDatePickerDialogModule {
  static forRoot(): ModuleWithProviders<FsDatePickerDialogModule> {
    return {
      ngModule: FsDatePickerDialogModule,
      providers: [
        FsDatePickerDialogFactory,
      ]
    };
  }
}

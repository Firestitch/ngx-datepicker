import { ModuleWithProviders, NgModule } from '@angular/core';




import { FsDatePickerDialogFactory } from './services/dialog-factory.service';


@NgModule({
  imports: [],
})
export class FsDatePickerDialogModule {
  public static forRoot(): ModuleWithProviders<FsDatePickerDialogModule> {
    return {
      ngModule: FsDatePickerDialogModule,
      providers: [
        FsDatePickerDialogFactory,
      ],
    };
  }
}

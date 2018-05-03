import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatMenuModule } from '@angular/material';
import { MatTabsModule } from '@angular/material';

import {  FsDatePickDirective,
          FsDatePickRangeDirective,
          FsIsscrollDirective } from './directives';

import {  FsDatepickerComponent,
          FsDatepickerRangeComponent,
          FsDatepickerSummaryComponent,
          FsDatepickerPresetsComponent,
          FsDatePickerCalendarComponent,
          FsDatePickerTimeComponent } from './components';

import {  FsDatepickerFactory,
          FsDatepickerRangeFactory,
          FsDatePickerCommon } from './services';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatMenuModule
  ],
  exports: [
    FsDatePickDirective,
    FsDatePickRangeDirective
  ],
  entryComponents: [
    FsDatepickerComponent,
    FsDatepickerRangeComponent
  ],
  declarations: [
    FsDatePickDirective,
    FsDatePickRangeDirective,
    FsDatepickerSummaryComponent,
    FsDatepickerPresetsComponent,
    FsDatepickerComponent,
    FsDatepickerRangeComponent,
    FsIsscrollDirective,
    FsDatePickerCalendarComponent,
    FsDatePickerTimeComponent
  ],
  providers: [
    FsDatepickerFactory,
    FsDatepickerRangeFactory,
    FsDatePickerCommon
  ],
})
export class FsDatePickerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsDatePickerModule,
      providers: [FsDatepickerFactory, FsDatepickerRangeFactory, FsDatePickerCommon]
    };
  }
}

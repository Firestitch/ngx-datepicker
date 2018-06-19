import './styles.scss';

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import {  MatButtonModule,
          MatIconModule,
          MatMenuModule,
          MatTabsModule,
          MatSelectModule } from '@angular/material';

import {  FsDatePickDirective,
          FsDatePickRangeDirective,
          FsIsscrollDirective,
          FsDatePickBirthdayDirective} from './directives';

import {  FsDatepickerComponent,
          FsDatepickerRangeComponent,
          FsDatepickerSummaryComponent,
          FsDatepickerPresetsComponent,
          FsDatePickerCalendarComponent,
          FsDatePickerTimeComponent,
          FsDatepickerBirthdayComponent } from './components';

import {  FsDatepickerFactory,
          FsDatepickerRangeFactory,
          FsDatepickerBirthdayFactory,
          FsDatePickerCommon } from './services';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule
  ],
  exports: [
    FsDatePickDirective,
    FsDatePickRangeDirective,
    FsDatePickBirthdayDirective
  ],
  entryComponents: [
    FsDatepickerComponent,
    FsDatepickerRangeComponent,
    FsDatepickerBirthdayComponent
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
    FsDatePickerTimeComponent,
    FsDatePickBirthdayDirective,
    FsDatepickerBirthdayComponent,
  ],
  providers: [
    FsDatepickerFactory,
    FsDatepickerRangeFactory,
    FsDatePickerCommon,
    FsDatepickerBirthdayFactory
  ],
})
export class FsDatePickerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsDatePickerModule,
      providers: [FsDatepickerFactory, FsDatepickerRangeFactory, FsDatepickerBirthdayFactory, FsDatePickerCommon]
    };
  }
}

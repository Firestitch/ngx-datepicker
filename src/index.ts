import { FsIsscrollDirective } from './fsisscroll.directive';
import { FsDatepickerDialogFactory } from './fsdatepickerdialogfactory.service';
import { FsDatepickerDialogComponent } from './fsdatepickerdialog.component';
import { FsDatepickerDirective } from './fsdatepicker.directive';
import { HttpClientModule } from '@angular/common/http';
import { FsApiConfig } from './../.tmp/fsapi.service';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { JsonpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

export * from './fsapi.service';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,

    //MATERIAL
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    FlexLayoutModule
    //MATERIAL END
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
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsDatepickerModule,
      providers: [
        FsDatepickerDialogFactory,
        FsUtil
      ]
    };
  }
}

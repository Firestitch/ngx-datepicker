import {
  Component,
  ViewEncapsulation,
  OnInit,
  Inject,
} from '@angular/core';
import { FsDatePickerModel } from '../../services/model.service';
import { FsDatePickerBaseDialogComponent } from '../../classes/base-dialog-component';
import { DIALOG_DATA } from '../../services/dialog-data';
import { FsDateDialogRef } from '../../classes/date-dialog-ref';
import { getSafeDate } from '../../helpers/get-safe-date';


@Component({
    selector: 'fs-date-picker',
    templateUrl: './datepicker-dialog.component.html',
    styleUrls: ['./datepicker-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [ FsDatePickerModel ],
})
export class FsDatePickerDialogComponent extends FsDatePickerBaseDialogComponent implements OnInit {

  public model = null;
  public calendarMonth = null;
  public disabledDays = null;

  constructor(
    @Inject(DIALOG_DATA) public dialogData,
    public fsDatePickerModel: FsDatePickerModel,
    private _dialogRef: FsDateDialogRef,
  ) {
    super();

    this._initModel();
    this._initComponents();
    // this.parentDirective = this.dialogData.parentDirective;
  }

  public ngOnInit() {
    this.initCalendar();
    this.disabledDays = this.fsDatePickerModel.disabledDays();
  }

  public initCalendar() {
    // this.model = this.parentDirective.getModelValue();
    this.model = this.dialogData.modelValue;
    this.calendarDrawMonth(this.model);
  }

  public setDate(date) {
    this.model = date;
    this._dialogRef.updateValue(this.model);
    // this.parentDirective.updateValue(date);
    this.calendarDrawMonth(this.model);

    if (this.fsDatePickerModel.view === 'date') {
      this.close();
    }
  }

  public close() {
    this._dialogRef.close();
    // this.dialogData.parentDirective.close();
  }

  public setDateMode(mode) {
    this.fsDatePickerModel.dateMode = mode;
  }

  public setComponents(data) {
    this.fsDatePickerModel.components = data;
  }

  public calendarDrawMonth(date) {
    this.calendarMonth = getSafeDate(date || this.fsDatePickerModel.minDate);
  }

  private _initModel() {
    this.fsDatePickerModel.view = this.dialogData.view;
    this.fsDatePickerModel.minYear = this.dialogData.minYear;
    this.fsDatePickerModel.maxYear = this.dialogData.maxYear;
    this.fsDatePickerModel.minDate = this.dialogData.minDate;
    this.fsDatePickerModel.maxDate = this.dialogData.maxDate;
    this.fsDatePickerModel.presets = this.dialogData.presets;
    this.fsDatePickerModel.dateMode = this.dialogData.dateMode;
  }

  private _initComponents() {
    if (this.dialogData.components) {
      this.fsDatePickerModel.components = this.dialogData.components;
    }
  }
}

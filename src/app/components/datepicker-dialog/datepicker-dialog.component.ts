import { Component, ElementRef, ViewEncapsulation, OnInit } from '@angular/core';
import { FsDatePickerModel } from '../../services/model.service';
import { FsDatePickerCommon } from '../../services/common.service';
import { FsDatePickerBaseDialogComponent } from '../../classes/base-dialog-component';


@Component({
    selector: 'fs-date-picker',
    templateUrl: './datepicker-dialog.component.html',
    styleUrls: ['./datepicker-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [FsDatePickerModel]
})
export class FsDatePickerDialogComponent extends FsDatePickerBaseDialogComponent implements OnInit {

  public model = null;
  public calendarMonth = null;
  public disabledDays = null;

  constructor(
    public element: ElementRef,
    public fsDatePickerModel: FsDatePickerModel,
    private fsDatePickerCommon: FsDatePickerCommon,
  ) {
    super();
  }

  public ngOnInit() {
    this.initCalendar();
    this.disabledDays = this.fsDatePickerModel.disabledDays();
  }

  public initCalendar() {
    this.model = this.parentDirective.getModelValue();
    this.calendarDrawMonth(this.model);
  }

  public setDate(date) {
    this.model = date;
    this.parentDirective.updateValue(date);
    this.calendarDrawMonth(this.model);

    if (this.fsDatePickerModel.view === 'date') {
      this.close();
    }
  }

  public setDateMode(mode) {
    this.fsDatePickerModel.dateMode = mode;
  }

  public setComponents(data) {
    this.fsDatePickerModel.components = data;
  }

  public calendarDrawMonth(date) {
    this.calendarMonth = this.fsDatePickerCommon.getMomentSafe(date);
  }
}

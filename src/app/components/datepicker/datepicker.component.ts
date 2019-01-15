import { Component, HostListener, ElementRef, ViewEncapsulation, OnInit } from '@angular/core';
import { FsDatePickerModel } from '../../services/model.service';
import { FsDatePickerCommon } from '../../services/common.service';
import { FsDatePickerBaseComponent } from '../../classes/base-component';


@Component({
    selector: 'fs-date-picker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [FsDatePickerModel]
})
export class FsDatepickerComponent extends FsDatePickerBaseComponent implements OnInit {

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

  @HostListener('document:keydown', ['$event'])
  public documentKeydown(e) {
    if (e.keyCode === 27) {
      // Be careful with preventing default events. Breaking page refresh functional
      e.preventDefault();
      this.close(e);
    }
  }

  public ngOnInit() {
    this.initCalendar();
    this.disabledDays = this.fsDatePickerModel.disabledDays();
  }

  public initCalendar() {
    this.model = this.parentDirective.getValue();
    this.calendarDrawMonth(this.model);
  }

  public setDate(date) {
    this.model = date;
    this.parentDirective.writeValue(date);
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

import { Component, Input, HostListener, ElementRef, ViewEncapsulation, OnInit, AfterViewInit } from '@angular/core';
import { FsDatePickerModel } from './../../services/fsdatepickermodel.service';
import { FsDatePickerCommon } from './../../services/fsdatepickercommon.service';
import { FsDatePickerBaseComponent } from './../../classes/fsdatepickerbase.component';
import * as moment from 'moment-timezone';

@Component({
    selector: 'fs-date-picker',
    templateUrl: './fsdatepicker.component.html',
    styleUrls: ['./fsdatepicker.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [FsDatePickerModel]
})
export class FsDatepickerComponent extends FsDatePickerBaseComponent implements OnInit {

  public model = null;
  public calendarMonth = null;
  public disabledDays = null;

  constructor(
    public fsDatePickerModel: FsDatePickerModel,
    private fsDatePickerCommon: FsDatePickerCommon,
    public element: ElementRef) {
      super();
     }

  ngOnInit() {
    this.initCalendar();
    this.disabledDays = this.fsDatePickerModel.disabledDays();
  }

  initCalendar() {
    this.model = this.parentDirective.getValue();
    this.calendarDrawMonth(this.model);
  }

  setDate(date) {
    this.model = date;
    this.parentDirective.writeValue(date);
    this.calendarDrawMonth(this.model);

    if (this.fsDatePickerModel.view === 'date') {
      this.close();
    }
  }

  setDateMode(mode) {
    this.fsDatePickerModel.dateMode = mode;
  }

  setComponents(data) {
    this.fsDatePickerModel.components = data;
  }

  calendarDrawMonth(date) {
    this.calendarMonth = this.fsDatePickerCommon.getMomentSafe(date);
  }

  @HostListener('document:keydown', ['$event'])
  documentKeydown(e) {
    if (e.keyCode === 27) {
        // Be careful with preventing default events. Breaking page refresh functional
        e.preventDefault();
        this.close(e);
      }
  }
}

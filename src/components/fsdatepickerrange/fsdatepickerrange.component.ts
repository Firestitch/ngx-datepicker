import { Component, Input, HostListener, ViewChild, ElementRef, IterableDiffers,
  ViewEncapsulation, OnInit, DoCheck } from '@angular/core';
import { FsDatePickerModel } from './../../services/fsdatepickermodel.service';
import * as moment from 'moment-timezone';

@Component({
    selector: 'fsDatePickerRange',
    templateUrl: './fsdatepickerrange.component.html',
    styleUrls: ['./../../styles.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [FsDatePickerModel]
})
export class FsDatepickerRangeComponent implements OnInit, DoCheck {

  parentInstance: any = null;

  toDisabledDays = [];
  toDisabledTimes = [];

  private modelDiffer = null;

  constructor(
    public fsDatePickerModel: FsDatePickerModel,
    public element: ElementRef,
    private _iterableDiffers: IterableDiffers
  ) {
    this.modelDiffer = this._iterableDiffers.find([]).create(null);
  }

  ngOnInit() { }

  ngDoCheck() {
    if (this.modelDiffer.diff([this.parentInstance.ngModelStart, this.parentInstance.ngModelEnd])) {

      const startDate = this.parentInstance.ngModelStart;
      let endDate = this.parentInstance.ngModelEnd;

      if (startDate && endDate && endDate.isBefore(startDate)) {
        endDate = startDate.isSame(endDate, 'day') ? startDate : undefined;
        setTimeout(() => {
          this.setEndDate(endDate);
        });
      }
      this.toDisabledDaysUpdate(startDate, endDate);
      this.toDisabledTimesUpdate(startDate, endDate);
    }
  }

  setStartDate(date) {
    this.setDates(date, this.parentInstance.ngModelEnd);
  }

  setEndDate(date) {
    this.setDates(this.parentInstance.ngModelStart, date);
  }

  setDates(startDate, endDate) {
    this.parentInstance.writeValue(startDate, endDate);
  }

  toDisabledDaysUpdate(startDate, endDate) {
    this.toDisabledDays = startDate ? [[moment().subtract(99, 'year'), startDate.clone()]] : [];
  }

  toDisabledTimesUpdate(startDate, endDate) {
    this.toDisabledTimes = [];

    if (startDate && endDate && startDate.isSame(endDate, 'day')) {

      const from = parseInt(startDate.format('m')) + (parseInt(startDate.format('H')) * 60);
      const to = parseInt(endDate.format('m')) + (parseInt(endDate.format('H')) * 60);

      if (startDate) {
        this.toDisabledTimes.push([0, from]);
      }
    }
  }

  setDateModeStart(mode) {
    this.fsDatePickerModel.dateMode.start_date = mode;
  }

  setDateModeEnd(mode) {
    this.fsDatePickerModel.dateMode.end_date = mode;
  }

  setComponents(data) {
    this.fsDatePickerModel.components = data;
  }

  close($event?) {
    this.parentInstance.opened = false;
  }

  @HostListener('document:keydown', ['$event'])
  documentKeydown(e) {
    if (e.keyCode === 27) {
        // Be careful with preventing default events. Breaking page refresh functional
        e.preventDefault();
        this.close(e);
      }
  }

  range(type) {

    let startDate = moment();
    let endDate = moment();

    if (type == 'today') {
      startDate = startDate.startOf('day');
      endDate = endDate.endOf('day');
    } else if (type == 'yesterday') {
      startDate = startDate.subtract(1, 'day').startOf('day');
      endDate = endDate.subtract(1, 'day').endOf('day');
    } else if (type == 'last_7') {
      startDate = startDate.subtract(7, 'days');
    } else if (type == 'last_30') {
      startDate = startDate.subtract(30, 'days');
    } else if (type == 'current_month') {
      startDate = startDate.startOf('month');
      endDate = endDate.endOf('month');
    } else if (type == 'last_month') {
      startDate = startDate.subtract(1, 'month').startOf('month');
      endDate = endDate.subtract(1, 'month').endOf('month');
    }

    this.setDates(startDate, endDate);
  }
}

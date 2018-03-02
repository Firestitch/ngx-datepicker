import { Component, Input, HostListener, ElementRef, IterableDiffers,
  ViewEncapsulation, OnInit, DoCheck } from '@angular/core';
import { FsUtil } from '@firestitch/common';
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

  constructor(public fsDatePickerModel: FsDatePickerModel,
    public element: ElementRef, public fsUtil: FsUtil, private _iterableDiffers: IterableDiffers) {
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
    this.parentInstance.writeValue(date, this.parentInstance.ngModelEnd);
  }

  setEndDate(date) {
    this.parentInstance.writeValue(this.parentInstance.ngModelStart, date);
  }

  toDisabledDaysUpdate(startDate, endDate) {
    this.toDisabledDays = startDate ? [[moment().subtract(99, 'year'), startDate.clone()]] : [];
  }

  toDisabledTimesUpdate(startDate, endDate) {
    this.toDisabledTimes = [];

    if (startDate && endDate && startDate.isSame(endDate, 'day')) {

      const from = this.fsUtil.int(startDate.format('m')) + (this.fsUtil.int(startDate.format('H')) * 60);
      const to = this.fsUtil.int(endDate.format('m')) + (this.fsUtil.int(endDate.format('H')) * 60);

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
}

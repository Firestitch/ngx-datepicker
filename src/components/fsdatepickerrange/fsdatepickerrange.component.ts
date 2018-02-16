import { Component, Input, HostListener, ElementRef, ViewEncapsulation, OnInit } from '@angular/core';
import { FsDatePickerModel } from './../../services/fsdatepickermodel.service';

@Component({
    selector: 'fsDatePickerRange',
    templateUrl: './fsdatepickerrange.component.html',
    styleUrls: ['./../../styles.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [FsDatePickerModel]
})
export class FsDatepickerRangeComponent implements OnInit {

  parentInstance: any = null;
  model = null;

  constructor(public fsDatePickerModel: FsDatePickerModel, public element: ElementRef) { }

  ngOnInit() {
    this.model = this.parentInstance.getValue();
  }

  setStartDate(date) {
    this.model.start_date = date;
    this.parentInstance.writeValue(this.model);
  }

  setEndDate(date) {
    this.model.end_date = date;
    this.parentInstance.writeValue(this.model);
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

import { Component, Input, HostListener, ElementRef, ViewEncapsulation, OnInit } from '@angular/core';
import { FsDatePickerModel } from './../../services/fsdatepickermodel.service';

@Component({
    selector: 'fsDatePicker',
    templateUrl: './fsdatepicker.component.html',
    styleUrls: ['./../../styles.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [FsDatePickerModel]
})
export class FsDatepickerComponent implements OnInit {

  parentInstance: any = null;
  model = null;

  constructor(public fsDatePickerModel: FsDatePickerModel, public element: ElementRef) { }

  ngOnInit() {
    this.model = this.parentInstance.getValue();
  }

  setDate(date) {
    this.model = date;
    this.parentInstance.writeValue(date);
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

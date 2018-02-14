import { Component, Input, HostListener, ElementRef, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
    selector: 'fs-datepicker-dialog',
    templateUrl: './fsdatepickerdialog.component.html',
    styleUrls: ['./fsdatepickerdialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FsDatepickerDialogComponent implements OnInit {

  // tab = 'date';
  parentInstance: any = null;
  model = null;

  constructor(public element: ElementRef) { }

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

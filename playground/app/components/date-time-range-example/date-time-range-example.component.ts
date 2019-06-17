import { Component } from '@angular/core';


@Component({
  selector: 'date-time-range-example',
  templateUrl: 'date-time-range-example.component.html',
  styleUrls: [ 'date-time-range-example.component.css' ]
})
export class DateTimeRangeExampleComponent {

  startDate;
  endDate;
  range = null;

  constructor() {
    this.startDate = new Date('2019-10-10');

    this.endDate = new Date('2019-10-10');
    this.endDate.setHours(this.startDate.getHours() + 1);
  }
}

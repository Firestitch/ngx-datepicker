import { Component } from '@angular/core';


@Component({
  selector: 'date-time-range-example',
  templateUrl: 'date-time-range-example.component.html',
  styleUrls: [ 'date-time-range-example.component.css' ]
})
export class DateTimeRangeExampleComponent {

  startDate = new Date('2019-10-10');
  endDate = new Date('2019-10-12');
  range = null;

  constructor() {
  }
}

import { Component } from '@angular/core';


@Component({
  selector: 'date-range-example',
  templateUrl: 'date-range-example.component.html',
  styleUrls: [ 'date-range-example.component.css' ]
})
export class NewDateRangeExampleComponent {

  startDate = new Date('2019-10-10');
  endDate = new Date('2019-10-12');
  range = null;

  constructor() {
  }
}

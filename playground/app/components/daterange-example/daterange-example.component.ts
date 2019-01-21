import { Component } from '@angular/core';


@Component({
  selector: 'daterange-example',
  templateUrl: 'daterange-example.component.html',
  styleUrls: [ 'daterange-example.component.css' ]
})
export class DateRangeExampleComponent {

  startDate = null;
  endDate = null;
  range = null;

  constructor() {
  }
}

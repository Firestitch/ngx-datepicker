import { Component } from '@angular/core';
import * as moment from 'moment-timezone';

@Component({
  selector: 'daterange-example',
  templateUrl: 'daterange-example.component.html',
  styleUrls: [ 'daterange-example.component.css' ]
})
export class DateRangeExampleComponent {

  start_date = null;
  end_date = null;

  constructor() {
  }
}

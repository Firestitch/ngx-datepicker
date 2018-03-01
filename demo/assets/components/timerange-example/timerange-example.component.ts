import { Component } from '@angular/core';
import * as moment from 'moment-timezone';

@Component({
  selector: 'timerange-example',
  templateUrl: 'timerange-example.component.html',
  styleUrls: [ 'timerange-example.component.css' ]
})
export class TimeRangeExampleComponent {

  start_date = null;
  end_date = null;

  constructor() {
  }
}

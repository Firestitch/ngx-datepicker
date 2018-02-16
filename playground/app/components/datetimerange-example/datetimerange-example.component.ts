import { Component } from '@angular/core';
import * as moment from 'moment-timezone';

@Component({
  selector: 'datetimerange-example',
  templateUrl: 'datetimerange-example.component.html',
  styleUrls: [ 'datetimerange-example.component.css' ]
})
export class DateTimeRangeExampleComponent {

  event = {
    id: 999,
    start_date: moment().format(),
    end_date: moment()
  };

  constructor() {
  }
}

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
    start_date: moment(),
    end_date: moment()
  };

  model;

  constructor() {
    this.model = { start_date: this.event.start_date, end_date: this.event.end_date };
  }
}

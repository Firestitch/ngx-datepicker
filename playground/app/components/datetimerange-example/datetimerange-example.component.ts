import { Component } from '@angular/core';


@Component({
  selector: 'datetimerange-example',
  templateUrl: 'datetimerange-example.component.html',
  styleUrls: [ 'datetimerange-example.component.css' ]
})
export class DateTimeRangeExampleComponent {

  // public presets = [];

  public startDate = null;
  public endDate = null;
  public range = null;

  public event = {
    start_date: null,
    end_date: null
  };

  constructor() {
    // this.presets = [
    //   { name: 'Today', value: { start: moment().startOf('days'), end: moment().startOf('days') } },
    //   { name: 'Yesterday', value: { start: moment().subtract(1, 'day').startOf('day'), end: moment().subtract(1, 'day').endOf('day') } },
    //   { name: 'Last 7 Days', value: { start: moment().subtract(7, 'days'), end: moment() } },
    //   { name: 'Last 30 Days', value: { start: moment().subtract(30, 'days'), end: moment() } },
    //   { name: 'Current Month', value: { start: moment().startOf('month'), end: moment().endOf('month') } },
    //   { name: 'Last Month', value: { start: moment().subtract(1, 'month').startOf('month'), end: moment().subtract(1, 'month').endOf('month') } }
    // ];
  }
}

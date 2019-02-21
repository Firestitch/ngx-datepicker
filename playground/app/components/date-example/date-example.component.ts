import { Component } from '@angular/core';
// import * as moment from 'moment';

@Component({
  selector: 'date-example',
  templateUrl: 'date-example.component.html',
  styleUrls: [ 'date-example.component.css' ]
})
export class DateExampleComponent {

  public model = null;
  public presets = [];

  constructor() {
    // this.presets = [
    //   { name: 'Today', value: moment() },
    //   { name: 'Yesterday', value: moment().subtract(1, 'days') },
    //   { name: 'Start of Week', value: moment().startOf('week') },
    //   { name: 'Last Week', value: moment().subtract(1, 'week').startOf('week') },
    //   { name: 'Start of Month', value: moment().startOf('month') }
    // ];
  }
}

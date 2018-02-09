import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'date-example',
  templateUrl: 'date-example.component.html'
})
export class DateExampleComponent {

  disabledDays = [];
  model;

  disableCurrentDay() {
    this.disabledDays.push(moment(this.model));
  }

  addDay() {
    this.model = moment(this.model).add(1, 'days');
  }

}

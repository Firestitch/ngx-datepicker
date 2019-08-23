import { Component } from '@angular/core';
// import * as moment from 'moment';

@Component({
  selector: 'date-example',
  templateUrl: 'date-example.component.html',
  styleUrls: [ 'date-example.component.css' ]
})
export class DateExampleComponent {

  public model = '2015-01-05T10:11:22+00:00';

  constructor() {}

  change(e) {
    console.log(e);
  }
}

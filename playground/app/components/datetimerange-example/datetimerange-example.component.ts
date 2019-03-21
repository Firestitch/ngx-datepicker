import { Component } from '@angular/core';


@Component({
  selector: 'datetimerange-example',
  templateUrl: 'datetimerange-example.component.html',
  styleUrls: [ 'datetimerange-example.component.css' ]
})
export class DateTimeRangeExampleComponent {

  public startDate = new Date();
  public endDate = new Date();
  public range = null;

  constructor() {}
}

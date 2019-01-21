import { Component } from '@angular/core';


@Component({
  selector: 'timerange-example',
  templateUrl: 'timerange-example.component.html',
  styleUrls: [ 'timerange-example.component.css' ]
})
export class TimeRangeExampleComponent {

  public startDate =null;
  public endDate = null;
  public model = null;

  constructor() {
  }
}

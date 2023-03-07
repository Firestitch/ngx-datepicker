import { Component } from '@angular/core';


@Component({
  selector: 'timerange-example',
  templateUrl: './timerange-example.component.html',
  styleUrls: [ './timerange-example.component.css' ]
})
export class TimeRangeExampleComponent {

  public startDate = new Date('2015-10-10 15:45');
  public endDate = new Date('2015-10-10 18:45');

  public pickerClosed(): void {
    console.log('picker closed');
  }
}

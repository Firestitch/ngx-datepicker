import { Component } from '@angular/core';


@Component({
  selector: 'date-range-example',
  templateUrl: 'date-range-example.component.html',
})
export class DateRangeExampleComponent {

  public startDate = new Date('2019-10-10');
  public endDate = new Date('2019-10-12');
  public range = null;

  public pickerClosed(): void {
    console.log('picker closed');
  }
}

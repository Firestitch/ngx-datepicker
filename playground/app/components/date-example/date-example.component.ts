import { Component } from '@angular/core';

import { addDays, setDate } from 'date-fns';

@Component({
  selector: 'date-example',
  templateUrl: './date-example.component.html',
  styleUrls: ['./date-example.component.css'],
})
export class DateExampleComponent {

  public enabledDates: [Date, Date][] = [
    [setDate(new Date(), 10), setDate(new Date(), 27)],
  ];

  public model = addDays(new Date(),2);

  public selected(e) {
    console.log('selected', e);
  }

  public blured(e) {
    console.log('blured', e);
  }

  public ngModelChange(e) {
    console.log('ngModelChange', e);
  }

  public pickerClosed(): void {
    console.log('picker closed');
  }
}

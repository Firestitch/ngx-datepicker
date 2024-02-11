import { Component } from '@angular/core';

import { addDays } from 'date-fns';

@Component({
  selector: 'date-example',
  templateUrl: './date-example.component.html',
  styleUrls: ['./date-example.component.css'],
})
export class DateExampleComponent {

  // public model = new Date('2015-10-10 15:45');
  public enabledDates = [new Date('2024-02-07'), new Date('2024-02-08'), new Date('2024-02-09'), new Date('2024-02-10')];

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

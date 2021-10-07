import { Component } from '@angular/core';


@Component({
  selector: 'month-example',
  templateUrl: 'month-example.component.html',
})
export class MonthExampleComponent {

  startDate = new Date('2019-10-10');
  endDate = new Date('2019-10-12');
  range = null;

  constructor() {
  }


  public cha(): void {
    console.log('start');
  }

  public ng(): void {
    console.log('end');
  }
}

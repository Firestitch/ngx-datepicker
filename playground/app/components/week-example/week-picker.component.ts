import { Component } from '@angular/core';

@Component({
  selector: 'week-picker-example',
  templateUrl: 'week-picker.component.html'
})
export class WeekPickerComponent {

  /*public model = {
    period: 38,
    from: new Date(2021, 8, 17),
    to: new Date(2021, 8, 24)
  };*/

  public model = null;

  public seedDate = new Date(2019, 0, 1);
  public periodWeeks = 1;

  constructor() {}

  change(e) {
    this.model = null;
  }
}

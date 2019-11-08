import { Component } from '@angular/core';

@Component({
  selector: 'week-picker-example',
  templateUrl: 'week-picker.component.html'
})
export class WeekPickerComponent {
  public model = null;

  public seedDate = new Date(2019, 0, 1);
  public periodWeeks = 1;

  constructor() {}

  change(e) {
    this.model = null;
  }
}

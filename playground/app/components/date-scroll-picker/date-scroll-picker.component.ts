import { Component } from '@angular/core';

@Component({
  selector: 'date-scroll-picker',
  templateUrl: 'date-scroll-picker.component.html'
})
export class DateScrollPickerComponent {
  public model = new Date('2015-10-10 15:45');
}

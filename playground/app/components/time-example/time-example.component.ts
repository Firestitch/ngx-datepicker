import { Component } from '@angular/core';

@Component({
  selector: 'time-example',
  templateUrl: './time-example.component.html',
  styleUrls: [ './time-example.component.css' ]
})
export class TimeExampleComponent {
  public model = new Date('2015-10-10 15:45');

  public selected(date) {
    console.log(date);
  }

  public pickerClosed(): void {
    console.log('picker closed');
  }
}

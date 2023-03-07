import { Component } from '@angular/core';

@Component({
  selector: 'datetime-example',
  templateUrl: './datetime-example.component.html',
  styleUrls: [ './datetime-example.component.css' ]
})
export class DateTimeExampleComponent {
  public model = new Date('2015-10-10 15:45');

  public pickerClosed(): void {
    console.log('picker closed');
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'date-example',
  templateUrl: 'date-example.component.html',
  styleUrls: [ 'date-example.component.css' ]
})
export class DateExampleComponent {

  // public model = new Date('2015-10-10 15:45');

  public model = new Date();

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

import { Component } from '@angular/core';

@Component({
  selector: 'only-hours-example',
  templateUrl: 'only-hours-example.component.html',
  styleUrls: [ 'only-hours-example.component.css' ]
})
export class OnlyHoursExampleComponent {
  public model = new Date('2015-10-10 15:45');
}

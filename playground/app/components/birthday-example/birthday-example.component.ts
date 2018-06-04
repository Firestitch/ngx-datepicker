import { Component } from '@angular/core';
import * as moment from 'moment-timezone';

@Component({
  selector: 'birthday-example',
  templateUrl: 'birthday-example.component.html',
  styleUrls: [ 'birthday-example.component.css' ]
})
export class BirthdayExampleComponent {

  public model = null;

  constructor() { }
}

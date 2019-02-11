import { Component } from '@angular/core';

@Component({
  selector: 'birthday-example',
  templateUrl: 'birthday-example.component.html',
  styleUrls: [ 'birthday-example.component.css' ]
})
export class BirthdayExampleComponent {

  public model = null;
  public minYear = 1900;

  constructor() { }
}

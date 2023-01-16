import { Component } from '@angular/core';


@Component({
  selector: 'birthday-example',
  templateUrl: 'birthday-example.component.html',
  styleUrls: [ 'birthday-example.component.css' ]
})
export class BirthdayExampleComponent {

  public model = '2018-05-05';
  public minYear = 1900;
  public curentDay = new Date();

  constructor() { }

  public pickerClosed(): void {
    console.log('picker closed');
  }
}

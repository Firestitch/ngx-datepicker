import { ChangeDetectionStrategy } from '@angular/core';

import { Component } from '@angular/core';


@Component({
  selector: 'date-scroll-picker',
  templateUrl: './date-scroll-picker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateScrollPickerComponent {

  public standard = new Date('2015-10-10 15:45');
  public monthYear;
  public monthDay;
  public year;
  public month;

  public pickerClosed(): void {
    console.log('picker closed');
  }

}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FsDatePickerComponent } from '../../../../src/app/components/date-picker/date-picker.component';
import { FsDateWeekPickerComponent } from '../../../../src/app/components/date-week-picker/date-week-picker.component';

@Component({
    selector: 'week-picker-example',
    templateUrl: './week-picker.component.html',
    standalone: true,
    imports: [FormsModule, FsFormModule, MatFormField, MatLabel, MatInput, FsDatePickerComponent, FsDateWeekPickerComponent]
})
export class WeekPickerComponent {

  /*public model = {
    period: 38,
    from: new Date(2021, 8, 17),
    to: new Date(2021, 8, 24)
  };*/

  public model = null;
  public seedDate = null;
  public periodWeeks = 1;

  constructor() {}

  public change(e) {
    this.model = null;
  }

  public pickerClosed(): void {
    console.log('picker closed');
  }
}

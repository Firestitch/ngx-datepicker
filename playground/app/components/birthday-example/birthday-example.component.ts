import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FsDatePickerBirthdayComponent } from '../../../../src/app/components/date-picker-birthday/date-picker-birthday.component';


@Component({
    selector: 'birthday-example',
    templateUrl: './birthday-example.component.html',
    styleUrls: ['./birthday-example.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        FsFormModule,
        MatFormField,
        MatLabel,
        MatInput,
        FsDatePickerBirthdayComponent,
    ],
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

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FsDateTimePickerComponent } from '../../../../src/app/components/date-time-picker/date-time-picker.component';

@Component({
    selector: 'datetime-example',
    templateUrl: './datetime-example.component.html',
    styleUrls: ['./datetime-example.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        FsFormModule,
        MatFormField,
        MatLabel,
        MatInput,
        FsDateTimePickerComponent,
    ],
})
export class DateTimeExampleComponent {
  public model = new Date('2015-10-10 15:45');

  public pickerClosed(): void {
    console.log('picker closed');
  }
}

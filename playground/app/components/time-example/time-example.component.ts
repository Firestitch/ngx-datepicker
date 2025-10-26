import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FsTimePickerComponent } from '../../../../src/app/components/time-picker/time-picker.component';

@Component({
    selector: 'time-example',
    templateUrl: './time-example.component.html',
    styleUrls: ['./time-example.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        FsFormModule,
        MatFormField,
        MatLabel,
        MatInput,
        FsTimePickerComponent,
    ],
})
export class TimeExampleComponent {
  public model = new Date('2015-10-10 15:45');

  public selected(date) {
    console.log(date);
  }

  public pickerClosed(): void {
    console.log('picker closed');
  }
}

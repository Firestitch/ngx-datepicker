import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FsDatePickerComponent } from '../../../../src/app/components/date-picker/date-picker.component';


@Component({
    selector: 'date-example',
    templateUrl: './date-example.component.html',
    styleUrls: ['./date-example.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        FsFormModule,
        MatFormField,
        MatLabel,
        MatInput,
        FsDatePickerComponent,
    ],
})
export class DateExampleComponent {

  public model;

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

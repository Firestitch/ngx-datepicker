import { ChangeDetectionStrategy } from '@angular/core';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FsDateScrollPickerComponent } from '../../../../src/app/components/date-scroll-picker/date-scroll-picker.component';
import { FsFormModule } from '@firestitch/form';


@Component({
    selector: 'date-scroll-picker',
    templateUrl: './date-scroll-picker.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        FsDateScrollPickerComponent,
        FsFormModule,
    ],
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

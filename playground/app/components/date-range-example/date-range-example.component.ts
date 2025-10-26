import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { DateRangePickerFromComponent } from '../../../../src/app/components/range-picker/from/date-range-picker-from.component';
import { DateRangeSeparatorComponent } from '../../../../src/app/components/date-range-separator/date-range-separator.component';
import { DateRangePickerToComponent } from '../../../../src/app/components/range-picker/to/date-range-picker-to.component';


@Component({
    selector: 'date-range-example',
    templateUrl: './date-range-example.component.html',
    standalone: true,
    imports: [
        FormsModule,
        FsFormModule,
        MatFormField,
        MatLabel,
        MatInput,
        DateRangePickerFromComponent,
        DateRangeSeparatorComponent,
        DateRangePickerToComponent,
    ],
})
export class DateRangeExampleComponent {

  public startDate = new Date('2019-10-10');
  public endDate = new Date('2019-10-12');
  public range = null;

  public pickerClosed(): void {
    console.log('picker closed');
  }
}

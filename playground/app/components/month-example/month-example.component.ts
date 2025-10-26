import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MonthRangePickerFromComponent } from '../../../../src/app/components/range-picker/from/month-range-picker-from.component';
import { DateRangeSeparatorComponent } from '../../../../src/app/components/date-range-separator/date-range-separator.component';
import { MonthRangePickerToComponent } from '../../../../src/app/components/range-picker/to/month-range-picker-to.component';


@Component({
    selector: 'month-example',
    templateUrl: './month-example.component.html',
    standalone: true,
    imports: [
        FormsModule,
        FsFormModule,
        MatFormField,
        MatLabel,
        MatInput,
        MonthRangePickerFromComponent,
        DateRangeSeparatorComponent,
        MonthRangePickerToComponent,
    ],
})
export class MonthExampleComponent {

  startDate = new Date('2019-10-10');
  endDate = new Date('2019-10-12');
  range = null;

  constructor() {
  }
}

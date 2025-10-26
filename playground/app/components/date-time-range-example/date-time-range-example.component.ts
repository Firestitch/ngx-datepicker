import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { DateTimeRangePickerFromComponent } from '../../../../src/app/components/range-picker/from/date-time-range-picker-from.component';
import { DateRangeSeparatorComponent } from '../../../../src/app/components/date-range-separator/date-range-separator.component';
import { DateTimeRangePickerToComponent } from '../../../../src/app/components/range-picker/to/date-time-range-picker-to.component';


@Component({
    selector: 'date-time-range-example',
    templateUrl: './date-time-range-example.component.html',
    styleUrls: ['./date-time-range-example.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        FsFormModule,
        MatFormField,
        MatLabel,
        MatInput,
        DateTimeRangePickerFromComponent,
        DateRangeSeparatorComponent,
        DateTimeRangePickerToComponent,
    ],
})
export class DateTimeRangeExampleComponent {

  startDate;
  endDate;
  range = null;

  constructor() {
    this.startDate = new Date('2019-10-10');

    this.endDate = new Date('2019-10-10');
    this.endDate.setHours(this.startDate.getHours() + 1);
  }

  public pickerClosed(): void {
    console.log('picker closed');
  }
}

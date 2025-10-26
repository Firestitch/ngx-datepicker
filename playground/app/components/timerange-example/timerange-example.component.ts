import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { TimeRangePickerFromComponent } from '../../../../src/app/components/range-picker/from/time-range-picker-from.component';
import { DateRangeSeparatorComponent } from '../../../../src/app/components/date-range-separator/date-range-separator.component';
import { TimeRangePickerToComponent } from '../../../../src/app/components/range-picker/to/time-range-picker-to.component';


@Component({
    selector: 'timerange-example',
    templateUrl: './timerange-example.component.html',
    styleUrls: ['./timerange-example.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        FsFormModule,
        MatFormField,
        MatLabel,
        MatInput,
        TimeRangePickerFromComponent,
        DateRangeSeparatorComponent,
        TimeRangePickerToComponent,
    ],
})
export class TimeRangeExampleComponent {

  public startDate = new Date('2015-10-10 15:45');
  public endDate = new Date('2015-10-10 18:45');

  public pickerClosed(): void {
    console.log('picker closed');
  }
}

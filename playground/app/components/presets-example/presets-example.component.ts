import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

import { FsFormModule } from '@firestitch/form';

import { endOfDay, startOfDay, subDays } from 'date-fns';

import { WeekDay } from '../../../../src/libs/common/enums/week-day.enum';
import { FS_DATEPICKER_CONFIG } from '../../../../src/app/providers/datepicker-config.provider';
import { DateRangeSeparatorComponent } from '../../../../src/app/components/date-range-separator/date-range-separator.component';
import { FsDatePickerPresetChipComponent } from '../../../../src/app/components/preset-chip/preset-chip.component';
import { DateRangePickerFromComponent } from '../../../../src/app/components/range-picker/from/date-range-picker-from.component';
import { MonthRangePickerFromComponent } from '../../../../src/app/components/range-picker/from/month-range-picker-from.component';
import { DateRangePickerToComponent } from '../../../../src/app/components/range-picker/to/date-range-picker-to.component';
import { MonthRangePickerToComponent } from '../../../../src/app/components/range-picker/to/month-range-picker-to.component';


@Component({
  selector: 'presets-example',
  templateUrl: './presets-example.component.html',
  styleUrls: ['./presets-example.component.scss'],
  standalone: true,
  // Presets are off by default. Provided here rather than in main.ts so only
  // this example turns them on. Two presets of its own are merged into the
  // built-in list: 'Last 14 days' sorts in by its span, and 'thisYear' takes
  // the built-in 'This year' slot's key, so it replaces that one.
  providers: [
    {
      provide: FS_DATEPICKER_CONFIG,
      useValue: {
        weekStartsOn: WeekDay.Sunday,
        preset: true,
        presets: [
          {
            key: 'last14Days',
            name: 'Last 14 days',
            from: () => startOfDay(subDays(new Date(), 14)),
            to: () => endOfDay(subDays(new Date(), 1)),
          },
          {
            key: 'thisYear',
            name: 'Year to date',
            from: () => new Date(new Date().getFullYear(), 0, 1),
            to: () => endOfDay(new Date()),
          },
        ],
      },
    },
  ],
  imports: [
    FormsModule,
    FsFormModule,
    MatFormField,
    MatLabel,
    MatInput,
    DateRangeSeparatorComponent,
    FsDatePickerPresetChipComponent,
    DateRangePickerFromComponent,
    DateRangePickerToComponent,
    MonthRangePickerFromComponent,
    MonthRangePickerToComponent,
  ],
})
export class PresetsExampleComponent {

  public startDate = new Date('2019-10-10');
  public endDate = new Date('2019-10-12');

  public monthStartDate = new Date('2019-10-01');
  public monthEndDate = new Date('2019-12-31');

}

import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButton } from '@angular/material/button';

import { FsFormModule } from '@firestitch/form';

import { of } from 'rxjs';


import { FsDateRangeComponent } from '../../../../src/app/components/date-range/date-range.component';
import {
  FS_DATEPICKER_CONFIG,
  FS_DATEPICKER_CONFIG_DEFAULT,
} from '../../../../src/app/providers/datepicker-config.provider';
import { PickerViewType } from '../../../../src/libs/common/enums/picker-view-type.enum';
import { WeekDay } from '../../../../src/libs/common/enums/week-day.enum';


@Component({
  selector: 'date-range-field-example',
  templateUrl: './date-range-field-example.component.html',
  styleUrl: './date-range-field-example.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  // Presets on, so the chip under the field names ranges such as "This week".
  providers: [
    {
      provide: FS_DATEPICKER_CONFIG,
      useValue: { ...FS_DATEPICKER_CONFIG_DEFAULT, weekStartsOn: WeekDay.Monday, preset: true },
    },
  ],
  imports: [
    DatePipe,
    FormsModule,
    MatButton,
    FsFormModule,
    FsDateRangeComponent,
  ],
})
export class DateRangeFieldExampleComponent {

  public readonly PickerViewType = PickerViewType;

  public from = signal<Date | null>(null);
  public to = signal<Date | null>(null);
  public dateTimeFrom = signal<Date | null>(null);
  public dateTimeTo = signal<Date | null>(null);

  public save = () => {
    return of(true);
  };

}

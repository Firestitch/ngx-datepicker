import { ChangeDetectionStrategy, Component } from '@angular/core';
import { getTimeZones } from '@vvo/tzdb';
import { tzList } from './tz-list';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatHint } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { FsFormModule } from '@firestitch/form';
import { MatOption } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { FsDateTimePickerComponent } from '../../../../src/app/components/date-time-picker/date-time-picker.component';
import { DateTimeRangePickerFromComponent } from '../../../../src/app/components/range-picker/from/date-time-range-picker-from.component';
import { DateRangeSeparatorComponent } from '../../../../src/app/components/date-range-separator/date-range-separator.component';
import { DateTimeRangePickerToComponent } from '../../../../src/app/components/range-picker/to/date-time-range-picker-to.component';

@Component({
    selector: 'datetime-tz-example',
    templateUrl: './datetime-tz-example.component.html',
    styleUrls: ['./datetime-tz-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        MatFormField,
        MatLabel,
        MatSelect,
        FsFormModule,
        MatOption,
        MatInput,
        FsDateTimePickerComponent,
        MatHint,
        DateTimeRangePickerFromComponent,
        DateRangeSeparatorComponent,
        DateTimeRangePickerToComponent,
    ],
})
export class DatetimeTzExampleComponent {
  
  public selectedTimeZone: string;
  public timezones;
  public today = new Date();
  public todayYear = this.today.getFullYear();
  public todayMonth = this.today.getMonth();
  public todayDay = this.today.getDate();
  public format = 'MMM d, yyyy h:mm aa OOOO';

  public model = new Date(
    Date.UTC(
      this.todayYear,
      this.todayMonth,
      this.todayDay,
      0,
      0,
      0,
      0,
    )
  );

  public startDate = new Date(
    Date.UTC(
      this.todayYear,
      this.todayMonth,
      this.todayDay,
      0,
      0,
      0,
      0,
    )
  );

  public endDate = new Date(
    Date.UTC(
      this.todayYear,
      this.todayMonth,
      this.todayDay,
      3,
      0,
      0,
      0,
    )
  );

  public startDateTimeDate = new Date(
    Date.UTC(
      this.todayYear,
      this.todayMonth,
      this.todayDay,
      0,
      0,
      0,
      0,
    )
  );

  public endDateTimeDate = new Date(
    Date.UTC(
      this.todayYear,
      this.todayMonth,
      this.todayDay,
      3,
      0,
      0,
      0,
    )
  );

  public startMonthDate = new Date(
    Date.UTC(
      this.todayYear,
      this.todayMonth,
      this.todayDay,
      0,
      0,
      0,
      0,
    )
  );

  public endMonthDate = new Date(
    Date.UTC(
      this.todayYear,
      this.todayMonth,
      this.todayDay,
      3,
      0,
      0,
      0,
    )
  );

  constructor() {
    this.initTz();
  }

  public initTz(): void {
    this.timezones = getTimeZones();

    const userTZName = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const userTZ = this.timezones
      .find((tz) => tz.name === userTZName);

    if (userTZ) {
      this.selectedTimeZone = userTZ.name;
    } else {
      this.selectedTimeZone = tzList[0].name;
    }
  }

  public pickerClosed(): void {
    console.log('picker closed');
  }
}

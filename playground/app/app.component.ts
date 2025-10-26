import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { FsExampleModule } from '@firestitch/example';
import { DateExampleComponent } from './components/date-example/date-example.component';
import { CalendarExampleComponent } from './components/calendar-example/calendar-example.component';
import { TimeExampleComponent } from './components/time-example/time-example.component';
import { OnlyHoursExampleComponent } from './components/only-hours-example/only-hours-example.component';
import { DateTimeExampleComponent } from './components/datetime-example/datetime-example.component';
import { DatetimeTzExampleComponent } from './components/datetime-tz-example/datetime-tz-example.component';
import { DateRangeExampleComponent } from './components/date-range-example/date-range-example.component';
import { DateTimeRangeExampleComponent } from './components/date-time-range-example/date-time-range-example.component';
import { TimeRangeExampleComponent } from './components/timerange-example/timerange-example.component';
import { MonthExampleComponent } from './components/month-example/month-example.component';
import { WeekPickerComponent } from './components/week-example/week-picker.component';
import { DateScrollPickerComponent } from './components/date-scroll-picker/date-scroll-picker.component';
import { BirthdayExampleComponent } from './components/birthday-example/birthday-example.component';
import { MinMaxComponent } from './components/min-max/min-max.component';
import { SelectExampleComponent } from './components/select-example/select-example.component';


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    standalone: true,
    imports: [FsExampleModule, DateExampleComponent, CalendarExampleComponent, TimeExampleComponent, OnlyHoursExampleComponent, DateTimeExampleComponent, DatetimeTzExampleComponent, DateRangeExampleComponent, DateTimeRangeExampleComponent, TimeRangeExampleComponent, MonthExampleComponent, WeekPickerComponent, DateScrollPickerComponent, BirthdayExampleComponent, MinMaxComponent, SelectExampleComponent]
})
export class AppComponent {
  public config = environment;

  public theme = `@import '~@angular/material/theming';
  @import '~@firestitch/datepicker/styles.scss';

  $theme = /* Your app theme definition */

  @include fs-date-picker($theme);`;
}
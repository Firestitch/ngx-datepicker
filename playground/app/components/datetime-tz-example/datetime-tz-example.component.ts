import { Component } from '@angular/core';
import { tzList } from './tz-list';
import { getTimeZones } from '@vvo/tzdb';

@Component({
  selector: 'datetime-tz-example',
  templateUrl: './datetime-tz-example.component.html',
  styleUrls: ['./datetime-tz-example.component.scss' ]
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

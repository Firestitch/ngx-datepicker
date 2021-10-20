import { Component } from '@angular/core';
import { tzList } from './tz-list';

@Component({
  selector: 'datetime-tz-example',
  templateUrl: 'datetime-tz-example.component.html',
  styleUrls: ['datetime-tz-example.component.css' ]
})
export class DatetimeTzExampleComponent {
  public today = new Date();
  public todayYear = this.today.getFullYear();
  public todayMonth = this.today.getMonth();
  public todayDay = this.today.getDate();
  public format = 'MMM d, yyyy h:mm aa xxx';

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

  public selectedTimeZone: string;

  public tzList = tzList;

  constructor() {
    this.initTz();
  }

  public initTz(): void {
    const userTZName = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const userTZ = this.tzList
      .find((tz) => tz.name === userTZName);

    if (userTZ) {
      this.selectedTimeZone = userTZ.name;
    } else {
      this.selectedTimeZone = tzList[0].name;
    }
  }
}

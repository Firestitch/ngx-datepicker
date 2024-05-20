import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { addDays, endOfMonth, setDate, startOfMonth } from 'date-fns';

@Component({
  selector: 'app-calendar-example',
  templateUrl: './calendar-example.component.html',
  styleUrls: ['./calendar-example.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarExampleComponent implements OnInit {

  public monthDate;
  public minDate = startOfMonth(new Date());
  public maxDate = endOfMonth(new Date());

  public enabledDates: [Date, Date][];

  public model = addDays(new Date(),2);

  public ngOnInit(): void {
    this.updateEnabledDates();
  }

  public ngModelChange(e) {
    console.log('ngModelChange', e);
  }

  public pickerClosed(): void {
    console.log('picker closed');
  }

  public monthChange(date): void {
    this.monthDate = date;
  }

  public updateEnabledDates() {
    this.enabledDates = [
      [setDate(this.monthDate || new Date(), 10), setDate(this.monthDate || new Date(), 18)],
    ];
  }
}

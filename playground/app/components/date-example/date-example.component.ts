import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { addDays, setDate } from 'date-fns';

@Component({
  selector: 'date-example',
  templateUrl: './date-example.component.html',
  styleUrls: ['./date-example.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateExampleComponent implements OnInit {

  public monthDate;

  public enabledDates: [Date, Date][];

  public model = addDays(new Date(),2);

  public ngOnInit(): void {
    this.updateEnabledDates();
  }

  public selected(e) {
    console.log('selected', e);
  }

  public blured(e) {
    console.log('blured', e);
  }

  public ngModelChange(e) {
    console.log('ngModelChange', e);
  }

  public pickerClosed(): void {
    console.log('picker closed');
  }

  public monthChange(date): void {
    this.monthDate = date;
    this.updateEnabledDates();
  }

  public updateEnabledDates() {
    this.enabledDates = [
      [setDate(this.monthDate || new Date(), 10), setDate(this.monthDate || new Date(), 18)],
    ];
  }
}

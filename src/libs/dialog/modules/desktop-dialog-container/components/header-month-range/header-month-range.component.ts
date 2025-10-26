import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatIconAnchor } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FsDateModule } from '@firestitch/date';


@Component({
    selector: 'fs-date-picker-header-month-range',
    templateUrl: './header-month-range.component.html',
    styleUrls: [
        './header-month-range.component.scss',
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatIconAnchor,
        MatIcon,
        FsDateModule,
    ],
})
export class FsDatePickerHeaderMonthRangeComponent {

  @Input()
  public calendarDate: Date;

  @Input()
  public nextCalendarDate: Date;

  @Output()
  public goNextMonth = new EventEmitter<void>();

  @Output()
  public goPrevMonth = new EventEmitter<void>();

  public get calendarMonth(): number {
    return this.calendarDate?.getMonth();
  }

  public get calendarYear(): number {
    return this.calendarDate?.getFullYear();
  }

  public get calendarDay(): number {
    return this.calendarDate?.getDate();
  }

  public nextMonth(): void {
    this.goNextMonth.emit();
  }

  public prevMonth(): void {
    this.goPrevMonth.emit();
  }
}

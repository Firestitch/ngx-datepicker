import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';

import {
  eachDayOfInterval,
  format,
  isAfter,
  lightFormat,
  startOfDay,
} from 'date-fns';

import { getStartDayDate } from '../../../common/helpers/get-start-day-date';
import { splitDateByComponents } from '../../../common/helpers/split-date-by-components';
import { IDatePickerPeriod } from '../../../common/interfaces/period.interface';
import { WeekDays } from '../../../common/types/week-days.type';
import { WEEKDAYS } from '../../consts/week-days';
import { DayItem } from '../../interfaces/day-item.interface';
import { Month } from '../../models/month';
import { Period } from '../../models/period';
import { Week } from '../../models/week';


@Component({
  selector: 'fs-date-picker-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fs-date-picker-calendar',
  },
})
export class FsDatePickerCalendarComponent implements OnInit, OnChanges {

  @Input()
  public date: Date = null;

  @Input()
  public period: IDatePickerPeriod = null;

  @Input()
  public rangeFrom: Date = null;

  @Input()
  public rangeTo: Date = null;

  @Input()
  public highlightStartDate: Date = null;

  @Input()
  public highlightEndDate: Date = null;

  @Input()
  public dateMode: string = null;

  @Input()
  public enabledDates: [Date, Date][] = null;

  @Input()
  public disabledDates: [Date, Date][] = null;

  @Input()
  public calendarDate: Date = null;

  @Input()
  public seedDate;

  @Input()
  public weekStartsOn: WeekDays;

  @Input()
  public periodWeeks;

  @Input()
  public showSurroundingDays = false;

  @Input()
  public hideExtraDays = false;

  @Input()
  public showToday = true;

  @Input()
  public daySize;

  @Input()
  public maxDate;

  @Input()
  public minDate;

  @Output()
  public change = new EventEmitter<Date>();

  @Output()
  public rangeChange = new EventEmitter<Date>();

  @Output()
  public periodChange = new EventEmitter<IDatePickerPeriod>();

  @Output()
  public hoverDay = new EventEmitter<any>();

  public selected: any = {};
  public selectedPeriod: Period;
  public selectedRange: { from?: string; to?: string } = {};
  public month: Month = null;

  public weekDaysList = [];

  public currentDate = new Date();
  public today: any = {
    date: format(this.currentDate, 'yyyy-MM-dd'),
    month: this.currentDate.getMonth(),
    year: this.currentDate.getFullYear(),
  };

  public highlightedRangeDays = null;

  constructor(
    public element: ElementRef,
  ) {}

  public ngOnInit() {
    this.daySize = this.daySize ?? 43;

    if (this.dateMode === 'week') {
      if (this.period && this.seedDate) {
        this.selectedPeriod = new Period(this.period.period, this.period.from, this.periodWeeks, true);
        this.selectedPeriod.year = this.period.from.getFullYear();

        const selectedPeriod = this.month.updateSelectionForPeriod(this.selectedPeriod);

        if (selectedPeriod) {
          this.selectedPeriod = selectedPeriod;
        }
      }
    } else if (this.date) {
      this.selected = splitDateByComponents(this.date);
    }
  }

  public ngOnChanges(changes) {
    if (changes) {
      if (changes.date) {
        this.selected = splitDateByComponents(this.date);
        this.updateDaysHighlighted();
      } else if (changes.highlightStartDate || changes.highlightEndDate) {
        this.updateDaysHighlighted();
      }

      if (changes.calendarDate || changes.enabledDates) {
        this.drawMonths();
      }

      if (changes.rangeFrom || changes.rangeTo) {
        this.selectedRange = {
          from: this.rangeFrom && lightFormat(this.rangeFrom, 'yyyy-MM-dd') || null,
          to: this.rangeTo && lightFormat(this.rangeTo, 'yyyy-MM-dd') || null,
        };
      }
    }
  }

  public onMouseEnterDay(day) {
    this.hoverDay.emit(day);
  }

  public mouseEnterWeek(week: Week) {
    if (this.dateMode === 'week') {
      week.period.mouseOver = true;
    }
  }

  public mouseLeaveWeek(week: Week) {
    if (this.dateMode === 'week') {
      week.period.mouseOver = false;
    }
  }

  public updateDaysHighlighted() {
    this.highlightedRangeDays = {
      data: {},
      min: null,
      max: null,
    };

    let start = null;
    let end = null;

    if (this.highlightStartDate && this.highlightEndDate) {
      if (isAfter(this.highlightStartDate, this.highlightEndDate)) {
        start = this.highlightEndDate;
        end = this.highlightStartDate;
      } else {
        start = this.highlightStartDate;
        end = this.highlightEndDate;
      }

      start = startOfDay(start);
      end = startOfDay(end);

      const range = Array.from(eachDayOfInterval({ start, end }));

      if (!range.length) {
        return;
      }

      for (const day of range) {
        this.highlightedRangeDays.data[lightFormat(day, 'yyyy-MM-dd')] = true;
      }

      this.highlightedRangeDays.min = lightFormat(range[0], 'yyyy-MM-dd');
      this.highlightedRangeDays.max = lightFormat(range[range.length - 1], 'yyyy-MM-dd');
    }
  }

  public createModel() {
    if (!this.date) {
      this.date = getStartDayDate();
    }
  }

  public setDate(date) {
    this.date = date;
    this.change.emit(date);
  }

  /**
   *
   * @param day
   * @param week
   * @param event
   */
  public dayClick(day, week) {
    if (this.dateMode === 'week') {
      this.selectPeriod(week.period);
    } else if (this.dateMode === 'monthrange') {
      this.selectMonthRange(day);
    } else {
      this.selectDay(day);
    }
  }

  public selectDay(day) {
    if (day.disabled) {
      return;
    }

    if (!this.date) {
      this.createModel();
    }

    const date = new Date(
      day.year,
      day.month,
      day.number,
      this.date.getHours(),
      this.date.getMinutes(),
      this.date.getSeconds(),
    );

    this.setDate(date);
  }

  public selectMonthRange(day: DayItem) {
    const date = new Date(
      day.year,
      day.month,
      +day.number,
      0,
      0,
      0,
    );

    this.setDate(date);
  }

  public selectPeriod(period: Period) {
    if (this.selectedPeriod) {
      if (this.selectedPeriod === period) {
        this.selectedPeriod.selected = !this.selectedPeriod.selected;
      } else {
        this.selectedPeriod.selected = false;
        period.selected = true;
        this.selectedPeriod = period;
      }
    } else {
      period.selected = true;
      this.selectedPeriod = period;
    }

    if (this.selectedPeriod.selected) {
      this.periodChange.emit({
        period: this.selectedPeriod.periodId,
        from: this.selectedPeriod.from,
        to: this.selectedPeriod.to,
      });
    } else {
      this.periodChange.emit(null);
    }
  }

  public drawMonths() {
    this.month = this.createMonth(this.calendarDate);
  }

  public createMonth(date: Date) {
    const month = new Month(
      date,
      this.seedDate,
      this.periodWeeks,
      this.enabledDates,
      this.disabledDates,
      this.hideExtraDays,
      this.weekStartsOn,
      this.minDate,
      this.maxDate,
    );

    this.weekDaysList = this.weekStartsOn !== undefined ? WEEKDAYS.map((_, i, arr) => {
      return arr[(i + this.weekStartsOn) % 7];
    }) : WEEKDAYS.slice();

    month.renderDays();

    if (this.dateMode === 'week' && this.selectedPeriod) {
      const selectedPeriod = month.updateSelectionForPeriod(this.selectedPeriod);

      if (selectedPeriod) {
        this.selectedPeriod = selectedPeriod;
      }
    }

    return month;
  }

}

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
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfYear,
  format,
  isAfter,
  isValid,
  lightFormat,
  startOfDay,
  startOfMonth,
  startOfYear,
  subMonths
} from 'date-fns';

import { FsDatePickerModel } from '../../services/model.service';
import { getStartDayDate } from '../../helpers/get-start-day-date';
import { splitDateByComponents } from '../../helpers/split-date-by-components';
import { MONTHS } from '../../consts/months';
import { WEEKDAYS } from '../../consts/week-days';
import { Month } from '../../models/month';
import { Period } from '../../models/period';
import { isRangeDisabled } from '../../helpers/is-range-disabled';


@Component({
  selector: 'fs-date-picker-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsDatePickerCalendarComponent implements OnInit, OnChanges {

  @Input()
  public date: any = null;

  @Input()
  public highlightStartDate = null;
  @Input()
  public highlightEndDate = null;

  @Input()
  public dateMode = null;
  @Input()
  public disabledDays = null;
  @Input()
  public drawMonth = null;

  @Input()
  public seedDate;

  @Input()
  public periodWeeks;

  @Output()
  public onChange = new EventEmitter<any>();

  @Output()
  public onPeriodChange = new EventEmitter<{ period: number, from: Date, to: Date }>();

  @Output()
  public yearChanged = new EventEmitter<any>();

  @Output()
  public monthChanged = new EventEmitter<any>();

  @Output()
  public onDateModeChange = new EventEmitter<any>();
  @Output()
  public onDrawMonth = new EventEmitter<any>();
  @Output()
  public hoverDay = new EventEmitter<any>();

  public selected: any = {};
  public selectedPeriod: Period;
  public month: Month = null;
  public years = [];
  public dateDays = [];

  public monthList: any = MONTHS;
  public weekDaysList = [];

  public currentDate = new Date();
  public today: any = {
    date: format(this.currentDate, 'yyyy-MM-dd'),
    month: this.currentDate.getMonth(),
    year: this.currentDate.getFullYear()
  };

  public highlightedRangeDays = null;

  constructor(
    public element: ElementRef,
    public fsDatePickerModel: FsDatePickerModel,
  ) {}

  public ngOnInit() {

    this.createYearsList();
    this.updateMonthsListDisabledStatus();

    if (this.dateMode === 'week') {
      if (this.date && this.seedDate) {
        this.selectedPeriod = new Period(this.date.period, this.seedDate, this.periodWeeks, true);
        this.selectedPeriod.year = this.date.from.getFullYear();

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

      if (changes.drawMonth) {
        if (changes.drawMonth.currentValue) {
          this.drawMonths(changes.drawMonth.currentValue);
        } else {
          this.onDrawMonth.emit(getStartDayDate());
        }
      }
    }
  }

  public onMouseEnterDay(day) {
    this.hoverDay.emit(day);
  }

  public updateDaysHighlighted() {

    this.highlightedRangeDays = {
      data: {},
      min: null,
      max: null
    };

    let start = null;
    let end = null;

    if (this.highlightStartDate) {

      this.highlightEndDate = this.highlightEndDate || this.highlightStartDate;

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

  public isMonthDisabled(date) {
    const startMonth = startOfMonth(date);
    const endMonth = endOfMonth(date);

    return isRangeDisabled(this.disabledDays, startMonth, endMonth);
  }

  public isYearDisabled(date) {
    const startYear = startOfYear(date);
    const endYear = endOfYear(date);

    return isRangeDisabled(this.disabledDays, startYear, endYear);
  }

  public monthClick(month) {
    Object.assign(month.months, this.monthList);
  }

  public monthViewChange(month) {
    const monthDate = new Date();
    monthDate.setMonth(month);
    monthDate.setFullYear(this.month.year);

    if (this.isMonthDisabled(monthDate)) {
      return;
    }

    this.setMonth(month);
    this.calendarView();
    this.monthChanged.emit(month);
  }

  public monthChange(month) {

    if (!this.date) {
      this.createModel();
    }

    const newDate = new Date(this.date);
    newDate.setMonth(month);

    this.setDate(newDate);
  }

  public createModel() {
    if (!this.date) {
      this.date = getStartDayDate();
    }
  }

  public setDate(date) {
    this.date = date;
    this.onChange.emit(date);
  }

  public calendarView() {
    this.onDateModeChange.emit('date');
  }

  public monthView() {
    this.updateMonthsListDisabledStatus();
    this.onDateModeChange.emit('month');
  }

  public yearView(year) {

    setTimeout(() => {

      const years = this.element.nativeElement.querySelector('.years');
      const selected = years.querySelector('.years .year.selected');

      if (selected) {
        years.scrollTop = selected.offsetTop;
      }
    });

    this.onDateModeChange.emit('year');
  }

  /**
   *
   * @param day
   * @param event
   */
  public dayClick(day, event) {
    if (day.disabled) {
      return;
    }

    if (!this.date) {
      this.createModel();
    }

    const date = new Date(this.date);
    date.setFullYear(day.year);
    date.setMonth(day.month);
    date.setDate(day.number);

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
      this.onPeriodChange.emit({
        period: this.selectedPeriod.periodId,
        from: this.selectedPeriod.from,
        to: this.selectedPeriod.to,
      });
    } else {
      this.onPeriodChange.emit(null);
    }
  }

  public yearViewChange(year) {
    if (this.isYearDisabled(new Date().setFullYear(year))) {
      return;
    }
    // For some reason for mobile devices click event fired for both year/day modes. setTimeout fix this problem
    setTimeout(() => {
      this.setYear(year);
      this.calendarView();
      this.yearChanged.emit(year);
    });
  }

  public yearChange(year) {

    if (!this.date) {
      this.createModel();
    }

    this.setDate((new Date(this.date).setFullYear(year)));
  }

  public previousMonth(month) {
    const prevMonth = subMonths(month.date, 1);
    if (this.isMonthDisabled(prevMonth)) {
      return;
    }
    this.onDrawMonth.emit(prevMonth);
  }

  public nextMonth(month) {
    const nextMonth = addMonths(month.date, 1);
    if (this.isMonthDisabled(nextMonth)) {
      return;
    }
    this.onDrawMonth.emit(nextMonth);
  }

  public setMonth(monthNumber) {
    const month = new Date(this.month.date);
    month.setMonth(monthNumber);

    this.onDrawMonth.emit(month);
  }

  public setYear(yearNumber) {
    const year = new Date(this.month.date).setFullYear(yearNumber);
    this.onDrawMonth.emit(year);
  }

  public drawMonths(date) {
    this.onDrawMonth.emit(date);
    this.month = this.createMonth(date);
  }

  public createMonth(date: Date) {
    const month = new Month(date, this.seedDate, this.periodWeeks, this.disabledDays);

    if (this.dateMode === 'week') {
      this.weekDaysList = WEEKDAYS.map((_, i, arr) => {
        return arr[(i + month.seedDay) % 7];
      });
    } else {
      this.weekDaysList = WEEKDAYS.slice();
    }

    month.renderDays();

    if (this.dateMode === 'week' && this.selectedPeriod) {
      const selectedPeriod = month.updateSelectionForPeriod(this.selectedPeriod);

      if (selectedPeriod) {
        this.selectedPeriod = selectedPeriod;
      }
    }

    return month;
  }

  public createYearsList() {
    this.years = [];
    for (let y: any = this.fsDatePickerModel.minYear; y < this.fsDatePickerModel.maxYear; y++) {
      const year = new Date().setFullYear(y);
      this.years.push({ value: y, disabled: this.isYearDisabled(year) });
    }
  }

  public updateMonthsListDisabledStatus() {
    const year = this.month ? this.month.year : this.currentDate.getFullYear();

    for (const item of this.monthList) {
      const month = new Date();
      month.setFullYear(year);
      month.setMonth(item.value);
      item.disabled = this.isMonthDisabled(month);
    }
  }

  public updateDateDays() {
    const year = this.selected['year'] || 1904;
    const month = this.selected['month'] || 1;
    const max = new Date(year, month, 0).getDate();
    this.dateDays = [];
    for (let d = 1; d <= max; d++) {
      this.dateDays.push(d);
    }

    return this.dateDays;
  }

  public monthDateViewChange() {
    this.updateDateDays();
    this.updateDate();
  }

  public dayDateViewChange() {
    this.updateDateDays();
    this.updateDate();

  }

  public yearDateViewChange() {
    this.updateDateDays();
    this.updateDate();
  }

  public updateDate() {

    const m = new Date(this.selected['year'], this.selected['month'], this.selected['day']);
    const max = new Date(this.selected['year'] || 1904, this.selected['month'], 0).getDate();

    if (max < this.selected['day']) {
      this.selected['day'] = null;
    }

    if (m && isValid(m)) {
      this.setDate(m);
    }
  }
}

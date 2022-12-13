import { addDays, addMonths, format, getDaysInMonth, lightFormat, subDays } from 'date-fns';

import { isDayDisabled } from '../../common/helpers/is-day-disabled';

import { Week } from './week';
import { Period } from './period';
import { WeekDays } from '../../common/types/week-days.type';

const CALENDAR_DAYS_NUMBER = 42;

export class Month {

  public name;
  public number;
  public year;
  public monthAndYear;
  public months;
  public years;
  public weeks: Week[] = [];
  public weeksByPeriod: Map<number, Period>;

  private _prevMonthDaysCount: number;

  private _monthStartDay: number;
  private _daysInMonth: number;


  constructor(public date: Date,
              public seedDate: Date,
              public periodWeeks: number,
              private _disabledDays,
              private _hideExtraDays: boolean,
              private _weekStartsOn: WeekDays,
  ) {
    this._initMonth(date);
    this._countTotalDaysInMonth();
  }

  /**
   * Render days and weeks
   */
  public renderDays() {
    let currentDate = subDays(this.date, this._prevMonthDaysCount);
    let daysToBeRendered = this._hideExtraDays
      ? getDaysInMonth(this.date) + this._prevMonthDaysCount
      : CALENDAR_DAYS_NUMBER;

    // only for week mode in mobile view!
    if (this._hideExtraDays && this.periodWeeks) {
      daysToBeRendered += 7 - (daysToBeRendered % 7);
    }

    let week;

    for (let d = 0; d < daysToBeRendered; d++) {
      const dayNumber = lightFormat(currentDate, 'd');

      if (d % 7 == 0) {
        week = new Week(currentDate, this.seedDate, this.periodWeeks, this._weekStartsOn);

        this.weeks.push(week);
      }

      const dayMuted = d - this._prevMonthDaysCount < 0
        || d >= this._daysInMonth + this._prevMonthDaysCount;

      week.addDay({
        mute: dayMuted,
        date: lightFormat(currentDate, 'yyyy-MM-dd'),
        number: dayNumber,
        month: currentDate.getMonth(),
        year: currentDate.getFullYear(),
        disabled: isDayDisabled(this._disabledDays, currentDate),
      });

      currentDate = addDays(currentDate, 1);
    }

    if (this.seedDate && this.periodWeeks) {
      this._groupWeeks();
      this._markFirstAndLastWeeks();
    }
  }

  public getPeriodById(id: number) {
    if (!this.weeksByPeriod.has(id)) {
      return false;
    }

    return this.weeksByPeriod.get(id);
  }

  /**
   * Input period means that instance of period is not same instance
   * that was created for month.
   * It means that period and weeksByPeriod can have same periodIds but different object refs
   * @param period
   */
  public updateSelectionForPeriod(period: Period) {
    const p = this.getPeriodById(period.periodId);

    if (p && p.year === period.year) {
      p.selected = period.selected;

      return p;
    } else {
      return false;
    }
  }

  /**
   * Init base month field
   * @param date
   */
  private _initMonth(date: Date) {
    this.date = new Date(date);
    this.date.setDate(1);

    this._monthStartDay = this.date.getDay();
    this._daysInMonth = getDaysInMonth(this.date);

    this.name = format(this.date, 'MMMM');
    this.number = this.date.getMonth();
    this.year = this.date.getFullYear();
    this.monthAndYear = `${this.date.getFullYear()}-${this.date.getMonth()}`;
    this.months = [{ name: format(this.date, 'MMMM'), value: this.date.getMonth() }];
    this.years = [ this.date.getFullYear() ];
  }

  /**
   * Depends on week day start it counts total number of days in month
   */
  private _countTotalDaysInMonth() {
    if (this._monthStartDay >= this._weekStartsOn) {
      this._prevMonthDaysCount = this._monthStartDay - this._weekStartsOn;
    } else {
      this._prevMonthDaysCount = 7 - (this._weekStartsOn - this._monthStartDay);
    }

    // const totalDays = this._daysInMonth + this._prevMonthDaysCount;
    // this._totalDaysInMonth = Math.ceil(totalDays / 7) * 7;
  }

  /**
   * Just for easy usage
   */
  private _groupWeeks() {
    this.weeksByPeriod = new Map();

    this.weeks.forEach((week) => {
      if (!this.weeksByPeriod.has(week.periodId)) {
        const newPeriod = new Period(
          week.periodId,
          week.dateStart,
          this.periodWeeks,
        );

        this.weeksByPeriod.set(week.periodId, newPeriod);
      }

      const period = this.weeksByPeriod
        .get(week.periodId);

      period.addWeek(week);
      week.addPeriod(period);
    });
  }

  private _markFirstAndLastWeeks() {
    this.weeksByPeriod.forEach((period) => {
      period.markFirstLastWeeks()
    })
  }
}

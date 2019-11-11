import {
  addWeeks,
  addYears,
  differenceInCalendarWeeks,
  differenceInCalendarYears, differenceInWeeks,
  differenceInYears,
  isBefore,
  isSameWeek
} from 'date-fns';

import { Period } from './period';
import { DayItem } from '../interfaces/day-item.interface';


export class Week {

  public days: DayItem[] = [];
  public period: Period;
  public periodId: number;

  public firstWeekInPeriod = false;
  public lastWeekInPeriod = false;

  private _periodVisible = false;
  private _dateEnd: Date;

  constructor(
    private _dateStart: Date,
    private _seedDate: Date,
    private _periodWeeks: number
  ) {
    if (this._seedDate && this._periodWeeks) {
      this.periodId = this._getPeriodId();
    }

    this._dateEnd = addWeeks(this._dateStart, 1);
  }

  public get dateStart() {
    return this._dateStart;
  }

  public get dateEnd() {
    return this._dateEnd;
  }

  public get periodLableVisible() {
    return this._periodVisible;
  }

  /**
   * Add related day
   * @param day
   */
  public addDay(day: DayItem) {
    this.days.push(day);
  }

  /**
   * Add related period
   * @param period
   */
  public addPeriod(period: Period) {
    this.period = period;
  }

  /**
   * Set visibility for period label
   * @param flag
   */
  public setPeriodVisibility(flag: boolean) {
    this._periodVisible = flag;
  }

  /**
   * To be able to draw borders for week
   */
  public markAsFirstVisiblePeriodWeek() {
    this.firstWeekInPeriod = true;
  }

  public markAsLastVisiblePeriodWeek() {
    this.lastWeekInPeriod = true;
  }

  /**
   * Calculate period ID based on week date start and seed date
   * @private
   */
  private _getPeriodId() {
    /**
     * If week date start before seed date
     */
    if (isBefore(this._dateStart, this._seedDate)) {
      const diffInYears = differenceInYears(this._dateStart, this._seedDate);
      const diffInCalendarYears = differenceInCalendarYears(this._dateStart, this._seedDate);

      const seedDate = new Date(this._seedDate);

      /**
       * Check if week date start includes seed date
       */
      const sameWeek = isSameWeek(
        this._dateStart,
        addYears(seedDate, diffInYears),
        { weekStartsOn: <any>this._seedDate.getDay()}
      );

      if (sameWeek) {
        seedDate.setFullYear(seedDate.getFullYear() + (diffInYears || -1));
      } else {
        seedDate.setFullYear(seedDate.getFullYear() + (diffInCalendarYears || -1));
      }

      const weeksDiff = differenceInCalendarWeeks(
        this._dateStart,
        seedDate,
        { weekStartsOn: <any>this._seedDate.getDay()}
        ) / this._periodWeeks;

      // Sometimes weeksDiff can be integer and we use +0.1 for easy round
      return Math.ceil(weeksDiff + 0.1);
    } else {
      const diffInYears = differenceInYears(addWeeks(this._dateStart, 1), this._seedDate);

      const seedDate = new Date(this._seedDate);
      seedDate.setFullYear(seedDate.getFullYear() + diffInYears);

      const weeksDiff = differenceInCalendarWeeks(
        this._dateStart,
        seedDate,
        { weekStartsOn: <any>this._seedDate.getDay()}
        ) / this._periodWeeks;

      // Sometimes weeksDiff can be integer and we use +0.1 for easy round
      return Math.ceil(weeksDiff + 0.1);
    }
  }
}

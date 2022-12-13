import { addWeeks, } from 'date-fns';

import { Period } from './period';
import { DayItem } from '../interfaces/day-item.interface';
import { getPeriodId } from '../../common/helpers/get-period-id';
import { WeekDays } from '../../common/types/week-days.type';


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
    private _periodWeeks: number,
    private _weekStartsOn: WeekDays,
  ) {
    if (this._seedDate && this._periodWeeks) {
      this.periodId = getPeriodId(this._dateStart, this._seedDate, this._periodWeeks, this._weekStartsOn);
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

}

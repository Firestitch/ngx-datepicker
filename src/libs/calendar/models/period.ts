import {
  addWeeks, differenceInCalendarYears,
  differenceInYears,
} from 'date-fns';

import { Week } from './week';

export class Period {

  public mouseOver = false;

  private _weeks: Week[] = [];
  private _countOfWeeks = 0;
  private _from: Date;
  private _to: Date;
  private _year: number;

  constructor(
    public periodId: number,
    public startDate: Date,
    public seedDate: Date,
    public periodWeeks: number,
    private _selected = false,
  ) {
    this._updatePeriodInterval();
  }

  public get countOfWeeks() {
    return this._countOfWeeks;
  }

  public get selected() {
    return this._selected;
  }

  public get from() {
    return this._from;
  }

  public get to() {
    return this._to;
  }

  public get year() {
    return this._year;
  }

  public set year(value: number) {
    this._year = value;
  }

  public set selected(value: boolean) {
    this._selected = value;

    this._weeks.forEach((week) => {
      week.days.forEach((day) => {
        day.selected = value;
      })
    })
  }

  public addWeek(week: Week) {
    this._weeks.push(week);

    if (this.seedDate && this.periodWeeks) {
      this._sortWeeks();

      if (this._weeks.length === 1) {
        week.setPeriodVisibility(true);
      }
    }

    this._countOfWeeks = this._weeks.length;
  }

  /**
   * Mark weeks with special flags to be able to draw borders
   */
  public markFirstLastWeeks() {
    const firstWeek = this._weeks[0];
    const lastWeek = this._weeks[this._weeks.length - 1];

    firstWeek.markAsFirstVisiblePeriodWeek();
    lastWeek.markAsLastVisiblePeriodWeek();
  }

  private _sortWeeks() {
    this._weeks.sort((a, b) => {
      if (a.dateStart < b.dateStart) {
        return -1
      } else if (a.dateStart > b.dateStart) {
        return 1;
      } else {
        return 0;
      }
    })
  }

  /**
   * Calc from, to, year params based on period date start
   */
  private _updatePeriodInterval() {
    const diffInCalendarYears = differenceInCalendarYears(this.startDate, this.seedDate);

    const seedDate = new Date(this.seedDate);
    seedDate.setFullYear(seedDate.getFullYear() + diffInCalendarYears);

    const offsetFromSeedDate = (this.periodWeeks * (this.periodId - 1));

    this._from = addWeeks(seedDate, offsetFromSeedDate);
    this._to = addWeeks(this._from, this.periodWeeks);
    this._year = this._from.getFullYear();
  }
}

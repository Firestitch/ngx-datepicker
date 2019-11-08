import {
  addWeeks,
  differenceInYears,
} from 'date-fns';

import { Week } from './week';

export class Period {

  private _weeks: Week[] = [];
  private _countOfWeeks = 0;
  private _from: Date;
  private _to: Date;
  private _year: number;

  constructor(
    public periodId: number,
    public seedDate: Date,
    public periodWeeks: number,
    private _selected = false,
  ) {}

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
    }

    this._countOfWeeks = this._weeks.length;
  }

  /**
   * Set visible only FIRST week in VISIBLE period
   *
   * week[0] can be first week for current month, but not for whole period,
   * because period can start from previous months
   * (ex. when periodWeeks = 5)
   */
  public updateVisibilityForWeeks() {
    this._weeks[0].setPeriodVisibility(true)
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
  public updatePeriodInterval() {
    const firstPeriodWeek = this._weeks[0];

    const diffInCalendarYears = differenceInYears(firstPeriodWeek.dateStart, this.seedDate);

    const seedDate = new Date(this.seedDate);
    seedDate.setFullYear(seedDate.getFullYear() + diffInCalendarYears);

    const offsetFromSeedDate = (this.periodWeeks * (this.periodId - 1));

    this._from = addWeeks(seedDate, offsetFromSeedDate);
    this._to = addWeeks(this._from, this.periodWeeks);
    this._year = this._from.getFullYear();
  }
}

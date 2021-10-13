import { BehaviorSubject, Observable } from 'rxjs';

import { endOfDay, isAfter, isDate, startOfDay } from 'date-fns';

import { PickerViewType } from '@libs/common/enums/picker-view-type.enum';

import { isSameDate } from '../helpers/is-same-date';


export class RangePickerRef {

  private _startDatePickerExists = false;
  private _endDatePickerExists = false;

  private _startDate$ = new BehaviorSubject(null);
  private _endDate$ = new BehaviorSubject(null);

  private _startDate: Date = null;
  private _endDate: Date = null;

  constructor(public view: string) {}

  public get startDate(): Date {
    return this._startDate;
  }

  public get endDate(): Date {
    return this._endDate;
  }

  public get startDate$(): Observable<Date> {
    return this._startDate$.asObservable();
  }

  public get endDate$(): Observable<Date> {
    return this._endDate$.asObservable();
  }

  public get startDatePickerExists() {
    return this._startDatePickerExists;
  }

  public get endDatePickerExists() {
    return this._endDatePickerExists;
  }

  public get isRangeValid() {
    return this.isDateAfter(this._endDate, this._startDate);
  }

  /**
   * Update start date and change end date if needed
   * @param value
   */
  public updateStartDate(value: Date) {
    if (!!value
      && (this.view === PickerViewType.Date || this.view === PickerViewType.MonthRange)
    ) {
      value = startOfDay(value);
    }

    this._startDate = value;

    this._startDatePickerExists = true;

    this._startDate$.next(value);
  }

  /**
   * Update end date
   * @param value
   */
  public updateEndDate(value: Date) {
    if (!!value
      && (this.view === PickerViewType.Date || this.view === PickerViewType.MonthRange)
    ) {
      value = endOfDay(value);
    }

    this._endDate = value;

    this._endDatePickerExists = true;

    this._endDate$.next(value);
  }

  /**
   * Mark start date picker as destroyed
   */
  public destroyStartDatePicker() {
    this._startDatePickerExists = false;
  }

  /**
   * Mark end date picker as destroyed
   */
  public destroyEndDatePicker() {
    this._endDatePickerExists = false;
  }

  /**
   * destroy everything related with picker
   */
  public destroy() {}

  private getTimeCompareDate(fromDate) {
    if (!isDate(fromDate)) {
      return null;
    }

    const date = new Date();

    date.setHours(fromDate.getHours());
    date.setMinutes(fromDate.getMinutes());
    date.setSeconds(fromDate.getSeconds());
    date.setMilliseconds(fromDate.getMilliseconds());

    return date;
  }

  private isDateAfter(target, from): boolean {
    let startDate, endDate;

    if (this.view === 'time') {
      if (from) {
        startDate = this.getTimeCompareDate(from);
      }

      if (target) {
        endDate = this.getTimeCompareDate(target);
      }
    } else {
      startDate = from;
      endDate = target;
    }

    if (!startDate || !endDate) {
      return true;
    }

    if (this.view === 'date' && isSameDate(startDate, endDate)) {
      return true;
    }

    return isAfter(endDate, startDate);
  }
}

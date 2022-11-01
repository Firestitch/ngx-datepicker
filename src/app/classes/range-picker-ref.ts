import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { endOfDay, startOfDay } from 'date-fns';

import { PickerViewType } from '../../libs/common/enums/picker-view-type.enum';
import { isDateAfter } from '../../libs/common/helpers/is-date-after';


export class RangePickerRef {

  private _startDatePickerExists = false;
  private _endDatePickerExists = false;

  private _startDate$ = new BehaviorSubject<Date | null>(null);
  private _endDate$ = new BehaviorSubject<Date | null>(null);
  private _activePicker$ = new Subject<'from' | 'to' | null>();

  private _startDate: Date = null;
  private _endDate: Date = null;

  constructor(public view: string) {}

  public get startDate(): Date {
    return this._startDate;
  }

  public get endDate(): Date {
    return this._endDate;
  }

  public get activePicker$(): Observable<'from' | 'to' | null> {
    return this._activePicker$.asObservable();
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
    return isDateAfter(this._endDate, this._startDate, this.view as PickerViewType);
  }

  /**
   * Update start date and change end date if needed
   * @param value
   */
  public updateStartDate(value: Date) {
    this._startDatePickerExists = true;

    if (!!value
      && (this.view === PickerViewType.Date || this.view === PickerViewType.MonthRange)
    ) {
      value = startOfDay(value);
    }

    this._startDate = value && new Date(value) || null;
    this._startDate$.next(this._startDate);
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

    this._endDate = value && new Date(value) || null;
    this._endDatePickerExists = true;

    this._endDate$.next(this._endDate);
  }

  public sameAsStartDate(value: Date): boolean {
    if (!!value
      && (this.view === PickerViewType.Date || this.view === PickerViewType.MonthRange)
    ) {
      value = startOfDay(value);
    }

    return this._startDate === value;
  }

  public sameAsEndDate(value: Date): boolean {
    if (!!value
      && (this.view === PickerViewType.Date || this.view === PickerViewType.MonthRange)
    ) {
      value = endOfDay(value);
    }

    return this._endDate === value;
  }

  public activateFromPicker(): void {
    this._activePicker$.next('from');
  }

  public activateToPicker(): void {
    this._activePicker$.next('to');
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

}

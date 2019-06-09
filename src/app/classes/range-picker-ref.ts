import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isAfter } from 'date-fns';


export class RangePickerRef {

  private _startDatePickerExists = false;
  private _endDatePickerExists = false;

  private _valueChange$ = new ReplaySubject(1);

  private _startDate = null;
  private _endDate = null;

  private _destroy$ = new Subject();

  constructor() {}

  public get valueChange$() {
    return this._valueChange$.pipe(takeUntil(this._destroy$));
  }

  public get startDate() {
    return this._startDate;
  }

  public get endDate() {
    return this._endDate;
  }

  public get startDatePickerExists() {
    return this._startDatePickerExists;
  }

  public get endDatePickerExists() {
    return this._endDatePickerExists;
  }

  /**
   * Update start date and change end date if needed
   * @param value
   */
  public updateStartDate(value: Date) {
    this._startDate = value;

    this._startDatePickerExists = true;

    if (this._startDate && this._endDate && isAfter(this._startDate, this._endDate)) {
      this.updateEndDate(null);
    }

    this._valueChange$.next(value);
  }

  /**
   * Update end date
   * @param value
   */
  public updateEndDate(value: Date) {
    this._endDate = value;

    this._valueChange$.next(value);
    this._endDatePickerExists = true;
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
  public destroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}

import {
  isDate,
  isValid,
  addMonths,
  subMonths,
  setMonth,
  setYear,
  startOfDay,
} from 'date-fns';

import { BehaviorSubject, Observable } from 'rxjs';

import { IDialogFactoryOptions } from '@libs/dialog/interfaces/dialog-factory-data.interface';
import { PickerViewType } from '@libs/common/enums/picker-view-type.enum';
import { getDisabledDays } from '@libs/dialog/helpers/get-disabled-days';
import { getDisabledTimes } from '@libs/dialog/helpers/get-disabled-times';
import { IPeriod } from '@libs/common/interfaces/period.interface';



export class FsDatePickerDialogModel {

  /**
   * year | month | date
   *
   * Current mode of calendar. For ranges consist values for both: start and end date
   */
  public dateMode = null;
  public minDate = null;
  public maxDate = null;
  public startOfDay = true;
  public seedDate = null;
  public periodWeeks = null;
  public minutes = true;

  private _minYear = null;
  private _maxYear = null;

  private _pickerOptions: IDialogFactoryOptions;

  private _model$ = new BehaviorSubject<Date | null>(null);
  private _period$ = new BehaviorSubject<IPeriod | null>(null);

  private _now$ = new BehaviorSubject<Date>(new Date());

  private _disabledDays$ = new BehaviorSubject<[Date, Date][]>([]);
  private _disabledTimes$ = new BehaviorSubject<[Date, Date][]>([]);
  private _calendarDate$ = new BehaviorSubject<Date>(this.now);
  private _calendarMode$ = new BehaviorSubject<string>('date');
  private _calendarDay$ = new BehaviorSubject<number>(this.now.getDate());
  private _calendarMonth$ = new BehaviorSubject<number>(this.now.getMonth());
  private _calendarYear$ = new BehaviorSubject<number>(this.now.getFullYear());

  /**
   * date | datetime | time | week
   * View is options selected on init. Can't be changed manually
   */
  private _view$ = new BehaviorSubject<string>('date');

  constructor(
    pickerOptions: IDialogFactoryOptions,
  ) {
    this._initCalendar(pickerOptions);
    this._updateDisabled();
  }

  public get now(): Date {
    return this._now$.value;
  }

  public set calendarDate(value: Date) {
    this._calendarDate$.next(value);
  }

  public get calendarDate(): Date {
    return this._calendarDate$.value;
  }

  public get calendarDate$(): Observable<Date> {
    return this._calendarDate$;
  }

  public get view$(): Observable<string> {
    return this._view$.asObservable();
  }

  public get view(): string {
    return this._view$.value;
  }

  public set view(view) {
    this._view$.next(view);
  }

  public get calendarMode$(): Observable<string> {
    return this._calendarMode$;
  }

  public get calendarMode(): string {
    return this._calendarMode$.value;
  }

  public set model(value: Date | null) {
    if (this._pickerOptions.view === 'date' && this.startOfDay) {
      value = startOfDay(value);
    }

    this._model$.next(value);

    this._updateDisabledTimes();
  }

  public get model(): Date | null {
    return this._model$.value;
  }

  public get model$(): Observable<Date | null> {
    return this._model$;
  }

  public set period(value: IPeriod | null) {
    this._period$.next(value);
  }

  public get period(): IPeriod | null {
    return this._period$.value;
  }

  public get period$(): Observable<IPeriod | null> {
    return this._period$;
  }

  public set disabledDays(value: [Date, Date][]) {
    this._disabledDays$.next(value);
  }

  public get disabledDays$(): Observable<[Date, Date][]> {
    return this._disabledDays$;
  }

  public set disabledTimes(value: [Date, Date][]) {
    this._disabledTimes$.next(value);
  }

  public get disabledTimes$(): Observable<[Date, Date][]> {
    return this._disabledTimes$;
  }

  public set minYear(minYear) {
    this._minYear = minYear || (new Date().getFullYear() - 100);
  }

  public get minYear() {
    return this._minYear;
  }

  public set maxYear(maxYear) {
    this._maxYear = maxYear || (new Date().getFullYear() + 100);
  }

  public get maxYear() {
    return this._maxYear;
  }

  private set _calendarMode(value: string) {
    this._calendarMode$.next(value);
  }

  private set _calendarDay(value: number) {
    this._calendarDay$.next(value);
  }

  private set _calendarMonth(value: number) {
    this._calendarMonth$.next(value);
  }

  private set _calendarYear(value: number) {
    this._calendarYear$.next(value);
  }

  /*public disabledDays() {

    const result = [];

    if (this.minDate) {
      result.push([subYears(new Date(), this.minYear), new Date(this.minDate)]);
    }

    if (this.maxDate) {
      result.push([new Date(this.maxDate), addYears(new Date(), this._maxYear)]);
    }

    return result;
  }*/

  private _initCalendar(options: IDialogFactoryOptions) {
    this._pickerOptions = { ...options };

    this.view = options.view;

    if (this.view === PickerViewType.Week) {
      this.period = (options.modelValue as IPeriod);
      this.calendarDate = (options.modelValue as IPeriod)?.from || new Date();
    } else {
      this.model = (options.modelValue as Date);
      this.calendarDate = (options.modelValue as Date);
    }

    this._calendarMode = options.view;
    this.minYear = options.minYear;
    this.maxYear = options.maxYear;
    this.minDate = options.minDate;
    this.maxDate = options.maxDate;
    this.startOfDay = options.startOfDay;
    this.minutes = options.minutes === undefined
      ? true
      : options.minutes;


    if (!isDate(options.seedDate) || !isValid(options.seedDate)) {
      this.seedDate = new Date((new Date().getFullYear()), 0, 1);
    } else {
      this.seedDate = options.seedDate;
    }

    this.periodWeeks = options.periodWeeks;

    this._updateDisabledDays();
  }

  private _updateDisabled() {
    this._updateDisabledDays();
    this._updateDisabledTimes();
  }

  private _updateDisabledDays() {
    if (this._pickerOptions.rangeType) {
      if (this._pickerOptions.rangeType === 'to') {
        this.disabledDays = getDisabledDays(this.minDate, this.maxDate, this.minYear, this.maxYear);
      }
    } else {
      this.disabledDays = getDisabledDays(this.minDate, this.maxDate, this.minYear, this.maxYear);
    }
  }

  private _updateDisabledTimes() {
    const pickerView = this.view;

    if (pickerView !== PickerViewType.DateTime && pickerView !== PickerViewType.Time) {
      return;
    }

    if (this._pickerOptions.rangeType) {
      if (this._pickerOptions.rangeType === 'to') {
        this.disabledTimes = getDisabledTimes(this.model, this._pickerOptions.pickerRef);
      }
    } else {
      this.disabledTimes = getDisabledTimes(this.model, this._pickerOptions.pickerRef);
    }
  }

  public setCalendarMonth(month: number) {
    this.calendarDate = setMonth(this.calendarDate, month);
  }

  public setCalendarYear(year: number) {
    this.calendarDate = setYear(this.calendarDate, year);
    this._updateDisabled();
  }

  public nextMonth() {
    this.calendarDate = addMonths(this.calendarDate, 1);
  }

  public prevMonth() {
    this.calendarDate = subMonths(this.calendarDate, 1);
  }

  public setCalendarMode(mode: string) {
    this._calendarMode = mode;
  }
}

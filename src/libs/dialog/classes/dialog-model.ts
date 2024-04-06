import { BehaviorSubject, Observable } from 'rxjs';

import {
  addDays,
  addMinutes,
  addMonths,
  isBefore,
  isDate,
  isValid,
  setMonth,
  setYear,
  startOfDay,
  subMonths,
} from 'date-fns';


import { RangePickerRef } from '../../../app/classes/range-picker-ref';
import { WeekDay } from '../../../libs/common/enums/week-day.enum';
import { PickerViewType } from '../../common/enums/picker-view-type.enum';
import { IDatePickerPeriod } from '../../common/interfaces/period.interface';
import { WeekDays } from '../../common/types/week-days.type';
import { getDisabledDays } from '../../dialog/helpers/get-disabled-days';
import { getDisabledTimes } from '../../dialog/helpers/get-disabled-times';
import { IDialogFactoryOptions } from '../../dialog/interfaces/dialog-factory-data.interface';
import { getFirstDayOfFirstYearWeek } from '../helpers/get-first-day-of-first-year-week';


export class FsDatePickerDialogModel {

  /**
   * year | month | date
   *
   * Current mode of calendar. For ranges consist values for both: start and end date
   */
  public dateMode: 'datetime' | 'year' | 'time' | 'date' | 'month' = null;
  public minDate = null;
  public maxDate = null;
  public rangeStart: Date = null;
  public startOfDay = true;
  public seedDate = null;
  public periodWeeks = null;
  public minutes = true;
  public weekStartsOn: WeekDays;

  private _minYear = null;
  private _maxYear = null;

  private _pickerOptions: IDialogFactoryOptions;

  private _model$ = new BehaviorSubject<Date | null>(null);
  private _period$ = new BehaviorSubject<IDatePickerPeriod | null>(null);

  private _now$ = new BehaviorSubject<Date>(new Date());

  private _disabledDays$ = new BehaviorSubject<[Date, Date][]>([]);
  private _disabledTimes$ = new BehaviorSubject<[Date, Date][]>([]);
  private _calendarDate$ = new BehaviorSubject<Date>(this.now);
  private _calendarMode$ = new BehaviorSubject<string>('date');
  private _timeExpanded$ = new BehaviorSubject<boolean>(false);

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

  public get isDateView(): boolean {
    return this.view === PickerViewType.Date;
  }

  public get isDateTimeView(): boolean {
    return this.view === PickerViewType.DateTime;
  }

  public get isTimeView(): boolean {
    return this.view === PickerViewType.Time;
  }

  public get isWeekView(): boolean {
    return this.view === PickerViewType.Week;
  }

  public get isMonthRangeView(): boolean {
    return this.view === PickerViewType.MonthRange;
  }

  public get calendarMode$(): Observable<string> {
    return this._calendarMode$;
  }

  public get calendarMode(): string {
    return this._calendarMode$.value;
  }

  public get isPickerRangeFrom(): boolean {
    return this._pickerOptions.rangeType === 'from';
  }

  public get isPickerRangeTo(): boolean {
    return this._pickerOptions.rangeType === 'to';
  }

  public set model(value: Date | null) {
    if (isValid(value)) {
      if (this.isDateView && this.startOfDay) {
        value = startOfDay(value);
      }

      /**
       * For cases when we have datetime view type and have opened "To" date picker.
       * If "From" date is already selected it means that we have some Time range to be disabled.
       * When user select "To" date without time (only clicks on date) we have to pull up time for selected date.
       */
      if (this.isDateTimeView
        && this._pickerOptions.rangeType === 'to'
        && !this.model
        && value
      ) {
        if (isBefore(value, this.rangePickerRef.startDate)) {
          value = new Date(this.rangePickerRef.startDate);
        }
      }
    } else {
      value = null;
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

  public set period(value: IDatePickerPeriod | null) {
    this._period$.next(value);
  }

  public get period(): IDatePickerPeriod | null {
    return this._period$.value;
  }

  public get period$(): Observable<IDatePickerPeriod | null> {
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

  public get timeExpanded$(): Observable<boolean> {
    return this._timeExpanded$.asObservable();
  }

  public get timeExpanded(): boolean {
    return this._timeExpanded$.value;
  }

  public set timeExpanded(flag: boolean) {
    this._timeExpanded$.next(flag);
  }

  public get rangePickerRef(): RangePickerRef | null {
    return this._pickerOptions.pickerRef;
  }

  public setCalendarMonth(month: number) {
    this.goToMongth(month);
    this.model = this.calendarDate;
  }

  public setCalendarYear(year: number) {
    this.goToYear(year);
    this.model = this.calendarDate;

    this._updateDisabled();
  }

  public goToMongth(month: number): void {
    this.calendarDate = setMonth(this.calendarDate, month);
  }

  public goToYear(year: number): void {
    this.calendarDate = setYear(this.calendarDate, year);
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

  private _initCalendar(options: IDialogFactoryOptions) {
    this._pickerOptions = { ...options };
    this.view = options.view;
    this._calendarMode = options.view;
    this.minYear = options.minYear;
    this.maxYear = options.maxYear;
    this.minDate = options.minDate;
    this.maxDate = options.maxDate;
    this.rangeStart = options.rangeStart;
    this.weekStartsOn = options.weekStartsOn ?? WeekDay.Sunday;

    if (this._pickerOptions.rangeType === 'to' && this.minDate < this.rangeStart) {
      this.minDate = this.rangeStart;
    }

    this.startOfDay = options.startOfDay;
    this.minutes = options.minutes === undefined
      ? true
      : options.minutes;

    this.seedDate = !isDate(options.seedDate) || !isValid(options.seedDate) ?
      getFirstDayOfFirstYearWeek(new Date()) :
      options.seedDate;
    this.periodWeeks = options.periodWeeks;

    this._initCalendarDate(options);
    this._updateDisabledDays();
    this._updateCalendarDate();
  }

  private _initCalendarDate(options: IDialogFactoryOptions) {
    switch (this.view) {
      case PickerViewType.Week: {
        this.period = (options.modelValue as IDatePickerPeriod);
        this.calendarDate = (options.modelValue as IDatePickerPeriod)?.from || new Date();
      } break;

      case PickerViewType.MonthRange: {
        this.calendarDate = (options.modelValue as Date) || new Date();
      } break;

      default: {
        this.model = (options.modelValue as Date);
        this.calendarDate = (options.modelValue as Date) || new Date();
      }
    }
  }

  private _updateDisabled() {
    this._updateDisabledDays();
    this._updateDisabledTimes();
  }

  private _updateDisabledDays() {
    this.disabledDays = getDisabledDays(this.minDate, this.maxDate, this.minYear, this.maxYear, this.view as PickerViewType);
  }

  private _updateCalendarDate() {
    if (this.minDate && isDate(this.minDate) && isValid(this.minDate)) {
      const pickerView = this.view;

      if (!this.model) {
        // Add days because it was substructed by 1 day in DatePicker component
        if ([PickerViewType.Date, PickerViewType.Week].includes(pickerView as PickerViewType)) {
          this.calendarDate = addDays(this.minDate, 1);
        } else if ([PickerViewType.DateTime, PickerViewType.Time].includes(pickerView as PickerViewType)) {
          this.calendarDate = addDays(addMinutes(this.minDate, 5), 1);
        }
      }
    }
  }

  private _updateDisabledTimes() {
    const pickerView = this.view;

    if (pickerView !== PickerViewType.DateTime && pickerView !== PickerViewType.Time) {
      return;
    }

    if (this._pickerOptions.rangeType) {
      if (this._pickerOptions.rangeType === 'to') {
        this.disabledTimes = getDisabledTimes(
          this.model,
          this._pickerOptions.pickerRef.startDate,
          pickerView,
        );
      }
    } else {
      this.disabledTimes = getDisabledTimes(
        this.model,
        this.minDate,
        pickerView,
      );
    }
  }

}

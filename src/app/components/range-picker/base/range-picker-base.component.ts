import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Injector,
  Input,
  OnInit
} from '@angular/core';
import { ControlValueAccessor, NgControl, ValidationErrors, ValidatorFn, } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { filter, map, pairwise, skip, take, takeUntil } from 'rxjs/operators';

import { isDate, isEqual, isValid, subDays } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

import { FsDatePickerDialogFactory } from '../../../../libs/dialog/services/dialog-factory.service';
import { FsDatePickerDialogRef } from '../../../../libs/dialog/classes/dialog-ref';
import { PickerViewType } from '../../../../libs/common/enums/picker-view-type.enum';
import { isSameDate } from '../../../../libs/common/helpers/is-same-date';

import { RangePickerRef } from '../../../classes/range-picker-ref';
import { formatDateTime } from '../../../helpers/format-date-time';
import { createDateFromValue } from '../../../helpers/create-date-from-value';
import { parseDate } from '../../../helpers/parse-date';


@Directive()
export abstract class RangePickerComponent<D = any>
  implements ControlValueAccessor, OnInit {

  @Input()
  public view = PickerViewType.Date;

  @Input()
  public minYear: number = null;

  @Input()
  public maxYear: number = null;

  @Input()
  public minDate: Date = null;

  @Input()
  public maxDate: Date = null;

  @Input()
  public clear = true;

  @Input()
  public format: string;

  @HostBinding('class.fs-input-disabled')
  @HostBinding('attr.readonly')
  public disabled = false;

  @Input('readonly')
  public set readonlyState(isReadonly: string) {
    this.readonly = !!isReadonly || isReadonly === '';
  }

  @Input() public ngModelOptions: {
    name?: string;
    standalone?: boolean;
    updateOn?: 'change' | 'blur' | 'submit';
  };

  @Input()
  public set timezone(value: string) {
    this._timezone = value;

    this._tzChanged(this._originValue);
  }

  @HostBinding('class.fs-input-readonly')
  @HostBinding('attr.readonly')
  public readonly = false;

  public onChange: any;
  public onTouch: any = () => {};

  protected _dateDialogRef: FsDatePickerDialogRef;
  protected _pickerRef: RangePickerRef;
  protected _destroy$ = new Subject();
  protected _value;
  protected _originValue: Date | null; // before timezone
  protected _name;
  protected _timezone: string;

  private _lastValueValid = false;

  protected constructor(
    protected _elRef: ElementRef,
    protected _injector: Injector,
    protected _datepickerFactory: FsDatePickerDialogFactory,
    protected _type,
    protected _cdRef: ChangeDetectorRef,
    protected _ngControl: NgControl,
  ) {
    this._ngControl.valueAccessor = this;
    this._elRef.nativeElement.setAttribute('autocomplete', 'off');
  }

  public get name() {
    return this._name;
  }

  public get timezone(): string {
    return this._timezone;
  }

  public set value(value) {
    if (this._value !== value) {
      this._value = value;

      this.onChange(value);
      this.onTouch(value);
    }
  }

  public ngOnInit(): void {
    const control = this._ngControl.control;
    const validators = control.validator
      ? [ control.validator, this._parseValidator]
      : this._parseValidator;
    control.setValidators(validators);
    control.updateValueAndValidity();
  }

  public get value() {
    return this._value;
  }

  public get dateDialogRef() {
    return this._dateDialogRef;
  }

  public writeValue(value) {
    value = this._processInputDate(value);

    this._originValue = value;

    this.validateDate(value);

    const [valuesAreDates] = this._checkValuesEquality(value, this.value);

    if ((valuesAreDates) || (!valuesAreDates && this.value !== value)) {
      this._value = value;
      this.updateInput(this._value);

      this._cdRef.markForCheck();
    }
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  @HostListener('focus', ['$event.target.value'])
  public open() {
    if (this._dateDialogRef || this.disabled || this.readonly) {
      return
    }

    //this._disableInput();

    this._dateDialogRef = this._datepickerFactory.openDatePicker(
      this._elRef,
      this._injector,
      {
        view: this.view,
        minYear: this.minYear,
        maxYear: this.maxYear,
        minDate: this._getPickerStartDate() || this.minDate,
        maxDate: this.maxDate,
        components: this._getDefaultComponents(),
        modelValue: this.value,
        pickerRef: this._pickerRef,
        rangeType: this._type
      }
    );

    this._elRef.nativeElement.focus();

    this._listenDialogValueChanges();

    this._dateDialogRef.close$
      .pipe(
        take(1),
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._dateDialogRef = null;
        this._enableInput();

        this._cdRef.markForCheck();
      });
  }

  /**
   * Set value which was selected in dialog
   * @param value
   */
  public updateValueFromDialog(value: Date) {
    this.updateValue(value);
    // this.writeValue(value);
  }

  public updateValue(value): void {
    if (this.view === PickerViewType.Time && isValid(this._value) && isValid(value)) {
      this._value.setHours(value.getHours());
      this._value.setMinutes(value.getMinutes());
      this._value.setSeconds(value.getSeconds());

      value = new Date(this._value);
    }

    this._value = value;
    this.updateInput(this._value);

    if (value && this.timezone) {
      value = zonedTimeToUtc(value, this.timezone);
    }

    this.onChange(value);
    this.onTouch(value);
  }

  public updateInput(value) {
    this._elRef.nativeElement.value = formatDateTime(value, this.view, this.format, this.timezone);
  }

  @HostListener('keyup', ['$event', '$event.target.value'])
  public _inputKeyup(event: KeyboardEvent, value: string): void {
    if(event.key === 'Enter') {
      this.inputChange(value);
    }
  }

  @HostListener('input', ['$event.target.value', '$event.target'])
  public _inputChange(value: string, target): void {
    if (this.ngModelOptions?.updateOn !== 'blur')  {
      this.inputChange(value);
    }
  }

  public inputChange(value: string): void {
    const lastValueWasValid = this._lastValueValid;
    const date = parseDate(value);

    this._lastValueValid = !date || isValid(date);

    if (!isEqual(date, this._value)) {
      this.updateValue(date);
    } else if (lastValueWasValid !== this._lastValueValid) {
      this._ngControl.control.updateValueAndValidity();
    }
  }

  @HostListener('blur', ['$event.target.value'])
  public _inputBlur(value: string): void {
    if (this.ngModelOptions?.updateOn === 'blur')  {
      this.inputChange(value);
    }

    this.updateInput(this.value);
  }

  public registerOnChange(fn) { this.onChange = fn;  }
  public registerOnTouched(fn) { this.onTouch = fn; }

  protected _processInputDate(date: Date | null): Date | null {
    if (!date) {
      return null;
    }

    return createDateFromValue(date, this.timezone);
  }

  protected _getDefaultComponents() {
    if (this.view === 'time') {
      return { timeStart: true };
    } else {
      return { calendarStart: true, calendarEnd: true };
    }
  }

  protected _enableInput() {
    this.disabled = false;
  }

  protected _disableInput() {
    this.disabled = true;

  }

  protected _tzChanged(originDate: Date | null) {
    this._value = createDateFromValue(originDate, this.timezone);
    this.updateInput(this._value);

    this._cdRef.markForCheck();
  }

  protected _listenDialogValueChanges(): void {
    this._dateDialogRef.value$
      .pipe(
        takeUntil(this._dateDialogRef.close$),
        takeUntil(this._destroy$),
      )
      .subscribe((value: Date) => {
        this.updateValueFromDialog(value);
      });
  }

  protected _checkValuesEquality(newValue, prevValue) {
    const valuesAreDates = isDate(newValue) && isDate(prevValue) && isValid(newValue) && isValid(prevValue);
    const valuesDatesEquals = valuesAreDates
      && isSameDate(newValue, prevValue);

    return [valuesAreDates, valuesDatesEquals];
  }

  /**
   * We need picker start date to be able to limit "Date To" picker
   */
  protected _getPickerStartDate() {
    if (
      this.view !== PickerViewType.MonthRange
      && isDate(this._pickerRef.startDate)
      && isValid(this._pickerRef.startDate)
    ) {
      return subDays(this._pickerRef.startDate, 1);
    }

    return false;
  }

  /** The form control validator for whether the input parses. */
  protected _parseValidator: ValidatorFn = (): ValidationErrors | null => {
    return this._lastValueValid
      ? null
      : { fsDatepickerParse: 'Invalid Date' };
  }

  protected validateDate(date: Date | unknown) {
    this._lastValueValid = !date || isValid(date);
  }

  protected _pickerRefUpdates$(target: Observable<Date | null>): Observable<Date | any> {
    return target
      .pipe(
        skip(1),
        pairwise(),
        filter((changes: [Date | null, Date | null]) => {
          const prevValue = changes[0]?.getTime();
          const newValue = changes[1]?.getTime();

          return prevValue !== newValue
            && this.value?.getTime() !== newValue;
        }),
        map((changes) => changes[1]),
      );
  }

}

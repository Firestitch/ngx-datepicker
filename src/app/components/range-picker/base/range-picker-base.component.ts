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

import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { isDate, isEqual, isValid, subDays } from 'date-fns';

import { RangePickerRef } from '../../../classes/range-picker-ref';
import { FsDatepickerFactory } from '../../../services/factory.service';
import { formatDateTime } from '../../../helpers/format-date-time';
import { FsDateDialogRef } from '../../../classes/date-dialog-ref';
import { createDateFromValue } from '../../../helpers/create-date-from-value';
import { isSameDate } from '../../../helpers/is-same-date';
import { DateFormat } from '../../../enums/date-format.enum';
import { parseDate } from '../../../helpers/parse-date';


@Directive()
export abstract class BaseRangePickerComponent<D = any>
  implements ControlValueAccessor, OnInit {

  @Input()
  public view: DateFormat = DateFormat.Date;

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

  @HostBinding('class.fs-input-disabled')
  @HostBinding('attr.readonly')
  public disabled = false;

  @Input('readonly')
  public set readonlyState(isReadonly: string) {
    this.readonly = !!isReadonly || isReadonly === '';
  }

  @HostBinding('class.fs-input-readonly')
  @HostBinding('attr.readonly')
  public readonly = false;

  public onChange: any;
  public onTouch: any = () => {};

  protected _dateDialogRef: FsDateDialogRef;
  protected _pickerRef: RangePickerRef;
  protected _destroy$ = new Subject();
  protected _value;

  private _lastValueValid = false;

  protected constructor(
    protected _elRef: ElementRef,
    protected _injector: Injector,
    protected _datepickerFactory: FsDatepickerFactory,
    protected _type,
    protected _cdRef: ChangeDetectorRef,
    protected _ngControl: NgControl,
  ) {
    this._ngControl.valueAccessor = this;
    this._elRef.nativeElement.setAttribute('autocomplete', 'off');
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
    value = createDateFromValue(value);
    this.validateDate(value);

    const [valuesAreDates] = this._checkValuesEquality(value, this.value);

    if ((valuesAreDates) || (!valuesAreDates && this.value !== value)) {
      this._value = value;
      this._elRef.nativeElement.value = formatDateTime(value, this.view);

      this._cdRef.markForCheck();
    }
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

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
        dateMode: 'date',
        components: this._getDefaultComponents(),
        modelValue: this.value,
        pickerRef: this._pickerRef,
        type: this._type
      }
    );

    this._dateDialogRef.value$
      .pipe(
        takeUntil(this._dateDialogRef.close$),
        takeUntil(this._destroy$),
      )
      .subscribe((value) => {
        this.updateValueFromDialog(value);
      });

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
  public updateValueFromDialog(value) {
    this.writeValue(value);
    this.onChange(value);
    this.onTouch(value);
  }

  public updateValue(value): void {
    if (this.view === DateFormat.Time && isValid(this._value) && isValid(value)) {
      this._value.setHours(value.getHours());
      this._value.setMinutes(value.getMinutes());
      this._value.setSeconds(value.getSeconds());

      value = new Date(this._value);
    }

    this._value = value;
    this.onChange(value);
    this.onTouch(value);
  }

  public updateInput(value) {
    const viewValue = formatDateTime(value, this.view);

    if (!!viewValue) {
      this._elRef.nativeElement.value = formatDateTime(this.value, this.view);
    }
  }

  public registerOnChange(fn) { this.onChange = fn;  }
  public registerOnTouched(fn) { this.onTouch = fn; }

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

  protected _checkValuesEquality(newValue, prevValue) {
    const valuesAreDates = isDate(newValue) && isDate(prevValue);
    const valuesDatesEquals = valuesAreDates
      && isSameDate(newValue, prevValue);

    return [valuesAreDates, valuesDatesEquals];
  }

  /**
   * We need picker start date to be able to limit "Date To" picker
   */
  protected _getPickerStartDate() {
    if (isDate(this._pickerRef.startDate) && isValid(this._pickerRef.startDate)) {
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

  @HostListener('input', ['$event.target.value'])
  public _inputChange(value: string): void {
    const lastValueWasValid = this._lastValueValid;
    const date = parseDate(value);

    this._lastValueValid = !date || isValid(date);

    if (!isEqual(date, this._value)) {
      this.updateValue(date);
      /*this._value = date;
      this.onChange(this.value);*/
    } else if (lastValueWasValid !== this._lastValueValid) {
      this._ngControl.control.updateValueAndValidity();
    }
  }

  @HostListener('blur')
  public _formatValue() {
    this.updateInput(this.value);
  }

}

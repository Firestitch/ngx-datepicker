import {
  ChangeDetectorRef,
  ElementRef,
  HostBinding,
  HostListener,
  Injector,
  Input,
  Optional,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';

import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { isDate, isValid, subDays } from 'date-fns';

import { RangePickerRef } from '../../../classes/range-picker-ref';
import { FsDatepickerFactory } from '../../../services/factory.service';
import { formatDateTime } from '../../../helpers/format-date-time';
import { FsDateDialogRef } from '../../../classes/date-dialog-ref';
import { createDateFromValue } from '../../../helpers/create-date-from-value';
import { isSameDate } from '../../../helpers/is-same-date';
import { DateFormat } from '../../../enums/date-format.enum';


export class BaseRangePickerComponent implements ControlValueAccessor {

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

  public onChange: any = () => {};
  public onTouch: any = () => {};

  protected _dateDialogRef: FsDateDialogRef;
  protected _pickerRef: RangePickerRef;
  protected _destroy$ = new Subject();


  protected _value;

  constructor(
    protected _elRef: ElementRef,
    protected _injector: Injector,
    protected _datepickerFactory: FsDatepickerFactory,
    protected _type,
    protected _cdRef: ChangeDetectorRef,
    @Optional() private _parentFormField: MatFormField,
  ) {
    this._elRef.nativeElement.setAttribute('autocomplete', 'off');
  }

  public set value(value) {
    if (this._value !== value) {
      this._value = value;

      this.onChange(value);
      this.onTouch(value);
    }
  }

  public get value() {
    return this._value;
  }

  public get dateDialogRef() {
    return this._dateDialogRef;
  }

  public writeValue(value) {
    value = createDateFromValue(value);

    const [valuesAreDates, datesAreEquals] = this._checkValuesEquality(value, this._value);

    if ((valuesAreDates) || (!valuesAreDates && this.value !== value)) {
      this._value = value;
      this._elRef.nativeElement.value = formatDateTime(value, this.view);

      this._cdRef.markForCheck();
    }
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  @HostListener('click')
  @HostListener('focus')
  public open() {
    if (this._dateDialogRef || this.disabled || this.readonly) {
      return
    }

    this._disableInput();

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
}

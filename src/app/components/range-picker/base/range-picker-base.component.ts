import {
  ElementRef,
  HostBinding,
  HostListener,
  Injector,
  Input,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { RangePickerRef } from '../../../classes/range-picker-ref';
import { FsDatepickerFactory } from '../../../services/factory.service';
import { formatDateTime } from '../../../helpers/format-date-time';
import { FsDateDialogRef } from '../../../classes/date-dialog-ref';
import { createDateFromValue } from '../../../helpers/create-date-from-value';
import { isDate } from 'date-fns';
import { isSameDate } from '../../../helpers/is-same-date';
import { DateFormat } from '../../../enums/date-format.enum';


export class BaseRangePickerComponent implements ControlValueAccessor {

  @Input()
  public view: DateFormat;

  @Input()
  public minYear = null;

  @Input()
  public maxYear = null;

  @Input()
  public minDate = null;

  @Input()
  public maxDate = null;

  @HostBinding('attr.readonly')
  public disabled = false;

  public onChange: any = () => {};
  public onTouch: any = () => {};

  protected _dateDialogRef: FsDateDialogRef;
  protected _pickerRef: RangePickerRef;
  protected _valuesAreDates = false;
  protected _valuesDatesEquals = false;
  protected _destroy$ = new Subject();


  protected _value;

  constructor(
    protected _elRef: ElementRef,
    protected _injector: Injector,
    protected _datepickerFactory: FsDatepickerFactory,
    protected _type,
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

  public writeValue(value) {
    value = createDateFromValue(value);

    const [valuesAreDates, datesAreEquals] = this._checkValuesEquality(value, this._value);

    if ((valuesAreDates) || (!valuesAreDates && this.value !== value)) {
      this.value = value;
      this._elRef.nativeElement.value = formatDateTime(value, this.view);
    }
  }

  @HostListener('click')
  public open() {
    if (this._dateDialogRef) {
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
        minDate: this.minDate,
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
}

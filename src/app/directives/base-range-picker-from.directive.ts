import { ElementRef, EventEmitter, HostListener, Injector, Input, Output } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { RangePickerRef } from '../classes/range-picker-ref';
import { FsDatepickerFactory } from '../services/factory.service';
import { formatDateTime } from '../helpers/format-date-time';


export class BaseRangePickerFromDirective implements ControlValueAccessor {

  @Input()
  public view: string;

  @Input()
  public placeholder: string;

  @Input()
  public minYear = null;

  @Input()
  public maxYear = null;

  @Input()
  public minDate = null;

  @Input()
  public maxDate = null;

  @Output()
  public updated = new EventEmitter();

  public onChange: any = () => {};
  public onTouch: any = () => {};

  protected _pickerRef: RangePickerRef;
  protected _destroy$ = new Subject();


  protected _value;

  constructor(
    protected _elRef: ElementRef,
    protected _injector: Injector,
    protected _datepickerFactory: FsDatepickerFactory,
  ) {
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
    if (value !== this.value) {
      this._value = value;
      this._elRef.nativeElement.value = formatDateTime(value, this.view);
    }
  }

  @HostListener('focus')
  public open() {
    const dateDialogRef = this._datepickerFactory.openDatePicker(
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
      }
    );

    dateDialogRef.value$
      .pipe(
        take(1),
        takeUntil(this._destroy$),
      )
      .subscribe((value) => {
        this.updateValueFromDialog(value);
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
}

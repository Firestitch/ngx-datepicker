import {
  Directive,
  EventEmitter,
  HostListener,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NgControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { FocusMonitor } from '@angular/cdk/a11y';

import { fromEvent, Observable } from 'rxjs';
import { filter, map, pairwise, skip, take, takeUntil, tap } from 'rxjs/operators';

import { isDate, isEqual, isValid } from 'date-fns';
import { fromZonedTime } from 'date-fns-tz';

import { PickerViewType } from '../../../../libs/common/enums/picker-view-type.enum';
import { isSameDate } from '../../../../libs/common/helpers/is-same-date';
import { FsDatePickerDialogFactory } from '../../../../libs/dialog/services/dialog-factory.service';
import { FsPickerBaseComponent } from '../../../classes/picker-base-component';
import { RangePickerRef } from '../../../classes/range-picker-ref';
import { createDateFromValue } from '../../../helpers/create-date-from-value';
import { formatDateTime } from '../../../helpers/format-date-time';
import { parseDate } from '../../../helpers/parse-date';


@Directive()
export abstract class RangePickerComponent<D = any> extends FsPickerBaseComponent
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
  public icon = true;

  @Input()
  public format: string;

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

  public get timezone(): string {
    return this._timezone;
  }

  @Output('closed')
  public closed$ = new EventEmitter<void>();

  public onChange: (value) => void;
  public onTouch: (value) => void;

  public get name() {
    return this._name;
  }

  protected _pickerRef: RangePickerRef;
  protected _value;
  protected _originValue: Date | null; // before timezone
  protected _name;
  protected _timezone: string;
  
  private _lastValueValid = false;

  protected constructor(
    protected _injector: Injector,
    protected _datepickerFactory: FsDatePickerDialogFactory,
    protected _type,
    protected _ngControl: NgControl,
    fm: FocusMonitor,
  ) {
    super(_injector, fm);
    this._ngControl.valueAccessor = this;
    this.editable = false;
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

  public ngOnInit(): void {
    super.ngOnInit();
    this._listenActivePicker();
    this._listenKeydown();

    const control = this._ngControl.control;
    const validators = control.validator
      ? [control.validator, this._parseValidator]
      : this._parseValidator;

    control.setValidators(validators);
    control.updateValueAndValidity();
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
    this._cdRef.markForCheck();
  }

  @HostListener('focus')
  public open() {
    if (this._dateDialogRef || this.disabled || this.readonly) {
      return;
    }

    if (this._focusAfterClose) {
      this._focusAfterClose = false;

      return;
    }

    const modelValue = this.value
      || (this._type === 'to' ? this._pickerRef.startDate : this._pickerRef.endDate);

    this._dateDialogRef = this._datepickerFactory.openDatePicker(
      this._elementRef,
      this._injector,
      {
        view: this.view,
        minYear: this.minYear,
        maxYear: this.maxYear,
        minDate: this.minDate,
        maxDate: this.maxDate,
        rangeStart: this._getPickerStartDate() || null,
        components: this._getDefaultComponents(),
        modelValue: modelValue,
        pickerRef: this._pickerRef,
        rangeType: this._type,
        weekStartsOn: this.weekStartsOn,
      },
    );

    this._doFocus();

    this._listenDialogValueChanges();

    this._dateDialogRef.close$
      .pipe(
        take(1),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.closed$.emit();
        this._dateDialogRef = null;
        this._enableInput();

        this._focusAfterClose = true;
        this._doFocus();

        this._cdRef.markForCheck();
      });
  }

  /**
   * Set value which was selected in dialog
   *
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
      value = fromZonedTime(value, this.timezone);
    }

    this.onChange(value);
    this.onTouch(value);
  }

  public updateInput(value) {
    this._elementRef.nativeElement.value = formatDateTime(
      value,
      this.view,
      this.format,
      this.timezone,
    );
  }

  @HostListener('keyup', ['$event', '$event.target.value'])
  public _inputKeyup(event: KeyboardEvent, value: string): void {
    if(event.key === 'Enter') {
      this.inputChange(value);
    }
  }

  @HostListener('input', ['$event.target.value', '$event.target'])
  public _inputChange(value: string): void {
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

    if(!this._dateDialogRef.opened) {

      if (this.ngModelOptions?.updateOn === 'blur')  {
        this.inputChange(value);
      }

      this.updateInput(this.value);
    }
  }

  public registerOnChange(fn) {
    this.onChange = fn;
  }
  public registerOnTouched(fn) {
    this.onTouch = fn;
  }

  public triggerClick(): void {
    this._elementRef.nativeElement.focus();
    this._elementRef.nativeElement.select();

    this.open();
  }

  protected _processInputDate(date: Date | null): Date | null {
    if (!date) {
      return null;
    }

    return createDateFromValue(date, this.timezone);
  }

  protected _getDefaultComponents() {
    if (this.view === 'time') {
      return { timeStart: true };
    }

    return { calendarStart: true, calendarEnd: true };
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
        takeUntil(this.destroy$),
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
      return this._pickerRef.startDate;
    }

    return false;
  }

  /** The form control validator for whether the input parses. */
  protected _parseValidator: ValidatorFn = (): ValidationErrors | null => {
    return this._lastValueValid
      ? null
      : { fsDatepickerParse: 'Invalid Date' };
  };

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

  private _listenActivePicker(): void {
    this._pickerRef.activePicker$
      .pipe(
        filter((pickerType) => {
          return pickerType === this._type;
        }),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        setTimeout(() => {
          this._doFocus();
        });
      });
  }

  private _listenKeydown(): void {
    fromEvent(this.el, 'keydown')
      .pipe(
        tap(() => this.close()),
        filter((event: KeyboardEvent) => ['Tab', 'Enter', 'Escape'].includes(event.key)),
        takeUntil(this.destroy$),
      )
      .subscribe((event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          this.inputChange(this.el.value);
        }

        this.close();
        this.el.blur();
      });
  }

}

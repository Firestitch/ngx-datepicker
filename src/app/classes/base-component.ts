import { Renderer2, HostListener, ElementRef, EventEmitter, Output, OnDestroy, HostBinding, Input, ChangeDetectorRef, Directive } from '@angular/core';

import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { FsDateDialogRef } from './date-dialog-ref';
import {
  AbstractControl,
  ControlValueAccessor,
  ValidationErrors,
  Validator,
  ValidatorFn,
  Validators
} from '@angular/forms';

// import * as parseDate from 'parse-messy-time';
import { isDate, isEqual, isValid } from 'date-fns';

import { parseDate } from '../helpers/parse-date';
import { DateFormat } from '../enums/date-format.enum';


@Directive()
export abstract class FsDatePickerBaseComponent<D = any>
  implements Validator, ControlValueAccessor, OnDestroy {

  abstract updateInput(value: Date);

  @Input()
  public set clear(value: boolean) {
    // const parentNode = this.elementRef.nativeElement.parentNode.parentNode;

    this._clear = value;

    // this._hideClearButton
    //   ? parentNode.classList.add('hide-clear')
    //   : parentNode.classList.remove('hide-clear');
  }

  @Output('change')
  public change$ = new EventEmitter<any>();

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

  public opened = false;
  public registerOnChange(fn: (value: any) => any): void { this._onChange = fn }
  public registerOnTouched(fn: () => any): void { this._onTouch = fn }
  public registerOnValidatorChange(fn: () => void): void { this._validatorOnChange = fn; }

  protected _value;
  protected dialog = null;
  protected elementRef;
  protected renderer;
  protected _dateDialogRef: FsDateDialogRef;
  protected _destroy$ = new Subject();

  private _onChange = (value: any) => { };
  private _onTouch = () => { };
  private _validatorOnChange = () => {};
  private _clear = true;
  private _lastValueValid = false;

  protected constructor(
    renderer: Renderer2,
    elementRef: ElementRef,
    protected _cdRef: ChangeDetectorRef
  ) {
    this.renderer = renderer;
    this.elementRef = elementRef;
  }

  public get clear(): boolean {
    return this._clear;
  }

  public get value() {
    return this._value;
  }

  public set value(value) {
    this._value = value;

    this._lastValueValid = !value || isValid(value);

    this._onChange(this.value);
    this.updateInput(this.value);

    this.change$.emit(this.value);
  }

  public writeValue(obj: any): void {}

  public get dateDialogRef() {
    return this._dateDialogRef;
  }

  public cleared(event) {
    event.stopPropagation();
    event.preventDefault();

    this.value = null;
  }

  public ngOnDestroy() {
    if (this.dateDialogRef) {
      this.dateDialogRef.close();
    }

    this._destroy$.next();
    this._destroy$.complete();
  }

  public setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;

    this._cdRef.markForCheck();
  }

  public validate(c: AbstractControl): ValidationErrors | null {
    return this._validator ? this._validator(c) : null;
  }

  public open() {
    this.renderer.addClass(document.body, 'fs-date-picker-open');
    this.opened = true;
    this._dateDialogRef.value$
      .pipe(
        takeUntil(this._dateDialogRef.close$),
        takeUntil(this._destroy$),
      )
      .subscribe((value) => {
        this.value = value;
      });

    this._dateDialogRef.close$
      .pipe(
        take(1),
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._dateDialogRef = null;
        this.renderer.removeClass(document.body, 'fs-date-picker-open');
        this._cdRef.markForCheck();
      });
  }

  protected updateValue(date): void {
    this._value = date;
    this._onChange(this.value);
    this._onTouch();
    this.change$.emit(this.value);
  }

  protected setReadonly() {
    setTimeout(() => {
      this.elementRef.nativeElement.setAttribute('readonly', true);
    });
  }

  protected close() {
    if (this._dateDialogRef) {
      this._dateDialogRef.close();
    }
  }

  /** The form control validator for whether the input parses. */
  protected _parseValidator: ValidatorFn = (): ValidationErrors | null => {
    return this._lastValueValid
      ? null
      : { fsDatepickerParse: 'Invalid Date' };
  }

  protected _validator: ValidatorFn | null = Validators.compose([this._parseValidator]);

  protected validateDate(date: Date | unknown) {
    this._lastValueValid = !date || isValid(date);
  }


  @HostListener('input', ['$event.target.value'])
  public _inputChange(value: string): void {
    const lastValueWasValid = this._lastValueValid;
    const date = parseDate(value);

    this.validateDate(date)

    if (!isEqual(date, this._value)) {
      this.updateValue(date);
    } else if (lastValueWasValid !== this._lastValueValid) {
      this._validatorOnChange();
    }
  }

  @HostListener('blur')
  public _formatValue() {
    this.updateInput(this.value);
  }
}

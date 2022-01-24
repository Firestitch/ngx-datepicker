import { Renderer2, HostListener, ElementRef, EventEmitter, Output, OnDestroy, HostBinding, Input, ChangeDetectorRef, Directive, OnInit } from '@angular/core';

import { fromEvent, Subject } from 'rxjs';
import { filter, take, takeUntil, tap } from 'rxjs/operators';

import { FsDatePickerDialogRef } from '../../libs/dialog/classes/dialog-ref';

import {
  AbstractControl,
  ControlValueAccessor,
  ValidationErrors,
  Validator,
  ValidatorFn,
  Validators
} from '@angular/forms';

import { isEqual, isValid } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

import { parseDate } from '../helpers/parse-date';


@Directive()
export abstract class FsDatePickerBaseComponent<D = any>
  implements Validator, ControlValueAccessor, OnDestroy, OnInit {

  abstract updateInput(value: Date): void;

  @Input() public ngModelOptions: {
    name?: string;
    standalone?: boolean;
    updateOn?: 'change' | 'blur' | 'submit';
  };

  @Input()
  public set clear(value: boolean) {
    this._clear = value;
  }

  @Input()
  public set timezone(value: string) {
    this._timezone = value;

    this.writeValue(this._originValue);
  }

  @Output('change')
  public change$ = new EventEmitter<Date>();

  @Output('selected')
  public selected$ = new EventEmitter<Date>();

  @Output('blured')
  public blured$ = new EventEmitter<Date>();

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

  protected _timezone: string;
  protected _originValue: Date | null; // before timezone
  protected _value;
  protected dialog = null;
  protected elementRef: ElementRef;
  protected renderer;
  protected _dateDialogRef: FsDatePickerDialogRef;
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

  public ngOnInit(): void {
    fromEvent(this.el, 'focus')
    .pipe(
      takeUntil(this._destroy$),
    )
    .subscribe(() => {
      this.open();
      this.el.focus();
    });

    fromEvent(this.el, 'keydown')
      .pipe(
        tap(() => this.close()),
        filter((event: KeyboardEvent) => ['Tab', 'Enter', 'Escape'].includes(event.key)),
        takeUntil(this._destroy$),
      )
      .subscribe((event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          this.inputChange(this.el.value);
        }

        this.close();
        this.el.blur();
      });
  }

  public get el() {
    return this.elementRef.nativeElement;
  }

  public get clear(): boolean {
    return this._clear;
  }

  public get value() {
    return this._value;
  }

  public get timezone(): string {
    return this._timezone;
  }

  public set value(value) {
    if (value && this.timezone) {
      value = zonedTimeToUtc(value, this.timezone);
    }

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
    this.clearInput();
    this.selected$.next(null);
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
      .subscribe((value: Date) => {
        this.value = value;
        this.selected$.emit(value);
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

  public clearInput() {
    this.elementRef.nativeElement.value = null;
  }

  public triggerClick(): void {
    this.el.focus();
    this.el.select();

    this.open();
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

  @HostListener('blur', ['$event.target.value'])
  public _inputBlur(value: string): void {
    if (this.ngModelOptions?.updateOn === 'blur')  {
      this.inputChange(value);
    }

    this.updateInput(this.value);

    this.blured$.emit(this.value);
  }

  protected inputChange(value: string): void {
    if (!!value) {
      const lastValueWasValid = this._lastValueValid;
      const date = parseDate(value);

      this.validateDate(date)

      if (!isEqual(date, this._value)) {
        this.updateValue(date);
      } else if (lastValueWasValid !== this._lastValueValid) {
        this._validatorOnChange();
      }
    } else {
      this.updateValue(null);
    }
  }
}

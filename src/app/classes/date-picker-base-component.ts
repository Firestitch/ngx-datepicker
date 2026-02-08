import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  ValidationErrors,
  Validator,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { fromEvent } from 'rxjs';
import { filter, take, takeUntil, tap } from 'rxjs/operators';


import { isEqual, isValid } from 'date-fns';
import { fromZonedTime } from 'date-fns-tz';

import { parseDate } from '../helpers/parse-date';

import { FsPickerBaseComponent } from './picker-base-component';


@Directive()
export abstract class FsDatePickerBaseComponent<D = any> extends FsPickerBaseComponent
  implements Validator, ControlValueAccessor, OnDestroy, OnInit {

  @Input() public ngModelOptions: {
    name?: string;
    standalone?: boolean;
    updateOn?: 'change' | 'blur' | 'submit';
  };

  @Input()
  public icon = true;

  @Input()
  public set clear(value: boolean) {
    this._clear = value;
  }

  public get clear(): boolean {
    return this._clear;
  }

  @Input()
  public set timezone(value: string) {
    this._timezone = value;

    this.writeValue(this._originValue);
  }

  public get timezone(): string {
    return this._timezone;
  }

  @Output('change')
  public change$ = new EventEmitter<Date>();

  @Output('selected')
  public selected$ = new EventEmitter<Date>();

  @Output('closed')
  public closed$ = new EventEmitter<void>();

  @Output('blured')
  public blured$ = new EventEmitter<Date>();

  public opened = false;

  protected _timezone: string;
  protected _originValue: Date | null; // before timezone
  protected _value;
  protected _onChange: (value: any) => void;
  protected _onTouch: () => void;
  protected _validator: ValidatorFn | null;

  private _validatorOnChange: () => void;
  private _clear = true;
  private _lastValueValid = false;

  public registerOnChange(fn: (value: any) => any): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: () => any): void {
    this._onTouch = fn;
  }

  public registerOnValidatorChange(fn: () => void): void {
    this._validatorOnChange = fn;
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this._validator = Validators.compose([this._parseValidator]);
    fromEvent(this.el, 'focus')
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        if(!this.value) {
          this.open();
        }

        if (!this.value && this._focusAfterClose) {
          this._focusAfterClose = false;

          return;
        }

        this.open();
        this._doFocus();
      });

    fromEvent(this.el, 'keydown')
      .pipe(
        filter(() => this.editable),
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

  public get value() {
    return this._value;
  }

  public writeValue(obj: any): void {
    //
  }

  public get dateDialogRef() {
    return this._dateDialogRef;
  }

  public cleared(event) {
    event.stopPropagation();
    event.preventDefault();

    this.updateValue(null);
    this.clearInput();
    this.selected$.next(null);
  }

  public ngOnDestroy() {
    super.ngOnDestroy();
    this.close();
  }

  public setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    this._cdRef.markForCheck();
  }

  public validate(c: AbstractControl): ValidationErrors | null {
    return this._validator ? this._validator(c) : null;
  }

  public open() {
    this._renderer.addClass(document.body, 'fs-date-picker-open');
    this.opened = true;

    this._dateDialogRef.value$
      .pipe(
        takeUntil(this._dateDialogRef.close$),
        takeUntil(this.destroy$),
      )
      .subscribe((value: Date) => {
        this.updateValue(value);
        this.selected$.emit(this.value);
      });

    this._dateDialogRef.close$
      .pipe(
        take(1),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this._dateDialogRef = null;
        this._focusAfterClose = true;
        this.opened = false;

        this._renderer.removeClass(document.body, 'fs-date-picker-open');

        this.closed$.emit();
        this._cdRef.markForCheck();
      });
  }

  public clearInput() {
    this.el.value = null;
  }

  public triggerClick(): void {
    this.el.focus();
    this.el.select();

    this.open();
  }

  @HostListener('blur', ['$event.target.value'])
  public _inputBlur(value: string): void {
    if(!this.opened) {
      this.inputChange(value);
      this.updateInput(this.value);
      this.blured$.emit(this.value);
    }
  }

  public inputChange(value: string): void {
    if (value) {
      const lastValueWasValid = this._lastValueValid;
      const date = parseDate(value);

      this.validateDate(date);

      if (!isEqual(date, this._value)) {
        this.updateValue(date);
      } else if (lastValueWasValid !== this._lastValueValid) {
        this._validatorOnChange();
      }
    } else if (this.value != null) {
      this.updateValue(null);
    }
  }

  public updateValue(date): void {
    if (date && this.timezone) {
      date = fromZonedTime(date, this.timezone);
    }

    this._value = date;
    this._lastValueValid = !date || isValid(date);

    this.updateInput(this.value);

    this._onChange(this.value);
    this._onTouch();

    this.change$.emit(this.value);
  }

  /** The form control validator for whether the input parses. */
  protected _parseValidator: ValidatorFn = (): ValidationErrors | null => {
    return this._lastValueValid
      ? null
      : { fsDatepickerParse: 'Invalid Date' };
  };

  protected validateDate(date: Date | undefined) {
    this._lastValueValid = !date || isValid(date);
  }

  public abstract updateInput(value: Date): void;

}

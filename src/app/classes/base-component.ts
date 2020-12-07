import {
  Renderer2,
  HostListener,
  ElementRef,
  EventEmitter,
  Output,
  OnDestroy,
  HostBinding,
  Input,
  Optional,
  ChangeDetectorRef,
} from '@angular/core';
import { MatFormField } from '@angular/material/form-field';

import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { FsDateDialogRef } from './date-dialog-ref';
import { ControlValueAccessor } from '@angular/forms';


export abstract class FsDatePickerBaseComponent implements ControlValueAccessor, OnDestroy {

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

  @HostListener('click')
  @HostListener('focus')
  public inputClick() {
    if (!this.disabled && !this.readonly) {
      this.open();
    }
  }

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
  public _onChange = (value: any) => { };
  public registerOnChange(fn: (value: any) => any): void { this._onChange = fn }
  public registerOnTouched(fn: () => any): void {  }

  protected _value;
  protected dialog = null;
  protected elementRef;
  protected renderer;
  protected _dateDialogRef: FsDateDialogRef;
  protected _destroy$ = new Subject();

  private _clear: boolean = true;

  constructor(
    renderer: Renderer2,
    elementRef: ElementRef,
    protected _cdRef: ChangeDetectorRef,
    @Optional() private _parentFormField: MatFormField,
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
    this._destroy$.next();
    this._destroy$.complete();
  }

  public setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;

    this._cdRef.markForCheck();
  }

  protected open() {
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

  protected close() {
    if (this._dateDialogRef) {
      this._dateDialogRef.close();
    }
  }

  protected setReadonly() {
    setTimeout(() => {
      this.elementRef.nativeElement.setAttribute('readonly', true);
    });
  }
}

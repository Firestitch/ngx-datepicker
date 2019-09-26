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
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatFormField } from '@angular/material';

import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { FsDateDialogRef } from './date-dialog-ref';


export abstract class FsDatePickerBaseComponent implements OnChanges, OnDestroy {

  abstract updateInput(value: Date);

  @Output('change')
  public change$ = new EventEmitter<any>();

  @HostListener('click')
  @HostListener('focus')
  public inputClick() {
    if (!this.disabled && !this.readonly) {
      this.open();
    }
  }


  @Input()
  @HostBinding('class.fs-disabled-input')
  public disabled = false;

  @Input()
  @HostBinding('class.fs-readonly-input')
  public readonly = false;

  /*@HostListener('focus', ['$event'])
  public onFocus($event) {
    setTimeout(() => {
      this.elementRef.nativeElement.blur();
    });
  }*/

  public opened = false;
  public _onChange = (value: any) => { };
  public registerOnChange(fn: (value: any) => any): void { this._onChange = fn }
  public registerOnTouched(fn: () => any): void {  }

  protected dialog = null;
  protected elementRef;
  protected renderer;
  protected _dateDialogRef: FsDateDialogRef;
  protected _destroy$ = new Subject();

  constructor(
    renderer: Renderer2,
    elementRef: ElementRef,
    @Optional() private _parentFormField: MatFormField,
  ) {
    this.renderer = renderer;
    this.elementRef = elementRef;

    this.elementRef.nativeElement.setAttribute('autocomplete', 'off');
  }

  public get dateDialogRef() {
    return this._dateDialogRef;
  }

  public cleared() {
    this.updateValue(null);
  }

  public updateValue(value) {
    this._onChange(value);
    this.updateInput(value);
    this.change$.emit(value);
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.readonly && this._parentFormField) {
      if (this.readonly) {
        this._parentFormField._elementRef.nativeElement.classList.add('fs-readonly-field');
      } else {
        this._parentFormField._elementRef.nativeElement.classList.remove('fs-readonly-field');
      }
    }

    if (changes.disabled && this._parentFormField) {
      if (this.disabled) {
        this._parentFormField._elementRef.nativeElement.classList.add('fs-disabled-field');
      } else {
        this._parentFormField._elementRef.nativeElement.classList.remove('fs-disabled-field');
      }
    }
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
        this.updateValue(value);
      });

    this._dateDialogRef.close$
      .pipe(
        take(1),
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._dateDialogRef = null;
        this.renderer.removeClass(document.body, 'fs-date-picker-open');
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

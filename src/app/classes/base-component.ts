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
  SimpleChanges, ChangeDetectorRef,
} from '@angular/core';
import { MatFormField } from '@angular/material/form-field';

import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { FsDateDialogRef } from './date-dialog-ref';


export abstract class FsDatePickerBaseComponent implements OnDestroy {

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
  public disabled = false;

  @Input()
  public readonly = false;

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
    protected _cdRef: ChangeDetectorRef,
    @Optional() private _parentFormField: MatFormField,
  ) {
    this.renderer = renderer;
    this.elementRef = elementRef;
  }

  public get dateDialogRef() {
    return this._dateDialogRef;
  }

  public cleared(event) {
    event.stopPropagation();
    event.preventDefault();
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

import { Renderer2, HostListener, ElementRef, EventEmitter, Output, OnDestroy, HostBinding } from '@angular/core';
import { Subject } from 'rxjs';
import { FsDateDialogRef } from './date-dialog-ref';
import { take, takeUntil } from 'rxjs/operators';


export abstract class FsDatePickerBaseComponent implements OnDestroy {

  abstract updateInput(value: Date);

  @Output('change')
  public change$ = new EventEmitter<any>();

  @HostListener('click', ['$event'])
  public inputClick(event) {
    this.open();
  }

  @HostListener('focus', ['$event'])
  public onFocus($event) {
    setTimeout(() => {
      this.elementRef.nativeElement.blur();
    });
  }

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
  ) {
    this.renderer = renderer;
    this.elementRef = elementRef;

    this.elementRef.nativeElement.setAttribute('autocomplete', 'off');
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

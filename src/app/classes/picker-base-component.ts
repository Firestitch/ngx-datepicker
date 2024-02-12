import {
  ChangeDetectorRef, Directive, ElementRef, HostBinding,
  Injector, Input, OnChanges, OnInit, Renderer2, SimpleChanges,
} from '@angular/core';

import { FocusMonitor } from '@angular/cdk/a11y';
import { MatInput } from '@angular/material/input';

import { FsDatePickerDialogRef } from '../../libs/dialog/classes/dialog-ref';


@Directive()
export class FsPickerBaseComponent implements OnInit, OnChanges {

  @HostBinding('class.fs-input-disabled')
  public disabled = false;

  @Input()
  @HostBinding('class.fs-input-readonly')
  public readonly = false;

  @HostBinding('class.fs-input-editable')
  @Input()
  public editable = true;

  protected _renderer: Renderer2;
  protected _elementRef: ElementRef;
  protected _dateDialogRef: FsDatePickerDialogRef;
  protected _cdRef: ChangeDetectorRef;
  protected _focusAfterClose = false;

  constructor(
    protected _injector: Injector,
    protected _fm: FocusMonitor,
  ) {
    this._renderer = _injector.get(Renderer2);
    this._cdRef = _injector.get(ChangeDetectorRef);
    this._elementRef = _injector.get(ElementRef);
    this._elementRef.nativeElement.setAttribute('autocomplete', 'off');
  }

  public get matInput(): MatInput {
    return this._injector.get(MatInput);
  }

  public get el(): any {
    return this._elementRef.nativeElement;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.editable) {
      this.matInput.readonly = !changes.editable.currentValue;
    }
  }

  public ngOnInit(): void {
    if (!this.editable) {
      this.matInput.readonly = true;
    }
  }

  protected _doFocus(): void {
    this._fm.focusVia(this._elementRef, 'program');
  }

  protected close() {
    if (this._dateDialogRef) {
      this._dateDialogRef.close();
    }
  }

}

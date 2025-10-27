import {
  ChangeDetectorRef, Directive, ElementRef, HostBinding, inject,
  Injector, Input, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges,
} from '@angular/core';

import { FocusMonitor } from '@angular/cdk/a11y';
import { MatInput } from '@angular/material/input';
  

import { Observable, Subject } from 'rxjs';

import { WeekDays } from '../../libs/common/types/week-days.type';
import { FsDatePickerDialogRef } from '../../libs/dialog/classes/dialog-ref';
import { IFsDatePickerConfig } from '../interfaces/datepicker-config.interface';
import { FS_DATEPICKER_CONFIG } from '../providers/datepicker-config.provider';


@Directive()
export class FsPickerBaseComponent implements OnInit, OnChanges, OnDestroy {

  @HostBinding('class.fs-input-disabled')
  public disabled = false;

  @Input()
  @HostBinding('class.fs-input-readonly')
  public readonly = false;

  @HostBinding('class.fs-input-editable')
  @Input()
  public editable = true;

  @Input()
  public weekStartsOn: WeekDays;

  protected _renderer: Renderer2;
  protected _elementRef: ElementRef;
  protected readonly _globalConfig: IFsDatePickerConfig;
  protected _dateDialogRef: FsDatePickerDialogRef;
  protected _cdRef: ChangeDetectorRef;
  protected _focusAfterClose = false;
  protected _fm = inject(FocusMonitor);
  protected _injector = inject(Injector);

  private _destroy$ = new Subject<void>();

  constructor(
  ) {
    this._renderer = this._injector.get(Renderer2);
    this._cdRef = this._injector.get(ChangeDetectorRef);
    this._elementRef = this. _injector.get(ElementRef);
    this._globalConfig = this._injector.get(FS_DATEPICKER_CONFIG);
    this._elementRef.nativeElement.setAttribute('autocomplete', 'off');
  }

  public get destroy$(): Observable<void> {
    return this._destroy$.asObservable();
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

    this._init();
  }

  public ngOnDestroy() {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  protected _doFocus(): void {
    this._fm.focusVia(this._elementRef, 'program');
  }

  protected close() {
    if (this._dateDialogRef) {
      this._dateDialogRef.close();
    }
  }

  protected _init(): void {
    this.weekStartsOn = this.weekStartsOn ?? this._globalConfig.weekStartsOn;
  }
}

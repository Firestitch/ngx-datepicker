import {
  AfterViewInit,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnDestroy,
  Output, Provider,
  Renderer2,
  ViewContainerRef,
  Component,
  Injector,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { take, takeUntil } from 'rxjs/operators';

import { FsPreset } from '../../interfaces/fspreset.interface';
import { FsDatepickerFactory } from '../../services/factory.service';
import { FsDatePickerBaseComponent } from '../../classes/base-component';
import { createDateFromValue } from '../../helpers/create-date-from-value';
import { formatDateTime } from '../../helpers/format-date-time';


export const DATEPICKER_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FsDatePickerComponent),
  multi: true
};

@Component({
  selector: '[fsDatePicker]',
  template: '<fs-clear [show]="ngModel" (clear)="cleared()"></fs-clear>',
  providers: [DATEPICKER_VALUE_ACCESSOR]
})
export class FsDatePickerComponent extends FsDatePickerBaseComponent implements AfterViewInit, OnDestroy {

  @Input() public minYear = null;
  @Input() public ngModel = null;
  @Input() public maxYear = null;
  @Input() public minDate = null;
  @Input() public maxDate = null;
  @Input() public view = 'date';
  @Input() public presets: FsPreset[] = [];

  private _hideClearButton: boolean = null;
  @Input() public set hideClearButton(value: boolean) {
    const parentNode = this.elementRef.nativeElement.parentNode.parentNode;

    this._hideClearButton = value;

    this._hideClearButton
      ? parentNode.classList.add('hide-clear')
      : parentNode.classList.remove('hide-clear');
  }
  public get hideClearButton(): boolean {
    return this._hideClearButton;
  }

  @Output('change') change$ = new EventEmitter<any>();

  _onChange = (value: any) => { };

  registerOnChange(fn: (value: any) => any): void { this._onChange = fn }
  registerOnTouched(fn: () => any): void {  }

  constructor(
    protected renderer: Renderer2,
    protected injector: Injector,
    @Inject(ElementRef) protected elementRef: ElementRef,
    @Inject(ViewContainerRef) private viewContainerRef,
    protected fsDatepickerFactory: FsDatepickerFactory,
  ) {
    super(renderer, elementRef);
  }

  public ngAfterViewInit() {
    this.setReadonly();
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();

    // What does this do?
    // As I know otherwise, when you leave page with datepicker - dialog still in the DOM
    // and appears memory leaks
    if (this.dialog && this.dialog.instance.element.nativeElement.parentNode) {
      this.dialog.instance.element.nativeElement.parentNode.removeChild(this.dialog.instance.element.nativeElement);
    }
  }

  public writeValue(value: any): void {
    this.ngModel = createDateFromValue(value);
    this.updateInput(value);
  }

  public cleared() {
    this.updateValue(null);
  }

  public getModelValue() {
    return this.ngModel;
  }

  public updateValue(value) {
    this._onChange(value);
    this.updateInput(value);
    this.change$.emit(value);
  }

  private updateInput(value) {
    this.elementRef.nativeElement.value = formatDateTime(value, this.view);
  }

  protected open() {
    super.open();

    if (this._dateDialogRef) {
      return;
    }

    this._dateDialogRef = this.fsDatepickerFactory.openDatePicker(
      this.elementRef,
      this.injector,
      {
        elementRef: this.elementRef,
        parentDirective: this,
        view: this.view,
        minYear: this.minYear,
        maxYear: this.maxYear,
        minDate: this.minDate,
        maxDate: this.maxDate,
        presets: this.presets,
        dateMode: 'date',
        components: this._getDefaultComponents(),
      }
    );

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
      });
  }

  private _getDefaultComponents() {
    if (this.view === 'time') {
      return { timeStart: true };
    } else {
      return { calendarStart: true };
    }
  }

}

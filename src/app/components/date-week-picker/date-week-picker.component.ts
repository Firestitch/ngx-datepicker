import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Injector,
  Input,
  Optional,
  Output,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { FsDatepickerFactory } from '../../services/factory.service';
import { FsDatePickerBaseComponent } from '../../classes/base-component';
import { DateFormat } from '../../enums/date-format.enum';
import { MatFormField } from '@angular/material/form-field';
import { isDate, format } from 'date-fns';


@Component({
  selector: '[fsDateWeekPicker]',
  template: '<fs-clear [show]="ngModel && !disabled && !readonly && !dateDialogRef" (clear)="cleared($event)"></fs-clear>',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FsDateWeekPickerComponent),
    multi: true
  }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsDateWeekPickerComponent extends FsDatePickerBaseComponent implements AfterViewInit {

  @Input() public minYear = null;
  @Input() public ngModel = null;
  @Input() public maxYear = null;
  @Input() public minDate = null;
  @Input() public maxDate = null;
  @Input() public seedDate = null;
  @Input() public periodWeeks = 1;
  @Input() public view = DateFormat.Date;
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

  @Output('change')
  public change$ = new EventEmitter<any>();

  private _hideClearButton: boolean = null;

  constructor(
    protected renderer: Renderer2,
    protected injector: Injector,
    @Inject(ElementRef) protected elementRef: ElementRef,
    protected _cdRef: ChangeDetectorRef,
    @Inject(ViewContainerRef) private viewContainerRef,
    protected fsDatepickerFactory: FsDatepickerFactory,
    @Optional() _parentFormField: MatFormField,
  ) {
    super(renderer, elementRef, _cdRef, _parentFormField);
  }

  public ngAfterViewInit() {
    this.setReadonly();
  }

  public writeValue(value: any): void {
    this.ngModel = value;
    this.updateInput(value);

    this._cdRef.markForCheck();
  }

  public updateInput(value) {
    if (value && isDate(value.from) && isDate(value.to)) {
      if (value.from.getFullYear() == value.to.getFullYear()) {
        const from = format(value.from, 'MMM d');
        const to = format(value.to, 'MMM d yyyy');
        this.elementRef.nativeElement.value = `#${value.period}: ${from} - ${to}`;
      } else {
        const from = format(value.from, 'MMM d yyyy');
        const to = format(value.to, 'MMM d yyyy');
        this.elementRef.nativeElement.value = `#${value.period}: ${from} - ${to}`;
      }
    } else {
      this.elementRef.nativeElement.value = '';
    }
  }

  protected open() {

    if (this._dateDialogRef) {
      return;
    }

    this._dateDialogRef = this.fsDatepickerFactory.openDatePicker(
      this.elementRef,
      this.injector,
      {
        elementRef: this.elementRef,
        modelValue: this.ngModel,
        view: this.view,
        minYear: this.minYear,
        maxYear: this.maxYear,
        minDate: this.minDate,
        maxDate: this.maxDate,
        dateMode: 'week',
        components: this._getDefaultComponents(),
        parentComponent: this,
        seedDate: this.seedDate,
        periodWeeks: this.periodWeeks,
      }
    );

    super.open();
  }

  private _getDefaultComponents() {
    if (this.view === 'time') {
      return { timeStart: true };
    } else {
      return { calendarStart: true };
    }
  }
}

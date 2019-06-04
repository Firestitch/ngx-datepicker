import {
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Provider,
  Renderer2,
  ViewContainerRef,
  Component,
  Injector,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';

import { FsDatePickerCommon } from '../../services/common.service';
import { FsDatePickerBaseComponent } from '../../classes/base-component';
import { FsDatepickerFactory } from '../../services/factory.service';


export const DATEPICKER_RANGE_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FsDatePickerRangeComponent),
  multi: true
};


@Component({
  selector: '[fsDatePickerRange]',
  template: '<fs-clear [show]="ngModel" (clear)="cleared()"></fs-clear>',
  providers: [DATEPICKER_RANGE_VALUE_ACCESSOR, NgModel]
})
export class FsDatePickerRangeComponent extends FsDatePickerBaseComponent implements OnInit, OnChanges, OnDestroy {

  @Input() public ngModel = null;
  @Input() public minYear = null;
  @Input() public maxYear = null;
  @Input() public view = 'date';
  @Input() public ngModelStart = null;
  @Input() public ngModelEnd = null;
  @Input() public minDate = null;
  @Input() public maxDate = null;

  @Output() public ngModelStartChange = new EventEmitter<any>();
  @Output() public ngModelEndChange = new EventEmitter<any>();
  @Output('change') public change$ = new EventEmitter<any>();


  _onChange = (value: any) => { };

  registerOnChange(fn: (value: any) => any): void { this._onChange = fn }
  registerOnTouched(fn: () => any): void {  }

  constructor(
    @Inject(ElementRef) protected elementRef: ElementRef,
    @Inject(ViewContainerRef) private viewContainerRef,
    protected fsDatePickerCommon: FsDatePickerCommon,
    protected fsDatepickerFactory: FsDatepickerFactory,
    protected injector: Injector,
    protected renderer: Renderer2
  ) {
    super(renderer, elementRef, fsDatePickerCommon);
  }

  public ngOnInit() {
    // This seems a bit scary
    const formField = this.elementRef.nativeElement.parentElement.parentElement.parentElement.parentElement;

    if (formField.className.match(/mat-form-field/)) {
      this.renderer.addClass(formField, `fs-date-picker-${this.view}-range-field`);
    }
  }

  public cleared() {
    this.updateValue(null, null);
  }

  public ngOnChanges(changes) {

    if (!changes) {
      return;
    }

    if (changes.ngModelStart || changes.ngModelEnd) {

      this.ngModelStart = this.fsDatePickerCommon.createDate(this.ngModelStart);
      this.ngModelEnd = this.fsDatePickerCommon.createDate(this.ngModelEnd);
      this.ngModel = this.getModelValue();

      this.elementRef.nativeElement.value = this.fsDatePickerCommon.formatDateTimeRange(this.ngModel, this.view);
    }
  }

  public ngOnDestroy() {
    if (this.dialog && this.dialog.instance.element.nativeElement.parentNode) {
      this.dialog.instance.element.nativeElement.parentNode.removeChild(this.dialog.instance.element.nativeElement);
    }
  }

  public writeValue(value): void {}

  private getModelValue() {
    return this.ngModelStart || this.ngModelEnd ? { start: this.ngModelStart, end: this.ngModelEnd } : null;
  }

  public updateValue(startDate, endDate) {

    this.ngModelStart = startDate;
    this.ngModelEnd = endDate;
    this.ngModel = this.getModelValue();

    this.change$.emit(this.ngModel);
    this.ngModelStartChange.emit(startDate);
    this.ngModelEndChange.emit(endDate);

    this._onChange(this.ngModel);
  }

  protected open() {
    super.open();

    if (this.dialog) {
      return;
    }


    this.fsDatepickerFactory.openDateRangePicker(
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
        dateMode: { start: 'date', end: 'date' },
        components: this._getDefaultComponents(),
      }
    );
  }

  private _getDefaultComponents() {
    if (this.view === 'time') {
      return { timeStart: true };
    } else {
      return { calendarStart: true, calendarEnd: true };
    }
  }
}

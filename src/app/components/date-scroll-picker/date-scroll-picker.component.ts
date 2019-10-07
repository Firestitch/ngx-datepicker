import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Inject,
  Injector,
  Input,
  Optional,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormField } from '@angular/material';

import { FsDatepickerFactory } from '../../services/factory.service';
import { FsDatePickerBaseComponent } from '../../classes/base-component';
import { createDateFromValue } from '../../helpers/create-date-from-value';
import { formatDateTime } from '../../helpers/format-date-time';
import { DateFormat } from '../../enums/date-format.enum';


@Component({
  selector: '[fsDateScrollPicker]',
  template: '<fs-clear [show]="ngModel && !disabled && !readonly && !dateDialogRef" (clear)="cleared()"></fs-clear>',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FsDateScrollPickerComponent),
    multi: true
  }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsDateScrollPickerComponent extends FsDatePickerBaseComponent
        implements AfterViewInit, ControlValueAccessor {

  @Input() public minYear = (new Date()).getFullYear() - 50;
  @Input() public maxYear = (new Date()).getFullYear() + 50;
  @Input() public showMonth = true;
  @Input() public showYear = true;
  @Input() public showDay = true;
  @Input() public ngModel = null;

  constructor(
    protected renderer: Renderer2,
    protected injector: Injector,
    @Inject(ElementRef) protected elementRef: ElementRef,
    protected _datepickerFactory: FsDatepickerFactory,
    protected _cdRef: ChangeDetectorRef,
    @Inject(ViewContainerRef) private viewContainerRef,
    @Optional() _parentFormField: MatFormField,
  ) {
    super(renderer, elementRef, _cdRef, _parentFormField);
  }

  public ngAfterViewInit() {
    this.setReadonly();
  }

  public writeValue(value: any): void {
    this.ngModel = createDateFromValue(value);
    this.updateInput(value);
  }

  public updateInput(value) {

    let format = DateFormat.Date;

    if (this.showYear && this.showMonth && !this.showDay) {
      format = DateFormat.MonthYear;

    } else if (!this.showYear && this.showMonth && this.showDay) {
      format = DateFormat.MonthDay;

    } else if (!this.showYear && this.showMonth && !this.showDay) {
      format = DateFormat.Month;

    } else if (this.showYear && !this.showMonth && !this.showDay) {
      format = DateFormat.Year;
    }

    this.elementRef.nativeElement.value = formatDateTime(value, format);
  }

  protected open() {

    if (this._dateDialogRef || this.disabled || this.readonly) {
      return;
    }

    this._dateDialogRef = this._datepickerFactory.openDateScrollPicker(
      this.elementRef,
      this.injector,
      {
        elementRef: this.elementRef,
        modelValue: this.ngModel,
        minYear: this.minYear,
        maxYear: this.maxYear,
        showMonth: this.showMonth,
        showDay: this.showDay,
        showYear: this.showYear,
        dateMode: 'date',
        parentComponent: this
      }
    );

    super.open();
  }
}

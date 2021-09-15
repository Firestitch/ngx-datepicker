import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef, HostListener,
  Inject,
  Injector,
  Input,
  Renderer2,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { FsDatePickerDialogFactory } from '@libs/dialog/services/dialog-factory.service';

import { FsDatePickerBaseComponent } from '../../classes/base-component';
import { createDateFromValue } from '../../helpers/create-date-from-value';
import { formatDateTime } from '../../helpers/format-date-time';
import { DateFormat } from '../../enums/date-format.enum';
import { FsDatePickerComponent } from '../date-picker/date-picker.component';


@Component({
  selector: '[fsDateScrollPicker]',
  template: FsDatePickerComponent.template,
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
  @Input() public maxDate;
  @Input() public showMonth = true;
  @Input() public showYear = true;
  @Input() public showDay = true;

  public view = DateFormat.Date;

  constructor(
    protected renderer: Renderer2,
    protected injector: Injector,
    @Inject(ElementRef) protected elementRef: ElementRef,
    protected _datepickerFactory: FsDatePickerDialogFactory,
    protected _cdRef: ChangeDetectorRef,
  ) {
    super(renderer, elementRef, _cdRef);
  }

  public ngAfterViewInit() {
    this.setReadonly();
  }

  public writeValue(value: any): void {
    this._value = createDateFromValue(value);
    this.validateDate(this.value);
    this.updateInput(value);

    this._cdRef.markForCheck();
  }

  @HostListener('click')
  @HostListener('focus')
  public inputClick() {
    if (!this.disabled && !this.readonly) {
      this.open();
    }
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

  public open() {

    if (this._dateDialogRef || this.disabled || this.readonly) {
      return;
    }

    this._dateDialogRef = this._datepickerFactory.openDateScrollPicker(
      this.elementRef,
      this.injector,
      {
        elementRef: this.elementRef,
        modelValue: this.value,
        minYear: this.minYear,
        maxYear: this.maxYear,
        maxDate: this.maxDate,
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

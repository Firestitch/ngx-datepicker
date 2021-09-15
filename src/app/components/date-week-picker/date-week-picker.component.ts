import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Inject,
  Injector,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { FsDatePickerDialogFactory } from '@libs/dialog/services/dialog-factory.service';

import { FsDatePickerBaseComponent } from '../../classes/base-component';
import { DateFormat } from '../../enums/date-format.enum';
import { isDate, format } from 'date-fns';
import { FsDatePickerComponent } from '../date-picker/date-picker.component';


@Component({
  selector: '[fsDateWeekPicker]',
  template: FsDatePickerComponent.template,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FsDateWeekPickerComponent),
    multi: true
  }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsDateWeekPickerComponent extends FsDatePickerBaseComponent implements AfterViewInit {

  @Input() public minYear = null;
  @Input() public maxYear = null;
  @Input() public minDate = null;
  @Input() public maxDate = null;
  @Input() public seedDate = null;
  @Input() public periodWeeks = 1;
  @Input() public view = DateFormat.Date;

  @Output('change')
  public change$ = new EventEmitter<any>();

  constructor(
    protected renderer: Renderer2,
    protected injector: Injector,
    @Inject(ElementRef) protected elementRef: ElementRef,
    protected _cdRef: ChangeDetectorRef,
    protected fsDatepickerFactory: FsDatePickerDialogFactory,
  ) {
    super(renderer, elementRef, _cdRef);
  }

  @HostListener('click')
  @HostListener('focus')
  public inputClick() {
    if (!this.disabled && !this.readonly) {
      this.open();
    }
  }

  public ngAfterViewInit() {
    this.setReadonly();
  }

  public writeValue(value: any): void {
    this._value = value;
    this.validateDate(this.value);
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

  public open() {

    if (this._dateDialogRef) {
      return;
    }

    this._dateDialogRef = this.fsDatepickerFactory.openDatePicker(
      this.elementRef,
      this.injector,
      {
        elementRef: this.elementRef,
        modelValue: this.value,
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

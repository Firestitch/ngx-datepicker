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

import { FsDatePickerDialogFactory } from '../../../libs/dialog/services/dialog-factory.service';
import { PickerViewType } from '../../../libs/common/enums/picker-view-type.enum';
import { IDatePickerPeriod } from '../../../libs/common/interfaces/period.interface';
import { formatPeriodObject } from '../../../libs/common/helpers/format-period-object';
import { FsDatePickerBaseComponent } from '../../classes/base-component';
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
  @Input() public period = 1;
  @Input() public view = PickerViewType.Week;

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

  public writeValue(value: IDatePickerPeriod): void {
    this._value = value;
    this.validateDate(this.value);
    this.updateInput(value);

    this._cdRef.markForCheck();
  }

  public updateInput(value) {
    this.elementRef.nativeElement.value = formatPeriodObject(value);
  }

  public open() {
    if (this._dateDialogRef) {
      return;
    }

    this._dateDialogRef = this.fsDatepickerFactory.openDatePicker(
      this.elementRef,
      this.injector,
      {
        modelValue: this.value,
        view: this.view,
        minYear: this.minYear,
        maxYear: this.maxYear,
        minDate: this.minDate,
        maxDate: this.maxDate,
        components: this._getDefaultComponents(),
        seedDate: this.seedDate,
        periodWeeks: this.period,
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

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
  Output,
  Renderer2,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { FsDatepickerFactory } from '../../services/factory.service';
import { FsDatePickerBaseComponent } from '../../classes/base-component';
import { createDateFromValue } from '../../helpers/create-date-from-value';
import { formatDateTime } from '../../helpers/format-date-time';
import { DateFormat } from '../../enums/date-format.enum';


@Component({
  selector: '[fsDatePicker]',
  template: FsDatePickerComponent.template,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FsDatePickerComponent),
    multi: true
  }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsDatePickerComponent extends FsDatePickerBaseComponent implements AfterViewInit {

  static template = '<fs-clear [show]="value && !disabled && !readonly && clear" (clear)="cleared($event)"></fs-clear>';

  @Input() public minYear = null;
  @Input() public maxYear = null;
  @Input() public minDate = null;
  @Input() public maxDate = null;
  @Input() public startOfDay = true;
  @Input() public view = DateFormat.Date;
  @Input() public format;
  @Input() public minutes = true;

  @Output('change')
  public change$ = new EventEmitter<any>();

  constructor(
    protected renderer: Renderer2,
    protected injector: Injector,
    @Inject(ElementRef) protected elementRef: ElementRef,
    protected _cdRef: ChangeDetectorRef,
    protected fsDatepickerFactory: FsDatepickerFactory,
  ) {
    super(renderer, elementRef, _cdRef);
  }

  public ngAfterViewInit() {
    this.setReadonly();
  }

  public writeValue(value: any): void {
    this._value = createDateFromValue(value);
    this.updateInput(value);

    this._cdRef.markForCheck();
  }

  public updateInput(value) {
    if (!this.minutes && value) {
      value.setMinutes(0);
    }
    this.elementRef.nativeElement.value = formatDateTime(value, this.view, this.format);
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
        modelValue: this.value,
        view: this.view,
        minutes: this.minutes,
        minYear: this.minYear,
        maxYear: this.maxYear,
        minDate: this.minDate,
        maxDate: this.maxDate,
        startOfDay: this.startOfDay,
        dateMode: 'date',
        components: this._getDefaultComponents(),
        parentComponent: this
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

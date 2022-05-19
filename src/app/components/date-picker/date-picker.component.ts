import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  Output,
} from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

import { isValid } from 'date-fns';

import { PickerViewType } from '../../../libs/common/enums/picker-view-type.enum';
import { FsDatePickerDialogFactory } from '../../../libs/dialog/services/dialog-factory.service';
import { FsDatePickerBaseComponent } from '../../classes/date-picker-base-component';
import { createDateFromValue } from '../../helpers/create-date-from-value';
import { formatDateTime } from '../../helpers/format-date-time';


@Component({
  selector: '[fsDatePicker]',
  template: FsDatePickerComponent.template,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FsDatePickerComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FsDatePickerComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsDatePickerComponent extends FsDatePickerBaseComponent {

  static template = `
    <fs-clear [show]="value && !disabled && !readonly && clear" (clear)="cleared($event)"></fs-clear>
    <fs-datepicker-trigger (click)="triggerClick()" [disabled]="disabled || readonly" [view]="view"></fs-datepicker-trigger>
  `;

  @Input() public minYear = null;
  @Input() public maxYear = null;
  @Input() public minDate = null;
  @Input() public maxDate = null;
  @Input() public startOfDay = true;
  @Input() public view = PickerViewType.Date;
  @Input() public format: string;
  @Input() public minutes = true;

  @Output('change')
  public change$ = new EventEmitter<any>();

  constructor(
    protected _injector: Injector,
    protected _fsDatepickerFactory: FsDatePickerDialogFactory,
  ) {
    super(_injector);
  }

  public writeValue(value: any): void {
    this._originValue = value;
    this._value = createDateFromValue(value, this.timezone);
    this.validateDate(this.value);
    this.updateInput(this.value);

    this._cdRef.markForCheck();
  }

  public updateInput(value) {
    if (!this.minutes && value) {
      value.setMinutes(0);
    }

    this._elementRef.nativeElement.value = formatDateTime(value, this.view, this.format, this.timezone);
  }

  public open() {
    if (this.disabled || this.readonly || this._dateDialogRef) {
      return;
    }

    const modelValue = isValid(this.value) ? this.value : null;

    this._dateDialogRef = this._fsDatepickerFactory.openDatePicker(
    this._elementRef,
    this._injector,
    {
      modelValue: modelValue,
      view: this.view,
      minutes: this.minutes,
      minYear: this.minYear,
      maxYear: this.maxYear,
      minDate: this.minDate,
      maxDate: this.maxDate,
      startOfDay: this.startOfDay,
      components: this._getDefaultComponents(),
    });

    super.open();
  }

  protected updateValue(value) {
    if (this.view === PickerViewType.Time && isValid(this._value) && isValid(value)) {
      this._value.setHours(value.getHours());
      this._value.setMinutes(value.getMinutes());
      this._value.setSeconds(value.getSeconds());

      value = new Date(this._value);
    }

    super.updateValue(value);
  }

  private _getDefaultComponents() {
    if (this.view === 'time') {
      return { timeStart: true };
    } else {
      return { calendarStart: true };
    }
  }
}

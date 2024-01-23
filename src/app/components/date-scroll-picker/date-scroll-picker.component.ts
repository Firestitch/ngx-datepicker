import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Injector,
  Input,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { FocusMonitor } from '@angular/cdk/a11y';

import { isValid, startOfDay } from 'date-fns';

import { ScrollPickerViewType } from '../../../libs/common/enums/scroll-picker-view-type.enum';
import { FsDatePickerDialogFactory } from '../../../libs/dialog/services/dialog-factory.service';
import { FsDatePickerBaseComponent } from '../../classes/date-picker-base-component';
import { createDateFromValue } from '../../helpers/create-date-from-value';
import { formatDateTime } from '../../helpers/format-date-time';
import { FsDatePickerComponent } from '../date-picker/date-picker.component';

@Component({
  selector: '[fsDateScrollPicker]',
  template: FsDatePickerComponent.template,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FsDateScrollPickerComponent),
    multi: true,
  }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsDateScrollPickerComponent extends FsDatePickerBaseComponent
  implements ControlValueAccessor, OnInit {

  @Input() public minYear;
  @Input() public maxYear;
  @Input() public minDate;
  @Input() public maxDate;
  @Input() public showMonth = true;
  @Input() public showYear = true;
  @Input() public showDay = true;

  public view = ScrollPickerViewType.Date;

  constructor(
    protected _injector: Injector,
    protected _datepickerFactory: FsDatePickerDialogFactory,
    fm: FocusMonitor,
  ) {
    super(_injector, fm);
  }

  public ngOnInit(): void {
    super.ngOnInit();

    if(!this.minYear) {
      this.minYear = (new Date()).getFullYear() - 50;
    }

    if(!this.maxYear) {
      this.maxYear = (new Date()).getFullYear() + 50;
    }
  }

  public writeValue(value: any): void {
    this._originValue = value;
    this._value = createDateFromValue(value, this.timezone);
    this.validateDate(this.value);
    this.updateInput(value);

    this._cdRef.markForCheck();
  }

  public updateInput(value) {
    let format = ScrollPickerViewType.Date;

    if (this.showYear && this.showMonth && !this.showDay) {
      format = ScrollPickerViewType.MonthYear;

    } else if (!this.showYear && this.showMonth && this.showDay) {
      format = ScrollPickerViewType.MonthDay;

    } else if (!this.showYear && this.showMonth && !this.showDay) {
      format = ScrollPickerViewType.Month;

    } else if (this.showYear && !this.showMonth && !this.showDay) {
      format = ScrollPickerViewType.Year;
    }

    this.el.value = formatDateTime(value, format);
  }

  public open() {
    if (this._dateDialogRef || this.disabled || this.readonly) {
      return;
    }

    this._dateDialogRef = this._datepickerFactory.openDateScrollPicker(
      this._elementRef,
      this._injector,
      {
        modelValue: this.value,
        minYear: this.minYear,
        maxYear: this.maxYear,
        minDate: this.minDate,
        maxDate: this.maxDate,
        showMonth: this.showMonth,
        showDay: this.showDay,
        showYear: this.showYear,
        view: this.view,
      },
    );

    super.open();
  }

  protected updateValue(date: Date | null): void {
    if (isValid(date)) {
      date = startOfDay(date);
    }

    super.updateValue(date);
  }
}

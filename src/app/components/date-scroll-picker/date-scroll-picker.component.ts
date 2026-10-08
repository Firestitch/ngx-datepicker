
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';


import { FsClearModule } from '@firestitch/clear';

import { isAfter, isBefore, isToday, isValid, startOfDay } from 'date-fns';

import { ScrollPickerViewType } from '../../../libs/common/enums/scroll-picker-view-type.enum';
import { FsDatePickerDialogFactory } from '../../../libs/dialog/services/dialog-factory.service';
import { FsDatePickerBaseComponent } from '../../classes/date-picker-base-component';
import { createDateFromValue } from '../../helpers/create-date-from-value';
import { formatDateTime } from '../../helpers/format-date-time';
import { FsDatePickerTriggerComponent } from '../date-picker-trigger/date-picker-trigger.component';
import { FsDatePickerComponent } from '../date-picker/date-picker.component';

@Component({
  selector: '[fsDateScrollPicker]',
  template: FsDatePickerComponent.template,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FsDateScrollPickerComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FsDateScrollPickerComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FsClearModule,
    FsDatePickerTriggerComponent,
  ],
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

  @Input() public width = '120px';

  public view = ScrollPickerViewType.Date;

  private _datepickerFactory = inject(FsDatePickerDialogFactory);

  public ngOnInit(): void {
    super.ngOnInit();

    if(!this.minYear) {
      this.minYear = (new Date()).getFullYear() - 50;
    }

    if(!this.maxYear) {
      this.maxYear = (new Date()).getFullYear() + 50;
    }

    this._validator = Validators.compose([this._parseValidator, this._rangeValidator]);
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

  public updateValue(date: Date | null): void {
    if (isValid(date)) {
      date = startOfDay(date);
    }

    super.updateValue(date);
  }

  /**
   * The wheel never offers a day outside minDate / maxDate, but a typed date skips the wheel,
   * so the form control holds it to the same bounds.
   */
  protected _rangeValidator: ValidatorFn = (): ValidationErrors | null => {
    if (!isValid(this.value)) {
      return null;
    }

    if (this.maxDate && isAfter(this.value, startOfDay(this.maxDate))) {
      return {
        fsDatepickerMax: isToday(this.maxDate)
          ? 'Cannot be in the future'
          : `Must be on or before ${formatDateTime(this.maxDate)}`,
      };
    }

    if (this.minDate && isBefore(this.value, startOfDay(this.minDate))) {
      return {
        fsDatepickerMin: isToday(this.minDate)
          ? 'Cannot be in the past'
          : `Must be on or after ${formatDateTime(this.minDate)}`,
      };
    }

    return null;
  };
}

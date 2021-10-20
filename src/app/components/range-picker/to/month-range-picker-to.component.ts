import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { zonedTimeToUtc } from 'date-fns-tz';
import { endOfDay } from 'date-fns';

import { PickerViewType } from '../../../../libs/common/enums/picker-view-type.enum';

import { FsDatePickerComponent } from '../../date-picker/date-picker.component';
import { RangePickerToComponent } from '../base/range-picker-to.component';


@Component({
  selector: '[fsMonthRangeTo],[fsMonthRangeToPicker]',
  template: FsDatePickerComponent.template,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthRangePickerToComponent extends RangePickerToComponent {

  @Input() set fsMonthRangeTo(value) {
    this._name = value;
  }

  @Input() set fsMonthRangeToPicker(value) {
    this._name = value;
  }

  public view = PickerViewType.MonthRange;

  private _skipUpdateValue = false;

  public updateValue(value: Date) {
    value = endOfDay(value);

    this._value = value;
    this.updateInput(this._value);

    if (value && this.timezone) {
      value = zonedTimeToUtc(value, this.timezone);
    }

    this.onChange(value);
    this.onTouch(value);
  }

  protected _tzChanged(originDate: Date | null) {
    this._skipUpdateValue = true;

    super._tzChanged(originDate);
  }

  protected _processInputDate(date: Date | null): Date | null {
    date = endOfDay(date);

    return super._processInputDate(date);
  }

  /**
   * When it's month range picker - we have to listen changes over rangePickerRef
   */
  protected _listenDialogValueChanges() {
    // NOOP
  }

  protected _subscribeToPickerRefUpdates() {
    this._pickerRefUpdates$(this._pickerRef.endDate$)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((newValue: Date | null) => {
        if (this._skipUpdateValue) {
          this._skipUpdateValue = false;
          return;
        }

        this.updateValue(newValue);

        this._ngControl.control.markAsDirty();
        this._ngControl.control.updateValueAndValidity();
        this._cdRef.markForCheck();
      });
  }
}

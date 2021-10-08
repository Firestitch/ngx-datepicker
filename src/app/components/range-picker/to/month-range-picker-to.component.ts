import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

import { PickerViewType } from '@libs/common/enums/picker-view-type.enum';

import { endOfDay } from 'date-fns';

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

  public updateValue(value: Date) {
    value = endOfDay(value);

    this._value = value;

    this.writeValue(this._value);

    this.onChange(value);
    this.onTouch(value);
  }

  /**
   * When it's month range picker - we have to listen changes over rangePickerRef
   */
  protected _listenDialogValueChanges() {
    // NOOP
  }

  protected _subscribeToPickerRefUpdates() {
    this._pickerRefUpdates$(this._pickerRef.endDate$)
      .subscribe((newValue: Date | null) => {
        this.updateValue(newValue);

        this._ngControl.control.markAsDirty();
        this._ngControl.control.updateValueAndValidity();
        this._cdRef.markForCheck();
      });
  }
}

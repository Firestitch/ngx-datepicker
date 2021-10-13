import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { startOfDay } from 'date-fns';

import { PickerViewType } from '@libs/common/enums/picker-view-type.enum';

import { FsDatePickerComponent } from '../../date-picker/date-picker.component';
import { RangePickerFromComponent } from '../base/range-picker-from.component';


@Component({
  selector: '[fsMonthRangeFrom],[fsMonthRangeFromPicker]',
  template: FsDatePickerComponent.template,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthRangePickerFromComponent extends RangePickerFromComponent implements OnInit {

  @Input() set fsMonthRangeFrom(value) {
    this._name = value;
  }

  @Input() set fsMonthRangeFromPicker(value) {
    this._name = value;
  }

  public view = PickerViewType.MonthRange;

  public ngOnInit() {
    super.ngOnInit();

    this._subscribeToPickerRefUpdates();
  }

  public cleared(event) {
    super.cleared(event);

    this._pickerRef.updateEndDate(null);
  }

  public updateValue(value: Date) {
    value = startOfDay(value);

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
    this._pickerRefUpdates$(this._pickerRef.startDate$)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((newValue: Date | null) => {
        this.updateValue(newValue);

        this._ngControl.control.markAsDirty();
        this._ngControl.control.updateValueAndValidity();
        this._cdRef.markForCheck();
      });
  }
}

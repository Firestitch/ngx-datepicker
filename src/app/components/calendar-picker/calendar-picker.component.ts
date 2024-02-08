import { ChangeDetectionStrategy, Component, forwardRef, } from '@angular/core';
import { PickerViewType } from '../../../libs/common/enums/picker-view-type.enum';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FsDatePickerDialogModel } from '../../../libs/dialog/classes/dialog-model';


@Component({
  selector: 'fs-date-calendar-picker',
  templateUrl: './calendar-picker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FsDateCalendarPickerComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsDateCalendarPickerComponent implements ControlValueAccessor {

  private readonly _datePickerModel =
    new FsDatePickerDialogModel({ view: PickerViewType.Date });

  private _onChange: (value: Date | null) => void;
  private _onTouch: () => void;

  public writeValue(date: Date | null) {
    this._datePickerModel.model = date;
  }

  public registerOnChange(fn: (value: Date | null) => void) {
    this._onChange = fn;
  }

  public registerOnTouched(fn: () => void) {
    this._onTouch = fn;
  }

  public get datePickerModel(): FsDatePickerDialogModel {
    return this._datePickerModel;
  }

  public dateChanged(date: Date): void {
    this.datePickerModel.model = date;
    this._onChange(this.datePickerModel.model);
  }
}

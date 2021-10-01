import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

import { PickerViewType } from '@libs/common/enums/picker-view-type.enum';

import { FsDatePickerComponent } from '../../date-picker/date-picker.component';
import { RangePickerFromComponent } from '../base/range-picker-from.component';


@Component({
  selector: '[fsDateTimeRangeFrom],[fsDateTimeRangeFromPicker]',
  template: FsDatePickerComponent.template,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTimeRangePickerFromComponent extends RangePickerFromComponent {

  @Input() set fsDateTimeRangeFrom(value) {
    this._name = value;
  }

  @Input() set fsDateTimeRangeFromPicker(value) {
    this._name = value;
  }

  @Input()
  public view = PickerViewType.DateTime;

  public updateValue(value): void {
    this._pickerRef.updateStartDate(value);

    super.updateValue(value);
  }
}

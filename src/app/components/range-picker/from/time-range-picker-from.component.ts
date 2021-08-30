import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

import { DateFormat } from '../../../enums/date-format.enum';
import { FsDatePickerComponent } from '../../date-picker/date-picker.component';
import { RangePickerFromComponent } from '../base/range-picker-from.component';


@Component({
  selector: '[fsTimeRangeFrom],[fsTimeRangeFromPicker]',
  template: FsDatePickerComponent.template,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeRangePickerFromComponent extends RangePickerFromComponent {
  
  @Input() set fsTimeRangeFrom(value) {
    this._name = value;
  }

  @Input() set fsTimeRangeFromPicker(value) {
    this._name = value;
  }

  @Input()
  public view = DateFormat.Time;

  public updateValue(value): void {
    this._pickerRef.updateStartDate(value);

    super.updateValue(value);
  }
}

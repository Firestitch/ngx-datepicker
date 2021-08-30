import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

import { FsDatePickerComponent } from '../../date-picker/date-picker.component';
import { RangePickerFromComponent } from '../base/range-picker-from.component';


@Component({
  selector: '[fsDateRangeFrom],[fsDateRangeFromPicker]',
  template: FsDatePickerComponent.template,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangePickerFromComponent extends RangePickerFromComponent {

  @Input() set fsDateRangeFrom(value) {
    this._name = value;
  }

  @Input() set fsDateRangeFromPicker(value) {
    this._name = value;
  }

}

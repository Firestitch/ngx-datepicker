import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

import { FsDatePickerComponent } from '../../date-picker/date-picker.component';
import { RangePickerToComponent } from '../base/range-picker-to.component';


@Component({
  selector: '[fsDateRangeTo],[fsDateRangeToPicker]',
  template: FsDatePickerComponent.template,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangePickerToComponent extends RangePickerToComponent {
      
  @Input() set fsDateRangeTo(value) {
    this._name = value;
  }

  @Input() set fsDateRangeToPicker(value) {
    this._name = value;
  }

}

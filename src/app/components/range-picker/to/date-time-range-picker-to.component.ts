import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

import { PickerViewType } from '../../../../libs/common/enums/picker-view-type.enum';

import { FsDatePickerComponent } from '../../date-picker/date-picker.component';
import { RangePickerToComponent } from '../base/range-picker-to.component';


@Component({
  selector: '[fsDateTimeRangeTo],[fsDateTimeRangeToPicker]',
  template: FsDatePickerComponent.template,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTimeRangePickerToComponent extends RangePickerToComponent {

  @Input() set fsDateTimeRangeTo(value) {
    this._name = value;
  }

  @Input() set fsDateTimeRangeToPicker(value) {
    this._name = value;
  }

  @Input()
  public view = PickerViewType.DateTime;

}

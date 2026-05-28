import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

import { FsClearModule } from '@firestitch/clear';

import { PickerViewType } from '../../../../libs/common/enums/picker-view-type.enum';
import { FsDatePickerTriggerComponent } from '../../date-picker-trigger/date-picker-trigger.component';
import { FsDatePickerComponent } from '../../date-picker/date-picker.component';
import { RangePickerToComponent } from '../base/range-picker-to.component';


@Component({
  selector: '[fsDateTimeRangeTo],[fsDateTimeRangeToPicker]',
  template: FsDatePickerComponent.template,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FsClearModule,
    FsDatePickerTriggerComponent,
  ],
})
export class DateTimeRangePickerToComponent extends RangePickerToComponent {

  @Input() public set fsDateTimeRangeTo(value) {
    this._name = value;
  }

  @Input() public set fsDateTimeRangeToPicker(value) {
    this._name = value;
  }

  @Input()
  public view = PickerViewType.DateTime;

  @Input() public width = '180px';

}

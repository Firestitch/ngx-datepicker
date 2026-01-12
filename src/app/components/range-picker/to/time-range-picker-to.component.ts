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
  selector: '[fsTimeRangeTo],[fsTimeRangeToPicker]',
  template: FsDatePickerComponent.template,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FsClearModule,
    FsDatePickerTriggerComponent,
  ],
})
export class TimeRangePickerToComponent extends RangePickerToComponent {

  @Input() public set fsTimeRangeTo(value) {
    this._name = value;
  }

  @Input() public set fsTimeRangeToPicker(value) {
    this._name = value;
  }

  @Input()
  public view = PickerViewType.Time;

}

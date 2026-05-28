import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

import { FsClearModule } from '@firestitch/clear';

import { PickerViewType } from '../../../../libs/common/enums/picker-view-type.enum';
import { FsDatePickerTriggerComponent } from '../../date-picker-trigger/date-picker-trigger.component';
import { FsDatePickerComponent } from '../../date-picker/date-picker.component';
import { RangePickerFromComponent } from '../base/range-picker-from.component';


@Component({
  selector: '[fsTimeRangeFrom],[fsTimeRangeFromPicker]',
  template: FsDatePickerComponent.template,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FsClearModule,
    FsDatePickerTriggerComponent,
  ],
})
export class TimeRangePickerFromComponent extends RangePickerFromComponent {

  @Input() public set fsTimeRangeFrom(value) {
    this._name = value;
  }

  @Input() public set fsTimeRangeFromPicker(value) {
    this._name = value;
  }

  @Input() public width = '100px';

  @Input()
  public view = PickerViewType.Time;

  public updateValue(value): void {
    this._pickerRef.updateStartDate(value);

    super.updateValue(value);
  }
}

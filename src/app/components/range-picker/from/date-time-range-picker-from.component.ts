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
  selector: '[fsDateTimeRangeFrom],[fsDateTimeRangeFromPicker]',
  template: FsDatePickerComponent.template,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FsClearModule,
    FsDatePickerTriggerComponent,
  ],
})
export class DateTimeRangePickerFromComponent extends RangePickerFromComponent {

  @Input() public set fsDateTimeRangeFrom(value) {
    this._name = value;
  }

  @Input() public set fsDateTimeRangeFromPicker(value) {
    this._name = value;
  }

  @Input() public width = '180px';

  @Input()
  public view = PickerViewType.DateTime;

  public updateValue(value): void {
    this._pickerRef.updateStartDate(value);

    super.updateValue(value);
  }
}

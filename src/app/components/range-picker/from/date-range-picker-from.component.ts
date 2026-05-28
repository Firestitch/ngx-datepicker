import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

import { FsClearModule } from '@firestitch/clear';

import { FsDatePickerTriggerComponent } from '../../date-picker-trigger/date-picker-trigger.component';
import { FsDatePickerComponent } from '../../date-picker/date-picker.component';
import { RangePickerFromComponent } from '../base/range-picker-from.component';


@Component({
  selector: '[fsDateRangeFrom],[fsDateRangeFromPicker]',
  template: FsDatePickerComponent.template,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FsClearModule,
    FsDatePickerTriggerComponent,
  ],
})
export class DateRangePickerFromComponent extends RangePickerFromComponent {

  @Input() public set fsDateRangeFrom(value) {
    this._name = value;
  }

  @Input() public set fsDateRangeFromPicker(value) {
    this._name = value;
  }

  @Input() public width = '120px';

}

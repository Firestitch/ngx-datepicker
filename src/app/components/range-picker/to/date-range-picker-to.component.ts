import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

import { FsClearModule } from '@firestitch/clear';

import { FsDatePickerTriggerComponent } from '../../date-picker-trigger/date-picker-trigger.component';
import { FsDatePickerComponent } from '../../date-picker/date-picker.component';
import { RangePickerToComponent } from '../base/range-picker-to.component';


@Component({
  selector: '[fsDateRangeTo],[fsDateRangeToPicker]',
  template: FsDatePickerComponent.template,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FsClearModule,
    FsDatePickerTriggerComponent,
  ],
})
export class DateRangePickerToComponent extends RangePickerToComponent {

  @Input() public set fsDateRangeTo(value) {
    this._name = value;
  }

  @Input() public set fsDateRangeToPicker(value) {
    this._name = value;
  }

  @Input() public width = '120px';

}

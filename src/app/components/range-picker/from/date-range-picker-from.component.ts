import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

import { FsDatePickerComponent } from '../../date-picker/date-picker.component';
import { RangePickerFromComponent } from '../base/range-picker-from.component';
import { FsClearModule } from '@firestitch/clear';

import { FsDatePickerTriggerComponent } from '../../date-picker-trigger/date-picker-trigger.component';


@Component({
    selector: '[fsDateRangeFrom],[fsDateRangeFromPicker]',
    template: FsDatePickerComponent.template,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
    FsClearModule,
    FsDatePickerTriggerComponent
],
})
export class DateRangePickerFromComponent extends RangePickerFromComponent {

  @Input() set fsDateRangeFrom(value) {
    this._name = value;
  }

  @Input() set fsDateRangeFromPicker(value) {
    this._name = value;
  }

}

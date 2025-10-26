import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

import { PickerViewType } from '../../../../libs/common/enums/picker-view-type.enum';

import { FsDatePickerComponent } from '../../date-picker/date-picker.component';
import { RangePickerFromComponent } from '../base/range-picker-from.component';
import { FsClearModule } from '@firestitch/clear';
import { NgIf } from '@angular/common';
import { FsDatePickerTriggerComponent } from '../../date-picker-trigger/date-picker-trigger.component';


@Component({
    selector: '[fsTimeRangeFrom],[fsTimeRangeFromPicker]',
    template: FsDatePickerComponent.template,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FsClearModule,
        NgIf,
        FsDatePickerTriggerComponent,
    ],
})
export class TimeRangePickerFromComponent extends RangePickerFromComponent {

  @Input() set fsTimeRangeFrom(value) {
    this._name = value;
  }

  @Input() set fsTimeRangeFromPicker(value) {
    this._name = value;
  }

  @Input()
  public view = PickerViewType.Time;

  public updateValue(value): void {
    this._pickerRef.updateStartDate(value);

    super.updateValue(value);
  }
}

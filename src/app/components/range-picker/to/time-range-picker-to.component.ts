import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

import { PickerViewType } from '../../../../libs/common/enums/picker-view-type.enum';

import { FsDatePickerComponent } from '../../date-picker/date-picker.component';
import { RangePickerToComponent } from '../base/range-picker-to.component';
import { FsClearModule } from '@firestitch/clear';
import { NgIf } from '@angular/common';
import { FsDatePickerTriggerComponent } from '../../date-picker-trigger/date-picker-trigger.component';


@Component({
    selector: '[fsTimeRangeTo],[fsTimeRangeToPicker]',
    template: FsDatePickerComponent.template,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FsClearModule,
        NgIf,
        FsDatePickerTriggerComponent,
    ],
})
export class TimeRangePickerToComponent extends RangePickerToComponent {

  @Input() set fsTimeRangeTo(value) {
    this._name = value;
  }

  @Input() set fsTimeRangeToPicker(value) {
    this._name = value;
  }

  @Input()
  public view = PickerViewType.Time;

}

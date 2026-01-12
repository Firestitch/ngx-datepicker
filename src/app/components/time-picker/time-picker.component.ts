import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

import { FsClearModule } from '@firestitch/clear';

import { PickerViewType } from '../../../libs/common/enums/picker-view-type.enum';
import { FsDatePickerTriggerComponent } from '../date-picker-trigger/date-picker-trigger.component';
import { FsDatePickerComponent } from '../date-picker/date-picker.component';


@Component({
  selector: '[fsTimePicker]',
  template: FsDatePickerComponent.template,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FsTimePickerComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FsTimePickerComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FsClearModule,
    FsDatePickerTriggerComponent,
  ],
})
export class FsTimePickerComponent extends FsDatePickerComponent {

  @Input() public view = PickerViewType.Time;

}

import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

import { PickerViewType } from '@libs/common/enums/picker-view-type.enum';

import { FsDatePickerComponent } from '../date-picker/date-picker.component';


@Component({
  selector: '[fsDateTimePicker]',
  template: FsDatePickerComponent.template,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FsDateTimePickerComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FsDateTimePickerComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsDateTimePickerComponent extends FsDatePickerComponent {

  @Input() public view = PickerViewType.DateTime;

}

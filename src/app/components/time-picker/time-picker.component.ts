import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

import { DateFormat } from '../../enums/date-format.enum';
import { FsDatePickerComponent } from '../date-picker/date-picker.component';


@Component({
  selector: '[fsTimePicker]',
  template: FsDatePickerComponent.template,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FsTimePickerComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FsTimePickerComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsTimePickerComponent extends FsDatePickerComponent {

  @Input() public view = DateFormat.Time;

}

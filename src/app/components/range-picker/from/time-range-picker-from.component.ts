import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { DateFormat } from '../../../enums/date-format.enum';
import { FsDatePickerComponent } from '../../date-picker/date-picker.component';
import { DateRangePickerFromComponent } from './date-range-picker-from.component';


@Component({
  selector: '[fsTimeRangeFrom]',
  template: FsDatePickerComponent.template,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeRangePickerFromComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeRangePickerFromComponent extends DateRangePickerFromComponent {

  @Input('fsTimeRangeFrom')
  public name: string;

  @Input()
  public view = DateFormat.Time;

}

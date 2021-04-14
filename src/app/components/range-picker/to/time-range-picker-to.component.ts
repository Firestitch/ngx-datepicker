import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateFormat } from '../../../enums/date-format.enum';
import { FsDatePickerComponent } from '../../date-picker/date-picker.component';
import { DateRangePickerToComponent } from './date-range-picker-to.component';


@Component({
  selector: '[fsTimeRangeTo]',
  template: FsDatePickerComponent.template,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeRangePickerToComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeRangePickerToComponent extends DateRangePickerToComponent {

  @Input('fsTimeRangeTo')
  public name: string;

  @Input()
  public view = DateFormat.Time;

}

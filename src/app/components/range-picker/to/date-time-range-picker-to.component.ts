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
  selector: '[fsDateTimeRangeTo]',
  template: FsDatePickerComponent.template,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimeRangePickerToComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTimeRangePickerToComponent extends DateRangePickerToComponent {

  @Input('fsDateTimeRangeTo')
  public name: string;

  @Input()
  public view = DateFormat.DateTime;

}

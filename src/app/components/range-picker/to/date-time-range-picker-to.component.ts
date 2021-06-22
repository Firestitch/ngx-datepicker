import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { DateFormat } from '../../../enums/date-format.enum';
import { FsDatePickerComponent } from '../../date-picker/date-picker.component';
import { DateRangePickerToComponent } from './date-range-picker-to.component';


@Component({
  selector: '[fsDateTimeRangeTo]',
  template: FsDatePickerComponent.template,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTimeRangePickerToComponent extends DateRangePickerToComponent {

  @Input('fsDateTimeRangeTo')
  public name: string;

  @Input()
  public view = DateFormat.DateTime;

}

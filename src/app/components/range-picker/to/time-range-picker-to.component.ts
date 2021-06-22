import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { DateFormat } from '../../../enums/date-format.enum';
import { FsDatePickerComponent } from '../../date-picker/date-picker.component';
import { DateRangePickerToComponent } from './date-range-picker-to.component';


@Component({
  selector: '[fsTimeRangeTo]',
  template: FsDatePickerComponent.template,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeRangePickerToComponent extends DateRangePickerToComponent {

  @Input('fsTimeRangeTo')
  public name: string;

  @Input()
  public view = DateFormat.Time;

}

import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

import { DateFormat } from '../../../enums/date-format.enum';
import { FsDatePickerComponent } from '../../date-picker/date-picker.component';
import { DateRangePickerFromComponent } from './date-range-picker-from.component';


@Component({
  selector: '[fsDateTimeRangeFrom]',
  template: FsDatePickerComponent.template,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTimeRangePickerFromComponent extends DateRangePickerFromComponent {

  @Input('fsDateTimeRangeFrom')
  public name: string;

  @Input()
  public view = DateFormat.DateTime;

  public updateValue(value): void {
    this._pickerRef.updateStartDate(value);

    super.updateValue(value);
  }
}

import {
  ChangeDetectionStrategy, 
  Component, 
  forwardRef,
  Injector,
  Input,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { FsDatePickerComponent } from '../date-picker/date-picker.component';
import { FsDateScrollPickerComponent } from '../date-scroll-picker/date-scroll-picker.component';
import { FsDatePickerDialogFactory } from '../../../libs/dialog/services/dialog-factory.service';


@Component({
  selector: '[fsDatePickerBirthday]',
  template: FsDatePickerComponent.template,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FsDatePickerBirthdayComponent),
    multi: true
  }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export  class FsDatePickerBirthdayComponent extends FsDateScrollPickerComponent {

  @Input()
  public minYear = (new Date()).getFullYear() - 120;

  @Input()
  public maxYear = (new Date()).getFullYear();

  constructor(
    protected _injector: Injector,
    protected _datepickerFactory: FsDatePickerDialogFactory,
  ) {
    super(_injector, _datepickerFactory);
  }
}

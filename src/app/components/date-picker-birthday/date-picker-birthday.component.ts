import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Injector,
  Input,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { FocusMonitor } from '@angular/cdk/a11y';

import { FsDatePickerDialogFactory } from '../../../libs/dialog/services/dialog-factory.service';
import { FsDatePickerComponent } from '../date-picker/date-picker.component';
import { FsDateScrollPickerComponent } from '../date-scroll-picker/date-scroll-picker.component';


@Component({
  selector: '[fsDatePickerBirthday]',
  template: FsDatePickerComponent.template,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FsDatePickerBirthdayComponent),
    multi: true,
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
    fm: FocusMonitor,
  ) {
    super(_injector, _datepickerFactory, fm);
  }
}

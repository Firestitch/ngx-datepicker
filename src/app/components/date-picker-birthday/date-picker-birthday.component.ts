
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';


import { FsClearModule } from '@firestitch/clear';

import { startOfDay } from 'date-fns';

import { FsDatePickerTriggerComponent } from '../date-picker-trigger/date-picker-trigger.component';
import { FsDatePickerComponent } from '../date-picker/date-picker.component';
import { FsDateScrollPickerComponent } from '../date-scroll-picker/date-scroll-picker.component';


@Component({
  selector: '[fsDatePickerBirthday]',
  template: FsDatePickerComponent.template,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FsDatePickerBirthdayComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FsDatePickerBirthdayComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FsClearModule,
    FsDatePickerTriggerComponent
],
})
export  class FsDatePickerBirthdayComponent extends FsDateScrollPickerComponent {

  @Input()
  public minYear = (new Date()).getFullYear() - 120;

  @Input()
  public maxYear = (new Date()).getFullYear();

  // A birthday is never in the future: the wheel stops at today and a typed date is held to it
  @Input()
  public maxDate = startOfDay(new Date());

}

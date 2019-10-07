import { ChangeDetectionStrategy, Component, forwardRef, Input, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FsDateScrollPickerComponent } from '../date-scroll-picker/date-scroll-picker.component';


@Component({
  selector: '[fsDatePickerBirthday]',
  template: '<fs-clear [show]="ngModel && !disabled && !readonly && !dateDialogRef" (clear)="cleared()"></fs-clear>',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FsDatePickerBirthdayComponent),
    multi: true
  }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export  class FsDatePickerBirthdayComponent extends FsDateScrollPickerComponent {

  @Input() maxYear = (new Date()).getFullYear();
}

import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, ElementRef,
  forwardRef, Inject,
  Injector,
  Input,
  Renderer2,
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
    renderer: Renderer2,
    injector: Injector,
    elementRef: ElementRef,
    _datepickerFactory: FsDatePickerDialogFactory,
    _cdRef: ChangeDetectorRef,
  ) {
    super(renderer, injector, elementRef, _datepickerFactory, _cdRef);
  }
}

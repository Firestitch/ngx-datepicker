import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

import { PickerViewType } from '../../../libs/common/enums/picker-view-type.enum';
import { FsDatePickerComponent } from '../date-picker/date-picker.component';
import { FsClearModule } from '@firestitch/clear';
import { NgIf } from '@angular/common';
import { FsDatePickerTriggerComponent } from '../date-picker-trigger/date-picker-trigger.component';


@Component({
    selector: '[fsDateTimePicker]',
    template: FsDatePickerComponent.template,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FsDateTimePickerComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => FsDateTimePickerComponent),
            multi: true,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FsClearModule,
        NgIf,
        FsDatePickerTriggerComponent,
    ],
})
export class FsDateTimePickerComponent extends FsDatePickerComponent {

  @Input() public view = PickerViewType.DateTime;

}

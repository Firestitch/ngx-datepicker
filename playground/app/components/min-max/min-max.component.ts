import { ChangeDetectionStrategy, Component } from '@angular/core';

import { addMonths } from 'date-fns';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FsDatePickerComponent } from '../../../../src/app/components/date-picker/date-picker.component';
import { FsFormModule } from '@firestitch/form';
import { FsDateScrollPickerComponent } from '../../../../src/app/components/date-scroll-picker/date-scroll-picker.component';
import { DatePipe } from '@angular/common';


@Component({
    selector: 'app-min-max',
    templateUrl: './min-max.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        FsDatePickerComponent,
        FsFormModule,
        FsDateScrollPickerComponent,
        DatePipe,
    ],
})
export class MinMaxComponent {

  public data: any = {};
  public minDate = new Date();
  public maxDate = addMonths(new Date(), 3);
  
}

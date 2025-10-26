import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { FsWeekdaySelectComponent } from '../../../../src/app/components/weekday-select/weekday-select.component';
import { FsTimeSelectComponent } from '../../../../src/app/components/time-select/time-select.component';


@Component({
    selector: 'select-example',
    templateUrl: './select-example.component.html',
    styleUrls: ['./select-example.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        FsFormModule,
        FsWeekdaySelectComponent,
        FsTimeSelectComponent,
    ],
})
export class SelectExampleComponent {

  public weekday;
  public time;

}

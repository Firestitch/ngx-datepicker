import { ChangeDetectionStrategy, Component } from '@angular/core';
import { addMonths, startOfDay } from 'date-fns/esm';


@Component({
  selector: 'app-min-max',
  templateUrl: './min-max.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinMaxComponent {

  public data: any = {};
  public minDate = startOfDay(new Date());
  public maxDate = addMonths(new Date(), 3);
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { addMonths } from 'date-fns';


@Component({
  selector: 'app-min-max',
  templateUrl: './min-max.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinMaxComponent {

  public data: any = {};
  public minDate = new Date();
  public maxDate = addMonths(new Date(), 3);
  
}

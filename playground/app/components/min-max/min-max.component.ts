import { ChangeDetectionStrategy, Component } from '@angular/core';
import { addMonths, subMonths } from 'date-fns';


@Component({
  selector: 'app-min-max',
  templateUrl: 'min-max.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinMaxComponent {

  public data: any = {};
  public minDate = new Date('2021-08-23');
  public maxDate = new Date('2023-08-23');
}

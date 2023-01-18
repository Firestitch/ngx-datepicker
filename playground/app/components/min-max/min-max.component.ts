import { ChangeDetectionStrategy, Component } from '@angular/core';
import { addMonths, subMonths } from 'date-fns';


@Component({
  selector: 'app-min-max',
  templateUrl: 'min-max.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinMaxComponent {

  public data: any = {};
  public minDate = subMonths(new Date(),5);
  public maxDate = addMonths(new Date(),6);
  
}

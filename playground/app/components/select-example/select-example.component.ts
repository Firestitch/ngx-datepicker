import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'select-example',
  templateUrl: './select-example.component.html',
  styleUrls: ['./select-example.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectExampleComponent {

  public weekday;
  public time;

}

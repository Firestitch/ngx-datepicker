import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'date-example',
  templateUrl: './date-example.component.html',
  styleUrls: ['./date-example.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateExampleComponent {

  public model;

  public selected(e) {
    console.log('selected', e);
  }

  public blured(e) {
    console.log('blured', e);
  }

  public ngModelChange(e) {
    console.log('ngModelChange', e);
  }

  public pickerClosed(): void {
    console.log('picker closed');
  }

}

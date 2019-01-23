import { Component } from '@angular/core';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public config = environment;

  public theme = `@import '~@angular/material/theming';
  @import '~@firestitch/datepicker/styles.scss';

  $theme = /* Your app theme definition */

  @include fs-date-picker($theme);`;
}
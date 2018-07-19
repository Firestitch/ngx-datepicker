import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public theme = `@import '~@angular/material/theming';
@import '~@firestitch/datepicker/styles.scss';

$theme = /* Your app theme definition */

@include fs-date-picker($theme);`;
}

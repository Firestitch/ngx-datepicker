import { ChangeDetectionStrategy, Component, Input, ElementRef, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { FsDateModule } from '@firestitch/date';


@Component({
    selector: 'fs-date-picker-mobile-header-month-range',
    templateUrl: './header-month-range.component.html',
    styleUrls: [
        './header-month-range.component.scss',
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatIcon, FsDateModule],
})
export class FsDatePickerMobileHeaderMonthRangeComponent {
  private _elRef = inject(ElementRef);


  @Input()
  public rangeFrom: Date;

  @Input()
  public rangeTo: Date;

}

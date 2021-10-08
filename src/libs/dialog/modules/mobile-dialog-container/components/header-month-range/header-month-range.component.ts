import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ElementRef,
} from '@angular/core';


@Component({
  selector: 'fs-date-picker-mobile-header-month-range',
  templateUrl: './header-month-range.component.html',
  styleUrls: [
    './header-month-range.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsDatePickerMobileHeaderMonthRangeComponent {

  @Input()
  public rangeFrom: Date;

  @Input()
  public rangeTo: Date;


  constructor(
    private _elRef: ElementRef,
  ) {}

}

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input, Optional,
  Output
} from '@angular/core';

import { MatFormField } from '@angular/material/form-field';


@Component({
  selector: 'fs-datepicker-trigger',
  templateUrl: 'date-picker-trigger.component.html',
  styleUrls: [ 'date-picker-trigger.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsDatePickerTriggerComponent implements AfterViewInit {

  @Input()
  public disabled: boolean;

  @Output()
  public click = new EventEmitter<void>();

  constructor(
    @Optional() public matFormField: MatFormField,
    private el: ElementRef,
  ) {}

  public ngAfterViewInit() {
    const matElementRef = this.matFormField._elementRef.nativeElement;
    const infixEl = matElementRef.querySelector('.mat-form-field-infix');

    matElementRef
      .querySelector('.mat-form-field-flex')
      ?.insertBefore(this.el.nativeElement.firstChild, infixEl);
  }

  public triggerClick(): void {
    this.click.emit();
  }

}

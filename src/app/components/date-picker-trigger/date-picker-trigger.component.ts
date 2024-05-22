import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input, Optional,
  Output,
} from '@angular/core';

import { MatFormField } from '@angular/material/form-field';

import { PickerViewType, ScrollPickerViewType } from '../../../libs/common/enums';


@Component({
  selector: 'fs-datepicker-trigger',
  templateUrl: './date-picker-trigger.component.html',
  styleUrls: ['./date-picker-trigger.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsDatePickerTriggerComponent implements AfterViewInit {

  @Input()
  public disabled: boolean;

  @Input()
  public view: PickerViewType | ScrollPickerViewType;

  @Output()
  public click = new EventEmitter<void>();

  constructor(
    @Optional() public matFormField: MatFormField,
    private _el: ElementRef,
  ) {}

  public get isTimeView(): boolean {
    return this.view === PickerViewType.Time;
  }

  public ngAfterViewInit() {
    const matElementRef = this.matFormField._elementRef.nativeElement;
    const infixEl = matElementRef.querySelector('.mat-form-field-infix');

    matElementRef
      .querySelector('.mat-form-field-flex')
      ?.insertBefore(this._el.nativeElement.firstChild, infixEl);

    setTimeout(() => {
      this.matFormField.updateOutlineGap();
    }, 1000);
  }

  public triggerClick(event: UIEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.click.emit();
  }

}

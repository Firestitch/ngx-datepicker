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

import { PickerViewType } from '../../../libs/common/enums/picker-view-type.enum';


@Component({
  selector: 'fs-datepicker-trigger',
  templateUrl: 'date-picker-trigger.component.html',
  styleUrls: [ 'date-picker-trigger.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsDatePickerTriggerComponent implements AfterViewInit {

  @Input()
  public disabled: boolean;

  @Input()
  public view: PickerViewType;

  @Output()
  public click = new EventEmitter<void>();

  constructor(
    @Optional() public matFormField: MatFormField,
    private el: ElementRef,
  ) {}

  public get isTimeView(): boolean {
    return this.view === PickerViewType.Time;
  }

  public ngAfterViewInit() {
    const matElementRef = this.matFormField._elementRef.nativeElement;
    const infixEl = matElementRef.querySelector('.mat-form-field-infix');

    matElementRef
      .querySelector('.mat-form-field-flex')
      ?.insertBefore(this.el.nativeElement.firstChild, infixEl);
  }

  public triggerClick(event: UIEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.click.emit();
  }

}

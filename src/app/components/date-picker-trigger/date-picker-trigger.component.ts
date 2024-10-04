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
  public value;

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
    const el = this._getFormFieldFlex(this._el.nativeElement);

    const suffix = document.createElement('div');
    suffix.classList.add('mat-mdc-form-field-icon-suffix');

    el.prepend(suffix);

    suffix.appendChild(this._el.nativeElement);
  }

  public triggerClick(event: UIEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.click.emit();
  }

  private _getFormFieldFlex(el: Element) {
    if (el.classList.contains('mat-mdc-form-field-flex')) {
      return el;
    }

    return el.parentElement ? this._getFormFieldFlex(el.parentElement) : null;
  }

}

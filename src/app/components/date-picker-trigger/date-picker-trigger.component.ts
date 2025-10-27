import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, inject } from '@angular/core';

import { MatFormField } from '@angular/material/form-field';

import { PickerViewType, ScrollPickerViewType } from '../../../libs/common/enums';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';


@Component({
    selector: 'fs-datepicker-trigger',
    templateUrl: './date-picker-trigger.component.html',
    styleUrls: ['./date-picker-trigger.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgClass, MatIcon],
})
export class FsDatePickerTriggerComponent implements AfterViewInit {
  matFormField = inject(MatFormField, { optional: true });
  private _el = inject(ElementRef);


  @Input()
  public disabled: boolean;

  @Input()
  public value;

  @Input()
  public view: PickerViewType | ScrollPickerViewType;

  @Output()
  public click = new EventEmitter<void>();

  public get isTimeView(): boolean {
    return this.view === PickerViewType.Time;
  }
  
  public ngAfterViewInit() {
    const el = this._getFormFieldFlex(this._el.nativeElement);

    if(el) {
      const suffix = document.createElement('div');
      suffix.classList.add('mat-mdc-form-field-icon-suffix');

      el.prepend(suffix);

      suffix.appendChild(this._el.nativeElement);
    }
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

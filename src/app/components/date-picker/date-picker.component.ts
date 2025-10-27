
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

import { MatFormField } from '@angular/material/form-field';

import { FsClearModule } from '@firestitch/clear';

import { isValid, startOfDay } from 'date-fns';

import { PickerViewType } from '../../../libs/common/enums/picker-view-type.enum';
import { FsDatePickerDialogFactory } from '../../../libs/dialog/services/dialog-factory.service';
import { FsDatePickerBaseComponent } from '../../classes/date-picker-base-component';
import { createDateFromValue } from '../../helpers/create-date-from-value';
import { formatDateTime } from '../../helpers/format-date-time';
import { FsDatePickerTriggerComponent } from '../date-picker-trigger/date-picker-trigger.component';


@Component({
  selector: '[fsDatePicker]',
  template: FsDatePickerComponent.template,
  styleUrl: './date-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FsDatePickerComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FsDatePickerComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    FsClearModule,
    FsDatePickerTriggerComponent
],
})
export class FsDatePickerComponent extends FsDatePickerBaseComponent implements OnInit {

  public static template = `
    <fs-clear [show]="!disabled && !readonly && clear" (clear)="cleared($event)" [visible]="value"></fs-clear>
    <ng-container *ngIf="icon">
      <fs-datepicker-trigger (click)="triggerClick()" [disabled]="disabled || readonly" [view]="view" [value]="value"></fs-datepicker-trigger>
    </ng-container>
  `;

  @Input() public minYear = null;
  @Input() public maxYear = null;
  @Input() public minDate = null;
  @Input() public maxDate = null;
  @Input() public startOfDay = true;
  @Input() public view = PickerViewType.Date;
  @Input() public format: string;
  @Input() public minutes = true;

  @Output('change')
  public change$ = new EventEmitter<any>();

  private _formField = inject(MatFormField);  
  private _fsDatepickerFactory = inject(FsDatePickerDialogFactory);

  public ngOnInit(): void {
    super.ngOnInit();

    const el = this._formField.getConnectedOverlayOrigin().nativeElement;
    el.classList.add(`fs-date-picker-view-${this.view}`);
  }

  public writeValue(value: any): void {
    this._originValue = value;
    this._value = createDateFromValue(value, this.timezone);
    this.validateDate(this.value);
    this.updateInput(this.value);

    this._cdRef.markForCheck();
  }

  public updateInput(value) {
    if (!this.minutes && value) {
      value.setMinutes(0);
    }

    this._elementRef.nativeElement.value = formatDateTime(value, this.view, this.format, this.timezone);
  }

  public open() {
    if (this.disabled || this.readonly || this._dateDialogRef) {
      return;
    }

    const modelValue = isValid(this.value) ? this.value : null;

    this._dateDialogRef = this._fsDatepickerFactory.openDatePicker(
      this._elementRef,
      this._injector,
      {
        modelValue,
        view: this.view,
        minutes: this.minutes,
        minYear: this.minYear,
        maxYear: this.maxYear,
        minDate: this.minDate,
        maxDate: this.maxDate,
        startOfDay: this.startOfDay,
        components: this._getDefaultComponents(),
        weekStartsOn: this.weekStartsOn,
      });

    super.open();
  }

  public updateValue(value) {
    if (this.view === PickerViewType.Time && isValid(this._value) && isValid(value)) {
      this._value.setHours(value.getHours());
      this._value.setMinutes(value.getMinutes());
      this._value.setSeconds(value.getSeconds());

      value = new Date(this._value.getTime());
    }

    if (
      this.view !== PickerViewType.Time && 
      this.view !== PickerViewType.DateTime && 
      isValid(value)
    ) {
      value = startOfDay(value);
    }

    super.updateValue(value);
  }

  private _getDefaultComponents() {
    if (this.view === PickerViewType.Time) {
      return { timeStart: true };
    }

    return { calendarStart: true };

  }
}

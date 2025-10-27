
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  Output,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';


import { FsClearModule } from '@firestitch/clear';

import { endOfDay, startOfDay } from 'date-fns';

import { PickerViewType } from '../../../libs/common/enums/picker-view-type.enum';
import { formatPeriodObject } from '../../../libs/common/helpers/format-period-object';
import { IDatePickerPeriod } from '../../../libs/common/interfaces/period.interface';
import { FsDatePickerDialogFactory } from '../../../libs/dialog/services/dialog-factory.service';
import { FsDatePickerBaseComponent } from '../../classes/date-picker-base-component';
import { FsDatePickerTriggerComponent } from '../date-picker-trigger/date-picker-trigger.component';
import { FsDatePickerComponent } from '../date-picker/date-picker.component';


@Component({
  selector: '[fsDateWeekPicker]',
  template: FsDatePickerComponent.template,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FsDateWeekPickerComponent),
    multi: true,
  }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FsClearModule,
    FsDatePickerTriggerComponent
],
})
export class FsDateWeekPickerComponent extends FsDatePickerBaseComponent {

  @Input() public minYear = null;
  @Input() public maxYear = null;
  @Input() public minDate = null;
  @Input() public maxDate = null;
  @Input() public seedDate = null;
  @Input() public period = 1;
  @Input() public view = PickerViewType.Week;

  @Output('change')
  public change$ = new EventEmitter<any>();

  protected _fsDatepickerFactory = inject(FsDatePickerDialogFactory);

  constructor( ) {
    super();
    this.editable = false;
  }

  public writeValue(value: IDatePickerPeriod): void {
    this._value = value;
    this.validateDate(this.value);
    this.updateInput(value);

    this._cdRef.markForCheck();
  }

  public updateInput(value) {
    this._elementRef.nativeElement.value = formatPeriodObject(value);
  }

  public open() {
    if (this._dateDialogRef) {
      return;
    }

    this._dateDialogRef = this._fsDatepickerFactory.openDatePicker(
      this._elementRef,
      this._injector,
      {
        modelValue: this.value,
        view: this.view,
        minYear: this.minYear,
        maxYear: this.maxYear,
        minDate: this.minDate,
        maxDate: this.maxDate,
        components: this._getDefaultComponents(),
        seedDate: this.seedDate,
        periodWeeks: this.period,
        weekStartsOn: this.weekStartsOn,
      },
    );

    super.open();
  }

  public updateValue(period): void {
    if (period) {
      period.from = startOfDay(period.from);
      period.to = endOfDay(period.to);
    }

    this._value = period;

    this._onChange(this.value);
    this._onTouch();

    this.updateInput(period);

    this.change$.emit(this.value);
  }

  private _getDefaultComponents() {
    if (this.view === 'time') {
      return { timeStart: true };
    }

    return { calendarStart: true };

  }
}

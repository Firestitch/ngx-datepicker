import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Injector,
  Input,
  OnDestroy,
  OnInit, Optional, Self,
} from '@angular/core';
import {
  NgControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

import { skip, takeUntil } from 'rxjs/operators';

import { endOfDay } from 'date-fns';

import { BaseRangePickerComponent } from '../base/range-picker-base.component';
import { FsRangePickerStoreService } from '../../../services/range-picker-store.service';
import { FsDatepickerFactory } from '../../../services/factory.service';
import { DateFormat } from '../../../enums/date-format.enum';
import { FsDatePickerComponent } from '../../date-picker/date-picker.component';


@Component({
  selector: '[fsDateRangeTo]',
  template: FsDatePickerComponent.template,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangePickerToComponent extends BaseRangePickerComponent
  implements OnInit, OnDestroy {

  @Input('fsDateRangeTo')
  public name: string;

  constructor(
    _elRef: ElementRef,
    _injector: Injector,
    _datepickerFactory: FsDatepickerFactory,
    _cdRef: ChangeDetectorRef,
    @Optional() @Self() protected _ngControl: NgControl,
    private _rangePickerStore: FsRangePickerStoreService,
  ) {
    super(_elRef, _injector, _datepickerFactory, 'to', _cdRef, _ngControl);
  }

  public ngOnInit() {
    this.registerPicker();
    this._subscribeToPickerRefUpdates();

    super.ngOnInit();
  }

  public ngOnDestroy() {
    this._rangePickerStore.destroyEndDatePicker(this.name);

    this._destroy$.next();
    this._destroy$.complete();
  }

  public registerPicker() {
    this._pickerRef = this._rangePickerStore.registerPickerTo(this.name, this.value, this.view);
  }

  public writeValue(value) {
    // Hot fix while angular has ongoing issue
    // https://github.com/angular/angular/issues/29218
    if (!this.onChange) {
      return;
    }

    super.writeValue(value);

    const [valuesAreDates, datesAreEquals] = this._checkValuesEquality(value, this._pickerRef.endDate);

    if ((valuesAreDates && !datesAreEquals) || (!valuesAreDates && this._pickerRef.endDate !== value)) {
      this._pickerRef.updateEndDate(this.value);
    }
  }

  public cleared(event) {
    event.stopPropagation();
    event.preventDefault();

    this.writeValue(null);

    this.onChange(this.value);
    this.onTouch(this.value);
  }

  /**
   * Set value which was selected in dialog
   * @param value
   */
  public updateValueFromDialog(value) {
    this.updateValue(value);

    super.updateValueFromDialog(this._pickerRef.endDate);
  }

  public updateValue(value) {
    if (this.view === DateFormat.Date) {
      value = endOfDay(value);
    }

    this._pickerRef.updateEndDate(value);

    super.updateValue(value);
  }

  /** The form control validator for whether the input parses. */
  protected _parseValidator: ValidatorFn = (): ValidationErrors | null => {
    return this._pickerRef.isRangeValid
      ? null
      : { fsDatepickerRange: 'Invalid Range' };
  }

  /**
   * Update min/max and value if date start was changed
   */
  private _subscribeToPickerRefUpdates() {
    this._pickerRef.valueChange$
      .pipe(
        skip(1),
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: () => {
          const prevValue = this.value;
          // this.writeValue(this._pickerRef.endDate);

          if (prevValue !== this.value) {
            this.onChange(this.value);
            this.onTouch(this.value);
          }

          this._ngControl.control.markAsDirty();
          this._ngControl.control.updateValueAndValidity();
          this._cdRef.markForCheck();
        }
      });
  }
}

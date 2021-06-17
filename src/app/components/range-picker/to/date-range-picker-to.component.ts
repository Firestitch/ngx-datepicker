import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Injector,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  ValidatorFn, Validators
} from '@angular/forms';

import { takeUntil } from 'rxjs/operators';

import { endOfDay } from 'date-fns';

import { BaseRangePickerComponent } from '../base/range-picker-base.component';
import { FsRangePickerStoreService } from '../../../services/range-picker-store.service';
import { FsDatepickerFactory } from '../../../services/factory.service';
import { DateFormat } from '../../../enums/date-format.enum';
import { FsDatePickerComponent } from '../../date-picker/date-picker.component';


@Component({
  selector: '[fsDateRangeTo]',
  template: FsDatePickerComponent.template,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateRangePickerToComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DateRangePickerToComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangePickerToComponent extends BaseRangePickerComponent
  implements OnInit, OnDestroy, Validator {

  @Input('fsDateRangeTo')
  public name: string;

  constructor(
    _elRef: ElementRef,
    _injector: Injector,
    _datepickerFactory: FsDatepickerFactory,
    _cdRef: ChangeDetectorRef,
    private _rangePickerStore: FsRangePickerStoreService,
  ) {
    super(_elRef, _injector, _datepickerFactory, 'to', _cdRef);
  }

  public ngOnInit() {
    this.registerPicker();
    this._subscribeToPickerRefUpdates();
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

  protected _validator: ValidatorFn | null = Validators.compose([this._parseValidator]);

  /**
   * Update min/max and value if date start was changed
   */
  private _subscribeToPickerRefUpdates() {
    this._pickerRef.valueChange$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: () => {
          const prevValue = this.value;
          // this.writeValue(this._pickerRef.endDate);

          if (prevValue !== this.value) {
            this.onChange(this.value);
            this.onTouch(this.value);
          } else {
            this._validatorOnChange();
          }

          this._cdRef.markForCheck();
        }
      });
  }
}

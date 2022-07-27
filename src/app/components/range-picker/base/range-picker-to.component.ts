import {
  Directive,
  Injector,
  OnDestroy,
  OnInit,
  Optional,
  Self,
} from '@angular/core';
import { NgControl, ValidationErrors, ValidatorFn, } from '@angular/forms';

import { FocusMonitor } from '@angular/cdk/a11y';

import { takeUntil } from 'rxjs/operators';

import { endOfDay } from 'date-fns';

import { FsDatePickerDialogFactory } from '../../../../libs/dialog/services/dialog-factory.service';
import { PickerViewType } from '../../../../libs/common/enums/picker-view-type.enum';

import { RangePickerComponent } from '../base/range-picker-base.component';
import { FsRangePickerStoreService } from '../../../services/range-picker-store.service';


@Directive()
export abstract class RangePickerToComponent extends RangePickerComponent implements OnInit, OnDestroy {

  public constructor(
    @Optional() @Self() protected _ngControl: NgControl,
    protected _injector: Injector,
    protected _datepickerFactory: FsDatePickerDialogFactory,
    private _rangePickerStore: FsRangePickerStoreService,
    fm: FocusMonitor
  ) {
    super(_injector, _datepickerFactory, 'to', _ngControl, fm);
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

    const [valuesAreDates] = this._checkValuesEquality(this.value, this._pickerRef.endDate);

    if ((valuesAreDates && !this._pickerRef.sameAsEndDate(this.value)) || !valuesAreDates) {
      this._pickerRef.updateEndDate(this.value);
    }
  }

  public cleared(event?) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    this.writeValue(null);

    this.onChange(this.value);
    this.onTouch(this.value);
  }

  /**
   * Set value which was selected in dialog
   * @param value
   */
  // public updateValueFromDialog(value) {
  //   this.updateValue(value);
  //
  //   super.updateValueFromDialog(this._pickerRef.endDate);
  // }

  public updateValue(value: Date) {
    if (this.view === PickerViewType.Date) {
      value = endOfDay(value);
    }

    this._pickerRef.updateEndDate(value as Date);

    super.updateValue(value);
  }

  protected _tzChanged(originDate: Date | null): void {
    super._tzChanged(originDate);

    this._pickerRef?.updateEndDate(this.value);
  }

  /** The form control validator for whether the input parses. */
  protected _parseValidator: ValidatorFn = (): ValidationErrors | null => {
    return this._pickerRef.isRangeValid
      ? null
      : { fsDatepickerRange: 'Invalid Range' };
  }

  protected _processInputDate(date: Date | null): Date | null {
    date = super._processInputDate(date);

    if (this.view === PickerViewType.Date && date) {
      date = endOfDay(date);
    }

    return date;
  }

  protected _subscribeToPickerRefUpdates() {
    this._pickerRefUpdates$(this._pickerRef.startDate$)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((value: Date | null) => {
        if (!this._pickerRef.isRangeValid) {
          this.cleared();
        }

        if (this.value) {
          this._ngControl.control.markAsDirty();
          this._ngControl.control.updateValueAndValidity();
        }

        this._cdRef.markForCheck();
      });
  }

}

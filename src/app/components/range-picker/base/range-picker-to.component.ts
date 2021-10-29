import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  Optional,
  Self,
} from '@angular/core';
import { NgControl, ValidationErrors, ValidatorFn, } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';

import { endOfDay, startOfDay } from 'date-fns';

import { FsDatePickerDialogFactory } from '../../../../libs/dialog/services/dialog-factory.service';
import { PickerViewType } from '../../../../libs/common/enums/picker-view-type.enum';

import { RangePickerComponent } from '../base/range-picker-base.component';
import { FsRangePickerStoreService } from '../../../services/range-picker-store.service';


@Directive()
export abstract class RangePickerToComponent extends RangePickerComponent implements OnInit, OnDestroy {

  public constructor(
    protected _elRef: ElementRef,
    protected _injector: Injector,
    protected _datepickerFactory: FsDatePickerDialogFactory,
    protected _cdRef: ChangeDetectorRef,
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
  public updateValueFromDialog(value) {
    this.updateValue(value);

    super.updateValueFromDialog(this._pickerRef.endDate);
  }

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
    if (this.view === PickerViewType.Date) {
      date = endOfDay(date);
    }

    return super._processInputDate(date);
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

        this._ngControl.control.markAsDirty();
        this._ngControl.control.updateValueAndValidity();
        this._cdRef.markForCheck();
      });
  }

}

import {
  Directive,
  Injector,
  OnDestroy,
  OnInit,
  Optional,
  Self,
} from '@angular/core';
import { NgControl } from '@angular/forms';

import { FocusMonitor } from '@angular/cdk/a11y';

import { startOfDay } from 'date-fns';

import { FsDatePickerDialogFactory } from '../../../../libs/dialog/services/dialog-factory.service';
import { PickerViewType } from '../../../../libs/common/enums/picker-view-type.enum';

import { RangePickerComponent } from '../base/range-picker-base.component';
import { FsRangePickerStoreService } from '../../../services/range-picker-store.service';


@Directive()
export abstract class RangePickerFromComponent extends RangePickerComponent implements OnInit, OnDestroy {

  public constructor(
    @Optional() @Self() protected _ngControl: NgControl,
    protected _injector: Injector,
    protected _datepickerFactory: FsDatePickerDialogFactory,
    protected _rangePickerStore: FsRangePickerStoreService,
    fm: FocusMonitor,
  ) {
    super(_injector, _datepickerFactory, 'from', _ngControl, fm);
  }

  public ngOnInit() {
    this.registerPicker();
    super.ngOnInit();
  }

  public ngOnDestroy() {
    this._rangePickerStore.destroyStartDatePicker(this.name);

    this._destroy$.next(null);
    this._destroy$.complete();
  }

  public registerPicker() {
    this._pickerRef = this._rangePickerStore.registerPickerFrom(this.name, this.value, this.view);
  }

  public writeValue(value) {
    // Hot fix while angular has ongoing issue
    // https://github.com/angular/angular/issues/29218
    if (!this.onChange) {
      return;
    }

    super.writeValue(value);

    const [valuesAreDates] = this._checkValuesEquality(this.value, this._pickerRef.startDate);

    if ((valuesAreDates && !this._pickerRef.sameAsStartDate(this.value)) || (!valuesAreDates)) {
      this._pickerRef.updateStartDate(this.value);
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
  // public updateValueFromDialog(value: Date) {
  //   this.updateValue(value);
  //
  //   super.updateValueFromDialog(value);
  // }

  public updateValue(value): void {
    if (this.view === PickerViewType.Date) {
      value = startOfDay(value);
    }

    this._pickerRef.updateStartDate(value);

    super.updateValue(value);
  }

  protected _tzChanged(originDate: Date | null): void {
    super._tzChanged(originDate);

    this._pickerRef?.updateStartDate(this.value);
  }

  protected _processInputDate(date: Date | null): Date | null {
    date = super._processInputDate(date);

    if (this.view === PickerViewType.Date && date) {
      date = startOfDay(date);
    }

    return date;
  }
}

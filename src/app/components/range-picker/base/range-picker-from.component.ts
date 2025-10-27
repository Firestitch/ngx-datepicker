import {
  Directive,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';


import { startOfDay } from 'date-fns';

import { PickerViewType } from '../../../../libs/common/enums/picker-view-type.enum';
import { FsRangePickerStoreService } from '../../../services/range-picker-store.service';
import { RangePickerComponent } from '../base/range-picker-base.component';


@Directive()
export abstract class RangePickerFromComponent extends RangePickerComponent implements OnInit, OnDestroy {

  protected _rangePickerStore = inject(FsRangePickerStoreService);

  constructor() {
    super();
    this._type = 'from';
  }

  public ngOnInit() {
    this.registerPicker();
    super.ngOnInit();
  }

  public ngOnDestroy() {
    super.ngOnDestroy();
    this._rangePickerStore.destroyStartDatePicker(this.name);
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

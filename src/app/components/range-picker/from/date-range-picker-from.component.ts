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
import { NgControl } from '@angular/forms';

import { startOfDay } from 'date-fns';

import { BaseRangePickerComponent } from '../base/range-picker-base.component';
import { FsRangePickerStoreService } from '../../../services/range-picker-store.service';
import { FsDatepickerFactory } from '../../../services/factory.service';
import { DateFormat } from '../../../enums/date-format.enum';
import { FsDatePickerComponent } from '../../date-picker/date-picker.component';


@Component({
  selector: '[fsDateRangeFrom]',
  template: FsDatePickerComponent.template,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangePickerFromComponent extends BaseRangePickerComponent implements OnInit, OnDestroy {

  @Input('fsDateRangeFrom')
  public name: string;

  constructor(
    _elRef: ElementRef,
    _injector: Injector,
    _datepickerFactory: FsDatepickerFactory,
    _cdRef: ChangeDetectorRef,
    @Optional() @Self() protected _ngControl: NgControl,
    private _rangePickerStore: FsRangePickerStoreService,
  ) {
    super(_elRef, _injector, _datepickerFactory, 'from', _cdRef, _ngControl);
  }

  public ngOnInit() {
    this.registerPicker();

    super.ngOnInit();
  }

  public ngOnDestroy() {
    this._rangePickerStore.destroyStartDatePicker(this.name);

    this._destroy$.next();
    this._destroy$.complete();
  }

  public registerPicker() {
    this._pickerRef = this._rangePickerStore.registerPickerFrom(this.name, this.value, this.view);
  }

  public writeValue(value) {
    super.writeValue(value);

    const [valuesAreDates, datesAreEquals] = this._checkValuesEquality(value, this._pickerRef.startDate);

    if ((valuesAreDates && !datesAreEquals) || (!valuesAreDates && this._pickerRef.startDate !== value)) {
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
  public updateValueFromDialog(value) {
    if (this.view === DateFormat.Date) {
      value = startOfDay(value);
    }

    super.updateValueFromDialog(value);

    this._pickerRef.updateStartDate(value);
  }

  public updateValue(value): void {
    this._pickerRef.updateStartDate(value);

    super.updateValue(value);
  }
}

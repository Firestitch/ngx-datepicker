import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Injector,
  Input,
  OnDestroy,
  OnInit, Optional
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';

import { takeUntil } from 'rxjs/operators';

import { BaseRangePickerComponent } from '../base/range-picker-base.component';
import { FsRangePickerStoreService } from '../../../services/range-picker-store.service';
import { FsDatepickerFactory } from '../../../services/factory.service';


@Component({
  selector: '[fsDateRangeTo]',
  template: '<fs-clear [show]="value && ((!disabled && !readonly) || !!dateDialogRef)" (clear)="cleared($event)"></fs-clear>',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateRangePickerToComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangePickerToComponent extends BaseRangePickerComponent implements OnInit, OnDestroy {

  @Input('fsDateRangeTo')
  public name: string;

  constructor(
    _elRef: ElementRef,
    _injector: Injector,
    _datepickerFactory: FsDatepickerFactory,
    _cdRef: ChangeDetectorRef,
    private _rangePickerStore: FsRangePickerStoreService,
    @Optional() _parentFormField: MatFormField,
  ) {
    super(_elRef, _injector, _datepickerFactory, 'to', _cdRef,_parentFormField);
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

    this.minDate = this._pickerRef.startDate;
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
    super.updateValueFromDialog(value);

    this._pickerRef.updateEndDate(value);
  }

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
          this.writeValue(this._pickerRef.endDate);

          if (prevValue !== this.value) {
            this.onChange(this.value);
            this.onTouch(this.value);
          }

          this.minDate = this._pickerRef.startDate;
        }
      });
  }
}

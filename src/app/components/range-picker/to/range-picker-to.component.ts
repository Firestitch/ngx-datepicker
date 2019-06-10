import {
  Component,
  ElementRef,
  forwardRef,
  Injector,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';

import { BaseRangePickerComponent } from '../base/range-picker-base.component';
import { FsRangePickerStoreService } from '../../../services/range-picker-store.service';
import { FsDatepickerFactory } from '../../../services/factory.service';


@Component({
  selector: '[fsDateRangeTo]',
  template: '<fs-clear [show]="value" (clear)="cleared()"></fs-clear>',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateRangePickerToComponent),
      multi: true
    }
  ]
})
export class DateRangePickerToComponent extends BaseRangePickerComponent implements OnInit, OnDestroy {

  @Input('fsDateRangeTo')
  public name: string;

  constructor(
    _elRef: ElementRef,
    _injector: Injector,
    _datepickerFactory: FsDatepickerFactory,
    private _rangePickerStore: FsRangePickerStoreService
  ) {
    super(_elRef, _injector, _datepickerFactory);
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
    this._pickerRef = this._rangePickerStore.registerPickerTo(this.name, this.value);

    this.minDate = this._pickerRef.startDate;
  }

  public writeValue(value) {
    super.writeValue(value);

    if (this._pickerRef.endDate !== value) {
      this._pickerRef.updateEndDate(value);
    }
  }

  public cleared() {
    this.writeValue(null);
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
          this.writeValue(this._pickerRef.endDate);
          this.minDate = this._pickerRef.startDate;
        }
      });
  }
}

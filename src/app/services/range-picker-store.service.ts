import { Injectable } from '@angular/core';
import { RangePickerRef } from '../classes/range-picker-ref';


@Injectable()
export class FsRangePickerStoreService {
  private _store = new Map<string, RangePickerRef>();

  constructor() {
  }

  public registerPickerFrom(name, value) {
    this._createIfNotExistsPicker(name);

    const pickerRef = this._store.get(name);

    pickerRef.updateStartDate(value);

    return pickerRef;
  }

  public destroyStartDatePicker(name: string) {
    const pickerRef = this._store.get(name);

    if (pickerRef) {
      pickerRef.destroyStartDatePicker();

      this._destroyRefIfRelatedDestroyed(name, pickerRef);
    }
  }

  public destroyEndDatePicker(name: string) {
    const pickerRef = this._store.get(name);

    if (pickerRef) {
      pickerRef.destroyEndDatePicker();

      this._destroyRefIfRelatedDestroyed(name, pickerRef);
    }
  }

  public registerPickerTo(name, value) {
    this._createIfNotExistsPicker(name);

    const pickerRef = this._store.get(name);

    pickerRef.updateEndDate(value);

    return pickerRef;
  }

  private _createIfNotExistsPicker(name: string) {
    if (!this._store.has(name)) {
      this._store.set(name, new RangePickerRef());
    }
  }

  private _destroyRefIfRelatedDestroyed(name, ref) {
    if (!ref.startDatePickerExists && !ref.endDatePickerExists) {
      ref.destroy();
      this._store.delete(name);
    }
  }
}

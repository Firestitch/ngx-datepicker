import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';
import { FsDatePicker } from './../interfaces/fsdatepicker.interface';

@Injectable()
export class FsDatePickerModel implements FsDatePicker {

  private _minYear = null;
  private _maxYear = null;
  // date | datetime | time | inline
  private _view = 'date';
  // year | month | date
  public dateMode = 'date';

  set minYear(minYear) {

    this._minYear = minYear || (parseInt(moment().format('YYYY')) - 100);
  }

  get minYear() {
    return this._minYear;
  }

  set maxYear(maxYear) {
    this._maxYear = maxYear || (parseInt(moment().format('YYYY')) + 100);
  }

  get maxYear() {
    return this._maxYear;
  }

  set view(view) {
    if (!view) {
      return;
    }
    this._view = view;
  }

  get view() {
    return this._view;
  }

  constructor() { }
}

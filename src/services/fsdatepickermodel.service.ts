import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';
import { isEqual } from 'lodash';
import { FsDatePicker } from './../interfaces/fsdatepicker.interface';

@Injectable()
export class FsDatePickerModel implements FsDatePicker {

  private _minYear = null;
  private _maxYear = null;

  // @TODO create interfaces for all values

  /**
   * date | datetime | time
   * View is options selected on init. Can't be changed manually
   */
  private _view = 'date';
  /**
   * calendar-start | calendar-end | time-start | time-end
   * Visual components. Can be changed by summary widget but only if _view allowed to do this.
   */
  private _components = [];

  /**
   * year | month | date
   *
   * Current mode of calendar. For ranges consist values for both: start and end date
   */
  public dateMode = null;

  set components(value) {

    const allowable = [];

    if (['date', 'datetime'].indexOf(this._view) !== -1) {
      allowable.push('calendar-start');
      allowable.push('calendar-end');
    }

    if (['time', 'datetime'].indexOf(this._view) !== -1) {
      allowable.push('time-start');
      allowable.push('time-end');
    }

    const result = value.filter(n => {
      return allowable.indexOf(n) !== -1;
    });

    // Updating components only if all value object is valid
    if (isEqual(value, result)) {
      this._components = value;
    }
  }

  get components() {
    return this._components;
  }

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

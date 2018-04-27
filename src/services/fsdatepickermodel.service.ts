import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';
import { isEqual, forEach } from 'lodash';
import { FsDatePicker } from './../interfaces/fsdatepicker.interface';
import { FsPreset } from './../interfaces/fspreset.interface';
import { FsComponents } from './../interfaces/fscomponents.interface';

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
   * Visual components. Can be changed by summary widget but only if _view allowed to do this.
   */
  private _componentsDefault: FsComponents = {
    calendarStart: false,
    calendarEnd: false,
    time: false
  };

  private _components: FsComponents = null;

  /**
   * year | month | date
   *
   * Current mode of calendar. For ranges consist values for both: start and end date
   */
  public dateMode = null;

  public presets: FsPreset[] = [];

  set components(value) {
    value = Object.assign({}, this._componentsDefault, value);
    const tempData = Object.assign({}, value);
    const allowable = [];

    if (['date', 'datetime'].indexOf(this._view) !== -1) {
      allowable.push('calendarStart');
      allowable.push('calendarEnd');
    }

    if (['time', 'datetime'].indexOf(this._view) !== -1) {
      allowable.push('time');
    }

    forEach(tempData, (item, index) => {
      tempData[index] = allowable.indexOf(index) !== -1 ? item : false;
    });

    // Updating components only if all value object is valid
    if (isEqual(value, tempData)) {
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

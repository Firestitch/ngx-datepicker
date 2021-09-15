import { Injectable } from '@angular/core';

import { isEqual, forEach } from 'lodash-es';
import { addYears, subYears } from 'date-fns';

import { IFsDatePickerDialogComponents } from '../interfaces/dialog-components.interface';
import { IFsDatePickerDialogModel } from '../interfaces/dialog-model.interface';


@Injectable()
export class FsDatePickerModel implements IFsDatePickerDialogModel {

  private _minYear = null;
  private _maxYear = null;

  // @TODO create interfaces for all values

  /**
   * date | datetime | time | week
   * View is options selected on init. Can't be changed manually
   */
  private _view = 'date';

  /**
   * Visual components. Can be changed by summary widget but only if _view allowed to do this.
   */
  private _componentsDefault: IFsDatePickerDialogComponents = {
    calendarStart: false,
    calendarEnd: false,
    timeStart: false,
    timeEnd: false
  };

  private _components: IFsDatePickerDialogComponents = null;

  /**
   * year | month | date
   *
   * Current mode of calendar. For ranges consist values for both: start and end date
   */
  public dateMode = null;
  public minDate = null;
  public maxDate = null;
  public startOfDay = true;
  public seedDate = null;
  public periodWeeks = null;
  public minutes = true;

  set components(value) {
    value = Object.assign({}, this._componentsDefault, value);
    const tempData = Object.assign({}, value);
    const allowable = [];

    if (['date', 'datetime'].indexOf(this._view) !== -1) {
      allowable.push('calendarStart');
      allowable.push('calendarEnd');
    }

    if (['time', 'datetime'].indexOf(this._view) !== -1) {
      allowable.push('timeStart');
      allowable.push('timeEnd');
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
    this._minYear = minYear || (new Date().getFullYear() - 100);
  }

  get minYear() {
    return this._minYear;
  }

  set maxYear(maxYear) {
    this._maxYear = maxYear || (new Date().getFullYear() + 100);
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

  public disabledDays() {

    const result = [];

    if (this.minDate) {
      result.push([subYears(new Date(), this.minYear), new Date(this.minDate)]);
    }

    if (this.maxDate) {
      result.push([new Date(this.maxDate), addYears(new Date(), this._maxYear)]);
    }

    return result;
  }
}

import { OverlayRef } from '@angular/cdk/overlay';

import { Observable, Subject } from 'rxjs';
import { skip } from 'rxjs/operators';

import { IPeriod } from '@libs/common/interfaces/period.interface';

import { isEqual, forEach } from 'lodash-es';

import { FsDatePickerDialogModel } from './dialog-model';
import { IDialogFactoryOptions } from '../interfaces/dialog-factory-data.interface';
import { IFsDatePickerDialogComponents } from '../interfaces/dialog-components.interface';


export class FsDateDialogRef {

  public positionStrategy;

  private _close$ = new Subject<void>();
  private _dialogModel: FsDatePickerDialogModel;
  private _value$: Observable<Date | null | IPeriod>;

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

  constructor(
    private _pickerOptions: IDialogFactoryOptions,
    private _overlayRef: OverlayRef,
  ) {
    this._init();
  }

  public get pickerModel(): FsDatePickerDialogModel {
    return this._dialogModel;
  }

  public get options(): IDialogFactoryOptions {
    return this._pickerOptions;
  }

  public get overlayRef() {
    return this._overlayRef;
  }

  public get value$(): Observable<Date | null | IPeriod> {
    return this._value$;
  }

  public get close$() {
    return this._close$.asObservable();
  }

  get components() {
    return this._components;
  }

  public updateValue(value) {
    this._dialogModel.model = value;
  }

  public close(): void {
    this._close$.next();
    this._close$.complete();

    this._overlayRef.dispose();
  }

  private _init(): void {
    this._initComponents();
    this._initModel();
  }

  private _initModel(): void {
    this._dialogModel = new FsDatePickerDialogModel(
      this._pickerOptions,
    );

    const model$ = this._dialogModel.model$
      .pipe(
        skip(1),
      );

    const period$ = this._dialogModel.period$
      .pipe(
        skip(1),
      );

    this._value$ = this.options.view === 'week'
      ? period$
      : model$;
  }

  private _initComponents(): void {
    const value = {
      ...this._componentsDefault,
      ...this._pickerOptions.components || {},
    };
    const tempData = { ...value };
    const allowable = [];

    if (['week', 'date', 'datetime'].indexOf(this._pickerOptions.view) !== -1) {
      allowable.push('calendarStart');
      allowable.push('calendarEnd');
    }

    if (['time', 'datetime'].indexOf(this._pickerOptions.view) !== -1) {
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
}

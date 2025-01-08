import { Observable, Subject } from 'rxjs';
import { skip } from 'rxjs/operators';

import { forEach, isEqual } from 'lodash-es';

import { IDatePickerPeriod } from '../../common/interfaces/period.interface';
import { IFsDatePickerDialogComponents } from '../interfaces/dialog-components.interface';
import { IDialogFactoryOptions } from '../interfaces/dialog-factory-data.interface';

import { FsDatePickerDialogModel } from './dialog-model';
import { FsDatePickerOverlayRef } from './overlay-ref';


export class FsDatePickerDialogRef {

  public opened = true;

  private _overlayRef = new FsDatePickerOverlayRef();
  private _dialogModel: FsDatePickerDialogModel;
  private _close$ = new Subject<void>();
  private _value$: Observable<Date | null | IDatePickerPeriod>;

  /**
   * Visual components. Can be changed by summary widget but only if _view allowed to do this.
   */
  private _componentsDefault: IFsDatePickerDialogComponents = {
    calendarStart: false,
    calendarEnd: false,
    timeStart: false,
    timeEnd: false,
  };

  private _components: IFsDatePickerDialogComponents = null;

  constructor(
    private _pickerOptions: IDialogFactoryOptions,
  ) {
    this._init();
  }

  public get pickerModel(): FsDatePickerDialogModel {
    return this._dialogModel;
  }

  public get options(): IDialogFactoryOptions {
    return this._pickerOptions;
  }

  public get value$(): Observable<Date | IDatePickerPeriod | null> {
    return this._value$;
  }

  public get pickerOverlayRef(): FsDatePickerOverlayRef {
    return this._overlayRef;
  }

  public get close$() {
    return this._close$.asObservable();
  }

  public get components() {
    return this._components;
  }

  public updateValue(value) {
    this._dialogModel.model = value;
  }

  public close(): void {
    this.pickerOverlayRef.close();
    this._close$.next(null);
    this._close$.complete();
    this.opened = false;
  }

  private _init(): void {
    this._initComponents();
    this._initModel();
  }

  private _initModel(): void {
    this._dialogModel = new FsDatePickerDialogModel(
      this._pickerOptions,
    );

    this._initValue();
  }

  private _initValue(): void {
    this._value$ = String(this.options.view) === 'week' ? this._dialogModel.period$
      .pipe(
        skip(1),
      ) : this._dialogModel.model$
      .pipe(
        skip(1),
      );
  }

  private _initComponents(): void {
    const value = {
      ...this._componentsDefault,
      ...this._pickerOptions.components || {},
    };
    const tempData = { ...value };
    const allowable = [];

    if (['week', 'date', 'datetime', 'monthrange'].indexOf(this._pickerOptions.view) !== -1) {
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

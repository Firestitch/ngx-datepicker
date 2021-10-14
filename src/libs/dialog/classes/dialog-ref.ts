import { Observable, Subject } from 'rxjs';
import { skip } from 'rxjs/operators';

import { isEqual, forEach } from 'lodash-es';

import { IPeriod } from '../../common/interfaces/period.interface';

import { FsDatePickerDialogModel } from './dialog-model';
import { FsDatePickerOverlayRef } from './overlay-ref';
import { IDialogFactoryOptions } from '../interfaces/dialog-factory-data.interface';
import { IFsDatePickerDialogComponents } from '../interfaces/dialog-components.interface';


export class FsDatePickerDialogRef {

  private _overlayRef = new FsDatePickerOverlayRef();
  private _dialogModel: FsDatePickerDialogModel;
  private _close$ = new Subject<void>();
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
  ) {
    this._init();
  }

  public get pickerModel(): FsDatePickerDialogModel {
    return this._dialogModel;
  }

  public get options(): IDialogFactoryOptions {
    return this._pickerOptions;
  }

  public get value$(): Observable<Date | IPeriod | null> {
    return this._value$;
  }

  public get pickerOverlayRef(): FsDatePickerOverlayRef {
    return this._overlayRef;
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
    this.pickerOverlayRef.close();
    this._close$.next();
    this._close$.complete();
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
    if (this.options.view === 'week') {
      this._value$ = this._dialogModel.period$
        .pipe(
          skip(1),
        );
    } else {
      this._value$ = this._dialogModel.model$
        .pipe(
          skip(1),
        );
    }
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

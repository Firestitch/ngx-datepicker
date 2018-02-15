import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';
import { FsDatePicker } from './../interfaces/fsdatepicker.interface';

@Injectable()
export class FsDatePickerModel implements FsDatePicker {

  view = 'date';

  constructor() { }
}

import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';

@Injectable()
export class FsDatePickerModel {

  constructor() { }

  getSelected(date) {
    const result = {};

    if (date && moment(date).isValid()) {
      result['date'] = moment(date).format('YYYY-MM-DD');
      result['hour'] = parseInt(moment(date).format('H'));
      result['minute'] = parseInt(moment(date).format('m'));
      result['year'] = parseInt(moment(date).format('YYYY'));
      result['month'] = parseInt(moment(date).format('M'));
      result['day'] = parseInt(moment(date).format('D'));
    } else {
      result['date'] = undefined;
      result['hour'] = undefined;
      result['minute'] = undefined;
      result['year'] = undefined;
      result['month'] = undefined;
      result['day'] = undefined;
    }

    return result;
  }

  createMoment() {
    return moment().startOf('day');
  }
}

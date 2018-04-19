import { Component, Input, Output, EventEmitter, ViewEncapsulation, OnInit, OnChanges } from '@angular/core';
import * as moment from 'moment-timezone';
import { FsDatePickerCommon } from './../../services/fsdatepickercommon.service';
import { FsDatePickerModel } from './../../services/fsdatepickermodel.service';

@Component({
    selector: 'fsDatePickerPresets',
    templateUrl: './fsdatepickerpresets.component.html',
    styleUrls: ['./fsdatepickerpresets.component.scss']
})
export class FsDatepickerPresetsComponent implements OnInit {

  @Output() public datesChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  range(type) {

    let startDate = moment();
    let endDate = moment();

    if (type == 'today') {
      startDate = startDate.startOf('day');
      endDate = endDate.endOf('day');
    } else if (type == 'yesterday') {
      startDate = startDate.subtract(1, 'day').startOf('day');
      endDate = endDate.subtract(1, 'day').endOf('day');
    } else if (type == 'last_7') {
      startDate = startDate.subtract(7, 'days');
    } else if (type == 'last_30') {
      startDate = startDate.subtract(30, 'days');
    } else if (type == 'current_month') {
      startDate = startDate.startOf('month');
      endDate = endDate.endOf('month');
    } else if (type == 'last_month') {
      startDate = startDate.subtract(1, 'month').startOf('month');
      endDate = endDate.subtract(1, 'month').endOf('month');
    }

    this.datesChange.emit({ startDate, endDate });
  }
}

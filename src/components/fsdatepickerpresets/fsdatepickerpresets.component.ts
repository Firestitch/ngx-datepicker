import { Component, Input, Output, EventEmitter, ViewEncapsulation, OnInit, OnChanges } from '@angular/core';
import * as moment from 'moment-timezone';
import { FsPreset } from './../../interfaces';
import { FsDatePickerModel } from './../../services/fsdatepickermodel.service';
import { FsDatePickerCommon } from './../../services/fsdatepickercommon.service';


@Component({
    selector: 'fs-date-picker-presets',
    templateUrl: './fsdatepickerpresets.component.html',
    styleUrls: ['./fsdatepickerpresets.component.scss']
})
export class FsDatepickerPresetsComponent implements OnInit {

  @Output() public datesChange = new EventEmitter<any>();

  public presets: FsPreset[] = [];

  constructor(
    private fsDatePickerModel: FsDatePickerModel
  ) { }

  ngOnInit() {
    this.presets = this.fsDatePickerModel.presets;
  }

  setPreset(preset: FsPreset): void {
    this.datesChange.emit(preset.value);
  }
}

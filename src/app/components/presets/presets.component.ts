import { Component, Output, EventEmitter, OnInit } from '@angular/core';

import { FsPreset } from './../../interfaces';
import { FsDatePickerModel } from '../../services/model.service';


@Component({
    selector: 'fs-date-picker-presets',
    templateUrl: './presets.component.html',
    styleUrls: ['./presets.component.scss']
})
export class FsDatepickerPresetsComponent implements OnInit {

  @Output() public datesChange = new EventEmitter<any>();

  public presets: FsPreset[] = [];

  constructor(
    private fsDatePickerModel: FsDatePickerModel
  ) { }

  public ngOnInit() {
    this.presets = this.fsDatePickerModel.presets;
  }

  public setPreset(preset: FsPreset): void {
    this.datesChange.emit(preset.value);
  }
}

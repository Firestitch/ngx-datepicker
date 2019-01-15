import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';

import { FsDatePickerModel } from '../../services/model.service';
import { FsDatePickerCommon } from '../../services/common.service';


@Component({
    selector: 'fs-date-picker-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss']
})
export class FsDatepickerSummaryComponent implements OnInit, OnChanges {

  @Input() public startDate = null;
  @Input() public endDate = null;
  @Input() public range: Boolean = false;

  @Output() public componentsChange = new EventEmitter<any>();

  public formattedStartDate = null;
  public formattedEndDate = null;

  constructor(
    public fsDatePickerModel: FsDatePickerModel,
    private fsDatePickerCommon: FsDatePickerCommon,
  ) { }

  public ngOnInit() {}

  public ngOnChanges(changes) {

    this.formattedStartDate = null;
    this.formattedEndDate = null;

    if (changes && changes.startDate && changes.startDate.currentValue) {
      this.formattedStartDate = {
        date: this.fsDatePickerCommon.formatSummary(changes.startDate.currentValue),
        time: this.fsDatePickerCommon.formatSummary(changes.startDate.currentValue, 'time')
      };
    }

    if (changes && changes.endDate && changes.endDate.currentValue) {
      this.formattedEndDate = {
        date: this.fsDatePickerCommon.formatSummary(changes.endDate.currentValue),
        time: this.fsDatePickerCommon.formatSummary(changes.endDate.currentValue, 'time')
      };
    }
  }

  public onComponentsChange(view) {
    this.componentsChange.emit(view);
  }
}

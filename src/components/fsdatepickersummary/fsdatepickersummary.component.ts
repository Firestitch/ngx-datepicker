import { Component, Input, Output, EventEmitter, ViewEncapsulation, OnInit, OnChanges } from '@angular/core';
import { FsDatePickerCommon } from './../../services/fsdatepickercommon.service';
import { FsDatePickerModel } from './../../services/fsdatepickermodel.service';

@Component({
    selector: 'fsDatePickerSummary',
    templateUrl: './fsdatepickersummary.component.html',
    styleUrls: ['./fsdatepickersummary.component.scss'],
    // encapsulation: ViewEncapsulation.None
})
export class FsDatepickerSummaryComponent implements OnInit, OnChanges {

  @Input() public startDate = null;
  @Input() public endDate = null;

  @Output() componentsChange = new EventEmitter<any>();

  public formattedStartDate = null;
  public formattedEndDate = null;

  constructor(
    private fsDatePickerCommon: FsDatePickerCommon,
    public fsDatePickerModel: FsDatePickerModel
  ) { }

  ngOnInit() {

  }

  ngOnChanges(changes) {

    this.formattedStartDate = null;
    this.formattedEndDate = null;

    if (!changes) {
      return;
    }

    if (changes.startDate && changes.startDate.currentValue) {
      this.formattedStartDate = {
        date: this.fsDatePickerCommon.formatSummary(changes.startDate.currentValue),
        time: this.fsDatePickerCommon.formatSummary(changes.startDate.currentValue, 'time')
      };
    }

    if (changes.endDate && changes.endDate.currentValue) {
      this.formattedEndDate = {
        date: this.fsDatePickerCommon.formatSummary(changes.endDate.currentValue),
        time: this.fsDatePickerCommon.formatSummary(changes.endDate.currentValue, 'time')
      };
    }
  }

  onComponentsChange(view) {
    this.componentsChange.emit(view);
  }
}

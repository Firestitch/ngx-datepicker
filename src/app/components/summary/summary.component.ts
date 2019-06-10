import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';

import { FsDatePickerModel } from '../../services/model.service';
import { formatSummary } from '../../helpers/format-summary';


@Component({
    selector: 'fs-date-picker-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss']
})
export class FsDatepickerSummaryComponent implements OnInit, OnChanges {

  @Input() public startDate = null;
  @Input() public endDate = null;
  @Input() public range: Boolean = false;
  @Input() public view;

  @Output() public componentsChange = new EventEmitter<any>();

  public formattedStartDate = null;
  public formattedEndDate = null;

  constructor(
    public fsDatePickerModel: FsDatePickerModel,
  ) { }

  public ngOnInit() {}

  public ngOnChanges(changes) {

    if (changes && changes.startDate && changes.startDate.currentValue) {
      if (this.view !== 'time' && this.view !== 'datetime') {
        this.formattedEndDate = null;
      }

      this.formattedStartDate = {
        date: formatSummary(changes.startDate.currentValue),
        time: formatSummary(changes.startDate.currentValue, 'time')
      };
    }

    if (changes && changes.endDate && changes.endDate.currentValue) {
      this.formattedEndDate = {
        date: formatSummary(changes.endDate.currentValue),
        time: formatSummary(changes.endDate.currentValue, 'time')
      };
    }
  }

  public onComponentsChange(view) {
    this.componentsChange.emit(view);
  }
}

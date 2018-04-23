import { EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FsDatePickerCommon } from './../../services/fsdatepickercommon.service';
import { FsDatePickerModel } from './../../services/fsdatepickermodel.service';
export declare class FsDatepickerSummaryComponent implements OnInit, OnChanges {
    private fsDatePickerCommon;
    fsDatePickerModel: FsDatePickerModel;
    startDate: any;
    endDate: any;
    componentsChange: EventEmitter<any>;
    formattedStartDate: any;
    formattedEndDate: any;
    constructor(fsDatePickerCommon: FsDatePickerCommon, fsDatePickerModel: FsDatePickerModel);
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    onComponentsChange(view: any): void;
}

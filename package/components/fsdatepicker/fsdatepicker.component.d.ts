import { ElementRef, OnInit } from '@angular/core';
import { FsDatePickerModel } from './../../services/fsdatepickermodel.service';
import { FsDatePickerCommon } from './../../services/fsdatepickercommon.service';
export declare class FsDatepickerComponent implements OnInit {
    fsDatePickerModel: FsDatePickerModel;
    private fsDatePickerCommon;
    element: ElementRef;
    parentInstance: any;
    model: any;
    calendarMonth: any;
    constructor(fsDatePickerModel: FsDatePickerModel, fsDatePickerCommon: FsDatePickerCommon, element: ElementRef);
    ngOnInit(): void;
    setDate(date: any): void;
    setDateMode(mode: any): void;
    setComponents(data: any): void;
    calendarDrawMonth(date: any): void;
    close($event?: any): void;
    documentKeydown(e: any): void;
}

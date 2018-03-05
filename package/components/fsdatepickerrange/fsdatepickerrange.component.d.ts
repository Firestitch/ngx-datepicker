import { ElementRef, IterableDiffers, OnInit, DoCheck } from '@angular/core';
import { FsUtil } from '@firestitch/common';
import { FsDatePickerModel } from './../../services/fsdatepickermodel.service';
export declare class FsDatepickerRangeComponent implements OnInit, DoCheck {
    fsDatePickerModel: FsDatePickerModel;
    element: ElementRef;
    fsUtil: FsUtil;
    private _iterableDiffers;
    parentInstance: any;
    toDisabledDays: any[];
    toDisabledTimes: any[];
    private modelDiffer;
    constructor(fsDatePickerModel: FsDatePickerModel, element: ElementRef, fsUtil: FsUtil, _iterableDiffers: IterableDiffers);
    ngOnInit(): void;
    ngDoCheck(): void;
    setStartDate(date: any): void;
    setEndDate(date: any): void;
    setDates(startDate: any, endDate: any): void;
    toDisabledDaysUpdate(startDate: any, endDate: any): void;
    toDisabledTimesUpdate(startDate: any, endDate: any): void;
    setDateModeStart(mode: any): void;
    setDateModeEnd(mode: any): void;
    close($event?: any): void;
    documentKeydown(e: any): void;
    range(type: any): void;
}

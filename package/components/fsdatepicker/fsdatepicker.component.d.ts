import { ElementRef, OnInit } from '@angular/core';
import { FsDatePickerModel } from './../../services/fsdatepickermodel.service';
export declare class FsDatepickerComponent implements OnInit {
    fsDatePickerModel: FsDatePickerModel;
    element: ElementRef;
    parentInstance: any;
    model: any;
    constructor(fsDatePickerModel: FsDatePickerModel, element: ElementRef);
    ngOnInit(): void;
    setDate(date: any): void;
    setDateMode(mode: any): void;
    close($event?: any): void;
    documentKeydown(e: any): void;
}

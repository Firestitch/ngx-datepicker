import { EventEmitter, ElementRef, IterableDiffers, OnInit, OnChanges, DoCheck, OnDestroy } from '@angular/core';
import { FsUtil } from '@firestitch/common';
import { FsDatePickerCommon } from './../../services/fsdatepickercommon.service';
import { FsDatePickerModel } from './../../services/fsdatepickermodel.service';
export declare class FsDatePickerCalendarComponent implements OnInit, OnChanges, DoCheck, OnDestroy {
    element: ElementRef;
    private fsDatePickerCommon;
    fsDatePickerModel: FsDatePickerModel;
    private fsUtil;
    private _iterableDiffers;
    date: any;
    dateToHighlight: any;
    dateMode: any;
    disabledDays: any;
    onChange: EventEmitter<any>;
    onDateModeChange: EventEmitter<any>;
    selected: {};
    iscrollOptions: any;
    iscrollInstance: any;
    month: any;
    years: any[];
    dateDays: any[];
    private highlightedRangeDays;
    private disabledDaysDiffer;
    monthList: {
        value: number;
        name: string;
        abr: string;
    }[];
    today: {
        date: any;
        month: any;
        year: number;
    };
    constructor(element: ElementRef, fsDatePickerCommon: FsDatePickerCommon, fsDatePickerModel: FsDatePickerModel, fsUtil: FsUtil, _iterableDiffers: IterableDiffers);
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    updateDaysHighlighted(): void;
    ngDoCheck(): void;
    private dateScroll;
    isDayDisabled(md: any): boolean;
    monthClick(month: any): void;
    monthViewChange(month: any): void;
    monthChange(month: any): void;
    createModel(): void;
    setDate(date: any): void;
    calendarView(): void;
    monthView(month: any): void;
    yearView(year: any): void;
    dayClick(day: any): void;
    yearViewChange(year: any): void;
    yearChange(year: any): void;
    previousMonth(month: any): void;
    nextMonth(month: any): void;
    drawMonths(date: any): void;
    createMonth(date: any): {
        name: any;
        number: any;
        year: any;
        moment: any;
        date: string;
        weeks: any[];
        months: {
            name: any;
            value: any;
        }[];
        years: any[];
    };
    updateDateDays(): any[];
    monthDateViewChange(): void;
    dayDateViewChange(): void;
    yearDateViewChange(): void;
    updateDate(): void;
    onMouseWheel($event: any): void;
    onTouchMove($event: any): void;
    ngOnDestroy(): void;
}

import { ElementRef, IterableDiffers, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { FsUtil } from '@firestitch/common';
export declare class FsDatepickerDialogComponent implements OnInit, DoCheck, OnDestroy {
    element: ElementRef;
    private FsUtil;
    private _iterableDiffers;
    month: any;
    years: any[];
    tab: string;
    parentInstance: any;
    hasDate: boolean;
    iscrollOptions: any;
    iscrollInstance: any;
    private disabledDaysDiffer;
    today: {
        date: any;
        month: any;
        year: number;
    };
    dateDays: any[];
    monthList: {
        value: number;
        name: string;
        abr: string;
    }[];
    timeHours: number[][];
    timeMinutes: number[][];
    private dateScroll;
    constructor(element: ElementRef, FsUtil: FsUtil, _iterableDiffers: IterableDiffers);
    ngOnInit(): void;
    ngDoCheck(): void;
    close($event?: any): void;
    onMouseWheel($event: any): void;
    onTouchMove($event: any): void;
    drawMonths(date: any): void;
    createModel(): void;
    setDate(date: any): void;
    createMoment(): any;
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
    isDayDisabled(md: any): boolean;
    calendarView(): void;
    monthView(month: any): void;
    yearView(year: any): void;
    documentKeydown(e: any): void;
    monthClick(month: any): void;
    yearClick(month: any): void;
    monthViewChange(month: any): void;
    monthChange(month: any): void;
    dayClick(day: any): void;
    yearViewChange(year: any): void;
    yearChange(year: any): void;
    previousMonth(month: any): void;
    nextMonth(month: any): void;
    ngOnDestroy(): void;
}

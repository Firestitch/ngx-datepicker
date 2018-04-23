export declare class FsDatePickerCommon {
    constructor();
    getSelected(date: any): {};
    isSameDay(startDate: any, endDate: any): boolean;
    createMoment(): any;
    getMomentSafe(date: any): any;
    positionDialog(dialog: any, elementRef: any): void;
    formatDateTimeRange(value: any, view?: string): string;
    formatDateTime(value: any, view?: string): string;
    formatSummary(date: any, view?: string): any;
    inputClick(e: any, callback: any): void;
}

import { FsUtil } from '@firestitch/common';
export declare class FsDatePickerCommon {
    private fsUtil;
    constructor(fsUtil: FsUtil);
    getSelected(date: any): {};
    createMoment(): any;
    positionDialog(dialog: any, elementRef: any): void;
    formatDateTimeRange(value: any, view?: string): string;
    formatDateTime(value: any, view?: string): string;
    inputClick(e: any, callback: any): void;
}

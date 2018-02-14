import { ElementRef, OnInit, OnDestroy } from '@angular/core';
export declare class FsIsscrollDirective implements OnInit, OnDestroy {
    private element;
    fsOptions: {};
    fsInstance: {};
    constructor(element: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
}

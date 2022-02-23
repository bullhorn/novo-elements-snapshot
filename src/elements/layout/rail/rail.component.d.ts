import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/overlay';
import { AfterContentInit, ElementRef, NgZone } from '@angular/core';
export declare class NovoRailComponent extends CdkScrollable implements AfterContentInit {
    constructor(elementRef: ElementRef<HTMLElement>, scrollDispatcher: ScrollDispatcher, ngZone: NgZone);
    ngAfterContentInit(): void;
}

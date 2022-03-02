import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/overlay';
import { AfterContentInit, ChangeDetectorRef, ElementRef, NgZone } from '@angular/core';
export declare class NovoLayoutContent extends CdkScrollable implements AfterContentInit {
    private _changeDetectorRef;
    _container: any;
    constructor(_changeDetectorRef: ChangeDetectorRef, _container: any, // NovoLayoutContainer
    elementRef: ElementRef<HTMLElement>, scrollDispatcher: ScrollDispatcher, ngZone: NgZone);
    ngAfterContentInit(): void;
    getHostElement(): HTMLElement;
}

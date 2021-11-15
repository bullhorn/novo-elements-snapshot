import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/overlay';
import { AfterContentInit, ChangeDetectorRef, ElementRef, NgZone } from '@angular/core';
import type { NovoLayoutContainer } from '../container/layout-container.component';
export declare class NovoLayoutContent extends CdkScrollable implements AfterContentInit {
    private _changeDetectorRef;
    _container: NovoLayoutContainer;
    constructor(_changeDetectorRef: ChangeDetectorRef, _container: NovoLayoutContainer, elementRef: ElementRef<HTMLElement>, scrollDispatcher: ScrollDispatcher, ngZone: NgZone);
    ngAfterContentInit(): void;
}

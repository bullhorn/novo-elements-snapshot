import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/overlay';
import { AfterContentInit, ChangeDetectorRef, ElementRef, NgZone } from '@angular/core';
import { NovoLayoutContainer } from '../container/layout-container.component';
import * as i0 from "@angular/core";
export declare class NovoLayoutContent extends CdkScrollable implements AfterContentInit {
    private _changeDetectorRef;
    _container: NovoLayoutContainer;
    constructor(_changeDetectorRef: ChangeDetectorRef, _container: NovoLayoutContainer, elementRef: ElementRef<HTMLElement>, scrollDispatcher: ScrollDispatcher, ngZone: NgZone);
    ngAfterContentInit(): void;
    static ɵfac: i0.ɵɵFactoryDef<NovoLayoutContent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoLayoutContent, "novo-layout-content", ["novoLayoutContent"], {}, {}, never, ["*"]>;
}

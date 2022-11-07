import { ElementRef, QueryList } from '@angular/core';
import { CanColor } from '../common/mixins';
import * as i0 from "@angular/core";
/** @docs-private */
declare const _NovoToolbarBase: import("../common/mixins").CanColorCtor & {
    new (_elementRef: ElementRef): {
        _elementRef: ElementRef;
    };
};
export declare class NovoToolbarRow extends _NovoToolbarBase implements CanColor {
    constructor(elementRef: ElementRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoToolbarRow, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoToolbarRow, "novo-toolbar-row", never, { "color": "color"; "gap": "gap"; }, {}, never>;
}
export declare class NovoToolbar extends _NovoToolbarBase implements CanColor {
    /** Reference to all toolbar row elements that have been projected. */
    _toolbarRows: QueryList<NovoToolbarRow>;
    constructor(elementRef: ElementRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoToolbar, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoToolbar, "novo-toolbar", never, { "color": "color"; "gap": "gap"; }, {}, ["_toolbarRows"], ["*", "novo-toolbar-row"]>;
}
export {};

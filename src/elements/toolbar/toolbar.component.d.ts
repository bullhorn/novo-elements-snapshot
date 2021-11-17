import { ElementRef, QueryList } from '@angular/core';
import { CanColor } from '../common/mixins';
/** @docs-private */
declare const _NovoToolbarBase: import("../common/mixins").Constructor<CanColor> & {
    new (_elementRef: ElementRef): {
        _elementRef: ElementRef;
    };
};
export declare class NovoToolbarRow extends _NovoToolbarBase implements CanColor {
    constructor(elementRef: ElementRef);
}
export declare class NovoToolbar extends _NovoToolbarBase implements CanColor {
    /** Reference to all toolbar row elements that have been projected. */
    _toolbarRows: QueryList<NovoToolbarRow>;
    constructor(elementRef: ElementRef);
}
export {};

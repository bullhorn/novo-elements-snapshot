import { EventEmitter, ElementRef, OnDestroy } from '@angular/core';
/**
 * Outside click helper, makes to set the element as inactive when clicking outside of it
 */
import * as ɵngcc0 from '@angular/core';
export declare class OutsideClick implements OnDestroy {
    element: ElementRef;
    otherElement: ElementRef;
    active: boolean;
    onOutsideClick: EventListenerOrEventListenerObject;
    onActiveChange: EventEmitter<boolean>;
    constructor(element: ElementRef);
    /**
     * When the element is destroyed, make sure to remove the handler
     */
    ngOnDestroy(): void;
    /**
     * Toggles the element as active and adds/removes the outside click handler
     */
    toggleActive(event?: MouseEvent, forceValue?: boolean): void;
    /**
     * When clicking outside, checks the element and closes if outside
     */
    handleOutsideClick(event: MouseEvent): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<OutsideClick, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<OutsideClick>;
}

//# sourceMappingURL=OutsideClick.d.ts.map
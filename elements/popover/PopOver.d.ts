import { OnChanges, ComponentRef, ViewContainerRef, ComponentFactoryResolver, EventEmitter, SimpleChange } from '@angular/core';
import { PopOverContent } from './PopOverContent';
import * as ɵngcc0 from '@angular/core';
export declare class PopOverDirective implements OnChanges {
    protected viewContainerRef: ViewContainerRef;
    protected resolver: ComponentFactoryResolver;
    protected PopoverComponent: typeof PopOverContent;
    protected popover: ComponentRef<PopOverContent>;
    protected visible: boolean;
    constructor(viewContainerRef: ViewContainerRef, resolver: ComponentFactoryResolver);
    content: string | PopOverContent;
    popoverDisabled: boolean;
    popoverAlways: boolean;
    popoverAnimation: boolean;
    popoverPlacement: string;
    popoverTitle: string;
    popoverOnHover: boolean;
    popoverDismissTimeout: number;
    onShown: EventEmitter<PopOverDirective>;
    onHidden: EventEmitter<PopOverDirective>;
    showOrHideOnClick(): void;
    showOnHover(): void;
    hideOnHover(): void;
    ngOnChanges(changes: {
        [propertyName: string]: SimpleChange;
    }): void;
    toggle(): void;
    show(): void;
    hide(): void;
    getElement(): any;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PopOverDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<PopOverDirective, "[popover]", never, { "popoverOnHover": "popoverOnHover"; "popoverDismissTimeout": "popoverDismissTimeout"; "content": "popover"; "popoverDisabled": "popoverDisabled"; "popoverAlways": "popoverAlways"; "popoverAnimation": "popoverAnimation"; "popoverPlacement": "popoverPlacement"; "popoverTitle": "popoverTitle"; }, { "onShown": "onShown"; "onHidden": "onHidden"; }, never>;
}

//# sourceMappingURL=PopOver.d.ts.map
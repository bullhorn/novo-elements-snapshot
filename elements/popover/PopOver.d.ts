import { ComponentFactoryResolver, ComponentRef, EventEmitter, OnChanges, SimpleChange, ViewContainerRef } from '@angular/core';
import { PopOverContent } from './PopOverContent';
import * as i0 from "@angular/core";
export declare class PopOverDirective implements OnChanges {
    protected viewContainerRef: ViewContainerRef;
    protected resolver: ComponentFactoryResolver;
    protected PopoverComponent: typeof PopOverContent;
    protected popover: ComponentRef<PopOverContent>;
    protected visible: boolean;
    constructor(viewContainerRef: ViewContainerRef, resolver: ComponentFactoryResolver);
    content: string | PopOverContent;
    set novoPopover(content: string | PopOverContent);
    popoverHtmlContent: string;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<PopOverDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<PopOverDirective, "[popover], [novoPopover]", never, { "content": "popover"; "novoPopover": "novoPopover"; "popoverHtmlContent": "popoverHtmlContent"; "popoverDisabled": "popoverDisabled"; "popoverAlways": "popoverAlways"; "popoverAnimation": "popoverAnimation"; "popoverPlacement": "popoverPlacement"; "popoverTitle": "popoverTitle"; "popoverOnHover": "popoverOnHover"; "popoverDismissTimeout": "popoverDismissTimeout"; }, { "onShown": "onShown"; "onHidden": "onHidden"; }, never>;
}

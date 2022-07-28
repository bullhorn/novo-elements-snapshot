import { Overlay } from '@angular/cdk/overlay';
import { ElementRef, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class TooltipDirective implements OnDestroy, OnInit {
    protected overlay: Overlay;
    private viewContainerRef;
    private elementRef;
    tooltip: string;
    position: string;
    type: string;
    size: string;
    bounce: boolean;
    noAnimate: boolean;
    rounded: boolean;
    always: boolean;
    active: boolean;
    preline: boolean;
    removeArrow: boolean;
    autoPosition: boolean;
    isHTML: boolean;
    private tooltipInstance;
    private portal;
    private overlayRef;
    constructor(overlay: Overlay, viewContainerRef: ViewContainerRef, elementRef: ElementRef);
    isPosition(position: string): boolean;
    isType(type: string): boolean;
    isSize(size: string): boolean;
    onMouseEnter(): void;
    onMouseLeave(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    private show;
    private hide;
    private getPosition;
    static ɵfac: i0.ɵɵFactoryDeclaration<TooltipDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TooltipDirective, "[tooltip]", never, { "tooltip": "tooltip"; "position": "tooltipPosition"; "type": "tooltipType"; "size": "tooltipSize"; "bounce": "tooltipBounce"; "noAnimate": "tooltipNoAnimate"; "rounded": "tooltipRounded"; "always": "tooltipAlways"; "active": "tooltipActive"; "preline": "tooltipPreline"; "removeArrow": "removeTooltipArrow"; "autoPosition": "tooltipAutoPosition"; "isHTML": "tooltipIsHTML"; }, {}, never>;
}

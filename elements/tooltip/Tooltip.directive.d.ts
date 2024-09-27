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
    closeOnClick: boolean;
    private tooltipInstance;
    private portal;
    private overlayRef;
    constructor(overlay: Overlay, viewContainerRef: ViewContainerRef, elementRef: ElementRef);
    isPosition(position: string): boolean;
    isType(type: string): boolean;
    isSize(size: string): boolean;
    onMouseEnter(): void;
    onMouseLeave(): void;
    onclick(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    show(): void;
    hide(): void;
    private getPosition;
    static ɵfac: i0.ɵɵFactoryDeclaration<TooltipDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TooltipDirective, "[tooltip]", never, { "tooltip": { "alias": "tooltip"; "required": false; }; "position": { "alias": "tooltipPosition"; "required": false; }; "type": { "alias": "tooltipType"; "required": false; }; "size": { "alias": "tooltipSize"; "required": false; }; "bounce": { "alias": "tooltipBounce"; "required": false; }; "noAnimate": { "alias": "tooltipNoAnimate"; "required": false; }; "rounded": { "alias": "tooltipRounded"; "required": false; }; "always": { "alias": "tooltipAlways"; "required": false; }; "active": { "alias": "tooltipActive"; "required": false; }; "preline": { "alias": "tooltipPreline"; "required": false; }; "removeArrow": { "alias": "removeTooltipArrow"; "required": false; }; "autoPosition": { "alias": "tooltipAutoPosition"; "required": false; }; "isHTML": { "alias": "tooltipIsHTML"; "required": false; }; "closeOnClick": { "alias": "tooltipCloseOnClick"; "required": false; }; }, {}, never, never, false, never>;
}

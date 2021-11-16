import { OnDestroy, ViewContainerRef, ElementRef, OnInit } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import * as ɵngcc0 from '@angular/core';
export declare class TooltipDirective implements OnDestroy, OnInit {
    protected overlay: Overlay;
    private viewContainerRef;
    private elementRef;
    tooltip: string;
    position: string;
    type: string;
    size: string;
    bounce: string;
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
    private withFallbackStrategy;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<TooltipDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<TooltipDirective, "[tooltip]", never, { "position": "tooltipPosition"; "type": "tooltipType"; "active": "tooltipActive"; "removeArrow": "removeTooltipArrow"; "autoPosition": "tooltipAutoPosition"; "tooltip": "tooltip"; "size": "tooltipSize"; "bounce": "tooltipBounce"; "noAnimate": "tooltipNoAnimate"; "rounded": "tooltipRounded"; "always": "tooltipAlways"; "preline": "tooltipPreline"; "isHTML": "tooltipIsHTML"; }, {}, never>;
}

//# sourceMappingURL=Tooltip.directive.d.ts.map
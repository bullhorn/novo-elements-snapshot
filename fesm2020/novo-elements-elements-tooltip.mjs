import { trigger, state, style, transition, animate } from '@angular/animations';
import * as i0 from '@angular/core';
import { Component, Directive, Input, HostListener, NgModule } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i1$1 from '@angular/cdk/overlay';
import { OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

// NG2
class NovoTooltip {
}
NovoTooltip.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTooltip, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoTooltip.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoTooltip, selector: "novo-tooltip", ngImport: i0, template: "<div *ngIf=\"this.isHTML\" [@state]=\"noAnimate ? 'no-animation' : 'visible'\"\n     [ngClass]=\"[tooltipType, rounded ? 'rounded' : '', size ? size : '', preline? 'preline' : '', bounce ? 'bounce' : '', position]\"\n     [innerHTML]=\"message\"></div>\n<div *ngIf=\"!this.isHTML\" [@state]=\"noAnimate ? 'no-animation' : 'visible'\"\n     [ngClass]=\"[tooltipType, rounded ? 'rounded' : '', size ? size : '', preline? 'preline' : '', bounce ? 'bounce' : '', position]\">{{message}}</div>", styles: ["novo-tooltip div{background:#383838;background:var(--tooltip-background-color, #383838);color:#fff;color:var(--color-white, #fff);border-radius:4px;border-radius:var(--tooltip-border-radius, 4px);padding:8px 10px;font-size:12px;line-height:12px;white-space:nowrap;box-shadow:var(--shadow-2)}novo-tooltip div.error{background-color:#b34e4d;background-color:var(--color-shade-error, #b34e4d)}novo-tooltip div.error.top-right:before,novo-tooltip div.error.top-left:before,novo-tooltip div.error.top:before{border-top-color:#b34e4d;border-top-color:var(--color-shade-error, #b34e4d)}novo-tooltip div.error.bottom-left:before,novo-tooltip div.error.bottom-right:before,novo-tooltip div.error.bottom:before{border-bottom-color:#b34e4d;border-bottom-color:var(--color-shade-error, #b34e4d)}novo-tooltip div.error.left:before{border-left-color:#b34e4d;border-left-color:var(--color-shade-error, #b34e4d)}novo-tooltip div.error.right:before{border-right-color:#b34e4d;border-right-color:var(--color-shade-error, #b34e4d)}novo-tooltip div.info{background-color:#3986ac;background-color:var(--color-shade-info, #3986ac)}novo-tooltip div.info.top-right:before,novo-tooltip div.info.top-left:before,novo-tooltip div.info.top:before{border-top-color:#3986ac;border-top-color:var(--color-shade-info, #3986ac)}novo-tooltip div.info.bottom-left:before,novo-tooltip div.info.bottom-right:before,novo-tooltip div.info.bottom:before{border-bottom-color:#3986ac;border-bottom-color:var(--color-shade-info, #3986ac)}novo-tooltip div.info.left:before{border-left-color:#3986ac;border-left-color:var(--color-shade-info, #3986ac)}novo-tooltip div.info.right:before{border-right-color:#3986ac;border-right-color:var(--color-shade-info, #3986ac)}novo-tooltip div.warning{background-color:#c09854;background-color:var(--color-shade-warning, #c09854)}novo-tooltip div.warning.top-right:before,novo-tooltip div.warning.top-left:before,novo-tooltip div.warning.top:before{border-top-color:#c09854;border-top-color:var(--color-shade-warning, #c09854)}novo-tooltip div.warning.bottom-left:before,novo-tooltip div.warning.bottom-right:before,novo-tooltip div.warning.bottom:before{border-bottom-color:#c09854;border-bottom-color:var(--color-shade-warning, #c09854)}novo-tooltip div.warning.left:before{border-left-color:#c09854;border-left-color:var(--color-shade-warning, #c09854)}novo-tooltip div.warning.right:before{border-right-color:#c09854;border-right-color:var(--color-shade-warning, #c09854)}novo-tooltip div.success{background-color:#458746;background-color:var(--color-shade-success, #458746)}novo-tooltip div.success.top-right:before,novo-tooltip div.success.top-left:before,novo-tooltip div.success.top:before{border-top-color:#458746;border-top-color:var(--color-shade-success, #458746)}novo-tooltip div.success.bottom-left:before,novo-tooltip div.success.bottom-right:before,novo-tooltip div.success.bottom:before{border-bottom-color:#458746;border-bottom-color:var(--color-shade-success, #458746)}novo-tooltip div.success.left:before{border-left-color:#458746;border-left-color:var(--color-shade-success, #458746)}novo-tooltip div.success.right:before{border-right-color:#458746;border-right-color:var(--color-shade-success, #458746)}novo-tooltip div.top-right:before,novo-tooltip div.top-left:before,novo-tooltip div.top:before{border-top-color:#383838;border-top-color:var(--tooltip-background-color, #383838)}novo-tooltip div.bottom-left:before,novo-tooltip div.bottom-right:before,novo-tooltip div.bottom:before{border-bottom-color:#383838;border-bottom-color:var(--tooltip-background-color, #383838)}novo-tooltip div.left:before{border-left-color:#383838;border-left-color:var(--tooltip-background-color, #383838)}novo-tooltip div.right:before{border-right-color:#383838;border-right-color:var(--tooltip-background-color, #383838)}novo-tooltip div.top:before{margin-bottom:-11px;left:calc(50% - 6px);bottom:0}novo-tooltip div.top-left:before{margin-right:0;margin-bottom:-11px;right:1px;bottom:0}novo-tooltip div.top-right:before{margin-left:0;margin-bottom:-11px;left:1px;bottom:0}novo-tooltip div.bottom:before{margin-top:-11px;left:calc(50% - 6px);top:0}novo-tooltip div.bottom-left:before{margin-right:0;margin-top:-11px;right:1px;top:0}novo-tooltip div.bottom-right:before{margin-left:0;margin-top:-11px;left:1px;top:0}novo-tooltip div.left:before{margin-right:-11px;margin-bottom:-6px;right:0;bottom:50%}novo-tooltip div.right:before{left:0;bottom:50%;margin-left:-11px;margin-bottom:-6px}novo-tooltip div:before{content:\"\";position:absolute;background:0 0;border:6px solid transparent;box-sizing:border-box}novo-tooltip div.extra-large,novo-tooltip div.large,novo-tooltip div.small,novo-tooltip div.medium{white-space:normal;line-height:1.4em;word-wrap:break-word}novo-tooltip div.extra-large{width:400px;font-size:1.2vh}novo-tooltip div.large{width:300px}novo-tooltip div.medium{width:150px}novo-tooltip div.small{width:80px}novo-tooltip div.preline{white-space:pre-line}novo-tooltip div.bounce{-webkit-animation:bounce .75s ease-in-out infinite;animation:bounce .75s ease-in-out infinite}@-webkit-keyframes bounce{0%{transform:translateY(0)}50%{transform:translateY(-10px)}to{transform:translateY(0)}}@keyframes bounce{0%{transform:translateY(0)}50%{transform:translateY(-10px)}to{transform:translateY(0)}}\n"], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], animations: [
        trigger('state', [
            state('initial, void, hidden', style({ opacity: '0' })),
            state('visible', style({ opacity: '1' })),
            transition('* => visible', [
                style({
                    opacity: 0,
                }),
                animate('0.3s 0.1s ease-in'),
            ]),
            transition('* => hidden', [
                style({
                    opacity: 1,
                }),
                animate('0.3s 0.1s ease-in'),
            ]),
        ]),
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTooltip, decorators: [{
            type: Component,
            args: [{ selector: 'novo-tooltip', animations: [
                        trigger('state', [
                            state('initial, void, hidden', style({ opacity: '0' })),
                            state('visible', style({ opacity: '1' })),
                            transition('* => visible', [
                                style({
                                    opacity: 0,
                                }),
                                animate('0.3s 0.1s ease-in'),
                            ]),
                            transition('* => hidden', [
                                style({
                                    opacity: 1,
                                }),
                                animate('0.3s 0.1s ease-in'),
                            ]),
                        ]),
                    ], template: "<div *ngIf=\"this.isHTML\" [@state]=\"noAnimate ? 'no-animation' : 'visible'\"\n     [ngClass]=\"[tooltipType, rounded ? 'rounded' : '', size ? size : '', preline? 'preline' : '', bounce ? 'bounce' : '', position]\"\n     [innerHTML]=\"message\"></div>\n<div *ngIf=\"!this.isHTML\" [@state]=\"noAnimate ? 'no-animation' : 'visible'\"\n     [ngClass]=\"[tooltipType, rounded ? 'rounded' : '', size ? size : '', preline? 'preline' : '', bounce ? 'bounce' : '', position]\">{{message}}</div>", styles: ["novo-tooltip div{background:#383838;background:var(--tooltip-background-color, #383838);color:#fff;color:var(--color-white, #fff);border-radius:4px;border-radius:var(--tooltip-border-radius, 4px);padding:8px 10px;font-size:12px;line-height:12px;white-space:nowrap;box-shadow:var(--shadow-2)}novo-tooltip div.error{background-color:#b34e4d;background-color:var(--color-shade-error, #b34e4d)}novo-tooltip div.error.top-right:before,novo-tooltip div.error.top-left:before,novo-tooltip div.error.top:before{border-top-color:#b34e4d;border-top-color:var(--color-shade-error, #b34e4d)}novo-tooltip div.error.bottom-left:before,novo-tooltip div.error.bottom-right:before,novo-tooltip div.error.bottom:before{border-bottom-color:#b34e4d;border-bottom-color:var(--color-shade-error, #b34e4d)}novo-tooltip div.error.left:before{border-left-color:#b34e4d;border-left-color:var(--color-shade-error, #b34e4d)}novo-tooltip div.error.right:before{border-right-color:#b34e4d;border-right-color:var(--color-shade-error, #b34e4d)}novo-tooltip div.info{background-color:#3986ac;background-color:var(--color-shade-info, #3986ac)}novo-tooltip div.info.top-right:before,novo-tooltip div.info.top-left:before,novo-tooltip div.info.top:before{border-top-color:#3986ac;border-top-color:var(--color-shade-info, #3986ac)}novo-tooltip div.info.bottom-left:before,novo-tooltip div.info.bottom-right:before,novo-tooltip div.info.bottom:before{border-bottom-color:#3986ac;border-bottom-color:var(--color-shade-info, #3986ac)}novo-tooltip div.info.left:before{border-left-color:#3986ac;border-left-color:var(--color-shade-info, #3986ac)}novo-tooltip div.info.right:before{border-right-color:#3986ac;border-right-color:var(--color-shade-info, #3986ac)}novo-tooltip div.warning{background-color:#c09854;background-color:var(--color-shade-warning, #c09854)}novo-tooltip div.warning.top-right:before,novo-tooltip div.warning.top-left:before,novo-tooltip div.warning.top:before{border-top-color:#c09854;border-top-color:var(--color-shade-warning, #c09854)}novo-tooltip div.warning.bottom-left:before,novo-tooltip div.warning.bottom-right:before,novo-tooltip div.warning.bottom:before{border-bottom-color:#c09854;border-bottom-color:var(--color-shade-warning, #c09854)}novo-tooltip div.warning.left:before{border-left-color:#c09854;border-left-color:var(--color-shade-warning, #c09854)}novo-tooltip div.warning.right:before{border-right-color:#c09854;border-right-color:var(--color-shade-warning, #c09854)}novo-tooltip div.success{background-color:#458746;background-color:var(--color-shade-success, #458746)}novo-tooltip div.success.top-right:before,novo-tooltip div.success.top-left:before,novo-tooltip div.success.top:before{border-top-color:#458746;border-top-color:var(--color-shade-success, #458746)}novo-tooltip div.success.bottom-left:before,novo-tooltip div.success.bottom-right:before,novo-tooltip div.success.bottom:before{border-bottom-color:#458746;border-bottom-color:var(--color-shade-success, #458746)}novo-tooltip div.success.left:before{border-left-color:#458746;border-left-color:var(--color-shade-success, #458746)}novo-tooltip div.success.right:before{border-right-color:#458746;border-right-color:var(--color-shade-success, #458746)}novo-tooltip div.top-right:before,novo-tooltip div.top-left:before,novo-tooltip div.top:before{border-top-color:#383838;border-top-color:var(--tooltip-background-color, #383838)}novo-tooltip div.bottom-left:before,novo-tooltip div.bottom-right:before,novo-tooltip div.bottom:before{border-bottom-color:#383838;border-bottom-color:var(--tooltip-background-color, #383838)}novo-tooltip div.left:before{border-left-color:#383838;border-left-color:var(--tooltip-background-color, #383838)}novo-tooltip div.right:before{border-right-color:#383838;border-right-color:var(--tooltip-background-color, #383838)}novo-tooltip div.top:before{margin-bottom:-11px;left:calc(50% - 6px);bottom:0}novo-tooltip div.top-left:before{margin-right:0;margin-bottom:-11px;right:1px;bottom:0}novo-tooltip div.top-right:before{margin-left:0;margin-bottom:-11px;left:1px;bottom:0}novo-tooltip div.bottom:before{margin-top:-11px;left:calc(50% - 6px);top:0}novo-tooltip div.bottom-left:before{margin-right:0;margin-top:-11px;right:1px;top:0}novo-tooltip div.bottom-right:before{margin-left:0;margin-top:-11px;left:1px;top:0}novo-tooltip div.left:before{margin-right:-11px;margin-bottom:-6px;right:0;bottom:50%}novo-tooltip div.right:before{left:0;bottom:50%;margin-left:-11px;margin-bottom:-6px}novo-tooltip div:before{content:\"\";position:absolute;background:0 0;border:6px solid transparent;box-sizing:border-box}novo-tooltip div.extra-large,novo-tooltip div.large,novo-tooltip div.small,novo-tooltip div.medium{white-space:normal;line-height:1.4em;word-wrap:break-word}novo-tooltip div.extra-large{width:400px;font-size:1.2vh}novo-tooltip div.large{width:300px}novo-tooltip div.medium{width:150px}novo-tooltip div.small{width:80px}novo-tooltip div.preline{white-space:pre-line}novo-tooltip div.bounce{-webkit-animation:bounce .75s ease-in-out infinite;animation:bounce .75s ease-in-out infinite}@-webkit-keyframes bounce{0%{transform:translateY(0)}50%{transform:translateY(-10px)}to{transform:translateY(0)}}@keyframes bounce{0%{transform:translateY(0)}50%{transform:translateY(-10px)}to{transform:translateY(0)}}\n"] }]
        }] });

// NG
class TooltipDirective {
    constructor(overlay, viewContainerRef, elementRef) {
        this.overlay = overlay;
        this.viewContainerRef = viewContainerRef;
        this.elementRef = elementRef;
        this.position = 'top';
        this.type = 'normal';
        this.active = true;
        this.removeArrow = false;
        this.autoPosition = true;
    }
    isPosition(position) {
        return position.toLowerCase() === (this.position || '').toLowerCase();
    }
    isType(type) {
        return type.toLowerCase() === (this.type || '').toLowerCase();
    }
    isSize(size) {
        return size.toLowerCase() === (this.size || '').toLowerCase();
    }
    onMouseEnter() {
        if (this.tooltip && this.active && !this.always) {
            this.show();
        }
    }
    onMouseLeave() {
        if (this.overlayRef && !this.always) {
            this.hide();
            this.overlayRef.dispose();
        }
    }
    ngOnInit() {
        if (this.tooltip && this.always && this.active) {
            this.show();
        }
    }
    ngOnDestroy() {
        if (this.overlayRef && !this.always) {
            this.hide();
            this.overlayRef.dispose();
        }
    }
    show() {
        const overlayState = new OverlayConfig();
        overlayState.positionStrategy = this.getPosition();
        if (this.always) {
            overlayState.scrollStrategy = this.overlay.scrollStrategies.reposition();
        }
        else {
            overlayState.scrollStrategy = this.overlay.scrollStrategies.close();
        }
        overlayState.scrollStrategy.enable();
        this.overlayRef = this.overlay.create(overlayState);
        this.overlayRef.detach();
        this.portal = this.portal || new ComponentPortal(NovoTooltip, this.viewContainerRef);
        const tooltipInstance = this.overlayRef.attach(this.portal).instance;
        tooltipInstance.message = this.tooltip;
        tooltipInstance.tooltipType = this.type;
        tooltipInstance.rounded = this.rounded;
        tooltipInstance.size = this.size;
        tooltipInstance.preline = this.preline;
        tooltipInstance.noAnimate = this.noAnimate;
        tooltipInstance.position = this.removeArrow ? 'no-arrow' : this.position;
        tooltipInstance.isHTML = this.isHTML;
        tooltipInstance.bounce = this.bounce;
    }
    hide() {
        if (this.overlayRef) {
            this.overlayRef.detach();
        }
    }
    getPosition() {
        let strategy;
        let defaultPosition;
        let offsetX;
        let offsetY;
        let autoPositions = [
            { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetX: 0, offsetY: 12 },
            { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetX: 0, offsetY: 12 },
            { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: 12, offsetY: 0 },
            { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -12, offsetY: 0 },
            { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetX: 0, offsetY: -12 },
            { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetX: 0, offsetY: 12 },
            { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetX: 0, offsetY: -12 },
            { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetX: 0, offsetY: -12 },
            { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetX: 12, offsetY: -12 },
            { originX: 'start', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetX: 12, offsetY: 12 },
            { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetX: -12, offsetY: -12 },
            { originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetX: -12, offsetY: 12 },
        ];
        switch (this.position) {
            case 'right':
                defaultPosition = { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center' };
                offsetX = 12;
                offsetY = 0;
                break;
            case 'bottom':
                defaultPosition = { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top' };
                offsetX = 0;
                offsetY = 12;
                break;
            case 'top':
                defaultPosition = { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom' };
                offsetX = 0;
                offsetY = -12;
                break;
            case 'left':
                defaultPosition = { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center' };
                offsetX = -12;
                offsetY = 0;
                break;
            case 'top-left':
                defaultPosition = { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'bottom' };
                offsetX = 12;
                offsetY = -12;
                break;
            case 'bottom-left':
                defaultPosition = { originX: 'start', originY: 'bottom', overlayX: 'end', overlayY: 'top' };
                offsetX = 12;
                offsetY = 12;
                break;
            case 'top-right':
                defaultPosition = { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'bottom' };
                offsetX = -12;
                offsetY = -12;
                break;
            case 'bottom-right':
                defaultPosition = { originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'top' };
                offsetX = -12;
                offsetY = 12;
                break;
            default:
                break;
        }
        const allPositions = this.autoPosition ? [defaultPosition].concat(autoPositions) : [defaultPosition];
        strategy = this.overlay
            .position()
            .flexibleConnectedTo(this.elementRef)
            .withFlexibleDimensions(false)
            .withDefaultOffsetX(offsetX)
            .withDefaultOffsetY(offsetY)
            .withPositions(allPositions);
        return strategy;
    }
}
TooltipDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TooltipDirective, deps: [{ token: i1$1.Overlay }, { token: i0.ViewContainerRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
TooltipDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: TooltipDirective, selector: "[tooltip]", inputs: { tooltip: "tooltip", position: ["tooltipPosition", "position"], type: ["tooltipType", "type"], size: ["tooltipSize", "size"], bounce: ["tooltipBounce", "bounce"], noAnimate: ["tooltipNoAnimate", "noAnimate"], rounded: ["tooltipRounded", "rounded"], always: ["tooltipAlways", "always"], active: ["tooltipActive", "active"], preline: ["tooltipPreline", "preline"], removeArrow: ["removeTooltipArrow", "removeArrow"], autoPosition: ["tooltipAutoPosition", "autoPosition"], isHTML: ["tooltipIsHTML", "isHTML"] }, host: { listeners: { "mouseenter": "onMouseEnter()", "mouseleave": "onMouseLeave()", "blur": "hide()" }, properties: { "attr.data-hint": "tooltip" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TooltipDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[tooltip]',
                    host: {
                        '[attr.data-hint]': 'tooltip',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i1$1.Overlay }, { type: i0.ViewContainerRef }, { type: i0.ElementRef }]; }, propDecorators: { tooltip: [{
                type: Input
            }], position: [{
                type: Input,
                args: ['tooltipPosition']
            }], type: [{
                type: Input,
                args: ['tooltipType']
            }], size: [{
                type: Input,
                args: ['tooltipSize']
            }], bounce: [{
                type: Input,
                args: ['tooltipBounce']
            }], noAnimate: [{
                type: Input,
                args: ['tooltipNoAnimate']
            }], rounded: [{
                type: Input,
                args: ['tooltipRounded']
            }], always: [{
                type: Input,
                args: ['tooltipAlways']
            }], active: [{
                type: Input,
                args: ['tooltipActive']
            }], preline: [{
                type: Input,
                args: ['tooltipPreline']
            }], removeArrow: [{
                type: Input,
                args: ['removeTooltipArrow']
            }], autoPosition: [{
                type: Input,
                args: ['tooltipAutoPosition']
            }], isHTML: [{
                type: Input,
                args: ['tooltipIsHTML']
            }], onMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }], onMouseLeave: [{
                type: HostListener,
                args: ['mouseleave']
            }], hide: [{
                type: HostListener,
                args: ['blur']
            }] } });

// NG2
class NovoTooltipModule {
}
NovoTooltipModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTooltipModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoTooltipModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTooltipModule, declarations: [TooltipDirective, NovoTooltip], imports: [CommonModule], exports: [TooltipDirective] });
NovoTooltipModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTooltipModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTooltipModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [TooltipDirective, NovoTooltip],
                    exports: [TooltipDirective],
                    imports: [CommonModule],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoTooltip, NovoTooltipModule, TooltipDirective };
//# sourceMappingURL=novo-elements-elements-tooltip.mjs.map

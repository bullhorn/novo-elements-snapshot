import * as i0 from '@angular/core';
import { EventEmitter, Component, Input, ViewChild, Directive, Output, HostListener, NgModule } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';

class PopOverContent {
    constructor(element, cdr) {
        this.element = element;
        this.cdr = cdr;
        this.placement = 'top';
        this.animation = true;
        this.onCloseFromOutside = new EventEmitter();
        this.top = -10000;
        this.left = -10000;
        this.displayType = 'none';
        this.isHidden = false;
    }
    ngAfterViewInit() {
        this.show();
        this.cdr.detectChanges();
    }
    toggle() {
        if (this.isHidden) {
            this.show();
        }
        else {
            this.hide();
        }
    }
    show() {
        if (!this.popover || !this.popover.getElement()) {
            return;
        }
        const p = this.positionElements(this.popover.getElement(), this.popoverDiv.nativeElement, this.placement);
        this.displayType = 'block';
        this.top = p.top;
        this.left = p.left;
        this.isHidden = false;
    }
    hide() {
        this.top = -10000;
        this.left = -10000;
        this.isHidden = true;
        this.popover.hide();
    }
    hideFromPopover() {
        this.top = -10000;
        this.left = -10000;
    }
    positionElements(hostEl, targetEl, positionStr, appendToBody = false) {
        const positionStrParts = positionStr.split('-');
        const mainSide = (this.effectivePlacement = this.getEffectivePlacement(positionStrParts[0] || 'right', hostEl, targetEl));
        const orientation = (this.effectiveAlignment = positionStrParts[1] || 'center');
        const hostElPos = appendToBody ? this.offset(hostEl) : this.position(hostEl);
        const targetElWidth = targetEl.offsetWidth;
        const targetElHeight = targetEl.offsetHeight;
        const shiftWidth = {
            center() {
                return hostElPos.left + (hostElPos.width - targetElWidth) / 2;
            },
            right() {
                return hostElPos.left;
            },
            left() {
                return hostElPos.left + (hostElPos.width - targetElWidth);
            },
        };
        const shiftHeight = {
            center() {
                return hostElPos.top + (hostElPos.height - targetElHeight) / 2;
            },
            bottom() {
                return hostElPos.top;
            },
            top() {
                return hostElPos.top + (hostElPos.height - targetElHeight);
            },
        };
        let targetElPos;
        switch (mainSide) {
            case 'right':
                targetElPos = {
                    top: shiftHeight[orientation](),
                    left: hostElPos.left + hostElPos.width,
                };
                break;
            case 'left':
                targetElPos = {
                    top: shiftHeight[orientation](),
                    left: hostElPos.left - targetElWidth,
                };
                break;
            case 'bottom':
                targetElPos = {
                    top: hostElPos.top + hostElPos.height,
                    left: shiftWidth[orientation](),
                };
                break;
            default:
                targetElPos = {
                    top: hostElPos.top - targetElHeight,
                    left: shiftWidth[orientation](),
                };
                break;
        }
        return targetElPos;
    }
    position(nativeEl) {
        let offsetParentBCR = { top: 0, left: 0 };
        const elBCR = this.offset(nativeEl);
        const offsetParentEl = this.parentOffsetEl(nativeEl);
        if (offsetParentEl !== window.document) {
            offsetParentBCR = this.offset(offsetParentEl);
            offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
            offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
        }
        const boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: elBCR.top - offsetParentBCR.top,
            left: elBCR.left - offsetParentBCR.left,
        };
    }
    offset(nativeEl) {
        const boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: boundingClientRect.top + (window.pageYOffset || window.document.documentElement.scrollTop),
            left: boundingClientRect.left + (window.pageXOffset || window.document.documentElement.scrollLeft),
        };
    }
    getStyle(nativeEl, cssProp) {
        if (nativeEl.currentStyle) {
            return nativeEl.currentStyle[cssProp];
        }
        if (window.getComputedStyle) {
            return window.getComputedStyle(nativeEl)[cssProp];
        }
        return nativeEl.style[cssProp];
    }
    isStaticPositioned(nativeEl) {
        return (this.getStyle(nativeEl, 'position') || 'static') === 'static';
    }
    parentOffsetEl(nativeEl) {
        let offsetParent = nativeEl.offsetParent || window.document;
        while (offsetParent && offsetParent !== window.document && this.isStaticPositioned(offsetParent)) {
            offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || window.document;
    }
    getEffectivePlacement(desiredPlacement, hostElement, targetElement) {
        const hostElBoundingRect = hostElement.getBoundingClientRect();
        if (desiredPlacement === 'top' && hostElBoundingRect.top - targetElement.offsetHeight < 0) {
            return 'bottom';
        }
        if (desiredPlacement === 'bottom' && hostElBoundingRect.bottom + targetElement.offsetHeight > window.innerHeight) {
            return 'top';
        }
        if (desiredPlacement === 'left' && hostElBoundingRect.left - targetElement.offsetWidth < 0) {
            return 'right';
        }
        if (desiredPlacement === 'right' && hostElBoundingRect.right + targetElement.offsetWidth > window.innerWidth) {
            return 'left';
        }
        return desiredPlacement;
    }
}
PopOverContent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: PopOverContent, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
PopOverContent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: PopOverContent, selector: "popover-content", inputs: { content: "content", htmlContent: "htmlContent", placement: "placement", title: "title", animation: "animation" }, viewQueries: [{ propertyName: "popoverDiv", first: true, predicate: ["popoverDiv"], descendants: true }], ngImport: i0, template: `
    <div
      #popoverDiv
      class="popover {{ effectivePlacement }}"
      [style.top]="top + 'px'"
      [style.left]="left + 'px'"
      [class.fade]="animation"
      style="display: block"
      role="popover"
    >
      <div class="arrow {{ effectiveAlignment }}"></div>
      <div class="popover-title" [hidden]="!title">{{ title }}</div>
      <div class="popover-content">
        <ng-content></ng-content>
        <div *ngIf="htmlContent" class="popover-content-text" [innerHTML]="htmlContent"></div>
        <div *ngIf="!htmlContent" class="popover-content-text">{{ content }}</div>
      </div>
    </div>
  `, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: PopOverContent, decorators: [{
            type: Component,
            args: [{
                    selector: 'popover-content',
                    template: `
    <div
      #popoverDiv
      class="popover {{ effectivePlacement }}"
      [style.top]="top + 'px'"
      [style.left]="left + 'px'"
      [class.fade]="animation"
      style="display: block"
      role="popover"
    >
      <div class="arrow {{ effectiveAlignment }}"></div>
      <div class="popover-title" [hidden]="!title">{{ title }}</div>
      <div class="popover-content">
        <ng-content></ng-content>
        <div *ngIf="htmlContent" class="popover-content-text" [innerHTML]="htmlContent"></div>
        <div *ngIf="!htmlContent" class="popover-content-text">{{ content }}</div>
      </div>
    </div>
  `,
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { content: [{
                type: Input
            }], htmlContent: [{
                type: Input
            }], placement: [{
                type: Input
            }], title: [{
                type: Input
            }], animation: [{
                type: Input
            }], popoverDiv: [{
                type: ViewChild,
                args: ['popoverDiv']
            }] } });

// NG2
class PopOverDirective {
    constructor(viewContainerRef, resolver) {
        this.viewContainerRef = viewContainerRef;
        this.resolver = resolver;
        this.PopoverComponent = PopOverContent;
        this.popoverOnHover = false;
        this.popoverDismissTimeout = 0;
        this.onShown = new EventEmitter();
        this.onHidden = new EventEmitter();
    }
    set novoPopover(content) {
        this.content = content;
    }
    // ---------------------------------------------------
    // Event listeners
    // ---------------------------------------------------
    showOrHideOnClick() {
        if (this.popoverOnHover || this.popoverDisabled) {
            return;
        }
        this.toggle();
    }
    showOnHover() {
        if (!this.popoverOnHover || this.popoverDisabled) {
            return;
        }
        this.show();
    }
    hideOnHover() {
        if (!this.popoverOnHover || this.popoverDisabled) {
            return;
        }
        this.hide();
    }
    ngOnChanges(changes) {
        if (changes.popoverDisabled) {
            if (changes.popoverDisabled.currentValue) {
                this.hide();
            }
        }
        if (changes.popoverAlways) {
            if (changes.popoverAlways.currentValue) {
                this.show();
            }
        }
    }
    toggle() {
        if (!this.visible) {
            this.show();
        }
        else {
            this.hide();
        }
    }
    show() {
        if (this.visible || (!this.content && !this.popoverHtmlContent)) {
            return;
        }
        this.visible = true;
        if (typeof this.content === 'string' || this.popoverHtmlContent) {
            const factory = this.resolver.resolveComponentFactory(this.PopoverComponent);
            if (!this.visible) {
                return;
            }
            this.popover = this.viewContainerRef.createComponent(factory);
            const popover = this.popover.instance;
            popover.popover = this;
            if (this.content) {
                popover.content = this.content;
            }
            if (this.popoverHtmlContent) {
                popover.htmlContent = this.popoverHtmlContent;
            }
            if (this.popoverPlacement !== undefined) {
                popover.placement = this.popoverPlacement;
            }
            if (this.popoverAnimation !== undefined) {
                popover.animation = this.popoverAnimation;
            }
            if (this.popoverTitle !== undefined) {
                popover.title = this.popoverTitle;
            }
            popover.onCloseFromOutside.subscribe(() => this.hide());
            if (this.popoverDismissTimeout > 0) {
                setTimeout(() => this.hide(), this.popoverDismissTimeout);
            }
        }
        else {
            const popover = this.content;
            popover.popover = this;
            if (this.popoverPlacement !== undefined) {
                popover.placement = this.popoverPlacement;
            }
            if (this.popoverAnimation !== undefined) {
                popover.animation = this.popoverAnimation;
            }
            if (this.popoverTitle !== undefined) {
                popover.title = this.popoverTitle;
            }
            popover.onCloseFromOutside.subscribe(() => this.hide());
            if (this.popoverDismissTimeout > 0) {
                setTimeout(() => this.hide(), this.popoverDismissTimeout);
            }
            popover.show();
        }
        this.onShown.emit(this);
    }
    hide() {
        if (!this.visible) {
            return;
        }
        this.visible = false;
        if (this.popover) {
            this.popover.destroy();
        }
        if (this.content instanceof PopOverContent) {
            this.content.hideFromPopover();
        }
        this.onHidden.emit(this);
    }
    getElement() {
        return this.viewContainerRef.element.nativeElement;
    }
}
PopOverDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: PopOverDirective, deps: [{ token: i0.ViewContainerRef }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.Directive });
PopOverDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: PopOverDirective, selector: "[popover], [novoPopover]", inputs: { content: ["popover", "content"], novoPopover: "novoPopover", popoverHtmlContent: "popoverHtmlContent", popoverDisabled: "popoverDisabled", popoverAlways: "popoverAlways", popoverAnimation: "popoverAnimation", popoverPlacement: "popoverPlacement", popoverTitle: "popoverTitle", popoverOnHover: "popoverOnHover", popoverDismissTimeout: "popoverDismissTimeout" }, outputs: { onShown: "onShown", onHidden: "onHidden" }, host: { listeners: { "click": "showOrHideOnClick()", "focusin": "showOnHover()", "mouseenter": "showOnHover()", "focusout": "hideOnHover()", "mouseleave": "hideOnHover()" } }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: PopOverDirective, decorators: [{
            type: Directive,
            args: [{
                    /**
                     *  [popover] selector retained for backwards compatability, but should be avoived as
                     *  it interferes with the newly added (2023) HTML standard spec popover attribute.
                     */
                    selector: '[popover], [novoPopover]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i0.ComponentFactoryResolver }]; }, propDecorators: { content: [{
                type: Input,
                args: ['popover']
            }], novoPopover: [{
                type: Input,
                args: ['novoPopover']
            }], popoverHtmlContent: [{
                type: Input
            }], popoverDisabled: [{
                type: Input
            }], popoverAlways: [{
                type: Input
            }], popoverAnimation: [{
                type: Input
            }], popoverPlacement: [{
                type: Input
            }], popoverTitle: [{
                type: Input
            }], popoverOnHover: [{
                type: Input
            }], popoverDismissTimeout: [{
                type: Input
            }], onShown: [{
                type: Output
            }], onHidden: [{
                type: Output
            }], showOrHideOnClick: [{
                type: HostListener,
                args: ['click']
            }], showOnHover: [{
                type: HostListener,
                args: ['focusin']
            }, {
                type: HostListener,
                args: ['mouseenter']
            }], hideOnHover: [{
                type: HostListener,
                args: ['focusout']
            }, {
                type: HostListener,
                args: ['mouseleave']
            }] } });

// NG2
class NovoPopOverModule {
}
NovoPopOverModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPopOverModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoPopOverModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPopOverModule, declarations: [PopOverContent, PopOverDirective], imports: [CommonModule], exports: [PopOverContent, PopOverDirective] });
NovoPopOverModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPopOverModule, imports: [[
            CommonModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPopOverModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [PopOverContent, PopOverDirective],
                    exports: [PopOverContent, PopOverDirective],
                    imports: [
                        CommonModule
                    ]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoPopOverModule, PopOverContent, PopOverDirective };
//# sourceMappingURL=novo-elements-elements-popover.mjs.map

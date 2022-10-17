import * as i0 from '@angular/core';
import { EventEmitter, Component, Input, ViewChild, Directive, Output, HostListener, NgModule } from '@angular/core';

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
PopOverContent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: PopOverContent, selector: "popover-content", inputs: { content: "content", placement: "placement", title: "title", animation: "animation" }, viewQueries: [{ propertyName: "popoverDiv", first: true, predicate: ["popoverDiv"], descendants: true }], ngImport: i0, template: `
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
        <div class="popover-content-text">{{ content }}</div>
      </div>
    </div>
  `, isInline: true, styles: [":host .popover{position:absolute;top:0;left:0;z-index:1000;display:none;width:40rem;padding:2rem;background-color:var(--color-background);color:var(--color-text);background-clip:padding-box;box-shadow:var(--shadow-z2)}:host .popover.top{margin-top:-1rem}:host .popover.top.virtual-area{bottom:-1.1rem}:host .popover.right{margin-left:1rem}:host .popover.right.virtual-area{left:-1.1rem}:host .popover.bottom{margin-top:1rem}:host .popover.bottom.virtual-area{top:-1.1rem}:host .popover.left{margin-left:-1rem}:host .popover.left.virtual-area{right:-1.1rem}:host .popover .virtual-area{height:1.1rem;width:100%;position:absolute}:host .popover.top>.arrow{margin-left:-9px;border-bottom-width:0;border-top-color:#0000001a;bottom:-9px}:host .popover.top>.arrow:before{content:\" \";bottom:1px;margin-left:-1rem;border-bottom-width:0;border-top-color:var(--color-background)}:host .popover.top>.arrow.center{left:50%}:host .popover.top>.arrow.left{left:91%}:host .popover.top>.arrow.right{left:9%}:host .popover.right>.arrow{left:-9px;margin-top:-9px;border-left-width:0;border-right-color:#0000001a}:host .popover.right>.arrow:before{content:\" \";left:1px;bottom:-1rem;border-left-width:0;border-right-color:var(--color-background)}:host .popover.right>.arrow.center{top:50%}:host .popover.right>.arrow.top{top:91%}:host .popover.right>.arrow.bottom{top:9%}:host .popover.bottom>.arrow{margin-left:-9px;border-top-width:0;border-bottom-color:#0000001a;top:-9px}:host .popover.bottom>.arrow:before{content:\" \";top:1px;margin-left:-1rem;border-top-width:0;border-bottom-color:var(--color-background)}:host .popover.bottom>.arrow.center{left:50%}:host .popover.bottom>.arrow.left{left:91%}:host .popover.bottom>.arrow.right{left:9%}:host .popover.left>.arrow{right:-9px;margin-top:-9px;border-right-width:0;border-left-color:#0000001a}:host .popover.left>.arrow:before{content:\" \";right:1px;border-right-width:0;border-left-color:var(--color-background);bottom:-1rem}:host .popover.left>.arrow.center{top:50%}:host .popover.left>.arrow.top{top:91%}:host .popover.left>.arrow.bottom{top:9%}:host .popover>.arrow{border-width:9px}:host .popover>.arrow,:host .popover>.arrow:before{position:absolute;display:block;width:0;height:0;border-color:transparent;border-style:solid}:host .popover>.arrow:before{border-width:1rem;content:\"\"}:host .popover-title{font-weight:500;line-height:1.5;color:var(--color-text);white-space:nowrap;text-overflow:ellipsis;font-size:var(--font-size-title);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;margin-bottom:1rem}:host .popover-title.text-capitalize{text-transform:capitalize}:host .popover-title.text-uppercase{text-transform:uppercase}:host .popover-title.text-nowrap{white-space:nowrap}:host .popover-title.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .popover-title.text-size-default{font-size:inherit}:host .popover-title.text-size-body{font-size:var(--font-size-body)}:host .popover-title.text-size-xs{font-size:var(--font-size-xs)}:host .popover-title.text-size-sm{font-size:var(--font-size-sm)}:host .popover-title.text-size-md{font-size:var(--font-size-md)}:host .popover-title.text-size-lg{font-size:var(--font-size-lg)}:host .popover-title.text-size-xl{font-size:var(--font-size-xl)}:host .popover-title.text-size-2xl{font-size:var(--font-size-2xl)}:host .popover-title.text-size-3xl{font-size:var(--font-size-3xl)}:host .popover-title.text-size-smaller{font-size:.8em}:host .popover-title.text-size-larger{font-size:1.2em}:host .popover-title.text-color-person{color:var(--color-person)}:host .popover-title.text-color-company{color:var(--color-company)}:host .popover-title.text-color-candidate{color:var(--color-candidate)}:host .popover-title.text-color-lead{color:var(--color-lead)}:host .popover-title.text-color-contact{color:var(--color-contact)}:host .popover-title.text-color-clientcontact{color:var(--color-clientcontact)}:host .popover-title.text-color-opportunity{color:var(--color-opportunity)}:host .popover-title.text-color-job{color:var(--color-job)}:host .popover-title.text-color-joborder{color:var(--color-joborder)}:host .popover-title.text-color-submission{color:var(--color-submission)}:host .popover-title.text-color-sendout{color:var(--color-sendout)}:host .popover-title.text-color-placement{color:var(--color-placement)}:host .popover-title.text-color-note{color:var(--color-note)}:host .popover-title.text-color-task{color:var(--color-task)}:host .popover-title.text-color-distribution-list{color:var(--color-distribution-list)}:host .popover-title.text-color-credential{color:var(--color-credential)}:host .popover-title.text-color-user{color:var(--color-user)}:host .popover-title.text-color-corporate-user{color:var(--color-corporate-user)}:host .popover-title.text-color-contract{color:var(--color-contract)}:host .popover-title.text-color-job-code{color:var(--color-job-code)}:host .popover-title.text-color-earn-code{color:var(--color-earn-code)}:host .popover-title.text-color-billable-charge{color:var(--color-billable-charge)}:host .popover-title.text-color-payable-charge{color:var(--color-payable-charge)}:host .popover-title.text-color-invoice-statement{color:var(--color-invoice-statement)}:host .popover-title.text-color-selection{color:var(--color-selection)}:host .popover-title.text-color-positive{color:var(--color-positive)}:host .popover-title.text-color-success{color:var(--color-success)}:host .popover-title.text-color-warning{color:var(--color-warning)}:host .popover-title.text-color-error{color:var(--color-error)}:host .popover-title.text-color-info{color:var(--color-info)}:host .popover-title.text-color-disabled{color:var(--color-disabled)}:host .popover-title.text-color-red{color:var(--palette-red-50)}:host .popover-title.text-color-pink{color:var(--palette-pink-50)}:host .popover-title.text-color-orange{color:var(--palette-orange-50)}:host .popover-title.text-color-yellow{color:var(--palette-yellow-50)}:host .popover-title.text-color-green{color:var(--palette-green-50)}:host .popover-title.text-color-teal{color:var(--palette-teal-50)}:host .popover-title.text-color-blue{color:var(--palette-blue-50)}:host .popover-title.text-color-aqua{color:var(--palette-aqua-50)}:host .popover-title.text-color-indigo{color:var(--palette-indigo-50)}:host .popover-title.text-color-violet{color:var(--palette-violet-50)}:host .popover-title.text-color-gray{color:var(--palette-gray-50)}:host .popover-title.margin-before{margin-top:.4rem}:host .popover-title.margin-after{margin-bottom:.8rem}:host .popover-title.text-length-small{max-width:40ch}:host .popover-title.text-length-medium{max-width:55ch}:host .popover-title.text-length-large{max-width:70ch}:host .popover-title.text-weight-hairline{font-weight:100}:host .popover-title.text-weight-thin{font-weight:200}:host .popover-title.text-weight-light{font-weight:300}:host .popover-title.text-weight-normal{font-weight:400}:host .popover-title.text-weight-medium{font-weight:500}:host .popover-title.text-weight-semibold{font-weight:600}:host .popover-title.text-weight-bold{font-weight:700}:host .popover-title.text-weight-extrabold{font-weight:800}:host .popover-title.text-weight-heavy{font-weight:900}:host .popover-title.text-weight-lighter{font-weight:lighter}:host .popover-title.text-weight-bolder{font-weight:bolder}:host .popover-content{display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle}:host .popover-content.text-capitalize{text-transform:capitalize}:host .popover-content.text-uppercase{text-transform:uppercase}:host .popover-content.text-nowrap{white-space:nowrap}:host .popover-content.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .popover-content.text-size-default{font-size:inherit}:host .popover-content.text-size-body{font-size:var(--font-size-body)}:host .popover-content.text-size-xs{font-size:var(--font-size-xs)}:host .popover-content.text-size-sm{font-size:var(--font-size-sm)}:host .popover-content.text-size-md{font-size:var(--font-size-md)}:host .popover-content.text-size-lg{font-size:var(--font-size-lg)}:host .popover-content.text-size-xl{font-size:var(--font-size-xl)}:host .popover-content.text-size-2xl{font-size:var(--font-size-2xl)}:host .popover-content.text-size-3xl{font-size:var(--font-size-3xl)}:host .popover-content.text-size-smaller{font-size:.8em}:host .popover-content.text-size-larger{font-size:1.2em}:host .popover-content.text-color-person{color:var(--color-person)}:host .popover-content.text-color-company{color:var(--color-company)}:host .popover-content.text-color-candidate{color:var(--color-candidate)}:host .popover-content.text-color-lead{color:var(--color-lead)}:host .popover-content.text-color-contact{color:var(--color-contact)}:host .popover-content.text-color-clientcontact{color:var(--color-clientcontact)}:host .popover-content.text-color-opportunity{color:var(--color-opportunity)}:host .popover-content.text-color-job{color:var(--color-job)}:host .popover-content.text-color-joborder{color:var(--color-joborder)}:host .popover-content.text-color-submission{color:var(--color-submission)}:host .popover-content.text-color-sendout{color:var(--color-sendout)}:host .popover-content.text-color-placement{color:var(--color-placement)}:host .popover-content.text-color-note{color:var(--color-note)}:host .popover-content.text-color-task{color:var(--color-task)}:host .popover-content.text-color-distribution-list{color:var(--color-distribution-list)}:host .popover-content.text-color-credential{color:var(--color-credential)}:host .popover-content.text-color-user{color:var(--color-user)}:host .popover-content.text-color-corporate-user{color:var(--color-corporate-user)}:host .popover-content.text-color-contract{color:var(--color-contract)}:host .popover-content.text-color-job-code{color:var(--color-job-code)}:host .popover-content.text-color-earn-code{color:var(--color-earn-code)}:host .popover-content.text-color-billable-charge{color:var(--color-billable-charge)}:host .popover-content.text-color-payable-charge{color:var(--color-payable-charge)}:host .popover-content.text-color-invoice-statement{color:var(--color-invoice-statement)}:host .popover-content.text-color-selection{color:var(--color-selection)}:host .popover-content.text-color-positive{color:var(--color-positive)}:host .popover-content.text-color-success{color:var(--color-success)}:host .popover-content.text-color-warning{color:var(--color-warning)}:host .popover-content.text-color-error{color:var(--color-error)}:host .popover-content.text-color-info{color:var(--color-info)}:host .popover-content.text-color-disabled{color:var(--color-disabled)}:host .popover-content.text-color-red{color:var(--palette-red-50)}:host .popover-content.text-color-pink{color:var(--palette-pink-50)}:host .popover-content.text-color-orange{color:var(--palette-orange-50)}:host .popover-content.text-color-yellow{color:var(--palette-yellow-50)}:host .popover-content.text-color-green{color:var(--palette-green-50)}:host .popover-content.text-color-teal{color:var(--palette-teal-50)}:host .popover-content.text-color-blue{color:var(--palette-blue-50)}:host .popover-content.text-color-aqua{color:var(--palette-aqua-50)}:host .popover-content.text-color-indigo{color:var(--palette-indigo-50)}:host .popover-content.text-color-violet{color:var(--palette-violet-50)}:host .popover-content.text-color-gray{color:var(--palette-gray-50)}:host .popover-content.margin-before{margin-top:.4rem}:host .popover-content.margin-after{margin-bottom:.8rem}:host .popover-content.text-length-small{max-width:40ch}:host .popover-content.text-length-medium{max-width:55ch}:host .popover-content.text-length-large{max-width:70ch}:host .popover-content.text-weight-hairline{font-weight:100}:host .popover-content.text-weight-thin{font-weight:200}:host .popover-content.text-weight-light{font-weight:300}:host .popover-content.text-weight-normal{font-weight:400}:host .popover-content.text-weight-medium{font-weight:500}:host .popover-content.text-weight-semibold{font-weight:600}:host .popover-content.text-weight-bold{font-weight:700}:host .popover-content.text-weight-extrabold{font-weight:800}:host .popover-content.text-weight-heavy{font-weight:900}:host .popover-content.text-weight-lighter{font-weight:lighter}:host .popover-content.text-weight-bolder{font-weight:bolder}:host .popover-content .popover-content-text{white-space:pre-line}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: PopOverContent, decorators: [{
            type: Component,
            args: [{ selector: 'popover-content', template: `
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
        <div class="popover-content-text">{{ content }}</div>
      </div>
    </div>
  `, styles: [":host .popover{position:absolute;top:0;left:0;z-index:1000;display:none;width:40rem;padding:2rem;background-color:var(--color-background);color:var(--color-text);background-clip:padding-box;box-shadow:var(--shadow-z2)}:host .popover.top{margin-top:-1rem}:host .popover.top.virtual-area{bottom:-1.1rem}:host .popover.right{margin-left:1rem}:host .popover.right.virtual-area{left:-1.1rem}:host .popover.bottom{margin-top:1rem}:host .popover.bottom.virtual-area{top:-1.1rem}:host .popover.left{margin-left:-1rem}:host .popover.left.virtual-area{right:-1.1rem}:host .popover .virtual-area{height:1.1rem;width:100%;position:absolute}:host .popover.top>.arrow{margin-left:-9px;border-bottom-width:0;border-top-color:#0000001a;bottom:-9px}:host .popover.top>.arrow:before{content:\" \";bottom:1px;margin-left:-1rem;border-bottom-width:0;border-top-color:var(--color-background)}:host .popover.top>.arrow.center{left:50%}:host .popover.top>.arrow.left{left:91%}:host .popover.top>.arrow.right{left:9%}:host .popover.right>.arrow{left:-9px;margin-top:-9px;border-left-width:0;border-right-color:#0000001a}:host .popover.right>.arrow:before{content:\" \";left:1px;bottom:-1rem;border-left-width:0;border-right-color:var(--color-background)}:host .popover.right>.arrow.center{top:50%}:host .popover.right>.arrow.top{top:91%}:host .popover.right>.arrow.bottom{top:9%}:host .popover.bottom>.arrow{margin-left:-9px;border-top-width:0;border-bottom-color:#0000001a;top:-9px}:host .popover.bottom>.arrow:before{content:\" \";top:1px;margin-left:-1rem;border-top-width:0;border-bottom-color:var(--color-background)}:host .popover.bottom>.arrow.center{left:50%}:host .popover.bottom>.arrow.left{left:91%}:host .popover.bottom>.arrow.right{left:9%}:host .popover.left>.arrow{right:-9px;margin-top:-9px;border-right-width:0;border-left-color:#0000001a}:host .popover.left>.arrow:before{content:\" \";right:1px;border-right-width:0;border-left-color:var(--color-background);bottom:-1rem}:host .popover.left>.arrow.center{top:50%}:host .popover.left>.arrow.top{top:91%}:host .popover.left>.arrow.bottom{top:9%}:host .popover>.arrow{border-width:9px}:host .popover>.arrow,:host .popover>.arrow:before{position:absolute;display:block;width:0;height:0;border-color:transparent;border-style:solid}:host .popover>.arrow:before{border-width:1rem;content:\"\"}:host .popover-title{font-weight:500;line-height:1.5;color:var(--color-text);white-space:nowrap;text-overflow:ellipsis;font-size:var(--font-size-title);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;margin-bottom:1rem}:host .popover-title.text-capitalize{text-transform:capitalize}:host .popover-title.text-uppercase{text-transform:uppercase}:host .popover-title.text-nowrap{white-space:nowrap}:host .popover-title.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .popover-title.text-size-default{font-size:inherit}:host .popover-title.text-size-body{font-size:var(--font-size-body)}:host .popover-title.text-size-xs{font-size:var(--font-size-xs)}:host .popover-title.text-size-sm{font-size:var(--font-size-sm)}:host .popover-title.text-size-md{font-size:var(--font-size-md)}:host .popover-title.text-size-lg{font-size:var(--font-size-lg)}:host .popover-title.text-size-xl{font-size:var(--font-size-xl)}:host .popover-title.text-size-2xl{font-size:var(--font-size-2xl)}:host .popover-title.text-size-3xl{font-size:var(--font-size-3xl)}:host .popover-title.text-size-smaller{font-size:.8em}:host .popover-title.text-size-larger{font-size:1.2em}:host .popover-title.text-color-person{color:var(--color-person)}:host .popover-title.text-color-company{color:var(--color-company)}:host .popover-title.text-color-candidate{color:var(--color-candidate)}:host .popover-title.text-color-lead{color:var(--color-lead)}:host .popover-title.text-color-contact{color:var(--color-contact)}:host .popover-title.text-color-clientcontact{color:var(--color-clientcontact)}:host .popover-title.text-color-opportunity{color:var(--color-opportunity)}:host .popover-title.text-color-job{color:var(--color-job)}:host .popover-title.text-color-joborder{color:var(--color-joborder)}:host .popover-title.text-color-submission{color:var(--color-submission)}:host .popover-title.text-color-sendout{color:var(--color-sendout)}:host .popover-title.text-color-placement{color:var(--color-placement)}:host .popover-title.text-color-note{color:var(--color-note)}:host .popover-title.text-color-task{color:var(--color-task)}:host .popover-title.text-color-distribution-list{color:var(--color-distribution-list)}:host .popover-title.text-color-credential{color:var(--color-credential)}:host .popover-title.text-color-user{color:var(--color-user)}:host .popover-title.text-color-corporate-user{color:var(--color-corporate-user)}:host .popover-title.text-color-contract{color:var(--color-contract)}:host .popover-title.text-color-job-code{color:var(--color-job-code)}:host .popover-title.text-color-earn-code{color:var(--color-earn-code)}:host .popover-title.text-color-billable-charge{color:var(--color-billable-charge)}:host .popover-title.text-color-payable-charge{color:var(--color-payable-charge)}:host .popover-title.text-color-invoice-statement{color:var(--color-invoice-statement)}:host .popover-title.text-color-selection{color:var(--color-selection)}:host .popover-title.text-color-positive{color:var(--color-positive)}:host .popover-title.text-color-success{color:var(--color-success)}:host .popover-title.text-color-warning{color:var(--color-warning)}:host .popover-title.text-color-error{color:var(--color-error)}:host .popover-title.text-color-info{color:var(--color-info)}:host .popover-title.text-color-disabled{color:var(--color-disabled)}:host .popover-title.text-color-red{color:var(--palette-red-50)}:host .popover-title.text-color-pink{color:var(--palette-pink-50)}:host .popover-title.text-color-orange{color:var(--palette-orange-50)}:host .popover-title.text-color-yellow{color:var(--palette-yellow-50)}:host .popover-title.text-color-green{color:var(--palette-green-50)}:host .popover-title.text-color-teal{color:var(--palette-teal-50)}:host .popover-title.text-color-blue{color:var(--palette-blue-50)}:host .popover-title.text-color-aqua{color:var(--palette-aqua-50)}:host .popover-title.text-color-indigo{color:var(--palette-indigo-50)}:host .popover-title.text-color-violet{color:var(--palette-violet-50)}:host .popover-title.text-color-gray{color:var(--palette-gray-50)}:host .popover-title.margin-before{margin-top:.4rem}:host .popover-title.margin-after{margin-bottom:.8rem}:host .popover-title.text-length-small{max-width:40ch}:host .popover-title.text-length-medium{max-width:55ch}:host .popover-title.text-length-large{max-width:70ch}:host .popover-title.text-weight-hairline{font-weight:100}:host .popover-title.text-weight-thin{font-weight:200}:host .popover-title.text-weight-light{font-weight:300}:host .popover-title.text-weight-normal{font-weight:400}:host .popover-title.text-weight-medium{font-weight:500}:host .popover-title.text-weight-semibold{font-weight:600}:host .popover-title.text-weight-bold{font-weight:700}:host .popover-title.text-weight-extrabold{font-weight:800}:host .popover-title.text-weight-heavy{font-weight:900}:host .popover-title.text-weight-lighter{font-weight:lighter}:host .popover-title.text-weight-bolder{font-weight:bolder}:host .popover-content{display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle}:host .popover-content.text-capitalize{text-transform:capitalize}:host .popover-content.text-uppercase{text-transform:uppercase}:host .popover-content.text-nowrap{white-space:nowrap}:host .popover-content.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .popover-content.text-size-default{font-size:inherit}:host .popover-content.text-size-body{font-size:var(--font-size-body)}:host .popover-content.text-size-xs{font-size:var(--font-size-xs)}:host .popover-content.text-size-sm{font-size:var(--font-size-sm)}:host .popover-content.text-size-md{font-size:var(--font-size-md)}:host .popover-content.text-size-lg{font-size:var(--font-size-lg)}:host .popover-content.text-size-xl{font-size:var(--font-size-xl)}:host .popover-content.text-size-2xl{font-size:var(--font-size-2xl)}:host .popover-content.text-size-3xl{font-size:var(--font-size-3xl)}:host .popover-content.text-size-smaller{font-size:.8em}:host .popover-content.text-size-larger{font-size:1.2em}:host .popover-content.text-color-person{color:var(--color-person)}:host .popover-content.text-color-company{color:var(--color-company)}:host .popover-content.text-color-candidate{color:var(--color-candidate)}:host .popover-content.text-color-lead{color:var(--color-lead)}:host .popover-content.text-color-contact{color:var(--color-contact)}:host .popover-content.text-color-clientcontact{color:var(--color-clientcontact)}:host .popover-content.text-color-opportunity{color:var(--color-opportunity)}:host .popover-content.text-color-job{color:var(--color-job)}:host .popover-content.text-color-joborder{color:var(--color-joborder)}:host .popover-content.text-color-submission{color:var(--color-submission)}:host .popover-content.text-color-sendout{color:var(--color-sendout)}:host .popover-content.text-color-placement{color:var(--color-placement)}:host .popover-content.text-color-note{color:var(--color-note)}:host .popover-content.text-color-task{color:var(--color-task)}:host .popover-content.text-color-distribution-list{color:var(--color-distribution-list)}:host .popover-content.text-color-credential{color:var(--color-credential)}:host .popover-content.text-color-user{color:var(--color-user)}:host .popover-content.text-color-corporate-user{color:var(--color-corporate-user)}:host .popover-content.text-color-contract{color:var(--color-contract)}:host .popover-content.text-color-job-code{color:var(--color-job-code)}:host .popover-content.text-color-earn-code{color:var(--color-earn-code)}:host .popover-content.text-color-billable-charge{color:var(--color-billable-charge)}:host .popover-content.text-color-payable-charge{color:var(--color-payable-charge)}:host .popover-content.text-color-invoice-statement{color:var(--color-invoice-statement)}:host .popover-content.text-color-selection{color:var(--color-selection)}:host .popover-content.text-color-positive{color:var(--color-positive)}:host .popover-content.text-color-success{color:var(--color-success)}:host .popover-content.text-color-warning{color:var(--color-warning)}:host .popover-content.text-color-error{color:var(--color-error)}:host .popover-content.text-color-info{color:var(--color-info)}:host .popover-content.text-color-disabled{color:var(--color-disabled)}:host .popover-content.text-color-red{color:var(--palette-red-50)}:host .popover-content.text-color-pink{color:var(--palette-pink-50)}:host .popover-content.text-color-orange{color:var(--palette-orange-50)}:host .popover-content.text-color-yellow{color:var(--palette-yellow-50)}:host .popover-content.text-color-green{color:var(--palette-green-50)}:host .popover-content.text-color-teal{color:var(--palette-teal-50)}:host .popover-content.text-color-blue{color:var(--palette-blue-50)}:host .popover-content.text-color-aqua{color:var(--palette-aqua-50)}:host .popover-content.text-color-indigo{color:var(--palette-indigo-50)}:host .popover-content.text-color-violet{color:var(--palette-violet-50)}:host .popover-content.text-color-gray{color:var(--palette-gray-50)}:host .popover-content.margin-before{margin-top:.4rem}:host .popover-content.margin-after{margin-bottom:.8rem}:host .popover-content.text-length-small{max-width:40ch}:host .popover-content.text-length-medium{max-width:55ch}:host .popover-content.text-length-large{max-width:70ch}:host .popover-content.text-weight-hairline{font-weight:100}:host .popover-content.text-weight-thin{font-weight:200}:host .popover-content.text-weight-light{font-weight:300}:host .popover-content.text-weight-normal{font-weight:400}:host .popover-content.text-weight-medium{font-weight:500}:host .popover-content.text-weight-semibold{font-weight:600}:host .popover-content.text-weight-bold{font-weight:700}:host .popover-content.text-weight-extrabold{font-weight:800}:host .popover-content.text-weight-heavy{font-weight:900}:host .popover-content.text-weight-lighter{font-weight:lighter}:host .popover-content.text-weight-bolder{font-weight:bolder}:host .popover-content .popover-content-text{white-space:pre-line}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { content: [{
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
        if (this.visible) {
            return;
        }
        this.visible = true;
        if (typeof this.content === 'string') {
            const factory = this.resolver.resolveComponentFactory(this.PopoverComponent);
            if (!this.visible) {
                return;
            }
            this.popover = this.viewContainerRef.createComponent(factory);
            const popover = this.popover.instance;
            popover.popover = this;
            popover.content = this.content;
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
PopOverDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: PopOverDirective, selector: "[popover]", inputs: { content: ["popover", "content"], popoverDisabled: "popoverDisabled", popoverAlways: "popoverAlways", popoverAnimation: "popoverAnimation", popoverPlacement: "popoverPlacement", popoverTitle: "popoverTitle", popoverOnHover: "popoverOnHover", popoverDismissTimeout: "popoverDismissTimeout" }, outputs: { onShown: "onShown", onHidden: "onHidden" }, host: { listeners: { "click": "showOrHideOnClick()", "focusin": "showOnHover()", "mouseenter": "showOnHover()", "focusout": "hideOnHover()", "mouseleave": "hideOnHover()" } }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: PopOverDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[popover]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i0.ComponentFactoryResolver }]; }, propDecorators: { content: [{
                type: Input,
                args: ['popover']
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
NovoPopOverModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPopOverModule, declarations: [PopOverContent, PopOverDirective], exports: [PopOverContent, PopOverDirective] });
NovoPopOverModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPopOverModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPopOverModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [PopOverContent, PopOverDirective],
                    exports: [PopOverContent, PopOverDirective],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoPopOverModule, PopOverContent, PopOverDirective };
//# sourceMappingURL=novo-elements-components-popover.mjs.map

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// NG2
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
// APP
import { NovoLabelService } from 'novo-elements/services';
import { BooleanInput } from 'novo-elements/utils';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "novo-elements/elements/loading";
import * as i3 from "novo-elements/elements/icon";
import * as i4 from "novo-elements/elements/button";
import * as i5 from "@angular/common";
import * as i6 from "novo-elements/elements/tooltip";
export class CardActionsElement {
}
CardActionsElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: CardActionsElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
CardActionsElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: CardActionsElement, selector: "novo-card-actions", ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: CardActionsElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-card-actions',
                    template: '<ng-content></ng-content>',
                }]
        }] });
/**
 * Content of a card, needed as it's used as a selector in the API.
 */
export class CardContentElement {
    constructor() {
        this.condensed = false;
    }
}
CardContentElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: CardContentElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
CardContentElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: CardContentElement, selector: "novo-card-content, [novo-card-content], [novoCardContent]", inputs: { condensed: "condensed" }, host: { properties: { "class.condensed": "condensed" }, classAttribute: "novo-card-content" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, styles: [":host{display:block}:host:not(.condensed){padding:1rem}\n"] });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], CardContentElement.prototype, "condensed", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: CardContentElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-card-content, [novo-card-content], [novoCardContent]', host: { class: 'novo-card-content', '[class.condensed]': 'condensed' }, template: '<ng-content></ng-content>', styles: [":host{display:block}:host:not(.condensed){padding:1rem}\n"] }]
        }], propDecorators: { condensed: [{
                type: Input
            }] } });
/**
 * Content of a card, needed as it's used as a selector in the API.
 */
export class CardHeaderElement {
}
CardHeaderElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: CardHeaderElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
CardHeaderElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: CardHeaderElement, selector: "novo-card-header, [novo-card-header], [novoCardHeader]", host: { classAttribute: "novo-card-header" }, ngImport: i0, template: `
    <ng-content select="novo-avatar, [novo-avatar], novo-icon"></ng-content>
    <div class="novo-card-header-text">
      <ng-content select="novo-title, [novo-title], novo-text, novo-label, novo-caption"></ng-content>
    </div>
    <ng-content></ng-content>
    <div class="novo-card-header-actions">
      <ng-content select="novo-action"></ng-content>
    </div>
  `, isInline: true, styles: [":host{padding:1rem 1rem 0;display:flex;flex-direction:row;align-items:center;gap:1rem}:host[color=black]{color:#fff;background:#000000}:host[color=white]{color:#3d464d;background:#ffffff}:host[color=gray]{color:#3d464d;background:#9e9e9e}:host[color=grey]{color:#3d464d;background:#9e9e9e}:host[color=offWhite]{color:#3d464d;background:#f7f7f7}:host[color=bright]{color:#3d464d;background:#f7f7f7}:host[color=light]{color:#3d464d;background:#dbdbdb}:host[color=neutral]{color:#fff;background:#4f5361}:host[color=dark]{color:#fff;background:#3d464d}:host[color=orange]{color:#3d464d;background:#ff6900}:host[color=navigation]{color:#fff;background:#202945}:host[color=skyBlue]{color:#fff;background:#009bdf}:host[color=steel]{color:#fff;background:#5b6770}:host[color=metal]{color:#fff;background:#637893}:host[color=sand]{color:#3d464d;background:#f4f4f4}:host[color=silver]{color:#3d464d;background:#e2e2e2}:host[color=stone]{color:#3d464d;background:#bebebe}:host[color=ash]{color:#3d464d;background:#a0a0a0}:host[color=slate]{color:#fff;background:#707070}:host[color=onyx]{color:#fff;background:#526980}:host[color=charcoal]{color:#fff;background:#282828}:host[color=moonlight]{color:#fff;background:#1a242f}:host[color=midnight]{color:#fff;background:#202945}:host[color=darkness]{color:#fff;background:#161f27}:host[color=navy]{color:#fff;background:#0d2d42}:host[color=aqua]{color:#3d464d;background:#3bafda}:host[color=ocean]{color:#fff;background:#4a89dc}:host[color=mint]{color:#3d464d;background:#37bc9b}:host[color=grass]{color:#fff;background:#8cc152}:host[color=sunflower]{color:#fff;background:#f6b042}:host[color=bittersweet]{color:#fff;background:#eb6845}:host[color=grapefruit]{color:#fff;background:#da4453}:host[color=carnation]{color:#fff;background:#d770ad}:host[color=lavender]{color:#fff;background:#967adc}:host[color=mountain]{color:#fff;background:#9678b6}:host[color=info]{color:#fff;background:#4a89dc}:host[color=positive]{color:#fff;background:#4a89dc}:host[color=success]{color:#fff;background:#8cc152}:host[color=negative]{color:#fff;background:#da4453}:host[color=danger]{color:#fff;background:#da4453}:host[color=error]{color:#fff;background:#da4453}:host[color=warning]{color:#fff;background:#f6b042}:host[color=empty]{color:#3d464d;background:#cccdcc}:host[color=disabled]{color:#3d464d;background:#bebebe}:host[color=background]{color:#3d464d;background:#f7f7f7}:host[color=backgroundDark]{color:#3d464d;background:#e2e2e2}:host[color=presentation]{color:#fff;background:#5b6770}:host[color=bullhorn]{color:#3d464d;background:#ff6900}:host[color=pulse]{color:#3d464d;background:#3bafda}:host[color=company]{color:#fff;background:#3399dd}:host[color=candidate]{color:#fff;background:#44bb77}:host[color=lead]{color:#fff;background:#aa6699}:host[color=contact]{color:#fff;background:#ffaa44}:host[color=clientcontact]{color:#fff;background:#ffaa44}:host[color=opportunity]{color:#fff;background:#662255}:host[color=job]{color:#fff;background:#bb5566}:host[color=joborder]{color:#fff;background:#bb5566}:host[color=submission]{color:#3d464d;background:#a9adbb}:host[color=sendout]{color:#fff;background:#747884}:host[color=placement]{color:#fff;background:#0b344f}:host[color=note]{color:#fff;background:#747884}:host[color=contract]{color:#fff;background:#454ea0}:host[color=jobCode]{color:#fff;background:#696d79}:host[color=earnCode]{color:#fff;background:#696d79}:host[color=invoiceStatement]{color:#fff;background:#696d79}:host[color=billableCharge]{color:#fff;background:#696d79}:host[color=payableCharge]{color:#fff;background:#696d79}:host[color=user]{color:#fff;background:#696d79}:host[color=corporateUser]{color:#fff;background:#696d79}:host[color=distributionList]{color:#fff;background:#696d79}:host[color=credential]{color:#fff;background:#696d79}:host[color=person]{color:#fff;background:#696d79}:host .novo-card-header-text{flex:1 1 0px}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: CardHeaderElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-card-header, [novo-card-header], [novoCardHeader]', host: { class: 'novo-card-header' }, template: `
    <ng-content select="novo-avatar, [novo-avatar], novo-icon"></ng-content>
    <div class="novo-card-header-text">
      <ng-content select="novo-title, [novo-title], novo-text, novo-label, novo-caption"></ng-content>
    </div>
    <ng-content></ng-content>
    <div class="novo-card-header-actions">
      <ng-content select="novo-action"></ng-content>
    </div>
  `, styles: [":host{padding:1rem 1rem 0;display:flex;flex-direction:row;align-items:center;gap:1rem}:host[color=black]{color:#fff;background:#000000}:host[color=white]{color:#3d464d;background:#ffffff}:host[color=gray]{color:#3d464d;background:#9e9e9e}:host[color=grey]{color:#3d464d;background:#9e9e9e}:host[color=offWhite]{color:#3d464d;background:#f7f7f7}:host[color=bright]{color:#3d464d;background:#f7f7f7}:host[color=light]{color:#3d464d;background:#dbdbdb}:host[color=neutral]{color:#fff;background:#4f5361}:host[color=dark]{color:#fff;background:#3d464d}:host[color=orange]{color:#3d464d;background:#ff6900}:host[color=navigation]{color:#fff;background:#202945}:host[color=skyBlue]{color:#fff;background:#009bdf}:host[color=steel]{color:#fff;background:#5b6770}:host[color=metal]{color:#fff;background:#637893}:host[color=sand]{color:#3d464d;background:#f4f4f4}:host[color=silver]{color:#3d464d;background:#e2e2e2}:host[color=stone]{color:#3d464d;background:#bebebe}:host[color=ash]{color:#3d464d;background:#a0a0a0}:host[color=slate]{color:#fff;background:#707070}:host[color=onyx]{color:#fff;background:#526980}:host[color=charcoal]{color:#fff;background:#282828}:host[color=moonlight]{color:#fff;background:#1a242f}:host[color=midnight]{color:#fff;background:#202945}:host[color=darkness]{color:#fff;background:#161f27}:host[color=navy]{color:#fff;background:#0d2d42}:host[color=aqua]{color:#3d464d;background:#3bafda}:host[color=ocean]{color:#fff;background:#4a89dc}:host[color=mint]{color:#3d464d;background:#37bc9b}:host[color=grass]{color:#fff;background:#8cc152}:host[color=sunflower]{color:#fff;background:#f6b042}:host[color=bittersweet]{color:#fff;background:#eb6845}:host[color=grapefruit]{color:#fff;background:#da4453}:host[color=carnation]{color:#fff;background:#d770ad}:host[color=lavender]{color:#fff;background:#967adc}:host[color=mountain]{color:#fff;background:#9678b6}:host[color=info]{color:#fff;background:#4a89dc}:host[color=positive]{color:#fff;background:#4a89dc}:host[color=success]{color:#fff;background:#8cc152}:host[color=negative]{color:#fff;background:#da4453}:host[color=danger]{color:#fff;background:#da4453}:host[color=error]{color:#fff;background:#da4453}:host[color=warning]{color:#fff;background:#f6b042}:host[color=empty]{color:#3d464d;background:#cccdcc}:host[color=disabled]{color:#3d464d;background:#bebebe}:host[color=background]{color:#3d464d;background:#f7f7f7}:host[color=backgroundDark]{color:#3d464d;background:#e2e2e2}:host[color=presentation]{color:#fff;background:#5b6770}:host[color=bullhorn]{color:#3d464d;background:#ff6900}:host[color=pulse]{color:#3d464d;background:#3bafda}:host[color=company]{color:#fff;background:#3399dd}:host[color=candidate]{color:#fff;background:#44bb77}:host[color=lead]{color:#fff;background:#aa6699}:host[color=contact]{color:#fff;background:#ffaa44}:host[color=clientcontact]{color:#fff;background:#ffaa44}:host[color=opportunity]{color:#fff;background:#662255}:host[color=job]{color:#fff;background:#bb5566}:host[color=joborder]{color:#fff;background:#bb5566}:host[color=submission]{color:#3d464d;background:#a9adbb}:host[color=sendout]{color:#fff;background:#747884}:host[color=placement]{color:#fff;background:#0b344f}:host[color=note]{color:#fff;background:#747884}:host[color=contract]{color:#fff;background:#454ea0}:host[color=jobCode]{color:#fff;background:#696d79}:host[color=earnCode]{color:#fff;background:#696d79}:host[color=invoiceStatement]{color:#fff;background:#696d79}:host[color=billableCharge]{color:#fff;background:#696d79}:host[color=payableCharge]{color:#fff;background:#696d79}:host[color=user]{color:#fff;background:#696d79}:host[color=corporateUser]{color:#fff;background:#696d79}:host[color=distributionList]{color:#fff;background:#696d79}:host[color=credential]{color:#fff;background:#696d79}:host[color=person]{color:#fff;background:#696d79}:host .novo-card-header-text{flex:1 1 0px}\n"] }]
        }] });
export class CardFooterElement {
}
CardFooterElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: CardFooterElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
CardFooterElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: CardFooterElement, selector: "novo-card-footer, [novo-card-footer], [novoCardFooter]", host: { classAttribute: "novo-card-footer" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, styles: [":host{padding:0 1rem 1rem;display:flex;flex-direction:row;align-items:center;gap:1rem}:host[color=black]{color:#fff;background:#000000}:host[color=white]{color:#3d464d;background:#ffffff}:host[color=gray]{color:#3d464d;background:#9e9e9e}:host[color=grey]{color:#3d464d;background:#9e9e9e}:host[color=offWhite]{color:#3d464d;background:#f7f7f7}:host[color=bright]{color:#3d464d;background:#f7f7f7}:host[color=light]{color:#3d464d;background:#dbdbdb}:host[color=neutral]{color:#fff;background:#4f5361}:host[color=dark]{color:#fff;background:#3d464d}:host[color=orange]{color:#3d464d;background:#ff6900}:host[color=navigation]{color:#fff;background:#202945}:host[color=skyBlue]{color:#fff;background:#009bdf}:host[color=steel]{color:#fff;background:#5b6770}:host[color=metal]{color:#fff;background:#637893}:host[color=sand]{color:#3d464d;background:#f4f4f4}:host[color=silver]{color:#3d464d;background:#e2e2e2}:host[color=stone]{color:#3d464d;background:#bebebe}:host[color=ash]{color:#3d464d;background:#a0a0a0}:host[color=slate]{color:#fff;background:#707070}:host[color=onyx]{color:#fff;background:#526980}:host[color=charcoal]{color:#fff;background:#282828}:host[color=moonlight]{color:#fff;background:#1a242f}:host[color=midnight]{color:#fff;background:#202945}:host[color=darkness]{color:#fff;background:#161f27}:host[color=navy]{color:#fff;background:#0d2d42}:host[color=aqua]{color:#3d464d;background:#3bafda}:host[color=ocean]{color:#fff;background:#4a89dc}:host[color=mint]{color:#3d464d;background:#37bc9b}:host[color=grass]{color:#fff;background:#8cc152}:host[color=sunflower]{color:#fff;background:#f6b042}:host[color=bittersweet]{color:#fff;background:#eb6845}:host[color=grapefruit]{color:#fff;background:#da4453}:host[color=carnation]{color:#fff;background:#d770ad}:host[color=lavender]{color:#fff;background:#967adc}:host[color=mountain]{color:#fff;background:#9678b6}:host[color=info]{color:#fff;background:#4a89dc}:host[color=positive]{color:#fff;background:#4a89dc}:host[color=success]{color:#fff;background:#8cc152}:host[color=negative]{color:#fff;background:#da4453}:host[color=danger]{color:#fff;background:#da4453}:host[color=error]{color:#fff;background:#da4453}:host[color=warning]{color:#fff;background:#f6b042}:host[color=empty]{color:#3d464d;background:#cccdcc}:host[color=disabled]{color:#3d464d;background:#bebebe}:host[color=background]{color:#3d464d;background:#f7f7f7}:host[color=backgroundDark]{color:#3d464d;background:#e2e2e2}:host[color=presentation]{color:#fff;background:#5b6770}:host[color=bullhorn]{color:#3d464d;background:#ff6900}:host[color=pulse]{color:#3d464d;background:#3bafda}:host[color=company]{color:#fff;background:#3399dd}:host[color=candidate]{color:#fff;background:#44bb77}:host[color=lead]{color:#fff;background:#aa6699}:host[color=contact]{color:#fff;background:#ffaa44}:host[color=clientcontact]{color:#fff;background:#ffaa44}:host[color=opportunity]{color:#fff;background:#662255}:host[color=job]{color:#fff;background:#bb5566}:host[color=joborder]{color:#fff;background:#bb5566}:host[color=submission]{color:#3d464d;background:#a9adbb}:host[color=sendout]{color:#fff;background:#747884}:host[color=placement]{color:#fff;background:#0b344f}:host[color=note]{color:#fff;background:#747884}:host[color=contract]{color:#fff;background:#454ea0}:host[color=jobCode]{color:#fff;background:#696d79}:host[color=earnCode]{color:#fff;background:#696d79}:host[color=invoiceStatement]{color:#fff;background:#696d79}:host[color=billableCharge]{color:#fff;background:#696d79}:host[color=payableCharge]{color:#fff;background:#696d79}:host[color=user]{color:#fff;background:#696d79}:host[color=corporateUser]{color:#fff;background:#696d79}:host[color=distributionList]{color:#fff;background:#696d79}:host[color=credential]{color:#fff;background:#696d79}:host[color=person]{color:#fff;background:#696d79}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: CardFooterElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-card-footer, [novo-card-footer], [novoCardFooter]', host: { class: 'novo-card-footer' }, template: '<ng-content></ng-content>', styles: [":host{padding:0 1rem 1rem;display:flex;flex-direction:row;align-items:center;gap:1rem}:host[color=black]{color:#fff;background:#000000}:host[color=white]{color:#3d464d;background:#ffffff}:host[color=gray]{color:#3d464d;background:#9e9e9e}:host[color=grey]{color:#3d464d;background:#9e9e9e}:host[color=offWhite]{color:#3d464d;background:#f7f7f7}:host[color=bright]{color:#3d464d;background:#f7f7f7}:host[color=light]{color:#3d464d;background:#dbdbdb}:host[color=neutral]{color:#fff;background:#4f5361}:host[color=dark]{color:#fff;background:#3d464d}:host[color=orange]{color:#3d464d;background:#ff6900}:host[color=navigation]{color:#fff;background:#202945}:host[color=skyBlue]{color:#fff;background:#009bdf}:host[color=steel]{color:#fff;background:#5b6770}:host[color=metal]{color:#fff;background:#637893}:host[color=sand]{color:#3d464d;background:#f4f4f4}:host[color=silver]{color:#3d464d;background:#e2e2e2}:host[color=stone]{color:#3d464d;background:#bebebe}:host[color=ash]{color:#3d464d;background:#a0a0a0}:host[color=slate]{color:#fff;background:#707070}:host[color=onyx]{color:#fff;background:#526980}:host[color=charcoal]{color:#fff;background:#282828}:host[color=moonlight]{color:#fff;background:#1a242f}:host[color=midnight]{color:#fff;background:#202945}:host[color=darkness]{color:#fff;background:#161f27}:host[color=navy]{color:#fff;background:#0d2d42}:host[color=aqua]{color:#3d464d;background:#3bafda}:host[color=ocean]{color:#fff;background:#4a89dc}:host[color=mint]{color:#3d464d;background:#37bc9b}:host[color=grass]{color:#fff;background:#8cc152}:host[color=sunflower]{color:#fff;background:#f6b042}:host[color=bittersweet]{color:#fff;background:#eb6845}:host[color=grapefruit]{color:#fff;background:#da4453}:host[color=carnation]{color:#fff;background:#d770ad}:host[color=lavender]{color:#fff;background:#967adc}:host[color=mountain]{color:#fff;background:#9678b6}:host[color=info]{color:#fff;background:#4a89dc}:host[color=positive]{color:#fff;background:#4a89dc}:host[color=success]{color:#fff;background:#8cc152}:host[color=negative]{color:#fff;background:#da4453}:host[color=danger]{color:#fff;background:#da4453}:host[color=error]{color:#fff;background:#da4453}:host[color=warning]{color:#fff;background:#f6b042}:host[color=empty]{color:#3d464d;background:#cccdcc}:host[color=disabled]{color:#3d464d;background:#bebebe}:host[color=background]{color:#3d464d;background:#f7f7f7}:host[color=backgroundDark]{color:#3d464d;background:#e2e2e2}:host[color=presentation]{color:#fff;background:#5b6770}:host[color=bullhorn]{color:#3d464d;background:#ff6900}:host[color=pulse]{color:#3d464d;background:#3bafda}:host[color=company]{color:#fff;background:#3399dd}:host[color=candidate]{color:#fff;background:#44bb77}:host[color=lead]{color:#fff;background:#aa6699}:host[color=contact]{color:#fff;background:#ffaa44}:host[color=clientcontact]{color:#fff;background:#ffaa44}:host[color=opportunity]{color:#fff;background:#662255}:host[color=job]{color:#fff;background:#bb5566}:host[color=joborder]{color:#fff;background:#bb5566}:host[color=submission]{color:#3d464d;background:#a9adbb}:host[color=sendout]{color:#fff;background:#747884}:host[color=placement]{color:#fff;background:#0b344f}:host[color=note]{color:#fff;background:#747884}:host[color=contract]{color:#fff;background:#454ea0}:host[color=jobCode]{color:#fff;background:#696d79}:host[color=earnCode]{color:#fff;background:#696d79}:host[color=invoiceStatement]{color:#fff;background:#696d79}:host[color=billableCharge]{color:#fff;background:#696d79}:host[color=payableCharge]{color:#fff;background:#696d79}:host[color=user]{color:#fff;background:#696d79}:host[color=corporateUser]{color:#fff;background:#696d79}:host[color=distributionList]{color:#fff;background:#696d79}:host[color=credential]{color:#fff;background:#696d79}:host[color=person]{color:#fff;background:#696d79}\n"] }]
        }] });
export class CardElement {
    constructor(labels) {
        this.padding = true;
        this.config = {};
        this.inset = 'none';
        this.onClose = new EventEmitter();
        this.onRefresh = new EventEmitter();
        this.labels = labels;
    }
    get hbInset() {
        return `novo-card-inset-${this.inset}`;
    }
    ngOnInit() {
        this.config = this.config || {};
    }
    ngOnChanges(changes) {
        this.config = this.config || {};
        this.cardAutomationId = `${(this.title || this.config.title || 'no-title').trim().toLowerCase().replace(/\s/g, '-')}-card`;
        const newIcon = this.icon || this.config.icon;
        const newMessageIcon = this.messageIcon || this.config.messageIcon;
        this.iconClass = newIcon ? `bhi-${newIcon}` : null;
        this.messageIconClass = newMessageIcon ? `bhi-${newMessageIcon}` : null;
    }
    toggleClose() {
        if (!this.config.onClose) {
            this.onClose.next();
        }
        else {
            this.config.onClose();
        }
    }
    toggleRefresh() {
        if (!this.config.onRefresh) {
            this.onRefresh.next();
        }
        else {
            this.config.onRefresh();
        }
    }
}
CardElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: CardElement, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component });
CardElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: CardElement, selector: "novo-card", inputs: { padding: "padding", config: "config", title: "title", message: "message", messageIcon: "messageIcon", icon: "icon", iconTooltip: "iconTooltip", refresh: "refresh", close: "close", move: "move", loading: "loading", inline: "inline", inset: "inset" }, outputs: { onClose: "onClose", onRefresh: "onRefresh" }, host: { properties: { "attr.data-automation-id": "cardAutomationId", "class.loading": "loading || config.loading", "class.novo-card-inline": "this.inline", "class": "this.hbInset" }, classAttribute: "novo-card" }, usesOnChanges: true, ngImport: i0, template: `
    <!--Loading-->
    <div class="card-loading-container" *ngIf="loading || config.loading">
      <novo-loading theme="line" [attr.data-automation-id]="cardAutomationId + '-loading'"></novo-loading>
    </div>
    <!--Card Header-->
    <header *ngIf="title || config.title">
      <div class="title">
        <!--Grabber Icon-->
        <novo-icon
          *ngIf="move || config.move"
          tooltip="{{ labels.move }}"
          tooltipPosition="bottom-right"
          [attr.data-automation-id]="cardAutomationId + '-move'"
          >move</novo-icon
        >
        <!--Card Title-->
        <h3 [attr.data-automation-id]="cardAutomationId + '-title'">
          <span [tooltip]="iconTooltip" tooltipPosition="right"><i *ngIf="icon" [ngClass]="iconClass"></i></span>
          {{ title || config.title }}
        </h3>
      </div>
      <!--Card Actions-->
      <div class="actions" [attr.data-automation-id]="cardAutomationId + '-actions'">
        <ng-content select="novo-card-actions"></ng-content>
        <novo-button
          theme="icon"
          icon="refresh"
          (click)="toggleRefresh()"
          *ngIf="refresh || config.refresh"
          [attr.data-automation-id]="cardAutomationId + '-refresh'"
          tooltip="{{ labels.refresh }}"
          tooltipPosition="bottom-left"
        ></novo-button>

        <novo-button
          theme="icon"
          icon="close-o"
          (click)="toggleClose()"
          *ngIf="close || config.close"
          [attr.data-automation-id]="cardAutomationId + '-close'"
          tooltip="{{ labels.close }}"
          tooltipPosition="bottom-left"
        ></novo-button>
      </div>
    </header>
    <!--Content (transcluded)-->
    <ng-content *ngIf="!(loading || config.loading) && !(message || config.message)"></ng-content>
    <!--Error/Empty Message-->
    <p
      class="card-message"
      *ngIf="!(loading || config.loading) && (message || config.message)"
      [attr.data-automation-id]="cardAutomationId + '-message'"
    >
      <i *ngIf="messageIconClass" [ngClass]="messageIconClass"></i> <span [innerHtml]="message || config.message"></span>
    </p>
    <!--Card Footer-->
    <ng-content
      *ngIf="!(loading || config.loading) && !(message || config.message)"
      select="footer,novo-card-footer,[novo-card-footer],[novoCardFooter]"
    ></ng-content>
  `, isInline: true, styles: [":host{display:flex;flex-flow:column;background-color:#fff;background-color:var(--background-bright, #ffffff);box-shadow:0 -1px 3px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;border-radius:.4em;position:relative;overflow-x:hidden}:host.loading{min-height:200px}:host div.card-loading-container{position:absolute;top:43px;left:0;right:0;bottom:0;border-radius:.4em;background-color:#fff;background-color:var(--background-bright, #ffffff);display:flex;flex-direction:column;justify-content:center;align-items:center;z-index:1}:host header{display:flex;flex-flow:row nowrap;align-items:center;justify-content:space-between;padding:.5em}:host header .title{display:flex;align-items:center;min-width:0;flex:1}:host header .title ::ng-deep i.bhi-move{color:#dbdbdb;margin-right:.3em;cursor:pointer}:host header .title h1,:host header .title h2,:host header .title h3{font-size:1.6rem;font-weight:500;line-height:1.5;color:#3d464d;color:var(--text-main, #3d464d);width:100%;padding:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host header .title h1 i,:host header .title h2 i,:host header .title h3 i{font-size:1.2em}:host header .title h1 i.bhi-info,:host header .title h2 i.bhi-info,:host header .title h3 i.bhi-info{color:#dbdbdb}:host header .actions{color:#5f6d78;white-space:nowrap}:host p.card-message{padding:20px 0;max-width:inherit;text-align:center;line-height:25px;color:#b8b8b8}:host p.card-message i{display:block;font-size:24px;margin:0 0 .5em;color:#d1d1d1}:host footer{display:flex;justify-content:center}:host.novo-card-inline{display:inline-flex;justify-self:start;align-self:start}:host.novo-card-inset-none{padding:0}:host.novo-card-inset-small{padding:.5rem}:host.novo-card-inset-medium{padding:1rem}:host.novo-card-inset-large{padding:1.25rem}:host ::ng-deep .novo-card-header+.novo-card-content.condensed,:host ::ng-deep .novo-card-header+:not(.novo-card-content){margin-top:.5rem}:host ::ng-deep [novo-card-image]{width:100%;margin:1rem 0}\n"], components: [{ type: i2.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }, { type: i3.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { type: i4.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipActive", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML"] }, { type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], CardElement.prototype, "inline", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: CardElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-card', host: {
                        class: 'novo-card',
                        '[attr.data-automation-id]': 'cardAutomationId',
                        '[class.loading]': 'loading || config.loading',
                    }, template: `
    <!--Loading-->
    <div class="card-loading-container" *ngIf="loading || config.loading">
      <novo-loading theme="line" [attr.data-automation-id]="cardAutomationId + '-loading'"></novo-loading>
    </div>
    <!--Card Header-->
    <header *ngIf="title || config.title">
      <div class="title">
        <!--Grabber Icon-->
        <novo-icon
          *ngIf="move || config.move"
          tooltip="{{ labels.move }}"
          tooltipPosition="bottom-right"
          [attr.data-automation-id]="cardAutomationId + '-move'"
          >move</novo-icon
        >
        <!--Card Title-->
        <h3 [attr.data-automation-id]="cardAutomationId + '-title'">
          <span [tooltip]="iconTooltip" tooltipPosition="right"><i *ngIf="icon" [ngClass]="iconClass"></i></span>
          {{ title || config.title }}
        </h3>
      </div>
      <!--Card Actions-->
      <div class="actions" [attr.data-automation-id]="cardAutomationId + '-actions'">
        <ng-content select="novo-card-actions"></ng-content>
        <novo-button
          theme="icon"
          icon="refresh"
          (click)="toggleRefresh()"
          *ngIf="refresh || config.refresh"
          [attr.data-automation-id]="cardAutomationId + '-refresh'"
          tooltip="{{ labels.refresh }}"
          tooltipPosition="bottom-left"
        ></novo-button>

        <novo-button
          theme="icon"
          icon="close-o"
          (click)="toggleClose()"
          *ngIf="close || config.close"
          [attr.data-automation-id]="cardAutomationId + '-close'"
          tooltip="{{ labels.close }}"
          tooltipPosition="bottom-left"
        ></novo-button>
      </div>
    </header>
    <!--Content (transcluded)-->
    <ng-content *ngIf="!(loading || config.loading) && !(message || config.message)"></ng-content>
    <!--Error/Empty Message-->
    <p
      class="card-message"
      *ngIf="!(loading || config.loading) && (message || config.message)"
      [attr.data-automation-id]="cardAutomationId + '-message'"
    >
      <i *ngIf="messageIconClass" [ngClass]="messageIconClass"></i> <span [innerHtml]="message || config.message"></span>
    </p>
    <!--Card Footer-->
    <ng-content
      *ngIf="!(loading || config.loading) && !(message || config.message)"
      select="footer,novo-card-footer,[novo-card-footer],[novoCardFooter]"
    ></ng-content>
  `, styles: [":host{display:flex;flex-flow:column;background-color:#fff;background-color:var(--background-bright, #ffffff);box-shadow:0 -1px 3px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;border-radius:.4em;position:relative;overflow-x:hidden}:host.loading{min-height:200px}:host div.card-loading-container{position:absolute;top:43px;left:0;right:0;bottom:0;border-radius:.4em;background-color:#fff;background-color:var(--background-bright, #ffffff);display:flex;flex-direction:column;justify-content:center;align-items:center;z-index:1}:host header{display:flex;flex-flow:row nowrap;align-items:center;justify-content:space-between;padding:.5em}:host header .title{display:flex;align-items:center;min-width:0;flex:1}:host header .title ::ng-deep i.bhi-move{color:#dbdbdb;margin-right:.3em;cursor:pointer}:host header .title h1,:host header .title h2,:host header .title h3{font-size:1.6rem;font-weight:500;line-height:1.5;color:#3d464d;color:var(--text-main, #3d464d);width:100%;padding:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host header .title h1 i,:host header .title h2 i,:host header .title h3 i{font-size:1.2em}:host header .title h1 i.bhi-info,:host header .title h2 i.bhi-info,:host header .title h3 i.bhi-info{color:#dbdbdb}:host header .actions{color:#5f6d78;white-space:nowrap}:host p.card-message{padding:20px 0;max-width:inherit;text-align:center;line-height:25px;color:#b8b8b8}:host p.card-message i{display:block;font-size:24px;margin:0 0 .5em;color:#d1d1d1}:host footer{display:flex;justify-content:center}:host.novo-card-inline{display:inline-flex;justify-self:start;align-self:start}:host.novo-card-inset-none{padding:0}:host.novo-card-inset-small{padding:.5rem}:host.novo-card-inset-medium{padding:1rem}:host.novo-card-inset-large{padding:1.25rem}:host ::ng-deep .novo-card-header+.novo-card-content.condensed,:host ::ng-deep .novo-card-header+:not(.novo-card-content){margin-top:.5rem}:host ::ng-deep [novo-card-image]{width:100%;margin:1rem 0}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NovoLabelService }]; }, propDecorators: { padding: [{
                type: Input
            }], config: [{
                type: Input
            }], title: [{
                type: Input
            }], message: [{
                type: Input
            }], messageIcon: [{
                type: Input
            }], icon: [{
                type: Input
            }], iconTooltip: [{
                type: Input
            }], refresh: [{
                type: Input
            }], close: [{
                type: Input
            }], move: [{
                type: Input
            }], loading: [{
                type: Input
            }], inline: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.novo-card-inline']
            }], inset: [{
                type: Input
            }], hbInset: [{
                type: HostBinding,
                args: ['class']
            }], onClose: [{
                type: Output
            }], onRefresh: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2NhcmQvQ2FyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUN0SCxNQUFNO0FBQ04sT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7OztBQU1uRCxNQUFNLE9BQU8sa0JBQWtCOztnSEFBbEIsa0JBQWtCO29HQUFsQixrQkFBa0IseURBRm5CLDJCQUEyQjs0RkFFMUIsa0JBQWtCO2tCQUo5QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFFBQVEsRUFBRSwyQkFBMkI7aUJBQ3RDOztBQUdEOztHQUVHO0FBT0gsTUFBTSxPQUFPLGtCQUFrQjtJQU4vQjtRQU8yQixjQUFTLEdBQVksS0FBSyxDQUFDO0tBQ3JEOztnSEFGWSxrQkFBa0I7b0dBQWxCLGtCQUFrQixvT0FIbkIsMkJBQTJCO0FBSVo7SUFBZixZQUFZLEVBQUU7O3FEQUE0Qjs0RkFEekMsa0JBQWtCO2tCQU45QixTQUFTOytCQUNFLDJEQUEyRCxRQUMvRCxFQUFFLEtBQUssRUFBRSxtQkFBbUIsRUFBRSxtQkFBbUIsRUFBRSxXQUFXLEVBQUUsWUFDNUQsMkJBQTJCOzhCQUlaLFNBQVM7c0JBQWpDLEtBQUs7O0FBR1I7O0dBRUc7QUFnQkgsTUFBTSxPQUFPLGlCQUFpQjs7K0dBQWpCLGlCQUFpQjttR0FBakIsaUJBQWlCLDRJQVpsQjs7Ozs7Ozs7O0dBU1Q7NEZBR1UsaUJBQWlCO2tCQWY3QixTQUFTOytCQUNFLHdEQUF3RCxR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Ozs7OztHQTZEVDt1R0FLRCxPQUFPO3NCQUROLEtBQUs7Z0JBR04sTUFBTTtzQkFETCxLQUFLO2dCQUdOLEtBQUs7c0JBREosS0FBSztnQkFHTixPQUFPO3NCQUROLEtBQUs7Z0JBR04sV0FBVztzQkFEVixLQUFLO2dCQUdOLElBQUk7c0JBREgsS0FBSztnQkFHTixXQUFXO3NCQURWLEtBQUs7Z0JBR04sT0FBTztzQkFETixLQUFLO2dCQUdOLEtBQUs7c0JBREosS0FBSztnQkFHTixJQUFJO3NCQURILEtBQUs7Z0JBR04sT0FBTztzQkFETixLQUFLO2dCQU1OLE1BQU07c0JBSEwsS0FBSzs7c0JBRUwsV0FBVzt1QkFBQyx3QkFBd0I7Z0JBSXJDLEtBQUs7c0JBREosS0FBSztnQkFHRixPQUFPO3NCQURWLFdBQVc7dUJBQUMsT0FBTztnQkFNcEIsT0FBTztzQkFETixNQUFNO2dCQUdQLFNBQVM7c0JBRFIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gQVBQXG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1jYXJkLWFjdGlvbnMnLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxufSlcbmV4cG9ydCBjbGFzcyBDYXJkQWN0aW9uc0VsZW1lbnQge31cblxuLyoqXG4gKiBDb250ZW50IG9mIGEgY2FyZCwgbmVlZGVkIGFzIGl0J3MgdXNlZCBhcyBhIHNlbGVjdG9yIGluIHRoZSBBUEkuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tY2FyZC1jb250ZW50LCBbbm92by1jYXJkLWNvbnRlbnRdLCBbbm92b0NhcmRDb250ZW50XScsXG4gIGhvc3Q6IHsgY2xhc3M6ICdub3ZvLWNhcmQtY29udGVudCcsICdbY2xhc3MuY29uZGVuc2VkXSc6ICdjb25kZW5zZWQnIH0sXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIHN0eWxlVXJsczogWycuL0NhcmRDb250ZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2FyZENvbnRlbnRFbGVtZW50IHtcbiAgQElucHV0KCkgQEJvb2xlYW5JbnB1dCgpIGNvbmRlbnNlZDogYm9vbGVhbiA9IGZhbHNlO1xufVxuXG4vKipcbiAqIENvbnRlbnQgb2YgYSBjYXJkLCBuZWVkZWQgYXMgaXQncyB1c2VkIGFzIGEgc2VsZWN0b3IgaW4gdGhlIEFQSS5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1jYXJkLWhlYWRlciwgW25vdm8tY2FyZC1oZWFkZXJdLCBbbm92b0NhcmRIZWFkZXJdJyxcbiAgaG9zdDogeyBjbGFzczogJ25vdm8tY2FyZC1oZWFkZXInIH0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibm92by1hdmF0YXIsIFtub3ZvLWF2YXRhcl0sIG5vdm8taWNvblwiPjwvbmctY29udGVudD5cbiAgICA8ZGl2IGNsYXNzPVwibm92by1jYXJkLWhlYWRlci10ZXh0XCI+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJub3ZvLXRpdGxlLCBbbm92by10aXRsZV0sIG5vdm8tdGV4dCwgbm92by1sYWJlbCwgbm92by1jYXB0aW9uXCI+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8ZGl2IGNsYXNzPVwibm92by1jYXJkLWhlYWRlci1hY3Rpb25zXCI+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJub3ZvLWFjdGlvblwiPjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vQ2FyZEhlYWRlci5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIENhcmRIZWFkZXJFbGVtZW50IHt9XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tY2FyZC1mb290ZXIsIFtub3ZvLWNhcmQtZm9vdGVyXSwgW25vdm9DYXJkRm9vdGVyXScsXG4gIGhvc3Q6IHsgY2xhc3M6ICdub3ZvLWNhcmQtZm9vdGVyJyB9LFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICBzdHlsZVVybHM6IFsnLi9DYXJkRm9vdGVyLnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2FyZEZvb3RlckVsZW1lbnQge31cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1jYXJkJyxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1jYXJkJyxcbiAgICAnW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXSc6ICdjYXJkQXV0b21hdGlvbklkJyxcbiAgICAnW2NsYXNzLmxvYWRpbmddJzogJ2xvYWRpbmcgfHwgY29uZmlnLmxvYWRpbmcnLFxuICB9LFxuICB0ZW1wbGF0ZTogYFxuICAgIDwhLS1Mb2FkaW5nLS0+XG4gICAgPGRpdiBjbGFzcz1cImNhcmQtbG9hZGluZy1jb250YWluZXJcIiAqbmdJZj1cImxvYWRpbmcgfHwgY29uZmlnLmxvYWRpbmdcIj5cbiAgICAgIDxub3ZvLWxvYWRpbmcgdGhlbWU9XCJsaW5lXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImNhcmRBdXRvbWF0aW9uSWQgKyAnLWxvYWRpbmcnXCI+PC9ub3ZvLWxvYWRpbmc+XG4gICAgPC9kaXY+XG4gICAgPCEtLUNhcmQgSGVhZGVyLS0+XG4gICAgPGhlYWRlciAqbmdJZj1cInRpdGxlIHx8IGNvbmZpZy50aXRsZVwiPlxuICAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+XG4gICAgICAgIDwhLS1HcmFiYmVyIEljb24tLT5cbiAgICAgICAgPG5vdm8taWNvblxuICAgICAgICAgICpuZ0lmPVwibW92ZSB8fCBjb25maWcubW92ZVwiXG4gICAgICAgICAgdG9vbHRpcD1cInt7IGxhYmVscy5tb3ZlIH19XCJcbiAgICAgICAgICB0b29sdGlwUG9zaXRpb249XCJib3R0b20tcmlnaHRcIlxuICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJjYXJkQXV0b21hdGlvbklkICsgJy1tb3ZlJ1wiXG4gICAgICAgICAgPm1vdmU8L25vdm8taWNvblxuICAgICAgICA+XG4gICAgICAgIDwhLS1DYXJkIFRpdGxlLS0+XG4gICAgICAgIDxoMyBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiY2FyZEF1dG9tYXRpb25JZCArICctdGl0bGUnXCI+XG4gICAgICAgICAgPHNwYW4gW3Rvb2x0aXBdPVwiaWNvblRvb2x0aXBcIiB0b29sdGlwUG9zaXRpb249XCJyaWdodFwiPjxpICpuZ0lmPVwiaWNvblwiIFtuZ0NsYXNzXT1cImljb25DbGFzc1wiPjwvaT48L3NwYW4+XG4gICAgICAgICAge3sgdGl0bGUgfHwgY29uZmlnLnRpdGxlIH19XG4gICAgICAgIDwvaDM+XG4gICAgICA8L2Rpdj5cbiAgICAgIDwhLS1DYXJkIEFjdGlvbnMtLT5cbiAgICAgIDxkaXYgY2xhc3M9XCJhY3Rpb25zXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImNhcmRBdXRvbWF0aW9uSWQgKyAnLWFjdGlvbnMnXCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5vdm8tY2FyZC1hY3Rpb25zXCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8bm92by1idXR0b25cbiAgICAgICAgICB0aGVtZT1cImljb25cIlxuICAgICAgICAgIGljb249XCJyZWZyZXNoXCJcbiAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlUmVmcmVzaCgpXCJcbiAgICAgICAgICAqbmdJZj1cInJlZnJlc2ggfHwgY29uZmlnLnJlZnJlc2hcIlxuICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJjYXJkQXV0b21hdGlvbklkICsgJy1yZWZyZXNoJ1wiXG4gICAgICAgICAgdG9vbHRpcD1cInt7IGxhYmVscy5yZWZyZXNoIH19XCJcbiAgICAgICAgICB0b29sdGlwUG9zaXRpb249XCJib3R0b20tbGVmdFwiXG4gICAgICAgID48L25vdm8tYnV0dG9uPlxuXG4gICAgICAgIDxub3ZvLWJ1dHRvblxuICAgICAgICAgIHRoZW1lPVwiaWNvblwiXG4gICAgICAgICAgaWNvbj1cImNsb3NlLW9cIlxuICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVDbG9zZSgpXCJcbiAgICAgICAgICAqbmdJZj1cImNsb3NlIHx8IGNvbmZpZy5jbG9zZVwiXG4gICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImNhcmRBdXRvbWF0aW9uSWQgKyAnLWNsb3NlJ1wiXG4gICAgICAgICAgdG9vbHRpcD1cInt7IGxhYmVscy5jbG9zZSB9fVwiXG4gICAgICAgICAgdG9vbHRpcFBvc2l0aW9uPVwiYm90dG9tLWxlZnRcIlxuICAgICAgICA+PC9ub3ZvLWJ1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvaGVhZGVyPlxuICAgIDwhLS1Db250ZW50ICh0cmFuc2NsdWRlZCktLT5cbiAgICA8bmctY29udGVudCAqbmdJZj1cIiEobG9hZGluZyB8fCBjb25maWcubG9hZGluZykgJiYgIShtZXNzYWdlIHx8IGNvbmZpZy5tZXNzYWdlKVwiPjwvbmctY29udGVudD5cbiAgICA8IS0tRXJyb3IvRW1wdHkgTWVzc2FnZS0tPlxuICAgIDxwXG4gICAgICBjbGFzcz1cImNhcmQtbWVzc2FnZVwiXG4gICAgICAqbmdJZj1cIiEobG9hZGluZyB8fCBjb25maWcubG9hZGluZykgJiYgKG1lc3NhZ2UgfHwgY29uZmlnLm1lc3NhZ2UpXCJcbiAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJjYXJkQXV0b21hdGlvbklkICsgJy1tZXNzYWdlJ1wiXG4gICAgPlxuICAgICAgPGkgKm5nSWY9XCJtZXNzYWdlSWNvbkNsYXNzXCIgW25nQ2xhc3NdPVwibWVzc2FnZUljb25DbGFzc1wiPjwvaT4gPHNwYW4gW2lubmVySHRtbF09XCJtZXNzYWdlIHx8IGNvbmZpZy5tZXNzYWdlXCI+PC9zcGFuPlxuICAgIDwvcD5cbiAgICA8IS0tQ2FyZCBGb290ZXItLT5cbiAgICA8bmctY29udGVudFxuICAgICAgKm5nSWY9XCIhKGxvYWRpbmcgfHwgY29uZmlnLmxvYWRpbmcpICYmICEobWVzc2FnZSB8fCBjb25maWcubWVzc2FnZSlcIlxuICAgICAgc2VsZWN0PVwiZm9vdGVyLG5vdm8tY2FyZC1mb290ZXIsW25vdm8tY2FyZC1mb290ZXJdLFtub3ZvQ2FyZEZvb3Rlcl1cIlxuICAgID48L25nLWNvbnRlbnQ+XG4gIGAsXG4gIHN0eWxlVXJsczogWycuL0NhcmQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBDYXJkRWxlbWVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0IHtcbiAgQElucHV0KClcbiAgcGFkZGluZzogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpXG4gIGNvbmZpZzogYW55ID0ge307XG4gIEBJbnB1dCgpXG4gIHRpdGxlOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgQElucHV0KClcbiAgbWVzc2FnZUljb246IHN0cmluZztcbiAgQElucHV0KClcbiAgaWNvbjogc3RyaW5nO1xuICBASW5wdXQoKVxuICBpY29uVG9vbHRpcDogc3RyaW5nO1xuICBASW5wdXQoKVxuICByZWZyZXNoOiBib29sZWFuO1xuICBASW5wdXQoKVxuICBjbG9zZTogYm9vbGVhbjtcbiAgQElucHV0KClcbiAgbW92ZTogYm9vbGVhbjtcbiAgQElucHV0KClcbiAgbG9hZGluZzogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5ub3ZvLWNhcmQtaW5saW5lJylcbiAgaW5saW5lOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIGluc2V0OiBzdHJpbmcgPSAnbm9uZSc7XG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBnZXQgaGJJbnNldCgpIHtcbiAgICByZXR1cm4gYG5vdm8tY2FyZC1pbnNldC0ke3RoaXMuaW5zZXR9YDtcbiAgfVxuXG4gIEBPdXRwdXQoKVxuICBvbkNsb3NlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBvblJlZnJlc2g6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjYXJkQXV0b21hdGlvbklkOiBzdHJpbmc7XG4gIGxhYmVsczogTm92b0xhYmVsU2VydmljZTtcbiAgaWNvbkNsYXNzOiBzdHJpbmcgfCBudWxsO1xuICBtZXNzYWdlSWNvbkNsYXNzOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IobGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlKSB7XG4gICAgdGhpcy5sYWJlbHMgPSBsYWJlbHM7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNvbmZpZyA9IHRoaXMuY29uZmlnIHx8IHt9O1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlcz86IFNpbXBsZUNoYW5nZXMpIHtcbiAgICB0aGlzLmNvbmZpZyA9IHRoaXMuY29uZmlnIHx8IHt9O1xuICAgIHRoaXMuY2FyZEF1dG9tYXRpb25JZCA9IGAkeyh0aGlzLnRpdGxlIHx8IHRoaXMuY29uZmlnLnRpdGxlIHx8ICduby10aXRsZScpLnRyaW0oKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccy9nLCAnLScpfS1jYXJkYDtcblxuICAgIGNvbnN0IG5ld0ljb246IHN0cmluZyA9IHRoaXMuaWNvbiB8fCB0aGlzLmNvbmZpZy5pY29uO1xuICAgIGNvbnN0IG5ld01lc3NhZ2VJY29uOiBzdHJpbmcgPSB0aGlzLm1lc3NhZ2VJY29uIHx8IHRoaXMuY29uZmlnLm1lc3NhZ2VJY29uO1xuICAgIHRoaXMuaWNvbkNsYXNzID0gbmV3SWNvbiA/IGBiaGktJHtuZXdJY29ufWAgOiBudWxsO1xuICAgIHRoaXMubWVzc2FnZUljb25DbGFzcyA9IG5ld01lc3NhZ2VJY29uID8gYGJoaS0ke25ld01lc3NhZ2VJY29ufWAgOiBudWxsO1xuICB9XG5cbiAgdG9nZ2xlQ2xvc2UoKSB7XG4gICAgaWYgKCF0aGlzLmNvbmZpZy5vbkNsb3NlKSB7XG4gICAgICB0aGlzLm9uQ2xvc2UubmV4dCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbmZpZy5vbkNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlUmVmcmVzaCgpIHtcbiAgICBpZiAoIXRoaXMuY29uZmlnLm9uUmVmcmVzaCkge1xuICAgICAgdGhpcy5vblJlZnJlc2gubmV4dCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbmZpZy5vblJlZnJlc2goKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
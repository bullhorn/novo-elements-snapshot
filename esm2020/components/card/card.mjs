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
import { NovoLabelService } from 'novo-elements/services';
import { BooleanInput } from 'novo-elements/utils';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "novo-elements/components/loading";
import * as i3 from "novo-elements/components/icon";
import * as i4 from "novo-elements/components/button";
import * as i5 from "@angular/common";
import * as i6 from "novo-elements/components/tooltip";
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
CardContentElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: CardContentElement, selector: "novo-card-content, [novo-card-content], [novoCardContent]", inputs: { condensed: "condensed" }, host: { properties: { "class.condensed": "condensed" }, classAttribute: "novo-card-content" }, ngImport: i0, template: `<ng-content></ng-content>`, isInline: true, styles: [":host{display:block}:host:not(.condensed){padding:var(--spacing-md) var(--spacing-md)}\n"] });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], CardContentElement.prototype, "condensed", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: CardContentElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-card-content, [novo-card-content], [novoCardContent]', host: { class: 'novo-card-content', '[class.condensed]': 'condensed' }, template: `<ng-content></ng-content>`, styles: [":host{display:block}:host:not(.condensed){padding:var(--spacing-md) var(--spacing-md)}\n"] }]
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
  `, isInline: true, styles: [":host{display:flex;flex-direction:row;align-items:center;gap:var(--spacing-md);padding:var(--spacing-md) var(--spacing-md) 0 var(--spacing-md)}:host .novo-card-header-text{flex:1 1 0px}:host[color=person]{color:var(--color-person-contrast);background:var(--color-person)}:host[color=company]{color:var(--color-company-contrast);background:var(--color-company)}:host[color=candidate]{color:var(--color-candidate-contrast);background:var(--color-candidate)}:host[color=lead]{color:var(--color-lead-contrast);background:var(--color-lead)}:host[color=contact]{color:var(--color-contact-contrast);background:var(--color-contact)}:host[color=clientcontact]{color:var(--color-clientcontact-contrast);background:var(--color-clientcontact)}:host[color=opportunity]{color:var(--color-opportunity-contrast);background:var(--color-opportunity)}:host[color=job]{color:var(--color-job-contrast);background:var(--color-job)}:host[color=joborder]{color:var(--color-joborder-contrast);background:var(--color-joborder)}:host[color=submission]{color:var(--color-submission-contrast);background:var(--color-submission)}:host[color=sendout]{color:var(--color-sendout-contrast);background:var(--color-sendout)}:host[color=placement]{color:var(--color-placement-contrast);background:var(--color-placement)}:host[color=note]{color:var(--color-note-contrast);background:var(--color-note)}:host[color=task]{color:var(--color-task-contrast);background:var(--color-task)}:host[color=distribution-list]{color:var(--color-distribution-list-contrast);background:var(--color-distribution-list)}:host[color=credential]{color:var(--color-credential-contrast);background:var(--color-credential)}:host[color=user]{color:var(--color-user-contrast);background:var(--color-user)}:host[color=corporate-user]{color:var(--color-corporate-user-contrast);background:var(--color-corporate-user)}:host[color=contract]{color:var(--color-contract-contrast);background:var(--color-contract)}:host[color=job-code]{color:var(--color-job-code-contrast);background:var(--color-job-code)}:host[color=earn-code]{color:var(--color-earn-code-contrast);background:var(--color-earn-code)}:host[color=billable-charge]{color:var(--color-billable-charge-contrast);background:var(--color-billable-charge)}:host[color=payable-charge]{color:var(--color-payable-charge-contrast);background:var(--color-payable-charge)}:host[color=invoice-statement]{color:var(--color-invoice-statement-contrast);background:var(--color-invoice-statement)}:host[color=selection]{color:var(--color-selection-contrast);background:var(--color-selection)}:host[color=positive]{color:var(--color-positive-contrast);background:var(--color-positive)}:host[color=success]{color:var(--color-success-contrast);background:var(--color-success)}:host[color=warning]{color:var(--color-warning-contrast);background:var(--color-warning)}:host[color=error]{color:var(--color-error-contrast);background:var(--color-error)}:host[color=info]{color:var(--color-info-contrast);background:var(--color-info)}:host[color=disabled]{color:var(--color-disabled-contrast);background:var(--color-disabled)}:host[color=red]{color:var(--palette-red-50-contrast);background:var(--palette-red-50)}:host[color=pink]{color:var(--palette-pink-50-contrast);background:var(--palette-pink-50)}:host[color=orange]{color:var(--palette-orange-50-contrast);background:var(--palette-orange-50)}:host[color=yellow]{color:var(--palette-yellow-50-contrast);background:var(--palette-yellow-50)}:host[color=green]{color:var(--palette-green-50-contrast);background:var(--palette-green-50)}:host[color=teal]{color:var(--palette-teal-50-contrast);background:var(--palette-teal-50)}:host[color=blue]{color:var(--palette-blue-50-contrast);background:var(--palette-blue-50)}:host[color=aqua]{color:var(--palette-aqua-50-contrast);background:var(--palette-aqua-50)}:host[color=indigo]{color:var(--palette-indigo-50-contrast);background:var(--palette-indigo-50)}:host[color=violet]{color:var(--palette-violet-50-contrast);background:var(--palette-violet-50)}:host[color=gray]{color:var(--palette-gray-50-contrast);background:var(--palette-gray-50)}\n"] });
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
  `, styles: [":host{display:flex;flex-direction:row;align-items:center;gap:var(--spacing-md);padding:var(--spacing-md) var(--spacing-md) 0 var(--spacing-md)}:host .novo-card-header-text{flex:1 1 0px}:host[color=person]{color:var(--color-person-contrast);background:var(--color-person)}:host[color=company]{color:var(--color-company-contrast);background:var(--color-company)}:host[color=candidate]{color:var(--color-candidate-contrast);background:var(--color-candidate)}:host[color=lead]{color:var(--color-lead-contrast);background:var(--color-lead)}:host[color=contact]{color:var(--color-contact-contrast);background:var(--color-contact)}:host[color=clientcontact]{color:var(--color-clientcontact-contrast);background:var(--color-clientcontact)}:host[color=opportunity]{color:var(--color-opportunity-contrast);background:var(--color-opportunity)}:host[color=job]{color:var(--color-job-contrast);background:var(--color-job)}:host[color=joborder]{color:var(--color-joborder-contrast);background:var(--color-joborder)}:host[color=submission]{color:var(--color-submission-contrast);background:var(--color-submission)}:host[color=sendout]{color:var(--color-sendout-contrast);background:var(--color-sendout)}:host[color=placement]{color:var(--color-placement-contrast);background:var(--color-placement)}:host[color=note]{color:var(--color-note-contrast);background:var(--color-note)}:host[color=task]{color:var(--color-task-contrast);background:var(--color-task)}:host[color=distribution-list]{color:var(--color-distribution-list-contrast);background:var(--color-distribution-list)}:host[color=credential]{color:var(--color-credential-contrast);background:var(--color-credential)}:host[color=user]{color:var(--color-user-contrast);background:var(--color-user)}:host[color=corporate-user]{color:var(--color-corporate-user-contrast);background:var(--color-corporate-user)}:host[color=contract]{color:var(--color-contract-contrast);background:var(--color-contract)}:host[color=job-code]{color:var(--color-job-code-contrast);background:var(--color-job-code)}:host[color=earn-code]{color:var(--color-earn-code-contrast);background:var(--color-earn-code)}:host[color=billable-charge]{color:var(--color-billable-charge-contrast);background:var(--color-billable-charge)}:host[color=payable-charge]{color:var(--color-payable-charge-contrast);background:var(--color-payable-charge)}:host[color=invoice-statement]{color:var(--color-invoice-statement-contrast);background:var(--color-invoice-statement)}:host[color=selection]{color:var(--color-selection-contrast);background:var(--color-selection)}:host[color=positive]{color:var(--color-positive-contrast);background:var(--color-positive)}:host[color=success]{color:var(--color-success-contrast);background:var(--color-success)}:host[color=warning]{color:var(--color-warning-contrast);background:var(--color-warning)}:host[color=error]{color:var(--color-error-contrast);background:var(--color-error)}:host[color=info]{color:var(--color-info-contrast);background:var(--color-info)}:host[color=disabled]{color:var(--color-disabled-contrast);background:var(--color-disabled)}:host[color=red]{color:var(--palette-red-50-contrast);background:var(--palette-red-50)}:host[color=pink]{color:var(--palette-pink-50-contrast);background:var(--palette-pink-50)}:host[color=orange]{color:var(--palette-orange-50-contrast);background:var(--palette-orange-50)}:host[color=yellow]{color:var(--palette-yellow-50-contrast);background:var(--palette-yellow-50)}:host[color=green]{color:var(--palette-green-50-contrast);background:var(--palette-green-50)}:host[color=teal]{color:var(--palette-teal-50-contrast);background:var(--palette-teal-50)}:host[color=blue]{color:var(--palette-blue-50-contrast);background:var(--palette-blue-50)}:host[color=aqua]{color:var(--palette-aqua-50-contrast);background:var(--palette-aqua-50)}:host[color=indigo]{color:var(--palette-indigo-50-contrast);background:var(--palette-indigo-50)}:host[color=violet]{color:var(--palette-violet-50-contrast);background:var(--palette-violet-50)}:host[color=gray]{color:var(--palette-gray-50-contrast);background:var(--palette-gray-50)}\n"] }]
        }] });
export class CardFooterElement {
}
CardFooterElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: CardFooterElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
CardFooterElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: CardFooterElement, selector: "novo-card-footer, [novo-card-footer], [novoCardFooter]", host: { classAttribute: "novo-card-footer" }, ngImport: i0, template: `<ng-content></ng-content>`, isInline: true, styles: [":host{display:flex;flex-direction:row;align-items:center;gap:var(--spacing-md);padding:0 var(--spacing-md) var(--spacing-md) var(--spacing-md)}:host[color=person]{color:var(--color-person-contrast);background:var(--color-person)}:host[color=company]{color:var(--color-company-contrast);background:var(--color-company)}:host[color=candidate]{color:var(--color-candidate-contrast);background:var(--color-candidate)}:host[color=lead]{color:var(--color-lead-contrast);background:var(--color-lead)}:host[color=contact]{color:var(--color-contact-contrast);background:var(--color-contact)}:host[color=clientcontact]{color:var(--color-clientcontact-contrast);background:var(--color-clientcontact)}:host[color=opportunity]{color:var(--color-opportunity-contrast);background:var(--color-opportunity)}:host[color=job]{color:var(--color-job-contrast);background:var(--color-job)}:host[color=joborder]{color:var(--color-joborder-contrast);background:var(--color-joborder)}:host[color=submission]{color:var(--color-submission-contrast);background:var(--color-submission)}:host[color=sendout]{color:var(--color-sendout-contrast);background:var(--color-sendout)}:host[color=placement]{color:var(--color-placement-contrast);background:var(--color-placement)}:host[color=note]{color:var(--color-note-contrast);background:var(--color-note)}:host[color=task]{color:var(--color-task-contrast);background:var(--color-task)}:host[color=distribution-list]{color:var(--color-distribution-list-contrast);background:var(--color-distribution-list)}:host[color=credential]{color:var(--color-credential-contrast);background:var(--color-credential)}:host[color=user]{color:var(--color-user-contrast);background:var(--color-user)}:host[color=corporate-user]{color:var(--color-corporate-user-contrast);background:var(--color-corporate-user)}:host[color=contract]{color:var(--color-contract-contrast);background:var(--color-contract)}:host[color=job-code]{color:var(--color-job-code-contrast);background:var(--color-job-code)}:host[color=earn-code]{color:var(--color-earn-code-contrast);background:var(--color-earn-code)}:host[color=billable-charge]{color:var(--color-billable-charge-contrast);background:var(--color-billable-charge)}:host[color=payable-charge]{color:var(--color-payable-charge-contrast);background:var(--color-payable-charge)}:host[color=invoice-statement]{color:var(--color-invoice-statement-contrast);background:var(--color-invoice-statement)}:host[color=selection]{color:var(--color-selection-contrast);background:var(--color-selection)}:host[color=positive]{color:var(--color-positive-contrast);background:var(--color-positive)}:host[color=success]{color:var(--color-success-contrast);background:var(--color-success)}:host[color=warning]{color:var(--color-warning-contrast);background:var(--color-warning)}:host[color=error]{color:var(--color-error-contrast);background:var(--color-error)}:host[color=info]{color:var(--color-info-contrast);background:var(--color-info)}:host[color=disabled]{color:var(--color-disabled-contrast);background:var(--color-disabled)}:host[color=red]{color:var(--palette-red-50-contrast);background:var(--palette-red-50)}:host[color=pink]{color:var(--palette-pink-50-contrast);background:var(--palette-pink-50)}:host[color=orange]{color:var(--palette-orange-50-contrast);background:var(--palette-orange-50)}:host[color=yellow]{color:var(--palette-yellow-50-contrast);background:var(--palette-yellow-50)}:host[color=green]{color:var(--palette-green-50-contrast);background:var(--palette-green-50)}:host[color=teal]{color:var(--palette-teal-50-contrast);background:var(--palette-teal-50)}:host[color=blue]{color:var(--palette-blue-50-contrast);background:var(--palette-blue-50)}:host[color=aqua]{color:var(--palette-aqua-50-contrast);background:var(--palette-aqua-50)}:host[color=indigo]{color:var(--palette-indigo-50-contrast);background:var(--palette-indigo-50)}:host[color=violet]{color:var(--palette-violet-50-contrast);background:var(--palette-violet-50)}:host[color=gray]{color:var(--palette-gray-50-contrast);background:var(--palette-gray-50)}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: CardFooterElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-card-footer, [novo-card-footer], [novoCardFooter]', host: { class: 'novo-card-footer' }, template: `<ng-content></ng-content>`, styles: [":host{display:flex;flex-direction:row;align-items:center;gap:var(--spacing-md);padding:0 var(--spacing-md) var(--spacing-md) var(--spacing-md)}:host[color=person]{color:var(--color-person-contrast);background:var(--color-person)}:host[color=company]{color:var(--color-company-contrast);background:var(--color-company)}:host[color=candidate]{color:var(--color-candidate-contrast);background:var(--color-candidate)}:host[color=lead]{color:var(--color-lead-contrast);background:var(--color-lead)}:host[color=contact]{color:var(--color-contact-contrast);background:var(--color-contact)}:host[color=clientcontact]{color:var(--color-clientcontact-contrast);background:var(--color-clientcontact)}:host[color=opportunity]{color:var(--color-opportunity-contrast);background:var(--color-opportunity)}:host[color=job]{color:var(--color-job-contrast);background:var(--color-job)}:host[color=joborder]{color:var(--color-joborder-contrast);background:var(--color-joborder)}:host[color=submission]{color:var(--color-submission-contrast);background:var(--color-submission)}:host[color=sendout]{color:var(--color-sendout-contrast);background:var(--color-sendout)}:host[color=placement]{color:var(--color-placement-contrast);background:var(--color-placement)}:host[color=note]{color:var(--color-note-contrast);background:var(--color-note)}:host[color=task]{color:var(--color-task-contrast);background:var(--color-task)}:host[color=distribution-list]{color:var(--color-distribution-list-contrast);background:var(--color-distribution-list)}:host[color=credential]{color:var(--color-credential-contrast);background:var(--color-credential)}:host[color=user]{color:var(--color-user-contrast);background:var(--color-user)}:host[color=corporate-user]{color:var(--color-corporate-user-contrast);background:var(--color-corporate-user)}:host[color=contract]{color:var(--color-contract-contrast);background:var(--color-contract)}:host[color=job-code]{color:var(--color-job-code-contrast);background:var(--color-job-code)}:host[color=earn-code]{color:var(--color-earn-code-contrast);background:var(--color-earn-code)}:host[color=billable-charge]{color:var(--color-billable-charge-contrast);background:var(--color-billable-charge)}:host[color=payable-charge]{color:var(--color-payable-charge-contrast);background:var(--color-payable-charge)}:host[color=invoice-statement]{color:var(--color-invoice-statement-contrast);background:var(--color-invoice-statement)}:host[color=selection]{color:var(--color-selection-contrast);background:var(--color-selection)}:host[color=positive]{color:var(--color-positive-contrast);background:var(--color-positive)}:host[color=success]{color:var(--color-success-contrast);background:var(--color-success)}:host[color=warning]{color:var(--color-warning-contrast);background:var(--color-warning)}:host[color=error]{color:var(--color-error-contrast);background:var(--color-error)}:host[color=info]{color:var(--color-info-contrast);background:var(--color-info)}:host[color=disabled]{color:var(--color-disabled-contrast);background:var(--color-disabled)}:host[color=red]{color:var(--palette-red-50-contrast);background:var(--palette-red-50)}:host[color=pink]{color:var(--palette-pink-50-contrast);background:var(--palette-pink-50)}:host[color=orange]{color:var(--palette-orange-50-contrast);background:var(--palette-orange-50)}:host[color=yellow]{color:var(--palette-yellow-50-contrast);background:var(--palette-yellow-50)}:host[color=green]{color:var(--palette-green-50-contrast);background:var(--palette-green-50)}:host[color=teal]{color:var(--palette-teal-50-contrast);background:var(--palette-teal-50)}:host[color=blue]{color:var(--palette-blue-50-contrast);background:var(--palette-blue-50)}:host[color=aqua]{color:var(--palette-aqua-50-contrast);background:var(--palette-aqua-50)}:host[color=indigo]{color:var(--palette-indigo-50-contrast);background:var(--palette-indigo-50)}:host[color=violet]{color:var(--palette-violet-50-contrast);background:var(--palette-violet-50)}:host[color=gray]{color:var(--palette-gray-50-contrast);background:var(--palette-gray-50)}\n"] }]
        }] });
export class CardElement {
    constructor(labels) {
        this.padding = true;
        this.config = {};
        this.onClose = new EventEmitter();
        this.onRefresh = new EventEmitter();
        this.labels = labels;
    }
    get hbInset() {
        return this.inset ? `novo-card-inset-${this.inset}` : null;
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
  `, isInline: true, styles: [":host{background-color:var(--card-color-background);box-shadow:var(--card-shadow);border-radius:var(--card-border-radius);border:1px solid var(--card-color-border);display:flex;flex-flow:column;position:relative;overflow-x:hidden}:host.loading{min-height:200px}:host div.card-loading-container{position:absolute;top:43px;left:0;right:0;bottom:0;background-color:var(--card-color-background);display:flex;flex-direction:column;justify-content:center;align-items:center;z-index:1}:host header{display:flex;flex-flow:row nowrap;align-items:center;justify-content:space-between;padding:.5em}:host header .title{display:flex;align-items:center;min-width:0;flex:1}:host header .title i.bhi-move{color:var(--color-text-muted);margin-right:.3em;cursor:pointer}:host header .title h1,:host header .title h2,:host header .title h3{font-size:var(--font-size-lg);font-weight:500;line-height:1.5;color:var(--color-text);width:100%;padding:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host header .title h1 i,:host header .title h2 i,:host header .title h3 i{font-size:1.2em}:host header .title h1 i.bhi-info,:host header .title h2 i.bhi-info,:host header .title h3 i.bhi-info{color:var(--color-text-muted)}:host header .actions{color:var(--text-dark);white-space:nowrap}:host p.card-message{padding:20px 0;max-width:inherit;text-align:center;line-height:25px;color:var(--color-text-muted)}:host p.card-message i{display:block;font-size:24px;margin:0 0 .5em;color:var(--color-text-muted)}:host footer{display:flex;justify-content:center}:host.novo-card-inline{display:inline-flex;justify-self:start;align-self:start}:host .novo-card-header+.novo-card-content.condensed,:host .novo-card-header+:not(.novo-card-content){margin-top:var(--spacing-sm)}:host.novo-card-inset-none{padding:0}:host.novo-card-inset-small{padding:var(--spacing-sm)}:host.novo-card-inset-medium{padding:var(--spacing-md)}:host.novo-card-inset-large{padding:var(--spacing-lg)}:host [novo-card-image]{width:100%;margin:var(--spacing-md) 0}\n"], components: [{ type: i2.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }, { type: i3.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { type: i4.NovoButtonElement, selector: "novo-button,button[theme],button[basic],button[primary],button[outlined],button[icon],button[fab]", inputs: ["color", "side", "size", "theme", "variant", "loading", "icon", "basic", "primary", "outlined", "fab", "standard", "disabled"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipActive", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML"] }, { type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
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
  `, styles: [":host{background-color:var(--card-color-background);box-shadow:var(--card-shadow);border-radius:var(--card-border-radius);border:1px solid var(--card-color-border);display:flex;flex-flow:column;position:relative;overflow-x:hidden}:host.loading{min-height:200px}:host div.card-loading-container{position:absolute;top:43px;left:0;right:0;bottom:0;background-color:var(--card-color-background);display:flex;flex-direction:column;justify-content:center;align-items:center;z-index:1}:host header{display:flex;flex-flow:row nowrap;align-items:center;justify-content:space-between;padding:.5em}:host header .title{display:flex;align-items:center;min-width:0;flex:1}:host header .title i.bhi-move{color:var(--color-text-muted);margin-right:.3em;cursor:pointer}:host header .title h1,:host header .title h2,:host header .title h3{font-size:var(--font-size-lg);font-weight:500;line-height:1.5;color:var(--color-text);width:100%;padding:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host header .title h1 i,:host header .title h2 i,:host header .title h3 i{font-size:1.2em}:host header .title h1 i.bhi-info,:host header .title h2 i.bhi-info,:host header .title h3 i.bhi-info{color:var(--color-text-muted)}:host header .actions{color:var(--text-dark);white-space:nowrap}:host p.card-message{padding:20px 0;max-width:inherit;text-align:center;line-height:25px;color:var(--color-text-muted)}:host p.card-message i{display:block;font-size:24px;margin:0 0 .5em;color:var(--color-text-muted)}:host footer{display:flex;justify-content:center}:host.novo-card-inline{display:inline-flex;justify-self:start;align-self:start}:host .novo-card-header+.novo-card-content.condensed,:host .novo-card-header+:not(.novo-card-content){margin-top:var(--spacing-sm)}:host.novo-card-inset-none{padding:0}:host.novo-card-inset-small{padding:var(--spacing-sm)}:host.novo-card-inset-medium{padding:var(--spacing-md)}:host.novo-card-inset-large{padding:var(--spacing-lg)}:host [novo-card-image]{width:100%;margin:var(--spacing-md) 0}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvY2FyZC9jYXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3RILE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7Ozs7QUFNbkQsTUFBTSxPQUFPLGtCQUFrQjs7Z0hBQWxCLGtCQUFrQjtvR0FBbEIsa0JBQWtCLHlEQUZuQiwyQkFBMkI7NEZBRTFCLGtCQUFrQjtrQkFKOUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixRQUFRLEVBQUUsMkJBQTJCO2lCQUN0Qzs7QUFHRDs7R0FFRztBQU9ILE1BQU0sT0FBTyxrQkFBa0I7SUFOL0I7UUFPMkIsY0FBUyxHQUFZLEtBQUssQ0FBQztLQUNyRDs7Z0hBRlksa0JBQWtCO29HQUFsQixrQkFBa0Isb09BRm5CLDJCQUEyQjtBQUdaO0lBQWYsWUFBWSxFQUFFOztxREFBNEI7NEZBRHpDLGtCQUFrQjtrQkFOOUIsU0FBUzsrQkFDRSwyREFBMkQsUUFDL0QsRUFBRSxLQUFLLEVBQUUsbUJBQW1CLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxFQUFFLFlBRTVELDJCQUEyQjs4QkFHWixTQUFTO3NCQUFqQyxLQUFLOztBQUdSOztHQUVHO0FBZ0JILE1BQU0sT0FBTyxpQkFBaUI7OytHQUFqQixpQkFBaUI7bUdBQWpCLGlCQUFpQiw0SUFYbEI7Ozs7Ozs7OztHQVNUOzRGQUVVLGlCQUFpQjtrQkFmN0IsU0FBUzsrQkFDRSx3REFBd0QsUUFDNUQsRUFBRSxLQUFLLEVB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Ozs7Ozs7Ozs7Ozs7R0E2RFQ7dUdBSUQsT0FBTztzQkFETixLQUFLO2dCQUdOLE1BQU07c0JBREwsS0FBSztnQkFHTixLQUFLO3NCQURKLEtBQUs7Z0JBR04sT0FBTztzQkFETixLQUFLO2dCQUdOLFdBQVc7c0JBRFYsS0FBSztnQkFHTixJQUFJO3NCQURILEtBQUs7Z0JBR04sV0FBVztzQkFEVixLQUFLO2dCQUdOLE9BQU87c0JBRE4sS0FBSztnQkFHTixLQUFLO3NCQURKLEtBQUs7Z0JBR04sSUFBSTtzQkFESCxLQUFLO2dCQUdOLE9BQU87c0JBRE4sS0FBSztnQkFNTixNQUFNO3NCQUhMLEtBQUs7O3NCQUVMLFdBQVc7dUJBQUMsd0JBQXdCO2dCQUlyQyxLQUFLO3NCQURKLEtBQUs7Z0JBR0YsT0FBTztzQkFEVixXQUFXO3VCQUFDLE9BQU87Z0JBTXBCLE9BQU87c0JBRE4sTUFBTTtnQkFHUCxTQUFTO3NCQURSLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3NlcnZpY2VzJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWNhcmQtYWN0aW9ucycsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG59KVxuZXhwb3J0IGNsYXNzIENhcmRBY3Rpb25zRWxlbWVudCB7fVxuXG4vKipcbiAqIENvbnRlbnQgb2YgYSBjYXJkLCBuZWVkZWQgYXMgaXQncyB1c2VkIGFzIGEgc2VsZWN0b3IgaW4gdGhlIEFQSS5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1jYXJkLWNvbnRlbnQsIFtub3ZvLWNhcmQtY29udGVudF0sIFtub3ZvQ2FyZENvbnRlbnRdJyxcbiAgaG9zdDogeyBjbGFzczogJ25vdm8tY2FyZC1jb250ZW50JywgJ1tjbGFzcy5jb25kZW5zZWRdJzogJ2NvbmRlbnNlZCcgfSxcbiAgc3R5bGVVcmxzOiBbJy4vY2FyZC1jb250ZW50cy5zY3NzJ10sXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmAsXG59KVxuZXhwb3J0IGNsYXNzIENhcmRDb250ZW50RWxlbWVudCB7XG4gIEBJbnB1dCgpIEBCb29sZWFuSW5wdXQoKSBjb25kZW5zZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbn1cblxuLyoqXG4gKiBDb250ZW50IG9mIGEgY2FyZCwgbmVlZGVkIGFzIGl0J3MgdXNlZCBhcyBhIHNlbGVjdG9yIGluIHRoZSBBUEkuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tY2FyZC1oZWFkZXIsIFtub3ZvLWNhcmQtaGVhZGVyXSwgW25vdm9DYXJkSGVhZGVyXScsXG4gIGhvc3Q6IHsgY2xhc3M6ICdub3ZvLWNhcmQtaGVhZGVyJyB9LFxuICBzdHlsZVVybHM6IFsnLi9jYXJkLWhlYWRlci5zY3NzJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibm92by1hdmF0YXIsIFtub3ZvLWF2YXRhcl0sIG5vdm8taWNvblwiPjwvbmctY29udGVudD5cbiAgICA8ZGl2IGNsYXNzPVwibm92by1jYXJkLWhlYWRlci10ZXh0XCI+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJub3ZvLXRpdGxlLCBbbm92by10aXRsZV0sIG5vdm8tdGV4dCwgbm92by1sYWJlbCwgbm92by1jYXB0aW9uXCI+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8ZGl2IGNsYXNzPVwibm92by1jYXJkLWhlYWRlci1hY3Rpb25zXCI+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJub3ZvLWFjdGlvblwiPjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgQ2FyZEhlYWRlckVsZW1lbnQge31cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1jYXJkLWZvb3RlciwgW25vdm8tY2FyZC1mb290ZXJdLCBbbm92b0NhcmRGb290ZXJdJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2FyZC1mb290ZXIuc2NzcyddLFxuICBob3N0OiB7IGNsYXNzOiAnbm92by1jYXJkLWZvb3RlcicgfSxcbiAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+YCxcbn0pXG5leHBvcnQgY2xhc3MgQ2FyZEZvb3RlckVsZW1lbnQge31cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1jYXJkJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2FyZC5zY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tY2FyZCcsXG4gICAgJ1thdHRyLmRhdGEtYXV0b21hdGlvbi1pZF0nOiAnY2FyZEF1dG9tYXRpb25JZCcsXG4gICAgJ1tjbGFzcy5sb2FkaW5nXSc6ICdsb2FkaW5nIHx8IGNvbmZpZy5sb2FkaW5nJyxcbiAgfSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8IS0tTG9hZGluZy0tPlxuICAgIDxkaXYgY2xhc3M9XCJjYXJkLWxvYWRpbmctY29udGFpbmVyXCIgKm5nSWY9XCJsb2FkaW5nIHx8IGNvbmZpZy5sb2FkaW5nXCI+XG4gICAgICA8bm92by1sb2FkaW5nIHRoZW1lPVwibGluZVwiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJjYXJkQXV0b21hdGlvbklkICsgJy1sb2FkaW5nJ1wiPjwvbm92by1sb2FkaW5nPlxuICAgIDwvZGl2PlxuICAgIDwhLS1DYXJkIEhlYWRlci0tPlxuICAgIDxoZWFkZXIgKm5nSWY9XCJ0aXRsZSB8fCBjb25maWcudGl0bGVcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiPlxuICAgICAgICA8IS0tR3JhYmJlciBJY29uLS0+XG4gICAgICAgIDxub3ZvLWljb25cbiAgICAgICAgICAqbmdJZj1cIm1vdmUgfHwgY29uZmlnLm1vdmVcIlxuICAgICAgICAgIHRvb2x0aXA9XCJ7eyBsYWJlbHMubW92ZSB9fVwiXG4gICAgICAgICAgdG9vbHRpcFBvc2l0aW9uPVwiYm90dG9tLXJpZ2h0XCJcbiAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiY2FyZEF1dG9tYXRpb25JZCArICctbW92ZSdcIlxuICAgICAgICAgID5tb3ZlPC9ub3ZvLWljb25cbiAgICAgICAgPlxuICAgICAgICA8IS0tQ2FyZCBUaXRsZS0tPlxuICAgICAgICA8aDMgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImNhcmRBdXRvbWF0aW9uSWQgKyAnLXRpdGxlJ1wiPlxuICAgICAgICAgIDxzcGFuIFt0b29sdGlwXT1cImljb25Ub29sdGlwXCIgdG9vbHRpcFBvc2l0aW9uPVwicmlnaHRcIj48aSAqbmdJZj1cImljb25cIiBbbmdDbGFzc109XCJpY29uQ2xhc3NcIj48L2k+PC9zcGFuPlxuICAgICAgICAgIHt7IHRpdGxlIHx8IGNvbmZpZy50aXRsZSB9fVxuICAgICAgICA8L2gzPlxuICAgICAgPC9kaXY+XG4gICAgICA8IS0tQ2FyZCBBY3Rpb25zLS0+XG4gICAgICA8ZGl2IGNsYXNzPVwiYWN0aW9uc1wiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJjYXJkQXV0b21hdGlvbklkICsgJy1hY3Rpb25zJ1wiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJub3ZvLWNhcmQtYWN0aW9uc1wiPjwvbmctY29udGVudD5cbiAgICAgICAgPG5vdm8tYnV0dG9uXG4gICAgICAgICAgdGhlbWU9XCJpY29uXCJcbiAgICAgICAgICBpY29uPVwicmVmcmVzaFwiXG4gICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZVJlZnJlc2goKVwiXG4gICAgICAgICAgKm5nSWY9XCJyZWZyZXNoIHx8IGNvbmZpZy5yZWZyZXNoXCJcbiAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiY2FyZEF1dG9tYXRpb25JZCArICctcmVmcmVzaCdcIlxuICAgICAgICAgIHRvb2x0aXA9XCJ7eyBsYWJlbHMucmVmcmVzaCB9fVwiXG4gICAgICAgICAgdG9vbHRpcFBvc2l0aW9uPVwiYm90dG9tLWxlZnRcIlxuICAgICAgICA+PC9ub3ZvLWJ1dHRvbj5cblxuICAgICAgICA8bm92by1idXR0b25cbiAgICAgICAgICB0aGVtZT1cImljb25cIlxuICAgICAgICAgIGljb249XCJjbG9zZS1vXCJcbiAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlQ2xvc2UoKVwiXG4gICAgICAgICAgKm5nSWY9XCJjbG9zZSB8fCBjb25maWcuY2xvc2VcIlxuICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJjYXJkQXV0b21hdGlvbklkICsgJy1jbG9zZSdcIlxuICAgICAgICAgIHRvb2x0aXA9XCJ7eyBsYWJlbHMuY2xvc2UgfX1cIlxuICAgICAgICAgIHRvb2x0aXBQb3NpdGlvbj1cImJvdHRvbS1sZWZ0XCJcbiAgICAgICAgPjwvbm92by1idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2hlYWRlcj5cbiAgICA8IS0tQ29udGVudCAodHJhbnNjbHVkZWQpLS0+XG4gICAgPG5nLWNvbnRlbnQgKm5nSWY9XCIhKGxvYWRpbmcgfHwgY29uZmlnLmxvYWRpbmcpICYmICEobWVzc2FnZSB8fCBjb25maWcubWVzc2FnZSlcIj48L25nLWNvbnRlbnQ+XG4gICAgPCEtLUVycm9yL0VtcHR5IE1lc3NhZ2UtLT5cbiAgICA8cFxuICAgICAgY2xhc3M9XCJjYXJkLW1lc3NhZ2VcIlxuICAgICAgKm5nSWY9XCIhKGxvYWRpbmcgfHwgY29uZmlnLmxvYWRpbmcpICYmIChtZXNzYWdlIHx8IGNvbmZpZy5tZXNzYWdlKVwiXG4gICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiY2FyZEF1dG9tYXRpb25JZCArICctbWVzc2FnZSdcIlxuICAgID5cbiAgICAgIDxpICpuZ0lmPVwibWVzc2FnZUljb25DbGFzc1wiIFtuZ0NsYXNzXT1cIm1lc3NhZ2VJY29uQ2xhc3NcIj48L2k+IDxzcGFuIFtpbm5lckh0bWxdPVwibWVzc2FnZSB8fCBjb25maWcubWVzc2FnZVwiPjwvc3Bhbj5cbiAgICA8L3A+XG4gICAgPCEtLUNhcmQgRm9vdGVyLS0+XG4gICAgPG5nLWNvbnRlbnRcbiAgICAgICpuZ0lmPVwiIShsb2FkaW5nIHx8IGNvbmZpZy5sb2FkaW5nKSAmJiAhKG1lc3NhZ2UgfHwgY29uZmlnLm1lc3NhZ2UpXCJcbiAgICAgIHNlbGVjdD1cImZvb3Rlcixub3ZvLWNhcmQtZm9vdGVyLFtub3ZvLWNhcmQtZm9vdGVyXSxbbm92b0NhcmRGb290ZXJdXCJcbiAgICA+PC9uZy1jb250ZW50PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBDYXJkRWxlbWVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0IHtcbiAgQElucHV0KClcbiAgcGFkZGluZzogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpXG4gIGNvbmZpZzogYW55ID0ge307XG4gIEBJbnB1dCgpXG4gIHRpdGxlOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgQElucHV0KClcbiAgbWVzc2FnZUljb246IHN0cmluZztcbiAgQElucHV0KClcbiAgaWNvbjogc3RyaW5nO1xuICBASW5wdXQoKVxuICBpY29uVG9vbHRpcDogc3RyaW5nO1xuICBASW5wdXQoKVxuICByZWZyZXNoOiBib29sZWFuO1xuICBASW5wdXQoKVxuICBjbG9zZTogYm9vbGVhbjtcbiAgQElucHV0KClcbiAgbW92ZTogYm9vbGVhbjtcbiAgQElucHV0KClcbiAgbG9hZGluZzogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5ub3ZvLWNhcmQtaW5saW5lJylcbiAgaW5saW5lOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIGluc2V0OiBzdHJpbmc7XG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBnZXQgaGJJbnNldCgpIHtcbiAgICByZXR1cm4gdGhpcy5pbnNldCA/IGBub3ZvLWNhcmQtaW5zZXQtJHt0aGlzLmluc2V0fWAgOiBudWxsO1xuICB9XG5cbiAgQE91dHB1dCgpXG4gIG9uQ2xvc2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgb25SZWZyZXNoOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjYXJkQXV0b21hdGlvbklkOiBzdHJpbmc7XG4gIGxhYmVsczogTm92b0xhYmVsU2VydmljZTtcbiAgaWNvbkNsYXNzOiBzdHJpbmcgfCBudWxsO1xuICBtZXNzYWdlSWNvbkNsYXNzOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IobGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlKSB7XG4gICAgdGhpcy5sYWJlbHMgPSBsYWJlbHM7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNvbmZpZyA9IHRoaXMuY29uZmlnIHx8IHt9O1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlcz86IFNpbXBsZUNoYW5nZXMpIHtcbiAgICB0aGlzLmNvbmZpZyA9IHRoaXMuY29uZmlnIHx8IHt9O1xuICAgIHRoaXMuY2FyZEF1dG9tYXRpb25JZCA9IGAkeyh0aGlzLnRpdGxlIHx8IHRoaXMuY29uZmlnLnRpdGxlIHx8ICduby10aXRsZScpLnRyaW0oKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccy9nLCAnLScpfS1jYXJkYDtcblxuICAgIGNvbnN0IG5ld0ljb246IHN0cmluZyA9IHRoaXMuaWNvbiB8fCB0aGlzLmNvbmZpZy5pY29uO1xuICAgIGNvbnN0IG5ld01lc3NhZ2VJY29uOiBzdHJpbmcgPSB0aGlzLm1lc3NhZ2VJY29uIHx8IHRoaXMuY29uZmlnLm1lc3NhZ2VJY29uO1xuICAgIHRoaXMuaWNvbkNsYXNzID0gbmV3SWNvbiA/IGBiaGktJHtuZXdJY29ufWAgOiBudWxsO1xuICAgIHRoaXMubWVzc2FnZUljb25DbGFzcyA9IG5ld01lc3NhZ2VJY29uID8gYGJoaS0ke25ld01lc3NhZ2VJY29ufWAgOiBudWxsO1xuICB9XG5cbiAgdG9nZ2xlQ2xvc2UoKSB7XG4gICAgaWYgKCF0aGlzLmNvbmZpZy5vbkNsb3NlKSB7XG4gICAgICB0aGlzLm9uQ2xvc2UubmV4dCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbmZpZy5vbkNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlUmVmcmVzaCgpIHtcbiAgICBpZiAoIXRoaXMuY29uZmlnLm9uUmVmcmVzaCkge1xuICAgICAgdGhpcy5vblJlZnJlc2gubmV4dCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbmZpZy5vblJlZnJlc2goKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
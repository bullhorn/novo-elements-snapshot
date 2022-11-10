import * as i0 from '@angular/core';
import { Component, Input, EventEmitter, HostBinding, Output, NgModule } from '@angular/core';
import * as i1 from 'novo-elements/services';
import { BooleanInput } from 'novo-elements/utils';
import * as i2 from 'novo-elements/components/loading';
import { NovoLoadingModule } from 'novo-elements/components/loading';
import * as i3 from 'novo-elements/components/icon';
import { NovoIconModule } from 'novo-elements/components/icon';
import * as i4 from 'novo-elements/components/button';
import { NovoButtonModule } from 'novo-elements/components/button';
import * as i5 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i6 from 'novo-elements/components/tooltip';
import { NovoTooltipModule } from 'novo-elements/components/tooltip';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
class CardActionsElement {
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
class CardContentElement {
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
class CardHeaderElement {
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
class CardFooterElement {
}
CardFooterElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: CardFooterElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
CardFooterElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: CardFooterElement, selector: "novo-card-footer, [novo-card-footer], [novoCardFooter]", host: { classAttribute: "novo-card-footer" }, ngImport: i0, template: `<ng-content></ng-content>`, isInline: true, styles: [":host{display:flex;flex-direction:row;align-items:center;gap:var(--spacing-md);padding:0 var(--spacing-md) var(--spacing-md) var(--spacing-md)}:host[color=person]{color:var(--color-person-contrast);background:var(--color-person)}:host[color=company]{color:var(--color-company-contrast);background:var(--color-company)}:host[color=candidate]{color:var(--color-candidate-contrast);background:var(--color-candidate)}:host[color=lead]{color:var(--color-lead-contrast);background:var(--color-lead)}:host[color=contact]{color:var(--color-contact-contrast);background:var(--color-contact)}:host[color=clientcontact]{color:var(--color-clientcontact-contrast);background:var(--color-clientcontact)}:host[color=opportunity]{color:var(--color-opportunity-contrast);background:var(--color-opportunity)}:host[color=job]{color:var(--color-job-contrast);background:var(--color-job)}:host[color=joborder]{color:var(--color-joborder-contrast);background:var(--color-joborder)}:host[color=submission]{color:var(--color-submission-contrast);background:var(--color-submission)}:host[color=sendout]{color:var(--color-sendout-contrast);background:var(--color-sendout)}:host[color=placement]{color:var(--color-placement-contrast);background:var(--color-placement)}:host[color=note]{color:var(--color-note-contrast);background:var(--color-note)}:host[color=task]{color:var(--color-task-contrast);background:var(--color-task)}:host[color=distribution-list]{color:var(--color-distribution-list-contrast);background:var(--color-distribution-list)}:host[color=credential]{color:var(--color-credential-contrast);background:var(--color-credential)}:host[color=user]{color:var(--color-user-contrast);background:var(--color-user)}:host[color=corporate-user]{color:var(--color-corporate-user-contrast);background:var(--color-corporate-user)}:host[color=contract]{color:var(--color-contract-contrast);background:var(--color-contract)}:host[color=job-code]{color:var(--color-job-code-contrast);background:var(--color-job-code)}:host[color=earn-code]{color:var(--color-earn-code-contrast);background:var(--color-earn-code)}:host[color=billable-charge]{color:var(--color-billable-charge-contrast);background:var(--color-billable-charge)}:host[color=payable-charge]{color:var(--color-payable-charge-contrast);background:var(--color-payable-charge)}:host[color=invoice-statement]{color:var(--color-invoice-statement-contrast);background:var(--color-invoice-statement)}:host[color=selection]{color:var(--color-selection-contrast);background:var(--color-selection)}:host[color=positive]{color:var(--color-positive-contrast);background:var(--color-positive)}:host[color=success]{color:var(--color-success-contrast);background:var(--color-success)}:host[color=warning]{color:var(--color-warning-contrast);background:var(--color-warning)}:host[color=error]{color:var(--color-error-contrast);background:var(--color-error)}:host[color=info]{color:var(--color-info-contrast);background:var(--color-info)}:host[color=disabled]{color:var(--color-disabled-contrast);background:var(--color-disabled)}:host[color=red]{color:var(--palette-red-50-contrast);background:var(--palette-red-50)}:host[color=pink]{color:var(--palette-pink-50-contrast);background:var(--palette-pink-50)}:host[color=orange]{color:var(--palette-orange-50-contrast);background:var(--palette-orange-50)}:host[color=yellow]{color:var(--palette-yellow-50-contrast);background:var(--palette-yellow-50)}:host[color=green]{color:var(--palette-green-50-contrast);background:var(--palette-green-50)}:host[color=teal]{color:var(--palette-teal-50-contrast);background:var(--palette-teal-50)}:host[color=blue]{color:var(--palette-blue-50-contrast);background:var(--palette-blue-50)}:host[color=aqua]{color:var(--palette-aqua-50-contrast);background:var(--palette-aqua-50)}:host[color=indigo]{color:var(--palette-indigo-50-contrast);background:var(--palette-indigo-50)}:host[color=violet]{color:var(--palette-violet-50-contrast);background:var(--palette-violet-50)}:host[color=gray]{color:var(--palette-gray-50-contrast);background:var(--palette-gray-50)}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: CardFooterElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-card-footer, [novo-card-footer], [novoCardFooter]', host: { class: 'novo-card-footer' }, template: `<ng-content></ng-content>`, styles: [":host{display:flex;flex-direction:row;align-items:center;gap:var(--spacing-md);padding:0 var(--spacing-md) var(--spacing-md) var(--spacing-md)}:host[color=person]{color:var(--color-person-contrast);background:var(--color-person)}:host[color=company]{color:var(--color-company-contrast);background:var(--color-company)}:host[color=candidate]{color:var(--color-candidate-contrast);background:var(--color-candidate)}:host[color=lead]{color:var(--color-lead-contrast);background:var(--color-lead)}:host[color=contact]{color:var(--color-contact-contrast);background:var(--color-contact)}:host[color=clientcontact]{color:var(--color-clientcontact-contrast);background:var(--color-clientcontact)}:host[color=opportunity]{color:var(--color-opportunity-contrast);background:var(--color-opportunity)}:host[color=job]{color:var(--color-job-contrast);background:var(--color-job)}:host[color=joborder]{color:var(--color-joborder-contrast);background:var(--color-joborder)}:host[color=submission]{color:var(--color-submission-contrast);background:var(--color-submission)}:host[color=sendout]{color:var(--color-sendout-contrast);background:var(--color-sendout)}:host[color=placement]{color:var(--color-placement-contrast);background:var(--color-placement)}:host[color=note]{color:var(--color-note-contrast);background:var(--color-note)}:host[color=task]{color:var(--color-task-contrast);background:var(--color-task)}:host[color=distribution-list]{color:var(--color-distribution-list-contrast);background:var(--color-distribution-list)}:host[color=credential]{color:var(--color-credential-contrast);background:var(--color-credential)}:host[color=user]{color:var(--color-user-contrast);background:var(--color-user)}:host[color=corporate-user]{color:var(--color-corporate-user-contrast);background:var(--color-corporate-user)}:host[color=contract]{color:var(--color-contract-contrast);background:var(--color-contract)}:host[color=job-code]{color:var(--color-job-code-contrast);background:var(--color-job-code)}:host[color=earn-code]{color:var(--color-earn-code-contrast);background:var(--color-earn-code)}:host[color=billable-charge]{color:var(--color-billable-charge-contrast);background:var(--color-billable-charge)}:host[color=payable-charge]{color:var(--color-payable-charge-contrast);background:var(--color-payable-charge)}:host[color=invoice-statement]{color:var(--color-invoice-statement-contrast);background:var(--color-invoice-statement)}:host[color=selection]{color:var(--color-selection-contrast);background:var(--color-selection)}:host[color=positive]{color:var(--color-positive-contrast);background:var(--color-positive)}:host[color=success]{color:var(--color-success-contrast);background:var(--color-success)}:host[color=warning]{color:var(--color-warning-contrast);background:var(--color-warning)}:host[color=error]{color:var(--color-error-contrast);background:var(--color-error)}:host[color=info]{color:var(--color-info-contrast);background:var(--color-info)}:host[color=disabled]{color:var(--color-disabled-contrast);background:var(--color-disabled)}:host[color=red]{color:var(--palette-red-50-contrast);background:var(--palette-red-50)}:host[color=pink]{color:var(--palette-pink-50-contrast);background:var(--palette-pink-50)}:host[color=orange]{color:var(--palette-orange-50-contrast);background:var(--palette-orange-50)}:host[color=yellow]{color:var(--palette-yellow-50-contrast);background:var(--palette-yellow-50)}:host[color=green]{color:var(--palette-green-50-contrast);background:var(--palette-green-50)}:host[color=teal]{color:var(--palette-teal-50-contrast);background:var(--palette-teal-50)}:host[color=blue]{color:var(--palette-blue-50-contrast);background:var(--palette-blue-50)}:host[color=aqua]{color:var(--palette-aqua-50-contrast);background:var(--palette-aqua-50)}:host[color=indigo]{color:var(--palette-indigo-50-contrast);background:var(--palette-indigo-50)}:host[color=violet]{color:var(--palette-violet-50-contrast);background:var(--palette-violet-50)}:host[color=gray]{color:var(--palette-gray-50-contrast);background:var(--palette-gray-50)}\n"] }]
        }] });
class CardElement {
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

// NG2
class NovoCardModule {
}
NovoCardModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoCardModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCardModule, declarations: [CardElement, CardActionsElement, CardContentElement, CardHeaderElement, CardFooterElement], imports: [CommonModule, NovoIconModule, NovoButtonModule, NovoLoadingModule, NovoTooltipModule], exports: [CardElement, CardActionsElement, CardContentElement, CardHeaderElement, CardFooterElement] });
NovoCardModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCardModule, imports: [[CommonModule, NovoIconModule, NovoButtonModule, NovoLoadingModule, NovoTooltipModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCardModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NovoIconModule, NovoButtonModule, NovoLoadingModule, NovoTooltipModule],
                    declarations: [CardElement, CardActionsElement, CardContentElement, CardHeaderElement, CardFooterElement],
                    exports: [CardElement, CardActionsElement, CardContentElement, CardHeaderElement, CardFooterElement],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { CardActionsElement, CardContentElement, CardElement, CardFooterElement, CardHeaderElement, NovoCardModule };
//# sourceMappingURL=novo-elements-components-card.mjs.map

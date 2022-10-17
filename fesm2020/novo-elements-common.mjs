import * as i1 from '@angular/common';
import { CommonModule, DOCUMENT } from '@angular/common';
import * as i0 from '@angular/core';
import { Directive, Input, HostBinding, Component, ViewEncapsulation, InjectionToken, ChangeDetectionStrategy, Inject, Optional, EventEmitter, Output, NgModule, Host, Injectable, TemplateRef, ViewChild } from '@angular/core';
import { BooleanInput } from 'novo-elements/utils';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { Subject, fromEvent, of, merge } from 'rxjs';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import * as i1$1 from '@angular/cdk/overlay';
import { OverlayConfig, OverlayModule } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { filter, first, switchMap } from 'rxjs/operators';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule } from '@angular/forms';

var __decorate$3 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$3 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
class NovoBaseTextElement {
    constructor(element) {
        this.element = element;
    }
    get hb_classBinding() {
        return [
            this.color ? `text-color-${this.color}` : null,
            this.lineLength ? `text-length-${this.lineLength}` : null,
            this.size ? `text-size-${this.size}` : null,
            this.weight ? `text-weight-${this.weight}` : null,
        ]
            .filter(Boolean)
            .join(' ');
    }
    get nativeElement() {
        return this.element.nativeElement;
    }
}
NovoBaseTextElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoBaseTextElement, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
NovoBaseTextElement.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoBaseTextElement, inputs: { size: "size", weight: "weight", lineLength: "lineLength", color: "color", disabled: "disabled", muted: "muted", error: "error", marginBefore: "marginBefore", marginAfter: "marginAfter", capitialize: "capitialize", uppercase: "uppercase", nowrap: "nowrap", ellipsis: "ellipsis", smaller: "smaller", larger: "larger", thin: "thin", lighter: "lighter", light: "light", medium: "medium", bold: "bold", bolder: "bolder", extrabold: "extrabold" }, host: { properties: { "class": "this.hb_classBinding", "class.text-disabled": "this.disabled", "class.text-color-empty": "this.muted", "class.text-color-negative": "this.error", "class.margin-before": "this.marginBefore", "class.margin-after": "this.marginAfter", "class.text-capitialize": "this.capitialize", "class.text-uppercase": "this.uppercase", "class.text-nowrap": "this.nowrap", "class.text-ellipsis": "this.ellipsis", "class.text-size-smaller": "this.smaller", "class.text-size-larger": "this.larger", "class.text-weight-thin": "this.thin", "class.text-weight-lighter": "this.lighter", "class.text-weight-light": "this.light", "class.text-weight-medium": "this.medium", "class.text-weight-bold": "this.bold", "class.text-weight-bolder": "this.bolder", "class.text-weight-extrabold": "this.extrabold" } }, ngImport: i0 });
__decorate$3([
    BooleanInput(),
    __metadata$3("design:type", Boolean)
], NovoBaseTextElement.prototype, "disabled", void 0);
__decorate$3([
    BooleanInput(),
    __metadata$3("design:type", Boolean)
], NovoBaseTextElement.prototype, "muted", void 0);
__decorate$3([
    BooleanInput(),
    __metadata$3("design:type", Boolean)
], NovoBaseTextElement.prototype, "error", void 0);
__decorate$3([
    BooleanInput(),
    __metadata$3("design:type", Boolean)
], NovoBaseTextElement.prototype, "marginBefore", void 0);
__decorate$3([
    BooleanInput(),
    __metadata$3("design:type", Boolean)
], NovoBaseTextElement.prototype, "marginAfter", void 0);
__decorate$3([
    BooleanInput(),
    __metadata$3("design:type", Boolean)
], NovoBaseTextElement.prototype, "capitialize", void 0);
__decorate$3([
    BooleanInput(),
    __metadata$3("design:type", Boolean)
], NovoBaseTextElement.prototype, "uppercase", void 0);
__decorate$3([
    BooleanInput(),
    __metadata$3("design:type", Boolean)
], NovoBaseTextElement.prototype, "nowrap", void 0);
__decorate$3([
    BooleanInput(),
    __metadata$3("design:type", Boolean)
], NovoBaseTextElement.prototype, "ellipsis", void 0);
__decorate$3([
    BooleanInput(),
    __metadata$3("design:type", Boolean)
], NovoBaseTextElement.prototype, "smaller", void 0);
__decorate$3([
    BooleanInput(),
    __metadata$3("design:type", Boolean)
], NovoBaseTextElement.prototype, "larger", void 0);
__decorate$3([
    BooleanInput(),
    __metadata$3("design:type", Boolean)
], NovoBaseTextElement.prototype, "thin", void 0);
__decorate$3([
    BooleanInput(),
    __metadata$3("design:type", Boolean)
], NovoBaseTextElement.prototype, "lighter", void 0);
__decorate$3([
    BooleanInput(),
    __metadata$3("design:type", Boolean)
], NovoBaseTextElement.prototype, "light", void 0);
__decorate$3([
    BooleanInput(),
    __metadata$3("design:type", Boolean)
], NovoBaseTextElement.prototype, "medium", void 0);
__decorate$3([
    BooleanInput(),
    __metadata$3("design:type", Boolean)
], NovoBaseTextElement.prototype, "bold", void 0);
__decorate$3([
    BooleanInput(),
    __metadata$3("design:type", Boolean)
], NovoBaseTextElement.prototype, "bolder", void 0);
__decorate$3([
    BooleanInput(),
    __metadata$3("design:type", Boolean)
], NovoBaseTextElement.prototype, "extrabold", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoBaseTextElement, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { size: [{
                type: Input
            }], weight: [{
                type: Input
            }], lineLength: [{
                type: Input
            }], color: [{
                type: Input
            }], hb_classBinding: [{
                type: HostBinding,
                args: ['class']
            }], disabled: [{
                type: HostBinding,
                args: ['class.text-disabled']
            }, {
                type: Input
            }], muted: [{
                type: HostBinding,
                args: ['class.text-color-empty']
            }, {
                type: Input
            }], error: [{
                type: HostBinding,
                args: ['class.text-color-negative']
            }, {
                type: Input
            }], marginBefore: [{
                type: HostBinding,
                args: ['class.margin-before']
            }, {
                type: Input
            }], marginAfter: [{
                type: HostBinding,
                args: ['class.margin-after']
            }, {
                type: Input
            }], capitialize: [{
                type: HostBinding,
                args: ['class.text-capitialize']
            }, {
                type: Input
            }], uppercase: [{
                type: HostBinding,
                args: ['class.text-uppercase']
            }, {
                type: Input
            }], nowrap: [{
                type: HostBinding,
                args: ['class.text-nowrap']
            }, {
                type: Input
            }], ellipsis: [{
                type: HostBinding,
                args: ['class.text-ellipsis']
            }, {
                type: Input
            }], smaller: [{
                type: HostBinding,
                args: ['class.text-size-smaller']
            }, {
                type: Input
            }], larger: [{
                type: HostBinding,
                args: ['class.text-size-larger']
            }, {
                type: Input
            }], thin: [{
                type: HostBinding,
                args: ['class.text-weight-thin']
            }, {
                type: Input
            }], lighter: [{
                type: HostBinding,
                args: ['class.text-weight-lighter']
            }, {
                type: Input
            }], light: [{
                type: HostBinding,
                args: ['class.text-weight-light']
            }, {
                type: Input
            }], medium: [{
                type: HostBinding,
                args: ['class.text-weight-medium']
            }, {
                type: Input
            }], bold: [{
                type: HostBinding,
                args: ['class.text-weight-bold']
            }, {
                type: Input
            }], bolder: [{
                type: HostBinding,
                args: ['class.text-weight-bolder']
            }, {
                type: Input
            }], extrabold: [{
                type: HostBinding,
                args: ['class.text-weight-extrabold']
            }, {
                type: Input
            }] } });

// NG2
/**
 * Tag Example
 * <novo-title size="sm" disabled>Label</novo-title
 * <novo-title small disabled>Label</novo-title>
 * <novo-title large disabled>Label</novo-title>
 * <novo-title error>Label</novo-title>
 * <novo-title muted>Label</novo-title>
 * <novo-title class="tc-grapefruit">Label</novo-title>
 * <novo-title color="grapefruit">Label</novo-title>
 */
class NovoTitle extends NovoBaseTextElement {
    constructor() {
        super(...arguments);
        this.weight = 'medium';
    }
}
NovoTitle.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTitle, deps: null, target: i0.ɵɵFactoryTarget.Component });
NovoTitle.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoTitle, selector: "novo-title,[novo-title]", host: { classAttribute: "novo-title" }, usesInheritance: true, ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, styles: [":host{display:block;font-weight:500;line-height:1.5;color:var(--color-text);white-space:nowrap;text-overflow:ellipsis;font-size:var(--font-size-title);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle}:host.text-capitalize{text-transform:capitalize}:host.text-uppercase{text-transform:uppercase}:host.text-nowrap{white-space:nowrap}:host.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host.text-size-default{font-size:inherit}:host.text-size-body{font-size:var(--font-size-body)}:host.text-size-xs{font-size:var(--font-size-xs)}:host.text-size-sm{font-size:var(--font-size-sm)}:host.text-size-md{font-size:var(--font-size-md)}:host.text-size-lg{font-size:var(--font-size-lg)}:host.text-size-xl{font-size:var(--font-size-xl)}:host.text-size-2xl{font-size:var(--font-size-2xl)}:host.text-size-3xl{font-size:var(--font-size-3xl)}:host.text-size-smaller{font-size:.8em}:host.text-size-larger{font-size:1.2em}:host.text-color-person{color:var(--color-person)}:host.text-color-company{color:var(--color-company)}:host.text-color-candidate{color:var(--color-candidate)}:host.text-color-lead{color:var(--color-lead)}:host.text-color-contact{color:var(--color-contact)}:host.text-color-clientcontact{color:var(--color-clientcontact)}:host.text-color-opportunity{color:var(--color-opportunity)}:host.text-color-job{color:var(--color-job)}:host.text-color-joborder{color:var(--color-joborder)}:host.text-color-submission{color:var(--color-submission)}:host.text-color-sendout{color:var(--color-sendout)}:host.text-color-placement{color:var(--color-placement)}:host.text-color-note{color:var(--color-note)}:host.text-color-task{color:var(--color-task)}:host.text-color-distribution-list{color:var(--color-distribution-list)}:host.text-color-credential{color:var(--color-credential)}:host.text-color-user{color:var(--color-user)}:host.text-color-corporate-user{color:var(--color-corporate-user)}:host.text-color-contract{color:var(--color-contract)}:host.text-color-job-code{color:var(--color-job-code)}:host.text-color-earn-code{color:var(--color-earn-code)}:host.text-color-billable-charge{color:var(--color-billable-charge)}:host.text-color-payable-charge{color:var(--color-payable-charge)}:host.text-color-invoice-statement{color:var(--color-invoice-statement)}:host.text-color-selection{color:var(--color-selection)}:host.text-color-positive{color:var(--color-positive)}:host.text-color-success{color:var(--color-success)}:host.text-color-warning{color:var(--color-warning)}:host.text-color-error{color:var(--color-error)}:host.text-color-info{color:var(--color-info)}:host.text-color-disabled{color:var(--color-disabled)}:host.text-color-red{color:var(--palette-red-50)}:host.text-color-pink{color:var(--palette-pink-50)}:host.text-color-orange{color:var(--palette-orange-50)}:host.text-color-yellow{color:var(--palette-yellow-50)}:host.text-color-green{color:var(--palette-green-50)}:host.text-color-teal{color:var(--palette-teal-50)}:host.text-color-blue{color:var(--palette-blue-50)}:host.text-color-aqua{color:var(--palette-aqua-50)}:host.text-color-indigo{color:var(--palette-indigo-50)}:host.text-color-violet{color:var(--palette-violet-50)}:host.text-color-gray{color:var(--palette-gray-50)}:host.margin-before{margin-top:.4rem}:host.margin-after{margin-bottom:.8rem}:host.text-length-small{max-width:40ch}:host.text-length-medium{max-width:55ch}:host.text-length-large{max-width:70ch}:host.text-weight-hairline{font-weight:100}:host.text-weight-thin{font-weight:200}:host.text-weight-light{font-weight:300}:host.text-weight-normal{font-weight:400}:host.text-weight-medium{font-weight:500}:host.text-weight-semibold{font-weight:600}:host.text-weight-bold{font-weight:700}:host.text-weight-extrabold{font-weight:800}:host.text-weight-heavy{font-weight:900}:host.text-weight-lighter{font-weight:lighter}:host.text-weight-bolder{font-weight:bolder}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTitle, decorators: [{
            type: Component,
            args: [{ selector: 'novo-title,[novo-title]', template: ` <ng-content></ng-content> `, host: {
                        class: 'novo-title',
                    }, styles: [":host{display:block;font-weight:500;line-height:1.5;color:var(--color-text);white-space:nowrap;text-overflow:ellipsis;font-size:var(--font-size-title);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle}:host.text-capitalize{text-transform:capitalize}:host.text-uppercase{text-transform:uppercase}:host.text-nowrap{white-space:nowrap}:host.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host.text-size-default{font-size:inherit}:host.text-size-body{font-size:var(--font-size-body)}:host.text-size-xs{font-size:var(--font-size-xs)}:host.text-size-sm{font-size:var(--font-size-sm)}:host.text-size-md{font-size:var(--font-size-md)}:host.text-size-lg{font-size:var(--font-size-lg)}:host.text-size-xl{font-size:var(--font-size-xl)}:host.text-size-2xl{font-size:var(--font-size-2xl)}:host.text-size-3xl{font-size:var(--font-size-3xl)}:host.text-size-smaller{font-size:.8em}:host.text-size-larger{font-size:1.2em}:host.text-color-person{color:var(--color-person)}:host.text-color-company{color:var(--color-company)}:host.text-color-candidate{color:var(--color-candidate)}:host.text-color-lead{color:var(--color-lead)}:host.text-color-contact{color:var(--color-contact)}:host.text-color-clientcontact{color:var(--color-clientcontact)}:host.text-color-opportunity{color:var(--color-opportunity)}:host.text-color-job{color:var(--color-job)}:host.text-color-joborder{color:var(--color-joborder)}:host.text-color-submission{color:var(--color-submission)}:host.text-color-sendout{color:var(--color-sendout)}:host.text-color-placement{color:var(--color-placement)}:host.text-color-note{color:var(--color-note)}:host.text-color-task{color:var(--color-task)}:host.text-color-distribution-list{color:var(--color-distribution-list)}:host.text-color-credential{color:var(--color-credential)}:host.text-color-user{color:var(--color-user)}:host.text-color-corporate-user{color:var(--color-corporate-user)}:host.text-color-contract{color:var(--color-contract)}:host.text-color-job-code{color:var(--color-job-code)}:host.text-color-earn-code{color:var(--color-earn-code)}:host.text-color-billable-charge{color:var(--color-billable-charge)}:host.text-color-payable-charge{color:var(--color-payable-charge)}:host.text-color-invoice-statement{color:var(--color-invoice-statement)}:host.text-color-selection{color:var(--color-selection)}:host.text-color-positive{color:var(--color-positive)}:host.text-color-success{color:var(--color-success)}:host.text-color-warning{color:var(--color-warning)}:host.text-color-error{color:var(--color-error)}:host.text-color-info{color:var(--color-info)}:host.text-color-disabled{color:var(--color-disabled)}:host.text-color-red{color:var(--palette-red-50)}:host.text-color-pink{color:var(--palette-pink-50)}:host.text-color-orange{color:var(--palette-orange-50)}:host.text-color-yellow{color:var(--palette-yellow-50)}:host.text-color-green{color:var(--palette-green-50)}:host.text-color-teal{color:var(--palette-teal-50)}:host.text-color-blue{color:var(--palette-blue-50)}:host.text-color-aqua{color:var(--palette-aqua-50)}:host.text-color-indigo{color:var(--palette-indigo-50)}:host.text-color-violet{color:var(--palette-violet-50)}:host.text-color-gray{color:var(--palette-gray-50)}:host.margin-before{margin-top:.4rem}:host.margin-after{margin-bottom:.8rem}:host.text-length-small{max-width:40ch}:host.text-length-medium{max-width:55ch}:host.text-length-large{max-width:70ch}:host.text-weight-hairline{font-weight:100}:host.text-weight-thin{font-weight:200}:host.text-weight-light{font-weight:300}:host.text-weight-normal{font-weight:400}:host.text-weight-medium{font-weight:500}:host.text-weight-semibold{font-weight:600}:host.text-weight-bold{font-weight:700}:host.text-weight-extrabold{font-weight:800}:host.text-weight-heavy{font-weight:900}:host.text-weight-lighter{font-weight:lighter}:host.text-weight-bolder{font-weight:bolder}\n"] }]
        }] });

var __decorate$2 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$2 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Tag Example
 * <novo-text size="small" disabled>Label</novo-text
 * <novo-text small disabled>Label</novo-text>
 * <novo-text large disabled>Label</novo-text>
 * <novo-text error>Label</novo-text>
 * <novo-text muted>Label</novo-text>
 * <novo-text class="tc-grapefruit">Label</novo-text>
 * <novo-text color="grapefruit">Label</novo-text>
 */
class NovoText extends NovoBaseTextElement {
}
NovoText.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoText, deps: null, target: i0.ɵɵFactoryTarget.Component });
NovoText.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoText, selector: "novo-text,[novo-text]", inputs: { block: "block" }, host: { properties: { "class.text-block": "this.block" }, classAttribute: "novo-text" }, usesInheritance: true, ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, styles: [".novo-text{display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle}.novo-text.text-capitalize{text-transform:capitalize}.novo-text.text-uppercase{text-transform:uppercase}.novo-text.text-nowrap{white-space:nowrap}.novo-text.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.novo-text.text-size-default{font-size:inherit}.novo-text.text-size-body{font-size:var(--font-size-body)}.novo-text.text-size-xs{font-size:var(--font-size-xs)}.novo-text.text-size-sm{font-size:var(--font-size-sm)}.novo-text.text-size-md{font-size:var(--font-size-md)}.novo-text.text-size-lg{font-size:var(--font-size-lg)}.novo-text.text-size-xl{font-size:var(--font-size-xl)}.novo-text.text-size-2xl{font-size:var(--font-size-2xl)}.novo-text.text-size-3xl{font-size:var(--font-size-3xl)}.novo-text.text-size-smaller{font-size:.8em}.novo-text.text-size-larger{font-size:1.2em}.novo-text.text-color-person{color:var(--color-person)}.novo-text.text-color-company{color:var(--color-company)}.novo-text.text-color-candidate{color:var(--color-candidate)}.novo-text.text-color-lead{color:var(--color-lead)}.novo-text.text-color-contact{color:var(--color-contact)}.novo-text.text-color-clientcontact{color:var(--color-clientcontact)}.novo-text.text-color-opportunity{color:var(--color-opportunity)}.novo-text.text-color-job{color:var(--color-job)}.novo-text.text-color-joborder{color:var(--color-joborder)}.novo-text.text-color-submission{color:var(--color-submission)}.novo-text.text-color-sendout{color:var(--color-sendout)}.novo-text.text-color-placement{color:var(--color-placement)}.novo-text.text-color-note{color:var(--color-note)}.novo-text.text-color-task{color:var(--color-task)}.novo-text.text-color-distribution-list{color:var(--color-distribution-list)}.novo-text.text-color-credential{color:var(--color-credential)}.novo-text.text-color-user{color:var(--color-user)}.novo-text.text-color-corporate-user{color:var(--color-corporate-user)}.novo-text.text-color-contract{color:var(--color-contract)}.novo-text.text-color-job-code{color:var(--color-job-code)}.novo-text.text-color-earn-code{color:var(--color-earn-code)}.novo-text.text-color-billable-charge{color:var(--color-billable-charge)}.novo-text.text-color-payable-charge{color:var(--color-payable-charge)}.novo-text.text-color-invoice-statement{color:var(--color-invoice-statement)}.novo-text.text-color-selection{color:var(--color-selection)}.novo-text.text-color-positive{color:var(--color-positive)}.novo-text.text-color-success{color:var(--color-success)}.novo-text.text-color-warning{color:var(--color-warning)}.novo-text.text-color-error{color:var(--color-error)}.novo-text.text-color-info{color:var(--color-info)}.novo-text.text-color-disabled{color:var(--color-disabled)}.novo-text.text-color-red{color:var(--palette-red-50)}.novo-text.text-color-pink{color:var(--palette-pink-50)}.novo-text.text-color-orange{color:var(--palette-orange-50)}.novo-text.text-color-yellow{color:var(--palette-yellow-50)}.novo-text.text-color-green{color:var(--palette-green-50)}.novo-text.text-color-teal{color:var(--palette-teal-50)}.novo-text.text-color-blue{color:var(--palette-blue-50)}.novo-text.text-color-aqua{color:var(--palette-aqua-50)}.novo-text.text-color-indigo{color:var(--palette-indigo-50)}.novo-text.text-color-violet{color:var(--palette-violet-50)}.novo-text.text-color-gray{color:var(--palette-gray-50)}.novo-text.margin-before{margin-top:.4rem}.novo-text.margin-after{margin-bottom:.8rem}.novo-text.text-length-small{max-width:40ch}.novo-text.text-length-medium{max-width:55ch}.novo-text.text-length-large{max-width:70ch}.novo-text.text-weight-hairline{font-weight:100}.novo-text.text-weight-thin{font-weight:200}.novo-text.text-weight-light{font-weight:300}.novo-text.text-weight-normal{font-weight:400}.novo-text.text-weight-medium{font-weight:500}.novo-text.text-weight-semibold{font-weight:600}.novo-text.text-weight-bold{font-weight:700}.novo-text.text-weight-extrabold{font-weight:800}.novo-text.text-weight-heavy{font-weight:900}.novo-text.text-weight-lighter{font-weight:lighter}.novo-text.text-weight-bolder{font-weight:bolder}.novo-text.text-block{display:block;line-height:1.375em;min-width:55ch;max-width:75ch}\n"], encapsulation: i0.ViewEncapsulation.None });
__decorate$2([
    BooleanInput(),
    __metadata$2("design:type", Boolean)
], NovoText.prototype, "block", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoText, decorators: [{
            type: Component,
            args: [{ selector: 'novo-text,[novo-text]', template: ` <ng-content></ng-content> `, encapsulation: ViewEncapsulation.None, host: {
                        class: 'novo-text',
                    }, styles: [".novo-text{display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle}.novo-text.text-capitalize{text-transform:capitalize}.novo-text.text-uppercase{text-transform:uppercase}.novo-text.text-nowrap{white-space:nowrap}.novo-text.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.novo-text.text-size-default{font-size:inherit}.novo-text.text-size-body{font-size:var(--font-size-body)}.novo-text.text-size-xs{font-size:var(--font-size-xs)}.novo-text.text-size-sm{font-size:var(--font-size-sm)}.novo-text.text-size-md{font-size:var(--font-size-md)}.novo-text.text-size-lg{font-size:var(--font-size-lg)}.novo-text.text-size-xl{font-size:var(--font-size-xl)}.novo-text.text-size-2xl{font-size:var(--font-size-2xl)}.novo-text.text-size-3xl{font-size:var(--font-size-3xl)}.novo-text.text-size-smaller{font-size:.8em}.novo-text.text-size-larger{font-size:1.2em}.novo-text.text-color-person{color:var(--color-person)}.novo-text.text-color-company{color:var(--color-company)}.novo-text.text-color-candidate{color:var(--color-candidate)}.novo-text.text-color-lead{color:var(--color-lead)}.novo-text.text-color-contact{color:var(--color-contact)}.novo-text.text-color-clientcontact{color:var(--color-clientcontact)}.novo-text.text-color-opportunity{color:var(--color-opportunity)}.novo-text.text-color-job{color:var(--color-job)}.novo-text.text-color-joborder{color:var(--color-joborder)}.novo-text.text-color-submission{color:var(--color-submission)}.novo-text.text-color-sendout{color:var(--color-sendout)}.novo-text.text-color-placement{color:var(--color-placement)}.novo-text.text-color-note{color:var(--color-note)}.novo-text.text-color-task{color:var(--color-task)}.novo-text.text-color-distribution-list{color:var(--color-distribution-list)}.novo-text.text-color-credential{color:var(--color-credential)}.novo-text.text-color-user{color:var(--color-user)}.novo-text.text-color-corporate-user{color:var(--color-corporate-user)}.novo-text.text-color-contract{color:var(--color-contract)}.novo-text.text-color-job-code{color:var(--color-job-code)}.novo-text.text-color-earn-code{color:var(--color-earn-code)}.novo-text.text-color-billable-charge{color:var(--color-billable-charge)}.novo-text.text-color-payable-charge{color:var(--color-payable-charge)}.novo-text.text-color-invoice-statement{color:var(--color-invoice-statement)}.novo-text.text-color-selection{color:var(--color-selection)}.novo-text.text-color-positive{color:var(--color-positive)}.novo-text.text-color-success{color:var(--color-success)}.novo-text.text-color-warning{color:var(--color-warning)}.novo-text.text-color-error{color:var(--color-error)}.novo-text.text-color-info{color:var(--color-info)}.novo-text.text-color-disabled{color:var(--color-disabled)}.novo-text.text-color-red{color:var(--palette-red-50)}.novo-text.text-color-pink{color:var(--palette-pink-50)}.novo-text.text-color-orange{color:var(--palette-orange-50)}.novo-text.text-color-yellow{color:var(--palette-yellow-50)}.novo-text.text-color-green{color:var(--palette-green-50)}.novo-text.text-color-teal{color:var(--palette-teal-50)}.novo-text.text-color-blue{color:var(--palette-blue-50)}.novo-text.text-color-aqua{color:var(--palette-aqua-50)}.novo-text.text-color-indigo{color:var(--palette-indigo-50)}.novo-text.text-color-violet{color:var(--palette-violet-50)}.novo-text.text-color-gray{color:var(--palette-gray-50)}.novo-text.margin-before{margin-top:.4rem}.novo-text.margin-after{margin-bottom:.8rem}.novo-text.text-length-small{max-width:40ch}.novo-text.text-length-medium{max-width:55ch}.novo-text.text-length-large{max-width:70ch}.novo-text.text-weight-hairline{font-weight:100}.novo-text.text-weight-thin{font-weight:200}.novo-text.text-weight-light{font-weight:300}.novo-text.text-weight-normal{font-weight:400}.novo-text.text-weight-medium{font-weight:500}.novo-text.text-weight-semibold{font-weight:600}.novo-text.text-weight-bold{font-weight:700}.novo-text.text-weight-extrabold{font-weight:800}.novo-text.text-weight-heavy{font-weight:900}.novo-text.text-weight-lighter{font-weight:lighter}.novo-text.text-weight-bolder{font-weight:bolder}.novo-text.text-block{display:block;line-height:1.375em;min-width:55ch;max-width:75ch}\n"] }]
        }], propDecorators: { block: [{
                type: HostBinding,
                args: ['class.text-block']
            }, {
                type: Input
            }] } });

// NG2
/**
 * Tag Example
 * <novo-text size="small" disabled>Label</novo-text
 * <novo-text small disabled>Label</novo-text>
 * <novo-text large disabled>Label</novo-text>
 * <novo-text error>Label</novo-text>
 * <novo-text muted>Label</novo-text>
 * <novo-text class="tc-grapefruit">Label</novo-text>
 * <novo-text color="grapefruit">Label</novo-text>
 */
class NovoLink extends NovoBaseTextElement {
}
NovoLink.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoLink, deps: null, target: i0.ɵɵFactoryTarget.Component });
NovoLink.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoLink, selector: "novo-link", inputs: { href: "href" }, host: { classAttribute: "novo-link" }, usesInheritance: true, ngImport: i0, template: `<a [attr.href]="href"><ng-content></ng-content></a>`, isInline: true, styles: [":host{display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle}:host.text-capitalize{text-transform:capitalize}:host.text-uppercase{text-transform:uppercase}:host.text-nowrap{white-space:nowrap}:host.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host.text-size-default{font-size:inherit}:host.text-size-body{font-size:var(--font-size-body)}:host.text-size-xs{font-size:var(--font-size-xs)}:host.text-size-sm{font-size:var(--font-size-sm)}:host.text-size-md{font-size:var(--font-size-md)}:host.text-size-lg{font-size:var(--font-size-lg)}:host.text-size-xl{font-size:var(--font-size-xl)}:host.text-size-2xl{font-size:var(--font-size-2xl)}:host.text-size-3xl{font-size:var(--font-size-3xl)}:host.text-size-smaller{font-size:.8em}:host.text-size-larger{font-size:1.2em}:host.text-color-person{color:var(--color-person)}:host.text-color-company{color:var(--color-company)}:host.text-color-candidate{color:var(--color-candidate)}:host.text-color-lead{color:var(--color-lead)}:host.text-color-contact{color:var(--color-contact)}:host.text-color-clientcontact{color:var(--color-clientcontact)}:host.text-color-opportunity{color:var(--color-opportunity)}:host.text-color-job{color:var(--color-job)}:host.text-color-joborder{color:var(--color-joborder)}:host.text-color-submission{color:var(--color-submission)}:host.text-color-sendout{color:var(--color-sendout)}:host.text-color-placement{color:var(--color-placement)}:host.text-color-note{color:var(--color-note)}:host.text-color-task{color:var(--color-task)}:host.text-color-distribution-list{color:var(--color-distribution-list)}:host.text-color-credential{color:var(--color-credential)}:host.text-color-user{color:var(--color-user)}:host.text-color-corporate-user{color:var(--color-corporate-user)}:host.text-color-contract{color:var(--color-contract)}:host.text-color-job-code{color:var(--color-job-code)}:host.text-color-earn-code{color:var(--color-earn-code)}:host.text-color-billable-charge{color:var(--color-billable-charge)}:host.text-color-payable-charge{color:var(--color-payable-charge)}:host.text-color-invoice-statement{color:var(--color-invoice-statement)}:host.text-color-selection{color:var(--color-selection)}:host.text-color-positive{color:var(--color-positive)}:host.text-color-success{color:var(--color-success)}:host.text-color-warning{color:var(--color-warning)}:host.text-color-error{color:var(--color-error)}:host.text-color-info{color:var(--color-info)}:host.text-color-disabled{color:var(--color-disabled)}:host.text-color-red{color:var(--palette-red-50)}:host.text-color-pink{color:var(--palette-pink-50)}:host.text-color-orange{color:var(--palette-orange-50)}:host.text-color-yellow{color:var(--palette-yellow-50)}:host.text-color-green{color:var(--palette-green-50)}:host.text-color-teal{color:var(--palette-teal-50)}:host.text-color-blue{color:var(--palette-blue-50)}:host.text-color-aqua{color:var(--palette-aqua-50)}:host.text-color-indigo{color:var(--palette-indigo-50)}:host.text-color-violet{color:var(--palette-violet-50)}:host.text-color-gray{color:var(--palette-gray-50)}:host.margin-before{margin-top:.4rem}:host.margin-after{margin-bottom:.8rem}:host.text-length-small{max-width:40ch}:host.text-length-medium{max-width:55ch}:host.text-length-large{max-width:70ch}:host.text-weight-hairline{font-weight:100}:host.text-weight-thin{font-weight:200}:host.text-weight-light{font-weight:300}:host.text-weight-normal{font-weight:400}:host.text-weight-medium{font-weight:500}:host.text-weight-semibold{font-weight:600}:host.text-weight-bold{font-weight:700}:host.text-weight-extrabold{font-weight:800}:host.text-weight-heavy{font-weight:900}:host.text-weight-lighter{font-weight:lighter}:host.text-weight-bolder{font-weight:bolder}:host::ng-deep novo-icon{font-size:1em}:host novo-icon{font-size:1em}\n"], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoLink, decorators: [{
            type: Component,
            args: [{ selector: 'novo-link', template: `<a [attr.href]="href"><ng-content></ng-content></a>`, encapsulation: ViewEncapsulation.None, host: {
                        class: 'novo-link',
                    }, styles: [":host{display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle}:host.text-capitalize{text-transform:capitalize}:host.text-uppercase{text-transform:uppercase}:host.text-nowrap{white-space:nowrap}:host.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host.text-size-default{font-size:inherit}:host.text-size-body{font-size:var(--font-size-body)}:host.text-size-xs{font-size:var(--font-size-xs)}:host.text-size-sm{font-size:var(--font-size-sm)}:host.text-size-md{font-size:var(--font-size-md)}:host.text-size-lg{font-size:var(--font-size-lg)}:host.text-size-xl{font-size:var(--font-size-xl)}:host.text-size-2xl{font-size:var(--font-size-2xl)}:host.text-size-3xl{font-size:var(--font-size-3xl)}:host.text-size-smaller{font-size:.8em}:host.text-size-larger{font-size:1.2em}:host.text-color-person{color:var(--color-person)}:host.text-color-company{color:var(--color-company)}:host.text-color-candidate{color:var(--color-candidate)}:host.text-color-lead{color:var(--color-lead)}:host.text-color-contact{color:var(--color-contact)}:host.text-color-clientcontact{color:var(--color-clientcontact)}:host.text-color-opportunity{color:var(--color-opportunity)}:host.text-color-job{color:var(--color-job)}:host.text-color-joborder{color:var(--color-joborder)}:host.text-color-submission{color:var(--color-submission)}:host.text-color-sendout{color:var(--color-sendout)}:host.text-color-placement{color:var(--color-placement)}:host.text-color-note{color:var(--color-note)}:host.text-color-task{color:var(--color-task)}:host.text-color-distribution-list{color:var(--color-distribution-list)}:host.text-color-credential{color:var(--color-credential)}:host.text-color-user{color:var(--color-user)}:host.text-color-corporate-user{color:var(--color-corporate-user)}:host.text-color-contract{color:var(--color-contract)}:host.text-color-job-code{color:var(--color-job-code)}:host.text-color-earn-code{color:var(--color-earn-code)}:host.text-color-billable-charge{color:var(--color-billable-charge)}:host.text-color-payable-charge{color:var(--color-payable-charge)}:host.text-color-invoice-statement{color:var(--color-invoice-statement)}:host.text-color-selection{color:var(--color-selection)}:host.text-color-positive{color:var(--color-positive)}:host.text-color-success{color:var(--color-success)}:host.text-color-warning{color:var(--color-warning)}:host.text-color-error{color:var(--color-error)}:host.text-color-info{color:var(--color-info)}:host.text-color-disabled{color:var(--color-disabled)}:host.text-color-red{color:var(--palette-red-50)}:host.text-color-pink{color:var(--palette-pink-50)}:host.text-color-orange{color:var(--palette-orange-50)}:host.text-color-yellow{color:var(--palette-yellow-50)}:host.text-color-green{color:var(--palette-green-50)}:host.text-color-teal{color:var(--palette-teal-50)}:host.text-color-blue{color:var(--palette-blue-50)}:host.text-color-aqua{color:var(--palette-aqua-50)}:host.text-color-indigo{color:var(--palette-indigo-50)}:host.text-color-violet{color:var(--palette-violet-50)}:host.text-color-gray{color:var(--palette-gray-50)}:host.margin-before{margin-top:.4rem}:host.margin-after{margin-bottom:.8rem}:host.text-length-small{max-width:40ch}:host.text-length-medium{max-width:55ch}:host.text-length-large{max-width:70ch}:host.text-weight-hairline{font-weight:100}:host.text-weight-thin{font-weight:200}:host.text-weight-light{font-weight:300}:host.text-weight-normal{font-weight:400}:host.text-weight-medium{font-weight:500}:host.text-weight-semibold{font-weight:600}:host.text-weight-bold{font-weight:700}:host.text-weight-extrabold{font-weight:800}:host.text-weight-heavy{font-weight:900}:host.text-weight-lighter{font-weight:lighter}:host.text-weight-bolder{font-weight:bolder}:host::ng-deep novo-icon{font-size:1em}:host novo-icon{font-size:1em}\n"] }]
        }], propDecorators: { href: [{
                type: Input
            }] } });

// NG2
/**
 * Tag Example
 * <novo-label size="sm" disabled>Label</novo-label
 * <novo-label small disabled>Label</novo-label>
 * <novo-label large disabled>Label</novo-label>
 * <novo-label error>Label</novo-label>
 * <novo-label muted>Label</novo-label>
 * <novo-label class="tc-grapefruit">Label</novo-label>
 * <novo-label color="grapefruit">Label</novo-label>
 */
class NovoLabel extends NovoBaseTextElement {
}
NovoLabel.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoLabel, deps: null, target: i0.ɵɵFactoryTarget.Component });
NovoLabel.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoLabel, selector: "novo-label,[novo-label]", host: { classAttribute: "novo-label" }, usesInheritance: true, ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, styles: [":host{display:inline-block;font-weight:500;word-break:word-break;overflow-wrap:break-word;line-height:1.375;color:var(--color-text-muted);font-size:var(--font-size-label);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle}:host.text-capitalize{text-transform:capitalize}:host.text-uppercase{text-transform:uppercase}:host.text-nowrap{white-space:nowrap}:host.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host.text-size-default{font-size:inherit}:host.text-size-body{font-size:var(--font-size-body)}:host.text-size-xs{font-size:var(--font-size-xs)}:host.text-size-sm{font-size:var(--font-size-sm)}:host.text-size-md{font-size:var(--font-size-md)}:host.text-size-lg{font-size:var(--font-size-lg)}:host.text-size-xl{font-size:var(--font-size-xl)}:host.text-size-2xl{font-size:var(--font-size-2xl)}:host.text-size-3xl{font-size:var(--font-size-3xl)}:host.text-size-smaller{font-size:.8em}:host.text-size-larger{font-size:1.2em}:host.text-color-person{color:var(--color-person)}:host.text-color-company{color:var(--color-company)}:host.text-color-candidate{color:var(--color-candidate)}:host.text-color-lead{color:var(--color-lead)}:host.text-color-contact{color:var(--color-contact)}:host.text-color-clientcontact{color:var(--color-clientcontact)}:host.text-color-opportunity{color:var(--color-opportunity)}:host.text-color-job{color:var(--color-job)}:host.text-color-joborder{color:var(--color-joborder)}:host.text-color-submission{color:var(--color-submission)}:host.text-color-sendout{color:var(--color-sendout)}:host.text-color-placement{color:var(--color-placement)}:host.text-color-note{color:var(--color-note)}:host.text-color-task{color:var(--color-task)}:host.text-color-distribution-list{color:var(--color-distribution-list)}:host.text-color-credential{color:var(--color-credential)}:host.text-color-user{color:var(--color-user)}:host.text-color-corporate-user{color:var(--color-corporate-user)}:host.text-color-contract{color:var(--color-contract)}:host.text-color-job-code{color:var(--color-job-code)}:host.text-color-earn-code{color:var(--color-earn-code)}:host.text-color-billable-charge{color:var(--color-billable-charge)}:host.text-color-payable-charge{color:var(--color-payable-charge)}:host.text-color-invoice-statement{color:var(--color-invoice-statement)}:host.text-color-selection{color:var(--color-selection)}:host.text-color-positive{color:var(--color-positive)}:host.text-color-success{color:var(--color-success)}:host.text-color-warning{color:var(--color-warning)}:host.text-color-error{color:var(--color-error)}:host.text-color-info{color:var(--color-info)}:host.text-color-disabled{color:var(--color-disabled)}:host.text-color-red{color:var(--palette-red-50)}:host.text-color-pink{color:var(--palette-pink-50)}:host.text-color-orange{color:var(--palette-orange-50)}:host.text-color-yellow{color:var(--palette-yellow-50)}:host.text-color-green{color:var(--palette-green-50)}:host.text-color-teal{color:var(--palette-teal-50)}:host.text-color-blue{color:var(--palette-blue-50)}:host.text-color-aqua{color:var(--palette-aqua-50)}:host.text-color-indigo{color:var(--palette-indigo-50)}:host.text-color-violet{color:var(--palette-violet-50)}:host.text-color-gray{color:var(--palette-gray-50)}:host.margin-before{margin-top:.4rem}:host.margin-after{margin-bottom:.8rem}:host.text-length-small{max-width:40ch}:host.text-length-medium{max-width:55ch}:host.text-length-large{max-width:70ch}:host.text-weight-hairline{font-weight:100}:host.text-weight-thin{font-weight:200}:host.text-weight-light{font-weight:300}:host.text-weight-normal{font-weight:400}:host.text-weight-medium{font-weight:500}:host.text-weight-semibold{font-weight:600}:host.text-weight-bold{font-weight:700}:host.text-weight-extrabold{font-weight:800}:host.text-weight-heavy{font-weight:900}:host.text-weight-lighter{font-weight:lighter}:host.text-weight-bolder{font-weight:bolder}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoLabel, decorators: [{
            type: Component,
            args: [{ selector: 'novo-label,[novo-label]', template: ` <ng-content></ng-content> `, host: {
                        class: 'novo-label',
                    }, styles: [":host{display:inline-block;font-weight:500;word-break:word-break;overflow-wrap:break-word;line-height:1.375;color:var(--color-text-muted);font-size:var(--font-size-label);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle}:host.text-capitalize{text-transform:capitalize}:host.text-uppercase{text-transform:uppercase}:host.text-nowrap{white-space:nowrap}:host.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host.text-size-default{font-size:inherit}:host.text-size-body{font-size:var(--font-size-body)}:host.text-size-xs{font-size:var(--font-size-xs)}:host.text-size-sm{font-size:var(--font-size-sm)}:host.text-size-md{font-size:var(--font-size-md)}:host.text-size-lg{font-size:var(--font-size-lg)}:host.text-size-xl{font-size:var(--font-size-xl)}:host.text-size-2xl{font-size:var(--font-size-2xl)}:host.text-size-3xl{font-size:var(--font-size-3xl)}:host.text-size-smaller{font-size:.8em}:host.text-size-larger{font-size:1.2em}:host.text-color-person{color:var(--color-person)}:host.text-color-company{color:var(--color-company)}:host.text-color-candidate{color:var(--color-candidate)}:host.text-color-lead{color:var(--color-lead)}:host.text-color-contact{color:var(--color-contact)}:host.text-color-clientcontact{color:var(--color-clientcontact)}:host.text-color-opportunity{color:var(--color-opportunity)}:host.text-color-job{color:var(--color-job)}:host.text-color-joborder{color:var(--color-joborder)}:host.text-color-submission{color:var(--color-submission)}:host.text-color-sendout{color:var(--color-sendout)}:host.text-color-placement{color:var(--color-placement)}:host.text-color-note{color:var(--color-note)}:host.text-color-task{color:var(--color-task)}:host.text-color-distribution-list{color:var(--color-distribution-list)}:host.text-color-credential{color:var(--color-credential)}:host.text-color-user{color:var(--color-user)}:host.text-color-corporate-user{color:var(--color-corporate-user)}:host.text-color-contract{color:var(--color-contract)}:host.text-color-job-code{color:var(--color-job-code)}:host.text-color-earn-code{color:var(--color-earn-code)}:host.text-color-billable-charge{color:var(--color-billable-charge)}:host.text-color-payable-charge{color:var(--color-payable-charge)}:host.text-color-invoice-statement{color:var(--color-invoice-statement)}:host.text-color-selection{color:var(--color-selection)}:host.text-color-positive{color:var(--color-positive)}:host.text-color-success{color:var(--color-success)}:host.text-color-warning{color:var(--color-warning)}:host.text-color-error{color:var(--color-error)}:host.text-color-info{color:var(--color-info)}:host.text-color-disabled{color:var(--color-disabled)}:host.text-color-red{color:var(--palette-red-50)}:host.text-color-pink{color:var(--palette-pink-50)}:host.text-color-orange{color:var(--palette-orange-50)}:host.text-color-yellow{color:var(--palette-yellow-50)}:host.text-color-green{color:var(--palette-green-50)}:host.text-color-teal{color:var(--palette-teal-50)}:host.text-color-blue{color:var(--palette-blue-50)}:host.text-color-aqua{color:var(--palette-aqua-50)}:host.text-color-indigo{color:var(--palette-indigo-50)}:host.text-color-violet{color:var(--palette-violet-50)}:host.text-color-gray{color:var(--palette-gray-50)}:host.margin-before{margin-top:.4rem}:host.margin-after{margin-bottom:.8rem}:host.text-length-small{max-width:40ch}:host.text-length-medium{max-width:55ch}:host.text-length-large{max-width:70ch}:host.text-weight-hairline{font-weight:100}:host.text-weight-thin{font-weight:200}:host.text-weight-light{font-weight:300}:host.text-weight-normal{font-weight:400}:host.text-weight-medium{font-weight:500}:host.text-weight-semibold{font-weight:600}:host.text-weight-bold{font-weight:700}:host.text-weight-extrabold{font-weight:800}:host.text-weight-heavy{font-weight:900}:host.text-weight-lighter{font-weight:lighter}:host.text-weight-bolder{font-weight:bolder}\n"] }]
        }] });

// NG2
/**
 * Tag Example
 * <novo-title size="sm" disabled>Label</novo-title
 * <novo-title small disabled>Label</novo-title>
 * <novo-title large disabled>Label</novo-title>
 * <novo-title error>Label</novo-title>
 * <novo-title muted>Label</novo-title>
 * <novo-title class="tc-grapefruit">Label</novo-title>
 * <novo-title color="grapefruit">Label</novo-title>
 */
class NovoCaption extends NovoBaseTextElement {
}
NovoCaption.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCaption, deps: null, target: i0.ɵɵFactoryTarget.Component });
NovoCaption.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoCaption, selector: "novo-caption,[novo-caption]", host: { classAttribute: "novo-caption" }, usesInheritance: true, ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, styles: [":host{display:inline;font-size:var(--font-size-caption);font-weight:400;line-height:1.375;color:var(--color-text-muted);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle}:host.text-capitalize{text-transform:capitalize}:host.text-uppercase{text-transform:uppercase}:host.text-nowrap{white-space:nowrap}:host.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host.text-size-default{font-size:inherit}:host.text-size-body{font-size:var(--font-size-body)}:host.text-size-xs{font-size:var(--font-size-xs)}:host.text-size-sm{font-size:var(--font-size-sm)}:host.text-size-md{font-size:var(--font-size-md)}:host.text-size-lg{font-size:var(--font-size-lg)}:host.text-size-xl{font-size:var(--font-size-xl)}:host.text-size-2xl{font-size:var(--font-size-2xl)}:host.text-size-3xl{font-size:var(--font-size-3xl)}:host.text-size-smaller{font-size:.8em}:host.text-size-larger{font-size:1.2em}:host.text-color-person{color:var(--color-person)}:host.text-color-company{color:var(--color-company)}:host.text-color-candidate{color:var(--color-candidate)}:host.text-color-lead{color:var(--color-lead)}:host.text-color-contact{color:var(--color-contact)}:host.text-color-clientcontact{color:var(--color-clientcontact)}:host.text-color-opportunity{color:var(--color-opportunity)}:host.text-color-job{color:var(--color-job)}:host.text-color-joborder{color:var(--color-joborder)}:host.text-color-submission{color:var(--color-submission)}:host.text-color-sendout{color:var(--color-sendout)}:host.text-color-placement{color:var(--color-placement)}:host.text-color-note{color:var(--color-note)}:host.text-color-task{color:var(--color-task)}:host.text-color-distribution-list{color:var(--color-distribution-list)}:host.text-color-credential{color:var(--color-credential)}:host.text-color-user{color:var(--color-user)}:host.text-color-corporate-user{color:var(--color-corporate-user)}:host.text-color-contract{color:var(--color-contract)}:host.text-color-job-code{color:var(--color-job-code)}:host.text-color-earn-code{color:var(--color-earn-code)}:host.text-color-billable-charge{color:var(--color-billable-charge)}:host.text-color-payable-charge{color:var(--color-payable-charge)}:host.text-color-invoice-statement{color:var(--color-invoice-statement)}:host.text-color-selection{color:var(--color-selection)}:host.text-color-positive{color:var(--color-positive)}:host.text-color-success{color:var(--color-success)}:host.text-color-warning{color:var(--color-warning)}:host.text-color-error{color:var(--color-error)}:host.text-color-info{color:var(--color-info)}:host.text-color-disabled{color:var(--color-disabled)}:host.text-color-red{color:var(--palette-red-50)}:host.text-color-pink{color:var(--palette-pink-50)}:host.text-color-orange{color:var(--palette-orange-50)}:host.text-color-yellow{color:var(--palette-yellow-50)}:host.text-color-green{color:var(--palette-green-50)}:host.text-color-teal{color:var(--palette-teal-50)}:host.text-color-blue{color:var(--palette-blue-50)}:host.text-color-aqua{color:var(--palette-aqua-50)}:host.text-color-indigo{color:var(--palette-indigo-50)}:host.text-color-violet{color:var(--palette-violet-50)}:host.text-color-gray{color:var(--palette-gray-50)}:host.margin-before{margin-top:.4rem}:host.margin-after{margin-bottom:.8rem}:host.text-length-small{max-width:40ch}:host.text-length-medium{max-width:55ch}:host.text-length-large{max-width:70ch}:host.text-weight-hairline{font-weight:100}:host.text-weight-thin{font-weight:200}:host.text-weight-light{font-weight:300}:host.text-weight-normal{font-weight:400}:host.text-weight-medium{font-weight:500}:host.text-weight-semibold{font-weight:600}:host.text-weight-bold{font-weight:700}:host.text-weight-extrabold{font-weight:800}:host.text-weight-heavy{font-weight:900}:host.text-weight-lighter{font-weight:lighter}:host.text-weight-bolder{font-weight:bolder}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCaption, decorators: [{
            type: Component,
            args: [{ selector: 'novo-caption,[novo-caption]', template: ` <ng-content></ng-content> `, host: {
                        class: 'novo-caption',
                    }, styles: [":host{display:inline;font-size:var(--font-size-caption);font-weight:400;line-height:1.375;color:var(--color-text-muted);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle}:host.text-capitalize{text-transform:capitalize}:host.text-uppercase{text-transform:uppercase}:host.text-nowrap{white-space:nowrap}:host.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host.text-size-default{font-size:inherit}:host.text-size-body{font-size:var(--font-size-body)}:host.text-size-xs{font-size:var(--font-size-xs)}:host.text-size-sm{font-size:var(--font-size-sm)}:host.text-size-md{font-size:var(--font-size-md)}:host.text-size-lg{font-size:var(--font-size-lg)}:host.text-size-xl{font-size:var(--font-size-xl)}:host.text-size-2xl{font-size:var(--font-size-2xl)}:host.text-size-3xl{font-size:var(--font-size-3xl)}:host.text-size-smaller{font-size:.8em}:host.text-size-larger{font-size:1.2em}:host.text-color-person{color:var(--color-person)}:host.text-color-company{color:var(--color-company)}:host.text-color-candidate{color:var(--color-candidate)}:host.text-color-lead{color:var(--color-lead)}:host.text-color-contact{color:var(--color-contact)}:host.text-color-clientcontact{color:var(--color-clientcontact)}:host.text-color-opportunity{color:var(--color-opportunity)}:host.text-color-job{color:var(--color-job)}:host.text-color-joborder{color:var(--color-joborder)}:host.text-color-submission{color:var(--color-submission)}:host.text-color-sendout{color:var(--color-sendout)}:host.text-color-placement{color:var(--color-placement)}:host.text-color-note{color:var(--color-note)}:host.text-color-task{color:var(--color-task)}:host.text-color-distribution-list{color:var(--color-distribution-list)}:host.text-color-credential{color:var(--color-credential)}:host.text-color-user{color:var(--color-user)}:host.text-color-corporate-user{color:var(--color-corporate-user)}:host.text-color-contract{color:var(--color-contract)}:host.text-color-job-code{color:var(--color-job-code)}:host.text-color-earn-code{color:var(--color-earn-code)}:host.text-color-billable-charge{color:var(--color-billable-charge)}:host.text-color-payable-charge{color:var(--color-payable-charge)}:host.text-color-invoice-statement{color:var(--color-invoice-statement)}:host.text-color-selection{color:var(--color-selection)}:host.text-color-positive{color:var(--color-positive)}:host.text-color-success{color:var(--color-success)}:host.text-color-warning{color:var(--color-warning)}:host.text-color-error{color:var(--color-error)}:host.text-color-info{color:var(--color-info)}:host.text-color-disabled{color:var(--color-disabled)}:host.text-color-red{color:var(--palette-red-50)}:host.text-color-pink{color:var(--palette-pink-50)}:host.text-color-orange{color:var(--palette-orange-50)}:host.text-color-yellow{color:var(--palette-yellow-50)}:host.text-color-green{color:var(--palette-green-50)}:host.text-color-teal{color:var(--palette-teal-50)}:host.text-color-blue{color:var(--palette-blue-50)}:host.text-color-aqua{color:var(--palette-aqua-50)}:host.text-color-indigo{color:var(--palette-indigo-50)}:host.text-color-violet{color:var(--palette-violet-50)}:host.text-color-gray{color:var(--palette-gray-50)}:host.margin-before{margin-top:.4rem}:host.margin-after{margin-bottom:.8rem}:host.text-length-small{max-width:40ch}:host.text-length-medium{max-width:55ch}:host.text-length-large{max-width:70ch}:host.text-weight-hairline{font-weight:100}:host.text-weight-thin{font-weight:200}:host.text-weight-light{font-weight:300}:host.text-weight-normal{font-weight:400}:host.text-weight-medium{font-weight:500}:host.text-weight-semibold{font-weight:600}:host.text-weight-bold{font-weight:700}:host.text-weight-extrabold{font-weight:800}:host.text-weight-heavy{font-weight:900}:host.text-weight-lighter{font-weight:lighter}:host.text-weight-bolder{font-weight:bolder}\n"] }]
        }] });

/** Mixin to augment a directive with a `disabled` property. */
function mixinDisabled(base) {
    return class extends base {
        constructor(...args) {
            super(...args);
            this._disabled = false;
        }
        get disabled() {
            return this._disabled;
        }
        set disabled(value) {
            this._disabled = coerceBooleanProperty(value);
        }
    };
}

/**
 * Injection token used to provide the parent component to options.
 */
const NOVO_OPTION_PARENT_COMPONENT = new InjectionToken('NOVO_OPTION_PARENT_COMPONENT');

// Notes on the accessibility pattern used for `novo-optgroup`.
// The option group has two different "modes": regular and novoInert. The regular mode uses the
// recommended a11y pattern which has `role="group"` on the group element with `aria-labelledby`
// pointing to the label. This works for `novo-select`, but it seems to hit a bug for autocomplete
// under VoiceOver where the group doesn't get read out at all. The bug appears to be that if
// there's __any__ a11y-related attribute on the group (e.g. `role` or `aria-labelledby`),
// VoiceOver on Safari won't read it out.
// We've introduced the `novoInert` mode as a workaround. Under this mode, all a11y attributes are
// removed from the group, and we get the screen reader to read out the group label by mirroring it
// inside an invisible element in the option. This is sub-optimal, because the screen reader will
// repeat the group label on each navigation, whereas the default pattern only reads the group when
// the user enters a new group. The following alternate approaches were considered:
// 1. Reading out the group label using the `LiveAnnouncer` solves the problem, but we can't control
//    when the text will be read out so sometimes it comes in too late or never if the user
//    navigates quickly.
// 2. `<novo-option aria-describedby="groupLabel"` - This works on Safari, but VoiceOver in Chrome
//    won't read out the description at all.
// 3. `<novo-option aria-labelledby="optionLabel groupLabel"` - This works on Chrome, but Safari
//     doesn't read out the text at all. Furthermore, on
// Boilerplate for applying mixins to NovoOptgroup.
class NovoOptgroupBase {
    constructor() {
        /** Unique id for the underlying label. */
        this._labelId = `novo-optgroup-label-${_uniqueOptgroupIdCounter++}`;
    }
}
NovoOptgroupBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoOptgroupBase, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NovoOptgroupBase.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoOptgroupBase, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoOptgroupBase, decorators: [{
            type: Directive
        }] });
const NovoOptgroupMixinBase = mixinDisabled(NovoOptgroupBase);
// Counter for unique group ids.
let _uniqueOptgroupIdCounter = 0;
/**
 * Injection token that can be used to reference instances of `NovoOptgroup`. It serves as
 * alternative token to the actual `NovoOptgroup` class which could cause unnecessary
 * retention of the class and its component metadata.
 */
const NOVO_OPTGROUP = new InjectionToken('NovoOptgroup');
/**
 * Component that is used to group instances of `novo-option`.
 */
class NovoOptgroup extends NovoOptgroupMixinBase {
    constructor(parent) {
        super();
        this._novoInert = parent?.inertGroups ?? false;
    }
}
NovoOptgroup.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoOptgroup, deps: [{ token: NOVO_OPTION_PARENT_COMPONENT, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NovoOptgroup.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoOptgroup, selector: "novo-optgroup", inputs: { disabled: "disabled", label: "label" }, host: { properties: { "attr.role": "_novoInert ? null : \"group\"", "attr.aria-disabled": "_novoInert ? null : disabled.toString()", "attr.aria-labelledby": "_novoInert ? null : _labelId", "class.novo-optgroup-disabled": "disabled" }, classAttribute: "novo-optgroup" }, providers: [{ provide: NOVO_OPTGROUP, useExisting: NovoOptgroup }], exportAs: ["novoOptgroup"], usesInheritance: true, ngImport: i0, template: "<span *ngIf=\"label\" class=\"novo-optgroup-label\" aria-hidden=\"true\" [id]=\"_labelId\">{{ label }}</span>\n<ng-content select=\"novo-option, ng-container, novo-divider, cdk-virtual-scroll-viewport\"></ng-content>", styles: [":host .novo-optgroup-label{font-weight:500;word-break:word-break;overflow-wrap:break-word;line-height:1.375;font-size:var(--font-size-label);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;color:var(--color-text-muted);cursor:default;flex:1;padding:5px 10px;display:block}:host .novo-optgroup-label.text-capitalize{text-transform:capitalize}:host .novo-optgroup-label.text-uppercase{text-transform:uppercase}:host .novo-optgroup-label.text-nowrap{white-space:nowrap}:host .novo-optgroup-label.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .novo-optgroup-label.text-size-default{font-size:inherit}:host .novo-optgroup-label.text-size-body{font-size:var(--font-size-body)}:host .novo-optgroup-label.text-size-xs{font-size:var(--font-size-xs)}:host .novo-optgroup-label.text-size-sm{font-size:var(--font-size-sm)}:host .novo-optgroup-label.text-size-md{font-size:var(--font-size-md)}:host .novo-optgroup-label.text-size-lg{font-size:var(--font-size-lg)}:host .novo-optgroup-label.text-size-xl{font-size:var(--font-size-xl)}:host .novo-optgroup-label.text-size-2xl{font-size:var(--font-size-2xl)}:host .novo-optgroup-label.text-size-3xl{font-size:var(--font-size-3xl)}:host .novo-optgroup-label.text-size-smaller{font-size:.8em}:host .novo-optgroup-label.text-size-larger{font-size:1.2em}:host .novo-optgroup-label.text-color-person{color:var(--color-person)}:host .novo-optgroup-label.text-color-company{color:var(--color-company)}:host .novo-optgroup-label.text-color-candidate{color:var(--color-candidate)}:host .novo-optgroup-label.text-color-lead{color:var(--color-lead)}:host .novo-optgroup-label.text-color-contact{color:var(--color-contact)}:host .novo-optgroup-label.text-color-clientcontact{color:var(--color-clientcontact)}:host .novo-optgroup-label.text-color-opportunity{color:var(--color-opportunity)}:host .novo-optgroup-label.text-color-job{color:var(--color-job)}:host .novo-optgroup-label.text-color-joborder{color:var(--color-joborder)}:host .novo-optgroup-label.text-color-submission{color:var(--color-submission)}:host .novo-optgroup-label.text-color-sendout{color:var(--color-sendout)}:host .novo-optgroup-label.text-color-placement{color:var(--color-placement)}:host .novo-optgroup-label.text-color-note{color:var(--color-note)}:host .novo-optgroup-label.text-color-task{color:var(--color-task)}:host .novo-optgroup-label.text-color-distribution-list{color:var(--color-distribution-list)}:host .novo-optgroup-label.text-color-credential{color:var(--color-credential)}:host .novo-optgroup-label.text-color-user{color:var(--color-user)}:host .novo-optgroup-label.text-color-corporate-user{color:var(--color-corporate-user)}:host .novo-optgroup-label.text-color-contract{color:var(--color-contract)}:host .novo-optgroup-label.text-color-job-code{color:var(--color-job-code)}:host .novo-optgroup-label.text-color-earn-code{color:var(--color-earn-code)}:host .novo-optgroup-label.text-color-billable-charge{color:var(--color-billable-charge)}:host .novo-optgroup-label.text-color-payable-charge{color:var(--color-payable-charge)}:host .novo-optgroup-label.text-color-invoice-statement{color:var(--color-invoice-statement)}:host .novo-optgroup-label.text-color-selection{color:var(--color-selection)}:host .novo-optgroup-label.text-color-positive{color:var(--color-positive)}:host .novo-optgroup-label.text-color-success{color:var(--color-success)}:host .novo-optgroup-label.text-color-warning{color:var(--color-warning)}:host .novo-optgroup-label.text-color-error{color:var(--color-error)}:host .novo-optgroup-label.text-color-info{color:var(--color-info)}:host .novo-optgroup-label.text-color-disabled{color:var(--color-disabled)}:host .novo-optgroup-label.text-color-red{color:var(--palette-red-50)}:host .novo-optgroup-label.text-color-pink{color:var(--palette-pink-50)}:host .novo-optgroup-label.text-color-orange{color:var(--palette-orange-50)}:host .novo-optgroup-label.text-color-yellow{color:var(--palette-yellow-50)}:host .novo-optgroup-label.text-color-green{color:var(--palette-green-50)}:host .novo-optgroup-label.text-color-teal{color:var(--palette-teal-50)}:host .novo-optgroup-label.text-color-blue{color:var(--palette-blue-50)}:host .novo-optgroup-label.text-color-aqua{color:var(--palette-aqua-50)}:host .novo-optgroup-label.text-color-indigo{color:var(--palette-indigo-50)}:host .novo-optgroup-label.text-color-violet{color:var(--palette-violet-50)}:host .novo-optgroup-label.text-color-gray{color:var(--palette-gray-50)}:host .novo-optgroup-label.margin-before{margin-top:.4rem}:host .novo-optgroup-label.margin-after{margin-bottom:.8rem}:host .novo-optgroup-label.text-length-small{max-width:40ch}:host .novo-optgroup-label.text-length-medium{max-width:55ch}:host .novo-optgroup-label.text-length-large{max-width:70ch}:host .novo-optgroup-label.text-weight-hairline{font-weight:100}:host .novo-optgroup-label.text-weight-thin{font-weight:200}:host .novo-optgroup-label.text-weight-light{font-weight:300}:host .novo-optgroup-label.text-weight-normal{font-weight:400}:host .novo-optgroup-label.text-weight-medium{font-weight:500}:host .novo-optgroup-label.text-weight-semibold{font-weight:600}:host .novo-optgroup-label.text-weight-bold{font-weight:700}:host .novo-optgroup-label.text-weight-extrabold{font-weight:800}:host .novo-optgroup-label.text-weight-heavy{font-weight:900}:host .novo-optgroup-label.text-weight-lighter{font-weight:lighter}:host .novo-optgroup-label.text-weight-bolder{font-weight:bolder}\n"], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoOptgroup, decorators: [{
            type: Component,
            args: [{ selector: 'novo-optgroup', exportAs: 'novoOptgroup', changeDetection: ChangeDetectionStrategy.OnPush, inputs: ['disabled', 'label'], host: {
                        class: 'novo-optgroup',
                        '[attr.role]': '_novoInert ? null : "group"',
                        '[attr.aria-disabled]': '_novoInert ? null : disabled.toString()',
                        '[attr.aria-labelledby]': '_novoInert ? null : _labelId',
                        '[class.novo-optgroup-disabled]': 'disabled',
                    }, providers: [{ provide: NOVO_OPTGROUP, useExisting: NovoOptgroup }], template: "<span *ngIf=\"label\" class=\"novo-optgroup-label\" aria-hidden=\"true\" [id]=\"_labelId\">{{ label }}</span>\n<ng-content select=\"novo-option, ng-container, novo-divider, cdk-virtual-scroll-viewport\"></ng-content>", styles: [":host .novo-optgroup-label{font-weight:500;word-break:word-break;overflow-wrap:break-word;line-height:1.375;font-size:var(--font-size-label);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;color:var(--color-text-muted);cursor:default;flex:1;padding:5px 10px;display:block}:host .novo-optgroup-label.text-capitalize{text-transform:capitalize}:host .novo-optgroup-label.text-uppercase{text-transform:uppercase}:host .novo-optgroup-label.text-nowrap{white-space:nowrap}:host .novo-optgroup-label.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .novo-optgroup-label.text-size-default{font-size:inherit}:host .novo-optgroup-label.text-size-body{font-size:var(--font-size-body)}:host .novo-optgroup-label.text-size-xs{font-size:var(--font-size-xs)}:host .novo-optgroup-label.text-size-sm{font-size:var(--font-size-sm)}:host .novo-optgroup-label.text-size-md{font-size:var(--font-size-md)}:host .novo-optgroup-label.text-size-lg{font-size:var(--font-size-lg)}:host .novo-optgroup-label.text-size-xl{font-size:var(--font-size-xl)}:host .novo-optgroup-label.text-size-2xl{font-size:var(--font-size-2xl)}:host .novo-optgroup-label.text-size-3xl{font-size:var(--font-size-3xl)}:host .novo-optgroup-label.text-size-smaller{font-size:.8em}:host .novo-optgroup-label.text-size-larger{font-size:1.2em}:host .novo-optgroup-label.text-color-person{color:var(--color-person)}:host .novo-optgroup-label.text-color-company{color:var(--color-company)}:host .novo-optgroup-label.text-color-candidate{color:var(--color-candidate)}:host .novo-optgroup-label.text-color-lead{color:var(--color-lead)}:host .novo-optgroup-label.text-color-contact{color:var(--color-contact)}:host .novo-optgroup-label.text-color-clientcontact{color:var(--color-clientcontact)}:host .novo-optgroup-label.text-color-opportunity{color:var(--color-opportunity)}:host .novo-optgroup-label.text-color-job{color:var(--color-job)}:host .novo-optgroup-label.text-color-joborder{color:var(--color-joborder)}:host .novo-optgroup-label.text-color-submission{color:var(--color-submission)}:host .novo-optgroup-label.text-color-sendout{color:var(--color-sendout)}:host .novo-optgroup-label.text-color-placement{color:var(--color-placement)}:host .novo-optgroup-label.text-color-note{color:var(--color-note)}:host .novo-optgroup-label.text-color-task{color:var(--color-task)}:host .novo-optgroup-label.text-color-distribution-list{color:var(--color-distribution-list)}:host .novo-optgroup-label.text-color-credential{color:var(--color-credential)}:host .novo-optgroup-label.text-color-user{color:var(--color-user)}:host .novo-optgroup-label.text-color-corporate-user{color:var(--color-corporate-user)}:host .novo-optgroup-label.text-color-contract{color:var(--color-contract)}:host .novo-optgroup-label.text-color-job-code{color:var(--color-job-code)}:host .novo-optgroup-label.text-color-earn-code{color:var(--color-earn-code)}:host .novo-optgroup-label.text-color-billable-charge{color:var(--color-billable-charge)}:host .novo-optgroup-label.text-color-payable-charge{color:var(--color-payable-charge)}:host .novo-optgroup-label.text-color-invoice-statement{color:var(--color-invoice-statement)}:host .novo-optgroup-label.text-color-selection{color:var(--color-selection)}:host .novo-optgroup-label.text-color-positive{color:var(--color-positive)}:host .novo-optgroup-label.text-color-success{color:var(--color-success)}:host .novo-optgroup-label.text-color-warning{color:var(--color-warning)}:host .novo-optgroup-label.text-color-error{color:var(--color-error)}:host .novo-optgroup-label.text-color-info{color:var(--color-info)}:host .novo-optgroup-label.text-color-disabled{color:var(--color-disabled)}:host .novo-optgroup-label.text-color-red{color:var(--palette-red-50)}:host .novo-optgroup-label.text-color-pink{color:var(--palette-pink-50)}:host .novo-optgroup-label.text-color-orange{color:var(--palette-orange-50)}:host .novo-optgroup-label.text-color-yellow{color:var(--palette-yellow-50)}:host .novo-optgroup-label.text-color-green{color:var(--palette-green-50)}:host .novo-optgroup-label.text-color-teal{color:var(--palette-teal-50)}:host .novo-optgroup-label.text-color-blue{color:var(--palette-blue-50)}:host .novo-optgroup-label.text-color-aqua{color:var(--palette-aqua-50)}:host .novo-optgroup-label.text-color-indigo{color:var(--palette-indigo-50)}:host .novo-optgroup-label.text-color-violet{color:var(--palette-violet-50)}:host .novo-optgroup-label.text-color-gray{color:var(--palette-gray-50)}:host .novo-optgroup-label.margin-before{margin-top:.4rem}:host .novo-optgroup-label.margin-after{margin-bottom:.8rem}:host .novo-optgroup-label.text-length-small{max-width:40ch}:host .novo-optgroup-label.text-length-medium{max-width:55ch}:host .novo-optgroup-label.text-length-large{max-width:70ch}:host .novo-optgroup-label.text-weight-hairline{font-weight:100}:host .novo-optgroup-label.text-weight-thin{font-weight:200}:host .novo-optgroup-label.text-weight-light{font-weight:300}:host .novo-optgroup-label.text-weight-normal{font-weight:400}:host .novo-optgroup-label.text-weight-medium{font-weight:500}:host .novo-optgroup-label.text-weight-semibold{font-weight:600}:host .novo-optgroup-label.text-weight-bold{font-weight:700}:host .novo-optgroup-label.text-weight-extrabold{font-weight:800}:host .novo-optgroup-label.text-weight-heavy{font-weight:900}:host .novo-optgroup-label.text-weight-lighter{font-weight:lighter}:host .novo-optgroup-label.text-weight-bolder{font-weight:bolder}\n"] }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [NOVO_OPTION_PARENT_COMPONENT]
                }, {
                    type: Optional
                }] }]; } });

/**
 * Component that shows a simplified checkbox without including any kind of "real" checkbox.
 * Meant to be used when the checkbox is purely decorative and a large number of them will be
 * included, such as for the options in a multi-select. Uses no SVGs or complex animations.
 * Note that theming is meant to be handled by the parent element, e.g.
 * `novo-primary .novo-pseudo-checkbox`.
 *
 * Note that this component will be completely invisible to screen-reader users. This is *not*
 * interchangeable with `<novo-checkbox>` and should *not* be used if the user would directly
 * interact with the checkbox. The pseudo-checkbox should only be used as an implementation detail
 * of more complex components that appropriately handle selected / checked state.
 * @docs-private
 */
class NovoPseudoCheckbox {
    constructor(_animationMode) {
        this._animationMode = _animationMode;
        /** Display state of the checkbox. */
        this.state = 'unchecked';
        /** Display state of the checkbox. */
        this.shape = 'box';
        /** Whether the checkbox is disabled. */
        this.disabled = false;
    }
}
NovoPseudoCheckbox.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPseudoCheckbox, deps: [{ token: ANIMATION_MODULE_TYPE, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NovoPseudoCheckbox.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoPseudoCheckbox, selector: "novo-pseudo-checkbox", inputs: { state: "state", shape: "shape", disabled: "disabled" }, host: { properties: { "class.novo-pseudo-checkbox-indeterminate": "state === \"indeterminate\"", "class.novo-pseudo-checkbox-checked": "state === \"checked\"", "class.novo-pseudo-checkbox-disabled": "disabled", "class._novo-animation-noopable": "_animationMode === \"NoopAnimations\"" }, classAttribute: "novo-pseudo-checkbox" }, ngImport: i0, template: ` <i
    [class.bhi-checkbox-empty]="state === 'unchecked' && shape === 'box'"
    [class.bhi-checkbox-filled]="state === 'checked' && shape === 'box'"
    [class.bhi-checkbox-indeterminate]="state === 'indeterminate' && shape === 'box'"
    [class.bhi-circle-o]="state === 'unchecked' && shape === 'circle'"
    [class.bhi-check-circle-filled]="state === 'checked' && shape === 'circle'"
    [class.bhi-circle]="state === 'indeterminate' && shape === 'circle'"
    [class.bhi-box-empty]="state === 'unchecked' && shape === 'line'"
    [class.bhi-check]="state === 'checked' && shape === 'line'"
    [class.bhi-box-minus-o]="state === 'indeterminate' && shape === 'line'"
  ></i>`, isInline: true, styles: [".novo-pseudo-checkbox{width:16px;height:16px;cursor:pointer;display:inline-block;vertical-align:middle;box-sizing:border-box;position:relative;flex-shrink:0;transition:color .3s ease-in-out}.novo-pseudo-checkbox.novo-pseudo-checkbox-checked,.novo-pseudo-checkbox.novo-pseudo-checkbox-indeterminate{color:var(--color-selection);-webkit-animation:iconEnter .16s ease-in-out;animation:iconEnter .16s ease-in-out}.novo-pseudo-checkbox i{font-size:1.4rem;line-height:1rem}.novo-pseudo-checkbox-disabled{cursor:default}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPseudoCheckbox, decorators: [{
            type: Component,
            args: [{ encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, selector: 'novo-pseudo-checkbox', template: ` <i
    [class.bhi-checkbox-empty]="state === 'unchecked' && shape === 'box'"
    [class.bhi-checkbox-filled]="state === 'checked' && shape === 'box'"
    [class.bhi-checkbox-indeterminate]="state === 'indeterminate' && shape === 'box'"
    [class.bhi-circle-o]="state === 'unchecked' && shape === 'circle'"
    [class.bhi-check-circle-filled]="state === 'checked' && shape === 'circle'"
    [class.bhi-circle]="state === 'indeterminate' && shape === 'circle'"
    [class.bhi-box-empty]="state === 'unchecked' && shape === 'line'"
    [class.bhi-check]="state === 'checked' && shape === 'line'"
    [class.bhi-box-minus-o]="state === 'indeterminate' && shape === 'line'"
  ></i>`, host: {
                        class: 'novo-pseudo-checkbox',
                        '[class.novo-pseudo-checkbox-indeterminate]': 'state === "indeterminate"',
                        '[class.novo-pseudo-checkbox-checked]': 'state === "checked"',
                        '[class.novo-pseudo-checkbox-disabled]': 'disabled',
                        '[class._novo-animation-noopable]': '_animationMode === "NoopAnimations"',
                    }, styles: [".novo-pseudo-checkbox{width:16px;height:16px;cursor:pointer;display:inline-block;vertical-align:middle;box-sizing:border-box;position:relative;flex-shrink:0;transition:color .3s ease-in-out}.novo-pseudo-checkbox.novo-pseudo-checkbox-checked,.novo-pseudo-checkbox.novo-pseudo-checkbox-indeterminate{color:var(--color-selection);-webkit-animation:iconEnter .16s ease-in-out;animation:iconEnter .16s ease-in-out}.novo-pseudo-checkbox i{font-size:1.4rem;line-height:1rem}.novo-pseudo-checkbox-disabled{cursor:default}\n"] }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [ANIMATION_MODULE_TYPE]
                }] }]; }, propDecorators: { state: [{
                type: Input
            }], shape: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });

var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$1 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Option IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
let _uniqueIdCounter = 0;
/** Event object emitted by NovoOption when selected or deselected. */
class NovoOptionSelectionChange {
    constructor(
    /** Reference to the option that emitted the event. */
    source, 
    /** Whether the change in the option's value was a result of a user action. */
    isUserInput = false) {
        this.source = source;
        this.isUserInput = isUserInput;
    }
}
class NovoOptionBase {
    constructor(_element, _changeDetectorRef, _parent, group) {
        this._element = _element;
        this._changeDetectorRef = _changeDetectorRef;
        this._parent = _parent;
        this.group = group;
        this._selected = false;
        this._active = false;
        this._disabled = false;
        this._mostRecentViewValue = '';
        /** TODO: deprecate maybe, check support for table headers */
        this.keepOpen = false;
        this.novoInert = false;
        /** The unique ID of the option. */
        this.id = `novo-option-${_uniqueIdCounter++}`;
        /** Event emitted when the option is selected or deselected. */
        // tslint:disable-next-line:no-output-on-prefix
        this.onSelectionChange = new EventEmitter();
        /** Emits when the state of the option changes and any parents have to be notified. */
        this._stateChanges = new Subject();
        // (click) is overridden when defined by user.
        this._clickCapture = fromEvent(this._element.nativeElement, 'click', { capture: true }).subscribe((evt) => {
            this._handleDisabledClick(evt);
        });
        this._clickPassive = fromEvent(this._element.nativeElement, 'click').subscribe((evt) => {
            setTimeout(() => this._handlePassiveClick(evt));
        });
    }
    /** If there is no parent then nothing is managing the selection. */
    get selectable() {
        return this._parent;
    }
    /** Whether the wrapping component is in multiple selection mode. */
    get multiple() {
        return this._parent && this._parent.multiple;
    }
    /** Whether the option is disabled. */
    get disabled() {
        return (this.group && this.group.disabled) || this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    get selected() {
        return this._selected;
    }
    set selected(value) {
        this._selected = coerceBooleanProperty(value);
    }
    /**
     * Whether or not the option is currently active and ready to be selected.
     * An active option displays styles as if it is focused, but the
     * focus is actually retained somewhere else. This comes in handy
     * for components like autocomplete where focus must remain on the input.
     */
    get active() {
        return this._active;
    }
    /**
     * The displayed value of the option. It is necessary to show the selected option in the
     * select's trigger.
     */
    get viewValue() {
        return (this._getHostElement().textContent || '').trim();
    }
    /** Selects the option. */
    select() {
        if (!this._selected) {
            this._selected = true;
            this._changeDetectorRef.markForCheck();
            // this._emitSelectionChangeEvent();
        }
    }
    /** Deselects the option. */
    deselect() {
        if (this._selected) {
            this._selected = false;
            this._changeDetectorRef.markForCheck();
            // this._emitSelectionChangeEvent();
        }
    }
    /** Sets focus onto this option. */
    focus(_origin, options) {
        // Note that we aren't using `_origin`, but we need to keep it because some internal consumers
        // use `NovoOption` in a `FocusKeyManager` and we need it to match `FocusableOption`.
        const element = this._getHostElement();
        if (typeof element.focus === 'function') {
            element.focus(options);
        }
    }
    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    setActiveStyles() {
        if (!this._active) {
            this._active = true;
            this._changeDetectorRef.markForCheck();
        }
    }
    /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    setInactiveStyles() {
        if (this._active) {
            this._active = false;
            this._changeDetectorRef.markForCheck();
        }
    }
    /** Gets the label to be used when determining whether the option should be focused. */
    getLabel() {
        return this.viewValue;
    }
    _handleDisabledClick(event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
        }
    }
    _handlePassiveClick(event) {
        if (!this.novoInert) {
            this._selectViaInteraction();
        }
    }
    /** Ensures the option is selected when activated from the keyboard. */
    _handleKeydown(event) {
        if (event.target instanceof HTMLInputElement && event.key === "Enter" /* Enter */) {
            this._emitSelectionChangeEvent(!this.keepOpen);
        }
        else if (!(event.target instanceof HTMLInputElement) &&
            (event.key === "Enter" /* Enter */ || event.key === " " /* Space */) &&
            !hasModifierKey(event)) {
            this._selectViaInteraction();
            // Prevent the page from scrolling down and form submits.
            event.preventDefault();
        }
    }
    /**
     * `Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.`
     */
    _selectViaInteraction() {
        if (!this.disabled) {
            this._selected = this.multiple ? !this._selected : true;
            this._changeDetectorRef.markForCheck();
            this._emitSelectionChangeEvent(!this.keepOpen);
        }
    }
    /**
     * Force a click event
     */
    _clickViaInteraction() {
        if (!this.disabled) {
            this._element.nativeElement.click();
        }
    }
    /**
     * Gets the `aria-selected` value for the option. We explicitly omit the `aria-selected`
     * attribute from single-selection, unselected options. Including the `aria-selected="false"`
     * attributes adds a significant amount of noise to screen-reader users without providing useful
     * information.
     */
    _getAriaSelected() {
        return this.selected || (this.multiple ? false : null);
    }
    /** Returns the correct tabindex for the option depending on disabled state. */
    _getTabIndex() {
        return this.disabled ? '-1' : '0';
    }
    /** Gets the host DOM element. */
    _getHostElement() {
        return this._element.nativeElement;
    }
    ngAfterViewChecked() {
        // Since parent components could be using the option's label to display the selected values
        // (e.g. `novo-select`) and they don't have a way of knowing if the option's label has changed
        // we have to check for changes in the DOM ourselves and dispatch an event. These checks are
        // relatively cheap, however we still limit them only to selected options in order to avoid
        // hitting the DOM too often.
        if (this._selected) {
            const viewValue = this.viewValue;
            if (viewValue !== this._mostRecentViewValue) {
                this._mostRecentViewValue = viewValue;
                this._stateChanges.next();
            }
        }
    }
    ngOnDestroy() {
        this._stateChanges.complete();
        this._clickCapture.unsubscribe();
        this._clickPassive.unsubscribe();
    }
    /** Emits the selection change event. */
    _emitSelectionChangeEvent(isUserInput = false) {
        this.onSelectionChange.emit(new NovoOptionSelectionChange(this, isUserInput));
    }
}
NovoOptionBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoOptionBase, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: NOVO_OPTION_PARENT_COMPONENT, optional: true }, { token: NOVO_OPTGROUP, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
NovoOptionBase.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoOptionBase, inputs: { keepOpen: "keepOpen", novoInert: "novoInert", value: "value", id: "id", disabled: "disabled", selected: "selected" }, outputs: { onSelectionChange: "onSelectionChange" }, ngImport: i0 });
__decorate$1([
    BooleanInput(),
    __metadata$1("design:type", Boolean)
], NovoOptionBase.prototype, "keepOpen", void 0);
__decorate$1([
    BooleanInput(),
    __metadata$1("design:type", Boolean)
], NovoOptionBase.prototype, "novoInert", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoOptionBase, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NOVO_OPTION_PARENT_COMPONENT]
                }] }, { type: NovoOptgroupBase, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NOVO_OPTGROUP]
                }] }]; }, propDecorators: { keepOpen: [{
                type: Input
            }], novoInert: [{
                type: Input
            }], value: [{
                type: Input
            }], id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], selected: [{
                type: Input
            }], onSelectionChange: [{
                type: Output
            }] } });
/**
 * Single option inside of a `<novo-select>` element.
 */
class NovoOption extends NovoOptionBase {
    constructor(element, changeDetectorRef, parent, group) {
        super(element, changeDetectorRef, parent, group);
    }
}
NovoOption.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoOption, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: NOVO_OPTION_PARENT_COMPONENT, optional: true }, { token: NOVO_OPTGROUP, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NovoOption.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoOption, selector: "novo-option", inputs: { selected: "selected", keepOpen: "keepOpen", novoInert: "novoInert", value: "value", disabled: "disabled" }, host: { attributes: { "role": "option" }, listeners: { "keydown": "_handleKeydown($event)" }, properties: { "id": "id", "attr.tabindex": "_getTabIndex()", "attr.aria-selected": "_getAriaSelected()", "attr.aria-disabled": "disabled.toString()", "class.novo-active": "active", "class.novo-selected": "selectable && selected", "class.novo-option-multiple": "multiple", "class.novo-option-disabled": "disabled", "class.novo-option-inert": "novoInert" }, classAttribute: "novo-option novo-focus-indicator" }, exportAs: ["novoOption"], usesInheritance: true, ngImport: i0, template: "<novo-pseudo-checkbox *ngIf=\"selectable && multiple\" class=\"novo-option-pseudo-checkbox\"\n  [state]=\"selected ? 'checked' : 'unchecked'\" [disabled]=\"disabled\"></novo-pseudo-checkbox>\n\n<span class=\"novo-option-text\">\n  <ng-content></ng-content>\n</span>\n\n<novo-pseudo-checkbox *ngIf=\"selectable && !multiple && selected\" class=\"novo-option-pseudo-checkbox\" state=\"checked\"\n  shape=\"line\"\n  [disabled]=\"disabled\"></novo-pseudo-checkbox>\n\n<ng-content select=\"[novoSuffix]\"></ng-content>\n<!-- See a11y notes inside optgroup.ts for context behind this element. -->\n<span class=\"cdk-visually-hidden\" *ngIf=\"group && group._novoInert\">({{ group.label }})</span>", styles: [":host{min-height:var(--option-height);padding:0 var(--option-spacing);gap:var(--option-spacing);display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;position:relative;outline:none;display:flex;flex-direction:row;max-width:100%;box-sizing:border-box;align-items:center;margin:0;cursor:pointer;flex:1;-webkit-tap-highlight-color:transparent}:host.text-capitalize{text-transform:capitalize}:host.text-uppercase{text-transform:uppercase}:host.text-nowrap{white-space:nowrap}:host.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host.text-size-default{font-size:inherit}:host.text-size-body{font-size:var(--font-size-body)}:host.text-size-xs{font-size:var(--font-size-xs)}:host.text-size-sm{font-size:var(--font-size-sm)}:host.text-size-md{font-size:var(--font-size-md)}:host.text-size-lg{font-size:var(--font-size-lg)}:host.text-size-xl{font-size:var(--font-size-xl)}:host.text-size-2xl{font-size:var(--font-size-2xl)}:host.text-size-3xl{font-size:var(--font-size-3xl)}:host.text-size-smaller{font-size:.8em}:host.text-size-larger{font-size:1.2em}:host.text-color-person{color:var(--color-person)}:host.text-color-company{color:var(--color-company)}:host.text-color-candidate{color:var(--color-candidate)}:host.text-color-lead{color:var(--color-lead)}:host.text-color-contact{color:var(--color-contact)}:host.text-color-clientcontact{color:var(--color-clientcontact)}:host.text-color-opportunity{color:var(--color-opportunity)}:host.text-color-job{color:var(--color-job)}:host.text-color-joborder{color:var(--color-joborder)}:host.text-color-submission{color:var(--color-submission)}:host.text-color-sendout{color:var(--color-sendout)}:host.text-color-placement{color:var(--color-placement)}:host.text-color-note{color:var(--color-note)}:host.text-color-task{color:var(--color-task)}:host.text-color-distribution-list{color:var(--color-distribution-list)}:host.text-color-credential{color:var(--color-credential)}:host.text-color-user{color:var(--color-user)}:host.text-color-corporate-user{color:var(--color-corporate-user)}:host.text-color-contract{color:var(--color-contract)}:host.text-color-job-code{color:var(--color-job-code)}:host.text-color-earn-code{color:var(--color-earn-code)}:host.text-color-billable-charge{color:var(--color-billable-charge)}:host.text-color-payable-charge{color:var(--color-payable-charge)}:host.text-color-invoice-statement{color:var(--color-invoice-statement)}:host.text-color-selection{color:var(--color-selection)}:host.text-color-positive{color:var(--color-positive)}:host.text-color-success{color:var(--color-success)}:host.text-color-warning{color:var(--color-warning)}:host.text-color-error{color:var(--color-error)}:host.text-color-info{color:var(--color-info)}:host.text-color-disabled{color:var(--color-disabled)}:host.text-color-red{color:var(--palette-red-50)}:host.text-color-pink{color:var(--palette-pink-50)}:host.text-color-orange{color:var(--palette-orange-50)}:host.text-color-yellow{color:var(--palette-yellow-50)}:host.text-color-green{color:var(--palette-green-50)}:host.text-color-teal{color:var(--palette-teal-50)}:host.text-color-blue{color:var(--palette-blue-50)}:host.text-color-aqua{color:var(--palette-aqua-50)}:host.text-color-indigo{color:var(--palette-indigo-50)}:host.text-color-violet{color:var(--palette-violet-50)}:host.text-color-gray{color:var(--palette-gray-50)}:host.margin-before{margin-top:.4rem}:host.margin-after{margin-bottom:.8rem}:host.text-length-small{max-width:40ch}:host.text-length-medium{max-width:55ch}:host.text-length-large{max-width:70ch}:host.text-weight-hairline{font-weight:100}:host.text-weight-thin{font-weight:200}:host.text-weight-light{font-weight:300}:host.text-weight-normal{font-weight:400}:host.text-weight-medium{font-weight:500}:host.text-weight-semibold{font-weight:600}:host.text-weight-bold{font-weight:700}:host.text-weight-extrabold{font-weight:800}:host.text-weight-heavy{font-weight:900}:host.text-weight-lighter{font-weight:lighter}:host.text-weight-bolder{font-weight:bolder}:host:hover:not(.novo-option-inert){background:var(--color-selection-overlay)}:host:active:not(.novo-option-inert),:host.novo-active:not(.novo-option-inert){background:var(--color-selection-overlay)}:host.novo-selected{color:var(--color-selection)}:host.disabled,:host[aria-disabled=true]{cursor:not-allowed;color:var(--color-disabled)}:host.disabled:hover,:host[aria-disabled=true]:hover{background:var(--color-error-overlay)}:host .novo-option-text{display:inline-block;display:inline-flex;flex-direction:row;align-items:center;flex-grow:1;overflow:hidden;text-overflow:ellipsis;gap:1rem}:host .novo-option-pseudo-checkbox{margin-right:.25rem}[dir=rtl] :host .novo-option-pseudo-checkbox{margin-left:.25rem;margin-right:0}:host.novo-accent-person{border-left:4px solid var(--color-person)}:host.novo-fill-person:not(.novo-option-inert){color:var(--color-person-contrast);background:var(--color-person)}:host.novo-fill-person:not(.novo-option-inert):hover,:host.novo-fill-person:not(.novo-option-inert):focus{background:var(--color-person-tint)}:host.novo-fill-person:not(.novo-option-inert):active{background:var(--color-person-shade)}:host.novo-accent-company{border-left:4px solid var(--color-company)}:host.novo-fill-company:not(.novo-option-inert){color:var(--color-company-contrast);background:var(--color-company)}:host.novo-fill-company:not(.novo-option-inert):hover,:host.novo-fill-company:not(.novo-option-inert):focus{background:var(--color-company-tint)}:host.novo-fill-company:not(.novo-option-inert):active{background:var(--color-company-shade)}:host.novo-accent-candidate{border-left:4px solid var(--color-candidate)}:host.novo-fill-candidate:not(.novo-option-inert){color:var(--color-candidate-contrast);background:var(--color-candidate)}:host.novo-fill-candidate:not(.novo-option-inert):hover,:host.novo-fill-candidate:not(.novo-option-inert):focus{background:var(--color-candidate-tint)}:host.novo-fill-candidate:not(.novo-option-inert):active{background:var(--color-candidate-shade)}:host.novo-accent-lead{border-left:4px solid var(--color-lead)}:host.novo-fill-lead:not(.novo-option-inert){color:var(--color-lead-contrast);background:var(--color-lead)}:host.novo-fill-lead:not(.novo-option-inert):hover,:host.novo-fill-lead:not(.novo-option-inert):focus{background:var(--color-lead-tint)}:host.novo-fill-lead:not(.novo-option-inert):active{background:var(--color-lead-shade)}:host.novo-accent-contact{border-left:4px solid var(--color-contact)}:host.novo-fill-contact:not(.novo-option-inert){color:var(--color-contact-contrast);background:var(--color-contact)}:host.novo-fill-contact:not(.novo-option-inert):hover,:host.novo-fill-contact:not(.novo-option-inert):focus{background:var(--color-contact-tint)}:host.novo-fill-contact:not(.novo-option-inert):active{background:var(--color-contact-shade)}:host.novo-accent-clientcontact{border-left:4px solid var(--color-clientcontact)}:host.novo-fill-clientcontact:not(.novo-option-inert){color:var(--color-clientcontact-contrast);background:var(--color-clientcontact)}:host.novo-fill-clientcontact:not(.novo-option-inert):hover,:host.novo-fill-clientcontact:not(.novo-option-inert):focus{background:var(--color-clientcontact-tint)}:host.novo-fill-clientcontact:not(.novo-option-inert):active{background:var(--color-clientcontact-shade)}:host.novo-accent-opportunity{border-left:4px solid var(--color-opportunity)}:host.novo-fill-opportunity:not(.novo-option-inert){color:var(--color-opportunity-contrast);background:var(--color-opportunity)}:host.novo-fill-opportunity:not(.novo-option-inert):hover,:host.novo-fill-opportunity:not(.novo-option-inert):focus{background:var(--color-opportunity-tint)}:host.novo-fill-opportunity:not(.novo-option-inert):active{background:var(--color-opportunity-shade)}:host.novo-accent-job{border-left:4px solid var(--color-job)}:host.novo-fill-job:not(.novo-option-inert){color:var(--color-job-contrast);background:var(--color-job)}:host.novo-fill-job:not(.novo-option-inert):hover,:host.novo-fill-job:not(.novo-option-inert):focus{background:var(--color-job-tint)}:host.novo-fill-job:not(.novo-option-inert):active{background:var(--color-job-shade)}:host.novo-accent-joborder{border-left:4px solid var(--color-joborder)}:host.novo-fill-joborder:not(.novo-option-inert){color:var(--color-joborder-contrast);background:var(--color-joborder)}:host.novo-fill-joborder:not(.novo-option-inert):hover,:host.novo-fill-joborder:not(.novo-option-inert):focus{background:var(--color-joborder-tint)}:host.novo-fill-joborder:not(.novo-option-inert):active{background:var(--color-joborder-shade)}:host.novo-accent-submission{border-left:4px solid var(--color-submission)}:host.novo-fill-submission:not(.novo-option-inert){color:var(--color-submission-contrast);background:var(--color-submission)}:host.novo-fill-submission:not(.novo-option-inert):hover,:host.novo-fill-submission:not(.novo-option-inert):focus{background:var(--color-submission-tint)}:host.novo-fill-submission:not(.novo-option-inert):active{background:var(--color-submission-shade)}:host.novo-accent-sendout{border-left:4px solid var(--color-sendout)}:host.novo-fill-sendout:not(.novo-option-inert){color:var(--color-sendout-contrast);background:var(--color-sendout)}:host.novo-fill-sendout:not(.novo-option-inert):hover,:host.novo-fill-sendout:not(.novo-option-inert):focus{background:var(--color-sendout-tint)}:host.novo-fill-sendout:not(.novo-option-inert):active{background:var(--color-sendout-shade)}:host.novo-accent-placement{border-left:4px solid var(--color-placement)}:host.novo-fill-placement:not(.novo-option-inert){color:var(--color-placement-contrast);background:var(--color-placement)}:host.novo-fill-placement:not(.novo-option-inert):hover,:host.novo-fill-placement:not(.novo-option-inert):focus{background:var(--color-placement-tint)}:host.novo-fill-placement:not(.novo-option-inert):active{background:var(--color-placement-shade)}:host.novo-accent-note{border-left:4px solid var(--color-note)}:host.novo-fill-note:not(.novo-option-inert){color:var(--color-note-contrast);background:var(--color-note)}:host.novo-fill-note:not(.novo-option-inert):hover,:host.novo-fill-note:not(.novo-option-inert):focus{background:var(--color-note-tint)}:host.novo-fill-note:not(.novo-option-inert):active{background:var(--color-note-shade)}:host.novo-accent-task{border-left:4px solid var(--color-task)}:host.novo-fill-task:not(.novo-option-inert){color:var(--color-task-contrast);background:var(--color-task)}:host.novo-fill-task:not(.novo-option-inert):hover,:host.novo-fill-task:not(.novo-option-inert):focus{background:var(--color-task-tint)}:host.novo-fill-task:not(.novo-option-inert):active{background:var(--color-task-shade)}:host.novo-accent-distribution-list{border-left:4px solid var(--color-distribution-list)}:host.novo-fill-distribution-list:not(.novo-option-inert){color:var(--color-distribution-list-contrast);background:var(--color-distribution-list)}:host.novo-fill-distribution-list:not(.novo-option-inert):hover,:host.novo-fill-distribution-list:not(.novo-option-inert):focus{background:var(--color-distribution-list-tint)}:host.novo-fill-distribution-list:not(.novo-option-inert):active{background:var(--color-distribution-list-shade)}:host.novo-accent-credential{border-left:4px solid var(--color-credential)}:host.novo-fill-credential:not(.novo-option-inert){color:var(--color-credential-contrast);background:var(--color-credential)}:host.novo-fill-credential:not(.novo-option-inert):hover,:host.novo-fill-credential:not(.novo-option-inert):focus{background:var(--color-credential-tint)}:host.novo-fill-credential:not(.novo-option-inert):active{background:var(--color-credential-shade)}:host.novo-accent-user{border-left:4px solid var(--color-user)}:host.novo-fill-user:not(.novo-option-inert){color:var(--color-user-contrast);background:var(--color-user)}:host.novo-fill-user:not(.novo-option-inert):hover,:host.novo-fill-user:not(.novo-option-inert):focus{background:var(--color-user-tint)}:host.novo-fill-user:not(.novo-option-inert):active{background:var(--color-user-shade)}:host.novo-accent-corporate-user{border-left:4px solid var(--color-corporate-user)}:host.novo-fill-corporate-user:not(.novo-option-inert){color:var(--color-corporate-user-contrast);background:var(--color-corporate-user)}:host.novo-fill-corporate-user:not(.novo-option-inert):hover,:host.novo-fill-corporate-user:not(.novo-option-inert):focus{background:var(--color-corporate-user-tint)}:host.novo-fill-corporate-user:not(.novo-option-inert):active{background:var(--color-corporate-user-shade)}:host.novo-accent-contract{border-left:4px solid var(--color-contract)}:host.novo-fill-contract:not(.novo-option-inert){color:var(--color-contract-contrast);background:var(--color-contract)}:host.novo-fill-contract:not(.novo-option-inert):hover,:host.novo-fill-contract:not(.novo-option-inert):focus{background:var(--color-contract-tint)}:host.novo-fill-contract:not(.novo-option-inert):active{background:var(--color-contract-shade)}:host.novo-accent-job-code{border-left:4px solid var(--color-job-code)}:host.novo-fill-job-code:not(.novo-option-inert){color:var(--color-job-code-contrast);background:var(--color-job-code)}:host.novo-fill-job-code:not(.novo-option-inert):hover,:host.novo-fill-job-code:not(.novo-option-inert):focus{background:var(--color-job-code-tint)}:host.novo-fill-job-code:not(.novo-option-inert):active{background:var(--color-job-code-shade)}:host.novo-accent-earn-code{border-left:4px solid var(--color-earn-code)}:host.novo-fill-earn-code:not(.novo-option-inert){color:var(--color-earn-code-contrast);background:var(--color-earn-code)}:host.novo-fill-earn-code:not(.novo-option-inert):hover,:host.novo-fill-earn-code:not(.novo-option-inert):focus{background:var(--color-earn-code-tint)}:host.novo-fill-earn-code:not(.novo-option-inert):active{background:var(--color-earn-code-shade)}:host.novo-accent-billable-charge{border-left:4px solid var(--color-billable-charge)}:host.novo-fill-billable-charge:not(.novo-option-inert){color:var(--color-billable-charge-contrast);background:var(--color-billable-charge)}:host.novo-fill-billable-charge:not(.novo-option-inert):hover,:host.novo-fill-billable-charge:not(.novo-option-inert):focus{background:var(--color-billable-charge-tint)}:host.novo-fill-billable-charge:not(.novo-option-inert):active{background:var(--color-billable-charge-shade)}:host.novo-accent-payable-charge{border-left:4px solid var(--color-payable-charge)}:host.novo-fill-payable-charge:not(.novo-option-inert){color:var(--color-payable-charge-contrast);background:var(--color-payable-charge)}:host.novo-fill-payable-charge:not(.novo-option-inert):hover,:host.novo-fill-payable-charge:not(.novo-option-inert):focus{background:var(--color-payable-charge-tint)}:host.novo-fill-payable-charge:not(.novo-option-inert):active{background:var(--color-payable-charge-shade)}:host.novo-accent-invoice-statement{border-left:4px solid var(--color-invoice-statement)}:host.novo-fill-invoice-statement:not(.novo-option-inert){color:var(--color-invoice-statement-contrast);background:var(--color-invoice-statement)}:host.novo-fill-invoice-statement:not(.novo-option-inert):hover,:host.novo-fill-invoice-statement:not(.novo-option-inert):focus{background:var(--color-invoice-statement-tint)}:host.novo-fill-invoice-statement:not(.novo-option-inert):active{background:var(--color-invoice-statement-shade)}:host.novo-accent-selection{border-left:4px solid var(--color-selection)}:host.novo-fill-selection:not(.novo-option-inert){color:var(--color-selection-contrast);background:var(--color-selection)}:host.novo-fill-selection:not(.novo-option-inert):hover,:host.novo-fill-selection:not(.novo-option-inert):focus{background:var(--color-selection-tint)}:host.novo-fill-selection:not(.novo-option-inert):active{background:var(--color-selection-shade)}:host.novo-accent-positive{border-left:4px solid var(--color-positive)}:host.novo-fill-positive:not(.novo-option-inert){color:var(--color-positive-contrast);background:var(--color-positive)}:host.novo-fill-positive:not(.novo-option-inert):hover,:host.novo-fill-positive:not(.novo-option-inert):focus{background:var(--color-positive-tint)}:host.novo-fill-positive:not(.novo-option-inert):active{background:var(--color-positive-shade)}:host.novo-accent-success{border-left:4px solid var(--color-success)}:host.novo-fill-success:not(.novo-option-inert){color:var(--color-success-contrast);background:var(--color-success)}:host.novo-fill-success:not(.novo-option-inert):hover,:host.novo-fill-success:not(.novo-option-inert):focus{background:var(--color-success-tint)}:host.novo-fill-success:not(.novo-option-inert):active{background:var(--color-success-shade)}:host.novo-accent-warning{border-left:4px solid var(--color-warning)}:host.novo-fill-warning:not(.novo-option-inert){color:var(--color-warning-contrast);background:var(--color-warning)}:host.novo-fill-warning:not(.novo-option-inert):hover,:host.novo-fill-warning:not(.novo-option-inert):focus{background:var(--color-warning-tint)}:host.novo-fill-warning:not(.novo-option-inert):active{background:var(--color-warning-shade)}:host.novo-accent-error{border-left:4px solid var(--color-error)}:host.novo-fill-error:not(.novo-option-inert){color:var(--color-error-contrast);background:var(--color-error)}:host.novo-fill-error:not(.novo-option-inert):hover,:host.novo-fill-error:not(.novo-option-inert):focus{background:var(--color-error-tint)}:host.novo-fill-error:not(.novo-option-inert):active{background:var(--color-error-shade)}:host.novo-accent-info{border-left:4px solid var(--color-info)}:host.novo-fill-info:not(.novo-option-inert){color:var(--color-info-contrast);background:var(--color-info)}:host.novo-fill-info:not(.novo-option-inert):hover,:host.novo-fill-info:not(.novo-option-inert):focus{background:var(--color-info-tint)}:host.novo-fill-info:not(.novo-option-inert):active{background:var(--color-info-shade)}:host.novo-accent-disabled{border-left:4px solid var(--color-disabled)}:host.novo-fill-disabled:not(.novo-option-inert){color:var(--color-disabled-contrast);background:var(--color-disabled)}:host.novo-fill-disabled:not(.novo-option-inert):hover,:host.novo-fill-disabled:not(.novo-option-inert):focus{background:var(--color-disabled-tint)}:host.novo-fill-disabled:not(.novo-option-inert):active{background:var(--color-disabled-shade)}:host.novo-accent-red{border-left:4px solid var(--palette-red-50)}:host.novo-fill-red:not(.novo-option-inert){color:var(--palette-red-50-contrast);background:var(--palette-red-50)}:host.novo-fill-red:not(.novo-option-inert):hover,:host.novo-fill-red:not(.novo-option-inert):focus{background:var(--palette-red-70)}:host.novo-fill-red:not(.novo-option-inert):active{background:var(--palette-red-30)}:host.novo-accent-pink{border-left:4px solid var(--palette-pink-50)}:host.novo-fill-pink:not(.novo-option-inert){color:var(--palette-pink-50-contrast);background:var(--palette-pink-50)}:host.novo-fill-pink:not(.novo-option-inert):hover,:host.novo-fill-pink:not(.novo-option-inert):focus{background:var(--palette-pink-70)}:host.novo-fill-pink:not(.novo-option-inert):active{background:var(--palette-pink-30)}:host.novo-accent-orange{border-left:4px solid var(--palette-orange-50)}:host.novo-fill-orange:not(.novo-option-inert){color:var(--palette-orange-50-contrast);background:var(--palette-orange-50)}:host.novo-fill-orange:not(.novo-option-inert):hover,:host.novo-fill-orange:not(.novo-option-inert):focus{background:var(--palette-orange-70)}:host.novo-fill-orange:not(.novo-option-inert):active{background:var(--palette-orange-30)}:host.novo-accent-yellow{border-left:4px solid var(--palette-yellow-50)}:host.novo-fill-yellow:not(.novo-option-inert){color:var(--palette-yellow-50-contrast);background:var(--palette-yellow-50)}:host.novo-fill-yellow:not(.novo-option-inert):hover,:host.novo-fill-yellow:not(.novo-option-inert):focus{background:var(--palette-yellow-70)}:host.novo-fill-yellow:not(.novo-option-inert):active{background:var(--palette-yellow-30)}:host.novo-accent-green{border-left:4px solid var(--palette-green-50)}:host.novo-fill-green:not(.novo-option-inert){color:var(--palette-green-50-contrast);background:var(--palette-green-50)}:host.novo-fill-green:not(.novo-option-inert):hover,:host.novo-fill-green:not(.novo-option-inert):focus{background:var(--palette-green-70)}:host.novo-fill-green:not(.novo-option-inert):active{background:var(--palette-green-30)}:host.novo-accent-teal{border-left:4px solid var(--palette-teal-50)}:host.novo-fill-teal:not(.novo-option-inert){color:var(--palette-teal-50-contrast);background:var(--palette-teal-50)}:host.novo-fill-teal:not(.novo-option-inert):hover,:host.novo-fill-teal:not(.novo-option-inert):focus{background:var(--palette-teal-70)}:host.novo-fill-teal:not(.novo-option-inert):active{background:var(--palette-teal-30)}:host.novo-accent-blue{border-left:4px solid var(--palette-blue-50)}:host.novo-fill-blue:not(.novo-option-inert){color:var(--palette-blue-50-contrast);background:var(--palette-blue-50)}:host.novo-fill-blue:not(.novo-option-inert):hover,:host.novo-fill-blue:not(.novo-option-inert):focus{background:var(--palette-blue-70)}:host.novo-fill-blue:not(.novo-option-inert):active{background:var(--palette-blue-30)}:host.novo-accent-aqua{border-left:4px solid var(--palette-aqua-50)}:host.novo-fill-aqua:not(.novo-option-inert){color:var(--palette-aqua-50-contrast);background:var(--palette-aqua-50)}:host.novo-fill-aqua:not(.novo-option-inert):hover,:host.novo-fill-aqua:not(.novo-option-inert):focus{background:var(--palette-aqua-70)}:host.novo-fill-aqua:not(.novo-option-inert):active{background:var(--palette-aqua-30)}:host.novo-accent-indigo{border-left:4px solid var(--palette-indigo-50)}:host.novo-fill-indigo:not(.novo-option-inert){color:var(--palette-indigo-50-contrast);background:var(--palette-indigo-50)}:host.novo-fill-indigo:not(.novo-option-inert):hover,:host.novo-fill-indigo:not(.novo-option-inert):focus{background:var(--palette-indigo-70)}:host.novo-fill-indigo:not(.novo-option-inert):active{background:var(--palette-indigo-30)}:host.novo-accent-violet{border-left:4px solid var(--palette-violet-50)}:host.novo-fill-violet:not(.novo-option-inert){color:var(--palette-violet-50-contrast);background:var(--palette-violet-50)}:host.novo-fill-violet:not(.novo-option-inert):hover,:host.novo-fill-violet:not(.novo-option-inert):focus{background:var(--palette-violet-70)}:host.novo-fill-violet:not(.novo-option-inert):active{background:var(--palette-violet-30)}:host.novo-accent-gray{border-left:4px solid var(--palette-gray-50)}:host.novo-fill-gray:not(.novo-option-inert){color:var(--palette-gray-50-contrast);background:var(--palette-gray-50)}:host.novo-fill-gray:not(.novo-option-inert):hover,:host.novo-fill-gray:not(.novo-option-inert):focus{background:var(--palette-gray-70)}:host.novo-fill-gray:not(.novo-option-inert):active{background:var(--palette-gray-30)}\n"], components: [{ type: NovoPseudoCheckbox, selector: "novo-pseudo-checkbox", inputs: ["state", "shape", "disabled"] }], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoOption, decorators: [{
            type: Component,
            args: [{ selector: 'novo-option', exportAs: 'novoOption', host: {
                        role: 'option',
                        '[id]': 'id',
                        '[attr.tabindex]': '_getTabIndex()',
                        '[attr.aria-selected]': '_getAriaSelected()',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[class.novo-active]': 'active',
                        '[class.novo-selected]': 'selectable && selected',
                        '[class.novo-option-multiple]': 'multiple',
                        '[class.novo-option-disabled]': 'disabled',
                        '[class.novo-option-inert]': 'novoInert',
                        '(keydown)': '_handleKeydown($event)',
                        class: 'novo-option novo-focus-indicator',
                    }, inputs: ['selected', 'keepOpen', 'novoInert', 'value', 'disabled'], changeDetection: ChangeDetectionStrategy.OnPush, template: "<novo-pseudo-checkbox *ngIf=\"selectable && multiple\" class=\"novo-option-pseudo-checkbox\"\n  [state]=\"selected ? 'checked' : 'unchecked'\" [disabled]=\"disabled\"></novo-pseudo-checkbox>\n\n<span class=\"novo-option-text\">\n  <ng-content></ng-content>\n</span>\n\n<novo-pseudo-checkbox *ngIf=\"selectable && !multiple && selected\" class=\"novo-option-pseudo-checkbox\" state=\"checked\"\n  shape=\"line\"\n  [disabled]=\"disabled\"></novo-pseudo-checkbox>\n\n<ng-content select=\"[novoSuffix]\"></ng-content>\n<!-- See a11y notes inside optgroup.ts for context behind this element. -->\n<span class=\"cdk-visually-hidden\" *ngIf=\"group && group._novoInert\">({{ group.label }})</span>", styles: [":host{min-height:var(--option-height);padding:0 var(--option-spacing);gap:var(--option-spacing);display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;position:relative;outline:none;display:flex;flex-direction:row;max-width:100%;box-sizing:border-box;align-items:center;margin:0;cursor:pointer;flex:1;-webkit-tap-highlight-color:transparent}:host.text-capitalize{text-transform:capitalize}:host.text-uppercase{text-transform:uppercase}:host.text-nowrap{white-space:nowrap}:host.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host.text-size-default{font-size:inherit}:host.text-size-body{font-size:var(--font-size-body)}:host.text-size-xs{font-size:var(--font-size-xs)}:host.text-size-sm{font-size:var(--font-size-sm)}:host.text-size-md{font-size:var(--font-size-md)}:host.text-size-lg{font-size:var(--font-size-lg)}:host.text-size-xl{font-size:var(--font-size-xl)}:host.text-size-2xl{font-size:var(--font-size-2xl)}:host.text-size-3xl{font-size:var(--font-size-3xl)}:host.text-size-smaller{font-size:.8em}:host.text-size-larger{font-size:1.2em}:host.text-color-person{color:var(--color-person)}:host.text-color-company{color:var(--color-company)}:host.text-color-candidate{color:var(--color-candidate)}:host.text-color-lead{color:var(--color-lead)}:host.text-color-contact{color:var(--color-contact)}:host.text-color-clientcontact{color:var(--color-clientcontact)}:host.text-color-opportunity{color:var(--color-opportunity)}:host.text-color-job{color:var(--color-job)}:host.text-color-joborder{color:var(--color-joborder)}:host.text-color-submission{color:var(--color-submission)}:host.text-color-sendout{color:var(--color-sendout)}:host.text-color-placement{color:var(--color-placement)}:host.text-color-note{color:var(--color-note)}:host.text-color-task{color:var(--color-task)}:host.text-color-distribution-list{color:var(--color-distribution-list)}:host.text-color-credential{color:var(--color-credential)}:host.text-color-user{color:var(--color-user)}:host.text-color-corporate-user{color:var(--color-corporate-user)}:host.text-color-contract{color:var(--color-contract)}:host.text-color-job-code{color:var(--color-job-code)}:host.text-color-earn-code{color:var(--color-earn-code)}:host.text-color-billable-charge{color:var(--color-billable-charge)}:host.text-color-payable-charge{color:var(--color-payable-charge)}:host.text-color-invoice-statement{color:var(--color-invoice-statement)}:host.text-color-selection{color:var(--color-selection)}:host.text-color-positive{color:var(--color-positive)}:host.text-color-success{color:var(--color-success)}:host.text-color-warning{color:var(--color-warning)}:host.text-color-error{color:var(--color-error)}:host.text-color-info{color:var(--color-info)}:host.text-color-disabled{color:var(--color-disabled)}:host.text-color-red{color:var(--palette-red-50)}:host.text-color-pink{color:var(--palette-pink-50)}:host.text-color-orange{color:var(--palette-orange-50)}:host.text-color-yellow{color:var(--palette-yellow-50)}:host.text-color-green{color:var(--palette-green-50)}:host.text-color-teal{color:var(--palette-teal-50)}:host.text-color-blue{color:var(--palette-blue-50)}:host.text-color-aqua{color:var(--palette-aqua-50)}:host.text-color-indigo{color:var(--palette-indigo-50)}:host.text-color-violet{color:var(--palette-violet-50)}:host.text-color-gray{color:var(--palette-gray-50)}:host.margin-before{margin-top:.4rem}:host.margin-after{margin-bottom:.8rem}:host.text-length-small{max-width:40ch}:host.text-length-medium{max-width:55ch}:host.text-length-large{max-width:70ch}:host.text-weight-hairline{font-weight:100}:host.text-weight-thin{font-weight:200}:host.text-weight-light{font-weight:300}:host.text-weight-normal{font-weight:400}:host.text-weight-medium{font-weight:500}:host.text-weight-semibold{font-weight:600}:host.text-weight-bold{font-weight:700}:host.text-weight-extrabold{font-weight:800}:host.text-weight-heavy{font-weight:900}:host.text-weight-lighter{font-weight:lighter}:host.text-weight-bolder{font-weight:bolder}:host:hover:not(.novo-option-inert){background:var(--color-selection-overlay)}:host:active:not(.novo-option-inert),:host.novo-active:not(.novo-option-inert){background:var(--color-selection-overlay)}:host.novo-selected{color:var(--color-selection)}:host.disabled,:host[aria-disabled=true]{cursor:not-allowed;color:var(--color-disabled)}:host.disabled:hover,:host[aria-disabled=true]:hover{background:var(--color-error-overlay)}:host .novo-option-text{display:inline-block;display:inline-flex;flex-direction:row;align-items:center;flex-grow:1;overflow:hidden;text-overflow:ellipsis;gap:1rem}:host .novo-option-pseudo-checkbox{margin-right:.25rem}[dir=rtl] :host .novo-option-pseudo-checkbox{margin-left:.25rem;margin-right:0}:host.novo-accent-person{border-left:4px solid var(--color-person)}:host.novo-fill-person:not(.novo-option-inert){color:var(--color-person-contrast);background:var(--color-person)}:host.novo-fill-person:not(.novo-option-inert):hover,:host.novo-fill-person:not(.novo-option-inert):focus{background:var(--color-person-tint)}:host.novo-fill-person:not(.novo-option-inert):active{background:var(--color-person-shade)}:host.novo-accent-company{border-left:4px solid var(--color-company)}:host.novo-fill-company:not(.novo-option-inert){color:var(--color-company-contrast);background:var(--color-company)}:host.novo-fill-company:not(.novo-option-inert):hover,:host.novo-fill-company:not(.novo-option-inert):focus{background:var(--color-company-tint)}:host.novo-fill-company:not(.novo-option-inert):active{background:var(--color-company-shade)}:host.novo-accent-candidate{border-left:4px solid var(--color-candidate)}:host.novo-fill-candidate:not(.novo-option-inert){color:var(--color-candidate-contrast);background:var(--color-candidate)}:host.novo-fill-candidate:not(.novo-option-inert):hover,:host.novo-fill-candidate:not(.novo-option-inert):focus{background:var(--color-candidate-tint)}:host.novo-fill-candidate:not(.novo-option-inert):active{background:var(--color-candidate-shade)}:host.novo-accent-lead{border-left:4px solid var(--color-lead)}:host.novo-fill-lead:not(.novo-option-inert){color:var(--color-lead-contrast);background:var(--color-lead)}:host.novo-fill-lead:not(.novo-option-inert):hover,:host.novo-fill-lead:not(.novo-option-inert):focus{background:var(--color-lead-tint)}:host.novo-fill-lead:not(.novo-option-inert):active{background:var(--color-lead-shade)}:host.novo-accent-contact{border-left:4px solid var(--color-contact)}:host.novo-fill-contact:not(.novo-option-inert){color:var(--color-contact-contrast);background:var(--color-contact)}:host.novo-fill-contact:not(.novo-option-inert):hover,:host.novo-fill-contact:not(.novo-option-inert):focus{background:var(--color-contact-tint)}:host.novo-fill-contact:not(.novo-option-inert):active{background:var(--color-contact-shade)}:host.novo-accent-clientcontact{border-left:4px solid var(--color-clientcontact)}:host.novo-fill-clientcontact:not(.novo-option-inert){color:var(--color-clientcontact-contrast);background:var(--color-clientcontact)}:host.novo-fill-clientcontact:not(.novo-option-inert):hover,:host.novo-fill-clientcontact:not(.novo-option-inert):focus{background:var(--color-clientcontact-tint)}:host.novo-fill-clientcontact:not(.novo-option-inert):active{background:var(--color-clientcontact-shade)}:host.novo-accent-opportunity{border-left:4px solid var(--color-opportunity)}:host.novo-fill-opportunity:not(.novo-option-inert){color:var(--color-opportunity-contrast);background:var(--color-opportunity)}:host.novo-fill-opportunity:not(.novo-option-inert):hover,:host.novo-fill-opportunity:not(.novo-option-inert):focus{background:var(--color-opportunity-tint)}:host.novo-fill-opportunity:not(.novo-option-inert):active{background:var(--color-opportunity-shade)}:host.novo-accent-job{border-left:4px solid var(--color-job)}:host.novo-fill-job:not(.novo-option-inert){color:var(--color-job-contrast);background:var(--color-job)}:host.novo-fill-job:not(.novo-option-inert):hover,:host.novo-fill-job:not(.novo-option-inert):focus{background:var(--color-job-tint)}:host.novo-fill-job:not(.novo-option-inert):active{background:var(--color-job-shade)}:host.novo-accent-joborder{border-left:4px solid var(--color-joborder)}:host.novo-fill-joborder:not(.novo-option-inert){color:var(--color-joborder-contrast);background:var(--color-joborder)}:host.novo-fill-joborder:not(.novo-option-inert):hover,:host.novo-fill-joborder:not(.novo-option-inert):focus{background:var(--color-joborder-tint)}:host.novo-fill-joborder:not(.novo-option-inert):active{background:var(--color-joborder-shade)}:host.novo-accent-submission{border-left:4px solid var(--color-submission)}:host.novo-fill-submission:not(.novo-option-inert){color:var(--color-submission-contrast);background:var(--color-submission)}:host.novo-fill-submission:not(.novo-option-inert):hover,:host.novo-fill-submission:not(.novo-option-inert):focus{background:var(--color-submission-tint)}:host.novo-fill-submission:not(.novo-option-inert):active{background:var(--color-submission-shade)}:host.novo-accent-sendout{border-left:4px solid var(--color-sendout)}:host.novo-fill-sendout:not(.novo-option-inert){color:var(--color-sendout-contrast);background:var(--color-sendout)}:host.novo-fill-sendout:not(.novo-option-inert):hover,:host.novo-fill-sendout:not(.novo-option-inert):focus{background:var(--color-sendout-tint)}:host.novo-fill-sendout:not(.novo-option-inert):active{background:var(--color-sendout-shade)}:host.novo-accent-placement{border-left:4px solid var(--color-placement)}:host.novo-fill-placement:not(.novo-option-inert){color:var(--color-placement-contrast);background:var(--color-placement)}:host.novo-fill-placement:not(.novo-option-inert):hover,:host.novo-fill-placement:not(.novo-option-inert):focus{background:var(--color-placement-tint)}:host.novo-fill-placement:not(.novo-option-inert):active{background:var(--color-placement-shade)}:host.novo-accent-note{border-left:4px solid var(--color-note)}:host.novo-fill-note:not(.novo-option-inert){color:var(--color-note-contrast);background:var(--color-note)}:host.novo-fill-note:not(.novo-option-inert):hover,:host.novo-fill-note:not(.novo-option-inert):focus{background:var(--color-note-tint)}:host.novo-fill-note:not(.novo-option-inert):active{background:var(--color-note-shade)}:host.novo-accent-task{border-left:4px solid var(--color-task)}:host.novo-fill-task:not(.novo-option-inert){color:var(--color-task-contrast);background:var(--color-task)}:host.novo-fill-task:not(.novo-option-inert):hover,:host.novo-fill-task:not(.novo-option-inert):focus{background:var(--color-task-tint)}:host.novo-fill-task:not(.novo-option-inert):active{background:var(--color-task-shade)}:host.novo-accent-distribution-list{border-left:4px solid var(--color-distribution-list)}:host.novo-fill-distribution-list:not(.novo-option-inert){color:var(--color-distribution-list-contrast);background:var(--color-distribution-list)}:host.novo-fill-distribution-list:not(.novo-option-inert):hover,:host.novo-fill-distribution-list:not(.novo-option-inert):focus{background:var(--color-distribution-list-tint)}:host.novo-fill-distribution-list:not(.novo-option-inert):active{background:var(--color-distribution-list-shade)}:host.novo-accent-credential{border-left:4px solid var(--color-credential)}:host.novo-fill-credential:not(.novo-option-inert){color:var(--color-credential-contrast);background:var(--color-credential)}:host.novo-fill-credential:not(.novo-option-inert):hover,:host.novo-fill-credential:not(.novo-option-inert):focus{background:var(--color-credential-tint)}:host.novo-fill-credential:not(.novo-option-inert):active{background:var(--color-credential-shade)}:host.novo-accent-user{border-left:4px solid var(--color-user)}:host.novo-fill-user:not(.novo-option-inert){color:var(--color-user-contrast);background:var(--color-user)}:host.novo-fill-user:not(.novo-option-inert):hover,:host.novo-fill-user:not(.novo-option-inert):focus{background:var(--color-user-tint)}:host.novo-fill-user:not(.novo-option-inert):active{background:var(--color-user-shade)}:host.novo-accent-corporate-user{border-left:4px solid var(--color-corporate-user)}:host.novo-fill-corporate-user:not(.novo-option-inert){color:var(--color-corporate-user-contrast);background:var(--color-corporate-user)}:host.novo-fill-corporate-user:not(.novo-option-inert):hover,:host.novo-fill-corporate-user:not(.novo-option-inert):focus{background:var(--color-corporate-user-tint)}:host.novo-fill-corporate-user:not(.novo-option-inert):active{background:var(--color-corporate-user-shade)}:host.novo-accent-contract{border-left:4px solid var(--color-contract)}:host.novo-fill-contract:not(.novo-option-inert){color:var(--color-contract-contrast);background:var(--color-contract)}:host.novo-fill-contract:not(.novo-option-inert):hover,:host.novo-fill-contract:not(.novo-option-inert):focus{background:var(--color-contract-tint)}:host.novo-fill-contract:not(.novo-option-inert):active{background:var(--color-contract-shade)}:host.novo-accent-job-code{border-left:4px solid var(--color-job-code)}:host.novo-fill-job-code:not(.novo-option-inert){color:var(--color-job-code-contrast);background:var(--color-job-code)}:host.novo-fill-job-code:not(.novo-option-inert):hover,:host.novo-fill-job-code:not(.novo-option-inert):focus{background:var(--color-job-code-tint)}:host.novo-fill-job-code:not(.novo-option-inert):active{background:var(--color-job-code-shade)}:host.novo-accent-earn-code{border-left:4px solid var(--color-earn-code)}:host.novo-fill-earn-code:not(.novo-option-inert){color:var(--color-earn-code-contrast);background:var(--color-earn-code)}:host.novo-fill-earn-code:not(.novo-option-inert):hover,:host.novo-fill-earn-code:not(.novo-option-inert):focus{background:var(--color-earn-code-tint)}:host.novo-fill-earn-code:not(.novo-option-inert):active{background:var(--color-earn-code-shade)}:host.novo-accent-billable-charge{border-left:4px solid var(--color-billable-charge)}:host.novo-fill-billable-charge:not(.novo-option-inert){color:var(--color-billable-charge-contrast);background:var(--color-billable-charge)}:host.novo-fill-billable-charge:not(.novo-option-inert):hover,:host.novo-fill-billable-charge:not(.novo-option-inert):focus{background:var(--color-billable-charge-tint)}:host.novo-fill-billable-charge:not(.novo-option-inert):active{background:var(--color-billable-charge-shade)}:host.novo-accent-payable-charge{border-left:4px solid var(--color-payable-charge)}:host.novo-fill-payable-charge:not(.novo-option-inert){color:var(--color-payable-charge-contrast);background:var(--color-payable-charge)}:host.novo-fill-payable-charge:not(.novo-option-inert):hover,:host.novo-fill-payable-charge:not(.novo-option-inert):focus{background:var(--color-payable-charge-tint)}:host.novo-fill-payable-charge:not(.novo-option-inert):active{background:var(--color-payable-charge-shade)}:host.novo-accent-invoice-statement{border-left:4px solid var(--color-invoice-statement)}:host.novo-fill-invoice-statement:not(.novo-option-inert){color:var(--color-invoice-statement-contrast);background:var(--color-invoice-statement)}:host.novo-fill-invoice-statement:not(.novo-option-inert):hover,:host.novo-fill-invoice-statement:not(.novo-option-inert):focus{background:var(--color-invoice-statement-tint)}:host.novo-fill-invoice-statement:not(.novo-option-inert):active{background:var(--color-invoice-statement-shade)}:host.novo-accent-selection{border-left:4px solid var(--color-selection)}:host.novo-fill-selection:not(.novo-option-inert){color:var(--color-selection-contrast);background:var(--color-selection)}:host.novo-fill-selection:not(.novo-option-inert):hover,:host.novo-fill-selection:not(.novo-option-inert):focus{background:var(--color-selection-tint)}:host.novo-fill-selection:not(.novo-option-inert):active{background:var(--color-selection-shade)}:host.novo-accent-positive{border-left:4px solid var(--color-positive)}:host.novo-fill-positive:not(.novo-option-inert){color:var(--color-positive-contrast);background:var(--color-positive)}:host.novo-fill-positive:not(.novo-option-inert):hover,:host.novo-fill-positive:not(.novo-option-inert):focus{background:var(--color-positive-tint)}:host.novo-fill-positive:not(.novo-option-inert):active{background:var(--color-positive-shade)}:host.novo-accent-success{border-left:4px solid var(--color-success)}:host.novo-fill-success:not(.novo-option-inert){color:var(--color-success-contrast);background:var(--color-success)}:host.novo-fill-success:not(.novo-option-inert):hover,:host.novo-fill-success:not(.novo-option-inert):focus{background:var(--color-success-tint)}:host.novo-fill-success:not(.novo-option-inert):active{background:var(--color-success-shade)}:host.novo-accent-warning{border-left:4px solid var(--color-warning)}:host.novo-fill-warning:not(.novo-option-inert){color:var(--color-warning-contrast);background:var(--color-warning)}:host.novo-fill-warning:not(.novo-option-inert):hover,:host.novo-fill-warning:not(.novo-option-inert):focus{background:var(--color-warning-tint)}:host.novo-fill-warning:not(.novo-option-inert):active{background:var(--color-warning-shade)}:host.novo-accent-error{border-left:4px solid var(--color-error)}:host.novo-fill-error:not(.novo-option-inert){color:var(--color-error-contrast);background:var(--color-error)}:host.novo-fill-error:not(.novo-option-inert):hover,:host.novo-fill-error:not(.novo-option-inert):focus{background:var(--color-error-tint)}:host.novo-fill-error:not(.novo-option-inert):active{background:var(--color-error-shade)}:host.novo-accent-info{border-left:4px solid var(--color-info)}:host.novo-fill-info:not(.novo-option-inert){color:var(--color-info-contrast);background:var(--color-info)}:host.novo-fill-info:not(.novo-option-inert):hover,:host.novo-fill-info:not(.novo-option-inert):focus{background:var(--color-info-tint)}:host.novo-fill-info:not(.novo-option-inert):active{background:var(--color-info-shade)}:host.novo-accent-disabled{border-left:4px solid var(--color-disabled)}:host.novo-fill-disabled:not(.novo-option-inert){color:var(--color-disabled-contrast);background:var(--color-disabled)}:host.novo-fill-disabled:not(.novo-option-inert):hover,:host.novo-fill-disabled:not(.novo-option-inert):focus{background:var(--color-disabled-tint)}:host.novo-fill-disabled:not(.novo-option-inert):active{background:var(--color-disabled-shade)}:host.novo-accent-red{border-left:4px solid var(--palette-red-50)}:host.novo-fill-red:not(.novo-option-inert){color:var(--palette-red-50-contrast);background:var(--palette-red-50)}:host.novo-fill-red:not(.novo-option-inert):hover,:host.novo-fill-red:not(.novo-option-inert):focus{background:var(--palette-red-70)}:host.novo-fill-red:not(.novo-option-inert):active{background:var(--palette-red-30)}:host.novo-accent-pink{border-left:4px solid var(--palette-pink-50)}:host.novo-fill-pink:not(.novo-option-inert){color:var(--palette-pink-50-contrast);background:var(--palette-pink-50)}:host.novo-fill-pink:not(.novo-option-inert):hover,:host.novo-fill-pink:not(.novo-option-inert):focus{background:var(--palette-pink-70)}:host.novo-fill-pink:not(.novo-option-inert):active{background:var(--palette-pink-30)}:host.novo-accent-orange{border-left:4px solid var(--palette-orange-50)}:host.novo-fill-orange:not(.novo-option-inert){color:var(--palette-orange-50-contrast);background:var(--palette-orange-50)}:host.novo-fill-orange:not(.novo-option-inert):hover,:host.novo-fill-orange:not(.novo-option-inert):focus{background:var(--palette-orange-70)}:host.novo-fill-orange:not(.novo-option-inert):active{background:var(--palette-orange-30)}:host.novo-accent-yellow{border-left:4px solid var(--palette-yellow-50)}:host.novo-fill-yellow:not(.novo-option-inert){color:var(--palette-yellow-50-contrast);background:var(--palette-yellow-50)}:host.novo-fill-yellow:not(.novo-option-inert):hover,:host.novo-fill-yellow:not(.novo-option-inert):focus{background:var(--palette-yellow-70)}:host.novo-fill-yellow:not(.novo-option-inert):active{background:var(--palette-yellow-30)}:host.novo-accent-green{border-left:4px solid var(--palette-green-50)}:host.novo-fill-green:not(.novo-option-inert){color:var(--palette-green-50-contrast);background:var(--palette-green-50)}:host.novo-fill-green:not(.novo-option-inert):hover,:host.novo-fill-green:not(.novo-option-inert):focus{background:var(--palette-green-70)}:host.novo-fill-green:not(.novo-option-inert):active{background:var(--palette-green-30)}:host.novo-accent-teal{border-left:4px solid var(--palette-teal-50)}:host.novo-fill-teal:not(.novo-option-inert){color:var(--palette-teal-50-contrast);background:var(--palette-teal-50)}:host.novo-fill-teal:not(.novo-option-inert):hover,:host.novo-fill-teal:not(.novo-option-inert):focus{background:var(--palette-teal-70)}:host.novo-fill-teal:not(.novo-option-inert):active{background:var(--palette-teal-30)}:host.novo-accent-blue{border-left:4px solid var(--palette-blue-50)}:host.novo-fill-blue:not(.novo-option-inert){color:var(--palette-blue-50-contrast);background:var(--palette-blue-50)}:host.novo-fill-blue:not(.novo-option-inert):hover,:host.novo-fill-blue:not(.novo-option-inert):focus{background:var(--palette-blue-70)}:host.novo-fill-blue:not(.novo-option-inert):active{background:var(--palette-blue-30)}:host.novo-accent-aqua{border-left:4px solid var(--palette-aqua-50)}:host.novo-fill-aqua:not(.novo-option-inert){color:var(--palette-aqua-50-contrast);background:var(--palette-aqua-50)}:host.novo-fill-aqua:not(.novo-option-inert):hover,:host.novo-fill-aqua:not(.novo-option-inert):focus{background:var(--palette-aqua-70)}:host.novo-fill-aqua:not(.novo-option-inert):active{background:var(--palette-aqua-30)}:host.novo-accent-indigo{border-left:4px solid var(--palette-indigo-50)}:host.novo-fill-indigo:not(.novo-option-inert){color:var(--palette-indigo-50-contrast);background:var(--palette-indigo-50)}:host.novo-fill-indigo:not(.novo-option-inert):hover,:host.novo-fill-indigo:not(.novo-option-inert):focus{background:var(--palette-indigo-70)}:host.novo-fill-indigo:not(.novo-option-inert):active{background:var(--palette-indigo-30)}:host.novo-accent-violet{border-left:4px solid var(--palette-violet-50)}:host.novo-fill-violet:not(.novo-option-inert){color:var(--palette-violet-50-contrast);background:var(--palette-violet-50)}:host.novo-fill-violet:not(.novo-option-inert):hover,:host.novo-fill-violet:not(.novo-option-inert):focus{background:var(--palette-violet-70)}:host.novo-fill-violet:not(.novo-option-inert):active{background:var(--palette-violet-30)}:host.novo-accent-gray{border-left:4px solid var(--palette-gray-50)}:host.novo-fill-gray:not(.novo-option-inert){color:var(--palette-gray-50-contrast);background:var(--palette-gray-50)}:host.novo-fill-gray:not(.novo-option-inert):hover,:host.novo-fill-gray:not(.novo-option-inert):focus{background:var(--palette-gray-70)}:host.novo-fill-gray:not(.novo-option-inert):active{background:var(--palette-gray-30)}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NOVO_OPTION_PARENT_COMPONENT]
                }] }, { type: NovoOptgroup, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NOVO_OPTGROUP]
                }] }]; } });
/**
 * Counts the amount of option group labels that precede the specified option.
 * @param optionIndex Index of the option at which to start counting.
 * @param options Flat list of all of the options.
 * @param optionGroups Flat list of all of the option groups.
 * @docs-private
 */
function _countGroupLabelsBeforeOption(optionIndex, options, optionGroups) {
    if (optionGroups.length) {
        let optionsArray = options.toArray();
        let groups = optionGroups.toArray();
        let groupCounter = 0;
        for (let i = 0; i < optionIndex + 1; i++) {
            if (optionsArray[i].group && optionsArray[i].group === groups[groupCounter]) {
                groupCounter++;
            }
        }
        return groupCounter;
    }
    return 0;
}
/**
 * Determines the position to which to scroll a panel in order for an option to be into view.
 * @param optionOffset Offset of the option from the top of the panel.
 * @param optionHeight Height of the options.
 * @param currentScrollPosition Current scroll position of the panel.
 * @param panelHeight Height of the panel.
 * @docs-private
 */
function _getOptionScrollPosition(optionOffset, optionHeight, currentScrollPosition, panelHeight) {
    if (optionOffset < currentScrollPosition) {
        return optionOffset;
    }
    if (optionOffset + optionHeight > currentScrollPosition + panelHeight) {
        return Math.max(0, optionOffset - panelHeight + optionHeight);
    }
    return currentScrollPosition;
}

// import {NovoCommonModule} from '../common-behaviors/common-module';
class NovoPseudoCheckboxModule {
}
NovoPseudoCheckboxModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPseudoCheckboxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoPseudoCheckboxModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPseudoCheckboxModule, declarations: [NovoPseudoCheckbox], exports: [NovoPseudoCheckbox] });
NovoPseudoCheckboxModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPseudoCheckboxModule, imports: [[]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPseudoCheckboxModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [],
                    exports: [NovoPseudoCheckbox],
                    declarations: [NovoPseudoCheckbox],
                }]
        }] });

class NovoOptionModule {
}
NovoOptionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoOptionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoOptionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoOptionModule, declarations: [NovoOption, NovoOptgroup], imports: [CommonModule, NovoPseudoCheckboxModule], exports: [NovoOption, NovoOptgroup] });
NovoOptionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoOptionModule, imports: [[CommonModule, NovoPseudoCheckboxModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoOptionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NovoPseudoCheckboxModule],
                    exports: [NovoOption, NovoOptgroup],
                    declarations: [NovoOption, NovoOptgroup],
                }]
        }] });

class NovoTemplate {
    constructor(template) {
        this.template = template;
    }
    getType() {
        return this.name;
    }
}
NovoTemplate.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTemplate, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
NovoTemplate.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoTemplate, selector: "[novoTemplate]", inputs: { type: "type", name: ["novoTemplate", "name"] }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTemplate, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoTemplate]',
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; }, propDecorators: { type: [{
                type: Input
            }], name: [{
                type: Input,
                args: ['novoTemplate']
            }] } });

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
class VisibleDirective {
    constructor(el) {
        this.el = el;
    }
    get hb_visibility() {
        return this.visible ? '' : `novo-visibility-hidden`;
    }
}
VisibleDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: VisibleDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
VisibleDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: VisibleDirective, selector: "[visible]", inputs: { visible: "visible" }, host: { properties: { "class": "this.hb_visibility" } }, ngImport: i0 });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], VisibleDirective.prototype, "visible", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: VisibleDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[visible]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { visible: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class']
            }], hb_visibility: [{
                type: HostBinding,
                args: ['class']
            }] } });

// tslint:disable: directive-selector
class ThemeColorDirective {
    constructor(el) {
        this.el = el;
    }
    get hb_textColor() {
        if (!this.theme)
            return '';
        return `novo-theme-${this.theme}`;
    }
}
ThemeColorDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ThemeColorDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
ThemeColorDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: ThemeColorDirective, selector: "[theme]", inputs: { theme: "theme" }, host: { properties: { "class": "this.hb_textColor" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ThemeColorDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[theme]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { theme: [{
                type: Input
            }], hb_textColor: [{
                type: HostBinding,
                args: ['class']
            }] } });

class SwitchCasesDirective {
    constructor(viewContainer, templateRef, ngSwitch) {
        this.viewContainer = viewContainer;
        this.templateRef = templateRef;
        this._created = false;
        this.ngSwitch = ngSwitch;
    }
    ngOnInit() {
        (this.novoSwitchCases || []).forEach(() => this.ngSwitch._addCase());
    }
    ngDoCheck() {
        let enforce = false;
        (this.novoSwitchCases || []).forEach((value) => (enforce = this.ngSwitch._matchCase(value) || enforce));
        this.enforceState(enforce);
    }
    enforceState(created) {
        if (created && !this._created) {
            this._created = true;
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
        else if (!created && this._created) {
            this._created = false;
            this.viewContainer.clear();
        }
    }
}
SwitchCasesDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: SwitchCasesDirective, deps: [{ token: i0.ViewContainerRef }, { token: i0.TemplateRef }, { token: i1.NgSwitch, host: true }], target: i0.ɵɵFactoryTarget.Directive });
SwitchCasesDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: SwitchCasesDirective, selector: "[novoSwitchCases]", inputs: { novoSwitchCases: "novoSwitchCases" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: SwitchCasesDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoSwitchCases]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i0.TemplateRef }, { type: i1.NgSwitch, decorators: [{
                    type: Host
                }] }]; }, propDecorators: { novoSwitchCases: [{
                type: Input
            }] } });

// tslint:disable: directive-selector
/*
Prop	CSS Property	Theme Field
m, margin	margin	space
mt, marginTop	margin-top	space
mr, marginRight	margin-right	space
mb, marginBottom	margin-bottom	space
ml, marginLeft	margin-left	space
mx	margin-left and margin-right	space
my	margin-top and margin-bottom	space
p, padding	padding	space
pt, paddingTop	padding-top	space
pr, paddingRight	padding-right	space
pb, paddingBottom	padding-bottom	space
pl, paddingLeft	padding-left	space
px	padding-left and padding-right	space
py	padding-top and padding-bottom	space
*/
/*
// Selectors generated with the following code
const directions = ['Top', 'Right', 'Bottom', 'Left', 'X', 'Y'];
const abbrDirections = directions.map((d) => d.slice(0, 1).toLowerCase());
const marginAttrs = [
  '[m]',
  '[margin]',
  ...directions.map((dir) => `[margin${dir}]`),
  ...abbrDirections.map((dir) => `[m${dir}]`),
];
const paddingAttrs = [
  '[p]',
  '[padding]',
  ...directions.map((dir) => `[padding${dir}]`),
  ...abbrDirections.map((dir) => `[p${dir}]`),
];

const selectors = [...marginAttrs, ...paddingAttrs];
*/
const getSpacingToken = (value) => {
    const cssvar = getComputedStyle(document.documentElement).getPropertyValue(`--spacing-${value}`); // #999999
    if (cssvar)
        return cssvar;
    // TODO: Maybe Validate Value ie.(rem, px)
    return value;
};
class MarginDirective {
    // @HostBinding('style.margin') get hb_margin() {
    //   return getSpacingToken(this.margin || this.m);
    // }
    get hb_margin() {
        return `margin-${this.margin || this.m}`;
    }
    get hb_margin_left() {
        return getSpacingToken(this.marginLeft || this.ml || this.mx || this.marginX);
    }
    get hb_margin_right() {
        return getSpacingToken(this.marginRight || this.mr || this.mx || this.marginX);
    }
    get hb_margin_top() {
        return getSpacingToken(this.marginTop || this.mt || this.my || this.marginY);
    }
    get hb_margin_bottom() {
        return getSpacingToken(this.marginBottom || this.mb || this.my || this.marginY);
    }
}
MarginDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: MarginDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MarginDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: MarginDirective, selector: "[m],[margin],[marginTop],[marginRight],[marginBottom],[marginLeft],[marginX],[marginY],[mt],[mr],[mb],[ml],[mx],[my]", inputs: { margin: "margin", m: "m", marginLeft: "marginLeft", ml: "ml", marginRight: "marginRight", mr: "mr", marginTop: "marginTop", mt: "mt", marginBottom: "marginBottom", mb: "mb", marginX: "marginX", mx: "mx", marginY: "marginY", my: "my" }, host: { properties: { "class": "this.hb_margin", "style.margin-left": "this.hb_margin_left", "style.margin-right": "this.hb_margin_right", "style.margin-top": "this.hb_margin_top", "style.margin-bottom": "this.hb_margin_bottom" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: MarginDirective, decorators: [{
            type: Directive,
            args: [{
                    // tslint:disable-next-line: max-line-length
                    selector: '[m],[margin],[marginTop],[marginRight],[marginBottom],[marginLeft],[marginX],[marginY],[mt],[mr],[mb],[ml],[mx],[my]',
                }]
        }], propDecorators: { margin: [{
                type: Input
            }], m: [{
                type: Input
            }], marginLeft: [{
                type: Input
            }], ml: [{
                type: Input
            }], marginRight: [{
                type: Input
            }], mr: [{
                type: Input
            }], marginTop: [{
                type: Input
            }], mt: [{
                type: Input
            }], marginBottom: [{
                type: Input
            }], mb: [{
                type: Input
            }], marginX: [{
                type: Input
            }], mx: [{
                type: Input
            }], marginY: [{
                type: Input
            }], my: [{
                type: Input
            }], hb_margin: [{
                type: HostBinding,
                args: ['class']
            }], hb_margin_left: [{
                type: HostBinding,
                args: ['style.margin-left']
            }], hb_margin_right: [{
                type: HostBinding,
                args: ['style.margin-right']
            }], hb_margin_top: [{
                type: HostBinding,
                args: ['style.margin-top']
            }], hb_margin_bottom: [{
                type: HostBinding,
                args: ['style.margin-bottom']
            }] } });
class PaddingDirective {
    get hb_padding() {
        return `padding-${this.padding || this.p}`;
    }
    // @HostBinding('class') get hb_padding() {
    //   return `padding-${this.padding || this.p}`;
    // }
    get hb_padding_left() {
        return getSpacingToken(this.paddingLeft || this.pl || this.px || this.paddingX);
    }
    get hb_padding_right() {
        return getSpacingToken(this.paddingRight || this.pr || this.px || this.paddingX);
    }
    get hb_padding_top() {
        return getSpacingToken(this.paddingTop || this.pt || this.py || this.paddingY);
    }
    get hb_padding_bottom() {
        return getSpacingToken(this.paddingBottom || this.pb || this.py || this.paddingY);
    }
}
PaddingDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: PaddingDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
PaddingDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: PaddingDirective, selector: "[p],[padding],[paddingTop],[paddingRight],[paddingBottom],[paddingLeft],[paddingX],[paddingY],[pt],[pr],[pb],[pl],[px],[py]", inputs: { padding: "padding", p: "p", paddingLeft: "paddingLeft", pl: "pl", paddingRight: "paddingRight", pr: "pr", paddingTop: "paddingTop", pt: "pt", paddingBottom: "paddingBottom", pb: "pb", paddingX: "paddingX", px: "px", paddingY: "paddingY", py: "py" }, host: { properties: { "class": "this.hb_padding", "style.padding-left": "this.hb_padding_left", "style.padding-right": "this.hb_padding_right", "style.padding-top": "this.hb_padding_top", "style.padding-bottom": "this.hb_padding_bottom" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: PaddingDirective, decorators: [{
            type: Directive,
            args: [{
                    // tslint:disable-next-line: max-line-length
                    selector: '[p],[padding],[paddingTop],[paddingRight],[paddingBottom],[paddingLeft],[paddingX],[paddingY],[pt],[pr],[pb],[pl],[px],[py]',
                }]
        }], propDecorators: { padding: [{
                type: Input
            }], p: [{
                type: Input
            }], paddingLeft: [{
                type: Input
            }], pl: [{
                type: Input
            }], paddingRight: [{
                type: Input
            }], pr: [{
                type: Input
            }], paddingTop: [{
                type: Input
            }], pt: [{
                type: Input
            }], paddingBottom: [{
                type: Input
            }], pb: [{
                type: Input
            }], paddingX: [{
                type: Input
            }], px: [{
                type: Input
            }], paddingY: [{
                type: Input
            }], py: [{
                type: Input
            }], hb_padding: [{
                type: HostBinding,
                args: ['class']
            }], hb_padding_left: [{
                type: HostBinding,
                args: ['style.padding-left']
            }], hb_padding_right: [{
                type: HostBinding,
                args: ['style.padding-right']
            }], hb_padding_top: [{
                type: HostBinding,
                args: ['style.padding-top']
            }], hb_padding_bottom: [{
                type: HostBinding,
                args: ['style.padding-bottom']
            }] } });
class GapDirective {
    get hb_gap() {
        return getSpacingToken(this.gap);
    }
}
GapDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: GapDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
GapDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: GapDirective, selector: "[gap]", inputs: { gap: "gap" }, host: { properties: { "style.gap": "this.hb_gap" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: GapDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[gap]',
                }]
        }], propDecorators: { gap: [{
                type: Input
            }], hb_gap: [{
                type: HostBinding,
                args: ['style.gap']
            }] } });

class FlexDirective {
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        // this.renderer.setStyle(this.el.nativeElement, 'display', 'flex');
    }
    get flex() {
        return this._flex;
    }
    set flex(value) {
        if (!value) {
            this._flex = '1 1 auto';
        }
        else {
            this._flex = value;
        }
    }
}
FlexDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: FlexDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
FlexDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: FlexDirective, selector: "[flex]", inputs: { flex: "flex" }, host: { properties: { "style.flex": "this.flex" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: FlexDirective, decorators: [{
            type: Directive,
            args: [{
                    // tslint:disable-next-line: directive-selector
                    selector: '[flex]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { flex: [{
                type: HostBinding,
                args: ['style.flex']
            }, {
                type: Input
            }] } });

// tslint:disable: directive-selector
class FillColorDirective {
    constructor(el) {
        this.el = el;
    }
    get hb_textColor() {
        return `novo-fill-${this.fill}`;
    }
}
FillColorDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: FillColorDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
FillColorDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: FillColorDirective, selector: "[fill]", inputs: { fill: "fill" }, host: { properties: { "class": "this.hb_textColor" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: FillColorDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[fill]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { fill: [{
                type: Input
            }], hb_textColor: [{
                type: HostBinding,
                args: ['class']
            }] } });

// tslint:disable: directive-selector
class TextColorDirective {
    constructor(el) {
        this.el = el;
    }
    get hb_textColor() {
        return isValidColor$1(this.txc) ? 'novo-text-custom' : `novo-text-${this.txc}`;
    }
    get hb_textStyle() {
        return isValidColor$1(this.txc) ? this.txc : null;
    }
}
TextColorDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TextColorDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
TextColorDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: TextColorDirective, selector: "[txc]", inputs: { txc: "txc" }, host: { properties: { "class": "this.hb_textColor", "style.color": "this.hb_textStyle" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TextColorDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[txc]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { txc: [{
                type: Input
            }], hb_textColor: [{
                type: HostBinding,
                args: ['class']
            }], hb_textStyle: [{
                type: HostBinding,
                args: ['style.color']
            }] } });
function isValidColor$1(color) {
    return color.startsWith('#') || color.startsWith('rgb');
}

// tslint:disable: directive-selector
class BorderDirective {
    constructor(el) {
        this.el = el;
        this.borderStyle = 'solid';
        this.borderColor = '#eaecef';
        this.borderWidth = 1;
    }
    // @HostBinding('style.borderStyle') get getBorderStyle() {
    //   return this.border;
    // }
    // @HostBinding('style.borderWidth') get getBorderWidth() {
    //   return this.width;
    // }
    // @HostBinding('style.borderColor') get getBorderColor() {
    //   return this.borderColor;
    // }
    get hb_border() {
        return `border-${this.border}`;
    }
    get hb_border_left() {
        return this.borderLeft || this.bl || this.bx || this.borderX;
    }
    get hb_border_right() {
        return this.borderRight || this.bt || this.bx || this.borderX;
    }
    get hb_border_top() {
        return this.borderTop || this.bt || this.by || this.borderY;
    }
    get hb_border_bottom() {
        return this.borderBottom || this.bt || this.by || this.borderY;
    }
}
BorderDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: BorderDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
BorderDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: BorderDirective, selector: "[border], [bb], [borderBottom], [bt], [borderTop], [bl], [borderLeft], [br], [borderRight], [bx], [borderX], [by], [borderY]", inputs: { borderStyle: "borderStyle", borderColor: "borderColor", borderWidth: "borderWidth", border: "border", borderLeft: "borderLeft", bl: "bl", borderRight: "borderRight", br: "br", borderTop: "borderTop", bt: "bt", borderBottom: "borderBottom", bb: "bb", borderX: "borderX", bx: "bx", borderY: "borderY", by: "by" }, host: { properties: { "class": "this.hb_border", "style.border-left": "this.hb_border_left", "style.border-right": "this.hb_border_right", "style.border-top": "this.hb_border_top", "style.border-bottom": "this.hb_border_bottom" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: BorderDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[border], [bb], [borderBottom], [bt], [borderTop], [bl], [borderLeft], [br], [borderRight], [bx], [borderX], [by], [borderY]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { borderStyle: [{
                type: Input
            }], borderColor: [{
                type: Input
            }], borderWidth: [{
                type: Input
            }], border: [{
                type: Input
            }], borderLeft: [{
                type: Input
            }], bl: [{
                type: Input
            }], borderRight: [{
                type: Input
            }], br: [{
                type: Input
            }], borderTop: [{
                type: Input
            }], bt: [{
                type: Input
            }], borderBottom: [{
                type: Input
            }], bb: [{
                type: Input
            }], borderX: [{
                type: Input
            }], bx: [{
                type: Input
            }], borderY: [{
                type: Input
            }], by: [{
                type: Input
            }], hb_border: [{
                type: HostBinding,
                args: ['class']
            }], hb_border_left: [{
                type: HostBinding,
                args: ['style.border-left']
            }], hb_border_right: [{
                type: HostBinding,
                args: ['style.border-right']
            }], hb_border_top: [{
                type: HostBinding,
                args: ['style.border-top']
            }], hb_border_bottom: [{
                type: HostBinding,
                args: ['style.border-bottom']
            }] } });

// tslint:disable: directive-selector
class BackgroundColorDirective {
    constructor(el) {
        this.el = el;
    }
    get hb_bgColor() {
        return isValidColor(this.bg) ? 'novo-background-custom' : `novo-background-${this.bg}`;
    }
    get hb_bgStyle() {
        return isValidColor(this.bg) ? this.bg : null;
    }
}
BackgroundColorDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: BackgroundColorDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
BackgroundColorDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: BackgroundColorDirective, selector: "[bg]", inputs: { bg: "bg" }, host: { properties: { "class": "this.hb_bgColor", "style.background-color": "this.hb_bgStyle" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: BackgroundColorDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bg]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { bg: [{
                type: Input
            }], hb_bgColor: [{
                type: HostBinding,
                args: ['class']
            }], hb_bgStyle: [{
                type: HostBinding,
                args: ['style.background-color']
            }] } });
function isValidColor(color) {
    return color.startsWith('#') || color.startsWith('rgb');
}

class NovoThemeOptions {
}
class NovoTheme {
    constructor() {
        this._defaultTheme = { themeName: 'modern-light' };
        this.onThemeChange = new EventEmitter();
    }
    /** Name of the theme being used. defaults to `modern-light` */
    get themeName() {
        return this._currentTheme?.themeName || this._defaultTheme.themeName;
    }
    set themeName(value) {
        this._currentTheme = { themeName: value };
        this.changeTheme(this._currentTheme);
    }
    use(options) {
        // future: don't change the theme if the theme given is already selected
        this.changeTheme(options);
        // this might become async in future
        return of(options);
    }
    /**
     * Changes the current theme
     */
    changeTheme(theme) {
        this._currentTheme = theme;
        this.onThemeChange.emit({ themeName: theme.themeName, options: theme });
    }
}
NovoTheme.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTheme, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
NovoTheme.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTheme, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTheme, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

// tslint:disable: directive-selector
class AccentColorDirective {
    constructor(el, theme, cdr) {
        this.el = el;
        this.theme = theme;
        this.cdr = cdr;
        this.subscription = this.theme.onThemeChange.subscribe((event) => {
            this.cdr.markForCheck();
        });
    }
    get hb_textColor() {
        if (!this.accent)
            return '';
        // Support legacy classic theme... for now
        if (this.theme.themeName === 'classic') {
            return `novo-theme-${this.accent}`;
        }
        return `novo-accent-${this.accent}`;
    }
    onDestroy() {
        this.subscription.unsubscribe();
    }
}
AccentColorDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: AccentColorDirective, deps: [{ token: i0.ElementRef }, { token: NovoTheme }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
AccentColorDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: AccentColorDirective, selector: "[accent]", inputs: { accent: "accent" }, host: { properties: { "class": "this.hb_textColor" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: AccentColorDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[accent]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: NovoTheme }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { accent: [{
                type: Input
            }], hb_textColor: [{
                type: HostBinding,
                args: ['class']
            }] } });

class NovoCommonModule {
}
NovoCommonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCommonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoCommonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCommonModule, declarations: [NovoTemplate,
        NovoText,
        NovoTitle,
        NovoCaption,
        NovoLabel,
        NovoLink,
        MarginDirective,
        PaddingDirective,
        BackgroundColorDirective,
        TextColorDirective,
        BorderDirective,
        GapDirective,
        AccentColorDirective,
        FillColorDirective,
        FlexDirective,
        ThemeColorDirective,
        SwitchCasesDirective,
        VisibleDirective], imports: [CommonModule, NovoOptionModule], exports: [NovoTemplate,
        NovoText,
        NovoTitle,
        NovoCaption,
        NovoLabel,
        NovoLink,
        MarginDirective,
        PaddingDirective,
        BackgroundColorDirective,
        TextColorDirective,
        BorderDirective,
        GapDirective,
        AccentColorDirective,
        FillColorDirective,
        FlexDirective,
        ThemeColorDirective,
        SwitchCasesDirective,
        VisibleDirective] });
NovoCommonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCommonModule, imports: [[CommonModule, NovoOptionModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCommonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NovoOptionModule],
                    exports: [
                        NovoTemplate,
                        NovoText,
                        NovoTitle,
                        NovoCaption,
                        NovoLabel,
                        NovoLink,
                        MarginDirective,
                        PaddingDirective,
                        BackgroundColorDirective,
                        TextColorDirective,
                        BorderDirective,
                        GapDirective,
                        AccentColorDirective,
                        FillColorDirective,
                        FlexDirective,
                        ThemeColorDirective,
                        SwitchCasesDirective,
                        VisibleDirective,
                    ],
                    declarations: [
                        NovoTemplate,
                        NovoText,
                        NovoTitle,
                        NovoCaption,
                        NovoLabel,
                        NovoLink,
                        MarginDirective,
                        PaddingDirective,
                        BackgroundColorDirective,
                        TextColorDirective,
                        BorderDirective,
                        GapDirective,
                        AccentColorDirective,
                        FillColorDirective,
                        FlexDirective,
                        ThemeColorDirective,
                        SwitchCasesDirective,
                        VisibleDirective,
                    ],
                }]
        }] });

class GridDirective {
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.renderer.setStyle(this.el.nativeElement, 'display', 'grid');
        this.renderer.setStyle(this.el.nativeElement, 'height', '100%');
    }
}
GridDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: GridDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
GridDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: GridDirective, selector: "[appGrid]", inputs: { columns: "columns", rows: "rows", areas: "areas" }, host: { properties: { "style.grid-template-columns": "this.columns", "style.grid-template-rows": "this.rows", "style.grid-template-areas": "this.areas" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: GridDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[appGrid]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { columns: [{
                type: HostBinding,
                args: ['style.grid-template-columns']
            }, {
                type: Input
            }], rows: [{
                type: HostBinding,
                args: ['style.grid-template-rows']
            }, {
                type: Input
            }], areas: [{
                type: HostBinding,
                args: ['style.grid-template-areas']
            }, {
                type: Input
            }] } });
class GridAreaDirective {
}
GridAreaDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: GridAreaDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
GridAreaDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: GridAreaDirective, selector: "[appGridArea]", inputs: { area: ["appGridArea", "area"] }, host: { properties: { "style.grid-area": "this.area" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: GridAreaDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[appGridArea]',
                }]
        }], propDecorators: { area: [{
                type: HostBinding,
                args: ['style.grid-area']
            }, {
                type: Input,
                args: ['appGridArea']
            }] } });

// tslint:disable: directive-selector
const entriesMap = new WeakMap();
const ro = new ResizeObserver((entries) => {
    for (const entry of entries) {
        if (entriesMap.has(entry.target)) {
            const comp = entriesMap.get(entry.target);
            comp._resizeCallback(entry);
        }
    }
});
class ResizeObserverDirective {
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.sizes = ['size-s', 'size-m', 'size-l', 'size-xl', 'size-xxl'];
        this.resize = new EventEmitter();
        const target = this.el.nativeElement;
        entriesMap.set(target, this);
        ro.observe(target);
    }
    _resizeCallback(entry) {
        const size = this.responsive.reduce((max, w, idx) => {
            if (entry.contentRect.width > w) {
                max = this.sizes[idx + 1];
            }
            return max;
        }, this.sizes[0]);
        if (size !== this.size) {
            this.renderer.removeClass(this.el.nativeElement, this.size);
            this.renderer.addClass(this.el.nativeElement, size);
            this.size = size;
            this.resize.emit(entry);
        }
    }
    ngOnDestroy() {
        const target = this.el.nativeElement;
        ro.unobserve(target);
        entriesMap.delete(target);
    }
}
ResizeObserverDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ResizeObserverDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
ResizeObserverDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: ResizeObserverDirective, selector: "[responsive]", inputs: { responsive: "responsive", sizes: "sizes" }, outputs: { resize: "resize" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ResizeObserverDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[responsive]' }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { responsive: [{
                type: Input
            }], sizes: [{
                type: Input
            }], resize: [{
                type: Output
            }] } });

class TypographyDirective {
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
}
TypographyDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TypographyDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
TypographyDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: TypographyDirective, selector: "[fontWeight],[lineHeight],[textAlign],[textAlign],[fontStyle],[textTransform]", inputs: { fontWeight: "fontWeight", lineHeight: "lineHeight", textAlign: "textAlign", fontStyle: "fontStyle", textTransform: "textTransform" }, host: { properties: { "style.fontWeight": "this.fontWeight", "style.lineHeight": "this.lineHeight", "style.textAlign": "this.textAlign", "style.fontStyle": "this.fontStyle", "style.textTransform": "this.textTransform" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TypographyDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 
                    // tslint:disable-next-line: directive-selector
                    '[fontWeight],[lineHeight],[textAlign],[textAlign],[fontStyle],[textTransform]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { fontWeight: [{
                type: HostBinding,
                args: ['style.fontWeight']
            }, {
                type: Input
            }], lineHeight: [{
                type: HostBinding,
                args: ['style.lineHeight']
            }, {
                type: Input
            }], textAlign: [{
                type: HostBinding,
                args: ['style.textAlign']
            }, {
                type: Input
            }], fontStyle: [{
                type: HostBinding,
                args: ['style.fontStyle']
            }, {
                type: Input
            }], textTransform: [{
                type: HostBinding,
                args: ['style.textTransform']
            }, {
                type: Input
            }] } });

/** Error state matcher that matches when a control is invalid and dirty. */
class ShowOnDirtyErrorStateMatcher {
    isErrorState(control, form) {
        return !!(control && control.invalid && (control.dirty || (form && form.submitted)));
    }
}
ShowOnDirtyErrorStateMatcher.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ShowOnDirtyErrorStateMatcher, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ShowOnDirtyErrorStateMatcher.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ShowOnDirtyErrorStateMatcher });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ShowOnDirtyErrorStateMatcher, decorators: [{
            type: Injectable
        }] });
/** Provider that defines how form controls behave with regards to displaying error messages. */
class ErrorStateMatcher {
    isErrorState(control, form) {
        return !!(control && control.invalid && (control.touched || (form && form.submitted)));
    }
}
ErrorStateMatcher.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ErrorStateMatcher, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ErrorStateMatcher.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ErrorStateMatcher, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ErrorStateMatcher, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

class NovoPrefixDirective {
}
NovoPrefixDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPrefixDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NovoPrefixDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoPrefixDirective, selector: "[prefix],[before]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPrefixDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[prefix],[before]' }]
        }] });

class NovoSuffixDirective {
}
NovoSuffixDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSuffixDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NovoSuffixDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoSuffixDirective, selector: "[suffix],[after]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSuffixDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[suffix],[after]' }]
        }] });

/** Mixin to augment a directive with a `color` property. */
function mixinColor(base, defaultColor) {
    return class extends base {
        constructor(...args) {
            super(...args);
            this.defaultColor = defaultColor;
            // Set the default color that can be specified from the mixin.
            this.color = defaultColor;
        }
        get color() {
            return this._color;
        }
        set color(value) {
            const colorPalette = value || this.defaultColor;
            if (colorPalette !== this._color) {
                if (this._color) {
                    this._elementRef.nativeElement.classList.remove(`novo-color-${this._color}`);
                }
                if (colorPalette) {
                    this._elementRef.nativeElement.classList.add(`novo-color-${colorPalette}`);
                }
                this._color = colorPalette;
            }
        }
    };
}

/**
 * Mixin to augment a directive with updateErrorState method.
 * For component with `errorState` and need to update `errorState`.
 */
function mixinErrorState(base) {
    return class extends base {
        constructor(...args) {
            super(...args);
            /** Whether the component is in an error state. */
            this.errorState = false;
            /**
             * Stream that emits whenever the state of the input changes such that the wrapping
             * `MatFormField` needs to run change detection.
             */
            this.stateChanges = new Subject();
        }
        updateErrorState() {
            const oldState = this.errorState;
            const parent = this._parentFormGroup || this._parentForm;
            const matcher = this.errorStateMatcher || this._defaultErrorStateMatcher;
            const control = this.ngControl ? this.ngControl.control : null;
            const newState = matcher.isErrorState(control, parent);
            if (newState !== oldState) {
                this.errorState = newState;
                this.stateChanges.next();
            }
        }
    };
}

/** Mixin to augment a directive with a `overlay` property. */
function mixinOverlay(base) {
    // Note: We cast `base` to `unknown` and then `Constructor`. It could be an abstract class,
    // but given we `extend` it from another class, we can assume a constructor being accessible.
    class Mixin extends base {
        constructor(...args) {
            super(...args);
        }
        openPanel() {
            if (!this.disabled) {
                this.overlay.openPanel();
            }
        }
        closePanel() {
            this.overlay.closePanel();
        }
        togglePanel() {
            if (this.panelOpen) {
                this.closePanel();
            }
            else {
                this.openPanel();
            }
        }
        get panelOpen() {
            return this.overlay && this.overlay.panelOpen;
        }
    }
    // Since we don't directly extend from `base` with it's original types, and we instruct
    // TypeScript that `T` actually is instantiatable through `new`, the types don't overlap.
    // This is a limitation in TS as abstract classes cannot be typed properly dynamically.
    return Mixin;
}

/** Mixin to augment a directive with a `required` property. */
function mixinRequired(base) {
    return class extends base {
        constructor(...args) {
            super(...args);
            this._required = false;
        }
        get required() {
            return this._required;
        }
        set required(value) {
            this._required = coerceBooleanProperty(value);
        }
    };
}

/** Mixin to augment a directive with a `size` property. */
function mixinSize(base, defaultSize) {
    return class extends base {
        constructor(...args) {
            super(...args);
            this.defaultSize = defaultSize;
            // Set the default size that can be specified from the mixin.
            this.size = defaultSize;
        }
        get size() {
            return this._size;
        }
        set size(value) {
            const size = value || this.defaultSize;
            if (size !== this._size) {
                if (this._size) {
                    this._elementRef.nativeElement.classList.remove(`novo-size-${this._size}`);
                }
                if (size) {
                    this._elementRef.nativeElement.classList.add(`novo-size-${size}`);
                }
                this._size = size;
            }
        }
    };
}

/** Mixin to augment a directive with a `tabIndex` property. */
function mixinTabIndex(base, defaultTabIndex = 0) {
    // Note: We cast `base` to `unknown` and then `Constructor`. It could be an abstract class,
    // but given we `extend` it from another class, we can assume a constructor being accessible.
    class Mixin extends base {
        constructor(...args) {
            super(...args);
            this._tabIndex = defaultTabIndex;
            this.defaultTabIndex = defaultTabIndex;
        }
        get tabIndex() {
            return this.disabled ? -1 : this._tabIndex;
        }
        set tabIndex(value) {
            // If the specified tabIndex value is null or undefined, fall back to the default value.
            this._tabIndex = value != null ? coerceNumberProperty(value) : this.defaultTabIndex;
        }
    }
    // Since we don't directly extend from `base` with it's original types, and we instruct
    // TypeScript that `T` actually is instantiatable through `new`, the types don't overlap.
    // This is a limitation in TS as abstract classes cannot be typed properly dynamically.
    return Mixin;
}

// Angular
class NovoOverlayTemplateComponent {
    constructor(overlay, viewContainerRef, zone, changeDetectorRef, document) {
        this.overlay = overlay;
        this.viewContainerRef = viewContainerRef;
        this.zone = zone;
        this.changeDetectorRef = changeDetectorRef;
        this.document = document;
        this.id = `novo-overlay-${Date.now()}`;
        this.position = 'default';
        this.scrollStrategy = 'reposition';
        this.closeOnSelect = true;
        this.hasBackdrop = false;
        this.select = new EventEmitter();
        this.opening = new EventEmitter();
        this.closing = new EventEmitter();
    }
    ngOnDestroy() {
        this.destroyOverlay();
    }
    get panelOpen() {
        return this.overlayRef && this.overlayRef.hasAttached();
    }
    set parent(value) {
        this._parent = value;
        this.checkSizes();
    }
    get parent() {
        return this._parent;
    }
    openPanel() {
        if (!this.overlayRef) {
            this.createOverlay(this.template);
        }
        else {
            this.checkSizes();
        }
        if (this.overlayRef && !this.overlayRef.hasAttached()) {
            this.overlayRef.attach(this.portal);
            this.closingActionsSubscription = this.subscribeToClosingActions();
        }
        this.changeDetectorRef.markForCheck();
        setTimeout(() => {
            if (this.overlayRef) {
                this.overlayRef.updatePosition();
                this.opening.emit(true);
                setTimeout(() => {
                    // TODO: @charlesabarnes Remove this once we remove table
                    if (this.overlayRef) {
                        this.overlayRef.updatePosition();
                    }
                });
            }
        });
    }
    closePanel() {
        this.zone.run(() => {
            if (this.overlayRef && this.overlayRef.hasAttached()) {
                this.overlayRef.detach();
                this.closingActionsSubscription.unsubscribe();
            }
            this.closing.emit(false);
            if (this.panelOpen) {
                this.changeDetectorRef.markForCheck();
            }
        });
    }
    onClosingAction(event) {
        this.closePanel();
    }
    /**
     * A stream of actions that should close the autocomplete panel, including
     * when an option is selected, on blur, and when TAB is pressed.
     */
    get panelClosingActions() {
        return merge(
        // this.overlayTemplate._keyManager.tabOut,
        this.outsideClickStream);
    }
    /** Stream of clicks outside of the autocomplete panel. */
    get outsideClickStream() {
        if (!this.document) {
            return of();
        }
        return merge(fromEvent(this.document, 'mouseup'), fromEvent(this.document, 'touchend')).pipe(filter((event) => {
            const clickTarget = event.target;
            const clickedOutside = this.panelOpen &&
                clickTarget !== this.getConnectedElement().nativeElement &&
                !this.getConnectedElement().nativeElement.contains(clickTarget) &&
                !!this.overlayRef &&
                !this.overlayRef.overlayElement.contains(clickTarget) &&
                !this.elementIsInNestedOverlay(clickTarget);
            if (this.panelOpen && !!this.overlayRef && this.overlayRef.overlayElement.contains(clickTarget) && this.closeOnSelect) {
                this.select.emit(event);
            }
            return clickedOutside;
        }));
    }
    /**
     * This method listens to a stream of panel closing actions and resets the
     * stream every time the option list changes.
     */
    subscribeToClosingActions() {
        const firstStable = this.zone.onStable.asObservable().pipe(first());
        // const valueChanges = Observable.from(this.value);
        // When the zone is stable initially, and when the option list changes...
        return (merge(firstStable)
            .pipe(
        // create a new stream of panelClosingActions, replacing any previous streams
        // that were created, and flatten it so our stream only emits closing events...
        switchMap(() => {
            return this.panelClosingActions;
        }), 
        // when the first closing event occurs...
        first())
            // set the value, close the panel, and complete.
            .subscribe((event) => this.onClosingAction(event)));
    }
    createOverlay(template) {
        this.portal = new TemplatePortal(template, this.viewContainerRef);
        this.overlayRef = this.overlay.create(this.getOverlayConfig());
        this.overlayRef.backdropClick().subscribe(() => this.closePanel());
    }
    destroyOverlay() {
        if (this.overlayRef) {
            this.closePanel();
            this.overlayRef.dispose();
            this.overlayRef = undefined;
        }
    }
    getOverlayConfig() {
        const config = new OverlayConfig();
        if (!this.width) {
            config.width = this.getHostWidth();
        }
        else {
            config.width = this.width;
        }
        if (this.height) {
            config.height = this.height;
        }
        config.positionStrategy = this.getPosition();
        config.hasBackdrop = this.hasBackdrop;
        config.direction = 'ltr';
        config.scrollStrategy = this.getScrollStrategy();
        return config;
    }
    /**
     * Supports the following position strategies:
     * 'default', 'right', 'bottom', 'center', 'bottom-left', 'bottom-right', 'top-left', 'top-right'
     */
    getPosition() {
        if (this.position === 'center') {
            return this.overlay
                .position()
                .flexibleConnectedTo(this.getConnectedElement())
                .withFlexibleDimensions(false)
                .withPositions([
                { originX: 'start', originY: 'center', overlayX: 'start', overlayY: 'center' },
                { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'top' },
                { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'bottom' },
            ]);
        }
        const [originX, fallbackX] = this.position.includes('right') ? ['end', 'start'] : ['start', 'end'];
        const [originY, overlayY] = this.position.includes('top') ? ['top', 'bottom'] : ['bottom', 'top'];
        const defaultPosition = { originX, originY, overlayX: originX, overlayY };
        let strategy = this.overlay
            .position()
            .flexibleConnectedTo(this.getConnectedElement())
            .withFlexibleDimensions(false)
            .withPositions([defaultPosition]);
        if (this.position === 'bottom') {
            strategy = strategy.withPositions([defaultPosition, { originX: fallbackX, originY: 'bottom', overlayX: fallbackX, overlayY: 'top' }]);
        }
        else if (this.position === 'right' || this.position === 'default' || this.position.includes('above-below')) {
            strategy = strategy.withPositions([
                defaultPosition,
                { originX, originY: 'top', overlayX: originX, overlayY: 'bottom' },
                { originX: fallbackX, originY: 'bottom', overlayX: fallbackX, overlayY: 'top' },
                { originX: fallbackX, originY: 'top', overlayX: fallbackX, overlayY: 'bottom' },
            ]);
            if (!this.position.includes('above-below')) {
                strategy = strategy.withPositions([
                    defaultPosition,
                    { originX, originY: 'center', overlayX: originX, overlayY: 'center' },
                    { originX: fallbackX, originY: 'center', overlayX: fallbackX, overlayY: 'center' },
                ]);
            }
        }
        return strategy;
    }
    getScrollStrategy() {
        switch (this.scrollStrategy) {
            case 'block':
                return this.overlay.scrollStrategies.block();
            case 'reposition':
                return this.overlay.scrollStrategies.reposition();
            default:
                return this.overlay.scrollStrategies.close();
        }
    }
    checkSizes() {
        if (this.overlayRef) {
            if (!this.width) {
                this.overlayRef.getConfig().width = this.getHostWidth();
            }
            if (this.height) {
                this.overlayRef.getConfig().height = this.height;
            }
            this.overlayRef.updateSize(this.overlayRef.getConfig());
            this.overlayRef.updatePosition();
            this.changeDetectorRef.markForCheck();
        }
    }
    getConnectedElement() {
        return this.parent;
    }
    elementIsInNestedOverlay(el) {
        while (el.parentNode) {
            if (el.id?.includes('novo-overlay-') || el.id?.includes('modal-container-')) {
                return this.id.split('-')[2] < el.id.split('-')[2];
            }
            el = el.parentNode;
        }
        return false;
    }
    getHostWidth() {
        return this.getConnectedElement().nativeElement.getBoundingClientRect().width;
    }
}
NovoOverlayTemplateComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoOverlayTemplateComponent, deps: [{ token: i1$1.Overlay }, { token: i0.ViewContainerRef }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: DOCUMENT, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NovoOverlayTemplateComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: { position: "position", scrollStrategy: "scrollStrategy", role: "role", width: "width", height: "height", closeOnSelect: "closeOnSelect", hasBackdrop: "hasBackdrop", parent: "parent" }, outputs: { select: "select", opening: "opening", closing: "closing" }, viewQueries: [{ propertyName: "template", first: true, predicate: TemplateRef, descendants: true }, { propertyName: "panel", first: true, predicate: ["panel"], descendants: true }], ngImport: i0, template: `
    <ng-template>
      <div class="novo-overlay-panel" [attr.role]="role" [id]="id" #panel>
        <ng-content></ng-content>
      </div>
    </ng-template>
  `, isInline: true, styles: [""], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoOverlayTemplateComponent, decorators: [{
            type: Component,
            args: [{ selector: 'novo-overlay-template', template: `
    <ng-template>
      <div class="novo-overlay-panel" [attr.role]="role" [id]="id" #panel>
        <ng-content></ng-content>
      </div>
    </ng-template>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: [""] }]
        }], ctorParameters: function () { return [{ type: i1$1.Overlay }, { type: i0.ViewContainerRef }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { template: [{
                type: ViewChild,
                args: [TemplateRef]
            }], panel: [{
                type: ViewChild,
                args: ['panel']
            }], position: [{
                type: Input
            }], scrollStrategy: [{
                type: Input
            }], role: [{
                type: Input
            }], width: [{
                type: Input
            }], height: [{
                type: Input
            }], closeOnSelect: [{
                type: Input
            }], hasBackdrop: [{
                type: Input
            }], select: [{
                type: Output
            }], opening: [{
                type: Output
            }], closing: [{
                type: Output
            }], parent: [{
                type: Input
            }] } });

// NG2
class NovoOverlayModule {
}
NovoOverlayModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoOverlayModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoOverlayModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoOverlayModule, declarations: [NovoOverlayTemplateComponent], imports: [CommonModule, FormsModule, OverlayModule, ScrollingModule], exports: [NovoOverlayTemplateComponent, ScrollingModule] });
NovoOverlayModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoOverlayModule, imports: [[CommonModule, FormsModule, OverlayModule, ScrollingModule], ScrollingModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoOverlayModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, OverlayModule, ScrollingModule],
                    declarations: [NovoOverlayTemplateComponent],
                    exports: [NovoOverlayTemplateComponent, ScrollingModule],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { AccentColorDirective, BackgroundColorDirective, BorderDirective, ErrorStateMatcher, FillColorDirective, FlexDirective, GapDirective, GridAreaDirective, GridDirective, MarginDirective, NOVO_OPTGROUP, NOVO_OPTION_PARENT_COMPONENT, NovoBaseTextElement, NovoCaption, NovoCommonModule, NovoLabel, NovoLink, NovoOptgroup, NovoOptgroupBase, NovoOptgroupMixinBase, NovoOption, NovoOptionBase, NovoOptionModule, NovoOptionSelectionChange, NovoOverlayModule, NovoOverlayTemplateComponent, NovoPrefixDirective, NovoPseudoCheckbox, NovoPseudoCheckboxModule, NovoSuffixDirective, NovoTemplate, NovoText, NovoTheme, NovoThemeOptions, NovoTitle, PaddingDirective, ResizeObserverDirective, ShowOnDirtyErrorStateMatcher, SwitchCasesDirective, TextColorDirective, ThemeColorDirective, TypographyDirective, VisibleDirective, _countGroupLabelsBeforeOption, _getOptionScrollPosition, getSpacingToken, mixinColor, mixinDisabled, mixinErrorState, mixinOverlay, mixinRequired, mixinSize, mixinTabIndex };
//# sourceMappingURL=novo-elements-common.mjs.map

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from '@angular/core';
import { Component, Input, HostBinding, Directive, TemplateRef, ContentChildren, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// NG2
class NovoLoadingElement {
    constructor() {
        this.size = 'medium';
    }
    /**
     * **deprecated** please use `color`.
     * @deprecated
     **/
    set theme(value) {
        console.warn(`'theme' property is deprecated, please use 'color'.`);
        this.color = value;
    }
    get theme() {
        return this.color;
    }
    get hb_class() {
        return [`color-${this.color}`, `size-${this.size}`].join(' ');
    }
}
NovoLoadingElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoLoadingElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoLoadingElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoLoadingElement, selector: "novo-loading", inputs: { theme: "theme", color: "color", size: "size" }, host: { properties: { "class": "this.hb_class" } }, ngImport: i0, template: `
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  `, isInline: true, styles: [":host{padding:20px;display:flex;flex-direction:row;font-size:13px;gap:.3em}:host.size-small{padding:8px;font-size:8px}:host.size-large{font-size:18px}:host span.dot{display:block;border-radius:50%;height:1em;width:1em}:host span.dot:nth-of-type(1){background-color:var(--palette-blue-50)}:host span.dot:nth-of-type(2){background-color:var(--palette-indigo-50)}:host span.dot:nth-of-type(3){background-color:var(--palette-red-50)}:host span.dot:nth-of-type(4){background-color:var(--palette-orange-50)}:host span.dot:nth-of-type(5){background-color:var(--palette-green-50)}:host span.dot:nth-of-type(1){-webkit-animation:jump 1.6s ease-in-out 70ms forward infinite \"\" \"\";animation:jump 1.6s ease-in-out 70ms forward infinite \"\" \"\";-webkit-animation-name:jump;animation-name:jump;-webkit-animation-duration:1.6s;animation-duration:1.6s;-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out;-webkit-animation-delay:70ms;animation-delay:70ms;-webkit-animation-direction:forward;animation-direction:forward;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-fill-mode:\"\";animation-fill-mode:\"\";-webkit-animation-play-state:\"\";animation-play-state:\"\"}:host span.dot:nth-of-type(2){-webkit-animation:jump 1.6s ease-in-out .14s forward infinite \"\" \"\";animation:jump 1.6s ease-in-out .14s forward infinite \"\" \"\";-webkit-animation-name:jump;animation-name:jump;-webkit-animation-duration:1.6s;animation-duration:1.6s;-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out;-webkit-animation-delay:.14s;animation-delay:.14s;-webkit-animation-direction:forward;animation-direction:forward;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-fill-mode:\"\";animation-fill-mode:\"\";-webkit-animation-play-state:\"\";animation-play-state:\"\"}:host span.dot:nth-of-type(3){-webkit-animation:jump 1.6s ease-in-out .21s forward infinite \"\" \"\";animation:jump 1.6s ease-in-out .21s forward infinite \"\" \"\";-webkit-animation-name:jump;animation-name:jump;-webkit-animation-duration:1.6s;animation-duration:1.6s;-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out;-webkit-animation-delay:.21s;animation-delay:.21s;-webkit-animation-direction:forward;animation-direction:forward;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-fill-mode:\"\";animation-fill-mode:\"\";-webkit-animation-play-state:\"\";animation-play-state:\"\"}:host span.dot:nth-of-type(4){-webkit-animation:jump 1.6s ease-in-out .28s forward infinite \"\" \"\";animation:jump 1.6s ease-in-out .28s forward infinite \"\" \"\";-webkit-animation-name:jump;animation-name:jump;-webkit-animation-duration:1.6s;animation-duration:1.6s;-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out;-webkit-animation-delay:.28s;animation-delay:.28s;-webkit-animation-direction:forward;animation-direction:forward;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-fill-mode:\"\";animation-fill-mode:\"\";-webkit-animation-play-state:\"\";animation-play-state:\"\"}:host span.dot:nth-of-type(5){-webkit-animation:jump 1.6s ease-in-out .35s forward infinite \"\" \"\";animation:jump 1.6s ease-in-out .35s forward infinite \"\" \"\";-webkit-animation-name:jump;animation-name:jump;-webkit-animation-duration:1.6s;animation-duration:1.6s;-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out;-webkit-animation-delay:.35s;animation-delay:.35s;-webkit-animation-direction:forward;animation-direction:forward;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-fill-mode:\"\";animation-fill-mode:\"\";-webkit-animation-play-state:\"\";animation-play-state:\"\"}:host.color-person span.dot{background-color:var(--color-person)}:host.color-company span.dot{background-color:var(--color-company)}:host.color-candidate span.dot{background-color:var(--color-candidate)}:host.color-lead span.dot{background-color:var(--color-lead)}:host.color-contact span.dot{background-color:var(--color-contact)}:host.color-clientcontact span.dot{background-color:var(--color-clientcontact)}:host.color-opportunity span.dot{background-color:var(--color-opportunity)}:host.color-job span.dot{background-color:var(--color-job)}:host.color-joborder span.dot{background-color:var(--color-joborder)}:host.color-submission span.dot{background-color:var(--color-submission)}:host.color-sendout span.dot{background-color:var(--color-sendout)}:host.color-placement span.dot{background-color:var(--color-placement)}:host.color-note span.dot{background-color:var(--color-note)}:host.color-task span.dot{background-color:var(--color-task)}:host.color-distribution-list span.dot{background-color:var(--color-distribution-list)}:host.color-credential span.dot{background-color:var(--color-credential)}:host.color-user span.dot{background-color:var(--color-user)}:host.color-corporate-user span.dot{background-color:var(--color-corporate-user)}:host.color-contract span.dot{background-color:var(--color-contract)}:host.color-job-code span.dot{background-color:var(--color-job-code)}:host.color-earn-code span.dot{background-color:var(--color-earn-code)}:host.color-billable-charge span.dot{background-color:var(--color-billable-charge)}:host.color-payable-charge span.dot{background-color:var(--color-payable-charge)}:host.color-invoice-statement span.dot{background-color:var(--color-invoice-statement)}:host.color-selection span.dot{background-color:var(--color-selection)}:host.color-positive span.dot{background-color:var(--color-positive)}:host.color-success span.dot{background-color:var(--color-success)}:host.color-warning span.dot{background-color:var(--color-warning)}:host.color-error span.dot{background-color:var(--color-error)}:host.color-info span.dot{background-color:var(--color-info)}:host.color-disabled span.dot{background-color:var(--color-disabled)}:host.color-red span.dot{background-color:var(--palette-red-50)}:host.color-pink span.dot{background-color:var(--palette-pink-50)}:host.color-orange span.dot{background-color:var(--palette-orange-50)}:host.color-yellow span.dot{background-color:var(--palette-yellow-50)}:host.color-green span.dot{background-color:var(--palette-green-50)}:host.color-teal span.dot{background-color:var(--palette-teal-50)}:host.color-blue span.dot{background-color:var(--palette-blue-50)}:host.color-aqua span.dot{background-color:var(--palette-aqua-50)}:host.color-indigo span.dot{background-color:var(--palette-indigo-50)}:host.color-violet span.dot{background-color:var(--palette-violet-50)}:host.color-gray span.dot{background-color:var(--palette-gray-50)}:host.white span.dot,:host[inverse] span.dot{background-color:var(--color-white)!important}@-webkit-keyframes jump{0%{transform:translateY(0)}30%{transform:translateY(0);opacity:1}45%{transform:translateY(-1.2em);opacity:.5}60%{transform:translateY(.8em);opacity:.95}to{transform:translateY(0);opacity:1}}@keyframes jump{0%{transform:translateY(0)}30%{transform:translateY(0);opacity:1}45%{transform:translateY(-1.2em);opacity:.5}60%{transform:translateY(.8em);opacity:.95}to{transform:translateY(0);opacity:1}}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoLoadingElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-loading', template: `
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  `, styles: [":host{padding:20px;display:flex;flex-direction:row;font-size:13px;gap:.3em}:host.size-small{padding:8px;font-size:8px}:host.size-large{font-size:18px}:host span.dot{display:block;border-radius:50%;height:1em;width:1em}:host span.dot:nth-of-type(1){background-color:var(--palette-blue-50)}:host span.dot:nth-of-type(2){background-color:var(--palette-indigo-50)}:host span.dot:nth-of-type(3){background-color:var(--palette-red-50)}:host span.dot:nth-of-type(4){background-color:var(--palette-orange-50)}:host span.dot:nth-of-type(5){background-color:var(--palette-green-50)}:host span.dot:nth-of-type(1){-webkit-animation:jump 1.6s ease-in-out 70ms forward infinite \"\" \"\";animation:jump 1.6s ease-in-out 70ms forward infinite \"\" \"\";-webkit-animation-name:jump;animation-name:jump;-webkit-animation-duration:1.6s;animation-duration:1.6s;-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out;-webkit-animation-delay:70ms;animation-delay:70ms;-webkit-animation-direction:forward;animation-direction:forward;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-fill-mode:\"\";animation-fill-mode:\"\";-webkit-animation-play-state:\"\";animation-play-state:\"\"}:host span.dot:nth-of-type(2){-webkit-animation:jump 1.6s ease-in-out .14s forward infinite \"\" \"\";animation:jump 1.6s ease-in-out .14s forward infinite \"\" \"\";-webkit-animation-name:jump;animation-name:jump;-webkit-animation-duration:1.6s;animation-duration:1.6s;-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out;-webkit-animation-delay:.14s;animation-delay:.14s;-webkit-animation-direction:forward;animation-direction:forward;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-fill-mode:\"\";animation-fill-mode:\"\";-webkit-animation-play-state:\"\";animation-play-state:\"\"}:host span.dot:nth-of-type(3){-webkit-animation:jump 1.6s ease-in-out .21s forward infinite \"\" \"\";animation:jump 1.6s ease-in-out .21s forward infinite \"\" \"\";-webkit-animation-name:jump;animation-name:jump;-webkit-animation-duration:1.6s;animation-duration:1.6s;-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out;-webkit-animation-delay:.21s;animation-delay:.21s;-webkit-animation-direction:forward;animation-direction:forward;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-fill-mode:\"\";animation-fill-mode:\"\";-webkit-animation-play-state:\"\";animation-play-state:\"\"}:host span.dot:nth-of-type(4){-webkit-animation:jump 1.6s ease-in-out .28s forward infinite \"\" \"\";animation:jump 1.6s ease-in-out .28s forward infinite \"\" \"\";-webkit-animation-name:jump;animation-name:jump;-webkit-animation-duration:1.6s;animation-duration:1.6s;-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out;-webkit-animation-delay:.28s;animation-delay:.28s;-webkit-animation-direction:forward;animation-direction:forward;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-fill-mode:\"\";animation-fill-mode:\"\";-webkit-animation-play-state:\"\";animation-play-state:\"\"}:host span.dot:nth-of-type(5){-webkit-animation:jump 1.6s ease-in-out .35s forward infinite \"\" \"\";animation:jump 1.6s ease-in-out .35s forward infinite \"\" \"\";-webkit-animation-name:jump;animation-name:jump;-webkit-animation-duration:1.6s;animation-duration:1.6s;-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out;-webkit-animation-delay:.35s;animation-delay:.35s;-webkit-animation-direction:forward;animation-direction:forward;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-fill-mode:\"\";animation-fill-mode:\"\";-webkit-animation-play-state:\"\";animation-play-state:\"\"}:host.color-person span.dot{background-color:var(--color-person)}:host.color-company span.dot{background-color:var(--color-company)}:host.color-candidate span.dot{background-color:var(--color-candidate)}:host.color-lead span.dot{background-color:var(--color-lead)}:host.color-contact span.dot{background-color:var(--color-contact)}:host.color-clientcontact span.dot{background-color:var(--color-clientcontact)}:host.color-opportunity span.dot{background-color:var(--color-opportunity)}:host.color-job span.dot{background-color:var(--color-job)}:host.color-joborder span.dot{background-color:var(--color-joborder)}:host.color-submission span.dot{background-color:var(--color-submission)}:host.color-sendout span.dot{background-color:var(--color-sendout)}:host.color-placement span.dot{background-color:var(--color-placement)}:host.color-note span.dot{background-color:var(--color-note)}:host.color-task span.dot{background-color:var(--color-task)}:host.color-distribution-list span.dot{background-color:var(--color-distribution-list)}:host.color-credential span.dot{background-color:var(--color-credential)}:host.color-user span.dot{background-color:var(--color-user)}:host.color-corporate-user span.dot{background-color:var(--color-corporate-user)}:host.color-contract span.dot{background-color:var(--color-contract)}:host.color-job-code span.dot{background-color:var(--color-job-code)}:host.color-earn-code span.dot{background-color:var(--color-earn-code)}:host.color-billable-charge span.dot{background-color:var(--color-billable-charge)}:host.color-payable-charge span.dot{background-color:var(--color-payable-charge)}:host.color-invoice-statement span.dot{background-color:var(--color-invoice-statement)}:host.color-selection span.dot{background-color:var(--color-selection)}:host.color-positive span.dot{background-color:var(--color-positive)}:host.color-success span.dot{background-color:var(--color-success)}:host.color-warning span.dot{background-color:var(--color-warning)}:host.color-error span.dot{background-color:var(--color-error)}:host.color-info span.dot{background-color:var(--color-info)}:host.color-disabled span.dot{background-color:var(--color-disabled)}:host.color-red span.dot{background-color:var(--palette-red-50)}:host.color-pink span.dot{background-color:var(--palette-pink-50)}:host.color-orange span.dot{background-color:var(--palette-orange-50)}:host.color-yellow span.dot{background-color:var(--palette-yellow-50)}:host.color-green span.dot{background-color:var(--palette-green-50)}:host.color-teal span.dot{background-color:var(--palette-teal-50)}:host.color-blue span.dot{background-color:var(--palette-blue-50)}:host.color-aqua span.dot{background-color:var(--palette-aqua-50)}:host.color-indigo span.dot{background-color:var(--palette-indigo-50)}:host.color-violet span.dot{background-color:var(--palette-violet-50)}:host.color-gray span.dot{background-color:var(--palette-gray-50)}:host.white span.dot,:host[inverse] span.dot{background-color:var(--color-white)!important}@-webkit-keyframes jump{0%{transform:translateY(0)}30%{transform:translateY(0);opacity:1}45%{transform:translateY(-1.2em);opacity:.5}60%{transform:translateY(.8em);opacity:.95}to{transform:translateY(0);opacity:1}}@keyframes jump{0%{transform:translateY(0)}30%{transform:translateY(0);opacity:1}45%{transform:translateY(-1.2em);opacity:.5}60%{transform:translateY(.8em);opacity:.95}to{transform:translateY(0);opacity:1}}\n"] }]
        }], propDecorators: { theme: [{
                type: Input
            }], color: [{
                type: Input
            }], size: [{
                type: Input
            }], hb_class: [{
                type: HostBinding,
                args: ['class']
            }] } });
class NovoSpinnerElement {
    constructor() {
        this.size = 'medium';
    }
    /**
     * **deprecated** please use `color`.
     * @deprecated
     **/
    set theme(value) {
        console.warn(`'theme' property is deprecated, please use 'color'.`);
        this.color = value;
    }
    get theme() {
        return this.color;
    }
    get inverse() {
        return this._inverse;
    }
    set inverse(value) {
        this._inverse = coerceBooleanProperty(value);
    }
    get hb_class() {
        return [this.inverse ? 'color-white' : `color-${this.color}`, `size-${this.size}`].join(' ');
    }
}
NovoSpinnerElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSpinnerElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoSpinnerElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoSpinnerElement, selector: "novo-spinner", inputs: { theme: "theme", color: "color", size: "size", inverse: "inverse" }, host: { properties: { "class": "this.hb_class" } }, ngImport: i0, template: `
    <div class="dot1 dot"></div>
    <div class="dot2 dot"></div>
    <div class="dot3 dot"></div>
    <div class="dot4 dot"></div>
    <div class="dot5 dot"></div>
    <div class="dot6 dot"></div>
    <div class="dot7 dot"></div>
    <div class="dot8 dot"></div>
    <div class="dot9 dot"></div>
    <div class="dot10 dot"></div>
    <div class="dot11 dot"></div>
    <div class="dot12 dot"></div>
  `, isInline: true, styles: [":host{display:inline-block;width:1.8em;height:1.8em;position:relative}:host.size-small{width:1.2em;height:1.2em}:host.size-large{width:2.1em;height:2.1em}:host .dot{width:100%;height:100%;position:absolute;left:0;top:0}:host .dot:before{content:\"\";display:block;margin:0 auto;width:15%;height:15%;background-color:#333;border-radius:100%;-webkit-animation:dotFadeDelay 1.2s infinite ease-in-out both;animation:dotFadeDelay 1.2s infinite ease-in-out both}:host.person .dot:before{background-color:var(--color-person)}:host.company .dot:before{background-color:var(--color-company)}:host.candidate .dot:before{background-color:var(--color-candidate)}:host.lead .dot:before{background-color:var(--color-lead)}:host.contact .dot:before{background-color:var(--color-contact)}:host.clientcontact .dot:before{background-color:var(--color-clientcontact)}:host.opportunity .dot:before{background-color:var(--color-opportunity)}:host.job .dot:before{background-color:var(--color-job)}:host.joborder .dot:before{background-color:var(--color-joborder)}:host.submission .dot:before{background-color:var(--color-submission)}:host.sendout .dot:before{background-color:var(--color-sendout)}:host.placement .dot:before{background-color:var(--color-placement)}:host.note .dot:before{background-color:var(--color-note)}:host.task .dot:before{background-color:var(--color-task)}:host.distribution-list .dot:before{background-color:var(--color-distribution-list)}:host.credential .dot:before{background-color:var(--color-credential)}:host.user .dot:before{background-color:var(--color-user)}:host.corporate-user .dot:before{background-color:var(--color-corporate-user)}:host.contract .dot:before{background-color:var(--color-contract)}:host.job-code .dot:before{background-color:var(--color-job-code)}:host.earn-code .dot:before{background-color:var(--color-earn-code)}:host.billable-charge .dot:before{background-color:var(--color-billable-charge)}:host.payable-charge .dot:before{background-color:var(--color-payable-charge)}:host.invoice-statement .dot:before{background-color:var(--color-invoice-statement)}:host.selection .dot:before{background-color:var(--color-selection)}:host.positive .dot:before{background-color:var(--color-positive)}:host.success .dot:before{background-color:var(--color-success)}:host.warning .dot:before{background-color:var(--color-warning)}:host.error .dot:before{background-color:var(--color-error)}:host.info .dot:before{background-color:var(--color-info)}:host.disabled .dot:before{background-color:var(--color-disabled)}:host.red .dot:before{background-color:var(--palette-red-50)}:host.pink .dot:before{background-color:var(--palette-pink-50)}:host.orange .dot:before{background-color:var(--palette-orange-50)}:host.yellow .dot:before{background-color:var(--palette-yellow-50)}:host.green .dot:before{background-color:var(--palette-green-50)}:host.teal .dot:before{background-color:var(--palette-teal-50)}:host.blue .dot:before{background-color:var(--palette-blue-50)}:host.aqua .dot:before{background-color:var(--palette-aqua-50)}:host.indigo .dot:before{background-color:var(--palette-indigo-50)}:host.violet .dot:before{background-color:var(--palette-violet-50)}:host.gray .dot:before{background-color:var(--palette-gray-50)}:host.multicolor .dot:nth-of-type(1):before{background-color:var(--palette-red-50)}:host.multicolor .dot:nth-of-type(2):before{background-color:var(--palette-pink-50)}:host.multicolor .dot:nth-of-type(3):before{background-color:var(--palette-orange-50)}:host.multicolor .dot:nth-of-type(4):before{background-color:var(--palette-yellow-50)}:host.multicolor .dot:nth-of-type(5):before{background-color:var(--palette-green-50)}:host.multicolor .dot:nth-of-type(6):before{background-color:var(--palette-teal-50)}:host.multicolor .dot:nth-of-type(7):before{background-color:var(--palette-blue-50)}:host.multicolor .dot:nth-of-type(8):before{background-color:var(--palette-aqua-50)}:host.multicolor .dot:nth-of-type(9):before{background-color:var(--palette-indigo-50)}:host.multicolor .dot:nth-of-type(10):before{background-color:var(--palette-violet-50)}:host.multicolor .dot:nth-of-type(11):before{background-color:var(--palette-gray-50)}:host.white .dot:before,:host[inverse] .dot:before{background-color:var(--color-white)}:host .dot2{transform:rotate(30deg)}:host .dot3{transform:rotate(60deg)}:host .dot4{transform:rotate(90deg)}:host .dot5{transform:rotate(120deg)}:host .dot6{transform:rotate(150deg)}:host .dot7{transform:rotate(180deg)}:host .dot8{transform:rotate(210deg)}:host .dot9{transform:rotate(240deg)}:host .dot10{transform:rotate(270deg)}:host .dot11{transform:rotate(300deg)}:host .dot12{transform:rotate(330deg)}:host .dot2:before{-webkit-animation-delay:-1.1s;animation-delay:-1.1s}:host .dot3:before{-webkit-animation-delay:-1s;animation-delay:-1s}:host .dot4:before{-webkit-animation-delay:-.9s;animation-delay:-.9s}:host .dot5:before{-webkit-animation-delay:-.8s;animation-delay:-.8s}:host .dot6:before{-webkit-animation-delay:-.7s;animation-delay:-.7s}:host .dot7:before{-webkit-animation-delay:-.6s;animation-delay:-.6s}:host .dot8:before{-webkit-animation-delay:-.5s;animation-delay:-.5s}:host .dot9:before{-webkit-animation-delay:-.4s;animation-delay:-.4s}:host .dot10:before{-webkit-animation-delay:-.3s;animation-delay:-.3s}:host .dot11:before{-webkit-animation-delay:-.2s;animation-delay:-.2s}:host .dot12:before{-webkit-animation-delay:-.1s;animation-delay:-.1s}@-webkit-keyframes dotFadeDelay{0%,39%,to{opacity:0}40%{opacity:1}}@keyframes dotFadeDelay{0%,39%,to{opacity:0}40%{opacity:1}}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSpinnerElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-spinner', template: `
    <div class="dot1 dot"></div>
    <div class="dot2 dot"></div>
    <div class="dot3 dot"></div>
    <div class="dot4 dot"></div>
    <div class="dot5 dot"></div>
    <div class="dot6 dot"></div>
    <div class="dot7 dot"></div>
    <div class="dot8 dot"></div>
    <div class="dot9 dot"></div>
    <div class="dot10 dot"></div>
    <div class="dot11 dot"></div>
    <div class="dot12 dot"></div>
  `, styles: [":host{display:inline-block;width:1.8em;height:1.8em;position:relative}:host.size-small{width:1.2em;height:1.2em}:host.size-large{width:2.1em;height:2.1em}:host .dot{width:100%;height:100%;position:absolute;left:0;top:0}:host .dot:before{content:\"\";display:block;margin:0 auto;width:15%;height:15%;background-color:#333;border-radius:100%;-webkit-animation:dotFadeDelay 1.2s infinite ease-in-out both;animation:dotFadeDelay 1.2s infinite ease-in-out both}:host.person .dot:before{background-color:var(--color-person)}:host.company .dot:before{background-color:var(--color-company)}:host.candidate .dot:before{background-color:var(--color-candidate)}:host.lead .dot:before{background-color:var(--color-lead)}:host.contact .dot:before{background-color:var(--color-contact)}:host.clientcontact .dot:before{background-color:var(--color-clientcontact)}:host.opportunity .dot:before{background-color:var(--color-opportunity)}:host.job .dot:before{background-color:var(--color-job)}:host.joborder .dot:before{background-color:var(--color-joborder)}:host.submission .dot:before{background-color:var(--color-submission)}:host.sendout .dot:before{background-color:var(--color-sendout)}:host.placement .dot:before{background-color:var(--color-placement)}:host.note .dot:before{background-color:var(--color-note)}:host.task .dot:before{background-color:var(--color-task)}:host.distribution-list .dot:before{background-color:var(--color-distribution-list)}:host.credential .dot:before{background-color:var(--color-credential)}:host.user .dot:before{background-color:var(--color-user)}:host.corporate-user .dot:before{background-color:var(--color-corporate-user)}:host.contract .dot:before{background-color:var(--color-contract)}:host.job-code .dot:before{background-color:var(--color-job-code)}:host.earn-code .dot:before{background-color:var(--color-earn-code)}:host.billable-charge .dot:before{background-color:var(--color-billable-charge)}:host.payable-charge .dot:before{background-color:var(--color-payable-charge)}:host.invoice-statement .dot:before{background-color:var(--color-invoice-statement)}:host.selection .dot:before{background-color:var(--color-selection)}:host.positive .dot:before{background-color:var(--color-positive)}:host.success .dot:before{background-color:var(--color-success)}:host.warning .dot:before{background-color:var(--color-warning)}:host.error .dot:before{background-color:var(--color-error)}:host.info .dot:before{background-color:var(--color-info)}:host.disabled .dot:before{background-color:var(--color-disabled)}:host.red .dot:before{background-color:var(--palette-red-50)}:host.pink .dot:before{background-color:var(--palette-pink-50)}:host.orange .dot:before{background-color:var(--palette-orange-50)}:host.yellow .dot:before{background-color:var(--palette-yellow-50)}:host.green .dot:before{background-color:var(--palette-green-50)}:host.teal .dot:before{background-color:var(--palette-teal-50)}:host.blue .dot:before{background-color:var(--palette-blue-50)}:host.aqua .dot:before{background-color:var(--palette-aqua-50)}:host.indigo .dot:before{background-color:var(--palette-indigo-50)}:host.violet .dot:before{background-color:var(--palette-violet-50)}:host.gray .dot:before{background-color:var(--palette-gray-50)}:host.multicolor .dot:nth-of-type(1):before{background-color:var(--palette-red-50)}:host.multicolor .dot:nth-of-type(2):before{background-color:var(--palette-pink-50)}:host.multicolor .dot:nth-of-type(3):before{background-color:var(--palette-orange-50)}:host.multicolor .dot:nth-of-type(4):before{background-color:var(--palette-yellow-50)}:host.multicolor .dot:nth-of-type(5):before{background-color:var(--palette-green-50)}:host.multicolor .dot:nth-of-type(6):before{background-color:var(--palette-teal-50)}:host.multicolor .dot:nth-of-type(7):before{background-color:var(--palette-blue-50)}:host.multicolor .dot:nth-of-type(8):before{background-color:var(--palette-aqua-50)}:host.multicolor .dot:nth-of-type(9):before{background-color:var(--palette-indigo-50)}:host.multicolor .dot:nth-of-type(10):before{background-color:var(--palette-violet-50)}:host.multicolor .dot:nth-of-type(11):before{background-color:var(--palette-gray-50)}:host.white .dot:before,:host[inverse] .dot:before{background-color:var(--color-white)}:host .dot2{transform:rotate(30deg)}:host .dot3{transform:rotate(60deg)}:host .dot4{transform:rotate(90deg)}:host .dot5{transform:rotate(120deg)}:host .dot6{transform:rotate(150deg)}:host .dot7{transform:rotate(180deg)}:host .dot8{transform:rotate(210deg)}:host .dot9{transform:rotate(240deg)}:host .dot10{transform:rotate(270deg)}:host .dot11{transform:rotate(300deg)}:host .dot12{transform:rotate(330deg)}:host .dot2:before{-webkit-animation-delay:-1.1s;animation-delay:-1.1s}:host .dot3:before{-webkit-animation-delay:-1s;animation-delay:-1s}:host .dot4:before{-webkit-animation-delay:-.9s;animation-delay:-.9s}:host .dot5:before{-webkit-animation-delay:-.8s;animation-delay:-.8s}:host .dot6:before{-webkit-animation-delay:-.7s;animation-delay:-.7s}:host .dot7:before{-webkit-animation-delay:-.6s;animation-delay:-.6s}:host .dot8:before{-webkit-animation-delay:-.5s;animation-delay:-.5s}:host .dot9:before{-webkit-animation-delay:-.4s;animation-delay:-.4s}:host .dot10:before{-webkit-animation-delay:-.3s;animation-delay:-.3s}:host .dot11:before{-webkit-animation-delay:-.2s;animation-delay:-.2s}:host .dot12:before{-webkit-animation-delay:-.1s;animation-delay:-.1s}@-webkit-keyframes dotFadeDelay{0%,39%,to{opacity:0}40%{opacity:1}}@keyframes dotFadeDelay{0%,39%,to{opacity:0}40%{opacity:1}}\n"] }]
        }], propDecorators: { theme: [{
                type: Input
            }], color: [{
                type: Input
            }], size: [{
                type: Input
            }], inverse: [{
                type: Input
            }], hb_class: [{
                type: HostBinding,
                args: ['class']
            }] } });
class NovoSkeletonDirective {
    constructor() {
        this.skeleton = true;
    }
}
NovoSkeletonDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSkeletonDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NovoSkeletonDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoSkeletonDirective, selector: "[skeleton]", host: { properties: { "class.skeleton": "this.skeleton" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSkeletonDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[skeleton]',
                }]
        }], propDecorators: { skeleton: [{
                type: HostBinding,
                args: ['class.skeleton']
            }] } });
class NovoLoadedDirective {
}
NovoLoadedDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoLoadedDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NovoLoadedDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoLoadedDirective, selector: "[loaded]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoLoadedDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[loaded]',
                }]
        }] });
class NovoIsLoadingDirective {
    constructor(viewContainer) {
        this.viewContainer = viewContainer;
        this.hasView = false;
        this.skeletonViews = [];
        this.loadedViews = [];
    }
    set isLoading(condition) {
        if (!condition && !this.hasView) {
            this.destroyViews(this.loadedViews);
            this.skeletonViews = this.createViews(this.skeletonTemplates);
            this.hasView = true;
        }
        else if (condition && this.hasView) {
            this.destroyViews(this.skeletonViews);
            this.loadedViews = this.createViews(this.loadedTemplates);
            this.hasView = false;
        }
    }
    createViews(templates) {
        return templates && templates.map((v, i) => this.viewContainer.createEmbeddedView(v, null, i));
    }
    destroyViews(views) {
        if (views) {
            for (const view of views) {
                view.destroy();
            }
        }
    }
}
NovoIsLoadingDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoIsLoadingDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
NovoIsLoadingDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoIsLoadingDirective, selector: "[isLoading]", inputs: { isLoading: "isLoading" }, queries: [{ propertyName: "skeletonTemplates", predicate: NovoSkeletonDirective, read: TemplateRef }, { propertyName: "loadedTemplates", predicate: NovoLoadedDirective, read: TemplateRef }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoIsLoadingDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[isLoading]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; }, propDecorators: { skeletonTemplates: [{
                type: ContentChildren,
                args: [NovoSkeletonDirective, { read: TemplateRef }]
            }], loadedTemplates: [{
                type: ContentChildren,
                args: [NovoLoadedDirective, { read: TemplateRef }]
            }], isLoading: [{
                type: Input
            }] } });

// NG2
class NovoLoadingModule {
}
NovoLoadingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoLoadingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoLoadingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoLoadingModule, declarations: [NovoLoadingElement, NovoSpinnerElement, NovoIsLoadingDirective, NovoLoadedDirective, NovoSkeletonDirective], imports: [CommonModule], exports: [NovoLoadingElement, NovoSpinnerElement, NovoIsLoadingDirective, NovoLoadedDirective, NovoSkeletonDirective] });
NovoLoadingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoLoadingModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoLoadingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [NovoLoadingElement, NovoSpinnerElement, NovoIsLoadingDirective, NovoLoadedDirective, NovoSkeletonDirective],
                    exports: [NovoLoadingElement, NovoSpinnerElement, NovoIsLoadingDirective, NovoLoadedDirective, NovoSkeletonDirective],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoIsLoadingDirective, NovoLoadedDirective, NovoLoadingElement, NovoLoadingModule, NovoSkeletonDirective, NovoSpinnerElement };
//# sourceMappingURL=novo-elements-components-loading.mjs.map

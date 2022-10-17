import * as i0 from '@angular/core';
import { EventEmitter, Component, Input, Output, NgModule } from '@angular/core';
import * as i1 from 'novo-elements/services';
import * as i2 from '@angular/platform-browser';
import * as i3 from 'novo-elements/components/button';
import { NovoButtonModule } from 'novo-elements/components/button';
import * as i4 from '@angular/common';
import { CommonModule } from '@angular/common';

// NG2
class NovoTipWellElement {
    constructor(labels, sanitizer) {
        this.labels = labels;
        this.sanitizer = sanitizer;
        this.button = true;
        this.sanitize = true;
        this.confirmed = new EventEmitter();
        this.isActive = true;
        this.isActive = true;
        // Check if localStorage is enabled
        this.isLocalStorageEnabled = (() => {
            let isEnabled = false;
            if (typeof localStorage === 'object') {
                try {
                    localStorage.setItem('lsTest', '1');
                    localStorage.removeItem('lsTest');
                    isEnabled = true;
                }
                catch (e) {
                    console.warn('This web browser does not support storing settings locally. In Safari, the most common cause of this is using "Private Browsing Mode". Some settings may not save or some features may not work properly for you.');
                }
            }
            return isEnabled;
        })();
    }
    // Trusts the HTML in order to show CSS styles
    get tipWithStyles() {
        if (!this._tipWithStyles || this._lastTipStyled !== this.tip) {
            this._tipWithStyles = this.sanitizer.bypassSecurityTrustHtml(this.tip);
            this._lastTipStyled = this.tip;
        }
        return this._tipWithStyles;
    }
    ngOnInit() {
        this.tip = this.tip || '';
        this.buttonText = this.buttonText || this.labels.okGotIt;
        this.button = typeof this.button === 'string' ? this.button === 'true' : this.button;
        this.icon = this.icon || null;
        // Set a (semi) unique name for the tip-well
        this.name = this.name || Math.round(Math.random() * 100);
        this.localStorageKey = `novo-tw_${this.name}`;
        // Check localStorage for state
        if (this.isLocalStorageEnabled) {
            const storedValue = JSON.parse(localStorage.getItem(this.localStorageKey));
            this.isActive = storedValue !== false;
        }
    }
    hideTip() {
        if (this.isLocalStorageEnabled) {
            localStorage.setItem(this.localStorageKey, JSON.stringify(false));
        }
        this.isActive = false;
        this.confirmed.emit();
    }
}
NovoTipWellElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTipWellElement, deps: [{ token: i1.NovoLabelService }, { token: i2.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
NovoTipWellElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoTipWellElement, selector: "novo-tip-well", inputs: { name: "name", tip: "tip", buttonText: "buttonText", button: "button", icon: "icon", sanitize: "sanitize" }, outputs: { confirmed: "confirmed" }, host: { properties: { "class.active": "isActive" } }, ngImport: i0, template: `
    <div *ngIf="isActive">
      <div>
        <i class="bhi-{{ icon }}" *ngIf="icon" [attr.data-automation-id]="'novo-tip-well-icon-' + name"></i>
        <ng-content select="novo-icon"></ng-content>
        <p *ngIf="sanitize && tip.length" [attr.data-automation-id]="'novo-tip-well-tip-' + name">{{ tip }}</p>
        <p *ngIf="!sanitize && tipWithStyles" [attr.data-automation-id]="'novo-tip-well-tip-' + name" [innerHTML]="tipWithStyles"></p>
        <p [attr.data-automation-id]="'novo-tip-well-tip-' + name"><ng-content></ng-content></p>
      </div>
      <button theme="dialogue" size="small" (click)="hideTip()" *ngIf="button" [attr.data-automation-id]="'novo-tip-well-button-' + name">
        {{ buttonText }}
      </button>
    </div>
  `, isInline: true, styles: [":host.active{display:inline-block;margin-bottom:var(--spacing-md)}:host>div{display:inline-block;border-radius:.25rem;background-color:var(--color-background-secondary);color:var(--color-text);padding:var(--spacing-lg);text-align:right}:host>div>div{display:flex}:host>div>div>i{flex-shrink:0;text-align:center;margin-top:.3rem;margin-right:var(--spacing-md);color:#aaa}:host>div>div>p{display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;width:100%;padding:0;text-align:left;white-space:pre-line}:host>div>div>p.text-capitalize{text-transform:capitalize}:host>div>div>p.text-uppercase{text-transform:uppercase}:host>div>div>p.text-nowrap{white-space:nowrap}:host>div>div>p.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host>div>div>p.text-size-default{font-size:inherit}:host>div>div>p.text-size-body{font-size:var(--font-size-body)}:host>div>div>p.text-size-xs{font-size:var(--font-size-xs)}:host>div>div>p.text-size-sm{font-size:var(--font-size-sm)}:host>div>div>p.text-size-md{font-size:var(--font-size-md)}:host>div>div>p.text-size-lg{font-size:var(--font-size-lg)}:host>div>div>p.text-size-xl{font-size:var(--font-size-xl)}:host>div>div>p.text-size-2xl{font-size:var(--font-size-2xl)}:host>div>div>p.text-size-3xl{font-size:var(--font-size-3xl)}:host>div>div>p.text-size-smaller{font-size:.8em}:host>div>div>p.text-size-larger{font-size:1.2em}:host>div>div>p.text-color-person{color:var(--color-person)}:host>div>div>p.text-color-company{color:var(--color-company)}:host>div>div>p.text-color-candidate{color:var(--color-candidate)}:host>div>div>p.text-color-lead{color:var(--color-lead)}:host>div>div>p.text-color-contact{color:var(--color-contact)}:host>div>div>p.text-color-clientcontact{color:var(--color-clientcontact)}:host>div>div>p.text-color-opportunity{color:var(--color-opportunity)}:host>div>div>p.text-color-job{color:var(--color-job)}:host>div>div>p.text-color-joborder{color:var(--color-joborder)}:host>div>div>p.text-color-submission{color:var(--color-submission)}:host>div>div>p.text-color-sendout{color:var(--color-sendout)}:host>div>div>p.text-color-placement{color:var(--color-placement)}:host>div>div>p.text-color-note{color:var(--color-note)}:host>div>div>p.text-color-task{color:var(--color-task)}:host>div>div>p.text-color-distribution-list{color:var(--color-distribution-list)}:host>div>div>p.text-color-credential{color:var(--color-credential)}:host>div>div>p.text-color-user{color:var(--color-user)}:host>div>div>p.text-color-corporate-user{color:var(--color-corporate-user)}:host>div>div>p.text-color-contract{color:var(--color-contract)}:host>div>div>p.text-color-job-code{color:var(--color-job-code)}:host>div>div>p.text-color-earn-code{color:var(--color-earn-code)}:host>div>div>p.text-color-billable-charge{color:var(--color-billable-charge)}:host>div>div>p.text-color-payable-charge{color:var(--color-payable-charge)}:host>div>div>p.text-color-invoice-statement{color:var(--color-invoice-statement)}:host>div>div>p.text-color-selection{color:var(--color-selection)}:host>div>div>p.text-color-positive{color:var(--color-positive)}:host>div>div>p.text-color-success{color:var(--color-success)}:host>div>div>p.text-color-warning{color:var(--color-warning)}:host>div>div>p.text-color-error{color:var(--color-error)}:host>div>div>p.text-color-info{color:var(--color-info)}:host>div>div>p.text-color-disabled{color:var(--color-disabled)}:host>div>div>p.text-color-red{color:var(--palette-red-50)}:host>div>div>p.text-color-pink{color:var(--palette-pink-50)}:host>div>div>p.text-color-orange{color:var(--palette-orange-50)}:host>div>div>p.text-color-yellow{color:var(--palette-yellow-50)}:host>div>div>p.text-color-green{color:var(--palette-green-50)}:host>div>div>p.text-color-teal{color:var(--palette-teal-50)}:host>div>div>p.text-color-blue{color:var(--palette-blue-50)}:host>div>div>p.text-color-aqua{color:var(--palette-aqua-50)}:host>div>div>p.text-color-indigo{color:var(--palette-indigo-50)}:host>div>div>p.text-color-violet{color:var(--palette-violet-50)}:host>div>div>p.text-color-gray{color:var(--palette-gray-50)}:host>div>div>p.margin-before{margin-top:.4rem}:host>div>div>p.margin-after{margin-bottom:.8rem}:host>div>div>p.text-length-small{max-width:40ch}:host>div>div>p.text-length-medium{max-width:55ch}:host>div>div>p.text-length-large{max-width:70ch}:host>div>div>p.text-weight-hairline{font-weight:100}:host>div>div>p.text-weight-thin{font-weight:200}:host>div>div>p.text-weight-light{font-weight:300}:host>div>div>p.text-weight-normal{font-weight:400}:host>div>div>p.text-weight-medium{font-weight:500}:host>div>div>p.text-weight-semibold{font-weight:600}:host>div>div>p.text-weight-bold{font-weight:700}:host>div>div>p.text-weight-extrabold{font-weight:800}:host>div>div>p.text-weight-heavy{font-weight:900}:host>div>div>p.text-weight-lighter{font-weight:lighter}:host>div>div>p.text-weight-bolder{font-weight:bolder}:host>div>div p:empty{display:none}\n"], components: [{ type: i3.NovoButtonElement, selector: "novo-button,button[theme],button[basic],button[primary],button[outlined],button[icon],button[fab]", inputs: ["color", "side", "size", "theme", "variant", "loading", "icon", "basic", "primary", "outlined", "fab", "standard", "disabled"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTipWellElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-tip-well', template: `
    <div *ngIf="isActive">
      <div>
        <i class="bhi-{{ icon }}" *ngIf="icon" [attr.data-automation-id]="'novo-tip-well-icon-' + name"></i>
        <ng-content select="novo-icon"></ng-content>
        <p *ngIf="sanitize && tip.length" [attr.data-automation-id]="'novo-tip-well-tip-' + name">{{ tip }}</p>
        <p *ngIf="!sanitize && tipWithStyles" [attr.data-automation-id]="'novo-tip-well-tip-' + name" [innerHTML]="tipWithStyles"></p>
        <p [attr.data-automation-id]="'novo-tip-well-tip-' + name"><ng-content></ng-content></p>
      </div>
      <button theme="dialogue" size="small" (click)="hideTip()" *ngIf="button" [attr.data-automation-id]="'novo-tip-well-button-' + name">
        {{ buttonText }}
      </button>
    </div>
  `, host: {
                        '[class.active]': 'isActive',
                    }, styles: [":host.active{display:inline-block;margin-bottom:var(--spacing-md)}:host>div{display:inline-block;border-radius:.25rem;background-color:var(--color-background-secondary);color:var(--color-text);padding:var(--spacing-lg);text-align:right}:host>div>div{display:flex}:host>div>div>i{flex-shrink:0;text-align:center;margin-top:.3rem;margin-right:var(--spacing-md);color:#aaa}:host>div>div>p{display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;width:100%;padding:0;text-align:left;white-space:pre-line}:host>div>div>p.text-capitalize{text-transform:capitalize}:host>div>div>p.text-uppercase{text-transform:uppercase}:host>div>div>p.text-nowrap{white-space:nowrap}:host>div>div>p.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host>div>div>p.text-size-default{font-size:inherit}:host>div>div>p.text-size-body{font-size:var(--font-size-body)}:host>div>div>p.text-size-xs{font-size:var(--font-size-xs)}:host>div>div>p.text-size-sm{font-size:var(--font-size-sm)}:host>div>div>p.text-size-md{font-size:var(--font-size-md)}:host>div>div>p.text-size-lg{font-size:var(--font-size-lg)}:host>div>div>p.text-size-xl{font-size:var(--font-size-xl)}:host>div>div>p.text-size-2xl{font-size:var(--font-size-2xl)}:host>div>div>p.text-size-3xl{font-size:var(--font-size-3xl)}:host>div>div>p.text-size-smaller{font-size:.8em}:host>div>div>p.text-size-larger{font-size:1.2em}:host>div>div>p.text-color-person{color:var(--color-person)}:host>div>div>p.text-color-company{color:var(--color-company)}:host>div>div>p.text-color-candidate{color:var(--color-candidate)}:host>div>div>p.text-color-lead{color:var(--color-lead)}:host>div>div>p.text-color-contact{color:var(--color-contact)}:host>div>div>p.text-color-clientcontact{color:var(--color-clientcontact)}:host>div>div>p.text-color-opportunity{color:var(--color-opportunity)}:host>div>div>p.text-color-job{color:var(--color-job)}:host>div>div>p.text-color-joborder{color:var(--color-joborder)}:host>div>div>p.text-color-submission{color:var(--color-submission)}:host>div>div>p.text-color-sendout{color:var(--color-sendout)}:host>div>div>p.text-color-placement{color:var(--color-placement)}:host>div>div>p.text-color-note{color:var(--color-note)}:host>div>div>p.text-color-task{color:var(--color-task)}:host>div>div>p.text-color-distribution-list{color:var(--color-distribution-list)}:host>div>div>p.text-color-credential{color:var(--color-credential)}:host>div>div>p.text-color-user{color:var(--color-user)}:host>div>div>p.text-color-corporate-user{color:var(--color-corporate-user)}:host>div>div>p.text-color-contract{color:var(--color-contract)}:host>div>div>p.text-color-job-code{color:var(--color-job-code)}:host>div>div>p.text-color-earn-code{color:var(--color-earn-code)}:host>div>div>p.text-color-billable-charge{color:var(--color-billable-charge)}:host>div>div>p.text-color-payable-charge{color:var(--color-payable-charge)}:host>div>div>p.text-color-invoice-statement{color:var(--color-invoice-statement)}:host>div>div>p.text-color-selection{color:var(--color-selection)}:host>div>div>p.text-color-positive{color:var(--color-positive)}:host>div>div>p.text-color-success{color:var(--color-success)}:host>div>div>p.text-color-warning{color:var(--color-warning)}:host>div>div>p.text-color-error{color:var(--color-error)}:host>div>div>p.text-color-info{color:var(--color-info)}:host>div>div>p.text-color-disabled{color:var(--color-disabled)}:host>div>div>p.text-color-red{color:var(--palette-red-50)}:host>div>div>p.text-color-pink{color:var(--palette-pink-50)}:host>div>div>p.text-color-orange{color:var(--palette-orange-50)}:host>div>div>p.text-color-yellow{color:var(--palette-yellow-50)}:host>div>div>p.text-color-green{color:var(--palette-green-50)}:host>div>div>p.text-color-teal{color:var(--palette-teal-50)}:host>div>div>p.text-color-blue{color:var(--palette-blue-50)}:host>div>div>p.text-color-aqua{color:var(--palette-aqua-50)}:host>div>div>p.text-color-indigo{color:var(--palette-indigo-50)}:host>div>div>p.text-color-violet{color:var(--palette-violet-50)}:host>div>div>p.text-color-gray{color:var(--palette-gray-50)}:host>div>div>p.margin-before{margin-top:.4rem}:host>div>div>p.margin-after{margin-bottom:.8rem}:host>div>div>p.text-length-small{max-width:40ch}:host>div>div>p.text-length-medium{max-width:55ch}:host>div>div>p.text-length-large{max-width:70ch}:host>div>div>p.text-weight-hairline{font-weight:100}:host>div>div>p.text-weight-thin{font-weight:200}:host>div>div>p.text-weight-light{font-weight:300}:host>div>div>p.text-weight-normal{font-weight:400}:host>div>div>p.text-weight-medium{font-weight:500}:host>div>div>p.text-weight-semibold{font-weight:600}:host>div>div>p.text-weight-bold{font-weight:700}:host>div>div>p.text-weight-extrabold{font-weight:800}:host>div>div>p.text-weight-heavy{font-weight:900}:host>div>div>p.text-weight-lighter{font-weight:lighter}:host>div>div>p.text-weight-bolder{font-weight:bolder}:host>div>div p:empty{display:none}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NovoLabelService }, { type: i2.DomSanitizer }]; }, propDecorators: { name: [{
                type: Input
            }], tip: [{
                type: Input
            }], buttonText: [{
                type: Input
            }], button: [{
                type: Input
            }], icon: [{
                type: Input
            }], sanitize: [{
                type: Input
            }], confirmed: [{
                type: Output
            }] } });

// NG2
class NovoTipWellModule {
}
NovoTipWellModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTipWellModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoTipWellModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTipWellModule, declarations: [NovoTipWellElement], imports: [CommonModule, NovoButtonModule], exports: [NovoTipWellElement] });
NovoTipWellModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTipWellModule, imports: [[CommonModule, NovoButtonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTipWellModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NovoButtonModule],
                    declarations: [NovoTipWellElement],
                    exports: [NovoTipWellElement],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoTipWellElement, NovoTipWellModule };
//# sourceMappingURL=novo-elements-components-tip-well.mjs.map

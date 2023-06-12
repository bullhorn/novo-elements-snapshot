import * as i0 from '@angular/core';
import { EventEmitter, Component, Input, Output, NgModule } from '@angular/core';
import * as i1 from 'novo-elements/services';
import * as i2 from '@angular/platform-browser';
import * as i3 from 'novo-elements/elements/button';
import { NovoButtonModule } from 'novo-elements/elements/button';
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
  `, isInline: true, components: [{ type: i3.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTipWellElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-tip-well',
                    template: `
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
  `,
                    host: {
                        '[class.active]': 'isActive',
                    },
                }]
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
//# sourceMappingURL=novo-elements-elements-tip-well.mjs.map

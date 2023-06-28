import * as i0 from '@angular/core';
import { EventEmitter, Component, Input, Output, NgModule, Injectable } from '@angular/core';
import { Deferred } from 'novo-elements/utils';
import * as i1 from '@angular/platform-browser';
import * as i2 from 'novo-elements/elements/button';
import { NovoButtonModule } from 'novo-elements/elements/button';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i1$1 from 'novo-elements/services';

// NG2
class NovoToastElement {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.appearance = 'banner';
        this.theme = 'danger';
        this.icon = 'caution';
        this.hasDialogue = false;
        this.isCloseable = false;
        this.closed = new EventEmitter();
        this.show = false;
        this.animate = false;
        this.parent = null;
        this.launched = false;
        this.onActionPromise = Deferred();
    }
    set message(m) {
        this._message = this.sanitizer.bypassSecurityTrustHtml(m);
    }
    ngOnInit() {
        if (!this.launched) {
            // clear position and time
            this.position = null;
            this.time = null;
            // set icon and styling
            this.iconClass = `bhi-${this.icon}`;
            this.alertTheme = `${this.theme} toast-container embedded`;
            if (this.hasDialogue) {
                this.alertTheme += ' dialogue';
            }
        }
    }
    ngOnChanges(changes) {
        // set icon and styling
        this.iconClass = `bhi-${this.icon}`;
        this.alertTheme = `${this.theme} toast-container embedded`;
        if (this.hasDialogue) {
            this.alertTheme += ' dialogue';
        }
    }
    clickHandler(event) {
        if (!this.isCloseable) {
            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }
            if (this.parent) {
                this.parent.hide(this);
            }
            else {
                this.closed.emit({ closed: true });
            }
        }
    }
    close(event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        if (this.parent) {
            this.parent.hide(this);
        }
        else {
            this.closed.emit({ closed: true });
        }
    }
    actionHandler(event) {
        this.onActionPromise.resolve(event);
    }
    onAction(fn) {
        return this.onActionPromise.then(fn);
    }
}
NovoToastElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoToastElement, deps: [{ token: i1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
NovoToastElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoToastElement, selector: "novo-toast", inputs: { appearance: "appearance", theme: "theme", icon: "icon", title: "title", action: "action", hasDialogue: "hasDialogue", link: "link", isCloseable: "isCloseable", message: "message" }, outputs: { closed: "closed" }, host: { listeners: { "click": "!isCloseable && clickHandler($event)" }, properties: { "class": "alertTheme", "class.growl": "appearance == \"growl\"", "class.banner": "appearance == \"banner\"", "class.show": "show", "class.animate": "animate", "class.embedded": "embedded", "attr.theme": "theme" } }, usesOnChanges: true, ngImport: i0, template: `
    <div class="toast-icon">
      <i [ngClass]="iconClass"></i>
    </div>
    <div class="toast-content">
      <h5 *ngIf="title">{{ title }}</h5>
      <p *ngIf="_message" [class.message-only]="!title" [innerHtml]="_message"></p>
      <div *ngIf="link" class="link-generated">
        <input type="text" [value]="link" onfocus="this.select();" />
      </div>
      <div class="dialogue">
        <ng-content></ng-content>
      </div>
      <div *ngIf="action" class="action">
        <button theme="dialogue" color="white" (click)="actionHandler($event)">{{ action }}</button>
      </div>
    </div>
    <div class="close-icon" *ngIf="isCloseable" (click)="close($event)">
      <i class="bhi-times"></i>
    </div>
  `, isInline: true, components: [{ type: i2.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }], directives: [{ type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoToastElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-toast',
                    host: {
                        '[class]': 'alertTheme',
                        '[class.growl]': 'appearance == "growl"',
                        '[class.banner]': 'appearance == "banner"',
                        '[class.show]': 'show',
                        '[class.animate]': 'animate',
                        '[class.embedded]': 'embedded',
                        '[attr.theme]': 'theme',
                        '(click)': '!isCloseable && clickHandler($event)',
                    },
                    template: `
    <div class="toast-icon">
      <i [ngClass]="iconClass"></i>
    </div>
    <div class="toast-content">
      <h5 *ngIf="title">{{ title }}</h5>
      <p *ngIf="_message" [class.message-only]="!title" [innerHtml]="_message"></p>
      <div *ngIf="link" class="link-generated">
        <input type="text" [value]="link" onfocus="this.select();" />
      </div>
      <div class="dialogue">
        <ng-content></ng-content>
      </div>
      <div *ngIf="action" class="action">
        <button theme="dialogue" color="white" (click)="actionHandler($event)">{{ action }}</button>
      </div>
    </div>
    <div class="close-icon" *ngIf="isCloseable" (click)="close($event)">
      <i class="bhi-times"></i>
    </div>
  `,
                }]
        }], ctorParameters: function () { return [{ type: i1.DomSanitizer }]; }, propDecorators: { appearance: [{
                type: Input
            }], theme: [{
                type: Input
            }], icon: [{
                type: Input
            }], title: [{
                type: Input
            }], action: [{
                type: Input
            }], hasDialogue: [{
                type: Input
            }], link: [{
                type: Input
            }], isCloseable: [{
                type: Input
            }], message: [{
                type: Input
            }], closed: [{
                type: Output
            }] } });

// NG2
class NovoToastModule {
}
NovoToastModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoToastModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoToastModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoToastModule, declarations: [NovoToastElement], imports: [CommonModule, NovoButtonModule], exports: [NovoToastElement] });
NovoToastModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoToastModule, imports: [[CommonModule, NovoButtonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoToastModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NovoButtonModule],
                    declarations: [NovoToastElement],
                    exports: [NovoToastElement],
                }]
        }] });

// NG2
class NovoToastService {
    constructor(componentUtils) {
        this.componentUtils = componentUtils;
        this.references = [];
        this.icons = { default: 'bell', success: 'check', info: 'info', warning: 'warning', danger: 'remove' };
        this.defaults = { hideDelay: 3500, position: 'growlTopRight', theme: 'default' };
    }
    set parentViewContainer(view) {
        this._parentViewContainer = view;
    }
    alert(options, toastElement = NovoToastElement) {
        return new Promise((resolve) => {
            if (!this._parentViewContainer) {
                console.error('No parent view container specified for the ToastService. Set it inside your main application. \nthis.toastService.parentViewContainer = view (ViewContainerRef)');
                return;
            }
            const toast = this.componentUtils.append(toastElement, this._parentViewContainer);
            this.references.push(toast);
            this.handleAlert(toast.instance, options);
            resolve(toast.instance);
        });
    }
    isVisible(toast) {
        return toast.show;
    }
    hide(toast) {
        toast.animate = false;
        setTimeout(() => {
            toast.show = false;
            const REF = this.references.filter((x) => x.instance === toast)[0];
            if (REF) {
                this.references.splice(this.references.indexOf(REF), 1);
                REF.destroy();
            }
        }, 300);
    }
    handleAlert(toast, options) {
        this.setToastOnSession(toast, options);
        setTimeout(() => {
            this.show(toast);
        }, 20);
        if (!toast.isCloseable) {
            this.toastTimer(toast);
        }
    }
    setToastOnSession(toast, opts) {
        const OPTIONS = typeof opts === 'object' ? opts : {};
        toast.parent = this;
        toast.title = OPTIONS.title || '';
        toast.message = OPTIONS.message || '';
        toast.action = OPTIONS.action || null;
        toast.hideDelay = OPTIONS.hideDelay || this.defaults.hideDelay;
        toast.link = OPTIONS.link || '';
        toast.isCloseable = OPTIONS.isCloseable || false;
        const CUSTOM_CLASS = OPTIONS.customClass || '';
        const ALERT_STYLE = OPTIONS.accent ? `novo-accent-${OPTIONS.accent}` : OPTIONS.theme || this.defaults.theme;
        const ALERT_POSITION = OPTIONS.position || this.defaults.position;
        const ALERT_ICON = OPTIONS.icon || this.icons.default;
        toast.iconClass = `bhi-${ALERT_ICON}`;
        toast.launched = true;
        toast.alertTheme = `${ALERT_STYLE} ${ALERT_POSITION} ${CUSTOM_CLASS} toast-container launched`;
    }
    show(toast) {
        toast.show = true;
        setTimeout(addClass, 25);
        /**
         * Adds animate class to be called after a timeout
         **/
        function addClass() {
            toast.animate = true;
        }
    }
    toastTimer(toast) {
        if (toast.hideDelay < 0) {
            return;
        }
        setTimeout(() => {
            this.hide(toast);
        }, toast.hideDelay);
    }
}
NovoToastService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoToastService, deps: [{ token: i1$1.ComponentUtils }], target: i0.ɵɵFactoryTarget.Injectable });
NovoToastService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoToastService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoToastService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.ComponentUtils }]; } });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoToastElement, NovoToastModule, NovoToastService };
//# sourceMappingURL=novo-elements-elements-toast.mjs.map

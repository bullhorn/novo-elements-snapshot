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
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoLoadingElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-loading',
                    template: `
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  `,
                }]
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
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSpinnerElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-spinner',
                    template: `
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
  `,
                }]
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
//# sourceMappingURL=novo-elements-elements-loading.mjs.map

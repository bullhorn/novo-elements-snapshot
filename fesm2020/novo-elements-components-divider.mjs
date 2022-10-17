import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from '@angular/core';
import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, NgModule } from '@angular/core';

class NovoDividerComponent {
    constructor() {
        this._vertical = false;
        this._inset = false;
    }
    /** Whether the divider is vertically aligned. */
    get vertical() {
        return this._vertical;
    }
    set vertical(value) {
        this._vertical = coerceBooleanProperty(value);
    }
    /** Whether the divider is an inset divider. */
    get inset() {
        return this._inset;
    }
    set inset(value) {
        this._inset = coerceBooleanProperty(value);
    }
}
NovoDividerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDividerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoDividerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDividerComponent, selector: "novo-divider", inputs: { vertical: "vertical", inset: "inset" }, host: { attributes: { "role": "separator" }, properties: { "attr.aria-orientation": "vertical ? \"vertical\" : \"horizontal\"", "class.novo-divider-vertical": "vertical", "class.novo-divider-horizontal": "!vertical", "class.novo-divider-inset": "inset" }, classAttribute: "novo-divider" }, ngImport: i0, template: '', isInline: true, styles: [".novo-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid;border-top-color:var(--color-border)}.novo-divider.novo-divider-vertical{display:inline;border-top:0;border-right-width:1px;border-right-style:solid;border-right-color:var(--color-border);margin-left:var(--spacing-md);margin-right:var(--spacing-md)}.novo-divider.novo-divider-inset{margin-left:80px}[dir=rtl] .novo-divider.novo-divider-inset{margin-left:auto;margin-right:80px}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDividerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'novo-divider', host: {
                        role: 'separator',
                        '[attr.aria-orientation]': 'vertical ? "vertical" : "horizontal"',
                        '[class.novo-divider-vertical]': 'vertical',
                        '[class.novo-divider-horizontal]': '!vertical',
                        '[class.novo-divider-inset]': 'inset',
                        class: 'novo-divider',
                    }, template: '', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".novo-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid;border-top-color:var(--color-border)}.novo-divider.novo-divider-vertical{display:inline;border-top:0;border-right-width:1px;border-right-style:solid;border-right-color:var(--color-border);margin-left:var(--spacing-md);margin-right:var(--spacing-md)}.novo-divider.novo-divider-inset{margin-left:80px}[dir=rtl] .novo-divider.novo-divider-inset{margin-left:auto;margin-right:80px}\n"] }]
        }], propDecorators: { vertical: [{
                type: Input
            }], inset: [{
                type: Input
            }] } });

class NovoDividerModule {
}
NovoDividerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDividerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoDividerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDividerModule, declarations: [NovoDividerComponent], exports: [NovoDividerComponent] });
NovoDividerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDividerModule, imports: [[]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDividerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [],
                    exports: [NovoDividerComponent],
                    declarations: [NovoDividerComponent],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoDividerComponent, NovoDividerModule };
//# sourceMappingURL=novo-elements-components-divider.mjs.map

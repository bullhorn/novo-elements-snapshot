import * as i0 from '@angular/core';
import { Component, Input, HostBinding, NgModule } from '@angular/core';
import { BooleanInput } from 'novo-elements/utils';
import * as i1 from 'novo-elements/elements/button';
import { NovoButtonModule } from 'novo-elements/elements/button';
import * as i2 from 'novo-elements/elements/common';
import { NovoCommonModule } from 'novo-elements/elements/common';
import * as i3 from 'novo-elements/elements/icon';
import { NovoIconModule } from 'novo-elements/elements/icon';
import * as i4 from '@angular/common';
import { CommonModule } from '@angular/common';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
class NovoHeaderSpacer {
}
NovoHeaderSpacer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoHeaderSpacer, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoHeaderSpacer.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoHeaderSpacer, selector: "header-spacer", ngImport: i0, template: `<ng-content></ng-content>`, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoHeaderSpacer, decorators: [{
            type: Component,
            args: [{
                    selector: 'header-spacer',
                    template: `<ng-content></ng-content>`,
                }]
        }] });
class NovoUtilsComponent {
}
NovoUtilsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoUtilsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoUtilsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoUtilsComponent, selector: "utils", ngImport: i0, template: `<ng-content></ng-content>`, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoUtilsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'utils',
                    template: `<ng-content></ng-content>`,
                }]
        }] });
class NovoUtilActionComponent {
}
NovoUtilActionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoUtilActionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoUtilActionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoUtilActionComponent, selector: "util-action, novo-action", inputs: { icon: "icon", size: "size", inverse: "inverse", disabled: "disabled" }, host: { classAttribute: "novo-action" }, ngImport: i0, template: `
    <novo-button theme="icon" [icon]="icon" [size]="size" [attr.inverse]="inverse" [disabled]="disabled">
      <ng-content></ng-content>
    </novo-button>
  `, isInline: true, components: [{ type: i1.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }], directives: [{ type: i2.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoUtilActionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'util-action, novo-action',
                    template: `
    <novo-button theme="icon" [icon]="icon" [size]="size" [attr.inverse]="inverse" [disabled]="disabled">
      <ng-content></ng-content>
    </novo-button>
  `,
                    host: {
                        class: 'novo-action',
                    },
                }]
        }], propDecorators: { icon: [{
                type: Input
            }], size: [{
                type: Input
            }], inverse: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });
class NovoHeaderComponent {
    constructor() {
        this.role = 'heading';
        this.headerClass = 'novo-header';
        this.condensed = false;
        this.inverse = 'inverse';
    }
    get hb_isSizeSmall() {
        return this.size === 'small';
    }
    get hb_isSizeLarge() {
        return this.size === 'large';
    }
    get hb_isSizeDefault() {
        return !['small', 'large'].includes(this.size);
    }
    set theme(theme) {
        this._theme = theme;
        this.inverse = theme === 'white' || theme === 'off-white' || theme === 'light' ? undefined : 'inverse';
    }
    get theme() {
        return this._theme;
    }
}
NovoHeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoHeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoHeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoHeaderComponent, selector: "novo-header,header[theme],header[accent]", inputs: { condensed: "condensed", title: "title", subTitle: "subTitle", icon: "icon", size: "size", theme: "theme" }, host: { properties: { "attr.role": "this.role", "class": "this.headerClass", "class.condensed": "this.condensed", "class.header-size-small": "this.hb_isSizeSmall", "class.header-size-large": "this.hb_isSizeLarge", "class.header-size-default": "this.hb_isSizeDefault", "attr.theme": "this.theme" } }, ngImport: i0, template: `
    <section>
      <div class="header-title">
        <ng-content select="[prefix]"></ng-content>
        <ng-container *ngIf="title">
          <novo-icon class="header-icon" *ngIf="icon">{{ icon }}</novo-icon>
          <div class="header-titles">
            <novo-title size="xl">{{ title }}</novo-title>
            <novo-title size="md" *ngIf="subTitle">{{ subTitle }}</novo-title>
          </div>
        </ng-container>
        <ng-container *ngIf="!title">
          <ng-content select="novo-icon, [novo-icon]"></ng-content>
          <div class="header-titles">
            <ng-content select="h1, h2, h3, h4, h5, h6, small, novo-title, [novo-title], [novo-subtitle]"></ng-content>
          </div>
        </ng-container>
      </div>
      <ng-content select="section"></ng-content>
      <span class="spacer"></span>
      <div class="header-actions">
        <ng-content select="novo-action,[novo-action]"></ng-content>
      </div>
      <ng-content select="utils"></ng-content>
      <ng-content select="[suffix]"></ng-content>
    </section>
    <ng-content></ng-content>
  `, isInline: true, components: [{ type: i3.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { type: i2.NovoTitle, selector: "novo-title,[novo-title]" }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoHeaderComponent.prototype, "condensed", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoHeaderComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-header,header[theme],header[accent]',
                    template: `
    <section>
      <div class="header-title">
        <ng-content select="[prefix]"></ng-content>
        <ng-container *ngIf="title">
          <novo-icon class="header-icon" *ngIf="icon">{{ icon }}</novo-icon>
          <div class="header-titles">
            <novo-title size="xl">{{ title }}</novo-title>
            <novo-title size="md" *ngIf="subTitle">{{ subTitle }}</novo-title>
          </div>
        </ng-container>
        <ng-container *ngIf="!title">
          <ng-content select="novo-icon, [novo-icon]"></ng-content>
          <div class="header-titles">
            <ng-content select="h1, h2, h3, h4, h5, h6, small, novo-title, [novo-title], [novo-subtitle]"></ng-content>
          </div>
        </ng-container>
      </div>
      <ng-content select="section"></ng-content>
      <span class="spacer"></span>
      <div class="header-actions">
        <ng-content select="novo-action,[novo-action]"></ng-content>
      </div>
      <ng-content select="utils"></ng-content>
      <ng-content select="[suffix]"></ng-content>
    </section>
    <ng-content></ng-content>
  `,
                }]
        }], propDecorators: { role: [{
                type: HostBinding,
                args: ['attr.role']
            }], headerClass: [{
                type: HostBinding,
                args: ['class']
            }], condensed: [{
                type: HostBinding,
                args: ['class.condensed']
            }, {
                type: Input
            }], title: [{
                type: Input
            }], subTitle: [{
                type: Input
            }], icon: [{
                type: Input
            }], size: [{
                type: Input
            }], hb_isSizeSmall: [{
                type: HostBinding,
                args: ['class.header-size-small']
            }], hb_isSizeLarge: [{
                type: HostBinding,
                args: ['class.header-size-large']
            }], hb_isSizeDefault: [{
                type: HostBinding,
                args: ['class.header-size-default']
            }], theme: [{
                type: HostBinding,
                args: ['attr.theme']
            }, {
                type: Input
            }] } });

class NovoHeaderModule {
}
NovoHeaderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoHeaderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoHeaderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoHeaderModule, declarations: [NovoHeaderComponent, NovoUtilActionComponent, NovoUtilsComponent, NovoHeaderSpacer], imports: [CommonModule, NovoCommonModule, NovoIconModule, NovoButtonModule], exports: [NovoHeaderComponent, NovoUtilActionComponent, NovoUtilsComponent, NovoHeaderSpacer] });
NovoHeaderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoHeaderModule, imports: [[CommonModule, NovoCommonModule, NovoIconModule, NovoButtonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoHeaderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NovoCommonModule, NovoIconModule, NovoButtonModule],
                    declarations: [NovoHeaderComponent, NovoUtilActionComponent, NovoUtilsComponent, NovoHeaderSpacer],
                    exports: [NovoHeaderComponent, NovoUtilActionComponent, NovoUtilsComponent, NovoHeaderSpacer],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoHeaderComponent, NovoHeaderModule, NovoHeaderSpacer, NovoUtilActionComponent, NovoUtilsComponent };
//# sourceMappingURL=novo-elements-elements-header.mjs.map

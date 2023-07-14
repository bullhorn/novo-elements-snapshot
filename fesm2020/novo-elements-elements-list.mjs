import * as i0 from '@angular/core';
import { Component, Input, ContentChild, NgModule } from '@angular/core';
import * as i1 from 'novo-elements/elements/icon';
import { NovoIconModule } from 'novo-elements/elements/icon';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from 'novo-elements/elements/common';
import { NovoCommonModule } from 'novo-elements/elements/common';

// NG2
class NovoListElement {
    constructor(element) {
        this.element = element;
    }
}
NovoListElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoListElement, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
NovoListElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoListElement, selector: "novo-list", inputs: { theme: "theme", direction: "direction" }, host: { properties: { "class.vertical-list": "direction === \"vertical\"", "class.horizontal-list": "direction === \"horizontal\"", "attr.theme": "theme" }, classAttribute: "novo-list" }, ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoListElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-list',
                    host: {
                        class: 'novo-list',
                        '[class.vertical-list]': 'direction === "vertical"',
                        '[class.horizontal-list]': 'direction === "horizontal"',
                        '[attr.theme]': 'theme',
                    },
                    template: ` <ng-content></ng-content> `,
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { theme: [{
                type: Input
            }], direction: [{
                type: Input
            }] } });
class NovoItemAvatarElement {
}
NovoItemAvatarElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoItemAvatarElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoItemAvatarElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoItemAvatarElement, selector: "item-avatar, novo-item-avatar", inputs: { icon: "icon", color: "color" }, host: { classAttribute: "novo-item-avatar" }, ngImport: i0, template: ` <novo-icon *ngIf="icon" [color]="color || icon">{{ icon }}</novo-icon> `, isInline: true, components: [{ type: i1.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoItemAvatarElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'item-avatar, novo-item-avatar',
                    template: ` <novo-icon *ngIf="icon" [color]="color || icon">{{ icon }}</novo-icon> `,
                    host: {
                        class: 'novo-item-avatar',
                    },
                }]
        }], propDecorators: { icon: [{
                type: Input
            }], color: [{
                type: Input
            }] } });
class NovoItemTitleElement {
}
NovoItemTitleElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoItemTitleElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoItemTitleElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoItemTitleElement, selector: "item-title, novo-item-title", host: { classAttribute: "novo-item-title" }, ngImport: i0, template: `<ng-content></ng-content>`, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoItemTitleElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'item-title, novo-item-title',
                    template: `<ng-content></ng-content>`,
                    host: {
                        class: 'novo-item-title',
                    },
                }]
        }] });
class NovoItemHeaderElement {
}
NovoItemHeaderElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoItemHeaderElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoItemHeaderElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoItemHeaderElement, selector: "item-header, novo-item-header", host: { classAttribute: "novo-item-header" }, ngImport: i0, template: `
    <novo-title class="novo-item-header-container" size="md">
      <ng-content select="item-avatar, novo-item-avatar"></ng-content>
      <ng-content select="item-title, novo-item-title"></ng-content>
      <ng-content select="item-header-end, novo-item-header-end"></ng-content>
    </novo-title>
  `, isInline: true, components: [{ type: i3.NovoTitle, selector: "novo-title,[novo-title]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoItemHeaderElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'item-header, novo-item-header',
                    template: `
    <novo-title class="novo-item-header-container" size="md">
      <ng-content select="item-avatar, novo-item-avatar"></ng-content>
      <ng-content select="item-title, novo-item-title"></ng-content>
      <ng-content select="item-header-end, novo-item-header-end"></ng-content>
    </novo-title>
  `,
                    host: {
                        class: 'novo-item-header',
                    },
                }]
        }] });
class NovoItemDateElement {
}
NovoItemDateElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoItemDateElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoItemDateElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoItemDateElement, selector: "item-header-end, novo-item-header-end", host: { classAttribute: "novo-item-header-end" }, ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoItemDateElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'item-header-end, novo-item-header-end',
                    template: ` <ng-content></ng-content> `,
                    host: {
                        class: 'novo-item-header-end',
                    },
                }]
        }] });
class NovoItemContentElement {
}
NovoItemContentElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoItemContentElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoItemContentElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoItemContentElement, selector: "item-content, novo-item-content", inputs: { direction: "direction" }, host: { properties: { "class.vertical-list": "direction === \"vertical\"", "class.horizontal-list": "direction === \"horizontal\"" }, classAttribute: "novo-item-content" }, ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoItemContentElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'item-content, novo-item-content',
                    host: {
                        class: 'novo-item-content',
                        '[class.vertical-list]': 'direction === "vertical"',
                        '[class.horizontal-list]': 'direction === "horizontal"',
                    },
                    template: ` <ng-content></ng-content> `,
                }]
        }], propDecorators: { direction: [{
                type: Input
            }] } });
class NovoItemEndElement {
}
NovoItemEndElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoItemEndElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoItemEndElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoItemEndElement, selector: "item-end, novo-item-end", host: { classAttribute: "novo-item-end" }, ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoItemEndElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'item-end, novo-item-end',
                    template: ` <ng-content></ng-content> `,
                    host: {
                        class: 'novo-item-end',
                    },
                }]
        }] });
class NovoListItemElement {
    constructor(element) {
        this.element = element;
        this.avatar = false;
    }
    ngOnInit() {
        this.avatar = !!this.element.nativeElement.querySelector('item-avatar');
    }
}
NovoListItemElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoListItemElement, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
NovoListItemElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoListItemElement, selector: "novo-list-item, a[list-item], button[list-item]", host: { classAttribute: "novo-list-item" }, queries: [{ propertyName: "_content", first: true, predicate: NovoItemContentElement, descendants: true }, { propertyName: "_header", first: true, predicate: NovoItemHeaderElement, descendants: true }], ngImport: i0, template: `
    <div class="list-item" [ngClass]="{ avatar: avatar }" *ngIf="_content || _header">
      <ng-content select="item-header, novo-item-header"></ng-content>
      <ng-content select="item-content, novo-item-content"></ng-content>
    </div>
    <ng-content></ng-content>
    <ng-content select="item-end, novo-item-end"></ng-content>
  `, isInline: true, directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoListItemElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-list-item, a[list-item], button[list-item]',
                    template: `
    <div class="list-item" [ngClass]="{ avatar: avatar }" *ngIf="_content || _header">
      <ng-content select="item-header, novo-item-header"></ng-content>
      <ng-content select="item-content, novo-item-content"></ng-content>
    </div>
    <ng-content></ng-content>
    <ng-content select="item-end, novo-item-end"></ng-content>
  `,
                    host: {
                        class: 'novo-list-item',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { _content: [{
                type: ContentChild,
                args: [NovoItemContentElement]
            }], _header: [{
                type: ContentChild,
                args: [NovoItemHeaderElement]
            }] } });

// NG2
class NovoListModule {
}
NovoListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoListModule, declarations: [NovoListElement,
        NovoListItemElement,
        NovoItemAvatarElement,
        NovoItemTitleElement,
        NovoItemContentElement,
        NovoItemEndElement,
        NovoItemHeaderElement,
        NovoItemDateElement], imports: [CommonModule, NovoCommonModule, NovoIconModule], exports: [NovoListElement,
        NovoListItemElement,
        NovoItemAvatarElement,
        NovoItemTitleElement,
        NovoItemHeaderElement,
        NovoItemContentElement,
        NovoItemEndElement,
        NovoItemDateElement] });
NovoListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoListModule, imports: [[CommonModule, NovoCommonModule, NovoIconModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NovoCommonModule, NovoIconModule],
                    declarations: [
                        NovoListElement,
                        NovoListItemElement,
                        NovoItemAvatarElement,
                        NovoItemTitleElement,
                        NovoItemContentElement,
                        NovoItemEndElement,
                        NovoItemHeaderElement,
                        NovoItemDateElement,
                    ],
                    exports: [
                        NovoListElement,
                        NovoListItemElement,
                        NovoItemAvatarElement,
                        NovoItemTitleElement,
                        NovoItemHeaderElement,
                        NovoItemContentElement,
                        NovoItemEndElement,
                        NovoItemDateElement,
                    ],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoItemAvatarElement, NovoItemContentElement, NovoItemDateElement, NovoItemEndElement, NovoItemHeaderElement, NovoItemTitleElement, NovoListElement, NovoListItemElement, NovoListModule };
//# sourceMappingURL=novo-elements-elements-list.mjs.map

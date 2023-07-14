import * as i0 from '@angular/core';
import { Component, Directive, Input, EventEmitter, HostBinding, Output, NgModule } from '@angular/core';
import * as i1 from 'novo-elements/services';
import { BooleanInput } from 'novo-elements/utils';
import * as i2 from 'novo-elements/elements/loading';
import { NovoLoadingModule } from 'novo-elements/elements/loading';
import * as i3 from 'novo-elements/elements/icon';
import { NovoIconModule } from 'novo-elements/elements/icon';
import * as i4 from 'novo-elements/elements/button';
import { NovoButtonModule } from 'novo-elements/elements/button';
import * as i5 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i6 from 'novo-elements/elements/tooltip';
import { NovoTooltipModule } from 'novo-elements/elements/tooltip';

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
CardContentElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: CardContentElement, deps: [], target: i0.ɵɵFactoryTarget.Directive });
CardContentElement.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: CardContentElement, selector: "novo-card-content, [novo-card-content], [novoCardContent]", inputs: { condensed: "condensed" }, host: { properties: { "class.condensed": "condensed" }, classAttribute: "novo-card-content" }, ngImport: i0 });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], CardContentElement.prototype, "condensed", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: CardContentElement, decorators: [{
            type: Directive,
            args: [{
                    selector: 'novo-card-content, [novo-card-content], [novoCardContent]',
                    host: { class: 'novo-card-content', '[class.condensed]': 'condensed' },
                }]
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
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: CardHeaderElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-card-header, [novo-card-header], [novoCardHeader]',
                    host: { class: 'novo-card-header' },
                    template: `
    <ng-content select="novo-avatar, [novo-avatar], novo-icon"></ng-content>
    <div class="novo-card-header-text">
      <ng-content select="novo-title, [novo-title], novo-text, novo-label, novo-caption"></ng-content>
    </div>
    <ng-content></ng-content>
    <div class="novo-card-header-actions">
      <ng-content select="novo-action"></ng-content>
    </div>
  `,
                }]
        }] });
class CardFooterElement {
}
CardFooterElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: CardFooterElement, deps: [], target: i0.ɵɵFactoryTarget.Directive });
CardFooterElement.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: CardFooterElement, selector: "novo-card-footer, [novo-card-footer], [novoCardFooter]", host: { classAttribute: "novo-card-footer" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: CardFooterElement, decorators: [{
            type: Directive,
            args: [{
                    selector: 'novo-card-footer, [novo-card-footer], [novoCardFooter]',
                    host: { class: 'novo-card-footer' },
                }]
        }] });
class CardElement {
    constructor(labels) {
        this.padding = true;
        this.config = {};
        this.inset = 'none';
        this.onClose = new EventEmitter();
        this.onRefresh = new EventEmitter();
        this.labels = labels;
    }
    get hbInset() {
        return `novo-card-inset-${this.inset}`;
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
  `, isInline: true, components: [{ type: i2.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }, { type: i3.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { type: i4.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipActive", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML"] }, { type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], CardElement.prototype, "inline", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: CardElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-card',
                    host: {
                        class: 'novo-card',
                        '[attr.data-automation-id]': 'cardAutomationId',
                        '[class.loading]': 'loading || config.loading',
                    },
                    template: `
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
  `,
                }]
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
//# sourceMappingURL=novo-elements-elements-card.mjs.map

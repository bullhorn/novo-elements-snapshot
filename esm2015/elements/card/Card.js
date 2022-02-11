import { __decorate, __metadata } from "tslib";
// NG2
import { Component, Directive, EventEmitter, HostBinding, Input, Output } from '@angular/core';
// APP
import { NovoLabelService } from '../../services/novo-label-service';
import { BooleanInput } from '../../utils';
import * as i0 from "@angular/core";
import * as i1 from "../../services/novo-label-service";
import * as i2 from "@angular/common";
import * as i3 from "../loading/Loading";
import * as i4 from "../tooltip/Tooltip.directive";
import * as i5 from "../icon/Icon";
import * as i6 from "../button/Button";
const _c0 = ["*"];
const _c1 = [[["novo-avatar"], ["", "novo-avatar", ""], ["novo-icon"]], [["novo-title"], ["", "novo-title", ""], ["novo-text"], ["novo-label"], ["novo-caption"]], "*", [["novo-action"]]];
const _c2 = ["novo-avatar, [novo-avatar], novo-icon", "novo-title, [novo-title], novo-text, novo-label, novo-caption", "*", "novo-action"];
function CardElement_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "novo-loading", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵattribute("data-automation-id", ctx_r0.cardAutomationId + "-loading");
} }
function CardElement_header_1_novo_icon_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "novo-icon");
    i0.ɵɵtext(1, "move");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext(2);
    i0.ɵɵattribute("data-automation-id", ctx_r5.cardAutomationId + "-move");
} }
function CardElement_header_1_i_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 12);
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", ctx_r6.iconClass);
} }
function CardElement_header_1_button_10_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 13);
    i0.ɵɵlistener("click", function CardElement_header_1_button_10_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r9 = i0.ɵɵnextContext(2); return ctx_r9.toggleRefresh(); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵpropertyInterpolate("tooltip", ctx_r7.labels.refresh);
    i0.ɵɵattribute("data-automation-id", ctx_r7.cardAutomationId + "-refresh");
} }
function CardElement_header_1_button_11_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 14);
    i0.ɵɵlistener("click", function CardElement_header_1_button_11_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r12); const ctx_r11 = i0.ɵɵnextContext(2); return ctx_r11.toggleClose(); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext(2);
    i0.ɵɵpropertyInterpolate("tooltip", ctx_r8.labels.close);
    i0.ɵɵattribute("data-automation-id", ctx_r8.cardAutomationId + "-close");
} }
function CardElement_header_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "header");
    i0.ɵɵelementStart(1, "div", 5);
    i0.ɵɵelementStart(2, "span", 6);
    i0.ɵɵtemplate(3, CardElement_header_1_novo_icon_3_Template, 2, 1, "novo-icon", 1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h3");
    i0.ɵɵelementStart(5, "span", 7);
    i0.ɵɵtemplate(6, CardElement_header_1_i_6_Template, 1, 1, "i", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 9);
    i0.ɵɵprojection(9);
    i0.ɵɵtemplate(10, CardElement_header_1_button_10_Template, 1, 2, "button", 10);
    i0.ɵɵtemplate(11, CardElement_header_1_button_11_Template, 1, 2, "button", 11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵpropertyInterpolate("tooltip", ctx_r1.labels.move);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.move || ctx_r1.config.move);
    i0.ɵɵadvance(1);
    i0.ɵɵattribute("data-automation-id", ctx_r1.cardAutomationId + "-title");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("tooltip", ctx_r1.iconTooltip);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.icon);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.title || ctx_r1.config.title, " ");
    i0.ɵɵadvance(1);
    i0.ɵɵattribute("data-automation-id", ctx_r1.cardAutomationId + "-actions");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.refresh || ctx_r1.config.refresh);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.close || ctx_r1.config.close);
} }
function CardElement_ng_content_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵprojection(0, 1, ["*ngIf", "!(loading || config.loading) && !(message || config.message)"]);
} }
function CardElement_p_3_i_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 12);
} if (rf & 2) {
    const ctx_r13 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", ctx_r13.messageIconClass);
} }
function CardElement_p_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 15);
    i0.ɵɵtemplate(1, CardElement_p_3_i_1_Template, 1, 1, "i", 8);
    i0.ɵɵelement(2, "span", 16);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵattribute("data-automation-id", ctx_r3.cardAutomationId + "-message");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r3.messageIconClass);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("innerHtml", ctx_r3.message || ctx_r3.config.message, i0.ɵɵsanitizeHtml);
} }
function CardElement_ng_content_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵprojection(0, 2, ["*ngIf", "!(loading || config.loading) && !(message || config.message)"]);
} }
const _c3 = [[["novo-card-actions"]], "*", [["footer"], ["novo-card-footer"], ["", "novo-card-footer", ""], ["", "novoCardFooter", ""]]];
const _c4 = ["novo-card-actions", "*", "footer,novo-card-footer,[novo-card-footer],[novoCardFooter]"];
export class CardActionsElement {
}
CardActionsElement.ɵfac = function CardActionsElement_Factory(t) { return new (t || CardActionsElement)(); };
CardActionsElement.ɵcmp = i0.ɵɵdefineComponent({ type: CardActionsElement, selectors: [["novo-card-actions"]], ngContentSelectors: _c0, decls: 1, vars: 0, template: function CardActionsElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵprojection(0);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(CardActionsElement, [{
        type: Component,
        args: [{
                selector: 'novo-card-actions',
                template: '<ng-content></ng-content>',
            }]
    }], null, null); })();
/**
 * Content of a card, needed as it's used as a selector in the API.
 */
export class CardContentElement {
    constructor() {
        this.condensed = false;
    }
}
CardContentElement.ɵfac = function CardContentElement_Factory(t) { return new (t || CardContentElement)(); };
CardContentElement.ɵdir = i0.ɵɵdefineDirective({ type: CardContentElement, selectors: [["novo-card-content"], ["", "novo-card-content", ""], ["", "novoCardContent", ""]], hostAttrs: [1, "novo-card-content"], hostVars: 2, hostBindings: function CardContentElement_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassProp("condensed", ctx.condensed);
    } }, inputs: { condensed: "condensed" } });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], CardContentElement.prototype, "condensed", void 0);
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(CardContentElement, [{
        type: Directive,
        args: [{
                selector: 'novo-card-content, [novo-card-content], [novoCardContent]',
                host: { class: 'novo-card-content', '[class.condensed]': 'condensed' },
            }]
    }], null, { condensed: [{
            type: Input
        }] }); })();
/**
 * Content of a card, needed as it's used as a selector in the API.
 */
export class CardHeaderElement {
}
CardHeaderElement.ɵfac = function CardHeaderElement_Factory(t) { return new (t || CardHeaderElement)(); };
CardHeaderElement.ɵcmp = i0.ɵɵdefineComponent({ type: CardHeaderElement, selectors: [["novo-card-header"], ["", "novo-card-header", ""], ["", "novoCardHeader", ""]], hostAttrs: [1, "novo-card-header"], ngContentSelectors: _c2, decls: 6, vars: 0, consts: [[1, "novo-card-header-text"], [1, "novo-card-header-actions"]], template: function CardHeaderElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef(_c1);
        i0.ɵɵprojection(0);
        i0.ɵɵelementStart(1, "div", 0);
        i0.ɵɵprojection(2, 1);
        i0.ɵɵelementEnd();
        i0.ɵɵprojection(3, 2);
        i0.ɵɵelementStart(4, "div", 1);
        i0.ɵɵprojection(5, 3);
        i0.ɵɵelementEnd();
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(CardHeaderElement, [{
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
    }], null, null); })();
export class CardFooterElement {
}
CardFooterElement.ɵfac = function CardFooterElement_Factory(t) { return new (t || CardFooterElement)(); };
CardFooterElement.ɵdir = i0.ɵɵdefineDirective({ type: CardFooterElement, selectors: [["novo-card-footer"], ["", "novo-card-footer", ""], ["", "novoCardFooter", ""]], hostAttrs: [1, "novo-card-footer"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(CardFooterElement, [{
        type: Directive,
        args: [{
                selector: 'novo-card-footer, [novo-card-footer], [novoCardFooter]',
                host: { class: 'novo-card-footer' },
            }]
    }], null, null); })();
export class CardElement {
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
        this.cardAutomationId = `${(this.title || this.config.title || 'no-title').toLowerCase().replace(/\s/g, '-')}-card`;
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
CardElement.ɵfac = function CardElement_Factory(t) { return new (t || CardElement)(i0.ɵɵdirectiveInject(i1.NovoLabelService)); };
CardElement.ɵcmp = i0.ɵɵdefineComponent({ type: CardElement, selectors: [["novo-card"]], hostAttrs: [1, "novo-card"], hostVars: 7, hostBindings: function CardElement_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵattribute("data-automation-id", ctx.cardAutomationId);
        i0.ɵɵclassMap(ctx.hbInset);
        i0.ɵɵclassProp("loading", ctx.loading || ctx.config.loading)("novo-card-inline", ctx.inline);
    } }, inputs: { padding: "padding", config: "config", title: "title", message: "message", messageIcon: "messageIcon", icon: "icon", iconTooltip: "iconTooltip", refresh: "refresh", close: "close", move: "move", loading: "loading", inline: "inline", inset: "inset" }, outputs: { onClose: "onClose", onRefresh: "onRefresh" }, features: [i0.ɵɵNgOnChangesFeature], ngContentSelectors: _c4, decls: 5, vars: 5, consts: [["class", "card-loading-container", 4, "ngIf"], [4, "ngIf"], ["class", "card-message", 4, "ngIf"], [1, "card-loading-container"], ["theme", "line"], [1, "title"], ["tooltipPosition", "bottom-right", 3, "tooltip"], ["tooltipPosition", "right", 3, "tooltip"], [3, "ngClass", 4, "ngIf"], [1, "actions"], ["theme", "icon", "icon", "refresh", "tooltipPosition", "bottom-left", 3, "tooltip", "click", 4, "ngIf"], ["theme", "icon", "icon", "close-o", "tooltipPosition", "bottom-left", 3, "tooltip", "click", 4, "ngIf"], [3, "ngClass"], ["theme", "icon", "icon", "refresh", "tooltipPosition", "bottom-left", 3, "tooltip", "click"], ["theme", "icon", "icon", "close-o", "tooltipPosition", "bottom-left", 3, "tooltip", "click"], [1, "card-message"], [3, "innerHtml"]], template: function CardElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef(_c3);
        i0.ɵɵtemplate(0, CardElement_div_0_Template, 2, 1, "div", 0);
        i0.ɵɵtemplate(1, CardElement_header_1_Template, 12, 9, "header", 1);
        i0.ɵɵtemplate(2, CardElement_ng_content_2_Template, 1, 0, "ng-content", 1);
        i0.ɵɵtemplate(3, CardElement_p_3_Template, 3, 3, "p", 2);
        i0.ɵɵtemplate(4, CardElement_ng_content_4_Template, 1, 0, "ng-content", 1);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.loading || ctx.config.loading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.title || ctx.config.title);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !(ctx.loading || ctx.config.loading) && !(ctx.message || ctx.config.message));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !(ctx.loading || ctx.config.loading) && (ctx.message || ctx.config.message));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !(ctx.loading || ctx.config.loading) && !(ctx.message || ctx.config.message));
    } }, directives: [i2.NgIf, i3.NovoLoadingElement, i4.TooltipDirective, i5.NovoIconComponent, i2.NgClass, i6.NovoButtonElement], encapsulation: 2 });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], CardElement.prototype, "inline", void 0);
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(CardElement, [{
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
        <span tooltip="{{ labels.move }}" tooltipPosition="bottom-right">
          <novo-icon *ngIf="move || config.move" [attr.data-automation-id]="cardAutomationId + '-move'">move</novo-icon>
        </span>
        <!--Card Title-->
        <h3 [attr.data-automation-id]="cardAutomationId + '-title'">
          <span [tooltip]="iconTooltip" tooltipPosition="right"><i *ngIf="icon" [ngClass]="iconClass"></i></span>
          {{ title || config.title }}
        </h3>
      </div>
      <!--Card Actions-->
      <div class="actions" [attr.data-automation-id]="cardAutomationId + '-actions'">
        <ng-content select="novo-card-actions"></ng-content>
        <button
          theme="icon"
          icon="refresh"
          (click)="toggleRefresh()"
          *ngIf="refresh || config.refresh"
          [attr.data-automation-id]="cardAutomationId + '-refresh'"
          tooltip="{{ labels.refresh }}"
          tooltipPosition="bottom-left"
        ></button>
        <button
          theme="icon"
          icon="close-o"
          (click)="toggleClose()"
          *ngIf="close || config.close"
          [attr.data-automation-id]="cardAutomationId + '-close'"
          tooltip="{{ labels.close }}"
          tooltipPosition="bottom-left"
        ></button>
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
    }], function () { return [{ type: i1.NovoLabelService }]; }, { padding: [{
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
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FyZC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9jYXJkL0NhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNqSSxNQUFNO0FBQ04sT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDckUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQzs7Ozs7Ozs7Ozs7O0lBcUR2Qyw4QkFDRTtJQUFBLGtDQUFvRztJQUN0RyxpQkFBTTs7O0lBRHVCLGVBQXlEO0lBQXpELDBFQUF5RDs7O0lBT2hGLGlDQUE4RjtJQUFBLG9CQUFJO0lBQUEsaUJBQVk7OztJQUF2RSx1RUFBc0Q7OztJQUl2Qyx3QkFBMEM7OztJQUExQiwwQ0FBcUI7Ozs7SUFPN0Ysa0NBUVU7SUFMUixpTUFBeUI7SUFLMUIsaUJBQVM7OztJQUZSLDBEQUE4QjtJQUQ5QiwwRUFBeUQ7Ozs7SUFJM0Qsa0NBUVU7SUFMUixpTUFBdUI7SUFLeEIsaUJBQVM7OztJQUZSLHdEQUE0QjtJQUQ1Qix3RUFBdUQ7OztJQTdCN0QsOEJBQ0U7SUFBQSw4QkFDRTtJQUNBLCtCQUNFO0lBQUEsaUZBQThGO0lBQ2hHLGlCQUFPO0lBRVAsMEJBQ0U7SUFBQSwrQkFBc0Q7SUFBQSxpRUFBc0M7SUFBSSxpQkFBTztJQUN2RyxZQUNGO0lBQUEsaUJBQUs7SUFDUCxpQkFBTTtJQUVOLDhCQUNFO0lBQUEsa0JBQXVDO0lBQ3ZDLDhFQVFDO0lBQ0QsOEVBUUM7SUFDSCxpQkFBTTtJQUNSLGlCQUFTOzs7SUEvQkMsZUFBMkI7SUFBM0IsdURBQTJC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QU9uRSxlQUFvRTtRQUFwRSxtR0FBb0U7O0FBZ0N4RTtJQUZDLFlBQVksRUFBRTs7MkNBRUM7a0RBM0JMLFdBQVc7Y0FqRXZCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsV0FBVztnQkFDckIsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSxXQUFXO29CQUNsQiwyQkFBMkIsRUFBRSxrQkFBa0I7b0JBQy9DLGlCQUFpQixFQUFFLDJCQUEyQjtpQkFDL0M7Z0JBQ0QsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdEVDthQUNGO21FQUdDLE9BQU87a0JBRE4sS0FBSztZQUdOLE1BQU07a0JBREwsS0FBSztZQUdOLEtBQUs7a0JBREosS0FBSztZQUdOLE9BQU87a0JBRE4sS0FBSztZQUdOLFdBQVc7a0JBRFYsS0FBSztZQUdOLElBQUk7a0JBREgsS0FBSztZQUdOLFdBQVc7a0JBRFYsS0FBSztZQUdOLE9BQU87a0JBRE4sS0FBSztZQUdOLEtBQUs7a0JBREosS0FBSztZQUdOLElBQUk7a0JBREgsS0FBSztZQUdOLE9BQU87a0JBRE4sS0FBSztZQU1OLE1BQU07a0JBSEwsS0FBSzs7a0JBRUwsV0FBVzttQkFBQyx3QkFBd0I7WUFJckMsS0FBSztrQkFESixLQUFLO1lBR0YsT0FBTztrQkFEVixXQUFXO21CQUFDLE9BQU87WUFNcEIsT0FBTztrQkFETixNQUFNO1lBR1AsU0FBUztrQkFEUixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQsIERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIEFQUFxuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQgfSBmcm9tICcuLi8uLi91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tY2FyZC1hY3Rpb25zJyxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ2FyZEFjdGlvbnNFbGVtZW50IHt9XG5cbi8qKlxuICogQ29udGVudCBvZiBhIGNhcmQsIG5lZWRlZCBhcyBpdCdzIHVzZWQgYXMgYSBzZWxlY3RvciBpbiB0aGUgQVBJLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdub3ZvLWNhcmQtY29udGVudCwgW25vdm8tY2FyZC1jb250ZW50XSwgW25vdm9DYXJkQ29udGVudF0nLFxuICBob3N0OiB7IGNsYXNzOiAnbm92by1jYXJkLWNvbnRlbnQnLCAnW2NsYXNzLmNvbmRlbnNlZF0nOiAnY29uZGVuc2VkJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBDYXJkQ29udGVudEVsZW1lbnQge1xuICBASW5wdXQoKSBAQm9vbGVhbklucHV0KCkgY29uZGVuc2VkOiBib29sZWFuID0gZmFsc2U7XG59XG5cbi8qKlxuICogQ29udGVudCBvZiBhIGNhcmQsIG5lZWRlZCBhcyBpdCdzIHVzZWQgYXMgYSBzZWxlY3RvciBpbiB0aGUgQVBJLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWNhcmQtaGVhZGVyLCBbbm92by1jYXJkLWhlYWRlcl0sIFtub3ZvQ2FyZEhlYWRlcl0nLFxuICBob3N0OiB7IGNsYXNzOiAnbm92by1jYXJkLWhlYWRlcicgfSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJub3ZvLWF2YXRhciwgW25vdm8tYXZhdGFyXSwgbm92by1pY29uXCI+PC9uZy1jb250ZW50PlxuICAgIDxkaXYgY2xhc3M9XCJub3ZvLWNhcmQtaGVhZGVyLXRleHRcIj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5vdm8tdGl0bGUsIFtub3ZvLXRpdGxlXSwgbm92by10ZXh0LCBub3ZvLWxhYmVsLCBub3ZvLWNhcHRpb25cIj48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDxkaXYgY2xhc3M9XCJub3ZvLWNhcmQtaGVhZGVyLWFjdGlvbnNcIj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5vdm8tYWN0aW9uXCI+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBDYXJkSGVhZGVyRWxlbWVudCB7fVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdub3ZvLWNhcmQtZm9vdGVyLCBbbm92by1jYXJkLWZvb3Rlcl0sIFtub3ZvQ2FyZEZvb3Rlcl0nLFxuICBob3N0OiB7IGNsYXNzOiAnbm92by1jYXJkLWZvb3RlcicgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2FyZEZvb3RlckVsZW1lbnQge31cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1jYXJkJyxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1jYXJkJyxcbiAgICAnW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXSc6ICdjYXJkQXV0b21hdGlvbklkJyxcbiAgICAnW2NsYXNzLmxvYWRpbmddJzogJ2xvYWRpbmcgfHwgY29uZmlnLmxvYWRpbmcnLFxuICB9LFxuICB0ZW1wbGF0ZTogYFxuICAgIDwhLS1Mb2FkaW5nLS0+XG4gICAgPGRpdiBjbGFzcz1cImNhcmQtbG9hZGluZy1jb250YWluZXJcIiAqbmdJZj1cImxvYWRpbmcgfHwgY29uZmlnLmxvYWRpbmdcIj5cbiAgICAgIDxub3ZvLWxvYWRpbmcgdGhlbWU9XCJsaW5lXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImNhcmRBdXRvbWF0aW9uSWQgKyAnLWxvYWRpbmcnXCI+PC9ub3ZvLWxvYWRpbmc+XG4gICAgPC9kaXY+XG4gICAgPCEtLUNhcmQgSGVhZGVyLS0+XG4gICAgPGhlYWRlciAqbmdJZj1cInRpdGxlIHx8IGNvbmZpZy50aXRsZVwiPlxuICAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+XG4gICAgICAgIDwhLS1HcmFiYmVyIEljb24tLT5cbiAgICAgICAgPHNwYW4gdG9vbHRpcD1cInt7IGxhYmVscy5tb3ZlIH19XCIgdG9vbHRpcFBvc2l0aW9uPVwiYm90dG9tLXJpZ2h0XCI+XG4gICAgICAgICAgPG5vdm8taWNvbiAqbmdJZj1cIm1vdmUgfHwgY29uZmlnLm1vdmVcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiY2FyZEF1dG9tYXRpb25JZCArICctbW92ZSdcIj5tb3ZlPC9ub3ZvLWljb24+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPCEtLUNhcmQgVGl0bGUtLT5cbiAgICAgICAgPGgzIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJjYXJkQXV0b21hdGlvbklkICsgJy10aXRsZSdcIj5cbiAgICAgICAgICA8c3BhbiBbdG9vbHRpcF09XCJpY29uVG9vbHRpcFwiIHRvb2x0aXBQb3NpdGlvbj1cInJpZ2h0XCI+PGkgKm5nSWY9XCJpY29uXCIgW25nQ2xhc3NdPVwiaWNvbkNsYXNzXCI+PC9pPjwvc3Bhbj5cbiAgICAgICAgICB7eyB0aXRsZSB8fCBjb25maWcudGl0bGUgfX1cbiAgICAgICAgPC9oMz5cbiAgICAgIDwvZGl2PlxuICAgICAgPCEtLUNhcmQgQWN0aW9ucy0tPlxuICAgICAgPGRpdiBjbGFzcz1cImFjdGlvbnNcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiY2FyZEF1dG9tYXRpb25JZCArICctYWN0aW9ucydcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibm92by1jYXJkLWFjdGlvbnNcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICB0aGVtZT1cImljb25cIlxuICAgICAgICAgIGljb249XCJyZWZyZXNoXCJcbiAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlUmVmcmVzaCgpXCJcbiAgICAgICAgICAqbmdJZj1cInJlZnJlc2ggfHwgY29uZmlnLnJlZnJlc2hcIlxuICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJjYXJkQXV0b21hdGlvbklkICsgJy1yZWZyZXNoJ1wiXG4gICAgICAgICAgdG9vbHRpcD1cInt7IGxhYmVscy5yZWZyZXNoIH19XCJcbiAgICAgICAgICB0b29sdGlwUG9zaXRpb249XCJib3R0b20tbGVmdFwiXG4gICAgICAgID48L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHRoZW1lPVwiaWNvblwiXG4gICAgICAgICAgaWNvbj1cImNsb3NlLW9cIlxuICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVDbG9zZSgpXCJcbiAgICAgICAgICAqbmdJZj1cImNsb3NlIHx8IGNvbmZpZy5jbG9zZVwiXG4gICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImNhcmRBdXRvbWF0aW9uSWQgKyAnLWNsb3NlJ1wiXG4gICAgICAgICAgdG9vbHRpcD1cInt7IGxhYmVscy5jbG9zZSB9fVwiXG4gICAgICAgICAgdG9vbHRpcFBvc2l0aW9uPVwiYm90dG9tLWxlZnRcIlxuICAgICAgICA+PC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2hlYWRlcj5cbiAgICA8IS0tQ29udGVudCAodHJhbnNjbHVkZWQpLS0+XG4gICAgPG5nLWNvbnRlbnQgKm5nSWY9XCIhKGxvYWRpbmcgfHwgY29uZmlnLmxvYWRpbmcpICYmICEobWVzc2FnZSB8fCBjb25maWcubWVzc2FnZSlcIj48L25nLWNvbnRlbnQ+XG4gICAgPCEtLUVycm9yL0VtcHR5IE1lc3NhZ2UtLT5cbiAgICA8cFxuICAgICAgY2xhc3M9XCJjYXJkLW1lc3NhZ2VcIlxuICAgICAgKm5nSWY9XCIhKGxvYWRpbmcgfHwgY29uZmlnLmxvYWRpbmcpICYmIChtZXNzYWdlIHx8IGNvbmZpZy5tZXNzYWdlKVwiXG4gICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiY2FyZEF1dG9tYXRpb25JZCArICctbWVzc2FnZSdcIlxuICAgID5cbiAgICAgIDxpICpuZ0lmPVwibWVzc2FnZUljb25DbGFzc1wiIFtuZ0NsYXNzXT1cIm1lc3NhZ2VJY29uQ2xhc3NcIj48L2k+IDxzcGFuIFtpbm5lckh0bWxdPVwibWVzc2FnZSB8fCBjb25maWcubWVzc2FnZVwiPjwvc3Bhbj5cbiAgICA8L3A+XG4gICAgPCEtLUNhcmQgRm9vdGVyLS0+XG4gICAgPG5nLWNvbnRlbnRcbiAgICAgICpuZ0lmPVwiIShsb2FkaW5nIHx8IGNvbmZpZy5sb2FkaW5nKSAmJiAhKG1lc3NhZ2UgfHwgY29uZmlnLm1lc3NhZ2UpXCJcbiAgICAgIHNlbGVjdD1cImZvb3Rlcixub3ZvLWNhcmQtZm9vdGVyLFtub3ZvLWNhcmQtZm9vdGVyXSxbbm92b0NhcmRGb290ZXJdXCJcbiAgICA+PC9uZy1jb250ZW50PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBDYXJkRWxlbWVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0IHtcbiAgQElucHV0KClcbiAgcGFkZGluZzogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpXG4gIGNvbmZpZzogYW55ID0ge307XG4gIEBJbnB1dCgpXG4gIHRpdGxlOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgQElucHV0KClcbiAgbWVzc2FnZUljb246IHN0cmluZztcbiAgQElucHV0KClcbiAgaWNvbjogc3RyaW5nO1xuICBASW5wdXQoKVxuICBpY29uVG9vbHRpcDogc3RyaW5nO1xuICBASW5wdXQoKVxuICByZWZyZXNoOiBib29sZWFuO1xuICBASW5wdXQoKVxuICBjbG9zZTogYm9vbGVhbjtcbiAgQElucHV0KClcbiAgbW92ZTogYm9vbGVhbjtcbiAgQElucHV0KClcbiAgbG9hZGluZzogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5ub3ZvLWNhcmQtaW5saW5lJylcbiAgaW5saW5lOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIGluc2V0OiBzdHJpbmcgPSAnbm9uZSc7XG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBnZXQgaGJJbnNldCgpIHtcbiAgICByZXR1cm4gYG5vdm8tY2FyZC1pbnNldC0ke3RoaXMuaW5zZXR9YDtcbiAgfVxuXG4gIEBPdXRwdXQoKVxuICBvbkNsb3NlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIG9uUmVmcmVzaDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY2FyZEF1dG9tYXRpb25JZDogc3RyaW5nO1xuICBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2U7XG4gIGljb25DbGFzczogc3RyaW5nIHwgbnVsbDtcbiAgbWVzc2FnZUljb25DbGFzczogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGxhYmVsczogTm92b0xhYmVsU2VydmljZSkge1xuICAgIHRoaXMubGFiZWxzID0gbGFiZWxzO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jb25maWcgPSB0aGlzLmNvbmZpZyB8fCB7fTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM/OiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgdGhpcy5jb25maWcgPSB0aGlzLmNvbmZpZyB8fCB7fTtcbiAgICB0aGlzLmNhcmRBdXRvbWF0aW9uSWQgPSBgJHsodGhpcy50aXRsZSB8fCB0aGlzLmNvbmZpZy50aXRsZSB8fCAnbm8tdGl0bGUnKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccy9nLCAnLScpfS1jYXJkYDtcblxuICAgIGNvbnN0IG5ld0ljb246IHN0cmluZyA9IHRoaXMuaWNvbiB8fCB0aGlzLmNvbmZpZy5pY29uO1xuICAgIGNvbnN0IG5ld01lc3NhZ2VJY29uOiBzdHJpbmcgPSB0aGlzLm1lc3NhZ2VJY29uIHx8IHRoaXMuY29uZmlnLm1lc3NhZ2VJY29uO1xuICAgIHRoaXMuaWNvbkNsYXNzID0gbmV3SWNvbiA/IGBiaGktJHtuZXdJY29ufWAgOiBudWxsO1xuICAgIHRoaXMubWVzc2FnZUljb25DbGFzcyA9IG5ld01lc3NhZ2VJY29uID8gYGJoaS0ke25ld01lc3NhZ2VJY29ufWAgOiBudWxsO1xuICB9XG5cbiAgdG9nZ2xlQ2xvc2UoKSB7XG4gICAgaWYgKCF0aGlzLmNvbmZpZy5vbkNsb3NlKSB7XG4gICAgICB0aGlzLm9uQ2xvc2UubmV4dCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbmZpZy5vbkNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlUmVmcmVzaCgpIHtcbiAgICBpZiAoIXRoaXMuY29uZmlnLm9uUmVmcmVzaCkge1xuICAgICAgdGhpcy5vblJlZnJlc2gubmV4dCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbmZpZy5vblJlZnJlc2goKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// NG2
import { Component, Directive, EventEmitter, HostBinding, Input, Output } from '@angular/core';
// APP
import { NovoLabelService } from '../../services/novo-label-service';
import { BooleanInput } from '../../utils';
import * as i0 from "@angular/core";
import * as i1 from "../../services/novo-label-service";
import * as i2 from "../loading/Loading";
import * as i3 from "../icon/Icon";
import * as i4 from "../button/Button";
import * as i5 from "@angular/common";
import * as i6 from "../tooltip/Tooltip.directive";
export class CardActionsElement {
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
export class CardContentElement {
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
export class CardHeaderElement {
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
export class CardFooterElement {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2NhcmQvQ2FyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDakksTUFBTTtBQUNOLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7Ozs7Ozs7O0FBTTNDLE1BQU0sT0FBTyxrQkFBa0I7O2dIQUFsQixrQkFBa0I7b0dBQWxCLGtCQUFrQix5REFGbkIsMkJBQTJCOzRGQUUxQixrQkFBa0I7a0JBSjlCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsUUFBUSxFQUFFLDJCQUEyQjtpQkFDdEM7O0FBR0Q7O0dBRUc7QUFLSCxNQUFNLE9BQU8sa0JBQWtCO0lBSi9CO1FBSzJCLGNBQVMsR0FBWSxLQUFLLENBQUM7S0FDckQ7O2dIQUZZLGtCQUFrQjtvR0FBbEIsa0JBQWtCO0FBQ0o7SUFBZixZQUFZLEVBQUU7O3FEQUE0Qjs0RkFEekMsa0JBQWtCO2tCQUo5QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSwyREFBMkQ7b0JBQ3JFLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxtQkFBbUIsRUFBRSxtQkFBbUIsRUFBRSxXQUFXLEVBQUU7aUJBQ3ZFOzhCQUUwQixTQUFTO3NCQUFqQyxLQUFLOztBQUdSOztHQUVHO0FBZUgsTUFBTSxPQUFPLGlCQUFpQjs7K0dBQWpCLGlCQUFpQjttR0FBakIsaUJBQWlCLDRJQVhsQjs7Ozs7Ozs7O0dBU1Q7NEZBRVUsaUJBQWlCO2tCQWQ3QixT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a0I7d0JBQy9DLGlCQUFpQixFQUFFLDJCQUEyQjtxQkFDL0M7b0JBQ0QsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkRUO2lCQUNGO3VHQUdDLE9BQU87c0JBRE4sS0FBSztnQkFHTixNQUFNO3NCQURMLEtBQUs7Z0JBR04sS0FBSztzQkFESixLQUFLO2dCQUdOLE9BQU87c0JBRE4sS0FBSztnQkFHTixXQUFXO3NCQURWLEtBQUs7Z0JBR04sSUFBSTtzQkFESCxLQUFLO2dCQUdOLFdBQVc7c0JBRFYsS0FBSztnQkFHTixPQUFPO3NCQUROLEtBQUs7Z0JBR04sS0FBSztzQkFESixLQUFLO2dCQUdOLElBQUk7c0JBREgsS0FBSztnQkFHTixPQUFPO3NCQUROLEtBQUs7Z0JBTU4sTUFBTTtzQkFITCxLQUFLOztzQkFFTCxXQUFXO3VCQUFDLHdCQUF3QjtnQkFJckMsS0FBSztzQkFESixLQUFLO2dCQUdGLE9BQU87c0JBRFYsV0FBVzt1QkFBQyxPQUFPO2dCQU1wQixPQUFPO3NCQUROLE1BQU07Z0JBR1AsU0FBUztzQkFEUixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQsIERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIEFQUFxuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQgfSBmcm9tICcuLi8uLi91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tY2FyZC1hY3Rpb25zJyxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ2FyZEFjdGlvbnNFbGVtZW50IHt9XG5cbi8qKlxuICogQ29udGVudCBvZiBhIGNhcmQsIG5lZWRlZCBhcyBpdCdzIHVzZWQgYXMgYSBzZWxlY3RvciBpbiB0aGUgQVBJLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdub3ZvLWNhcmQtY29udGVudCwgW25vdm8tY2FyZC1jb250ZW50XSwgW25vdm9DYXJkQ29udGVudF0nLFxuICBob3N0OiB7IGNsYXNzOiAnbm92by1jYXJkLWNvbnRlbnQnLCAnW2NsYXNzLmNvbmRlbnNlZF0nOiAnY29uZGVuc2VkJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBDYXJkQ29udGVudEVsZW1lbnQge1xuICBASW5wdXQoKSBAQm9vbGVhbklucHV0KCkgY29uZGVuc2VkOiBib29sZWFuID0gZmFsc2U7XG59XG5cbi8qKlxuICogQ29udGVudCBvZiBhIGNhcmQsIG5lZWRlZCBhcyBpdCdzIHVzZWQgYXMgYSBzZWxlY3RvciBpbiB0aGUgQVBJLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWNhcmQtaGVhZGVyLCBbbm92by1jYXJkLWhlYWRlcl0sIFtub3ZvQ2FyZEhlYWRlcl0nLFxuICBob3N0OiB7IGNsYXNzOiAnbm92by1jYXJkLWhlYWRlcicgfSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJub3ZvLWF2YXRhciwgW25vdm8tYXZhdGFyXSwgbm92by1pY29uXCI+PC9uZy1jb250ZW50PlxuICAgIDxkaXYgY2xhc3M9XCJub3ZvLWNhcmQtaGVhZGVyLXRleHRcIj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5vdm8tdGl0bGUsIFtub3ZvLXRpdGxlXSwgbm92by10ZXh0LCBub3ZvLWxhYmVsLCBub3ZvLWNhcHRpb25cIj48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDxkaXYgY2xhc3M9XCJub3ZvLWNhcmQtaGVhZGVyLWFjdGlvbnNcIj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5vdm8tYWN0aW9uXCI+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBDYXJkSGVhZGVyRWxlbWVudCB7fVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdub3ZvLWNhcmQtZm9vdGVyLCBbbm92by1jYXJkLWZvb3Rlcl0sIFtub3ZvQ2FyZEZvb3Rlcl0nLFxuICBob3N0OiB7IGNsYXNzOiAnbm92by1jYXJkLWZvb3RlcicgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2FyZEZvb3RlckVsZW1lbnQge31cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1jYXJkJyxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1jYXJkJyxcbiAgICAnW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXSc6ICdjYXJkQXV0b21hdGlvbklkJyxcbiAgICAnW2NsYXNzLmxvYWRpbmddJzogJ2xvYWRpbmcgfHwgY29uZmlnLmxvYWRpbmcnLFxuICB9LFxuICB0ZW1wbGF0ZTogYFxuICAgIDwhLS1Mb2FkaW5nLS0+XG4gICAgPGRpdiBjbGFzcz1cImNhcmQtbG9hZGluZy1jb250YWluZXJcIiAqbmdJZj1cImxvYWRpbmcgfHwgY29uZmlnLmxvYWRpbmdcIj5cbiAgICAgIDxub3ZvLWxvYWRpbmcgdGhlbWU9XCJsaW5lXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImNhcmRBdXRvbWF0aW9uSWQgKyAnLWxvYWRpbmcnXCI+PC9ub3ZvLWxvYWRpbmc+XG4gICAgPC9kaXY+XG4gICAgPCEtLUNhcmQgSGVhZGVyLS0+XG4gICAgPGhlYWRlciAqbmdJZj1cInRpdGxlIHx8IGNvbmZpZy50aXRsZVwiPlxuICAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+XG4gICAgICAgIDwhLS1HcmFiYmVyIEljb24tLT5cbiAgICAgICAgPG5vdm8taWNvblxuICAgICAgICAgICpuZ0lmPVwibW92ZSB8fCBjb25maWcubW92ZVwiXG4gICAgICAgICAgdG9vbHRpcD1cInt7IGxhYmVscy5tb3ZlIH19XCJcbiAgICAgICAgICB0b29sdGlwUG9zaXRpb249XCJib3R0b20tcmlnaHRcIlxuICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJjYXJkQXV0b21hdGlvbklkICsgJy1tb3ZlJ1wiXG4gICAgICAgICAgPm1vdmU8L25vdm8taWNvblxuICAgICAgICA+XG4gICAgICAgIDwhLS1DYXJkIFRpdGxlLS0+XG4gICAgICAgIDxoMyBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiY2FyZEF1dG9tYXRpb25JZCArICctdGl0bGUnXCI+XG4gICAgICAgICAgPHNwYW4gW3Rvb2x0aXBdPVwiaWNvblRvb2x0aXBcIiB0b29sdGlwUG9zaXRpb249XCJyaWdodFwiPjxpICpuZ0lmPVwiaWNvblwiIFtuZ0NsYXNzXT1cImljb25DbGFzc1wiPjwvaT48L3NwYW4+XG4gICAgICAgICAge3sgdGl0bGUgfHwgY29uZmlnLnRpdGxlIH19XG4gICAgICAgIDwvaDM+XG4gICAgICA8L2Rpdj5cbiAgICAgIDwhLS1DYXJkIEFjdGlvbnMtLT5cbiAgICAgIDxkaXYgY2xhc3M9XCJhY3Rpb25zXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImNhcmRBdXRvbWF0aW9uSWQgKyAnLWFjdGlvbnMnXCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5vdm8tY2FyZC1hY3Rpb25zXCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8bm92by1idXR0b25cbiAgICAgICAgICB0aGVtZT1cImljb25cIlxuICAgICAgICAgIGljb249XCJyZWZyZXNoXCJcbiAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlUmVmcmVzaCgpXCJcbiAgICAgICAgICAqbmdJZj1cInJlZnJlc2ggfHwgY29uZmlnLnJlZnJlc2hcIlxuICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJjYXJkQXV0b21hdGlvbklkICsgJy1yZWZyZXNoJ1wiXG4gICAgICAgICAgdG9vbHRpcD1cInt7IGxhYmVscy5yZWZyZXNoIH19XCJcbiAgICAgICAgICB0b29sdGlwUG9zaXRpb249XCJib3R0b20tbGVmdFwiXG4gICAgICAgID48L25vdm8tYnV0dG9uPlxuXG4gICAgICAgIDxub3ZvLWJ1dHRvblxuICAgICAgICAgIHRoZW1lPVwiaWNvblwiXG4gICAgICAgICAgaWNvbj1cImNsb3NlLW9cIlxuICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVDbG9zZSgpXCJcbiAgICAgICAgICAqbmdJZj1cImNsb3NlIHx8IGNvbmZpZy5jbG9zZVwiXG4gICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImNhcmRBdXRvbWF0aW9uSWQgKyAnLWNsb3NlJ1wiXG4gICAgICAgICAgdG9vbHRpcD1cInt7IGxhYmVscy5jbG9zZSB9fVwiXG4gICAgICAgICAgdG9vbHRpcFBvc2l0aW9uPVwiYm90dG9tLWxlZnRcIlxuICAgICAgICA+PC9ub3ZvLWJ1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvaGVhZGVyPlxuICAgIDwhLS1Db250ZW50ICh0cmFuc2NsdWRlZCktLT5cbiAgICA8bmctY29udGVudCAqbmdJZj1cIiEobG9hZGluZyB8fCBjb25maWcubG9hZGluZykgJiYgIShtZXNzYWdlIHx8IGNvbmZpZy5tZXNzYWdlKVwiPjwvbmctY29udGVudD5cbiAgICA8IS0tRXJyb3IvRW1wdHkgTWVzc2FnZS0tPlxuICAgIDxwXG4gICAgICBjbGFzcz1cImNhcmQtbWVzc2FnZVwiXG4gICAgICAqbmdJZj1cIiEobG9hZGluZyB8fCBjb25maWcubG9hZGluZykgJiYgKG1lc3NhZ2UgfHwgY29uZmlnLm1lc3NhZ2UpXCJcbiAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJjYXJkQXV0b21hdGlvbklkICsgJy1tZXNzYWdlJ1wiXG4gICAgPlxuICAgICAgPGkgKm5nSWY9XCJtZXNzYWdlSWNvbkNsYXNzXCIgW25nQ2xhc3NdPVwibWVzc2FnZUljb25DbGFzc1wiPjwvaT4gPHNwYW4gW2lubmVySHRtbF09XCJtZXNzYWdlIHx8IGNvbmZpZy5tZXNzYWdlXCI+PC9zcGFuPlxuICAgIDwvcD5cbiAgICA8IS0tQ2FyZCBGb290ZXItLT5cbiAgICA8bmctY29udGVudFxuICAgICAgKm5nSWY9XCIhKGxvYWRpbmcgfHwgY29uZmlnLmxvYWRpbmcpICYmICEobWVzc2FnZSB8fCBjb25maWcubWVzc2FnZSlcIlxuICAgICAgc2VsZWN0PVwiZm9vdGVyLG5vdm8tY2FyZC1mb290ZXIsW25vdm8tY2FyZC1mb290ZXJdLFtub3ZvQ2FyZEZvb3Rlcl1cIlxuICAgID48L25nLWNvbnRlbnQ+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIENhcmRFbGVtZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQge1xuICBASW5wdXQoKVxuICBwYWRkaW5nOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KClcbiAgY29uZmlnOiBhbnkgPSB7fTtcbiAgQElucHV0KClcbiAgdGl0bGU6IHN0cmluZztcbiAgQElucHV0KClcbiAgbWVzc2FnZTogc3RyaW5nO1xuICBASW5wdXQoKVxuICBtZXNzYWdlSWNvbjogc3RyaW5nO1xuICBASW5wdXQoKVxuICBpY29uOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIGljb25Ub29sdGlwOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHJlZnJlc2g6IGJvb2xlYW47XG4gIEBJbnB1dCgpXG4gIGNsb3NlOiBib29sZWFuO1xuICBASW5wdXQoKVxuICBtb3ZlOiBib29sZWFuO1xuICBASW5wdXQoKVxuICBsb2FkaW5nOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm5vdm8tY2FyZC1pbmxpbmUnKVxuICBpbmxpbmU6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgaW5zZXQ6IHN0cmluZyA9ICdub25lJztcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIGdldCBoYkluc2V0KCkge1xuICAgIHJldHVybiBgbm92by1jYXJkLWluc2V0LSR7dGhpcy5pbnNldH1gO1xuICB9XG5cbiAgQE91dHB1dCgpXG4gIG9uQ2xvc2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgb25SZWZyZXNoOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjYXJkQXV0b21hdGlvbklkOiBzdHJpbmc7XG4gIGxhYmVsczogTm92b0xhYmVsU2VydmljZTtcbiAgaWNvbkNsYXNzOiBzdHJpbmcgfCBudWxsO1xuICBtZXNzYWdlSWNvbkNsYXNzOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IobGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlKSB7XG4gICAgdGhpcy5sYWJlbHMgPSBsYWJlbHM7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNvbmZpZyA9IHRoaXMuY29uZmlnIHx8IHt9O1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlcz86IFNpbXBsZUNoYW5nZXMpIHtcbiAgICB0aGlzLmNvbmZpZyA9IHRoaXMuY29uZmlnIHx8IHt9O1xuICAgIHRoaXMuY2FyZEF1dG9tYXRpb25JZCA9IGAkeyh0aGlzLnRpdGxlIHx8IHRoaXMuY29uZmlnLnRpdGxlIHx8ICduby10aXRsZScpLnRyaW0oKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccy9nLCAnLScpfS1jYXJkYDtcblxuICAgIGNvbnN0IG5ld0ljb246IHN0cmluZyA9IHRoaXMuaWNvbiB8fCB0aGlzLmNvbmZpZy5pY29uO1xuICAgIGNvbnN0IG5ld01lc3NhZ2VJY29uOiBzdHJpbmcgPSB0aGlzLm1lc3NhZ2VJY29uIHx8IHRoaXMuY29uZmlnLm1lc3NhZ2VJY29uO1xuICAgIHRoaXMuaWNvbkNsYXNzID0gbmV3SWNvbiA/IGBiaGktJHtuZXdJY29ufWAgOiBudWxsO1xuICAgIHRoaXMubWVzc2FnZUljb25DbGFzcyA9IG5ld01lc3NhZ2VJY29uID8gYGJoaS0ke25ld01lc3NhZ2VJY29ufWAgOiBudWxsO1xuICB9XG5cbiAgdG9nZ2xlQ2xvc2UoKSB7XG4gICAgaWYgKCF0aGlzLmNvbmZpZy5vbkNsb3NlKSB7XG4gICAgICB0aGlzLm9uQ2xvc2UubmV4dCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbmZpZy5vbkNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlUmVmcmVzaCgpIHtcbiAgICBpZiAoIXRoaXMuY29uZmlnLm9uUmVmcmVzaCkge1xuICAgICAgdGhpcy5vblJlZnJlc2gubmV4dCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbmZpZy5vblJlZnJlc2goKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
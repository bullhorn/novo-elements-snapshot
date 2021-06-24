// NG2
import { Component, ElementRef, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _c0 = ["*"];
const _c1 = [[["item-header"]], [["item-content"]], "*", [["item-end"]]];
const _c2 = function (a0) { return { "avatar": a0 }; };
const _c3 = ["item-header", "item-content", "*", "item-end"];
function NovoItemAvatarElement_i_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 1);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", ctx_r0.classMap);
} }
const _c4 = [[["item-avatar"]], [["item-title"]], [["item-header-end"]]];
const _c5 = ["item-avatar", "item-title", "item-header-end"];
export class NovoListElement {
    constructor(element) {
        this.element = element;
    }
}
NovoListElement.ɵfac = function NovoListElement_Factory(t) { return new (t || NovoListElement)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
NovoListElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoListElement, selectors: [["novo-list"]], hostVars: 5, hostBindings: function NovoListElement_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵattribute("theme", ctx.theme);
        i0.ɵɵclassProp("vertical-list", ctx.direction === "vertical")("horizontal-list", ctx.direction === "horizontal");
    } }, inputs: { theme: "theme", direction: "direction" }, ngContentSelectors: _c0, decls: 1, vars: 0, template: function NovoListElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵprojection(0);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoListElement, [{
        type: Component,
        args: [{
                selector: 'novo-list',
                host: {
                    '[class.vertical-list]': 'direction === "vertical"',
                    '[class.horizontal-list]': 'direction === "horizontal"',
                    '[attr.theme]': 'theme',
                },
                template: `
        <ng-content></ng-content>
    `,
            }]
    }], function () { return [{ type: i0.ElementRef }]; }, { theme: [{
            type: Input
        }], direction: [{
            type: Input
        }] }); })();
export class NovoListItemElement {
    constructor(element) {
        this.element = element;
        this.avatar = false;
    }
    ngOnInit() {
        this.avatar = !!this.element.nativeElement.querySelector('item-avatar');
    }
}
NovoListItemElement.ɵfac = function NovoListItemElement_Factory(t) { return new (t || NovoListItemElement)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
NovoListItemElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoListItemElement, selectors: [["novo-list-item"]], ngContentSelectors: _c3, decls: 5, vars: 3, consts: [[1, "list-item", 3, "ngClass"]], template: function NovoListItemElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef(_c1);
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵprojection(1);
        i0.ɵɵprojection(2, 1);
        i0.ɵɵelementEnd();
        i0.ɵɵprojection(3, 2);
        i0.ɵɵprojection(4, 3);
    } if (rf & 2) {
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(1, _c2, ctx.avatar));
    } }, directives: [i1.NgClass], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoListItemElement, [{
        type: Component,
        args: [{
                selector: 'novo-list-item',
                template: `
        <div class="list-item" [ngClass]="{'avatar': avatar}">
            <ng-content select="item-header"></ng-content>
            <ng-content select="item-content"></ng-content>
        </div>
        <ng-content></ng-content>
        <ng-content select="item-end"></ng-content>
    `,
            }]
    }], function () { return [{ type: i0.ElementRef }]; }, null); })();
export class NovoItemAvatarElement {
    ngOnChanges(changes) {
        this.iconClass = this.icon ? `bhi-${this.icon}` : null;
        this.classMap = [this.iconClass, this.icon];
    }
    ngOnInit() {
        this.ngOnChanges();
    }
}
NovoItemAvatarElement.ɵfac = function NovoItemAvatarElement_Factory(t) { return new (t || NovoItemAvatarElement)(); };
NovoItemAvatarElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoItemAvatarElement, selectors: [["item-avatar"]], inputs: { icon: "icon" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["theme", "contained", 3, "ngClass", 4, "ngIf"], ["theme", "contained", 3, "ngClass"]], template: function NovoItemAvatarElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, NovoItemAvatarElement_i_0_Template, 1, 1, "i", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.iconClass);
    } }, directives: [i1.NgIf, i1.NgClass], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoItemAvatarElement, [{
        type: Component,
        args: [{
                selector: 'item-avatar',
                template: `
        <i *ngIf="iconClass" [ngClass]="classMap" theme="contained"></i>
    `,
            }]
    }], null, { icon: [{
            type: Input
        }] }); })();
export class NovoItemTitleElement {
}
NovoItemTitleElement.ɵfac = function NovoItemTitleElement_Factory(t) { return new (t || NovoItemTitleElement)(); };
NovoItemTitleElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoItemTitleElement, selectors: [["item-title"]], ngContentSelectors: _c0, decls: 2, vars: 0, template: function NovoItemTitleElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵelementStart(0, "h6");
        i0.ɵɵprojection(1);
        i0.ɵɵelementEnd();
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoItemTitleElement, [{
        type: Component,
        args: [{
                selector: 'item-title',
                template: `
        <h6><ng-content></ng-content></h6>
    `,
            }]
    }], null, null); })();
export class NovoItemHeaderElement {
}
NovoItemHeaderElement.ɵfac = function NovoItemHeaderElement_Factory(t) { return new (t || NovoItemHeaderElement)(); };
NovoItemHeaderElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoItemHeaderElement, selectors: [["item-header"]], ngContentSelectors: _c5, decls: 3, vars: 0, template: function NovoItemHeaderElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef(_c4);
        i0.ɵɵprojection(0);
        i0.ɵɵprojection(1, 1);
        i0.ɵɵprojection(2, 2);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoItemHeaderElement, [{
        type: Component,
        args: [{
                selector: 'item-header',
                template: `
        <ng-content select="item-avatar"></ng-content>
        <ng-content select="item-title"></ng-content>
        <ng-content select="item-header-end"></ng-content>
    `,
            }]
    }], null, null); })();
export class NovoItemDateElement {
}
NovoItemDateElement.ɵfac = function NovoItemDateElement_Factory(t) { return new (t || NovoItemDateElement)(); };
NovoItemDateElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoItemDateElement, selectors: [["item-header-end"]], ngContentSelectors: _c0, decls: 1, vars: 0, template: function NovoItemDateElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵprojection(0);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoItemDateElement, [{
        type: Component,
        args: [{
                selector: 'item-header-end',
                template: `
        <ng-content></ng-content>
    `,
            }]
    }], null, null); })();
export class NovoItemContentElement {
}
NovoItemContentElement.ɵfac = function NovoItemContentElement_Factory(t) { return new (t || NovoItemContentElement)(); };
NovoItemContentElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoItemContentElement, selectors: [["item-content"]], hostVars: 4, hostBindings: function NovoItemContentElement_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassProp("vertical-list", ctx.direction === "vertical")("horizontal-list", ctx.direction === "horizontal");
    } }, inputs: { direction: "direction" }, ngContentSelectors: _c0, decls: 1, vars: 0, template: function NovoItemContentElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵprojection(0);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoItemContentElement, [{
        type: Component,
        args: [{
                selector: 'item-content',
                host: {
                    '[class.vertical-list]': 'direction === "vertical"',
                    '[class.horizontal-list]': 'direction === "horizontal"',
                },
                template: `
        <ng-content></ng-content>
    `,
            }]
    }], null, { direction: [{
            type: Input
        }] }); })();
export class NovoItemEndElement {
}
NovoItemEndElement.ɵfac = function NovoItemEndElement_Factory(t) { return new (t || NovoItemEndElement)(); };
NovoItemEndElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoItemEndElement, selectors: [["item-end"]], ngContentSelectors: _c0, decls: 1, vars: 0, template: function NovoItemEndElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵprojection(0);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoItemEndElement, [{
        type: Component,
        args: [{
                selector: 'item-end',
                template: `
        <ng-content></ng-content>
    `,
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9saXN0L0xpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBb0MsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7O0lBOEN2Rix1QkFBZ0U7OztJQUEzQyx5Q0FBb0I7Ozs7QUFqQ2pELE1BQU0sT0FBTyxlQUFlO0lBTTFCLFlBQW1CLE9BQW1CO1FBQW5CLFlBQU8sR0FBUCxPQUFPLENBQVk7SUFBRyxDQUFDOzs4RUFOL0IsZUFBZTtvREFBZixlQUFlOzs7OztRQUhwQixrQkFBWTs7a0RBR1AsZUFBZTtjQVgzQixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLElBQUksRUFBRTtvQkFDSix1QkFBdUIsRUFBRSwwQkFBMEI7b0JBQ25ELHlCQUF5QixFQUFFLDRCQUE0QjtvQkFDdkQsY0FBYyxFQUFFLE9BQU87aUJBQ3hCO2dCQUNELFFBQVEsRUFBRTs7S0FFUDthQUNKOzZEQUdDLEtBQUs7a0JBREosS0FBSztZQUdOLFNBQVM7a0JBRFIsS0FBSzs7QUFpQlIsTUFBTSxPQUFPLG1CQUFtQjtJQUc5QixZQUFvQixPQUFtQjtRQUFuQixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBRnZDLFdBQU0sR0FBWSxLQUFLLENBQUM7SUFFa0IsQ0FBQztJQUUzQyxRQUFRO1FBQ04sSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzFFLENBQUM7O3NGQVBVLG1CQUFtQjt3REFBbkIsbUJBQW1COztRQVJ4Qiw4QkFDSTtRQUFBLGtCQUFpQztRQUNqQyxxQkFBa0M7UUFDdEMsaUJBQU07UUFDTixxQkFBWTtRQUNaLHFCQUE4Qjs7UUFMUCxnRUFBOEI7O2tEQVFoRCxtQkFBbUI7Y0FYL0IsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLFFBQVEsRUFBRTs7Ozs7OztLQU9QO2FBQ0o7O0FBaUJELE1BQU0sT0FBTyxxQkFBcUI7SUFPaEMsV0FBVyxDQUFDLE9BQXVCO1FBQ2pDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUN2RCxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQzs7MEZBZFUscUJBQXFCOzBEQUFyQixxQkFBcUI7UUFIMUIsa0VBQTREOztRQUF6RCxvQ0FBaUI7O2tEQUdmLHFCQUFxQjtjQU5qQyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLFFBQVEsRUFBRTs7S0FFUDthQUNKO2dCQUdDLElBQUk7a0JBREgsS0FBSzs7QUFzQlIsTUFBTSxPQUFPLG9CQUFvQjs7d0ZBQXBCLG9CQUFvQjt5REFBcEIsb0JBQW9COztRQUh6QiwwQkFBSTtRQUFBLGtCQUFZO1FBQWEsaUJBQUs7O2tEQUc3QixvQkFBb0I7Y0FOaEMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxZQUFZO2dCQUN0QixRQUFRLEVBQUU7O0tBRVA7YUFDSjs7QUFXRCxNQUFNLE9BQU8scUJBQXFCOzswRkFBckIscUJBQXFCOzBEQUFyQixxQkFBcUI7O1FBTDFCLGtCQUFpQztRQUNqQyxxQkFBZ0M7UUFDaEMscUJBQXFDOztrREFHaEMscUJBQXFCO2NBUmpDLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsUUFBUSxFQUFFOzs7O0tBSVA7YUFDSjs7QUFTRCxNQUFNLE9BQU8sbUJBQW1COztzRkFBbkIsbUJBQW1CO3dEQUFuQixtQkFBbUI7O1FBSHhCLGtCQUFZOztrREFHUCxtQkFBbUI7Y0FOL0IsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFFBQVEsRUFBRTs7S0FFUDthQUNKOztBQWFELE1BQU0sT0FBTyxzQkFBc0I7OzRGQUF0QixzQkFBc0I7MkRBQXRCLHNCQUFzQjs7OztRQUgzQixrQkFBWTs7a0RBR1Asc0JBQXNCO2NBVmxDLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsSUFBSSxFQUFFO29CQUNKLHVCQUF1QixFQUFFLDBCQUEwQjtvQkFDbkQseUJBQXlCLEVBQUUsNEJBQTRCO2lCQUN4RDtnQkFDRCxRQUFRLEVBQUU7O0tBRVA7YUFDSjtnQkFHQyxTQUFTO2tCQURSLEtBQUs7O0FBVVIsTUFBTSxPQUFPLGtCQUFrQjs7b0ZBQWxCLGtCQUFrQjt1REFBbEIsa0JBQWtCOztRQUh2QixrQkFBWTs7a0RBR1Asa0JBQWtCO2NBTjlCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsVUFBVTtnQkFDcEIsUUFBUSxFQUFFOztLQUVQO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tbGlzdCcsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLnZlcnRpY2FsLWxpc3RdJzogJ2RpcmVjdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiJyxcbiAgICAnW2NsYXNzLmhvcml6b250YWwtbGlzdF0nOiAnZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIicsXG4gICAgJ1thdHRyLnRoZW1lXSc6ICd0aGVtZScsXG4gIH0sXG4gIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvTGlzdEVsZW1lbnQge1xuICBASW5wdXQoKVxuICB0aGVtZTogc3RyaW5nO1xuICBASW5wdXQoKVxuICBkaXJlY3Rpb246IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZikge31cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1saXN0LWl0ZW0nLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdC1pdGVtXCIgW25nQ2xhc3NdPVwieydhdmF0YXInOiBhdmF0YXJ9XCI+XG4gICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJpdGVtLWhlYWRlclwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIml0ZW0tY29udGVudFwiPjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiaXRlbS1lbmRcIj48L25nLWNvbnRlbnQ+XG4gICAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0xpc3RJdGVtRWxlbWVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGF2YXRhcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZikge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmF2YXRhciA9ICEhdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignaXRlbS1hdmF0YXInKTtcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpdGVtLWF2YXRhcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgICAgIDxpICpuZ0lmPVwiaWNvbkNsYXNzXCIgW25nQ2xhc3NdPVwiY2xhc3NNYXBcIiB0aGVtZT1cImNvbnRhaW5lZFwiPjwvaT5cbiAgICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvSXRlbUF2YXRhckVsZW1lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIGljb246IHN0cmluZztcblxuICBpY29uQ2xhc3M6IHN0cmluZztcbiAgY2xhc3NNYXA6IGFueTtcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzPzogU2ltcGxlQ2hhbmdlcykge1xuICAgIHRoaXMuaWNvbkNsYXNzID0gdGhpcy5pY29uID8gYGJoaS0ke3RoaXMuaWNvbn1gIDogbnVsbDtcbiAgICB0aGlzLmNsYXNzTWFwID0gW3RoaXMuaWNvbkNsYXNzLCB0aGlzLmljb25dO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5uZ09uQ2hhbmdlcygpO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2l0ZW0tdGl0bGUnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8aDY+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvaDY+XG4gICAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0l0ZW1UaXRsZUVsZW1lbnQge31cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaXRlbS1oZWFkZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJpdGVtLWF2YXRhclwiPjwvbmctY29udGVudD5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiaXRlbS10aXRsZVwiPjwvbmctY29udGVudD5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiaXRlbS1oZWFkZXItZW5kXCI+PC9uZy1jb250ZW50PlxuICAgIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9JdGVtSGVhZGVyRWxlbWVudCB7fVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpdGVtLWhlYWRlci1lbmQnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0l0ZW1EYXRlRWxlbWVudCB7fVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpdGVtLWNvbnRlbnQnLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy52ZXJ0aWNhbC1saXN0XSc6ICdkaXJlY3Rpb24gPT09IFwidmVydGljYWxcIicsXG4gICAgJ1tjbGFzcy5ob3Jpem9udGFsLWxpc3RdJzogJ2RpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCInLFxuICB9LFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0l0ZW1Db250ZW50RWxlbWVudCB7XG4gIEBJbnB1dCgpXG4gIGRpcmVjdGlvbjogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpdGVtLWVuZCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvSXRlbUVuZEVsZW1lbnQge31cbiJdfQ==
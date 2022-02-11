// NG2
import { Component, ContentChild, ElementRef, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _c0 = ["*"];
function NovoItemAvatarElement_i_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 1);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", ctx_r0.classMap);
} }
const _c1 = [[["item-avatar"]], [["item-title"]], [["item-header-end"]]];
const _c2 = ["item-avatar", "item-title", "item-header-end"];
const _c3 = function (a0) { return { avatar: a0 }; };
function NovoListItemElement_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵprojection(1, 2);
    i0.ɵɵprojection(2, 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(1, _c3, ctx_r0.avatar));
} }
const _c4 = ["*", [["item-end"]], [["item-header"]], [["item-content"]]];
const _c5 = ["*", "item-end", "item-header", "item-content"];
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
                template: ` <ng-content></ng-content> `,
            }]
    }], function () { return [{ type: i0.ElementRef }]; }, { theme: [{
            type: Input
        }], direction: [{
            type: Input
        }] }); })();
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
                template: ` <i *ngIf="iconClass" [ngClass]="classMap" theme="contained"></i> `,
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
                template: ` <h6><ng-content></ng-content></h6> `,
            }]
    }], null, null); })();
export class NovoItemHeaderElement {
}
NovoItemHeaderElement.ɵfac = function NovoItemHeaderElement_Factory(t) { return new (t || NovoItemHeaderElement)(); };
NovoItemHeaderElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoItemHeaderElement, selectors: [["item-header"]], ngContentSelectors: _c2, decls: 3, vars: 0, template: function NovoItemHeaderElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef(_c1);
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
                template: ` <ng-content></ng-content> `,
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
                template: ` <ng-content></ng-content> `,
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
                template: ` <ng-content></ng-content> `,
            }]
    }], null, null); })();
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
NovoListItemElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoListItemElement, selectors: [["novo-list-item"], ["a", "list-item", ""], ["button", "list-item", ""]], contentQueries: function NovoListItemElement_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        i0.ɵɵcontentQuery(dirIndex, NovoItemContentElement, true);
        i0.ɵɵcontentQuery(dirIndex, NovoItemHeaderElement, true);
    } if (rf & 2) {
        var _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx._content = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx._header = _t.first);
    } }, ngContentSelectors: _c5, decls: 3, vars: 1, consts: [["class", "list-item", 3, "ngClass", 4, "ngIf"], [1, "list-item", 3, "ngClass"]], template: function NovoListItemElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef(_c4);
        i0.ɵɵtemplate(0, NovoListItemElement_div_0_Template, 3, 3, "div", 0);
        i0.ɵɵprojection(1);
        i0.ɵɵprojection(2, 1);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx._content || ctx._header);
    } }, directives: [i1.NgIf, i1.NgClass], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoListItemElement, [{
        type: Component,
        args: [{
                selector: 'novo-list-item, a[list-item], button[list-item]',
                template: `
    <div class="list-item" [ngClass]="{ avatar: avatar }" *ngIf="_content || _header">
      <ng-content select="item-header"></ng-content>
      <ng-content select="item-content"></ng-content>
    </div>
    <ng-content></ng-content>
    <ng-content select="item-end"></ng-content>
  `,
            }]
    }], function () { return [{ type: i0.ElementRef }]; }, { _content: [{
            type: ContentChild,
            args: [NovoItemContentElement]
        }], _header: [{
            type: ContentChild,
            args: [NovoItemHeaderElement]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9saXN0L0xpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQW9DLE1BQU0sZUFBZSxDQUFDOzs7OztJQXNCL0YsdUJBQWdFOzs7SUFBM0MseUNBQW9COzs7Ozs7SUErRG5ELDhCQUNFO0lBQUEscUJBQWlDO0lBQ2pDLHFCQUFrQztJQUNwQyxpQkFBTTs7O0lBSGlCLG1FQUE4Qjs7OztBQTFFekQsTUFBTSxPQUFPLGVBQWU7SUFNMUIsWUFBbUIsT0FBbUI7UUFBbkIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtJQUFHLENBQUM7OzhFQU4vQixlQUFlO29EQUFmLGVBQWU7Ozs7O1FBRmQsa0JBQVk7O2tEQUViLGVBQWU7Y0FUM0IsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxXQUFXO2dCQUNyQixJQUFJLEVBQUU7b0JBQ0osdUJBQXVCLEVBQUUsMEJBQTBCO29CQUNuRCx5QkFBeUIsRUFBRSw0QkFBNEI7b0JBQ3ZELGNBQWMsRUFBRSxPQUFPO2lCQUN4QjtnQkFDRCxRQUFRLEVBQUUsNkJBQTZCO2FBQ3hDOzZEQUdDLEtBQUs7a0JBREosS0FBSztZQUdOLFNBQVM7a0JBRFIsS0FBSzs7QUFVUixNQUFNLE9BQU8scUJBQXFCO0lBT2hDLFdBQVcsQ0FBQyxPQUF1QjtRQUNqQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDdkQsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7OzBGQWRVLHFCQUFxQjswREFBckIscUJBQXFCO1FBRnBCLGtFQUE0RDs7UUFBekQsb0NBQWlCOztrREFFckIscUJBQXFCO2NBSmpDLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsUUFBUSxFQUFFLG9FQUFvRTthQUMvRTtnQkFHQyxJQUFJO2tCQURILEtBQUs7O0FBb0JSLE1BQU0sT0FBTyxvQkFBb0I7O3dGQUFwQixvQkFBb0I7eURBQXBCLG9CQUFvQjs7UUFGbkIsMEJBQUk7UUFBQSxrQkFBWTtRQUFhLGlCQUFLOztrREFFbkMsb0JBQW9CO2NBSmhDLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsUUFBUSxFQUFFLHNDQUFzQzthQUNqRDs7QUFXRCxNQUFNLE9BQU8scUJBQXFCOzswRkFBckIscUJBQXFCOzBEQUFyQixxQkFBcUI7O1FBTDlCLGtCQUFpQztRQUNqQyxxQkFBZ0M7UUFDaEMscUJBQXFDOztrREFHNUIscUJBQXFCO2NBUmpDLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsUUFBUSxFQUFFOzs7O0dBSVQ7YUFDRjs7QUFPRCxNQUFNLE9BQU8sbUJBQW1COztzRkFBbkIsbUJBQW1CO3dEQUFuQixtQkFBbUI7O1FBRmxCLGtCQUFZOztrREFFYixtQkFBbUI7Y0FKL0IsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFFBQVEsRUFBRSw2QkFBNkI7YUFDeEM7O0FBV0QsTUFBTSxPQUFPLHNCQUFzQjs7NEZBQXRCLHNCQUFzQjsyREFBdEIsc0JBQXNCOzs7O1FBRnJCLGtCQUFZOztrREFFYixzQkFBc0I7Y0FSbEMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4QixJQUFJLEVBQUU7b0JBQ0osdUJBQXVCLEVBQUUsMEJBQTBCO29CQUNuRCx5QkFBeUIsRUFBRSw0QkFBNEI7aUJBQ3hEO2dCQUNELFFBQVEsRUFBRSw2QkFBNkI7YUFDeEM7Z0JBR0MsU0FBUztrQkFEUixLQUFLOztBQVFSLE1BQU0sT0FBTyxrQkFBa0I7O29GQUFsQixrQkFBa0I7dURBQWxCLGtCQUFrQjs7UUFGakIsa0JBQVk7O2tEQUViLGtCQUFrQjtjQUo5QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLFFBQVEsRUFBRSw2QkFBNkI7YUFDeEM7O0FBY0QsTUFBTSxPQUFPLG1CQUFtQjtJQUs5QixZQUFvQixPQUFtQjtRQUFuQixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBSnZDLFdBQU0sR0FBWSxLQUFLLENBQUM7SUFJa0IsQ0FBQztJQUUzQyxRQUFRO1FBQ04sSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzFFLENBQUM7O3NGQVRVLG1CQUFtQjt3REFBbkIsbUJBQW1CO29DQUVoQixzQkFBc0I7b0NBQ3RCLHFCQUFxQjs7Ozs7OztRQVhqQyxvRUFDRTtRQUdGLGtCQUFZO1FBQ1oscUJBQThCOztRQUx3QixrREFBMkI7O2tEQVF4RSxtQkFBbUI7Y0FYL0IsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxpREFBaUQ7Z0JBQzNELFFBQVEsRUFBRTs7Ozs7OztHQU9UO2FBQ0Y7NkRBR3VDLFFBQVE7a0JBQTdDLFlBQVk7bUJBQUMsc0JBQXNCO1lBQ0MsT0FBTztrQkFBM0MsWUFBWTttQkFBQyxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkLCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1saXN0JyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MudmVydGljYWwtbGlzdF0nOiAnZGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCInLFxuICAgICdbY2xhc3MuaG9yaXpvbnRhbC1saXN0XSc6ICdkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiJyxcbiAgICAnW2F0dHIudGhlbWVdJzogJ3RoZW1lJyxcbiAgfSxcbiAgdGVtcGxhdGU6IGAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PiBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvTGlzdEVsZW1lbnQge1xuICBASW5wdXQoKVxuICB0aGVtZTogc3RyaW5nO1xuICBASW5wdXQoKVxuICBkaXJlY3Rpb246IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZikge31cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaXRlbS1hdmF0YXInLFxuICB0ZW1wbGF0ZTogYCA8aSAqbmdJZj1cImljb25DbGFzc1wiIFtuZ0NsYXNzXT1cImNsYXNzTWFwXCIgdGhlbWU9XCJjb250YWluZWRcIj48L2k+IGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9JdGVtQXZhdGFyRWxlbWVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0IHtcbiAgQElucHV0KClcbiAgaWNvbjogc3RyaW5nO1xuXG4gIGljb25DbGFzczogc3RyaW5nO1xuICBjbGFzc01hcDogYW55O1xuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM/OiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgdGhpcy5pY29uQ2xhc3MgPSB0aGlzLmljb24gPyBgYmhpLSR7dGhpcy5pY29ufWAgOiBudWxsO1xuICAgIHRoaXMuY2xhc3NNYXAgPSBbdGhpcy5pY29uQ2xhc3MsIHRoaXMuaWNvbl07XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm5nT25DaGFuZ2VzKCk7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaXRlbS10aXRsZScsXG4gIHRlbXBsYXRlOiBgIDxoNj48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9oNj4gYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0l0ZW1UaXRsZUVsZW1lbnQge31cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaXRlbS1oZWFkZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIml0ZW0tYXZhdGFyXCI+PC9uZy1jb250ZW50PlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIml0ZW0tdGl0bGVcIj48L25nLWNvbnRlbnQ+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiaXRlbS1oZWFkZXItZW5kXCI+PC9uZy1jb250ZW50PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvSXRlbUhlYWRlckVsZW1lbnQge31cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaXRlbS1oZWFkZXItZW5kJyxcbiAgdGVtcGxhdGU6IGAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PiBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvSXRlbURhdGVFbGVtZW50IHt9XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2l0ZW0tY29udGVudCcsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLnZlcnRpY2FsLWxpc3RdJzogJ2RpcmVjdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiJyxcbiAgICAnW2NsYXNzLmhvcml6b250YWwtbGlzdF0nOiAnZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIicsXG4gIH0sXG4gIHRlbXBsYXRlOiBgIDxuZy1jb250ZW50PjwvbmctY29udGVudD4gYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0l0ZW1Db250ZW50RWxlbWVudCB7XG4gIEBJbnB1dCgpXG4gIGRpcmVjdGlvbjogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpdGVtLWVuZCcsXG4gIHRlbXBsYXRlOiBgIDxuZy1jb250ZW50PjwvbmctY29udGVudD4gYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0l0ZW1FbmRFbGVtZW50IHt9XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tbGlzdC1pdGVtLCBhW2xpc3QtaXRlbV0sIGJ1dHRvbltsaXN0LWl0ZW1dJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwibGlzdC1pdGVtXCIgW25nQ2xhc3NdPVwieyBhdmF0YXI6IGF2YXRhciB9XCIgKm5nSWY9XCJfY29udGVudCB8fCBfaGVhZGVyXCI+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJpdGVtLWhlYWRlclwiPjwvbmctY29udGVudD5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIml0ZW0tY29udGVudFwiPjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiaXRlbS1lbmRcIj48L25nLWNvbnRlbnQ+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9MaXN0SXRlbUVsZW1lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBhdmF0YXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQENvbnRlbnRDaGlsZChOb3ZvSXRlbUNvbnRlbnRFbGVtZW50KSBfY29udGVudDogTm92b0l0ZW1Db250ZW50RWxlbWVudDtcbiAgQENvbnRlbnRDaGlsZChOb3ZvSXRlbUhlYWRlckVsZW1lbnQpIF9oZWFkZXI6IE5vdm9JdGVtSGVhZGVyRWxlbWVudDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5hdmF0YXIgPSAhIXRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2l0ZW0tYXZhdGFyJyk7XG4gIH1cbn1cbiJdfQ==
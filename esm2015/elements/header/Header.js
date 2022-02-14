import { __decorate, __metadata } from "tslib";
import { Component, HostBinding, Input } from '@angular/core';
import { BooleanInput } from '../../utils';
import * as i0 from "@angular/core";
import * as i1 from "../button/Button";
import * as i2 from "@angular/common";
import * as i3 from "../common/typography/title/title.component";
import * as i4 from "../icon/Icon";
const _c0 = ["*"];
function NovoHeaderComponent_ng_container_3_novo_icon_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "novo-icon", 8);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r2.icon);
} }
function NovoHeaderComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, NovoHeaderComponent_ng_container_3_novo_icon_1_Template, 2, 1, "novo-icon", 4);
    i0.ɵɵelementStart(2, "div", 5);
    i0.ɵɵelementStart(3, "novo-title", 6);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "novo-title", 7);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.icon);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.subTitle);
} }
function NovoHeaderComponent_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵprojection(1, 6);
    i0.ɵɵelementStart(2, "div", 5);
    i0.ɵɵprojection(3, 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} }
const _c1 = [[["", "prefix", ""]], [["section"]], [["utils"]], [["", "suffix", ""]], [["novo-action"], ["", "novo-action", ""]], "*", [["novo-icon"], ["", "novo-icon", ""]], [["h1"], ["h2"], ["h3"], ["h4"], ["h5"], ["h6"], ["small"], ["novo-title"], ["", "novo-title", ""], ["", "novo-subtitle", ""]]];
const _c2 = ["[prefix]", "section", "utils", "[suffix]", "novo-action,[novo-action]", "*", "novo-icon, [novo-icon]", "h1, h2, h3, h4, h5, h6, small, novo-title, [novo-title], [novo-subtitle]"];
export class NovoHeaderSpacer {
}
NovoHeaderSpacer.ɵfac = function NovoHeaderSpacer_Factory(t) { return new (t || NovoHeaderSpacer)(); };
NovoHeaderSpacer.ɵcmp = i0.ɵɵdefineComponent({ type: NovoHeaderSpacer, selectors: [["header-spacer"]], ngContentSelectors: _c0, decls: 1, vars: 0, template: function NovoHeaderSpacer_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵprojection(0);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoHeaderSpacer, [{
        type: Component,
        args: [{
                selector: 'header-spacer',
                template: `<ng-content></ng-content>`,
            }]
    }], null, null); })();
export class NovoUtilsComponent {
}
NovoUtilsComponent.ɵfac = function NovoUtilsComponent_Factory(t) { return new (t || NovoUtilsComponent)(); };
NovoUtilsComponent.ɵcmp = i0.ɵɵdefineComponent({ type: NovoUtilsComponent, selectors: [["utils"]], ngContentSelectors: _c0, decls: 1, vars: 0, template: function NovoUtilsComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵprojection(0);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoUtilsComponent, [{
        type: Component,
        args: [{
                selector: 'utils',
                template: `<ng-content></ng-content>`,
            }]
    }], null, null); })();
export class NovoUtilActionComponent {
}
NovoUtilActionComponent.ɵfac = function NovoUtilActionComponent_Factory(t) { return new (t || NovoUtilActionComponent)(); };
NovoUtilActionComponent.ɵcmp = i0.ɵɵdefineComponent({ type: NovoUtilActionComponent, selectors: [["util-action"], ["novo-action"]], inputs: { icon: "icon", inverse: "inverse", disabled: "disabled" }, ngContentSelectors: _c0, decls: 2, vars: 3, consts: [["theme", "icon", 3, "icon", "disabled"]], template: function NovoUtilActionComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵelementStart(0, "button", 0);
        i0.ɵɵprojection(1);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("icon", ctx.icon)("disabled", ctx.disabled);
        i0.ɵɵattribute("inverse", ctx.inverse);
    } }, directives: [i1.NovoButtonElement], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoUtilActionComponent, [{
        type: Component,
        args: [{
                selector: 'util-action, novo-action',
                template: `
    <button theme="icon" [icon]="icon" [attr.inverse]="inverse" [disabled]="disabled">
      <ng-content></ng-content>
    </button>
  `,
            }]
    }], null, { icon: [{
            type: Input
        }], inverse: [{
            type: Input
        }], disabled: [{
            type: Input
        }] }); })();
export class NovoHeaderComponent {
    constructor() {
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
    set icon(icon) {
        this._icon = `bhi-${icon}`;
    }
    get icon() {
        return this._icon;
    }
}
NovoHeaderComponent.ɵfac = function NovoHeaderComponent_Factory(t) { return new (t || NovoHeaderComponent)(); };
NovoHeaderComponent.ɵcmp = i0.ɵɵdefineComponent({ type: NovoHeaderComponent, selectors: [["novo-header"], ["header", "theme", ""]], hostVars: 11, hostBindings: function NovoHeaderComponent_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵattribute("theme", ctx.theme);
        i0.ɵɵclassMap(ctx.headerClass);
        i0.ɵɵclassProp("condensed", ctx.condensed)("header-size-small", ctx.hb_isSizeSmall)("header-size-large", ctx.hb_isSizeLarge)("header-size-default", ctx.hb_isSizeDefault);
    } }, inputs: { condensed: "condensed", title: "title", subTitle: "subTitle", size: "size", theme: "theme", icon: "icon" }, ngContentSelectors: _c2, decls: 12, vars: 2, consts: [[1, "header-title"], [4, "ngIf"], [1, "spacer"], [1, "header-actions"], ["class", "header-icon", 4, "ngIf"], [1, "header-titles"], ["size", "large"], ["size", "small"], [1, "header-icon"]], template: function NovoHeaderComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef(_c1);
        i0.ɵɵelementStart(0, "section");
        i0.ɵɵelementStart(1, "div", 0);
        i0.ɵɵprojection(2);
        i0.ɵɵtemplate(3, NovoHeaderComponent_ng_container_3_Template, 7, 3, "ng-container", 1);
        i0.ɵɵtemplate(4, NovoHeaderComponent_ng_container_4_Template, 4, 0, "ng-container", 1);
        i0.ɵɵelementEnd();
        i0.ɵɵprojection(5, 1);
        i0.ɵɵelement(6, "span", 2);
        i0.ɵɵprojection(7, 2);
        i0.ɵɵprojection(8, 3);
        i0.ɵɵelementStart(9, "div", 3);
        i0.ɵɵprojection(10, 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵprojection(11, 5);
    } if (rf & 2) {
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.title);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.title);
    } }, directives: [i2.NgIf, i3.NovoTitle, i4.NovoIconComponent], encapsulation: 2 });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoHeaderComponent.prototype, "condensed", void 0);
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoHeaderComponent, [{
        type: Component,
        args: [{
                selector: 'novo-header,header[theme]',
                template: `
    <section>
      <div class="header-title">
        <ng-content select="[prefix]"></ng-content>
        <ng-container *ngIf="title">
          <novo-icon class="header-icon" *ngIf="icon">{{ icon }}</novo-icon>
          <div class="header-titles">
            <novo-title size="large">{{ title }}</novo-title>
            <novo-title size="small">{{ subTitle }}</novo-title>
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
      <ng-content select="utils"></ng-content>
      <ng-content select="[suffix]"></ng-content>
      <div class="header-actions">
        <ng-content select="novo-action,[novo-action]"></ng-content>
      </div>
    </section>
    <ng-content></ng-content>
  `,
            }]
    }], null, { headerClass: [{
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
        }], icon: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVhZGVyLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2hlYWRlci9IZWFkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDOzs7Ozs7OztJQXNDakMsb0NBQTRDO0lBQUEsWUFBVTtJQUFBLGlCQUFZOzs7SUFBdEIsZUFBVTtJQUFWLGlDQUFVOzs7SUFEeEQsNkJBQ0U7SUFBQSwrRkFBNEM7SUFDNUMsOEJBQ0U7SUFBQSxxQ0FBeUI7SUFBQSxZQUFXO0lBQUEsaUJBQWE7SUFDakQscUNBQXlCO0lBQUEsWUFBYztJQUFBLGlCQUFhO0lBQ3RELGlCQUFNO0lBQ1IsMEJBQWU7OztJQUxrQixlQUFZO0lBQVosa0NBQVk7SUFFaEIsZUFBVztJQUFYLGtDQUFXO0lBQ1gsZUFBYztJQUFkLHFDQUFjOzs7SUFHM0MsNkJBQ0U7SUFBQSxxQkFBNEM7SUFDNUMsOEJBQ0U7SUFBQSxxQkFBOEY7SUFDaEcsaUJBQU07SUFDUiwwQkFBZTs7OztBQTNDdkIsTUFBTSxPQUFPLGdCQUFnQjs7Z0ZBQWhCLGdCQUFnQjtxREFBaEIsZ0JBQWdCOztRQUZoQixrQkFBWTs7a0RBRVosZ0JBQWdCO2NBSjVCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsUUFBUSxFQUFFLDJCQUEyQjthQUN0Qzs7QUFPRCxNQUFNLE9BQU8sa0JBQWtCOztvRkFBbEIsa0JBQWtCO3VEQUFsQixrQkFBa0I7O1FBRmxCLGtCQUFZOztrREFFWixrQkFBa0I7Y0FKOUIsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxPQUFPO2dCQUNqQixRQUFRLEVB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ZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJy4uLy4uL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaGVhZGVyLXNwYWNlcicsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9IZWFkZXJTcGFjZXIge31cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndXRpbHMnLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5gLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvVXRpbHNDb21wb25lbnQge31cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndXRpbC1hY3Rpb24sIG5vdm8tYWN0aW9uJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8YnV0dG9uIHRoZW1lPVwiaWNvblwiIFtpY29uXT1cImljb25cIiBbYXR0ci5pbnZlcnNlXT1cImludmVyc2VcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2J1dHRvbj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1V0aWxBY3Rpb25Db21wb25lbnQge1xuICBASW5wdXQoKVxuICBwdWJsaWMgaWNvbjogc3RyaW5nO1xuICBASW5wdXQoKVxuICBwdWJsaWMgaW52ZXJzZTogYm9vbGVhbjtcbiAgQElucHV0KClcbiAgcHVibGljIGRpc2FibGVkOiBib29sZWFuO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWhlYWRlcixoZWFkZXJbdGhlbWVdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c2VjdGlvbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItdGl0bGVcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3ByZWZpeF1cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJ0aXRsZVwiPlxuICAgICAgICAgIDxub3ZvLWljb24gY2xhc3M9XCJoZWFkZXItaWNvblwiICpuZ0lmPVwiaWNvblwiPnt7IGljb24gfX08L25vdm8taWNvbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLXRpdGxlc1wiPlxuICAgICAgICAgICAgPG5vdm8tdGl0bGUgc2l6ZT1cImxhcmdlXCI+e3sgdGl0bGUgfX08L25vdm8tdGl0bGU+XG4gICAgICAgICAgICA8bm92by10aXRsZSBzaXplPVwic21hbGxcIj57eyBzdWJUaXRsZSB9fTwvbm92by10aXRsZT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhdGl0bGVcIj5cbiAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJub3ZvLWljb24sIFtub3ZvLWljb25dXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItdGl0bGVzXCI+XG4gICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJoMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBzbWFsbCwgbm92by10aXRsZSwgW25vdm8tdGl0bGVdLCBbbm92by1zdWJ0aXRsZV1cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC9kaXY+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJzZWN0aW9uXCI+PC9uZy1jb250ZW50PlxuICAgICAgPHNwYW4gY2xhc3M9XCJzcGFjZXJcIj48L3NwYW4+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJ1dGlsc1wiPjwvbmctY29udGVudD5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltzdWZmaXhdXCI+PC9uZy1jb250ZW50PlxuICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci1hY3Rpb25zXCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5vdm8tYWN0aW9uLFtub3ZvLWFjdGlvbl1cIj48L25nLWNvbnRlbnQ+XG4gICAgICA8L2Rpdj5cbiAgICA8L3NlY3Rpb24+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvSGVhZGVyQ29tcG9uZW50IHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIHB1YmxpYyBoZWFkZXJDbGFzczogc3RyaW5nID0gJ25vdm8taGVhZGVyJztcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5jb25kZW5zZWQnKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgcHVibGljIGNvbmRlbnNlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBwdWJsaWMgdGl0bGU6IHN0cmluZztcbiAgQElucHV0KClcbiAgcHVibGljIHN1YlRpdGxlOiBzdHJpbmc7XG4gIHB1YmxpYyBpbnZlcnNlOiBzdHJpbmcgPSAnaW52ZXJzZSc7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNpemU6ICdzbWFsbCcgfCAnbWVkaXVtJyB8ICdsYXJnZSc7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5oZWFkZXItc2l6ZS1zbWFsbCcpXG4gIGdldCBoYl9pc1NpemVTbWFsbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zaXplID09PSAnc21hbGwnO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5oZWFkZXItc2l6ZS1sYXJnZScpXG4gIGdldCBoYl9pc1NpemVMYXJnZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zaXplID09PSAnbGFyZ2UnO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5oZWFkZXItc2l6ZS1kZWZhdWx0JylcbiAgZ2V0IGhiX2lzU2l6ZURlZmF1bHQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICFbJ3NtYWxsJywgJ2xhcmdlJ10uaW5jbHVkZXModGhpcy5zaXplKTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci50aGVtZScpXG4gIEBJbnB1dCgpXG4gIHNldCB0aGVtZSh0aGVtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fdGhlbWUgPSB0aGVtZTtcbiAgICB0aGlzLmludmVyc2UgPSB0aGVtZSA9PT0gJ3doaXRlJyB8fCB0aGVtZSA9PT0gJ29mZi13aGl0ZScgfHwgdGhlbWUgPT09ICdsaWdodCcgPyB1bmRlZmluZWQgOiAnaW52ZXJzZSc7XG4gIH1cblxuICBnZXQgdGhlbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fdGhlbWU7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgaWNvbihpY29uOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9pY29uID0gYGJoaS0ke2ljb259YDtcbiAgfVxuXG4gIGdldCBpY29uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2ljb247XG4gIH1cblxuICBwcml2YXRlIF90aGVtZTogc3RyaW5nO1xuICBwcml2YXRlIF9pY29uOiBzdHJpbmc7XG59XG4iXX0=
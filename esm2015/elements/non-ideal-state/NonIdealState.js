// NG2
import { Component, HostBinding, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../icon/Icon";
import * as i3 from "../common/typography/title/title.component";
import * as i4 from "../common/typography/text/text.component";
function NonIdealStateElement_novo_icon_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "novo-icon", 3);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("color", ctx_r0.theme);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r0.icon);
} }
function NonIdealStateElement_novo_title_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "novo-title", 4);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r1.title);
} }
function NonIdealStateElement_novo_text_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "novo-text", 5);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r2.description);
} }
const _c0 = ["*"];
export class NonIdealStateElement {
    constructor() {
        this.hb_class = 'novo-non-ideal-state';
        this.theme = 'light';
    }
}
NonIdealStateElement.ɵfac = function NonIdealStateElement_Factory(t) { return new (t || NonIdealStateElement)(); };
NonIdealStateElement.ɵcmp = i0.ɵɵdefineComponent({ type: NonIdealStateElement, selectors: [["novo-non-ideal-state"]], hostVars: 2, hostBindings: function NonIdealStateElement_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassMap(ctx.hb_class);
    } }, inputs: { theme: "theme", icon: "icon", title: "title", description: "description" }, ngContentSelectors: _c0, decls: 4, vars: 3, consts: [["class", "novo-non-ideal-state-icon", 3, "color", 4, "ngIf"], ["class", "novo-non-ideal-state-title", "marginBefore", "", 4, "ngIf"], ["block", "", "marginBefore", "", "marginAfter", "", 4, "ngIf"], [1, "novo-non-ideal-state-icon", 3, "color"], ["marginBefore", "", 1, "novo-non-ideal-state-title"], ["block", "", "marginBefore", "", "marginAfter", ""]], template: function NonIdealStateElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵtemplate(0, NonIdealStateElement_novo_icon_0_Template, 2, 2, "novo-icon", 0);
        i0.ɵɵtemplate(1, NonIdealStateElement_novo_title_1_Template, 2, 1, "novo-title", 1);
        i0.ɵɵtemplate(2, NonIdealStateElement_novo_text_2_Template, 2, 1, "novo-text", 2);
        i0.ɵɵprojection(3);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.icon);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.title);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.description);
    } }, directives: [i1.NgIf, i2.NovoIconComponent, i3.NovoTitle, i4.NovoText], styles: ["[_nghost-%COMP%]{align-items:center;display:flex;flex-direction:column;justify-content:center;padding:2rem;text-align:center}[_nghost-%COMP%]   .novo-non-ideal-state-icon[_ngcontent-%COMP%]{font-size:xx-large}[_nghost-%COMP%]   button[_ngcontent-%COMP%]{display:inline-block}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NonIdealStateElement, [{
        type: Component,
        args: [{
                selector: 'novo-non-ideal-state',
                styleUrls: ['./NonIdealState.scss'],
                template: `
    <novo-icon class="novo-non-ideal-state-icon" *ngIf="icon" [color]="theme">{{ icon }}</novo-icon>
    <novo-title class="novo-non-ideal-state-title" *ngIf="title" marginBefore>{{ title }}</novo-title>
    <novo-text *ngIf="description" block marginBefore marginAfter>{{ description }}</novo-text>
    <ng-content></ng-content>
  `,
            }]
    }], null, { hb_class: [{
            type: HostBinding,
            args: ['class']
        }], theme: [{
            type: Input
        }], icon: [{
            type: Input
        }], title: [{
            type: Input
        }], description: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm9uSWRlYWxTdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9ub24taWRlYWwtc3RhdGUvTm9uSWRlYWxTdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7O0lBTTFELG9DQUEwRTtJQUFBLFlBQVU7SUFBQSxpQkFBWTs7O0lBQXRDLG9DQUFlO0lBQUMsZUFBVTtJQUFWLGlDQUFVOzs7SUFDcEYscUNBQTBFO0lBQUEsWUFBVztJQUFBLGlCQUFhOzs7SUFBeEIsZUFBVztJQUFYLGtDQUFXOzs7SUFDckYsb0NBQThEO0lBQUEsWUFBaUI7SUFBQSxpQkFBWTs7O0lBQTdCLGVBQWlCO0lBQWpCLHdDQUFpQjs7O0FBSW5GLE1BQU0sT0FBTyxvQkFBb0I7SUFWakM7UUFZRSxhQUFRLEdBQUcsc0JBQXNCLENBQUM7UUFHbEMsVUFBSyxHQUFXLE9BQU8sQ0FBQztLQU96Qjs7d0ZBWlksb0JBQW9CO3lEQUFwQixvQkFBb0I7Ozs7UUFON0IsaUZBQTBFO1FBQzFFLG1GQUEwRTtRQUMxRSxpRkFBOEQ7UUFDOUQsa0JBQVk7O1FBSGlDLCtCQUFZO1FBQ1YsZUFBYTtRQUFiLGdDQUFhO1FBQ2pELGVBQW1CO1FBQW5CLHNDQUFtQjs7a0RBSXJCLG9CQUFvQjtjQVZoQyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7Z0JBQ25DLFFBQVEsRUFBRTs7Ozs7R0FLVDthQUNGO2dCQUdDLFFBQVE7a0JBRFAsV0FBVzttQkFBQyxPQUFPO1lBSXBCLEtBQUs7a0JBREosS0FBSztZQUdOLElBQUk7a0JBREgsS0FBSztZQUdOLEtBQUs7a0JBREosS0FBSztZQUdOLFdBQVc7a0JBRFYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1ub24taWRlYWwtc3RhdGUnLFxuICBzdHlsZVVybHM6IFsnLi9Ob25JZGVhbFN0YXRlLnNjc3MnXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bm92by1pY29uIGNsYXNzPVwibm92by1ub24taWRlYWwtc3RhdGUtaWNvblwiICpuZ0lmPVwiaWNvblwiIFtjb2xvcl09XCJ0aGVtZVwiPnt7IGljb24gfX08L25vdm8taWNvbj5cbiAgICA8bm92by10aXRsZSBjbGFzcz1cIm5vdm8tbm9uLWlkZWFsLXN0YXRlLXRpdGxlXCIgKm5nSWY9XCJ0aXRsZVwiIG1hcmdpbkJlZm9yZT57eyB0aXRsZSB9fTwvbm92by10aXRsZT5cbiAgICA8bm92by10ZXh0ICpuZ0lmPVwiZGVzY3JpcHRpb25cIiBibG9jayBtYXJnaW5CZWZvcmUgbWFyZ2luQWZ0ZXI+e3sgZGVzY3JpcHRpb24gfX08L25vdm8tdGV4dD5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vbklkZWFsU3RhdGVFbGVtZW50IHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIGhiX2NsYXNzID0gJ25vdm8tbm9uLWlkZWFsLXN0YXRlJztcblxuICBASW5wdXQoKVxuICB0aGVtZTogc3RyaW5nID0gJ2xpZ2h0JztcbiAgQElucHV0KClcbiAgaWNvbjogc3RyaW5nO1xuICBASW5wdXQoKVxuICB0aXRsZTogc3RyaW5nO1xuICBASW5wdXQoKVxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xufVxuIl19
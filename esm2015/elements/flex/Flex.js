// NG2
import { Component, HostBinding, Input } from '@angular/core';
import * as i0 from "@angular/core";
const _c0 = ["*"];
export class NovoFlexElement {
    constructor() {
        this.direction = 'row';
        this.align = 'center';
        this.justify = 'flex-start';
        this.wrap = 'nowrap';
        this.gap = 'nowrap';
    }
    get display() {
        return 'flex';
    }
}
NovoFlexElement.ɵfac = function NovoFlexElement_Factory(t) { return new (t || NovoFlexElement)(); };
NovoFlexElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoFlexElement, selectors: [["novo-flex"]], hostVars: 12, hostBindings: function NovoFlexElement_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵstyleProp("display", ctx.display)("flex-direction", ctx.direction)("align-items", ctx.align)("justify-content", ctx.justify)("flex-wrap", ctx.wrap)("gap", ctx.gap);
    } }, inputs: { direction: "direction", align: "align", justify: "justify", wrap: "wrap", gap: "gap" }, ngContentSelectors: _c0, decls: 1, vars: 0, template: function NovoFlexElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵprojection(0);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoFlexElement, [{
        type: Component,
        args: [{
                selector: 'novo-flex',
                template: ` <ng-content></ng-content> `,
            }]
    }], null, { display: [{
            type: HostBinding,
            args: ['style.display']
        }], direction: [{
            type: HostBinding,
            args: ['style.flex-direction']
        }, {
            type: Input
        }], align: [{
            type: HostBinding,
            args: ['style.align-items']
        }, {
            type: Input
        }], justify: [{
            type: HostBinding,
            args: ['style.justify-content']
        }, {
            type: Input
        }], wrap: [{
            type: HostBinding,
            args: ['style.flex-wrap']
        }, {
            type: Input
        }], gap: [{
            type: HostBinding,
            args: ['style.gap']
        }, {
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmxleC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9mbGV4L0ZsZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBTTlELE1BQU0sT0FBTyxlQUFlO0lBSjVCO1FBWUUsY0FBUyxHQUFXLEtBQUssQ0FBQztRQUkxQixVQUFLLEdBQVcsUUFBUSxDQUFDO1FBSXpCLFlBQU8sR0FBVyxZQUFZLENBQUM7UUFJL0IsU0FBSSxHQUFXLFFBQVEsQ0FBQztRQUl4QixRQUFHLEdBQVcsUUFBUSxDQUFDO0tBS3hCO0lBNUJDLElBQ0ksT0FBTztRQUNULE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7OzhFQUpVLGVBQWU7b0RBQWYsZUFBZTs7OztRQUZkLGtCQUFZOztrREFFYixlQUFlO2NBSjNCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsV0FBVztnQkFDckIsUUFBUSxFQUFFLDZCQUE2QjthQUN4QztnQkFHSyxPQUFPO2tCQURWLFdBQVc7bUJBQUMsZUFBZTtZQU81QixTQUFTO2tCQUZSLFdBQVc7bUJBQUMsc0JBQXNCOztrQkFDbEMsS0FBSztZQUtOLEtBQUs7a0JBRkosV0FBVzttQkFBQyxtQkFBbUI7O2tCQUMvQixLQUFLO1lBS04sT0FBTztrQkFGTixXQUFXO21CQUFDLHVCQUF1Qjs7a0JBQ25DLEtBQUs7WUFLTixJQUFJO2tCQUZILFdBQVc7bUJBQUMsaUJBQWlCOztrQkFDN0IsS0FBSztZQUtOLEdBQUc7a0JBRkYsV0FBVzttQkFBQyxXQUFXOztrQkFDdkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1mbGV4JyxcbiAgdGVtcGxhdGU6IGAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PiBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRmxleEVsZW1lbnQge1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmRpc3BsYXknKVxuICBnZXQgZGlzcGxheSgpOiBzdHJpbmcge1xuICAgIHJldHVybiAnZmxleCc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmZsZXgtZGlyZWN0aW9uJylcbiAgQElucHV0KClcbiAgZGlyZWN0aW9uOiBzdHJpbmcgPSAncm93JztcblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmFsaWduLWl0ZW1zJylcbiAgQElucHV0KClcbiAgYWxpZ246IHN0cmluZyA9ICdjZW50ZXInO1xuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuanVzdGlmeS1jb250ZW50JylcbiAgQElucHV0KClcbiAganVzdGlmeTogc3RyaW5nID0gJ2ZsZXgtc3RhcnQnO1xuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuZmxleC13cmFwJylcbiAgQElucHV0KClcbiAgd3JhcDogc3RyaW5nID0gJ25vd3JhcCc7XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5nYXAnKVxuICBASW5wdXQoKVxuICBnYXA6IHN0cmluZyA9ICdub3dyYXAnO1xuXG4gIC8vIGdldCBoYl9ncmlkQ29scygpIHtcbiAgLy8gICByZXR1cm4gdGhpcy5fc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShgcmVwZWF0KCR7dGhpcy5jb2x1bW5zfSwgJHtSZXNvdXJjZVNldHRpbmdzLmV2ZW50V2lkdGh9KWApO1xuICAvLyB9XG59XG4iXX0=
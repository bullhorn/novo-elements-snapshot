import { __decorate, __metadata } from "tslib";
// NG2
import { ChangeDetectionStrategy, Component, ContentChildren, HostBinding, Input, QueryList } from '@angular/core';
import { BooleanInput } from '../../utils';
import { NovoFieldElement } from './field';
import * as i0 from "@angular/core";
const _c0 = ["*"];
export class NovoFieldsElement {
    constructor() {
        this._layout = 'horizontal';
        this._appearance = 'standard';
        this.fullWidth = false;
    }
    get layout() {
        return this._layout;
    }
    set layout(value) {
        if (this._layout !== value) {
            this._layout = value;
            this._updateFieldLayout();
        }
    }
    get appearance() {
        return this._appearance;
    }
    set appearance(value) {
        if (this._appearance !== value) {
            this._appearance = value;
            this._updateFieldAppearance();
        }
    }
    ngAfterContentInit() {
        this._updateFieldLayout();
        this._updateFieldAppearance();
    }
    _updateFieldLayout() {
        if (this._fields) {
            this._fields.forEach((field) => {
                field.layout = this.layout;
            });
        }
    }
    _updateFieldAppearance() {
        if (this._fields) {
            this._fields.forEach((field) => {
                field.appearance = this.appearance;
            });
        }
    }
}
NovoFieldsElement.ɵfac = function NovoFieldsElement_Factory(t) { return new (t || NovoFieldsElement)(); };
NovoFieldsElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoFieldsElement, selectors: [["novo-fields"]], contentQueries: function NovoFieldsElement_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        i0.ɵɵcontentQuery(dirIndex, NovoFieldElement, false);
    } if (rf & 2) {
        var _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx._fields = _t);
    } }, hostAttrs: [1, "novo-field"], hostVars: 10, hostBindings: function NovoFieldsElement_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassProp("novo-fieldset-appearance-standard", ctx.appearance == "standard")("novo-fieldset-appearance-fill", ctx.appearance == "fill")("novo-fieldset-appearance-outline", ctx.appearance == "outline")("novo-fieldset-appearance-list", ctx.appearance == "list")("full-width", ctx.fullWidth);
    } }, inputs: { layout: "layout", appearance: "appearance", fullWidth: "fullWidth" }, ngContentSelectors: _c0, decls: 1, vars: 0, template: function NovoFieldsElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵprojection(0);
    } }, styles: ["@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}[_nghost-%COMP%]{display:grid;grid-gap:1.2rem}.novo-fieldset-appearance-list[_nghost-%COMP%]{grid-gap:0}.full-width[_nghost-%COMP%]  novo-field.novo-field-layout-vertical{grid-template-columns:minmax(300px,1fr);width:-webkit-fill-available}.full-width[_nghost-%COMP%]  novo-field.novo-field-layout-vertical .novo-input-element{width:100%}.full-width[_nghost-%COMP%]  novo-field.novo-field-layout-horizontal{grid-template-columns:150px minmax(150px,1fr)}.full-width[_nghost-%COMP%]  novo-field.novo-field-layout-horizontal .novo-input-element{width:100%}"], changeDetection: 0 });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoFieldsElement.prototype, "fullWidth", void 0);
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoFieldsElement, [{
        type: Component,
        args: [{
                selector: 'novo-fields',
                templateUrl: './fieldset.html',
                styleUrls: ['./fieldset.scss'],
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    class: 'novo-field',
                    '[class.novo-fieldset-appearance-standard]': 'appearance == "standard"',
                    '[class.novo-fieldset-appearance-fill]': 'appearance == "fill"',
                    '[class.novo-fieldset-appearance-outline]': 'appearance == "outline"',
                    '[class.novo-fieldset-appearance-list]': 'appearance == "list"',
                },
            }]
    }], null, { _fields: [{
            type: ContentChildren,
            args: [NovoFieldElement]
        }], layout: [{
            type: Input
        }], appearance: [{
            type: Input
        }], fullWidth: [{
            type: HostBinding,
            args: ['class.full-width']
        }, {
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGRzZXQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvZmllbGQvZmllbGRzZXQudHMiLCJlbGVtZW50cy9maWVsZC9maWVsZHNldC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFvQix1QkFBdUIsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JJLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sU0FBUyxDQUFDOzs7QUFpQjNDLE1BQU0sT0FBTyxpQkFBaUI7SUFmOUI7UUFtQkUsWUFBTyxHQUE4QixZQUFZLENBQUM7UUFXbEQsZ0JBQVcsR0FBNkMsVUFBVSxDQUFDO1FBY25FLGNBQVMsR0FBWSxLQUFLLENBQUM7S0FzQjVCO0lBOUNDLElBQWEsTUFBTTtRQUNqQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUNELElBQUksTUFBTSxDQUFDLEtBQUs7UUFDZCxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssS0FBSyxFQUFFO1lBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQzNCO0lBQ0gsQ0FBQztJQUdELElBQWEsVUFBVTtRQUNyQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUNELElBQUksVUFBVSxDQUFDLEtBQUs7UUFDbEIsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLEtBQUssRUFBRTtZQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN6QixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztTQUMvQjtJQUNILENBQUM7SUFPRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVPLGtCQUFrQjtRQUN4QixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDN0IsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzdCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRU8sc0JBQXNCO1FBQzVCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUM3QixLQUFLLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDckMsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7O2tGQWxEVSxpQkFBaUI7c0RBQWpCLGlCQUFpQjtvQ0FDWCxnQkFBZ0I7Ozs7Ozs7O1FDckJuQyxrQkFBWTs7QURpRFY7SUFEQyxZQUFZLEVBQUU7O29EQUNZO2tEQTdCaEIsaUJBQWlCO2NBZjdCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsV0FBVyxFQUFFLGlCQUFpQjtnQkFDOUIsU0FBUyxFQUFFLENBQUMsaUJBQWlCLENBQUM7Z0JBQzlCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLFlBQVk7b0JBQ25CLDJDQUEyQyxFQUFFLDBCQUEwQjtvQkFDdkUsdUNBQXVDLEVBQUUsc0JBQXNCO29CQUMvRCwwQ0FBMEMsRUFBRSx5QkFBeUI7b0JBQ3JFLHVDQUF1QyxFQUFFLHNCQUFzQjtpQkFHaEU7YUFDRjtnQkFHQyxPQUFPO2tCQUROLGVBQWU7bUJBQUMsZ0JBQWdCO1lBSXBCLE1BQU07a0JBQWxCLEtBQUs7WUFXTyxVQUFVO2tCQUF0QixLQUFLO1lBYU4sU0FBUztrQkFIUixXQUFXO21CQUFDLGtCQUFrQjs7a0JBQzlCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgSG9zdEJpbmRpbmcsIElucHV0LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCB7IE5vdm9GaWVsZEVsZW1lbnQgfSBmcm9tICcuL2ZpZWxkJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1maWVsZHMnLFxuICB0ZW1wbGF0ZVVybDogJy4vZmllbGRzZXQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2ZpZWxkc2V0LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tZmllbGQnLFxuICAgICdbY2xhc3Mubm92by1maWVsZHNldC1hcHBlYXJhbmNlLXN0YW5kYXJkXSc6ICdhcHBlYXJhbmNlID09IFwic3RhbmRhcmRcIicsXG4gICAgJ1tjbGFzcy5ub3ZvLWZpZWxkc2V0LWFwcGVhcmFuY2UtZmlsbF0nOiAnYXBwZWFyYW5jZSA9PSBcImZpbGxcIicsXG4gICAgJ1tjbGFzcy5ub3ZvLWZpZWxkc2V0LWFwcGVhcmFuY2Utb3V0bGluZV0nOiAnYXBwZWFyYW5jZSA9PSBcIm91dGxpbmVcIicsXG4gICAgJ1tjbGFzcy5ub3ZvLWZpZWxkc2V0LWFwcGVhcmFuY2UtbGlzdF0nOiAnYXBwZWFyYW5jZSA9PSBcImxpc3RcIicsXG4gICAgLy8gJ1tjbGFzcy5ub3ZvLWZpZWxkLWxheW91dC1ob3Jpem9udGFsXSc6ICdsYXlvdXQ9PVwiaG9yaXpvbnRhbFwiJyxcbiAgICAvLyAnW2NsYXNzLm5vdm8tZmllbGQtbGF5b3V0LXZlcnRpY2FsXSc6ICdsYXlvdXQ9PVwidmVydGljYWxcIicsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9GaWVsZHNFbGVtZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIEBDb250ZW50Q2hpbGRyZW4oTm92b0ZpZWxkRWxlbWVudClcbiAgX2ZpZWxkczogUXVlcnlMaXN0PE5vdm9GaWVsZEVsZW1lbnQ+O1xuXG4gIF9sYXlvdXQ6ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcgPSAnaG9yaXpvbnRhbCc7XG4gIEBJbnB1dCgpIGdldCBsYXlvdXQoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fbGF5b3V0O1xuICB9XG4gIHNldCBsYXlvdXQodmFsdWUpIHtcbiAgICBpZiAodGhpcy5fbGF5b3V0ICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fbGF5b3V0ID0gdmFsdWU7XG4gICAgICB0aGlzLl91cGRhdGVGaWVsZExheW91dCgpO1xuICAgIH1cbiAgfVxuXG4gIF9hcHBlYXJhbmNlOiAnc3RhbmRhcmQnIHwgJ291dGxpbmUnIHwgJ2ZpbGwnIHwgJ2xpc3QnID0gJ3N0YW5kYXJkJztcbiAgQElucHV0KCkgZ2V0IGFwcGVhcmFuY2UoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fYXBwZWFyYW5jZTtcbiAgfVxuICBzZXQgYXBwZWFyYW5jZSh2YWx1ZSkge1xuICAgIGlmICh0aGlzLl9hcHBlYXJhbmNlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fYXBwZWFyYW5jZSA9IHZhbHVlO1xuICAgICAgdGhpcy5fdXBkYXRlRmllbGRBcHBlYXJhbmNlKCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mdWxsLXdpZHRoJylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIGZ1bGxXaWR0aDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiBhbnkge1xuICAgIHRoaXMuX3VwZGF0ZUZpZWxkTGF5b3V0KCk7XG4gICAgdGhpcy5fdXBkYXRlRmllbGRBcHBlYXJhbmNlKCk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVGaWVsZExheW91dCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZmllbGRzKSB7XG4gICAgICB0aGlzLl9maWVsZHMuZm9yRWFjaCgoZmllbGQpID0+IHtcbiAgICAgICAgZmllbGQubGF5b3V0ID0gdGhpcy5sYXlvdXQ7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVGaWVsZEFwcGVhcmFuY2UoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2ZpZWxkcykge1xuICAgICAgdGhpcy5fZmllbGRzLmZvckVhY2goKGZpZWxkKSA9PiB7XG4gICAgICAgIGZpZWxkLmFwcGVhcmFuY2UgPSB0aGlzLmFwcGVhcmFuY2U7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiIsIjxuZy1jb250ZW50PjwvbmctY29udGVudD4iXX0=
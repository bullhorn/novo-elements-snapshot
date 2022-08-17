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
import { ChangeDetectionStrategy, Component, ContentChildren, HostBinding, Input, QueryList } from '@angular/core';
import { BooleanInput } from '../../utils';
import { NovoFieldElement } from './field';
import * as i0 from "@angular/core";
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
NovoFieldsElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFieldsElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoFieldsElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoFieldsElement, selector: "novo-fields", inputs: { layout: "layout", appearance: "appearance", fullWidth: "fullWidth" }, host: { properties: { "class.novo-fieldset-appearance-standard": "appearance == \"standard\"", "class.novo-fieldset-appearance-fill": "appearance == \"fill\"", "class.novo-fieldset-appearance-outline": "appearance == \"outline\"", "class.novo-fieldset-appearance-list": "appearance == \"list\"", "class.full-width": "this.fullWidth" }, classAttribute: "novo-field" }, queries: [{ propertyName: "_fields", predicate: NovoFieldElement }], ngImport: i0, template: "<ng-content></ng-content>", styles: [":host{display:grid;grid-gap:2.8rem 2rem}:host.novo-fieldset-appearance-list{grid-gap:0rem}:host.full-width::ng-deep novo-field.novo-field-layout-vertical{grid-template-columns:minmax(300px,1fr);width:-webkit-fill-available}:host.full-width::ng-deep novo-field.novo-field-layout-vertical .novo-input-element{width:100%}:host.full-width::ng-deep novo-field.novo-field-layout-horizontal{grid-template-columns:150px minmax(150px,1fr)}:host.full-width::ng-deep novo-field.novo-field-layout-horizontal .novo-input-element{width:100%}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoFieldsElement.prototype, "fullWidth", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFieldsElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-fields', changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        class: 'novo-field',
                        '[class.novo-fieldset-appearance-standard]': 'appearance == "standard"',
                        '[class.novo-fieldset-appearance-fill]': 'appearance == "fill"',
                        '[class.novo-fieldset-appearance-outline]': 'appearance == "outline"',
                        '[class.novo-fieldset-appearance-list]': 'appearance == "list"',
                        // '[class.novo-field-layout-horizontal]': 'layout=="horizontal"',
                        // '[class.novo-field-layout-vertical]': 'layout=="vertical"',
                    }, template: "<ng-content></ng-content>", styles: [":host{display:grid;grid-gap:2.8rem 2rem}:host.novo-fieldset-appearance-list{grid-gap:0rem}:host.full-width::ng-deep novo-field.novo-field-layout-vertical{grid-template-columns:minmax(300px,1fr);width:-webkit-fill-available}:host.full-width::ng-deep novo-field.novo-field-layout-vertical .novo-input-element{width:100%}:host.full-width::ng-deep novo-field.novo-field-layout-horizontal{grid-template-columns:150px minmax(150px,1fr)}:host.full-width::ng-deep novo-field.novo-field-layout-horizontal .novo-input-element{width:100%}\n"] }]
        }], propDecorators: { _fields: [{
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
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGRzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9maWVsZC9maWVsZHNldC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2ZpZWxkL2ZpZWxkc2V0Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsTUFBTTtBQUNOLE9BQU8sRUFBb0IsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNySSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7QUFpQjNDLE1BQU0sT0FBTyxpQkFBaUI7SUFmOUI7UUFtQkUsWUFBTyxHQUE4QixZQUFZLENBQUM7UUFXbEQsZ0JBQVcsR0FBNkMsVUFBVSxDQUFDO1FBY25FLGNBQVMsR0FBWSxLQUFLLENBQUM7S0FzQjVCO0lBOUNDLElBQWEsTUFBTTtRQUNqQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUNELElBQUksTUFBTSxDQUFDLEtBQUs7UUFDZCxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssS0FBSyxFQUFFO1lBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQzNCO0lBQ0gsQ0FBQztJQUdELElBQWEsVUFBVTtRQUNyQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUNELElBQUksVUFBVSxDQUFDLEtBQUs7UUFDbEIsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLEtBQUssRUFBRTtZQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN6QixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztTQUMvQjtJQUNILENBQUM7SUFPRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVPLGtCQUFrQjtRQUN4QixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDN0IsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzdCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRU8sc0JBQXNCO1FBQzVCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUM3QixLQUFLLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDckMsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7OytHQWxEVSxpQkFBaUI7bUdBQWpCLGlCQUFpQiwyZ0JBQ1gsZ0JBQWdCLDZCQ3JCbkMsMkJBQXlCO0FEaUR2QjtJQURDLFlBQVksRUFBRTs7b0RBQ1k7NEZBN0JoQixpQkFBaUI7a0JBZjdCLFNBQVM7K0JBQ0UsYUFBYSxtQkFHTix1QkFBdUIsQ0FBQyxNQUFNLFFBQ3pDO3dCQUNKLEtBQUssRUFBRSxZQUFZO3dCQUNuQiwyQ0FBMkMsRUFBRSwwQkFBMEI7d0JBQ3ZFLHVDQUF1QyxFQUFFLHNCQUFzQjt3QkFDL0QsMENBQTBDLEVBQUUseUJBQXlCO3dCQUNyRSx1Q0FBdUMsRUFBRSxzQkFBc0I7d0JBQy9ELGtFQUFrRTt3QkFDbEUsOERBQThEO3FCQUMvRDs4QkFJRCxPQUFPO3NCQUROLGVBQWU7dUJBQUMsZ0JBQWdCO2dCQUlwQixNQUFNO3NCQUFsQixLQUFLO2dCQVdPLFVBQVU7c0JBQXRCLEtBQUs7Z0JBYU4sU0FBUztzQkFIUixXQUFXO3VCQUFDLGtCQUFrQjs7c0JBQzlCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgSG9zdEJpbmRpbmcsIElucHV0LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCB7IE5vdm9GaWVsZEVsZW1lbnQgfSBmcm9tICcuL2ZpZWxkJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1maWVsZHMnLFxuICB0ZW1wbGF0ZVVybDogJy4vZmllbGRzZXQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2ZpZWxkc2V0LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tZmllbGQnLFxuICAgICdbY2xhc3Mubm92by1maWVsZHNldC1hcHBlYXJhbmNlLXN0YW5kYXJkXSc6ICdhcHBlYXJhbmNlID09IFwic3RhbmRhcmRcIicsXG4gICAgJ1tjbGFzcy5ub3ZvLWZpZWxkc2V0LWFwcGVhcmFuY2UtZmlsbF0nOiAnYXBwZWFyYW5jZSA9PSBcImZpbGxcIicsXG4gICAgJ1tjbGFzcy5ub3ZvLWZpZWxkc2V0LWFwcGVhcmFuY2Utb3V0bGluZV0nOiAnYXBwZWFyYW5jZSA9PSBcIm91dGxpbmVcIicsXG4gICAgJ1tjbGFzcy5ub3ZvLWZpZWxkc2V0LWFwcGVhcmFuY2UtbGlzdF0nOiAnYXBwZWFyYW5jZSA9PSBcImxpc3RcIicsXG4gICAgLy8gJ1tjbGFzcy5ub3ZvLWZpZWxkLWxheW91dC1ob3Jpem9udGFsXSc6ICdsYXlvdXQ9PVwiaG9yaXpvbnRhbFwiJyxcbiAgICAvLyAnW2NsYXNzLm5vdm8tZmllbGQtbGF5b3V0LXZlcnRpY2FsXSc6ICdsYXlvdXQ9PVwidmVydGljYWxcIicsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9GaWVsZHNFbGVtZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIEBDb250ZW50Q2hpbGRyZW4oTm92b0ZpZWxkRWxlbWVudClcbiAgX2ZpZWxkczogUXVlcnlMaXN0PE5vdm9GaWVsZEVsZW1lbnQ+O1xuXG4gIF9sYXlvdXQ6ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcgPSAnaG9yaXpvbnRhbCc7XG4gIEBJbnB1dCgpIGdldCBsYXlvdXQoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fbGF5b3V0O1xuICB9XG4gIHNldCBsYXlvdXQodmFsdWUpIHtcbiAgICBpZiAodGhpcy5fbGF5b3V0ICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fbGF5b3V0ID0gdmFsdWU7XG4gICAgICB0aGlzLl91cGRhdGVGaWVsZExheW91dCgpO1xuICAgIH1cbiAgfVxuXG4gIF9hcHBlYXJhbmNlOiAnc3RhbmRhcmQnIHwgJ291dGxpbmUnIHwgJ2ZpbGwnIHwgJ2xpc3QnID0gJ3N0YW5kYXJkJztcbiAgQElucHV0KCkgZ2V0IGFwcGVhcmFuY2UoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fYXBwZWFyYW5jZTtcbiAgfVxuICBzZXQgYXBwZWFyYW5jZSh2YWx1ZSkge1xuICAgIGlmICh0aGlzLl9hcHBlYXJhbmNlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fYXBwZWFyYW5jZSA9IHZhbHVlO1xuICAgICAgdGhpcy5fdXBkYXRlRmllbGRBcHBlYXJhbmNlKCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mdWxsLXdpZHRoJylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIGZ1bGxXaWR0aDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiBhbnkge1xuICAgIHRoaXMuX3VwZGF0ZUZpZWxkTGF5b3V0KCk7XG4gICAgdGhpcy5fdXBkYXRlRmllbGRBcHBlYXJhbmNlKCk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVGaWVsZExheW91dCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZmllbGRzKSB7XG4gICAgICB0aGlzLl9maWVsZHMuZm9yRWFjaCgoZmllbGQpID0+IHtcbiAgICAgICAgZmllbGQubGF5b3V0ID0gdGhpcy5sYXlvdXQ7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVGaWVsZEFwcGVhcmFuY2UoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2ZpZWxkcykge1xuICAgICAgdGhpcy5fZmllbGRzLmZvckVhY2goKGZpZWxkKSA9PiB7XG4gICAgICAgIGZpZWxkLmFwcGVhcmFuY2UgPSB0aGlzLmFwcGVhcmFuY2U7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiIsIjxuZy1jb250ZW50PjwvbmctY29udGVudD4iXX0=
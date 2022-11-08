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
import { NovoFieldElement } from './field';
import { BooleanInput } from 'novo-elements/utils';
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
NovoFieldsElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoFieldsElement, selector: "novo-fields", inputs: { layout: "layout", appearance: "appearance", fullWidth: "fullWidth" }, host: { properties: { "class.novo-fieldset-appearance-standard": "appearance == \"standard\"", "class.novo-fieldset-appearance-fill": "appearance == \"fill\"", "class.novo-fieldset-appearance-outline": "appearance == \"outline\"", "class.novo-fieldset-appearance-list": "appearance == \"list\"", "class.full-width": "this.fullWidth" }, classAttribute: "novo-field" }, queries: [{ propertyName: "_fields", predicate: NovoFieldElement }], ngImport: i0, template: "<ng-content></ng-content>", styles: [":host{display:grid;grid-gap:var(--spacing-md) var(--spacing-lg)}:host.novo-fieldset-appearance-list{grid-gap:0rem}:host.full-width::ng-deep novo-field.novo-field-layout-vertical{grid-template-columns:minmax(300px,1fr);width:-webkit-fill-available}:host.full-width::ng-deep novo-field.novo-field-layout-vertical .novo-input-element{width:100%}:host.full-width::ng-deep novo-field.novo-field-layout-horizontal{grid-template-columns:150px minmax(150px,1fr)}:host.full-width::ng-deep novo-field.novo-field-layout-horizontal .novo-input-element{width:100%}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
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
                    }, template: "<ng-content></ng-content>", styles: [":host{display:grid;grid-gap:var(--spacing-md) var(--spacing-lg)}:host.novo-fieldset-appearance-list{grid-gap:0rem}:host.full-width::ng-deep novo-field.novo-field-layout-vertical{grid-template-columns:minmax(300px,1fr);width:-webkit-fill-available}:host.full-width::ng-deep novo-field.novo-field-layout-vertical .novo-input-element{width:100%}:host.full-width::ng-deep novo-field.novo-field-layout-horizontal{grid-template-columns:150px minmax(150px,1fr)}:host.full-width::ng-deep novo-field.novo-field-layout-horizontal .novo-input-element{width:100%}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGRzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21wb25lbnRzL2ZpZWxkL2ZpZWxkc2V0LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy9maWVsZC9maWVsZHNldC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE1BQU07QUFDTixPQUFPLEVBQW9CLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckksT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7QUFpQm5ELE1BQU0sT0FBTyxpQkFBaUI7SUFmOUI7UUFtQkUsWUFBTyxHQUE4QixZQUFZLENBQUM7UUFXbEQsZ0JBQVcsR0FBNkMsVUFBVSxDQUFDO1FBY25FLGNBQVMsR0FBWSxLQUFLLENBQUM7S0FzQjVCO0lBOUNDLElBQWEsTUFBTTtRQUNqQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUNELElBQUksTUFBTSxDQUFDLEtBQUs7UUFDZCxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssS0FBSyxFQUFFO1lBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQzNCO0lBQ0gsQ0FBQztJQUdELElBQWEsVUFBVTtRQUNyQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUNELElBQUksVUFBVSxDQUFDLEtBQUs7UUFDbEIsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLEtBQUssRUFBRTtZQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN6QixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztTQUMvQjtJQUNILENBQUM7SUFPRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVPLGtCQUFrQjtRQUN4QixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDN0IsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzdCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRU8sc0JBQXNCO1FBQzVCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUM3QixLQUFLLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDckMsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7OytHQWxEVSxpQkFBaUI7bUdBQWpCLGlCQUFpQiwyZ0JBQ1gsZ0JBQWdCLDZCQ3JCbkMsMkJBQXlCO0FEaUR2QjtJQURDLFlBQVksRUFBRTs7b0RBQ1k7NEZBN0JoQixpQkFBaUI7a0JBZjdCLFNBQVM7K0JBQ0UsYUFBYSxtQkFHTix1QkFBdUIsQ0FBQyxNQUFNLFFBQ3pDO3dCQUNKLEtBQUssRUFBRSxZQUFZO3dCQUNuQiwyQ0FBMkMsRUFBRSwwQkFBMEI7d0JBQ3ZFLHVDQUF1QyxFQUFFLHNCQUFzQjt3QkFDL0QsMENBQTBDLEVBQUUseUJBQXlCO3dCQUNyRSx1Q0FBdUMsRUFBRSxzQkFBc0I7d0JBQy9ELGtFQUFrRTt3QkFDbEUsOERBQThEO3FCQUMvRDs4QkFJRCxPQUFPO3NCQUROLGVBQWU7dUJBQUMsZ0JBQWdCO2dCQUlwQixNQUFNO3NCQUFsQixLQUFLO2dCQVdPLFVBQVU7c0JBQXRCLEtBQUs7Z0JBYU4sU0FBUztzQkFIUixXQUFXO3VCQUFDLGtCQUFrQjs7c0JBQzlCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgSG9zdEJpbmRpbmcsIElucHV0LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9GaWVsZEVsZW1lbnQgfSBmcm9tICcuL2ZpZWxkJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWZpZWxkcycsXG4gIHRlbXBsYXRlVXJsOiAnLi9maWVsZHNldC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZmllbGRzZXQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1maWVsZCcsXG4gICAgJ1tjbGFzcy5ub3ZvLWZpZWxkc2V0LWFwcGVhcmFuY2Utc3RhbmRhcmRdJzogJ2FwcGVhcmFuY2UgPT0gXCJzdGFuZGFyZFwiJyxcbiAgICAnW2NsYXNzLm5vdm8tZmllbGRzZXQtYXBwZWFyYW5jZS1maWxsXSc6ICdhcHBlYXJhbmNlID09IFwiZmlsbFwiJyxcbiAgICAnW2NsYXNzLm5vdm8tZmllbGRzZXQtYXBwZWFyYW5jZS1vdXRsaW5lXSc6ICdhcHBlYXJhbmNlID09IFwib3V0bGluZVwiJyxcbiAgICAnW2NsYXNzLm5vdm8tZmllbGRzZXQtYXBwZWFyYW5jZS1saXN0XSc6ICdhcHBlYXJhbmNlID09IFwibGlzdFwiJyxcbiAgICAvLyAnW2NsYXNzLm5vdm8tZmllbGQtbGF5b3V0LWhvcml6b250YWxdJzogJ2xheW91dD09XCJob3Jpem9udGFsXCInLFxuICAgIC8vICdbY2xhc3Mubm92by1maWVsZC1sYXlvdXQtdmVydGljYWxdJzogJ2xheW91dD09XCJ2ZXJ0aWNhbFwiJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0ZpZWxkc0VsZW1lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgQENvbnRlbnRDaGlsZHJlbihOb3ZvRmllbGRFbGVtZW50KVxuICBfZmllbGRzOiBRdWVyeUxpc3Q8Tm92b0ZpZWxkRWxlbWVudD47XG5cbiAgX2xheW91dDogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyA9ICdob3Jpem9udGFsJztcbiAgQElucHV0KCkgZ2V0IGxheW91dCgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9sYXlvdXQ7XG4gIH1cbiAgc2V0IGxheW91dCh2YWx1ZSkge1xuICAgIGlmICh0aGlzLl9sYXlvdXQgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9sYXlvdXQgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX3VwZGF0ZUZpZWxkTGF5b3V0KCk7XG4gICAgfVxuICB9XG5cbiAgX2FwcGVhcmFuY2U6ICdzdGFuZGFyZCcgfCAnb3V0bGluZScgfCAnZmlsbCcgfCAnbGlzdCcgPSAnc3RhbmRhcmQnO1xuICBASW5wdXQoKSBnZXQgYXBwZWFyYW5jZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9hcHBlYXJhbmNlO1xuICB9XG4gIHNldCBhcHBlYXJhbmNlKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuX2FwcGVhcmFuY2UgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9hcHBlYXJhbmNlID0gdmFsdWU7XG4gICAgICB0aGlzLl91cGRhdGVGaWVsZEFwcGVhcmFuY2UoKTtcbiAgICB9XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZ1bGwtd2lkdGgnKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgZnVsbFdpZHRoOiBib29sZWFuID0gZmFsc2U7XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IGFueSB7XG4gICAgdGhpcy5fdXBkYXRlRmllbGRMYXlvdXQoKTtcbiAgICB0aGlzLl91cGRhdGVGaWVsZEFwcGVhcmFuY2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUZpZWxkTGF5b3V0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9maWVsZHMpIHtcbiAgICAgIHRoaXMuX2ZpZWxkcy5mb3JFYWNoKChmaWVsZCkgPT4ge1xuICAgICAgICBmaWVsZC5sYXlvdXQgPSB0aGlzLmxheW91dDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUZpZWxkQXBwZWFyYW5jZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZmllbGRzKSB7XG4gICAgICB0aGlzLl9maWVsZHMuZm9yRWFjaCgoZmllbGQpID0+IHtcbiAgICAgICAgZmllbGQuYXBwZWFyYW5jZSA9IHRoaXMuYXBwZWFyYW5jZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIiwiPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PiJdfQ==
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
import { BooleanInput } from 'novo-elements/utils';
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NovoFieldsElement, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: NovoFieldsElement, selector: "novo-fields", inputs: { layout: "layout", appearance: "appearance", fullWidth: "fullWidth" }, host: { properties: { "class.novo-fieldset-appearance-standard": "appearance == \"standard\"", "class.novo-fieldset-appearance-fill": "appearance == \"fill\"", "class.novo-fieldset-appearance-outline": "appearance == \"outline\"", "class.novo-fieldset-appearance-list": "appearance == \"list\"", "class.full-width": "this.fullWidth" }, classAttribute: "novo-field" }, queries: [{ propertyName: "_fields", predicate: NovoFieldElement }], ngImport: i0, template: "<ng-content></ng-content>", styles: [":host{display:grid;grid-gap:2.8rem 2rem}:host.novo-fieldset-appearance-list{grid-gap:0rem}:host.full-width::ng-deep novo-field.novo-field-layout-vertical{grid-template-columns:minmax(300px,1fr);width:-webkit-fill-available}:host.full-width::ng-deep novo-field.novo-field-layout-vertical .novo-input-element{width:100%}:host.full-width::ng-deep novo-field.novo-field-layout-horizontal{grid-template-columns:150px minmax(150px,1fr)}:host.full-width::ng-deep novo-field.novo-field-layout-horizontal .novo-input-element{width:100%}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoFieldsElement.prototype, "fullWidth", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NovoFieldsElement, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGRzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9maWVsZC9maWVsZHNldC50cyIsIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2ZpZWxkL2ZpZWxkc2V0Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsTUFBTTtBQUNOLE9BQU8sRUFBb0IsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNySSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sU0FBUyxDQUFDOztBQWlCM0MsTUFBTSxPQUFPLGlCQUFpQjtJQWY5QjtRQW1CRSxZQUFPLEdBQThCLFlBQVksQ0FBQztRQVdsRCxnQkFBVyxHQUE2QyxVQUFVLENBQUM7UUFjbkUsY0FBUyxHQUFZLEtBQUssQ0FBQztLQXNCNUI7SUE5Q0MsSUFBYSxNQUFNO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBQ0QsSUFBSSxNQUFNLENBQUMsS0FBSztRQUNkLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxLQUFLLEVBQUU7WUFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDM0I7SUFDSCxDQUFDO0lBR0QsSUFBYSxVQUFVO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBQ0QsSUFBSSxVQUFVLENBQUMsS0FBSztRQUNsQixJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssS0FBSyxFQUFFO1lBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1NBQy9CO0lBQ0gsQ0FBQztJQU9ELGtCQUFrQjtRQUNoQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRU8sa0JBQWtCO1FBQ3hCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUM3QixLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDN0IsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFTyxzQkFBc0I7UUFDNUIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQzdCLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUNyQyxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzsrR0FsRFUsaUJBQWlCO21HQUFqQixpQkFBaUIsMmdCQUNYLGdCQUFnQiw2QkNyQm5DLDJCQUF5Qjs7QUQ4Q3ZCO0lBRUMsWUFBWSxFQUFFOztvREFDWTs0RkE3QmhCLGlCQUFpQjtrQkFmN0IsU0FBUzsrQkFDRSxhQUFhLG1CQUdOLHVCQUF1QixDQUFDLE1BQU0sUUFDekM7d0JBQ0osS0FBSyxFQUFFLFlBQVk7d0JBQ25CLDJDQUEyQyxFQUFFLDBCQUEwQjt3QkFDdkUsdUNBQXVDLEVBQUUsc0JBQXNCO3dCQUMvRCwwQ0FBMEMsRUFBRSx5QkFBeUI7d0JBQ3JFLHVDQUF1QyxFQUFFLHNCQUFzQjt3QkFDL0Qsa0VBQWtFO3dCQUNsRSw4REFBOEQ7cUJBQy9EOzhCQUlELE9BQU87c0JBRE4sZUFBZTt1QkFBQyxnQkFBZ0I7Z0JBSXBCLE1BQU07c0JBQWxCLEtBQUs7Z0JBV08sVUFBVTtzQkFBdEIsS0FBSztnQkFhTixTQUFTO3NCQUhSLFdBQVc7dUJBQUMsa0JBQWtCOztzQkFDOUIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBIb3N0QmluZGluZywgSW5wdXQsIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5pbXBvcnQgeyBOb3ZvRmllbGRFbGVtZW50IH0gZnJvbSAnLi9maWVsZCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tZmllbGRzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZpZWxkc2V0Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9maWVsZHNldC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLWZpZWxkJyxcbiAgICAnW2NsYXNzLm5vdm8tZmllbGRzZXQtYXBwZWFyYW5jZS1zdGFuZGFyZF0nOiAnYXBwZWFyYW5jZSA9PSBcInN0YW5kYXJkXCInLFxuICAgICdbY2xhc3Mubm92by1maWVsZHNldC1hcHBlYXJhbmNlLWZpbGxdJzogJ2FwcGVhcmFuY2UgPT0gXCJmaWxsXCInLFxuICAgICdbY2xhc3Mubm92by1maWVsZHNldC1hcHBlYXJhbmNlLW91dGxpbmVdJzogJ2FwcGVhcmFuY2UgPT0gXCJvdXRsaW5lXCInLFxuICAgICdbY2xhc3Mubm92by1maWVsZHNldC1hcHBlYXJhbmNlLWxpc3RdJzogJ2FwcGVhcmFuY2UgPT0gXCJsaXN0XCInLFxuICAgIC8vICdbY2xhc3Mubm92by1maWVsZC1sYXlvdXQtaG9yaXpvbnRhbF0nOiAnbGF5b3V0PT1cImhvcml6b250YWxcIicsXG4gICAgLy8gJ1tjbGFzcy5ub3ZvLWZpZWxkLWxheW91dC12ZXJ0aWNhbF0nOiAnbGF5b3V0PT1cInZlcnRpY2FsXCInLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRmllbGRzRWxlbWVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICBAQ29udGVudENoaWxkcmVuKE5vdm9GaWVsZEVsZW1lbnQpXG4gIF9maWVsZHM6IFF1ZXJ5TGlzdDxOb3ZvRmllbGRFbGVtZW50PjtcblxuICBfbGF5b3V0OiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnID0gJ2hvcml6b250YWwnO1xuICBASW5wdXQoKSBnZXQgbGF5b3V0KCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2xheW91dDtcbiAgfVxuICBzZXQgbGF5b3V0KHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuX2xheW91dCAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX2xheW91dCA9IHZhbHVlO1xuICAgICAgdGhpcy5fdXBkYXRlRmllbGRMYXlvdXQoKTtcbiAgICB9XG4gIH1cblxuICBfYXBwZWFyYW5jZTogJ3N0YW5kYXJkJyB8ICdvdXRsaW5lJyB8ICdmaWxsJyB8ICdsaXN0JyA9ICdzdGFuZGFyZCc7XG4gIEBJbnB1dCgpIGdldCBhcHBlYXJhbmNlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2FwcGVhcmFuY2U7XG4gIH1cbiAgc2V0IGFwcGVhcmFuY2UodmFsdWUpIHtcbiAgICBpZiAodGhpcy5fYXBwZWFyYW5jZSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX2FwcGVhcmFuY2UgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX3VwZGF0ZUZpZWxkQXBwZWFyYW5jZSgpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZnVsbC13aWR0aCcpXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBmdWxsV2lkdGg6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogYW55IHtcbiAgICB0aGlzLl91cGRhdGVGaWVsZExheW91dCgpO1xuICAgIHRoaXMuX3VwZGF0ZUZpZWxkQXBwZWFyYW5jZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlRmllbGRMYXlvdXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2ZpZWxkcykge1xuICAgICAgdGhpcy5fZmllbGRzLmZvckVhY2goKGZpZWxkKSA9PiB7XG4gICAgICAgIGZpZWxkLmxheW91dCA9IHRoaXMubGF5b3V0O1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlRmllbGRBcHBlYXJhbmNlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9maWVsZHMpIHtcbiAgICAgIHRoaXMuX2ZpZWxkcy5mb3JFYWNoKChmaWVsZCkgPT4ge1xuICAgICAgICBmaWVsZC5hcHBlYXJhbmNlID0gdGhpcy5hcHBlYXJhbmNlO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iLCI8bmctY29udGVudD48L25nLWNvbnRlbnQ+Il19
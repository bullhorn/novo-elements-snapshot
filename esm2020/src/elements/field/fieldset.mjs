import { __decorate, __metadata } from "tslib";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGRzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9maWVsZC9maWVsZHNldC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2ZpZWxkL2ZpZWxkc2V0Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU07QUFDTixPQUFPLEVBQW9CLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckksT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxTQUFTLENBQUM7O0FBaUIzQyxNQUFNLE9BQU8saUJBQWlCO0lBZjlCO1FBbUJFLFlBQU8sR0FBOEIsWUFBWSxDQUFDO1FBV2xELGdCQUFXLEdBQTZDLFVBQVUsQ0FBQztRQWNuRSxjQUFTLEdBQVksS0FBSyxDQUFDO0tBc0I1QjtJQTlDQyxJQUFhLE1BQU07UUFDakIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFDRCxJQUFJLE1BQU0sQ0FBQyxLQUFLO1FBQ2QsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLEtBQUssRUFBRTtZQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUMzQjtJQUNILENBQUM7SUFHRCxJQUFhLFVBQVU7UUFDckIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7SUFDRCxJQUFJLFVBQVUsQ0FBQyxLQUFLO1FBQ2xCLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxLQUFLLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7U0FDL0I7SUFDSCxDQUFDO0lBT0Qsa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFTyxrQkFBa0I7UUFDeEIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQzdCLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUM3QixDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVPLHNCQUFzQjtRQUM1QixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDN0IsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOzsrR0FsRFUsaUJBQWlCO21HQUFqQixpQkFBaUIsMmdCQUNYLGdCQUFnQiw2QkNyQm5DLDJCQUF5QjtBRGlEdkI7SUFEQyxZQUFZLEVBQUU7O29EQUNZOzRGQTdCaEIsaUJBQWlCO2tCQWY3QixTQUFTOytCQUNFLGFBQWEsbUJBR04sdUJBQXVCLENBQUMsTUFBTSxRQUN6Qzt3QkFDSixLQUFLLEVBQUUsWUFBWTt3QkFDbkIsMkNBQTJDLEVBQUUsMEJBQTBCO3dCQUN2RSx1Q0FBdUMsRUFBRSxzQkFBc0I7d0JBQy9ELDBDQUEwQyxFQUFFLHlCQUF5Qjt3QkFDckUsdUNBQXVDLEVBQUUsc0JBQXNCO3dCQUMvRCxrRUFBa0U7d0JBQ2xFLDhEQUE4RDtxQkFDL0Q7OEJBSUQsT0FBTztzQkFETixlQUFlO3VCQUFDLGdCQUFnQjtnQkFJcEIsTUFBTTtzQkFBbEIsS0FBSztnQkFXTyxVQUFVO3NCQUF0QixLQUFLO2dCQWFOLFNBQVM7c0JBSFIsV0FBVzt1QkFBQyxrQkFBa0I7O3NCQUM5QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIEhvc3RCaW5kaW5nLCBJbnB1dCwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQgfSBmcm9tICcuLi8uLi91dGlscyc7XG5pbXBvcnQgeyBOb3ZvRmllbGRFbGVtZW50IH0gZnJvbSAnLi9maWVsZCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tZmllbGRzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZpZWxkc2V0Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9maWVsZHNldC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLWZpZWxkJyxcbiAgICAnW2NsYXNzLm5vdm8tZmllbGRzZXQtYXBwZWFyYW5jZS1zdGFuZGFyZF0nOiAnYXBwZWFyYW5jZSA9PSBcInN0YW5kYXJkXCInLFxuICAgICdbY2xhc3Mubm92by1maWVsZHNldC1hcHBlYXJhbmNlLWZpbGxdJzogJ2FwcGVhcmFuY2UgPT0gXCJmaWxsXCInLFxuICAgICdbY2xhc3Mubm92by1maWVsZHNldC1hcHBlYXJhbmNlLW91dGxpbmVdJzogJ2FwcGVhcmFuY2UgPT0gXCJvdXRsaW5lXCInLFxuICAgICdbY2xhc3Mubm92by1maWVsZHNldC1hcHBlYXJhbmNlLWxpc3RdJzogJ2FwcGVhcmFuY2UgPT0gXCJsaXN0XCInLFxuICAgIC8vICdbY2xhc3Mubm92by1maWVsZC1sYXlvdXQtaG9yaXpvbnRhbF0nOiAnbGF5b3V0PT1cImhvcml6b250YWxcIicsXG4gICAgLy8gJ1tjbGFzcy5ub3ZvLWZpZWxkLWxheW91dC12ZXJ0aWNhbF0nOiAnbGF5b3V0PT1cInZlcnRpY2FsXCInLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRmllbGRzRWxlbWVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICBAQ29udGVudENoaWxkcmVuKE5vdm9GaWVsZEVsZW1lbnQpXG4gIF9maWVsZHM6IFF1ZXJ5TGlzdDxOb3ZvRmllbGRFbGVtZW50PjtcblxuICBfbGF5b3V0OiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnID0gJ2hvcml6b250YWwnO1xuICBASW5wdXQoKSBnZXQgbGF5b3V0KCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2xheW91dDtcbiAgfVxuICBzZXQgbGF5b3V0KHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuX2xheW91dCAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX2xheW91dCA9IHZhbHVlO1xuICAgICAgdGhpcy5fdXBkYXRlRmllbGRMYXlvdXQoKTtcbiAgICB9XG4gIH1cblxuICBfYXBwZWFyYW5jZTogJ3N0YW5kYXJkJyB8ICdvdXRsaW5lJyB8ICdmaWxsJyB8ICdsaXN0JyA9ICdzdGFuZGFyZCc7XG4gIEBJbnB1dCgpIGdldCBhcHBlYXJhbmNlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2FwcGVhcmFuY2U7XG4gIH1cbiAgc2V0IGFwcGVhcmFuY2UodmFsdWUpIHtcbiAgICBpZiAodGhpcy5fYXBwZWFyYW5jZSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX2FwcGVhcmFuY2UgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX3VwZGF0ZUZpZWxkQXBwZWFyYW5jZSgpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZnVsbC13aWR0aCcpXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBmdWxsV2lkdGg6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogYW55IHtcbiAgICB0aGlzLl91cGRhdGVGaWVsZExheW91dCgpO1xuICAgIHRoaXMuX3VwZGF0ZUZpZWxkQXBwZWFyYW5jZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlRmllbGRMYXlvdXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2ZpZWxkcykge1xuICAgICAgdGhpcy5fZmllbGRzLmZvckVhY2goKGZpZWxkKSA9PiB7XG4gICAgICAgIGZpZWxkLmxheW91dCA9IHRoaXMubGF5b3V0O1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlRmllbGRBcHBlYXJhbmNlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9maWVsZHMpIHtcbiAgICAgIHRoaXMuX2ZpZWxkcy5mb3JFYWNoKChmaWVsZCkgPT4ge1xuICAgICAgICBmaWVsZC5hcHBlYXJhbmNlID0gdGhpcy5hcHBlYXJhbmNlO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iLCI8bmctY29udGVudD48L25nLWNvbnRlbnQ+Il19
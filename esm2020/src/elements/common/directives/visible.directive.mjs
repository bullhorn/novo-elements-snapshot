import { __decorate, __metadata } from "tslib";
// tslint:disable: directive-selector
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { BooleanInput } from '../../../utils';
import * as i0 from "@angular/core";
export class VisibleDirective {
    constructor(el) {
        this.el = el;
    }
    get hb_visibility() {
        return this.visible ? '' : `novo-visibility-hidden`;
    }
}
VisibleDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: VisibleDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
VisibleDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: VisibleDirective, selector: "[visible]", inputs: { visible: "visible" }, host: { properties: { "class": "this.hb_visibility" } }, ngImport: i0 });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], VisibleDirective.prototype, "visible", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: VisibleDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[visible]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { visible: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class']
            }], hb_visibility: [{
                type: HostBinding,
                args: ['class']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaWJsZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9jb21tb24vZGlyZWN0aXZlcy92aXNpYmxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEscUNBQXFDO0FBQ3JDLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUs5QyxNQUFNLE9BQU8sZ0JBQWdCO0lBVzNCLFlBQW9CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO0lBQUcsQ0FBQztJQUx0QyxJQUNJLGFBQWE7UUFDZixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLENBQUM7SUFDdEQsQ0FBQzs7OEdBVFUsZ0JBQWdCO2tHQUFoQixnQkFBZ0I7QUFJM0I7SUFIQyxZQUFZLEVBQUU7O2lEQUdFOzRGQUpOLGdCQUFnQjtrQkFINUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsV0FBVztpQkFDdEI7aUdBS0MsT0FBTztzQkFGTixLQUFLOztzQkFDTCxXQUFXO3VCQUFDLE9BQU87Z0JBSWhCLGFBQWE7c0JBRGhCLFdBQVc7dUJBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOiBkaXJlY3RpdmUtc2VsZWN0b3JcbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQgfSBmcm9tICcuLi8uLi8uLi91dGlscyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t2aXNpYmxlXScsXG59KVxuZXhwb3J0IGNsYXNzIFZpc2libGVEaXJlY3RpdmUge1xuICBAQm9vbGVhbklucHV0KClcbiAgQElucHV0KClcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIHZpc2libGU6IGJvb2xlYW47XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIGdldCBoYl92aXNpYmlsaXR5KCkge1xuICAgIHJldHVybiB0aGlzLnZpc2libGUgPyAnJyA6IGBub3ZvLXZpc2liaWxpdHktaGlkZGVuYDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHt9XG59XG4iXX0=
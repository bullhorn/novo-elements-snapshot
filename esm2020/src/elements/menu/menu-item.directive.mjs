import { ContentChild, Directive, ElementRef, Input, TemplateRef } from '@angular/core';
import { NovoOption } from '../common';
import * as i0 from "@angular/core";
/**
 * This is a structural directive now.  Should only be used on `novo-options`
 */
export class MenuItemDirective {
    constructor(template, elementRef) {
        this.template = template;
        this.elementRef = elementRef;
        this.menuItemEnabled = true;
        this.menuItemVisible = true;
    }
}
MenuItemDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: MenuItemDirective, deps: [{ token: i0.TemplateRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
MenuItemDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: MenuItemDirective, selector: "[menuItem]", inputs: { menuItemEnabled: "menuItemEnabled", menuItemVisible: "menuItemVisible" }, queries: [{ propertyName: "optionRef", first: true, predicate: NovoOption, descendants: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: MenuItemDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[menuItem]',
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }, { type: i0.ElementRef }]; }, propDecorators: { menuItemEnabled: [{
                type: Input
            }], menuItemVisible: [{
                type: Input
            }], optionRef: [{
                type: ContentChild,
                args: [NovoOption]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1pdGVtLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL21lbnUvbWVudS1pdGVtLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sV0FBVyxDQUFDOztBQUV2Qzs7R0FFRztBQUlILE1BQU0sT0FBTyxpQkFBaUI7SUFRNUIsWUFBbUIsUUFBb0MsRUFBUyxVQUFzQjtRQUFuRSxhQUFRLEdBQVIsUUFBUSxDQUE0QjtRQUFTLGVBQVUsR0FBVixVQUFVLENBQVk7UUFQdEUsb0JBQWUsR0FBdUMsSUFBSSxDQUFDO1FBQzNELG9CQUFlLEdBQXVDLElBQUksQ0FBQztJQU1jLENBQUM7OytHQVIvRSxpQkFBaUI7bUdBQWpCLGlCQUFpQiw2S0FJZCxVQUFVOzRGQUpiLGlCQUFpQjtrQkFIN0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsWUFBWTtpQkFDdkI7MkhBRWlCLGVBQWU7c0JBQTlCLEtBQUs7Z0JBQ1UsZUFBZTtzQkFBOUIsS0FBSztnQkFFb0IsU0FBUztzQkFBbEMsWUFBWTt1QkFBQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29udGVudENoaWxkLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b09wdGlvbiB9IGZyb20gJy4uL2NvbW1vbic7XG5cbi8qKlxuICogVGhpcyBpcyBhIHN0cnVjdHVyYWwgZGlyZWN0aXZlIG5vdy4gIFNob3VsZCBvbmx5IGJlIHVzZWQgb24gYG5vdm8tb3B0aW9uc2BcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21lbnVJdGVtXScsXG59KVxuZXhwb3J0IGNsYXNzIE1lbnVJdGVtRGlyZWN0aXZlIHtcbiAgQElucHV0KCkgcHVibGljIG1lbnVJdGVtRW5hYmxlZDogYm9vbGVhbiB8ICgoaXRlbTogYW55KSA9PiBib29sZWFuKSA9IHRydWU7XG4gIEBJbnB1dCgpIHB1YmxpYyBtZW51SXRlbVZpc2libGU6IGJvb2xlYW4gfCAoKGl0ZW06IGFueSkgPT4gYm9vbGVhbikgPSB0cnVlO1xuXG4gIEBDb250ZW50Q2hpbGQoTm92b09wdGlvbikgb3B0aW9uUmVmOiBOb3ZvT3B0aW9uO1xuXG4gIHB1YmxpYyBjdXJyZW50SXRlbTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8eyBpdGVtOiBhbnkgfT4sIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuIl19
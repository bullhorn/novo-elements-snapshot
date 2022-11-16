import { ContentChild, Directive, ElementRef, Input, TemplateRef } from '@angular/core';
import { NovoOption } from 'novo-elements/common';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1pdGVtLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvbWVudS9tZW51LWl0ZW0uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7QUFFbEQ7O0dBRUc7QUFJSCxNQUFNLE9BQU8saUJBQWlCO0lBUTVCLFlBQW1CLFFBQW9DLEVBQVMsVUFBc0I7UUFBbkUsYUFBUSxHQUFSLFFBQVEsQ0FBNEI7UUFBUyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBUHRFLG9CQUFlLEdBQXVDLElBQUksQ0FBQztRQUMzRCxvQkFBZSxHQUF1QyxJQUFJLENBQUM7SUFNYyxDQUFDOzsrR0FSL0UsaUJBQWlCO21HQUFqQixpQkFBaUIsNktBSWQsVUFBVTs0RkFKYixpQkFBaUI7a0JBSDdCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLFlBQVk7aUJBQ3ZCOzJIQUVpQixlQUFlO3NCQUE5QixLQUFLO2dCQUNVLGVBQWU7c0JBQTlCLEtBQUs7Z0JBRW9CLFNBQVM7c0JBQWxDLFlBQVk7dUJBQUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnRlbnRDaGlsZCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9PcHRpb24gfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbW1vbic7XG5cbi8qKlxuICogVGhpcyBpcyBhIHN0cnVjdHVyYWwgZGlyZWN0aXZlIG5vdy4gIFNob3VsZCBvbmx5IGJlIHVzZWQgb24gYG5vdm8tb3B0aW9uc2BcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21lbnVJdGVtXScsXG59KVxuZXhwb3J0IGNsYXNzIE1lbnVJdGVtRGlyZWN0aXZlIHtcbiAgQElucHV0KCkgcHVibGljIG1lbnVJdGVtRW5hYmxlZDogYm9vbGVhbiB8ICgoaXRlbTogYW55KSA9PiBib29sZWFuKSA9IHRydWU7XG4gIEBJbnB1dCgpIHB1YmxpYyBtZW51SXRlbVZpc2libGU6IGJvb2xlYW4gfCAoKGl0ZW06IGFueSkgPT4gYm9vbGVhbikgPSB0cnVlO1xuXG4gIEBDb250ZW50Q2hpbGQoTm92b09wdGlvbikgb3B0aW9uUmVmOiBOb3ZvT3B0aW9uO1xuXG4gIHB1YmxpYyBjdXJyZW50SXRlbTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8eyBpdGVtOiBhbnkgfT4sIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuIl19
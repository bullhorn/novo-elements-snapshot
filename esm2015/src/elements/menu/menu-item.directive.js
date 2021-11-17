import { ContentChild, Directive, ElementRef, Input, TemplateRef } from '@angular/core';
import { NovoOption } from '../common';
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
MenuItemDirective.decorators = [
    { type: Directive, args: [{
                selector: '[menuItem]',
            },] }
];
MenuItemDirective.ctorParameters = () => [
    { type: TemplateRef },
    { type: ElementRef }
];
MenuItemDirective.propDecorators = {
    menuItemEnabled: [{ type: Input }],
    menuItemVisible: [{ type: Input }],
    optionRef: [{ type: ContentChild, args: [NovoOption,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1pdGVtLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9tZW51L21lbnUtaXRlbS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUV2Qzs7R0FFRztBQUlILE1BQU0sT0FBTyxpQkFBaUI7SUFRNUIsWUFBbUIsUUFBb0MsRUFBUyxVQUFzQjtRQUFuRSxhQUFRLEdBQVIsUUFBUSxDQUE0QjtRQUFTLGVBQVUsR0FBVixVQUFVLENBQVk7UUFQdEUsb0JBQWUsR0FBdUMsSUFBSSxDQUFDO1FBQzNELG9CQUFlLEdBQXVDLElBQUksQ0FBQztJQU1jLENBQUM7OztZQVgzRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7YUFDdkI7OztZQVJvRCxXQUFXO1lBQTlCLFVBQVU7Ozs4QkFVekMsS0FBSzs4QkFDTCxLQUFLO3dCQUVMLFlBQVksU0FBQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29udGVudENoaWxkLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b09wdGlvbiB9IGZyb20gJy4uL2NvbW1vbic7XG5cbi8qKlxuICogVGhpcyBpcyBhIHN0cnVjdHVyYWwgZGlyZWN0aXZlIG5vdy4gIFNob3VsZCBvbmx5IGJlIHVzZWQgb24gYG5vdm8tb3B0aW9uc2BcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21lbnVJdGVtXScsXG59KVxuZXhwb3J0IGNsYXNzIE1lbnVJdGVtRGlyZWN0aXZlIHtcbiAgQElucHV0KCkgcHVibGljIG1lbnVJdGVtRW5hYmxlZDogYm9vbGVhbiB8ICgoaXRlbTogYW55KSA9PiBib29sZWFuKSA9IHRydWU7XG4gIEBJbnB1dCgpIHB1YmxpYyBtZW51SXRlbVZpc2libGU6IGJvb2xlYW4gfCAoKGl0ZW06IGFueSkgPT4gYm9vbGVhbikgPSB0cnVlO1xuXG4gIEBDb250ZW50Q2hpbGQoTm92b09wdGlvbikgb3B0aW9uUmVmOiBOb3ZvT3B0aW9uO1xuXG4gIHB1YmxpYyBjdXJyZW50SXRlbTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8eyBpdGVtOiBhbnkgfT4sIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuIl19
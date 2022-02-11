import { Directive, TemplateRef } from '@angular/core';
/**
 * Expansion panel content that will be rendered lazily
 * after the panel is opened for the first time.
 */
export class NovoExpansionPanelContent {
    constructor(_template) {
        this._template = _template;
    }
}
NovoExpansionPanelContent.decorators = [
    { type: Directive, args: [{
                selector: 'ng-template[matExpansionPanelContent]',
            },] }
];
NovoExpansionPanelContent.ctorParameters = () => [
    { type: TemplateRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5zaW9uLXBhbmVsLWNvbnRlbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvZXhwYW5zaW9uL2V4cGFuc2lvbi1wYW5lbC1jb250ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZEOzs7R0FHRztBQUlILE1BQU0sT0FBTyx5QkFBeUI7SUFDcEMsWUFBbUIsU0FBMkI7UUFBM0IsY0FBUyxHQUFULFNBQVMsQ0FBa0I7SUFBRyxDQUFDOzs7WUFKbkQsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1Q0FBdUM7YUFDbEQ7OztZQVJtQixXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIEV4cGFuc2lvbiBwYW5lbCBjb250ZW50IHRoYXQgd2lsbCBiZSByZW5kZXJlZCBsYXppbHlcbiAqIGFmdGVyIHRoZSBwYW5lbCBpcyBvcGVuZWQgZm9yIHRoZSBmaXJzdCB0aW1lLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICduZy10ZW1wbGF0ZVttYXRFeHBhbnNpb25QYW5lbENvbnRlbnRdJyxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0V4cGFuc2lvblBhbmVsQ29udGVudCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBfdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4pIHt9XG59XG4iXX0=
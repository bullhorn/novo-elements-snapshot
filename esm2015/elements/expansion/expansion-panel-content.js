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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5zaW9uLXBhbmVsLWNvbnRlbnQuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2V4cGFuc2lvbi9leHBhbnNpb24tcGFuZWwtY29udGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RDs7O0dBR0c7QUFJSCxNQUFNLE9BQU8seUJBQXlCO0lBQ3BDLFlBQW1CLFNBQTJCO1FBQTNCLGNBQVMsR0FBVCxTQUFTLENBQWtCO0lBQUcsQ0FBQzs7O1lBSm5ELFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsdUNBQXVDO2FBQ2xEOzs7WUFSbUIsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiBFeHBhbnNpb24gcGFuZWwgY29udGVudCB0aGF0IHdpbGwgYmUgcmVuZGVyZWQgbGF6aWx5XHJcbiAqIGFmdGVyIHRoZSBwYW5lbCBpcyBvcGVuZWQgZm9yIHRoZSBmaXJzdCB0aW1lLlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICduZy10ZW1wbGF0ZVttYXRFeHBhbnNpb25QYW5lbENvbnRlbnRdJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9FeHBhbnNpb25QYW5lbENvbnRlbnQge1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBfdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4pIHt9XHJcbn1cclxuIl19
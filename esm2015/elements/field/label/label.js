// NG2
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
const _c0 = ["*"];
export class NovoLabelElement {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    ngOnInit() { }
}
NovoLabelElement.ɵfac = function NovoLabelElement_Factory(t) { return new (t || NovoLabelElement)(i0.ɵɵdirectiveInject(i1.DomSanitizer)); };
NovoLabelElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoLabelElement, selectors: [["novo-label"]], ngContentSelectors: _c0, decls: 1, vars: 0, template: function NovoLabelElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵprojection(0);
    } }, styles: ["@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}[_nghost-%COMP%]{color:#3d464d;display:flex;flex:1;font-size:.9em;font-weight:500;overflow-wrap:break-word;text-transform:uppercase;transition:.2s ease-out;word-break:word-break}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoLabelElement, [{
        type: Component,
        args: [{
                selector: 'novo-label',
                templateUrl: './label.html',
                styleUrls: ['./label.scss'],
            }]
    }], function () { return [{ type: i1.DomSanitizer }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWwuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvZmllbGQvbGFiZWwvbGFiZWwudHMiLCJlbGVtZW50cy9maWVsZC9sYWJlbC9sYWJlbC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7OztBQU96RCxNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCLFlBQW9CLFNBQXVCO1FBQXZCLGNBQVMsR0FBVCxTQUFTLENBQWM7SUFBRyxDQUFDO0lBRS9DLFFBQVEsS0FBUyxDQUFDOztnRkFIUCxnQkFBZ0I7cURBQWhCLGdCQUFnQjs7UUNUN0Isa0JBQVk7O2tERFNDLGdCQUFnQjtjQUw1QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLFdBQVcsRUFBRSxjQUFjO2dCQUMzQixTQUFTLEVBQUUsQ0FBQyxjQUFjLENBQUM7YUFDNUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1sYWJlbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9sYWJlbC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbGFiZWwuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvTGFiZWxFbGVtZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcikge31cblxuICBuZ09uSW5pdCgpOiBhbnkge31cbn1cbiIsIjxuZy1jb250ZW50PjwvbmctY29udGVudD4iXX0=
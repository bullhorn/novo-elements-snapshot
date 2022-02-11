import { Directive, Input, TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
export class NovoTemplate {
    constructor(template) {
        this.template = template;
    }
    getType() {
        return this.name;
    }
}
NovoTemplate.ɵfac = function NovoTemplate_Factory(t) { return new (t || NovoTemplate)(i0.ɵɵdirectiveInject(i0.TemplateRef)); };
NovoTemplate.ɵdir = i0.ɵɵdefineDirective({ type: NovoTemplate, selectors: [["", "novoTemplate", ""]], inputs: { type: "type", name: ["novoTemplate", "name"] } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoTemplate, [{
        type: Directive,
        args: [{
                selector: '[novoTemplate]',
            }]
    }], function () { return [{ type: i0.TemplateRef }]; }, { type: [{
            type: Input
        }], name: [{
            type: Input,
            args: ['novoTemplate']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm92by10ZW1wbGF0ZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvY29tbW9uL25vdm8tdGVtcGxhdGUvbm92by10ZW1wbGF0ZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUs5RCxNQUFNLE9BQU8sWUFBWTtJQUl2QixZQUFtQixRQUEwQjtRQUExQixhQUFRLEdBQVIsUUFBUSxDQUFrQjtJQUFHLENBQUM7SUFFakQsT0FBTztRQUNMLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQixDQUFDOzt3RUFSVSxZQUFZO2lEQUFaLFlBQVk7a0RBQVosWUFBWTtjQUh4QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjthQUMzQjs4REFFVSxJQUFJO2tCQUFaLEtBQUs7WUFDaUIsSUFBSTtrQkFBMUIsS0FBSzttQkFBQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25vdm9UZW1wbGF0ZV0nLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvVGVtcGxhdGUge1xuICBASW5wdXQoKSB0eXBlOiBzdHJpbmc7XG4gIEBJbnB1dCgnbm92b1RlbXBsYXRlJykgbmFtZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55Pikge31cblxuICBnZXRUeXBlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxufVxuIl19
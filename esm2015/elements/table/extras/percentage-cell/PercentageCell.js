// NG2
import { Component } from '@angular/core';
// APP
import { BaseRenderer } from '../base-renderer/BaseRenderer';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function PercentageCell_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "percent");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, ctx_r0.value, "1.0-2"));
} }
export class PercentageCell extends BaseRenderer {
}
PercentageCell.ɵfac = function PercentageCell_Factory(t) { return ɵPercentageCell_BaseFactory(t || PercentageCell); };
PercentageCell.ɵcmp = i0.ɵɵdefineComponent({ type: PercentageCell, selectors: [["percentage-cell"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [["class", "percentage", 4, "ngIf"], [1, "percentage"]], template: function PercentageCell_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, PercentageCell_div_0_Template, 3, 4, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.value || ctx.value === 0);
    } }, directives: [i1.NgIf], pipes: [i1.PercentPipe], encapsulation: 2 });
const ɵPercentageCell_BaseFactory = /*@__PURE__*/ i0.ɵɵgetInheritedFactory(PercentageCell);
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(PercentageCell, [{
        type: Component,
        args: [{
                selector: 'percentage-cell',
                template: ` <div class="percentage" *ngIf="value || value === 0">{{ value | percent: '1.0-2' }}</div> `,
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGVyY2VudGFnZUNlbGwuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvdGFibGUvZXh0cmFzL3BlcmNlbnRhZ2UtY2VsbC9QZXJjZW50YWdlQ2VsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxNQUFNO0FBQ04sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLCtCQUErQixDQUFDOzs7O0lBSS9DLDhCQUFxRDtJQUFBLFlBQThCOztJQUFBLGlCQUFNOzs7SUFBcEMsZUFBOEI7SUFBOUIsaUVBQThCOztBQUVqRyxNQUFNLE9BQU8sY0FBZSxTQUFRLFlBQVk7O21HQUFuQyxjQUFjO21EQUFkLGNBQWM7UUFGYiwrREFBcUQ7O1FBQTdCLG1EQUE0Qjs7MkVBRXJELGNBQWM7a0RBQWQsY0FBYztjQUoxQixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsUUFBUSxFQUFFLDZGQUE2RjthQUN4RyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBBUFBcbmltcG9ydCB7IEJhc2VSZW5kZXJlciB9IGZyb20gJy4uL2Jhc2UtcmVuZGVyZXIvQmFzZVJlbmRlcmVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncGVyY2VudGFnZS1jZWxsJyxcbiAgdGVtcGxhdGU6IGAgPGRpdiBjbGFzcz1cInBlcmNlbnRhZ2VcIiAqbmdJZj1cInZhbHVlIHx8IHZhbHVlID09PSAwXCI+e3sgdmFsdWUgfCBwZXJjZW50OiAnMS4wLTInIH19PC9kaXY+IGAsXG59KVxuZXhwb3J0IGNsYXNzIFBlcmNlbnRhZ2VDZWxsIGV4dGVuZHMgQmFzZVJlbmRlcmVyIHt9XG4iXX0=
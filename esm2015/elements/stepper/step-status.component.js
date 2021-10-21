import { ChangeDetectionStrategy, Component, forwardRef, Inject, Input } from '@angular/core';
import { NovoStepHeader } from './step-header.component';
import { NovoStepper } from './stepper.component';
import * as i0 from "@angular/core";
import * as i1 from "./stepper.component";
import * as i2 from "./step-header.component";
import * as i3 from "@angular/common";
import * as i4 from "../icon/Icon";
function NovoStepStatus_novo_icon_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "novo-icon", 4);
    i0.ɵɵtext(1, "check-circle");
    i0.ɵɵelementEnd();
} }
function NovoStepStatus_novo_icon_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "novo-icon", 4);
    i0.ɵɵtext(1, "check-circle-filled");
    i0.ɵɵelementEnd();
} }
function NovoStepStatus_novo_icon_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "novo-icon", 4);
    i0.ɵɵtext(1, "circle-o");
    i0.ɵɵelementEnd();
} }
export class NovoStepStatus {
    constructor(stepper, step) { }
}
NovoStepStatus.ɵfac = function NovoStepStatus_Factory(t) { return new (t || NovoStepStatus)(i0.ɵɵdirectiveInject(forwardRef(() => NovoStepper)), i0.ɵɵdirectiveInject(forwardRef(() => NovoStepHeader))); };
NovoStepStatus.ɵcmp = i0.ɵɵdefineComponent({ type: NovoStepStatus, selectors: [["novo-step-status"]], hostAttrs: [1, "novo-step-status"], inputs: { state: "state" }, decls: 5, vars: 4, consts: [[1, "novo-stepper-status-line", 3, "ngClass"], [1, "novo-stepper-status-icon", 3, "ngSwitch"], ["size", "small", "color", "positive", 4, "ngSwitchCase"], ["size", "small", "color", "positive", 4, "ngSwitchDefault"], ["size", "small", "color", "positive"]], template: function NovoStepStatus_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelement(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵtemplate(2, NovoStepStatus_novo_icon_2_Template, 2, 0, "novo-icon", 2);
        i0.ɵɵtemplate(3, NovoStepStatus_novo_icon_3_Template, 2, 0, "novo-icon", 2);
        i0.ɵɵtemplate(4, NovoStepStatus_novo_icon_4_Template, 2, 0, "novo-icon", 3);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("ngClass", ctx.state);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitch", ctx.state);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", "edit");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", "done");
    } }, directives: [i3.NgClass, i3.NgSwitch, i3.NgSwitchCase, i3.NgSwitchDefault, i4.NovoIconComponent], encapsulation: 2, changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoStepStatus, [{
        type: Component,
        args: [{
                selector: 'novo-step-status',
                templateUrl: 'step-status.component.html',
                // encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    class: 'novo-step-status',
                },
            }]
    }], function () { return [{ type: i1.NovoStepper, decorators: [{
                type: Inject,
                args: [forwardRef(() => NovoStepper)]
            }] }, { type: i2.NovoStepHeader, decorators: [{
                type: Inject,
                args: [forwardRef(() => NovoStepHeader)]
            }] }]; }, { state: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC1zdGF0dXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL3N0ZXBwZXIvc3RlcC1zdGF0dXMuY29tcG9uZW50LnRzIiwiZWxlbWVudHMvc3RlcHBlci9zdGVwLXN0YXR1cy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7Ozs7SUNBaEQsb0NBQWdFO0lBQUEsNEJBQVk7SUFBQSxpQkFBWTs7O0lBQ3hGLG9DQUFnRTtJQUFBLG1DQUFtQjtJQUFBLGlCQUFZOzs7SUFDL0Ysb0NBQTBEO0lBQUEsd0JBQVE7SUFBQSxpQkFBWTs7QURVaEYsTUFBTSxPQUFPLGNBQWM7SUFJekIsWUFDeUMsT0FBb0IsRUFDakIsSUFBb0IsSUFDN0QsQ0FBQzs7NEVBUE8sY0FBYyx1QkFLZixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLHdCQUM3QixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDO21EQU4vQixjQUFjO1FDZDNCLHlCQUE4RDtRQUM5RCw4QkFDRTtRQUFBLDJFQUFnRTtRQUNoRSwyRUFBZ0U7UUFDaEUsMkVBQTBEO1FBQzVELGlCQUFNOztRQUxnQyxtQ0FBaUI7UUFDbEQsZUFBa0I7UUFBbEIsb0NBQWtCO1FBQ29CLGVBQXNCO1FBQXRCLHFDQUFzQjtRQUN0QixlQUFzQjtRQUF0QixxQ0FBc0I7O2tERFdwRCxjQUFjO2NBVjFCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixXQUFXLEVBQUUsNEJBQTRCO2dCQUN6Qyx5Q0FBeUM7Z0JBQ3pDLG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLGtCQUFrQjtpQkFDMUI7YUFDRjs7c0JBTUksTUFBTTt1QkFBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDOztzQkFDcEMsTUFBTTt1QkFBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDO3dCQUoxQyxLQUFLO2tCQURKLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBmb3J3YXJkUmVmLCBJbmplY3QsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb3ZvU3RlcEhlYWRlciB9IGZyb20gJy4vc3RlcC1oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9TdGVwcGVyIH0gZnJvbSAnLi9zdGVwcGVyLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tc3RlcC1zdGF0dXMnLFxuICB0ZW1wbGF0ZVVybDogJ3N0ZXAtc3RhdHVzLmNvbXBvbmVudC5odG1sJyxcbiAgLy8gZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLXN0ZXAtc3RhdHVzJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1N0ZXBTdGF0dXMge1xuICBASW5wdXQoKVxuICBzdGF0ZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOb3ZvU3RlcHBlcikpIHN0ZXBwZXI6IE5vdm9TdGVwcGVyLFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOb3ZvU3RlcEhlYWRlcikpIHN0ZXA6IE5vdm9TdGVwSGVhZGVyLFxuICApIHt9XG59XG4iLCI8ZGl2IGNsYXNzPVwibm92by1zdGVwcGVyLXN0YXR1cy1saW5lXCIgW25nQ2xhc3NdPVwic3RhdGVcIj48L2Rpdj5cbjxkaXYgW25nU3dpdGNoXT1cInN0YXRlXCIgY2xhc3M9XCJub3ZvLXN0ZXBwZXItc3RhdHVzLWljb25cIj5cbiAgPG5vdm8taWNvbiBzaXplPVwic21hbGxcIiBjb2xvcj1cInBvc2l0aXZlXCIgKm5nU3dpdGNoQ2FzZT1cIidlZGl0J1wiPmNoZWNrLWNpcmNsZTwvbm92by1pY29uPlxuICA8bm92by1pY29uIHNpemU9XCJzbWFsbFwiIGNvbG9yPVwicG9zaXRpdmVcIiAqbmdTd2l0Y2hDYXNlPVwiJ2RvbmUnXCI+Y2hlY2stY2lyY2xlLWZpbGxlZDwvbm92by1pY29uPlxuICA8bm92by1pY29uIHNpemU9XCJzbWFsbFwiIGNvbG9yPVwicG9zaXRpdmVcIiAqbmdTd2l0Y2hEZWZhdWx0PmNpcmNsZS1vPC9ub3ZvLWljb24+XG48L2Rpdj5cbiJdfQ==
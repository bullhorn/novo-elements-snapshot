import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { CdkStepHeader } from '@angular/cdk/stepper';
import { ChangeDetectionStrategy, Component, ElementRef, Input } from '@angular/core';
import { NovoStepLabel } from './step-label.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/a11y";
function NovoStepHeader_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "novo-icon", 5);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("theme", ctx_r0.theme);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r0.icon);
} }
function NovoStepHeader_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "span", 6);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.index + 1);
} }
function NovoStepHeader_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0, 7);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r2._templateLabel().template);
} }
function NovoStepHeader_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r3.label);
} }
export class NovoStepHeader extends CdkStepHeader {
    constructor(_focusMonitor, _element) {
        super(_element);
        this._focusMonitor = _focusMonitor;
        this._element = _element;
        _focusMonitor.monitor(_element.nativeElement, true);
    }
    /** Index of the given step. */
    get index() {
        return this._index;
    }
    set index(value) {
        this._index = coerceNumberProperty(value);
    }
    /** Whether the given step is selected. */
    get selected() {
        return this._selected;
    }
    set selected(value) {
        this._selected = coerceBooleanProperty(value);
    }
    /** Whether the given step label is active. */
    get active() {
        return this._active;
    }
    set active(value) {
        this._active = coerceBooleanProperty(value);
    }
    /** Whether the given step label is active. */
    get touched() {
        return this.selected || this.state === 'edit' || this.state === 'done';
    }
    /** Whether the given step is optional. */
    get optional() {
        return this._optional;
    }
    set optional(value) {
        this._optional = coerceBooleanProperty(value);
    }
    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._element.nativeElement);
    }
    /** Returns string label of given step if it is a text label. */
    _stringLabel() {
        return this.label instanceof NovoStepLabel ? null : this.label;
    }
    /** Returns NovoStepLabel if the label of given step is a template label. */
    _templateLabel() {
        return this.label instanceof NovoStepLabel ? this.label : null;
    }
    /** Returns the host HTML element. */
    _getHostElement() {
        return this._element.nativeElement;
    }
}
NovoStepHeader.ɵfac = function NovoStepHeader_Factory(t) { return new (t || NovoStepHeader)(i0.ɵɵdirectiveInject(i1.FocusMonitor), i0.ɵɵdirectiveInject(i0.ElementRef)); };
NovoStepHeader.ɵcmp = i0.ɵɵdefineComponent({ type: NovoStepHeader, selectors: [["novo-step-header"]], hostAttrs: ["role", "tab", 1, "novo-step-header"], inputs: { theme: "theme", color: "color", icon: "icon", state: "state", label: "label", iconOverrides: "iconOverrides", index: "index", selected: "selected", active: "active", optional: "optional" }, features: [i0.ɵɵInheritDefinitionFeature], decls: 7, vars: 13, consts: [[4, "ngIf"], [1, "novo-step-label"], [3, "ngTemplateOutlet", 4, "ngIf"], ["class", "novo-step-text-label", 4, "ngIf"], [3, "state"], ["size", "small", "raised", "true", 3, "theme"], [1, "novo-step-number"], [3, "ngTemplateOutlet"], [1, "novo-step-text-label"]], template: function NovoStepHeader_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div");
        i0.ɵɵtemplate(1, NovoStepHeader_ng_container_1_Template, 3, 2, "ng-container", 0);
        i0.ɵɵtemplate(2, NovoStepHeader_ng_container_2_Template, 3, 1, "ng-container", 0);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(3, "div", 1);
        i0.ɵɵtemplate(4, NovoStepHeader_ng_container_4_Template, 1, 1, "ng-container", 2);
        i0.ɵɵtemplate(5, NovoStepHeader_div_5_Template, 2, 1, "div", 3);
        i0.ɵɵelementEnd();
        i0.ɵɵelement(6, "novo-step-status", 4);
    } if (rf & 2) {
        i0.ɵɵclassProp("novo-step-icon", ctx.touched)("novo-step-icon-not-touched", !ctx.touched);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.icon);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.icon);
        i0.ɵɵadvance(1);
        i0.ɵɵclassProp("novo-step-label-active", ctx.active)("novo-step-label-selected", ctx.selected);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx._templateLabel());
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx._stringLabel());
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("state", ctx.state);
    } }, styles: ["@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}.novo-step-header[_ngcontent-%COMP%]{cursor:pointer;outline:none;overflow:visible;position:relative}.novo-step-optional[_ngcontent-%COMP%]{font-size:12px}.novo-step-icon[_ngcontent-%COMP%], .novo-step-icon-not-touched[_ngcontent-%COMP%]{align-items:center;border-radius:50%;display:flex;height:24px;justify-content:center;width:24px}.novo-step-icon-not-touched[_ngcontent-%COMP%]   .novo-step-number[_ngcontent-%COMP%], .novo-step-icon[_ngcontent-%COMP%]   .novo-step-number[_ngcontent-%COMP%]{align-items:center;border-radius:4px;box-shadow:2px 2px 0 rgba(0,0,0,.2);display:flex;font-size:1em;height:1.6em;justify-content:center;min-width:1.6em}.novo-step-icon[_ngcontent-%COMP%]   .novo-step-number[_ngcontent-%COMP%]{background:#4a89dc;color:#fff}.novo-step-icon-not-touched[_ngcontent-%COMP%]   .novo-step-number[_ngcontent-%COMP%]{background:#a9adbb;color:#fff}.novo-step-label[_ngcontent-%COMP%]{display:inline-block;min-width:50px;padding:4px 0;vertical-align:middle;white-space:nowrap}.novo-step-label[_ngcontent-%COMP%], .novo-step-text-label[_ngcontent-%COMP%]{overflow:hidden;text-align:center;text-overflow:ellipsis}"], changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoStepHeader, [{
        type: Component,
        args: [{
                selector: 'novo-step-header',
                templateUrl: 'step-header.component.html',
                styleUrls: ['step-header.component.scss'],
                host: {
                    class: 'novo-step-header',
                    role: 'tab',
                },
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
            }]
    }], function () { return [{ type: i1.FocusMonitor }, { type: i0.ElementRef }]; }, { theme: [{
            type: Input
        }], color: [{
            type: Input
        }], icon: [{
            type: Input
        }], state: [{
            type: Input
        }], label: [{
            type: Input
        }], iconOverrides: [{
            type: Input
        }], index: [{
            type: Input
        }], selected: [{
            type: Input
        }], active: [{
            type: Input
        }], optional: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC1oZWFkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL3N0ZXBwZXIvc3RlcC1oZWFkZXIuY29tcG9uZW50LnRzIiwiZWxlbWVudHMvc3RlcHBlci9zdGVwLWhlYWRlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBMEIsTUFBTSxlQUFlLENBQUM7QUFDOUcsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7O0lDRnJELDZCQUNFO0lBQUEsb0NBQXNEO0lBQUEsWUFBUTtJQUFBLGlCQUFZO0lBQzVFLDBCQUFlOzs7SUFEeUIsZUFBZTtJQUFmLG9DQUFlO0lBQUMsZUFBUTtJQUFSLGlDQUFROzs7SUFFaEUsNkJBQ0U7SUFBQSwrQkFBK0I7SUFBQSxZQUFhO0lBQUEsaUJBQU87SUFDckQsMEJBQWU7OztJQURrQixlQUFhO0lBQWIsc0NBQWE7OztJQU85QywyQkFDZTs7O0lBRHdCLG1FQUErQzs7O0lBR3RGLDhCQUF5RDtJQUFBLFlBQVM7SUFBQSxpQkFBTTs7O0lBQWYsZUFBUztJQUFULGtDQUFTOztBRENwRSxNQUFNLE9BQU8sY0FBZSxTQUFRLGFBQWE7SUFnRS9DLFlBQW9CLGFBQTJCLEVBQVUsUUFBb0I7UUFDM0UsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBREUsa0JBQWEsR0FBYixhQUFhLENBQWM7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFZO1FBRTNFLGFBQWEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBaERELCtCQUErQjtJQUMvQixJQUNJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUNELElBQUksS0FBSyxDQUFDLEtBQWE7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBR0QsMENBQTBDO0lBQzFDLElBQ0ksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBYztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFHRCw4Q0FBOEM7SUFDOUMsSUFDSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFDRCxJQUFJLE1BQU0sQ0FBQyxLQUFjO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUdELDhDQUE4QztJQUM5QyxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUM7SUFDekUsQ0FBQztJQUVELDBDQUEwQztJQUMxQyxJQUNJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUNELElBQUksUUFBUSxDQUFDLEtBQWM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBUUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELGdFQUFnRTtJQUNoRSxZQUFZO1FBQ1YsT0FBTyxJQUFJLENBQUMsS0FBSyxZQUFZLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ2pFLENBQUM7SUFFRCw0RUFBNEU7SUFDNUUsY0FBYztRQUNaLE9BQU8sSUFBSSxDQUFDLEtBQUssWUFBWSxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNqRSxDQUFDO0lBRUQscUNBQXFDO0lBQ3JDLGVBQWU7UUFDYixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO0lBQ3JDLENBQUM7OzRFQXRGVSxjQUFjO21EQUFkLGNBQWM7UUNqQjNCLDJCQUVFO1FBQUEsaUZBQ0U7UUFFRixpRkFDRTtRQUVKLGlCQUFNO1FBQ04sOEJBR0U7UUFDQSxpRkFDQTtRQUVBLCtEQUF5RDtRQUMzRCxpQkFBTTtRQUNOLHNDQUFxRDs7UUFsQmhELDZDQUFnQyw0Q0FBQTtRQUVyQixlQUFZO1FBQVosK0JBQVk7UUFHWixlQUFhO1FBQWIsZ0NBQWE7UUFLeEIsZUFBdUM7UUFBdkMsb0RBQXVDLDBDQUFBO1FBRzVCLGVBQXdCO1FBQXhCLDJDQUF3QjtRQUdKLGVBQXNCO1FBQXRCLHlDQUFzQjtRQUV4QyxlQUFlO1FBQWYsaUNBQWU7O2tERERwQixjQUFjO2NBWDFCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixXQUFXLEVBQUUsNEJBQTRCO2dCQUN6QyxTQUFTLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztnQkFDekMsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSxrQkFBa0I7b0JBQ3pCLElBQUksRUFBRSxLQUFLO2lCQUNaO2dCQUNELG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEO3dGQUdDLEtBQUs7a0JBREosS0FBSztZQUdOLEtBQUs7a0JBREosS0FBSztZQUdOLElBQUk7a0JBREgsS0FBSztZQUlOLEtBQUs7a0JBREosS0FBSztZQUtOLEtBQUs7a0JBREosS0FBSztZQUtOLGFBQWE7a0JBRFosS0FBSztZQUtGLEtBQUs7a0JBRFIsS0FBSztZQVdGLFFBQVE7a0JBRFgsS0FBSztZQVdGLE1BQU07a0JBRFQsS0FBSztZQWdCRixRQUFRO2tCQURYLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c01vbml0b3IgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHksIGNvZXJjZU51bWJlclByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IENka1N0ZXBIZWFkZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvc3RlcHBlcic7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgT25EZXN0cm95LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b1N0ZXBMYWJlbCB9IGZyb20gJy4vc3RlcC1sYWJlbC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXN0ZXAtaGVhZGVyJyxcbiAgdGVtcGxhdGVVcmw6ICdzdGVwLWhlYWRlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydzdGVwLWhlYWRlci5jb21wb25lbnQuc2NzcyddLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLXN0ZXAtaGVhZGVyJyxcbiAgICByb2xlOiAndGFiJyxcbiAgfSxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvU3RlcEhlYWRlciBleHRlbmRzIENka1N0ZXBIZWFkZXIgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBASW5wdXQoKVxuICB0aGVtZTogc3RyaW5nO1xuICBASW5wdXQoKVxuICBjb2xvcjogc3RyaW5nO1xuICBASW5wdXQoKVxuICBpY29uOiBzdHJpbmc7XG4gIC8qKiBTdGF0ZSBvZiB0aGUgZ2l2ZW4gc3RlcC4gKi9cbiAgQElucHV0KClcbiAgc3RhdGU6IHN0cmluZztcblxuICAvKiogTGFiZWwgb2YgdGhlIGdpdmVuIHN0ZXAuICovXG4gIEBJbnB1dCgpXG4gIGxhYmVsOiBOb3ZvU3RlcExhYmVsIHwgc3RyaW5nO1xuXG4gIC8qKiBPdmVycmlkZXMgZm9yIHRoZSBoZWFkZXIgaWNvbnMsIHBhc3NlZCBpbiB2aWEgdGhlIHN0ZXBwZXIuICovXG4gIEBJbnB1dCgpXG4gIGljb25PdmVycmlkZXM6IHsgW2tleTogc3RyaW5nXTogVGVtcGxhdGVSZWY8YW55PiB9O1xuXG4gIC8qKiBJbmRleCBvZiB0aGUgZ2l2ZW4gc3RlcC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGluZGV4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2luZGV4O1xuICB9XG4gIHNldCBpbmRleCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5faW5kZXggPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfaW5kZXg6IG51bWJlcjtcblxuICAvKiogV2hldGhlciB0aGUgZ2l2ZW4gc3RlcCBpcyBzZWxlY3RlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcbiAgfVxuICBzZXQgc2VsZWN0ZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zZWxlY3RlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IGJvb2xlYW47XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGdpdmVuIHN0ZXAgbGFiZWwgaXMgYWN0aXZlLiAqL1xuICBASW5wdXQoKVxuICBnZXQgYWN0aXZlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmU7XG4gIH1cbiAgc2V0IGFjdGl2ZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2FjdGl2ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfYWN0aXZlOiBib29sZWFuO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBnaXZlbiBzdGVwIGxhYmVsIGlzIGFjdGl2ZS4gKi9cbiAgZ2V0IHRvdWNoZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQgfHwgdGhpcy5zdGF0ZSA9PT0gJ2VkaXQnIHx8IHRoaXMuc3RhdGUgPT09ICdkb25lJztcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBnaXZlbiBzdGVwIGlzIG9wdGlvbmFsLiAqL1xuICBASW5wdXQoKVxuICBnZXQgb3B0aW9uYWwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbmFsO1xuICB9XG4gIHNldCBvcHRpb25hbCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX29wdGlvbmFsID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9vcHRpb25hbDogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9mb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvciwgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZikge1xuICAgIHN1cGVyKF9lbGVtZW50KTtcbiAgICBfZm9jdXNNb25pdG9yLm1vbml0b3IoX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgdHJ1ZSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9mb2N1c01vbml0b3Iuc3RvcE1vbml0b3JpbmcodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHN0cmluZyBsYWJlbCBvZiBnaXZlbiBzdGVwIGlmIGl0IGlzIGEgdGV4dCBsYWJlbC4gKi9cbiAgX3N0cmluZ0xhYmVsKCk6IHN0cmluZyB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLmxhYmVsIGluc3RhbmNlb2YgTm92b1N0ZXBMYWJlbCA/IG51bGwgOiB0aGlzLmxhYmVsO1xuICB9XG5cbiAgLyoqIFJldHVybnMgTm92b1N0ZXBMYWJlbCBpZiB0aGUgbGFiZWwgb2YgZ2l2ZW4gc3RlcCBpcyBhIHRlbXBsYXRlIGxhYmVsLiAqL1xuICBfdGVtcGxhdGVMYWJlbCgpOiBOb3ZvU3RlcExhYmVsIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMubGFiZWwgaW5zdGFuY2VvZiBOb3ZvU3RlcExhYmVsID8gdGhpcy5sYWJlbCA6IG51bGw7XG4gIH1cblxuICAvKiogUmV0dXJucyB0aGUgaG9zdCBIVE1MIGVsZW1lbnQuICovXG4gIF9nZXRIb3N0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICB9XG59XG4iLCI8ZGl2IFtjbGFzcy5ub3ZvLXN0ZXAtaWNvbl09XCJ0b3VjaGVkXCJcbiAgICAgW2NsYXNzLm5vdm8tc3RlcC1pY29uLW5vdC10b3VjaGVkXT1cIiF0b3VjaGVkXCI+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJpY29uXCI+XG4gICAgPG5vdm8taWNvbiBzaXplPVwic21hbGxcIiByYWlzZWQ9XCJ0cnVlXCIgW3RoZW1lXT1cInRoZW1lXCI+e3tpY29ufX08L25vdm8taWNvbj5cbiAgPC9uZy1jb250YWluZXI+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCIhaWNvblwiPlxuICAgIDxzcGFuIGNsYXNzPVwibm92by1zdGVwLW51bWJlclwiPnt7aW5kZXggKyAxfX08L3NwYW4+XG4gIDwvbmctY29udGFpbmVyPlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwibm92by1zdGVwLWxhYmVsXCJcbiAgICAgW2NsYXNzLm5vdm8tc3RlcC1sYWJlbC1hY3RpdmVdPVwiYWN0aXZlXCJcbiAgICAgW2NsYXNzLm5vdm8tc3RlcC1sYWJlbC1zZWxlY3RlZF09XCJzZWxlY3RlZFwiPlxuICA8IS0tIElmIHRoZXJlIGlzIGEgbGFiZWwgdGVtcGxhdGUsIHVzZSBpdC4gLS0+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJfdGVtcGxhdGVMYWJlbCgpXCIgW25nVGVtcGxhdGVPdXRsZXRdPVwiX3RlbXBsYXRlTGFiZWwoKSEudGVtcGxhdGVcIj5cbiAgPC9uZy1jb250YWluZXI+XG4gIDwhLS0gSXQgdGhlcmUgaXMgbm8gbGFiZWwgdGVtcGxhdGUsIGZhbGwgYmFjayB0byB0aGUgdGV4dCBsYWJlbC4gLS0+XG4gIDxkaXYgY2xhc3M9XCJub3ZvLXN0ZXAtdGV4dC1sYWJlbFwiICpuZ0lmPVwiX3N0cmluZ0xhYmVsKClcIj57e2xhYmVsfX08L2Rpdj5cbjwvZGl2PlxuPG5vdm8tc3RlcC1zdGF0dXMgW3N0YXRlXT1cInN0YXRlXCI+PC9ub3ZvLXN0ZXAtc3RhdHVzPlxuIl19
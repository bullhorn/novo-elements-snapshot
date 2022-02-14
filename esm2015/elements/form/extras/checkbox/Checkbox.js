// NG2
import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// APP
import { Helpers } from '../../../../utils/Helpers';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/common";
function NovoCheckboxElement_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r0.label);
} }
function NovoCheckboxElement_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵprojection(1);
    i0.ɵɵelementEnd();
} }
const _c0 = ["*"];
// Value accessor for the component (supports ngModel)
const CHECKBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoCheckboxElement),
    multi: true,
};
const LAYOUT_DEFAULTS = { iconStyle: 'box' };
export class NovoCheckboxElement {
    constructor(ref) {
        this.ref = ref;
        this.indeterminate = false;
        this.disabled = false;
        this.onSelect = new EventEmitter();
        this.boxIcon = true;
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    ngOnInit() {
        this.layoutOptions = Object.assign({}, LAYOUT_DEFAULTS, this.layoutOptions);
        this.boxIcon = this.layoutOptions.iconStyle === 'box';
    }
    select(event) {
        Helpers.swallowEvent(event);
        if (!this.disabled) {
            this.model = !this.model;
            this.onModelChange(this.model);
            this.onSelect.emit({ originalEvent: event, value: this.model });
        }
    }
    writeValue(model) {
        this.model = model;
        this.ref.markForCheck();
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(disabled) {
        this.disabled = disabled;
    }
}
NovoCheckboxElement.ɵfac = function NovoCheckboxElement_Factory(t) { return new (t || NovoCheckboxElement)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
NovoCheckboxElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoCheckboxElement, selectors: [["novo-checkbox"]], inputs: { name: "name", label: "label", indeterminate: "indeterminate", disabled: "disabled", layoutOptions: "layoutOptions" }, outputs: { onSelect: "onSelect" }, features: [i0.ɵɵProvidersFeature([CHECKBOX_VALUE_ACCESSOR])], ngContentSelectors: _c0, decls: 6, vars: 25, consts: [[1, "check-box-group"], ["type", "checkbox", 3, "name", "ngModel", "disabled", "ngModelChange"], [3, "click"], [4, "ngIf"]], template: function NovoCheckboxElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "input", 1);
        i0.ɵɵlistener("ngModelChange", function NovoCheckboxElement_Template_input_ngModelChange_1_listener($event) { return ctx.model = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(2, "label", 2);
        i0.ɵɵlistener("click", function NovoCheckboxElement_Template_label_click_2_listener($event) { return ctx.select($event); });
        i0.ɵɵelement(3, "i");
        i0.ɵɵtemplate(4, NovoCheckboxElement_span_4_Template, 2, 1, "span", 3);
        i0.ɵɵtemplate(5, NovoCheckboxElement_span_5_Template, 2, 0, "span", 3);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵclassProp("checked", ctx.model)("disabled", ctx.disabled);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("name", ctx.name)("ngModel", ctx.model)("disabled", ctx.disabled);
        i0.ɵɵattribute("id", ctx.name);
        i0.ɵɵadvance(1);
        i0.ɵɵclassProp("disabled", ctx.disabled);
        i0.ɵɵattribute("for", ctx.name);
        i0.ɵɵadvance(1);
        i0.ɵɵclassProp("bhi-checkbox-empty", !ctx.model && !ctx.indeterminate && ctx.boxIcon)("bhi-checkbox-filled", ctx.model && !ctx.indeterminate && ctx.boxIcon)("bhi-checkbox-indeterminate", ctx.indeterminate && ctx.boxIcon)("bhi-circle-o", !ctx.model && !ctx.indeterminate && !ctx.boxIcon)("bhi-check", ctx.model && !ctx.indeterminate && !ctx.boxIcon)("bhi-circle", ctx.indeterminate && !ctx.boxIcon);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.label);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.label);
    } }, directives: [i1.CheckboxControlValueAccessor, i1.NgControlStatus, i1.NgModel, i2.NgIf], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoCheckboxElement, [{
        type: Component,
        args: [{
                selector: 'novo-checkbox',
                providers: [CHECKBOX_VALUE_ACCESSOR],
                template: `
    <div class="check-box-group" [class.checked]="model" [class.disabled]="disabled">
      <input [name]="name" type="checkbox" [(ngModel)]="model" [attr.id]="name" [disabled]="disabled" />
      <label [attr.for]="name" (click)="select($event)" [class.disabled]="disabled">
        <i
          [class.bhi-checkbox-empty]="!model && !indeterminate && boxIcon"
          [class.bhi-checkbox-filled]="model && !indeterminate && boxIcon"
          [class.bhi-checkbox-indeterminate]="indeterminate && boxIcon"
          [class.bhi-circle-o]="!model && !indeterminate && !boxIcon"
          [class.bhi-check]="model && !indeterminate && !boxIcon"
          [class.bhi-circle]="indeterminate && !boxIcon"
        ></i>
        <span *ngIf="label">{{ label }}</span>
        <span *ngIf="!label"><ng-content></ng-content></span>
      </label>
    </div>
  `,
            }]
    }], function () { return [{ type: i0.ChangeDetectorRef }]; }, { name: [{
            type: Input
        }], label: [{
            type: Input
        }], indeterminate: [{
            type: Input
        }], disabled: [{
            type: Input
        }], layoutOptions: [{
            type: Input
        }], onSelect: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlY2tib3guanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvZm9ybS9leHRyYXMvY2hlY2tib3gvQ2hlY2tib3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlHLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxNQUFNO0FBQ04sT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDJCQUEyQixDQUFDOzs7OztJQTBCNUMsNEJBQW9CO0lBQUEsWUFBVztJQUFBLGlCQUFPOzs7SUFBbEIsZUFBVztJQUFYLGtDQUFXOzs7SUFDL0IsNEJBQXFCO0lBQUEsa0JBQVk7SUFBYSxpQkFBTzs7O0FBekI3RCxzREFBc0Q7QUFDdEQsTUFBTSx1QkFBdUIsR0FBRztJQUM5QixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsbUJBQW1CLENBQUM7SUFDbEQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBRUYsTUFBTSxlQUFlLEdBQUcsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUM7QUF1QjdDLE1BQU0sT0FBTyxtQkFBbUI7SUFxQjlCLFlBQW9CLEdBQXNCO1FBQXRCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBZjFDLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBRS9CLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFLMUIsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWpELFlBQU8sR0FBWSxJQUFJLENBQUM7UUFHeEIsa0JBQWEsR0FBYSxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7UUFDbkMsbUJBQWMsR0FBYSxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7SUFFUyxDQUFDO0lBRTlDLFFBQVE7UUFDTixJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLGVBQWUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsS0FBSyxLQUFLLENBQUM7SUFDeEQsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFZO1FBQ2pCLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDekIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUNqRTtJQUNILENBQUM7SUFFRCxVQUFVLENBQUMsS0FBVTtRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxFQUFZO1FBQzNCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxFQUFZO1FBQzVCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxRQUFpQjtRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDOztzRkFwRFUsbUJBQW1CO3dEQUFuQixtQkFBbUIsc09BbkJuQixDQUFDLHVCQUF1QixDQUFDOztRQUVsQyw4QkFDRTtRQUFBLGdDQUNBO1FBRHFDLDJJQUFtQjtRQUF4RCxpQkFDQTtRQUFBLGdDQUNFO1FBRHVCLHFHQUFTLGtCQUFjLElBQUM7UUFDL0Msb0JBT0s7UUFDTCxzRUFBb0I7UUFDcEIsc0VBQXFCO1FBQ3ZCLGlCQUFRO1FBQ1YsaUJBQU07O1FBZHVCLG9DQUF1QiwwQkFBQTtRQUMzQyxlQUFhO1FBQWIsK0JBQWEsc0JBQUEsMEJBQUE7UUFBcUMsOEJBQWdCO1FBQ3ZCLGVBQTJCO1FBQTNCLHdDQUEyQjtRQUF0RSwrQkFBaUI7UUFFcEIsZUFBZ0U7UUFBaEUscUZBQWdFLHVFQUFBLGdFQUFBLGtFQUFBLDhEQUFBLGlEQUFBO1FBTzVELGVBQWE7UUFBYixnQ0FBYTtRQUNiLGVBQWM7UUFBZCxpQ0FBYzs7a0RBS2YsbUJBQW1CO2NBckIvQixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFNBQVMsRUFBRSxDQUFDLHVCQUF1QixDQUFDO2dCQUNwQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQlQ7YUFDRjtvRUFHQyxJQUFJO2tCQURILEtBQUs7WUFHTixLQUFLO2tCQURKLEtBQUs7WUFHTixhQUFhO2tCQURaLEtBQUs7WUFHTixRQUFRO2tCQURQLEtBQUs7WUFHTixhQUFhO2tCQURaLEtBQUs7WUFJTixRQUFRO2tCQURQLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG4vLyBBUFBcbmltcG9ydCB7IEhlbHBlcnMgfSBmcm9tICcuLi8uLi8uLi8uLi91dGlscy9IZWxwZXJzJztcblxuLy8gVmFsdWUgYWNjZXNzb3IgZm9yIHRoZSBjb21wb25lbnQgKHN1cHBvcnRzIG5nTW9kZWwpXG5jb25zdCBDSEVDS0JPWF9WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdm9DaGVja2JveEVsZW1lbnQpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbmNvbnN0IExBWU9VVF9ERUZBVUxUUyA9IHsgaWNvblN0eWxlOiAnYm94JyB9O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWNoZWNrYm94JyxcbiAgcHJvdmlkZXJzOiBbQ0hFQ0tCT1hfVkFMVUVfQUNDRVNTT1JdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJjaGVjay1ib3gtZ3JvdXBcIiBbY2xhc3MuY2hlY2tlZF09XCJtb2RlbFwiIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxuICAgICAgPGlucHV0IFtuYW1lXT1cIm5hbWVcIiB0eXBlPVwiY2hlY2tib3hcIiBbKG5nTW9kZWwpXT1cIm1vZGVsXCIgW2F0dHIuaWRdPVwibmFtZVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIC8+XG4gICAgICA8bGFiZWwgW2F0dHIuZm9yXT1cIm5hbWVcIiAoY2xpY2spPVwic2VsZWN0KCRldmVudClcIiBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICAgICAgPGlcbiAgICAgICAgICBbY2xhc3MuYmhpLWNoZWNrYm94LWVtcHR5XT1cIiFtb2RlbCAmJiAhaW5kZXRlcm1pbmF0ZSAmJiBib3hJY29uXCJcbiAgICAgICAgICBbY2xhc3MuYmhpLWNoZWNrYm94LWZpbGxlZF09XCJtb2RlbCAmJiAhaW5kZXRlcm1pbmF0ZSAmJiBib3hJY29uXCJcbiAgICAgICAgICBbY2xhc3MuYmhpLWNoZWNrYm94LWluZGV0ZXJtaW5hdGVdPVwiaW5kZXRlcm1pbmF0ZSAmJiBib3hJY29uXCJcbiAgICAgICAgICBbY2xhc3MuYmhpLWNpcmNsZS1vXT1cIiFtb2RlbCAmJiAhaW5kZXRlcm1pbmF0ZSAmJiAhYm94SWNvblwiXG4gICAgICAgICAgW2NsYXNzLmJoaS1jaGVja109XCJtb2RlbCAmJiAhaW5kZXRlcm1pbmF0ZSAmJiAhYm94SWNvblwiXG4gICAgICAgICAgW2NsYXNzLmJoaS1jaXJjbGVdPVwiaW5kZXRlcm1pbmF0ZSAmJiAhYm94SWNvblwiXG4gICAgICAgID48L2k+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwibGFiZWxcIj57eyBsYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCIhbGFiZWxcIj48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9zcGFuPlxuICAgICAgPC9sYWJlbD5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0NoZWNrYm94RWxlbWVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQge1xuICBASW5wdXQoKVxuICBuYW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIGxhYmVsOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIGluZGV0ZXJtaW5hdGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KClcbiAgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KClcbiAgbGF5b3V0T3B0aW9uczogeyBpY29uU3R5bGU/OiBzdHJpbmcgfTsgLy8gVE9ETyAtIGF2b2lkIGNvbmZpZ3MgbGlrZSB0aGlzXG5cbiAgQE91dHB1dCgpXG4gIG9uU2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBib3hJY29uOiBib29sZWFuID0gdHJ1ZTtcbiAgbW9kZWw7XG5cbiAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubGF5b3V0T3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIExBWU9VVF9ERUZBVUxUUywgdGhpcy5sYXlvdXRPcHRpb25zKTtcbiAgICB0aGlzLmJveEljb24gPSB0aGlzLmxheW91dE9wdGlvbnMuaWNvblN0eWxlID09PSAnYm94JztcbiAgfVxuXG4gIHNlbGVjdChldmVudDogRXZlbnQpIHtcbiAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLm1vZGVsID0gIXRoaXMubW9kZWw7XG4gICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy5tb2RlbCk7XG4gICAgICB0aGlzLm9uU2VsZWN0LmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgdmFsdWU6IHRoaXMubW9kZWwgfSk7XG4gICAgfVxuICB9XG5cbiAgd3JpdGVWYWx1ZShtb2RlbDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoZGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gIH1cbn1cbiJdfQ==
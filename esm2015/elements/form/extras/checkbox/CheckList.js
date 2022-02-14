// NG2
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// APP
import { Helpers } from '../../../../utils/Helpers';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
const _c0 = function (a0) { return { checked: a0 }; };
const _c1 = function (a0, a1) { return { "bhi-checkbox-empty": a0, "bhi-checkbox-filled": a1 }; };
function NovoCheckListElement_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵelementStart(1, "input", 2);
    i0.ɵɵlistener("change", function NovoCheckListElement_div_0_Template_input_change_1_listener($event) { i0.ɵɵrestoreView(_r4); const option_r1 = ctx.$implicit; const ctx_r3 = i0.ɵɵnextContext(); return ctx_r3.select($event, option_r1); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "label", 3);
    i0.ɵɵlistener("click", function NovoCheckListElement_div_0_Template_label_click_2_listener($event) { i0.ɵɵrestoreView(_r4); const option_r1 = ctx.$implicit; const ctx_r5 = i0.ɵɵnextContext(); return ctx_r5.select($event, option_r1); });
    i0.ɵɵelement(3, "i", 4);
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r1 = ctx.$implicit;
    const i_r2 = ctx.index;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("disabled", ctx_r0.disabled);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(12, _c0, option_r1.checked));
    i0.ɵɵattribute("data-automation-id", option_r1.label);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("name", ctx_r0.name)("ngModel", option_r1.checked)("value", option_r1.checked)("disabled", ctx_r0.disabled);
    i0.ɵɵattribute("id", ctx_r0.name + i_r2);
    i0.ɵɵadvance(1);
    i0.ɵɵattribute("for", ctx_r0.name + i_r2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(14, _c1, !option_r1.checked, option_r1.checked));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r1.label);
} }
// Value accessor for the component (supports ngModel)
const CHECKLIST_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoCheckListElement),
    multi: true,
};
export class NovoCheckListElement {
    constructor() {
        this.onSelect = new EventEmitter();
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    ngOnInit() {
        this.setModel();
        this.setupOptions();
    }
    select(event, item) {
        Helpers.swallowEvent(event);
        if (!this.disabled) {
            item.checked = !item.checked;
            this.model = this._options.filter((checkBox) => checkBox.checked).map((x) => x.value);
            this.onModelChange(this.model.length > 0 ? this.model : '');
            this.onSelect.emit({ selected: this.model });
        }
    }
    setupOptions() {
        this.options = this.options || [];
        this._options = [];
        if (this.options.length && !this.options[0].value) {
            this.options.forEach((option) => {
                const formattedOption = {
                    value: option,
                    label: option,
                    checked: this.model && this.model.length && this.model.indexOf(option.value) !== -1,
                };
                this._options.push(formattedOption);
            });
        }
        else {
            this.options.forEach((option) => {
                const formattedOption = option;
                formattedOption.checked = this.model && this.model.length && this.model.indexOf(option.value) !== -1;
                this._options.push(formattedOption);
            });
        }
    }
    setModel() {
        const checkedOptions = this.options.filter((checkBox) => checkBox.checked).map((x) => x.value);
        this.writeValue(checkedOptions);
    }
    writeValue(model) {
        this.model = model || [];
        if (model) {
            this.setupOptions();
        }
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
NovoCheckListElement.ɵfac = function NovoCheckListElement_Factory(t) { return new (t || NovoCheckListElement)(); };
NovoCheckListElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoCheckListElement, selectors: [["novo-check-list"]], inputs: { name: "name", options: "options", disabled: "disabled" }, outputs: { onSelect: "onSelect" }, features: [i0.ɵɵProvidersFeature([CHECKLIST_VALUE_ACCESSOR])], decls: 1, vars: 1, consts: [["class", "check-box-group", 3, "ngClass", "disabled", 4, "ngFor", "ngForOf"], [1, "check-box-group", 3, "ngClass"], ["type", "checkbox", 3, "name", "ngModel", "value", "disabled", "change"], [3, "click"], [3, "ngClass"]], template: function NovoCheckListElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, NovoCheckListElement_div_0_Template, 6, 17, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngForOf", ctx._options);
    } }, directives: [i1.NgForOf, i1.NgClass, i2.CheckboxControlValueAccessor, i2.NgControlStatus, i2.NgModel], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoCheckListElement, [{
        type: Component,
        args: [{
                selector: 'novo-check-list',
                providers: [CHECKLIST_VALUE_ACCESSOR],
                template: `
    <div
      class="check-box-group"
      *ngFor="let option of _options; let i = index"
      [ngClass]="{ checked: option.checked }"
      [class.disabled]="disabled"
      [attr.data-automation-id]="option.label"
    >
      <input
        [name]="name"
        type="checkbox"
        [ngModel]="option.checked"
        [attr.id]="name + i"
        [value]="option.checked"
        (change)="select($event, option)"
        [disabled]="disabled"
      />
      <label [attr.for]="name + i" (click)="select($event, option)">
        <i [ngClass]="{ 'bhi-checkbox-empty': !option.checked, 'bhi-checkbox-filled': option.checked }"></i>
        <span>{{ option.label }}</span>
      </label>
    </div>
  `,
            }]
    }], null, { name: [{
            type: Input
        }], options: [{
            type: Input
        }], disabled: [{
            type: Input
        }], onSelect: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlY2tMaXN0LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2Zvcm0vZXh0cmFzL2NoZWNrYm94L0NoZWNrTGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0YsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE1BQU07QUFDTixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7Ozs7Ozs7O0lBYWhELDhCQU9FO0lBQUEsZ0NBU0E7SUFIRSw2T0FBaUM7SUFObkMsaUJBU0E7SUFBQSxnQ0FDRTtJQUQyQiwyT0FBZ0M7SUFDM0QsdUJBQW9HO0lBQ3BHLDRCQUFNO0lBQUEsWUFBa0I7SUFBQSxpQkFBTztJQUNqQyxpQkFBUTtJQUNWLGlCQUFNOzs7OztJQWhCSiwyQ0FBMkI7SUFEM0Isd0VBQXVDO0lBRXZDLHFEQUF3QztJQUd0QyxlQUFhO0lBQWIsa0NBQWEsOEJBQUEsNEJBQUEsNkJBQUE7SUFHYix3Q0FBb0I7SUFLZixlQUFxQjtJQUFyQix5Q0FBcUI7SUFDdkIsZUFBNEY7SUFBNUYsNEZBQTRGO0lBQ3pGLGVBQWtCO0lBQWxCLHFDQUFrQjs7QUE3QmhDLHNEQUFzRDtBQUN0RCxNQUFNLHdCQUF3QixHQUFHO0lBQy9CLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztJQUNuRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUE2QkYsTUFBTSxPQUFPLG9CQUFvQjtJQTNCakM7UUFtQ0UsYUFBUSxHQUFz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QUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFVO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUN6QixJQUFJLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNyQjtJQUNILENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxFQUFZO1FBQzNCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxFQUFZO1FBQzVCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxRQUFpQjtRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDOzt3RkF6RVUsb0JBQW9CO3lEQUFwQixvQkFBb0IsNEtBekJwQixDQUFDLHdCQUF3QixDQUFDO1FBRW5DLHNFQU9FOztRQUxBLHNDQUE4Qzs7a0RBcUJ2QyxvQkFBb0I7Y0EzQmhDLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixTQUFTLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztnQkFDckMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JUO2FBQ0Y7Z0JBR0MsSUFBSTtrQkFESCxLQUFLO1lBR04sT0FBTztrQkFETixLQUFLO1lBR04sUUFBUTtrQkFEUCxLQUFLO1lBR04sUUFBUTtrQkFEUCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG4vLyBBUFBcbmltcG9ydCB7IEhlbHBlcnMgfSBmcm9tICcuLi8uLi8uLi8uLi91dGlscy9IZWxwZXJzJztcblxuLy8gVmFsdWUgYWNjZXNzb3IgZm9yIHRoZSBjb21wb25lbnQgKHN1cHBvcnRzIG5nTW9kZWwpXG5jb25zdCBDSEVDS0xJU1RfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOb3ZvQ2hlY2tMaXN0RWxlbWVudCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1jaGVjay1saXN0JyxcbiAgcHJvdmlkZXJzOiBbQ0hFQ0tMSVNUX1ZBTFVFX0FDQ0VTU09SXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cImNoZWNrLWJveC1ncm91cFwiXG4gICAgICAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIF9vcHRpb25zOyBsZXQgaSA9IGluZGV4XCJcbiAgICAgIFtuZ0NsYXNzXT1cInsgY2hlY2tlZDogb3B0aW9uLmNoZWNrZWQgfVwiXG4gICAgICBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIm9wdGlvbi5sYWJlbFwiXG4gICAgPlxuICAgICAgPGlucHV0XG4gICAgICAgIFtuYW1lXT1cIm5hbWVcIlxuICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICBbbmdNb2RlbF09XCJvcHRpb24uY2hlY2tlZFwiXG4gICAgICAgIFthdHRyLmlkXT1cIm5hbWUgKyBpXCJcbiAgICAgICAgW3ZhbHVlXT1cIm9wdGlvbi5jaGVja2VkXCJcbiAgICAgICAgKGNoYW5nZSk9XCJzZWxlY3QoJGV2ZW50LCBvcHRpb24pXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgIC8+XG4gICAgICA8bGFiZWwgW2F0dHIuZm9yXT1cIm5hbWUgKyBpXCIgKGNsaWNrKT1cInNlbGVjdCgkZXZlbnQsIG9wdGlvbilcIj5cbiAgICAgICAgPGkgW25nQ2xhc3NdPVwieyAnYmhpLWNoZWNrYm94LWVtcHR5JzogIW9wdGlvbi5jaGVja2VkLCAnYmhpLWNoZWNrYm94LWZpbGxlZCc6IG9wdGlvbi5jaGVja2VkIH1cIj48L2k+XG4gICAgICAgIDxzcGFuPnt7IG9wdGlvbi5sYWJlbCB9fTwvc3Bhbj5cbiAgICAgIDwvbGFiZWw+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9DaGVja0xpc3RFbGVtZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIG5hbWU6IHN0cmluZztcbiAgQElucHV0KClcbiAgb3B0aW9uczogQXJyYXk8YW55PjtcbiAgQElucHV0KClcbiAgZGlzYWJsZWQ6IGJvb2xlYW47XG4gIEBPdXRwdXQoKVxuICBvblNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgX29wdGlvbnM6IEFycmF5PGFueT47XG4gIG1vZGVsOiBhbnk7XG4gIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG4gIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc2V0TW9kZWwoKTtcbiAgICB0aGlzLnNldHVwT3B0aW9ucygpO1xuICB9XG5cbiAgc2VsZWN0KGV2ZW50LCBpdGVtKSB7XG4gICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgaXRlbS5jaGVja2VkID0gIWl0ZW0uY2hlY2tlZDtcbiAgICAgIHRoaXMubW9kZWwgPSB0aGlzLl9vcHRpb25zLmZpbHRlcigoY2hlY2tCb3gpID0+IGNoZWNrQm94LmNoZWNrZWQpLm1hcCgoeCkgPT4geC52YWx1ZSk7XG4gICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy5tb2RlbC5sZW5ndGggPiAwID8gdGhpcy5tb2RlbCA6ICcnKTtcbiAgICAgIHRoaXMub25TZWxlY3QuZW1pdCh7IHNlbGVjdGVkOiB0aGlzLm1vZGVsIH0pO1xuICAgIH1cbiAgfVxuXG4gIHNldHVwT3B0aW9ucygpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLm9wdGlvbnMgfHwgW107XG4gICAgdGhpcy5fb3B0aW9ucyA9IFtdO1xuICAgIGlmICh0aGlzLm9wdGlvbnMubGVuZ3RoICYmICF0aGlzLm9wdGlvbnNbMF0udmFsdWUpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkT3B0aW9uID0ge1xuICAgICAgICAgIHZhbHVlOiBvcHRpb24sXG4gICAgICAgICAgbGFiZWw6IG9wdGlvbixcbiAgICAgICAgICBjaGVja2VkOiB0aGlzLm1vZGVsICYmIHRoaXMubW9kZWwubGVuZ3RoICYmIHRoaXMubW9kZWwuaW5kZXhPZihvcHRpb24udmFsdWUpICE9PSAtMSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fb3B0aW9ucy5wdXNoKGZvcm1hdHRlZE9wdGlvbik7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWRPcHRpb24gPSBvcHRpb247XG4gICAgICAgIGZvcm1hdHRlZE9wdGlvbi5jaGVja2VkID0gdGhpcy5tb2RlbCAmJiB0aGlzLm1vZGVsLmxlbmd0aCAmJiB0aGlzLm1vZGVsLmluZGV4T2Yob3B0aW9uLnZhbHVlKSAhPT0gLTE7XG4gICAgICAgIHRoaXMuX29wdGlvbnMucHVzaChmb3JtYXR0ZWRPcHRpb24pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2V0TW9kZWwoKTogdm9pZCB7XG4gICAgY29uc3QgY2hlY2tlZE9wdGlvbnMgPSB0aGlzLm9wdGlvbnMuZmlsdGVyKChjaGVja0JveCkgPT4gY2hlY2tCb3guY2hlY2tlZCkubWFwKCh4KSA9PiB4LnZhbHVlKTtcbiAgICB0aGlzLndyaXRlVmFsdWUoY2hlY2tlZE9wdGlvbnMpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZShtb2RlbDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsIHx8IFtdO1xuICAgIGlmIChtb2RlbCkge1xuICAgICAgdGhpcy5zZXR1cE9wdGlvbnMoKTtcbiAgICB9XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShkaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgfVxufVxuIl19
// NG2
import { ChangeDetectorRef, Component, EventEmitter, forwardRef, HostBinding, Inject, Input, Optional, Output, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NOVO_RADIO_GROUP } from './tokens';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../button/Button";
const _c0 = function (a0, a1, a2) { return { unchecked: a0, checked: a1, "has-icon": a2 }; };
function NovoRadioElement_button_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 3);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction3(6, _c0, !ctx_r0.checked, ctx_r0.checked, !!ctx_r0.icon))("theme", ctx_r0.theme)("color", ctx_r0.checked ? ctx_r0.color : null)("icon", ctx_r0.icon)("size", ctx_r0.size);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.label, " ");
} }
const _c1 = function (a0, a1) { return { "bhi-radio-empty": a0, "bhi-radio-filled": a1 }; };
function NovoRadioElement_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵelement(1, "i", 5);
    i0.ɵɵtext(2);
    i0.ɵɵprojection(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(2, _c1, !ctx_r1.checked, ctx_r1.checked));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.label, " ");
} }
const _c2 = ["*"];
// make radio-buttons ids unique
let nextId = 0;
// Value accessor for the component (supports ngModel)
const RADIO_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoRadioElement),
    multi: true,
};
export class NovoRadioElement {
    constructor(radioGroup, ref) {
        this.radioGroup = radioGroup;
        this.ref = ref;
        this._uniqueId = `novo-radio-${++nextId}`;
        this.id = this._uniqueId;
        this.name = this._uniqueId;
        this.tabindex = 0;
        this.button = false;
        this.theme = 'secondary';
        this.change = new EventEmitter();
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
        this._checked = false;
        this._value = false;
        this._disabled = false;
        this.onChangeCallback = (_) => {
            // placeholder
        };
        this.onTouchedCallback = () => {
            // placeholder
        };
        this.radioGroup = radioGroup;
    }
    get checked() {
        return this._checked;
    }
    set checked(value) {
        value = !!value;
        if (this._checked !== value) {
            this._checked = value;
            if (this._checked && this.radioGroup && this.radioGroup.value !== this.value) {
                this.radioGroup.value = this.value;
            }
            this.onChangeCallback(this._value);
        }
    }
    get value() {
        return this._value;
    }
    set value(value) {
        if (this.value !== value) {
            this._value = value;
            if (this.radioGroup) {
                this._checked = this.radioGroup.value === this.value;
            }
            this.onChangeCallback(this._value);
        }
    }
    // Disabled State
    get disabled() {
        return this._disabled || (this.radioGroup != null && this.radioGroup.disabled);
    }
    set disabled(value) {
        this._disabled = !!value;
    }
    ngOnInit() {
        if (this.radioGroup) {
            this.checked = this.radioGroup.value === this._value;
            this.name = this.radioGroup.name;
        }
    }
    _onInputChange(event) {
        event.stopPropagation();
        this.change.emit(event);
        this.checked = true;
        if (this.radioGroup) {
            this.radioGroup.value = this.value;
        }
    }
    writeValue(value) {
        this.value = value;
        this.ref.markForCheck();
    }
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    setDisabledState(disabled) {
        this.disabled = disabled;
    }
}
NovoRadioElement.ɵfac = function NovoRadioElement_Factory(t) { return new (t || NovoRadioElement)(i0.ɵɵdirectiveInject(NOVO_RADIO_GROUP, 8), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
NovoRadioElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoRadioElement, selectors: [["novo-radio"]], hostVars: 4, hostBindings: function NovoRadioElement_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassProp("vertical", ctx.vertical)("disabled", ctx.disabled);
    } }, inputs: { id: "id", name: "name", tabindex: "tabindex", vertical: "vertical", label: "label", button: "button", theme: "theme", size: "size", icon: "icon", color: "color", checked: "checked", value: "value", disabled: "disabled" }, outputs: { change: "change", blur: "blur", focus: "focus" }, features: [i0.ɵɵProvidersFeature([RADIO_VALUE_ACCESSOR])], ngContentSelectors: _c2, decls: 4, vars: 10, consts: [["type", "radio", 3, "id", "name", "checked", "tabIndex", "disabled", "focus", "blur", "change"], [3, "ngClass", "theme", "color", "icon", "size", 4, "ngIf"], ["class", "novo-radio-button-label", 4, "ngIf"], [3, "ngClass", "theme", "color", "icon", "size"], [1, "novo-radio-button-label"], [3, "ngClass"]], template: function NovoRadioElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵelementStart(0, "input", 0);
        i0.ɵɵlistener("focus", function NovoRadioElement_Template_input_focus_0_listener($event) { return ctx.focus.emit($event); })("blur", function NovoRadioElement_Template_input_blur_0_listener($event) { return ctx.blur.emit($event); })("change", function NovoRadioElement_Template_input_change_0_listener($event) { return ctx._onInputChange($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(1, "label");
        i0.ɵɵtemplate(2, NovoRadioElement_button_2_Template, 2, 10, "button", 1);
        i0.ɵɵtemplate(3, NovoRadioElement_div_3_Template, 4, 5, "div", 2);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("id", ctx.id)("name", ctx.name)("checked", ctx.checked)("tabIndex", ctx.tabindex)("disabled", ctx.disabled);
        i0.ɵɵadvance(1);
        i0.ɵɵclassProp("disabled", ctx.disabled);
        i0.ɵɵattribute("for", ctx.id);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.button);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.button);
    } }, directives: [i1.NgIf, i2.NovoButtonElement, i1.NgClass], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoRadioElement, [{
        type: Component,
        args: [{
                selector: 'novo-radio',
                providers: [RADIO_VALUE_ACCESSOR],
                template: `
    <input
      type="radio"
      [id]="id"
      [name]="name"
      [checked]="checked"
      [tabIndex]="tabindex"
      [disabled]="disabled"
      (focus)="focus.emit($event)"
      (blur)="blur.emit($event)"
      (change)="_onInputChange($event)"
    />
    <label [attr.for]="id" [class.disabled]="disabled">
      <button
        *ngIf="button"
        [ngClass]="{ unchecked: !checked, checked: checked, 'has-icon': !!icon }"
        [theme]="theme"
        [color]="checked ? color : null"
        [icon]="icon"
        [size]="size"
      >
        {{ label }}
      </button>
      <div *ngIf="!button" class="novo-radio-button-label">
        <i [ngClass]="{ 'bhi-radio-empty': !checked, 'bhi-radio-filled': checked }"></i>
        {{ label }}
        <ng-content></ng-content>
      </div>
    </label>
  `,
                host: {
                    '[class.vertical]': 'vertical',
                },
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [NOVO_RADIO_GROUP]
            }, {
                type: Optional
            }] }, { type: i0.ChangeDetectorRef }]; }, { id: [{
            type: Input
        }], name: [{
            type: Input
        }], tabindex: [{
            type: Input
        }], vertical: [{
            type: Input
        }], label: [{
            type: Input
        }], button: [{
            type: Input
        }], theme: [{
            type: Input
        }], size: [{
            type: Input
        }], icon: [{
            type: Input
        }], color: [{
            type: Input
        }], change: [{
            type: Output
        }], blur: [{
            type: Output
        }], focus: [{
            type: Output
        }], checked: [{
            type: Input
        }], value: [{
            type: Input
        }], disabled: [{
            type: Input
        }, {
            type: HostBinding,
            args: ['class.disabled']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmFkaW8uanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvcmFkaW8vUmFkaW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsV0FBVyxFQUNYLE1BQU0sRUFDTixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLGdCQUFnQixFQUFjLE1BQU0sVUFBVSxDQUFDOzs7Ozs7SUE0QmxELGlDQVFFO0lBQUEsWUFDRjtJQUFBLGlCQUFTOzs7SUFQUCxvR0FBeUUsdUJBQUEsK0NBQUEscUJBQUEscUJBQUE7SUFNekUsZUFDRjtJQURFLDZDQUNGOzs7O0lBQ0EsOEJBQ0U7SUFBQSx1QkFBZ0Y7SUFDaEYsWUFDQTtJQUFBLGtCQUFZO0lBQ2QsaUJBQU07OztJQUhELGVBQXdFO0lBQXhFLHFGQUF3RTtJQUMzRSxlQUNBO0lBREEsNkNBQ0E7OztBQXZDUixnQ0FBZ0M7QUFDaEMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBRWYsc0RBQXNEO0FBQ3RELE1BQU0sb0JBQW9CLEdBQUc7SUFDM0IsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDO0lBQy9DLEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQXVDRixNQUFNLE9BQU8sZ0JBQWdCO0lBa0UzQixZQUF5RCxVQUFzQixFQUFVLEdBQXNCO1FBQXRELGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFt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QUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCVDtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osa0JBQWtCLEVBQUUsVUFBVTtpQkFDL0I7YUFDRjs7c0JBbUVjLE1BQU07dUJBQUMsZ0JBQWdCOztzQkFBRyxRQUFRO3dEQWhFdEMsRUFBRTtrQkFBVixLQUFLO1lBQ0csSUFBSTtrQkFBWixLQUFLO1lBQ0csUUFBUTtrQkFBaEIsS0FBSztZQUdOLFFBQVE7a0JBRFAsS0FBSztZQUdOLEtBQUs7a0JBREosS0FBSztZQUdOLE1BQU07a0JBREwsS0FBSztZQUdOLEtBQUs7a0JBREosS0FBSztZQUdOLElBQUk7a0JBREgsS0FBSztZQUdOLElBQUk7a0JBREgsS0FBSztZQUdOLEtBQUs7a0JBREosS0FBSztZQUdJLE1BQU07a0JBQWYsTUFBTTtZQUNHLElBQUk7a0JBQWIsTUFBTTtZQUNHLEtBQUs7a0JBQWQsTUFBTTtZQU1NLE9BQU87a0JBQW5CLEtBQUs7WUFlTyxLQUFLO2tCQUFqQixLQUFLO1lBZUYsUUFBUTtrQkFGWCxLQUFLOztrQkFDTCxXQUFXO21CQUFDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBIb3N0QmluZGluZyxcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5PVk9fUkFESU9fR1JPVVAsIFJhZGlvR3JvdXAgfSBmcm9tICcuL3Rva2Vucyc7XG5cbi8vIG1ha2UgcmFkaW8tYnV0dG9ucyBpZHMgdW5pcXVlXG5sZXQgbmV4dElkID0gMDtcblxuLy8gVmFsdWUgYWNjZXNzb3IgZm9yIHRoZSBjb21wb25lbnQgKHN1cHBvcnRzIG5nTW9kZWwpXG5jb25zdCBSQURJT19WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdm9SYWRpb0VsZW1lbnQpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tcmFkaW8nLFxuICBwcm92aWRlcnM6IFtSQURJT19WQUxVRV9BQ0NFU1NPUl0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGlucHV0XG4gICAgICB0eXBlPVwicmFkaW9cIlxuICAgICAgW2lkXT1cImlkXCJcbiAgICAgIFtuYW1lXT1cIm5hbWVcIlxuICAgICAgW2NoZWNrZWRdPVwiY2hlY2tlZFwiXG4gICAgICBbdGFiSW5kZXhdPVwidGFiaW5kZXhcIlxuICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgIChmb2N1cyk9XCJmb2N1cy5lbWl0KCRldmVudClcIlxuICAgICAgKGJsdXIpPVwiYmx1ci5lbWl0KCRldmVudClcIlxuICAgICAgKGNoYW5nZSk9XCJfb25JbnB1dENoYW5nZSgkZXZlbnQpXCJcbiAgICAvPlxuICAgIDxsYWJlbCBbYXR0ci5mb3JdPVwiaWRcIiBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICAgIDxidXR0b25cbiAgICAgICAgKm5nSWY9XCJidXR0b25cIlxuICAgICAgICBbbmdDbGFzc109XCJ7IHVuY2hlY2tlZDogIWNoZWNrZWQsIGNoZWNrZWQ6IGNoZWNrZWQsICdoYXMtaWNvbic6ICEhaWNvbiB9XCJcbiAgICAgICAgW3RoZW1lXT1cInRoZW1lXCJcbiAgICAgICAgW2NvbG9yXT1cImNoZWNrZWQgPyBjb2xvciA6IG51bGxcIlxuICAgICAgICBbaWNvbl09XCJpY29uXCJcbiAgICAgICAgW3NpemVdPVwic2l6ZVwiXG4gICAgICA+XG4gICAgICAgIHt7IGxhYmVsIH19XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxkaXYgKm5nSWY9XCIhYnV0dG9uXCIgY2xhc3M9XCJub3ZvLXJhZGlvLWJ1dHRvbi1sYWJlbFwiPlxuICAgICAgICA8aSBbbmdDbGFzc109XCJ7ICdiaGktcmFkaW8tZW1wdHknOiAhY2hlY2tlZCwgJ2JoaS1yYWRpby1maWxsZWQnOiBjaGVja2VkIH1cIj48L2k+XG4gICAgICAgIHt7IGxhYmVsIH19XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbGFiZWw+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLnZlcnRpY2FsXSc6ICd2ZXJ0aWNhbCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9SYWRpb0VsZW1lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0IHtcbiAgcHJpdmF0ZSBfdW5pcXVlSWQ6IHN0cmluZyA9IGBub3ZvLXJhZGlvLSR7KytuZXh0SWR9YDtcbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IHRoaXMuX3VuaXF1ZUlkO1xuICBASW5wdXQoKSBuYW1lOiBzdHJpbmcgPSB0aGlzLl91bmlxdWVJZDtcbiAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlciA9IDA7XG5cbiAgQElucHV0KClcbiAgdmVydGljYWw6IGJvb2xlYW47XG4gIEBJbnB1dCgpXG4gIGxhYmVsOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIGJ1dHRvbjogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICB0aGVtZTogc3RyaW5nID0gJ3NlY29uZGFyeSc7XG4gIEBJbnB1dCgpXG4gIHNpemU6IHN0cmluZztcbiAgQElucHV0KClcbiAgaWNvbjogc3RyaW5nO1xuICBASW5wdXQoKVxuICBjb2xvcjogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBibHVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZm9jdXMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBfY2hlY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF92YWx1ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIGdldCBjaGVja2VkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9jaGVja2VkO1xuICB9XG5cbiAgc2V0IGNoZWNrZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB2YWx1ZSA9ICEhdmFsdWU7XG4gICAgaWYgKHRoaXMuX2NoZWNrZWQgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9jaGVja2VkID0gdmFsdWU7XG4gICAgICBpZiAodGhpcy5fY2hlY2tlZCAmJiB0aGlzLnJhZGlvR3JvdXAgJiYgdGhpcy5yYWRpb0dyb3VwLnZhbHVlICE9PSB0aGlzLnZhbHVlKSB7XG4gICAgICAgIHRoaXMucmFkaW9Hcm91cC52YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICB9XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5fdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIGdldCB2YWx1ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cbiAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMudmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgaWYgKHRoaXMucmFkaW9Hcm91cCkge1xuICAgICAgICB0aGlzLl9jaGVja2VkID0gdGhpcy5yYWRpb0dyb3VwLnZhbHVlID09PSB0aGlzLnZhbHVlO1xuICAgICAgfVxuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMuX3ZhbHVlKTtcbiAgICB9XG4gIH1cbiAgLy8gRGlzYWJsZWQgU3RhdGVcbiAgQElucHV0KClcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5kaXNhYmxlZCcpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQgfHwgKHRoaXMucmFkaW9Hcm91cCAhPSBudWxsICYmIHRoaXMucmFkaW9Hcm91cC5kaXNhYmxlZCk7XG4gIH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSAhIXZhbHVlO1xuICB9XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChOT1ZPX1JBRElPX0dST1VQKSBAT3B0aW9uYWwoKSBwdWJsaWMgcmFkaW9Hcm91cDogUmFkaW9Hcm91cCwgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgdGhpcy5yYWRpb0dyb3VwID0gcmFkaW9Hcm91cDtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLnJhZGlvR3JvdXApIHtcbiAgICAgIHRoaXMuY2hlY2tlZCA9IHRoaXMucmFkaW9Hcm91cC52YWx1ZSA9PT0gdGhpcy5fdmFsdWU7XG4gICAgICB0aGlzLm5hbWUgPSB0aGlzLnJhZGlvR3JvdXAubmFtZTtcbiAgICB9XG4gIH1cblxuICBfb25JbnB1dENoYW5nZShldmVudDogRXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLmNoYW5nZS5lbWl0KGV2ZW50KTtcblxuICAgIHRoaXMuY2hlY2tlZCA9IHRydWU7XG5cbiAgICBpZiAodGhpcy5yYWRpb0dyb3VwKSB7XG4gICAgICB0aGlzLnJhZGlvR3JvdXAudmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjayA9IChfOiBhbnkpID0+IHtcbiAgICAvLyBwbGFjZWhvbGRlclxuICB9O1xuXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgLy8gcGxhY2Vob2xkZXJcbiAgfTtcblxuICBzZXREaXNhYmxlZFN0YXRlKGRpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGRpc2FibGVkO1xuICB9XG59XG4iXX0=
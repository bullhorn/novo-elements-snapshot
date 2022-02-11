// NG
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, HostBinding, Input, Output, ViewChild, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NovoLabelService } from '../../services/novo-label-service';
import { Helpers } from '../../utils/Helpers';
// App
import { NovoOverlayTemplateComponent } from '../common/overlay/Overlay';
import * as i0 from "@angular/core";
import * as i1 from "../../services/novo-label-service";
import * as i2 from "../field/field";
import * as i3 from "../field/input";
import * as i4 from "@angular/forms";
import * as i5 from "@angular/common";
import * as i6 from "../common/overlay/Overlay";
import * as i7 from "./color-picker.component";
import * as i8 from "../icon/Icon";
function NovoColorInputElement_novo_icon_3_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "novo-icon", 6);
    i0.ɵɵlistener("click", function NovoColorInputElement_novo_icon_3_Template_novo_icon_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r3 = i0.ɵɵnextContext(); return ctx_r3.openPanel(); });
    i0.ɵɵtext(1, "complex");
    i0.ɵɵelementEnd();
} }
function NovoColorInputElement_novo_icon_4_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "novo-icon", 7);
    i0.ɵɵlistener("click", function NovoColorInputElement_novo_icon_4_Template_novo_icon_click_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r5 = i0.ɵɵnextContext(); return ctx_r5.clearValue(); });
    i0.ɵɵtext(1, "x");
    i0.ɵɵelementEnd();
} }
// Value accessor for the component (supports ngModel)
const COLOR_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoColorInputElement),
    multi: true,
};
export class NovoColorInputElement {
    constructor(element, labels, cdr) {
        this.element = element;
        this.labels = labels;
        this.cdr = cdr;
        this.placeholder = '#ffffff';
        this.blurEvent = new EventEmitter();
        this.focusEvent = new EventEmitter();
        this.change = new EventEmitter();
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
        this._value = '';
        this.lastValidValue = '';
        this._disabled = false;
        this.onChangeCallback = (_) => {
            // placeholder
        };
        this.onTouchedCallback = () => {
            // placeholder
        };
    }
    get value() {
        return this._value;
    }
    set value(value) {
        if (this.value !== value) {
            this._value = value;
            this._setFormValue(value);
            this.onChangeCallback(this._value);
        }
    }
    // Disabled State
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = !!value;
    }
    ngOnInit() { }
    /** BEGIN: Convenient Panel Methods. */
    openPanel() {
        if (!this.disabled) {
            this.panelOpen ? this.overlay.closePanel() : this.overlay.openPanel();
        }
    }
    closePanel() {
        this.overlay && this.overlay.closePanel();
    }
    get panelOpen() {
        return this.overlay && this.overlay.panelOpen;
    }
    /** END: Convenient Panel Methods. */
    _handleKeydown(event) {
        if ((event.key === "Escape" /* Escape */ || event.key === "Enter" /* Enter */ || event.key === "Tab" /* Tab */) && this.panelOpen) {
            this.closePanel();
            event.stopPropagation();
        }
    }
    _handleInput(event) {
        if (document.activeElement === event.target) {
            // this._handleEvent(event, false);
        }
    }
    _handleBlur(event) {
        this.blurEvent.emit(event);
    }
    _handleFocus(event) {
        this.openPanel();
        this.focusEvent.emit(event);
    }
    writeValue(value) {
        this.value = value;
        this.cdr.markForCheck();
    }
    setDisabledState(disabled) {
        this.disabled = disabled;
    }
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    _setFormValue(value) {
        if (this.value) {
            // hmm...
        }
    }
    /**
     * This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     */
    setValueAndClose(event) {
        if (event) {
            this.value = event.color.hex;
            this.change.emit(this.value);
            this.closePanel();
        }
    }
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    clearValue() {
        this.value = '';
        this.change.emit(this.value);
    }
    get hasValue() {
        return !Helpers.isEmpty(this.value);
    }
}
NovoColorInputElement.ɵfac = function NovoColorInputElement_Factory(t) { return new (t || NovoColorInputElement)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.NovoLabelService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
NovoColorInputElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoColorInputElement, selectors: [["novo-color-input"]], viewQuery: function NovoColorInputElement_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(NovoOverlayTemplateComponent, true);
    } if (rf & 2) {
        var _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.overlay = _t.first);
    } }, hostVars: 2, hostBindings: function NovoColorInputElement_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassProp("disabled", ctx.disabled);
    } }, inputs: { name: "name", placeholder: "placeholder", value: "value", disabled: "disabled" }, outputs: { blurEvent: "blurEvent", focusEvent: "focusEvent", change: "change", blur: "blur", focus: "focus" }, features: [i0.ɵɵProvidersFeature([COLOR_VALUE_ACCESSOR])], decls: 7, vars: 10, consts: [["novoInput", "", "type", "text", 3, "name", "placeholder", "disabled", "ngModel", "focus", "keydown", "input", "blur", "ngModelChange"], ["input", ""], [3, "click", 4, "ngIf"], ["size", "small", 3, "click", 4, "ngIf"], ["position", "above-below", 3, "parent"], [3, "color", "colorChange", "onChange"], [3, "click"], ["size", "small", 3, "click"]], template: function NovoColorInputElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "novo-field");
        i0.ɵɵelementStart(1, "input", 0, 1);
        i0.ɵɵlistener("focus", function NovoColorInputElement_Template_input_focus_1_listener($event) { return ctx._handleFocus($event); })("keydown", function NovoColorInputElement_Template_input_keydown_1_listener($event) { return ctx._handleKeydown($event); })("input", function NovoColorInputElement_Template_input_input_1_listener($event) { return ctx._handleInput($event); })("blur", function NovoColorInputElement_Template_input_blur_1_listener($event) { return ctx._handleBlur($event); })("ngModelChange", function NovoColorInputElement_Template_input_ngModelChange_1_listener($event) { return ctx.value = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(3, NovoColorInputElement_novo_icon_3_Template, 2, 0, "novo-icon", 2);
        i0.ɵɵtemplate(4, NovoColorInputElement_novo_icon_4_Template, 2, 0, "novo-icon", 3);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "novo-overlay-template", 4);
        i0.ɵɵelementStart(6, "novo-color-picker", 5);
        i0.ɵɵlistener("colorChange", function NovoColorInputElement_Template_novo_color_picker_colorChange_6_listener($event) { return ctx.value = $event; })("onChange", function NovoColorInputElement_Template_novo_color_picker_onChange_6_listener($event) { return ctx.setValueAndClose($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵstyleProp("color", ctx.value);
        i0.ɵɵproperty("name", ctx.name)("placeholder", ctx.placeholder)("disabled", ctx.disabled)("ngModel", ctx.value);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", !ctx.hasValue);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.hasValue);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("parent", ctx.element);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("color", ctx.value);
    } }, directives: [i2.NovoFieldElement, i3.NovoInput, i4.DefaultValueAccessor, i4.NgControlStatus, i4.NgModel, i5.NgIf, i6.NovoOverlayTemplateComponent, i7.NovoColorPickerComponent, i8.NovoIconComponent], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoColorInputElement, [{
        type: Component,
        args: [{
                selector: 'novo-color-input',
                providers: [COLOR_VALUE_ACCESSOR],
                template: `
    <novo-field>
      <input
        novoInput
        type="text"
        [name]="name"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [style.color]="value"
        (focus)="_handleFocus($event)"
        (keydown)="_handleKeydown($event)"
        (input)="_handleInput($event)"
        (blur)="_handleBlur($event)"
        [(ngModel)]="value"
        #input
      />
      <novo-icon *ngIf="!hasValue" (click)="openPanel()">complex</novo-icon>
      <novo-icon *ngIf="hasValue" size="small" (click)="clearValue()">x</novo-icon>
    </novo-field>
    <novo-overlay-template [parent]="element" position="above-below">
      <novo-color-picker [(color)]="value" (onChange)="setValueAndClose($event)"></novo-color-picker>
    </novo-overlay-template>
  `,
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }]; }, { name: [{
            type: Input
        }], placeholder: [{
            type: Input
        }], blurEvent: [{
            type: Output
        }], focusEvent: [{
            type: Output
        }], overlay: [{
            type: ViewChild,
            args: [NovoOverlayTemplateComponent]
        }], change: [{
            type: Output
        }], blur: [{
            type: Output
        }], focus: [{
            type: Output
        }], value: [{
            type: Input
        }], disabled: [{
            type: Input
        }, {
            type: HostBinding,
            args: ['class.disabled']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2NvbG9yLXBpY2tlci9jb2xvci1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsS0FBSztBQUNMLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLFdBQVcsRUFDWCxLQUFLLEVBRUwsTUFBTSxFQUNOLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFckUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE1BQU07QUFDTixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7Ozs7Ozs7O0lBNEJuRSxvQ0FBbUQ7SUFBdEIsaU1BQXFCO0lBQUMsdUJBQU87SUFBQSxpQkFBWTs7OztJQUN0RSxvQ0FBZ0U7SUFBdkIsa01BQXNCO0lBQUMsaUJBQUM7SUFBQSxpQkFBWTs7QUEzQm5GLHNEQUFzRDtBQUN0RCxNQUFNLG9CQUFvQixHQUFHO0lBQzNCLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztJQUNwRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUE2QkYsTUFBTSxPQUFPLHFCQUFxQjtJQTBDaEMsWUFBbUIsT0FBbUIsRUFBUyxNQUF3QixFQUFVLEdBQXNCO1FBQXBGLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFBUyxXQUFNLEdB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Q0U7UUFBQSxtQ0FjQTtRQVBFLHVHQUFTLHdCQUFvQixJQUFDLDhGQUNuQiwwQkFBc0IsSUFESCwwRkFFckIsd0JBQW9CLElBRkMsd0ZBR3RCLHVCQUFtQixJQUhHLGdJQUFBO1FBUGhDLGlCQWNBO1FBQUEsa0ZBQW1EO1FBQ25ELGtGQUFnRTtRQUNsRSxpQkFBYTtRQUNiLGdEQUNFO1FBQUEsNENBQStGO1FBQTVFLHFKQUFpQiw0R0FBYSw0QkFBd0IsSUFBckM7UUFBdUMsaUJBQW9CO1FBQ2pHLGlCQUF3Qjs7UUFicEIsZUFBcUI7UUFBckIsa0NBQXFCO1FBSHJCLCtCQUFhLGdDQUFBLDBCQUFBLHNCQUFBO1FBV0osZUFBaUI7UUFBakIsb0NBQWlCO1FBQ2pCLGVBQWdCO1FBQWhCLG1DQUFnQjtRQUVOLGVBQWtCO1FBQWxCLG9DQUFrQjtRQUNwQixlQUFpQjtRQUFqQixpQ0FBaUI7O2tEQUk3QixxQkFBcUI7Y0EzQmpDLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixTQUFTLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztnQkFDakMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JUO2FBQ0Y7NEhBR0MsSUFBSTtrQkFESCxLQUFLO1lBR04sV0FBVztrQkFEVixLQUFLO1lBR04sU0FBUztrQkFEUixNQUFNO1lBR1AsVUFBVTtrQkFEVCxNQUFNO1lBSVAsT0FBTztrQkFETixTQUFTO21CQUFDLDRCQUE0QjtZQUc3QixNQUFNO2tCQUFmLE1BQU07WUFDRyxJQUFJO2tCQUFiLE1BQU07WUFDRyxLQUFLO2tCQUFkLE1BQU07WUFNTSxLQUFLO2tCQUFqQixLQUFLO1lBY0YsUUFBUTtrQkFGWCxLQUFLOztrQkFDTCxXQUFXO21CQUFDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbm92by1sYWJlbC1zZXJ2aWNlJztcbmltcG9ydCB7IEtleSB9IGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCB7IEhlbHBlcnMgfSBmcm9tICcuLi8uLi91dGlscy9IZWxwZXJzJztcbi8vIEFwcFxuaW1wb3J0IHsgTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudCB9IGZyb20gJy4uL2NvbW1vbi9vdmVybGF5L092ZXJsYXknO1xuXG4vLyBWYWx1ZSBhY2Nlc3NvciBmb3IgdGhlIGNvbXBvbmVudCAoc3VwcG9ydHMgbmdNb2RlbClcbmNvbnN0IENPTE9SX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm92b0NvbG9ySW5wdXRFbGVtZW50KSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWNvbG9yLWlucHV0JyxcbiAgcHJvdmlkZXJzOiBbQ09MT1JfVkFMVUVfQUNDRVNTT1JdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxub3ZvLWZpZWxkPlxuICAgICAgPGlucHV0XG4gICAgICAgIG5vdm9JbnB1dFxuICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgIFtuYW1lXT1cIm5hbWVcIlxuICAgICAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICBbc3R5bGUuY29sb3JdPVwidmFsdWVcIlxuICAgICAgICAoZm9jdXMpPVwiX2hhbmRsZUZvY3VzKCRldmVudClcIlxuICAgICAgICAoa2V5ZG93bik9XCJfaGFuZGxlS2V5ZG93bigkZXZlbnQpXCJcbiAgICAgICAgKGlucHV0KT1cIl9oYW5kbGVJbnB1dCgkZXZlbnQpXCJcbiAgICAgICAgKGJsdXIpPVwiX2hhbmRsZUJsdXIoJGV2ZW50KVwiXG4gICAgICAgIFsobmdNb2RlbCldPVwidmFsdWVcIlxuICAgICAgICAjaW5wdXRcbiAgICAgIC8+XG4gICAgICA8bm92by1pY29uICpuZ0lmPVwiIWhhc1ZhbHVlXCIgKGNsaWNrKT1cIm9wZW5QYW5lbCgpXCI+Y29tcGxleDwvbm92by1pY29uPlxuICAgICAgPG5vdm8taWNvbiAqbmdJZj1cImhhc1ZhbHVlXCIgc2l6ZT1cInNtYWxsXCIgKGNsaWNrKT1cImNsZWFyVmFsdWUoKVwiPng8L25vdm8taWNvbj5cbiAgICA8L25vdm8tZmllbGQ+XG4gICAgPG5vdm8tb3ZlcmxheS10ZW1wbGF0ZSBbcGFyZW50XT1cImVsZW1lbnRcIiBwb3NpdGlvbj1cImFib3ZlLWJlbG93XCI+XG4gICAgICA8bm92by1jb2xvci1waWNrZXIgWyhjb2xvcildPVwidmFsdWVcIiAob25DaGFuZ2UpPVwic2V0VmFsdWVBbmRDbG9zZSgkZXZlbnQpXCI+PC9ub3ZvLWNvbG9yLXBpY2tlcj5cbiAgICA8L25vdm8tb3ZlcmxheS10ZW1wbGF0ZT5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0NvbG9ySW5wdXRFbGVtZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIEBJbnB1dCgpXG4gIG5hbWU6IHN0cmluZztcbiAgQElucHV0KClcbiAgcGxhY2Vob2xkZXI6IHN0cmluZyA9ICcjZmZmZmZmJztcbiAgQE91dHB1dCgpXG4gIGJsdXJFdmVudDogRXZlbnRFbWl0dGVyPEZvY3VzRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxGb2N1c0V2ZW50PigpO1xuICBAT3V0cHV0KClcbiAgZm9jdXNFdmVudDogRXZlbnRFbWl0dGVyPEZvY3VzRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxGb2N1c0V2ZW50PigpO1xuICAvKiogRWxlbWVudCBmb3IgdGhlIHBhbmVsIGNvbnRhaW5pbmcgdGhlIGF1dG9jb21wbGV0ZSBvcHRpb25zLiAqL1xuICBAVmlld0NoaWxkKE5vdm9PdmVybGF5VGVtcGxhdGVDb21wb25lbnQpXG4gIG92ZXJsYXk6IE5vdm9PdmVybGF5VGVtcGxhdGVDb21wb25lbnQ7XG5cbiAgQE91dHB1dCgpIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGJsdXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBmb2N1cyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcml2YXRlIF92YWx1ZTogc3RyaW5nID0gJyc7XG4gIHB1YmxpYyBsYXN0VmFsaWRWYWx1ZTogc3RyaW5nID0gJyc7XG4gIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCkgZ2V0IHZhbHVlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgIGlmICh0aGlzLnZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX3NldEZvcm1WYWx1ZSh2YWx1ZSk7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5fdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIERpc2FibGVkIFN0YXRlXG4gIEBJbnB1dCgpXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZGlzYWJsZWQnKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICB9XG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gISF2YWx1ZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmLCBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLCBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgbmdPbkluaXQoKSB7fVxuXG4gIC8qKiBCRUdJTjogQ29udmVuaWVudCBQYW5lbCBNZXRob2RzLiAqL1xuICBvcGVuUGFuZWwoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLnBhbmVsT3BlbiA/IHRoaXMub3ZlcmxheS5jbG9zZVBhbmVsKCkgOiB0aGlzLm92ZXJsYXkub3BlblBhbmVsKCk7XG4gICAgfVxuICB9XG4gIGNsb3NlUGFuZWwoKTogdm9pZCB7XG4gICAgdGhpcy5vdmVybGF5ICYmIHRoaXMub3ZlcmxheS5jbG9zZVBhbmVsKCk7XG4gIH1cbiAgZ2V0IHBhbmVsT3BlbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5vdmVybGF5ICYmIHRoaXMub3ZlcmxheS5wYW5lbE9wZW47XG4gIH1cbiAgLyoqIEVORDogQ29udmVuaWVudCBQYW5lbCBNZXRob2RzLiAqL1xuXG4gIF9oYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKChldmVudC5rZXkgPT09IEtleS5Fc2NhcGUgfHwgZXZlbnQua2V5ID09PSBLZXkuRW50ZXIgfHwgZXZlbnQua2V5ID09PSBLZXkuVGFiKSAmJiB0aGlzLnBhbmVsT3Blbikge1xuICAgICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBfaGFuZGxlSW5wdXQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gZXZlbnQudGFyZ2V0KSB7XG4gICAgICAvLyB0aGlzLl9oYW5kbGVFdmVudChldmVudCwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIF9oYW5kbGVCbHVyKGV2ZW50OiBGb2N1c0V2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5ibHVyRXZlbnQuZW1pdChldmVudCk7XG4gIH1cblxuICBfaGFuZGxlRm9jdXMoZXZlbnQ6IEZvY3VzRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLm9wZW5QYW5lbCgpO1xuICAgIHRoaXMuZm9jdXNFdmVudC5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoZGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2sgPSAoXzogYW55KSA9PiB7XG4gICAgLy8gcGxhY2Vob2xkZXJcbiAgfTtcblxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrID0gKCkgPT4ge1xuICAgIC8vIHBsYWNlaG9sZGVyXG4gIH07XG5cbiAgcHJpdmF0ZSBfc2V0Rm9ybVZhbHVlKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodGhpcy52YWx1ZSkge1xuICAgICAgLy8gaG1tLi4uXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGNsb3NlcyB0aGUgcGFuZWwsIGFuZCBpZiBhIHZhbHVlIGlzIHNwZWNpZmllZCwgYWxzbyBzZXRzIHRoZSBhc3NvY2lhdGVkXG4gICAqIGNvbnRyb2wgdG8gdGhhdCB2YWx1ZS4gSXQgd2lsbCBhbHNvIG1hcmsgdGhlIGNvbnRyb2wgYXMgZGlydHkgaWYgdGhpcyBpbnRlcmFjdGlvblxuICAgKiBzdGVtbWVkIGZyb20gdGhlIHVzZXIuXG4gICAqL1xuICBwdWJsaWMgc2V0VmFsdWVBbmRDbG9zZShldmVudDogYW55KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICB0aGlzLnZhbHVlID0gZXZlbnQuY29sb3IuaGV4O1xuICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLnZhbHVlKTtcbiAgICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBhbnkgcHJldmlvdXMgc2VsZWN0ZWQgb3B0aW9uIGFuZCBlbWl0IGEgc2VsZWN0aW9uIGNoYW5nZSBldmVudCBmb3IgdGhpcyBvcHRpb25cbiAgICovXG4gIHB1YmxpYyBjbGVhclZhbHVlKCkge1xuICAgIHRoaXMudmFsdWUgPSAnJztcbiAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGdldCBoYXNWYWx1ZSgpIHtcbiAgICByZXR1cm4gIUhlbHBlcnMuaXNFbXB0eSh0aGlzLnZhbHVlKTtcbiAgfVxufVxuIl19
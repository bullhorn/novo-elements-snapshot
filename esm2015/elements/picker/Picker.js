// NG2
// Vendor
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild, ViewContainerRef, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';
import { Helpers } from '../../utils/Helpers';
import { notify } from '../../utils/notifier/notifier.util';
import { NovoOverlayTemplateComponent } from '../common/overlay/Overlay';
import { PickerResults } from './extras/picker-results/PickerResults';
import * as i0 from "@angular/core";
import * as i1 from "../../utils/component-utils/ComponentUtils";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "../common/overlay/Overlay";
const _c0 = ["results"];
const _c1 = ["input"];
function NovoPickerElement_i_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 8);
} }
function NovoPickerElement_i_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i");
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassMapInterpolate2("bhi-", ctx_r1.config == null ? null : ctx_r1.config.entityIcon, " entity-icon ", ctx_r1.config == null ? null : ctx_r1.config.entityIcon, "");
} }
function NovoPickerElement_i_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 9);
} }
function NovoPickerElement_i_5_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "i", 10);
    i0.ɵɵlistener("click", function NovoPickerElement_i_5_Template_i_click_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r6 = i0.ɵɵnextContext(); return ctx_r6.clearValue(true); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("entity-selected", (ctx_r4.config == null ? null : ctx_r4.config.entityIcon) && ctx_r4._value);
} }
const _c2 = ["*"];
// Value accessor for the component (supports ngModel)
const PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoPickerElement),
    multi: true,
};
/**
 * @description This class is the directive definition of the Picker. If you add and attribute of `picker` to an input,
 * it will create an instance of the picker which wraps the input in all of the picker HTML elements and functionality.
 * Picker should be added as a two-way bound ngModel instance `[(picker)]=""` in order to have the picker options
 * dynamically populate.
 */
export class NovoPickerElement {
    constructor(element, componentUtils, ref) {
        this.element = element;
        this.componentUtils = componentUtils;
        this.ref = ref;
        this.closeOnSelect = true;
        this.selected = [];
        // Deprecated
        this.appendToBody = false;
        // Deprecated
        this.parentScrollAction = 'close';
        // Side the dropdown will open
        this.side = 'left';
        // Autoselects the first option in the results
        this.autoSelectFirstOption = true;
        this._disablePickerInput = false;
        // Emitter for selects
        this.changed = new EventEmitter();
        this.select = new EventEmitter();
        this.focus = new EventEmitter();
        this.blur = new EventEmitter();
        this.typing = new EventEmitter();
        this.term = '';
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    // Disable from typing into the picker (result template does everything)
    set disablePickerInput(v) {
        this._disablePickerInput = coerceBooleanProperty(v);
    }
    get disablePickerInput() {
        return this._disablePickerInput;
    }
    ngOnInit() {
        if (this.overrideElement) {
            this.element = this.overrideElement;
        }
        if (this.appendToBody) {
            notify(`'appendToBody' has been deprecated. Please remove this attribute.`);
        }
        // Custom results template
        this.resultsComponent = this.config.resultsTemplate || PickerResults;
        // Get all distinct key up events from the input and only fire if long enough and distinct
        // let input = this.element.nativeElement.querySelector('input');
        const pasteObserver = fromEvent(this.input.nativeElement, 'paste').pipe(debounceTime(250), distinctUntilChanged());
        pasteObserver.subscribe((event) => this.onDebouncedKeyup(event), (err) => this.hideResults(err));
        const keyboardObserver = fromEvent(this.input.nativeElement, 'keyup').pipe(debounceTime(250), distinctUntilChanged());
        keyboardObserver.subscribe((event) => this.onDebouncedKeyup(event), (err) => this.hideResults(err));
    }
    onDebouncedKeyup(event) {
        if (["Escape" /* Escape */, "ArrowDown" /* ArrowDown */, "ArrowUp" /* ArrowUp */, "Enter" /* Enter */, "Tab" /* Tab */].some((key) => key === event.key)) {
            return;
        }
        this.show(event.target.value);
    }
    openPanel() {
        this.container.openPanel();
    }
    closePanel() {
        this.container.closePanel();
    }
    get panelOpen() {
        return this.container && this.container.panelOpen;
    }
    show(term) {
        this.openPanel();
        // Show the results inside
        this.showResults(term);
    }
    onKeyDown(event) {
        if (this.disablePickerInput) {
            Helpers.swallowEvent(event);
            return;
        }
        if (this.panelOpen && !this.disablePickerInput) {
            if (event.key === "Escape" /* Escape */ || event.key === "Tab" /* Tab */) {
                this.hideResults();
                return;
            }
            if (event.key === "ArrowUp" /* ArrowUp */) {
                this.popup.instance.prevActiveMatch();
                this.ref.markForCheck();
                return;
            }
            if (event.key === "ArrowDown" /* ArrowDown */) {
                this.popup.instance.nextActiveMatch();
                this.ref.markForCheck();
                return;
            }
            if (event.key === "Enter" /* Enter */) {
                const activeMatch = this.popup.instance.activeMatch;
                if (!this.selected.find((selected) => activeMatch && activeMatch.value && selected.value === activeMatch.value)) {
                    this.popup.instance.selectActiveMatch();
                    this.ref.markForCheck();
                }
                return;
            }
            if ((event.key === "Backspace" /* Backspace */ || event.key === "Delete" /* Delete */) && !Helpers.isBlank(this._value)) {
                this.clearValue(false);
                this.closePanel();
            }
            if (event.key === "Delete" /* Delete */ && Helpers.isBlank(this._value)) {
                this.clearValue(true);
            }
        }
    }
    clearValue(wipeTerm) {
        this._value = null;
        this.select.emit(this._value);
        this.changed.emit({ value: this._value, rawValue: { label: '', value: this._value } });
        this.onModelChange(this._value);
        if (wipeTerm) {
            this.term = '';
            this.hideResults();
        }
        this.ref.markForCheck();
    }
    /**
     * @description When the input's focus event is called this method calls the debounced function that displays the
     * results.
     */
    onFocus(event) {
        if (!this.panelOpen) {
            this.show();
        }
        this.focus.emit(event);
    }
    // Creates an instance of the results (called popup) and adds all the bindings to that instance.
    showResults(term) {
        // Update Matches
        if (this.popup) {
            // Update existing list or create the DOM element
            this.popup.instance.config = this.config;
            this.popup.instance.term = this.term;
            this.popup.instance.selected = this.selected;
            this.popup.instance.autoSelectFirstOption = this.autoSelectFirstOption;
            this.ref.markForCheck();
        }
        else {
            this.popup = this.componentUtils.append(this.resultsComponent, this.results);
            this.popup.instance.parent = this;
            this.popup.instance.config = this.config;
            this.popup.instance.term = this.term;
            this.popup.instance.selected = this.selected;
            this.popup.instance.autoSelectFirstOption = this.autoSelectFirstOption;
            this.popup.instance.overlay = this.container.overlayRef;
            this.ref.markForCheck();
        }
    }
    // Tells the overlay component to hide the picker results from the DOM without deleting the dynamically allocated popup instance created in
    // showResults. The popup instance will remain in memory from the first time the results are shown until this component is destroyed.
    hideResults(err) {
        this.closePanel();
        this.ref.markForCheck();
    }
    // Cleans up listeners for the popup - will get executed no matter how the popup is closed.
    onOverlayClosed() {
        if (this.popup && this.popup.instance && this.popup.instance.cleanUp) {
            this.popup.instance.cleanUp();
        }
    }
    // get accessor
    get value() {
        return this._value;
    }
    // set accessor including call the onchange callback
    set value(selected) {
        if (!selected) {
            this.term = '';
            this._value = null;
            this.onModelChange(this._value);
        }
        else if (selected.value !== this._value) {
            this.term = this.clearValueOnSelect ? '' : selected.label;
            this._value = selected.value;
            this.changed.emit({ value: selected.value, rawValue: { label: this.term, value: selected.value } });
            this.select.emit(selected);
            this.onModelChange(selected.value);
            if (this.popup) {
                this.popup.instance.selected = this.selected;
            }
        }
        else {
            this.changed.emit({ value: selected.value, rawValue: { label: this.term, value: this._value } });
            this.select.emit(selected);
        }
        this.ref.markForCheck();
    }
    // Makes sure to clear the model if the user clears the text box
    checkTerm(event) {
        this.typing.emit(event);
        if (!event || !event.length) {
            this._value = null;
            this.onModelChange(this._value);
        }
        this.ref.markForCheck();
    }
    // Set touched on blur
    onTouched(event) {
        this.onModelTouched();
        this.blur.emit(event);
    }
    // From ControlValueAccessor interface
    writeValue(value) {
        if (this.clearValueOnSelect) {
            this.term = '';
        }
        else {
            if (typeof value === 'string' && !this.config.useGetLabels) {
                this.term = value;
            }
            else if (value && value.label) {
                this.term = value.label;
            }
            else if (value && value.firstName) {
                this.term = `${value.firstName} ${value.lastName}`;
            }
            else if (value && value.name) {
                this.term = value.name;
            }
            else if (typeof this.config.getLabels === 'function') {
                this.config.getLabels(value).then((result) => {
                    if (result) {
                        this.term = result.length ? result[0].label || '' : result.label || '';
                    }
                    else {
                        this.term = value;
                    }
                    this.ref.markForCheck();
                });
            }
            else if (value && value.title) {
                this.term = value.title;
            }
            else {
                this.term = value || '';
            }
        }
        this._value = value;
        this.ref.markForCheck();
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(disabled) {
        this._disablePickerInput = disabled;
    }
}
NovoPickerElement.ɵfac = function NovoPickerElement_Factory(t) { return new (t || NovoPickerElement)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.ComponentUtils), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
NovoPickerElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoPickerElement, selectors: [["novo-picker"]], viewQuery: function NovoPickerElement_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵstaticViewQuery(_c0, true, ViewContainerRef);
        i0.ɵɵstaticViewQuery(NovoOverlayTemplateComponent, true);
        i0.ɵɵstaticViewQuery(_c1, true);
    } if (rf & 2) {
        var _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.results = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.container = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.input = _t.first);
    } }, inputs: { config: "config", placeholder: "placeholder", clearValueOnSelect: "clearValueOnSelect", closeOnSelect: "closeOnSelect", selected: "selected", appendToBody: "appendToBody", parentScrollSelector: "parentScrollSelector", parentScrollAction: "parentScrollAction", containerClass: "containerClass", side: "side", autoSelectFirstOption: "autoSelectFirstOption", overrideElement: "overrideElement", disablePickerInput: "disablePickerInput" }, outputs: { changed: "changed", select: "select", focus: "focus", blur: "blur", typing: "typing" }, features: [i0.ɵɵProvidersFeature([PICKER_VALUE_ACCESSOR])], ngContentSelectors: _c2, decls: 10, vars: 12, consts: [["class", "bhi-more", 4, "ngIf"], [3, "class", 4, "ngIf"], ["type", "text", "autocomplete", "off", 1, "picker-input", 3, "ngModel", "placeholder", "disabled", "ngModelChange", "keydown", "focus", "click", "blur"], ["input", ""], ["class", "bhi-search", 4, "ngIf"], ["class", "bhi-times", 3, "entity-selected", "click", 4, "ngIf"], ["position", "above-below", 1, "picker-results-container", 3, "parent", "closing"], ["results", ""], [1, "bhi-more"], [1, "bhi-search"], [1, "bhi-times", 3, "click"]], template: function NovoPickerElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵtemplate(0, NovoPickerElement_i_0_Template, 1, 0, "i", 0);
        i0.ɵɵtemplate(1, NovoPickerElement_i_1_Template, 1, 4, "i", 1);
        i0.ɵɵelementStart(2, "input", 2, 3);
        i0.ɵɵlistener("ngModelChange", function NovoPickerElement_Template_input_ngModelChange_2_listener($event) { return ctx.term = $event; })("ngModelChange", function NovoPickerElement_Template_input_ngModelChange_2_listener($event) { return ctx.checkTerm($event); })("keydown", function NovoPickerElement_Template_input_keydown_2_listener($event) { return ctx.onKeyDown($event); })("focus", function NovoPickerElement_Template_input_focus_2_listener($event) { return ctx.onFocus($event); })("click", function NovoPickerElement_Template_input_click_2_listener($event) { return ctx.onFocus($event); })("blur", function NovoPickerElement_Template_input_blur_2_listener($event) { return ctx.onTouched($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(4, NovoPickerElement_i_4_Template, 1, 0, "i", 4);
        i0.ɵɵtemplate(5, NovoPickerElement_i_5_Template, 1, 2, "i", 5);
        i0.ɵɵelementStart(6, "novo-overlay-template", 6);
        i0.ɵɵlistener("closing", function NovoPickerElement_Template_novo_overlay_template_closing_6_listener() { return ctx.onOverlayClosed(); });
        i0.ɵɵelement(7, "span", null, 7);
        i0.ɵɵprojection(9);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", (ctx.config == null ? null : ctx.config.entityIcon) && !ctx._value);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", (ctx.config == null ? null : ctx.config.entityIcon) && ctx._value);
        i0.ɵɵadvance(1);
        i0.ɵɵclassProp("entity-picker", ctx.config == null ? null : ctx.config.entityIcon)("entity-selected", (ctx.config == null ? null : ctx.config.entityIcon) && ctx._value);
        i0.ɵɵproperty("ngModel", ctx.term)("placeholder", ctx.placeholder)("disabled", ctx.disablePickerInput);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", (!ctx._value || ctx.clearValueOnSelect) && !ctx.disablePickerInput);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx._value && !ctx.clearValueOnSelect && !ctx.disablePickerInput);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("parent", ctx.element);
    } }, directives: [i2.NgIf, i3.DefaultValueAccessor, i3.NgControlStatus, i3.NgModel, i4.NovoOverlayTemplateComponent], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoPickerElement, [{
        type: Component,
        args: [{
                selector: 'novo-picker',
                providers: [PICKER_VALUE_ACCESSOR],
                template: `
    <i class="bhi-more" *ngIf="config?.entityIcon && !_value"></i>
    <i class="bhi-{{ config?.entityIcon }} entity-icon {{ config?.entityIcon }}" *ngIf="config?.entityIcon && _value"></i>
    <input
      type="text"
      class="picker-input"
      [(ngModel)]="term"
      [class.entity-picker]="config?.entityIcon"
      [class.entity-selected]="config?.entityIcon && _value"
      (ngModelChange)="checkTerm($event)"
      [placeholder]="placeholder"
      (keydown)="onKeyDown($event)"
      (focus)="onFocus($event)"
      (click)="onFocus($event)"
      (blur)="onTouched($event)"
      autocomplete="off"
      #input
      [disabled]="disablePickerInput"
    />
    <i class="bhi-search" *ngIf="(!_value || clearValueOnSelect) && !disablePickerInput"></i>
    <i
      class="bhi-times"
      [class.entity-selected]="config?.entityIcon && _value"
      *ngIf="_value && !clearValueOnSelect && !disablePickerInput"
      (click)="clearValue(true)"
    ></i>
    <novo-overlay-template class="picker-results-container" [parent]="element" position="above-below" (closing)="onOverlayClosed()">
      <span #results></span>
      <ng-content></ng-content>
    </novo-overlay-template>
  `,
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i1.ComponentUtils }, { type: i0.ChangeDetectorRef }]; }, { results: [{
            type: ViewChild,
            args: ['results', { read: ViewContainerRef, static: true }]
        }], config: [{
            type: Input
        }], placeholder: [{
            type: Input
        }], clearValueOnSelect: [{
            type: Input
        }], closeOnSelect: [{
            type: Input
        }], selected: [{
            type: Input
        }], appendToBody: [{
            type: Input
        }], parentScrollSelector: [{
            type: Input
        }], parentScrollAction: [{
            type: Input
        }], containerClass: [{
            type: Input
        }], side: [{
            type: Input
        }], autoSelectFirstOption: [{
            type: Input
        }], overrideElement: [{
            type: Input
        }], disablePickerInput: [{
            type: Input
        }], changed: [{
            type: Output
        }], select: [{
            type: Output
        }], focus: [{
            type: Output
        }], blur: [{
            type: Output
        }], typing: [{
            type: Output
        }], container: [{
            type: ViewChild,
            args: [NovoOverlayTemplateComponent, { static: true }]
        }], input: [{
            type: ViewChild,
            args: ['input', { static: true }]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGlja2VyLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL3BpY2tlci9QaWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLFNBQVM7QUFDVCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFFVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBRUwsTUFBTSxFQUNOLFNBQVMsRUFDVCxnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNqQyxPQUFPLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFcEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDNUQsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFekUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVDQUF1QyxDQUFDOzs7Ozs7Ozs7SUFtQmxFLHVCQUE4RDs7O0lBQzlELG9CQUFzSDs7O0lBQW5ILHdLQUF5RTs7O0lBaUI1RSx1QkFBeUY7Ozs7SUFDekYsNkJBS0s7SUFESCx5S0FBb0IsSUFBSSxLQUFFO0lBQzNCLGlCQUFJOzs7SUFISCw2R0FBc0Q7OztBQXRDNUQsc0RBQXNEO0FBQ3RELE1BQU0scUJBQXFCLEdB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QUFrQjs7a0RBTWpFLGlCQUFpQjtjQW5DN0IsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2dCQUN2QixTQUFTLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztnQkFDbEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4QlQ7YUFDRjswSEFJQyxPQUFPO2tCQUROLFNBQVM7bUJBQUMsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFJOUQsTUFBTTtrQkFETCxLQUFLO1lBR04sV0FBVztrQkFEVixLQUFLO1lBR04sa0JBQWtCO2tCQURqQixLQUFLO1lBR04sYUFBYTtrQkFEWixLQUFLO1lBR04sUUFBUTtrQkFEUCxLQUFLO1lBSU4sWUFBWTtrQkFEWCxLQUFLO1lBSU4sb0JBQW9CO2tCQURuQixLQUFLO1lBSU4sa0JBQWtCO2tCQURqQixLQUFLO1lBSU4sY0FBYztrQkFEYixLQUFLO1lBSU4sSUFBSTtrQkFESCxLQUFLO1lBSU4scUJBQXFCO2tCQURwQixLQUFLO1lBR04sZUFBZTtrQkFEZCxLQUFLO1lBS0Ysa0JBQWtCO2tCQURyQixLQUFLO1lBYU4sT0FBTztrQkFETixNQUFNO1lBR1AsTUFBTTtrQkFETCxNQUFNO1lBR1AsS0FBSztrQkFESixNQUFNO1lBR1AsSUFBSTtrQkFESCxNQUFNO1lBR1AsTUFBTTtrQkFETCxNQUFNO1lBSUEsU0FBUztrQkFEZixTQUFTO21CQUFDLDRCQUE0QixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUdqRCxLQUFLO2tCQURaLFNBQVM7bUJBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuLy8gVmVuZG9yXG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29tcG9uZW50UmVmLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgS2V5IH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuaW1wb3J0IHsgQ29tcG9uZW50VXRpbHMgfSBmcm9tICcuLi8uLi91dGlscy9jb21wb25lbnQtdXRpbHMvQ29tcG9uZW50VXRpbHMnO1xuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJy4uLy4uL3V0aWxzL0hlbHBlcnMnO1xuaW1wb3J0IHsgbm90aWZ5IH0gZnJvbSAnLi4vLi4vdXRpbHMvbm90aWZpZXIvbm90aWZpZXIudXRpbCc7XG5pbXBvcnQgeyBOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tbW9uL292ZXJsYXkvT3ZlcmxheSc7XG5pbXBvcnQgeyBOb3ZvQ29udHJvbENvbmZpZyB9IGZyb20gJy4uL2Zvcm0vRm9ybUNvbnRyb2xzJztcbmltcG9ydCB7IFBpY2tlclJlc3VsdHMgfSBmcm9tICcuL2V4dHJhcy9waWNrZXItcmVzdWx0cy9QaWNrZXJSZXN1bHRzJztcblxuLy8gVmFsdWUgYWNjZXNzb3IgZm9yIHRoZSBjb21wb25lbnQgKHN1cHBvcnRzIG5nTW9kZWwpXG5jb25zdCBQSUNLRVJfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOb3ZvUGlja2VyRWxlbWVudCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuLyoqXG4gKiBAZGVzY3JpcHRpb24gVGhpcyBjbGFzcyBpcyB0aGUgZGlyZWN0aXZlIGRlZmluaXRpb24gb2YgdGhlIFBpY2tlci4gSWYgeW91IGFkZCBhbmQgYXR0cmlidXRlIG9mIGBwaWNrZXJgIHRvIGFuIGlucHV0LFxuICogaXQgd2lsbCBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIHBpY2tlciB3aGljaCB3cmFwcyB0aGUgaW5wdXQgaW4gYWxsIG9mIHRoZSBwaWNrZXIgSFRNTCBlbGVtZW50cyBhbmQgZnVuY3Rpb25hbGl0eS5cbiAqIFBpY2tlciBzaG91bGQgYmUgYWRkZWQgYXMgYSB0d28td2F5IGJvdW5kIG5nTW9kZWwgaW5zdGFuY2UgYFsocGlja2VyKV09XCJcImAgaW4gb3JkZXIgdG8gaGF2ZSB0aGUgcGlja2VyIG9wdGlvbnNcbiAqIGR5bmFtaWNhbGx5IHBvcHVsYXRlLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXBpY2tlcicsXG4gIHByb3ZpZGVyczogW1BJQ0tFUl9WQUxVRV9BQ0NFU1NPUl0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGkgY2xhc3M9XCJiaGktbW9yZVwiICpuZ0lmPVwiY29uZmlnPy5lbnRpdHlJY29uICYmICFfdmFsdWVcIj48L2k+XG4gICAgPGkgY2xhc3M9XCJiaGkte3sgY29uZmlnPy5lbnRpdHlJY29uIH19IGVudGl0eS1pY29uIHt7IGNvbmZpZz8uZW50aXR5SWNvbiB9fVwiICpuZ0lmPVwiY29uZmlnPy5lbnRpdHlJY29uICYmIF92YWx1ZVwiPjwvaT5cbiAgICA8aW5wdXRcbiAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgIGNsYXNzPVwicGlja2VyLWlucHV0XCJcbiAgICAgIFsobmdNb2RlbCldPVwidGVybVwiXG4gICAgICBbY2xhc3MuZW50aXR5LXBpY2tlcl09XCJjb25maWc/LmVudGl0eUljb25cIlxuICAgICAgW2NsYXNzLmVudGl0eS1zZWxlY3RlZF09XCJjb25maWc/LmVudGl0eUljb24gJiYgX3ZhbHVlXCJcbiAgICAgIChuZ01vZGVsQ2hhbmdlKT1cImNoZWNrVGVybSgkZXZlbnQpXCJcbiAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gICAgICAoa2V5ZG93bik9XCJvbktleURvd24oJGV2ZW50KVwiXG4gICAgICAoZm9jdXMpPVwib25Gb2N1cygkZXZlbnQpXCJcbiAgICAgIChjbGljayk9XCJvbkZvY3VzKCRldmVudClcIlxuICAgICAgKGJsdXIpPVwib25Ub3VjaGVkKCRldmVudClcIlxuICAgICAgYXV0b2NvbXBsZXRlPVwib2ZmXCJcbiAgICAgICNpbnB1dFxuICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVQaWNrZXJJbnB1dFwiXG4gICAgLz5cbiAgICA8aSBjbGFzcz1cImJoaS1zZWFyY2hcIiAqbmdJZj1cIighX3ZhbHVlIHx8IGNsZWFyVmFsdWVPblNlbGVjdCkgJiYgIWRpc2FibGVQaWNrZXJJbnB1dFwiPjwvaT5cbiAgICA8aVxuICAgICAgY2xhc3M9XCJiaGktdGltZXNcIlxuICAgICAgW2NsYXNzLmVudGl0eS1zZWxlY3RlZF09XCJjb25maWc/LmVudGl0eUljb24gJiYgX3ZhbHVlXCJcbiAgICAgICpuZ0lmPVwiX3ZhbHVlICYmICFjbGVhclZhbHVlT25TZWxlY3QgJiYgIWRpc2FibGVQaWNrZXJJbnB1dFwiXG4gICAgICAoY2xpY2spPVwiY2xlYXJWYWx1ZSh0cnVlKVwiXG4gICAgPjwvaT5cbiAgICA8bm92by1vdmVybGF5LXRlbXBsYXRlIGNsYXNzPVwicGlja2VyLXJlc3VsdHMtY29udGFpbmVyXCIgW3BhcmVudF09XCJlbGVtZW50XCIgcG9zaXRpb249XCJhYm92ZS1iZWxvd1wiIChjbG9zaW5nKT1cIm9uT3ZlcmxheUNsb3NlZCgpXCI+XG4gICAgICA8c3BhbiAjcmVzdWx0cz48L3NwYW4+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9ub3ZvLW92ZXJsYXktdGVtcGxhdGU+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9QaWNrZXJFbGVtZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgLy8gQ29udGFpbmVyIGZvciB0aGUgcmVzdWx0c1xuICBAVmlld0NoaWxkKCdyZXN1bHRzJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWUgfSlcbiAgcmVzdWx0czogVmlld0NvbnRhaW5lclJlZjtcblxuICBASW5wdXQoKVxuICBjb25maWc6IE5vdm9Db250cm9sQ29uZmlnWydjb25maWcnXTtcbiAgQElucHV0KClcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgQElucHV0KClcbiAgY2xlYXJWYWx1ZU9uU2VsZWN0OiBib29sZWFuO1xuICBASW5wdXQoKVxuICBjbG9zZU9uU2VsZWN0OiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KClcbiAgc2VsZWN0ZWQ6IEFycmF5PGFueT4gPSBbXTtcbiAgLy8gRGVwcmVjYXRlZFxuICBASW5wdXQoKVxuICBhcHBlbmRUb0JvZHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgLy8gRGVwcmVjYXRlZFxuICBASW5wdXQoKVxuICBwYXJlbnRTY3JvbGxTZWxlY3Rvcjogc3RyaW5nO1xuICAvLyBEZXByZWNhdGVkXG4gIEBJbnB1dCgpXG4gIHBhcmVudFNjcm9sbEFjdGlvbjogc3RyaW5nID0gJ2Nsb3NlJztcbiAgLy8gQ3VzdG9tIGNsYXNzIGZvciB0aGUgZHJvcGRvd24gY29udGFpbmVyXG4gIEBJbnB1dCgpXG4gIGNvbnRhaW5lckNsYXNzOiBzdHJpbmc7XG4gIC8vIFNpZGUgdGhlIGRyb3Bkb3duIHdpbGwgb3BlblxuICBASW5wdXQoKVxuICBzaWRlOiBzdHJpbmcgPSAnbGVmdCc7XG4gIC8vIEF1dG9zZWxlY3RzIHRoZSBmaXJzdCBvcHRpb24gaW4gdGhlIHJlc3VsdHNcbiAgQElucHV0KClcbiAgYXV0b1NlbGVjdEZpcnN0T3B0aW9uOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KClcbiAgb3ZlcnJpZGVFbGVtZW50OiBFbGVtZW50UmVmO1xuXG4gIC8vIERpc2FibGUgZnJvbSB0eXBpbmcgaW50byB0aGUgcGlja2VyIChyZXN1bHQgdGVtcGxhdGUgZG9lcyBldmVyeXRoaW5nKVxuICBASW5wdXQoKVxuICBzZXQgZGlzYWJsZVBpY2tlcklucHV0KHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlUGlja2VySW5wdXQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodik7XG4gIH1cblxuICBnZXQgZGlzYWJsZVBpY2tlcklucHV0KCkge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlUGlja2VySW5wdXQ7XG4gIH1cblxuICBwcml2YXRlIF9kaXNhYmxlUGlja2VySW5wdXQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvLyBFbWl0dGVyIGZvciBzZWxlY3RzXG4gIEBPdXRwdXQoKVxuICBjaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIHNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBmb2N1czogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBibHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIHR5cGluZzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQFZpZXdDaGlsZChOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50LCB7IHN0YXRpYzogdHJ1ZSB9KVxuICBwdWJsaWMgY29udGFpbmVyOiBOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50O1xuICBAVmlld0NoaWxkKCdpbnB1dCcsIHsgc3RhdGljOiB0cnVlIH0pXG4gIHByaXZhdGUgaW5wdXQ6IEVsZW1lbnRSZWY7XG5cbiAgdGVybTogc3RyaW5nID0gJyc7XG4gIHJlc3VsdHNDb21wb25lbnQ6IGFueTtcbiAgcG9wdXA6IENvbXBvbmVudFJlZjxhbnk+O1xuICBfdmFsdWU6IGFueTtcbiAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgY29tcG9uZW50VXRpbHM6IENvbXBvbmVudFV0aWxzLCBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMub3ZlcnJpZGVFbGVtZW50KSB7XG4gICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLm92ZXJyaWRlRWxlbWVudDtcbiAgICB9XG4gICAgaWYgKHRoaXMuYXBwZW5kVG9Cb2R5KSB7XG4gICAgICBub3RpZnkoYCdhcHBlbmRUb0JvZHknIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFBsZWFzZSByZW1vdmUgdGhpcyBhdHRyaWJ1dGUuYCk7XG4gICAgfVxuICAgIC8vIEN1c3RvbSByZXN1bHRzIHRlbXBsYXRlXG4gICAgdGhpcy5yZXN1bHRzQ29tcG9uZW50ID0gdGhpcy5jb25maWcucmVzdWx0c1RlbXBsYXRlIHx8IFBpY2tlclJlc3VsdHM7XG4gICAgLy8gR2V0IGFsbCBkaXN0aW5jdCBrZXkgdXAgZXZlbnRzIGZyb20gdGhlIGlucHV0IGFuZCBvbmx5IGZpcmUgaWYgbG9uZyBlbm91Z2ggYW5kIGRpc3RpbmN0XG4gICAgLy8gbGV0IGlucHV0ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcbiAgICBjb25zdCBwYXN0ZU9ic2VydmVyID0gZnJvbUV2ZW50KHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudCwgJ3Bhc3RlJykucGlwZShkZWJvdW5jZVRpbWUoMjUwKSwgZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG4gICAgcGFzdGVPYnNlcnZlci5zdWJzY3JpYmUoXG4gICAgICAoZXZlbnQ6IENsaXBib2FyZEV2ZW50KSA9PiB0aGlzLm9uRGVib3VuY2VkS2V5dXAoZXZlbnQpLFxuICAgICAgKGVycikgPT4gdGhpcy5oaWRlUmVzdWx0cyhlcnIpLFxuICAgICk7XG4gICAgY29uc3Qga2V5Ym9hcmRPYnNlcnZlciA9IGZyb21FdmVudCh0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQsICdrZXl1cCcpLnBpcGUoZGVib3VuY2VUaW1lKDI1MCksIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICAgIGtleWJvYXJkT2JzZXJ2ZXIuc3Vic2NyaWJlKFxuICAgICAgKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB0aGlzLm9uRGVib3VuY2VkS2V5dXAoZXZlbnQpLFxuICAgICAgKGVycikgPT4gdGhpcy5oaWRlUmVzdWx0cyhlcnIpLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIG9uRGVib3VuY2VkS2V5dXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQgfCBDbGlwYm9hcmRFdmVudCkge1xuICAgIGlmIChbS2V5LkVzY2FwZSwgS2V5LkFycm93RG93biwgS2V5LkFycm93VXAsIEtleS5FbnRlciwgS2V5LlRhYl0uc29tZSgoa2V5KSA9PiBrZXkgPT09IChldmVudCBhcyBLZXlib2FyZEV2ZW50KS5rZXkpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc2hvdygoZXZlbnQudGFyZ2V0IGFzIGFueSkudmFsdWUpO1xuICB9XG5cbiAgcHVibGljIG9wZW5QYW5lbCgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnRhaW5lci5vcGVuUGFuZWwoKTtcbiAgfVxuXG4gIHB1YmxpYyBjbG9zZVBhbmVsKCk6IHZvaWQge1xuICAgIHRoaXMuY29udGFpbmVyLmNsb3NlUGFuZWwoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcGFuZWxPcGVuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNvbnRhaW5lciAmJiB0aGlzLmNvbnRhaW5lci5wYW5lbE9wZW47XG4gIH1cblxuICBwcml2YXRlIHNob3codGVybT86IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMub3BlblBhbmVsKCk7XG4gICAgLy8gU2hvdyB0aGUgcmVzdWx0cyBpbnNpZGVcbiAgICB0aGlzLnNob3dSZXN1bHRzKHRlcm0pO1xuICB9XG5cbiAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZVBpY2tlcklucHV0KSB7XG4gICAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLnBhbmVsT3BlbiAmJiAhdGhpcy5kaXNhYmxlUGlja2VySW5wdXQpIHtcbiAgICAgIGlmIChldmVudC5rZXkgPT09IEtleS5Fc2NhcGUgfHwgZXZlbnQua2V5ID09PSBLZXkuVGFiKSB7XG4gICAgICAgIHRoaXMuaGlkZVJlc3VsdHMoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXZlbnQua2V5ID09PSBLZXkuQXJyb3dVcCkge1xuICAgICAgICB0aGlzLnBvcHVwLmluc3RhbmNlLnByZXZBY3RpdmVNYXRjaCgpO1xuICAgICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXZlbnQua2V5ID09PSBLZXkuQXJyb3dEb3duKSB7XG4gICAgICAgIHRoaXMucG9wdXAuaW5zdGFuY2UubmV4dEFjdGl2ZU1hdGNoKCk7XG4gICAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChldmVudC5rZXkgPT09IEtleS5FbnRlcikge1xuICAgICAgICBjb25zdCBhY3RpdmVNYXRjaCA9IHRoaXMucG9wdXAuaW5zdGFuY2UuYWN0aXZlTWF0Y2g7XG4gICAgICAgIGlmICghdGhpcy5zZWxlY3RlZC5maW5kKChzZWxlY3RlZCkgPT4gYWN0aXZlTWF0Y2ggJiYgYWN0aXZlTWF0Y2gudmFsdWUgJiYgc2VsZWN0ZWQudmFsdWUgPT09IGFjdGl2ZU1hdGNoLnZhbHVlKSkge1xuICAgICAgICAgIHRoaXMucG9wdXAuaW5zdGFuY2Uuc2VsZWN0QWN0aXZlTWF0Y2goKTtcbiAgICAgICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICgoZXZlbnQua2V5ID09PSBLZXkuQmFja3NwYWNlIHx8IGV2ZW50LmtleSA9PT0gS2V5LkRlbGV0ZSkgJiYgIUhlbHBlcnMuaXNCbGFuayh0aGlzLl92YWx1ZSkpIHtcbiAgICAgICAgdGhpcy5jbGVhclZhbHVlKGZhbHNlKTtcbiAgICAgICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gICAgICB9XG4gICAgICBpZiAoZXZlbnQua2V5ID09PSBLZXkuRGVsZXRlICYmIEhlbHBlcnMuaXNCbGFuayh0aGlzLl92YWx1ZSkpIHtcbiAgICAgICAgdGhpcy5jbGVhclZhbHVlKHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNsZWFyVmFsdWUod2lwZVRlcm0pIHtcbiAgICB0aGlzLl92YWx1ZSA9IG51bGw7XG4gICAgdGhpcy5zZWxlY3QuZW1pdCh0aGlzLl92YWx1ZSk7XG4gICAgdGhpcy5jaGFuZ2VkLmVtaXQoeyB2YWx1ZTogdGhpcy5fdmFsdWUsIHJhd1ZhbHVlOiB7IGxhYmVsOiAnJywgdmFsdWU6IHRoaXMuX3ZhbHVlIH0gfSk7XG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMuX3ZhbHVlKTtcblxuICAgIGlmICh3aXBlVGVybSkge1xuICAgICAgdGhpcy50ZXJtID0gJyc7XG4gICAgICB0aGlzLmhpZGVSZXN1bHRzKCk7XG4gICAgfVxuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBXaGVuIHRoZSBpbnB1dCdzIGZvY3VzIGV2ZW50IGlzIGNhbGxlZCB0aGlzIG1ldGhvZCBjYWxscyB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIHRoYXQgZGlzcGxheXMgdGhlXG4gICAqIHJlc3VsdHMuXG4gICAqL1xuICBvbkZvY3VzKGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLnBhbmVsT3Blbikge1xuICAgICAgdGhpcy5zaG93KCk7XG4gICAgfVxuICAgIHRoaXMuZm9jdXMuZW1pdChldmVudCk7XG4gIH1cblxuICAvLyBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIHRoZSByZXN1bHRzIChjYWxsZWQgcG9wdXApIGFuZCBhZGRzIGFsbCB0aGUgYmluZGluZ3MgdG8gdGhhdCBpbnN0YW5jZS5cbiAgc2hvd1Jlc3VsdHModGVybT86IGFueSkge1xuICAgIC8vIFVwZGF0ZSBNYXRjaGVzXG4gICAgaWYgKHRoaXMucG9wdXApIHtcbiAgICAgIC8vIFVwZGF0ZSBleGlzdGluZyBsaXN0IG9yIGNyZWF0ZSB0aGUgRE9NIGVsZW1lbnRcbiAgICAgIHRoaXMucG9wdXAuaW5zdGFuY2UuY29uZmlnID0gdGhpcy5jb25maWc7XG4gICAgICB0aGlzLnBvcHVwLmluc3RhbmNlLnRlcm0gPSB0aGlzLnRlcm07XG4gICAgICB0aGlzLnBvcHVwLmluc3RhbmNlLnNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZDtcbiAgICAgIHRoaXMucG9wdXAuaW5zdGFuY2UuYXV0b1NlbGVjdEZpcnN0T3B0aW9uID0gdGhpcy5hdXRvU2VsZWN0Rmlyc3RPcHRpb247XG4gICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wb3B1cCA9IHRoaXMuY29tcG9uZW50VXRpbHMuYXBwZW5kKHRoaXMucmVzdWx0c0NvbXBvbmVudCwgdGhpcy5yZXN1bHRzKTtcbiAgICAgIHRoaXMucG9wdXAuaW5zdGFuY2UucGFyZW50ID0gdGhpcztcbiAgICAgIHRoaXMucG9wdXAuaW5zdGFuY2UuY29uZmlnID0gdGhpcy5jb25maWc7XG4gICAgICB0aGlzLnBvcHVwLmluc3RhbmNlLnRlcm0gPSB0aGlzLnRlcm07XG4gICAgICB0aGlzLnBvcHVwLmluc3RhbmNlLnNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZDtcbiAgICAgIHRoaXMucG9wdXAuaW5zdGFuY2UuYXV0b1NlbGVjdEZpcnN0T3B0aW9uID0gdGhpcy5hdXRvU2VsZWN0Rmlyc3RPcHRpb247XG4gICAgICB0aGlzLnBvcHVwLmluc3RhbmNlLm92ZXJsYXkgPSB0aGlzLmNvbnRhaW5lci5vdmVybGF5UmVmO1xuICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gVGVsbHMgdGhlIG92ZXJsYXkgY29tcG9uZW50IHRvIGhpZGUgdGhlIHBpY2tlciByZXN1bHRzIGZyb20gdGhlIERPTSB3aXRob3V0IGRlbGV0aW5nIHRoZSBkeW5hbWljYWxseSBhbGxvY2F0ZWQgcG9wdXAgaW5zdGFuY2UgY3JlYXRlZCBpblxuICAvLyBzaG93UmVzdWx0cy4gVGhlIHBvcHVwIGluc3RhbmNlIHdpbGwgcmVtYWluIGluIG1lbW9yeSBmcm9tIHRoZSBmaXJzdCB0aW1lIHRoZSByZXN1bHRzIGFyZSBzaG93biB1bnRpbCB0aGlzIGNvbXBvbmVudCBpcyBkZXN0cm95ZWQuXG4gIGhpZGVSZXN1bHRzKGVycj86IGFueSkge1xuICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLy8gQ2xlYW5zIHVwIGxpc3RlbmVycyBmb3IgdGhlIHBvcHVwIC0gd2lsbCBnZXQgZXhlY3V0ZWQgbm8gbWF0dGVyIGhvdyB0aGUgcG9wdXAgaXMgY2xvc2VkLlxuICBvbk92ZXJsYXlDbG9zZWQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucG9wdXAgJiYgdGhpcy5wb3B1cC5pbnN0YW5jZSAmJiB0aGlzLnBvcHVwLmluc3RhbmNlLmNsZWFuVXApIHtcbiAgICAgIHRoaXMucG9wdXAuaW5zdGFuY2UuY2xlYW5VcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGdldCBhY2Nlc3NvclxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgLy8gc2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWUoc2VsZWN0ZWQpIHtcbiAgICBpZiAoIXNlbGVjdGVkKSB7XG4gICAgICB0aGlzLnRlcm0gPSAnJztcbiAgICAgIHRoaXMuX3ZhbHVlID0gbnVsbDtcbiAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLl92YWx1ZSk7XG4gICAgfSBlbHNlIGlmIChzZWxlY3RlZC52YWx1ZSAhPT0gdGhpcy5fdmFsdWUpIHtcbiAgICAgIHRoaXMudGVybSA9IHRoaXMuY2xlYXJWYWx1ZU9uU2VsZWN0ID8gJycgOiBzZWxlY3RlZC5sYWJlbDtcbiAgICAgIHRoaXMuX3ZhbHVlID0gc2VsZWN0ZWQudmFsdWU7XG4gICAgICB0aGlzLmNoYW5nZWQuZW1pdCh7IHZhbHVlOiBzZWxlY3RlZC52YWx1ZSwgcmF3VmFsdWU6IHsgbGFiZWw6IHRoaXMudGVybSwgdmFsdWU6IHNlbGVjdGVkLnZhbHVlIH0gfSk7XG4gICAgICB0aGlzLnNlbGVjdC5lbWl0KHNlbGVjdGVkKTtcbiAgICAgIHRoaXMub25Nb2RlbENoYW5nZShzZWxlY3RlZC52YWx1ZSk7XG4gICAgICBpZiAodGhpcy5wb3B1cCkge1xuICAgICAgICB0aGlzLnBvcHVwLmluc3RhbmNlLnNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jaGFuZ2VkLmVtaXQoeyB2YWx1ZTogc2VsZWN0ZWQudmFsdWUsIHJhd1ZhbHVlOiB7IGxhYmVsOiB0aGlzLnRlcm0sIHZhbHVlOiB0aGlzLl92YWx1ZSB9IH0pO1xuICAgICAgdGhpcy5zZWxlY3QuZW1pdChzZWxlY3RlZCk7XG4gICAgfVxuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLy8gTWFrZXMgc3VyZSB0byBjbGVhciB0aGUgbW9kZWwgaWYgdGhlIHVzZXIgY2xlYXJzIHRoZSB0ZXh0IGJveFxuICBjaGVja1Rlcm0oZXZlbnQpIHtcbiAgICB0aGlzLnR5cGluZy5lbWl0KGV2ZW50KTtcbiAgICBpZiAoIWV2ZW50IHx8ICFldmVudC5sZW5ndGgpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gbnVsbDtcbiAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLl92YWx1ZSk7XG4gICAgfVxuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLy8gU2V0IHRvdWNoZWQgb24gYmx1clxuICBvblRvdWNoZWQoZXZlbnQ/OiBFdmVudCkge1xuICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICB0aGlzLmJsdXIuZW1pdChldmVudCk7XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodGhpcy5jbGVhclZhbHVlT25TZWxlY3QpIHtcbiAgICAgIHRoaXMudGVybSA9ICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiAhdGhpcy5jb25maWcudXNlR2V0TGFiZWxzKSB7XG4gICAgICAgIHRoaXMudGVybSA9IHZhbHVlO1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZSAmJiB2YWx1ZS5sYWJlbCkge1xuICAgICAgICB0aGlzLnRlcm0gPSB2YWx1ZS5sYWJlbDtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUgJiYgdmFsdWUuZmlyc3ROYW1lKSB7XG4gICAgICAgIHRoaXMudGVybSA9IGAke3ZhbHVlLmZpcnN0TmFtZX0gJHt2YWx1ZS5sYXN0TmFtZX1gO1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZSAmJiB2YWx1ZS5uYW1lKSB7XG4gICAgICAgIHRoaXMudGVybSA9IHZhbHVlLm5hbWU7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLmNvbmZpZy5nZXRMYWJlbHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5jb25maWcuZ2V0TGFiZWxzKHZhbHVlKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICB0aGlzLnRlcm0gPSByZXN1bHQubGVuZ3RoID8gcmVzdWx0WzBdLmxhYmVsIHx8ICcnIDogcmVzdWx0LmxhYmVsIHx8ICcnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRlcm0gPSB2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZSAmJiB2YWx1ZS50aXRsZSkge1xuICAgICAgICB0aGlzLnRlcm0gPSB2YWx1ZS50aXRsZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudGVybSA9IHZhbHVlIHx8ICcnO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoZGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLl9kaXNhYmxlUGlja2VySW5wdXQgPSBkaXNhYmxlZDtcbiAgfVxufVxuIl19
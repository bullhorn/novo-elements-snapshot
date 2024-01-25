import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild, ViewContainerRef, ViewEncapsulation, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ComponentUtils } from 'novo-elements/services';
import { Helpers, notify } from 'novo-elements/utils';
import { NovoOverlayTemplateComponent } from 'novo-elements/elements/common';
// import { NovoControlConfig } from '../form/FormControls';
import { PickerResults } from './extras/picker-results/PickerResults';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "novo-elements/elements/common";
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
    // Disable from typing into the picker (result template does everything)
    set disablePickerInput(v) {
        this._disablePickerInput = coerceBooleanProperty(v);
    }
    get disablePickerInput() {
        return this._disablePickerInput;
    }
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
        this.allowCustomValues = false;
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
        if (["Escape" /* Key.Escape */, "ArrowDown" /* Key.ArrowDown */, "ArrowUp" /* Key.ArrowUp */, "Enter" /* Key.Enter */, "Tab" /* Key.Tab */].some((key) => key === event.key)) {
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
            if (event.key === "Escape" /* Key.Escape */ || event.key === "Tab" /* Key.Tab */) {
                this.hideResults();
                return;
            }
            if (event.key === "ArrowUp" /* Key.ArrowUp */) {
                this.popup.instance.prevActiveMatch();
                this.ref.markForCheck();
                return;
            }
            if (event.key === "ArrowDown" /* Key.ArrowDown */) {
                this.popup.instance.nextActiveMatch();
                this.ref.markForCheck();
                return;
            }
            if (event.key === "Enter" /* Key.Enter */) {
                const activeMatch = this.popup.instance.activeMatch;
                if (!this.selected.find((selected) => activeMatch && activeMatch.value && selected.value === activeMatch.value)) {
                    this.popup.instance.selectActiveMatch();
                    this.ref.markForCheck();
                }
                return;
            }
            if ((event.key === "Backspace" /* Key.Backspace */ || event.key === "Delete" /* Key.Delete */) && !Helpers.isEmpty(this._value) && (this._value === this.term)) {
                this.clearValue(false);
                this.closePanel();
            }
            if (event.key === "Delete" /* Key.Delete */ && Helpers.isBlank(this._value)) {
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
            this.popup.instance.customTextValue = null;
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
            this.term = this.clearValueOnSelect ? '' : selected.label;
            this.changed.emit({ value: selected.value, rawValue: { label: this.term, value: this._value } });
            this.select.emit(selected);
        }
        this.ref.markForCheck();
    }
    // Makes sure to clear the model if the user clears the text box
    checkTerm(event) {
        this.typing.emit(event);
        if (this.allowCustomValues) {
            if (this.term) {
                this.popup.instance.customTextValue = { label: this.term, value: this.term };
            }
            else {
                this.popup.instance.customTextValue = null;
            }
        }
        if ((!event || !event.length) && !Helpers.isEmpty(this._value)) {
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
NovoPickerElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoPickerElement, deps: [{ token: i0.ElementRef }, { token: i1.ComponentUtils }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NovoPickerElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: NovoPickerElement, selector: "novo-picker", inputs: { config: "config", placeholder: "placeholder", clearValueOnSelect: "clearValueOnSelect", closeOnSelect: "closeOnSelect", selected: "selected", appendToBody: "appendToBody", parentScrollSelector: "parentScrollSelector", parentScrollAction: "parentScrollAction", containerClass: "containerClass", side: "side", autoSelectFirstOption: "autoSelectFirstOption", overrideElement: "overrideElement", maxlength: "maxlength", allowCustomValues: "allowCustomValues", disablePickerInput: "disablePickerInput" }, outputs: { changed: "changed", select: "select", focus: "focus", blur: "blur", typing: "typing" }, providers: [PICKER_VALUE_ACCESSOR], viewQueries: [{ propertyName: "results", first: true, predicate: ["results"], descendants: true, read: ViewContainerRef, static: true }, { propertyName: "container", first: true, predicate: NovoOverlayTemplateComponent, descendants: true, static: true }, { propertyName: "input", first: true, predicate: ["input"], descendants: true, static: true }], ngImport: i0, template: `
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
      [maxlength]="maxlength"
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
  `, isInline: true, styles: ["novo-picker{width:100%;display:flex;align-items:center;flex-wrap:wrap;justify-content:flex-start;transition:all .2s ease-in-out;position:relative;padding-bottom:0}novo-picker.selected+i,novo-picker.selected:hover+i{color:#4a89dc}novo-picker.ng-touched.ng-invalid:not(.ng-pristine)>input,novo-picker.ng-touched.ng-invalid:not(.ng-pristine)>input:hover,novo-picker.ng-touched.ng-invalid:not(.ng-pristine)>input:focus{border-bottom-color:transparent!important}novo-picker input{font-size:1em;background:transparent!important;border:none;border-bottom:1px solid #afb9c0;border-radius:0;outline:none;height:2rem;width:100%;margin:0;padding:0;box-shadow:none;box-sizing:content-box;transition:all .3s;color:#26282b}novo-picker input:hover{border-bottom:1px solid #5f6d78}novo-picker input:focus{border-bottom:1px solid #4a89dc}novo-picker input:invalid{border-bottom:1px solid #da4453}novo-picker input.entity-picker{padding-left:2em}novo-picker input.entity-selected{padding-left:2.5em;background:#f7f7f7!important}novo-picker input:disabled{border-bottom:1px dashed #afb9c0!important}novo-picker i.bhi-more{position:absolute;left:0;top:2px;background:#f7f7f7;font-size:1em;border-radius:3px;padding:3px}novo-picker i.entity-icon{position:absolute;left:5px;top:3px;font-size:1em;border-radius:3px;padding:3px;color:#fff}novo-picker i.entity-icon.black{background:#000000}novo-picker i.entity-icon.white{background:#ffffff}novo-picker i.entity-icon.gray{background:#9e9e9e}novo-picker i.entity-icon.grey{background:#9e9e9e}novo-picker i.entity-icon.offWhite{background:#f7f7f7}novo-picker i.entity-icon.bright{background:#f7f7f7}novo-picker i.entity-icon.light{background:#dbdbdb}novo-picker i.entity-icon.neutral{background:#4f5361}novo-picker i.entity-icon.dark{background:#3d464d}novo-picker i.entity-icon.orange{background:#ff6900}novo-picker i.entity-icon.navigation{background:#202945}novo-picker i.entity-icon.skyBlue{background:#009bdf}novo-picker i.entity-icon.steel{background:#5b6770}novo-picker i.entity-icon.metal{background:#637893}novo-picker i.entity-icon.sand{background:#f4f4f4}novo-picker i.entity-icon.silver{background:#e2e2e2}novo-picker i.entity-icon.stone{background:#bebebe}novo-picker i.entity-icon.ash{background:#a0a0a0}novo-picker i.entity-icon.slate{background:#707070}novo-picker i.entity-icon.onyx{background:#526980}novo-picker i.entity-icon.charcoal{background:#282828}novo-picker i.entity-icon.moonlight{background:#1a242f}novo-picker i.entity-icon.midnight{background:#202945}novo-picker i.entity-icon.darkness{background:#161f27}novo-picker i.entity-icon.navy{background:#0d2d42}novo-picker i.entity-icon.aqua{background:#3bafda}novo-picker i.entity-icon.ocean{background:#4a89dc}novo-picker i.entity-icon.mint{background:#37bc9b}novo-picker i.entity-icon.grass{background:#8cc152}novo-picker i.entity-icon.sunflower{background:#f6b042}novo-picker i.entity-icon.bittersweet{background:#eb6845}novo-picker i.entity-icon.grapefruit{background:#da4453}novo-picker i.entity-icon.carnation{background:#d770ad}novo-picker i.entity-icon.lavender{background:#967adc}novo-picker i.entity-icon.mountain{background:#9678b6}novo-picker i.entity-icon.info{background:#4a89dc}novo-picker i.entity-icon.positive{background:#4a89dc}novo-picker i.entity-icon.success{background:#8cc152}novo-picker i.entity-icon.negative{background:#da4453}novo-picker i.entity-icon.danger{background:#da4453}novo-picker i.entity-icon.error{background:#da4453}novo-picker i.entity-icon.warning{background:#f6b042}novo-picker i.entity-icon.empty{background:#cccdcc}novo-picker i.entity-icon.disabled{background:#bebebe}novo-picker i.entity-icon.background{background:#f7f7f7}novo-picker i.entity-icon.backgroundDark{background:#e2e2e2}novo-picker i.entity-icon.presentation{background:#5b6770}novo-picker i.entity-icon.bullhorn{background:#ff6900}novo-picker i.entity-icon.pulse{background:#3bafda}novo-picker i.entity-icon.company{background:#3399dd}novo-picker i.entity-icon.candidate{background:#44bb77}novo-picker i.entity-icon.lead{background:#aa6699}novo-picker i.entity-icon.contact{background:#ffaa44}novo-picker i.entity-icon.clientcontact{background:#ffaa44}novo-picker i.entity-icon.opportunity{background:#662255}novo-picker i.entity-icon.job{background:#bb5566}novo-picker i.entity-icon.joborder{background:#bb5566}novo-picker i.entity-icon.submission{background:#a9adbb}novo-picker i.entity-icon.sendout{background:#747884}novo-picker i.entity-icon.placement{background:#0b344f}novo-picker i.entity-icon.note{background:#747884}novo-picker i.entity-icon.contract{background:#454ea0}novo-picker i.entity-icon.jobCode{background:#696d79}novo-picker i.entity-icon.earnCode{background:#696d79}novo-picker i.entity-icon.invoiceStatement{background:#696d79}novo-picker i.entity-icon.billableCharge{background:#696d79}novo-picker i.entity-icon.payableCharge{background:#696d79}novo-picker i.entity-icon.user{background:#696d79}novo-picker i.entity-icon.corporateUser{background:#696d79}novo-picker i.entity-icon.distributionList{background:#696d79}novo-picker i.entity-icon.credential{background:#696d79}novo-picker i.entity-icon.person{background:#696d79}novo-picker i.bhi-search,novo-picker i.bhi-times{position:absolute;right:0;color:#3d464d}novo-picker i.bhi-search.entity-selected,novo-picker i.bhi-times.entity-selected{right:5px}novo-picker i.bhi-search{top:0;font-size:1.2rem}novo-picker i.bhi-times{top:0;cursor:pointer;font-size:1.2rem}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { kind: "directive", type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i4.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "width", "height", "closeOnSelect", "hasBackdrop", "parent"], outputs: ["select", "opening", "closing"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoPickerElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-picker', providers: [PICKER_VALUE_ACCESSOR], template: `
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
      [maxlength]="maxlength"
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
  `, encapsulation: ViewEncapsulation.None, styles: ["novo-picker{width:100%;display:flex;align-items:center;flex-wrap:wrap;justify-content:flex-start;transition:all .2s ease-in-out;position:relative;padding-bottom:0}novo-picker.selected+i,novo-picker.selected:hover+i{color:#4a89dc}novo-picker.ng-touched.ng-invalid:not(.ng-pristine)>input,novo-picker.ng-touched.ng-invalid:not(.ng-pristine)>input:hover,novo-picker.ng-touched.ng-invalid:not(.ng-pristine)>input:focus{border-bottom-color:transparent!important}novo-picker input{font-size:1em;background:transparent!important;border:none;border-bottom:1px solid #afb9c0;border-radius:0;outline:none;height:2rem;width:100%;margin:0;padding:0;box-shadow:none;box-sizing:content-box;transition:all .3s;color:#26282b}novo-picker input:hover{border-bottom:1px solid #5f6d78}novo-picker input:focus{border-bottom:1px solid #4a89dc}novo-picker input:invalid{border-bottom:1px solid #da4453}novo-picker input.entity-picker{padding-left:2em}novo-picker input.entity-selected{padding-left:2.5em;background:#f7f7f7!important}novo-picker input:disabled{border-bottom:1px dashed #afb9c0!important}novo-picker i.bhi-more{position:absolute;left:0;top:2px;background:#f7f7f7;font-size:1em;border-radius:3px;padding:3px}novo-picker i.entity-icon{position:absolute;left:5px;top:3px;font-size:1em;border-radius:3px;padding:3px;color:#fff}novo-picker i.entity-icon.black{background:#000000}novo-picker i.entity-icon.white{background:#ffffff}novo-picker i.entity-icon.gray{background:#9e9e9e}novo-picker i.entity-icon.grey{background:#9e9e9e}novo-picker i.entity-icon.offWhite{background:#f7f7f7}novo-picker i.entity-icon.bright{background:#f7f7f7}novo-picker i.entity-icon.light{background:#dbdbdb}novo-picker i.entity-icon.neutral{background:#4f5361}novo-picker i.entity-icon.dark{background:#3d464d}novo-picker i.entity-icon.orange{background:#ff6900}novo-picker i.entity-icon.navigation{background:#202945}novo-picker i.entity-icon.skyBlue{background:#009bdf}novo-picker i.entity-icon.steel{background:#5b6770}novo-picker i.entity-icon.metal{background:#637893}novo-picker i.entity-icon.sand{background:#f4f4f4}novo-picker i.entity-icon.silver{background:#e2e2e2}novo-picker i.entity-icon.stone{background:#bebebe}novo-picker i.entity-icon.ash{background:#a0a0a0}novo-picker i.entity-icon.slate{background:#707070}novo-picker i.entity-icon.onyx{background:#526980}novo-picker i.entity-icon.charcoal{background:#282828}novo-picker i.entity-icon.moonlight{background:#1a242f}novo-picker i.entity-icon.midnight{background:#202945}novo-picker i.entity-icon.darkness{background:#161f27}novo-picker i.entity-icon.navy{background:#0d2d42}novo-picker i.entity-icon.aqua{background:#3bafda}novo-picker i.entity-icon.ocean{background:#4a89dc}novo-picker i.entity-icon.mint{background:#37bc9b}novo-picker i.entity-icon.grass{background:#8cc152}novo-picker i.entity-icon.sunflower{background:#f6b042}novo-picker i.entity-icon.bittersweet{background:#eb6845}novo-picker i.entity-icon.grapefruit{background:#da4453}novo-picker i.entity-icon.carnation{background:#d770ad}novo-picker i.entity-icon.lavender{background:#967adc}novo-picker i.entity-icon.mountain{background:#9678b6}novo-picker i.entity-icon.info{background:#4a89dc}novo-picker i.entity-icon.positive{background:#4a89dc}novo-picker i.entity-icon.success{background:#8cc152}novo-picker i.entity-icon.negative{background:#da4453}novo-picker i.entity-icon.danger{background:#da4453}novo-picker i.entity-icon.error{background:#da4453}novo-picker i.entity-icon.warning{background:#f6b042}novo-picker i.entity-icon.empty{background:#cccdcc}novo-picker i.entity-icon.disabled{background:#bebebe}novo-picker i.entity-icon.background{background:#f7f7f7}novo-picker i.entity-icon.backgroundDark{background:#e2e2e2}novo-picker i.entity-icon.presentation{background:#5b6770}novo-picker i.entity-icon.bullhorn{background:#ff6900}novo-picker i.entity-icon.pulse{background:#3bafda}novo-picker i.entity-icon.company{background:#3399dd}novo-picker i.entity-icon.candidate{background:#44bb77}novo-picker i.entity-icon.lead{background:#aa6699}novo-picker i.entity-icon.contact{background:#ffaa44}novo-picker i.entity-icon.clientcontact{background:#ffaa44}novo-picker i.entity-icon.opportunity{background:#662255}novo-picker i.entity-icon.job{background:#bb5566}novo-picker i.entity-icon.joborder{background:#bb5566}novo-picker i.entity-icon.submission{background:#a9adbb}novo-picker i.entity-icon.sendout{background:#747884}novo-picker i.entity-icon.placement{background:#0b344f}novo-picker i.entity-icon.note{background:#747884}novo-picker i.entity-icon.contract{background:#454ea0}novo-picker i.entity-icon.jobCode{background:#696d79}novo-picker i.entity-icon.earnCode{background:#696d79}novo-picker i.entity-icon.invoiceStatement{background:#696d79}novo-picker i.entity-icon.billableCharge{background:#696d79}novo-picker i.entity-icon.payableCharge{background:#696d79}novo-picker i.entity-icon.user{background:#696d79}novo-picker i.entity-icon.corporateUser{background:#696d79}novo-picker i.entity-icon.distributionList{background:#696d79}novo-picker i.entity-icon.credential{background:#696d79}novo-picker i.entity-icon.person{background:#696d79}novo-picker i.bhi-search,novo-picker i.bhi-times{position:absolute;right:0;color:#3d464d}novo-picker i.bhi-search.entity-selected,novo-picker i.bhi-times.entity-selected{right:5px}novo-picker i.bhi-search{top:0;font-size:1.2rem}novo-picker i.bhi-times{top:0;cursor:pointer;font-size:1.2rem}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.ComponentUtils }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { results: [{
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
            }], maxlength: [{
                type: Input
            }], allowCustomValues: [{
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
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGlja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvcGlja2VyL1BpY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFFVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBRUwsTUFBTSxFQUNOLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDakMsT0FBTyxFQUFFLFlBQVksRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsT0FBTyxFQUFPLE1BQU0sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzNELE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzdFLDREQUE0RDtBQUM1RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUNBQXVDLENBQUM7Ozs7OztBQUV0RSxzREFBc0Q7QUFDdEQsTUFBTSxxQkFBcUIsR0FBRztJQUM1QixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsaUJBQWlCLENBQUM7SUFDaEQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBRUY7Ozs7O0dBS0c7QUF1Q0gsTUFBTSxPQUFPLGlCQUFpQjtJQXdDNUIsd0VBQXdFO0lBQ3hFLElBQ0ksa0JBQWtCLENBQUMsQ0FB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O2tCQXRDN0IsU0FBUzsrQkFDRSxhQUFhLGFBQ1osQ0FBQyxxQkFBcUIsQ0FBQyxZQUN4Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQStCVCxpQkFFYyxpQkFBaUIsQ0FBQyxJQUFJOzhKQUtyQyxPQUFPO3NCQUROLFNBQVM7dUJBQUMsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBSTlELE1BQU07c0JBREwsS0FBSztnQkFHTixXQUFXO3NCQURWLEtBQUs7Z0JBR04sa0JBQWtCO3NCQURqQixLQUFLO2dCQUdOLGFBQWE7c0JBRFosS0FBSztnQkFHTixRQUFRO3NCQURQLEtBQUs7Z0JBSU4sWUFBWTtzQkFEWCxLQUFLO2dCQUlOLG9CQUFvQjtzQkFEbkIsS0FBSztnQkFJTixrQkFBa0I7c0JBRGpCLEtBQUs7Z0JBSU4sY0FBYztzQkFEYixLQUFLO2dCQUlOLElBQUk7c0JBREgsS0FBSztnQkFJTixxQkFBcUI7c0JBRHBCLEtBQUs7Z0JBR04sZUFBZTtzQkFEZCxLQUFLO2dCQUdOLFNBQVM7c0JBRFIsS0FBSztnQkFHTixpQkFBaUI7c0JBRGhCLEtBQUs7Z0JBS0Ysa0JBQWtCO3NCQURyQixLQUFLO2dCQWFOLE9BQU87c0JBRE4sTUFBTTtnQkFHUCxNQUFNO3NCQURMLE1BQU07Z0JBR1AsS0FBSztzQkFESixNQUFNO2dCQUdQLElBQUk7c0JBREgsTUFBTTtnQkFHUCxNQUFNO3NCQURMLE1BQU07Z0JBSUEsU0FBUztzQkFEZixTQUFTO3VCQUFDLDRCQUE0QixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFHbEQsS0FBSztzQkFEWCxTQUFTO3VCQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29tcG9uZW50UmVmLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENvbXBvbmVudFV0aWxzIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBIZWxwZXJzLCBLZXksIG5vdGlmeSB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuaW1wb3J0IHsgTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudCB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvY29tbW9uJztcbi8vIGltcG9ydCB7IE5vdm9Db250cm9sQ29uZmlnIH0gZnJvbSAnLi4vZm9ybS9Gb3JtQ29udHJvbHMnO1xuaW1wb3J0IHsgUGlja2VyUmVzdWx0cyB9IGZyb20gJy4vZXh0cmFzL3BpY2tlci1yZXN1bHRzL1BpY2tlclJlc3VsdHMnO1xuXG4vLyBWYWx1ZSBhY2Nlc3NvciBmb3IgdGhlIGNvbXBvbmVudCAoc3VwcG9ydHMgbmdNb2RlbClcbmNvbnN0IFBJQ0tFUl9WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdm9QaWNrZXJFbGVtZW50KSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBUaGlzIGNsYXNzIGlzIHRoZSBkaXJlY3RpdmUgZGVmaW5pdGlvbiBvZiB0aGUgUGlja2VyLiBJZiB5b3UgYWRkIGFuZCBhdHRyaWJ1dGUgb2YgYHBpY2tlcmAgdG8gYW4gaW5wdXQsXG4gKiBpdCB3aWxsIGNyZWF0ZSBhbiBpbnN0YW5jZSBvZiB0aGUgcGlja2VyIHdoaWNoIHdyYXBzIHRoZSBpbnB1dCBpbiBhbGwgb2YgdGhlIHBpY2tlciBIVE1MIGVsZW1lbnRzIGFuZCBmdW5jdGlvbmFsaXR5LlxuICogUGlja2VyIHNob3VsZCBiZSBhZGRlZCBhcyBhIHR3by13YXkgYm91bmQgbmdNb2RlbCBpbnN0YW5jZSBgWyhwaWNrZXIpXT1cIlwiYCBpbiBvcmRlciB0byBoYXZlIHRoZSBwaWNrZXIgb3B0aW9uc1xuICogZHluYW1pY2FsbHkgcG9wdWxhdGUuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tcGlja2VyJyxcbiAgcHJvdmlkZXJzOiBbUElDS0VSX1ZBTFVFX0FDQ0VTU09SXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aSBjbGFzcz1cImJoaS1tb3JlXCIgKm5nSWY9XCJjb25maWc/LmVudGl0eUljb24gJiYgIV92YWx1ZVwiPjwvaT5cbiAgICA8aSBjbGFzcz1cImJoaS17eyBjb25maWc/LmVudGl0eUljb24gfX0gZW50aXR5LWljb24ge3sgY29uZmlnPy5lbnRpdHlJY29uIH19XCIgKm5nSWY9XCJjb25maWc/LmVudGl0eUljb24gJiYgX3ZhbHVlXCI+PC9pPlxuICAgIDxpbnB1dFxuICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgY2xhc3M9XCJwaWNrZXItaW5wdXRcIlxuICAgICAgWyhuZ01vZGVsKV09XCJ0ZXJtXCJcbiAgICAgIFtjbGFzcy5lbnRpdHktcGlja2VyXT1cImNvbmZpZz8uZW50aXR5SWNvblwiXG4gICAgICBbY2xhc3MuZW50aXR5LXNlbGVjdGVkXT1cImNvbmZpZz8uZW50aXR5SWNvbiAmJiBfdmFsdWVcIlxuICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwiY2hlY2tUZXJtKCRldmVudClcIlxuICAgICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICAgIChrZXlkb3duKT1cIm9uS2V5RG93bigkZXZlbnQpXCJcbiAgICAgIChmb2N1cyk9XCJvbkZvY3VzKCRldmVudClcIlxuICAgICAgKGNsaWNrKT1cIm9uRm9jdXMoJGV2ZW50KVwiXG4gICAgICAoYmx1cik9XCJvblRvdWNoZWQoJGV2ZW50KVwiXG4gICAgICBbbWF4bGVuZ3RoXT1cIm1heGxlbmd0aFwiXG4gICAgICBhdXRvY29tcGxldGU9XCJvZmZcIlxuICAgICAgI2lucHV0XG4gICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZVBpY2tlcklucHV0XCJcbiAgICAvPlxuICAgIDxpIGNsYXNzPVwiYmhpLXNlYXJjaFwiICpuZ0lmPVwiKCFfdmFsdWUgfHwgY2xlYXJWYWx1ZU9uU2VsZWN0KSAmJiAhZGlzYWJsZVBpY2tlcklucHV0XCI+PC9pPlxuICAgIDxpXG4gICAgICBjbGFzcz1cImJoaS10aW1lc1wiXG4gICAgICBbY2xhc3MuZW50aXR5LXNlbGVjdGVkXT1cImNvbmZpZz8uZW50aXR5SWNvbiAmJiBfdmFsdWVcIlxuICAgICAgKm5nSWY9XCJfdmFsdWUgJiYgIWNsZWFyVmFsdWVPblNlbGVjdCAmJiAhZGlzYWJsZVBpY2tlcklucHV0XCJcbiAgICAgIChjbGljayk9XCJjbGVhclZhbHVlKHRydWUpXCJcbiAgICA+PC9pPlxuICAgIDxub3ZvLW92ZXJsYXktdGVtcGxhdGUgY2xhc3M9XCJwaWNrZXItcmVzdWx0cy1jb250YWluZXJcIiBbcGFyZW50XT1cImVsZW1lbnRcIiBwb3NpdGlvbj1cImFib3ZlLWJlbG93XCIgKGNsb3NpbmcpPVwib25PdmVybGF5Q2xvc2VkKClcIj5cbiAgICAgIDxzcGFuICNyZXN1bHRzPjwvc3Bhbj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L25vdm8tb3ZlcmxheS10ZW1wbGF0ZT5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vUGlja2VyLnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1BpY2tlckVsZW1lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAvLyBDb250YWluZXIgZm9yIHRoZSByZXN1bHRzXG4gIEBWaWV3Q2hpbGQoJ3Jlc3VsdHMnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KVxuICByZXN1bHRzOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIEBJbnB1dCgpXG4gIGNvbmZpZzogYW55O1xuICBASW5wdXQoKVxuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICBASW5wdXQoKVxuICBjbGVhclZhbHVlT25TZWxlY3Q6IGJvb2xlYW47XG4gIEBJbnB1dCgpXG4gIGNsb3NlT25TZWxlY3Q6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKVxuICBzZWxlY3RlZDogQXJyYXk8YW55PiA9IFtdO1xuICAvLyBEZXByZWNhdGVkXG4gIEBJbnB1dCgpXG4gIGFwcGVuZFRvQm9keTogYm9vbGVhbiA9IGZhbHNlO1xuICAvLyBEZXByZWNhdGVkXG4gIEBJbnB1dCgpXG4gIHBhcmVudFNjcm9sbFNlbGVjdG9yOiBzdHJpbmc7XG4gIC8vIERlcHJlY2F0ZWRcbiAgQElucHV0KClcbiAgcGFyZW50U2Nyb2xsQWN0aW9uOiBzdHJpbmcgPSAnY2xvc2UnO1xuICAvLyBDdXN0b20gY2xhc3MgZm9yIHRoZSBkcm9wZG93biBjb250YWluZXJcbiAgQElucHV0KClcbiAgY29udGFpbmVyQ2xhc3M6IHN0cmluZztcbiAgLy8gU2lkZSB0aGUgZHJvcGRvd24gd2lsbCBvcGVuXG4gIEBJbnB1dCgpXG4gIHNpZGU6IHN0cmluZyA9ICdsZWZ0JztcbiAgLy8gQXV0b3NlbGVjdHMgdGhlIGZpcnN0IG9wdGlvbiBpbiB0aGUgcmVzdWx0c1xuICBASW5wdXQoKVxuICBhdXRvU2VsZWN0Rmlyc3RPcHRpb246IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKVxuICBvdmVycmlkZUVsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gIEBJbnB1dCgpXG4gIG1heGxlbmd0aDogbnVtYmVyO1xuICBASW5wdXQoKVxuICBhbGxvd0N1c3RvbVZhbHVlcyA9IGZhbHNlO1xuXG4gIC8vIERpc2FibGUgZnJvbSB0eXBpbmcgaW50byB0aGUgcGlja2VyIChyZXN1bHQgdGVtcGxhdGUgZG9lcyBldmVyeXRoaW5nKVxuICBASW5wdXQoKVxuICBzZXQgZGlzYWJsZVBpY2tlcklucHV0KHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlUGlja2VySW5wdXQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodik7XG4gIH1cblxuICBnZXQgZGlzYWJsZVBpY2tlcklucHV0KCkge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlUGlja2VySW5wdXQ7XG4gIH1cblxuICBwcml2YXRlIF9kaXNhYmxlUGlja2VySW5wdXQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvLyBFbWl0dGVyIGZvciBzZWxlY3RzXG4gIEBPdXRwdXQoKVxuICBjaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIHNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBmb2N1czogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBibHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIHR5cGluZzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQFZpZXdDaGlsZChOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50LCB7IHN0YXRpYzogdHJ1ZSB9KVxuICBwdWJsaWMgY29udGFpbmVyOiBOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50O1xuICBAVmlld0NoaWxkKCdpbnB1dCcsIHsgc3RhdGljOiB0cnVlIH0pXG4gIHB1YmxpYyBpbnB1dDogRWxlbWVudFJlZjtcblxuICB0ZXJtOiBzdHJpbmcgPSAnJztcbiAgcmVzdWx0c0NvbXBvbmVudDogYW55O1xuICBwb3B1cDogQ29tcG9uZW50UmVmPGFueT47XG4gIF92YWx1ZTogYW55O1xuICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSBjb21wb25lbnRVdGlsczogQ29tcG9uZW50VXRpbHMsIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5vdmVycmlkZUVsZW1lbnQpIHtcbiAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMub3ZlcnJpZGVFbGVtZW50O1xuICAgIH1cbiAgICBpZiAodGhpcy5hcHBlbmRUb0JvZHkpIHtcbiAgICAgIG5vdGlmeShgJ2FwcGVuZFRvQm9keScgaGFzIGJlZW4gZGVwcmVjYXRlZC4gUGxlYXNlIHJlbW92ZSB0aGlzIGF0dHJpYnV0ZS5gKTtcbiAgICB9XG4gICAgLy8gQ3VzdG9tIHJlc3VsdHMgdGVtcGxhdGVcbiAgICB0aGlzLnJlc3VsdHNDb21wb25lbnQgPSB0aGlzLmNvbmZpZy5yZXN1bHRzVGVtcGxhdGUgfHwgUGlja2VyUmVzdWx0cztcbiAgICAvLyBHZXQgYWxsIGRpc3RpbmN0IGtleSB1cCBldmVudHMgZnJvbSB0aGUgaW5wdXQgYW5kIG9ubHkgZmlyZSBpZiBsb25nIGVub3VnaCBhbmQgZGlzdGluY3RcbiAgICAvLyBsZXQgaW5wdXQgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xuICAgIGNvbnN0IHBhc3RlT2JzZXJ2ZXIgPSBmcm9tRXZlbnQodGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LCAncGFzdGUnKS5waXBlKGRlYm91bmNlVGltZSgyNTApLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgICBwYXN0ZU9ic2VydmVyLnN1YnNjcmliZShcbiAgICAgIChldmVudDogQ2xpcGJvYXJkRXZlbnQpID0+IHRoaXMub25EZWJvdW5jZWRLZXl1cChldmVudCksXG4gICAgICAoZXJyKSA9PiB0aGlzLmhpZGVSZXN1bHRzKGVyciksXG4gICAgKTtcbiAgICBjb25zdCBrZXlib2FyZE9ic2VydmVyID0gZnJvbUV2ZW50KHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudCwgJ2tleXVwJykucGlwZShkZWJvdW5jZVRpbWUoMjUwKSwgZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG4gICAga2V5Ym9hcmRPYnNlcnZlci5zdWJzY3JpYmUoXG4gICAgICAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHRoaXMub25EZWJvdW5jZWRLZXl1cChldmVudCksXG4gICAgICAoZXJyKSA9PiB0aGlzLmhpZGVSZXN1bHRzKGVyciksXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgb25EZWJvdW5jZWRLZXl1cChldmVudDogS2V5Ym9hcmRFdmVudCB8IENsaXBib2FyZEV2ZW50KSB7XG4gICAgaWYgKFtLZXkuRXNjYXBlLCBLZXkuQXJyb3dEb3duLCBLZXkuQXJyb3dVcCwgS2V5LkVudGVyLCBLZXkuVGFiXS5zb21lKChrZXkpID0+IGtleSA9PT0gKGV2ZW50IGFzIEtleWJvYXJkRXZlbnQpLmtleSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zaG93KChldmVudC50YXJnZXQgYXMgYW55KS52YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgb3BlblBhbmVsKCk6IHZvaWQge1xuICAgIHRoaXMuY29udGFpbmVyLm9wZW5QYW5lbCgpO1xuICB9XG5cbiAgcHVibGljIGNsb3NlUGFuZWwoKTogdm9pZCB7XG4gICAgdGhpcy5jb250YWluZXIuY2xvc2VQYW5lbCgpO1xuICB9XG5cbiAgcHVibGljIGdldCBwYW5lbE9wZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29udGFpbmVyICYmIHRoaXMuY29udGFpbmVyLnBhbmVsT3BlbjtcbiAgfVxuXG4gIHByaXZhdGUgc2hvdyh0ZXJtPzogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5vcGVuUGFuZWwoKTtcbiAgICAvLyBTaG93IHRoZSByZXN1bHRzIGluc2lkZVxuICAgIHRoaXMuc2hvd1Jlc3VsdHModGVybSk7XG4gIH1cblxuICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlUGlja2VySW5wdXQpIHtcbiAgICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMucGFuZWxPcGVuICYmICF0aGlzLmRpc2FibGVQaWNrZXJJbnB1dCkge1xuICAgICAgaWYgKGV2ZW50LmtleSA9PT0gS2V5LkVzY2FwZSB8fCBldmVudC5rZXkgPT09IEtleS5UYWIpIHtcbiAgICAgICAgdGhpcy5oaWRlUmVzdWx0cygpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChldmVudC5rZXkgPT09IEtleS5BcnJvd1VwKSB7XG4gICAgICAgIHRoaXMucG9wdXAuaW5zdGFuY2UucHJldkFjdGl2ZU1hdGNoKCk7XG4gICAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChldmVudC5rZXkgPT09IEtleS5BcnJvd0Rvd24pIHtcbiAgICAgICAgdGhpcy5wb3B1cC5pbnN0YW5jZS5uZXh0QWN0aXZlTWF0Y2goKTtcbiAgICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGV2ZW50LmtleSA9PT0gS2V5LkVudGVyKSB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZU1hdGNoID0gdGhpcy5wb3B1cC5pbnN0YW5jZS5hY3RpdmVNYXRjaDtcbiAgICAgICAgaWYgKCF0aGlzLnNlbGVjdGVkLmZpbmQoKHNlbGVjdGVkKSA9PiBhY3RpdmVNYXRjaCAmJiBhY3RpdmVNYXRjaC52YWx1ZSAmJiBzZWxlY3RlZC52YWx1ZSA9PT0gYWN0aXZlTWF0Y2gudmFsdWUpKSB7XG4gICAgICAgICAgdGhpcy5wb3B1cC5pbnN0YW5jZS5zZWxlY3RBY3RpdmVNYXRjaCgpO1xuICAgICAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKChldmVudC5rZXkgPT09IEtleS5CYWNrc3BhY2UgfHwgZXZlbnQua2V5ID09PSBLZXkuRGVsZXRlKSAmJiAhSGVscGVycy5pc0VtcHR5KHRoaXMuX3ZhbHVlKSAmJiAodGhpcy5fdmFsdWUgPT09IHRoaXMudGVybSkpIHtcbiAgICAgICAgdGhpcy5jbGVhclZhbHVlKGZhbHNlKTtcbiAgICAgICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gICAgICB9XG4gICAgICBpZiAoZXZlbnQua2V5ID09PSBLZXkuRGVsZXRlICYmIEhlbHBlcnMuaXNCbGFuayh0aGlzLl92YWx1ZSkpIHtcbiAgICAgICAgdGhpcy5jbGVhclZhbHVlKHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNsZWFyVmFsdWUod2lwZVRlcm0pIHtcbiAgICB0aGlzLl92YWx1ZSA9IG51bGw7XG4gICAgdGhpcy5zZWxlY3QuZW1pdCh0aGlzLl92YWx1ZSk7XG4gICAgdGhpcy5jaGFuZ2VkLmVtaXQoeyB2YWx1ZTogdGhpcy5fdmFsdWUsIHJhd1ZhbHVlOiB7IGxhYmVsOiAnJywgdmFsdWU6IHRoaXMuX3ZhbHVlIH0gfSk7XG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMuX3ZhbHVlKTtcblxuICAgIGlmICh3aXBlVGVybSkge1xuICAgICAgdGhpcy50ZXJtID0gJyc7XG4gICAgICB0aGlzLnBvcHVwLmluc3RhbmNlLmN1c3RvbVRleHRWYWx1ZSA9IG51bGw7XG4gICAgICB0aGlzLmhpZGVSZXN1bHRzKCk7XG4gICAgfVxuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBXaGVuIHRoZSBpbnB1dCdzIGZvY3VzIGV2ZW50IGlzIGNhbGxlZCB0aGlzIG1ldGhvZCBjYWxscyB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIHRoYXQgZGlzcGxheXMgdGhlXG4gICAqIHJlc3VsdHMuXG4gICAqL1xuICBvbkZvY3VzKGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLnBhbmVsT3Blbikge1xuICAgICAgdGhpcy5zaG93KCk7XG4gICAgfVxuICAgIHRoaXMuZm9jdXMuZW1pdChldmVudCk7XG4gIH1cblxuICAvLyBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIHRoZSByZXN1bHRzIChjYWxsZWQgcG9wdXApIGFuZCBhZGRzIGFsbCB0aGUgYmluZGluZ3MgdG8gdGhhdCBpbnN0YW5jZS5cbiAgc2hvd1Jlc3VsdHModGVybT86IGFueSkge1xuICAgIC8vIFVwZGF0ZSBNYXRjaGVzXG4gICAgaWYgKHRoaXMucG9wdXApIHtcbiAgICAgIC8vIFVwZGF0ZSBleGlzdGluZyBsaXN0IG9yIGNyZWF0ZSB0aGUgRE9NIGVsZW1lbnRcbiAgICAgIHRoaXMucG9wdXAuaW5zdGFuY2UuY29uZmlnID0gdGhpcy5jb25maWc7XG4gICAgICB0aGlzLnBvcHVwLmluc3RhbmNlLnRlcm0gPSB0aGlzLnRlcm07XG4gICAgICB0aGlzLnBvcHVwLmluc3RhbmNlLnNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZDtcbiAgICAgIHRoaXMucG9wdXAuaW5zdGFuY2UuYXV0b1NlbGVjdEZpcnN0T3B0aW9uID0gdGhpcy5hdXRvU2VsZWN0Rmlyc3RPcHRpb247XG4gICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wb3B1cCA9IHRoaXMuY29tcG9uZW50VXRpbHMuYXBwZW5kKHRoaXMucmVzdWx0c0NvbXBvbmVudCwgdGhpcy5yZXN1bHRzKTtcbiAgICAgIHRoaXMucG9wdXAuaW5zdGFuY2UucGFyZW50ID0gdGhpcztcbiAgICAgIHRoaXMucG9wdXAuaW5zdGFuY2UuY29uZmlnID0gdGhpcy5jb25maWc7XG4gICAgICB0aGlzLnBvcHVwLmluc3RhbmNlLnRlcm0gPSB0aGlzLnRlcm07XG4gICAgICB0aGlzLnBvcHVwLmluc3RhbmNlLnNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZDtcbiAgICAgIHRoaXMucG9wdXAuaW5zdGFuY2UuYXV0b1NlbGVjdEZpcnN0T3B0aW9uID0gdGhpcy5hdXRvU2VsZWN0Rmlyc3RPcHRpb247XG4gICAgICB0aGlzLnBvcHVwLmluc3RhbmNlLm92ZXJsYXkgPSB0aGlzLmNvbnRhaW5lci5vdmVybGF5UmVmO1xuICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gVGVsbHMgdGhlIG92ZXJsYXkgY29tcG9uZW50IHRvIGhpZGUgdGhlIHBpY2tlciByZXN1bHRzIGZyb20gdGhlIERPTSB3aXRob3V0IGRlbGV0aW5nIHRoZSBkeW5hbWljYWxseSBhbGxvY2F0ZWQgcG9wdXAgaW5zdGFuY2UgY3JlYXRlZCBpblxuICAvLyBzaG93UmVzdWx0cy4gVGhlIHBvcHVwIGluc3RhbmNlIHdpbGwgcmVtYWluIGluIG1lbW9yeSBmcm9tIHRoZSBmaXJzdCB0aW1lIHRoZSByZXN1bHRzIGFyZSBzaG93biB1bnRpbCB0aGlzIGNvbXBvbmVudCBpcyBkZXN0cm95ZWQuXG4gIGhpZGVSZXN1bHRzKGVycj86IGFueSkge1xuICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLy8gQ2xlYW5zIHVwIGxpc3RlbmVycyBmb3IgdGhlIHBvcHVwIC0gd2lsbCBnZXQgZXhlY3V0ZWQgbm8gbWF0dGVyIGhvdyB0aGUgcG9wdXAgaXMgY2xvc2VkLlxuICBvbk92ZXJsYXlDbG9zZWQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucG9wdXAgJiYgdGhpcy5wb3B1cC5pbnN0YW5jZSAmJiB0aGlzLnBvcHVwLmluc3RhbmNlLmNsZWFuVXApIHtcbiAgICAgIHRoaXMucG9wdXAuaW5zdGFuY2UuY2xlYW5VcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGdldCBhY2Nlc3NvclxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgLy8gc2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWUoc2VsZWN0ZWQpIHtcbiAgICBpZiAoIXNlbGVjdGVkKSB7XG4gICAgICB0aGlzLnRlcm0gPSAnJztcbiAgICAgIHRoaXMuX3ZhbHVlID0gbnVsbDtcbiAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLl92YWx1ZSk7XG4gICAgfSBlbHNlIGlmIChzZWxlY3RlZC52YWx1ZSAhPT0gdGhpcy5fdmFsdWUpIHtcbiAgICAgIHRoaXMudGVybSA9IHRoaXMuY2xlYXJWYWx1ZU9uU2VsZWN0ID8gJycgOiBzZWxlY3RlZC5sYWJlbDtcbiAgICAgIHRoaXMuX3ZhbHVlID0gc2VsZWN0ZWQudmFsdWU7XG4gICAgICB0aGlzLmNoYW5nZWQuZW1pdCh7IHZhbHVlOiBzZWxlY3RlZC52YWx1ZSwgcmF3VmFsdWU6IHsgbGFiZWw6IHRoaXMudGVybSwgdmFsdWU6IHNlbGVjdGVkLnZhbHVlIH0gfSk7XG4gICAgICB0aGlzLnNlbGVjdC5lbWl0KHNlbGVjdGVkKTtcbiAgICAgIHRoaXMub25Nb2RlbENoYW5nZShzZWxlY3RlZC52YWx1ZSk7XG4gICAgICBpZiAodGhpcy5wb3B1cCkge1xuICAgICAgICB0aGlzLnBvcHVwLmluc3RhbmNlLnNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50ZXJtID0gdGhpcy5jbGVhclZhbHVlT25TZWxlY3QgPyAnJyA6IHNlbGVjdGVkLmxhYmVsO1xuICAgICAgdGhpcy5jaGFuZ2VkLmVtaXQoeyB2YWx1ZTogc2VsZWN0ZWQudmFsdWUsIHJhd1ZhbHVlOiB7IGxhYmVsOiB0aGlzLnRlcm0sIHZhbHVlOiB0aGlzLl92YWx1ZSB9IH0pO1xuICAgICAgdGhpcy5zZWxlY3QuZW1pdChzZWxlY3RlZCk7XG4gICAgfVxuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLy8gTWFrZXMgc3VyZSB0byBjbGVhciB0aGUgbW9kZWwgaWYgdGhlIHVzZXIgY2xlYXJzIHRoZSB0ZXh0IGJveFxuICBjaGVja1Rlcm0oZXZlbnQpIHtcbiAgICB0aGlzLnR5cGluZy5lbWl0KGV2ZW50KTtcbiAgICBpZiAodGhpcy5hbGxvd0N1c3RvbVZhbHVlcykge1xuICAgICAgaWYgKHRoaXMudGVybSkge1xuICAgICAgICB0aGlzLnBvcHVwLmluc3RhbmNlLmN1c3RvbVRleHRWYWx1ZSA9IHsgbGFiZWw6IHRoaXMudGVybSwgdmFsdWU6IHRoaXMudGVybSB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBvcHVwLmluc3RhbmNlLmN1c3RvbVRleHRWYWx1ZSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICgoIWV2ZW50IHx8ICFldmVudC5sZW5ndGgpICYmICFIZWxwZXJzLmlzRW1wdHkodGhpcy5fdmFsdWUpKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IG51bGw7XG4gICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy5fdmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8vIFNldCB0b3VjaGVkIG9uIGJsdXJcbiAgb25Ub3VjaGVkKGV2ZW50PzogRXZlbnQpIHtcbiAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XG4gICAgdGhpcy5ibHVyLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHRoaXMuY2xlYXJWYWx1ZU9uU2VsZWN0KSB7XG4gICAgICB0aGlzLnRlcm0gPSAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgIXRoaXMuY29uZmlnLnVzZUdldExhYmVscykge1xuICAgICAgICB0aGlzLnRlcm0gPSB2YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUgJiYgdmFsdWUubGFiZWwpIHtcbiAgICAgICAgdGhpcy50ZXJtID0gdmFsdWUubGFiZWw7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlICYmIHZhbHVlLmZpcnN0TmFtZSkge1xuICAgICAgICB0aGlzLnRlcm0gPSBgJHt2YWx1ZS5maXJzdE5hbWV9ICR7dmFsdWUubGFzdE5hbWV9YDtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUgJiYgdmFsdWUubmFtZSkge1xuICAgICAgICB0aGlzLnRlcm0gPSB2YWx1ZS5uYW1lO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5jb25maWcuZ2V0TGFiZWxzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMuY29uZmlnLmdldExhYmVscyh2YWx1ZSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgdGhpcy50ZXJtID0gcmVzdWx0Lmxlbmd0aCA/IHJlc3VsdFswXS5sYWJlbCB8fCAnJyA6IHJlc3VsdC5sYWJlbCB8fCAnJztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50ZXJtID0gdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUgJiYgdmFsdWUudGl0bGUpIHtcbiAgICAgICAgdGhpcy50ZXJtID0gdmFsdWUudGl0bGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnRlcm0gPSB2YWx1ZSB8fCAnJztcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGRpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5fZGlzYWJsZVBpY2tlcklucHV0ID0gZGlzYWJsZWQ7XG4gIH1cbn1cbiJdfQ==
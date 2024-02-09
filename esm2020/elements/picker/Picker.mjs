var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild, ViewContainerRef, ViewEncapsulation, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NovoOverlayTemplateComponent } from 'novo-elements/elements/common';
import { ComponentUtils } from 'novo-elements/services';
import { BooleanInput, Helpers, notify } from 'novo-elements/utils';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PickerResults } from './extras/picker-results/PickerResults';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "novo-elements/elements/common";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
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
            if ((event.key === "Backspace" /* Backspace */ || event.key === "Delete" /* Delete */) && !Helpers.isEmpty(this._value) && (this._value === this.term)) {
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
NovoPickerElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPickerElement, deps: [{ token: i0.ElementRef }, { token: i1.ComponentUtils }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NovoPickerElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoPickerElement, selector: "novo-picker", inputs: { config: "config", placeholder: "placeholder", clearValueOnSelect: "clearValueOnSelect", closeOnSelect: "closeOnSelect", selected: "selected", appendToBody: "appendToBody", parentScrollSelector: "parentScrollSelector", parentScrollAction: "parentScrollAction", containerClass: "containerClass", side: "side", autoSelectFirstOption: "autoSelectFirstOption", overrideElement: "overrideElement", maxlength: "maxlength", allowCustomValues: "allowCustomValues", disablePickerInput: "disablePickerInput" }, outputs: { changed: "changed", select: "select", focus: "focus", blur: "blur", typing: "typing" }, providers: [PICKER_VALUE_ACCESSOR], viewQueries: [{ propertyName: "results", first: true, predicate: ["results"], descendants: true, read: ViewContainerRef, static: true }, { propertyName: "container", first: true, predicate: NovoOverlayTemplateComponent, descendants: true, static: true }, { propertyName: "input", first: true, predicate: ["input"], descendants: true, static: true }], ngImport: i0, template: `
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
  `, isInline: true, styles: ["novo-picker{width:100%;display:flex;align-items:center;flex-wrap:wrap;justify-content:flex-start;transition:all .2s ease-in-out;position:relative;padding-bottom:0}novo-picker.selected+i,novo-picker.selected:hover+i{color:#4a89dc}novo-picker.ng-touched.ng-invalid:not(.ng-pristine)>input,novo-picker.ng-touched.ng-invalid:not(.ng-pristine)>input:hover,novo-picker.ng-touched.ng-invalid:not(.ng-pristine)>input:focus{border-bottom-color:transparent!important}novo-picker input{font-size:1em;background:transparent!important;border:none;border-bottom:1px solid #afb9c0;border-radius:0;outline:none;height:2rem;width:100%;margin:0;padding:0;box-shadow:none;box-sizing:content-box;transition:all .3s;color:#26282b}novo-picker input:hover{border-bottom:1px solid #5f6d78}novo-picker input:focus{border-bottom:1px solid #4a89dc}novo-picker input:invalid{border-bottom:1px solid #da4453}novo-picker input.entity-picker{padding-left:2em}novo-picker input.entity-selected{padding-left:2.5em;background:#f7f7f7!important}novo-picker input:disabled{border-bottom:1px dashed #afb9c0!important}novo-picker i.bhi-more{position:absolute;left:0;top:2px;background:#f7f7f7;font-size:1em;border-radius:3px;padding:3px}novo-picker i.entity-icon{position:absolute;left:5px;top:3px;font-size:1em;border-radius:3px;padding:3px;color:#fff}novo-picker i.entity-icon.black{background:#000000}novo-picker i.entity-icon.white{background:#ffffff}novo-picker i.entity-icon.gray{background:#9e9e9e}novo-picker i.entity-icon.grey{background:#9e9e9e}novo-picker i.entity-icon.offWhite{background:#f7f7f7}novo-picker i.entity-icon.bright{background:#f7f7f7}novo-picker i.entity-icon.light{background:#dbdbdb}novo-picker i.entity-icon.neutral{background:#4f5361}novo-picker i.entity-icon.dark{background:#3d464d}novo-picker i.entity-icon.orange{background:#ff6900}novo-picker i.entity-icon.navigation{background:#202945}novo-picker i.entity-icon.skyBlue{background:#009bdf}novo-picker i.entity-icon.steel{background:#5b6770}novo-picker i.entity-icon.metal{background:#637893}novo-picker i.entity-icon.sand{background:#f4f4f4}novo-picker i.entity-icon.silver{background:#e2e2e2}novo-picker i.entity-icon.stone{background:#bebebe}novo-picker i.entity-icon.ash{background:#a0a0a0}novo-picker i.entity-icon.slate{background:#707070}novo-picker i.entity-icon.onyx{background:#526980}novo-picker i.entity-icon.charcoal{background:#282828}novo-picker i.entity-icon.moonlight{background:#1a242f}novo-picker i.entity-icon.midnight{background:#202945}novo-picker i.entity-icon.darkness{background:#161f27}novo-picker i.entity-icon.navy{background:#0d2d42}novo-picker i.entity-icon.aqua{background:#3bafda}novo-picker i.entity-icon.ocean{background:#4a89dc}novo-picker i.entity-icon.mint{background:#37bc9b}novo-picker i.entity-icon.grass{background:#8cc152}novo-picker i.entity-icon.sunflower{background:#f6b042}novo-picker i.entity-icon.bittersweet{background:#eb6845}novo-picker i.entity-icon.grapefruit{background:#da4453}novo-picker i.entity-icon.carnation{background:#d770ad}novo-picker i.entity-icon.lavender{background:#967adc}novo-picker i.entity-icon.mountain{background:#9678b6}novo-picker i.entity-icon.info{background:#4a89dc}novo-picker i.entity-icon.positive{background:#4a89dc}novo-picker i.entity-icon.success{background:#8cc152}novo-picker i.entity-icon.negative{background:#da4453}novo-picker i.entity-icon.danger{background:#da4453}novo-picker i.entity-icon.error{background:#da4453}novo-picker i.entity-icon.warning{background:#f6b042}novo-picker i.entity-icon.empty{background:#cccdcc}novo-picker i.entity-icon.disabled{background:#bebebe}novo-picker i.entity-icon.background{background:#f7f7f7}novo-picker i.entity-icon.backgroundDark{background:#e2e2e2}novo-picker i.entity-icon.presentation{background:#5b6770}novo-picker i.entity-icon.bullhorn{background:#ff6900}novo-picker i.entity-icon.pulse{background:#3bafda}novo-picker i.entity-icon.company{background:#3399dd}novo-picker i.entity-icon.candidate{background:#44bb77}novo-picker i.entity-icon.lead{background:#aa6699}novo-picker i.entity-icon.contact{background:#ffaa44}novo-picker i.entity-icon.clientcontact{background:#ffaa44}novo-picker i.entity-icon.opportunity{background:#662255}novo-picker i.entity-icon.job{background:#bb5566}novo-picker i.entity-icon.joborder{background:#bb5566}novo-picker i.entity-icon.submission{background:#a9adbb}novo-picker i.entity-icon.sendout{background:#747884}novo-picker i.entity-icon.placement{background:#0b344f}novo-picker i.entity-icon.note{background:#747884}novo-picker i.entity-icon.contract{background:#454ea0}novo-picker i.entity-icon.jobCode{background:#696d79}novo-picker i.entity-icon.earnCode{background:#696d79}novo-picker i.entity-icon.invoiceStatement{background:#696d79}novo-picker i.entity-icon.billableCharge{background:#696d79}novo-picker i.entity-icon.payableCharge{background:#696d79}novo-picker i.entity-icon.user{background:#696d79}novo-picker i.entity-icon.corporateUser{background:#696d79}novo-picker i.entity-icon.distributionList{background:#696d79}novo-picker i.entity-icon.credential{background:#696d79}novo-picker i.entity-icon.person{background:#696d79}novo-picker i.bhi-search,novo-picker i.bhi-times{position:absolute;right:0;color:#3d464d}novo-picker i.bhi-search.entity-selected,novo-picker i.bhi-times.entity-selected{right:5px}novo-picker i.bhi-search{top:0px;font-size:1.2rem}novo-picker i.bhi-times{top:0px;cursor:pointer;font-size:1.2rem}\n"], components: [{ type: i2.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "width", "height", "closeOnSelect", "hasBackdrop", "parent"], outputs: ["select", "opening", "closing"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i4.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }], encapsulation: i0.ViewEncapsulation.None });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoPickerElement.prototype, "clearValueOnSelect", void 0);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoPickerElement.prototype, "appendToBody", void 0);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoPickerElement.prototype, "autoSelectFirstOption", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPickerElement, decorators: [{
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
  `, encapsulation: ViewEncapsulation.None, styles: ["novo-picker{width:100%;display:flex;align-items:center;flex-wrap:wrap;justify-content:flex-start;transition:all .2s ease-in-out;position:relative;padding-bottom:0}novo-picker.selected+i,novo-picker.selected:hover+i{color:#4a89dc}novo-picker.ng-touched.ng-invalid:not(.ng-pristine)>input,novo-picker.ng-touched.ng-invalid:not(.ng-pristine)>input:hover,novo-picker.ng-touched.ng-invalid:not(.ng-pristine)>input:focus{border-bottom-color:transparent!important}novo-picker input{font-size:1em;background:transparent!important;border:none;border-bottom:1px solid #afb9c0;border-radius:0;outline:none;height:2rem;width:100%;margin:0;padding:0;box-shadow:none;box-sizing:content-box;transition:all .3s;color:#26282b}novo-picker input:hover{border-bottom:1px solid #5f6d78}novo-picker input:focus{border-bottom:1px solid #4a89dc}novo-picker input:invalid{border-bottom:1px solid #da4453}novo-picker input.entity-picker{padding-left:2em}novo-picker input.entity-selected{padding-left:2.5em;background:#f7f7f7!important}novo-picker input:disabled{border-bottom:1px dashed #afb9c0!important}novo-picker i.bhi-more{position:absolute;left:0;top:2px;background:#f7f7f7;font-size:1em;border-radius:3px;padding:3px}novo-picker i.entity-icon{position:absolute;left:5px;top:3px;font-size:1em;border-radius:3px;padding:3px;color:#fff}novo-picker i.entity-icon.black{background:#000000}novo-picker i.entity-icon.white{background:#ffffff}novo-picker i.entity-icon.gray{background:#9e9e9e}novo-picker i.entity-icon.grey{background:#9e9e9e}novo-picker i.entity-icon.offWhite{background:#f7f7f7}novo-picker i.entity-icon.bright{background:#f7f7f7}novo-picker i.entity-icon.light{background:#dbdbdb}novo-picker i.entity-icon.neutral{background:#4f5361}novo-picker i.entity-icon.dark{background:#3d464d}novo-picker i.entity-icon.orange{background:#ff6900}novo-picker i.entity-icon.navigation{background:#202945}novo-picker i.entity-icon.skyBlue{background:#009bdf}novo-picker i.entity-icon.steel{background:#5b6770}novo-picker i.entity-icon.metal{background:#637893}novo-picker i.entity-icon.sand{background:#f4f4f4}novo-picker i.entity-icon.silver{background:#e2e2e2}novo-picker i.entity-icon.stone{background:#bebebe}novo-picker i.entity-icon.ash{background:#a0a0a0}novo-picker i.entity-icon.slate{background:#707070}novo-picker i.entity-icon.onyx{background:#526980}novo-picker i.entity-icon.charcoal{background:#282828}novo-picker i.entity-icon.moonlight{background:#1a242f}novo-picker i.entity-icon.midnight{background:#202945}novo-picker i.entity-icon.darkness{background:#161f27}novo-picker i.entity-icon.navy{background:#0d2d42}novo-picker i.entity-icon.aqua{background:#3bafda}novo-picker i.entity-icon.ocean{background:#4a89dc}novo-picker i.entity-icon.mint{background:#37bc9b}novo-picker i.entity-icon.grass{background:#8cc152}novo-picker i.entity-icon.sunflower{background:#f6b042}novo-picker i.entity-icon.bittersweet{background:#eb6845}novo-picker i.entity-icon.grapefruit{background:#da4453}novo-picker i.entity-icon.carnation{background:#d770ad}novo-picker i.entity-icon.lavender{background:#967adc}novo-picker i.entity-icon.mountain{background:#9678b6}novo-picker i.entity-icon.info{background:#4a89dc}novo-picker i.entity-icon.positive{background:#4a89dc}novo-picker i.entity-icon.success{background:#8cc152}novo-picker i.entity-icon.negative{background:#da4453}novo-picker i.entity-icon.danger{background:#da4453}novo-picker i.entity-icon.error{background:#da4453}novo-picker i.entity-icon.warning{background:#f6b042}novo-picker i.entity-icon.empty{background:#cccdcc}novo-picker i.entity-icon.disabled{background:#bebebe}novo-picker i.entity-icon.background{background:#f7f7f7}novo-picker i.entity-icon.backgroundDark{background:#e2e2e2}novo-picker i.entity-icon.presentation{background:#5b6770}novo-picker i.entity-icon.bullhorn{background:#ff6900}novo-picker i.entity-icon.pulse{background:#3bafda}novo-picker i.entity-icon.company{background:#3399dd}novo-picker i.entity-icon.candidate{background:#44bb77}novo-picker i.entity-icon.lead{background:#aa6699}novo-picker i.entity-icon.contact{background:#ffaa44}novo-picker i.entity-icon.clientcontact{background:#ffaa44}novo-picker i.entity-icon.opportunity{background:#662255}novo-picker i.entity-icon.job{background:#bb5566}novo-picker i.entity-icon.joborder{background:#bb5566}novo-picker i.entity-icon.submission{background:#a9adbb}novo-picker i.entity-icon.sendout{background:#747884}novo-picker i.entity-icon.placement{background:#0b344f}novo-picker i.entity-icon.note{background:#747884}novo-picker i.entity-icon.contract{background:#454ea0}novo-picker i.entity-icon.jobCode{background:#696d79}novo-picker i.entity-icon.earnCode{background:#696d79}novo-picker i.entity-icon.invoiceStatement{background:#696d79}novo-picker i.entity-icon.billableCharge{background:#696d79}novo-picker i.entity-icon.payableCharge{background:#696d79}novo-picker i.entity-icon.user{background:#696d79}novo-picker i.entity-icon.corporateUser{background:#696d79}novo-picker i.entity-icon.distributionList{background:#696d79}novo-picker i.entity-icon.credential{background:#696d79}novo-picker i.entity-icon.person{background:#696d79}novo-picker i.bhi-search,novo-picker i.bhi-times{position:absolute;right:0;color:#3d464d}novo-picker i.bhi-search.entity-selected,novo-picker i.bhi-times.entity-selected{right:5px}novo-picker i.bhi-search{top:0px;font-size:1.2rem}novo-picker i.bhi-times{top:0px;cursor:pointer;font-size:1.2rem}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGlja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvcGlja2VyL1BpY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFFVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBRUwsTUFBTSxFQUNOLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzdFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsWUFBWSxFQUFzQixPQUFPLEVBQU8sTUFBTSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDN0YsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNqQyxPQUFPLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVDQUF1QyxDQUFDOzs7Ozs7QUFFdEUsc0RBQXNEO0FBQ3RELE1BQU0scUJBQXFCLEdBQUc7SUFDNUIsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDO0lBQ2hELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQUVGOzs7OztHQUtHO0FBdUNILE1BQU0sT0FBTyxpQkFBaUI7SUFtRjVCLFlBQW1CLE9BQW1CLEVBQVUsY0FBOEIsRUFBVSxHQUFzQjtRQUEzRixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFyRTlHLGtCQUFhLEdBQVksSUFBSSxDQUFDO1FBRTlCLGFBQVEsR0FBZSxFQUFFLENBQUM7UUFDMUIsYUFBYTtRQUdiLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBSzlCLGFBQWE7UUFFYix1QkFBa0IsR0FBVyxPQUFPLENBQUM7UUFJckMsOEJBQThCO1FBRTlCLFNBQUksR0FBVyxNQUFNLENBQUM7UUFDdEIsOENBQThDO1FBRzlDLDBCQUFxQixHQUFZLElBQUksQ0FBQztRQU90QyxzQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFZbEIsd0JBQW1CLEdBQVksS0FBSyxDQUFDO1FBRzdDLHNCQUFzQjtRQUV0QixZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFaEQsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRS9DLFVBQUssR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU5QyxTQUFJLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFN0MsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBTy9DLFNBQUksR0FBVyxFQUFFLENBQUM7UUFJbEIsa0JBQWEsR0FBYSxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7UUFDbkMsbUJBQWMsR0FBYSxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7SUFFNkUsQ0FBQztJQXJDbEgsd0VBQXdFO0lBQ3hFLElBQ0ksa0JBQWtCLENBQUMsQ0FBVTtRQUMvQixJQUFJLENBQUMsbUJBQW1CLEdBQUcscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELElBQUksa0JBQWtCO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDO0lBQ2xDLENBQUM7SUErQkQsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7U0FDckM7UUFDRCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsTUFBTSxDQUFDLG1FQUFtRSxDQUFDLENBQUM7U0FDN0U7UUFDRCwwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxJQUFJLGFBQWEsQ0FBQztRQUNyRSwwRkFBMEY7UUFDMUYsaUVBQWlFO1FBQ2pFLE1BQU0sYUFBYSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQztRQUNuSCxhQUFhLENBQUMsU0FBUyxDQUNyQixDQUFDLEtBQXFCLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsRUFDdkQsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQy9CLENBQUM7UUFDRixNQUFNLGdCQUFnQixHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQztRQUN0SCxnQkFBZ0IsQ0FBQyxTQUFTLENBQ3hCLENBQUMsS0FBb0IsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxFQUN0RCxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FDL0IsQ0FBQztJQUNKLENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxLQUFxQztRQUM1RCxJQUFJLG1IQUE0RCxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxLQUFNLEtBQXVCLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDcEgsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBRSxLQUFLLENBQUMsTUFBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFTSxTQUFTO1FBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRU0sVUFBVTtRQUNmLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELElBQVcsU0FBUztRQUNsQixPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7SUFDcEQsQ0FBQztJQUVPLElBQUksQ0FBQyxJQUFhO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQiwwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQW9CO1FBQzVCLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQzNCLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUIsT0FBTztTQUNSO1FBQ0QsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQzlDLElBQUksS0FBSyxDQUFDLEdBQUcsMEJBQWUsSUFBSSxLQUFLLENBQUMsR0FBRyxvQkFBWSxFQUFFO2dCQUNyRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ25CLE9BQU87YUFDUjtZQUVELElBQUksS0FBSyxDQUFDLEdBQUcsNEJBQWdCLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN0QyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUN4QixPQUFPO2FBQ1I7WUFFRCxJQUFJLEtBQUssQ0FBQyxHQUFHLGdDQUFrQixFQUFFO2dCQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDdEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDeEIsT0FBTzthQUNSO1lBRUQsSUFBSSxLQUFLLENBQUMsR0FBRyx3QkFBYyxFQUFFO2dCQUMzQixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUM7Z0JBQ3BELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsV0FBVyxJQUFJLFdBQVcsQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDLEtBQUssS0FBSyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQy9HLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLENBQUM7b0JBQ3hDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7aUJBQ3pCO2dCQUNELE9BQU87YUFDUjtZQUVELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxnQ0FBa0IsSUFBSSxLQUFLLENBQUMsR0FBRywwQkFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM3SCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN2QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7YUFDbkI7WUFDRCxJQUFJLEtBQUssQ0FBQyxHQUFHLDBCQUFlLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQzVELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdkI7U0FDRjtJQUNILENBQUM7SUFFRCxVQUFVLENBQUMsUUFBUTtRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZGLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRWhDLElBQUksUUFBUSxFQUFFO1lBQ1osSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7WUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1lBQzNDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNwQjtRQUNELElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVEOzs7T0FHRztJQUNILE9BQU8sQ0FBQyxLQUFLO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbkIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2I7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQsZ0dBQWdHO0lBQ2hHLFdBQVcsQ0FBQyxJQUFVO1FBQ3BCLGlCQUFpQjtRQUNqQixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxpREFBaUQ7WUFDakQsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDekMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDckMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDN0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDO1lBQ3ZFLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDekI7YUFBTTtZQUNMLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM3RSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQzdDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztZQUN2RSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7WUFDeEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN6QjtJQUNILENBQUM7SUFFRCwySUFBMkk7SUFDM0kscUlBQXFJO0lBQ3JJLFdBQVcsQ0FBQyxHQUFTO1FBQ25CLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCwyRkFBMkY7SUFDM0YsZUFBZTtRQUNiLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUU7WUFDcEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDL0I7SUFDSCxDQUFDO0lBRUQsZUFBZTtJQUNmLElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRUQsb0RBQW9EO0lBQ3BELElBQUksS0FBSyxDQUFDLFFBQVE7UUFDaEIsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNiLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDakM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUN6QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1lBQzFELElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztZQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3BHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25DLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUM5QztTQUNGO2FBQU07WUFDTCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1lBQzFELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDakcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDNUI7UUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxnRUFBZ0U7SUFDaEUsU0FBUyxDQUFDLEtBQUs7UUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUMxQixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsZUFBZSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQTthQUM3RTtpQkFBTTtnQkFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO2FBQzVDO1NBQ0Y7UUFDRCxJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUM5RCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNqQztRQUNELElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELHNCQUFzQjtJQUN0QixTQUFTLENBQUMsS0FBYTtRQUNyQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELHNDQUFzQztJQUN0QyxVQUFVLENBQUMsS0FBVTtRQUNuQixJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUMzQixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztTQUNoQjthQUFNO1lBQ0wsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRTtnQkFDMUQsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7YUFDbkI7aUJBQU0sSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRTtnQkFDL0IsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO2FBQ3pCO2lCQUFNLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxTQUFTLEVBQUU7Z0JBQ25DLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsU0FBUyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNwRDtpQkFBTSxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFO2dCQUM5QixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7YUFDeEI7aUJBQU0sSUFBSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxLQUFLLFVBQVUsRUFBRTtnQkFDdEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7b0JBQzNDLElBQUksTUFBTSxFQUFFO3dCQUNWLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO3FCQUN4RTt5QkFBTTt3QkFDTCxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztxQkFDbkI7b0JBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDMUIsQ0FBQyxDQUFDLENBQUM7YUFDSjtpQkFBTSxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFO2dCQUMvQixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7YUFDekI7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDO2FBQ3pCO1NBQ0Y7UUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxFQUFZO1FBQzNCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxFQUFZO1FBQzVCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxRQUFpQjtRQUNoQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsUUFBUSxDQUFDO0lBQ3RDLENBQUM7OytHQXpVVSxpQkFBaUI7bUdBQWpCLGlCQUFpQix1b0JBcENqQixDQUFDLHFCQUFxQixDQUFDLHlHQXNDSixnQkFBZ0IsdUVBcUVuQyw0QkFBNEIsNkpBMUc3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQStCVDtBQWVEO0lBREMsWUFBWSxFQUFFOzs2REFDYTtBQVM1QjtJQURDLFlBQVksRUFBRTs7dURBQ2U7QUFpQjlCO0lBREMsWUFBWSxFQUFFOztnRUFDdUI7NEZBckMzQixpQkFBaUI7a0JBdEM3QixTQUFTOytCQUNFLGFBQWEsYUFDWixDQUFDLHFCQUFxQixDQUFDLFlBQ3hCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0JULGlCQUVjLGlCQUFpQixDQUFDLElBQUk7OEpBS3JDLE9BQU87c0JBRE4sU0FBUzt1QkFBQyxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFJOUQsTUFBTTtzQkFETCxLQUFLO2dCQUdOLFdBQVc7c0JBRFYsS0FBSztnQkFJTixrQkFBa0I7c0JBRmpCLEtBQUs7Z0JBS04sYUFBYTtzQkFEWixLQUFLO2dCQUdOLFFBQVE7c0JBRFAsS0FBSztnQkFLTixZQUFZO3NCQUZYLEtBQUs7Z0JBTU4sb0JBQW9CO3NCQURuQixLQUFLO2dCQUlOLGtCQUFrQjtzQkFEakIsS0FBSztnQkFJTixjQUFjO3NCQURiLEtBQUs7Z0JBSU4sSUFBSTtzQkFESCxLQUFLO2dCQUtOLHFCQUFxQjtzQkFGcEIsS0FBSztnQkFLTixlQUFlO3NCQURkLEtBQUs7Z0JBR04sU0FBUztzQkFEUixLQUFLO2dCQUdOLGlCQUFpQjtzQkFEaEIsS0FBSztnQkFLRixrQkFBa0I7c0JBRHJCLEtBQUs7Z0JBY04sT0FBTztzQkFETixNQUFNO2dCQUdQLE1BQU07c0JBREwsTUFBTTtnQkFHUCxLQUFLO3NCQURKLE1BQU07Z0JBR1AsSUFBSTtzQkFESCxNQUFNO2dCQUdQLE1BQU07c0JBREwsTUFBTTtnQkFJQSxTQUFTO3NCQURmLFNBQVM7dUJBQUMsNEJBQTRCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQUdsRCxLQUFLO3NCQURYLFNBQVM7dUJBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb21wb25lbnRSZWYsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudCB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvY29tbW9uJztcbmltcG9ydCB7IENvbXBvbmVudFV0aWxzIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIEJvb2xlYW5JbnB1dEFjY2VwdCwgSGVscGVycywgS2V5LCBub3RpZnkgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcbmltcG9ydCB7IGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFBpY2tlclJlc3VsdHMgfSBmcm9tICcuL2V4dHJhcy9waWNrZXItcmVzdWx0cy9QaWNrZXJSZXN1bHRzJztcblxuLy8gVmFsdWUgYWNjZXNzb3IgZm9yIHRoZSBjb21wb25lbnQgKHN1cHBvcnRzIG5nTW9kZWwpXG5jb25zdCBQSUNLRVJfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOb3ZvUGlja2VyRWxlbWVudCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuLyoqXG4gKiBAZGVzY3JpcHRpb24gVGhpcyBjbGFzcyBpcyB0aGUgZGlyZWN0aXZlIGRlZmluaXRpb24gb2YgdGhlIFBpY2tlci4gSWYgeW91IGFkZCBhbmQgYXR0cmlidXRlIG9mIGBwaWNrZXJgIHRvIGFuIGlucHV0LFxuICogaXQgd2lsbCBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIHBpY2tlciB3aGljaCB3cmFwcyB0aGUgaW5wdXQgaW4gYWxsIG9mIHRoZSBwaWNrZXIgSFRNTCBlbGVtZW50cyBhbmQgZnVuY3Rpb25hbGl0eS5cbiAqIFBpY2tlciBzaG91bGQgYmUgYWRkZWQgYXMgYSB0d28td2F5IGJvdW5kIG5nTW9kZWwgaW5zdGFuY2UgYFsocGlja2VyKV09XCJcImAgaW4gb3JkZXIgdG8gaGF2ZSB0aGUgcGlja2VyIG9wdGlvbnNcbiAqIGR5bmFtaWNhbGx5IHBvcHVsYXRlLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXBpY2tlcicsXG4gIHByb3ZpZGVyczogW1BJQ0tFUl9WQUxVRV9BQ0NFU1NPUl0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGkgY2xhc3M9XCJiaGktbW9yZVwiICpuZ0lmPVwiY29uZmlnPy5lbnRpdHlJY29uICYmICFfdmFsdWVcIj48L2k+XG4gICAgPGkgY2xhc3M9XCJiaGkte3sgY29uZmlnPy5lbnRpdHlJY29uIH19IGVudGl0eS1pY29uIHt7IGNvbmZpZz8uZW50aXR5SWNvbiB9fVwiICpuZ0lmPVwiY29uZmlnPy5lbnRpdHlJY29uICYmIF92YWx1ZVwiPjwvaT5cbiAgICA8aW5wdXRcbiAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgIGNsYXNzPVwicGlja2VyLWlucHV0XCJcbiAgICAgIFsobmdNb2RlbCldPVwidGVybVwiXG4gICAgICBbY2xhc3MuZW50aXR5LXBpY2tlcl09XCJjb25maWc/LmVudGl0eUljb25cIlxuICAgICAgW2NsYXNzLmVudGl0eS1zZWxlY3RlZF09XCJjb25maWc/LmVudGl0eUljb24gJiYgX3ZhbHVlXCJcbiAgICAgIChuZ01vZGVsQ2hhbmdlKT1cImNoZWNrVGVybSgkZXZlbnQpXCJcbiAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gICAgICAoa2V5ZG93bik9XCJvbktleURvd24oJGV2ZW50KVwiXG4gICAgICAoZm9jdXMpPVwib25Gb2N1cygkZXZlbnQpXCJcbiAgICAgIChjbGljayk9XCJvbkZvY3VzKCRldmVudClcIlxuICAgICAgKGJsdXIpPVwib25Ub3VjaGVkKCRldmVudClcIlxuICAgICAgW21heGxlbmd0aF09XCJtYXhsZW5ndGhcIlxuICAgICAgYXV0b2NvbXBsZXRlPVwib2ZmXCJcbiAgICAgICNpbnB1dFxuICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVQaWNrZXJJbnB1dFwiXG4gICAgLz5cbiAgICA8aSBjbGFzcz1cImJoaS1zZWFyY2hcIiAqbmdJZj1cIighX3ZhbHVlIHx8IGNsZWFyVmFsdWVPblNlbGVjdCkgJiYgIWRpc2FibGVQaWNrZXJJbnB1dFwiPjwvaT5cbiAgICA8aVxuICAgICAgY2xhc3M9XCJiaGktdGltZXNcIlxuICAgICAgW2NsYXNzLmVudGl0eS1zZWxlY3RlZF09XCJjb25maWc/LmVudGl0eUljb24gJiYgX3ZhbHVlXCJcbiAgICAgICpuZ0lmPVwiX3ZhbHVlICYmICFjbGVhclZhbHVlT25TZWxlY3QgJiYgIWRpc2FibGVQaWNrZXJJbnB1dFwiXG4gICAgICAoY2xpY2spPVwiY2xlYXJWYWx1ZSh0cnVlKVwiXG4gICAgPjwvaT5cbiAgICA8bm92by1vdmVybGF5LXRlbXBsYXRlIGNsYXNzPVwicGlja2VyLXJlc3VsdHMtY29udGFpbmVyXCIgW3BhcmVudF09XCJlbGVtZW50XCIgcG9zaXRpb249XCJhYm92ZS1iZWxvd1wiIChjbG9zaW5nKT1cIm9uT3ZlcmxheUNsb3NlZCgpXCI+XG4gICAgICA8c3BhbiAjcmVzdWx0cz48L3NwYW4+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9ub3ZvLW92ZXJsYXktdGVtcGxhdGU+XG4gIGAsXG4gIHN0eWxlVXJsczogWycuL1BpY2tlci5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9QaWNrZXJFbGVtZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgLy8gQ29udGFpbmVyIGZvciB0aGUgcmVzdWx0c1xuICBAVmlld0NoaWxkKCdyZXN1bHRzJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWUgfSlcbiAgcmVzdWx0czogVmlld0NvbnRhaW5lclJlZjtcblxuICBASW5wdXQoKVxuICBjb25maWc6IGFueTtcbiAgQElucHV0KClcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIGNsZWFyVmFsdWVPblNlbGVjdDogYm9vbGVhbjtcbiAgc3RhdGljIHJlYWRvbmx5IG5nQWNjZXB0SW5wdXRUeXBlX2NsZWFyVmFsdWVPblNlbGVjdDogQm9vbGVhbklucHV0QWNjZXB0O1xuICBASW5wdXQoKVxuICBjbG9zZU9uU2VsZWN0OiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KClcbiAgc2VsZWN0ZWQ6IEFycmF5PGFueT4gPSBbXTtcbiAgLy8gRGVwcmVjYXRlZFxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgYXBwZW5kVG9Cb2R5OiBib29sZWFuID0gZmFsc2U7XG4gIHN0YXRpYyByZWFkb25seSBuZ0FjY2VwdElucHV0VHlwZV9hcHBlbmRUb0JvZHk6IEJvb2xlYW5JbnB1dEFjY2VwdDtcbiAgLy8gRGVwcmVjYXRlZFxuICBASW5wdXQoKVxuICBwYXJlbnRTY3JvbGxTZWxlY3Rvcjogc3RyaW5nO1xuICAvLyBEZXByZWNhdGVkXG4gIEBJbnB1dCgpXG4gIHBhcmVudFNjcm9sbEFjdGlvbjogc3RyaW5nID0gJ2Nsb3NlJztcbiAgLy8gQ3VzdG9tIGNsYXNzIGZvciB0aGUgZHJvcGRvd24gY29udGFpbmVyXG4gIEBJbnB1dCgpXG4gIGNvbnRhaW5lckNsYXNzOiBzdHJpbmc7XG4gIC8vIFNpZGUgdGhlIGRyb3Bkb3duIHdpbGwgb3BlblxuICBASW5wdXQoKVxuICBzaWRlOiBzdHJpbmcgPSAnbGVmdCc7XG4gIC8vIEF1dG9zZWxlY3RzIHRoZSBmaXJzdCBvcHRpb24gaW4gdGhlIHJlc3VsdHNcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIGF1dG9TZWxlY3RGaXJzdE9wdGlvbjogYm9vbGVhbiA9IHRydWU7XG4gIHN0YXRpYyByZWFkb25seSBuZ0FjY2VwdElucHV0VHlwZV9hdXRvU2VsZWN0Rmlyc3RPcHRpb246IEJvb2xlYW5JbnB1dEFjY2VwdDtcbiAgQElucHV0KClcbiAgb3ZlcnJpZGVFbGVtZW50OiBFbGVtZW50UmVmO1xuICBASW5wdXQoKVxuICBtYXhsZW5ndGg6IG51bWJlcjtcbiAgQElucHV0KClcbiAgYWxsb3dDdXN0b21WYWx1ZXMgPSBmYWxzZTtcblxuICAvLyBEaXNhYmxlIGZyb20gdHlwaW5nIGludG8gdGhlIHBpY2tlciAocmVzdWx0IHRlbXBsYXRlIGRvZXMgZXZlcnl0aGluZylcbiAgQElucHV0KClcbiAgc2V0IGRpc2FibGVQaWNrZXJJbnB1dCh2OiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZVBpY2tlcklucHV0ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHYpO1xuICB9XG5cbiAgZ2V0IGRpc2FibGVQaWNrZXJJbnB1dCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZVBpY2tlcklucHV0O1xuICB9XG5cbiAgcHJpdmF0ZSBfZGlzYWJsZVBpY2tlcklucHV0OiBib29sZWFuID0gZmFsc2U7XG4gIHN0YXRpYyByZWFkb25seSBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlUGlja2VySW5wdXQ6IEJvb2xlYW5JbnB1dEFjY2VwdDtcblxuICAvLyBFbWl0dGVyIGZvciBzZWxlY3RzXG4gIEBPdXRwdXQoKVxuICBjaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIHNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBmb2N1czogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBibHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIHR5cGluZzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQFZpZXdDaGlsZChOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50LCB7IHN0YXRpYzogdHJ1ZSB9KVxuICBwdWJsaWMgY29udGFpbmVyOiBOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50O1xuICBAVmlld0NoaWxkKCdpbnB1dCcsIHsgc3RhdGljOiB0cnVlIH0pXG4gIHB1YmxpYyBpbnB1dDogRWxlbWVudFJlZjtcblxuICB0ZXJtOiBzdHJpbmcgPSAnJztcbiAgcmVzdWx0c0NvbXBvbmVudDogYW55O1xuICBwb3B1cDogQ29tcG9uZW50UmVmPGFueT47XG4gIF92YWx1ZTogYW55O1xuICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSBjb21wb25lbnRVdGlsczogQ29tcG9uZW50VXRpbHMsIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5vdmVycmlkZUVsZW1lbnQpIHtcbiAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMub3ZlcnJpZGVFbGVtZW50O1xuICAgIH1cbiAgICBpZiAodGhpcy5hcHBlbmRUb0JvZHkpIHtcbiAgICAgIG5vdGlmeShgJ2FwcGVuZFRvQm9keScgaGFzIGJlZW4gZGVwcmVjYXRlZC4gUGxlYXNlIHJlbW92ZSB0aGlzIGF0dHJpYnV0ZS5gKTtcbiAgICB9XG4gICAgLy8gQ3VzdG9tIHJlc3VsdHMgdGVtcGxhdGVcbiAgICB0aGlzLnJlc3VsdHNDb21wb25lbnQgPSB0aGlzLmNvbmZpZy5yZXN1bHRzVGVtcGxhdGUgfHwgUGlja2VyUmVzdWx0cztcbiAgICAvLyBHZXQgYWxsIGRpc3RpbmN0IGtleSB1cCBldmVudHMgZnJvbSB0aGUgaW5wdXQgYW5kIG9ubHkgZmlyZSBpZiBsb25nIGVub3VnaCBhbmQgZGlzdGluY3RcbiAgICAvLyBsZXQgaW5wdXQgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xuICAgIGNvbnN0IHBhc3RlT2JzZXJ2ZXIgPSBmcm9tRXZlbnQodGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LCAncGFzdGUnKS5waXBlKGRlYm91bmNlVGltZSgyNTApLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgICBwYXN0ZU9ic2VydmVyLnN1YnNjcmliZShcbiAgICAgIChldmVudDogQ2xpcGJvYXJkRXZlbnQpID0+IHRoaXMub25EZWJvdW5jZWRLZXl1cChldmVudCksXG4gICAgICAoZXJyKSA9PiB0aGlzLmhpZGVSZXN1bHRzKGVyciksXG4gICAgKTtcbiAgICBjb25zdCBrZXlib2FyZE9ic2VydmVyID0gZnJvbUV2ZW50KHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudCwgJ2tleXVwJykucGlwZShkZWJvdW5jZVRpbWUoMjUwKSwgZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG4gICAga2V5Ym9hcmRPYnNlcnZlci5zdWJzY3JpYmUoXG4gICAgICAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHRoaXMub25EZWJvdW5jZWRLZXl1cChldmVudCksXG4gICAgICAoZXJyKSA9PiB0aGlzLmhpZGVSZXN1bHRzKGVyciksXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgb25EZWJvdW5jZWRLZXl1cChldmVudDogS2V5Ym9hcmRFdmVudCB8IENsaXBib2FyZEV2ZW50KSB7XG4gICAgaWYgKFtLZXkuRXNjYXBlLCBLZXkuQXJyb3dEb3duLCBLZXkuQXJyb3dVcCwgS2V5LkVudGVyLCBLZXkuVGFiXS5zb21lKChrZXkpID0+IGtleSA9PT0gKGV2ZW50IGFzIEtleWJvYXJkRXZlbnQpLmtleSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zaG93KChldmVudC50YXJnZXQgYXMgYW55KS52YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgb3BlblBhbmVsKCk6IHZvaWQge1xuICAgIHRoaXMuY29udGFpbmVyLm9wZW5QYW5lbCgpO1xuICB9XG5cbiAgcHVibGljIGNsb3NlUGFuZWwoKTogdm9pZCB7XG4gICAgdGhpcy5jb250YWluZXIuY2xvc2VQYW5lbCgpO1xuICB9XG5cbiAgcHVibGljIGdldCBwYW5lbE9wZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29udGFpbmVyICYmIHRoaXMuY29udGFpbmVyLnBhbmVsT3BlbjtcbiAgfVxuXG4gIHByaXZhdGUgc2hvdyh0ZXJtPzogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5vcGVuUGFuZWwoKTtcbiAgICAvLyBTaG93IHRoZSByZXN1bHRzIGluc2lkZVxuICAgIHRoaXMuc2hvd1Jlc3VsdHModGVybSk7XG4gIH1cblxuICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlUGlja2VySW5wdXQpIHtcbiAgICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMucGFuZWxPcGVuICYmICF0aGlzLmRpc2FibGVQaWNrZXJJbnB1dCkge1xuICAgICAgaWYgKGV2ZW50LmtleSA9PT0gS2V5LkVzY2FwZSB8fCBldmVudC5rZXkgPT09IEtleS5UYWIpIHtcbiAgICAgICAgdGhpcy5oaWRlUmVzdWx0cygpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChldmVudC5rZXkgPT09IEtleS5BcnJvd1VwKSB7XG4gICAgICAgIHRoaXMucG9wdXAuaW5zdGFuY2UucHJldkFjdGl2ZU1hdGNoKCk7XG4gICAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChldmVudC5rZXkgPT09IEtleS5BcnJvd0Rvd24pIHtcbiAgICAgICAgdGhpcy5wb3B1cC5pbnN0YW5jZS5uZXh0QWN0aXZlTWF0Y2goKTtcbiAgICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGV2ZW50LmtleSA9PT0gS2V5LkVudGVyKSB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZU1hdGNoID0gdGhpcy5wb3B1cC5pbnN0YW5jZS5hY3RpdmVNYXRjaDtcbiAgICAgICAgaWYgKCF0aGlzLnNlbGVjdGVkLmZpbmQoKHNlbGVjdGVkKSA9PiBhY3RpdmVNYXRjaCAmJiBhY3RpdmVNYXRjaC52YWx1ZSAmJiBzZWxlY3RlZC52YWx1ZSA9PT0gYWN0aXZlTWF0Y2gudmFsdWUpKSB7XG4gICAgICAgICAgdGhpcy5wb3B1cC5pbnN0YW5jZS5zZWxlY3RBY3RpdmVNYXRjaCgpO1xuICAgICAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKChldmVudC5rZXkgPT09IEtleS5CYWNrc3BhY2UgfHwgZXZlbnQua2V5ID09PSBLZXkuRGVsZXRlKSAmJiAhSGVscGVycy5pc0VtcHR5KHRoaXMuX3ZhbHVlKSAmJiAodGhpcy5fdmFsdWUgPT09IHRoaXMudGVybSkpIHtcbiAgICAgICAgdGhpcy5jbGVhclZhbHVlKGZhbHNlKTtcbiAgICAgICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gICAgICB9XG4gICAgICBpZiAoZXZlbnQua2V5ID09PSBLZXkuRGVsZXRlICYmIEhlbHBlcnMuaXNCbGFuayh0aGlzLl92YWx1ZSkpIHtcbiAgICAgICAgdGhpcy5jbGVhclZhbHVlKHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNsZWFyVmFsdWUod2lwZVRlcm0pIHtcbiAgICB0aGlzLl92YWx1ZSA9IG51bGw7XG4gICAgdGhpcy5zZWxlY3QuZW1pdCh0aGlzLl92YWx1ZSk7XG4gICAgdGhpcy5jaGFuZ2VkLmVtaXQoeyB2YWx1ZTogdGhpcy5fdmFsdWUsIHJhd1ZhbHVlOiB7IGxhYmVsOiAnJywgdmFsdWU6IHRoaXMuX3ZhbHVlIH0gfSk7XG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMuX3ZhbHVlKTtcblxuICAgIGlmICh3aXBlVGVybSkge1xuICAgICAgdGhpcy50ZXJtID0gJyc7XG4gICAgICB0aGlzLnBvcHVwLmluc3RhbmNlLmN1c3RvbVRleHRWYWx1ZSA9IG51bGw7XG4gICAgICB0aGlzLmhpZGVSZXN1bHRzKCk7XG4gICAgfVxuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBXaGVuIHRoZSBpbnB1dCdzIGZvY3VzIGV2ZW50IGlzIGNhbGxlZCB0aGlzIG1ldGhvZCBjYWxscyB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIHRoYXQgZGlzcGxheXMgdGhlXG4gICAqIHJlc3VsdHMuXG4gICAqL1xuICBvbkZvY3VzKGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLnBhbmVsT3Blbikge1xuICAgICAgdGhpcy5zaG93KCk7XG4gICAgfVxuICAgIHRoaXMuZm9jdXMuZW1pdChldmVudCk7XG4gIH1cblxuICAvLyBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIHRoZSByZXN1bHRzIChjYWxsZWQgcG9wdXApIGFuZCBhZGRzIGFsbCB0aGUgYmluZGluZ3MgdG8gdGhhdCBpbnN0YW5jZS5cbiAgc2hvd1Jlc3VsdHModGVybT86IGFueSkge1xuICAgIC8vIFVwZGF0ZSBNYXRjaGVzXG4gICAgaWYgKHRoaXMucG9wdXApIHtcbiAgICAgIC8vIFVwZGF0ZSBleGlzdGluZyBsaXN0IG9yIGNyZWF0ZSB0aGUgRE9NIGVsZW1lbnRcbiAgICAgIHRoaXMucG9wdXAuaW5zdGFuY2UuY29uZmlnID0gdGhpcy5jb25maWc7XG4gICAgICB0aGlzLnBvcHVwLmluc3RhbmNlLnRlcm0gPSB0aGlzLnRlcm07XG4gICAgICB0aGlzLnBvcHVwLmluc3RhbmNlLnNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZDtcbiAgICAgIHRoaXMucG9wdXAuaW5zdGFuY2UuYXV0b1NlbGVjdEZpcnN0T3B0aW9uID0gdGhpcy5hdXRvU2VsZWN0Rmlyc3RPcHRpb247XG4gICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wb3B1cCA9IHRoaXMuY29tcG9uZW50VXRpbHMuYXBwZW5kKHRoaXMucmVzdWx0c0NvbXBvbmVudCwgdGhpcy5yZXN1bHRzKTtcbiAgICAgIHRoaXMucG9wdXAuaW5zdGFuY2UucGFyZW50ID0gdGhpcztcbiAgICAgIHRoaXMucG9wdXAuaW5zdGFuY2UuY29uZmlnID0gdGhpcy5jb25maWc7XG4gICAgICB0aGlzLnBvcHVwLmluc3RhbmNlLnRlcm0gPSB0aGlzLnRlcm07XG4gICAgICB0aGlzLnBvcHVwLmluc3RhbmNlLnNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZDtcbiAgICAgIHRoaXMucG9wdXAuaW5zdGFuY2UuYXV0b1NlbGVjdEZpcnN0T3B0aW9uID0gdGhpcy5hdXRvU2VsZWN0Rmlyc3RPcHRpb247XG4gICAgICB0aGlzLnBvcHVwLmluc3RhbmNlLm92ZXJsYXkgPSB0aGlzLmNvbnRhaW5lci5vdmVybGF5UmVmO1xuICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gVGVsbHMgdGhlIG92ZXJsYXkgY29tcG9uZW50IHRvIGhpZGUgdGhlIHBpY2tlciByZXN1bHRzIGZyb20gdGhlIERPTSB3aXRob3V0IGRlbGV0aW5nIHRoZSBkeW5hbWljYWxseSBhbGxvY2F0ZWQgcG9wdXAgaW5zdGFuY2UgY3JlYXRlZCBpblxuICAvLyBzaG93UmVzdWx0cy4gVGhlIHBvcHVwIGluc3RhbmNlIHdpbGwgcmVtYWluIGluIG1lbW9yeSBmcm9tIHRoZSBmaXJzdCB0aW1lIHRoZSByZXN1bHRzIGFyZSBzaG93biB1bnRpbCB0aGlzIGNvbXBvbmVudCBpcyBkZXN0cm95ZWQuXG4gIGhpZGVSZXN1bHRzKGVycj86IGFueSkge1xuICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLy8gQ2xlYW5zIHVwIGxpc3RlbmVycyBmb3IgdGhlIHBvcHVwIC0gd2lsbCBnZXQgZXhlY3V0ZWQgbm8gbWF0dGVyIGhvdyB0aGUgcG9wdXAgaXMgY2xvc2VkLlxuICBvbk92ZXJsYXlDbG9zZWQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucG9wdXAgJiYgdGhpcy5wb3B1cC5pbnN0YW5jZSAmJiB0aGlzLnBvcHVwLmluc3RhbmNlLmNsZWFuVXApIHtcbiAgICAgIHRoaXMucG9wdXAuaW5zdGFuY2UuY2xlYW5VcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGdldCBhY2Nlc3NvclxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgLy8gc2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWUoc2VsZWN0ZWQpIHtcbiAgICBpZiAoIXNlbGVjdGVkKSB7XG4gICAgICB0aGlzLnRlcm0gPSAnJztcbiAgICAgIHRoaXMuX3ZhbHVlID0gbnVsbDtcbiAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLl92YWx1ZSk7XG4gICAgfSBlbHNlIGlmIChzZWxlY3RlZC52YWx1ZSAhPT0gdGhpcy5fdmFsdWUpIHtcbiAgICAgIHRoaXMudGVybSA9IHRoaXMuY2xlYXJWYWx1ZU9uU2VsZWN0ID8gJycgOiBzZWxlY3RlZC5sYWJlbDtcbiAgICAgIHRoaXMuX3ZhbHVlID0gc2VsZWN0ZWQudmFsdWU7XG4gICAgICB0aGlzLmNoYW5nZWQuZW1pdCh7IHZhbHVlOiBzZWxlY3RlZC52YWx1ZSwgcmF3VmFsdWU6IHsgbGFiZWw6IHRoaXMudGVybSwgdmFsdWU6IHNlbGVjdGVkLnZhbHVlIH0gfSk7XG4gICAgICB0aGlzLnNlbGVjdC5lbWl0KHNlbGVjdGVkKTtcbiAgICAgIHRoaXMub25Nb2RlbENoYW5nZShzZWxlY3RlZC52YWx1ZSk7XG4gICAgICBpZiAodGhpcy5wb3B1cCkge1xuICAgICAgICB0aGlzLnBvcHVwLmluc3RhbmNlLnNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50ZXJtID0gdGhpcy5jbGVhclZhbHVlT25TZWxlY3QgPyAnJyA6IHNlbGVjdGVkLmxhYmVsO1xuICAgICAgdGhpcy5jaGFuZ2VkLmVtaXQoeyB2YWx1ZTogc2VsZWN0ZWQudmFsdWUsIHJhd1ZhbHVlOiB7IGxhYmVsOiB0aGlzLnRlcm0sIHZhbHVlOiB0aGlzLl92YWx1ZSB9IH0pO1xuICAgICAgdGhpcy5zZWxlY3QuZW1pdChzZWxlY3RlZCk7XG4gICAgfVxuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLy8gTWFrZXMgc3VyZSB0byBjbGVhciB0aGUgbW9kZWwgaWYgdGhlIHVzZXIgY2xlYXJzIHRoZSB0ZXh0IGJveFxuICBjaGVja1Rlcm0oZXZlbnQpIHtcbiAgICB0aGlzLnR5cGluZy5lbWl0KGV2ZW50KTtcbiAgICBpZiAodGhpcy5hbGxvd0N1c3RvbVZhbHVlcykge1xuICAgICAgaWYgKHRoaXMudGVybSkge1xuICAgICAgICB0aGlzLnBvcHVwLmluc3RhbmNlLmN1c3RvbVRleHRWYWx1ZSA9IHsgbGFiZWw6IHRoaXMudGVybSwgdmFsdWU6IHRoaXMudGVybSB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBvcHVwLmluc3RhbmNlLmN1c3RvbVRleHRWYWx1ZSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICgoIWV2ZW50IHx8ICFldmVudC5sZW5ndGgpICYmICFIZWxwZXJzLmlzRW1wdHkodGhpcy5fdmFsdWUpKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IG51bGw7XG4gICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy5fdmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8vIFNldCB0b3VjaGVkIG9uIGJsdXJcbiAgb25Ub3VjaGVkKGV2ZW50PzogRXZlbnQpIHtcbiAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XG4gICAgdGhpcy5ibHVyLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHRoaXMuY2xlYXJWYWx1ZU9uU2VsZWN0KSB7XG4gICAgICB0aGlzLnRlcm0gPSAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgIXRoaXMuY29uZmlnLnVzZUdldExhYmVscykge1xuICAgICAgICB0aGlzLnRlcm0gPSB2YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUgJiYgdmFsdWUubGFiZWwpIHtcbiAgICAgICAgdGhpcy50ZXJtID0gdmFsdWUubGFiZWw7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlICYmIHZhbHVlLmZpcnN0TmFtZSkge1xuICAgICAgICB0aGlzLnRlcm0gPSBgJHt2YWx1ZS5maXJzdE5hbWV9ICR7dmFsdWUubGFzdE5hbWV9YDtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUgJiYgdmFsdWUubmFtZSkge1xuICAgICAgICB0aGlzLnRlcm0gPSB2YWx1ZS5uYW1lO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5jb25maWcuZ2V0TGFiZWxzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMuY29uZmlnLmdldExhYmVscyh2YWx1ZSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgdGhpcy50ZXJtID0gcmVzdWx0Lmxlbmd0aCA/IHJlc3VsdFswXS5sYWJlbCB8fCAnJyA6IHJlc3VsdC5sYWJlbCB8fCAnJztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50ZXJtID0gdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUgJiYgdmFsdWUudGl0bGUpIHtcbiAgICAgICAgdGhpcy50ZXJtID0gdmFsdWUudGl0bGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnRlcm0gPSB2YWx1ZSB8fCAnJztcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGRpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5fZGlzYWJsZVBpY2tlcklucHV0ID0gZGlzYWJsZWQ7XG4gIH1cbn1cbiJdfQ==
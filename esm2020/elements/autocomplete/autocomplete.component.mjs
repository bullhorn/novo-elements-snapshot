var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Inject, Input, Optional, Output, QueryList, ViewChild, ViewEncapsulation, } from '@angular/core';
import { NOVO_OPTION_PARENT_COMPONENT, NovoOptgroup, NovoOption, NovoOverlayTemplateComponent, mixinDisabled, mixinOverlay, } from 'novo-elements/elements/common';
import { NOVO_FORM_FIELD, NovoFieldElement } from 'novo-elements/elements/field';
import { BooleanInput } from 'novo-elements/utils';
import { Subscription, fromEvent, interval, merge, of } from 'rxjs';
import { debounce, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/elements/common";
import * as i2 from "@angular/cdk/scrolling";
import * as i3 from "novo-elements/elements/field";
/** Event object that is emitted when an autocomplete option is selected. */
export class NovoOptionSelectedEvent {
    constructor(
    /** Reference to the autocomplete panel that emitted the event. */
    source, 
    /** Option that was selected. */
    option) {
        this.source = source;
        this.option = option;
    }
}
// Boilerplate for applying mixins
class NovoAutocompleteBase {
    constructor() { }
}
const NovoAutocompleteMixins = mixinOverlay(mixinDisabled(NovoAutocompleteBase));
export class NovoAutocompleteElement extends NovoAutocompleteMixins {
    constructor(_elementRef, cdr, defaultTabIndex, _formField) {
        super();
        this._elementRef = _elementRef;
        this.cdr = cdr;
        this._formField = _formField;
        this._stateChanges = Subscription.EMPTY;
        this._activeOptionChanges = Subscription.EMPTY;
        this._selectedOptionChanges = Subscription.EMPTY;
        this._keyDownChanges = Subscription.EMPTY;
        /** Event that is emitted whenever an option from the list is selected. */
        this.optionSelected = new EventEmitter();
        /** Emits whenever an option is activated using the keyboard. */
        this.optionActivated = new EventEmitter();
        /** Key to use to trigger autocomplete. used for textarea. */
        this.triggerOn = (control) => control.focused;
        /** Function that maps an option's control value to its display value in the trigger. */
        this.displayWith = null;
        this._multiple = false;
        const parsedTabIndex = Number(defaultTabIndex);
        this.tabIndex = parsedTabIndex || parsedTabIndex === 0 ? parsedTabIndex : null;
    }
    /** Whether the user should be allowed to select multiple options. */
    get multiple() {
        return this._multiple;
    }
    set multiple(value) {
        this._multiple = coerceBooleanProperty(value);
    }
    /** Whether the toggle button is disabled. */
    get disabled() {
        if (this._disabled === undefined && this._formField?._control) {
            return this._formField._control.disabled;
        }
        return !!this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    ngOnChanges(changes) {
        this._watchStateChanges();
        this._watchSelectionEvents();
    }
    ngOnDestroy() {
        this._stateChanges.unsubscribe();
        this._activeOptionChanges.unsubscribe();
        this._selectedOptionChanges.unsubscribe();
        this._keyDownChanges.unsubscribe();
    }
    ngAfterContentInit() {
        this._keyManager = new ActiveDescendantKeyManager(this.options).withWrap();
        this._activeOptionChanges = this._keyManager.change.subscribe((index) => {
            this.optionActivated.emit({ source: this, option: this.options.toArray()[index] || null });
        });
        this.element = this._formField.getConnectedOverlayOrigin() || this._elementRef;
        this._keyDownChanges = fromEvent(this.element.nativeElement, 'keydown').subscribe((event) => this._handleKeydown(event));
        this.options.changes.subscribe(() => {
            this._watchStateChanges();
            this._watchSelectionEvents();
            Promise.resolve().then(() => {
                this.checkSelectedOptions();
            });
        });
    }
    ngAfterViewInit() {
        this._watchStateChanges();
        this._watchSelectionEvents();
    }
    checkPanel() {
        const isTriggered = this.triggerOn(this._formField._control);
        if (isTriggered && this.element) {
            this.openPanel();
        }
    }
    _setTriggerValue(option) {
        const toDisplay = this.displayWith ? this.displayWith(option) : option?.viewValue;
        // Simply falling back to an empty string if the display value is falsy does not work properly.
        // The display value can also be the number zero and shouldn't fall back to an empty string.
        const displayValue = toDisplay != null ? toDisplay : '';
        const optionValue = option.value;
        // If it's used within a `NovoField`, we should set it through the property so it can go
        // through change detection.
        if (this._formField) {
            const { controlType, lastCaretPosition = 0 } = this._formField._control;
            if (controlType === 'textarea') {
                const currentValue = this._formField._control.value.split('');
                currentValue.splice(lastCaretPosition, 0, displayValue);
                this._formField._control.value = currentValue.join('');
            }
            else if (controlType === 'chip-list') {
                const chipList = this._formField._control;
                const currentValue = this._formField._control.value;
                if (currentValue.includes(optionValue)) {
                    chipList.removeValue(optionValue);
                }
                else {
                    chipList.addValue(optionValue);
                }
            }
            else {
                let valueToEmit = optionValue;
                if (this.multiple) {
                    const currentValue = this._formField._control.value;
                    if (Array.isArray(currentValue)) {
                        if (currentValue.includes(optionValue)) {
                            valueToEmit = currentValue.filter((it) => it === optionValue);
                        }
                        else {
                            valueToEmit = [...currentValue, optionValue];
                        }
                    }
                    else if (currentValue === optionValue) {
                        valueToEmit = [];
                    }
                    else {
                        valueToEmit = [currentValue, optionValue];
                    }
                }
                this._formField._control.value = valueToEmit;
            }
        }
        else {
            // this._element.nativeElement.value = inputValue;
            console.warn(`AutoComplete only intended to be used within a NovoField`);
        }
        this._previousValue = optionValue;
    }
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    _clearPreviousSelectedOption(skip) {
        this.options.forEach((option) => {
            if (option !== skip && option.selected) {
                option.deselect();
            }
        });
    }
    /** Emits the `select` event. */
    _emitSelectEvent(option) {
        const event = new NovoOptionSelectedEvent(this, option);
        this.optionSelected.emit(event);
    }
    /**
     * This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     */
    _setValueAndClose(event) {
        if (event && event.source) {
            if (!this.multiple)
                this._clearPreviousSelectedOption(event.source);
            this._setTriggerValue(event.source);
            // this._onChange(event.source.value);
            // this._element.nativeElement.focus();
            // this._formField._control.focus();
            this._emitSelectEvent(event.source);
            this._watchSelectionEvents();
        }
        if (!this.multiple)
            this.closePanel();
    }
    _watchSelectionEvents() {
        const selectionEvents = this.options ? merge(...this.options.map((option) => option.onSelectionChange)) : of();
        this._selectedOptionChanges.unsubscribe();
        this._selectedOptionChanges = selectionEvents.pipe(take(1)).subscribe((evt) => {
            this._setValueAndClose(evt);
        });
    }
    _watchStateChanges() {
        const inputStateChanged = this._formField.stateChanges;
        this._stateChanges.unsubscribe();
        this._stateChanges = merge(inputStateChanged)
            .pipe(debounce(() => interval(10)))
            .subscribe(() => {
            this.checkSelectedOptions();
            this.checkPanel();
            this.cdr.markForCheck();
        });
    }
    /** The currently active option, coerced to MatOption type. */
    get activeOption() {
        if (this._keyManager) {
            return this._keyManager.activeItem;
        }
        return null;
    }
    _handleKeydown(event) {
        const key = event.key;
        // Prevent the default action on all escape key presses. This is here primarily to bring IE
        // in line with other browsers. By default, pressing escape on IE will cause it to revert
        // the input value to the one that it had on focus, however it won't dispatch any events
        // which means that the model value will be out of sync with the view.
        if (key === "Escape" /* Escape */ && !hasModifierKey(event)) {
            event.preventDefault();
        }
        if (this.activeOption && key === "Enter" /* Enter */ && this.panelOpen) {
            this.activeOption._selectViaInteraction();
            // this._resetActiveItem();
            event.preventDefault();
        }
        else {
            const prevActiveItem = this._keyManager.activeItem;
            const isArrowKey = key === "ArrowUp" /* ArrowUp */ || key === "ArrowDown" /* ArrowDown */;
            if (this.panelOpen || key === "Tab" /* Tab */) {
                this._keyManager.onKeydown(event);
            }
            else if (isArrowKey && !this.overlay.panelOpen) {
                this.openPanel();
            }
            // if (isArrowKey || this.autocomplete._keyManager.activeItem !== prevActiveItem) {
            //   this._scrollToOption(this.autocomplete._keyManager.activeItemIndex || 0);
            // }
        }
    }
    checkSelectedOptions() {
        if (this.multiple && Array.isArray(this._formField._control.value)) {
            const value = this._formField._control.value;
            this.options.forEach((option) => option.deselect());
            value.forEach((currentValue) => this._selectValue(currentValue));
        }
    }
    /**
     * Finds and selects and option based on its value.
     * @returns Option that has the corresponding value.
     */
    _selectValue(value) {
        const correspondingOption = this.options.find((option) => {
            return option.value === value;
        });
        correspondingOption?.select();
        return correspondingOption;
    }
}
NovoAutocompleteElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAutocompleteElement, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: 'tabindex', attribute: true }, { token: NOVO_FORM_FIELD, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NovoAutocompleteElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoAutocompleteElement, selector: "novo-autocomplete", inputs: { tabIndex: "tabIndex", triggerOn: "triggerOn", displayWith: "displayWith", ariaLabel: ["aria-label", "ariaLabel"], multiple: "multiple", disabled: "disabled" }, outputs: { optionSelected: "optionSelected", optionActivated: "optionActivated" }, host: { properties: { "attr.tabindex": "disabled ? null : -1" }, classAttribute: "novo-autocomplete" }, providers: [{ provide: NOVO_OPTION_PARENT_COMPONENT, useExisting: NovoAutocompleteElement }], queries: [{ propertyName: "optionGroups", predicate: NovoOptgroup, descendants: true }, { propertyName: "options", predicate: NovoOption, descendants: true }], viewQueries: [{ propertyName: "overlay", first: true, predicate: NovoOverlayTemplateComponent, descendants: true }], exportAs: ["novoAutocomplete"], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<novo-overlay-template [parent]=\"element\" position=\"above-below\">\n  <div class=\"novo-autocomplete-options\" cdk-scrollable>\n    <ng-content></ng-content>\n  </div>\n</novo-overlay-template>", styles: [".novo-autocomplete-options{background-color:var(--background-bright);cursor:default;list-style:none;-webkit-padding-start:0px!important;padding-inline-start:0px!important;box-shadow:0 -1px 3px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f}\n"], components: [{ type: i1.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "width", "height", "closeOnSelect", "hasBackdrop", "parent"], outputs: ["select", "opening", "closing"] }], directives: [{ type: i2.CdkScrollable, selector: "[cdk-scrollable], [cdkScrollable]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NovoAutocompleteElement.prototype, "disabled", null);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAutocompleteElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-autocomplete', host: {
                        class: 'novo-autocomplete',
                        // Always set the tabindex to -1 so that it doesn't overlap with any custom tabindex the
                        // consumer may have provided, while still being able to receive focus.
                        '[attr.tabindex]': 'disabled ? null : -1',
                    }, providers: [{ provide: NOVO_OPTION_PARENT_COMPONENT, useExisting: NovoAutocompleteElement }], exportAs: 'novoAutocomplete', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<novo-overlay-template [parent]=\"element\" position=\"above-below\">\n  <div class=\"novo-autocomplete-options\" cdk-scrollable>\n    <ng-content></ng-content>\n  </div>\n</novo-overlay-template>", styles: [".novo-autocomplete-options{background-color:var(--background-bright);cursor:default;list-style:none;-webkit-padding-start:0px!important;padding-inline-start:0px!important;box-shadow:0 -1px 3px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Attribute,
                    args: ['tabindex']
                }] }, { type: i3.NovoFieldElement, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NOVO_FORM_FIELD]
                }] }]; }, propDecorators: { optionGroups: [{
                type: ContentChildren,
                args: [NovoOptgroup, { descendants: true }]
            }], options: [{
                type: ContentChildren,
                args: [NovoOption, { descendants: true }]
            }], optionSelected: [{
                type: Output
            }], optionActivated: [{
                type: Output
            }], tabIndex: [{
                type: Input
            }], triggerOn: [{
                type: Input
            }], displayWith: [{
                type: Input
            }], ariaLabel: [{
                type: Input,
                args: ['aria-label']
            }], multiple: [{
                type: Input
            }], disabled: [{
                type: Input
            }], overlay: [{
                type: ViewChild,
                args: [NovoOverlayTemplateComponent]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMvRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUdMLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUdMLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUVULFNBQVMsRUFDVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUlMLDRCQUE0QixFQUM1QixZQUFZLEVBQ1osVUFBVSxFQUVWLDRCQUE0QixFQUM1QixhQUFhLEVBQ2IsWUFBWSxHQUNiLE1BQU0sK0JBQStCLENBQUM7QUFDdkMsT0FBTyxFQUFFLGVBQWUsRUFBb0IsZ0JBQWdCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNuRyxPQUFPLEVBQUUsWUFBWSxFQUEyQixNQUFNLHFCQUFxQixDQUFDO0FBQzVFLE9BQU8sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BFLE9BQU8sRUFB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TTs7MEJBdUU1QyxTQUFTOzJCQUFDLFVBQVU7OzBCQUNwQixRQUFROzswQkFBSSxNQUFNOzJCQUFDLGVBQWU7NENBdkRpQixZQUFZO3NCQUFqRSxlQUFlO3VCQUFDLFlBQVksRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUU7Z0JBQ0EsT0FBTztzQkFBMUQsZUFBZTt1QkFBQyxVQUFVLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFO2dCQUcvQixjQUFjO3NCQUFoQyxNQUFNO2dCQUVZLGVBQWU7c0JBQWpDLE1BQU07Z0JBR0UsUUFBUTtzQkFBaEIsS0FBSztnQkFHRyxTQUFTO3NCQUFqQixLQUFLO2dCQUdHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBR2UsU0FBUztzQkFBN0IsS0FBSzt1QkFBQyxZQUFZO2dCQUlmLFFBQVE7c0JBRFgsS0FBSztnQkFZRixRQUFRO3NCQUZYLEtBQUs7Z0JBZ0JOLE9BQU87c0JBRE4sU0FBUzt1QkFBQyw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBoYXNNb2RpZmllcktleSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBBZnRlclZpZXdJbml0LFxuICBBdHRyaWJ1dGUsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgdHlwZSB7IE5vdm9DaGlwTGlzdCB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvY2hpcHMnO1xuaW1wb3J0IHtcbiAgQ2FuRGlzYWJsZSxcbiAgQ2FuRGlzYWJsZUN0b3IsXG4gIEhhc092ZXJsYXlDdG9yLFxuICBOT1ZPX09QVElPTl9QQVJFTlRfQ09NUE9ORU5ULFxuICBOb3ZvT3B0Z3JvdXAsXG4gIE5vdm9PcHRpb24sXG4gIE5vdm9PcHRpb25TZWxlY3Rpb25DaGFuZ2UsXG4gIE5vdm9PdmVybGF5VGVtcGxhdGVDb21wb25lbnQsXG4gIG1peGluRGlzYWJsZWQsXG4gIG1peGluT3ZlcmxheSxcbn0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9jb21tb24nO1xuaW1wb3J0IHsgTk9WT19GT1JNX0ZJRUxELCBOb3ZvRmllbGRDb250cm9sLCBOb3ZvRmllbGRFbGVtZW50IH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9maWVsZCc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIEJvb2xlYW5JbnB1dEFjY2VwdCwgS2V5IH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIGZyb21FdmVudCwgaW50ZXJ2YWwsIG1lcmdlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2UsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8qKiBFdmVudCBvYmplY3QgdGhhdCBpcyBlbWl0dGVkIHdoZW4gYW4gYXV0b2NvbXBsZXRlIG9wdGlvbiBpcyBzZWxlY3RlZC4gKi9cbmV4cG9ydCBjbGFzcyBOb3ZvT3B0aW9uU2VsZWN0ZWRFdmVudCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIC8qKiBSZWZlcmVuY2UgdG8gdGhlIGF1dG9jb21wbGV0ZSBwYW5lbCB0aGF0IGVtaXR0ZWQgdGhlIGV2ZW50LiAqL1xuICAgIHB1YmxpYyBzb3VyY2U6IE5vdm9BdXRvY29tcGxldGVFbGVtZW50LFxuICAgIC8qKiBPcHRpb24gdGhhdCB3YXMgc2VsZWN0ZWQuICovXG4gICAgcHVibGljIG9wdGlvbjogTm92b09wdGlvbixcbiAgKSB7fVxufVxuXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zXG5jbGFzcyBOb3ZvQXV0b2NvbXBsZXRlQmFzZSB7XG4gIGNvbnN0cnVjdG9yKCkge31cbn1cbmNvbnN0IE5vdm9BdXRvY29tcGxldGVNaXhpbnM6IEhhc092ZXJsYXlDdG9yICYgQ2FuRGlzYWJsZUN0b3IgJiB0eXBlb2YgTm92b0F1dG9jb21wbGV0ZUJhc2UgPSBtaXhpbk92ZXJsYXkoXG4gIG1peGluRGlzYWJsZWQoTm92b0F1dG9jb21wbGV0ZUJhc2UpLFxuKTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1hdXRvY29tcGxldGUnLFxuICB0ZW1wbGF0ZVVybDogJ2F1dG9jb21wbGV0ZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydhdXRvY29tcGxldGUuY29tcG9uZW50LnNjc3MnXSxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1hdXRvY29tcGxldGUnLFxuICAgIC8vIEFsd2F5cyBzZXQgdGhlIHRhYmluZGV4IHRvIC0xIHNvIHRoYXQgaXQgZG9lc24ndCBvdmVybGFwIHdpdGggYW55IGN1c3RvbSB0YWJpbmRleCB0aGVcbiAgICAvLyBjb25zdW1lciBtYXkgaGF2ZSBwcm92aWRlZCwgd2hpbGUgc3RpbGwgYmVpbmcgYWJsZSB0byByZWNlaXZlIGZvY3VzLlxuICAgICdbYXR0ci50YWJpbmRleF0nOiAnZGlzYWJsZWQgPyBudWxsIDogLTEnLFxuICB9LFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IE5PVk9fT1BUSU9OX1BBUkVOVF9DT01QT05FTlQsIHVzZUV4aXN0aW5nOiBOb3ZvQXV0b2NvbXBsZXRlRWxlbWVudCB9XSxcbiAgZXhwb3J0QXM6ICdub3ZvQXV0b2NvbXBsZXRlJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9BdXRvY29tcGxldGVFbGVtZW50XG4gIGV4dGVuZHMgTm92b0F1dG9jb21wbGV0ZU1peGluc1xuICBpbXBsZW1lbnRzIENhbkRpc2FibGUsIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95XG57XG4gIHByaXZhdGUgX3N0YXRlQ2hhbmdlcyA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfYWN0aXZlT3B0aW9uQ2hhbmdlcyA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfc2VsZWN0ZWRPcHRpb25DaGFuZ2VzID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9rZXlEb3duQ2hhbmdlcyA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAvKiogTWFuYWdlcyBhY3RpdmUgaXRlbSBpbiBvcHRpb24gbGlzdCBiYXNlZCBvbiBrZXkgZXZlbnRzLiAqL1xuICBwcml2YXRlIF9rZXlNYW5hZ2VyOiBBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlcjxOb3ZvT3B0aW9uPjtcblxuICAvKiogT2xkIHZhbHVlIG9mIHRoZSBuYXRpdmUgaW5wdXQuIFVzZWQgdG8gd29yayBhcm91bmQgaXNzdWVzIHdpdGggdGhlIGBpbnB1dGAgZXZlbnQgb24gSUUuICovXG4gIHByaXZhdGUgX3ByZXZpb3VzVmFsdWU6IHN0cmluZyB8IG51bWJlciB8IG51bGw7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihOb3ZvT3B0Z3JvdXAsIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgb3B0aW9uR3JvdXBzOiBRdWVyeUxpc3Q8Tm92b09wdGdyb3VwPjtcbiAgQENvbnRlbnRDaGlsZHJlbihOb3ZvT3B0aW9uLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIG9wdGlvbnM6IFF1ZXJ5TGlzdDxOb3ZvT3B0aW9uPjtcblxuICAvKiogRXZlbnQgdGhhdCBpcyBlbWl0dGVkIHdoZW5ldmVyIGFuIG9wdGlvbiBmcm9tIHRoZSBsaXN0IGlzIHNlbGVjdGVkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgb3B0aW9uU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxOb3ZvT3B0aW9uU2VsZWN0ZWRFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE5vdm9PcHRpb25TZWxlY3RlZEV2ZW50PigpO1xuICAvKiogRW1pdHMgd2hlbmV2ZXIgYW4gb3B0aW9uIGlzIGFjdGl2YXRlZCB1c2luZyB0aGUga2V5Ym9hcmQuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBvcHRpb25BY3RpdmF0ZWQ6IEV2ZW50RW1pdHRlcjxOb3ZvT3B0aW9uU2VsZWN0ZWRFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE5vdm9PcHRpb25TZWxlY3RlZEV2ZW50PigpO1xuXG4gIC8qKiBUYWJpbmRleCBmb3IgdGhlIHRvZ2dsZS4gKi9cbiAgQElucHV0KCkgdGFiSW5kZXg6IG51bWJlciB8IG51bGw7XG5cbiAgLyoqIEtleSB0byB1c2UgdG8gdHJpZ2dlciBhdXRvY29tcGxldGUuIHVzZWQgZm9yIHRleHRhcmVhLiAqL1xuICBASW5wdXQoKSB0cmlnZ2VyT246IChjb250cm9sOiBOb3ZvRmllbGRDb250cm9sPGFueT4pID0+IGJvb2xlYW4gPSAoY29udHJvbCkgPT4gY29udHJvbC5mb2N1c2VkO1xuXG4gIC8qKiBGdW5jdGlvbiB0aGF0IG1hcHMgYW4gb3B0aW9uJ3MgY29udHJvbCB2YWx1ZSB0byBpdHMgZGlzcGxheSB2YWx1ZSBpbiB0aGUgdHJpZ2dlci4gKi9cbiAgQElucHV0KCkgZGlzcGxheVdpdGg6ICgodmFsdWU6IGFueSkgPT4gc3RyaW5nKSB8IG51bGwgPSBudWxsO1xuXG4gIC8qKiBTY3JlZW5yZWFkZXIgbGFiZWwgZm9yIHRoZSBidXR0b24uICovXG4gIEBJbnB1dCgnYXJpYS1sYWJlbCcpIGFyaWFMYWJlbDogc3RyaW5nO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSB1c2VyIHNob3VsZCBiZSBhbGxvd2VkIHRvIHNlbGVjdCBtdWx0aXBsZSBvcHRpb25zLiAqL1xuICBASW5wdXQoKVxuICBnZXQgbXVsdGlwbGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX211bHRpcGxlO1xuICB9XG4gIHNldCBtdWx0aXBsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX211bHRpcGxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9tdWx0aXBsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSB0b2dnbGUgYnV0dG9uIGlzIGRpc2FibGVkLiAqL1xuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLl9kaXNhYmxlZCA9PT0gdW5kZWZpbmVkICYmIHRoaXMuX2Zvcm1GaWVsZD8uX2NvbnRyb2wpIHtcbiAgICAgIHJldHVybiB0aGlzLl9mb3JtRmllbGQuX2NvbnRyb2wuZGlzYWJsZWQ7XG4gICAgfVxuICAgIHJldHVybiAhIXRoaXMuX2Rpc2FibGVkO1xuICB9XG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcbiAgc3RhdGljIHJlYWRvbmx5IG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXRBY2NlcHQ7XG5cbiAgLyoqIEVsZW1lbnQgZm9yIHRoZSBwYW5lbCBjb250YWluaW5nIHRoZSBhdXRvY29tcGxldGUgb3B0aW9ucy4gKi9cbiAgQFZpZXdDaGlsZChOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50KVxuICBvdmVybGF5OiBOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50O1xuXG4gIGVsZW1lbnQ6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQEF0dHJpYnV0ZSgndGFiaW5kZXgnKSBkZWZhdWx0VGFiSW5kZXg6IHN0cmluZyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE5PVk9fRk9STV9GSUVMRCkgcHJpdmF0ZSBfZm9ybUZpZWxkOiBOb3ZvRmllbGRFbGVtZW50LFxuICApIHtcbiAgICBzdXBlcigpO1xuICAgIGNvbnN0IHBhcnNlZFRhYkluZGV4ID0gTnVtYmVyKGRlZmF1bHRUYWJJbmRleCk7XG4gICAgdGhpcy50YWJJbmRleCA9IHBhcnNlZFRhYkluZGV4IHx8IHBhcnNlZFRhYkluZGV4ID09PSAwID8gcGFyc2VkVGFiSW5kZXggOiBudWxsO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIHRoaXMuX3dhdGNoU3RhdGVDaGFuZ2VzKCk7XG4gICAgdGhpcy5fd2F0Y2hTZWxlY3Rpb25FdmVudHMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3N0YXRlQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2FjdGl2ZU9wdGlvbkNoYW5nZXMudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkNoYW5nZXMudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9rZXlEb3duQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuX2tleU1hbmFnZXIgPSBuZXcgQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXI8Tm92b09wdGlvbj4odGhpcy5vcHRpb25zKS53aXRoV3JhcCgpO1xuICAgIHRoaXMuX2FjdGl2ZU9wdGlvbkNoYW5nZXMgPSB0aGlzLl9rZXlNYW5hZ2VyLmNoYW5nZS5zdWJzY3JpYmUoKGluZGV4KSA9PiB7XG4gICAgICB0aGlzLm9wdGlvbkFjdGl2YXRlZC5lbWl0KHsgc291cmNlOiB0aGlzLCBvcHRpb246IHRoaXMub3B0aW9ucy50b0FycmF5KClbaW5kZXhdIHx8IG51bGwgfSk7XG4gICAgfSk7XG4gICAgdGhpcy5lbGVtZW50ID0gdGhpcy5fZm9ybUZpZWxkLmdldENvbm5lY3RlZE92ZXJsYXlPcmlnaW4oKSB8fCB0aGlzLl9lbGVtZW50UmVmO1xuICAgIHRoaXMuX2tleURvd25DaGFuZ2VzID0gZnJvbUV2ZW50KHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAna2V5ZG93bicpLnN1YnNjcmliZSgoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHRoaXMuX2hhbmRsZUtleWRvd24oZXZlbnQpKTtcbiAgICB0aGlzLm9wdGlvbnMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5fd2F0Y2hTdGF0ZUNoYW5nZXMoKTtcbiAgICAgIHRoaXMuX3dhdGNoU2VsZWN0aW9uRXZlbnRzKCk7XG4gICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5jaGVja1NlbGVjdGVkT3B0aW9ucygpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5fd2F0Y2hTdGF0ZUNoYW5nZXMoKTtcbiAgICB0aGlzLl93YXRjaFNlbGVjdGlvbkV2ZW50cygpO1xuICB9XG5cbiAgY2hlY2tQYW5lbCgpIHtcbiAgICBjb25zdCBpc1RyaWdnZXJlZCA9IHRoaXMudHJpZ2dlck9uKHRoaXMuX2Zvcm1GaWVsZC5fY29udHJvbCk7XG4gICAgaWYgKGlzVHJpZ2dlcmVkICYmIHRoaXMuZWxlbWVudCkge1xuICAgICAgdGhpcy5vcGVuUGFuZWwoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zZXRUcmlnZ2VyVmFsdWUob3B0aW9uOiBOb3ZvT3B0aW9uKTogdm9pZCB7XG4gICAgY29uc3QgdG9EaXNwbGF5ID0gdGhpcy5kaXNwbGF5V2l0aCA/IHRoaXMuZGlzcGxheVdpdGgob3B0aW9uKSA6IG9wdGlvbj8udmlld1ZhbHVlO1xuICAgIC8vIFNpbXBseSBmYWxsaW5nIGJhY2sgdG8gYW4gZW1wdHkgc3RyaW5nIGlmIHRoZSBkaXNwbGF5IHZhbHVlIGlzIGZhbHN5IGRvZXMgbm90IHdvcmsgcHJvcGVybHkuXG4gICAgLy8gVGhlIGRpc3BsYXkgdmFsdWUgY2FuIGFsc28gYmUgdGhlIG51bWJlciB6ZXJvIGFuZCBzaG91bGRuJ3QgZmFsbCBiYWNrIHRvIGFuIGVtcHR5IHN0cmluZy5cbiAgICBjb25zdCBkaXNwbGF5VmFsdWUgPSB0b0Rpc3BsYXkgIT0gbnVsbCA/IHRvRGlzcGxheSA6ICcnO1xuICAgIGNvbnN0IG9wdGlvblZhbHVlID0gb3B0aW9uLnZhbHVlO1xuICAgIC8vIElmIGl0J3MgdXNlZCB3aXRoaW4gYSBgTm92b0ZpZWxkYCwgd2Ugc2hvdWxkIHNldCBpdCB0aHJvdWdoIHRoZSBwcm9wZXJ0eSBzbyBpdCBjYW4gZ29cbiAgICAvLyB0aHJvdWdoIGNoYW5nZSBkZXRlY3Rpb24uXG4gICAgaWYgKHRoaXMuX2Zvcm1GaWVsZCkge1xuICAgICAgY29uc3QgeyBjb250cm9sVHlwZSwgbGFzdENhcmV0UG9zaXRpb24gPSAwIH0gPSB0aGlzLl9mb3JtRmllbGQuX2NvbnRyb2w7XG4gICAgICBpZiAoY29udHJvbFR5cGUgPT09ICd0ZXh0YXJlYScpIHtcbiAgICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5fZm9ybUZpZWxkLl9jb250cm9sLnZhbHVlLnNwbGl0KCcnKTtcbiAgICAgICAgY3VycmVudFZhbHVlLnNwbGljZShsYXN0Q2FyZXRQb3NpdGlvbiwgMCwgZGlzcGxheVZhbHVlKTtcbiAgICAgICAgdGhpcy5fZm9ybUZpZWxkLl9jb250cm9sLnZhbHVlID0gY3VycmVudFZhbHVlLmpvaW4oJycpO1xuICAgICAgfSBlbHNlIGlmIChjb250cm9sVHlwZSA9PT0gJ2NoaXAtbGlzdCcpIHtcbiAgICAgICAgY29uc3QgY2hpcExpc3QgPSB0aGlzLl9mb3JtRmllbGQuX2NvbnRyb2wgYXMgTm92b0NoaXBMaXN0O1xuICAgICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLl9mb3JtRmllbGQuX2NvbnRyb2wudmFsdWU7XG4gICAgICAgIGlmIChjdXJyZW50VmFsdWUuaW5jbHVkZXMob3B0aW9uVmFsdWUpKSB7XG4gICAgICAgICAgY2hpcExpc3QucmVtb3ZlVmFsdWUob3B0aW9uVmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNoaXBMaXN0LmFkZFZhbHVlKG9wdGlvblZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHZhbHVlVG9FbWl0OiBhbnkgPSBvcHRpb25WYWx1ZTtcbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLl9mb3JtRmllbGQuX2NvbnRyb2wudmFsdWU7XG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY3VycmVudFZhbHVlKSkge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRWYWx1ZS5pbmNsdWRlcyhvcHRpb25WYWx1ZSkpIHtcbiAgICAgICAgICAgICAgdmFsdWVUb0VtaXQgPSBjdXJyZW50VmFsdWUuZmlsdGVyKChpdCkgPT4gaXQgPT09IG9wdGlvblZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHZhbHVlVG9FbWl0ID0gWy4uLmN1cnJlbnRWYWx1ZSwgb3B0aW9uVmFsdWVdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFZhbHVlID09PSBvcHRpb25WYWx1ZSkge1xuICAgICAgICAgICAgdmFsdWVUb0VtaXQgPSBbXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFsdWVUb0VtaXQgPSBbY3VycmVudFZhbHVlLCBvcHRpb25WYWx1ZV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2Zvcm1GaWVsZC5fY29udHJvbC52YWx1ZSA9IHZhbHVlVG9FbWl0O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSBpbnB1dFZhbHVlO1xuICAgICAgY29uc29sZS53YXJuKGBBdXRvQ29tcGxldGUgb25seSBpbnRlbmRlZCB0byBiZSB1c2VkIHdpdGhpbiBhIE5vdm9GaWVsZGApO1xuICAgIH1cbiAgICB0aGlzLl9wcmV2aW91c1ZhbHVlID0gb3B0aW9uVmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgYW55IHByZXZpb3VzIHNlbGVjdGVkIG9wdGlvbiBhbmQgZW1pdCBhIHNlbGVjdGlvbiBjaGFuZ2UgZXZlbnQgZm9yIHRoaXMgb3B0aW9uXG4gICAqL1xuICBwcml2YXRlIF9jbGVhclByZXZpb3VzU2VsZWN0ZWRPcHRpb24oc2tpcDogTm92b09wdGlvbikge1xuICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgIGlmIChvcHRpb24gIT09IHNraXAgJiYgb3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgIG9wdGlvbi5kZXNlbGVjdCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqIEVtaXRzIHRoZSBgc2VsZWN0YCBldmVudC4gKi9cbiAgcHJpdmF0ZSBfZW1pdFNlbGVjdEV2ZW50KG9wdGlvbjogTm92b09wdGlvbik6IHZvaWQge1xuICAgIGNvbnN0IGV2ZW50ID0gbmV3IE5vdm9PcHRpb25TZWxlY3RlZEV2ZW50KHRoaXMsIG9wdGlvbik7XG4gICAgdGhpcy5vcHRpb25TZWxlY3RlZC5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBjbG9zZXMgdGhlIHBhbmVsLCBhbmQgaWYgYSB2YWx1ZSBpcyBzcGVjaWZpZWQsIGFsc28gc2V0cyB0aGUgYXNzb2NpYXRlZFxuICAgKiBjb250cm9sIHRvIHRoYXQgdmFsdWUuIEl0IHdpbGwgYWxzbyBtYXJrIHRoZSBjb250cm9sIGFzIGRpcnR5IGlmIHRoaXMgaW50ZXJhY3Rpb25cbiAgICogc3RlbW1lZCBmcm9tIHRoZSB1c2VyLlxuICAgKi9cbiAgcHJpdmF0ZSBfc2V0VmFsdWVBbmRDbG9zZShldmVudDogTm92b09wdGlvblNlbGVjdGlvbkNoYW5nZSB8IG51bGwpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc291cmNlKSB7XG4gICAgICBpZiAoIXRoaXMubXVsdGlwbGUpIHRoaXMuX2NsZWFyUHJldmlvdXNTZWxlY3RlZE9wdGlvbihldmVudC5zb3VyY2UpO1xuICAgICAgdGhpcy5fc2V0VHJpZ2dlclZhbHVlKGV2ZW50LnNvdXJjZSk7XG4gICAgICAvLyB0aGlzLl9vbkNoYW5nZShldmVudC5zb3VyY2UudmFsdWUpO1xuICAgICAgLy8gdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAvLyB0aGlzLl9mb3JtRmllbGQuX2NvbnRyb2wuZm9jdXMoKTtcbiAgICAgIHRoaXMuX2VtaXRTZWxlY3RFdmVudChldmVudC5zb3VyY2UpO1xuICAgICAgdGhpcy5fd2F0Y2hTZWxlY3Rpb25FdmVudHMoKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMubXVsdGlwbGUpIHRoaXMuY2xvc2VQYW5lbCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfd2F0Y2hTZWxlY3Rpb25FdmVudHMoKSB7XG4gICAgY29uc3Qgc2VsZWN0aW9uRXZlbnRzID0gdGhpcy5vcHRpb25zID8gbWVyZ2UoLi4udGhpcy5vcHRpb25zLm1hcCgob3B0aW9uKSA9PiBvcHRpb24ub25TZWxlY3Rpb25DaGFuZ2UpKSA6IG9mKCk7XG4gICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25DaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25DaGFuZ2VzID0gc2VsZWN0aW9uRXZlbnRzLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKChldnQ6IE5vdm9PcHRpb25TZWxlY3Rpb25DaGFuZ2UpID0+IHtcbiAgICAgIHRoaXMuX3NldFZhbHVlQW5kQ2xvc2UoZXZ0KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3dhdGNoU3RhdGVDaGFuZ2VzKCkge1xuICAgIGNvbnN0IGlucHV0U3RhdGVDaGFuZ2VkID0gdGhpcy5fZm9ybUZpZWxkLnN0YXRlQ2hhbmdlcztcbiAgICB0aGlzLl9zdGF0ZUNoYW5nZXMudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9zdGF0ZUNoYW5nZXMgPSBtZXJnZShpbnB1dFN0YXRlQ2hhbmdlZClcbiAgICAgIC5waXBlKGRlYm91bmNlKCgpID0+IGludGVydmFsKDEwKSkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5jaGVja1NlbGVjdGVkT3B0aW9ucygpO1xuICAgICAgICB0aGlzLmNoZWNrUGFuZWwoKTtcbiAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKiBUaGUgY3VycmVudGx5IGFjdGl2ZSBvcHRpb24sIGNvZXJjZWQgdG8gTWF0T3B0aW9uIHR5cGUuICovXG4gIGdldCBhY3RpdmVPcHRpb24oKTogTm92b09wdGlvbiB8IG51bGwge1xuICAgIGlmICh0aGlzLl9rZXlNYW5hZ2VyKSB7XG4gICAgICByZXR1cm4gdGhpcy5fa2V5TWFuYWdlci5hY3RpdmVJdGVtO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgX2hhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBrZXkgPSBldmVudC5rZXk7XG5cbiAgICAvLyBQcmV2ZW50IHRoZSBkZWZhdWx0IGFjdGlvbiBvbiBhbGwgZXNjYXBlIGtleSBwcmVzc2VzLiBUaGlzIGlzIGhlcmUgcHJpbWFyaWx5IHRvIGJyaW5nIElFXG4gICAgLy8gaW4gbGluZSB3aXRoIG90aGVyIGJyb3dzZXJzLiBCeSBkZWZhdWx0LCBwcmVzc2luZyBlc2NhcGUgb24gSUUgd2lsbCBjYXVzZSBpdCB0byByZXZlcnRcbiAgICAvLyB0aGUgaW5wdXQgdmFsdWUgdG8gdGhlIG9uZSB0aGF0IGl0IGhhZCBvbiBmb2N1cywgaG93ZXZlciBpdCB3b24ndCBkaXNwYXRjaCBhbnkgZXZlbnRzXG4gICAgLy8gd2hpY2ggbWVhbnMgdGhhdCB0aGUgbW9kZWwgdmFsdWUgd2lsbCBiZSBvdXQgb2Ygc3luYyB3aXRoIHRoZSB2aWV3LlxuICAgIGlmIChrZXkgPT09IEtleS5Fc2NhcGUgJiYgIWhhc01vZGlmaWVyS2V5KGV2ZW50KSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5hY3RpdmVPcHRpb24gJiYga2V5ID09PSBLZXkuRW50ZXIgJiYgdGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgIHRoaXMuYWN0aXZlT3B0aW9uLl9zZWxlY3RWaWFJbnRlcmFjdGlvbigpO1xuICAgICAgLy8gdGhpcy5fcmVzZXRBY3RpdmVJdGVtKCk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwcmV2QWN0aXZlSXRlbSA9IHRoaXMuX2tleU1hbmFnZXIuYWN0aXZlSXRlbTtcbiAgICAgIGNvbnN0IGlzQXJyb3dLZXkgPSBrZXkgPT09IEtleS5BcnJvd1VwIHx8IGtleSA9PT0gS2V5LkFycm93RG93bjtcblxuICAgICAgaWYgKHRoaXMucGFuZWxPcGVuIHx8IGtleSA9PT0gS2V5LlRhYikge1xuICAgICAgICB0aGlzLl9rZXlNYW5hZ2VyLm9uS2V5ZG93bihldmVudCk7XG4gICAgICB9IGVsc2UgaWYgKGlzQXJyb3dLZXkgJiYgIXRoaXMub3ZlcmxheS5wYW5lbE9wZW4pIHtcbiAgICAgICAgdGhpcy5vcGVuUGFuZWwoKTtcbiAgICAgIH1cblxuICAgICAgLy8gaWYgKGlzQXJyb3dLZXkgfHwgdGhpcy5hdXRvY29tcGxldGUuX2tleU1hbmFnZXIuYWN0aXZlSXRlbSAhPT0gcHJldkFjdGl2ZUl0ZW0pIHtcbiAgICAgIC8vICAgdGhpcy5fc2Nyb2xsVG9PcHRpb24odGhpcy5hdXRvY29tcGxldGUuX2tleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4IHx8IDApO1xuICAgICAgLy8gfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tTZWxlY3RlZE9wdGlvbnMoKSB7XG4gICAgaWYgKHRoaXMubXVsdGlwbGUgJiYgQXJyYXkuaXNBcnJheSh0aGlzLl9mb3JtRmllbGQuX2NvbnRyb2wudmFsdWUpKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX2Zvcm1GaWVsZC5fY29udHJvbC52YWx1ZTtcbiAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IG9wdGlvbi5kZXNlbGVjdCgpKTtcbiAgICAgIHZhbHVlLmZvckVhY2goKGN1cnJlbnRWYWx1ZTogYW55KSA9PiB0aGlzLl9zZWxlY3RWYWx1ZShjdXJyZW50VmFsdWUpKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEZpbmRzIGFuZCBzZWxlY3RzIGFuZCBvcHRpb24gYmFzZWQgb24gaXRzIHZhbHVlLlxuICAgKiBAcmV0dXJucyBPcHRpb24gdGhhdCBoYXMgdGhlIGNvcnJlc3BvbmRpbmcgdmFsdWUuXG4gICAqL1xuICBwcml2YXRlIF9zZWxlY3RWYWx1ZSh2YWx1ZTogYW55KTogTm92b09wdGlvbiB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgY29ycmVzcG9uZGluZ09wdGlvbiA9IHRoaXMub3B0aW9ucy5maW5kKChvcHRpb246IE5vdm9PcHRpb24pID0+IHtcbiAgICAgIHJldHVybiBvcHRpb24udmFsdWUgPT09IHZhbHVlO1xuICAgIH0pO1xuICAgIGNvcnJlc3BvbmRpbmdPcHRpb24/LnNlbGVjdCgpO1xuICAgIHJldHVybiBjb3JyZXNwb25kaW5nT3B0aW9uO1xuICB9XG59XG4iLCI8bm92by1vdmVybGF5LXRlbXBsYXRlIFtwYXJlbnRdPVwiZWxlbWVudFwiIHBvc2l0aW9uPVwiYWJvdmUtYmVsb3dcIj5cbiAgPGRpdiBjbGFzcz1cIm5vdm8tYXV0b2NvbXBsZXRlLW9wdGlvbnNcIiBjZGstc2Nyb2xsYWJsZT5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIDwvZGl2PlxuPC9ub3ZvLW92ZXJsYXktdGVtcGxhdGU+Il19
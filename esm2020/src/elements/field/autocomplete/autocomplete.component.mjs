import { __decorate, __metadata } from "tslib";
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Inject, Input, Optional, Output, QueryList, ViewChild, ViewEncapsulation, } from '@angular/core';
import { fromEvent, interval, merge, of, Subscription } from 'rxjs';
import { debounce, take } from 'rxjs/operators';
import { BooleanInput } from '../../../utils';
import { mixinDisabled, mixinOverlay, NovoOptgroup, NovoOption, NOVO_OPTION_PARENT_COMPONENT, } from '../../common';
import { NovoOverlayTemplateComponent } from '../../common/overlay';
import { NovoFieldElement, NOVO_FORM_FIELD } from '../field';
import * as i0 from "@angular/core";
import * as i1 from "../../common/overlay/Overlay";
import * as i2 from "@angular/cdk/scrolling";
import * as i3 from "../field";
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
        console.log('checking', isTriggered);
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
        console.log('optionValue', optionValue);
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
            console.log('StateChagn');
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
NovoAutocompleteElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoAutocompleteElement, selector: "novo-autocomplete", inputs: { tabIndex: "tabIndex", triggerOn: "triggerOn", displayWith: "displayWith", ariaLabel: ["aria-label", "ariaLabel"], multiple: "multiple", disabled: "disabled" }, outputs: { optionSelected: "optionSelected", optionActivated: "optionActivated" }, host: { properties: { "attr.tabindex": "disabled ? null : -1" }, classAttribute: "novo-autocomplete" }, providers: [{ provide: NOVO_OPTION_PARENT_COMPONENT, useExisting: NovoAutocompleteElement }], queries: [{ propertyName: "optionGroups", predicate: NovoOptgroup, descendants: true }, { propertyName: "options", predicate: NovoOption, descendants: true }], viewQueries: [{ propertyName: "overlay", first: true, predicate: NovoOverlayTemplateComponent, descendants: true }], exportAs: ["novoAutocomplete"], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<novo-overlay-template [parent]=\"element\" position=\"above-below\">\n  <div class=\"novo-autocomplete-options\" cdk-scrollable>\n    <ng-content></ng-content>\n  </div>\n</novo-overlay-template>", styles: [".novo-autocomplete-options{background-color:var(--background-bright);cursor:default;list-style:none;-webkit-padding-start:0px!important;padding-inline-start:0px!important;box-shadow:0 -1px 3px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f}\n"], components: [{ type: i1.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "width", "height", "closeOnSelect", "parent"], outputs: ["select", "opening", "closing"] }], directives: [{ type: i2.CdkScrollable, selector: "[cdk-scrollable], [cdkScrollable]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2ZpZWxkL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvZmllbGQvYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFHTCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFHTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFFVCxTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFlBQVksRUFBTyxNQUFNLGdCQUFnQixDQUFDO0FBRW5ELE9BQU8sRUFJTCxhQUFhLEVBQ2IsWUFBWSxFQUNaLFlBQVksRUFDWixVQUFVLEVBRVYsNEJBQTRCLEdBQzdCLE1BQU0sY0FBYyxDQUFDO0FBQ3RCLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsTUFBTSxVQUFVLENBQUM7Ozs7O0FBRzdELDRFQUE0RTtBQUM1RSxNQUFNLE9BQU8sdUJBQXVCO0lBQ2xDO0lBQ0Usa0VBQWtFO0lBQzNELE1BQStCO0lBQ3RDLGdDQUFnQztJQUN6QixNQUFrQjtRQUZsQixXQUFNLEdBQU4sTUFBTSxDQUF5QjtRQUUvQixXQUFNLEdBQU4sTUFBTSxDQUFZO0lBQ3hCLENBQUM7Q0FDTDtBQUVELGtDQUFrQztBQUNsQyxNQUFNLG9CQUFvQjtJQUN4QixnQkFBZSxDQUFDO0NBQ2pCO0FBQ0QsTUFBTSxzQkFBc0IsR0FBa0UsWUFBWSxDQUN4RyxhQUFhLENBQUMsb0JBQW9CLENBQUMsQ0FDcEMsQ0FBQztBQWlCRixNQUFNLE9BQU8sdUJBQ1gsU0FBUSxzQkFBc0I7SUFnRTlCLFlBQ1UsV0FBdUIsRUFDdkIsR0FBc0IsRUFDUCxlQUF1QixFQUNELFVBQTRCO1FBRXpFLEtBQUssRUFBRSxDQUFDO1FBTEEsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDdkIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFFZSxlQUFVLEdBQVYsVUFBVSxDQUFrQjtRQWpFbkUsa0JBQWEsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBQ25DLHlCQUFvQixHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDMUMsMkJBQXNCLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUM1QyxvQkFBZSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFXN0MsMEVBQTBFO1FBQ3ZELG1CQUFjLEdBQTBDLElBQUksWUFBWSxFQUEyQixDQUFDO1FBQ3ZILGdFQUFnRTtRQUM3QyxvQkFBZSxHQUEwQyxJQUFJLFlBQVksRUFBMkIsQ0FBQztRQUt4SCw2REFBNkQ7UUFDcEQsY0FBUyxHQUFnRCxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUUvRix3RkFBd0Y7UUFDL0UsZ0JBQVcsR0FBb0MsSUFBSSxDQUFDO1FBYXJELGNBQVMsR0FBWSxLQUFLLENBQUM7UUE2QmpDLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsUUFBUSxHQUFHLGNBQWMsSUFBSSxjQUFjLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNqRixDQUFDO0lBdkNELHFFQUFxRTtJQUNyRSxJQUNJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUNELElBQUksUUFBUSxDQUFDLEtBQWM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBR0QsNkNBQTZDO0lBRzdDLElBQUksUUFBUTtRQUNWLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUU7WUFDN0QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7U0FDMUM7UUFDRCxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFjO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQW9CRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQsa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSwwQkFBMEIsQ0FBYSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdkYsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3RFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzdGLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLHlCQUF5QixFQUFFLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUMvRSxJQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFvQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDeEksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNsQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUMxQixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUM3QixPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVELFVBQVU7UUFDUixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDckMsSUFBSSxXQUFXLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUMvQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDbEI7SUFDSCxDQUFDO0lBRU8sZ0JBQWdCLENBQUMsTUFBa0I7UUFDekMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQztRQUNsRiwrRkFBK0Y7UUFDL0YsNEZBQTRGO1FBQzVGLE1BQU0sWUFBWSxHQUFHLFNBQVMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3hELE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDeEMsd0ZBQXdGO1FBQ3hGLDRCQUE0QjtRQUM1QixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsTUFBTSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsR0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUN4RSxJQUFJLFdBQVcsS0FBSyxVQUFVLEVBQUU7Z0JBQzlCLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzlELFlBQVksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUN4RCxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUN4RDtpQkFBTSxJQUFJLFdBQVcsS0FBSyxXQUFXLEVBQUU7Z0JBQ3RDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBd0IsQ0FBQztnQkFDMUQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO2dCQUNwRCxJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7b0JBQ3RDLFFBQVEsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQ25DO3FCQUFNO29CQUNMLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQ2hDO2FBQ0Y7aUJBQU07Z0JBQ0wsSUFBSSxXQUFXLEdBQVEsV0FBVyxDQUFDO2dCQUNuQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQ2pCLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztvQkFDcEQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFO3dCQUMvQixJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7NEJBQ3RDLFdBQVcsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssV0FBVyxDQUFDLENBQUM7eUJBQy9EOzZCQUFNOzRCQUNMLFdBQVcsR0FBRyxDQUFDLEdBQUcsWUFBWSxFQUFFLFdBQVcsQ0FBQyxDQUFDO3lCQUM5QztxQkFDRjt5QkFBTSxJQUFJLFlBQVksS0FBSyxXQUFXLEVBQUU7d0JBQ3ZDLFdBQVcsR0FBRyxFQUFFLENBQUM7cUJBQ2xCO3lCQUFNO3dCQUNMLFdBQVcsR0FBRyxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsQ0FBQztxQkFDM0M7aUJBQ0Y7Z0JBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQzthQUM5QztTQUNGO2FBQU07WUFDTCxrREFBa0Q7WUFDbEQsT0FBTyxDQUFDLElBQUksQ0FBQywwREFBMEQsQ0FBQyxDQUFDO1NBQzFFO1FBQ0QsSUFBSSxDQUFDLGNBQWMsR0FBRyxXQUFXLENBQUM7SUFDcEMsQ0FBQztJQUVEOztPQUVHO0lBQ0ssNEJBQTRCLENBQUMsSUFBZ0I7UUFDbkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUM5QixJQUFJLE1BQU0sS0FBSyxJQUFJLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRTtnQkFDdEMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ25CO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsZ0NBQWdDO0lBQ3hCLGdCQUFnQixDQUFDLE1BQWtCO1FBQ3pDLE1BQU0sS0FBSyxHQUFHLElBQUksdUJBQXVCLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssaUJBQWlCLENBQUMsS0FBdUM7UUFDL0QsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7Z0JBQUUsSUFBSSxDQUFDLDRCQUE0QixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BDLHNDQUFzQztZQUN0Qyx1Q0FBdUM7WUFDdkMsb0NBQW9DO1lBQ3BDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7U0FDOUI7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7WUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVPLHFCQUFxQjtRQUMzQixNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDL0csSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQThCLEVBQUUsRUFBRTtZQUN2RyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sa0JBQWtCO1FBQ3hCLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUM7UUFDdkQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQzthQUMxQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ2xDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDhEQUE4RDtJQUM5RCxJQUFJLFlBQVk7UUFDZCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQztTQUNwQztRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELGNBQWMsQ0FBQyxLQUFvQjtRQUNqQyxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBRXRCLDJGQUEyRjtRQUMzRix5RkFBeUY7UUFDekYsd0ZBQXdGO1FBQ3hGLHNFQUFzRTtRQUN0RSxJQUFJLEdBQUcsMEJBQWUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNoRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDeEI7UUFFRCxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksR0FBRyx3QkFBYyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDNUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQzFDLDJCQUEyQjtZQUMzQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDeEI7YUFBTTtZQUNMLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDO1lBQ25ELE1BQU0sVUFBVSxHQUFHLEdBQUcsNEJBQWdCLElBQUksR0FBRyxnQ0FBa0IsQ0FBQztZQUVoRSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksR0FBRyxvQkFBWSxFQUFFO2dCQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNuQztpQkFBTSxJQUFJLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFO2dCQUNoRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDbEI7WUFFRCxtRkFBbUY7WUFDbkYsOEVBQThFO1lBQzlFLElBQUk7U0FDTDtJQUNILENBQUM7SUFFTyxvQkFBb0I7UUFDMUIsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbEUsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1lBQzdDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUNwRCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBaUIsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1NBQ3ZFO0lBQ0gsQ0FBQztJQUNEOzs7T0FHRztJQUNLLFlBQVksQ0FBQyxLQUFVO1FBQzdCLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFrQixFQUFFLEVBQUU7WUFDbkUsT0FBTyxNQUFNLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztRQUNILG1CQUFtQixFQUFFLE1BQU0sRUFBRSxDQUFDO1FBQzlCLE9BQU8sbUJBQW1CLENBQUM7SUFDN0IsQ0FBQzs7cUhBdlJVLHVCQUF1Qiw2RUFvRXJCLFVBQVUsOEJBQ0QsZUFBZTt5R0FyRTFCLHVCQUF1QixpWkFMdkIsQ0FBQyxFQUFFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxXQUFXLEVBQUUsdUJBQXVCLEVBQUUsQ0FBQyx1REFvQjNFLFlBQVksNkRBQ1osVUFBVSx5RkE0Q2hCLDRCQUE0Qiw0SEN4SXpDLHNNQUl3QjtBRHdIdEI7SUFEQyxZQUFZLEVBQUU7Ozt1REFNZDs0RkFyRFUsdUJBQXVCO2tCQWZuQyxTQUFTOytCQUNFLG1CQUFtQixRQUd2Qjt3QkFDSixLQUFLLEVBQUUsbUJBQW1CO3dCQUMxQix3RkFBd0Y7d0JBQ3hGLHVFQUF1RTt3QkFDdkUsaUJBQWlCLEVBQUUsc0JBQXNCO3FCQUMxQyxhQUNVLENBQUMsRUFBRSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsV0FBVyx5QkFBeUIsRUFBRSxDQUFDLFlBQ2xGLGtCQUFrQixpQkFDYixpQkFBaUIsQ0FBQyxJQUFJLG1CQUNwQix1QkFBdUIsQ0FBQyxNQUFNOzswQkFzRTVDLFNBQVM7MkJBQUMsVUFBVTs7MEJBQ3BCLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsZUFBZTs0Q0F0RGlCLFlBQVk7c0JBQWpFLGVBQWU7dUJBQUMsWUFBWSxFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTtnQkFDQSxPQUFPO3NCQUExRCxlQUFlO3VCQUFDLFVBQVUsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUU7Z0JBRy9CLGNBQWM7c0JBQWhDLE1BQU07Z0JBRVksZUFBZTtzQkFBakMsTUFBTTtnQkFHRSxRQUFRO3NCQUFoQixLQUFLO2dCQUdHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBR0csV0FBVztzQkFBbkIsS0FBSztnQkFHZSxTQUFTO3NCQUE3QixLQUFLO3VCQUFDLFlBQVk7Z0JBSWYsUUFBUTtzQkFEWCxLQUFLO2dCQVlGLFFBQVE7c0JBRlgsS0FBSztnQkFlTixPQUFPO3NCQUROLFNBQVM7dUJBQUMsNEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgaGFzTW9kaWZpZXJLZXkgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQXR0cmlidXRlLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBpbnRlcnZhbCwgbWVyZ2UsIG9mLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBLZXkgfSBmcm9tICcuLi8uLi8uLi91dGlscyc7XG5pbXBvcnQgdHlwZSB7IE5vdm9DaGlwTGlzdCB9IGZyb20gJy4uLy4uL2NoaXBzJztcbmltcG9ydCB7XG4gIENhbkRpc2FibGUsXG4gIENhbkRpc2FibGVDdG9yLFxuICBIYXNPdmVybGF5Q3RvcixcbiAgbWl4aW5EaXNhYmxlZCxcbiAgbWl4aW5PdmVybGF5LFxuICBOb3ZvT3B0Z3JvdXAsXG4gIE5vdm9PcHRpb24sXG4gIE5vdm9PcHRpb25TZWxlY3Rpb25DaGFuZ2UsXG4gIE5PVk9fT1BUSU9OX1BBUkVOVF9DT01QT05FTlQsXG59IGZyb20gJy4uLy4uL2NvbW1vbic7XG5pbXBvcnQgeyBOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29tbW9uL292ZXJsYXknO1xuaW1wb3J0IHsgTm92b0ZpZWxkRWxlbWVudCwgTk9WT19GT1JNX0ZJRUxEIH0gZnJvbSAnLi4vZmllbGQnO1xuaW1wb3J0IHsgTm92b0ZpZWxkQ29udHJvbCB9IGZyb20gJy4uL2ZpZWxkLWNvbnRyb2wnO1xuXG4vKiogRXZlbnQgb2JqZWN0IHRoYXQgaXMgZW1pdHRlZCB3aGVuIGFuIGF1dG9jb21wbGV0ZSBvcHRpb24gaXMgc2VsZWN0ZWQuICovXG5leHBvcnQgY2xhc3MgTm92b09wdGlvblNlbGVjdGVkRXZlbnQge1xuICBjb25zdHJ1Y3RvcihcbiAgICAvKiogUmVmZXJlbmNlIHRvIHRoZSBhdXRvY29tcGxldGUgcGFuZWwgdGhhdCBlbWl0dGVkIHRoZSBldmVudC4gKi9cbiAgICBwdWJsaWMgc291cmNlOiBOb3ZvQXV0b2NvbXBsZXRlRWxlbWVudCxcbiAgICAvKiogT3B0aW9uIHRoYXQgd2FzIHNlbGVjdGVkLiAqL1xuICAgIHB1YmxpYyBvcHRpb246IE5vdm9PcHRpb24sXG4gICkge31cbn1cblxuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGluc1xuY2xhc3MgTm92b0F1dG9jb21wbGV0ZUJhc2Uge1xuICBjb25zdHJ1Y3RvcigpIHt9XG59XG5jb25zdCBOb3ZvQXV0b2NvbXBsZXRlTWl4aW5zOiBIYXNPdmVybGF5Q3RvciAmIENhbkRpc2FibGVDdG9yICYgdHlwZW9mIE5vdm9BdXRvY29tcGxldGVCYXNlID0gbWl4aW5PdmVybGF5KFxuICBtaXhpbkRpc2FibGVkKE5vdm9BdXRvY29tcGxldGVCYXNlKSxcbik7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tYXV0b2NvbXBsZXRlJyxcbiAgdGVtcGxhdGVVcmw6ICdhdXRvY29tcGxldGUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5zY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tYXV0b2NvbXBsZXRlJyxcbiAgICAvLyBBbHdheXMgc2V0IHRoZSB0YWJpbmRleCB0byAtMSBzbyB0aGF0IGl0IGRvZXNuJ3Qgb3ZlcmxhcCB3aXRoIGFueSBjdXN0b20gdGFiaW5kZXggdGhlXG4gICAgLy8gY29uc3VtZXIgbWF5IGhhdmUgcHJvdmlkZWQsIHdoaWxlIHN0aWxsIGJlaW5nIGFibGUgdG8gcmVjZWl2ZSBmb2N1cy5cbiAgICAnW2F0dHIudGFiaW5kZXhdJzogJ2Rpc2FibGVkID8gbnVsbCA6IC0xJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBOT1ZPX09QVElPTl9QQVJFTlRfQ09NUE9ORU5ULCB1c2VFeGlzdGluZzogTm92b0F1dG9jb21wbGV0ZUVsZW1lbnQgfV0sXG4gIGV4cG9ydEFzOiAnbm92b0F1dG9jb21wbGV0ZScsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQXV0b2NvbXBsZXRlRWxlbWVudFxuICBleHRlbmRzIE5vdm9BdXRvY29tcGxldGVNaXhpbnNcbiAgaW1wbGVtZW50cyBDYW5EaXNhYmxlLCBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveVxue1xuICBwcml2YXRlIF9zdGF0ZUNoYW5nZXMgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2FjdGl2ZU9wdGlvbkNoYW5nZXMgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX3NlbGVjdGVkT3B0aW9uQ2hhbmdlcyA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfa2V5RG93bkNoYW5nZXMgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgLyoqIE1hbmFnZXMgYWN0aXZlIGl0ZW0gaW4gb3B0aW9uIGxpc3QgYmFzZWQgb24ga2V5IGV2ZW50cy4gKi9cbiAgcHJpdmF0ZSBfa2V5TWFuYWdlcjogQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXI8Tm92b09wdGlvbj47XG5cbiAgLyoqIE9sZCB2YWx1ZSBvZiB0aGUgbmF0aXZlIGlucHV0LiBVc2VkIHRvIHdvcmsgYXJvdW5kIGlzc3VlcyB3aXRoIHRoZSBgaW5wdXRgIGV2ZW50IG9uIElFLiAqL1xuICBwcml2YXRlIF9wcmV2aW91c1ZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oTm92b09wdGdyb3VwLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIG9wdGlvbkdyb3VwczogUXVlcnlMaXN0PE5vdm9PcHRncm91cD47XG4gIEBDb250ZW50Q2hpbGRyZW4oTm92b09wdGlvbiwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KSBvcHRpb25zOiBRdWVyeUxpc3Q8Tm92b09wdGlvbj47XG5cbiAgLyoqIEV2ZW50IHRoYXQgaXMgZW1pdHRlZCB3aGVuZXZlciBhbiBvcHRpb24gZnJvbSB0aGUgbGlzdCBpcyBzZWxlY3RlZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8Tm92b09wdGlvblNlbGVjdGVkRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxOb3ZvT3B0aW9uU2VsZWN0ZWRFdmVudD4oKTtcbiAgLyoqIEVtaXRzIHdoZW5ldmVyIGFuIG9wdGlvbiBpcyBhY3RpdmF0ZWQgdXNpbmcgdGhlIGtleWJvYXJkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgb3B0aW9uQWN0aXZhdGVkOiBFdmVudEVtaXR0ZXI8Tm92b09wdGlvblNlbGVjdGVkRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxOb3ZvT3B0aW9uU2VsZWN0ZWRFdmVudD4oKTtcblxuICAvKiogVGFiaW5kZXggZm9yIHRoZSB0b2dnbGUuICovXG4gIEBJbnB1dCgpIHRhYkluZGV4OiBudW1iZXIgfCBudWxsO1xuXG4gIC8qKiBLZXkgdG8gdXNlIHRvIHRyaWdnZXIgYXV0b2NvbXBsZXRlLiB1c2VkIGZvciB0ZXh0YXJlYS4gKi9cbiAgQElucHV0KCkgdHJpZ2dlck9uOiAoY29udHJvbDogTm92b0ZpZWxkQ29udHJvbDxhbnk+KSA9PiBib29sZWFuID0gKGNvbnRyb2wpID0+IGNvbnRyb2wuZm9jdXNlZDtcblxuICAvKiogRnVuY3Rpb24gdGhhdCBtYXBzIGFuIG9wdGlvbidzIGNvbnRyb2wgdmFsdWUgdG8gaXRzIGRpc3BsYXkgdmFsdWUgaW4gdGhlIHRyaWdnZXIuICovXG4gIEBJbnB1dCgpIGRpc3BsYXlXaXRoOiAoKHZhbHVlOiBhbnkpID0+IHN0cmluZykgfCBudWxsID0gbnVsbDtcblxuICAvKiogU2NyZWVucmVhZGVyIGxhYmVsIGZvciB0aGUgYnV0dG9uLiAqL1xuICBASW5wdXQoJ2FyaWEtbGFiZWwnKSBhcmlhTGFiZWw6IHN0cmluZztcblxuICAvKiogV2hldGhlciB0aGUgdXNlciBzaG91bGQgYmUgYWxsb3dlZCB0byBzZWxlY3QgbXVsdGlwbGUgb3B0aW9ucy4gKi9cbiAgQElucHV0KClcbiAgZ2V0IG11bHRpcGxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9tdWx0aXBsZTtcbiAgfVxuICBzZXQgbXVsdGlwbGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9tdWx0aXBsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfbXVsdGlwbGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogV2hldGhlciB0aGUgdG9nZ2xlIGJ1dHRvbiBpcyBkaXNhYmxlZC4gKi9cbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5fZGlzYWJsZWQgPT09IHVuZGVmaW5lZCAmJiB0aGlzLl9mb3JtRmllbGQ/Ll9jb250cm9sKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZm9ybUZpZWxkLl9jb250cm9sLmRpc2FibGVkO1xuICAgIH1cbiAgICByZXR1cm4gISF0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgLyoqIEVsZW1lbnQgZm9yIHRoZSBwYW5lbCBjb250YWluaW5nIHRoZSBhdXRvY29tcGxldGUgb3B0aW9ucy4gKi9cbiAgQFZpZXdDaGlsZChOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50KVxuICBvdmVybGF5OiBOb3ZvT3ZlcmxheVRlbXBsYXRlQ29tcG9uZW50O1xuXG4gIGVsZW1lbnQ6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQEF0dHJpYnV0ZSgndGFiaW5kZXgnKSBkZWZhdWx0VGFiSW5kZXg6IHN0cmluZyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE5PVk9fRk9STV9GSUVMRCkgcHJpdmF0ZSBfZm9ybUZpZWxkOiBOb3ZvRmllbGRFbGVtZW50LFxuICApIHtcbiAgICBzdXBlcigpO1xuICAgIGNvbnN0IHBhcnNlZFRhYkluZGV4ID0gTnVtYmVyKGRlZmF1bHRUYWJJbmRleCk7XG4gICAgdGhpcy50YWJJbmRleCA9IHBhcnNlZFRhYkluZGV4IHx8IHBhcnNlZFRhYkluZGV4ID09PSAwID8gcGFyc2VkVGFiSW5kZXggOiBudWxsO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIHRoaXMuX3dhdGNoU3RhdGVDaGFuZ2VzKCk7XG4gICAgdGhpcy5fd2F0Y2hTZWxlY3Rpb25FdmVudHMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3N0YXRlQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2FjdGl2ZU9wdGlvbkNoYW5nZXMudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkNoYW5nZXMudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9rZXlEb3duQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuX2tleU1hbmFnZXIgPSBuZXcgQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXI8Tm92b09wdGlvbj4odGhpcy5vcHRpb25zKS53aXRoV3JhcCgpO1xuICAgIHRoaXMuX2FjdGl2ZU9wdGlvbkNoYW5nZXMgPSB0aGlzLl9rZXlNYW5hZ2VyLmNoYW5nZS5zdWJzY3JpYmUoKGluZGV4KSA9PiB7XG4gICAgICB0aGlzLm9wdGlvbkFjdGl2YXRlZC5lbWl0KHsgc291cmNlOiB0aGlzLCBvcHRpb246IHRoaXMub3B0aW9ucy50b0FycmF5KClbaW5kZXhdIHx8IG51bGwgfSk7XG4gICAgfSk7XG4gICAgdGhpcy5lbGVtZW50ID0gdGhpcy5fZm9ybUZpZWxkLmdldENvbm5lY3RlZE92ZXJsYXlPcmlnaW4oKSB8fCB0aGlzLl9lbGVtZW50UmVmO1xuICAgIHRoaXMuX2tleURvd25DaGFuZ2VzID0gZnJvbUV2ZW50KHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAna2V5ZG93bicpLnN1YnNjcmliZSgoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHRoaXMuX2hhbmRsZUtleWRvd24oZXZlbnQpKTtcbiAgICB0aGlzLm9wdGlvbnMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5fd2F0Y2hTdGF0ZUNoYW5nZXMoKTtcbiAgICAgIHRoaXMuX3dhdGNoU2VsZWN0aW9uRXZlbnRzKCk7XG4gICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5jaGVja1NlbGVjdGVkT3B0aW9ucygpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5fd2F0Y2hTdGF0ZUNoYW5nZXMoKTtcbiAgICB0aGlzLl93YXRjaFNlbGVjdGlvbkV2ZW50cygpO1xuICB9XG5cbiAgY2hlY2tQYW5lbCgpIHtcbiAgICBjb25zdCBpc1RyaWdnZXJlZCA9IHRoaXMudHJpZ2dlck9uKHRoaXMuX2Zvcm1GaWVsZC5fY29udHJvbCk7XG4gICAgY29uc29sZS5sb2coJ2NoZWNraW5nJywgaXNUcmlnZ2VyZWQpO1xuICAgIGlmIChpc1RyaWdnZXJlZCAmJiB0aGlzLmVsZW1lbnQpIHtcbiAgICAgIHRoaXMub3BlblBhbmVsKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc2V0VHJpZ2dlclZhbHVlKG9wdGlvbjogTm92b09wdGlvbik6IHZvaWQge1xuICAgIGNvbnN0IHRvRGlzcGxheSA9IHRoaXMuZGlzcGxheVdpdGggPyB0aGlzLmRpc3BsYXlXaXRoKG9wdGlvbikgOiBvcHRpb24/LnZpZXdWYWx1ZTtcbiAgICAvLyBTaW1wbHkgZmFsbGluZyBiYWNrIHRvIGFuIGVtcHR5IHN0cmluZyBpZiB0aGUgZGlzcGxheSB2YWx1ZSBpcyBmYWxzeSBkb2VzIG5vdCB3b3JrIHByb3Blcmx5LlxuICAgIC8vIFRoZSBkaXNwbGF5IHZhbHVlIGNhbiBhbHNvIGJlIHRoZSBudW1iZXIgemVybyBhbmQgc2hvdWxkbid0IGZhbGwgYmFjayB0byBhbiBlbXB0eSBzdHJpbmcuXG4gICAgY29uc3QgZGlzcGxheVZhbHVlID0gdG9EaXNwbGF5ICE9IG51bGwgPyB0b0Rpc3BsYXkgOiAnJztcbiAgICBjb25zdCBvcHRpb25WYWx1ZSA9IG9wdGlvbi52YWx1ZTtcbiAgICBjb25zb2xlLmxvZygnb3B0aW9uVmFsdWUnLCBvcHRpb25WYWx1ZSk7XG4gICAgLy8gSWYgaXQncyB1c2VkIHdpdGhpbiBhIGBOb3ZvRmllbGRgLCB3ZSBzaG91bGQgc2V0IGl0IHRocm91Z2ggdGhlIHByb3BlcnR5IHNvIGl0IGNhbiBnb1xuICAgIC8vIHRocm91Z2ggY2hhbmdlIGRldGVjdGlvbi5cbiAgICBpZiAodGhpcy5fZm9ybUZpZWxkKSB7XG4gICAgICBjb25zdCB7IGNvbnRyb2xUeXBlLCBsYXN0Q2FyZXRQb3NpdGlvbiA9IDAgfSA9IHRoaXMuX2Zvcm1GaWVsZC5fY29udHJvbDtcbiAgICAgIGlmIChjb250cm9sVHlwZSA9PT0gJ3RleHRhcmVhJykge1xuICAgICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLl9mb3JtRmllbGQuX2NvbnRyb2wudmFsdWUuc3BsaXQoJycpO1xuICAgICAgICBjdXJyZW50VmFsdWUuc3BsaWNlKGxhc3RDYXJldFBvc2l0aW9uLCAwLCBkaXNwbGF5VmFsdWUpO1xuICAgICAgICB0aGlzLl9mb3JtRmllbGQuX2NvbnRyb2wudmFsdWUgPSBjdXJyZW50VmFsdWUuam9pbignJyk7XG4gICAgICB9IGVsc2UgaWYgKGNvbnRyb2xUeXBlID09PSAnY2hpcC1saXN0Jykge1xuICAgICAgICBjb25zdCBjaGlwTGlzdCA9IHRoaXMuX2Zvcm1GaWVsZC5fY29udHJvbCBhcyBOb3ZvQ2hpcExpc3Q7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMuX2Zvcm1GaWVsZC5fY29udHJvbC52YWx1ZTtcbiAgICAgICAgaWYgKGN1cnJlbnRWYWx1ZS5pbmNsdWRlcyhvcHRpb25WYWx1ZSkpIHtcbiAgICAgICAgICBjaGlwTGlzdC5yZW1vdmVWYWx1ZShvcHRpb25WYWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2hpcExpc3QuYWRkVmFsdWUob3B0aW9uVmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgdmFsdWVUb0VtaXQ6IGFueSA9IG9wdGlvblZhbHVlO1xuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMuX2Zvcm1GaWVsZC5fY29udHJvbC52YWx1ZTtcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjdXJyZW50VmFsdWUpKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFZhbHVlLmluY2x1ZGVzKG9wdGlvblZhbHVlKSkge1xuICAgICAgICAgICAgICB2YWx1ZVRvRW1pdCA9IGN1cnJlbnRWYWx1ZS5maWx0ZXIoKGl0KSA9PiBpdCA9PT0gb3B0aW9uVmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdmFsdWVUb0VtaXQgPSBbLi4uY3VycmVudFZhbHVlLCBvcHRpb25WYWx1ZV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50VmFsdWUgPT09IG9wdGlvblZhbHVlKSB7XG4gICAgICAgICAgICB2YWx1ZVRvRW1pdCA9IFtdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YWx1ZVRvRW1pdCA9IFtjdXJyZW50VmFsdWUsIG9wdGlvblZhbHVlXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZm9ybUZpZWxkLl9jb250cm9sLnZhbHVlID0gdmFsdWVUb0VtaXQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZSA9IGlucHV0VmFsdWU7XG4gICAgICBjb25zb2xlLndhcm4oYEF1dG9Db21wbGV0ZSBvbmx5IGludGVuZGVkIHRvIGJlIHVzZWQgd2l0aGluIGEgTm92b0ZpZWxkYCk7XG4gICAgfVxuICAgIHRoaXMuX3ByZXZpb3VzVmFsdWUgPSBvcHRpb25WYWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBhbnkgcHJldmlvdXMgc2VsZWN0ZWQgb3B0aW9uIGFuZCBlbWl0IGEgc2VsZWN0aW9uIGNoYW5nZSBldmVudCBmb3IgdGhpcyBvcHRpb25cbiAgICovXG4gIHByaXZhdGUgX2NsZWFyUHJldmlvdXNTZWxlY3RlZE9wdGlvbihza2lwOiBOb3ZvT3B0aW9uKSB7XG4gICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgaWYgKG9wdGlvbiAhPT0gc2tpcCAmJiBvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgb3B0aW9uLmRlc2VsZWN0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKiogRW1pdHMgdGhlIGBzZWxlY3RgIGV2ZW50LiAqL1xuICBwcml2YXRlIF9lbWl0U2VsZWN0RXZlbnQob3B0aW9uOiBOb3ZvT3B0aW9uKTogdm9pZCB7XG4gICAgY29uc3QgZXZlbnQgPSBuZXcgTm92b09wdGlvblNlbGVjdGVkRXZlbnQodGhpcywgb3B0aW9uKTtcbiAgICB0aGlzLm9wdGlvblNlbGVjdGVkLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGNsb3NlcyB0aGUgcGFuZWwsIGFuZCBpZiBhIHZhbHVlIGlzIHNwZWNpZmllZCwgYWxzbyBzZXRzIHRoZSBhc3NvY2lhdGVkXG4gICAqIGNvbnRyb2wgdG8gdGhhdCB2YWx1ZS4gSXQgd2lsbCBhbHNvIG1hcmsgdGhlIGNvbnRyb2wgYXMgZGlydHkgaWYgdGhpcyBpbnRlcmFjdGlvblxuICAgKiBzdGVtbWVkIGZyb20gdGhlIHVzZXIuXG4gICAqL1xuICBwcml2YXRlIF9zZXRWYWx1ZUFuZENsb3NlKGV2ZW50OiBOb3ZvT3B0aW9uU2VsZWN0aW9uQ2hhbmdlIHwgbnVsbCk6IHZvaWQge1xuICAgIGlmIChldmVudCAmJiBldmVudC5zb3VyY2UpIHtcbiAgICAgIGlmICghdGhpcy5tdWx0aXBsZSkgdGhpcy5fY2xlYXJQcmV2aW91c1NlbGVjdGVkT3B0aW9uKGV2ZW50LnNvdXJjZSk7XG4gICAgICB0aGlzLl9zZXRUcmlnZ2VyVmFsdWUoZXZlbnQuc291cmNlKTtcbiAgICAgIC8vIHRoaXMuX29uQ2hhbmdlKGV2ZW50LnNvdXJjZS52YWx1ZSk7XG4gICAgICAvLyB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIC8vIHRoaXMuX2Zvcm1GaWVsZC5fY29udHJvbC5mb2N1cygpO1xuICAgICAgdGhpcy5fZW1pdFNlbGVjdEV2ZW50KGV2ZW50LnNvdXJjZSk7XG4gICAgICB0aGlzLl93YXRjaFNlbGVjdGlvbkV2ZW50cygpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5tdWx0aXBsZSkgdGhpcy5jbG9zZVBhbmVsKCk7XG4gIH1cblxuICBwcml2YXRlIF93YXRjaFNlbGVjdGlvbkV2ZW50cygpIHtcbiAgICBjb25zdCBzZWxlY3Rpb25FdmVudHMgPSB0aGlzLm9wdGlvbnMgPyBtZXJnZSguLi50aGlzLm9wdGlvbnMubWFwKChvcHRpb24pID0+IG9wdGlvbi5vblNlbGVjdGlvbkNoYW5nZSkpIDogb2YoKTtcbiAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkNoYW5nZXMudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkNoYW5nZXMgPSBzZWxlY3Rpb25FdmVudHMucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKGV2dDogTm92b09wdGlvblNlbGVjdGlvbkNoYW5nZSkgPT4ge1xuICAgICAgdGhpcy5fc2V0VmFsdWVBbmRDbG9zZShldnQpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfd2F0Y2hTdGF0ZUNoYW5nZXMoKSB7XG4gICAgY29uc3QgaW5wdXRTdGF0ZUNoYW5nZWQgPSB0aGlzLl9mb3JtRmllbGQuc3RhdGVDaGFuZ2VzO1xuICAgIHRoaXMuX3N0YXRlQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3N0YXRlQ2hhbmdlcyA9IG1lcmdlKGlucHV0U3RhdGVDaGFuZ2VkKVxuICAgICAgLnBpcGUoZGVib3VuY2UoKCkgPT4gaW50ZXJ2YWwoMTApKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnU3RhdGVDaGFnbicpO1xuICAgICAgICB0aGlzLmNoZWNrU2VsZWN0ZWRPcHRpb25zKCk7XG4gICAgICAgIHRoaXMuY2hlY2tQYW5lbCgpO1xuICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqIFRoZSBjdXJyZW50bHkgYWN0aXZlIG9wdGlvbiwgY29lcmNlZCB0byBNYXRPcHRpb24gdHlwZS4gKi9cbiAgZ2V0IGFjdGl2ZU9wdGlvbigpOiBOb3ZvT3B0aW9uIHwgbnVsbCB7XG4gICAgaWYgKHRoaXMuX2tleU1hbmFnZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLl9rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW07XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBfaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleTtcblxuICAgIC8vIFByZXZlbnQgdGhlIGRlZmF1bHQgYWN0aW9uIG9uIGFsbCBlc2NhcGUga2V5IHByZXNzZXMuIFRoaXMgaXMgaGVyZSBwcmltYXJpbHkgdG8gYnJpbmcgSUVcbiAgICAvLyBpbiBsaW5lIHdpdGggb3RoZXIgYnJvd3NlcnMuIEJ5IGRlZmF1bHQsIHByZXNzaW5nIGVzY2FwZSBvbiBJRSB3aWxsIGNhdXNlIGl0IHRvIHJldmVydFxuICAgIC8vIHRoZSBpbnB1dCB2YWx1ZSB0byB0aGUgb25lIHRoYXQgaXQgaGFkIG9uIGZvY3VzLCBob3dldmVyIGl0IHdvbid0IGRpc3BhdGNoIGFueSBldmVudHNcbiAgICAvLyB3aGljaCBtZWFucyB0aGF0IHRoZSBtb2RlbCB2YWx1ZSB3aWxsIGJlIG91dCBvZiBzeW5jIHdpdGggdGhlIHZpZXcuXG4gICAgaWYgKGtleSA9PT0gS2V5LkVzY2FwZSAmJiAhaGFzTW9kaWZpZXJLZXkoZXZlbnQpKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmFjdGl2ZU9wdGlvbiAmJiBrZXkgPT09IEtleS5FbnRlciAmJiB0aGlzLnBhbmVsT3Blbikge1xuICAgICAgdGhpcy5hY3RpdmVPcHRpb24uX3NlbGVjdFZpYUludGVyYWN0aW9uKCk7XG4gICAgICAvLyB0aGlzLl9yZXNldEFjdGl2ZUl0ZW0oKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHByZXZBY3RpdmVJdGVtID0gdGhpcy5fa2V5TWFuYWdlci5hY3RpdmVJdGVtO1xuICAgICAgY29uc3QgaXNBcnJvd0tleSA9IGtleSA9PT0gS2V5LkFycm93VXAgfHwga2V5ID09PSBLZXkuQXJyb3dEb3duO1xuXG4gICAgICBpZiAodGhpcy5wYW5lbE9wZW4gfHwga2V5ID09PSBLZXkuVGFiKSB7XG4gICAgICAgIHRoaXMuX2tleU1hbmFnZXIub25LZXlkb3duKGV2ZW50KTtcbiAgICAgIH0gZWxzZSBpZiAoaXNBcnJvd0tleSAmJiAhdGhpcy5vdmVybGF5LnBhbmVsT3Blbikge1xuICAgICAgICB0aGlzLm9wZW5QYW5lbCgpO1xuICAgICAgfVxuXG4gICAgICAvLyBpZiAoaXNBcnJvd0tleSB8fCB0aGlzLmF1dG9jb21wbGV0ZS5fa2V5TWFuYWdlci5hY3RpdmVJdGVtICE9PSBwcmV2QWN0aXZlSXRlbSkge1xuICAgICAgLy8gICB0aGlzLl9zY3JvbGxUb09wdGlvbih0aGlzLmF1dG9jb21wbGV0ZS5fa2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXggfHwgMCk7XG4gICAgICAvLyB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjaGVja1NlbGVjdGVkT3B0aW9ucygpIHtcbiAgICBpZiAodGhpcy5tdWx0aXBsZSAmJiBBcnJheS5pc0FycmF5KHRoaXMuX2Zvcm1GaWVsZC5fY29udHJvbC52YWx1ZSkpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5fZm9ybUZpZWxkLl9jb250cm9sLnZhbHVlO1xuICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4gb3B0aW9uLmRlc2VsZWN0KCkpO1xuICAgICAgdmFsdWUuZm9yRWFjaCgoY3VycmVudFZhbHVlOiBhbnkpID0+IHRoaXMuX3NlbGVjdFZhbHVlKGN1cnJlbnRWYWx1ZSkpO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogRmluZHMgYW5kIHNlbGVjdHMgYW5kIG9wdGlvbiBiYXNlZCBvbiBpdHMgdmFsdWUuXG4gICAqIEByZXR1cm5zIE9wdGlvbiB0aGF0IGhhcyB0aGUgY29ycmVzcG9uZGluZyB2YWx1ZS5cbiAgICovXG4gIHByaXZhdGUgX3NlbGVjdFZhbHVlKHZhbHVlOiBhbnkpOiBOb3ZvT3B0aW9uIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBjb3JyZXNwb25kaW5nT3B0aW9uID0gdGhpcy5vcHRpb25zLmZpbmQoKG9wdGlvbjogTm92b09wdGlvbikgPT4ge1xuICAgICAgcmV0dXJuIG9wdGlvbi52YWx1ZSA9PT0gdmFsdWU7XG4gICAgfSk7XG4gICAgY29ycmVzcG9uZGluZ09wdGlvbj8uc2VsZWN0KCk7XG4gICAgcmV0dXJuIGNvcnJlc3BvbmRpbmdPcHRpb247XG4gIH1cbn1cbiIsIjxub3ZvLW92ZXJsYXktdGVtcGxhdGUgW3BhcmVudF09XCJlbGVtZW50XCIgcG9zaXRpb249XCJhYm92ZS1iZWxvd1wiPlxuICA8ZGl2IGNsYXNzPVwibm92by1hdXRvY29tcGxldGUtb3B0aW9uc1wiIGNkay1zY3JvbGxhYmxlPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgPC9kaXY+XG48L25vdm8tb3ZlcmxheS10ZW1wbGF0ZT4iXX0=
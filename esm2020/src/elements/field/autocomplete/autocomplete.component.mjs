import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Inject, Input, Optional, Output, QueryList, ViewChild, ViewEncapsulation, } from '@angular/core';
import { fromEvent, merge, of, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
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
        return this._multiple || !!this._formField._control?.multiple || this._formField._control?.controlType === 'chip-list';
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
    _setTriggerValue(value) {
        const toDisplay = this.displayWith ? this.displayWith(value) : value;
        // Simply falling back to an empty string if the display value is falsy does not work properly.
        // The display value can also be the number zero and shouldn't fall back to an empty string.
        const inputValue = toDisplay != null ? toDisplay : '';
        // If it's used within a `NovoField`, we should set it through the property so it can go
        // through change detection.
        if (this._formField) {
            const { controlType, lastCaretPosition = 0 } = this._formField._control;
            if (controlType === 'textarea') {
                const currentValue = this._formField._control.value.split('');
                currentValue.splice(lastCaretPosition, 0, inputValue);
                this._formField._control.value = currentValue.join('');
            }
            else {
                let valueToEmit = inputValue;
                if (this.multiple) {
                    const currentValue = this._formField._control.value;
                    if (Array.isArray(currentValue)) {
                        valueToEmit = [...currentValue, inputValue];
                    }
                    else {
                        valueToEmit = [currentValue, inputValue];
                    }
                }
                this._formField._control.value = valueToEmit;
            }
        }
        else {
            // this._element.nativeElement.value = inputValue;
            console.warn(`AutoComplete only intended to be used within a NovoField`);
        }
        this._previousValue = inputValue;
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
            this._clearPreviousSelectedOption(event.source);
            this._setTriggerValue(event.source.value);
            // this._onChange(event.source.value);
            // this._element.nativeElement.focus();
            this._formField._control.focus();
            this._emitSelectEvent(event.source);
            this._watchSelectionEvents();
        }
        if (!this._multiple)
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
        const inputStateChanged = this._formField && this._formField._control ? this._formField._control.stateChanges : of();
        this._stateChanges.unsubscribe();
        this._stateChanges = merge(inputStateChanged).subscribe(() => {
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
}
NovoAutocompleteElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoAutocompleteElement, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: 'tabindex', attribute: true }, { token: NOVO_FORM_FIELD, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NovoAutocompleteElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: NovoAutocompleteElement, selector: "novo-autocomplete", inputs: { tabIndex: "tabIndex", triggerOn: "triggerOn", displayWith: "displayWith", ariaLabel: ["aria-label", "ariaLabel"], multiple: "multiple", disabled: "disabled" }, outputs: { optionSelected: "optionSelected", optionActivated: "optionActivated" }, host: { properties: { "attr.tabindex": "disabled ? null : -1" }, classAttribute: "novo-autocomplete" }, providers: [{ provide: NOVO_OPTION_PARENT_COMPONENT, useExisting: NovoAutocompleteElement }], queries: [{ propertyName: "optionGroups", predicate: NovoOptgroup, descendants: true }, { propertyName: "options", predicate: NovoOption, descendants: true }], viewQueries: [{ propertyName: "overlay", first: true, predicate: NovoOverlayTemplateComponent, descendants: true }], exportAs: ["novoAutocomplete"], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<novo-overlay-template [parent]=\"element\" position=\"above-below\">\n  <div class=\"novo-autocomplete-options\" cdk-scrollable>\n    <ng-content></ng-content>\n  </div>\n</novo-overlay-template>", styles: [".novo-autocomplete-options{background-color:var(--background-bright);cursor:default;list-style:none;-webkit-padding-start:0px!important;padding-inline-start:0px!important;box-shadow:0 -1px 3px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f}\n"], components: [{ type: i1.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "width", "height", "closeOnSelect", "parent"], outputs: ["select", "opening", "closing"] }], directives: [{ type: i2.CdkScrollable, selector: "[cdk-scrollable], [cdkScrollable]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoAutocompleteElement, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2ZpZWxkL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvZmllbGQvYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMvRCxPQUFPLEVBQWdCLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFHTCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFHTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFFVCxTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RDLE9BQU8sRUFJTCxhQUFhLEVBQ2IsWUFBWSxFQUNaLFlBQVksRUFDWixVQUFVLEVBRVYsNEJBQTRCLEdBQzdCLE1BQU0sY0FBYyxDQUFDO0FBQ3RCLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVB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c0JBQTdCLEtBQUs7dUJBQUMsWUFBWTtnQkFJZixRQUFRO3NCQURYLEtBQUs7Z0JBV0YsUUFBUTtzQkFEWCxLQUFLO2dCQWNOLE9BQU87c0JBRE4sU0FBUzt1QkFBQyw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IGhhc01vZGlmaWVyS2V5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIEFmdGVyVmlld0luaXQsXG4gIEF0dHJpYnV0ZSxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEtleSB9IGZyb20gJy4uLy4uLy4uL3V0aWxzJztcbmltcG9ydCB7IGZyb21FdmVudCwgbWVyZ2UsIG9mLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1xuICBDYW5EaXNhYmxlLFxuICBDYW5EaXNhYmxlQ3RvcixcbiAgSGFzT3ZlcmxheUN0b3IsXG4gIG1peGluRGlzYWJsZWQsXG4gIG1peGluT3ZlcmxheSxcbiAgTm92b09wdGdyb3VwLFxuICBOb3ZvT3B0aW9uLFxuICBOb3ZvT3B0aW9uU2VsZWN0aW9uQ2hhbmdlLFxuICBOT1ZPX09QVElPTl9QQVJFTlRfQ09NUE9ORU5ULFxufSBmcm9tICcuLi8uLi9jb21tb24nO1xuaW1wb3J0IHsgTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvbW1vbi9vdmVybGF5JztcbmltcG9ydCB7IE5vdm9GaWVsZEVsZW1lbnQsIE5PVk9fRk9STV9GSUVMRCB9IGZyb20gJy4uL2ZpZWxkJztcbmltcG9ydCB7IE5vdm9GaWVsZENvbnRyb2wgfSBmcm9tICcuLi9maWVsZC1jb250cm9sJztcblxuLyoqIEV2ZW50IG9iamVjdCB0aGF0IGlzIGVtaXR0ZWQgd2hlbiBhbiBhdXRvY29tcGxldGUgb3B0aW9uIGlzIHNlbGVjdGVkLiAqL1xuZXhwb3J0IGNsYXNzIE5vdm9PcHRpb25TZWxlY3RlZEV2ZW50IHtcbiAgY29uc3RydWN0b3IoXG4gICAgLyoqIFJlZmVyZW5jZSB0byB0aGUgYXV0b2NvbXBsZXRlIHBhbmVsIHRoYXQgZW1pdHRlZCB0aGUgZXZlbnQuICovXG4gICAgcHVibGljIHNvdXJjZTogTm92b0F1dG9jb21wbGV0ZUVsZW1lbnQsXG4gICAgLyoqIE9wdGlvbiB0aGF0IHdhcyBzZWxlY3RlZC4gKi9cbiAgICBwdWJsaWMgb3B0aW9uOiBOb3ZvT3B0aW9uLFxuICApIHt9XG59XG5cbi8vIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnNcbmNsYXNzIE5vdm9BdXRvY29tcGxldGVCYXNlIHtcbiAgY29uc3RydWN0b3IoKSB7fVxufVxuY29uc3QgTm92b0F1dG9jb21wbGV0ZU1peGluczogSGFzT3ZlcmxheUN0b3IgJiBDYW5EaXNhYmxlQ3RvciAmIHR5cGVvZiBOb3ZvQXV0b2NvbXBsZXRlQmFzZSA9IG1peGluT3ZlcmxheShcbiAgbWl4aW5EaXNhYmxlZChOb3ZvQXV0b2NvbXBsZXRlQmFzZSksXG4pO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWF1dG9jb21wbGV0ZScsXG4gIHRlbXBsYXRlVXJsOiAnYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2F1dG9jb21wbGV0ZS5jb21wb25lbnQuc2NzcyddLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLWF1dG9jb21wbGV0ZScsXG4gICAgLy8gQWx3YXlzIHNldCB0aGUgdGFiaW5kZXggdG8gLTEgc28gdGhhdCBpdCBkb2Vzbid0IG92ZXJsYXAgd2l0aCBhbnkgY3VzdG9tIHRhYmluZGV4IHRoZVxuICAgIC8vIGNvbnN1bWVyIG1heSBoYXZlIHByb3ZpZGVkLCB3aGlsZSBzdGlsbCBiZWluZyBhYmxlIHRvIHJlY2VpdmUgZm9jdXMuXG4gICAgJ1thdHRyLnRhYmluZGV4XSc6ICdkaXNhYmxlZCA/IG51bGwgOiAtMScsXG4gIH0sXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogTk9WT19PUFRJT05fUEFSRU5UX0NPTVBPTkVOVCwgdXNlRXhpc3Rpbmc6IE5vdm9BdXRvY29tcGxldGVFbGVtZW50IH1dLFxuICBleHBvcnRBczogJ25vdm9BdXRvY29tcGxldGUnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0F1dG9jb21wbGV0ZUVsZW1lbnRcbiAgZXh0ZW5kcyBOb3ZvQXV0b2NvbXBsZXRlTWl4aW5zXG4gIGltcGxlbWVudHMgQ2FuRGlzYWJsZSwgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3lcbntcbiAgcHJpdmF0ZSBfc3RhdGVDaGFuZ2VzID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9hY3RpdmVPcHRpb25DaGFuZ2VzID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9zZWxlY3RlZE9wdGlvbkNoYW5nZXMgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2tleURvd25DaGFuZ2VzID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIC8qKiBNYW5hZ2VzIGFjdGl2ZSBpdGVtIGluIG9wdGlvbiBsaXN0IGJhc2VkIG9uIGtleSBldmVudHMuICovXG4gIHByaXZhdGUgX2tleU1hbmFnZXI6IEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyPE5vdm9PcHRpb24+O1xuXG4gIC8qKiBPbGQgdmFsdWUgb2YgdGhlIG5hdGl2ZSBpbnB1dC4gVXNlZCB0byB3b3JrIGFyb3VuZCBpc3N1ZXMgd2l0aCB0aGUgYGlucHV0YCBldmVudCBvbiBJRS4gKi9cbiAgcHJpdmF0ZSBfcHJldmlvdXNWYWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbDtcblxuICBAQ29udGVudENoaWxkcmVuKE5vdm9PcHRncm91cCwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KSBvcHRpb25Hcm91cHM6IFF1ZXJ5TGlzdDxOb3ZvT3B0Z3JvdXA+O1xuICBAQ29udGVudENoaWxkcmVuKE5vdm9PcHRpb24sIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgb3B0aW9uczogUXVlcnlMaXN0PE5vdm9PcHRpb24+O1xuXG4gIC8qKiBFdmVudCB0aGF0IGlzIGVtaXR0ZWQgd2hlbmV2ZXIgYW4gb3B0aW9uIGZyb20gdGhlIGxpc3QgaXMgc2VsZWN0ZWQuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBvcHRpb25TZWxlY3RlZDogRXZlbnRFbWl0dGVyPE5vdm9PcHRpb25TZWxlY3RlZEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Tm92b09wdGlvblNlbGVjdGVkRXZlbnQ+KCk7XG4gIC8qKiBFbWl0cyB3aGVuZXZlciBhbiBvcHRpb24gaXMgYWN0aXZhdGVkIHVzaW5nIHRoZSBrZXlib2FyZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IG9wdGlvbkFjdGl2YXRlZDogRXZlbnRFbWl0dGVyPE5vdm9PcHRpb25TZWxlY3RlZEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Tm92b09wdGlvblNlbGVjdGVkRXZlbnQ+KCk7XG5cbiAgLyoqIFRhYmluZGV4IGZvciB0aGUgdG9nZ2xlLiAqL1xuICBASW5wdXQoKSB0YWJJbmRleDogbnVtYmVyIHwgbnVsbDtcblxuICAvKiogS2V5IHRvIHVzZSB0byB0cmlnZ2VyIGF1dG9jb21wbGV0ZS4gdXNlZCBmb3IgdGV4dGFyZWEuICovXG4gIEBJbnB1dCgpIHRyaWdnZXJPbjogKGNvbnRyb2w6IE5vdm9GaWVsZENvbnRyb2w8YW55PikgPT4gYm9vbGVhbiA9IChjb250cm9sKSA9PiBjb250cm9sLmZvY3VzZWQ7XG5cbiAgLyoqIEZ1bmN0aW9uIHRoYXQgbWFwcyBhbiBvcHRpb24ncyBjb250cm9sIHZhbHVlIHRvIGl0cyBkaXNwbGF5IHZhbHVlIGluIHRoZSB0cmlnZ2VyLiAqL1xuICBASW5wdXQoKSBkaXNwbGF5V2l0aDogKCh2YWx1ZTogYW55KSA9PiBzdHJpbmcpIHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqIFNjcmVlbnJlYWRlciBsYWJlbCBmb3IgdGhlIGJ1dHRvbi4gKi9cbiAgQElucHV0KCdhcmlhLWxhYmVsJykgYXJpYUxhYmVsOiBzdHJpbmc7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHVzZXIgc2hvdWxkIGJlIGFsbG93ZWQgdG8gc2VsZWN0IG11bHRpcGxlIG9wdGlvbnMuICovXG4gIEBJbnB1dCgpXG4gIGdldCBtdWx0aXBsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbXVsdGlwbGUgfHwgISF0aGlzLl9mb3JtRmllbGQuX2NvbnRyb2w/Lm11bHRpcGxlIHx8IHRoaXMuX2Zvcm1GaWVsZC5fY29udHJvbD8uY29udHJvbFR5cGUgPT09ICdjaGlwLWxpc3QnO1xuICB9XG4gIHNldCBtdWx0aXBsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX211bHRpcGxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9tdWx0aXBsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSB0b2dnbGUgYnV0dG9uIGlzIGRpc2FibGVkLiAqL1xuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuX2Rpc2FibGVkID09PSB1bmRlZmluZWQgJiYgdGhpcy5fZm9ybUZpZWxkPy5fY29udHJvbCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2Zvcm1GaWVsZC5fY29udHJvbC5kaXNhYmxlZDtcbiAgICB9XG4gICAgcmV0dXJuICEhdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuO1xuXG4gIC8qKiBFbGVtZW50IGZvciB0aGUgcGFuZWwgY29udGFpbmluZyB0aGUgYXV0b2NvbXBsZXRlIG9wdGlvbnMuICovXG4gIEBWaWV3Q2hpbGQoTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudClcbiAgb3ZlcmxheTogTm92b092ZXJsYXlUZW1wbGF0ZUNvbXBvbmVudDtcblxuICBlbGVtZW50OiBFbGVtZW50UmVmO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBBdHRyaWJ1dGUoJ3RhYmluZGV4JykgZGVmYXVsdFRhYkluZGV4OiBzdHJpbmcsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChOT1ZPX0ZPUk1fRklFTEQpIHByaXZhdGUgX2Zvcm1GaWVsZDogTm92b0ZpZWxkRWxlbWVudCxcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgICBjb25zdCBwYXJzZWRUYWJJbmRleCA9IE51bWJlcihkZWZhdWx0VGFiSW5kZXgpO1xuICAgIHRoaXMudGFiSW5kZXggPSBwYXJzZWRUYWJJbmRleCB8fCBwYXJzZWRUYWJJbmRleCA9PT0gMCA/IHBhcnNlZFRhYkluZGV4IDogbnVsbDtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICB0aGlzLl93YXRjaFN0YXRlQ2hhbmdlcygpO1xuICAgIHRoaXMuX3dhdGNoU2VsZWN0aW9uRXZlbnRzKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9zdGF0ZUNoYW5nZXMudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9hY3RpdmVPcHRpb25DaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25DaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fa2V5RG93bkNoYW5nZXMudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLl9rZXlNYW5hZ2VyID0gbmV3IEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyPE5vdm9PcHRpb24+KHRoaXMub3B0aW9ucykud2l0aFdyYXAoKTtcbiAgICB0aGlzLl9hY3RpdmVPcHRpb25DaGFuZ2VzID0gdGhpcy5fa2V5TWFuYWdlci5jaGFuZ2Uuc3Vic2NyaWJlKChpbmRleCkgPT4ge1xuICAgICAgdGhpcy5vcHRpb25BY3RpdmF0ZWQuZW1pdCh7IHNvdXJjZTogdGhpcywgb3B0aW9uOiB0aGlzLm9wdGlvbnMudG9BcnJheSgpW2luZGV4XSB8fCBudWxsIH0pO1xuICAgIH0pO1xuICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuX2Zvcm1GaWVsZC5nZXRDb25uZWN0ZWRPdmVybGF5T3JpZ2luKCkgfHwgdGhpcy5fZWxlbWVudFJlZjtcbiAgICB0aGlzLl9rZXlEb3duQ2hhbmdlcyA9IGZyb21FdmVudCh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2tleWRvd24nKS5zdWJzY3JpYmUoKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB0aGlzLl9oYW5kbGVLZXlkb3duKGV2ZW50KSk7XG4gICAgdGhpcy5vcHRpb25zLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuX3dhdGNoU3RhdGVDaGFuZ2VzKCk7XG4gICAgICB0aGlzLl93YXRjaFNlbGVjdGlvbkV2ZW50cygpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuX3dhdGNoU3RhdGVDaGFuZ2VzKCk7XG4gICAgdGhpcy5fd2F0Y2hTZWxlY3Rpb25FdmVudHMoKTtcbiAgfVxuXG4gIGNoZWNrUGFuZWwoKSB7XG4gICAgY29uc3QgaXNUcmlnZ2VyZWQgPSB0aGlzLnRyaWdnZXJPbih0aGlzLl9mb3JtRmllbGQuX2NvbnRyb2wpO1xuICAgIGlmIChpc1RyaWdnZXJlZCAmJiB0aGlzLmVsZW1lbnQpIHtcbiAgICAgIHRoaXMub3BlblBhbmVsKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc2V0VHJpZ2dlclZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCB0b0Rpc3BsYXkgPSB0aGlzLmRpc3BsYXlXaXRoID8gdGhpcy5kaXNwbGF5V2l0aCh2YWx1ZSkgOiB2YWx1ZTtcbiAgICAvLyBTaW1wbHkgZmFsbGluZyBiYWNrIHRvIGFuIGVtcHR5IHN0cmluZyBpZiB0aGUgZGlzcGxheSB2YWx1ZSBpcyBmYWxzeSBkb2VzIG5vdCB3b3JrIHByb3Blcmx5LlxuICAgIC8vIFRoZSBkaXNwbGF5IHZhbHVlIGNhbiBhbHNvIGJlIHRoZSBudW1iZXIgemVybyBhbmQgc2hvdWxkbid0IGZhbGwgYmFjayB0byBhbiBlbXB0eSBzdHJpbmcuXG4gICAgY29uc3QgaW5wdXRWYWx1ZSA9IHRvRGlzcGxheSAhPSBudWxsID8gdG9EaXNwbGF5IDogJyc7XG4gICAgLy8gSWYgaXQncyB1c2VkIHdpdGhpbiBhIGBOb3ZvRmllbGRgLCB3ZSBzaG91bGQgc2V0IGl0IHRocm91Z2ggdGhlIHByb3BlcnR5IHNvIGl0IGNhbiBnb1xuICAgIC8vIHRocm91Z2ggY2hhbmdlIGRldGVjdGlvbi5cbiAgICBpZiAodGhpcy5fZm9ybUZpZWxkKSB7XG4gICAgICBjb25zdCB7IGNvbnRyb2xUeXBlLCBsYXN0Q2FyZXRQb3NpdGlvbiA9IDAgfSA9IHRoaXMuX2Zvcm1GaWVsZC5fY29udHJvbDtcbiAgICAgIGlmIChjb250cm9sVHlwZSA9PT0gJ3RleHRhcmVhJykge1xuICAgICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLl9mb3JtRmllbGQuX2NvbnRyb2wudmFsdWUuc3BsaXQoJycpO1xuICAgICAgICBjdXJyZW50VmFsdWUuc3BsaWNlKGxhc3RDYXJldFBvc2l0aW9uLCAwLCBpbnB1dFZhbHVlKTtcbiAgICAgICAgdGhpcy5fZm9ybUZpZWxkLl9jb250cm9sLnZhbHVlID0gY3VycmVudFZhbHVlLmpvaW4oJycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHZhbHVlVG9FbWl0OiBhbnkgPSBpbnB1dFZhbHVlO1xuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMuX2Zvcm1GaWVsZC5fY29udHJvbC52YWx1ZTtcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjdXJyZW50VmFsdWUpKSB7XG4gICAgICAgICAgICB2YWx1ZVRvRW1pdCA9IFsuLi5jdXJyZW50VmFsdWUsIGlucHV0VmFsdWVdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YWx1ZVRvRW1pdCA9IFtjdXJyZW50VmFsdWUsIGlucHV0VmFsdWVdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9mb3JtRmllbGQuX2NvbnRyb2wudmFsdWUgPSB2YWx1ZVRvRW1pdDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlID0gaW5wdXRWYWx1ZTtcbiAgICAgIGNvbnNvbGUud2FybihgQXV0b0NvbXBsZXRlIG9ubHkgaW50ZW5kZWQgdG8gYmUgdXNlZCB3aXRoaW4gYSBOb3ZvRmllbGRgKTtcbiAgICB9XG4gICAgdGhpcy5fcHJldmlvdXNWYWx1ZSA9IGlucHV0VmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgYW55IHByZXZpb3VzIHNlbGVjdGVkIG9wdGlvbiBhbmQgZW1pdCBhIHNlbGVjdGlvbiBjaGFuZ2UgZXZlbnQgZm9yIHRoaXMgb3B0aW9uXG4gICAqL1xuICBwcml2YXRlIF9jbGVhclByZXZpb3VzU2VsZWN0ZWRPcHRpb24oc2tpcDogTm92b09wdGlvbikge1xuICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgIGlmIChvcHRpb24gIT09IHNraXAgJiYgb3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgIG9wdGlvbi5kZXNlbGVjdCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqIEVtaXRzIHRoZSBgc2VsZWN0YCBldmVudC4gKi9cbiAgcHJpdmF0ZSBfZW1pdFNlbGVjdEV2ZW50KG9wdGlvbjogTm92b09wdGlvbik6IHZvaWQge1xuICAgIGNvbnN0IGV2ZW50ID0gbmV3IE5vdm9PcHRpb25TZWxlY3RlZEV2ZW50KHRoaXMsIG9wdGlvbik7XG4gICAgdGhpcy5vcHRpb25TZWxlY3RlZC5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBjbG9zZXMgdGhlIHBhbmVsLCBhbmQgaWYgYSB2YWx1ZSBpcyBzcGVjaWZpZWQsIGFsc28gc2V0cyB0aGUgYXNzb2NpYXRlZFxuICAgKiBjb250cm9sIHRvIHRoYXQgdmFsdWUuIEl0IHdpbGwgYWxzbyBtYXJrIHRoZSBjb250cm9sIGFzIGRpcnR5IGlmIHRoaXMgaW50ZXJhY3Rpb25cbiAgICogc3RlbW1lZCBmcm9tIHRoZSB1c2VyLlxuICAgKi9cbiAgcHJpdmF0ZSBfc2V0VmFsdWVBbmRDbG9zZShldmVudDogTm92b09wdGlvblNlbGVjdGlvbkNoYW5nZSB8IG51bGwpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc291cmNlKSB7XG4gICAgICB0aGlzLl9jbGVhclByZXZpb3VzU2VsZWN0ZWRPcHRpb24oZXZlbnQuc291cmNlKTtcbiAgICAgIHRoaXMuX3NldFRyaWdnZXJWYWx1ZShldmVudC5zb3VyY2UudmFsdWUpO1xuICAgICAgLy8gdGhpcy5fb25DaGFuZ2UoZXZlbnQuc291cmNlLnZhbHVlKTtcbiAgICAgIC8vIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgdGhpcy5fZm9ybUZpZWxkLl9jb250cm9sLmZvY3VzKCk7XG4gICAgICB0aGlzLl9lbWl0U2VsZWN0RXZlbnQoZXZlbnQuc291cmNlKTtcbiAgICAgIHRoaXMuX3dhdGNoU2VsZWN0aW9uRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9tdWx0aXBsZSkgdGhpcy5jbG9zZVBhbmVsKCk7XG4gIH1cblxuICBwcml2YXRlIF93YXRjaFNlbGVjdGlvbkV2ZW50cygpIHtcbiAgICBjb25zdCBzZWxlY3Rpb25FdmVudHMgPSB0aGlzLm9wdGlvbnMgPyBtZXJnZSguLi50aGlzLm9wdGlvbnMubWFwKChvcHRpb24pID0+IG9wdGlvbi5vblNlbGVjdGlvbkNoYW5nZSkpIDogb2YoKTtcbiAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkNoYW5nZXMudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkNoYW5nZXMgPSBzZWxlY3Rpb25FdmVudHMucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKGV2dDogTm92b09wdGlvblNlbGVjdGlvbkNoYW5nZSkgPT4ge1xuICAgICAgdGhpcy5fc2V0VmFsdWVBbmRDbG9zZShldnQpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfd2F0Y2hTdGF0ZUNoYW5nZXMoKSB7XG4gICAgY29uc3QgaW5wdXRTdGF0ZUNoYW5nZWQgPSB0aGlzLl9mb3JtRmllbGQgJiYgdGhpcy5fZm9ybUZpZWxkLl9jb250cm9sID8gdGhpcy5fZm9ybUZpZWxkLl9jb250cm9sLnN0YXRlQ2hhbmdlcyA6IG9mKCk7XG4gICAgdGhpcy5fc3RhdGVDaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fc3RhdGVDaGFuZ2VzID0gbWVyZ2UoaW5wdXRTdGF0ZUNoYW5nZWQpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmNoZWNrUGFuZWwoKTtcbiAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIFRoZSBjdXJyZW50bHkgYWN0aXZlIG9wdGlvbiwgY29lcmNlZCB0byBNYXRPcHRpb24gdHlwZS4gKi9cbiAgZ2V0IGFjdGl2ZU9wdGlvbigpOiBOb3ZvT3B0aW9uIHwgbnVsbCB7XG4gICAgaWYgKHRoaXMuX2tleU1hbmFnZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLl9rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW07XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBfaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleTtcblxuICAgIC8vIFByZXZlbnQgdGhlIGRlZmF1bHQgYWN0aW9uIG9uIGFsbCBlc2NhcGUga2V5IHByZXNzZXMuIFRoaXMgaXMgaGVyZSBwcmltYXJpbHkgdG8gYnJpbmcgSUVcbiAgICAvLyBpbiBsaW5lIHdpdGggb3RoZXIgYnJvd3NlcnMuIEJ5IGRlZmF1bHQsIHByZXNzaW5nIGVzY2FwZSBvbiBJRSB3aWxsIGNhdXNlIGl0IHRvIHJldmVydFxuICAgIC8vIHRoZSBpbnB1dCB2YWx1ZSB0byB0aGUgb25lIHRoYXQgaXQgaGFkIG9uIGZvY3VzLCBob3dldmVyIGl0IHdvbid0IGRpc3BhdGNoIGFueSBldmVudHNcbiAgICAvLyB3aGljaCBtZWFucyB0aGF0IHRoZSBtb2RlbCB2YWx1ZSB3aWxsIGJlIG91dCBvZiBzeW5jIHdpdGggdGhlIHZpZXcuXG4gICAgaWYgKGtleSA9PT0gS2V5LkVzY2FwZSAmJiAhaGFzTW9kaWZpZXJLZXkoZXZlbnQpKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmFjdGl2ZU9wdGlvbiAmJiBrZXkgPT09IEtleS5FbnRlciAmJiB0aGlzLnBhbmVsT3Blbikge1xuICAgICAgdGhpcy5hY3RpdmVPcHRpb24uX3NlbGVjdFZpYUludGVyYWN0aW9uKCk7XG4gICAgICAvLyB0aGlzLl9yZXNldEFjdGl2ZUl0ZW0oKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHByZXZBY3RpdmVJdGVtID0gdGhpcy5fa2V5TWFuYWdlci5hY3RpdmVJdGVtO1xuICAgICAgY29uc3QgaXNBcnJvd0tleSA9IGtleSA9PT0gS2V5LkFycm93VXAgfHwga2V5ID09PSBLZXkuQXJyb3dEb3duO1xuXG4gICAgICBpZiAodGhpcy5wYW5lbE9wZW4gfHwga2V5ID09PSBLZXkuVGFiKSB7XG4gICAgICAgIHRoaXMuX2tleU1hbmFnZXIub25LZXlkb3duKGV2ZW50KTtcbiAgICAgIH0gZWxzZSBpZiAoaXNBcnJvd0tleSAmJiAhdGhpcy5vdmVybGF5LnBhbmVsT3Blbikge1xuICAgICAgICB0aGlzLm9wZW5QYW5lbCgpO1xuICAgICAgfVxuXG4gICAgICAvLyBpZiAoaXNBcnJvd0tleSB8fCB0aGlzLmF1dG9jb21wbGV0ZS5fa2V5TWFuYWdlci5hY3RpdmVJdGVtICE9PSBwcmV2QWN0aXZlSXRlbSkge1xuICAgICAgLy8gICB0aGlzLl9zY3JvbGxUb09wdGlvbih0aGlzLmF1dG9jb21wbGV0ZS5fa2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXggfHwgMCk7XG4gICAgICAvLyB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG59XG4iLCI8bm92by1vdmVybGF5LXRlbXBsYXRlIFtwYXJlbnRdPVwiZWxlbWVudFwiIHBvc2l0aW9uPVwiYWJvdmUtYmVsb3dcIj5cbiAgPGRpdiBjbGFzcz1cIm5vdm8tYXV0b2NvbXBsZXRlLW9wdGlvbnNcIiBjZGstc2Nyb2xsYWJsZT5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIDwvZGl2PlxuPC9ub3ZvLW92ZXJsYXktdGVtcGxhdGU+Il19
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { Directive, ElementRef, EventEmitter, forwardRef, Inject, Input, Output } from '@angular/core';
import { NOVO_CHIPS_DEFAULT_OPTIONS } from './ChipDefaults';
import { NovoChipList } from './ChipList';
import * as i0 from "@angular/core";
import * as i1 from "./ChipList";
// Increasing integer for generating unique ids.
let nextUniqueId = 0;
/**
 * Directive that adds chip-specific behaviors to an input element inside `<mat-form-field>`.
 * May be placed inside or outside of an `<mat-chip-list>`.
 */
export class NovoChipInput {
    constructor(_elementRef, _defaultOptions, _chipList) {
        this._elementRef = _elementRef;
        this._defaultOptions = _defaultOptions;
        this._chipList = _chipList;
        /** Whether the control is focused. */
        this.focused = false;
        this._addOnBlur = false;
        /**
         * The list of key codes that will trigger a chipEnd event.
         *
         * Defaults to `[Key.Enter]`.
         */
        this.separatorKeyCodes = this._defaultOptions.separatorKeyCodes;
        /** Emitted when a chip is to be added. */
        this.chipEnd = new EventEmitter();
        /** The input's placeholder text. */
        this.placeholder = '';
        /** Unique id for the input. */
        this.id = `mat-chip-list-input-${nextUniqueId++}`;
        this._disabled = false;
        this._inputElement = this._elementRef.nativeElement;
        this._chipList.registerInput(this);
    }
    /**
     * Whether or not the chipEnd event will be emitted when the input is blurred.
     */
    get addOnBlur() {
        return this._addOnBlur;
    }
    set addOnBlur(value) {
        this._addOnBlur = coerceBooleanProperty(value);
    }
    /** Whether the input is disabled. */
    get disabled() {
        return this._disabled || (this._chipList && this._chipList.disabled);
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    /** Whether the input is empty. */
    get empty() {
        return !this._inputElement.value;
    }
    ngOnChanges() {
        this._chipList.stateChanges.next();
    }
    /** Utility method to make host definition/tests more clear. */
    _keydown(event) {
        // Allow the user's focus to escape when they're tabbing forward. Note that we don't
        // want to do this when going backwards, because focus should go back to the first chip.
        if (event && event.key === "Tab" /* Tab */ && !hasModifierKey(event, 'shiftKey')) {
            this._chipList._allowFocusEscape();
        }
        this._emitChipEnd(event);
    }
    /** Checks to see if the blur should emit the (chipEnd) event. */
    _blur() {
        if (this.addOnBlur) {
            this._emitChipEnd();
        }
        this.focused = false;
        // Blur the chip list if it is not focused
        if (!this._chipList.focused) {
            this._chipList._blur();
        }
        this._chipList.stateChanges.next();
    }
    _focus() {
        this.focused = true;
        this._chipList.stateChanges.next();
    }
    /** Checks to see if the (chipEnd) event needs to be emitted. */
    _emitChipEnd(event) {
        if (!this._inputElement.value && !!event) {
            this._chipList._keydown(event);
        }
        if (!event || this._isSeparatorKey(event)) {
            this.chipEnd.emit({ input: this._inputElement, value: this._inputElement.value });
            if (event) {
                event.preventDefault();
            }
        }
    }
    _onInput() {
        // Let chip list know whenever the value changes.
        this._chipList.stateChanges.next();
    }
    /** Focuses the input. */
    focus(options) {
        this._inputElement.focus(options);
    }
    /** Checks whether a keycode is one of the configured separators. */
    _isSeparatorKey(event) {
        return !hasModifierKey(event) && new Set(this.separatorKeyCodes).has(event.key);
    }
}
NovoChipInput.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoChipInput, deps: [{ token: i0.ElementRef }, { token: NOVO_CHIPS_DEFAULT_OPTIONS }, { token: forwardRef(() => NovoChipList) }], target: i0.ɵɵFactoryTarget.Directive });
NovoChipInput.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoChipInput, selector: "input[novoChipInput]", inputs: { addOnBlur: ["novoChipInputAddOnBlur", "addOnBlur"], separatorKeyCodes: ["novoChipInputSeparatorKeyCodes", "separatorKeyCodes"], placeholder: "placeholder", id: "id", disabled: "disabled" }, outputs: { chipEnd: "novoChipInputTokenEnd" }, host: { listeners: { "keydown": "_keydown($event)", "blur": "_blur()", "focus": "_focus()", "input": "_onInput()" }, properties: { "id": "id", "attr.disabled": "disabled || null", "attr.placeholder": "placeholder || null", "attr.aria-invalid": "_chipList && _chipList.ngControl ? _chipList.ngControl.invalid : null", "attr.aria-required": "_chipList && _chipList.required || null" }, classAttribute: "novo-chip-input novo-input-element" }, exportAs: ["novoChipInput", "novoChipInputFor"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoChipInput, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[novoChipInput]',
                    exportAs: 'novoChipInput, novoChipInputFor',
                    host: {
                        class: 'novo-chip-input novo-input-element',
                        '(keydown)': '_keydown($event)',
                        '(blur)': '_blur()',
                        '(focus)': '_focus()',
                        '(input)': '_onInput()',
                        '[id]': 'id',
                        '[attr.disabled]': 'disabled || null',
                        '[attr.placeholder]': 'placeholder || null',
                        '[attr.aria-invalid]': '_chipList && _chipList.ngControl ? _chipList.ngControl.invalid : null',
                        '[attr.aria-required]': '_chipList && _chipList.required || null',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [NOVO_CHIPS_DEFAULT_OPTIONS]
                }] }, { type: i1.NovoChipList, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => NovoChipList)]
                }] }]; }, propDecorators: { addOnBlur: [{
                type: Input,
                args: ['novoChipInputAddOnBlur']
            }], separatorKeyCodes: [{
                type: Input,
                args: ['novoChipInputSeparatorKeyCodes']
            }], chipEnd: [{
                type: Output,
                args: ['novoChipInputTokenEnd']
            }], placeholder: [{
                type: Input
            }], id: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hpcElucHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvY2hpcHMvQ2hpcElucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBZ0IscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVsSCxPQUFPLEVBQTJCLDBCQUEwQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFlBQVksQ0FBQzs7O0FBWTFDLGdEQUFnRDtBQUNoRCxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7QUFFckI7OztHQUdHO0FBaUJILE1BQU0sT0FBTyxhQUFhO0lBb0R4QixZQUNZLFdBQXlDLEVBQ1AsZUFBd0MsRUFDcEMsU0FBdUI7UUFGN0QsZ0JBQVcsR0FBWCxXQUFXLENBQThCO1FBQ1Asb0JBQWUsR0FBZixlQUFlLENBQXlCO1FBQ3BDLGNBQVMsR0FBVCxTQUFTLENBQWM7UUF0RHpFLHNDQUFzQztRQUN0QyxZQUFPLEdBQVksS0FBSyxDQUFDO1FBWXpCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFFNUI7Ozs7V0FJRztRQUVILHNCQUFpQixHQUFzQixJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDO1FBRTlFLDBDQUEwQztRQUUxQyxZQUFPLEdBQXFDLElBQUksWUFBWSxFQUFzQixDQUFDO1FBRW5GLG9DQUFvQztRQUMzQixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUVsQywrQkFBK0I7UUFDdEIsT0FBRSxHQUFXLHVCQUF1QixZQUFZLEVBQUUsRUFBRSxDQUFDO1FBVXRELGNBQVMsR0FBWSxLQUFLLENBQUM7UUFlakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWlDLENBQUM7UUFDeEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQXZERDs7T0FFRztJQUNILElBQ0ksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBQ0QsSUFBSSxTQUFTLENBQUMsS0FBYztRQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFxQkQscUNBQXFDO0lBQ3JDLElBQ0ksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBYztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFHRCxrQ0FBa0M7SUFDbEMsSUFBSSxLQUFLO1FBQ1AsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQ25DLENBQUM7SUFjRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVELCtEQUErRDtJQUMvRCxRQUFRLENBQUMsS0FBcUI7UUFDNUIsb0ZBQW9GO1FBQ3BGLHdGQUF3RjtRQUN4RixJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsR0FBRyxvQkFBWSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsRUFBRTtZQUN4RSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDcEM7UUFFRCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxpRUFBaUU7SUFDakUsS0FBSztRQUNILElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDckI7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQiwwQ0FBMEM7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFO1lBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDeEI7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxnRUFBZ0U7SUFDaEUsWUFBWSxDQUFDLEtBQXFCO1FBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFO1lBQ3hDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2hDO1FBQ0QsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3pDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUVsRixJQUFJLEtBQUssRUFBRTtnQkFDVCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDeEI7U0FDRjtJQUNILENBQUM7SUFFRCxRQUFRO1FBQ04saURBQWlEO1FBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRCx5QkFBeUI7SUFDekIsS0FBSyxDQUFDLE9BQXNCO1FBQzFCLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxvRUFBb0U7SUFDNUQsZUFBZSxDQUFDLEtBQW9CO1FBQzFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsRixDQUFDOzsyR0F6SFUsYUFBYSw0Q0FzRGQsMEJBQTBCLGFBQzFCLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUM7K0ZBdkQ3QixhQUFhOzRGQUFiLGFBQWE7a0JBaEJ6QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLFFBQVEsRUFBRSxpQ0FBaUM7b0JBQzNDLElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUsb0NBQW9DO3dCQUMzQyxXQUFXLEVBQUUsa0JBQWtCO3dCQUMvQixRQUFRLEVBQUUsU0FBUzt3QkFDbkIsU0FBUyxFQUFFLFVBQVU7d0JBQ3JCLFNBQVMsRUFBRSxZQUFZO3dCQUN2QixNQUFNLEVBQUUsSUFBSTt3QkFDWixpQkFBaUIsRUFBRSxrQkFBa0I7d0JBQ3JDLG9CQUFvQixFQUFFLHFCQUFxQjt3QkFDM0MscUJBQXFCLEVBQUUsdUVBQXVFO3dCQUM5RixzQkFBc0IsRUFBRSx5Q0FBeUM7cUJBQ2xFO2lCQUNGOzswQkF1REksTUFBTTsyQkFBQywwQkFBMEI7OzBCQUNqQyxNQUFNOzJCQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUM7NENBL0NwQyxTQUFTO3NCQURaLEtBQUs7dUJBQUMsd0JBQXdCO2dCQWUvQixpQkFBaUI7c0JBRGhCLEtBQUs7dUJBQUMsZ0NBQWdDO2dCQUt2QyxPQUFPO3NCQUROLE1BQU07dUJBQUMsdUJBQXVCO2dCQUl0QixXQUFXO3NCQUFuQixLQUFLO2dCQUdHLEVBQUU7c0JBQVYsS0FBSztnQkFJRixRQUFRO3NCQURYLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBoYXNNb2RpZmllcktleSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSW5qZWN0LCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEtleSB9IGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCB7IE5vdm9DaGlwc0RlZmF1bHRPcHRpb25zLCBOT1ZPX0NISVBTX0RFRkFVTFRfT1BUSU9OUyB9IGZyb20gJy4vQ2hpcERlZmF1bHRzJztcbmltcG9ydCB7IE5vdm9DaGlwTGlzdCB9IGZyb20gJy4vQ2hpcExpc3QnO1xuaW1wb3J0IHsgTm92b0NoaXBUZXh0Q29udHJvbCB9IGZyb20gJy4vQ2hpcFRleHRDb250cm9sJztcblxuLyoqIFJlcHJlc2VudHMgYW4gaW5wdXQgZXZlbnQgb24gYSBgbm92b0NoaXBJbnB1dGAuICovXG5leHBvcnQgaW50ZXJmYWNlIE5vdm9DaGlwSW5wdXRFdmVudCB7XG4gIC8qKiBUaGUgbmF0aXZlIGA8aW5wdXQ+YCBlbGVtZW50IHRoYXQgdGhlIGV2ZW50IGlzIGJlaW5nIGZpcmVkIGZvci4gKi9cbiAgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgLyoqIFRoZSB2YWx1ZSBvZiB0aGUgaW5wdXQuICovXG4gIHZhbHVlOiBzdHJpbmc7XG59XG5cbi8vIEluY3JlYXNpbmcgaW50ZWdlciBmb3IgZ2VuZXJhdGluZyB1bmlxdWUgaWRzLlxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRoYXQgYWRkcyBjaGlwLXNwZWNpZmljIGJlaGF2aW9ycyB0byBhbiBpbnB1dCBlbGVtZW50IGluc2lkZSBgPG1hdC1mb3JtLWZpZWxkPmAuXG4gKiBNYXkgYmUgcGxhY2VkIGluc2lkZSBvciBvdXRzaWRlIG9mIGFuIGA8bWF0LWNoaXAtbGlzdD5gLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdpbnB1dFtub3ZvQ2hpcElucHV0XScsXG4gIGV4cG9ydEFzOiAnbm92b0NoaXBJbnB1dCwgbm92b0NoaXBJbnB1dEZvcicsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tY2hpcC1pbnB1dCBub3ZvLWlucHV0LWVsZW1lbnQnLFxuICAgICcoa2V5ZG93biknOiAnX2tleWRvd24oJGV2ZW50KScsXG4gICAgJyhibHVyKSc6ICdfYmx1cigpJyxcbiAgICAnKGZvY3VzKSc6ICdfZm9jdXMoKScsXG4gICAgJyhpbnB1dCknOiAnX29uSW5wdXQoKScsXG4gICAgJ1tpZF0nOiAnaWQnLFxuICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gICAgJ1thdHRyLnBsYWNlaG9sZGVyXSc6ICdwbGFjZWhvbGRlciB8fCBudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1pbnZhbGlkXSc6ICdfY2hpcExpc3QgJiYgX2NoaXBMaXN0Lm5nQ29udHJvbCA/IF9jaGlwTGlzdC5uZ0NvbnRyb2wuaW52YWxpZCA6IG51bGwnLFxuICAgICdbYXR0ci5hcmlhLXJlcXVpcmVkXSc6ICdfY2hpcExpc3QgJiYgX2NoaXBMaXN0LnJlcXVpcmVkIHx8IG51bGwnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQ2hpcElucHV0IGltcGxlbWVudHMgTm92b0NoaXBUZXh0Q29udHJvbCwgT25DaGFuZ2VzIHtcbiAgLyoqIFdoZXRoZXIgdGhlIGNvbnRyb2wgaXMgZm9jdXNlZC4gKi9cbiAgZm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIG9yIG5vdCB0aGUgY2hpcEVuZCBldmVudCB3aWxsIGJlIGVtaXR0ZWQgd2hlbiB0aGUgaW5wdXQgaXMgYmx1cnJlZC5cbiAgICovXG4gIEBJbnB1dCgnbm92b0NoaXBJbnB1dEFkZE9uQmx1cicpXG4gIGdldCBhZGRPbkJsdXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2FkZE9uQmx1cjtcbiAgfVxuICBzZXQgYWRkT25CbHVyKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fYWRkT25CbHVyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBfYWRkT25CbHVyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFRoZSBsaXN0IG9mIGtleSBjb2RlcyB0aGF0IHdpbGwgdHJpZ2dlciBhIGNoaXBFbmQgZXZlbnQuXG4gICAqXG4gICAqIERlZmF1bHRzIHRvIGBbS2V5LkVudGVyXWAuXG4gICAqL1xuICBASW5wdXQoJ25vdm9DaGlwSW5wdXRTZXBhcmF0b3JLZXlDb2RlcycpXG4gIHNlcGFyYXRvcktleUNvZGVzOiByZWFkb25seSBzdHJpbmdbXSA9IHRoaXMuX2RlZmF1bHRPcHRpb25zLnNlcGFyYXRvcktleUNvZGVzO1xuXG4gIC8qKiBFbWl0dGVkIHdoZW4gYSBjaGlwIGlzIHRvIGJlIGFkZGVkLiAqL1xuICBAT3V0cHV0KCdub3ZvQ2hpcElucHV0VG9rZW5FbmQnKVxuICBjaGlwRW5kOiBFdmVudEVtaXR0ZXI8Tm92b0NoaXBJbnB1dEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Tm92b0NoaXBJbnB1dEV2ZW50PigpO1xuXG4gIC8qKiBUaGUgaW5wdXQncyBwbGFjZWhvbGRlciB0ZXh0LiAqL1xuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nID0gJyc7XG5cbiAgLyoqIFVuaXF1ZSBpZCBmb3IgdGhlIGlucHV0LiAqL1xuICBASW5wdXQoKSBpZDogc3RyaW5nID0gYG1hdC1jaGlwLWxpc3QtaW5wdXQtJHtuZXh0VW5pcXVlSWQrK31gO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBpbnB1dCBpcyBkaXNhYmxlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZCB8fCAodGhpcy5fY2hpcExpc3QgJiYgdGhpcy5fY2hpcExpc3QuZGlzYWJsZWQpO1xuICB9XG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBpbnB1dCBpcyBlbXB0eS4gKi9cbiAgZ2V0IGVtcHR5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5faW5wdXRFbGVtZW50LnZhbHVlO1xuICB9XG5cbiAgLyoqIFRoZSBuYXRpdmUgaW5wdXQgZWxlbWVudCB0byB3aGljaCB0aGlzIGRpcmVjdGl2ZSBpcyBhdHRhY2hlZC4gKi9cbiAgcHJvdGVjdGVkIF9pbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+LFxuICAgIEBJbmplY3QoTk9WT19DSElQU19ERUZBVUxUX09QVElPTlMpIHByaXZhdGUgX2RlZmF1bHRPcHRpb25zOiBOb3ZvQ2hpcHNEZWZhdWx0T3B0aW9ucyxcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTm92b0NoaXBMaXN0KSkgcHJpdmF0ZSBfY2hpcExpc3Q6IE5vdm9DaGlwTGlzdCxcbiAgKSB7XG4gICAgdGhpcy5faW5wdXRFbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgdGhpcy5fY2hpcExpc3QucmVnaXN0ZXJJbnB1dCh0aGlzKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMuX2NoaXBMaXN0LnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gIH1cblxuICAvKiogVXRpbGl0eSBtZXRob2QgdG8gbWFrZSBob3N0IGRlZmluaXRpb24vdGVzdHMgbW9yZSBjbGVhci4gKi9cbiAgX2tleWRvd24oZXZlbnQ/OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgLy8gQWxsb3cgdGhlIHVzZXIncyBmb2N1cyB0byBlc2NhcGUgd2hlbiB0aGV5J3JlIHRhYmJpbmcgZm9yd2FyZC4gTm90ZSB0aGF0IHdlIGRvbid0XG4gICAgLy8gd2FudCB0byBkbyB0aGlzIHdoZW4gZ29pbmcgYmFja3dhcmRzLCBiZWNhdXNlIGZvY3VzIHNob3VsZCBnbyBiYWNrIHRvIHRoZSBmaXJzdCBjaGlwLlxuICAgIGlmIChldmVudCAmJiBldmVudC5rZXkgPT09IEtleS5UYWIgJiYgIWhhc01vZGlmaWVyS2V5KGV2ZW50LCAnc2hpZnRLZXknKSkge1xuICAgICAgdGhpcy5fY2hpcExpc3QuX2FsbG93Rm9jdXNFc2NhcGUoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9lbWl0Q2hpcEVuZChldmVudCk7XG4gIH1cblxuICAvKiogQ2hlY2tzIHRvIHNlZSBpZiB0aGUgYmx1ciBzaG91bGQgZW1pdCB0aGUgKGNoaXBFbmQpIGV2ZW50LiAqL1xuICBfYmx1cigpIHtcbiAgICBpZiAodGhpcy5hZGRPbkJsdXIpIHtcbiAgICAgIHRoaXMuX2VtaXRDaGlwRW5kKCk7XG4gICAgfVxuICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICAgIC8vIEJsdXIgdGhlIGNoaXAgbGlzdCBpZiBpdCBpcyBub3QgZm9jdXNlZFxuICAgIGlmICghdGhpcy5fY2hpcExpc3QuZm9jdXNlZCkge1xuICAgICAgdGhpcy5fY2hpcExpc3QuX2JsdXIoKTtcbiAgICB9XG4gICAgdGhpcy5fY2hpcExpc3Quc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgfVxuXG4gIF9mb2N1cygpIHtcbiAgICB0aGlzLmZvY3VzZWQgPSB0cnVlO1xuICAgIHRoaXMuX2NoaXBMaXN0LnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gIH1cblxuICAvKiogQ2hlY2tzIHRvIHNlZSBpZiB0aGUgKGNoaXBFbmQpIGV2ZW50IG5lZWRzIHRvIGJlIGVtaXR0ZWQuICovXG4gIF9lbWl0Q2hpcEVuZChldmVudD86IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuX2lucHV0RWxlbWVudC52YWx1ZSAmJiAhIWV2ZW50KSB7XG4gICAgICB0aGlzLl9jaGlwTGlzdC5fa2V5ZG93bihldmVudCk7XG4gICAgfVxuICAgIGlmICghZXZlbnQgfHwgdGhpcy5faXNTZXBhcmF0b3JLZXkoZXZlbnQpKSB7XG4gICAgICB0aGlzLmNoaXBFbmQuZW1pdCh7IGlucHV0OiB0aGlzLl9pbnB1dEVsZW1lbnQsIHZhbHVlOiB0aGlzLl9pbnB1dEVsZW1lbnQudmFsdWUgfSk7XG5cbiAgICAgIGlmIChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9vbklucHV0KCkge1xuICAgIC8vIExldCBjaGlwIGxpc3Qga25vdyB3aGVuZXZlciB0aGUgdmFsdWUgY2hhbmdlcy5cbiAgICB0aGlzLl9jaGlwTGlzdC5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICB9XG5cbiAgLyoqIEZvY3VzZXMgdGhlIGlucHV0LiAqL1xuICBmb2N1cyhvcHRpb25zPzogRm9jdXNPcHRpb25zKTogdm9pZCB7XG4gICAgdGhpcy5faW5wdXRFbGVtZW50LmZvY3VzKG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqIENoZWNrcyB3aGV0aGVyIGEga2V5Y29kZSBpcyBvbmUgb2YgdGhlIGNvbmZpZ3VyZWQgc2VwYXJhdG9ycy4gKi9cbiAgcHJpdmF0ZSBfaXNTZXBhcmF0b3JLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICByZXR1cm4gIWhhc01vZGlmaWVyS2V5KGV2ZW50KSAmJiBuZXcgU2V0KHRoaXMuc2VwYXJhdG9yS2V5Q29kZXMpLmhhcyhldmVudC5rZXkpO1xuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2FkZE9uQmx1cjogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbn1cbiJdfQ==
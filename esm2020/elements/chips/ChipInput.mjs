import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { Directive, ElementRef, EventEmitter, forwardRef, Inject, Input, Output } from '@angular/core';
import { NgControl } from '@angular/forms';
import { NOVO_CHIPS_DEFAULT_OPTIONS } from './ChipDefaults';
import { NovoChipList } from './ChipList';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "./ChipList";
// Increasing integer for generating unique ids.
let nextUniqueId = 0;
/**
 * Directive that adds chip-specific behaviors to an input element inside `<novo-form-field>`.
 * May be placed inside or outside of an `<novo-chip-list>`.
 */
export class NovoChipInput {
    constructor(_elementRef, _defaultOptions, _chipList, ngControl) {
        this._elementRef = _elementRef;
        this._defaultOptions = _defaultOptions;
        this._chipList = _chipList;
        this.ngControl = ngControl;
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
        this.id = `novo-chip-list-input-${nextUniqueId++}`;
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
    /** Clears the input. */
    clearValue() {
        this._inputElement.value = '';
        this.ngControl?.control.setValue('');
    }
    /** Checks whether a keycode is one of the configured separators. */
    _isSeparatorKey(event) {
        return !hasModifierKey(event) && new Set(this.separatorKeyCodes).has(event.key);
    }
}
NovoChipInput.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoChipInput, deps: [{ token: i0.ElementRef }, { token: NOVO_CHIPS_DEFAULT_OPTIONS }, { token: forwardRef(() => NovoChipList) }, { token: i1.NgControl }], target: i0.ɵɵFactoryTarget.Directive });
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
                }] }, { type: i2.NovoChipList, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => NovoChipList)]
                }] }, { type: i1.NgControl }]; }, propDecorators: { addOnBlur: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hpcElucHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvY2hpcHMvQ2hpcElucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBZ0IscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsSCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUEyQiwwQkFBMEIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxZQUFZLENBQUM7Ozs7QUFZMUMsZ0RBQWdEO0FBQ2hELElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztBQUVyQjs7O0dBR0c7QUFpQkgsTUFBTSxPQUFPLGFBQWE7SUFvRHhCLFlBQ1ksV0FBeUMsRUFDUCxlQUF3QyxFQUNwQyxTQUF1QixFQUM3RCxTQUFvQjtRQUhwQixnQkFBVyxHQUFYLFdBQVcsQ0FBOEI7UUFDUCxvQkFBZSxHQUFmLGVBQWUsQ0FBeUI7UUFDcEMsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUM3RCxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBdkRoQyxzQ0FBc0M7UUFDdEMsWUFBTyxHQUFZLEtBQUssQ0FBQztRQVl6QixlQUFVLEdBQVksS0FBSyxDQUFDO1FBRTVCOzs7O1dBSUc7UUFFSCxzQkFBaUIsR0FBc0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQztRQUU5RSwwQ0FBMEM7UUFFMUMsWUFBTyxHQUFxQyxJQUFJLFlBQVksRUFBc0IsQ0FBQztR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QkFDOUYsc0JBQXNCLEVBQUUseUNBQXlDO3FCQUNsRTtpQkFDRjs7MEJBdURJLE1BQU07MkJBQUMsMEJBQTBCOzswQkFDakMsTUFBTTsyQkFBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDO29FQS9DcEMsU0FBUztzQkFEWixLQUFLO3VCQUFDLHdCQUF3QjtnQkFlL0IsaUJBQWlCO3NCQURoQixLQUFLO3VCQUFDLGdDQUFnQztnQkFLdkMsT0FBTztzQkFETixNQUFNO3VCQUFDLHVCQUF1QjtnQkFJdEIsV0FBVztzQkFBbkIsS0FBSztnQkFHRyxFQUFFO3NCQUFWLEtBQUs7Z0JBSUYsUUFBUTtzQkFEWCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgaGFzTW9kaWZpZXJLZXkgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIEluamVjdCwgSW5wdXQsIE9uQ2hhbmdlcywgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBLZXkgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcbmltcG9ydCB7IE5vdm9DaGlwc0RlZmF1bHRPcHRpb25zLCBOT1ZPX0NISVBTX0RFRkFVTFRfT1BUSU9OUyB9IGZyb20gJy4vQ2hpcERlZmF1bHRzJztcbmltcG9ydCB7IE5vdm9DaGlwTGlzdCB9IGZyb20gJy4vQ2hpcExpc3QnO1xuaW1wb3J0IHsgTm92b0NoaXBUZXh0Q29udHJvbCB9IGZyb20gJy4vQ2hpcFRleHRDb250cm9sJztcblxuLyoqIFJlcHJlc2VudHMgYW4gaW5wdXQgZXZlbnQgb24gYSBgbm92b0NoaXBJbnB1dGAuICovXG5leHBvcnQgaW50ZXJmYWNlIE5vdm9DaGlwSW5wdXRFdmVudCB7XG4gIC8qKiBUaGUgbmF0aXZlIGA8aW5wdXQ+YCBlbGVtZW50IHRoYXQgdGhlIGV2ZW50IGlzIGJlaW5nIGZpcmVkIGZvci4gKi9cbiAgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgLyoqIFRoZSB2YWx1ZSBvZiB0aGUgaW5wdXQuICovXG4gIHZhbHVlOiBzdHJpbmc7XG59XG5cbi8vIEluY3JlYXNpbmcgaW50ZWdlciBmb3IgZ2VuZXJhdGluZyB1bmlxdWUgaWRzLlxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRoYXQgYWRkcyBjaGlwLXNwZWNpZmljIGJlaGF2aW9ycyB0byBhbiBpbnB1dCBlbGVtZW50IGluc2lkZSBgPG5vdm8tZm9ybS1maWVsZD5gLlxuICogTWF5IGJlIHBsYWNlZCBpbnNpZGUgb3Igb3V0c2lkZSBvZiBhbiBgPG5vdm8tY2hpcC1saXN0PmAuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2lucHV0W25vdm9DaGlwSW5wdXRdJyxcbiAgZXhwb3J0QXM6ICdub3ZvQ2hpcElucHV0LCBub3ZvQ2hpcElucHV0Rm9yJyxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1jaGlwLWlucHV0IG5vdm8taW5wdXQtZWxlbWVudCcsXG4gICAgJyhrZXlkb3duKSc6ICdfa2V5ZG93bigkZXZlbnQpJyxcbiAgICAnKGJsdXIpJzogJ19ibHVyKCknLFxuICAgICcoZm9jdXMpJzogJ19mb2N1cygpJyxcbiAgICAnKGlucHV0KSc6ICdfb25JbnB1dCgpJyxcbiAgICAnW2lkXSc6ICdpZCcsXG4gICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgICAnW2F0dHIucGxhY2Vob2xkZXJdJzogJ3BsYWNlaG9sZGVyIHx8IG51bGwnLFxuICAgICdbYXR0ci5hcmlhLWludmFsaWRdJzogJ19jaGlwTGlzdCAmJiBfY2hpcExpc3QubmdDb250cm9sID8gX2NoaXBMaXN0Lm5nQ29udHJvbC5pbnZhbGlkIDogbnVsbCcsXG4gICAgJ1thdHRyLmFyaWEtcmVxdWlyZWRdJzogJ19jaGlwTGlzdCAmJiBfY2hpcExpc3QucmVxdWlyZWQgfHwgbnVsbCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9DaGlwSW5wdXQgaW1wbGVtZW50cyBOb3ZvQ2hpcFRleHRDb250cm9sLCBPbkNoYW5nZXMge1xuICAvKiogV2hldGhlciB0aGUgY29udHJvbCBpcyBmb2N1c2VkLiAqL1xuICBmb2N1c2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgb3Igbm90IHRoZSBjaGlwRW5kIGV2ZW50IHdpbGwgYmUgZW1pdHRlZCB3aGVuIHRoZSBpbnB1dCBpcyBibHVycmVkLlxuICAgKi9cbiAgQElucHV0KCdub3ZvQ2hpcElucHV0QWRkT25CbHVyJylcbiAgZ2V0IGFkZE9uQmx1cigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fYWRkT25CbHVyO1xuICB9XG4gIHNldCBhZGRPbkJsdXIodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9hZGRPbkJsdXIgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIF9hZGRPbkJsdXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogVGhlIGxpc3Qgb2Yga2V5IGNvZGVzIHRoYXQgd2lsbCB0cmlnZ2VyIGEgY2hpcEVuZCBldmVudC5cbiAgICpcbiAgICogRGVmYXVsdHMgdG8gYFtLZXkuRW50ZXJdYC5cbiAgICovXG4gIEBJbnB1dCgnbm92b0NoaXBJbnB1dFNlcGFyYXRvcktleUNvZGVzJylcbiAgc2VwYXJhdG9yS2V5Q29kZXM6IHJlYWRvbmx5IHN0cmluZ1tdID0gdGhpcy5fZGVmYXVsdE9wdGlvbnMuc2VwYXJhdG9yS2V5Q29kZXM7XG5cbiAgLyoqIEVtaXR0ZWQgd2hlbiBhIGNoaXAgaXMgdG8gYmUgYWRkZWQuICovXG4gIEBPdXRwdXQoJ25vdm9DaGlwSW5wdXRUb2tlbkVuZCcpXG4gIGNoaXBFbmQ6IEV2ZW50RW1pdHRlcjxOb3ZvQ2hpcElucHV0RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxOb3ZvQ2hpcElucHV0RXZlbnQ+KCk7XG5cbiAgLyoqIFRoZSBpbnB1dCdzIHBsYWNlaG9sZGVyIHRleHQuICovXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSAnJztcblxuICAvKiogVW5pcXVlIGlkIGZvciB0aGUgaW5wdXQuICovXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBgbm92by1jaGlwLWxpc3QtaW5wdXQtJHtuZXh0VW5pcXVlSWQrK31gO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBpbnB1dCBpcyBkaXNhYmxlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZCB8fCAodGhpcy5fY2hpcExpc3QgJiYgdGhpcy5fY2hpcExpc3QuZGlzYWJsZWQpO1xuICB9XG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBpbnB1dCBpcyBlbXB0eS4gKi9cbiAgZ2V0IGVtcHR5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5faW5wdXRFbGVtZW50LnZhbHVlO1xuICB9XG5cbiAgLyoqIFRoZSBuYXRpdmUgaW5wdXQgZWxlbWVudCB0byB3aGljaCB0aGlzIGRpcmVjdGl2ZSBpcyBhdHRhY2hlZC4gKi9cbiAgcHJvdGVjdGVkIF9pbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+LFxuICAgIEBJbmplY3QoTk9WT19DSElQU19ERUZBVUxUX09QVElPTlMpIHByaXZhdGUgX2RlZmF1bHRPcHRpb25zOiBOb3ZvQ2hpcHNEZWZhdWx0T3B0aW9ucyxcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTm92b0NoaXBMaXN0KSkgcHJpdmF0ZSBfY2hpcExpc3Q6IE5vdm9DaGlwTGlzdCxcbiAgICBwcm90ZWN0ZWQgbmdDb250cm9sOiBOZ0NvbnRyb2wsXG4gICkge1xuICAgIHRoaXMuX2lucHV0RWxlbWVudCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHRoaXMuX2NoaXBMaXN0LnJlZ2lzdGVySW5wdXQodGhpcyk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLl9jaGlwTGlzdC5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICB9XG5cbiAgLyoqIFV0aWxpdHkgbWV0aG9kIHRvIG1ha2UgaG9zdCBkZWZpbml0aW9uL3Rlc3RzIG1vcmUgY2xlYXIuICovXG4gIF9rZXlkb3duKGV2ZW50PzogS2V5Ym9hcmRFdmVudCkge1xuICAgIC8vIEFsbG93IHRoZSB1c2VyJ3MgZm9jdXMgdG8gZXNjYXBlIHdoZW4gdGhleSdyZSB0YWJiaW5nIGZvcndhcmQuIE5vdGUgdGhhdCB3ZSBkb24ndFxuICAgIC8vIHdhbnQgdG8gZG8gdGhpcyB3aGVuIGdvaW5nIGJhY2t3YXJkcywgYmVjYXVzZSBmb2N1cyBzaG91bGQgZ28gYmFjayB0byB0aGUgZmlyc3QgY2hpcC5cbiAgICBpZiAoZXZlbnQgJiYgZXZlbnQua2V5ID09PSBLZXkuVGFiICYmICFoYXNNb2RpZmllcktleShldmVudCwgJ3NoaWZ0S2V5JykpIHtcbiAgICAgIHRoaXMuX2NoaXBMaXN0Ll9hbGxvd0ZvY3VzRXNjYXBlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fZW1pdENoaXBFbmQoZXZlbnQpO1xuICB9XG5cbiAgLyoqIENoZWNrcyB0byBzZWUgaWYgdGhlIGJsdXIgc2hvdWxkIGVtaXQgdGhlIChjaGlwRW5kKSBldmVudC4gKi9cbiAgX2JsdXIoKSB7XG4gICAgaWYgKHRoaXMuYWRkT25CbHVyKSB7XG4gICAgICB0aGlzLl9lbWl0Q2hpcEVuZCgpO1xuICAgIH1cbiAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICAvLyBCbHVyIHRoZSBjaGlwIGxpc3QgaWYgaXQgaXMgbm90IGZvY3VzZWRcbiAgICBpZiAoIXRoaXMuX2NoaXBMaXN0LmZvY3VzZWQpIHtcbiAgICAgIHRoaXMuX2NoaXBMaXN0Ll9ibHVyKCk7XG4gICAgfVxuICAgIHRoaXMuX2NoaXBMaXN0LnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gIH1cblxuICBfZm9jdXMoKSB7XG4gICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcbiAgICB0aGlzLl9jaGlwTGlzdC5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICB9XG5cbiAgLyoqIENoZWNrcyB0byBzZWUgaWYgdGhlIChjaGlwRW5kKSBldmVudCBuZWVkcyB0byBiZSBlbWl0dGVkLiAqL1xuICBfZW1pdENoaXBFbmQoZXZlbnQ/OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLl9pbnB1dEVsZW1lbnQudmFsdWUgJiYgISFldmVudCkge1xuICAgICAgdGhpcy5fY2hpcExpc3QuX2tleWRvd24oZXZlbnQpO1xuICAgIH1cbiAgICBpZiAoIWV2ZW50IHx8IHRoaXMuX2lzU2VwYXJhdG9yS2V5KGV2ZW50KSkge1xuICAgICAgdGhpcy5jaGlwRW5kLmVtaXQoeyBpbnB1dDogdGhpcy5faW5wdXRFbGVtZW50LCB2YWx1ZTogdGhpcy5faW5wdXRFbGVtZW50LnZhbHVlIH0pO1xuXG4gICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfb25JbnB1dCgpIHtcbiAgICAvLyBMZXQgY2hpcCBsaXN0IGtub3cgd2hlbmV2ZXIgdGhlIHZhbHVlIGNoYW5nZXMuXG4gICAgdGhpcy5fY2hpcExpc3Quc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgfVxuXG4gIC8qKiBGb2N1c2VzIHRoZSBpbnB1dC4gKi9cbiAgZm9jdXMob3B0aW9ucz86IEZvY3VzT3B0aW9ucyk6IHZvaWQge1xuICAgIHRoaXMuX2lucHV0RWxlbWVudC5mb2N1cyhvcHRpb25zKTtcbiAgfVxuXG4gIC8qKiBDbGVhcnMgdGhlIGlucHV0LiAqL1xuICBjbGVhclZhbHVlKCk6IHZvaWQge1xuICAgIHRoaXMuX2lucHV0RWxlbWVudC52YWx1ZSA9ICcnO1xuICAgIHRoaXMubmdDb250cm9sPy5jb250cm9sLnNldFZhbHVlKCcnKTtcbiAgfVxuXG4gIC8qKiBDaGVja3Mgd2hldGhlciBhIGtleWNvZGUgaXMgb25lIG9mIHRoZSBjb25maWd1cmVkIHNlcGFyYXRvcnMuICovXG4gIHByaXZhdGUgX2lzU2VwYXJhdG9yS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgcmV0dXJuICFoYXNNb2RpZmllcktleShldmVudCkgJiYgbmV3IFNldCh0aGlzLnNlcGFyYXRvcktleUNvZGVzKS5oYXMoZXZlbnQua2V5KTtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9hZGRPbkJsdXI6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG59XG4iXX0=
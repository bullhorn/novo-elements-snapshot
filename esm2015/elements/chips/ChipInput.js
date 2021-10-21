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
NovoChipInput.ɵfac = function NovoChipInput_Factory(t) { return new (t || NovoChipInput)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(NOVO_CHIPS_DEFAULT_OPTIONS), i0.ɵɵdirectiveInject(forwardRef(() => NovoChipList))); };
NovoChipInput.ɵdir = i0.ɵɵdefineDirective({ type: NovoChipInput, selectors: [["input", "novoChipInput", ""]], hostAttrs: [1, "novo-chip-input", "novo-input-element"], hostVars: 5, hostBindings: function NovoChipInput_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("keydown", function NovoChipInput_keydown_HostBindingHandler($event) { return ctx._keydown($event); })("blur", function NovoChipInput_blur_HostBindingHandler() { return ctx._blur(); })("focus", function NovoChipInput_focus_HostBindingHandler() { return ctx._focus(); })("input", function NovoChipInput_input_HostBindingHandler() { return ctx._onInput(); });
    } if (rf & 2) {
        i0.ɵɵhostProperty("id", ctx.id);
        i0.ɵɵattribute("disabled", ctx.disabled || null)("placeholder", ctx.placeholder || null)("aria-invalid", ctx._chipList && ctx._chipList.ngControl ? ctx._chipList.ngControl.invalid : null)("aria-required", ctx._chipList && ctx._chipList.required || null);
    } }, inputs: { addOnBlur: ["novoChipInputAddOnBlur", "addOnBlur"], separatorKeyCodes: ["novoChipInputSeparatorKeyCodes", "separatorKeyCodes"], placeholder: "placeholder", id: "id", disabled: "disabled" }, outputs: { chipEnd: "novoChipInputTokenEnd" }, exportAs: ["novoChipInput", "novoChipInputFor"], features: [i0.ɵɵNgOnChangesFeature] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoChipInput, [{
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
    }], function () { return [{ type: i0.ElementRef }, { type: undefined, decorators: [{
                type: Inject,
                args: [NOVO_CHIPS_DEFAULT_OPTIONS]
            }] }, { type: i1.NovoChipList, decorators: [{
                type: Inject,
                args: [forwardRef(() => NovoChipList)]
            }] }]; }, { addOnBlur: [{
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
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hpcElucHV0LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2NoaXBzL0NoaXBJbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWdCLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbEgsT0FBTyxFQUEyQiwwQkFBMEIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxZQUFZLENBQUM7OztBQVkxQyxnREFBZ0Q7QUFDaEQsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBRXJCOzs7R0FHRztBQWlCSCxNQUFNLE9BQU8sYUFBYTtJQW9EeEIsWUFDWSxXQUF5QyxFQUNQLGVBQXdDLEVBQ3BDLFNBQXVCO1FBRjdELGdCQUFXLEdBQVgsV0FBVyxDQUE4QjtRQUNQLG9CQUFlLEdBQWYsZUFBZSxDQUF5QjtRQUNwQyxjQUFTLEdBQVQsU0FBUyxDQUFjO1FBdER6RSxzQ0FBc0M7UUFDdEMsWUFBTyxHQUFZLEtBQUssQ0FBQztRQVl6QixlQUFVLEdBQVksS0FBSyxDQUFDO1FBRTVCOzs7O1dBSUc7UUFFSCxzQkFBaUIsR0FBc0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQztRQUU5RSwwQ0FBMEM7UUFFMUMsWUFBTyxHQUFxQyxJQUFJLFlBQVksRUFBc0IsQ0FBQztRQUVuRixvQ0FBb0M7UUFDM0IsZ0JBQVcsR0FBVyxFQUFFLENBQUM7UUFFbEMsK0JBQStC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QkFBQyx3QkFBd0I7WUFlL0IsaUJBQWlCO2tCQURoQixLQUFLO21CQUFDLGdDQUFnQztZQUt2QyxPQUFPO2tCQUROLE1BQU07bUJBQUMsdUJBQXVCO1lBSXRCLFdBQVc7a0JBQW5CLEtBQUs7WUFHRyxFQUFFO2tCQUFWLEtBQUs7WUFJRixRQUFRO2tCQURYLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBoYXNNb2RpZmllcktleSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSW5qZWN0LCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEtleSB9IGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCB7IE5vdm9DaGlwc0RlZmF1bHRPcHRpb25zLCBOT1ZPX0NISVBTX0RFRkFVTFRfT1BUSU9OUyB9IGZyb20gJy4vQ2hpcERlZmF1bHRzJztcbmltcG9ydCB7IE5vdm9DaGlwTGlzdCB9IGZyb20gJy4vQ2hpcExpc3QnO1xuaW1wb3J0IHsgTm92b0NoaXBUZXh0Q29udHJvbCB9IGZyb20gJy4vQ2hpcFRleHRDb250cm9sJztcblxuLyoqIFJlcHJlc2VudHMgYW4gaW5wdXQgZXZlbnQgb24gYSBgbm92b0NoaXBJbnB1dGAuICovXG5leHBvcnQgaW50ZXJmYWNlIE5vdm9DaGlwSW5wdXRFdmVudCB7XG4gIC8qKiBUaGUgbmF0aXZlIGA8aW5wdXQ+YCBlbGVtZW50IHRoYXQgdGhlIGV2ZW50IGlzIGJlaW5nIGZpcmVkIGZvci4gKi9cbiAgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgLyoqIFRoZSB2YWx1ZSBvZiB0aGUgaW5wdXQuICovXG4gIHZhbHVlOiBzdHJpbmc7XG59XG5cbi8vIEluY3JlYXNpbmcgaW50ZWdlciBmb3IgZ2VuZXJhdGluZyB1bmlxdWUgaWRzLlxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRoYXQgYWRkcyBjaGlwLXNwZWNpZmljIGJlaGF2aW9ycyB0byBhbiBpbnB1dCBlbGVtZW50IGluc2lkZSBgPG1hdC1mb3JtLWZpZWxkPmAuXG4gKiBNYXkgYmUgcGxhY2VkIGluc2lkZSBvciBvdXRzaWRlIG9mIGFuIGA8bWF0LWNoaXAtbGlzdD5gLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdpbnB1dFtub3ZvQ2hpcElucHV0XScsXG4gIGV4cG9ydEFzOiAnbm92b0NoaXBJbnB1dCwgbm92b0NoaXBJbnB1dEZvcicsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tY2hpcC1pbnB1dCBub3ZvLWlucHV0LWVsZW1lbnQnLFxuICAgICcoa2V5ZG93biknOiAnX2tleWRvd24oJGV2ZW50KScsXG4gICAgJyhibHVyKSc6ICdfYmx1cigpJyxcbiAgICAnKGZvY3VzKSc6ICdfZm9jdXMoKScsXG4gICAgJyhpbnB1dCknOiAnX29uSW5wdXQoKScsXG4gICAgJ1tpZF0nOiAnaWQnLFxuICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gICAgJ1thdHRyLnBsYWNlaG9sZGVyXSc6ICdwbGFjZWhvbGRlciB8fCBudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1pbnZhbGlkXSc6ICdfY2hpcExpc3QgJiYgX2NoaXBMaXN0Lm5nQ29udHJvbCA/IF9jaGlwTGlzdC5uZ0NvbnRyb2wuaW52YWxpZCA6IG51bGwnLFxuICAgICdbYXR0ci5hcmlhLXJlcXVpcmVkXSc6ICdfY2hpcExpc3QgJiYgX2NoaXBMaXN0LnJlcXVpcmVkIHx8IG51bGwnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQ2hpcElucHV0IGltcGxlbWVudHMgTm92b0NoaXBUZXh0Q29udHJvbCwgT25DaGFuZ2VzIHtcbiAgLyoqIFdoZXRoZXIgdGhlIGNvbnRyb2wgaXMgZm9jdXNlZC4gKi9cbiAgZm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIG9yIG5vdCB0aGUgY2hpcEVuZCBldmVudCB3aWxsIGJlIGVtaXR0ZWQgd2hlbiB0aGUgaW5wdXQgaXMgYmx1cnJlZC5cbiAgICovXG4gIEBJbnB1dCgnbm92b0NoaXBJbnB1dEFkZE9uQmx1cicpXG4gIGdldCBhZGRPbkJsdXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2FkZE9uQmx1cjtcbiAgfVxuICBzZXQgYWRkT25CbHVyKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fYWRkT25CbHVyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBfYWRkT25CbHVyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFRoZSBsaXN0IG9mIGtleSBjb2RlcyB0aGF0IHdpbGwgdHJpZ2dlciBhIGNoaXBFbmQgZXZlbnQuXG4gICAqXG4gICAqIERlZmF1bHRzIHRvIGBbS2V5LkVudGVyXWAuXG4gICAqL1xuICBASW5wdXQoJ25vdm9DaGlwSW5wdXRTZXBhcmF0b3JLZXlDb2RlcycpXG4gIHNlcGFyYXRvcktleUNvZGVzOiByZWFkb25seSBzdHJpbmdbXSA9IHRoaXMuX2RlZmF1bHRPcHRpb25zLnNlcGFyYXRvcktleUNvZGVzO1xuXG4gIC8qKiBFbWl0dGVkIHdoZW4gYSBjaGlwIGlzIHRvIGJlIGFkZGVkLiAqL1xuICBAT3V0cHV0KCdub3ZvQ2hpcElucHV0VG9rZW5FbmQnKVxuICBjaGlwRW5kOiBFdmVudEVtaXR0ZXI8Tm92b0NoaXBJbnB1dEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Tm92b0NoaXBJbnB1dEV2ZW50PigpO1xuXG4gIC8qKiBUaGUgaW5wdXQncyBwbGFjZWhvbGRlciB0ZXh0LiAqL1xuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nID0gJyc7XG5cbiAgLyoqIFVuaXF1ZSBpZCBmb3IgdGhlIGlucHV0LiAqL1xuICBASW5wdXQoKSBpZDogc3RyaW5nID0gYG1hdC1jaGlwLWxpc3QtaW5wdXQtJHtuZXh0VW5pcXVlSWQrK31gO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBpbnB1dCBpcyBkaXNhYmxlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZCB8fCAodGhpcy5fY2hpcExpc3QgJiYgdGhpcy5fY2hpcExpc3QuZGlzYWJsZWQpO1xuICB9XG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBpbnB1dCBpcyBlbXB0eS4gKi9cbiAgZ2V0IGVtcHR5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5faW5wdXRFbGVtZW50LnZhbHVlO1xuICB9XG5cbiAgLyoqIFRoZSBuYXRpdmUgaW5wdXQgZWxlbWVudCB0byB3aGljaCB0aGlzIGRpcmVjdGl2ZSBpcyBhdHRhY2hlZC4gKi9cbiAgcHJvdGVjdGVkIF9pbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+LFxuICAgIEBJbmplY3QoTk9WT19DSElQU19ERUZBVUxUX09QVElPTlMpIHByaXZhdGUgX2RlZmF1bHRPcHRpb25zOiBOb3ZvQ2hpcHNEZWZhdWx0T3B0aW9ucyxcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTm92b0NoaXBMaXN0KSkgcHJpdmF0ZSBfY2hpcExpc3Q6IE5vdm9DaGlwTGlzdCxcbiAgKSB7XG4gICAgdGhpcy5faW5wdXRFbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgdGhpcy5fY2hpcExpc3QucmVnaXN0ZXJJbnB1dCh0aGlzKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMuX2NoaXBMaXN0LnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gIH1cblxuICAvKiogVXRpbGl0eSBtZXRob2QgdG8gbWFrZSBob3N0IGRlZmluaXRpb24vdGVzdHMgbW9yZSBjbGVhci4gKi9cbiAgX2tleWRvd24oZXZlbnQ/OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgLy8gQWxsb3cgdGhlIHVzZXIncyBmb2N1cyB0byBlc2NhcGUgd2hlbiB0aGV5J3JlIHRhYmJpbmcgZm9yd2FyZC4gTm90ZSB0aGF0IHdlIGRvbid0XG4gICAgLy8gd2FudCB0byBkbyB0aGlzIHdoZW4gZ29pbmcgYmFja3dhcmRzLCBiZWNhdXNlIGZvY3VzIHNob3VsZCBnbyBiYWNrIHRvIHRoZSBmaXJzdCBjaGlwLlxuICAgIGlmIChldmVudCAmJiBldmVudC5rZXkgPT09IEtleS5UYWIgJiYgIWhhc01vZGlmaWVyS2V5KGV2ZW50LCAnc2hpZnRLZXknKSkge1xuICAgICAgdGhpcy5fY2hpcExpc3QuX2FsbG93Rm9jdXNFc2NhcGUoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9lbWl0Q2hpcEVuZChldmVudCk7XG4gIH1cblxuICAvKiogQ2hlY2tzIHRvIHNlZSBpZiB0aGUgYmx1ciBzaG91bGQgZW1pdCB0aGUgKGNoaXBFbmQpIGV2ZW50LiAqL1xuICBfYmx1cigpIHtcbiAgICBpZiAodGhpcy5hZGRPbkJsdXIpIHtcbiAgICAgIHRoaXMuX2VtaXRDaGlwRW5kKCk7XG4gICAgfVxuICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICAgIC8vIEJsdXIgdGhlIGNoaXAgbGlzdCBpZiBpdCBpcyBub3QgZm9jdXNlZFxuICAgIGlmICghdGhpcy5fY2hpcExpc3QuZm9jdXNlZCkge1xuICAgICAgdGhpcy5fY2hpcExpc3QuX2JsdXIoKTtcbiAgICB9XG4gICAgdGhpcy5fY2hpcExpc3Quc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgfVxuXG4gIF9mb2N1cygpIHtcbiAgICB0aGlzLmZvY3VzZWQgPSB0cnVlO1xuICAgIHRoaXMuX2NoaXBMaXN0LnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gIH1cblxuICAvKiogQ2hlY2tzIHRvIHNlZSBpZiB0aGUgKGNoaXBFbmQpIGV2ZW50IG5lZWRzIHRvIGJlIGVtaXR0ZWQuICovXG4gIF9lbWl0Q2hpcEVuZChldmVudD86IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuX2lucHV0RWxlbWVudC52YWx1ZSAmJiAhIWV2ZW50KSB7XG4gICAgICB0aGlzLl9jaGlwTGlzdC5fa2V5ZG93bihldmVudCk7XG4gICAgfVxuICAgIGlmICghZXZlbnQgfHwgdGhpcy5faXNTZXBhcmF0b3JLZXkoZXZlbnQpKSB7XG4gICAgICB0aGlzLmNoaXBFbmQuZW1pdCh7IGlucHV0OiB0aGlzLl9pbnB1dEVsZW1lbnQsIHZhbHVlOiB0aGlzLl9pbnB1dEVsZW1lbnQudmFsdWUgfSk7XG5cbiAgICAgIGlmIChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9vbklucHV0KCkge1xuICAgIC8vIExldCBjaGlwIGxpc3Qga25vdyB3aGVuZXZlciB0aGUgdmFsdWUgY2hhbmdlcy5cbiAgICB0aGlzLl9jaGlwTGlzdC5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICB9XG5cbiAgLyoqIEZvY3VzZXMgdGhlIGlucHV0LiAqL1xuICBmb2N1cyhvcHRpb25zPzogRm9jdXNPcHRpb25zKTogdm9pZCB7XG4gICAgdGhpcy5faW5wdXRFbGVtZW50LmZvY3VzKG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqIENoZWNrcyB3aGV0aGVyIGEga2V5Y29kZSBpcyBvbmUgb2YgdGhlIGNvbmZpZ3VyZWQgc2VwYXJhdG9ycy4gKi9cbiAgcHJpdmF0ZSBfaXNTZXBhcmF0b3JLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICByZXR1cm4gIWhhc01vZGlmaWVyS2V5KGV2ZW50KSAmJiBuZXcgU2V0KHRoaXMuc2VwYXJhdG9yS2V5Q29kZXMpLmhhcyhldmVudC5rZXkpO1xuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2FkZE9uQmx1cjogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbn1cbiJdfQ==
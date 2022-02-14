import { Directive, ElementRef, Inject, Input, Optional, Self } from '@angular/core';
import { NOVO_INPUT_FORMAT } from './formats/base-format';
import * as i0 from "@angular/core";
/** Directive used to connect an input to a MatDatepicker. */
export class NovoPickerDirective {
    constructor(_elementRef, formatter) {
        var _a;
        this._elementRef = _elementRef;
        this.formatter = formatter;
        /**
         * `autocomplete` attribute to be set on the input element.
         * @docs-private
         */
        this.autocompleteAttribute = 'off';
        if (!this.formatter) {
            console.warn('Picker directive is missing required formatter');
        }
        (_a = this.formatter) === null || _a === void 0 ? void 0 : _a.valueChange.subscribe((value) => {
            this.updatePicker(value);
        });
    }
    /** The datepicker that this input is associated with. */
    set picker(picker) {
        if (picker) {
            this._picker = picker;
            picker.registerOnChange((value) => this.updateValue(value));
        }
    }
    updateValue(value) {
        this.formatter.writeValue(value);
    }
    updatePicker(value) {
        if (this._picker) {
            this._picker.writeValue(value);
        }
    }
}
NovoPickerDirective.ɵfac = function NovoPickerDirective_Factory(t) { return new (t || NovoPickerDirective)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(NOVO_INPUT_FORMAT, 10)); };
NovoPickerDirective.ɵdir = i0.ɵɵdefineDirective({ type: NovoPickerDirective, selectors: [["input", "picker", ""]], hostAttrs: [1, "novo-has-picker"], hostVars: 1, hostBindings: function NovoPickerDirective_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵattribute("autocomplete", ctx.autocompleteAttribute);
    } }, inputs: { picker: "picker", autocompleteAttribute: ["autocomplete", "autocompleteAttribute"] } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoPickerDirective, [{
        type: Directive,
        args: [{
                selector: 'input[picker]',
                host: {
                    class: 'novo-has-picker',
                    '[attr.autocomplete]': 'autocompleteAttribute',
                },
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Self
            }, {
                type: Inject,
                args: [NOVO_INPUT_FORMAT]
            }] }]; }, { picker: [{
            type: Input
        }], autocompleteAttribute: [{
            type: Input,
            args: ['autocomplete']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja2VyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9maWVsZC9waWNrZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVyRixPQUFPLEVBQW1CLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7O0FBRTNFLDZEQUE2RDtBQVE3RCxNQUFNLE9BQU8sbUJBQW1CO0lBZ0I5QixZQUNVLFdBQXlDLEVBQ00sU0FBK0I7O1FBRDlFLGdCQUFXLEdBQVgsV0FBVyxDQUE4QjtRQUNNLGNBQVMsR0FBVCxTQUFTLENBQXNCO1FBUnhGOzs7V0FHRztRQUNvQiwwQkFBcUIsR0FBVyxLQUFLLENBQUM7UUFNM0QsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbkIsT0FBTyxDQUFDLElBQUksQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO1NBQ2hFO1FBQ0QsTUFBQSxJQUFJLENBQUMsU0FBUywwQ0FBRSxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQixDQUFDLEVBQUU7SUFDTCxDQUFDO0lBekJELHlEQUF5RDtJQUN6RCxJQUNJLE1BQU0sQ0FBQyxNQUE0QjtRQUNyQyxJQUFJLE1BQU0sRUFBRTtZQUNWLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ3RCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQzdEO0lBQ0gsQ0FBQztJQW9CRCxXQUFXLENBQUMsS0FBVTtRQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQVU7UUFDckIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQzs7c0ZBcENVLG1CQUFtQiw0REFrQkEsaUJBQWlCO3dEQWxCcEMsbUJBQW1COzs7a0RBQW5CLG1CQUFtQjtjQVAvQixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsaUJBQWlCO29CQUN4QixxQkFBcUIsRUFBRSx1QkFBdUI7aUJBQy9DO2FBQ0Y7O3NCQW1CSSxRQUFROztzQkFBSSxJQUFJOztzQkFBSSxNQUFNO3VCQUFDLGlCQUFpQjt3QkFmM0MsTUFBTTtrQkFEVCxLQUFLO1lBWWlCLHFCQUFxQjtrQkFBM0MsS0FBSzttQkFBQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3QsIElucHV0LCBPcHRpb25hbCwgU2VsZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBOb3ZvSW5wdXRGb3JtYXQsIE5PVk9fSU5QVVRfRk9STUFUIH0gZnJvbSAnLi9mb3JtYXRzL2Jhc2UtZm9ybWF0JztcblxuLyoqIERpcmVjdGl2ZSB1c2VkIHRvIGNvbm5lY3QgYW4gaW5wdXQgdG8gYSBNYXREYXRlcGlja2VyLiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnaW5wdXRbcGlja2VyXScsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8taGFzLXBpY2tlcicsXG4gICAgJ1thdHRyLmF1dG9jb21wbGV0ZV0nOiAnYXV0b2NvbXBsZXRlQXR0cmlidXRlJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1BpY2tlckRpcmVjdGl2ZSB7XG4gIC8qKiBUaGUgZGF0ZXBpY2tlciB0aGF0IHRoaXMgaW5wdXQgaXMgYXNzb2NpYXRlZCB3aXRoLiAqL1xuICBASW5wdXQoKVxuICBzZXQgcGlja2VyKHBpY2tlcjogQ29udHJvbFZhbHVlQWNjZXNzb3IpIHtcbiAgICBpZiAocGlja2VyKSB7XG4gICAgICB0aGlzLl9waWNrZXIgPSBwaWNrZXI7XG4gICAgICBwaWNrZXIucmVnaXN0ZXJPbkNoYW5nZSgodmFsdWUpID0+IHRoaXMudXBkYXRlVmFsdWUodmFsdWUpKTtcbiAgICB9XG4gIH1cbiAgX3BpY2tlcjogQ29udHJvbFZhbHVlQWNjZXNzb3I7XG4gIC8qKlxuICAgKiBgYXV0b2NvbXBsZXRlYCBhdHRyaWJ1dGUgdG8gYmUgc2V0IG9uIHRoZSBpbnB1dCBlbGVtZW50LlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBASW5wdXQoJ2F1dG9jb21wbGV0ZScpIGF1dG9jb21wbGV0ZUF0dHJpYnV0ZTogc3RyaW5nID0gJ29mZic7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PixcbiAgICBAT3B0aW9uYWwoKSBAU2VsZigpIEBJbmplY3QoTk9WT19JTlBVVF9GT1JNQVQpIHByaXZhdGUgZm9ybWF0dGVyOiBOb3ZvSW5wdXRGb3JtYXQ8YW55PixcbiAgKSB7XG4gICAgaWYgKCF0aGlzLmZvcm1hdHRlcikge1xuICAgICAgY29uc29sZS53YXJuKCdQaWNrZXIgZGlyZWN0aXZlIGlzIG1pc3NpbmcgcmVxdWlyZWQgZm9ybWF0dGVyJyk7XG4gICAgfVxuICAgIHRoaXMuZm9ybWF0dGVyPy52YWx1ZUNoYW5nZS5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZVBpY2tlcih2YWx1ZSk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5mb3JtYXR0ZXIud3JpdGVWYWx1ZSh2YWx1ZSk7XG4gIH1cblxuICB1cGRhdGVQaWNrZXIodmFsdWU6IGFueSkge1xuICAgIGlmICh0aGlzLl9waWNrZXIpIHtcbiAgICAgIHRoaXMuX3BpY2tlci53cml0ZVZhbHVlKHZhbHVlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
import { Directive, ElementRef, Inject, Input, Optional, Self } from '@angular/core';
import { NOVO_INPUT_FORMAT } from './formats/base-format';
import * as i0 from "@angular/core";
/** Directive used to connect an input to a MatDatepicker. */
export class NovoPickerDirective {
    constructor(_elementRef, formatter) {
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
        this.formatter?.valueChange.subscribe((value) => {
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
NovoPickerDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPickerDirective, deps: [{ token: i0.ElementRef }, { token: NOVO_INPUT_FORMAT, optional: true, self: true }], target: i0.ɵɵFactoryTarget.Directive });
NovoPickerDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoPickerDirective, selector: "input[picker]", inputs: { picker: "picker", autocompleteAttribute: ["autocomplete", "autocompleteAttribute"] }, host: { properties: { "attr.autocomplete": "autocompleteAttribute" }, classAttribute: "novo-has-picker" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPickerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[picker]',
                    host: {
                        class: 'novo-has-picker',
                        '[attr.autocomplete]': 'autocompleteAttribute',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }, {
                    type: Inject,
                    args: [NOVO_INPUT_FORMAT]
                }] }]; }, propDecorators: { picker: [{
                type: Input
            }], autocompleteAttribute: [{
                type: Input,
                args: ['autocomplete']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja2VyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2ZpZWxkL3BpY2tlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXJGLE9BQU8sRUFBbUIsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7QUFFM0UsNkRBQTZEO0FBUTdELE1BQU0sT0FBTyxtQkFBbUI7SUFnQjlCLFlBQ1UsV0FBeUMsRUFDTSxTQUErQjtRQUQ5RSxnQkFBVyxHQUFYLFdBQVcsQ0FBOEI7UUFDTSxjQUFTLEdBQVQsU0FBUyxDQUFzQjtRQVJ4Rjs7O1dBR0c7UUFDb0IsMEJBQXFCLEdBQVcsS0FBSyxDQUFDO1FBTTNELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ25CLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0RBQWdELENBQUMsQ0FBQztTQUNoRTtRQUNELElBQUksQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQzlDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBekJELHlEQUF5RDtJQUN6RCxJQUNJLE1BQU0sQ0FBQyxNQUE0QjtRQUNyQyxJQUFJLE1BQU0sRUFBRTtZQUNWLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ3RCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQzdEO0lBQ0gsQ0FBQztJQW9CRCxXQUFXLENBQUMsS0FBVTtRQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQVU7UUFDckIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQzs7aUhBcENVLG1CQUFtQiw0Q0FrQkEsaUJBQWlCO3FHQWxCcEMsbUJBQW1COzRGQUFuQixtQkFBbUI7a0JBUC9CLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUsaUJBQWlCO3dCQUN4QixxQkFBcUIsRUFBRSx1QkFBdUI7cUJBQy9DO2lCQUNGOzswQkFtQkksUUFBUTs7MEJBQUksSUFBSTs7MEJBQUksTUFBTTsyQkFBQyxpQkFBaUI7NENBZjNDLE1BQU07c0JBRFQsS0FBSztnQkFZaUIscUJBQXFCO3NCQUEzQyxLQUFLO3VCQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEluamVjdCwgSW5wdXQsIE9wdGlvbmFsLCBTZWxmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5vdm9JbnB1dEZvcm1hdCwgTk9WT19JTlBVVF9GT1JNQVQgfSBmcm9tICcuL2Zvcm1hdHMvYmFzZS1mb3JtYXQnO1xuXG4vKiogRGlyZWN0aXZlIHVzZWQgdG8gY29ubmVjdCBhbiBpbnB1dCB0byBhIE1hdERhdGVwaWNrZXIuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdpbnB1dFtwaWNrZXJdJyxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1oYXMtcGlja2VyJyxcbiAgICAnW2F0dHIuYXV0b2NvbXBsZXRlXSc6ICdhdXRvY29tcGxldGVBdHRyaWJ1dGUnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvUGlja2VyRGlyZWN0aXZlIHtcbiAgLyoqIFRoZSBkYXRlcGlja2VyIHRoYXQgdGhpcyBpbnB1dCBpcyBhc3NvY2lhdGVkIHdpdGguICovXG4gIEBJbnB1dCgpXG4gIHNldCBwaWNrZXIocGlja2VyOiBDb250cm9sVmFsdWVBY2Nlc3Nvcikge1xuICAgIGlmIChwaWNrZXIpIHtcbiAgICAgIHRoaXMuX3BpY2tlciA9IHBpY2tlcjtcbiAgICAgIHBpY2tlci5yZWdpc3Rlck9uQ2hhbmdlKCh2YWx1ZSkgPT4gdGhpcy51cGRhdGVWYWx1ZSh2YWx1ZSkpO1xuICAgIH1cbiAgfVxuICBfcGlja2VyOiBDb250cm9sVmFsdWVBY2Nlc3NvcjtcbiAgLyoqXG4gICAqIGBhdXRvY29tcGxldGVgIGF0dHJpYnV0ZSB0byBiZSBzZXQgb24gdGhlIGlucHV0IGVsZW1lbnQuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIEBJbnB1dCgnYXV0b2NvbXBsZXRlJykgYXV0b2NvbXBsZXRlQXR0cmlidXRlOiBzdHJpbmcgPSAnb2ZmJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+LFxuICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgQEluamVjdChOT1ZPX0lOUFVUX0ZPUk1BVCkgcHJpdmF0ZSBmb3JtYXR0ZXI6IE5vdm9JbnB1dEZvcm1hdDxhbnk+LFxuICApIHtcbiAgICBpZiAoIXRoaXMuZm9ybWF0dGVyKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1BpY2tlciBkaXJlY3RpdmUgaXMgbWlzc2luZyByZXF1aXJlZCBmb3JtYXR0ZXInKTtcbiAgICB9XG4gICAgdGhpcy5mb3JtYXR0ZXI/LnZhbHVlQ2hhbmdlLnN1YnNjcmliZSgodmFsdWUpID0+IHtcbiAgICAgIHRoaXMudXBkYXRlUGlja2VyKHZhbHVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLmZvcm1hdHRlci53cml0ZVZhbHVlKHZhbHVlKTtcbiAgfVxuXG4gIHVwZGF0ZVBpY2tlcih2YWx1ZTogYW55KSB7XG4gICAgaWYgKHRoaXMuX3BpY2tlcikge1xuICAgICAgdGhpcy5fcGlja2VyLndyaXRlVmFsdWUodmFsdWUpO1xuICAgIH1cbiAgfVxufVxuIl19
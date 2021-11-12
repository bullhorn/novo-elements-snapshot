import { Directive, ElementRef, Inject, Input, Optional, Self } from '@angular/core';
import { NOVO_INPUT_FORMAT } from './formats/base-format';
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
NovoPickerDirective.decorators = [
    { type: Directive, args: [{
                selector: 'input[picker]',
                host: {
                    class: 'novo-has-picker',
                    '[attr.autocomplete]': 'autocompleteAttribute',
                },
            },] }
];
NovoPickerDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NOVO_INPUT_FORMAT,] }] }
];
NovoPickerDirective.propDecorators = {
    picker: [{ type: Input }],
    autocompleteAttribute: [{ type: Input, args: ['autocomplete',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja2VyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9maWVsZC9waWNrZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVyRixPQUFPLEVBQW1CLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFM0UsNkRBQTZEO0FBUTdELE1BQU0sT0FBTyxtQkFBbUI7SUFnQjlCLFlBQ1UsV0FBeUMsRUFDTSxTQUErQjs7UUFEOUUsZ0JBQVcsR0FBWCxXQUFXLENBQThCO1FBQ00sY0FBUyxHQUFULFNBQVMsQ0FBc0I7UUFSeEY7OztXQUdHO1FBQ29CLDBCQUFxQixHQUFXLEtBQUssQ0FBQztRQU0zRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNuQixPQUFPLENBQUMsSUFBSSxDQUFDLGdEQUFnRCxDQUFDLENBQUM7U0FDaEU7UUFDRCxNQUFBLElBQUksQ0FBQyxTQUFTLDBDQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUM5QyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLENBQUMsRUFBRTtJQUNMLENBQUM7SUF6QkQseURBQXlEO0lBQ3pELElBQ0ksTUFBTSxDQUFDLE1BQTRCO1FBQ3JDLElBQUksTUFBTSxFQUFFO1lBQ1YsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7WUFDdEIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDN0Q7SUFDSCxDQUFDO0lBb0JELFdBQVcsQ0FBQyxLQUFVO1FBQ3BCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxZQUFZLENBQUMsS0FBVTtRQUNyQixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDaEM7SUFDSCxDQUFDOzs7WUEzQ0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2dCQUN6QixJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLGlCQUFpQjtvQkFDeEIscUJBQXFCLEVBQUUsdUJBQXVCO2lCQUMvQzthQUNGOzs7WUFYbUIsVUFBVTs0Q0E4QnpCLFFBQVEsWUFBSSxJQUFJLFlBQUksTUFBTSxTQUFDLGlCQUFpQjs7O3FCQWhCOUMsS0FBSztvQ0FZTCxLQUFLLFNBQUMsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5qZWN0LCBJbnB1dCwgT3B0aW9uYWwsIFNlbGYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTm92b0lucHV0Rm9ybWF0LCBOT1ZPX0lOUFVUX0ZPUk1BVCB9IGZyb20gJy4vZm9ybWF0cy9iYXNlLWZvcm1hdCc7XG5cbi8qKiBEaXJlY3RpdmUgdXNlZCB0byBjb25uZWN0IGFuIGlucHV0IHRvIGEgTWF0RGF0ZXBpY2tlci4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2lucHV0W3BpY2tlcl0nLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLWhhcy1waWNrZXInLFxuICAgICdbYXR0ci5hdXRvY29tcGxldGVdJzogJ2F1dG9jb21wbGV0ZUF0dHJpYnV0ZScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9QaWNrZXJEaXJlY3RpdmUge1xuICAvKiogVGhlIGRhdGVwaWNrZXIgdGhhdCB0aGlzIGlucHV0IGlzIGFzc29jaWF0ZWQgd2l0aC4gKi9cbiAgQElucHV0KClcbiAgc2V0IHBpY2tlcihwaWNrZXI6IENvbnRyb2xWYWx1ZUFjY2Vzc29yKSB7XG4gICAgaWYgKHBpY2tlcikge1xuICAgICAgdGhpcy5fcGlja2VyID0gcGlja2VyO1xuICAgICAgcGlja2VyLnJlZ2lzdGVyT25DaGFuZ2UoKHZhbHVlKSA9PiB0aGlzLnVwZGF0ZVZhbHVlKHZhbHVlKSk7XG4gICAgfVxuICB9XG4gIF9waWNrZXI6IENvbnRyb2xWYWx1ZUFjY2Vzc29yO1xuICAvKipcbiAgICogYGF1dG9jb21wbGV0ZWAgYXR0cmlidXRlIHRvIGJlIHNldCBvbiB0aGUgaW5wdXQgZWxlbWVudC5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgQElucHV0KCdhdXRvY29tcGxldGUnKSBhdXRvY29tcGxldGVBdHRyaWJ1dGU6IHN0cmluZyA9ICdvZmYnO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD4sXG4gICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBASW5qZWN0KE5PVk9fSU5QVVRfRk9STUFUKSBwcml2YXRlIGZvcm1hdHRlcjogTm92b0lucHV0Rm9ybWF0PGFueT4sXG4gICkge1xuICAgIGlmICghdGhpcy5mb3JtYXR0ZXIpIHtcbiAgICAgIGNvbnNvbGUud2FybignUGlja2VyIGRpcmVjdGl2ZSBpcyBtaXNzaW5nIHJlcXVpcmVkIGZvcm1hdHRlcicpO1xuICAgIH1cbiAgICB0aGlzLmZvcm1hdHRlcj8udmFsdWVDaGFuZ2Uuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICAgICAgdGhpcy51cGRhdGVQaWNrZXIodmFsdWUpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIHRoaXMuZm9ybWF0dGVyLndyaXRlVmFsdWUodmFsdWUpO1xuICB9XG5cbiAgdXBkYXRlUGlja2VyKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodGhpcy5fcGlja2VyKSB7XG4gICAgICB0aGlzLl9waWNrZXIud3JpdGVWYWx1ZSh2YWx1ZSk7XG4gICAgfVxuICB9XG59XG4iXX0=
import { ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NovoInputFormat } from './formats/base-format';
/** Directive used to connect an input to a MatDatepicker. */
export declare class NovoPickerDirective {
    private _elementRef;
    private formatter;
    /** The datepicker that this input is associated with. */
    set picker(picker: ControlValueAccessor);
    _picker: ControlValueAccessor;
    /**
     * `autocomplete` attribute to be set on the input element.
     * @docs-private
     */
    autocompleteAttribute: string;
    constructor(_elementRef: ElementRef<HTMLInputElement>, formatter: NovoInputFormat<any>);
    updateValue(value: any): void;
    updatePicker(value: any): void;
}

import { ChangeDetectorRef, ElementRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Day } from 'date-fns';
import { NovoLabelService } from 'novo-elements/services';
import * as i0 from "@angular/core";
export declare class NovoDateTimePickerInputElement implements ControlValueAccessor {
    element: ElementRef;
    labels: NovoLabelService;
    private _changeDetectorRef;
    value: any;
    datePart: any;
    timePart: any;
    /** View -> model callback called when value changes */
    _onChange: (value: any) => void;
    /** View -> model callback called when autocomplete has been touched */
    _onTouched: () => void;
    name: string;
    start: Date;
    end: Date;
    placeholder: string;
    maskOptions: any;
    military: boolean;
    disabled: boolean;
    format: string;
    weekStart: Day;
    disabledDateMessage: string;
    blurEvent: EventEmitter<FocusEvent>;
    focusEvent: EventEmitter<FocusEvent>;
    changeEvent: EventEmitter<FocusEvent>;
    constructor(element: ElementRef, labels: NovoLabelService, _changeDetectorRef: ChangeDetectorRef);
    writeValue(value: any): void;
    updateDate(event: any): void;
    updateTime(event: any): void;
    handleBlur(event: any): void;
    handleFocus(event: any): void;
    checkParts(): void;
    registerOnChange(fn: (value: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
    setDisabledState(disabled: boolean): void;
    dispatchOnChange(newValue?: any): void;
    private _setTriggerValue;
    setValue(event: any | null): void;
    setValueAndClose(event: any | null): void;
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    clearValue(): void;
    get hasValue(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDateTimePickerInputElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDateTimePickerInputElement, "novo-date-time-picker-input", never, { "name": "name"; "start": "start"; "end": "end"; "placeholder": "placeholder"; "maskOptions": "maskOptions"; "military": "military"; "disabled": "disabled"; "format": "format"; "weekStart": "weekStart"; "disabledDateMessage": "disabledDateMessage"; }, { "blurEvent": "blurEvent"; "focusEvent": "focusEvent"; "changeEvent": "changeEvent"; }, never, never>;
}

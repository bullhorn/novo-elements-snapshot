import { ChangeDetectorRef, ElementRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NovoLabelService } from '../../services/novo-label-service';
import * as ɵngcc0 from '@angular/core';
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
    weekStart: number;
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoDateTimePickerInputElement, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoDateTimePickerInputElement, "novo-date-time-picker-input", never, { "military": "military"; "disabled": "disabled"; "weekStart": "weekStart"; "name": "name"; "start": "start"; "end": "end"; "placeholder": "placeholder"; "maskOptions": "maskOptions"; "format": "format"; }, { "blurEvent": "blurEvent"; "focusEvent": "focusEvent"; "changeEvent": "changeEvent"; }, never, never>;
}

//# sourceMappingURL=DateTimePickerInput.d.ts.map
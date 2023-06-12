import { ChangeDetectorRef, ElementRef, EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NovoOverlayTemplateComponent } from 'novo-elements/elements/common';
import { DateFormatService, NovoLabelService } from 'novo-elements/services';
import * as i0 from "@angular/core";
export declare class NovoTimePickerInputElement implements OnInit, OnChanges, ControlValueAccessor {
    element: ElementRef;
    labels: NovoLabelService;
    dateFormatService: DateFormatService;
    protected _changeDetectorRef: ChangeDetectorRef;
    value: any;
    /** View -> model callback called when value changes */
    _onChange: (value: any) => void;
    /** View -> model callback called when autocomplete has been touched */
    _onTouched: () => void;
    name: string;
    placeholder: string;
    military: boolean;
    maskOptions: any;
    disabled: boolean;
    /**
     * @deprecated don't use
     */
    analog: boolean;
    blurEvent: EventEmitter<FocusEvent>;
    focusEvent: EventEmitter<FocusEvent>;
    /** Element for the panel containing the autocomplete options. */
    overlay: NovoOverlayTemplateComponent;
    input: HTMLInputElement;
    constructor(element: ElementRef, labels: NovoLabelService, dateFormatService: DateFormatService, _changeDetectorRef: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnChanges(changes?: SimpleChanges): void;
    initFormatOptions(): void;
    onComplete(dt: any): void;
    /** BEGIN: Convenient Panel Methods. */
    openPanel(): void;
    closePanel(): void;
    get panelOpen(): boolean;
    /** END: Convenient Panel Methods. */
    _handleKeydown(event: KeyboardEvent): void;
    _handleInput(event: KeyboardEvent): void;
    _handleBlur(event: FocusEvent): void;
    _handleFocus(event: FocusEvent): void;
    writeValue(value: any): void;
    registerOnChange(fn: (value: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
    setDisabledState(disabled: boolean): void;
    dispatchOnChange(newValue?: any, skip?: boolean): void;
    private _setTriggerValue;
    setValue(event: any | null): void;
    setValueAndClose(event: any | null): void;
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    clearValue(): void;
    get hasValue(): boolean;
    scrollToIndex(index: number): void;
    convertTime12to24(time12h: string): string;
    hourOneFormatRequired(hourInput: string): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoTimePickerInputElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoTimePickerInputElement, "novo-time-picker-input", never, { "name": "name"; "placeholder": "placeholder"; "military": "military"; "maskOptions": "maskOptions"; "disabled": "disabled"; "analog": "analog"; }, { "blurEvent": "blurEvent"; "focusEvent": "focusEvent"; }, never, never>;
}

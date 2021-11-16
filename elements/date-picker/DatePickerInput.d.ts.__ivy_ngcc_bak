import { ChangeDetectorRef, ElementRef, OnInit, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NovoOverlayTemplateComponent } from '../overlay/Overlay';
import { NovoLabelService } from '../../services/novo-label-service';
import { DateFormatService } from '../../services/date-format/DateFormat';
export declare class NovoDatePickerInputElement implements OnInit, ControlValueAccessor {
    element: ElementRef;
    labels: NovoLabelService;
    private _changeDetectorRef;
    dateFormatService: DateFormatService;
    value: any;
    formattedValue: string;
    private userDefinedFormat;
    /** View -> model callback called when value changes */
    _onChange: (value: any) => void;
    /** View -> model callback called when autocomplete has been touched */
    _onTouched: () => void;
    name: string;
    start: Date;
    end: Date;
    placeholder: string;
    maskOptions: any;
    format: string;
    textMaskEnabled: boolean;
    allowInvalidDate: boolean;
    disabled: boolean;
    weekStart: number;
    blurEvent: EventEmitter<FocusEvent>;
    focusEvent: EventEmitter<FocusEvent>;
    changeEvent: EventEmitter<FocusEvent>;
    /** Element for the panel containing the autocomplete options. */
    overlay: NovoOverlayTemplateComponent;
    constructor(element: ElementRef, labels: NovoLabelService, _changeDetectorRef: ChangeDetectorRef, dateFormatService: DateFormatService);
    ngOnInit(): void;
    /** BEGIN: Convenient Panel Methods. */
    openPanel(): void;
    closePanel(): void;
    get panelOpen(): boolean;
    /** END: Convenient Panel Methods. */
    _handleKeydown(event: KeyboardEvent): void;
    _handleInput(event: KeyboardEvent): void;
    _handleBlur(event: FocusEvent): void;
    _handleFocus(event: FocusEvent): void;
    _handleEvent(event: Event, blur: boolean): void;
    protected formatDate(value: string, blur: boolean): void;
    writeValue(value: any): void;
    registerOnChange(fn: (value: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
    setDisabledState(disabled: boolean): void;
    dispatchOnChange(newValue?: any, blur?: boolean, skip?: boolean): void;
    private _setTriggerValue;
    private _setCalendarValue;
    private _setFormValue;
    /**
     * This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     */
    setValueAndClose(event: any | null): void;
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    clearValue(): void;
    formatDateValue(value: any): any;
    get hasValue(): boolean;
}

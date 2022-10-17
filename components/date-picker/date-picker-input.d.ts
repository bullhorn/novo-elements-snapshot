import { ChangeDetectorRef, ElementRef, EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NovoOverlayTemplateComponent } from 'novo-elements/common/overlay';
import { DateFormatService, NovoLabelService } from 'novo-elements/services';
import * as i0 from "@angular/core";
export declare class NovoDatePickerInputElement implements OnInit, OnChanges, ControlValueAccessor {
    element: ElementRef;
    labels: NovoLabelService;
    private _changeDetectorRef;
    dateFormatService: DateFormatService;
    value: any;
    formattedValue: string;
    showInvalidDateError: boolean;
    invalidDateErrorMessage: string;
    private userDefinedFormat;
    private isInvalidDate;
    /** View -> model callback called when value changes */
    _onChange: (value: any) => void;
    /** View -> model callback called when autocomplete has been touched */
    _onTouched: () => void;
    /**
     * The name of the form field, get passed to the native `input` element
     **/
    name: string;
    /**
     * The minimum date that can be selected.
     **/
    start: Date;
    /**
     * The maximum date that can be selected.
     **/
    end: Date;
    /**
     * Placeholder text to display in the input when it is empty.
     **/
    placeholder: string;
    /**
     * MaskOptions to pass to the textMaskAddons plugin
     **/
    maskOptions: any;
    /**
     * The format to use to parse and render dates: DD/MM/YYYY or MM/DD/YYYY
     **/
    format: string;
    textMaskEnabled: boolean;
    allowInvalidDate: boolean;
    /**
     * Sets the field as to appear disabled, users will not be able to interact with the text field.
     **/
    disabled: boolean;
    disabledDateMessage: string;
    /**
     * Day of the week the calendar should display first, Sunday=0...Saturday=6
     **/
    weekStart: number;
    blurEvent: EventEmitter<FocusEvent>;
    focusEvent: EventEmitter<FocusEvent>;
    changeEvent: EventEmitter<FocusEvent>;
    /** Element for the panel containing the autocomplete options. */
    overlay: NovoOverlayTemplateComponent;
    constructor(element: ElementRef, labels: NovoLabelService, _changeDetectorRef: ChangeDetectorRef, dateFormatService: DateFormatService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    _initFormatOptions(): void;
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
    handleInvalidDate(): void;
    setupInvalidDateErrorMessage(): void;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDatePickerInputElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDatePickerInputElement, "novo-date-picker-input", never, { "name": "name"; "start": "start"; "end": "end"; "placeholder": "placeholder"; "maskOptions": "maskOptions"; "format": "format"; "textMaskEnabled": "textMaskEnabled"; "allowInvalidDate": "allowInvalidDate"; "disabled": "disabled"; "disabledDateMessage": "disabledDateMessage"; "weekStart": "weekStart"; }, { "blurEvent": "blurEvent"; "focusEvent": "focusEvent"; "changeEvent": "changeEvent"; }, never, never>;
}

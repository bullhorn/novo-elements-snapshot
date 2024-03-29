import { ChangeDetectorRef, ElementRef, EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { DateFormatService } from '../../services/date-format/DateFormat';
import { NovoLabelService } from '../../services/novo-label-service';
import { NovoOverlayTemplateComponent } from '../common/overlay/Overlay';
import { RangeModel } from './date-picker.types';
export declare class NovoDateRangeInputElement implements OnInit, OnChanges, ControlValueAccessor {
    element: ElementRef;
    labels: NovoLabelService;
    private cdr;
    dateFormatService: DateFormatService;
    formattedStartDate: string;
    formattedEndDate: string;
    private userDefinedFormat;
    name: string;
    start: Date;
    end: Date;
    weekRangeSelect: boolean;
    mode: string;
    placeholder: string;
    maskOptions: any;
    format: string;
    textMaskEnabled: boolean;
    allowInvalidDate: boolean;
    weekStart: number;
    blurEvent: EventEmitter<FocusEvent>;
    focusEvent: EventEmitter<FocusEvent>;
    /** Element for the panel containing the autocomplete options. */
    overlay: NovoOverlayTemplateComponent;
    change: EventEmitter<any>;
    blur: EventEmitter<any>;
    focus: EventEmitter<any>;
    private _value;
    private _disabled;
    get value(): RangeModel;
    set value(value: RangeModel);
    get disabled(): boolean;
    set disabled(value: boolean);
    constructor(element: ElementRef, labels: NovoLabelService, cdr: ChangeDetectorRef, dateFormatService: DateFormatService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    _initFormatOptions(): void;
    /** BEGIN: Convenient Panel Methods. */
    openPanel(): void;
    closePanel(): void;
    get panelOpen(): boolean;
    /** END: Convenient Panel Methods. */
    _handleKeydown(event: KeyboardEvent): void;
    _handleBlur(event: FocusEvent): void;
    _handleFocus(event: FocusEvent): void;
    protected formatDate(value: string): Date;
    writeValue(value: any): void;
    setDisabledState(disabled: boolean): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    private onChangeCallback;
    private onTouchedCallback;
    _onStartInputChange(event: KeyboardEvent): void;
    _onEndInputChange(event: KeyboardEvent): void;
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
    clearStartValue(): void;
    clearEndValue(): void;
    formatDateValue(value: any): any;
    get hasStartValue(): boolean;
    get hasEndValue(): boolean;
}

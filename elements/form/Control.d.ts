import { ChangeDetectorRef, ElementRef, EventEmitter, OnInit, OnDestroy, AfterContentInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OutsideClick } from '../../utils/outside-click/OutsideClick';
import { NovoLabelService } from '../../services/novo-label-service';
import { DateFormatService } from '../../services/date-format/DateFormat';
import { FieldInteractionApi } from './FieldInteractionApi';
import { NovoTemplateService } from '../../services/template/NovoTemplateService';
export interface IMaskOptions {
    mask: any;
    keepCharPositions: boolean;
    guide: boolean;
}
export declare class NovoAutoSize implements AfterContentInit {
    element: ElementRef;
    onInput(textArea: HTMLTextAreaElement): void;
    constructor(element: ElementRef);
    ngAfterContentInit(): void;
    adjust(): void;
}
export declare class NovoControlElement extends OutsideClick implements OnInit, OnDestroy, AfterViewInit, AfterContentInit {
    labels: NovoLabelService;
    private dateFormatService;
    private fieldInteractionApi;
    private templateService;
    private changeDetectorRef;
    private locale;
    control: any;
    form: any;
    condensed: boolean;
    autoFocus: boolean;
    change: EventEmitter<any>;
    edit: EventEmitter<any>;
    save: EventEmitter<any>;
    delete: EventEmitter<any>;
    upload: EventEmitter<any>;
    readonly onBlur: Observable<FocusEvent>;
    readonly onFocus: Observable<FocusEvent>;
    maxLength: number;
    focusedField: string;
    formattedValue: string;
    percentValue: number;
    maxLengthMet: boolean;
    itemCount: number;
    maskOptions: IMaskOptions;
    private _blurEmitter;
    private _focusEmitter;
    private _focused;
    private _enteredText;
    private forceClearSubscription;
    private percentChangeSubscription;
    private valueChangeSubscription;
    private dateChangeSubscription;
    private _showCount;
    private characterCountField;
    private maxLengthMetErrorfields;
    private statusChangeSubscription;
    templates: any;
    templateContext: any;
    loading: boolean;
    constructor(element: ElementRef, labels: NovoLabelService, dateFormatService: DateFormatService, fieldInteractionApi: FieldInteractionApi, templateService: NovoTemplateService, changeDetectorRef: ChangeDetectorRef, locale?: string);
    readonly maxlengthMetField: string;
    readonly maxlengthErrorField: string;
    readonly showFieldMessage: boolean;
    readonly showMaxLengthMetMessage: boolean;
    readonly showErrorState: any;
    showCount: boolean;
    readonly showMessages: boolean;
    readonly decimalSeparator: string;
    ngAfterViewInit(): void;
    ngAfterContentInit(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    readonly errors: any;
    readonly isValid: any;
    readonly isDirty: any;
    readonly hasValue: boolean;
    readonly focused: boolean;
    readonly tooltip: any;
    readonly tooltipPosition: any;
    readonly tooltipSize: any;
    readonly tooltipPreline: any;
    readonly removeTooltipArrow: any;
    readonly alwaysActive: boolean;
    readonly requiresExtraSpacing: boolean;
    executeInteraction(interaction: any, isInvokedOnInit?: boolean): void;
    handleTyping(event: any): void;
    handleFocus(event: FocusEvent, field?: any): void;
    handleBlur(event: FocusEvent): void;
    clearValue(): void;
    handleTextAreaInput(event: any): void;
    checkMaxLength(event: any): void;
    modelChangeWithRaw(event: any): void;
    modelChange(value: any): void;
    validateNumberOnBlur(event: FocusEvent): void;
    validateIntegerInput(): void;
    restrictKeys(event: any): void;
    handlePercentChange(event: KeyboardEvent): void;
    handleTabForPickers(event: any): void;
    emitChange(value: any): void;
    handleEdit(value: any): void;
    handleSave(value: any): void;
    handleDelete(value: any): void;
    handleUpload(value: any): void;
    handleAddressChange(data: any): void;
    updateValidity(shouldEventBeEmitted: any): void;
}

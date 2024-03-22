import { AfterContentInit, AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { DateFormatService, NovoLabelService, NovoTemplateService } from 'novo-elements/services';
import { OutsideClick } from 'novo-elements/utils';
import { Observable } from 'rxjs';
import { MaskedOptions } from 'imask';
import { FieldInteractionApi } from './FieldInteractionApi';
import * as i0 from "@angular/core";
export interface IMaskOptions {
    mask: MaskedOptions['mask'];
    keepCharPositions: boolean;
    guide: boolean;
}
export declare class NovoAutoSize implements AfterContentInit {
    element: ElementRef;
    onInput(textArea: HTMLTextAreaElement): void;
    constructor(element: ElementRef);
    ngAfterContentInit(): void;
    adjust(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoAutoSize, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoAutoSize, "textarea[autosize]", never, {}, {}, never, never, false, never>;
}
export declare class NovoControlElement extends OutsideClick implements OnInit, OnDestroy, AfterViewInit, AfterContentInit {
    labels: NovoLabelService;
    private dateFormatService;
    private fieldInteractionApi;
    private templateService;
    private changeDetectorRef;
    locale: string;
    control: any;
    form: any;
    condensed: boolean;
    autoFocus: boolean;
    change: EventEmitter<any>;
    edit: EventEmitter<any>;
    save: EventEmitter<any>;
    delete: EventEmitter<any>;
    upload: EventEmitter<any>;
    get onBlur(): Observable<FocusEvent>;
    get onFocus(): Observable<FocusEvent>;
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
    get maxlengthMetField(): string;
    get maxlengthErrorField(): string;
    get showFieldMessage(): boolean;
    get showMaxLengthMetMessage(): boolean;
    get showErrorState(): any;
    get showCount(): boolean;
    set showCount(value: boolean);
    get showMessages(): boolean;
    get decimalSeparator(): string;
    ngAfterViewInit(): void;
    ngAfterContentInit(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    get errors(): any;
    get isValid(): any;
    get isDirty(): any;
    get hasValue(): boolean;
    get focused(): boolean;
    get tooltip(): any;
    get tooltipPosition(): any;
    get tooltipSize(): any;
    get tooltipPreline(): any;
    get removeTooltipArrow(): any;
    get alwaysActive(): boolean;
    get requiresExtraSpacing(): boolean;
    executeInteraction(interaction: any, isInvokedOnInit?: boolean): void;
    handleTyping(event: any): void;
    handleAccept(value: string): void;
    handleFocus(event: FocusEvent, field?: any): void;
    handleBlur(event: FocusEvent): void;
    clearValue(): void;
    handleTextAreaInput(event: KeyboardEvent): void;
    checkMaxLength(value: string): void;
    modelChangeWithRaw(event: any): void;
    modelChange(value: any): void;
    validateNumberOnBlur(event: FocusEvent): void;
    validateIntegerInput(): void;
    restrictKeys(event: KeyboardEvent): void;
    handlePercentChange(event: KeyboardEvent): void;
    handleTabForPickers(event: any): void;
    emitChange(value: string): void;
    handleSimpleTextInput(event: Event): void;
    handleEdit(value: any): void;
    handleSave(value: any): void;
    handleDelete(value: any): void;
    handleUpload(value: any): void;
    handleAddressChange(data: any): void;
    updateValidity(shouldEventBeEmitted: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoControlElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoControlElement, "novo-control", never, { "control": { "alias": "control"; "required": false; }; "form": { "alias": "form"; "required": false; }; "condensed": { "alias": "condensed"; "required": false; }; "autoFocus": { "alias": "autoFocus"; "required": false; }; }, { "change": "change"; "edit": "edit"; "save": "save"; "delete": "delete"; "upload": "upload"; "onBlur": "blur"; "onFocus": "focus"; }, never, never, false, never>;
}

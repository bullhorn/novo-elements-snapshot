import { FocusKeyManager } from '@angular/cdk/a11y';
import { ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { NovoDragulaService } from '../../../../elements/dragula/DragulaService';
import { NovoLabelService } from '../../../../services/novo-label-service';
import { CanUpdateErrorStateCtor, ErrorStateMatcher } from '../../../common';
import { NovoFieldControl } from '../../../field';
declare class NovoFileInputBase {
    _defaultErrorStateMatcher: ErrorStateMatcher;
    _parentForm: NgForm;
    _parentFormGroup: FormGroupDirective;
    ngControl: NgControl;
    constructor(_defaultErrorStateMatcher: ErrorStateMatcher, _parentForm: NgForm, _parentFormGroup: FormGroupDirective, ngControl: NgControl);
}
declare const NovoFileInputMixins: CanUpdateErrorStateCtor & typeof NovoFileInputBase;
export declare class NovoFileInputElement extends NovoFileInputMixins implements NovoFieldControl<any>, ControlValueAccessor, OnInit, OnDestroy, OnChanges {
    private element;
    labels: NovoLabelService;
    private dragula;
    private _uniqueId;
    /** The aria-describedby attribute on the chip list for improved a11y. */
    _ariaDescribedby: string;
    /** Tab index for the chip list. */
    _tabIndex: number;
    /** User defined tab index. */
    _userTabIndex: number | null;
    /** The FocusKeyManager which handles focus. */
    _keyManager: FocusKeyManager<NovoFileInputElement>;
    readonly controlType: string;
    /** @docs-private Implemented as part of NovoFieldControl. */
    lastKeyValue: string;
    /** @docs-private Implemented as part of NovoFieldControl.*/
    lastCaretPosition: number | null;
    id: string;
    tabindex: number;
    /** An object used to control when error messages are shown. */
    errorStateMatcher: ErrorStateMatcher;
    fileInput: TemplateRef<any>;
    fileOutput: TemplateRef<any>;
    container: ViewContainerRef;
    multiple: boolean;
    layoutOptions: {
        order?: string;
        download?: boolean;
        edit?: boolean;
        labelStyle?: string;
        draggable?: boolean;
        customActions: boolean;
        removable?: boolean;
        customValidation?: {
            action: string;
            fn: Function;
        }[];
        removableWhenNew?: boolean;
    };
    value: Array<any>;
    dataFeatureId: string;
    edit: EventEmitter<any>;
    save: EventEmitter<any>;
    delete: EventEmitter<any>;
    upload: EventEmitter<any>;
    elements: Array<any>;
    files: Array<any>;
    model: any;
    active: boolean;
    commands: any;
    visible: boolean;
    target: any;
    fileOutputBag: string;
    onModelChange: Function;
    onModelTouched: Function;
    get name(): string;
    set name(value: string);
    get disabled(): boolean;
    set disabled(value: boolean);
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get required(): boolean;
    set required(value: boolean);
    /** Implemented as part of NovoFieldControl. */
    get placeholder(): string;
    set placeholder(value: string);
    protected _name: string;
    protected _value: boolean;
    protected _required: boolean;
    protected _disabled: boolean;
    protected _placeholder: string;
    constructor(element: ElementRef, labels: NovoLabelService, dragula: NovoDragulaService, _defaultErrorStateMatcher: ErrorStateMatcher, _parentForm: NgForm, _parentFormGroup: FormGroupDirective, _ngControl: NgControl);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes?: SimpleChanges): void;
    updateLayout(): void;
    insertTemplatesBasedOnLayout(): any;
    initializeDragula(): void;
    setInitialFileList(): void;
    dragEnterHandler(event: any): void;
    dragLeaveHandler(event: any): void;
    dragOverHandler(event: any): void;
    dropHandler(event: any): void;
    writeValue(model: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    check(event: any): void;
    validate(files: any): boolean;
    process(filelist: any): void;
    download(file: any): void;
    remove(file: any): void;
    readFile(file: any): Promise<unknown>;
    customEdit(file: any): void;
    customSave(file: any): void;
    customDelete(file: any): void;
    customCheck(event: any): void;
    setDisabledState(disabled: boolean): void;
    /** Whether any radio buttons has focus. */
    get focused(): boolean;
    /** Implemented as part of NovoFieldControl. */
    get empty(): boolean;
    /** Implemented as part of NovoFieldControl. */
    get shouldLabelFloat(): boolean;
    /** Implemented as part of NovoFieldControl. */
    setDescribedByIds(ids: string[]): void;
    /** Implemented as part of NovoFieldControl. */
    onContainerClick(event: MouseEvent): void;
    /**
     * Focuses the first non-disabled chip in this chip list, or the associated input when there
     * are no eligible chips.
     */
    focus(options?: FocusOptions): void;
}
export {};

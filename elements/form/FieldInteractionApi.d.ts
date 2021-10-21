import { HttpClient } from '@angular/common/http';
import { NovoLabelService } from '../../services/novo-label-service';
import { AppBridge } from '../../utils/app-bridge/AppBridge';
import { FormUtils } from '../../utils/form-utils/FormUtils';
import { NovoModalService } from '../modal/modal.service';
import { NovoToastService, ToastOptions } from '../toast/ToastService';
import { ModifyPickerConfigArgs, OptionsFunction } from './FieldInteractionApiTypes';
import { NovoFieldset, ResultsTemplateType } from './FormInterfaces';
import { NovoFormControl } from './NovoFormControl';
import { NovoFormGroup } from './NovoFormGroup';
import * as i0 from "@angular/core";
export declare class FieldInteractionApi {
    private toaster;
    private modalService;
    private formUtils;
    private http;
    private labels;
    private _globals;
    form: NovoFormGroup | any;
    private _currentKey;
    appBridge: AppBridge;
    private asyncBlockTimeout;
    static FIELD_POSITIONS: {
        ABOVE_FIELD: string;
        BELOW_FIELD: string;
        TOP_OF_FORM: string;
        BOTTOM_OF_FORM: string;
    };
    constructor(toaster: NovoToastService, modalService: NovoModalService, formUtils: FormUtils, http: HttpClient, labels: NovoLabelService);
    get associations(): any;
    get currentEntity(): string;
    get currentEntityId(): string;
    get isEdit(): boolean;
    get isAdd(): boolean;
    set globals(globals: any);
    get globals(): any;
    set currentKey(key: string);
    get currentKey(): string;
    isActiveControlValid(): boolean;
    getActiveControl(): NovoFormControl;
    getActiveKey(): string;
    getActiveValue(): any;
    getActiveInitialValue(): any;
    getFieldSet(key: string): NovoFieldset;
    getControl(key: string): NovoFormControl;
    getValue(key: string): any;
    getRawValue(key: string): any;
    getInitialValue(key: string): any;
    setValue(key: string, value: any, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
        emitModelToViewChange?: boolean;
        emitViewToModelChange?: boolean;
    }): void;
    patchValue(key: string, value: any, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
        emitModelToViewChange?: boolean;
        emitViewToModelChange?: boolean;
    }): void;
    setReadOnly(key: string, isReadOnly: boolean): void;
    setRequired(key: string, required: boolean): void;
    hide(key: string, clearValue?: boolean): NovoFormControl;
    show(key: string): void;
    hideFieldSetHeader(key: string): void;
    showFieldSetHeader(key: string): void;
    disable(key: string, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void;
    enable(key: string, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void;
    markAsInvalid(key: string, validationMessage?: string): void;
    markAsDirty(key: string, options?: {
        onlySelf?: boolean;
    }): void;
    markAsPending(key: string, options?: {
        onlySelf?: boolean;
    }): void;
    markAsPristine(key: string, options?: {
        onlySelf?: boolean;
    }): void;
    markAsTouched(key: string, options?: {
        onlySelf?: boolean;
    }): void;
    markAsUntouched(key: string, options?: {
        onlySelf?: boolean;
    }): void;
    updateValueAndValidity(key: string, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void;
    displayToast(toastConfig: ToastOptions): void;
    displayTip(key: string, tip: string, icon?: string, allowDismiss?: boolean, sanitize?: boolean): void;
    setTooltip(key: string, tooltip: string): void;
    confirmChanges(key: string, message?: string): Promise<boolean>;
    promptUser(key: string, changes: string[]): Promise<boolean>;
    setProperty(key: string, prop: string, value: any): void;
    getProperty(key: string, prop: string): any;
    isValueEmpty(key: string): boolean;
    isValueBlank(key: string): boolean;
    hasField(key: string): boolean;
    addStaticOption(key: string, newOption: any): void;
    removeStaticOption(key: string, optionToRemove: string): void;
    modifyPickerConfig(key: string, config: {
        format?: string;
        optionsUrl?: string;
        optionsUrlBuilder?: Function;
        optionsPromise?: any;
        options?: any[];
        resultsTemplateType?: ResultsTemplateType;
    }, mapper?: any): void;
    mutatePickerConfig(key: string, args: ModifyPickerConfigArgs, mapper?: (item: unknown) => unknown): void;
    addPropertiesToPickerConfig(key: string, properties: {
        [key: string]: unknown;
    }): void;
    getOptionsConfig: (args: ModifyPickerConfigArgs, mapper?: (item: unknown) => unknown, filteredOptionsCreator?: (where: string) => (query: string) => Promise<unknown[]>, pickerConfigFormat?: string) => undefined | {
        options: unknown[];
    } | {
        options: OptionsFunction;
        format?: string;
    };
    private getAppropriateResultsTemplate;
    createOptionsFunction: (config: ModifyPickerConfigArgs, mapper?: (item: unknown) => unknown, filteredOptionsCreator?: (where?: string) => (query: string, page?: number) => Promise<unknown[]>) => (query: string) => Promise<unknown[]>;
    setLoading(key: string, loading: boolean): void;
    addControl(key: string, metaForNewField: {
        key?: string;
        type?: string;
        name?: string;
        label?: string;
    }, position?: string, initialValue?: any): void;
    removeControl(key: string): void;
    debounce(func: () => void, wait?: number): void;
    private triggerEvent;
    static ɵfac: i0.ɵɵFactoryDef<FieldInteractionApi, never>;
    static ɵprov: i0.ɵɵInjectableDef<FieldInteractionApi>;
}

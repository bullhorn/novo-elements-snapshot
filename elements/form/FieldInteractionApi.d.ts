import { HttpClient } from '@angular/common/http';
import { NovoFormControl } from './NovoFormControl';
import { FormUtils } from '../../utils/form-utils/FormUtils';
import { NovoToastService, ToastOptions } from '../toast/ToastService';
import { NovoModalService } from '../modal/ModalService';
import { AppBridge } from '../../utils/app-bridge/AppBridge';
import { NovoLabelService } from '../../services/novo-label-service';
import { NovoFieldset } from './FormInterfaces';
import { ModifyPickerConfigArgs, OptionsFunction } from './FieldInteractionApiTypes';
export declare class FieldInteractionApi {
    private toaster;
    private modalService;
    private formUtils;
    private http;
    private labels;
    private _globals;
    private _form;
    private _currentKey;
    private _appBridge;
    private asyncBlockTimeout;
    static FIELD_POSITIONS: {
        ABOVE_FIELD: string;
        BELOW_FIELD: string;
        TOP_OF_FORM: string;
        BOTTOM_OF_FORM: string;
    };
    constructor(toaster: NovoToastService, modalService: NovoModalService, formUtils: FormUtils, http: HttpClient, labels: NovoLabelService);
    form: any;
    readonly associations: object;
    readonly currentEntity: string;
    readonly currentEntityId: string;
    readonly isEdit: boolean;
    readonly isAdd: boolean;
    globals: any;
    currentKey: string;
    appBridge: AppBridge;
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
    hide(key: string, clearValue?: boolean): void;
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
    }, mapper?: any): void;
    mutatePickerConfig(key: string, args: ModifyPickerConfigArgs, mapper?: (item: unknown) => unknown): void;
    addPropertiesToPickerConfig(key: string, properties: {
        [key: string]: unknown;
    }): void;
    getOptionsConfig: (args: ModifyPickerConfigArgs, mapper?: (item: unknown) => unknown, filteredOptionsCreator?: (where: string) => (query: string) => Promise<unknown[]>, pickerConfigFormat?: string) => {
        options: unknown[];
    } | {
        options: OptionsFunction;
        format?: string;
    };
    createOptionsFunction: (config: ModifyPickerConfigArgs, mapper?: (item: unknown) => unknown, filteredOptionsCreator?: (where?: string) => (query: string, page?: number) => Promise<unknown[]>) => (query: string) => Promise<unknown[]>;
    setLoading(key: string, loading: boolean): void;
    addControl(key: string, metaForNewField: any, position?: string, initialValue?: any): void;
    removeControl(key: string): void;
    debounce(func: () => void, wait?: number): void;
    private triggerEvent;
}

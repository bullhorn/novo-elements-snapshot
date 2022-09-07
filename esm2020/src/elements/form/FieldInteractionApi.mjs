// NG2
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { NovoLabelService } from '../../services/novo-label-service';
import { FormUtils } from '../../utils/form-utils/FormUtils';
// APP
import { Helpers } from '../../utils/Helpers';
import { NovoModalService } from '../modal/modal.service';
import { EntityPickerResults } from '../picker/extras/entity-picker-results/EntityPickerResults';
import { NovoToastService } from '../toast/ToastService';
import { ControlConfirmModal, ControlPromptModal } from './FieldInteractionModals';
import { NovoFormControl } from './NovoFormControl';
import * as i0 from "@angular/core";
import * as i1 from "../toast/ToastService";
import * as i2 from "../modal/modal.service";
import * as i3 from "../../utils/form-utils/FormUtils";
import * as i4 from "@angular/common/http";
import * as i5 from "../../services/novo-label-service";
class CustomHttpImpl {
    constructor(http) {
        this.http = http;
        this.mapFn = (x) => x;
    }
    get(url, options) {
        this.url = url;
        this.options = options;
        return this;
    }
    map(mapFn) {
        this.mapFn = mapFn;
        return this;
    }
    subscribe(resolve, reject) {
        return this.http.get(this.url, this.options).pipe(map(this.mapFn)).subscribe(resolve, reject);
    }
}
export class FieldInteractionApi {
    constructor(toaster, modalService, formUtils, http, labels) {
        this.toaster = toaster;
        this.modalService = modalService;
        this.formUtils = formUtils;
        this.http = http;
        this.labels = labels;
        this._isInvokedOnInit = false;
        this.getOptionsConfig = (args, mapper, filteredOptionsCreator, pickerConfigFormat) => {
            if (filteredOptionsCreator || 'optionsUrl' in args || 'optionsUrlBuilder' in args || 'optionsPromise' in args) {
                const format = ('format' in args && args.format) || pickerConfigFormat;
                return {
                    options: this.createOptionsFunction(args, mapper, filteredOptionsCreator),
                    ...('emptyPickerMessage' in args && { emptyPickerMessage: args.emptyPickerMessage }),
                    ...(format && { format }),
                };
            }
            else if ('options' in args && Array.isArray(args.options)) {
                return {
                    options: [...args.options],
                };
            }
            else {
                return undefined;
            }
        };
        this.createOptionsFunction = (config, mapper, filteredOptionsCreator) => (query, page) => {
            if ('optionsPromise' in config && config.optionsPromise) {
                return config.optionsPromise(query, new CustomHttpImpl(this.http), page);
            }
            else if (('optionsUrlBuilder' in config && config.optionsUrlBuilder) || ('optionsUrl' in config && config.optionsUrl)) {
                return new Promise((resolve, reject) => {
                    const url = 'optionsUrlBuilder' in config ? config.optionsUrlBuilder(query) : `${config.optionsUrl}?filter=${query || ''}`;
                    this.http
                        .get(url)
                        .pipe(map((results) => {
                        if (mapper) {
                            return results.map(mapper);
                        }
                        return results;
                    }))
                        .subscribe(resolve, reject);
                });
            }
            else if (filteredOptionsCreator) {
                if ('where' in config) {
                    return filteredOptionsCreator(config.where)(query, page);
                }
                else {
                    return filteredOptionsCreator()(query, page);
                }
            }
        };
    }
    get associations() {
        return this.form.hasOwnProperty('associations') ? this.form.associations : {};
    }
    get currentEntity() {
        return this.form.hasOwnProperty('currentEntity') ? this.form.currentEntity : undefined;
    }
    get currentEntityId() {
        return this.form.hasOwnProperty('currentEntityId') ? this.form.currentEntityId : undefined;
    }
    get isEdit() {
        return this.form.hasOwnProperty('edit') ? this.form.edit : false;
    }
    get isAdd() {
        return this.form.hasOwnProperty('edit') ? !this.form.edit : false;
    }
    set globals(globals) {
        this._globals = globals;
    }
    get globals() {
        return this._globals;
    }
    set currentKey(key) {
        this._currentKey = key;
    }
    get currentKey() {
        return this._currentKey;
    }
    set isInvokedOnInit(isOnInit) {
        this._isInvokedOnInit = isOnInit;
    }
    get isInvokedOnInit() {
        return this._isInvokedOnInit;
    }
    isActiveControlValid() {
        return !!this.getValue(this.currentKey);
    }
    getActiveControl() {
        return this.getControl(this.currentKey);
    }
    getActiveKey() {
        return this.currentKey;
    }
    getActiveValue() {
        return this.getValue(this.currentKey);
    }
    getActiveInitialValue() {
        return this.getInitialValue(this.currentKey);
    }
    getFieldSet(key, otherForm) {
        if (!key) {
            console.error('[FieldInteractionAPI] - invalid or missing "key"'); // tslint:disable-line
            return null;
        }
        const form = otherForm || this.form;
        const fieldSet = form.fieldsets.find((fs) => fs.key && fs.key.toLowerCase() === key.toLowerCase());
        if (!fieldSet) {
            console.error('[FieldInteractionAPI] - could not find a fieldset in the form by the key --', key); // tslint:disable-line
            return null;
        }
        return fieldSet;
    }
    getControl(key, otherForm) {
        if (!key) {
            console.error('[FieldInteractionAPI] - invalid or missing "key"'); // tslint:disable-line
            return null;
        }
        const form = otherForm || this.form;
        const control = form.controls[key];
        if (!control) {
            console.error('[FieldInteractionAPI] - could not find a control in the form by the key --', key); // tslint:disable-line
            return null;
        }
        return control;
    }
    getFormGroupArray(key, otherForm) {
        if (!key) {
            console.error('[FieldInteractionAPI] - invalid or missing "key"'); // tslint:disable-line
            return null;
        }
        const form = otherForm || this.form;
        const formArray = form.controls[key];
        if (!formArray || !formArray.controls) {
            console.error('[FieldInteractionAPI] - could not find a form array in the form by the key --', key); // tslint:disable-line
            return null;
        }
        return formArray.controls;
    }
    getValue(key, otherForm) {
        const control = this.getControl(key, otherForm);
        if (control) {
            return control.value;
        }
        return null;
    }
    getRawValue(key, otherForm) {
        const control = this.getControl(key, otherForm);
        if (control) {
            return control.rawValue;
        }
        return null;
    }
    getInitialValue(key, otherForm) {
        const control = this.getControl(key, otherForm);
        if (control) {
            return control.initialValue;
        }
        return null;
    }
    setValue(key, value, options, otherForm) {
        const control = this.getControl(key, otherForm);
        if (control && !control.restrictFieldInteractions) {
            control.setValue(value, options);
            this.triggerEvent({ controlKey: key, prop: 'value', value }, otherForm);
        }
    }
    patchValue(key, value, options, otherForm) {
        const control = this.getControl(key, otherForm);
        if (control && !control.restrictFieldInteractions) {
            control.setValue(value, options);
            this.triggerEvent({ controlKey: key, prop: 'value', value }, otherForm);
        }
    }
    setReadOnly(key, isReadOnly, otherForm) {
        const control = this.getControl(key, otherForm);
        if (control && !control.restrictFieldInteractions) {
            control.setReadOnly(isReadOnly);
            this.triggerEvent({ controlKey: key, prop: 'readOnly', value: isReadOnly }, otherForm);
        }
    }
    setRequired(key, required, otherForm) {
        const control = this.getControl(key, otherForm);
        if (control && !control.restrictFieldInteractions) {
            control.setRequired(required);
            this.triggerEvent({ controlKey: key, prop: 'required', value: required }, otherForm);
        }
    }
    setDescription(key, description, otherForm) {
        const control = this.getControl(key, otherForm);
        if (control && !control.restrictFieldInteractions) {
            control.description = description;
            this.triggerEvent({ controlKey: key, prop: 'description', value: description }, otherForm);
        }
    }
    highlight(key, isHighlighted, otherForm) {
        const control = this.getControl(key, otherForm);
        if (control && !control.restrictFieldInteractions) {
            control.highlighted = isHighlighted;
            this.triggerEvent({ controlKey: key, prop: 'highlight', value: isHighlighted }, otherForm);
        }
    }
    hide(key, clearValue = true, otherForm) {
        const control = this.getControl(key, otherForm);
        if (control && !control.restrictFieldInteractions) {
            control.hide(clearValue);
            this.disable(key, { emitEvent: false });
            this.triggerEvent({ controlKey: key, prop: 'hidden', value: true }, otherForm);
        }
        return control;
    }
    show(key, otherForm) {
        const control = this.getControl(key, otherForm);
        if (control && !control.restrictFieldInteractions) {
            control.show();
            this.enable(key, { emitEvent: false });
            this.triggerEvent({ controlKey: key, prop: 'hidden', value: false }, otherForm);
        }
    }
    hideFieldSetHeader(key) {
        const fieldSet = this.getFieldSet(key);
        if (fieldSet) {
            fieldSet.hidden = true;
        }
    }
    showFieldSetHeader(key) {
        const fieldSet = this.getFieldSet(key);
        if (fieldSet) {
            fieldSet.hidden = false;
        }
    }
    disable(key, options, otherForm) {
        const control = this.getControl(key, otherForm);
        if (control && !control.restrictFieldInteractions) {
            control.disable(options);
            this.triggerEvent({ controlKey: key, prop: 'readOnly', value: true }, otherForm);
        }
    }
    enable(key, options, otherForm) {
        const control = this.getControl(key, otherForm);
        if (control && !control.restrictFieldInteractions) {
            control.enable(options);
            this.triggerEvent({ controlKey: key, prop: 'readOnly', value: false }, otherForm);
        }
    }
    markAsInvalid(key, validationMessage, otherForm) {
        const control = this.getControl(key, otherForm);
        if (control) {
            if (control && !control.restrictFieldInteractions) {
                control.markAsInvalid(validationMessage);
                this.triggerEvent({ controlKey: key, prop: 'errors', value: validationMessage }, otherForm);
            }
        }
    }
    markAsValid(key, otherForm) {
        const control = this.getControl(key, otherForm);
        if (control) {
            if (control && !control.restrictFieldInteractions) {
                control.markAsValid();
                this.triggerEvent({ controlKey: key, prop: 'errors', value: null }, otherForm);
            }
        }
    }
    markAsDirty(key, options, otherForm) {
        const control = this.getControl(key, otherForm);
        if (control && !control.restrictFieldInteractions) {
            control.markAsDirty(options);
        }
    }
    markAsPending(key, options, otherForm) {
        const control = this.getControl(key, otherForm);
        if (control && !control.restrictFieldInteractions) {
            control.markAsPending(options);
        }
    }
    markAsPristine(key, options, otherForm) {
        const control = this.getControl(key, otherForm);
        if (control && !control.restrictFieldInteractions) {
            control.markAsPristine(options);
        }
    }
    markAsTouched(key, options, otherForm) {
        const control = this.getControl(key, otherForm);
        if (control && !control.restrictFieldInteractions) {
            control.markAsTouched(options);
        }
    }
    markAsUntouched(key, options, otherForm) {
        const control = this.getControl(key, otherForm);
        if (control && !control.restrictFieldInteractions) {
            control.markAsUntouched(options);
        }
    }
    updateValueAndValidity(key, options, otherForm) {
        const control = this.getControl(key, otherForm);
        if (control && !control.restrictFieldInteractions) {
            control.updateValueAndValidity(options);
        }
    }
    addValidators(key, validators, otherForm) {
        const control = this.getControl(key, otherForm);
        if (control && validators && validators.length > 0) {
            control.addValidators(validators);
        }
    }
    removeValidator(key, validators, otherForm) {
        const control = this.getControl(key, otherForm);
        if (control && validators && validators.length > 0) {
            control.removeValidators(validators);
        }
    }
    displayToast(toastConfig) {
        if (this.toaster) {
            this.toaster.alert(toastConfig);
        }
    }
    displayTip(key, tip, icon, allowDismiss, sanitize, otherForm) {
        const control = this.getControl(key, otherForm);
        if (control && !control.restrictFieldInteractions) {
            control.tipWell = {
                tip,
                icon,
                button: allowDismiss,
                sanitize: sanitize !== false, // defaults to true when undefined
            };
            this.triggerEvent({ controlKey: key, prop: 'tipWell', value: tip }, otherForm);
        }
    }
    clearTip(key, otherForm) {
        const control = this.getControl(key, otherForm);
        if (control && !control.restrictFieldInteractions) {
            control.tipWell = null;
            this.triggerEvent({ controlKey: key, prop: 'tipWell', value: null }, otherForm);
        }
    }
    setTooltip(key, tooltip, otherForm) {
        const control = this.getControl(key, otherForm);
        if (control && !control.restrictFieldInteractions) {
            control.tooltip = tooltip;
            if (tooltip.length >= 40 && tooltip.length <= 400) {
                control.tooltipSize = 'large';
                control.tooltipPreline = true;
            }
            else if (tooltip.length > 400) {
                control.tooltipSize = 'extra-large';
            }
            this.triggerEvent({ controlKey: key, prop: 'tooltip', value: tooltip }, otherForm);
        }
    }
    confirmChanges(key, message) {
        const history = this.getProperty(key, 'valueHistory');
        const oldValue = history[history.length - 2];
        const newValue = this.getValue(key);
        const label = this.getProperty(key, 'label');
        document.activeElement.blur();
        return this.modalService.open(ControlConfirmModal, { oldValue, newValue, label, message, key }).onClosed.then((result) => {
            if (!result) {
                this.setValue(key, oldValue, { emitEvent: false });
            }
            return true;
        });
    }
    promptUser(key, changes) {
        document.activeElement.blur();
        return this.modalService.open(ControlPromptModal, { changes, key }).onClosed;
    }
    setProperty(key, prop, value, otherForm) {
        const control = this.getControl(key, otherForm);
        if (control && !control.restrictFieldInteractions) {
            control[prop] = value;
            this.triggerEvent({ controlKey: key, prop, value }, otherForm);
        }
    }
    getProperty(key, prop, otherForm) {
        const control = this.getControl(key, otherForm);
        if (control && !control.restrictFieldInteractions) {
            return control[prop];
        }
        return null;
    }
    isValueEmpty(key) {
        const value = this.getValue(key);
        return Helpers.isEmpty(value);
    }
    isValueBlank(key) {
        const value = this.getValue(key);
        return Helpers.isBlank(value);
    }
    hasField(key, otherForm) {
        const form = otherForm || this.form;
        return !!form.controls[key];
    }
    addStaticOption(key, newOption, otherForm) {
        const control = this.getControl(key, otherForm);
        let optionToAdd = newOption;
        let isUnique = true;
        if (control && !control.restrictFieldInteractions) {
            let currentOptions = this.getProperty(key, 'options');
            if (!currentOptions || !currentOptions.length) {
                const config = this.getProperty(key, 'config');
                if (config) {
                    currentOptions = config.options;
                    if (currentOptions && Array.isArray(currentOptions)) {
                        if (currentOptions[0].value && !optionToAdd.value) {
                            optionToAdd = { value: newOption, label: newOption };
                        }
                        config.options = [...currentOptions, optionToAdd];
                        this.setProperty(key, 'config', config);
                    }
                }
            }
            else {
                if (currentOptions[0].value && !optionToAdd.value) {
                    optionToAdd = { value: newOption, label: newOption };
                }
                // Ensure duplicate values are not added
                currentOptions.forEach((option) => {
                    if ((option.value && option.value === optionToAdd.value) || option === optionToAdd) {
                        isUnique = false;
                    }
                });
                if (isUnique) {
                    this.setProperty(key, 'options', [...currentOptions, optionToAdd]);
                }
            }
            if (isUnique) {
                this.triggerEvent({ controlKey: key, prop: 'options', value: [...currentOptions, optionToAdd] }, otherForm);
            }
        }
    }
    removeStaticOption(key, optionToRemove, otherForm) {
        const control = this.getControl(key, otherForm);
        if (control && !control.restrictFieldInteractions) {
            let currentOptions = this.getProperty(key, 'options', otherForm);
            if (!currentOptions || !currentOptions.length) {
                const config = this.getProperty(key, 'config', otherForm);
                if (config) {
                    currentOptions = config.options;
                    if (currentOptions && Array.isArray(currentOptions)) {
                        let index = -1;
                        currentOptions.forEach((opt, i) => {
                            if (opt.value || opt.label) {
                                if (opt.value === optionToRemove || opt.label === optionToRemove) {
                                    index = i;
                                }
                            }
                            else {
                                if (opt === optionToRemove) {
                                    index = i;
                                }
                            }
                        });
                        if (index !== -1) {
                            currentOptions.splice(index, 1);
                        }
                        config.options = [...currentOptions];
                        this.setProperty(key, 'config', config, otherForm);
                    }
                }
            }
            else {
                let index = -1;
                currentOptions.forEach((opt, i) => {
                    if (opt.value || opt.label) {
                        if (opt.value === optionToRemove || opt.label === optionToRemove) {
                            index = i;
                        }
                    }
                    else {
                        if (opt === optionToRemove) {
                            index = i;
                        }
                    }
                });
                if (index !== -1) {
                    currentOptions.splice(index, 1);
                }
                this.setProperty(key, 'options', [...currentOptions], otherForm);
            }
            this.triggerEvent({ controlKey: key, prop: 'options', value: control.options }, otherForm);
        }
    }
    modifyPickerConfig(key, config, mapper) {
        // call another method to avoid a breaking change but still enable stricter types
        this.mutatePickerConfig(key, config, mapper);
    }
    mutatePickerConfig(key, args, mapper, otherForm) {
        const control = this.getControl(key, otherForm);
        if (control && !control.restrictFieldInteractions) {
            const { minSearchLength, enableInfiniteScroll, filteredOptionsCreator, format, getLabels, emptyPickerMessage } = control.config;
            const optionsConfig = this.getOptionsConfig(args, mapper, filteredOptionsCreator, format);
            const newConfig = {
                ...(emptyPickerMessage && { emptyPickerMessage }),
                ...(Number.isInteger(minSearchLength) && { minSearchLength }),
                ...(enableInfiniteScroll && { enableInfiniteScroll }),
                ...(filteredOptionsCreator && { filteredOptionsCreator }),
                ...(getLabels && { getLabels }),
                ...(optionsConfig && optionsConfig),
                resultsTemplate: control.config.resultsTemplate || ('resultsTemplateType' in args && this.getAppropriateResultsTemplate(args.resultsTemplateType)),
            };
            this.setProperty(key, 'config', newConfig);
            this.triggerEvent({ controlKey: key, prop: 'pickerConfig', value: args }, otherForm);
        }
    }
    addPropertiesToPickerConfig(key, properties, otherForm) {
        const control = this.getControl(key, otherForm);
        if (!control || control.restrictFieldInteractions) {
            return;
        }
        const config = {
            ...control.config,
            ...properties,
        };
        this.setProperty(key, 'config', config);
        this.triggerEvent({ controlKey: key, prop: 'pickerConfig', value: properties }, otherForm);
    }
    getAppropriateResultsTemplate(resultsTemplateType) {
        switch (resultsTemplateType) {
            case 'entity-picker':
                return EntityPickerResults;
            default:
                return undefined;
        }
    }
    setLoading(key, loading, otherForm) {
        const form = otherForm || this.form;
        const control = this.getControl(key, otherForm);
        if (control && !control.restrictFieldInteractions) {
            if (loading) {
                form.controls[key].fieldInteractionloading = true;
                control.setErrors({ loading: true });
                // History
                clearTimeout(this.asyncBlockTimeout);
                this.asyncBlockTimeout = setTimeout(() => {
                    this.setLoading(key, false);
                    this.displayTip(key, this.labels.asyncFailure, 'info', false);
                    this.setProperty(key, '_displayedAsyncFailure', true);
                }, 10000);
            }
            else {
                form.controls[key].fieldInteractionloading = false;
                clearTimeout(this.asyncBlockTimeout);
                control.setErrors({ loading: null });
                control.updateValueAndValidity({ emitEvent: false });
                if (this.getProperty(key, '_displayedAsyncFailure')) {
                    this.setProperty(key, 'tipWell', null);
                }
            }
            this.triggerEvent({ controlKey: key, prop: 'loading', value: loading }, otherForm);
        }
    }
    addControl(key, metaForNewField, position = FieldInteractionApi.FIELD_POSITIONS.ABOVE_FIELD, initialValue, otherForm) {
        if (!metaForNewField.key && !metaForNewField.name) {
            console.error('[FieldInteractionAPI] - missing "key" in meta for new field'); // tslint:disable-line
            return null;
        }
        if (!metaForNewField.key) {
            // If key is not explicitly declared, use name as key
            metaForNewField.key = metaForNewField.name;
        }
        const form = otherForm || this.form;
        if (form.controls[metaForNewField.key]) {
            // Field is already on the form
            return null;
        }
        const control = form.controls[key];
        let fieldsetIndex;
        let controlIndex;
        if (control) {
            fieldsetIndex = -1;
            controlIndex = -1;
            form.fieldsets.forEach((fieldset, fi) => {
                fieldset.controls.forEach((fieldsetControl, ci) => {
                    if (fieldsetControl.key === key) {
                        fieldsetIndex = fi;
                        controlIndex = ci;
                    }
                });
            });
            // Change the position of the newly added field
            switch (position) {
                case FieldInteractionApi.FIELD_POSITIONS.ABOVE_FIELD:
                    // Adding field above active field
                    // index can stay the same
                    break;
                case FieldInteractionApi.FIELD_POSITIONS.BELOW_FIELD:
                    // Adding field below active field
                    controlIndex += 1;
                    break;
                case FieldInteractionApi.FIELD_POSITIONS.TOP_OF_FORM:
                    // Adding field to the top of the form
                    controlIndex = 0;
                    fieldsetIndex = 0;
                    break;
                case FieldInteractionApi.FIELD_POSITIONS.BOTTOM_OF_FORM:
                    // Adding field to the bottom of the form
                    fieldsetIndex = form.fieldsets.length - 1;
                    controlIndex = form.fieldsets[fieldsetIndex].controls.length;
                    break;
                default:
                    break;
            }
            if (fieldsetIndex !== -1 && controlIndex !== -1) {
                const novoControl = this.formUtils.getControlForField(metaForNewField, this.http, {});
                novoControl.hidden = false;
                const formControl = new NovoFormControl(initialValue, novoControl);
                form.addControl(novoControl.key, formControl);
                form.fieldsets[fieldsetIndex].controls.splice(controlIndex, 0, novoControl);
                this.triggerEvent({ controlKey: key, prop: 'addControl', value: formControl }, otherForm);
            }
        }
    }
    removeControl(key, otherForm) {
        const form = otherForm || this.form;
        if (!form.controls[key]) {
            // Field is not on the form
            return null;
        }
        const control = this.getControl(key, otherForm);
        if (control && !control.restrictFieldInteractions) {
            let fieldsetIndex = -1;
            let controlIndex = -1;
            form.fieldsets.forEach((fieldset, fi) => {
                fieldset.controls.forEach((fieldsetControl, ci) => {
                    if (fieldsetControl.key === key) {
                        fieldsetIndex = fi;
                        controlIndex = ci;
                    }
                });
            });
            if (fieldsetIndex !== -1 && controlIndex !== -1) {
                form.removeControl(key);
                form.fieldsets[fieldsetIndex].controls.splice(controlIndex, 1);
                this.triggerEvent({ controlKey: key, prop: 'removeControl', value: key }, otherForm);
            }
        }
    }
    debounce(func, wait = 50) {
        let h;
        clearTimeout(h);
        h = setTimeout(() => func(), wait);
    }
    /**
     * Allows traversing nested forms by accessing the parent form.
     *
     * @param otherForm optional parameter for getting the parent of a different form.
     * If not provided will default to the parent of the current form.
     */
    getParent(otherForm) {
        const form = otherForm || this.form;
        return form.parent;
    }
    /**
     * The index is assigned as a property on the form's associations object when the form is part of a NovoControlGroup array.
     *
     * @param otherForm optional parameter for getting the index of a different form. If not provided will default to the current form.
     * @returns the index if it exists for the current or form, or null otherwise.
     */
    getIndex(otherForm) {
        const form = otherForm || this.form;
        return form.associations && form.associations.hasOwnProperty('index') ? form.associations.index : null;
    }
    triggerEvent(event, otherForm) {
        const form = otherForm || this.form;
        if (form && form.fieldInteractionEvents) {
            form.fieldInteractionEvents.emit(event);
        }
    }
}
FieldInteractionApi.FIELD_POSITIONS = {
    ABOVE_FIELD: 'ABOVE_FIELD',
    BELOW_FIELD: 'BELOW_FIELD',
    TOP_OF_FORM: 'TOP_OF_FORM',
    BOTTOM_OF_FORM: 'BOTTOM_OF_FORM',
};
FieldInteractionApi.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: FieldInteractionApi, deps: [{ token: i1.NovoToastService }, { token: i2.NovoModalService }, { token: i3.FormUtils }, { token: i4.HttpClient }, { token: i5.NovoLabelService }], target: i0.ɵɵFactoryTarget.Injectable });
FieldInteractionApi.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: FieldInteractionApi });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: FieldInteractionApi, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.NovoToastService }, { type: i2.NovoModalService }, { type: i3.FormUtils }, { type: i4.HttpClient }, { type: i5.NovoLabelService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmllbGRJbnRlcmFjdGlvbkFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2Zvcm0vRmllbGRJbnRlcmFjdGlvbkFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRXJFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUM3RCxNQUFNO0FBQ04sT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDREQUE0RCxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxnQkFBZ0IsRUFBZ0IsTUFBTSx1QkFBdUIsQ0FBQztBQUV2RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUduRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7Ozs7Ozs7QUFHcEQsTUFBTSxjQUFjO0lBS2xCLFlBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFGcEMsVUFBSyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFc0IsQ0FBQztJQUV4QyxHQUFHLENBQUMsR0FBVyxFQUFFLE9BQVE7UUFDdkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENB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QUFDO0lBQ3JDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILFNBQVMsQ0FBQyxTQUF5QjtRQUNqQyxNQUFNLElBQUksR0FBRyxTQUFTLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQztRQUNwQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsUUFBUSxDQUFDLFNBQXlCO1FBQ2hDLE1BQU0sSUFBSSxHQUFHLFNBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUN6RyxDQUFDO0lBRU8sWUFBWSxDQUFDLEtBQTZCLEVBQUUsU0FBeUI7UUFDM0UsTUFBTSxJQUFJLEdBQUcsU0FBUyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDcEMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLHNCQUFzQixFQUFFO1lBQ3ZDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDekM7SUFDSCxDQUFDOztBQTkxQk0sbUNBQWUsR0FBRztJQUN2QixXQUFXLEVBQUUsYUFBYTtJQUMxQixXQUFXLEVBQUUsYUFBYTtJQUMxQixXQUFXLEVBQUUsYUFBYTtJQUMxQixjQUFjLEVBQUUsZ0JBQWdCO0NBQ2pDLENBQUM7aUhBYlMsbUJBQW1CO3FIQUFuQixtQkFBbUI7NEZBQW5CLG1CQUFtQjtrQkFEL0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybUFycmF5LCBWYWxpZGF0b3JGbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuLy8gVmVuZG9yXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xuaW1wb3J0IHsgQXBwQnJpZGdlIH0gZnJvbSAnLi4vLi4vdXRpbHMvYXBwLWJyaWRnZS9BcHBCcmlkZ2UnO1xuaW1wb3J0IHsgRm9ybVV0aWxzIH0gZnJvbSAnLi4vLi4vdXRpbHMvZm9ybS11dGlscy9Gb3JtVXRpbHMnO1xuLy8gQVBQXG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vdXRpbHMvSGVscGVycyc7XG5pbXBvcnQgeyBOb3ZvTW9kYWxTZXJ2aWNlIH0gZnJvbSAnLi4vbW9kYWwvbW9kYWwuc2VydmljZSc7XG5pbXBvcnQgeyBFbnRpdHlQaWNrZXJSZXN1bHRzIH0gZnJvbSAnLi4vcGlja2VyL2V4dHJhcy9lbnRpdHktcGlja2VyLXJlc3VsdHMvRW50aXR5UGlja2VyUmVzdWx0cyc7XG5pbXBvcnQgeyBOb3ZvVG9hc3RTZXJ2aWNlLCBUb2FzdE9wdGlvbnMgfSBmcm9tICcuLi90b2FzdC9Ub2FzdFNlcnZpY2UnO1xuaW1wb3J0IHsgQ3VzdG9tSHR0cCwgTW9kaWZ5UGlja2VyQ29uZmlnQXJncywgT3B0aW9uc0Z1bmN0aW9uIH0gZnJvbSAnLi9GaWVsZEludGVyYWN0aW9uQXBpVHlwZXMnO1xuaW1wb3J0IHsgQ29udHJvbENvbmZpcm1Nb2RhbCwgQ29udHJvbFByb21wdE1vZGFsIH0gZnJvbSAnLi9GaWVsZEludGVyYWN0aW9uTW9kYWxzJztcbmltcG9ydCB7IE5vdm9Db250cm9sQ29uZmlnIH0gZnJvbSAnLi9Gb3JtQ29udHJvbHMnO1xuaW1wb3J0IHsgSUZpZWxkSW50ZXJhY3Rpb25FdmVudCwgTm92b0ZpZWxkc2V0LCBSZXN1bHRzVGVtcGxhdGVUeXBlIH0gZnJvbSAnLi9Gb3JtSW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBOb3ZvRm9ybUNvbnRyb2wgfSBmcm9tICcuL05vdm9Gb3JtQ29udHJvbCc7XG5pbXBvcnQgeyBOb3ZvRm9ybUdyb3VwIH0gZnJvbSAnLi9Ob3ZvRm9ybUdyb3VwJztcblxuY2xhc3MgQ3VzdG9tSHR0cEltcGwgaW1wbGVtZW50cyBDdXN0b21IdHRwIHtcbiAgdXJsOiBzdHJpbmc7XG4gIG9wdGlvbnM7XG4gIG1hcEZuID0gKHgpID0+IHg7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7fVxuXG4gIGdldCh1cmw6IHN0cmluZywgb3B0aW9ucz8pOiBDdXN0b21IdHRwIHtcbiAgICB0aGlzLnVybCA9IHVybDtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbWFwKG1hcEZuKTogQ3VzdG9tSHR0cCB7XG4gICAgdGhpcy5tYXBGbiA9IG1hcEZuO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc3Vic2NyaWJlKHJlc29sdmUsIHJlamVjdD8pOiBTdWJzY3JpcHRpb24ge1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMudXJsLCB0aGlzLm9wdGlvbnMpLnBpcGUobWFwKHRoaXMubWFwRm4pKS5zdWJzY3JpYmUocmVzb2x2ZSwgcmVqZWN0KTtcbiAgfVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRmllbGRJbnRlcmFjdGlvbkFwaSB7XG4gIHByaXZhdGUgX2dsb2JhbHM7XG4gIGZvcm06IE5vdm9Gb3JtR3JvdXAgfCBhbnk7XG4gIHByaXZhdGUgX2N1cnJlbnRLZXk6IHN0cmluZztcbiAgYXBwQnJpZGdlOiBBcHBCcmlkZ2U7XG4gIHByaXZhdGUgYXN5bmNCbG9ja1RpbWVvdXQ7XG4gIHByaXZhdGUgX2lzSW52b2tlZE9uSW5pdCA9IGZhbHNlO1xuXG4gIHN0YXRpYyBGSUVMRF9QT1NJVElPTlMgPSB7XG4gICAgQUJPVkVfRklFTEQ6ICdBQk9WRV9GSUVMRCcsXG4gICAgQkVMT1dfRklFTEQ6ICdCRUxPV19GSUVMRCcsXG4gICAgVE9QX09GX0ZPUk06ICdUT1BfT0ZfRk9STScsXG4gICAgQk9UVE9NX09GX0ZPUk06ICdCT1RUT01fT0ZfRk9STScsXG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB0b2FzdGVyOiBOb3ZvVG9hc3RTZXJ2aWNlLFxuICAgIHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBOb3ZvTW9kYWxTZXJ2aWNlLFxuICAgIHByaXZhdGUgZm9ybVV0aWxzOiBGb3JtVXRpbHMsXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByaXZhdGUgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLFxuICApIHt9XG5cbiAgZ2V0IGFzc29jaWF0aW9ucygpOiBvYmplY3Qge1xuICAgIHJldHVybiB0aGlzLmZvcm0uaGFzT3duUHJvcGVydHkoJ2Fzc29jaWF0aW9ucycpID8gdGhpcy5mb3JtLmFzc29jaWF0aW9ucyA6IHt9O1xuICB9XG5cbiAgZ2V0IGN1cnJlbnRFbnRpdHkoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5mb3JtLmhhc093blByb3BlcnR5KCdjdXJyZW50RW50aXR5JykgPyB0aGlzLmZvcm0uY3VycmVudEVudGl0eSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGdldCBjdXJyZW50RW50aXR5SWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5mb3JtLmhhc093blByb3BlcnR5KCdjdXJyZW50RW50aXR5SWQnKSA/IHRoaXMuZm9ybS5jdXJyZW50RW50aXR5SWQgOiB1bmRlZmluZWQ7XG4gIH1cblxuICBnZXQgaXNFZGl0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmZvcm0uaGFzT3duUHJvcGVydHkoJ2VkaXQnKSA/IHRoaXMuZm9ybS5lZGl0IDogZmFsc2U7XG4gIH1cblxuICBnZXQgaXNBZGQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybS5oYXNPd25Qcm9wZXJ0eSgnZWRpdCcpID8gIXRoaXMuZm9ybS5lZGl0IDogZmFsc2U7XG4gIH1cblxuICBzZXQgZ2xvYmFscyhnbG9iYWxzKSB7XG4gICAgdGhpcy5fZ2xvYmFscyA9IGdsb2JhbHM7XG4gIH1cblxuICBnZXQgZ2xvYmFscygpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2xvYmFscztcbiAgfVxuXG4gIHNldCBjdXJyZW50S2V5KGtleTogc3RyaW5nKSB7XG4gICAgdGhpcy5fY3VycmVudEtleSA9IGtleTtcbiAgfVxuXG4gIGdldCBjdXJyZW50S2V5KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRLZXk7XG4gIH1cblxuICBzZXQgaXNJbnZva2VkT25Jbml0KGlzT25Jbml0OiBib29sZWFuKSB7XG4gICAgdGhpcy5faXNJbnZva2VkT25Jbml0ID0gaXNPbkluaXQ7XG4gIH1cblxuICBnZXQgaXNJbnZva2VkT25Jbml0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc0ludm9rZWRPbkluaXQ7XG4gIH1cblxuICBpc0FjdGl2ZUNvbnRyb2xWYWxpZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLmdldFZhbHVlKHRoaXMuY3VycmVudEtleSk7XG4gIH1cblxuICBnZXRBY3RpdmVDb250cm9sKCk6IE5vdm9Gb3JtQ29udHJvbCB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q29udHJvbCh0aGlzLmN1cnJlbnRLZXkpO1xuICB9XG5cbiAgZ2V0QWN0aXZlS2V5KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudEtleTtcbiAgfVxuXG4gIGdldEFjdGl2ZVZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLmdldFZhbHVlKHRoaXMuY3VycmVudEtleSk7XG4gIH1cblxuICBnZXRBY3RpdmVJbml0aWFsVmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0SW5pdGlhbFZhbHVlKHRoaXMuY3VycmVudEtleSk7XG4gIH1cblxuICBnZXRGaWVsZFNldChrZXk6IHN0cmluZywgb3RoZXJGb3JtPzogTm92b0Zvcm1Hcm91cCk6IE5vdm9GaWVsZHNldCB7XG4gICAgaWYgKCFrZXkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1tGaWVsZEludGVyYWN0aW9uQVBJXSAtIGludmFsaWQgb3IgbWlzc2luZyBcImtleVwiJyk7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGZvcm0gPSBvdGhlckZvcm0gfHwgdGhpcy5mb3JtO1xuICAgIGNvbnN0IGZpZWxkU2V0ID0gZm9ybS5maWVsZHNldHMuZmluZCgoZnM6IE5vdm9GaWVsZHNldCkgPT4gZnMua2V5ICYmIGZzLmtleS50b0xvd2VyQ2FzZSgpID09PSBrZXkudG9Mb3dlckNhc2UoKSk7XG4gICAgaWYgKCFmaWVsZFNldCkge1xuICAgICAgY29uc29sZS5lcnJvcignW0ZpZWxkSW50ZXJhY3Rpb25BUEldIC0gY291bGQgbm90IGZpbmQgYSBmaWVsZHNldCBpbiB0aGUgZm9ybSBieSB0aGUga2V5IC0tJywga2V5KTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpZWxkU2V0IGFzIE5vdm9GaWVsZHNldDtcbiAgfVxuXG4gIGdldENvbnRyb2woa2V5OiBzdHJpbmcsIG90aGVyRm9ybT86IE5vdm9Gb3JtR3JvdXApIHtcbiAgICBpZiAoIWtleSkge1xuICAgICAgY29uc29sZS5lcnJvcignW0ZpZWxkSW50ZXJhY3Rpb25BUEldIC0gaW52YWxpZCBvciBtaXNzaW5nIFwia2V5XCInKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZm9ybSA9IG90aGVyRm9ybSB8fCB0aGlzLmZvcm07XG4gICAgY29uc3QgY29udHJvbCA9IGZvcm0uY29udHJvbHNba2V5XSBhcyBOb3ZvRm9ybUNvbnRyb2w7XG4gICAgaWYgKCFjb250cm9sKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdbRmllbGRJbnRlcmFjdGlvbkFQSV0gLSBjb3VsZCBub3QgZmluZCBhIGNvbnRyb2wgaW4gdGhlIGZvcm0gYnkgdGhlIGtleSAtLScsIGtleSk7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBjb250cm9sO1xuICB9XG5cbiAgZ2V0Rm9ybUdyb3VwQXJyYXkoa2V5OiBzdHJpbmcsIG90aGVyRm9ybT86IE5vdm9Gb3JtR3JvdXApOiBOb3ZvRm9ybUdyb3VwW10ge1xuICAgIGlmICgha2V5KSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdbRmllbGRJbnRlcmFjdGlvbkFQSV0gLSBpbnZhbGlkIG9yIG1pc3NpbmcgXCJrZXlcIicpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBmb3JtID0gb3RoZXJGb3JtIHx8IHRoaXMuZm9ybTtcbiAgICBjb25zdCBmb3JtQXJyYXkgPSBmb3JtLmNvbnRyb2xzW2tleV0gYXMgRm9ybUFycmF5O1xuICAgIGlmICghZm9ybUFycmF5IHx8ICFmb3JtQXJyYXkuY29udHJvbHMpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1tGaWVsZEludGVyYWN0aW9uQVBJXSAtIGNvdWxkIG5vdCBmaW5kIGEgZm9ybSBhcnJheSBpbiB0aGUgZm9ybSBieSB0aGUga2V5IC0tJywga2V5KTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZvcm1BcnJheS5jb250cm9scyBhcyBOb3ZvRm9ybUdyb3VwW10gfCBhbnk7XG4gIH1cblxuICBnZXRWYWx1ZShrZXk6IHN0cmluZywgb3RoZXJGb3JtPzogTm92b0Zvcm1Hcm91cCkge1xuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmdldENvbnRyb2woa2V5LCBvdGhlckZvcm0pO1xuICAgIGlmIChjb250cm9sKSB7XG4gICAgICByZXR1cm4gY29udHJvbC52YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBnZXRSYXdWYWx1ZShrZXk6IHN0cmluZywgb3RoZXJGb3JtPzogTm92b0Zvcm1Hcm91cCkge1xuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmdldENvbnRyb2woa2V5LCBvdGhlckZvcm0pO1xuICAgIGlmIChjb250cm9sKSB7XG4gICAgICByZXR1cm4gY29udHJvbC5yYXdWYWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBnZXRJbml0aWFsVmFsdWUoa2V5OiBzdHJpbmcsIG90aGVyRm9ybT86IE5vdm9Gb3JtR3JvdXApIHtcbiAgICBjb25zdCBjb250cm9sID0gdGhpcy5nZXRDb250cm9sKGtleSwgb3RoZXJGb3JtKTtcbiAgICBpZiAoY29udHJvbCkge1xuICAgICAgcmV0dXJuIGNvbnRyb2wuaW5pdGlhbFZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHNldFZhbHVlKFxuICAgIGtleTogc3RyaW5nLFxuICAgIHZhbHVlLFxuICAgIG9wdGlvbnM/OiB7XG4gICAgICBvbmx5U2VsZj86IGJvb2xlYW47XG4gICAgICBlbWl0RXZlbnQ/OiBib29sZWFuO1xuICAgICAgZW1pdE1vZGVsVG9WaWV3Q2hhbmdlPzogYm9vbGVhbjtcbiAgICAgIGVtaXRWaWV3VG9Nb2RlbENoYW5nZT86IGJvb2xlYW47XG4gICAgfSxcbiAgICBvdGhlckZvcm0/OiBOb3ZvRm9ybUdyb3VwLFxuICApOiB2b2lkIHtcbiAgICBjb25zdCBjb250cm9sID0gdGhpcy5nZXRDb250cm9sKGtleSwgb3RoZXJGb3JtKTtcbiAgICBpZiAoY29udHJvbCAmJiAhY29udHJvbC5yZXN0cmljdEZpZWxkSW50ZXJhY3Rpb25zKSB7XG4gICAgICBjb250cm9sLnNldFZhbHVlKHZhbHVlLCBvcHRpb25zKTtcbiAgICAgIHRoaXMudHJpZ2dlckV2ZW50KHsgY29udHJvbEtleToga2V5LCBwcm9wOiAndmFsdWUnLCB2YWx1ZSB9LCBvdGhlckZvcm0pO1xuICAgIH1cbiAgfVxuXG4gIHBhdGNoVmFsdWUoXG4gICAga2V5OiBzdHJpbmcsXG4gICAgdmFsdWUsXG4gICAgb3B0aW9ucz86IHtcbiAgICAgIG9ubHlTZWxmPzogYm9vbGVhbjtcbiAgICAgIGVtaXRFdmVudD86IGJvb2xlYW47XG4gICAgICBlbWl0TW9kZWxUb1ZpZXdDaGFuZ2U/OiBib29sZWFuO1xuICAgICAgZW1pdFZpZXdUb01vZGVsQ2hhbmdlPzogYm9vbGVhbjtcbiAgICB9LFxuICAgIG90aGVyRm9ybT86IE5vdm9Gb3JtR3JvdXAsXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmdldENvbnRyb2woa2V5LCBvdGhlckZvcm0pO1xuICAgIGlmIChjb250cm9sICYmICFjb250cm9sLnJlc3RyaWN0RmllbGRJbnRlcmFjdGlvbnMpIHtcbiAgICAgIGNvbnRyb2wuc2V0VmFsdWUodmFsdWUsIG9wdGlvbnMpO1xuICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoeyBjb250cm9sS2V5OiBrZXksIHByb3A6ICd2YWx1ZScsIHZhbHVlIH0sIG90aGVyRm9ybSk7XG4gICAgfVxuICB9XG5cbiAgc2V0UmVhZE9ubHkoa2V5OiBzdHJpbmcsIGlzUmVhZE9ubHk6IGJvb2xlYW4sIG90aGVyRm9ybT86IE5vdm9Gb3JtR3JvdXApOiB2b2lkIHtcbiAgICBjb25zdCBjb250cm9sID0gdGhpcy5nZXRDb250cm9sKGtleSwgb3RoZXJGb3JtKTtcbiAgICBpZiAoY29udHJvbCAmJiAhY29udHJvbC5yZXN0cmljdEZpZWxkSW50ZXJhY3Rpb25zKSB7XG4gICAgICBjb250cm9sLnNldFJlYWRPbmx5KGlzUmVhZE9ubHkpO1xuICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoeyBjb250cm9sS2V5OiBrZXksIHByb3A6ICdyZWFkT25seScsIHZhbHVlOiBpc1JlYWRPbmx5IH0sIG90aGVyRm9ybSk7XG4gICAgfVxuICB9XG5cbiAgc2V0UmVxdWlyZWQoa2V5OiBzdHJpbmcsIHJlcXVpcmVkOiBib29sZWFuLCBvdGhlckZvcm0/OiBOb3ZvRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgY29uc3QgY29udHJvbCA9IHRoaXMuZ2V0Q29udHJvbChrZXksIG90aGVyRm9ybSk7XG4gICAgaWYgKGNvbnRyb2wgJiYgIWNvbnRyb2wucmVzdHJpY3RGaWVsZEludGVyYWN0aW9ucykge1xuICAgICAgY29udHJvbC5zZXRSZXF1aXJlZChyZXF1aXJlZCk7XG4gICAgICB0aGlzLnRyaWdnZXJFdmVudCh7IGNvbnRyb2xLZXk6IGtleSwgcHJvcDogJ3JlcXVpcmVkJywgdmFsdWU6IHJlcXVpcmVkIH0sIG90aGVyRm9ybSk7XG4gICAgfVxuICB9XG5cbiAgc2V0RGVzY3JpcHRpb24oa2V5OiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcsIG90aGVyRm9ybT86IE5vdm9Gb3JtR3JvdXApOiB2b2lkIHtcbiAgICBjb25zdCBjb250cm9sID0gdGhpcy5nZXRDb250cm9sKGtleSwgb3RoZXJGb3JtKTtcbiAgICBpZiAoY29udHJvbCAmJiAhY29udHJvbC5yZXN0cmljdEZpZWxkSW50ZXJhY3Rpb25zKSB7XG4gICAgICBjb250cm9sLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICB0aGlzLnRyaWdnZXJFdmVudCh7IGNvbnRyb2xLZXk6IGtleSwgcHJvcDogJ2Rlc2NyaXB0aW9uJywgdmFsdWU6IGRlc2NyaXB0aW9uIH0sIG90aGVyRm9ybSk7XG4gICAgfVxuICB9XG5cbiAgaGlnaGxpZ2h0KGtleTogc3RyaW5nLCBpc0hpZ2hsaWdodGVkOiBib29sZWFuLCBvdGhlckZvcm0/OiBOb3ZvRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgY29uc3QgY29udHJvbCA9IHRoaXMuZ2V0Q29udHJvbChrZXksIG90aGVyRm9ybSk7XG4gICAgaWYgKGNvbnRyb2wgJiYgIWNvbnRyb2wucmVzdHJpY3RGaWVsZEludGVyYWN0aW9ucykge1xuICAgICAgY29udHJvbC5oaWdobGlnaHRlZCA9IGlzSGlnaGxpZ2h0ZWQ7XG4gICAgICB0aGlzLnRyaWdnZXJFdmVudCh7IGNvbnRyb2xLZXk6IGtleSwgcHJvcDogJ2hpZ2hsaWdodCcsIHZhbHVlOiBpc0hpZ2hsaWdodGVkIH0sIG90aGVyRm9ybSk7XG4gICAgfVxuICB9XG5cbiAgaGlkZShrZXk6IHN0cmluZywgY2xlYXJWYWx1ZSA9IHRydWUsIG90aGVyRm9ybT86IE5vdm9Gb3JtR3JvdXApIHtcbiAgICBjb25zdCBjb250cm9sID0gdGhpcy5nZXRDb250cm9sKGtleSwgb3RoZXJGb3JtKTtcbiAgICBpZiAoY29udHJvbCAmJiAhY29udHJvbC5yZXN0cmljdEZpZWxkSW50ZXJhY3Rpb25zKSB7XG4gICAgICBjb250cm9sLmhpZGUoY2xlYXJWYWx1ZSk7XG4gICAgICB0aGlzLmRpc2FibGUoa2V5LCB7IGVtaXRFdmVudDogZmFsc2UgfSk7XG4gICAgICB0aGlzLnRyaWdnZXJFdmVudCh7IGNvbnRyb2xLZXk6IGtleSwgcHJvcDogJ2hpZGRlbicsIHZhbHVlOiB0cnVlIH0sIG90aGVyRm9ybSk7XG4gICAgfVxuICAgIHJldHVybiBjb250cm9sO1xuICB9XG5cbiAgc2hvdyhrZXk6IHN0cmluZywgb3RoZXJGb3JtPzogTm92b0Zvcm1Hcm91cCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmdldENvbnRyb2woa2V5LCBvdGhlckZvcm0pO1xuICAgIGlmIChjb250cm9sICYmICFjb250cm9sLnJlc3RyaWN0RmllbGRJbnRlcmFjdGlvbnMpIHtcbiAgICAgIGNvbnRyb2wuc2hvdygpO1xuICAgICAgdGhpcy5lbmFibGUoa2V5LCB7IGVtaXRFdmVudDogZmFsc2UgfSk7XG4gICAgICB0aGlzLnRyaWdnZXJFdmVudCh7IGNvbnRyb2xLZXk6IGtleSwgcHJvcDogJ2hpZGRlbicsIHZhbHVlOiBmYWxzZSB9LCBvdGhlckZvcm0pO1xuICAgIH1cbiAgfVxuXG4gIGhpZGVGaWVsZFNldEhlYWRlcihrZXk6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGZpZWxkU2V0ID0gdGhpcy5nZXRGaWVsZFNldChrZXkpO1xuICAgIGlmIChmaWVsZFNldCkge1xuICAgICAgZmllbGRTZXQuaGlkZGVuID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBzaG93RmllbGRTZXRIZWFkZXIoa2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBmaWVsZFNldCA9IHRoaXMuZ2V0RmllbGRTZXQoa2V5KTtcbiAgICBpZiAoZmllbGRTZXQpIHtcbiAgICAgIGZpZWxkU2V0LmhpZGRlbiA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGRpc2FibGUoXG4gICAga2V5OiBzdHJpbmcsXG4gICAgb3B0aW9ucz86IHtcbiAgICAgIG9ubHlTZWxmPzogYm9vbGVhbjtcbiAgICAgIGVtaXRFdmVudD86IGJvb2xlYW47XG4gICAgfSxcbiAgICBvdGhlckZvcm0/OiBOb3ZvRm9ybUdyb3VwLFxuICApOiB2b2lkIHtcbiAgICBjb25zdCBjb250cm9sID0gdGhpcy5nZXRDb250cm9sKGtleSwgb3RoZXJGb3JtKTtcbiAgICBpZiAoY29udHJvbCAmJiAhY29udHJvbC5yZXN0cmljdEZpZWxkSW50ZXJhY3Rpb25zKSB7XG4gICAgICBjb250cm9sLmRpc2FibGUob3B0aW9ucyk7XG4gICAgICB0aGlzLnRyaWdnZXJFdmVudCh7IGNvbnRyb2xLZXk6IGtleSwgcHJvcDogJ3JlYWRPbmx5JywgdmFsdWU6IHRydWUgfSwgb3RoZXJGb3JtKTtcbiAgICB9XG4gIH1cblxuICBlbmFibGUoXG4gICAga2V5OiBzdHJpbmcsXG4gICAgb3B0aW9ucz86IHtcbiAgICAgIG9ubHlTZWxmPzogYm9vbGVhbjtcbiAgICAgIGVtaXRFdmVudD86IGJvb2xlYW47XG4gICAgfSxcbiAgICBvdGhlckZvcm0/OiBOb3ZvRm9ybUdyb3VwLFxuICApOiB2b2lkIHtcbiAgICBjb25zdCBjb250cm9sID0gdGhpcy5nZXRDb250cm9sKGtleSwgb3RoZXJGb3JtKTtcbiAgICBpZiAoY29udHJvbCAmJiAhY29udHJvbC5yZXN0cmljdEZpZWxkSW50ZXJhY3Rpb25zKSB7XG4gICAgICBjb250cm9sLmVuYWJsZShvcHRpb25zKTtcbiAgICAgIHRoaXMudHJpZ2dlckV2ZW50KHsgY29udHJvbEtleToga2V5LCBwcm9wOiAncmVhZE9ubHknLCB2YWx1ZTogZmFsc2UgfSwgb3RoZXJGb3JtKTtcbiAgICB9XG4gIH1cblxuICBtYXJrQXNJbnZhbGlkKGtleTogc3RyaW5nLCB2YWxpZGF0aW9uTWVzc2FnZT86IHN0cmluZywgb3RoZXJGb3JtPzogTm92b0Zvcm1Hcm91cCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmdldENvbnRyb2woa2V5LCBvdGhlckZvcm0pO1xuICAgIGlmIChjb250cm9sKSB7XG4gICAgICBpZiAoY29udHJvbCAmJiAhY29udHJvbC5yZXN0cmljdEZpZWxkSW50ZXJhY3Rpb25zKSB7XG4gICAgICAgIGNvbnRyb2wubWFya0FzSW52YWxpZCh2YWxpZGF0aW9uTWVzc2FnZSk7XG4gICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KHsgY29udHJvbEtleToga2V5LCBwcm9wOiAnZXJyb3JzJywgdmFsdWU6IHZhbGlkYXRpb25NZXNzYWdlIH0sIG90aGVyRm9ybSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbWFya0FzVmFsaWQoa2V5OiBzdHJpbmcsIG90aGVyRm9ybT86IE5vdm9Gb3JtR3JvdXApOiB2b2lkIHtcbiAgICBjb25zdCBjb250cm9sID0gdGhpcy5nZXRDb250cm9sKGtleSwgb3RoZXJGb3JtKTtcbiAgICBpZiAoY29udHJvbCkge1xuICAgICAgaWYgKGNvbnRyb2wgJiYgIWNvbnRyb2wucmVzdHJpY3RGaWVsZEludGVyYWN0aW9ucykge1xuICAgICAgICBjb250cm9sLm1hcmtBc1ZhbGlkKCk7XG4gICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KHsgY29udHJvbEtleToga2V5LCBwcm9wOiAnZXJyb3JzJywgdmFsdWU6IG51bGwgfSwgb3RoZXJGb3JtKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtYXJrQXNEaXJ0eShcbiAgICBrZXk6IHN0cmluZyxcbiAgICBvcHRpb25zPzoge1xuICAgICAgb25seVNlbGY/OiBib29sZWFuO1xuICAgIH0sXG4gICAgb3RoZXJGb3JtPzogTm92b0Zvcm1Hcm91cCxcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgY29udHJvbCA9IHRoaXMuZ2V0Q29udHJvbChrZXksIG90aGVyRm9ybSk7XG4gICAgaWYgKGNvbnRyb2wgJiYgIWNvbnRyb2wucmVzdHJpY3RGaWVsZEludGVyYWN0aW9ucykge1xuICAgICAgY29udHJvbC5tYXJrQXNEaXJ0eShvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICBtYXJrQXNQZW5kaW5nKFxuICAgIGtleTogc3RyaW5nLFxuICAgIG9wdGlvbnM/OiB7XG4gICAgICBvbmx5U2VsZj86IGJvb2xlYW47XG4gICAgfSxcbiAgICBvdGhlckZvcm0/OiBOb3ZvRm9ybUdyb3VwLFxuICApOiB2b2lkIHtcbiAgICBjb25zdCBjb250cm9sID0gdGhpcy5nZXRDb250cm9sKGtleSwgb3RoZXJGb3JtKTtcbiAgICBpZiAoY29udHJvbCAmJiAhY29udHJvbC5yZXN0cmljdEZpZWxkSW50ZXJhY3Rpb25zKSB7XG4gICAgICBjb250cm9sLm1hcmtBc1BlbmRpbmcob3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgbWFya0FzUHJpc3RpbmUoXG4gICAga2V5OiBzdHJpbmcsXG4gICAgb3B0aW9ucz86IHtcbiAgICAgIG9ubHlTZWxmPzogYm9vbGVhbjtcbiAgICB9LFxuICAgIG90aGVyRm9ybT86IE5vdm9Gb3JtR3JvdXAsXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmdldENvbnRyb2woa2V5LCBvdGhlckZvcm0pO1xuICAgIGlmIChjb250cm9sICYmICFjb250cm9sLnJlc3RyaWN0RmllbGRJbnRlcmFjdGlvbnMpIHtcbiAgICAgIGNvbnRyb2wubWFya0FzUHJpc3RpbmUob3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgbWFya0FzVG91Y2hlZChcbiAgICBrZXk6IHN0cmluZyxcbiAgICBvcHRpb25zPzoge1xuICAgICAgb25seVNlbGY/OiBib29sZWFuO1xuICAgIH0sXG4gICAgb3RoZXJGb3JtPzogTm92b0Zvcm1Hcm91cCxcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgY29udHJvbCA9IHRoaXMuZ2V0Q29udHJvbChrZXksIG90aGVyRm9ybSk7XG4gICAgaWYgKGNvbnRyb2wgJiYgIWNvbnRyb2wucmVzdHJpY3RGaWVsZEludGVyYWN0aW9ucykge1xuICAgICAgY29udHJvbC5tYXJrQXNUb3VjaGVkKG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIG1hcmtBc1VudG91Y2hlZChcbiAgICBrZXk6IHN0cmluZyxcbiAgICBvcHRpb25zPzoge1xuICAgICAgb25seVNlbGY/OiBib29sZWFuO1xuICAgIH0sXG4gICAgb3RoZXJGb3JtPzogTm92b0Zvcm1Hcm91cCxcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgY29udHJvbCA9IHRoaXMuZ2V0Q29udHJvbChrZXksIG90aGVyRm9ybSk7XG4gICAgaWYgKGNvbnRyb2wgJiYgIWNvbnRyb2wucmVzdHJpY3RGaWVsZEludGVyYWN0aW9ucykge1xuICAgICAgY29udHJvbC5tYXJrQXNVbnRvdWNoZWQob3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlVmFsdWVBbmRWYWxpZGl0eShcbiAgICBrZXk6IHN0cmluZyxcbiAgICBvcHRpb25zPzoge1xuICAgICAgb25seVNlbGY/OiBib29sZWFuO1xuICAgICAgZW1pdEV2ZW50PzogYm9vbGVhbjtcbiAgICB9LFxuICAgIG90aGVyRm9ybT86IE5vdm9Gb3JtR3JvdXAsXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmdldENvbnRyb2woa2V5LCBvdGhlckZvcm0pO1xuICAgIGlmIChjb250cm9sICYmICFjb250cm9sLnJlc3RyaWN0RmllbGRJbnRlcmFjdGlvbnMpIHtcbiAgICAgIGNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eShvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICBhZGRWYWxpZGF0b3JzKGtleTogc3RyaW5nLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFZhbGlkYXRvckZuW10sXG4gICAgICAgICAgICAgICAgb3RoZXJGb3JtPzogTm92b0Zvcm1Hcm91cCkge1xuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmdldENvbnRyb2woa2V5LCBvdGhlckZvcm0pO1xuICAgIGlmIChjb250cm9sICYmIHZhbGlkYXRvcnMgJiYgdmFsaWRhdG9ycy5sZW5ndGggPiAwKSB7XG4gICAgICBjb250cm9sLmFkZFZhbGlkYXRvcnModmFsaWRhdG9ycyk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlVmFsaWRhdG9yKGtleTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogVmFsaWRhdG9yRm5bXSxcbiAgICAgICAgICAgICAgICAgIG90aGVyRm9ybT86IE5vdm9Gb3JtR3JvdXApIHtcbiAgICBjb25zdCBjb250cm9sID0gdGhpcy5nZXRDb250cm9sKGtleSwgb3RoZXJGb3JtKTtcbiAgICBpZiAoY29udHJvbCAmJiB2YWxpZGF0b3JzICYmIHZhbGlkYXRvcnMubGVuZ3RoID4gMCkge1xuICAgICAgY29udHJvbC5yZW1vdmVWYWxpZGF0b3JzKHZhbGlkYXRvcnMpO1xuICAgIH1cbiAgfVxuXG4gIGRpc3BsYXlUb2FzdCh0b2FzdENvbmZpZzogVG9hc3RPcHRpb25zKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudG9hc3Rlcikge1xuICAgICAgdGhpcy50b2FzdGVyLmFsZXJ0KHRvYXN0Q29uZmlnKTtcbiAgICB9XG4gIH1cblxuICBkaXNwbGF5VGlwKGtleTogc3RyaW5nLCB0aXA6IHN0cmluZywgaWNvbj86IHN0cmluZywgYWxsb3dEaXNtaXNzPzogYm9vbGVhbiwgc2FuaXRpemU/OiBib29sZWFuLCBvdGhlckZvcm0/OiBOb3ZvRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgY29uc3QgY29udHJvbCA9IHRoaXMuZ2V0Q29udHJvbChrZXksIG90aGVyRm9ybSk7XG4gICAgaWYgKGNvbnRyb2wgJiYgIWNvbnRyb2wucmVzdHJpY3RGaWVsZEludGVyYWN0aW9ucykge1xuICAgICAgY29udHJvbC50aXBXZWxsID0ge1xuICAgICAgICB0aXAsXG4gICAgICAgIGljb24sXG4gICAgICAgIGJ1dHRvbjogYWxsb3dEaXNtaXNzLFxuICAgICAgICBzYW5pdGl6ZTogc2FuaXRpemUgIT09IGZhbHNlLCAvLyBkZWZhdWx0cyB0byB0cnVlIHdoZW4gdW5kZWZpbmVkXG4gICAgICB9O1xuICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoeyBjb250cm9sS2V5OiBrZXksIHByb3A6ICd0aXBXZWxsJywgdmFsdWU6IHRpcCB9LCBvdGhlckZvcm0pO1xuICAgIH1cbiAgfVxuXG4gIGNsZWFyVGlwKGtleTogc3RyaW5nLCBvdGhlckZvcm0/OiBOb3ZvRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgY29uc3QgY29udHJvbCA9IHRoaXMuZ2V0Q29udHJvbChrZXksIG90aGVyRm9ybSk7XG4gICAgaWYgKGNvbnRyb2wgJiYgIWNvbnRyb2wucmVzdHJpY3RGaWVsZEludGVyYWN0aW9ucykge1xuICAgICAgY29udHJvbC50aXBXZWxsID0gbnVsbDtcbiAgICAgIHRoaXMudHJpZ2dlckV2ZW50KHsgY29udHJvbEtleToga2V5LCBwcm9wOiAndGlwV2VsbCcsIHZhbHVlOiBudWxsIH0sIG90aGVyRm9ybSk7XG4gICAgfVxuICB9XG5cbiAgc2V0VG9vbHRpcChrZXk6IHN0cmluZywgdG9vbHRpcDogc3RyaW5nLCBvdGhlckZvcm0/OiBOb3ZvRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgY29uc3QgY29udHJvbCA9IHRoaXMuZ2V0Q29udHJvbChrZXksIG90aGVyRm9ybSk7XG4gICAgaWYgKGNvbnRyb2wgJiYgIWNvbnRyb2wucmVzdHJpY3RGaWVsZEludGVyYWN0aW9ucykge1xuICAgICAgY29udHJvbC50b29sdGlwID0gdG9vbHRpcDtcbiAgICAgIGlmICh0b29sdGlwLmxlbmd0aCA+PSA0MCAmJiB0b29sdGlwLmxlbmd0aCA8PSA0MDApIHtcbiAgICAgICAgY29udHJvbC50b29sdGlwU2l6ZSA9ICdsYXJnZSc7XG4gICAgICAgIGNvbnRyb2wudG9vbHRpcFByZWxpbmUgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmICh0b29sdGlwLmxlbmd0aCA+IDQwMCkge1xuICAgICAgICBjb250cm9sLnRvb2x0aXBTaXplID0gJ2V4dHJhLWxhcmdlJztcbiAgICAgIH1cbiAgICAgIHRoaXMudHJpZ2dlckV2ZW50KHsgY29udHJvbEtleToga2V5LCBwcm9wOiAndG9vbHRpcCcsIHZhbHVlOiB0b29sdGlwIH0sIG90aGVyRm9ybSk7XG4gICAgfVxuICB9XG5cbiAgY29uZmlybUNoYW5nZXMoa2V5OiBzdHJpbmcsIG1lc3NhZ2U/OiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBoaXN0b3J5ID0gdGhpcy5nZXRQcm9wZXJ0eShrZXksICd2YWx1ZUhpc3RvcnknKTtcbiAgICBjb25zdCBvbGRWYWx1ZSA9IGhpc3RvcnlbaGlzdG9yeS5sZW5ndGggLSAyXTtcbiAgICBjb25zdCBuZXdWYWx1ZSA9IHRoaXMuZ2V0VmFsdWUoa2V5KTtcbiAgICBjb25zdCBsYWJlbCA9IHRoaXMuZ2V0UHJvcGVydHkoa2V5LCAnbGFiZWwnKTtcbiAgICAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBhcyBhbnkpLmJsdXIoKTtcbiAgICByZXR1cm4gdGhpcy5tb2RhbFNlcnZpY2Uub3BlbihDb250cm9sQ29uZmlybU1vZGFsLCB7IG9sZFZhbHVlLCBuZXdWYWx1ZSwgbGFiZWwsIG1lc3NhZ2UsIGtleSB9KS5vbkNsb3NlZC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgIHRoaXMuc2V0VmFsdWUoa2V5LCBvbGRWYWx1ZSwgeyBlbWl0RXZlbnQ6IGZhbHNlIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG4gIH1cblxuICBwcm9tcHRVc2VyKGtleTogc3RyaW5nLCBjaGFuZ2VzOiBzdHJpbmdbXSk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIChkb2N1bWVudC5hY3RpdmVFbGVtZW50IGFzIGFueSkuYmx1cigpO1xuICAgIHJldHVybiB0aGlzLm1vZGFsU2VydmljZS5vcGVuKENvbnRyb2xQcm9tcHRNb2RhbCwgeyBjaGFuZ2VzLCBrZXkgfSkub25DbG9zZWQ7XG4gIH1cblxuICBzZXRQcm9wZXJ0eShrZXk6IHN0cmluZywgcHJvcDogc3RyaW5nLCB2YWx1ZSwgb3RoZXJGb3JtPzogTm92b0Zvcm1Hcm91cCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmdldENvbnRyb2woa2V5LCBvdGhlckZvcm0pO1xuICAgIGlmIChjb250cm9sICYmICFjb250cm9sLnJlc3RyaWN0RmllbGRJbnRlcmFjdGlvbnMpIHtcbiAgICAgIGNvbnRyb2xbcHJvcF0gPSB2YWx1ZTtcbiAgICAgIHRoaXMudHJpZ2dlckV2ZW50KHsgY29udHJvbEtleToga2V5LCBwcm9wLCB2YWx1ZSB9LCBvdGhlckZvcm0pO1xuICAgIH1cbiAgfVxuXG4gIGdldFByb3BlcnR5KGtleTogc3RyaW5nLCBwcm9wOiBzdHJpbmcsIG90aGVyRm9ybT86IE5vdm9Gb3JtR3JvdXApIHtcbiAgICBjb25zdCBjb250cm9sID0gdGhpcy5nZXRDb250cm9sKGtleSwgb3RoZXJGb3JtKTtcbiAgICBpZiAoY29udHJvbCAmJiAhY29udHJvbC5yZXN0cmljdEZpZWxkSW50ZXJhY3Rpb25zKSB7XG4gICAgICByZXR1cm4gY29udHJvbFtwcm9wXTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpc1ZhbHVlRW1wdHkoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0VmFsdWUoa2V5KTtcbiAgICByZXR1cm4gSGVscGVycy5pc0VtcHR5KHZhbHVlKTtcbiAgfVxuXG4gIGlzVmFsdWVCbGFuayhrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRWYWx1ZShrZXkpO1xuICAgIHJldHVybiBIZWxwZXJzLmlzQmxhbmsodmFsdWUpO1xuICB9XG5cbiAgaGFzRmllbGQoa2V5OiBzdHJpbmcsIG90aGVyRm9ybT86IE5vdm9Gb3JtR3JvdXApOiBib29sZWFuIHtcbiAgICBjb25zdCBmb3JtID0gb3RoZXJGb3JtIHx8IHRoaXMuZm9ybTtcbiAgICByZXR1cm4gISFmb3JtLmNvbnRyb2xzW2tleV07XG4gIH1cblxuICBhZGRTdGF0aWNPcHRpb24oa2V5OiBzdHJpbmcsIG5ld09wdGlvbjogYW55LCBvdGhlckZvcm0/OiBOb3ZvRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgY29uc3QgY29udHJvbCA9IHRoaXMuZ2V0Q29udHJvbChrZXksIG90aGVyRm9ybSk7XG4gICAgbGV0IG9wdGlvblRvQWRkID0gbmV3T3B0aW9uO1xuICAgIGxldCBpc1VuaXF1ZSA9IHRydWU7XG4gICAgaWYgKGNvbnRyb2wgJiYgIWNvbnRyb2wucmVzdHJpY3RGaWVsZEludGVyYWN0aW9ucykge1xuICAgICAgbGV0IGN1cnJlbnRPcHRpb25zID0gdGhpcy5nZXRQcm9wZXJ0eShrZXksICdvcHRpb25zJyk7XG4gICAgICBpZiAoIWN1cnJlbnRPcHRpb25zIHx8ICFjdXJyZW50T3B0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgY29uZmlnID0gdGhpcy5nZXRQcm9wZXJ0eShrZXksICdjb25maWcnKTtcbiAgICAgICAgaWYgKGNvbmZpZykge1xuICAgICAgICAgIGN1cnJlbnRPcHRpb25zID0gY29uZmlnLm9wdGlvbnM7XG4gICAgICAgICAgaWYgKGN1cnJlbnRPcHRpb25zICYmIEFycmF5LmlzQXJyYXkoY3VycmVudE9wdGlvbnMpKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudE9wdGlvbnNbMF0udmFsdWUgJiYgIW9wdGlvblRvQWRkLnZhbHVlKSB7XG4gICAgICAgICAgICAgIG9wdGlvblRvQWRkID0geyB2YWx1ZTogbmV3T3B0aW9uLCBsYWJlbDogbmV3T3B0aW9uIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25maWcub3B0aW9ucyA9IFsuLi5jdXJyZW50T3B0aW9ucywgb3B0aW9uVG9BZGRdO1xuICAgICAgICAgICAgdGhpcy5zZXRQcm9wZXJ0eShrZXksICdjb25maWcnLCBjb25maWcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGN1cnJlbnRPcHRpb25zWzBdLnZhbHVlICYmICFvcHRpb25Ub0FkZC52YWx1ZSkge1xuICAgICAgICAgIG9wdGlvblRvQWRkID0geyB2YWx1ZTogbmV3T3B0aW9uLCBsYWJlbDogbmV3T3B0aW9uIH07XG4gICAgICAgIH1cbiAgICAgICAgLy8gRW5zdXJlIGR1cGxpY2F0ZSB2YWx1ZXMgYXJlIG5vdCBhZGRlZFxuICAgICAgICBjdXJyZW50T3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgICBpZiAoKG9wdGlvbi52YWx1ZSAmJiBvcHRpb24udmFsdWUgPT09IG9wdGlvblRvQWRkLnZhbHVlKSB8fCBvcHRpb24gPT09IG9wdGlvblRvQWRkKSB7XG4gICAgICAgICAgICBpc1VuaXF1ZSA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChpc1VuaXF1ZSkge1xuICAgICAgICAgIHRoaXMuc2V0UHJvcGVydHkoa2V5LCAnb3B0aW9ucycsIFsuLi5jdXJyZW50T3B0aW9ucywgb3B0aW9uVG9BZGRdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGlzVW5pcXVlKSB7XG4gICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KHsgY29udHJvbEtleToga2V5LCBwcm9wOiAnb3B0aW9ucycsIHZhbHVlOiBbLi4uY3VycmVudE9wdGlvbnMsIG9wdGlvblRvQWRkXSB9LCBvdGhlckZvcm0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZVN0YXRpY09wdGlvbihrZXk6IHN0cmluZywgb3B0aW9uVG9SZW1vdmU6IGFueSwgb3RoZXJGb3JtPzogTm92b0Zvcm1Hcm91cCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmdldENvbnRyb2woa2V5LCBvdGhlckZvcm0pO1xuICAgIGlmIChjb250cm9sICYmICFjb250cm9sLnJlc3RyaWN0RmllbGRJbnRlcmFjdGlvbnMpIHtcbiAgICAgIGxldCBjdXJyZW50T3B0aW9ucyA9IHRoaXMuZ2V0UHJvcGVydHkoa2V5LCAnb3B0aW9ucycsIG90aGVyRm9ybSk7XG4gICAgICBpZiAoIWN1cnJlbnRPcHRpb25zIHx8ICFjdXJyZW50T3B0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgY29uZmlnID0gdGhpcy5nZXRQcm9wZXJ0eShrZXksICdjb25maWcnLCBvdGhlckZvcm0pO1xuICAgICAgICBpZiAoY29uZmlnKSB7XG4gICAgICAgICAgY3VycmVudE9wdGlvbnMgPSBjb25maWcub3B0aW9ucztcbiAgICAgICAgICBpZiAoY3VycmVudE9wdGlvbnMgJiYgQXJyYXkuaXNBcnJheShjdXJyZW50T3B0aW9ucykpIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IC0xO1xuICAgICAgICAgICAgY3VycmVudE9wdGlvbnMuZm9yRWFjaCgob3B0LCBpKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChvcHQudmFsdWUgfHwgb3B0LmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdC52YWx1ZSA9PT0gb3B0aW9uVG9SZW1vdmUgfHwgb3B0LmxhYmVsID09PSBvcHRpb25Ub1JlbW92ZSkge1xuICAgICAgICAgICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAob3B0ID09PSBvcHRpb25Ub1JlbW92ZSkge1xuICAgICAgICAgICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgIGN1cnJlbnRPcHRpb25zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25maWcub3B0aW9ucyA9IFsuLi5jdXJyZW50T3B0aW9uc107XG4gICAgICAgICAgICB0aGlzLnNldFByb3BlcnR5KGtleSwgJ2NvbmZpZycsIGNvbmZpZywgb3RoZXJGb3JtKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBpbmRleCA9IC0xO1xuICAgICAgICBjdXJyZW50T3B0aW9ucy5mb3JFYWNoKChvcHQsIGkpID0+IHtcbiAgICAgICAgICBpZiAob3B0LnZhbHVlIHx8IG9wdC5sYWJlbCkge1xuICAgICAgICAgICAgaWYgKG9wdC52YWx1ZSA9PT0gb3B0aW9uVG9SZW1vdmUgfHwgb3B0LmxhYmVsID09PSBvcHRpb25Ub1JlbW92ZSkge1xuICAgICAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChvcHQgPT09IG9wdGlvblRvUmVtb3ZlKSB7XG4gICAgICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgY3VycmVudE9wdGlvbnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFByb3BlcnR5KGtleSwgJ29wdGlvbnMnLCBbLi4uY3VycmVudE9wdGlvbnNdLCBvdGhlckZvcm0pO1xuICAgICAgfVxuICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoeyBjb250cm9sS2V5OiBrZXksIHByb3A6ICdvcHRpb25zJywgdmFsdWU6IGNvbnRyb2wub3B0aW9ucyB9LCBvdGhlckZvcm0pO1xuICAgIH1cbiAgfVxuXG4gIG1vZGlmeVBpY2tlckNvbmZpZyhcbiAgICBrZXk6IHN0cmluZyxcbiAgICBjb25maWc6IHtcbiAgICAgIGZvcm1hdD86IHN0cmluZztcbiAgICAgIG9wdGlvbnNVcmw/OiBzdHJpbmc7XG4gICAgICBvcHRpb25zVXJsQnVpbGRlcj86IEZ1bmN0aW9uO1xuICAgICAgb3B0aW9uc1Byb21pc2U/O1xuICAgICAgb3B0aW9ucz86IGFueVtdO1xuICAgICAgcmVzdWx0c1RlbXBsYXRlVHlwZT86IFJlc3VsdHNUZW1wbGF0ZVR5cGU7XG4gICAgfSxcbiAgICBtYXBwZXI/LFxuICApOiB2b2lkIHtcbiAgICAvLyBjYWxsIGFub3RoZXIgbWV0aG9kIHRvIGF2b2lkIGEgYnJlYWtpbmcgY2hhbmdlIGJ1dCBzdGlsbCBlbmFibGUgc3RyaWN0ZXIgdHlwZXNcbiAgICB0aGlzLm11dGF0ZVBpY2tlckNvbmZpZyhrZXksIGNvbmZpZyBhcyBNb2RpZnlQaWNrZXJDb25maWdBcmdzLCBtYXBwZXIpO1xuICB9XG5cbiAgbXV0YXRlUGlja2VyQ29uZmlnKGtleTogc3RyaW5nLCBhcmdzOiBNb2RpZnlQaWNrZXJDb25maWdBcmdzLCBtYXBwZXI/OiAoaXRlbTogdW5rbm93bikgPT4gdW5rbm93biwgb3RoZXJGb3JtPzogTm92b0Zvcm1Hcm91cCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmdldENvbnRyb2woa2V5LCBvdGhlckZvcm0pO1xuICAgIGlmIChjb250cm9sICYmICFjb250cm9sLnJlc3RyaWN0RmllbGRJbnRlcmFjdGlvbnMpIHtcbiAgICAgIGNvbnN0IHsgbWluU2VhcmNoTGVuZ3RoLCBlbmFibGVJbmZpbml0ZVNjcm9sbCwgZmlsdGVyZWRPcHRpb25zQ3JlYXRvciwgZm9ybWF0LCBnZXRMYWJlbHMsIGVtcHR5UGlja2VyTWVzc2FnZSB9ID0gY29udHJvbC5jb25maWc7XG4gICAgICBjb25zdCBvcHRpb25zQ29uZmlnID0gdGhpcy5nZXRPcHRpb25zQ29uZmlnKGFyZ3MsIG1hcHBlciwgZmlsdGVyZWRPcHRpb25zQ3JlYXRvciwgZm9ybWF0KTtcblxuICAgICAgY29uc3QgbmV3Q29uZmlnOiBOb3ZvQ29udHJvbENvbmZpZ1snY29uZmlnJ10gPSB7XG4gICAgICAgIC4uLihlbXB0eVBpY2tlck1lc3NhZ2UgJiYgeyBlbXB0eVBpY2tlck1lc3NhZ2UgfSksXG4gICAgICAgIC4uLihOdW1iZXIuaXNJbnRlZ2VyKG1pblNlYXJjaExlbmd0aCkgJiYgeyBtaW5TZWFyY2hMZW5ndGggfSksXG4gICAgICAgIC4uLihlbmFibGVJbmZpbml0ZVNjcm9sbCAmJiB7IGVuYWJsZUluZmluaXRlU2Nyb2xsIH0pLFxuICAgICAgICAuLi4oZmlsdGVyZWRPcHRpb25zQ3JlYXRvciAmJiB7IGZpbHRlcmVkT3B0aW9uc0NyZWF0b3IgfSksXG4gICAgICAgIC4uLihnZXRMYWJlbHMgJiYgeyBnZXRMYWJlbHMgfSksXG4gICAgICAgIC4uLihvcHRpb25zQ29uZmlnICYmIG9wdGlvbnNDb25maWcpLFxuICAgICAgICByZXN1bHRzVGVtcGxhdGU6XG4gICAgICAgICAgY29udHJvbC5jb25maWcucmVzdWx0c1RlbXBsYXRlIHx8ICgncmVzdWx0c1RlbXBsYXRlVHlwZScgaW4gYXJncyAmJiB0aGlzLmdldEFwcHJvcHJpYXRlUmVzdWx0c1RlbXBsYXRlKGFyZ3MucmVzdWx0c1RlbXBsYXRlVHlwZSkpLFxuICAgICAgfTtcblxuICAgICAgdGhpcy5zZXRQcm9wZXJ0eShrZXksICdjb25maWcnLCBuZXdDb25maWcpO1xuICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoeyBjb250cm9sS2V5OiBrZXksIHByb3A6ICdwaWNrZXJDb25maWcnLCB2YWx1ZTogYXJncyB9LCBvdGhlckZvcm0pO1xuICAgIH1cbiAgfVxuXG4gIGFkZFByb3BlcnRpZXNUb1BpY2tlckNvbmZpZyhrZXk6IHN0cmluZywgcHJvcGVydGllczogeyBba2V5OiBzdHJpbmddOiB1bmtub3duIH0sIG90aGVyRm9ybT86IE5vdm9Gb3JtR3JvdXApIHtcbiAgICBjb25zdCBjb250cm9sID0gdGhpcy5nZXRDb250cm9sKGtleSwgb3RoZXJGb3JtKTtcbiAgICBpZiAoIWNvbnRyb2wgfHwgY29udHJvbC5yZXN0cmljdEZpZWxkSW50ZXJhY3Rpb25zKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgLi4uY29udHJvbC5jb25maWcsXG4gICAgICAuLi5wcm9wZXJ0aWVzLFxuICAgIH07XG5cbiAgICB0aGlzLnNldFByb3BlcnR5KGtleSwgJ2NvbmZpZycsIGNvbmZpZyk7XG4gICAgdGhpcy50cmlnZ2VyRXZlbnQoeyBjb250cm9sS2V5OiBrZXksIHByb3A6ICdwaWNrZXJDb25maWcnLCB2YWx1ZTogcHJvcGVydGllcyB9LCBvdGhlckZvcm0pO1xuICB9XG4gIGdldE9wdGlvbnNDb25maWcgPSAoXG4gICAgYXJnczogTW9kaWZ5UGlja2VyQ29uZmlnQXJncyxcbiAgICBtYXBwZXI/OiAoaXRlbTogdW5rbm93bikgPT4gdW5rbm93bixcbiAgICBmaWx0ZXJlZE9wdGlvbnNDcmVhdG9yPzogKHdoZXJlOiBzdHJpbmcpID0+IChxdWVyeTogc3RyaW5nKSA9PiBQcm9taXNlPHVua25vd25bXT4sXG4gICAgcGlja2VyQ29uZmlnRm9ybWF0Pzogc3RyaW5nLFxuICApOiB1bmRlZmluZWQgfCB7IG9wdGlvbnM6IHVua25vd25bXSB9IHwgeyBvcHRpb25zOiBPcHRpb25zRnVuY3Rpb247IGZvcm1hdD86IHN0cmluZyB9ID0+IHtcbiAgICBpZiAoZmlsdGVyZWRPcHRpb25zQ3JlYXRvciB8fCAnb3B0aW9uc1VybCcgaW4gYXJncyB8fCAnb3B0aW9uc1VybEJ1aWxkZXInIGluIGFyZ3MgfHwgJ29wdGlvbnNQcm9taXNlJyBpbiBhcmdzKSB7XG4gICAgICBjb25zdCBmb3JtYXQgPSAoJ2Zvcm1hdCcgaW4gYXJncyAmJiBhcmdzLmZvcm1hdCkgfHwgcGlja2VyQ29uZmlnRm9ybWF0O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgb3B0aW9uczogdGhpcy5jcmVhdGVPcHRpb25zRnVuY3Rpb24oYXJncywgbWFwcGVyLCBmaWx0ZXJlZE9wdGlvbnNDcmVhdG9yKSxcbiAgICAgICAgLi4uKCdlbXB0eVBpY2tlck1lc3NhZ2UnIGluIGFyZ3MgJiYgeyBlbXB0eVBpY2tlck1lc3NhZ2U6IGFyZ3MuZW1wdHlQaWNrZXJNZXNzYWdlIH0pLFxuICAgICAgICAuLi4oZm9ybWF0ICYmIHsgZm9ybWF0IH0pLFxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKCdvcHRpb25zJyBpbiBhcmdzICYmIEFycmF5LmlzQXJyYXkoYXJncy5vcHRpb25zKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgb3B0aW9uczogWy4uLmFyZ3Mub3B0aW9uc10sXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgfTtcblxuICBwcml2YXRlIGdldEFwcHJvcHJpYXRlUmVzdWx0c1RlbXBsYXRlKHJlc3VsdHNUZW1wbGF0ZVR5cGU6IFJlc3VsdHNUZW1wbGF0ZVR5cGUpIHtcbiAgICBzd2l0Y2ggKHJlc3VsdHNUZW1wbGF0ZVR5cGUpIHtcbiAgICAgIGNhc2UgJ2VudGl0eS1waWNrZXInOlxuICAgICAgICByZXR1cm4gRW50aXR5UGlja2VyUmVzdWx0cztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlT3B0aW9uc0Z1bmN0aW9uID1cbiAgICAoXG4gICAgICBjb25maWc6IE1vZGlmeVBpY2tlckNvbmZpZ0FyZ3MsXG4gICAgICBtYXBwZXI/OiAoaXRlbTogdW5rbm93bikgPT4gdW5rbm93bixcbiAgICAgIGZpbHRlcmVkT3B0aW9uc0NyZWF0b3I/OiAod2hlcmU/OiBzdHJpbmcpID0+IChxdWVyeTogc3RyaW5nLCBwYWdlPzogbnVtYmVyKSA9PiBQcm9taXNlPHVua25vd25bXT4sXG4gICAgKTogKChxdWVyeTogc3RyaW5nKSA9PiBQcm9taXNlPHVua25vd25bXT4pID0+XG4gICAgKHF1ZXJ5OiBzdHJpbmcsIHBhZ2U/OiBudW1iZXIpID0+IHtcbiAgICAgIGlmICgnb3B0aW9uc1Byb21pc2UnIGluIGNvbmZpZyAmJiBjb25maWcub3B0aW9uc1Byb21pc2UpIHtcbiAgICAgICAgcmV0dXJuIGNvbmZpZy5vcHRpb25zUHJvbWlzZShxdWVyeSwgbmV3IEN1c3RvbUh0dHBJbXBsKHRoaXMuaHR0cCksIHBhZ2UpO1xuICAgICAgfSBlbHNlIGlmICgoJ29wdGlvbnNVcmxCdWlsZGVyJyBpbiBjb25maWcgJiYgY29uZmlnLm9wdGlvbnNVcmxCdWlsZGVyKSB8fCAoJ29wdGlvbnNVcmwnIGluIGNvbmZpZyAmJiBjb25maWcub3B0aW9uc1VybCkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBjb25zdCB1cmwgPSAnb3B0aW9uc1VybEJ1aWxkZXInIGluIGNvbmZpZyA/IGNvbmZpZy5vcHRpb25zVXJsQnVpbGRlcihxdWVyeSkgOiBgJHtjb25maWcub3B0aW9uc1VybH0/ZmlsdGVyPSR7cXVlcnkgfHwgJyd9YDtcbiAgICAgICAgICB0aGlzLmh0dHBcbiAgICAgICAgICAgIC5nZXQodXJsKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcCgocmVzdWx0czogdW5rbm93bltdKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG1hcHBlcikge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHMubWFwKG1hcHBlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKGZpbHRlcmVkT3B0aW9uc0NyZWF0b3IpIHtcbiAgICAgICAgaWYgKCd3aGVyZScgaW4gY29uZmlnKSB7XG4gICAgICAgICAgcmV0dXJuIGZpbHRlcmVkT3B0aW9uc0NyZWF0b3IoY29uZmlnLndoZXJlKShxdWVyeSwgcGFnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZpbHRlcmVkT3B0aW9uc0NyZWF0b3IoKShxdWVyeSwgcGFnZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gIHNldExvYWRpbmcoa2V5OiBzdHJpbmcsIGxvYWRpbmc6IGJvb2xlYW4sIG90aGVyRm9ybT86IE5vdm9Gb3JtR3JvdXApIHtcbiAgICBjb25zdCBmb3JtID0gb3RoZXJGb3JtIHx8IHRoaXMuZm9ybTtcbiAgICBjb25zdCBjb250cm9sID0gdGhpcy5nZXRDb250cm9sKGtleSwgb3RoZXJGb3JtKTtcbiAgICBpZiAoY29udHJvbCAmJiAhY29udHJvbC5yZXN0cmljdEZpZWxkSW50ZXJhY3Rpb25zKSB7XG4gICAgICBpZiAobG9hZGluZykge1xuICAgICAgICBmb3JtLmNvbnRyb2xzW2tleV0uZmllbGRJbnRlcmFjdGlvbmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICBjb250cm9sLnNldEVycm9ycyh7IGxvYWRpbmc6IHRydWUgfSk7XG4gICAgICAgIC8vIEhpc3RvcnlcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuYXN5bmNCbG9ja1RpbWVvdXQpO1xuICAgICAgICB0aGlzLmFzeW5jQmxvY2tUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zZXRMb2FkaW5nKGtleSwgZmFsc2UpO1xuICAgICAgICAgIHRoaXMuZGlzcGxheVRpcChrZXksIHRoaXMubGFiZWxzLmFzeW5jRmFpbHVyZSwgJ2luZm8nLCBmYWxzZSk7XG4gICAgICAgICAgdGhpcy5zZXRQcm9wZXJ0eShrZXksICdfZGlzcGxheWVkQXN5bmNGYWlsdXJlJywgdHJ1ZSk7XG4gICAgICAgIH0sIDEwMDAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvcm0uY29udHJvbHNba2V5XS5maWVsZEludGVyYWN0aW9ubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5hc3luY0Jsb2NrVGltZW91dCk7XG4gICAgICAgIGNvbnRyb2wuc2V0RXJyb3JzKHsgbG9hZGluZzogbnVsbCB9KTtcbiAgICAgICAgY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcbiAgICAgICAgaWYgKHRoaXMuZ2V0UHJvcGVydHkoa2V5LCAnX2Rpc3BsYXllZEFzeW5jRmFpbHVyZScpKSB7XG4gICAgICAgICAgdGhpcy5zZXRQcm9wZXJ0eShrZXksICd0aXBXZWxsJywgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMudHJpZ2dlckV2ZW50KHsgY29udHJvbEtleToga2V5LCBwcm9wOiAnbG9hZGluZycsIHZhbHVlOiBsb2FkaW5nIH0sIG90aGVyRm9ybSk7XG4gICAgfVxuICB9XG5cbiAgYWRkQ29udHJvbChcbiAgICBrZXk6IHN0cmluZyxcbiAgICBtZXRhRm9yTmV3RmllbGQ6IHtcbiAgICAgIGtleT86IHN0cmluZztcbiAgICAgIHR5cGU/OiBzdHJpbmc7XG4gICAgICBuYW1lPzogc3RyaW5nO1xuICAgICAgbGFiZWw/OiBzdHJpbmc7XG4gICAgICBpbnRlcmFjdGlvbnM/OiBBcnJheTx7IGV2ZW50Pzogc3RyaW5nOyBpbnZva2VPbkluaXQ/OiBib29sZWFuOyBzY3JpcHQ/IH0+O1xuICAgIH0sXG4gICAgcG9zaXRpb246IHN0cmluZyA9IEZpZWxkSW50ZXJhY3Rpb25BcGkuRklFTERfUE9TSVRJT05TLkFCT1ZFX0ZJRUxELFxuICAgIGluaXRpYWxWYWx1ZT8sXG4gICAgb3RoZXJGb3JtPzogTm92b0Zvcm1Hcm91cCxcbiAgKTogdm9pZCB7XG4gICAgaWYgKCFtZXRhRm9yTmV3RmllbGQua2V5ICYmICFtZXRhRm9yTmV3RmllbGQubmFtZSkge1xuICAgICAgY29uc29sZS5lcnJvcignW0ZpZWxkSW50ZXJhY3Rpb25BUEldIC0gbWlzc2luZyBcImtleVwiIGluIG1ldGEgZm9yIG5ldyBmaWVsZCcpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoIW1ldGFGb3JOZXdGaWVsZC5rZXkpIHtcbiAgICAgIC8vIElmIGtleSBpcyBub3QgZXhwbGljaXRseSBkZWNsYXJlZCwgdXNlIG5hbWUgYXMga2V5XG4gICAgICBtZXRhRm9yTmV3RmllbGQua2V5ID0gbWV0YUZvck5ld0ZpZWxkLm5hbWU7XG4gICAgfVxuXG4gICAgY29uc3QgZm9ybSA9IG90aGVyRm9ybSB8fCB0aGlzLmZvcm07XG4gICAgaWYgKGZvcm0uY29udHJvbHNbbWV0YUZvck5ld0ZpZWxkLmtleV0pIHtcbiAgICAgIC8vIEZpZWxkIGlzIGFscmVhZHkgb24gdGhlIGZvcm1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbnRyb2wgPSBmb3JtLmNvbnRyb2xzW2tleV07XG4gICAgbGV0IGZpZWxkc2V0SW5kZXg6IG51bWJlcjtcbiAgICBsZXQgY29udHJvbEluZGV4OiBudW1iZXI7XG4gICAgaWYgKGNvbnRyb2wpIHtcbiAgICAgIGZpZWxkc2V0SW5kZXggPSAtMTtcbiAgICAgIGNvbnRyb2xJbmRleCA9IC0xO1xuXG4gICAgICBmb3JtLmZpZWxkc2V0cy5mb3JFYWNoKChmaWVsZHNldCwgZmkpID0+IHtcbiAgICAgICAgZmllbGRzZXQuY29udHJvbHMuZm9yRWFjaCgoZmllbGRzZXRDb250cm9sLCBjaSkgPT4ge1xuICAgICAgICAgIGlmIChmaWVsZHNldENvbnRyb2wua2V5ID09PSBrZXkpIHtcbiAgICAgICAgICAgIGZpZWxkc2V0SW5kZXggPSBmaTtcbiAgICAgICAgICAgIGNvbnRyb2xJbmRleCA9IGNpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gQ2hhbmdlIHRoZSBwb3NpdGlvbiBvZiB0aGUgbmV3bHkgYWRkZWQgZmllbGRcbiAgICAgIHN3aXRjaCAocG9zaXRpb24pIHtcbiAgICAgICAgY2FzZSBGaWVsZEludGVyYWN0aW9uQXBpLkZJRUxEX1BPU0lUSU9OUy5BQk9WRV9GSUVMRDpcbiAgICAgICAgICAvLyBBZGRpbmcgZmllbGQgYWJvdmUgYWN0aXZlIGZpZWxkXG4gICAgICAgICAgLy8gaW5kZXggY2FuIHN0YXkgdGhlIHNhbWVcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBGaWVsZEludGVyYWN0aW9uQXBpLkZJRUxEX1BPU0lUSU9OUy5CRUxPV19GSUVMRDpcbiAgICAgICAgICAvLyBBZGRpbmcgZmllbGQgYmVsb3cgYWN0aXZlIGZpZWxkXG4gICAgICAgICAgY29udHJvbEluZGV4ICs9IDE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgRmllbGRJbnRlcmFjdGlvbkFwaS5GSUVMRF9QT1NJVElPTlMuVE9QX09GX0ZPUk06XG4gICAgICAgICAgLy8gQWRkaW5nIGZpZWxkIHRvIHRoZSB0b3Agb2YgdGhlIGZvcm1cbiAgICAgICAgICBjb250cm9sSW5kZXggPSAwO1xuICAgICAgICAgIGZpZWxkc2V0SW5kZXggPSAwO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEZpZWxkSW50ZXJhY3Rpb25BcGkuRklFTERfUE9TSVRJT05TLkJPVFRPTV9PRl9GT1JNOlxuICAgICAgICAgIC8vIEFkZGluZyBmaWVsZCB0byB0aGUgYm90dG9tIG9mIHRoZSBmb3JtXG4gICAgICAgICAgZmllbGRzZXRJbmRleCA9IGZvcm0uZmllbGRzZXRzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgY29udHJvbEluZGV4ID0gZm9ybS5maWVsZHNldHNbZmllbGRzZXRJbmRleF0uY29udHJvbHMubGVuZ3RoO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmllbGRzZXRJbmRleCAhPT0gLTEgJiYgY29udHJvbEluZGV4ICE9PSAtMSkge1xuICAgICAgICBjb25zdCBub3ZvQ29udHJvbCA9IHRoaXMuZm9ybVV0aWxzLmdldENvbnRyb2xGb3JGaWVsZChtZXRhRm9yTmV3RmllbGQsIHRoaXMuaHR0cCwge30pO1xuICAgICAgICBub3ZvQ29udHJvbC5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgY29uc3QgZm9ybUNvbnRyb2wgPSBuZXcgTm92b0Zvcm1Db250cm9sKGluaXRpYWxWYWx1ZSwgbm92b0NvbnRyb2wpO1xuICAgICAgICBmb3JtLmFkZENvbnRyb2wobm92b0NvbnRyb2wua2V5LCBmb3JtQ29udHJvbCk7XG4gICAgICAgIGZvcm0uZmllbGRzZXRzW2ZpZWxkc2V0SW5kZXhdLmNvbnRyb2xzLnNwbGljZShjb250cm9sSW5kZXgsIDAsIG5vdm9Db250cm9sKTtcbiAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoeyBjb250cm9sS2V5OiBrZXksIHByb3A6ICdhZGRDb250cm9sJywgdmFsdWU6IGZvcm1Db250cm9sIH0sIG90aGVyRm9ybSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlQ29udHJvbChrZXk6IHN0cmluZywgb3RoZXJGb3JtPzogTm92b0Zvcm1Hcm91cCk6IHZvaWQge1xuICAgIGNvbnN0IGZvcm0gPSBvdGhlckZvcm0gfHwgdGhpcy5mb3JtO1xuICAgIGlmICghZm9ybS5jb250cm9sc1trZXldKSB7XG4gICAgICAvLyBGaWVsZCBpcyBub3Qgb24gdGhlIGZvcm1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBjb250cm9sID0gdGhpcy5nZXRDb250cm9sKGtleSwgb3RoZXJGb3JtKTtcbiAgICBpZiAoY29udHJvbCAmJiAhY29udHJvbC5yZXN0cmljdEZpZWxkSW50ZXJhY3Rpb25zKSB7XG4gICAgICBsZXQgZmllbGRzZXRJbmRleCA9IC0xO1xuICAgICAgbGV0IGNvbnRyb2xJbmRleCA9IC0xO1xuXG4gICAgICBmb3JtLmZpZWxkc2V0cy5mb3JFYWNoKChmaWVsZHNldCwgZmkpID0+IHtcbiAgICAgICAgZmllbGRzZXQuY29udHJvbHMuZm9yRWFjaCgoZmllbGRzZXRDb250cm9sLCBjaSkgPT4ge1xuICAgICAgICAgIGlmIChmaWVsZHNldENvbnRyb2wua2V5ID09PSBrZXkpIHtcbiAgICAgICAgICAgIGZpZWxkc2V0SW5kZXggPSBmaTtcbiAgICAgICAgICAgIGNvbnRyb2xJbmRleCA9IGNpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKGZpZWxkc2V0SW5kZXggIT09IC0xICYmIGNvbnRyb2xJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgZm9ybS5yZW1vdmVDb250cm9sKGtleSk7XG4gICAgICAgIGZvcm0uZmllbGRzZXRzW2ZpZWxkc2V0SW5kZXhdLmNvbnRyb2xzLnNwbGljZShjb250cm9sSW5kZXgsIDEpO1xuICAgICAgICB0aGlzLnRyaWdnZXJFdmVudCh7IGNvbnRyb2xLZXk6IGtleSwgcHJvcDogJ3JlbW92ZUNvbnRyb2wnLCB2YWx1ZToga2V5IH0sIG90aGVyRm9ybSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZGVib3VuY2UoZnVuYzogKCkgPT4gdm9pZCwgd2FpdCA9IDUwKSB7XG4gICAgbGV0IGg7XG4gICAgY2xlYXJUaW1lb3V0KGgpO1xuICAgIGggPSBzZXRUaW1lb3V0KCgpID0+IGZ1bmMoKSwgd2FpdCk7XG4gIH1cblxuICAvKipcbiAgICogQWxsb3dzIHRyYXZlcnNpbmcgbmVzdGVkIGZvcm1zIGJ5IGFjY2Vzc2luZyB0aGUgcGFyZW50IGZvcm0uXG4gICAqXG4gICAqIEBwYXJhbSBvdGhlckZvcm0gb3B0aW9uYWwgcGFyYW1ldGVyIGZvciBnZXR0aW5nIHRoZSBwYXJlbnQgb2YgYSBkaWZmZXJlbnQgZm9ybS5cbiAgICogSWYgbm90IHByb3ZpZGVkIHdpbGwgZGVmYXVsdCB0byB0aGUgcGFyZW50IG9mIHRoZSBjdXJyZW50IGZvcm0uXG4gICAqL1xuICBnZXRQYXJlbnQob3RoZXJGb3JtPzogTm92b0Zvcm1Hcm91cCkge1xuICAgIGNvbnN0IGZvcm0gPSBvdGhlckZvcm0gfHwgdGhpcy5mb3JtO1xuICAgIHJldHVybiBmb3JtLnBhcmVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgaW5kZXggaXMgYXNzaWduZWQgYXMgYSBwcm9wZXJ0eSBvbiB0aGUgZm9ybSdzIGFzc29jaWF0aW9ucyBvYmplY3Qgd2hlbiB0aGUgZm9ybSBpcyBwYXJ0IG9mIGEgTm92b0NvbnRyb2xHcm91cCBhcnJheS5cbiAgICpcbiAgICogQHBhcmFtIG90aGVyRm9ybSBvcHRpb25hbCBwYXJhbWV0ZXIgZm9yIGdldHRpbmcgdGhlIGluZGV4IG9mIGEgZGlmZmVyZW50IGZvcm0uIElmIG5vdCBwcm92aWRlZCB3aWxsIGRlZmF1bHQgdG8gdGhlIGN1cnJlbnQgZm9ybS5cbiAgICogQHJldHVybnMgdGhlIGluZGV4IGlmIGl0IGV4aXN0cyBmb3IgdGhlIGN1cnJlbnQgb3IgZm9ybSwgb3IgbnVsbCBvdGhlcndpc2UuXG4gICAqL1xuICBnZXRJbmRleChvdGhlckZvcm0/OiBOb3ZvRm9ybUdyb3VwKSB7XG4gICAgY29uc3QgZm9ybSA9IG90aGVyRm9ybSB8fCB0aGlzLmZvcm07XG4gICAgcmV0dXJuIGZvcm0uYXNzb2NpYXRpb25zICYmIGZvcm0uYXNzb2NpYXRpb25zLmhhc093blByb3BlcnR5KCdpbmRleCcpID8gZm9ybS5hc3NvY2lhdGlvbnMuaW5kZXggOiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSB0cmlnZ2VyRXZlbnQoZXZlbnQ6IElGaWVsZEludGVyYWN0aW9uRXZlbnQsIG90aGVyRm9ybT86IE5vdm9Gb3JtR3JvdXApOiB2b2lkIHtcbiAgICBjb25zdCBmb3JtID0gb3RoZXJGb3JtIHx8IHRoaXMuZm9ybTtcbiAgICBpZiAoZm9ybSAmJiBmb3JtLmZpZWxkSW50ZXJhY3Rpb25FdmVudHMpIHtcbiAgICAgIGZvcm0uZmllbGRJbnRlcmFjdGlvbkV2ZW50cy5lbWl0KGV2ZW50KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
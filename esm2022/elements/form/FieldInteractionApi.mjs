// NG2
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
// APP
import { NovoModalService } from 'novo-elements/elements/modal';
import { EntityPickerResults } from 'novo-elements/elements/picker';
import { NovoToastService } from 'novo-elements/elements/toast';
import { NovoLabelService } from 'novo-elements/services';
import { Helpers } from 'novo-elements/utils';
import { FormUtils } from './utils/FormUtils';
import { ControlConfirmModal, ControlPromptModal } from './FieldInteractionModals';
import { NovoFormControl } from './NovoFormControl';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/elements/toast";
import * as i2 from "novo-elements/elements/modal";
import * as i3 from "./utils/FormUtils";
import * as i4 from "@angular/common/http";
import * as i5 from "novo-elements/services";
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
    static { this.FIELD_POSITIONS = {
        ABOVE_FIELD: 'ABOVE_FIELD',
        BELOW_FIELD: 'BELOW_FIELD',
        TOP_OF_FORM: 'TOP_OF_FORM',
        BOTTOM_OF_FORM: 'BOTTOM_OF_FORM',
    }; }
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
    setPopOver(key, popover, otherForm) {
        const control = this.getControl(key, otherForm);
        if (control && !control.restrictFieldInteractions) {
            control.popoverTitle = popover.title;
            control.popoverContent = popover.content;
            control.popoverHtmlContent = popover.htmlContent;
            control.popoverPlacement = popover.placement;
            control.popoverOnHover = popover.onHover;
            control.popoverAlways = popover.always;
            control.popoverDisabled = popover.disabled;
            control.popoverAnimation = popover.animation;
            control.popoverDismissTimeout = popover.dismissTimeout;
            this.triggerEvent({ controlKey: key, prop: 'popover', value: popover }, otherForm);
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FieldInteractionApi, deps: [{ token: i1.NovoToastService }, { token: i2.NovoModalService }, { token: i3.FormUtils }, { token: i4.HttpClient }, { token: i5.NovoLabelService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FieldInteractionApi }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FieldInteractionApi, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.NovoToastService }, { type: i2.NovoModalService }, { type: i3.FormUtils }, { type: i4.HttpClient }, { type: i5.NovoLabelService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmllbGRJbnRlcmFjdGlvbkFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2Zvcm0vRmllbGRJbnRlcmFjdGlvbkFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE1BQU07QUFDTixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQWdCLE1BQU0sOEJBQThCLENBQUM7QUFDOUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFhLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUU5QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUduRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7Ozs7Ozs7QUFHcEQsTUFBTSxjQUFjO0lBS2xCLFlBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFGcEMsVUFBSyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFc0IsQ0FBQztJQUV4QyxHQUFHLENBQUMsR0FBVyxFQUFFLE9BQVE7UUFDdkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMs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QUFLLENBQUMsQ0FBQztTQUN6QztJQUNILENBQUM7K0dBOTJCVSxtQkFBbUI7bUhBQW5CLG1CQUFtQjs7NEZBQW5CLG1CQUFtQjtrQkFEL0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1BcnJheSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbi8vIFZlbmRvclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9Nb2RhbFNlcnZpY2UgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL21vZGFsJztcbmltcG9ydCB7IEVudGl0eVBpY2tlclJlc3VsdHMgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL3BpY2tlcic7XG5pbXBvcnQgeyBOb3ZvVG9hc3RTZXJ2aWNlLCBUb2FzdE9wdGlvbnMgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL3RvYXN0JztcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3NlcnZpY2VzJztcbmltcG9ydCB7IEFwcEJyaWRnZSwgSGVscGVycyB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuaW1wb3J0IHsgRm9ybVV0aWxzIH0gZnJvbSAnLi91dGlscy9Gb3JtVXRpbHMnO1xuaW1wb3J0IHsgQ3VzdG9tSHR0cCwgTW9kaWZ5UGlja2VyQ29uZmlnQXJncywgT3B0aW9uc0Z1bmN0aW9uIH0gZnJvbSAnLi9GaWVsZEludGVyYWN0aW9uQXBpVHlwZXMnO1xuaW1wb3J0IHsgQ29udHJvbENvbmZpcm1Nb2RhbCwgQ29udHJvbFByb21wdE1vZGFsIH0gZnJvbSAnLi9GaWVsZEludGVyYWN0aW9uTW9kYWxzJztcbmltcG9ydCB7IE5vdm9Db250cm9sQ29uZmlnIH0gZnJvbSAnLi9Gb3JtQ29udHJvbHMnO1xuaW1wb3J0IHsgSUZpZWxkSW50ZXJhY3Rpb25FdmVudCwgTm92b0ZpZWxkc2V0LCBSZXN1bHRzVGVtcGxhdGVUeXBlIH0gZnJvbSAnLi9Gb3JtSW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBOb3ZvRm9ybUNvbnRyb2wgfSBmcm9tICcuL05vdm9Gb3JtQ29udHJvbCc7XG5pbXBvcnQgeyBOb3ZvRm9ybUdyb3VwIH0gZnJvbSAnLi9Ob3ZvRm9ybUdyb3VwJztcblxuY2xhc3MgQ3VzdG9tSHR0cEltcGwgaW1wbGVtZW50cyBDdXN0b21IdHRwIHtcbiAgdXJsOiBzdHJpbmc7XG4gIG9wdGlvbnM7XG4gIG1hcEZuID0gKHgpID0+IHg7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7fVxuXG4gIGdldCh1cmw6IHN0cmluZywgb3B0aW9ucz8pOiBDdXN0b21IdHRwIHtcbiAgICB0aGlzLnVybCA9IHVybDtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbWFwKG1hcEZuKTogQ3VzdG9tSHR0cCB7XG4gICAgdGhpcy5tYXBGbiA9IG1hcEZuO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc3Vic2NyaWJlKHJlc29sdmUsIHJlamVjdD8pOiBTdWJzY3JpcHRpb24ge1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMudXJsLCB0aGlzLm9wdGlvbnMpLnBpcGUobWFwKHRoaXMubWFwRm4pKS5zdWJzY3JpYmUocmVzb2x2ZSwgcmVqZWN0KTtcbiAgfVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRmllbGRJbnRlcmFjdGlvbkFwaSB7XG4gIHByaXZhdGUgX2dsb2JhbHM7XG4gIGZvcm06IE5vdm9Gb3JtR3JvdXAgfCBhbnk7XG4gIHByaXZhdGUgX2N1cnJlbnRLZXk6IHN0cmluZztcbiAgYXBwQnJpZGdlOiBBcHBCcmlkZ2U7XG4gIHByaXZhdGUgYXN5bmNCbG9ja1RpbWVvdXQ7XG4gIHByaXZhdGUgX2lzSW52b2tlZE9uSW5pdCA9IGZhbHNlO1xuXG4gIHN0YXRpYyBGSUVMRF9QT1NJVElPTlMgPSB7XG4gICAgQUJPVkVfRklFTEQ6ICdBQk9WRV9GSUVMRCcsXG4gICAgQkVMT1dfRklFTEQ6ICdCRUxPV19GSUVMRCcsXG4gICAgVE9QX09GX0ZPUk06ICdUT1BfT0ZfRk9STScsXG4gICAgQk9UVE9NX09GX0ZPUk06ICdCT1RUT01fT0ZfRk9STScsXG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB0b2FzdGVyOiBOb3ZvVG9hc3RTZXJ2aWNlLFxuICAgIHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBOb3ZvTW9kYWxTZXJ2aWNlLFxuICAgIHByaXZhdGUgZm9ybVV0aWxzOiBGb3JtVXRpbHMsXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByaXZhdGUgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLFxuICApIHt9XG5cbiAgZ2V0IGFzc29jaWF0aW9ucygpOiBvYmplY3Qge1xuICAgIHJldHVybiB0aGlzLmZvcm0uaGFzT3duUHJvcGVydHkoJ2Fzc29jaWF0aW9ucycpID8gdGhpcy5mb3JtLmFzc29jaWF0aW9ucyA6IHt9O1xuICB9XG5cbiAgZ2V0IGN1cnJlbnRFbnRpdHkoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5mb3JtLmhhc093blByb3BlcnR5KCdjdXJyZW50RW50aXR5JykgPyB0aGlzLmZvcm0uY3VycmVudEVudGl0eSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGdldCBjdXJyZW50RW50aXR5SWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5mb3JtLmhhc093blByb3BlcnR5KCdjdXJyZW50RW50aXR5SWQnKSA/IHRoaXMuZm9ybS5jdXJyZW50RW50aXR5SWQgOiB1bmRlZmluZWQ7XG4gIH1cblxuICBnZXQgaXNFZGl0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmZvcm0uaGFzT3duUHJvcGVydHkoJ2VkaXQnKSA/IHRoaXMuZm9ybS5lZGl0IDogZmFsc2U7XG4gIH1cblxuICBnZXQgaXNBZGQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybS5oYXNPd25Qcm9wZXJ0eSgnZWRpdCcpID8gIXRoaXMuZm9ybS5lZGl0IDogZmFsc2U7XG4gIH1cblxuICBzZXQgZ2xvYmFscyhnbG9iYWxzKSB7XG4gICAgdGhpcy5fZ2xvYmFscyA9IGdsb2JhbHM7XG4gIH1cblxuICBnZXQgZ2xvYmFscygpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2xvYmFscztcbiAgfVxuXG4gIHNldCBjdXJyZW50S2V5KGtleTogc3RyaW5nKSB7XG4gICAgdGhpcy5fY3VycmVudEtleSA9IGtleTtcbiAgfVxuXG4gIGdldCBjdXJyZW50S2V5KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRLZXk7XG4gIH1cblxuICBzZXQgaXNJbnZva2VkT25Jbml0KGlzT25Jbml0OiBib29sZWFuKSB7XG4gICAgdGhpcy5faXNJbnZva2VkT25Jbml0ID0gaXNPbkluaXQ7XG4gIH1cblxuICBnZXQgaXNJbnZva2VkT25Jbml0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc0ludm9rZWRPbkluaXQ7XG4gIH1cblxuICBpc0FjdGl2ZUNvbnRyb2xWYWxpZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLmdldFZhbHVlKHRoaXMuY3VycmVudEtleSk7XG4gIH1cblxuICBnZXRBY3RpdmVDb250cm9sKCk6IE5vdm9Gb3JtQ29udHJvbCB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q29udHJvbCh0aGlzLmN1cnJlbnRLZXkpO1xuICB9XG5cbiAgZ2V0QWN0aXZlS2V5KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudEtleTtcbiAgfVxuXG4gIGdldEFjdGl2ZVZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLmdldFZhbHVlKHRoaXMuY3VycmVudEtleSk7XG4gIH1cblxuICBnZXRBY3RpdmVJbml0aWFsVmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0SW5pdGlhbFZhbHVlKHRoaXMuY3VycmVudEtleSk7XG4gIH1cblxuICBnZXRGaWVsZFNldChrZXk6IHN0cmluZywgb3RoZXJGb3JtPzogTm92b0Zvcm1Hcm91cCk6IE5vdm9GaWVsZHNldCB7XG4gICAgaWYgKCFrZXkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1tGaWVsZEludGVyYWN0aW9uQVBJXSAtIGludmFsaWQgb3IgbWlzc2luZyBcImtleVwiJyk7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGZvcm0gPSBvdGhlckZvcm0gfHwgdGhpcy5mb3JtO1xuICAgIGNvbnN0IGZpZWxkU2V0ID0gZm9ybS5maWVsZHNldHMuZmluZCgoZnM6IE5vdm9GaWVsZHNldCkgPT4gZnMua2V5ICYmIGZzLmtleS50b0xvd2VyQ2FzZSgpID09PSBrZXkudG9Mb3dlckNhc2UoKSk7XG4gICAgaWYgKCFmaWVsZFNldCkge1xuICAgICAgY29uc29sZS5lcnJvcignW0ZpZWxkSW50ZXJhY3Rpb25BUEldIC0gY291bGQgbm90IGZpbmQgYSBmaWVsZHNldCBpbiB0aGUgZm9ybSBieSB0aGUga2V5IC0tJywga2V5KTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpZWxkU2V0IGFzIE5vdm9GaWVsZHNldDtcbiAgfVxuXG4gIGdldENvbnRyb2woa2V5OiBzdHJpbmcsIG90aGVyRm9ybT86IE5vdm9Gb3JtR3JvdXApIHtcbiAgICBpZiAoIWtleSkge1xuICAgICAgY29uc29sZS5lcnJvcignW0ZpZWxkSW50ZXJhY3Rpb25BUEldIC0gaW52YWxpZCBvciBtaXNzaW5nIFwia2V5XCInKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZm9ybSA9IG90aGVyRm9ybSB8fCB0aGlzLmZvcm07XG4gICAgY29uc3QgY29udHJvbCA9IGZvcm0uY29udHJvbHNba2V5XSBhcyBOb3ZvRm9ybUNvbnRyb2w7XG4gICAgaWYgKCFjb250cm9sKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdbRmllbGRJbnRlcmFjdGlvbkFQSV0gLSBjb3VsZCBub3QgZmluZCBhIGNvbnRyb2wgaW4gdGhlIGZvcm0gYnkgdGhlIGtleSAtLScsIGtleSk7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBjb250cm9sO1xuICB9XG5cbiAgZ2V0Rm9ybUdyb3VwQXJyYXkoa2V5OiBzdHJpbmcsIG90aGVyRm9ybT86IE5vdm9Gb3JtR3JvdXApOiBOb3ZvRm9ybUdyb3VwW10ge1xuICAgIGlmICgha2V5KSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdbRmllbGRJbnRlcmFjdGlvbkFQSV0gLSBpbnZhbGlkIG9yIG1pc3NpbmcgXCJrZXlcIicpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBmb3JtID0gb3RoZXJGb3JtIHx8IHRoaXMuZm9ybTtcbiAgICBjb25zdCBmb3JtQXJyYXkgPSBmb3JtLmNvbnRyb2xzW2tleV0gYXMgRm9ybUFycmF5O1xuICAgIGlmICghZm9ybUFycmF5IHx8ICFmb3JtQXJyYXkuY29udHJvbHMpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1tGaWVsZEludGVyYWN0aW9uQVBJXSAtIGNvdWxkIG5vdCBmaW5kIGEgZm9ybSBhcnJheSBpbiB0aGUgZm9ybSBieSB0aGUga2V5IC0tJywga2V5KTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZvcm1BcnJheS5jb250cm9scyBhcyBOb3ZvRm9ybUdyb3VwW10gfCBhbnk7XG4gIH1cblxuICBnZXRWYWx1ZShrZXk6IHN0cmluZywgb3RoZXJGb3JtPzogTm92b0Zvcm1Hcm91cCkge1xuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmdldENvbnRyb2woa2V5LCBvdGhlckZvcm0pO1xuICAgIGlmIChjb250cm9sKSB7XG4gICAgICByZXR1cm4gY29udHJvbC52YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBnZXRSYXdWYWx1ZShrZXk6IHN0cmluZywgb3RoZXJGb3JtPzogTm92b0Zvcm1Hcm91cCkge1xuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmdldENvbnRyb2woa2V5LCBvdGhlckZvcm0pO1xuICAgIGlmIChjb250cm9sKSB7XG4gICAgICByZXR1cm4gY29udHJvbC5yYXdWYWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBnZXRJbml0aWFsVmFsdWUoa2V5OiBzdHJpbmcsIG90aGVyRm9ybT86IE5vdm9Gb3JtR3JvdXApIHtcbiAgICBjb25zdCBjb250cm9sID0gdGhpcy5nZXRDb250cm9sKGtleSwgb3RoZXJGb3JtKTtcbiAgICBpZiAoY29udHJvbCkge1xuICAgICAgcmV0dXJuIGNvbnRyb2wuaW5pdGlhbFZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHNldFZhbHVlKFxuICAgIGtleTogc3RyaW5nLFxuICAgIHZhbHVlLFxuICAgIG9wdGlvbnM/OiB7XG4gICAgICBvbmx5U2VsZj86IGJvb2xlYW47XG4gICAgICBlbWl0RXZlbnQ/OiBib29sZWFuO1xuICAgICAgZW1pdE1vZGVsVG9WaWV3Q2hhbmdlPzogYm9vbGVhbjtcbiAgICAgIGVtaXRWaWV3VG9Nb2RlbENoYW5nZT86IGJvb2xlYW47XG4gICAgfSxcbiAgICBvdGhlckZvcm0/OiBOb3ZvRm9ybUdyb3VwLFxuICApOiB2b2lkIHtcbiAgICBjb25zdCBjb250cm9sID0gdGhpcy5nZXRDb250cm9sKGtleSwgb3RoZXJGb3JtKTtcbiAgICBpZiAoY29udHJvbCAmJiAhY29udHJvbC5yZXN0cmljdEZpZWxkSW50ZXJhY3Rpb25zKSB7XG4gICAgICBjb250cm9sLnNldFZhbHVlKHZhbHVlLCBvcHRpb25zKTtcbiAgICAgIHRoaXMudHJpZ2dlckV2ZW50KHsgY29udHJvbEtleToga2V5LCBwcm9wOiAndmFsdWUnLCB2YWx1ZSB9LCBvdGhlckZvcm0pO1xuICAgIH1cbiAgfVxuXG4gIHBhdGNoVmFsdWUoXG4gICAga2V5OiBzdHJpbmcsXG4gICAgdmFsdWUsXG4gICAgb3B0aW9ucz86IHtcbiAgICAgIG9ubHlTZWxmPzogYm9vbGVhbjtcbiAgICAgIGVtaXRFdmVudD86IGJvb2xlYW47XG4gICAgICBlbWl0TW9kZWxUb1ZpZXdDaGFuZ2U/OiBib29sZWFuO1xuICAgICAgZW1pdFZpZXdUb01vZGVsQ2hhbmdlPzogYm9vbGVhbjtcbiAgICB9LFxuICAgIG90aGVyRm9ybT86IE5vdm9Gb3JtR3JvdXAsXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmdldENvbnRyb2woa2V5LCBvdGhlckZvcm0pO1xuICAgIGlmIChjb250cm9sICYmICFjb250cm9sLnJlc3RyaWN0RmllbGRJbnRlcmFjdGlvbnMpIHtcbiAgICAgIGNvbnRyb2wuc2V0VmFsdWUodmFsdWUsIG9wdGlvbnMpO1xuICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoeyBjb250cm9sS2V5OiBrZXksIHByb3A6ICd2YWx1ZScsIHZhbHVlIH0sIG90aGVyRm9ybSk7XG4gICAgfVxuICB9XG5cbiAgc2V0UmVhZE9ubHkoa2V5OiBzdHJpbmcsIGlzUmVhZE9ubHk6IGJvb2xlYW4sIG90aGVyRm9ybT86IE5vdm9Gb3JtR3JvdXApOiB2b2lkIHtcbiAgICBjb25zdCBjb250cm9sID0gdGhpcy5nZXRDb250cm9sKGtleSwgb3RoZXJGb3JtKTtcbiAgICBpZiAoY29udHJvbCAmJiAhY29udHJvbC5yZXN0cmljdEZpZWxkSW50ZXJhY3Rpb25zKSB7XG4gICAgICBjb250cm9sLnNldFJlYWRPbmx5KGlzUmVhZE9ubHkpO1xuICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoeyBjb250cm9sS2V5OiBrZXksIHByb3A6ICdyZWFkT25seScsIHZhbHVlOiBpc1JlYWRPbmx5IH0sIG90aGVyRm9ybSk7XG4gICAgfVxuICB9XG5cbiAgc2V0UmVxdWlyZWQoa2V5OiBzdHJpbmcsIHJlcXVpcmVkOiBib29sZWFuLCBvdGhlckZvcm0/OiBOb3ZvRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgY29uc3QgY29udHJvbCA9IHRoaXMuZ2V0Q29udHJvbChrZXksIG90aGVyRm9ybSk7XG4gICAgaWYgKGNvbnRyb2wgJiYgIWNvbnRyb2wucmVzdHJpY3RGaWVsZEludGVyYWN0aW9ucykge1xuICAgICAgY29udHJvbC5zZXRSZXF1aXJlZChyZXF1aXJlZCk7XG4gICAgICB0aGlzLnRyaWdnZXJFdmVudCh7IGNvbnRyb2xLZXk6IGtleSwgcHJvcDogJ3JlcXVpcmVkJywgdmFsdWU6IHJlcXVpcmVkIH0sIG90aGVyRm9ybSk7XG4gICAgfVxuICB9XG5cbiAgc2V0RGVzY3JpcHRpb24oa2V5OiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcsIG90aGVyRm9ybT86IE5vdm9Gb3JtR3JvdXApOiB2b2lkIHtcbiAgICBjb25zdCBjb250cm9sID0gdGhpcy5nZXRDb250cm9sKGtleSwgb3RoZXJGb3JtKTtcbiAgICBpZiAoY29udHJvbCAmJiAhY29udHJvbC5yZXN0cmljdEZpZWxkSW50ZXJhY3Rpb25zKSB7XG4gICAgICBjb250cm9sLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICB0aGlzLnRyaWdnZXJFdmVudCh7IGNvbnRyb2xLZXk6IGtleSwgcHJvcDogJ2Rlc2NyaXB0aW9uJywgdmFsdWU6IGRlc2NyaXB0aW9uIH0sIG90aGVyRm9ybSk7XG4gICAgfVxuICB9XG5cbiAgaGlnaGxpZ2h0KGtleTogc3RyaW5nLCBpc0hpZ2hsaWdodGVkOiBib29sZWFuLCBvdGhlckZvcm0/OiBOb3ZvRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgY29uc3QgY29udHJvbCA9IHRoaXMuZ2V0Q29udHJvbChrZXksIG90aGVyRm9ybSk7XG4gICAgaWYgKGNvbnRyb2wgJiYgIWNvbnRyb2wucmVzdHJpY3RGaWVsZEludGVyYWN0aW9ucykge1xuICAgICAgY29udHJvbC5oaWdobGlnaHRlZCA9IGlzSGlnaGxpZ2h0ZWQ7XG4gICAgICB0aGlzLnRyaWdnZXJFdmVudCh7IGNvbnRyb2xLZXk6IGtleSwgcHJvcDogJ2hpZ2hsaWdodCcsIHZhbHVlOiBpc0hpZ2hsaWdodGVkIH0sIG90aGVyRm9ybSk7XG4gICAgfVxuICB9XG5cbiAgaGlkZShrZXk6IHN0cmluZywgY2xlYXJWYWx1ZSA9IHRydWUsIG90aGVyRm9ybT86IE5vdm9Gb3JtR3JvdXApIHtcbiAgICBjb25zdCBjb250cm9sID0gdGhpcy5nZXRDb250cm9sKGtleSwgb3RoZXJGb3JtKTtcbiAgICBpZiAoY29udHJvbCAmJiAhY29udHJvbC5yZXN0cmljdEZpZWxkSW50ZXJhY3Rpb25zKSB7XG4gICAgICBjb250cm9sLmhpZGUoY2xlYXJWYWx1ZSk7XG4gICAgICB0aGlzLmRpc2FibGUoa2V5LCB7IGVtaXRFdmVudDogZmFsc2UgfSk7XG4gICAgICB0aGlzLnRyaWdnZXJFdmVudCh7IGNvbnRyb2xLZXk6IGtleSwgcHJvcDogJ2hpZGRlbicsIHZhbHVlOiB0cnVlIH0sIG90aGVyRm9ybSk7XG4gICAgfVxuICAgIHJldHVybiBjb250cm9sO1xuICB9XG5cbiAgc2hvdyhrZXk6IHN0cmluZywgb3RoZXJGb3JtPzogTm92b0Zvcm1Hcm91cCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmdldENvbnRyb2woa2V5LCBvdGhlckZvcm0pO1xuICAgIGlmIChjb250cm9sICYmICFjb250cm9sLnJlc3RyaWN0RmllbGRJbnRlcmFjdGlvbnMpIHtcbiAgICAgIGNvbnRyb2wuc2hvdygpO1xuICAgICAgdGhpcy5lbmFibGUoa2V5LCB7IGVtaXRFdmVudDogZmFsc2UgfSk7XG4gICAgICB0aGlzLnRyaWdnZXJFdmVudCh7IGNvbnRyb2xLZXk6IGtleSwgcHJvcDogJ2hpZGRlbicsIHZhbHVlOiBmYWxzZSB9LCBvdGhlckZvcm0pO1xuICAgIH1cbiAgfVxuXG4gIGhpZGVGaWVsZFNldEhlYWRlcihrZXk6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGZpZWxkU2V0ID0gdGhpcy5nZXRGaWVsZFNldChrZXkpO1xuICAgIGlmIChmaWVsZFNldCkge1xuICAgICAgZmllbGRTZXQuaGlkZGVuID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBzaG93RmllbGRTZXRIZWFkZXIoa2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBmaWVsZFNldCA9IHRoaXMuZ2V0RmllbGRTZXQoa2V5KTtcbiAgICBpZiAoZmllbGRTZXQpIHtcbiAgICAgIGZpZWxkU2V0LmhpZGRlbiA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGRpc2FibGUoXG4gICAga2V5OiBzdHJpbmcsXG4gICAgb3B0aW9ucz86IHtcbiAgICAgIG9ubHlTZWxmPzogYm9vbGVhbjtcbiAgICAgIGVtaXRFdmVudD86IGJvb2xlYW47XG4gICAgfSxcbiAgICBvdGhlckZvcm0/OiBOb3ZvRm9ybUdyb3VwLFxuICApOiB2b2lkIHtcbiAgICBjb25zdCBjb250cm9sID0gdGhpcy5nZXRDb250cm9sKGtleSwgb3RoZXJGb3JtKTtcbiAgICBpZiAoY29udHJvbCAmJiAhY29udHJvbC5yZXN0cmljdEZpZWxkSW50ZXJhY3Rpb25zKSB7XG4gICAgICBjb250cm9sLmRpc2FibGUob3B0aW9ucyk7XG4gICAgICB0aGlzLnRyaWdnZXJFdmVudCh7IGNvbnRyb2xLZXk6IGtleSwgcHJvcDogJ3JlYWRPbmx5JywgdmFsdWU6IHRydWUgfSwgb3RoZXJGb3JtKTtcbiAgICB9XG4gIH1cblxuICBlbmFibGUoXG4gICAga2V5OiBzdHJpbmcsXG4gICAgb3B0aW9ucz86IHtcbiAgICAgIG9ubHlTZWxmPzogYm9vbGVhbjtcbiAgICAgIGVtaXRFdmVudD86IGJvb2xlYW47XG4gICAgfSxcbiAgICBvdGhlckZvcm0/OiBOb3ZvRm9ybUdyb3VwLFxuICApOiB2b2lkIHtcbiAgICBjb25zdCBjb250cm9sID0gdGhpcy5nZXRDb250cm9sKGtleSwgb3RoZXJGb3JtKTtcbiAgICBpZiAoY29udHJvbCAmJiAhY29udHJvbC5yZXN0cmljdEZpZWxkSW50ZXJhY3Rpb25zKSB7XG4gICAgICBjb250cm9sLmVuYWJsZShvcHRpb25zKTtcbiAgICAgIHRoaXMudHJpZ2dlckV2ZW50KHsgY29udHJvbEtleToga2V5LCBwcm9wOiAncmVhZE9ubHknLCB2YWx1ZTogZmFsc2UgfSwgb3RoZXJGb3JtKTtcbiAgICB9XG4gIH1cblxuICBtYXJrQXNJbnZhbGlkKGtleTogc3RyaW5nLCB2YWxpZGF0aW9uTWVzc2FnZT86IHN0cmluZywgb3RoZXJGb3JtPzogTm92b0Zvcm1Hcm91cCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmdldENvbnRyb2woa2V5LCBvdGhlckZvcm0pO1xuICAgIGlmIChjb250cm9sKSB7XG4gICAgICBpZiAoY29udHJvbCAmJiAhY29udHJvbC5yZXN0cmljdEZpZWxkSW50ZXJhY3Rpb25zKSB7XG4gICAgICAgIGNvbnRyb2wubWFya0FzSW52YWxpZCh2YWxpZGF0aW9uTWVzc2FnZSk7XG4gICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KHsgY29udHJvbEtleToga2V5LCBwcm9wOiAnZXJyb3JzJywgdmFsdWU6IHZhbGlkYXRpb25NZXNzYWdlIH0sIG90aGVyRm9ybSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbWFya0FzVmFsaWQoa2V5OiBzdHJpbmcsIG90aGVyRm9ybT86IE5vdm9Gb3JtR3JvdXApOiB2b2lkIHtcbiAgICBjb25zdCBjb250cm9sID0gdGhpcy5nZXRDb250cm9sKGtleSwgb3RoZXJGb3JtKTtcbiAgICBpZiAoY29udHJvbCkge1xuICAgICAgaWYgKGNvbnRyb2wgJiYgIWNvbnRyb2wucmVzdHJpY3RGaWVsZEludGVyYWN0aW9ucykge1xuICAgICAgICBjb250cm9sLm1hcmtBc1ZhbGlkKCk7XG4gICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KHsgY29udHJvbEtleToga2V5LCBwcm9wOiAnZXJyb3JzJywgdmFsdWU6IG51bGwgfSwgb3RoZXJGb3JtKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtYXJrQXNEaXJ0eShcbiAgICBrZXk6IHN0cmluZyxcbiAgICBvcHRpb25zPzoge1xuICAgICAgb25seVNlbGY/OiBib29sZWFuO1xuICAgIH0sXG4gICAgb3RoZXJGb3JtPzogTm92b0Zvcm1Hcm91cCxcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgY29udHJvbCA9IHRoaXMuZ2V0Q29udHJvbChrZXksIG90aGVyRm9ybSk7XG4gICAgaWYgKGNvbnRyb2wgJiYgIWNvbnRyb2wucmVzdHJpY3RGaWVsZEludGVyYWN0aW9ucykge1xuICAgICAgY29udHJvbC5tYXJrQXNEaXJ0eShvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICBtYXJrQXNQZW5kaW5nKFxuICAgIGtleTogc3RyaW5nLFxuICAgIG9wdGlvbnM/OiB7XG4gICAgICBvbmx5U2VsZj86IGJvb2xlYW47XG4gICAgfSxcbiAgICBvdGhlckZvcm0/OiBOb3ZvRm9ybUdyb3VwLFxuICApOiB2b2lkIHtcbiAgICBjb25zdCBjb250cm9sID0gdGhpcy5nZXRDb250cm9sKGtleSwgb3RoZXJGb3JtKTtcbiAgICBpZiAoY29udHJvbCAmJiAhY29udHJvbC5yZXN0cmljdEZpZWxkSW50ZXJhY3Rpb25zKSB7XG4gICAgICBjb250cm9sLm1hcmtBc1BlbmRpbmcob3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgbWFya0FzUHJpc3RpbmUoXG4gICAga2V5OiBzdHJpbmcsXG4gICAgb3B0aW9ucz86IHtcbiAgICAgIG9ubHlTZWxmPzogYm9vbGVhbjtcbiAgICB9LFxuICAgIG90aGVyRm9ybT86IE5vdm9Gb3JtR3JvdXAsXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmdldENvbnRyb2woa2V5LCBvdGhlckZvcm0pO1xuICAgIGlmIChjb250cm9sICYmICFjb250cm9sLnJlc3RyaWN0RmllbGRJbnRlcmFjdGlvbnMpIHtcbiAgICAgIGNvbnRyb2wubWFya0FzUHJpc3RpbmUob3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgbWFya0FzVG91Y2hlZChcbiAgICBrZXk6IHN0cmluZyxcbiAgICBvcHRpb25zPzoge1xuICAgICAgb25seVNlbGY/OiBib29sZWFuO1xuICAgIH0sXG4gICAgb3RoZXJGb3JtPzogTm92b0Zvcm1Hcm91cCxcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgY29udHJvbCA9IHRoaXMuZ2V0Q29udHJvbChrZXksIG90aGVyRm9ybSk7XG4gICAgaWYgKGNvbnRyb2wgJiYgIWNvbnRyb2wucmVzdHJpY3RGaWVsZEludGVyYWN0aW9ucykge1xuICAgICAgY29udHJvbC5tYXJrQXNUb3VjaGVkKG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIG1hcmtBc1VudG91Y2hlZChcbiAgICBrZXk6IHN0cmluZyxcbiAgICBvcHRpb25zPzoge1xuICAgICAgb25seVNlbGY/OiBib29sZWFuO1xuICAgIH0sXG4gICAgb3RoZXJGb3JtPzogTm92b0Zvcm1Hcm91cCxcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgY29udHJvbCA9IHRoaXMuZ2V0Q29udHJvbChrZXksIG90aGVyRm9ybSk7XG4gICAgaWYgKGNvbnRyb2wgJiYgIWNvbnRyb2wucmVzdHJpY3RGaWVsZEludGVyYWN0aW9ucykge1xuICAgICAgY29udHJvbC5tYXJrQXNVbnRvdWNoZWQob3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlVmFsdWVBbmRWYWxpZGl0eShcbiAgICBrZXk6IHN0cmluZyxcbiAgICBvcHRpb25zPzoge1xuICAgICAgb25seVNlbGY/OiBib29sZWFuO1xuICAgICAgZW1pdEV2ZW50PzogYm9vbGVhbjtcbiAgICB9LFxuICAgIG90aGVyRm9ybT86IE5vdm9Gb3JtR3JvdXAsXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmdldENvbnRyb2woa2V5LCBvdGhlckZvcm0pO1xuICAgIGlmIChjb250cm9sICYmICFjb250cm9sLnJlc3RyaWN0RmllbGRJbnRlcmFjdGlvbnMpIHtcbiAgICAgIGNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eShvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICBkaXNwbGF5VG9hc3QodG9hc3RDb25maWc6IFRvYXN0T3B0aW9ucyk6IHZvaWQge1xuICAgIGlmICh0aGlzLnRvYXN0ZXIpIHtcbiAgICAgIHRoaXMudG9hc3Rlci5hbGVydCh0b2FzdENvbmZpZyk7XG4gICAgfVxuICB9XG5cbiAgZGlzcGxheVRpcChrZXk6IHN0cmluZywgdGlwOiBzdHJpbmcsIGljb24/OiBzdHJpbmcsIGFsbG93RGlzbWlzcz86IGJvb2xlYW4sIHNhbml0aXplPzogYm9vbGVhbiwgb3RoZXJGb3JtPzogTm92b0Zvcm1Hcm91cCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmdldENvbnRyb2woa2V5LCBvdGhlckZvcm0pO1xuICAgIGlmIChjb250cm9sICYmICFjb250cm9sLnJlc3RyaWN0RmllbGRJbnRlcmFjdGlvbnMpIHtcbiAgICAgIGNvbnRyb2wudGlwV2VsbCA9IHtcbiAgICAgICAgdGlwLFxuICAgICAgICBpY29uLFxuICAgICAgICBidXR0b246IGFsbG93RGlzbWlzcyxcbiAgICAgICAgc2FuaXRpemU6IHNhbml0aXplICE9PSBmYWxzZSwgLy8gZGVmYXVsdHMgdG8gdHJ1ZSB3aGVuIHVuZGVmaW5lZFxuICAgICAgfTtcbiAgICAgIHRoaXMudHJpZ2dlckV2ZW50KHsgY29udHJvbEtleToga2V5LCBwcm9wOiAndGlwV2VsbCcsIHZhbHVlOiB0aXAgfSwgb3RoZXJGb3JtKTtcbiAgICB9XG4gIH1cblxuICBjbGVhclRpcChrZXk6IHN0cmluZywgb3RoZXJGb3JtPzogTm92b0Zvcm1Hcm91cCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmdldENvbnRyb2woa2V5LCBvdGhlckZvcm0pO1xuICAgIGlmIChjb250cm9sICYmICFjb250cm9sLnJlc3RyaWN0RmllbGRJbnRlcmFjdGlvbnMpIHtcbiAgICAgIGNvbnRyb2wudGlwV2VsbCA9IG51bGw7XG4gICAgICB0aGlzLnRyaWdnZXJFdmVudCh7IGNvbnRyb2xLZXk6IGtleSwgcHJvcDogJ3RpcFdlbGwnLCB2YWx1ZTogbnVsbCB9LCBvdGhlckZvcm0pO1xuICAgIH1cbiAgfVxuXG4gIHNldFRvb2x0aXAoa2V5OiBzdHJpbmcsIHRvb2x0aXA6IHN0cmluZywgb3RoZXJGb3JtPzogTm92b0Zvcm1Hcm91cCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmdldENvbnRyb2woa2V5LCBvdGhlckZvcm0pO1xuICAgIGlmIChjb250cm9sICYmICFjb250cm9sLnJlc3RyaWN0RmllbGRJbnRlcmFjdGlvbnMpIHtcbiAgICAgIGNvbnRyb2wudG9vbHRpcCA9IHRvb2x0aXA7XG4gICAgICBpZiAodG9vbHRpcC5sZW5ndGggPj0gNDAgJiYgdG9vbHRpcC5sZW5ndGggPD0gNDAwKSB7XG4gICAgICAgIGNvbnRyb2wudG9vbHRpcFNpemUgPSAnbGFyZ2UnO1xuICAgICAgICBjb250cm9sLnRvb2x0aXBQcmVsaW5lID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAodG9vbHRpcC5sZW5ndGggPiA0MDApIHtcbiAgICAgICAgY29udHJvbC50b29sdGlwU2l6ZSA9ICdleHRyYS1sYXJnZSc7XG4gICAgICB9XG4gICAgICB0aGlzLnRyaWdnZXJFdmVudCh7IGNvbnRyb2xLZXk6IGtleSwgcHJvcDogJ3Rvb2x0aXAnLCB2YWx1ZTogdG9vbHRpcCB9LCBvdGhlckZvcm0pO1xuICAgIH1cbiAgfVxuXG4gIHNldFBvcE92ZXIoa2V5OiBzdHJpbmcsIHBvcG92ZXI6IHtcbiAgICB0aXRsZT86IHN0cmluZyxcbiAgICBjb250ZW50Pzogc3RyaW5nLFxuICAgIGh0bWxDb250ZW50Pzogc3RyaW5nLFxuICAgIHBsYWNlbWVudD86ICdsZWZ0JyB8ICdyaWdodCcgfCAndG9wJyB8ICdib3R0b20nLFxuICAgIG9uSG92ZXI/OiBib29sZWFuLFxuICAgIGFsd2F5cz86IGJvb2xlYW4sXG4gICAgZGlzYWJsZWQ/OiBib29sZWFuLFxuICAgIGFuaW1hdGlvbj86IGJvb2xlYW4sXG4gICAgZGlzbWlzc1RpbWVvdXQ/OiBudW1iZXIsXG4gIH0sIG90aGVyRm9ybT86IE5vdm9Gb3JtR3JvdXApOiB2b2lkIHtcbiAgICBjb25zdCBjb250cm9sID0gdGhpcy5nZXRDb250cm9sKGtleSwgb3RoZXJGb3JtKTtcbiAgICBpZiAoY29udHJvbCAmJiAhY29udHJvbC5yZXN0cmljdEZpZWxkSW50ZXJhY3Rpb25zKSB7XG4gICAgICBjb250cm9sLnBvcG92ZXJUaXRsZSA9IHBvcG92ZXIudGl0bGU7XG4gICAgICBjb250cm9sLnBvcG92ZXJDb250ZW50ID0gcG9wb3Zlci5jb250ZW50O1xuICAgICAgY29udHJvbC5wb3BvdmVySHRtbENvbnRlbnQgPSBwb3BvdmVyLmh0bWxDb250ZW50O1xuICAgICAgY29udHJvbC5wb3BvdmVyUGxhY2VtZW50ID0gcG9wb3Zlci5wbGFjZW1lbnQ7XG4gICAgICBjb250cm9sLnBvcG92ZXJPbkhvdmVyID0gcG9wb3Zlci5vbkhvdmVyO1xuICAgICAgY29udHJvbC5wb3BvdmVyQWx3YXlzID0gcG9wb3Zlci5hbHdheXM7XG4gICAgICBjb250cm9sLnBvcG92ZXJEaXNhYmxlZCA9IHBvcG92ZXIuZGlzYWJsZWQ7XG4gICAgICBjb250cm9sLnBvcG92ZXJBbmltYXRpb24gPSBwb3BvdmVyLmFuaW1hdGlvbjtcbiAgICAgIGNvbnRyb2wucG9wb3ZlckRpc21pc3NUaW1lb3V0ID0gcG9wb3Zlci5kaXNtaXNzVGltZW91dDtcbiAgICAgIHRoaXMudHJpZ2dlckV2ZW50KHsgY29udHJvbEtleToga2V5LCBwcm9wOiAncG9wb3ZlcicsIHZhbHVlOiBwb3BvdmVyIH0sIG90aGVyRm9ybSk7XG4gICAgfVxuICB9XG5cbiAgY29uZmlybUNoYW5nZXMoa2V5OiBzdHJpbmcsIG1lc3NhZ2U/OiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBoaXN0b3J5ID0gdGhpcy5nZXRQcm9wZXJ0eShrZXksICd2YWx1ZUhpc3RvcnknKTtcbiAgICBjb25zdCBvbGRWYWx1ZSA9IGhpc3RvcnlbaGlzdG9yeS5sZW5ndGggLSAyXTtcbiAgICBjb25zdCBuZXdWYWx1ZSA9IHRoaXMuZ2V0VmFsdWUoa2V5KTtcbiAgICBjb25zdCBsYWJlbCA9IHRoaXMuZ2V0UHJvcGVydHkoa2V5LCAnbGFiZWwnKTtcbiAgICAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBhcyBhbnkpLmJsdXIoKTtcbiAgICByZXR1cm4gdGhpcy5tb2RhbFNlcnZpY2Uub3BlbihDb250cm9sQ29uZmlybU1vZGFsLCB7IG9sZFZhbHVlLCBuZXdWYWx1ZSwgbGFiZWwsIG1lc3NhZ2UsIGtleSB9KS5vbkNsb3NlZC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgIHRoaXMuc2V0VmFsdWUoa2V5LCBvbGRWYWx1ZSwgeyBlbWl0RXZlbnQ6IGZhbHNlIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG4gIH1cblxuICBwcm9tcHRVc2VyKGtleTogc3RyaW5nLCBjaGFuZ2VzOiBzdHJpbmdbXSk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIChkb2N1bWVudC5hY3RpdmVFbGVtZW50IGFzIGFueSkuYmx1cigpO1xuICAgIHJldHVybiB0aGlzLm1vZGFsU2VydmljZS5vcGVuKENvbnRyb2xQcm9tcHRNb2RhbCwgeyBjaGFuZ2VzLCBrZXkgfSkub25DbG9zZWQ7XG4gIH1cblxuICBzZXRQcm9wZXJ0eShrZXk6IHN0cmluZywgcHJvcDogc3RyaW5nLCB2YWx1ZSwgb3RoZXJGb3JtPzogTm92b0Zvcm1Hcm91cCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmdldENvbnRyb2woa2V5LCBvdGhlckZvcm0pO1xuICAgIGlmIChjb250cm9sICYmICFjb250cm9sLnJlc3RyaWN0RmllbGRJbnRlcmFjdGlvbnMpIHtcbiAgICAgIGNvbnRyb2xbcHJvcF0gPSB2YWx1ZTtcbiAgICAgIHRoaXMudHJpZ2dlckV2ZW50KHsgY29udHJvbEtleToga2V5LCBwcm9wLCB2YWx1ZSB9LCBvdGhlckZvcm0pO1xuICAgIH1cbiAgfVxuXG4gIGdldFByb3BlcnR5KGtleTogc3RyaW5nLCBwcm9wOiBzdHJpbmcsIG90aGVyRm9ybT86IE5vdm9Gb3JtR3JvdXApIHtcbiAgICBjb25zdCBjb250cm9sID0gdGhpcy5nZXRDb250cm9sKGtleSwgb3RoZXJGb3JtKTtcbiAgICBpZiAoY29udHJvbCAmJiAhY29udHJvbC5yZXN0cmljdEZpZWxkSW50ZXJhY3Rpb25zKSB7XG4gICAgICByZXR1cm4gY29udHJvbFtwcm9wXTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpc1ZhbHVlRW1wdHkoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0VmFsdWUoa2V5KTtcbiAgICByZXR1cm4gSGVscGVycy5pc0VtcHR5KHZhbHVlKTtcbiAgfVxuXG4gIGlzVmFsdWVCbGFuayhrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRWYWx1ZShrZXkpO1xuICAgIHJldHVybiBIZWxwZXJzLmlzQmxhbmsodmFsdWUpO1xuICB9XG5cbiAgaGFzRmllbGQoa2V5OiBzdHJpbmcsIG90aGVyRm9ybT86IE5vdm9Gb3JtR3JvdXApOiBib29sZWFuIHtcbiAgICBjb25zdCBmb3JtID0gb3RoZXJGb3JtIHx8IHRoaXMuZm9ybTtcbiAgICByZXR1cm4gISFmb3JtLmNvbnRyb2xzW2tleV07XG4gIH1cblxuICBhZGRTdGF0aWNPcHRpb24oa2V5OiBzdHJpbmcsIG5ld09wdGlvbjogYW55LCBvdGhlckZvcm0/OiBOb3ZvRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgY29uc3QgY29udHJvbCA9IHRoaXMuZ2V0Q29udHJvbChrZXksIG90aGVyRm9ybSk7XG4gICAgbGV0IG9wdGlvblRvQWRkID0gbmV3T3B0aW9uO1xuICAgIGxldCBpc1VuaXF1ZSA9IHRydWU7XG4gICAgaWYgKGNvbnRyb2wgJiYgIWNvbnRyb2wucmVzdHJpY3RGaWVsZEludGVyYWN0aW9ucykge1xuICAgICAgbGV0IGN1cnJlbnRPcHRpb25zID0gdGhpcy5nZXRQcm9wZXJ0eShrZXksICdvcHRpb25zJyk7XG4gICAgICBpZiAoIWN1cnJlbnRPcHRpb25zIHx8ICFjdXJyZW50T3B0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgY29uZmlnID0gdGhpcy5nZXRQcm9wZXJ0eShrZXksICdjb25maWcnKTtcbiAgICAgICAgaWYgKGNvbmZpZykge1xuICAgICAgICAgIGN1cnJlbnRPcHRpb25zID0gY29uZmlnLm9wdGlvbnM7XG4gICAgICAgICAgaWYgKGN1cnJlbnRPcHRpb25zICYmIEFycmF5LmlzQXJyYXkoY3VycmVudE9wdGlvbnMpKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudE9wdGlvbnNbMF0udmFsdWUgJiYgIW9wdGlvblRvQWRkLnZhbHVlKSB7XG4gICAgICAgICAgICAgIG9wdGlvblRvQWRkID0geyB2YWx1ZTogbmV3T3B0aW9uLCBsYWJlbDogbmV3T3B0aW9uIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25maWcub3B0aW9ucyA9IFsuLi5jdXJyZW50T3B0aW9ucywgb3B0aW9uVG9BZGRdO1xuICAgICAgICAgICAgdGhpcy5zZXRQcm9wZXJ0eShrZXksICdjb25maWcnLCBjb25maWcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGN1cnJlbnRPcHRpb25zWzBdLnZhbHVlICYmICFvcHRpb25Ub0FkZC52YWx1ZSkge1xuICAgICAgICAgIG9wdGlvblRvQWRkID0geyB2YWx1ZTogbmV3T3B0aW9uLCBsYWJlbDogbmV3T3B0aW9uIH07XG4gICAgICAgIH1cbiAgICAgICAgLy8gRW5zdXJlIGR1cGxpY2F0ZSB2YWx1ZXMgYXJlIG5vdCBhZGRlZFxuICAgICAgICBjdXJyZW50T3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgICBpZiAoKG9wdGlvbi52YWx1ZSAmJiBvcHRpb24udmFsdWUgPT09IG9wdGlvblRvQWRkLnZhbHVlKSB8fCBvcHRpb24gPT09IG9wdGlvblRvQWRkKSB7XG4gICAgICAgICAgICBpc1VuaXF1ZSA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChpc1VuaXF1ZSkge1xuICAgICAgICAgIHRoaXMuc2V0UHJvcGVydHkoa2V5LCAnb3B0aW9ucycsIFsuLi5jdXJyZW50T3B0aW9ucywgb3B0aW9uVG9BZGRdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGlzVW5pcXVlKSB7XG4gICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KHsgY29udHJvbEtleToga2V5LCBwcm9wOiAnb3B0aW9ucycsIHZhbHVlOiBbLi4uY3VycmVudE9wdGlvbnMsIG9wdGlvblRvQWRkXSB9LCBvdGhlckZvcm0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZVN0YXRpY09wdGlvbihrZXk6IHN0cmluZywgb3B0aW9uVG9SZW1vdmU6IGFueSwgb3RoZXJGb3JtPzogTm92b0Zvcm1Hcm91cCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmdldENvbnRyb2woa2V5LCBvdGhlckZvcm0pO1xuICAgIGlmIChjb250cm9sICYmICFjb250cm9sLnJlc3RyaWN0RmllbGRJbnRlcmFjdGlvbnMpIHtcbiAgICAgIGxldCBjdXJyZW50T3B0aW9ucyA9IHRoaXMuZ2V0UHJvcGVydHkoa2V5LCAnb3B0aW9ucycsIG90aGVyRm9ybSk7XG4gICAgICBpZiAoIWN1cnJlbnRPcHRpb25zIHx8ICFjdXJyZW50T3B0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgY29uZmlnID0gdGhpcy5nZXRQcm9wZXJ0eShrZXksICdjb25maWcnLCBvdGhlckZvcm0pO1xuICAgICAgICBpZiAoY29uZmlnKSB7XG4gICAgICAgICAgY3VycmVudE9wdGlvbnMgPSBjb25maWcub3B0aW9ucztcbiAgICAgICAgICBpZiAoY3VycmVudE9wdGlvbnMgJiYgQXJyYXkuaXNBcnJheShjdXJyZW50T3B0aW9ucykpIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IC0xO1xuICAgICAgICAgICAgY3VycmVudE9wdGlvbnMuZm9yRWFjaCgob3B0LCBpKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChvcHQudmFsdWUgfHwgb3B0LmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdC52YWx1ZSA9PT0gb3B0aW9uVG9SZW1vdmUgfHwgb3B0LmxhYmVsID09PSBvcHRpb25Ub1JlbW92ZSkge1xuICAgICAgICAgICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAob3B0ID09PSBvcHRpb25Ub1JlbW92ZSkge1xuICAgICAgICAgICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgIGN1cnJlbnRPcHRpb25zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25maWcub3B0aW9ucyA9IFsuLi5jdXJyZW50T3B0aW9uc107XG4gICAgICAgICAgICB0aGlzLnNldFByb3BlcnR5KGtleSwgJ2NvbmZpZycsIGNvbmZpZywgb3RoZXJGb3JtKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBpbmRleCA9IC0xO1xuICAgICAgICBjdXJyZW50T3B0aW9ucy5mb3JFYWNoKChvcHQsIGkpID0+IHtcbiAgICAgICAgICBpZiAob3B0LnZhbHVlIHx8IG9wdC5sYWJlbCkge1xuICAgICAgICAgICAgaWYgKG9wdC52YWx1ZSA9PT0gb3B0aW9uVG9SZW1vdmUgfHwgb3B0LmxhYmVsID09PSBvcHRpb25Ub1JlbW92ZSkge1xuICAgICAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChvcHQgPT09IG9wdGlvblRvUmVtb3ZlKSB7XG4gICAgICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgY3VycmVudE9wdGlvbnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFByb3BlcnR5KGtleSwgJ29wdGlvbnMnLCBbLi4uY3VycmVudE9wdGlvbnNdLCBvdGhlckZvcm0pO1xuICAgICAgfVxuICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoeyBjb250cm9sS2V5OiBrZXksIHByb3A6ICdvcHRpb25zJywgdmFsdWU6IGNvbnRyb2wub3B0aW9ucyB9LCBvdGhlckZvcm0pO1xuICAgIH1cbiAgfVxuXG4gIG1vZGlmeVBpY2tlckNvbmZpZyhcbiAgICBrZXk6IHN0cmluZyxcbiAgICBjb25maWc6IHtcbiAgICAgIGZvcm1hdD86IHN0cmluZztcbiAgICAgIG9wdGlvbnNVcmw/OiBzdHJpbmc7XG4gICAgICBvcHRpb25zVXJsQnVpbGRlcj86IEZ1bmN0aW9uO1xuICAgICAgb3B0aW9uc1Byb21pc2U/O1xuICAgICAgb3B0aW9ucz86IGFueVtdO1xuICAgICAgcmVzdWx0c1RlbXBsYXRlVHlwZT86IFJlc3VsdHNUZW1wbGF0ZVR5cGU7XG4gICAgfSxcbiAgICBtYXBwZXI/LFxuICApOiB2b2lkIHtcbiAgICAvLyBjYWxsIGFub3RoZXIgbWV0aG9kIHRvIGF2b2lkIGEgYnJlYWtpbmcgY2hhbmdlIGJ1dCBzdGlsbCBlbmFibGUgc3RyaWN0ZXIgdHlwZXNcbiAgICB0aGlzLm11dGF0ZVBpY2tlckNvbmZpZyhrZXksIGNvbmZpZyBhcyBNb2RpZnlQaWNrZXJDb25maWdBcmdzLCBtYXBwZXIpO1xuICB9XG5cbiAgbXV0YXRlUGlja2VyQ29uZmlnKGtleTogc3RyaW5nLCBhcmdzOiBNb2RpZnlQaWNrZXJDb25maWdBcmdzLCBtYXBwZXI/OiAoaXRlbTogdW5rbm93bikgPT4gdW5rbm93biwgb3RoZXJGb3JtPzogTm92b0Zvcm1Hcm91cCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmdldENvbnRyb2woa2V5LCBvdGhlckZvcm0pO1xuICAgIGlmIChjb250cm9sICYmICFjb250cm9sLnJlc3RyaWN0RmllbGRJbnRlcmFjdGlvbnMpIHtcbiAgICAgIGNvbnN0IHsgbWluU2VhcmNoTGVuZ3RoLCBlbmFibGVJbmZpbml0ZVNjcm9sbCwgZmlsdGVyZWRPcHRpb25zQ3JlYXRvciwgZm9ybWF0LCBnZXRMYWJlbHMsIGVtcHR5UGlja2VyTWVzc2FnZSB9ID0gY29udHJvbC5jb25maWc7XG4gICAgICBjb25zdCBvcHRpb25zQ29uZmlnID0gdGhpcy5nZXRPcHRpb25zQ29uZmlnKGFyZ3MsIG1hcHBlciwgZmlsdGVyZWRPcHRpb25zQ3JlYXRvciwgZm9ybWF0KTtcblxuICAgICAgY29uc3QgbmV3Q29uZmlnOiBOb3ZvQ29udHJvbENvbmZpZ1snY29uZmlnJ10gPSB7XG4gICAgICAgIC4uLihlbXB0eVBpY2tlck1lc3NhZ2UgJiYgeyBlbXB0eVBpY2tlck1lc3NhZ2UgfSksXG4gICAgICAgIC4uLihOdW1iZXIuaXNJbnRlZ2VyKG1pblNlYXJjaExlbmd0aCkgJiYgeyBtaW5TZWFyY2hMZW5ndGggfSksXG4gICAgICAgIC4uLihlbmFibGVJbmZpbml0ZVNjcm9sbCAmJiB7IGVuYWJsZUluZmluaXRlU2Nyb2xsIH0pLFxuICAgICAgICAuLi4oZmlsdGVyZWRPcHRpb25zQ3JlYXRvciAmJiB7IGZpbHRlcmVkT3B0aW9uc0NyZWF0b3IgfSksXG4gICAgICAgIC4uLihnZXRMYWJlbHMgJiYgeyBnZXRMYWJlbHMgfSksXG4gICAgICAgIC4uLihvcHRpb25zQ29uZmlnICYmIG9wdGlvbnNDb25maWcpLFxuICAgICAgICByZXN1bHRzVGVtcGxhdGU6XG4gICAgICAgICAgY29udHJvbC5jb25maWcucmVzdWx0c1RlbXBsYXRlIHx8ICgncmVzdWx0c1RlbXBsYXRlVHlwZScgaW4gYXJncyAmJiB0aGlzLmdldEFwcHJvcHJpYXRlUmVzdWx0c1RlbXBsYXRlKGFyZ3MucmVzdWx0c1RlbXBsYXRlVHlwZSkpLFxuICAgICAgfTtcblxuICAgICAgdGhpcy5zZXRQcm9wZXJ0eShrZXksICdjb25maWcnLCBuZXdDb25maWcpO1xuICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoeyBjb250cm9sS2V5OiBrZXksIHByb3A6ICdwaWNrZXJDb25maWcnLCB2YWx1ZTogYXJncyB9LCBvdGhlckZvcm0pO1xuICAgIH1cbiAgfVxuXG4gIGFkZFByb3BlcnRpZXNUb1BpY2tlckNvbmZpZyhrZXk6IHN0cmluZywgcHJvcGVydGllczogeyBba2V5OiBzdHJpbmddOiB1bmtub3duIH0sIG90aGVyRm9ybT86IE5vdm9Gb3JtR3JvdXApIHtcbiAgICBjb25zdCBjb250cm9sID0gdGhpcy5nZXRDb250cm9sKGtleSwgb3RoZXJGb3JtKTtcbiAgICBpZiAoIWNvbnRyb2wgfHwgY29udHJvbC5yZXN0cmljdEZpZWxkSW50ZXJhY3Rpb25zKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgLi4uY29udHJvbC5jb25maWcsXG4gICAgICAuLi5wcm9wZXJ0aWVzLFxuICAgIH07XG5cbiAgICB0aGlzLnNldFByb3BlcnR5KGtleSwgJ2NvbmZpZycsIGNvbmZpZyk7XG4gICAgdGhpcy50cmlnZ2VyRXZlbnQoeyBjb250cm9sS2V5OiBrZXksIHByb3A6ICdwaWNrZXJDb25maWcnLCB2YWx1ZTogcHJvcGVydGllcyB9LCBvdGhlckZvcm0pO1xuICB9XG4gIGdldE9wdGlvbnNDb25maWcgPSAoXG4gICAgYXJnczogTW9kaWZ5UGlja2VyQ29uZmlnQXJncyxcbiAgICBtYXBwZXI/OiAoaXRlbTogdW5rbm93bikgPT4gdW5rbm93bixcbiAgICBmaWx0ZXJlZE9wdGlvbnNDcmVhdG9yPzogKHdoZXJlOiBzdHJpbmcpID0+IChxdWVyeTogc3RyaW5nKSA9PiBQcm9taXNlPHVua25vd25bXT4sXG4gICAgcGlja2VyQ29uZmlnRm9ybWF0Pzogc3RyaW5nLFxuICApOiB1bmRlZmluZWQgfCB7IG9wdGlvbnM6IHVua25vd25bXSB9IHwgeyBvcHRpb25zOiBPcHRpb25zRnVuY3Rpb247IGZvcm1hdD86IHN0cmluZyB9ID0+IHtcbiAgICBpZiAoZmlsdGVyZWRPcHRpb25zQ3JlYXRvciB8fCAnb3B0aW9uc1VybCcgaW4gYXJncyB8fCAnb3B0aW9uc1VybEJ1aWxkZXInIGluIGFyZ3MgfHwgJ29wdGlvbnNQcm9taXNlJyBpbiBhcmdzKSB7XG4gICAgICBjb25zdCBmb3JtYXQgPSAoJ2Zvcm1hdCcgaW4gYXJncyAmJiBhcmdzLmZvcm1hdCkgfHwgcGlja2VyQ29uZmlnRm9ybWF0O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgb3B0aW9uczogdGhpcy5jcmVhdGVPcHRpb25zRnVuY3Rpb24oYXJncywgbWFwcGVyLCBmaWx0ZXJlZE9wdGlvbnNDcmVhdG9yKSxcbiAgICAgICAgLi4uKCdlbXB0eVBpY2tlck1lc3NhZ2UnIGluIGFyZ3MgJiYgeyBlbXB0eVBpY2tlck1lc3NhZ2U6IGFyZ3MuZW1wdHlQaWNrZXJNZXNzYWdlIH0pLFxuICAgICAgICAuLi4oZm9ybWF0ICYmIHsgZm9ybWF0IH0pLFxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKCdvcHRpb25zJyBpbiBhcmdzICYmIEFycmF5LmlzQXJyYXkoYXJncy5vcHRpb25zKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgb3B0aW9uczogWy4uLmFyZ3Mub3B0aW9uc10sXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgfTtcblxuICBwcml2YXRlIGdldEFwcHJvcHJpYXRlUmVzdWx0c1RlbXBsYXRlKHJlc3VsdHNUZW1wbGF0ZVR5cGU6IFJlc3VsdHNUZW1wbGF0ZVR5cGUpIHtcbiAgICBzd2l0Y2ggKHJlc3VsdHNUZW1wbGF0ZVR5cGUpIHtcbiAgICAgIGNhc2UgJ2VudGl0eS1waWNrZXInOlxuICAgICAgICByZXR1cm4gRW50aXR5UGlja2VyUmVzdWx0cztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlT3B0aW9uc0Z1bmN0aW9uID1cbiAgICAoXG4gICAgICBjb25maWc6IE1vZGlmeVBpY2tlckNvbmZpZ0FyZ3MsXG4gICAgICBtYXBwZXI/OiAoaXRlbTogdW5rbm93bikgPT4gdW5rbm93bixcbiAgICAgIGZpbHRlcmVkT3B0aW9uc0NyZWF0b3I/OiAod2hlcmU/OiBzdHJpbmcpID0+IChxdWVyeTogc3RyaW5nLCBwYWdlPzogbnVtYmVyKSA9PiBQcm9taXNlPHVua25vd25bXT4sXG4gICAgKTogKChxdWVyeTogc3RyaW5nKSA9PiBQcm9taXNlPHVua25vd25bXT4pID0+XG4gICAgKHF1ZXJ5OiBzdHJpbmcsIHBhZ2U/OiBudW1iZXIpID0+IHtcbiAgICAgIGlmICgnb3B0aW9uc1Byb21pc2UnIGluIGNvbmZpZyAmJiBjb25maWcub3B0aW9uc1Byb21pc2UpIHtcbiAgICAgICAgcmV0dXJuIGNvbmZpZy5vcHRpb25zUHJvbWlzZShxdWVyeSwgbmV3IEN1c3RvbUh0dHBJbXBsKHRoaXMuaHR0cCksIHBhZ2UpO1xuICAgICAgfSBlbHNlIGlmICgoJ29wdGlvbnNVcmxCdWlsZGVyJyBpbiBjb25maWcgJiYgY29uZmlnLm9wdGlvbnNVcmxCdWlsZGVyKSB8fCAoJ29wdGlvbnNVcmwnIGluIGNvbmZpZyAmJiBjb25maWcub3B0aW9uc1VybCkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBjb25zdCB1cmwgPSAnb3B0aW9uc1VybEJ1aWxkZXInIGluIGNvbmZpZyA/IGNvbmZpZy5vcHRpb25zVXJsQnVpbGRlcihxdWVyeSkgOiBgJHtjb25maWcub3B0aW9uc1VybH0/ZmlsdGVyPSR7cXVlcnkgfHwgJyd9YDtcbiAgICAgICAgICB0aGlzLmh0dHBcbiAgICAgICAgICAgIC5nZXQodXJsKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcCgocmVzdWx0czogdW5rbm93bltdKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG1hcHBlcikge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHMubWFwKG1hcHBlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKGZpbHRlcmVkT3B0aW9uc0NyZWF0b3IpIHtcbiAgICAgICAgaWYgKCd3aGVyZScgaW4gY29uZmlnKSB7XG4gICAgICAgICAgcmV0dXJuIGZpbHRlcmVkT3B0aW9uc0NyZWF0b3IoY29uZmlnLndoZXJlKShxdWVyeSwgcGFnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZpbHRlcmVkT3B0aW9uc0NyZWF0b3IoKShxdWVyeSwgcGFnZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gIHNldExvYWRpbmcoa2V5OiBzdHJpbmcsIGxvYWRpbmc6IGJvb2xlYW4sIG90aGVyRm9ybT86IE5vdm9Gb3JtR3JvdXApIHtcbiAgICBjb25zdCBmb3JtID0gb3RoZXJGb3JtIHx8IHRoaXMuZm9ybTtcbiAgICBjb25zdCBjb250cm9sID0gdGhpcy5nZXRDb250cm9sKGtleSwgb3RoZXJGb3JtKTtcbiAgICBpZiAoY29udHJvbCAmJiAhY29udHJvbC5yZXN0cmljdEZpZWxkSW50ZXJhY3Rpb25zKSB7XG4gICAgICBpZiAobG9hZGluZykge1xuICAgICAgICBmb3JtLmNvbnRyb2xzW2tleV0uZmllbGRJbnRlcmFjdGlvbmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICBjb250cm9sLnNldEVycm9ycyh7IGxvYWRpbmc6IHRydWUgfSk7XG4gICAgICAgIC8vIEhpc3RvcnlcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuYXN5bmNCbG9ja1RpbWVvdXQpO1xuICAgICAgICB0aGlzLmFzeW5jQmxvY2tUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zZXRMb2FkaW5nKGtleSwgZmFsc2UpO1xuICAgICAgICAgIHRoaXMuZGlzcGxheVRpcChrZXksIHRoaXMubGFiZWxzLmFzeW5jRmFpbHVyZSwgJ2luZm8nLCBmYWxzZSk7XG4gICAgICAgICAgdGhpcy5zZXRQcm9wZXJ0eShrZXksICdfZGlzcGxheWVkQXN5bmNGYWlsdXJlJywgdHJ1ZSk7XG4gICAgICAgIH0sIDEwMDAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvcm0uY29udHJvbHNba2V5XS5maWVsZEludGVyYWN0aW9ubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5hc3luY0Jsb2NrVGltZW91dCk7XG4gICAgICAgIGNvbnRyb2wuc2V0RXJyb3JzKHsgbG9hZGluZzogbnVsbCB9KTtcbiAgICAgICAgY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcbiAgICAgICAgaWYgKHRoaXMuZ2V0UHJvcGVydHkoa2V5LCAnX2Rpc3BsYXllZEFzeW5jRmFpbHVyZScpKSB7XG4gICAgICAgICAgdGhpcy5zZXRQcm9wZXJ0eShrZXksICd0aXBXZWxsJywgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMudHJpZ2dlckV2ZW50KHsgY29udHJvbEtleToga2V5LCBwcm9wOiAnbG9hZGluZycsIHZhbHVlOiBsb2FkaW5nIH0sIG90aGVyRm9ybSk7XG4gICAgfVxuICB9XG5cbiAgYWRkQ29udHJvbChcbiAgICBrZXk6IHN0cmluZyxcbiAgICBtZXRhRm9yTmV3RmllbGQ6IHtcbiAgICAgIGtleT86IHN0cmluZztcbiAgICAgIHR5cGU/OiBzdHJpbmc7XG4gICAgICBuYW1lPzogc3RyaW5nO1xuICAgICAgbGFiZWw/OiBzdHJpbmc7XG4gICAgICBpbnRlcmFjdGlvbnM/OiBBcnJheTx7IGV2ZW50Pzogc3RyaW5nOyBpbnZva2VPbkluaXQ/OiBib29sZWFuOyBzY3JpcHQ/IH0+O1xuICAgIH0sXG4gICAgcG9zaXRpb246IHN0cmluZyA9IEZpZWxkSW50ZXJhY3Rpb25BcGkuRklFTERfUE9TSVRJT05TLkFCT1ZFX0ZJRUxELFxuICAgIGluaXRpYWxWYWx1ZT8sXG4gICAgb3RoZXJGb3JtPzogTm92b0Zvcm1Hcm91cCxcbiAgKTogdm9pZCB7XG4gICAgaWYgKCFtZXRhRm9yTmV3RmllbGQua2V5ICYmICFtZXRhRm9yTmV3RmllbGQubmFtZSkge1xuICAgICAgY29uc29sZS5lcnJvcignW0ZpZWxkSW50ZXJhY3Rpb25BUEldIC0gbWlzc2luZyBcImtleVwiIGluIG1ldGEgZm9yIG5ldyBmaWVsZCcpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoIW1ldGFGb3JOZXdGaWVsZC5rZXkpIHtcbiAgICAgIC8vIElmIGtleSBpcyBub3QgZXhwbGljaXRseSBkZWNsYXJlZCwgdXNlIG5hbWUgYXMga2V5XG4gICAgICBtZXRhRm9yTmV3RmllbGQua2V5ID0gbWV0YUZvck5ld0ZpZWxkLm5hbWU7XG4gICAgfVxuXG4gICAgY29uc3QgZm9ybSA9IG90aGVyRm9ybSB8fCB0aGlzLmZvcm07XG4gICAgaWYgKGZvcm0uY29udHJvbHNbbWV0YUZvck5ld0ZpZWxkLmtleV0pIHtcbiAgICAgIC8vIEZpZWxkIGlzIGFscmVhZHkgb24gdGhlIGZvcm1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbnRyb2wgPSBmb3JtLmNvbnRyb2xzW2tleV07XG4gICAgbGV0IGZpZWxkc2V0SW5kZXg6IG51bWJlcjtcbiAgICBsZXQgY29udHJvbEluZGV4OiBudW1iZXI7XG4gICAgaWYgKGNvbnRyb2wpIHtcbiAgICAgIGZpZWxkc2V0SW5kZXggPSAtMTtcbiAgICAgIGNvbnRyb2xJbmRleCA9IC0xO1xuXG4gICAgICBmb3JtLmZpZWxkc2V0cy5mb3JFYWNoKChmaWVsZHNldCwgZmkpID0+IHtcbiAgICAgICAgZmllbGRzZXQuY29udHJvbHMuZm9yRWFjaCgoZmllbGRzZXRDb250cm9sLCBjaSkgPT4ge1xuICAgICAgICAgIGlmIChmaWVsZHNldENvbnRyb2wua2V5ID09PSBrZXkpIHtcbiAgICAgICAgICAgIGZpZWxkc2V0SW5kZXggPSBmaTtcbiAgICAgICAgICAgIGNvbnRyb2xJbmRleCA9IGNpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gQ2hhbmdlIHRoZSBwb3NpdGlvbiBvZiB0aGUgbmV3bHkgYWRkZWQgZmllbGRcbiAgICAgIHN3aXRjaCAocG9zaXRpb24pIHtcbiAgICAgICAgY2FzZSBGaWVsZEludGVyYWN0aW9uQXBpLkZJRUxEX1BPU0lUSU9OUy5BQk9WRV9GSUVMRDpcbiAgICAgICAgICAvLyBBZGRpbmcgZmllbGQgYWJvdmUgYWN0aXZlIGZpZWxkXG4gICAgICAgICAgLy8gaW5kZXggY2FuIHN0YXkgdGhlIHNhbWVcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBGaWVsZEludGVyYWN0aW9uQXBpLkZJRUxEX1BPU0lUSU9OUy5CRUxPV19GSUVMRDpcbiAgICAgICAgICAvLyBBZGRpbmcgZmllbGQgYmVsb3cgYWN0aXZlIGZpZWxkXG4gICAgICAgICAgY29udHJvbEluZGV4ICs9IDE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgRmllbGRJbnRlcmFjdGlvbkFwaS5GSUVMRF9QT1NJVElPTlMuVE9QX09GX0ZPUk06XG4gICAgICAgICAgLy8gQWRkaW5nIGZpZWxkIHRvIHRoZSB0b3Agb2YgdGhlIGZvcm1cbiAgICAgICAgICBjb250cm9sSW5kZXggPSAwO1xuICAgICAgICAgIGZpZWxkc2V0SW5kZXggPSAwO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEZpZWxkSW50ZXJhY3Rpb25BcGkuRklFTERfUE9TSVRJT05TLkJPVFRPTV9PRl9GT1JNOlxuICAgICAgICAgIC8vIEFkZGluZyBmaWVsZCB0byB0aGUgYm90dG9tIG9mIHRoZSBmb3JtXG4gICAgICAgICAgZmllbGRzZXRJbmRleCA9IGZvcm0uZmllbGRzZXRzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgY29udHJvbEluZGV4ID0gZm9ybS5maWVsZHNldHNbZmllbGRzZXRJbmRleF0uY29udHJvbHMubGVuZ3RoO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmllbGRzZXRJbmRleCAhPT0gLTEgJiYgY29udHJvbEluZGV4ICE9PSAtMSkge1xuICAgICAgICBjb25zdCBub3ZvQ29udHJvbCA9IHRoaXMuZm9ybVV0aWxzLmdldENvbnRyb2xGb3JGaWVsZChtZXRhRm9yTmV3RmllbGQsIHRoaXMuaHR0cCwge30pO1xuICAgICAgICBub3ZvQ29udHJvbC5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgY29uc3QgZm9ybUNvbnRyb2wgPSBuZXcgTm92b0Zvcm1Db250cm9sKGluaXRpYWxWYWx1ZSwgbm92b0NvbnRyb2wpO1xuICAgICAgICBmb3JtLmFkZENvbnRyb2wobm92b0NvbnRyb2wua2V5LCBmb3JtQ29udHJvbCk7XG4gICAgICAgIGZvcm0uZmllbGRzZXRzW2ZpZWxkc2V0SW5kZXhdLmNvbnRyb2xzLnNwbGljZShjb250cm9sSW5kZXgsIDAsIG5vdm9Db250cm9sKTtcbiAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoeyBjb250cm9sS2V5OiBrZXksIHByb3A6ICdhZGRDb250cm9sJywgdmFsdWU6IGZvcm1Db250cm9sIH0sIG90aGVyRm9ybSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlQ29udHJvbChrZXk6IHN0cmluZywgb3RoZXJGb3JtPzogTm92b0Zvcm1Hcm91cCk6IHZvaWQge1xuICAgIGNvbnN0IGZvcm0gPSBvdGhlckZvcm0gfHwgdGhpcy5mb3JtO1xuICAgIGlmICghZm9ybS5jb250cm9sc1trZXldKSB7XG4gICAgICAvLyBGaWVsZCBpcyBub3Qgb24gdGhlIGZvcm1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBjb250cm9sID0gdGhpcy5nZXRDb250cm9sKGtleSwgb3RoZXJGb3JtKTtcbiAgICBpZiAoY29udHJvbCAmJiAhY29udHJvbC5yZXN0cmljdEZpZWxkSW50ZXJhY3Rpb25zKSB7XG4gICAgICBsZXQgZmllbGRzZXRJbmRleCA9IC0xO1xuICAgICAgbGV0IGNvbnRyb2xJbmRleCA9IC0xO1xuXG4gICAgICBmb3JtLmZpZWxkc2V0cy5mb3JFYWNoKChmaWVsZHNldCwgZmkpID0+IHtcbiAgICAgICAgZmllbGRzZXQuY29udHJvbHMuZm9yRWFjaCgoZmllbGRzZXRDb250cm9sLCBjaSkgPT4ge1xuICAgICAgICAgIGlmIChmaWVsZHNldENvbnRyb2wua2V5ID09PSBrZXkpIHtcbiAgICAgICAgICAgIGZpZWxkc2V0SW5kZXggPSBmaTtcbiAgICAgICAgICAgIGNvbnRyb2xJbmRleCA9IGNpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKGZpZWxkc2V0SW5kZXggIT09IC0xICYmIGNvbnRyb2xJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgZm9ybS5yZW1vdmVDb250cm9sKGtleSk7XG4gICAgICAgIGZvcm0uZmllbGRzZXRzW2ZpZWxkc2V0SW5kZXhdLmNvbnRyb2xzLnNwbGljZShjb250cm9sSW5kZXgsIDEpO1xuICAgICAgICB0aGlzLnRyaWdnZXJFdmVudCh7IGNvbnRyb2xLZXk6IGtleSwgcHJvcDogJ3JlbW92ZUNvbnRyb2wnLCB2YWx1ZToga2V5IH0sIG90aGVyRm9ybSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZGVib3VuY2UoZnVuYzogKCkgPT4gdm9pZCwgd2FpdCA9IDUwKSB7XG4gICAgbGV0IGg7XG4gICAgY2xlYXJUaW1lb3V0KGgpO1xuICAgIGggPSBzZXRUaW1lb3V0KCgpID0+IGZ1bmMoKSwgd2FpdCk7XG4gIH1cblxuICAvKipcbiAgICogQWxsb3dzIHRyYXZlcnNpbmcgbmVzdGVkIGZvcm1zIGJ5IGFjY2Vzc2luZyB0aGUgcGFyZW50IGZvcm0uXG4gICAqXG4gICAqIEBwYXJhbSBvdGhlckZvcm0gb3B0aW9uYWwgcGFyYW1ldGVyIGZvciBnZXR0aW5nIHRoZSBwYXJlbnQgb2YgYSBkaWZmZXJlbnQgZm9ybS5cbiAgICogSWYgbm90IHByb3ZpZGVkIHdpbGwgZGVmYXVsdCB0byB0aGUgcGFyZW50IG9mIHRoZSBjdXJyZW50IGZvcm0uXG4gICAqL1xuICBnZXRQYXJlbnQob3RoZXJGb3JtPzogTm92b0Zvcm1Hcm91cCkge1xuICAgIGNvbnN0IGZvcm0gPSBvdGhlckZvcm0gfHwgdGhpcy5mb3JtO1xuICAgIHJldHVybiBmb3JtLnBhcmVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgaW5kZXggaXMgYXNzaWduZWQgYXMgYSBwcm9wZXJ0eSBvbiB0aGUgZm9ybSdzIGFzc29jaWF0aW9ucyBvYmplY3Qgd2hlbiB0aGUgZm9ybSBpcyBwYXJ0IG9mIGEgTm92b0NvbnRyb2xHcm91cCBhcnJheS5cbiAgICpcbiAgICogQHBhcmFtIG90aGVyRm9ybSBvcHRpb25hbCBwYXJhbWV0ZXIgZm9yIGdldHRpbmcgdGhlIGluZGV4IG9mIGEgZGlmZmVyZW50IGZvcm0uIElmIG5vdCBwcm92aWRlZCB3aWxsIGRlZmF1bHQgdG8gdGhlIGN1cnJlbnQgZm9ybS5cbiAgICogQHJldHVybnMgdGhlIGluZGV4IGlmIGl0IGV4aXN0cyBmb3IgdGhlIGN1cnJlbnQgb3IgZm9ybSwgb3IgbnVsbCBvdGhlcndpc2UuXG4gICAqL1xuICBnZXRJbmRleChvdGhlckZvcm0/OiBOb3ZvRm9ybUdyb3VwKSB7XG4gICAgY29uc3QgZm9ybSA9IG90aGVyRm9ybSB8fCB0aGlzLmZvcm07XG4gICAgcmV0dXJuIGZvcm0uYXNzb2NpYXRpb25zICYmIGZvcm0uYXNzb2NpYXRpb25zLmhhc093blByb3BlcnR5KCdpbmRleCcpID8gZm9ybS5hc3NvY2lhdGlvbnMuaW5kZXggOiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSB0cmlnZ2VyRXZlbnQoZXZlbnQ6IElGaWVsZEludGVyYWN0aW9uRXZlbnQsIG90aGVyRm9ybT86IE5vdm9Gb3JtR3JvdXApOiB2b2lkIHtcbiAgICBjb25zdCBmb3JtID0gb3RoZXJGb3JtIHx8IHRoaXMuZm9ybTtcbiAgICBpZiAoZm9ybSAmJiBmb3JtLmZpZWxkSW50ZXJhY3Rpb25FdmVudHMpIHtcbiAgICAgIGZvcm0uZmllbGRJbnRlcmFjdGlvbkV2ZW50cy5lbWl0KGV2ZW50KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
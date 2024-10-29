// NG
import { Injectable } from '@angular/core';
// Vendor
import { startOfToday } from 'date-fns';
// App
import { AddressControl, CheckboxControl, CheckListControl, CustomControl, DateControl, DateTimeControl, EditorControl, FileControl, PickerControl, RadioControl, SelectControl, SwitchControl, TextAreaControl, TextBoxControl, TilesControl, TimeControl, TimezoneControl, } from '../FormControls';
import { NovoFormControl } from '../NovoFormControl';
import { NovoFormGroup } from '../NovoFormGroup';
import { EntityPickerResult, EntityPickerResults } from 'novo-elements/elements/picker';
import { NovoLabelService, OptionsService } from 'novo-elements/services';
import { DateUtil, Helpers } from 'novo-elements/utils';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
export class FormUtils {
    constructor(labels, optionsService) {
        this.labels = labels;
        this.optionsService = optionsService;
        this.ASSOCIATED_ENTITY_LIST = [
            'Candidate',
            'ClientContact',
            'ClientCorporation',
            'CorporationDepartment',
            'Lead',
            'Opportunity',
            'JobOrder',
            'CorporateUser',
            'Person',
            'Placement',
            'JobShift',
        ];
        this.ENTITY_PICKER_LIST = [
            'Candidate',
            'CandidateText',
            'Client',
            'ClientText',
            'ClientContact',
            'ClientContactText',
            'ClientCorporation',
            'ClientCorporationText',
            'Lead',
            'LeadText',
            'Opportunity',
            'OpportunityText',
            'JobOrder',
            'JobOrderText',
            'CorporateUser',
            'CorporateUserText',
            'Person',
            'PersonText',
            'Placement',
            'JobShift',
        ];
    }
    toFormGroup(controls) {
        const group = {};
        controls.forEach((control) => {
            const value = Helpers.isBlank(control.value) ? '' : control.value;
            group[control.key] = new NovoFormControl(value, control);
        });
        return new NovoFormGroup(group);
    }
    emptyFormGroup() {
        return new NovoFormGroup({});
    }
    addControls(formGroup, controls) {
        controls.forEach((control) => {
            const value = Helpers.isBlank(control.value) ? '' : control.value;
            const formControl = new NovoFormControl(value, control);
            formGroup.addControl(control.key, formControl);
        });
    }
    removeControls(formGroup, controls) {
        controls.forEach((control) => {
            formGroup.removeControl(control.key);
        });
    }
    toFormGroupFromFieldset(fieldsets) {
        const controls = [];
        fieldsets.forEach((fieldset) => {
            controls.push(...fieldset.controls);
        });
        return this.toFormGroup(controls);
    }
    hasAssociatedEntity(field) {
        return !!(field.associatedEntity && ~this.ASSOCIATED_ENTITY_LIST.indexOf(field.associatedEntity.entity));
    }
    determineInputType(field) {
        let type;
        const dataSpecializationTypeMap = {
            DATETIME: 'datetime',
            TIME: 'time',
            MONEY: 'currency',
            PERCENTAGE: 'percentage',
            HTML: 'editor',
            'HTML-MINIMAL': 'editor-minimal',
            YEAR: 'year',
            WORKFLOW_OPTIONS: 'select',
            SPECIALIZED_OPTIONS: 'select',
            ALL_WORKFLOW_OPTIONS: 'select',
            WorkflowOptionsLookup: 'select',
            SpecializedOptionsLookup: 'select',
            SimplifiedOptionsLookup: 'select',
            AllWorkflowOptionsLookup: 'select',
        };
        const dataTypeToTypeMap = {
            Timestamp: 'date',
            Date: 'date',
            Boolean: 'tiles',
        };
        const inputTypeToTypeMap = {
            CHECKBOX: 'radio',
            RADIO: 'radio',
            SELECT: 'select',
            TILES: 'tiles',
        };
        const inputTypeMultiToTypeMap = {
            CHECKBOX: 'checklist',
            RADIO: 'checklist',
            SELECT: 'chips',
        };
        const typeToTypeMap = {
            file: 'file',
            COMPOSITE: 'address',
        };
        const numberDataTypeToTypeMap = {
            Double: 'float',
            BigDecimal: 'float',
            Integer: 'number',
        };
        if (field.type === 'TO_MANY') {
            if (this.hasAssociatedEntity(field)) {
                if (field.multiValue === false) {
                    type = 'entitypicker';
                }
                else {
                    type = 'entitychips';
                }
            }
            else {
                if (field.multiValue === false) {
                    type = 'picker';
                }
                else {
                    type = 'chips';
                }
            }
        }
        else if (field.type === 'TO_ONE') {
            if ('SYSTEM' === field.dataSpecialization &&
                ['WorkflowOptionsLookup', 'SpecializedOptionsLookup', 'AllWorkflowOptionsLookup'].includes(field.dataType)) {
                type = dataSpecializationTypeMap[field.dataType];
            }
            else if (['WORKFLOW_OPTIONS', 'SPECIALIZED_OPTIONS', 'ALL_WORKFLOW_OPTIONS'].includes(field.dataSpecialization)) {
                type = dataSpecializationTypeMap[field.dataSpecialization];
            }
            else if (['SimplifiedOptionsLookup', 'SpecializedOptionsLookup'].includes(field.dataType)) {
                if (field.options && Object.keys(inputTypeToTypeMap).indexOf(field.inputType) > -1 && !field.multiValue) {
                    type = inputTypeToTypeMap[field.inputType];
                }
                else if (field.options && Object.keys(inputTypeMultiToTypeMap).indexOf(field.inputType) > -1 && field.multiValue) {
                    type = inputTypeMultiToTypeMap[field.inputType];
                }
                else {
                    type = dataSpecializationTypeMap[field.dataType];
                }
            }
            else if (this.hasAssociatedEntity(field)) {
                type = 'entitypicker'; // TODO!
            }
            else {
                type = 'picker';
            }
        }
        else if (field.optionsUrl && field.inputType === 'SELECT') {
            if (field.optionsType && ~this.ENTITY_PICKER_LIST.indexOf(field.optionsType)) {
                type = 'entitypicker'; // TODO!
            }
            else {
                type = 'picker';
            }
        }
        else if (Object.keys(dataSpecializationTypeMap).indexOf(field.dataSpecialization) > -1) {
            type = dataSpecializationTypeMap[field.dataSpecialization];
        }
        else if (Object.keys(dataTypeToTypeMap).indexOf(field.dataType) > -1) {
            type = dataTypeToTypeMap[field.dataType];
        }
        else if (field.inputType === 'TEXTAREA') {
            type = 'textarea';
        }
        else if (field.options && Object.keys(inputTypeToTypeMap).indexOf(field.inputType) > -1 && !field.multiValue) {
            type = inputTypeToTypeMap[field.inputType];
        }
        else if (field.options && Object.keys(inputTypeMultiToTypeMap).indexOf(field.inputType) > -1 && field.multiValue) {
            type = inputTypeMultiToTypeMap[field.inputType];
        }
        else if (Object.keys(typeToTypeMap).indexOf(field.type) > -1) {
            type = typeToTypeMap[field.type];
        }
        else if (Object.keys(numberDataTypeToTypeMap).indexOf(field.dataType) > -1) {
            type = numberDataTypeToTypeMap[field.dataType];
        } /* else {
                throw new Error('FormUtils: This field type is unsupported.');
            }*/
        return type;
    }
    isFieldEncrypted(key) {
        return key.indexOf('customEncrypted') > -1;
    }
    getControlForField(field, http, config, overrides, forTable = false, fieldData) {
        // TODO: if field.type overrides `determineInputType` we should use it in that method or use this method
        // TODO: (cont.) as the setter of the field argument
        let type = this.determineInputType(field) || field.type;
        let control;
        const controlConfig = {
            metaType: field.type,
            type,
            key: field.name,
            label: field.label,
            placeholder: field.hint || '',
            required: field.required || field.systemRequired,
            hidden: !field.required,
            encrypted: this.isFieldEncrypted(field.name ? field.name.toString() : ''),
            value: field.value || field.defaultValue,
            sortOrder: field.sortOrder,
            associatedEntity: field.associatedEntity,
            optionsType: field.optionsType,
            multiple: field.multiValue,
            readOnly: !!field.disabled || !!field.readOnly,
            disabled: field.disabled,
            maxlength: field.maxLength,
            interactions: field.interactions,
            dataSpecialization: field.dataSpecialization,
            dataType: field.dataType,
            description: field.description || '',
            tooltip: field.tooltip,
            tooltipPosition: field.tooltipPosition,
            customControl: field.customControl,
            template: field.template,
            customControlConfig: field.customControlConfig,
            restrictFieldInteractions: field.restrictFieldInteractions,
            validators: field.validators,
            warning: field.warning,
            config: field.config || {},
            closeOnSelect: field.closeOnSelect,
            layoutOptions: field.layoutOptions,
        };
        this.inferDateRange(controlConfig, field);
        // TODO: getControlOptions should always return the correct format
        const optionsConfig = this.getControlOptions(field, http, config, fieldData);
        if (Array.isArray(optionsConfig) && !(type === 'chips' || type === 'picker')) {
            controlConfig.options = optionsConfig;
        }
        else if (Array.isArray(optionsConfig) && (type === 'chips' || type === 'picker')) {
            controlConfig.config = {
                options: optionsConfig,
            };
        }
        else if (optionsConfig) {
            controlConfig.config = {
                ...optionsConfig,
                ...(controlConfig && controlConfig.config),
            };
        }
        if (type === 'year') {
            controlConfig.maxlength = 4;
        }
        // TODO: Overrides should be an iterable of all properties (potentially a private method)
        let overrideResultsTemplate;
        let overridePreviewTemplate;
        if (overrides && overrides[field.name]) {
            if (overrides[field.name].resultsTemplate) {
                overrideResultsTemplate = overrides[field.name].resultsTemplate;
                controlConfig.config.resultsTemplate = overrideResultsTemplate;
                delete overrides[field.name].resultsTemplate;
            }
            if (overrides[field.name].overridePreviewTemplate) {
                overrideResultsTemplate = overrides[field.name].overridePreviewTemplate;
                controlConfig.config.overridePreviewTemplate = overrideResultsTemplate;
                delete overrides[field.name].overridePreviewTemplate;
            }
            if (overrides[field.name].pickerCallback) {
                controlConfig.config.callback = overrides[field.name].pickerCallback;
            }
            if (overrides[field.name].type) {
                type = overrides[field.name].type;
            }
            if (overrides[field.name].columns) {
                controlConfig.config.columns = overrides[field.name].columns;
                controlConfig.closeOnSelect = true;
                delete controlConfig.label;
            }
            if (overrides[field.name].warning) {
                controlConfig.warning = overrides[field.name].warning;
            }
            Object.assign(controlConfig, overrides[field.name]);
        }
        switch (type) {
            case 'entitychips':
                // TODO: This doesn't belong in this codebase
                controlConfig.multiple = true;
                controlConfig.config.resultsTemplate = overrideResultsTemplate || EntityPickerResults;
                controlConfig.config.previewTemplate = overridePreviewTemplate || EntityPickerResult;
                // TODO: When appendToBody picker works better in table/form
                control = new PickerControl(controlConfig);
                break;
            case 'chips':
                controlConfig.multiple = true;
                // TODO: When appendToBody picker works better in table/form
                control = new PickerControl(controlConfig);
                break;
            case 'entitypicker':
                // TODO: This doesn't belong in this codebase
                controlConfig.config.resultsTemplate = overrideResultsTemplate || EntityPickerResults;
                // TODO: When appendToBody picker works better in table/form
                control = new PickerControl(controlConfig);
                break;
            case 'picker':
                // TODO: When appendToBody picker works better in table/form
                control = new PickerControl(controlConfig);
                break;
            case 'datetime':
                controlConfig.military = config ? !!config.military : false;
                controlConfig.weekStart = config && config.weekStart ? config.weekStart : 0;
                control = new DateTimeControl(controlConfig);
                break;
            case 'date':
                controlConfig.dateFormat = field.dateFormat;
                controlConfig.textMaskEnabled = field.textMaskEnabled;
                controlConfig.allowInvalidDate = field.allowInvalidDate;
                controlConfig.military = config ? !!config.military : false;
                controlConfig.weekStart = config && config.weekStart ? config.weekStart : 0;
                control = new DateControl(controlConfig);
                break;
            case 'time':
                controlConfig.military = config ? !!config.military : false;
                control = new TimeControl(controlConfig);
                break;
            case 'native-time':
            case 'native-date':
            case 'native-week':
            case 'native-year':
            case 'native-datetime-local':
            case 'native-tel':
            case 'native-email':
            case 'native-url':
            case 'native-number':
                control = new CustomControl({ ...controlConfig, template: 'native-input', type: type.replace('native-', ''), alwaysActive: true });
                break;
            case 'timezone':
                control = new TimezoneControl(controlConfig);
                break;
            case 'currency':
            case 'money':
            case 'email':
            case 'percentage':
            case 'float':
            case 'number':
            case 'year':
                // TODO: Only types from `determineInputType` should be used in this class
                if (type === 'money') {
                    type = 'currency';
                }
                controlConfig.type = type;
                control = new TextBoxControl(controlConfig);
                break;
            case 'text':
                control = new TextBoxControl(controlConfig);
                break;
            case 'textarea':
                control = new TextAreaControl(controlConfig);
                break;
            case 'editor':
                control = new EditorControl(controlConfig);
                if (controlConfig.template) {
                    control.controlType = controlConfig.template;
                }
                break;
            case 'editor-minimal':
                control = new EditorControl(controlConfig);
                control.minimal = true;
                break;
            case 'tiles':
                control = new TilesControl(controlConfig);
                break;
            case 'checkbox':
                controlConfig.checkboxLabel = field.checkboxLabel;
                control = new CheckboxControl(controlConfig);
                break;
            case 'switch':
                control = new SwitchControl(controlConfig);
                break;
            case 'checklist':
                control = new CheckListControl(controlConfig);
                break;
            case 'radio':
                control = new RadioControl(controlConfig);
                break;
            case 'select':
                control = new SelectControl(controlConfig);
                break;
            case 'address':
                controlConfig.required = field.required || false;
                if (Helpers.isBlank(controlConfig.config)) {
                    controlConfig.config = {};
                }
                controlConfig.config.required = field.required;
                controlConfig.config.readOnly = controlConfig.readOnly;
                if (field.fields && field.fields.length) {
                    for (const subfield of field.fields) {
                        controlConfig.config[subfield.name] = {
                            required: !!subfield.required,
                            hidden: !!subfield.readOnly,
                        };
                        if (!Helpers.isEmpty(subfield.label)) {
                            controlConfig.config[subfield.name].label = subfield.label;
                        }
                        if (!Helpers.isEmpty(subfield.maxLength)) {
                            controlConfig.config[subfield.name].maxlength = subfield.maxLength;
                        }
                        controlConfig.required = controlConfig.required || subfield.required;
                        if (subfield.defaultValue) {
                            if (Helpers.isBlank(controlConfig.value)) {
                                controlConfig.value = {};
                            }
                            controlConfig.value[subfield.name] = subfield.defaultValue;
                        }
                        else if (subfield.name === 'countryID') {
                            if (Helpers.isBlank(controlConfig.value)) {
                                controlConfig.value = {};
                            }
                            controlConfig.value[subfield.name] = 1;
                        }
                        if (subfield.name === 'state' || subfield.name === 'countryID') {
                            if (subfield.name === 'countryID') {
                                subfield.optionsType = 'Country';
                            }
                            if (!subfield.optionsUrl) {
                                subfield.optionsUrl = `options/${subfield.optionsType}`;
                            }
                            controlConfig.config[subfield.name].pickerConfig = this.getControlOptions(subfield, http, config, fieldData);
                        }
                    }
                }
                controlConfig.isEmpty = this.isAddressEmpty;
                control = new AddressControl(controlConfig);
                break;
            case 'file':
                control = new FileControl(controlConfig);
                break;
            case 'custom':
                control = new CustomControl(controlConfig);
                break;
            default:
                control = new TextBoxControl(controlConfig);
                break;
        }
        return control;
    }
    shouldCreateControl(field) {
        if (field.systemRequired) {
            field.readOnly = false;
        }
        return (field.name !== 'id' &&
            (!['SYSTEM', 'SECTION_HEADER'].includes(field.dataSpecialization) ||
                ['address', 'billingAddress', 'secondaryAddress'].includes(field.name)) &&
            !field.readOnly);
    }
    toControls(meta, currencyFormat, http, config, overrides, forTable = false) {
        const controls = [];
        if (meta && meta.fields) {
            const fields = meta.fields;
            fields.forEach((field) => {
                if (this.shouldCreateControl(field)) {
                    const control = this.getControlForField(field, http, config, overrides, forTable);
                    // Set currency format
                    if (control.subType === 'currency') {
                        control.currencyFormat = currencyFormat;
                    }
                    // Add to controls
                    controls.push(control);
                }
            });
        }
        return controls;
    }
    toTableControls(meta, currencyFormat, http, config, overrides) {
        const controls = this.toControls(meta, currencyFormat, http, config, overrides, true);
        const ret = {};
        controls.forEach((control) => {
            ret[control.key] = {
                editorType: control.__type,
                editorConfig: control.__config,
            };
        });
        return ret;
    }
    toFieldSets(meta, currencyFormat, http, config, overrides, data) {
        const fieldsets = [];
        let formFields = [];
        if (meta && meta.fields) {
            formFields = this.getFormFields(meta);
            formFields.forEach((field) => {
                if (this.isHeader(field)) {
                    if (field.enabled) {
                        this.insertHeaderToFieldsets(fieldsets, field);
                    }
                }
                else if (this.isEmbeddedField(field)) {
                    this.insertHeaderToFieldsets(fieldsets, field);
                    const embeddedFields = this.getEmbeddedFields(field);
                    embeddedFields.forEach((embeddedField) => {
                        if (this.shouldCreateControl(embeddedField)) {
                            let control = this.createControl(embeddedField, data, http, config, overrides, currencyFormat);
                            control = this.markControlAsEmbedded(control, field.dataSpecialization ? field.dataSpecialization.toLowerCase() : null);
                            fieldsets[fieldsets.length - 1].controls.push(control);
                        }
                        else if (this.isHeader(embeddedField)) {
                            this.insertHeaderToFieldsets(fieldsets, embeddedField);
                        }
                    });
                }
                else if (this.shouldCreateControl(field)) {
                    let control = this.createControl(field, data, http, config, overrides, currencyFormat);
                    if (field.inlineEmbeddedAssociatedEntityField) {
                        control = this.markControlAsEmbedded(control, 'inline_embedded');
                    }
                    if (fieldsets.length === 0) {
                        fieldsets.push({ controls: [] });
                    }
                    fieldsets[fieldsets.length - 1].controls.push(control);
                }
            });
        }
        if (fieldsets.length > 0) {
            return fieldsets;
        }
        else {
            return [
                {
                    controls: this.toControls(meta, currencyFormat, http, config),
                },
            ];
        }
    }
    isEmbeddedField(field) {
        return field.dataSpecialization && ['embedded'].includes(field.dataSpecialization.toLowerCase()) && !field.readOnly;
    }
    createControl(field, data, http, config, overrides, currencyFormat) {
        const fieldData = this.isEmbeddedFieldData(field, data) ? this.getEmbeddedFieldData(field, data) : this.getFieldData(field, data);
        const control = this.getControlForField(field, http, config, overrides, undefined, fieldData);
        // Set currency format
        if (control.subType === 'currency') {
            control.currencyFormat = currencyFormat;
        }
        return control;
    }
    isEmbeddedFieldData(field, data) {
        return data && field.name.includes('.');
    }
    getFieldData(field, data) {
        return (data && data[field.name]) || null;
    }
    getEmbeddedFieldData(field, data) {
        const [parentFieldName, fieldName] = field.name.split('.');
        return (data && data[parentFieldName] && data[parentFieldName][fieldName]) || null;
    }
    getFormFields(meta) {
        const sectionHeaders = meta.sectionHeaders
            ? meta.sectionHeaders.map((element) => {
                element.isSectionHeader = true;
                return element;
            })
            : [];
        let fields = meta.fields.map((field) => {
            field.parentEntity = meta.entity;
            if (!field.hasOwnProperty('sortOrder')) {
                field.sortOrder = Number.MAX_SAFE_INTEGER - 1;
            }
            return field;
        });
        // build list of fields that should be displayed inline but belong to associated entities
        const inlineEmbeddedAssociatedEntityFields = this.getInlineEmbeddedFields(fields);
        // remove the inline embedded fields because the associated entity fields were extracted above
        // and will be added to the regular list of fields. This prevents the fields from being added multiple times.
        fields = fields.filter((f) => !f.dataSpecialization || f.dataSpecialization.toLowerCase() !== 'inline_embedded');
        // sort fields
        return [...sectionHeaders, ...fields, ...inlineEmbeddedAssociatedEntityFields].sort(Helpers.sortByField(['sortOrder', 'name']));
    }
    getInlineEmbeddedFields(fields) {
        let inlineEmbeddedAssociatedEntityFields = [];
        fields
            .filter((f) => f.dataSpecialization && f.dataSpecialization.toLowerCase() === 'inline_embedded')
            .forEach((f) => {
            inlineEmbeddedAssociatedEntityFields = [...inlineEmbeddedAssociatedEntityFields, ...this.getAssociatedFieldsForInlineEmbedded(f)];
        });
        return inlineEmbeddedAssociatedEntityFields;
    }
    getAssociatedFieldsForInlineEmbedded(field) {
        let associatedEntityFields = [];
        associatedEntityFields = this.getEmbeddedFields(field).map((aef) => {
            aef.inlineEmbeddedAssociatedEntityField = true;
            return aef;
        });
        return associatedEntityFields;
    }
    getEmbeddedFields(subHeader) {
        return subHeader.associatedEntity.fields
            .filter((field) => field.name !== 'id')
            .map((field) => {
            if (!field.name.startsWith(`${subHeader.name}.`)) {
                field.name = `${subHeader.name}.${field.name}`;
            }
            return field;
        })
            .sort(Helpers.sortByField(['sortOrder', 'name']));
    }
    isHeader(field) {
        return (!Helpers.isBlank(field) &&
            ((field.hasOwnProperty('isSectionHeader') && field.isSectionHeader) ||
                (field.dataSpecialization && field.dataSpecialization.toLowerCase() === 'section_header')));
    }
    insertHeaderToFieldsets(fieldsets, field) {
        const constantProperties = {
            controls: [],
            isEmbedded: field.dataSpecialization && field.dataSpecialization.toLowerCase() === 'embedded',
            isInlineEmbedded: field.dataSpecialization && field.dataSpecialization.toLowerCase() === 'inline_embedded',
            key: field.name,
        };
        if (field.name && field.name.startsWith('customObject') && field.associatedEntity && field.associatedEntity.label) {
            fieldsets.push({
                title: field.associatedEntity.label || field.label,
                icon: field.icon || 'bhi-card-expand',
                ...constantProperties,
            });
        }
        else {
            fieldsets.push({
                title: field.label,
                icon: field.icon || 'bhi-section',
                ...constantProperties,
            });
        }
    }
    markControlAsEmbedded(control, dataSpecialization) {
        if (Helpers.isBlank(control.config)) {
            control.config = {};
        }
        control.config.embedded = true;
        control.isEmbedded = dataSpecialization === 'embedded';
        control.isInlineEmbedded = dataSpecialization === 'inline_embedded';
        return control;
    }
    getControlOptions(field, http, config, fieldData) {
        // TODO: The token property of config is the only property used; just pass in `token: string`
        if (field.dataType === 'Boolean' && !field.options) {
            // TODO: dataType should only be determined by `determineInputType` which doesn't ever return 'Boolean' it
            // TODO: (cont.) returns `tiles`
            return [
                { value: false, label: this.labels.no },
                { value: true, label: this.labels.yes },
            ];
        }
        else if (field.dataSpecialization === 'ALL_WORKFLOW_OPTIONS' && field.options) {
            return field.options;
        }
        else if (field.workflowOptions) {
            return this.getWorkflowOptions(field.workflowOptions, fieldData);
        }
        else if (field.dataSpecialization === 'SPECIALIZED_OPTIONS' ||
            (field.options && ['SpecializedOptionsLookup', 'SimplifiedOptionsLookup'].includes(field.dataType))) {
            return field.options;
        }
        else if (field.optionsUrl) {
            return this.optionsService.getOptionsConfig(http, field, config);
        }
        else if (Array.isArray(field.options) && field.type === 'chips') {
            const options = field.options;
            return {
                field: 'value',
                format: '$label',
                options,
            };
        }
        else if (field.options) {
            return field.options;
        }
        return null;
    }
    getWorkflowOptions(workflowOptions, fieldData) {
        let currentValue = null;
        let currentWorkflowOption = 'initial';
        if (fieldData?.id) {
            currentValue = { ...fieldData, value: fieldData.id, label: fieldData.label || fieldData.id };
            currentWorkflowOption = fieldData.id;
        }
        const updateWorkflowOptions = workflowOptions[currentWorkflowOption] || [];
        // Ensure that the current value is added to the beginning of the options list
        if (currentValue && !updateWorkflowOptions.find((option) => option.value === currentValue.value)) {
            updateWorkflowOptions.unshift(currentValue);
        }
        return updateWorkflowOptions;
    }
    setInitialValues(controls, values, keepClean, keyOverride) {
        for (let i = 0; i < controls.length; i++) {
            const control = controls[i];
            const key = keyOverride ? control.key.replace(keyOverride, '') : control.key;
            let value = values[key];
            if (Helpers.isBlank(value)) {
                continue;
            }
            if (Array.isArray(value) && value.length === 0) {
                continue;
            }
            if (Array.isArray(value) && value.length > 0) {
                value = value.filter((val) => !(Object.keys(val).length === 0 && val.constructor === Object));
                if (value.length === 0) {
                    continue;
                }
            }
            if (value.data && value.data.length === 0) {
                continue;
            }
            if (Object.keys(value).length === 0 && value.constructor === Object) {
                continue;
            }
            if (control.dataType === 'Date' && typeof value === 'string' && control.optionsType !== 'skipConversion') {
                value = DateUtil.startOfDay(value);
            }
            control.value = value;
            // TODO: keepClean is not required, but is always used. It should default (to true?)
            control.dirty = !keepClean;
        }
    }
    setInitialValuesFieldsets(fieldsets, values, keepClean) {
        fieldsets.forEach((fieldset) => {
            this.setInitialValues(fieldset.controls, values, keepClean);
        });
    }
    forceShowAllControls(controls) {
        controls.forEach((control) => {
            control.hidden = false;
        });
    }
    forceShowAllControlsInFieldsets(fieldsets) {
        fieldsets.forEach((fieldset) => {
            fieldset.controls.forEach((control) => {
                control.hidden = false;
            });
        });
    }
    forceValidation(form) {
        Object.keys(form.controls).forEach((key) => {
            const control = form.controls[key];
            if (control.required && Helpers.isBlank(form.getRawValue()[control.key])) {
                control.markAsDirty();
                control.markAsTouched();
            }
        });
    }
    isAddressEmpty(control) {
        const fieldList = ['address1', 'address2', 'city', 'state', 'zip', 'countryID'];
        let valid = true;
        if (control.value && control.config) {
            fieldList.forEach((subfield) => {
                if (((subfield !== 'countryID' &&
                    !Helpers.isEmpty(control.config[subfield]) &&
                    control.config[subfield].required &&
                    (Helpers.isBlank(control.value[subfield]) || Helpers.isEmpty(control.value[subfield]))) ||
                    (subfield === 'countryID' &&
                        !Helpers.isEmpty(control.config.countryID) &&
                        control.config.countryID.required &&
                        Helpers.isEmpty(control.value.countryName))) &&
                    !(subfield === 'state' &&
                        !Helpers.isBlank(control.value.countryName) &&
                        control.config.state.pickerConfig &&
                        control.config.state.pickerConfig.defaultOptions &&
                        control.config.state.pickerConfig.defaultOptions.length === 0)) {
                    valid = false;
                }
            });
        }
        return valid;
    }
    getStartDateFromRange(dateRange) {
        if (dateRange.minDate) {
            return DateUtil.parse(dateRange.minDate);
        }
        else if (dateRange.minOffset) {
            return DateUtil.addDays(startOfToday(), dateRange.minOffset);
        }
    }
    getEndDateFromRange(dateRange) {
        if (dateRange.maxDate) {
            return DateUtil.parse(dateRange.maxDate);
        }
        else if (dateRange.minOffset) {
            return DateUtil.addDays(startOfToday(), dateRange.minOffset);
        }
    }
    /**
     * Get the min start date and max end date of a Date base on field data.
     */
    inferDateRange(controlConfig, field) {
        if (field.dataType === 'Date' && field.allowedDateRange) {
            controlConfig.startDate = this.getStartDateFromRange(field.allowedDateRange);
            controlConfig.endDate = this.getEndDateFromRange(field.allowedDateRange);
            controlConfig.disabledDateMessage = field.allowedDateRange?.disabledDateMessage;
        }
    }
    inflateEmbeddedProperties(data) {
        if (data) {
            Object.keys(data)
                .filter((fieldName) => fieldName.includes('.'))
                .forEach((field) => {
                const [parentFieldName, fieldName] = field.split('.');
                if (!data[parentFieldName]) {
                    data[parentFieldName] = {};
                }
                data[parentFieldName][fieldName] = data[field];
                delete data[field];
            });
        }
        return data;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: FormUtils, deps: [{ token: i1.NovoLabelService }, { token: i1.OptionsService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: FormUtils }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: FormUtils, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.NovoLabelService }, { type: i1.OptionsService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybVV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvZm9ybS91dGlscy9Gb3JtVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsS0FBSztBQUNMLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsU0FBUztBQUNULE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDeEMsTUFBTTtBQUNOLE9BQU8sRUFDTCxjQUFjLEVBRWQsZUFBZSxFQUNmLGdCQUFnQixFQUNoQixhQUFhLEVBQ2IsV0FBVyxFQUNYLGVBQWUsRUFDZixhQUFhLEVBQ2IsV0FBVyxFQUVYLGFBQWEsRUFDYixZQUFZLEVBQ1osYUFBYSxFQUNiLGFBQWEsRUFDYixlQUFlLEVBQ2YsY0FBYyxFQUNkLFlBQVksRUFDWixXQUFXLEVBQ1gsZUFBZSxHQUNoQixNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLG1CQUFtQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDeEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7OztBQUd4RCxNQUFNLE9BQU8sU0FBUztJQXFDcEIsWUFBbUIsTUFBd0IsRUFBUyxjQUE4QjtRQUEvRCxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUFTLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQXBDbEYsMkJBQXNCLEdBQWE7WUFDakMsV0FBVztZQUNYLGVBQWU7WUFDZixtQkFBbUI7WUFDbkIs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UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7K0dBdDJCVSxTQUFTO21IQUFULFNBQVM7OzRGQUFULFNBQVM7a0JBRHJCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBOR1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gVmVuZG9yXG5pbXBvcnQgeyBzdGFydE9mVG9kYXkgfSBmcm9tICdkYXRlLWZucyc7XG4vLyBBcHBcbmltcG9ydCB7XG4gIEFkZHJlc3NDb250cm9sLFxuICBCYXNlQ29udHJvbCxcbiAgQ2hlY2tib3hDb250cm9sLFxuICBDaGVja0xpc3RDb250cm9sLFxuICBDdXN0b21Db250cm9sLFxuICBEYXRlQ29udHJvbCxcbiAgRGF0ZVRpbWVDb250cm9sLFxuICBFZGl0b3JDb250cm9sLFxuICBGaWxlQ29udHJvbCxcbiAgTm92b0NvbnRyb2xDb25maWcsXG4gIFBpY2tlckNvbnRyb2wsXG4gIFJhZGlvQ29udHJvbCxcbiAgU2VsZWN0Q29udHJvbCxcbiAgU3dpdGNoQ29udHJvbCxcbiAgVGV4dEFyZWFDb250cm9sLFxuICBUZXh0Qm94Q29udHJvbCxcbiAgVGlsZXNDb250cm9sLFxuICBUaW1lQ29udHJvbCxcbiAgVGltZXpvbmVDb250cm9sLFxufSBmcm9tICcuLi9Gb3JtQ29udHJvbHMnO1xuaW1wb3J0IHR5cGUgeyBGb3JtRmllbGQsIE5vdm9GaWVsZHNldCB9IGZyb20gJy4uL0Zvcm1JbnRlcmZhY2VzJztcbmltcG9ydCB7IE5vdm9Gb3JtQ29udHJvbCB9IGZyb20gJy4uL05vdm9Gb3JtQ29udHJvbCc7XG5pbXBvcnQgeyBOb3ZvRm9ybUdyb3VwIH0gZnJvbSAnLi4vTm92b0Zvcm1Hcm91cCc7XG5pbXBvcnQgeyBFbnRpdHlQaWNrZXJSZXN1bHQsIEVudGl0eVBpY2tlclJlc3VsdHMgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL3BpY2tlcic7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlLCBPcHRpb25zU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuaW1wb3J0IHsgRGF0ZVV0aWwsIEhlbHBlcnMgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZvcm1VdGlscyB7XG4gIEFTU09DSUFURURfRU5USVRZX0xJU1Q6IHN0cmluZ1tdID0gW1xuICAgICdDYW5kaWRhdGUnLFxuICAgICdDbGllbnRDb250YWN0JyxcbiAgICAnQ2xpZW50Q29ycG9yYXRpb24nLFxuICAgICdDb3Jwb3JhdGlvbkRlcGFydG1lbnQnLFxuICAgICdMZWFkJyxcbiAgICAnT3Bwb3J0dW5pdHknLFxuICAgICdKb2JPcmRlcicsXG4gICAgJ0NvcnBvcmF0ZVVzZXInLFxuICAgICdQZXJzb24nLFxuICAgICdQbGFjZW1lbnQnLFxuICAgICdKb2JTaGlmdCcsXG4gIF07XG4gIEVOVElUWV9QSUNLRVJfTElTVDogc3RyaW5nW10gPSBbXG4gICAgJ0NhbmRpZGF0ZScsXG4gICAgJ0NhbmRpZGF0ZVRleHQnLFxuICAgICdDbGllbnQnLFxuICAgICdDbGllbnRUZXh0JyxcbiAgICAnQ2xpZW50Q29udGFjdCcsXG4gICAgJ0NsaWVudENvbnRhY3RUZXh0JyxcbiAgICAnQ2xpZW50Q29ycG9yYXRpb24nLFxuICAgICdDbGllbnRDb3Jwb3JhdGlvblRleHQnLFxuICAgICdMZWFkJyxcbiAgICAnTGVhZFRleHQnLFxuICAgICdPcHBvcnR1bml0eScsXG4gICAgJ09wcG9ydHVuaXR5VGV4dCcsXG4gICAgJ0pvYk9yZGVyJyxcbiAgICAnSm9iT3JkZXJUZXh0JyxcbiAgICAnQ29ycG9yYXRlVXNlcicsXG4gICAgJ0NvcnBvcmF0ZVVzZXJUZXh0JyxcbiAgICAnUGVyc29uJyxcbiAgICAnUGVyc29uVGV4dCcsXG4gICAgJ1BsYWNlbWVudCcsXG4gICAgJ0pvYlNoaWZ0JyxcbiAgXTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLCBwdWJsaWMgb3B0aW9uc1NlcnZpY2U6IE9wdGlvbnNTZXJ2aWNlKSB7fVxuXG4gIHRvRm9ybUdyb3VwKGNvbnRyb2xzOiBBcnJheTxhbnk+KTogTm92b0Zvcm1Hcm91cCB7XG4gICAgY29uc3QgZ3JvdXA6IGFueSA9IHt9O1xuICAgIGNvbnRyb2xzLmZvckVhY2goKGNvbnRyb2wpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gSGVscGVycy5pc0JsYW5rKGNvbnRyb2wudmFsdWUpID8gJycgOiBjb250cm9sLnZhbHVlO1xuICAgICAgZ3JvdXBbY29udHJvbC5rZXldID0gbmV3IE5vdm9Gb3JtQ29udHJvbCh2YWx1ZSwgY29udHJvbCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG5ldyBOb3ZvRm9ybUdyb3VwKGdyb3VwKTtcbiAgfVxuXG4gIGVtcHR5Rm9ybUdyb3VwKCk6IE5vdm9Gb3JtR3JvdXAge1xuICAgIHJldHVybiBuZXcgTm92b0Zvcm1Hcm91cCh7fSk7XG4gIH1cblxuICBhZGRDb250cm9scyhmb3JtR3JvdXA6IE5vdm9Gb3JtR3JvdXAsIGNvbnRyb2xzOiBBcnJheTxOb3ZvQ29udHJvbENvbmZpZz4pOiB2b2lkIHtcbiAgICBjb250cm9scy5mb3JFYWNoKChjb250cm9sKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IEhlbHBlcnMuaXNCbGFuayhjb250cm9sLnZhbHVlKSA/ICcnIDogY29udHJvbC52YWx1ZTtcbiAgICAgIGNvbnN0IGZvcm1Db250cm9sID0gbmV3IE5vdm9Gb3JtQ29udHJvbCh2YWx1ZSwgY29udHJvbCk7XG4gICAgICBmb3JtR3JvdXAuYWRkQ29udHJvbChjb250cm9sLmtleSwgZm9ybUNvbnRyb2wpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlQ29udHJvbHMoZm9ybUdyb3VwOiBOb3ZvRm9ybUdyb3VwLCBjb250cm9sczogQXJyYXk8Tm92b0NvbnRyb2xDb25maWc+KTogdm9pZCB7XG4gICAgY29udHJvbHMuZm9yRWFjaCgoY29udHJvbCkgPT4ge1xuICAgICAgZm9ybUdyb3VwLnJlbW92ZUNvbnRyb2woY29udHJvbC5rZXkpO1xuICAgIH0pO1xuICB9XG5cbiAgdG9Gb3JtR3JvdXBGcm9tRmllbGRzZXQoZmllbGRzZXRzOiBBcnJheTxOb3ZvRmllbGRzZXQ+KTogTm92b0Zvcm1Hcm91cCB7XG4gICAgY29uc3QgY29udHJvbHM6IEFycmF5PE5vdm9Gb3JtQ29udHJvbD4gPSBbXTtcbiAgICBmaWVsZHNldHMuZm9yRWFjaCgoZmllbGRzZXQpID0+IHtcbiAgICAgIGNvbnRyb2xzLnB1c2goLi4uZmllbGRzZXQuY29udHJvbHMpO1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLnRvRm9ybUdyb3VwKGNvbnRyb2xzKTtcbiAgfVxuXG4gIGhhc0Fzc29jaWF0ZWRFbnRpdHkoZmllbGQ6IEZvcm1GaWVsZCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIShmaWVsZC5hc3NvY2lhdGVkRW50aXR5ICYmIH50aGlzLkFTU09DSUFURURfRU5USVRZX0xJU1QuaW5kZXhPZihmaWVsZC5hc3NvY2lhdGVkRW50aXR5LmVudGl0eSkpO1xuICB9XG5cbiAgZGV0ZXJtaW5lSW5wdXRUeXBlKGZpZWxkOiBGb3JtRmllbGQpOiBzdHJpbmcge1xuICAgIGxldCB0eXBlOiBzdHJpbmc7XG4gICAgY29uc3QgZGF0YVNwZWNpYWxpemF0aW9uVHlwZU1hcCA9IHtcbiAgICAgIERBVEVUSU1FOiAnZGF0ZXRpbWUnLFxuICAgICAgVElNRTogJ3RpbWUnLFxuICAgICAgTU9ORVk6ICdjdXJyZW5jeScsXG4gICAgICBQRVJDRU5UQUdFOiAncGVyY2VudGFnZScsXG4gICAgICBIVE1MOiAnZWRpdG9yJyxcbiAgICAgICdIVE1MLU1JTklNQUwnOiAnZWRpdG9yLW1pbmltYWwnLFxuICAgICAgWUVBUjogJ3llYXInLFxuICAgICAgV09SS0ZMT1dfT1BUSU9OUzogJ3NlbGVjdCcsXG4gICAgICBTUEVDSUFMSVpFRF9PUFRJT05TOiAnc2VsZWN0JyxcbiAgICAgIEFMTF9XT1JLRkxPV19PUFRJT05TOiAnc2VsZWN0JyxcbiAgICAgIFdvcmtmbG93T3B0aW9uc0xvb2t1cDogJ3NlbGVjdCcsXG4gICAgICBTcGVjaWFsaXplZE9wdGlvbnNMb29rdXA6ICdzZWxlY3QnLFxuICAgICAgU2ltcGxpZmllZE9wdGlvbnNMb29rdXA6ICdzZWxlY3QnLFxuICAgICAgQWxsV29ya2Zsb3dPcHRpb25zTG9va3VwOiAnc2VsZWN0JyxcbiAgICB9O1xuICAgIGNvbnN0IGRhdGFUeXBlVG9UeXBlTWFwID0ge1xuICAgICAgVGltZXN0YW1wOiAnZGF0ZScsXG4gICAgICBEYXRlOiAnZGF0ZScsXG4gICAgICBCb29sZWFuOiAndGlsZXMnLFxuICAgIH07XG4gICAgY29uc3QgaW5wdXRUeXBlVG9UeXBlTWFwID0ge1xuICAgICAgQ0hFQ0tCT1g6ICdyYWRpbycsXG4gICAgICBSQURJTzogJ3JhZGlvJyxcbiAgICAgIFNFTEVDVDogJ3NlbGVjdCcsXG4gICAgICBUSUxFUzogJ3RpbGVzJyxcbiAgICB9O1xuICAgIGNvbnN0IGlucHV0VHlwZU11bHRpVG9UeXBlTWFwID0ge1xuICAgICAgQ0hFQ0tCT1g6ICdjaGVja2xpc3QnLFxuICAgICAgUkFESU86ICdjaGVja2xpc3QnLFxuICAgICAgU0VMRUNUOiAnY2hpcHMnLFxuICAgIH07XG4gICAgY29uc3QgdHlwZVRvVHlwZU1hcCA9IHtcbiAgICAgIGZpbGU6ICdmaWxlJyxcbiAgICAgIENPTVBPU0lURTogJ2FkZHJlc3MnLFxuICAgIH07XG4gICAgY29uc3QgbnVtYmVyRGF0YVR5cGVUb1R5cGVNYXAgPSB7XG4gICAgICBEb3VibGU6ICdmbG9hdCcsXG4gICAgICBCaWdEZWNpbWFsOiAnZmxvYXQnLFxuICAgICAgSW50ZWdlcjogJ251bWJlcicsXG4gICAgfTtcbiAgICBpZiAoZmllbGQudHlwZSA9PT0gJ1RPX01BTlknKSB7XG4gICAgICBpZiAodGhpcy5oYXNBc3NvY2lhdGVkRW50aXR5KGZpZWxkKSkge1xuICAgICAgICBpZiAoZmllbGQubXVsdGlWYWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICB0eXBlID0gJ2VudGl0eXBpY2tlcic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdHlwZSA9ICdlbnRpdHljaGlwcyc7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChmaWVsZC5tdWx0aVZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICAgIHR5cGUgPSAncGlja2VyJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0eXBlID0gJ2NoaXBzJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZmllbGQudHlwZSA9PT0gJ1RPX09ORScpIHtcbiAgICAgIGlmIChcbiAgICAgICAgJ1NZU1RFTScgPT09IGZpZWxkLmRhdGFTcGVjaWFsaXphdGlvbiAmJlxuICAgICAgICBbJ1dvcmtmbG93T3B0aW9uc0xvb2t1cCcsICdTcGVjaWFsaXplZE9wdGlvbnNMb29rdXAnLCAnQWxsV29ya2Zsb3dPcHRpb25zTG9va3VwJ10uaW5jbHVkZXMoZmllbGQuZGF0YVR5cGUpXG4gICAgICApIHtcbiAgICAgICAgdHlwZSA9IGRhdGFTcGVjaWFsaXphdGlvblR5cGVNYXBbZmllbGQuZGF0YVR5cGVdO1xuICAgICAgfSBlbHNlIGlmIChbJ1dPUktGTE9XX09QVElPTlMnLCAnU1BFQ0lBTElaRURfT1BUSU9OUycsICdBTExfV09SS0ZMT1dfT1BUSU9OUyddLmluY2x1ZGVzKGZpZWxkLmRhdGFTcGVjaWFsaXphdGlvbikpIHtcbiAgICAgICAgdHlwZSA9IGRhdGFTcGVjaWFsaXphdGlvblR5cGVNYXBbZmllbGQuZGF0YVNwZWNpYWxpemF0aW9uXTtcbiAgICAgIH0gZWxzZSBpZiAoWydTaW1wbGlmaWVkT3B0aW9uc0xvb2t1cCcsICdTcGVjaWFsaXplZE9wdGlvbnNMb29rdXAnXS5pbmNsdWRlcyhmaWVsZC5kYXRhVHlwZSkpIHtcbiAgICAgICAgaWYgKGZpZWxkLm9wdGlvbnMgJiYgT2JqZWN0LmtleXMoaW5wdXRUeXBlVG9UeXBlTWFwKS5pbmRleE9mKGZpZWxkLmlucHV0VHlwZSkgPiAtMSAmJiAhZmllbGQubXVsdGlWYWx1ZSkge1xuICAgICAgICAgIHR5cGUgPSBpbnB1dFR5cGVUb1R5cGVNYXBbZmllbGQuaW5wdXRUeXBlXTtcbiAgICAgICAgfSBlbHNlIGlmIChmaWVsZC5vcHRpb25zICYmIE9iamVjdC5rZXlzKGlucHV0VHlwZU11bHRpVG9UeXBlTWFwKS5pbmRleE9mKGZpZWxkLmlucHV0VHlwZSkgPiAtMSAmJiBmaWVsZC5tdWx0aVZhbHVlKSB7XG4gICAgICAgICAgdHlwZSA9IGlucHV0VHlwZU11bHRpVG9UeXBlTWFwW2ZpZWxkLmlucHV0VHlwZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdHlwZSA9IGRhdGFTcGVjaWFsaXphdGlvblR5cGVNYXBbZmllbGQuZGF0YVR5cGVdO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaGFzQXNzb2NpYXRlZEVudGl0eShmaWVsZCkpIHtcbiAgICAgICAgdHlwZSA9ICdlbnRpdHlwaWNrZXInOyAvLyBUT0RPIVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHlwZSA9ICdwaWNrZXInO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZmllbGQub3B0aW9uc1VybCAmJiBmaWVsZC5pbnB1dFR5cGUgPT09ICdTRUxFQ1QnKSB7XG4gICAgICBpZiAoZmllbGQub3B0aW9uc1R5cGUgJiYgfnRoaXMuRU5USVRZX1BJQ0tFUl9MSVNULmluZGV4T2YoZmllbGQub3B0aW9uc1R5cGUpKSB7XG4gICAgICAgIHR5cGUgPSAnZW50aXR5cGlja2VyJzsgLy8gVE9ETyFcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHR5cGUgPSAncGlja2VyJztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKE9iamVjdC5rZXlzKGRhdGFTcGVjaWFsaXphdGlvblR5cGVNYXApLmluZGV4T2YoZmllbGQuZGF0YVNwZWNpYWxpemF0aW9uKSA+IC0xKSB7XG4gICAgICB0eXBlID0gZGF0YVNwZWNpYWxpemF0aW9uVHlwZU1hcFtmaWVsZC5kYXRhU3BlY2lhbGl6YXRpb25dO1xuICAgIH0gZWxzZSBpZiAoT2JqZWN0LmtleXMoZGF0YVR5cGVUb1R5cGVNYXApLmluZGV4T2YoZmllbGQuZGF0YVR5cGUpID4gLTEpIHtcbiAgICAgIHR5cGUgPSBkYXRhVHlwZVRvVHlwZU1hcFtmaWVsZC5kYXRhVHlwZV07XG4gICAgfSBlbHNlIGlmIChmaWVsZC5pbnB1dFR5cGUgPT09ICdURVhUQVJFQScpIHtcbiAgICAgIHR5cGUgPSAndGV4dGFyZWEnO1xuICAgIH0gZWxzZSBpZiAoZmllbGQub3B0aW9ucyAmJiBPYmplY3Qua2V5cyhpbnB1dFR5cGVUb1R5cGVNYXApLmluZGV4T2YoZmllbGQuaW5wdXRUeXBlKSA+IC0xICYmICFmaWVsZC5tdWx0aVZhbHVlKSB7XG4gICAgICB0eXBlID0gaW5wdXRUeXBlVG9UeXBlTWFwW2ZpZWxkLmlucHV0VHlwZV07XG4gICAgfSBlbHNlIGlmIChmaWVsZC5vcHRpb25zICYmIE9iamVjdC5rZXlzKGlucHV0VHlwZU11bHRpVG9UeXBlTWFwKS5pbmRleE9mKGZpZWxkLmlucHV0VHlwZSkgPiAtMSAmJiBmaWVsZC5tdWx0aVZhbHVlKSB7XG4gICAgICB0eXBlID0gaW5wdXRUeXBlTXVsdGlUb1R5cGVNYXBbZmllbGQuaW5wdXRUeXBlXTtcbiAgICB9IGVsc2UgaWYgKE9iamVjdC5rZXlzKHR5cGVUb1R5cGVNYXApLmluZGV4T2YoZmllbGQudHlwZSkgPiAtMSkge1xuICAgICAgdHlwZSA9IHR5cGVUb1R5cGVNYXBbZmllbGQudHlwZV07XG4gICAgfSBlbHNlIGlmIChPYmplY3Qua2V5cyhudW1iZXJEYXRhVHlwZVRvVHlwZU1hcCkuaW5kZXhPZihmaWVsZC5kYXRhVHlwZSkgPiAtMSkge1xuICAgICAgdHlwZSA9IG51bWJlckRhdGFUeXBlVG9UeXBlTWFwW2ZpZWxkLmRhdGFUeXBlXTtcbiAgICB9IC8qIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGb3JtVXRpbHM6IFRoaXMgZmllbGQgdHlwZSBpcyB1bnN1cHBvcnRlZC4nKTtcbiAgICAgICAgfSovXG4gICAgcmV0dXJuIHR5cGU7XG4gIH1cblxuICBpc0ZpZWxkRW5jcnlwdGVkKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGtleS5pbmRleE9mKCdjdXN0b21FbmNyeXB0ZWQnKSA+IC0xO1xuICB9XG5cbiAgZ2V0Q29udHJvbEZvckZpZWxkKFxuICAgIGZpZWxkOiBhbnksXG4gICAgaHR0cCxcbiAgICBjb25maWc6IHsgdG9rZW4/OiBzdHJpbmc7IHJlc3RVcmw/OiBzdHJpbmc7IG1pbGl0YXJ5PzogYm9vbGVhbjsgd2Vla1N0YXJ0PzogbnVtYmVyIH0sXG4gICAgb3ZlcnJpZGVzPzogYW55LFxuICAgIGZvclRhYmxlOiBib29sZWFuID0gZmFsc2UsXG4gICAgZmllbGREYXRhPzogYW55LFxuICApIHtcbiAgICAvLyBUT0RPOiBpZiBmaWVsZC50eXBlIG92ZXJyaWRlcyBgZGV0ZXJtaW5lSW5wdXRUeXBlYCB3ZSBzaG91bGQgdXNlIGl0IGluIHRoYXQgbWV0aG9kIG9yIHVzZSB0aGlzIG1ldGhvZFxuICAgIC8vIFRPRE86IChjb250LikgYXMgdGhlIHNldHRlciBvZiB0aGUgZmllbGQgYXJndW1lbnRcbiAgICBsZXQgdHlwZTogc3RyaW5nID0gdGhpcy5kZXRlcm1pbmVJbnB1dFR5cGUoZmllbGQpIHx8IGZpZWxkLnR5cGU7XG4gICAgbGV0IGNvbnRyb2w6IGFueTtcbiAgICBjb25zdCBjb250cm9sQ29uZmlnOiBOb3ZvQ29udHJvbENvbmZpZyA9IHtcbiAgICAgIG1ldGFUeXBlOiBmaWVsZC50eXBlLFxuICAgICAgdHlwZSxcbiAgICAgIGtleTogZmllbGQubmFtZSxcbiAgICAgIGxhYmVsOiBmaWVsZC5sYWJlbCxcbiAgICAgIHBsYWNlaG9sZGVyOiBmaWVsZC5oaW50IHx8ICcnLFxuICAgICAgcmVxdWlyZWQ6IGZpZWxkLnJlcXVpcmVkIHx8IGZpZWxkLnN5c3RlbVJlcXVpcmVkLFxuICAgICAgaGlkZGVuOiAhZmllbGQucmVxdWlyZWQsXG4gICAgICBlbmNyeXB0ZWQ6IHRoaXMuaXNGaWVsZEVuY3J5cHRlZChmaWVsZC5uYW1lID8gZmllbGQubmFtZS50b1N0cmluZygpIDogJycpLFxuICAgICAgdmFsdWU6IGZpZWxkLnZhbHVlIHx8IGZpZWxkLmRlZmF1bHRWYWx1ZSxcbiAgICAgIHNvcnRPcmRlcjogZmllbGQuc29ydE9yZGVyLFxuICAgICAgYXNzb2NpYXRlZEVudGl0eTogZmllbGQuYXNzb2NpYXRlZEVudGl0eSxcbiAgICAgIG9wdGlvbnNUeXBlOiBmaWVsZC5vcHRpb25zVHlwZSxcbiAgICAgIG11bHRpcGxlOiBmaWVsZC5tdWx0aVZhbHVlLFxuICAgICAgcmVhZE9ubHk6ICEhZmllbGQuZGlzYWJsZWQgfHwgISFmaWVsZC5yZWFkT25seSxcbiAgICAgIGRpc2FibGVkOiBmaWVsZC5kaXNhYmxlZCxcbiAgICAgIG1heGxlbmd0aDogZmllbGQubWF4TGVuZ3RoLFxuICAgICAgaW50ZXJhY3Rpb25zOiBmaWVsZC5pbnRlcmFjdGlvbnMsXG4gICAgICBkYXRhU3BlY2lhbGl6YXRpb246IGZpZWxkLmRhdGFTcGVjaWFsaXphdGlvbixcbiAgICAgIGRhdGFUeXBlOiBmaWVsZC5kYXRhVHlwZSxcbiAgICAgIGRlc2NyaXB0aW9uOiBmaWVsZC5kZXNjcmlwdGlvbiB8fCAnJyxcbiAgICAgIHRvb2x0aXA6IGZpZWxkLnRvb2x0aXAsXG4gICAgICB0b29sdGlwUG9zaXRpb246IGZpZWxkLnRvb2x0aXBQb3NpdGlvbixcbiAgICAgIGN1c3RvbUNvbnRyb2w6IGZpZWxkLmN1c3RvbUNvbnRyb2wsXG4gICAgICB0ZW1wbGF0ZTogZmllbGQudGVtcGxhdGUsXG4gICAgICBjdXN0b21Db250cm9sQ29uZmlnOiBmaWVsZC5jdXN0b21Db250cm9sQ29uZmlnLFxuICAgICAgcmVzdHJpY3RGaWVsZEludGVyYWN0aW9uczogZmllbGQucmVzdHJpY3RGaWVsZEludGVyYWN0aW9ucyxcbiAgICAgIHZhbGlkYXRvcnM6IGZpZWxkLnZhbGlkYXRvcnMsXG4gICAgICB3YXJuaW5nOiBmaWVsZC53YXJuaW5nLFxuICAgICAgY29uZmlnOiBmaWVsZC5jb25maWcgfHwge30sXG4gICAgICBjbG9zZU9uU2VsZWN0OiBmaWVsZC5jbG9zZU9uU2VsZWN0LFxuICAgICAgbGF5b3V0T3B0aW9uczogZmllbGQubGF5b3V0T3B0aW9ucyxcbiAgICB9O1xuICAgIHRoaXMuaW5mZXJEYXRlUmFuZ2UoY29udHJvbENvbmZpZywgZmllbGQpO1xuICAgIC8vIFRPRE86IGdldENvbnRyb2xPcHRpb25zIHNob3VsZCBhbHdheXMgcmV0dXJuIHRoZSBjb3JyZWN0IGZvcm1hdFxuICAgIGNvbnN0IG9wdGlvbnNDb25maWcgPSB0aGlzLmdldENvbnRyb2xPcHRpb25zKGZpZWxkLCBodHRwLCBjb25maWcsIGZpZWxkRGF0YSk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9uc0NvbmZpZykgJiYgISh0eXBlID09PSAnY2hpcHMnIHx8IHR5cGUgPT09ICdwaWNrZXInKSkge1xuICAgICAgY29udHJvbENvbmZpZy5vcHRpb25zID0gb3B0aW9uc0NvbmZpZztcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9uc0NvbmZpZykgJiYgKHR5cGUgPT09ICdjaGlwcycgfHwgdHlwZSA9PT0gJ3BpY2tlcicpKSB7XG4gICAgICBjb250cm9sQ29uZmlnLmNvbmZpZyA9IHtcbiAgICAgICAgb3B0aW9uczogb3B0aW9uc0NvbmZpZyxcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChvcHRpb25zQ29uZmlnKSB7XG4gICAgICBjb250cm9sQ29uZmlnLmNvbmZpZyA9IHtcbiAgICAgICAgLi4ub3B0aW9uc0NvbmZpZyxcbiAgICAgICAgLi4uKGNvbnRyb2xDb25maWcgJiYgY29udHJvbENvbmZpZy5jb25maWcpLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAodHlwZSA9PT0gJ3llYXInKSB7XG4gICAgICBjb250cm9sQ29uZmlnLm1heGxlbmd0aCA9IDQ7XG4gICAgfVxuICAgIC8vIFRPRE86IE92ZXJyaWRlcyBzaG91bGQgYmUgYW4gaXRlcmFibGUgb2YgYWxsIHByb3BlcnRpZXMgKHBvdGVudGlhbGx5IGEgcHJpdmF0ZSBtZXRob2QpXG4gICAgbGV0IG92ZXJyaWRlUmVzdWx0c1RlbXBsYXRlO1xuICAgIGxldCBvdmVycmlkZVByZXZpZXdUZW1wbGF0ZTtcbiAgICBpZiAob3ZlcnJpZGVzICYmIG92ZXJyaWRlc1tmaWVsZC5uYW1lXSkge1xuICAgICAgaWYgKG92ZXJyaWRlc1tmaWVsZC5uYW1lXS5yZXN1bHRzVGVtcGxhdGUpIHtcbiAgICAgICAgb3ZlcnJpZGVSZXN1bHRzVGVtcGxhdGUgPSBvdmVycmlkZXNbZmllbGQubmFtZV0ucmVzdWx0c1RlbXBsYXRlO1xuICAgICAgICBjb250cm9sQ29uZmlnLmNvbmZpZy5yZXN1bHRzVGVtcGxhdGUgPSBvdmVycmlkZVJlc3VsdHNUZW1wbGF0ZTtcbiAgICAgICAgZGVsZXRlIG92ZXJyaWRlc1tmaWVsZC5uYW1lXS5yZXN1bHRzVGVtcGxhdGU7XG4gICAgICB9XG4gICAgICBpZiAob3ZlcnJpZGVzW2ZpZWxkLm5hbWVdLm92ZXJyaWRlUHJldmlld1RlbXBsYXRlKSB7XG4gICAgICAgIG92ZXJyaWRlUmVzdWx0c1RlbXBsYXRlID0gb3ZlcnJpZGVzW2ZpZWxkLm5hbWVdLm92ZXJyaWRlUHJldmlld1RlbXBsYXRlO1xuICAgICAgICBjb250cm9sQ29uZmlnLmNvbmZpZy5vdmVycmlkZVByZXZpZXdUZW1wbGF0ZSA9IG92ZXJyaWRlUmVzdWx0c1RlbXBsYXRlO1xuICAgICAgICBkZWxldGUgb3ZlcnJpZGVzW2ZpZWxkLm5hbWVdLm92ZXJyaWRlUHJldmlld1RlbXBsYXRlO1xuICAgICAgfVxuICAgICAgaWYgKG92ZXJyaWRlc1tmaWVsZC5uYW1lXS5waWNrZXJDYWxsYmFjaykge1xuICAgICAgICBjb250cm9sQ29uZmlnLmNvbmZpZy5jYWxsYmFjayA9IG92ZXJyaWRlc1tmaWVsZC5uYW1lXS5waWNrZXJDYWxsYmFjaztcbiAgICAgIH1cbiAgICAgIGlmIChvdmVycmlkZXNbZmllbGQubmFtZV0udHlwZSkge1xuICAgICAgICB0eXBlID0gb3ZlcnJpZGVzW2ZpZWxkLm5hbWVdLnR5cGU7XG4gICAgICB9XG4gICAgICBpZiAob3ZlcnJpZGVzW2ZpZWxkLm5hbWVdLmNvbHVtbnMpIHtcbiAgICAgICAgY29udHJvbENvbmZpZy5jb25maWcuY29sdW1ucyA9IG92ZXJyaWRlc1tmaWVsZC5uYW1lXS5jb2x1bW5zO1xuICAgICAgICBjb250cm9sQ29uZmlnLmNsb3NlT25TZWxlY3QgPSB0cnVlO1xuICAgICAgICBkZWxldGUgY29udHJvbENvbmZpZy5sYWJlbDtcbiAgICAgIH1cbiAgICAgIGlmIChvdmVycmlkZXNbZmllbGQubmFtZV0ud2FybmluZykge1xuICAgICAgICBjb250cm9sQ29uZmlnLndhcm5pbmcgPSBvdmVycmlkZXNbZmllbGQubmFtZV0ud2FybmluZztcbiAgICAgIH1cbiAgICAgIE9iamVjdC5hc3NpZ24oY29udHJvbENvbmZpZywgb3ZlcnJpZGVzW2ZpZWxkLm5hbWVdKTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2VudGl0eWNoaXBzJzpcbiAgICAgICAgLy8gVE9ETzogVGhpcyBkb2Vzbid0IGJlbG9uZyBpbiB0aGlzIGNvZGViYXNlXG4gICAgICAgIGNvbnRyb2xDb25maWcubXVsdGlwbGUgPSB0cnVlO1xuICAgICAgICBjb250cm9sQ29uZmlnLmNvbmZpZy5yZXN1bHRzVGVtcGxhdGUgPSBvdmVycmlkZVJlc3VsdHNUZW1wbGF0ZSB8fCBFbnRpdHlQaWNrZXJSZXN1bHRzO1xuICAgICAgICBjb250cm9sQ29uZmlnLmNvbmZpZy5wcmV2aWV3VGVtcGxhdGUgPSBvdmVycmlkZVByZXZpZXdUZW1wbGF0ZSB8fCBFbnRpdHlQaWNrZXJSZXN1bHQ7XG4gICAgICAgIC8vIFRPRE86IFdoZW4gYXBwZW5kVG9Cb2R5IHBpY2tlciB3b3JrcyBiZXR0ZXIgaW4gdGFibGUvZm9ybVxuICAgICAgICBjb250cm9sID0gbmV3IFBpY2tlckNvbnRyb2woY29udHJvbENvbmZpZyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY2hpcHMnOlxuICAgICAgICBjb250cm9sQ29uZmlnLm11bHRpcGxlID0gdHJ1ZTtcbiAgICAgICAgLy8gVE9ETzogV2hlbiBhcHBlbmRUb0JvZHkgcGlja2VyIHdvcmtzIGJldHRlciBpbiB0YWJsZS9mb3JtXG4gICAgICAgIGNvbnRyb2wgPSBuZXcgUGlja2VyQ29udHJvbChjb250cm9sQ29uZmlnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdlbnRpdHlwaWNrZXInOlxuICAgICAgICAvLyBUT0RPOiBUaGlzIGRvZXNuJ3QgYmVsb25nIGluIHRoaXMgY29kZWJhc2VcbiAgICAgICAgY29udHJvbENvbmZpZy5jb25maWcucmVzdWx0c1RlbXBsYXRlID0gb3ZlcnJpZGVSZXN1bHRzVGVtcGxhdGUgfHwgRW50aXR5UGlja2VyUmVzdWx0cztcbiAgICAgICAgLy8gVE9ETzogV2hlbiBhcHBlbmRUb0JvZHkgcGlja2VyIHdvcmtzIGJldHRlciBpbiB0YWJsZS9mb3JtXG4gICAgICAgIGNvbnRyb2wgPSBuZXcgUGlja2VyQ29udHJvbChjb250cm9sQ29uZmlnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdwaWNrZXInOlxuICAgICAgICAvLyBUT0RPOiBXaGVuIGFwcGVuZFRvQm9keSBwaWNrZXIgd29ya3MgYmV0dGVyIGluIHRhYmxlL2Zvcm1cbiAgICAgICAgY29udHJvbCA9IG5ldyBQaWNrZXJDb250cm9sKGNvbnRyb2xDb25maWcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2RhdGV0aW1lJzpcbiAgICAgICAgY29udHJvbENvbmZpZy5taWxpdGFyeSA9IGNvbmZpZyA/ICEhY29uZmlnLm1pbGl0YXJ5IDogZmFsc2U7XG4gICAgICAgIGNvbnRyb2xDb25maWcud2Vla1N0YXJ0ID0gY29uZmlnICYmIGNvbmZpZy53ZWVrU3RhcnQgPyBjb25maWcud2Vla1N0YXJ0IDogMDtcbiAgICAgICAgY29udHJvbCA9IG5ldyBEYXRlVGltZUNvbnRyb2woY29udHJvbENvbmZpZyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgIGNvbnRyb2xDb25maWcuZGF0ZUZvcm1hdCA9IGZpZWxkLmRhdGVGb3JtYXQ7XG4gICAgICAgIGNvbnRyb2xDb25maWcudGV4dE1hc2tFbmFibGVkID0gZmllbGQudGV4dE1hc2tFbmFibGVkO1xuICAgICAgICBjb250cm9sQ29uZmlnLmFsbG93SW52YWxpZERhdGUgPSBmaWVsZC5hbGxvd0ludmFsaWREYXRlO1xuICAgICAgICBjb250cm9sQ29uZmlnLm1pbGl0YXJ5ID0gY29uZmlnID8gISFjb25maWcubWlsaXRhcnkgOiBmYWxzZTtcbiAgICAgICAgY29udHJvbENvbmZpZy53ZWVrU3RhcnQgPSBjb25maWcgJiYgY29uZmlnLndlZWtTdGFydCA/IGNvbmZpZy53ZWVrU3RhcnQgOiAwO1xuICAgICAgICBjb250cm9sID0gbmV3IERhdGVDb250cm9sKGNvbnRyb2xDb25maWcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RpbWUnOlxuICAgICAgICBjb250cm9sQ29uZmlnLm1pbGl0YXJ5ID0gY29uZmlnID8gISFjb25maWcubWlsaXRhcnkgOiBmYWxzZTtcbiAgICAgICAgY29udHJvbCA9IG5ldyBUaW1lQ29udHJvbChjb250cm9sQ29uZmlnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICduYXRpdmUtdGltZSc6XG4gICAgICBjYXNlICduYXRpdmUtZGF0ZSc6XG4gICAgICBjYXNlICduYXRpdmUtd2Vlayc6XG4gICAgICBjYXNlICduYXRpdmUteWVhcic6XG4gICAgICBjYXNlICduYXRpdmUtZGF0ZXRpbWUtbG9jYWwnOlxuICAgICAgY2FzZSAnbmF0aXZlLXRlbCc6XG4gICAgICBjYXNlICduYXRpdmUtZW1haWwnOlxuICAgICAgY2FzZSAnbmF0aXZlLXVybCc6XG4gICAgICBjYXNlICduYXRpdmUtbnVtYmVyJzpcbiAgICAgICAgY29udHJvbCA9IG5ldyBDdXN0b21Db250cm9sKHsgLi4uY29udHJvbENvbmZpZywgdGVtcGxhdGU6ICduYXRpdmUtaW5wdXQnLCB0eXBlOiB0eXBlLnJlcGxhY2UoJ25hdGl2ZS0nLCAnJyksIGFsd2F5c0FjdGl2ZTogdHJ1ZSB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0aW1lem9uZSc6XG4gICAgICAgIGNvbnRyb2wgPSBuZXcgVGltZXpvbmVDb250cm9sKGNvbnRyb2xDb25maWcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2N1cnJlbmN5JzpcbiAgICAgIGNhc2UgJ21vbmV5JzpcbiAgICAgIGNhc2UgJ2VtYWlsJzpcbiAgICAgIGNhc2UgJ3BlcmNlbnRhZ2UnOlxuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ3llYXInOlxuICAgICAgICAvLyBUT0RPOiBPbmx5IHR5cGVzIGZyb20gYGRldGVybWluZUlucHV0VHlwZWAgc2hvdWxkIGJlIHVzZWQgaW4gdGhpcyBjbGFzc1xuICAgICAgICBpZiAodHlwZSA9PT0gJ21vbmV5Jykge1xuICAgICAgICAgIHR5cGUgPSAnY3VycmVuY3knO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRyb2xDb25maWcudHlwZSA9IHR5cGU7XG4gICAgICAgIGNvbnRyb2wgPSBuZXcgVGV4dEJveENvbnRyb2woY29udHJvbENvbmZpZyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndGV4dCc6XG4gICAgICAgIGNvbnRyb2wgPSBuZXcgVGV4dEJveENvbnRyb2woY29udHJvbENvbmZpZyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndGV4dGFyZWEnOlxuICAgICAgICBjb250cm9sID0gbmV3IFRleHRBcmVhQ29udHJvbChjb250cm9sQ29uZmlnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdlZGl0b3InOlxuICAgICAgICBjb250cm9sID0gbmV3IEVkaXRvckNvbnRyb2woY29udHJvbENvbmZpZyk7XG4gICAgICAgIGlmIChjb250cm9sQ29uZmlnLnRlbXBsYXRlKSB7IGNvbnRyb2wuY29udHJvbFR5cGUgPSBjb250cm9sQ29uZmlnLnRlbXBsYXRlIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdlZGl0b3ItbWluaW1hbCc6XG4gICAgICAgIGNvbnRyb2wgPSBuZXcgRWRpdG9yQ29udHJvbChjb250cm9sQ29uZmlnKTtcbiAgICAgICAgY29udHJvbC5taW5pbWFsID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0aWxlcyc6XG4gICAgICAgIGNvbnRyb2wgPSBuZXcgVGlsZXNDb250cm9sKGNvbnRyb2xDb25maWcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NoZWNrYm94JzpcbiAgICAgICAgY29udHJvbENvbmZpZy5jaGVja2JveExhYmVsID0gZmllbGQuY2hlY2tib3hMYWJlbDtcbiAgICAgICAgY29udHJvbCA9IG5ldyBDaGVja2JveENvbnRyb2woY29udHJvbENvbmZpZyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc3dpdGNoJzpcbiAgICAgICAgY29udHJvbCA9IG5ldyBTd2l0Y2hDb250cm9sKGNvbnRyb2xDb25maWcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NoZWNrbGlzdCc6XG4gICAgICAgIGNvbnRyb2wgPSBuZXcgQ2hlY2tMaXN0Q29udHJvbChjb250cm9sQ29uZmlnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyYWRpbyc6XG4gICAgICAgIGNvbnRyb2wgPSBuZXcgUmFkaW9Db250cm9sKGNvbnRyb2xDb25maWcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICAgIGNvbnRyb2wgPSBuZXcgU2VsZWN0Q29udHJvbChjb250cm9sQ29uZmlnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdhZGRyZXNzJzpcbiAgICAgICAgY29udHJvbENvbmZpZy5yZXF1aXJlZCA9IGZpZWxkLnJlcXVpcmVkIHx8IGZhbHNlO1xuICAgICAgICBpZiAoSGVscGVycy5pc0JsYW5rKGNvbnRyb2xDb25maWcuY29uZmlnKSkge1xuICAgICAgICAgIGNvbnRyb2xDb25maWcuY29uZmlnID0ge307XG4gICAgICAgIH1cbiAgICAgICAgY29udHJvbENvbmZpZy5jb25maWcucmVxdWlyZWQgPSBmaWVsZC5yZXF1aXJlZDtcbiAgICAgICAgY29udHJvbENvbmZpZy5jb25maWcucmVhZE9ubHkgPSBjb250cm9sQ29uZmlnLnJlYWRPbmx5O1xuICAgICAgICBpZiAoZmllbGQuZmllbGRzICYmIGZpZWxkLmZpZWxkcy5sZW5ndGgpIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IHN1YmZpZWxkIG9mIGZpZWxkLmZpZWxkcykge1xuICAgICAgICAgICAgY29udHJvbENvbmZpZy5jb25maWdbc3ViZmllbGQubmFtZV0gPSB7XG4gICAgICAgICAgICAgIHJlcXVpcmVkOiAhIXN1YmZpZWxkLnJlcXVpcmVkLFxuICAgICAgICAgICAgICBoaWRkZW46ICEhc3ViZmllbGQucmVhZE9ubHksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKCFIZWxwZXJzLmlzRW1wdHkoc3ViZmllbGQubGFiZWwpKSB7XG4gICAgICAgICAgICAgIGNvbnRyb2xDb25maWcuY29uZmlnW3N1YmZpZWxkLm5hbWVdLmxhYmVsID0gc3ViZmllbGQubGFiZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIUhlbHBlcnMuaXNFbXB0eShzdWJmaWVsZC5tYXhMZW5ndGgpKSB7XG4gICAgICAgICAgICAgIGNvbnRyb2xDb25maWcuY29uZmlnW3N1YmZpZWxkLm5hbWVdLm1heGxlbmd0aCA9IHN1YmZpZWxkLm1heExlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRyb2xDb25maWcucmVxdWlyZWQgPSBjb250cm9sQ29uZmlnLnJlcXVpcmVkIHx8IHN1YmZpZWxkLnJlcXVpcmVkO1xuICAgICAgICAgICAgaWYgKHN1YmZpZWxkLmRlZmF1bHRWYWx1ZSkge1xuICAgICAgICAgICAgICBpZiAoSGVscGVycy5pc0JsYW5rKGNvbnRyb2xDb25maWcudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgY29udHJvbENvbmZpZy52YWx1ZSA9IHt9O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnRyb2xDb25maWcudmFsdWVbc3ViZmllbGQubmFtZV0gPSBzdWJmaWVsZC5kZWZhdWx0VmFsdWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN1YmZpZWxkLm5hbWUgPT09ICdjb3VudHJ5SUQnKSB7XG4gICAgICAgICAgICAgIGlmIChIZWxwZXJzLmlzQmxhbmsoY29udHJvbENvbmZpZy52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBjb250cm9sQ29uZmlnLnZhbHVlID0ge307XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29udHJvbENvbmZpZy52YWx1ZVtzdWJmaWVsZC5uYW1lXSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3ViZmllbGQubmFtZSA9PT0gJ3N0YXRlJyB8fCBzdWJmaWVsZC5uYW1lID09PSAnY291bnRyeUlEJykge1xuICAgICAgICAgICAgICBpZiAoc3ViZmllbGQubmFtZSA9PT0gJ2NvdW50cnlJRCcpIHtcbiAgICAgICAgICAgICAgICBzdWJmaWVsZC5vcHRpb25zVHlwZSA9ICdDb3VudHJ5JztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoIXN1YmZpZWxkLm9wdGlvbnNVcmwpIHtcbiAgICAgICAgICAgICAgICBzdWJmaWVsZC5vcHRpb25zVXJsID0gYG9wdGlvbnMvJHtzdWJmaWVsZC5vcHRpb25zVHlwZX1gO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnRyb2xDb25maWcuY29uZmlnW3N1YmZpZWxkLm5hbWVdLnBpY2tlckNvbmZpZyA9IHRoaXMuZ2V0Q29udHJvbE9wdGlvbnMoc3ViZmllbGQsIGh0dHAsIGNvbmZpZywgZmllbGREYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29udHJvbENvbmZpZy5pc0VtcHR5ID0gdGhpcy5pc0FkZHJlc3NFbXB0eTtcbiAgICAgICAgY29udHJvbCA9IG5ldyBBZGRyZXNzQ29udHJvbChjb250cm9sQ29uZmlnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdmaWxlJzpcbiAgICAgICAgY29udHJvbCA9IG5ldyBGaWxlQ29udHJvbChjb250cm9sQ29uZmlnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjdXN0b20nOlxuICAgICAgICBjb250cm9sID0gbmV3IEN1c3RvbUNvbnRyb2woY29udHJvbENvbmZpZyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29udHJvbCA9IG5ldyBUZXh0Qm94Q29udHJvbChjb250cm9sQ29uZmlnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiBjb250cm9sO1xuICB9XG5cbiAgcHJpdmF0ZSBzaG91bGRDcmVhdGVDb250cm9sKGZpZWxkKTogYm9vbGVhbiB7XG4gICAgaWYgKGZpZWxkLnN5c3RlbVJlcXVpcmVkKSB7XG4gICAgICBmaWVsZC5yZWFkT25seSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICBmaWVsZC5uYW1lICE9PSAnaWQnICYmXG4gICAgICAoIVsnU1lTVEVNJywgJ1NFQ1RJT05fSEVBREVSJ10uaW5jbHVkZXMoZmllbGQuZGF0YVNwZWNpYWxpemF0aW9uKSB8fFxuICAgICAgICBbJ2FkZHJlc3MnLCAnYmlsbGluZ0FkZHJlc3MnLCAnc2Vjb25kYXJ5QWRkcmVzcyddLmluY2x1ZGVzKGZpZWxkLm5hbWUpKSAmJlxuICAgICAgIWZpZWxkLnJlYWRPbmx5XG4gICAgKTtcbiAgfVxuXG4gIHRvQ29udHJvbHMoXG4gICAgbWV0YSxcbiAgICBjdXJyZW5jeUZvcm1hdCxcbiAgICBodHRwLFxuICAgIGNvbmZpZzogeyB0b2tlbj86IHN0cmluZzsgcmVzdFVybD86IHN0cmluZzsgbWlsaXRhcnk/OiBib29sZWFuOyB3ZWVrU3RhcnQ/OiBudW1iZXIgfSxcbiAgICBvdmVycmlkZXM/OiBhbnksXG4gICAgZm9yVGFibGU6IGJvb2xlYW4gPSBmYWxzZSxcbiAgKSB7XG4gICAgY29uc3QgY29udHJvbHMgPSBbXTtcbiAgICBpZiAobWV0YSAmJiBtZXRhLmZpZWxkcykge1xuICAgICAgY29uc3QgZmllbGRzID0gbWV0YS5maWVsZHM7XG4gICAgICBmaWVsZHMuZm9yRWFjaCgoZmllbGQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc2hvdWxkQ3JlYXRlQ29udHJvbChmaWVsZCkpIHtcbiAgICAgICAgICBjb25zdCBjb250cm9sID0gdGhpcy5nZXRDb250cm9sRm9yRmllbGQoZmllbGQsIGh0dHAsIGNvbmZpZywgb3ZlcnJpZGVzLCBmb3JUYWJsZSk7XG4gICAgICAgICAgLy8gU2V0IGN1cnJlbmN5IGZvcm1hdFxuICAgICAgICAgIGlmIChjb250cm9sLnN1YlR5cGUgPT09ICdjdXJyZW5jeScpIHtcbiAgICAgICAgICAgIGNvbnRyb2wuY3VycmVuY3lGb3JtYXQgPSBjdXJyZW5jeUZvcm1hdDtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gQWRkIHRvIGNvbnRyb2xzXG4gICAgICAgICAgY29udHJvbHMucHVzaChjb250cm9sKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBjb250cm9scztcbiAgfVxuXG4gIHRvVGFibGVDb250cm9scyhtZXRhLCBjdXJyZW5jeUZvcm1hdCwgaHR0cCwgY29uZmlnOiB7IHRva2VuPzogc3RyaW5nOyByZXN0VXJsPzogc3RyaW5nOyBtaWxpdGFyeT86IGJvb2xlYW4gfSwgb3ZlcnJpZGVzPzogYW55KSB7XG4gICAgY29uc3QgY29udHJvbHMgPSB0aGlzLnRvQ29udHJvbHMobWV0YSwgY3VycmVuY3lGb3JtYXQsIGh0dHAsIGNvbmZpZywgb3ZlcnJpZGVzLCB0cnVlKTtcbiAgICBjb25zdCByZXQgPSB7fTtcbiAgICBjb250cm9scy5mb3JFYWNoKChjb250cm9sOiBCYXNlQ29udHJvbCkgPT4ge1xuICAgICAgcmV0W2NvbnRyb2wua2V5XSA9IHtcbiAgICAgICAgZWRpdG9yVHlwZTogY29udHJvbC5fX3R5cGUsXG4gICAgICAgIGVkaXRvckNvbmZpZzogY29udHJvbC5fX2NvbmZpZyxcbiAgICAgIH07XG4gICAgfSk7XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIHRvRmllbGRTZXRzKFxuICAgIG1ldGEsXG4gICAgY3VycmVuY3lGb3JtYXQsXG4gICAgaHR0cCxcbiAgICBjb25maWc6IHsgdG9rZW4/OiBzdHJpbmc7IHJlc3RVcmw/OiBzdHJpbmc7IG1pbGl0YXJ5PzogYm9vbGVhbjsgd2Vla1N0YXJ0PzogbnVtYmVyIH0sXG4gICAgb3ZlcnJpZGVzPyxcbiAgICBkYXRhPzogeyBba2V5OiBzdHJpbmddOiBhbnkgfSxcbiAgKSB7XG4gICAgY29uc3QgZmllbGRzZXRzOiBBcnJheTxOb3ZvRmllbGRzZXQ+ID0gW107XG4gICAgbGV0IGZvcm1GaWVsZHMgPSBbXTtcblxuICAgIGlmIChtZXRhICYmIG1ldGEuZmllbGRzKSB7XG4gICAgICBmb3JtRmllbGRzID0gdGhpcy5nZXRGb3JtRmllbGRzKG1ldGEpO1xuXG4gICAgICBmb3JtRmllbGRzLmZvckVhY2goKGZpZWxkKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmlzSGVhZGVyKGZpZWxkKSkge1xuICAgICAgICAgIGlmIChmaWVsZC5lbmFibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmluc2VydEhlYWRlclRvRmllbGRzZXRzKGZpZWxkc2V0cywgZmllbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzRW1iZWRkZWRGaWVsZChmaWVsZCkpIHtcbiAgICAgICAgICB0aGlzLmluc2VydEhlYWRlclRvRmllbGRzZXRzKGZpZWxkc2V0cywgZmllbGQpO1xuXG4gICAgICAgICAgY29uc3QgZW1iZWRkZWRGaWVsZHMgPSB0aGlzLmdldEVtYmVkZGVkRmllbGRzKGZpZWxkKTtcblxuICAgICAgICAgIGVtYmVkZGVkRmllbGRzLmZvckVhY2goKGVtYmVkZGVkRmllbGQpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNob3VsZENyZWF0ZUNvbnRyb2woZW1iZWRkZWRGaWVsZCkpIHtcbiAgICAgICAgICAgICAgbGV0IGNvbnRyb2wgPSB0aGlzLmNyZWF0ZUNvbnRyb2woZW1iZWRkZWRGaWVsZCwgZGF0YSwgaHR0cCwgY29uZmlnLCBvdmVycmlkZXMsIGN1cnJlbmN5Rm9ybWF0KTtcbiAgICAgICAgICAgICAgY29udHJvbCA9IHRoaXMubWFya0NvbnRyb2xBc0VtYmVkZGVkKGNvbnRyb2wsIGZpZWxkLmRhdGFTcGVjaWFsaXphdGlvbiA/IGZpZWxkLmRhdGFTcGVjaWFsaXphdGlvbi50b0xvd2VyQ2FzZSgpIDogbnVsbCk7XG4gICAgICAgICAgICAgIGZpZWxkc2V0c1tmaWVsZHNldHMubGVuZ3RoIC0gMV0uY29udHJvbHMucHVzaChjb250cm9sKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0hlYWRlcihlbWJlZGRlZEZpZWxkKSkge1xuICAgICAgICAgICAgICB0aGlzLmluc2VydEhlYWRlclRvRmllbGRzZXRzKGZpZWxkc2V0cywgZW1iZWRkZWRGaWVsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zaG91bGRDcmVhdGVDb250cm9sKGZpZWxkKSkge1xuICAgICAgICAgIGxldCBjb250cm9sID0gdGhpcy5jcmVhdGVDb250cm9sKGZpZWxkLCBkYXRhLCBodHRwLCBjb25maWcsIG92ZXJyaWRlcywgY3VycmVuY3lGb3JtYXQpO1xuICAgICAgICAgIGlmIChmaWVsZC5pbmxpbmVFbWJlZGRlZEFzc29jaWF0ZWRFbnRpdHlGaWVsZCkge1xuICAgICAgICAgICAgY29udHJvbCA9IHRoaXMubWFya0NvbnRyb2xBc0VtYmVkZGVkKGNvbnRyb2wsICdpbmxpbmVfZW1iZWRkZWQnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoZmllbGRzZXRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgZmllbGRzZXRzLnB1c2goeyBjb250cm9sczogW10gfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZmllbGRzZXRzW2ZpZWxkc2V0cy5sZW5ndGggLSAxXS5jb250cm9scy5wdXNoKGNvbnRyb2wpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGZpZWxkc2V0cy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gZmllbGRzZXRzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW1xuICAgICAgICB7XG4gICAgICAgICAgY29udHJvbHM6IHRoaXMudG9Db250cm9scyhtZXRhLCBjdXJyZW5jeUZvcm1hdCwgaHR0cCwgY29uZmlnKSxcbiAgICAgICAgfSxcbiAgICAgIF07XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpc0VtYmVkZGVkRmllbGQoZmllbGQpIHtcbiAgICByZXR1cm4gZmllbGQuZGF0YVNwZWNpYWxpemF0aW9uICYmIFsnZW1iZWRkZWQnXS5pbmNsdWRlcyhmaWVsZC5kYXRhU3BlY2lhbGl6YXRpb24udG9Mb3dlckNhc2UoKSkgJiYgIWZpZWxkLnJlYWRPbmx5O1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVDb250cm9sKGZpZWxkLCBkYXRhLCBodHRwLCBjb25maWcsIG92ZXJyaWRlcywgY3VycmVuY3lGb3JtYXQpIHtcbiAgICBjb25zdCBmaWVsZERhdGEgPSB0aGlzLmlzRW1iZWRkZWRGaWVsZERhdGEoZmllbGQsIGRhdGEpID8gdGhpcy5nZXRFbWJlZGRlZEZpZWxkRGF0YShmaWVsZCwgZGF0YSkgOiB0aGlzLmdldEZpZWxkRGF0YShmaWVsZCwgZGF0YSk7XG4gICAgY29uc3QgY29udHJvbCA9IHRoaXMuZ2V0Q29udHJvbEZvckZpZWxkKGZpZWxkLCBodHRwLCBjb25maWcsIG92ZXJyaWRlcywgdW5kZWZpbmVkLCBmaWVsZERhdGEpO1xuICAgIC8vIFNldCBjdXJyZW5jeSBmb3JtYXRcbiAgICBpZiAoY29udHJvbC5zdWJUeXBlID09PSAnY3VycmVuY3knKSB7XG4gICAgICBjb250cm9sLmN1cnJlbmN5Rm9ybWF0ID0gY3VycmVuY3lGb3JtYXQ7XG4gICAgfVxuICAgIHJldHVybiBjb250cm9sO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0VtYmVkZGVkRmllbGREYXRhKGZpZWxkLCBkYXRhKSB7XG4gICAgcmV0dXJuIGRhdGEgJiYgZmllbGQubmFtZS5pbmNsdWRlcygnLicpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRGaWVsZERhdGEoZmllbGQsIGRhdGEpIHtcbiAgICByZXR1cm4gKGRhdGEgJiYgZGF0YVtmaWVsZC5uYW1lXSkgfHwgbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RW1iZWRkZWRGaWVsZERhdGEoZmllbGQsIGRhdGEpIHtcbiAgICBjb25zdCBbcGFyZW50RmllbGROYW1lLCBmaWVsZE5hbWVdID0gZmllbGQubmFtZS5zcGxpdCgnLicpO1xuICAgIHJldHVybiAoZGF0YSAmJiBkYXRhW3BhcmVudEZpZWxkTmFtZV0gJiYgZGF0YVtwYXJlbnRGaWVsZE5hbWVdW2ZpZWxkTmFtZV0pIHx8IG51bGw7XG4gIH1cblxuICBwcml2YXRlIGdldEZvcm1GaWVsZHMobWV0YSkge1xuICAgIGNvbnN0IHNlY3Rpb25IZWFkZXJzID0gbWV0YS5zZWN0aW9uSGVhZGVyc1xuICAgICAgPyBtZXRhLnNlY3Rpb25IZWFkZXJzLm1hcCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgIGVsZW1lbnQuaXNTZWN0aW9uSGVhZGVyID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgfSlcbiAgICAgIDogW107XG5cbiAgICBsZXQgZmllbGRzID0gbWV0YS5maWVsZHMubWFwKChmaWVsZCkgPT4ge1xuICAgICAgZmllbGQucGFyZW50RW50aXR5ID0gbWV0YS5lbnRpdHk7XG4gICAgICBpZiAoIWZpZWxkLmhhc093blByb3BlcnR5KCdzb3J0T3JkZXInKSkge1xuICAgICAgICBmaWVsZC5zb3J0T3JkZXIgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiAtIDE7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmllbGQ7XG4gICAgfSk7XG5cbiAgICAvLyBidWlsZCBsaXN0IG9mIGZpZWxkcyB0aGF0IHNob3VsZCBiZSBkaXNwbGF5ZWQgaW5saW5lIGJ1dCBiZWxvbmcgdG8gYXNzb2NpYXRlZCBlbnRpdGllc1xuICAgIGNvbnN0IGlubGluZUVtYmVkZGVkQXNzb2NpYXRlZEVudGl0eUZpZWxkcyA9IHRoaXMuZ2V0SW5saW5lRW1iZWRkZWRGaWVsZHMoZmllbGRzKTtcblxuICAgIC8vIHJlbW92ZSB0aGUgaW5saW5lIGVtYmVkZGVkIGZpZWxkcyBiZWNhdXNlIHRoZSBhc3NvY2lhdGVkIGVudGl0eSBmaWVsZHMgd2VyZSBleHRyYWN0ZWQgYWJvdmVcbiAgICAvLyBhbmQgd2lsbCBiZSBhZGRlZCB0byB0aGUgcmVndWxhciBsaXN0IG9mIGZpZWxkcy4gVGhpcyBwcmV2ZW50cyB0aGUgZmllbGRzIGZyb20gYmVpbmcgYWRkZWQgbXVsdGlwbGUgdGltZXMuXG4gICAgZmllbGRzID0gZmllbGRzLmZpbHRlcigoZikgPT4gIWYuZGF0YVNwZWNpYWxpemF0aW9uIHx8IGYuZGF0YVNwZWNpYWxpemF0aW9uLnRvTG93ZXJDYXNlKCkgIT09ICdpbmxpbmVfZW1iZWRkZWQnKTtcblxuICAgIC8vIHNvcnQgZmllbGRzXG4gICAgcmV0dXJuIFsuLi5zZWN0aW9uSGVhZGVycywgLi4uZmllbGRzLCAuLi5pbmxpbmVFbWJlZGRlZEFzc29jaWF0ZWRFbnRpdHlGaWVsZHNdLnNvcnQoSGVscGVycy5zb3J0QnlGaWVsZChbJ3NvcnRPcmRlcicsICduYW1lJ10pKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0SW5saW5lRW1iZWRkZWRGaWVsZHMoZmllbGRzKSB7XG4gICAgbGV0IGlubGluZUVtYmVkZGVkQXNzb2NpYXRlZEVudGl0eUZpZWxkcyA9IFtdO1xuICAgIGZpZWxkc1xuICAgICAgLmZpbHRlcigoZikgPT4gZi5kYXRhU3BlY2lhbGl6YXRpb24gJiYgZi5kYXRhU3BlY2lhbGl6YXRpb24udG9Mb3dlckNhc2UoKSA9PT0gJ2lubGluZV9lbWJlZGRlZCcpXG4gICAgICAuZm9yRWFjaCgoZikgPT4ge1xuICAgICAgICBpbmxpbmVFbWJlZGRlZEFzc29jaWF0ZWRFbnRpdHlGaWVsZHMgPSBbLi4uaW5saW5lRW1iZWRkZWRBc3NvY2lhdGVkRW50aXR5RmllbGRzLCAuLi50aGlzLmdldEFzc29jaWF0ZWRGaWVsZHNGb3JJbmxpbmVFbWJlZGRlZChmKV07XG4gICAgICB9KTtcbiAgICByZXR1cm4gaW5saW5lRW1iZWRkZWRBc3NvY2lhdGVkRW50aXR5RmllbGRzO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRBc3NvY2lhdGVkRmllbGRzRm9ySW5saW5lRW1iZWRkZWQoZmllbGQpIHtcbiAgICBsZXQgYXNzb2NpYXRlZEVudGl0eUZpZWxkcyA9IFtdO1xuICAgIGFzc29jaWF0ZWRFbnRpdHlGaWVsZHMgPSB0aGlzLmdldEVtYmVkZGVkRmllbGRzKGZpZWxkKS5tYXAoKGFlZikgPT4ge1xuICAgICAgYWVmLmlubGluZUVtYmVkZGVkQXNzb2NpYXRlZEVudGl0eUZpZWxkID0gdHJ1ZTtcbiAgICAgIHJldHVybiBhZWY7XG4gICAgfSk7XG4gICAgcmV0dXJuIGFzc29jaWF0ZWRFbnRpdHlGaWVsZHM7XG4gIH1cblxuICBwcml2YXRlIGdldEVtYmVkZGVkRmllbGRzKHN1YkhlYWRlcikge1xuICAgIHJldHVybiBzdWJIZWFkZXIuYXNzb2NpYXRlZEVudGl0eS5maWVsZHNcbiAgICAgIC5maWx0ZXIoKGZpZWxkKSA9PiBmaWVsZC5uYW1lICE9PSAnaWQnKVxuICAgICAgLm1hcCgoZmllbGQpID0+IHtcbiAgICAgICAgaWYgKCFmaWVsZC5uYW1lLnN0YXJ0c1dpdGgoYCR7c3ViSGVhZGVyLm5hbWV9LmApKSB7XG4gICAgICAgICAgZmllbGQubmFtZSA9IGAke3N1YkhlYWRlci5uYW1lfS4ke2ZpZWxkLm5hbWV9YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmllbGQ7XG4gICAgICB9KVxuICAgICAgLnNvcnQoSGVscGVycy5zb3J0QnlGaWVsZChbJ3NvcnRPcmRlcicsICduYW1lJ10pKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNIZWFkZXIoZmllbGQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgIUhlbHBlcnMuaXNCbGFuayhmaWVsZCkgJiZcbiAgICAgICgoZmllbGQuaGFzT3duUHJvcGVydHkoJ2lzU2VjdGlvbkhlYWRlcicpICYmIGZpZWxkLmlzU2VjdGlvbkhlYWRlcikgfHxcbiAgICAgICAgKGZpZWxkLmRhdGFTcGVjaWFsaXphdGlvbiAmJiBmaWVsZC5kYXRhU3BlY2lhbGl6YXRpb24udG9Mb3dlckNhc2UoKSA9PT0gJ3NlY3Rpb25faGVhZGVyJykpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5zZXJ0SGVhZGVyVG9GaWVsZHNldHMoZmllbGRzZXRzLCBmaWVsZCkge1xuICAgIGNvbnN0IGNvbnN0YW50UHJvcGVydGllcyA9IHtcbiAgICAgIGNvbnRyb2xzOiBbXSxcbiAgICAgIGlzRW1iZWRkZWQ6IGZpZWxkLmRhdGFTcGVjaWFsaXphdGlvbiAmJiBmaWVsZC5kYXRhU3BlY2lhbGl6YXRpb24udG9Mb3dlckNhc2UoKSA9PT0gJ2VtYmVkZGVkJyxcbiAgICAgIGlzSW5saW5lRW1iZWRkZWQ6IGZpZWxkLmRhdGFTcGVjaWFsaXphdGlvbiAmJiBmaWVsZC5kYXRhU3BlY2lhbGl6YXRpb24udG9Mb3dlckNhc2UoKSA9PT0gJ2lubGluZV9lbWJlZGRlZCcsXG4gICAgICBrZXk6IGZpZWxkLm5hbWUsXG4gICAgfTtcbiAgICBpZiAoZmllbGQubmFtZSAmJiBmaWVsZC5uYW1lLnN0YXJ0c1dpdGgoJ2N1c3RvbU9iamVjdCcpICYmIGZpZWxkLmFzc29jaWF0ZWRFbnRpdHkgJiYgZmllbGQuYXNzb2NpYXRlZEVudGl0eS5sYWJlbCkge1xuICAgICAgZmllbGRzZXRzLnB1c2goe1xuICAgICAgICB0aXRsZTogZmllbGQuYXNzb2NpYXRlZEVudGl0eS5sYWJlbCB8fCBmaWVsZC5sYWJlbCxcbiAgICAgICAgaWNvbjogZmllbGQuaWNvbiB8fCAnYmhpLWNhcmQtZXhwYW5kJyxcbiAgICAgICAgLi4uY29uc3RhbnRQcm9wZXJ0aWVzLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpZWxkc2V0cy5wdXNoKHtcbiAgICAgICAgdGl0bGU6IGZpZWxkLmxhYmVsLFxuICAgICAgICBpY29uOiBmaWVsZC5pY29uIHx8ICdiaGktc2VjdGlvbicsXG4gICAgICAgIC4uLmNvbnN0YW50UHJvcGVydGllcyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbWFya0NvbnRyb2xBc0VtYmVkZGVkKGNvbnRyb2wsIGRhdGFTcGVjaWFsaXphdGlvbj86ICdlbWJlZGRlZCcgfCAnaW5saW5lX2VtYmVkZGVkJykge1xuICAgIGlmIChIZWxwZXJzLmlzQmxhbmsoY29udHJvbC5jb25maWcpKSB7XG4gICAgICBjb250cm9sLmNvbmZpZyA9IHt9O1xuICAgIH1cbiAgICBjb250cm9sLmNvbmZpZy5lbWJlZGRlZCA9IHRydWU7XG4gICAgY29udHJvbC5pc0VtYmVkZGVkID0gZGF0YVNwZWNpYWxpemF0aW9uID09PSAnZW1iZWRkZWQnO1xuICAgIGNvbnRyb2wuaXNJbmxpbmVFbWJlZGRlZCA9IGRhdGFTcGVjaWFsaXphdGlvbiA9PT0gJ2lubGluZV9lbWJlZGRlZCc7XG4gICAgcmV0dXJuIGNvbnRyb2w7XG4gIH1cblxuICBnZXRDb250cm9sT3B0aW9ucyhmaWVsZDogYW55LCBodHRwOiBhbnksIGNvbmZpZzogeyB0b2tlbj86IHN0cmluZzsgcmVzdFVybD86IHN0cmluZzsgbWlsaXRhcnk/OiBib29sZWFuIH0sIGZpZWxkRGF0YT86IGFueSk6IGFueSB7XG4gICAgLy8gVE9ETzogVGhlIHRva2VuIHByb3BlcnR5IG9mIGNvbmZpZyBpcyB0aGUgb25seSBwcm9wZXJ0eSB1c2VkOyBqdXN0IHBhc3MgaW4gYHRva2VuOiBzdHJpbmdgXG4gICAgaWYgKGZpZWxkLmRhdGFUeXBlID09PSAnQm9vbGVhbicgJiYgIWZpZWxkLm9wdGlvbnMpIHtcbiAgICAgIC8vIFRPRE86IGRhdGFUeXBlIHNob3VsZCBvbmx5IGJlIGRldGVybWluZWQgYnkgYGRldGVybWluZUlucHV0VHlwZWAgd2hpY2ggZG9lc24ndCBldmVyIHJldHVybiAnQm9vbGVhbicgaXRcbiAgICAgIC8vIFRPRE86IChjb250LikgcmV0dXJucyBgdGlsZXNgXG4gICAgICByZXR1cm4gW1xuICAgICAgICB7IHZhbHVlOiBmYWxzZSwgbGFiZWw6IHRoaXMubGFiZWxzLm5vIH0sXG4gICAgICAgIHsgdmFsdWU6IHRydWUsIGxhYmVsOiB0aGlzLmxhYmVscy55ZXMgfSxcbiAgICAgIF07XG4gICAgfSBlbHNlIGlmIChmaWVsZC5kYXRhU3BlY2lhbGl6YXRpb24gPT09ICdBTExfV09SS0ZMT1dfT1BUSU9OUycgJiYgZmllbGQub3B0aW9ucykge1xuICAgICAgcmV0dXJuIGZpZWxkLm9wdGlvbnM7XG4gICAgfSBlbHNlIGlmIChmaWVsZC53b3JrZmxvd09wdGlvbnMpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFdvcmtmbG93T3B0aW9ucyhmaWVsZC53b3JrZmxvd09wdGlvbnMsIGZpZWxkRGF0YSk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIGZpZWxkLmRhdGFTcGVjaWFsaXphdGlvbiA9PT0gJ1NQRUNJQUxJWkVEX09QVElPTlMnIHx8XG4gICAgICAoZmllbGQub3B0aW9ucyAmJiBbJ1NwZWNpYWxpemVkT3B0aW9uc0xvb2t1cCcsICdTaW1wbGlmaWVkT3B0aW9uc0xvb2t1cCddLmluY2x1ZGVzKGZpZWxkLmRhdGFUeXBlKSlcbiAgICApIHtcbiAgICAgIHJldHVybiBmaWVsZC5vcHRpb25zO1xuICAgIH0gZWxzZSBpZiAoZmllbGQub3B0aW9uc1VybCkge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9uc1NlcnZpY2UuZ2V0T3B0aW9uc0NvbmZpZyhodHRwLCBmaWVsZCwgY29uZmlnKTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoZmllbGQub3B0aW9ucykgJiYgZmllbGQudHlwZSA9PT0gJ2NoaXBzJykge1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IGZpZWxkLm9wdGlvbnM7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBmaWVsZDogJ3ZhbHVlJyxcbiAgICAgICAgZm9ybWF0OiAnJGxhYmVsJyxcbiAgICAgICAgb3B0aW9ucyxcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChmaWVsZC5vcHRpb25zKSB7XG4gICAgICByZXR1cm4gZmllbGQub3B0aW9ucztcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIGdldFdvcmtmbG93T3B0aW9ucyhcbiAgICB3b3JrZmxvd09wdGlvbnM6IHsgW2tleTogc3RyaW5nXTogYW55IH0sXG4gICAgZmllbGREYXRhOiB7IGlkPzogbnVtYmVyOyB2YWx1ZT86IHN0cmluZyB8IG51bWJlcjsgbGFiZWw/OiBzdHJpbmcgfCBudW1iZXIgfSB8IG51bGwsXG4gICk6IEFycmF5PHsgaWQ/OiBudW1iZXI7IHZhbHVlPzogc3RyaW5nIHwgbnVtYmVyOyBsYWJlbD86IHN0cmluZyB8IG51bWJlciB9PiB7XG4gICAgbGV0IGN1cnJlbnRWYWx1ZTogeyBpZD86IG51bWJlcjsgdmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7IGxhYmVsPzogc3RyaW5nIHwgbnVtYmVyIH0gPSBudWxsO1xuICAgIGxldCBjdXJyZW50V29ya2Zsb3dPcHRpb246IG51bWJlciB8IHN0cmluZyA9ICdpbml0aWFsJztcbiAgICBpZiAoZmllbGREYXRhPy5pZCkge1xuICAgICAgY3VycmVudFZhbHVlID0geyAuLi5maWVsZERhdGEsIHZhbHVlOiBmaWVsZERhdGEuaWQsIGxhYmVsOiBmaWVsZERhdGEubGFiZWwgfHwgZmllbGREYXRhLmlkIH07XG4gICAgICBjdXJyZW50V29ya2Zsb3dPcHRpb24gPSBmaWVsZERhdGEuaWQ7XG4gICAgfVxuICAgIGNvbnN0IHVwZGF0ZVdvcmtmbG93T3B0aW9uczogQXJyYXk8eyBpZD86IG51bWJlcjsgdmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7IGxhYmVsPzogc3RyaW5nIHwgbnVtYmVyIH0+ID1cbiAgICAgIHdvcmtmbG93T3B0aW9uc1tjdXJyZW50V29ya2Zsb3dPcHRpb25dIHx8IFtdO1xuXG4gICAgLy8gRW5zdXJlIHRoYXQgdGhlIGN1cnJlbnQgdmFsdWUgaXMgYWRkZWQgdG8gdGhlIGJlZ2lubmluZyBvZiB0aGUgb3B0aW9ucyBsaXN0XG4gICAgaWYgKGN1cnJlbnRWYWx1ZSAmJiAhdXBkYXRlV29ya2Zsb3dPcHRpb25zLmZpbmQoKG9wdGlvbikgPT4gb3B0aW9uLnZhbHVlID09PSBjdXJyZW50VmFsdWUudmFsdWUpKSB7XG4gICAgICB1cGRhdGVXb3JrZmxvd09wdGlvbnMudW5zaGlmdChjdXJyZW50VmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiB1cGRhdGVXb3JrZmxvd09wdGlvbnM7XG4gIH1cblxuICBzZXRJbml0aWFsVmFsdWVzKGNvbnRyb2xzOiBBcnJheTxOb3ZvQ29udHJvbENvbmZpZz4sIHZhbHVlczogYW55LCBrZWVwQ2xlYW4/OiBib29sZWFuLCBrZXlPdmVycmlkZT86IHN0cmluZykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29udHJvbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSBjb250cm9sc1tpXTtcbiAgICAgIGNvbnN0IGtleSA9IGtleU92ZXJyaWRlID8gY29udHJvbC5rZXkucmVwbGFjZShrZXlPdmVycmlkZSwgJycpIDogY29udHJvbC5rZXk7XG4gICAgICBsZXQgdmFsdWUgPSB2YWx1ZXNba2V5XTtcblxuICAgICAgaWYgKEhlbHBlcnMuaXNCbGFuayh2YWx1ZSkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUuZmlsdGVyKCh2YWwpID0+ICEoT2JqZWN0LmtleXModmFsKS5sZW5ndGggPT09IDAgJiYgdmFsLmNvbnN0cnVjdG9yID09PSBPYmplY3QpKTtcbiAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh2YWx1ZS5kYXRhICYmIHZhbHVlLmRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoT2JqZWN0LmtleXModmFsdWUpLmxlbmd0aCA9PT0gMCAmJiB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29udHJvbC5kYXRhVHlwZSA9PT0gJ0RhdGUnICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgY29udHJvbC5vcHRpb25zVHlwZSAhPT0gJ3NraXBDb252ZXJzaW9uJykge1xuICAgICAgICB2YWx1ZSA9IERhdGVVdGlsLnN0YXJ0T2ZEYXkodmFsdWUpO1xuICAgICAgfVxuXG4gICAgICBjb250cm9sLnZhbHVlID0gdmFsdWU7XG4gICAgICAvLyBUT0RPOiBrZWVwQ2xlYW4gaXMgbm90IHJlcXVpcmVkLCBidXQgaXMgYWx3YXlzIHVzZWQuIEl0IHNob3VsZCBkZWZhdWx0ICh0byB0cnVlPylcbiAgICAgIGNvbnRyb2wuZGlydHkgPSAha2VlcENsZWFuO1xuICAgIH1cbiAgfVxuXG4gIHNldEluaXRpYWxWYWx1ZXNGaWVsZHNldHMoZmllbGRzZXRzOiBBcnJheTxOb3ZvRmllbGRzZXQ+LCB2YWx1ZXMsIGtlZXBDbGVhbj86IGJvb2xlYW4pIHtcbiAgICBmaWVsZHNldHMuZm9yRWFjaCgoZmllbGRzZXQpID0+IHtcbiAgICAgIHRoaXMuc2V0SW5pdGlhbFZhbHVlcyhmaWVsZHNldC5jb250cm9scywgdmFsdWVzLCBrZWVwQ2xlYW4pO1xuICAgIH0pO1xuICB9XG5cbiAgZm9yY2VTaG93QWxsQ29udHJvbHMoY29udHJvbHM6IEFycmF5PE5vdm9Db250cm9sQ29uZmlnPikge1xuICAgIGNvbnRyb2xzLmZvckVhY2goKGNvbnRyb2wpID0+IHtcbiAgICAgIGNvbnRyb2wuaGlkZGVuID0gZmFsc2U7XG4gICAgfSk7XG4gIH1cblxuICBmb3JjZVNob3dBbGxDb250cm9sc0luRmllbGRzZXRzKGZpZWxkc2V0czogQXJyYXk8Tm92b0ZpZWxkc2V0Pikge1xuICAgIGZpZWxkc2V0cy5mb3JFYWNoKChmaWVsZHNldCkgPT4ge1xuICAgICAgZmllbGRzZXQuY29udHJvbHMuZm9yRWFjaCgoY29udHJvbCkgPT4ge1xuICAgICAgICBjb250cm9sLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmb3JjZVZhbGlkYXRpb24oZm9ybTogTm92b0Zvcm1Hcm91cCk6IHZvaWQge1xuICAgIE9iamVjdC5rZXlzKGZvcm0uY29udHJvbHMpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBjb250cm9sOiBhbnkgPSBmb3JtLmNvbnRyb2xzW2tleV07XG4gICAgICBpZiAoY29udHJvbC5yZXF1aXJlZCAmJiBIZWxwZXJzLmlzQmxhbmsoZm9ybS5nZXRSYXdWYWx1ZSgpW2NvbnRyb2wua2V5XSkpIHtcbiAgICAgICAgY29udHJvbC5tYXJrQXNEaXJ0eSgpO1xuICAgICAgICBjb250cm9sLm1hcmtBc1RvdWNoZWQoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGlzQWRkcmVzc0VtcHR5KGNvbnRyb2w6IGFueSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGZpZWxkTGlzdDogc3RyaW5nW10gPSBbJ2FkZHJlc3MxJywgJ2FkZHJlc3MyJywgJ2NpdHknLCAnc3RhdGUnLCAnemlwJywgJ2NvdW50cnlJRCddO1xuICAgIGxldCB2YWxpZDogYm9vbGVhbiA9IHRydWU7XG4gICAgaWYgKGNvbnRyb2wudmFsdWUgJiYgY29udHJvbC5jb25maWcpIHtcbiAgICAgIGZpZWxkTGlzdC5mb3JFYWNoKChzdWJmaWVsZDogc3RyaW5nKSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAoKHN1YmZpZWxkICE9PSAnY291bnRyeUlEJyAmJlxuICAgICAgICAgICAgIUhlbHBlcnMuaXNFbXB0eShjb250cm9sLmNvbmZpZ1tzdWJmaWVsZF0pICYmXG4gICAgICAgICAgICBjb250cm9sLmNvbmZpZ1tzdWJmaWVsZF0ucmVxdWlyZWQgJiZcbiAgICAgICAgICAgIChIZWxwZXJzLmlzQmxhbmsoY29udHJvbC52YWx1ZVtzdWJmaWVsZF0pIHx8IEhlbHBlcnMuaXNFbXB0eShjb250cm9sLnZhbHVlW3N1YmZpZWxkXSkpKSB8fFxuICAgICAgICAgICAgKHN1YmZpZWxkID09PSAnY291bnRyeUlEJyAmJlxuICAgICAgICAgICAgICAhSGVscGVycy5pc0VtcHR5KGNvbnRyb2wuY29uZmlnLmNvdW50cnlJRCkgJiZcbiAgICAgICAgICAgICAgY29udHJvbC5jb25maWcuY291bnRyeUlELnJlcXVpcmVkICYmXG4gICAgICAgICAgICAgIEhlbHBlcnMuaXNFbXB0eShjb250cm9sLnZhbHVlLmNvdW50cnlOYW1lKSkpICYmXG4gICAgICAgICAgIShcbiAgICAgICAgICAgIHN1YmZpZWxkID09PSAnc3RhdGUnICYmXG4gICAgICAgICAgICAhSGVscGVycy5pc0JsYW5rKGNvbnRyb2wudmFsdWUuY291bnRyeU5hbWUpICYmXG4gICAgICAgICAgICBjb250cm9sLmNvbmZpZy5zdGF0ZS5waWNrZXJDb25maWcgJiZcbiAgICAgICAgICAgIGNvbnRyb2wuY29uZmlnLnN0YXRlLnBpY2tlckNvbmZpZy5kZWZhdWx0T3B0aW9ucyAmJlxuICAgICAgICAgICAgY29udHJvbC5jb25maWcuc3RhdGUucGlja2VyQ29uZmlnLmRlZmF1bHRPcHRpb25zLmxlbmd0aCA9PT0gMFxuICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB2YWxpZDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0U3RhcnREYXRlRnJvbVJhbmdlKGRhdGVSYW5nZTogeyBtaW5EYXRlOiBzdHJpbmc7IG1pbk9mZnNldDogbnVtYmVyIH0pOiBEYXRlIHtcbiAgICBpZiAoZGF0ZVJhbmdlLm1pbkRhdGUpIHtcbiAgICAgIHJldHVybiBEYXRlVXRpbC5wYXJzZShkYXRlUmFuZ2UubWluRGF0ZSk7XG4gICAgfSBlbHNlIGlmIChkYXRlUmFuZ2UubWluT2Zmc2V0KSB7XG4gICAgICByZXR1cm4gRGF0ZVV0aWwuYWRkRGF5cyhzdGFydE9mVG9kYXkoKSwgZGF0ZVJhbmdlLm1pbk9mZnNldCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRFbmREYXRlRnJvbVJhbmdlKGRhdGVSYW5nZTogeyBtYXhEYXRlOiBzdHJpbmc7IG1pbk9mZnNldDogbnVtYmVyIH0pOiBEYXRlIHtcbiAgICBpZiAoZGF0ZVJhbmdlLm1heERhdGUpIHtcbiAgICAgIHJldHVybiBEYXRlVXRpbC5wYXJzZShkYXRlUmFuZ2UubWF4RGF0ZSk7XG4gICAgfSBlbHNlIGlmIChkYXRlUmFuZ2UubWluT2Zmc2V0KSB7XG4gICAgICByZXR1cm4gRGF0ZVV0aWwuYWRkRGF5cyhzdGFydE9mVG9kYXkoKSwgZGF0ZVJhbmdlLm1pbk9mZnNldCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbWluIHN0YXJ0IGRhdGUgYW5kIG1heCBlbmQgZGF0ZSBvZiBhIERhdGUgYmFzZSBvbiBmaWVsZCBkYXRhLlxuICAgKi9cblxuICBwcml2YXRlIGluZmVyRGF0ZVJhbmdlKGNvbnRyb2xDb25maWcsIGZpZWxkKTogdm9pZCB7XG4gICAgaWYgKGZpZWxkLmRhdGFUeXBlID09PSAnRGF0ZScgJiYgZmllbGQuYWxsb3dlZERhdGVSYW5nZSkge1xuICAgICAgY29udHJvbENvbmZpZy5zdGFydERhdGUgPSB0aGlzLmdldFN0YXJ0RGF0ZUZyb21SYW5nZShmaWVsZC5hbGxvd2VkRGF0ZVJhbmdlKTtcbiAgICAgIGNvbnRyb2xDb25maWcuZW5kRGF0ZSA9IHRoaXMuZ2V0RW5kRGF0ZUZyb21SYW5nZShmaWVsZC5hbGxvd2VkRGF0ZVJhbmdlKTtcbiAgICAgIGNvbnRyb2xDb25maWcuZGlzYWJsZWREYXRlTWVzc2FnZSA9IGZpZWxkLmFsbG93ZWREYXRlUmFuZ2U/LmRpc2FibGVkRGF0ZU1lc3NhZ2U7XG4gICAgfVxuICB9XG5cbiAgaW5mbGF0ZUVtYmVkZGVkUHJvcGVydGllcyhkYXRhOiBvYmplY3QpOiBvYmplY3Qge1xuICAgIGlmIChkYXRhKSB7XG4gICAgICBPYmplY3Qua2V5cyhkYXRhKVxuICAgICAgICAuZmlsdGVyKChmaWVsZE5hbWUpID0+IGZpZWxkTmFtZS5pbmNsdWRlcygnLicpKVxuICAgICAgICAuZm9yRWFjaCgoZmllbGQpID0+IHtcbiAgICAgICAgICBjb25zdCBbcGFyZW50RmllbGROYW1lLCBmaWVsZE5hbWVdID0gZmllbGQuc3BsaXQoJy4nKTtcbiAgICAgICAgICBpZiAoIWRhdGFbcGFyZW50RmllbGROYW1lXSkge1xuICAgICAgICAgICAgZGF0YVtwYXJlbnRGaWVsZE5hbWVdID0ge307XG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGFbcGFyZW50RmllbGROYW1lXVtmaWVsZE5hbWVdID0gZGF0YVtmaWVsZF07XG4gICAgICAgICAgZGVsZXRlIGRhdGFbZmllbGRdO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxufVxuIl19
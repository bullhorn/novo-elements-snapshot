// NG
import { Injectable } from '@angular/core';
import * as dateFns from 'date-fns';
// App
import { AddressControl, CheckboxControl, CheckListControl, CustomControl, DateControl, DateTimeControl, EditorControl, FileControl, PickerControl, RadioControl, SelectControl, SwitchControl, TextAreaControl, TextBoxControl, TilesControl, TimeControl, TimezoneControl, } from '../../elements/form/FormControls';
import { NovoFormControl } from '../../elements/form/NovoFormControl';
import { NovoFormGroup } from '../../elements/form/NovoFormGroup';
import { EntityPickerResult, EntityPickerResults } from '../../elements/picker/extras/entity-picker-results/EntityPickerResults';
import { NovoLabelService } from '../../services/novo-label-service';
import { Helpers } from '../Helpers';
import { OptionsService } from './../../services/options/OptionsService';
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
            controlConfig.config = Object.assign(Object.assign({}, optionsConfig), (controlConfig && controlConfig.config));
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
                control = new CustomControl(Object.assign(Object.assign({}, controlConfig), { template: 'native-input', type: type.replace('native-', ''), alwaysActive: true }));
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
            fieldsets.push(Object.assign({ title: field.associatedEntity.label || field.label, icon: field.icon || 'bhi-card-expand' }, constantProperties));
        }
        else {
            fieldsets.push(Object.assign({ title: field.label, icon: field.icon || 'bhi-section' }, constantProperties));
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
        if (fieldData === null || fieldData === void 0 ? void 0 : fieldData.id) {
            currentValue = Object.assign(Object.assign({}, fieldData), { value: fieldData.id, label: fieldData.label || fieldData.id });
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
                value = dateFns.startOfDay(value);
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
            return dateFns.parse(dateRange.minDate);
        }
        else if (dateRange.minOffset) {
            return dateFns.addDays(dateFns.startOfToday(), dateRange.minOffset);
        }
    }
    getEndDateFromRange(dateRange) {
        if (dateRange.maxDate) {
            return dateFns.parse(dateRange.maxDate);
        }
        else if (dateRange.minOffset) {
            return dateFns.addDays(dateFns.startOfToday(), dateRange.minOffset);
        }
    }
    /**
     * Get the min start date and max end date of a Date base on field data.
     */
    inferDateRange(controlConfig, field) {
        var _a;
        if (field.dataType === 'Date' && field.allowedDateRange) {
            controlConfig.startDate = this.getStartDateFromRange(field.allowedDateRange);
            controlConfig.endDate = this.getEndDateFromRange(field.allowedDateRange);
            controlConfig.disabledDateMessage = (_a = field.allowedDateRange) === null || _a === void 0 ? void 0 : _a.disabledDateMessage;
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
}
FormUtils.decorators = [
    { type: Injectable }
];
FormUtils.ctorParameters = () => [
    { type: NovoLabelService },
    { type: OptionsService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybVV0aWxzLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL3V0aWxzL2Zvcm0tdXRpbHMvRm9ybVV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEtBQUs7QUFDTCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sS0FBSyxPQUFPLE1BQU0sVUFBVSxDQUFDO0FBQ3BDLE1BQU07QUFDTixPQUFPLEVBQ0wsY0FBYyxFQUVkLGVBQWUsRUFDZixnQkFBZ0IsRUFDaEIsYUFBYSxFQUNiLFdBQVcsRUFDWCxlQUFlLEVBQ2YsYUFBYSxFQUNiLFdBQVcsRUFFWCxhQUFhLEVBQ2IsWUFBWSxFQUNaLGFBQWEsRUFDYixhQUFhLEVBQ2IsZUFBZSxFQUNmLGNBQWMsRUFDZCxZQUFZLEVBQ1osV0FBVyxFQUNYLGVBQWUsR0FDaEIsTUFBTSxrQ0FBa0MsQ0FBQztBQUUxQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDdEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdFQUF3RSxDQUFDO0FBQ2pJLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDckMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBR3pFLE1BQU0sT0FBTyxTQUFTO0lBcUNwQixZQUFtQixNQUF3QixFQUFTLGNBQThCO1FBQS9ELFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQVMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBcENsRiwyQkFBc0IsR0FBYTtZQUNqQyxXQUFX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LENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUM3RSxhQUFhLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUN6RSxhQUFhLENBQUMsbUJBQW1CLFNBQUcsS0FBSyxDQUFDLGdCQUFnQiwwQ0FBRSxtQkFBbUIsQ0FBQztTQUNqRjtJQUNILENBQUM7SUFFRCx5QkFBeUIsQ0FBQyxJQUFZO1FBQ3BDLElBQUksSUFBSSxFQUFFO1lBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7aUJBQ2QsTUFBTSxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUM5QyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDakIsTUFBTSxDQUFDLGVBQWUsRUFBRSxTQUFTLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN0RCxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFO29CQUMxQixJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxDQUFDO2lCQUM1QjtnQkFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMvQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQztTQUNOO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzs7WUF0MkJGLFVBQVU7OztZQUpGLGdCQUFnQjtZQUVoQixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkdcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGRhdGVGbnMgZnJvbSAnZGF0ZS1mbnMnO1xuLy8gQXBwXG5pbXBvcnQge1xuICBBZGRyZXNzQ29udHJvbCxcbiAgQmFzZUNvbnRyb2wsXG4gIENoZWNrYm94Q29udHJvbCxcbiAgQ2hlY2tMaXN0Q29udHJvbCxcbiAgQ3VzdG9tQ29udHJvbCxcbiAgRGF0ZUNvbnRyb2wsXG4gIERhdGVUaW1lQ29udHJvbCxcbiAgRWRpdG9yQ29udHJvbCxcbiAgRmlsZUNvbnRyb2wsXG4gIE5vdm9Db250cm9sQ29uZmlnLFxuICBQaWNrZXJDb250cm9sLFxuICBSYWRpb0NvbnRyb2wsXG4gIFNlbGVjdENvbnRyb2wsXG4gIFN3aXRjaENvbnRyb2wsXG4gIFRleHRBcmVhQ29udHJvbCxcbiAgVGV4dEJveENvbnRyb2wsXG4gIFRpbGVzQ29udHJvbCxcbiAgVGltZUNvbnRyb2wsXG4gIFRpbWV6b25lQ29udHJvbCxcbn0gZnJvbSAnLi4vLi4vZWxlbWVudHMvZm9ybS9Gb3JtQ29udHJvbHMnO1xuaW1wb3J0IHsgRm9ybUZpZWxkLCBOb3ZvRmllbGRzZXQgfSBmcm9tICcuLi8uLi9lbGVtZW50cy9mb3JtL0Zvcm1JbnRlcmZhY2VzJztcbmltcG9ydCB7IE5vdm9Gb3JtQ29udHJvbCB9IGZyb20gJy4uLy4uL2VsZW1lbnRzL2Zvcm0vTm92b0Zvcm1Db250cm9sJztcbmltcG9ydCB7IE5vdm9Gb3JtR3JvdXAgfSBmcm9tICcuLi8uLi9lbGVtZW50cy9mb3JtL05vdm9Gb3JtR3JvdXAnO1xuaW1wb3J0IHsgRW50aXR5UGlja2VyUmVzdWx0LCBFbnRpdHlQaWNrZXJSZXN1bHRzIH0gZnJvbSAnLi4vLi4vZWxlbWVudHMvcGlja2VyL2V4dHJhcy9lbnRpdHktcGlja2VyLXJlc3VsdHMvRW50aXR5UGlja2VyUmVzdWx0cyc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbm92by1sYWJlbC1zZXJ2aWNlJztcbmltcG9ydCB7IEhlbHBlcnMgfSBmcm9tICcuLi9IZWxwZXJzJztcbmltcG9ydCB7IE9wdGlvbnNTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9vcHRpb25zL09wdGlvbnNTZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZvcm1VdGlscyB7XG4gIEFTU09DSUFURURfRU5USVRZX0xJU1Q6IHN0cmluZ1tdID0gW1xuICAgICdDYW5kaWRhdGUnLFxuICAgICdDbGllbnRDb250YWN0JyxcbiAgICAnQ2xpZW50Q29ycG9yYXRpb24nLFxuICAgICdDb3Jwb3JhdGlvbkRlcGFydG1lbnQnLFxuICAgICdMZWFkJyxcbiAgICAnT3Bwb3J0dW5pdHknLFxuICAgICdKb2JPcmRlcicsXG4gICAgJ0NvcnBvcmF0ZVVzZXInLFxuICAgICdQZXJzb24nLFxuICAgICdQbGFjZW1lbnQnLFxuICAgICdKb2JTaGlmdCcsXG4gIF07XG4gIEVOVElUWV9QSUNLRVJfTElTVDogc3RyaW5nW10gPSBbXG4gICAgJ0NhbmRpZGF0ZScsXG4gICAgJ0NhbmRpZGF0ZVRleHQnLFxuICAgICdDbGllbnQnLFxuICAgICdDbGllbnRUZXh0JyxcbiAgICAnQ2xpZW50Q29udGFjdCcsXG4gICAgJ0NsaWVudENvbnRhY3RUZXh0JyxcbiAgICAnQ2xpZW50Q29ycG9yYXRpb24nLFxuICAgICdDbGllbnRDb3Jwb3JhdGlvblRleHQnLFxuICAgICdMZWFkJyxcbiAgICAnTGVhZFRleHQnLFxuICAgICdPcHBvcnR1bml0eScsXG4gICAgJ09wcG9ydHVuaXR5VGV4dCcsXG4gICAgJ0pvYk9yZGVyJyxcbiAgICAnSm9iT3JkZXJUZXh0JyxcbiAgICAnQ29ycG9yYXRlVXNlcicsXG4gICAgJ0NvcnBvcmF0ZVVzZXJUZXh0JyxcbiAgICAnUGVyc29uJyxcbiAgICAnUGVyc29uVGV4dCcsXG4gICAgJ1BsYWNlbWVudCcsXG4gICAgJ0pvYlNoaWZ0JyxcbiAgXTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLCBwdWJsaWMgb3B0aW9uc1NlcnZpY2U6IE9wdGlvbnNTZXJ2aWNlKSB7fVxuXG4gIHRvRm9ybUdyb3VwKGNvbnRyb2xzOiBBcnJheTxhbnk+KTogTm92b0Zvcm1Hcm91cCB7XG4gICAgY29uc3QgZ3JvdXA6IGFueSA9IHt9O1xuICAgIGNvbnRyb2xzLmZvckVhY2goKGNvbnRyb2wpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gSGVscGVycy5pc0JsYW5rKGNvbnRyb2wudmFsdWUpID8gJycgOiBjb250cm9sLnZhbHVlO1xuICAgICAgZ3JvdXBbY29udHJvbC5rZXldID0gbmV3IE5vdm9Gb3JtQ29udHJvbCh2YWx1ZSwgY29udHJvbCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG5ldyBOb3ZvRm9ybUdyb3VwKGdyb3VwKTtcbiAgfVxuXG4gIGVtcHR5Rm9ybUdyb3VwKCk6IE5vdm9Gb3JtR3JvdXAge1xuICAgIHJldHVybiBuZXcgTm92b0Zvcm1Hcm91cCh7fSk7XG4gIH1cblxuICBhZGRDb250cm9scyhmb3JtR3JvdXA6IE5vdm9Gb3JtR3JvdXAsIGNvbnRyb2xzOiBBcnJheTxOb3ZvQ29udHJvbENvbmZpZz4pOiB2b2lkIHtcbiAgICBjb250cm9scy5mb3JFYWNoKChjb250cm9sKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IEhlbHBlcnMuaXNCbGFuayhjb250cm9sLnZhbHVlKSA/ICcnIDogY29udHJvbC52YWx1ZTtcbiAgICAgIGNvbnN0IGZvcm1Db250cm9sID0gbmV3IE5vdm9Gb3JtQ29udHJvbCh2YWx1ZSwgY29udHJvbCk7XG4gICAgICBmb3JtR3JvdXAuYWRkQ29udHJvbChjb250cm9sLmtleSwgZm9ybUNvbnRyb2wpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlQ29udHJvbHMoZm9ybUdyb3VwOiBOb3ZvRm9ybUdyb3VwLCBjb250cm9sczogQXJyYXk8Tm92b0NvbnRyb2xDb25maWc+KTogdm9pZCB7XG4gICAgY29udHJvbHMuZm9yRWFjaCgoY29udHJvbCkgPT4ge1xuICAgICAgZm9ybUdyb3VwLnJlbW92ZUNvbnRyb2woY29udHJvbC5rZXkpO1xuICAgIH0pO1xuICB9XG5cbiAgdG9Gb3JtR3JvdXBGcm9tRmllbGRzZXQoZmllbGRzZXRzOiBBcnJheTxOb3ZvRmllbGRzZXQ+KTogTm92b0Zvcm1Hcm91cCB7XG4gICAgY29uc3QgY29udHJvbHM6IEFycmF5PE5vdm9Gb3JtQ29udHJvbD4gPSBbXTtcbiAgICBmaWVsZHNldHMuZm9yRWFjaCgoZmllbGRzZXQpID0+IHtcbiAgICAgIGNvbnRyb2xzLnB1c2goLi4uZmllbGRzZXQuY29udHJvbHMpO1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLnRvRm9ybUdyb3VwKGNvbnRyb2xzKTtcbiAgfVxuXG4gIGhhc0Fzc29jaWF0ZWRFbnRpdHkoZmllbGQ6IEZvcm1GaWVsZCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIShmaWVsZC5hc3NvY2lhdGVkRW50aXR5ICYmIH50aGlzLkFTU09DSUFURURfRU5USVRZX0xJU1QuaW5kZXhPZihmaWVsZC5hc3NvY2lhdGVkRW50aXR5LmVudGl0eSkpO1xuICB9XG5cbiAgZGV0ZXJtaW5lSW5wdXRUeXBlKGZpZWxkOiBGb3JtRmllbGQpOiBzdHJpbmcge1xuICAgIGxldCB0eXBlOiBzdHJpbmc7XG4gICAgY29uc3QgZGF0YVNwZWNpYWxpemF0aW9uVHlwZU1hcCA9IHtcbiAgICAgIERBVEVUSU1FOiAnZGF0ZXRpbWUnLFxuICAgICAgVElNRTogJ3RpbWUnLFxuICAgICAgTU9ORVk6ICdjdXJyZW5jeScsXG4gICAgICBQRVJDRU5UQUdFOiAncGVyY2VudGFnZScsXG4gICAgICBIVE1MOiAnZWRpdG9yJyxcbiAgICAgICdIVE1MLU1JTklNQUwnOiAnZWRpdG9yLW1pbmltYWwnLFxuICAgICAgWUVBUjogJ3llYXInLFxuICAgICAgV09SS0ZMT1dfT1BUSU9OUzogJ3NlbGVjdCcsXG4gICAgICBTUEVDSUFMSVpFRF9PUFRJT05TOiAnc2VsZWN0JyxcbiAgICAgIEFMTF9XT1JLRkxPV19PUFRJT05TOiAnc2VsZWN0JyxcbiAgICAgIFdvcmtmbG93T3B0aW9uc0xvb2t1cDogJ3NlbGVjdCcsXG4gICAgICBTcGVjaWFsaXplZE9wdGlvbnNMb29rdXA6ICdzZWxlY3QnLFxuICAgICAgU2ltcGxpZmllZE9wdGlvbnNMb29rdXA6ICdzZWxlY3QnLFxuICAgICAgQWxsV29ya2Zsb3dPcHRpb25zTG9va3VwOiAnc2VsZWN0JyxcbiAgICB9O1xuICAgIGNvbnN0IGRhdGFUeXBlVG9UeXBlTWFwID0ge1xuICAgICAgVGltZXN0YW1wOiAnZGF0ZScsXG4gICAgICBEYXRlOiAnZGF0ZScsXG4gICAgICBCb29sZWFuOiAndGlsZXMnLFxuICAgIH07XG4gICAgY29uc3QgaW5wdXRUeXBlVG9UeXBlTWFwID0ge1xuICAgICAgQ0hFQ0tCT1g6ICdyYWRpbycsXG4gICAgICBSQURJTzogJ3JhZGlvJyxcbiAgICAgIFNFTEVDVDogJ3NlbGVjdCcsXG4gICAgICBUSUxFUzogJ3RpbGVzJyxcbiAgICB9O1xuICAgIGNvbnN0IGlucHV0VHlwZU11bHRpVG9UeXBlTWFwID0ge1xuICAgICAgQ0hFQ0tCT1g6ICdjaGVja2xpc3QnLFxuICAgICAgUkFESU86ICdjaGVja2xpc3QnLFxuICAgICAgU0VMRUNUOiAnY2hpcHMnLFxuICAgIH07XG4gICAgY29uc3QgdHlwZVRvVHlwZU1hcCA9IHtcbiAgICAgIGZpbGU6ICdmaWxlJyxcbiAgICAgIENPTVBPU0lURTogJ2FkZHJlc3MnLFxuICAgIH07XG4gICAgY29uc3QgbnVtYmVyRGF0YVR5cGVUb1R5cGVNYXAgPSB7XG4gICAgICBEb3VibGU6ICdmbG9hdCcsXG4gICAgICBCaWdEZWNpbWFsOiAnZmxvYXQnLFxuICAgICAgSW50ZWdlcjogJ251bWJlcicsXG4gICAgfTtcbiAgICBpZiAoZmllbGQudHlwZSA9PT0gJ1RPX01BTlknKSB7XG4gICAgICBpZiAodGhpcy5oYXNBc3NvY2lhdGVkRW50aXR5KGZpZWxkKSkge1xuICAgICAgICBpZiAoZmllbGQubXVsdGlWYWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICB0eXBlID0gJ2VudGl0eXBpY2tlcic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdHlwZSA9ICdlbnRpdHljaGlwcyc7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChmaWVsZC5tdWx0aVZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICAgIHR5cGUgPSAncGlja2VyJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0eXBlID0gJ2NoaXBzJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZmllbGQudHlwZSA9PT0gJ1RPX09ORScpIHtcbiAgICAgIGlmIChcbiAgICAgICAgJ1NZU1RFTScgPT09IGZpZWxkLmRhdGFTcGVjaWFsaXphdGlvbiAmJlxuICAgICAgICBbJ1dvcmtmbG93T3B0aW9uc0xvb2t1cCcsICdTcGVjaWFsaXplZE9wdGlvbnNMb29rdXAnLCAnQWxsV29ya2Zsb3dPcHRpb25zTG9va3VwJ10uaW5jbHVkZXMoZmllbGQuZGF0YVR5cGUpXG4gICAgICApIHtcbiAgICAgICAgdHlwZSA9IGRhdGFTcGVjaWFsaXphdGlvblR5cGVNYXBbZmllbGQuZGF0YVR5cGVdO1xuICAgICAgfSBlbHNlIGlmIChbJ1dPUktGTE9XX09QVElPTlMnLCAnU1BFQ0lBTElaRURfT1BUSU9OUycsICdBTExfV09SS0ZMT1dfT1BUSU9OUyddLmluY2x1ZGVzKGZpZWxkLmRhdGFTcGVjaWFsaXphdGlvbikpIHtcbiAgICAgICAgdHlwZSA9IGRhdGFTcGVjaWFsaXphdGlvblR5cGVNYXBbZmllbGQuZGF0YVNwZWNpYWxpemF0aW9uXTtcbiAgICAgIH0gZWxzZSBpZiAoWydTaW1wbGlmaWVkT3B0aW9uc0xvb2t1cCcsICdTcGVjaWFsaXplZE9wdGlvbnNMb29rdXAnXS5pbmNsdWRlcyhmaWVsZC5kYXRhVHlwZSkpIHtcbiAgICAgICAgaWYgKGZpZWxkLm9wdGlvbnMgJiYgT2JqZWN0LmtleXMoaW5wdXRUeXBlVG9UeXBlTWFwKS5pbmRleE9mKGZpZWxkLmlucHV0VHlwZSkgPiAtMSAmJiAhZmllbGQubXVsdGlWYWx1ZSkge1xuICAgICAgICAgIHR5cGUgPSBpbnB1dFR5cGVUb1R5cGVNYXBbZmllbGQuaW5wdXRUeXBlXTtcbiAgICAgICAgfSBlbHNlIGlmIChmaWVsZC5vcHRpb25zICYmIE9iamVjdC5rZXlzKGlucHV0VHlwZU11bHRpVG9UeXBlTWFwKS5pbmRleE9mKGZpZWxkLmlucHV0VHlwZSkgPiAtMSAmJiBmaWVsZC5tdWx0aVZhbHVlKSB7XG4gICAgICAgICAgdHlwZSA9IGlucHV0VHlwZU11bHRpVG9UeXBlTWFwW2ZpZWxkLmlucHV0VHlwZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdHlwZSA9IGRhdGFTcGVjaWFsaXphdGlvblR5cGVNYXBbZmllbGQuZGF0YVR5cGVdO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaGFzQXNzb2NpYXRlZEVudGl0eShmaWVsZCkpIHtcbiAgICAgICAgdHlwZSA9ICdlbnRpdHlwaWNrZXInOyAvLyBUT0RPIVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHlwZSA9ICdwaWNrZXInO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZmllbGQub3B0aW9uc1VybCAmJiBmaWVsZC5pbnB1dFR5cGUgPT09ICdTRUxFQ1QnKSB7XG4gICAgICBpZiAoZmllbGQub3B0aW9uc1R5cGUgJiYgfnRoaXMuRU5USVRZX1BJQ0tFUl9MSVNULmluZGV4T2YoZmllbGQub3B0aW9uc1R5cGUpKSB7XG4gICAgICAgIHR5cGUgPSAnZW50aXR5cGlja2VyJzsgLy8gVE9ETyFcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHR5cGUgPSAncGlja2VyJztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKE9iamVjdC5rZXlzKGRhdGFTcGVjaWFsaXphdGlvblR5cGVNYXApLmluZGV4T2YoZmllbGQuZGF0YVNwZWNpYWxpemF0aW9uKSA+IC0xKSB7XG4gICAgICB0eXBlID0gZGF0YVNwZWNpYWxpemF0aW9uVHlwZU1hcFtmaWVsZC5kYXRhU3BlY2lhbGl6YXRpb25dO1xuICAgIH0gZWxzZSBpZiAoT2JqZWN0LmtleXMoZGF0YVR5cGVUb1R5cGVNYXApLmluZGV4T2YoZmllbGQuZGF0YVR5cGUpID4gLTEpIHtcbiAgICAgIHR5cGUgPSBkYXRhVHlwZVRvVHlwZU1hcFtmaWVsZC5kYXRhVHlwZV07XG4gICAgfSBlbHNlIGlmIChmaWVsZC5pbnB1dFR5cGUgPT09ICdURVhUQVJFQScpIHtcbiAgICAgIHR5cGUgPSAndGV4dGFyZWEnO1xuICAgIH0gZWxzZSBpZiAoZmllbGQub3B0aW9ucyAmJiBPYmplY3Qua2V5cyhpbnB1dFR5cGVUb1R5cGVNYXApLmluZGV4T2YoZmllbGQuaW5wdXRUeXBlKSA+IC0xICYmICFmaWVsZC5tdWx0aVZhbHVlKSB7XG4gICAgICB0eXBlID0gaW5wdXRUeXBlVG9UeXBlTWFwW2ZpZWxkLmlucHV0VHlwZV07XG4gICAgfSBlbHNlIGlmIChmaWVsZC5vcHRpb25zICYmIE9iamVjdC5rZXlzKGlucHV0VHlwZU11bHRpVG9UeXBlTWFwKS5pbmRleE9mKGZpZWxkLmlucHV0VHlwZSkgPiAtMSAmJiBmaWVsZC5tdWx0aVZhbHVlKSB7XG4gICAgICB0eXBlID0gaW5wdXRUeXBlTXVsdGlUb1R5cGVNYXBbZmllbGQuaW5wdXRUeXBlXTtcbiAgICB9IGVsc2UgaWYgKE9iamVjdC5rZXlzKHR5cGVUb1R5cGVNYXApLmluZGV4T2YoZmllbGQudHlwZSkgPiAtMSkge1xuICAgICAgdHlwZSA9IHR5cGVUb1R5cGVNYXBbZmllbGQudHlwZV07XG4gICAgfSBlbHNlIGlmIChPYmplY3Qua2V5cyhudW1iZXJEYXRhVHlwZVRvVHlwZU1hcCkuaW5kZXhPZihmaWVsZC5kYXRhVHlwZSkgPiAtMSkge1xuICAgICAgdHlwZSA9IG51bWJlckRhdGFUeXBlVG9UeXBlTWFwW2ZpZWxkLmRhdGFUeXBlXTtcbiAgICB9IC8qIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGb3JtVXRpbHM6IFRoaXMgZmllbGQgdHlwZSBpcyB1bnN1cHBvcnRlZC4nKTtcbiAgICAgICAgfSovXG4gICAgcmV0dXJuIHR5cGU7XG4gIH1cblxuICBpc0ZpZWxkRW5jcnlwdGVkKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGtleS5pbmRleE9mKCdjdXN0b21FbmNyeXB0ZWQnKSA+IC0xO1xuICB9XG5cbiAgZ2V0Q29udHJvbEZvckZpZWxkKFxuICAgIGZpZWxkOiBhbnksXG4gICAgaHR0cCxcbiAgICBjb25maWc6IHsgdG9rZW4/OiBzdHJpbmc7IHJlc3RVcmw/OiBzdHJpbmc7IG1pbGl0YXJ5PzogYm9vbGVhbjsgd2Vla1N0YXJ0PzogbnVtYmVyIH0sXG4gICAgb3ZlcnJpZGVzPzogYW55LFxuICAgIGZvclRhYmxlOiBib29sZWFuID0gZmFsc2UsXG4gICAgZmllbGREYXRhPzogYW55LFxuICApIHtcbiAgICAvLyBUT0RPOiBpZiBmaWVsZC50eXBlIG92ZXJyaWRlcyBgZGV0ZXJtaW5lSW5wdXRUeXBlYCB3ZSBzaG91bGQgdXNlIGl0IGluIHRoYXQgbWV0aG9kIG9yIHVzZSB0aGlzIG1ldGhvZFxuICAgIC8vIFRPRE86IChjb250LikgYXMgdGhlIHNldHRlciBvZiB0aGUgZmllbGQgYXJndW1lbnRcbiAgICBsZXQgdHlwZTogc3RyaW5nID0gdGhpcy5kZXRlcm1pbmVJbnB1dFR5cGUoZmllbGQpIHx8IGZpZWxkLnR5cGU7XG4gICAgbGV0IGNvbnRyb2w6IGFueTtcbiAgICBjb25zdCBjb250cm9sQ29uZmlnOiBOb3ZvQ29udHJvbENvbmZpZyA9IHtcbiAgICAgIG1ldGFUeXBlOiBmaWVsZC50eXBlLFxuICAgICAgdHlwZSxcbiAgICAgIGtleTogZmllbGQubmFtZSxcbiAgICAgIGxhYmVsOiBmaWVsZC5sYWJlbCxcbiAgICAgIHBsYWNlaG9sZGVyOiBmaWVsZC5oaW50IHx8ICcnLFxuICAgICAgcmVxdWlyZWQ6IGZpZWxkLnJlcXVpcmVkIHx8IGZpZWxkLnN5c3RlbVJlcXVpcmVkLFxuICAgICAgaGlkZGVuOiAhZmllbGQucmVxdWlyZWQsXG4gICAgICBlbmNyeXB0ZWQ6IHRoaXMuaXNGaWVsZEVuY3J5cHRlZChmaWVsZC5uYW1lID8gZmllbGQubmFtZS50b1N0cmluZygpIDogJycpLFxuICAgICAgdmFsdWU6IGZpZWxkLnZhbHVlIHx8IGZpZWxkLmRlZmF1bHRWYWx1ZSxcbiAgICAgIHNvcnRPcmRlcjogZmllbGQuc29ydE9yZGVyLFxuICAgICAgYXNzb2NpYXRlZEVudGl0eTogZmllbGQuYXNzb2NpYXRlZEVudGl0eSxcbiAgICAgIG9wdGlvbnNUeXBlOiBmaWVsZC5vcHRpb25zVHlwZSxcbiAgICAgIG11bHRpcGxlOiBmaWVsZC5tdWx0aVZhbHVlLFxuICAgICAgcmVhZE9ubHk6ICEhZmllbGQuZGlzYWJsZWQgfHwgISFmaWVsZC5yZWFkT25seSxcbiAgICAgIGRpc2FibGVkOiBmaWVsZC5kaXNhYmxlZCxcbiAgICAgIG1heGxlbmd0aDogZmllbGQubWF4TGVuZ3RoLFxuICAgICAgaW50ZXJhY3Rpb25zOiBmaWVsZC5pbnRlcmFjdGlvbnMsXG4gICAgICBkYXRhU3BlY2lhbGl6YXRpb246IGZpZWxkLmRhdGFTcGVjaWFsaXphdGlvbixcbiAgICAgIGRhdGFUeXBlOiBmaWVsZC5kYXRhVHlwZSxcbiAgICAgIGRlc2NyaXB0aW9uOiBmaWVsZC5kZXNjcmlwdGlvbiB8fCAnJyxcbiAgICAgIHRvb2x0aXA6IGZpZWxkLnRvb2x0aXAsXG4gICAgICB0b29sdGlwUG9zaXRpb246IGZpZWxkLnRvb2x0aXBQb3NpdGlvbixcbiAgICAgIGN1c3RvbUNvbnRyb2w6IGZpZWxkLmN1c3RvbUNvbnRyb2wsXG4gICAgICB0ZW1wbGF0ZTogZmllbGQudGVtcGxhdGUsXG4gICAgICBjdXN0b21Db250cm9sQ29uZmlnOiBmaWVsZC5jdXN0b21Db250cm9sQ29uZmlnLFxuICAgICAgcmVzdHJpY3RGaWVsZEludGVyYWN0aW9uczogZmllbGQucmVzdHJpY3RGaWVsZEludGVyYWN0aW9ucyxcbiAgICAgIHZhbGlkYXRvcnM6IGZpZWxkLnZhbGlkYXRvcnMsXG4gICAgICB3YXJuaW5nOiBmaWVsZC53YXJuaW5nLFxuICAgICAgY29uZmlnOiBmaWVsZC5jb25maWcgfHwge30sXG4gICAgICBjbG9zZU9uU2VsZWN0OiBmaWVsZC5jbG9zZU9uU2VsZWN0LFxuICAgICAgbGF5b3V0T3B0aW9uczogZmllbGQubGF5b3V0T3B0aW9ucyxcbiAgICB9O1xuICAgIHRoaXMuaW5mZXJEYXRlUmFuZ2UoY29udHJvbENvbmZpZywgZmllbGQpO1xuICAgIC8vIFRPRE86IGdldENvbnRyb2xPcHRpb25zIHNob3VsZCBhbHdheXMgcmV0dXJuIHRoZSBjb3JyZWN0IGZvcm1hdFxuICAgIGNvbnN0IG9wdGlvbnNDb25maWcgPSB0aGlzLmdldENvbnRyb2xPcHRpb25zKGZpZWxkLCBodHRwLCBjb25maWcsIGZpZWxkRGF0YSk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9uc0NvbmZpZykgJiYgISh0eXBlID09PSAnY2hpcHMnIHx8IHR5cGUgPT09ICdwaWNrZXInKSkge1xuICAgICAgY29udHJvbENvbmZpZy5vcHRpb25zID0gb3B0aW9uc0NvbmZpZztcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9uc0NvbmZpZykgJiYgKHR5cGUgPT09ICdjaGlwcycgfHwgdHlwZSA9PT0gJ3BpY2tlcicpKSB7XG4gICAgICBjb250cm9sQ29uZmlnLmNvbmZpZyA9IHtcbiAgICAgICAgb3B0aW9uczogb3B0aW9uc0NvbmZpZyxcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChvcHRpb25zQ29uZmlnKSB7XG4gICAgICBjb250cm9sQ29uZmlnLmNvbmZpZyA9IHtcbiAgICAgICAgLi4ub3B0aW9uc0NvbmZpZyxcbiAgICAgICAgLi4uKGNvbnRyb2xDb25maWcgJiYgY29udHJvbENvbmZpZy5jb25maWcpLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAodHlwZSA9PT0gJ3llYXInKSB7XG4gICAgICBjb250cm9sQ29uZmlnLm1heGxlbmd0aCA9IDQ7XG4gICAgfVxuICAgIC8vIFRPRE86IE92ZXJyaWRlcyBzaG91bGQgYmUgYW4gaXRlcmFibGUgb2YgYWxsIHByb3BlcnRpZXMgKHBvdGVudGlhbGx5IGEgcHJpdmF0ZSBtZXRob2QpXG4gICAgbGV0IG92ZXJyaWRlUmVzdWx0c1RlbXBsYXRlO1xuICAgIGxldCBvdmVycmlkZVByZXZpZXdUZW1wbGF0ZTtcbiAgICBpZiAob3ZlcnJpZGVzICYmIG92ZXJyaWRlc1tmaWVsZC5uYW1lXSkge1xuICAgICAgaWYgKG92ZXJyaWRlc1tmaWVsZC5uYW1lXS5yZXN1bHRzVGVtcGxhdGUpIHtcbiAgICAgICAgb3ZlcnJpZGVSZXN1bHRzVGVtcGxhdGUgPSBvdmVycmlkZXNbZmllbGQubmFtZV0ucmVzdWx0c1RlbXBsYXRlO1xuICAgICAgICBjb250cm9sQ29uZmlnLmNvbmZpZy5yZXN1bHRzVGVtcGxhdGUgPSBvdmVycmlkZVJlc3VsdHNUZW1wbGF0ZTtcbiAgICAgICAgZGVsZXRlIG92ZXJyaWRlc1tmaWVsZC5uYW1lXS5yZXN1bHRzVGVtcGxhdGU7XG4gICAgICB9XG4gICAgICBpZiAob3ZlcnJpZGVzW2ZpZWxkLm5hbWVdLm92ZXJyaWRlUHJldmlld1RlbXBsYXRlKSB7XG4gICAgICAgIG92ZXJyaWRlUmVzdWx0c1RlbXBsYXRlID0gb3ZlcnJpZGVzW2ZpZWxkLm5hbWVdLm92ZXJyaWRlUHJldmlld1RlbXBsYXRlO1xuICAgICAgICBjb250cm9sQ29uZmlnLmNvbmZpZy5vdmVycmlkZVByZXZpZXdUZW1wbGF0ZSA9IG92ZXJyaWRlUmVzdWx0c1RlbXBsYXRlO1xuICAgICAgICBkZWxldGUgb3ZlcnJpZGVzW2ZpZWxkLm5hbWVdLm92ZXJyaWRlUHJldmlld1RlbXBsYXRlO1xuICAgICAgfVxuICAgICAgaWYgKG92ZXJyaWRlc1tmaWVsZC5uYW1lXS5waWNrZXJDYWxsYmFjaykge1xuICAgICAgICBjb250cm9sQ29uZmlnLmNvbmZpZy5jYWxsYmFjayA9IG92ZXJyaWRlc1tmaWVsZC5uYW1lXS5waWNrZXJDYWxsYmFjaztcbiAgICAgIH1cbiAgICAgIGlmIChvdmVycmlkZXNbZmllbGQubmFtZV0udHlwZSkge1xuICAgICAgICB0eXBlID0gb3ZlcnJpZGVzW2ZpZWxkLm5hbWVdLnR5cGU7XG4gICAgICB9XG4gICAgICBpZiAob3ZlcnJpZGVzW2ZpZWxkLm5hbWVdLmNvbHVtbnMpIHtcbiAgICAgICAgY29udHJvbENvbmZpZy5jb25maWcuY29sdW1ucyA9IG92ZXJyaWRlc1tmaWVsZC5uYW1lXS5jb2x1bW5zO1xuICAgICAgICBjb250cm9sQ29uZmlnLmNsb3NlT25TZWxlY3QgPSB0cnVlO1xuICAgICAgICBkZWxldGUgY29udHJvbENvbmZpZy5sYWJlbDtcbiAgICAgIH1cbiAgICAgIGlmIChvdmVycmlkZXNbZmllbGQubmFtZV0ud2FybmluZykge1xuICAgICAgICBjb250cm9sQ29uZmlnLndhcm5pbmcgPSBvdmVycmlkZXNbZmllbGQubmFtZV0ud2FybmluZztcbiAgICAgIH1cbiAgICAgIE9iamVjdC5hc3NpZ24oY29udHJvbENvbmZpZywgb3ZlcnJpZGVzW2ZpZWxkLm5hbWVdKTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2VudGl0eWNoaXBzJzpcbiAgICAgICAgLy8gVE9ETzogVGhpcyBkb2Vzbid0IGJlbG9uZyBpbiB0aGlzIGNvZGViYXNlXG4gICAgICAgIGNvbnRyb2xDb25maWcubXVsdGlwbGUgPSB0cnVlO1xuICAgICAgICBjb250cm9sQ29uZmlnLmNvbmZpZy5yZXN1bHRzVGVtcGxhdGUgPSBvdmVycmlkZVJlc3VsdHNUZW1wbGF0ZSB8fCBFbnRpdHlQaWNrZXJSZXN1bHRzO1xuICAgICAgICBjb250cm9sQ29uZmlnLmNvbmZpZy5wcmV2aWV3VGVtcGxhdGUgPSBvdmVycmlkZVByZXZpZXdUZW1wbGF0ZSB8fCBFbnRpdHlQaWNrZXJSZXN1bHQ7XG4gICAgICAgIC8vIFRPRE86IFdoZW4gYXBwZW5kVG9Cb2R5IHBpY2tlciB3b3JrcyBiZXR0ZXIgaW4gdGFibGUvZm9ybVxuICAgICAgICBjb250cm9sID0gbmV3IFBpY2tlckNvbnRyb2woY29udHJvbENvbmZpZyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY2hpcHMnOlxuICAgICAgICBjb250cm9sQ29uZmlnLm11bHRpcGxlID0gdHJ1ZTtcbiAgICAgICAgLy8gVE9ETzogV2hlbiBhcHBlbmRUb0JvZHkgcGlja2VyIHdvcmtzIGJldHRlciBpbiB0YWJsZS9mb3JtXG4gICAgICAgIGNvbnRyb2wgPSBuZXcgUGlja2VyQ29udHJvbChjb250cm9sQ29uZmlnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdlbnRpdHlwaWNrZXInOlxuICAgICAgICAvLyBUT0RPOiBUaGlzIGRvZXNuJ3QgYmVsb25nIGluIHRoaXMgY29kZWJhc2VcbiAgICAgICAgY29udHJvbENvbmZpZy5jb25maWcucmVzdWx0c1RlbXBsYXRlID0gb3ZlcnJpZGVSZXN1bHRzVGVtcGxhdGUgfHwgRW50aXR5UGlja2VyUmVzdWx0cztcbiAgICAgICAgLy8gVE9ETzogV2hlbiBhcHBlbmRUb0JvZHkgcGlja2VyIHdvcmtzIGJldHRlciBpbiB0YWJsZS9mb3JtXG4gICAgICAgIGNvbnRyb2wgPSBuZXcgUGlja2VyQ29udHJvbChjb250cm9sQ29uZmlnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdwaWNrZXInOlxuICAgICAgICAvLyBUT0RPOiBXaGVuIGFwcGVuZFRvQm9keSBwaWNrZXIgd29ya3MgYmV0dGVyIGluIHRhYmxlL2Zvcm1cbiAgICAgICAgY29udHJvbCA9IG5ldyBQaWNrZXJDb250cm9sKGNvbnRyb2xDb25maWcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2RhdGV0aW1lJzpcbiAgICAgICAgY29udHJvbENvbmZpZy5taWxpdGFyeSA9IGNvbmZpZyA/ICEhY29uZmlnLm1pbGl0YXJ5IDogZmFsc2U7XG4gICAgICAgIGNvbnRyb2xDb25maWcud2Vla1N0YXJ0ID0gY29uZmlnICYmIGNvbmZpZy53ZWVrU3RhcnQgPyBjb25maWcud2Vla1N0YXJ0IDogMDtcbiAgICAgICAgY29udHJvbCA9IG5ldyBEYXRlVGltZUNvbnRyb2woY29udHJvbENvbmZpZyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgIGNvbnRyb2xDb25maWcuZGF0ZUZvcm1hdCA9IGZpZWxkLmRhdGVGb3JtYXQ7XG4gICAgICAgIGNvbnRyb2xDb25maWcudGV4dE1hc2tFbmFibGVkID0gZmllbGQudGV4dE1hc2tFbmFibGVkO1xuICAgICAgICBjb250cm9sQ29uZmlnLmFsbG93SW52YWxpZERhdGUgPSBmaWVsZC5hbGxvd0ludmFsaWREYXRlO1xuICAgICAgICBjb250cm9sQ29uZmlnLm1pbGl0YXJ5ID0gY29uZmlnID8gISFjb25maWcubWlsaXRhcnkgOiBmYWxzZTtcbiAgICAgICAgY29udHJvbENvbmZpZy53ZWVrU3RhcnQgPSBjb25maWcgJiYgY29uZmlnLndlZWtTdGFydCA/IGNvbmZpZy53ZWVrU3RhcnQgOiAwO1xuICAgICAgICBjb250cm9sID0gbmV3IERhdGVDb250cm9sKGNvbnRyb2xDb25maWcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RpbWUnOlxuICAgICAgICBjb250cm9sQ29uZmlnLm1pbGl0YXJ5ID0gY29uZmlnID8gISFjb25maWcubWlsaXRhcnkgOiBmYWxzZTtcbiAgICAgICAgY29udHJvbCA9IG5ldyBUaW1lQ29udHJvbChjb250cm9sQ29uZmlnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICduYXRpdmUtdGltZSc6XG4gICAgICBjYXNlICduYXRpdmUtZGF0ZSc6XG4gICAgICBjYXNlICduYXRpdmUtd2Vlayc6XG4gICAgICBjYXNlICduYXRpdmUteWVhcic6XG4gICAgICBjYXNlICduYXRpdmUtZGF0ZXRpbWUtbG9jYWwnOlxuICAgICAgY2FzZSAnbmF0aXZlLXRlbCc6XG4gICAgICBjYXNlICduYXRpdmUtZW1haWwnOlxuICAgICAgY2FzZSAnbmF0aXZlLXVybCc6XG4gICAgICBjYXNlICduYXRpdmUtbnVtYmVyJzpcbiAgICAgICAgY29udHJvbCA9IG5ldyBDdXN0b21Db250cm9sKHsgLi4uY29udHJvbENvbmZpZywgdGVtcGxhdGU6ICduYXRpdmUtaW5wdXQnLCB0eXBlOiB0eXBlLnJlcGxhY2UoJ25hdGl2ZS0nLCAnJyksIGFsd2F5c0FjdGl2ZTogdHJ1ZSB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0aW1lem9uZSc6XG4gICAgICAgIGNvbnRyb2wgPSBuZXcgVGltZXpvbmVDb250cm9sKGNvbnRyb2xDb25maWcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2N1cnJlbmN5JzpcbiAgICAgIGNhc2UgJ21vbmV5JzpcbiAgICAgIGNhc2UgJ2VtYWlsJzpcbiAgICAgIGNhc2UgJ3BlcmNlbnRhZ2UnOlxuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ3llYXInOlxuICAgICAgICAvLyBUT0RPOiBPbmx5IHR5cGVzIGZyb20gYGRldGVybWluZUlucHV0VHlwZWAgc2hvdWxkIGJlIHVzZWQgaW4gdGhpcyBjbGFzc1xuICAgICAgICBpZiAodHlwZSA9PT0gJ21vbmV5Jykge1xuICAgICAgICAgIHR5cGUgPSAnY3VycmVuY3knO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRyb2xDb25maWcudHlwZSA9IHR5cGU7XG4gICAgICAgIGNvbnRyb2wgPSBuZXcgVGV4dEJveENvbnRyb2woY29udHJvbENvbmZpZyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndGV4dCc6XG4gICAgICAgIGNvbnRyb2wgPSBuZXcgVGV4dEJveENvbnRyb2woY29udHJvbENvbmZpZyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndGV4dGFyZWEnOlxuICAgICAgICBjb250cm9sID0gbmV3IFRleHRBcmVhQ29udHJvbChjb250cm9sQ29uZmlnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdlZGl0b3InOlxuICAgICAgICBjb250cm9sID0gbmV3IEVkaXRvckNvbnRyb2woY29udHJvbENvbmZpZyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZWRpdG9yLW1pbmltYWwnOlxuICAgICAgICBjb250cm9sID0gbmV3IEVkaXRvckNvbnRyb2woY29udHJvbENvbmZpZyk7XG4gICAgICAgIGNvbnRyb2wubWluaW1hbCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndGlsZXMnOlxuICAgICAgICBjb250cm9sID0gbmV3IFRpbGVzQ29udHJvbChjb250cm9sQ29uZmlnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjaGVja2JveCc6XG4gICAgICAgIGNvbnRyb2xDb25maWcuY2hlY2tib3hMYWJlbCA9IGZpZWxkLmNoZWNrYm94TGFiZWw7XG4gICAgICAgIGNvbnRyb2wgPSBuZXcgQ2hlY2tib3hDb250cm9sKGNvbnRyb2xDb25maWcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3N3aXRjaCc6XG4gICAgICAgIGNvbnRyb2wgPSBuZXcgU3dpdGNoQ29udHJvbChjb250cm9sQ29uZmlnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjaGVja2xpc3QnOlxuICAgICAgICBjb250cm9sID0gbmV3IENoZWNrTGlzdENvbnRyb2woY29udHJvbENvbmZpZyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmFkaW8nOlxuICAgICAgICBjb250cm9sID0gbmV3IFJhZGlvQ29udHJvbChjb250cm9sQ29uZmlnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzZWxlY3QnOlxuICAgICAgICBjb250cm9sID0gbmV3IFNlbGVjdENvbnRyb2woY29udHJvbENvbmZpZyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYWRkcmVzcyc6XG4gICAgICAgIGNvbnRyb2xDb25maWcucmVxdWlyZWQgPSBmaWVsZC5yZXF1aXJlZCB8fCBmYWxzZTtcbiAgICAgICAgaWYgKEhlbHBlcnMuaXNCbGFuayhjb250cm9sQ29uZmlnLmNvbmZpZykpIHtcbiAgICAgICAgICBjb250cm9sQ29uZmlnLmNvbmZpZyA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnRyb2xDb25maWcuY29uZmlnLnJlcXVpcmVkID0gZmllbGQucmVxdWlyZWQ7XG4gICAgICAgIGNvbnRyb2xDb25maWcuY29uZmlnLnJlYWRPbmx5ID0gY29udHJvbENvbmZpZy5yZWFkT25seTtcbiAgICAgICAgaWYgKGZpZWxkLmZpZWxkcyAmJiBmaWVsZC5maWVsZHMubGVuZ3RoKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBzdWJmaWVsZCBvZiBmaWVsZC5maWVsZHMpIHtcbiAgICAgICAgICAgIGNvbnRyb2xDb25maWcuY29uZmlnW3N1YmZpZWxkLm5hbWVdID0ge1xuICAgICAgICAgICAgICByZXF1aXJlZDogISFzdWJmaWVsZC5yZXF1aXJlZCxcbiAgICAgICAgICAgICAgaGlkZGVuOiAhIXN1YmZpZWxkLnJlYWRPbmx5LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICghSGVscGVycy5pc0VtcHR5KHN1YmZpZWxkLmxhYmVsKSkge1xuICAgICAgICAgICAgICBjb250cm9sQ29uZmlnLmNvbmZpZ1tzdWJmaWVsZC5uYW1lXS5sYWJlbCA9IHN1YmZpZWxkLmxhYmVsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFIZWxwZXJzLmlzRW1wdHkoc3ViZmllbGQubWF4TGVuZ3RoKSkge1xuICAgICAgICAgICAgICBjb250cm9sQ29uZmlnLmNvbmZpZ1tzdWJmaWVsZC5uYW1lXS5tYXhsZW5ndGggPSBzdWJmaWVsZC5tYXhMZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250cm9sQ29uZmlnLnJlcXVpcmVkID0gY29udHJvbENvbmZpZy5yZXF1aXJlZCB8fCBzdWJmaWVsZC5yZXF1aXJlZDtcbiAgICAgICAgICAgIGlmIChzdWJmaWVsZC5kZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgICAgICAgaWYgKEhlbHBlcnMuaXNCbGFuayhjb250cm9sQ29uZmlnLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xDb25maWcudmFsdWUgPSB7fTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb250cm9sQ29uZmlnLnZhbHVlW3N1YmZpZWxkLm5hbWVdID0gc3ViZmllbGQuZGVmYXVsdFZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdWJmaWVsZC5uYW1lID09PSAnY291bnRyeUlEJykge1xuICAgICAgICAgICAgICBpZiAoSGVscGVycy5pc0JsYW5rKGNvbnRyb2xDb25maWcudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgY29udHJvbENvbmZpZy52YWx1ZSA9IHt9O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnRyb2xDb25maWcudmFsdWVbc3ViZmllbGQubmFtZV0gPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN1YmZpZWxkLm5hbWUgPT09ICdzdGF0ZScgfHwgc3ViZmllbGQubmFtZSA9PT0gJ2NvdW50cnlJRCcpIHtcbiAgICAgICAgICAgICAgaWYgKHN1YmZpZWxkLm5hbWUgPT09ICdjb3VudHJ5SUQnKSB7XG4gICAgICAgICAgICAgICAgc3ViZmllbGQub3B0aW9uc1R5cGUgPSAnQ291bnRyeSc7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKCFzdWJmaWVsZC5vcHRpb25zVXJsKSB7XG4gICAgICAgICAgICAgICAgc3ViZmllbGQub3B0aW9uc1VybCA9IGBvcHRpb25zLyR7c3ViZmllbGQub3B0aW9uc1R5cGV9YDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb250cm9sQ29uZmlnLmNvbmZpZ1tzdWJmaWVsZC5uYW1lXS5waWNrZXJDb25maWcgPSB0aGlzLmdldENvbnRyb2xPcHRpb25zKHN1YmZpZWxkLCBodHRwLCBjb25maWcsIGZpZWxkRGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnRyb2xDb25maWcuaXNFbXB0eSA9IHRoaXMuaXNBZGRyZXNzRW1wdHk7XG4gICAgICAgIGNvbnRyb2wgPSBuZXcgQWRkcmVzc0NvbnRyb2woY29udHJvbENvbmZpZyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZmlsZSc6XG4gICAgICAgIGNvbnRyb2wgPSBuZXcgRmlsZUNvbnRyb2woY29udHJvbENvbmZpZyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY3VzdG9tJzpcbiAgICAgICAgY29udHJvbCA9IG5ldyBDdXN0b21Db250cm9sKGNvbnRyb2xDb25maWcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnRyb2wgPSBuZXcgVGV4dEJveENvbnRyb2woY29udHJvbENvbmZpZyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gY29udHJvbDtcbiAgfVxuXG4gIHByaXZhdGUgc2hvdWxkQ3JlYXRlQ29udHJvbChmaWVsZCk6IGJvb2xlYW4ge1xuICAgIGlmIChmaWVsZC5zeXN0ZW1SZXF1aXJlZCkge1xuICAgICAgZmllbGQucmVhZE9ubHkgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgZmllbGQubmFtZSAhPT0gJ2lkJyAmJlxuICAgICAgKCFbJ1NZU1RFTScsICdTRUNUSU9OX0hFQURFUiddLmluY2x1ZGVzKGZpZWxkLmRhdGFTcGVjaWFsaXphdGlvbikgfHxcbiAgICAgICAgWydhZGRyZXNzJywgJ2JpbGxpbmdBZGRyZXNzJywgJ3NlY29uZGFyeUFkZHJlc3MnXS5pbmNsdWRlcyhmaWVsZC5uYW1lKSkgJiZcbiAgICAgICFmaWVsZC5yZWFkT25seVxuICAgICk7XG4gIH1cblxuICB0b0NvbnRyb2xzKFxuICAgIG1ldGEsXG4gICAgY3VycmVuY3lGb3JtYXQsXG4gICAgaHR0cCxcbiAgICBjb25maWc6IHsgdG9rZW4/OiBzdHJpbmc7IHJlc3RVcmw/OiBzdHJpbmc7IG1pbGl0YXJ5PzogYm9vbGVhbjsgd2Vla1N0YXJ0PzogbnVtYmVyIH0sXG4gICAgb3ZlcnJpZGVzPzogYW55LFxuICAgIGZvclRhYmxlOiBib29sZWFuID0gZmFsc2UsXG4gICkge1xuICAgIGNvbnN0IGNvbnRyb2xzID0gW107XG4gICAgaWYgKG1ldGEgJiYgbWV0YS5maWVsZHMpIHtcbiAgICAgIGNvbnN0IGZpZWxkcyA9IG1ldGEuZmllbGRzO1xuICAgICAgZmllbGRzLmZvckVhY2goKGZpZWxkKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnNob3VsZENyZWF0ZUNvbnRyb2woZmllbGQpKSB7XG4gICAgICAgICAgY29uc3QgY29udHJvbCA9IHRoaXMuZ2V0Q29udHJvbEZvckZpZWxkKGZpZWxkLCBodHRwLCBjb25maWcsIG92ZXJyaWRlcywgZm9yVGFibGUpO1xuICAgICAgICAgIC8vIFNldCBjdXJyZW5jeSBmb3JtYXRcbiAgICAgICAgICBpZiAoY29udHJvbC5zdWJUeXBlID09PSAnY3VycmVuY3knKSB7XG4gICAgICAgICAgICBjb250cm9sLmN1cnJlbmN5Rm9ybWF0ID0gY3VycmVuY3lGb3JtYXQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIEFkZCB0byBjb250cm9sc1xuICAgICAgICAgIGNvbnRyb2xzLnB1c2goY29udHJvbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gY29udHJvbHM7XG4gIH1cblxuICB0b1RhYmxlQ29udHJvbHMobWV0YSwgY3VycmVuY3lGb3JtYXQsIGh0dHAsIGNvbmZpZzogeyB0b2tlbj86IHN0cmluZzsgcmVzdFVybD86IHN0cmluZzsgbWlsaXRhcnk/OiBib29sZWFuIH0sIG92ZXJyaWRlcz86IGFueSkge1xuICAgIGNvbnN0IGNvbnRyb2xzID0gdGhpcy50b0NvbnRyb2xzKG1ldGEsIGN1cnJlbmN5Rm9ybWF0LCBodHRwLCBjb25maWcsIG92ZXJyaWRlcywgdHJ1ZSk7XG4gICAgY29uc3QgcmV0ID0ge307XG4gICAgY29udHJvbHMuZm9yRWFjaCgoY29udHJvbDogQmFzZUNvbnRyb2wpID0+IHtcbiAgICAgIHJldFtjb250cm9sLmtleV0gPSB7XG4gICAgICAgIGVkaXRvclR5cGU6IGNvbnRyb2wuX190eXBlLFxuICAgICAgICBlZGl0b3JDb25maWc6IGNvbnRyb2wuX19jb25maWcsXG4gICAgICB9O1xuICAgIH0pO1xuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICB0b0ZpZWxkU2V0cyhcbiAgICBtZXRhLFxuICAgIGN1cnJlbmN5Rm9ybWF0LFxuICAgIGh0dHAsXG4gICAgY29uZmlnOiB7IHRva2VuPzogc3RyaW5nOyByZXN0VXJsPzogc3RyaW5nOyBtaWxpdGFyeT86IGJvb2xlYW47IHdlZWtTdGFydD86IG51bWJlciB9LFxuICAgIG92ZXJyaWRlcz8sXG4gICAgZGF0YT86IHsgW2tleTogc3RyaW5nXTogYW55IH0sXG4gICkge1xuICAgIGNvbnN0IGZpZWxkc2V0czogQXJyYXk8Tm92b0ZpZWxkc2V0PiA9IFtdO1xuICAgIGxldCBmb3JtRmllbGRzID0gW107XG5cbiAgICBpZiAobWV0YSAmJiBtZXRhLmZpZWxkcykge1xuICAgICAgZm9ybUZpZWxkcyA9IHRoaXMuZ2V0Rm9ybUZpZWxkcyhtZXRhKTtcblxuICAgICAgZm9ybUZpZWxkcy5mb3JFYWNoKChmaWVsZCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5pc0hlYWRlcihmaWVsZCkpIHtcbiAgICAgICAgICBpZiAoZmllbGQuZW5hYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5pbnNlcnRIZWFkZXJUb0ZpZWxkc2V0cyhmaWVsZHNldHMsIGZpZWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0VtYmVkZGVkRmllbGQoZmllbGQpKSB7XG4gICAgICAgICAgdGhpcy5pbnNlcnRIZWFkZXJUb0ZpZWxkc2V0cyhmaWVsZHNldHMsIGZpZWxkKTtcblxuICAgICAgICAgIGNvbnN0IGVtYmVkZGVkRmllbGRzID0gdGhpcy5nZXRFbWJlZGRlZEZpZWxkcyhmaWVsZCk7XG5cbiAgICAgICAgICBlbWJlZGRlZEZpZWxkcy5mb3JFYWNoKChlbWJlZGRlZEZpZWxkKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5zaG91bGRDcmVhdGVDb250cm9sKGVtYmVkZGVkRmllbGQpKSB7XG4gICAgICAgICAgICAgIGxldCBjb250cm9sID0gdGhpcy5jcmVhdGVDb250cm9sKGVtYmVkZGVkRmllbGQsIGRhdGEsIGh0dHAsIGNvbmZpZywgb3ZlcnJpZGVzLCBjdXJyZW5jeUZvcm1hdCk7XG4gICAgICAgICAgICAgIGNvbnRyb2wgPSB0aGlzLm1hcmtDb250cm9sQXNFbWJlZGRlZChjb250cm9sLCBmaWVsZC5kYXRhU3BlY2lhbGl6YXRpb24gPyBmaWVsZC5kYXRhU3BlY2lhbGl6YXRpb24udG9Mb3dlckNhc2UoKSA6IG51bGwpO1xuICAgICAgICAgICAgICBmaWVsZHNldHNbZmllbGRzZXRzLmxlbmd0aCAtIDFdLmNvbnRyb2xzLnB1c2goY29udHJvbCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNIZWFkZXIoZW1iZWRkZWRGaWVsZCkpIHtcbiAgICAgICAgICAgICAgdGhpcy5pbnNlcnRIZWFkZXJUb0ZpZWxkc2V0cyhmaWVsZHNldHMsIGVtYmVkZGVkRmllbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2hvdWxkQ3JlYXRlQ29udHJvbChmaWVsZCkpIHtcbiAgICAgICAgICBsZXQgY29udHJvbCA9IHRoaXMuY3JlYXRlQ29udHJvbChmaWVsZCwgZGF0YSwgaHR0cCwgY29uZmlnLCBvdmVycmlkZXMsIGN1cnJlbmN5Rm9ybWF0KTtcbiAgICAgICAgICBpZiAoZmllbGQuaW5saW5lRW1iZWRkZWRBc3NvY2lhdGVkRW50aXR5RmllbGQpIHtcbiAgICAgICAgICAgIGNvbnRyb2wgPSB0aGlzLm1hcmtDb250cm9sQXNFbWJlZGRlZChjb250cm9sLCAnaW5saW5lX2VtYmVkZGVkJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGZpZWxkc2V0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGZpZWxkc2V0cy5wdXNoKHsgY29udHJvbHM6IFtdIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZpZWxkc2V0c1tmaWVsZHNldHMubGVuZ3RoIC0gMV0uY29udHJvbHMucHVzaChjb250cm9sKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChmaWVsZHNldHMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIGZpZWxkc2V0cztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAge1xuICAgICAgICAgIGNvbnRyb2xzOiB0aGlzLnRvQ29udHJvbHMobWV0YSwgY3VycmVuY3lGb3JtYXQsIGh0dHAsIGNvbmZpZyksXG4gICAgICAgIH0sXG4gICAgICBdO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaXNFbWJlZGRlZEZpZWxkKGZpZWxkKSB7XG4gICAgcmV0dXJuIGZpZWxkLmRhdGFTcGVjaWFsaXphdGlvbiAmJiBbJ2VtYmVkZGVkJ10uaW5jbHVkZXMoZmllbGQuZGF0YVNwZWNpYWxpemF0aW9uLnRvTG93ZXJDYXNlKCkpICYmICFmaWVsZC5yZWFkT25seTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlQ29udHJvbChmaWVsZCwgZGF0YSwgaHR0cCwgY29uZmlnLCBvdmVycmlkZXMsIGN1cnJlbmN5Rm9ybWF0KSB7XG4gICAgY29uc3QgZmllbGREYXRhID0gdGhpcy5pc0VtYmVkZGVkRmllbGREYXRhKGZpZWxkLCBkYXRhKSA/IHRoaXMuZ2V0RW1iZWRkZWRGaWVsZERhdGEoZmllbGQsIGRhdGEpIDogdGhpcy5nZXRGaWVsZERhdGEoZmllbGQsIGRhdGEpO1xuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmdldENvbnRyb2xGb3JGaWVsZChmaWVsZCwgaHR0cCwgY29uZmlnLCBvdmVycmlkZXMsIHVuZGVmaW5lZCwgZmllbGREYXRhKTtcbiAgICAvLyBTZXQgY3VycmVuY3kgZm9ybWF0XG4gICAgaWYgKGNvbnRyb2wuc3ViVHlwZSA9PT0gJ2N1cnJlbmN5Jykge1xuICAgICAgY29udHJvbC5jdXJyZW5jeUZvcm1hdCA9IGN1cnJlbmN5Rm9ybWF0O1xuICAgIH1cbiAgICByZXR1cm4gY29udHJvbDtcbiAgfVxuXG4gIHByaXZhdGUgaXNFbWJlZGRlZEZpZWxkRGF0YShmaWVsZCwgZGF0YSkge1xuICAgIHJldHVybiBkYXRhICYmIGZpZWxkLm5hbWUuaW5jbHVkZXMoJy4nKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RmllbGREYXRhKGZpZWxkLCBkYXRhKSB7XG4gICAgcmV0dXJuIChkYXRhICYmIGRhdGFbZmllbGQubmFtZV0pIHx8IG51bGw7XG4gIH1cblxuICBwcml2YXRlIGdldEVtYmVkZGVkRmllbGREYXRhKGZpZWxkLCBkYXRhKSB7XG4gICAgY29uc3QgW3BhcmVudEZpZWxkTmFtZSwgZmllbGROYW1lXSA9IGZpZWxkLm5hbWUuc3BsaXQoJy4nKTtcbiAgICByZXR1cm4gKGRhdGEgJiYgZGF0YVtwYXJlbnRGaWVsZE5hbWVdICYmIGRhdGFbcGFyZW50RmllbGROYW1lXVtmaWVsZE5hbWVdKSB8fCBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRGb3JtRmllbGRzKG1ldGEpIHtcbiAgICBjb25zdCBzZWN0aW9uSGVhZGVycyA9IG1ldGEuc2VjdGlvbkhlYWRlcnNcbiAgICAgID8gbWV0YS5zZWN0aW9uSGVhZGVycy5tYXAoKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICBlbGVtZW50LmlzU2VjdGlvbkhlYWRlciA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgIH0pXG4gICAgICA6IFtdO1xuXG4gICAgbGV0IGZpZWxkcyA9IG1ldGEuZmllbGRzLm1hcCgoZmllbGQpID0+IHtcbiAgICAgIGZpZWxkLnBhcmVudEVudGl0eSA9IG1ldGEuZW50aXR5O1xuICAgICAgaWYgKCFmaWVsZC5oYXNPd25Qcm9wZXJ0eSgnc29ydE9yZGVyJykpIHtcbiAgICAgICAgZmllbGQuc29ydE9yZGVyID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIgLSAxO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZpZWxkO1xuICAgIH0pO1xuXG4gICAgLy8gYnVpbGQgbGlzdCBvZiBmaWVsZHMgdGhhdCBzaG91bGQgYmUgZGlzcGxheWVkIGlubGluZSBidXQgYmVsb25nIHRvIGFzc29jaWF0ZWQgZW50aXRpZXNcbiAgICBjb25zdCBpbmxpbmVFbWJlZGRlZEFzc29jaWF0ZWRFbnRpdHlGaWVsZHMgPSB0aGlzLmdldElubGluZUVtYmVkZGVkRmllbGRzKGZpZWxkcyk7XG5cbiAgICAvLyByZW1vdmUgdGhlIGlubGluZSBlbWJlZGRlZCBmaWVsZHMgYmVjYXVzZSB0aGUgYXNzb2NpYXRlZCBlbnRpdHkgZmllbGRzIHdlcmUgZXh0cmFjdGVkIGFib3ZlXG4gICAgLy8gYW5kIHdpbGwgYmUgYWRkZWQgdG8gdGhlIHJlZ3VsYXIgbGlzdCBvZiBmaWVsZHMuIFRoaXMgcHJldmVudHMgdGhlIGZpZWxkcyBmcm9tIGJlaW5nIGFkZGVkIG11bHRpcGxlIHRpbWVzLlxuICAgIGZpZWxkcyA9IGZpZWxkcy5maWx0ZXIoKGYpID0+ICFmLmRhdGFTcGVjaWFsaXphdGlvbiB8fCBmLmRhdGFTcGVjaWFsaXphdGlvbi50b0xvd2VyQ2FzZSgpICE9PSAnaW5saW5lX2VtYmVkZGVkJyk7XG5cbiAgICAvLyBzb3J0IGZpZWxkc1xuICAgIHJldHVybiBbLi4uc2VjdGlvbkhlYWRlcnMsIC4uLmZpZWxkcywgLi4uaW5saW5lRW1iZWRkZWRBc3NvY2lhdGVkRW50aXR5RmllbGRzXS5zb3J0KEhlbHBlcnMuc29ydEJ5RmllbGQoWydzb3J0T3JkZXInLCAnbmFtZSddKSk7XG4gIH1cblxuICBwcml2YXRlIGdldElubGluZUVtYmVkZGVkRmllbGRzKGZpZWxkcykge1xuICAgIGxldCBpbmxpbmVFbWJlZGRlZEFzc29jaWF0ZWRFbnRpdHlGaWVsZHMgPSBbXTtcbiAgICBmaWVsZHNcbiAgICAgIC5maWx0ZXIoKGYpID0+IGYuZGF0YVNwZWNpYWxpemF0aW9uICYmIGYuZGF0YVNwZWNpYWxpemF0aW9uLnRvTG93ZXJDYXNlKCkgPT09ICdpbmxpbmVfZW1iZWRkZWQnKVxuICAgICAgLmZvckVhY2goKGYpID0+IHtcbiAgICAgICAgaW5saW5lRW1iZWRkZWRBc3NvY2lhdGVkRW50aXR5RmllbGRzID0gWy4uLmlubGluZUVtYmVkZGVkQXNzb2NpYXRlZEVudGl0eUZpZWxkcywgLi4udGhpcy5nZXRBc3NvY2lhdGVkRmllbGRzRm9ySW5saW5lRW1iZWRkZWQoZildO1xuICAgICAgfSk7XG4gICAgcmV0dXJuIGlubGluZUVtYmVkZGVkQXNzb2NpYXRlZEVudGl0eUZpZWxkcztcbiAgfVxuXG4gIHByaXZhdGUgZ2V0QXNzb2NpYXRlZEZpZWxkc0ZvcklubGluZUVtYmVkZGVkKGZpZWxkKSB7XG4gICAgbGV0IGFzc29jaWF0ZWRFbnRpdHlGaWVsZHMgPSBbXTtcbiAgICBhc3NvY2lhdGVkRW50aXR5RmllbGRzID0gdGhpcy5nZXRFbWJlZGRlZEZpZWxkcyhmaWVsZCkubWFwKChhZWYpID0+IHtcbiAgICAgIGFlZi5pbmxpbmVFbWJlZGRlZEFzc29jaWF0ZWRFbnRpdHlGaWVsZCA9IHRydWU7XG4gICAgICByZXR1cm4gYWVmO1xuICAgIH0pO1xuICAgIHJldHVybiBhc3NvY2lhdGVkRW50aXR5RmllbGRzO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRFbWJlZGRlZEZpZWxkcyhzdWJIZWFkZXIpIHtcbiAgICByZXR1cm4gc3ViSGVhZGVyLmFzc29jaWF0ZWRFbnRpdHkuZmllbGRzXG4gICAgICAuZmlsdGVyKChmaWVsZCkgPT4gZmllbGQubmFtZSAhPT0gJ2lkJylcbiAgICAgIC5tYXAoKGZpZWxkKSA9PiB7XG4gICAgICAgIGlmICghZmllbGQubmFtZS5zdGFydHNXaXRoKGAke3N1YkhlYWRlci5uYW1lfS5gKSkge1xuICAgICAgICAgIGZpZWxkLm5hbWUgPSBgJHtzdWJIZWFkZXIubmFtZX0uJHtmaWVsZC5uYW1lfWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZpZWxkO1xuICAgICAgfSlcbiAgICAgIC5zb3J0KEhlbHBlcnMuc29ydEJ5RmllbGQoWydzb3J0T3JkZXInLCAnbmFtZSddKSk7XG4gIH1cblxuICBwcml2YXRlIGlzSGVhZGVyKGZpZWxkKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgICFIZWxwZXJzLmlzQmxhbmsoZmllbGQpICYmXG4gICAgICAoKGZpZWxkLmhhc093blByb3BlcnR5KCdpc1NlY3Rpb25IZWFkZXInKSAmJiBmaWVsZC5pc1NlY3Rpb25IZWFkZXIpIHx8XG4gICAgICAgIChmaWVsZC5kYXRhU3BlY2lhbGl6YXRpb24gJiYgZmllbGQuZGF0YVNwZWNpYWxpemF0aW9uLnRvTG93ZXJDYXNlKCkgPT09ICdzZWN0aW9uX2hlYWRlcicpKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGluc2VydEhlYWRlclRvRmllbGRzZXRzKGZpZWxkc2V0cywgZmllbGQpIHtcbiAgICBjb25zdCBjb25zdGFudFByb3BlcnRpZXMgPSB7XG4gICAgICBjb250cm9sczogW10sXG4gICAgICBpc0VtYmVkZGVkOiBmaWVsZC5kYXRhU3BlY2lhbGl6YXRpb24gJiYgZmllbGQuZGF0YVNwZWNpYWxpemF0aW9uLnRvTG93ZXJDYXNlKCkgPT09ICdlbWJlZGRlZCcsXG4gICAgICBpc0lubGluZUVtYmVkZGVkOiBmaWVsZC5kYXRhU3BlY2lhbGl6YXRpb24gJiYgZmllbGQuZGF0YVNwZWNpYWxpemF0aW9uLnRvTG93ZXJDYXNlKCkgPT09ICdpbmxpbmVfZW1iZWRkZWQnLFxuICAgICAga2V5OiBmaWVsZC5uYW1lLFxuICAgIH07XG4gICAgaWYgKGZpZWxkLm5hbWUgJiYgZmllbGQubmFtZS5zdGFydHNXaXRoKCdjdXN0b21PYmplY3QnKSAmJiBmaWVsZC5hc3NvY2lhdGVkRW50aXR5ICYmIGZpZWxkLmFzc29jaWF0ZWRFbnRpdHkubGFiZWwpIHtcbiAgICAgIGZpZWxkc2V0cy5wdXNoKHtcbiAgICAgICAgdGl0bGU6IGZpZWxkLmFzc29jaWF0ZWRFbnRpdHkubGFiZWwgfHwgZmllbGQubGFiZWwsXG4gICAgICAgIGljb246IGZpZWxkLmljb24gfHwgJ2JoaS1jYXJkLWV4cGFuZCcsXG4gICAgICAgIC4uLmNvbnN0YW50UHJvcGVydGllcyxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWVsZHNldHMucHVzaCh7XG4gICAgICAgIHRpdGxlOiBmaWVsZC5sYWJlbCxcbiAgICAgICAgaWNvbjogZmllbGQuaWNvbiB8fCAnYmhpLXNlY3Rpb24nLFxuICAgICAgICAuLi5jb25zdGFudFByb3BlcnRpZXMsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1hcmtDb250cm9sQXNFbWJlZGRlZChjb250cm9sLCBkYXRhU3BlY2lhbGl6YXRpb24/OiAnZW1iZWRkZWQnIHwgJ2lubGluZV9lbWJlZGRlZCcpIHtcbiAgICBpZiAoSGVscGVycy5pc0JsYW5rKGNvbnRyb2wuY29uZmlnKSkge1xuICAgICAgY29udHJvbC5jb25maWcgPSB7fTtcbiAgICB9XG4gICAgY29udHJvbC5jb25maWcuZW1iZWRkZWQgPSB0cnVlO1xuICAgIGNvbnRyb2wuaXNFbWJlZGRlZCA9IGRhdGFTcGVjaWFsaXphdGlvbiA9PT0gJ2VtYmVkZGVkJztcbiAgICBjb250cm9sLmlzSW5saW5lRW1iZWRkZWQgPSBkYXRhU3BlY2lhbGl6YXRpb24gPT09ICdpbmxpbmVfZW1iZWRkZWQnO1xuICAgIHJldHVybiBjb250cm9sO1xuICB9XG5cbiAgZ2V0Q29udHJvbE9wdGlvbnMoZmllbGQ6IGFueSwgaHR0cDogYW55LCBjb25maWc6IHsgdG9rZW4/OiBzdHJpbmc7IHJlc3RVcmw/OiBzdHJpbmc7IG1pbGl0YXJ5PzogYm9vbGVhbiB9LCBmaWVsZERhdGE/OiBhbnkpOiBhbnkge1xuICAgIC8vIFRPRE86IFRoZSB0b2tlbiBwcm9wZXJ0eSBvZiBjb25maWcgaXMgdGhlIG9ubHkgcHJvcGVydHkgdXNlZDsganVzdCBwYXNzIGluIGB0b2tlbjogc3RyaW5nYFxuICAgIGlmIChmaWVsZC5kYXRhVHlwZSA9PT0gJ0Jvb2xlYW4nICYmICFmaWVsZC5vcHRpb25zKSB7XG4gICAgICAvLyBUT0RPOiBkYXRhVHlwZSBzaG91bGQgb25seSBiZSBkZXRlcm1pbmVkIGJ5IGBkZXRlcm1pbmVJbnB1dFR5cGVgIHdoaWNoIGRvZXNuJ3QgZXZlciByZXR1cm4gJ0Jvb2xlYW4nIGl0XG4gICAgICAvLyBUT0RPOiAoY29udC4pIHJldHVybnMgYHRpbGVzYFxuICAgICAgcmV0dXJuIFtcbiAgICAgICAgeyB2YWx1ZTogZmFsc2UsIGxhYmVsOiB0aGlzLmxhYmVscy5ubyB9LFxuICAgICAgICB7IHZhbHVlOiB0cnVlLCBsYWJlbDogdGhpcy5sYWJlbHMueWVzIH0sXG4gICAgICBdO1xuICAgIH0gZWxzZSBpZiAoZmllbGQuZGF0YVNwZWNpYWxpemF0aW9uID09PSAnQUxMX1dPUktGTE9XX09QVElPTlMnICYmIGZpZWxkLm9wdGlvbnMpIHtcbiAgICAgIHJldHVybiBmaWVsZC5vcHRpb25zO1xuICAgIH0gZWxzZSBpZiAoZmllbGQud29ya2Zsb3dPcHRpb25zKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRXb3JrZmxvd09wdGlvbnMoZmllbGQud29ya2Zsb3dPcHRpb25zLCBmaWVsZERhdGEpO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICBmaWVsZC5kYXRhU3BlY2lhbGl6YXRpb24gPT09ICdTUEVDSUFMSVpFRF9PUFRJT05TJyB8fFxuICAgICAgKGZpZWxkLm9wdGlvbnMgJiYgWydTcGVjaWFsaXplZE9wdGlvbnNMb29rdXAnLCAnU2ltcGxpZmllZE9wdGlvbnNMb29rdXAnXS5pbmNsdWRlcyhmaWVsZC5kYXRhVHlwZSkpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmllbGQub3B0aW9ucztcbiAgICB9IGVsc2UgaWYgKGZpZWxkLm9wdGlvbnNVcmwpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnNTZXJ2aWNlLmdldE9wdGlvbnNDb25maWcoaHR0cCwgZmllbGQsIGNvbmZpZyk7XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGZpZWxkLm9wdGlvbnMpICYmIGZpZWxkLnR5cGUgPT09ICdjaGlwcycpIHtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSBmaWVsZC5vcHRpb25zO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZmllbGQ6ICd2YWx1ZScsXG4gICAgICAgIGZvcm1hdDogJyRsYWJlbCcsXG4gICAgICAgIG9wdGlvbnMsXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAoZmllbGQub3B0aW9ucykge1xuICAgICAgcmV0dXJuIGZpZWxkLm9wdGlvbnM7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRXb3JrZmxvd09wdGlvbnMoXG4gICAgd29ya2Zsb3dPcHRpb25zOiB7IFtrZXk6IHN0cmluZ106IGFueSB9LFxuICAgIGZpZWxkRGF0YTogeyBpZD86IG51bWJlcjsgdmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7IGxhYmVsPzogc3RyaW5nIHwgbnVtYmVyIH0gfCBudWxsLFxuICApOiBBcnJheTx7IGlkPzogbnVtYmVyOyB2YWx1ZT86IHN0cmluZyB8IG51bWJlcjsgbGFiZWw/OiBzdHJpbmcgfCBudW1iZXIgfT4ge1xuICAgIGxldCBjdXJyZW50VmFsdWU6IHsgaWQ/OiBudW1iZXI7IHZhbHVlPzogc3RyaW5nIHwgbnVtYmVyOyBsYWJlbD86IHN0cmluZyB8IG51bWJlciB9ID0gbnVsbDtcbiAgICBsZXQgY3VycmVudFdvcmtmbG93T3B0aW9uOiBudW1iZXIgfCBzdHJpbmcgPSAnaW5pdGlhbCc7XG4gICAgaWYgKGZpZWxkRGF0YT8uaWQpIHtcbiAgICAgIGN1cnJlbnRWYWx1ZSA9IHsgLi4uZmllbGREYXRhLCB2YWx1ZTogZmllbGREYXRhLmlkLCBsYWJlbDogZmllbGREYXRhLmxhYmVsIHx8IGZpZWxkRGF0YS5pZCB9O1xuICAgICAgY3VycmVudFdvcmtmbG93T3B0aW9uID0gZmllbGREYXRhLmlkO1xuICAgIH1cbiAgICBjb25zdCB1cGRhdGVXb3JrZmxvd09wdGlvbnM6IEFycmF5PHsgaWQ/OiBudW1iZXI7IHZhbHVlPzogc3RyaW5nIHwgbnVtYmVyOyBsYWJlbD86IHN0cmluZyB8IG51bWJlciB9PiA9XG4gICAgICB3b3JrZmxvd09wdGlvbnNbY3VycmVudFdvcmtmbG93T3B0aW9uXSB8fCBbXTtcblxuICAgIC8vIEVuc3VyZSB0aGF0IHRoZSBjdXJyZW50IHZhbHVlIGlzIGFkZGVkIHRvIHRoZSBiZWdpbm5pbmcgb2YgdGhlIG9wdGlvbnMgbGlzdFxuICAgIGlmIChjdXJyZW50VmFsdWUgJiYgIXVwZGF0ZVdvcmtmbG93T3B0aW9ucy5maW5kKChvcHRpb24pID0+IG9wdGlvbi52YWx1ZSA9PT0gY3VycmVudFZhbHVlLnZhbHVlKSkge1xuICAgICAgdXBkYXRlV29ya2Zsb3dPcHRpb25zLnVuc2hpZnQoY3VycmVudFZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdXBkYXRlV29ya2Zsb3dPcHRpb25zO1xuICB9XG5cbiAgc2V0SW5pdGlhbFZhbHVlcyhjb250cm9sczogQXJyYXk8Tm92b0NvbnRyb2xDb25maWc+LCB2YWx1ZXM6IGFueSwga2VlcENsZWFuPzogYm9vbGVhbiwga2V5T3ZlcnJpZGU/OiBzdHJpbmcpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbnRyb2xzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjb250cm9sID0gY29udHJvbHNbaV07XG4gICAgICBjb25zdCBrZXkgPSBrZXlPdmVycmlkZSA/IGNvbnRyb2wua2V5LnJlcGxhY2Uoa2V5T3ZlcnJpZGUsICcnKSA6IGNvbnRyb2wua2V5O1xuICAgICAgbGV0IHZhbHVlID0gdmFsdWVzW2tleV07XG5cbiAgICAgIGlmIChIZWxwZXJzLmlzQmxhbmsodmFsdWUpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLmZpbHRlcigodmFsKSA9PiAhKE9iamVjdC5rZXlzKHZhbCkubGVuZ3RoID09PSAwICYmIHZhbC5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSk7XG4gICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodmFsdWUuZGF0YSAmJiB2YWx1ZS5kYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKE9iamVjdC5rZXlzKHZhbHVlKS5sZW5ndGggPT09IDAgJiYgdmFsdWUuY29uc3RydWN0b3IgPT09IE9iamVjdCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbnRyb2wuZGF0YVR5cGUgPT09ICdEYXRlJyAmJiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIGNvbnRyb2wub3B0aW9uc1R5cGUgIT09ICdza2lwQ29udmVyc2lvbicpIHtcbiAgICAgICAgdmFsdWUgPSBkYXRlRm5zLnN0YXJ0T2ZEYXkodmFsdWUpO1xuICAgICAgfVxuXG4gICAgICBjb250cm9sLnZhbHVlID0gdmFsdWU7XG4gICAgICAvLyBUT0RPOiBrZWVwQ2xlYW4gaXMgbm90IHJlcXVpcmVkLCBidXQgaXMgYWx3YXlzIHVzZWQuIEl0IHNob3VsZCBkZWZhdWx0ICh0byB0cnVlPylcbiAgICAgIGNvbnRyb2wuZGlydHkgPSAha2VlcENsZWFuO1xuICAgIH1cbiAgfVxuXG4gIHNldEluaXRpYWxWYWx1ZXNGaWVsZHNldHMoZmllbGRzZXRzOiBBcnJheTxOb3ZvRmllbGRzZXQ+LCB2YWx1ZXMsIGtlZXBDbGVhbj86IGJvb2xlYW4pIHtcbiAgICBmaWVsZHNldHMuZm9yRWFjaCgoZmllbGRzZXQpID0+IHtcbiAgICAgIHRoaXMuc2V0SW5pdGlhbFZhbHVlcyhmaWVsZHNldC5jb250cm9scywgdmFsdWVzLCBrZWVwQ2xlYW4pO1xuICAgIH0pO1xuICB9XG5cbiAgZm9yY2VTaG93QWxsQ29udHJvbHMoY29udHJvbHM6IEFycmF5PE5vdm9Db250cm9sQ29uZmlnPikge1xuICAgIGNvbnRyb2xzLmZvckVhY2goKGNvbnRyb2wpID0+IHtcbiAgICAgIGNvbnRyb2wuaGlkZGVuID0gZmFsc2U7XG4gICAgfSk7XG4gIH1cblxuICBmb3JjZVNob3dBbGxDb250cm9sc0luRmllbGRzZXRzKGZpZWxkc2V0czogQXJyYXk8Tm92b0ZpZWxkc2V0Pikge1xuICAgIGZpZWxkc2V0cy5mb3JFYWNoKChmaWVsZHNldCkgPT4ge1xuICAgICAgZmllbGRzZXQuY29udHJvbHMuZm9yRWFjaCgoY29udHJvbCkgPT4ge1xuICAgICAgICBjb250cm9sLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmb3JjZVZhbGlkYXRpb24oZm9ybTogTm92b0Zvcm1Hcm91cCk6IHZvaWQge1xuICAgIE9iamVjdC5rZXlzKGZvcm0uY29udHJvbHMpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBjb250cm9sOiBhbnkgPSBmb3JtLmNvbnRyb2xzW2tleV07XG4gICAgICBpZiAoY29udHJvbC5yZXF1aXJlZCAmJiBIZWxwZXJzLmlzQmxhbmsoZm9ybS5nZXRSYXdWYWx1ZSgpW2NvbnRyb2wua2V5XSkpIHtcbiAgICAgICAgY29udHJvbC5tYXJrQXNEaXJ0eSgpO1xuICAgICAgICBjb250cm9sLm1hcmtBc1RvdWNoZWQoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGlzQWRkcmVzc0VtcHR5KGNvbnRyb2w6IGFueSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGZpZWxkTGlzdDogc3RyaW5nW10gPSBbJ2FkZHJlc3MxJywgJ2FkZHJlc3MyJywgJ2NpdHknLCAnc3RhdGUnLCAnemlwJywgJ2NvdW50cnlJRCddO1xuICAgIGxldCB2YWxpZDogYm9vbGVhbiA9IHRydWU7XG4gICAgaWYgKGNvbnRyb2wudmFsdWUgJiYgY29udHJvbC5jb25maWcpIHtcbiAgICAgIGZpZWxkTGlzdC5mb3JFYWNoKChzdWJmaWVsZDogc3RyaW5nKSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAoKHN1YmZpZWxkICE9PSAnY291bnRyeUlEJyAmJlxuICAgICAgICAgICAgIUhlbHBlcnMuaXNFbXB0eShjb250cm9sLmNvbmZpZ1tzdWJmaWVsZF0pICYmXG4gICAgICAgICAgICBjb250cm9sLmNvbmZpZ1tzdWJmaWVsZF0ucmVxdWlyZWQgJiZcbiAgICAgICAgICAgIChIZWxwZXJzLmlzQmxhbmsoY29udHJvbC52YWx1ZVtzdWJmaWVsZF0pIHx8IEhlbHBlcnMuaXNFbXB0eShjb250cm9sLnZhbHVlW3N1YmZpZWxkXSkpKSB8fFxuICAgICAgICAgICAgKHN1YmZpZWxkID09PSAnY291bnRyeUlEJyAmJlxuICAgICAgICAgICAgICAhSGVscGVycy5pc0VtcHR5KGNvbnRyb2wuY29uZmlnLmNvdW50cnlJRCkgJiZcbiAgICAgICAgICAgICAgY29udHJvbC5jb25maWcuY291bnRyeUlELnJlcXVpcmVkICYmXG4gICAgICAgICAgICAgIEhlbHBlcnMuaXNFbXB0eShjb250cm9sLnZhbHVlLmNvdW50cnlOYW1lKSkpICYmXG4gICAgICAgICAgIShcbiAgICAgICAgICAgIHN1YmZpZWxkID09PSAnc3RhdGUnICYmXG4gICAgICAgICAgICAhSGVscGVycy5pc0JsYW5rKGNvbnRyb2wudmFsdWUuY291bnRyeU5hbWUpICYmXG4gICAgICAgICAgICBjb250cm9sLmNvbmZpZy5zdGF0ZS5waWNrZXJDb25maWcgJiZcbiAgICAgICAgICAgIGNvbnRyb2wuY29uZmlnLnN0YXRlLnBpY2tlckNvbmZpZy5kZWZhdWx0T3B0aW9ucyAmJlxuICAgICAgICAgICAgY29udHJvbC5jb25maWcuc3RhdGUucGlja2VyQ29uZmlnLmRlZmF1bHRPcHRpb25zLmxlbmd0aCA9PT0gMFxuICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB2YWxpZDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0U3RhcnREYXRlRnJvbVJhbmdlKGRhdGVSYW5nZTogeyBtaW5EYXRlOiBzdHJpbmc7IG1pbk9mZnNldDogbnVtYmVyIH0pOiBEYXRlIHtcbiAgICBpZiAoZGF0ZVJhbmdlLm1pbkRhdGUpIHtcbiAgICAgIHJldHVybiBkYXRlRm5zLnBhcnNlKGRhdGVSYW5nZS5taW5EYXRlKTtcbiAgICB9IGVsc2UgaWYgKGRhdGVSYW5nZS5taW5PZmZzZXQpIHtcbiAgICAgIHJldHVybiBkYXRlRm5zLmFkZERheXMoZGF0ZUZucy5zdGFydE9mVG9kYXkoKSwgZGF0ZVJhbmdlLm1pbk9mZnNldCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRFbmREYXRlRnJvbVJhbmdlKGRhdGVSYW5nZTogeyBtYXhEYXRlOiBzdHJpbmc7IG1pbk9mZnNldDogbnVtYmVyIH0pOiBEYXRlIHtcbiAgICBpZiAoZGF0ZVJhbmdlLm1heERhdGUpIHtcbiAgICAgIHJldHVybiBkYXRlRm5zLnBhcnNlKGRhdGVSYW5nZS5tYXhEYXRlKTtcbiAgICB9IGVsc2UgaWYgKGRhdGVSYW5nZS5taW5PZmZzZXQpIHtcbiAgICAgIHJldHVybiBkYXRlRm5zLmFkZERheXMoZGF0ZUZucy5zdGFydE9mVG9kYXkoKSwgZGF0ZVJhbmdlLm1pbk9mZnNldCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbWluIHN0YXJ0IGRhdGUgYW5kIG1heCBlbmQgZGF0ZSBvZiBhIERhdGUgYmFzZSBvbiBmaWVsZCBkYXRhLlxuICAgKi9cblxuICBwcml2YXRlIGluZmVyRGF0ZVJhbmdlKGNvbnRyb2xDb25maWcsIGZpZWxkKTogdm9pZCB7XG4gICAgaWYgKGZpZWxkLmRhdGFUeXBlID09PSAnRGF0ZScgJiYgZmllbGQuYWxsb3dlZERhdGVSYW5nZSkge1xuICAgICAgY29udHJvbENvbmZpZy5zdGFydERhdGUgPSB0aGlzLmdldFN0YXJ0RGF0ZUZyb21SYW5nZShmaWVsZC5hbGxvd2VkRGF0ZVJhbmdlKTtcbiAgICAgIGNvbnRyb2xDb25maWcuZW5kRGF0ZSA9IHRoaXMuZ2V0RW5kRGF0ZUZyb21SYW5nZShmaWVsZC5hbGxvd2VkRGF0ZVJhbmdlKTtcbiAgICAgIGNvbnRyb2xDb25maWcuZGlzYWJsZWREYXRlTWVzc2FnZSA9IGZpZWxkLmFsbG93ZWREYXRlUmFuZ2U/LmRpc2FibGVkRGF0ZU1lc3NhZ2U7XG4gICAgfVxuICB9XG5cbiAgaW5mbGF0ZUVtYmVkZGVkUHJvcGVydGllcyhkYXRhOiBvYmplY3QpOiBvYmplY3Qge1xuICAgIGlmIChkYXRhKSB7XG4gICAgICBPYmplY3Qua2V5cyhkYXRhKVxuICAgICAgICAuZmlsdGVyKChmaWVsZE5hbWUpID0+IGZpZWxkTmFtZS5pbmNsdWRlcygnLicpKVxuICAgICAgICAuZm9yRWFjaCgoZmllbGQpID0+IHtcbiAgICAgICAgICBjb25zdCBbcGFyZW50RmllbGROYW1lLCBmaWVsZE5hbWVdID0gZmllbGQuc3BsaXQoJy4nKTtcbiAgICAgICAgICBpZiAoIWRhdGFbcGFyZW50RmllbGROYW1lXSkge1xuICAgICAgICAgICAgZGF0YVtwYXJlbnRGaWVsZE5hbWVdID0ge307XG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGFbcGFyZW50RmllbGROYW1lXVtmaWVsZE5hbWVdID0gZGF0YVtmaWVsZF07XG4gICAgICAgICAgZGVsZXRlIGRhdGFbZmllbGRdO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxufVxuIl19
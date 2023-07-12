import * as i0 from '@angular/core';
import { EventEmitter, Injectable, Component, Directive, HostListener, LOCALE_ID, Inject, Input, Output, ChangeDetectionStrategy, ViewContainerRef, Optional, Self, ViewChild, HostBinding, forwardRef, ViewChildren, ContentChildren, NgModule } from '@angular/core';
import 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import * as i1 from 'novo-elements/services';
import { NovoTemplateService } from 'novo-elements/services';
import { Helpers, notify, DateUtil, OutsideClick, findByCountryId, getStates, COUNTRIES } from 'novo-elements/utils';
import * as i4 from '@angular/common/http';
import * as i1$1 from 'novo-elements/elements/modal';
import { NovoModalModule } from 'novo-elements/elements/modal';
import * as i2$1 from 'novo-elements/elements/picker';
import { EntityPickerResults, EntityPickerResult, NovoPickerModule } from 'novo-elements/elements/picker';
import * as i1$2 from 'novo-elements/elements/toast';
import { startOfToday } from 'date-fns';
import * as i4$2 from '@angular/forms';
import { Validators, FormControl, FormGroup, NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { listTimeZones, findTimeZone, getZonedTime } from 'timezone-support';
import { formatZonedTime } from 'timezone-support/dist/parse-format';
import * as i3 from 'novo-elements/elements/button';
import { NovoButtonModule } from 'novo-elements/elements/button';
import * as i5 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i5$1 from 'novo-elements/elements/common';
import { mixinErrorState, NovoTemplate, NovoCommonModule } from 'novo-elements/elements/common';
import * as i3$1 from 'novo-elements/elements/tip-well';
import { NovoTipWellModule } from 'novo-elements/elements/tip-well';
import * as i4$1 from 'novo-elements/elements/tooltip';
import { NovoTooltipModule } from 'novo-elements/elements/tooltip';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i2$2 from 'novo-elements/addons/ckeditor';
import { NovoNovoCKEditorModule } from 'novo-elements/addons/ckeditor';
import * as i3$2 from 'novo-elements/addons/ace-editor';
import { NovoAceEditorModule } from 'novo-elements/addons/ace-editor';
import * as i2 from 'novo-elements/addons/dragula';
import { NovoDragulaModule, NovoDragulaService } from 'novo-elements/addons/dragula';
import { NovoFieldControl } from 'novo-elements/elements/field';
import * as i6 from 'novo-elements/elements/loading';
import { NovoLoadingModule } from 'novo-elements/elements/loading';
import * as i8 from 'novo-elements/pipes';
import { NovoPipesModule } from 'novo-elements/pipes';
import * as i5$2 from 'novo-elements/elements/tiles';
import { NovoTilesModule } from 'novo-elements/elements/tiles';
import * as i7 from 'novo-elements/elements/chips';
import { NovoChipsModule } from 'novo-elements/elements/chips';
import * as i8$1 from 'novo-elements/elements/select';
import { NovoSelectModule } from 'novo-elements/elements/select';
import * as i9 from 'novo-elements/elements/radio';
import { NovoRadioModule } from 'novo-elements/elements/radio';
import * as i10 from 'novo-elements/elements/time-picker';
import { NovoTimePickerModule } from 'novo-elements/elements/time-picker';
import * as i11 from 'novo-elements/elements/date-picker';
import { NovoDatePickerModule } from 'novo-elements/elements/date-picker';
import * as i12 from 'novo-elements/elements/date-time-picker';
import { NovoDateTimePickerModule } from 'novo-elements/elements/date-time-picker';
import * as i14 from 'novo-elements/elements/checkbox';
import { NovoCheckboxModule } from 'novo-elements/elements/checkbox';
import * as i15 from 'novo-elements/elements/switch';
import { NovoSwitchModule } from 'novo-elements/elements/switch';
import * as i16 from 'novo-elements/elements/quick-note';
import { NovoQuickNoteModule } from 'novo-elements/elements/quick-note';
import * as i20 from 'novo-elements/elements/popover';
import { NovoPopOverModule } from 'novo-elements/elements/popover';
import * as i22 from 'angular2-text-mask';
import { TextMaskModule } from 'angular2-text-mask';
import * as i2$3 from 'novo-elements/elements/icon';
import { NovoIconModule } from 'novo-elements/elements/icon';
import { OverlayModule } from '@angular/cdk/overlay';
import { IMaskDirectiveModule } from 'angular-imask';
import { NovoHeaderModule } from 'novo-elements/elements/header';

// NG2
class ControlConfig {
    constructor() {
        this.isEmbedded = false;
        this.isInlineEmbedded = false;
        this.highlighted = false;
    }
}
class BaseControl extends ControlConfig {
    constructor(type = 'BaseControl', config = {}) {
        super();
        this.__type = 'BaseControl';
        this.__type = type;
        this.__config = config;
        this.alwaysActive = config.alwaysActive;
        this.validators = config.validators || [];
        this.asyncValidators = config.asyncValidators || [];
        this.value = config.value;
        this.key = config.key || '';
        this.label = config.label || '';
        this.checkboxLabel = config.checkboxLabel;
        this.name = config.name || '';
        this.required = !!config.required;
        this.hidden = !!config.hidden;
        this.encrypted = !!config.encrypted;
        this.sortOrder = config.sortOrder === undefined ? 1 : config.sortOrder;
        this.controlType = config.controlType || '';
        this.type = config.type;
        this.subType = config.subType;
        this.metaType = config.metaType;
        this.placeholder = config.placeholder || '';
        this.config = config.config || null;
        this.dirty = !!(config.value !== undefined && config.value !== null);
        this.multiple = !!config.multiple;
        this.headerConfig = config.headerConfig || null;
        this.currencyFormat = config.currencyFormat || null;
        this.associatedEntity = config.associatedEntity || null;
        this.optionsType = config.optionsType || null;
        this.options = config.options || [];
        this.forceClear = new EventEmitter();
        this.readOnly = !!config.readOnly || !!config.disabled;
        this.disabled = !!config.disabled;
        this.enabled = true;
        this.layoutOptions = config.layoutOptions || {};
        this.military = !!config.military;
        this.dateFormat = config.dateFormat;
        this.textMaskEnabled = config.textMaskEnabled;
        this.maskOptions = config.maskOptions;
        this.allowInvalidDate = config.allowInvalidDate;
        this.startDate = config.startDate;
        this.endDate = config.endDate;
        this.restrictFieldInteractions = !!config.restrictFieldInteractions;
        this.highlighted = !!config.highlighted;
        if (!Helpers.isEmpty(config.warning)) {
            this.warning = config.warning;
        }
        if (this.required) {
            this.validators.push(Validators.required);
        }
        if (!Helpers.isBlank(config.maxlength)) {
            this.maxlength = config.maxlength;
            this.validators.push(Validators.maxLength(this.maxlength));
        }
        if (!Helpers.isBlank(config.minlength)) {
            this.minlength = config.minlength;
            this.validators.push(Validators.minLength(this.minlength));
        }
        this.closeOnSelect = !!config.closeOnSelect;
        this.interactions = config.interactions;
        this.dataSpecialization = config.dataSpecialization;
        this.dataType = config.dataType;
        this.appendToBody = !!config.appendToBody;
        if (this.appendToBody) {
            notify(`'appendToBody' has been deprecated. Please remove this attribute.`);
        }
        this.parentScrollSelector = config.parentScrollSelector;
        this.description = config.description;
        if (config.tooltip) {
            this.tooltip = config.tooltip;
            this.tooltipPosition = config.tooltipPosition;
            this.tooltipSize = config.tooltipSize;
            this.tooltipPreline = config.tooltipPreline;
            this.removeTooltipArrow = config.removeTooltipArrow;
            this.tooltipAutoPosition = config.tooltipAutoPosition;
        }
        this.popoverAlways = config.popoverAlways;
        this.popoverAnimation = config.popoverAnimation;
        this.popoverContent = config.popoverContent;
        this.popoverDisabled = config.popoverDisabled;
        this.popoverDismissTimeout = config.popoverDismissTimeout;
        this.popoverHtmlContent = config.popoverHtmlContent;
        this.popoverOnHover = config.popoverOnHover;
        this.popoverPlacement = config.popoverPlacement;
        this.popoverTitle = config.popoverTitle;
        this.template = config.template;
        this.customControlConfig = config.customControlConfig;
        this.tipWell = config.tipWell;
        this.width = config.width;
        this.startupFocus = !!config.startupFocus;
        if (config.fileBrowserImageUploadUrl) {
            this.fileBrowserImageUploadUrl = config.fileBrowserImageUploadUrl;
        }
        if (config.isEmpty) {
            this.isEmpty = config.isEmpty;
        }
        this.weekStart = config.weekStart || 0;
        this.disabledDateMessage = config.disabledDateMessage;
    }
}

// APP
class AceEditorControl extends BaseControl {
    constructor(config) {
        super('AceEditorControl', config);
        this.controlType = 'ace-editor';
    }
}

const MAX_INTEGER = 2147483647;
const MIN_YEAR = 1753;
class FormValidators {
    showStateRequiredFlag(subfield, control) {
        return (subfield === 'state' &&
            !Helpers.isEmpty(control.config.state) &&
            control.config.state.required &&
            Helpers.isBlank(control.value.state) &&
            control.config.state.updated &&
            !Helpers.isBlank(control.value.countryName) &&
            control.config.state.pickerConfig &&
            control.config.state.pickerConfig.defaultOptions &&
            control.config.state.pickerConfig.defaultOptions.length > 0);
    }
    // Makes sure the control value does not exceed the max integer value
    static maxInteger(control) {
        return control.value < MAX_INTEGER ? null : { integerTooLarge: true };
    }
    // Makes sure the control value is above the minimum year
    static minYear(control) {
        if (!control.value) {
            return null;
        }
        return control.value >= MIN_YEAR ? null : { minYear: true };
    }
    // Makes sure the control value does not exceed the max number value
    static maxDouble(control) {
        return control.value < Number.MAX_SAFE_INTEGER ? null : { doubleTooLarge: true };
    }
    // Make sure the control value is an email
    static isEmail(control) {
        const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        return !control.value || EMAIL_REGEXP.test(control.value) ? null : { invalidEmail: true };
    }
    // Makes sure the control value is a valid address
    static isValidAddress(control) {
        const fieldList = ['address1', 'address2', 'city', 'state', 'zip', 'countryID'];
        const invalidAddressFields = [];
        const maxlengthFields = [];
        let returnVal = null;
        let maxlengthError = false;
        const showCountryRequiredFlag = (subfield, ctrl) => {
            return (subfield === 'countryID' &&
                !Helpers.isEmpty(ctrl.config.countryID) &&
                ctrl.config.countryID.required &&
                Helpers.isBlank(ctrl.value.countryName) &&
                ctrl.config.countryID.updated);
        };
        const showStateRequiredFlag = (subfield, ctrl) => {
            return (subfield === 'state' &&
                !Helpers.isEmpty(ctrl.config.state) &&
                ctrl.config.state.required &&
                Helpers.isBlank(ctrl.value.state) &&
                ctrl.config.state.updated &&
                !Helpers.isBlank(ctrl.value.countryName) &&
                ctrl.config.state.pickerConfig &&
                ctrl.config.state.pickerConfig.defaultOptions &&
                ctrl.config.state.pickerConfig.defaultOptions.length > 0);
        };
        if (control.value && control.config) {
            let valid = true;
            let formValidity = true;
            fieldList.forEach((subfield) => {
                if (!Helpers.isEmpty(control.config[subfield])) {
                    if ((['countryID', 'state'].indexOf(subfield) === -1 &&
                        control.config[subfield].required &&
                        !Helpers.isBlank(control.value[subfield]) &&
                        Helpers.isEmpty(control.value[subfield])) ||
                        showCountryRequiredFlag(subfield, control) ||
                        showStateRequiredFlag(subfield, control)) {
                        valid = false;
                        invalidAddressFields.push(control.config[subfield].label);
                    }
                    if (((subfield !== 'countryID' && control.config[subfield].required && Helpers.isEmpty(control.value[subfield])) ||
                        (subfield === 'countryID' &&
                            !Helpers.isEmpty(control.config.countryID) &&
                            control.config.countryID.required &&
                            Helpers.isEmpty(control.value.countryName))) &&
                        !(subfield === 'state' &&
                            !Helpers.isBlank(control.value.countryName) &&
                            control.config.state.pickerConfig &&
                            control.config.state.pickerConfig.defaultOptions &&
                            control.config.state.pickerConfig.defaultOptions.length === 0)) {
                        formValidity = false;
                    }
                    if (!Helpers.isEmpty(control.config[subfield].maxlength) &&
                        !Helpers.isEmpty(control.value[subfield]) &&
                        control.value[subfield].length > control.config[subfield].maxlength) {
                        maxlengthError = true;
                        maxlengthFields.push(subfield);
                        formValidity = false;
                    }
                }
            });
            if (!valid || !formValidity || maxlengthError) {
                returnVal = {};
            }
            if (!valid) {
                returnVal.invalidAddress = true;
                returnVal.invalidAddressFields = invalidAddressFields;
            }
            if (!formValidity) {
                returnVal.invalidAddressForForm = true;
            }
            if (maxlengthError) {
                returnVal.maxlength = true;
                returnVal.maxlengthFields = maxlengthFields;
            }
            return returnVal;
        }
        return null;
    }
}

// APP
class AddressControl extends BaseControl {
    constructor(config) {
        super('AddressControl', config);
        this.controlType = 'address';
        this.validators.push(FormValidators.isValidAddress);
    }
}

// APP
class CheckListControl extends BaseControl {
    constructor(config) {
        super('CheckListControl', config);
        this.controlType = 'checklist';
        this.options = config.options || [];
    }
}

// APP
class CheckboxControl extends BaseControl {
    constructor(config) {
        super('CheckboxControl', config);
        this.controlType = 'checkbox';
    }
}

// APP
class CustomControl extends BaseControl {
    constructor(config) {
        super(config.template, config);
        this.controlType = 'custom';
        this.controlType = config.template;
    }
}

// APP
class DateControl extends BaseControl {
    constructor(config) {
        super('DateControl', config);
        this.controlType = 'date';
    }
}

// APP
class DateTimeControl extends BaseControl {
    constructor(config) {
        super('DateTimeControl', config);
        this.controlType = 'date-time';
    }
}

// APP
class EditorControl extends BaseControl {
    constructor(config) {
        super('EditorControl', config);
        this.controlType = 'editor';
        this.minimal = false;
    }
}

// APP
class FileControl extends BaseControl {
    constructor(config) {
        super('FileControl', config);
        this.controlType = 'file';
        // TODO - translate
        this.placeholder = config.placeholder;
        this.multiple = config.multiple;
    }
}

class GroupedControl {
    constructor(config) {
        this.__type = 'GroupedControl';
        Object.keys(config).forEach((key) => (this[key] = config[key]));
    }
}

// APP
class NativeSelectControl extends BaseControl {
    constructor(config) {
        super('NativeSelectControl', config);
        this.controlType = 'native-select';
        this.options = [];
        this.options = config.options || [];
    }
}

// APP
class PickerControl extends BaseControl {
    constructor(config) {
        super('PickerControl', config);
        this.controlType = 'picker';
        this.options = [];
        this.options = config.options || [];
    }
}
class TablePickerControl extends PickerControl {
    constructor(config) {
        super(Object.assign(config, { parentScrollSelector: '.table-container' }));
        this.__type = 'TablePickerControl';
    }
}

// APP
class QuickNoteControl extends BaseControl {
    constructor(config) {
        super('QuickNoteControl', config);
        this.controlType = 'quick-note';
        this.options = [];
        this.options = config.options || [];
    }
}

// APP
class RadioControl extends BaseControl {
    constructor(config) {
        super('RadioControl', config);
        this.controlType = 'radio';
        this.options = [];
        this.options = config.options || [];
    }
}

// APP
class ReadOnlyControl extends BaseControl {
    constructor(config) {
        super('ReadOnlyControl', config);
        this.controlType = 'read-only';
        config.readOnly = true;
    }
}

// APP
class SelectControl extends BaseControl {
    constructor(config) {
        super('SelectControl', config);
        this.controlType = 'select';
        this.options = [];
        this.options = config.options || [];
        this.placeholder = config.placeholder || '';
    }
}

// APP
class SwitchControl extends BaseControl {
    constructor(config) {
        super('SwitchControl', config);
        this.controlType = 'switch';
    }
}

// APP
class TextAreaControl extends BaseControl {
    constructor(config) {
        super('TextAreaControl', config);
        this.controlType = 'text-area';
    }
}

// APP
class TextBoxControl extends BaseControl {
    constructor(config) {
        super('TextBoxControl', config);
        this.controlType = 'textbox';
        this.type = this.getTextboxType(config.type) || '';
        this.subType = config.type || '';
        this.setValidators(this.subType);
    }
    setValidators(type) {
        switch (type) {
            case 'email':
                this.validators.push(FormValidators.isEmail);
                break;
            case 'number':
            case 'currency':
                this.validators.push(FormValidators.maxInteger);
                break;
            case 'float':
            case 'percentage':
                this.validators.push(FormValidators.maxDouble);
                break;
            case 'year':
                this.validators.push(FormValidators.minYear);
                break;
            default:
                break;
        }
    }
    getTextboxType(type) {
        switch (type) {
            case 'percentage':
            case 'currency':
            case 'float':
            case 'year':
                return 'number';
            default:
                return type;
        }
    }
}

// APP
class TilesControl extends BaseControl {
    constructor(config) {
        super('TilesControl', config);
        this.controlType = 'tiles';
        this.options = [];
        this.options = config.options || [];
    }
}

// APP
class TimeControl extends BaseControl {
    constructor(config) {
        super('TimeControl', config);
        this.controlType = 'time';
    }
}

// APP
class TimezoneControl extends BaseControl {
    constructor(config) {
        super('TimezoneControl', config);
        this.controlType = 'timezone';
        this.options = [];
        this.buildTimezones = (compareDate) => {
            const timezones = listTimeZones()
                .map((zone) => {
                const timezone = findTimeZone(zone);
                const zonedTime = getZonedTime(compareDate, timezone);
                const formatted = formatZonedTime(zonedTime, `z - [${zone}] ([GMT] Z)`).replace('_', ' ');
                const option = {
                    value: zone,
                    label: formatted,
                    offset: zonedTime.zone.offset,
                };
                // if (this.props.mapLabels) {
                //   option.label = this.props.mapLabels(option);
                // }
                return option;
            })
                // Formats 'noisy' timezones without a letter acronym.
                .map((option) => {
                const rgx = /(^(\+|-)\d+\s- )/;
                const matches = option.label.match(rgx);
                if (matches) {
                    const prefix = matches[0];
                    option.label = option.label.split(prefix)[1];
                }
                return option;
            })
                // Sorts W -> E, prioritizes america. could be more nuanced based on system tz but simple for now
                .sort((a, b) => {
                const offsetDelta = b.offset - a.offset;
                if (offsetDelta !== 0) {
                    return offsetDelta;
                }
                if (a.label < b.label) {
                    return -1;
                }
                if (a.label > b.label) {
                    return 1;
                }
                return 0;
            });
            return timezones;
        };
        this.options = this.buildTimezones(new Date());
        this.placeholder = config.placeholder || '';
        // current timezone
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        this.value = tz;
    }
}

class ControlFactory {
    static create(type, config) {
        switch (type) {
            case 'AddressControl':
                return new AddressControl(config);
            case 'CheckboxControl':
                return new CheckboxControl(config);
            case 'CheckListControl':
                return new CheckListControl(config);
            case 'CheckListControl':
                return new CheckListControl(config);
            case 'DateTimeControl':
                return new DateTimeControl(config);
            case 'EditorControl':
                return new EditorControl(config);
            case 'FileControl':
                return new FileControl(config);
            case 'NativeSelectControl':
                return new NativeSelectControl(config);
            case 'PickerControl':
                return new PickerControl(config);
            case 'TablePickerControl':
                return new TablePickerControl(config);
            case 'QuickNoteControl':
                return new QuickNoteControl(config);
            case 'RadioControl':
                return new RadioControl(config);
            case 'ReadOnlyControl':
                return new ReadOnlyControl(config);
            case 'TextAreaControl':
                return new TextAreaControl(config);
            case 'TextBoxControl':
                return new TextBoxControl(config);
            case 'SelectControl':
                return new SelectControl(config);
            case 'SwitchControl':
                return new SwitchControl(config);
            case 'TilesControl':
                return new TilesControl(config);
            case 'TimeControl':
                return new TimeControl(config);
            default:
                console.warn('[ControlFactory] - unable to find control for type. Make sure to set "editorType" and "editorConfig" on your column', type);
                return null;
        }
    }
}

// NG2
class NovoFormControl extends FormControl {
    constructor(value, control) {
        super(value, control.validators, control.asyncValidators);
        this.displayValueChanges = new EventEmitter();
        this.valueHistory = [];
        this.validators = control.validators;
        this.initialValue = value;
        this.valueHistory.push(value);
        this.key = control.key;
        this.label = control.label;
        this.readOnly = control.readOnly;
        this.hidden = control.hidden;
        this.encrypted = control.encrypted;
        this.config = control.config;
        this.type = control.type;
        this.subType = control.subType;
        this.required = control.required;
        this.hasRequiredValidator = this.required;
        this.tooltip = control.tooltip;
        this.tooltipPosition = control.tooltipPosition;
        this.tooltipSize = control.tooltipSize;
        this.tooltipPreline = control.tooltipPreline;
        this.removeTooltipArrow = control.removeTooltipArrow;
        this.tooltipAutoPosition = control.tooltipAutoPosition;
        this.label = control.label;
        this.name = control.name;
        this.required = control.required;
        this.sortOrder = control.sortOrder;
        this.controlType = control.controlType;
        this.placeholder = control.placeholder;
        this.minimal = control.minimal;
        this.multiple = control.multiple;
        this.headerConfig = control.headerConfig;
        this.optionsType = control.optionsType;
        this.readOnly = control.readOnly;
        this.layoutOptions = control.layoutOptions;
        this.military = control.military;
        this.dateFormat = control.dateFormat;
        this.currencyFormat = control.currencyFormat;
        this.startDate = control.startDate;
        this.endDate = control.endDate;
        this.weekStart = control.weekStart;
        this.textMaskEnabled = control.textMaskEnabled;
        this.textMaskEnabled = control.textMaskEnabled;
        this.maskOptions = control.maskOptions;
        this.allowInvalidDate = control.allowInvalidDate;
        this.maxlength = control.maxlength;
        this.minlength = control.minlength;
        this.closeOnSelect = control.closeOnSelect;
        this.interactions = control.interactions;
        this.checkboxLabel = control.checkboxLabel;
        this.restrictFieldInteractions = control.restrictFieldInteractions;
        this.appendToBody = control.appendToBody;
        if (this.appendToBody) {
            notify(`'appendToBody' has been deprecated. Please remove this attribute.`);
        }
        this.parentScrollSelector = control.parentScrollSelector;
        this.description = control.description;
        this.options = control.options;
        this.tipWell = control.tipWell;
        this.customControlConfig = control.customControlConfig;
        this.warning = control.warning;
        this.disabledDateMessage = control.disabledDateMessage;
        // Reactive Form, need to enable/disable, can't bind to [disabled]
        if (this.readOnly) {
            this.disable();
        }
        else {
            this.enable();
        }
    }
    /**
     * @param clearValue - flag to reset the control's value
     */
    hide(clearValue = true) {
        this.hidden = true;
        if (clearValue) {
            this.setValue(null);
        }
    }
    show() {
        this.hidden = false;
    }
    setRequired(isRequired) {
        this.required = isRequired;
        // Update validators to have the required
        if (this.required && !this.hasRequiredValidator) {
            const validators = [...this.validators];
            validators.push(Validators.required);
            // TODO: duplicated below
            this.setValidators(validators);
            this.updateValueAndValidity({ emitEvent: false });
            this.hasRequiredValidator = this.required;
        }
        else if (!this.required && this.hasRequiredValidator) {
            let validators = [...this.validators];
            validators = validators.filter((val) => val !== Validators.required);
            // TODO: duplicated above
            this.setValidators(validators);
            this.updateValueAndValidity({ emitEvent: false });
            this.hasRequiredValidator = this.required;
        }
    }
    setValue(value, { onlySelf, emitEvent, emitModelToViewChange, emitViewToModelChange, } = {}) {
        this.markAsDirty();
        this.markAsTouched();
        this.displayValueChanges.emit(value);
        super.setValue(value, { onlySelf, emitEvent, emitModelToViewChange, emitViewToModelChange });
        // History
        clearTimeout(this.historyTimeout);
        this.historyTimeout = setTimeout(() => {
            this.valueHistory.push(value);
        }, 300);
    }
    setReadOnly(isReadOnly) {
        this.readOnly = isReadOnly;
        if (this.readOnly) {
            this.disable();
        }
        else {
            this.enable();
        }
    }
    /**
     * Disables the control. This means the control will be exempt from validation checks and
     * excluded from the aggregate value of any parent. Its status is `DISABLED`.
     *
     * If the control has children, all children will be disabled to maintain the model.
     */
    disable(opts = { emitEvent: false }) {
        if (typeof opts.emitEvent === 'undefined') {
            opts.emitEvent = false;
        }
        super.disable(opts);
    }
    enable(opts = { emitEvent: false }) {
        if (typeof opts.emitEvent === 'undefined') {
            opts.emitEvent = false;
        }
        super.enable(opts);
    }
    markAsInvalid(message) {
        this.markAsDirty();
        this.markAsTouched();
        this.setErrors(Object.assign({}, this.errors, { custom: message }));
    }
    markAsValid() {
        this.setErrors(null);
    }
}

// NG
class NovoFormGroup extends FormGroup {
    constructor() {
        super(...arguments);
        this.fieldInteractionEvents = new EventEmitter();
    }
    enableAllControls() {
        for (const key in this.controls) {
            if (this.controls[key].readOnly) {
                this.controls[key].readOnly = false;
                this.controls[key].enable();
            }
        }
    }
    disableAllControls() {
        for (const key in this.controls) {
            if (!this.controls[key].readOnly) {
                this.controls[key].readOnly = true;
                this.controls[key].disable();
            }
        }
    }
}

// NG
class FormUtils {
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
}
FormUtils.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: FormUtils, deps: [{ token: i1.NovoLabelService }, { token: i1.OptionsService }], target: i0.ɵɵFactoryTarget.Injectable });
FormUtils.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: FormUtils });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: FormUtils, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.NovoLabelService }, { type: i1.OptionsService }]; } });

// NG2
class ControlConfirmModal {
    constructor(modalRef, params, labels) {
        this.modalRef = modalRef;
        this.params = params;
        this.labels = labels;
    }
    close(result) {
        this.modalRef.close(result);
    }
}
ControlConfirmModal.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ControlConfirmModal, deps: [{ token: i1$1.NovoModalRef }, { token: i1$1.NovoModalParams }, { token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component });
ControlConfirmModal.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: ControlConfirmModal, selector: "control-confirm-modal", ngImport: i0, template: `
    <novo-notification type="warning" [attr.data-automation-id]="'field-interaction-modal-' + params['key']">
      <h1>{{ labels.confirmChangesModalMessage }}</h1>
      <h2 *ngIf="!params['message']">
        <label>{{ params['label'] }}:</label> {{ params['oldValue'] }} <i class="bhi-arrow-right"></i> {{ params['newValue'] }}
      </h2>
      <h2 *ngIf="params['message']">{{ params['message'] }}</h2>
      <novo-button theme="standard" (click)="close(false)" [attr.data-automation-id]="'field-interaction-modal-cancel' + params['key']">
        {{ labels.cancel }}
      </novo-button>
      <novo-button
        theme="primary"
        icon="check"
        (click)="close(true)"
        autofocus
        [attr.data-automation-id]="'field-interaction-modal-save-' + params['key']"
      >
        {{ labels.save }}
      </novo-button>
    </novo-notification>
  `, isInline: true, components: [{ type: i1$1.NovoModalNotificationElement, selector: "novo-notification", inputs: ["type", "icon"], outputs: ["cancel"] }, { type: i3.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5$1.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ControlConfirmModal, decorators: [{
            type: Component,
            args: [{
                    selector: 'control-confirm-modal',
                    template: `
    <novo-notification type="warning" [attr.data-automation-id]="'field-interaction-modal-' + params['key']">
      <h1>{{ labels.confirmChangesModalMessage }}</h1>
      <h2 *ngIf="!params['message']">
        <label>{{ params['label'] }}:</label> {{ params['oldValue'] }} <i class="bhi-arrow-right"></i> {{ params['newValue'] }}
      </h2>
      <h2 *ngIf="params['message']">{{ params['message'] }}</h2>
      <novo-button theme="standard" (click)="close(false)" [attr.data-automation-id]="'field-interaction-modal-cancel' + params['key']">
        {{ labels.cancel }}
      </novo-button>
      <novo-button
        theme="primary"
        icon="check"
        (click)="close(true)"
        autofocus
        [attr.data-automation-id]="'field-interaction-modal-save-' + params['key']"
      >
        {{ labels.save }}
      </novo-button>
    </novo-notification>
  `,
                }]
        }], ctorParameters: function () { return [{ type: i1$1.NovoModalRef }, { type: i1$1.NovoModalParams }, { type: i1.NovoLabelService }]; } });
class ControlPromptModal {
    constructor(modalRef, params, labels) {
        this.modalRef = modalRef;
        this.params = params;
        this.labels = labels;
    }
    close(result) {
        this.modalRef.close(result);
    }
}
ControlPromptModal.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ControlPromptModal, deps: [{ token: i1$1.NovoModalRef }, { token: i1$1.NovoModalParams }, { token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component });
ControlPromptModal.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: ControlPromptModal, selector: "control-prompt-modal", ngImport: i0, template: `
    <novo-notification type="warning" [attr.data-automation-id]="'field-interaction-modal-' + params['key']">
      <h1>{{ labels.promptModalMessage }}</h1>
      <p *ngFor="let change of params['changes']">{{ change }}</p>
      <novo-button theme="standard" (click)="close(false)" [attr.data-automation-id]="'field-interaction-modal-cancel' + params['key']">
        {{ labels.cancel }}
      </novo-button>
      <novo-button
        theme="primary"
        icon="check"
        (click)="close(true)"
        autofocus
        [attr.data-automation-id]="'field-interaction-modal-yes-' + params['key']"
      >
        {{ labels.yes }}
      </novo-button>
    </novo-notification>
  `, isInline: true, components: [{ type: i1$1.NovoModalNotificationElement, selector: "novo-notification", inputs: ["type", "icon"], outputs: ["cancel"] }, { type: i3.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }], directives: [{ type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i5$1.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ControlPromptModal, decorators: [{
            type: Component,
            args: [{
                    selector: 'control-prompt-modal',
                    template: `
    <novo-notification type="warning" [attr.data-automation-id]="'field-interaction-modal-' + params['key']">
      <h1>{{ labels.promptModalMessage }}</h1>
      <p *ngFor="let change of params['changes']">{{ change }}</p>
      <novo-button theme="standard" (click)="close(false)" [attr.data-automation-id]="'field-interaction-modal-cancel' + params['key']">
        {{ labels.cancel }}
      </novo-button>
      <novo-button
        theme="primary"
        icon="check"
        (click)="close(true)"
        autofocus
        [attr.data-automation-id]="'field-interaction-modal-yes-' + params['key']"
      >
        {{ labels.yes }}
      </novo-button>
    </novo-notification>
  `,
                }]
        }], ctorParameters: function () { return [{ type: i1$1.NovoModalRef }, { type: i1$1.NovoModalParams }, { type: i1.NovoLabelService }]; } });

// NG2
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
class FieldInteractionApi {
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
}
FieldInteractionApi.FIELD_POSITIONS = {
    ABOVE_FIELD: 'ABOVE_FIELD',
    BELOW_FIELD: 'BELOW_FIELD',
    TOP_OF_FORM: 'TOP_OF_FORM',
    BOTTOM_OF_FORM: 'BOTTOM_OF_FORM',
};
FieldInteractionApi.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: FieldInteractionApi, deps: [{ token: i1$2.NovoToastService }, { token: i1$1.NovoModalService }, { token: FormUtils }, { token: i4.HttpClient }, { token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Injectable });
FieldInteractionApi.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: FieldInteractionApi });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: FieldInteractionApi, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$2.NovoToastService }, { type: i1$1.NovoModalService }, { type: FormUtils }, { type: i4.HttpClient }, { type: i1.NovoLabelService }]; } });

// NG2
class NovoAutoSize {
    constructor(element) {
        this.element = element;
    }
    onInput(textArea) {
        this.adjust();
    }
    ngAfterContentInit() {
        setTimeout(() => {
            this.adjust();
        });
    }
    adjust() {
        const nativeElement = this.element.nativeElement;
        nativeElement.style.height = nativeElement.style.minHeight;
        nativeElement.style.height = `${nativeElement.scrollHeight}px`;
    }
}
NovoAutoSize.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAutoSize, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
NovoAutoSize.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoAutoSize, selector: "textarea[autosize]", host: { listeners: { "input": "onInput($event.target)" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAutoSize, decorators: [{
            type: Directive,
            args: [{
                    selector: 'textarea[autosize]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { onInput: [{
                type: HostListener,
                args: ['input', ['$event.target']]
            }] } });
// undo all template context references!
class NovoControlElement extends OutsideClick {
    constructor(element, labels, dateFormatService, fieldInteractionApi, templateService, changeDetectorRef, locale = 'en-US') {
        super(element);
        this.labels = labels;
        this.dateFormatService = dateFormatService;
        this.fieldInteractionApi = fieldInteractionApi;
        this.templateService = templateService;
        this.changeDetectorRef = changeDetectorRef;
        this.locale = locale;
        this.condensed = false;
        this.autoFocus = false;
        this.change = new EventEmitter();
        this.edit = new EventEmitter();
        this.save = new EventEmitter();
        this.delete = new EventEmitter();
        this.upload = new EventEmitter();
        this.formattedValue = '';
        this.maxLengthMet = false;
        this.itemCount = 0;
        this._blurEmitter = new EventEmitter();
        this._focusEmitter = new EventEmitter();
        this._focused = false;
        this._enteredText = '';
        this._showCount = false;
        this.maxLengthMetErrorfields = [];
        this.templates = {};
        this.loading = false;
    }
    get onBlur() {
        return this._blurEmitter.asObservable();
    }
    get onFocus() {
        return this._focusEmitter.asObservable();
    }
    get maxlengthMetField() {
        if (this.maxLengthMetErrorfields && this.maxLengthMetErrorfields.length) {
            return this.maxLengthMetErrorfields.find((field) => field === this.focusedField) || '';
        }
        else {
            return '';
        }
    }
    get maxlengthErrorField() {
        if (this.errors && this.errors.maxlengthFields && this.errors.maxlengthFields.length) {
            return this.errors.maxlengthFields.find((field) => field === this.focusedField) || '';
        }
        else {
            return '';
        }
    }
    get showFieldMessage() {
        return !this.errors && !this.maxLengthMet && Helpers.isBlank(this.control.description);
    }
    get showMaxLengthMetMessage() {
        return ((this.isDirty && this.maxLengthMet && this.focused && (!this.errors || (this.errors && !this.errors.maxlength))) ||
            (this.isDirty &&
                this.maxlengthMetField &&
                this.focused &&
                (!this.errors || (this.errors && !this.errors.maxlengthFields.includes(this.maxlengthMetField)))));
    }
    get showErrorState() {
        return ((this.isDirty && this.errors) ||
            (this.focused && this.errors && this.errors.maxlength && this.errors.maxlengthFields) ||
            (this.focused && this.errors && this.errors.maxlength && this.errors.maxlengthFields && this.maxlengthErrorField));
    }
    get showCount() {
        const MAX_LENGTH_CONTROL_TYPES = ['textbox', 'picker', 'text-area'];
        const charCount = this.focused &&
            !!this.form.controls[this.control.key].maxlength &&
            MAX_LENGTH_CONTROL_TYPES.includes(this.form.controls[this.control.key].controlType);
        return this._showCount || charCount;
    }
    set showCount(value) {
        this._showCount = value;
    }
    get showMessages() {
        return (this.showCount ||
            !Helpers.isEmpty(this.form.controls[this.control.key].warning) ||
            !Helpers.isEmpty(this.form.controls[this.control.key].description));
    }
    get decimalSeparator() {
        return new Intl.NumberFormat(this.locale).format(1.2)[1];
    }
    ngAfterViewInit() {
        const DO_NOT_FOCUS_ME = ['picker', 'time', 'date', 'date-time'];
        if (this.autoFocus && !DO_NOT_FOCUS_ME.includes(this.control.controlType)) {
            setTimeout(() => {
                const input = this.element.nativeElement.querySelector('input');
                if (input) {
                    input.focus();
                }
            });
        }
    }
    ngAfterContentInit() {
        // Subscribe to control interactions
        if (this.control.interactions && !this.form.controls[this.control.key].restrictFieldInteractions) {
            for (const interaction of this.control.interactions) {
                switch (interaction.event) {
                    case 'blur':
                        this.valueChangeSubscription = this.onBlur.pipe(debounceTime(300)).subscribe(() => {
                            if (!this.form.controls[this.control.key].restrictFieldInteractions) {
                                this.executeInteraction(interaction);
                            }
                        });
                        break;
                    case 'focus':
                        this.valueChangeSubscription = this.onFocus.pipe(debounceTime(300)).subscribe(() => {
                            if (!this.form.controls[this.control.key].restrictFieldInteractions) {
                                this.executeInteraction(interaction);
                            }
                        });
                        break;
                    case 'change':
                        this.valueChangeSubscription = this.form.controls[this.control.key].valueChanges.pipe(debounceTime(300)).subscribe(() => {
                            if (!this.form.controls[this.control.key].restrictFieldInteractions) {
                                this.executeInteraction(interaction);
                            }
                        });
                        break;
                    case 'init':
                        interaction.invokeOnInit = true;
                        break;
                    default:
                        break;
                }
                if (interaction.invokeOnInit) {
                    if (!this.form.controls[this.control.key].restrictFieldInteractions) {
                        this.executeInteraction(interaction, true);
                    }
                }
            }
        }
        setTimeout(() => {
            this.templates = this.templateService.getAll();
            this.loading = false;
            this.changeDetectorRef.markForCheck();
        });
    }
    ngOnInit() {
        this.loading = true;
        // Make sure to initially format the time controls
        if (this.control && this.form.controls[this.control.key].value) {
            if (this.form.controls[this.control.key].controlType === 'textbox' ||
                this.form.controls[this.control.key].controlType === 'text-area') {
                this.itemCount = this.form.controls[this.control.key].value.length;
            }
        }
        if (this.control) {
            // Listen to clear events
            this.forceClearSubscription = this.control.forceClear.subscribe(() => {
                this.clearValue();
            });
            // For Asynchronous validations
            this.statusChangeSubscription = this.form.controls[this.control.key].statusChanges.subscribe((validity) => {
                this.form.controls[this.control.key] = this.templateContext.$implicit;
                if (validity !== 'PENDING' && this.form.updateValueAndValidity) {
                    this.form.updateValueAndValidity();
                }
            });
        }
        this.templateContext = {
            $implicit: this.form.controls[this.control.key],
            methods: {
                restrictKeys: this.restrictKeys.bind(this),
                emitChange: this.emitChange.bind(this),
                handleFocus: this.handleFocus.bind(this),
                handlePercentChange: this.handlePercentChange.bind(this),
                handleBlur: this.handleBlur.bind(this),
                handleTextAreaInput: this.handleTextAreaInput.bind(this),
                handleEdit: this.handleEdit.bind(this),
                handleSave: this.handleSave.bind(this),
                handleDelete: this.handleDelete.bind(this),
                handleUpload: this.handleUpload.bind(this),
                modelChange: this.modelChange.bind(this),
                modelChangeWithRaw: this.modelChangeWithRaw.bind(this),
                handleAddressChange: this.handleAddressChange.bind(this),
                handleTyping: this.handleTyping.bind(this),
                updateValidity: this.updateValidity.bind(this),
                toggleActive: this.toggleActive.bind(this),
                validateIntegerInput: this.validateIntegerInput.bind(this),
                validateNumberOnBlur: this.validateNumberOnBlur.bind(this),
            },
            form: this.form,
        };
        this.templateContext.$implicit.tooltipPosition = this.tooltipPosition;
        this.templateContext.$implicit.tooltip = this.tooltip;
        this.templateContext.$implicit.tooltipSize = this.tooltipSize;
        this.templateContext.$implicit.tooltipPreline = this.tooltipPreline;
        this.templateContext.$implicit.removeTooltipArrow = this.removeTooltipArrow;
        this.templateContext.$implicit.startupFocus = this.form.controls[this.control.key].startupFocus;
        this.templateContext.$implicit.fileBrowserImageUploadUrl = this.form.controls[this.control.key].fileBrowserImageUploadUrl;
        this.templateContext.$implicit.minimal = this.form.controls[this.control.key].minimal;
        this.templateContext.$implicit.currencyFormat = this.form.controls[this.control.key].currencyFormat;
        this.templateContext.$implicit.percentValue = this.form.controls[this.control.key].percentValue;
        this.templateContext.$implicit.config = this.form.controls[this.control.key].config;
        if (this.form.controls[this.control.key] && this.form.controls[this.control.key].subType === 'percentage') {
            if (!Helpers.isEmpty(this.form.controls[this.control.key].value)) {
                this.templateContext.$implicit.percentValue = Number((this.form.controls[this.control.key].value * 100).toFixed(6).replace(/\.?0*$/, ''));
            }
            this.percentChangeSubscription = this.form.controls[this.control.key].displayValueChanges.subscribe((value) => {
                if (!Helpers.isEmpty(value) && !isNaN(value)) {
                    this.templateContext.$implicit.percentValue = Number((value * 100).toFixed(6).replace(/\.?0*$/, ''));
                }
                else if (Helpers.isEmpty(value)) {
                    this.templateContext.$implicit.percentValue = undefined;
                }
            });
        }
    }
    ngOnDestroy() {
        // Unsubscribe from control interactions
        if (this.valueChangeSubscription) {
            this.valueChangeSubscription.unsubscribe();
        }
        // if (this.dateChangeSubscription) {
        //     this.dateChangeSubscription.unsubscribe();
        // }
        if (this.forceClearSubscription) {
            // Un-listen for clear events
            this.forceClearSubscription.unsubscribe();
        }
        if (this.percentChangeSubscription) {
            // Un-listen for clear events
            this.percentChangeSubscription.unsubscribe();
        }
        if (this.dateChangeSubscription) {
            this.dateChangeSubscription.unsubscribe();
        }
        if (this.statusChangeSubscription) {
            this.statusChangeSubscription.unsubscribe();
        }
        super.ngOnDestroy();
    }
    get errors() {
        return this.form.controls[this.control.key].errors;
    }
    get isValid() {
        return this.form.controls[this.control.key].valid;
    }
    get isDirty() {
        return this.form.controls[this.control.key].dirty || this.control.dirty;
    }
    get hasValue() {
        return !Helpers.isEmpty(this.form.getRawValue()[this.control.key]);
    }
    get focused() {
        return this._focused;
    }
    get tooltip() {
        return this.form.controls[this.control.key].tooltip;
    }
    get tooltipPosition() {
        if (Helpers.isBlank(this.form.controls[this.control.key].tooltipPosition)) {
            return 'right';
        }
        return this.form.controls[this.control.key].tooltipPosition;
    }
    get tooltipSize() {
        if (Helpers.isBlank(this.form.controls[this.control.key].tooltipSize)) {
            return '';
        }
        return this.form.controls[this.control.key].tooltipSize;
    }
    get tooltipPreline() {
        if (Helpers.isBlank(this.form.controls[this.control.key].tooltipPreline)) {
            return false;
        }
        return this.form.controls[this.control.key].tooltipPreline;
    }
    get removeTooltipArrow() {
        if (Helpers.isBlank(this.form.controls[this.control.key].removeTooltipArrow)) {
            return false;
        }
        return this.form.controls[this.control.key].removeTooltipArrow;
    }
    get alwaysActive() {
        // Controls that have the label active if there is any user entered text in the field
        if (this.form.controls[this.control.key].controlType === 'picker' && this._enteredText.length) {
            return true;
        }
        if (this.form.controls[this.control.key].alwaysActive) {
            return true;
        }
        // Controls that always have the label active
        return ([
            'tiles',
            'checklist',
            'checkbox',
            'date',
            'time',
            'date-time',
            'address',
            'file',
            'editor',
            'ace-editor',
            'radio',
            'text-area',
            'quick-note',
            'date',
            'custom',
            'switch',
            'native-select',
            'native-input',
        ].indexOf(this.form.controls[this.control.key].controlType) !== -1);
    }
    get requiresExtraSpacing() {
        // Chips
        if (this.form.controls[this.control.key].controlType === 'picker' && this.form.controls[this.control.key].multiple && this.hasValue) {
            return true;
        }
        return false;
    }
    executeInteraction(interaction, isInvokedOnInit = false) {
        if (interaction.script && Helpers.isFunction(interaction.script)) {
            setTimeout(() => {
                this.fieldInteractionApi.form = this.form;
                this.fieldInteractionApi.currentKey = this.control.key;
                this.fieldInteractionApi.isInvokedOnInit = isInvokedOnInit;
                try {
                    interaction.script(this.fieldInteractionApi, this.control.key);
                }
                catch (err) {
                    console.info('Field Interaction Error!', this.control.key); // tslint:disable-line
                    console.error(err); // tslint:disable-line
                }
            });
        }
    }
    handleTyping(event) {
        this._focused = event && event.length;
        this._enteredText = event;
    }
    handleFocus(event, field) {
        this._focused = true;
        this.focusedField = field;
        if (!Helpers.isBlank(this.characterCountField) && this.characterCountField === field) {
            this.showCount = true;
        }
        else if (this.form.controls[this.control.key].controlType === 'address' &&
            field &&
            !Helpers.isEmpty(this.form.getRawValue()[this.control.key]) &&
            !Helpers.isBlank(this.form.getRawValue()[this.control.key][field])) {
            this.handleAddressChange({ value: this.form.getRawValue()[this.control.key][field], field });
        }
        this._focusEmitter.emit(event);
    }
    handleBlur(event) {
        this._focused = false;
        this.focusedField = '';
        this.showCount = false;
        this._blurEmitter.emit(event);
    }
    clearValue() {
        this.form.controls[this.control.key].setValue(null);
        this.formattedValue = null;
    }
    handleTextAreaInput(event) {
        this.emitChange(event);
        this.restrictKeys(event);
    }
    checkMaxLength(event) {
        if (this.control && this.form.controls[this.control.key].maxlength) {
            this.itemCount = event.target.value.length;
            this.maxLengthMet = event.target.value.length >= this.form.controls[this.control.key].maxlength;
        }
    }
    modelChangeWithRaw(event) {
        if (Helpers.isEmpty(event.value)) {
            this._focused = false;
            this._enteredText = '';
        }
        if (this.form.controls[this.control.key].controlType === 'picker' && this.form.controls[this.control.key].maxlength) {
            this.itemCount = event.value ? event.value.length : 0;
            this.maxLengthMet = this.itemCount >= this.form.controls[this.control.key].maxlength ? true : false;
        }
        this.form.controls[this.control.key].rawValue = event.rawValue;
        this.change.emit(event.value);
    }
    modelChange(value) {
        if (Helpers.isEmpty(value)) {
            this._focused = false;
            this._enteredText = '';
        }
        this.change.emit(value);
    }
    validateNumberOnBlur(event) {
        this._focused = false;
        this.focusedField = '';
        this.showCount = false;
        if (this.form.controls[this.control.key].subType === 'number') {
            this.validateIntegerInput();
        }
        this._blurEmitter.emit(event);
    }
    validateIntegerInput() {
        const NUMBERS_ONLY = /^[\d\-]\d*$/;
        if (this.form.controls[this.control.key].value && !NUMBERS_ONLY.test(this.form.controls[this.control.key].value)) {
            this.form.controls[this.control.key].markAsInvalid(`${this.labels.invalidIntegerInput} ${this.form.controls[this.control.key].label.toUpperCase()}`);
        }
    }
    restrictKeys(event) {
        const NUMBERS_ONLY = /[0-9\-]/;
        const NUMBERS_WITH_DECIMAL_DOT = /[0-9\.\-]/;
        const NUMBERS_WITH_DECIMAL_DOT_AND_COMMA = /[0-9\.\,\-]/;
        const UTILITY_KEYS = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
        const key = event.key;
        // Numbers or numbers and decimal characters only
        if (this.form.controls[this.control.key].subType === 'number' && !(NUMBERS_ONLY.test(key) || UTILITY_KEYS.includes(key))) {
            event.preventDefault();
        }
        else if (['currency', 'float', 'percentage'].includes(this.form.controls[this.control.key].subType) &&
            !((this.decimalSeparator === '.' && NUMBERS_WITH_DECIMAL_DOT.test(key)) ||
                (this.decimalSeparator === ',' && NUMBERS_WITH_DECIMAL_DOT_AND_COMMA.test(key)) ||
                UTILITY_KEYS.includes(key))) {
            event.preventDefault();
        }
        // Max Length
        if (this.form.controls[this.control.key].maxlength && event.target.value.length >= this.form.controls[this.control.key].maxlength) {
            event.preventDefault();
        }
    }
    handlePercentChange(event) {
        const value = event.target.value || event.data;
        const percent = Helpers.isEmpty(value) || isNaN(value) ? value : Number((Number(value) / 100).toFixed(6).replace(/\.?0*$/, ''));
        if (!Helpers.isEmpty(percent)) {
            this.change.emit(percent);
            this.form.controls[this.control.key].setValue(percent);
        }
        else {
            this.change.emit(null);
            this.form.controls[this.control.key].setValue(null);
        }
    }
    handleTabForPickers(event) {
        if (this.active && event && event.key) {
            if (event.key === "Escape" /* Escape */ || event.key === "Tab" /* Tab */) {
                this.toggleActive(event, false);
            }
        }
    }
    emitChange(value) {
        this.change.emit(value);
        this.checkMaxLength(value);
    }
    handleEdit(value) {
        this.edit.emit(value);
    }
    handleSave(value) {
        this.save.emit(value);
    }
    handleDelete(value) {
        this.delete.emit(value);
    }
    handleUpload(value) {
        this.upload.emit(value);
    }
    handleAddressChange(data) {
        if (data &&
            !Helpers.isBlank(data.value) &&
            data.field &&
            this.control.config[data.field] &&
            !Helpers.isEmpty(this.control.config[data.field].maxlength)) {
            this.itemCount = data.value.length;
            this.characterCountField = data.field;
            this.maxLength = this.control.config[data.field].maxlength;
            this.showCount = true;
            if (this.maxLength === this.itemCount) {
                this.maxLengthMetErrorfields.push(data.field);
            }
            else {
                this.maxLengthMetErrorfields = this.maxLengthMetErrorfields.filter((field) => field !== data.field);
            }
        }
    }
    updateValidity(shouldEventBeEmitted) {
        const emitEvent = shouldEventBeEmitted ? true : false;
        this.form.controls[this.control.key].updateValueAndValidity({ emitEvent });
    }
}
NovoControlElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoControlElement, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i1.DateFormatService }, { token: FieldInteractionApi }, { token: i1.NovoTemplateService }, { token: i0.ChangeDetectorRef }, { token: LOCALE_ID }], target: i0.ɵɵFactoryTarget.Component });
NovoControlElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoControlElement, selector: "novo-control", inputs: { control: "control", form: "form", condensed: "condensed", autoFocus: "autoFocus" }, outputs: { change: "change", edit: "edit", save: "save", delete: "delete", upload: "upload", onBlur: "blur", onFocus: "focus" }, host: { properties: { "class": "form.controls[control.key].controlType", "attr.data-control-type": "form.controls[control.key].controlType", "class.disabled": "form.controls[control.key].readOnly", "class.hidden": "form.controls[control.key].hidden", "attr.data-control-key": "control.key", "class.inline-embedded": "control.isInlineEmbedded", "class.embedded": "control.isEmbedded" } }, usesInheritance: true, ngImport: i0, template: `
    <div
      class="novo-control-container"
      [hidden]="
        form.controls[control.key].hidden ||
        form.controls[control.key].type === 'hidden' ||
        form.controls[control.key].controlType === 'hidden'
      "
    >
      <!--Encrypted Field-->
      <span [tooltip]="labels.encryptedFieldTooltip" [tooltipPosition]="'right'"
        ><i [hidden]="!form.controls[control.key].encrypted" class="bhi-lock"></i
      ></span>
      <!--Label (for horizontal)-->
      <label
        [attr.for]="control.key"
        *ngIf="form.layout !== 'vertical' && form.controls[control.key].label && !condensed"
        [ngClass]="{ encrypted: form.controls[control.key].encrypted }"
      >
        {{ form.controls[control.key].label }}
      </label>
      <div class="novo-control-outer-container">
        <!--Label (for vertical)-->
        <label
          *ngIf="form.layout === 'vertical' && form.controls[control.key].label && !condensed"
          class="novo-control-label"
          [attr.for]="control.key"
          [class.novo-control-empty]="!hasValue"
          [class.novo-control-focused]="focused"
          [class.novo-control-filled]="hasValue"
          [class.novo-control-always-active]="alwaysActive || form.controls[control.key].placeholder"
          [class.novo-control-extra-spacing]="requiresExtraSpacing"
        >
          {{ form.controls[control.key].label }}
        </label>
        <div
          class="novo-control-inner-container"
          [class.required]="form.controls[control.key].required && !form.controls[control.key].readOnly"
        >
          <div class="novo-control-inner-input-container" [class.novo-control-filled]="hasValue" [class.novo-control-empty]="!hasValue">
            <!--Required Indicator-->
            <i
              [hidden]="!form.controls[control.key].required || form.controls[control.key].readOnly"
              class="required-indicator {{ form.controls[control.key].controlType }}"
              [ngClass]="{ 'bhi-circle': !isValid, 'bhi-check': isValid }"
              *ngIf="!condensed || form.controls[control.key].required"
            >
            </i>
            <!--Form Controls-->
            <div
              class="novo-control-input {{ form.controls[control.key].controlType }}"
              [attr.data-automation-id]="control.key"
              [class.control-disabled]="form.controls[control.key].disabled"
              [class.highlighted]="form.controls[control.key].highlighted"
            >
              <!--TODO prefix/suffix on the control-->
              <ng-container *ngIf="templates">
                <ng-container
                  *ngTemplateOutlet="templates[form.controls[control.key].controlType]; context: templateContext"
                ></ng-container>
              </ng-container>
              <ng-container *ngIf="!templates || loading">
                <div class="novo-control-input-container novo-control-input-with-label">
                  <input type="text" />
                </div>
              </ng-container>
            </div>
          </div>
          <!--Error Message-->
          <div
            class="field-message {{ form.controls[control.key].controlType }}"
            *ngIf="!condensed"
            [class.has-tip]="form.controls[control.key].tipWell"
            [ngClass]="showErrorState || showMaxLengthMetMessage ? 'error-shown' : 'error-hidden'"
          >
            <div class="messages" [ngClass]="showMessages ? 'count-shown messages-shown' : 'count-hidden messages-hidden'">
              <span class="error-text" *ngIf="showFieldMessage"></span>
              <span class="error-text" *ngIf="isDirty && errors?.required && form.controls[control.key].controlType !== 'address'"
                >{{ form.controls[control.key].label | uppercase }} {{ labels.isRequired }}</span
              >
              <span class="error-text" *ngIf="isDirty && errors?.minlength"
                >{{ form.controls[control.key].label | uppercase }} {{ labels.minLength }} {{ form.controls[control.key].minlength }}</span
              >
              <span
                class="error-text"
                *ngIf="isDirty && maxLengthMet && focused && !errors?.maxlength && form.controls[control.key].controlType !== 'picker'"
                >{{ labels.maxlengthMet(form.controls[control.key].maxlength) }}</span
              >
              <span class="error-text" *ngIf="errors?.maxlength && focused && !errors?.maxlengthFields">{{
                labels.invalidMaxlength(form.controls[control.key].maxlength)
              }}</span>
              <span class="error-text" *ngIf="maxLengthMet && form.controls[control.key].controlType === 'picker'">{{
                labels.maxRecordsReached
              }}</span>
              <span class="error-text" *ngIf="isDirty && errors?.invalidEmail"
                >{{ form.controls[control.key].label | uppercase }} {{ labels.invalidEmail }}</span
              >
              <span class="error-text" *ngIf="isDirty && (errors?.integerTooLarge || errors?.doubleTooLarge)"
                >{{ form.controls[control.key].label | uppercase }} {{ labels.isTooLarge }}</span
              >
              <span *ngIf="isDirty && errors?.minYear">{{ form.controls[control.key].label | uppercase }} {{ labels.notValidYear }}</span>
              <span class="error-text" *ngIf="isDirty && errors?.custom">{{ errors.custom }}</span>
              <span class="error-text" *ngIf="errors?.maxlength && errors?.maxlengthFields && maxlengthErrorField && focused">
                {{
                  labels.invalidMaxlengthWithField(
                    control.config[maxlengthErrorField]?.label,
                    control.config[maxlengthErrorField]?.maxlength
                  )
                }}
              </span>
              <span
                class="error-text"
                *ngIf="isDirty && maxlengthMetField && focused && !errors?.maxlengthFields?.includes(maxlengthMetField)"
              >
                {{ labels.maxlengthMetWithField(control.config[maxlengthMetField]?.label, control.config[maxlengthMetField]?.maxlength) }}
              </span>
              <span *ngIf="isDirty && errors?.invalidAddress">
                <span class="error-text" *ngFor="let invalidAddressField of errors?.invalidAddressFields"
                  >{{ invalidAddressField | uppercase }} {{ labels.isRequired }}
                </span>
              </span>
              <!--Field Hint-->
              <div class="description" *ngIf="form.controls[control.key].description" [innerHTML]="form.controls[control.key].description">
              </div>
              <span class="warning-text" *ngIf="form.controls[control.key].warning">{{ form.controls[control.key].warning }}</span>
            </div>
            <span
              class="character-count"
              [class.error]="
                (errors?.maxlength && !errors?.maxlengthFields) ||
                (errors?.maxlength && errors?.maxlengthFields && errors.maxlengthFields.includes(focusedField))
              "
              *ngIf="showCount && form.controls[control.key].controlType !== 'picker'"
              >{{ itemCount }}/{{ maxLength || form.controls[control.key].maxlength }}</span
            >
            <span
              class="record-count"
              [class.zero-count]="itemCount === 0"
              [class.row-picker]="form.controls[this.control.key].config.columns"
              *ngIf="showCount && form.controls[control.key].controlType === 'picker'"
              >{{ itemCount }}/{{ maxLength || form.controls[control.key].maxlength }}</span
            >
          </div>
          <!--Tip Wel-->
          <novo-tip-well
            *ngIf="form.controls[control.key].tipWell"
            [name]="control.key"
            [tip]="form.controls[control.key]?.tipWell?.tip"
            [icon]="form.controls[control.key]?.tipWell?.icon"
            [button]="form.controls[control.key]?.tipWell?.button"
            [sanitize]="form.controls[control.key]?.tipWell?.sanitize"
          ></novo-tip-well>
        </div>
        <i *ngIf="form.controls[control.key].fieldInteractionloading" class="loading">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
            x="0px"
            y="0px"
            width="18.2px"
            height="18.5px"
            viewBox="0 0 18.2 18.5"
            style="enable-background:new 0 0 18.2 18.5;"
            xml:space="preserve"
          >
            <style type="text/css">
              .spinner {
                fill: #ffffff;
              }
            </style>
            <path
              class="spinner"
              d="M9.2,18.5C4.1,18.5,0,14.4,0,9.2S4.1,0,9.2,0c0.9,0,1.9,0.1,2.7,0.4c0.8,0.2,1.2,1.1,1,1.9
                            c-0.2,0.8-1.1,1.2-1.9,1C10.5,3.1,9.9,3,9.2,3C5.8,3,3,5.8,3,9.2s2.8,6.2,6.2,6.2c2.8,0,5.3-1.9,6-4.7c0.2-0.8,1-1.3,1.8-1.1
                            c0.8,0.2,1.3,1,1.1,1.8C17.1,15.7,13.4,18.5,9.2,18.5z"
            />
          </svg>
        </i>
      </div>
    </div>
  `, isInline: true, components: [{ type: i3$1.NovoTipWellElement, selector: "novo-tip-well", inputs: ["name", "tip", "buttonText", "button", "icon", "sanitize"], outputs: ["confirmed"] }], directives: [{ type: i4$1.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipActive", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML"] }, { type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i5.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "uppercase": i5.UpperCasePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoControlElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-control',
                    template: `
    <div
      class="novo-control-container"
      [hidden]="
        form.controls[control.key].hidden ||
        form.controls[control.key].type === 'hidden' ||
        form.controls[control.key].controlType === 'hidden'
      "
    >
      <!--Encrypted Field-->
      <span [tooltip]="labels.encryptedFieldTooltip" [tooltipPosition]="'right'"
        ><i [hidden]="!form.controls[control.key].encrypted" class="bhi-lock"></i
      ></span>
      <!--Label (for horizontal)-->
      <label
        [attr.for]="control.key"
        *ngIf="form.layout !== 'vertical' && form.controls[control.key].label && !condensed"
        [ngClass]="{ encrypted: form.controls[control.key].encrypted }"
      >
        {{ form.controls[control.key].label }}
      </label>
      <div class="novo-control-outer-container">
        <!--Label (for vertical)-->
        <label
          *ngIf="form.layout === 'vertical' && form.controls[control.key].label && !condensed"
          class="novo-control-label"
          [attr.for]="control.key"
          [class.novo-control-empty]="!hasValue"
          [class.novo-control-focused]="focused"
          [class.novo-control-filled]="hasValue"
          [class.novo-control-always-active]="alwaysActive || form.controls[control.key].placeholder"
          [class.novo-control-extra-spacing]="requiresExtraSpacing"
        >
          {{ form.controls[control.key].label }}
        </label>
        <div
          class="novo-control-inner-container"
          [class.required]="form.controls[control.key].required && !form.controls[control.key].readOnly"
        >
          <div class="novo-control-inner-input-container" [class.novo-control-filled]="hasValue" [class.novo-control-empty]="!hasValue">
            <!--Required Indicator-->
            <i
              [hidden]="!form.controls[control.key].required || form.controls[control.key].readOnly"
              class="required-indicator {{ form.controls[control.key].controlType }}"
              [ngClass]="{ 'bhi-circle': !isValid, 'bhi-check': isValid }"
              *ngIf="!condensed || form.controls[control.key].required"
            >
            </i>
            <!--Form Controls-->
            <div
              class="novo-control-input {{ form.controls[control.key].controlType }}"
              [attr.data-automation-id]="control.key"
              [class.control-disabled]="form.controls[control.key].disabled"
              [class.highlighted]="form.controls[control.key].highlighted"
            >
              <!--TODO prefix/suffix on the control-->
              <ng-container *ngIf="templates">
                <ng-container
                  *ngTemplateOutlet="templates[form.controls[control.key].controlType]; context: templateContext"
                ></ng-container>
              </ng-container>
              <ng-container *ngIf="!templates || loading">
                <div class="novo-control-input-container novo-control-input-with-label">
                  <input type="text" />
                </div>
              </ng-container>
            </div>
          </div>
          <!--Error Message-->
          <div
            class="field-message {{ form.controls[control.key].controlType }}"
            *ngIf="!condensed"
            [class.has-tip]="form.controls[control.key].tipWell"
            [ngClass]="showErrorState || showMaxLengthMetMessage ? 'error-shown' : 'error-hidden'"
          >
            <div class="messages" [ngClass]="showMessages ? 'count-shown messages-shown' : 'count-hidden messages-hidden'">
              <span class="error-text" *ngIf="showFieldMessage"></span>
              <span class="error-text" *ngIf="isDirty && errors?.required && form.controls[control.key].controlType !== 'address'"
                >{{ form.controls[control.key].label | uppercase }} {{ labels.isRequired }}</span
              >
              <span class="error-text" *ngIf="isDirty && errors?.minlength"
                >{{ form.controls[control.key].label | uppercase }} {{ labels.minLength }} {{ form.controls[control.key].minlength }}</span
              >
              <span
                class="error-text"
                *ngIf="isDirty && maxLengthMet && focused && !errors?.maxlength && form.controls[control.key].controlType !== 'picker'"
                >{{ labels.maxlengthMet(form.controls[control.key].maxlength) }}</span
              >
              <span class="error-text" *ngIf="errors?.maxlength && focused && !errors?.maxlengthFields">{{
                labels.invalidMaxlength(form.controls[control.key].maxlength)
              }}</span>
              <span class="error-text" *ngIf="maxLengthMet && form.controls[control.key].controlType === 'picker'">{{
                labels.maxRecordsReached
              }}</span>
              <span class="error-text" *ngIf="isDirty && errors?.invalidEmail"
                >{{ form.controls[control.key].label | uppercase }} {{ labels.invalidEmail }}</span
              >
              <span class="error-text" *ngIf="isDirty && (errors?.integerTooLarge || errors?.doubleTooLarge)"
                >{{ form.controls[control.key].label | uppercase }} {{ labels.isTooLarge }}</span
              >
              <span *ngIf="isDirty && errors?.minYear">{{ form.controls[control.key].label | uppercase }} {{ labels.notValidYear }}</span>
              <span class="error-text" *ngIf="isDirty && errors?.custom">{{ errors.custom }}</span>
              <span class="error-text" *ngIf="errors?.maxlength && errors?.maxlengthFields && maxlengthErrorField && focused">
                {{
                  labels.invalidMaxlengthWithField(
                    control.config[maxlengthErrorField]?.label,
                    control.config[maxlengthErrorField]?.maxlength
                  )
                }}
              </span>
              <span
                class="error-text"
                *ngIf="isDirty && maxlengthMetField && focused && !errors?.maxlengthFields?.includes(maxlengthMetField)"
              >
                {{ labels.maxlengthMetWithField(control.config[maxlengthMetField]?.label, control.config[maxlengthMetField]?.maxlength) }}
              </span>
              <span *ngIf="isDirty && errors?.invalidAddress">
                <span class="error-text" *ngFor="let invalidAddressField of errors?.invalidAddressFields"
                  >{{ invalidAddressField | uppercase }} {{ labels.isRequired }}
                </span>
              </span>
              <!--Field Hint-->
              <div class="description" *ngIf="form.controls[control.key].description" [innerHTML]="form.controls[control.key].description">
              </div>
              <span class="warning-text" *ngIf="form.controls[control.key].warning">{{ form.controls[control.key].warning }}</span>
            </div>
            <span
              class="character-count"
              [class.error]="
                (errors?.maxlength && !errors?.maxlengthFields) ||
                (errors?.maxlength && errors?.maxlengthFields && errors.maxlengthFields.includes(focusedField))
              "
              *ngIf="showCount && form.controls[control.key].controlType !== 'picker'"
              >{{ itemCount }}/{{ maxLength || form.controls[control.key].maxlength }}</span
            >
            <span
              class="record-count"
              [class.zero-count]="itemCount === 0"
              [class.row-picker]="form.controls[this.control.key].config.columns"
              *ngIf="showCount && form.controls[control.key].controlType === 'picker'"
              >{{ itemCount }}/{{ maxLength || form.controls[control.key].maxlength }}</span
            >
          </div>
          <!--Tip Wel-->
          <novo-tip-well
            *ngIf="form.controls[control.key].tipWell"
            [name]="control.key"
            [tip]="form.controls[control.key]?.tipWell?.tip"
            [icon]="form.controls[control.key]?.tipWell?.icon"
            [button]="form.controls[control.key]?.tipWell?.button"
            [sanitize]="form.controls[control.key]?.tipWell?.sanitize"
          ></novo-tip-well>
        </div>
        <i *ngIf="form.controls[control.key].fieldInteractionloading" class="loading">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
            x="0px"
            y="0px"
            width="18.2px"
            height="18.5px"
            viewBox="0 0 18.2 18.5"
            style="enable-background:new 0 0 18.2 18.5;"
            xml:space="preserve"
          >
            <style type="text/css">
              .spinner {
                fill: #ffffff;
              }
            </style>
            <path
              class="spinner"
              d="M9.2,18.5C4.1,18.5,0,14.4,0,9.2S4.1,0,9.2,0c0.9,0,1.9,0.1,2.7,0.4c0.8,0.2,1.2,1.1,1,1.9
                            c-0.2,0.8-1.1,1.2-1.9,1C10.5,3.1,9.9,3,9.2,3C5.8,3,3,5.8,3,9.2s2.8,6.2,6.2,6.2c2.8,0,5.3-1.9,6-4.7c0.2-0.8,1-1.3,1.8-1.1
                            c0.8,0.2,1.3,1,1.1,1.8C17.1,15.7,13.4,18.5,9.2,18.5z"
            />
          </svg>
        </i>
      </div>
    </div>
  `,
                    host: {
                        '[class]': 'form.controls[control.key].controlType',
                        '[attr.data-control-type]': 'form.controls[control.key].controlType',
                        '[class.disabled]': 'form.controls[control.key].readOnly',
                        '[class.hidden]': 'form.controls[control.key].hidden',
                        '[attr.data-control-key]': 'control.key',
                        '[class.inline-embedded]': 'control.isInlineEmbedded',
                        '[class.embedded]': 'control.isEmbedded',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i1.DateFormatService }, { type: FieldInteractionApi }, { type: i1.NovoTemplateService }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [LOCALE_ID]
                }] }]; }, propDecorators: { control: [{
                type: Input
            }], form: [{
                type: Input
            }], condensed: [{
                type: Input
            }], autoFocus: [{
                type: Input
            }], change: [{
                type: Output
            }], edit: [{
                type: Output
            }], save: [{
                type: Output
            }], delete: [{
                type: Output
            }], upload: [{
                type: Output
            }], onBlur: [{
                type: Output,
                args: ['blur']
            }], onFocus: [{
                type: Output,
                args: ['focus']
            }] } });

// NG
var EditState;
(function (EditState) {
    EditState["EDITING"] = "editing";
    EditState["NOT_EDITING"] = "notediting";
})(EditState || (EditState = {}));
class NovoControlGroup {
    constructor(formUtils, fb, ref) {
        this.formUtils = formUtils;
        this.fb = fb;
        this.ref = ref;
        this._appearance = 'none';
        this._vertical = false;
        this._stacked = false;
        this._remove = false;
        this._edit = false;
        this._collapsible = false;
        // Edit icon at the end of each row (no bhi- prefix)
        this.editIcon = 'edit';
        // Remove icon at the end of each row (no bhi- prefix)
        this.removeIcon = 'delete-o';
        this.onRemove = new EventEmitter();
        this.onEdit = new EventEmitter();
        this.onAdd = new EventEmitter();
        this.change = new EventEmitter();
        this.controlLabels = [];
        this.toggled = false;
        this.disabledArray = [];
        this.editState = EditState.NOT_EDITING;
        this.currentIndex = 0;
    }
    set appearance(value) {
        this._appearance = value;
    }
    get appearance() {
        return this._appearance;
    }
    // Sets the display of the group to either be row (default) or vertical via flex-box
    set vertical(v) {
        this._vertical = coerceBooleanProperty(v);
    }
    get vertical() {
        return this._vertical;
    }
    set stacked(v) {
        this._stacked = coerceBooleanProperty(v);
    }
    get stacked() {
        return this._stacked;
    }
    // Hide/shows the remove button for removing a control
    set remove(v) {
        this._remove = coerceBooleanProperty(v);
    }
    get remove() {
        return this._remove;
    }
    // Hide/shows the edit button for editing a control
    set edit(v) {
        this._edit = coerceBooleanProperty(v);
    }
    get edit() {
        return this._edit;
    }
    // Allows the control to collapse or not
    set collapsible(v) {
        this._collapsible = coerceBooleanProperty(v);
    }
    get collapsible() {
        return this._collapsible;
    }
    // Icon of the control group (can have bhi prefix or not)
    set icon(v) {
        this._icon = v && v.indexOf('bhi') !== -1 ? v : `bhi-${v}`;
    }
    get icon() {
        return this._icon;
    }
    ngAfterContentInit() {
        if (!this.key) {
            throw new Error('novo-control-group must have the [key] attribute provided!');
        }
    }
    ngOnChanges(changes) {
        const initialValueChange = changes.initialValue;
        // If initial value changes, clear the controls
        if (initialValueChange && initialValueChange.currentValue !== initialValueChange.previousValue && !initialValueChange.firstChange) {
            this.clearControls();
        }
        // Check for array, add a control for each value
        if (this.initialValue && Array.isArray(this.initialValue)) {
            if (this.initialValue.length !== 0) {
                this.currentIndex = 0;
                this.initialValue.forEach((value) => this.addNewControl(value));
            }
        }
        else if (this.initialValue) {
            // If value is an object, just add one control
            this.addNewControl(this.initialValue);
        }
        // If we are horizontal, grab the labels to help with layout
        if (!this.vertical) {
            this.controlLabels = (this.controls || []).map((control) => {
                return {
                    value: control.label,
                    width: control.width,
                    required: control.required,
                    key: control.key,
                    hidden: control.hidden,
                };
            });
            this.ref.markForCheck();
        }
    }
    ngOnDestroy() {
        this.clearControls();
    }
    onChange() {
        this.change.emit(this);
    }
    onClickAdd() {
        this.addNewControl();
        // this.editState = EditState.EDITING;
    }
    onClickCancel() {
        this.editState = EditState.NOT_EDITING;
    }
    onClickSave() {
        this.disabledArray[this.currentIndex - 1].state = EditState.NOT_EDITING;
        this.editState = EditState.NOT_EDITING;
        const control = this.form.controls[this.key];
        if (control) {
            const fg = control.at(this.currentIndex - 1);
            fg.disableAllControls();
        }
    }
    resetAddRemove() {
        this.disabledArray.forEach((item, idx) => {
            item.edit = this.checkCanEdit(idx);
            item.remove = this.checkCanRemove(idx);
            if (!item.edit) {
                item.state = EditState.NOT_EDITING;
            }
        });
        this.ref.markForCheck();
    }
    addNewControl(value) {
        const controlsArray = this.form.controls[this.key];
        const nestedFormGroup = this.buildNestedFormGroup(value);
        if (controlsArray) {
            controlsArray.push(nestedFormGroup);
        }
        else {
            this.form.addControl(this.key, this.fb.array([nestedFormGroup]));
        }
        this.disabledArray.push({
            state: EditState.EDITING,
            edit: true,
            remove: true,
        });
        this.resetAddRemove();
        if (!value) {
            this.onAdd.emit(nestedFormGroup);
        }
        this.currentIndex++;
        this.assignIndexes();
        // Ensure that field interaction changes for nested forms originating from outside the form will be reflected in the nested elements
        nestedFormGroup.fieldInteractionEvents.subscribe(this.onFieldInteractionEvent.bind(this));
        this.ref.markForCheck();
    }
    /**
     * Will remove the control, and optionally, if the event is to be publicized (emitEvent = true) and there is a
     * shouldRemove callback, then call the shouldRemove() callback to determine if the doRemoveControl should be called.
     */
    removeControl(index, emitEvent = true) {
        if (emitEvent && Helpers.isFunction(this.shouldRemove)) {
            this.shouldRemove(index).then((shouldRemove) => {
                if (shouldRemove) {
                    this.doRemoveControl(index, emitEvent);
                }
            });
        }
        else {
            this.doRemoveControl(index, emitEvent);
        }
    }
    doRemoveControl(index, emitEvent) {
        const controlsArray = this.form.controls[this.key];
        const nestedFormGroup = controlsArray.at(index);
        nestedFormGroup.fieldInteractionEvents.unsubscribe();
        if (emitEvent) {
            this.onRemove.emit({ value: nestedFormGroup.getRawValue(), index });
        }
        controlsArray.removeAt(index);
        this.disabledArray = this.disabledArray.filter((value, idx) => idx !== index);
        this.resetAddRemove();
        this.currentIndex--;
        this.assignIndexes();
        this.ref.markForCheck();
    }
    editControl(index) {
        const controlsArray = this.form.controls[this.key];
        const fg = controlsArray.at(index);
        fg.enableAllControls();
        this.onEdit.emit({ value: controlsArray.at(index).value, index });
    }
    toggle(event) {
        Helpers.swallowEvent(event);
        if (this.collapsible) {
            this.toggled = !this.toggled;
            this.ref.markForCheck();
        }
    }
    buildNestedFormGroup(value) {
        const newControls = this.getNewControls();
        if (value) {
            this.formUtils.setInitialValues(newControls, value);
        }
        return this.formUtils.toFormGroup(newControls);
    }
    clearControls() {
        const controlsArray = this.form.controls[this.key];
        if (controlsArray) {
            for (let i = controlsArray.length - 1; i >= 0; i--) {
                this.removeControl(i, false);
            }
            this.currentIndex = 0;
        }
    }
    checkCanEdit(index) {
        if (this.canEdit) {
            const controlsArray = this.form.controls[this.key];
            return this.canEdit(controlsArray.at(index).value, index);
        }
        return true;
    }
    checkCanRemove(index) {
        if (this.canRemove) {
            const controlsArray = this.form.controls[this.key];
            if (controlsArray.at(index)) {
                return this.canRemove(controlsArray.at(index).value, index);
            }
            return true;
        }
        return true;
    }
    getNewControls() {
        const ret = [];
        (this.controls || []).forEach((control) => {
            ret.push(new BaseControl(control.__type, control));
        });
        return ret;
    }
    assignIndexes() {
        const controlsArray = this.form.controls[this.key];
        if (controlsArray) {
            for (let i = 0; i < controlsArray.length; i++) {
                const form = controlsArray.at(i);
                form.associations = { ...form.associations, index: i };
            }
        }
    }
    onFieldInteractionEvent() {
        this.ref.markForCheck();
    }
}
NovoControlGroup.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoControlGroup, deps: [{ token: FormUtils }, { token: i4$2.FormBuilder }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NovoControlGroup.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoControlGroup, selector: "novo-control-group", inputs: { appearance: "appearance", vertical: "vertical", stacked: "stacked", add: "add", remove: "remove", edit: "edit", collapsible: "collapsible", form: "form", controls: "controls", key: "key", label: "label", description: "description", emptyMessage: "emptyMessage", icon: "icon", editIcon: "editIcon", removeIcon: "removeIcon", initialValue: "initialValue", canEdit: "canEdit", canRemove: "canRemove", shouldRemove: "shouldRemove", rowTemplate: "rowTemplate", columnLabelTemplate: "columnLabelTemplate" }, outputs: { onRemove: "onRemove", onEdit: "onEdit", onAdd: "onAdd", change: "change" }, host: { properties: { "class.novo-control-group-appearance-card": "appearance=='card'", "class.novo-control-group-appearance-none": "appearance=='none'" } }, usesOnChanges: true, ngImport: i0, template: "<h6 class=\"novo-section-header\" *ngIf=\"label\">\n  <span (click)=\"toggle($event)\" [class.clickable]=\"collapsible\">\n    <i *ngIf=\"icon && !collapsible\" [ngClass]=\"icon\" [attr.data-automation-id]=\"'novo-control-group-icon-' + key\"></i>\n    <i *ngIf=\"collapsible\" class=\"bhi-next\" [class.toggled]=\"toggled\"\n      [attr.data-automation-id]=\"'novo-control-group-collapse-' + key\"></i>\n    <span [attr.data-automation-id]=\"'novo-control-group-label-' + key\">{{ label }}</span>\n  </span>\n  <label class=\"novo-control-group-description\" *ngIf=\"description\"\n    [attr.data-automation-id]=\"'novo-control-group-description-' + key\">{{ description }}</label>\n</h6>\n<div class=\"novo-control-group-controls\" [class.vertical]=\"vertical\" [class.horizontal]=\"!vertical\"\n  [class.hidden]=\"collapsible && !toggled\">\n\n  <ng-template #defaultTemplate let-index=\"index\" let-form=\"form\" let-key=\"key\">\n    <div class=\"novo-control-group-control\">\n      <div *ngFor=\"let c of controls\" class=\"novo-control-container {{c.key}}\"\n        [class.is-label]=\"c.controlType === 'read-only'\" [style.max-width.px]=\"c.width\">\n        <novo-control (change)=\"onChange()\" [form]=\"(form?.controls)[key]['controls'][index]\" [control]=\"c\"\n          [condensed]=\"!vertical || c.controlType === 'read-only'\"></novo-control>\n      </div>\n      <div class=\"novo-control-container edit last\" *ngIf=\"edit && !vertical\">\n        <novo-button class=\"control-group-action\" [disabled]=\"!disabledArray[index].edit\" type=\"button\"\n          *ngIf=\"edit && !vertical\" theme=\"icon\" [icon]=\"editIcon\"\n          (click)=\"editControl(index)\" [attr.data-automation-id]=\"'novo-control-group-edit-' + key\" index=\"-1\">\n        </novo-button>\n      </div>\n      <div class=\"novo-control-container remove last\" *ngIf=\"remove && !vertical\">\n        <novo-button class=\"control-group-action\" [disabled]=\"!disabledArray[index].remove\" type=\"button\"\n          *ngIf=\"remove && !vertical\" theme=\"icon\"\n          [icon]=\"removeIcon\" (click)=\"removeControl(index)\"\n          [attr.data-automation-id]=\"'novo-control-group-delete-' + key\"\n          index=\"-1\">\n        </novo-button>\n      </div>\n    </div>\n    <novo-button class=\"control-group-action\" [disabled]=\"!disabledArray[index].edit\" type=\"button\"\n      *ngIf=\"edit && vertical\"\n      theme=\"icon\" [icon]=\"editIcon\"\n      (click)=\"editControl(index)\" [attr.data-automation-id]=\"'novo-control-group-edit-' + key\" index=\"-1\">\n    </novo-button>\n    <novo-button class=\"control-group-action\" [disabled]=\"!disabledArray[index].remove\" type=\"button\"\n      *ngIf=\"remove && vertical\" theme=\"icon\"\n      [icon]=\"removeIcon\" (click)=\"removeControl(index)\"\n      [attr.data-automation-id]=\"'novo-control-group-delete-' + key\"\n      index=\"-1\">\n    </novo-button>\n  </ng-template>\n\n  <ng-template #defaultColumnLabelTemplate let-form=\"form\" let-key=\"key\">\n    <div *ngFor=\"let label of controlLabels\"\n      class=\"novo-control-group-control-label {{ label.key }}\"\n      [class.novo-control-group-control-hidden]=\"label.hidden\"\n      [style.max-width.px]=\"label.width\" [class.column-required]=\"label.required\">\n      <span [attr.data-automation-id]=\"'novo-control-group-label-' + label.value\">{{ label.value }}</span>\n    </div>\n    <div class=\"novo-control-group-control-label edit last\" *ngIf=\"edit\"\n      [attr.data-automation-id]=\"'novo-control-group-edit-' + key\"></div>\n    <div class=\"novo-control-group-control-label remove last\" *ngIf=\"remove\"\n      [attr.data-automation-id]=\"'novo-control-group-delete-' + key\"></div>\n  </ng-template>\n\n  <ng-container *ngIf=\"!vertical && (form?.controls)[key] && (form?.controls)[key]['controls'].length !== 0\">\n    <div class=\"novo-control-group-labels\"\n      *ngIf=\"!vertical && (form?.controls)[key] && (form?.controls)[key]['controls'].length !== 0\">\n      <ng-template [ngTemplateOutlet]=\"columnLabelTemplate || defaultColumnLabelTemplate\"\n        [ngTemplateOutletContext]=\"{ form: form, key: key, controlLabels: controlLabels }\">\n      </ng-template>\n    </div>\n  </ng-container>\n\n  <ng-container *ngIf=\"(form?.controls)[key]\">\n    <div class=\"novo-control-group-row\"\n      *ngFor=\"let control of (form?.controls)[key]['controls']; let index = index\">\n      <ng-template [ngTemplateOutlet]=\"rowTemplate || defaultTemplate\"\n        [ngTemplateOutletContext]=\"{ form: form, formGroup: control, index: index, key: key, controls: controls }\">\n      </ng-template>\n    </div>\n  </ng-container>\n\n  <div class=\"novo-control-group-empty\"\n    *ngIf=\"(form?.controls)[key] && (form?.controls)[key]['controls'].length === 0\"\n    [attr.data-automation-id]=\"'novo-control-group-empty-' + key\">\n    {{ emptyMessage }}\n  </div>\n\n  <div *ngIf=\"add\" class=\"novo-control-group-footer\">\n    <novo-button type=\"button\" theme=\"dialogue\" icon=\"add-thin\" side=\"left\" (click)=\"onClickAdd()\"\n      [attr.data-automation-id]=\"'novo-control-group-bottom-add-' + key\" index=\"-1\">\n      {{ add?.label }}\n    </novo-button>\n    <!-- <novo-button *ngIf=\"editState==='editing'\" type=\"button\" theme=\"dialogue\" icon=\"close\" side=\"left\"\n                  (click)=\"onClickCancel()\" [attr.data-automation-id]=\"'novo-control-group-bottom-cancel-' + key\"\n                  index=\"-1\">\n                {{ 'cancel' }}\n                </novo-button>\n                  <novo-button *ngIf=\"editState==='editing'\" type=\"button\" theme=\"dialogue\" icon=\"check\" side=\"left\"\n                  (click)=\"onClickSave()\" [attr.data-automation-id]=\"'novo-control-group-bottom-save-' + key\"\n                  index=\"-1\">\n                {{ add?.label }}\n                </novo-button> -->\n  </div>\n</div>\n", components: [{ type: NovoControlElement, selector: "novo-control", inputs: ["control", "form", "condensed", "autoFocus"], outputs: ["change", "edit", "save", "delete", "upload", "blur", "focus"] }, { type: i3.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i5$1.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { type: i5.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoControlGroup, decorators: [{
            type: Component,
            args: [{ selector: 'novo-control-group', changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[class.novo-control-group-appearance-card]': "appearance=='card'",
                        '[class.novo-control-group-appearance-none]': "appearance=='none'",
                    }, template: "<h6 class=\"novo-section-header\" *ngIf=\"label\">\n  <span (click)=\"toggle($event)\" [class.clickable]=\"collapsible\">\n    <i *ngIf=\"icon && !collapsible\" [ngClass]=\"icon\" [attr.data-automation-id]=\"'novo-control-group-icon-' + key\"></i>\n    <i *ngIf=\"collapsible\" class=\"bhi-next\" [class.toggled]=\"toggled\"\n      [attr.data-automation-id]=\"'novo-control-group-collapse-' + key\"></i>\n    <span [attr.data-automation-id]=\"'novo-control-group-label-' + key\">{{ label }}</span>\n  </span>\n  <label class=\"novo-control-group-description\" *ngIf=\"description\"\n    [attr.data-automation-id]=\"'novo-control-group-description-' + key\">{{ description }}</label>\n</h6>\n<div class=\"novo-control-group-controls\" [class.vertical]=\"vertical\" [class.horizontal]=\"!vertical\"\n  [class.hidden]=\"collapsible && !toggled\">\n\n  <ng-template #defaultTemplate let-index=\"index\" let-form=\"form\" let-key=\"key\">\n    <div class=\"novo-control-group-control\">\n      <div *ngFor=\"let c of controls\" class=\"novo-control-container {{c.key}}\"\n        [class.is-label]=\"c.controlType === 'read-only'\" [style.max-width.px]=\"c.width\">\n        <novo-control (change)=\"onChange()\" [form]=\"(form?.controls)[key]['controls'][index]\" [control]=\"c\"\n          [condensed]=\"!vertical || c.controlType === 'read-only'\"></novo-control>\n      </div>\n      <div class=\"novo-control-container edit last\" *ngIf=\"edit && !vertical\">\n        <novo-button class=\"control-group-action\" [disabled]=\"!disabledArray[index].edit\" type=\"button\"\n          *ngIf=\"edit && !vertical\" theme=\"icon\" [icon]=\"editIcon\"\n          (click)=\"editControl(index)\" [attr.data-automation-id]=\"'novo-control-group-edit-' + key\" index=\"-1\">\n        </novo-button>\n      </div>\n      <div class=\"novo-control-container remove last\" *ngIf=\"remove && !vertical\">\n        <novo-button class=\"control-group-action\" [disabled]=\"!disabledArray[index].remove\" type=\"button\"\n          *ngIf=\"remove && !vertical\" theme=\"icon\"\n          [icon]=\"removeIcon\" (click)=\"removeControl(index)\"\n          [attr.data-automation-id]=\"'novo-control-group-delete-' + key\"\n          index=\"-1\">\n        </novo-button>\n      </div>\n    </div>\n    <novo-button class=\"control-group-action\" [disabled]=\"!disabledArray[index].edit\" type=\"button\"\n      *ngIf=\"edit && vertical\"\n      theme=\"icon\" [icon]=\"editIcon\"\n      (click)=\"editControl(index)\" [attr.data-automation-id]=\"'novo-control-group-edit-' + key\" index=\"-1\">\n    </novo-button>\n    <novo-button class=\"control-group-action\" [disabled]=\"!disabledArray[index].remove\" type=\"button\"\n      *ngIf=\"remove && vertical\" theme=\"icon\"\n      [icon]=\"removeIcon\" (click)=\"removeControl(index)\"\n      [attr.data-automation-id]=\"'novo-control-group-delete-' + key\"\n      index=\"-1\">\n    </novo-button>\n  </ng-template>\n\n  <ng-template #defaultColumnLabelTemplate let-form=\"form\" let-key=\"key\">\n    <div *ngFor=\"let label of controlLabels\"\n      class=\"novo-control-group-control-label {{ label.key }}\"\n      [class.novo-control-group-control-hidden]=\"label.hidden\"\n      [style.max-width.px]=\"label.width\" [class.column-required]=\"label.required\">\n      <span [attr.data-automation-id]=\"'novo-control-group-label-' + label.value\">{{ label.value }}</span>\n    </div>\n    <div class=\"novo-control-group-control-label edit last\" *ngIf=\"edit\"\n      [attr.data-automation-id]=\"'novo-control-group-edit-' + key\"></div>\n    <div class=\"novo-control-group-control-label remove last\" *ngIf=\"remove\"\n      [attr.data-automation-id]=\"'novo-control-group-delete-' + key\"></div>\n  </ng-template>\n\n  <ng-container *ngIf=\"!vertical && (form?.controls)[key] && (form?.controls)[key]['controls'].length !== 0\">\n    <div class=\"novo-control-group-labels\"\n      *ngIf=\"!vertical && (form?.controls)[key] && (form?.controls)[key]['controls'].length !== 0\">\n      <ng-template [ngTemplateOutlet]=\"columnLabelTemplate || defaultColumnLabelTemplate\"\n        [ngTemplateOutletContext]=\"{ form: form, key: key, controlLabels: controlLabels }\">\n      </ng-template>\n    </div>\n  </ng-container>\n\n  <ng-container *ngIf=\"(form?.controls)[key]\">\n    <div class=\"novo-control-group-row\"\n      *ngFor=\"let control of (form?.controls)[key]['controls']; let index = index\">\n      <ng-template [ngTemplateOutlet]=\"rowTemplate || defaultTemplate\"\n        [ngTemplateOutletContext]=\"{ form: form, formGroup: control, index: index, key: key, controls: controls }\">\n      </ng-template>\n    </div>\n  </ng-container>\n\n  <div class=\"novo-control-group-empty\"\n    *ngIf=\"(form?.controls)[key] && (form?.controls)[key]['controls'].length === 0\"\n    [attr.data-automation-id]=\"'novo-control-group-empty-' + key\">\n    {{ emptyMessage }}\n  </div>\n\n  <div *ngIf=\"add\" class=\"novo-control-group-footer\">\n    <novo-button type=\"button\" theme=\"dialogue\" icon=\"add-thin\" side=\"left\" (click)=\"onClickAdd()\"\n      [attr.data-automation-id]=\"'novo-control-group-bottom-add-' + key\" index=\"-1\">\n      {{ add?.label }}\n    </novo-button>\n    <!-- <novo-button *ngIf=\"editState==='editing'\" type=\"button\" theme=\"dialogue\" icon=\"close\" side=\"left\"\n                  (click)=\"onClickCancel()\" [attr.data-automation-id]=\"'novo-control-group-bottom-cancel-' + key\"\n                  index=\"-1\">\n                {{ 'cancel' }}\n                </novo-button>\n                  <novo-button *ngIf=\"editState==='editing'\" type=\"button\" theme=\"dialogue\" icon=\"check\" side=\"left\"\n                  (click)=\"onClickSave()\" [attr.data-automation-id]=\"'novo-control-group-bottom-save-' + key\"\n                  index=\"-1\">\n                {{ add?.label }}\n                </novo-button> -->\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: FormUtils }, { type: i4$2.FormBuilder }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { appearance: [{
                type: Input
            }], vertical: [{
                type: Input
            }], stacked: [{
                type: Input
            }], add: [{
                type: Input
            }], remove: [{
                type: Input
            }], edit: [{
                type: Input
            }], collapsible: [{
                type: Input
            }], form: [{
                type: Input
            }], controls: [{
                type: Input
            }], key: [{
                type: Input
            }], label: [{
                type: Input
            }], description: [{
                type: Input
            }], emptyMessage: [{
                type: Input
            }], icon: [{
                type: Input
            }], editIcon: [{
                type: Input
            }], removeIcon: [{
                type: Input
            }], initialValue: [{
                type: Input
            }], canEdit: [{
                type: Input
            }], canRemove: [{
                type: Input
            }], shouldRemove: [{
                type: Input
            }], rowTemplate: [{
                type: Input
            }], columnLabelTemplate: [{
                type: Input
            }], onRemove: [{
                type: Output
            }], onEdit: [{
                type: Output
            }], onAdd: [{
                type: Output
            }], change: [{
                type: Output
            }] } });

class NovoFile {
    constructor(file) {
        this.name = '';
        this.contentType = '';
        this.lastModified = 0;
        this.size = 0;
        this.loaded = false;
        this.reader = new FileReader();
        this.name = `${encodeURIComponent(file.name || '')}`;
        this.contentType = file.type;
        this.lastModified = file.lastModified;
        this.size = file.size;
        this.file = file;
        this.reader.onload = (event) => {
            this.fileContents = event.target.result.split(',')[1];
            this.dataURL = event.target.result;
            this.loaded = true;
            if (this.readPromise) {
                this.readPromise(this);
            }
        };
    }
    read() {
        return new Promise((resolve) => {
            this.readPromise = resolve;
            // when the file is read it triggers the onload event above.
            this.reader.readAsDataURL(this.file);
        });
    }
    toJSON() {
        return {
            name: this.name,
            contentType: this.type,
            lastModified: this.lastModified,
            size: this.size,
            fileContents: this.fileContents,
        };
    }
}

// Value accessor for the component (supports ngModel)
// const FILE_VALUE_ACCESSOR = {
//   provide: NG_VALUE_ACCESSOR,
//   useExisting: forwardRef(() => NovoFileInputElement),
//   multi: true,
// };
const LAYOUT_DEFAULTS = { order: 'default', download: true, removable: true, labelStyle: 'default', draggable: false };
// make file-input ids unique
let nextId = 0;
class NovoFileInputBase {
    constructor(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) {
        this._defaultErrorStateMatcher = _defaultErrorStateMatcher;
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        this.ngControl = ngControl;
    }
}
const NovoFileInputMixins = mixinErrorState(NovoFileInputBase);
class NovoFileInputElement extends NovoFileInputMixins {
    constructor(element, labels, dragula, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, _ngControl) {
        super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, _ngControl);
        this.element = element;
        this.labels = labels;
        this.dragula = dragula;
        this._uniqueId = `novo-file-input-${++nextId}`;
        /** Tab index for the chip list. */
        this._tabIndex = 0;
        /** User defined tab index. */
        this._userTabIndex = null;
        this.controlType = 'file-input';
        /** @docs-private Implemented as part of NovoFieldControl. */
        this.lastKeyValue = null;
        this.id = this._uniqueId;
        this.tabindex = 0;
        this.multiple = false;
        this.value = [];
        this.edit = new EventEmitter();
        this.save = new EventEmitter();
        this.delete = new EventEmitter();
        this.upload = new EventEmitter();
        this.elements = [];
        this.files = [];
        this.active = false;
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
        this._name = this._uniqueId;
        this._value = false;
        this._required = false;
        this._disabled = false;
        if (_ngControl) {
            _ngControl.valueAccessor = this;
        }
        this.commands = {
            dragenter: this.dragEnterHandler.bind(this),
            dragleave: this.dragLeaveHandler.bind(this),
            dragover: this.dragOverHandler.bind(this),
            drop: this.dropHandler.bind(this),
        };
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get disabled() {
        return this.ngControl ? !!this.ngControl.disabled : this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get required() {
        return this._required;
    }
    set required(value) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    /** Implemented as part of NovoFieldControl. */
    get placeholder() {
        return this._placeholder;
    }
    set placeholder(value) {
        this._placeholder = value;
    }
    ngOnInit() {
        ['dragenter', 'dragleave', 'dragover', 'drop'].forEach((type) => {
            this.element.nativeElement.addEventListener(type, this.commands[type]);
        });
        this.updateLayout();
        this.initializeDragula();
        this.setInitialFileList();
        this.dataFeatureId = this.dataFeatureId ? this.dataFeatureId : this.name;
    }
    ngOnDestroy() {
        ['dragenter', 'dragleave', 'dragover', 'drop'].forEach((type) => {
            this.element.nativeElement.removeEventListener(type, this.commands[type]);
        });
        const dragulaHasFileOutputBag = this.dragula.bags.length > 0 && this.dragula.bags.filter((x) => x.name === this.fileOutputBag).length > 0;
        if (dragulaHasFileOutputBag) {
            this.dragula.destroy(this.fileOutputBag);
        }
    }
    updateLayout() {
        this.layoutOptions = Object.assign({}, LAYOUT_DEFAULTS, this.layoutOptions);
        this.insertTemplatesBasedOnLayout();
    }
    insertTemplatesBasedOnLayout() {
        let order;
        switch (this.layoutOptions.order) {
            case 'displayFilesBelow':
                order = ['fileInput', 'fileOutput'];
                break;
            default:
                order = ['fileOutput', 'fileInput'];
        }
        order.forEach((template) => {
            this.container.createEmbeddedView(this[template], 0);
        });
        return order;
    }
    initializeDragula() {
        this.fileOutputBag = `file-output-${this.dragula.bags.length}`;
        this.dragula.setOptions(this.fileOutputBag, {
            moves: (el, container, handle) => {
                return this.layoutOptions.draggable;
            },
        });
    }
    setInitialFileList() {
        if (this.value) {
            this.files = this.value;
        }
    }
    dragEnterHandler(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
        this.target = event.target;
        this.active = true;
    }
    dragLeaveHandler(event) {
        event.preventDefault();
        if (this.target === event.target) {
            this.active = false;
        }
    }
    dragOverHandler(event) {
        event.preventDefault();
        // no-op
    }
    dropHandler(event) {
        event.preventDefault();
        this.visible = false;
        if (event.dataTransfer.types[0] !== 'Files') {
            return;
        }
        const options = this.layoutOptions;
        const filelist = Array.from(event.dataTransfer.files);
        if (options.customActions) {
            this.upload.emit(this.multiple ? filelist : [filelist[0]]);
        }
        else {
            this.process(this.multiple ? filelist : [filelist[0]]);
        }
        this.active = false;
    }
    writeValue(model) {
        this.model = model;
        // If model is cleared programmatically (E.g. form.patchValue({file: undefined})), empty file list.
        this.files = !model ? [] : this.files;
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    check(event) {
        this.process(Array.from(event.target.files));
        // After processing file upload, clear input element value. Allows for delete and upload of same file.
        event.target.value = '';
    }
    validate(files) {
        let passedValidation = true;
        if (this.layoutOptions.customValidation) {
            this.layoutOptions.customValidation
                .filter((validation) => validation.action === 'upload')
                .forEach((uploadValidation) => {
                passedValidation = uploadValidation.fn(files) && passedValidation;
            });
        }
        return passedValidation;
    }
    process(filelist) {
        if (this.validate(filelist)) {
            Promise.all(filelist.map((file) => this.readFile(file))).then((files) => {
                if (this.multiple) {
                    this.files.push(...files);
                }
                else {
                    this.files = files;
                }
                this.model = this.files;
                this.onModelChange(this.model);
            });
        }
    }
    download(file) {
        window.open(file.dataURL, '_blank');
    }
    remove(file) {
        this.files.splice(this.files.findIndex((f) => f.name === file.name && f.size === file.size), 1);
        this.model = this.files;
        this.onModelChange(this.model);
    }
    readFile(file) {
        return new NovoFile(file).read();
    }
    customEdit(file) {
        this.edit.emit(file);
    }
    customSave(file) {
        this.save.emit(file);
    }
    customDelete(file) {
        this.delete.emit(file);
    }
    customCheck(event) {
        this.upload.emit(event);
    }
    setDisabledState(disabled) {
        this.disabled = disabled;
    }
    /** Whether any radio buttons has focus. */
    get focused() {
        // todo: implement this.
        return false;
    }
    /** Implemented as part of NovoFieldControl. */
    get empty() {
        return this.value === null;
    }
    /** Implemented as part of NovoFieldControl. */
    get shouldLabelFloat() {
        return !this.empty || this.focused;
    }
    /** Implemented as part of NovoFieldControl. */
    setDescribedByIds(ids) {
        this._ariaDescribedby = ids.join(' ');
    }
    /** Implemented as part of NovoFieldControl. */
    onContainerClick(event) {
        this.focus();
    }
    /**
     * Focuses the first non-disabled chip in this chip list, or the associated input when there
     * are no eligible chips.
     */
    focus(options) {
        if (this.disabled) {
            return;
        }
        // TODO
    }
}
NovoFileInputElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFileInputElement, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i2.NovoDragulaService }, { token: i5$1.ErrorStateMatcher }, { token: i4$2.NgForm, optional: true }, { token: i4$2.FormGroupDirective, optional: true }, { token: i4$2.NgControl, optional: true, self: true }], target: i0.ɵɵFactoryTarget.Component });
NovoFileInputElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoFileInputElement, selector: "novo-file-input", inputs: { id: "id", tabindex: "tabindex", errorStateMatcher: "errorStateMatcher", multiple: "multiple", layoutOptions: "layoutOptions", value: "value", dataFeatureId: "dataFeatureId", name: "name", disabled: "disabled", required: "required", placeholder: "placeholder" }, outputs: { edit: "edit", save: "save", delete: "delete", upload: "upload" }, host: { properties: { "class.disabled": "this.disabled" } }, providers: [{ provide: NovoFieldControl, useExisting: NovoFileInputElement }], viewQueries: [{ propertyName: "fileInput", first: true, predicate: ["fileInput"], descendants: true, static: true }, { propertyName: "fileOutput", first: true, predicate: ["fileOutput"], descendants: true, static: true }, { propertyName: "container", first: true, predicate: ["container"], descendants: true, read: ViewContainerRef, static: true }, { propertyName: "inputElement", first: true, predicate: ["inputElement"], descendants: true }], usesInheritance: true, ngImport: i0, template: `
    <div #container></div>
    <ng-template #fileInput>
      <div class="file-input-group" [class.disabled]="disabled" [class.active]="active">
        <input
          #inputElement
          *ngIf="!layoutOptions.customActions"
          type="file"
          [name]="name"
          [attr.id]="name"
          (change)="check($event)"
          [attr.multiple]="multiple"
          tabindex="-1"
          [attr.data-feature-id]="dataFeatureId"
        />
        <input
          #inputElement
          *ngIf="layoutOptions.customActions"
          type="file"
          [name]="name"
          [attr.id]="name"
          (change)="customCheck($event)"
          [attr.multiple]="multiple"
          tabindex="-1"
          [attr.data-feature-id]="dataFeatureId"
        />
        <section [ngSwitch]="layoutOptions.labelStyle">
          <label *ngSwitchCase="'no-box'" [attr.for]="name" class="no-box">
            <div>
              <i class="bhi-dropzone"></i>{{ placeholder || labels.chooseAFile }} {{ labels.or }}
              <strong class="link">{{ labels.clickToBrowse }}</strong>
            </div>
          </label>
          <label *ngSwitchDefault [attr.for]="name" class="boxed">
            <span>{{ placeholder || labels.chooseAFile }}</span>
            <small
              >{{ labels.or }} <strong class="link">{{ labels.clickToBrowse }}</strong></small
            >
          </label>
        </section>
      </div>
    </ng-template>
    <ng-template #fileOutput>
      <div class="file-output-group" [dragula]="fileOutputBag" [dragulaModel]="files">
        <div class="file-item" *ngFor="let file of files" [class.disabled]="disabled">
          <i *ngIf="layoutOptions.draggable" class="bhi-move"></i>
          <label *ngIf="file.link"
            ><span
              ><a href="{{ file.link }}" target="_blank">{{ file.name | decodeURI }}</a></span
            ><span *ngIf="file.description">||</span><span>{{ file.description }}</span></label
          >
          <label *ngIf="!file.link">{{ file.name | decodeURI }}</label>
          <div class="actions" [attr.data-automation-id]="'file-actions'" *ngIf="file.loaded">
            <div *ngIf="!layoutOptions.customActions">
              <button
                *ngIf="layoutOptions.download"
                type="button"
                theme="icon"
                icon="save"
                (click)="download(file)"
                [attr.data-automation-id]="'file-download'"
                tabindex="-1"
              ></button>
              <button
                *ngIf="!disabled && (layoutOptions.removable || (!layoutOptions.removable && layoutOptions.removableWhenNew && !file.link))"
                type="button"
                theme="icon"
                icon="close"
                (click)="remove(file)"
                [attr.data-automation-id]="'file-remove'"
                tabindex="-1"
              ></button>
            </div>
            <div *ngIf="layoutOptions.customActions">
              <button
                *ngIf="layoutOptions.edit && !disabled"
                type="button"
                theme="icon"
                icon="edit"
                (click)="customEdit(file)"
                [attr.data-automation-id]="'file-edit'"
                tabindex="-1"
              ></button>
              <button
                *ngIf="layoutOptions.download"
                type="button"
                theme="icon"
                icon="save"
                (click)="customSave(file)"
                [attr.data-automation-id]="'file-download'"
                tabindex="-1"
              ></button>
              <button
                *ngIf="!disabled"
                type="button"
                theme="icon"
                icon="close"
                (click)="customDelete(file)"
                [attr.data-automation-id]="'file-remove'"
                tabindex="-1"
              ></button>
            </div>
          </div>
          <novo-loading *ngIf="!file.loaded"></novo-loading>
        </div>
      </div>
    </ng-template>
`, isInline: true, components: [{ type: i3.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }, { type: i6.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i5.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i5.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { type: i2.NovoDragulaElement, selector: "[dragula]", inputs: ["dragula", "dragulaModel"] }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "decodeURI": i8.DecodeURIPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFileInputElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-file-input',
                    providers: [{ provide: NovoFieldControl, useExisting: NovoFileInputElement }],
                    template: `
    <div #container></div>
    <ng-template #fileInput>
      <div class="file-input-group" [class.disabled]="disabled" [class.active]="active">
        <input
          #inputElement
          *ngIf="!layoutOptions.customActions"
          type="file"
          [name]="name"
          [attr.id]="name"
          (change)="check($event)"
          [attr.multiple]="multiple"
          tabindex="-1"
          [attr.data-feature-id]="dataFeatureId"
        />
        <input
          #inputElement
          *ngIf="layoutOptions.customActions"
          type="file"
          [name]="name"
          [attr.id]="name"
          (change)="customCheck($event)"
          [attr.multiple]="multiple"
          tabindex="-1"
          [attr.data-feature-id]="dataFeatureId"
        />
        <section [ngSwitch]="layoutOptions.labelStyle">
          <label *ngSwitchCase="'no-box'" [attr.for]="name" class="no-box">
            <div>
              <i class="bhi-dropzone"></i>{{ placeholder || labels.chooseAFile }} {{ labels.or }}
              <strong class="link">{{ labels.clickToBrowse }}</strong>
            </div>
          </label>
          <label *ngSwitchDefault [attr.for]="name" class="boxed">
            <span>{{ placeholder || labels.chooseAFile }}</span>
            <small
              >{{ labels.or }} <strong class="link">{{ labels.clickToBrowse }}</strong></small
            >
          </label>
        </section>
      </div>
    </ng-template>
    <ng-template #fileOutput>
      <div class="file-output-group" [dragula]="fileOutputBag" [dragulaModel]="files">
        <div class="file-item" *ngFor="let file of files" [class.disabled]="disabled">
          <i *ngIf="layoutOptions.draggable" class="bhi-move"></i>
          <label *ngIf="file.link"
            ><span
              ><a href="{{ file.link }}" target="_blank">{{ file.name | decodeURI }}</a></span
            ><span *ngIf="file.description">||</span><span>{{ file.description }}</span></label
          >
          <label *ngIf="!file.link">{{ file.name | decodeURI }}</label>
          <div class="actions" [attr.data-automation-id]="'file-actions'" *ngIf="file.loaded">
            <div *ngIf="!layoutOptions.customActions">
              <button
                *ngIf="layoutOptions.download"
                type="button"
                theme="icon"
                icon="save"
                (click)="download(file)"
                [attr.data-automation-id]="'file-download'"
                tabindex="-1"
              ></button>
              <button
                *ngIf="!disabled && (layoutOptions.removable || (!layoutOptions.removable && layoutOptions.removableWhenNew && !file.link))"
                type="button"
                theme="icon"
                icon="close"
                (click)="remove(file)"
                [attr.data-automation-id]="'file-remove'"
                tabindex="-1"
              ></button>
            </div>
            <div *ngIf="layoutOptions.customActions">
              <button
                *ngIf="layoutOptions.edit && !disabled"
                type="button"
                theme="icon"
                icon="edit"
                (click)="customEdit(file)"
                [attr.data-automation-id]="'file-edit'"
                tabindex="-1"
              ></button>
              <button
                *ngIf="layoutOptions.download"
                type="button"
                theme="icon"
                icon="save"
                (click)="customSave(file)"
                [attr.data-automation-id]="'file-download'"
                tabindex="-1"
              ></button>
              <button
                *ngIf="!disabled"
                type="button"
                theme="icon"
                icon="close"
                (click)="customDelete(file)"
                [attr.data-automation-id]="'file-remove'"
                tabindex="-1"
              ></button>
            </div>
          </div>
          <novo-loading *ngIf="!file.loaded"></novo-loading>
        </div>
      </div>
    </ng-template>
`,
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i2.NovoDragulaService }, { type: i5$1.ErrorStateMatcher }, { type: i4$2.NgForm, decorators: [{
                    type: Optional
                }] }, { type: i4$2.FormGroupDirective, decorators: [{
                    type: Optional
                }] }, { type: i4$2.NgControl, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }]; }, propDecorators: { id: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], errorStateMatcher: [{
                type: Input
            }], fileInput: [{
                type: ViewChild,
                args: ['fileInput', { static: true }]
            }], fileOutput: [{
                type: ViewChild,
                args: ['fileOutput', { static: true }]
            }], container: [{
                type: ViewChild,
                args: ['container', { read: ViewContainerRef, static: true }]
            }], inputElement: [{
                type: ViewChild,
                args: ['inputElement']
            }], multiple: [{
                type: Input
            }], layoutOptions: [{
                type: Input
            }], value: [{
                type: Input
            }], dataFeatureId: [{
                type: Input
            }], edit: [{
                type: Output
            }], save: [{
                type: Output
            }], delete: [{
                type: Output
            }], upload: [{
                type: Output
            }], name: [{
                type: Input
            }], disabled: [{
                type: HostBinding,
                args: ['class.disabled']
            }, {
                type: Input
            }], required: [{
                type: Input
            }], placeholder: [{
                type: Input
            }] } });

// NG2
// Value accessor for the component (supports ngModel)
const ADDRESS_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoAddressElement),
    multi: true,
};
class NovoAddressElement {
    constructor(labels) {
        this.labels = labels;
        this._readOnly = false;
        this.states = [];
        this.fieldList = ['address1', 'address2', 'city', 'state', 'zip', 'countryID'];
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
        this.focused = {};
        this.invalid = {};
        this.disabled = {};
        this.invalidMaxlength = {};
        this.valid = {};
        this.tooltip = {};
        this.initComplete = false;
        this.change = new EventEmitter();
        this.focus = new EventEmitter();
        this.blur = new EventEmitter();
        this.validityChange = new EventEmitter();
    }
    set readOnly(readOnly) {
        this._readOnly = readOnly;
        this.fieldList.forEach((field) => {
            this.disabled[field] = this._readOnly;
        });
        if (this.model) {
            this.updateStates();
        }
    }
    get readOnly() {
        return this._readOnly;
    }
    ngOnInit() {
        if (!this.config) {
            this.config = {};
        }
        this.initConfig();
        if (this.model) {
            this.writeValue(this.model);
            this.updateControl();
        }
        else if (!this.model) {
            this.model = {};
        }
        if (Helpers.isBlank(this.model.countryID)) {
            this.updateStates();
        }
    }
    initConfig() {
        this.fieldList.forEach((field) => {
            if (!this.config.hasOwnProperty(field)) {
                this.config[field] = {
                    hidden: true,
                };
            }
            if (!this.config[field].hasOwnProperty('label')) {
                this.config[field].label = this.labels[field];
            }
            if (this.config.required) {
                this.config[field].required = true;
            }
            if (this.config[field].readOnly || this.config.readOnly) {
                this.config[field].readOnly = true;
                this.disabled[field] = true;
            }
            if (field === 'countryID') {
                if (!this.config[field].pickerConfig) {
                    this.config.countryID.pickerConfig = this.getDefaultCountryConfig();
                }
                this.config[field].pickerConfig.defaultOptions = this.config.countryID.pickerConfig.options;
            }
            if (field === 'state') {
                if (!this.config[field].pickerConfig) {
                    this.config.state.pickerConfig = this.getDefaultStateConfig();
                    this.config[field].pickerConfig.defaultOptions = this.config[field].pickerConfig.options;
                }
                this.stateOptions = this.config[field].pickerConfig.options;
                this.config[field].pickerConfig.options = (query = '') => {
                    return this.stateOptions(query, this.model.countryID);
                };
                this.config[field].pickerConfig.defaultOptions = this.stateOptions;
            }
        });
    }
    isValid(field) {
        let valid = true;
        if (((this.config[field].required && (Helpers.isBlank(this.model[field]) || Helpers.isEmpty(this.model[field]))) ||
            !this.config[field].required) &&
            !(field === 'countryID' && this.config[field].required && !Helpers.isBlank(this.model.countryID)) &&
            !(field === 'state' &&
                this.config[field].required &&
                (!Helpers.isEmpty(this.model.state) ||
                    ((Helpers.isBlank(this.model.state) || Helpers.isEmpty(this.model.state)) &&
                        !Helpers.isBlank(this.model.countryName) &&
                        this.config.state.pickerConfig &&
                        this.config.state.pickerConfig.defaultOptions &&
                        this.config.state.pickerConfig.defaultOptions.length === 0)))) {
            valid = false;
        }
        else if (!Helpers.isEmpty(this.model[field]) &&
            !Helpers.isBlank(this.config[field].maxlength) &&
            this.config[field].maxlength < this.model[field].length) {
            valid = false;
        }
        this.valid[field] = valid;
    }
    isInvalid(field) {
        let invalid = false;
        let invalidMaxlength = false;
        if ((field !== 'countryID' &&
            field !== 'state' &&
            this.config[field]?.required &&
            Helpers.isEmpty(this.model[field]) &&
            !Helpers.isBlank(this.model[field])) ||
            (field === 'countryID' && this.config[field]?.required && Helpers.isBlank(this.model.countryName) && this.config[field]?.updated) ||
            (field === 'state' &&
                this.config[field]?.required &&
                (Helpers.isBlank(this.model.state) || Helpers.isEmpty(this.model.state)) &&
                !Helpers.isBlank(this.model.countryID) &&
                this.config[field]?.updated &&
                this.config.state.pickerConfig &&
                this.config.state.pickerConfig.defaultOptions &&
                this.config.state.pickerConfig.defaultOptions.length > 0)) {
            invalid = true;
        }
        else if (!Helpers.isEmpty(this.model[field]) &&
            !Helpers.isBlank(this.config[field]?.maxlength) &&
            this.config[field]?.maxlength < this.model[field].length) {
            invalid = true;
            invalidMaxlength = true;
        }
        this.invalid[field] = invalid;
        this.invalidMaxlength[field] = invalidMaxlength;
    }
    onInput(event, field) {
        this.isInvalid(field);
        this.isValid(field);
        if (event) {
            this.change.emit({ value: this.model[field], field });
        }
    }
    isFocused(event, field) {
        this.focused[field] = true;
        this.focus.emit({ event, field });
    }
    isBlurred(event, field) {
        this.focused[field] = false;
        this.blur.emit({ event, field });
    }
    onCountryChange(evt) {
        const country = evt && evt.rawValue ? evt.rawValue : null;
        let field;
        let statesUpdatable = false;
        this.config.countryID.updated = true;
        if (this.config.countryID.pickerConfig) {
            field = this.config.countryID.pickerConfig.field;
        }
        if (country && field && !Helpers.isBlank(country[field]) && this.model.countryID !== country[field]) {
            this.model.countryID = country[field];
            this.model.countryName = Helpers.interpolate(this.config.countryID.pickerConfig.format, country);
            this.disabled.state = false;
            this.tooltip.state = undefined;
            statesUpdatable = true;
        }
        else if (Helpers.isBlank(country) || Helpers.isBlank(country[field])) {
            this.model.countryID = undefined;
            this.model.countryName = undefined;
            this.disabled.state = true;
            this.tooltip.state = this.labels.selectCountryFirst;
            this.invalid.state = false;
            statesUpdatable = true;
        }
        // Update state
        if (statesUpdatable) {
            this.model.state = undefined;
            this.updateStates();
        }
        this.updateControl();
        this.onInput(null, 'countryID');
        this.onInput(null, 'state');
    }
    onStateChange(evt) {
        const state = evt && evt.value ? evt.value : null;
        this.config.state.updated = true;
        this.model.state = state;
        this.updateControl();
        this.onInput(null, 'state');
    }
    setStateLabel(model) {
        const state = model.state;
        if (!Helpers.isBlank(state)) {
            if (this.config.state.required) {
                this.valid.state = true;
            }
            this.model.state = state;
        }
        else {
            this.model.state = undefined;
            if (this.config.state.required) {
                this.valid.state = false;
            }
        }
    }
    updateStates() {
        if (this.config.state.pickerConfig.options && !Helpers.isBlank(this.model.countryID)) {
            this.config.state.pickerConfig.options = (query = '') => {
                return this.stateOptions(query, this.model.countryID);
            };
            this.stateOptions('', this.model.countryID).then((results) => {
                this.config.state.pickerConfig.defaultOptions = results;
                if (results.length) {
                    this.tooltip.state = undefined;
                    this.disabled.state = this._readOnly;
                    this.setStateLabel(this.model);
                }
                else {
                    this.disabled.state = true;
                    this.tooltip.state = this.labels.noStatesForCountry;
                    if (this.config.state.required) {
                        this.valid.state = true;
                    }
                }
                this.validityChange.emit();
                this.onInput(null, 'state');
            });
        }
        else {
            this.config.state.pickerConfig.defaultOptions = [];
            this.disabled.state = true;
            this.tooltip.state = this.labels.selectCountryFirst;
            if (this.config.state.required) {
                this.valid.state = false;
            }
        }
    }
    getStateOptions(filter = '', countryID) {
        if (countryID) {
            const country = findByCountryId(countryID);
            const states = getStates(country.name);
            if (filter) {
                return states.filter((name) => new RegExp(`${filter}`, 'gi').test(name));
            }
            return states;
        }
        else {
            return [];
        }
    }
    updateControl() {
        this.onModelChange(this.model);
        this.onInput(null, 'countryID');
        this.onInput(null, 'state');
    }
    writeValue(model) {
        let loadingCountries = false;
        if (model) {
            let countryName;
            if (model.countryName && model.countryID) {
                countryName = model.countryName;
            }
            else if (model.countryID) {
                if (this.config.countryID.pickerConfig && this.config.countryID.pickerConfig.getLabels) {
                    if (Helpers.isFunction(this.config.countryID.pickerConfig.getLabels)) {
                        const promise = this.config.countryID.pickerConfig.getLabels(model.countryID);
                        loadingCountries = true;
                        if (promise.then) {
                            promise.then((result) => {
                                loadingCountries = false;
                                countryName = Helpers.interpolateWithFallback(this.config.countryID.pickerConfig.format, result);
                                this.model = Object.assign(model, { countryName });
                                this.updateStates();
                            });
                        }
                    }
                }
            }
            if (countryName) {
                countryName = countryName.trim();
                model.state = model.state || '';
                this.model = Object.assign(model, { countryName });
            }
            else {
                this.model = model;
            }
            if (!loadingCountries && !Helpers.isBlank(this.model.countryID)) {
                this.updateStates();
            }
        }
        this.fieldList.forEach((field) => {
            this.onInput(null, field);
        });
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    getDefaultStateConfig() {
        return {
            field: 'value',
            format: '$label',
            options: (query = '', countryID) => {
                return Promise.resolve(this.getStateOptions(query, countryID));
            },
            getLabels: (state) => {
                return Promise.resolve(state);
            },
        };
    }
    getDefaultCountryConfig() {
        return {
            field: 'value',
            format: '$label',
            options: (query = '') => {
                return new Promise((resolve) => {
                    let countries = COUNTRIES;
                    if (query) {
                        countries = countries.filter((country) => new RegExp(`${query}`, 'gi').test(country.name));
                    }
                    return resolve(countries.map((country) => ({ value: country.id, label: country.name })));
                });
            },
            getLabels: (countryID) => {
                return new Promise((resolve) => {
                    const country = findByCountryId(countryID);
                    if (country) {
                        resolve({ value: country.id, label: country.name });
                    }
                    else {
                        resolve('');
                    }
                });
            },
        };
    }
}
NovoAddressElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAddressElement, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component });
NovoAddressElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoAddressElement, selector: "novo-address", inputs: { config: "config", readOnly: "readOnly" }, outputs: { change: "change", focus: "focus", blur: "blur", validityChange: "validityChange" }, providers: [ADDRESS_VALUE_ACCESSOR], ngImport: i0, template: `
    <span
      *ngIf="!config?.address1?.hidden"
      class="street-address"
      [class.invalid]="invalid.address1"
      [class.focus]="focused.address1"
      [class.disabled]="disabled.address1"
    >
      <i
        *ngIf="config.address1.required"
        class="required-indicator address1"
        [ngClass]="{ 'bhi-circle': !valid.address1, 'bhi-check': valid.address1 }"
      >
      </i>
      <input
        [class.maxlength-error]="invalidMaxlength.address1"
        type="text"
        id="address1"
        name="address1"
        [placeholder]="config.address1.label"
        [maxlength]="config?.address1?.maxlength"
        autocomplete="shipping street-address address-line-1"
        [(ngModel)]="model.address1"
        (ngModelChange)="updateControl()"
        (focus)="isFocused($event, 'address1')"
        (blur)="isBlurred($event, 'address1')"
        (input)="onInput($event, 'address1')"
        [disabled]="disabled.address1"
      />
    </span>
    <span
      *ngIf="!config?.address2?.hidden"
      class="apt suite"
      [class.invalid]="invalid.address2"
      [class.focus]="focused.address2"
      [class.disabled]="disabled.address2"
    >
      <i
        *ngIf="config.address2.required"
        class="required-indicator address2"
        [ngClass]="{ 'bhi-circle': !valid.address2, 'bhi-check': valid.address2 }"
      >
      </i>
      <input
        [class.maxlength-error]="invalidMaxlength.address2"
        type="text"
        id="address2"
        name="address2"
        [placeholder]="config.address2.label"
        [maxlength]="config?.address2?.maxlength"
        autocomplete="shipping address-line-2"
        [(ngModel)]="model.address2"
        (ngModelChange)="updateControl()"
        (focus)="isFocused($event, 'address2')"
        (blur)="isBlurred($event, 'address2')"
        (input)="onInput($event, 'address2')"
        [disabled]="disabled.address2"
      />
    </span>
    <span
      *ngIf="!config?.city?.hidden"
      class="city locality"
      [class.invalid]="invalid.city"
      [class.focus]="focused.city"
      [class.disabled]="disabled.city"
    >
      <i *ngIf="config.city.required" class="required-indicator" [ngClass]="{ 'bhi-circle': !valid.city, 'bhi-check': valid.city }"> </i>
      <input
        [class.maxlength-error]="invalidMaxlength.city"
        type="text"
        id="city"
        name="city"
        [placeholder]="config.city.label"
        autocomplete="shipping city locality"
        [maxlength]="config?.city?.maxlength"
        [(ngModel)]="model.city"
        (ngModelChange)="updateControl()"
        (focus)="isFocused($event, 'city')"
        (blur)="isBlurred($event, 'city')"
        (input)="onInput($event, 'city')"
        [disabled]="disabled.city"
      />
    </span>
    <span
      *ngIf="!config?.state?.hidden"
      class="state region"
      [class.invalid]="invalid.state"
      [class.focus]="focused.state"
      [class.disabled]="disabled.state"
      [tooltip]="tooltip.state"
    >
      <i *ngIf="config.state.required" class="required-indicator" [ngClass]="{ 'bhi-circle': !valid.state, 'bhi-check': valid.state }"> </i>
      <novo-picker
        [config]="config?.state?.pickerConfig"
        [placeholder]="config?.state?.label"
        (changed)="onStateChange($event)"
        autocomplete="shipping region"
        [(ngModel)]="model.state"
        [disablePickerInput]="disabled.state"
      ></novo-picker>
    </span>
    <span
      *ngIf="!config?.zip?.hidden"
      class="zip postal-code"
      [class.invalid]="invalid.zip"
      [class.focus]="focused.zip"
      [class.disabled]="disabled.zip"
    >
      <i *ngIf="config.zip.required" class="required-indicator" [ngClass]="{ 'bhi-circle': !valid.zip, 'bhi-check': valid.zip }"> </i>
      <input
        [class.maxlength-error]="invalidMaxlength.zip"
        type="text"
        id="zip"
        name="zip"
        [placeholder]="config.zip.label"
        autocomplete="shipping postal-code"
        [maxlength]="config?.zip?.maxlength"
        [(ngModel)]="model.zip"
        (ngModelChange)="updateControl()"
        (focus)="isFocused($event, 'zip')"
        (blur)="isBlurred($event, 'zip')"
        (input)="onInput($event, 'zip')"
        [disabled]="disabled.zip"
      />
    </span>
    <span
      *ngIf="!config?.countryID?.hidden"
      class="country-name"
      [class.invalid]="invalid.countryID"
      [class.focus]="focused.countryID"
      [class.disabled]="disabled.countryID"
    >
      <i
        *ngIf="config.countryID.required"
        class="required-indicator"
        [ngClass]="{ 'bhi-circle': !valid.countryID, 'bhi-check': valid.countryID }"
      >
      </i>
      <novo-picker
        [config]="config?.countryID?.pickerConfig"
        [placeholder]="config.countryID.label"
        (changed)="onCountryChange($event)"
        autocomplete="shipping country"
        [(ngModel)]="model.countryID"
        [disablePickerInput]="disabled.countryID"
      ></novo-picker>
    </span>
  `, isInline: true, components: [{ type: i2$1.NovoPickerElement, selector: "novo-picker", inputs: ["config", "placeholder", "clearValueOnSelect", "closeOnSelect", "selected", "appendToBody", "parentScrollSelector", "parentScrollAction", "containerClass", "side", "autoSelectFirstOption", "overrideElement", "maxlength", "disablePickerInput"], outputs: ["changed", "select", "focus", "blur", "typing"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i4$2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i4$2.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { type: i4$2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4$2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i4$1.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipActive", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAddressElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-address',
                    providers: [ADDRESS_VALUE_ACCESSOR],
                    template: `
    <span
      *ngIf="!config?.address1?.hidden"
      class="street-address"
      [class.invalid]="invalid.address1"
      [class.focus]="focused.address1"
      [class.disabled]="disabled.address1"
    >
      <i
        *ngIf="config.address1.required"
        class="required-indicator address1"
        [ngClass]="{ 'bhi-circle': !valid.address1, 'bhi-check': valid.address1 }"
      >
      </i>
      <input
        [class.maxlength-error]="invalidMaxlength.address1"
        type="text"
        id="address1"
        name="address1"
        [placeholder]="config.address1.label"
        [maxlength]="config?.address1?.maxlength"
        autocomplete="shipping street-address address-line-1"
        [(ngModel)]="model.address1"
        (ngModelChange)="updateControl()"
        (focus)="isFocused($event, 'address1')"
        (blur)="isBlurred($event, 'address1')"
        (input)="onInput($event, 'address1')"
        [disabled]="disabled.address1"
      />
    </span>
    <span
      *ngIf="!config?.address2?.hidden"
      class="apt suite"
      [class.invalid]="invalid.address2"
      [class.focus]="focused.address2"
      [class.disabled]="disabled.address2"
    >
      <i
        *ngIf="config.address2.required"
        class="required-indicator address2"
        [ngClass]="{ 'bhi-circle': !valid.address2, 'bhi-check': valid.address2 }"
      >
      </i>
      <input
        [class.maxlength-error]="invalidMaxlength.address2"
        type="text"
        id="address2"
        name="address2"
        [placeholder]="config.address2.label"
        [maxlength]="config?.address2?.maxlength"
        autocomplete="shipping address-line-2"
        [(ngModel)]="model.address2"
        (ngModelChange)="updateControl()"
        (focus)="isFocused($event, 'address2')"
        (blur)="isBlurred($event, 'address2')"
        (input)="onInput($event, 'address2')"
        [disabled]="disabled.address2"
      />
    </span>
    <span
      *ngIf="!config?.city?.hidden"
      class="city locality"
      [class.invalid]="invalid.city"
      [class.focus]="focused.city"
      [class.disabled]="disabled.city"
    >
      <i *ngIf="config.city.required" class="required-indicator" [ngClass]="{ 'bhi-circle': !valid.city, 'bhi-check': valid.city }"> </i>
      <input
        [class.maxlength-error]="invalidMaxlength.city"
        type="text"
        id="city"
        name="city"
        [placeholder]="config.city.label"
        autocomplete="shipping city locality"
        [maxlength]="config?.city?.maxlength"
        [(ngModel)]="model.city"
        (ngModelChange)="updateControl()"
        (focus)="isFocused($event, 'city')"
        (blur)="isBlurred($event, 'city')"
        (input)="onInput($event, 'city')"
        [disabled]="disabled.city"
      />
    </span>
    <span
      *ngIf="!config?.state?.hidden"
      class="state region"
      [class.invalid]="invalid.state"
      [class.focus]="focused.state"
      [class.disabled]="disabled.state"
      [tooltip]="tooltip.state"
    >
      <i *ngIf="config.state.required" class="required-indicator" [ngClass]="{ 'bhi-circle': !valid.state, 'bhi-check': valid.state }"> </i>
      <novo-picker
        [config]="config?.state?.pickerConfig"
        [placeholder]="config?.state?.label"
        (changed)="onStateChange($event)"
        autocomplete="shipping region"
        [(ngModel)]="model.state"
        [disablePickerInput]="disabled.state"
      ></novo-picker>
    </span>
    <span
      *ngIf="!config?.zip?.hidden"
      class="zip postal-code"
      [class.invalid]="invalid.zip"
      [class.focus]="focused.zip"
      [class.disabled]="disabled.zip"
    >
      <i *ngIf="config.zip.required" class="required-indicator" [ngClass]="{ 'bhi-circle': !valid.zip, 'bhi-check': valid.zip }"> </i>
      <input
        [class.maxlength-error]="invalidMaxlength.zip"
        type="text"
        id="zip"
        name="zip"
        [placeholder]="config.zip.label"
        autocomplete="shipping postal-code"
        [maxlength]="config?.zip?.maxlength"
        [(ngModel)]="model.zip"
        (ngModelChange)="updateControl()"
        (focus)="isFocused($event, 'zip')"
        (blur)="isBlurred($event, 'zip')"
        (input)="onInput($event, 'zip')"
        [disabled]="disabled.zip"
      />
    </span>
    <span
      *ngIf="!config?.countryID?.hidden"
      class="country-name"
      [class.invalid]="invalid.countryID"
      [class.focus]="focused.countryID"
      [class.disabled]="disabled.countryID"
    >
      <i
        *ngIf="config.countryID.required"
        class="required-indicator"
        [ngClass]="{ 'bhi-circle': !valid.countryID, 'bhi-check': valid.countryID }"
      >
      </i>
      <novo-picker
        [config]="config?.countryID?.pickerConfig"
        [placeholder]="config.countryID.label"
        (changed)="onCountryChange($event)"
        autocomplete="shipping country"
        [(ngModel)]="model.countryID"
        [disablePickerInput]="disabled.countryID"
      ></novo-picker>
    </span>
  `,
                }]
        }], ctorParameters: function () { return [{ type: i1.NovoLabelService }]; }, propDecorators: { config: [{
                type: Input
            }], readOnly: [{
                type: Input
            }], change: [{
                type: Output
            }], focus: [{
                type: Output
            }], blur: [{
                type: Output
            }], validityChange: [{
                type: Output
            }] } });

class NovoControlTemplates {
    constructor(templates) {
        this.templates = templates;
    }
    ngAfterViewInit() {
        if (this.defaultTemplates && this.defaultTemplates.length) {
            this.defaultTemplates.forEach((template) => {
                this.templates.addDefault(template.name, template.template);
            });
        }
    }
}
NovoControlTemplates.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoControlTemplates, deps: [{ token: i1.NovoTemplateService }], target: i0.ɵɵFactoryTarget.Component });
NovoControlTemplates.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoControlTemplates, selector: "novo-control-templates", viewQueries: [{ propertyName: "defaultTemplates", predicate: NovoTemplate, descendants: true }], ngImport: i0, template: `
    <!---Readonly--->
    <ng-template novoTemplate="read-only" let-form="form" let-control>
      <div>{{ form.getRawValue()[control.key] }}</div>
    </ng-template>
    <!--Textbox--->
    <ng-template novoTemplate="textbox" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div
        [formGroup]="form"
        class="novo-control-input-container novo-control-input-with-label"
        [tooltip]="control?.tooltip"
        [tooltipPosition]="control?.tooltipPosition"
        [tooltipSize]="control?.tooltipSize"
        [tooltipPreline]="control?.tooltipPreline"
        [removeTooltipArrow]="control?.removeTooltipArrow"
        [tooltipAutoPosition]="control?.tooltipAutoPosition"
        [novoPopover]="control.popoverContent"
        [popoverHtmlContent]="control.popoverHtmlContent"
        [popoverTitle]="control.popoverTitle"
        [popoverPlacement]="control.popoverPlacement"
        [popoverOnHover]="control.popoverOnHover"
        [popoverAlways]="control.popoverAlways"
        [popoverDisabled]="control.popoverDisabled"
        [popoverAnimation]="control.popoverAnimation"
        [popoverDismissTimeout]="control.popoverDismissTimeout"
      >
        <input
          *ngIf="control?.type !== 'number' && control?.textMaskEnabled"
          [textMask]="control.maskOptions"
          [formControlName]="control.key"
          [id]="control.key"
          [type]="control?.type"
          [placeholder]="control?.placeholder"
          (input)="methods.emitChange($event)"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          autocomplete
        />
        <input
          *ngIf="control?.type !== 'number' && !control?.textMaskEnabled"
          [class.maxlength-error]="errors?.maxlength"
          [formControlName]="control.key"
          [id]="control.key"
          [type]="control?.type"
          [placeholder]="control?.placeholder"
          (input)="methods.emitChange($event)"
          [maxlength]="control?.maxlength"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          autocomplete
        />
        <input
          *ngIf="control?.type === 'number' && control?.subType !== 'percentage'"
          [class.maxlength-error]="errors?.maxlength"
          [formControlName]="control.key"
          [id]="control.key"
          [type]="control?.type"
          [placeholder]="control?.placeholder"
          (keydown)="methods.restrictKeys($event)"
          (input)="methods.emitChange($event)"
          [maxlength]="control?.maxlength"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          step="any"
          (mousewheel)="numberInput.blur()"
          #numberInput
        />
        <!-- the percentage input does not use formControlName like a normal reactive input because instead of
          setting the floating point value directly, it is multiplied by 100 into a percentage value -->
        <input
          *ngIf="control?.type === 'number' && control?.subType === 'percentage'"
          [id]="control.key"
          [type]="control?.type"
          [placeholder]="control?.placeholder"
          (keydown)="methods.restrictKeys($event)"
          [value]="control?.percentValue"
          [disabled]="control?.readOnly"
          (input)="methods.handlePercentChange($event)"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          step="any"
          (mousewheel)="percentInput.blur()"
          #percentInput
        />
        <label class="input-label" *ngIf="control?.subType === 'currency'">{{ control.currencyFormat }}</label>
        <label class="input-label" *ngIf="control?.subType === 'percentage'">%</label>
      </div>
    </ng-template>

    <!--Textarea--->
    <ng-template novoTemplate="text-area" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div
        class="textarea-container"
        [formGroup]="form"
        [tooltip]="control?.tooltip"
        [tooltipPosition]="control?.tooltipPosition"
        [tooltipSize]="control?.tooltipSize"
        [tooltipPreline]="control?.tooltipPreline"
        [removeTooltipArrow]="control?.removeTooltipArrow"
        [tooltipAutoPosition]="control?.tooltipAutoPosition"
        [novoPopover]="control.popoverContent"
        [popoverHtmlContent]="control.popoverHtmlContent"
        [popoverTitle]="control.popoverTitle"
        [popoverPlacement]="control.popoverPlacement"
        [popoverOnHover]="control.popoverOnHover"
        [popoverAlways]="control.popoverAlways"
        [popoverDisabled]="control.popoverDisabled"
        [popoverAnimation]="control.popoverAnimation"
        [popoverDismissTimeout]="control.popoverDismissTimeout"
      >
        <textarea
          [class.maxlength-error]="errors?.maxlength"
          [name]="control.key"
          [attr.id]="control.key"
          [placeholder]="control.placeholder"
          [formControlName]="control.key"
          autosize
          (input)="methods.handleTextAreaInput($event)"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          [maxlength]="control?.maxlength"
        ></textarea>
      </div>
    </ng-template>

    <!--Editor-->
    <ng-template novoTemplate="editor" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-editor
          [name]="control.key"
          [formControlName]="control.key"
          [startupFocus]="control.startupFocus"
          [minimal]="control.minimal"
          [fileBrowserImageUploadUrl]="control.fileBrowserImageUploadUrl"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          [config]="control.config"
        ></novo-editor>
      </div>
    </ng-template>

    <!--AceEditor-->
    <ng-template novoTemplate="ace-editor" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-ace-editor
          [name]="control.key"
          [formControlName]="control.key"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
        ></novo-ace-editor>
      </div>
    </ng-template>

    <!--HTML5 Select-->
    <ng-template novoTemplate="native-select" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <select
          [id]="control.key"
          [formControlName]="control.key"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [novoPopover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
        >
          <option *ngIf="control.placeholder" value="" disabled selected hidden>{{ control.placeholder }}</option>
          <option *ngFor="let opt of control.options" [value]="opt.key">{{ opt.value }}</option>
        </select>
      </div>
    </ng-template>

    <!--File-->
    <ng-template novoTemplate="file" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-file-input
          [formControlName]="control.key"
          [id]="control.key"
          [name]="control.key"
          [placeholder]="control.placeholder"
          [value]="control.value"
          [multiple]="control.multiple"
          [layoutOptions]="control.layoutOptions"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [novoPopover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
          (edit)="methods.handleEdit($event)"
          (save)="methods.handleSave($event)"
          (delete)="methods.handleDelete($event)"
          (upload)="methods.handleUpload($event)"
        ></novo-file-input>
      </div>
    </ng-template>

    <!--Tiles-->
    <ng-template novoTemplate="tiles" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-tiles
          [options]="control.options"
          [formControlName]="control.key"
          (onChange)="methods.modelChange($event)"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [novoPopover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
          [controlDisabled]="control.disabled"
        ></novo-tiles>
      </div>
    </ng-template>

    <!--Picker-->
    <ng-template novoTemplate="picker" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form" class="novo-control-input-container">
        <novo-picker
          [config]="control.config"
          [formControlName]="control.key"
          [placeholder]="control.placeholder"
          [parentScrollSelector]="control.parentScrollSelector"
          *ngIf="!control.multiple"
          (select)="methods.modelChange($event)"
          (changed)="methods.modelChangeWithRaw($event)"
          (typing)="methods.handleTyping($event)"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [novoPopover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
        ></novo-picker>
        <novo-chips
          [source]="control.config"
          [type]="control.config.type"
          [formControlName]="control.key"
          [placeholder]="control.placeholder"
          [maxlength]="control?.maxlength"
          *ngIf="control.multiple && !control.config.columns"
          [closeOnSelect]="control.closeOnSelect"
          (changed)="methods.modelChangeWithRaw($event)"
          (typing)="methods.handleTyping($event)"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [novoPopover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
        ></novo-chips>
        <novo-row-chips
          [source]="control.config"
          [type]="control.config.type"
          [formControlName]="control.key"
          [placeholder]="control.placeholder"
          [maxlength]="control?.maxlength"
          *ngIf="control.multiple && control.config.columns"
          [closeOnSelect]="control.closeOnSelect"
          (changed)="methods.modelChangeWithRaw($event)"
          (typing)="methods.handleTyping($event)"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [novoPopover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
        ></novo-row-chips>
      </div>
    </ng-template>

    <!--Novo Select-->
    <ng-template novoTemplate="select" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-select
          [options]="control.options"
          [headerConfig]="control.headerConfig"
          [placeholder]="control.placeholder"
          [formControlName]="control.key"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [novoPopover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
          (onSelect)="methods.modelChange($event)"
        ></novo-select>
      </div>
    </ng-template>

    <!--Timezone -->
    <ng-template novoTemplate="timezone" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-select
          [options]="control.options"
          [headerConfig]="control.headerConfig"
          [placeholder]="control.placeholder"
          [formControlName]="control.key"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [novoPopover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
          position="bottom"
          (onSelect)="methods.modelChange($event)"
        ></novo-select>
      </div>
    </ng-template>

    <!--Radio-->
    <ng-template novoTemplate="radio" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form" class="novo-control-input-container">
        <novo-radio-group [name]="control.key" [formControlName]="control.key" [disabled]="control.disabled">
          <novo-radio
            *ngFor="let option of control.options"
            [value]="option.value"
            [label]="option.label"
            [checked]="
              option.value === form.getRawValue()[control.key] ||
              (form.getRawValue()[control.key] && option.value === form.getRawValue()[control.key].id)
            "
            [tooltip]="control.tooltip"
            [tooltipPosition]="control.tooltipPosition"
            [tooltipSize]="control?.tooltipSize"
            [tooltipPreline]="control?.tooltipPreline"
            [removeTooltipArrow]="control?.removeTooltipArrow"
            [tooltipAutoPosition]="control?.tooltipAutoPosition"
            [novoPopover]="control.popoverContent"
            [popoverHtmlContent]="control.popoverHtmlContent"
            [popoverTitle]="control.popoverTitle"
            [popoverPlacement]="control.popoverPlacement"
            [popoverOnHover]="control.popoverOnHover"
            [popoverAlways]="control.popoverAlways"
            [popoverDisabled]="control.popoverDisabled"
            [popoverAnimation]="control.popoverAnimation"
            [popoverDismissTimeout]="control.popoverDismissTimeout"
            [button]="!!option.icon"
            [icon]="option.icon"
            [color]="option.color"
            [theme]="!!option.icon && !option.label ? 'icon' : 'secondary'"
            [attr.data-automation-id]="control.key + '-' + (option?.label || option?.value)"
          ></novo-radio>
        </novo-radio-group>
      </div>
    </ng-template>

    <!--Time-->
    <ng-template novoTemplate="time" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div
        [formGroup]="form"
        class="novo-control-input-container"
        [tooltip]="control?.tooltip"
        [tooltipPosition]="control?.tooltipPosition"
        [tooltipSize]="control?.tooltipSize"
        [tooltipPreline]="control?.tooltipPreline"
        [removeTooltipArrow]="control?.removeTooltipArrow"
        [tooltipAutoPosition]="control?.tooltipAutoPosition"
        [novoPopover]="control.popoverContent"
        [popoverHtmlContent]="control.popoverHtmlContent"
        [popoverTitle]="control.popoverTitle"
        [popoverPlacement]="control.popoverPlacement"
        [popoverOnHover]="control.popoverOnHover"
        [popoverAlways]="control.popoverAlways"
        [popoverDisabled]="control.popoverDisabled"
        [popoverAnimation]="control.popoverAnimation"
        [popoverDismissTimeout]="control.popoverDismissTimeout"
      >
        <novo-time-picker-input
          [attr.id]="control.key"
          [name]="control.key"
          [formControlName]="control.key"
          [placeholder]="control.placeholder"
          [military]="control.military"
        ></novo-time-picker-input>
      </div>
    </ng-template>

    <!--Native Input--->
    <ng-template novoTemplate="native-input" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div
        [formGroup]="form"
        class="novo-control-input-container novo-control-input-with-label"
        [tooltip]="control?.tooltip"
        [tooltipPosition]="control?.tooltipPosition"
        [tooltipSize]="control?.tooltipSize"
        [tooltipPreline]="control?.tooltipPreline"
        [removeTooltipArrow]="control?.removeTooltipArrow"
        [tooltipAutoPosition]="control?.tooltipAutoPosition"
        [novoPopover]="control.popoverContent"
        [popoverHtmlContent]="control.popoverHtmlContent"
        [popoverTitle]="control.popoverTitle"
        [popoverPlacement]="control.popoverPlacement"
        [popoverOnHover]="control.popoverOnHover"
        [popoverAlways]="control.popoverAlways"
        [popoverDisabled]="control.popoverDisabled"
        [popoverAnimation]="control.popoverAnimation"
        [popoverDismissTimeout]="control.popoverDismissTimeout"
      >
        <input
          [formControlName]="control.key"
          [id]="control.key"
          [type]="control.type"
          [placeholder]="control?.placeholder"
          (input)="methods.emitChange($event)"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
        />
      </div>
    </ng-template>

    <!--Date-->
    <ng-template novoTemplate="date" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div
        [formGroup]="form"
        class="novo-control-input-container"
        [tooltip]="control.tooltip"
        [tooltipPosition]="control.tooltipPosition"
        [tooltipSize]="control?.tooltipSize"
        [tooltipPreline]="control?.tooltipPreline"
        [removeTooltipArrow]="control?.removeTooltipArrow"
        [tooltipAutoPosition]="control?.tooltipAutoPosition"
        [novoPopover]="control.popoverContent"
        [popoverHtmlContent]="control.popoverHtmlContent"
        [popoverTitle]="control.popoverTitle"
        [popoverPlacement]="control.popoverPlacement"
        [popoverOnHover]="control.popoverOnHover"
        [popoverAlways]="control.popoverAlways"
        [popoverDisabled]="control.popoverDisabled"
        [popoverAnimation]="control.popoverAnimation"
        [popoverDismissTimeout]="control.popoverDismissTimeout"
      >
        <novo-date-picker-input
          [attr.id]="control.key"
          [name]="control.key"
          [formControlName]="control.key"
          [start]="control.startDate"
          [end]="control.endDate"
          [format]="control.dateFormat"
          [allowInvalidDate]="control.allowInvalidDate"
          [textMaskEnabled]="control.textMaskEnabled"
          [placeholder]="control.placeholder"
          [weekStart]="control.weekStart"
          [disabledDateMessage]="control.disabledDateMessage"
          (focusEvent)="methods.handleFocus($event)"
          (blurEvent)="methods.handleBlur($event)"
          (changeEvent)="methods.emitChange($event)"
        ></novo-date-picker-input>
      </div>
    </ng-template>

    <!--Date and Time-->
    <ng-template novoTemplate="date-time" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div
        [formGroup]="form"
        class="novo-control-input-container"
        [tooltip]="control.tooltip"
        [tooltipPosition]="control.tooltipPosition"
        [tooltipSize]="control?.tooltipSize"
        [tooltipPreline]="control?.tooltipPreline"
        [removeTooltipArrow]="control?.removeTooltipArrow"
        [tooltipAutoPosition]="control?.tooltipAutoPosition"
        [novoPopover]="control.popoverContent"
        [popoverHtmlContent]="control.popoverHtmlContent"
        [popoverTitle]="control.popoverTitle"
        [popoverPlacement]="control.popoverPlacement"
        [popoverOnHover]="control.popoverOnHover"
        [popoverAlways]="control.popoverAlways"
        [popoverDisabled]="control.popoverDisabled"
        [popoverAnimation]="control.popoverAnimation"
        [popoverDismissTimeout]="control.popoverDismissTimeout"
      >
        <novo-date-time-picker-input
          [attr.id]="control.key"
          [name]="control.key"
          [formControlName]="control.key"
          [start]="control.startDate"
          [end]="control.endDate"
          [placeholder]="control.placeholder"
          [military]="control.military"
          [weekStart]="control.weekStart"
          (focusEvent)="methods.handleFocus($event)"
          (blurEvent)="methods.handleBlur($event)"
          (changeEvent)="methods.emitChange($event)"
        ></novo-date-time-picker-input>
      </div>
    </ng-template>

    <!--Address-->
    <ng-template novoTemplate="address" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-address
          [formControlName]="control.key"
          [config]="control?.config"
          [readOnly]="control?.readOnly"
          (change)="methods.handleAddressChange($event)"
          (focus)="methods.handleFocus($event.event, $event.field)"
          (blur)="methods.handleBlur($event.event, $event.field)"
          (validityChange)="methods.updateValidity()"
        ></novo-address>
      </div>
    </ng-template>

    <!--Checkbox-->
    <ng-template novoTemplate="checkbox" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-checkbox
          [formControlName]="control?.key"
          [name]="control?.key"
          [label]="control?.checkboxLabel"
          [tooltip]="control?.tooltip"
          [tooltipPosition]="control?.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [novoPopover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
          [layoutOptions]="control?.layoutOptions"
        ></novo-checkbox>
      </div>
    </ng-template>

    <!--Switch-->
    <ng-template novoTemplate="switch" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-switch
          [formControlName]="control?.key"
          [tooltip]="control?.tooltip"
          [tooltipPosition]="control?.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [novoPopover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
        ></novo-switch>
      </div>
    </ng-template>

    <!--Checklist-->
    <ng-template novoTemplate="checklist" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-check-list
          [formControlName]="control.key"
          [name]="control.key"
          [options]="control?.options"
          [tooltip]="control?.tooltip"
          [tooltipPosition]="control?.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [novoPopover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
          (onSelect)="methods.modelChange($event)"
        ></novo-check-list>
      </div>
    </ng-template>

    <!--QuickNote-->
    <ng-template novoTemplate="quick-note" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-quick-note
          [formControlName]="control.key"
          [startupFocus]="control?.startupFocus"
          [placeholder]="control?.placeholder"
          [config]="control?.config"
          (change)="methods.modelChange($event)"
          [tooltip]="control?.tooltip"
          [tooltipPosition]="control?.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [novoPopover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
        ></novo-quick-note>
      </div>
    </ng-template>
  `, isInline: true, components: [{ type: i2$2.NovoCKEditorElement, selector: "novo-editor", inputs: ["config", "debounce", "name", "minimal", "startupFocus", "fileBrowserImageUploadUrl", "disabled", "value"], outputs: ["change", "ready", "blur", "focus", "paste", "loaded"] }, { type: i3$2.NovoAceEditor, selector: "novo-ace-editor", inputs: ["theme", "options", "mode", "name"], outputs: ["blur", "focus"] }, { type: NovoFileInputElement, selector: "novo-file-input", inputs: ["id", "tabindex", "errorStateMatcher", "multiple", "layoutOptions", "value", "dataFeatureId", "name", "disabled", "required", "placeholder"], outputs: ["edit", "save", "delete", "upload"] }, { type: i5$2.NovoTilesElement, selector: "novo-tiles", inputs: ["name", "options", "required", "controlDisabled"], outputs: ["onChange", "onSelectedOptionClick", "onDisabledOptionClick"] }, { type: i2$1.NovoPickerElement, selector: "novo-picker", inputs: ["config", "placeholder", "clearValueOnSelect", "closeOnSelect", "selected", "appendToBody", "parentScrollSelector", "parentScrollAction", "containerClass", "side", "autoSelectFirstOption", "overrideElement", "maxlength", "disablePickerInput"], outputs: ["changed", "select", "focus", "blur", "typing"] }, { type: i7.NovoChipsElement, selector: "chips,novo-chips", inputs: ["closeOnSelect", "placeholder", "source", "maxlength", "type", "disablePickerInput", "value"], outputs: ["changed", "focus", "blur", "typing"] }, { type: i7.NovoRowChipsElement, selector: "novo-row-chips", inputs: ["closeOnSelect"] }, { type: i8$1.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "options", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayWith", "compareWith", "value", "multiple"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { type: i9.NovoRadioGroup, selector: "novo-radio-group", inputs: ["id", "tabindex", "errorStateMatcher", "appearance", "value", "name", "disabled", "required", "placeholder"], outputs: ["change", "blur"] }, { type: i9.NovoRadioElement, selector: "novo-radio", inputs: ["id", "name", "tabindex", "vertical", "label", "button", "theme", "size", "icon", "color", "disabled", "checked", "value"], outputs: ["change", "blur", "focus"] }, { type: i10.NovoTimePickerInputElement, selector: "novo-time-picker-input", inputs: ["name", "placeholder", "military", "maskOptions", "disabled", "analog"], outputs: ["blurEvent", "focusEvent"] }, { type: i11.NovoDatePickerInputElement, selector: "novo-date-picker-input", inputs: ["name", "start", "end", "placeholder", "maskOptions", "format", "textMaskEnabled", "allowInvalidDate", "disabled", "disabledDateMessage", "weekStart"], outputs: ["blurEvent", "focusEvent", "changeEvent"] }, { type: i12.NovoDateTimePickerInputElement, selector: "novo-date-time-picker-input", inputs: ["name", "start", "end", "placeholder", "maskOptions", "military", "disabled", "format", "weekStart", "disabledDateMessage"], outputs: ["blurEvent", "focusEvent", "changeEvent"] }, { type: NovoAddressElement, selector: "novo-address", inputs: ["config", "readOnly"], outputs: ["change", "focus", "blur", "validityChange"] }, { type: i14.NovoCheckboxElement, selector: "novo-checkbox", inputs: ["aria-label", "aria-labelledby", "aria-describedby", "id", "name", "label", "disabled", "layoutOptions", "color", "value", "tabIndex", "required", "checked", "indeterminate"], outputs: ["change", "indeterminateChange", "onSelect"] }, { type: i15.NovoSwitchElement, selector: "novo-switch", inputs: ["theme", "icons", "disabled"], outputs: ["onChange"] }, { type: i14.NovoCheckListElement, selector: "novo-check-list", inputs: ["name", "options", "disabled"], outputs: ["onSelect"] }, { type: i16.QuickNoteElement, selector: "novo-quick-note", inputs: ["config", "startupFocus", "placeholder"], outputs: ["focus", "blur", "change"] }], directives: [{ type: i5$1.NovoTemplate, selector: "[novoTemplate]", inputs: ["type", "novoTemplate"] }, { type: i4$2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i4$2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i4$1.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipActive", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML"] }, { type: i20.PopOverDirective, selector: "[popover], [novoPopover]", inputs: ["popover", "novoPopover", "popoverHtmlContent", "popoverDisabled", "popoverAlways", "popoverAnimation", "popoverPlacement", "popoverTitle", "popoverOnHover", "popoverDismissTimeout"], outputs: ["onShown", "onHidden"] }, { type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4$2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i22.MaskedInputDirective, selector: "[textMask]", inputs: ["textMask"], exportAs: ["textMask"] }, { type: i4$2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4$2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i4$2.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { type: NovoAutoSize, selector: "textarea[autosize]" }, { type: i4$2.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { type: i4$2.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { type: i4$2.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i5$1.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoControlTemplates, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-control-templates',
                    template: `
    <!---Readonly--->
    <ng-template novoTemplate="read-only" let-form="form" let-control>
      <div>{{ form.getRawValue()[control.key] }}</div>
    </ng-template>
    <!--Textbox--->
    <ng-template novoTemplate="textbox" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div
        [formGroup]="form"
        class="novo-control-input-container novo-control-input-with-label"
        [tooltip]="control?.tooltip"
        [tooltipPosition]="control?.tooltipPosition"
        [tooltipSize]="control?.tooltipSize"
        [tooltipPreline]="control?.tooltipPreline"
        [removeTooltipArrow]="control?.removeTooltipArrow"
        [tooltipAutoPosition]="control?.tooltipAutoPosition"
        [novoPopover]="control.popoverContent"
        [popoverHtmlContent]="control.popoverHtmlContent"
        [popoverTitle]="control.popoverTitle"
        [popoverPlacement]="control.popoverPlacement"
        [popoverOnHover]="control.popoverOnHover"
        [popoverAlways]="control.popoverAlways"
        [popoverDisabled]="control.popoverDisabled"
        [popoverAnimation]="control.popoverAnimation"
        [popoverDismissTimeout]="control.popoverDismissTimeout"
      >
        <input
          *ngIf="control?.type !== 'number' && control?.textMaskEnabled"
          [textMask]="control.maskOptions"
          [formControlName]="control.key"
          [id]="control.key"
          [type]="control?.type"
          [placeholder]="control?.placeholder"
          (input)="methods.emitChange($event)"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          autocomplete
        />
        <input
          *ngIf="control?.type !== 'number' && !control?.textMaskEnabled"
          [class.maxlength-error]="errors?.maxlength"
          [formControlName]="control.key"
          [id]="control.key"
          [type]="control?.type"
          [placeholder]="control?.placeholder"
          (input)="methods.emitChange($event)"
          [maxlength]="control?.maxlength"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          autocomplete
        />
        <input
          *ngIf="control?.type === 'number' && control?.subType !== 'percentage'"
          [class.maxlength-error]="errors?.maxlength"
          [formControlName]="control.key"
          [id]="control.key"
          [type]="control?.type"
          [placeholder]="control?.placeholder"
          (keydown)="methods.restrictKeys($event)"
          (input)="methods.emitChange($event)"
          [maxlength]="control?.maxlength"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          step="any"
          (mousewheel)="numberInput.blur()"
          #numberInput
        />
        <!-- the percentage input does not use formControlName like a normal reactive input because instead of
          setting the floating point value directly, it is multiplied by 100 into a percentage value -->
        <input
          *ngIf="control?.type === 'number' && control?.subType === 'percentage'"
          [id]="control.key"
          [type]="control?.type"
          [placeholder]="control?.placeholder"
          (keydown)="methods.restrictKeys($event)"
          [value]="control?.percentValue"
          [disabled]="control?.readOnly"
          (input)="methods.handlePercentChange($event)"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          step="any"
          (mousewheel)="percentInput.blur()"
          #percentInput
        />
        <label class="input-label" *ngIf="control?.subType === 'currency'">{{ control.currencyFormat }}</label>
        <label class="input-label" *ngIf="control?.subType === 'percentage'">%</label>
      </div>
    </ng-template>

    <!--Textarea--->
    <ng-template novoTemplate="text-area" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div
        class="textarea-container"
        [formGroup]="form"
        [tooltip]="control?.tooltip"
        [tooltipPosition]="control?.tooltipPosition"
        [tooltipSize]="control?.tooltipSize"
        [tooltipPreline]="control?.tooltipPreline"
        [removeTooltipArrow]="control?.removeTooltipArrow"
        [tooltipAutoPosition]="control?.tooltipAutoPosition"
        [novoPopover]="control.popoverContent"
        [popoverHtmlContent]="control.popoverHtmlContent"
        [popoverTitle]="control.popoverTitle"
        [popoverPlacement]="control.popoverPlacement"
        [popoverOnHover]="control.popoverOnHover"
        [popoverAlways]="control.popoverAlways"
        [popoverDisabled]="control.popoverDisabled"
        [popoverAnimation]="control.popoverAnimation"
        [popoverDismissTimeout]="control.popoverDismissTimeout"
      >
        <textarea
          [class.maxlength-error]="errors?.maxlength"
          [name]="control.key"
          [attr.id]="control.key"
          [placeholder]="control.placeholder"
          [formControlName]="control.key"
          autosize
          (input)="methods.handleTextAreaInput($event)"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          [maxlength]="control?.maxlength"
        ></textarea>
      </div>
    </ng-template>

    <!--Editor-->
    <ng-template novoTemplate="editor" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-editor
          [name]="control.key"
          [formControlName]="control.key"
          [startupFocus]="control.startupFocus"
          [minimal]="control.minimal"
          [fileBrowserImageUploadUrl]="control.fileBrowserImageUploadUrl"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          [config]="control.config"
        ></novo-editor>
      </div>
    </ng-template>

    <!--AceEditor-->
    <ng-template novoTemplate="ace-editor" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-ace-editor
          [name]="control.key"
          [formControlName]="control.key"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
        ></novo-ace-editor>
      </div>
    </ng-template>

    <!--HTML5 Select-->
    <ng-template novoTemplate="native-select" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <select
          [id]="control.key"
          [formControlName]="control.key"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [novoPopover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
        >
          <option *ngIf="control.placeholder" value="" disabled selected hidden>{{ control.placeholder }}</option>
          <option *ngFor="let opt of control.options" [value]="opt.key">{{ opt.value }}</option>
        </select>
      </div>
    </ng-template>

    <!--File-->
    <ng-template novoTemplate="file" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-file-input
          [formControlName]="control.key"
          [id]="control.key"
          [name]="control.key"
          [placeholder]="control.placeholder"
          [value]="control.value"
          [multiple]="control.multiple"
          [layoutOptions]="control.layoutOptions"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [novoPopover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
          (edit)="methods.handleEdit($event)"
          (save)="methods.handleSave($event)"
          (delete)="methods.handleDelete($event)"
          (upload)="methods.handleUpload($event)"
        ></novo-file-input>
      </div>
    </ng-template>

    <!--Tiles-->
    <ng-template novoTemplate="tiles" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-tiles
          [options]="control.options"
          [formControlName]="control.key"
          (onChange)="methods.modelChange($event)"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [novoPopover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
          [controlDisabled]="control.disabled"
        ></novo-tiles>
      </div>
    </ng-template>

    <!--Picker-->
    <ng-template novoTemplate="picker" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form" class="novo-control-input-container">
        <novo-picker
          [config]="control.config"
          [formControlName]="control.key"
          [placeholder]="control.placeholder"
          [parentScrollSelector]="control.parentScrollSelector"
          *ngIf="!control.multiple"
          (select)="methods.modelChange($event)"
          (changed)="methods.modelChangeWithRaw($event)"
          (typing)="methods.handleTyping($event)"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [novoPopover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
        ></novo-picker>
        <novo-chips
          [source]="control.config"
          [type]="control.config.type"
          [formControlName]="control.key"
          [placeholder]="control.placeholder"
          [maxlength]="control?.maxlength"
          *ngIf="control.multiple && !control.config.columns"
          [closeOnSelect]="control.closeOnSelect"
          (changed)="methods.modelChangeWithRaw($event)"
          (typing)="methods.handleTyping($event)"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [novoPopover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
        ></novo-chips>
        <novo-row-chips
          [source]="control.config"
          [type]="control.config.type"
          [formControlName]="control.key"
          [placeholder]="control.placeholder"
          [maxlength]="control?.maxlength"
          *ngIf="control.multiple && control.config.columns"
          [closeOnSelect]="control.closeOnSelect"
          (changed)="methods.modelChangeWithRaw($event)"
          (typing)="methods.handleTyping($event)"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [novoPopover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
        ></novo-row-chips>
      </div>
    </ng-template>

    <!--Novo Select-->
    <ng-template novoTemplate="select" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-select
          [options]="control.options"
          [headerConfig]="control.headerConfig"
          [placeholder]="control.placeholder"
          [formControlName]="control.key"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [novoPopover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
          (onSelect)="methods.modelChange($event)"
        ></novo-select>
      </div>
    </ng-template>

    <!--Timezone -->
    <ng-template novoTemplate="timezone" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-select
          [options]="control.options"
          [headerConfig]="control.headerConfig"
          [placeholder]="control.placeholder"
          [formControlName]="control.key"
          [tooltip]="control.tooltip"
          [tooltipPosition]="control.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [novoPopover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
          position="bottom"
          (onSelect)="methods.modelChange($event)"
        ></novo-select>
      </div>
    </ng-template>

    <!--Radio-->
    <ng-template novoTemplate="radio" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form" class="novo-control-input-container">
        <novo-radio-group [name]="control.key" [formControlName]="control.key" [disabled]="control.disabled">
          <novo-radio
            *ngFor="let option of control.options"
            [value]="option.value"
            [label]="option.label"
            [checked]="
              option.value === form.getRawValue()[control.key] ||
              (form.getRawValue()[control.key] && option.value === form.getRawValue()[control.key].id)
            "
            [tooltip]="control.tooltip"
            [tooltipPosition]="control.tooltipPosition"
            [tooltipSize]="control?.tooltipSize"
            [tooltipPreline]="control?.tooltipPreline"
            [removeTooltipArrow]="control?.removeTooltipArrow"
            [tooltipAutoPosition]="control?.tooltipAutoPosition"
            [novoPopover]="control.popoverContent"
            [popoverHtmlContent]="control.popoverHtmlContent"
            [popoverTitle]="control.popoverTitle"
            [popoverPlacement]="control.popoverPlacement"
            [popoverOnHover]="control.popoverOnHover"
            [popoverAlways]="control.popoverAlways"
            [popoverDisabled]="control.popoverDisabled"
            [popoverAnimation]="control.popoverAnimation"
            [popoverDismissTimeout]="control.popoverDismissTimeout"
            [button]="!!option.icon"
            [icon]="option.icon"
            [color]="option.color"
            [theme]="!!option.icon && !option.label ? 'icon' : 'secondary'"
            [attr.data-automation-id]="control.key + '-' + (option?.label || option?.value)"
          ></novo-radio>
        </novo-radio-group>
      </div>
    </ng-template>

    <!--Time-->
    <ng-template novoTemplate="time" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div
        [formGroup]="form"
        class="novo-control-input-container"
        [tooltip]="control?.tooltip"
        [tooltipPosition]="control?.tooltipPosition"
        [tooltipSize]="control?.tooltipSize"
        [tooltipPreline]="control?.tooltipPreline"
        [removeTooltipArrow]="control?.removeTooltipArrow"
        [tooltipAutoPosition]="control?.tooltipAutoPosition"
        [novoPopover]="control.popoverContent"
        [popoverHtmlContent]="control.popoverHtmlContent"
        [popoverTitle]="control.popoverTitle"
        [popoverPlacement]="control.popoverPlacement"
        [popoverOnHover]="control.popoverOnHover"
        [popoverAlways]="control.popoverAlways"
        [popoverDisabled]="control.popoverDisabled"
        [popoverAnimation]="control.popoverAnimation"
        [popoverDismissTimeout]="control.popoverDismissTimeout"
      >
        <novo-time-picker-input
          [attr.id]="control.key"
          [name]="control.key"
          [formControlName]="control.key"
          [placeholder]="control.placeholder"
          [military]="control.military"
        ></novo-time-picker-input>
      </div>
    </ng-template>

    <!--Native Input--->
    <ng-template novoTemplate="native-input" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div
        [formGroup]="form"
        class="novo-control-input-container novo-control-input-with-label"
        [tooltip]="control?.tooltip"
        [tooltipPosition]="control?.tooltipPosition"
        [tooltipSize]="control?.tooltipSize"
        [tooltipPreline]="control?.tooltipPreline"
        [removeTooltipArrow]="control?.removeTooltipArrow"
        [tooltipAutoPosition]="control?.tooltipAutoPosition"
        [novoPopover]="control.popoverContent"
        [popoverHtmlContent]="control.popoverHtmlContent"
        [popoverTitle]="control.popoverTitle"
        [popoverPlacement]="control.popoverPlacement"
        [popoverOnHover]="control.popoverOnHover"
        [popoverAlways]="control.popoverAlways"
        [popoverDisabled]="control.popoverDisabled"
        [popoverAnimation]="control.popoverAnimation"
        [popoverDismissTimeout]="control.popoverDismissTimeout"
      >
        <input
          [formControlName]="control.key"
          [id]="control.key"
          [type]="control.type"
          [placeholder]="control?.placeholder"
          (input)="methods.emitChange($event)"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
        />
      </div>
    </ng-template>

    <!--Date-->
    <ng-template novoTemplate="date" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div
        [formGroup]="form"
        class="novo-control-input-container"
        [tooltip]="control.tooltip"
        [tooltipPosition]="control.tooltipPosition"
        [tooltipSize]="control?.tooltipSize"
        [tooltipPreline]="control?.tooltipPreline"
        [removeTooltipArrow]="control?.removeTooltipArrow"
        [tooltipAutoPosition]="control?.tooltipAutoPosition"
        [novoPopover]="control.popoverContent"
        [popoverHtmlContent]="control.popoverHtmlContent"
        [popoverTitle]="control.popoverTitle"
        [popoverPlacement]="control.popoverPlacement"
        [popoverOnHover]="control.popoverOnHover"
        [popoverAlways]="control.popoverAlways"
        [popoverDisabled]="control.popoverDisabled"
        [popoverAnimation]="control.popoverAnimation"
        [popoverDismissTimeout]="control.popoverDismissTimeout"
      >
        <novo-date-picker-input
          [attr.id]="control.key"
          [name]="control.key"
          [formControlName]="control.key"
          [start]="control.startDate"
          [end]="control.endDate"
          [format]="control.dateFormat"
          [allowInvalidDate]="control.allowInvalidDate"
          [textMaskEnabled]="control.textMaskEnabled"
          [placeholder]="control.placeholder"
          [weekStart]="control.weekStart"
          [disabledDateMessage]="control.disabledDateMessage"
          (focusEvent)="methods.handleFocus($event)"
          (blurEvent)="methods.handleBlur($event)"
          (changeEvent)="methods.emitChange($event)"
        ></novo-date-picker-input>
      </div>
    </ng-template>

    <!--Date and Time-->
    <ng-template novoTemplate="date-time" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div
        [formGroup]="form"
        class="novo-control-input-container"
        [tooltip]="control.tooltip"
        [tooltipPosition]="control.tooltipPosition"
        [tooltipSize]="control?.tooltipSize"
        [tooltipPreline]="control?.tooltipPreline"
        [removeTooltipArrow]="control?.removeTooltipArrow"
        [tooltipAutoPosition]="control?.tooltipAutoPosition"
        [novoPopover]="control.popoverContent"
        [popoverHtmlContent]="control.popoverHtmlContent"
        [popoverTitle]="control.popoverTitle"
        [popoverPlacement]="control.popoverPlacement"
        [popoverOnHover]="control.popoverOnHover"
        [popoverAlways]="control.popoverAlways"
        [popoverDisabled]="control.popoverDisabled"
        [popoverAnimation]="control.popoverAnimation"
        [popoverDismissTimeout]="control.popoverDismissTimeout"
      >
        <novo-date-time-picker-input
          [attr.id]="control.key"
          [name]="control.key"
          [formControlName]="control.key"
          [start]="control.startDate"
          [end]="control.endDate"
          [placeholder]="control.placeholder"
          [military]="control.military"
          [weekStart]="control.weekStart"
          (focusEvent)="methods.handleFocus($event)"
          (blurEvent)="methods.handleBlur($event)"
          (changeEvent)="methods.emitChange($event)"
        ></novo-date-time-picker-input>
      </div>
    </ng-template>

    <!--Address-->
    <ng-template novoTemplate="address" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-address
          [formControlName]="control.key"
          [config]="control?.config"
          [readOnly]="control?.readOnly"
          (change)="methods.handleAddressChange($event)"
          (focus)="methods.handleFocus($event.event, $event.field)"
          (blur)="methods.handleBlur($event.event, $event.field)"
          (validityChange)="methods.updateValidity()"
        ></novo-address>
      </div>
    </ng-template>

    <!--Checkbox-->
    <ng-template novoTemplate="checkbox" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-checkbox
          [formControlName]="control?.key"
          [name]="control?.key"
          [label]="control?.checkboxLabel"
          [tooltip]="control?.tooltip"
          [tooltipPosition]="control?.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [novoPopover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
          [layoutOptions]="control?.layoutOptions"
        ></novo-checkbox>
      </div>
    </ng-template>

    <!--Switch-->
    <ng-template novoTemplate="switch" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-switch
          [formControlName]="control?.key"
          [tooltip]="control?.tooltip"
          [tooltipPosition]="control?.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [novoPopover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
        ></novo-switch>
      </div>
    </ng-template>

    <!--Checklist-->
    <ng-template novoTemplate="checklist" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-check-list
          [formControlName]="control.key"
          [name]="control.key"
          [options]="control?.options"
          [tooltip]="control?.tooltip"
          [tooltipPosition]="control?.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [novoPopover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
          (onSelect)="methods.modelChange($event)"
        ></novo-check-list>
      </div>
    </ng-template>

    <!--QuickNote-->
    <ng-template novoTemplate="quick-note" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-quick-note
          [formControlName]="control.key"
          [startupFocus]="control?.startupFocus"
          [placeholder]="control?.placeholder"
          [config]="control?.config"
          (change)="methods.modelChange($event)"
          [tooltip]="control?.tooltip"
          [tooltipPosition]="control?.tooltipPosition"
          [tooltipSize]="control?.tooltipSize"
          [tooltipPreline]="control?.tooltipPreline"
          [removeTooltipArrow]="control?.removeTooltipArrow"
          [tooltipAutoPosition]="control?.tooltipAutoPosition"
          [novoPopover]="control.popoverContent"
          [popoverHtmlContent]="control.popoverHtmlContent"
          [popoverTitle]="control.popoverTitle"
          [popoverPlacement]="control.popoverPlacement"
          [popoverOnHover]="control.popoverOnHover"
          [popoverAlways]="control.popoverAlways"
          [popoverDisabled]="control.popoverDisabled"
          [popoverAnimation]="control.popoverAnimation"
          [popoverDismissTimeout]="control.popoverDismissTimeout"
        ></novo-quick-note>
      </div>
    </ng-template>
  `,
                }]
        }], ctorParameters: function () { return [{ type: i1.NovoTemplateService }]; }, propDecorators: { defaultTemplates: [{
                type: ViewChildren,
                args: [NovoTemplate]
            }] } });

// NG
class NovoFieldsetHeaderElement {
    constructor() {
        this.icon = 'section';
    }
}
NovoFieldsetHeaderElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFieldsetHeaderElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoFieldsetHeaderElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoFieldsetHeaderElement, selector: "novo-fieldset-header", inputs: { title: "title", icon: "icon" }, host: { classAttribute: "novo-fieldset-header" }, ngImport: i0, template: `
    <novo-title smaller>
      <novo-icon>{{ icon?.replace('bhi-', '') }}</novo-icon
      >{{ title }}
    </novo-title>
  `, isInline: true, components: [{ type: i5$1.NovoTitle, selector: "novo-title,[novo-title]" }, { type: i2$3.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFieldsetHeaderElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-fieldset-header',
                    template: `
    <novo-title smaller>
      <novo-icon>{{ icon?.replace('bhi-', '') }}</novo-icon
      >{{ title }}
    </novo-title>
  `,
                    host: {
                        class: 'novo-fieldset-header',
                    },
                }]
        }], propDecorators: { title: [{
                type: Input
            }], icon: [{
                type: Input
            }] } });
class NovoFieldsetElement {
    constructor() {
        this.controls = [];
        this.isEmbedded = false;
        this.isInlineEmbedded = false;
        this.hidden = false;
    }
}
NovoFieldsetElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFieldsetElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoFieldsetElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoFieldsetElement, selector: "novo-fieldset", inputs: { controls: "controls", form: "form", title: "title", icon: "icon", index: "index", autoFocus: "autoFocus", isEmbedded: "isEmbedded", isInlineEmbedded: "isInlineEmbedded", hidden: "hidden" }, ngImport: i0, template: `
    <div class="novo-fieldset-container">
      <novo-fieldset-header
        [icon]="icon"
        [title]="title"
        *ngIf="title"
        [class.embedded]="isEmbedded"
        [class.inline-embedded]="isInlineEmbedded"
        [class.hidden]="hidden"
      ></novo-fieldset-header>
      <ng-container *ngFor="let control of controls; let controlIndex = index">
        <div class="novo-form-row" [class.disabled]="control.disabled" *ngIf="control.__type !== 'GroupedControl'">
          <novo-control [autoFocus]="autoFocus && index === 0 && controlIndex === 0" [control]="control" [form]="form"></novo-control>
        </div>
        <div *ngIf="control.__type === 'GroupedControl'">TODO - GroupedControl</div>
      </ng-container>
    </div>
  `, isInline: true, components: [{ type: NovoFieldsetHeaderElement, selector: "novo-fieldset-header", inputs: ["title", "icon"] }, { type: NovoControlElement, selector: "novo-control", inputs: ["control", "form", "condensed", "autoFocus"], outputs: ["change", "edit", "save", "delete", "upload", "blur", "focus"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFieldsetElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-fieldset',
                    template: `
    <div class="novo-fieldset-container">
      <novo-fieldset-header
        [icon]="icon"
        [title]="title"
        *ngIf="title"
        [class.embedded]="isEmbedded"
        [class.inline-embedded]="isInlineEmbedded"
        [class.hidden]="hidden"
      ></novo-fieldset-header>
      <ng-container *ngFor="let control of controls; let controlIndex = index">
        <div class="novo-form-row" [class.disabled]="control.disabled" *ngIf="control.__type !== 'GroupedControl'">
          <novo-control [autoFocus]="autoFocus && index === 0 && controlIndex === 0" [control]="control" [form]="form"></novo-control>
        </div>
        <div *ngIf="control.__type === 'GroupedControl'">TODO - GroupedControl</div>
      </ng-container>
    </div>
  `,
                }]
        }], propDecorators: { controls: [{
                type: Input
            }], form: [{
                type: Input
            }], title: [{
                type: Input
            }], icon: [{
                type: Input
            }], index: [{
                type: Input
            }], autoFocus: [{
                type: Input
            }], isEmbedded: [{
                type: Input
            }], isInlineEmbedded: [{
                type: Input
            }], hidden: [{
                type: Input
            }] } });
class NovoDynamicFormElement {
    constructor(element, templates) {
        this.element = element;
        this.templates = templates;
        this.controls = [];
        this.fieldsets = [];
        this.hideNonRequiredFields = true;
        this.autoFocusFirstField = false;
        this.allFieldsRequired = false;
        this.allFieldsNotRequired = false;
        this.showingAllFields = false;
        this.showingRequiredFields = true;
        this.numControls = 0;
    }
    ngOnInit() {
        this.ngOnChanges();
    }
    ngOnChanges(changes) {
        this.form.layout = this.layout;
        if (!(this.fieldsets && this.fieldsets.length) && this.controls && this.controls.length) {
            this.fieldsets = [
                {
                    controls: this.controls,
                },
            ];
            this.numControls = this.controls.length;
        }
        else if (this.fieldsets) {
            this.fieldsets.forEach((fieldset) => {
                this.numControls = this.numControls + fieldset.controls.length;
            });
        }
        const requiredFields = [];
        const nonRequiredFields = [];
        this.fieldsets.forEach((fieldset) => {
            fieldset.controls.forEach((control) => {
                if (control.required) {
                    requiredFields.push(control);
                }
                else {
                    nonRequiredFields.push(control);
                }
            });
        });
        this.allFieldsRequired = requiredFields.length === this.numControls;
        this.allFieldsNotRequired = nonRequiredFields.length === this.numControls;
        if (this.allFieldsNotRequired && this.hideNonRequiredFields) {
            this.fieldsets.forEach((fieldset) => {
                fieldset.controls.forEach((control) => {
                    this.form.controls[control.key].hidden = false;
                });
            });
        }
        this.form.fieldsets = [...this.fieldsets];
    }
    ngAfterContentInit() {
        if (this.customTemplates && this.customTemplates.length) {
            this.customTemplates.forEach((template) => {
                this.templates.addCustom(template.name, template.template);
            });
        }
    }
    showAllFields() {
        this.form.fieldsets.forEach((fieldset) => {
            fieldset.controls.forEach((control) => {
                const ctl = this.form.controls[control.key];
                if (!this.fieldsAlreadyHidden.includes(control.key)) {
                    ctl.hidden = false;
                }
            });
        });
        this.showingAllFields = true;
        this.showingRequiredFields = false;
    }
    showOnlyRequired(hideRequiredWithValue) {
        this.fieldsAlreadyHidden = [];
        this.form.fieldsets.forEach((fieldset) => {
            fieldset.controls.forEach((control) => {
                const ctl = this.form.controls[control.key];
                if (ctl.hidden) {
                    this.fieldsAlreadyHidden.push(control.key);
                }
                // Hide any non-required fields
                if (!control.required) {
                    ctl.hidden = true;
                }
                // Hide required fields that have been successfully filled out
                if (hideRequiredWithValue &&
                    !Helpers.isBlank(this.form.getRawValue()[control.key]) &&
                    (!control.isEmpty || (control.isEmpty && control.isEmpty(ctl)))) {
                    ctl.hidden = true;
                }
                // Don't hide fields with errors
                if (ctl.errors) {
                    ctl.hidden = false;
                }
            });
        });
        this.showingAllFields = false;
        this.showingRequiredFields = true;
        this.forceValidation();
    }
    get values() {
        return this.form ? this.form.getRawValue() : null;
    }
    get isValid() {
        return this.form ? this.form.valid : false;
    }
    updatedValues() {
        let ret = null;
        this.form.fieldsets.forEach((fieldset) => {
            fieldset.controls.forEach((control) => {
                if (this.form.controls[control.key].dirty || control.dirty) {
                    if (!ret) {
                        ret = {};
                    }
                    ret[control.key] = this.form.getRawValue()[control.key];
                }
            });
        });
        return ret;
    }
    forceValidation() {
        Object.keys(this.form.controls).forEach((key) => {
            const control = this.form.controls[key];
            if (control.required && Helpers.isBlank(this.form.getRawValue()[control.key])) {
                control.markAsDirty();
                control.markAsTouched();
            }
        });
    }
}
NovoDynamicFormElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDynamicFormElement, deps: [{ token: i0.ElementRef }, { token: i1.NovoTemplateService }], target: i0.ɵɵFactoryTarget.Component });
NovoDynamicFormElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDynamicFormElement, selector: "novo-dynamic-form", inputs: { controls: "controls", fieldsets: "fieldsets", form: "form", layout: "layout", hideNonRequiredFields: "hideNonRequiredFields", autoFocusFirstField: "autoFocusFirstField" }, providers: [NovoTemplateService], queries: [{ propertyName: "customTemplates", predicate: NovoTemplate }], usesOnChanges: true, ngImport: i0, template: `
    <novo-control-templates></novo-control-templates>
    <div class="novo-form-container">
      <header>
        <ng-content select="form-title"></ng-content>
        <ng-content select="form-subtitle"></ng-content>
      </header>
      <form class="novo-form" [formGroup]="form">
        <ng-container *ngFor="let fieldset of form.fieldsets; let i = index">
          <novo-fieldset
            *ngIf="fieldset.controls.length"
            [index]="i"
            [autoFocus]="autoFocusFirstField"
            [icon]="fieldset.icon"
            [controls]="fieldset.controls"
            [title]="fieldset.title"
            [form]="form"
            [isEmbedded]="fieldset.isEmbedded"
            [isInlineEmbedded]="fieldset.isInlineEmbedded"
            [hidden]="fieldset.hidden"
          ></novo-fieldset>
        </ng-container>
      </form>
    </div>
  `, isInline: true, components: [{ type: NovoControlTemplates, selector: "novo-control-templates" }, { type: NovoFieldsetElement, selector: "novo-fieldset", inputs: ["controls", "form", "title", "icon", "index", "autoFocus", "isEmbedded", "isInlineEmbedded", "hidden"] }], directives: [{ type: i4$2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i4$2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i4$2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDynamicFormElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-dynamic-form',
                    template: `
    <novo-control-templates></novo-control-templates>
    <div class="novo-form-container">
      <header>
        <ng-content select="form-title"></ng-content>
        <ng-content select="form-subtitle"></ng-content>
      </header>
      <form class="novo-form" [formGroup]="form">
        <ng-container *ngFor="let fieldset of form.fieldsets; let i = index">
          <novo-fieldset
            *ngIf="fieldset.controls.length"
            [index]="i"
            [autoFocus]="autoFocusFirstField"
            [icon]="fieldset.icon"
            [controls]="fieldset.controls"
            [title]="fieldset.title"
            [form]="form"
            [isEmbedded]="fieldset.isEmbedded"
            [isInlineEmbedded]="fieldset.isInlineEmbedded"
            [hidden]="fieldset.hidden"
          ></novo-fieldset>
        </ng-container>
      </form>
    </div>
  `,
                    providers: [NovoTemplateService],
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NovoTemplateService }]; }, propDecorators: { controls: [{
                type: Input
            }], fieldsets: [{
                type: Input
            }], form: [{
                type: Input
            }], layout: [{
                type: Input
            }], hideNonRequiredFields: [{
                type: Input
            }], autoFocusFirstField: [{
                type: Input
            }], customTemplates: [{
                type: ContentChildren,
                args: [NovoTemplate]
            }] } });

// NG2
class NovoFormExtrasModule {
}
NovoFormExtrasModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFormExtrasModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoFormExtrasModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFormExtrasModule, declarations: [NovoAddressElement, NovoFileInputElement], imports: [CommonModule,
        FormsModule,
        NovoPipesModule,
        NovoButtonModule,
        NovoSelectModule,
        NovoPickerModule,
        NovoLoadingModule,
        NovoDragulaModule,
        NovoTooltipModule,
        NovoCheckboxModule], exports: [NovoAddressElement, NovoFileInputElement] });
NovoFormExtrasModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFormExtrasModule, providers: [NovoDragulaService], imports: [[
            CommonModule,
            FormsModule,
            NovoPipesModule,
            NovoButtonModule,
            NovoSelectModule,
            NovoPickerModule,
            NovoLoadingModule,
            NovoDragulaModule,
            NovoTooltipModule,
            NovoCheckboxModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFormExtrasModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        NovoPipesModule,
                        NovoButtonModule,
                        NovoSelectModule,
                        NovoPickerModule,
                        NovoLoadingModule,
                        NovoDragulaModule,
                        NovoTooltipModule,
                        NovoCheckboxModule,
                    ],
                    declarations: [NovoAddressElement, NovoFileInputElement],
                    exports: [NovoAddressElement, NovoFileInputElement],
                    providers: [NovoDragulaService],
                }]
        }] });

// NG
class NovoFormElement {
    constructor(templates) {
        this.templates = templates;
        this.hideHeader = false;
        this.showingAllFields = false;
        this.showingRequiredFields = true;
    }
    get value() {
        return this.form.getRawValue();
    }
    get isValid() {
        return this.form.valid;
    }
    ngOnInit() {
        this.form.layout = this.layout;
    }
    ngAfterContentInit() {
        if (this.customTemplates && this.customTemplates.length) {
            this.customTemplates.forEach((template) => {
                this.templates.addCustom(template.name, template.template);
            });
        }
    }
    showAllFields() {
        Object.keys(this.form.controls).forEach((key) => {
            this.form.controls[key].hidden = false;
        });
        this.showingAllFields = true;
        this.showingRequiredFields = false;
    }
    showOnlyRequired(hideRequiredWithValue) {
        Object.keys(this.form.controls).forEach((key) => {
            // Hide any non-required fields
            if (!this.form.controls[key].required) {
                this.form.controls[key].hidden = true;
            }
            // Hide required fields that have been successfully filled out
            if (hideRequiredWithValue && !Helpers.isBlank(this.form.getRawValue()[key])) {
                this.form.controls[key].hidden = true;
            }
            // Don't hide fields with errors
            if (this.form.controls[key].errors) {
                this.form.controls[key].hidden = false;
            }
        });
        this.showingAllFields = false;
        this.showingRequiredFields = true;
        this.forceValidation();
    }
    forceValidation() {
        Object.keys(this.form.controls).forEach((key) => {
            const control = this.form.controls[key];
            if (control.required && Helpers.isBlank(this.form.getRawValue()[control.key])) {
                control.markAsDirty();
                control.markAsTouched();
            }
        });
    }
}
NovoFormElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFormElement, deps: [{ token: i1.NovoTemplateService }], target: i0.ɵɵFactoryTarget.Component });
NovoFormElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoFormElement, selector: "novo-form", inputs: { form: "form", layout: "layout", hideHeader: "hideHeader" }, providers: [NovoTemplateService], queries: [{ propertyName: "customTemplates", predicate: NovoTemplate }], ngImport: i0, template: `
    <novo-control-templates></novo-control-templates>
    <div class="novo-form-container">
      <header *ngIf="!hideHeader">
        <ng-content select="form-title"></ng-content>
        <ng-content select="form-subtitle"></ng-content>
      </header>
      <form class="novo-form" [formGroup]="form">
        <ng-content></ng-content>
      </form>
    </div>
  `, isInline: true, components: [{ type: NovoControlTemplates, selector: "novo-control-templates" }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4$2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i4$2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i4$2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFormElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-form',
                    template: `
    <novo-control-templates></novo-control-templates>
    <div class="novo-form-container">
      <header *ngIf="!hideHeader">
        <ng-content select="form-title"></ng-content>
        <ng-content select="form-subtitle"></ng-content>
      </header>
      <form class="novo-form" [formGroup]="form">
        <ng-content></ng-content>
      </form>
    </div>
  `,
                    providers: [NovoTemplateService],
                }]
        }], ctorParameters: function () { return [{ type: i1.NovoTemplateService }]; }, propDecorators: { form: [{
                type: Input
            }], layout: [{
                type: Input
            }], hideHeader: [{
                type: Input
            }], customTemplates: [{
                type: ContentChildren,
                args: [NovoTemplate]
            }] } });

// NG2
class NovoFormModule {
}
NovoFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFormModule, declarations: [NovoAutoSize,
        NovoControlElement,
        NovoDynamicFormElement,
        NovoFormElement,
        NovoFieldsetElement,
        NovoFieldsetHeaderElement,
        ControlConfirmModal,
        ControlPromptModal,
        NovoControlGroup,
        NovoControlTemplates], imports: [CommonModule,
        OverlayModule,
        ReactiveFormsModule,
        NovoRadioModule,
        NovoTilesModule,
        NovoSelectModule,
        NovoPickerModule,
        NovoChipsModule,
        NovoDatePickerModule,
        NovoTimePickerModule,
        NovoDateTimePickerModule,
        NovoNovoCKEditorModule,
        NovoFormExtrasModule,
        NovoQuickNoteModule,
        NovoDateTimePickerModule,
        NovoHeaderModule,
        NovoTooltipModule,
        NovoPopOverModule,
        NovoDragulaModule,
        IMaskDirectiveModule,
        TextMaskModule,
        NovoTipWellModule,
        NovoModalModule,
        NovoButtonModule,
        NovoAceEditorModule,
        NovoCommonModule,
        NovoCheckboxModule,
        NovoIconModule,
        NovoRadioModule,
        NovoSwitchModule], exports: [NovoAutoSize,
        NovoDynamicFormElement,
        NovoControlElement,
        NovoFormElement,
        NovoFieldsetHeaderElement,
        NovoControlGroup,
        NovoControlTemplates] });
NovoFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFormModule, providers: [NovoTemplateService], imports: [[
            CommonModule,
            OverlayModule,
            ReactiveFormsModule,
            NovoRadioModule,
            NovoTilesModule,
            NovoSelectModule,
            NovoPickerModule,
            NovoChipsModule,
            NovoDatePickerModule,
            NovoTimePickerModule,
            NovoDateTimePickerModule,
            NovoNovoCKEditorModule,
            NovoFormExtrasModule,
            NovoQuickNoteModule,
            NovoDateTimePickerModule,
            NovoHeaderModule,
            NovoTooltipModule,
            NovoPopOverModule,
            NovoDragulaModule,
            IMaskDirectiveModule,
            TextMaskModule,
            NovoTipWellModule,
            NovoModalModule,
            NovoButtonModule,
            NovoAceEditorModule,
            NovoCommonModule,
            NovoCheckboxModule,
            NovoIconModule,
            NovoRadioModule,
            NovoSwitchModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFormModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        OverlayModule,
                        ReactiveFormsModule,
                        NovoRadioModule,
                        NovoTilesModule,
                        NovoSelectModule,
                        NovoPickerModule,
                        NovoChipsModule,
                        NovoDatePickerModule,
                        NovoTimePickerModule,
                        NovoDateTimePickerModule,
                        NovoNovoCKEditorModule,
                        NovoFormExtrasModule,
                        NovoQuickNoteModule,
                        NovoDateTimePickerModule,
                        NovoHeaderModule,
                        NovoTooltipModule,
                        NovoPopOverModule,
                        NovoDragulaModule,
                        IMaskDirectiveModule,
                        TextMaskModule,
                        NovoTipWellModule,
                        NovoModalModule,
                        NovoButtonModule,
                        NovoAceEditorModule,
                        NovoCommonModule,
                        NovoCheckboxModule,
                        NovoIconModule,
                        NovoRadioModule,
                        NovoSwitchModule,
                    ],
                    declarations: [
                        NovoAutoSize,
                        NovoControlElement,
                        NovoDynamicFormElement,
                        NovoFormElement,
                        NovoFieldsetElement,
                        NovoFieldsetHeaderElement,
                        ControlConfirmModal,
                        ControlPromptModal,
                        NovoControlGroup,
                        NovoControlTemplates,
                    ],
                    exports: [
                        NovoAutoSize,
                        NovoDynamicFormElement,
                        NovoControlElement,
                        NovoFormElement,
                        NovoFieldsetHeaderElement,
                        NovoControlGroup,
                        NovoControlTemplates,
                    ],
                    providers: [NovoTemplateService],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { AceEditorControl, AddressControl, BaseControl, CheckListControl, CheckboxControl, ControlConfirmModal, ControlFactory, ControlPromptModal, CustomControl, DateControl, DateTimeControl, EditState, EditorControl, FieldInteractionApi, FileControl, FormUtils, FormValidators, GroupedControl, NativeSelectControl, NovoAddressElement, NovoAutoSize, NovoControlElement, NovoControlGroup, NovoControlTemplates, NovoDynamicFormElement, NovoFieldsetElement, NovoFieldsetHeaderElement, NovoFile, NovoFileInputElement, NovoFormControl, NovoFormElement, NovoFormExtrasModule, NovoFormGroup, NovoFormModule, PickerControl, QuickNoteControl, RadioControl, ReadOnlyControl, SelectControl, SwitchControl, TablePickerControl, TextAreaControl, TextBoxControl, TilesControl, TimeControl, TimezoneControl };
//# sourceMappingURL=novo-elements-elements-form.mjs.map
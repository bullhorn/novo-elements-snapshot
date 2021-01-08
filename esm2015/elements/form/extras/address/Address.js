// NG2
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// APP
import { NovoLabelService } from '../../../../services/novo-label-service';
import { COUNTRIES, findByCountryId, getStates } from '../../../../utils/countries/Countries';
import { Helpers } from '../../../../utils/Helpers';
import * as i0 from "@angular/core";
import * as i1 from "../../../../services/novo-label-service";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "../../../tooltip/Tooltip.directive";
import * as i5 from "../../../picker/Picker";
const _c0 = function (a0, a1) { return { "bhi-circle": a0, "bhi-check": a1 }; };
function NovoAddressElement_span_0_i_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 9);
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(1, _c0, !ctx_r6.valid.address1, ctx_r6.valid.address1));
} }
function NovoAddressElement_span_0_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 6);
    i0.ɵɵtemplate(1, NovoAddressElement_span_0_i_1_Template, 1, 4, "i", 7);
    i0.ɵɵelementStart(2, "input", 8);
    i0.ɵɵlistener("ngModelChange", function NovoAddressElement_span_0_Template_input_ngModelChange_2_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r7 = i0.ɵɵnextContext(); return ctx_r7.model.address1 = $event; })("ngModelChange", function NovoAddressElement_span_0_Template_input_ngModelChange_2_listener() { i0.ɵɵrestoreView(_r8); const ctx_r9 = i0.ɵɵnextContext(); return ctx_r9.updateControl(); })("focus", function NovoAddressElement_span_0_Template_input_focus_2_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r10 = i0.ɵɵnextContext(); return ctx_r10.isFocused($event, "address1"); })("blur", function NovoAddressElement_span_0_Template_input_blur_2_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r11 = i0.ɵɵnextContext(); return ctx_r11.isBlurred($event, "address1"); })("input", function NovoAddressElement_span_0_Template_input_input_2_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r12 = i0.ɵɵnextContext(); return ctx_r12.onInput($event, "address1"); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("invalid", ctx_r0.invalid.address1)("focus", ctx_r0.focused.address1)("disabled", ctx_r0.disabled.address1);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.config.address1.required);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("maxlength-error", ctx_r0.invalidMaxlength.address1);
    i0.ɵɵproperty("placeholder", ctx_r0.config.address1.label)("maxlength", ctx_r0.config == null ? null : ctx_r0.config.address1 == null ? null : ctx_r0.config.address1.maxlength)("ngModel", ctx_r0.model.address1);
} }
function NovoAddressElement_span_1_i_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 13);
} if (rf & 2) {
    const ctx_r13 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(1, _c0, !ctx_r13.valid.address2, ctx_r13.valid.address2));
} }
function NovoAddressElement_span_1_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 10);
    i0.ɵɵtemplate(1, NovoAddressElement_span_1_i_1_Template, 1, 4, "i", 11);
    i0.ɵɵelementStart(2, "input", 12);
    i0.ɵɵlistener("ngModelChange", function NovoAddressElement_span_1_Template_input_ngModelChange_2_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r14 = i0.ɵɵnextContext(); return ctx_r14.model.address2 = $event; })("ngModelChange", function NovoAddressElement_span_1_Template_input_ngModelChange_2_listener() { i0.ɵɵrestoreView(_r15); const ctx_r16 = i0.ɵɵnextContext(); return ctx_r16.updateControl(); })("focus", function NovoAddressElement_span_1_Template_input_focus_2_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r17 = i0.ɵɵnextContext(); return ctx_r17.isFocused($event, "address2"); })("blur", function NovoAddressElement_span_1_Template_input_blur_2_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r18 = i0.ɵɵnextContext(); return ctx_r18.isBlurred($event, "address2"); })("input", function NovoAddressElement_span_1_Template_input_input_2_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r19 = i0.ɵɵnextContext(); return ctx_r19.onInput($event, "address2"); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("invalid", ctx_r1.invalid.address2)("focus", ctx_r1.focused.address2)("disabled", ctx_r1.disabled.address2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.config.address2.required);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("maxlength-error", ctx_r1.invalidMaxlength.address2);
    i0.ɵɵproperty("placeholder", ctx_r1.config.address2.label)("maxlength", ctx_r1.config == null ? null : ctx_r1.config.address2 == null ? null : ctx_r1.config.address2.maxlength)("ngModel", ctx_r1.model.address2);
} }
function NovoAddressElement_span_2_i_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 17);
} if (rf & 2) {
    const ctx_r20 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(1, _c0, !ctx_r20.valid.city, ctx_r20.valid.city));
} }
function NovoAddressElement_span_2_Template(rf, ctx) { if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 14);
    i0.ɵɵtemplate(1, NovoAddressElement_span_2_i_1_Template, 1, 4, "i", 15);
    i0.ɵɵelementStart(2, "input", 16);
    i0.ɵɵlistener("ngModelChange", function NovoAddressElement_span_2_Template_input_ngModelChange_2_listener($event) { i0.ɵɵrestoreView(_r22); const ctx_r21 = i0.ɵɵnextContext(); return ctx_r21.model.city = $event; })("ngModelChange", function NovoAddressElement_span_2_Template_input_ngModelChange_2_listener() { i0.ɵɵrestoreView(_r22); const ctx_r23 = i0.ɵɵnextContext(); return ctx_r23.updateControl(); })("focus", function NovoAddressElement_span_2_Template_input_focus_2_listener($event) { i0.ɵɵrestoreView(_r22); const ctx_r24 = i0.ɵɵnextContext(); return ctx_r24.isFocused($event, "city"); })("blur", function NovoAddressElement_span_2_Template_input_blur_2_listener($event) { i0.ɵɵrestoreView(_r22); const ctx_r25 = i0.ɵɵnextContext(); return ctx_r25.isBlurred($event, "city"); })("input", function NovoAddressElement_span_2_Template_input_input_2_listener($event) { i0.ɵɵrestoreView(_r22); const ctx_r26 = i0.ɵɵnextContext(); return ctx_r26.onInput($event, "city"); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("invalid", ctx_r2.invalid.city)("focus", ctx_r2.focused.city)("disabled", ctx_r2.disabled.city);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.config.city.required);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("maxlength-error", ctx_r2.invalidMaxlength.city);
    i0.ɵɵproperty("placeholder", ctx_r2.config.city.label)("maxlength", ctx_r2.config == null ? null : ctx_r2.config.city == null ? null : ctx_r2.config.city.maxlength)("ngModel", ctx_r2.model.city);
} }
function NovoAddressElement_span_3_i_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 17);
} if (rf & 2) {
    const ctx_r27 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(1, _c0, !ctx_r27.valid.state, ctx_r27.valid.state));
} }
function NovoAddressElement_span_3_Template(rf, ctx) { if (rf & 1) {
    const _r29 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 18);
    i0.ɵɵtemplate(1, NovoAddressElement_span_3_i_1_Template, 1, 4, "i", 15);
    i0.ɵɵelementStart(2, "novo-picker", 19);
    i0.ɵɵlistener("changed", function NovoAddressElement_span_3_Template_novo_picker_changed_2_listener($event) { i0.ɵɵrestoreView(_r29); const ctx_r28 = i0.ɵɵnextContext(); return ctx_r28.onStateChange($event); })("ngModelChange", function NovoAddressElement_span_3_Template_novo_picker_ngModelChange_2_listener($event) { i0.ɵɵrestoreView(_r29); const ctx_r30 = i0.ɵɵnextContext(); return ctx_r30.model.state = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("invalid", ctx_r3.invalid.state)("focus", ctx_r3.focused.state)("disabled", ctx_r3.disabled.state);
    i0.ɵɵproperty("tooltip", ctx_r3.tooltip.state);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r3.config.state.required);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("config", ctx_r3.config == null ? null : ctx_r3.config.state == null ? null : ctx_r3.config.state.pickerConfig)("placeholder", ctx_r3.config == null ? null : ctx_r3.config.state == null ? null : ctx_r3.config.state.label)("ngModel", ctx_r3.model.state)("disablePickerInput", ctx_r3.disabled.state);
} }
function NovoAddressElement_span_4_i_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 17);
} if (rf & 2) {
    const ctx_r31 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(1, _c0, !ctx_r31.valid.zip, ctx_r31.valid.zip));
} }
function NovoAddressElement_span_4_Template(rf, ctx) { if (rf & 1) {
    const _r33 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 20);
    i0.ɵɵtemplate(1, NovoAddressElement_span_4_i_1_Template, 1, 4, "i", 15);
    i0.ɵɵelementStart(2, "input", 21);
    i0.ɵɵlistener("ngModelChange", function NovoAddressElement_span_4_Template_input_ngModelChange_2_listener($event) { i0.ɵɵrestoreView(_r33); const ctx_r32 = i0.ɵɵnextContext(); return ctx_r32.model.zip = $event; })("ngModelChange", function NovoAddressElement_span_4_Template_input_ngModelChange_2_listener() { i0.ɵɵrestoreView(_r33); const ctx_r34 = i0.ɵɵnextContext(); return ctx_r34.updateControl(); })("focus", function NovoAddressElement_span_4_Template_input_focus_2_listener($event) { i0.ɵɵrestoreView(_r33); const ctx_r35 = i0.ɵɵnextContext(); return ctx_r35.isFocused($event, "zip"); })("blur", function NovoAddressElement_span_4_Template_input_blur_2_listener($event) { i0.ɵɵrestoreView(_r33); const ctx_r36 = i0.ɵɵnextContext(); return ctx_r36.isBlurred($event, "zip"); })("input", function NovoAddressElement_span_4_Template_input_input_2_listener($event) { i0.ɵɵrestoreView(_r33); const ctx_r37 = i0.ɵɵnextContext(); return ctx_r37.onInput($event, "zip"); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("invalid", ctx_r4.invalid.zip)("focus", ctx_r4.focused.zip)("disabled", ctx_r4.disabled.zip);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r4.config.zip.required);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("maxlength-error", ctx_r4.invalidMaxlength.zip);
    i0.ɵɵproperty("placeholder", ctx_r4.config.zip.label)("maxlength", ctx_r4.config == null ? null : ctx_r4.config.zip == null ? null : ctx_r4.config.zip.maxlength)("ngModel", ctx_r4.model.zip);
} }
function NovoAddressElement_span_5_i_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 17);
} if (rf & 2) {
    const ctx_r38 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(1, _c0, !ctx_r38.valid.countryID, ctx_r38.valid.countryID));
} }
function NovoAddressElement_span_5_Template(rf, ctx) { if (rf & 1) {
    const _r40 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 22);
    i0.ɵɵtemplate(1, NovoAddressElement_span_5_i_1_Template, 1, 4, "i", 15);
    i0.ɵɵelementStart(2, "novo-picker", 23);
    i0.ɵɵlistener("changed", function NovoAddressElement_span_5_Template_novo_picker_changed_2_listener($event) { i0.ɵɵrestoreView(_r40); const ctx_r39 = i0.ɵɵnextContext(); return ctx_r39.onCountryChange($event); })("ngModelChange", function NovoAddressElement_span_5_Template_novo_picker_ngModelChange_2_listener($event) { i0.ɵɵrestoreView(_r40); const ctx_r41 = i0.ɵɵnextContext(); return ctx_r41.model.countryID = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("invalid", ctx_r5.invalid.countryID)("focus", ctx_r5.focused.countryID)("disabled", ctx_r5.disabled.countryID);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r5.config.countryID.required);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("config", ctx_r5.config == null ? null : ctx_r5.config.countryID == null ? null : ctx_r5.config.countryID.pickerConfig)("placeholder", ctx_r5.config.countryID.label)("ngModel", ctx_r5.model.countryID)("disablePickerInput", ctx_r5.disabled.countryID);
} }
// Value accessor for the component (supports ngModel)
const ADDRESS_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoAddressElement),
    multi: true,
};
export class NovoAddressElement {
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
        if (this.model) {
            this.writeValue(this.model);
            this.updateControl();
        }
        else if (!this.model) {
            this.model = {};
        }
        this.initConfig();
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
            this.config[field].required &&
            Helpers.isEmpty(this.model[field]) &&
            !Helpers.isBlank(this.model[field])) ||
            (field === 'countryID' && this.config[field].required && Helpers.isBlank(this.model.countryName) && this.config[field].updated) ||
            (field === 'state' &&
                this.config[field].required &&
                (Helpers.isBlank(this.model.state) || Helpers.isEmpty(this.model.state)) &&
                !Helpers.isBlank(this.model.countryID) &&
                this.config[field].updated &&
                this.config.state.pickerConfig &&
                this.config.state.pickerConfig.defaultOptions &&
                this.config.state.pickerConfig.defaultOptions.length > 0)) {
            invalid = true;
        }
        else if (!Helpers.isEmpty(this.model[field]) &&
            !Helpers.isBlank(this.config[field].maxlength) &&
            this.config[field].maxlength < this.model[field].length) {
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
NovoAddressElement.ɵfac = function NovoAddressElement_Factory(t) { return new (t || NovoAddressElement)(i0.ɵɵdirectiveInject(i1.NovoLabelService)); };
NovoAddressElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoAddressElement, selectors: [["novo-address"]], inputs: { config: "config", readOnly: "readOnly" }, outputs: { change: "change", focus: "focus", blur: "blur", validityChange: "validityChange" }, features: [i0.ɵɵProvidersFeature([ADDRESS_VALUE_ACCESSOR])], decls: 6, vars: 6, consts: [["class", "street-address", 3, "invalid", "focus", "disabled", 4, "ngIf"], ["class", "apt suite", 3, "invalid", "focus", "disabled", 4, "ngIf"], ["class", "city locality", 3, "invalid", "focus", "disabled", 4, "ngIf"], ["class", "state region", 3, "invalid", "focus", "disabled", "tooltip", 4, "ngIf"], ["class", "zip postal-code", 3, "invalid", "focus", "disabled", 4, "ngIf"], ["class", "country-name", 3, "invalid", "focus", "disabled", 4, "ngIf"], [1, "street-address"], ["class", "required-indicator address1", 3, "ngClass", 4, "ngIf"], ["type", "text", "id", "address1", "name", "address1", "autocomplete", "shipping street-address address-line-1", 3, "placeholder", "maxlength", "ngModel", "ngModelChange", "focus", "blur", "input"], [1, "required-indicator", "address1", 3, "ngClass"], [1, "apt", "suite"], ["class", "required-indicator address2", 3, "ngClass", 4, "ngIf"], ["type", "text", "id", "address2", "name", "address2", "autocomplete", "shipping address-line-2", 3, "placeholder", "maxlength", "ngModel", "ngModelChange", "focus", "blur", "input"], [1, "required-indicator", "address2", 3, "ngClass"], [1, "city", "locality"], ["class", "required-indicator", 3, "ngClass", 4, "ngIf"], ["type", "text", "id", "city", "name", "city", "autocomplete", "shipping city locality", 3, "placeholder", "maxlength", "ngModel", "ngModelChange", "focus", "blur", "input"], [1, "required-indicator", 3, "ngClass"], [1, "state", "region", 3, "tooltip"], ["autocomplete", "shipping region", 3, "config", "placeholder", "ngModel", "disablePickerInput", "changed", "ngModelChange"], [1, "zip", "postal-code"], ["type", "text", "id", "zip", "name", "zip", "autocomplete", "shipping postal-code", 3, "placeholder", "maxlength", "ngModel", "ngModelChange", "focus", "blur", "input"], [1, "country-name"], ["autocomplete", "shipping country", 3, "config", "placeholder", "ngModel", "disablePickerInput", "changed", "ngModelChange"]], template: function NovoAddressElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, NovoAddressElement_span_0_Template, 3, 12, "span", 0);
        i0.ɵɵtemplate(1, NovoAddressElement_span_1_Template, 3, 12, "span", 1);
        i0.ɵɵtemplate(2, NovoAddressElement_span_2_Template, 3, 12, "span", 2);
        i0.ɵɵtemplate(3, NovoAddressElement_span_3_Template, 3, 12, "span", 3);
        i0.ɵɵtemplate(4, NovoAddressElement_span_4_Template, 3, 12, "span", 4);
        i0.ɵɵtemplate(5, NovoAddressElement_span_5_Template, 3, 11, "span", 5);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", !(ctx.config == null ? null : ctx.config.address1 == null ? null : ctx.config.address1.hidden));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !(ctx.config == null ? null : ctx.config.address2 == null ? null : ctx.config.address2.hidden));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !(ctx.config == null ? null : ctx.config.city == null ? null : ctx.config.city.hidden));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !(ctx.config == null ? null : ctx.config.state == null ? null : ctx.config.state.hidden));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !(ctx.config == null ? null : ctx.config.zip == null ? null : ctx.config.zip.hidden));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !(ctx.config == null ? null : ctx.config.countryID == null ? null : ctx.config.countryID.hidden));
    } }, directives: [i2.NgIf, i3.DefaultValueAccessor, i3.MaxLengthValidator, i3.NgControlStatus, i3.NgModel, i2.NgClass, i4.TooltipDirective, i5.NovoPickerElement], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoAddressElement, [{
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
    }], function () { return [{ type: i1.NovoLabelService }]; }, { config: [{
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
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS90cmF2aXMvYnVpbGQvYnVsbGhvcm4vbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2Zvcm0vZXh0cmFzL2FkZHJlc3MvQWRkcmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0YsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE1BQU07QUFDTixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM5RixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7Ozs7Ozs7OztJQXlDOUMsdUJBS0k7OztJQUZGLG1HQUEwRTs7OztJQVY5RSwrQkFPRTtJQUFBLHNFQUtBO0lBQ0EsZ0NBY0Y7SUFOSSx1TkFBNEIsNExBQUEsbUxBRUQsVUFBVSxLQUZULGlMQUdGLFVBQVUsS0FIUixpTEFJSCxVQUFVLEtBSlA7SUFSOUIsaUJBY0Y7SUFBQSxpQkFBTzs7O0lBeEJMLGtEQUFrQyxrQ0FBQSxzQ0FBQTtJQUtoQyxlQUFnQztJQUFoQyxzREFBZ0M7SUFNaEMsZUFBbUQ7SUFBbkQsbUVBQW1EO0lBSW5ELDBEQUFxQyxzSEFBQSxrQ0FBQTs7O0lBaUJ2Qyx3QkFLSTs7O0lBRkYscUdBQTBFOzs7O0lBVjlFLGdDQU9FO0lBQUEsdUVBS0E7SUFDQSxpQ0FjRjtJQU5JLDBOQUE0QiwrTEFBQSxvTEFFRCxVQUFVLEtBRlQsa0xBR0YsVUFBVSxLQUhSLGtMQUlILFVBQVUsS0FKUDtJQVI5QixpQkFjRjtJ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Q0FBQztZQUNMLENBQUM7U0FDRixDQUFDO0lBQ0osQ0FBQzs7b0ZBeldVLGtCQUFrQjt1REFBbEIsa0JBQWtCLHFOQWxKbEIsQ0FBQyxzQkFBc0IsQ0FBQztRQUVqQyxzRUFPRTtRQXFCRixzRUFPRTtRQXFCRixzRUFPRTtRQWdCRixzRUFRRTtRQVVGLHNFQU9FO1FBZ0JGLHNFQU9FOztRQTlIQSxxSEFBaUM7UUE0QmpDLGVBQWlDO1FBQWpDLHFIQUFpQztRQTRCakMsZUFBNkI7UUFBN0IsNkdBQTZCO1FBdUI3QixlQUE4QjtRQUE5QiwrR0FBOEI7UUFrQjlCLGVBQTRCO1FBQTVCLDJHQUE0QjtRQXVCNUIsZUFBa0M7UUFBbEMsdUhBQWtDOztrREF1QjNCLGtCQUFrQjtjQXBKOUIsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4QixTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztnQkFDbkMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQStJVDthQUNGO21FQUdDLE1BQU07a0JBREwsS0FBSztZQUlGLFFBQVE7a0JBRFgsS0FBSztZQTJCTixNQUFNO2tCQURMLE1BQU07WUFHUCxLQUFLO2tCQURKLE1BQU07WUFHUCxJQUFJO2tCQURILE1BQU07WUFHUCxjQUFjO2tCQURiLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbi8vIEFQUFxuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG5pbXBvcnQgeyBDT1VOVFJJRVMsIGZpbmRCeUNvdW50cnlJZCwgZ2V0U3RhdGVzIH0gZnJvbSAnLi4vLi4vLi4vLi4vdXRpbHMvY291bnRyaWVzL0NvdW50cmllcyc7XG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vLi4vLi4vdXRpbHMvSGVscGVycyc7XG5cbi8vIFZhbHVlIGFjY2Vzc29yIGZvciB0aGUgY29tcG9uZW50IChzdXBwb3J0cyBuZ01vZGVsKVxuY29uc3QgQUREUkVTU19WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdm9BZGRyZXNzRWxlbWVudCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuZXhwb3J0IGludGVyZmFjZSBOb3ZvQWRkcmVzc1N1YmZpZWxkQ29uZmlnIHtcbiAgbGFiZWw6IHN0cmluZztcbiAgcmVxdWlyZWQ6IGJvb2xlYW47XG4gIG1heGxlbmd0aDogbnVtYmVyO1xuICBwaWNrZXJDb25maWc/OiBhbnk7XG4gIGhpZGRlbjogYm9vbGVhbjtcbiAgdXBkYXRlZD86IGJvb2xlYW47XG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOb3ZvQWRkcmVzc0NvbmZpZyB7XG4gIHJlcXVpcmVkPzogYm9vbGVhbjtcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xuICBhZGRyZXNzMT86IE5vdm9BZGRyZXNzU3ViZmllbGRDb25maWc7XG4gIGFkZHJlc3MyPzogTm92b0FkZHJlc3NTdWJmaWVsZENvbmZpZztcbiAgY2l0eT86IE5vdm9BZGRyZXNzU3ViZmllbGRDb25maWc7XG4gIHN0YXRlPzogTm92b0FkZHJlc3NTdWJmaWVsZENvbmZpZztcbiAgemlwPzogTm92b0FkZHJlc3NTdWJmaWVsZENvbmZpZztcbiAgY291bnRyeUlEPzogTm92b0FkZHJlc3NTdWJmaWVsZENvbmZpZztcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1hZGRyZXNzJyxcbiAgcHJvdmlkZXJzOiBbQUREUkVTU19WQUxVRV9BQ0NFU1NPUl0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPHNwYW5cbiAgICAgICpuZ0lmPVwiIWNvbmZpZz8uYWRkcmVzczE/LmhpZGRlblwiXG4gICAgICBjbGFzcz1cInN0cmVldC1hZGRyZXNzXCJcbiAgICAgIFtjbGFzcy5pbnZhbGlkXT1cImludmFsaWQuYWRkcmVzczFcIlxuICAgICAgW2NsYXNzLmZvY3VzXT1cImZvY3VzZWQuYWRkcmVzczFcIlxuICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkLmFkZHJlc3MxXCJcbiAgICA+XG4gICAgICA8aVxuICAgICAgICAqbmdJZj1cImNvbmZpZy5hZGRyZXNzMS5yZXF1aXJlZFwiXG4gICAgICAgIGNsYXNzPVwicmVxdWlyZWQtaW5kaWNhdG9yIGFkZHJlc3MxXCJcbiAgICAgICAgW25nQ2xhc3NdPVwieyAnYmhpLWNpcmNsZSc6ICF2YWxpZC5hZGRyZXNzMSwgJ2JoaS1jaGVjayc6IHZhbGlkLmFkZHJlc3MxIH1cIlxuICAgICAgPlxuICAgICAgPC9pPlxuICAgICAgPGlucHV0XG4gICAgICAgIFtjbGFzcy5tYXhsZW5ndGgtZXJyb3JdPVwiaW52YWxpZE1heGxlbmd0aC5hZGRyZXNzMVwiXG4gICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgaWQ9XCJhZGRyZXNzMVwiXG4gICAgICAgIG5hbWU9XCJhZGRyZXNzMVwiXG4gICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb25maWcuYWRkcmVzczEubGFiZWxcIlxuICAgICAgICBbbWF4bGVuZ3RoXT1cImNvbmZpZz8uYWRkcmVzczE/Lm1heGxlbmd0aFwiXG4gICAgICAgIGF1dG9jb21wbGV0ZT1cInNoaXBwaW5nIHN0cmVldC1hZGRyZXNzIGFkZHJlc3MtbGluZS0xXCJcbiAgICAgICAgWyhuZ01vZGVsKV09XCJtb2RlbC5hZGRyZXNzMVwiXG4gICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cInVwZGF0ZUNvbnRyb2woKVwiXG4gICAgICAgIChmb2N1cyk9XCJpc0ZvY3VzZWQoJGV2ZW50LCAnYWRkcmVzczEnKVwiXG4gICAgICAgIChibHVyKT1cImlzQmx1cnJlZCgkZXZlbnQsICdhZGRyZXNzMScpXCJcbiAgICAgICAgKGlucHV0KT1cIm9uSW5wdXQoJGV2ZW50LCAnYWRkcmVzczEnKVwiXG4gICAgICAvPlxuICAgIDwvc3Bhbj5cbiAgICA8c3BhblxuICAgICAgKm5nSWY9XCIhY29uZmlnPy5hZGRyZXNzMj8uaGlkZGVuXCJcbiAgICAgIGNsYXNzPVwiYXB0IHN1aXRlXCJcbiAgICAgIFtjbGFzcy5pbnZhbGlkXT1cImludmFsaWQuYWRkcmVzczJcIlxuICAgICAgW2NsYXNzLmZvY3VzXT1cImZvY3VzZWQuYWRkcmVzczJcIlxuICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkLmFkZHJlc3MyXCJcbiAgICA+XG4gICAgICA8aVxuICAgICAgICAqbmdJZj1cImNvbmZpZy5hZGRyZXNzMi5yZXF1aXJlZFwiXG4gICAgICAgIGNsYXNzPVwicmVxdWlyZWQtaW5kaWNhdG9yIGFkZHJlc3MyXCJcbiAgICAgICAgW25nQ2xhc3NdPVwieyAnYmhpLWNpcmNsZSc6ICF2YWxpZC5hZGRyZXNzMiwgJ2JoaS1jaGVjayc6IHZhbGlkLmFkZHJlc3MyIH1cIlxuICAgICAgPlxuICAgICAgPC9pPlxuICAgICAgPGlucHV0XG4gICAgICAgIFtjbGFzcy5tYXhsZW5ndGgtZXJyb3JdPVwiaW52YWxpZE1heGxlbmd0aC5hZGRyZXNzMlwiXG4gICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgaWQ9XCJhZGRyZXNzMlwiXG4gICAgICAgIG5hbWU9XCJhZGRyZXNzMlwiXG4gICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb25maWcuYWRkcmVzczIubGFiZWxcIlxuICAgICAgICBbbWF4bGVuZ3RoXT1cImNvbmZpZz8uYWRkcmVzczI/Lm1heGxlbmd0aFwiXG4gICAgICAgIGF1dG9jb21wbGV0ZT1cInNoaXBwaW5nIGFkZHJlc3MtbGluZS0yXCJcbiAgICAgICAgWyhuZ01vZGVsKV09XCJtb2RlbC5hZGRyZXNzMlwiXG4gICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cInVwZGF0ZUNvbnRyb2woKVwiXG4gICAgICAgIChmb2N1cyk9XCJpc0ZvY3VzZWQoJGV2ZW50LCAnYWRkcmVzczInKVwiXG4gICAgICAgIChibHVyKT1cImlzQmx1cnJlZCgkZXZlbnQsICdhZGRyZXNzMicpXCJcbiAgICAgICAgKGlucHV0KT1cIm9uSW5wdXQoJGV2ZW50LCAnYWRkcmVzczInKVwiXG4gICAgICAvPlxuICAgIDwvc3Bhbj5cbiAgICA8c3BhblxuICAgICAgKm5nSWY9XCIhY29uZmlnPy5jaXR5Py5oaWRkZW5cIlxuICAgICAgY2xhc3M9XCJjaXR5IGxvY2FsaXR5XCJcbiAgICAgIFtjbGFzcy5pbnZhbGlkXT1cImludmFsaWQuY2l0eVwiXG4gICAgICBbY2xhc3MuZm9jdXNdPVwiZm9jdXNlZC5jaXR5XCJcbiAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZC5jaXR5XCJcbiAgICA+XG4gICAgICA8aSAqbmdJZj1cImNvbmZpZy5jaXR5LnJlcXVpcmVkXCIgY2xhc3M9XCJyZXF1aXJlZC1pbmRpY2F0b3JcIiBbbmdDbGFzc109XCJ7ICdiaGktY2lyY2xlJzogIXZhbGlkLmNpdHksICdiaGktY2hlY2snOiB2YWxpZC5jaXR5IH1cIj4gPC9pPlxuICAgICAgPGlucHV0XG4gICAgICAgIFtjbGFzcy5tYXhsZW5ndGgtZXJyb3JdPVwiaW52YWxpZE1heGxlbmd0aC5jaXR5XCJcbiAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICBpZD1cImNpdHlcIlxuICAgICAgICBuYW1lPVwiY2l0eVwiXG4gICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb25maWcuY2l0eS5sYWJlbFwiXG4gICAgICAgIGF1dG9jb21wbGV0ZT1cInNoaXBwaW5nIGNpdHkgbG9jYWxpdHlcIlxuICAgICAgICBbbWF4bGVuZ3RoXT1cImNvbmZpZz8uY2l0eT8ubWF4bGVuZ3RoXCJcbiAgICAgICAgWyhuZ01vZGVsKV09XCJtb2RlbC5jaXR5XCJcbiAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwidXBkYXRlQ29udHJvbCgpXCJcbiAgICAgICAgKGZvY3VzKT1cImlzRm9jdXNlZCgkZXZlbnQsICdjaXR5JylcIlxuICAgICAgICAoYmx1cik9XCJpc0JsdXJyZWQoJGV2ZW50LCAnY2l0eScpXCJcbiAgICAgICAgKGlucHV0KT1cIm9uSW5wdXQoJGV2ZW50LCAnY2l0eScpXCJcbiAgICAgIC8+XG4gICAgPC9zcGFuPlxuICAgIDxzcGFuXG4gICAgICAqbmdJZj1cIiFjb25maWc/LnN0YXRlPy5oaWRkZW5cIlxuICAgICAgY2xhc3M9XCJzdGF0ZSByZWdpb25cIlxuICAgICAgW2NsYXNzLmludmFsaWRdPVwiaW52YWxpZC5zdGF0ZVwiXG4gICAgICBbY2xhc3MuZm9jdXNdPVwiZm9jdXNlZC5zdGF0ZVwiXG4gICAgICBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWQuc3RhdGVcIlxuICAgICAgW3Rvb2x0aXBdPVwidG9vbHRpcC5zdGF0ZVwiXG4gICAgPlxuICAgICAgPGkgKm5nSWY9XCJjb25maWcuc3RhdGUucmVxdWlyZWRcIiBjbGFzcz1cInJlcXVpcmVkLWluZGljYXRvclwiIFtuZ0NsYXNzXT1cInsgJ2JoaS1jaXJjbGUnOiAhdmFsaWQuc3RhdGUsICdiaGktY2hlY2snOiB2YWxpZC5zdGF0ZSB9XCI+IDwvaT5cbiAgICAgIDxub3ZvLXBpY2tlclxuICAgICAgICBbY29uZmlnXT1cImNvbmZpZz8uc3RhdGU/LnBpY2tlckNvbmZpZ1wiXG4gICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb25maWc/LnN0YXRlPy5sYWJlbFwiXG4gICAgICAgIChjaGFuZ2VkKT1cIm9uU3RhdGVDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgIGF1dG9jb21wbGV0ZT1cInNoaXBwaW5nIHJlZ2lvblwiXG4gICAgICAgIFsobmdNb2RlbCldPVwibW9kZWwuc3RhdGVcIlxuICAgICAgICBbZGlzYWJsZVBpY2tlcklucHV0XT1cImRpc2FibGVkLnN0YXRlXCJcbiAgICAgID48L25vdm8tcGlja2VyPlxuICAgIDwvc3Bhbj5cbiAgICA8c3BhblxuICAgICAgKm5nSWY9XCIhY29uZmlnPy56aXA/LmhpZGRlblwiXG4gICAgICBjbGFzcz1cInppcCBwb3N0YWwtY29kZVwiXG4gICAgICBbY2xhc3MuaW52YWxpZF09XCJpbnZhbGlkLnppcFwiXG4gICAgICBbY2xhc3MuZm9jdXNdPVwiZm9jdXNlZC56aXBcIlxuICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkLnppcFwiXG4gICAgPlxuICAgICAgPGkgKm5nSWY9XCJjb25maWcuemlwLnJlcXVpcmVkXCIgY2xhc3M9XCJyZXF1aXJlZC1pbmRpY2F0b3JcIiBbbmdDbGFzc109XCJ7ICdiaGktY2lyY2xlJzogIXZhbGlkLnppcCwgJ2JoaS1jaGVjayc6IHZhbGlkLnppcCB9XCI+IDwvaT5cbiAgICAgIDxpbnB1dFxuICAgICAgICBbY2xhc3MubWF4bGVuZ3RoLWVycm9yXT1cImludmFsaWRNYXhsZW5ndGguemlwXCJcbiAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICBpZD1cInppcFwiXG4gICAgICAgIG5hbWU9XCJ6aXBcIlxuICAgICAgICBbcGxhY2Vob2xkZXJdPVwiY29uZmlnLnppcC5sYWJlbFwiXG4gICAgICAgIGF1dG9jb21wbGV0ZT1cInNoaXBwaW5nIHBvc3RhbC1jb2RlXCJcbiAgICAgICAgW21heGxlbmd0aF09XCJjb25maWc/LnppcD8ubWF4bGVuZ3RoXCJcbiAgICAgICAgWyhuZ01vZGVsKV09XCJtb2RlbC56aXBcIlxuICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJ1cGRhdGVDb250cm9sKClcIlxuICAgICAgICAoZm9jdXMpPVwiaXNGb2N1c2VkKCRldmVudCwgJ3ppcCcpXCJcbiAgICAgICAgKGJsdXIpPVwiaXNCbHVycmVkKCRldmVudCwgJ3ppcCcpXCJcbiAgICAgICAgKGlucHV0KT1cIm9uSW5wdXQoJGV2ZW50LCAnemlwJylcIlxuICAgICAgLz5cbiAgICA8L3NwYW4+XG4gICAgPHNwYW5cbiAgICAgICpuZ0lmPVwiIWNvbmZpZz8uY291bnRyeUlEPy5oaWRkZW5cIlxuICAgICAgY2xhc3M9XCJjb3VudHJ5LW5hbWVcIlxuICAgICAgW2NsYXNzLmludmFsaWRdPVwiaW52YWxpZC5jb3VudHJ5SURcIlxuICAgICAgW2NsYXNzLmZvY3VzXT1cImZvY3VzZWQuY291bnRyeUlEXCJcbiAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZC5jb3VudHJ5SURcIlxuICAgID5cbiAgICAgIDxpXG4gICAgICAgICpuZ0lmPVwiY29uZmlnLmNvdW50cnlJRC5yZXF1aXJlZFwiXG4gICAgICAgIGNsYXNzPVwicmVxdWlyZWQtaW5kaWNhdG9yXCJcbiAgICAgICAgW25nQ2xhc3NdPVwieyAnYmhpLWNpcmNsZSc6ICF2YWxpZC5jb3VudHJ5SUQsICdiaGktY2hlY2snOiB2YWxpZC5jb3VudHJ5SUQgfVwiXG4gICAgICA+XG4gICAgICA8L2k+XG4gICAgICA8bm92by1waWNrZXJcbiAgICAgICAgW2NvbmZpZ109XCJjb25maWc/LmNvdW50cnlJRD8ucGlja2VyQ29uZmlnXCJcbiAgICAgICAgW3BsYWNlaG9sZGVyXT1cImNvbmZpZy5jb3VudHJ5SUQubGFiZWxcIlxuICAgICAgICAoY2hhbmdlZCk9XCJvbkNvdW50cnlDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgIGF1dG9jb21wbGV0ZT1cInNoaXBwaW5nIGNvdW50cnlcIlxuICAgICAgICBbKG5nTW9kZWwpXT1cIm1vZGVsLmNvdW50cnlJRFwiXG4gICAgICAgIFtkaXNhYmxlUGlja2VySW5wdXRdPVwiZGlzYWJsZWQuY291bnRyeUlEXCJcbiAgICAgID48L25vdm8tcGlja2VyPlxuICAgIDwvc3Bhbj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0FkZHJlc3NFbGVtZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIGNvbmZpZzogTm92b0FkZHJlc3NDb25maWc7XG4gIHByaXZhdGUgX3JlYWRPbmx5ID0gZmFsc2U7XG4gIEBJbnB1dCgpXG4gIHNldCByZWFkT25seShyZWFkT25seTogYm9vbGVhbikge1xuICAgIHRoaXMuX3JlYWRPbmx5ID0gcmVhZE9ubHk7XG4gICAgdGhpcy5maWVsZExpc3QuZm9yRWFjaCgoZmllbGQ6IHN0cmluZykgPT4ge1xuICAgICAgdGhpcy5kaXNhYmxlZFtmaWVsZF0gPSB0aGlzLl9yZWFkT25seTtcbiAgICB9KTtcbiAgICBpZiAodGhpcy5tb2RlbCkge1xuICAgICAgdGhpcy51cGRhdGVTdGF0ZXMoKTtcbiAgICB9XG4gIH1cbiAgZ2V0IHJlYWRPbmx5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9yZWFkT25seTtcbiAgfVxuICBzdGF0ZXM6IEFycmF5PGFueT4gPSBbXTtcbiAgZmllbGRMaXN0OiBBcnJheTxzdHJpbmc+ID0gWydhZGRyZXNzMScsICdhZGRyZXNzMicsICdjaXR5JywgJ3N0YXRlJywgJ3ppcCcsICdjb3VudHJ5SUQnXTtcbiAgbW9kZWw6IGFueTtcbiAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG4gIGZvY3VzZWQ6IGFueSA9IHt9O1xuICBpbnZhbGlkOiBhbnkgPSB7fTtcbiAgZGlzYWJsZWQ6IGFueSA9IHt9O1xuICBpbnZhbGlkTWF4bGVuZ3RoOiBhbnkgPSB7fTtcbiAgdmFsaWQ6IGFueSA9IHt9O1xuICBzdGF0ZU9wdGlvbnM6IGFueTtcbiAgdG9vbHRpcDogYW55ID0ge307XG4gIGluaXRDb21wbGV0ZSA9IGZhbHNlO1xuICBAT3V0cHV0KClcbiAgY2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIGZvY3VzOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgdmFsaWRpdHlDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKCF0aGlzLmNvbmZpZykge1xuICAgICAgdGhpcy5jb25maWcgPSB7fTtcbiAgICB9XG4gICAgaWYgKHRoaXMubW9kZWwpIHtcbiAgICAgIHRoaXMud3JpdGVWYWx1ZSh0aGlzLm1vZGVsKTtcbiAgICAgIHRoaXMudXBkYXRlQ29udHJvbCgpO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMubW9kZWwpIHtcbiAgICAgIHRoaXMubW9kZWwgPSB7fTtcbiAgICB9XG4gICAgdGhpcy5pbml0Q29uZmlnKCk7XG4gICAgaWYgKEhlbHBlcnMuaXNCbGFuayh0aGlzLm1vZGVsLmNvdW50cnlJRCkpIHtcbiAgICAgIHRoaXMudXBkYXRlU3RhdGVzKCk7XG4gICAgfVxuICB9XG5cbiAgaW5pdENvbmZpZygpOiB2b2lkIHtcbiAgICB0aGlzLmZpZWxkTGlzdC5mb3JFYWNoKChmaWVsZDogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuY29uZmlnLmhhc093blByb3BlcnR5KGZpZWxkKSkge1xuICAgICAgICB0aGlzLmNvbmZpZ1tmaWVsZF0gPSB7XG4gICAgICAgICAgaGlkZGVuOiB0cnVlLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLmNvbmZpZ1tmaWVsZF0uaGFzT3duUHJvcGVydHkoJ2xhYmVsJykpIHtcbiAgICAgICAgdGhpcy5jb25maWdbZmllbGRdLmxhYmVsID0gdGhpcy5sYWJlbHNbZmllbGRdO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuY29uZmlnLnJlcXVpcmVkKSB7XG4gICAgICAgIHRoaXMuY29uZmlnW2ZpZWxkXS5yZXF1aXJlZCA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5jb25maWdbZmllbGRdLnJlYWRPbmx5IHx8IHRoaXMuY29uZmlnLnJlYWRPbmx5KSB7XG4gICAgICAgIHRoaXMuY29uZmlnW2ZpZWxkXS5yZWFkT25seSA9IHRydWU7XG4gICAgICAgIHRoaXMuZGlzYWJsZWRbZmllbGRdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChmaWVsZCA9PT0gJ2NvdW50cnlJRCcpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbmZpZ1tmaWVsZF0ucGlja2VyQ29uZmlnKSB7XG4gICAgICAgICAgdGhpcy5jb25maWcuY291bnRyeUlELnBpY2tlckNvbmZpZyA9IHRoaXMuZ2V0RGVmYXVsdENvdW50cnlDb25maWcoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbmZpZ1tmaWVsZF0ucGlja2VyQ29uZmlnLmRlZmF1bHRPcHRpb25zID0gdGhpcy5jb25maWcuY291bnRyeUlELnBpY2tlckNvbmZpZy5vcHRpb25zO1xuICAgICAgfVxuICAgICAgaWYgKGZpZWxkID09PSAnc3RhdGUnKSB7XG4gICAgICAgIGlmICghdGhpcy5jb25maWdbZmllbGRdLnBpY2tlckNvbmZpZykge1xuICAgICAgICAgIHRoaXMuY29uZmlnLnN0YXRlLnBpY2tlckNvbmZpZyA9IHRoaXMuZ2V0RGVmYXVsdFN0YXRlQ29uZmlnKCk7XG4gICAgICAgICAgdGhpcy5jb25maWdbZmllbGRdLnBpY2tlckNvbmZpZy5kZWZhdWx0T3B0aW9ucyA9IHRoaXMuY29uZmlnW2ZpZWxkXS5waWNrZXJDb25maWcub3B0aW9ucztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0YXRlT3B0aW9ucyA9IHRoaXMuY29uZmlnW2ZpZWxkXS5waWNrZXJDb25maWcub3B0aW9ucztcbiAgICAgICAgdGhpcy5jb25maWdbZmllbGRdLnBpY2tlckNvbmZpZy5vcHRpb25zID0gKHF1ZXJ5ID0gJycpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZU9wdGlvbnMocXVlcnksIHRoaXMubW9kZWwuY291bnRyeUlEKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jb25maWdbZmllbGRdLnBpY2tlckNvbmZpZy5kZWZhdWx0T3B0aW9ucyA9IHRoaXMuc3RhdGVPcHRpb25zO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaXNWYWxpZChmaWVsZDogc3RyaW5nKTogdm9pZCB7XG4gICAgbGV0IHZhbGlkID0gdHJ1ZTtcbiAgICBpZiAoXG4gICAgICAoKHRoaXMuY29uZmlnW2ZpZWxkXS5yZXF1aXJlZCAmJiAoSGVscGVycy5pc0JsYW5rKHRoaXMubW9kZWxbZmllbGRdKSB8fCBIZWxwZXJzLmlzRW1wdHkodGhpcy5tb2RlbFtmaWVsZF0pKSkgfHxcbiAgICAgICAgIXRoaXMuY29uZmlnW2ZpZWxkXS5yZXF1aXJlZCkgJiZcbiAgICAgICEoZmllbGQgPT09ICdjb3VudHJ5SUQnICYmIHRoaXMuY29uZmlnW2ZpZWxkXS5yZXF1aXJlZCAmJiAhSGVscGVycy5pc0JsYW5rKHRoaXMubW9kZWwuY291bnRyeUlEKSkgJiZcbiAgICAgICEoXG4gICAgICAgIGZpZWxkID09PSAnc3RhdGUnICYmXG4gICAgICAgIHRoaXMuY29uZmlnW2ZpZWxkXS5yZXF1aXJlZCAmJlxuICAgICAgICAoIUhlbHBlcnMuaXNFbXB0eSh0aGlzLm1vZGVsLnN0YXRlKSB8fFxuICAgICAgICAgICgoSGVscGVycy5pc0JsYW5rKHRoaXMubW9kZWwuc3RhdGUpIHx8IEhlbHBlcnMuaXNFbXB0eSh0aGlzLm1vZGVsLnN0YXRlKSkgJiZcbiAgICAgICAgICAgICFIZWxwZXJzLmlzQmxhbmsodGhpcy5tb2RlbC5jb3VudHJ5TmFtZSkgJiZcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLnN0YXRlLnBpY2tlckNvbmZpZyAmJlxuICAgICAgICAgICAgdGhpcy5jb25maWcuc3RhdGUucGlja2VyQ29uZmlnLmRlZmF1bHRPcHRpb25zICYmXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5zdGF0ZS5waWNrZXJDb25maWcuZGVmYXVsdE9wdGlvbnMubGVuZ3RoID09PSAwKSlcbiAgICAgIClcbiAgICApIHtcbiAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgICFIZWxwZXJzLmlzRW1wdHkodGhpcy5tb2RlbFtmaWVsZF0pICYmXG4gICAgICAhSGVscGVycy5pc0JsYW5rKHRoaXMuY29uZmlnW2ZpZWxkXS5tYXhsZW5ndGgpICYmXG4gICAgICB0aGlzLmNvbmZpZ1tmaWVsZF0ubWF4bGVuZ3RoIDwgdGhpcy5tb2RlbFtmaWVsZF0ubGVuZ3RoXG4gICAgKSB7XG4gICAgICB2YWxpZCA9IGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLnZhbGlkW2ZpZWxkXSA9IHZhbGlkO1xuICB9XG5cbiAgaXNJbnZhbGlkKGZpZWxkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBsZXQgaW52YWxpZCA9IGZhbHNlO1xuICAgIGxldCBpbnZhbGlkTWF4bGVuZ3RoID0gZmFsc2U7XG4gICAgaWYgKFxuICAgICAgKGZpZWxkICE9PSAnY291bnRyeUlEJyAmJlxuICAgICAgICBmaWVsZCAhPT0gJ3N0YXRlJyAmJlxuICAgICAgICB0aGlzLmNvbmZpZ1tmaWVsZF0ucmVxdWlyZWQgJiZcbiAgICAgICAgSGVscGVycy5pc0VtcHR5KHRoaXMubW9kZWxbZmllbGRdKSAmJlxuICAgICAgICAhSGVscGVycy5pc0JsYW5rKHRoaXMubW9kZWxbZmllbGRdKSkgfHxcbiAgICAgIChmaWVsZCA9PT0gJ2NvdW50cnlJRCcgJiYgdGhpcy5jb25maWdbZmllbGRdLnJlcXVpcmVkICYmIEhlbHBlcnMuaXNCbGFuayh0aGlzLm1vZGVsLmNvdW50cnlOYW1lKSAmJiB0aGlzLmNvbmZpZ1tmaWVsZF0udXBkYXRlZCkgfHxcbiAgICAgIChmaWVsZCA9PT0gJ3N0YXRlJyAmJlxuICAgICAgICB0aGlzLmNvbmZpZ1tmaWVsZF0ucmVxdWlyZWQgJiZcbiAgICAgICAgKEhlbHBlcnMuaXNCbGFuayh0aGlzLm1vZGVsLnN0YXRlKSB8fCBIZWxwZXJzLmlzRW1wdHkodGhpcy5tb2RlbC5zdGF0ZSkpICYmXG4gICAgICAgICFIZWxwZXJzLmlzQmxhbmsodGhpcy5tb2RlbC5jb3VudHJ5SUQpICYmXG4gICAgICAgIHRoaXMuY29uZmlnW2ZpZWxkXS51cGRhdGVkICYmXG4gICAgICAgIHRoaXMuY29uZmlnLnN0YXRlLnBpY2tlckNvbmZpZyAmJlxuICAgICAgICB0aGlzLmNvbmZpZy5zdGF0ZS5waWNrZXJDb25maWcuZGVmYXVsdE9wdGlvbnMgJiZcbiAgICAgICAgdGhpcy5jb25maWcuc3RhdGUucGlja2VyQ29uZmlnLmRlZmF1bHRPcHRpb25zLmxlbmd0aCA+IDApXG4gICAgKSB7XG4gICAgICBpbnZhbGlkID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgIUhlbHBlcnMuaXNFbXB0eSh0aGlzLm1vZGVsW2ZpZWxkXSkgJiZcbiAgICAgICFIZWxwZXJzLmlzQmxhbmsodGhpcy5jb25maWdbZmllbGRdLm1heGxlbmd0aCkgJiZcbiAgICAgIHRoaXMuY29uZmlnW2ZpZWxkXS5tYXhsZW5ndGggPCB0aGlzLm1vZGVsW2ZpZWxkXS5sZW5ndGhcbiAgICApIHtcbiAgICAgIGludmFsaWQgPSB0cnVlO1xuICAgICAgaW52YWxpZE1heGxlbmd0aCA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuaW52YWxpZFtmaWVsZF0gPSBpbnZhbGlkO1xuICAgIHRoaXMuaW52YWxpZE1heGxlbmd0aFtmaWVsZF0gPSBpbnZhbGlkTWF4bGVuZ3RoO1xuICB9XG5cbiAgb25JbnB1dChldmVudDogRXZlbnQsIGZpZWxkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmlzSW52YWxpZChmaWVsZCk7XG4gICAgdGhpcy5pc1ZhbGlkKGZpZWxkKTtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIHRoaXMuY2hhbmdlLmVtaXQoeyB2YWx1ZTogdGhpcy5tb2RlbFtmaWVsZF0sIGZpZWxkIH0pO1xuICAgIH1cbiAgfVxuXG4gIGlzRm9jdXNlZChldmVudDogRXZlbnQsIGZpZWxkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmZvY3VzZWRbZmllbGRdID0gdHJ1ZTtcbiAgICB0aGlzLmZvY3VzLmVtaXQoeyBldmVudCwgZmllbGQgfSk7XG4gIH1cblxuICBpc0JsdXJyZWQoZXZlbnQ6IEV2ZW50LCBmaWVsZDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5mb2N1c2VkW2ZpZWxkXSA9IGZhbHNlO1xuICAgIHRoaXMuYmx1ci5lbWl0KHsgZXZlbnQsIGZpZWxkIH0pO1xuICB9XG5cbiAgb25Db3VudHJ5Q2hhbmdlKGV2dCkge1xuICAgIGNvbnN0IGNvdW50cnk6IGFueSA9IGV2dCAmJiBldnQucmF3VmFsdWUgPyBldnQucmF3VmFsdWUgOiBudWxsO1xuICAgIGxldCBmaWVsZDogYW55O1xuICAgIGxldCBzdGF0ZXNVcGRhdGFibGUgPSBmYWxzZTtcbiAgICB0aGlzLmNvbmZpZy5jb3VudHJ5SUQudXBkYXRlZCA9IHRydWU7XG4gICAgaWYgKHRoaXMuY29uZmlnLmNvdW50cnlJRC5waWNrZXJDb25maWcpIHtcbiAgICAgIGZpZWxkID0gdGhpcy5jb25maWcuY291bnRyeUlELnBpY2tlckNvbmZpZy5maWVsZDtcbiAgICB9XG4gICAgaWYgKGNvdW50cnkgJiYgZmllbGQgJiYgIUhlbHBlcnMuaXNCbGFuayhjb3VudHJ5W2ZpZWxkXSkgJiYgdGhpcy5tb2RlbC5jb3VudHJ5SUQgIT09IGNvdW50cnlbZmllbGRdKSB7XG4gICAgICB0aGlzLm1vZGVsLmNvdW50cnlJRCA9IGNvdW50cnlbZmllbGRdO1xuICAgICAgdGhpcy5tb2RlbC5jb3VudHJ5TmFtZSA9IEhlbHBlcnMuaW50ZXJwb2xhdGUodGhpcy5jb25maWcuY291bnRyeUlELnBpY2tlckNvbmZpZy5mb3JtYXQsIGNvdW50cnkpO1xuICAgICAgdGhpcy5kaXNhYmxlZC5zdGF0ZSA9IGZhbHNlO1xuICAgICAgdGhpcy50b29sdGlwLnN0YXRlID0gdW5kZWZpbmVkO1xuICAgICAgc3RhdGVzVXBkYXRhYmxlID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKEhlbHBlcnMuaXNCbGFuayhjb3VudHJ5KSB8fCBIZWxwZXJzLmlzQmxhbmsoY291bnRyeVtmaWVsZF0pKSB7XG4gICAgICB0aGlzLm1vZGVsLmNvdW50cnlJRCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMubW9kZWwuY291bnRyeU5hbWUgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRpc2FibGVkLnN0YXRlID0gdHJ1ZTtcbiAgICAgIHRoaXMudG9vbHRpcC5zdGF0ZSA9IHRoaXMubGFiZWxzLnNlbGVjdENvdW50cnlGaXJzdDtcbiAgICAgIHRoaXMuaW52YWxpZC5zdGF0ZSA9IGZhbHNlO1xuICAgICAgc3RhdGVzVXBkYXRhYmxlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgc3RhdGVcbiAgICBpZiAoc3RhdGVzVXBkYXRhYmxlKSB7XG4gICAgICB0aGlzLm1vZGVsLnN0YXRlID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy51cGRhdGVTdGF0ZXMoKTtcbiAgICB9XG4gICAgdGhpcy51cGRhdGVDb250cm9sKCk7XG4gICAgdGhpcy5vbklucHV0KG51bGwsICdjb3VudHJ5SUQnKTtcbiAgICB0aGlzLm9uSW5wdXQobnVsbCwgJ3N0YXRlJyk7XG4gIH1cblxuICBvblN0YXRlQ2hhbmdlKGV2dCkge1xuICAgIGNvbnN0IHN0YXRlOiBhbnkgPSBldnQgJiYgZXZ0LnZhbHVlID8gZXZ0LnZhbHVlIDogbnVsbDtcbiAgICB0aGlzLmNvbmZpZy5zdGF0ZS51cGRhdGVkID0gdHJ1ZTtcbiAgICB0aGlzLm1vZGVsLnN0YXRlID0gc3RhdGU7XG4gICAgdGhpcy51cGRhdGVDb250cm9sKCk7XG4gICAgdGhpcy5vbklucHV0KG51bGwsICdzdGF0ZScpO1xuICB9XG5cbiAgc2V0U3RhdGVMYWJlbChtb2RlbDogYW55KSB7XG4gICAgY29uc3Qgc3RhdGU6IHN0cmluZyA9IG1vZGVsLnN0YXRlO1xuICAgIGlmICghSGVscGVycy5pc0JsYW5rKHN0YXRlKSkge1xuICAgICAgaWYgKHRoaXMuY29uZmlnLnN0YXRlLnJlcXVpcmVkKSB7XG4gICAgICAgIHRoaXMudmFsaWQuc3RhdGUgPSB0cnVlO1xuICAgICAgfVxuICAgICAgdGhpcy5tb2RlbC5zdGF0ZSA9IHN0YXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1vZGVsLnN0YXRlID0gdW5kZWZpbmVkO1xuICAgICAgaWYgKHRoaXMuY29uZmlnLnN0YXRlLnJlcXVpcmVkKSB7XG4gICAgICAgIHRoaXMudmFsaWQuc3RhdGUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB1cGRhdGVTdGF0ZXMoKSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLnN0YXRlLnBpY2tlckNvbmZpZy5vcHRpb25zICYmICFIZWxwZXJzLmlzQmxhbmsodGhpcy5tb2RlbC5jb3VudHJ5SUQpKSB7XG4gICAgICB0aGlzLmNvbmZpZy5zdGF0ZS5waWNrZXJDb25maWcub3B0aW9ucyA9IChxdWVyeSA9ICcnKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlT3B0aW9ucyhxdWVyeSwgdGhpcy5tb2RlbC5jb3VudHJ5SUQpO1xuICAgICAgfTtcbiAgICAgIHRoaXMuc3RhdGVPcHRpb25zKCcnLCB0aGlzLm1vZGVsLmNvdW50cnlJRCkudGhlbigocmVzdWx0cykgPT4ge1xuICAgICAgICB0aGlzLmNvbmZpZy5zdGF0ZS5waWNrZXJDb25maWcuZGVmYXVsdE9wdGlvbnMgPSByZXN1bHRzO1xuICAgICAgICBpZiAocmVzdWx0cy5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLnRvb2x0aXAuc3RhdGUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgdGhpcy5kaXNhYmxlZC5zdGF0ZSA9IHRoaXMuX3JlYWRPbmx5O1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGVMYWJlbCh0aGlzLm1vZGVsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmRpc2FibGVkLnN0YXRlID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLnRvb2x0aXAuc3RhdGUgPSB0aGlzLmxhYmVscy5ub1N0YXRlc0ZvckNvdW50cnk7XG4gICAgICAgICAgaWYgKHRoaXMuY29uZmlnLnN0YXRlLnJlcXVpcmVkKSB7XG4gICAgICAgICAgICB0aGlzLnZhbGlkLnN0YXRlID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52YWxpZGl0eUNoYW5nZS5lbWl0KCk7XG4gICAgICAgIHRoaXMub25JbnB1dChudWxsLCAnc3RhdGUnKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbmZpZy5zdGF0ZS5waWNrZXJDb25maWcuZGVmYXVsdE9wdGlvbnMgPSBbXTtcbiAgICAgIHRoaXMuZGlzYWJsZWQuc3RhdGUgPSB0cnVlO1xuICAgICAgdGhpcy50b29sdGlwLnN0YXRlID0gdGhpcy5sYWJlbHMuc2VsZWN0Q291bnRyeUZpcnN0O1xuICAgICAgaWYgKHRoaXMuY29uZmlnLnN0YXRlLnJlcXVpcmVkKSB7XG4gICAgICAgIHRoaXMudmFsaWQuc3RhdGUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRTdGF0ZU9wdGlvbnMoZmlsdGVyID0gJycsIGNvdW50cnlJRDogbnVtYmVyKSB7XG4gICAgaWYgKGNvdW50cnlJRCkge1xuICAgICAgY29uc3QgY291bnRyeSA9IGZpbmRCeUNvdW50cnlJZChjb3VudHJ5SUQpO1xuICAgICAgY29uc3Qgc3RhdGVzID0gZ2V0U3RhdGVzKGNvdW50cnkubmFtZSk7XG4gICAgICBpZiAoZmlsdGVyKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZXMuZmlsdGVyKChuYW1lKSA9PiBuZXcgUmVnRXhwKGAke2ZpbHRlcn1gLCAnZ2knKS50ZXN0KG5hbWUpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdGF0ZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVDb250cm9sKCkge1xuICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLm1vZGVsKTtcbiAgICB0aGlzLm9uSW5wdXQobnVsbCwgJ2NvdW50cnlJRCcpO1xuICAgIHRoaXMub25JbnB1dChudWxsLCAnc3RhdGUnKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUobW9kZWwpIHtcbiAgICBsZXQgbG9hZGluZ0NvdW50cmllcyA9IGZhbHNlO1xuICAgIGlmIChtb2RlbCkge1xuICAgICAgbGV0IGNvdW50cnlOYW1lO1xuICAgICAgaWYgKG1vZGVsLmNvdW50cnlOYW1lICYmIG1vZGVsLmNvdW50cnlJRCkge1xuICAgICAgICBjb3VudHJ5TmFtZSA9IG1vZGVsLmNvdW50cnlOYW1lO1xuICAgICAgfSBlbHNlIGlmIChtb2RlbC5jb3VudHJ5SUQpIHtcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmNvdW50cnlJRC5waWNrZXJDb25maWcgJiYgdGhpcy5jb25maWcuY291bnRyeUlELnBpY2tlckNvbmZpZy5nZXRMYWJlbHMpIHtcbiAgICAgICAgICBpZiAoSGVscGVycy5pc0Z1bmN0aW9uKHRoaXMuY29uZmlnLmNvdW50cnlJRC5waWNrZXJDb25maWcuZ2V0TGFiZWxzKSkge1xuICAgICAgICAgICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuY29uZmlnLmNvdW50cnlJRC5waWNrZXJDb25maWcuZ2V0TGFiZWxzKG1vZGVsLmNvdW50cnlJRCk7XG4gICAgICAgICAgICBsb2FkaW5nQ291bnRyaWVzID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChwcm9taXNlLnRoZW4pIHtcbiAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBsb2FkaW5nQ291bnRyaWVzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgY291bnRyeU5hbWUgPSBIZWxwZXJzLmludGVycG9sYXRlV2l0aEZhbGxiYWNrKHRoaXMuY29uZmlnLmNvdW50cnlJRC5waWNrZXJDb25maWcuZm9ybWF0LCByZXN1bHQpO1xuICAgICAgICAgICAgICAgIHRoaXMubW9kZWwgPSBPYmplY3QuYXNzaWduKG1vZGVsLCB7IGNvdW50cnlOYW1lIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU3RhdGVzKCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGNvdW50cnlOYW1lKSB7XG4gICAgICAgIGNvdW50cnlOYW1lID0gY291bnRyeU5hbWUudHJpbSgpO1xuICAgICAgICBtb2RlbC5zdGF0ZSA9IG1vZGVsLnN0YXRlIHx8ICcnO1xuICAgICAgICB0aGlzLm1vZGVsID0gT2JqZWN0LmFzc2lnbihtb2RlbCwgeyBjb3VudHJ5TmFtZSB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICAgIH1cbiAgICAgIGlmICghbG9hZGluZ0NvdW50cmllcyAmJiAhSGVscGVycy5pc0JsYW5rKHRoaXMubW9kZWwuY291bnRyeUlEKSkge1xuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlcygpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmZpZWxkTGlzdC5mb3JFYWNoKChmaWVsZDogc3RyaW5nKSA9PiB7XG4gICAgICB0aGlzLm9uSW5wdXQobnVsbCwgZmllbGQpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RGVmYXVsdFN0YXRlQ29uZmlnKCkge1xuICAgIHJldHVybiB7XG4gICAgICBmaWVsZDogJ3ZhbHVlJyxcbiAgICAgIGZvcm1hdDogJyRsYWJlbCcsXG4gICAgICBvcHRpb25zOiAocXVlcnkgPSAnJywgY291bnRyeUlEKSA9PiB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5nZXRTdGF0ZU9wdGlvbnMocXVlcnksIGNvdW50cnlJRCkpO1xuICAgICAgfSxcbiAgICAgIGdldExhYmVsczogKHN0YXRlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShzdGF0ZSk7XG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGdldERlZmF1bHRDb3VudHJ5Q29uZmlnKCkge1xuICAgIHJldHVybiB7XG4gICAgICBmaWVsZDogJ3ZhbHVlJyxcbiAgICAgIGZvcm1hdDogJyRsYWJlbCcsXG4gICAgICBvcHRpb25zOiAocXVlcnkgPSAnJykgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICBsZXQgY291bnRyaWVzID0gQ09VTlRSSUVTO1xuICAgICAgICAgIGlmIChxdWVyeSkge1xuICAgICAgICAgICAgY291bnRyaWVzID0gY291bnRyaWVzLmZpbHRlcigoY291bnRyeSkgPT4gbmV3IFJlZ0V4cChgJHtxdWVyeX1gLCAnZ2knKS50ZXN0KGNvdW50cnkubmFtZSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZShjb3VudHJpZXMubWFwKChjb3VudHJ5KSA9PiAoeyB2YWx1ZTogY291bnRyeS5pZCwgbGFiZWw6IGNvdW50cnkubmFtZSB9KSkpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBnZXRMYWJlbHM6IChjb3VudHJ5SUQpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlOiBhbnkpID0+IHtcbiAgICAgICAgICBjb25zdCBjb3VudHJ5OiBhbnkgPSBmaW5kQnlDb3VudHJ5SWQoY291bnRyeUlEKTtcbiAgICAgICAgICBpZiAoY291bnRyeSkge1xuICAgICAgICAgICAgcmVzb2x2ZSh7IHZhbHVlOiBjb3VudHJ5LmlkLCBsYWJlbDogY291bnRyeS5uYW1lIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKCcnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICB9O1xuICB9XG59XG4iXX0=
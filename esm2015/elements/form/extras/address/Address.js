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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9mb3JtL2V4dHJhcy9hZGRyZXNzL0FkZHJlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxNQUFNO0FBQ04sT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDM0UsT0FBTyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDOUYsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDJCQUEyQixDQUFDOzs7Ozs7Ozs7SUF5QzlDLHVCQUtJOzs7SUFGRixtR0FBMEU7Ozs7SUFWOUUsK0JBT0U7SUFBQSxzRUFLQTtJQUNBLGdDQWNGO0lBTkksdU5BQTRCLDRMQUFBLG1MQUVELFVBQVUsS0FGVCxpTEFHRixVQUFVLEtBSFIsaUxBSUgsVUFBVSxLQUpQO0lBUjlCLGlCQWNGO0lBQUEsaUJBQU87OztJQXhCTCxrREFBa0Msa0NBQUEsc0NBQUE7SUFLaEMsZUFBZ0M7SUFBaEMsc0RBQWdDO0lBTWhDLGVBQW1EO0lBQW5ELG1FQUFtRDtJQUluRCwwREFBcUMsc0hBQUEsa0NBQUE7OztJQWlCdkMsd0JBS0k7OztJQUZGLHFHQUEwRTs7OztJQVY5RSxnQ0FPRTtJQUFBLHVFQUtBO0lBQ0EsaUNBY0Y7SUFOSSwwTkFBNEIsK0xBQUEsb0xBRUQsVUFBVSxLQUZULGtMQUdGLFVBQVUsS0FIUixrTEFJSCxVQUFVLEtBSlA7SUFSOUIsaUJB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QUFDLENBQUM7WUFDTCxDQUFDO1NBQ0YsQ0FBQztJQUNKLENBQUM7O29GQXpXVSxrQkFBa0I7dURBQWxCLGtCQUFrQixxTkFsSmxCLENBQUMsc0JBQXNCLENBQUM7UUFFakMsc0VBT0U7UUFxQkYsc0VBT0U7UUFxQkYsc0VBT0U7UUFnQkYsc0VBUUU7UUFVRixzRUFPRTtRQWdCRixzRUFPRTs7UUE5SEEscUhBQWlDO1FBNEJqQyxlQUFpQztRQUFqQyxxSEFBaUM7UUE0QmpDLGVBQTZCO1FBQTdCLDZHQUE2QjtRQXVCN0IsZUFBOEI7UUFBOUIsK0dBQThCO1FBa0I5QixlQUE0QjtRQUE1QiwyR0FBNEI7UUF1QjVCLGVBQWtDO1FBQWxDLHVIQUFrQzs7a0RBdUIzQixrQkFBa0I7Y0FwSjlCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7Z0JBQ25DLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErSVQ7YUFDRjttRUFHQyxNQUFNO2tCQURMLEtBQUs7WUFJRixRQUFRO2tCQURYLEtBQUs7WUEyQk4sTUFBTTtrQkFETCxNQUFNO1lBR1AsS0FBSztrQkFESixNQUFNO1lBR1AsSUFBSTtrQkFESCxNQUFNO1lBR1AsY0FBYztrQkFEYixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xuaW1wb3J0IHsgQ09VTlRSSUVTLCBmaW5kQnlDb3VudHJ5SWQsIGdldFN0YXRlcyB9IGZyb20gJy4uLy4uLy4uLy4uL3V0aWxzL2NvdW50cmllcy9Db3VudHJpZXMnO1xuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJy4uLy4uLy4uLy4uL3V0aWxzL0hlbHBlcnMnO1xuXG4vLyBWYWx1ZSBhY2Nlc3NvciBmb3IgdGhlIGNvbXBvbmVudCAoc3VwcG9ydHMgbmdNb2RlbClcbmNvbnN0IEFERFJFU1NfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOb3ZvQWRkcmVzc0VsZW1lbnQpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgTm92b0FkZHJlc3NTdWJmaWVsZENvbmZpZyB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHJlcXVpcmVkOiBib29sZWFuO1xuICBtYXhsZW5ndGg6IG51bWJlcjtcbiAgcGlja2VyQ29uZmlnPzogYW55O1xuICBoaWRkZW46IGJvb2xlYW47XG4gIHVwZGF0ZWQ/OiBib29sZWFuO1xuICByZWFkT25seT86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTm92b0FkZHJlc3NDb25maWcge1xuICByZXF1aXJlZD86IGJvb2xlYW47XG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgYWRkcmVzczE/OiBOb3ZvQWRkcmVzc1N1YmZpZWxkQ29uZmlnO1xuICBhZGRyZXNzMj86IE5vdm9BZGRyZXNzU3ViZmllbGRDb25maWc7XG4gIGNpdHk/OiBOb3ZvQWRkcmVzc1N1YmZpZWxkQ29uZmlnO1xuICBzdGF0ZT86IE5vdm9BZGRyZXNzU3ViZmllbGRDb25maWc7XG4gIHppcD86IE5vdm9BZGRyZXNzU3ViZmllbGRDb25maWc7XG4gIGNvdW50cnlJRD86IE5vdm9BZGRyZXNzU3ViZmllbGRDb25maWc7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tYWRkcmVzcycsXG4gIHByb3ZpZGVyczogW0FERFJFU1NfVkFMVUVfQUNDRVNTT1JdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzcGFuXG4gICAgICAqbmdJZj1cIiFjb25maWc/LmFkZHJlc3MxPy5oaWRkZW5cIlxuICAgICAgY2xhc3M9XCJzdHJlZXQtYWRkcmVzc1wiXG4gICAgICBbY2xhc3MuaW52YWxpZF09XCJpbnZhbGlkLmFkZHJlc3MxXCJcbiAgICAgIFtjbGFzcy5mb2N1c109XCJmb2N1c2VkLmFkZHJlc3MxXCJcbiAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZC5hZGRyZXNzMVwiXG4gICAgPlxuICAgICAgPGlcbiAgICAgICAgKm5nSWY9XCJjb25maWcuYWRkcmVzczEucmVxdWlyZWRcIlxuICAgICAgICBjbGFzcz1cInJlcXVpcmVkLWluZGljYXRvciBhZGRyZXNzMVwiXG4gICAgICAgIFtuZ0NsYXNzXT1cInsgJ2JoaS1jaXJjbGUnOiAhdmFsaWQuYWRkcmVzczEsICdiaGktY2hlY2snOiB2YWxpZC5hZGRyZXNzMSB9XCJcbiAgICAgID5cbiAgICAgIDwvaT5cbiAgICAgIDxpbnB1dFxuICAgICAgICBbY2xhc3MubWF4bGVuZ3RoLWVycm9yXT1cImludmFsaWRNYXhsZW5ndGguYWRkcmVzczFcIlxuICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgIGlkPVwiYWRkcmVzczFcIlxuICAgICAgICBuYW1lPVwiYWRkcmVzczFcIlxuICAgICAgICBbcGxhY2Vob2xkZXJdPVwiY29uZmlnLmFkZHJlc3MxLmxhYmVsXCJcbiAgICAgICAgW21heGxlbmd0aF09XCJjb25maWc/LmFkZHJlc3MxPy5tYXhsZW5ndGhcIlxuICAgICAgICBhdXRvY29tcGxldGU9XCJzaGlwcGluZyBzdHJlZXQtYWRkcmVzcyBhZGRyZXNzLWxpbmUtMVwiXG4gICAgICAgIFsobmdNb2RlbCldPVwibW9kZWwuYWRkcmVzczFcIlxuICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJ1cGRhdGVDb250cm9sKClcIlxuICAgICAgICAoZm9jdXMpPVwiaXNGb2N1c2VkKCRldmVudCwgJ2FkZHJlc3MxJylcIlxuICAgICAgICAoYmx1cik9XCJpc0JsdXJyZWQoJGV2ZW50LCAnYWRkcmVzczEnKVwiXG4gICAgICAgIChpbnB1dCk9XCJvbklucHV0KCRldmVudCwgJ2FkZHJlc3MxJylcIlxuICAgICAgLz5cbiAgICA8L3NwYW4+XG4gICAgPHNwYW5cbiAgICAgICpuZ0lmPVwiIWNvbmZpZz8uYWRkcmVzczI/LmhpZGRlblwiXG4gICAgICBjbGFzcz1cImFwdCBzdWl0ZVwiXG4gICAgICBbY2xhc3MuaW52YWxpZF09XCJpbnZhbGlkLmFkZHJlc3MyXCJcbiAgICAgIFtjbGFzcy5mb2N1c109XCJmb2N1c2VkLmFkZHJlc3MyXCJcbiAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZC5hZGRyZXNzMlwiXG4gICAgPlxuICAgICAgPGlcbiAgICAgICAgKm5nSWY9XCJjb25maWcuYWRkcmVzczIucmVxdWlyZWRcIlxuICAgICAgICBjbGFzcz1cInJlcXVpcmVkLWluZGljYXRvciBhZGRyZXNzMlwiXG4gICAgICAgIFtuZ0NsYXNzXT1cInsgJ2JoaS1jaXJjbGUnOiAhdmFsaWQuYWRkcmVzczIsICdiaGktY2hlY2snOiB2YWxpZC5hZGRyZXNzMiB9XCJcbiAgICAgID5cbiAgICAgIDwvaT5cbiAgICAgIDxpbnB1dFxuICAgICAgICBbY2xhc3MubWF4bGVuZ3RoLWVycm9yXT1cImludmFsaWRNYXhsZW5ndGguYWRkcmVzczJcIlxuICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgIGlkPVwiYWRkcmVzczJcIlxuICAgICAgICBuYW1lPVwiYWRkcmVzczJcIlxuICAgICAgICBbcGxhY2Vob2xkZXJdPVwiY29uZmlnLmFkZHJlc3MyLmxhYmVsXCJcbiAgICAgICAgW21heGxlbmd0aF09XCJjb25maWc/LmFkZHJlc3MyPy5tYXhsZW5ndGhcIlxuICAgICAgICBhdXRvY29tcGxldGU9XCJzaGlwcGluZyBhZGRyZXNzLWxpbmUtMlwiXG4gICAgICAgIFsobmdNb2RlbCldPVwibW9kZWwuYWRkcmVzczJcIlxuICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJ1cGRhdGVDb250cm9sKClcIlxuICAgICAgICAoZm9jdXMpPVwiaXNGb2N1c2VkKCRldmVudCwgJ2FkZHJlc3MyJylcIlxuICAgICAgICAoYmx1cik9XCJpc0JsdXJyZWQoJGV2ZW50LCAnYWRkcmVzczInKVwiXG4gICAgICAgIChpbnB1dCk9XCJvbklucHV0KCRldmVudCwgJ2FkZHJlc3MyJylcIlxuICAgICAgLz5cbiAgICA8L3NwYW4+XG4gICAgPHNwYW5cbiAgICAgICpuZ0lmPVwiIWNvbmZpZz8uY2l0eT8uaGlkZGVuXCJcbiAgICAgIGNsYXNzPVwiY2l0eSBsb2NhbGl0eVwiXG4gICAgICBbY2xhc3MuaW52YWxpZF09XCJpbnZhbGlkLmNpdHlcIlxuICAgICAgW2NsYXNzLmZvY3VzXT1cImZvY3VzZWQuY2l0eVwiXG4gICAgICBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWQuY2l0eVwiXG4gICAgPlxuICAgICAgPGkgKm5nSWY9XCJjb25maWcuY2l0eS5yZXF1aXJlZFwiIGNsYXNzPVwicmVxdWlyZWQtaW5kaWNhdG9yXCIgW25nQ2xhc3NdPVwieyAnYmhpLWNpcmNsZSc6ICF2YWxpZC5jaXR5LCAnYmhpLWNoZWNrJzogdmFsaWQuY2l0eSB9XCI+IDwvaT5cbiAgICAgIDxpbnB1dFxuICAgICAgICBbY2xhc3MubWF4bGVuZ3RoLWVycm9yXT1cImludmFsaWRNYXhsZW5ndGguY2l0eVwiXG4gICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgaWQ9XCJjaXR5XCJcbiAgICAgICAgbmFtZT1cImNpdHlcIlxuICAgICAgICBbcGxhY2Vob2xkZXJdPVwiY29uZmlnLmNpdHkubGFiZWxcIlxuICAgICAgICBhdXRvY29tcGxldGU9XCJzaGlwcGluZyBjaXR5IGxvY2FsaXR5XCJcbiAgICAgICAgW21heGxlbmd0aF09XCJjb25maWc/LmNpdHk/Lm1heGxlbmd0aFwiXG4gICAgICAgIFsobmdNb2RlbCldPVwibW9kZWwuY2l0eVwiXG4gICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cInVwZGF0ZUNvbnRyb2woKVwiXG4gICAgICAgIChmb2N1cyk9XCJpc0ZvY3VzZWQoJGV2ZW50LCAnY2l0eScpXCJcbiAgICAgICAgKGJsdXIpPVwiaXNCbHVycmVkKCRldmVudCwgJ2NpdHknKVwiXG4gICAgICAgIChpbnB1dCk9XCJvbklucHV0KCRldmVudCwgJ2NpdHknKVwiXG4gICAgICAvPlxuICAgIDwvc3Bhbj5cbiAgICA8c3BhblxuICAgICAgKm5nSWY9XCIhY29uZmlnPy5zdGF0ZT8uaGlkZGVuXCJcbiAgICAgIGNsYXNzPVwic3RhdGUgcmVnaW9uXCJcbiAgICAgIFtjbGFzcy5pbnZhbGlkXT1cImludmFsaWQuc3RhdGVcIlxuICAgICAgW2NsYXNzLmZvY3VzXT1cImZvY3VzZWQuc3RhdGVcIlxuICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkLnN0YXRlXCJcbiAgICAgIFt0b29sdGlwXT1cInRvb2x0aXAuc3RhdGVcIlxuICAgID5cbiAgICAgIDxpICpuZ0lmPVwiY29uZmlnLnN0YXRlLnJlcXVpcmVkXCIgY2xhc3M9XCJyZXF1aXJlZC1pbmRpY2F0b3JcIiBbbmdDbGFzc109XCJ7ICdiaGktY2lyY2xlJzogIXZhbGlkLnN0YXRlLCAnYmhpLWNoZWNrJzogdmFsaWQuc3RhdGUgfVwiPiA8L2k+XG4gICAgICA8bm92by1waWNrZXJcbiAgICAgICAgW2NvbmZpZ109XCJjb25maWc/LnN0YXRlPy5waWNrZXJDb25maWdcIlxuICAgICAgICBbcGxhY2Vob2xkZXJdPVwiY29uZmlnPy5zdGF0ZT8ubGFiZWxcIlxuICAgICAgICAoY2hhbmdlZCk9XCJvblN0YXRlQ2hhbmdlKCRldmVudClcIlxuICAgICAgICBhdXRvY29tcGxldGU9XCJzaGlwcGluZyByZWdpb25cIlxuICAgICAgICBbKG5nTW9kZWwpXT1cIm1vZGVsLnN0YXRlXCJcbiAgICAgICAgW2Rpc2FibGVQaWNrZXJJbnB1dF09XCJkaXNhYmxlZC5zdGF0ZVwiXG4gICAgICA+PC9ub3ZvLXBpY2tlcj5cbiAgICA8L3NwYW4+XG4gICAgPHNwYW5cbiAgICAgICpuZ0lmPVwiIWNvbmZpZz8uemlwPy5oaWRkZW5cIlxuICAgICAgY2xhc3M9XCJ6aXAgcG9zdGFsLWNvZGVcIlxuICAgICAgW2NsYXNzLmludmFsaWRdPVwiaW52YWxpZC56aXBcIlxuICAgICAgW2NsYXNzLmZvY3VzXT1cImZvY3VzZWQuemlwXCJcbiAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZC56aXBcIlxuICAgID5cbiAgICAgIDxpICpuZ0lmPVwiY29uZmlnLnppcC5yZXF1aXJlZFwiIGNsYXNzPVwicmVxdWlyZWQtaW5kaWNhdG9yXCIgW25nQ2xhc3NdPVwieyAnYmhpLWNpcmNsZSc6ICF2YWxpZC56aXAsICdiaGktY2hlY2snOiB2YWxpZC56aXAgfVwiPiA8L2k+XG4gICAgICA8aW5wdXRcbiAgICAgICAgW2NsYXNzLm1heGxlbmd0aC1lcnJvcl09XCJpbnZhbGlkTWF4bGVuZ3RoLnppcFwiXG4gICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgaWQ9XCJ6aXBcIlxuICAgICAgICBuYW1lPVwiemlwXCJcbiAgICAgICAgW3BsYWNlaG9sZGVyXT1cImNvbmZpZy56aXAubGFiZWxcIlxuICAgICAgICBhdXRvY29tcGxldGU9XCJzaGlwcGluZyBwb3N0YWwtY29kZVwiXG4gICAgICAgIFttYXhsZW5ndGhdPVwiY29uZmlnPy56aXA/Lm1heGxlbmd0aFwiXG4gICAgICAgIFsobmdNb2RlbCldPVwibW9kZWwuemlwXCJcbiAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwidXBkYXRlQ29udHJvbCgpXCJcbiAgICAgICAgKGZvY3VzKT1cImlzRm9jdXNlZCgkZXZlbnQsICd6aXAnKVwiXG4gICAgICAgIChibHVyKT1cImlzQmx1cnJlZCgkZXZlbnQsICd6aXAnKVwiXG4gICAgICAgIChpbnB1dCk9XCJvbklucHV0KCRldmVudCwgJ3ppcCcpXCJcbiAgICAgIC8+XG4gICAgPC9zcGFuPlxuICAgIDxzcGFuXG4gICAgICAqbmdJZj1cIiFjb25maWc/LmNvdW50cnlJRD8uaGlkZGVuXCJcbiAgICAgIGNsYXNzPVwiY291bnRyeS1uYW1lXCJcbiAgICAgIFtjbGFzcy5pbnZhbGlkXT1cImludmFsaWQuY291bnRyeUlEXCJcbiAgICAgIFtjbGFzcy5mb2N1c109XCJmb2N1c2VkLmNvdW50cnlJRFwiXG4gICAgICBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWQuY291bnRyeUlEXCJcbiAgICA+XG4gICAgICA8aVxuICAgICAgICAqbmdJZj1cImNvbmZpZy5jb3VudHJ5SUQucmVxdWlyZWRcIlxuICAgICAgICBjbGFzcz1cInJlcXVpcmVkLWluZGljYXRvclwiXG4gICAgICAgIFtuZ0NsYXNzXT1cInsgJ2JoaS1jaXJjbGUnOiAhdmFsaWQuY291bnRyeUlELCAnYmhpLWNoZWNrJzogdmFsaWQuY291bnRyeUlEIH1cIlxuICAgICAgPlxuICAgICAgPC9pPlxuICAgICAgPG5vdm8tcGlja2VyXG4gICAgICAgIFtjb25maWddPVwiY29uZmlnPy5jb3VudHJ5SUQ/LnBpY2tlckNvbmZpZ1wiXG4gICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb25maWcuY291bnRyeUlELmxhYmVsXCJcbiAgICAgICAgKGNoYW5nZWQpPVwib25Db3VudHJ5Q2hhbmdlKCRldmVudClcIlxuICAgICAgICBhdXRvY29tcGxldGU9XCJzaGlwcGluZyBjb3VudHJ5XCJcbiAgICAgICAgWyhuZ01vZGVsKV09XCJtb2RlbC5jb3VudHJ5SURcIlxuICAgICAgICBbZGlzYWJsZVBpY2tlcklucHV0XT1cImRpc2FibGVkLmNvdW50cnlJRFwiXG4gICAgICA+PC9ub3ZvLXBpY2tlcj5cbiAgICA8L3NwYW4+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9BZGRyZXNzRWxlbWVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQge1xuICBASW5wdXQoKVxuICBjb25maWc6IE5vdm9BZGRyZXNzQ29uZmlnO1xuICBwcml2YXRlIF9yZWFkT25seSA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBzZXQgcmVhZE9ubHkocmVhZE9ubHk6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZWFkT25seSA9IHJlYWRPbmx5O1xuICAgIHRoaXMuZmllbGRMaXN0LmZvckVhY2goKGZpZWxkOiBzdHJpbmcpID0+IHtcbiAgICAgIHRoaXMuZGlzYWJsZWRbZmllbGRdID0gdGhpcy5fcmVhZE9ubHk7XG4gICAgfSk7XG4gICAgaWYgKHRoaXMubW9kZWwpIHtcbiAgICAgIHRoaXMudXBkYXRlU3RhdGVzKCk7XG4gICAgfVxuICB9XG4gIGdldCByZWFkT25seSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fcmVhZE9ubHk7XG4gIH1cbiAgc3RhdGVzOiBBcnJheTxhbnk+ID0gW107XG4gIGZpZWxkTGlzdDogQXJyYXk8c3RyaW5nPiA9IFsnYWRkcmVzczEnLCAnYWRkcmVzczInLCAnY2l0eScsICdzdGF0ZScsICd6aXAnLCAnY291bnRyeUlEJ107XG4gIG1vZGVsOiBhbnk7XG4gIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG4gIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuICBmb2N1c2VkOiBhbnkgPSB7fTtcbiAgaW52YWxpZDogYW55ID0ge307XG4gIGRpc2FibGVkOiBhbnkgPSB7fTtcbiAgaW52YWxpZE1heGxlbmd0aDogYW55ID0ge307XG4gIHZhbGlkOiBhbnkgPSB7fTtcbiAgc3RhdGVPcHRpb25zOiBhbnk7XG4gIHRvb2x0aXA6IGFueSA9IHt9O1xuICBpbml0Q29tcGxldGUgPSBmYWxzZTtcbiAgQE91dHB1dCgpXG4gIGNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBmb2N1czogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBibHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIHZhbGlkaXR5Q2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghdGhpcy5jb25maWcpIHtcbiAgICAgIHRoaXMuY29uZmlnID0ge307XG4gICAgfVxuICAgIGlmICh0aGlzLm1vZGVsKSB7XG4gICAgICB0aGlzLndyaXRlVmFsdWUodGhpcy5tb2RlbCk7XG4gICAgICB0aGlzLnVwZGF0ZUNvbnRyb2woKTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLm1vZGVsKSB7XG4gICAgICB0aGlzLm1vZGVsID0ge307XG4gICAgfVxuICAgIHRoaXMuaW5pdENvbmZpZygpO1xuICAgIGlmIChIZWxwZXJzLmlzQmxhbmsodGhpcy5tb2RlbC5jb3VudHJ5SUQpKSB7XG4gICAgICB0aGlzLnVwZGF0ZVN0YXRlcygpO1xuICAgIH1cbiAgfVxuXG4gIGluaXRDb25maWcoKTogdm9pZCB7XG4gICAgdGhpcy5maWVsZExpc3QuZm9yRWFjaCgoZmllbGQ6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKCF0aGlzLmNvbmZpZy5oYXNPd25Qcm9wZXJ0eShmaWVsZCkpIHtcbiAgICAgICAgdGhpcy5jb25maWdbZmllbGRdID0ge1xuICAgICAgICAgIGhpZGRlbjogdHJ1ZSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5jb25maWdbZmllbGRdLmhhc093blByb3BlcnR5KCdsYWJlbCcpKSB7XG4gICAgICAgIHRoaXMuY29uZmlnW2ZpZWxkXS5sYWJlbCA9IHRoaXMubGFiZWxzW2ZpZWxkXTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmNvbmZpZy5yZXF1aXJlZCkge1xuICAgICAgICB0aGlzLmNvbmZpZ1tmaWVsZF0ucmVxdWlyZWQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuY29uZmlnW2ZpZWxkXS5yZWFkT25seSB8fCB0aGlzLmNvbmZpZy5yZWFkT25seSkge1xuICAgICAgICB0aGlzLmNvbmZpZ1tmaWVsZF0ucmVhZE9ubHkgPSB0cnVlO1xuICAgICAgICB0aGlzLmRpc2FibGVkW2ZpZWxkXSA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoZmllbGQgPT09ICdjb3VudHJ5SUQnKSB7XG4gICAgICAgIGlmICghdGhpcy5jb25maWdbZmllbGRdLnBpY2tlckNvbmZpZykge1xuICAgICAgICAgIHRoaXMuY29uZmlnLmNvdW50cnlJRC5waWNrZXJDb25maWcgPSB0aGlzLmdldERlZmF1bHRDb3VudHJ5Q29uZmlnKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25maWdbZmllbGRdLnBpY2tlckNvbmZpZy5kZWZhdWx0T3B0aW9ucyA9IHRoaXMuY29uZmlnLmNvdW50cnlJRC5waWNrZXJDb25maWcub3B0aW9ucztcbiAgICAgIH1cbiAgICAgIGlmIChmaWVsZCA9PT0gJ3N0YXRlJykge1xuICAgICAgICBpZiAoIXRoaXMuY29uZmlnW2ZpZWxkXS5waWNrZXJDb25maWcpIHtcbiAgICAgICAgICB0aGlzLmNvbmZpZy5zdGF0ZS5waWNrZXJDb25maWcgPSB0aGlzLmdldERlZmF1bHRTdGF0ZUNvbmZpZygpO1xuICAgICAgICAgIHRoaXMuY29uZmlnW2ZpZWxkXS5waWNrZXJDb25maWcuZGVmYXVsdE9wdGlvbnMgPSB0aGlzLmNvbmZpZ1tmaWVsZF0ucGlja2VyQ29uZmlnLm9wdGlvbnM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGF0ZU9wdGlvbnMgPSB0aGlzLmNvbmZpZ1tmaWVsZF0ucGlja2VyQ29uZmlnLm9wdGlvbnM7XG4gICAgICAgIHRoaXMuY29uZmlnW2ZpZWxkXS5waWNrZXJDb25maWcub3B0aW9ucyA9IChxdWVyeSA9ICcnKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGVPcHRpb25zKHF1ZXJ5LCB0aGlzLm1vZGVsLmNvdW50cnlJRCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY29uZmlnW2ZpZWxkXS5waWNrZXJDb25maWcuZGVmYXVsdE9wdGlvbnMgPSB0aGlzLnN0YXRlT3B0aW9ucztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGlzVmFsaWQoZmllbGQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGxldCB2YWxpZCA9IHRydWU7XG4gICAgaWYgKFxuICAgICAgKCh0aGlzLmNvbmZpZ1tmaWVsZF0ucmVxdWlyZWQgJiYgKEhlbHBlcnMuaXNCbGFuayh0aGlzLm1vZGVsW2ZpZWxkXSkgfHwgSGVscGVycy5pc0VtcHR5KHRoaXMubW9kZWxbZmllbGRdKSkpIHx8XG4gICAgICAgICF0aGlzLmNvbmZpZ1tmaWVsZF0ucmVxdWlyZWQpICYmXG4gICAgICAhKGZpZWxkID09PSAnY291bnRyeUlEJyAmJiB0aGlzLmNvbmZpZ1tmaWVsZF0ucmVxdWlyZWQgJiYgIUhlbHBlcnMuaXNCbGFuayh0aGlzLm1vZGVsLmNvdW50cnlJRCkpICYmXG4gICAgICAhKFxuICAgICAgICBmaWVsZCA9PT0gJ3N0YXRlJyAmJlxuICAgICAgICB0aGlzLmNvbmZpZ1tmaWVsZF0ucmVxdWlyZWQgJiZcbiAgICAgICAgKCFIZWxwZXJzLmlzRW1wdHkodGhpcy5tb2RlbC5zdGF0ZSkgfHxcbiAgICAgICAgICAoKEhlbHBlcnMuaXNCbGFuayh0aGlzLm1vZGVsLnN0YXRlKSB8fCBIZWxwZXJzLmlzRW1wdHkodGhpcy5tb2RlbC5zdGF0ZSkpICYmXG4gICAgICAgICAgICAhSGVscGVycy5pc0JsYW5rKHRoaXMubW9kZWwuY291bnRyeU5hbWUpICYmXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5zdGF0ZS5waWNrZXJDb25maWcgJiZcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLnN0YXRlLnBpY2tlckNvbmZpZy5kZWZhdWx0T3B0aW9ucyAmJlxuICAgICAgICAgICAgdGhpcy5jb25maWcuc3RhdGUucGlja2VyQ29uZmlnLmRlZmF1bHRPcHRpb25zLmxlbmd0aCA9PT0gMCkpXG4gICAgICApXG4gICAgKSB7XG4gICAgICB2YWxpZCA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICAhSGVscGVycy5pc0VtcHR5KHRoaXMubW9kZWxbZmllbGRdKSAmJlxuICAgICAgIUhlbHBlcnMuaXNCbGFuayh0aGlzLmNvbmZpZ1tmaWVsZF0ubWF4bGVuZ3RoKSAmJlxuICAgICAgdGhpcy5jb25maWdbZmllbGRdLm1heGxlbmd0aCA8IHRoaXMubW9kZWxbZmllbGRdLmxlbmd0aFxuICAgICkge1xuICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy52YWxpZFtmaWVsZF0gPSB2YWxpZDtcbiAgfVxuXG4gIGlzSW52YWxpZChmaWVsZDogc3RyaW5nKTogdm9pZCB7XG4gICAgbGV0IGludmFsaWQgPSBmYWxzZTtcbiAgICBsZXQgaW52YWxpZE1heGxlbmd0aCA9IGZhbHNlO1xuICAgIGlmIChcbiAgICAgIChmaWVsZCAhPT0gJ2NvdW50cnlJRCcgJiZcbiAgICAgICAgZmllbGQgIT09ICdzdGF0ZScgJiZcbiAgICAgICAgdGhpcy5jb25maWdbZmllbGRdLnJlcXVpcmVkICYmXG4gICAgICAgIEhlbHBlcnMuaXNFbXB0eSh0aGlzLm1vZGVsW2ZpZWxkXSkgJiZcbiAgICAgICAgIUhlbHBlcnMuaXNCbGFuayh0aGlzLm1vZGVsW2ZpZWxkXSkpIHx8XG4gICAgICAoZmllbGQgPT09ICdjb3VudHJ5SUQnICYmIHRoaXMuY29uZmlnW2ZpZWxkXS5yZXF1aXJlZCAmJiBIZWxwZXJzLmlzQmxhbmsodGhpcy5tb2RlbC5jb3VudHJ5TmFtZSkgJiYgdGhpcy5jb25maWdbZmllbGRdLnVwZGF0ZWQpIHx8XG4gICAgICAoZmllbGQgPT09ICdzdGF0ZScgJiZcbiAgICAgICAgdGhpcy5jb25maWdbZmllbGRdLnJlcXVpcmVkICYmXG4gICAgICAgIChIZWxwZXJzLmlzQmxhbmsodGhpcy5tb2RlbC5zdGF0ZSkgfHwgSGVscGVycy5pc0VtcHR5KHRoaXMubW9kZWwuc3RhdGUpKSAmJlxuICAgICAgICAhSGVscGVycy5pc0JsYW5rKHRoaXMubW9kZWwuY291bnRyeUlEKSAmJlxuICAgICAgICB0aGlzLmNvbmZpZ1tmaWVsZF0udXBkYXRlZCAmJlxuICAgICAgICB0aGlzLmNvbmZpZy5zdGF0ZS5waWNrZXJDb25maWcgJiZcbiAgICAgICAgdGhpcy5jb25maWcuc3RhdGUucGlja2VyQ29uZmlnLmRlZmF1bHRPcHRpb25zICYmXG4gICAgICAgIHRoaXMuY29uZmlnLnN0YXRlLnBpY2tlckNvbmZpZy5kZWZhdWx0T3B0aW9ucy5sZW5ndGggPiAwKVxuICAgICkge1xuICAgICAgaW52YWxpZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgICFIZWxwZXJzLmlzRW1wdHkodGhpcy5tb2RlbFtmaWVsZF0pICYmXG4gICAgICAhSGVscGVycy5pc0JsYW5rKHRoaXMuY29uZmlnW2ZpZWxkXS5tYXhsZW5ndGgpICYmXG4gICAgICB0aGlzLmNvbmZpZ1tmaWVsZF0ubWF4bGVuZ3RoIDwgdGhpcy5tb2RlbFtmaWVsZF0ubGVuZ3RoXG4gICAgKSB7XG4gICAgICBpbnZhbGlkID0gdHJ1ZTtcbiAgICAgIGludmFsaWRNYXhsZW5ndGggPSB0cnVlO1xuICAgIH1cbiAgICB0aGlzLmludmFsaWRbZmllbGRdID0gaW52YWxpZDtcbiAgICB0aGlzLmludmFsaWRNYXhsZW5ndGhbZmllbGRdID0gaW52YWxpZE1heGxlbmd0aDtcbiAgfVxuXG4gIG9uSW5wdXQoZXZlbnQ6IEV2ZW50LCBmaWVsZDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5pc0ludmFsaWQoZmllbGQpO1xuICAgIHRoaXMuaXNWYWxpZChmaWVsZCk7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICB0aGlzLmNoYW5nZS5lbWl0KHsgdmFsdWU6IHRoaXMubW9kZWxbZmllbGRdLCBmaWVsZCB9KTtcbiAgICB9XG4gIH1cblxuICBpc0ZvY3VzZWQoZXZlbnQ6IEV2ZW50LCBmaWVsZDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5mb2N1c2VkW2ZpZWxkXSA9IHRydWU7XG4gICAgdGhpcy5mb2N1cy5lbWl0KHsgZXZlbnQsIGZpZWxkIH0pO1xuICB9XG5cbiAgaXNCbHVycmVkKGV2ZW50OiBFdmVudCwgZmllbGQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuZm9jdXNlZFtmaWVsZF0gPSBmYWxzZTtcbiAgICB0aGlzLmJsdXIuZW1pdCh7IGV2ZW50LCBmaWVsZCB9KTtcbiAgfVxuXG4gIG9uQ291bnRyeUNoYW5nZShldnQpIHtcbiAgICBjb25zdCBjb3VudHJ5OiBhbnkgPSBldnQgJiYgZXZ0LnJhd1ZhbHVlID8gZXZ0LnJhd1ZhbHVlIDogbnVsbDtcbiAgICBsZXQgZmllbGQ6IGFueTtcbiAgICBsZXQgc3RhdGVzVXBkYXRhYmxlID0gZmFsc2U7XG4gICAgdGhpcy5jb25maWcuY291bnRyeUlELnVwZGF0ZWQgPSB0cnVlO1xuICAgIGlmICh0aGlzLmNvbmZpZy5jb3VudHJ5SUQucGlja2VyQ29uZmlnKSB7XG4gICAgICBmaWVsZCA9IHRoaXMuY29uZmlnLmNvdW50cnlJRC5waWNrZXJDb25maWcuZmllbGQ7XG4gICAgfVxuICAgIGlmIChjb3VudHJ5ICYmIGZpZWxkICYmICFIZWxwZXJzLmlzQmxhbmsoY291bnRyeVtmaWVsZF0pICYmIHRoaXMubW9kZWwuY291bnRyeUlEICE9PSBjb3VudHJ5W2ZpZWxkXSkge1xuICAgICAgdGhpcy5tb2RlbC5jb3VudHJ5SUQgPSBjb3VudHJ5W2ZpZWxkXTtcbiAgICAgIHRoaXMubW9kZWwuY291bnRyeU5hbWUgPSBIZWxwZXJzLmludGVycG9sYXRlKHRoaXMuY29uZmlnLmNvdW50cnlJRC5waWNrZXJDb25maWcuZm9ybWF0LCBjb3VudHJ5KTtcbiAgICAgIHRoaXMuZGlzYWJsZWQuc3RhdGUgPSBmYWxzZTtcbiAgICAgIHRoaXMudG9vbHRpcC5zdGF0ZSA9IHVuZGVmaW5lZDtcbiAgICAgIHN0YXRlc1VwZGF0YWJsZSA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChIZWxwZXJzLmlzQmxhbmsoY291bnRyeSkgfHwgSGVscGVycy5pc0JsYW5rKGNvdW50cnlbZmllbGRdKSkge1xuICAgICAgdGhpcy5tb2RlbC5jb3VudHJ5SUQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLm1vZGVsLmNvdW50cnlOYW1lID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kaXNhYmxlZC5zdGF0ZSA9IHRydWU7XG4gICAgICB0aGlzLnRvb2x0aXAuc3RhdGUgPSB0aGlzLmxhYmVscy5zZWxlY3RDb3VudHJ5Rmlyc3Q7XG4gICAgICB0aGlzLmludmFsaWQuc3RhdGUgPSBmYWxzZTtcbiAgICAgIHN0YXRlc1VwZGF0YWJsZSA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gVXBkYXRlIHN0YXRlXG4gICAgaWYgKHN0YXRlc1VwZGF0YWJsZSkge1xuICAgICAgdGhpcy5tb2RlbC5zdGF0ZSA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMudXBkYXRlU3RhdGVzKCk7XG4gICAgfVxuICAgIHRoaXMudXBkYXRlQ29udHJvbCgpO1xuICAgIHRoaXMub25JbnB1dChudWxsLCAnY291bnRyeUlEJyk7XG4gICAgdGhpcy5vbklucHV0KG51bGwsICdzdGF0ZScpO1xuICB9XG5cbiAgb25TdGF0ZUNoYW5nZShldnQpIHtcbiAgICBjb25zdCBzdGF0ZTogYW55ID0gZXZ0ICYmIGV2dC52YWx1ZSA/IGV2dC52YWx1ZSA6IG51bGw7XG4gICAgdGhpcy5jb25maWcuc3RhdGUudXBkYXRlZCA9IHRydWU7XG4gICAgdGhpcy5tb2RlbC5zdGF0ZSA9IHN0YXRlO1xuICAgIHRoaXMudXBkYXRlQ29udHJvbCgpO1xuICAgIHRoaXMub25JbnB1dChudWxsLCAnc3RhdGUnKTtcbiAgfVxuXG4gIHNldFN0YXRlTGFiZWwobW9kZWw6IGFueSkge1xuICAgIGNvbnN0IHN0YXRlOiBzdHJpbmcgPSBtb2RlbC5zdGF0ZTtcbiAgICBpZiAoIUhlbHBlcnMuaXNCbGFuayhzdGF0ZSkpIHtcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5zdGF0ZS5yZXF1aXJlZCkge1xuICAgICAgICB0aGlzLnZhbGlkLnN0YXRlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMubW9kZWwuc3RhdGUgPSBzdGF0ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb2RlbC5zdGF0ZSA9IHVuZGVmaW5lZDtcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5zdGF0ZS5yZXF1aXJlZCkge1xuICAgICAgICB0aGlzLnZhbGlkLnN0YXRlID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlU3RhdGVzKCkge1xuICAgIGlmICh0aGlzLmNvbmZpZy5zdGF0ZS5waWNrZXJDb25maWcub3B0aW9ucyAmJiAhSGVscGVycy5pc0JsYW5rKHRoaXMubW9kZWwuY291bnRyeUlEKSkge1xuICAgICAgdGhpcy5jb25maWcuc3RhdGUucGlja2VyQ29uZmlnLm9wdGlvbnMgPSAocXVlcnkgPSAnJykgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZU9wdGlvbnMocXVlcnksIHRoaXMubW9kZWwuY291bnRyeUlEKTtcbiAgICAgIH07XG4gICAgICB0aGlzLnN0YXRlT3B0aW9ucygnJywgdGhpcy5tb2RlbC5jb3VudHJ5SUQpLnRoZW4oKHJlc3VsdHMpID0+IHtcbiAgICAgICAgdGhpcy5jb25maWcuc3RhdGUucGlja2VyQ29uZmlnLmRlZmF1bHRPcHRpb25zID0gcmVzdWx0cztcbiAgICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy50b29sdGlwLnN0YXRlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIHRoaXMuZGlzYWJsZWQuc3RhdGUgPSB0aGlzLl9yZWFkT25seTtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlTGFiZWwodGhpcy5tb2RlbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5kaXNhYmxlZC5zdGF0ZSA9IHRydWU7XG4gICAgICAgICAgdGhpcy50b29sdGlwLnN0YXRlID0gdGhpcy5sYWJlbHMubm9TdGF0ZXNGb3JDb3VudHJ5O1xuICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5zdGF0ZS5yZXF1aXJlZCkge1xuICAgICAgICAgICAgdGhpcy52YWxpZC5zdGF0ZSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMudmFsaWRpdHlDaGFuZ2UuZW1pdCgpO1xuICAgICAgICB0aGlzLm9uSW5wdXQobnVsbCwgJ3N0YXRlJyk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb25maWcuc3RhdGUucGlja2VyQ29uZmlnLmRlZmF1bHRPcHRpb25zID0gW107XG4gICAgICB0aGlzLmRpc2FibGVkLnN0YXRlID0gdHJ1ZTtcbiAgICAgIHRoaXMudG9vbHRpcC5zdGF0ZSA9IHRoaXMubGFiZWxzLnNlbGVjdENvdW50cnlGaXJzdDtcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5zdGF0ZS5yZXF1aXJlZCkge1xuICAgICAgICB0aGlzLnZhbGlkLnN0YXRlID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0U3RhdGVPcHRpb25zKGZpbHRlciA9ICcnLCBjb3VudHJ5SUQ6IG51bWJlcikge1xuICAgIGlmIChjb3VudHJ5SUQpIHtcbiAgICAgIGNvbnN0IGNvdW50cnkgPSBmaW5kQnlDb3VudHJ5SWQoY291bnRyeUlEKTtcbiAgICAgIGNvbnN0IHN0YXRlcyA9IGdldFN0YXRlcyhjb3VudHJ5Lm5hbWUpO1xuICAgICAgaWYgKGZpbHRlcikge1xuICAgICAgICByZXR1cm4gc3RhdGVzLmZpbHRlcigobmFtZSkgPT4gbmV3IFJlZ0V4cChgJHtmaWx0ZXJ9YCwgJ2dpJykudGVzdChuYW1lKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RhdGVzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlQ29udHJvbCgpIHtcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy5tb2RlbCk7XG4gICAgdGhpcy5vbklucHV0KG51bGwsICdjb3VudHJ5SUQnKTtcbiAgICB0aGlzLm9uSW5wdXQobnVsbCwgJ3N0YXRlJyk7XG4gIH1cblxuICB3cml0ZVZhbHVlKG1vZGVsKSB7XG4gICAgbGV0IGxvYWRpbmdDb3VudHJpZXMgPSBmYWxzZTtcbiAgICBpZiAobW9kZWwpIHtcbiAgICAgIGxldCBjb3VudHJ5TmFtZTtcbiAgICAgIGlmIChtb2RlbC5jb3VudHJ5TmFtZSAmJiBtb2RlbC5jb3VudHJ5SUQpIHtcbiAgICAgICAgY291bnRyeU5hbWUgPSBtb2RlbC5jb3VudHJ5TmFtZTtcbiAgICAgIH0gZWxzZSBpZiAobW9kZWwuY291bnRyeUlEKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5jb3VudHJ5SUQucGlja2VyQ29uZmlnICYmIHRoaXMuY29uZmlnLmNvdW50cnlJRC5waWNrZXJDb25maWcuZ2V0TGFiZWxzKSB7XG4gICAgICAgICAgaWYgKEhlbHBlcnMuaXNGdW5jdGlvbih0aGlzLmNvbmZpZy5jb3VudHJ5SUQucGlja2VyQ29uZmlnLmdldExhYmVscykpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLmNvbmZpZy5jb3VudHJ5SUQucGlja2VyQ29uZmlnLmdldExhYmVscyhtb2RlbC5jb3VudHJ5SUQpO1xuICAgICAgICAgICAgbG9hZGluZ0NvdW50cmllcyA9IHRydWU7XG4gICAgICAgICAgICBpZiAocHJvbWlzZS50aGVuKSB7XG4gICAgICAgICAgICAgIHByb21pc2UudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgbG9hZGluZ0NvdW50cmllcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvdW50cnlOYW1lID0gSGVscGVycy5pbnRlcnBvbGF0ZVdpdGhGYWxsYmFjayh0aGlzLmNvbmZpZy5jb3VudHJ5SUQucGlja2VyQ29uZmlnLmZvcm1hdCwgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsID0gT2JqZWN0LmFzc2lnbihtb2RlbCwgeyBjb3VudHJ5TmFtZSB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlcygpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChjb3VudHJ5TmFtZSkge1xuICAgICAgICBjb3VudHJ5TmFtZSA9IGNvdW50cnlOYW1lLnRyaW0oKTtcbiAgICAgICAgbW9kZWwuc3RhdGUgPSBtb2RlbC5zdGF0ZSB8fCAnJztcbiAgICAgICAgdGhpcy5tb2RlbCA9IE9iamVjdC5hc3NpZ24obW9kZWwsIHsgY291bnRyeU5hbWUgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG4gICAgICB9XG4gICAgICBpZiAoIWxvYWRpbmdDb3VudHJpZXMgJiYgIUhlbHBlcnMuaXNCbGFuayh0aGlzLm1vZGVsLmNvdW50cnlJRCkpIHtcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZXMoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5maWVsZExpc3QuZm9yRWFjaCgoZmllbGQ6IHN0cmluZykgPT4ge1xuICAgICAgdGhpcy5vbklucHV0KG51bGwsIGZpZWxkKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gIH1cblxuICBwcml2YXRlIGdldERlZmF1bHRTdGF0ZUNvbmZpZygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZmllbGQ6ICd2YWx1ZScsXG4gICAgICBmb3JtYXQ6ICckbGFiZWwnLFxuICAgICAgb3B0aW9uczogKHF1ZXJ5ID0gJycsIGNvdW50cnlJRCkgPT4ge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuZ2V0U3RhdGVPcHRpb25zKHF1ZXJ5LCBjb3VudHJ5SUQpKTtcbiAgICAgIH0sXG4gICAgICBnZXRMYWJlbHM6IChzdGF0ZTogc3RyaW5nKSA9PiB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoc3RhdGUpO1xuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXREZWZhdWx0Q291bnRyeUNvbmZpZygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZmllbGQ6ICd2YWx1ZScsXG4gICAgICBmb3JtYXQ6ICckbGFiZWwnLFxuICAgICAgb3B0aW9uczogKHF1ZXJ5ID0gJycpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgbGV0IGNvdW50cmllcyA9IENPVU5UUklFUztcbiAgICAgICAgICBpZiAocXVlcnkpIHtcbiAgICAgICAgICAgIGNvdW50cmllcyA9IGNvdW50cmllcy5maWx0ZXIoKGNvdW50cnkpID0+IG5ldyBSZWdFeHAoYCR7cXVlcnl9YCwgJ2dpJykudGVzdChjb3VudHJ5Lm5hbWUpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUoY291bnRyaWVzLm1hcCgoY291bnRyeSkgPT4gKHsgdmFsdWU6IGNvdW50cnkuaWQsIGxhYmVsOiBjb3VudHJ5Lm5hbWUgfSkpKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgZ2V0TGFiZWxzOiAoY291bnRyeUlEKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZTogYW55KSA9PiB7XG4gICAgICAgICAgY29uc3QgY291bnRyeTogYW55ID0gZmluZEJ5Q291bnRyeUlkKGNvdW50cnlJRCk7XG4gICAgICAgICAgaWYgKGNvdW50cnkpIHtcbiAgICAgICAgICAgIHJlc29sdmUoeyB2YWx1ZTogY291bnRyeS5pZCwgbGFiZWw6IGNvdW50cnkubmFtZSB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZSgnJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxufVxuIl19
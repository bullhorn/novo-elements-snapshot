// NG2
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NovoLabelService } from 'novo-elements/services';
import { COUNTRIES, findByCountryId, getStates, Helpers } from 'novo-elements/utils';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "novo-elements/components/picker";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
import * as i5 from "novo-elements/components/tooltip";
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
  `, isInline: true, styles: [":host{display:flex;flex-flow:row wrap;align-items:center}:host.ng-touched.ng-invalid:not(.ng-pristine):not(.novo-control-container) .street-address.invalid input,:host.ng-touched.ng-invalid:not(.ng-pristine):not(.novo-control-container) .street-address.invalid novo-select div[type=button],:host.ng-touched.ng-invalid:not(.ng-pristine):not(.novo-control-container) .apt.invalid input,:host.ng-touched.ng-invalid:not(.ng-pristine):not(.novo-control-container) .apt.invalid novo-select div[type=button],:host.ng-touched.ng-invalid:not(.ng-pristine):not(.novo-control-container) .city.invalid input,:host.ng-touched.ng-invalid:not(.ng-pristine):not(.novo-control-container) .city.invalid novo-select div[type=button],:host.ng-touched.ng-invalid:not(.ng-pristine):not(.novo-control-container) .state.invalid input,:host.ng-touched.ng-invalid:not(.ng-pristine):not(.novo-control-container) .state.invalid novo-select div[type=button],:host.ng-touched.ng-invalid:not(.ng-pristine):not(.novo-control-container) .zip.invalid input,:host.ng-touched.ng-invalid:not(.ng-pristine):not(.novo-control-container) .zip.invalid novo-select div[type=button],:host.ng-touched.ng-invalid:not(.ng-pristine):not(.novo-control-container) .country-name.invalid input,:host.ng-touched.ng-invalid:not(.ng-pristine):not(.novo-control-container) .country-name.invalid novo-select div[type=button]{border-bottom:1px solid var(--color-error)!important}:host novo-picker i{padding:0 5px}:host input{min-width:10px}:host .street-address,:host .apt,:host .city,:host .state,:host .zip,:host .country-name{display:flex;flex-direction:row;justify-content:space-between;align-items:flex-end}:host .street-address input.invalid,:host .apt input.invalid,:host .city input.invalid,:host .state input.invalid,:host .zip input.invalid,:host .country-name input.invalid{border-bottom:1px solid var(--color-error)}:host .street-address{flex:3 3 75%;padding:0 0 5px!important}:host .street-address.disabled{padding:0 2px 5px 0!important}:host .apt{flex:1 1 25%;padding:0 0 5px!important;align-self:flex-end}:host .city{flex:2 2 28%;padding:5px 0!important}:host .city.disabled{padding:5px 2px 5px 0!important}:host .state{flex:1 1 30%;align-items:center}:host .state.disabled{padding-right:2px}:host .state>div{padding:19px 29px 17px 0!important}:host .zip{flex:1 0 19.4%;padding:5px 0!important}:host .country-name{flex:4 4 100%;padding:10px 0 0!important}:host .disabled{pointer-events:none}:host .disabled i.required-indicator.bhi-circle,:host .disabled i.required-indicator.bhi-check{display:none!important}:host .disabled input{border-bottom-style:dashed!important}:host .disabled input::-moz-placeholder{color:var(--color-placeholder)!important}:host .disabled input::placeholder{color:var(--color-placeholder)!important}:host-context([layout=vertical]) .street-address:hover:not(.invalid) i.required-indicator.bhi-circle,:host-context([layout=vertical]) .street-address:hover:not(.invalid) i.required-indicator.bhi-check,:host-context([layout=vertical]) .apt:hover:not(.invalid) i.required-indicator.bhi-circle,:host-context([layout=vertical]) .apt:hover:not(.invalid) i.required-indicator.bhi-check,:host-context([layout=vertical]) .city:hover:not(.invalid) i.required-indicator.bhi-circle,:host-context([layout=vertical]) .city:hover:not(.invalid) i.required-indicator.bhi-check,:host-context([layout=vertical]) .state:hover:not(.invalid) i.required-indicator.bhi-circle,:host-context([layout=vertical]) .state:hover:not(.invalid) i.required-indicator.bhi-check,:host-context([layout=vertical]) .zip:hover:not(.invalid) i.required-indicator.bhi-circle,:host-context([layout=vertical]) .zip:hover:not(.invalid) i.required-indicator.bhi-check,:host-context([layout=vertical]) .country-name:hover:not(.invalid) i.required-indicator.bhi-circle,:host-context([layout=vertical]) .country-name:hover:not(.invalid) i.required-indicator.bhi-check{border-bottom:1px solid var(--color-border)}:host-context([layout=vertical]) .street-address.focus:not(.invalid) i.required-indicator.bhi-circle,:host-context([layout=vertical]) .street-address.focus:not(.invalid) i.required-indicator.bhi-check,:host-context([layout=vertical]) .apt.focus:not(.invalid) i.required-indicator.bhi-circle,:host-context([layout=vertical]) .apt.focus:not(.invalid) i.required-indicator.bhi-check,:host-context([layout=vertical]) .city.focus:not(.invalid) i.required-indicator.bhi-circle,:host-context([layout=vertical]) .city.focus:not(.invalid) i.required-indicator.bhi-check,:host-context([layout=vertical]) .state.focus:not(.invalid) i.required-indicator.bhi-circle,:host-context([layout=vertical]) .state.focus:not(.invalid) i.required-indicator.bhi-check,:host-context([layout=vertical]) .zip.focus:not(.invalid) i.required-indicator.bhi-circle,:host-context([layout=vertical]) .zip.focus:not(.invalid) i.required-indicator.bhi-check,:host-context([layout=vertical]) .country-name.focus:not(.invalid) i.required-indicator.bhi-circle,:host-context([layout=vertical]) .country-name.focus:not(.invalid) i.required-indicator.bhi-check{border-bottom:1px solid var(--color-selection)}:host-context([layout=vertical]) i.required-indicator{height:19px;width:20px;display:flex;border-bottom:1px solid var(--color-border);margin-right:0;margin-top:0;align-self:flex-end}:host-context([layout=vertical]) i.required-indicator.bhi-circle{height:15px}:host-context([layout=vertical]) .invalid i.required-indicator,:host-context([layout=vertical]) .invalid i.required-indicator{border-bottom:1px solid var(--color-error)}\n"], components: [{ type: i2.NovoPickerElement, selector: "novo-picker", inputs: ["config", "placeholder", "clearValueOnSelect", "closeOnSelect", "selected", "appendToBody", "parentScrollSelector", "parentScrollAction", "containerClass", "side", "appearance", "autoSelectFirstOption", "overrideElement", "disablePickerInput"], outputs: ["changed", "select", "focus", "blur", "typing"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i4.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i4.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i5.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipActive", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAddressElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-address', providers: [ADDRESS_VALUE_ACCESSOR], template: `
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
  `, styles: [":host{display:flex;flex-flow:row wrap;align-items:center}:host.ng-touched.ng-invalid:not(.ng-pristine):not(.novo-control-container) .street-address.invalid input,:host.ng-touched.ng-invalid:not(.ng-pristine):not(.novo-control-container) .street-address.invalid novo-select div[type=button],:host.ng-touched.ng-invalid:not(.ng-pristine):not(.novo-control-container) .apt.invalid input,:host.ng-touched.ng-invalid:not(.ng-pristine):not(.novo-control-container) .apt.invalid novo-select div[type=button],:host.ng-touched.ng-invalid:not(.ng-pristine):not(.novo-control-container) .city.invalid input,:host.ng-touched.ng-invalid:not(.ng-pristine):not(.novo-control-container) .city.invalid novo-select div[type=button],:host.ng-touched.ng-invalid:not(.ng-pristine):not(.novo-control-container) .state.invalid input,:host.ng-touched.ng-invalid:not(.ng-pristine):not(.novo-control-container) .state.invalid novo-select div[type=button],:host.ng-touched.ng-invalid:not(.ng-pristine):not(.novo-control-container) .zip.invalid input,:host.ng-touched.ng-invalid:not(.ng-pristine):not(.novo-control-container) .zip.invalid novo-select div[type=button],:host.ng-touched.ng-invalid:not(.ng-pristine):not(.novo-control-container) .country-name.invalid input,:host.ng-touched.ng-invalid:not(.ng-pristine):not(.novo-control-container) .country-name.invalid novo-select div[type=button]{border-bottom:1px solid var(--color-error)!important}:host novo-picker i{padding:0 5px}:host input{min-width:10px}:host .street-address,:host .apt,:host .city,:host .state,:host .zip,:host .country-name{display:flex;flex-direction:row;justify-content:space-between;align-items:flex-end}:host .street-address input.invalid,:host .apt input.invalid,:host .city input.invalid,:host .state input.invalid,:host .zip input.invalid,:host .country-name input.invalid{border-bottom:1px solid var(--color-error)}:host .street-address{flex:3 3 75%;padding:0 0 5px!important}:host .street-address.disabled{padding:0 2px 5px 0!important}:host .apt{flex:1 1 25%;padding:0 0 5px!important;align-self:flex-end}:host .city{flex:2 2 28%;padding:5px 0!important}:host .city.disabled{padding:5px 2px 5px 0!important}:host .state{flex:1 1 30%;align-items:center}:host .state.disabled{padding-right:2px}:host .state>div{padding:19px 29px 17px 0!important}:host .zip{flex:1 0 19.4%;padding:5px 0!important}:host .country-name{flex:4 4 100%;padding:10px 0 0!important}:host .disabled{pointer-events:none}:host .disabled i.required-indicator.bhi-circle,:host .disabled i.required-indicator.bhi-check{display:none!important}:host .disabled input{border-bottom-style:dashed!important}:host .disabled input::-moz-placeholder{color:var(--color-placeholder)!important}:host .disabled input::placeholder{color:var(--color-placeholder)!important}:host-context([layout=vertical]) .street-address:hover:not(.invalid) i.required-indicator.bhi-circle,:host-context([layout=vertical]) .street-address:hover:not(.invalid) i.required-indicator.bhi-check,:host-context([layout=vertical]) .apt:hover:not(.invalid) i.required-indicator.bhi-circle,:host-context([layout=vertical]) .apt:hover:not(.invalid) i.required-indicator.bhi-check,:host-context([layout=vertical]) .city:hover:not(.invalid) i.required-indicator.bhi-circle,:host-context([layout=vertical]) .city:hover:not(.invalid) i.required-indicator.bhi-check,:host-context([layout=vertical]) .state:hover:not(.invalid) i.required-indicator.bhi-circle,:host-context([layout=vertical]) .state:hover:not(.invalid) i.required-indicator.bhi-check,:host-context([layout=vertical]) .zip:hover:not(.invalid) i.required-indicator.bhi-circle,:host-context([layout=vertical]) .zip:hover:not(.invalid) i.required-indicator.bhi-check,:host-context([layout=vertical]) .country-name:hover:not(.invalid) i.required-indicator.bhi-circle,:host-context([layout=vertical]) .country-name:hover:not(.invalid) i.required-indicator.bhi-check{border-bottom:1px solid var(--color-border)}:host-context([layout=vertical]) .street-address.focus:not(.invalid) i.required-indicator.bhi-circle,:host-context([layout=vertical]) .street-address.focus:not(.invalid) i.required-indicator.bhi-check,:host-context([layout=vertical]) .apt.focus:not(.invalid) i.required-indicator.bhi-circle,:host-context([layout=vertical]) .apt.focus:not(.invalid) i.required-indicator.bhi-check,:host-context([layout=vertical]) .city.focus:not(.invalid) i.required-indicator.bhi-circle,:host-context([layout=vertical]) .city.focus:not(.invalid) i.required-indicator.bhi-check,:host-context([layout=vertical]) .state.focus:not(.invalid) i.required-indicator.bhi-circle,:host-context([layout=vertical]) .state.focus:not(.invalid) i.required-indicator.bhi-check,:host-context([layout=vertical]) .zip.focus:not(.invalid) i.required-indicator.bhi-circle,:host-context([layout=vertical]) .zip.focus:not(.invalid) i.required-indicator.bhi-check,:host-context([layout=vertical]) .country-name.focus:not(.invalid) i.required-indicator.bhi-circle,:host-context([layout=vertical]) .country-name.focus:not(.invalid) i.required-indicator.bhi-check{border-bottom:1px solid var(--color-selection)}:host-context([layout=vertical]) i.required-indicator{height:19px;width:20px;display:flex;border-bottom:1px solid var(--color-border);margin-right:0;margin-top:0;align-self:flex-end}:host-context([layout=vertical]) i.required-indicator.bhi-circle{height:15px}:host-context([layout=vertical]) .invalid i.required-indicator,:host-context([layout=vertical]) .invalid i.required-indicator{border-bottom:1px solid var(--color-error)}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvZm9ybS9leHRyYXMvYWRkcmVzcy9hZGRyZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7O0FBRXJGLHNEQUFzRDtBQUN0RCxNQUFNLHNCQUFzQixHQUFHO0lBQzdCLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztJQUNqRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFnTEYsTUFBTSxPQUFPLGtCQUFrQjtJQXVDN0IsWUFBbUIsTUFBd0I7UUFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFwQ25DLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFjMUIsV0FBTSxHQUFlLEVBQUUsQ0FBQztRQUN4QixjQUFTLEdBQWtCLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQztRQUV6RixrQkFBYSxHQUFhLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUNuQyxtQkFBYyxHQUFhLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUNwQyxZQUFPLEdBQVEsRUFBRSxDQUFDO1FBQ2xCLFlBQU8s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cnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBDT1VOVFJJRVMsIGZpbmRCeUNvdW50cnlJZCwgZ2V0U3RhdGVzLCBIZWxwZXJzIH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5cbi8vIFZhbHVlIGFjY2Vzc29yIGZvciB0aGUgY29tcG9uZW50IChzdXBwb3J0cyBuZ01vZGVsKVxuY29uc3QgQUREUkVTU19WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdm9BZGRyZXNzRWxlbWVudCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuZXhwb3J0IGludGVyZmFjZSBOb3ZvQWRkcmVzc1N1YmZpZWxkQ29uZmlnIHtcbiAgbGFiZWw6IHN0cmluZztcbiAgcmVxdWlyZWQ6IGJvb2xlYW47XG4gIG1heGxlbmd0aDogbnVtYmVyO1xuICBwaWNrZXJDb25maWc/OiBhbnk7XG4gIGhpZGRlbjogYm9vbGVhbjtcbiAgdXBkYXRlZD86IGJvb2xlYW47XG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOb3ZvQWRkcmVzc0NvbmZpZyB7XG4gIHJlcXVpcmVkPzogYm9vbGVhbjtcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xuICBhZGRyZXNzMT86IE5vdm9BZGRyZXNzU3ViZmllbGRDb25maWc7XG4gIGFkZHJlc3MyPzogTm92b0FkZHJlc3NTdWJmaWVsZENvbmZpZztcbiAgY2l0eT86IE5vdm9BZGRyZXNzU3ViZmllbGRDb25maWc7XG4gIHN0YXRlPzogTm92b0FkZHJlc3NTdWJmaWVsZENvbmZpZztcbiAgemlwPzogTm92b0FkZHJlc3NTdWJmaWVsZENvbmZpZztcbiAgY291bnRyeUlEPzogTm92b0FkZHJlc3NTdWJmaWVsZENvbmZpZztcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1hZGRyZXNzJyxcbiAgc3R5bGVVcmxzOiBbJy4vYWRkcmVzcy5zY3NzJ10sXG4gIHByb3ZpZGVyczogW0FERFJFU1NfVkFMVUVfQUNDRVNTT1JdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzcGFuXG4gICAgICAqbmdJZj1cIiFjb25maWc/LmFkZHJlc3MxPy5oaWRkZW5cIlxuICAgICAgY2xhc3M9XCJzdHJlZXQtYWRkcmVzc1wiXG4gICAgICBbY2xhc3MuaW52YWxpZF09XCJpbnZhbGlkLmFkZHJlc3MxXCJcbiAgICAgIFtjbGFzcy5mb2N1c109XCJmb2N1c2VkLmFkZHJlc3MxXCJcbiAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZC5hZGRyZXNzMVwiXG4gICAgPlxuICAgICAgPGlcbiAgICAgICAgKm5nSWY9XCJjb25maWcuYWRkcmVzczEucmVxdWlyZWRcIlxuICAgICAgICBjbGFzcz1cInJlcXVpcmVkLWluZGljYXRvciBhZGRyZXNzMVwiXG4gICAgICAgIFtuZ0NsYXNzXT1cInsgJ2JoaS1jaXJjbGUnOiAhdmFsaWQuYWRkcmVzczEsICdiaGktY2hlY2snOiB2YWxpZC5hZGRyZXNzMSB9XCJcbiAgICAgID5cbiAgICAgIDwvaT5cbiAgICAgIDxpbnB1dFxuICAgICAgICBbY2xhc3MubWF4bGVuZ3RoLWVycm9yXT1cImludmFsaWRNYXhsZW5ndGguYWRkcmVzczFcIlxuICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgIGlkPVwiYWRkcmVzczFcIlxuICAgICAgICBuYW1lPVwiYWRkcmVzczFcIlxuICAgICAgICBbcGxhY2Vob2xkZXJdPVwiY29uZmlnLmFkZHJlc3MxLmxhYmVsXCJcbiAgICAgICAgW21heGxlbmd0aF09XCJjb25maWc/LmFkZHJlc3MxPy5tYXhsZW5ndGhcIlxuICAgICAgICBhdXRvY29tcGxldGU9XCJzaGlwcGluZyBzdHJlZXQtYWRkcmVzcyBhZGRyZXNzLWxpbmUtMVwiXG4gICAgICAgIFsobmdNb2RlbCldPVwibW9kZWwuYWRkcmVzczFcIlxuICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJ1cGRhdGVDb250cm9sKClcIlxuICAgICAgICAoZm9jdXMpPVwiaXNGb2N1c2VkKCRldmVudCwgJ2FkZHJlc3MxJylcIlxuICAgICAgICAoYmx1cik9XCJpc0JsdXJyZWQoJGV2ZW50LCAnYWRkcmVzczEnKVwiXG4gICAgICAgIChpbnB1dCk9XCJvbklucHV0KCRldmVudCwgJ2FkZHJlc3MxJylcIlxuICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWQuYWRkcmVzczFcIlxuICAgICAgLz5cbiAgICA8L3NwYW4+XG4gICAgPHNwYW5cbiAgICAgICpuZ0lmPVwiIWNvbmZpZz8uYWRkcmVzczI/LmhpZGRlblwiXG4gICAgICBjbGFzcz1cImFwdCBzdWl0ZVwiXG4gICAgICBbY2xhc3MuaW52YWxpZF09XCJpbnZhbGlkLmFkZHJlc3MyXCJcbiAgICAgIFtjbGFzcy5mb2N1c109XCJmb2N1c2VkLmFkZHJlc3MyXCJcbiAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZC5hZGRyZXNzMlwiXG4gICAgPlxuICAgICAgPGlcbiAgICAgICAgKm5nSWY9XCJjb25maWcuYWRkcmVzczIucmVxdWlyZWRcIlxuICAgICAgICBjbGFzcz1cInJlcXVpcmVkLWluZGljYXRvciBhZGRyZXNzMlwiXG4gICAgICAgIFtuZ0NsYXNzXT1cInsgJ2JoaS1jaXJjbGUnOiAhdmFsaWQuYWRkcmVzczIsICdiaGktY2hlY2snOiB2YWxpZC5hZGRyZXNzMiB9XCJcbiAgICAgID5cbiAgICAgIDwvaT5cbiAgICAgIDxpbnB1dFxuICAgICAgICBbY2xhc3MubWF4bGVuZ3RoLWVycm9yXT1cImludmFsaWRNYXhsZW5ndGguYWRkcmVzczJcIlxuICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgIGlkPVwiYWRkcmVzczJcIlxuICAgICAgICBuYW1lPVwiYWRkcmVzczJcIlxuICAgICAgICBbcGxhY2Vob2xkZXJdPVwiY29uZmlnLmFkZHJlc3MyLmxhYmVsXCJcbiAgICAgICAgW21heGxlbmd0aF09XCJjb25maWc/LmFkZHJlc3MyPy5tYXhsZW5ndGhcIlxuICAgICAgICBhdXRvY29tcGxldGU9XCJzaGlwcGluZyBhZGRyZXNzLWxpbmUtMlwiXG4gICAgICAgIFsobmdNb2RlbCldPVwibW9kZWwuYWRkcmVzczJcIlxuICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJ1cGRhdGVDb250cm9sKClcIlxuICAgICAgICAoZm9jdXMpPVwiaXNGb2N1c2VkKCRldmVudCwgJ2FkZHJlc3MyJylcIlxuICAgICAgICAoYmx1cik9XCJpc0JsdXJyZWQoJGV2ZW50LCAnYWRkcmVzczInKVwiXG4gICAgICAgIChpbnB1dCk9XCJvbklucHV0KCRldmVudCwgJ2FkZHJlc3MyJylcIlxuICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWQuYWRkcmVzczJcIlxuICAgICAgLz5cbiAgICA8L3NwYW4+XG4gICAgPHNwYW5cbiAgICAgICpuZ0lmPVwiIWNvbmZpZz8uY2l0eT8uaGlkZGVuXCJcbiAgICAgIGNsYXNzPVwiY2l0eSBsb2NhbGl0eVwiXG4gICAgICBbY2xhc3MuaW52YWxpZF09XCJpbnZhbGlkLmNpdHlcIlxuICAgICAgW2NsYXNzLmZvY3VzXT1cImZvY3VzZWQuY2l0eVwiXG4gICAgICBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWQuY2l0eVwiXG4gICAgPlxuICAgICAgPGkgKm5nSWY9XCJjb25maWcuY2l0eS5yZXF1aXJlZFwiIGNsYXNzPVwicmVxdWlyZWQtaW5kaWNhdG9yXCIgW25nQ2xhc3NdPVwieyAnYmhpLWNpcmNsZSc6ICF2YWxpZC5jaXR5LCAnYmhpLWNoZWNrJzogdmFsaWQuY2l0eSB9XCI+IDwvaT5cbiAgICAgIDxpbnB1dFxuICAgICAgICBbY2xhc3MubWF4bGVuZ3RoLWVycm9yXT1cImludmFsaWRNYXhsZW5ndGguY2l0eVwiXG4gICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgaWQ9XCJjaXR5XCJcbiAgICAgICAgbmFtZT1cImNpdHlcIlxuICAgICAgICBbcGxhY2Vob2xkZXJdPVwiY29uZmlnLmNpdHkubGFiZWxcIlxuICAgICAgICBhdXRvY29tcGxldGU9XCJzaGlwcGluZyBjaXR5IGxvY2FsaXR5XCJcbiAgICAgICAgW21heGxlbmd0aF09XCJjb25maWc/LmNpdHk/Lm1heGxlbmd0aFwiXG4gICAgICAgIFsobmdNb2RlbCldPVwibW9kZWwuY2l0eVwiXG4gICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cInVwZGF0ZUNvbnRyb2woKVwiXG4gICAgICAgIChmb2N1cyk9XCJpc0ZvY3VzZWQoJGV2ZW50LCAnY2l0eScpXCJcbiAgICAgICAgKGJsdXIpPVwiaXNCbHVycmVkKCRldmVudCwgJ2NpdHknKVwiXG4gICAgICAgIChpbnB1dCk9XCJvbklucHV0KCRldmVudCwgJ2NpdHknKVwiXG4gICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZC5jaXR5XCJcbiAgICAgIC8+XG4gICAgPC9zcGFuPlxuICAgIDxzcGFuXG4gICAgICAqbmdJZj1cIiFjb25maWc/LnN0YXRlPy5oaWRkZW5cIlxuICAgICAgY2xhc3M9XCJzdGF0ZSByZWdpb25cIlxuICAgICAgW2NsYXNzLmludmFsaWRdPVwiaW52YWxpZC5zdGF0ZVwiXG4gICAgICBbY2xhc3MuZm9jdXNdPVwiZm9jdXNlZC5zdGF0ZVwiXG4gICAgICBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWQuc3RhdGVcIlxuICAgICAgW3Rvb2x0aXBdPVwidG9vbHRpcC5zdGF0ZVwiXG4gICAgPlxuICAgICAgPGkgKm5nSWY9XCJjb25maWcuc3RhdGUucmVxdWlyZWRcIiBjbGFzcz1cInJlcXVpcmVkLWluZGljYXRvclwiIFtuZ0NsYXNzXT1cInsgJ2JoaS1jaXJjbGUnOiAhdmFsaWQuc3RhdGUsICdiaGktY2hlY2snOiB2YWxpZC5zdGF0ZSB9XCI+IDwvaT5cbiAgICAgIDxub3ZvLXBpY2tlclxuICAgICAgICBbY29uZmlnXT1cImNvbmZpZz8uc3RhdGU/LnBpY2tlckNvbmZpZ1wiXG4gICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb25maWc/LnN0YXRlPy5sYWJlbFwiXG4gICAgICAgIChjaGFuZ2VkKT1cIm9uU3RhdGVDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgIGF1dG9jb21wbGV0ZT1cInNoaXBwaW5nIHJlZ2lvblwiXG4gICAgICAgIFsobmdNb2RlbCldPVwibW9kZWwuc3RhdGVcIlxuICAgICAgICBbZGlzYWJsZVBpY2tlcklucHV0XT1cImRpc2FibGVkLnN0YXRlXCJcbiAgICAgID48L25vdm8tcGlja2VyPlxuICAgIDwvc3Bhbj5cbiAgICA8c3BhblxuICAgICAgKm5nSWY9XCIhY29uZmlnPy56aXA/LmhpZGRlblwiXG4gICAgICBjbGFzcz1cInppcCBwb3N0YWwtY29kZVwiXG4gICAgICBbY2xhc3MuaW52YWxpZF09XCJpbnZhbGlkLnppcFwiXG4gICAgICBbY2xhc3MuZm9jdXNdPVwiZm9jdXNlZC56aXBcIlxuICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkLnppcFwiXG4gICAgPlxuICAgICAgPGkgKm5nSWY9XCJjb25maWcuemlwLnJlcXVpcmVkXCIgY2xhc3M9XCJyZXF1aXJlZC1pbmRpY2F0b3JcIiBbbmdDbGFzc109XCJ7ICdiaGktY2lyY2xlJzogIXZhbGlkLnppcCwgJ2JoaS1jaGVjayc6IHZhbGlkLnppcCB9XCI+IDwvaT5cbiAgICAgIDxpbnB1dFxuICAgICAgICBbY2xhc3MubWF4bGVuZ3RoLWVycm9yXT1cImludmFsaWRNYXhsZW5ndGguemlwXCJcbiAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICBpZD1cInppcFwiXG4gICAgICAgIG5hbWU9XCJ6aXBcIlxuICAgICAgICBbcGxhY2Vob2xkZXJdPVwiY29uZmlnLnppcC5sYWJlbFwiXG4gICAgICAgIGF1dG9jb21wbGV0ZT1cInNoaXBwaW5nIHBvc3RhbC1jb2RlXCJcbiAgICAgICAgW21heGxlbmd0aF09XCJjb25maWc/LnppcD8ubWF4bGVuZ3RoXCJcbiAgICAgICAgWyhuZ01vZGVsKV09XCJtb2RlbC56aXBcIlxuICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJ1cGRhdGVDb250cm9sKClcIlxuICAgICAgICAoZm9jdXMpPVwiaXNGb2N1c2VkKCRldmVudCwgJ3ppcCcpXCJcbiAgICAgICAgKGJsdXIpPVwiaXNCbHVycmVkKCRldmVudCwgJ3ppcCcpXCJcbiAgICAgICAgKGlucHV0KT1cIm9uSW5wdXQoJGV2ZW50LCAnemlwJylcIlxuICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWQuemlwXCJcbiAgICAgIC8+XG4gICAgPC9zcGFuPlxuICAgIDxzcGFuXG4gICAgICAqbmdJZj1cIiFjb25maWc/LmNvdW50cnlJRD8uaGlkZGVuXCJcbiAgICAgIGNsYXNzPVwiY291bnRyeS1uYW1lXCJcbiAgICAgIFtjbGFzcy5pbnZhbGlkXT1cImludmFsaWQuY291bnRyeUlEXCJcbiAgICAgIFtjbGFzcy5mb2N1c109XCJmb2N1c2VkLmNvdW50cnlJRFwiXG4gICAgICBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWQuY291bnRyeUlEXCJcbiAgICA+XG4gICAgICA8aVxuICAgICAgICAqbmdJZj1cImNvbmZpZy5jb3VudHJ5SUQucmVxdWlyZWRcIlxuICAgICAgICBjbGFzcz1cInJlcXVpcmVkLWluZGljYXRvclwiXG4gICAgICAgIFtuZ0NsYXNzXT1cInsgJ2JoaS1jaXJjbGUnOiAhdmFsaWQuY291bnRyeUlELCAnYmhpLWNoZWNrJzogdmFsaWQuY291bnRyeUlEIH1cIlxuICAgICAgPlxuICAgICAgPC9pPlxuICAgICAgPG5vdm8tcGlja2VyXG4gICAgICAgIFtjb25maWddPVwiY29uZmlnPy5jb3VudHJ5SUQ/LnBpY2tlckNvbmZpZ1wiXG4gICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb25maWcuY291bnRyeUlELmxhYmVsXCJcbiAgICAgICAgKGNoYW5nZWQpPVwib25Db3VudHJ5Q2hhbmdlKCRldmVudClcIlxuICAgICAgICBhdXRvY29tcGxldGU9XCJzaGlwcGluZyBjb3VudHJ5XCJcbiAgICAgICAgWyhuZ01vZGVsKV09XCJtb2RlbC5jb3VudHJ5SURcIlxuICAgICAgICBbZGlzYWJsZVBpY2tlcklucHV0XT1cImRpc2FibGVkLmNvdW50cnlJRFwiXG4gICAgICA+PC9ub3ZvLXBpY2tlcj5cbiAgICA8L3NwYW4+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9BZGRyZXNzRWxlbWVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQge1xuICBASW5wdXQoKVxuICBjb25maWc6IE5vdm9BZGRyZXNzQ29uZmlnO1xuICBwcml2YXRlIF9yZWFkT25seSA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBzZXQgcmVhZE9ubHkocmVhZE9ubHk6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZWFkT25seSA9IHJlYWRPbmx5O1xuICAgIHRoaXMuZmllbGRMaXN0LmZvckVhY2goKGZpZWxkOiBzdHJpbmcpID0+IHtcbiAgICAgIHRoaXMuZGlzYWJsZWRbZmllbGRdID0gdGhpcy5fcmVhZE9ubHk7XG4gICAgfSk7XG4gICAgaWYgKHRoaXMubW9kZWwpIHtcbiAgICAgIHRoaXMudXBkYXRlU3RhdGVzKCk7XG4gICAgfVxuICB9XG4gIGdldCByZWFkT25seSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fcmVhZE9ubHk7XG4gIH1cbiAgc3RhdGVzOiBBcnJheTxhbnk+ID0gW107XG4gIGZpZWxkTGlzdDogQXJyYXk8c3RyaW5nPiA9IFsnYWRkcmVzczEnLCAnYWRkcmVzczInLCAnY2l0eScsICdzdGF0ZScsICd6aXAnLCAnY291bnRyeUlEJ107XG4gIG1vZGVsOiBhbnk7XG4gIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG4gIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuICBmb2N1c2VkOiBhbnkgPSB7fTtcbiAgaW52YWxpZDogYW55ID0ge307XG4gIGRpc2FibGVkOiBhbnkgPSB7fTtcbiAgaW52YWxpZE1heGxlbmd0aDogYW55ID0ge307XG4gIHZhbGlkOiBhbnkgPSB7fTtcbiAgc3RhdGVPcHRpb25zOiBhbnk7XG4gIHRvb2x0aXA6IGFueSA9IHt9O1xuICBpbml0Q29tcGxldGUgPSBmYWxzZTtcbiAgQE91dHB1dCgpXG4gIGNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBmb2N1czogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBibHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIHZhbGlkaXR5Q2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghdGhpcy5jb25maWcpIHtcbiAgICAgIHRoaXMuY29uZmlnID0ge307XG4gICAgfVxuICAgIHRoaXMuaW5pdENvbmZpZygpO1xuICAgIGlmICh0aGlzLm1vZGVsKSB7XG4gICAgICB0aGlzLndyaXRlVmFsdWUodGhpcy5tb2RlbCk7XG4gICAgICB0aGlzLnVwZGF0ZUNvbnRyb2woKTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLm1vZGVsKSB7XG4gICAgICB0aGlzLm1vZGVsID0ge307XG4gICAgfVxuICAgIGlmIChIZWxwZXJzLmlzQmxhbmsodGhpcy5tb2RlbC5jb3VudHJ5SUQpKSB7XG4gICAgICB0aGlzLnVwZGF0ZVN0YXRlcygpO1xuICAgIH1cbiAgfVxuXG4gIGluaXRDb25maWcoKTogdm9pZCB7XG4gICAgdGhpcy5maWVsZExpc3QuZm9yRWFjaCgoZmllbGQ6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKCF0aGlzLmNvbmZpZy5oYXNPd25Qcm9wZXJ0eShmaWVsZCkpIHtcbiAgICAgICAgdGhpcy5jb25maWdbZmllbGRdID0ge1xuICAgICAgICAgIGhpZGRlbjogdHJ1ZSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5jb25maWdbZmllbGRdLmhhc093blByb3BlcnR5KCdsYWJlbCcpKSB7XG4gICAgICAgIHRoaXMuY29uZmlnW2ZpZWxkXS5sYWJlbCA9IHRoaXMubGFiZWxzW2ZpZWxkXTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmNvbmZpZy5yZXF1aXJlZCkge1xuICAgICAgICB0aGlzLmNvbmZpZ1tmaWVsZF0ucmVxdWlyZWQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuY29uZmlnW2ZpZWxkXS5yZWFkT25seSB8fCB0aGlzLmNvbmZpZy5yZWFkT25seSkge1xuICAgICAgICB0aGlzLmNvbmZpZ1tmaWVsZF0ucmVhZE9ubHkgPSB0cnVlO1xuICAgICAgICB0aGlzLmRpc2FibGVkW2ZpZWxkXSA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoZmllbGQgPT09ICdjb3VudHJ5SUQnKSB7XG4gICAgICAgIGlmICghdGhpcy5jb25maWdbZmllbGRdLnBpY2tlckNvbmZpZykge1xuICAgICAgICAgIHRoaXMuY29uZmlnLmNvdW50cnlJRC5waWNrZXJDb25maWcgPSB0aGlzLmdldERlZmF1bHRDb3VudHJ5Q29uZmlnKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25maWdbZmllbGRdLnBpY2tlckNvbmZpZy5kZWZhdWx0T3B0aW9ucyA9IHRoaXMuY29uZmlnLmNvdW50cnlJRC5waWNrZXJDb25maWcub3B0aW9ucztcbiAgICAgIH1cbiAgICAgIGlmIChmaWVsZCA9PT0gJ3N0YXRlJykge1xuICAgICAgICBpZiAoIXRoaXMuY29uZmlnW2ZpZWxkXS5waWNrZXJDb25maWcpIHtcbiAgICAgICAgICB0aGlzLmNvbmZpZy5zdGF0ZS5waWNrZXJDb25maWcgPSB0aGlzLmdldERlZmF1bHRTdGF0ZUNvbmZpZygpO1xuICAgICAgICAgIHRoaXMuY29uZmlnW2ZpZWxkXS5waWNrZXJDb25maWcuZGVmYXVsdE9wdGlvbnMgPSB0aGlzLmNvbmZpZ1tmaWVsZF0ucGlja2VyQ29uZmlnLm9wdGlvbnM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGF0ZU9wdGlvbnMgPSB0aGlzLmNvbmZpZ1tmaWVsZF0ucGlja2VyQ29uZmlnLm9wdGlvbnM7XG4gICAgICAgIHRoaXMuY29uZmlnW2ZpZWxkXS5waWNrZXJDb25maWcub3B0aW9ucyA9IChxdWVyeSA9ICcnKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGVPcHRpb25zKHF1ZXJ5LCB0aGlzLm1vZGVsLmNvdW50cnlJRCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY29uZmlnW2ZpZWxkXS5waWNrZXJDb25maWcuZGVmYXVsdE9wdGlvbnMgPSB0aGlzLnN0YXRlT3B0aW9ucztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGlzVmFsaWQoZmllbGQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGxldCB2YWxpZCA9IHRydWU7XG4gICAgaWYgKFxuICAgICAgKCh0aGlzLmNvbmZpZ1tmaWVsZF0ucmVxdWlyZWQgJiYgKEhlbHBlcnMuaXNCbGFuayh0aGlzLm1vZGVsW2ZpZWxkXSkgfHwgSGVscGVycy5pc0VtcHR5KHRoaXMubW9kZWxbZmllbGRdKSkpIHx8XG4gICAgICAgICF0aGlzLmNvbmZpZ1tmaWVsZF0ucmVxdWlyZWQpICYmXG4gICAgICAhKGZpZWxkID09PSAnY291bnRyeUlEJyAmJiB0aGlzLmNvbmZpZ1tmaWVsZF0ucmVxdWlyZWQgJiYgIUhlbHBlcnMuaXNCbGFuayh0aGlzLm1vZGVsLmNvdW50cnlJRCkpICYmXG4gICAgICAhKFxuICAgICAgICBmaWVsZCA9PT0gJ3N0YXRlJyAmJlxuICAgICAgICB0aGlzLmNvbmZpZ1tmaWVsZF0ucmVxdWlyZWQgJiZcbiAgICAgICAgKCFIZWxwZXJzLmlzRW1wdHkodGhpcy5tb2RlbC5zdGF0ZSkgfHxcbiAgICAgICAgICAoKEhlbHBlcnMuaXNCbGFuayh0aGlzLm1vZGVsLnN0YXRlKSB8fCBIZWxwZXJzLmlzRW1wdHkodGhpcy5tb2RlbC5zdGF0ZSkpICYmXG4gICAgICAgICAgICAhSGVscGVycy5pc0JsYW5rKHRoaXMubW9kZWwuY291bnRyeU5hbWUpICYmXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5zdGF0ZS5waWNrZXJDb25maWcgJiZcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLnN0YXRlLnBpY2tlckNvbmZpZy5kZWZhdWx0T3B0aW9ucyAmJlxuICAgICAgICAgICAgdGhpcy5jb25maWcuc3RhdGUucGlja2VyQ29uZmlnLmRlZmF1bHRPcHRpb25zLmxlbmd0aCA9PT0gMCkpXG4gICAgICApXG4gICAgKSB7XG4gICAgICB2YWxpZCA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICAhSGVscGVycy5pc0VtcHR5KHRoaXMubW9kZWxbZmllbGRdKSAmJlxuICAgICAgIUhlbHBlcnMuaXNCbGFuayh0aGlzLmNvbmZpZ1tmaWVsZF0ubWF4bGVuZ3RoKSAmJlxuICAgICAgdGhpcy5jb25maWdbZmllbGRdLm1heGxlbmd0aCA8IHRoaXMubW9kZWxbZmllbGRdLmxlbmd0aFxuICAgICkge1xuICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy52YWxpZFtmaWVsZF0gPSB2YWxpZDtcbiAgfVxuXG4gIGlzSW52YWxpZChmaWVsZDogc3RyaW5nKTogdm9pZCB7XG4gICAgbGV0IGludmFsaWQgPSBmYWxzZTtcbiAgICBsZXQgaW52YWxpZE1heGxlbmd0aCA9IGZhbHNlO1xuICAgIGlmIChcbiAgICAgIChmaWVsZCAhPT0gJ2NvdW50cnlJRCcgJiZcbiAgICAgICAgZmllbGQgIT09ICdzdGF0ZScgJiZcbiAgICAgICAgdGhpcy5jb25maWdbZmllbGRdPy5yZXF1aXJlZCAmJlxuICAgICAgICBIZWxwZXJzLmlzRW1wdHkodGhpcy5tb2RlbFtmaWVsZF0pICYmXG4gICAgICAgICFIZWxwZXJzLmlzQmxhbmsodGhpcy5tb2RlbFtmaWVsZF0pKSB8fFxuICAgICAgKGZpZWxkID09PSAnY291bnRyeUlEJyAmJiB0aGlzLmNvbmZpZ1tmaWVsZF0/LnJlcXVpcmVkICYmIEhlbHBlcnMuaXNCbGFuayh0aGlzLm1vZGVsLmNvdW50cnlOYW1lKSAmJiB0aGlzLmNvbmZpZ1tmaWVsZF0/LnVwZGF0ZWQpIHx8XG4gICAgICAoZmllbGQgPT09ICdzdGF0ZScgJiZcbiAgICAgICAgdGhpcy5jb25maWdbZmllbGRdPy5yZXF1aXJlZCAmJlxuICAgICAgICAoSGVscGVycy5pc0JsYW5rKHRoaXMubW9kZWwuc3RhdGUpIHx8IEhlbHBlcnMuaXNFbXB0eSh0aGlzLm1vZGVsLnN0YXRlKSkgJiZcbiAgICAgICAgIUhlbHBlcnMuaXNCbGFuayh0aGlzLm1vZGVsLmNvdW50cnlJRCkgJiZcbiAgICAgICAgdGhpcy5jb25maWdbZmllbGRdPy51cGRhdGVkICYmXG4gICAgICAgIHRoaXMuY29uZmlnLnN0YXRlLnBpY2tlckNvbmZpZyAmJlxuICAgICAgICB0aGlzLmNvbmZpZy5zdGF0ZS5waWNrZXJDb25maWcuZGVmYXVsdE9wdGlvbnMgJiZcbiAgICAgICAgdGhpcy5jb25maWcuc3RhdGUucGlja2VyQ29uZmlnLmRlZmF1bHRPcHRpb25zLmxlbmd0aCA+IDApXG4gICAgKSB7XG4gICAgICBpbnZhbGlkID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgIUhlbHBlcnMuaXNFbXB0eSh0aGlzLm1vZGVsW2ZpZWxkXSkgJiZcbiAgICAgICFIZWxwZXJzLmlzQmxhbmsodGhpcy5jb25maWdbZmllbGRdPy5tYXhsZW5ndGgpICYmXG4gICAgICB0aGlzLmNvbmZpZ1tmaWVsZF0/Lm1heGxlbmd0aCA8IHRoaXMubW9kZWxbZmllbGRdLmxlbmd0aFxuICAgICkge1xuICAgICAgaW52YWxpZCA9IHRydWU7XG4gICAgICBpbnZhbGlkTWF4bGVuZ3RoID0gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy5pbnZhbGlkW2ZpZWxkXSA9IGludmFsaWQ7XG4gICAgdGhpcy5pbnZhbGlkTWF4bGVuZ3RoW2ZpZWxkXSA9IGludmFsaWRNYXhsZW5ndGg7XG4gIH1cblxuICBvbklucHV0KGV2ZW50OiBFdmVudCwgZmllbGQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuaXNJbnZhbGlkKGZpZWxkKTtcbiAgICB0aGlzLmlzVmFsaWQoZmllbGQpO1xuICAgIGlmIChldmVudCkge1xuICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh7IHZhbHVlOiB0aGlzLm1vZGVsW2ZpZWxkXSwgZmllbGQgfSk7XG4gICAgfVxuICB9XG5cbiAgaXNGb2N1c2VkKGV2ZW50OiBFdmVudCwgZmllbGQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuZm9jdXNlZFtmaWVsZF0gPSB0cnVlO1xuICAgIHRoaXMuZm9jdXMuZW1pdCh7IGV2ZW50LCBmaWVsZCB9KTtcbiAgfVxuXG4gIGlzQmx1cnJlZChldmVudDogRXZlbnQsIGZpZWxkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmZvY3VzZWRbZmllbGRdID0gZmFsc2U7XG4gICAgdGhpcy5ibHVyLmVtaXQoeyBldmVudCwgZmllbGQgfSk7XG4gIH1cblxuICBvbkNvdW50cnlDaGFuZ2UoZXZ0KSB7XG4gICAgY29uc3QgY291bnRyeTogYW55ID0gZXZ0ICYmIGV2dC5yYXdWYWx1ZSA/IGV2dC5yYXdWYWx1ZSA6IG51bGw7XG4gICAgbGV0IGZpZWxkOiBhbnk7XG4gICAgbGV0IHN0YXRlc1VwZGF0YWJsZSA9IGZhbHNlO1xuICAgIHRoaXMuY29uZmlnLmNvdW50cnlJRC51cGRhdGVkID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5jb25maWcuY291bnRyeUlELnBpY2tlckNvbmZpZykge1xuICAgICAgZmllbGQgPSB0aGlzLmNvbmZpZy5jb3VudHJ5SUQucGlja2VyQ29uZmlnLmZpZWxkO1xuICAgIH1cbiAgICBpZiAoY291bnRyeSAmJiBmaWVsZCAmJiAhSGVscGVycy5pc0JsYW5rKGNvdW50cnlbZmllbGRdKSAmJiB0aGlzLm1vZGVsLmNvdW50cnlJRCAhPT0gY291bnRyeVtmaWVsZF0pIHtcbiAgICAgIHRoaXMubW9kZWwuY291bnRyeUlEID0gY291bnRyeVtmaWVsZF07XG4gICAgICB0aGlzLm1vZGVsLmNvdW50cnlOYW1lID0gSGVscGVycy5pbnRlcnBvbGF0ZSh0aGlzLmNvbmZpZy5jb3VudHJ5SUQucGlja2VyQ29uZmlnLmZvcm1hdCwgY291bnRyeSk7XG4gICAgICB0aGlzLmRpc2FibGVkLnN0YXRlID0gZmFsc2U7XG4gICAgICB0aGlzLnRvb2x0aXAuc3RhdGUgPSB1bmRlZmluZWQ7XG4gICAgICBzdGF0ZXNVcGRhdGFibGUgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoSGVscGVycy5pc0JsYW5rKGNvdW50cnkpIHx8IEhlbHBlcnMuaXNCbGFuayhjb3VudHJ5W2ZpZWxkXSkpIHtcbiAgICAgIHRoaXMubW9kZWwuY291bnRyeUlEID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5tb2RlbC5jb3VudHJ5TmFtZSA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZGlzYWJsZWQuc3RhdGUgPSB0cnVlO1xuICAgICAgdGhpcy50b29sdGlwLnN0YXRlID0gdGhpcy5sYWJlbHMuc2VsZWN0Q291bnRyeUZpcnN0O1xuICAgICAgdGhpcy5pbnZhbGlkLnN0YXRlID0gZmFsc2U7XG4gICAgICBzdGF0ZXNVcGRhdGFibGUgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIFVwZGF0ZSBzdGF0ZVxuICAgIGlmIChzdGF0ZXNVcGRhdGFibGUpIHtcbiAgICAgIHRoaXMubW9kZWwuc3RhdGUgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLnVwZGF0ZVN0YXRlcygpO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZUNvbnRyb2woKTtcbiAgICB0aGlzLm9uSW5wdXQobnVsbCwgJ2NvdW50cnlJRCcpO1xuICAgIHRoaXMub25JbnB1dChudWxsLCAnc3RhdGUnKTtcbiAgfVxuXG4gIG9uU3RhdGVDaGFuZ2UoZXZ0KSB7XG4gICAgY29uc3Qgc3RhdGU6IGFueSA9IGV2dCAmJiBldnQudmFsdWUgPyBldnQudmFsdWUgOiBudWxsO1xuICAgIHRoaXMuY29uZmlnLnN0YXRlLnVwZGF0ZWQgPSB0cnVlO1xuICAgIHRoaXMubW9kZWwuc3RhdGUgPSBzdGF0ZTtcbiAgICB0aGlzLnVwZGF0ZUNvbnRyb2woKTtcbiAgICB0aGlzLm9uSW5wdXQobnVsbCwgJ3N0YXRlJyk7XG4gIH1cblxuICBzZXRTdGF0ZUxhYmVsKG1vZGVsOiBhbnkpIHtcbiAgICBjb25zdCBzdGF0ZTogc3RyaW5nID0gbW9kZWwuc3RhdGU7XG4gICAgaWYgKCFIZWxwZXJzLmlzQmxhbmsoc3RhdGUpKSB7XG4gICAgICBpZiAodGhpcy5jb25maWcuc3RhdGUucmVxdWlyZWQpIHtcbiAgICAgICAgdGhpcy52YWxpZC5zdGF0ZSA9IHRydWU7XG4gICAgICB9XG4gICAgICB0aGlzLm1vZGVsLnN0YXRlID0gc3RhdGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW9kZWwuc3RhdGUgPSB1bmRlZmluZWQ7XG4gICAgICBpZiAodGhpcy5jb25maWcuc3RhdGUucmVxdWlyZWQpIHtcbiAgICAgICAgdGhpcy52YWxpZC5zdGF0ZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVN0YXRlcygpIHtcbiAgICBpZiAodGhpcy5jb25maWcuc3RhdGUucGlja2VyQ29uZmlnLm9wdGlvbnMgJiYgIUhlbHBlcnMuaXNCbGFuayh0aGlzLm1vZGVsLmNvdW50cnlJRCkpIHtcbiAgICAgIHRoaXMuY29uZmlnLnN0YXRlLnBpY2tlckNvbmZpZy5vcHRpb25zID0gKHF1ZXJ5ID0gJycpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGVPcHRpb25zKHF1ZXJ5LCB0aGlzLm1vZGVsLmNvdW50cnlJRCk7XG4gICAgICB9O1xuICAgICAgdGhpcy5zdGF0ZU9wdGlvbnMoJycsIHRoaXMubW9kZWwuY291bnRyeUlEKS50aGVuKChyZXN1bHRzKSA9PiB7XG4gICAgICAgIHRoaXMuY29uZmlnLnN0YXRlLnBpY2tlckNvbmZpZy5kZWZhdWx0T3B0aW9ucyA9IHJlc3VsdHM7XG4gICAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMudG9vbHRpcC5zdGF0ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB0aGlzLmRpc2FibGVkLnN0YXRlID0gdGhpcy5fcmVhZE9ubHk7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZUxhYmVsKHRoaXMubW9kZWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZGlzYWJsZWQuc3RhdGUgPSB0cnVlO1xuICAgICAgICAgIHRoaXMudG9vbHRpcC5zdGF0ZSA9IHRoaXMubGFiZWxzLm5vU3RhdGVzRm9yQ291bnRyeTtcbiAgICAgICAgICBpZiAodGhpcy5jb25maWcuc3RhdGUucmVxdWlyZWQpIHtcbiAgICAgICAgICAgIHRoaXMudmFsaWQuc3RhdGUgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZhbGlkaXR5Q2hhbmdlLmVtaXQoKTtcbiAgICAgICAgdGhpcy5vbklucHV0KG51bGwsICdzdGF0ZScpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29uZmlnLnN0YXRlLnBpY2tlckNvbmZpZy5kZWZhdWx0T3B0aW9ucyA9IFtdO1xuICAgICAgdGhpcy5kaXNhYmxlZC5zdGF0ZSA9IHRydWU7XG4gICAgICB0aGlzLnRvb2x0aXAuc3RhdGUgPSB0aGlzLmxhYmVscy5zZWxlY3RDb3VudHJ5Rmlyc3Q7XG4gICAgICBpZiAodGhpcy5jb25maWcuc3RhdGUucmVxdWlyZWQpIHtcbiAgICAgICAgdGhpcy52YWxpZC5zdGF0ZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldFN0YXRlT3B0aW9ucyhmaWx0ZXIgPSAnJywgY291bnRyeUlEOiBudW1iZXIpIHtcbiAgICBpZiAoY291bnRyeUlEKSB7XG4gICAgICBjb25zdCBjb3VudHJ5ID0gZmluZEJ5Q291bnRyeUlkKGNvdW50cnlJRCk7XG4gICAgICBjb25zdCBzdGF0ZXMgPSBnZXRTdGF0ZXMoY291bnRyeS5uYW1lKTtcbiAgICAgIGlmIChmaWx0ZXIpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlcy5maWx0ZXIoKG5hbWUpID0+IG5ldyBSZWdFeHAoYCR7ZmlsdGVyfWAsICdnaScpLnRlc3QobmFtZSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0YXRlcztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZUNvbnRyb2woKSB7XG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMubW9kZWwpO1xuICAgIHRoaXMub25JbnB1dChudWxsLCAnY291bnRyeUlEJyk7XG4gICAgdGhpcy5vbklucHV0KG51bGwsICdzdGF0ZScpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZShtb2RlbCkge1xuICAgIGxldCBsb2FkaW5nQ291bnRyaWVzID0gZmFsc2U7XG4gICAgaWYgKG1vZGVsKSB7XG4gICAgICBsZXQgY291bnRyeU5hbWU7XG4gICAgICBpZiAobW9kZWwuY291bnRyeU5hbWUgJiYgbW9kZWwuY291bnRyeUlEKSB7XG4gICAgICAgIGNvdW50cnlOYW1lID0gbW9kZWwuY291bnRyeU5hbWU7XG4gICAgICB9IGVsc2UgaWYgKG1vZGVsLmNvdW50cnlJRCkge1xuICAgICAgICBpZiAodGhpcy5jb25maWcuY291bnRyeUlELnBpY2tlckNvbmZpZyAmJiB0aGlzLmNvbmZpZy5jb3VudHJ5SUQucGlja2VyQ29uZmlnLmdldExhYmVscykge1xuICAgICAgICAgIGlmIChIZWxwZXJzLmlzRnVuY3Rpb24odGhpcy5jb25maWcuY291bnRyeUlELnBpY2tlckNvbmZpZy5nZXRMYWJlbHMpKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9taXNlID0gdGhpcy5jb25maWcuY291bnRyeUlELnBpY2tlckNvbmZpZy5nZXRMYWJlbHMobW9kZWwuY291bnRyeUlEKTtcbiAgICAgICAgICAgIGxvYWRpbmdDb3VudHJpZXMgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHByb21pc2UudGhlbikge1xuICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGxvYWRpbmdDb3VudHJpZXMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjb3VudHJ5TmFtZSA9IEhlbHBlcnMuaW50ZXJwb2xhdGVXaXRoRmFsbGJhY2sodGhpcy5jb25maWcuY291bnRyeUlELnBpY2tlckNvbmZpZy5mb3JtYXQsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbCA9IE9iamVjdC5hc3NpZ24obW9kZWwsIHsgY291bnRyeU5hbWUgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTdGF0ZXMoKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoY291bnRyeU5hbWUpIHtcbiAgICAgICAgY291bnRyeU5hbWUgPSBjb3VudHJ5TmFtZS50cmltKCk7XG4gICAgICAgIG1vZGVsLnN0YXRlID0gbW9kZWwuc3RhdGUgfHwgJyc7XG4gICAgICAgIHRoaXMubW9kZWwgPSBPYmplY3QuYXNzaWduKG1vZGVsLCB7IGNvdW50cnlOYW1lIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgICAgfVxuICAgICAgaWYgKCFsb2FkaW5nQ291bnRyaWVzICYmICFIZWxwZXJzLmlzQmxhbmsodGhpcy5tb2RlbC5jb3VudHJ5SUQpKSB7XG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGVzKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuZmllbGRMaXN0LmZvckVhY2goKGZpZWxkOiBzdHJpbmcpID0+IHtcbiAgICAgIHRoaXMub25JbnB1dChudWxsLCBmaWVsZCk7XG4gICAgfSk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXREZWZhdWx0U3RhdGVDb25maWcoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGZpZWxkOiAndmFsdWUnLFxuICAgICAgZm9ybWF0OiAnJGxhYmVsJyxcbiAgICAgIG9wdGlvbnM6IChxdWVyeSA9ICcnLCBjb3VudHJ5SUQpID0+IHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLmdldFN0YXRlT3B0aW9ucyhxdWVyeSwgY291bnRyeUlEKSk7XG4gICAgICB9LFxuICAgICAgZ2V0TGFiZWxzOiAoc3RhdGU6IHN0cmluZykgPT4ge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHN0YXRlKTtcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RGVmYXVsdENvdW50cnlDb25maWcoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGZpZWxkOiAndmFsdWUnLFxuICAgICAgZm9ybWF0OiAnJGxhYmVsJyxcbiAgICAgIG9wdGlvbnM6IChxdWVyeSA9ICcnKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgIGxldCBjb3VudHJpZXMgPSBDT1VOVFJJRVM7XG4gICAgICAgICAgaWYgKHF1ZXJ5KSB7XG4gICAgICAgICAgICBjb3VudHJpZXMgPSBjb3VudHJpZXMuZmlsdGVyKChjb3VudHJ5KSA9PiBuZXcgUmVnRXhwKGAke3F1ZXJ5fWAsICdnaScpLnRlc3QoY291bnRyeS5uYW1lKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXNvbHZlKGNvdW50cmllcy5tYXAoKGNvdW50cnkpID0+ICh7IHZhbHVlOiBjb3VudHJ5LmlkLCBsYWJlbDogY291bnRyeS5uYW1lIH0pKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGdldExhYmVsczogKGNvdW50cnlJRCkgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmU6IGFueSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvdW50cnk6IGFueSA9IGZpbmRCeUNvdW50cnlJZChjb3VudHJ5SUQpO1xuICAgICAgICAgIGlmIChjb3VudHJ5KSB7XG4gICAgICAgICAgICByZXNvbHZlKHsgdmFsdWU6IGNvdW50cnkuaWQsIGxhYmVsOiBjb3VudHJ5Lm5hbWUgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUoJycpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgIH07XG4gIH1cbn1cbiJdfQ==
// NG2
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// APP
import { NovoLabelService } from '../../../../services/novo-label-service';
import { COUNTRIES, findByCountryId, getStates } from '../../../../utils/countries/Countries';
import { Helpers } from '../../../../utils/Helpers';
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
        var _a, _b, _c, _d, _e, _f, _g;
        let invalid = false;
        let invalidMaxlength = false;
        if ((field !== 'countryID' &&
            field !== 'state' && ((_a = this.config[field]) === null || _a === void 0 ? void 0 : _a.required) &&
            Helpers.isEmpty(this.model[field]) &&
            !Helpers.isBlank(this.model[field])) ||
            (field === 'countryID' && ((_b = this.config[field]) === null || _b === void 0 ? void 0 : _b.required) && Helpers.isBlank(this.model.countryName) && ((_c = this.config[field]) === null || _c === void 0 ? void 0 : _c.updated)) ||
            (field === 'state' && ((_d = this.config[field]) === null || _d === void 0 ? void 0 : _d.required) &&
                (Helpers.isBlank(this.model.state) || Helpers.isEmpty(this.model.state)) &&
                !Helpers.isBlank(this.model.countryID) && ((_e = this.config[field]) === null || _e === void 0 ? void 0 : _e.updated) &&
                this.config.state.pickerConfig &&
                this.config.state.pickerConfig.defaultOptions &&
                this.config.state.pickerConfig.defaultOptions.length > 0)) {
            invalid = true;
        }
        else if (!Helpers.isEmpty(this.model[field]) &&
            !Helpers.isBlank((_f = this.config[field]) === null || _f === void 0 ? void 0 : _f.maxlength) &&
            ((_g = this.config[field]) === null || _g === void 0 ? void 0 : _g.maxlength) < this.model[field].length) {
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
NovoAddressElement.decorators = [
    { type: Component, args: [{
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
  `
            },] }
];
NovoAddressElement.ctorParameters = () => [
    { type: NovoLabelService }
];
NovoAddressElement.propDecorators = {
    config: [{ type: Input }],
    readOnly: [{ type: Input }],
    change: [{ type: Output }],
    focus: [{ type: Output }],
    blur: [{ type: Output }],
    validityChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9mb3JtL2V4dHJhcy9hZGRyZXNzL0FkZHJlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxNQUFNO0FBQ04sT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDM0UsT0FBTyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDOUYsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXBELHNEQUFzRDtBQUN0RCxNQUFNLHNCQUFzQixHQUFHO0lBQzdCLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztJQUNqRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUErS0YsTUFBTSxPQUFPLGtCQUFrQjtJQXVDN0IsWUFBbUIsTUFBd0I7UUFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFwQ25DLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFjMUIsV0FBTSxHQUFlLEVBQUUsQ0FBQztRQUN4QixjQUFTLEdBQWtCLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQztRQUV6RixrQkFBYSxHQUFhLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUNuQyxtQkFB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Q0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0YsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDO1lBQ0QsU0FBUyxFQUFFLENBQUMsU0FBUyxFQUFFLEVBQUU7Z0JBQ3ZCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFZLEVBQUUsRUFBRTtvQkFDbEMsTUFBTSxPQUFPLEdBQVEsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNoRCxJQUFJLE9BQU8sRUFBRTt3QkFDWCxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7cUJBQ3JEO3lCQUFNO3dCQUNMLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztxQkFDYjtnQkFDSCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUM7U0FDRixDQUFDO0lBQ0osQ0FBQzs7O1lBamdCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO2dCQUNuQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1KVDthQUNGOzs7WUF2TFEsZ0JBQWdCOzs7cUJBeUx0QixLQUFLO3VCQUdMLEtBQUs7cUJBMEJMLE1BQU07b0JBRU4sTUFBTTttQkFFTixNQUFNOzZCQUVOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbi8vIEFQUFxuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG5pbXBvcnQgeyBDT1VOVFJJRVMsIGZpbmRCeUNvdW50cnlJZCwgZ2V0U3RhdGVzIH0gZnJvbSAnLi4vLi4vLi4vLi4vdXRpbHMvY291bnRyaWVzL0NvdW50cmllcyc7XG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vLi4vLi4vdXRpbHMvSGVscGVycyc7XG5cbi8vIFZhbHVlIGFjY2Vzc29yIGZvciB0aGUgY29tcG9uZW50IChzdXBwb3J0cyBuZ01vZGVsKVxuY29uc3QgQUREUkVTU19WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdm9BZGRyZXNzRWxlbWVudCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuZXhwb3J0IGludGVyZmFjZSBOb3ZvQWRkcmVzc1N1YmZpZWxkQ29uZmlnIHtcbiAgbGFiZWw6IHN0cmluZztcbiAgcmVxdWlyZWQ6IGJvb2xlYW47XG4gIG1heGxlbmd0aDogbnVtYmVyO1xuICBwaWNrZXJDb25maWc/OiBhbnk7XG4gIGhpZGRlbjogYm9vbGVhbjtcbiAgdXBkYXRlZD86IGJvb2xlYW47XG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOb3ZvQWRkcmVzc0NvbmZpZyB7XG4gIHJlcXVpcmVkPzogYm9vbGVhbjtcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xuICBhZGRyZXNzMT86IE5vdm9BZGRyZXNzU3ViZmllbGRDb25maWc7XG4gIGFkZHJlc3MyPzogTm92b0FkZHJlc3NTdWJmaWVsZENvbmZpZztcbiAgY2l0eT86IE5vdm9BZGRyZXNzU3ViZmllbGRDb25maWc7XG4gIHN0YXRlPzogTm92b0FkZHJlc3NTdWJmaWVsZENvbmZpZztcbiAgemlwPzogTm92b0FkZHJlc3NTdWJmaWVsZENvbmZpZztcbiAgY291bnRyeUlEPzogTm92b0FkZHJlc3NTdWJmaWVsZENvbmZpZztcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1hZGRyZXNzJyxcbiAgcHJvdmlkZXJzOiBbQUREUkVTU19WQUxVRV9BQ0NFU1NPUl0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPHNwYW5cbiAgICAgICpuZ0lmPVwiIWNvbmZpZz8uYWRkcmVzczE/LmhpZGRlblwiXG4gICAgICBjbGFzcz1cInN0cmVldC1hZGRyZXNzXCJcbiAgICAgIFtjbGFzcy5pbnZhbGlkXT1cImludmFsaWQuYWRkcmVzczFcIlxuICAgICAgW2NsYXNzLmZvY3VzXT1cImZvY3VzZWQuYWRkcmVzczFcIlxuICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkLmFkZHJlc3MxXCJcbiAgICA+XG4gICAgICA8aVxuICAgICAgICAqbmdJZj1cImNvbmZpZy5hZGRyZXNzMS5yZXF1aXJlZFwiXG4gICAgICAgIGNsYXNzPVwicmVxdWlyZWQtaW5kaWNhdG9yIGFkZHJlc3MxXCJcbiAgICAgICAgW25nQ2xhc3NdPVwieyAnYmhpLWNpcmNsZSc6ICF2YWxpZC5hZGRyZXNzMSwgJ2JoaS1jaGVjayc6IHZhbGlkLmFkZHJlc3MxIH1cIlxuICAgICAgPlxuICAgICAgPC9pPlxuICAgICAgPGlucHV0XG4gICAgICAgIFtjbGFzcy5tYXhsZW5ndGgtZXJyb3JdPVwiaW52YWxpZE1heGxlbmd0aC5hZGRyZXNzMVwiXG4gICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgaWQ9XCJhZGRyZXNzMVwiXG4gICAgICAgIG5hbWU9XCJhZGRyZXNzMVwiXG4gICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb25maWcuYWRkcmVzczEubGFiZWxcIlxuICAgICAgICBbbWF4bGVuZ3RoXT1cImNvbmZpZz8uYWRkcmVzczE/Lm1heGxlbmd0aFwiXG4gICAgICAgIGF1dG9jb21wbGV0ZT1cInNoaXBwaW5nIHN0cmVldC1hZGRyZXNzIGFkZHJlc3MtbGluZS0xXCJcbiAgICAgICAgWyhuZ01vZGVsKV09XCJtb2RlbC5hZGRyZXNzMVwiXG4gICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cInVwZGF0ZUNvbnRyb2woKVwiXG4gICAgICAgIChmb2N1cyk9XCJpc0ZvY3VzZWQoJGV2ZW50LCAnYWRkcmVzczEnKVwiXG4gICAgICAgIChibHVyKT1cImlzQmx1cnJlZCgkZXZlbnQsICdhZGRyZXNzMScpXCJcbiAgICAgICAgKGlucHV0KT1cIm9uSW5wdXQoJGV2ZW50LCAnYWRkcmVzczEnKVwiXG4gICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZC5hZGRyZXNzMVwiXG4gICAgICAvPlxuICAgIDwvc3Bhbj5cbiAgICA8c3BhblxuICAgICAgKm5nSWY9XCIhY29uZmlnPy5hZGRyZXNzMj8uaGlkZGVuXCJcbiAgICAgIGNsYXNzPVwiYXB0IHN1aXRlXCJcbiAgICAgIFtjbGFzcy5pbnZhbGlkXT1cImludmFsaWQuYWRkcmVzczJcIlxuICAgICAgW2NsYXNzLmZvY3VzXT1cImZvY3VzZWQuYWRkcmVzczJcIlxuICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkLmFkZHJlc3MyXCJcbiAgICA+XG4gICAgICA8aVxuICAgICAgICAqbmdJZj1cImNvbmZpZy5hZGRyZXNzMi5yZXF1aXJlZFwiXG4gICAgICAgIGNsYXNzPVwicmVxdWlyZWQtaW5kaWNhdG9yIGFkZHJlc3MyXCJcbiAgICAgICAgW25nQ2xhc3NdPVwieyAnYmhpLWNpcmNsZSc6ICF2YWxpZC5hZGRyZXNzMiwgJ2JoaS1jaGVjayc6IHZhbGlkLmFkZHJlc3MyIH1cIlxuICAgICAgPlxuICAgICAgPC9pPlxuICAgICAgPGlucHV0XG4gICAgICAgIFtjbGFzcy5tYXhsZW5ndGgtZXJyb3JdPVwiaW52YWxpZE1heGxlbmd0aC5hZGRyZXNzMlwiXG4gICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgaWQ9XCJhZGRyZXNzMlwiXG4gICAgICAgIG5hbWU9XCJhZGRyZXNzMlwiXG4gICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb25maWcuYWRkcmVzczIubGFiZWxcIlxuICAgICAgICBbbWF4bGVuZ3RoXT1cImNvbmZpZz8uYWRkcmVzczI/Lm1heGxlbmd0aFwiXG4gICAgICAgIGF1dG9jb21wbGV0ZT1cInNoaXBwaW5nIGFkZHJlc3MtbGluZS0yXCJcbiAgICAgICAgWyhuZ01vZGVsKV09XCJtb2RlbC5hZGRyZXNzMlwiXG4gICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cInVwZGF0ZUNvbnRyb2woKVwiXG4gICAgICAgIChmb2N1cyk9XCJpc0ZvY3VzZWQoJGV2ZW50LCAnYWRkcmVzczInKVwiXG4gICAgICAgIChibHVyKT1cImlzQmx1cnJlZCgkZXZlbnQsICdhZGRyZXNzMicpXCJcbiAgICAgICAgKGlucHV0KT1cIm9uSW5wdXQoJGV2ZW50LCAnYWRkcmVzczInKVwiXG4gICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZC5hZGRyZXNzMlwiXG4gICAgICAvPlxuICAgIDwvc3Bhbj5cbiAgICA8c3BhblxuICAgICAgKm5nSWY9XCIhY29uZmlnPy5jaXR5Py5oaWRkZW5cIlxuICAgICAgY2xhc3M9XCJjaXR5IGxvY2FsaXR5XCJcbiAgICAgIFtjbGFzcy5pbnZhbGlkXT1cImludmFsaWQuY2l0eVwiXG4gICAgICBbY2xhc3MuZm9jdXNdPVwiZm9jdXNlZC5jaXR5XCJcbiAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZC5jaXR5XCJcbiAgICA+XG4gICAgICA8aSAqbmdJZj1cImNvbmZpZy5jaXR5LnJlcXVpcmVkXCIgY2xhc3M9XCJyZXF1aXJlZC1pbmRpY2F0b3JcIiBbbmdDbGFzc109XCJ7ICdiaGktY2lyY2xlJzogIXZhbGlkLmNpdHksICdiaGktY2hlY2snOiB2YWxpZC5jaXR5IH1cIj4gPC9pPlxuICAgICAgPGlucHV0XG4gICAgICAgIFtjbGFzcy5tYXhsZW5ndGgtZXJyb3JdPVwiaW52YWxpZE1heGxlbmd0aC5jaXR5XCJcbiAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICBpZD1cImNpdHlcIlxuICAgICAgICBuYW1lPVwiY2l0eVwiXG4gICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb25maWcuY2l0eS5sYWJlbFwiXG4gICAgICAgIGF1dG9jb21wbGV0ZT1cInNoaXBwaW5nIGNpdHkgbG9jYWxpdHlcIlxuICAgICAgICBbbWF4bGVuZ3RoXT1cImNvbmZpZz8uY2l0eT8ubWF4bGVuZ3RoXCJcbiAgICAgICAgWyhuZ01vZGVsKV09XCJtb2RlbC5jaXR5XCJcbiAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwidXBkYXRlQ29udHJvbCgpXCJcbiAgICAgICAgKGZvY3VzKT1cImlzRm9jdXNlZCgkZXZlbnQsICdjaXR5JylcIlxuICAgICAgICAoYmx1cik9XCJpc0JsdXJyZWQoJGV2ZW50LCAnY2l0eScpXCJcbiAgICAgICAgKGlucHV0KT1cIm9uSW5wdXQoJGV2ZW50LCAnY2l0eScpXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkLmNpdHlcIlxuICAgICAgLz5cbiAgICA8L3NwYW4+XG4gICAgPHNwYW5cbiAgICAgICpuZ0lmPVwiIWNvbmZpZz8uc3RhdGU/LmhpZGRlblwiXG4gICAgICBjbGFzcz1cInN0YXRlIHJlZ2lvblwiXG4gICAgICBbY2xhc3MuaW52YWxpZF09XCJpbnZhbGlkLnN0YXRlXCJcbiAgICAgIFtjbGFzcy5mb2N1c109XCJmb2N1c2VkLnN0YXRlXCJcbiAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZC5zdGF0ZVwiXG4gICAgICBbdG9vbHRpcF09XCJ0b29sdGlwLnN0YXRlXCJcbiAgICA+XG4gICAgICA8aSAqbmdJZj1cImNvbmZpZy5zdGF0ZS5yZXF1aXJlZFwiIGNsYXNzPVwicmVxdWlyZWQtaW5kaWNhdG9yXCIgW25nQ2xhc3NdPVwieyAnYmhpLWNpcmNsZSc6ICF2YWxpZC5zdGF0ZSwgJ2JoaS1jaGVjayc6IHZhbGlkLnN0YXRlIH1cIj4gPC9pPlxuICAgICAgPG5vdm8tcGlja2VyXG4gICAgICAgIFtjb25maWddPVwiY29uZmlnPy5zdGF0ZT8ucGlja2VyQ29uZmlnXCJcbiAgICAgICAgW3BsYWNlaG9sZGVyXT1cImNvbmZpZz8uc3RhdGU/LmxhYmVsXCJcbiAgICAgICAgKGNoYW5nZWQpPVwib25TdGF0ZUNoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgYXV0b2NvbXBsZXRlPVwic2hpcHBpbmcgcmVnaW9uXCJcbiAgICAgICAgWyhuZ01vZGVsKV09XCJtb2RlbC5zdGF0ZVwiXG4gICAgICAgIFtkaXNhYmxlUGlja2VySW5wdXRdPVwiZGlzYWJsZWQuc3RhdGVcIlxuICAgICAgPjwvbm92by1waWNrZXI+XG4gICAgPC9zcGFuPlxuICAgIDxzcGFuXG4gICAgICAqbmdJZj1cIiFjb25maWc/LnppcD8uaGlkZGVuXCJcbiAgICAgIGNsYXNzPVwiemlwIHBvc3RhbC1jb2RlXCJcbiAgICAgIFtjbGFzcy5pbnZhbGlkXT1cImludmFsaWQuemlwXCJcbiAgICAgIFtjbGFzcy5mb2N1c109XCJmb2N1c2VkLnppcFwiXG4gICAgICBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWQuemlwXCJcbiAgICA+XG4gICAgICA8aSAqbmdJZj1cImNvbmZpZy56aXAucmVxdWlyZWRcIiBjbGFzcz1cInJlcXVpcmVkLWluZGljYXRvclwiIFtuZ0NsYXNzXT1cInsgJ2JoaS1jaXJjbGUnOiAhdmFsaWQuemlwLCAnYmhpLWNoZWNrJzogdmFsaWQuemlwIH1cIj4gPC9pPlxuICAgICAgPGlucHV0XG4gICAgICAgIFtjbGFzcy5tYXhsZW5ndGgtZXJyb3JdPVwiaW52YWxpZE1heGxlbmd0aC56aXBcIlxuICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgIGlkPVwiemlwXCJcbiAgICAgICAgbmFtZT1cInppcFwiXG4gICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb25maWcuemlwLmxhYmVsXCJcbiAgICAgICAgYXV0b2NvbXBsZXRlPVwic2hpcHBpbmcgcG9zdGFsLWNvZGVcIlxuICAgICAgICBbbWF4bGVuZ3RoXT1cImNvbmZpZz8uemlwPy5tYXhsZW5ndGhcIlxuICAgICAgICBbKG5nTW9kZWwpXT1cIm1vZGVsLnppcFwiXG4gICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cInVwZGF0ZUNvbnRyb2woKVwiXG4gICAgICAgIChmb2N1cyk9XCJpc0ZvY3VzZWQoJGV2ZW50LCAnemlwJylcIlxuICAgICAgICAoYmx1cik9XCJpc0JsdXJyZWQoJGV2ZW50LCAnemlwJylcIlxuICAgICAgICAoaW5wdXQpPVwib25JbnB1dCgkZXZlbnQsICd6aXAnKVwiXG4gICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZC56aXBcIlxuICAgICAgLz5cbiAgICA8L3NwYW4+XG4gICAgPHNwYW5cbiAgICAgICpuZ0lmPVwiIWNvbmZpZz8uY291bnRyeUlEPy5oaWRkZW5cIlxuICAgICAgY2xhc3M9XCJjb3VudHJ5LW5hbWVcIlxuICAgICAgW2NsYXNzLmludmFsaWRdPVwiaW52YWxpZC5jb3VudHJ5SURcIlxuICAgICAgW2NsYXNzLmZvY3VzXT1cImZvY3VzZWQuY291bnRyeUlEXCJcbiAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZC5jb3VudHJ5SURcIlxuICAgID5cbiAgICAgIDxpXG4gICAgICAgICpuZ0lmPVwiY29uZmlnLmNvdW50cnlJRC5yZXF1aXJlZFwiXG4gICAgICAgIGNsYXNzPVwicmVxdWlyZWQtaW5kaWNhdG9yXCJcbiAgICAgICAgW25nQ2xhc3NdPVwieyAnYmhpLWNpcmNsZSc6ICF2YWxpZC5jb3VudHJ5SUQsICdiaGktY2hlY2snOiB2YWxpZC5jb3VudHJ5SUQgfVwiXG4gICAgICA+XG4gICAgICA8L2k+XG4gICAgICA8bm92by1waWNrZXJcbiAgICAgICAgW2NvbmZpZ109XCJjb25maWc/LmNvdW50cnlJRD8ucGlja2VyQ29uZmlnXCJcbiAgICAgICAgW3BsYWNlaG9sZGVyXT1cImNvbmZpZy5jb3VudHJ5SUQubGFiZWxcIlxuICAgICAgICAoY2hhbmdlZCk9XCJvbkNvdW50cnlDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgIGF1dG9jb21wbGV0ZT1cInNoaXBwaW5nIGNvdW50cnlcIlxuICAgICAgICBbKG5nTW9kZWwpXT1cIm1vZGVsLmNvdW50cnlJRFwiXG4gICAgICAgIFtkaXNhYmxlUGlja2VySW5wdXRdPVwiZGlzYWJsZWQuY291bnRyeUlEXCJcbiAgICAgID48L25vdm8tcGlja2VyPlxuICAgIDwvc3Bhbj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0FkZHJlc3NFbGVtZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIGNvbmZpZzogTm92b0FkZHJlc3NDb25maWc7XG4gIHByaXZhdGUgX3JlYWRPbmx5ID0gZmFsc2U7XG4gIEBJbnB1dCgpXG4gIHNldCByZWFkT25seShyZWFkT25seTogYm9vbGVhbikge1xuICAgIHRoaXMuX3JlYWRPbmx5ID0gcmVhZE9ubHk7XG4gICAgdGhpcy5maWVsZExpc3QuZm9yRWFjaCgoZmllbGQ6IHN0cmluZykgPT4ge1xuICAgICAgdGhpcy5kaXNhYmxlZFtmaWVsZF0gPSB0aGlzLl9yZWFkT25seTtcbiAgICB9KTtcbiAgICBpZiAodGhpcy5tb2RlbCkge1xuICAgICAgdGhpcy51cGRhdGVTdGF0ZXMoKTtcbiAgICB9XG4gIH1cbiAgZ2V0IHJlYWRPbmx5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9yZWFkT25seTtcbiAgfVxuICBzdGF0ZXM6IEFycmF5PGFueT4gPSBbXTtcbiAgZmllbGRMaXN0OiBBcnJheTxzdHJpbmc+ID0gWydhZGRyZXNzMScsICdhZGRyZXNzMicsICdjaXR5JywgJ3N0YXRlJywgJ3ppcCcsICdjb3VudHJ5SUQnXTtcbiAgbW9kZWw6IGFueTtcbiAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG4gIGZvY3VzZWQ6IGFueSA9IHt9O1xuICBpbnZhbGlkOiBhbnkgPSB7fTtcbiAgZGlzYWJsZWQ6IGFueSA9IHt9O1xuICBpbnZhbGlkTWF4bGVuZ3RoOiBhbnkgPSB7fTtcbiAgdmFsaWQ6IGFueSA9IHt9O1xuICBzdGF0ZU9wdGlvbnM6IGFueTtcbiAgdG9vbHRpcDogYW55ID0ge307XG4gIGluaXRDb21wbGV0ZSA9IGZhbHNlO1xuICBAT3V0cHV0KClcbiAgY2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIGZvY3VzOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgdmFsaWRpdHlDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKCF0aGlzLmNvbmZpZykge1xuICAgICAgdGhpcy5jb25maWcgPSB7fTtcbiAgICB9XG4gICAgdGhpcy5pbml0Q29uZmlnKCk7XG4gICAgaWYgKHRoaXMubW9kZWwpIHtcbiAgICAgIHRoaXMud3JpdGVWYWx1ZSh0aGlzLm1vZGVsKTtcbiAgICAgIHRoaXMudXBkYXRlQ29udHJvbCgpO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMubW9kZWwpIHtcbiAgICAgIHRoaXMubW9kZWwgPSB7fTtcbiAgICB9XG4gICAgaWYgKEhlbHBlcnMuaXNCbGFuayh0aGlzLm1vZGVsLmNvdW50cnlJRCkpIHtcbiAgICAgIHRoaXMudXBkYXRlU3RhdGVzKCk7XG4gICAgfVxuICB9XG5cbiAgaW5pdENvbmZpZygpOiB2b2lkIHtcbiAgICB0aGlzLmZpZWxkTGlzdC5mb3JFYWNoKChmaWVsZDogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuY29uZmlnLmhhc093blByb3BlcnR5KGZpZWxkKSkge1xuICAgICAgICB0aGlzLmNvbmZpZ1tmaWVsZF0gPSB7XG4gICAgICAgICAgaGlkZGVuOiB0cnVlLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLmNvbmZpZ1tmaWVsZF0uaGFzT3duUHJvcGVydHkoJ2xhYmVsJykpIHtcbiAgICAgICAgdGhpcy5jb25maWdbZmllbGRdLmxhYmVsID0gdGhpcy5sYWJlbHNbZmllbGRdO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuY29uZmlnLnJlcXVpcmVkKSB7XG4gICAgICAgIHRoaXMuY29uZmlnW2ZpZWxkXS5yZXF1aXJlZCA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5jb25maWdbZmllbGRdLnJlYWRPbmx5IHx8IHRoaXMuY29uZmlnLnJlYWRPbmx5KSB7XG4gICAgICAgIHRoaXMuY29uZmlnW2ZpZWxkXS5yZWFkT25seSA9IHRydWU7XG4gICAgICAgIHRoaXMuZGlzYWJsZWRbZmllbGRdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChmaWVsZCA9PT0gJ2NvdW50cnlJRCcpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbmZpZ1tmaWVsZF0ucGlja2VyQ29uZmlnKSB7XG4gICAgICAgICAgdGhpcy5jb25maWcuY291bnRyeUlELnBpY2tlckNvbmZpZyA9IHRoaXMuZ2V0RGVmYXVsdENvdW50cnlDb25maWcoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbmZpZ1tmaWVsZF0ucGlja2VyQ29uZmlnLmRlZmF1bHRPcHRpb25zID0gdGhpcy5jb25maWcuY291bnRyeUlELnBpY2tlckNvbmZpZy5vcHRpb25zO1xuICAgICAgfVxuICAgICAgaWYgKGZpZWxkID09PSAnc3RhdGUnKSB7XG4gICAgICAgIGlmICghdGhpcy5jb25maWdbZmllbGRdLnBpY2tlckNvbmZpZykge1xuICAgICAgICAgIHRoaXMuY29uZmlnLnN0YXRlLnBpY2tlckNvbmZpZyA9IHRoaXMuZ2V0RGVmYXVsdFN0YXRlQ29uZmlnKCk7XG4gICAgICAgICAgdGhpcy5jb25maWdbZmllbGRdLnBpY2tlckNvbmZpZy5kZWZhdWx0T3B0aW9ucyA9IHRoaXMuY29uZmlnW2ZpZWxkXS5waWNrZXJDb25maWcub3B0aW9ucztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0YXRlT3B0aW9ucyA9IHRoaXMuY29uZmlnW2ZpZWxkXS5waWNrZXJDb25maWcub3B0aW9ucztcbiAgICAgICAgdGhpcy5jb25maWdbZmllbGRdLnBpY2tlckNvbmZpZy5vcHRpb25zID0gKHF1ZXJ5ID0gJycpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZU9wdGlvbnMocXVlcnksIHRoaXMubW9kZWwuY291bnRyeUlEKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jb25maWdbZmllbGRdLnBpY2tlckNvbmZpZy5kZWZhdWx0T3B0aW9ucyA9IHRoaXMuc3RhdGVPcHRpb25zO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaXNWYWxpZChmaWVsZDogc3RyaW5nKTogdm9pZCB7XG4gICAgbGV0IHZhbGlkID0gdHJ1ZTtcbiAgICBpZiAoXG4gICAgICAoKHRoaXMuY29uZmlnW2ZpZWxkXS5yZXF1aXJlZCAmJiAoSGVscGVycy5pc0JsYW5rKHRoaXMubW9kZWxbZmllbGRdKSB8fCBIZWxwZXJzLmlzRW1wdHkodGhpcy5tb2RlbFtmaWVsZF0pKSkgfHxcbiAgICAgICAgIXRoaXMuY29uZmlnW2ZpZWxkXS5yZXF1aXJlZCkgJiZcbiAgICAgICEoZmllbGQgPT09ICdjb3VudHJ5SUQnICYmIHRoaXMuY29uZmlnW2ZpZWxkXS5yZXF1aXJlZCAmJiAhSGVscGVycy5pc0JsYW5rKHRoaXMubW9kZWwuY291bnRyeUlEKSkgJiZcbiAgICAgICEoXG4gICAgICAgIGZpZWxkID09PSAnc3RhdGUnICYmXG4gICAgICAgIHRoaXMuY29uZmlnW2ZpZWxkXS5yZXF1aXJlZCAmJlxuICAgICAgICAoIUhlbHBlcnMuaXNFbXB0eSh0aGlzLm1vZGVsLnN0YXRlKSB8fFxuICAgICAgICAgICgoSGVscGVycy5pc0JsYW5rKHRoaXMubW9kZWwuc3RhdGUpIHx8IEhlbHBlcnMuaXNFbXB0eSh0aGlzLm1vZGVsLnN0YXRlKSkgJiZcbiAgICAgICAgICAgICFIZWxwZXJzLmlzQmxhbmsodGhpcy5tb2RlbC5jb3VudHJ5TmFtZSkgJiZcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLnN0YXRlLnBpY2tlckNvbmZpZyAmJlxuICAgICAgICAgICAgdGhpcy5jb25maWcuc3RhdGUucGlja2VyQ29uZmlnLmRlZmF1bHRPcHRpb25zICYmXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5zdGF0ZS5waWNrZXJDb25maWcuZGVmYXVsdE9wdGlvbnMubGVuZ3RoID09PSAwKSlcbiAgICAgIClcbiAgICApIHtcbiAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgICFIZWxwZXJzLmlzRW1wdHkodGhpcy5tb2RlbFtmaWVsZF0pICYmXG4gICAgICAhSGVscGVycy5pc0JsYW5rKHRoaXMuY29uZmlnW2ZpZWxkXS5tYXhsZW5ndGgpICYmXG4gICAgICB0aGlzLmNvbmZpZ1tmaWVsZF0ubWF4bGVuZ3RoIDwgdGhpcy5tb2RlbFtmaWVsZF0ubGVuZ3RoXG4gICAgKSB7XG4gICAgICB2YWxpZCA9IGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLnZhbGlkW2ZpZWxkXSA9IHZhbGlkO1xuICB9XG5cbiAgaXNJbnZhbGlkKGZpZWxkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBsZXQgaW52YWxpZCA9IGZhbHNlO1xuICAgIGxldCBpbnZhbGlkTWF4bGVuZ3RoID0gZmFsc2U7XG4gICAgaWYgKFxuICAgICAgKGZpZWxkICE9PSAnY291bnRyeUlEJyAmJlxuICAgICAgICBmaWVsZCAhPT0gJ3N0YXRlJyAmJlxuICAgICAgICB0aGlzLmNvbmZpZ1tmaWVsZF0/LnJlcXVpcmVkICYmXG4gICAgICAgIEhlbHBlcnMuaXNFbXB0eSh0aGlzLm1vZGVsW2ZpZWxkXSkgJiZcbiAgICAgICAgIUhlbHBlcnMuaXNCbGFuayh0aGlzLm1vZGVsW2ZpZWxkXSkpIHx8XG4gICAgICAoZmllbGQgPT09ICdjb3VudHJ5SUQnICYmIHRoaXMuY29uZmlnW2ZpZWxkXT8ucmVxdWlyZWQgJiYgSGVscGVycy5pc0JsYW5rKHRoaXMubW9kZWwuY291bnRyeU5hbWUpICYmIHRoaXMuY29uZmlnW2ZpZWxkXT8udXBkYXRlZCkgfHxcbiAgICAgIChmaWVsZCA9PT0gJ3N0YXRlJyAmJlxuICAgICAgICB0aGlzLmNvbmZpZ1tmaWVsZF0/LnJlcXVpcmVkICYmXG4gICAgICAgIChIZWxwZXJzLmlzQmxhbmsodGhpcy5tb2RlbC5zdGF0ZSkgfHwgSGVscGVycy5pc0VtcHR5KHRoaXMubW9kZWwuc3RhdGUpKSAmJlxuICAgICAgICAhSGVscGVycy5pc0JsYW5rKHRoaXMubW9kZWwuY291bnRyeUlEKSAmJlxuICAgICAgICB0aGlzLmNvbmZpZ1tmaWVsZF0/LnVwZGF0ZWQgJiZcbiAgICAgICAgdGhpcy5jb25maWcuc3RhdGUucGlja2VyQ29uZmlnICYmXG4gICAgICAgIHRoaXMuY29uZmlnLnN0YXRlLnBpY2tlckNvbmZpZy5kZWZhdWx0T3B0aW9ucyAmJlxuICAgICAgICB0aGlzLmNvbmZpZy5zdGF0ZS5waWNrZXJDb25maWcuZGVmYXVsdE9wdGlvbnMubGVuZ3RoID4gMClcbiAgICApIHtcbiAgICAgIGludmFsaWQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICAhSGVscGVycy5pc0VtcHR5KHRoaXMubW9kZWxbZmllbGRdKSAmJlxuICAgICAgIUhlbHBlcnMuaXNCbGFuayh0aGlzLmNvbmZpZ1tmaWVsZF0/Lm1heGxlbmd0aCkgJiZcbiAgICAgIHRoaXMuY29uZmlnW2ZpZWxkXT8ubWF4bGVuZ3RoIDwgdGhpcy5tb2RlbFtmaWVsZF0ubGVuZ3RoXG4gICAgKSB7XG4gICAgICBpbnZhbGlkID0gdHJ1ZTtcbiAgICAgIGludmFsaWRNYXhsZW5ndGggPSB0cnVlO1xuICAgIH1cbiAgICB0aGlzLmludmFsaWRbZmllbGRdID0gaW52YWxpZDtcbiAgICB0aGlzLmludmFsaWRNYXhsZW5ndGhbZmllbGRdID0gaW52YWxpZE1heGxlbmd0aDtcbiAgfVxuXG4gIG9uSW5wdXQoZXZlbnQ6IEV2ZW50LCBmaWVsZDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5pc0ludmFsaWQoZmllbGQpO1xuICAgIHRoaXMuaXNWYWxpZChmaWVsZCk7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICB0aGlzLmNoYW5nZS5lbWl0KHsgdmFsdWU6IHRoaXMubW9kZWxbZmllbGRdLCBmaWVsZCB9KTtcbiAgICB9XG4gIH1cblxuICBpc0ZvY3VzZWQoZXZlbnQ6IEV2ZW50LCBmaWVsZDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5mb2N1c2VkW2ZpZWxkXSA9IHRydWU7XG4gICAgdGhpcy5mb2N1cy5lbWl0KHsgZXZlbnQsIGZpZWxkIH0pO1xuICB9XG5cbiAgaXNCbHVycmVkKGV2ZW50OiBFdmVudCwgZmllbGQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuZm9jdXNlZFtmaWVsZF0gPSBmYWxzZTtcbiAgICB0aGlzLmJsdXIuZW1pdCh7IGV2ZW50LCBmaWVsZCB9KTtcbiAgfVxuXG4gIG9uQ291bnRyeUNoYW5nZShldnQpIHtcbiAgICBjb25zdCBjb3VudHJ5OiBhbnkgPSBldnQgJiYgZXZ0LnJhd1ZhbHVlID8gZXZ0LnJhd1ZhbHVlIDogbnVsbDtcbiAgICBsZXQgZmllbGQ6IGFueTtcbiAgICBsZXQgc3RhdGVzVXBkYXRhYmxlID0gZmFsc2U7XG4gICAgdGhpcy5jb25maWcuY291bnRyeUlELnVwZGF0ZWQgPSB0cnVlO1xuICAgIGlmICh0aGlzLmNvbmZpZy5jb3VudHJ5SUQucGlja2VyQ29uZmlnKSB7XG4gICAgICBmaWVsZCA9IHRoaXMuY29uZmlnLmNvdW50cnlJRC5waWNrZXJDb25maWcuZmllbGQ7XG4gICAgfVxuICAgIGlmIChjb3VudHJ5ICYmIGZpZWxkICYmICFIZWxwZXJzLmlzQmxhbmsoY291bnRyeVtmaWVsZF0pICYmIHRoaXMubW9kZWwuY291bnRyeUlEICE9PSBjb3VudHJ5W2ZpZWxkXSkge1xuICAgICAgdGhpcy5tb2RlbC5jb3VudHJ5SUQgPSBjb3VudHJ5W2ZpZWxkXTtcbiAgICAgIHRoaXMubW9kZWwuY291bnRyeU5hbWUgPSBIZWxwZXJzLmludGVycG9sYXRlKHRoaXMuY29uZmlnLmNvdW50cnlJRC5waWNrZXJDb25maWcuZm9ybWF0LCBjb3VudHJ5KTtcbiAgICAgIHRoaXMuZGlzYWJsZWQuc3RhdGUgPSBmYWxzZTtcbiAgICAgIHRoaXMudG9vbHRpcC5zdGF0ZSA9IHVuZGVmaW5lZDtcbiAgICAgIHN0YXRlc1VwZGF0YWJsZSA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChIZWxwZXJzLmlzQmxhbmsoY291bnRyeSkgfHwgSGVscGVycy5pc0JsYW5rKGNvdW50cnlbZmllbGRdKSkge1xuICAgICAgdGhpcy5tb2RlbC5jb3VudHJ5SUQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLm1vZGVsLmNvdW50cnlOYW1lID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kaXNhYmxlZC5zdGF0ZSA9IHRydWU7XG4gICAgICB0aGlzLnRvb2x0aXAuc3RhdGUgPSB0aGlzLmxhYmVscy5zZWxlY3RDb3VudHJ5Rmlyc3Q7XG4gICAgICB0aGlzLmludmFsaWQuc3RhdGUgPSBmYWxzZTtcbiAgICAgIHN0YXRlc1VwZGF0YWJsZSA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gVXBkYXRlIHN0YXRlXG4gICAgaWYgKHN0YXRlc1VwZGF0YWJsZSkge1xuICAgICAgdGhpcy5tb2RlbC5zdGF0ZSA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMudXBkYXRlU3RhdGVzKCk7XG4gICAgfVxuICAgIHRoaXMudXBkYXRlQ29udHJvbCgpO1xuICAgIHRoaXMub25JbnB1dChudWxsLCAnY291bnRyeUlEJyk7XG4gICAgdGhpcy5vbklucHV0KG51bGwsICdzdGF0ZScpO1xuICB9XG5cbiAgb25TdGF0ZUNoYW5nZShldnQpIHtcbiAgICBjb25zdCBzdGF0ZTogYW55ID0gZXZ0ICYmIGV2dC52YWx1ZSA/IGV2dC52YWx1ZSA6IG51bGw7XG4gICAgdGhpcy5jb25maWcuc3RhdGUudXBkYXRlZCA9IHRydWU7XG4gICAgdGhpcy5tb2RlbC5zdGF0ZSA9IHN0YXRlO1xuICAgIHRoaXMudXBkYXRlQ29udHJvbCgpO1xuICAgIHRoaXMub25JbnB1dChudWxsLCAnc3RhdGUnKTtcbiAgfVxuXG4gIHNldFN0YXRlTGFiZWwobW9kZWw6IGFueSkge1xuICAgIGNvbnN0IHN0YXRlOiBzdHJpbmcgPSBtb2RlbC5zdGF0ZTtcbiAgICBpZiAoIUhlbHBlcnMuaXNCbGFuayhzdGF0ZSkpIHtcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5zdGF0ZS5yZXF1aXJlZCkge1xuICAgICAgICB0aGlzLnZhbGlkLnN0YXRlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMubW9kZWwuc3RhdGUgPSBzdGF0ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb2RlbC5zdGF0ZSA9IHVuZGVmaW5lZDtcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5zdGF0ZS5yZXF1aXJlZCkge1xuICAgICAgICB0aGlzLnZhbGlkLnN0YXRlID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlU3RhdGVzKCkge1xuICAgIGlmICh0aGlzLmNvbmZpZy5zdGF0ZS5waWNrZXJDb25maWcub3B0aW9ucyAmJiAhSGVscGVycy5pc0JsYW5rKHRoaXMubW9kZWwuY291bnRyeUlEKSkge1xuICAgICAgdGhpcy5jb25maWcuc3RhdGUucGlja2VyQ29uZmlnLm9wdGlvbnMgPSAocXVlcnkgPSAnJykgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZU9wdGlvbnMocXVlcnksIHRoaXMubW9kZWwuY291bnRyeUlEKTtcbiAgICAgIH07XG4gICAgICB0aGlzLnN0YXRlT3B0aW9ucygnJywgdGhpcy5tb2RlbC5jb3VudHJ5SUQpLnRoZW4oKHJlc3VsdHMpID0+IHtcbiAgICAgICAgdGhpcy5jb25maWcuc3RhdGUucGlja2VyQ29uZmlnLmRlZmF1bHRPcHRpb25zID0gcmVzdWx0cztcbiAgICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy50b29sdGlwLnN0YXRlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIHRoaXMuZGlzYWJsZWQuc3RhdGUgPSB0aGlzLl9yZWFkT25seTtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlTGFiZWwodGhpcy5tb2RlbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5kaXNhYmxlZC5zdGF0ZSA9IHRydWU7XG4gICAgICAgICAgdGhpcy50b29sdGlwLnN0YXRlID0gdGhpcy5sYWJlbHMubm9TdGF0ZXNGb3JDb3VudHJ5O1xuICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5zdGF0ZS5yZXF1aXJlZCkge1xuICAgICAgICAgICAgdGhpcy52YWxpZC5zdGF0ZSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMudmFsaWRpdHlDaGFuZ2UuZW1pdCgpO1xuICAgICAgICB0aGlzLm9uSW5wdXQobnVsbCwgJ3N0YXRlJyk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb25maWcuc3RhdGUucGlja2VyQ29uZmlnLmRlZmF1bHRPcHRpb25zID0gW107XG4gICAgICB0aGlzLmRpc2FibGVkLnN0YXRlID0gdHJ1ZTtcbiAgICAgIHRoaXMudG9vbHRpcC5zdGF0ZSA9IHRoaXMubGFiZWxzLnNlbGVjdENvdW50cnlGaXJzdDtcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5zdGF0ZS5yZXF1aXJlZCkge1xuICAgICAgICB0aGlzLnZhbGlkLnN0YXRlID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0U3RhdGVPcHRpb25zKGZpbHRlciA9ICcnLCBjb3VudHJ5SUQ6IG51bWJlcikge1xuICAgIGlmIChjb3VudHJ5SUQpIHtcbiAgICAgIGNvbnN0IGNvdW50cnkgPSBmaW5kQnlDb3VudHJ5SWQoY291bnRyeUlEKTtcbiAgICAgIGNvbnN0IHN0YXRlcyA9IGdldFN0YXRlcyhjb3VudHJ5Lm5hbWUpO1xuICAgICAgaWYgKGZpbHRlcikge1xuICAgICAgICByZXR1cm4gc3RhdGVzLmZpbHRlcigobmFtZSkgPT4gbmV3IFJlZ0V4cChgJHtmaWx0ZXJ9YCwgJ2dpJykudGVzdChuYW1lKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RhdGVzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlQ29udHJvbCgpIHtcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy5tb2RlbCk7XG4gICAgdGhpcy5vbklucHV0KG51bGwsICdjb3VudHJ5SUQnKTtcbiAgICB0aGlzLm9uSW5wdXQobnVsbCwgJ3N0YXRlJyk7XG4gIH1cblxuICB3cml0ZVZhbHVlKG1vZGVsKSB7XG4gICAgbGV0IGxvYWRpbmdDb3VudHJpZXMgPSBmYWxzZTtcbiAgICBpZiAobW9kZWwpIHtcbiAgICAgIGxldCBjb3VudHJ5TmFtZTtcbiAgICAgIGlmIChtb2RlbC5jb3VudHJ5TmFtZSAmJiBtb2RlbC5jb3VudHJ5SUQpIHtcbiAgICAgICAgY291bnRyeU5hbWUgPSBtb2RlbC5jb3VudHJ5TmFtZTtcbiAgICAgIH0gZWxzZSBpZiAobW9kZWwuY291bnRyeUlEKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5jb3VudHJ5SUQucGlja2VyQ29uZmlnICYmIHRoaXMuY29uZmlnLmNvdW50cnlJRC5waWNrZXJDb25maWcuZ2V0TGFiZWxzKSB7XG4gICAgICAgICAgaWYgKEhlbHBlcnMuaXNGdW5jdGlvbih0aGlzLmNvbmZpZy5jb3VudHJ5SUQucGlja2VyQ29uZmlnLmdldExhYmVscykpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLmNvbmZpZy5jb3VudHJ5SUQucGlja2VyQ29uZmlnLmdldExhYmVscyhtb2RlbC5jb3VudHJ5SUQpO1xuICAgICAgICAgICAgbG9hZGluZ0NvdW50cmllcyA9IHRydWU7XG4gICAgICAgICAgICBpZiAocHJvbWlzZS50aGVuKSB7XG4gICAgICAgICAgICAgIHByb21pc2UudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgbG9hZGluZ0NvdW50cmllcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvdW50cnlOYW1lID0gSGVscGVycy5pbnRlcnBvbGF0ZVdpdGhGYWxsYmFjayh0aGlzLmNvbmZpZy5jb3VudHJ5SUQucGlja2VyQ29uZmlnLmZvcm1hdCwgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsID0gT2JqZWN0LmFzc2lnbihtb2RlbCwgeyBjb3VudHJ5TmFtZSB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlcygpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChjb3VudHJ5TmFtZSkge1xuICAgICAgICBjb3VudHJ5TmFtZSA9IGNvdW50cnlOYW1lLnRyaW0oKTtcbiAgICAgICAgbW9kZWwuc3RhdGUgPSBtb2RlbC5zdGF0ZSB8fCAnJztcbiAgICAgICAgdGhpcy5tb2RlbCA9IE9iamVjdC5hc3NpZ24obW9kZWwsIHsgY291bnRyeU5hbWUgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG4gICAgICB9XG4gICAgICBpZiAoIWxvYWRpbmdDb3VudHJpZXMgJiYgIUhlbHBlcnMuaXNCbGFuayh0aGlzLm1vZGVsLmNvdW50cnlJRCkpIHtcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZXMoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5maWVsZExpc3QuZm9yRWFjaCgoZmllbGQ6IHN0cmluZykgPT4ge1xuICAgICAgdGhpcy5vbklucHV0KG51bGwsIGZpZWxkKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gIH1cblxuICBwcml2YXRlIGdldERlZmF1bHRTdGF0ZUNvbmZpZygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZmllbGQ6ICd2YWx1ZScsXG4gICAgICBmb3JtYXQ6ICckbGFiZWwnLFxuICAgICAgb3B0aW9uczogKHF1ZXJ5ID0gJycsIGNvdW50cnlJRCkgPT4ge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuZ2V0U3RhdGVPcHRpb25zKHF1ZXJ5LCBjb3VudHJ5SUQpKTtcbiAgICAgIH0sXG4gICAgICBnZXRMYWJlbHM6IChzdGF0ZTogc3RyaW5nKSA9PiB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoc3RhdGUpO1xuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXREZWZhdWx0Q291bnRyeUNvbmZpZygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZmllbGQ6ICd2YWx1ZScsXG4gICAgICBmb3JtYXQ6ICckbGFiZWwnLFxuICAgICAgb3B0aW9uczogKHF1ZXJ5ID0gJycpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgbGV0IGNvdW50cmllcyA9IENPVU5UUklFUztcbiAgICAgICAgICBpZiAocXVlcnkpIHtcbiAgICAgICAgICAgIGNvdW50cmllcyA9IGNvdW50cmllcy5maWx0ZXIoKGNvdW50cnkpID0+IG5ldyBSZWdFeHAoYCR7cXVlcnl9YCwgJ2dpJykudGVzdChjb3VudHJ5Lm5hbWUpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUoY291bnRyaWVzLm1hcCgoY291bnRyeSkgPT4gKHsgdmFsdWU6IGNvdW50cnkuaWQsIGxhYmVsOiBjb3VudHJ5Lm5hbWUgfSkpKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgZ2V0TGFiZWxzOiAoY291bnRyeUlEKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZTogYW55KSA9PiB7XG4gICAgICAgICAgY29uc3QgY291bnRyeTogYW55ID0gZmluZEJ5Q291bnRyeUlkKGNvdW50cnlJRCk7XG4gICAgICAgICAgaWYgKGNvdW50cnkpIHtcbiAgICAgICAgICAgIHJlc29sdmUoeyB2YWx1ZTogY291bnRyeS5pZCwgbGFiZWw6IGNvdW50cnkubmFtZSB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZSgnJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxufVxuIl19
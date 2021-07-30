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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvZm9ybS9leHRyYXMvYWRkcmVzcy9BZGRyZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsTUFBTTtBQUNOLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzlGLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVwRCxzREFBc0Q7QUFDdEQsTUFBTSxzQkFBc0IsR0FBRztJQUM3QixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsa0JBQWtCLENBQUM7SUFDakQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBMktGLE1BQU0sT0FBTyxrQkFBa0I7SUF1QzdCLFlBQW1CLE1BQXdCO1FBQXhCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBcENuQyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBYzFCLFdBQU0sR0FBZSxFQUFFLENBQUM7UUFDeEIsY0FBUyxHQUFrQixDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFekYsa0JBQWEsR0FBYSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDcEMsbUJBQWMsR0FBYSxHQUFHLEVB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QyxDQUFDO1lBQ0wsQ0FBQztZQUNELFNBQVMsRUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFFO2dCQUN2QixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBWSxFQUFFLEVBQUU7b0JBQ2xDLE1BQU0sT0FBTyxHQUFRLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDaEQsSUFBSSxPQUFPLEVBQUU7d0JBQ1gsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO3FCQUNyRDt5QkFBTTt3QkFDTCxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7cUJBQ2I7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDO1NBQ0YsQ0FBQztJQUNKLENBQUM7OztZQTdmRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO2dCQUNuQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0lUO2FBQ0Y7OztZQW5MUSxnQkFBZ0I7OztxQkFxTHRCLEtBQUs7dUJBR0wsS0FBSztxQkEwQkwsTUFBTTtvQkFFTixNQUFNO21CQUVOLE1BQU07NkJBRU4sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxyXG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuLy8gQVBQXHJcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDT1VOVFJJRVMsIGZpbmRCeUNvdW50cnlJZCwgZ2V0U3RhdGVzIH0gZnJvbSAnLi4vLi4vLi4vLi4vdXRpbHMvY291bnRyaWVzL0NvdW50cmllcyc7XHJcbmltcG9ydCB7IEhlbHBlcnMgfSBmcm9tICcuLi8uLi8uLi8uLi91dGlscy9IZWxwZXJzJztcclxuXHJcbi8vIFZhbHVlIGFjY2Vzc29yIGZvciB0aGUgY29tcG9uZW50IChzdXBwb3J0cyBuZ01vZGVsKVxyXG5jb25zdCBBRERSRVNTX1ZBTFVFX0FDQ0VTU09SID0ge1xyXG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdm9BZGRyZXNzRWxlbWVudCksXHJcbiAgbXVsdGk6IHRydWUsXHJcbn07XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE5vdm9BZGRyZXNzU3ViZmllbGRDb25maWcge1xyXG4gIGxhYmVsOiBzdHJpbmc7XHJcbiAgcmVxdWlyZWQ6IGJvb2xlYW47XHJcbiAgbWF4bGVuZ3RoOiBudW1iZXI7XHJcbiAgcGlja2VyQ29uZmlnPzogYW55O1xyXG4gIGhpZGRlbjogYm9vbGVhbjtcclxuICB1cGRhdGVkPzogYm9vbGVhbjtcclxuICByZWFkT25seT86IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTm92b0FkZHJlc3NDb25maWcge1xyXG4gIHJlcXVpcmVkPzogYm9vbGVhbjtcclxuICByZWFkT25seT86IGJvb2xlYW47XHJcbiAgYWRkcmVzczE/OiBOb3ZvQWRkcmVzc1N1YmZpZWxkQ29uZmlnO1xyXG4gIGFkZHJlc3MyPzogTm92b0FkZHJlc3NTdWJmaWVsZENvbmZpZztcclxuICBjaXR5PzogTm92b0FkZHJlc3NTdWJmaWVsZENvbmZpZztcclxuICBzdGF0ZT86IE5vdm9BZGRyZXNzU3ViZmllbGRDb25maWc7XHJcbiAgemlwPzogTm92b0FkZHJlc3NTdWJmaWVsZENvbmZpZztcclxuICBjb3VudHJ5SUQ/OiBOb3ZvQWRkcmVzc1N1YmZpZWxkQ29uZmlnO1xyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25vdm8tYWRkcmVzcycsXHJcbiAgcHJvdmlkZXJzOiBbQUREUkVTU19WQUxVRV9BQ0NFU1NPUl0sXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxzcGFuXHJcbiAgICAgICpuZ0lmPVwiIWNvbmZpZz8uYWRkcmVzczE/LmhpZGRlblwiXHJcbiAgICAgIGNsYXNzPVwic3RyZWV0LWFkZHJlc3NcIlxyXG4gICAgICBbY2xhc3MuaW52YWxpZF09XCJpbnZhbGlkLmFkZHJlc3MxXCJcclxuICAgICAgW2NsYXNzLmZvY3VzXT1cImZvY3VzZWQuYWRkcmVzczFcIlxyXG4gICAgICBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWQuYWRkcmVzczFcIlxyXG4gICAgPlxyXG4gICAgICA8aVxyXG4gICAgICAgICpuZ0lmPVwiY29uZmlnLmFkZHJlc3MxLnJlcXVpcmVkXCJcclxuICAgICAgICBjbGFzcz1cInJlcXVpcmVkLWluZGljYXRvciBhZGRyZXNzMVwiXHJcbiAgICAgICAgW25nQ2xhc3NdPVwieyAnYmhpLWNpcmNsZSc6ICF2YWxpZC5hZGRyZXNzMSwgJ2JoaS1jaGVjayc6IHZhbGlkLmFkZHJlc3MxIH1cIlxyXG4gICAgICA+XHJcbiAgICAgIDwvaT5cclxuICAgICAgPGlucHV0XHJcbiAgICAgICAgW2NsYXNzLm1heGxlbmd0aC1lcnJvcl09XCJpbnZhbGlkTWF4bGVuZ3RoLmFkZHJlc3MxXCJcclxuICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgaWQ9XCJhZGRyZXNzMVwiXHJcbiAgICAgICAgbmFtZT1cImFkZHJlc3MxXCJcclxuICAgICAgICBbcGxhY2Vob2xkZXJdPVwiY29uZmlnLmFkZHJlc3MxLmxhYmVsXCJcclxuICAgICAgICBbbWF4bGVuZ3RoXT1cImNvbmZpZz8uYWRkcmVzczE/Lm1heGxlbmd0aFwiXHJcbiAgICAgICAgYXV0b2NvbXBsZXRlPVwic2hpcHBpbmcgc3RyZWV0LWFkZHJlc3MgYWRkcmVzcy1saW5lLTFcIlxyXG4gICAgICAgIFsobmdNb2RlbCldPVwibW9kZWwuYWRkcmVzczFcIlxyXG4gICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cInVwZGF0ZUNvbnRyb2woKVwiXHJcbiAgICAgICAgKGZvY3VzKT1cImlzRm9jdXNlZCgkZXZlbnQsICdhZGRyZXNzMScpXCJcclxuICAgICAgICAoYmx1cik9XCJpc0JsdXJyZWQoJGV2ZW50LCAnYWRkcmVzczEnKVwiXHJcbiAgICAgICAgKGlucHV0KT1cIm9uSW5wdXQoJGV2ZW50LCAnYWRkcmVzczEnKVwiXHJcbiAgICAgIC8+XHJcbiAgICA8L3NwYW4+XHJcbiAgICA8c3BhblxyXG4gICAgICAqbmdJZj1cIiFjb25maWc/LmFkZHJlc3MyPy5oaWRkZW5cIlxyXG4gICAgICBjbGFzcz1cImFwdCBzdWl0ZVwiXHJcbiAgICAgIFtjbGFzcy5pbnZhbGlkXT1cImludmFsaWQuYWRkcmVzczJcIlxyXG4gICAgICBbY2xhc3MuZm9jdXNdPVwiZm9jdXNlZC5hZGRyZXNzMlwiXHJcbiAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZC5hZGRyZXNzMlwiXHJcbiAgICA+XHJcbiAgICAgIDxpXHJcbiAgICAgICAgKm5nSWY9XCJjb25maWcuYWRkcmVzczIucmVxdWlyZWRcIlxyXG4gICAgICAgIGNsYXNzPVwicmVxdWlyZWQtaW5kaWNhdG9yIGFkZHJlc3MyXCJcclxuICAgICAgICBbbmdDbGFzc109XCJ7ICdiaGktY2lyY2xlJzogIXZhbGlkLmFkZHJlc3MyLCAnYmhpLWNoZWNrJzogdmFsaWQuYWRkcmVzczIgfVwiXHJcbiAgICAgID5cclxuICAgICAgPC9pPlxyXG4gICAgICA8aW5wdXRcclxuICAgICAgICBbY2xhc3MubWF4bGVuZ3RoLWVycm9yXT1cImludmFsaWRNYXhsZW5ndGguYWRkcmVzczJcIlxyXG4gICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICBpZD1cImFkZHJlc3MyXCJcclxuICAgICAgICBuYW1lPVwiYWRkcmVzczJcIlxyXG4gICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb25maWcuYWRkcmVzczIubGFiZWxcIlxyXG4gICAgICAgIFttYXhsZW5ndGhdPVwiY29uZmlnPy5hZGRyZXNzMj8ubWF4bGVuZ3RoXCJcclxuICAgICAgICBhdXRvY29tcGxldGU9XCJzaGlwcGluZyBhZGRyZXNzLWxpbmUtMlwiXHJcbiAgICAgICAgWyhuZ01vZGVsKV09XCJtb2RlbC5hZGRyZXNzMlwiXHJcbiAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwidXBkYXRlQ29udHJvbCgpXCJcclxuICAgICAgICAoZm9jdXMpPVwiaXNGb2N1c2VkKCRldmVudCwgJ2FkZHJlc3MyJylcIlxyXG4gICAgICAgIChibHVyKT1cImlzQmx1cnJlZCgkZXZlbnQsICdhZGRyZXNzMicpXCJcclxuICAgICAgICAoaW5wdXQpPVwib25JbnB1dCgkZXZlbnQsICdhZGRyZXNzMicpXCJcclxuICAgICAgLz5cclxuICAgIDwvc3Bhbj5cclxuICAgIDxzcGFuXHJcbiAgICAgICpuZ0lmPVwiIWNvbmZpZz8uY2l0eT8uaGlkZGVuXCJcclxuICAgICAgY2xhc3M9XCJjaXR5IGxvY2FsaXR5XCJcclxuICAgICAgW2NsYXNzLmludmFsaWRdPVwiaW52YWxpZC5jaXR5XCJcclxuICAgICAgW2NsYXNzLmZvY3VzXT1cImZvY3VzZWQuY2l0eVwiXHJcbiAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZC5jaXR5XCJcclxuICAgID5cclxuICAgICAgPGkgKm5nSWY9XCJjb25maWcuY2l0eS5yZXF1aXJlZFwiIGNsYXNzPVwicmVxdWlyZWQtaW5kaWNhdG9yXCIgW25nQ2xhc3NdPVwieyAnYmhpLWNpcmNsZSc6ICF2YWxpZC5jaXR5LCAnYmhpLWNoZWNrJzogdmFsaWQuY2l0eSB9XCI+IDwvaT5cclxuICAgICAgPGlucHV0XHJcbiAgICAgICAgW2NsYXNzLm1heGxlbmd0aC1lcnJvcl09XCJpbnZhbGlkTWF4bGVuZ3RoLmNpdHlcIlxyXG4gICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICBpZD1cImNpdHlcIlxyXG4gICAgICAgIG5hbWU9XCJjaXR5XCJcclxuICAgICAgICBbcGxhY2Vob2xkZXJdPVwiY29uZmlnLmNpdHkubGFiZWxcIlxyXG4gICAgICAgIGF1dG9jb21wbGV0ZT1cInNoaXBwaW5nIGNpdHkgbG9jYWxpdHlcIlxyXG4gICAgICAgIFttYXhsZW5ndGhdPVwiY29uZmlnPy5jaXR5Py5tYXhsZW5ndGhcIlxyXG4gICAgICAgIFsobmdNb2RlbCldPVwibW9kZWwuY2l0eVwiXHJcbiAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwidXBkYXRlQ29udHJvbCgpXCJcclxuICAgICAgICAoZm9jdXMpPVwiaXNGb2N1c2VkKCRldmVudCwgJ2NpdHknKVwiXHJcbiAgICAgICAgKGJsdXIpPVwiaXNCbHVycmVkKCRldmVudCwgJ2NpdHknKVwiXHJcbiAgICAgICAgKGlucHV0KT1cIm9uSW5wdXQoJGV2ZW50LCAnY2l0eScpXCJcclxuICAgICAgLz5cclxuICAgIDwvc3Bhbj5cclxuICAgIDxzcGFuXHJcbiAgICAgICpuZ0lmPVwiIWNvbmZpZz8uc3RhdGU/LmhpZGRlblwiXHJcbiAgICAgIGNsYXNzPVwic3RhdGUgcmVnaW9uXCJcclxuICAgICAgW2NsYXNzLmludmFsaWRdPVwiaW52YWxpZC5zdGF0ZVwiXHJcbiAgICAgIFtjbGFzcy5mb2N1c109XCJmb2N1c2VkLnN0YXRlXCJcclxuICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkLnN0YXRlXCJcclxuICAgICAgW3Rvb2x0aXBdPVwidG9vbHRpcC5zdGF0ZVwiXHJcbiAgICA+XHJcbiAgICAgIDxpICpuZ0lmPVwiY29uZmlnLnN0YXRlLnJlcXVpcmVkXCIgY2xhc3M9XCJyZXF1aXJlZC1pbmRpY2F0b3JcIiBbbmdDbGFzc109XCJ7ICdiaGktY2lyY2xlJzogIXZhbGlkLnN0YXRlLCAnYmhpLWNoZWNrJzogdmFsaWQuc3RhdGUgfVwiPiA8L2k+XHJcbiAgICAgIDxub3ZvLXBpY2tlclxyXG4gICAgICAgIFtjb25maWddPVwiY29uZmlnPy5zdGF0ZT8ucGlja2VyQ29uZmlnXCJcclxuICAgICAgICBbcGxhY2Vob2xkZXJdPVwiY29uZmlnPy5zdGF0ZT8ubGFiZWxcIlxyXG4gICAgICAgIChjaGFuZ2VkKT1cIm9uU3RhdGVDaGFuZ2UoJGV2ZW50KVwiXHJcbiAgICAgICAgYXV0b2NvbXBsZXRlPVwic2hpcHBpbmcgcmVnaW9uXCJcclxuICAgICAgICBbKG5nTW9kZWwpXT1cIm1vZGVsLnN0YXRlXCJcclxuICAgICAgICBbZGlzYWJsZVBpY2tlcklucHV0XT1cImRpc2FibGVkLnN0YXRlXCJcclxuICAgICAgPjwvbm92by1waWNrZXI+XHJcbiAgICA8L3NwYW4+XHJcbiAgICA8c3BhblxyXG4gICAgICAqbmdJZj1cIiFjb25maWc/LnppcD8uaGlkZGVuXCJcclxuICAgICAgY2xhc3M9XCJ6aXAgcG9zdGFsLWNvZGVcIlxyXG4gICAgICBbY2xhc3MuaW52YWxpZF09XCJpbnZhbGlkLnppcFwiXHJcbiAgICAgIFtjbGFzcy5mb2N1c109XCJmb2N1c2VkLnppcFwiXHJcbiAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZC56aXBcIlxyXG4gICAgPlxyXG4gICAgICA8aSAqbmdJZj1cImNvbmZpZy56aXAucmVxdWlyZWRcIiBjbGFzcz1cInJlcXVpcmVkLWluZGljYXRvclwiIFtuZ0NsYXNzXT1cInsgJ2JoaS1jaXJjbGUnOiAhdmFsaWQuemlwLCAnYmhpLWNoZWNrJzogdmFsaWQuemlwIH1cIj4gPC9pPlxyXG4gICAgICA8aW5wdXRcclxuICAgICAgICBbY2xhc3MubWF4bGVuZ3RoLWVycm9yXT1cImludmFsaWRNYXhsZW5ndGguemlwXCJcclxuICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgaWQ9XCJ6aXBcIlxyXG4gICAgICAgIG5hbWU9XCJ6aXBcIlxyXG4gICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb25maWcuemlwLmxhYmVsXCJcclxuICAgICAgICBhdXRvY29tcGxldGU9XCJzaGlwcGluZyBwb3N0YWwtY29kZVwiXHJcbiAgICAgICAgW21heGxlbmd0aF09XCJjb25maWc/LnppcD8ubWF4bGVuZ3RoXCJcclxuICAgICAgICBbKG5nTW9kZWwpXT1cIm1vZGVsLnppcFwiXHJcbiAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwidXBkYXRlQ29udHJvbCgpXCJcclxuICAgICAgICAoZm9jdXMpPVwiaXNGb2N1c2VkKCRldmVudCwgJ3ppcCcpXCJcclxuICAgICAgICAoYmx1cik9XCJpc0JsdXJyZWQoJGV2ZW50LCAnemlwJylcIlxyXG4gICAgICAgIChpbnB1dCk9XCJvbklucHV0KCRldmVudCwgJ3ppcCcpXCJcclxuICAgICAgLz5cclxuICAgIDwvc3Bhbj5cclxuICAgIDxzcGFuXHJcbiAgICAgICpuZ0lmPVwiIWNvbmZpZz8uY291bnRyeUlEPy5oaWRkZW5cIlxyXG4gICAgICBjbGFzcz1cImNvdW50cnktbmFtZVwiXHJcbiAgICAgIFtjbGFzcy5pbnZhbGlkXT1cImludmFsaWQuY291bnRyeUlEXCJcclxuICAgICAgW2NsYXNzLmZvY3VzXT1cImZvY3VzZWQuY291bnRyeUlEXCJcclxuICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkLmNvdW50cnlJRFwiXHJcbiAgICA+XHJcbiAgICAgIDxpXHJcbiAgICAgICAgKm5nSWY9XCJjb25maWcuY291bnRyeUlELnJlcXVpcmVkXCJcclxuICAgICAgICBjbGFzcz1cInJlcXVpcmVkLWluZGljYXRvclwiXHJcbiAgICAgICAgW25nQ2xhc3NdPVwieyAnYmhpLWNpcmNsZSc6ICF2YWxpZC5jb3VudHJ5SUQsICdiaGktY2hlY2snOiB2YWxpZC5jb3VudHJ5SUQgfVwiXHJcbiAgICAgID5cclxuICAgICAgPC9pPlxyXG4gICAgICA8bm92by1waWNrZXJcclxuICAgICAgICBbY29uZmlnXT1cImNvbmZpZz8uY291bnRyeUlEPy5waWNrZXJDb25maWdcIlxyXG4gICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb25maWcuY291bnRyeUlELmxhYmVsXCJcclxuICAgICAgICAoY2hhbmdlZCk9XCJvbkNvdW50cnlDaGFuZ2UoJGV2ZW50KVwiXHJcbiAgICAgICAgYXV0b2NvbXBsZXRlPVwic2hpcHBpbmcgY291bnRyeVwiXHJcbiAgICAgICAgWyhuZ01vZGVsKV09XCJtb2RlbC5jb3VudHJ5SURcIlxyXG4gICAgICAgIFtkaXNhYmxlUGlja2VySW5wdXRdPVwiZGlzYWJsZWQuY291bnRyeUlEXCJcclxuICAgICAgPjwvbm92by1waWNrZXI+XHJcbiAgICA8L3NwYW4+XHJcbiAgYCxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9BZGRyZXNzRWxlbWVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQge1xyXG4gIEBJbnB1dCgpXHJcbiAgY29uZmlnOiBOb3ZvQWRkcmVzc0NvbmZpZztcclxuICBwcml2YXRlIF9yZWFkT25seSA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IHJlYWRPbmx5KHJlYWRPbmx5OiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9yZWFkT25seSA9IHJlYWRPbmx5O1xyXG4gICAgdGhpcy5maWVsZExpc3QuZm9yRWFjaCgoZmllbGQ6IHN0cmluZykgPT4ge1xyXG4gICAgICB0aGlzLmRpc2FibGVkW2ZpZWxkXSA9IHRoaXMuX3JlYWRPbmx5O1xyXG4gICAgfSk7XHJcbiAgICBpZiAodGhpcy5tb2RlbCkge1xyXG4gICAgICB0aGlzLnVwZGF0ZVN0YXRlcygpO1xyXG4gICAgfVxyXG4gIH1cclxuICBnZXQgcmVhZE9ubHkoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fcmVhZE9ubHk7XHJcbiAgfVxyXG4gIHN0YXRlczogQXJyYXk8YW55PiA9IFtdO1xyXG4gIGZpZWxkTGlzdDogQXJyYXk8c3RyaW5nPiA9IFsnYWRkcmVzczEnLCAnYWRkcmVzczInLCAnY2l0eScsICdzdGF0ZScsICd6aXAnLCAnY291bnRyeUlEJ107XHJcbiAgbW9kZWw6IGFueTtcclxuICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHsgfTtcclxuICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7IH07XHJcbiAgZm9jdXNlZDogYW55ID0ge307XHJcbiAgaW52YWxpZDogYW55ID0ge307XHJcbiAgZGlzYWJsZWQ6IGFueSA9IHt9O1xyXG4gIGludmFsaWRNYXhsZW5ndGg6IGFueSA9IHt9O1xyXG4gIHZhbGlkOiBhbnkgPSB7fTtcclxuICBzdGF0ZU9wdGlvbnM6IGFueTtcclxuICB0b29sdGlwOiBhbnkgPSB7fTtcclxuICBpbml0Q29tcGxldGUgPSBmYWxzZTtcclxuICBAT3V0cHV0KClcclxuICBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKVxyXG4gIGZvY3VzOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KClcclxuICBibHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KClcclxuICB2YWxpZGl0eUNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmICghdGhpcy5jb25maWcpIHtcclxuICAgICAgdGhpcy5jb25maWcgPSB7fTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLm1vZGVsKSB7XHJcbiAgICAgIHRoaXMud3JpdGVWYWx1ZSh0aGlzLm1vZGVsKTtcclxuICAgICAgdGhpcy51cGRhdGVDb250cm9sKCk7XHJcbiAgICB9IGVsc2UgaWYgKCF0aGlzLm1vZGVsKSB7XHJcbiAgICAgIHRoaXMubW9kZWwgPSB7fTtcclxuICAgIH1cclxuICAgIHRoaXMuaW5pdENvbmZpZygpO1xyXG4gICAgaWYgKEhlbHBlcnMuaXNCbGFuayh0aGlzLm1vZGVsLmNvdW50cnlJRCkpIHtcclxuICAgICAgdGhpcy51cGRhdGVTdGF0ZXMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGluaXRDb25maWcoKTogdm9pZCB7XHJcbiAgICB0aGlzLmZpZWxkTGlzdC5mb3JFYWNoKChmaWVsZDogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5jb25maWcuaGFzT3duUHJvcGVydHkoZmllbGQpKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWdbZmllbGRdID0ge1xyXG4gICAgICAgICAgaGlkZGVuOiB0cnVlLFxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCF0aGlzLmNvbmZpZ1tmaWVsZF0uaGFzT3duUHJvcGVydHkoJ2xhYmVsJykpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZ1tmaWVsZF0ubGFiZWwgPSB0aGlzLmxhYmVsc1tmaWVsZF07XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuY29uZmlnLnJlcXVpcmVkKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWdbZmllbGRdLnJlcXVpcmVkID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5jb25maWdbZmllbGRdLnJlYWRPbmx5IHx8IHRoaXMuY29uZmlnLnJlYWRPbmx5KSB7XHJcbiAgICAgICAgdGhpcy5jb25maWdbZmllbGRdLnJlYWRPbmx5ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmRpc2FibGVkW2ZpZWxkXSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGZpZWxkID09PSAnY291bnRyeUlEJykge1xyXG4gICAgICAgIGlmICghdGhpcy5jb25maWdbZmllbGRdLnBpY2tlckNvbmZpZykge1xyXG4gICAgICAgICAgdGhpcy5jb25maWcuY291bnRyeUlELnBpY2tlckNvbmZpZyA9IHRoaXMuZ2V0RGVmYXVsdENvdW50cnlDb25maWcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb25maWdbZmllbGRdLnBpY2tlckNvbmZpZy5kZWZhdWx0T3B0aW9ucyA9IHRoaXMuY29uZmlnLmNvdW50cnlJRC5waWNrZXJDb25maWcub3B0aW9ucztcclxuICAgICAgfVxyXG4gICAgICBpZiAoZmllbGQgPT09ICdzdGF0ZScpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY29uZmlnW2ZpZWxkXS5waWNrZXJDb25maWcpIHtcclxuICAgICAgICAgIHRoaXMuY29uZmlnLnN0YXRlLnBpY2tlckNvbmZpZyA9IHRoaXMuZ2V0RGVmYXVsdFN0YXRlQ29uZmlnKCk7XHJcbiAgICAgICAgICB0aGlzLmNvbmZpZ1tmaWVsZF0ucGlja2VyQ29uZmlnLmRlZmF1bHRPcHRpb25zID0gdGhpcy5jb25maWdbZmllbGRdLnBpY2tlckNvbmZpZy5vcHRpb25zO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0YXRlT3B0aW9ucyA9IHRoaXMuY29uZmlnW2ZpZWxkXS5waWNrZXJDb25maWcub3B0aW9ucztcclxuICAgICAgICB0aGlzLmNvbmZpZ1tmaWVsZF0ucGlja2VyQ29uZmlnLm9wdGlvbnMgPSAocXVlcnkgPSAnJykgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGVPcHRpb25zKHF1ZXJ5LCB0aGlzLm1vZGVsLmNvdW50cnlJRCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmNvbmZpZ1tmaWVsZF0ucGlja2VyQ29uZmlnLmRlZmF1bHRPcHRpb25zID0gdGhpcy5zdGF0ZU9wdGlvbnM7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaXNWYWxpZChmaWVsZDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBsZXQgdmFsaWQgPSB0cnVlO1xyXG4gICAgaWYgKFxyXG4gICAgICAoKHRoaXMuY29uZmlnW2ZpZWxkXS5yZXF1aXJlZCAmJiAoSGVscGVycy5pc0JsYW5rKHRoaXMubW9kZWxbZmllbGRdKSB8fCBIZWxwZXJzLmlzRW1wdHkodGhpcy5tb2RlbFtmaWVsZF0pKSkgfHxcclxuICAgICAgICAhdGhpcy5jb25maWdbZmllbGRdLnJlcXVpcmVkKSAmJlxyXG4gICAgICAhKGZpZWxkID09PSAnY291bnRyeUlEJyAmJiB0aGlzLmNvbmZpZ1tmaWVsZF0ucmVxdWlyZWQgJiYgIUhlbHBlcnMuaXNCbGFuayh0aGlzLm1vZGVsLmNvdW50cnlJRCkpICYmXHJcbiAgICAgICEoXHJcbiAgICAgICAgZmllbGQgPT09ICdzdGF0ZScgJiZcclxuICAgICAgICB0aGlzLmNvbmZpZ1tmaWVsZF0ucmVxdWlyZWQgJiZcclxuICAgICAgICAoIUhlbHBlcnMuaXNFbXB0eSh0aGlzLm1vZGVsLnN0YXRlKSB8fFxyXG4gICAgICAgICAgKChIZWxwZXJzLmlzQmxhbmsodGhpcy5tb2RlbC5zdGF0ZSkgfHwgSGVscGVycy5pc0VtcHR5KHRoaXMubW9kZWwuc3RhdGUpKSAmJlxyXG4gICAgICAgICAgICAhSGVscGVycy5pc0JsYW5rKHRoaXMubW9kZWwuY291bnRyeU5hbWUpICYmXHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLnN0YXRlLnBpY2tlckNvbmZpZyAmJlxyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5zdGF0ZS5waWNrZXJDb25maWcuZGVmYXVsdE9wdGlvbnMgJiZcclxuICAgICAgICAgICAgdGhpcy5jb25maWcuc3RhdGUucGlja2VyQ29uZmlnLmRlZmF1bHRPcHRpb25zLmxlbmd0aCA9PT0gMCkpXHJcbiAgICAgIClcclxuICAgICkge1xyXG4gICAgICB2YWxpZCA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIGlmIChcclxuICAgICAgIUhlbHBlcnMuaXNFbXB0eSh0aGlzLm1vZGVsW2ZpZWxkXSkgJiZcclxuICAgICAgIUhlbHBlcnMuaXNCbGFuayh0aGlzLmNvbmZpZ1tmaWVsZF0ubWF4bGVuZ3RoKSAmJlxyXG4gICAgICB0aGlzLmNvbmZpZ1tmaWVsZF0ubWF4bGVuZ3RoIDwgdGhpcy5tb2RlbFtmaWVsZF0ubGVuZ3RoXHJcbiAgICApIHtcclxuICAgICAgdmFsaWQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHRoaXMudmFsaWRbZmllbGRdID0gdmFsaWQ7XHJcbiAgfVxyXG5cclxuICBpc0ludmFsaWQoZmllbGQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgbGV0IGludmFsaWQgPSBmYWxzZTtcclxuICAgIGxldCBpbnZhbGlkTWF4bGVuZ3RoID0gZmFsc2U7XHJcbiAgICBpZiAoXHJcbiAgICAgIChmaWVsZCAhPT0gJ2NvdW50cnlJRCcgJiZcclxuICAgICAgICBmaWVsZCAhPT0gJ3N0YXRlJyAmJlxyXG4gICAgICAgIHRoaXMuY29uZmlnW2ZpZWxkXS5yZXF1aXJlZCAmJlxyXG4gICAgICAgIEhlbHBlcnMuaXNFbXB0eSh0aGlzLm1vZGVsW2ZpZWxkXSkgJiZcclxuICAgICAgICAhSGVscGVycy5pc0JsYW5rKHRoaXMubW9kZWxbZmllbGRdKSkgfHxcclxuICAgICAgKGZpZWxkID09PSAnY291bnRyeUlEJyAmJiB0aGlzLmNvbmZpZ1tmaWVsZF0ucmVxdWlyZWQgJiYgSGVscGVycy5pc0JsYW5rKHRoaXMubW9kZWwuY291bnRyeU5hbWUpICYmIHRoaXMuY29uZmlnW2ZpZWxkXS51cGRhdGVkKSB8fFxyXG4gICAgICAoZmllbGQgPT09ICdzdGF0ZScgJiZcclxuICAgICAgICB0aGlzLmNvbmZpZ1tmaWVsZF0ucmVxdWlyZWQgJiZcclxuICAgICAgICAoSGVscGVycy5pc0JsYW5rKHRoaXMubW9kZWwuc3RhdGUpIHx8IEhlbHBlcnMuaXNFbXB0eSh0aGlzLm1vZGVsLnN0YXRlKSkgJiZcclxuICAgICAgICAhSGVscGVycy5pc0JsYW5rKHRoaXMubW9kZWwuY291bnRyeUlEKSAmJlxyXG4gICAgICAgIHRoaXMuY29uZmlnW2ZpZWxkXS51cGRhdGVkICYmXHJcbiAgICAgICAgdGhpcy5jb25maWcuc3RhdGUucGlja2VyQ29uZmlnICYmXHJcbiAgICAgICAgdGhpcy5jb25maWcuc3RhdGUucGlja2VyQ29uZmlnLmRlZmF1bHRPcHRpb25zICYmXHJcbiAgICAgICAgdGhpcy5jb25maWcuc3RhdGUucGlja2VyQ29uZmlnLmRlZmF1bHRPcHRpb25zLmxlbmd0aCA+IDApXHJcbiAgICApIHtcclxuICAgICAgaW52YWxpZCA9IHRydWU7XHJcbiAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAhSGVscGVycy5pc0VtcHR5KHRoaXMubW9kZWxbZmllbGRdKSAmJlxyXG4gICAgICAhSGVscGVycy5pc0JsYW5rKHRoaXMuY29uZmlnW2ZpZWxkXS5tYXhsZW5ndGgpICYmXHJcbiAgICAgIHRoaXMuY29uZmlnW2ZpZWxkXS5tYXhsZW5ndGggPCB0aGlzLm1vZGVsW2ZpZWxkXS5sZW5ndGhcclxuICAgICkge1xyXG4gICAgICBpbnZhbGlkID0gdHJ1ZTtcclxuICAgICAgaW52YWxpZE1heGxlbmd0aCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICB0aGlzLmludmFsaWRbZmllbGRdID0gaW52YWxpZDtcclxuICAgIHRoaXMuaW52YWxpZE1heGxlbmd0aFtmaWVsZF0gPSBpbnZhbGlkTWF4bGVuZ3RoO1xyXG4gIH1cclxuXHJcbiAgb25JbnB1dChldmVudDogRXZlbnQsIGZpZWxkOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHRoaXMuaXNJbnZhbGlkKGZpZWxkKTtcclxuICAgIHRoaXMuaXNWYWxpZChmaWVsZCk7XHJcbiAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh7IHZhbHVlOiB0aGlzLm1vZGVsW2ZpZWxkXSwgZmllbGQgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc0ZvY3VzZWQoZXZlbnQ6IEV2ZW50LCBmaWVsZDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLmZvY3VzZWRbZmllbGRdID0gdHJ1ZTtcclxuICAgIHRoaXMuZm9jdXMuZW1pdCh7IGV2ZW50LCBmaWVsZCB9KTtcclxuICB9XHJcblxyXG4gIGlzQmx1cnJlZChldmVudDogRXZlbnQsIGZpZWxkOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHRoaXMuZm9jdXNlZFtmaWVsZF0gPSBmYWxzZTtcclxuICAgIHRoaXMuYmx1ci5lbWl0KHsgZXZlbnQsIGZpZWxkIH0pO1xyXG4gIH1cclxuXHJcbiAgb25Db3VudHJ5Q2hhbmdlKGV2dCkge1xyXG4gICAgY29uc3QgY291bnRyeTogYW55ID0gZXZ0ICYmIGV2dC5yYXdWYWx1ZSA/IGV2dC5yYXdWYWx1ZSA6IG51bGw7XHJcbiAgICBsZXQgZmllbGQ6IGFueTtcclxuICAgIGxldCBzdGF0ZXNVcGRhdGFibGUgPSBmYWxzZTtcclxuICAgIHRoaXMuY29uZmlnLmNvdW50cnlJRC51cGRhdGVkID0gdHJ1ZTtcclxuICAgIGlmICh0aGlzLmNvbmZpZy5jb3VudHJ5SUQucGlja2VyQ29uZmlnKSB7XHJcbiAgICAgIGZpZWxkID0gdGhpcy5jb25maWcuY291bnRyeUlELnBpY2tlckNvbmZpZy5maWVsZDtcclxuICAgIH1cclxuICAgIGlmIChjb3VudHJ5ICYmIGZpZWxkICYmICFIZWxwZXJzLmlzQmxhbmsoY291bnRyeVtmaWVsZF0pICYmIHRoaXMubW9kZWwuY291bnRyeUlEICE9PSBjb3VudHJ5W2ZpZWxkXSkge1xyXG4gICAgICB0aGlzLm1vZGVsLmNvdW50cnlJRCA9IGNvdW50cnlbZmllbGRdO1xyXG4gICAgICB0aGlzLm1vZGVsLmNvdW50cnlOYW1lID0gSGVscGVycy5pbnRlcnBvbGF0ZSh0aGlzLmNvbmZpZy5jb3VudHJ5SUQucGlja2VyQ29uZmlnLmZvcm1hdCwgY291bnRyeSk7XHJcbiAgICAgIHRoaXMuZGlzYWJsZWQuc3RhdGUgPSBmYWxzZTtcclxuICAgICAgdGhpcy50b29sdGlwLnN0YXRlID0gdW5kZWZpbmVkO1xyXG4gICAgICBzdGF0ZXNVcGRhdGFibGUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIGlmIChIZWxwZXJzLmlzQmxhbmsoY291bnRyeSkgfHwgSGVscGVycy5pc0JsYW5rKGNvdW50cnlbZmllbGRdKSkge1xyXG4gICAgICB0aGlzLm1vZGVsLmNvdW50cnlJRCA9IHVuZGVmaW5lZDtcclxuICAgICAgdGhpcy5tb2RlbC5jb3VudHJ5TmFtZSA9IHVuZGVmaW5lZDtcclxuICAgICAgdGhpcy5kaXNhYmxlZC5zdGF0ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMudG9vbHRpcC5zdGF0ZSA9IHRoaXMubGFiZWxzLnNlbGVjdENvdW50cnlGaXJzdDtcclxuICAgICAgdGhpcy5pbnZhbGlkLnN0YXRlID0gZmFsc2U7XHJcbiAgICAgIHN0YXRlc1VwZGF0YWJsZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVXBkYXRlIHN0YXRlXHJcbiAgICBpZiAoc3RhdGVzVXBkYXRhYmxlKSB7XHJcbiAgICAgIHRoaXMubW9kZWwuc3RhdGUgPSB1bmRlZmluZWQ7XHJcbiAgICAgIHRoaXMudXBkYXRlU3RhdGVzKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnVwZGF0ZUNvbnRyb2woKTtcclxuICAgIHRoaXMub25JbnB1dChudWxsLCAnY291bnRyeUlEJyk7XHJcbiAgICB0aGlzLm9uSW5wdXQobnVsbCwgJ3N0YXRlJyk7XHJcbiAgfVxyXG5cclxuICBvblN0YXRlQ2hhbmdlKGV2dCkge1xyXG4gICAgY29uc3Qgc3RhdGU6IGFueSA9IGV2dCAmJiBldnQudmFsdWUgPyBldnQudmFsdWUgOiBudWxsO1xyXG4gICAgdGhpcy5jb25maWcuc3RhdGUudXBkYXRlZCA9IHRydWU7XHJcbiAgICB0aGlzLm1vZGVsLnN0YXRlID0gc3RhdGU7XHJcbiAgICB0aGlzLnVwZGF0ZUNvbnRyb2woKTtcclxuICAgIHRoaXMub25JbnB1dChudWxsLCAnc3RhdGUnKTtcclxuICB9XHJcblxyXG4gIHNldFN0YXRlTGFiZWwobW9kZWw6IGFueSkge1xyXG4gICAgY29uc3Qgc3RhdGU6IHN0cmluZyA9IG1vZGVsLnN0YXRlO1xyXG4gICAgaWYgKCFIZWxwZXJzLmlzQmxhbmsoc3RhdGUpKSB7XHJcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5zdGF0ZS5yZXF1aXJlZCkge1xyXG4gICAgICAgIHRoaXMudmFsaWQuc3RhdGUgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubW9kZWwuc3RhdGUgPSBzdGF0ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubW9kZWwuc3RhdGUgPSB1bmRlZmluZWQ7XHJcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5zdGF0ZS5yZXF1aXJlZCkge1xyXG4gICAgICAgIHRoaXMudmFsaWQuc3RhdGUgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlU3RhdGVzKCkge1xyXG4gICAgaWYgKHRoaXMuY29uZmlnLnN0YXRlLnBpY2tlckNvbmZpZy5vcHRpb25zICYmICFIZWxwZXJzLmlzQmxhbmsodGhpcy5tb2RlbC5jb3VudHJ5SUQpKSB7XHJcbiAgICAgIHRoaXMuY29uZmlnLnN0YXRlLnBpY2tlckNvbmZpZy5vcHRpb25zID0gKHF1ZXJ5ID0gJycpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZU9wdGlvbnMocXVlcnksIHRoaXMubW9kZWwuY291bnRyeUlEKTtcclxuICAgICAgfTtcclxuICAgICAgdGhpcy5zdGF0ZU9wdGlvbnMoJycsIHRoaXMubW9kZWwuY291bnRyeUlEKS50aGVuKChyZXN1bHRzKSA9PiB7XHJcbiAgICAgICAgdGhpcy5jb25maWcuc3RhdGUucGlja2VyQ29uZmlnLmRlZmF1bHRPcHRpb25zID0gcmVzdWx0cztcclxuICAgICAgICBpZiAocmVzdWx0cy5sZW5ndGgpIHtcclxuICAgICAgICAgIHRoaXMudG9vbHRpcC5zdGF0ZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgIHRoaXMuZGlzYWJsZWQuc3RhdGUgPSB0aGlzLl9yZWFkT25seTtcclxuICAgICAgICAgIHRoaXMuc2V0U3RhdGVMYWJlbCh0aGlzLm1vZGVsKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5kaXNhYmxlZC5zdGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLnRvb2x0aXAuc3RhdGUgPSB0aGlzLmxhYmVscy5ub1N0YXRlc0ZvckNvdW50cnk7XHJcbiAgICAgICAgICBpZiAodGhpcy5jb25maWcuc3RhdGUucmVxdWlyZWQpIHtcclxuICAgICAgICAgICAgdGhpcy52YWxpZC5zdGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudmFsaWRpdHlDaGFuZ2UuZW1pdCgpO1xyXG4gICAgICAgIHRoaXMub25JbnB1dChudWxsLCAnc3RhdGUnKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNvbmZpZy5zdGF0ZS5waWNrZXJDb25maWcuZGVmYXVsdE9wdGlvbnMgPSBbXTtcclxuICAgICAgdGhpcy5kaXNhYmxlZC5zdGF0ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMudG9vbHRpcC5zdGF0ZSA9IHRoaXMubGFiZWxzLnNlbGVjdENvdW50cnlGaXJzdDtcclxuICAgICAgaWYgKHRoaXMuY29uZmlnLnN0YXRlLnJlcXVpcmVkKSB7XHJcbiAgICAgICAgdGhpcy52YWxpZC5zdGF0ZSA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRTdGF0ZU9wdGlvbnMoZmlsdGVyID0gJycsIGNvdW50cnlJRDogbnVtYmVyKSB7XHJcbiAgICBpZiAoY291bnRyeUlEKSB7XHJcbiAgICAgIGNvbnN0IGNvdW50cnkgPSBmaW5kQnlDb3VudHJ5SWQoY291bnRyeUlEKTtcclxuICAgICAgY29uc3Qgc3RhdGVzID0gZ2V0U3RhdGVzKGNvdW50cnkubmFtZSk7XHJcbiAgICAgIGlmIChmaWx0ZXIpIHtcclxuICAgICAgICByZXR1cm4gc3RhdGVzLmZpbHRlcigobmFtZSkgPT4gbmV3IFJlZ0V4cChgJHtmaWx0ZXJ9YCwgJ2dpJykudGVzdChuYW1lKSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHN0YXRlcztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZUNvbnRyb2woKSB7XHJcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy5tb2RlbCk7XHJcbiAgICB0aGlzLm9uSW5wdXQobnVsbCwgJ2NvdW50cnlJRCcpO1xyXG4gICAgdGhpcy5vbklucHV0KG51bGwsICdzdGF0ZScpO1xyXG4gIH1cclxuXHJcbiAgd3JpdGVWYWx1ZShtb2RlbCkge1xyXG4gICAgbGV0IGxvYWRpbmdDb3VudHJpZXMgPSBmYWxzZTtcclxuICAgIGlmIChtb2RlbCkge1xyXG4gICAgICBsZXQgY291bnRyeU5hbWU7XHJcbiAgICAgIGlmIChtb2RlbC5jb3VudHJ5TmFtZSAmJiBtb2RlbC5jb3VudHJ5SUQpIHtcclxuICAgICAgICBjb3VudHJ5TmFtZSA9IG1vZGVsLmNvdW50cnlOYW1lO1xyXG4gICAgICB9IGVsc2UgaWYgKG1vZGVsLmNvdW50cnlJRCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5jb3VudHJ5SUQucGlja2VyQ29uZmlnICYmIHRoaXMuY29uZmlnLmNvdW50cnlJRC5waWNrZXJDb25maWcuZ2V0TGFiZWxzKSB7XHJcbiAgICAgICAgICBpZiAoSGVscGVycy5pc0Z1bmN0aW9uKHRoaXMuY29uZmlnLmNvdW50cnlJRC5waWNrZXJDb25maWcuZ2V0TGFiZWxzKSkge1xyXG4gICAgICAgICAgICBjb25zdCBwcm9taXNlICA9IHRoaXMuY29uZmlnLmNvdW50cnlJRC5waWNrZXJDb25maWcuZ2V0TGFiZWxzKG1vZGVsLmNvdW50cnlJRCk7XHJcbiAgICAgICAgICAgIGxvYWRpbmdDb3VudHJpZXMgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAocHJvbWlzZS50aGVuKSB7XHJcbiAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGxvYWRpbmdDb3VudHJpZXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGNvdW50cnlOYW1lID0gSGVscGVycy5pbnRlcnBvbGF0ZVdpdGhGYWxsYmFjayh0aGlzLmNvbmZpZy5jb3VudHJ5SUQucGlja2VyQ29uZmlnLmZvcm1hdCwgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9kZWwgPSBPYmplY3QuYXNzaWduKG1vZGVsLCB7IGNvdW50cnlOYW1lIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTdGF0ZXMoKTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAoY291bnRyeU5hbWUpIHtcclxuICAgICAgICBjb3VudHJ5TmFtZSA9IGNvdW50cnlOYW1lLnRyaW0oKTtcclxuICAgICAgICBtb2RlbC5zdGF0ZSA9IG1vZGVsLnN0YXRlIHx8ICcnO1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSBPYmplY3QuYXNzaWduKG1vZGVsLCB7IGNvdW50cnlOYW1lIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIWxvYWRpbmdDb3VudHJpZXMgJiYgIUhlbHBlcnMuaXNCbGFuayh0aGlzLm1vZGVsLmNvdW50cnlJRCkpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlcygpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmZpZWxkTGlzdC5mb3JFYWNoKChmaWVsZDogc3RyaW5nKSA9PiB7XHJcbiAgICAgIHRoaXMub25JbnB1dChudWxsLCBmaWVsZCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXREZWZhdWx0U3RhdGVDb25maWcoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBmaWVsZDogJ3ZhbHVlJyxcclxuICAgICAgZm9ybWF0OiAnJGxhYmVsJyxcclxuICAgICAgb3B0aW9uczogKHF1ZXJ5ID0gJycsIGNvdW50cnlJRCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5nZXRTdGF0ZU9wdGlvbnMocXVlcnksIGNvdW50cnlJRCkpO1xyXG4gICAgICB9LFxyXG4gICAgICBnZXRMYWJlbHM6IChzdGF0ZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShzdGF0ZSk7XHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXREZWZhdWx0Q291bnRyeUNvbmZpZygpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGZpZWxkOiAndmFsdWUnLFxyXG4gICAgICBmb3JtYXQ6ICckbGFiZWwnLFxyXG4gICAgICBvcHRpb25zOiAocXVlcnkgPSAnJykgPT4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgbGV0IGNvdW50cmllcyA9IENPVU5UUklFUztcclxuICAgICAgICAgIGlmIChxdWVyeSkge1xyXG4gICAgICAgICAgICBjb3VudHJpZXMgPSBjb3VudHJpZXMuZmlsdGVyKChjb3VudHJ5KSA9PiBuZXcgUmVnRXhwKGAke3F1ZXJ5fWAsICdnaScpLnRlc3QoY291bnRyeS5uYW1lKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZShjb3VudHJpZXMubWFwKChjb3VudHJ5KSA9PiAoeyB2YWx1ZTogY291bnRyeS5pZCwgbGFiZWw6IGNvdW50cnkubmFtZSB9KSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9LFxyXG4gICAgICBnZXRMYWJlbHM6IChjb3VudHJ5SUQpID0+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgY291bnRyeTogYW55ID0gZmluZEJ5Q291bnRyeUlkKGNvdW50cnlJRCk7XHJcbiAgICAgICAgICBpZiAoY291bnRyeSkge1xyXG4gICAgICAgICAgICByZXNvbHZlKHsgdmFsdWU6IGNvdW50cnkuaWQsIGxhYmVsOiBjb3VudHJ5Lm5hbWUgfSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXNvbHZlKCcnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==
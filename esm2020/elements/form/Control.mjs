// NG2
import { ChangeDetectorRef, Component, Directive, ElementRef, EventEmitter, HostListener, Inject, Input, LOCALE_ID, Output, } from '@angular/core';
// Vendor
import { DateFormatService, NovoLabelService, NovoTemplateService } from 'novo-elements/services';
import { Helpers, OutsideClick } from 'novo-elements/utils';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FieldInteractionApi } from './FieldInteractionApi';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "./FieldInteractionApi";
import * as i3 from "novo-elements/elements/tip-well";
import * as i4 from "novo-elements/elements/tooltip";
import * as i5 from "@angular/common";
export class NovoAutoSize {
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
export class NovoControlElement extends OutsideClick {
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
                handleSimpleTextInput: this.handleSimpleTextInput.bind(this),
                handleAccept: this.handleAccept.bind(this),
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
            'code-editor',
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
    // imask has accepted a change in value
    handleAccept(value) {
        this.emitChange(value);
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
        this.emitChange(event.target.value);
        this.restrictKeys(event);
    }
    checkMaxLength(value) {
        if (this.control && this.form.controls[this.control.key].maxlength) {
            this.itemCount = value.length;
            this.maxLengthMet = value.length >= this.form.controls[this.control.key].maxlength;
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
    handleSimpleTextInput(event) {
        if (!this.control.textMaskEnabled) {
            this.emitChange(event.target.value);
        }
        // if we have maskOptions, inputs will be absorbed in handleAccept()
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
NovoControlElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoControlElement, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i1.DateFormatService }, { token: i2.FieldInteractionApi }, { token: i1.NovoTemplateService }, { token: i0.ChangeDetectorRef }, { token: LOCALE_ID }], target: i0.ɵɵFactoryTarget.Component });
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
  `, isInline: true, components: [{ type: i3.NovoTipWellElement, selector: "novo-tip-well", inputs: ["name", "tip", "buttonText", "button", "icon", "sanitize"], outputs: ["confirmed"] }], directives: [{ type: i4.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipActive", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML"] }, { type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i5.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "uppercase": i5.UpperCasePipe } });
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
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i1.DateFormatService }, { type: i2.FieldInteractionApi }, { type: i1.NovoTemplateService }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2Zvcm0vQ29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUdMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsU0FBUyxFQUdULE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixTQUFTO0FBQ1QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbEcsT0FBTyxFQUFFLE9BQU8sRUFBTyxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUc5QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7OztBQVc1RCxNQUFNLE9BQU8sWUFBWTtJQU12QixZQUFtQixPQUFtQjtRQUFuQixZQUFPLEdBQVAsT0FBTyxDQUFZO0lBQUcsQ0FBQztJQUoxQyxPQUFPLENBQUMsUUFBNkI7UUFDbkMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFJRCxrQkFBa0I7UUFDaEIsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxNQUFNO1FBQ0osTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7UUFDakQsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsYUFB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QUFFLGFBQWE7d0JBQ3hDLHlCQUF5QixFQUFFLDBCQUEwQjt3QkFDckQsa0JBQWtCLEVBQUUsb0JBQW9CO3FCQUN6QztpQkFDRjs7MEJBNkRJLE1BQU07MkJBQUMsU0FBUzs0Q0ExRG5CLE9BQU87c0JBRE4sS0FBSztnQkFHTixJQUFJO3NCQURILEtBQUs7Z0JBR04sU0FBUztzQkFEUixLQUFLO2dCQUdOLFNBQVM7c0JBRFIsS0FBSztnQkFHTixNQUFNO3NCQURMLE1BQU07Z0JBR1AsSUFBSTtzQkFESCxNQUFNO2dCQUdQLElBQUk7c0JBREgsTUFBTTtnQkFHUCxNQUFNO3NCQURMLE1BQU07Z0JBR1AsTUFBTTtzQkFETCxNQUFNO2dCQUdILE1BQU07c0JBRFQsTUFBTTt1QkFBQyxNQUFNO2dCQU1WLE9BQU87c0JBRFYsTUFBTTt1QkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBMT0NBTEVfSUQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gVmVuZG9yXG5pbXBvcnQgeyBEYXRlRm9ybWF0U2VydmljZSwgTm92b0xhYmVsU2VydmljZSwgTm92b1RlbXBsYXRlU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuaW1wb3J0IHsgSGVscGVycywgS2V5LCBPdXRzaWRlQ2xpY2sgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbi8vIEFQUFxuaW1wb3J0IHsgQW55TWFza2VkT3B0aW9ucyB9IGZyb20gJ2ltYXNrJztcbmltcG9ydCB7IEZpZWxkSW50ZXJhY3Rpb25BcGkgfSBmcm9tICcuL0ZpZWxkSW50ZXJhY3Rpb25BcGknO1xuXG5leHBvcnQgaW50ZXJmYWNlIElNYXNrT3B0aW9ucyB7XG4gIG1hc2s6IEFueU1hc2tlZE9wdGlvbnNbJ21hc2snXTtcbiAga2VlcENoYXJQb3NpdGlvbnM6IGJvb2xlYW47XG4gIGd1aWRlOiBib29sZWFuO1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0ZXh0YXJlYVthdXRvc2l6ZV0nLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQXV0b1NpemUgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgQEhvc3RMaXN0ZW5lcignaW5wdXQnLCBbJyRldmVudC50YXJnZXQnXSlcbiAgb25JbnB1dCh0ZXh0QXJlYTogSFRNTFRleHRBcmVhRWxlbWVudCk6IHZvaWQge1xuICAgIHRoaXMuYWRqdXN0KCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZikge31cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmFkanVzdCgpO1xuICAgIH0pO1xuICB9XG5cbiAgYWRqdXN0KCk6IHZvaWQge1xuICAgIGNvbnN0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICBuYXRpdmVFbGVtZW50LnN0eWxlLmhlaWdodCA9IG5hdGl2ZUVsZW1lbnQuc3R5bGUubWluSGVpZ2h0O1xuICAgIG5hdGl2ZUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gYCR7bmF0aXZlRWxlbWVudC5zY3JvbGxIZWlnaHR9cHhgO1xuICB9XG59XG4vLyB1bmRvIGFsbCB0ZW1wbGF0ZSBjb250ZXh0IHJlZmVyZW5jZXMhXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWNvbnRyb2wnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIGNsYXNzPVwibm92by1jb250cm9sLWNvbnRhaW5lclwiXG4gICAgICBbaGlkZGVuXT1cIlxuICAgICAgICBmb3JtLmNvbnRyb2xzW2NvbnRyb2wua2V5XS5oaWRkZW4gfHxcbiAgICAgICAgZm9ybS5jb250cm9sc1tjb250cm9sLmtleV0udHlwZSA9PT0gJ2hpZGRlbicgfHxcbiAgICAgICAgZm9ybS5jb250cm9sc1tjb250cm9sLmtleV0uY29udHJvbFR5cGUgPT09ICdoaWRkZW4nXG4gICAgICBcIlxuICAgID5cbiAgICAgIDwhLS1FbmNyeXB0ZWQgRmllbGQtLT5cbiAgICAgIDxzcGFuIFt0b29sdGlwXT1cImxhYmVscy5lbmNyeXB0ZWRGaWVsZFRvb2x0aXBcIiBbdG9vbHRpcFBvc2l0aW9uXT1cIidyaWdodCdcIlxuICAgICAgICA+PGkgW2hpZGRlbl09XCIhZm9ybS5jb250cm9sc1tjb250cm9sLmtleV0uZW5jcnlwdGVkXCIgY2xhc3M9XCJiaGktbG9ja1wiPjwvaVxuICAgICAgPjwvc3Bhbj5cbiAgICAgIDwhLS1MYWJlbCAoZm9yIGhvcml6b250YWwpLS0+XG4gICAgICA8bGFiZWxcbiAgICAgICAgW2F0dHIuZm9yXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgKm5nSWY9XCJmb3JtLmxheW91dCAhPT0gJ3ZlcnRpY2FsJyAmJiBmb3JtLmNvbnRyb2xzW2NvbnRyb2wua2V5XS5sYWJlbCAmJiAhY29uZGVuc2VkXCJcbiAgICAgICAgW25nQ2xhc3NdPVwieyBlbmNyeXB0ZWQ6IGZvcm0uY29udHJvbHNbY29udHJvbC5rZXldLmVuY3J5cHRlZCB9XCJcbiAgICAgID5cbiAgICAgICAge3sgZm9ybS5jb250cm9sc1tjb250cm9sLmtleV0ubGFiZWwgfX1cbiAgICAgIDwvbGFiZWw+XG4gICAgICA8ZGl2IGNsYXNzPVwibm92by1jb250cm9sLW91dGVyLWNvbnRhaW5lclwiPlxuICAgICAgICA8IS0tTGFiZWwgKGZvciB2ZXJ0aWNhbCktLT5cbiAgICAgICAgPGxhYmVsXG4gICAgICAgICAgKm5nSWY9XCJmb3JtLmxheW91dCA9PT0gJ3ZlcnRpY2FsJyAmJiBmb3JtLmNvbnRyb2xzW2NvbnRyb2wua2V5XS5sYWJlbCAmJiAhY29uZGVuc2VkXCJcbiAgICAgICAgICBjbGFzcz1cIm5vdm8tY29udHJvbC1sYWJlbFwiXG4gICAgICAgICAgW2F0dHIuZm9yXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICBbY2xhc3Mubm92by1jb250cm9sLWVtcHR5XT1cIiFoYXNWYWx1ZVwiXG4gICAgICAgICAgW2NsYXNzLm5vdm8tY29udHJvbC1mb2N1c2VkXT1cImZvY3VzZWRcIlxuICAgICAgICAgIFtjbGFzcy5ub3ZvLWNvbnRyb2wtZmlsbGVkXT1cImhhc1ZhbHVlXCJcbiAgICAgICAgICBbY2xhc3Mubm92by1jb250cm9sLWFsd2F5cy1hY3RpdmVdPVwiYWx3YXlzQWN0aXZlIHx8IGZvcm0uY29udHJvbHNbY29udHJvbC5rZXldLnBsYWNlaG9sZGVyXCJcbiAgICAgICAgICBbY2xhc3Mubm92by1jb250cm9sLWV4dHJhLXNwYWNpbmddPVwicmVxdWlyZXNFeHRyYVNwYWNpbmdcIlxuICAgICAgICA+XG4gICAgICAgICAge3sgZm9ybS5jb250cm9sc1tjb250cm9sLmtleV0ubGFiZWwgfX1cbiAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwibm92by1jb250cm9sLWlubmVyLWNvbnRhaW5lclwiXG4gICAgICAgICAgW2NsYXNzLnJlcXVpcmVkXT1cImZvcm0uY29udHJvbHNbY29udHJvbC5rZXldLnJlcXVpcmVkICYmICFmb3JtLmNvbnRyb2xzW2NvbnRyb2wua2V5XS5yZWFkT25seVwiXG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibm92by1jb250cm9sLWlubmVyLWlucHV0LWNvbnRhaW5lclwiIFtjbGFzcy5ub3ZvLWNvbnRyb2wtZmlsbGVkXT1cImhhc1ZhbHVlXCIgW2NsYXNzLm5vdm8tY29udHJvbC1lbXB0eV09XCIhaGFzVmFsdWVcIj5cbiAgICAgICAgICAgIDwhLS1SZXF1aXJlZCBJbmRpY2F0b3ItLT5cbiAgICAgICAgICAgIDxpXG4gICAgICAgICAgICAgIFtoaWRkZW5dPVwiIWZvcm0uY29udHJvbHNbY29udHJvbC5rZXldLnJlcXVpcmVkIHx8IGZvcm0uY29udHJvbHNbY29udHJvbC5rZXldLnJlYWRPbmx5XCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJyZXF1aXJlZC1pbmRpY2F0b3Ige3sgZm9ybS5jb250cm9sc1tjb250cm9sLmtleV0uY29udHJvbFR5cGUgfX1cIlxuICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdiaGktY2lyY2xlJzogIWlzVmFsaWQsICdiaGktY2hlY2snOiBpc1ZhbGlkIH1cIlxuICAgICAgICAgICAgICAqbmdJZj1cIiFjb25kZW5zZWQgfHwgZm9ybS5jb250cm9sc1tjb250cm9sLmtleV0ucmVxdWlyZWRcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgPC9pPlxuICAgICAgICAgICAgPCEtLUZvcm0gQ29udHJvbHMtLT5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY2xhc3M9XCJub3ZvLWNvbnRyb2wtaW5wdXQge3sgZm9ybS5jb250cm9sc1tjb250cm9sLmtleV0uY29udHJvbFR5cGUgfX1cIlxuICAgICAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiY29udHJvbC5rZXlcIlxuICAgICAgICAgICAgICBbY2xhc3MuY29udHJvbC1kaXNhYmxlZF09XCJmb3JtLmNvbnRyb2xzW2NvbnRyb2wua2V5XS5kaXNhYmxlZFwiXG4gICAgICAgICAgICAgIFtjbGFzcy5oaWdobGlnaHRlZF09XCJmb3JtLmNvbnRyb2xzW2NvbnRyb2wua2V5XS5oaWdobGlnaHRlZFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDwhLS1UT0RPIHByZWZpeC9zdWZmaXggb24gdGhlIGNvbnRyb2wtLT5cbiAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInRlbXBsYXRlc1wiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGVzW2Zvcm0uY29udHJvbHNbY29udHJvbC5rZXldLmNvbnRyb2xUeXBlXTsgY29udGV4dDogdGVtcGxhdGVDb250ZXh0XCJcbiAgICAgICAgICAgICAgICA+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXRlbXBsYXRlcyB8fCBsb2FkaW5nXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tY29udHJvbC1pbnB1dC1jb250YWluZXIgbm92by1jb250cm9sLWlucHV0LXdpdGgtbGFiZWxcIj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPCEtLUVycm9yIE1lc3NhZ2UtLT5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzcz1cImZpZWxkLW1lc3NhZ2Uge3sgZm9ybS5jb250cm9sc1tjb250cm9sLmtleV0uY29udHJvbFR5cGUgfX1cIlxuICAgICAgICAgICAgKm5nSWY9XCIhY29uZGVuc2VkXCJcbiAgICAgICAgICAgIFtjbGFzcy5oYXMtdGlwXT1cImZvcm0uY29udHJvbHNbY29udHJvbC5rZXldLnRpcFdlbGxcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwic2hvd0Vycm9yU3RhdGUgfHwgc2hvd01heExlbmd0aE1ldE1lc3NhZ2UgPyAnZXJyb3Itc2hvd24nIDogJ2Vycm9yLWhpZGRlbidcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtZXNzYWdlc1wiIFtuZ0NsYXNzXT1cInNob3dNZXNzYWdlcyA/ICdjb3VudC1zaG93biBtZXNzYWdlcy1zaG93bicgOiAnY291bnQtaGlkZGVuIG1lc3NhZ2VzLWhpZGRlbidcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJlcnJvci10ZXh0XCIgKm5nSWY9XCJzaG93RmllbGRNZXNzYWdlXCI+PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImVycm9yLXRleHRcIiAqbmdJZj1cImlzRGlydHkgJiYgZXJyb3JzPy5yZXF1aXJlZCAmJiBmb3JtLmNvbnRyb2xzW2NvbnRyb2wua2V5XS5jb250cm9sVHlwZSAhPT0gJ2FkZHJlc3MnXCJcbiAgICAgICAgICAgICAgICA+e3sgZm9ybS5jb250cm9sc1tjb250cm9sLmtleV0ubGFiZWwgfCB1cHBlcmNhc2UgfX0ge3sgbGFiZWxzLmlzUmVxdWlyZWQgfX08L3NwYW5cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImVycm9yLXRleHRcIiAqbmdJZj1cImlzRGlydHkgJiYgZXJyb3JzPy5taW5sZW5ndGhcIlxuICAgICAgICAgICAgICAgID57eyBmb3JtLmNvbnRyb2xzW2NvbnRyb2wua2V5XS5sYWJlbCB8IHVwcGVyY2FzZSB9fSB7eyBsYWJlbHMubWluTGVuZ3RoIH19IHt7IGZvcm0uY29udHJvbHNbY29udHJvbC5rZXldLm1pbmxlbmd0aCB9fTwvc3BhblxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJlcnJvci10ZXh0XCJcbiAgICAgICAgICAgICAgICAqbmdJZj1cImlzRGlydHkgJiYgbWF4TGVuZ3RoTWV0ICYmIGZvY3VzZWQgJiYgIWVycm9ycz8ubWF4bGVuZ3RoICYmIGZvcm0uY29udHJvbHNbY29udHJvbC5rZXldLmNvbnRyb2xUeXBlICE9PSAncGlja2VyJ1wiXG4gICAgICAgICAgICAgICAgPnt7IGxhYmVscy5tYXhsZW5ndGhNZXQoZm9ybS5jb250cm9sc1tjb250cm9sLmtleV0ubWF4bGVuZ3RoKSB9fTwvc3BhblxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZXJyb3ItdGV4dFwiICpuZ0lmPVwiZXJyb3JzPy5tYXhsZW5ndGggJiYgZm9jdXNlZCAmJiAhZXJyb3JzPy5tYXhsZW5ndGhGaWVsZHNcIj57e1xuICAgICAgICAgICAgICAgIGxhYmVscy5pbnZhbGlkTWF4bGVuZ3RoKGZvcm0uY29udHJvbHNbY29udHJvbC5rZXldLm1heGxlbmd0aClcbiAgICAgICAgICAgICAgfX08L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZXJyb3ItdGV4dFwiICpuZ0lmPVwibWF4TGVuZ3RoTWV0ICYmIGZvcm0uY29udHJvbHNbY29udHJvbC5rZXldLmNvbnRyb2xUeXBlID09PSAncGlja2VyJ1wiPnt7XG4gICAgICAgICAgICAgICAgbGFiZWxzLm1heFJlY29yZHNSZWFjaGVkXG4gICAgICAgICAgICAgIH19PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImVycm9yLXRleHRcIiAqbmdJZj1cImlzRGlydHkgJiYgZXJyb3JzPy5pbnZhbGlkRW1haWxcIlxuICAgICAgICAgICAgICAgID57eyBmb3JtLmNvbnRyb2xzW2NvbnRyb2wua2V5XS5sYWJlbCB8IHVwcGVyY2FzZSB9fSB7eyBsYWJlbHMuaW52YWxpZEVtYWlsIH19PC9zcGFuXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJlcnJvci10ZXh0XCIgKm5nSWY9XCJpc0RpcnR5ICYmIChlcnJvcnM/LmludGVnZXJUb29MYXJnZSB8fCBlcnJvcnM/LmRvdWJsZVRvb0xhcmdlKVwiXG4gICAgICAgICAgICAgICAgPnt7IGZvcm0uY29udHJvbHNbY29udHJvbC5rZXldLmxhYmVsIHwgdXBwZXJjYXNlIH19IHt7IGxhYmVscy5pc1Rvb0xhcmdlIH19PC9zcGFuXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJpc0RpcnR5ICYmIGVycm9ycz8ubWluWWVhclwiPnt7IGZvcm0uY29udHJvbHNbY29udHJvbC5rZXldLmxhYmVsIHwgdXBwZXJjYXNlIH19IHt7IGxhYmVscy5ub3RWYWxpZFllYXIgfX08L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZXJyb3ItdGV4dFwiICpuZ0lmPVwiaXNEaXJ0eSAmJiBlcnJvcnM/LmN1c3RvbVwiPnt7IGVycm9ycy5jdXN0b20gfX08L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZXJyb3ItdGV4dFwiICpuZ0lmPVwiZXJyb3JzPy5tYXhsZW5ndGggJiYgZXJyb3JzPy5tYXhsZW5ndGhGaWVsZHMgJiYgbWF4bGVuZ3RoRXJyb3JGaWVsZCAmJiBmb2N1c2VkXCI+XG4gICAgICAgICAgICAgICAge3tcbiAgICAgICAgICAgICAgICAgIGxhYmVscy5pbnZhbGlkTWF4bGVuZ3RoV2l0aEZpZWxkKFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sLmNvbmZpZ1ttYXhsZW5ndGhFcnJvckZpZWxkXT8ubGFiZWwsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2wuY29uZmlnW21heGxlbmd0aEVycm9yRmllbGRdPy5tYXhsZW5ndGhcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJlcnJvci10ZXh0XCJcbiAgICAgICAgICAgICAgICAqbmdJZj1cImlzRGlydHkgJiYgbWF4bGVuZ3RoTWV0RmllbGQgJiYgZm9jdXNlZCAmJiAhZXJyb3JzPy5tYXhsZW5ndGhGaWVsZHM/LmluY2x1ZGVzKG1heGxlbmd0aE1ldEZpZWxkKVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7eyBsYWJlbHMubWF4bGVuZ3RoTWV0V2l0aEZpZWxkKGNvbnRyb2wuY29uZmlnW21heGxlbmd0aE1ldEZpZWxkXT8ubGFiZWwsIGNvbnRyb2wuY29uZmlnW21heGxlbmd0aE1ldEZpZWxkXT8ubWF4bGVuZ3RoKSB9fVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaXNEaXJ0eSAmJiBlcnJvcnM/LmludmFsaWRBZGRyZXNzXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJlcnJvci10ZXh0XCIgKm5nRm9yPVwibGV0IGludmFsaWRBZGRyZXNzRmllbGQgb2YgZXJyb3JzPy5pbnZhbGlkQWRkcmVzc0ZpZWxkc1wiXG4gICAgICAgICAgICAgICAgICA+e3sgaW52YWxpZEFkZHJlc3NGaWVsZCB8IHVwcGVyY2FzZSB9fSB7eyBsYWJlbHMuaXNSZXF1aXJlZCB9fVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8IS0tRmllbGQgSGludC0tPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGVzY3JpcHRpb25cIiAqbmdJZj1cImZvcm0uY29udHJvbHNbY29udHJvbC5rZXldLmRlc2NyaXB0aW9uXCIgW2lubmVySFRNTF09XCJmb3JtLmNvbnRyb2xzW2NvbnRyb2wua2V5XS5kZXNjcmlwdGlvblwiPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ3YXJuaW5nLXRleHRcIiAqbmdJZj1cImZvcm0uY29udHJvbHNbY29udHJvbC5rZXldLndhcm5pbmdcIj57eyBmb3JtLmNvbnRyb2xzW2NvbnRyb2wua2V5XS53YXJuaW5nIH19PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICBjbGFzcz1cImNoYXJhY3Rlci1jb3VudFwiXG4gICAgICAgICAgICAgIFtjbGFzcy5lcnJvcl09XCJcbiAgICAgICAgICAgICAgICAoZXJyb3JzPy5tYXhsZW5ndGggJiYgIWVycm9ycz8ubWF4bGVuZ3RoRmllbGRzKSB8fFxuICAgICAgICAgICAgICAgIChlcnJvcnM/Lm1heGxlbmd0aCAmJiBlcnJvcnM/Lm1heGxlbmd0aEZpZWxkcyAmJiBlcnJvcnMubWF4bGVuZ3RoRmllbGRzLmluY2x1ZGVzKGZvY3VzZWRGaWVsZCkpXG4gICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICpuZ0lmPVwic2hvd0NvdW50ICYmIGZvcm0uY29udHJvbHNbY29udHJvbC5rZXldLmNvbnRyb2xUeXBlICE9PSAncGlja2VyJ1wiXG4gICAgICAgICAgICAgID57eyBpdGVtQ291bnQgfX0ve3sgbWF4TGVuZ3RoIHx8IGZvcm0uY29udHJvbHNbY29udHJvbC5rZXldLm1heGxlbmd0aCB9fTwvc3BhblxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgY2xhc3M9XCJyZWNvcmQtY291bnRcIlxuICAgICAgICAgICAgICBbY2xhc3MuemVyby1jb3VudF09XCJpdGVtQ291bnQgPT09IDBcIlxuICAgICAgICAgICAgICBbY2xhc3Mucm93LXBpY2tlcl09XCJmb3JtLmNvbnRyb2xzW3RoaXMuY29udHJvbC5rZXldLmNvbmZpZy5jb2x1bW5zXCJcbiAgICAgICAgICAgICAgKm5nSWY9XCJzaG93Q291bnQgJiYgZm9ybS5jb250cm9sc1tjb250cm9sLmtleV0uY29udHJvbFR5cGUgPT09ICdwaWNrZXInXCJcbiAgICAgICAgICAgICAgPnt7IGl0ZW1Db3VudCB9fS97eyBtYXhMZW5ndGggfHwgZm9ybS5jb250cm9sc1tjb250cm9sLmtleV0ubWF4bGVuZ3RoIH19PC9zcGFuXG4gICAgICAgICAgICA+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPCEtLVRpcCBXZWwtLT5cbiAgICAgICAgICA8bm92by10aXAtd2VsbFxuICAgICAgICAgICAgKm5nSWY9XCJmb3JtLmNvbnRyb2xzW2NvbnRyb2wua2V5XS50aXBXZWxsXCJcbiAgICAgICAgICAgIFtuYW1lXT1cImNvbnRyb2wua2V5XCJcbiAgICAgICAgICAgIFt0aXBdPVwiZm9ybS5jb250cm9sc1tjb250cm9sLmtleV0/LnRpcFdlbGw/LnRpcFwiXG4gICAgICAgICAgICBbaWNvbl09XCJmb3JtLmNvbnRyb2xzW2NvbnRyb2wua2V5XT8udGlwV2VsbD8uaWNvblwiXG4gICAgICAgICAgICBbYnV0dG9uXT1cImZvcm0uY29udHJvbHNbY29udHJvbC5rZXldPy50aXBXZWxsPy5idXR0b25cIlxuICAgICAgICAgICAgW3Nhbml0aXplXT1cImZvcm0uY29udHJvbHNbY29udHJvbC5rZXldPy50aXBXZWxsPy5zYW5pdGl6ZVwiXG4gICAgICAgICAgPjwvbm92by10aXAtd2VsbD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxpICpuZ0lmPVwiZm9ybS5jb250cm9sc1tjb250cm9sLmtleV0uZmllbGRJbnRlcmFjdGlvbmxvYWRpbmdcIiBjbGFzcz1cImxvYWRpbmdcIj5cbiAgICAgICAgICA8c3ZnXG4gICAgICAgICAgICB2ZXJzaW9uPVwiMS4xXCJcbiAgICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgICAgICAgICAgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCJcbiAgICAgICAgICAgIHhtbG5zOmE9XCJodHRwOi8vbnMuYWRvYmUuY29tL0Fkb2JlU1ZHVmlld2VyRXh0ZW5zaW9ucy8zLjAvXCJcbiAgICAgICAgICAgIHg9XCIwcHhcIlxuICAgICAgICAgICAgeT1cIjBweFwiXG4gICAgICAgICAgICB3aWR0aD1cIjE4LjJweFwiXG4gICAgICAgICAgICBoZWlnaHQ9XCIxOC41cHhcIlxuICAgICAgICAgICAgdmlld0JveD1cIjAgMCAxOC4yIDE4LjVcIlxuICAgICAgICAgICAgc3R5bGU9XCJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE4LjIgMTguNTtcIlxuICAgICAgICAgICAgeG1sOnNwYWNlPVwicHJlc2VydmVcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj5cbiAgICAgICAgICAgICAgLnNwaW5uZXIge1xuICAgICAgICAgICAgICAgIGZpbGw6ICNmZmZmZmY7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvc3R5bGU+XG4gICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICBjbGFzcz1cInNwaW5uZXJcIlxuICAgICAgICAgICAgICBkPVwiTTkuMiwxOC41QzQuMSwxOC41LDAsMTQuNCwwLDkuMlM0LjEsMCw5LjIsMGMwLjksMCwxLjksMC4xLDIuNywwLjRjMC44LDAuMiwxLjIsMS4xLDEsMS45XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYy0wLjIsMC44LTEuMSwxLjItMS45LDFDMTAuNSwzLjEsOS45LDMsOS4yLDNDNS44LDMsMyw1LjgsMyw5LjJzMi44LDYuMiw2LjIsNi4yYzIuOCwwLDUuMy0xLjksNi00LjdjMC4yLTAuOCwxLTEuMywxLjgtMS4xXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYzAuOCwwLjIsMS4zLDEsMS4xLDEuOEMxNy4xLDE1LjcsMTMuNCwxOC41LDkuMiwxOC41elwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvc3ZnPlxuICAgICAgICA8L2k+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3NdJzogJ2Zvcm0uY29udHJvbHNbY29udHJvbC5rZXldLmNvbnRyb2xUeXBlJyxcbiAgICAnW2F0dHIuZGF0YS1jb250cm9sLXR5cGVdJzogJ2Zvcm0uY29udHJvbHNbY29udHJvbC5rZXldLmNvbnRyb2xUeXBlJyxcbiAgICAnW2NsYXNzLmRpc2FibGVkXSc6ICdmb3JtLmNvbnRyb2xzW2NvbnRyb2wua2V5XS5yZWFkT25seScsXG4gICAgJ1tjbGFzcy5oaWRkZW5dJzogJ2Zvcm0uY29udHJvbHNbY29udHJvbC5rZXldLmhpZGRlbicsXG4gICAgJ1thdHRyLmRhdGEtY29udHJvbC1rZXldJzogJ2NvbnRyb2wua2V5JyxcbiAgICAnW2NsYXNzLmlubGluZS1lbWJlZGRlZF0nOiAnY29udHJvbC5pc0lubGluZUVtYmVkZGVkJyxcbiAgICAnW2NsYXNzLmVtYmVkZGVkXSc6ICdjb250cm9sLmlzRW1iZWRkZWQnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQ29udHJvbEVsZW1lbnQgZXh0ZW5kcyBPdXRzaWRlQ2xpY2sgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIEBJbnB1dCgpXG4gIGNvbnRyb2w6IGFueTtcbiAgQElucHV0KClcbiAgZm9ybTogYW55O1xuICBASW5wdXQoKVxuICBjb25kZW5zZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KClcbiAgYXV0b0ZvY3VzOiBib29sZWFuID0gZmFsc2U7XG4gIEBPdXRwdXQoKVxuICBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgZWRpdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBzYXZlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIGRlbGV0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICB1cGxvYWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCdibHVyJylcbiAgZ2V0IG9uQmx1cigpOiBPYnNlcnZhYmxlPEZvY3VzRXZlbnQ+IHtcbiAgICByZXR1cm4gdGhpcy5fYmx1ckVtaXR0ZXIuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBAT3V0cHV0KCdmb2N1cycpXG4gIGdldCBvbkZvY3VzKCk6IE9ic2VydmFibGU8Rm9jdXNFdmVudD4ge1xuICAgIHJldHVybiB0aGlzLl9mb2N1c0VtaXR0ZXIuYXNPYnNlcnZhYmxlKCk7XG4gIH1cbiAgcHVibGljIG1heExlbmd0aDogbnVtYmVyO1xuICBwdWJsaWMgZm9jdXNlZEZpZWxkOiBzdHJpbmc7XG4gIGZvcm1hdHRlZFZhbHVlOiBzdHJpbmcgPSAnJztcbiAgcGVyY2VudFZhbHVlOiBudW1iZXI7XG4gIG1heExlbmd0aE1ldDogYm9vbGVhbiA9IGZhbHNlO1xuICBpdGVtQ291bnQ6IG51bWJlciA9IDA7XG4gIG1hc2tPcHRpb25zOiBJTWFza09wdGlvbnM7XG5cbiAgcHJpdmF0ZSBfYmx1ckVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxGb2N1c0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4oKTtcbiAgcHJpdmF0ZSBfZm9jdXNFbWl0dGVyOiBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEZvY3VzRXZlbnQ+KCk7XG4gIHByaXZhdGUgX2ZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfZW50ZXJlZFRleHQ6IHN0cmluZyA9ICcnO1xuICBwcml2YXRlIGZvcmNlQ2xlYXJTdWJzY3JpcHRpb246IGFueTtcbiAgcHJpdmF0ZSBwZXJjZW50Q2hhbmdlU3Vic2NyaXB0aW9uOiBhbnk7XG4gIHByaXZhdGUgdmFsdWVDaGFuZ2VTdWJzY3JpcHRpb246IGFueTtcbiAgcHJpdmF0ZSBkYXRlQ2hhbmdlU3Vic2NyaXB0aW9uOiBhbnk7XG4gIHByaXZhdGUgX3Nob3dDb3VudDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGNoYXJhY3RlckNvdW50RmllbGQ6IHN0cmluZztcbiAgcHJpdmF0ZSBtYXhMZW5ndGhNZXRFcnJvcmZpZWxkczogc3RyaW5nW10gPSBbXTtcbiAgcHJpdmF0ZSBzdGF0dXNDaGFuZ2VTdWJzY3JpcHRpb246IGFueTtcblxuICB0ZW1wbGF0ZXM6IGFueSA9IHt9O1xuICB0ZW1wbGF0ZUNvbnRleHQ6IGFueTtcbiAgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSxcbiAgICBwcml2YXRlIGRhdGVGb3JtYXRTZXJ2aWNlOiBEYXRlRm9ybWF0U2VydmljZSxcbiAgICBwcml2YXRlIGZpZWxkSW50ZXJhY3Rpb25BcGk6IEZpZWxkSW50ZXJhY3Rpb25BcGksXG4gICAgcHJpdmF0ZSB0ZW1wbGF0ZVNlcnZpY2U6IE5vdm9UZW1wbGF0ZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQEluamVjdChMT0NBTEVfSUQpIHB1YmxpYyBsb2NhbGU6IHN0cmluZyA9ICdlbi1VUycsXG4gICkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuICB9XG5cbiAgZ2V0IG1heGxlbmd0aE1ldEZpZWxkKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMubWF4TGVuZ3RoTWV0RXJyb3JmaWVsZHMgJiYgdGhpcy5tYXhMZW5ndGhNZXRFcnJvcmZpZWxkcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLm1heExlbmd0aE1ldEVycm9yZmllbGRzLmZpbmQoKGZpZWxkOiBzdHJpbmcpID0+IGZpZWxkID09PSB0aGlzLmZvY3VzZWRGaWVsZCkgfHwgJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH1cblxuICBnZXQgbWF4bGVuZ3RoRXJyb3JGaWVsZCgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmVycm9ycyAmJiB0aGlzLmVycm9ycy5tYXhsZW5ndGhGaWVsZHMgJiYgdGhpcy5lcnJvcnMubWF4bGVuZ3RoRmllbGRzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMuZXJyb3JzLm1heGxlbmd0aEZpZWxkcy5maW5kKChmaWVsZDogc3RyaW5nKSA9PiBmaWVsZCA9PT0gdGhpcy5mb2N1c2VkRmllbGQpIHx8ICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHNob3dGaWVsZE1lc3NhZ2UoKSB7XG4gICAgcmV0dXJuICF0aGlzLmVycm9ycyAmJiAhdGhpcy5tYXhMZW5ndGhNZXQgJiYgSGVscGVycy5pc0JsYW5rKHRoaXMuY29udHJvbC5kZXNjcmlwdGlvbik7XG4gIH1cblxuICBnZXQgc2hvd01heExlbmd0aE1ldE1lc3NhZ2UoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICh0aGlzLmlzRGlydHkgJiYgdGhpcy5tYXhMZW5ndGhNZXQgJiYgdGhpcy5mb2N1c2VkICYmICghdGhpcy5lcnJvcnMgfHwgKHRoaXMuZXJyb3JzICYmICF0aGlzLmVycm9ycy5tYXhsZW5ndGgpKSkgfHxcbiAgICAgICh0aGlzLmlzRGlydHkgJiZcbiAgICAgICAgdGhpcy5tYXhsZW5ndGhNZXRGaWVsZCAmJlxuICAgICAgICB0aGlzLmZvY3VzZWQgJiZcbiAgICAgICAgKCF0aGlzLmVycm9ycyB8fCAodGhpcy5lcnJvcnMgJiYgIXRoaXMuZXJyb3JzLm1heGxlbmd0aEZpZWxkcy5pbmNsdWRlcyh0aGlzLm1heGxlbmd0aE1ldEZpZWxkKSkpKVxuICAgICk7XG4gIH1cblxuICBnZXQgc2hvd0Vycm9yU3RhdGUoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICh0aGlzLmlzRGlydHkgJiYgdGhpcy5lcnJvcnMpIHx8XG4gICAgICAodGhpcy5mb2N1c2VkICYmIHRoaXMuZXJyb3JzICYmIHRoaXMuZXJyb3JzLm1heGxlbmd0aCAmJiB0aGlzLmVycm9ycy5tYXhsZW5ndGhGaWVsZHMpIHx8XG4gICAgICAodGhpcy5mb2N1c2VkICYmIHRoaXMuZXJyb3JzICYmIHRoaXMuZXJyb3JzLm1heGxlbmd0aCAmJiB0aGlzLmVycm9ycy5tYXhsZW5ndGhGaWVsZHMgJiYgdGhpcy5tYXhsZW5ndGhFcnJvckZpZWxkKVxuICAgICk7XG4gIH1cblxuICBnZXQgc2hvd0NvdW50KCkge1xuICAgIGNvbnN0IE1BWF9MRU5HVEhfQ09OVFJPTF9UWVBFUzogc3RyaW5nW10gPSBbJ3RleHRib3gnLCAncGlja2VyJywgJ3RleHQtYXJlYSddO1xuICAgIGNvbnN0IGNoYXJDb3VudDogYm9vbGVhbiA9XG4gICAgICB0aGlzLmZvY3VzZWQgJiZcbiAgICAgICEhdGhpcy5mb3JtLmNvbnRyb2xzW3RoaXMuY29udHJvbC5rZXldLm1heGxlbmd0aCAmJlxuICAgICAgTUFYX0xFTkdUSF9DT05UUk9MX1RZUEVTLmluY2x1ZGVzKHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmNvbnRyb2wua2V5XS5jb250cm9sVHlwZSk7XG4gICAgcmV0dXJuIHRoaXMuX3Nob3dDb3VudCB8fCBjaGFyQ291bnQ7XG4gIH1cblxuICBzZXQgc2hvd0NvdW50KHZhbHVlKSB7XG4gICAgdGhpcy5fc2hvd0NvdW50ID0gdmFsdWU7XG4gIH1cblxuICBnZXQgc2hvd01lc3NhZ2VzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnNob3dDb3VudCB8fFxuICAgICAgIUhlbHBlcnMuaXNFbXB0eSh0aGlzLmZvcm0uY29udHJvbHNbdGhpcy5jb250cm9sLmtleV0ud2FybmluZykgfHxcbiAgICAgICFIZWxwZXJzLmlzRW1wdHkodGhpcy5mb3JtLmNvbnRyb2xzW3RoaXMuY29udHJvbC5rZXldLmRlc2NyaXB0aW9uKVxuICAgICk7XG4gIH1cblxuICBnZXQgZGVjaW1hbFNlcGFyYXRvcigpOiBzdHJpbmcge1xuICAgIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQodGhpcy5sb2NhbGUpLmZvcm1hdCgxLjIpWzFdO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGNvbnN0IERPX05PVF9GT0NVU19NRTogc3RyaW5nW10gPSBbJ3BpY2tlcicsICd0aW1lJywgJ2RhdGUnLCAnZGF0ZS10aW1lJ107XG4gICAgaWYgKHRoaXMuYXV0b0ZvY3VzICYmICFET19OT1RfRk9DVVNfTUUuaW5jbHVkZXModGhpcy5jb250cm9sLmNvbnRyb2xUeXBlKSkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGlucHV0OiBIVE1MRWxlbWVudCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7XG4gICAgICAgIGlmIChpbnB1dCkge1xuICAgICAgICAgIGlucHV0LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAvLyBTdWJzY3JpYmUgdG8gY29udHJvbCBpbnRlcmFjdGlvbnNcbiAgICBpZiAodGhpcy5jb250cm9sLmludGVyYWN0aW9ucyAmJiAhdGhpcy5mb3JtLmNvbnRyb2xzW3RoaXMuY29udHJvbC5rZXldLnJlc3RyaWN0RmllbGRJbnRlcmFjdGlvbnMpIHtcbiAgICAgIGZvciAoY29uc3QgaW50ZXJhY3Rpb24gb2YgdGhpcy5jb250cm9sLmludGVyYWN0aW9ucykge1xuICAgICAgICBzd2l0Y2ggKGludGVyYWN0aW9uLmV2ZW50KSB7XG4gICAgICAgICAgY2FzZSAnYmx1cic6XG4gICAgICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlU3Vic2NyaXB0aW9uID0gdGhpcy5vbkJsdXIucGlwZShkZWJvdW5jZVRpbWUoMzAwKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKCF0aGlzLmZvcm0uY29udHJvbHNbdGhpcy5jb250cm9sLmtleV0ucmVzdHJpY3RGaWVsZEludGVyYWN0aW9ucykge1xuICAgICAgICAgICAgICAgIHRoaXMuZXhlY3V0ZUludGVyYWN0aW9uKGludGVyYWN0aW9uKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdmb2N1cyc6XG4gICAgICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlU3Vic2NyaXB0aW9uID0gdGhpcy5vbkZvY3VzLnBpcGUoZGVib3VuY2VUaW1lKDMwMCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICghdGhpcy5mb3JtLmNvbnRyb2xzW3RoaXMuY29udHJvbC5rZXldLnJlc3RyaWN0RmllbGRJbnRlcmFjdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4ZWN1dGVJbnRlcmFjdGlvbihpbnRlcmFjdGlvbik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnY2hhbmdlJzpcbiAgICAgICAgICAgIHRoaXMudmFsdWVDaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLmZvcm0uY29udHJvbHNbdGhpcy5jb250cm9sLmtleV0udmFsdWVDaGFuZ2VzLnBpcGUoZGVib3VuY2VUaW1lKDMwMCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICghdGhpcy5mb3JtLmNvbnRyb2xzW3RoaXMuY29udHJvbC5rZXldLnJlc3RyaWN0RmllbGRJbnRlcmFjdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4ZWN1dGVJbnRlcmFjdGlvbihpbnRlcmFjdGlvbik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnaW5pdCc6XG4gICAgICAgICAgICBpbnRlcmFjdGlvbi5pbnZva2VPbkluaXQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbnRlcmFjdGlvbi5pbnZva2VPbkluaXQpIHtcbiAgICAgICAgICBpZiAoIXRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmNvbnRyb2wua2V5XS5yZXN0cmljdEZpZWxkSW50ZXJhY3Rpb25zKSB7XG4gICAgICAgICAgICB0aGlzLmV4ZWN1dGVJbnRlcmFjdGlvbihpbnRlcmFjdGlvbiwgdHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy50ZW1wbGF0ZXMgPSB0aGlzLnRlbXBsYXRlU2VydmljZS5nZXRBbGwoKTtcbiAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgLy8gTWFrZSBzdXJlIHRvIGluaXRpYWxseSBmb3JtYXQgdGhlIHRpbWUgY29udHJvbHNcbiAgICBpZiAodGhpcy5jb250cm9sICYmIHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmNvbnRyb2wua2V5XS52YWx1ZSkge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmZvcm0uY29udHJvbHNbdGhpcy5jb250cm9sLmtleV0uY29udHJvbFR5cGUgPT09ICd0ZXh0Ym94JyB8fFxuICAgICAgICB0aGlzLmZvcm0uY29udHJvbHNbdGhpcy5jb250cm9sLmtleV0uY29udHJvbFR5cGUgPT09ICd0ZXh0LWFyZWEnXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5pdGVtQ291bnQgPSB0aGlzLmZvcm0uY29udHJvbHNbdGhpcy5jb250cm9sLmtleV0udmFsdWUubGVuZ3RoO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5jb250cm9sKSB7XG4gICAgICAvLyBMaXN0ZW4gdG8gY2xlYXIgZXZlbnRzXG4gICAgICB0aGlzLmZvcmNlQ2xlYXJTdWJzY3JpcHRpb24gPSB0aGlzLmNvbnRyb2wuZm9yY2VDbGVhci5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmNsZWFyVmFsdWUoKTtcbiAgICAgIH0pO1xuICAgICAgLy8gRm9yIEFzeW5jaHJvbm91cyB2YWxpZGF0aW9uc1xuICAgICAgdGhpcy5zdGF0dXNDaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLmZvcm0uY29udHJvbHNbdGhpcy5jb250cm9sLmtleV0uc3RhdHVzQ2hhbmdlcy5zdWJzY3JpYmUoKHZhbGlkaXR5KSA9PiB7XG4gICAgICAgIHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmNvbnRyb2wua2V5XSA9IHRoaXMudGVtcGxhdGVDb250ZXh0LiRpbXBsaWNpdDtcbiAgICAgICAgaWYgKHZhbGlkaXR5ICE9PSAnUEVORElORycgJiYgdGhpcy5mb3JtLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkpIHtcbiAgICAgICAgICB0aGlzLmZvcm0udXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy50ZW1wbGF0ZUNvbnRleHQgPSB7XG4gICAgICAkaW1wbGljaXQ6IHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmNvbnRyb2wua2V5XSxcbiAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgcmVzdHJpY3RLZXlzOiB0aGlzLnJlc3RyaWN0S2V5cy5iaW5kKHRoaXMpLFxuICAgICAgICBlbWl0Q2hhbmdlOiB0aGlzLmVtaXRDaGFuZ2UuYmluZCh0aGlzKSxcbiAgICAgICAgaGFuZGxlU2ltcGxlVGV4dElucHV0OiB0aGlzLmhhbmRsZVNpbXBsZVRleHRJbnB1dC5iaW5kKHRoaXMpLFxuICAgICAgICBoYW5kbGVBY2NlcHQ6IHRoaXMuaGFuZGxlQWNjZXB0LmJpbmQodGhpcyksXG4gICAgICAgIGhhbmRsZUZvY3VzOiB0aGlzLmhhbmRsZUZvY3VzLmJpbmQodGhpcyksXG4gICAgICAgIGhhbmRsZVBlcmNlbnRDaGFuZ2U6IHRoaXMuaGFuZGxlUGVyY2VudENoYW5nZS5iaW5kKHRoaXMpLFxuICAgICAgICBoYW5kbGVCbHVyOiB0aGlzLmhhbmRsZUJsdXIuYmluZCh0aGlzKSxcbiAgICAgICAgaGFuZGxlVGV4dEFyZWFJbnB1dDogdGhpcy5oYW5kbGVUZXh0QXJlYUlucHV0LmJpbmQodGhpcyksXG4gICAgICAgIGhhbmRsZUVkaXQ6IHRoaXMuaGFuZGxlRWRpdC5iaW5kKHRoaXMpLFxuICAgICAgICBoYW5kbGVTYXZlOiB0aGlzLmhhbmRsZVNhdmUuYmluZCh0aGlzKSxcbiAgICAgICAgaGFuZGxlRGVsZXRlOiB0aGlzLmhhbmRsZURlbGV0ZS5iaW5kKHRoaXMpLFxuICAgICAgICBoYW5kbGVVcGxvYWQ6IHRoaXMuaGFuZGxlVXBsb2FkLmJpbmQodGhpcyksXG4gICAgICAgIG1vZGVsQ2hhbmdlOiB0aGlzLm1vZGVsQ2hhbmdlLmJpbmQodGhpcyksXG4gICAgICAgIG1vZGVsQ2hhbmdlV2l0aFJhdzogdGhpcy5tb2RlbENoYW5nZVdpdGhSYXcuYmluZCh0aGlzKSxcbiAgICAgICAgaGFuZGxlQWRkcmVzc0NoYW5nZTogdGhpcy5oYW5kbGVBZGRyZXNzQ2hhbmdlLmJpbmQodGhpcyksXG4gICAgICAgIGhhbmRsZVR5cGluZzogdGhpcy5oYW5kbGVUeXBpbmcuYmluZCh0aGlzKSxcbiAgICAgICAgdXBkYXRlVmFsaWRpdHk6IHRoaXMudXBkYXRlVmFsaWRpdHkuYmluZCh0aGlzKSxcbiAgICAgICAgdG9nZ2xlQWN0aXZlOiB0aGlzLnRvZ2dsZUFjdGl2ZS5iaW5kKHRoaXMpLFxuICAgICAgICB2YWxpZGF0ZUludGVnZXJJbnB1dDogdGhpcy52YWxpZGF0ZUludGVnZXJJbnB1dC5iaW5kKHRoaXMpLFxuICAgICAgICB2YWxpZGF0ZU51bWJlck9uQmx1cjogdGhpcy52YWxpZGF0ZU51bWJlck9uQmx1ci5iaW5kKHRoaXMpLFxuICAgICAgfSxcbiAgICAgIGZvcm06IHRoaXMuZm9ybSxcbiAgICB9O1xuICAgIHRoaXMudGVtcGxhdGVDb250ZXh0LiRpbXBsaWNpdC50b29sdGlwUG9zaXRpb24gPSB0aGlzLnRvb2x0aXBQb3NpdGlvbjtcbiAgICB0aGlzLnRlbXBsYXRlQ29udGV4dC4kaW1wbGljaXQudG9vbHRpcCA9IHRoaXMudG9vbHRpcDtcbiAgICB0aGlzLnRlbXBsYXRlQ29udGV4dC4kaW1wbGljaXQudG9vbHRpcFNpemUgPSB0aGlzLnRvb2x0aXBTaXplO1xuICAgIHRoaXMudGVtcGxhdGVDb250ZXh0LiRpbXBsaWNpdC50b29sdGlwUHJlbGluZSA9IHRoaXMudG9vbHRpcFByZWxpbmU7XG4gICAgdGhpcy50ZW1wbGF0ZUNvbnRleHQuJGltcGxpY2l0LnJlbW92ZVRvb2x0aXBBcnJvdyA9IHRoaXMucmVtb3ZlVG9vbHRpcEFycm93O1xuICAgIHRoaXMudGVtcGxhdGVDb250ZXh0LiRpbXBsaWNpdC5zdGFydHVwRm9jdXMgPSB0aGlzLmZvcm0uY29udHJvbHNbdGhpcy5jb250cm9sLmtleV0uc3RhcnR1cEZvY3VzO1xuICAgIHRoaXMudGVtcGxhdGVDb250ZXh0LiRpbXBsaWNpdC5maWxlQnJvd3NlckltYWdlVXBsb2FkVXJsID0gdGhpcy5mb3JtLmNvbnRyb2xzW3RoaXMuY29udHJvbC5rZXldLmZpbGVCcm93c2VySW1hZ2VVcGxvYWRVcmw7XG4gICAgdGhpcy50ZW1wbGF0ZUNvbnRleHQuJGltcGxpY2l0Lm1pbmltYWwgPSB0aGlzLmZvcm0uY29udHJvbHNbdGhpcy5jb250cm9sLmtleV0ubWluaW1hbDtcbiAgICB0aGlzLnRlbXBsYXRlQ29udGV4dC4kaW1wbGljaXQuY3VycmVuY3lGb3JtYXQgPSB0aGlzLmZvcm0uY29udHJvbHNbdGhpcy5jb250cm9sLmtleV0uY3VycmVuY3lGb3JtYXQ7XG4gICAgdGhpcy50ZW1wbGF0ZUNvbnRleHQuJGltcGxpY2l0LnBlcmNlbnRWYWx1ZSA9IHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmNvbnRyb2wua2V5XS5wZXJjZW50VmFsdWU7XG4gICAgdGhpcy50ZW1wbGF0ZUNvbnRleHQuJGltcGxpY2l0LmNvbmZpZyA9IHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmNvbnRyb2wua2V5XS5jb25maWc7XG5cbiAgICBpZiAodGhpcy5mb3JtLmNvbnRyb2xzW3RoaXMuY29udHJvbC5rZXldICYmIHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmNvbnRyb2wua2V5XS5zdWJUeXBlID09PSAncGVyY2VudGFnZScpIHtcbiAgICAgIGlmICghSGVscGVycy5pc0VtcHR5KHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmNvbnRyb2wua2V5XS52YWx1ZSkpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZUNvbnRleHQuJGltcGxpY2l0LnBlcmNlbnRWYWx1ZSA9IE51bWJlcihcbiAgICAgICAgICAodGhpcy5mb3JtLmNvbnRyb2xzW3RoaXMuY29udHJvbC5rZXldLnZhbHVlICogMTAwKS50b0ZpeGVkKDYpLnJlcGxhY2UoL1xcLj8wKiQvLCAnJyksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICB0aGlzLnBlcmNlbnRDaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLmZvcm0uY29udHJvbHNbdGhpcy5jb250cm9sLmtleV0uZGlzcGxheVZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gICAgICAgIGlmICghSGVscGVycy5pc0VtcHR5KHZhbHVlKSAmJiAhaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgdGhpcy50ZW1wbGF0ZUNvbnRleHQuJGltcGxpY2l0LnBlcmNlbnRWYWx1ZSA9IE51bWJlcigodmFsdWUgKiAxMDApLnRvRml4ZWQoNikucmVwbGFjZSgvXFwuPzAqJC8sICcnKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoSGVscGVycy5pc0VtcHR5KHZhbHVlKSkge1xuICAgICAgICAgIHRoaXMudGVtcGxhdGVDb250ZXh0LiRpbXBsaWNpdC5wZXJjZW50VmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIC8vIFVuc3Vic2NyaWJlIGZyb20gY29udHJvbCBpbnRlcmFjdGlvbnNcbiAgICBpZiAodGhpcy52YWx1ZUNoYW5nZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy52YWx1ZUNoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICAvLyBpZiAodGhpcy5kYXRlQ2hhbmdlU3Vic2NyaXB0aW9uKSB7XG4gICAgLy8gICAgIHRoaXMuZGF0ZUNoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIC8vIH1cbiAgICBpZiAodGhpcy5mb3JjZUNsZWFyU3Vic2NyaXB0aW9uKSB7XG4gICAgICAvLyBVbi1saXN0ZW4gZm9yIGNsZWFyIGV2ZW50c1xuICAgICAgdGhpcy5mb3JjZUNsZWFyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnBlcmNlbnRDaGFuZ2VTdWJzY3JpcHRpb24pIHtcbiAgICAgIC8vIFVuLWxpc3RlbiBmb3IgY2xlYXIgZXZlbnRzXG4gICAgICB0aGlzLnBlcmNlbnRDaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGF0ZUNoYW5nZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5kYXRlQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnN0YXR1c0NoYW5nZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5zdGF0dXNDaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgfVxuXG4gIGdldCBlcnJvcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmNvbnRyb2wua2V5XS5lcnJvcnM7XG4gIH1cblxuICBnZXQgaXNWYWxpZCgpIHtcbiAgICByZXR1cm4gdGhpcy5mb3JtLmNvbnRyb2xzW3RoaXMuY29udHJvbC5rZXldLnZhbGlkO1xuICB9XG5cbiAgZ2V0IGlzRGlydHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmNvbnRyb2wua2V5XS5kaXJ0eSB8fCB0aGlzLmNvbnRyb2wuZGlydHk7XG4gIH1cblxuICBnZXQgaGFzVmFsdWUoKSB7XG4gICAgcmV0dXJuICFIZWxwZXJzLmlzRW1wdHkodGhpcy5mb3JtLmdldFJhd1ZhbHVlKClbdGhpcy5jb250cm9sLmtleV0pO1xuICB9XG5cbiAgZ2V0IGZvY3VzZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZvY3VzZWQ7XG4gIH1cblxuICBnZXQgdG9vbHRpcCgpIHtcbiAgICByZXR1cm4gdGhpcy5mb3JtLmNvbnRyb2xzW3RoaXMuY29udHJvbC5rZXldLnRvb2x0aXA7XG4gIH1cblxuICBnZXQgdG9vbHRpcFBvc2l0aW9uKCkge1xuICAgIGlmIChIZWxwZXJzLmlzQmxhbmsodGhpcy5mb3JtLmNvbnRyb2xzW3RoaXMuY29udHJvbC5rZXldLnRvb2x0aXBQb3NpdGlvbikpIHtcbiAgICAgIHJldHVybiAncmlnaHQnO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5mb3JtLmNvbnRyb2xzW3RoaXMuY29udHJvbC5rZXldLnRvb2x0aXBQb3NpdGlvbjtcbiAgfVxuXG4gIGdldCB0b29sdGlwU2l6ZSgpIHtcbiAgICBpZiAoSGVscGVycy5pc0JsYW5rKHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmNvbnRyb2wua2V5XS50b29sdGlwU2l6ZSkpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmNvbnRyb2wua2V5XS50b29sdGlwU2l6ZTtcbiAgfVxuXG4gIGdldCB0b29sdGlwUHJlbGluZSgpIHtcbiAgICBpZiAoSGVscGVycy5pc0JsYW5rKHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmNvbnRyb2wua2V5XS50b29sdGlwUHJlbGluZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmNvbnRyb2wua2V5XS50b29sdGlwUHJlbGluZTtcbiAgfVxuXG4gIGdldCByZW1vdmVUb29sdGlwQXJyb3coKSB7XG4gICAgaWYgKEhlbHBlcnMuaXNCbGFuayh0aGlzLmZvcm0uY29udHJvbHNbdGhpcy5jb250cm9sLmtleV0ucmVtb3ZlVG9vbHRpcEFycm93KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5mb3JtLmNvbnRyb2xzW3RoaXMuY29udHJvbC5rZXldLnJlbW92ZVRvb2x0aXBBcnJvdztcbiAgfVxuXG4gIGdldCBhbHdheXNBY3RpdmUoKSB7XG4gICAgLy8gQ29udHJvbHMgdGhhdCBoYXZlIHRoZSBsYWJlbCBhY3RpdmUgaWYgdGhlcmUgaXMgYW55IHVzZXIgZW50ZXJlZCB0ZXh0IGluIHRoZSBmaWVsZFxuICAgIGlmICh0aGlzLmZvcm0uY29udHJvbHNbdGhpcy5jb250cm9sLmtleV0uY29udHJvbFR5cGUgPT09ICdwaWNrZXInICYmIHRoaXMuX2VudGVyZWRUZXh0Lmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmICh0aGlzLmZvcm0uY29udHJvbHNbdGhpcy5jb250cm9sLmtleV0uYWx3YXlzQWN0aXZlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLy8gQ29udHJvbHMgdGhhdCBhbHdheXMgaGF2ZSB0aGUgbGFiZWwgYWN0aXZlXG4gICAgcmV0dXJuIChcbiAgICAgIFtcbiAgICAgICAgJ3RpbGVzJyxcbiAgICAgICAgJ2NoZWNrbGlzdCcsXG4gICAgICAgICdjaGVja2JveCcsXG4gICAgICAgICdkYXRlJyxcbiAgICAgICAgJ3RpbWUnLFxuICAgICAgICAnZGF0ZS10aW1lJyxcbiAgICAgICAgJ2FkZHJlc3MnLFxuICAgICAgICAnZmlsZScsXG4gICAgICAgICdlZGl0b3InLFxuICAgICAgICAnYWNlLWVkaXRvcicsXG4gICAgICAgICdjb2RlLWVkaXRvcicsXG4gICAgICAgICdyYWRpbycsXG4gICAgICAgICd0ZXh0LWFyZWEnLFxuICAgICAgICAncXVpY2stbm90ZScsXG4gICAgICAgICdkYXRlJyxcbiAgICAgICAgJ2N1c3RvbScsXG4gICAgICAgICdzd2l0Y2gnLFxuICAgICAgICAnbmF0aXZlLXNlbGVjdCcsXG4gICAgICAgICduYXRpdmUtaW5wdXQnLFxuICAgICAgXS5pbmRleE9mKHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmNvbnRyb2wua2V5XS5jb250cm9sVHlwZSkgIT09IC0xXG4gICAgKTtcbiAgfVxuXG4gIGdldCByZXF1aXJlc0V4dHJhU3BhY2luZygpIHtcbiAgICAvLyBDaGlwc1xuICAgIGlmICh0aGlzLmZvcm0uY29udHJvbHNbdGhpcy5jb250cm9sLmtleV0uY29udHJvbFR5cGUgPT09ICdwaWNrZXInICYmIHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmNvbnRyb2wua2V5XS5tdWx0aXBsZSAmJiB0aGlzLmhhc1ZhbHVlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZXhlY3V0ZUludGVyYWN0aW9uKGludGVyYWN0aW9uLCBpc0ludm9rZWRPbkluaXQgPSBmYWxzZSkge1xuICAgIGlmIChpbnRlcmFjdGlvbi5zY3JpcHQgJiYgSGVscGVycy5pc0Z1bmN0aW9uKGludGVyYWN0aW9uLnNjcmlwdCkpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmZpZWxkSW50ZXJhY3Rpb25BcGkuZm9ybSA9IHRoaXMuZm9ybTtcbiAgICAgICAgdGhpcy5maWVsZEludGVyYWN0aW9uQXBpLmN1cnJlbnRLZXkgPSB0aGlzLmNvbnRyb2wua2V5O1xuICAgICAgICB0aGlzLmZpZWxkSW50ZXJhY3Rpb25BcGkuaXNJbnZva2VkT25Jbml0ID0gaXNJbnZva2VkT25Jbml0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGludGVyYWN0aW9uLnNjcmlwdCh0aGlzLmZpZWxkSW50ZXJhY3Rpb25BcGksIHRoaXMuY29udHJvbC5rZXkpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmluZm8oJ0ZpZWxkIEludGVyYWN0aW9uIEVycm9yIScsIHRoaXMuY29udHJvbC5rZXkpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVR5cGluZyhldmVudDogYW55KSB7XG4gICAgdGhpcy5fZm9jdXNlZCA9IGV2ZW50ICYmIGV2ZW50Lmxlbmd0aDtcbiAgICB0aGlzLl9lbnRlcmVkVGV4dCA9IGV2ZW50O1xuICB9XG5cbiAgLy8gaW1hc2sgaGFzIGFjY2VwdGVkIGEgY2hhbmdlIGluIHZhbHVlXG4gIGhhbmRsZUFjY2VwdCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKHZhbHVlKTtcbiAgfVxuXG4gIGhhbmRsZUZvY3VzKGV2ZW50OiBGb2N1c0V2ZW50LCBmaWVsZD86IGFueSkge1xuICAgIHRoaXMuX2ZvY3VzZWQgPSB0cnVlO1xuICAgIHRoaXMuZm9jdXNlZEZpZWxkID0gZmllbGQ7XG4gICAgaWYgKCFIZWxwZXJzLmlzQmxhbmsodGhpcy5jaGFyYWN0ZXJDb3VudEZpZWxkKSAmJiB0aGlzLmNoYXJhY3RlckNvdW50RmllbGQgPT09IGZpZWxkKSB7XG4gICAgICB0aGlzLnNob3dDb3VudCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmNvbnRyb2wua2V5XS5jb250cm9sVHlwZSA9PT0gJ2FkZHJlc3MnICYmXG4gICAgICBmaWVsZCAmJlxuICAgICAgIUhlbHBlcnMuaXNFbXB0eSh0aGlzLmZvcm0uZ2V0UmF3VmFsdWUoKVt0aGlzLmNvbnRyb2wua2V5XSkgJiZcbiAgICAgICFIZWxwZXJzLmlzQmxhbmsodGhpcy5mb3JtLmdldFJhd1ZhbHVlKClbdGhpcy5jb250cm9sLmtleV1bZmllbGRdKVxuICAgICkge1xuICAgICAgdGhpcy5oYW5kbGVBZGRyZXNzQ2hhbmdlKHsgdmFsdWU6IHRoaXMuZm9ybS5nZXRSYXdWYWx1ZSgpW3RoaXMuY29udHJvbC5rZXldW2ZpZWxkXSwgZmllbGQgfSk7XG4gICAgfVxuICAgIHRoaXMuX2ZvY3VzRW1pdHRlci5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIGhhbmRsZUJsdXIoZXZlbnQ6IEZvY3VzRXZlbnQpIHtcbiAgICB0aGlzLl9mb2N1c2VkID0gZmFsc2U7XG4gICAgdGhpcy5mb2N1c2VkRmllbGQgPSAnJztcbiAgICB0aGlzLnNob3dDb3VudCA9IGZhbHNlO1xuICAgIHRoaXMuX2JsdXJFbWl0dGVyLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgY2xlYXJWYWx1ZSgpIHtcbiAgICB0aGlzLmZvcm0uY29udHJvbHNbdGhpcy5jb250cm9sLmtleV0uc2V0VmFsdWUobnVsbCk7XG4gICAgdGhpcy5mb3JtYXR0ZWRWYWx1ZSA9IG51bGw7XG4gIH1cblxuICBoYW5kbGVUZXh0QXJlYUlucHV0KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKChldmVudC50YXJnZXQgYXMgSFRNTFRleHRBcmVhRWxlbWVudCkudmFsdWUpO1xuICAgIHRoaXMucmVzdHJpY3RLZXlzKGV2ZW50KTtcbiAgfVxuXG4gIGNoZWNrTWF4TGVuZ3RoKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5jb250cm9sICYmIHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmNvbnRyb2wua2V5XS5tYXhsZW5ndGgpIHtcbiAgICAgIHRoaXMuaXRlbUNvdW50ID0gdmFsdWUubGVuZ3RoO1xuICAgICAgdGhpcy5tYXhMZW5ndGhNZXQgPSB2YWx1ZS5sZW5ndGggPj0gdGhpcy5mb3JtLmNvbnRyb2xzW3RoaXMuY29udHJvbC5rZXldLm1heGxlbmd0aDtcbiAgICB9XG4gIH1cblxuICBtb2RlbENoYW5nZVdpdGhSYXcoZXZlbnQpIHtcbiAgICBpZiAoSGVscGVycy5pc0VtcHR5KGV2ZW50LnZhbHVlKSkge1xuICAgICAgdGhpcy5fZm9jdXNlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5fZW50ZXJlZFRleHQgPSAnJztcbiAgICB9XG4gICAgaWYgKHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmNvbnRyb2wua2V5XS5jb250cm9sVHlwZSA9PT0gJ3BpY2tlcicgJiYgdGhpcy5mb3JtLmNvbnRyb2xzW3RoaXMuY29udHJvbC5rZXldLm1heGxlbmd0aCkge1xuICAgICAgdGhpcy5pdGVtQ291bnQgPSBldmVudC52YWx1ZSA/IGV2ZW50LnZhbHVlLmxlbmd0aCA6IDA7XG4gICAgICB0aGlzLm1heExlbmd0aE1ldCA9IHRoaXMuaXRlbUNvdW50ID49IHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmNvbnRyb2wua2V5XS5tYXhsZW5ndGggPyB0cnVlIDogZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmNvbnRyb2wua2V5XS5yYXdWYWx1ZSA9IGV2ZW50LnJhd1ZhbHVlO1xuICAgIHRoaXMuY2hhbmdlLmVtaXQoZXZlbnQudmFsdWUpO1xuICB9XG5cbiAgbW9kZWxDaGFuZ2UodmFsdWUpIHtcbiAgICBpZiAoSGVscGVycy5pc0VtcHR5KHZhbHVlKSkge1xuICAgICAgdGhpcy5fZm9jdXNlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5fZW50ZXJlZFRleHQgPSAnJztcbiAgICB9XG4gICAgdGhpcy5jaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gIH1cblxuICB2YWxpZGF0ZU51bWJlck9uQmx1cihldmVudDogRm9jdXNFdmVudCkge1xuICAgIHRoaXMuX2ZvY3VzZWQgPSBmYWxzZTtcbiAgICB0aGlzLmZvY3VzZWRGaWVsZCA9ICcnO1xuICAgIHRoaXMuc2hvd0NvdW50ID0gZmFsc2U7XG4gICAgaWYgKHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmNvbnRyb2wua2V5XS5zdWJUeXBlID09PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy52YWxpZGF0ZUludGVnZXJJbnB1dCgpO1xuICAgIH1cbiAgICB0aGlzLl9ibHVyRW1pdHRlci5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIHZhbGlkYXRlSW50ZWdlcklucHV0KCkge1xuICAgIGNvbnN0IE5VTUJFUlNfT05MWSA9IC9eW1xcZFxcLV1cXGQqJC87XG4gICAgaWYgKHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmNvbnRyb2wua2V5XS52YWx1ZSAmJiAhTlVNQkVSU19PTkxZLnRlc3QodGhpcy5mb3JtLmNvbnRyb2xzW3RoaXMuY29udHJvbC5rZXldLnZhbHVlKSkge1xuICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzW3RoaXMuY29udHJvbC5rZXldLm1hcmtBc0ludmFsaWQoXG4gICAgICAgIGAke3RoaXMubGFiZWxzLmludmFsaWRJbnRlZ2VySW5wdXR9ICR7dGhpcy5mb3JtLmNvbnRyb2xzW3RoaXMuY29udHJvbC5rZXldLmxhYmVsLnRvVXBwZXJDYXNlKCl9YCxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcmVzdHJpY3RLZXlzKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgY29uc3QgTlVNQkVSU19PTkxZID0gL1swLTlcXC1dLztcbiAgICBjb25zdCBOVU1CRVJTX1dJVEhfREVDSU1BTF9ET1QgPSAvWzAtOVxcLlxcLV0vO1xuICAgIGNvbnN0IE5VTUJFUlNfV0lUSF9ERUNJTUFMX0RPVF9BTkRfQ09NTUEgPSAvWzAtOVxcLlxcLFxcLV0vO1xuICAgIGNvbnN0IFVUSUxJVFlfS0VZUyA9IFsnQmFja3NwYWNlJywgJ0RlbGV0ZScsICdBcnJvd0xlZnQnLCAnQXJyb3dSaWdodCcsICdUYWInXTtcbiAgICBjb25zdCBrZXkgPSBldmVudC5rZXk7XG5cbiAgICAvLyBOdW1iZXJzIG9yIG51bWJlcnMgYW5kIGRlY2ltYWwgY2hhcmFjdGVycyBvbmx5XG4gICAgaWYgKHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmNvbnRyb2wua2V5XS5zdWJUeXBlID09PSAnbnVtYmVyJyAmJiAhKE5VTUJFUlNfT05MWS50ZXN0KGtleSkgfHwgVVRJTElUWV9LRVlTLmluY2x1ZGVzKGtleSkpKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICBbJ2N1cnJlbmN5JywgJ2Zsb2F0JywgJ3BlcmNlbnRhZ2UnXS5pbmNsdWRlcyh0aGlzLmZvcm0uY29udHJvbHNbdGhpcy5jb250cm9sLmtleV0uc3ViVHlwZSkgJiZcbiAgICAgICEoXG4gICAgICAgICh0aGlzLmRlY2ltYWxTZXBhcmF0b3IgPT09ICcuJyAmJiBOVU1CRVJTX1dJVEhfREVDSU1BTF9ET1QudGVzdChrZXkpKSB8fFxuICAgICAgICAodGhpcy5kZWNpbWFsU2VwYXJhdG9yID09PSAnLCcgJiYgTlVNQkVSU19XSVRIX0RFQ0lNQUxfRE9UX0FORF9DT01NQS50ZXN0KGtleSkpIHx8XG4gICAgICAgIFVUSUxJVFlfS0VZUy5pbmNsdWRlcyhrZXkpXG4gICAgICApXG4gICAgKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICAvLyBNYXggTGVuZ3RoXG4gICAgaWYgKHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmNvbnRyb2wua2V5XS5tYXhsZW5ndGggJiYgKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZS5sZW5ndGggPj0gdGhpcy5mb3JtLmNvbnRyb2xzW3RoaXMuY29udHJvbC5rZXldLm1heGxlbmd0aCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVQZXJjZW50Q2hhbmdlKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgY29uc3QgdmFsdWUgPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlIHx8IChldmVudCBhcyBhbnkpLmRhdGE7XG4gICAgY29uc3QgcGVyY2VudCA9IEhlbHBlcnMuaXNFbXB0eSh2YWx1ZSkgfHwgaXNOYU4odmFsdWUpID8gdmFsdWUgOiBOdW1iZXIoKE51bWJlcih2YWx1ZSkgLyAxMDApLnRvRml4ZWQoNikucmVwbGFjZSgvXFwuPzAqJC8sICcnKSk7XG4gICAgaWYgKCFIZWxwZXJzLmlzRW1wdHkocGVyY2VudCkpIHtcbiAgICAgIHRoaXMuY2hhbmdlLmVtaXQocGVyY2VudCk7XG4gICAgICB0aGlzLmZvcm0uY29udHJvbHNbdGhpcy5jb250cm9sLmtleV0uc2V0VmFsdWUocGVyY2VudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2hhbmdlLmVtaXQobnVsbCk7XG4gICAgICB0aGlzLmZvcm0uY29udHJvbHNbdGhpcy5jb250cm9sLmtleV0uc2V0VmFsdWUobnVsbCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlVGFiRm9yUGlja2VycyhldmVudDogYW55KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYWN0aXZlICYmIGV2ZW50ICYmIGV2ZW50LmtleSkge1xuICAgICAgaWYgKGV2ZW50LmtleSA9PT0gS2V5LkVzY2FwZSB8fCBldmVudC5rZXkgPT09IEtleS5UYWIpIHtcbiAgICAgICAgdGhpcy50b2dnbGVBY3RpdmUoZXZlbnQsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBlbWl0Q2hhbmdlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLmNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICB0aGlzLmNoZWNrTWF4TGVuZ3RoKHZhbHVlKTtcbiAgfVxuXG4gIGhhbmRsZVNpbXBsZVRleHRJbnB1dChldmVudDogRXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuY29udHJvbC50ZXh0TWFza0VuYWJsZWQpIHtcbiAgICAgIHRoaXMuZW1pdENoYW5nZSgoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlKTtcbiAgICB9XG4gICAgLy8gaWYgd2UgaGF2ZSBtYXNrT3B0aW9ucywgaW5wdXRzIHdpbGwgYmUgYWJzb3JiZWQgaW4gaGFuZGxlQWNjZXB0KClcbiAgfVxuXG4gIGhhbmRsZUVkaXQodmFsdWUpIHtcbiAgICB0aGlzLmVkaXQuZW1pdCh2YWx1ZSk7XG4gIH1cblxuICBoYW5kbGVTYXZlKHZhbHVlKSB7XG4gICAgdGhpcy5zYXZlLmVtaXQodmFsdWUpO1xuICB9XG5cbiAgaGFuZGxlRGVsZXRlKHZhbHVlKSB7XG4gICAgdGhpcy5kZWxldGUuZW1pdCh2YWx1ZSk7XG4gIH1cblxuICBoYW5kbGVVcGxvYWQodmFsdWUpIHtcbiAgICB0aGlzLnVwbG9hZC5lbWl0KHZhbHVlKTtcbiAgfVxuXG4gIGhhbmRsZUFkZHJlc3NDaGFuZ2UoZGF0YSkge1xuICAgIGlmIChcbiAgICAgIGRhdGEgJiZcbiAgICAgICFIZWxwZXJzLmlzQmxhbmsoZGF0YS52YWx1ZSkgJiZcbiAgICAgIGRhdGEuZmllbGQgJiZcbiAgICAgIHRoaXMuY29udHJvbC5jb25maWdbZGF0YS5maWVsZF0gJiZcbiAgICAgICFIZWxwZXJzLmlzRW1wdHkodGhpcy5jb250cm9sLmNvbmZpZ1tkYXRhLmZpZWxkXS5tYXhsZW5ndGgpXG4gICAgKSB7XG4gICAgICB0aGlzLml0ZW1Db3VudCA9IGRhdGEudmFsdWUubGVuZ3RoO1xuICAgICAgdGhpcy5jaGFyYWN0ZXJDb3VudEZpZWxkID0gZGF0YS5maWVsZDtcbiAgICAgIHRoaXMubWF4TGVuZ3RoID0gdGhpcy5jb250cm9sLmNvbmZpZ1tkYXRhLmZpZWxkXS5tYXhsZW5ndGg7XG4gICAgICB0aGlzLnNob3dDb3VudCA9IHRydWU7XG4gICAgICBpZiAodGhpcy5tYXhMZW5ndGggPT09IHRoaXMuaXRlbUNvdW50KSB7XG4gICAgICAgIHRoaXMubWF4TGVuZ3RoTWV0RXJyb3JmaWVsZHMucHVzaChkYXRhLmZpZWxkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubWF4TGVuZ3RoTWV0RXJyb3JmaWVsZHMgPSB0aGlzLm1heExlbmd0aE1ldEVycm9yZmllbGRzLmZpbHRlcigoZmllbGQ6IHN0cmluZykgPT4gZmllbGQgIT09IGRhdGEuZmllbGQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVZhbGlkaXR5KHNob3VsZEV2ZW50QmVFbWl0dGVkKTogdm9pZCB7XG4gICAgY29uc3QgZW1pdEV2ZW50OiBib29sZWFuID0gc2hvdWxkRXZlbnRCZUVtaXR0ZWQgPyB0cnVlIDogZmFsc2U7XG4gICAgdGhpcy5mb3JtLmNvbnRyb2xzW3RoaXMuY29udHJvbC5rZXldLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoeyBlbWl0RXZlbnQgfSk7XG4gIH1cbn1cbiJdfQ==
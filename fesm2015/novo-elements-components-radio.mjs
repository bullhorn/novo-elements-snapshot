import * as i0 from '@angular/core';
import { InjectionToken, forwardRef, EventEmitter, Component, Inject, Optional, Input, Output, HostBinding, ContentChildren, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i1 from 'novo-elements/components/button';
import { NovoButtonModule } from 'novo-elements/components/button';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { mixinErrorState } from 'novo-elements/common';
import { NovoFieldControl } from 'novo-elements/components/field';

const NOVO_RADIO_GROUP = new InjectionToken('RadioGroupComponent');

// NG2
// make radio-buttons ids unique
let nextId$1 = 0;
// Value accessor for the component (supports ngModel)
const RADIO_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoRadioElement),
    multi: true,
};
class NovoRadioElement {
    constructor(radioGroup, ref) {
        this.radioGroup = radioGroup;
        this.ref = ref;
        this._uniqueId = `novo-radio-${++nextId$1}`;
        this.id = this._uniqueId;
        this.name = this._uniqueId;
        this.tabindex = 0;
        this.vertical = false;
        this.button = false;
        this.theme = 'secondary';
        this.change = new EventEmitter();
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
        this._checked = false;
        this._value = false;
        this._disabled = false;
        this.onChangeCallback = (_) => {
            // placeholder
        };
        this.onTouchedCallback = () => {
            // placeholder
        };
        this.radioGroup = radioGroup;
    }
    get checked() {
        return this._checked;
    }
    set checked(value) {
        value = !!value;
        if (this._checked !== value) {
            this._checked = value;
            if (this._checked && this.radioGroup && this.radioGroup.value !== this.value) {
                this.radioGroup.value = this.value;
            }
            this.onChangeCallback(this._value);
        }
    }
    get value() {
        return this._value;
    }
    set value(value) {
        if (this.value !== value) {
            this._value = value;
            if (this.radioGroup) {
                this._checked = this.radioGroup.value === this.value;
            }
            this.onChangeCallback(this._value);
        }
    }
    // Disabled State
    get disabled() {
        return this._disabled || (this.radioGroup != null && this.radioGroup.disabled);
    }
    set disabled(value) {
        this._disabled = !!value;
    }
    ngOnInit() {
        if (this.radioGroup) {
            this.checked = this.radioGroup.value === this._value;
            this.vertical = this.radioGroup.appearance === 'vertical';
            this.name = this.radioGroup.name;
        }
    }
    _onInputChange(event) {
        event.stopPropagation();
        this.change.emit(event);
        this.checked = true;
        if (this.radioGroup) {
            this.radioGroup.value = this.value;
        }
    }
    writeValue(value) {
        this.value = value;
        this.ref.markForCheck();
    }
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    setDisabledState(disabled) {
        this.disabled = disabled;
    }
}
NovoRadioElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoRadioElement, deps: [{ token: NOVO_RADIO_GROUP, optional: true }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NovoRadioElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoRadioElement, selector: "novo-radio", inputs: { id: "id", name: "name", tabindex: "tabindex", vertical: "vertical", label: "label", button: "button", theme: "theme", size: "size", icon: "icon", color: "color", checked: "checked", value: "value", disabled: "disabled" }, outputs: { change: "change", blur: "blur", focus: "focus" }, host: { properties: { "class.vertical": "vertical", "class.disabled": "this.disabled" } }, providers: [RADIO_VALUE_ACCESSOR], ngImport: i0, template: `
    <input
      type="radio"
      [id]="id"
      [name]="name"
      [checked]="checked"
      [tabIndex]="tabindex"
      [disabled]="disabled"
      (focus)="focus.emit($event)"
      (blur)="blur.emit($event)"
      (change)="_onInputChange($event)"
    />
    <label [attr.for]="id" [class.disabled]="disabled">
      <novo-button
        *ngIf="button"
        [ngClass]="{ unchecked: !checked, checked: checked, 'has-icon': !!icon }"
        [theme]="theme"
        [color]="checked ? color : null"
        [icon]="icon"
        [size]="size"
      >
        {{ label }}
      </novo-button>
      <div *ngIf="!button" class="novo-radio-button-label">
        <i [ngClass]="{ 'bhi-radio-empty': !checked, 'bhi-radio-filled': checked }"></i>
        {{ label }}
        <ng-content></ng-content>
      </div>
    </label>
  `, isInline: true, styles: [":host{margin-right:10px;position:relative}:host.vertical{display:block}:host>input{position:absolute;z-index:-1;opacity:0}:host>input:focus+label i:before{text-shadow:0px 0px 20px rgba(74,137,220,.5)}:host>input:focus+label i.bhi-radio-empty,:host>input:focus+label i.bhi-radio-filled{color:var(--color-selection)}:host>label{cursor:pointer}:host>label .novo-radio-button-label{font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;display:inline}:host>label .novo-radio-button-label.text-capitalize{text-transform:capitalize}:host>label .novo-radio-button-label.text-uppercase{text-transform:uppercase}:host>label .novo-radio-button-label.text-nowrap{white-space:nowrap}:host>label .novo-radio-button-label.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host>label .novo-radio-button-label.text-size-default{font-size:inherit}:host>label .novo-radio-button-label.text-size-body{font-size:var(--font-size-body)}:host>label .novo-radio-button-label.text-size-xs{font-size:var(--font-size-xs)}:host>label .novo-radio-button-label.text-size-sm{font-size:var(--font-size-sm)}:host>label .novo-radio-button-label.text-size-md{font-size:var(--font-size-md)}:host>label .novo-radio-button-label.text-size-lg{font-size:var(--font-size-lg)}:host>label .novo-radio-button-label.text-size-xl{font-size:var(--font-size-xl)}:host>label .novo-radio-button-label.text-size-2xl{font-size:var(--font-size-2xl)}:host>label .novo-radio-button-label.text-size-3xl{font-size:var(--font-size-3xl)}:host>label .novo-radio-button-label.text-size-smaller{font-size:.8em}:host>label .novo-radio-button-label.text-size-larger{font-size:1.2em}:host>label .novo-radio-button-label.text-color-person{color:var(--color-person)}:host>label .novo-radio-button-label.text-color-company{color:var(--color-company)}:host>label .novo-radio-button-label.text-color-candidate{color:var(--color-candidate)}:host>label .novo-radio-button-label.text-color-lead{color:var(--color-lead)}:host>label .novo-radio-button-label.text-color-contact{color:var(--color-contact)}:host>label .novo-radio-button-label.text-color-clientcontact{color:var(--color-clientcontact)}:host>label .novo-radio-button-label.text-color-opportunity{color:var(--color-opportunity)}:host>label .novo-radio-button-label.text-color-job{color:var(--color-job)}:host>label .novo-radio-button-label.text-color-joborder{color:var(--color-joborder)}:host>label .novo-radio-button-label.text-color-submission{color:var(--color-submission)}:host>label .novo-radio-button-label.text-color-sendout{color:var(--color-sendout)}:host>label .novo-radio-button-label.text-color-placement{color:var(--color-placement)}:host>label .novo-radio-button-label.text-color-note{color:var(--color-note)}:host>label .novo-radio-button-label.text-color-task{color:var(--color-task)}:host>label .novo-radio-button-label.text-color-distribution-list{color:var(--color-distribution-list)}:host>label .novo-radio-button-label.text-color-credential{color:var(--color-credential)}:host>label .novo-radio-button-label.text-color-user{color:var(--color-user)}:host>label .novo-radio-button-label.text-color-corporate-user{color:var(--color-corporate-user)}:host>label .novo-radio-button-label.text-color-contract{color:var(--color-contract)}:host>label .novo-radio-button-label.text-color-job-code{color:var(--color-job-code)}:host>label .novo-radio-button-label.text-color-earn-code{color:var(--color-earn-code)}:host>label .novo-radio-button-label.text-color-billable-charge{color:var(--color-billable-charge)}:host>label .novo-radio-button-label.text-color-payable-charge{color:var(--color-payable-charge)}:host>label .novo-radio-button-label.text-color-invoice-statement{color:var(--color-invoice-statement)}:host>label .novo-radio-button-label.text-color-selection{color:var(--color-selection)}:host>label .novo-radio-button-label.text-color-positive{color:var(--color-positive)}:host>label .novo-radio-button-label.text-color-success{color:var(--color-success)}:host>label .novo-radio-button-label.text-color-warning{color:var(--color-warning)}:host>label .novo-radio-button-label.text-color-error{color:var(--color-error)}:host>label .novo-radio-button-label.text-color-info{color:var(--color-info)}:host>label .novo-radio-button-label.text-color-disabled{color:var(--color-disabled)}:host>label .novo-radio-button-label.text-color-red{color:var(--palette-red-50)}:host>label .novo-radio-button-label.text-color-pink{color:var(--palette-pink-50)}:host>label .novo-radio-button-label.text-color-orange{color:var(--palette-orange-50)}:host>label .novo-radio-button-label.text-color-yellow{color:var(--palette-yellow-50)}:host>label .novo-radio-button-label.text-color-green{color:var(--palette-green-50)}:host>label .novo-radio-button-label.text-color-teal{color:var(--palette-teal-50)}:host>label .novo-radio-button-label.text-color-blue{color:var(--palette-blue-50)}:host>label .novo-radio-button-label.text-color-aqua{color:var(--palette-aqua-50)}:host>label .novo-radio-button-label.text-color-indigo{color:var(--palette-indigo-50)}:host>label .novo-radio-button-label.text-color-violet{color:var(--palette-violet-50)}:host>label .novo-radio-button-label.text-color-gray{color:var(--palette-gray-50)}:host>label .novo-radio-button-label.margin-before{margin-top:.4rem}:host>label .novo-radio-button-label.margin-after{margin-bottom:.8rem}:host>label .novo-radio-button-label.text-length-small{max-width:40ch}:host>label .novo-radio-button-label.text-length-medium{max-width:55ch}:host>label .novo-radio-button-label.text-length-large{max-width:70ch}:host>label .novo-radio-button-label.text-weight-hairline{font-weight:100}:host>label .novo-radio-button-label.text-weight-thin{font-weight:200}:host>label .novo-radio-button-label.text-weight-light{font-weight:300}:host>label .novo-radio-button-label.text-weight-normal{font-weight:400}:host>label .novo-radio-button-label.text-weight-medium{font-weight:500}:host>label .novo-radio-button-label.text-weight-semibold{font-weight:600}:host>label .novo-radio-button-label.text-weight-bold{font-weight:700}:host>label .novo-radio-button-label.text-weight-extrabold{font-weight:800}:host>label .novo-radio-button-label.text-weight-heavy{font-weight:900}:host>label .novo-radio-button-label.text-weight-lighter{font-weight:lighter}:host>label .novo-radio-button-label.text-weight-bolder{font-weight:bolder}:host>label i{margin-right:5px;transition:all .2s ease-in-out}:host>label i.bhi-checkbox-empty,:host>label i.bhi-radio-empty{color:#d2d2d2}:host>label i.bhi-checkbox-filled,:host>label i.bhi-radio-filled{color:var(--color-selection)}:host>label.disabled i{opacity:.7}:host>label.disabled button[theme].has-icon{opacity:.7}:host novo-button[theme].has-icon{transition:all .1s ease-in-out;color:var(--color-selection);background:var(--color-background);opacity:1}:host novo-button[theme].has-icon.checked{color:var(--color-selection-contrast);background:var(--color-selection)}:host novo-button[theme].has-icon.checked[color=person]{color:var(--color-person-contrast);background:var(--color-person)}:host novo-button[theme].has-icon.checked[color=company]{color:var(--color-company-contrast);background:var(--color-company)}:host novo-button[theme].has-icon.checked[color=candidate]{color:var(--color-candidate-contrast);background:var(--color-candidate)}:host novo-button[theme].has-icon.checked[color=lead]{color:var(--color-lead-contrast);background:var(--color-lead)}:host novo-button[theme].has-icon.checked[color=contact]{color:var(--color-contact-contrast);background:var(--color-contact)}:host novo-button[theme].has-icon.checked[color=clientcontact]{color:var(--color-clientcontact-contrast);background:var(--color-clientcontact)}:host novo-button[theme].has-icon.checked[color=opportunity]{color:var(--color-opportunity-contrast);background:var(--color-opportunity)}:host novo-button[theme].has-icon.checked[color=job]{color:var(--color-job-contrast);background:var(--color-job)}:host novo-button[theme].has-icon.checked[color=joborder]{color:var(--color-joborder-contrast);background:var(--color-joborder)}:host novo-button[theme].has-icon.checked[color=submission]{color:var(--color-submission-contrast);background:var(--color-submission)}:host novo-button[theme].has-icon.checked[color=sendout]{color:var(--color-sendout-contrast);background:var(--color-sendout)}:host novo-button[theme].has-icon.checked[color=placement]{color:var(--color-placement-contrast);background:var(--color-placement)}:host novo-button[theme].has-icon.checked[color=note]{color:var(--color-note-contrast);background:var(--color-note)}:host novo-button[theme].has-icon.checked[color=task]{color:var(--color-task-contrast);background:var(--color-task)}:host novo-button[theme].has-icon.checked[color=distribution-list]{color:var(--color-distribution-list-contrast);background:var(--color-distribution-list)}:host novo-button[theme].has-icon.checked[color=credential]{color:var(--color-credential-contrast);background:var(--color-credential)}:host novo-button[theme].has-icon.checked[color=user]{color:var(--color-user-contrast);background:var(--color-user)}:host novo-button[theme].has-icon.checked[color=corporate-user]{color:var(--color-corporate-user-contrast);background:var(--color-corporate-user)}:host novo-button[theme].has-icon.checked[color=contract]{color:var(--color-contract-contrast);background:var(--color-contract)}:host novo-button[theme].has-icon.checked[color=job-code]{color:var(--color-job-code-contrast);background:var(--color-job-code)}:host novo-button[theme].has-icon.checked[color=earn-code]{color:var(--color-earn-code-contrast);background:var(--color-earn-code)}:host novo-button[theme].has-icon.checked[color=billable-charge]{color:var(--color-billable-charge-contrast);background:var(--color-billable-charge)}:host novo-button[theme].has-icon.checked[color=payable-charge]{color:var(--color-payable-charge-contrast);background:var(--color-payable-charge)}:host novo-button[theme].has-icon.checked[color=invoice-statement]{color:var(--color-invoice-statement-contrast);background:var(--color-invoice-statement)}:host novo-button[theme].has-icon.checked[color=selection]{color:var(--color-selection-contrast);background:var(--color-selection)}:host novo-button[theme].has-icon.checked[color=positive]{color:var(--color-positive-contrast);background:var(--color-positive)}:host novo-button[theme].has-icon.checked[color=success]{color:var(--color-success-contrast);background:var(--color-success)}:host novo-button[theme].has-icon.checked[color=warning]{color:var(--color-warning-contrast);background:var(--color-warning)}:host novo-button[theme].has-icon.checked[color=error]{color:var(--color-error-contrast);background:var(--color-error)}:host novo-button[theme].has-icon.checked[color=info]{color:var(--color-info-contrast);background:var(--color-info)}:host novo-button[theme].has-icon.checked[color=disabled]{color:var(--color-disabled-contrast);background:var(--color-disabled)}:host novo-button[theme].has-icon.checked[color=red]{color:var(--palette-red-50-contrast);background:var(--palette-red-50)}:host novo-button[theme].has-icon.checked[color=pink]{color:var(--palette-pink-50-contrast);background:var(--palette-pink-50)}:host novo-button[theme].has-icon.checked[color=orange]{color:var(--palette-orange-50-contrast);background:var(--palette-orange-50)}:host novo-button[theme].has-icon.checked[color=yellow]{color:var(--palette-yellow-50-contrast);background:var(--palette-yellow-50)}:host novo-button[theme].has-icon.checked[color=green]{color:var(--palette-green-50-contrast);background:var(--palette-green-50)}:host novo-button[theme].has-icon.checked[color=teal]{color:var(--palette-teal-50-contrast);background:var(--palette-teal-50)}:host novo-button[theme].has-icon.checked[color=blue]{color:var(--palette-blue-50-contrast);background:var(--palette-blue-50)}:host novo-button[theme].has-icon.checked[color=aqua]{color:var(--palette-aqua-50-contrast);background:var(--palette-aqua-50)}:host novo-button[theme].has-icon.checked[color=indigo]{color:var(--palette-indigo-50-contrast);background:var(--palette-indigo-50)}:host novo-button[theme].has-icon.checked[color=violet]{color:var(--palette-violet-50-contrast);background:var(--palette-violet-50)}:host novo-button[theme].has-icon.checked[color=gray]{color:var(--palette-gray-50-contrast);background:var(--palette-gray-50)}:host novo-button{pointer-events:none;border-radius:0!important}:host novo-button.unchecked{opacity:.5}:host novo-button[theme=icon]{margin-right:0;border:1px solid var(--color-selection)}:host:first-child novo-button{border-top-left-radius:3px!important;border-bottom-left-radius:3px!important}:host:first-child novo-button[theme=icon]{border-right-width:0px!important}:host:last-child novo-button{border-top-right-radius:3px!important;border-bottom-right-radius:3px!important;border-right-width:1px!important;border-right-style:solid!important}:host:last-child novo-button[theme=icon]{border-left-width:0px!important}:host-context(.novo-radio-group-appearance-horizontal):not(:last-child) .novo-radio-button-label{margin-right:1rem}\n"], components: [{ type: i1.NovoButtonElement, selector: "novo-button,button[theme],button[basic],button[primary],button[outlined],button[icon],button[fab]", inputs: ["color", "side", "size", "theme", "variant", "loading", "icon", "basic", "primary", "outlined", "fab", "standard", "disabled"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoRadioElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-radio', providers: [RADIO_VALUE_ACCESSOR], template: `
    <input
      type="radio"
      [id]="id"
      [name]="name"
      [checked]="checked"
      [tabIndex]="tabindex"
      [disabled]="disabled"
      (focus)="focus.emit($event)"
      (blur)="blur.emit($event)"
      (change)="_onInputChange($event)"
    />
    <label [attr.for]="id" [class.disabled]="disabled">
      <novo-button
        *ngIf="button"
        [ngClass]="{ unchecked: !checked, checked: checked, 'has-icon': !!icon }"
        [theme]="theme"
        [color]="checked ? color : null"
        [icon]="icon"
        [size]="size"
      >
        {{ label }}
      </novo-button>
      <div *ngIf="!button" class="novo-radio-button-label">
        <i [ngClass]="{ 'bhi-radio-empty': !checked, 'bhi-radio-filled': checked }"></i>
        {{ label }}
        <ng-content></ng-content>
      </div>
    </label>
  `, host: {
                        '[class.vertical]': 'vertical',
                    }, styles: [":host{margin-right:10px;position:relative}:host.vertical{display:block}:host>input{position:absolute;z-index:-1;opacity:0}:host>input:focus+label i:before{text-shadow:0px 0px 20px rgba(74,137,220,.5)}:host>input:focus+label i.bhi-radio-empty,:host>input:focus+label i.bhi-radio-filled{color:var(--color-selection)}:host>label{cursor:pointer}:host>label .novo-radio-button-label{font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;display:inline}:host>label .novo-radio-button-label.text-capitalize{text-transform:capitalize}:host>label .novo-radio-button-label.text-uppercase{text-transform:uppercase}:host>label .novo-radio-button-label.text-nowrap{white-space:nowrap}:host>label .novo-radio-button-label.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host>label .novo-radio-button-label.text-size-default{font-size:inherit}:host>label .novo-radio-button-label.text-size-body{font-size:var(--font-size-body)}:host>label .novo-radio-button-label.text-size-xs{font-size:var(--font-size-xs)}:host>label .novo-radio-button-label.text-size-sm{font-size:var(--font-size-sm)}:host>label .novo-radio-button-label.text-size-md{font-size:var(--font-size-md)}:host>label .novo-radio-button-label.text-size-lg{font-size:var(--font-size-lg)}:host>label .novo-radio-button-label.text-size-xl{font-size:var(--font-size-xl)}:host>label .novo-radio-button-label.text-size-2xl{font-size:var(--font-size-2xl)}:host>label .novo-radio-button-label.text-size-3xl{font-size:var(--font-size-3xl)}:host>label .novo-radio-button-label.text-size-smaller{font-size:.8em}:host>label .novo-radio-button-label.text-size-larger{font-size:1.2em}:host>label .novo-radio-button-label.text-color-person{color:var(--color-person)}:host>label .novo-radio-button-label.text-color-company{color:var(--color-company)}:host>label .novo-radio-button-label.text-color-candidate{color:var(--color-candidate)}:host>label .novo-radio-button-label.text-color-lead{color:var(--color-lead)}:host>label .novo-radio-button-label.text-color-contact{color:var(--color-contact)}:host>label .novo-radio-button-label.text-color-clientcontact{color:var(--color-clientcontact)}:host>label .novo-radio-button-label.text-color-opportunity{color:var(--color-opportunity)}:host>label .novo-radio-button-label.text-color-job{color:var(--color-job)}:host>label .novo-radio-button-label.text-color-joborder{color:var(--color-joborder)}:host>label .novo-radio-button-label.text-color-submission{color:var(--color-submission)}:host>label .novo-radio-button-label.text-color-sendout{color:var(--color-sendout)}:host>label .novo-radio-button-label.text-color-placement{color:var(--color-placement)}:host>label .novo-radio-button-label.text-color-note{color:var(--color-note)}:host>label .novo-radio-button-label.text-color-task{color:var(--color-task)}:host>label .novo-radio-button-label.text-color-distribution-list{color:var(--color-distribution-list)}:host>label .novo-radio-button-label.text-color-credential{color:var(--color-credential)}:host>label .novo-radio-button-label.text-color-user{color:var(--color-user)}:host>label .novo-radio-button-label.text-color-corporate-user{color:var(--color-corporate-user)}:host>label .novo-radio-button-label.text-color-contract{color:var(--color-contract)}:host>label .novo-radio-button-label.text-color-job-code{color:var(--color-job-code)}:host>label .novo-radio-button-label.text-color-earn-code{color:var(--color-earn-code)}:host>label .novo-radio-button-label.text-color-billable-charge{color:var(--color-billable-charge)}:host>label .novo-radio-button-label.text-color-payable-charge{color:var(--color-payable-charge)}:host>label .novo-radio-button-label.text-color-invoice-statement{color:var(--color-invoice-statement)}:host>label .novo-radio-button-label.text-color-selection{color:var(--color-selection)}:host>label .novo-radio-button-label.text-color-positive{color:var(--color-positive)}:host>label .novo-radio-button-label.text-color-success{color:var(--color-success)}:host>label .novo-radio-button-label.text-color-warning{color:var(--color-warning)}:host>label .novo-radio-button-label.text-color-error{color:var(--color-error)}:host>label .novo-radio-button-label.text-color-info{color:var(--color-info)}:host>label .novo-radio-button-label.text-color-disabled{color:var(--color-disabled)}:host>label .novo-radio-button-label.text-color-red{color:var(--palette-red-50)}:host>label .novo-radio-button-label.text-color-pink{color:var(--palette-pink-50)}:host>label .novo-radio-button-label.text-color-orange{color:var(--palette-orange-50)}:host>label .novo-radio-button-label.text-color-yellow{color:var(--palette-yellow-50)}:host>label .novo-radio-button-label.text-color-green{color:var(--palette-green-50)}:host>label .novo-radio-button-label.text-color-teal{color:var(--palette-teal-50)}:host>label .novo-radio-button-label.text-color-blue{color:var(--palette-blue-50)}:host>label .novo-radio-button-label.text-color-aqua{color:var(--palette-aqua-50)}:host>label .novo-radio-button-label.text-color-indigo{color:var(--palette-indigo-50)}:host>label .novo-radio-button-label.text-color-violet{color:var(--palette-violet-50)}:host>label .novo-radio-button-label.text-color-gray{color:var(--palette-gray-50)}:host>label .novo-radio-button-label.margin-before{margin-top:.4rem}:host>label .novo-radio-button-label.margin-after{margin-bottom:.8rem}:host>label .novo-radio-button-label.text-length-small{max-width:40ch}:host>label .novo-radio-button-label.text-length-medium{max-width:55ch}:host>label .novo-radio-button-label.text-length-large{max-width:70ch}:host>label .novo-radio-button-label.text-weight-hairline{font-weight:100}:host>label .novo-radio-button-label.text-weight-thin{font-weight:200}:host>label .novo-radio-button-label.text-weight-light{font-weight:300}:host>label .novo-radio-button-label.text-weight-normal{font-weight:400}:host>label .novo-radio-button-label.text-weight-medium{font-weight:500}:host>label .novo-radio-button-label.text-weight-semibold{font-weight:600}:host>label .novo-radio-button-label.text-weight-bold{font-weight:700}:host>label .novo-radio-button-label.text-weight-extrabold{font-weight:800}:host>label .novo-radio-button-label.text-weight-heavy{font-weight:900}:host>label .novo-radio-button-label.text-weight-lighter{font-weight:lighter}:host>label .novo-radio-button-label.text-weight-bolder{font-weight:bolder}:host>label i{margin-right:5px;transition:all .2s ease-in-out}:host>label i.bhi-checkbox-empty,:host>label i.bhi-radio-empty{color:#d2d2d2}:host>label i.bhi-checkbox-filled,:host>label i.bhi-radio-filled{color:var(--color-selection)}:host>label.disabled i{opacity:.7}:host>label.disabled button[theme].has-icon{opacity:.7}:host novo-button[theme].has-icon{transition:all .1s ease-in-out;color:var(--color-selection);background:var(--color-background);opacity:1}:host novo-button[theme].has-icon.checked{color:var(--color-selection-contrast);background:var(--color-selection)}:host novo-button[theme].has-icon.checked[color=person]{color:var(--color-person-contrast);background:var(--color-person)}:host novo-button[theme].has-icon.checked[color=company]{color:var(--color-company-contrast);background:var(--color-company)}:host novo-button[theme].has-icon.checked[color=candidate]{color:var(--color-candidate-contrast);background:var(--color-candidate)}:host novo-button[theme].has-icon.checked[color=lead]{color:var(--color-lead-contrast);background:var(--color-lead)}:host novo-button[theme].has-icon.checked[color=contact]{color:var(--color-contact-contrast);background:var(--color-contact)}:host novo-button[theme].has-icon.checked[color=clientcontact]{color:var(--color-clientcontact-contrast);background:var(--color-clientcontact)}:host novo-button[theme].has-icon.checked[color=opportunity]{color:var(--color-opportunity-contrast);background:var(--color-opportunity)}:host novo-button[theme].has-icon.checked[color=job]{color:var(--color-job-contrast);background:var(--color-job)}:host novo-button[theme].has-icon.checked[color=joborder]{color:var(--color-joborder-contrast);background:var(--color-joborder)}:host novo-button[theme].has-icon.checked[color=submission]{color:var(--color-submission-contrast);background:var(--color-submission)}:host novo-button[theme].has-icon.checked[color=sendout]{color:var(--color-sendout-contrast);background:var(--color-sendout)}:host novo-button[theme].has-icon.checked[color=placement]{color:var(--color-placement-contrast);background:var(--color-placement)}:host novo-button[theme].has-icon.checked[color=note]{color:var(--color-note-contrast);background:var(--color-note)}:host novo-button[theme].has-icon.checked[color=task]{color:var(--color-task-contrast);background:var(--color-task)}:host novo-button[theme].has-icon.checked[color=distribution-list]{color:var(--color-distribution-list-contrast);background:var(--color-distribution-list)}:host novo-button[theme].has-icon.checked[color=credential]{color:var(--color-credential-contrast);background:var(--color-credential)}:host novo-button[theme].has-icon.checked[color=user]{color:var(--color-user-contrast);background:var(--color-user)}:host novo-button[theme].has-icon.checked[color=corporate-user]{color:var(--color-corporate-user-contrast);background:var(--color-corporate-user)}:host novo-button[theme].has-icon.checked[color=contract]{color:var(--color-contract-contrast);background:var(--color-contract)}:host novo-button[theme].has-icon.checked[color=job-code]{color:var(--color-job-code-contrast);background:var(--color-job-code)}:host novo-button[theme].has-icon.checked[color=earn-code]{color:var(--color-earn-code-contrast);background:var(--color-earn-code)}:host novo-button[theme].has-icon.checked[color=billable-charge]{color:var(--color-billable-charge-contrast);background:var(--color-billable-charge)}:host novo-button[theme].has-icon.checked[color=payable-charge]{color:var(--color-payable-charge-contrast);background:var(--color-payable-charge)}:host novo-button[theme].has-icon.checked[color=invoice-statement]{color:var(--color-invoice-statement-contrast);background:var(--color-invoice-statement)}:host novo-button[theme].has-icon.checked[color=selection]{color:var(--color-selection-contrast);background:var(--color-selection)}:host novo-button[theme].has-icon.checked[color=positive]{color:var(--color-positive-contrast);background:var(--color-positive)}:host novo-button[theme].has-icon.checked[color=success]{color:var(--color-success-contrast);background:var(--color-success)}:host novo-button[theme].has-icon.checked[color=warning]{color:var(--color-warning-contrast);background:var(--color-warning)}:host novo-button[theme].has-icon.checked[color=error]{color:var(--color-error-contrast);background:var(--color-error)}:host novo-button[theme].has-icon.checked[color=info]{color:var(--color-info-contrast);background:var(--color-info)}:host novo-button[theme].has-icon.checked[color=disabled]{color:var(--color-disabled-contrast);background:var(--color-disabled)}:host novo-button[theme].has-icon.checked[color=red]{color:var(--palette-red-50-contrast);background:var(--palette-red-50)}:host novo-button[theme].has-icon.checked[color=pink]{color:var(--palette-pink-50-contrast);background:var(--palette-pink-50)}:host novo-button[theme].has-icon.checked[color=orange]{color:var(--palette-orange-50-contrast);background:var(--palette-orange-50)}:host novo-button[theme].has-icon.checked[color=yellow]{color:var(--palette-yellow-50-contrast);background:var(--palette-yellow-50)}:host novo-button[theme].has-icon.checked[color=green]{color:var(--palette-green-50-contrast);background:var(--palette-green-50)}:host novo-button[theme].has-icon.checked[color=teal]{color:var(--palette-teal-50-contrast);background:var(--palette-teal-50)}:host novo-button[theme].has-icon.checked[color=blue]{color:var(--palette-blue-50-contrast);background:var(--palette-blue-50)}:host novo-button[theme].has-icon.checked[color=aqua]{color:var(--palette-aqua-50-contrast);background:var(--palette-aqua-50)}:host novo-button[theme].has-icon.checked[color=indigo]{color:var(--palette-indigo-50-contrast);background:var(--palette-indigo-50)}:host novo-button[theme].has-icon.checked[color=violet]{color:var(--palette-violet-50-contrast);background:var(--palette-violet-50)}:host novo-button[theme].has-icon.checked[color=gray]{color:var(--palette-gray-50-contrast);background:var(--palette-gray-50)}:host novo-button{pointer-events:none;border-radius:0!important}:host novo-button.unchecked{opacity:.5}:host novo-button[theme=icon]{margin-right:0;border:1px solid var(--color-selection)}:host:first-child novo-button{border-top-left-radius:3px!important;border-bottom-left-radius:3px!important}:host:first-child novo-button[theme=icon]{border-right-width:0px!important}:host:last-child novo-button{border-top-right-radius:3px!important;border-bottom-right-radius:3px!important;border-right-width:1px!important;border-right-style:solid!important}:host:last-child novo-button[theme=icon]{border-left-width:0px!important}:host-context(.novo-radio-group-appearance-horizontal):not(:last-child) .novo-radio-button-label{margin-right:1rem}\n"] }]
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Inject,
                        args: [NOVO_RADIO_GROUP]
                    }, {
                        type: Optional
                    }] }, { type: i0.ChangeDetectorRef }];
    }, propDecorators: { id: [{
                type: Input
            }], name: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], vertical: [{
                type: Input
            }], label: [{
                type: Input
            }], button: [{
                type: Input
            }], theme: [{
                type: Input
            }], size: [{
                type: Input
            }], icon: [{
                type: Input
            }], color: [{
                type: Input
            }], change: [{
                type: Output
            }], blur: [{
                type: Output
            }], focus: [{
                type: Output
            }], checked: [{
                type: Input
            }], value: [{
                type: Input
            }], disabled: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.disabled']
            }] } });

// make radio-button-group ids unique
let nextId = 0;
// Value accessor for the component (supports ngModel)
const RADIOGROUP_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoRadioGroup),
    multi: true,
};
// Boilerplate for applying mixins
class NovoRadioGroupBase {
    constructor(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) {
        this._defaultErrorStateMatcher = _defaultErrorStateMatcher;
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        this.ngControl = ngControl;
    }
}
const NovoRadioGroupMixins = mixinErrorState(NovoRadioGroupBase);
class NovoRadioGroup extends NovoRadioGroupMixins {
    constructor() {
        super(...arguments);
        this._uniqueId = `novo-radio-group-${++nextId}`;
        /** Tab index for the chip list. */
        this._tabIndex = 0;
        /** User defined tab index. */
        this._userTabIndex = null;
        this.controlType = 'radio-group';
        /** @docs-private Implemented as part of NovoFieldControl. */
        this.lastKeyValue = null;
        this.id = this._uniqueId;
        this.tabindex = 0;
        this.change = new EventEmitter();
        this.blur = new EventEmitter();
        this._name = this._uniqueId;
        this._value = false;
        this._required = false;
        this._disabled = false;
        this._appearance = 'horizontal';
        this.onChangeCallback = (_) => {
            // placeholder
        };
        this.onTouchedCallback = () => {
            // placeholder
        };
    }
    get appearance() {
        return this._appearance;
    }
    set appearance(value) {
        if (this._appearance !== value) {
            this._appearance = value;
            this._updateRadioButtonAppearance();
        }
    }
    get value() {
        return this._value;
    }
    set value(value) {
        if (this._value !== value) {
            this._value = value;
            this._updateSelectedRadioFromValue();
            this.onChangeCallback(this._value);
            this.change.emit(value);
        }
    }
    get name() {
        return this._name;
    }
    set name(value) {
        if (this._name !== value) {
            this._updateRadioButtonNames();
        }
    }
    get disabled() {
        return this.ngControl ? !!this.ngControl.disabled : this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        this._updateRadioButtonDisabled();
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
    get selected() {
        return this._selected;
    }
    ngAfterContentInit() {
        this._updateRadioButtonAppearance();
        this._updateRadioButtonNames();
        this._updateSelectedRadioFromValue();
    }
    writeValue(value) {
        this.value = value;
    }
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    _updateRadioButtonAppearance() {
        if (this._radios) {
            this._radios.forEach((radio) => {
                radio.vertical = this.appearance === 'vertical';
            });
        }
    }
    _updateRadioButtonNames() {
        if (this._radios) {
            this._radios.forEach((radio) => {
                radio.name = this.name;
            });
        }
    }
    _updateRadioButtonDisabled() {
        if (this._radios) {
            this._radios.forEach((radio) => {
                radio.disabled = this.disabled;
            });
        }
    }
    _updateSelectedRadioFromValue() {
        if (this._radios) {
            this._radios.forEach((radio) => {
                radio.checked = this.value === radio.value;
                if (radio.checked) {
                    this._selected = radio;
                }
            });
        }
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
NovoRadioGroup.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoRadioGroup, deps: null, target: i0.ɵɵFactoryTarget.Component });
NovoRadioGroup.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoRadioGroup, selector: "novo-radio-group", inputs: { id: "id", tabindex: "tabindex", errorStateMatcher: "errorStateMatcher", appearance: "appearance", value: "value", name: "name", disabled: "disabled", required: "required", placeholder: "placeholder" }, outputs: { change: "change", blur: "blur" }, host: { properties: { "class.novo-radio-group-appearance-horizontal": "appearance==\"horizontal\"", "class.novo-radio-group-appearance-vertical": "appearance==\"vertical\"", "class.disabled": "this.disabled" }, classAttribute: "novo-radio-group" }, providers: [
        RADIOGROUP_VALUE_ACCESSOR,
        { provide: NOVO_RADIO_GROUP, useExisting: NovoRadioGroup },
        { provide: NovoFieldControl, useExisting: NovoRadioGroup },
    ], queries: [{ propertyName: "_radios", predicate: i0.forwardRef(function () { return NovoRadioElement; }), descendants: true }], usesInheritance: true, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, styles: [":host{display:flex}:host.novo-radio-group-appearance-vertical{flex-flow:column;gap:.2rem}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoRadioGroup, decorators: [{
            type: Component,
            args: [{ selector: 'novo-radio-group', providers: [
                        RADIOGROUP_VALUE_ACCESSOR,
                        { provide: NOVO_RADIO_GROUP, useExisting: NovoRadioGroup },
                        { provide: NovoFieldControl, useExisting: NovoRadioGroup },
                    ], template: '<ng-content></ng-content>', host: {
                        class: 'novo-radio-group',
                        '[class.novo-radio-group-appearance-horizontal]': 'appearance=="horizontal"',
                        '[class.novo-radio-group-appearance-vertical]': 'appearance=="vertical"',
                    }, styles: [":host{display:flex}:host.novo-radio-group-appearance-vertical{flex-flow:column;gap:.2rem}\n"] }]
        }], propDecorators: { id: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], errorStateMatcher: [{
                type: Input
            }], change: [{
                type: Output
            }], blur: [{
                type: Output
            }], _radios: [{
                type: ContentChildren,
                args: [forwardRef(() => NovoRadioElement), { descendants: true }]
            }], appearance: [{
                type: Input
            }], value: [{
                type: Input
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
class NovoRadioModule {
}
NovoRadioModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoRadioModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoRadioModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoRadioModule, declarations: [NovoRadioElement, NovoRadioGroup], imports: [CommonModule, NovoButtonModule], exports: [NovoRadioElement, NovoRadioGroup] });
NovoRadioModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoRadioModule, imports: [[CommonModule, NovoButtonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoRadioModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NovoButtonModule],
                    declarations: [NovoRadioElement, NovoRadioGroup],
                    exports: [NovoRadioElement, NovoRadioGroup],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NOVO_RADIO_GROUP, NovoRadioElement, NovoRadioGroup, NovoRadioModule };
//# sourceMappingURL=novo-elements-components-radio.mjs.map

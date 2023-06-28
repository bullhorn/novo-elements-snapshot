import * as i0 from '@angular/core';
import { InjectionToken, forwardRef, EventEmitter, Component, Inject, Optional, Input, Output, ContentChildren, HostBinding, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i1 from 'novo-elements/elements/button';
import { NovoButtonModule } from 'novo-elements/elements/button';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { mixinErrorState } from 'novo-elements/elements/common';
import { NovoFieldControl } from 'novo-elements/elements/field';

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
        this._value = false;
        this._checked = false;
        this.id = this._uniqueId;
        this.name = this._uniqueId;
        this.tabindex = 0;
        this.vertical = false;
        this.button = false;
        this.theme = 'secondary';
        this.change = new EventEmitter();
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
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
    ngOnInit() {
        if (this.radioGroup) {
            this.checked = this.radioGroup.value === this._value;
            this.vertical = this.radioGroup.appearance === 'vertical';
            this.name = this.radioGroup.name;
            this.disabled = this.disabled || this.radioGroup.disabled;
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
NovoRadioElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoRadioElement, selector: "novo-radio", inputs: { id: "id", name: "name", tabindex: "tabindex", vertical: "vertical", label: "label", button: "button", theme: "theme", size: "size", icon: "icon", color: "color", disabled: "disabled", checked: "checked", value: "value" }, outputs: { change: "change", blur: "blur", focus: "focus" }, host: { properties: { "class.vertical": "vertical" } }, providers: [RADIO_VALUE_ACCESSOR], ngImport: i0, template: `
    <input
      type="radio"
      [id]="id"
      [name]="name"
      [checked]="_checked"
      [tabIndex]="tabindex"
      [disabled]="disabled"
      (focus)="focus.emit($event)"
      (blur)="blur.emit($event)"
      (change)="_onInputChange($event)"
    />
    <label [attr.for]="id" [class.disabled]="disabled">
      <novo-button
        *ngIf="button"
        [ngClass]="{ unchecked: !_checked, checked: _checked, 'has-icon': !!icon }"
        [theme]="theme"
        [color]="_checked ? color : null"
        [icon]="icon"
        [size]="size"
      >
        {{ label }}
      </novo-button>
      <div *ngIf="!button" class="novo-radio-button-label">
        <i [ngClass]="{ 'bhi-radio-empty': !_checked, 'bhi-radio-filled': _checked }"></i>
        {{ label }}
        <ng-content></ng-content>
      </div>
    </label>
  `, isInline: true, components: [{ type: i1.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoRadioElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-radio',
                    providers: [RADIO_VALUE_ACCESSOR],
                    template: `
    <input
      type="radio"
      [id]="id"
      [name]="name"
      [checked]="_checked"
      [tabIndex]="tabindex"
      [disabled]="disabled"
      (focus)="focus.emit($event)"
      (blur)="blur.emit($event)"
      (change)="_onInputChange($event)"
    />
    <label [attr.for]="id" [class.disabled]="disabled">
      <novo-button
        *ngIf="button"
        [ngClass]="{ unchecked: !_checked, checked: _checked, 'has-icon': !!icon }"
        [theme]="theme"
        [color]="_checked ? color : null"
        [icon]="icon"
        [size]="size"
      >
        {{ label }}
      </novo-button>
      <div *ngIf="!button" class="novo-radio-button-label">
        <i [ngClass]="{ 'bhi-radio-empty': !_checked, 'bhi-radio-filled': _checked }"></i>
        {{ label }}
        <ng-content></ng-content>
      </div>
    </label>
  `,
                    host: {
                        '[class.vertical]': 'vertical',
                    },
                }]
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
            }], disabled: [{
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
    ], queries: [{ propertyName: "_radios", predicate: i0.forwardRef(function () { return NovoRadioElement; }), descendants: true }], usesInheritance: true, ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoRadioGroup, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-radio-group',
                    providers: [
                        RADIOGROUP_VALUE_ACCESSOR,
                        { provide: NOVO_RADIO_GROUP, useExisting: NovoRadioGroup },
                        { provide: NovoFieldControl, useExisting: NovoRadioGroup },
                    ],
                    template: '<ng-content></ng-content>',
                    host: {
                        class: 'novo-radio-group',
                        '[class.novo-radio-group-appearance-horizontal]': 'appearance=="horizontal"',
                        '[class.novo-radio-group-appearance-vertical]': 'appearance=="vertical"',
                    },
                }]
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
//# sourceMappingURL=novo-elements-elements-radio.mjs.map

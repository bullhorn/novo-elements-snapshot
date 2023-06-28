import * as i0 from '@angular/core';
import { forwardRef, EventEmitter, Component, Input, HostBinding, Output, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { BooleanInput } from 'novo-elements/utils';
import * as i1 from 'novo-elements/elements/icon';
import { NovoIconModule } from 'novo-elements/elements/icon';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
};
// Value accessor for the component (supports ngModel)
const SWITCH_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoSwitchElement),
    multi: true,
};
class NovoSwitchElement {
    constructor(ref) {
        this.ref = ref;
        this.theme = 'ocean';
        this.icons = ['x', 'check'];
        this.disabled = false;
        this.onChange = new EventEmitter();
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
    onKeydown(event) {
        if (event.key === " " /* Space */) {
            event.preventDefault();
            this.toggle(event);
        }
    }
    toggle(event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        if (this.disabled) {
            return;
        }
        this.value = !this.value;
        this.onChange.next(this.value);
        this.onModelChange(this.value);
        this.ref.markForCheck();
    }
    writeValue(model) {
        this.value = model;
        this.ref.markForCheck();
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
}
NovoSwitchElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSwitchElement, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NovoSwitchElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoSwitchElement, selector: "novo-switch", inputs: { theme: "theme", icons: "icons", disabled: "disabled" }, outputs: { onChange: "onChange" }, host: { attributes: { "role": "checkbox" }, listeners: { "keydown": "onKeydown($event)" }, properties: { "attr.aria-checked": "value", "attr.aria-disabled": "disabled", "class": "theme", "class.novo-switch-disabled": "this.disabled" }, classAttribute: "novo-switch" }, providers: [SWITCH_VALUE_ACCESSOR], ngImport: i0, template: `
    <div (click)="toggle($event)">
      <div class="novo-switch-container">
        <div class="novo-switch-bar"></div>
        <div class="novo-switch-thumb-container">
          <div class="novo-switch-thumb">
            <novo-icon *ngIf="!value" smaller>{{ icons[0] }}</novo-icon>
            <novo-icon *ngIf="value" smaller>{{ icons[1] }}</novo-icon>
          </div>
        </div>
      </div>
      <div class="novo-switch-label"><ng-content></ng-content></div>
    </div>
  `, isInline: true, components: [{ type: i1.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoSwitchElement.prototype, "disabled", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSwitchElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-switch',
                    providers: [SWITCH_VALUE_ACCESSOR],
                    template: `
    <div (click)="toggle($event)">
      <div class="novo-switch-container">
        <div class="novo-switch-bar"></div>
        <div class="novo-switch-thumb-container">
          <div class="novo-switch-thumb">
            <novo-icon *ngIf="!value" smaller>{{ icons[0] }}</novo-icon>
            <novo-icon *ngIf="value" smaller>{{ icons[1] }}</novo-icon>
          </div>
        </div>
      </div>
      <div class="novo-switch-label"><ng-content></ng-content></div>
    </div>
  `,
                    host: {
                        role: 'checkbox',
                        class: 'novo-switch',
                        '[attr.aria-checked]': 'value',
                        '[attr.aria-disabled]': 'disabled',
                        '(keydown)': 'onKeydown($event)',
                        '[class]': 'theme',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { theme: [{
                type: Input
            }], icons: [{
                type: Input
            }], disabled: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.novo-switch-disabled']
            }], onChange: [{
                type: Output
            }] } });

class NovoSwitchModule {
}
NovoSwitchModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSwitchModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoSwitchModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSwitchModule, declarations: [NovoSwitchElement], imports: [CommonModule, FormsModule, NovoIconModule], exports: [NovoSwitchElement] });
NovoSwitchModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSwitchModule, imports: [[CommonModule, FormsModule, NovoIconModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSwitchModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, NovoIconModule],
                    declarations: [NovoSwitchElement],
                    exports: [NovoSwitchElement],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoSwitchElement, NovoSwitchModule };
//# sourceMappingURL=novo-elements-elements-switch.mjs.map

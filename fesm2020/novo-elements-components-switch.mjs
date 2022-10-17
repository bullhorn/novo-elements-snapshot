import * as i0 from '@angular/core';
import { forwardRef, EventEmitter, Component, Input, HostBinding, Output, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { BooleanInput } from 'novo-elements/utils';
import * as i1 from 'novo-elements/components/icon';
import { NovoIconModule } from 'novo-elements/components/icon';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Value accessor for the component (supports ngModel)
const SWITCH_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoSwitchElement),
    multi: true,
};
class NovoSwitchElement {
    constructor(ref, ngZone) {
        this.ref = ref;
        this.ngZone = ngZone;
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
        this.ngZone.run(() => {
            this.value = !this.value;
            this.onModelChange(this.value);
            this.onChange.next(this.value);
            this.ref.markForCheck();
        });
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
NovoSwitchElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSwitchElement, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
NovoSwitchElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoSwitchElement, selector: "novo-switch", inputs: { icons: "icons", disabled: "disabled" }, outputs: { onChange: "onChange" }, host: { attributes: { "role": "switch" }, listeners: { "keydown": "onKeydown($event)" }, properties: { "attr.aria-checked": "value", "attr.aria-disabled": "disabled", "class.novo-switch-disabled": "this.disabled" }, classAttribute: "novo-switch" }, providers: [SWITCH_VALUE_ACCESSOR], ngImport: i0, template: `
    <div (click)="toggle($event)">
      <div class="novo-switch-label novo-switch-prefix"><ng-content select="[novoPrefix]"></ng-content></div>
      <div class="novo-switch-container">
        <div class="novo-switch-bar"></div>
        <div class="novo-switch-thumb-container">
          <div class="novo-switch-thumb">
            <novo-icon *ngIf="!value" smaller>{{ icons[0] }}</novo-icon>
            <novo-icon *ngIf="value" smaller>{{ icons[1] }}</novo-icon>
          </div>
        </div>
      </div>
      <div class="novo-switch-label novo-switch-suffix"><ng-content></ng-content></div>
    </div>
  `, isInline: true, styles: [":host{gap:var(--switch-spacing);height:var(--switch-height);display:flex;align-items:center;white-space:nowrap;cursor:pointer;outline:none;-webkit-user-select:none;-moz-user-select:none;user-select:none;box-sizing:border-box;transition:all .5s cubic-bezier(.35,0,.25,1)}:host>div{display:flex;align-items:center}:host .novo-switch-container{cursor:-webkit-grab;cursor:grab;width:calc(var(--switch-height) * 1.5);height:var(--switch-height);position:relative;-webkit-user-select:none;-moz-user-select:none;user-select:none;margin:0 8px}:host:not(.novo-switch-disabled).novo-switch-dragging .novo-switch-container,:host:not(.novo-switch-disabled) .novo-switch-dragging{cursor:-webkit-grabbing;cursor:grabbing}:host .novo-switch-label{border:0 transparent}:host .novo-switch-bar{background-color:var(--switch-track-color-background);height:calc(var(--switch-height) * .5);width:calc(var(--switch-height) * 1.5 - 2px);top:calc(var(--switch-height) / 2 - var(--switch-height) * .5 / 2);left:1px;border-radius:var(--switch-border-radius);position:absolute}:host .novo-switch-thumb-container{top:calc(var(--switch-height) / 2 - (var(--switch-height) - var(--switch-border-width) * 2) / 2);width:calc(var(--switch-height) * 1.5 - (var(--switch-height) - var(--switch-border-width) * 2));left:0;position:absolute;transform:translateZ(0);z-index:z(default)}:host .novo-switch-thumb{background-color:var(--switch-thumb-color-background);color:var(--switch-icon-color-text);box-shadow:var(--shadow-z1);height:calc(var(--switch-height) - var(--switch-border-width) * 2);width:calc(var(--switch-height) - var(--switch-border-width) * 2);border-radius:var(--switch-border-radius);position:absolute;display:flex;align-items:center;justify-content:center;margin:0;left:0;top:0;outline:none}:host .novo-switch-thumb .novo-icon{color:inherit}:host:not(.novo-switch-dragging) .novo-switch-bar,:host:not(.novo-switch-dragging) .novo-switch-thumb,:host:not(.novo-switch-dragging) .novo-switch-thumb-container{transition:all .5s cubic-bezier(.35,0,.25,1);transition-property:transform,background-color,color}:host:not(.novo-switch-dragging) .novo-switch-bar,:host:not(.novo-switch-dragging) .novo-switch-thumb{transition-delay:.05s}:host.novo-switch-disabled{opacity:.5;cursor:not-allowed}:host.novo-switch-disabled .novo-switch-container{cursor:not-allowed;pointer-events:none}:host[aria-checked=true]{--switch-track-color-background: var(--switch-track-color-selected);--switch-thumb-color-background: var(--switch-thumb-color-selected);--switch-icon-color-text: var(--switch-icon-color-selected)}:host[aria-checked=true] .novo-switch-thumb-container{transform:translate3d(100%,0,0)}:host[aria-checked=true].novo-theme-selection{--switch-track-color-background: var(--color-selection-overlay);--switch-thumb-color-background: var(--color-selection);--switch-icon-color-text: var(--color-selection-contrast)}:host[aria-checked=true].novo-theme-positive{--switch-track-color-background: var(--color-positive-overlay);--switch-thumb-color-background: var(--color-positive);--switch-icon-color-text: var(--color-positive-contrast)}:host[aria-checked=true].novo-theme-success{--switch-track-color-background: var(--color-success-overlay);--switch-thumb-color-background: var(--color-success);--switch-icon-color-text: var(--color-success-contrast)}:host[aria-checked=true].novo-theme-warning{--switch-track-color-background: var(--color-warning-overlay);--switch-thumb-color-background: var(--color-warning);--switch-icon-color-text: var(--color-warning-contrast)}:host[aria-checked=true].novo-theme-error{--switch-track-color-background: var(--color-error-overlay);--switch-thumb-color-background: var(--color-error);--switch-icon-color-text: var(--color-error-contrast)}:host[aria-checked=true].novo-theme-info{--switch-track-color-background: var(--color-info-overlay);--switch-thumb-color-background: var(--color-info);--switch-icon-color-text: var(--color-info-contrast)}:host[aria-checked=true].novo-theme-disabled{--switch-track-color-background: var(--color-disabled-overlay);--switch-thumb-color-background: var(--color-disabled);--switch-icon-color-text: var(--color-disabled-contrast)}:host[aria-checked=true].novo-theme-red{--switch-track-color-background: var(--palette-red-98);--switch-thumb-color-background: var(--palette-red-50);--switch-icon-color-text: var(--palette-red-50-contrast)}:host[aria-checked=true].novo-theme-pink{--switch-track-color-background: var(--palette-pink-98);--switch-thumb-color-background: var(--palette-pink-50);--switch-icon-color-text: var(--palette-pink-50-contrast)}:host[aria-checked=true].novo-theme-orange{--switch-track-color-background: var(--palette-orange-98);--switch-thumb-color-background: var(--palette-orange-50);--switch-icon-color-text: var(--palette-orange-50-contrast)}:host[aria-checked=true].novo-theme-yellow{--switch-track-color-background: var(--palette-yellow-98);--switch-thumb-color-background: var(--palette-yellow-50);--switch-icon-color-text: var(--palette-yellow-50-contrast)}:host[aria-checked=true].novo-theme-green{--switch-track-color-background: var(--palette-green-98);--switch-thumb-color-background: var(--palette-green-50);--switch-icon-color-text: var(--palette-green-50-contrast)}:host[aria-checked=true].novo-theme-teal{--switch-track-color-background: var(--palette-teal-98);--switch-thumb-color-background: var(--palette-teal-50);--switch-icon-color-text: var(--palette-teal-50-contrast)}:host[aria-checked=true].novo-theme-blue{--switch-track-color-background: var(--palette-blue-98);--switch-thumb-color-background: var(--palette-blue-50);--switch-icon-color-text: var(--palette-blue-50-contrast)}:host[aria-checked=true].novo-theme-aqua{--switch-track-color-background: var(--palette-aqua-98);--switch-thumb-color-background: var(--palette-aqua-50);--switch-icon-color-text: var(--palette-aqua-50-contrast)}:host[aria-checked=true].novo-theme-indigo{--switch-track-color-background: var(--palette-indigo-98);--switch-thumb-color-background: var(--palette-indigo-50);--switch-icon-color-text: var(--palette-indigo-50-contrast)}:host[aria-checked=true].novo-theme-violet{--switch-track-color-background: var(--palette-violet-98);--switch-thumb-color-background: var(--palette-violet-50);--switch-icon-color-text: var(--palette-violet-50-contrast)}:host[aria-checked=true].novo-theme-gray{--switch-track-color-background: var(--palette-gray-98);--switch-thumb-color-background: var(--palette-gray-50);--switch-icon-color-text: var(--palette-gray-50-contrast)}:host:focus .novo-switch-label:not(:empty){border:1px dotted var()}\n"], components: [{ type: i1.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoSwitchElement.prototype, "disabled", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSwitchElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-switch', providers: [SWITCH_VALUE_ACCESSOR], template: `
    <div (click)="toggle($event)">
      <div class="novo-switch-label novo-switch-prefix"><ng-content select="[novoPrefix]"></ng-content></div>
      <div class="novo-switch-container">
        <div class="novo-switch-bar"></div>
        <div class="novo-switch-thumb-container">
          <div class="novo-switch-thumb">
            <novo-icon *ngIf="!value" smaller>{{ icons[0] }}</novo-icon>
            <novo-icon *ngIf="value" smaller>{{ icons[1] }}</novo-icon>
          </div>
        </div>
      </div>
      <div class="novo-switch-label novo-switch-suffix"><ng-content></ng-content></div>
    </div>
  `, host: {
                        role: 'switch',
                        class: 'novo-switch',
                        '[attr.aria-checked]': 'value',
                        '[attr.aria-disabled]': 'disabled',
                        '(keydown)': 'onKeydown($event)',
                    }, styles: [":host{gap:var(--switch-spacing);height:var(--switch-height);display:flex;align-items:center;white-space:nowrap;cursor:pointer;outline:none;-webkit-user-select:none;-moz-user-select:none;user-select:none;box-sizing:border-box;transition:all .5s cubic-bezier(.35,0,.25,1)}:host>div{display:flex;align-items:center}:host .novo-switch-container{cursor:-webkit-grab;cursor:grab;width:calc(var(--switch-height) * 1.5);height:var(--switch-height);position:relative;-webkit-user-select:none;-moz-user-select:none;user-select:none;margin:0 8px}:host:not(.novo-switch-disabled).novo-switch-dragging .novo-switch-container,:host:not(.novo-switch-disabled) .novo-switch-dragging{cursor:-webkit-grabbing;cursor:grabbing}:host .novo-switch-label{border:0 transparent}:host .novo-switch-bar{background-color:var(--switch-track-color-background);height:calc(var(--switch-height) * .5);width:calc(var(--switch-height) * 1.5 - 2px);top:calc(var(--switch-height) / 2 - var(--switch-height) * .5 / 2);left:1px;border-radius:var(--switch-border-radius);position:absolute}:host .novo-switch-thumb-container{top:calc(var(--switch-height) / 2 - (var(--switch-height) - var(--switch-border-width) * 2) / 2);width:calc(var(--switch-height) * 1.5 - (var(--switch-height) - var(--switch-border-width) * 2));left:0;position:absolute;transform:translateZ(0);z-index:z(default)}:host .novo-switch-thumb{background-color:var(--switch-thumb-color-background);color:var(--switch-icon-color-text);box-shadow:var(--shadow-z1);height:calc(var(--switch-height) - var(--switch-border-width) * 2);width:calc(var(--switch-height) - var(--switch-border-width) * 2);border-radius:var(--switch-border-radius);position:absolute;display:flex;align-items:center;justify-content:center;margin:0;left:0;top:0;outline:none}:host .novo-switch-thumb .novo-icon{color:inherit}:host:not(.novo-switch-dragging) .novo-switch-bar,:host:not(.novo-switch-dragging) .novo-switch-thumb,:host:not(.novo-switch-dragging) .novo-switch-thumb-container{transition:all .5s cubic-bezier(.35,0,.25,1);transition-property:transform,background-color,color}:host:not(.novo-switch-dragging) .novo-switch-bar,:host:not(.novo-switch-dragging) .novo-switch-thumb{transition-delay:.05s}:host.novo-switch-disabled{opacity:.5;cursor:not-allowed}:host.novo-switch-disabled .novo-switch-container{cursor:not-allowed;pointer-events:none}:host[aria-checked=true]{--switch-track-color-background: var(--switch-track-color-selected);--switch-thumb-color-background: var(--switch-thumb-color-selected);--switch-icon-color-text: var(--switch-icon-color-selected)}:host[aria-checked=true] .novo-switch-thumb-container{transform:translate3d(100%,0,0)}:host[aria-checked=true].novo-theme-selection{--switch-track-color-background: var(--color-selection-overlay);--switch-thumb-color-background: var(--color-selection);--switch-icon-color-text: var(--color-selection-contrast)}:host[aria-checked=true].novo-theme-positive{--switch-track-color-background: var(--color-positive-overlay);--switch-thumb-color-background: var(--color-positive);--switch-icon-color-text: var(--color-positive-contrast)}:host[aria-checked=true].novo-theme-success{--switch-track-color-background: var(--color-success-overlay);--switch-thumb-color-background: var(--color-success);--switch-icon-color-text: var(--color-success-contrast)}:host[aria-checked=true].novo-theme-warning{--switch-track-color-background: var(--color-warning-overlay);--switch-thumb-color-background: var(--color-warning);--switch-icon-color-text: var(--color-warning-contrast)}:host[aria-checked=true].novo-theme-error{--switch-track-color-background: var(--color-error-overlay);--switch-thumb-color-background: var(--color-error);--switch-icon-color-text: var(--color-error-contrast)}:host[aria-checked=true].novo-theme-info{--switch-track-color-background: var(--color-info-overlay);--switch-thumb-color-background: var(--color-info);--switch-icon-color-text: var(--color-info-contrast)}:host[aria-checked=true].novo-theme-disabled{--switch-track-color-background: var(--color-disabled-overlay);--switch-thumb-color-background: var(--color-disabled);--switch-icon-color-text: var(--color-disabled-contrast)}:host[aria-checked=true].novo-theme-red{--switch-track-color-background: var(--palette-red-98);--switch-thumb-color-background: var(--palette-red-50);--switch-icon-color-text: var(--palette-red-50-contrast)}:host[aria-checked=true].novo-theme-pink{--switch-track-color-background: var(--palette-pink-98);--switch-thumb-color-background: var(--palette-pink-50);--switch-icon-color-text: var(--palette-pink-50-contrast)}:host[aria-checked=true].novo-theme-orange{--switch-track-color-background: var(--palette-orange-98);--switch-thumb-color-background: var(--palette-orange-50);--switch-icon-color-text: var(--palette-orange-50-contrast)}:host[aria-checked=true].novo-theme-yellow{--switch-track-color-background: var(--palette-yellow-98);--switch-thumb-color-background: var(--palette-yellow-50);--switch-icon-color-text: var(--palette-yellow-50-contrast)}:host[aria-checked=true].novo-theme-green{--switch-track-color-background: var(--palette-green-98);--switch-thumb-color-background: var(--palette-green-50);--switch-icon-color-text: var(--palette-green-50-contrast)}:host[aria-checked=true].novo-theme-teal{--switch-track-color-background: var(--palette-teal-98);--switch-thumb-color-background: var(--palette-teal-50);--switch-icon-color-text: var(--palette-teal-50-contrast)}:host[aria-checked=true].novo-theme-blue{--switch-track-color-background: var(--palette-blue-98);--switch-thumb-color-background: var(--palette-blue-50);--switch-icon-color-text: var(--palette-blue-50-contrast)}:host[aria-checked=true].novo-theme-aqua{--switch-track-color-background: var(--palette-aqua-98);--switch-thumb-color-background: var(--palette-aqua-50);--switch-icon-color-text: var(--palette-aqua-50-contrast)}:host[aria-checked=true].novo-theme-indigo{--switch-track-color-background: var(--palette-indigo-98);--switch-thumb-color-background: var(--palette-indigo-50);--switch-icon-color-text: var(--palette-indigo-50-contrast)}:host[aria-checked=true].novo-theme-violet{--switch-track-color-background: var(--palette-violet-98);--switch-thumb-color-background: var(--palette-violet-50);--switch-icon-color-text: var(--palette-violet-50-contrast)}:host[aria-checked=true].novo-theme-gray{--switch-track-color-background: var(--palette-gray-98);--switch-thumb-color-background: var(--palette-gray-50);--switch-icon-color-text: var(--palette-gray-50-contrast)}:host:focus .novo-switch-label:not(:empty){border:1px dotted var()}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.NgZone }]; }, propDecorators: { icons: [{
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
//# sourceMappingURL=novo-elements-components-switch.mjs.map

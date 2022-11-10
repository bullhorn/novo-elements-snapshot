import * as i0 from '@angular/core';
import { InjectionToken, forwardRef, EventEmitter, Component, Optional, Inject, HostBinding, Input, Output, ContentChildren, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';

var ProgressAppearance;
(function (ProgressAppearance) {
    ProgressAppearance["LINEAR"] = "linear";
    ProgressAppearance["RADIAL"] = "radial";
})(ProgressAppearance || (ProgressAppearance = {}));
/**
 * Used to provide a progress container to a progress bar while avoiding circular references.
 * @docs-private
 */
const NOVO_PROGRESS_CONTAINER = new InjectionToken('NOVO_PROGRESS_CONTAINER');

// NG2
// make radio-button-group ids unique
let nextId = 0;
// Value accessor for the component (supports ngModel)
const PROGRESS_BAR_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoProgressBarElement),
    multi: true,
};
class NovoProgressBarElement {
    constructor(ref, progress) {
        this.ref = ref;
        this.progress = progress;
        this._uniqueId = `novo-progress-${++nextId}`;
        this.appearance = ProgressAppearance.LINEAR;
        this.id = this._uniqueId;
        this.name = this._uniqueId;
        this.tabindex = 0;
        this.indeterminate = false;
        // Radial Value
        this.radius = 54;
        this.circumference = 2 * Math.PI * this.radius;
        this.striped = false;
        this.animated = false;
        this.change = new EventEmitter();
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
        this._percent = 0;
        this._value = 0;
        this._disabled = false;
        this.onChangeCallback = (_) => {
            // placeholder
        };
        this.onTouchedCallback = () => {
            // placeholder
        };
        // NovoProgressElement
        this.progress = progress;
    }
    get width() {
        if (this.isRadial()) {
            return `100%`;
        }
        return `${this._percent * 100}%`;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        if (this.value !== value) {
            this._value = value;
            if (this.progress) {
                this._percent = this.value / this.progress.total;
            }
            else {
                this._percent = value;
            }
            this.dashoffset = this.circumference * (1 - this._percent);
            this.onChangeCallback(this._value);
        }
    }
    // Disabled State
    get disabled() {
        return this._disabled || (this.progress != null && this.progress.disabled);
    }
    set disabled(value) {
        this._disabled = !!value;
    }
    ngOnInit() {
        var _a;
        if (this.indeterminate) {
            this.striped = true;
            this.animated = true;
            this._value = ((_a = this.progress) === null || _a === void 0 ? void 0 : _a.total) || 100;
        }
        if (this.progress) {
            this._percent = this._value / this.progress.total;
            this.appearance = this.progress.appearance;
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
    isLinear() {
        return this.appearance === ProgressAppearance.LINEAR;
    }
    isRadial() {
        return this.appearance === ProgressAppearance.RADIAL;
    }
}
NovoProgressBarElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoProgressBarElement, deps: [{ token: i0.ChangeDetectorRef }, { token: NOVO_PROGRESS_CONTAINER, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NovoProgressBarElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoProgressBarElement, selector: "novo-progress-bar", inputs: { id: "id", name: "name", tabindex: "tabindex", label: "label", theme: "theme", color: "color", indeterminate: "indeterminate", striped: "striped", animated: "animated", value: "value", disabled: "disabled" }, outputs: { change: "change", blur: "blur", focus: "focus" }, host: { properties: { "class": "this.appearance", "class.striped": "this.striped", "class.animated": "this.animated", "style.width": "this.width", "class.disabled": "this.disabled" } }, providers: [PROGRESS_BAR_VALUE_ACCESSOR], ngImport: i0, template: `
    <div *ngIf="isLinear()" class="progress-bar"></div>
    <svg *ngIf="isRadial()" width="120" height="120">
      <circle
        [style.strokeDasharray]="circumference"
        [style.strokeDashoffset]="dashoffset"
        [attr.r]="radius"
        cx="60"
        cy="60"
        stroke-width="4"
        fill="transparent"
        class="progress__value"
      />
      <!-- <text x="18" y="20.35" class="percentage">30%</text> -->
    </svg>
  `, isInline: true, styles: [":host{display:flex;height:100%}:host.linear{background-color:var(--color-selection)}:host.linear[color=person]{color:var(--color-person-contrast);background:var(--color-person)}:host.linear[color=company]{color:var(--color-company-contrast);background:var(--color-company)}:host.linear[color=candidate]{color:var(--color-candidate-contrast);background:var(--color-candidate)}:host.linear[color=lead]{color:var(--color-lead-contrast);background:var(--color-lead)}:host.linear[color=contact]{color:var(--color-contact-contrast);background:var(--color-contact)}:host.linear[color=clientcontact]{color:var(--color-clientcontact-contrast);background:var(--color-clientcontact)}:host.linear[color=opportunity]{color:var(--color-opportunity-contrast);background:var(--color-opportunity)}:host.linear[color=job]{color:var(--color-job-contrast);background:var(--color-job)}:host.linear[color=joborder]{color:var(--color-joborder-contrast);background:var(--color-joborder)}:host.linear[color=submission]{color:var(--color-submission-contrast);background:var(--color-submission)}:host.linear[color=sendout]{color:var(--color-sendout-contrast);background:var(--color-sendout)}:host.linear[color=placement]{color:var(--color-placement-contrast);background:var(--color-placement)}:host.linear[color=note]{color:var(--color-note-contrast);background:var(--color-note)}:host.linear[color=task]{color:var(--color-task-contrast);background:var(--color-task)}:host.linear[color=distribution-list]{color:var(--color-distribution-list-contrast);background:var(--color-distribution-list)}:host.linear[color=credential]{color:var(--color-credential-contrast);background:var(--color-credential)}:host.linear[color=user]{color:var(--color-user-contrast);background:var(--color-user)}:host.linear[color=corporate-user]{color:var(--color-corporate-user-contrast);background:var(--color-corporate-user)}:host.linear[color=contract]{color:var(--color-contract-contrast);background:var(--color-contract)}:host.linear[color=job-code]{color:var(--color-job-code-contrast);background:var(--color-job-code)}:host.linear[color=earn-code]{color:var(--color-earn-code-contrast);background:var(--color-earn-code)}:host.linear[color=billable-charge]{color:var(--color-billable-charge-contrast);background:var(--color-billable-charge)}:host.linear[color=payable-charge]{color:var(--color-payable-charge-contrast);background:var(--color-payable-charge)}:host.linear[color=invoice-statement]{color:var(--color-invoice-statement-contrast);background:var(--color-invoice-statement)}:host.linear[color=selection]{color:var(--color-selection-contrast);background:var(--color-selection)}:host.linear[color=positive]{color:var(--color-positive-contrast);background:var(--color-positive)}:host.linear[color=success]{color:var(--color-success-contrast);background:var(--color-success)}:host.linear[color=warning]{color:var(--color-warning-contrast);background:var(--color-warning)}:host.linear[color=error]{color:var(--color-error-contrast);background:var(--color-error)}:host.linear[color=info]{color:var(--color-info-contrast);background:var(--color-info)}:host.linear[color=disabled]{color:var(--color-disabled-contrast);background:var(--color-disabled)}:host.linear[color=red]{color:var(--palette-red-50-contrast);background:var(--palette-red-50)}:host.linear[color=pink]{color:var(--palette-pink-50-contrast);background:var(--palette-pink-50)}:host.linear[color=orange]{color:var(--palette-orange-50-contrast);background:var(--palette-orange-50)}:host.linear[color=yellow]{color:var(--palette-yellow-50-contrast);background:var(--palette-yellow-50)}:host.linear[color=green]{color:var(--palette-green-50-contrast);background:var(--palette-green-50)}:host.linear[color=teal]{color:var(--palette-teal-50-contrast);background:var(--palette-teal-50)}:host.linear[color=blue]{color:var(--palette-blue-50-contrast);background:var(--palette-blue-50)}:host.linear[color=aqua]{color:var(--palette-aqua-50-contrast);background:var(--palette-aqua-50)}:host.linear[color=indigo]{color:var(--palette-indigo-50-contrast);background:var(--palette-indigo-50)}:host.linear[color=violet]{color:var(--palette-violet-50-contrast);background:var(--palette-violet-50)}:host.linear[color=gray]{color:var(--palette-gray-50-contrast);background:var(--palette-gray-50)}:host.linear:first-child{border-radius:.2em 0 0 .2em}:host.linear:last-child{border-radius:0 .2em .2em 0}:host.linear.striped{background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-size:40px 40px}:host.linear.animated{-webkit-animation:progress-bar-stripes 2s linear infinite;animation:progress-bar-stripes 2s linear infinite}:host.radial{position:absolute}:host.radial[color=person] svg circle{stroke:var(--color-person)}:host.radial[color=company] svg circle{stroke:var(--color-company)}:host.radial[color=candidate] svg circle{stroke:var(--color-candidate)}:host.radial[color=lead] svg circle{stroke:var(--color-lead)}:host.radial[color=contact] svg circle{stroke:var(--color-contact)}:host.radial[color=clientcontact] svg circle{stroke:var(--color-clientcontact)}:host.radial[color=opportunity] svg circle{stroke:var(--color-opportunity)}:host.radial[color=job] svg circle{stroke:var(--color-job)}:host.radial[color=joborder] svg circle{stroke:var(--color-joborder)}:host.radial[color=submission] svg circle{stroke:var(--color-submission)}:host.radial[color=sendout] svg circle{stroke:var(--color-sendout)}:host.radial[color=placement] svg circle{stroke:var(--color-placement)}:host.radial[color=note] svg circle{stroke:var(--color-note)}:host.radial[color=task] svg circle{stroke:var(--color-task)}:host.radial[color=distribution-list] svg circle{stroke:var(--color-distribution-list)}:host.radial[color=credential] svg circle{stroke:var(--color-credential)}:host.radial[color=user] svg circle{stroke:var(--color-user)}:host.radial[color=corporate-user] svg circle{stroke:var(--color-corporate-user)}:host.radial[color=contract] svg circle{stroke:var(--color-contract)}:host.radial[color=job-code] svg circle{stroke:var(--color-job-code)}:host.radial[color=earn-code] svg circle{stroke:var(--color-earn-code)}:host.radial[color=billable-charge] svg circle{stroke:var(--color-billable-charge)}:host.radial[color=payable-charge] svg circle{stroke:var(--color-payable-charge)}:host.radial[color=invoice-statement] svg circle{stroke:var(--color-invoice-statement)}:host.radial[color=selection] svg circle{stroke:var(--color-selection)}:host.radial[color=positive] svg circle{stroke:var(--color-positive)}:host.radial[color=success] svg circle{stroke:var(--color-success)}:host.radial[color=warning] svg circle{stroke:var(--color-warning)}:host.radial[color=error] svg circle{stroke:var(--color-error)}:host.radial[color=info] svg circle{stroke:var(--color-info)}:host.radial[color=disabled] svg circle{stroke:var(--color-disabled)}:host.radial[color=red] svg circle{stroke:var(--palette-red-50)}:host.radial[color=pink] svg circle{stroke:var(--palette-pink-50)}:host.radial[color=orange] svg circle{stroke:var(--palette-orange-50)}:host.radial[color=yellow] svg circle{stroke:var(--palette-yellow-50)}:host.radial[color=green] svg circle{stroke:var(--palette-green-50)}:host.radial[color=teal] svg circle{stroke:var(--palette-teal-50)}:host.radial[color=blue] svg circle{stroke:var(--palette-blue-50)}:host.radial[color=aqua] svg circle{stroke:var(--palette-aqua-50)}:host.radial[color=indigo] svg circle{stroke:var(--palette-indigo-50)}:host.radial[color=violet] svg circle{stroke:var(--palette-violet-50)}:host.radial[color=gray] svg circle{stroke:var(--palette-gray-50)}:host.radial svg circle{stroke:var(--color-selection);transform-origin:50% 50%;transform:rotate(-90deg);transition:.35s stroke-dashoffset}:host.radial svg text{fill:#666;font-family:sans-serif;font-size:.5em;text-anchor:middle}@-webkit-keyframes progress-bar-stripes{0%{background-position:0 0}to{background-position:40px 0}}@keyframes progress-bar-stripes{0%{background-position:0 0}to{background-position:40px 0}}\n"], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoProgressBarElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-progress-bar', providers: [PROGRESS_BAR_VALUE_ACCESSOR], template: `
    <div *ngIf="isLinear()" class="progress-bar"></div>
    <svg *ngIf="isRadial()" width="120" height="120">
      <circle
        [style.strokeDasharray]="circumference"
        [style.strokeDashoffset]="dashoffset"
        [attr.r]="radius"
        cx="60"
        cy="60"
        stroke-width="4"
        fill="transparent"
        class="progress__value"
      />
      <!-- <text x="18" y="20.35" class="percentage">30%</text> -->
    </svg>
  `, styles: [":host{display:flex;height:100%}:host.linear{background-color:var(--color-selection)}:host.linear[color=person]{color:var(--color-person-contrast);background:var(--color-person)}:host.linear[color=company]{color:var(--color-company-contrast);background:var(--color-company)}:host.linear[color=candidate]{color:var(--color-candidate-contrast);background:var(--color-candidate)}:host.linear[color=lead]{color:var(--color-lead-contrast);background:var(--color-lead)}:host.linear[color=contact]{color:var(--color-contact-contrast);background:var(--color-contact)}:host.linear[color=clientcontact]{color:var(--color-clientcontact-contrast);background:var(--color-clientcontact)}:host.linear[color=opportunity]{color:var(--color-opportunity-contrast);background:var(--color-opportunity)}:host.linear[color=job]{color:var(--color-job-contrast);background:var(--color-job)}:host.linear[color=joborder]{color:var(--color-joborder-contrast);background:var(--color-joborder)}:host.linear[color=submission]{color:var(--color-submission-contrast);background:var(--color-submission)}:host.linear[color=sendout]{color:var(--color-sendout-contrast);background:var(--color-sendout)}:host.linear[color=placement]{color:var(--color-placement-contrast);background:var(--color-placement)}:host.linear[color=note]{color:var(--color-note-contrast);background:var(--color-note)}:host.linear[color=task]{color:var(--color-task-contrast);background:var(--color-task)}:host.linear[color=distribution-list]{color:var(--color-distribution-list-contrast);background:var(--color-distribution-list)}:host.linear[color=credential]{color:var(--color-credential-contrast);background:var(--color-credential)}:host.linear[color=user]{color:var(--color-user-contrast);background:var(--color-user)}:host.linear[color=corporate-user]{color:var(--color-corporate-user-contrast);background:var(--color-corporate-user)}:host.linear[color=contract]{color:var(--color-contract-contrast);background:var(--color-contract)}:host.linear[color=job-code]{color:var(--color-job-code-contrast);background:var(--color-job-code)}:host.linear[color=earn-code]{color:var(--color-earn-code-contrast);background:var(--color-earn-code)}:host.linear[color=billable-charge]{color:var(--color-billable-charge-contrast);background:var(--color-billable-charge)}:host.linear[color=payable-charge]{color:var(--color-payable-charge-contrast);background:var(--color-payable-charge)}:host.linear[color=invoice-statement]{color:var(--color-invoice-statement-contrast);background:var(--color-invoice-statement)}:host.linear[color=selection]{color:var(--color-selection-contrast);background:var(--color-selection)}:host.linear[color=positive]{color:var(--color-positive-contrast);background:var(--color-positive)}:host.linear[color=success]{color:var(--color-success-contrast);background:var(--color-success)}:host.linear[color=warning]{color:var(--color-warning-contrast);background:var(--color-warning)}:host.linear[color=error]{color:var(--color-error-contrast);background:var(--color-error)}:host.linear[color=info]{color:var(--color-info-contrast);background:var(--color-info)}:host.linear[color=disabled]{color:var(--color-disabled-contrast);background:var(--color-disabled)}:host.linear[color=red]{color:var(--palette-red-50-contrast);background:var(--palette-red-50)}:host.linear[color=pink]{color:var(--palette-pink-50-contrast);background:var(--palette-pink-50)}:host.linear[color=orange]{color:var(--palette-orange-50-contrast);background:var(--palette-orange-50)}:host.linear[color=yellow]{color:var(--palette-yellow-50-contrast);background:var(--palette-yellow-50)}:host.linear[color=green]{color:var(--palette-green-50-contrast);background:var(--palette-green-50)}:host.linear[color=teal]{color:var(--palette-teal-50-contrast);background:var(--palette-teal-50)}:host.linear[color=blue]{color:var(--palette-blue-50-contrast);background:var(--palette-blue-50)}:host.linear[color=aqua]{color:var(--palette-aqua-50-contrast);background:var(--palette-aqua-50)}:host.linear[color=indigo]{color:var(--palette-indigo-50-contrast);background:var(--palette-indigo-50)}:host.linear[color=violet]{color:var(--palette-violet-50-contrast);background:var(--palette-violet-50)}:host.linear[color=gray]{color:var(--palette-gray-50-contrast);background:var(--palette-gray-50)}:host.linear:first-child{border-radius:.2em 0 0 .2em}:host.linear:last-child{border-radius:0 .2em .2em 0}:host.linear.striped{background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-size:40px 40px}:host.linear.animated{-webkit-animation:progress-bar-stripes 2s linear infinite;animation:progress-bar-stripes 2s linear infinite}:host.radial{position:absolute}:host.radial[color=person] svg circle{stroke:var(--color-person)}:host.radial[color=company] svg circle{stroke:var(--color-company)}:host.radial[color=candidate] svg circle{stroke:var(--color-candidate)}:host.radial[color=lead] svg circle{stroke:var(--color-lead)}:host.radial[color=contact] svg circle{stroke:var(--color-contact)}:host.radial[color=clientcontact] svg circle{stroke:var(--color-clientcontact)}:host.radial[color=opportunity] svg circle{stroke:var(--color-opportunity)}:host.radial[color=job] svg circle{stroke:var(--color-job)}:host.radial[color=joborder] svg circle{stroke:var(--color-joborder)}:host.radial[color=submission] svg circle{stroke:var(--color-submission)}:host.radial[color=sendout] svg circle{stroke:var(--color-sendout)}:host.radial[color=placement] svg circle{stroke:var(--color-placement)}:host.radial[color=note] svg circle{stroke:var(--color-note)}:host.radial[color=task] svg circle{stroke:var(--color-task)}:host.radial[color=distribution-list] svg circle{stroke:var(--color-distribution-list)}:host.radial[color=credential] svg circle{stroke:var(--color-credential)}:host.radial[color=user] svg circle{stroke:var(--color-user)}:host.radial[color=corporate-user] svg circle{stroke:var(--color-corporate-user)}:host.radial[color=contract] svg circle{stroke:var(--color-contract)}:host.radial[color=job-code] svg circle{stroke:var(--color-job-code)}:host.radial[color=earn-code] svg circle{stroke:var(--color-earn-code)}:host.radial[color=billable-charge] svg circle{stroke:var(--color-billable-charge)}:host.radial[color=payable-charge] svg circle{stroke:var(--color-payable-charge)}:host.radial[color=invoice-statement] svg circle{stroke:var(--color-invoice-statement)}:host.radial[color=selection] svg circle{stroke:var(--color-selection)}:host.radial[color=positive] svg circle{stroke:var(--color-positive)}:host.radial[color=success] svg circle{stroke:var(--color-success)}:host.radial[color=warning] svg circle{stroke:var(--color-warning)}:host.radial[color=error] svg circle{stroke:var(--color-error)}:host.radial[color=info] svg circle{stroke:var(--color-info)}:host.radial[color=disabled] svg circle{stroke:var(--color-disabled)}:host.radial[color=red] svg circle{stroke:var(--palette-red-50)}:host.radial[color=pink] svg circle{stroke:var(--palette-pink-50)}:host.radial[color=orange] svg circle{stroke:var(--palette-orange-50)}:host.radial[color=yellow] svg circle{stroke:var(--palette-yellow-50)}:host.radial[color=green] svg circle{stroke:var(--palette-green-50)}:host.radial[color=teal] svg circle{stroke:var(--palette-teal-50)}:host.radial[color=blue] svg circle{stroke:var(--palette-blue-50)}:host.radial[color=aqua] svg circle{stroke:var(--palette-aqua-50)}:host.radial[color=indigo] svg circle{stroke:var(--palette-indigo-50)}:host.radial[color=violet] svg circle{stroke:var(--palette-violet-50)}:host.radial[color=gray] svg circle{stroke:var(--palette-gray-50)}:host.radial svg circle{stroke:var(--color-selection);transform-origin:50% 50%;transform:rotate(-90deg);transition:.35s stroke-dashoffset}:host.radial svg text{fill:#666;font-family:sans-serif;font-size:.5em;text-anchor:middle}@-webkit-keyframes progress-bar-stripes{0%{background-position:0 0}to{background-position:40px 0}}@keyframes progress-bar-stripes{0%{background-position:0 0}to{background-position:40px 0}}\n"] }]
        }], ctorParameters: function () {
        return [{ type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [NOVO_PROGRESS_CONTAINER]
                    }] }];
    }, propDecorators: { appearance: [{
                type: HostBinding,
                args: ['class']
            }], id: [{
                type: Input
            }], name: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], label: [{
                type: Input
            }], theme: [{
                type: Input
            }], color: [{
                type: Input
            }], indeterminate: [{
                type: Input
            }], striped: [{
                type: HostBinding,
                args: ['class.striped']
            }, {
                type: Input
            }], animated: [{
                type: HostBinding,
                args: ['class.animated']
            }, {
                type: Input
            }], width: [{
                type: HostBinding,
                args: ['style.width']
            }], change: [{
                type: Output
            }], blur: [{
                type: Output
            }], focus: [{
                type: Output
            }], value: [{
                type: Input
            }], disabled: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.disabled']
            }] } });

// NG2
class NovoProgressElement {
    constructor() {
        this.total = 100;
        this.radius = 54;
        this.striped = false;
        // Private vars for getters
        this._appearance = ProgressAppearance.LINEAR;
        this._disabled = false;
    }
    get appearance() {
        return this._appearance;
    }
    set appearance(value) {
        if (this._appearance !== value) {
            this._appearance = value;
            this._updateBarAppearance();
        }
    }
    // Disabled State
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = !!value;
    }
    ngAfterContentInit() {
        this._updateBarRadius();
    }
    _updateBarAppearance() {
        if (this._bars) {
            this._bars.forEach((bar) => {
                bar.appearance = this.appearance;
            });
        }
    }
    _updateBarRadius() {
        if (this._bars) {
            this._bars.forEach((bar, i) => {
                bar.radius = this.radius - i * 5;
            });
        }
    }
}
NovoProgressElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoProgressElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoProgressElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoProgressElement, selector: "novo-progress", inputs: { color: "color", theme: "theme", total: "total", radius: "radius", striped: "striped", appearance: "appearance", disabled: "disabled" }, host: { properties: { "class.striped": "this.striped", "class": "this.appearance", "class.disabled": "this.disabled" } }, providers: [
        {
            provide: NOVO_PROGRESS_CONTAINER,
            useExisting: NovoProgressElement,
        },
    ], queries: [{ propertyName: "_bars", predicate: i0.forwardRef(function () { return NovoProgressBarElement; }), descendants: true }], ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, styles: [":host{display:flex;position:relative;border-radius:.2em}:host.striped{background-image:linear-gradient(45deg,rgba(0,0,0,.25) 25%,transparent 25%,transparent 50%,rgba(0,0,0,.25) 50%,rgba(0,0,0,.25) 75%,transparent 75%,transparent);background-size:20px 20px}:host.linear{width:200px;height:1.2em;background-color:var(--color-background);border:1px solid var(--color-border)}:host.radial{width:9.2em;height:9.2em}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoProgressElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-progress', template: ` <ng-content></ng-content> `, providers: [
                        {
                            provide: NOVO_PROGRESS_CONTAINER,
                            useExisting: NovoProgressElement,
                        },
                    ], styles: [":host{display:flex;position:relative;border-radius:.2em}:host.striped{background-image:linear-gradient(45deg,rgba(0,0,0,.25) 25%,transparent 25%,transparent 50%,rgba(0,0,0,.25) 50%,rgba(0,0,0,.25) 75%,transparent 75%,transparent);background-size:20px 20px}:host.linear{width:200px;height:1.2em;background-color:var(--color-background);border:1px solid var(--color-border)}:host.radial{width:9.2em;height:9.2em}\n"] }]
        }], propDecorators: { color: [{
                type: Input
            }], theme: [{
                type: Input
            }], total: [{
                type: Input
            }], radius: [{
                type: Input
            }], striped: [{
                type: HostBinding,
                args: ['class.striped']
            }, {
                type: Input
            }], appearance: [{
                type: HostBinding,
                args: ['class']
            }, {
                type: Input
            }], disabled: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.disabled']
            }], _bars: [{
                type: ContentChildren,
                args: [forwardRef(() => NovoProgressBarElement), { descendants: true }]
            }] } });

// NG2
class NovoProgressModule {
}
NovoProgressModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoProgressModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoProgressModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoProgressModule, declarations: [NovoProgressBarElement, NovoProgressElement], imports: [CommonModule], exports: [NovoProgressBarElement, NovoProgressElement] });
NovoProgressModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoProgressModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoProgressModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [NovoProgressBarElement, NovoProgressElement],
                    exports: [NovoProgressBarElement, NovoProgressElement],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NOVO_PROGRESS_CONTAINER, NovoProgressBarElement, NovoProgressElement, NovoProgressModule, ProgressAppearance };
//# sourceMappingURL=novo-elements-components-progress.mjs.map

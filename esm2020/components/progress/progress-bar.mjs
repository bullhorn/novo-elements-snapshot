// NG2
import { ChangeDetectorRef, Component, EventEmitter, forwardRef, HostBinding, Inject, Input, Optional, Output, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NOVO_PROGRESS_CONTAINER, ProgressAppearance } from './progress-constants';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
// make radio-button-group ids unique
let nextId = 0;
// Value accessor for the component (supports ngModel)
const PROGRESS_BAR_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoProgressBarElement),
    multi: true,
};
export class NovoProgressBarElement {
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
        if (this.indeterminate) {
            this.striped = true;
            this.animated = true;
            this._value = this.progress?.total || 100;
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
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NOVO_PROGRESS_CONTAINER]
                }] }]; }, propDecorators: { appearance: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy9wcm9ncmVzcy9wcm9ncmVzcy1iYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsV0FBVyxFQUNYLE1BQU0sRUFDTixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7OztBQUVuRixxQ0FBcUM7QUFDckMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBRWYsc0RBQXNEO0FBQ3RELE1BQU0sMkJBQTJCLEdBQUc7SUFDbEMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHNCQUFzQixDQUFDO0lBQ3JELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQXVCRixNQUFNLE9BQU8sc0JBQXNCO0lBaUVqQyxZQUFvQixHQUFzQixFQUFzRCxRQUFhO1FBQXpGLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQXNELGFBQVEsR0FBUixRQUFRLENBQUs7UUFoRXJHLGNBQVMsR0FBVyxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsQ0FBQztRQUVqRCxlQUFVLEdBQXVCLGtCQUFrQixDQUFDLE1BQU0sQ0FBQztRQUN6RCxPQUFFLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUM1QixTQUFJLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUM5QixhQUFRLEdBQVcsQ0FBQyxDQUFDO1FBSXJCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FB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QURSLFdBQVc7dUJBQUMsYUFBYTtnQkFRaEIsTUFBTTtzQkFBZixNQUFNO2dCQUNHLElBQUk7c0JBQWIsTUFBTTtnQkFDRyxLQUFLO3NCQUFkLE1BQU07Z0JBTU0sS0FBSztzQkFBakIsS0FBSztnQkFrQkYsUUFBUTtzQkFGWCxLQUFLOztzQkFDTCxXQUFXO3VCQUFDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBIb3N0QmluZGluZyxcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5PVk9fUFJPR1JFU1NfQ09OVEFJTkVSLCBQcm9ncmVzc0FwcGVhcmFuY2UgfSBmcm9tICcuL3Byb2dyZXNzLWNvbnN0YW50cyc7XG5cbi8vIG1ha2UgcmFkaW8tYnV0dG9uLWdyb3VwIGlkcyB1bmlxdWVcbmxldCBuZXh0SWQgPSAwO1xuXG4vLyBWYWx1ZSBhY2Nlc3NvciBmb3IgdGhlIGNvbXBvbmVudCAoc3VwcG9ydHMgbmdNb2RlbClcbmNvbnN0IFBST0dSRVNTX0JBUl9WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdm9Qcm9ncmVzc0JhckVsZW1lbnQpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tcHJvZ3Jlc3MtYmFyJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHJvZ3Jlc3MtYmFyLnNjc3MnXSxcbiAgcHJvdmlkZXJzOiBbUFJPR1JFU1NfQkFSX1ZBTFVFX0FDQ0VTU09SXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2ICpuZ0lmPVwiaXNMaW5lYXIoKVwiIGNsYXNzPVwicHJvZ3Jlc3MtYmFyXCI+PC9kaXY+XG4gICAgPHN2ZyAqbmdJZj1cImlzUmFkaWFsKClcIiB3aWR0aD1cIjEyMFwiIGhlaWdodD1cIjEyMFwiPlxuICAgICAgPGNpcmNsZVxuICAgICAgICBbc3R5bGUuc3Ryb2tlRGFzaGFycmF5XT1cImNpcmN1bWZlcmVuY2VcIlxuICAgICAgICBbc3R5bGUuc3Ryb2tlRGFzaG9mZnNldF09XCJkYXNob2Zmc2V0XCJcbiAgICAgICAgW2F0dHIucl09XCJyYWRpdXNcIlxuICAgICAgICBjeD1cIjYwXCJcbiAgICAgICAgY3k9XCI2MFwiXG4gICAgICAgIHN0cm9rZS13aWR0aD1cIjRcIlxuICAgICAgICBmaWxsPVwidHJhbnNwYXJlbnRcIlxuICAgICAgICBjbGFzcz1cInByb2dyZXNzX192YWx1ZVwiXG4gICAgICAvPlxuICAgICAgPCEtLSA8dGV4dCB4PVwiMThcIiB5PVwiMjAuMzVcIiBjbGFzcz1cInBlcmNlbnRhZ2VcIj4zMCU8L3RleHQ+IC0tPlxuICAgIDwvc3ZnPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvUHJvZ3Jlc3NCYXJFbGVtZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCB7XG4gIHByaXZhdGUgX3VuaXF1ZUlkOiBzdHJpbmcgPSBgbm92by1wcm9ncmVzcy0keysrbmV4dElkfWA7XG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBwdWJsaWMgYXBwZWFyYW5jZTogUHJvZ3Jlc3NBcHBlYXJhbmNlID0gUHJvZ3Jlc3NBcHBlYXJhbmNlLkxJTkVBUjtcbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IHRoaXMuX3VuaXF1ZUlkO1xuICBASW5wdXQoKSBuYW1lOiBzdHJpbmcgPSB0aGlzLl91bmlxdWVJZDtcbiAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlciA9IDA7XG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHRoZW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNvbG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGluZGV0ZXJtaW5hdGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgLy8gUmFkaWFsIFZhbHVlXG4gIHB1YmxpYyByYWRpdXMgPSA1NDtcbiAgcHVibGljIGNpcmN1bWZlcmVuY2UgPSAyICogTWF0aC5QSSAqIHRoaXMucmFkaXVzO1xuICBwdWJsaWMgZGFzaG9mZnNldDogbnVtYmVyO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3RyaXBlZCcpXG4gIEBJbnB1dCgpXG4gIHN0cmlwZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFuaW1hdGVkJylcbiAgQElucHV0KClcbiAgYW5pbWF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoJylcbiAgZ2V0IHdpZHRoKCkge1xuICAgIGlmICh0aGlzLmlzUmFkaWFsKCkpIHtcbiAgICAgIHJldHVybiBgMTAwJWA7XG4gICAgfVxuICAgIHJldHVybiBgJHt0aGlzLl9wZXJjZW50ICogMTAwfSVgO1xuICB9XG5cbiAgQE91dHB1dCgpIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGJsdXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBmb2N1cyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcml2YXRlIF9wZXJjZW50OiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF92YWx1ZTogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoKSBnZXQgdmFsdWUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cbiAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMudmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgaWYgKHRoaXMucHJvZ3Jlc3MpIHtcbiAgICAgICAgdGhpcy5fcGVyY2VudCA9IHRoaXMudmFsdWUgLyB0aGlzLnByb2dyZXNzLnRvdGFsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fcGVyY2VudCA9IHZhbHVlO1xuICAgICAgfVxuICAgICAgdGhpcy5kYXNob2Zmc2V0ID0gdGhpcy5jaXJjdW1mZXJlbmNlICogKDEgLSB0aGlzLl9wZXJjZW50KTtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLl92YWx1ZSk7XG4gICAgfVxuICB9XG4gIC8vIERpc2FibGVkIFN0YXRlXG4gIEBJbnB1dCgpXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZGlzYWJsZWQnKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkIHx8ICh0aGlzLnByb2dyZXNzICE9IG51bGwgJiYgdGhpcy5wcm9ncmVzcy5kaXNhYmxlZCk7XG4gIH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSAhIXZhbHVlO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmLCBAT3B0aW9uYWwoKSBASW5qZWN0KE5PVk9fUFJPR1JFU1NfQ09OVEFJTkVSKSBwdWJsaWMgcHJvZ3Jlc3M6IGFueSkge1xuICAgIC8vIE5vdm9Qcm9ncmVzc0VsZW1lbnRcbiAgICB0aGlzLnByb2dyZXNzID0gcHJvZ3Jlc3M7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5pbmRldGVybWluYXRlKSB7XG4gICAgICB0aGlzLnN0cmlwZWQgPSB0cnVlO1xuICAgICAgdGhpcy5hbmltYXRlZCA9IHRydWU7XG4gICAgICB0aGlzLl92YWx1ZSA9IHRoaXMucHJvZ3Jlc3M/LnRvdGFsIHx8IDEwMDtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvZ3Jlc3MpIHtcbiAgICAgIHRoaXMuX3BlcmNlbnQgPSB0aGlzLl92YWx1ZSAvIHRoaXMucHJvZ3Jlc3MudG90YWw7XG4gICAgICB0aGlzLmFwcGVhcmFuY2UgPSB0aGlzLnByb2dyZXNzLmFwcGVhcmFuY2U7XG4gICAgfVxuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrID0gKF86IGFueSkgPT4ge1xuICAgIC8vIHBsYWNlaG9sZGVyXG4gIH07XG5cbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjayA9ICgpID0+IHtcbiAgICAvLyBwbGFjZWhvbGRlclxuICB9O1xuXG4gIHNldERpc2FibGVkU3RhdGUoZGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gIH1cblxuICBpc0xpbmVhcigpIHtcbiAgICByZXR1cm4gdGhpcy5hcHBlYXJhbmNlID09PSBQcm9ncmVzc0FwcGVhcmFuY2UuTElORUFSO1xuICB9XG5cbiAgaXNSYWRpYWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwZWFyYW5jZSA9PT0gUHJvZ3Jlc3NBcHBlYXJhbmNlLlJBRElBTDtcbiAgfVxufVxuIl19
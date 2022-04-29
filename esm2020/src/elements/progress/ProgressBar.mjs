// NG2
import { ChangeDetectorRef, Component, EventEmitter, forwardRef, HostBinding, Inject, Input, Optional, Output, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// import type { NovoProgressElement } from './Progress';
import { NOVO_PROGRESS_CONTAINER, ProgressAppearance } from './ProgressConstants';
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
NovoProgressBarElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoProgressBarElement, deps: [{ token: i0.ChangeDetectorRef }, { token: NOVO_PROGRESS_CONTAINER, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NovoProgressBarElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: NovoProgressBarElement, selector: "novo-progress-bar", inputs: { id: "id", name: "name", tabindex: "tabindex", label: "label", theme: "theme", color: "color", indeterminate: "indeterminate", striped: "striped", animated: "animated", value: "value", disabled: "disabled" }, outputs: { change: "change", blur: "blur", focus: "focus" }, host: { properties: { "class": "this.appearance", "class.striped": "this.striped", "class.animated": "this.animated", "style.width": "this.width", "class.disabled": "this.disabled" } }, providers: [PROGRESS_BAR_VALUE_ACCESSOR], ngImport: i0, template: `
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
  `, isInline: true, styles: [":host{display:flex;height:100%}:host.linear{background-color:#4a89dc}:host.linear[color=black]{color:#fff;background:#000000}:host.linear[color=white]{color:#3d464d;background:#ffffff}:host.linear[color=gray]{color:#3d464d;background:#9e9e9e}:host.linear[color=grey]{color:#3d464d;background:#9e9e9e}:host.linear[color=offWhite]{color:#3d464d;background:#f7f7f7}:host.linear[color=bright]{color:#3d464d;background:#f7f7f7}:host.linear[color=light]{color:#3d464d;background:#dbdbdb}:host.linear[color=neutral]{color:#fff;background:#4f5361}:host.linear[color=dark]{color:#fff;background:#3d464d}:host.linear[color=orange]{color:#3d464d;background:#ff6900}:host.linear[color=navigation]{color:#fff;background:#202945}:host.linear[color=skyBlue]{color:#fff;background:#009bdf}:host.linear[color=steel]{color:#fff;background:#5b6770}:host.linear[color=metal]{color:#fff;background:#637893}:host.linear[color=sand]{color:#3d464d;background:#f4f4f4}:host.linear[color=silver]{color:#3d464d;background:#e2e2e2}:host.linear[color=stone]{color:#3d464d;background:#bebebe}:host.linear[color=ash]{color:#3d464d;background:#a0a0a0}:host.linear[color=slate]{color:#fff;background:#707070}:host.linear[color=onyx]{color:#fff;background:#526980}:host.linear[color=charcoal]{color:#fff;background:#282828}:host.linear[color=moonlight]{color:#fff;background:#1a242f}:host.linear[color=midnight]{color:#fff;background:#202945}:host.linear[color=darkness]{color:#fff;background:#161f27}:host.linear[color=navy]{color:#fff;background:#0d2d42}:host.linear[color=aqua]{color:#3d464d;background:#3bafda}:host.linear[color=ocean]{color:#fff;background:#4a89dc}:host.linear[color=mint]{color:#3d464d;background:#37bc9b}:host.linear[color=grass]{color:#fff;background:#8cc152}:host.linear[color=sunflower]{color:#fff;background:#f6b042}:host.linear[color=bittersweet]{color:#fff;background:#eb6845}:host.linear[color=grapefruit]{color:#fff;background:#da4453}:host.linear[color=carnation]{color:#fff;background:#d770ad}:host.linear[color=lavender]{color:#fff;background:#967adc}:host.linear[color=mountain]{color:#fff;background:#9678b6}:host.linear[color=info]{color:#fff;background:#4a89dc}:host.linear[color=positive]{color:#fff;background:#4a89dc}:host.linear[color=success]{color:#fff;background:#8cc152}:host.linear[color=negative]{color:#fff;background:#da4453}:host.linear[color=danger]{color:#fff;background:#da4453}:host.linear[color=error]{color:#fff;background:#da4453}:host.linear[color=warning]{color:#fff;background:#f6b042}:host.linear[color=empty]{color:#3d464d;background:#cccdcc}:host.linear[color=disabled]{color:#3d464d;background:#bebebe}:host.linear[color=background]{color:#3d464d;background:#f7f7f7}:host.linear[color=backgroundDark]{color:#3d464d;background:#e2e2e2}:host.linear[color=presentation]{color:#fff;background:#5b6770}:host.linear[color=bullhorn]{color:#3d464d;background:#ff6900}:host.linear[color=pulse]{color:#3d464d;background:#3bafda}:host.linear[color=company]{color:#fff;background:#3399dd}:host.linear[color=candidate]{color:#fff;background:#44bb77}:host.linear[color=lead]{color:#fff;background:#aa6699}:host.linear[color=contact]{color:#fff;background:#ffaa44}:host.linear[color=clientcontact]{color:#fff;background:#ffaa44}:host.linear[color=opportunity]{color:#fff;background:#662255}:host.linear[color=job]{color:#fff;background:#bb5566}:host.linear[color=joborder]{color:#fff;background:#bb5566}:host.linear[color=submission]{color:#3d464d;background:#a9adbb}:host.linear[color=sendout]{color:#fff;background:#747884}:host.linear[color=placement]{color:#fff;background:#0b344f}:host.linear[color=note]{color:#fff;background:#747884}:host.linear[color=contract]{color:#fff;background:#454ea0}:host.linear[color=jobCode]{color:#fff;background:#696d79}:host.linear[color=earnCode]{color:#fff;background:#696d79}:host.linear[color=invoiceStatement]{color:#fff;background:#696d79}:host.linear[color=billableCharge]{color:#fff;background:#696d79}:host.linear[color=payableCharge]{color:#fff;background:#696d79}:host.linear[color=user]{color:#fff;background:#696d79}:host.linear[color=corporateUser]{color:#fff;background:#696d79}:host.linear[color=distributionList]{color:#fff;background:#696d79}:host.linear[color=credential]{color:#fff;background:#696d79}:host.linear[color=person]{color:#fff;background:#696d79}:host.linear:first-child{border-radius:.2em 0 0 .2em}:host.linear:last-child{border-radius:0 .2em .2em 0}:host.linear.striped{background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-size:40px 40px}:host.linear.animated{-webkit-animation:progress-bar-stripes 2s linear infinite;animation:progress-bar-stripes 2s linear infinite}:host.radial{position:absolute}:host.radial[color=black] svg circle{stroke:#000}:host.radial[color=white] svg circle{stroke:#fff}:host.radial[color=gray] svg circle{stroke:#9e9e9e}:host.radial[color=grey] svg circle{stroke:#9e9e9e}:host.radial[color=offWhite] svg circle{stroke:#f7f7f7}:host.radial[color=bright] svg circle{stroke:#f7f7f7}:host.radial[color=light] svg circle{stroke:#dbdbdb}:host.radial[color=neutral] svg circle{stroke:#4f5361}:host.radial[color=dark] svg circle{stroke:#3d464d}:host.radial[color=orange] svg circle{stroke:#ff6900}:host.radial[color=navigation] svg circle{stroke:#202945}:host.radial[color=skyBlue] svg circle{stroke:#009bdf}:host.radial[color=steel] svg circle{stroke:#5b6770}:host.radial[color=metal] svg circle{stroke:#637893}:host.radial[color=sand] svg circle{stroke:#f4f4f4}:host.radial[color=silver] svg circle{stroke:#e2e2e2}:host.radial[color=stone] svg circle{stroke:#bebebe}:host.radial[color=ash] svg circle{stroke:#a0a0a0}:host.radial[color=slate] svg circle{stroke:#707070}:host.radial[color=onyx] svg circle{stroke:#526980}:host.radial[color=charcoal] svg circle{stroke:#282828}:host.radial[color=moonlight] svg circle{stroke:#1a242f}:host.radial[color=midnight] svg circle{stroke:#202945}:host.radial[color=darkness] svg circle{stroke:#161f27}:host.radial[color=navy] svg circle{stroke:#0d2d42}:host.radial[color=aqua] svg circle{stroke:#3bafda}:host.radial[color=ocean] svg circle{stroke:#4a89dc}:host.radial[color=mint] svg circle{stroke:#37bc9b}:host.radial[color=grass] svg circle{stroke:#8cc152}:host.radial[color=sunflower] svg circle{stroke:#f6b042}:host.radial[color=bittersweet] svg circle{stroke:#eb6845}:host.radial[color=grapefruit] svg circle{stroke:#da4453}:host.radial[color=carnation] svg circle{stroke:#d770ad}:host.radial[color=lavender] svg circle{stroke:#967adc}:host.radial[color=mountain] svg circle{stroke:#9678b6}:host.radial[color=info] svg circle{stroke:#4a89dc}:host.radial[color=positive] svg circle{stroke:#4a89dc}:host.radial[color=success] svg circle{stroke:#8cc152}:host.radial[color=negative] svg circle{stroke:#da4453}:host.radial[color=danger] svg circle{stroke:#da4453}:host.radial[color=error] svg circle{stroke:#da4453}:host.radial[color=warning] svg circle{stroke:#f6b042}:host.radial[color=empty] svg circle{stroke:#cccdcc}:host.radial[color=disabled] svg circle{stroke:#bebebe}:host.radial[color=background] svg circle{stroke:#f7f7f7}:host.radial[color=backgroundDark] svg circle{stroke:#e2e2e2}:host.radial[color=presentation] svg circle{stroke:#5b6770}:host.radial[color=bullhorn] svg circle{stroke:#ff6900}:host.radial[color=pulse] svg circle{stroke:#3bafda}:host.radial[color=company] svg circle{stroke:#39d}:host.radial[color=candidate] svg circle{stroke:#4b7}:host.radial[color=lead] svg circle{stroke:#a69}:host.radial[color=contact] svg circle{stroke:#fa4}:host.radial[color=clientcontact] svg circle{stroke:#fa4}:host.radial[color=opportunity] svg circle{stroke:#625}:host.radial[color=job] svg circle{stroke:#b56}:host.radial[color=joborder] svg circle{stroke:#b56}:host.radial[color=submission] svg circle{stroke:#a9adbb}:host.radial[color=sendout] svg circle{stroke:#747884}:host.radial[color=placement] svg circle{stroke:#0b344f}:host.radial[color=note] svg circle{stroke:#747884}:host.radial[color=contract] svg circle{stroke:#454ea0}:host.radial[color=jobCode] svg circle{stroke:#696d79}:host.radial[color=earnCode] svg circle{stroke:#696d79}:host.radial[color=invoiceStatement] svg circle{stroke:#696d79}:host.radial[color=billableCharge] svg circle{stroke:#696d79}:host.radial[color=payableCharge] svg circle{stroke:#696d79}:host.radial[color=user] svg circle{stroke:#696d79}:host.radial[color=corporateUser] svg circle{stroke:#696d79}:host.radial[color=distributionList] svg circle{stroke:#696d79}:host.radial[color=credential] svg circle{stroke:#696d79}:host.radial[color=person] svg circle{stroke:#696d79}:host.radial svg circle{stroke:#4a89dc;transform-origin:50% 50%;transform:rotate(-90deg);transition:.35s stroke-dashoffset}:host.radial svg text{fill:#666;font-family:sans-serif;font-size:.5em;text-anchor:middle}@-webkit-keyframes progress-bar-stripes{0%{background-position:0 0}to{background-position:40px 0}}@keyframes progress-bar-stripes{0%{background-position:0 0}to{background-position:40px 0}}\n"], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoProgressBarElement, decorators: [{
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
  `, styles: [":host{display:flex;height:100%}:host.linear{background-color:#4a89dc}:host.linear[color=black]{color:#fff;background:#000000}:host.linear[color=white]{color:#3d464d;background:#ffffff}:host.linear[color=gray]{color:#3d464d;background:#9e9e9e}:host.linear[color=grey]{color:#3d464d;background:#9e9e9e}:host.linear[color=offWhite]{color:#3d464d;background:#f7f7f7}:host.linear[color=bright]{color:#3d464d;background:#f7f7f7}:host.linear[color=light]{color:#3d464d;background:#dbdbdb}:host.linear[color=neutral]{color:#fff;background:#4f5361}:host.linear[color=dark]{color:#fff;background:#3d464d}:host.linear[color=orange]{color:#3d464d;background:#ff6900}:host.linear[color=navigation]{color:#fff;background:#202945}:host.linear[color=skyBlue]{color:#fff;background:#009bdf}:host.linear[color=steel]{color:#fff;background:#5b6770}:host.linear[color=metal]{color:#fff;background:#637893}:host.linear[color=sand]{color:#3d464d;background:#f4f4f4}:host.linear[color=silver]{color:#3d464d;background:#e2e2e2}:host.linear[color=stone]{color:#3d464d;background:#bebebe}:host.linear[color=ash]{color:#3d464d;background:#a0a0a0}:host.linear[color=slate]{color:#fff;background:#707070}:host.linear[color=onyx]{color:#fff;background:#526980}:host.linear[color=charcoal]{color:#fff;background:#282828}:host.linear[color=moonlight]{color:#fff;background:#1a242f}:host.linear[color=midnight]{color:#fff;background:#202945}:host.linear[color=darkness]{color:#fff;background:#161f27}:host.linear[color=navy]{color:#fff;background:#0d2d42}:host.linear[color=aqua]{color:#3d464d;background:#3bafda}:host.linear[color=ocean]{color:#fff;background:#4a89dc}:host.linear[color=mint]{color:#3d464d;background:#37bc9b}:host.linear[color=grass]{color:#fff;background:#8cc152}:host.linear[color=sunflower]{color:#fff;background:#f6b042}:host.linear[color=bittersweet]{color:#fff;background:#eb6845}:host.linear[color=grapefruit]{color:#fff;background:#da4453}:host.linear[color=carnation]{color:#fff;background:#d770ad}:host.linear[color=lavender]{color:#fff;background:#967adc}:host.linear[color=mountain]{color:#fff;background:#9678b6}:host.linear[color=info]{color:#fff;background:#4a89dc}:host.linear[color=positive]{color:#fff;background:#4a89dc}:host.linear[color=success]{color:#fff;background:#8cc152}:host.linear[color=negative]{color:#fff;background:#da4453}:host.linear[color=danger]{color:#fff;background:#da4453}:host.linear[color=error]{color:#fff;background:#da4453}:host.linear[color=warning]{color:#fff;background:#f6b042}:host.linear[color=empty]{color:#3d464d;background:#cccdcc}:host.linear[color=disabled]{color:#3d464d;background:#bebebe}:host.linear[color=background]{color:#3d464d;background:#f7f7f7}:host.linear[color=backgroundDark]{color:#3d464d;background:#e2e2e2}:host.linear[color=presentation]{color:#fff;background:#5b6770}:host.linear[color=bullhorn]{color:#3d464d;background:#ff6900}:host.linear[color=pulse]{color:#3d464d;background:#3bafda}:host.linear[color=company]{color:#fff;background:#3399dd}:host.linear[color=candidate]{color:#fff;background:#44bb77}:host.linear[color=lead]{color:#fff;background:#aa6699}:host.linear[color=contact]{color:#fff;background:#ffaa44}:host.linear[color=clientcontact]{color:#fff;background:#ffaa44}:host.linear[color=opportunity]{color:#fff;background:#662255}:host.linear[color=job]{color:#fff;background:#bb5566}:host.linear[color=joborder]{color:#fff;background:#bb5566}:host.linear[color=submission]{color:#3d464d;background:#a9adbb}:host.linear[color=sendout]{color:#fff;background:#747884}:host.linear[color=placement]{color:#fff;background:#0b344f}:host.linear[color=note]{color:#fff;background:#747884}:host.linear[color=contract]{color:#fff;background:#454ea0}:host.linear[color=jobCode]{color:#fff;background:#696d79}:host.linear[color=earnCode]{color:#fff;background:#696d79}:host.linear[color=invoiceStatement]{color:#fff;background:#696d79}:host.linear[color=billableCharge]{color:#fff;background:#696d79}:host.linear[color=payableCharge]{color:#fff;background:#696d79}:host.linear[color=user]{color:#fff;background:#696d79}:host.linear[color=corporateUser]{color:#fff;background:#696d79}:host.linear[color=distributionList]{color:#fff;background:#696d79}:host.linear[color=credential]{color:#fff;background:#696d79}:host.linear[color=person]{color:#fff;background:#696d79}:host.linear:first-child{border-radius:.2em 0 0 .2em}:host.linear:last-child{border-radius:0 .2em .2em 0}:host.linear.striped{background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-size:40px 40px}:host.linear.animated{-webkit-animation:progress-bar-stripes 2s linear infinite;animation:progress-bar-stripes 2s linear infinite}:host.radial{position:absolute}:host.radial[color=black] svg circle{stroke:#000}:host.radial[color=white] svg circle{stroke:#fff}:host.radial[color=gray] svg circle{stroke:#9e9e9e}:host.radial[color=grey] svg circle{stroke:#9e9e9e}:host.radial[color=offWhite] svg circle{stroke:#f7f7f7}:host.radial[color=bright] svg circle{stroke:#f7f7f7}:host.radial[color=light] svg circle{stroke:#dbdbdb}:host.radial[color=neutral] svg circle{stroke:#4f5361}:host.radial[color=dark] svg circle{stroke:#3d464d}:host.radial[color=orange] svg circle{stroke:#ff6900}:host.radial[color=navigation] svg circle{stroke:#202945}:host.radial[color=skyBlue] svg circle{stroke:#009bdf}:host.radial[color=steel] svg circle{stroke:#5b6770}:host.radial[color=metal] svg circle{stroke:#637893}:host.radial[color=sand] svg circle{stroke:#f4f4f4}:host.radial[color=silver] svg circle{stroke:#e2e2e2}:host.radial[color=stone] svg circle{stroke:#bebebe}:host.radial[color=ash] svg circle{stroke:#a0a0a0}:host.radial[color=slate] svg circle{stroke:#707070}:host.radial[color=onyx] svg circle{stroke:#526980}:host.radial[color=charcoal] svg circle{stroke:#282828}:host.radial[color=moonlight] svg circle{stroke:#1a242f}:host.radial[color=midnight] svg circle{stroke:#202945}:host.radial[color=darkness] svg circle{stroke:#161f27}:host.radial[color=navy] svg circle{stroke:#0d2d42}:host.radial[color=aqua] svg circle{stroke:#3bafda}:host.radial[color=ocean] svg circle{stroke:#4a89dc}:host.radial[color=mint] svg circle{stroke:#37bc9b}:host.radial[color=grass] svg circle{stroke:#8cc152}:host.radial[color=sunflower] svg circle{stroke:#f6b042}:host.radial[color=bittersweet] svg circle{stroke:#eb6845}:host.radial[color=grapefruit] svg circle{stroke:#da4453}:host.radial[color=carnation] svg circle{stroke:#d770ad}:host.radial[color=lavender] svg circle{stroke:#967adc}:host.radial[color=mountain] svg circle{stroke:#9678b6}:host.radial[color=info] svg circle{stroke:#4a89dc}:host.radial[color=positive] svg circle{stroke:#4a89dc}:host.radial[color=success] svg circle{stroke:#8cc152}:host.radial[color=negative] svg circle{stroke:#da4453}:host.radial[color=danger] svg circle{stroke:#da4453}:host.radial[color=error] svg circle{stroke:#da4453}:host.radial[color=warning] svg circle{stroke:#f6b042}:host.radial[color=empty] svg circle{stroke:#cccdcc}:host.radial[color=disabled] svg circle{stroke:#bebebe}:host.radial[color=background] svg circle{stroke:#f7f7f7}:host.radial[color=backgroundDark] svg circle{stroke:#e2e2e2}:host.radial[color=presentation] svg circle{stroke:#5b6770}:host.radial[color=bullhorn] svg circle{stroke:#ff6900}:host.radial[color=pulse] svg circle{stroke:#3bafda}:host.radial[color=company] svg circle{stroke:#39d}:host.radial[color=candidate] svg circle{stroke:#4b7}:host.radial[color=lead] svg circle{stroke:#a69}:host.radial[color=contact] svg circle{stroke:#fa4}:host.radial[color=clientcontact] svg circle{stroke:#fa4}:host.radial[color=opportunity] svg circle{stroke:#625}:host.radial[color=job] svg circle{stroke:#b56}:host.radial[color=joborder] svg circle{stroke:#b56}:host.radial[color=submission] svg circle{stroke:#a9adbb}:host.radial[color=sendout] svg circle{stroke:#747884}:host.radial[color=placement] svg circle{stroke:#0b344f}:host.radial[color=note] svg circle{stroke:#747884}:host.radial[color=contract] svg circle{stroke:#454ea0}:host.radial[color=jobCode] svg circle{stroke:#696d79}:host.radial[color=earnCode] svg circle{stroke:#696d79}:host.radial[color=invoiceStatement] svg circle{stroke:#696d79}:host.radial[color=billableCharge] svg circle{stroke:#696d79}:host.radial[color=payableCharge] svg circle{stroke:#696d79}:host.radial[color=user] svg circle{stroke:#696d79}:host.radial[color=corporateUser] svg circle{stroke:#696d79}:host.radial[color=distributionList] svg circle{stroke:#696d79}:host.radial[color=credential] svg circle{stroke:#696d79}:host.radial[color=person] svg circle{stroke:#696d79}:host.radial svg circle{stroke:#4a89dc;transform-origin:50% 50%;transform:rotate(-90deg);transition:.35s stroke-dashoffset}:host.radial svg text{fill:#666;font-family:sans-serif;font-size:.5em;text-anchor:middle}@-webkit-keyframes progress-bar-stripes{0%{background-position:0 0}to{background-position:40px 0}}@keyframes progress-bar-stripes{0%{background-position:0 0}to{background-position:40px 0}}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZ3Jlc3NCYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9wcm9ncmVzcy9Qcm9ncmVzc0Jhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUNMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixXQUFXLEVBQ1gsTUFBTSxFQUNOLEtBQUssRUFFTCxRQUFRLEVBQ1IsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSx5REFBeUQ7QUFDekQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGtCQUFrQixFQUFFLE1BQU0scUJBQXFCLENBQUM7OztBQUVsRixxQ0FBcUM7QUFDckMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBRWYsc0RBQXNEO0FBQ3RELE1BQU0sMkJBQTJCLEdBQUc7SUFDbEMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHNCQUFzQixDQUFDO0lBQ3JELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQXVCRixNQUFNLE9BQU8sc0JBQXNCO0lBaUVqQyxZQUFvQixHQUFzQixFQUFzRCxRQUFhO1FBQXpGLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQXNELGFBQVEsR0FBUixRQUFRLENBQUs7UUFoRXJHLGNBQVMsR0FBVyxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsQ0FBQztRQUVqRCxlQUFVLEdBQXVCLGtCQUFrQixDQUFDLE1BQU0sQ0FBQztRQUN6RCxPQUFFLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUM1QixTQUFJLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUM5QixhQUFRLEdBQVcsQ0FBQyxDQUFDO1FBSXJCLGtC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NUIsS0FBSztnQkFJRixLQUFLO3NCQURSLFdBQVc7dUJBQUMsYUFBYTtnQkFRaEIsTUFBTTtzQkFBZixNQUFNO2dCQUNHLElBQUk7c0JBQWIsTUFBTTtnQkFDRyxLQUFLO3NCQUFkLE1BQU07Z0JBTU0sS0FBSztzQkFBakIsS0FBSztnQkFrQkYsUUFBUTtzQkFGWCxLQUFLOztzQkFDTCxXQUFXO3VCQUFDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBIb3N0QmluZGluZyxcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbi8vIGltcG9ydCB0eXBlIHsgTm92b1Byb2dyZXNzRWxlbWVudCB9IGZyb20gJy4vUHJvZ3Jlc3MnO1xuaW1wb3J0IHsgTk9WT19QUk9HUkVTU19DT05UQUlORVIsIFByb2dyZXNzQXBwZWFyYW5jZSB9IGZyb20gJy4vUHJvZ3Jlc3NDb25zdGFudHMnO1xuXG4vLyBtYWtlIHJhZGlvLWJ1dHRvbi1ncm91cCBpZHMgdW5pcXVlXG5sZXQgbmV4dElkID0gMDtcblxuLy8gVmFsdWUgYWNjZXNzb3IgZm9yIHRoZSBjb21wb25lbnQgKHN1cHBvcnRzIG5nTW9kZWwpXG5jb25zdCBQUk9HUkVTU19CQVJfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOb3ZvUHJvZ3Jlc3NCYXJFbGVtZW50KSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXByb2dyZXNzLWJhcicsXG4gIHN0eWxlVXJsczogWycuL1Byb2dyZXNzQmFyLnNjc3MnXSxcbiAgcHJvdmlkZXJzOiBbUFJPR1JFU1NfQkFSX1ZBTFVFX0FDQ0VTU09SXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2ICpuZ0lmPVwiaXNMaW5lYXIoKVwiIGNsYXNzPVwicHJvZ3Jlc3MtYmFyXCI+PC9kaXY+XG4gICAgPHN2ZyAqbmdJZj1cImlzUmFkaWFsKClcIiB3aWR0aD1cIjEyMFwiIGhlaWdodD1cIjEyMFwiPlxuICAgICAgPGNpcmNsZVxuICAgICAgICBbc3R5bGUuc3Ryb2tlRGFzaGFycmF5XT1cImNpcmN1bWZlcmVuY2VcIlxuICAgICAgICBbc3R5bGUuc3Ryb2tlRGFzaG9mZnNldF09XCJkYXNob2Zmc2V0XCJcbiAgICAgICAgW2F0dHIucl09XCJyYWRpdXNcIlxuICAgICAgICBjeD1cIjYwXCJcbiAgICAgICAgY3k9XCI2MFwiXG4gICAgICAgIHN0cm9rZS13aWR0aD1cIjRcIlxuICAgICAgICBmaWxsPVwidHJhbnNwYXJlbnRcIlxuICAgICAgICBjbGFzcz1cInByb2dyZXNzX192YWx1ZVwiXG4gICAgICAvPlxuICAgICAgPCEtLSA8dGV4dCB4PVwiMThcIiB5PVwiMjAuMzVcIiBjbGFzcz1cInBlcmNlbnRhZ2VcIj4zMCU8L3RleHQ+IC0tPlxuICAgIDwvc3ZnPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvUHJvZ3Jlc3NCYXJFbGVtZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCB7XG4gIHByaXZhdGUgX3VuaXF1ZUlkOiBzdHJpbmcgPSBgbm92by1wcm9ncmVzcy0keysrbmV4dElkfWA7XG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBwdWJsaWMgYXBwZWFyYW5jZTogUHJvZ3Jlc3NBcHBlYXJhbmNlID0gUHJvZ3Jlc3NBcHBlYXJhbmNlLkxJTkVBUjtcbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IHRoaXMuX3VuaXF1ZUlkO1xuICBASW5wdXQoKSBuYW1lOiBzdHJpbmcgPSB0aGlzLl91bmlxdWVJZDtcbiAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlciA9IDA7XG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHRoZW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNvbG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGluZGV0ZXJtaW5hdGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgLy8gUmFkaWFsIFZhbHVlXG4gIHB1YmxpYyByYWRpdXMgPSA1NDtcbiAgcHVibGljIGNpcmN1bWZlcmVuY2UgPSAyICogTWF0aC5QSSAqIHRoaXMucmFkaXVzO1xuICBwdWJsaWMgZGFzaG9mZnNldDogbnVtYmVyO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3RyaXBlZCcpXG4gIEBJbnB1dCgpXG4gIHN0cmlwZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFuaW1hdGVkJylcbiAgQElucHV0KClcbiAgYW5pbWF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoJylcbiAgZ2V0IHdpZHRoKCkge1xuICAgIGlmICh0aGlzLmlzUmFkaWFsKCkpIHtcbiAgICAgIHJldHVybiBgMTAwJWA7XG4gICAgfVxuICAgIHJldHVybiBgJHt0aGlzLl9wZXJjZW50ICogMTAwfSVgO1xuICB9XG5cbiAgQE91dHB1dCgpIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGJsdXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBmb2N1cyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcml2YXRlIF9wZXJjZW50OiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF92YWx1ZTogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoKSBnZXQgdmFsdWUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cbiAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMudmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgaWYgKHRoaXMucHJvZ3Jlc3MpIHtcbiAgICAgICAgdGhpcy5fcGVyY2VudCA9IHRoaXMudmFsdWUgLyB0aGlzLnByb2dyZXNzLnRvdGFsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fcGVyY2VudCA9IHZhbHVlO1xuICAgICAgfVxuICAgICAgdGhpcy5kYXNob2Zmc2V0ID0gdGhpcy5jaXJjdW1mZXJlbmNlICogKDEgLSB0aGlzLl9wZXJjZW50KTtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLl92YWx1ZSk7XG4gICAgfVxuICB9XG4gIC8vIERpc2FibGVkIFN0YXRlXG4gIEBJbnB1dCgpXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZGlzYWJsZWQnKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkIHx8ICh0aGlzLnByb2dyZXNzICE9IG51bGwgJiYgdGhpcy5wcm9ncmVzcy5kaXNhYmxlZCk7XG4gIH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSAhIXZhbHVlO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmLCBAT3B0aW9uYWwoKSBASW5qZWN0KE5PVk9fUFJPR1JFU1NfQ09OVEFJTkVSKSBwdWJsaWMgcHJvZ3Jlc3M6IGFueSkge1xuICAgIC8vIE5vdm9Qcm9ncmVzc0VsZW1lbnRcbiAgICB0aGlzLnByb2dyZXNzID0gcHJvZ3Jlc3M7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5pbmRldGVybWluYXRlKSB7XG4gICAgICB0aGlzLnN0cmlwZWQgPSB0cnVlO1xuICAgICAgdGhpcy5hbmltYXRlZCA9IHRydWU7XG4gICAgICB0aGlzLl92YWx1ZSA9IHRoaXMucHJvZ3Jlc3M/LnRvdGFsIHx8IDEwMDtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvZ3Jlc3MpIHtcbiAgICAgIHRoaXMuX3BlcmNlbnQgPSB0aGlzLl92YWx1ZSAvIHRoaXMucHJvZ3Jlc3MudG90YWw7XG4gICAgICB0aGlzLmFwcGVhcmFuY2UgPSB0aGlzLnByb2dyZXNzLmFwcGVhcmFuY2U7XG4gICAgfVxuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrID0gKF86IGFueSkgPT4ge1xuICAgIC8vIHBsYWNlaG9sZGVyXG4gIH07XG5cbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjayA9ICgpID0+IHtcbiAgICAvLyBwbGFjZWhvbGRlclxuICB9O1xuXG4gIHNldERpc2FibGVkU3RhdGUoZGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gIH1cblxuICBpc0xpbmVhcigpIHtcbiAgICByZXR1cm4gdGhpcy5hcHBlYXJhbmNlID09PSBQcm9ncmVzc0FwcGVhcmFuY2UuTElORUFSO1xuICB9XG5cbiAgaXNSYWRpYWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwZWFyYW5jZSA9PT0gUHJvZ3Jlc3NBcHBlYXJhbmNlLlJBRElBTDtcbiAgfVxufVxuIl19
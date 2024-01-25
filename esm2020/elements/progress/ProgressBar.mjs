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
    get width() {
        if (this.appearance === ProgressAppearance.RADIAL) {
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
        this.progressAppearance = ProgressAppearance;
        this.striped = false;
        this.animated = false;
        this.flash = false;
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
    ngOnInit() {
        if (this.indeterminate) {
            this.striped = true;
            this.animated = true;
        }
        if (this.indeterminate || this.flash) {
            this._value = this.progress?.total || 100;
        }
        if (this.flash) {
            this.progress.fitContainer = true;
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
}
NovoProgressBarElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoProgressBarElement, deps: [{ token: i0.ChangeDetectorRef }, { token: NOVO_PROGRESS_CONTAINER, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NovoProgressBarElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: NovoProgressBarElement, selector: "novo-progress-bar", inputs: { id: "id", name: "name", tabindex: "tabindex", label: "label", theme: "theme", color: "color", indeterminate: "indeterminate", striped: "striped", animated: "animated", flash: "flash", value: "value", disabled: "disabled" }, outputs: { change: "change", blur: "blur", focus: "focus" }, host: { properties: { "class": "this.appearance", "class.striped": "this.striped", "class.animated": "this.animated", "class.flash": "this.flash", "style.width": "this.width", "class.disabled": "this.disabled" } }, providers: [PROGRESS_BAR_VALUE_ACCESSOR], ngImport: i0, template: `
    <div *ngIf="appearance === progressAppearance.LINEAR" class="progress-bar"></div>
    <svg *ngIf="appearance === progressAppearance.RADIAL" width="120" height="120">
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
    </svg>
  `, isInline: true, styles: [":host{display:flex;height:100%}:host.linear{background-color:#4a89dc}:host.linear[color=black]{color:#fff;background:#000000}:host.linear[color=white]{color:#3d464d;background:#ffffff}:host.linear[color=gray]{color:#3d464d;background:#9e9e9e}:host.linear[color=grey]{color:#3d464d;background:#9e9e9e}:host.linear[color=offWhite]{color:#3d464d;background:#f7f7f7}:host.linear[color=bright]{color:#3d464d;background:#f7f7f7}:host.linear[color=light]{color:#3d464d;background:#dbdbdb}:host.linear[color=neutral]{color:#fff;background:#4f5361}:host.linear[color=dark]{color:#fff;background:#3d464d}:host.linear[color=orange]{color:#3d464d;background:#ff6900}:host.linear[color=navigation]{color:#fff;background:#202945}:host.linear[color=skyBlue]{color:#fff;background:#009bdf}:host.linear[color=steel]{color:#fff;background:#5b6770}:host.linear[color=metal]{color:#fff;background:#637893}:host.linear[color=sand]{color:#3d464d;background:#f4f4f4}:host.linear[color=silver]{color:#3d464d;background:#e2e2e2}:host.linear[color=stone]{color:#3d464d;background:#bebebe}:host.linear[color=ash]{color:#3d464d;background:#a0a0a0}:host.linear[color=slate]{color:#fff;background:#707070}:host.linear[color=onyx]{color:#fff;background:#526980}:host.linear[color=charcoal]{color:#fff;background:#282828}:host.linear[color=moonlight]{color:#fff;background:#1a242f}:host.linear[color=midnight]{color:#fff;background:#202945}:host.linear[color=darkness]{color:#fff;background:#161f27}:host.linear[color=navy]{color:#fff;background:#0d2d42}:host.linear[color=aqua]{color:#3d464d;background:#3bafda}:host.linear[color=ocean]{color:#fff;background:#4a89dc}:host.linear[color=mint]{color:#3d464d;background:#37bc9b}:host.linear[color=grass]{color:#fff;background:#8cc152}:host.linear[color=sunflower]{color:#fff;background:#f6b042}:host.linear[color=bittersweet]{color:#fff;background:#eb6845}:host.linear[color=grapefruit]{color:#fff;background:#da4453}:host.linear[color=carnation]{color:#fff;background:#d770ad}:host.linear[color=lavender]{color:#fff;background:#967adc}:host.linear[color=mountain]{color:#fff;background:#9678b6}:host.linear[color=info]{color:#fff;background:#4a89dc}:host.linear[color=positive]{color:#fff;background:#4a89dc}:host.linear[color=success]{color:#fff;background:#8cc152}:host.linear[color=negative]{color:#fff;background:#da4453}:host.linear[color=danger]{color:#fff;background:#da4453}:host.linear[color=error]{color:#fff;background:#da4453}:host.linear[color=warning]{color:#fff;background:#f6b042}:host.linear[color=empty]{color:#3d464d;background:#cccdcc}:host.linear[color=disabled]{color:#3d464d;background:#bebebe}:host.linear[color=background]{color:#3d464d;background:#f7f7f7}:host.linear[color=backgroundDark]{color:#3d464d;background:#e2e2e2}:host.linear[color=presentation]{color:#fff;background:#5b6770}:host.linear[color=bullhorn]{color:#3d464d;background:#ff6900}:host.linear[color=pulse]{color:#3d464d;background:#3bafda}:host.linear[color=company]{color:#fff;background:#3399dd}:host.linear[color=candidate]{color:#fff;background:#44bb77}:host.linear[color=lead]{color:#fff;background:#aa6699}:host.linear[color=contact]{color:#fff;background:#ffaa44}:host.linear[color=clientcontact]{color:#fff;background:#ffaa44}:host.linear[color=opportunity]{color:#fff;background:#662255}:host.linear[color=job]{color:#fff;background:#bb5566}:host.linear[color=joborder]{color:#fff;background:#bb5566}:host.linear[color=submission]{color:#3d464d;background:#a9adbb}:host.linear[color=sendout]{color:#fff;background:#747884}:host.linear[color=placement]{color:#fff;background:#0b344f}:host.linear[color=note]{color:#fff;background:#747884}:host.linear[color=contract]{color:#fff;background:#454ea0}:host.linear[color=jobCode]{color:#fff;background:#696d79}:host.linear[color=earnCode]{color:#fff;background:#696d79}:host.linear[color=invoiceStatement]{color:#fff;background:#696d79}:host.linear[color=billableCharge]{color:#fff;background:#696d79}:host.linear[color=payableCharge]{color:#fff;background:#696d79}:host.linear[color=user]{color:#fff;background:#696d79}:host.linear[color=corporateUser]{color:#fff;background:#696d79}:host.linear[color=distributionList]{color:#fff;background:#696d79}:host.linear[color=credential]{color:#fff;background:#696d79}:host.linear[color=person]{color:#fff;background:#696d79}:host.linear:first-child{border-radius:.2em 0 0 .2em}:host.linear:last-child{border-radius:0 .2em .2em 0}:host.linear.striped{background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-size:40px 40px}:host.linear.animated{animation:progress-bar-stripes 2s linear infinite}:host.linear.flash{padding:0 calc(100% + 100px);background-image:linear-gradient(135deg,#e2e2e2 46%,#f4f4f4 48%,#f4f4f4 52%,#e2e2e2 54%);animation:progress-bar-flash 3s linear infinite}:host.radial{position:absolute}:host.radial[color=black] svg circle{stroke:#000}:host.radial[color=white] svg circle{stroke:#fff}:host.radial[color=gray] svg circle{stroke:#9e9e9e}:host.radial[color=grey] svg circle{stroke:#9e9e9e}:host.radial[color=offWhite] svg circle{stroke:#f7f7f7}:host.radial[color=bright] svg circle{stroke:#f7f7f7}:host.radial[color=light] svg circle{stroke:#dbdbdb}:host.radial[color=neutral] svg circle{stroke:#4f5361}:host.radial[color=dark] svg circle{stroke:#3d464d}:host.radial[color=orange] svg circle{stroke:#ff6900}:host.radial[color=navigation] svg circle{stroke:#202945}:host.radial[color=skyBlue] svg circle{stroke:#009bdf}:host.radial[color=steel] svg circle{stroke:#5b6770}:host.radial[color=metal] svg circle{stroke:#637893}:host.radial[color=sand] svg circle{stroke:#f4f4f4}:host.radial[color=silver] svg circle{stroke:#e2e2e2}:host.radial[color=stone] svg circle{stroke:#bebebe}:host.radial[color=ash] svg circle{stroke:#a0a0a0}:host.radial[color=slate] svg circle{stroke:#707070}:host.radial[color=onyx] svg circle{stroke:#526980}:host.radial[color=charcoal] svg circle{stroke:#282828}:host.radial[color=moonlight] svg circle{stroke:#1a242f}:host.radial[color=midnight] svg circle{stroke:#202945}:host.radial[color=darkness] svg circle{stroke:#161f27}:host.radial[color=navy] svg circle{stroke:#0d2d42}:host.radial[color=aqua] svg circle{stroke:#3bafda}:host.radial[color=ocean] svg circle{stroke:#4a89dc}:host.radial[color=mint] svg circle{stroke:#37bc9b}:host.radial[color=grass] svg circle{stroke:#8cc152}:host.radial[color=sunflower] svg circle{stroke:#f6b042}:host.radial[color=bittersweet] svg circle{stroke:#eb6845}:host.radial[color=grapefruit] svg circle{stroke:#da4453}:host.radial[color=carnation] svg circle{stroke:#d770ad}:host.radial[color=lavender] svg circle{stroke:#967adc}:host.radial[color=mountain] svg circle{stroke:#9678b6}:host.radial[color=info] svg circle{stroke:#4a89dc}:host.radial[color=positive] svg circle{stroke:#4a89dc}:host.radial[color=success] svg circle{stroke:#8cc152}:host.radial[color=negative] svg circle{stroke:#da4453}:host.radial[color=danger] svg circle{stroke:#da4453}:host.radial[color=error] svg circle{stroke:#da4453}:host.radial[color=warning] svg circle{stroke:#f6b042}:host.radial[color=empty] svg circle{stroke:#cccdcc}:host.radial[color=disabled] svg circle{stroke:#bebebe}:host.radial[color=background] svg circle{stroke:#f7f7f7}:host.radial[color=backgroundDark] svg circle{stroke:#e2e2e2}:host.radial[color=presentation] svg circle{stroke:#5b6770}:host.radial[color=bullhorn] svg circle{stroke:#ff6900}:host.radial[color=pulse] svg circle{stroke:#3bafda}:host.radial[color=company] svg circle{stroke:#39d}:host.radial[color=candidate] svg circle{stroke:#4b7}:host.radial[color=lead] svg circle{stroke:#a69}:host.radial[color=contact] svg circle{stroke:#fa4}:host.radial[color=clientcontact] svg circle{stroke:#fa4}:host.radial[color=opportunity] svg circle{stroke:#625}:host.radial[color=job] svg circle{stroke:#b56}:host.radial[color=joborder] svg circle{stroke:#b56}:host.radial[color=submission] svg circle{stroke:#a9adbb}:host.radial[color=sendout] svg circle{stroke:#747884}:host.radial[color=placement] svg circle{stroke:#0b344f}:host.radial[color=note] svg circle{stroke:#747884}:host.radial[color=contract] svg circle{stroke:#454ea0}:host.radial[color=jobCode] svg circle{stroke:#696d79}:host.radial[color=earnCode] svg circle{stroke:#696d79}:host.radial[color=invoiceStatement] svg circle{stroke:#696d79}:host.radial[color=billableCharge] svg circle{stroke:#696d79}:host.radial[color=payableCharge] svg circle{stroke:#696d79}:host.radial[color=user] svg circle{stroke:#696d79}:host.radial[color=corporateUser] svg circle{stroke:#696d79}:host.radial[color=distributionList] svg circle{stroke:#696d79}:host.radial[color=credential] svg circle{stroke:#696d79}:host.radial[color=person] svg circle{stroke:#696d79}:host.radial svg circle{stroke:#4a89dc;transform-origin:50% 50%;transform:rotate(-90deg);transition:.35s stroke-dashoffset}:host.radial svg text{fill:#666;font-family:sans-serif;font-size:.5em;text-anchor:middle}@keyframes progress-bar-stripes{0%{background-position:0 0}to{background-position:40px 0}}@keyframes progress-bar-flash{0%{transform:translate(calc(-50% - 100px))}30%{transform:translate(calc(-50% - 100px))}60%{transform:translate(0)}to{transform:translate(0)}}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoProgressBarElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-progress-bar', providers: [PROGRESS_BAR_VALUE_ACCESSOR], template: `
    <div *ngIf="appearance === progressAppearance.LINEAR" class="progress-bar"></div>
    <svg *ngIf="appearance === progressAppearance.RADIAL" width="120" height="120">
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
    </svg>
  `, styles: [":host{display:flex;height:100%}:host.linear{background-color:#4a89dc}:host.linear[color=black]{color:#fff;background:#000000}:host.linear[color=white]{color:#3d464d;background:#ffffff}:host.linear[color=gray]{color:#3d464d;background:#9e9e9e}:host.linear[color=grey]{color:#3d464d;background:#9e9e9e}:host.linear[color=offWhite]{color:#3d464d;background:#f7f7f7}:host.linear[color=bright]{color:#3d464d;background:#f7f7f7}:host.linear[color=light]{color:#3d464d;background:#dbdbdb}:host.linear[color=neutral]{color:#fff;background:#4f5361}:host.linear[color=dark]{color:#fff;background:#3d464d}:host.linear[color=orange]{color:#3d464d;background:#ff6900}:host.linear[color=navigation]{color:#fff;background:#202945}:host.linear[color=skyBlue]{color:#fff;background:#009bdf}:host.linear[color=steel]{color:#fff;background:#5b6770}:host.linear[color=metal]{color:#fff;background:#637893}:host.linear[color=sand]{color:#3d464d;background:#f4f4f4}:host.linear[color=silver]{color:#3d464d;background:#e2e2e2}:host.linear[color=stone]{color:#3d464d;background:#bebebe}:host.linear[color=ash]{color:#3d464d;background:#a0a0a0}:host.linear[color=slate]{color:#fff;background:#707070}:host.linear[color=onyx]{color:#fff;background:#526980}:host.linear[color=charcoal]{color:#fff;background:#282828}:host.linear[color=moonlight]{color:#fff;background:#1a242f}:host.linear[color=midnight]{color:#fff;background:#202945}:host.linear[color=darkness]{color:#fff;background:#161f27}:host.linear[color=navy]{color:#fff;background:#0d2d42}:host.linear[color=aqua]{color:#3d464d;background:#3bafda}:host.linear[color=ocean]{color:#fff;background:#4a89dc}:host.linear[color=mint]{color:#3d464d;background:#37bc9b}:host.linear[color=grass]{color:#fff;background:#8cc152}:host.linear[color=sunflower]{color:#fff;background:#f6b042}:host.linear[color=bittersweet]{color:#fff;background:#eb6845}:host.linear[color=grapefruit]{color:#fff;background:#da4453}:host.linear[color=carnation]{color:#fff;background:#d770ad}:host.linear[color=lavender]{color:#fff;background:#967adc}:host.linear[color=mountain]{color:#fff;background:#9678b6}:host.linear[color=info]{color:#fff;background:#4a89dc}:host.linear[color=positive]{color:#fff;background:#4a89dc}:host.linear[color=success]{color:#fff;background:#8cc152}:host.linear[color=negative]{color:#fff;background:#da4453}:host.linear[color=danger]{color:#fff;background:#da4453}:host.linear[color=error]{color:#fff;background:#da4453}:host.linear[color=warning]{color:#fff;background:#f6b042}:host.linear[color=empty]{color:#3d464d;background:#cccdcc}:host.linear[color=disabled]{color:#3d464d;background:#bebebe}:host.linear[color=background]{color:#3d464d;background:#f7f7f7}:host.linear[color=backgroundDark]{color:#3d464d;background:#e2e2e2}:host.linear[color=presentation]{color:#fff;background:#5b6770}:host.linear[color=bullhorn]{color:#3d464d;background:#ff6900}:host.linear[color=pulse]{color:#3d464d;background:#3bafda}:host.linear[color=company]{color:#fff;background:#3399dd}:host.linear[color=candidate]{color:#fff;background:#44bb77}:host.linear[color=lead]{color:#fff;background:#aa6699}:host.linear[color=contact]{color:#fff;background:#ffaa44}:host.linear[color=clientcontact]{color:#fff;background:#ffaa44}:host.linear[color=opportunity]{color:#fff;background:#662255}:host.linear[color=job]{color:#fff;background:#bb5566}:host.linear[color=joborder]{color:#fff;background:#bb5566}:host.linear[color=submission]{color:#3d464d;background:#a9adbb}:host.linear[color=sendout]{color:#fff;background:#747884}:host.linear[color=placement]{color:#fff;background:#0b344f}:host.linear[color=note]{color:#fff;background:#747884}:host.linear[color=contract]{color:#fff;background:#454ea0}:host.linear[color=jobCode]{color:#fff;background:#696d79}:host.linear[color=earnCode]{color:#fff;background:#696d79}:host.linear[color=invoiceStatement]{color:#fff;background:#696d79}:host.linear[color=billableCharge]{color:#fff;background:#696d79}:host.linear[color=payableCharge]{color:#fff;background:#696d79}:host.linear[color=user]{color:#fff;background:#696d79}:host.linear[color=corporateUser]{color:#fff;background:#696d79}:host.linear[color=distributionList]{color:#fff;background:#696d79}:host.linear[color=credential]{color:#fff;background:#696d79}:host.linear[color=person]{color:#fff;background:#696d79}:host.linear:first-child{border-radius:.2em 0 0 .2em}:host.linear:last-child{border-radius:0 .2em .2em 0}:host.linear.striped{background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-size:40px 40px}:host.linear.animated{animation:progress-bar-stripes 2s linear infinite}:host.linear.flash{padding:0 calc(100% + 100px);background-image:linear-gradient(135deg,#e2e2e2 46%,#f4f4f4 48%,#f4f4f4 52%,#e2e2e2 54%);animation:progress-bar-flash 3s linear infinite}:host.radial{position:absolute}:host.radial[color=black] svg circle{stroke:#000}:host.radial[color=white] svg circle{stroke:#fff}:host.radial[color=gray] svg circle{stroke:#9e9e9e}:host.radial[color=grey] svg circle{stroke:#9e9e9e}:host.radial[color=offWhite] svg circle{stroke:#f7f7f7}:host.radial[color=bright] svg circle{stroke:#f7f7f7}:host.radial[color=light] svg circle{stroke:#dbdbdb}:host.radial[color=neutral] svg circle{stroke:#4f5361}:host.radial[color=dark] svg circle{stroke:#3d464d}:host.radial[color=orange] svg circle{stroke:#ff6900}:host.radial[color=navigation] svg circle{stroke:#202945}:host.radial[color=skyBlue] svg circle{stroke:#009bdf}:host.radial[color=steel] svg circle{stroke:#5b6770}:host.radial[color=metal] svg circle{stroke:#637893}:host.radial[color=sand] svg circle{stroke:#f4f4f4}:host.radial[color=silver] svg circle{stroke:#e2e2e2}:host.radial[color=stone] svg circle{stroke:#bebebe}:host.radial[color=ash] svg circle{stroke:#a0a0a0}:host.radial[color=slate] svg circle{stroke:#707070}:host.radial[color=onyx] svg circle{stroke:#526980}:host.radial[color=charcoal] svg circle{stroke:#282828}:host.radial[color=moonlight] svg circle{stroke:#1a242f}:host.radial[color=midnight] svg circle{stroke:#202945}:host.radial[color=darkness] svg circle{stroke:#161f27}:host.radial[color=navy] svg circle{stroke:#0d2d42}:host.radial[color=aqua] svg circle{stroke:#3bafda}:host.radial[color=ocean] svg circle{stroke:#4a89dc}:host.radial[color=mint] svg circle{stroke:#37bc9b}:host.radial[color=grass] svg circle{stroke:#8cc152}:host.radial[color=sunflower] svg circle{stroke:#f6b042}:host.radial[color=bittersweet] svg circle{stroke:#eb6845}:host.radial[color=grapefruit] svg circle{stroke:#da4453}:host.radial[color=carnation] svg circle{stroke:#d770ad}:host.radial[color=lavender] svg circle{stroke:#967adc}:host.radial[color=mountain] svg circle{stroke:#9678b6}:host.radial[color=info] svg circle{stroke:#4a89dc}:host.radial[color=positive] svg circle{stroke:#4a89dc}:host.radial[color=success] svg circle{stroke:#8cc152}:host.radial[color=negative] svg circle{stroke:#da4453}:host.radial[color=danger] svg circle{stroke:#da4453}:host.radial[color=error] svg circle{stroke:#da4453}:host.radial[color=warning] svg circle{stroke:#f6b042}:host.radial[color=empty] svg circle{stroke:#cccdcc}:host.radial[color=disabled] svg circle{stroke:#bebebe}:host.radial[color=background] svg circle{stroke:#f7f7f7}:host.radial[color=backgroundDark] svg circle{stroke:#e2e2e2}:host.radial[color=presentation] svg circle{stroke:#5b6770}:host.radial[color=bullhorn] svg circle{stroke:#ff6900}:host.radial[color=pulse] svg circle{stroke:#3bafda}:host.radial[color=company] svg circle{stroke:#39d}:host.radial[color=candidate] svg circle{stroke:#4b7}:host.radial[color=lead] svg circle{stroke:#a69}:host.radial[color=contact] svg circle{stroke:#fa4}:host.radial[color=clientcontact] svg circle{stroke:#fa4}:host.radial[color=opportunity] svg circle{stroke:#625}:host.radial[color=job] svg circle{stroke:#b56}:host.radial[color=joborder] svg circle{stroke:#b56}:host.radial[color=submission] svg circle{stroke:#a9adbb}:host.radial[color=sendout] svg circle{stroke:#747884}:host.radial[color=placement] svg circle{stroke:#0b344f}:host.radial[color=note] svg circle{stroke:#747884}:host.radial[color=contract] svg circle{stroke:#454ea0}:host.radial[color=jobCode] svg circle{stroke:#696d79}:host.radial[color=earnCode] svg circle{stroke:#696d79}:host.radial[color=invoiceStatement] svg circle{stroke:#696d79}:host.radial[color=billableCharge] svg circle{stroke:#696d79}:host.radial[color=payableCharge] svg circle{stroke:#696d79}:host.radial[color=user] svg circle{stroke:#696d79}:host.radial[color=corporateUser] svg circle{stroke:#696d79}:host.radial[color=distributionList] svg circle{stroke:#696d79}:host.radial[color=credential] svg circle{stroke:#696d79}:host.radial[color=person] svg circle{stroke:#696d79}:host.radial svg circle{stroke:#4a89dc;transform-origin:50% 50%;transform:rotate(-90deg);transition:.35s stroke-dashoffset}:host.radial svg text{fill:#666;font-family:sans-serif;font-size:.5em;text-anchor:middle}@keyframes progress-bar-stripes{0%{background-position:0 0}to{background-position:40px 0}}@keyframes progress-bar-flash{0%{transform:translate(calc(-50% - 100px))}30%{transform:translate(calc(-50% - 100px))}60%{transform:translate(0)}to{transform:translate(0)}}\n"] }]
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
            }], flash: [{
                type: HostBinding,
                args: ['class.flash']
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZ3Jlc3NCYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9wcm9ncmVzcy9Qcm9ncmVzc0Jhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUNMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixXQUFXLEVBQ1gsTUFBTSxFQUNOLEtBQUssRUFFTCxRQUFRLEVBQ1IsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSx5REFBeUQ7QUFDekQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGtCQUFrQixFQUFFLE1BQU0scUJBQXFCLENBQUM7OztBQUVsRixxQ0FBcUM7QUFDckMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBRWYsc0RBQXNEO0FBQ3RELE1BQU0sMkJBQTJCLEdBQUc7SUFDbEMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHNCQUFzQixDQUFDO0lBQ3JELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQXNCRixNQUFNLE9BQU8sc0JBQXNCO0lBNkJqQyxJQUNJLEtBQUs7UUFDUCxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssa0JBQWtCLENBQUMsTUFBTSxFQUFFO1lBQ2pELE9BQU8sTUFBTSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNuQyxDQUFDO0lBVUQsSUFBYSxLQUFLO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBQ0QsSUFBSSxLQUFLLENBQUMsS0FBSztRQUNiLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLEVB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ZUFBZTs7c0JBQzNCLEtBQUs7Z0JBS04sUUFBUTtzQkFGUCxXQUFXO3VCQUFDLGdCQUFnQjs7c0JBQzVCLEtBQUs7Z0JBS04sS0FBSztzQkFGSixXQUFXO3VCQUFDLGFBQWE7O3NCQUN6QixLQUFLO2dCQUlGLEtBQUs7c0JBRFIsV0FBVzt1QkFBQyxhQUFhO2dCQVFoQixNQUFNO3NCQUFmLE1BQU07Z0JBQ0csSUFBSTtzQkFBYixNQUFNO2dCQUNHLEtBQUs7c0JBQWQsTUFBTTtnQkFNTSxLQUFLO3NCQUFqQixLQUFLO2dCQWtCRixRQUFRO3NCQUZYLEtBQUs7O3NCQUNMLFdBQVc7dUJBQUMsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuLy8gaW1wb3J0IHR5cGUgeyBOb3ZvUHJvZ3Jlc3NFbGVtZW50IH0gZnJvbSAnLi9Qcm9ncmVzcyc7XG5pbXBvcnQgeyBOT1ZPX1BST0dSRVNTX0NPTlRBSU5FUiwgUHJvZ3Jlc3NBcHBlYXJhbmNlIH0gZnJvbSAnLi9Qcm9ncmVzc0NvbnN0YW50cyc7XG5cbi8vIG1ha2UgcmFkaW8tYnV0dG9uLWdyb3VwIGlkcyB1bmlxdWVcbmxldCBuZXh0SWQgPSAwO1xuXG4vLyBWYWx1ZSBhY2Nlc3NvciBmb3IgdGhlIGNvbXBvbmVudCAoc3VwcG9ydHMgbmdNb2RlbClcbmNvbnN0IFBST0dSRVNTX0JBUl9WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdm9Qcm9ncmVzc0JhckVsZW1lbnQpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tcHJvZ3Jlc3MtYmFyJyxcbiAgc3R5bGVVcmxzOiBbJy4vUHJvZ3Jlc3NCYXIuc2NzcyddLFxuICBwcm92aWRlcnM6IFtQUk9HUkVTU19CQVJfVkFMVUVfQUNDRVNTT1JdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgKm5nSWY9XCJhcHBlYXJhbmNlID09PSBwcm9ncmVzc0FwcGVhcmFuY2UuTElORUFSXCIgY2xhc3M9XCJwcm9ncmVzcy1iYXJcIj48L2Rpdj5cbiAgICA8c3ZnICpuZ0lmPVwiYXBwZWFyYW5jZSA9PT0gcHJvZ3Jlc3NBcHBlYXJhbmNlLlJBRElBTFwiIHdpZHRoPVwiMTIwXCIgaGVpZ2h0PVwiMTIwXCI+XG4gICAgICA8Y2lyY2xlXG4gICAgICAgIFtzdHlsZS5zdHJva2VEYXNoYXJyYXldPVwiY2lyY3VtZmVyZW5jZVwiXG4gICAgICAgIFtzdHlsZS5zdHJva2VEYXNob2Zmc2V0XT1cImRhc2hvZmZzZXRcIlxuICAgICAgICBbYXR0ci5yXT1cInJhZGl1c1wiXG4gICAgICAgIGN4PVwiNjBcIlxuICAgICAgICBjeT1cIjYwXCJcbiAgICAgICAgc3Ryb2tlLXdpZHRoPVwiNFwiXG4gICAgICAgIGZpbGw9XCJ0cmFuc3BhcmVudFwiXG4gICAgICAgIGNsYXNzPVwicHJvZ3Jlc3NfX3ZhbHVlXCJcbiAgICAgIC8+XG4gICAgPC9zdmc+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Qcm9ncmVzc0JhckVsZW1lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0IHtcbiAgcHJpdmF0ZSBfdW5pcXVlSWQ6IHN0cmluZyA9IGBub3ZvLXByb2dyZXNzLSR7KytuZXh0SWR9YDtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIHB1YmxpYyBhcHBlYXJhbmNlOiBQcm9ncmVzc0FwcGVhcmFuY2UgPSBQcm9ncmVzc0FwcGVhcmFuY2UuTElORUFSO1xuICBASW5wdXQoKSBpZDogc3RyaW5nID0gdGhpcy5fdW5pcXVlSWQ7XG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZyA9IHRoaXMuX3VuaXF1ZUlkO1xuICBASW5wdXQoKSB0YWJpbmRleDogbnVtYmVyID0gMDtcbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZztcbiAgQElucHV0KCkgdGhlbWU6IHN0cmluZztcbiAgQElucHV0KCkgY29sb3I6IHN0cmluZztcbiAgQElucHV0KCkgaW5kZXRlcm1pbmF0ZTogYm9vbGVhbiA9IGZhbHNlO1xuICAvLyBSYWRpYWwgVmFsdWVcbiAgcHVibGljIHJhZGl1cyA9IDU0O1xuICBwdWJsaWMgY2lyY3VtZmVyZW5jZSA9IDIgKiBNYXRoLlBJICogdGhpcy5yYWRpdXM7XG4gIHB1YmxpYyBkYXNob2Zmc2V0OiBudW1iZXI7XG4gIHB1YmxpYyBwcm9ncmVzc0FwcGVhcmFuY2UgPSBQcm9ncmVzc0FwcGVhcmFuY2U7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zdHJpcGVkJylcbiAgQElucHV0KClcbiAgc3RyaXBlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYW5pbWF0ZWQnKVxuICBASW5wdXQoKVxuICBhbmltYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZmxhc2gnKVxuICBASW5wdXQoKVxuICBmbGFzaDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgnKVxuICBnZXQgd2lkdGgoKSB7XG4gICAgaWYgKHRoaXMuYXBwZWFyYW5jZSA9PT0gUHJvZ3Jlc3NBcHBlYXJhbmNlLlJBRElBTCkge1xuICAgICAgcmV0dXJuIGAxMDAlYDtcbiAgICB9XG4gICAgcmV0dXJuIGAke3RoaXMuX3BlcmNlbnQgKiAxMDB9JWA7XG4gIH1cblxuICBAT3V0cHV0KCkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgYmx1ciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGZvY3VzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgX3BlcmNlbnQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX3ZhbHVlOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIGdldCB2YWx1ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICBpZiAodGhpcy52YWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgICBpZiAodGhpcy5wcm9ncmVzcykge1xuICAgICAgICB0aGlzLl9wZXJjZW50ID0gdGhpcy52YWx1ZSAvIHRoaXMucHJvZ3Jlc3MudG90YWw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9wZXJjZW50ID0gdmFsdWU7XG4gICAgICB9XG4gICAgICB0aGlzLmRhc2hvZmZzZXQgPSB0aGlzLmNpcmN1bWZlcmVuY2UgKiAoMSAtIHRoaXMuX3BlcmNlbnQpO1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMuX3ZhbHVlKTtcbiAgICB9XG4gIH1cbiAgLy8gRGlzYWJsZWQgU3RhdGVcbiAgQElucHV0KClcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5kaXNhYmxlZCcpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQgfHwgKHRoaXMucHJvZ3Jlc3MgIT0gbnVsbCAmJiB0aGlzLnByb2dyZXNzLmRpc2FibGVkKTtcbiAgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9ICEhdmFsdWU7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIEBPcHRpb25hbCgpIEBJbmplY3QoTk9WT19QUk9HUkVTU19DT05UQUlORVIpIHB1YmxpYyBwcm9ncmVzczogYW55KSB7XG4gICAgLy8gTm92b1Byb2dyZXNzRWxlbWVudFxuICAgIHRoaXMucHJvZ3Jlc3MgPSBwcm9ncmVzcztcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmluZGV0ZXJtaW5hdGUpIHtcbiAgICAgIHRoaXMuc3RyaXBlZCA9IHRydWU7XG4gICAgICB0aGlzLmFuaW1hdGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaW5kZXRlcm1pbmF0ZSB8fCB0aGlzLmZsYXNoKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IHRoaXMucHJvZ3Jlc3M/LnRvdGFsIHx8IDEwMDtcbiAgICB9XG4gICAgaWYgKHRoaXMuZmxhc2gpIHtcbiAgICAgIHRoaXMucHJvZ3Jlc3MuZml0Q29udGFpbmVyID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvZ3Jlc3MpIHtcbiAgICAgIHRoaXMuX3BlcmNlbnQgPSB0aGlzLl92YWx1ZSAvIHRoaXMucHJvZ3Jlc3MudG90YWw7XG4gICAgICB0aGlzLmFwcGVhcmFuY2UgPSB0aGlzLnByb2dyZXNzLmFwcGVhcmFuY2U7XG4gICAgfVxuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrID0gKF86IGFueSkgPT4ge1xuICAgIC8vIHBsYWNlaG9sZGVyXG4gIH07XG5cbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjayA9ICgpID0+IHtcbiAgICAvLyBwbGFjZWhvbGRlclxuICB9O1xuXG4gIHNldERpc2FibGVkU3RhdGUoZGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gIH1cbn1cbiJdfQ==
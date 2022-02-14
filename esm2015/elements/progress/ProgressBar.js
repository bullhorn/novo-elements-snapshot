// NG2
import { ChangeDetectorRef, Component, EventEmitter, forwardRef, HostBinding, Inject, Input, Optional, Output, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NovoProgressElement, ProgressAppearance } from './Progress';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function NovoProgressBarElement_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 2);
} }
function NovoProgressBarElement__svg_svg_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 3);
    i0.ɵɵelement(1, "circle", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵstyleProp("stroke-dasharray", ctx_r1.circumference)("stroke-dashoffset", ctx_r1.dashoffset);
    i0.ɵɵattribute("r", ctx_r1.radius);
} }
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
NovoProgressBarElement.ɵfac = function NovoProgressBarElement_Factory(t) { return new (t || NovoProgressBarElement)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(forwardRef(() => NovoProgressElement), 8)); };
NovoProgressBarElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoProgressBarElement, selectors: [["novo-progress-bar"]], hostVars: 10, hostBindings: function NovoProgressBarElement_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassMap(ctx.appearance);
        i0.ɵɵstyleProp("width", ctx.width);
        i0.ɵɵclassProp("striped", ctx.striped)("animated", ctx.animated)("disabled", ctx.disabled);
    } }, inputs: { id: "id", name: "name", tabindex: "tabindex", label: "label", theme: "theme", color: "color", indeterminate: "indeterminate", striped: "striped", animated: "animated", value: "value", disabled: "disabled" }, outputs: { change: "change", blur: "blur", focus: "focus" }, features: [i0.ɵɵProvidersFeature([PROGRESS_BAR_VALUE_ACCESSOR])], decls: 2, vars: 2, consts: [["class", "progress-bar", 4, "ngIf"], ["width", "120", "height", "120", 4, "ngIf"], [1, "progress-bar"], ["width", "120", "height", "120"], ["cx", "60", "cy", "60", "stroke-width", "4", "fill", "transparent", 1, "progress__value"]], template: function NovoProgressBarElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, NovoProgressBarElement_div_0_Template, 1, 0, "div", 0);
        i0.ɵɵtemplate(1, NovoProgressBarElement__svg_svg_1_Template, 2, 5, "svg", 1);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.isLinear());
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isRadial());
    } }, directives: [i1.NgIf], styles: ["@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}[_nghost-%COMP%]{display:flex;height:100%}.linear[_nghost-%COMP%]{background-color:#4a89dc}.linear[_nghost-%COMP%]:first-child{border-radius:.2em 0 0 .2em}.linear[_nghost-%COMP%]:last-child{border-radius:0 .2em .2em 0}.linear.striped[_nghost-%COMP%]{background-image:linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent);background-size:40px 40px}.linear.animated[_nghost-%COMP%]{-webkit-animation:progress-bar-stripes 2s linear infinite;animation:progress-bar-stripes 2s linear infinite}.linear[color=company][_nghost-%COMP%]{background-color:#39d}.linear[color=candidate][_nghost-%COMP%]{background-color:#4b7}.linear[color=navigation][_nghost-%COMP%]{background-color:#2f384f}.linear[color=lead][_nghost-%COMP%]{background-color:#a69}.linear[color=contact][_nghost-%COMP%]{background-color:#fa4}.linear[color=opportunity][_nghost-%COMP%]{background-color:#625}.linear[color=job][_nghost-%COMP%]{background-color:#b56}.linear[color=jobCode][_nghost-%COMP%]{background-color:#696d79}.linear[color=earnCode][_nghost-%COMP%]{background-color:#696d79}.linear[color=sendout][_nghost-%COMP%]{background-color:#747884}.linear[color=placement][_nghost-%COMP%]{background-color:#0b344f}.linear[color=task][_nghost-%COMP%]{background-color:#4f5361}.linear[color=distributionList][_nghost-%COMP%]{background-color:#4f5361}.linear[color=credential][_nghost-%COMP%]{background-color:#4f5361}.linear[color=user][_nghost-%COMP%]{background-color:#4f5361}.linear[color=corporateuser][_nghost-%COMP%]{background-color:#4f5361}.linear[color=aqua][_nghost-%COMP%]{background-color:#3bafda}.linear[color=ocean][_nghost-%COMP%]{background-color:#4a89dc}.linear[color=mint][_nghost-%COMP%]{background-color:#37bc9b}.linear[color=grass][_nghost-%COMP%]{background-color:#8cc152}.linear[color=sunflower][_nghost-%COMP%]{background-color:#f6b042}.linear[color=bittersweet][_nghost-%COMP%]{background-color:#eb6845}.linear[color=grapefruit][_nghost-%COMP%]{background-color:#da4453}.linear[color=carnation][_nghost-%COMP%]{background-color:#d770ad}.linear[color=lavender][_nghost-%COMP%]{background-color:#967adc}.linear[color=positive][_nghost-%COMP%]{background-color:#4a89dc}.linear[color=success][_nghost-%COMP%]{background-color:#8cc152}.linear[color=negative][_nghost-%COMP%]{background-color:#da4453}.linear[color=warning][_nghost-%COMP%]{background-color:#f6b042}.linear[color=black][_nghost-%COMP%]{background-color:#000}.linear[color=dark][_nghost-%COMP%]{background-color:#3d464d}.linear[color=pulse][_nghost-%COMP%]{background-color:#3bafda}.linear[color=neutral][_nghost-%COMP%]{background-color:#4f5361}.linear[color=navy][_nghost-%COMP%]{background-color:#0d2d42}.linear[color=contract][_nghost-%COMP%]{background-color:#454ea0}.linear[color=mountain][_nghost-%COMP%]{background-color:#9678b6}.linear[color=billableCharge][_nghost-%COMP%]{background-color:#696d79}.linear[color=payableCharge][_nghost-%COMP%]{background-color:#696d79}.linear[color=invoiceStatement][_nghost-%COMP%]{background-color:#696d79}.linear[color=submission][_nghost-%COMP%]{background-color:#a9adbb}.linear[color=note][_nghost-%COMP%]{background-color:#747884}.linear[color=ash][_nghost-%COMP%]{background-color:#a0a0a0}.linear[color=slate][_nghost-%COMP%]{background-color:#707070}.linear[color=charcoal][_nghost-%COMP%]{background-color:#282828}.linear[color=midnight][_nghost-%COMP%]{background-color:#0b0f1a}.linear[color=background][_nghost-%COMP%]{background-color:#f4f4f4}.linear[color=background-dark][_nghost-%COMP%]{background-color:#e2e2e2}.linear[color=white][_nghost-%COMP%]{background-color:#fff}.linear[color=grey][_nghost-%COMP%]{background-color:#999}.linear[color=off-white][_nghost-%COMP%]{background-color:#f4f4f4}.linear[color=light][_nghost-%COMP%]{background-color:#bebebe}.linear[color=empty][_nghost-%COMP%]{background-color:#cccdcc}.linear[color=disabled][_nghost-%COMP%]{background-color:#bebebe}.linear[color=sand][_nghost-%COMP%]{background-color:#f4f4f4}.linear[color=silver][_nghost-%COMP%]{background-color:#e2e2e2}.linear[color=stone][_nghost-%COMP%]{background-color:#bebebe}.radial[_nghost-%COMP%]{position:absolute}.radial[_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#4a89dc;transform:rotate(-90deg);transform-origin:50% 50%;transition:stroke-dashoffset .35s}.radial[_nghost-%COMP%]   svg[_ngcontent-%COMP%]   text[_ngcontent-%COMP%]{fill:#666;font-family:sans-serif;font-size:.5em;text-anchor:middle}.radial[color=company][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#39d}.radial[color=candidate][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#4b7}.radial[color=navigation][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#2f384f}.radial[color=lead][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#a69}.radial[color=contact][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#fa4}.radial[color=opportunity][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#625}.radial[color=job][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#b56}.radial[color=jobCode][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#696d79}.radial[color=earnCode][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#696d79}.radial[color=sendout][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#747884}.radial[color=placement][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#0b344f}.radial[color=task][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#4f5361}.radial[color=distributionList][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#4f5361}.radial[color=credential][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#4f5361}.radial[color=user][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#4f5361}.radial[color=corporateuser][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#4f5361}.radial[color=aqua][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#3bafda}.radial[color=ocean][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#4a89dc}.radial[color=mint][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#37bc9b}.radial[color=grass][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#8cc152}.radial[color=sunflower][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#f6b042}.radial[color=bittersweet][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#eb6845}.radial[color=grapefruit][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#da4453}.radial[color=carnation][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#d770ad}.radial[color=lavender][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#967adc}.radial[color=positive][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#4a89dc}.radial[color=success][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#8cc152}.radial[color=negative][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#da4453}.radial[color=warning][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#f6b042}.radial[color=black][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#000}.radial[color=dark][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#3d464d}.radial[color=pulse][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#3bafda}.radial[color=neutral][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#4f5361}.radial[color=navy][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#0d2d42}.radial[color=contract][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#454ea0}.radial[color=mountain][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#9678b6}.radial[color=billableCharge][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#696d79}.radial[color=payableCharge][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#696d79}.radial[color=invoiceStatement][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#696d79}.radial[color=submission][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#a9adbb}.radial[color=note][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#747884}.radial[color=ash][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#a0a0a0}.radial[color=slate][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#707070}.radial[color=charcoal][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#282828}.radial[color=midnight][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#0b0f1a}.radial[color=background][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#f4f4f4}.radial[color=background-dark][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#e2e2e2}.radial[color=white][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#fff}.radial[color=grey][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#999}.radial[color=off-white][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#f4f4f4}.radial[color=light][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#bebebe}.radial[color=empty][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#cccdcc}.radial[color=disabled][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#bebebe}.radial[color=sand][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#f4f4f4}.radial[color=silver][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#e2e2e2}.radial[color=stone][_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#bebebe}@-webkit-keyframes progress-bar-stripes{0%{background-position:0 0}to{background-position:40px 0}}@keyframes progress-bar-stripes{0%{background-position:0 0}to{background-position:40px 0}}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoProgressBarElement, [{
        type: Component,
        args: [{
                selector: 'novo-progress-bar',
                styleUrls: ['./ProgressBar.scss'],
                providers: [PROGRESS_BAR_VALUE_ACCESSOR],
                template: `
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
  `,
            }]
    }], function () { return [{ type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [forwardRef(() => NovoProgressElement)]
            }] }]; }, { appearance: [{
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
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZ3Jlc3NCYXIuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvcHJvZ3Jlc3MvUHJvZ3Jlc3NCYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsV0FBVyxFQUNYLE1BQU0sRUFDTixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLGtCQUFrQixFQUFFLE1BQU0sWUFBWSxDQUFDOzs7O0lBaUJqRSx5QkFBbUQ7OztJQUNuRCxtQkFDRTtJQURGLDhCQUNFO0lBQUEsNEJBVUE7SUFDRixpQkFBTTs7O0lBVkYsZUFBdUM7SUFBdkMsd0RBQXVDLHdDQUFBO0lBRXZDLGtDQUFpQjs7QUFwQnpCLHFDQUFxQztBQUNyQyxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFFZixzREFBc0Q7QUFDdEQsTUFBTSwyQkFBMkIsR0FBRztJQUNsQyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsc0JBQXNCLENBQUM7SUFDckQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBdUJGLE1BQU0sT0FBTyxzQkFBc0I7SUFpRWpDLFlBQW9CLEdBQXNCLEVBQW9FLFFBQVE7UUFBbEcsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFBb0UsYUFBUSxHQUFSLFFBQVEsQ0FBQTtRQWhFOUcsY0FBUyxHQUFXLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxDQUFDO1FBRWpELGVBQVUsR0FBdUIsa0JBQWtCLENBQUMsTUFBTSxDQUFDO1FBQ3pELE9BQUUsR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzVCLFNBQUksR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzlCLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFJckIsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFDeEMsZUFBZTtRQUNSLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFDWixrQkFBYSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFLakQsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUl6QixhQUFRLEdBQVksS0FBSyxDQUFDO1FBVWhCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzVCLFNBQUksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzFCLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTdCLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFDckIsV0FBTSxHQUFXLENBQUMsQ0FBQztRQUNuQixjQUFTLEdBQVksS0FBSyxDQUFDO1FBd0QzQixxQkFBZ0IsR0FBRyxDQUFDLENBQU0sRUFBRSxFQUFFO1lBQ3BDLGNBQWM7UUFDaEIsQ0FBQyxDQUFDO1FBRU0sc0JBQWlCLEdBQUcsR0FBRyxFQUFFO1lBQy9CLGNBQWM7UUFDaEIsQ0FBQyxDQUFDO1FBbENBLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzNCLENBQUM7SUEzQ0QsSUFDSSxLQUFLO1FBQ1AsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDbkIsT0FBTyxNQUFNLENBQUM7U0FDZjtRQUNELE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ25DLENBQUM7SUFVRCxJQUFhLEtBQUs7UUFDaEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFDRCxJQUFJLEtBQUssQ0FBQyxLQUFLO1FBQ2IsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssRUFBRTtZQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQzthQUNsRDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQzthQUN2QjtZQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNwQztJQUNILENBQUM7SUFDRCxpQkFBaUI7SUFDakIsSUFFSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBYztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQU1ELFFBQVE7O1FBQ04sSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBQSxJQUFJLENBQUMsUUFBUSwwQ0FBRSxLQUFLLEtBQUksR0FBRyxDQUFDO1NBQzNDO1FBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztZQUNsRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO1NBQzVDO0lBQ0gsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFVO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELGdCQUFnQixDQUFDLEVBQU87UUFDdEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsaUJBQWlCLENBQUMsRUFBTztRQUN2QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFVRCxnQkFBZ0IsQ0FBQyxRQUFpQjtRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLFVBQVUsS0FBSyxrQkFBa0IsQ0FBQyxNQUFNLENBQUM7SUFDdkQsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxVQUFVLEtBQUssa0JBQWtCLENBQUMsTUFBTSxDQUFDO0lBQ3ZELENBQUM7OzRGQWhIVSxzQkFBc0IsbUVBaUUrQixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsbUJBQW1CLENBQUM7MkRBakUxRixzQkFBc0I7Ozs7aVVBbEJ0QixDQUFDLDJCQUEyQixDQUFDO1FBRXRDLHVFQUE2QztRQUM3Qyw0RUFDRTs7UUFGRyxxQ0FBa0I7UUFDbEIsZUFBa0I7UUFBbEIscUNBQWtCOztrREFlZCxzQkFBc0I7Y0FyQmxDLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixTQUFTLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztnQkFDakMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7Z0JBQ3hDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7O0dBZVQ7YUFDRjs7c0JBa0U4QyxRQUFROztzQkFBSSxNQUFNO3VCQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQzt3QkE5RDlGLFVBQVU7a0JBRGhCLFdBQVc7bUJBQUMsT0FBTztZQUVYLEVBQUU7a0JBQVYsS0FBSztZQUNHLElBQUk7a0JBQVosS0FBSztZQUNHLFFBQVE7a0JBQWhCLEtBQUs7WUFDRyxLQUFLO2tCQUFiLEtBQUs7WUFDRyxLQUFLO2tCQUFiLEtBQUs7WUFDRyxLQUFLO2tCQUFiLEtBQUs7WUFDRyxhQUFhO2tCQUFyQixLQUFLO1lBUU4sT0FBTztrQkFGTixXQUFXO21CQUFDLGVBQWU7O2tCQUMzQixLQUFLO1lBS04sUUFBUTtrQkFGUCxXQUFXO21CQUFDLGdCQUFnQjs7a0JBQzVCLEtBQUs7WUFJRixLQUFLO2tCQURSLFdBQVc7bUJBQUMsYUFBYTtZQVFoQixNQUFNO2tCQUFmLE1BQU07WUFDRyxJQUFJO2tCQUFiLE1BQU07WUFDRyxLQUFLO2tCQUFkLE1BQU07WUFNTSxLQUFLO2tCQUFqQixLQUFLO1lBa0JGLFFBQVE7a0JBRlgsS0FBSzs7a0JBQ0wsV0FBVzttQkFBQyxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBOb3ZvUHJvZ3Jlc3NFbGVtZW50LCBQcm9ncmVzc0FwcGVhcmFuY2UgfSBmcm9tICcuL1Byb2dyZXNzJztcblxuLy8gbWFrZSByYWRpby1idXR0b24tZ3JvdXAgaWRzIHVuaXF1ZVxubGV0IG5leHRJZCA9IDA7XG5cbi8vIFZhbHVlIGFjY2Vzc29yIGZvciB0aGUgY29tcG9uZW50IChzdXBwb3J0cyBuZ01vZGVsKVxuY29uc3QgUFJPR1JFU1NfQkFSX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm92b1Byb2dyZXNzQmFyRWxlbWVudCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1wcm9ncmVzcy1iYXInLFxuICBzdHlsZVVybHM6IFsnLi9Qcm9ncmVzc0Jhci5zY3NzJ10sXG4gIHByb3ZpZGVyczogW1BST0dSRVNTX0JBUl9WQUxVRV9BQ0NFU1NPUl0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiAqbmdJZj1cImlzTGluZWFyKClcIiBjbGFzcz1cInByb2dyZXNzLWJhclwiPjwvZGl2PlxuICAgIDxzdmcgKm5nSWY9XCJpc1JhZGlhbCgpXCIgd2lkdGg9XCIxMjBcIiBoZWlnaHQ9XCIxMjBcIj5cbiAgICAgIDxjaXJjbGVcbiAgICAgICAgW3N0eWxlLnN0cm9rZURhc2hhcnJheV09XCJjaXJjdW1mZXJlbmNlXCJcbiAgICAgICAgW3N0eWxlLnN0cm9rZURhc2hvZmZzZXRdPVwiZGFzaG9mZnNldFwiXG4gICAgICAgIFthdHRyLnJdPVwicmFkaXVzXCJcbiAgICAgICAgY3g9XCI2MFwiXG4gICAgICAgIGN5PVwiNjBcIlxuICAgICAgICBzdHJva2Utd2lkdGg9XCI0XCJcbiAgICAgICAgZmlsbD1cInRyYW5zcGFyZW50XCJcbiAgICAgICAgY2xhc3M9XCJwcm9ncmVzc19fdmFsdWVcIlxuICAgICAgLz5cbiAgICAgIDwhLS0gPHRleHQgeD1cIjE4XCIgeT1cIjIwLjM1XCIgY2xhc3M9XCJwZXJjZW50YWdlXCI+MzAlPC90ZXh0PiAtLT5cbiAgICA8L3N2Zz5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1Byb2dyZXNzQmFyRWxlbWVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQge1xuICBwcml2YXRlIF91bmlxdWVJZDogc3RyaW5nID0gYG5vdm8tcHJvZ3Jlc3MtJHsrK25leHRJZH1gO1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgcHVibGljIGFwcGVhcmFuY2U6IFByb2dyZXNzQXBwZWFyYW5jZSA9IFByb2dyZXNzQXBwZWFyYW5jZS5MSU5FQVI7XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSB0aGlzLl91bmlxdWVJZDtcbiAgQElucHV0KCkgbmFtZTogc3RyaW5nID0gdGhpcy5fdW5pcXVlSWQ7XG4gIEBJbnB1dCgpIHRhYmluZGV4OiBudW1iZXIgPSAwO1xuICBASW5wdXQoKSBsYWJlbDogc3RyaW5nO1xuICBASW5wdXQoKSB0aGVtZTogc3RyaW5nO1xuICBASW5wdXQoKSBjb2xvcjogc3RyaW5nO1xuICBASW5wdXQoKSBpbmRldGVybWluYXRlOiBib29sZWFuID0gZmFsc2U7XG4gIC8vIFJhZGlhbCBWYWx1ZVxuICBwdWJsaWMgcmFkaXVzID0gNTQ7XG4gIHB1YmxpYyBjaXJjdW1mZXJlbmNlID0gMiAqIE1hdGguUEkgKiB0aGlzLnJhZGl1cztcbiAgcHVibGljIGRhc2hvZmZzZXQ6IG51bWJlcjtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnN0cmlwZWQnKVxuICBASW5wdXQoKVxuICBzdHJpcGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hbmltYXRlZCcpXG4gIEBJbnB1dCgpXG4gIGFuaW1hdGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS53aWR0aCcpXG4gIGdldCB3aWR0aCgpIHtcbiAgICBpZiAodGhpcy5pc1JhZGlhbCgpKSB7XG4gICAgICByZXR1cm4gYDEwMCVgO1xuICAgIH1cbiAgICByZXR1cm4gYCR7dGhpcy5fcGVyY2VudCAqIDEwMH0lYDtcbiAgfVxuXG4gIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBibHVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZm9jdXMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBfcGVyY2VudDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfdmFsdWU6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCkgZ2V0IHZhbHVlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgIGlmICh0aGlzLnZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgIGlmICh0aGlzLnByb2dyZXNzKSB7XG4gICAgICAgIHRoaXMuX3BlcmNlbnQgPSB0aGlzLnZhbHVlIC8gdGhpcy5wcm9ncmVzcy50b3RhbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3BlcmNlbnQgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZGFzaG9mZnNldCA9IHRoaXMuY2lyY3VtZmVyZW5jZSAqICgxIC0gdGhpcy5fcGVyY2VudCk7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5fdmFsdWUpO1xuICAgIH1cbiAgfVxuICAvLyBEaXNhYmxlZCBTdGF0ZVxuICBASW5wdXQoKVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmRpc2FibGVkJylcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZCB8fCAodGhpcy5wcm9ncmVzcyAhPSBudWxsICYmIHRoaXMucHJvZ3Jlc3MuZGlzYWJsZWQpO1xuICB9XG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gISF2YWx1ZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgQE9wdGlvbmFsKCkgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5vdm9Qcm9ncmVzc0VsZW1lbnQpKSBwdWJsaWMgcHJvZ3Jlc3MpIHtcbiAgICB0aGlzLnByb2dyZXNzID0gcHJvZ3Jlc3M7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5pbmRldGVybWluYXRlKSB7XG4gICAgICB0aGlzLnN0cmlwZWQgPSB0cnVlO1xuICAgICAgdGhpcy5hbmltYXRlZCA9IHRydWU7XG4gICAgICB0aGlzLl92YWx1ZSA9IHRoaXMucHJvZ3Jlc3M/LnRvdGFsIHx8IDEwMDtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvZ3Jlc3MpIHtcbiAgICAgIHRoaXMuX3BlcmNlbnQgPSB0aGlzLl92YWx1ZSAvIHRoaXMucHJvZ3Jlc3MudG90YWw7XG4gICAgICB0aGlzLmFwcGVhcmFuY2UgPSB0aGlzLnByb2dyZXNzLmFwcGVhcmFuY2U7XG4gICAgfVxuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrID0gKF86IGFueSkgPT4ge1xuICAgIC8vIHBsYWNlaG9sZGVyXG4gIH07XG5cbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjayA9ICgpID0+IHtcbiAgICAvLyBwbGFjZWhvbGRlclxuICB9O1xuXG4gIHNldERpc2FibGVkU3RhdGUoZGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gIH1cblxuICBpc0xpbmVhcigpIHtcbiAgICByZXR1cm4gdGhpcy5hcHBlYXJhbmNlID09PSBQcm9ncmVzc0FwcGVhcmFuY2UuTElORUFSO1xuICB9XG5cbiAgaXNSYWRpYWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwZWFyYW5jZSA9PT0gUHJvZ3Jlc3NBcHBlYXJhbmNlLlJBRElBTDtcbiAgfVxufVxuIl19
// NG2
import { ChangeDetectorRef, Component, EventEmitter, forwardRef, HostBinding, Inject, Input, Optional, Output, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// import type { NovoProgressElement } from './Progress';
import { NOVO_PROGRESS_CONTAINER, ProgressAppearance } from './ProgressConstants';
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
NovoProgressBarElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-progress-bar',
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
                styles: [":host{display:flex;height:100%}:host.linear{background-color:#4a89dc}:host.linear[color=black]{background:#000;color:#fff}:host.linear[color=white]{background:#fff;color:#3d464d}:host.linear[color=gray],:host.linear[color=grey]{background:#9e9e9e;color:#3d464d}:host.linear[color=bright],:host.linear[color=offWhite]{background:#f7f7f7;color:#3d464d}:host.linear[color=light]{background:#dbdbdb;color:#3d464d}:host.linear[color=neutral]{background:#4f5361;color:#fff}:host.linear[color=dark]{background:#3d464d;color:#fff}:host.linear[color=orange]{background:#ff6900;color:#3d464d}:host.linear[color=navigation]{background:#202945;color:#fff}:host.linear[color=skyBlue]{background:#009bdf;color:#fff}:host.linear[color=steel]{background:#5b6770;color:#fff}:host.linear[color=metal]{background:#637893;color:#fff}:host.linear[color=sand]{background:#f4f4f4;color:#3d464d}:host.linear[color=silver]{background:#e2e2e2;color:#3d464d}:host.linear[color=stone]{background:#bebebe;color:#3d464d}:host.linear[color=ash]{background:#a0a0a0;color:#3d464d}:host.linear[color=slate]{background:#707070;color:#fff}:host.linear[color=onyx]{background:#526980;color:#fff}:host.linear[color=charcoal]{background:#282828;color:#fff}:host.linear[color=moonlight]{background:#1a242f;color:#fff}:host.linear[color=midnight]{background:#202945;color:#fff}:host.linear[color=darkness]{background:#161f27;color:#fff}:host.linear[color=navy]{background:#0d2d42;color:#fff}:host.linear[color=aqua]{background:#3bafda;color:#3d464d}:host.linear[color=ocean]{background:#4a89dc;color:#fff}:host.linear[color=mint]{background:#37bc9b;color:#3d464d}:host.linear[color=grass]{background:#8cc152;color:#fff}:host.linear[color=sunflower]{background:#f6b042;color:#fff}:host.linear[color=bittersweet]{background:#eb6845;color:#fff}:host.linear[color=grapefruit]{background:#da4453;color:#fff}:host.linear[color=carnation]{background:#d770ad;color:#fff}:host.linear[color=lavender]{background:#967adc;color:#fff}:host.linear[color=mountain]{background:#9678b6;color:#fff}:host.linear[color=info],:host.linear[color=positive]{background:#4a89dc;color:#fff}:host.linear[color=success]{background:#8cc152;color:#fff}:host.linear[color=danger],:host.linear[color=error],:host.linear[color=negative]{background:#da4453;color:#fff}:host.linear[color=warning]{background:#f6b042;color:#fff}:host.linear[color=empty]{background:#cccdcc;color:#3d464d}:host.linear[color=disabled]{background:#bebebe;color:#3d464d}:host.linear[color=background]{background:#f7f7f7;color:#3d464d}:host.linear[color=backgroundDark]{background:#e2e2e2;color:#3d464d}:host.linear[color=presentation]{background:#5b6770;color:#fff}:host.linear[color=bullhorn]{background:#ff6900;color:#3d464d}:host.linear[color=pulse]{background:#3bafda;color:#3d464d}:host.linear[color=company]{background:#39d;color:#fff}:host.linear[color=candidate]{background:#4b7;color:#fff}:host.linear[color=lead]{background:#a69;color:#fff}:host.linear[color=contact]{background:#fa4;color:#fff}:host.linear[color=opportunity]{background:#625;color:#fff}:host.linear[color=job]{background:#b56;color:#fff}:host.linear[color=submission]{background:#a9adbb;color:#3d464d}:host.linear[color=sendout]{background:#747884;color:#fff}:host.linear[color=placement]{background:#0b344f;color:#fff}:host.linear[color=note]{background:#747884;color:#fff}:host.linear[color=contract]{background:#454ea0;color:#fff}:host.linear[color=billableCharge],:host.linear[color=corporateUser],:host.linear[color=credential],:host.linear[color=distributionList],:host.linear[color=earnCode],:host.linear[color=invoiceStatement],:host.linear[color=jobCode],:host.linear[color=payableCharge],:host.linear[color=person],:host.linear[color=user]{background:#696d79;color:#fff}:host.linear:first-child{border-radius:.2em 0 0 .2em}:host.linear:last-child{border-radius:0 .2em .2em 0}:host.linear.striped{background-image:linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent);background-size:40px 40px}:host.linear.animated{-webkit-animation:progress-bar-stripes 2s linear infinite;animation:progress-bar-stripes 2s linear infinite}:host.radial{position:absolute}:host.radial[color=black] svg circle{stroke:#000}:host.radial[color=white] svg circle{stroke:#fff}:host.radial[color=gray] svg circle,:host.radial[color=grey] svg circle{stroke:#9e9e9e}:host.radial[color=bright] svg circle,:host.radial[color=offWhite] svg circle{stroke:#f7f7f7}:host.radial[color=light] svg circle{stroke:#dbdbdb}:host.radial[color=neutral] svg circle{stroke:#4f5361}:host.radial[color=dark] svg circle{stroke:#3d464d}:host.radial[color=orange] svg circle{stroke:#ff6900}:host.radial[color=navigation] svg circle{stroke:#202945}:host.radial[color=skyBlue] svg circle{stroke:#009bdf}:host.radial[color=steel] svg circle{stroke:#5b6770}:host.radial[color=metal] svg circle{stroke:#637893}:host.radial[color=sand] svg circle{stroke:#f4f4f4}:host.radial[color=silver] svg circle{stroke:#e2e2e2}:host.radial[color=stone] svg circle{stroke:#bebebe}:host.radial[color=ash] svg circle{stroke:#a0a0a0}:host.radial[color=slate] svg circle{stroke:#707070}:host.radial[color=onyx] svg circle{stroke:#526980}:host.radial[color=charcoal] svg circle{stroke:#282828}:host.radial[color=moonlight] svg circle{stroke:#1a242f}:host.radial[color=midnight] svg circle{stroke:#202945}:host.radial[color=darkness] svg circle{stroke:#161f27}:host.radial[color=navy] svg circle{stroke:#0d2d42}:host.radial[color=aqua] svg circle{stroke:#3bafda}:host.radial[color=ocean] svg circle{stroke:#4a89dc}:host.radial[color=mint] svg circle{stroke:#37bc9b}:host.radial[color=grass] svg circle{stroke:#8cc152}:host.radial[color=sunflower] svg circle{stroke:#f6b042}:host.radial[color=bittersweet] svg circle{stroke:#eb6845}:host.radial[color=grapefruit] svg circle{stroke:#da4453}:host.radial[color=carnation] svg circle{stroke:#d770ad}:host.radial[color=lavender] svg circle{stroke:#967adc}:host.radial[color=mountain] svg circle{stroke:#9678b6}:host.radial[color=info] svg circle,:host.radial[color=positive] svg circle{stroke:#4a89dc}:host.radial[color=success] svg circle{stroke:#8cc152}:host.radial[color=danger] svg circle,:host.radial[color=error] svg circle,:host.radial[color=negative] svg circle{stroke:#da4453}:host.radial[color=warning] svg circle{stroke:#f6b042}:host.radial[color=empty] svg circle{stroke:#cccdcc}:host.radial[color=disabled] svg circle{stroke:#bebebe}:host.radial[color=background] svg circle{stroke:#f7f7f7}:host.radial[color=backgroundDark] svg circle{stroke:#e2e2e2}:host.radial[color=presentation] svg circle{stroke:#5b6770}:host.radial[color=bullhorn] svg circle{stroke:#ff6900}:host.radial[color=pulse] svg circle{stroke:#3bafda}:host.radial[color=company] svg circle{stroke:#39d}:host.radial[color=candidate] svg circle{stroke:#4b7}:host.radial[color=lead] svg circle{stroke:#a69}:host.radial[color=contact] svg circle{stroke:#fa4}:host.radial[color=opportunity] svg circle{stroke:#625}:host.radial[color=job] svg circle{stroke:#b56}:host.radial[color=submission] svg circle{stroke:#a9adbb}:host.radial[color=sendout] svg circle{stroke:#747884}:host.radial[color=placement] svg circle{stroke:#0b344f}:host.radial[color=note] svg circle{stroke:#747884}:host.radial[color=contract] svg circle{stroke:#454ea0}:host.radial[color=billableCharge] svg circle,:host.radial[color=corporateUser] svg circle,:host.radial[color=credential] svg circle,:host.radial[color=distributionList] svg circle,:host.radial[color=earnCode] svg circle,:host.radial[color=invoiceStatement] svg circle,:host.radial[color=jobCode] svg circle,:host.radial[color=payableCharge] svg circle,:host.radial[color=person] svg circle,:host.radial[color=user] svg circle{stroke:#696d79}:host.radial svg circle{stroke:#4a89dc;transform:rotate(-90deg);transform-origin:50% 50%;transition:stroke-dashoffset .35s}:host.radial svg text{fill:#666;font-family:sans-serif;font-size:.5em;text-anchor:middle}@-webkit-keyframes progress-bar-stripes{0%{background-position:0 0}to{background-position:40px 0}}@keyframes progress-bar-stripes{0%{background-position:0 0}to{background-position:40px 0}}"]
            },] }
];
NovoProgressBarElement.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NOVO_PROGRESS_CONTAINER,] }] }
];
NovoProgressBarElement.propDecorators = {
    appearance: [{ type: HostBinding, args: ['class',] }],
    id: [{ type: Input }],
    name: [{ type: Input }],
    tabindex: [{ type: Input }],
    label: [{ type: Input }],
    theme: [{ type: Input }],
    color: [{ type: Input }],
    indeterminate: [{ type: Input }],
    striped: [{ type: HostBinding, args: ['class.striped',] }, { type: Input }],
    animated: [{ type: HostBinding, args: ['class.animated',] }, { type: Input }],
    width: [{ type: HostBinding, args: ['style.width',] }],
    change: [{ type: Output }],
    blur: [{ type: Output }],
    focus: [{ type: Output }],
    value: [{ type: Input }],
    disabled: [{ type: Input }, { type: HostBinding, args: ['class.disabled',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZ3Jlc3NCYXIuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvcHJvZ3Jlc3MvUHJvZ3Jlc3NCYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsV0FBVyxFQUNYLE1BQU0sRUFDTixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUseURBQXlEO0FBQ3pELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRWxGLHFDQUFxQztBQUNyQyxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFFZixzREFBc0Q7QUFDdEQsTUFBTSwyQkFBMkIsR0FBRztJQUNsQyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsc0JBQXNCLENBQUM7SUFDckQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBdUJGLE1BQU0sT0FBTyxzQkFBc0I7SUFpRWpDLFlBQW9CLEdBQXNCLEVBQXNELFFBQWE7UUFBekYsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFBc0QsYUFBUSxHQUFSLFFBQVEsQ0FBSztRQWhFckcsY0FBUyxHQUFXLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxDQUFDO1FBRWpELGVBQVUsR0FBdUIsa0JBQWtCLENBQUMsTUFBTSxDQUFDO1FBQ3pELE9BQUUsR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzVCLFNBQUksR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzlCLGFB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b3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBIb3N0QmluZGluZyxcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbi8vIGltcG9ydCB0eXBlIHsgTm92b1Byb2dyZXNzRWxlbWVudCB9IGZyb20gJy4vUHJvZ3Jlc3MnO1xuaW1wb3J0IHsgTk9WT19QUk9HUkVTU19DT05UQUlORVIsIFByb2dyZXNzQXBwZWFyYW5jZSB9IGZyb20gJy4vUHJvZ3Jlc3NDb25zdGFudHMnO1xuXG4vLyBtYWtlIHJhZGlvLWJ1dHRvbi1ncm91cCBpZHMgdW5pcXVlXG5sZXQgbmV4dElkID0gMDtcblxuLy8gVmFsdWUgYWNjZXNzb3IgZm9yIHRoZSBjb21wb25lbnQgKHN1cHBvcnRzIG5nTW9kZWwpXG5jb25zdCBQUk9HUkVTU19CQVJfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOb3ZvUHJvZ3Jlc3NCYXJFbGVtZW50KSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXByb2dyZXNzLWJhcicsXG4gIHN0eWxlVXJsczogWycuL1Byb2dyZXNzQmFyLnNjc3MnXSxcbiAgcHJvdmlkZXJzOiBbUFJPR1JFU1NfQkFSX1ZBTFVFX0FDQ0VTU09SXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2ICpuZ0lmPVwiaXNMaW5lYXIoKVwiIGNsYXNzPVwicHJvZ3Jlc3MtYmFyXCI+PC9kaXY+XG4gICAgPHN2ZyAqbmdJZj1cImlzUmFkaWFsKClcIiB3aWR0aD1cIjEyMFwiIGhlaWdodD1cIjEyMFwiPlxuICAgICAgPGNpcmNsZVxuICAgICAgICBbc3R5bGUuc3Ryb2tlRGFzaGFycmF5XT1cImNpcmN1bWZlcmVuY2VcIlxuICAgICAgICBbc3R5bGUuc3Ryb2tlRGFzaG9mZnNldF09XCJkYXNob2Zmc2V0XCJcbiAgICAgICAgW2F0dHIucl09XCJyYWRpdXNcIlxuICAgICAgICBjeD1cIjYwXCJcbiAgICAgICAgY3k9XCI2MFwiXG4gICAgICAgIHN0cm9rZS13aWR0aD1cIjRcIlxuICAgICAgICBmaWxsPVwidHJhbnNwYXJlbnRcIlxuICAgICAgICBjbGFzcz1cInByb2dyZXNzX192YWx1ZVwiXG4gICAgICAvPlxuICAgICAgPCEtLSA8dGV4dCB4PVwiMThcIiB5PVwiMjAuMzVcIiBjbGFzcz1cInBlcmNlbnRhZ2VcIj4zMCU8L3RleHQ+IC0tPlxuICAgIDwvc3ZnPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvUHJvZ3Jlc3NCYXJFbGVtZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCB7XG4gIHByaXZhdGUgX3VuaXF1ZUlkOiBzdHJpbmcgPSBgbm92by1wcm9ncmVzcy0keysrbmV4dElkfWA7XG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBwdWJsaWMgYXBwZWFyYW5jZTogUHJvZ3Jlc3NBcHBlYXJhbmNlID0gUHJvZ3Jlc3NBcHBlYXJhbmNlLkxJTkVBUjtcbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IHRoaXMuX3VuaXF1ZUlkO1xuICBASW5wdXQoKSBuYW1lOiBzdHJpbmcgPSB0aGlzLl91bmlxdWVJZDtcbiAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlciA9IDA7XG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHRoZW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNvbG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGluZGV0ZXJtaW5hdGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgLy8gUmFkaWFsIFZhbHVlXG4gIHB1YmxpYyByYWRpdXMgPSA1NDtcbiAgcHVibGljIGNpcmN1bWZlcmVuY2UgPSAyICogTWF0aC5QSSAqIHRoaXMucmFkaXVzO1xuICBwdWJsaWMgZGFzaG9mZnNldDogbnVtYmVyO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3RyaXBlZCcpXG4gIEBJbnB1dCgpXG4gIHN0cmlwZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFuaW1hdGVkJylcbiAgQElucHV0KClcbiAgYW5pbWF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoJylcbiAgZ2V0IHdpZHRoKCkge1xuICAgIGlmICh0aGlzLmlzUmFkaWFsKCkpIHtcbiAgICAgIHJldHVybiBgMTAwJWA7XG4gICAgfVxuICAgIHJldHVybiBgJHt0aGlzLl9wZXJjZW50ICogMTAwfSVgO1xuICB9XG5cbiAgQE91dHB1dCgpIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGJsdXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBmb2N1cyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcml2YXRlIF9wZXJjZW50OiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF92YWx1ZTogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoKSBnZXQgdmFsdWUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cbiAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMudmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgaWYgKHRoaXMucHJvZ3Jlc3MpIHtcbiAgICAgICAgdGhpcy5fcGVyY2VudCA9IHRoaXMudmFsdWUgLyB0aGlzLnByb2dyZXNzLnRvdGFsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fcGVyY2VudCA9IHZhbHVlO1xuICAgICAgfVxuICAgICAgdGhpcy5kYXNob2Zmc2V0ID0gdGhpcy5jaXJjdW1mZXJlbmNlICogKDEgLSB0aGlzLl9wZXJjZW50KTtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLl92YWx1ZSk7XG4gICAgfVxuICB9XG4gIC8vIERpc2FibGVkIFN0YXRlXG4gIEBJbnB1dCgpXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZGlzYWJsZWQnKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkIHx8ICh0aGlzLnByb2dyZXNzICE9IG51bGwgJiYgdGhpcy5wcm9ncmVzcy5kaXNhYmxlZCk7XG4gIH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSAhIXZhbHVlO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmLCBAT3B0aW9uYWwoKSBASW5qZWN0KE5PVk9fUFJPR1JFU1NfQ09OVEFJTkVSKSBwdWJsaWMgcHJvZ3Jlc3M6IGFueSkge1xuICAgIC8vIE5vdm9Qcm9ncmVzc0VsZW1lbnRcbiAgICB0aGlzLnByb2dyZXNzID0gcHJvZ3Jlc3M7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5pbmRldGVybWluYXRlKSB7XG4gICAgICB0aGlzLnN0cmlwZWQgPSB0cnVlO1xuICAgICAgdGhpcy5hbmltYXRlZCA9IHRydWU7XG4gICAgICB0aGlzLl92YWx1ZSA9IHRoaXMucHJvZ3Jlc3M/LnRvdGFsIHx8IDEwMDtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvZ3Jlc3MpIHtcbiAgICAgIHRoaXMuX3BlcmNlbnQgPSB0aGlzLl92YWx1ZSAvIHRoaXMucHJvZ3Jlc3MudG90YWw7XG4gICAgICB0aGlzLmFwcGVhcmFuY2UgPSB0aGlzLnByb2dyZXNzLmFwcGVhcmFuY2U7XG4gICAgfVxuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrID0gKF86IGFueSkgPT4ge1xuICAgIC8vIHBsYWNlaG9sZGVyXG4gIH07XG5cbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjayA9ICgpID0+IHtcbiAgICAvLyBwbGFjZWhvbGRlclxuICB9O1xuXG4gIHNldERpc2FibGVkU3RhdGUoZGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gIH1cblxuICBpc0xpbmVhcigpIHtcbiAgICByZXR1cm4gdGhpcy5hcHBlYXJhbmNlID09PSBQcm9ncmVzc0FwcGVhcmFuY2UuTElORUFSO1xuICB9XG5cbiAgaXNSYWRpYWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwZWFyYW5jZSA9PT0gUHJvZ3Jlc3NBcHBlYXJhbmNlLlJBRElBTDtcbiAgfVxufVxuIl19
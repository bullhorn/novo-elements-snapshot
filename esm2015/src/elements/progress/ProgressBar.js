// NG2
import { ChangeDetectorRef, Component, EventEmitter, forwardRef, HostBinding, Inject, Input, Optional, Output, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
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
                styles: ["@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}:host{display:flex;height:100%}:host.linear{background-color:#4a89dc}:host.linear[color=black]{background:#000;color:#fff}:host.linear[color=white]{background:#fff;color:#000}:host.linear[color=gray],:host.linear[color=grey]{background:#9e9e9e;color:#000}:host.linear[color=bright],:host.linear[color=offWhite]{background:#f7f7f7;color:#000}:host.linear[color=light]{background:#dbdbdb;color:#000}:host.linear[color=neutral]{background:#4f5361;color:#fff}:host.linear[color=dark]{background:#3d464d;color:#fff}:host.linear[color=orange]{background:#ff6900;color:#000}:host.linear[color=navigation]{background:#202b38;color:#fff}:host.linear[color=skyBlue]{background:#009bdf;color:#fff}:host.linear[color=steel]{background:#5b6770;color:#fff}:host.linear[color=metal]{background:#637893;color:#fff}:host.linear[color=sand]{background:#f4f4f4;color:#000}:host.linear[color=silver]{background:#e2e2e2;color:#000}:host.linear[color=stone]{background:#bebebe;color:#000}:host.linear[color=ash]{background:#a0a0a0;color:#000}:host.linear[color=slate]{background:#707070;color:#fff}:host.linear[color=onyx]{background:#526980;color:#fff}:host.linear[color=charcoal]{background:#282828;color:#fff}:host.linear[color=moonlight]{background:#1a242f;color:#fff}:host.linear[color=midnight]{background:#202b38;color:#fff}:host.linear[color=darkness]{background:#161f27;color:#fff}:host.linear[color=navy]{background:#0d2d42;color:#fff}:host.linear[color=aqua]{background:#3bafda;color:#000}:host.linear[color=ocean]{background:#4a89dc;color:#fff}:host.linear[color=mint]{background:#37bc9b;color:#000}:host.linear[color=grass]{background:#8cc152;color:#000}:host.linear[color=sunflower]{background:#f6b042;color:#000}:host.linear[color=bittersweet]{background:#eb6845;color:#fff}:host.linear[color=grapefruit]{background:#da4453;color:#fff}:host.linear[color=carnation]{background:#d770ad;color:#fff}:host.linear[color=lavender]{background:#967adc;color:#fff}:host.linear[color=mountain]{background:#9678b6;color:#fff}:host.linear[color=positive]{background:#4a89dc;color:#fff}:host.linear[color=success]{background:#8cc152;color:#000}:host.linear[color=negative]{background:#da4453;color:#fff}:host.linear[color=warning]{background:#f6b042;color:#000}:host.linear[color=empty]{background:#cccdcc;color:#000}:host.linear[color=disabled]{background:#bebebe;color:#000}:host.linear[color=background]{background:#f7f7f7;color:#000}:host.linear[color=backgroundDark]{background:#e2e2e2;color:#000}:host.linear[color=presentation]{background:#5b6770;color:#fff}:host.linear[color=bullhorn]{background:#ff6900;color:#000}:host.linear[color=pulse]{background:#3bafda;color:#000}:host.linear[color=company]{background:#39d;color:#fff}:host.linear[color=candidate]{background:#4b7;color:#000}:host.linear[color=lead]{background:#a69;color:#fff}:host.linear[color=contact]{background:#fa4;color:#000}:host.linear[color=opportunity]{background:#625;color:#fff}:host.linear[color=job]{background:#b56;color:#fff}:host.linear[color=submission]{background:#a9adbb;color:#000}:host.linear[color=sendout]{background:#747884;color:#fff}:host.linear[color=placement]{background:#0b344f;color:#fff}:host.linear[color=note]{background:#747884;color:#fff}:host.linear[color=contract]{background:#454ea0;color:#fff}:host.linear[color=billableCharge],:host.linear[color=corporateUser],:host.linear[color=credential],:host.linear[color=distributionList],:host.linear[color=earnCode],:host.linear[color=invoiceStatement],:host.linear[color=jobCode],:host.linear[color=payableCharge],:host.linear[color=person],:host.linear[color=user]{background:#696d79;color:#fff}:host.linear:first-child{border-radius:.2em 0 0 .2em}:host.linear:last-child{border-radius:0 .2em .2em 0}:host.linear.striped{background-image:linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent);background-size:40px 40px}:host.linear.animated{-webkit-animation:progress-bar-stripes 2s linear infinite;animation:progress-bar-stripes 2s linear infinite}:host.radial{position:absolute}:host.radial[color=black] svg circle{stroke:#000}:host.radial[color=white] svg circle{stroke:#fff}:host.radial[color=gray] svg circle,:host.radial[color=grey] svg circle{stroke:#9e9e9e}:host.radial[color=bright] svg circle,:host.radial[color=offWhite] svg circle{stroke:#f7f7f7}:host.radial[color=light] svg circle{stroke:#dbdbdb}:host.radial[color=neutral] svg circle{stroke:#4f5361}:host.radial[color=dark] svg circle{stroke:#3d464d}:host.radial[color=orange] svg circle{stroke:#ff6900}:host.radial[color=navigation] svg circle{stroke:#202b38}:host.radial[color=skyBlue] svg circle{stroke:#009bdf}:host.radial[color=steel] svg circle{stroke:#5b6770}:host.radial[color=metal] svg circle{stroke:#637893}:host.radial[color=sand] svg circle{stroke:#f4f4f4}:host.radial[color=silver] svg circle{stroke:#e2e2e2}:host.radial[color=stone] svg circle{stroke:#bebebe}:host.radial[color=ash] svg circle{stroke:#a0a0a0}:host.radial[color=slate] svg circle{stroke:#707070}:host.radial[color=onyx] svg circle{stroke:#526980}:host.radial[color=charcoal] svg circle{stroke:#282828}:host.radial[color=moonlight] svg circle{stroke:#1a242f}:host.radial[color=midnight] svg circle{stroke:#202b38}:host.radial[color=darkness] svg circle{stroke:#161f27}:host.radial[color=navy] svg circle{stroke:#0d2d42}:host.radial[color=aqua] svg circle{stroke:#3bafda}:host.radial[color=ocean] svg circle{stroke:#4a89dc}:host.radial[color=mint] svg circle{stroke:#37bc9b}:host.radial[color=grass] svg circle{stroke:#8cc152}:host.radial[color=sunflower] svg circle{stroke:#f6b042}:host.radial[color=bittersweet] svg circle{stroke:#eb6845}:host.radial[color=grapefruit] svg circle{stroke:#da4453}:host.radial[color=carnation] svg circle{stroke:#d770ad}:host.radial[color=lavender] svg circle{stroke:#967adc}:host.radial[color=mountain] svg circle{stroke:#9678b6}:host.radial[color=positive] svg circle{stroke:#4a89dc}:host.radial[color=success] svg circle{stroke:#8cc152}:host.radial[color=negative] svg circle{stroke:#da4453}:host.radial[color=warning] svg circle{stroke:#f6b042}:host.radial[color=empty] svg circle{stroke:#cccdcc}:host.radial[color=disabled] svg circle{stroke:#bebebe}:host.radial[color=background] svg circle{stroke:#f7f7f7}:host.radial[color=backgroundDark] svg circle{stroke:#e2e2e2}:host.radial[color=presentation] svg circle{stroke:#5b6770}:host.radial[color=bullhorn] svg circle{stroke:#ff6900}:host.radial[color=pulse] svg circle{stroke:#3bafda}:host.radial[color=company] svg circle{stroke:#39d}:host.radial[color=candidate] svg circle{stroke:#4b7}:host.radial[color=lead] svg circle{stroke:#a69}:host.radial[color=contact] svg circle{stroke:#fa4}:host.radial[color=opportunity] svg circle{stroke:#625}:host.radial[color=job] svg circle{stroke:#b56}:host.radial[color=submission] svg circle{stroke:#a9adbb}:host.radial[color=sendout] svg circle{stroke:#747884}:host.radial[color=placement] svg circle{stroke:#0b344f}:host.radial[color=note] svg circle{stroke:#747884}:host.radial[color=contract] svg circle{stroke:#454ea0}:host.radial[color=billableCharge] svg circle,:host.radial[color=corporateUser] svg circle,:host.radial[color=credential] svg circle,:host.radial[color=distributionList] svg circle,:host.radial[color=earnCode] svg circle,:host.radial[color=invoiceStatement] svg circle,:host.radial[color=jobCode] svg circle,:host.radial[color=payableCharge] svg circle,:host.radial[color=person] svg circle,:host.radial[color=user] svg circle{stroke:#696d79}:host.radial svg circle{stroke:#4a89dc;transform:rotate(-90deg);transform-origin:50% 50%;transition:stroke-dashoffset .35s}:host.radial svg text{fill:#666;font-family:sans-serif;font-size:.5em;text-anchor:middle}@-webkit-keyframes progress-bar-stripes{0%{background-position:0 0}to{background-position:40px 0}}@keyframes progress-bar-stripes{0%{background-position:0 0}to{background-position:40px 0}}"]
            },] }
];
NovoProgressBarElement.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NovoProgressElement, decorators: [{ type: Optional }, { type: Inject, args: [NOVO_PROGRESS_CONTAINER,] }] }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZ3Jlc3NCYXIuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvcHJvZ3Jlc3MvUHJvZ3Jlc3NCYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsV0FBVyxFQUNYLE1BQU0sRUFDTixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGtCQUFrQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFbEYscUNBQXFDO0FBQ3JDLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQUVmLHNEQUFzRDtBQUN0RCxNQUFNLDJCQUEyQixHQUFHO0lBQ2xDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztJQUNyRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUF1QkYsTUFBTSxPQUFPLHNCQUFzQjtJQWlFakMsWUFBb0IsR0FBc0IsRUFBc0QsUUFBNkI7UUFBekcsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFBc0QsYUFBUSxHQUFSLFFBQVEsQ0FBcUI7UUFoRXJILGNBQVMsR0FBVyxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsQ0FBQztRQUVqRCxlQUFVLEdBQXVCLGtCQUFrQixDQUFDLE1BQU0sQ0FBQztRQUN6RCxPQUFFLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUM1QixTQUFJLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUM5QixhQUFRLEdBQVcsQ0FB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Z2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHR5cGUgeyBOb3ZvUHJvZ3Jlc3NFbGVtZW50IH0gZnJvbSAnLi9Qcm9ncmVzcyc7XG5pbXBvcnQgeyBOT1ZPX1BST0dSRVNTX0NPTlRBSU5FUiwgUHJvZ3Jlc3NBcHBlYXJhbmNlIH0gZnJvbSAnLi9Qcm9ncmVzc0NvbnN0YW50cyc7XG5cbi8vIG1ha2UgcmFkaW8tYnV0dG9uLWdyb3VwIGlkcyB1bmlxdWVcbmxldCBuZXh0SWQgPSAwO1xuXG4vLyBWYWx1ZSBhY2Nlc3NvciBmb3IgdGhlIGNvbXBvbmVudCAoc3VwcG9ydHMgbmdNb2RlbClcbmNvbnN0IFBST0dSRVNTX0JBUl9WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdm9Qcm9ncmVzc0JhckVsZW1lbnQpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tcHJvZ3Jlc3MtYmFyJyxcbiAgc3R5bGVVcmxzOiBbJy4vUHJvZ3Jlc3NCYXIuc2NzcyddLFxuICBwcm92aWRlcnM6IFtQUk9HUkVTU19CQVJfVkFMVUVfQUNDRVNTT1JdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgKm5nSWY9XCJpc0xpbmVhcigpXCIgY2xhc3M9XCJwcm9ncmVzcy1iYXJcIj48L2Rpdj5cbiAgICA8c3ZnICpuZ0lmPVwiaXNSYWRpYWwoKVwiIHdpZHRoPVwiMTIwXCIgaGVpZ2h0PVwiMTIwXCI+XG4gICAgICA8Y2lyY2xlXG4gICAgICAgIFtzdHlsZS5zdHJva2VEYXNoYXJyYXldPVwiY2lyY3VtZmVyZW5jZVwiXG4gICAgICAgIFtzdHlsZS5zdHJva2VEYXNob2Zmc2V0XT1cImRhc2hvZmZzZXRcIlxuICAgICAgICBbYXR0ci5yXT1cInJhZGl1c1wiXG4gICAgICAgIGN4PVwiNjBcIlxuICAgICAgICBjeT1cIjYwXCJcbiAgICAgICAgc3Ryb2tlLXdpZHRoPVwiNFwiXG4gICAgICAgIGZpbGw9XCJ0cmFuc3BhcmVudFwiXG4gICAgICAgIGNsYXNzPVwicHJvZ3Jlc3NfX3ZhbHVlXCJcbiAgICAgIC8+XG4gICAgICA8IS0tIDx0ZXh0IHg9XCIxOFwiIHk9XCIyMC4zNVwiIGNsYXNzPVwicGVyY2VudGFnZVwiPjMwJTwvdGV4dD4gLS0+XG4gICAgPC9zdmc+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Qcm9ncmVzc0JhckVsZW1lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0IHtcbiAgcHJpdmF0ZSBfdW5pcXVlSWQ6IHN0cmluZyA9IGBub3ZvLXByb2dyZXNzLSR7KytuZXh0SWR9YDtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIHB1YmxpYyBhcHBlYXJhbmNlOiBQcm9ncmVzc0FwcGVhcmFuY2UgPSBQcm9ncmVzc0FwcGVhcmFuY2UuTElORUFSO1xuICBASW5wdXQoKSBpZDogc3RyaW5nID0gdGhpcy5fdW5pcXVlSWQ7XG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZyA9IHRoaXMuX3VuaXF1ZUlkO1xuICBASW5wdXQoKSB0YWJpbmRleDogbnVtYmVyID0gMDtcbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZztcbiAgQElucHV0KCkgdGhlbWU6IHN0cmluZztcbiAgQElucHV0KCkgY29sb3I6IHN0cmluZztcbiAgQElucHV0KCkgaW5kZXRlcm1pbmF0ZTogYm9vbGVhbiA9IGZhbHNlO1xuICAvLyBSYWRpYWwgVmFsdWVcbiAgcHVibGljIHJhZGl1cyA9IDU0O1xuICBwdWJsaWMgY2lyY3VtZmVyZW5jZSA9IDIgKiBNYXRoLlBJICogdGhpcy5yYWRpdXM7XG4gIHB1YmxpYyBkYXNob2Zmc2V0OiBudW1iZXI7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zdHJpcGVkJylcbiAgQElucHV0KClcbiAgc3RyaXBlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYW5pbWF0ZWQnKVxuICBASW5wdXQoKVxuICBhbmltYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgnKVxuICBnZXQgd2lkdGgoKSB7XG4gICAgaWYgKHRoaXMuaXNSYWRpYWwoKSkge1xuICAgICAgcmV0dXJuIGAxMDAlYDtcbiAgICB9XG4gICAgcmV0dXJuIGAke3RoaXMuX3BlcmNlbnQgKiAxMDB9JWA7XG4gIH1cblxuICBAT3V0cHV0KCkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgYmx1ciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGZvY3VzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgX3BlcmNlbnQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX3ZhbHVlOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIGdldCB2YWx1ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICBpZiAodGhpcy52YWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgICBpZiAodGhpcy5wcm9ncmVzcykge1xuICAgICAgICB0aGlzLl9wZXJjZW50ID0gdGhpcy52YWx1ZSAvIHRoaXMucHJvZ3Jlc3MudG90YWw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9wZXJjZW50ID0gdmFsdWU7XG4gICAgICB9XG4gICAgICB0aGlzLmRhc2hvZmZzZXQgPSB0aGlzLmNpcmN1bWZlcmVuY2UgKiAoMSAtIHRoaXMuX3BlcmNlbnQpO1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMuX3ZhbHVlKTtcbiAgICB9XG4gIH1cbiAgLy8gRGlzYWJsZWQgU3RhdGVcbiAgQElucHV0KClcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5kaXNhYmxlZCcpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQgfHwgKHRoaXMucHJvZ3Jlc3MgIT0gbnVsbCAmJiB0aGlzLnByb2dyZXNzLmRpc2FibGVkKTtcbiAgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9ICEhdmFsdWU7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIEBPcHRpb25hbCgpIEBJbmplY3QoTk9WT19QUk9HUkVTU19DT05UQUlORVIpIHB1YmxpYyBwcm9ncmVzczogTm92b1Byb2dyZXNzRWxlbWVudCkge1xuICAgIHRoaXMucHJvZ3Jlc3MgPSBwcm9ncmVzcztcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmluZGV0ZXJtaW5hdGUpIHtcbiAgICAgIHRoaXMuc3RyaXBlZCA9IHRydWU7XG4gICAgICB0aGlzLmFuaW1hdGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuX3ZhbHVlID0gdGhpcy5wcm9ncmVzcz8udG90YWwgfHwgMTAwO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9ncmVzcykge1xuICAgICAgdGhpcy5fcGVyY2VudCA9IHRoaXMuX3ZhbHVlIC8gdGhpcy5wcm9ncmVzcy50b3RhbDtcbiAgICAgIHRoaXMuYXBwZWFyYW5jZSA9IHRoaXMucHJvZ3Jlc3MuYXBwZWFyYW5jZTtcbiAgICB9XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2sgPSAoXzogYW55KSA9PiB7XG4gICAgLy8gcGxhY2Vob2xkZXJcbiAgfTtcblxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrID0gKCkgPT4ge1xuICAgIC8vIHBsYWNlaG9sZGVyXG4gIH07XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShkaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgfVxuXG4gIGlzTGluZWFyKCkge1xuICAgIHJldHVybiB0aGlzLmFwcGVhcmFuY2UgPT09IFByb2dyZXNzQXBwZWFyYW5jZS5MSU5FQVI7XG4gIH1cblxuICBpc1JhZGlhbCgpIHtcbiAgICByZXR1cm4gdGhpcy5hcHBlYXJhbmNlID09PSBQcm9ncmVzc0FwcGVhcmFuY2UuUkFESUFMO1xuICB9XG59XG4iXX0=
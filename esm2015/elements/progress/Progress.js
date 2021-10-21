// NG2
import { Component, ContentChildren, forwardRef, HostBinding, Input, QueryList } from '@angular/core';
import { NovoProgressBarElement } from './ProgressBar';
import * as i0 from "@angular/core";
const _c0 = ["*"];
export var ProgressAppearance;
(function (ProgressAppearance) {
    ProgressAppearance["LINEAR"] = "linear";
    ProgressAppearance["RADIAL"] = "radial";
})(ProgressAppearance || (ProgressAppearance = {}));
export class NovoProgressElement {
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
NovoProgressElement.ɵfac = function NovoProgressElement_Factory(t) { return new (t || NovoProgressElement)(); };
NovoProgressElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoProgressElement, selectors: [["novo-progress"]], contentQueries: function NovoProgressElement_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        i0.ɵɵcontentQuery(dirIndex, NovoProgressBarElement, true);
    } if (rf & 2) {
        var _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx._bars = _t);
    } }, hostVars: 6, hostBindings: function NovoProgressElement_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassMap(ctx.appearance);
        i0.ɵɵclassProp("striped", ctx.striped)("disabled", ctx.disabled);
    } }, inputs: { color: "color", theme: "theme", total: "total", radius: "radius", striped: "striped", appearance: "appearance", disabled: "disabled" }, ngContentSelectors: _c0, decls: 1, vars: 0, template: function NovoProgressElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵprojection(0);
    } }, styles: ["@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}[_nghost-%COMP%]{border-radius:.2em;display:flex;position:relative}.striped[_nghost-%COMP%]{background-image:linear-gradient(45deg,rgba(0,0,0,.25) 25%,transparent 0,transparent 50%,rgba(0,0,0,.25) 0,rgba(0,0,0,.25) 75%,transparent 0,transparent);background-size:20px 20px}.linear[_nghost-%COMP%]{background-color:#f4f4f4;border:1px solid #cccdcc;height:1.2em;width:200px}.radial[_nghost-%COMP%]{height:9.2em;width:9.2em}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoProgressElement, [{
        type: Component,
        args: [{
                selector: 'novo-progress',
                styleUrls: ['./Progress.scss'],
                template: ` <ng-content></ng-content> `,
            }]
    }], null, { color: [{
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
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZ3Jlc3MuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvcHJvZ3Jlc3MvUHJvZ3Jlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBb0IsU0FBUyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEgsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFFdkQsTUFBTSxDQUFOLElBQVksa0JBR1g7QUFIRCxXQUFZLGtCQUFrQjtJQUM1Qix1Q0FBaUIsQ0FBQTtJQUNqQix1Q0FBaUIsQ0FBQTtBQUNuQixDQUFDLEVBSFcsa0JBQWtCLEtBQWxCLGtCQUFrQixRQUc3QjtBQU9ELE1BQU0sT0FBTyxtQkFBbUI7SUFMaEM7UUFTVyxVQUFLLEdBQVcsR0FBRyxDQUFDO1FBQ3BCLFdBQU0sR0FBVyxFQUFFLENBQUM7UUFJN0IsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUV6QiwyQkFBMkI7UUFDbkIsZ0JBQVcsR0FBdUIsa0JBQWtCLENBQUMsTUFBTSxDQUFDO1FBQzVELGNBQVMsR0FBWSxLQUFLLENBQUM7S0E4Q3BDO0lBNUNDLElBRUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBQ0QsSUFBSSxVQUFVLENBQUMsS0FBa0M7UUFDL0MsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLEtBQUssRUFBRTtZQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQTJCLENBQUM7WUFDL0MsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7U0FDN0I7SUFDSCxDQUFDO0lBRUQsaUJBQWlCO0lBQ2pCLElBRUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBYztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUtELGtCQUFrQjtRQUNoQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRU8sb0JBQW9CO1FBQzFCLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ3pCLEdBQUcsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQWdDLENBQUM7WUFDekQsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFTyxnQkFBZ0I7UUFDdEIsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzVCLEdBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25DLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOztzRkExRFUsbUJBQW1CO3dEQUFuQixtQkFBbUI7b0NBcUNJLHNCQUFzQjs7Ozs7Ozs7O1FBdkM1QyxrQkFBWTs7a0RBRWIsbUJBQW1CO2NBTC9CLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsU0FBUyxFQUFFLENBQUMsaUJBQWlCLENBQUM7Z0JBQzlCLFFBQVEsRUFBRSw2QkFBNkI7YUFDeEM7Z0JBR0MsS0FBSztrQkFESixLQUFLO1lBRUcsS0FBSztrQkFBYixLQUFLO1lBQ0csS0FBSztrQkFBYixLQUFLO1lBQ0csTUFBTTtrQkFBZCxLQUFLO1lBSU4sT0FBTztrQkFGTixXQUFXO21CQUFDLGVBQWU7O2tCQUMzQixLQUFLO1lBU0YsVUFBVTtrQkFGYixXQUFXO21CQUFDLE9BQU87O2tCQUNuQixLQUFLO1lBY0YsUUFBUTtrQkFGWCxLQUFLOztrQkFDTCxXQUFXO21CQUFDLGdCQUFnQjtZQVM3QixLQUFLO2tCQURKLGVBQWU7bUJBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgZm9yd2FyZFJlZiwgSG9zdEJpbmRpbmcsIElucHV0LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9Qcm9ncmVzc0JhckVsZW1lbnQgfSBmcm9tICcuL1Byb2dyZXNzQmFyJztcblxuZXhwb3J0IGVudW0gUHJvZ3Jlc3NBcHBlYXJhbmNlIHtcbiAgTElORUFSID0gJ2xpbmVhcicsXG4gIFJBRElBTCA9ICdyYWRpYWwnLFxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXByb2dyZXNzJyxcbiAgc3R5bGVVcmxzOiBbJy4vUHJvZ3Jlc3Muc2NzcyddLFxuICB0ZW1wbGF0ZTogYCA8bmctY29udGVudD48L25nLWNvbnRlbnQ+IGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Qcm9ncmVzc0VsZW1lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgQElucHV0KClcbiAgY29sb3I6IHN0cmluZztcbiAgQElucHV0KCkgdGhlbWU6IHN0cmluZztcbiAgQElucHV0KCkgdG90YWw6IG51bWJlciA9IDEwMDtcbiAgQElucHV0KCkgcmFkaXVzOiBudW1iZXIgPSA1NDtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnN0cmlwZWQnKVxuICBASW5wdXQoKVxuICBzdHJpcGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLy8gUHJpdmF0ZSB2YXJzIGZvciBnZXR0ZXJzXG4gIHByaXZhdGUgX2FwcGVhcmFuY2U6IFByb2dyZXNzQXBwZWFyYW5jZSA9IFByb2dyZXNzQXBwZWFyYW5jZS5MSU5FQVI7XG4gIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIEBJbnB1dCgpXG4gIGdldCBhcHBlYXJhbmNlKCk6IFByb2dyZXNzQXBwZWFyYW5jZSB8IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2FwcGVhcmFuY2U7XG4gIH1cbiAgc2V0IGFwcGVhcmFuY2UodmFsdWU6IFByb2dyZXNzQXBwZWFyYW5jZSB8IHN0cmluZykge1xuICAgIGlmICh0aGlzLl9hcHBlYXJhbmNlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fYXBwZWFyYW5jZSA9IHZhbHVlIGFzIFByb2dyZXNzQXBwZWFyYW5jZTtcbiAgICAgIHRoaXMuX3VwZGF0ZUJhckFwcGVhcmFuY2UoKTtcbiAgICB9XG4gIH1cblxuICAvLyBEaXNhYmxlZCBTdGF0ZVxuICBASW5wdXQoKVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmRpc2FibGVkJylcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9ICEhdmFsdWU7XG4gIH1cblxuICBAQ29udGVudENoaWxkcmVuKGZvcndhcmRSZWYoKCkgPT4gTm92b1Byb2dyZXNzQmFyRWxlbWVudCksIHsgZGVzY2VuZGFudHM6IHRydWUgfSlcbiAgX2JhcnM6IFF1ZXJ5TGlzdDxOb3ZvUHJvZ3Jlc3NCYXJFbGVtZW50PjtcblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5fdXBkYXRlQmFyUmFkaXVzKCk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVCYXJBcHBlYXJhbmNlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9iYXJzKSB7XG4gICAgICB0aGlzLl9iYXJzLmZvckVhY2goKGJhcikgPT4ge1xuICAgICAgICBiYXIuYXBwZWFyYW5jZSA9IHRoaXMuYXBwZWFyYW5jZSBhcyBQcm9ncmVzc0FwcGVhcmFuY2U7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVCYXJSYWRpdXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2JhcnMpIHtcbiAgICAgIHRoaXMuX2JhcnMuZm9yRWFjaCgoYmFyLCBpKSA9PiB7XG4gICAgICAgIGJhci5yYWRpdXMgPSB0aGlzLnJhZGl1cyAtIGkgKiA1O1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=
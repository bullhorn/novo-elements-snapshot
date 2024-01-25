// NG2
import { Component, ContentChildren, forwardRef, HostBinding, Input, QueryList } from '@angular/core';
import { NovoProgressBarElement } from './ProgressBar';
import { NOVO_PROGRESS_CONTAINER, ProgressAppearance } from './ProgressConstants';
import * as i0 from "@angular/core";
export class NovoProgressElement {
    constructor() {
        this.total = 100;
        this.radius = 54;
        this.fitContainer = false;
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
NovoProgressElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoProgressElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoProgressElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: NovoProgressElement, selector: "novo-progress", inputs: { color: "color", theme: "theme", total: "total", radius: "radius", striped: "striped", appearance: "appearance", disabled: "disabled" }, host: { properties: { "class.fit-container": "this.fitContainer", "class.striped": "this.striped", "class": "this.appearance", "class.disabled": "this.disabled" } }, providers: [
        {
            provide: NOVO_PROGRESS_CONTAINER,
            useExisting: NovoProgressElement,
        },
    ], queries: [{ propertyName: "_bars", predicate: i0.forwardRef(function () { return NovoProgressBarElement; }), descendants: true }], ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, styles: [":host{display:flex;position:relative;border-radius:.2em}:host.striped{background-image:linear-gradient(45deg,rgba(0,0,0,.25) 25%,transparent 25%,transparent 50%,rgba(0,0,0,.25) 50%,rgba(0,0,0,.25) 75%,transparent 75%,transparent);background-size:20px 20px}:host.linear{width:200px;height:1.2em;background-color:#f7f7f7;border:1px solid #cccdcc;overflow:hidden}:host.radial{width:9.2em;height:9.2em}:host.fit-container{width:100%}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoProgressElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-progress', template: ` <ng-content></ng-content> `, providers: [
                        {
                            provide: NOVO_PROGRESS_CONTAINER,
                            useExisting: NovoProgressElement,
                        },
                    ], styles: [":host{display:flex;position:relative;border-radius:.2em}:host.striped{background-image:linear-gradient(45deg,rgba(0,0,0,.25) 25%,transparent 25%,transparent 50%,rgba(0,0,0,.25) 50%,rgba(0,0,0,.25) 75%,transparent 75%,transparent);background-size:20px 20px}:host.linear{width:200px;height:1.2em;background-color:#f7f7f7;border:1px solid #cccdcc;overflow:hidden}:host.radial{width:9.2em;height:9.2em}:host.fit-container{width:100%}\n"] }]
        }], propDecorators: { color: [{
                type: Input
            }], theme: [{
                type: Input
            }], total: [{
                type: Input
            }], radius: [{
                type: Input
            }], fitContainer: [{
                type: HostBinding,
                args: ['class.fit-container']
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZ3Jlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9wcm9ncmVzcy9Qcm9ncmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFvQixTQUFTLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4SCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGtCQUFrQixFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBYWxGLE1BQU0sT0FBTyxtQkFBbUI7SUFYaEM7UUFlVyxVQUFLLEdBQVcsR0FBRyxDQUFDO1FBQ3BCLFdBQU0sR0FBVyxFQUFFLENBQUM7UUFHN0IsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFJOUIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUV6QiwyQkFBMkI7UUFDbkIsZ0JBQVcsR0FBdUIsa0JBQWtCLENBQUMsTUFBTSxDQUFDO1FBQzVELGNBQVMsR0FBWSxLQUFLLENBQUM7S0E4Q3BDO0lBNUNDLElBRUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBQ0QsSUFBSSxVQUFVLENBQUMsS0FBeUI7UUFDdEMsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLEtBQUssRUFBRTtZQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQTJCLENBQUM7WUFDL0MsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7U0FDN0I7SUFDSCxDQUFDO0lBRUQsaUJBQWlCO0lBQ2pCLElBRUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBYztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUtELGtCQUFrQjtRQUNoQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRU8sb0JBQW9CO1FBQzFCLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ3pCLEdBQUcsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQWdDLENBQUM7WUFDekQsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFTyxnQkFBZ0I7UUFDdEIsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzVCLEdBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25DLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOztnSEE3RFUsbUJBQW1CO29HQUFuQixtQkFBbUIsZ1dBUG5CO1FBQ1Q7WUFDRSxPQUFPLEVBQUUsdUJBQXVCO1lBQ2hDLFdBQVcsRUFBRSxtQkFBbUI7U0FDakM7S0FDRixtRkEwQ2lDLHNCQUFzQixvREFoRDlDLDZCQUE2QjsyRkFRNUIsbUJBQW1CO2tCQVgvQixTQUFTOytCQUNFLGVBQWUsWUFFZiw2QkFBNkIsYUFDNUI7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLHVCQUF1Qjs0QkFDaEMsV0FBVyxxQkFBcUI7eUJBQ2pDO3FCQUNGOzhCQUlELEtBQUs7c0JBREosS0FBSztnQkFFRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFHTixZQUFZO3NCQURYLFdBQVc7dUJBQUMscUJBQXFCO2dCQUtsQyxPQUFPO3NCQUZOLFdBQVc7dUJBQUMsZUFBZTs7c0JBQzNCLEtBQUs7Z0JBU0YsVUFBVTtzQkFGYixXQUFXO3VCQUFDLE9BQU87O3NCQUNuQixLQUFLO2dCQWNGLFFBQVE7c0JBRlgsS0FBSzs7c0JBQ0wsV0FBVzt1QkFBQyxnQkFBZ0I7Z0JBUzdCLEtBQUs7c0JBREosZUFBZTt1QkFBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsc0JBQXNCLENBQUMsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBmb3J3YXJkUmVmLCBIb3N0QmluZGluZywgSW5wdXQsIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b1Byb2dyZXNzQmFyRWxlbWVudCB9IGZyb20gJy4vUHJvZ3Jlc3NCYXInO1xuaW1wb3J0IHsgTk9WT19QUk9HUkVTU19DT05UQUlORVIsIFByb2dyZXNzQXBwZWFyYW5jZSB9IGZyb20gJy4vUHJvZ3Jlc3NDb25zdGFudHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXByb2dyZXNzJyxcbiAgc3R5bGVVcmxzOiBbJy4vUHJvZ3Jlc3Muc2NzcyddLFxuICB0ZW1wbGF0ZTogYCA8bmctY29udGVudD48L25nLWNvbnRlbnQ+IGAsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5PVk9fUFJPR1JFU1NfQ09OVEFJTkVSLFxuICAgICAgdXNlRXhpc3Rpbmc6IE5vdm9Qcm9ncmVzc0VsZW1lbnQsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1Byb2dyZXNzRWxlbWVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICBASW5wdXQoKVxuICBjb2xvcjogc3RyaW5nO1xuICBASW5wdXQoKSB0aGVtZTogc3RyaW5nO1xuICBASW5wdXQoKSB0b3RhbDogbnVtYmVyID0gMTAwO1xuICBASW5wdXQoKSByYWRpdXM6IG51bWJlciA9IDU0O1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZml0LWNvbnRhaW5lcicpXG4gIGZpdENvbnRhaW5lcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3RyaXBlZCcpXG4gIEBJbnB1dCgpXG4gIHN0cmlwZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvLyBQcml2YXRlIHZhcnMgZm9yIGdldHRlcnNcbiAgcHJpdmF0ZSBfYXBwZWFyYW5jZTogUHJvZ3Jlc3NBcHBlYXJhbmNlID0gUHJvZ3Jlc3NBcHBlYXJhbmNlLkxJTkVBUjtcbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgQElucHV0KClcbiAgZ2V0IGFwcGVhcmFuY2UoKTogUHJvZ3Jlc3NBcHBlYXJhbmNlIHtcbiAgICByZXR1cm4gdGhpcy5fYXBwZWFyYW5jZTtcbiAgfVxuICBzZXQgYXBwZWFyYW5jZSh2YWx1ZTogUHJvZ3Jlc3NBcHBlYXJhbmNlKSB7XG4gICAgaWYgKHRoaXMuX2FwcGVhcmFuY2UgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9hcHBlYXJhbmNlID0gdmFsdWUgYXMgUHJvZ3Jlc3NBcHBlYXJhbmNlO1xuICAgICAgdGhpcy5fdXBkYXRlQmFyQXBwZWFyYW5jZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIERpc2FibGVkIFN0YXRlXG4gIEBJbnB1dCgpXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZGlzYWJsZWQnKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICB9XG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gISF2YWx1ZTtcbiAgfVxuXG4gIEBDb250ZW50Q2hpbGRyZW4oZm9yd2FyZFJlZigoKSA9PiBOb3ZvUHJvZ3Jlc3NCYXJFbGVtZW50KSwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KVxuICBfYmFyczogUXVlcnlMaXN0PE5vdm9Qcm9ncmVzc0JhckVsZW1lbnQ+O1xuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLl91cGRhdGVCYXJSYWRpdXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUJhckFwcGVhcmFuY2UoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2JhcnMpIHtcbiAgICAgIHRoaXMuX2JhcnMuZm9yRWFjaCgoYmFyKSA9PiB7XG4gICAgICAgIGJhci5hcHBlYXJhbmNlID0gdGhpcy5hcHBlYXJhbmNlIGFzIFByb2dyZXNzQXBwZWFyYW5jZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUJhclJhZGl1cygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fYmFycykge1xuICAgICAgdGhpcy5fYmFycy5mb3JFYWNoKChiYXIsIGkpID0+IHtcbiAgICAgICAgYmFyLnJhZGl1cyA9IHRoaXMucmFkaXVzIC0gaSAqIDU7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// tslint:disable: directive-selector
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { BooleanInput } from 'novo-elements/utils';
import * as i0 from "@angular/core";
export class VisibleDirective {
    constructor(el) {
        this.el = el;
    }
    get hb_visibility() {
        return this.visible ? '' : `novo-visibility-hidden`;
    }
}
VisibleDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: VisibleDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
VisibleDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: VisibleDirective, selector: "[visible]", inputs: { visible: "visible" }, host: { properties: { "class": "this.hb_visibility" } }, ngImport: i0 });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], VisibleDirective.prototype, "visible", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: VisibleDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[visible]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { visible: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class']
            }], hb_visibility: [{
                type: HostBinding,
                args: ['class']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaWJsZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21tb24vZGlyZWN0aXZlcy92aXNpYmxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxxQ0FBcUM7QUFDckMsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBS25ELE1BQU0sT0FBTyxnQkFBZ0I7SUFXM0IsWUFBb0IsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7SUFBRyxDQUFDO0lBTHRDLElBQ0ksYUFBYTtRQUNmLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQztJQUN0RCxDQUFDOzs4R0FUVSxnQkFBZ0I7a0dBQWhCLGdCQUFnQjtBQUkzQjtJQUhDLFlBQVksRUFBRTs7aURBR0U7NEZBSk4sZ0JBQWdCO2tCQUg1QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO2lCQUN0QjtpR0FLQyxPQUFPO3NCQUZOLEtBQUs7O3NCQUNMLFdBQVc7dUJBQUMsT0FBTztnQkFJaEIsYUFBYTtzQkFEaEIsV0FBVzt1QkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6IGRpcmVjdGl2ZS1zZWxlY3RvclxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbdmlzaWJsZV0nLFxufSlcbmV4cG9ydCBjbGFzcyBWaXNpYmxlRGlyZWN0aXZlIHtcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIEBJbnB1dCgpXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICB2aXNpYmxlOiBib29sZWFuO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBnZXQgaGJfdmlzaWJpbGl0eSgpIHtcbiAgICByZXR1cm4gdGhpcy52aXNpYmxlID8gJycgOiBgbm92by12aXNpYmlsaXR5LWhpZGRlbmA7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7fVxufVxuIl19
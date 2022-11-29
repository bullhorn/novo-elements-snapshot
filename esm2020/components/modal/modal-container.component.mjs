import { ComponentPortal } from '@angular/cdk/portal';
import { Component, EventEmitter, HostBinding, Injector, Output } from '@angular/core';
import { zoomInOut } from './modal.animation';
import { NovoModalRef } from './modal-ref';
import * as i0 from "@angular/core";
import * as i1 from "./modal-ref";
import * as i2 from "@angular/cdk/portal";
export class NovoModalContainerComponent {
    constructor(injector, modalRef) {
        this.injector = injector;
        this.modalRef = modalRef;
        this.animationStateChanged = new EventEmitter();
        this.animationState = 'enter';
        this.initTimestamp = Date.now();
        this.id = `modal-container-${this.initTimestamp}`;
        this.component = new ComponentPortal(modalRef.component, null, injector);
    }
    onAnimationStart(event) {
        this.animationStateChanged.emit(event);
    }
    onAnimationDone(event) {
        this.animationStateChanged.emit(event);
    }
    startExitAnimation() {
        this.animationState = 'leave';
    }
}
NovoModalContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoModalContainerComponent, deps: [{ token: i0.Injector }, { token: i1.NovoModalRef }], target: i0.ɵɵFactoryTarget.Component });
NovoModalContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoModalContainerComponent, selector: "novo-modal-container", outputs: { animationStateChanged: "animationStateChanged" }, host: { properties: { "id": "this.id" } }, ngImport: i0, template: "<div class=\"modal-container\"\n     [@zoomInOut]=\"animationState\"\n     (@zoomInOut.start)=\"onAnimationStart($event)\"\n     (@zoomInOut.done)=\"onAnimationDone($event)\">\n  <ng-template [cdkPortalOutlet]=\"component\"></ng-template>\n</div>", styles: [":host{background:rgba(0,0,0,.25)}:host .modal-container{z-index:z(modal);position:fixed;display:flex;align-items:center;justify-content:center;top:0;bottom:0;left:0;right:0}\n"], directives: [{ type: i2.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }], animations: [zoomInOut] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoModalContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'novo-modal-container', animations: [zoomInOut], template: "<div class=\"modal-container\"\n     [@zoomInOut]=\"animationState\"\n     (@zoomInOut.start)=\"onAnimationStart($event)\"\n     (@zoomInOut.done)=\"onAnimationDone($event)\">\n  <ng-template [cdkPortalOutlet]=\"component\"></ng-template>\n</div>", styles: [":host{background:rgba(0,0,0,.25)}:host .modal-container{z-index:z(modal);position:fixed;display:flex;align-items:center;justify-content:center;top:0;bottom:0;left:0;right:0}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.NovoModalRef }]; }, propDecorators: { animationStateChanged: [{
                type: Output
            }], id: [{
                type: HostBinding,
                args: ['id']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvbW9kYWwvbW9kYWwtY29udGFpbmVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvbW9kYWwvbW9kYWwtY29udGFpbmVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxlQUFlLEVBQVUsTUFBTSxxQkFBcUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQzs7OztBQVEzQyxNQUFNLE9BQU8sMkJBQTJCO0lBT3RDLFlBQW9CLFFBQWtCLEVBQVUsUUFBc0I7UUFBbEQsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQWM7UUFONUQsMEJBQXFCLEdBQUcsSUFBSSxZQUFZLEVBQWtCLENBQUM7UUFDckUsbUJBQWMsR0FBK0IsT0FBTyxDQUFDO1FBRXJELGtCQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ1IsT0FBRSxHQUFHLG1CQUFtQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFHOUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsS0FBcUI7UUFDcEMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsZUFBZSxDQUFDLEtBQXFCO1FBQ25DLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELGtCQUFrQjtRQUNoQixJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQztJQUNoQyxDQUFDOzt5SEFyQlUsMkJBQTJCOzZHQUEzQiwyQkFBMkIsb0tDWnhDLHdQQUtNLHlXREtRLENBQUMsU0FBUyxDQUFDOzRGQUVaLDJCQUEyQjtrQkFOdkMsU0FBUzsrQkFDRSxzQkFBc0IsY0FHcEIsQ0FBQyxTQUFTLENBQUM7MEhBR2IscUJBQXFCO3NCQUE5QixNQUFNO2dCQUlZLEVBQUU7c0JBQXBCLFdBQVc7dUJBQUMsSUFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuaW1hdGlvbkV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBDb21wb25lbnRQb3J0YWwsIFBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBJbmplY3RvciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB6b29tSW5PdXQgfSBmcm9tICcuL21vZGFsLmFuaW1hdGlvbic7XG5pbXBvcnQgeyBOb3ZvTW9kYWxSZWYgfSBmcm9tICcuL21vZGFsLXJlZic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tbW9kYWwtY29udGFpbmVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL21vZGFsLWNvbnRhaW5lci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21vZGFsLWNvbnRhaW5lci5jb21wb25lbnQuc2NzcyddLFxuICBhbmltYXRpb25zOiBbem9vbUluT3V0XSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b01vZGFsQ29udGFpbmVyQ29tcG9uZW50IHtcbiAgQE91dHB1dCgpIGFuaW1hdGlvblN0YXRlQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8QW5pbWF0aW9uRXZlbnQ+KCk7XG4gIGFuaW1hdGlvblN0YXRlOiAndm9pZCcgfCAnZW50ZXInIHwgJ2xlYXZlJyA9ICdlbnRlcic7XG4gIGNvbXBvbmVudDogUG9ydGFsPGFueT47XG4gIGluaXRUaW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuICBASG9zdEJpbmRpbmcoJ2lkJykgaWQgPSBgbW9kYWwtY29udGFpbmVyLSR7dGhpcy5pbml0VGltZXN0YW1wfWA7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsIHByaXZhdGUgbW9kYWxSZWY6IE5vdm9Nb2RhbFJlZikge1xuICAgIHRoaXMuY29tcG9uZW50ID0gbmV3IENvbXBvbmVudFBvcnRhbChtb2RhbFJlZi5jb21wb25lbnQsIG51bGwsIGluamVjdG9yKTtcbiAgfVxuXG4gIG9uQW5pbWF0aW9uU3RhcnQoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgdGhpcy5hbmltYXRpb25TdGF0ZUNoYW5nZWQuZW1pdChldmVudCk7XG4gIH1cblxuICBvbkFuaW1hdGlvbkRvbmUoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgdGhpcy5hbmltYXRpb25TdGF0ZUNoYW5nZWQuZW1pdChldmVudCk7XG4gIH1cblxuICBzdGFydEV4aXRBbmltYXRpb24oKSB7XG4gICAgdGhpcy5hbmltYXRpb25TdGF0ZSA9ICdsZWF2ZSc7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJtb2RhbC1jb250YWluZXJcIlxuICAgICBbQHpvb21Jbk91dF09XCJhbmltYXRpb25TdGF0ZVwiXG4gICAgIChAem9vbUluT3V0LnN0YXJ0KT1cIm9uQW5pbWF0aW9uU3RhcnQoJGV2ZW50KVwiXG4gICAgIChAem9vbUluT3V0LmRvbmUpPVwib25BbmltYXRpb25Eb25lKCRldmVudClcIj5cbiAgPG5nLXRlbXBsYXRlIFtjZGtQb3J0YWxPdXRsZXRdPVwiY29tcG9uZW50XCI+PC9uZy10ZW1wbGF0ZT5cbjwvZGl2PiJdfQ==
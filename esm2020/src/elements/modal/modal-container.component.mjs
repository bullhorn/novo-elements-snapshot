import { ComponentPortal } from '@angular/cdk/portal';
import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { NovoModalRef } from './modal-ref';
import { zoomInOut } from './modal.animation';
import * as i0 from "@angular/core";
import * as i1 from "./modal-ref";
import * as i2 from "@angular/cdk/portal";
export class NovoModalContainerComponent {
    constructor(injector, modalRef) {
        this.injector = injector;
        this.modalRef = modalRef;
        this.animationStateChanged = new EventEmitter();
        this.animationState = 'enter';
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
NovoModalContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoModalContainerComponent, selector: "novo-modal-container", outputs: { animationStateChanged: "animationStateChanged" }, ngImport: i0, template: "<div class=\"modal-container\" [@zoomInOut]=\"animationState\" (@zoomInOut.start)=\"onAnimationStart($event)\"\n  (@zoomInOut.done)=\"onAnimationDone($event)\">\n  <ng-template [cdkPortalOutlet]=\"component\"></ng-template>\n</div>", styles: [":host{background:rgba(0,0,0,.25)}:host .modal-container{z-index:z(modal);position:fixed;display:flex;align-items:center;justify-content:center;top:0;bottom:0;left:0;right:0}\n"], directives: [{ type: i2.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }], animations: [zoomInOut] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoModalContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'novo-modal-container', animations: [zoomInOut], template: "<div class=\"modal-container\" [@zoomInOut]=\"animationState\" (@zoomInOut.start)=\"onAnimationStart($event)\"\n  (@zoomInOut.done)=\"onAnimationDone($event)\">\n  <ng-template [cdkPortalOutlet]=\"component\"></ng-template>\n</div>", styles: [":host{background:rgba(0,0,0,.25)}:host .modal-container{z-index:z(modal);position:fixed;display:flex;align-items:center;justify-content:center;top:0;bottom:0;left:0;right:0}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.NovoModalRef }]; }, propDecorators: { animationStateChanged: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL21vZGFsL21vZGFsLWNvbnRhaW5lci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9tb2RhbC9tb2RhbC1jb250YWluZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLGVBQWUsRUFBVSxNQUFNLHFCQUFxQixDQUFDO0FBQzlELE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7Ozs7QUFROUMsTUFBTSxPQUFPLDJCQUEyQjtJQU90QyxZQUFvQixRQUFrQixFQUFVLFFBQXNCO1FBQWxELGFBQVEsR0FBUixRQUFRLENBQVU7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFjO1FBTjVELDBCQUFxQixHQUFHLElBQUksWUFBWSxFQUFrQixDQUFDO1FBRXJFLG1CQUFjLEdBQStCLE9BQU8sQ0FBQztRQUtuRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksZUFBZSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxLQUFxQjtRQUNwQyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxlQUFlLENBQUMsS0FBcUI7UUFDbkMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDO0lBQ2hDLENBQUM7O3lIQXJCVSwyQkFBMkI7NkdBQTNCLDJCQUEyQix5SENaeEMseU9BR00seVdET1EsQ0FBQyxTQUFTLENBQUM7NEZBRVosMkJBQTJCO2tCQU52QyxTQUFTOytCQUNFLHNCQUFzQixjQUdwQixDQUFDLFNBQVMsQ0FBQzswSEFHYixxQkFBcUI7c0JBQTlCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBbmltYXRpb25FdmVudCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQ29tcG9uZW50UG9ydGFsLCBQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbmplY3RvciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb3ZvTW9kYWxSZWYgfSBmcm9tICcuL21vZGFsLXJlZic7XG5pbXBvcnQgeyB6b29tSW5PdXQgfSBmcm9tICcuL21vZGFsLmFuaW1hdGlvbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tbW9kYWwtY29udGFpbmVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL21vZGFsLWNvbnRhaW5lci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21vZGFsLWNvbnRhaW5lci5jb21wb25lbnQuc2NzcyddLFxuICBhbmltYXRpb25zOiBbem9vbUluT3V0XSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b01vZGFsQ29udGFpbmVyQ29tcG9uZW50IHtcbiAgQE91dHB1dCgpIGFuaW1hdGlvblN0YXRlQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8QW5pbWF0aW9uRXZlbnQ+KCk7XG5cbiAgYW5pbWF0aW9uU3RhdGU6ICd2b2lkJyB8ICdlbnRlcicgfCAnbGVhdmUnID0gJ2VudGVyJztcblxuICBjb21wb25lbnQ6IFBvcnRhbDxhbnk+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLCBwcml2YXRlIG1vZGFsUmVmOiBOb3ZvTW9kYWxSZWYpIHtcbiAgICB0aGlzLmNvbXBvbmVudCA9IG5ldyBDb21wb25lbnRQb3J0YWwobW9kYWxSZWYuY29tcG9uZW50LCBudWxsLCBpbmplY3Rvcik7XG4gIH1cblxuICBvbkFuaW1hdGlvblN0YXJ0KGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgIHRoaXMuYW5pbWF0aW9uU3RhdGVDaGFuZ2VkLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgb25BbmltYXRpb25Eb25lKGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgIHRoaXMuYW5pbWF0aW9uU3RhdGVDaGFuZ2VkLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgc3RhcnRFeGl0QW5pbWF0aW9uKCkge1xuICAgIHRoaXMuYW5pbWF0aW9uU3RhdGUgPSAnbGVhdmUnO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwibW9kYWwtY29udGFpbmVyXCIgW0B6b29tSW5PdXRdPVwiYW5pbWF0aW9uU3RhdGVcIiAoQHpvb21Jbk91dC5zdGFydCk9XCJvbkFuaW1hdGlvblN0YXJ0KCRldmVudClcIlxuICAoQHpvb21Jbk91dC5kb25lKT1cIm9uQW5pbWF0aW9uRG9uZSgkZXZlbnQpXCI+XG4gIDxuZy10ZW1wbGF0ZSBbY2RrUG9ydGFsT3V0bGV0XT1cImNvbXBvbmVudFwiPjwvbmctdGVtcGxhdGU+XG48L2Rpdj4iXX0=
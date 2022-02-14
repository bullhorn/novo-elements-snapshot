import { ComponentPortal } from '@angular/cdk/portal';
import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { NovoModalRef } from './modal-ref';
import { zoomInOut } from './modal.animation';
import * as i0 from "@angular/core";
import * as i1 from "./modal-ref";
import * as i2 from "@angular/cdk/portal";
function NovoModalContainerComponent_ng_template_1_Template(rf, ctx) { }
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
NovoModalContainerComponent.ɵfac = function NovoModalContainerComponent_Factory(t) { return new (t || NovoModalContainerComponent)(i0.ɵɵdirectiveInject(i0.Injector), i0.ɵɵdirectiveInject(i1.NovoModalRef)); };
NovoModalContainerComponent.ɵcmp = i0.ɵɵdefineComponent({ type: NovoModalContainerComponent, selectors: [["novo-modal-container"]], outputs: { animationStateChanged: "animationStateChanged" }, decls: 2, vars: 2, consts: [[1, "modal-container"], [3, "cdkPortalOutlet"]], template: function NovoModalContainerComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵlistener("@zoomInOut.start", function NovoModalContainerComponent_Template_div_animation_zoomInOut_start_0_listener($event) { return ctx.onAnimationStart($event); })("@zoomInOut.done", function NovoModalContainerComponent_Template_div_animation_zoomInOut_done_0_listener($event) { return ctx.onAnimationDone($event); });
        i0.ɵɵtemplate(1, NovoModalContainerComponent_ng_template_1_Template, 0, 0, "ng-template", 1);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("@zoomInOut", ctx.animationState);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("cdkPortalOutlet", ctx.component);
    } }, directives: [i2.CdkPortalOutlet], styles: ["[_nghost-%COMP%]{background:rgba(0,0,0,.25)}[_nghost-%COMP%]   .modal-container[_ngcontent-%COMP%]{align-items:center;bottom:0;display:flex;justify-content:center;left:0;position:fixed;right:0;top:0;z-index:1001}"], data: { animation: [zoomInOut] } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoModalContainerComponent, [{
        type: Component,
        args: [{
                selector: 'novo-modal-container',
                templateUrl: './modal-container.component.html',
                styleUrls: ['./modal-container.component.scss'],
                animations: [zoomInOut],
            }]
    }], function () { return [{ type: i0.Injector }, { type: i1.NovoModalRef }]; }, { animationStateChanged: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9tb2RhbC9tb2RhbC1jb250YWluZXIuY29tcG9uZW50LnRzIiwiZWxlbWVudHMvbW9kYWwvbW9kYWwtY29udGFpbmVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxlQUFlLEVBQVUsTUFBTSxxQkFBcUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7OztBQVE5QyxNQUFNLE9BQU8sMkJBQTJCO0lBT3RDLFlBQW9CLFFBQWtCLEVBQVUsUUFBc0I7UUFBbEQsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQWM7UUFONUQsMEJBQXFCLEdBQUcsSUFBSSxZQUFZLEVBQWtCLENBQUM7UUFFckUsbUJBQWMsR0FBK0IsT0FBTyxDQUFDO1FBS25ELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxlQUFlLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVELGdCQUFnQixDQUFDLEtBQXFCO1FBQ3BDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELGVBQWUsQ0FBQyxLQUFxQjtRQUNuQyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUM7SUFDaEMsQ0FBQzs7c0dBckJVLDJCQUEyQjtnRUFBM0IsMkJBQTJCO1FDWnhDLDhCQUVFO1FBRnlELDBJQUFvQiw0QkFBd0IsSUFBQywySEFDbkYsMkJBQXVCLElBRDREO1FBRXRHLDRGQUEyQztRQUM3QyxpQkFBTTs7UUFIdUIsK0NBQTZCO1FBRTNDLGVBQTZCO1FBQTdCLCtDQUE2QjtnU0RROUIsQ0FBQyxTQUFTLENBQUM7a0RBRVosMkJBQTJCO2NBTnZDLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxXQUFXLEVBQUUsa0NBQWtDO2dCQUMvQyxTQUFTLEVBQUUsQ0FBQyxrQ0FBa0MsQ0FBQztnQkFDL0MsVUFBVSxFQUFFLENBQUMsU0FBUyxDQUFDO2FBQ3hCO3NGQUVXLHFCQUFxQjtrQkFBOUIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuaW1hdGlvbkV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBDb21wb25lbnRQb3J0YWwsIFBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIEluamVjdG9yLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9Nb2RhbFJlZiB9IGZyb20gJy4vbW9kYWwtcmVmJztcbmltcG9ydCB7IHpvb21Jbk91dCB9IGZyb20gJy4vbW9kYWwuYW5pbWF0aW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1tb2RhbC1jb250YWluZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vbW9kYWwtY29udGFpbmVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbW9kYWwtY29udGFpbmVyLmNvbXBvbmVudC5zY3NzJ10sXG4gIGFuaW1hdGlvbnM6IFt6b29tSW5PdXRdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvTW9kYWxDb250YWluZXJDb21wb25lbnQge1xuICBAT3V0cHV0KCkgYW5pbWF0aW9uU3RhdGVDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxBbmltYXRpb25FdmVudD4oKTtcblxuICBhbmltYXRpb25TdGF0ZTogJ3ZvaWQnIHwgJ2VudGVyJyB8ICdsZWF2ZScgPSAnZW50ZXInO1xuXG4gIGNvbXBvbmVudDogUG9ydGFsPGFueT47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsIHByaXZhdGUgbW9kYWxSZWY6IE5vdm9Nb2RhbFJlZikge1xuICAgIHRoaXMuY29tcG9uZW50ID0gbmV3IENvbXBvbmVudFBvcnRhbChtb2RhbFJlZi5jb21wb25lbnQsIG51bGwsIGluamVjdG9yKTtcbiAgfVxuXG4gIG9uQW5pbWF0aW9uU3RhcnQoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgdGhpcy5hbmltYXRpb25TdGF0ZUNoYW5nZWQuZW1pdChldmVudCk7XG4gIH1cblxuICBvbkFuaW1hdGlvbkRvbmUoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgdGhpcy5hbmltYXRpb25TdGF0ZUNoYW5nZWQuZW1pdChldmVudCk7XG4gIH1cblxuICBzdGFydEV4aXRBbmltYXRpb24oKSB7XG4gICAgdGhpcy5hbmltYXRpb25TdGF0ZSA9ICdsZWF2ZSc7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJtb2RhbC1jb250YWluZXJcIiBbQHpvb21Jbk91dF09XCJhbmltYXRpb25TdGF0ZVwiIChAem9vbUluT3V0LnN0YXJ0KT1cIm9uQW5pbWF0aW9uU3RhcnQoJGV2ZW50KVwiXG4gIChAem9vbUluT3V0LmRvbmUpPVwib25BbmltYXRpb25Eb25lKCRldmVudClcIj5cbiAgPG5nLXRlbXBsYXRlIFtjZGtQb3J0YWxPdXRsZXRdPVwiY29tcG9uZW50XCI+PC9uZy10ZW1wbGF0ZT5cbjwvZGl2PiJdfQ==
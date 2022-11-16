import { ComponentPortal } from '@angular/cdk/portal';
import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { slideInOut } from './aside.animation';
import { NovoAsideRef } from './aside-ref';
import * as i0 from "@angular/core";
import * as i1 from "./aside-ref";
import * as i2 from "@angular/cdk/portal";
export class AsideComponent {
    constructor(injector, asideRef) {
        this.injector = injector;
        this.asideRef = asideRef;
        this.animationStateChanged = new EventEmitter();
        this.animationState = 'enter';
        this.component = new ComponentPortal(asideRef.component, null, injector);
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
AsideComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: AsideComponent, deps: [{ token: i0.Injector }, { token: i1.NovoAsideRef }], target: i0.ɵɵFactoryTarget.Component });
AsideComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: AsideComponent, selector: "novo-aside", outputs: { animationStateChanged: "animationStateChanged" }, ngImport: i0, template: "<div class=\"aside-panel\" [@slideInOut]=\"animationState\" (@slideInOut.start)=\"onAnimationStart($event)\"\n  (@slideInOut.done)=\"onAnimationDone($event)\">\n  <ng-template [cdkPortalOutlet]=\"component\"></ng-template>\n</div>", styles: [":host .aside-panel{background-color:var(--color-background);height:100vh;width:50%;min-width:-webkit-min-content;min-width:-moz-min-content;min-width:min-content;max-width:540px;position:absolute;top:0;right:0px;padding:0;display:flex;justify-content:stretch;align-items:stretch}\n"], directives: [{ type: i2.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }], animations: [slideInOut] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: AsideComponent, decorators: [{
            type: Component,
            args: [{ selector: 'novo-aside', animations: [slideInOut], template: "<div class=\"aside-panel\" [@slideInOut]=\"animationState\" (@slideInOut.start)=\"onAnimationStart($event)\"\n  (@slideInOut.done)=\"onAnimationDone($event)\">\n  <ng-template [cdkPortalOutlet]=\"component\"></ng-template>\n</div>", styles: [":host .aside-panel{background-color:var(--color-background);height:100vh;width:50%;min-width:-webkit-min-content;min-width:-moz-min-content;min-width:min-content;max-width:540px;position:absolute;top:0;right:0px;padding:0;display:flex;justify-content:stretch;align-items:stretch}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.NovoAsideRef }]; }, propDecorators: { animationStateChanged: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNpZGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy9hc2lkZS9hc2lkZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21wb25lbnRzL2FzaWRlL2FzaWRlLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxlQUFlLEVBQVUsTUFBTSxxQkFBcUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDOzs7O0FBUTNDLE1BQU0sT0FBTyxjQUFjO0lBT3pCLFlBQW9CLFFBQWtCLEVBQVUsUUFBc0I7UUFBbEQsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQWM7UUFONUQsMEJBQXFCLEdBQUcsSUFBSSxZQUFZLEVBQWtCLENBQUM7UUFFckUsbUJBQWMsR0FBK0IsT0FBTyxDQUFDO1FBS25ELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxlQUFlLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVELGdCQUFnQixDQUFDLEtBQXFCO1FBQ3BDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELGVBQWUsQ0FBQyxLQUFxQjtRQUNuQyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUM7SUFDaEMsQ0FBQzs7NEdBckJVLGNBQWM7Z0dBQWQsY0FBYywrR0NaM0Isd09BR00sbWRET1EsQ0FBQyxVQUFVLENBQUM7NEZBRWIsY0FBYztrQkFOMUIsU0FBUzsrQkFDRSxZQUFZLGNBR1YsQ0FBQyxVQUFVLENBQUM7MEhBR2QscUJBQXFCO3NCQUE5QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5pbWF0aW9uRXZlbnQgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IENvbXBvbmVudFBvcnRhbCwgUG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5qZWN0b3IsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgc2xpZGVJbk91dCB9IGZyb20gJy4vYXNpZGUuYW5pbWF0aW9uJztcbmltcG9ydCB7IE5vdm9Bc2lkZVJlZiB9IGZyb20gJy4vYXNpZGUtcmVmJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1hc2lkZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9hc2lkZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2FzaWRlLmNvbXBvbmVudC5zY3NzJ10sXG4gIGFuaW1hdGlvbnM6IFtzbGlkZUluT3V0XSxcbn0pXG5leHBvcnQgY2xhc3MgQXNpZGVDb21wb25lbnQge1xuICBAT3V0cHV0KCkgYW5pbWF0aW9uU3RhdGVDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxBbmltYXRpb25FdmVudD4oKTtcblxuICBhbmltYXRpb25TdGF0ZTogJ3ZvaWQnIHwgJ2VudGVyJyB8ICdsZWF2ZScgPSAnZW50ZXInO1xuXG4gIGNvbXBvbmVudDogUG9ydGFsPGFueT47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsIHByaXZhdGUgYXNpZGVSZWY6IE5vdm9Bc2lkZVJlZikge1xuICAgIHRoaXMuY29tcG9uZW50ID0gbmV3IENvbXBvbmVudFBvcnRhbChhc2lkZVJlZi5jb21wb25lbnQsIG51bGwsIGluamVjdG9yKTtcbiAgfVxuXG4gIG9uQW5pbWF0aW9uU3RhcnQoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgdGhpcy5hbmltYXRpb25TdGF0ZUNoYW5nZWQuZW1pdChldmVudCk7XG4gIH1cblxuICBvbkFuaW1hdGlvbkRvbmUoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgdGhpcy5hbmltYXRpb25TdGF0ZUNoYW5nZWQuZW1pdChldmVudCk7XG4gIH1cblxuICBzdGFydEV4aXRBbmltYXRpb24oKSB7XG4gICAgdGhpcy5hbmltYXRpb25TdGF0ZSA9ICdsZWF2ZSc7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJhc2lkZS1wYW5lbFwiIFtAc2xpZGVJbk91dF09XCJhbmltYXRpb25TdGF0ZVwiIChAc2xpZGVJbk91dC5zdGFydCk9XCJvbkFuaW1hdGlvblN0YXJ0KCRldmVudClcIlxuICAoQHNsaWRlSW5PdXQuZG9uZSk9XCJvbkFuaW1hdGlvbkRvbmUoJGV2ZW50KVwiPlxuICA8bmctdGVtcGxhdGUgW2Nka1BvcnRhbE91dGxldF09XCJjb21wb25lbnRcIj48L25nLXRlbXBsYXRlPlxuPC9kaXY+Il19
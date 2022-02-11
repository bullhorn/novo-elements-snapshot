import { ComponentPortal } from '@angular/cdk/portal';
import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { NovoAsideRef } from './aside-ref';
import { slideInOut } from './aside.animation';
import * as i0 from "@angular/core";
import * as i1 from "./aside-ref";
import * as i2 from "@angular/cdk/portal";
function AsideComponent_ng_template_1_Template(rf, ctx) { }
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
AsideComponent.ɵfac = function AsideComponent_Factory(t) { return new (t || AsideComponent)(i0.ɵɵdirectiveInject(i0.Injector), i0.ɵɵdirectiveInject(i1.NovoAsideRef)); };
AsideComponent.ɵcmp = i0.ɵɵdefineComponent({ type: AsideComponent, selectors: [["novo-aside"]], outputs: { animationStateChanged: "animationStateChanged" }, decls: 2, vars: 2, consts: [[1, "aside-panel"], [3, "cdkPortalOutlet"]], template: function AsideComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵlistener("@slideInOut.start", function AsideComponent_Template_div_animation_slideInOut_start_0_listener($event) { return ctx.onAnimationStart($event); })("@slideInOut.done", function AsideComponent_Template_div_animation_slideInOut_done_0_listener($event) { return ctx.onAnimationDone($event); });
        i0.ɵɵtemplate(1, AsideComponent_ng_template_1_Template, 0, 0, "ng-template", 1);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("@slideInOut", ctx.animationState);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("cdkPortalOutlet", ctx.component);
    } }, directives: [i2.CdkPortalOutlet], styles: ["[_nghost-%COMP%]   .aside-panel[_ngcontent-%COMP%]{align-items:stretch;background-color:#fff;display:flex;height:100vh;justify-content:stretch;max-width:540px;min-width:-webkit-min-content;min-width:-moz-min-content;min-width:min-content;padding:0;position:absolute;right:0;top:0;width:50%}"], data: { animation: [slideInOut] } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(AsideComponent, [{
        type: Component,
        args: [{
                selector: 'novo-aside',
                templateUrl: './aside.component.html',
                styleUrls: ['./aside.component.scss'],
                animations: [slideInOut],
            }]
    }], function () { return [{ type: i0.Injector }, { type: i1.NovoAsideRef }]; }, { animationStateChanged: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNpZGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2FzaWRlL2FzaWRlLmNvbXBvbmVudC50cyIsImVsZW1lbnRzL2FzaWRlL2FzaWRlLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxlQUFlLEVBQVUsTUFBTSxxQkFBcUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7OztBQVEvQyxNQUFNLE9BQU8sY0FBYztJQU96QixZQUFvQixRQUFrQixFQUFVLFFBQXNCO1FBQWxELGFBQVEsR0FBUixRQUFRLENBQVU7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFjO1FBTjVELDBCQUFxQixHQUFHLElBQUksWUFBWSxFQUFrQixDQUFDO1FBRXJFLG1CQUFjLEdBQStCLE9BQU8sQ0FBQztRQUtuRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksZUFBZSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxLQUFxQjtRQUNwQyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxlQUFlLENBQUMsS0FBcUI7UUFDbkMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDO0lBQ2hDLENBQUM7OzRFQXJCVSxjQUFjO21EQUFkLGNBQWM7UUNaM0IsOEJBRUU7UUFGc0QsK0hBQXFCLDRCQUF3QixJQUFDLGdIQUNoRiwyQkFBdUIsSUFEeUQ7UUFFcEcsK0VBQTJDO1FBQzdDLGlCQUFNOztRQUhtQixnREFBOEI7UUFFeEMsZUFBNkI7UUFBN0IsK0NBQTZCOzhXRFE5QixDQUFDLFVBQVUsQ0FBQztrREFFYixjQUFjO2NBTjFCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsV0FBVyxFQUFFLHdCQUF3QjtnQkFDckMsU0FBUyxFQUFFLENBQUMsd0JBQXdCLENBQUM7Z0JBQ3JDLFVBQVUsRUFBRSxDQUFDLFVBQVUsQ0FBQzthQUN6QjtzRkFFVyxxQkFBcUI7a0JBQTlCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBbmltYXRpb25FdmVudCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQ29tcG9uZW50UG9ydGFsLCBQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbmplY3RvciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb3ZvQXNpZGVSZWYgfSBmcm9tICcuL2FzaWRlLXJlZic7XG5pbXBvcnQgeyBzbGlkZUluT3V0IH0gZnJvbSAnLi9hc2lkZS5hbmltYXRpb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWFzaWRlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2FzaWRlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYXNpZGUuY29tcG9uZW50LnNjc3MnXSxcbiAgYW5pbWF0aW9uczogW3NsaWRlSW5PdXRdLFxufSlcbmV4cG9ydCBjbGFzcyBBc2lkZUNvbXBvbmVudCB7XG4gIEBPdXRwdXQoKSBhbmltYXRpb25TdGF0ZUNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPEFuaW1hdGlvbkV2ZW50PigpO1xuXG4gIGFuaW1hdGlvblN0YXRlOiAndm9pZCcgfCAnZW50ZXInIHwgJ2xlYXZlJyA9ICdlbnRlcic7XG5cbiAgY29tcG9uZW50OiBQb3J0YWw8YW55PjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGluamVjdG9yOiBJbmplY3RvciwgcHJpdmF0ZSBhc2lkZVJlZjogTm92b0FzaWRlUmVmKSB7XG4gICAgdGhpcy5jb21wb25lbnQgPSBuZXcgQ29tcG9uZW50UG9ydGFsKGFzaWRlUmVmLmNvbXBvbmVudCwgbnVsbCwgaW5qZWN0b3IpO1xuICB9XG5cbiAgb25BbmltYXRpb25TdGFydChldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICB0aGlzLmFuaW1hdGlvblN0YXRlQ2hhbmdlZC5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIG9uQW5pbWF0aW9uRG9uZShldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICB0aGlzLmFuaW1hdGlvblN0YXRlQ2hhbmdlZC5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIHN0YXJ0RXhpdEFuaW1hdGlvbigpIHtcbiAgICB0aGlzLmFuaW1hdGlvblN0YXRlID0gJ2xlYXZlJztcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImFzaWRlLXBhbmVsXCIgW0BzbGlkZUluT3V0XT1cImFuaW1hdGlvblN0YXRlXCIgKEBzbGlkZUluT3V0LnN0YXJ0KT1cIm9uQW5pbWF0aW9uU3RhcnQoJGV2ZW50KVwiXG4gIChAc2xpZGVJbk91dC5kb25lKT1cIm9uQW5pbWF0aW9uRG9uZSgkZXZlbnQpXCI+XG4gIDxuZy10ZW1wbGF0ZSBbY2RrUG9ydGFsT3V0bGV0XT1cImNvbXBvbmVudFwiPjwvbmctdGVtcGxhdGU+XG48L2Rpdj4iXX0=
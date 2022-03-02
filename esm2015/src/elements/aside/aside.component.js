import { ComponentPortal } from '@angular/cdk/portal';
import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { NovoAsideRef } from './aside-ref';
import { slideInOut } from './aside.animation';
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
AsideComponent.decorators = [
    { type: Component, args: [{
                selector: 'novo-aside',
                template: "<div class=\"aside-panel\" [@slideInOut]=\"animationState\" (@slideInOut.start)=\"onAnimationStart($event)\"\n  (@slideInOut.done)=\"onAnimationDone($event)\">\n  <ng-template [cdkPortalOutlet]=\"component\"></ng-template>\n</div>",
                animations: [slideInOut],
                styles: [":host .aside-panel{align-items:stretch;background-color:var(--background-bright,#fff);display:flex;height:100vh;justify-content:stretch;max-width:540px;min-width:-webkit-min-content;min-width:-moz-min-content;min-width:min-content;padding:0;position:absolute;right:0;top:0;width:50%}"]
            },] }
];
AsideComponent.ctorParameters = () => [
    { type: Injector },
    { type: NovoAsideRef }
];
AsideComponent.propDecorators = {
    animationStateChanged: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNpZGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL2FzaWRlL2FzaWRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsZUFBZSxFQUFVLE1BQU0scUJBQXFCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQVEvQyxNQUFNLE9BQU8sY0FBYztJQU96QixZQUFvQixRQUFrQixFQUFVLFFBQXNCO1FBQWxELGFBQVEsR0FBUixRQUFRLENBQVU7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFjO1FBTjVELDBCQUFxQixHQUFHLElBQUksWUFBWSxFQUFrQixDQUFDO1FBRXJFLG1CQUFjLEdBQStCLE9BQU8sQ0FBQztRQUtuRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksZUFBZSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxLQUFxQjtRQUNwQyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxlQUFlLENBQUMsS0FBcUI7UUFDbkMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDO0lBQ2hDLENBQUM7OztZQTNCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLGtQQUFxQztnQkFFckMsVUFBVSxFQUFFLENBQUMsVUFBVSxDQUFDOzthQUN6Qjs7O1lBVGlDLFFBQVE7WUFDakMsWUFBWTs7O29DQVVsQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5pbWF0aW9uRXZlbnQgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IENvbXBvbmVudFBvcnRhbCwgUG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5qZWN0b3IsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b0FzaWRlUmVmIH0gZnJvbSAnLi9hc2lkZS1yZWYnO1xuaW1wb3J0IHsgc2xpZGVJbk91dCB9IGZyb20gJy4vYXNpZGUuYW5pbWF0aW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1hc2lkZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9hc2lkZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2FzaWRlLmNvbXBvbmVudC5zY3NzJ10sXG4gIGFuaW1hdGlvbnM6IFtzbGlkZUluT3V0XSxcbn0pXG5leHBvcnQgY2xhc3MgQXNpZGVDb21wb25lbnQge1xuICBAT3V0cHV0KCkgYW5pbWF0aW9uU3RhdGVDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxBbmltYXRpb25FdmVudD4oKTtcblxuICBhbmltYXRpb25TdGF0ZTogJ3ZvaWQnIHwgJ2VudGVyJyB8ICdsZWF2ZScgPSAnZW50ZXInO1xuXG4gIGNvbXBvbmVudDogUG9ydGFsPGFueT47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsIHByaXZhdGUgYXNpZGVSZWY6IE5vdm9Bc2lkZVJlZikge1xuICAgIHRoaXMuY29tcG9uZW50ID0gbmV3IENvbXBvbmVudFBvcnRhbChhc2lkZVJlZi5jb21wb25lbnQsIG51bGwsIGluamVjdG9yKTtcbiAgfVxuXG4gIG9uQW5pbWF0aW9uU3RhcnQoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgdGhpcy5hbmltYXRpb25TdGF0ZUNoYW5nZWQuZW1pdChldmVudCk7XG4gIH1cblxuICBvbkFuaW1hdGlvbkRvbmUoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgdGhpcy5hbmltYXRpb25TdGF0ZUNoYW5nZWQuZW1pdChldmVudCk7XG4gIH1cblxuICBzdGFydEV4aXRBbmltYXRpb24oKSB7XG4gICAgdGhpcy5hbmltYXRpb25TdGF0ZSA9ICdsZWF2ZSc7XG4gIH1cbn1cbiJdfQ==
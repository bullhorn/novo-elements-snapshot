// NG2
import { ComponentFactoryResolver, Directive, EventEmitter, HostListener, Input, Output, ViewContainerRef, } from '@angular/core';
import { PopOverContent } from './PopOverContent';
export class PopOverDirective {
    constructor(viewContainerRef, resolver) {
        this.viewContainerRef = viewContainerRef;
        this.resolver = resolver;
        this.PopoverComponent = PopOverContent;
        this.popoverOnHover = false;
        this.popoverDismissTimeout = 0;
        this.onShown = new EventEmitter();
        this.onHidden = new EventEmitter();
    }
    // ---------------------------------------------------
    // Event listeners
    // ---------------------------------------------------
    showOrHideOnClick() {
        if (this.popoverOnHover || this.popoverDisabled) {
            return;
        }
        this.toggle();
    }
    showOnHover() {
        if (!this.popoverOnHover || this.popoverDisabled) {
            return;
        }
        this.show();
    }
    hideOnHover() {
        if (!this.popoverOnHover || this.popoverDisabled) {
            return;
        }
        this.hide();
    }
    ngOnChanges(changes) {
        if (changes.popoverDisabled) {
            if (changes.popoverDisabled.currentValue) {
                this.hide();
            }
        }
        if (changes.popoverAlways) {
            if (changes.popoverAlways.currentValue) {
                this.show();
            }
        }
    }
    toggle() {
        if (!this.visible) {
            this.show();
        }
        else {
            this.hide();
        }
    }
    show() {
        if (this.visible) {
            return;
        }
        this.visible = true;
        if (typeof this.content === 'string') {
            const factory = this.resolver.resolveComponentFactory(this.PopoverComponent);
            if (!this.visible) {
                return;
            }
            this.popover = this.viewContainerRef.createComponent(factory);
            const popover = this.popover.instance;
            popover.popover = this;
            popover.content = this.content;
            if (this.popoverPlacement !== undefined) {
                popover.placement = this.popoverPlacement;
            }
            if (this.popoverAnimation !== undefined) {
                popover.animation = this.popoverAnimation;
            }
            if (this.popoverTitle !== undefined) {
                popover.title = this.popoverTitle;
            }
            popover.onCloseFromOutside.subscribe(() => this.hide());
            if (this.popoverDismissTimeout > 0) {
                setTimeout(() => this.hide(), this.popoverDismissTimeout);
            }
        }
        else {
            const popover = this.content;
            popover.popover = this;
            if (this.popoverPlacement !== undefined) {
                popover.placement = this.popoverPlacement;
            }
            if (this.popoverAnimation !== undefined) {
                popover.animation = this.popoverAnimation;
            }
            if (this.popoverTitle !== undefined) {
                popover.title = this.popoverTitle;
            }
            popover.onCloseFromOutside.subscribe(() => this.hide());
            if (this.popoverDismissTimeout > 0) {
                setTimeout(() => this.hide(), this.popoverDismissTimeout);
            }
            popover.show();
        }
        this.onShown.emit(this);
    }
    hide() {
        if (!this.visible) {
            return;
        }
        this.visible = false;
        if (this.popover) {
            this.popover.destroy();
        }
        if (this.content instanceof PopOverContent) {
            this.content.hideFromPopover();
        }
        this.onHidden.emit(this);
    }
    getElement() {
        return this.viewContainerRef.element.nativeElement;
    }
}
PopOverDirective.decorators = [
    { type: Directive, args: [{
                selector: '[popover]',
            },] }
];
PopOverDirective.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: ComponentFactoryResolver }
];
PopOverDirective.propDecorators = {
    content: [{ type: Input, args: ['popover',] }],
    popoverDisabled: [{ type: Input }],
    popoverAlways: [{ type: Input }],
    popoverAnimation: [{ type: Input }],
    popoverPlacement: [{ type: Input }],
    popoverTitle: [{ type: Input }],
    popoverOnHover: [{ type: Input }],
    popoverDismissTimeout: [{ type: Input }],
    onShown: [{ type: Output }],
    onHidden: [{ type: Output }],
    showOrHideOnClick: [{ type: HostListener, args: ['click',] }],
    showOnHover: [{ type: HostListener, args: ['focusin',] }, { type: HostListener, args: ['mouseenter',] }],
    hideOnHover: [{ type: HostListener, args: ['focusout',] }, { type: HostListener, args: ['mouseleave',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9wT3Zlci5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9wb3BvdmVyL1BvcE92ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFDTCx3QkFBd0IsRUFFeEIsU0FBUyxFQUNULFlBQVksRUFDWixZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFFTixnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBS2xELE1BQU0sT0FBTyxnQkFBZ0I7SUFLM0IsWUFBc0IsZ0JBQWtDLEVBQVksUUFBa0M7UUFBaEYscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFZLGFBQVEsR0FBUixRQUFRLENBQTBCO1FBSjVGLHFCQUFnQixHQUFHLGNBQWMsQ0FBQztRQW1CNUMsbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFFaEMsMEJBQXFCLEdBQVcsQ0FBQyxDQUFDO1FBR2xDLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBb0IsQ0FBQztRQUUvQyxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQW9CLENBQUM7SUF0QnlELENBQUM7SUF3QjFHLHNEQUFzRDtJQUN0RCxrQkFBa0I7SUFDbEIsc0RBQXNEO0lBRXRELGlCQUFpQjtRQUNmLElBQUksSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQy9DLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBSUQsV0FBVztRQUNULElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDaEQsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lB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K0JBRUwsS0FBSzsrQkFFTCxLQUFLOzJCQUVMLEtBQUs7NkJBRUwsS0FBSztvQ0FFTCxLQUFLO3NCQUdMLE1BQU07dUJBRU4sTUFBTTtnQ0FNTixZQUFZLFNBQUMsT0FBTzswQkFRcEIsWUFBWSxTQUFDLFNBQVMsY0FDdEIsWUFBWSxTQUFDLFlBQVk7MEJBUXpCLFlBQVksU0FBQyxVQUFVLGNBQ3ZCLFlBQVksU0FBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQge1xuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIENvbXBvbmVudFJlZixcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2UsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUG9wT3ZlckNvbnRlbnQgfSBmcm9tICcuL1BvcE92ZXJDb250ZW50JztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3BvcG92ZXJdJyxcbn0pXG5leHBvcnQgY2xhc3MgUG9wT3ZlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIHByb3RlY3RlZCBQb3BvdmVyQ29tcG9uZW50ID0gUG9wT3ZlckNvbnRlbnQ7XG4gIHByb3RlY3RlZCBwb3BvdmVyOiBDb21wb25lbnRSZWY8UG9wT3ZlckNvbnRlbnQ+O1xuICBwcm90ZWN0ZWQgdmlzaWJsZTogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZiwgcHJvdGVjdGVkIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHt9XG5cbiAgQElucHV0KCdwb3BvdmVyJylcbiAgY29udGVudDogc3RyaW5nIHwgUG9wT3ZlckNvbnRlbnQ7XG4gIEBJbnB1dCgpXG4gIHBvcG92ZXJEaXNhYmxlZDogYm9vbGVhbjtcbiAgQElucHV0KClcbiAgcG9wb3ZlckFsd2F5czogYm9vbGVhbjtcbiAgQElucHV0KClcbiAgcG9wb3ZlckFuaW1hdGlvbjogYm9vbGVhbjtcbiAgQElucHV0KClcbiAgcG9wb3ZlclBsYWNlbWVudDogc3RyaW5nO1xuICBASW5wdXQoKVxuICBwb3BvdmVyVGl0bGU6IHN0cmluZztcbiAgQElucHV0KClcbiAgcG9wb3Zlck9uSG92ZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KClcbiAgcG9wb3ZlckRpc21pc3NUaW1lb3V0OiBudW1iZXIgPSAwO1xuXG4gIEBPdXRwdXQoKVxuICBvblNob3duID0gbmV3IEV2ZW50RW1pdHRlcjxQb3BPdmVyRGlyZWN0aXZlPigpO1xuICBAT3V0cHV0KClcbiAgb25IaWRkZW4gPSBuZXcgRXZlbnRFbWl0dGVyPFBvcE92ZXJEaXJlY3RpdmU+KCk7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEV2ZW50IGxpc3RlbmVyc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBzaG93T3JIaWRlT25DbGljaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wb3BvdmVyT25Ib3ZlciB8fCB0aGlzLnBvcG92ZXJEaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnRvZ2dsZSgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZm9jdXNpbicpXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKVxuICBzaG93T25Ib3ZlcigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucG9wb3Zlck9uSG92ZXIgfHwgdGhpcy5wb3BvdmVyRGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zaG93KCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdmb2N1c291dCcpXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxuICBoaWRlT25Ib3ZlcigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucG9wb3Zlck9uSG92ZXIgfHwgdGhpcy5wb3BvdmVyRGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5oaWRlKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtwcm9wZXJ0eU5hbWU6IHN0cmluZ106IFNpbXBsZUNoYW5nZSB9KSB7XG4gICAgaWYgKGNoYW5nZXMucG9wb3ZlckRpc2FibGVkKSB7XG4gICAgICBpZiAoY2hhbmdlcy5wb3BvdmVyRGlzYWJsZWQuY3VycmVudFZhbHVlKSB7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5wb3BvdmVyQWx3YXlzKSB7XG4gICAgICBpZiAoY2hhbmdlcy5wb3BvdmVyQWx3YXlzLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgaWYgKCF0aGlzLnZpc2libGUpIHtcbiAgICAgIHRoaXMuc2hvdygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG4gIH1cblxuICBzaG93KCkge1xuICAgIGlmICh0aGlzLnZpc2libGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuICAgIGlmICh0eXBlb2YgdGhpcy5jb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3QgZmFjdG9yeSA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodGhpcy5Qb3BvdmVyQ29tcG9uZW50KTtcbiAgICAgIGlmICghdGhpcy52aXNpYmxlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5wb3BvdmVyID0gdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5KTtcbiAgICAgIGNvbnN0IHBvcG92ZXIgPSB0aGlzLnBvcG92ZXIuaW5zdGFuY2UgYXMgUG9wT3ZlckNvbnRlbnQ7XG4gICAgICBwb3BvdmVyLnBvcG92ZXIgPSB0aGlzO1xuICAgICAgcG9wb3Zlci5jb250ZW50ID0gdGhpcy5jb250ZW50IGFzIHN0cmluZztcbiAgICAgIGlmICh0aGlzLnBvcG92ZXJQbGFjZW1lbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwb3BvdmVyLnBsYWNlbWVudCA9IHRoaXMucG9wb3ZlclBsYWNlbWVudDtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnBvcG92ZXJBbmltYXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwb3BvdmVyLmFuaW1hdGlvbiA9IHRoaXMucG9wb3ZlckFuaW1hdGlvbjtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnBvcG92ZXJUaXRsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHBvcG92ZXIudGl0bGUgPSB0aGlzLnBvcG92ZXJUaXRsZTtcbiAgICAgIH1cblxuICAgICAgcG9wb3Zlci5vbkNsb3NlRnJvbU91dHNpZGUuc3Vic2NyaWJlKCgpID0+IHRoaXMuaGlkZSgpKTtcbiAgICAgIGlmICh0aGlzLnBvcG92ZXJEaXNtaXNzVGltZW91dCA+IDApIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmhpZGUoKSwgdGhpcy5wb3BvdmVyRGlzbWlzc1RpbWVvdXQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwb3BvdmVyID0gdGhpcy5jb250ZW50IGFzIFBvcE92ZXJDb250ZW50O1xuICAgICAgcG9wb3Zlci5wb3BvdmVyID0gdGhpcztcbiAgICAgIGlmICh0aGlzLnBvcG92ZXJQbGFjZW1lbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwb3BvdmVyLnBsYWNlbWVudCA9IHRoaXMucG9wb3ZlclBsYWNlbWVudDtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnBvcG92ZXJBbmltYXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwb3BvdmVyLmFuaW1hdGlvbiA9IHRoaXMucG9wb3ZlckFuaW1hdGlvbjtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnBvcG92ZXJUaXRsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHBvcG92ZXIudGl0bGUgPSB0aGlzLnBvcG92ZXJUaXRsZTtcbiAgICAgIH1cblxuICAgICAgcG9wb3Zlci5vbkNsb3NlRnJvbU91dHNpZGUuc3Vic2NyaWJlKCgpID0+IHRoaXMuaGlkZSgpKTtcbiAgICAgIGlmICh0aGlzLnBvcG92ZXJEaXNtaXNzVGltZW91dCA+IDApIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmhpZGUoKSwgdGhpcy5wb3BvdmVyRGlzbWlzc1RpbWVvdXQpO1xuICAgICAgfVxuICAgICAgcG9wb3Zlci5zaG93KCk7XG4gICAgfVxuXG4gICAgdGhpcy5vblNob3duLmVtaXQodGhpcyk7XG4gIH1cblxuICBoaWRlKCkge1xuICAgIGlmICghdGhpcy52aXNpYmxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gICAgaWYgKHRoaXMucG9wb3Zlcikge1xuICAgICAgdGhpcy5wb3BvdmVyLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb250ZW50IGluc3RhbmNlb2YgUG9wT3ZlckNvbnRlbnQpIHtcbiAgICAgICh0aGlzLmNvbnRlbnQgYXMgUG9wT3ZlckNvbnRlbnQpLmhpZGVGcm9tUG9wb3ZlcigpO1xuICAgIH1cblxuICAgIHRoaXMub25IaWRkZW4uZW1pdCh0aGlzKTtcbiAgfVxuXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlld0NvbnRhaW5lclJlZi5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gIH1cbn1cbiJdfQ==
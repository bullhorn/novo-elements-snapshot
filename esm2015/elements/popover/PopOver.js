// NG2
import { Directive, ViewContainerRef, ComponentFactoryResolver, Input, Output, EventEmitter, HostListener, } from '@angular/core';
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
        if (changes['popoverDisabled']) {
            if (changes['popoverDisabled'].currentValue) {
                this.hide();
            }
        }
        if (changes['popoverAlways']) {
            if (changes['popoverAlways'].currentValue) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9wT3Zlci5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvcG9wb3Zlci9Qb3BPdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQ0wsU0FBUyxFQUdULGdCQUFnQixFQUNoQix3QkFBd0IsRUFDeEIsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osWUFBWSxHQUViLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUtsRCxNQUFNLE9BQU8sZ0JBQWdCO0lBSzNCLFlBQXNCLGdCQUFrQyxFQUFZLFFBQWtDO1FBQWhGLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBWSxhQUFRLEdBQVIsUUFBUSxDQUEwQjtRQUo1RixxQkFBZ0IsR0FBRyxjQUFjLENBQUM7UUFtQjVDLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBRWhDLDBCQUFxQixHQUFXLENBQUMsQ0FBQztRQUdsQyxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQW9CLENBQUM7UUFFL0MsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFvQixDQUFDO0lBdEJ5RCxDQUFDO0lBd0IxRyxzREFBc0Q7SUFDdEQsa0JBQWtCO0lBQ2xCLHNEQUFzRDtJQUV0RCxpQkFBaUI7UUFDZixJQUFJLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUMvQyxPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUlELFdBQVc7UUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ2hELE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFJRCxX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QkFFTCxLQUFLOytCQUVMLEtBQUs7K0JBRUwsS0FBSzsyQkFFTCxLQUFLOzZCQUVMLEtBQUs7b0NBRUwsS0FBSztzQkFHTCxNQUFNO3VCQUVOLE1BQU07Z0NBTU4sWUFBWSxTQUFDLE9BQU87MEJBUXBCLFlBQVksU0FBQyxTQUFTLGNBQ3RCLFlBQVksU0FBQyxZQUFZOzBCQVF6QixZQUFZLFNBQUMsVUFBVSxjQUN2QixZQUFZLFNBQUMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxyXG5pbXBvcnQge1xyXG4gIERpcmVjdGl2ZSxcclxuICBPbkNoYW5nZXMsXHJcbiAgQ29tcG9uZW50UmVmLFxyXG4gIFZpZXdDb250YWluZXJSZWYsXHJcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIFNpbXBsZUNoYW5nZSxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUG9wT3ZlckNvbnRlbnQgfSBmcm9tICcuL1BvcE92ZXJDb250ZW50JztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW3BvcG92ZXJdJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIFBvcE92ZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG4gIHByb3RlY3RlZCBQb3BvdmVyQ29tcG9uZW50ID0gUG9wT3ZlckNvbnRlbnQ7XHJcbiAgcHJvdGVjdGVkIHBvcG92ZXI6IENvbXBvbmVudFJlZjxQb3BPdmVyQ29udGVudD47XHJcbiAgcHJvdGVjdGVkIHZpc2libGU6IGJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLCBwcm90ZWN0ZWQgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcikge31cclxuXHJcbiAgQElucHV0KCdwb3BvdmVyJylcclxuICBjb250ZW50OiBzdHJpbmcgfCBQb3BPdmVyQ29udGVudDtcclxuICBASW5wdXQoKVxyXG4gIHBvcG92ZXJEaXNhYmxlZDogYm9vbGVhbjtcclxuICBASW5wdXQoKVxyXG4gIHBvcG92ZXJBbHdheXM6IGJvb2xlYW47XHJcbiAgQElucHV0KClcclxuICBwb3BvdmVyQW5pbWF0aW9uOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpXHJcbiAgcG9wb3ZlclBsYWNlbWVudDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpXHJcbiAgcG9wb3ZlclRpdGxlOiBzdHJpbmc7XHJcbiAgQElucHV0KClcclxuICBwb3BvdmVyT25Ib3ZlcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpXHJcbiAgcG9wb3ZlckRpc21pc3NUaW1lb3V0OiBudW1iZXIgPSAwO1xyXG5cclxuICBAT3V0cHV0KClcclxuICBvblNob3duID0gbmV3IEV2ZW50RW1pdHRlcjxQb3BPdmVyRGlyZWN0aXZlPigpO1xyXG4gIEBPdXRwdXQoKVxyXG4gIG9uSGlkZGVuID0gbmV3IEV2ZW50RW1pdHRlcjxQb3BPdmVyRGlyZWN0aXZlPigpO1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBFdmVudCBsaXN0ZW5lcnNcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXHJcbiAgc2hvd09ySGlkZU9uQ2xpY2soKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5wb3BvdmVyT25Ib3ZlciB8fCB0aGlzLnBvcG92ZXJEaXNhYmxlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLnRvZ2dsZSgpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZm9jdXNpbicpXHJcbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpXHJcbiAgc2hvd09uSG92ZXIoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMucG9wb3Zlck9uSG92ZXIgfHwgdGhpcy5wb3BvdmVyRGlzYWJsZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zaG93KCk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdmb2N1c291dCcpXHJcbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpXHJcbiAgaGlkZU9uSG92ZXIoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMucG9wb3Zlck9uSG92ZXIgfHwgdGhpcy5wb3BvdmVyRGlzYWJsZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5oaWRlKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtwcm9wZXJ0eU5hbWU6IHN0cmluZ106IFNpbXBsZUNoYW5nZSB9KSB7XHJcbiAgICBpZiAoY2hhbmdlc1sncG9wb3ZlckRpc2FibGVkJ10pIHtcclxuICAgICAgaWYgKGNoYW5nZXNbJ3BvcG92ZXJEaXNhYmxlZCddLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoY2hhbmdlc1sncG9wb3ZlckFsd2F5cyddKSB7XHJcbiAgICAgIGlmIChjaGFuZ2VzWydwb3BvdmVyQWx3YXlzJ10uY3VycmVudFZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5zaG93KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHRvZ2dsZSgpIHtcclxuICAgIGlmICghdGhpcy52aXNpYmxlKSB7XHJcbiAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzaG93KCkge1xyXG4gICAgaWYgKHRoaXMudmlzaWJsZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcclxuICAgIGlmICh0eXBlb2YgdGhpcy5jb250ZW50ID09PSAnc3RyaW5nJykge1xyXG4gICAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0aGlzLlBvcG92ZXJDb21wb25lbnQpO1xyXG4gICAgICBpZiAoIXRoaXMudmlzaWJsZSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5wb3BvdmVyID0gdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5KTtcclxuICAgICAgY29uc3QgcG9wb3ZlciA9IHRoaXMucG9wb3Zlci5pbnN0YW5jZSBhcyBQb3BPdmVyQ29udGVudDtcclxuICAgICAgcG9wb3Zlci5wb3BvdmVyID0gdGhpcztcclxuICAgICAgcG9wb3Zlci5jb250ZW50ID0gdGhpcy5jb250ZW50IGFzIHN0cmluZztcclxuICAgICAgaWYgKHRoaXMucG9wb3ZlclBsYWNlbWVudCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcG9wb3Zlci5wbGFjZW1lbnQgPSB0aGlzLnBvcG92ZXJQbGFjZW1lbnQ7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMucG9wb3ZlckFuaW1hdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcG9wb3Zlci5hbmltYXRpb24gPSB0aGlzLnBvcG92ZXJBbmltYXRpb247XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMucG9wb3ZlclRpdGxlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBwb3BvdmVyLnRpdGxlID0gdGhpcy5wb3BvdmVyVGl0bGU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHBvcG92ZXIub25DbG9zZUZyb21PdXRzaWRlLnN1YnNjcmliZSgoKSA9PiB0aGlzLmhpZGUoKSk7XHJcbiAgICAgIGlmICh0aGlzLnBvcG92ZXJEaXNtaXNzVGltZW91dCA+IDApIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaGlkZSgpLCB0aGlzLnBvcG92ZXJEaXNtaXNzVGltZW91dCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHBvcG92ZXIgPSB0aGlzLmNvbnRlbnQgYXMgUG9wT3ZlckNvbnRlbnQ7XHJcbiAgICAgIHBvcG92ZXIucG9wb3ZlciA9IHRoaXM7XHJcbiAgICAgIGlmICh0aGlzLnBvcG92ZXJQbGFjZW1lbnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHBvcG92ZXIucGxhY2VtZW50ID0gdGhpcy5wb3BvdmVyUGxhY2VtZW50O1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLnBvcG92ZXJBbmltYXRpb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHBvcG92ZXIuYW5pbWF0aW9uID0gdGhpcy5wb3BvdmVyQW5pbWF0aW9uO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLnBvcG92ZXJUaXRsZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcG9wb3Zlci50aXRsZSA9IHRoaXMucG9wb3ZlclRpdGxlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwb3BvdmVyLm9uQ2xvc2VGcm9tT3V0c2lkZS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5oaWRlKCkpO1xyXG4gICAgICBpZiAodGhpcy5wb3BvdmVyRGlzbWlzc1RpbWVvdXQgPiAwKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmhpZGUoKSwgdGhpcy5wb3BvdmVyRGlzbWlzc1RpbWVvdXQpO1xyXG4gICAgICB9XHJcbiAgICAgIHBvcG92ZXIuc2hvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub25TaG93bi5lbWl0KHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgaGlkZSgpIHtcclxuICAgIGlmICghdGhpcy52aXNpYmxlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcclxuICAgIGlmICh0aGlzLnBvcG92ZXIpIHtcclxuICAgICAgdGhpcy5wb3BvdmVyLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5jb250ZW50IGluc3RhbmNlb2YgUG9wT3ZlckNvbnRlbnQpIHtcclxuICAgICAgKHRoaXMuY29udGVudCBhcyBQb3BPdmVyQ29udGVudCkuaGlkZUZyb21Qb3BvdmVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vbkhpZGRlbi5lbWl0KHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RWxlbWVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLnZpZXdDb250YWluZXJSZWYuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxufVxyXG4iXX0=
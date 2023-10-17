// NG2
import { ComponentFactoryResolver, Directive, EventEmitter, HostListener, Input, Output, ViewContainerRef, } from '@angular/core';
import { PopOverContent } from './PopOverContent';
import * as i0 from "@angular/core";
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
    set novoPopover(content) {
        this.content = content;
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
        if (this.visible || (!this.content && !this.popoverHtmlContent)) {
            return;
        }
        this.visible = true;
        if (typeof this.content === 'string' || this.popoverHtmlContent) {
            const factory = this.resolver.resolveComponentFactory(this.PopoverComponent);
            if (!this.visible) {
                return;
            }
            this.popover = this.viewContainerRef.createComponent(factory);
            const popover = this.popover.instance;
            popover.popover = this;
            if (this.content) {
                popover.content = this.content;
            }
            if (this.popoverHtmlContent) {
                popover.htmlContent = this.popoverHtmlContent;
            }
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
PopOverDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: PopOverDirective, deps: [{ token: i0.ViewContainerRef }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.Directive });
PopOverDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: PopOverDirective, selector: "[popover], [novoPopover]", inputs: { content: ["popover", "content"], novoPopover: "novoPopover", popoverHtmlContent: "popoverHtmlContent", popoverDisabled: "popoverDisabled", popoverAlways: "popoverAlways", popoverAnimation: "popoverAnimation", popoverPlacement: "popoverPlacement", popoverTitle: "popoverTitle", popoverOnHover: "popoverOnHover", popoverDismissTimeout: "popoverDismissTimeout" }, outputs: { onShown: "onShown", onHidden: "onHidden" }, host: { listeners: { "click": "showOrHideOnClick()", "focusin": "showOnHover()", "mouseenter": "showOnHover()", "focusout": "hideOnHover()", "mouseleave": "hideOnHover()" } }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: PopOverDirective, decorators: [{
            type: Directive,
            args: [{
                    /**
                     *  [popover] selector retained for backwards compatability, but should be avoived as
                     *  it interferes with the newly added (2023) HTML standard spec popover attribute.
                     */
                    selector: '[popover], [novoPopover]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i0.ComponentFactoryResolver }]; }, propDecorators: { content: [{
                type: Input,
                args: ['popover']
            }], novoPopover: [{
                type: Input,
                args: ['novoPopover']
            }], popoverHtmlContent: [{
                type: Input
            }], popoverDisabled: [{
                type: Input
            }], popoverAlways: [{
                type: Input
            }], popoverAnimation: [{
                type: Input
            }], popoverPlacement: [{
                type: Input
            }], popoverTitle: [{
                type: Input
            }], popoverOnHover: [{
                type: Input
            }], popoverDismissTimeout: [{
                type: Input
            }], onShown: [{
                type: Output
            }], onHidden: [{
                type: Output
            }], showOrHideOnClick: [{
                type: HostListener,
                args: ['click']
            }], showOnHover: [{
                type: HostListener,
                args: ['focusin']
            }, {
                type: HostListener,
                args: ['mouseenter']
            }], hideOnHover: [{
                type: HostListener,
                args: ['focusout']
            }, {
                type: HostListener,
                args: ['mouseleave']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9wT3Zlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3BvcG92ZXIvUG9wT3Zlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUNMLHdCQUF3QixFQUV4QixTQUFTLEVBQ1QsWUFBWSxFQUNaLFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUVOLGdCQUFnQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7O0FBU2xELE1BQU0sT0FBTyxnQkFBZ0I7SUFLM0IsWUFBc0IsZ0JBQWtDLEVBQVksUUFBa0M7UUFBaEYscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFZLGFBQVEsR0FBUixRQUFRLENBQTBCO1FBSjVGLHFCQUFnQixHQUFHLGNBQWMsQ0FBQztRQXlCNUMsbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFFaEMsMEJBQXFCLEdBQVcsQ0FBQyxDQUFDO1FBR2xDLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBb0IsQ0FBQztRQUUvQyxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQW9CLENBQUM7SUE1QnlELENBQUM7SUFJMUcsSUFDSSxXQUFXLENBQUMsT0FBZ0M7UUFDOUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQXVCRCxzREFBc0Q7SUFDdEQsa0JBQWtCO0lBQ2xCLHNEQUFzRDtJQUV0RCxpQkFBaUI7UUFDZixJQUFJLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUMvQyxPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUlELFdBQVc7UUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ2hE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RUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELFVBQVU7UUFDUixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO0lBQ3JELENBQUM7OzhHQWxLVSxnQkFBZ0I7a0dBQWhCLGdCQUFnQjs0RkFBaEIsZ0JBQWdCO2tCQVA1QixTQUFTO21CQUFDO29CQUNUOzs7dUJBR0c7b0JBQ0gsUUFBUSxFQUFFLDBCQUEwQjtpQkFDckM7OElBU0MsT0FBTztzQkFETixLQUFLO3VCQUFDLFNBQVM7Z0JBR1osV0FBVztzQkFEZCxLQUFLO3VCQUFDLGFBQWE7Z0JBS3BCLGtCQUFrQjtzQkFEakIsS0FBSztnQkFHTixlQUFlO3NCQURkLEtBQUs7Z0JBR04sYUFBYTtzQkFEWixLQUFLO2dCQUdOLGdCQUFnQjtzQkFEZixLQUFLO2dCQUdOLGdCQUFnQjtzQkFEZixLQUFLO2dCQUdOLFlBQVk7c0JBRFgsS0FBSztnQkFHTixjQUFjO3NCQURiLEtBQUs7Z0JBR04scUJBQXFCO3NCQURwQixLQUFLO2dCQUlOLE9BQU87c0JBRE4sTUFBTTtnQkFHUCxRQUFRO3NCQURQLE1BQU07Z0JBT1AsaUJBQWlCO3NCQURoQixZQUFZO3VCQUFDLE9BQU87Z0JBVXJCLFdBQVc7c0JBRlYsWUFBWTt1QkFBQyxTQUFTOztzQkFDdEIsWUFBWTt1QkFBQyxZQUFZO2dCQVUxQixXQUFXO3NCQUZWLFlBQVk7dUJBQUMsVUFBVTs7c0JBQ3ZCLFlBQVk7dUJBQUMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHtcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBDb21wb25lbnRSZWYsXG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBvcE92ZXJDb250ZW50IH0gZnJvbSAnLi9Qb3BPdmVyQ29udGVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICAvKipcbiAgICogIFtwb3BvdmVyXSBzZWxlY3RvciByZXRhaW5lZCBmb3IgYmFja3dhcmRzIGNvbXBhdGFiaWxpdHksIGJ1dCBzaG91bGQgYmUgYXZvaXZlZCBhc1xuICAgKiAgaXQgaW50ZXJmZXJlcyB3aXRoIHRoZSBuZXdseSBhZGRlZCAoMjAyMykgSFRNTCBzdGFuZGFyZCBzcGVjIHBvcG92ZXIgYXR0cmlidXRlLlxuICAgKi9cbiAgc2VsZWN0b3I6ICdbcG9wb3Zlcl0sIFtub3ZvUG9wb3Zlcl0nLFxufSlcbmV4cG9ydCBjbGFzcyBQb3BPdmVyRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgcHJvdGVjdGVkIFBvcG92ZXJDb21wb25lbnQgPSBQb3BPdmVyQ29udGVudDtcbiAgcHJvdGVjdGVkIHBvcG92ZXI6IENvbXBvbmVudFJlZjxQb3BPdmVyQ29udGVudD47XG4gIHByb3RlY3RlZCB2aXNpYmxlOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLCBwcm90ZWN0ZWQgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcikge31cblxuICBASW5wdXQoJ3BvcG92ZXInKVxuICBjb250ZW50OiBzdHJpbmcgfCBQb3BPdmVyQ29udGVudDtcbiAgQElucHV0KCdub3ZvUG9wb3ZlcicpXG4gIHNldCBub3ZvUG9wb3Zlcihjb250ZW50OiBzdHJpbmcgfCBQb3BPdmVyQ29udGVudCkge1xuICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XG4gIH1cbiAgQElucHV0KClcbiAgcG9wb3Zlckh0bWxDb250ZW50OiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHBvcG92ZXJEaXNhYmxlZDogYm9vbGVhbjtcbiAgQElucHV0KClcbiAgcG9wb3ZlckFsd2F5czogYm9vbGVhbjtcbiAgQElucHV0KClcbiAgcG9wb3ZlckFuaW1hdGlvbjogYm9vbGVhbjtcbiAgQElucHV0KClcbiAgcG9wb3ZlclBsYWNlbWVudDogc3RyaW5nO1xuICBASW5wdXQoKVxuICBwb3BvdmVyVGl0bGU6IHN0cmluZztcbiAgQElucHV0KClcbiAgcG9wb3Zlck9uSG92ZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KClcbiAgcG9wb3ZlckRpc21pc3NUaW1lb3V0OiBudW1iZXIgPSAwO1xuXG4gIEBPdXRwdXQoKVxuICBvblNob3duID0gbmV3IEV2ZW50RW1pdHRlcjxQb3BPdmVyRGlyZWN0aXZlPigpO1xuICBAT3V0cHV0KClcbiAgb25IaWRkZW4gPSBuZXcgRXZlbnRFbWl0dGVyPFBvcE92ZXJEaXJlY3RpdmU+KCk7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEV2ZW50IGxpc3RlbmVyc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBzaG93T3JIaWRlT25DbGljaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wb3BvdmVyT25Ib3ZlciB8fCB0aGlzLnBvcG92ZXJEaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnRvZ2dsZSgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZm9jdXNpbicpXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKVxuICBzaG93T25Ib3ZlcigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucG9wb3Zlck9uSG92ZXIgfHwgdGhpcy5wb3BvdmVyRGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zaG93KCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdmb2N1c291dCcpXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxuICBoaWRlT25Ib3ZlcigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucG9wb3Zlck9uSG92ZXIgfHwgdGhpcy5wb3BvdmVyRGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5oaWRlKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtwcm9wZXJ0eU5hbWU6IHN0cmluZ106IFNpbXBsZUNoYW5nZSB9KSB7XG4gICAgaWYgKGNoYW5nZXMucG9wb3ZlckRpc2FibGVkKSB7XG4gICAgICBpZiAoY2hhbmdlcy5wb3BvdmVyRGlzYWJsZWQuY3VycmVudFZhbHVlKSB7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5wb3BvdmVyQWx3YXlzKSB7XG4gICAgICBpZiAoY2hhbmdlcy5wb3BvdmVyQWx3YXlzLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgaWYgKCF0aGlzLnZpc2libGUpIHtcbiAgICAgIHRoaXMuc2hvdygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG4gIH1cblxuICBzaG93KCkge1xuICAgIGlmICh0aGlzLnZpc2libGUgfHwgKCF0aGlzLmNvbnRlbnQgJiYgIXRoaXMucG9wb3Zlckh0bWxDb250ZW50KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmNvbnRlbnQgPT09ICdzdHJpbmcnIHx8IHRoaXMucG9wb3Zlckh0bWxDb250ZW50KSB7XG4gICAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0aGlzLlBvcG92ZXJDb21wb25lbnQpO1xuICAgICAgaWYgKCF0aGlzLnZpc2libGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnBvcG92ZXIgPSB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnkpO1xuICAgICAgY29uc3QgcG9wb3ZlciA9IHRoaXMucG9wb3Zlci5pbnN0YW5jZSBhcyBQb3BPdmVyQ29udGVudDtcbiAgICAgIHBvcG92ZXIucG9wb3ZlciA9IHRoaXM7XG4gICAgICBpZiAodGhpcy5jb250ZW50KSB7XG4gICAgICAgIHBvcG92ZXIuY29udGVudCA9IHRoaXMuY29udGVudCBhcyBzdHJpbmc7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5wb3BvdmVySHRtbENvbnRlbnQpIHtcbiAgICAgICAgcG9wb3Zlci5odG1sQ29udGVudCA9IHRoaXMucG9wb3Zlckh0bWxDb250ZW50O1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucG9wb3ZlclBsYWNlbWVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHBvcG92ZXIucGxhY2VtZW50ID0gdGhpcy5wb3BvdmVyUGxhY2VtZW50O1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucG9wb3ZlckFuaW1hdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHBvcG92ZXIuYW5pbWF0aW9uID0gdGhpcy5wb3BvdmVyQW5pbWF0aW9uO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucG9wb3ZlclRpdGxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcG9wb3Zlci50aXRsZSA9IHRoaXMucG9wb3ZlclRpdGxlO1xuICAgICAgfVxuXG4gICAgICBwb3BvdmVyLm9uQ2xvc2VGcm9tT3V0c2lkZS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5oaWRlKCkpO1xuICAgICAgaWYgKHRoaXMucG9wb3ZlckRpc21pc3NUaW1lb3V0ID4gMCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaGlkZSgpLCB0aGlzLnBvcG92ZXJEaXNtaXNzVGltZW91dCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHBvcG92ZXIgPSB0aGlzLmNvbnRlbnQgYXMgUG9wT3ZlckNvbnRlbnQ7XG4gICAgICBwb3BvdmVyLnBvcG92ZXIgPSB0aGlzO1xuICAgICAgaWYgKHRoaXMucG9wb3ZlclBsYWNlbWVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHBvcG92ZXIucGxhY2VtZW50ID0gdGhpcy5wb3BvdmVyUGxhY2VtZW50O1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucG9wb3ZlckFuaW1hdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHBvcG92ZXIuYW5pbWF0aW9uID0gdGhpcy5wb3BvdmVyQW5pbWF0aW9uO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucG9wb3ZlclRpdGxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcG9wb3Zlci50aXRsZSA9IHRoaXMucG9wb3ZlclRpdGxlO1xuICAgICAgfVxuXG4gICAgICBwb3BvdmVyLm9uQ2xvc2VGcm9tT3V0c2lkZS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5oaWRlKCkpO1xuICAgICAgaWYgKHRoaXMucG9wb3ZlckRpc21pc3NUaW1lb3V0ID4gMCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaGlkZSgpLCB0aGlzLnBvcG92ZXJEaXNtaXNzVGltZW91dCk7XG4gICAgICB9XG4gICAgICBwb3BvdmVyLnNob3coKTtcbiAgICB9XG5cbiAgICB0aGlzLm9uU2hvd24uZW1pdCh0aGlzKTtcbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgaWYgKCF0aGlzLnZpc2libGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5wb3BvdmVyKSB7XG4gICAgICB0aGlzLnBvcG92ZXIuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbnRlbnQgaW5zdGFuY2VvZiBQb3BPdmVyQ29udGVudCkge1xuICAgICAgKHRoaXMuY29udGVudCBhcyBQb3BPdmVyQ29udGVudCkuaGlkZUZyb21Qb3BvdmVyKCk7XG4gICAgfVxuXG4gICAgdGhpcy5vbkhpZGRlbi5lbWl0KHRoaXMpO1xuICB9XG5cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy52aWV3Q29udGFpbmVyUmVmLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgfVxufVxuIl19
// NG
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Directive, ElementRef, HostListener, Input, ViewContainerRef } from '@angular/core';
// APP
import { NovoTooltip } from './Tooltip.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
export class TooltipDirective {
    constructor(overlay, viewContainerRef, elementRef) {
        this.overlay = overlay;
        this.viewContainerRef = viewContainerRef;
        this.elementRef = elementRef;
        this.position = 'top';
        this.type = 'normal';
        this.active = true;
        this.removeArrow = false;
        this.autoPosition = false;
    }
    isPosition(position) {
        return position.toLowerCase() === (this.position || '').toLowerCase();
    }
    isType(type) {
        return type.toLowerCase() === (this.type || '').toLowerCase();
    }
    isSize(size) {
        return size.toLowerCase() === (this.size || '').toLowerCase();
    }
    onMouseEnter() {
        if (this.tooltip && this.active && !this.always) {
            this.show();
        }
    }
    onMouseLeave() {
        if (this.overlayRef && !this.always) {
            this.hide();
            this.overlayRef.dispose();
        }
    }
    ngOnInit() {
        if (this.tooltip && this.always && this.active) {
            this.show();
        }
    }
    ngOnDestroy() {
        if (this.overlayRef && !this.always) {
            this.hide();
            this.overlayRef.dispose();
        }
    }
    show() {
        const overlayState = new OverlayConfig();
        overlayState.positionStrategy = this.getPosition();
        if (this.always) {
            overlayState.scrollStrategy = this.overlay.scrollStrategies.reposition();
        }
        else {
            overlayState.scrollStrategy = this.overlay.scrollStrategies.close();
        }
        overlayState.scrollStrategy.enable();
        this.overlayRef = this.overlay.create(overlayState);
        this.overlayRef.detach();
        this.portal = this.portal || new ComponentPortal(NovoTooltip, this.viewContainerRef);
        const tooltipInstance = this.overlayRef.attach(this.portal).instance;
        tooltipInstance.message = this.tooltip;
        tooltipInstance.tooltipType = this.type;
        tooltipInstance.rounded = this.rounded;
        tooltipInstance.size = this.size;
        tooltipInstance.preline = this.preline;
        tooltipInstance.noAnimate = this.noAnimate;
        tooltipInstance.position = this.removeArrow ? 'no-arrow' : this.position;
        tooltipInstance.isHTML = this.isHTML;
        tooltipInstance.bounce = this.bounce;
    }
    hide() {
        if (this.overlayRef) {
            this.overlayRef.detach();
        }
    }
    getPosition() {
        let strategy;
        let defaultPosition;
        let offsetX;
        let offsetY;
        let autoPositions = [
            { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetX: 0, offsetY: 8 },
            { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetX: 0, offsetY: 8 },
            { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: 8, offsetY: 0 },
            { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -8, offsetY: 0 },
            { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetX: 0, offsetY: -8 },
            { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetX: 0, offsetY: 8 },
            { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetX: 0, offsetY: -8 },
            { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetX: 0, offsetY: -8 },
            { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetX: 8, offsetY: -8 },
            { originX: 'start', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetX: 8, offsetY: 8 },
            { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetX: -8, offsetY: -8 },
            { originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetX: -8, offsetY: 8 },
        ];
        switch (this.position) {
            case 'right':
                defaultPosition = { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center' };
                offsetX = 8;
                offsetY = 0;
                break;
            case 'bottom':
                defaultPosition = { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top' };
                offsetX = 0;
                offsetY = 8;
                break;
            case 'top':
                defaultPosition = { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom' };
                offsetX = 0;
                offsetY = -8;
                break;
            case 'left':
                defaultPosition = { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center' };
                offsetX = -8;
                offsetY = 0;
                break;
            case 'top-left':
                defaultPosition = { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'bottom' };
                offsetX = 8;
                offsetY = -8;
                break;
            case 'bottom-left':
                defaultPosition = { originX: 'start', originY: 'bottom', overlayX: 'end', overlayY: 'top' };
                offsetX = 8;
                offsetY = 8;
                break;
            case 'top-right':
                defaultPosition = { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'bottom' };
                offsetX = -8;
                offsetY = -8;
                break;
            case 'bottom-right':
                defaultPosition = { originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'top' };
                offsetX = -8;
                offsetY = 8;
                break;
            default:
                break;
        }
        const allPositions = this.autoPosition ? [defaultPosition].concat(autoPositions) : [defaultPosition];
        strategy = this.overlay
            .position()
            .flexibleConnectedTo(this.elementRef)
            .withFlexibleDimensions(false)
            .withDefaultOffsetX(offsetX)
            .withDefaultOffsetY(offsetY)
            .withPositions(allPositions);
        return strategy;
    }
}
TooltipDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: TooltipDirective, deps: [{ token: i1.Overlay }, { token: i0.ViewContainerRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
TooltipDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.0", type: TooltipDirective, selector: "[tooltip]", inputs: { tooltip: "tooltip", position: ["tooltipPosition", "position"], type: ["tooltipType", "type"], size: ["tooltipSize", "size"], bounce: ["tooltipBounce", "bounce"], noAnimate: ["tooltipNoAnimate", "noAnimate"], rounded: ["tooltipRounded", "rounded"], always: ["tooltipAlways", "always"], active: ["tooltipActive", "active"], preline: ["tooltipPreline", "preline"], removeArrow: ["removeTooltipArrow", "removeArrow"], autoPosition: ["tooltipAutoPosition", "autoPosition"], isHTML: ["tooltipIsHTML", "isHTML"] }, host: { listeners: { "mouseenter": "onMouseEnter()", "mouseleave": "onMouseLeave()" }, properties: { "attr.data-hint": "tooltip" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: TooltipDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[tooltip]',
                    host: {
                        '[attr.data-hint]': 'tooltip',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i0.ViewContainerRef }, { type: i0.ElementRef }]; }, propDecorators: { tooltip: [{
                type: Input
            }], position: [{
                type: Input,
                args: ['tooltipPosition']
            }], type: [{
                type: Input,
                args: ['tooltipType']
            }], size: [{
                type: Input,
                args: ['tooltipSize']
            }], bounce: [{
                type: Input,
                args: ['tooltipBounce']
            }], noAnimate: [{
                type: Input,
                args: ['tooltipNoAnimate']
            }], rounded: [{
                type: Input,
                args: ['tooltipRounded']
            }], always: [{
                type: Input,
                args: ['tooltipAlways']
            }], active: [{
                type: Input,
                args: ['tooltipActive']
            }], preline: [{
                type: Input,
                args: ['tooltipPreline']
            }], removeArrow: [{
                type: Input,
                args: ['removeTooltipArrow']
            }], autoPosition: [{
                type: Input,
                args: ['tooltipAutoPosition']
            }], isHTML: [{
                type: Input,
                args: ['tooltipIsHTML']
            }], onMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }], onMouseLeave: [{
                type: HostListener,
                args: ['mouseleave']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9vbHRpcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy90b29sdGlwL1Rvb2x0aXAuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEtBQUs7QUFDTCxPQUFPLEVBQXdELE9BQU8sRUFBRSxhQUFhLEVBQWMsTUFBTSxzQkFBc0IsQ0FBQztBQUNoSSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEgsTUFBTTtBQUNOLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7O0FBUWxELE1BQU0sT0FBTyxnQkFBZ0I7SUFnQzNCLFlBQXNCLE9BQWdCLEVBQVUsZ0JBQWtDLEVBQVUsVUFBc0I7UUFBNUYsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBNUJsSCxhQUFRLEdBQVcsS0FBSyxDQUFDO1FBRXpCLFNBQUksR0FBVyxRQUFRLENBQUM7UUFZeEIsV0FBTSxHQUFZLElBQUksQ0FBQztRQUl2QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUU3QixpQkFBWSxHQUFZLEtBQUssQ0FBQztJQVF1RixDQUFDO0lBQ3RILFVBQVUsQ0FBQyxRQUFnQjtRQUN6QixPQUFPLFFBQVEsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEUsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFZO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMs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RUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUU7WUFDdEcsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRTtZQUNuRyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUU7WUFDcEcsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFO1lBQ2hHLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRTtZQUNsRyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQ2pHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFO1lBQ25HLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFB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c2l0aW9uLCBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3ksIE92ZXJsYXksIE92ZXJsYXlDb25maWcsIE92ZXJsYXlSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21wb25lbnRQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIEFQUFxuaW1wb3J0IHsgTm92b1Rvb2x0aXAgfSBmcm9tICcuL1Rvb2x0aXAuY29tcG9uZW50JztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3Rvb2x0aXBdJyxcbiAgaG9zdDoge1xuICAgICdbYXR0ci5kYXRhLWhpbnRdJzogJ3Rvb2x0aXAnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBUb29sdGlwRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQge1xuICBASW5wdXQoKVxuICB0b29sdGlwOiBzdHJpbmc7XG4gIEBJbnB1dCgndG9vbHRpcFBvc2l0aW9uJylcbiAgcG9zaXRpb246IHN0cmluZyA9ICd0b3AnO1xuICBASW5wdXQoJ3Rvb2x0aXBUeXBlJylcbiAgdHlwZTogc3RyaW5nID0gJ25vcm1hbCc7XG4gIEBJbnB1dCgndG9vbHRpcFNpemUnKVxuICBzaXplOiBzdHJpbmc7XG4gIEBJbnB1dCgndG9vbHRpcEJvdW5jZScpXG4gIGJvdW5jZTogYm9vbGVhbjtcbiAgQElucHV0KCd0b29sdGlwTm9BbmltYXRlJylcbiAgbm9BbmltYXRlOiBib29sZWFuO1xuICBASW5wdXQoJ3Rvb2x0aXBSb3VuZGVkJylcbiAgcm91bmRlZDogYm9vbGVhbjtcbiAgQElucHV0KCd0b29sdGlwQWx3YXlzJylcbiAgYWx3YXlzOiBib29sZWFuO1xuICBASW5wdXQoJ3Rvb2x0aXBBY3RpdmUnKVxuICBhY3RpdmU6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoJ3Rvb2x0aXBQcmVsaW5lJylcbiAgcHJlbGluZTogYm9vbGVhbjtcbiAgQElucHV0KCdyZW1vdmVUb29sdGlwQXJyb3cnKVxuICByZW1vdmVBcnJvdzogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoJ3Rvb2x0aXBBdXRvUG9zaXRpb24nKVxuICBhdXRvUG9zaXRpb246IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCd0b29sdGlwSXNIVE1MJylcbiAgaXNIVE1MOiBib29sZWFuO1xuXG4gIHByaXZhdGUgdG9vbHRpcEluc3RhbmNlOiBOb3ZvVG9vbHRpcCB8IG51bGw7XG4gIHByaXZhdGUgcG9ydGFsOiBDb21wb25lbnRQb3J0YWw8Tm92b1Rvb2x0aXA+O1xuICBwcml2YXRlIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWY7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIG92ZXJsYXk6IE92ZXJsYXksIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZiwgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxuICBpc1Bvc2l0aW9uKHBvc2l0aW9uOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gcG9zaXRpb24udG9Mb3dlckNhc2UoKSA9PT0gKHRoaXMucG9zaXRpb24gfHwgJycpLnRvTG93ZXJDYXNlKCk7XG4gIH1cblxuICBpc1R5cGUodHlwZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHR5cGUudG9Mb3dlckNhc2UoKSA9PT0gKHRoaXMudHlwZSB8fCAnJykudG9Mb3dlckNhc2UoKTtcbiAgfVxuXG4gIGlzU2l6ZShzaXplOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gc2l6ZS50b0xvd2VyQ2FzZSgpID09PSAodGhpcy5zaXplIHx8ICcnKS50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpXG4gIG9uTW91c2VFbnRlcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy50b29sdGlwICYmIHRoaXMuYWN0aXZlICYmICF0aGlzLmFsd2F5cykge1xuICAgICAgdGhpcy5zaG93KCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpXG4gIG9uTW91c2VMZWF2ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vdmVybGF5UmVmICYmICF0aGlzLmFsd2F5cykge1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICB0aGlzLm92ZXJsYXlSZWYuZGlzcG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnRvb2x0aXAgJiYgdGhpcy5hbHdheXMgJiYgdGhpcy5hY3RpdmUpIHtcbiAgICAgIHRoaXMuc2hvdygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm92ZXJsYXlSZWYgJiYgIXRoaXMuYWx3YXlzKSB7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICAgIHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzaG93KCk6IHZvaWQge1xuICAgIGNvbnN0IG92ZXJsYXlTdGF0ZSA9IG5ldyBPdmVybGF5Q29uZmlnKCk7XG4gICAgb3ZlcmxheVN0YXRlLnBvc2l0aW9uU3RyYXRlZ3kgPSB0aGlzLmdldFBvc2l0aW9uKCk7XG5cbiAgICBpZiAodGhpcy5hbHdheXMpIHtcbiAgICAgIG92ZXJsYXlTdGF0ZS5zY3JvbGxTdHJhdGVneSA9IHRoaXMub3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLnJlcG9zaXRpb24oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3ZlcmxheVN0YXRlLnNjcm9sbFN0cmF0ZWd5ID0gdGhpcy5vdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMuY2xvc2UoKTtcbiAgICB9XG4gICAgb3ZlcmxheVN0YXRlLnNjcm9sbFN0cmF0ZWd5LmVuYWJsZSgpO1xuXG4gICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5vdmVybGF5LmNyZWF0ZShvdmVybGF5U3RhdGUpO1xuXG4gICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaCgpO1xuICAgIHRoaXMucG9ydGFsID0gdGhpcy5wb3J0YWwgfHwgbmV3IENvbXBvbmVudFBvcnRhbChOb3ZvVG9vbHRpcCwgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcblxuICAgIGNvbnN0IHRvb2x0aXBJbnN0YW5jZSA9IHRoaXMub3ZlcmxheVJlZi5hdHRhY2godGhpcy5wb3J0YWwpLmluc3RhbmNlO1xuICAgIHRvb2x0aXBJbnN0YW5jZS5tZXNzYWdlID0gdGhpcy50b29sdGlwO1xuICAgIHRvb2x0aXBJbnN0YW5jZS50b29sdGlwVHlwZSA9IHRoaXMudHlwZTtcbiAgICB0b29sdGlwSW5zdGFuY2Uucm91bmRlZCA9IHRoaXMucm91bmRlZDtcbiAgICB0b29sdGlwSW5zdGFuY2Uuc2l6ZSA9IHRoaXMuc2l6ZTtcbiAgICB0b29sdGlwSW5zdGFuY2UucHJlbGluZSA9IHRoaXMucHJlbGluZTtcbiAgICB0b29sdGlwSW5zdGFuY2Uubm9BbmltYXRlID0gdGhpcy5ub0FuaW1hdGU7XG4gICAgdG9vbHRpcEluc3RhbmNlLnBvc2l0aW9uID0gdGhpcy5yZW1vdmVBcnJvdyA/ICduby1hcnJvdycgOiB0aGlzLnBvc2l0aW9uO1xuICAgIHRvb2x0aXBJbnN0YW5jZS5pc0hUTUwgPSB0aGlzLmlzSFRNTDtcbiAgICB0b29sdGlwSW5zdGFuY2UuYm91bmNlID0gdGhpcy5ib3VuY2U7XG4gIH1cblxuICBwcml2YXRlIGhpZGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub3ZlcmxheVJlZikge1xuICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0UG9zaXRpb24oKTogRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5IHtcbiAgICBsZXQgc3RyYXRlZ3k6IEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneTtcbiAgICBsZXQgZGVmYXVsdFBvc2l0aW9uOiBDb25uZWN0ZWRQb3NpdGlvbjtcbiAgICBsZXQgb2Zmc2V0WDogbnVtYmVyO1xuICAgIGxldCBvZmZzZXRZOiBudW1iZXI7XG4gICAgbGV0IGF1dG9Qb3NpdGlvbnM6IENvbm5lY3RlZFBvc2l0aW9uW10gPSBbXG4gICAgICB7IG9yaWdpblg6ICdjZW50ZXInLCBvcmlnaW5ZOiAnYm90dG9tJywgb3ZlcmxheVg6ICdjZW50ZXInLCBvdmVybGF5WTogJ3RvcCcsIG9mZnNldFg6IDAsIG9mZnNldFk6IDggfSxcbiAgICAgIHsgb3JpZ2luWDogJ2VuZCcsIG9yaWdpblk6ICdib3R0b20nLCBvdmVybGF5WDogJ2VuZCcsIG92ZXJsYXlZOiAndG9wJywgb2Zmc2V0WDogMCwgb2Zmc2V0WTogOCB9LFxuICAgICAgeyBvcmlnaW5YOiAnZW5kJywgb3JpZ2luWTogJ2NlbnRlcicsIG92ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ2NlbnRlcicsIG9mZnNldFg6IDgsIG9mZnNldFk6IDAgfSxcbiAgICAgIHsgb3JpZ2luWDogJ3N0YXJ0Jywgb3JpZ2luWTogJ2NlbnRlcicsIG92ZXJsYXlYOiAnZW5kJywgb3ZlcmxheVk6ICdjZW50ZXInLCBvZmZzZXRYOiAtOCwgb2Zmc2V0WTogMCB9LFxuICAgICAgeyBvcmlnaW5YOiAnY2VudGVyJywgb3JpZ2luWTogJ3RvcCcsIG92ZXJsYXlYOiAnY2VudGVyJywgb3ZlcmxheVk6ICdib3R0b20nLCBvZmZzZXRYOiAwLCBvZmZzZXRZOiAtOCB9LFxuICAgICAgeyBvcmlnaW5YOiAnc3RhcnQnLCBvcmlnaW5ZOiAnYm90dG9tJywgb3ZlcmxheVg6ICdzdGFydCcsIG92ZXJsYXlZOiAndG9wJywgb2Zmc2V0WDogMCwgb2Zmc2V0WTogOCB9LFxuICAgICAgeyBvcmlnaW5YOiAnc3RhcnQnLCBvcmlnaW5ZOiAndG9wJywgb3ZlcmxheVg6ICdzdGFydCcsIG92ZXJsYXlZOiAnYm90dG9tJywgb2Zmc2V0WDogMCwgb2Zmc2V0WTogLTggfSxcbiAgICAgIHsgb3JpZ2luWDogJ2VuZCcsIG9yaWdpblk6ICd0b3AnLCBvdmVybGF5WDogJ2VuZCcsIG92ZXJsYXlZOiAnYm90dG9tJywgb2Zmc2V0WDogMCwgb2Zmc2V0WTogLTggfSxcbiAgICAgIHsgb3JpZ2luWDogJ3N0YXJ0Jywgb3JpZ2luWTogJ3RvcCcsIG92ZXJsYXlYOiAnZW5kJywgb3ZlcmxheVk6ICdib3R0b20nLCBvZmZzZXRYOiA4LCBvZmZzZXRZOiAtOCB9LFxuICAgICAgeyBvcmlnaW5YOiAnc3RhcnQnLCBvcmlnaW5ZOiAnYm90dG9tJywgb3ZlcmxheVg6ICdlbmQnLCBvdmVybGF5WTogJ3RvcCcsIG9mZnNldFg6IDgsIG9mZnNldFk6IDggfSxcbiAgICAgIHsgb3JpZ2luWDogJ2VuZCcsIG9yaWdpblk6ICd0b3AnLCBvdmVybGF5WDogJ3N0YXJ0Jywgb3ZlcmxheVk6ICdib3R0b20nLCBvZmZzZXRYOiAtOCwgb2Zmc2V0WTogLTggfSxcbiAgICAgIHsgb3JpZ2luWDogJ2VuZCcsIG9yaWdpblk6ICdib3R0b20nLCBvdmVybGF5WDogJ3N0YXJ0Jywgb3ZlcmxheVk6ICd0b3AnLCBvZmZzZXRYOiAtOCwgb2Zmc2V0WTogOCB9LFxuICAgIF07XG5cbiAgICBzd2l0Y2ggKHRoaXMucG9zaXRpb24pIHtcbiAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgZGVmYXVsdFBvc2l0aW9uID0geyBvcmlnaW5YOiAnZW5kJywgb3JpZ2luWTogJ2NlbnRlcicsIG92ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ2NlbnRlcicgfTtcbiAgICAgICAgb2Zmc2V0WCA9IDg7XG4gICAgICAgIG9mZnNldFkgPSAwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgIGRlZmF1bHRQb3NpdGlvbiA9IHsgb3JpZ2luWDogJ2NlbnRlcicsIG9yaWdpblk6ICdib3R0b20nLCBvdmVybGF5WDogJ2NlbnRlcicsIG92ZXJsYXlZOiAndG9wJyB9O1xuICAgICAgICBvZmZzZXRYID0gMDtcbiAgICAgICAgb2Zmc2V0WSA9IDg7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgZGVmYXVsdFBvc2l0aW9uID0geyBvcmlnaW5YOiAnY2VudGVyJywgb3JpZ2luWTogJ3RvcCcsIG92ZXJsYXlYOiAnY2VudGVyJywgb3ZlcmxheVk6ICdib3R0b20nIH07XG4gICAgICAgIG9mZnNldFggPSAwO1xuICAgICAgICBvZmZzZXRZID0gLTg7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgIGRlZmF1bHRQb3NpdGlvbiA9IHsgb3JpZ2luWDogJ3N0YXJ0Jywgb3JpZ2luWTogJ2NlbnRlcicsIG92ZXJsYXlYOiAnZW5kJywgb3ZlcmxheVk6ICdjZW50ZXInIH07XG4gICAgICAgIG9mZnNldFggPSAtODtcbiAgICAgICAgb2Zmc2V0WSA9IDA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndG9wLWxlZnQnOlxuICAgICAgICBkZWZhdWx0UG9zaXRpb24gPSB7IG9yaWdpblg6ICdzdGFydCcsIG9yaWdpblk6ICd0b3AnLCBvdmVybGF5WDogJ2VuZCcsIG92ZXJsYXlZOiAnYm90dG9tJyB9O1xuICAgICAgICBvZmZzZXRYID0gODtcbiAgICAgICAgb2Zmc2V0WSA9IC04O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2JvdHRvbS1sZWZ0JzpcbiAgICAgICAgZGVmYXVsdFBvc2l0aW9uID0geyBvcmlnaW5YOiAnc3RhcnQnLCBvcmlnaW5ZOiAnYm90dG9tJywgb3ZlcmxheVg6ICdlbmQnLCBvdmVybGF5WTogJ3RvcCcgfTtcbiAgICAgICAgb2Zmc2V0WCA9IDg7XG4gICAgICAgIG9mZnNldFkgPSA4O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RvcC1yaWdodCc6XG4gICAgICAgIGRlZmF1bHRQb3NpdGlvbiA9IHsgb3JpZ2luWDogJ2VuZCcsIG9yaWdpblk6ICd0b3AnLCBvdmVybGF5WDogJ3N0YXJ0Jywgb3ZlcmxheVk6ICdib3R0b20nIH07XG4gICAgICAgIG9mZnNldFggPSAtODtcbiAgICAgICAgb2Zmc2V0WSA9IC04O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2JvdHRvbS1yaWdodCc6XG4gICAgICAgIGRlZmF1bHRQb3NpdGlvbiA9IHsgb3JpZ2luWDogJ2VuZCcsIG9yaWdpblk6ICdib3R0b20nLCBvdmVybGF5WDogJ3N0YXJ0Jywgb3ZlcmxheVk6ICd0b3AnIH07XG4gICAgICAgIG9mZnNldFggPSAtODtcbiAgICAgICAgb2Zmc2V0WSA9IDg7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY29uc3QgYWxsUG9zaXRpb25zID0gdGhpcy5hdXRvUG9zaXRpb24gPyBbZGVmYXVsdFBvc2l0aW9uXS5jb25jYXQoYXV0b1Bvc2l0aW9ucykgOiBbZGVmYXVsdFBvc2l0aW9uXTtcbiAgICBzdHJhdGVneSA9IHRoaXMub3ZlcmxheVxuICAgICAgLnBvc2l0aW9uKClcbiAgICAgIC5mbGV4aWJsZUNvbm5lY3RlZFRvKHRoaXMuZWxlbWVudFJlZilcbiAgICAgIC53aXRoRmxleGlibGVEaW1lbnNpb25zKGZhbHNlKVxuICAgICAgLndpdGhEZWZhdWx0T2Zmc2V0WChvZmZzZXRYKVxuICAgICAgLndpdGhEZWZhdWx0T2Zmc2V0WShvZmZzZXRZKVxuICAgICAgLndpdGhQb3NpdGlvbnMoYWxsUG9zaXRpb25zKTtcbiAgICByZXR1cm4gc3RyYXRlZ3k7XG4gIH1cbn1cbiJdfQ==
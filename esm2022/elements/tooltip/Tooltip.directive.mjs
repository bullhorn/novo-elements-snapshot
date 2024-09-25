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
        this.autoPosition = true;
        this.closeOnClick = false;
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
    onclick() {
        if (this.overlayRef && !this.always && this.closeOnClick) {
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
            { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetX: 0, offsetY: 12 },
            { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetX: 0, offsetY: 12 },
            { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: 12, offsetY: 0 },
            { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -12, offsetY: 0 },
            { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetX: 0, offsetY: -12 },
            { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetX: 0, offsetY: 12 },
            { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetX: 0, offsetY: -12 },
            { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetX: 0, offsetY: -12 },
            { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetX: 12, offsetY: -12 },
            { originX: 'start', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetX: 12, offsetY: 12 },
            { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetX: -12, offsetY: -12 },
            { originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetX: -12, offsetY: 12 },
        ];
        switch (this.position) {
            case 'right':
                defaultPosition = { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center' };
                offsetX = 12;
                offsetY = 0;
                break;
            case 'bottom':
                defaultPosition = { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top' };
                offsetX = 0;
                offsetY = 12;
                break;
            case 'top':
                defaultPosition = { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom' };
                offsetX = 0;
                offsetY = -12;
                break;
            case 'left':
                defaultPosition = { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center' };
                offsetX = -12;
                offsetY = 0;
                break;
            case 'top-left':
                defaultPosition = { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'bottom' };
                offsetX = 12;
                offsetY = -12;
                break;
            case 'bottom-left':
                defaultPosition = { originX: 'start', originY: 'bottom', overlayX: 'end', overlayY: 'top' };
                offsetX = 12;
                offsetY = 12;
                break;
            case 'top-right':
                defaultPosition = { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'bottom' };
                offsetX = -12;
                offsetY = -12;
                break;
            case 'bottom-right':
                defaultPosition = { originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'top' };
                offsetX = -12;
                offsetY = 12;
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: TooltipDirective, deps: [{ token: i1.Overlay }, { token: i0.ViewContainerRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.2.3", type: TooltipDirective, selector: "[tooltip]", inputs: { tooltip: "tooltip", position: ["tooltipPosition", "position"], type: ["tooltipType", "type"], size: ["tooltipSize", "size"], bounce: ["tooltipBounce", "bounce"], noAnimate: ["tooltipNoAnimate", "noAnimate"], rounded: ["tooltipRounded", "rounded"], always: ["tooltipAlways", "always"], active: ["tooltipActive", "active"], preline: ["tooltipPreline", "preline"], removeArrow: ["removeTooltipArrow", "removeArrow"], autoPosition: ["tooltipAutoPosition", "autoPosition"], isHTML: ["tooltipIsHTML", "isHTML"], closeOnClick: ["tooltipCloseOnClick", "closeOnClick"] }, host: { listeners: { "mouseenter": "onMouseEnter()", "mouseleave": "onMouseLeave()", "click": "onclick()", "blur": "hide()" }, properties: { "attr.data-hint": "tooltip" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: TooltipDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[tooltip]',
                    host: {
                        '[attr.data-hint]': 'tooltip',
                    },
                }]
        }], ctorParameters: () => [{ type: i1.Overlay }, { type: i0.ViewContainerRef }, { type: i0.ElementRef }], propDecorators: { tooltip: [{
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
            }], closeOnClick: [{
                type: Input,
                args: ['tooltipCloseOnClick']
            }], onMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }], onMouseLeave: [{
                type: HostListener,
                args: ['mouseleave']
            }], onclick: [{
                type: HostListener,
                args: ['click']
            }], hide: [{
                type: HostListener,
                args: ['blur']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9vbHRpcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy90b29sdGlwL1Rvb2x0aXAuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEtBQUs7QUFDTCxPQUFPLEVBQXdELE9BQU8sRUFBRSxhQUFhLEVBQWMsTUFBTSxzQkFBc0IsQ0FBQztBQUNoSSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEgsTUFBTTtBQUNOLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7O0FBUWxELE1BQU0sT0FBTyxnQkFBZ0I7SUFrQzNCLFlBQXNCLE9BQWdCLEVBQVUsZ0JBQWtDLEVBQVUsVUFBc0I7UUFBNUYsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBOUJsSCxhQUFRLEdBQVcsS0FBSyxDQUFDO1FBRXpCLFNBQUksR0FBVyxRQUFRLENBQUM7UUFZeEIsV0FBTSxHQUFZLElBQUksQ0FBQztRQUl2QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUU3QixpQkFBWSxHQUFZLElBQUksQ0FBQztRQUk3QixpQkFBWSxHQUFZLEtBQUssQ0FBQztJQU11RixDQUFDO0lBQ3RILFVBQVUsQ0FBQyxRQUFnQjtRQUN6QixPQUFPLFFBQVEsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEUsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFZO1FBQ2pCLE9BQU8sSUFBSSxD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RUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRTtZQUNyRyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUU7WUFDdEcsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3ZHLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEcsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3JHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNqRyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDcEcsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFB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QixNQUFNO3NCQURMLEtBQUs7dUJBQUMsZUFBZTtnQkFHdEIsT0FBTztzQkFETixLQUFLO3VCQUFDLGdCQUFnQjtnQkFHdkIsV0FBVztzQkFEVixLQUFLO3VCQUFDLG9CQUFvQjtnQkFHM0IsWUFBWTtzQkFEWCxLQUFLO3VCQUFDLHFCQUFxQjtnQkFHNUIsTUFBTTtzQkFETCxLQUFLO3VCQUFDLGVBQWU7Z0JBR3RCLFlBQVk7c0JBRFgsS0FBSzt1QkFBQyxxQkFBcUI7Z0JBcUI1QixZQUFZO3NCQURYLFlBQVk7dUJBQUMsWUFBWTtnQkFRMUIsWUFBWTtzQkFEWCxZQUFZO3VCQUFDLFlBQVk7Z0JBUzFCLE9BQU87c0JBRE4sWUFBWTt1QkFBQyxPQUFPO2dCQWtEckIsSUFBSTtzQkFESCxZQUFZO3VCQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBOR1xuaW1wb3J0IHsgQ29ubmVjdGVkUG9zaXRpb24sIEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSwgT3ZlcmxheSwgT3ZlcmxheUNvbmZpZywgT3ZlcmxheVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbXBvbmVudFBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gQVBQXG5pbXBvcnQgeyBOb3ZvVG9vbHRpcCB9IGZyb20gJy4vVG9vbHRpcC5jb21wb25lbnQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbdG9vbHRpcF0nLFxuICBob3N0OiB7XG4gICAgJ1thdHRyLmRhdGEtaGludF0nOiAndG9vbHRpcCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIFRvb2x0aXBEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIHRvb2x0aXA6IHN0cmluZztcbiAgQElucHV0KCd0b29sdGlwUG9zaXRpb24nKVxuICBwb3NpdGlvbjogc3RyaW5nID0gJ3RvcCc7XG4gIEBJbnB1dCgndG9vbHRpcFR5cGUnKVxuICB0eXBlOiBzdHJpbmcgPSAnbm9ybWFsJztcbiAgQElucHV0KCd0b29sdGlwU2l6ZScpXG4gIHNpemU6IHN0cmluZztcbiAgQElucHV0KCd0b29sdGlwQm91bmNlJylcbiAgYm91bmNlOiBib29sZWFuO1xuICBASW5wdXQoJ3Rvb2x0aXBOb0FuaW1hdGUnKVxuICBub0FuaW1hdGU6IGJvb2xlYW47XG4gIEBJbnB1dCgndG9vbHRpcFJvdW5kZWQnKVxuICByb3VuZGVkOiBib29sZWFuO1xuICBASW5wdXQoJ3Rvb2x0aXBBbHdheXMnKVxuICBhbHdheXM6IGJvb2xlYW47XG4gIEBJbnB1dCgndG9vbHRpcEFjdGl2ZScpXG4gIGFjdGl2ZTogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgndG9vbHRpcFByZWxpbmUnKVxuICBwcmVsaW5lOiBib29sZWFuO1xuICBASW5wdXQoJ3JlbW92ZVRvb2x0aXBBcnJvdycpXG4gIHJlbW92ZUFycm93OiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgndG9vbHRpcEF1dG9Qb3NpdGlvbicpXG4gIGF1dG9Qb3NpdGlvbjogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgndG9vbHRpcElzSFRNTCcpXG4gIGlzSFRNTDogYm9vbGVhbjtcbiAgQElucHV0KCd0b29sdGlwQ2xvc2VPbkNsaWNrJylcbiAgY2xvc2VPbkNsaWNrOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSB0b29sdGlwSW5zdGFuY2U6IE5vdm9Ub29sdGlwIHwgbnVsbDtcbiAgcHJpdmF0ZSBwb3J0YWw6IENvbXBvbmVudFBvcnRhbDxOb3ZvVG9vbHRpcD47XG4gIHByaXZhdGUgb3ZlcmxheVJlZjogT3ZlcmxheVJlZjtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgb3ZlcmxheTogT3ZlcmxheSwgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLCBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG4gIGlzUG9zaXRpb24ocG9zaXRpb246IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBwb3NpdGlvbi50b0xvd2VyQ2FzZSgpID09PSAodGhpcy5wb3NpdGlvbiB8fCAnJykudG9Mb3dlckNhc2UoKTtcbiAgfVxuXG4gIGlzVHlwZSh0eXBlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHlwZS50b0xvd2VyQ2FzZSgpID09PSAodGhpcy50eXBlIHx8ICcnKS50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgaXNTaXplKHNpemU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBzaXplLnRvTG93ZXJDYXNlKCkgPT09ICh0aGlzLnNpemUgfHwgJycpLnRvTG93ZXJDYXNlKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJylcbiAgb25Nb3VzZUVudGVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnRvb2x0aXAgJiYgdGhpcy5hY3RpdmUgJiYgIXRoaXMuYWx3YXlzKSB7XG4gICAgICB0aGlzLnNob3coKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJylcbiAgb25Nb3VzZUxlYXZlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm92ZXJsYXlSZWYgJiYgIXRoaXMuYWx3YXlzKSB7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICAgIHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbmNsaWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm92ZXJsYXlSZWYgJiYgIXRoaXMuYWx3YXlzICYmIHRoaXMuY2xvc2VPbkNsaWNrKSB7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICAgIHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudG9vbHRpcCAmJiB0aGlzLmFsd2F5cyAmJiB0aGlzLmFjdGl2ZSkge1xuICAgICAgdGhpcy5zaG93KCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub3ZlcmxheVJlZiAmJiAhdGhpcy5hbHdheXMpIHtcbiAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgdGhpcy5vdmVybGF5UmVmLmRpc3Bvc2UoKTtcbiAgICB9XG4gIH1cblxuICBzaG93KCk6IHZvaWQge1xuICAgIGNvbnN0IG92ZXJsYXlTdGF0ZSA9IG5ldyBPdmVybGF5Q29uZmlnKCk7XG4gICAgb3ZlcmxheVN0YXRlLnBvc2l0aW9uU3RyYXRlZ3kgPSB0aGlzLmdldFBvc2l0aW9uKCk7XG5cbiAgICBpZiAodGhpcy5hbHdheXMpIHtcbiAgICAgIG92ZXJsYXlTdGF0ZS5zY3JvbGxTdHJhdGVneSA9IHRoaXMub3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLnJlcG9zaXRpb24oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3ZlcmxheVN0YXRlLnNjcm9sbFN0cmF0ZWd5ID0gdGhpcy5vdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMuY2xvc2UoKTtcbiAgICB9XG4gICAgb3ZlcmxheVN0YXRlLnNjcm9sbFN0cmF0ZWd5LmVuYWJsZSgpO1xuXG4gICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5vdmVybGF5LmNyZWF0ZShvdmVybGF5U3RhdGUpO1xuXG4gICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaCgpO1xuICAgIHRoaXMucG9ydGFsID0gdGhpcy5wb3J0YWwgfHwgbmV3IENvbXBvbmVudFBvcnRhbChOb3ZvVG9vbHRpcCwgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcblxuICAgIGNvbnN0IHRvb2x0aXBJbnN0YW5jZSA9IHRoaXMub3ZlcmxheVJlZi5hdHRhY2godGhpcy5wb3J0YWwpLmluc3RhbmNlO1xuICAgIHRvb2x0aXBJbnN0YW5jZS5tZXNzYWdlID0gdGhpcy50b29sdGlwO1xuICAgIHRvb2x0aXBJbnN0YW5jZS50b29sdGlwVHlwZSA9IHRoaXMudHlwZTtcbiAgICB0b29sdGlwSW5zdGFuY2Uucm91bmRlZCA9IHRoaXMucm91bmRlZDtcbiAgICB0b29sdGlwSW5zdGFuY2Uuc2l6ZSA9IHRoaXMuc2l6ZTtcbiAgICB0b29sdGlwSW5zdGFuY2UucHJlbGluZSA9IHRoaXMucHJlbGluZTtcbiAgICB0b29sdGlwSW5zdGFuY2Uubm9BbmltYXRlID0gdGhpcy5ub0FuaW1hdGU7XG4gICAgdG9vbHRpcEluc3RhbmNlLnBvc2l0aW9uID0gdGhpcy5yZW1vdmVBcnJvdyA/ICduby1hcnJvdycgOiB0aGlzLnBvc2l0aW9uO1xuICAgIHRvb2x0aXBJbnN0YW5jZS5pc0hUTUwgPSB0aGlzLmlzSFRNTDtcbiAgICB0b29sdGlwSW5zdGFuY2UuYm91bmNlID0gdGhpcy5ib3VuY2U7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJylcbiAgaGlkZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vdmVybGF5UmVmKSB7XG4gICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNoKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRQb3NpdGlvbigpOiBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3kge1xuICAgIGxldCBzdHJhdGVneTogRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5O1xuICAgIGxldCBkZWZhdWx0UG9zaXRpb246IENvbm5lY3RlZFBvc2l0aW9uO1xuICAgIGxldCBvZmZzZXRYOiBudW1iZXI7XG4gICAgbGV0IG9mZnNldFk6IG51bWJlcjtcbiAgICBsZXQgYXV0b1Bvc2l0aW9uczogQ29ubmVjdGVkUG9zaXRpb25bXSA9IFtcbiAgICAgIHsgb3JpZ2luWDogJ2NlbnRlcicsIG9yaWdpblk6ICdib3R0b20nLCBvdmVybGF5WDogJ2NlbnRlcicsIG92ZXJsYXlZOiAndG9wJywgb2Zmc2V0WDogMCwgb2Zmc2V0WTogMTIgfSxcbiAgICAgIHsgb3JpZ2luWDogJ2VuZCcsIG9yaWdpblk6ICdib3R0b20nLCBvdmVybGF5WDogJ2VuZCcsIG92ZXJsYXlZOiAndG9wJywgb2Zmc2V0WDogMCwgb2Zmc2V0WTogMTIgfSxcbiAgICAgIHsgb3JpZ2luWDogJ2VuZCcsIG9yaWdpblk6ICdjZW50ZXInLCBvdmVybGF5WDogJ3N0YXJ0Jywgb3ZlcmxheVk6ICdjZW50ZXInLCBvZmZzZXRYOiAxMiwgb2Zmc2V0WTogMCB9LFxuICAgICAgeyBvcmlnaW5YOiAnc3RhcnQnLCBvcmlnaW5ZOiAnY2VudGVyJywgb3ZlcmxheVg6ICdlbmQnLCBvdmVybGF5WTogJ2NlbnRlcicsIG9mZnNldFg6IC0xMiwgb2Zmc2V0WTogMCB9LFxuICAgICAgeyBvcmlnaW5YOiAnY2VudGVyJywgb3JpZ2luWTogJ3RvcCcsIG92ZXJsYXlYOiAnY2VudGVyJywgb3ZlcmxheVk6ICdib3R0b20nLCBvZmZzZXRYOiAwLCBvZmZzZXRZOiAtMTIgfSxcbiAgICAgIHsgb3JpZ2luWDogJ3N0YXJ0Jywgb3JpZ2luWTogJ2JvdHRvbScsIG92ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ3RvcCcsIG9mZnNldFg6IDAsIG9mZnNldFk6IDEyIH0sXG4gICAgICB7IG9yaWdpblg6ICdzdGFydCcsIG9yaWdpblk6ICd0b3AnLCBvdmVybGF5WDogJ3N0YXJ0Jywgb3ZlcmxheVk6ICdib3R0b20nLCBvZmZzZXRYOiAwLCBvZmZzZXRZOiAtMTIgfSxcbiAgICAgIHsgb3JpZ2luWDogJ2VuZCcsIG9yaWdpblk6ICd0b3AnLCBvdmVybGF5WDogJ2VuZCcsIG92ZXJsYXlZOiAnYm90dG9tJywgb2Zmc2V0WDogMCwgb2Zmc2V0WTogLTEyIH0sXG4gICAgICB7IG9yaWdpblg6ICdzdGFydCcsIG9yaWdpblk6ICd0b3AnLCBvdmVybGF5WDogJ2VuZCcsIG92ZXJsYXlZOiAnYm90dG9tJywgb2Zmc2V0WDogMTIsIG9mZnNldFk6IC0xMiB9LFxuICAgICAgeyBvcmlnaW5YOiAnc3RhcnQnLCBvcmlnaW5ZOiAnYm90dG9tJywgb3ZlcmxheVg6ICdlbmQnLCBvdmVybGF5WTogJ3RvcCcsIG9mZnNldFg6IDEyLCBvZmZzZXRZOiAxMiB9LFxuICAgICAgeyBvcmlnaW5YOiAnZW5kJywgb3JpZ2luWTogJ3RvcCcsIG92ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ2JvdHRvbScsIG9mZnNldFg6IC0xMiwgb2Zmc2V0WTogLTEyIH0sXG4gICAgICB7IG9yaWdpblg6ICdlbmQnLCBvcmlnaW5ZOiAnYm90dG9tJywgb3ZlcmxheVg6ICdzdGFydCcsIG92ZXJsYXlZOiAndG9wJywgb2Zmc2V0WDogLTEyLCBvZmZzZXRZOiAxMiB9LFxuICAgIF07XG5cbiAgICBzd2l0Y2ggKHRoaXMucG9zaXRpb24pIHtcbiAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgZGVmYXVsdFBvc2l0aW9uID0geyBvcmlnaW5YOiAnZW5kJywgb3JpZ2luWTogJ2NlbnRlcicsIG92ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ2NlbnRlcicgfTtcbiAgICAgICAgb2Zmc2V0WCA9IDEyO1xuICAgICAgICBvZmZzZXRZID0gMDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICBkZWZhdWx0UG9zaXRpb24gPSB7IG9yaWdpblg6ICdjZW50ZXInLCBvcmlnaW5ZOiAnYm90dG9tJywgb3ZlcmxheVg6ICdjZW50ZXInLCBvdmVybGF5WTogJ3RvcCcgfTtcbiAgICAgICAgb2Zmc2V0WCA9IDA7XG4gICAgICAgIG9mZnNldFkgPSAxMjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0b3AnOlxuICAgICAgICBkZWZhdWx0UG9zaXRpb24gPSB7IG9yaWdpblg6ICdjZW50ZXInLCBvcmlnaW5ZOiAndG9wJywgb3ZlcmxheVg6ICdjZW50ZXInLCBvdmVybGF5WTogJ2JvdHRvbScgfTtcbiAgICAgICAgb2Zmc2V0WCA9IDA7XG4gICAgICAgIG9mZnNldFkgPSAtMTI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgIGRlZmF1bHRQb3NpdGlvbiA9IHsgb3JpZ2luWDogJ3N0YXJ0Jywgb3JpZ2luWTogJ2NlbnRlcicsIG92ZXJsYXlYOiAnZW5kJywgb3ZlcmxheVk6ICdjZW50ZXInIH07XG4gICAgICAgIG9mZnNldFggPSAtMTI7XG4gICAgICAgIG9mZnNldFkgPSAwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RvcC1sZWZ0JzpcbiAgICAgICAgZGVmYXVsdFBvc2l0aW9uID0geyBvcmlnaW5YOiAnc3RhcnQnLCBvcmlnaW5ZOiAndG9wJywgb3ZlcmxheVg6ICdlbmQnLCBvdmVybGF5WTogJ2JvdHRvbScgfTtcbiAgICAgICAgb2Zmc2V0WCA9IDEyO1xuICAgICAgICBvZmZzZXRZID0gLTEyO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2JvdHRvbS1sZWZ0JzpcbiAgICAgICAgZGVmYXVsdFBvc2l0aW9uID0geyBvcmlnaW5YOiAnc3RhcnQnLCBvcmlnaW5ZOiAnYm90dG9tJywgb3ZlcmxheVg6ICdlbmQnLCBvdmVybGF5WTogJ3RvcCcgfTtcbiAgICAgICAgb2Zmc2V0WCA9IDEyO1xuICAgICAgICBvZmZzZXRZID0gMTI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndG9wLXJpZ2h0JzpcbiAgICAgICAgZGVmYXVsdFBvc2l0aW9uID0geyBvcmlnaW5YOiAnZW5kJywgb3JpZ2luWTogJ3RvcCcsIG92ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ2JvdHRvbScgfTtcbiAgICAgICAgb2Zmc2V0WCA9IC0xMjtcbiAgICAgICAgb2Zmc2V0WSA9IC0xMjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdib3R0b20tcmlnaHQnOlxuICAgICAgICBkZWZhdWx0UG9zaXRpb24gPSB7IG9yaWdpblg6ICdlbmQnLCBvcmlnaW5ZOiAnYm90dG9tJywgb3ZlcmxheVg6ICdzdGFydCcsIG92ZXJsYXlZOiAndG9wJyB9O1xuICAgICAgICBvZmZzZXRYID0gLTEyO1xuICAgICAgICBvZmZzZXRZID0gMTI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY29uc3QgYWxsUG9zaXRpb25zID0gdGhpcy5hdXRvUG9zaXRpb24gPyBbZGVmYXVsdFBvc2l0aW9uXS5jb25jYXQoYXV0b1Bvc2l0aW9ucykgOiBbZGVmYXVsdFBvc2l0aW9uXTtcbiAgICBzdHJhdGVneSA9IHRoaXMub3ZlcmxheVxuICAgICAgLnBvc2l0aW9uKClcbiAgICAgIC5mbGV4aWJsZUNvbm5lY3RlZFRvKHRoaXMuZWxlbWVudFJlZilcbiAgICAgIC53aXRoRmxleGlibGVEaW1lbnNpb25zKGZhbHNlKVxuICAgICAgLndpdGhEZWZhdWx0T2Zmc2V0WChvZmZzZXRYKVxuICAgICAgLndpdGhEZWZhdWx0T2Zmc2V0WShvZmZzZXRZKVxuICAgICAgLndpdGhQb3NpdGlvbnMoYWxsUG9zaXRpb25zKTtcbiAgICByZXR1cm4gc3RyYXRlZ3k7XG4gIH1cbn1cbiJdfQ==
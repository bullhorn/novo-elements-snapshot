import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, ViewChild } from '@angular/core';
import * as i0 from "@angular/core";
export class PopOverContent {
    constructor(element, cdr) {
        this.element = element;
        this.cdr = cdr;
        this.placement = 'top';
        this.animation = true;
        this.onCloseFromOutside = new EventEmitter();
        this.top = -10000;
        this.left = -10000;
        this.displayType = 'none';
        this.isHidden = false;
    }
    ngAfterViewInit() {
        this.show();
        this.cdr.detectChanges();
    }
    toggle() {
        if (this.isHidden) {
            this.show();
        }
        else {
            this.hide();
        }
    }
    show() {
        if (!this.popover || !this.popover.getElement()) {
            return;
        }
        const p = this.positionElements(this.popover.getElement(), this.popoverDiv.nativeElement, this.placement);
        this.displayType = 'block';
        this.top = p.top;
        this.left = p.left;
        this.isHidden = false;
    }
    hide() {
        this.top = -10000;
        this.left = -10000;
        this.isHidden = true;
        this.popover.hide();
    }
    hideFromPopover() {
        this.top = -10000;
        this.left = -10000;
    }
    positionElements(hostEl, targetEl, positionStr, appendToBody = false) {
        const positionStrParts = positionStr.split('-');
        const mainSide = (this.effectivePlacement = this.getEffectivePlacement(positionStrParts[0] || 'right', hostEl, targetEl));
        const orientation = (this.effectiveAlignment = positionStrParts[1] || 'center');
        const hostElPos = appendToBody ? this.offset(hostEl) : this.position(hostEl);
        const targetElWidth = targetEl.offsetWidth;
        const targetElHeight = targetEl.offsetHeight;
        const shiftWidth = {
            center() {
                return hostElPos.left + (hostElPos.width - targetElWidth) / 2;
            },
            right() {
                return hostElPos.left;
            },
            left() {
                return hostElPos.left + (hostElPos.width - targetElWidth);
            },
        };
        const shiftHeight = {
            center() {
                return hostElPos.top + (hostElPos.height - targetElHeight) / 2;
            },
            bottom() {
                return hostElPos.top;
            },
            top() {
                return hostElPos.top + (hostElPos.height - targetElHeight);
            },
        };
        let targetElPos;
        switch (mainSide) {
            case 'right':
                targetElPos = {
                    top: shiftHeight[orientation](),
                    left: hostElPos.left + hostElPos.width,
                };
                break;
            case 'left':
                targetElPos = {
                    top: shiftHeight[orientation](),
                    left: hostElPos.left - targetElWidth,
                };
                break;
            case 'bottom':
                targetElPos = {
                    top: hostElPos.top + hostElPos.height,
                    left: shiftWidth[orientation](),
                };
                break;
            default:
                targetElPos = {
                    top: hostElPos.top - targetElHeight,
                    left: shiftWidth[orientation](),
                };
                break;
        }
        return targetElPos;
    }
    position(nativeEl) {
        let offsetParentBCR = { top: 0, left: 0 };
        const elBCR = this.offset(nativeEl);
        const offsetParentEl = this.parentOffsetEl(nativeEl);
        if (offsetParentEl !== window.document) {
            offsetParentBCR = this.offset(offsetParentEl);
            offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
            offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
        }
        const boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: elBCR.top - offsetParentBCR.top,
            left: elBCR.left - offsetParentBCR.left,
        };
    }
    offset(nativeEl) {
        const boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: boundingClientRect.top + (window.pageYOffset || window.document.documentElement.scrollTop),
            left: boundingClientRect.left + (window.pageXOffset || window.document.documentElement.scrollLeft),
        };
    }
    getStyle(nativeEl, cssProp) {
        if (nativeEl.currentStyle) {
            return nativeEl.currentStyle[cssProp];
        }
        if (window.getComputedStyle) {
            return window.getComputedStyle(nativeEl)[cssProp];
        }
        return nativeEl.style[cssProp];
    }
    isStaticPositioned(nativeEl) {
        return (this.getStyle(nativeEl, 'position') || 'static') === 'static';
    }
    parentOffsetEl(nativeEl) {
        let offsetParent = nativeEl.offsetParent || window.document;
        while (offsetParent && offsetParent !== window.document && this.isStaticPositioned(offsetParent)) {
            offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || window.document;
    }
    getEffectivePlacement(desiredPlacement, hostElement, targetElement) {
        const hostElBoundingRect = hostElement.getBoundingClientRect();
        if (desiredPlacement === 'top' && hostElBoundingRect.top - targetElement.offsetHeight < 0) {
            return 'bottom';
        }
        if (desiredPlacement === 'bottom' && hostElBoundingRect.bottom + targetElement.offsetHeight > window.innerHeight) {
            return 'top';
        }
        if (desiredPlacement === 'left' && hostElBoundingRect.left - targetElement.offsetWidth < 0) {
            return 'right';
        }
        if (desiredPlacement === 'right' && hostElBoundingRect.right + targetElement.offsetWidth > window.innerWidth) {
            return 'left';
        }
        return desiredPlacement;
    }
}
PopOverContent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: PopOverContent, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
PopOverContent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: PopOverContent, selector: "popover-content", inputs: { content: "content", placement: "placement", title: "title", animation: "animation" }, viewQueries: [{ propertyName: "popoverDiv", first: true, predicate: ["popoverDiv"], descendants: true }], ngImport: i0, template: `
    <div
      #popoverDiv
      class="popover {{ effectivePlacement }}"
      [style.top]="top + 'px'"
      [style.left]="left + 'px'"
      [class.fade]="animation"
      style="display: block"
      role="popover"
    >
      <div class="arrow {{ effectiveAlignment }}"></div>
      <div class="popover-title" [hidden]="!title">{{ title }}</div>
      <div class="popover-content">
        <ng-content></ng-content>
        <div class="popover-content-text">{{ content }}</div>
      </div>
    </div>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: PopOverContent, decorators: [{
            type: Component,
            args: [{
                    selector: 'popover-content',
                    template: `
    <div
      #popoverDiv
      class="popover {{ effectivePlacement }}"
      [style.top]="top + 'px'"
      [style.left]="left + 'px'"
      [class.fade]="animation"
      style="display: block"
      role="popover"
    >
      <div class="arrow {{ effectiveAlignment }}"></div>
      <div class="popover-title" [hidden]="!title">{{ title }}</div>
      <div class="popover-content">
        <ng-content></ng-content>
        <div class="popover-content-text">{{ content }}</div>
      </div>
    </div>
  `,
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { content: [{
                type: Input
            }], placement: [{
                type: Input
            }], title: [{
                type: Input
            }], animation: [{
                type: Input
            }], popoverDiv: [{
                type: ViewChild,
                args: ['popoverDiv']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9wT3ZlckNvbnRlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9wb3BvdmVyL1BvcE92ZXJDb250ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBaUIsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUF3QnhILE1BQU0sT0FBTyxjQUFjO0lBcUJ6QixZQUFzQixPQUFtQixFQUFZLEdBQXNCO1FBQXJELFlBQU8sR0FBUCxPQUFPLENBQVk7UUFBWSxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQWpCM0UsY0FBUyxHQUFXLEtBQUssQ0FBQztRQUkxQixjQUFTLEdBQVksSUFBSSxDQUFDO1FBSzFCLHVCQUFrQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDeEMsUUFBRyxHQUFXLENBQUMsS0FBSyxDQUFDO1FBQ3JCLFNBQUksR0FBVyxDQUFDLEtBQUssQ0FBQztRQUN0QixnQkFBVyxHQUFXLE1BQU0sQ0FBQztRQUc3QixhQUFRLEdBQVksS0FBSyxDQUFDO0lBRW9ELENBQUM7SUFFL0UsZUFBZTtRQUNiLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2I7YUFBTTtZQUNMLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNiO0lBQ0gsQ0FBQztJQUVELElBQUk7UUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDL0MsT0FB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QixDQUFDLElBQUksR0FBRyxhQUFhLENBQUMsV0FBVyxHQUFHLENBQUMsRUFBRTtZQUMxRixPQUFPLE9BQU8sQ0FBQztTQUNoQjtRQUNELElBQUksZ0JBQWdCLEtBQUssT0FBTyxJQUFJLGtCQUFrQixDQUFDLEtBQUssR0FBRyxhQUFhLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUU7WUFDNUcsT0FBTyxNQUFNLENBQUM7U0FDZjtRQUVELE9BQU8sZ0JBQWdCLENBQUM7SUFDMUIsQ0FBQzs7NEdBek1VLGNBQWM7Z0dBQWQsY0FBYyxpUUFuQmY7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJUOzRGQUVVLGNBQWM7a0JBckIxQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQlQ7aUJBQ0Y7aUlBR0MsT0FBTztzQkFETixLQUFLO2dCQUdOLFNBQVM7c0JBRFIsS0FBSztnQkFHTixLQUFLO3NCQURKLEtBQUs7Z0JBR04sU0FBUztzQkFEUixLQUFLO2dCQUlOLFVBQVU7c0JBRFQsU0FBUzt1QkFBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQb3BPdmVyRGlyZWN0aXZlIH0gZnJvbSAnLi9Qb3BPdmVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncG9wb3Zlci1jb250ZW50JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICAjcG9wb3ZlckRpdlxuICAgICAgY2xhc3M9XCJwb3BvdmVyIHt7IGVmZmVjdGl2ZVBsYWNlbWVudCB9fVwiXG4gICAgICBbc3R5bGUudG9wXT1cInRvcCArICdweCdcIlxuICAgICAgW3N0eWxlLmxlZnRdPVwibGVmdCArICdweCdcIlxuICAgICAgW2NsYXNzLmZhZGVdPVwiYW5pbWF0aW9uXCJcbiAgICAgIHN0eWxlPVwiZGlzcGxheTogYmxvY2tcIlxuICAgICAgcm9sZT1cInBvcG92ZXJcIlxuICAgID5cbiAgICAgIDxkaXYgY2xhc3M9XCJhcnJvdyB7eyBlZmZlY3RpdmVBbGlnbm1lbnQgfX1cIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJwb3BvdmVyLXRpdGxlXCIgW2hpZGRlbl09XCIhdGl0bGVcIj57eyB0aXRsZSB9fTwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInBvcG92ZXItY29udGVudFwiPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwb3BvdmVyLWNvbnRlbnQtdGV4dFwiPnt7IGNvbnRlbnQgfX08L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBQb3BPdmVyQ29udGVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKVxuICBjb250ZW50OiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHBsYWNlbWVudDogc3RyaW5nID0gJ3RvcCc7XG4gIEBJbnB1dCgpXG4gIHRpdGxlOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIGFuaW1hdGlvbjogYm9vbGVhbiA9IHRydWU7XG5cbiAgQFZpZXdDaGlsZCgncG9wb3ZlckRpdicpXG4gIHBvcG92ZXJEaXY6IEVsZW1lbnRSZWY7XG4gIHBvcG92ZXI6IFBvcE92ZXJEaXJlY3RpdmU7XG4gIG9uQ2xvc2VGcm9tT3V0c2lkZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgdG9wOiBudW1iZXIgPSAtMTAwMDA7XG4gIGxlZnQ6IG51bWJlciA9IC0xMDAwMDtcbiAgZGlzcGxheVR5cGU6IHN0cmluZyA9ICdub25lJztcbiAgZWZmZWN0aXZlUGxhY2VtZW50OiBzdHJpbmc7XG4gIGVmZmVjdGl2ZUFsaWdubWVudDogc3RyaW5nO1xuICBpc0hpZGRlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBlbGVtZW50OiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zaG93KCk7XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgdG9nZ2xlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzSGlkZGVuKSB7XG4gICAgICB0aGlzLnNob3coKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuICB9XG5cbiAgc2hvdygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucG9wb3ZlciB8fCAhdGhpcy5wb3BvdmVyLmdldEVsZW1lbnQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHAgPSB0aGlzLnBvc2l0aW9uRWxlbWVudHModGhpcy5wb3BvdmVyLmdldEVsZW1lbnQoKSwgdGhpcy5wb3BvdmVyRGl2Lm5hdGl2ZUVsZW1lbnQsIHRoaXMucGxhY2VtZW50KTtcbiAgICB0aGlzLmRpc3BsYXlUeXBlID0gJ2Jsb2NrJztcbiAgICB0aGlzLnRvcCA9IHAudG9wO1xuICAgIHRoaXMubGVmdCA9IHAubGVmdDtcbiAgICB0aGlzLmlzSGlkZGVuID0gZmFsc2U7XG4gIH1cblxuICBoaWRlKCk6IHZvaWQge1xuICAgIHRoaXMudG9wID0gLTEwMDAwO1xuICAgIHRoaXMubGVmdCA9IC0xMDAwMDtcbiAgICB0aGlzLmlzSGlkZGVuID0gdHJ1ZTtcbiAgICB0aGlzLnBvcG92ZXIuaGlkZSgpO1xuICB9XG5cbiAgaGlkZUZyb21Qb3BvdmVyKCkge1xuICAgIHRoaXMudG9wID0gLTEwMDAwO1xuICAgIHRoaXMubGVmdCA9IC0xMDAwMDtcbiAgfVxuXG4gIHByb3RlY3RlZCBwb3NpdGlvbkVsZW1lbnRzKFxuICAgIGhvc3RFbDogSFRNTEVsZW1lbnQsXG4gICAgdGFyZ2V0RWw6IEhUTUxFbGVtZW50LFxuICAgIHBvc2l0aW9uU3RyOiBzdHJpbmcsXG4gICAgYXBwZW5kVG9Cb2R5ID0gZmFsc2UsXG4gICk6IHsgdG9wOiBudW1iZXI7IGxlZnQ6IG51bWJlciB9IHtcbiAgICBjb25zdCBwb3NpdGlvblN0clBhcnRzID0gcG9zaXRpb25TdHIuc3BsaXQoJy0nKTtcbiAgICBjb25zdCBtYWluU2lkZSA9ICh0aGlzLmVmZmVjdGl2ZVBsYWNlbWVudCA9IHRoaXMuZ2V0RWZmZWN0aXZlUGxhY2VtZW50KHBvc2l0aW9uU3RyUGFydHNbMF0gfHwgJ3JpZ2h0JywgaG9zdEVsLCB0YXJnZXRFbCkpO1xuICAgIGNvbnN0IG9yaWVudGF0aW9uID0gKHRoaXMuZWZmZWN0aXZlQWxpZ25tZW50ID0gcG9zaXRpb25TdHJQYXJ0c1sxXSB8fCAnY2VudGVyJyk7XG4gICAgY29uc3QgaG9zdEVsUG9zID0gYXBwZW5kVG9Cb2R5ID8gdGhpcy5vZmZzZXQoaG9zdEVsKSA6IHRoaXMucG9zaXRpb24oaG9zdEVsKTtcbiAgICBjb25zdCB0YXJnZXRFbFdpZHRoID0gdGFyZ2V0RWwub2Zmc2V0V2lkdGg7XG4gICAgY29uc3QgdGFyZ2V0RWxIZWlnaHQgPSB0YXJnZXRFbC5vZmZzZXRIZWlnaHQ7XG5cbiAgICBjb25zdCBzaGlmdFdpZHRoOiBhbnkgPSB7XG4gICAgICBjZW50ZXIoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGhvc3RFbFBvcy5sZWZ0ICsgKGhvc3RFbFBvcy53aWR0aCAtIHRhcmdldEVsV2lkdGgpIC8gMjtcbiAgICAgIH0sXG4gICAgICByaWdodCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gaG9zdEVsUG9zLmxlZnQ7XG4gICAgICB9LFxuICAgICAgbGVmdCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gaG9zdEVsUG9zLmxlZnQgKyAoaG9zdEVsUG9zLndpZHRoIC0gdGFyZ2V0RWxXaWR0aCk7XG4gICAgICB9LFxuICAgIH07XG5cbiAgICBjb25zdCBzaGlmdEhlaWdodDogYW55ID0ge1xuICAgICAgY2VudGVyKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBob3N0RWxQb3MudG9wICsgKGhvc3RFbFBvcy5oZWlnaHQgLSB0YXJnZXRFbEhlaWdodCkgLyAyO1xuICAgICAgfSxcbiAgICAgIGJvdHRvbSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gaG9zdEVsUG9zLnRvcDtcbiAgICAgIH0sXG4gICAgICB0b3AoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGhvc3RFbFBvcy50b3AgKyAoaG9zdEVsUG9zLmhlaWdodCAtIHRhcmdldEVsSGVpZ2h0KTtcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGxldCB0YXJnZXRFbFBvczogeyB0b3A6IG51bWJlcjsgbGVmdDogbnVtYmVyIH07XG4gICAgc3dpdGNoIChtYWluU2lkZSkge1xuICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICB0YXJnZXRFbFBvcyA9IHtcbiAgICAgICAgICB0b3A6IHNoaWZ0SGVpZ2h0W29yaWVudGF0aW9uXSgpLFxuICAgICAgICAgIGxlZnQ6IGhvc3RFbFBvcy5sZWZ0ICsgaG9zdEVsUG9zLndpZHRoLFxuICAgICAgICB9O1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgIHRhcmdldEVsUG9zID0ge1xuICAgICAgICAgIHRvcDogc2hpZnRIZWlnaHRbb3JpZW50YXRpb25dKCksXG4gICAgICAgICAgbGVmdDogaG9zdEVsUG9zLmxlZnQgLSB0YXJnZXRFbFdpZHRoLFxuICAgICAgICB9O1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgdGFyZ2V0RWxQb3MgPSB7XG4gICAgICAgICAgdG9wOiBob3N0RWxQb3MudG9wICsgaG9zdEVsUG9zLmhlaWdodCxcbiAgICAgICAgICBsZWZ0OiBzaGlmdFdpZHRoW29yaWVudGF0aW9uXSgpLFxuICAgICAgICB9O1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGFyZ2V0RWxQb3MgPSB7XG4gICAgICAgICAgdG9wOiBob3N0RWxQb3MudG9wIC0gdGFyZ2V0RWxIZWlnaHQsXG4gICAgICAgICAgbGVmdDogc2hpZnRXaWR0aFtvcmllbnRhdGlvbl0oKSxcbiAgICAgICAgfTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldEVsUG9zO1xuICB9XG5cbiAgcHJvdGVjdGVkIHBvc2l0aW9uKG5hdGl2ZUVsOiBIVE1MRWxlbWVudCk6IHsgd2lkdGg6IG51bWJlcjsgaGVpZ2h0OiBudW1iZXI7IHRvcDogbnVtYmVyOyBsZWZ0OiBudW1iZXIgfSB7XG4gICAgbGV0IG9mZnNldFBhcmVudEJDUiA9IHsgdG9wOiAwLCBsZWZ0OiAwIH07XG4gICAgY29uc3QgZWxCQ1IgPSB0aGlzLm9mZnNldChuYXRpdmVFbCk7XG4gICAgY29uc3Qgb2Zmc2V0UGFyZW50RWwgPSB0aGlzLnBhcmVudE9mZnNldEVsKG5hdGl2ZUVsKTtcbiAgICBpZiAob2Zmc2V0UGFyZW50RWwgIT09IHdpbmRvdy5kb2N1bWVudCkge1xuICAgICAgb2Zmc2V0UGFyZW50QkNSID0gdGhpcy5vZmZzZXQob2Zmc2V0UGFyZW50RWwpO1xuICAgICAgb2Zmc2V0UGFyZW50QkNSLnRvcCArPSBvZmZzZXRQYXJlbnRFbC5jbGllbnRUb3AgLSBvZmZzZXRQYXJlbnRFbC5zY3JvbGxUb3A7XG4gICAgICBvZmZzZXRQYXJlbnRCQ1IubGVmdCArPSBvZmZzZXRQYXJlbnRFbC5jbGllbnRMZWZ0IC0gb2Zmc2V0UGFyZW50RWwuc2Nyb2xsTGVmdDtcbiAgICB9XG5cbiAgICBjb25zdCBib3VuZGluZ0NsaWVudFJlY3QgPSBuYXRpdmVFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICByZXR1cm4ge1xuICAgICAgd2lkdGg6IGJvdW5kaW5nQ2xpZW50UmVjdC53aWR0aCB8fCBuYXRpdmVFbC5vZmZzZXRXaWR0aCxcbiAgICAgIGhlaWdodDogYm91bmRpbmdDbGllbnRSZWN0LmhlaWdodCB8fCBuYXRpdmVFbC5vZmZzZXRIZWlnaHQsXG4gICAgICB0b3A6IGVsQkNSLnRvcCAtIG9mZnNldFBhcmVudEJDUi50b3AsXG4gICAgICBsZWZ0OiBlbEJDUi5sZWZ0IC0gb2Zmc2V0UGFyZW50QkNSLmxlZnQsXG4gICAgfTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvZmZzZXQobmF0aXZlRWw6IGFueSk6IHsgd2lkdGg6IG51bWJlcjsgaGVpZ2h0OiBudW1iZXI7IHRvcDogbnVtYmVyOyBsZWZ0OiBudW1iZXIgfSB7XG4gICAgY29uc3QgYm91bmRpbmdDbGllbnRSZWN0ID0gbmF0aXZlRWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdpZHRoOiBib3VuZGluZ0NsaWVudFJlY3Qud2lkdGggfHwgbmF0aXZlRWwub2Zmc2V0V2lkdGgsXG4gICAgICBoZWlnaHQ6IGJvdW5kaW5nQ2xpZW50UmVjdC5oZWlnaHQgfHwgbmF0aXZlRWwub2Zmc2V0SGVpZ2h0LFxuICAgICAgdG9wOiBib3VuZGluZ0NsaWVudFJlY3QudG9wICsgKHdpbmRvdy5wYWdlWU9mZnNldCB8fCB3aW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCksXG4gICAgICBsZWZ0OiBib3VuZGluZ0NsaWVudFJlY3QubGVmdCArICh3aW5kb3cucGFnZVhPZmZzZXQgfHwgd2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0KSxcbiAgICB9O1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFN0eWxlKG5hdGl2ZUVsOiBIVE1MRWxlbWVudCwgY3NzUHJvcDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAoKG5hdGl2ZUVsIGFzIGFueSkuY3VycmVudFN0eWxlKSB7XG4gICAgICByZXR1cm4gKG5hdGl2ZUVsIGFzIGFueSkuY3VycmVudFN0eWxlW2Nzc1Byb3BdO1xuICAgIH1cblxuICAgIGlmICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSkge1xuICAgICAgcmV0dXJuICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSBhcyBhbnkpKG5hdGl2ZUVsKVtjc3NQcm9wXTtcbiAgICB9XG5cbiAgICByZXR1cm4gKG5hdGl2ZUVsLnN0eWxlIGFzIGFueSlbY3NzUHJvcF07XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNTdGF0aWNQb3NpdGlvbmVkKG5hdGl2ZUVsOiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAodGhpcy5nZXRTdHlsZShuYXRpdmVFbCwgJ3Bvc2l0aW9uJykgfHwgJ3N0YXRpYycpID09PSAnc3RhdGljJztcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJlbnRPZmZzZXRFbChuYXRpdmVFbDogSFRNTEVsZW1lbnQpOiBhbnkge1xuICAgIGxldCBvZmZzZXRQYXJlbnQ6IGFueSA9IG5hdGl2ZUVsLm9mZnNldFBhcmVudCB8fCB3aW5kb3cuZG9jdW1lbnQ7XG4gICAgd2hpbGUgKG9mZnNldFBhcmVudCAmJiBvZmZzZXRQYXJlbnQgIT09IHdpbmRvdy5kb2N1bWVudCAmJiB0aGlzLmlzU3RhdGljUG9zaXRpb25lZChvZmZzZXRQYXJlbnQpKSB7XG4gICAgICBvZmZzZXRQYXJlbnQgPSBvZmZzZXRQYXJlbnQub2Zmc2V0UGFyZW50O1xuICAgIH1cbiAgICByZXR1cm4gb2Zmc2V0UGFyZW50IHx8IHdpbmRvdy5kb2N1bWVudDtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRFZmZlY3RpdmVQbGFjZW1lbnQoZGVzaXJlZFBsYWNlbWVudDogc3RyaW5nLCBob3N0RWxlbWVudDogSFRNTEVsZW1lbnQsIHRhcmdldEVsZW1lbnQ6IEhUTUxFbGVtZW50KTogc3RyaW5nIHtcbiAgICBjb25zdCBob3N0RWxCb3VuZGluZ1JlY3QgPSBob3N0RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIGlmIChkZXNpcmVkUGxhY2VtZW50ID09PSAndG9wJyAmJiBob3N0RWxCb3VuZGluZ1JlY3QudG9wIC0gdGFyZ2V0RWxlbWVudC5vZmZzZXRIZWlnaHQgPCAwKSB7XG4gICAgICByZXR1cm4gJ2JvdHRvbSc7XG4gICAgfVxuICAgIGlmIChkZXNpcmVkUGxhY2VtZW50ID09PSAnYm90dG9tJyAmJiBob3N0RWxCb3VuZGluZ1JlY3QuYm90dG9tICsgdGFyZ2V0RWxlbWVudC5vZmZzZXRIZWlnaHQgPiB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcbiAgICAgIHJldHVybiAndG9wJztcbiAgICB9XG4gICAgaWYgKGRlc2lyZWRQbGFjZW1lbnQgPT09ICdsZWZ0JyAmJiBob3N0RWxCb3VuZGluZ1JlY3QubGVmdCAtIHRhcmdldEVsZW1lbnQub2Zmc2V0V2lkdGggPCAwKSB7XG4gICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICB9XG4gICAgaWYgKGRlc2lyZWRQbGFjZW1lbnQgPT09ICdyaWdodCcgJiYgaG9zdEVsQm91bmRpbmdSZWN0LnJpZ2h0ICsgdGFyZ2V0RWxlbWVudC5vZmZzZXRXaWR0aCA+IHdpbmRvdy5pbm5lcldpZHRoKSB7XG4gICAgICByZXR1cm4gJ2xlZnQnO1xuICAgIH1cblxuICAgIHJldHVybiBkZXNpcmVkUGxhY2VtZW50O1xuICB9XG59XG4iXX0=
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, ViewChild } from '@angular/core';
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
PopOverContent.decorators = [
    { type: Component, args: [{
                selector: 'popover-content',
                template: `
        <div #popoverDiv
            class="popover {{ effectivePlacement }}"
            [style.top]="top + 'px'"
            [style.left]="left + 'px'"
            [class.fade]="animation"
            style="display: block"
            role="popover">
            <div class="arrow {{effectiveAlignment}}"></div>
            <h4 class="popover-title" [hidden]="!title">{{ title }}</h4>
            <div class="popover-content">
                <ng-content></ng-content>
                <div class="popover-content-text">{{ content }}</div>
            </div>
        </div>
    `
            },] }
];
PopOverContent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
PopOverContent.propDecorators = {
    content: [{ type: Input }],
    placement: [{ type: Input }],
    title: [{ type: Input }],
    animation: [{ type: Input }],
    popoverDiv: [{ type: ViewChild, args: ['popoverDiv',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9wT3ZlckNvbnRlbnQuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL3BvcG92ZXIvUG9wT3ZlckNvbnRlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBc0J4SCxNQUFNLE9BQU8sY0FBYztJQXFCekIsWUFBc0IsT0FBbUIsRUFBWSxHQUFzQjtRQUFyRCxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQVksUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFqQjNFLGNBQVMsR0FBVyxLQUFLLENBQUM7UUFJMUIsY0FBUyxHQUFZLElBQUksQ0FBQztRQUsxQix1QkFBa0IsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3hDLFFBQUcsR0FBVyxDQUFDLEtBQUssQ0FBQztRQUNyQixTQUFJLEdBQVcsQ0FBQyxLQUFLLENBQUM7UUFDdEIsZ0JBQVcsR0FBVyxNQUFNLENBQUM7UUFHN0IsYUFBUSxHQUFZLEtBQUssQ0FBQztJQUVxRCxDQUFDO0lBRWhGLGVBQWU7UUFDYixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNiO2FBQU07WUFDTCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDYjtJQUNILENBQUM7SUFFRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxF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QU0sSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFDLFdBQVcsR0FBRyxDQUFDLEVBQUU7WUFDMUYsT0FBTyxPQUFPLENBQUM7U0FDaEI7UUFDRCxJQUFJLGdCQUFnQixLQUFLLE9BQU8sSUFBSSxrQkFBa0IsQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsVUFBVSxFQUFFO1lBQzVHLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7UUFFRCxPQUFPLGdCQUFnQixDQUFDO0lBQzFCLENBQUM7OztZQTVORixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7S0FlUDthQUNKOzs7WUFyQnFELFVBQVU7WUFBeEMsaUJBQWlCOzs7c0JBdUJ0QyxLQUFLO3dCQUVMLEtBQUs7b0JBRUwsS0FBSzt3QkFFTCxLQUFLO3lCQUdMLFNBQVMsU0FBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFBvcE92ZXJEaXJlY3RpdmUgfSBmcm9tICcuL1BvcE92ZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdwb3BvdmVyLWNvbnRlbnQnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiAjcG9wb3ZlckRpdlxyXG4gICAgICAgICAgICBjbGFzcz1cInBvcG92ZXIge3sgZWZmZWN0aXZlUGxhY2VtZW50IH19XCJcclxuICAgICAgICAgICAgW3N0eWxlLnRvcF09XCJ0b3AgKyAncHgnXCJcclxuICAgICAgICAgICAgW3N0eWxlLmxlZnRdPVwibGVmdCArICdweCdcIlxyXG4gICAgICAgICAgICBbY2xhc3MuZmFkZV09XCJhbmltYXRpb25cIlxyXG4gICAgICAgICAgICBzdHlsZT1cImRpc3BsYXk6IGJsb2NrXCJcclxuICAgICAgICAgICAgcm9sZT1cInBvcG92ZXJcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFycm93IHt7ZWZmZWN0aXZlQWxpZ25tZW50fX1cIj48L2Rpdj5cclxuICAgICAgICAgICAgPGg0IGNsYXNzPVwicG9wb3Zlci10aXRsZVwiIFtoaWRkZW5dPVwiIXRpdGxlXCI+e3sgdGl0bGUgfX08L2g0PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicG9wb3Zlci1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicG9wb3Zlci1jb250ZW50LXRleHRcIj57eyBjb250ZW50IH19PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCxcclxufSlcclxuZXhwb3J0IGNsYXNzIFBvcE92ZXJDb250ZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgQElucHV0KClcclxuICBjb250ZW50OiBzdHJpbmc7XHJcbiAgQElucHV0KClcclxuICBwbGFjZW1lbnQ6IHN0cmluZyA9ICd0b3AnO1xyXG4gIEBJbnB1dCgpXHJcbiAgdGl0bGU6IHN0cmluZztcclxuICBASW5wdXQoKVxyXG4gIGFuaW1hdGlvbjogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIEBWaWV3Q2hpbGQoJ3BvcG92ZXJEaXYnKVxyXG4gIHBvcG92ZXJEaXY6IEVsZW1lbnRSZWY7XHJcbiAgcG9wb3ZlcjogUG9wT3ZlckRpcmVjdGl2ZTtcclxuICBvbkNsb3NlRnJvbU91dHNpZGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgdG9wOiBudW1iZXIgPSAtMTAwMDA7XHJcbiAgbGVmdDogbnVtYmVyID0gLTEwMDAwO1xyXG4gIGRpc3BsYXlUeXBlOiBzdHJpbmcgPSAnbm9uZSc7XHJcbiAgZWZmZWN0aXZlUGxhY2VtZW50OiBzdHJpbmc7XHJcbiAgZWZmZWN0aXZlQWxpZ25tZW50OiBzdHJpbmc7XHJcbiAgaXNIaWRkZW46IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7IH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5zaG93KCk7XHJcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGUoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5pc0hpZGRlbikge1xyXG4gICAgICB0aGlzLnNob3coKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2hvdygpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5wb3BvdmVyIHx8ICF0aGlzLnBvcG92ZXIuZ2V0RWxlbWVudCgpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwID0gdGhpcy5wb3NpdGlvbkVsZW1lbnRzKHRoaXMucG9wb3Zlci5nZXRFbGVtZW50KCksIHRoaXMucG9wb3ZlckRpdi5uYXRpdmVFbGVtZW50LCB0aGlzLnBsYWNlbWVudCk7XHJcbiAgICB0aGlzLmRpc3BsYXlUeXBlID0gJ2Jsb2NrJztcclxuICAgIHRoaXMudG9wID0gcC50b3A7XHJcbiAgICB0aGlzLmxlZnQgPSBwLmxlZnQ7XHJcbiAgICB0aGlzLmlzSGlkZGVuID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBoaWRlKCk6IHZvaWQge1xyXG4gICAgdGhpcy50b3AgPSAtMTAwMDA7XHJcbiAgICB0aGlzLmxlZnQgPSAtMTAwMDA7XHJcbiAgICB0aGlzLmlzSGlkZGVuID0gdHJ1ZTtcclxuICAgIHRoaXMucG9wb3Zlci5oaWRlKCk7XHJcbiAgfVxyXG5cclxuICBoaWRlRnJvbVBvcG92ZXIoKSB7XHJcbiAgICB0aGlzLnRvcCA9IC0xMDAwMDtcclxuICAgIHRoaXMubGVmdCA9IC0xMDAwMDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBwb3NpdGlvbkVsZW1lbnRzKFxyXG4gICAgaG9zdEVsOiBIVE1MRWxlbWVudCxcclxuICAgIHRhcmdldEVsOiBIVE1MRWxlbWVudCxcclxuICAgIHBvc2l0aW9uU3RyOiBzdHJpbmcsXHJcbiAgICBhcHBlbmRUb0JvZHkgPSBmYWxzZSxcclxuICApOiB7IHRvcDogbnVtYmVyOyBsZWZ0OiBudW1iZXIgfSB7XHJcbiAgICBjb25zdCBwb3NpdGlvblN0clBhcnRzID0gcG9zaXRpb25TdHIuc3BsaXQoJy0nKTtcclxuICAgIGNvbnN0IG1haW5TaWRlID0gKHRoaXMuZWZmZWN0aXZlUGxhY2VtZW50ID0gdGhpcy5nZXRFZmZlY3RpdmVQbGFjZW1lbnQocG9zaXRpb25TdHJQYXJ0c1swXSB8fCAncmlnaHQnLCBob3N0RWwsIHRhcmdldEVsKSk7XHJcbiAgICBjb25zdCBvcmllbnRhdGlvbiA9ICh0aGlzLmVmZmVjdGl2ZUFsaWdubWVudCA9IHBvc2l0aW9uU3RyUGFydHNbMV0gfHwgJ2NlbnRlcicpO1xyXG4gICAgY29uc3QgaG9zdEVsUG9zID0gYXBwZW5kVG9Cb2R5ID8gdGhpcy5vZmZzZXQoaG9zdEVsKSA6IHRoaXMucG9zaXRpb24oaG9zdEVsKTtcclxuICAgIGNvbnN0IHRhcmdldEVsV2lkdGggPSB0YXJnZXRFbC5vZmZzZXRXaWR0aDtcclxuICAgIGNvbnN0IHRhcmdldEVsSGVpZ2h0ID0gdGFyZ2V0RWwub2Zmc2V0SGVpZ2h0O1xyXG5cclxuICAgIGNvbnN0IHNoaWZ0V2lkdGg6IGFueSA9IHtcclxuICAgICAgY2VudGVyKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIGhvc3RFbFBvcy5sZWZ0ICsgKGhvc3RFbFBvcy53aWR0aCAtIHRhcmdldEVsV2lkdGgpIC8gMjtcclxuICAgICAgfSxcclxuICAgICAgcmlnaHQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gaG9zdEVsUG9zLmxlZnQ7XHJcbiAgICAgIH0sXHJcbiAgICAgIGxlZnQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gaG9zdEVsUG9zLmxlZnQgKyAoaG9zdEVsUG9zLndpZHRoIC0gdGFyZ2V0RWxXaWR0aCk7XHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHNoaWZ0SGVpZ2h0OiBhbnkgPSB7XHJcbiAgICAgIGNlbnRlcigpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBob3N0RWxQb3MudG9wICsgKGhvc3RFbFBvcy5oZWlnaHQgLSB0YXJnZXRFbEhlaWdodCkgLyAyO1xyXG4gICAgICB9LFxyXG4gICAgICBib3R0b20oKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gaG9zdEVsUG9zLnRvcDtcclxuICAgICAgfSxcclxuICAgICAgdG9wKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIGhvc3RFbFBvcy50b3AgKyAoaG9zdEVsUG9zLmhlaWdodCAtIHRhcmdldEVsSGVpZ2h0KTtcclxuICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgbGV0IHRhcmdldEVsUG9zOiB7IHRvcDogbnVtYmVyOyBsZWZ0OiBudW1iZXIgfTtcclxuICAgIHN3aXRjaCAobWFpblNpZGUpIHtcclxuICAgICAgY2FzZSAncmlnaHQnOlxyXG4gICAgICAgIHRhcmdldEVsUG9zID0ge1xyXG4gICAgICAgICAgdG9wOiBzaGlmdEhlaWdodFtvcmllbnRhdGlvbl0oKSxcclxuICAgICAgICAgIGxlZnQ6IGhvc3RFbFBvcy5sZWZ0ICsgaG9zdEVsUG9zLndpZHRoLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlICdsZWZ0JzpcclxuICAgICAgICB0YXJnZXRFbFBvcyA9IHtcclxuICAgICAgICAgIHRvcDogc2hpZnRIZWlnaHRbb3JpZW50YXRpb25dKCksXHJcbiAgICAgICAgICBsZWZ0OiBob3N0RWxQb3MubGVmdCAtIHRhcmdldEVsV2lkdGgsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgJ2JvdHRvbSc6XHJcbiAgICAgICAgdGFyZ2V0RWxQb3MgPSB7XHJcbiAgICAgICAgICB0b3A6IGhvc3RFbFBvcy50b3AgKyBob3N0RWxQb3MuaGVpZ2h0LFxyXG4gICAgICAgICAgbGVmdDogc2hpZnRXaWR0aFtvcmllbnRhdGlvbl0oKSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB0YXJnZXRFbFBvcyA9IHtcclxuICAgICAgICAgIHRvcDogaG9zdEVsUG9zLnRvcCAtIHRhcmdldEVsSGVpZ2h0LFxyXG4gICAgICAgICAgbGVmdDogc2hpZnRXaWR0aFtvcmllbnRhdGlvbl0oKSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0YXJnZXRFbFBvcztcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBwb3NpdGlvbihuYXRpdmVFbDogSFRNTEVsZW1lbnQpOiB7IHdpZHRoOiBudW1iZXI7IGhlaWdodDogbnVtYmVyOyB0b3A6IG51bWJlcjsgbGVmdDogbnVtYmVyIH0ge1xyXG4gICAgbGV0IG9mZnNldFBhcmVudEJDUiA9IHsgdG9wOiAwLCBsZWZ0OiAwIH07XHJcbiAgICBjb25zdCBlbEJDUiA9IHRoaXMub2Zmc2V0KG5hdGl2ZUVsKTtcclxuICAgIGNvbnN0IG9mZnNldFBhcmVudEVsID0gdGhpcy5wYXJlbnRPZmZzZXRFbChuYXRpdmVFbCk7XHJcbiAgICBpZiAob2Zmc2V0UGFyZW50RWwgIT09IHdpbmRvdy5kb2N1bWVudCkge1xyXG4gICAgICBvZmZzZXRQYXJlbnRCQ1IgPSB0aGlzLm9mZnNldChvZmZzZXRQYXJlbnRFbCk7XHJcbiAgICAgIG9mZnNldFBhcmVudEJDUi50b3AgKz0gb2Zmc2V0UGFyZW50RWwuY2xpZW50VG9wIC0gb2Zmc2V0UGFyZW50RWwuc2Nyb2xsVG9wO1xyXG4gICAgICBvZmZzZXRQYXJlbnRCQ1IubGVmdCArPSBvZmZzZXRQYXJlbnRFbC5jbGllbnRMZWZ0IC0gb2Zmc2V0UGFyZW50RWwuc2Nyb2xsTGVmdDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBib3VuZGluZ0NsaWVudFJlY3QgPSBuYXRpdmVFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHdpZHRoOiBib3VuZGluZ0NsaWVudFJlY3Qud2lkdGggfHwgbmF0aXZlRWwub2Zmc2V0V2lkdGgsXHJcbiAgICAgIGhlaWdodDogYm91bmRpbmdDbGllbnRSZWN0LmhlaWdodCB8fCBuYXRpdmVFbC5vZmZzZXRIZWlnaHQsXHJcbiAgICAgIHRvcDogZWxCQ1IudG9wIC0gb2Zmc2V0UGFyZW50QkNSLnRvcCxcclxuICAgICAgbGVmdDogZWxCQ1IubGVmdCAtIG9mZnNldFBhcmVudEJDUi5sZWZ0LFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBvZmZzZXQobmF0aXZlRWw6IGFueSk6IHsgd2lkdGg6IG51bWJlcjsgaGVpZ2h0OiBudW1iZXI7IHRvcDogbnVtYmVyOyBsZWZ0OiBudW1iZXIgfSB7XHJcbiAgICBjb25zdCBib3VuZGluZ0NsaWVudFJlY3QgPSBuYXRpdmVFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHdpZHRoOiBib3VuZGluZ0NsaWVudFJlY3Qud2lkdGggfHwgbmF0aXZlRWwub2Zmc2V0V2lkdGgsXHJcbiAgICAgIGhlaWdodDogYm91bmRpbmdDbGllbnRSZWN0LmhlaWdodCB8fCBuYXRpdmVFbC5vZmZzZXRIZWlnaHQsXHJcbiAgICAgIHRvcDogYm91bmRpbmdDbGllbnRSZWN0LnRvcCArICh3aW5kb3cucGFnZVlPZmZzZXQgfHwgd2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3ApLFxyXG4gICAgICBsZWZ0OiBib3VuZGluZ0NsaWVudFJlY3QubGVmdCArICh3aW5kb3cucGFnZVhPZmZzZXQgfHwgd2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0KSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2V0U3R5bGUobmF0aXZlRWw6IEhUTUxFbGVtZW50LCBjc3NQcm9wOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgaWYgKChuYXRpdmVFbCBhcyBhbnkpLmN1cnJlbnRTdHlsZSkge1xyXG4gICAgICByZXR1cm4gKG5hdGl2ZUVsIGFzIGFueSkuY3VycmVudFN0eWxlW2Nzc1Byb3BdO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSkge1xyXG4gICAgICByZXR1cm4gKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlIGFzIGFueSkobmF0aXZlRWwpW2Nzc1Byb3BdO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAobmF0aXZlRWwuc3R5bGUgYXMgYW55KVtjc3NQcm9wXTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBpc1N0YXRpY1Bvc2l0aW9uZWQobmF0aXZlRWw6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gKHRoaXMuZ2V0U3R5bGUobmF0aXZlRWwsICdwb3NpdGlvbicpIHx8ICdzdGF0aWMnKSA9PT0gJ3N0YXRpYyc7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgcGFyZW50T2Zmc2V0RWwobmF0aXZlRWw6IEhUTUxFbGVtZW50KTogYW55IHtcclxuICAgIGxldCBvZmZzZXRQYXJlbnQ6IGFueSA9IG5hdGl2ZUVsLm9mZnNldFBhcmVudCB8fCB3aW5kb3cuZG9jdW1lbnQ7XHJcbiAgICB3aGlsZSAob2Zmc2V0UGFyZW50ICYmIG9mZnNldFBhcmVudCAhPT0gd2luZG93LmRvY3VtZW50ICYmIHRoaXMuaXNTdGF0aWNQb3NpdGlvbmVkKG9mZnNldFBhcmVudCkpIHtcclxuICAgICAgb2Zmc2V0UGFyZW50ID0gb2Zmc2V0UGFyZW50Lm9mZnNldFBhcmVudDtcclxuICAgIH1cclxuICAgIHJldHVybiBvZmZzZXRQYXJlbnQgfHwgd2luZG93LmRvY3VtZW50O1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGdldEVmZmVjdGl2ZVBsYWNlbWVudChkZXNpcmVkUGxhY2VtZW50OiBzdHJpbmcsIGhvc3RFbGVtZW50OiBIVE1MRWxlbWVudCwgdGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgaG9zdEVsQm91bmRpbmdSZWN0ID0gaG9zdEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgaWYgKGRlc2lyZWRQbGFjZW1lbnQgPT09ICd0b3AnICYmIGhvc3RFbEJvdW5kaW5nUmVjdC50b3AgLSB0YXJnZXRFbGVtZW50Lm9mZnNldEhlaWdodCA8IDApIHtcclxuICAgICAgcmV0dXJuICdib3R0b20nO1xyXG4gICAgfVxyXG4gICAgaWYgKGRlc2lyZWRQbGFjZW1lbnQgPT09ICdib3R0b20nICYmIGhvc3RFbEJvdW5kaW5nUmVjdC5ib3R0b20gKyB0YXJnZXRFbGVtZW50Lm9mZnNldEhlaWdodCA+IHdpbmRvdy5pbm5lckhlaWdodCkge1xyXG4gICAgICByZXR1cm4gJ3RvcCc7XHJcbiAgICB9XHJcbiAgICBpZiAoZGVzaXJlZFBsYWNlbWVudCA9PT0gJ2xlZnQnICYmIGhvc3RFbEJvdW5kaW5nUmVjdC5sZWZ0IC0gdGFyZ2V0RWxlbWVudC5vZmZzZXRXaWR0aCA8IDApIHtcclxuICAgICAgcmV0dXJuICdyaWdodCc7XHJcbiAgICB9XHJcbiAgICBpZiAoZGVzaXJlZFBsYWNlbWVudCA9PT0gJ3JpZ2h0JyAmJiBob3N0RWxCb3VuZGluZ1JlY3QucmlnaHQgKyB0YXJnZXRFbGVtZW50Lm9mZnNldFdpZHRoID4gd2luZG93LmlubmVyV2lkdGgpIHtcclxuICAgICAgcmV0dXJuICdsZWZ0JztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZGVzaXJlZFBsYWNlbWVudDtcclxuICB9XHJcbn1cclxuIl19
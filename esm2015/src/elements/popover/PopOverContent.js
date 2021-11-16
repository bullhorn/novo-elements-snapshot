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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9wT3ZlckNvbnRlbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvcG9wb3Zlci9Qb3BPdmVyQ29udGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWlCLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUF3QnhILE1BQU0sT0FBTyxjQUFjO0lBcUJ6QixZQUFzQixPQUFtQixFQUFZLEdBQXNCO1FBQXJELFlBQU8sR0FBUCxPQUFPLENBQVk7UUFBWSxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQWpCM0UsY0FBUyxHQUFXLEtBQUssQ0FBQztRQUkxQixjQUFTLEdBQVksSUFBSSxDQUFDO1FBSzFCLHVCQUFrQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDeEMsUUFBRyxHQUFXLENBQUMsS0FBSyxDQUFDO1FBQ3JCLFNBQUksR0FBVyxDQUFDLEtBQUssQ0FBQztRQUN0QixnQkFBVyxHQUFXLE1BQU0sQ0FBQztRQUc3QixhQUFRLEdBQVksS0FBSyxDQUFDO0lBRW9ELENBQUM7SUFFL0UsZUFBZTtRQUNiLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2I7YUFBTTtZQUNMLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNiO0lBQ0gsQ0FBQztJQUVELElBQUk7UUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDL0MsT0FBTztTQUNSO1FBRUQsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFHLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDO1FBQzNCLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQUk7UUFDRixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFDbEIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBRVMsZ0JBQWdCLENBQ3hCLE1BQW1CLEVBQ25CLFFBQXFCLEVBQ3JCLFdBQW1CLEVBQ25CLFlBQVksR0FBRyxLQUFLO1FBRXBCLE1BQU0sZ0JBQWdCLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoRCxNQUFNLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQzFILE1BQU0sV0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDO1FBQ2hGLE1BQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3RSxNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDO1FBQzNDLE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUM7UUFFN0MsTUFBTSxVQUFVLEdBQVE7WUFDdEIsTUFBTTtnQkFDSixPQUFPLFNBQVMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoRSxDQUFDO1lBQ0QsS0FBSztnQkFDSCxPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUM7WUFDeEIsQ0FBQztZQUNELElBQUk7Z0JBQ0YsT0FBTyxTQUFTLENBQUMsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUMsQ0FBQztZQUM1RCxDQUFDO1NBQ0YsQ0FBQztRQUVGLE1BQU0sV0FBVyxHQUFRO1lBQ3ZCLE1BQU07Z0JBQ0osT0FBTyxTQUFTLENBQUMsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakUsQ0FBQztZQUNELE1BQU07Z0JBQ0osT0FBTyxTQUFTLENBQUMsR0FBRyxDQUFDO1lBQ3ZCLENBQUM7WUFDRCxHQUFHO2dCQUNELE9BQU8sU0FBUyxDQUFDLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsY0FBYyxDQUFDLENBQUM7WUFDN0QsQ0FBQztTQUNGLENBQUM7UUFFRixJQUFJLFdBQTBDLENBQUM7UUFDL0MsUUFBUSxRQUFRLEVBQUU7WUFDaEIsS0FBSyxPQUFPO2dCQUNWLFdBQVcsR0FBRztvQkFDWixHQUFHLEVBQUUsV0FBVyxDQUFDLFdBQVcsQ0FBQyxFQUFFO29CQUMvQixJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsS0FBSztpQkFDdkMsQ0FBQztnQkFDRixNQUFNO1lBRVIsS0FBSyxNQUFNO2dCQUNULFdBQVcsR0FBRztvQkFDWixHQUFHLEVBQUUsV0FBVyxDQUFDLFdBQVcsQ0FBQyxFQUFFO29CQUMvQixJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksR0FBRyxhQUFhO2lCQUNyQyxDQUFDO2dCQUNGLE1BQU07WUFFUixLQUFLLFFBQVE7Z0JBQ1gsV0FBVyxHQUFHO29CQUNaLEdBQUcsRUFBRSxTQUFTLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQyxNQUFNO29CQUNyQyxJQUFJLEVBQUUsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO2lCQUNoQyxDQUFDO2dCQUNGLE1BQU07WUFFUjtnQkFDRSxXQUFXLEdBQUc7b0JBQ1osR0FBRyxFQUFFLFNBQVMsQ0FBQyxHQUFHLEdBQUcsY0FBYztvQkFDbkMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRTtpQkFDaEMsQ0FBQztnQkFDRixNQUFNO1NBQ1Q7UUFFRCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDO0lBRVMsUUFBUSxDQUFDLFFBQXFCO1FBQ3RDLElBQUksZUFBZSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDMUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwQyxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JELElBQUksY0FBYyxLQUFLLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDdEMsZUFBZSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDOUMsZUFBZSxDQUFDLEdBQUcsSUFBSSxjQUFjLENBQUMsU0FBUyxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUM7WUFDM0UsZUFBZSxDQUFDLElBQUksSUFBSSxjQUFjLENBQUMsVUFBVSxHQUFHLGNBQWMsQ0FBQyxVQUFVLENBQUM7U0FDL0U7UUFFRCxNQUFNLGtCQUFrQixHQUFHLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzVELE9BQU87WUFDTCxLQUFLLEVBQUUsa0JBQWtCLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxXQUFXO1lBQ3ZELE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxNQUFNLElBQUksUUFBUSxDQUFDLFlBQVk7WUFDMUQsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHLEdBQUcsZUFBZSxDQUFDLEdBQUc7WUFDcEMsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLEdBQUcsZUFBZSxDQUFDLElBQUk7U0FDeEMsQ0FBQztJQUNKLENBQUM7SUFFUyxNQUFNLENBQUMsUUFBYTtRQUM1QixNQUFNLGtCQUFrQixHQUFHLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzVELE9BQU87WUFDTCxLQUFLLEVBQUUsa0JBQWtCLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxXQUFXO1lBQ3ZELE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxNQUFNLElBQUksUUFBUSxDQUFDLFlBQVk7WUFDMUQsR0FBRyxFQUFFLGtCQUFrQixDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDO1lBQy9GLElBQUksRUFBRSxrQkFBa0IsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQztTQUNuRyxDQUFDO0lBQ0osQ0FBQztJQUVTLFFBQVEsQ0FBQyxRQUFxQixFQUFFLE9BQWU7UUFDdkQsSUFBSyxRQUFnQixDQUFDLFlBQVksRUFBRTtZQUNsQyxPQUFRLFFBQWdCLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2hEO1FBRUQsSUFBSSxNQUFNLENBQUMsZ0JBQWdCLEVBQUU7WUFDM0IsT0FBUSxNQUFNLENBQUMsZ0JBQXdCLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDNUQ7UUFFRCxPQUFRLFFBQVEsQ0FBQyxLQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVTLGtCQUFrQixDQUFDLFFBQXFCO1FBQ2hELE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxRQUFRLENBQUM7SUFDeEUsQ0FBQztJQUVTLGNBQWMsQ0FBQyxRQUFxQjtRQUM1QyxJQUFJLFlBQVksR0FBUSxRQUFRLENBQUMsWUFBWSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDakUsT0FBTyxZQUFZLElBQUksWUFBWSxLQUFLLE1BQU0sQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ2hHLFlBQVksR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDO1NBQzFDO1FBQ0QsT0FBTyxZQUFZLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUN6QyxDQUFDO0lBRVMscUJBQXFCLENBQUMsZ0JBQXdCLEVBQUUsV0FBd0IsRUFBRSxhQUEwQjtRQUM1RyxNQUFNLGtCQUFrQixHQUFHLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBRS9ELElBQUksZ0JBQWdCLEtBQUssS0FBSyxJQUFJLGtCQUFrQixDQUFDLEdBQUcsR0FBRyxhQUFhLENBQUMsWUFBWSxHQUFHLENBQUMsRUFBRTtZQUN6RixPQUFPLFFBQVEsQ0FBQztTQUNqQjtRQUNELElBQUksZ0JBQWdCLEtBQUssUUFBUSxJQUFJLGtCQUFrQixDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUU7WUFDaEgsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELElBQUksZ0JBQWdCLEtBQUssTUFBTSxJQUFJLGtCQUFrQixDQUFDLElBQUksR0FBRyxhQUFhLENBQUMsV0FBVyxHQUFHLENBQUMsRUFBRTtZQUMxRixPQUFPLE9BQU8sQ0FBQztTQUNoQjtRQUNELElBQUksZ0JBQWdCLEtBQUssT0FBTyxJQUFJLGtCQUFrQixDQUFDLEtBQUssR0FBRyxhQUFhLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUU7WUFDNUcsT0FBTyxNQUFNLENBQUM7U0FDZjtRQUVELE9BQU8sZ0JBQWdCLENBQUM7SUFDMUIsQ0FBQzs7O1lBOU5GLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJUO2FBQ0Y7OztZQXZCcUQsVUFBVTtZQUF4QyxpQkFBaUI7OztzQkF5QnRDLEtBQUs7d0JBRUwsS0FBSztvQkFFTCxLQUFLO3dCQUVMLEtBQUs7eUJBR0wsU0FBUyxTQUFDLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBvcE92ZXJEaXJlY3RpdmUgfSBmcm9tICcuL1BvcE92ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwb3BvdmVyLWNvbnRlbnQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgICNwb3BvdmVyRGl2XG4gICAgICBjbGFzcz1cInBvcG92ZXIge3sgZWZmZWN0aXZlUGxhY2VtZW50IH19XCJcbiAgICAgIFtzdHlsZS50b3BdPVwidG9wICsgJ3B4J1wiXG4gICAgICBbc3R5bGUubGVmdF09XCJsZWZ0ICsgJ3B4J1wiXG4gICAgICBbY2xhc3MuZmFkZV09XCJhbmltYXRpb25cIlxuICAgICAgc3R5bGU9XCJkaXNwbGF5OiBibG9ja1wiXG4gICAgICByb2xlPVwicG9wb3ZlclwiXG4gICAgPlxuICAgICAgPGRpdiBjbGFzcz1cImFycm93IHt7IGVmZmVjdGl2ZUFsaWdubWVudCB9fVwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInBvcG92ZXItdGl0bGVcIiBbaGlkZGVuXT1cIiF0aXRsZVwiPnt7IHRpdGxlIH19PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwicG9wb3Zlci1jb250ZW50XCI+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBvcG92ZXItY29udGVudC10ZXh0XCI+e3sgY29udGVudCB9fTwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIFBvcE92ZXJDb250ZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBJbnB1dCgpXG4gIGNvbnRlbnQ6IHN0cmluZztcbiAgQElucHV0KClcbiAgcGxhY2VtZW50OiBzdHJpbmcgPSAndG9wJztcbiAgQElucHV0KClcbiAgdGl0bGU6IHN0cmluZztcbiAgQElucHV0KClcbiAgYW5pbWF0aW9uOiBib29sZWFuID0gdHJ1ZTtcblxuICBAVmlld0NoaWxkKCdwb3BvdmVyRGl2JylcbiAgcG9wb3ZlckRpdjogRWxlbWVudFJlZjtcbiAgcG9wb3ZlcjogUG9wT3ZlckRpcmVjdGl2ZTtcbiAgb25DbG9zZUZyb21PdXRzaWRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICB0b3A6IG51bWJlciA9IC0xMDAwMDtcbiAgbGVmdDogbnVtYmVyID0gLTEwMDAwO1xuICBkaXNwbGF5VHlwZTogc3RyaW5nID0gJ25vbmUnO1xuICBlZmZlY3RpdmVQbGFjZW1lbnQ6IHN0cmluZztcbiAgZWZmZWN0aXZlQWxpZ25tZW50OiBzdHJpbmc7XG4gIGlzSGlkZGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNob3coKTtcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICB0b2dnbGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNIaWRkZW4pIHtcbiAgICAgIHRoaXMuc2hvdygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG4gIH1cblxuICBzaG93KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5wb3BvdmVyIHx8ICF0aGlzLnBvcG92ZXIuZ2V0RWxlbWVudCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcCA9IHRoaXMucG9zaXRpb25FbGVtZW50cyh0aGlzLnBvcG92ZXIuZ2V0RWxlbWVudCgpLCB0aGlzLnBvcG92ZXJEaXYubmF0aXZlRWxlbWVudCwgdGhpcy5wbGFjZW1lbnQpO1xuICAgIHRoaXMuZGlzcGxheVR5cGUgPSAnYmxvY2snO1xuICAgIHRoaXMudG9wID0gcC50b3A7XG4gICAgdGhpcy5sZWZ0ID0gcC5sZWZ0O1xuICAgIHRoaXMuaXNIaWRkZW4gPSBmYWxzZTtcbiAgfVxuXG4gIGhpZGUoKTogdm9pZCB7XG4gICAgdGhpcy50b3AgPSAtMTAwMDA7XG4gICAgdGhpcy5sZWZ0ID0gLTEwMDAwO1xuICAgIHRoaXMuaXNIaWRkZW4gPSB0cnVlO1xuICAgIHRoaXMucG9wb3Zlci5oaWRlKCk7XG4gIH1cblxuICBoaWRlRnJvbVBvcG92ZXIoKSB7XG4gICAgdGhpcy50b3AgPSAtMTAwMDA7XG4gICAgdGhpcy5sZWZ0ID0gLTEwMDAwO1xuICB9XG5cbiAgcHJvdGVjdGVkIHBvc2l0aW9uRWxlbWVudHMoXG4gICAgaG9zdEVsOiBIVE1MRWxlbWVudCxcbiAgICB0YXJnZXRFbDogSFRNTEVsZW1lbnQsXG4gICAgcG9zaXRpb25TdHI6IHN0cmluZyxcbiAgICBhcHBlbmRUb0JvZHkgPSBmYWxzZSxcbiAgKTogeyB0b3A6IG51bWJlcjsgbGVmdDogbnVtYmVyIH0ge1xuICAgIGNvbnN0IHBvc2l0aW9uU3RyUGFydHMgPSBwb3NpdGlvblN0ci5zcGxpdCgnLScpO1xuICAgIGNvbnN0IG1haW5TaWRlID0gKHRoaXMuZWZmZWN0aXZlUGxhY2VtZW50ID0gdGhpcy5nZXRFZmZlY3RpdmVQbGFjZW1lbnQocG9zaXRpb25TdHJQYXJ0c1swXSB8fCAncmlnaHQnLCBob3N0RWwsIHRhcmdldEVsKSk7XG4gICAgY29uc3Qgb3JpZW50YXRpb24gPSAodGhpcy5lZmZlY3RpdmVBbGlnbm1lbnQgPSBwb3NpdGlvblN0clBhcnRzWzFdIHx8ICdjZW50ZXInKTtcbiAgICBjb25zdCBob3N0RWxQb3MgPSBhcHBlbmRUb0JvZHkgPyB0aGlzLm9mZnNldChob3N0RWwpIDogdGhpcy5wb3NpdGlvbihob3N0RWwpO1xuICAgIGNvbnN0IHRhcmdldEVsV2lkdGggPSB0YXJnZXRFbC5vZmZzZXRXaWR0aDtcbiAgICBjb25zdCB0YXJnZXRFbEhlaWdodCA9IHRhcmdldEVsLm9mZnNldEhlaWdodDtcblxuICAgIGNvbnN0IHNoaWZ0V2lkdGg6IGFueSA9IHtcbiAgICAgIGNlbnRlcigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gaG9zdEVsUG9zLmxlZnQgKyAoaG9zdEVsUG9zLndpZHRoIC0gdGFyZ2V0RWxXaWR0aCkgLyAyO1xuICAgICAgfSxcbiAgICAgIHJpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBob3N0RWxQb3MubGVmdDtcbiAgICAgIH0sXG4gICAgICBsZWZ0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBob3N0RWxQb3MubGVmdCArIChob3N0RWxQb3Mud2lkdGggLSB0YXJnZXRFbFdpZHRoKTtcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGNvbnN0IHNoaWZ0SGVpZ2h0OiBhbnkgPSB7XG4gICAgICBjZW50ZXIoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGhvc3RFbFBvcy50b3AgKyAoaG9zdEVsUG9zLmhlaWdodCAtIHRhcmdldEVsSGVpZ2h0KSAvIDI7XG4gICAgICB9LFxuICAgICAgYm90dG9tKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBob3N0RWxQb3MudG9wO1xuICAgICAgfSxcbiAgICAgIHRvcCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gaG9zdEVsUG9zLnRvcCArIChob3N0RWxQb3MuaGVpZ2h0IC0gdGFyZ2V0RWxIZWlnaHQpO1xuICAgICAgfSxcbiAgICB9O1xuXG4gICAgbGV0IHRhcmdldEVsUG9zOiB7IHRvcDogbnVtYmVyOyBsZWZ0OiBudW1iZXIgfTtcbiAgICBzd2l0Y2ggKG1haW5TaWRlKSB7XG4gICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgIHRhcmdldEVsUG9zID0ge1xuICAgICAgICAgIHRvcDogc2hpZnRIZWlnaHRbb3JpZW50YXRpb25dKCksXG4gICAgICAgICAgbGVmdDogaG9zdEVsUG9zLmxlZnQgKyBob3N0RWxQb3Mud2lkdGgsXG4gICAgICAgIH07XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgdGFyZ2V0RWxQb3MgPSB7XG4gICAgICAgICAgdG9wOiBzaGlmdEhlaWdodFtvcmllbnRhdGlvbl0oKSxcbiAgICAgICAgICBsZWZ0OiBob3N0RWxQb3MubGVmdCAtIHRhcmdldEVsV2lkdGgsXG4gICAgICAgIH07XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICB0YXJnZXRFbFBvcyA9IHtcbiAgICAgICAgICB0b3A6IGhvc3RFbFBvcy50b3AgKyBob3N0RWxQb3MuaGVpZ2h0LFxuICAgICAgICAgIGxlZnQ6IHNoaWZ0V2lkdGhbb3JpZW50YXRpb25dKCksXG4gICAgICAgIH07XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0YXJnZXRFbFBvcyA9IHtcbiAgICAgICAgICB0b3A6IGhvc3RFbFBvcy50b3AgLSB0YXJnZXRFbEhlaWdodCxcbiAgICAgICAgICBsZWZ0OiBzaGlmdFdpZHRoW29yaWVudGF0aW9uXSgpLFxuICAgICAgICB9O1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0RWxQb3M7XG4gIH1cblxuICBwcm90ZWN0ZWQgcG9zaXRpb24obmF0aXZlRWw6IEhUTUxFbGVtZW50KTogeyB3aWR0aDogbnVtYmVyOyBoZWlnaHQ6IG51bWJlcjsgdG9wOiBudW1iZXI7IGxlZnQ6IG51bWJlciB9IHtcbiAgICBsZXQgb2Zmc2V0UGFyZW50QkNSID0geyB0b3A6IDAsIGxlZnQ6IDAgfTtcbiAgICBjb25zdCBlbEJDUiA9IHRoaXMub2Zmc2V0KG5hdGl2ZUVsKTtcbiAgICBjb25zdCBvZmZzZXRQYXJlbnRFbCA9IHRoaXMucGFyZW50T2Zmc2V0RWwobmF0aXZlRWwpO1xuICAgIGlmIChvZmZzZXRQYXJlbnRFbCAhPT0gd2luZG93LmRvY3VtZW50KSB7XG4gICAgICBvZmZzZXRQYXJlbnRCQ1IgPSB0aGlzLm9mZnNldChvZmZzZXRQYXJlbnRFbCk7XG4gICAgICBvZmZzZXRQYXJlbnRCQ1IudG9wICs9IG9mZnNldFBhcmVudEVsLmNsaWVudFRvcCAtIG9mZnNldFBhcmVudEVsLnNjcm9sbFRvcDtcbiAgICAgIG9mZnNldFBhcmVudEJDUi5sZWZ0ICs9IG9mZnNldFBhcmVudEVsLmNsaWVudExlZnQgLSBvZmZzZXRQYXJlbnRFbC5zY3JvbGxMZWZ0O1xuICAgIH1cblxuICAgIGNvbnN0IGJvdW5kaW5nQ2xpZW50UmVjdCA9IG5hdGl2ZUVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHJldHVybiB7XG4gICAgICB3aWR0aDogYm91bmRpbmdDbGllbnRSZWN0LndpZHRoIHx8IG5hdGl2ZUVsLm9mZnNldFdpZHRoLFxuICAgICAgaGVpZ2h0OiBib3VuZGluZ0NsaWVudFJlY3QuaGVpZ2h0IHx8IG5hdGl2ZUVsLm9mZnNldEhlaWdodCxcbiAgICAgIHRvcDogZWxCQ1IudG9wIC0gb2Zmc2V0UGFyZW50QkNSLnRvcCxcbiAgICAgIGxlZnQ6IGVsQkNSLmxlZnQgLSBvZmZzZXRQYXJlbnRCQ1IubGVmdCxcbiAgICB9O1xuICB9XG5cbiAgcHJvdGVjdGVkIG9mZnNldChuYXRpdmVFbDogYW55KTogeyB3aWR0aDogbnVtYmVyOyBoZWlnaHQ6IG51bWJlcjsgdG9wOiBudW1iZXI7IGxlZnQ6IG51bWJlciB9IHtcbiAgICBjb25zdCBib3VuZGluZ0NsaWVudFJlY3QgPSBuYXRpdmVFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICByZXR1cm4ge1xuICAgICAgd2lkdGg6IGJvdW5kaW5nQ2xpZW50UmVjdC53aWR0aCB8fCBuYXRpdmVFbC5vZmZzZXRXaWR0aCxcbiAgICAgIGhlaWdodDogYm91bmRpbmdDbGllbnRSZWN0LmhlaWdodCB8fCBuYXRpdmVFbC5vZmZzZXRIZWlnaHQsXG4gICAgICB0b3A6IGJvdW5kaW5nQ2xpZW50UmVjdC50b3AgKyAod2luZG93LnBhZ2VZT2Zmc2V0IHx8IHdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wKSxcbiAgICAgIGxlZnQ6IGJvdW5kaW5nQ2xpZW50UmVjdC5sZWZ0ICsgKHdpbmRvdy5wYWdlWE9mZnNldCB8fCB3aW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQpLFxuICAgIH07XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0U3R5bGUobmF0aXZlRWw6IEhUTUxFbGVtZW50LCBjc3NQcm9wOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICgobmF0aXZlRWwgYXMgYW55KS5jdXJyZW50U3R5bGUpIHtcbiAgICAgIHJldHVybiAobmF0aXZlRWwgYXMgYW55KS5jdXJyZW50U3R5bGVbY3NzUHJvcF07XG4gICAgfVxuXG4gICAgaWYgKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKSB7XG4gICAgICByZXR1cm4gKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlIGFzIGFueSkobmF0aXZlRWwpW2Nzc1Byb3BdO1xuICAgIH1cblxuICAgIHJldHVybiAobmF0aXZlRWwuc3R5bGUgYXMgYW55KVtjc3NQcm9wXTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc1N0YXRpY1Bvc2l0aW9uZWQobmF0aXZlRWw6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICh0aGlzLmdldFN0eWxlKG5hdGl2ZUVsLCAncG9zaXRpb24nKSB8fCAnc3RhdGljJykgPT09ICdzdGF0aWMnO1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcmVudE9mZnNldEVsKG5hdGl2ZUVsOiBIVE1MRWxlbWVudCk6IGFueSB7XG4gICAgbGV0IG9mZnNldFBhcmVudDogYW55ID0gbmF0aXZlRWwub2Zmc2V0UGFyZW50IHx8IHdpbmRvdy5kb2N1bWVudDtcbiAgICB3aGlsZSAob2Zmc2V0UGFyZW50ICYmIG9mZnNldFBhcmVudCAhPT0gd2luZG93LmRvY3VtZW50ICYmIHRoaXMuaXNTdGF0aWNQb3NpdGlvbmVkKG9mZnNldFBhcmVudCkpIHtcbiAgICAgIG9mZnNldFBhcmVudCA9IG9mZnNldFBhcmVudC5vZmZzZXRQYXJlbnQ7XG4gICAgfVxuICAgIHJldHVybiBvZmZzZXRQYXJlbnQgfHwgd2luZG93LmRvY3VtZW50O1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldEVmZmVjdGl2ZVBsYWNlbWVudChkZXNpcmVkUGxhY2VtZW50OiBzdHJpbmcsIGhvc3RFbGVtZW50OiBIVE1MRWxlbWVudCwgdGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQpOiBzdHJpbmcge1xuICAgIGNvbnN0IGhvc3RFbEJvdW5kaW5nUmVjdCA9IGhvc3RFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgaWYgKGRlc2lyZWRQbGFjZW1lbnQgPT09ICd0b3AnICYmIGhvc3RFbEJvdW5kaW5nUmVjdC50b3AgLSB0YXJnZXRFbGVtZW50Lm9mZnNldEhlaWdodCA8IDApIHtcbiAgICAgIHJldHVybiAnYm90dG9tJztcbiAgICB9XG4gICAgaWYgKGRlc2lyZWRQbGFjZW1lbnQgPT09ICdib3R0b20nICYmIGhvc3RFbEJvdW5kaW5nUmVjdC5ib3R0b20gKyB0YXJnZXRFbGVtZW50Lm9mZnNldEhlaWdodCA+IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgcmV0dXJuICd0b3AnO1xuICAgIH1cbiAgICBpZiAoZGVzaXJlZFBsYWNlbWVudCA9PT0gJ2xlZnQnICYmIGhvc3RFbEJvdW5kaW5nUmVjdC5sZWZ0IC0gdGFyZ2V0RWxlbWVudC5vZmZzZXRXaWR0aCA8IDApIHtcbiAgICAgIHJldHVybiAncmlnaHQnO1xuICAgIH1cbiAgICBpZiAoZGVzaXJlZFBsYWNlbWVudCA9PT0gJ3JpZ2h0JyAmJiBob3N0RWxCb3VuZGluZ1JlY3QucmlnaHQgKyB0YXJnZXRFbGVtZW50Lm9mZnNldFdpZHRoID4gd2luZG93LmlubmVyV2lkdGgpIHtcbiAgICAgIHJldHVybiAnbGVmdCc7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlc2lyZWRQbGFjZW1lbnQ7XG4gIH1cbn1cbiJdfQ==
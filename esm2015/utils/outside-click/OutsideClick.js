// NG2
import { EventEmitter, ElementRef, Injectable } from '@angular/core';
// APP
import { Helpers } from '../Helpers';
/**
 * Outside click helper, makes to set the element as inactive when clicking outside of it
 */
export class OutsideClick {
    constructor(element) {
        this.active = false;
        this.onActiveChange = new EventEmitter();
        // Component element
        this.element = element;
        // Outside click handler
        // Property because `this.func.bind(this)` returns a new function each time
        this.onOutsideClick = this.handleOutsideClick.bind(this);
    }
    /**
     * When the element is destroyed, make sure to remove the handler
     */
    ngOnDestroy() {
        window.removeEventListener('click', this.onOutsideClick);
    }
    /**
     * Toggles the element as active and adds/removes the outside click handler
     */
    toggleActive(event, forceValue) {
        // Reverse the active property (if forceValue, use that)
        this.active = !Helpers.isBlank(forceValue) ? forceValue : !this.active;
        // Bind window click events to hide on outside click
        if (this.active) {
            window.addEventListener('click', this.onOutsideClick);
        }
        else {
            window.removeEventListener('click', this.onOutsideClick);
        }
        // Fire the active change event
        this.onActiveChange.emit(this.active);
    }
    /**
     * When clicking outside, checks the element and closes if outside
     */
    handleOutsideClick(event) {
        // If the elements doesn't contain the target element, it is an outside click
        let outsideClick = !this.element.nativeElement.contains(event.target);
        if (this.otherElement && outsideClick) {
            outsideClick = !this.otherElement.nativeElement.contains(event.target);
        }
        if (outsideClick) {
            this.toggleActive(event, false);
        }
    }
}
OutsideClick.decorators = [
    { type: Injectable }
];
OutsideClick.ctorParameters = () => [
    { type: ElementRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3V0c2lkZUNsaWNrLmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9kZXZtYWNoaW5lL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJ1dGlscy9vdXRzaWRlLWNsaWNrL091dHNpZGVDbGljay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQWEsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hGLE1BQU07QUFDTixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRXJDOztHQUVHO0FBRUgsTUFBTSxPQUFPLFlBQVk7SUFPdkIsWUFBWSxPQUFtQjtRQUovQixXQUFNLEdBQVksS0FBSyxDQUFDO1FBRXhCLG1CQUFjLEdBQTBCLElBQUksWUFBWSxFQUFXLENBQUM7UUFHbEUsb0JBQW9CO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLHdCQUF3QjtRQUN4QiwyRUFBMkU7UUFDM0UsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRDs7T0FFRztJQUNILFdBQVc7UUFDVCxNQUFNLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxZQUFZLENBQUMsS0FBa0IsRUFBRSxVQUFvQjtRQUMxRCx3REFBd0Q7UUFDeEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZFLG9EQUFvRDtRQUNwRCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUN2RDthQUFNO1lBQ0wsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDMUQ7UUFDRCwrQkFBK0I7UUFDL0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7T0FFRztJQUNJLGtCQUFrQixDQUFDLEtBQWlCO1FBQ3pDLDZFQUE2RTtRQUM3RSxJQUFJLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEUsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLFlBQVksRUFBRTtZQUNyQyxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3hFO1FBQ0QsSUFBSSxZQUFZLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDakM7SUFDSCxDQUFDOzs7WUFuREYsVUFBVTs7O1lBUFksVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxyXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYsIE9uRGVzdHJveSwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4vLyBBUFBcclxuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJy4uL0hlbHBlcnMnO1xyXG5cclxuLyoqXHJcbiAqIE91dHNpZGUgY2xpY2sgaGVscGVyLCBtYWtlcyB0byBzZXQgdGhlIGVsZW1lbnQgYXMgaW5hY3RpdmUgd2hlbiBjbGlja2luZyBvdXRzaWRlIG9mIGl0XHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBPdXRzaWRlQ2xpY2sgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG4gIGVsZW1lbnQ6IEVsZW1lbnRSZWY7XHJcbiAgb3RoZXJFbGVtZW50OiBFbGVtZW50UmVmO1xyXG4gIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIG9uT3V0c2lkZUNsaWNrOiBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0O1xyXG4gIG9uQWN0aXZlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcclxuICAgIC8vIENvbXBvbmVudCBlbGVtZW50XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgLy8gT3V0c2lkZSBjbGljayBoYW5kbGVyXHJcbiAgICAvLyBQcm9wZXJ0eSBiZWNhdXNlIGB0aGlzLmZ1bmMuYmluZCh0aGlzKWAgcmV0dXJucyBhIG5ldyBmdW5jdGlvbiBlYWNoIHRpbWVcclxuICAgIHRoaXMub25PdXRzaWRlQ2xpY2sgPSB0aGlzLmhhbmRsZU91dHNpZGVDbGljay5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiB0aGUgZWxlbWVudCBpcyBkZXN0cm95ZWQsIG1ha2Ugc3VyZSB0byByZW1vdmUgdGhlIGhhbmRsZXJcclxuICAgKi9cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25PdXRzaWRlQ2xpY2spO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVG9nZ2xlcyB0aGUgZWxlbWVudCBhcyBhY3RpdmUgYW5kIGFkZHMvcmVtb3ZlcyB0aGUgb3V0c2lkZSBjbGljayBoYW5kbGVyXHJcbiAgICovXHJcbiAgcHVibGljIHRvZ2dsZUFjdGl2ZShldmVudD86IE1vdXNlRXZlbnQsIGZvcmNlVmFsdWU/OiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAvLyBSZXZlcnNlIHRoZSBhY3RpdmUgcHJvcGVydHkgKGlmIGZvcmNlVmFsdWUsIHVzZSB0aGF0KVxyXG4gICAgdGhpcy5hY3RpdmUgPSAhSGVscGVycy5pc0JsYW5rKGZvcmNlVmFsdWUpID8gZm9yY2VWYWx1ZSA6ICF0aGlzLmFjdGl2ZTtcclxuICAgIC8vIEJpbmQgd2luZG93IGNsaWNrIGV2ZW50cyB0byBoaWRlIG9uIG91dHNpZGUgY2xpY2tcclxuICAgIGlmICh0aGlzLmFjdGl2ZSkge1xyXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uT3V0c2lkZUNsaWNrKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25PdXRzaWRlQ2xpY2spO1xyXG4gICAgfVxyXG4gICAgLy8gRmlyZSB0aGUgYWN0aXZlIGNoYW5nZSBldmVudFxyXG4gICAgdGhpcy5vbkFjdGl2ZUNoYW5nZS5lbWl0KHRoaXMuYWN0aXZlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gY2xpY2tpbmcgb3V0c2lkZSwgY2hlY2tzIHRoZSBlbGVtZW50IGFuZCBjbG9zZXMgaWYgb3V0c2lkZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBoYW5kbGVPdXRzaWRlQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIC8vIElmIHRoZSBlbGVtZW50cyBkb2Vzbid0IGNvbnRhaW4gdGhlIHRhcmdldCBlbGVtZW50LCBpdCBpcyBhbiBvdXRzaWRlIGNsaWNrXHJcbiAgICBsZXQgb3V0c2lkZUNsaWNrID0gIXRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCk7XHJcbiAgICBpZiAodGhpcy5vdGhlckVsZW1lbnQgJiYgb3V0c2lkZUNsaWNrKSB7XHJcbiAgICAgIG91dHNpZGVDbGljayA9ICF0aGlzLm90aGVyRWxlbWVudC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCk7XHJcbiAgICB9XHJcbiAgICBpZiAob3V0c2lkZUNsaWNrKSB7XHJcbiAgICAgIHRoaXMudG9nZ2xlQWN0aXZlKGV2ZW50LCBmYWxzZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==
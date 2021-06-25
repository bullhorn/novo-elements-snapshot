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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3V0c2lkZUNsaWNrLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbInV0aWxzL291dHNpZGUtY2xpY2svT3V0c2lkZUNsaWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBYSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEYsTUFBTTtBQUNOLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFckM7O0dBRUc7QUFFSCxNQUFNLE9BQU8sWUFBWTtJQU92QixZQUFZLE9BQW1CO1FBSi9CLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFFeEIsbUJBQWMsR0FBMEIsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUdsRSxvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsd0JBQXdCO1FBQ3hCLDJFQUEyRTtRQUMzRSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVztRQUNULE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRDs7T0FFRztJQUNJLFlBQVksQ0FBQyxLQUFrQixFQUFFLFVBQW9CO1FBQzFELHdEQUF3RDtRQUN4RCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkUsb0RBQW9EO1FBQ3BELElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQ3ZEO2FBQU07WUFDTCxNQUFNLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUMxRDtRQUNELCtCQUErQjtRQUMvQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksa0JBQWtCLENBQUMsS0FBaUI7UUFDekMsNkVBQTZFO1FBQzdFLElBQUksWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0RSxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksWUFBWSxFQUFFO1lBQ3JDLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDeEU7UUFDRCxJQUFJLFlBQVksRUFBRTtZQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNqQztJQUNILENBQUM7OztZQW5ERixVQUFVOzs7WUFQWSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYsIE9uRGVzdHJveSwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gQVBQXG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vSGVscGVycyc7XG5cbi8qKlxuICogT3V0c2lkZSBjbGljayBoZWxwZXIsIG1ha2VzIHRvIHNldCB0aGUgZWxlbWVudCBhcyBpbmFjdGl2ZSB3aGVuIGNsaWNraW5nIG91dHNpZGUgb2YgaXRcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE91dHNpZGVDbGljayBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIGVsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gIG90aGVyRWxlbWVudDogRWxlbWVudFJlZjtcbiAgYWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG4gIG9uT3V0c2lkZUNsaWNrOiBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0O1xuICBvbkFjdGl2ZUNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcbiAgICAvLyBDb21wb25lbnQgZWxlbWVudFxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgLy8gT3V0c2lkZSBjbGljayBoYW5kbGVyXG4gICAgLy8gUHJvcGVydHkgYmVjYXVzZSBgdGhpcy5mdW5jLmJpbmQodGhpcylgIHJldHVybnMgYSBuZXcgZnVuY3Rpb24gZWFjaCB0aW1lXG4gICAgdGhpcy5vbk91dHNpZGVDbGljayA9IHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrLmJpbmQodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogV2hlbiB0aGUgZWxlbWVudCBpcyBkZXN0cm95ZWQsIG1ha2Ugc3VyZSB0byByZW1vdmUgdGhlIGhhbmRsZXJcbiAgICovXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25PdXRzaWRlQ2xpY2spO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgdGhlIGVsZW1lbnQgYXMgYWN0aXZlIGFuZCBhZGRzL3JlbW92ZXMgdGhlIG91dHNpZGUgY2xpY2sgaGFuZGxlclxuICAgKi9cbiAgcHVibGljIHRvZ2dsZUFjdGl2ZShldmVudD86IE1vdXNlRXZlbnQsIGZvcmNlVmFsdWU/OiBib29sZWFuKTogdm9pZCB7XG4gICAgLy8gUmV2ZXJzZSB0aGUgYWN0aXZlIHByb3BlcnR5IChpZiBmb3JjZVZhbHVlLCB1c2UgdGhhdClcbiAgICB0aGlzLmFjdGl2ZSA9ICFIZWxwZXJzLmlzQmxhbmsoZm9yY2VWYWx1ZSkgPyBmb3JjZVZhbHVlIDogIXRoaXMuYWN0aXZlO1xuICAgIC8vIEJpbmQgd2luZG93IGNsaWNrIGV2ZW50cyB0byBoaWRlIG9uIG91dHNpZGUgY2xpY2tcbiAgICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25PdXRzaWRlQ2xpY2spO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uT3V0c2lkZUNsaWNrKTtcbiAgICB9XG4gICAgLy8gRmlyZSB0aGUgYWN0aXZlIGNoYW5nZSBldmVudFxuICAgIHRoaXMub25BY3RpdmVDaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZSk7XG4gIH1cblxuICAvKipcbiAgICogV2hlbiBjbGlja2luZyBvdXRzaWRlLCBjaGVja3MgdGhlIGVsZW1lbnQgYW5kIGNsb3NlcyBpZiBvdXRzaWRlXG4gICAqL1xuICBwdWJsaWMgaGFuZGxlT3V0c2lkZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgLy8gSWYgdGhlIGVsZW1lbnRzIGRvZXNuJ3QgY29udGFpbiB0aGUgdGFyZ2V0IGVsZW1lbnQsIGl0IGlzIGFuIG91dHNpZGUgY2xpY2tcbiAgICBsZXQgb3V0c2lkZUNsaWNrID0gIXRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCk7XG4gICAgaWYgKHRoaXMub3RoZXJFbGVtZW50ICYmIG91dHNpZGVDbGljaykge1xuICAgICAgb3V0c2lkZUNsaWNrID0gIXRoaXMub3RoZXJFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KTtcbiAgICB9XG4gICAgaWYgKG91dHNpZGVDbGljaykge1xuICAgICAgdGhpcy50b2dnbGVBY3RpdmUoZXZlbnQsIGZhbHNlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
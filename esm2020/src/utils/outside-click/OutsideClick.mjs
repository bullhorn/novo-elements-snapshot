// NG2
import { ElementRef, EventEmitter, Injectable } from '@angular/core';
// APP
import { Helpers } from '../Helpers';
import * as i0 from "@angular/core";
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
OutsideClick.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: OutsideClick, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Injectable });
OutsideClick.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: OutsideClick });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: OutsideClick, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3V0c2lkZUNsaWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvdXRpbHMvb3V0c2lkZS1jbGljay9PdXRzaWRlQ2xpY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUNoRixNQUFNO0FBQ04sT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFlBQVksQ0FBQzs7QUFFckM7O0dBRUc7QUFFSCxNQUFNLE9BQU8sWUFBWTtJQU92QixZQUFZLE9BQW1CO1FBSi9CLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFFeEIsbUJBQWMsR0FBMEIsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUdsRSxvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsd0JBQXdCO1FBQ3hCLDJFQUEyRTtRQUMzRSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVztRQUNULE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRDs7T0FFRztJQUNJLFlBQVksQ0FBQyxLQUFrQixFQUFFLFVBQW9CO1FBQzFELHdEQUF3RDtRQUN4RCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkUsb0RBQW9EO1FBQ3BELElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQ3ZEO2FBQU07WUFDTCxNQUFNLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUMxRDtRQUNELCtCQUErQjtRQUMvQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksa0JBQWtCLENBQUMsS0FBaUI7UUFDekMsNkVBQTZFO1FBQzdFLElBQUksWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0RSxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksWUFBWSxFQUFFO1lBQ3JDLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDeEU7UUFDRCxJQUFJLFlBQVksRUFBRTtZQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNqQztJQUNILENBQUM7O3lHQWxEVSxZQUFZOzZHQUFaLFlBQVk7MkZBQVosWUFBWTtrQkFEeEIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIEFQUFxuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJy4uL0hlbHBlcnMnO1xuXG4vKipcbiAqIE91dHNpZGUgY2xpY2sgaGVscGVyLCBtYWtlcyB0byBzZXQgdGhlIGVsZW1lbnQgYXMgaW5hY3RpdmUgd2hlbiBjbGlja2luZyBvdXRzaWRlIG9mIGl0XG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPdXRzaWRlQ2xpY2sgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBlbGVtZW50OiBFbGVtZW50UmVmO1xuICBvdGhlckVsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBvbk91dHNpZGVDbGljazogRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdDtcbiAgb25BY3RpdmVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmKSB7XG4gICAgLy8gQ29tcG9uZW50IGVsZW1lbnRcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIC8vIE91dHNpZGUgY2xpY2sgaGFuZGxlclxuICAgIC8vIFByb3BlcnR5IGJlY2F1c2UgYHRoaXMuZnVuYy5iaW5kKHRoaXMpYCByZXR1cm5zIGEgbmV3IGZ1bmN0aW9uIGVhY2ggdGltZVxuICAgIHRoaXMub25PdXRzaWRlQ2xpY2sgPSB0aGlzLmhhbmRsZU91dHNpZGVDbGljay5iaW5kKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gdGhlIGVsZW1lbnQgaXMgZGVzdHJveWVkLCBtYWtlIHN1cmUgdG8gcmVtb3ZlIHRoZSBoYW5kbGVyXG4gICAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uT3V0c2lkZUNsaWNrKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGVzIHRoZSBlbGVtZW50IGFzIGFjdGl2ZSBhbmQgYWRkcy9yZW1vdmVzIHRoZSBvdXRzaWRlIGNsaWNrIGhhbmRsZXJcbiAgICovXG4gIHB1YmxpYyB0b2dnbGVBY3RpdmUoZXZlbnQ/OiBNb3VzZUV2ZW50LCBmb3JjZVZhbHVlPzogYm9vbGVhbik6IHZvaWQge1xuICAgIC8vIFJldmVyc2UgdGhlIGFjdGl2ZSBwcm9wZXJ0eSAoaWYgZm9yY2VWYWx1ZSwgdXNlIHRoYXQpXG4gICAgdGhpcy5hY3RpdmUgPSAhSGVscGVycy5pc0JsYW5rKGZvcmNlVmFsdWUpID8gZm9yY2VWYWx1ZSA6ICF0aGlzLmFjdGl2ZTtcbiAgICAvLyBCaW5kIHdpbmRvdyBjbGljayBldmVudHMgdG8gaGlkZSBvbiBvdXRzaWRlIGNsaWNrXG4gICAgaWYgKHRoaXMuYWN0aXZlKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uT3V0c2lkZUNsaWNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbk91dHNpZGVDbGljayk7XG4gICAgfVxuICAgIC8vIEZpcmUgdGhlIGFjdGl2ZSBjaGFuZ2UgZXZlbnRcbiAgICB0aGlzLm9uQWN0aXZlQ2hhbmdlLmVtaXQodGhpcy5hY3RpdmUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gY2xpY2tpbmcgb3V0c2lkZSwgY2hlY2tzIHRoZSBlbGVtZW50IGFuZCBjbG9zZXMgaWYgb3V0c2lkZVxuICAgKi9cbiAgcHVibGljIGhhbmRsZU91dHNpZGVDbGljayhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIC8vIElmIHRoZSBlbGVtZW50cyBkb2Vzbid0IGNvbnRhaW4gdGhlIHRhcmdldCBlbGVtZW50LCBpdCBpcyBhbiBvdXRzaWRlIGNsaWNrXG4gICAgbGV0IG91dHNpZGVDbGljayA9ICF0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpO1xuICAgIGlmICh0aGlzLm90aGVyRWxlbWVudCAmJiBvdXRzaWRlQ2xpY2spIHtcbiAgICAgIG91dHNpZGVDbGljayA9ICF0aGlzLm90aGVyRWxlbWVudC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCk7XG4gICAgfVxuICAgIGlmIChvdXRzaWRlQ2xpY2spIHtcbiAgICAgIHRoaXMudG9nZ2xlQWN0aXZlKGV2ZW50LCBmYWxzZSk7XG4gICAgfVxuICB9XG59XG4iXX0=
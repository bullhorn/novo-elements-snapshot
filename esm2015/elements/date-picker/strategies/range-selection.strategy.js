import { Injectable } from '@angular/core';
import { differenceInCalendarDays, isWithinRange } from 'date-fns';
import * as i0 from "@angular/core";
export class RangeSelectionStrategy {
    selectionFinished(date, currentRange) {
        let [start, end] = currentRange;
        if (start == null) {
            start = date;
        }
        else if (end == null && date && differenceInCalendarDays(date, start) >= 0) {
            end = date;
        }
        else {
            start = date;
            end = null;
        }
        return [start, end];
    }
    createPreview(activeDate, currentRange) {
        let start = null;
        let end = null;
        const [currStart, currEnd] = currentRange;
        if (currStart && !currEnd && activeDate) {
            start = currStart;
            end = activeDate;
        }
        return [start, end];
    }
    isSelected(activeDate, currentRange) {
        const [start, end] = currentRange;
        return isWithinRange(activeDate, start, end);
    }
}
RangeSelectionStrategy.ɵfac = function RangeSelectionStrategy_Factory(t) { return new (t || RangeSelectionStrategy)(); };
RangeSelectionStrategy.ɵprov = i0.ɵɵdefineInjectable({ token: RangeSelectionStrategy, factory: RangeSelectionStrategy.ɵfac });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(RangeSelectionStrategy, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2Utc2VsZWN0aW9uLnN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2RhdGUtcGlja2VyL3N0cmF0ZWdpZXMvcmFuZ2Utc2VsZWN0aW9uLnN0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLHdCQUF3QixFQUFFLGFBQWEsRUFBRSxNQUFNLFVBQVUsQ0FBQzs7QUFJbkUsTUFBTSxPQUFPLHNCQUFzQjtJQUNqQyxpQkFBaUIsQ0FBQyxJQUFjLEVBQUUsWUFBd0I7UUFDeEQsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxZQUFZLENBQUM7UUFFaEMsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO1lBQ2pCLEtBQUssR0FBRyxJQUFJLENBQUM7U0FDZDthQUFNLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksd0JBQXdCLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM1RSxHQUFHLEdBQUcsSUFBSSxDQUFDO1NBQ1o7YUFBTTtZQUNMLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDYixHQUFHLEdBQUcsSUFBSSxDQUFDO1NBQ1o7UUFFRCxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxhQUFhLENBQUMsVUFBMkIsRUFBRSxZQUF3QjtRQUNqRSxJQUFJLEtBQUssR0FBb0IsSUFBSSxDQUFDO1FBQ2xDLElBQUksR0FBRyxHQUFvQixJQUFJLENBQUM7UUFDaEMsTUFBTSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsR0FBRyxZQUFZLENBQUM7UUFFMUMsSUFBSSxTQUFTLElBQUksQ0FBQyxPQUFPLElBQUksVUFBVSxFQUFFO1lBQ3ZDLEtBQUssR0FBRyxTQUFTLENBQUM7WUFDbEIsR0FBRyxHQUFHLFVBQVUsQ0FBQztTQUNsQjtRQUVELE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVELFVBQVUsQ0FBQyxVQUEyQixFQUFFLFlBQXdCO1FBQzlELE1BQU0sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUcsWUFBWSxDQUFDO1FBQ2xDLE9BQU8sYUFBYSxDQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDL0MsQ0FBQzs7NEZBaENVLHNCQUFzQjs4REFBdEIsc0JBQXNCLFdBQXRCLHNCQUFzQjtrREFBdEIsc0JBQXNCO2NBRGxDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMsIGlzV2l0aGluUmFuZ2UgfSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQgeyBEYXRlTGlrZSwgTm92b0RhdGVTZWxlY3Rpb25TdHJhdGVneSB9IGZyb20gJy4uL2RhdGUtcGlja2VyLnR5cGVzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJhbmdlU2VsZWN0aW9uU3RyYXRlZ3kgaW1wbGVtZW50cyBOb3ZvRGF0ZVNlbGVjdGlvblN0cmF0ZWd5PERhdGVMaWtlW10+IHtcbiAgc2VsZWN0aW9uRmluaXNoZWQoZGF0ZTogRGF0ZUxpa2UsIGN1cnJlbnRSYW5nZTogRGF0ZUxpa2VbXSkge1xuICAgIGxldCBbc3RhcnQsIGVuZF0gPSBjdXJyZW50UmFuZ2U7XG5cbiAgICBpZiAoc3RhcnQgPT0gbnVsbCkge1xuICAgICAgc3RhcnQgPSBkYXRlO1xuICAgIH0gZWxzZSBpZiAoZW5kID09IG51bGwgJiYgZGF0ZSAmJiBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMoZGF0ZSwgc3RhcnQpID49IDApIHtcbiAgICAgIGVuZCA9IGRhdGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXJ0ID0gZGF0ZTtcbiAgICAgIGVuZCA9IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtzdGFydCwgZW5kXTtcbiAgfVxuXG4gIGNyZWF0ZVByZXZpZXcoYWN0aXZlRGF0ZTogRGF0ZUxpa2UgfCBudWxsLCBjdXJyZW50UmFuZ2U6IERhdGVMaWtlW10pIHtcbiAgICBsZXQgc3RhcnQ6IERhdGVMaWtlIHwgbnVsbCA9IG51bGw7XG4gICAgbGV0IGVuZDogRGF0ZUxpa2UgfCBudWxsID0gbnVsbDtcbiAgICBjb25zdCBbY3VyclN0YXJ0LCBjdXJyRW5kXSA9IGN1cnJlbnRSYW5nZTtcblxuICAgIGlmIChjdXJyU3RhcnQgJiYgIWN1cnJFbmQgJiYgYWN0aXZlRGF0ZSkge1xuICAgICAgc3RhcnQgPSBjdXJyU3RhcnQ7XG4gICAgICBlbmQgPSBhY3RpdmVEYXRlO1xuICAgIH1cblxuICAgIHJldHVybiBbc3RhcnQsIGVuZF07XG4gIH1cblxuICBpc1NlbGVjdGVkKGFjdGl2ZURhdGU6IERhdGVMaWtlIHwgbnVsbCwgY3VycmVudFJhbmdlOiBEYXRlTGlrZVtdKSB7XG4gICAgY29uc3QgW3N0YXJ0LCBlbmRdID0gY3VycmVudFJhbmdlO1xuICAgIHJldHVybiBpc1dpdGhpblJhbmdlKGFjdGl2ZURhdGUsIHN0YXJ0LCBlbmQpO1xuICB9XG59XG4iXX0=
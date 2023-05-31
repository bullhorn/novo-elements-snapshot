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
RangeSelectionStrategy.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: RangeSelectionStrategy, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RangeSelectionStrategy.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: RangeSelectionStrategy });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: RangeSelectionStrategy, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2Utc2VsZWN0aW9uLnN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvY2FsZW5kYXIvc3RyYXRlZ2llcy9yYW5nZS1zZWxlY3Rpb24uc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsYUFBYSxFQUFFLE1BQU0sVUFBVSxDQUFDOztBQUluRSxNQUFNLE9BQU8sc0JBQXNCO0lBQ2pDLGlCQUFpQixDQUFDLElBQWMsRUFBRSxZQUF3QjtRQUN4RCxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHLFlBQVksQ0FBQztRQUVoQyxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDakIsS0FBSyxHQUFHLElBQUksQ0FBQztTQUNkO2FBQU0sSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSx3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzVFLEdBQUcsR0FBRyxJQUFJLENBQUM7U0FDWjthQUFNO1lBQ0wsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNiLEdBQUcsR0FBRyxJQUFJLENBQUM7U0FDWjtRQUVELE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVELGFBQWEsQ0FBQyxVQUEyQixFQUFFLFlBQXdCO1FBQ2pFLElBQUksS0FBSyxHQUFvQixJQUFJLENBQUM7UUFDbEMsSUFBSSxHQUFHLEdBQW9CLElBQUksQ0FBQztRQUNoQyxNQUFNLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLFlBQVksQ0FBQztRQUUxQyxJQUFJLFNBQVMsSUFBSSxDQUFDLE9BQU8sSUFBSSxVQUFVLEVBQUU7WUFDdkMsS0FBSyxHQUFHLFNBQVMsQ0FBQztZQUNsQixHQUFHLEdBQUcsVUFBVSxDQUFDO1NBQ2xCO1FBRUQsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQsVUFBVSxDQUFDLFVBQTJCLEVBQUUsWUFBd0I7UUFDOUQsTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxZQUFZLENBQUM7UUFDbEMsT0FBTyxhQUFhLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMvQyxDQUFDOztvSEFoQ1Usc0JBQXNCO3dIQUF0QixzQkFBc0I7NEZBQXRCLHNCQUFzQjtrQkFEbEMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cywgaXNXaXRoaW5SYW5nZSB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB0eXBlIHsgRGF0ZUxpa2UsIE5vdm9EYXRlU2VsZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJhbmdlU2VsZWN0aW9uU3RyYXRlZ3kgaW1wbGVtZW50cyBOb3ZvRGF0ZVNlbGVjdGlvblN0cmF0ZWd5PERhdGVMaWtlW10+IHtcbiAgc2VsZWN0aW9uRmluaXNoZWQoZGF0ZTogRGF0ZUxpa2UsIGN1cnJlbnRSYW5nZTogRGF0ZUxpa2VbXSkge1xuICAgIGxldCBbc3RhcnQsIGVuZF0gPSBjdXJyZW50UmFuZ2U7XG5cbiAgICBpZiAoc3RhcnQgPT0gbnVsbCkge1xuICAgICAgc3RhcnQgPSBkYXRlO1xuICAgIH0gZWxzZSBpZiAoZW5kID09IG51bGwgJiYgZGF0ZSAmJiBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMoZGF0ZSwgc3RhcnQpID49IDApIHtcbiAgICAgIGVuZCA9IGRhdGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXJ0ID0gZGF0ZTtcbiAgICAgIGVuZCA9IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtzdGFydCwgZW5kXTtcbiAgfVxuXG4gIGNyZWF0ZVByZXZpZXcoYWN0aXZlRGF0ZTogRGF0ZUxpa2UgfCBudWxsLCBjdXJyZW50UmFuZ2U6IERhdGVMaWtlW10pIHtcbiAgICBsZXQgc3RhcnQ6IERhdGVMaWtlIHwgbnVsbCA9IG51bGw7XG4gICAgbGV0IGVuZDogRGF0ZUxpa2UgfCBudWxsID0gbnVsbDtcbiAgICBjb25zdCBbY3VyclN0YXJ0LCBjdXJyRW5kXSA9IGN1cnJlbnRSYW5nZTtcblxuICAgIGlmIChjdXJyU3RhcnQgJiYgIWN1cnJFbmQgJiYgYWN0aXZlRGF0ZSkge1xuICAgICAgc3RhcnQgPSBjdXJyU3RhcnQ7XG4gICAgICBlbmQgPSBhY3RpdmVEYXRlO1xuICAgIH1cblxuICAgIHJldHVybiBbc3RhcnQsIGVuZF07XG4gIH1cblxuICBpc1NlbGVjdGVkKGFjdGl2ZURhdGU6IERhdGVMaWtlIHwgbnVsbCwgY3VycmVudFJhbmdlOiBEYXRlTGlrZVtdKSB7XG4gICAgY29uc3QgW3N0YXJ0LCBlbmRdID0gY3VycmVudFJhbmdlO1xuICAgIHJldHVybiBpc1dpdGhpblJhbmdlKGFjdGl2ZURhdGUsIHN0YXJ0LCBlbmQpO1xuICB9XG59XG4iXX0=
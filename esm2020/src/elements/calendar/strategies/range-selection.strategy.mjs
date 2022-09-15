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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2Utc2VsZWN0aW9uLnN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvY2FsZW5kYXIvc3RyYXRlZ2llcy9yYW5nZS1zZWxlY3Rpb24uc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsYUFBYSxFQUFFLE1BQU0sVUFBVSxDQUFDOztBQUluRSxNQUFNLE9BQU8sc0JBQXNCO0lBQ2pDLGlCQUFpQixDQUFDLElBQWMsRUFBRSxZQUF3QjtRQUN4RCxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHLFlBQVksQ0FBQztRQUVoQyxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDakIsS0FBSyxHQUFHLElBQUksQ0FBQztTQUNkO2FBQU0sSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSx3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzVFLEdBQUcsR0FBRyxJQUFJLENBQUM7U0FDWjthQUFNO1lBQ0wsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNiLEdBQUcsR0FBRyxJQUFJLENBQUM7U0FDWjtRQUVELE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVELGFBQWEsQ0FBQyxVQUEyQixFQUFFLFlBQXdCO1FBQ2pFLElBQUksS0FBSyxHQUFvQixJQUFJLENBQUM7UUFDbEMsSUFBSSxHQUFHLEdBQW9CLElBQUksQ0FBQztRQUNoQyxNQUFNLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLFlBQVksQ0FBQztRQUUxQyxJQUFJLFNBQVMsSUFBSSxDQUFDLE9BQU8sSUFBSSxVQUFVLEVBQUU7WUFDdkMsS0FBSyxHQUFHLFNBQVMsQ0FBQztZQUNsQixHQUFHLEdBQUcsVUFBVSxDQUFDO1NBQ2xCO1FBRUQsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQsVUFBVSxDQUFDLFVBQTJCLEVBQUUsWUFBd0I7UUFDOUQsTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxZQUFZLENBQUM7UUFDbEMsT0FBTyxhQUFhLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMvQyxDQUFDOztvSEFoQ1Usc0JBQXNCO3dIQUF0QixzQkFBc0I7NEZBQXRCLHNCQUFzQjtrQkFEbEMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cywgaXNXaXRoaW5SYW5nZSB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB0eXBlIHsgRGF0ZUxpa2UsIE5vdm9EYXRlU2VsZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICcuLi8uLi9kYXRlLXBpY2tlci9kYXRlLXBpY2tlci50eXBlcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSYW5nZVNlbGVjdGlvblN0cmF0ZWd5IGltcGxlbWVudHMgTm92b0RhdGVTZWxlY3Rpb25TdHJhdGVneTxEYXRlTGlrZVtdPiB7XG4gIHNlbGVjdGlvbkZpbmlzaGVkKGRhdGU6IERhdGVMaWtlLCBjdXJyZW50UmFuZ2U6IERhdGVMaWtlW10pIHtcbiAgICBsZXQgW3N0YXJ0LCBlbmRdID0gY3VycmVudFJhbmdlO1xuXG4gICAgaWYgKHN0YXJ0ID09IG51bGwpIHtcbiAgICAgIHN0YXJ0ID0gZGF0ZTtcbiAgICB9IGVsc2UgaWYgKGVuZCA9PSBudWxsICYmIGRhdGUgJiYgZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKGRhdGUsIHN0YXJ0KSA+PSAwKSB7XG4gICAgICBlbmQgPSBkYXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGFydCA9IGRhdGU7XG4gICAgICBlbmQgPSBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBbc3RhcnQsIGVuZF07XG4gIH1cblxuICBjcmVhdGVQcmV2aWV3KGFjdGl2ZURhdGU6IERhdGVMaWtlIHwgbnVsbCwgY3VycmVudFJhbmdlOiBEYXRlTGlrZVtdKSB7XG4gICAgbGV0IHN0YXJ0OiBEYXRlTGlrZSB8IG51bGwgPSBudWxsO1xuICAgIGxldCBlbmQ6IERhdGVMaWtlIHwgbnVsbCA9IG51bGw7XG4gICAgY29uc3QgW2N1cnJTdGFydCwgY3VyckVuZF0gPSBjdXJyZW50UmFuZ2U7XG5cbiAgICBpZiAoY3VyclN0YXJ0ICYmICFjdXJyRW5kICYmIGFjdGl2ZURhdGUpIHtcbiAgICAgIHN0YXJ0ID0gY3VyclN0YXJ0O1xuICAgICAgZW5kID0gYWN0aXZlRGF0ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gW3N0YXJ0LCBlbmRdO1xuICB9XG5cbiAgaXNTZWxlY3RlZChhY3RpdmVEYXRlOiBEYXRlTGlrZSB8IG51bGwsIGN1cnJlbnRSYW5nZTogRGF0ZUxpa2VbXSkge1xuICAgIGNvbnN0IFtzdGFydCwgZW5kXSA9IGN1cnJlbnRSYW5nZTtcbiAgICByZXR1cm4gaXNXaXRoaW5SYW5nZShhY3RpdmVEYXRlLCBzdGFydCwgZW5kKTtcbiAgfVxufVxuIl19
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
RangeSelectionStrategy.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: RangeSelectionStrategy, providedIn: `root` });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: RangeSelectionStrategy, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: `root`,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2Utc2VsZWN0aW9uLnN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy9jYWxlbmRhci9zdHJhdGVnaWVzL3JhbmdlLXNlbGVjdGlvbi5zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxhQUFhLEVBQUUsTUFBTSxVQUFVLENBQUM7O0FBTW5FLE1BQU0sT0FBTyxzQkFBc0I7SUFDakMsaUJBQWlCLENBQUMsSUFBYyxFQUFFLFlBQXdCO1FBQ3hELElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUcsWUFBWSxDQUFDO1FBRWhDLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtZQUNqQixLQUFLLEdBQUcsSUFBSSxDQUFDO1NBQ2Q7YUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLHdCQUF3QixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDNUUsR0FBRyxHQUFHLElBQUksQ0FBQztTQUNaO2FBQU07WUFDTCxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2IsR0FBRyxHQUFHLElBQUksQ0FBQztTQUNaO1FBRUQsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQsYUFBYSxDQUFDLFVBQTJCLEVBQUUsWUFBd0I7UUFDakUsSUFBSSxLQUFLLEdBQW9CLElBQUksQ0FBQztRQUNsQyxJQUFJLEdBQUcsR0FBb0IsSUFBSSxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsWUFBWSxDQUFDO1FBRTFDLElBQUksU0FBUyxJQUFJLENBQUMsT0FBTyxJQUFJLFVBQVUsRUFBRTtZQUN2QyxLQUFLLEdBQUcsU0FBUyxDQUFDO1lBQ2xCLEdBQUcsR0FBRyxVQUFVLENBQUM7U0FDbEI7UUFFRCxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxVQUFVLENBQUMsVUFBMkIsRUFBRSxZQUF3QjtRQUM5RCxNQUFNLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHLFlBQVksQ0FBQztRQUNsQyxPQUFPLGFBQWEsQ0FBQyxVQUFVLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQy9DLENBQUM7O29IQWhDVSxzQkFBc0I7d0hBQXRCLHNCQUFzQixjQUZyQixNQUFNOzRGQUVQLHNCQUFzQjtrQkFIbEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMsIGlzV2l0aGluUmFuZ2UgfSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQgeyBEYXRlTGlrZSwgTm92b0RhdGVTZWxlY3Rpb25TdHJhdGVneSB9IGZyb20gJ25vdm8tZWxlbWVudHMvdHlwZXMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46IGByb290YCxcbn0pXG5leHBvcnQgY2xhc3MgUmFuZ2VTZWxlY3Rpb25TdHJhdGVneSBpbXBsZW1lbnRzIE5vdm9EYXRlU2VsZWN0aW9uU3RyYXRlZ3k8RGF0ZUxpa2VbXT4ge1xuICBzZWxlY3Rpb25GaW5pc2hlZChkYXRlOiBEYXRlTGlrZSwgY3VycmVudFJhbmdlOiBEYXRlTGlrZVtdKSB7XG4gICAgbGV0IFtzdGFydCwgZW5kXSA9IGN1cnJlbnRSYW5nZTtcblxuICAgIGlmIChzdGFydCA9PSBudWxsKSB7XG4gICAgICBzdGFydCA9IGRhdGU7XG4gICAgfSBlbHNlIGlmIChlbmQgPT0gbnVsbCAmJiBkYXRlICYmIGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhkYXRlLCBzdGFydCkgPj0gMCkge1xuICAgICAgZW5kID0gZGF0ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhcnQgPSBkYXRlO1xuICAgICAgZW5kID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gW3N0YXJ0LCBlbmRdO1xuICB9XG5cbiAgY3JlYXRlUHJldmlldyhhY3RpdmVEYXRlOiBEYXRlTGlrZSB8IG51bGwsIGN1cnJlbnRSYW5nZTogRGF0ZUxpa2VbXSkge1xuICAgIGxldCBzdGFydDogRGF0ZUxpa2UgfCBudWxsID0gbnVsbDtcbiAgICBsZXQgZW5kOiBEYXRlTGlrZSB8IG51bGwgPSBudWxsO1xuICAgIGNvbnN0IFtjdXJyU3RhcnQsIGN1cnJFbmRdID0gY3VycmVudFJhbmdlO1xuXG4gICAgaWYgKGN1cnJTdGFydCAmJiAhY3VyckVuZCAmJiBhY3RpdmVEYXRlKSB7XG4gICAgICBzdGFydCA9IGN1cnJTdGFydDtcbiAgICAgIGVuZCA9IGFjdGl2ZURhdGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtzdGFydCwgZW5kXTtcbiAgfVxuXG4gIGlzU2VsZWN0ZWQoYWN0aXZlRGF0ZTogRGF0ZUxpa2UgfCBudWxsLCBjdXJyZW50UmFuZ2U6IERhdGVMaWtlW10pIHtcbiAgICBjb25zdCBbc3RhcnQsIGVuZF0gPSBjdXJyZW50UmFuZ2U7XG4gICAgcmV0dXJuIGlzV2l0aGluUmFuZ2UoYWN0aXZlRGF0ZSwgc3RhcnQsIGVuZCk7XG4gIH1cbn1cbiJdfQ==
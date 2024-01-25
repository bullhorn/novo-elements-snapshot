import { Injectable } from '@angular/core';
import { DateUtil } from 'novo-elements/utils';
import * as i0 from "@angular/core";
export class RangeSelectionStrategy {
    selectionFinished(date, currentRange) {
        let [start, end] = currentRange;
        if (start == null) {
            start = date;
        }
        else if (end == null && date && DateUtil.differenceInCalendarDays(date, start) >= 0) {
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
        return DateUtil.isWithinRange(activeDate, start, end);
    }
}
RangeSelectionStrategy.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: RangeSelectionStrategy, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RangeSelectionStrategy.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: RangeSelectionStrategy });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: RangeSelectionStrategy, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2Utc2VsZWN0aW9uLnN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvY2FsZW5kYXIvc3RyYXRlZ2llcy9yYW5nZS1zZWxlY3Rpb24uc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBRy9DLE1BQU0sT0FBTyxzQkFBc0I7SUFDakMsaUJBQWlCLENBQUMsSUFBYyxFQUFFLFlBQXdCO1FBQ3hELElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUcsWUFBWSxDQUFDO1FBRWhDLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtZQUNqQixLQUFLLEdBQUcsSUFBSSxDQUFDO1NBQ2Q7YUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3JGLEdBQUcsR0FBRyxJQUFJLENBQUM7U0FDWjthQUFNO1lBQ0wsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNiLEdBQUcsR0FBRyxJQUFJLENBQUM7U0FDWjtRQUVELE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVELGFBQWEsQ0FBQyxVQUEyQixFQUFFLFlBQXdCO1FBQ2pFLElBQUksS0FBSyxHQUFvQixJQUFJLENBQUM7UUFDbEMsSUFBSSxHQUFHLEdBQW9CLElBQUksQ0FBQztRQUNoQyxNQUFNLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLFlBQVksQ0FBQztRQUUxQyxJQUFJLFNBQVMsSUFBSSxDQUFDLE9BQU8sSUFBSSxVQUFVLEVBQUU7WUFDdkMsS0FBSyxHQUFHLFNBQVMsQ0FBQztZQUNsQixHQUFHLEdBQUcsVUFBVSxDQUFDO1NBQ2xCO1FBRUQsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQsVUFBVSxDQUFDLFVBQTJCLEVBQUUsWUFBd0I7UUFDOUQsTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxZQUFZLENBQUM7UUFDbEMsT0FBTyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7b0hBaENVLHNCQUFzQjt3SEFBdEIsc0JBQXNCOzRGQUF0QixzQkFBc0I7a0JBRGxDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgdHlwZSB7IERhdGVMaWtlLCBOb3ZvRGF0ZVNlbGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5pbXBvcnQgeyBEYXRlVXRpbCB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmFuZ2VTZWxlY3Rpb25TdHJhdGVneSBpbXBsZW1lbnRzIE5vdm9EYXRlU2VsZWN0aW9uU3RyYXRlZ3k8RGF0ZUxpa2VbXT4ge1xuICBzZWxlY3Rpb25GaW5pc2hlZChkYXRlOiBEYXRlTGlrZSwgY3VycmVudFJhbmdlOiBEYXRlTGlrZVtdKSB7XG4gICAgbGV0IFtzdGFydCwgZW5kXSA9IGN1cnJlbnRSYW5nZTtcblxuICAgIGlmIChzdGFydCA9PSBudWxsKSB7XG4gICAgICBzdGFydCA9IGRhdGU7XG4gICAgfSBlbHNlIGlmIChlbmQgPT0gbnVsbCAmJiBkYXRlICYmIERhdGVVdGlsLmRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhkYXRlLCBzdGFydCkgPj0gMCkge1xuICAgICAgZW5kID0gZGF0ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhcnQgPSBkYXRlO1xuICAgICAgZW5kID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gW3N0YXJ0LCBlbmRdO1xuICB9XG5cbiAgY3JlYXRlUHJldmlldyhhY3RpdmVEYXRlOiBEYXRlTGlrZSB8IG51bGwsIGN1cnJlbnRSYW5nZTogRGF0ZUxpa2VbXSkge1xuICAgIGxldCBzdGFydDogRGF0ZUxpa2UgfCBudWxsID0gbnVsbDtcbiAgICBsZXQgZW5kOiBEYXRlTGlrZSB8IG51bGwgPSBudWxsO1xuICAgIGNvbnN0IFtjdXJyU3RhcnQsIGN1cnJFbmRdID0gY3VycmVudFJhbmdlO1xuXG4gICAgaWYgKGN1cnJTdGFydCAmJiAhY3VyckVuZCAmJiBhY3RpdmVEYXRlKSB7XG4gICAgICBzdGFydCA9IGN1cnJTdGFydDtcbiAgICAgIGVuZCA9IGFjdGl2ZURhdGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtzdGFydCwgZW5kXTtcbiAgfVxuXG4gIGlzU2VsZWN0ZWQoYWN0aXZlRGF0ZTogRGF0ZUxpa2UgfCBudWxsLCBjdXJyZW50UmFuZ2U6IERhdGVMaWtlW10pIHtcbiAgICBjb25zdCBbc3RhcnQsIGVuZF0gPSBjdXJyZW50UmFuZ2U7XG4gICAgcmV0dXJuIERhdGVVdGlsLmlzV2l0aGluUmFuZ2UoYWN0aXZlRGF0ZSwgc3RhcnQsIGVuZCk7XG4gIH1cbn1cbiJdfQ==
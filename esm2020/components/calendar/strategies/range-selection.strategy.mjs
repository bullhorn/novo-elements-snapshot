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
RangeSelectionStrategy.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: RangeSelectionStrategy, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RangeSelectionStrategy.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: RangeSelectionStrategy, providedIn: `root` });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: RangeSelectionStrategy, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: `root`,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2Utc2VsZWN0aW9uLnN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy9jYWxlbmRhci9zdHJhdGVnaWVzL3JhbmdlLXNlbGVjdGlvbi5zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7QUFLL0MsTUFBTSxPQUFPLHNCQUFzQjtJQUNqQyxpQkFBaUIsQ0FBQyxJQUFjLEVBQUUsWUFBd0I7UUFDeEQsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxZQUFZLENBQUM7UUFFaEMsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO1lBQ2pCLEtBQUssR0FBRyxJQUFJLENBQUM7U0FDZDthQUFNLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksUUFBUSxDQUFDLHdCQUF3QixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDckYsR0FBRyxHQUFHLElBQUksQ0FBQztTQUNaO2FBQU07WUFDTCxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2IsR0FBRyxHQUFHLElBQUksQ0FBQztTQUNaO1FBRUQsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQsYUFBYSxDQUFDLFVBQTJCLEVBQUUsWUFBd0I7UUFDakUsSUFBSSxLQUFLLEdBQW9CLElBQUksQ0FBQztRQUNsQyxJQUFJLEdBQUcsR0FBb0IsSUFBSSxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsWUFBWSxDQUFDO1FBRTFDLElBQUksU0FBUyxJQUFJLENBQUMsT0FBTyxJQUFJLFVBQVUsRUFBRTtZQUN2QyxLQUFLLEdBQUcsU0FBUyxDQUFDO1lBQ2xCLEdBQUcsR0FBRyxVQUFVLENBQUM7U0FDbEI7UUFFRCxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxVQUFVLENBQUMsVUFBMkIsRUFBRSxZQUF3QjtRQUM5RCxNQUFNLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHLFlBQVksQ0FBQztRQUNsQyxPQUFPLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN4RCxDQUFDOztvSEFoQ1Usc0JBQXNCO3dIQUF0QixzQkFBc0IsY0FGckIsTUFBTTs0RkFFUCxzQkFBc0I7a0JBSGxDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZUxpa2UsIE5vdm9EYXRlU2VsZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3R5cGVzJztcbmltcG9ydCB7IERhdGVVdGlsIH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogYHJvb3RgLFxufSlcbmV4cG9ydCBjbGFzcyBSYW5nZVNlbGVjdGlvblN0cmF0ZWd5IGltcGxlbWVudHMgTm92b0RhdGVTZWxlY3Rpb25TdHJhdGVneTxEYXRlTGlrZVtdPiB7XG4gIHNlbGVjdGlvbkZpbmlzaGVkKGRhdGU6IERhdGVMaWtlLCBjdXJyZW50UmFuZ2U6IERhdGVMaWtlW10pIHtcbiAgICBsZXQgW3N0YXJ0LCBlbmRdID0gY3VycmVudFJhbmdlO1xuXG4gICAgaWYgKHN0YXJ0ID09IG51bGwpIHtcbiAgICAgIHN0YXJ0ID0gZGF0ZTtcbiAgICB9IGVsc2UgaWYgKGVuZCA9PSBudWxsICYmIGRhdGUgJiYgRGF0ZVV0aWwuZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKGRhdGUsIHN0YXJ0KSA+PSAwKSB7XG4gICAgICBlbmQgPSBkYXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGFydCA9IGRhdGU7XG4gICAgICBlbmQgPSBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBbc3RhcnQsIGVuZF07XG4gIH1cblxuICBjcmVhdGVQcmV2aWV3KGFjdGl2ZURhdGU6IERhdGVMaWtlIHwgbnVsbCwgY3VycmVudFJhbmdlOiBEYXRlTGlrZVtdKSB7XG4gICAgbGV0IHN0YXJ0OiBEYXRlTGlrZSB8IG51bGwgPSBudWxsO1xuICAgIGxldCBlbmQ6IERhdGVMaWtlIHwgbnVsbCA9IG51bGw7XG4gICAgY29uc3QgW2N1cnJTdGFydCwgY3VyckVuZF0gPSBjdXJyZW50UmFuZ2U7XG5cbiAgICBpZiAoY3VyclN0YXJ0ICYmICFjdXJyRW5kICYmIGFjdGl2ZURhdGUpIHtcbiAgICAgIHN0YXJ0ID0gY3VyclN0YXJ0O1xuICAgICAgZW5kID0gYWN0aXZlRGF0ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gW3N0YXJ0LCBlbmRdO1xuICB9XG5cbiAgaXNTZWxlY3RlZChhY3RpdmVEYXRlOiBEYXRlTGlrZSB8IG51bGwsIGN1cnJlbnRSYW5nZTogRGF0ZUxpa2VbXSkge1xuICAgIGNvbnN0IFtzdGFydCwgZW5kXSA9IGN1cnJlbnRSYW5nZTtcbiAgICByZXR1cm4gRGF0ZVV0aWwuaXNXaXRoaW5SYW5nZShhY3RpdmVEYXRlLCBzdGFydCwgZW5kKTtcbiAgfVxufVxuIl19
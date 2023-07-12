import { DateUtil } from 'novo-elements/utils';
export class WeekSelectionStrategy {
    constructor(weekStartsOn = 0) {
        this.weekStartsOn = weekStartsOn;
    }
    selectionFinished(date) {
        return this._createWeekRange(date);
    }
    createPreview(activeDate) {
        return this._createWeekRange(activeDate);
    }
    _createWeekRange(date) {
        if (date) {
            const { weekStartsOn } = this;
            const start = DateUtil.startOfWeek(date, { weekStartsOn });
            const end = DateUtil.endOfWeek(date, { weekStartsOn });
            return [start, end];
        }
        return [null, null];
    }
    isSelected(activeDate, currentRange) {
        const [start, end] = currentRange;
        return DateUtil.isWithinRange(activeDate, start, end);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vlay1zZWxlY3Rpb24uc3RyYXRlZ3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9jYWxlbmRhci9zdHJhdGVnaWVzL3dlZWstc2VsZWN0aW9uLnN0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUUvQyxNQUFNLE9BQU8scUJBQXFCO0lBQ2hDLFlBQW9CLGVBQW9CLENBQUM7UUFBckIsaUJBQVksR0FBWixZQUFZLENBQVM7SUFBRyxDQUFDO0lBRTdDLGlCQUFpQixDQUFDLElBQXFCO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxhQUFhLENBQUMsVUFBMkI7UUFDdkMsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVPLGdCQUFnQixDQUFDLElBQXFCO1FBQzVDLElBQUksSUFBSSxFQUFFO1lBQ1IsTUFBTSxFQUFFLFlBQVksRUFBRSxHQUFHLElBQUksQ0FBQztZQUM5QixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQWdCLEVBQUUsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZFLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBZ0IsRUFBRSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7WUFDbkUsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNyQjtRQUVELE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVELFVBQVUsQ0FBQyxVQUEyQixFQUFFLFlBQXdCO1FBQzlELE1BQU0sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUcsWUFBWSxDQUFDO1FBQ2xDLE9BQU8sUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3hELENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgRGF0ZUxpa2UsIE5vdm9EYXRlU2VsZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcbmltcG9ydCB7IERhdGVVdGlsIH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5cbmV4cG9ydCBjbGFzcyBXZWVrU2VsZWN0aW9uU3RyYXRlZ3kgaW1wbGVtZW50cyBOb3ZvRGF0ZVNlbGVjdGlvblN0cmF0ZWd5PERhdGVMaWtlW10+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB3ZWVrU3RhcnRzT246IERheSA9IDApIHt9XG5cbiAgc2VsZWN0aW9uRmluaXNoZWQoZGF0ZTogRGF0ZUxpa2UgfCBudWxsKTogRGF0ZUxpa2VbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2NyZWF0ZVdlZWtSYW5nZShkYXRlKTtcbiAgfVxuXG4gIGNyZWF0ZVByZXZpZXcoYWN0aXZlRGF0ZTogRGF0ZUxpa2UgfCBudWxsKTogRGF0ZUxpa2VbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2NyZWF0ZVdlZWtSYW5nZShhY3RpdmVEYXRlKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZVdlZWtSYW5nZShkYXRlOiBEYXRlTGlrZSB8IG51bGwpOiBEYXRlTGlrZVtdIHtcbiAgICBpZiAoZGF0ZSkge1xuICAgICAgY29uc3QgeyB3ZWVrU3RhcnRzT24gfSA9IHRoaXM7XG4gICAgICBjb25zdCBzdGFydCA9IERhdGVVdGlsLnN0YXJ0T2ZXZWVrKGRhdGUgYXMgRGF0ZUxpa2UsIHsgd2Vla1N0YXJ0c09uIH0pO1xuICAgICAgY29uc3QgZW5kID0gRGF0ZVV0aWwuZW5kT2ZXZWVrKGRhdGUgYXMgRGF0ZUxpa2UsIHsgd2Vla1N0YXJ0c09uIH0pO1xuICAgICAgcmV0dXJuIFtzdGFydCwgZW5kXTtcbiAgICB9XG5cbiAgICByZXR1cm4gW251bGwsIG51bGxdO1xuICB9XG5cbiAgaXNTZWxlY3RlZChhY3RpdmVEYXRlOiBEYXRlTGlrZSB8IG51bGwsIGN1cnJlbnRSYW5nZTogRGF0ZUxpa2VbXSkge1xuICAgIGNvbnN0IFtzdGFydCwgZW5kXSA9IGN1cnJlbnRSYW5nZTtcbiAgICByZXR1cm4gRGF0ZVV0aWwuaXNXaXRoaW5SYW5nZShhY3RpdmVEYXRlLCBzdGFydCwgZW5kKTtcbiAgfVxufVxuIl19
import { endOfWeek, isWithinRange, startOfWeek } from 'date-fns';
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
            const start = startOfWeek(date, { weekStartsOn });
            const end = endOfWeek(date, { weekStartsOn });
            return [start, end];
        }
        return [null, null];
    }
    isSelected(activeDate, currentRange) {
        const [start, end] = currentRange;
        return isWithinRange(activeDate, start, end);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vlay1zZWxlY3Rpb24uc3RyYXRlZ3kuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvY2FsZW5kYXIvc3RyYXRlZ2llcy93ZWVrLXNlbGVjdGlvbi5zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFHakUsTUFBTSxPQUFPLHFCQUFxQjtJQUNoQyxZQUFvQixlQUF1QixDQUFDO1FBQXhCLGlCQUFZLEdBQVosWUFBWSxDQUFZO0lBQUcsQ0FBQztJQUVoRCxpQkFBaUIsQ0FBQyxJQUFxQjtRQUNyQyxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsYUFBYSxDQUFDLFVBQTJCO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxJQUFxQjtRQUM1QyxJQUFJLElBQUksRUFBRTtZQUNSLE1BQU0sRUFBRSxZQUFZLEVBQUUsR0FBRyxJQUFJLENBQUM7WUFDOUIsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLElBQWdCLEVBQUUsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO1lBQzlELE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxJQUFnQixFQUFFLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQztZQUMxRCxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ3JCO1FBRUQsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQsVUFBVSxDQUFDLFVBQTJCLEVBQUUsWUFBd0I7UUFDOUQsTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxZQUFZLENBQUM7UUFDbEMsT0FBTyxhQUFhLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMvQyxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBlbmRPZldlZWssIGlzV2l0aGluUmFuZ2UsIHN0YXJ0T2ZXZWVrIH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHR5cGUgeyBEYXRlTGlrZSwgTm92b0RhdGVTZWxlY3Rpb25TdHJhdGVneSB9IGZyb20gJy4uLy4uL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyLnR5cGVzJztcblxuZXhwb3J0IGNsYXNzIFdlZWtTZWxlY3Rpb25TdHJhdGVneSBpbXBsZW1lbnRzIE5vdm9EYXRlU2VsZWN0aW9uU3RyYXRlZ3k8RGF0ZUxpa2VbXT4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHdlZWtTdGFydHNPbjogbnVtYmVyID0gMCkge31cblxuICBzZWxlY3Rpb25GaW5pc2hlZChkYXRlOiBEYXRlTGlrZSB8IG51bGwpOiBEYXRlTGlrZVtdIHtcbiAgICByZXR1cm4gdGhpcy5fY3JlYXRlV2Vla1JhbmdlKGRhdGUpO1xuICB9XG5cbiAgY3JlYXRlUHJldmlldyhhY3RpdmVEYXRlOiBEYXRlTGlrZSB8IG51bGwpOiBEYXRlTGlrZVtdIHtcbiAgICByZXR1cm4gdGhpcy5fY3JlYXRlV2Vla1JhbmdlKGFjdGl2ZURhdGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlV2Vla1JhbmdlKGRhdGU6IERhdGVMaWtlIHwgbnVsbCk6IERhdGVMaWtlW10ge1xuICAgIGlmIChkYXRlKSB7XG4gICAgICBjb25zdCB7IHdlZWtTdGFydHNPbiB9ID0gdGhpcztcbiAgICAgIGNvbnN0IHN0YXJ0ID0gc3RhcnRPZldlZWsoZGF0ZSBhcyBEYXRlTGlrZSwgeyB3ZWVrU3RhcnRzT24gfSk7XG4gICAgICBjb25zdCBlbmQgPSBlbmRPZldlZWsoZGF0ZSBhcyBEYXRlTGlrZSwgeyB3ZWVrU3RhcnRzT24gfSk7XG4gICAgICByZXR1cm4gW3N0YXJ0LCBlbmRdO1xuICAgIH1cblxuICAgIHJldHVybiBbbnVsbCwgbnVsbF07XG4gIH1cblxuICBpc1NlbGVjdGVkKGFjdGl2ZURhdGU6IERhdGVMaWtlIHwgbnVsbCwgY3VycmVudFJhbmdlOiBEYXRlTGlrZVtdKSB7XG4gICAgY29uc3QgW3N0YXJ0LCBlbmRdID0gY3VycmVudFJhbmdlO1xuICAgIHJldHVybiBpc1dpdGhpblJhbmdlKGFjdGl2ZURhdGUsIHN0YXJ0LCBlbmQpO1xuICB9XG59XG4iXX0=
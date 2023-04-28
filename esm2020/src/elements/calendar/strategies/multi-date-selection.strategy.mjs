import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class MultiDateSelectionStrategy {
    selectionFinished(dateLike, currentValue, event) {
        const date = dateLike;
        const current = new Set(currentValue.map((c) => c.getTime()));
        if (current.has(date.getTime())) {
            current.delete(date.getTime());
        }
        else {
            current.add(date.getTime());
        }
        return [...current].map((c) => new Date(c));
    }
    createPreview(activeDate, currentValue) {
        return [activeDate];
    }
    isSelected(activeDate, currentValue) {
        return currentValue && currentValue.includes(activeDate);
    }
}
MultiDateSelectionStrategy.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: MultiDateSelectionStrategy, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
MultiDateSelectionStrategy.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: MultiDateSelectionStrategy });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: MultiDateSelectionStrategy, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktZGF0ZS1zZWxlY3Rpb24uc3RyYXRlZ3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9jYWxlbmRhci9zdHJhdGVnaWVzL211bHRpLWRhdGUtc2VsZWN0aW9uLnN0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBSTNDLE1BQU0sT0FBTywwQkFBMEI7SUFDckMsaUJBQWlCLENBQUMsUUFBeUIsRUFBRSxZQUF3QixFQUFFLEtBQVk7UUFDakYsTUFBTSxJQUFJLEdBQUcsUUFBZ0IsQ0FBQztRQUM5QixNQUFNLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BFLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRTtZQUMvQixPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1NBQ2hDO2FBQU07WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1NBQzdCO1FBQ0QsT0FBTyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxhQUFhLENBQUMsVUFBMkIsRUFBRSxZQUF3QjtRQUNqRSxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVELFVBQVUsQ0FBQyxVQUEyQixFQUFFLFlBQXdCO1FBQzlELE9BQU8sWUFBWSxJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDM0QsQ0FBQzs7d0hBbEJVLDBCQUEwQjs0SEFBMUIsMEJBQTBCOzRGQUExQiwwQkFBMEI7a0JBRHRDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgdHlwZSB7IERhdGVMaWtlLCBOb3ZvRGF0ZVNlbGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnLi4vLi4vZGF0ZS1waWNrZXIvZGF0ZS1waWNrZXIudHlwZXMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTXVsdGlEYXRlU2VsZWN0aW9uU3RyYXRlZ3kgaW1wbGVtZW50cyBOb3ZvRGF0ZVNlbGVjdGlvblN0cmF0ZWd5PERhdGVMaWtlW10+IHtcbiAgc2VsZWN0aW9uRmluaXNoZWQoZGF0ZUxpa2U6IERhdGVMaWtlIHwgbnVsbCwgY3VycmVudFZhbHVlOiBEYXRlTGlrZVtdLCBldmVudDogRXZlbnQpOiBEYXRlTGlrZVtdIHtcbiAgICBjb25zdCBkYXRlID0gZGF0ZUxpa2UgYXMgRGF0ZTtcbiAgICBjb25zdCBjdXJyZW50ID0gbmV3IFNldChjdXJyZW50VmFsdWUubWFwKChjOiBEYXRlKSA9PiBjLmdldFRpbWUoKSkpO1xuICAgIGlmIChjdXJyZW50LmhhcyhkYXRlLmdldFRpbWUoKSkpIHtcbiAgICAgIGN1cnJlbnQuZGVsZXRlKGRhdGUuZ2V0VGltZSgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3VycmVudC5hZGQoZGF0ZS5nZXRUaW1lKCkpO1xuICAgIH1cbiAgICByZXR1cm4gWy4uLmN1cnJlbnRdLm1hcCgoYykgPT4gbmV3IERhdGUoYykpO1xuICB9XG5cbiAgY3JlYXRlUHJldmlldyhhY3RpdmVEYXRlOiBEYXRlTGlrZSB8IG51bGwsIGN1cnJlbnRWYWx1ZTogRGF0ZUxpa2VbXSkge1xuICAgIHJldHVybiBbYWN0aXZlRGF0ZV07XG4gIH1cblxuICBpc1NlbGVjdGVkKGFjdGl2ZURhdGU6IERhdGVMaWtlIHwgbnVsbCwgY3VycmVudFZhbHVlOiBEYXRlTGlrZVtdKSB7XG4gICAgcmV0dXJuIGN1cnJlbnRWYWx1ZSAmJiBjdXJyZW50VmFsdWUuaW5jbHVkZXMoYWN0aXZlRGF0ZSk7XG4gIH1cbn1cbiJdfQ==
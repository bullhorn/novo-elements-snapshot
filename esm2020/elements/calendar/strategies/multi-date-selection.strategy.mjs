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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktZGF0ZS1zZWxlY3Rpb24uc3RyYXRlZ3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9jYWxlbmRhci9zdHJhdGVnaWVzL211bHRpLWRhdGUtc2VsZWN0aW9uLnN0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBSTNDLE1BQU0sT0FBTywwQkFBMEI7SUFDckMsaUJBQWlCLENBQUMsUUFBeUIsRUFBRSxZQUF3QixFQUFFLEtBQVk7UUFDakYsTUFBTSxJQUFJLEdBQUcsUUFBZ0IsQ0FBQztRQUM5QixNQUFNLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BFLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRTtZQUMvQixPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1NBQ2hDO2FBQU07WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1NBQzdCO1FBQ0QsT0FBTyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxhQUFhLENBQUMsVUFBMkIsRUFBRSxZQUF3QjtRQUNqRSxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVELFVBQVUsQ0FBQyxVQUEyQixFQUFFLFlBQXdCO1FBQzlELE9BQU8sWUFBWSxJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDM0QsQ0FBQzs7d0hBbEJVLDBCQUEwQjs0SEFBMUIsMEJBQTBCOzRGQUExQiwwQkFBMEI7a0JBRHRDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgdHlwZSB7IERhdGVMaWtlLCBOb3ZvRGF0ZVNlbGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNdWx0aURhdGVTZWxlY3Rpb25TdHJhdGVneSBpbXBsZW1lbnRzIE5vdm9EYXRlU2VsZWN0aW9uU3RyYXRlZ3k8RGF0ZUxpa2VbXT4ge1xuICBzZWxlY3Rpb25GaW5pc2hlZChkYXRlTGlrZTogRGF0ZUxpa2UgfCBudWxsLCBjdXJyZW50VmFsdWU6IERhdGVMaWtlW10sIGV2ZW50OiBFdmVudCk6IERhdGVMaWtlW10ge1xuICAgIGNvbnN0IGRhdGUgPSBkYXRlTGlrZSBhcyBEYXRlO1xuICAgIGNvbnN0IGN1cnJlbnQgPSBuZXcgU2V0KGN1cnJlbnRWYWx1ZS5tYXAoKGM6IERhdGUpID0+IGMuZ2V0VGltZSgpKSk7XG4gICAgaWYgKGN1cnJlbnQuaGFzKGRhdGUuZ2V0VGltZSgpKSkge1xuICAgICAgY3VycmVudC5kZWxldGUoZGF0ZS5nZXRUaW1lKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJyZW50LmFkZChkYXRlLmdldFRpbWUoKSk7XG4gICAgfVxuICAgIHJldHVybiBbLi4uY3VycmVudF0ubWFwKChjKSA9PiBuZXcgRGF0ZShjKSk7XG4gIH1cblxuICBjcmVhdGVQcmV2aWV3KGFjdGl2ZURhdGU6IERhdGVMaWtlIHwgbnVsbCwgY3VycmVudFZhbHVlOiBEYXRlTGlrZVtdKSB7XG4gICAgcmV0dXJuIFthY3RpdmVEYXRlXTtcbiAgfVxuXG4gIGlzU2VsZWN0ZWQoYWN0aXZlRGF0ZTogRGF0ZUxpa2UgfCBudWxsLCBjdXJyZW50VmFsdWU6IERhdGVMaWtlW10pIHtcbiAgICByZXR1cm4gY3VycmVudFZhbHVlICYmIGN1cnJlbnRWYWx1ZS5pbmNsdWRlcyhhY3RpdmVEYXRlKTtcbiAgfVxufVxuIl19
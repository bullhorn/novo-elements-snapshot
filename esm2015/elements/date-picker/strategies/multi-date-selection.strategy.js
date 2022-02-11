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
MultiDateSelectionStrategy.ɵfac = function MultiDateSelectionStrategy_Factory(t) { return new (t || MultiDateSelectionStrategy)(); };
MultiDateSelectionStrategy.ɵprov = i0.ɵɵdefineInjectable({ token: MultiDateSelectionStrategy, factory: MultiDateSelectionStrategy.ɵfac });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(MultiDateSelectionStrategy, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktZGF0ZS1zZWxlY3Rpb24uc3RyYXRlZ3kuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvZGF0ZS1waWNrZXIvc3RyYXRlZ2llcy9tdWx0aS1kYXRlLXNlbGVjdGlvbi5zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUkzQyxNQUFNLE9BQU8sMEJBQTBCO0lBQ3JDLGlCQUFpQixDQUFDLFFBQXlCLEVBQUUsWUFBd0IsRUFBRSxLQUFZO1FBQ2pGLE1BQU0sSUFBSSxHQUFHLFFBQWdCLENBQUM7UUFDOUIsTUFBTSxPQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNwRSxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUU7WUFDL0IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztTQUNoQzthQUFNO1lBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztTQUM3QjtRQUNELE9BQU8sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsYUFBYSxDQUFDLFVBQTJCLEVBQUUsWUFBd0I7UUFDakUsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxVQUFVLENBQUMsVUFBMkIsRUFBRSxZQUF3QjtRQUM5RCxPQUFPLFlBQVksSUFBSSxZQUFZLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzNELENBQUM7O29HQWxCVSwwQkFBMEI7a0VBQTFCLDBCQUEwQixXQUExQiwwQkFBMEI7a0RBQTFCLDBCQUEwQjtjQUR0QyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZUxpa2UsIE5vdm9EYXRlU2VsZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICcuLi9kYXRlLXBpY2tlci50eXBlcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNdWx0aURhdGVTZWxlY3Rpb25TdHJhdGVneSBpbXBsZW1lbnRzIE5vdm9EYXRlU2VsZWN0aW9uU3RyYXRlZ3k8RGF0ZUxpa2VbXT4ge1xuICBzZWxlY3Rpb25GaW5pc2hlZChkYXRlTGlrZTogRGF0ZUxpa2UgfCBudWxsLCBjdXJyZW50VmFsdWU6IERhdGVMaWtlW10sIGV2ZW50OiBFdmVudCk6IERhdGVMaWtlW10ge1xuICAgIGNvbnN0IGRhdGUgPSBkYXRlTGlrZSBhcyBEYXRlO1xuICAgIGNvbnN0IGN1cnJlbnQgPSBuZXcgU2V0KGN1cnJlbnRWYWx1ZS5tYXAoKGM6IERhdGUpID0+IGMuZ2V0VGltZSgpKSk7XG4gICAgaWYgKGN1cnJlbnQuaGFzKGRhdGUuZ2V0VGltZSgpKSkge1xuICAgICAgY3VycmVudC5kZWxldGUoZGF0ZS5nZXRUaW1lKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJyZW50LmFkZChkYXRlLmdldFRpbWUoKSk7XG4gICAgfVxuICAgIHJldHVybiBbLi4uY3VycmVudF0ubWFwKChjKSA9PiBuZXcgRGF0ZShjKSk7XG4gIH1cblxuICBjcmVhdGVQcmV2aWV3KGFjdGl2ZURhdGU6IERhdGVMaWtlIHwgbnVsbCwgY3VycmVudFZhbHVlOiBEYXRlTGlrZVtdKSB7XG4gICAgcmV0dXJuIFthY3RpdmVEYXRlXTtcbiAgfVxuXG4gIGlzU2VsZWN0ZWQoYWN0aXZlRGF0ZTogRGF0ZUxpa2UgfCBudWxsLCBjdXJyZW50VmFsdWU6IERhdGVMaWtlW10pIHtcbiAgICByZXR1cm4gY3VycmVudFZhbHVlICYmIGN1cnJlbnRWYWx1ZS5pbmNsdWRlcyhhY3RpdmVEYXRlKTtcbiAgfVxufVxuIl19
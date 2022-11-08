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
MultiDateSelectionStrategy.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: MultiDateSelectionStrategy, providedIn: `root` });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: MultiDateSelectionStrategy, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: `root`,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktZGF0ZS1zZWxlY3Rpb24uc3RyYXRlZ3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21wb25lbnRzL2NhbGVuZGFyL3N0cmF0ZWdpZXMvbXVsdGktZGF0ZS1zZWxlY3Rpb24uc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFNM0MsTUFBTSxPQUFPLDBCQUEwQjtJQUNyQyxpQkFBaUIsQ0FBQyxRQUF5QixFQUFFLFlBQXdCLEVBQUUsS0FBWTtRQUNqRixNQUFNLElBQUksR0FBRyxRQUFnQixDQUFDO1FBQzlCLE1BQU0sT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEUsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQy9CLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7U0FDaEM7YUFBTTtZQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7U0FDN0I7UUFDRCxPQUFPLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELGFBQWEsQ0FBQyxVQUEyQixFQUFFLFlBQXdCO1FBQ2pFLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQsVUFBVSxDQUFDLFVBQTJCLEVBQUUsWUFBd0I7UUFDOUQsT0FBTyxZQUFZLElBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMzRCxDQUFDOzt3SEFsQlUsMEJBQTBCOzRIQUExQiwwQkFBMEIsY0FGekIsTUFBTTs0RkFFUCwwQkFBMEI7a0JBSHRDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZUxpa2UsIE5vdm9EYXRlU2VsZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3R5cGVzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiBgcm9vdGAsXG59KVxuZXhwb3J0IGNsYXNzIE11bHRpRGF0ZVNlbGVjdGlvblN0cmF0ZWd5IGltcGxlbWVudHMgTm92b0RhdGVTZWxlY3Rpb25TdHJhdGVneTxEYXRlTGlrZVtdPiB7XG4gIHNlbGVjdGlvbkZpbmlzaGVkKGRhdGVMaWtlOiBEYXRlTGlrZSB8IG51bGwsIGN1cnJlbnRWYWx1ZTogRGF0ZUxpa2VbXSwgZXZlbnQ6IEV2ZW50KTogRGF0ZUxpa2VbXSB7XG4gICAgY29uc3QgZGF0ZSA9IGRhdGVMaWtlIGFzIERhdGU7XG4gICAgY29uc3QgY3VycmVudCA9IG5ldyBTZXQoY3VycmVudFZhbHVlLm1hcCgoYzogRGF0ZSkgPT4gYy5nZXRUaW1lKCkpKTtcbiAgICBpZiAoY3VycmVudC5oYXMoZGF0ZS5nZXRUaW1lKCkpKSB7XG4gICAgICBjdXJyZW50LmRlbGV0ZShkYXRlLmdldFRpbWUoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1cnJlbnQuYWRkKGRhdGUuZ2V0VGltZSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIFsuLi5jdXJyZW50XS5tYXAoKGMpID0+IG5ldyBEYXRlKGMpKTtcbiAgfVxuXG4gIGNyZWF0ZVByZXZpZXcoYWN0aXZlRGF0ZTogRGF0ZUxpa2UgfCBudWxsLCBjdXJyZW50VmFsdWU6IERhdGVMaWtlW10pIHtcbiAgICByZXR1cm4gW2FjdGl2ZURhdGVdO1xuICB9XG5cbiAgaXNTZWxlY3RlZChhY3RpdmVEYXRlOiBEYXRlTGlrZSB8IG51bGwsIGN1cnJlbnRWYWx1ZTogRGF0ZUxpa2VbXSkge1xuICAgIHJldHVybiBjdXJyZW50VmFsdWUgJiYgY3VycmVudFZhbHVlLmluY2x1ZGVzKGFjdGl2ZURhdGUpO1xuICB9XG59XG4iXX0=
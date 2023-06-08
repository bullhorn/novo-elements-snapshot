// NG2
import { Component } from '@angular/core';
// APP
import { BaseRenderer } from '../base-renderer';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class PercentageCell extends BaseRenderer {
}
PercentageCell.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: PercentageCell, deps: null, target: i0.ɵɵFactoryTarget.Component });
PercentageCell.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: PercentageCell, selector: "percentage-cell", usesInheritance: true, ngImport: i0, template: ` <div class="percentage" *ngIf="value || value === 0">{{ value | percent: '1.0-2' }}</div> `, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "percent": i1.PercentPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: PercentageCell, decorators: [{
            type: Component,
            args: [{
                    selector: 'percentage-cell',
                    template: ` <div class="percentage" *ngIf="value || value === 0">{{ value | percent: '1.0-2' }}</div> `,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGVyY2VudGFnZUNlbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy90YWJsZS9leHRyYXMvcGVyY2VudGFnZS1jZWxsL1BlcmNlbnRhZ2VDZWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE1BQU07QUFDTixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7OztBQU1oRCxNQUFNLE9BQU8sY0FBZSxTQUFRLFlBQVk7OzRHQUFuQyxjQUFjO2dHQUFkLGNBQWMsOEVBRmYsNkZBQTZGOzRGQUU1RixjQUFjO2tCQUoxQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFFBQVEsRUFBRSw2RkFBNkY7aUJBQ3hHIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIEFQUFxuaW1wb3J0IHsgQmFzZVJlbmRlcmVyIH0gZnJvbSAnLi4vYmFzZS1yZW5kZXJlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BlcmNlbnRhZ2UtY2VsbCcsXG4gIHRlbXBsYXRlOiBgIDxkaXYgY2xhc3M9XCJwZXJjZW50YWdlXCIgKm5nSWY9XCJ2YWx1ZSB8fCB2YWx1ZSA9PT0gMFwiPnt7IHZhbHVlIHwgcGVyY2VudDogJzEuMC0yJyB9fTwvZGl2PiBgLFxufSlcbmV4cG9ydCBjbGFzcyBQZXJjZW50YWdlQ2VsbCBleHRlbmRzIEJhc2VSZW5kZXJlciB7fVxuIl19
// NG2
import { Component } from '@angular/core';
// APP
import { BaseRenderer } from '../base-renderer/BaseRenderer';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class PercentageCell extends BaseRenderer {
}
PercentageCell.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: PercentageCell, deps: null, target: i0.ɵɵFactoryTarget.Component });
PercentageCell.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: PercentageCell, selector: "percentage-cell", usesInheritance: true, ngImport: i0, template: ` <div class="percentage" *ngIf="value || value === 0">{{ value | percent: '1.0-2' }}</div> `, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "percent": i1.PercentPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: PercentageCell, decorators: [{
            type: Component,
            args: [{
                    selector: 'percentage-cell',
                    template: ` <div class="percentage" *ngIf="value || value === 0">{{ value | percent: '1.0-2' }}</div> `,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGVyY2VudGFnZUNlbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy90YWJsZS9leHRyYXMvcGVyY2VudGFnZS1jZWxsL1BlcmNlbnRhZ2VDZWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE1BQU07QUFDTixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sK0JBQStCLENBQUM7OztBQU03RCxNQUFNLE9BQU8sY0FBZSxTQUFRLFlBQVk7OzJHQUFuQyxjQUFjOytGQUFkLGNBQWMsOEVBRmYsNkZBQTZGOzJGQUU1RixjQUFjO2tCQUoxQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFFBQVEsRUFBRSw2RkFBNkY7aUJBQ3hHIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIEFQUFxuaW1wb3J0IHsgQmFzZVJlbmRlcmVyIH0gZnJvbSAnLi4vYmFzZS1yZW5kZXJlci9CYXNlUmVuZGVyZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwZXJjZW50YWdlLWNlbGwnLFxuICB0ZW1wbGF0ZTogYCA8ZGl2IGNsYXNzPVwicGVyY2VudGFnZVwiICpuZ0lmPVwidmFsdWUgfHwgdmFsdWUgPT09IDBcIj57eyB2YWx1ZSB8IHBlcmNlbnQ6ICcxLjAtMicgfX08L2Rpdj4gYCxcbn0pXG5leHBvcnQgY2xhc3MgUGVyY2VudGFnZUNlbGwgZXh0ZW5kcyBCYXNlUmVuZGVyZXIge31cbiJdfQ==
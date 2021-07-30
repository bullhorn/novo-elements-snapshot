// NG2
import { Component } from '@angular/core';
// APP
import { BaseRenderer } from '../base-renderer/BaseRenderer';
export class PercentageCell extends BaseRenderer {
}
PercentageCell.decorators = [
    { type: Component, args: [{
                selector: 'percentage-cell',
                template: `
        <div class="percentage" *ngIf="value || value === 0">{{ value | percent:'1.0-2' }}</div>
    `
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGVyY2VudGFnZUNlbGwuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL3RhYmxlL2V4dHJhcy9wZXJjZW50YWdlLWNlbGwvUGVyY2VudGFnZUNlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQVE3RCxNQUFNLE9BQU8sY0FBZSxTQUFRLFlBQVk7OztZQU4vQyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsUUFBUSxFQUFFOztLQUVQO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcclxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbi8vIEFQUFxyXG5pbXBvcnQgeyBCYXNlUmVuZGVyZXIgfSBmcm9tICcuLi9iYXNlLXJlbmRlcmVyL0Jhc2VSZW5kZXJlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3BlcmNlbnRhZ2UtY2VsbCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwicGVyY2VudGFnZVwiICpuZ0lmPVwidmFsdWUgfHwgdmFsdWUgPT09IDBcIj57eyB2YWx1ZSB8IHBlcmNlbnQ6JzEuMC0yJyB9fTwvZGl2PlxyXG4gICAgYCxcclxufSlcclxuZXhwb3J0IGNsYXNzIFBlcmNlbnRhZ2VDZWxsIGV4dGVuZHMgQmFzZVJlbmRlcmVyIHt9XHJcbiJdfQ==
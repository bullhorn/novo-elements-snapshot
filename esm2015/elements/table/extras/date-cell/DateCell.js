// NG2
import { Component, Input } from '@angular/core';
// APP
import { BaseRenderer } from '../base-renderer/BaseRenderer';
import { NovoLabelService } from '../../../../services/novo-label-service';
export class DateCell extends BaseRenderer {
    constructor(labels) {
        super();
        this.labels = labels;
    }
    getFormattedDate() {
        return this.labels.formatDate(this.value);
    }
}
DateCell.decorators = [
    { type: Component, args: [{
                selector: 'date-cell',
                template: `
        <div class="date-cell">
            <label>{{ getFormattedDate() }}</label>
        </div>
    `
            },] }
];
DateCell.ctorParameters = () => [
    { type: NovoLabelService }
];
DateCell.propDecorators = {
    value: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZUNlbGwuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL3RhYmxlL2V4dHJhcy9kYXRlLWNlbGwvRGF0ZUNlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE1BQU07QUFDTixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFVM0UsTUFBTSxPQUFPLFFBQVMsU0FBUSxZQUFZO0lBR3hDLFlBQW1CLE1BQXdCO1FBQ3pDLEtBQUssRUFBRSxDQUFDO1FBRFMsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7SUFFM0MsQ0FBQztJQUVNLGdCQUFnQjtRQUNyQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDOzs7WUFqQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxXQUFXO2dCQUNyQixRQUFRLEVBQUU7Ozs7S0FJUDthQUNKOzs7WUFUUSxnQkFBZ0I7OztvQkFXdEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxyXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbi8vIEFQUFxyXG5pbXBvcnQgeyBCYXNlUmVuZGVyZXIgfSBmcm9tICcuLi9iYXNlLXJlbmRlcmVyL0Jhc2VSZW5kZXJlcic7XHJcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkYXRlLWNlbGwnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImRhdGUtY2VsbFwiPlxyXG4gICAgICAgICAgICA8bGFiZWw+e3sgZ2V0Rm9ybWF0dGVkRGF0ZSgpIH19PC9sYWJlbD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEYXRlQ2VsbCBleHRlbmRzIEJhc2VSZW5kZXJlciB7XHJcbiAgQElucHV0KClcclxuICB2YWx1ZTogYW55O1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0Rm9ybWF0dGVkRGF0ZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMubGFiZWxzLmZvcm1hdERhdGUodGhpcy52YWx1ZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
// NG2
import { Component, Input } from '@angular/core';
// APP
import { NovoLabelService } from 'novo-elements/services';
import { BaseRenderer } from '../base-renderer';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
export class DateCell extends BaseRenderer {
    constructor(labels) {
        super();
        this.labels = labels;
    }
    set value(v) {
        this._value = v;
    }
    get value() {
        return this._value;
    }
    getFormattedDate() {
        return this.labels.formatDate(this.value);
    }
}
DateCell.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DateCell, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component });
DateCell.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: DateCell, selector: "date-cell", inputs: { value: "value" }, usesInheritance: true, ngImport: i0, template: `
    <div class="date-cell">
      <label>{{ getFormattedDate() }}</label>
    </div>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DateCell, decorators: [{
            type: Component,
            args: [{
                    selector: 'date-cell',
                    template: `
    <div class="date-cell">
      <label>{{ getFormattedDate() }}</label>
    </div>
  `,
                }]
        }], ctorParameters: function () { return [{ type: i1.NovoLabelService }]; }, propDecorators: { value: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZUNlbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy90YWJsZS9leHRyYXMvZGF0ZS1jZWxsL0RhdGVDZWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxNQUFNO0FBQ04sT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7QUFVaEQsTUFBTSxPQUFPLFFBQVMsU0FBUSxZQUFZO0lBVXhDLFlBQW1CLE1BQXdCO1FBQ3pDLEtBQUssRUFBRSxDQUFDO1FBRFMsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7SUFFM0MsQ0FBQztJQVhELElBQ0ksS0FBSyxDQUFDLENBQU07UUFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNsQixDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFNTSxnQkFBZ0I7UUFDckIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUMsQ0FBQzs7c0dBaEJVLFFBQVE7MEZBQVIsUUFBUSxvR0FOVDs7OztHQUlUOzRGQUVVLFFBQVE7a0JBUnBCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLFFBQVEsRUFBRTs7OztHQUlUO2lCQUNGO3VHQUdLLEtBQUs7c0JBRFIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gQVBQXG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBCYXNlUmVuZGVyZXIgfSBmcm9tICcuLi9iYXNlLXJlbmRlcmVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGF0ZS1jZWxsJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiZGF0ZS1jZWxsXCI+XG4gICAgICA8bGFiZWw+e3sgZ2V0Rm9ybWF0dGVkRGF0ZSgpIH19PC9sYWJlbD5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgRGF0ZUNlbGwgZXh0ZW5kcyBCYXNlUmVuZGVyZXIge1xuICBASW5wdXQoKVxuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2O1xuICB9XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHVibGljIGdldEZvcm1hdHRlZERhdGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5sYWJlbHMuZm9ybWF0RGF0ZSh0aGlzLnZhbHVlKTtcbiAgfVxufVxuIl19
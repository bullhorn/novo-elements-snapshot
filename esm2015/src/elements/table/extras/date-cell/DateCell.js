// NG2
import { Component, Input } from '@angular/core';
import { NovoLabelService } from '../../../../services/novo-label-service';
// APP
import { BaseRenderer } from '../base-renderer/BaseRenderer';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZUNlbGwuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvdGFibGUvZXh0cmFzL2RhdGUtY2VsbC9EYXRlQ2VsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDM0UsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQVU3RCxNQUFNLE9BQU8sUUFBUyxTQUFRLFlBQVk7SUFVeEMsWUFBbUIsTUFBd0I7UUFDekMsS0FBSyxFQUFFLENBQUM7UUFEUyxXQUFNLEdBQU4sTUFBTSxDQUFrQjtJQUUzQyxDQUFDO0lBWEQsSUFDSSxLQUFLLENBQUMsQ0FBTTtRQUNkLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQU1NLGdCQUFnQjtRQUNyQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDOzs7WUF4QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxXQUFXO2dCQUNyQixRQUFRLEVBQUU7Ozs7R0FJVDthQUNGOzs7WUFYUSxnQkFBZ0I7OztvQkFhdEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG4vLyBBUFBcbmltcG9ydCB7IEJhc2VSZW5kZXJlciB9IGZyb20gJy4uL2Jhc2UtcmVuZGVyZXIvQmFzZVJlbmRlcmVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGF0ZS1jZWxsJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiZGF0ZS1jZWxsXCI+XG4gICAgICA8bGFiZWw+e3sgZ2V0Rm9ybWF0dGVkRGF0ZSgpIH19PC9sYWJlbD5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgRGF0ZUNlbGwgZXh0ZW5kcyBCYXNlUmVuZGVyZXIge1xuICBASW5wdXQoKVxuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2O1xuICB9XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHVibGljIGdldEZvcm1hdHRlZERhdGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5sYWJlbHMuZm9ybWF0RGF0ZSh0aGlzLnZhbHVlKTtcbiAgfVxufVxuIl19
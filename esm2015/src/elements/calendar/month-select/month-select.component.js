// NG2
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { getMonth } from 'date-fns';
import { NovoLabelService } from '../../../services/novo-label-service';
export class NovoMonthSelectElement {
    constructor(labels) {
        this.labels = labels;
        this.activeDate = new Date();
        this.selected = [];
        // Select callback for output
        this.select = new EventEmitter(false);
        // List of all months
        this.monthNames = this.labels.getMonths();
    }
    ngOnInit() { }
    onSelect(event, month) {
        // Helpers.swallowEvent(event);
        this.select.next({ event, month });
    }
    _isActive(month) {
        return this.activeDate && month === getMonth(this.activeDate);
    }
    _isSelected(month) {
        return this.selected && month === getMonth(this.selected[0]);
    }
}
NovoMonthSelectElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-month-select',
                template: "<div *ngFor=\"let month of monthNames; let i = index\" (click)=\"onSelect($event, i)\">\n  <div class=\"month\" [class.selected]=\"_isSelected(i)\" [attr.data-automation-id]=\"month\">\n    {{ month }}</div>\n</div>",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:grid;flex:1;grid-template-columns:1fr 1fr 1fr}:host .month{border-radius:.4rem;cursor:pointer;padding:1rem}:host .month.selected,:host .month:hover{background-color:#4a89dc;color:#fff}"]
            },] }
];
NovoMonthSelectElement.ctorParameters = () => [
    { type: NovoLabelService }
];
NovoMonthSelectElement.propDecorators = {
    activeDate: [{ type: Input }],
    selected: [{ type: Input }],
    select: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGgtc2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9jYWxlbmRhci9tb250aC1zZWxlY3QvbW9udGgtc2VsZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBU3hFLE1BQU0sT0FBTyxzQkFBc0I7SUFhakMsWUFBbUIsTUFBd0I7UUFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFYM0MsZUFBVSxHQUFhLElBQUksSUFBSSxFQUFFLENBQUM7UUFFbEMsYUFBUSxHQUFlLEVBQUUsQ0FBQztRQUUxQiw2QkFBNkI7UUFFN0IsV0FBTSxHQUFzQixJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVwRCxxQkFBcUI7UUFDckIsZUFBVSxHQUFhLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFRCxDQUFDO0lBRS9DLFFBQVEsS0FBSSxDQUFDO0lBRWIsUUFBUSxDQUFDLEtBQVksRUFBRSxLQUFhO1FBQ2xDLCtCQUErQjtRQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBYTtRQUNyQixPQUFPLElBQUksQ0FBQyxVQUFVLElBQUksS0FBSyxLQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFhO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFFBQVEsSUFBSSxLQUFLLEtBQUssUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDOzs7WUFsQ0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLG1PQUE0QztnQkFFNUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7WUFSUSxnQkFBZ0I7Ozt5QkFVdEIsS0FBSzt1QkFFTCxLQUFLO3FCQUlMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBnZXRNb250aCB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xuaW1wb3J0IHR5cGUgeyBEYXRlTGlrZSB9IGZyb20gJy4uLy4uL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyLnR5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1tb250aC1zZWxlY3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vbW9udGgtc2VsZWN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbW9udGgtc2VsZWN0LmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvTW9udGhTZWxlY3RFbGVtZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KClcbiAgYWN0aXZlRGF0ZTogRGF0ZUxpa2UgPSBuZXcgRGF0ZSgpO1xuICBASW5wdXQoKVxuICBzZWxlY3RlZDogRGF0ZUxpa2VbXSA9IFtdO1xuXG4gIC8vIFNlbGVjdCBjYWxsYmFjayBmb3Igb3V0cHV0XG4gIEBPdXRwdXQoKVxuICBzZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcihmYWxzZSk7XG5cbiAgLy8gTGlzdCBvZiBhbGwgbW9udGhzXG4gIG1vbnRoTmFtZXM6IHN0cmluZ1tdID0gdGhpcy5sYWJlbHMuZ2V0TW9udGhzKCk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHt9XG5cbiAgb25TZWxlY3QoZXZlbnQ6IEV2ZW50LCBtb250aDogbnVtYmVyKSB7XG4gICAgLy8gSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xuICAgIHRoaXMuc2VsZWN0Lm5leHQoeyBldmVudCwgbW9udGggfSk7XG4gIH1cblxuICBfaXNBY3RpdmUobW9udGg6IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZURhdGUgJiYgbW9udGggPT09IGdldE1vbnRoKHRoaXMuYWN0aXZlRGF0ZSk7XG4gIH1cblxuICBfaXNTZWxlY3RlZChtb250aDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQgJiYgbW9udGggPT09IGdldE1vbnRoKHRoaXMuc2VsZWN0ZWRbMF0pO1xuICB9XG59XG4iXX0=
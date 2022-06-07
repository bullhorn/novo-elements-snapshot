// NG2
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { getMonth } from 'date-fns';
import { NovoLabelService } from '../../../services/novo-label-service';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/novo-label-service";
import * as i2 from "@angular/common";
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
NovoMonthSelectElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoMonthSelectElement, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component });
NovoMonthSelectElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: NovoMonthSelectElement, selector: "novo-month-select", inputs: { activeDate: "activeDate", selected: "selected" }, outputs: { select: "select" }, ngImport: i0, template: "<div *ngFor=\"let month of monthNames; let i = index\" (click)=\"onSelect($event, i)\">\n  <div class=\"month\" [class.selected]=\"_isSelected(i)\" [attr.data-automation-id]=\"month\">\n    {{ month }}</div>\n</div>", styles: [":host{display:grid;grid-template-columns:1fr 1fr 1fr;flex:1}:host .month{padding:1rem;cursor:pointer;border-radius:.4rem}:host .month.selected{background-color:#4a89dc;color:#fff}:host .month:hover{background-color:#4a89dc;color:#fff}\n"], directives: [{ type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoMonthSelectElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-month-select', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div *ngFor=\"let month of monthNames; let i = index\" (click)=\"onSelect($event, i)\">\n  <div class=\"month\" [class.selected]=\"_isSelected(i)\" [attr.data-automation-id]=\"month\">\n    {{ month }}</div>\n</div>", styles: [":host{display:grid;grid-template-columns:1fr 1fr 1fr;flex:1}:host .month{padding:1rem;cursor:pointer;border-radius:.4rem}:host .month.selected{background-color:#4a89dc;color:#fff}:host .month:hover{background-color:#4a89dc;color:#fff}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NovoLabelService }]; }, propDecorators: { activeDate: [{
                type: Input
            }], selected: [{
                type: Input
            }], select: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGgtc2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2NhbGVuZGFyL21vbnRoLXNlbGVjdC9tb250aC1zZWxlY3QuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvY2FsZW5kYXIvbW9udGgtc2VsZWN0L21vbnRoLXNlbGVjdC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDOzs7O0FBU3hFLE1BQU0sT0FBTyxzQkFBc0I7SUFhakMsWUFBbUIsTUFBd0I7UUFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFYM0MsZUFBVSxHQUFhLElBQUksSUFBSSxFQUFFLENBQUM7UUFFbEMsYUFBUSxHQUFlLEVBQUUsQ0FBQztRQUUxQiw2QkFBNkI7UUFFN0IsV0FBTSxHQUFzQixJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVwRCxxQkFBcUI7UUFDckIsZUFBVSxHQUFhLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFRCxDQUFDO0lBRS9DLFFBQVEsS0FBSSxDQUFDO0lBRWIsUUFBUSxDQUFDLEtBQVksRUFBRSxLQUFhO1FBQ2xDLCtCQUErQjtRQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBYTtRQUNyQixPQUFPLElBQUksQ0FBQyxVQUFVLElBQUksS0FBSyxLQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFhO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFFBQVEsSUFBSSxLQUFLLEtBQUssUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDOzttSEE1QlUsc0JBQXNCO3VHQUF0QixzQkFBc0Isb0pDWm5DLHlOQUdNOzJGRFNPLHNCQUFzQjtrQkFObEMsU0FBUzsrQkFDRSxtQkFBbUIsbUJBR1osdUJBQXVCLENBQUMsTUFBTTt1R0FJL0MsVUFBVTtzQkFEVCxLQUFLO2dCQUdOLFFBQVE7c0JBRFAsS0FBSztnQkFLTixNQUFNO3NCQURMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBnZXRNb250aCB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xuaW1wb3J0IHR5cGUgeyBEYXRlTGlrZSB9IGZyb20gJy4uLy4uL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyLnR5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1tb250aC1zZWxlY3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vbW9udGgtc2VsZWN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbW9udGgtc2VsZWN0LmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvTW9udGhTZWxlY3RFbGVtZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KClcbiAgYWN0aXZlRGF0ZTogRGF0ZUxpa2UgPSBuZXcgRGF0ZSgpO1xuICBASW5wdXQoKVxuICBzZWxlY3RlZDogRGF0ZUxpa2VbXSA9IFtdO1xuXG4gIC8vIFNlbGVjdCBjYWxsYmFjayBmb3Igb3V0cHV0XG4gIEBPdXRwdXQoKVxuICBzZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcihmYWxzZSk7XG5cbiAgLy8gTGlzdCBvZiBhbGwgbW9udGhzXG4gIG1vbnRoTmFtZXM6IHN0cmluZ1tdID0gdGhpcy5sYWJlbHMuZ2V0TW9udGhzKCk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHt9XG5cbiAgb25TZWxlY3QoZXZlbnQ6IEV2ZW50LCBtb250aDogbnVtYmVyKSB7XG4gICAgLy8gSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xuICAgIHRoaXMuc2VsZWN0Lm5leHQoeyBldmVudCwgbW9udGggfSk7XG4gIH1cblxuICBfaXNBY3RpdmUobW9udGg6IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZURhdGUgJiYgbW9udGggPT09IGdldE1vbnRoKHRoaXMuYWN0aXZlRGF0ZSk7XG4gIH1cblxuICBfaXNTZWxlY3RlZChtb250aDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQgJiYgbW9udGggPT09IGdldE1vbnRoKHRoaXMuc2VsZWN0ZWRbMF0pO1xuICB9XG59XG4iLCI8ZGl2ICpuZ0Zvcj1cImxldCBtb250aCBvZiBtb250aE5hbWVzOyBsZXQgaSA9IGluZGV4XCIgKGNsaWNrKT1cIm9uU2VsZWN0KCRldmVudCwgaSlcIj5cbiAgPGRpdiBjbGFzcz1cIm1vbnRoXCIgW2NsYXNzLnNlbGVjdGVkXT1cIl9pc1NlbGVjdGVkKGkpXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIm1vbnRoXCI+XG4gICAge3sgbW9udGggfX08L2Rpdj5cbjwvZGl2PiJdfQ==
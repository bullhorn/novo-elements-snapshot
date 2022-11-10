// NG2
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import { DateUtil } from 'novo-elements/utils';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
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
        return this.activeDate && month === DateUtil.getMonth(this.activeDate);
    }
    _isSelected(month) {
        return this.selected && month === DateUtil.getMonth(this.selected[0]);
    }
}
NovoMonthSelectElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoMonthSelectElement, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component });
NovoMonthSelectElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoMonthSelectElement, selector: "novo-month-select", inputs: { activeDate: "activeDate", selected: "selected" }, outputs: { select: "select" }, ngImport: i0, template: "<div *ngFor=\"let month of monthNames; let i = index\" (click)=\"onSelect($event, i)\">\n  <div class=\"month\" [class.selected]=\"_isSelected(i)\" [attr.data-automation-id]=\"month\">\n    {{ month }}</div>\n</div>", styles: [":host{display:grid;grid-template-columns:1fr 1fr 1fr;flex:1}:host .month{padding:1rem;cursor:pointer;border-radius:.4rem}:host .month.selected{background-color:var(--color-selection);color:#fff}:host .month:hover{background-color:var(--color-selection);color:#fff}\n"], directives: [{ type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoMonthSelectElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-month-select', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div *ngFor=\"let month of monthNames; let i = index\" (click)=\"onSelect($event, i)\">\n  <div class=\"month\" [class.selected]=\"_isSelected(i)\" [attr.data-automation-id]=\"month\">\n    {{ month }}</div>\n</div>", styles: [":host{display:grid;grid-template-columns:1fr 1fr 1fr;flex:1}:host .month{padding:1rem;cursor:pointer;border-radius:.4rem}:host .month.selected{background-color:var(--color-selection);color:#fff}:host .month:hover{background-color:var(--color-selection);color:#fff}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NovoLabelService }]; }, propDecorators: { activeDate: [{
                type: Input
            }], selected: [{
                type: Input
            }], select: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGgtc2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvY2FsZW5kYXIvbW9udGgtc2VsZWN0L21vbnRoLXNlbGVjdC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21wb25lbnRzL2NhbGVuZGFyL21vbnRoLXNlbGVjdC9tb250aC1zZWxlY3QuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEcsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFMUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7O0FBUS9DLE1BQU0sT0FBTyxzQkFBc0I7SUFhakMsWUFBbUIsTUFBd0I7UUFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFYM0MsZUFBVSxHQUFhLElBQUksSUFBSSxFQUFFLENBQUM7UUFFbEMsYUFBUSxHQUFlLEVBQUUsQ0FBQztRQUUxQiw2QkFBNkI7UUFFN0IsV0FBTSxHQUFzQixJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVwRCxxQkFBcUI7UUFDckIsZUFBVSxHQUFhLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFRCxDQUFDO0lBRS9DLFFBQVEsS0FBSSxDQUFDO0lBRWIsUUFBUSxDQUFDLEtBQVksRUFBRSxLQUFhO1FBQ2xDLCtCQUErQjtRQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBYTtRQUNyQixPQUFPLElBQUksQ0FBQyxVQUFVLElBQUksS0FBSyxLQUFLLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBYTtRQUN2QixPQUFPLElBQUksQ0FBQyxRQUFRLElBQUksS0FBSyxLQUFLLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7O29IQTVCVSxzQkFBc0I7d0dBQXRCLHNCQUFzQixvSkNabkMseU5BR007NEZEU08sc0JBQXNCO2tCQU5sQyxTQUFTOytCQUNFLG1CQUFtQixtQkFHWix1QkFBdUIsQ0FBQyxNQUFNO3VHQUkvQyxVQUFVO3NCQURULEtBQUs7Z0JBR04sUUFBUTtzQkFEUCxLQUFLO2dCQUtOLE1BQU07c0JBREwsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3NlcnZpY2VzJztcbmltcG9ydCB7IERhdGVMaWtlIH0gZnJvbSAnbm92by1lbGVtZW50cy90eXBlcyc7XG5pbXBvcnQgeyBEYXRlVXRpbCB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLW1vbnRoLXNlbGVjdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9tb250aC1zZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9tb250aC1zZWxlY3QuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Nb250aFNlbGVjdEVsZW1lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKVxuICBhY3RpdmVEYXRlOiBEYXRlTGlrZSA9IG5ldyBEYXRlKCk7XG4gIEBJbnB1dCgpXG4gIHNlbGVjdGVkOiBEYXRlTGlrZVtdID0gW107XG5cbiAgLy8gU2VsZWN0IGNhbGxiYWNrIGZvciBvdXRwdXRcbiAgQE91dHB1dCgpXG4gIHNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcblxuICAvLyBMaXN0IG9mIGFsbCBtb250aHNcbiAgbW9udGhOYW1lczogc3RyaW5nW10gPSB0aGlzLmxhYmVscy5nZXRNb250aHMoKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCkge31cblxuICBvblNlbGVjdChldmVudDogRXZlbnQsIG1vbnRoOiBudW1iZXIpIHtcbiAgICAvLyBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XG4gICAgdGhpcy5zZWxlY3QubmV4dCh7IGV2ZW50LCBtb250aCB9KTtcbiAgfVxuXG4gIF9pc0FjdGl2ZShtb250aDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlRGF0ZSAmJiBtb250aCA9PT0gRGF0ZVV0aWwuZ2V0TW9udGgodGhpcy5hY3RpdmVEYXRlKTtcbiAgfVxuXG4gIF9pc1NlbGVjdGVkKG1vbnRoOiBudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZCAmJiBtb250aCA9PT0gRGF0ZVV0aWwuZ2V0TW9udGgodGhpcy5zZWxlY3RlZFswXSk7XG4gIH1cbn1cbiIsIjxkaXYgKm5nRm9yPVwibGV0IG1vbnRoIG9mIG1vbnRoTmFtZXM7IGxldCBpID0gaW5kZXhcIiAoY2xpY2spPVwib25TZWxlY3QoJGV2ZW50LCBpKVwiPlxuICA8ZGl2IGNsYXNzPVwibW9udGhcIiBbY2xhc3Muc2VsZWN0ZWRdPVwiX2lzU2VsZWN0ZWQoaSlcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwibW9udGhcIj5cbiAgICB7eyBtb250aCB9fTwvZGl2PlxuPC9kaXY+Il19
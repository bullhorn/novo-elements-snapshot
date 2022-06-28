import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { NovoLabelService } from '../../../services/novo-label-service';
import { DataTableState } from '../state/data-table-state.service';
import { sortAscAnim, sortDescAnim, sortNoneAnim } from './sort-button.animations';
import { SortDirection } from './sort-direction';
import * as i0 from "@angular/core";
import * as i1 from "../state/data-table-state.service";
import * as i2 from "../../../services/novo-label-service";
import * as i3 from "../../icon/Icon";
export class NovoDataTableSortButton {
    constructor(state, ref, labels) {
        this.state = state;
        this.ref = ref;
        this.labels = labels;
        this.sortChange = new EventEmitter();
        this.SortDirection = SortDirection;
        this._value = SortDirection.NONE;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
    get isActive() {
        return this.value !== SortDirection.NONE;
    }
    changeSort(dir) {
        this.value = dir;
        this.sortChange.emit(dir);
    }
    clearSort() {
        this.state.clearSort();
        this.sortChange.emit(SortDirection.NONE);
    }
}
NovoDataTableSortButton.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDataTableSortButton, deps: [{ token: i1.DataTableState }, { token: i0.ChangeDetectorRef }, { token: i2.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component });
NovoDataTableSortButton.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDataTableSortButton, selector: "novo-sort-button", inputs: { value: "value" }, outputs: { sortChange: "sortChange" }, ngImport: i0, template: "<novo-icon\n  class=\"novo-sort-asc-icon\"\n  [class.sort-active]=\"isActive\"\n  [@sortAsc]=\"value\"\n  (click)=\"changeSort(SortDirection.DESC)\">arrow-up</novo-icon>\n<novo-icon\n  class=\"novo-sort-desc-icon\"\n  [class.sort-active]=\"isActive\"\n  [@sortDesc]=\"value\"\n  (click)=\"changeSort(SortDirection.NONE)\">arrow-down</novo-icon>\n<novo-icon\n  class=\"novo-sortable-icon\"\n  [class.sort-active]=\"isActive\"\n  [@sortNone]=\"value\"\n  (click)=\"changeSort(SortDirection.ASC)\">sortable</novo-icon>", styles: [":host{display:inline-flex;position:relative;width:1.6rem;height:1.6rem;cursor:pointer}:host novo-icon{position:absolute;opacity:0;color:var(--text-muted)}:host novo-icon:hover{color:var(--selection)}:host .novo-sort-asc-icon{top:10px;color:var(--selection)}:host .novo-sort-desc-icon{top:-10px;color:var(--selection)}\n"], components: [{ type: i3.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "color", "size", "smaller", "larger", "alt", "name"] }], animations: [sortAscAnim, sortDescAnim, sortNoneAnim], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDataTableSortButton, decorators: [{
            type: Component,
            args: [{ selector: 'novo-sort-button', changeDetection: ChangeDetectionStrategy.OnPush, animations: [sortAscAnim, sortDescAnim, sortNoneAnim], template: "<novo-icon\n  class=\"novo-sort-asc-icon\"\n  [class.sort-active]=\"isActive\"\n  [@sortAsc]=\"value\"\n  (click)=\"changeSort(SortDirection.DESC)\">arrow-up</novo-icon>\n<novo-icon\n  class=\"novo-sort-desc-icon\"\n  [class.sort-active]=\"isActive\"\n  [@sortDesc]=\"value\"\n  (click)=\"changeSort(SortDirection.NONE)\">arrow-down</novo-icon>\n<novo-icon\n  class=\"novo-sortable-icon\"\n  [class.sort-active]=\"isActive\"\n  [@sortNone]=\"value\"\n  (click)=\"changeSort(SortDirection.ASC)\">sortable</novo-icon>", styles: [":host{display:inline-flex;position:relative;width:1.6rem;height:1.6rem;cursor:pointer}:host novo-icon{position:absolute;opacity:0;color:var(--text-muted)}:host novo-icon:hover{color:var(--selection)}:host .novo-sort-asc-icon{top:10px;color:var(--selection)}:host .novo-sort-desc-icon{top:-10px;color:var(--selection)}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.DataTableState }, { type: i0.ChangeDetectorRef }, { type: i2.NovoLabelService }]; }, propDecorators: { sortChange: [{
                type: Output
            }], value: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvZGF0YS10YWJsZS9zb3J0LWZpbHRlci9zb3J0LWJ1dHRvbi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9kYXRhLXRhYmxlL3NvcnQtZmlsdGVyL3NvcnQtYnV0dG9uLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkgsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ25GLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7QUFRakQsTUFBTSxPQUFPLHVCQUF1QjtJQWtCbEMsWUFBbUIsS0FBd0IsRUFBVSxHQUFzQixFQUFTLE1BQXdCO1FBQXpGLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQWpCbEcsZUFBVSxHQUFnQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hFLGtCQUFhLEdBQUcsYUFBYSxDQUFDO1FBYzdCLFdBQU0sR0FBa0IsYUFBYSxDQUFDLElBQUksQ0FBQztJQUU0RCxDQUFDO0lBZGhILElBQ1csS0FBSztRQUNkLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBQ0QsSUFBVyxLQUFLLENBQUMsS0FBb0I7UUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQVcsUUFBUTtRQUNqQixPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssYUFBYSxDQUFDLElBQUksQ0FBQztJQUMzQyxDQUFDO0lBTUQsVUFBVSxDQUFDLEdBQWtCO1FBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxTQUFTO1FBQ1AsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7cUhBNUJVLHVCQUF1Qjt5R0FBdkIsdUJBQXVCLDJIQ1pwQyxxZ0JBYzhELGtmREpoRCxDQUFDLFdBQVcsRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDOzRGQUUxQyx1QkFBdUI7a0JBUG5DLFNBQVM7K0JBQ0Usa0JBQWtCLG1CQUdYLHVCQUF1QixDQUFDLE1BQU0sY0FDbkMsQ0FBQyxXQUFXLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQztvS0FHM0MsVUFBVTtzQkFBbkIsTUFBTTtnQkFJSSxLQUFLO3NCQURmLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvbm92by1sYWJlbC1zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFUYWJsZVN0YXRlIH0gZnJvbSAnLi4vc3RhdGUvZGF0YS10YWJsZS1zdGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IHNvcnRBc2NBbmltLCBzb3J0RGVzY0FuaW0sIHNvcnROb25lQW5pbSB9IGZyb20gJy4vc29ydC1idXR0b24uYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBTb3J0RGlyZWN0aW9uIH0gZnJvbSAnLi9zb3J0LWRpcmVjdGlvbic7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXNvcnQtYnV0dG9uJyxcbiAgc3R5bGVVcmxzOiBbJy4vc29ydC1idXR0b24uY29tcG9uZW50LnNjc3MnXSxcbiAgdGVtcGxhdGVVcmw6ICcuL3NvcnQtYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGFuaW1hdGlvbnM6IFtzb3J0QXNjQW5pbSwgc29ydERlc2NBbmltLCBzb3J0Tm9uZUFuaW1dLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRGF0YVRhYmxlU29ydEJ1dHRvbjxUPiB7XG4gIEBPdXRwdXQoKSBzb3J0Q2hhbmdlOiBFdmVudEVtaXR0ZXI8U29ydERpcmVjdGlvbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIHB1YmxpYyBTb3J0RGlyZWN0aW9uID0gU29ydERpcmVjdGlvbjtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgZ2V0IHZhbHVlKCk6IFNvcnREaXJlY3Rpb24ge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHZhbHVlKHZhbHVlOiBTb3J0RGlyZWN0aW9uKSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNBY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWUgIT09IFNvcnREaXJlY3Rpb24uTk9ORTtcbiAgfVxuXG4gIHByaXZhdGUgX3ZhbHVlOiBTb3J0RGlyZWN0aW9uID0gU29ydERpcmVjdGlvbi5OT05FO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzdGF0ZTogRGF0YVRhYmxlU3RhdGU8VD4sIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSkge31cblxuICBjaGFuZ2VTb3J0KGRpcjogU29ydERpcmVjdGlvbik6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSBkaXI7XG4gICAgdGhpcy5zb3J0Q2hhbmdlLmVtaXQoZGlyKTtcbiAgfVxuXG4gIGNsZWFyU29ydCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlLmNsZWFyU29ydCgpO1xuICAgIHRoaXMuc29ydENoYW5nZS5lbWl0KFNvcnREaXJlY3Rpb24uTk9ORSk7XG4gIH1cbn1cbiIsIjxub3ZvLWljb25cbiAgY2xhc3M9XCJub3ZvLXNvcnQtYXNjLWljb25cIlxuICBbY2xhc3Muc29ydC1hY3RpdmVdPVwiaXNBY3RpdmVcIlxuICBbQHNvcnRBc2NdPVwidmFsdWVcIlxuICAoY2xpY2spPVwiY2hhbmdlU29ydChTb3J0RGlyZWN0aW9uLkRFU0MpXCI+YXJyb3ctdXA8L25vdm8taWNvbj5cbjxub3ZvLWljb25cbiAgY2xhc3M9XCJub3ZvLXNvcnQtZGVzYy1pY29uXCJcbiAgW2NsYXNzLnNvcnQtYWN0aXZlXT1cImlzQWN0aXZlXCJcbiAgW0Bzb3J0RGVzY109XCJ2YWx1ZVwiXG4gIChjbGljayk9XCJjaGFuZ2VTb3J0KFNvcnREaXJlY3Rpb24uTk9ORSlcIj5hcnJvdy1kb3duPC9ub3ZvLWljb24+XG48bm92by1pY29uXG4gIGNsYXNzPVwibm92by1zb3J0YWJsZS1pY29uXCJcbiAgW2NsYXNzLnNvcnQtYWN0aXZlXT1cImlzQWN0aXZlXCJcbiAgW0Bzb3J0Tm9uZV09XCJ2YWx1ZVwiXG4gIChjbGljayk9XCJjaGFuZ2VTb3J0KFNvcnREaXJlY3Rpb24uQVNDKVwiPnNvcnRhYmxlPC9ub3ZvLWljb24+Il19
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { SortDirection } from './sort-direction';
import { sortAscAnim, sortDescAnim, sortNoneAnim } from './sort-button.animations';
import { DataTableState } from '../state/data-table-state.service';
import { NovoLabelService } from 'novo-elements/services';
import * as i0 from "@angular/core";
import * as i1 from "../state/data-table-state.service";
import * as i2 from "novo-elements/services";
import * as i3 from "novo-elements/components/icon";
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
NovoDataTableSortButton.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDataTableSortButton, selector: "novo-sort-button", inputs: { value: "value" }, outputs: { sortChange: "sortChange" }, ngImport: i0, template: "<novo-icon\n  class=\"novo-sort-asc-icon\"\n  [class.sort-active]=\"isActive\"\n  [@sortAsc]=\"value\"\n  (click)=\"changeSort(SortDirection.DESC)\">arrow-up</novo-icon>\n<novo-icon\n  class=\"novo-sort-desc-icon\"\n  [class.sort-active]=\"isActive\"\n  [@sortDesc]=\"value\"\n  (click)=\"changeSort(SortDirection.NONE)\">arrow-down</novo-icon>\n<novo-icon\n  class=\"novo-sortable-icon\"\n  [class.sort-active]=\"isActive\"\n  [@sortNone]=\"value\"\n  (click)=\"changeSort(SortDirection.ASC)\">sortable</novo-icon>", styles: [":host{display:inline-flex;position:relative;width:1.6rem;height:1.6rem;cursor:pointer}:host novo-icon{position:absolute;opacity:0;color:var(--color-text-muted)}:host novo-icon:hover{color:var(--color-selection)}:host .novo-sort-asc-icon{top:10px;color:var(--color-selection)}:host .novo-sort-desc-icon{top:-10px;color:var(--color-selection)}\n"], components: [{ type: i3.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }], animations: [sortAscAnim, sortDescAnim, sortNoneAnim], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDataTableSortButton, decorators: [{
            type: Component,
            args: [{ selector: 'novo-sort-button', changeDetection: ChangeDetectionStrategy.OnPush, animations: [sortAscAnim, sortDescAnim, sortNoneAnim], template: "<novo-icon\n  class=\"novo-sort-asc-icon\"\n  [class.sort-active]=\"isActive\"\n  [@sortAsc]=\"value\"\n  (click)=\"changeSort(SortDirection.DESC)\">arrow-up</novo-icon>\n<novo-icon\n  class=\"novo-sort-desc-icon\"\n  [class.sort-active]=\"isActive\"\n  [@sortDesc]=\"value\"\n  (click)=\"changeSort(SortDirection.NONE)\">arrow-down</novo-icon>\n<novo-icon\n  class=\"novo-sortable-icon\"\n  [class.sort-active]=\"isActive\"\n  [@sortNone]=\"value\"\n  (click)=\"changeSort(SortDirection.ASC)\">sortable</novo-icon>", styles: [":host{display:inline-flex;position:relative;width:1.6rem;height:1.6rem;cursor:pointer}:host novo-icon{position:absolute;opacity:0;color:var(--color-text-muted)}:host novo-icon:hover{color:var(--color-selection)}:host .novo-sort-asc-icon{top:10px;color:var(--color-selection)}:host .novo-sort-desc-icon{top:-10px;color:var(--color-selection)}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.DataTableState }, { type: i0.ChangeDetectorRef }, { type: i2.NovoLabelService }]; }, propDecorators: { sortChange: [{
                type: Output
            }], value: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy9kYXRhLXRhYmxlL3NvcnQtZmlsdGVyL3NvcnQtYnV0dG9uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvZGF0YS10YWJsZS9zb3J0LWZpbHRlci9zb3J0LWJ1dHRvbi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ILE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDbkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7O0FBUTFELE1BQU0sT0FBTyx1QkFBdUI7SUFrQmxDLFlBQW1CLEtBQXdCLEVBQVUsR0FBc0IsRUFBUyxNQUF3QjtRQUF6RixVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUFVLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFqQmxHLGVBQVUsR0FBZ0MsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNoRSxrQkFBYSxHQUFHLGFBQWEsQ0FBQztRQWM3QixXQUFNLEdBQWtCLGFBQWEsQ0FBQyxJQUFJLENBQUM7SUFFNEQsQ0FBQztJQWRoSCxJQUNXLEtBQUs7UUFDZCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUNELElBQVcsS0FBSyxDQUFDLEtBQW9CO1FBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFXLFFBQVE7UUFDakIsT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLGFBQWEsQ0FBQyxJQUFJLENBQUM7SUFDM0MsQ0FBQztJQU1ELFVBQVUsQ0FBQyxHQUFrQjtRQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsU0FBUztRQUNQLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNDLENBQUM7O3FIQTVCVSx1QkFBdUI7eUdBQXZCLHVCQUF1QiwySENacEMscWdCQWM4RCxtaEJESmhELENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxZQUFZLENBQUM7NEZBRTFDLHVCQUF1QjtrQkFQbkMsU0FBUzsrQkFDRSxrQkFBa0IsbUJBR1gsdUJBQXVCLENBQUMsTUFBTSxjQUNuQyxDQUFDLFdBQVcsRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDO29LQUczQyxVQUFVO3NCQUFuQixNQUFNO2dCQUlJLEtBQUs7c0JBRGYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNvcnREaXJlY3Rpb24gfSBmcm9tICcuL3NvcnQtZGlyZWN0aW9uJztcbmltcG9ydCB7IHNvcnRBc2NBbmltLCBzb3J0RGVzY0FuaW0sIHNvcnROb25lQW5pbSB9IGZyb20gJy4vc29ydC1idXR0b24uYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBEYXRhVGFibGVTdGF0ZSB9IGZyb20gJy4uL3N0YXRlL2RhdGEtdGFibGUtc3RhdGUuc2VydmljZSc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXNvcnQtYnV0dG9uJyxcbiAgc3R5bGVVcmxzOiBbJy4vc29ydC1idXR0b24uY29tcG9uZW50LnNjc3MnXSxcbiAgdGVtcGxhdGVVcmw6ICcuL3NvcnQtYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGFuaW1hdGlvbnM6IFtzb3J0QXNjQW5pbSwgc29ydERlc2NBbmltLCBzb3J0Tm9uZUFuaW1dLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRGF0YVRhYmxlU29ydEJ1dHRvbjxUPiB7XG4gIEBPdXRwdXQoKSBzb3J0Q2hhbmdlOiBFdmVudEVtaXR0ZXI8U29ydERpcmVjdGlvbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIHB1YmxpYyBTb3J0RGlyZWN0aW9uID0gU29ydERpcmVjdGlvbjtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgZ2V0IHZhbHVlKCk6IFNvcnREaXJlY3Rpb24ge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHZhbHVlKHZhbHVlOiBTb3J0RGlyZWN0aW9uKSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNBY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWUgIT09IFNvcnREaXJlY3Rpb24uTk9ORTtcbiAgfVxuXG4gIHByaXZhdGUgX3ZhbHVlOiBTb3J0RGlyZWN0aW9uID0gU29ydERpcmVjdGlvbi5OT05FO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzdGF0ZTogRGF0YVRhYmxlU3RhdGU8VD4sIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSkge31cblxuICBjaGFuZ2VTb3J0KGRpcjogU29ydERpcmVjdGlvbik6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSBkaXI7XG4gICAgdGhpcy5zb3J0Q2hhbmdlLmVtaXQoZGlyKTtcbiAgfVxuXG4gIGNsZWFyU29ydCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlLmNsZWFyU29ydCgpO1xuICAgIHRoaXMuc29ydENoYW5nZS5lbWl0KFNvcnREaXJlY3Rpb24uTk9ORSk7XG4gIH1cbn1cbiIsIjxub3ZvLWljb25cbiAgY2xhc3M9XCJub3ZvLXNvcnQtYXNjLWljb25cIlxuICBbY2xhc3Muc29ydC1hY3RpdmVdPVwiaXNBY3RpdmVcIlxuICBbQHNvcnRBc2NdPVwidmFsdWVcIlxuICAoY2xpY2spPVwiY2hhbmdlU29ydChTb3J0RGlyZWN0aW9uLkRFU0MpXCI+YXJyb3ctdXA8L25vdm8taWNvbj5cbjxub3ZvLWljb25cbiAgY2xhc3M9XCJub3ZvLXNvcnQtZGVzYy1pY29uXCJcbiAgW2NsYXNzLnNvcnQtYWN0aXZlXT1cImlzQWN0aXZlXCJcbiAgW0Bzb3J0RGVzY109XCJ2YWx1ZVwiXG4gIChjbGljayk9XCJjaGFuZ2VTb3J0KFNvcnREaXJlY3Rpb24uTk9ORSlcIj5hcnJvdy1kb3duPC9ub3ZvLWljb24+XG48bm92by1pY29uXG4gIGNsYXNzPVwibm92by1zb3J0YWJsZS1pY29uXCJcbiAgW2NsYXNzLnNvcnQtYWN0aXZlXT1cImlzQWN0aXZlXCJcbiAgW0Bzb3J0Tm9uZV09XCJ2YWx1ZVwiXG4gIChjbGljayk9XCJjaGFuZ2VTb3J0KFNvcnREaXJlY3Rpb24uQVNDKVwiPnNvcnRhYmxlPC9ub3ZvLWljb24+Il19
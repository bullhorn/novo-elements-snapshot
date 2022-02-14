import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { NovoLabelService } from '../../services/novo-label-service';
import { DataTableState } from './state/data-table-state.service';
import * as i0 from "@angular/core";
import * as i1 from "./state/data-table-state.service";
import * as i2 from "../../services/novo-label-service";
import * as i3 from "../dropdown/Dropdown";
import * as i4 from "../button/Button";
import * as i5 from "@angular/common";
function NovoDataTableClearButton_item_4_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "item", 5);
    i0.ɵɵlistener("click", function NovoDataTableClearButton_item_4_Template_item_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r3 = i0.ɵɵnextContext(); return ctx_r3.clearSort(); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r0.labels.clearSort);
} }
function NovoDataTableClearButton_item_5_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "item", 6);
    i0.ɵɵlistener("click", function NovoDataTableClearButton_item_5_Template_item_click_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r5 = i0.ɵɵnextContext(); return ctx_r5.clearFilter(); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r1.labels.clearFilter);
} }
function NovoDataTableClearButton_item_6_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "item", 7);
    i0.ɵɵlistener("click", function NovoDataTableClearButton_item_6_Template_item_click_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r7 = i0.ɵɵnextContext(); return ctx_r7.clearAll(); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r2.labels.clearAllNormalCase);
} }
export class NovoDataTableClearButton {
    constructor(state, ref, labels) {
        this.state = state;
        this.ref = ref;
        this.labels = labels;
        this.sortClear = new EventEmitter();
        this.filterClear = new EventEmitter();
        this.allClear = new EventEmitter();
    }
    clearSort() {
        this.state.clearSort();
        this.sortClear.emit(true);
    }
    clearFilter() {
        this.state.clearFilter();
        this.filterClear.emit(true);
    }
    clearAll() {
        this.state.reset();
        this.allClear.emit(true);
        this.sortClear.emit(true);
        this.filterClear.emit(true);
    }
}
NovoDataTableClearButton.ɵfac = function NovoDataTableClearButton_Factory(t) { return new (t || NovoDataTableClearButton)(i0.ɵɵdirectiveInject(i1.DataTableState), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2.NovoLabelService)); };
NovoDataTableClearButton.ɵcmp = i0.ɵɵdefineComponent({ type: NovoDataTableClearButton, selectors: [["novo-data-table-clear-button"]], outputs: { sortClear: "sortClear", filterClear: "filterClear", allClear: "allClear" }, decls: 7, vars: 4, consts: [["side", "bottom-right", "data-automation-id", "novo-data-table-clear-dropdown", 1, "novo-data-table-clear-button"], ["type", "button", "theme", "primary", "color", "negative", "icon", "collapse", "data-automation-id", "novo-data-table-clear-dropdown-btn"], ["data-automation-id", "novo-data-table-clear-dropdown-clear-sort", 3, "click", 4, "ngIf"], ["data-automation-id", "novo-data-table-clear-dropdown-clear-filter", 3, "click", 4, "ngIf"], ["data-automation-id", "novo-data-table-clear-dropdown-clear-all", 3, "click", 4, "ngIf"], ["data-automation-id", "novo-data-table-clear-dropdown-clear-sort", 3, "click"], ["data-automation-id", "novo-data-table-clear-dropdown-clear-filter", 3, "click"], ["data-automation-id", "novo-data-table-clear-dropdown-clear-all", 3, "click"]], template: function NovoDataTableClearButton_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "novo-dropdown", 0);
        i0.ɵɵelementStart(1, "button", 1);
        i0.ɵɵtext(2);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(3, "list");
        i0.ɵɵtemplate(4, NovoDataTableClearButton_item_4_Template, 2, 1, "item", 2);
        i0.ɵɵtemplate(5, NovoDataTableClearButton_item_5_Template, 2, 1, "item", 3);
        i0.ɵɵtemplate(6, NovoDataTableClearButton_item_6_Template, 2, 1, "item", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1(" ", ctx.labels.clear, " ");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.state.sort);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.state.filter);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.state.sort && ctx.state.filter);
    } }, directives: [i3.NovoDropdownElement, i4.NovoButtonElement, i3.NovoDropdownListElement, i5.NgIf, i3.NovoItemElement], encapsulation: 2, changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoDataTableClearButton, [{
        type: Component,
        args: [{
                selector: 'novo-data-table-clear-button',
                template: `
    <novo-dropdown side="bottom-right" class="novo-data-table-clear-button" data-automation-id="novo-data-table-clear-dropdown">
      <button type="button" theme="primary" color="negative" icon="collapse" data-automation-id="novo-data-table-clear-dropdown-btn">
        {{ labels.clear }}
      </button>
      <list>
        <item *ngIf="state.sort" (click)="clearSort()" data-automation-id="novo-data-table-clear-dropdown-clear-sort">{{
          labels.clearSort
        }}</item>
        <item *ngIf="state.filter" (click)="clearFilter()" data-automation-id="novo-data-table-clear-dropdown-clear-filter">{{
          labels.clearFilter
        }}</item>
        <item *ngIf="state.sort && state.filter" (click)="clearAll()" data-automation-id="novo-data-table-clear-dropdown-clear-all">{{
          labels.clearAllNormalCase
        }}</item>
      </list>
    </novo-dropdown>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush,
            }]
    }], function () { return [{ type: i1.DataTableState }, { type: i0.ChangeDetectorRef }, { type: i2.NovoLabelService }]; }, { sortClear: [{
            type: Output
        }], filterClear: [{
            type: Output
        }], allClear: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1jbGVhci1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2RhdGEtdGFibGUvZGF0YS10YWJsZS1jbGVhci1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0NBQWtDLENBQUM7Ozs7Ozs7OztJQVUxRCwrQkFBOEc7SUFBckYsMExBQXFCO0lBQWdFLFlBRTVHO0lBQUEsaUJBQU87OztJQUZxRyxlQUU1RztJQUY0Ryw2Q0FFNUc7Ozs7SUFDRiwrQkFBb0g7SUFBekYsNExBQXVCO0lBQWtFLFlBRWxIO0lBQUEsaUJBQU87OztJQUYyRyxlQUVsSDtJQUZrSCwrQ0FFbEg7Ozs7SUFDRiwrQkFBNEg7SUFBbkYseUxBQW9CO0lBQStELFlBRTFIO0lBQUEsaUJBQU87OztJQUZtSCxlQUUxSDtJQUYwSCxzREFFMUg7O0FBTVYsTUFBTSxPQUFPLHdCQUF3QjtJQVFuQyxZQUFtQixLQUF3QixFQUFVLEdBQXNCLEVBQVMsTUFBd0I7UUFBekYsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUFTLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBTjVHLGNBQVMsR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV0RCxnQkFBVyxHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXhELGFBQVEsR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUUwRCxDQUFDO0lBRWhILFNBQVM7UUFDUCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7Z0dBekJVLHdCQUF3Qjs2REFBeEIsd0JBQXdCO1FBbkJqQyx3Q0FDRTtRQUFBLGlDQUNFO1FBQUEsWUFDRjtRQUFBLGlCQUFTO1FBQ1QsNEJBQ0U7UUFBQSwyRUFBOEc7UUFHOUcsMkVBQW9IO1FBR3BILDJFQUE0SDtRQUc5SCxpQkFBTztRQUNULGlCQUFnQjs7UUFiWixlQUNGO1FBREUsaURBQ0Y7UUFFUSxlQUFrQjtRQUFsQixxQ0FBa0I7UUFHbEIsZUFBb0I7UUFBcEIsdUNBQW9CO1FBR3BCLGVBQWtDO1FBQWxDLHlEQUFrQzs7a0RBUW5DLHdCQUF3QjtjQXRCcEMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSw4QkFBOEI7Z0JBQ3hDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQlQ7Z0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7Z0lBR0MsU0FBUztrQkFEUixNQUFNO1lBR1AsV0FBVztrQkFEVixNQUFNO1lBR1AsUUFBUTtrQkFEUCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbm92by1sYWJlbC1zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFUYWJsZVN0YXRlIH0gZnJvbSAnLi9zdGF0ZS9kYXRhLXRhYmxlLXN0YXRlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWRhdGEtdGFibGUtY2xlYXItYnV0dG9uJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bm92by1kcm9wZG93biBzaWRlPVwiYm90dG9tLXJpZ2h0XCIgY2xhc3M9XCJub3ZvLWRhdGEtdGFibGUtY2xlYXItYnV0dG9uXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by1kYXRhLXRhYmxlLWNsZWFyLWRyb3Bkb3duXCI+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiB0aGVtZT1cInByaW1hcnlcIiBjb2xvcj1cIm5lZ2F0aXZlXCIgaWNvbj1cImNvbGxhcHNlXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by1kYXRhLXRhYmxlLWNsZWFyLWRyb3Bkb3duLWJ0blwiPlxuICAgICAgICB7eyBsYWJlbHMuY2xlYXIgfX1cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGxpc3Q+XG4gICAgICAgIDxpdGVtICpuZ0lmPVwic3RhdGUuc29ydFwiIChjbGljayk9XCJjbGVhclNvcnQoKVwiIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tZGF0YS10YWJsZS1jbGVhci1kcm9wZG93bi1jbGVhci1zb3J0XCI+e3tcbiAgICAgICAgICBsYWJlbHMuY2xlYXJTb3J0XG4gICAgICAgIH19PC9pdGVtPlxuICAgICAgICA8aXRlbSAqbmdJZj1cInN0YXRlLmZpbHRlclwiIChjbGljayk9XCJjbGVhckZpbHRlcigpXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by1kYXRhLXRhYmxlLWNsZWFyLWRyb3Bkb3duLWNsZWFyLWZpbHRlclwiPnt7XG4gICAgICAgICAgbGFiZWxzLmNsZWFyRmlsdGVyXG4gICAgICAgIH19PC9pdGVtPlxuICAgICAgICA8aXRlbSAqbmdJZj1cInN0YXRlLnNvcnQgJiYgc3RhdGUuZmlsdGVyXCIgKGNsaWNrKT1cImNsZWFyQWxsKClcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLWRhdGEtdGFibGUtY2xlYXItZHJvcGRvd24tY2xlYXItYWxsXCI+e3tcbiAgICAgICAgICBsYWJlbHMuY2xlYXJBbGxOb3JtYWxDYXNlXG4gICAgICAgIH19PC9pdGVtPlxuICAgICAgPC9saXN0PlxuICAgIDwvbm92by1kcm9wZG93bj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9EYXRhVGFibGVDbGVhckJ1dHRvbjxUPiB7XG4gIEBPdXRwdXQoKVxuICBzb3J0Q2xlYXI6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIGZpbHRlckNsZWFyOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBhbGxDbGVhcjogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzdGF0ZTogRGF0YVRhYmxlU3RhdGU8VD4sIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSkge31cblxuICBjbGVhclNvcnQoKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0ZS5jbGVhclNvcnQoKTtcbiAgICB0aGlzLnNvcnRDbGVhci5lbWl0KHRydWUpO1xuICB9XG5cbiAgY2xlYXJGaWx0ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0ZS5jbGVhckZpbHRlcigpO1xuICAgIHRoaXMuZmlsdGVyQ2xlYXIuZW1pdCh0cnVlKTtcbiAgfVxuXG4gIGNsZWFyQWxsKCk6IHZvaWQge1xuICAgIHRoaXMuc3RhdGUucmVzZXQoKTtcbiAgICB0aGlzLmFsbENsZWFyLmVtaXQodHJ1ZSk7XG4gICAgdGhpcy5zb3J0Q2xlYXIuZW1pdCh0cnVlKTtcbiAgICB0aGlzLmZpbHRlckNsZWFyLmVtaXQodHJ1ZSk7XG4gIH1cbn1cbiJdfQ==
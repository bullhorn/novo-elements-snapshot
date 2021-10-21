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
    changeSort(dir) {
        this.value = dir;
        console.log('sort', dir);
        this.sortChange.emit(dir);
    }
    clearSort() {
        this.state.clearSort();
        this.sortChange.emit(SortDirection.NONE);
    }
}
NovoDataTableSortButton.ɵfac = function NovoDataTableSortButton_Factory(t) { return new (t || NovoDataTableSortButton)(i0.ɵɵdirectiveInject(i1.DataTableState), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2.NovoLabelService)); };
NovoDataTableSortButton.ɵcmp = i0.ɵɵdefineComponent({ type: NovoDataTableSortButton, selectors: [["novo-sort-button"]], inputs: { value: "value" }, outputs: { sortChange: "sortChange" }, decls: 6, vars: 3, consts: [[1, "novo-sort-asc-icon", 3, "click"], [1, "novo-sort-desc-icon", 3, "click"], [1, "novo-sortable-icon", 3, "click"]], template: function NovoDataTableSortButton_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "novo-icon", 0);
        i0.ɵɵlistener("click", function NovoDataTableSortButton_Template_novo_icon_click_0_listener() { return ctx.changeSort(ctx.SortDirection.DESC); });
        i0.ɵɵtext(1, "arrow-up");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(2, "novo-icon", 1);
        i0.ɵɵlistener("click", function NovoDataTableSortButton_Template_novo_icon_click_2_listener() { return ctx.changeSort(ctx.SortDirection.NONE); });
        i0.ɵɵtext(3, "arrow-down\n");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(4, "novo-icon", 2);
        i0.ɵɵlistener("click", function NovoDataTableSortButton_Template_novo_icon_click_4_listener() { return ctx.changeSort(ctx.SortDirection.ASC); });
        i0.ɵɵtext(5, "sortable");
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("@sortAsc", ctx.value);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("@sortDesc", ctx.value);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("@sortNone", ctx.value);
    } }, directives: [i3.NovoIconComponent], styles: ["@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}[_nghost-%COMP%]{cursor:pointer;display:inline-flex;height:1.6rem;position:relative;width:1.6rem}[_nghost-%COMP%]   novo-icon[_ngcontent-%COMP%]{color:#bebebe;opacity:0;position:absolute}[_nghost-%COMP%]   novo-icon[_ngcontent-%COMP%]:hover{color:#4a89dc}[_nghost-%COMP%]   .novo-sort-asc-icon[_ngcontent-%COMP%]{top:10px}[_nghost-%COMP%]   .novo-sort-desc-icon[_ngcontent-%COMP%]{top:-10px}"], data: { animation: [sortAscAnim, sortDescAnim, sortNoneAnim] }, changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoDataTableSortButton, [{
        type: Component,
        args: [{
                selector: 'novo-sort-button',
                styleUrls: ['./sort-button.component.scss'],
                templateUrl: './sort-button.component.html',
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [sortAscAnim, sortDescAnim, sortNoneAnim],
            }]
    }], function () { return [{ type: i1.DataTableState }, { type: i0.ChangeDetectorRef }, { type: i2.NovoLabelService }]; }, { sortChange: [{
            type: Output
        }], value: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2RhdGEtdGFibGUvc29ydC1maWx0ZXIvc29ydC1idXR0b24uY29tcG9uZW50LnRzIiwiZWxlbWVudHMvZGF0YS10YWJsZS9zb3J0LWZpbHRlci9zb3J0LWJ1dHRvbi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ILE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNuRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7O0FBUWpELE1BQU0sT0FBTyx1QkFBdUI7SUFhbEMsWUFBbUIsS0FBd0IsRUFBVSxHQUFzQixFQUFTLE1BQXdCO1FBQXpGLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQVpsRyxlQUFVLEdBQWdDLElBQUksWUFBWSxFQUFFLENBQUM7UUFDaEUsa0JBQWEsR0FBRyxhQUFhLENBQUM7UUFTN0IsV0FBTSxHQUFrQixhQUFhLENBQUMsSUFBSSxDQUFDO0lBRTRELENBQUM7SUFUaEgsSUFDVyxLQUFLO1FBQ2QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFDRCxJQUFXLEtBQUssQ0FBQyxLQUFvQjtRQUNuQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBS0QsVUFBVSxDQUFDLEdBQWtCO1FBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxTQUFTO1FBQ1AsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7OEZBeEJVLHVCQUF1Qjs0REFBdkIsdUJBQXVCO1FDWnBDLG9DQUFrRztRQUF6Qyx1R0FBUyxzQ0FBOEIsSUFBQztRQUFDLHdCQUFRO1FBQUEsaUJBQVk7UUFDdEgsb0NBQW9HO1FBQXpDLHVHQUFTLHNDQUE4QixJQUFDO1FBQUMsNEJBQ3BHO1FBQUEsaUJBQVk7UUFDWixvQ0FBa0c7UUFBeEMsdUdBQVMscUNBQTZCLElBQUM7UUFBQyx3QkFBUTtRQUFBLGlCQUFZOztRQUhoRixvQ0FBa0I7UUFDakIsZUFBbUI7UUFBbkIscUNBQW1CO1FBRXBCLGVBQW1CO1FBQW5CLHFDQUFtQjtxeUNETzNDLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxZQUFZLENBQUM7a0RBRTFDLHVCQUF1QjtjQVBuQyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7Z0JBQzNDLFdBQVcsRUFBRSw4QkFBOEI7Z0JBQzNDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxVQUFVLEVBQUUsQ0FBQyxXQUFXLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQzthQUN0RDtnSUFFVyxVQUFVO2tCQUFuQixNQUFNO1lBSUksS0FBSztrQkFEZixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhVGFibGVTdGF0ZSB9IGZyb20gJy4uL3N0YXRlL2RhdGEtdGFibGUtc3RhdGUuc2VydmljZSc7XG5pbXBvcnQgeyBzb3J0QXNjQW5pbSwgc29ydERlc2NBbmltLCBzb3J0Tm9uZUFuaW0gfSBmcm9tICcuL3NvcnQtYnV0dG9uLmFuaW1hdGlvbnMnO1xuaW1wb3J0IHsgU29ydERpcmVjdGlvbiB9IGZyb20gJy4vc29ydC1kaXJlY3Rpb24nO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1zb3J0LWJ1dHRvbicsXG4gIHN0eWxlVXJsczogWycuL3NvcnQtYnV0dG9uLmNvbXBvbmVudC5zY3NzJ10sXG4gIHRlbXBsYXRlVXJsOiAnLi9zb3J0LWJ1dHRvbi5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBhbmltYXRpb25zOiBbc29ydEFzY0FuaW0sIHNvcnREZXNjQW5pbSwgc29ydE5vbmVBbmltXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0RhdGFUYWJsZVNvcnRCdXR0b248VD4ge1xuICBAT3V0cHV0KCkgc29ydENoYW5nZTogRXZlbnRFbWl0dGVyPFNvcnREaXJlY3Rpb24+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwdWJsaWMgU29ydERpcmVjdGlvbiA9IFNvcnREaXJlY3Rpb247XG5cbiAgQElucHV0KClcbiAgcHVibGljIGdldCB2YWx1ZSgpOiBTb3J0RGlyZWN0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCB2YWx1ZSh2YWx1ZTogU29ydERpcmVjdGlvbikge1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gIH1cbiAgcHJpdmF0ZSBfdmFsdWU6IFNvcnREaXJlY3Rpb24gPSBTb3J0RGlyZWN0aW9uLk5PTkU7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHN0YXRlOiBEYXRhVGFibGVTdGF0ZTxUPiwgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmLCBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlKSB7fVxuXG4gIGNoYW5nZVNvcnQoZGlyOiBTb3J0RGlyZWN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IGRpcjtcbiAgICBjb25zb2xlLmxvZygnc29ydCcsIGRpcik7XG4gICAgdGhpcy5zb3J0Q2hhbmdlLmVtaXQoZGlyKTtcbiAgfVxuXG4gIGNsZWFyU29ydCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlLmNsZWFyU29ydCgpO1xuICAgIHRoaXMuc29ydENoYW5nZS5lbWl0KFNvcnREaXJlY3Rpb24uTk9ORSk7XG4gIH1cbn1cbiIsIjxub3ZvLWljb24gY2xhc3M9XCJub3ZvLXNvcnQtYXNjLWljb25cIiBbQHNvcnRBc2NdPVwidmFsdWVcIiAoY2xpY2spPVwiY2hhbmdlU29ydChTb3J0RGlyZWN0aW9uLkRFU0MpXCI+YXJyb3ctdXA8L25vdm8taWNvbj5cbjxub3ZvLWljb24gY2xhc3M9XCJub3ZvLXNvcnQtZGVzYy1pY29uXCIgW0Bzb3J0RGVzY109XCJ2YWx1ZVwiIChjbGljayk9XCJjaGFuZ2VTb3J0KFNvcnREaXJlY3Rpb24uTk9ORSlcIj5hcnJvdy1kb3duXG48L25vdm8taWNvbj5cbjxub3ZvLWljb24gY2xhc3M9XCJub3ZvLXNvcnRhYmxlLWljb25cIiBbQHNvcnROb25lXT1cInZhbHVlXCIgKGNsaWNrKT1cImNoYW5nZVNvcnQoU29ydERpcmVjdGlvbi5BU0MpXCI+c29ydGFibGU8L25vdm8taWNvbj4iXX0=
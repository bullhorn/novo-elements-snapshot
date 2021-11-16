import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { NovoLabelService } from '../../../services/novo-label-service';
import { DataTableState } from '../state/data-table-state.service';
import { sortAscAnim, sortDescAnim, sortNoneAnim } from './sort-button.animations';
import { SortDirection } from './sort-direction';
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
        this.sortChange.emit(dir);
    }
    clearSort() {
        this.state.clearSort();
        this.sortChange.emit(SortDirection.NONE);
    }
}
NovoDataTableSortButton.decorators = [
    { type: Component, args: [{
                selector: 'novo-sort-button',
                template: "<novo-icon class=\"novo-sort-asc-icon\" [@sortAsc]=\"value\" (click)=\"changeSort(SortDirection.DESC)\">arrow-up</novo-icon>\n<novo-icon class=\"novo-sort-desc-icon\" [@sortDesc]=\"value\" (click)=\"changeSort(SortDirection.NONE)\">arrow-down\n</novo-icon>\n<novo-icon class=\"novo-sortable-icon\" [@sortNone]=\"value\" (click)=\"changeSort(SortDirection.ASC)\">sortable</novo-icon>",
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [sortAscAnim, sortDescAnim, sortNoneAnim],
                styles: ["@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}:host{cursor:pointer;display:inline-flex;height:1.6rem;position:relative;width:1.6rem}:host novo-icon{color:#dbdbdb;opacity:0;position:absolute}:host novo-icon:hover{color:#4a89dc}:host .novo-sort-asc-icon{top:10px}:host .novo-sort-desc-icon{top:-10px}"]
            },] }
];
NovoDataTableSortButton.ctorParameters = () => [
    { type: DataTableState },
    { type: ChangeDetectorRef },
    { type: NovoLabelService }
];
NovoDataTableSortButton.propDecorators = {
    sortChange: [{ type: Output }],
    value: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL2RhdGEtdGFibGUvc29ydC1maWx0ZXIvc29ydC1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkgsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ25GLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQVFqRCxNQUFNLE9BQU8sdUJBQXVCO0lBYWxDLFlBQW1CLEtBQXdCLEVBQVUsR0FBc0IsRUFBUyxNQUF3QjtRQUF6RixVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUFVLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFabEcsZUFBVSxHQUFnQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hFLGtCQUFhLEdBQUcsYUFBYSxDQUFDO1FBUzdCLFdBQU0sR0FBa0IsYUFBYSxDQUFDLElBQUksQ0FBQztJQUU0RCxDQUFDO0lBVGhILElBQ1csS0FBSztRQUNkLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBQ0QsSUFBVyxLQUFLLENBQUMsS0FBb0I7UUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUtELFVBQVUsQ0FBQyxHQUFrQjtRQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsU0FBUztRQUNQLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNDLENBQUM7OztZQTlCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFFNUIsMFlBQTJDO2dCQUMzQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsVUFBVSxFQUFFLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxZQUFZLENBQUM7O2FBQ3REOzs7WUFUUSxjQUFjO1lBRlcsaUJBQWlCO1lBQzFDLGdCQUFnQjs7O3lCQVl0QixNQUFNO29CQUdOLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvbm92by1sYWJlbC1zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFUYWJsZVN0YXRlIH0gZnJvbSAnLi4vc3RhdGUvZGF0YS10YWJsZS1zdGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IHNvcnRBc2NBbmltLCBzb3J0RGVzY0FuaW0sIHNvcnROb25lQW5pbSB9IGZyb20gJy4vc29ydC1idXR0b24uYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBTb3J0RGlyZWN0aW9uIH0gZnJvbSAnLi9zb3J0LWRpcmVjdGlvbic7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXNvcnQtYnV0dG9uJyxcbiAgc3R5bGVVcmxzOiBbJy4vc29ydC1idXR0b24uY29tcG9uZW50LnNjc3MnXSxcbiAgdGVtcGxhdGVVcmw6ICcuL3NvcnQtYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGFuaW1hdGlvbnM6IFtzb3J0QXNjQW5pbSwgc29ydERlc2NBbmltLCBzb3J0Tm9uZUFuaW1dLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRGF0YVRhYmxlU29ydEJ1dHRvbjxUPiB7XG4gIEBPdXRwdXQoKSBzb3J0Q2hhbmdlOiBFdmVudEVtaXR0ZXI8U29ydERpcmVjdGlvbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIHB1YmxpYyBTb3J0RGlyZWN0aW9uID0gU29ydERpcmVjdGlvbjtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgZ2V0IHZhbHVlKCk6IFNvcnREaXJlY3Rpb24ge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHZhbHVlKHZhbHVlOiBTb3J0RGlyZWN0aW9uKSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgfVxuICBwcml2YXRlIF92YWx1ZTogU29ydERpcmVjdGlvbiA9IFNvcnREaXJlY3Rpb24uTk9ORTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgc3RhdGU6IERhdGFUYWJsZVN0YXRlPFQ+LCBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHt9XG5cbiAgY2hhbmdlU29ydChkaXI6IFNvcnREaXJlY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gZGlyO1xuICAgIHRoaXMuc29ydENoYW5nZS5lbWl0KGRpcik7XG4gIH1cblxuICBjbGVhclNvcnQoKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0ZS5jbGVhclNvcnQoKTtcbiAgICB0aGlzLnNvcnRDaGFuZ2UuZW1pdChTb3J0RGlyZWN0aW9uLk5PTkUpO1xuICB9XG59XG4iXX0=
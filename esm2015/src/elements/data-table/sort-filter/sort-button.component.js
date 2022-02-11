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
NovoDataTableSortButton.decorators = [
    { type: Component, args: [{
                selector: 'novo-sort-button',
                template: "<novo-icon\n  class=\"novo-sort-asc-icon\"\n  [class.sort-active]=\"isActive\"\n  [@sortAsc]=\"value\"\n  (click)=\"changeSort(SortDirection.DESC)\">arrow-up</novo-icon>\n<novo-icon\n  class=\"novo-sort-desc-icon\"\n  [class.sort-active]=\"isActive\"\n  [@sortDesc]=\"value\"\n  (click)=\"changeSort(SortDirection.NONE)\">arrow-down</novo-icon>\n<novo-icon\n  class=\"novo-sortable-icon\"\n  [class.sort-active]=\"isActive\"\n  [@sortNone]=\"value\"\n  (click)=\"changeSort(SortDirection.ASC)\">sortable</novo-icon>",
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [sortAscAnim, sortDescAnim, sortNoneAnim],
                styles: [":host{cursor:pointer;display:inline-flex;height:1.6rem;position:relative;width:1.6rem}:host novo-icon{color:#dbdbdb;opacity:0;position:absolute}:host novo-icon:hover{color:var(--selection)}:host .novo-sort-asc-icon{color:var(--selection);top:10px}:host .novo-sort-desc-icon{color:var(--selection);top:-10px}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL2RhdGEtdGFibGUvc29ydC1maWx0ZXIvc29ydC1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkgsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ25GLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQVFqRCxNQUFNLE9BQU8sdUJBQXVCO0lBa0JsQyxZQUFtQixLQUF3QixFQUFVLEdBQXNCLEVBQVMsTUFBd0I7UUFBekYsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUFTLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBakJsRyxlQUFVLEdBQWdDLElBQUksWUFBWSxFQUFFLENBQUM7UUFDaEUsa0JBQWEsR0FBRyxhQUFhLENBQUM7UUFjN0IsV0FBTSxHQUFrQixhQUFhLENBQUMsSUFBSSxDQUFDO0lBRTRELENBQUM7SUFkaEgsSUFDVyxLQUFLO1FBQ2QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFDRCxJQUFXLEtBQUssQ0FBQyxLQUFvQjtRQUNuQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBVyxRQUFRO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxhQUFhLENBQUMsSUFBSSxDQUFDO0lBQzNDLENBQUM7SUFNRCxVQUFVLENBQUMsR0FBa0I7UUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELFNBQVM7UUFDUCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQyxDQUFDOzs7WUFuQ0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBRTVCLCtnQkFBMkM7Z0JBQzNDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxVQUFVLEVBQUUsQ0FBQyxXQUFXLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQzs7YUFDdEQ7OztZQVRRLGNBQWM7WUFGVyxpQkFBaUI7WUFDMUMsZ0JBQWdCOzs7eUJBWXRCLE1BQU07b0JBR04sS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVRhYmxlU3RhdGUgfSBmcm9tICcuLi9zdGF0ZS9kYXRhLXRhYmxlLXN0YXRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgc29ydEFzY0FuaW0sIHNvcnREZXNjQW5pbSwgc29ydE5vbmVBbmltIH0gZnJvbSAnLi9zb3J0LWJ1dHRvbi5hbmltYXRpb25zJztcbmltcG9ydCB7IFNvcnREaXJlY3Rpb24gfSBmcm9tICcuL3NvcnQtZGlyZWN0aW9uJztcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tc29ydC1idXR0b24nLFxuICBzdHlsZVVybHM6IFsnLi9zb3J0LWJ1dHRvbi5jb21wb25lbnQuc2NzcyddLFxuICB0ZW1wbGF0ZVVybDogJy4vc29ydC1idXR0b24uY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgYW5pbWF0aW9uczogW3NvcnRBc2NBbmltLCBzb3J0RGVzY0FuaW0sIHNvcnROb25lQW5pbV0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9EYXRhVGFibGVTb3J0QnV0dG9uPFQ+IHtcbiAgQE91dHB1dCgpIHNvcnRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxTb3J0RGlyZWN0aW9uPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgcHVibGljIFNvcnREaXJlY3Rpb24gPSBTb3J0RGlyZWN0aW9uO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBnZXQgdmFsdWUoKTogU29ydERpcmVjdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgdmFsdWUodmFsdWU6IFNvcnREaXJlY3Rpb24pIHtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBpc0FjdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZSAhPT0gU29ydERpcmVjdGlvbi5OT05FO1xuICB9XG5cbiAgcHJpdmF0ZSBfdmFsdWU6IFNvcnREaXJlY3Rpb24gPSBTb3J0RGlyZWN0aW9uLk5PTkU7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHN0YXRlOiBEYXRhVGFibGVTdGF0ZTxUPiwgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmLCBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlKSB7fVxuXG4gIGNoYW5nZVNvcnQoZGlyOiBTb3J0RGlyZWN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IGRpcjtcbiAgICB0aGlzLnNvcnRDaGFuZ2UuZW1pdChkaXIpO1xuICB9XG5cbiAgY2xlYXJTb3J0KCk6IHZvaWQge1xuICAgIHRoaXMuc3RhdGUuY2xlYXJTb3J0KCk7XG4gICAgdGhpcy5zb3J0Q2hhbmdlLmVtaXQoU29ydERpcmVjdGlvbi5OT05FKTtcbiAgfVxufVxuIl19
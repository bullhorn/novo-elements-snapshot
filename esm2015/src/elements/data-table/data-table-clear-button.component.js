import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { NovoLabelService } from '../../services/novo-label-service';
import { DataTableState } from './state/data-table-state.service';
export class NovoDataTableClearButton {
    constructor(state, ref, labels) {
        this.state = state;
        this.ref = ref;
        this.labels = labels;
        this.selectedClear = new EventEmitter();
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
    clearSelected() {
        this.state.clearSelected();
        this.selectedClear.emit(true);
    }
    clearAll() {
        this.state.reset();
        this.allClear.emit(true);
        this.selectedClear.emit(true);
        this.sortClear.emit(true);
        this.filterClear.emit(true);
    }
}
NovoDataTableClearButton.decorators = [
    { type: Component, args: [{
                selector: 'novo-data-table-clear-button',
                template: `
    <novo-dropdown side="bottom-right" class="novo-data-table-clear-button" data-automation-id="novo-data-table-clear-dropdown">
      <novo-button type="button" theme="primary" color="negative" icon="collapse" data-automation-id="novo-data-table-clear-dropdown-btn">
        {{ labels.clear }}
      </novo-button>
      <list>
        <item
          *ngIf="state.selected.length > 0"
          (click)="clearSelected()"
          data-automation-id="novo-data-table-clear-dropdown-clear-selected"
          >{{ labels.clearSelected }}</item
        >
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
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
NovoDataTableClearButton.ctorParameters = () => [
    { type: DataTableState },
    { type: ChangeDetectorRef },
    { type: NovoLabelService }
];
NovoDataTableClearButton.propDecorators = {
    selectedClear: [{ type: Output }],
    sortClear: [{ type: Output }],
    filterClear: [{ type: Output }],
    allClear: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1jbGVhci1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL2RhdGEtdGFibGUvZGF0YS10YWJsZS1jbGVhci1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUE4QmxFLE1BQU0sT0FBTyx3QkFBd0I7SUFVbkMsWUFBbUIsS0FBd0IsRUFBVSxHQUFzQixFQUFTLE1BQXdCO1FBQXpGLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQVI1RyxrQkFBYSxHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTFELGNBQVMsR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV0RCxnQkFBVyxHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXhELGFBQVEsR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUUwRCxDQUFDO0lBRWhILFNBQVM7UUFDUCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsYUFBYTtRQUNYLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7OztZQTdERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDhCQUE4QjtnQkFDeEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCVDtnQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7O1lBN0JRLGNBQWM7WUFGVyxpQkFBaUI7WUFDMUMsZ0JBQWdCOzs7NEJBZ0N0QixNQUFNO3dCQUVOLE1BQU07MEJBRU4sTUFBTTt1QkFFTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbm92by1sYWJlbC1zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFUYWJsZVN0YXRlIH0gZnJvbSAnLi9zdGF0ZS9kYXRhLXRhYmxlLXN0YXRlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWRhdGEtdGFibGUtY2xlYXItYnV0dG9uJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bm92by1kcm9wZG93biBzaWRlPVwiYm90dG9tLXJpZ2h0XCIgY2xhc3M9XCJub3ZvLWRhdGEtdGFibGUtY2xlYXItYnV0dG9uXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by1kYXRhLXRhYmxlLWNsZWFyLWRyb3Bkb3duXCI+XG4gICAgICA8bm92by1idXR0b24gdHlwZT1cImJ1dHRvblwiIHRoZW1lPVwicHJpbWFyeVwiIGNvbG9yPVwibmVnYXRpdmVcIiBpY29uPVwiY29sbGFwc2VcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLWRhdGEtdGFibGUtY2xlYXItZHJvcGRvd24tYnRuXCI+XG4gICAgICAgIHt7IGxhYmVscy5jbGVhciB9fVxuICAgICAgPC9ub3ZvLWJ1dHRvbj5cbiAgICAgIDxsaXN0PlxuICAgICAgICA8aXRlbVxuICAgICAgICAgICpuZ0lmPVwic3RhdGUuc2VsZWN0ZWQubGVuZ3RoID4gMFwiXG4gICAgICAgICAgKGNsaWNrKT1cImNsZWFyU2VsZWN0ZWQoKVwiXG4gICAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by1kYXRhLXRhYmxlLWNsZWFyLWRyb3Bkb3duLWNsZWFyLXNlbGVjdGVkXCJcbiAgICAgICAgICA+e3sgbGFiZWxzLmNsZWFyU2VsZWN0ZWQgfX08L2l0ZW1cbiAgICAgICAgPlxuICAgICAgICA8aXRlbSAqbmdJZj1cInN0YXRlLnNvcnRcIiAoY2xpY2spPVwiY2xlYXJTb3J0KClcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLWRhdGEtdGFibGUtY2xlYXItZHJvcGRvd24tY2xlYXItc29ydFwiPnt7XG4gICAgICAgICAgbGFiZWxzLmNsZWFyU29ydFxuICAgICAgICB9fTwvaXRlbT5cbiAgICAgICAgPGl0ZW0gKm5nSWY9XCJzdGF0ZS5maWx0ZXJcIiAoY2xpY2spPVwiY2xlYXJGaWx0ZXIoKVwiIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tZGF0YS10YWJsZS1jbGVhci1kcm9wZG93bi1jbGVhci1maWx0ZXJcIj57e1xuICAgICAgICAgIGxhYmVscy5jbGVhckZpbHRlclxuICAgICAgICB9fTwvaXRlbT5cbiAgICAgICAgPGl0ZW0gKm5nSWY9XCJzdGF0ZS5zb3J0ICYmIHN0YXRlLmZpbHRlclwiIChjbGljayk9XCJjbGVhckFsbCgpXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by1kYXRhLXRhYmxlLWNsZWFyLWRyb3Bkb3duLWNsZWFyLWFsbFwiPnt7XG4gICAgICAgICAgbGFiZWxzLmNsZWFyQWxsTm9ybWFsQ2FzZVxuICAgICAgICB9fTwvaXRlbT5cbiAgICAgIDwvbGlzdD5cbiAgICA8L25vdm8tZHJvcGRvd24+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRGF0YVRhYmxlQ2xlYXJCdXR0b248VD4ge1xuICBAT3V0cHV0KClcbiAgc2VsZWN0ZWRDbGVhcjogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgc29ydENsZWFyOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBmaWx0ZXJDbGVhcjogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgYWxsQ2xlYXI6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgc3RhdGU6IERhdGFUYWJsZVN0YXRlPFQ+LCBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHt9XG5cbiAgY2xlYXJTb3J0KCk6IHZvaWQge1xuICAgIHRoaXMuc3RhdGUuY2xlYXJTb3J0KCk7XG4gICAgdGhpcy5zb3J0Q2xlYXIuZW1pdCh0cnVlKTtcbiAgfVxuXG4gIGNsZWFyRmlsdGVyKCk6IHZvaWQge1xuICAgIHRoaXMuc3RhdGUuY2xlYXJGaWx0ZXIoKTtcbiAgICB0aGlzLmZpbHRlckNsZWFyLmVtaXQodHJ1ZSk7XG4gIH1cblxuICBjbGVhclNlbGVjdGVkKCk6IHZvaWQge1xuICAgIHRoaXMuc3RhdGUuY2xlYXJTZWxlY3RlZCgpO1xuICAgIHRoaXMuc2VsZWN0ZWRDbGVhci5lbWl0KHRydWUpO1xuICB9XG5cbiAgY2xlYXJBbGwoKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0ZS5yZXNldCgpO1xuICAgIHRoaXMuYWxsQ2xlYXIuZW1pdCh0cnVlKTtcbiAgICB0aGlzLnNlbGVjdGVkQ2xlYXIuZW1pdCh0cnVlKTtcbiAgICB0aGlzLnNvcnRDbGVhci5lbWl0KHRydWUpO1xuICAgIHRoaXMuZmlsdGVyQ2xlYXIuZW1pdCh0cnVlKTtcbiAgfVxufVxuIl19
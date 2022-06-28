import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { NovoLabelService } from '../../services/novo-label-service';
import { DataTableState } from './state/data-table-state.service';
import * as i0 from "@angular/core";
import * as i1 from "./state/data-table-state.service";
import * as i2 from "../../services/novo-label-service";
import * as i3 from "../dropdown/Dropdown";
import * as i4 from "../button/Button";
import * as i5 from "../common/directives/theme.directive";
import * as i6 from "@angular/common";
export class NovoDataTableClearButton {
    constructor(state, ref, labels) {
        this.state = state;
        this.ref = ref;
        this.labels = labels;
        this.selectedClear = new EventEmitter();
        this.sortClear = new EventEmitter();
        this.filterClear = new EventEmitter();
        this.queryClear = new EventEmitter();
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
    clearSearch() {
        this.state.clearQuery();
        this.queryClear.emit(true);
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
        this.queryClear.emit(true);
    }
}
NovoDataTableClearButton.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDataTableClearButton, deps: [{ token: i1.DataTableState }, { token: i0.ChangeDetectorRef }, { token: i2.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component });
NovoDataTableClearButton.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDataTableClearButton, selector: "novo-data-table-clear-button", outputs: { selectedClear: "selectedClear", sortClear: "sortClear", filterClear: "filterClear", queryClear: "queryClear", allClear: "allClear" }, ngImport: i0, template: `
    <novo-dropdown side="bottom-right" class="novo-data-table-clear-button" data-automation-id="novo-data-table-clear-dropdown">
      <novo-button type="button" theme="primary" color="negative" icon="collapse" data-automation-id="novo-data-table-clear-dropdown-btn">
        {{ labels.clear }}
      </novo-button>
      <list>
        <item
          *ngIf="state.selected.length > 0"
          (click)="clearSelected()"
          data-automation-id="novo-data-table-clear-dropdown-clear-selected"
          >{{ labels.clearSelected }}</item>
        <item *ngIf="state.sort" (click)="clearSort()" data-automation-id="novo-data-table-clear-dropdown-clear-sort">{{
          labels.clearSort
        }}</item>
        <item *ngIf="state.filter || state.globalSearch" (click)="clearFilter()" data-automation-id="novo-data-table-clear-dropdown-clear-filter">{{
          labels.clearFilter
        }}</item>
        <item *ngIf="state.where" (click)="clearSearch()" data-automation-id="novo-data-table-clear-dropdown-clear-search">{{
          labels.clearSearch
        }}</item>
        <item *ngIf="(state.sort && (state.filter || state.globalSearch)) || (state.sort && state.where) || (state.where && (state.filter || state.globalSearch))"
          (click)="clearAll()" data-automation-id="novo-data-table-clear-dropdown-clear-all">{{
          labels.clearAllNormalCase
        }}</item>
      </list>
    </novo-dropdown>
  `, isInline: true, components: [{ type: i3.NovoDropdownElement, selector: "novo-dropdown", inputs: ["parentScrollSelector", "parentScrollAction", "containerClass", "side", "scrollStrategy", "keepOpen", "height", "width", "appendToBody", "multiple"], outputs: ["toggled"] }, { type: i4.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }, { type: i3.NovoDropdownListElement, selector: "list" }, { type: i3.NovoItemElement, selector: "item", inputs: ["disabled", "keepOpen"], outputs: ["action"] }], directives: [{ type: i5.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDataTableClearButton, decorators: [{
            type: Component,
            args: [{
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
          >{{ labels.clearSelected }}</item>
        <item *ngIf="state.sort" (click)="clearSort()" data-automation-id="novo-data-table-clear-dropdown-clear-sort">{{
          labels.clearSort
        }}</item>
        <item *ngIf="state.filter || state.globalSearch" (click)="clearFilter()" data-automation-id="novo-data-table-clear-dropdown-clear-filter">{{
          labels.clearFilter
        }}</item>
        <item *ngIf="state.where" (click)="clearSearch()" data-automation-id="novo-data-table-clear-dropdown-clear-search">{{
          labels.clearSearch
        }}</item>
        <item *ngIf="(state.sort && (state.filter || state.globalSearch)) || (state.sort && state.where) || (state.where && (state.filter || state.globalSearch))"
          (click)="clearAll()" data-automation-id="novo-data-table-clear-dropdown-clear-all">{{
          labels.clearAllNormalCase
        }}</item>
      </list>
    </novo-dropdown>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i1.DataTableState }, { type: i0.ChangeDetectorRef }, { type: i2.NovoLabelService }]; }, propDecorators: { selectedClear: [{
                type: Output
            }], sortClear: [{
                type: Output
            }], filterClear: [{
                type: Output
            }], queryClear: [{
                type: Output
            }], allClear: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1jbGVhci1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvZGF0YS10YWJsZS9kYXRhLXRhYmxlLWNsZWFyLWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVHLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQzs7Ozs7Ozs7QUFpQ2xFLE1BQU0sT0FBTyx3QkFBd0I7SUFZbkMsWUFBbUIsS0FBd0IsRUFBVSxHQUFzQixFQUFTLE1BQXdCO1FBQXpGLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQVY1RyxrQkFBYSxHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTFELGNBQVMsR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV0RCxnQkFBVyxHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXhELGVBQVUsR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV2RCxhQUFRLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUM7SUFFMEQsQ0FBQztJQUVoSCxTQUFTO1FBQ1AsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQzs7c0hBekNVLHdCQUF3QjswR0FBeEIsd0JBQXdCLHFOQTdCekI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJUOzRGQUdVLHdCQUF3QjtrQkEvQnBDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDhCQUE4QjtvQkFDeEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7b0tBR0MsYUFBYTtzQkFEWixNQUFNO2dCQUdQLFNBQVM7c0JBRFIsTUFBTTtnQkFHUCxXQUFXO3NCQURWLE1BQU07Z0JBR1AsVUFBVTtzQkFEVCxNQUFNO2dCQUdQLFFBQVE7c0JBRFAsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhVGFibGVTdGF0ZSB9IGZyb20gJy4vc3RhdGUvZGF0YS10YWJsZS1zdGF0ZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1kYXRhLXRhYmxlLWNsZWFyLWJ1dHRvbicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5vdm8tZHJvcGRvd24gc2lkZT1cImJvdHRvbS1yaWdodFwiIGNsYXNzPVwibm92by1kYXRhLXRhYmxlLWNsZWFyLWJ1dHRvblwiIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tZGF0YS10YWJsZS1jbGVhci1kcm9wZG93blwiPlxuICAgICAgPG5vdm8tYnV0dG9uIHR5cGU9XCJidXR0b25cIiB0aGVtZT1cInByaW1hcnlcIiBjb2xvcj1cIm5lZ2F0aXZlXCIgaWNvbj1cImNvbGxhcHNlXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by1kYXRhLXRhYmxlLWNsZWFyLWRyb3Bkb3duLWJ0blwiPlxuICAgICAgICB7eyBsYWJlbHMuY2xlYXIgfX1cbiAgICAgIDwvbm92by1idXR0b24+XG4gICAgICA8bGlzdD5cbiAgICAgICAgPGl0ZW1cbiAgICAgICAgICAqbmdJZj1cInN0YXRlLnNlbGVjdGVkLmxlbmd0aCA+IDBcIlxuICAgICAgICAgIChjbGljayk9XCJjbGVhclNlbGVjdGVkKClcIlxuICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tZGF0YS10YWJsZS1jbGVhci1kcm9wZG93bi1jbGVhci1zZWxlY3RlZFwiXG4gICAgICAgICAgPnt7IGxhYmVscy5jbGVhclNlbGVjdGVkIH19PC9pdGVtPlxuICAgICAgICA8aXRlbSAqbmdJZj1cInN0YXRlLnNvcnRcIiAoY2xpY2spPVwiY2xlYXJTb3J0KClcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLWRhdGEtdGFibGUtY2xlYXItZHJvcGRvd24tY2xlYXItc29ydFwiPnt7XG4gICAgICAgICAgbGFiZWxzLmNsZWFyU29ydFxuICAgICAgICB9fTwvaXRlbT5cbiAgICAgICAgPGl0ZW0gKm5nSWY9XCJzdGF0ZS5maWx0ZXIgfHwgc3RhdGUuZ2xvYmFsU2VhcmNoXCIgKGNsaWNrKT1cImNsZWFyRmlsdGVyKClcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLWRhdGEtdGFibGUtY2xlYXItZHJvcGRvd24tY2xlYXItZmlsdGVyXCI+e3tcbiAgICAgICAgICBsYWJlbHMuY2xlYXJGaWx0ZXJcbiAgICAgICAgfX08L2l0ZW0+XG4gICAgICAgIDxpdGVtICpuZ0lmPVwic3RhdGUud2hlcmVcIiAoY2xpY2spPVwiY2xlYXJTZWFyY2goKVwiIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tZGF0YS10YWJsZS1jbGVhci1kcm9wZG93bi1jbGVhci1zZWFyY2hcIj57e1xuICAgICAgICAgIGxhYmVscy5jbGVhclNlYXJjaFxuICAgICAgICB9fTwvaXRlbT5cbiAgICAgICAgPGl0ZW0gKm5nSWY9XCIoc3RhdGUuc29ydCAmJiAoc3RhdGUuZmlsdGVyIHx8IHN0YXRlLmdsb2JhbFNlYXJjaCkpIHx8IChzdGF0ZS5zb3J0ICYmIHN0YXRlLndoZXJlKSB8fCAoc3RhdGUud2hlcmUgJiYgKHN0YXRlLmZpbHRlciB8fCBzdGF0ZS5nbG9iYWxTZWFyY2gpKVwiXG4gICAgICAgICAgKGNsaWNrKT1cImNsZWFyQWxsKClcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLWRhdGEtdGFibGUtY2xlYXItZHJvcGRvd24tY2xlYXItYWxsXCI+e3tcbiAgICAgICAgICBsYWJlbHMuY2xlYXJBbGxOb3JtYWxDYXNlXG4gICAgICAgIH19PC9pdGVtPlxuICAgICAgPC9saXN0PlxuICAgIDwvbm92by1kcm9wZG93bj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9EYXRhVGFibGVDbGVhckJ1dHRvbjxUPiB7XG4gIEBPdXRwdXQoKVxuICBzZWxlY3RlZENsZWFyOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBzb3J0Q2xlYXI6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIGZpbHRlckNsZWFyOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBxdWVyeUNsZWFyOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBhbGxDbGVhcjogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzdGF0ZTogRGF0YVRhYmxlU3RhdGU8VD4sIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSkge31cblxuICBjbGVhclNvcnQoKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0ZS5jbGVhclNvcnQoKTtcbiAgICB0aGlzLnNvcnRDbGVhci5lbWl0KHRydWUpO1xuICB9XG5cbiAgY2xlYXJGaWx0ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0ZS5jbGVhckZpbHRlcigpO1xuICAgIHRoaXMuZmlsdGVyQ2xlYXIuZW1pdCh0cnVlKTtcbiAgfVxuXG4gIGNsZWFyU2VhcmNoKCk6IHZvaWQge1xuICAgIHRoaXMuc3RhdGUuY2xlYXJRdWVyeSgpO1xuICAgIHRoaXMucXVlcnlDbGVhci5lbWl0KHRydWUpO1xuICB9XG5cbiAgY2xlYXJTZWxlY3RlZCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlLmNsZWFyU2VsZWN0ZWQoKTtcbiAgICB0aGlzLnNlbGVjdGVkQ2xlYXIuZW1pdCh0cnVlKTtcbiAgfVxuXG4gIGNsZWFyQWxsKCk6IHZvaWQge1xuICAgIHRoaXMuc3RhdGUucmVzZXQoKTtcbiAgICB0aGlzLmFsbENsZWFyLmVtaXQodHJ1ZSk7XG4gICAgdGhpcy5zZWxlY3RlZENsZWFyLmVtaXQodHJ1ZSk7XG4gICAgdGhpcy5zb3J0Q2xlYXIuZW1pdCh0cnVlKTtcbiAgICB0aGlzLmZpbHRlckNsZWFyLmVtaXQodHJ1ZSk7XG4gICAgdGhpcy5xdWVyeUNsZWFyLmVtaXQodHJ1ZSk7XG4gIH1cbn1cbiJdfQ==
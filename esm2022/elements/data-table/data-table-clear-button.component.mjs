import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output, Input } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import { DataTableState } from './state/data-table-state.service';
import * as i0 from "@angular/core";
import * as i1 from "./state/data-table-state.service";
import * as i2 from "novo-elements/services";
import * as i3 from "@angular/common";
import * as i4 from "novo-elements/elements/button";
import * as i5 from "novo-elements/elements/dropdown";
import * as i6 from "novo-elements/elements/common";
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
        this.emitOnly = false;
    }
    clearSort() {
        if (!this.emitOnly) {
            this.state.clearSort();
        }
        this.sortClear.emit(true);
    }
    clearFilter() {
        if (!this.emitOnly) {
            this.state.clearFilter();
        }
        this.filterClear.emit(true);
    }
    clearSearch() {
        if (!this.emitOnly) {
            this.state.clearQuery();
        }
        this.queryClear.emit(true);
    }
    clearSelected() {
        if (!this.emitOnly) {
            this.state.clearSelected();
        }
        this.selectedClear.emit(true);
    }
    clearAll() {
        if (!this.emitOnly) {
            this.state.reset();
        }
        this.allClear.emit(true);
        this.selectedClear.emit(true);
        this.sortClear.emit(true);
        this.filterClear.emit(true);
        this.queryClear.emit(true);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoDataTableClearButton, deps: [{ token: i1.DataTableState }, { token: i0.ChangeDetectorRef }, { token: i2.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.3", type: NovoDataTableClearButton, selector: "novo-data-table-clear-button", inputs: { emitOnly: "emitOnly" }, outputs: { selectedClear: "selectedClear", sortClear: "sortClear", filterClear: "filterClear", queryClear: "queryClear", allClear: "allClear" }, ngImport: i0, template: `
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
          (click)="clearAll()" data-automation-id="novo-data-table-clear-dropdown-clear-all"><b>{{
          labels.clearAllNormalCase
        }}</b></item>
      </list>
    </novo-dropdown>
  `, isInline: true, dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i4.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }, { kind: "component", type: i5.NovoDropdownElement, selector: "novo-dropdown", inputs: ["parentScrollSelector", "parentScrollAction", "containerClass", "side", "scrollStrategy", "keepOpen", "height", "width", "appendToBody", "multiple", "scrollToActiveItemOnOpen"], outputs: ["toggled"] }, { kind: "component", type: i5.NovoItemElement, selector: "item", inputs: ["disabled", "keepOpen"], outputs: ["action"] }, { kind: "component", type: i5.NovoDropdownListElement, selector: "list" }, { kind: "directive", type: i6.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoDataTableClearButton, decorators: [{
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
          (click)="clearAll()" data-automation-id="novo-data-table-clear-dropdown-clear-all"><b>{{
          labels.clearAllNormalCase
        }}</b></item>
      </list>
    </novo-dropdown>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: () => [{ type: i1.DataTableState }, { type: i0.ChangeDetectorRef }, { type: i2.NovoLabelService }], propDecorators: { selectedClear: [{
                type: Output
            }], sortClear: [{
                type: Output
            }], filterClear: [{
                type: Output
            }], queryClear: [{
                type: Output
            }], allClear: [{
                type: Output
            }], emitOnly: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1jbGVhci1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvZGF0YS10YWJsZS9kYXRhLXRhYmxlLWNsZWFyLWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuSCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0NBQWtDLENBQUM7Ozs7Ozs7O0FBaUNsRSxNQUFNLE9BQU8sd0JBQXdCO0lBY25DLFlBQW1CLEtBQXdCLEVBQVUsR0FBc0IsRUFBUyxNQUF3QjtRQUF6RixVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUFVLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFaNUcsa0JBQWEsR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUUxRCxjQUFTLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFdEQsZ0JBQVcsR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV4RCxlQUFVLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFdkQsYUFBUSxHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXJELGFBQVEsR0FBWSxLQUFLLENBQUM7SUFFc0YsQ0FBQztJQUVqSCxTQUFTO1FBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3pCLENBQUM7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMzQixDQUFDO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDMUIsQ0FBQztRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzdCLENBQUM7UUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyQixDQUFDO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQzs4R0FyRFUsd0JBQXdCO2tHQUF4Qix3QkFBd0IsdVBBN0J6Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQlQ7OzJGQUdVLHdCQUF3QjtrQkEvQnBDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDhCQUE4QjtvQkFDeEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7a0pBR0MsYUFBYTtzQkFEWixNQUFNO2dCQUdQLFNBQVM7c0JBRFIsTUFBTTtnQkFHUCxXQUFXO3NCQURWLE1BQU07Z0JBR1AsVUFBVTtzQkFEVCxNQUFNO2dCQUdQLFFBQVE7c0JBRFAsTUFBTTtnQkFHUCxRQUFRO3NCQURQLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBEYXRhVGFibGVTdGF0ZSB9IGZyb20gJy4vc3RhdGUvZGF0YS10YWJsZS1zdGF0ZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1kYXRhLXRhYmxlLWNsZWFyLWJ1dHRvbicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5vdm8tZHJvcGRvd24gc2lkZT1cImJvdHRvbS1yaWdodFwiIGNsYXNzPVwibm92by1kYXRhLXRhYmxlLWNsZWFyLWJ1dHRvblwiIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tZGF0YS10YWJsZS1jbGVhci1kcm9wZG93blwiPlxuICAgICAgPG5vdm8tYnV0dG9uIHR5cGU9XCJidXR0b25cIiB0aGVtZT1cInByaW1hcnlcIiBjb2xvcj1cIm5lZ2F0aXZlXCIgaWNvbj1cImNvbGxhcHNlXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by1kYXRhLXRhYmxlLWNsZWFyLWRyb3Bkb3duLWJ0blwiPlxuICAgICAgICB7eyBsYWJlbHMuY2xlYXIgfX1cbiAgICAgIDwvbm92by1idXR0b24+XG4gICAgICA8bGlzdD5cbiAgICAgICAgPGl0ZW1cbiAgICAgICAgICAqbmdJZj1cInN0YXRlLnNlbGVjdGVkLmxlbmd0aCA+IDBcIlxuICAgICAgICAgIChjbGljayk9XCJjbGVhclNlbGVjdGVkKClcIlxuICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tZGF0YS10YWJsZS1jbGVhci1kcm9wZG93bi1jbGVhci1zZWxlY3RlZFwiXG4gICAgICAgICAgPnt7IGxhYmVscy5jbGVhclNlbGVjdGVkIH19PC9pdGVtPlxuICAgICAgICA8aXRlbSAqbmdJZj1cInN0YXRlLnNvcnRcIiAoY2xpY2spPVwiY2xlYXJTb3J0KClcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLWRhdGEtdGFibGUtY2xlYXItZHJvcGRvd24tY2xlYXItc29ydFwiPnt7XG4gICAgICAgICAgbGFiZWxzLmNsZWFyU29ydFxuICAgICAgICB9fTwvaXRlbT5cbiAgICAgICAgPGl0ZW0gKm5nSWY9XCJzdGF0ZS5maWx0ZXIgfHwgc3RhdGUuZ2xvYmFsU2VhcmNoXCIgKGNsaWNrKT1cImNsZWFyRmlsdGVyKClcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLWRhdGEtdGFibGUtY2xlYXItZHJvcGRvd24tY2xlYXItZmlsdGVyXCI+e3tcbiAgICAgICAgICBsYWJlbHMuY2xlYXJGaWx0ZXJcbiAgICAgICAgfX08L2l0ZW0+XG4gICAgICAgIDxpdGVtICpuZ0lmPVwic3RhdGUud2hlcmVcIiAoY2xpY2spPVwiY2xlYXJTZWFyY2goKVwiIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tZGF0YS10YWJsZS1jbGVhci1kcm9wZG93bi1jbGVhci1zZWFyY2hcIj57e1xuICAgICAgICAgIGxhYmVscy5jbGVhclNlYXJjaFxuICAgICAgICB9fTwvaXRlbT5cbiAgICAgICAgPGl0ZW0gKm5nSWY9XCIoc3RhdGUuc29ydCAmJiAoc3RhdGUuZmlsdGVyIHx8IHN0YXRlLmdsb2JhbFNlYXJjaCkpIHx8IChzdGF0ZS5zb3J0ICYmIHN0YXRlLndoZXJlKSB8fCAoc3RhdGUud2hlcmUgJiYgKHN0YXRlLmZpbHRlciB8fCBzdGF0ZS5nbG9iYWxTZWFyY2gpKVwiXG4gICAgICAgICAgKGNsaWNrKT1cImNsZWFyQWxsKClcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLWRhdGEtdGFibGUtY2xlYXItZHJvcGRvd24tY2xlYXItYWxsXCI+PGI+e3tcbiAgICAgICAgICBsYWJlbHMuY2xlYXJBbGxOb3JtYWxDYXNlXG4gICAgICAgIH19PC9iPjwvaXRlbT5cbiAgICAgIDwvbGlzdD5cbiAgICA8L25vdm8tZHJvcGRvd24+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRGF0YVRhYmxlQ2xlYXJCdXR0b248VD4ge1xuICBAT3V0cHV0KClcbiAgc2VsZWN0ZWRDbGVhcjogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgc29ydENsZWFyOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBmaWx0ZXJDbGVhcjogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgcXVlcnlDbGVhcjogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgYWxsQ2xlYXI6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQElucHV0KClcbiAgZW1pdE9ubHk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgc3RhdGU6IERhdGFUYWJsZVN0YXRlPFQ+LCBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHsgfVxuXG4gIGNsZWFyU29ydCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZW1pdE9ubHkpIHtcbiAgICAgIHRoaXMuc3RhdGUuY2xlYXJTb3J0KCk7XG4gICAgfVxuICAgIHRoaXMuc29ydENsZWFyLmVtaXQodHJ1ZSk7XG4gIH1cblxuICBjbGVhckZpbHRlcigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZW1pdE9ubHkpIHtcbiAgICAgIHRoaXMuc3RhdGUuY2xlYXJGaWx0ZXIoKTtcbiAgICB9XG4gICAgdGhpcy5maWx0ZXJDbGVhci5lbWl0KHRydWUpO1xuICB9XG5cbiAgY2xlYXJTZWFyY2goKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmVtaXRPbmx5KSB7XG4gICAgICB0aGlzLnN0YXRlLmNsZWFyUXVlcnkoKTtcbiAgICB9XG4gICAgdGhpcy5xdWVyeUNsZWFyLmVtaXQodHJ1ZSk7XG4gIH1cblxuICBjbGVhclNlbGVjdGVkKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5lbWl0T25seSkge1xuICAgICAgdGhpcy5zdGF0ZS5jbGVhclNlbGVjdGVkKCk7XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0ZWRDbGVhci5lbWl0KHRydWUpO1xuICB9XG5cbiAgY2xlYXJBbGwoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmVtaXRPbmx5KSB7XG4gICAgICB0aGlzLnN0YXRlLnJlc2V0KCk7XG4gICAgfVxuICAgIHRoaXMuYWxsQ2xlYXIuZW1pdCh0cnVlKTtcbiAgICB0aGlzLnNlbGVjdGVkQ2xlYXIuZW1pdCh0cnVlKTtcbiAgICB0aGlzLnNvcnRDbGVhci5lbWl0KHRydWUpO1xuICAgIHRoaXMuZmlsdGVyQ2xlYXIuZW1pdCh0cnVlKTtcbiAgICB0aGlzLnF1ZXJ5Q2xlYXIuZW1pdCh0cnVlKTtcbiAgfVxufVxuIl19
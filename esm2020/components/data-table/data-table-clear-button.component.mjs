import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { DataTableState } from './state/data-table-state.service';
import { NovoLabelService } from 'novo-elements/services';
import * as i0 from "@angular/core";
import * as i1 from "./state/data-table-state.service";
import * as i2 from "novo-elements/services";
import * as i3 from "novo-elements/components/dropdown";
import * as i4 from "novo-elements/components/button";
import * as i5 from "novo-elements/common";
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
          (click)="clearAll()" data-automation-id="novo-data-table-clear-dropdown-clear-all"><b>{{
          labels.clearAllNormalCase
        }}</b></item>
      </list>
    </novo-dropdown>
  `, isInline: true, components: [{ type: i3.NovoDropdownElement, selector: "novo-dropdown", inputs: ["parentScrollSelector", "parentScrollAction", "containerClass", "side", "scrollStrategy", "keepOpen", "height", "width", "appendToBody", "multiple"], outputs: ["toggled"] }, { type: i4.NovoButtonElement, selector: "novo-button,button[theme],button[basic],button[primary],button[outlined],button[icon],button[fab]", inputs: ["color", "side", "size", "theme", "variant", "loading", "icon", "basic", "primary", "outlined", "fab", "standard", "disabled"] }, { type: i3.NovoDropdownListElement, selector: "list" }, { type: i3.NovoItemElement, selector: "item", inputs: ["disabled", "keepOpen"], outputs: ["action"] }], directives: [{ type: i5.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
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
          (click)="clearAll()" data-automation-id="novo-data-table-clear-dropdown-clear-all"><b>{{
          labels.clearAllNormalCase
        }}</b></item>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1jbGVhci1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy9kYXRhLXRhYmxlL2RhdGEtdGFibGUtY2xlYXItYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUcsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7Ozs7OztBQWlDMUQsTUFBTSxPQUFPLHdCQUF3QjtJQVluQyxZQUFtQixLQUF3QixFQUFVLEdBQXNCLEVBQVMsTUFBd0I7UUFBekYsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUFTLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBVjVHLGtCQUFhLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFMUQsY0FBUyxHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXRELGdCQUFXLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFeEQsZUFBVSxHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXZELGFBQVEsR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUUwRCxDQUFDO0lBRWhILFNBQVM7UUFDUCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELGFBQWE7UUFDWCxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDOztzSEF6Q1Usd0JBQXdCOzBHQUF4Qix3QkFBd0IscU5BN0J6Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQlQ7NEZBR1Usd0JBQXdCO2tCQS9CcEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsOEJBQThCO29CQUN4QyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJUO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDtvS0FHQyxhQUFhO3NCQURaLE1BQU07Z0JBR1AsU0FBUztzQkFEUixNQUFNO2dCQUdQLFdBQVc7c0JBRFYsTUFBTTtnQkFHUCxVQUFVO3NCQURULE1BQU07Z0JBR1AsUUFBUTtzQkFEUCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhVGFibGVTdGF0ZSB9IGZyb20gJy4vc3RhdGUvZGF0YS10YWJsZS1zdGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3NlcnZpY2VzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1kYXRhLXRhYmxlLWNsZWFyLWJ1dHRvbicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5vdm8tZHJvcGRvd24gc2lkZT1cImJvdHRvbS1yaWdodFwiIGNsYXNzPVwibm92by1kYXRhLXRhYmxlLWNsZWFyLWJ1dHRvblwiIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tZGF0YS10YWJsZS1jbGVhci1kcm9wZG93blwiPlxuICAgICAgPG5vdm8tYnV0dG9uIHR5cGU9XCJidXR0b25cIiB0aGVtZT1cInByaW1hcnlcIiBjb2xvcj1cIm5lZ2F0aXZlXCIgaWNvbj1cImNvbGxhcHNlXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by1kYXRhLXRhYmxlLWNsZWFyLWRyb3Bkb3duLWJ0blwiPlxuICAgICAgICB7eyBsYWJlbHMuY2xlYXIgfX1cbiAgICAgIDwvbm92by1idXR0b24+XG4gICAgICA8bGlzdD5cbiAgICAgICAgPGl0ZW1cbiAgICAgICAgICAqbmdJZj1cInN0YXRlLnNlbGVjdGVkLmxlbmd0aCA+IDBcIlxuICAgICAgICAgIChjbGljayk9XCJjbGVhclNlbGVjdGVkKClcIlxuICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tZGF0YS10YWJsZS1jbGVhci1kcm9wZG93bi1jbGVhci1zZWxlY3RlZFwiXG4gICAgICAgICAgPnt7IGxhYmVscy5jbGVhclNlbGVjdGVkIH19PC9pdGVtPlxuICAgICAgICA8aXRlbSAqbmdJZj1cInN0YXRlLnNvcnRcIiAoY2xpY2spPVwiY2xlYXJTb3J0KClcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLWRhdGEtdGFibGUtY2xlYXItZHJvcGRvd24tY2xlYXItc29ydFwiPnt7XG4gICAgICAgICAgbGFiZWxzLmNsZWFyU29ydFxuICAgICAgICB9fTwvaXRlbT5cbiAgICAgICAgPGl0ZW0gKm5nSWY9XCJzdGF0ZS5maWx0ZXIgfHwgc3RhdGUuZ2xvYmFsU2VhcmNoXCIgKGNsaWNrKT1cImNsZWFyRmlsdGVyKClcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLWRhdGEtdGFibGUtY2xlYXItZHJvcGRvd24tY2xlYXItZmlsdGVyXCI+e3tcbiAgICAgICAgICBsYWJlbHMuY2xlYXJGaWx0ZXJcbiAgICAgICAgfX08L2l0ZW0+XG4gICAgICAgIDxpdGVtICpuZ0lmPVwic3RhdGUud2hlcmVcIiAoY2xpY2spPVwiY2xlYXJTZWFyY2goKVwiIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tZGF0YS10YWJsZS1jbGVhci1kcm9wZG93bi1jbGVhci1zZWFyY2hcIj57e1xuICAgICAgICAgIGxhYmVscy5jbGVhclNlYXJjaFxuICAgICAgICB9fTwvaXRlbT5cbiAgICAgICAgPGl0ZW0gKm5nSWY9XCIoc3RhdGUuc29ydCAmJiAoc3RhdGUuZmlsdGVyIHx8IHN0YXRlLmdsb2JhbFNlYXJjaCkpIHx8IChzdGF0ZS5zb3J0ICYmIHN0YXRlLndoZXJlKSB8fCAoc3RhdGUud2hlcmUgJiYgKHN0YXRlLmZpbHRlciB8fCBzdGF0ZS5nbG9iYWxTZWFyY2gpKVwiXG4gICAgICAgICAgKGNsaWNrKT1cImNsZWFyQWxsKClcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLWRhdGEtdGFibGUtY2xlYXItZHJvcGRvd24tY2xlYXItYWxsXCI+PGI+e3tcbiAgICAgICAgICBsYWJlbHMuY2xlYXJBbGxOb3JtYWxDYXNlXG4gICAgICAgIH19PC9iPjwvaXRlbT5cbiAgICAgIDwvbGlzdD5cbiAgICA8L25vdm8tZHJvcGRvd24+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRGF0YVRhYmxlQ2xlYXJCdXR0b248VD4ge1xuICBAT3V0cHV0KClcbiAgc2VsZWN0ZWRDbGVhcjogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgc29ydENsZWFyOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBmaWx0ZXJDbGVhcjogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgcXVlcnlDbGVhcjogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgYWxsQ2xlYXI6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgc3RhdGU6IERhdGFUYWJsZVN0YXRlPFQ+LCBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHt9XG5cbiAgY2xlYXJTb3J0KCk6IHZvaWQge1xuICAgIHRoaXMuc3RhdGUuY2xlYXJTb3J0KCk7XG4gICAgdGhpcy5zb3J0Q2xlYXIuZW1pdCh0cnVlKTtcbiAgfVxuXG4gIGNsZWFyRmlsdGVyKCk6IHZvaWQge1xuICAgIHRoaXMuc3RhdGUuY2xlYXJGaWx0ZXIoKTtcbiAgICB0aGlzLmZpbHRlckNsZWFyLmVtaXQodHJ1ZSk7XG4gIH1cblxuICBjbGVhclNlYXJjaCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlLmNsZWFyUXVlcnkoKTtcbiAgICB0aGlzLnF1ZXJ5Q2xlYXIuZW1pdCh0cnVlKTtcbiAgfVxuXG4gIGNsZWFyU2VsZWN0ZWQoKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0ZS5jbGVhclNlbGVjdGVkKCk7XG4gICAgdGhpcy5zZWxlY3RlZENsZWFyLmVtaXQodHJ1ZSk7XG4gIH1cblxuICBjbGVhckFsbCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlLnJlc2V0KCk7XG4gICAgdGhpcy5hbGxDbGVhci5lbWl0KHRydWUpO1xuICAgIHRoaXMuc2VsZWN0ZWRDbGVhci5lbWl0KHRydWUpO1xuICAgIHRoaXMuc29ydENsZWFyLmVtaXQodHJ1ZSk7XG4gICAgdGhpcy5maWx0ZXJDbGVhci5lbWl0KHRydWUpO1xuICAgIHRoaXMucXVlcnlDbGVhci5lbWl0KHRydWUpO1xuICB9XG59XG4iXX0=
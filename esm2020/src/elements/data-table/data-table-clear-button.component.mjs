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
NovoDataTableClearButton.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDataTableClearButton, deps: [{ token: i1.DataTableState }, { token: i0.ChangeDetectorRef }, { token: i2.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component });
NovoDataTableClearButton.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDataTableClearButton, selector: "novo-data-table-clear-button", outputs: { selectedClear: "selectedClear", sortClear: "sortClear", filterClear: "filterClear", allClear: "allClear" }, ngImport: i0, template: `
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
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i1.DataTableState }, { type: i0.ChangeDetectorRef }, { type: i2.NovoLabelService }]; }, propDecorators: { selectedClear: [{
                type: Output
            }], sortClear: [{
                type: Output
            }], filterClear: [{
                type: Output
            }], allClear: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1jbGVhci1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvZGF0YS10YWJsZS9kYXRhLXRhYmxlLWNsZWFyLWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVHLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQzs7Ozs7Ozs7QUE4QmxFLE1BQU0sT0FBTyx3QkFBd0I7SUFVbkMsWUFBbUIsS0FBd0IsRUFBVSxHQUFzQixFQUFTLE1BQXdCO1FBQXpGLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQVI1RyxrQkFBYSxHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTFELGNBQVMsR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV0RCxnQkFBVyxHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXhELGFBQVEsR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUUwRCxDQUFDO0lBRWhILFNBQVM7UUFDUCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsYUFBYTtRQUNYLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7O3NIQWpDVSx3QkFBd0I7MEdBQXhCLHdCQUF3QiwyTEExQnpCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCVDs0RkFHVSx3QkFBd0I7a0JBNUJwQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSw4QkFBOEI7b0JBQ3hDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1QlQ7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEO29LQUdDLGFBQWE7c0JBRFosTUFBTTtnQkFHUCxTQUFTO3NCQURSLE1BQU07Z0JBR1AsV0FBVztzQkFEVixNQUFNO2dCQUdQLFFBQVE7c0JBRFAsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhVGFibGVTdGF0ZSB9IGZyb20gJy4vc3RhdGUvZGF0YS10YWJsZS1zdGF0ZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1kYXRhLXRhYmxlLWNsZWFyLWJ1dHRvbicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5vdm8tZHJvcGRvd24gc2lkZT1cImJvdHRvbS1yaWdodFwiIGNsYXNzPVwibm92by1kYXRhLXRhYmxlLWNsZWFyLWJ1dHRvblwiIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tZGF0YS10YWJsZS1jbGVhci1kcm9wZG93blwiPlxuICAgICAgPG5vdm8tYnV0dG9uIHR5cGU9XCJidXR0b25cIiB0aGVtZT1cInByaW1hcnlcIiBjb2xvcj1cIm5lZ2F0aXZlXCIgaWNvbj1cImNvbGxhcHNlXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by1kYXRhLXRhYmxlLWNsZWFyLWRyb3Bkb3duLWJ0blwiPlxuICAgICAgICB7eyBsYWJlbHMuY2xlYXIgfX1cbiAgICAgIDwvbm92by1idXR0b24+XG4gICAgICA8bGlzdD5cbiAgICAgICAgPGl0ZW1cbiAgICAgICAgICAqbmdJZj1cInN0YXRlLnNlbGVjdGVkLmxlbmd0aCA+IDBcIlxuICAgICAgICAgIChjbGljayk9XCJjbGVhclNlbGVjdGVkKClcIlxuICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tZGF0YS10YWJsZS1jbGVhci1kcm9wZG93bi1jbGVhci1zZWxlY3RlZFwiXG4gICAgICAgICAgPnt7IGxhYmVscy5jbGVhclNlbGVjdGVkIH19PC9pdGVtXG4gICAgICAgID5cbiAgICAgICAgPGl0ZW0gKm5nSWY9XCJzdGF0ZS5zb3J0XCIgKGNsaWNrKT1cImNsZWFyU29ydCgpXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by1kYXRhLXRhYmxlLWNsZWFyLWRyb3Bkb3duLWNsZWFyLXNvcnRcIj57e1xuICAgICAgICAgIGxhYmVscy5jbGVhclNvcnRcbiAgICAgICAgfX08L2l0ZW0+XG4gICAgICAgIDxpdGVtICpuZ0lmPVwic3RhdGUuZmlsdGVyXCIgKGNsaWNrKT1cImNsZWFyRmlsdGVyKClcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLWRhdGEtdGFibGUtY2xlYXItZHJvcGRvd24tY2xlYXItZmlsdGVyXCI+e3tcbiAgICAgICAgICBsYWJlbHMuY2xlYXJGaWx0ZXJcbiAgICAgICAgfX08L2l0ZW0+XG4gICAgICAgIDxpdGVtICpuZ0lmPVwic3RhdGUuc29ydCAmJiBzdGF0ZS5maWx0ZXJcIiAoY2xpY2spPVwiY2xlYXJBbGwoKVwiIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tZGF0YS10YWJsZS1jbGVhci1kcm9wZG93bi1jbGVhci1hbGxcIj57e1xuICAgICAgICAgIGxhYmVscy5jbGVhckFsbE5vcm1hbENhc2VcbiAgICAgICAgfX08L2l0ZW0+XG4gICAgICA8L2xpc3Q+XG4gICAgPC9ub3ZvLWRyb3Bkb3duPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0RhdGFUYWJsZUNsZWFyQnV0dG9uPFQ+IHtcbiAgQE91dHB1dCgpXG4gIHNlbGVjdGVkQ2xlYXI6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIHNvcnRDbGVhcjogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgZmlsdGVyQ2xlYXI6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIGFsbENsZWFyOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHN0YXRlOiBEYXRhVGFibGVTdGF0ZTxUPiwgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmLCBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlKSB7fVxuXG4gIGNsZWFyU29ydCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlLmNsZWFyU29ydCgpO1xuICAgIHRoaXMuc29ydENsZWFyLmVtaXQodHJ1ZSk7XG4gIH1cblxuICBjbGVhckZpbHRlcigpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlLmNsZWFyRmlsdGVyKCk7XG4gICAgdGhpcy5maWx0ZXJDbGVhci5lbWl0KHRydWUpO1xuICB9XG5cbiAgY2xlYXJTZWxlY3RlZCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlLmNsZWFyU2VsZWN0ZWQoKTtcbiAgICB0aGlzLnNlbGVjdGVkQ2xlYXIuZW1pdCh0cnVlKTtcbiAgfVxuXG4gIGNsZWFyQWxsKCk6IHZvaWQge1xuICAgIHRoaXMuc3RhdGUucmVzZXQoKTtcbiAgICB0aGlzLmFsbENsZWFyLmVtaXQodHJ1ZSk7XG4gICAgdGhpcy5zZWxlY3RlZENsZWFyLmVtaXQodHJ1ZSk7XG4gICAgdGhpcy5zb3J0Q2xlYXIuZW1pdCh0cnVlKTtcbiAgICB0aGlzLmZpbHRlckNsZWFyLmVtaXQodHJ1ZSk7XG4gIH1cbn1cbiJdfQ==
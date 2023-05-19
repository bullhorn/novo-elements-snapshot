import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { NovoLabelService } from '../../../services/novo-label-service';
import { Helpers } from '../../../utils';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/novo-label-service";
import * as i2 from "../../common/typography/label/label.component";
import * as i3 from "../../button/Button";
import * as i4 from "@angular/common";
import * as i5 from "../../common/directives/theme.directive";
export class NovoDataTableCellFilterHeader {
    constructor(changeDetectorRef, labels) {
        this.changeDetectorRef = changeDetectorRef;
        this.labels = labels;
        this.hasFilter = false;
        this.clearFilter = new EventEmitter();
    }
    set filter(filter) {
        this._filter = filter;
        this.hasFilter = !Helpers.isEmpty(filter);
    }
    get filter() {
        return this._filter;
    }
}
NovoDataTableCellFilterHeader.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDataTableCellFilterHeader, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component });
NovoDataTableCellFilterHeader.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDataTableCellFilterHeader, selector: "novo-data-table-cell-filter-header", inputs: { label: "label", filter: "filter" }, outputs: { clearFilter: "clearFilter" }, ngImport: i0, template: `
    <div class="header">
      <novo-label>{{ label || labels.filters }}</novo-label>
      <novo-button
        theme="dialogue"
        color="negative"
        size="small"
        icon="times"
        (click)="clearFilter.emit()"
        *ngIf="hasFilter"
        data-automation-id="novo-data-table-filter-clear">
        {{ labels.clear }}
      </novo-button>
    </div>
  `, isInline: true, components: [{ type: i2.NovoLabel, selector: "novo-label,[novo-label]" }, { type: i3.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDataTableCellFilterHeader, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-data-table-cell-filter-header',
                    template: `
    <div class="header">
      <novo-label>{{ label || labels.filters }}</novo-label>
      <novo-button
        theme="dialogue"
        color="negative"
        size="small"
        icon="times"
        (click)="clearFilter.emit()"
        *ngIf="hasFilter"
        data-automation-id="novo-data-table-filter-clear">
        {{ labels.clear }}
      </novo-button>
    </div>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.NovoLabelService }]; }, propDecorators: { label: [{
                type: Input
            }], filter: [{
                type: Input
            }], clearFilter: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1oZWFkZXItY2VsbC1maWx0ZXItaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2RhdGEtdGFibGUvY2VsbC1oZWFkZXJzL2RhdGEtdGFibGUtaGVhZGVyLWNlbGwtZmlsdGVyLWhlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuSCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7QUFxQnpDLE1BQU0sT0FBTyw2QkFBNkI7SUFpQnhDLFlBQW1CLGlCQUFvQyxFQUFTLE1BQXdCO1FBQXJFLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUpqRixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRWYsZ0JBQVcsR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztJQUVzQixDQUFDO0lBZDVGLElBQ0ksTUFBTSxDQUFDLE1BQVc7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUNELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDOzsySEFWVSw2QkFBNkI7K0dBQTdCLDZCQUE2QixpS0FqQjlCOzs7Ozs7Ozs7Ozs7OztHQWNUOzRGQUdVLDZCQUE2QjtrQkFuQnpDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG9DQUFvQztvQkFDOUMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7OztHQWNUO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDt1SUFFVSxLQUFLO3NCQUFiLEtBQUs7Z0JBR0YsTUFBTTtzQkFEVCxLQUFLO2dCQVlJLFdBQVc7c0JBQXBCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvbm92by1sYWJlbC1zZXJ2aWNlJztcbmltcG9ydCB7IEhlbHBlcnMgfSBmcm9tICcuLi8uLi8uLi91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tZGF0YS10YWJsZS1jZWxsLWZpbHRlci1oZWFkZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJoZWFkZXJcIj5cbiAgICAgIDxub3ZvLWxhYmVsPnt7IGxhYmVsIHx8IGxhYmVscy5maWx0ZXJzIH19PC9ub3ZvLWxhYmVsPlxuICAgICAgPG5vdm8tYnV0dG9uXG4gICAgICAgIHRoZW1lPVwiZGlhbG9ndWVcIlxuICAgICAgICBjb2xvcj1cIm5lZ2F0aXZlXCJcbiAgICAgICAgc2l6ZT1cInNtYWxsXCJcbiAgICAgICAgaWNvbj1cInRpbWVzXCJcbiAgICAgICAgKGNsaWNrKT1cImNsZWFyRmlsdGVyLmVtaXQoKVwiXG4gICAgICAgICpuZ0lmPVwiaGFzRmlsdGVyXCJcbiAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by1kYXRhLXRhYmxlLWZpbHRlci1jbGVhclwiPlxuICAgICAgICB7eyBsYWJlbHMuY2xlYXIgfX1cbiAgICAgIDwvbm92by1idXR0b24+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRGF0YVRhYmxlQ2VsbEZpbHRlckhlYWRlciB7XG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmcgfCBudW1iZXI7XG5cbiAgQElucHV0KClcbiAgc2V0IGZpbHRlcihmaWx0ZXI6IGFueSkge1xuICAgIHRoaXMuX2ZpbHRlciA9IGZpbHRlcjtcbiAgICB0aGlzLmhhc0ZpbHRlciA9ICFIZWxwZXJzLmlzRW1wdHkoZmlsdGVyKTtcbiAgfVxuICBnZXQgZmlsdGVyKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbHRlcjtcbiAgfVxuICBwcml2YXRlIF9maWx0ZXI6IGFueTtcblxuICBwdWJsaWMgaGFzRmlsdGVyID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIGNsZWFyRmlsdGVyOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSkge31cbn1cbiJdfQ==
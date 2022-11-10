import { CdkCell, CdkColumnDef } from '@angular/cdk/table';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Inject, Input, Renderer2, } from '@angular/core';
import { NOVO_DATA_TABLE_REF } from '../data-table.token';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/table";
import * as i2 from "novo-elements/components/tooltip";
export class NovoDataTableCheckboxCell extends CdkCell {
    constructor(columnDef, elementRef, renderer, dataTable, ref) {
        super(columnDef, elementRef);
        this.columnDef = columnDef;
        this.dataTable = dataTable;
        this.ref = ref;
        this.role = 'gridcell';
        this.maxSelected = undefined;
        this.checked = false;
        renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-checkbox-column-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, `novo-checkbox-column-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, 'novo-data-table-checkbox-cell');
        this.selectionSubscription = this.dataTable.state.selectionSource.subscribe(() => {
            this.checked = this.dataTable.isSelected(this.row) || (this.dataTable?.canSelectAll && this.dataTable?.allMatchingSelected);
            this.ref.markForCheck();
        });
        this.resetSubscription = this.dataTable.state.resetSource.subscribe(() => {
            this.checked = false;
            this.ref.markForCheck();
        });
    }
    get isAtLimit() {
        return this.maxSelected && this.dataTable.state.selectedRows.size >= this.maxSelected && !this.checked;
    }
    ngOnInit() {
        this.checked = this.dataTable.isSelected(this.row) || (this.dataTable?.canSelectAll && this.dataTable?.allMatchingSelected);
    }
    onClick() {
        if (!this.isAtLimit) {
            this.dataTable.selectRow(this.row, 'onClick');
        }
    }
    getTooltip() {
        return this.isAtLimit ? 'More than ' + this.maxSelected + ' items are not able to be selected at one time' : '';
    }
    ngOnDestroy() {
        if (this.selectionSubscription) {
            this.selectionSubscription.unsubscribe();
        }
        if (this.resetSubscription) {
            this.resetSubscription.unsubscribe();
        }
    }
}
NovoDataTableCheckboxCell.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDataTableCheckboxCell, deps: [{ token: i1.CdkColumnDef }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: NOVO_DATA_TABLE_REF }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NovoDataTableCheckboxCell.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDataTableCheckboxCell, selector: "novo-data-table-checkbox-cell", inputs: { row: "row", maxSelected: "maxSelected" }, host: { properties: { "attr.role": "this.role" } }, usesInheritance: true, ngImport: i0, template: `
    <div class="data-table-checkbox" (click)="onClick()" [tooltip]="getTooltip()" tooltipPosition="right">
      <input type="checkbox" [checked]="checked" hidden />
      <label>
        <i [class.bhi-checkbox-disabled]="isAtLimit" [class.bhi-checkbox-empty]="!checked" [class.bhi-checkbox-filled]="checked"></i>
      </label>
    </div>
  `, isInline: true, directives: [{ type: i2.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipActive", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDataTableCheckboxCell, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-data-table-checkbox-cell',
                    template: `
    <div class="data-table-checkbox" (click)="onClick()" [tooltip]="getTooltip()" tooltipPosition="right">
      <input type="checkbox" [checked]="checked" hidden />
      <label>
        <i [class.bhi-checkbox-disabled]="isAtLimit" [class.bhi-checkbox-empty]="!checked" [class.bhi-checkbox-filled]="checked"></i>
      </label>
    </div>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i1.CdkColumnDef }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [NOVO_DATA_TABLE_REF]
                }] }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { role: [{
                type: HostBinding,
                args: ['attr.role']
            }], row: [{
                type: Input
            }], maxSelected: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1jaGVja2JveC1jZWxsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvZGF0YS10YWJsZS9jZWxscy9kYXRhLXRhYmxlLWNoZWNrYm94LWNlbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDM0QsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixXQUFXLEVBQ1gsTUFBTSxFQUNOLEtBQUssRUFHTCxTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFvQixtQkFBbUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7O0FBYzVFLE1BQU0sT0FBTyx5QkFBNkIsU0FBUSxPQUFPO0lBa0J2RCxZQUNTLFNBQXVCLEVBQzlCLFVBQXNCLEVBQ3RCLFFBQW1CLEVBQ2tCLFNBQTJCLEVBQ3hELEdBQXNCO1FBRTlCLEtBQUssQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFOdEIsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUdPLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQ3hELFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBckJ6QixTQUFJLEdBQUcsVUFBVSxDQUFDO1FBS2xCLGdCQUFXLEdBQVcsU0FBUyxDQUFDO1FBRWhDLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFpQjlCLFFBQVEsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxvQkFBb0IsRUFBRSx3QkFBd0IsU0FBUyxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztRQUNoSSxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsd0JBQXdCLFNBQVMsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7UUFDdEcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLCtCQUErQixDQUFDLENBQUM7UUFFN0UsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQy9FLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxZQUFZLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1lBQzVILElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDdkUsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUF4QkQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDekcsQ0FBQztJQXdCTSxRQUFRO1FBQ2IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFlBQVksSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLG1CQUFtQixDQUFDLENBQUM7SUFDOUgsQ0FBQztJQUVNLE9BQU87UUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQy9DO0lBQ0gsQ0FBQztJQUVNLFVBQVU7UUFDZixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLGdEQUFnRCxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDbEgsQ0FBQztJQUVNLFdBQVc7UUFDaEIsSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDOUIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQzFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RDO0lBQ0gsQ0FBQzs7dUhBN0RVLHlCQUF5QixpR0FzQjFCLG1CQUFtQjsyR0F0QmxCLHlCQUF5QixvTUFWMUI7Ozs7Ozs7R0FPVDs0RkFHVSx5QkFBeUI7a0JBWnJDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLCtCQUErQjtvQkFDekMsUUFBUSxFQUFFOzs7Ozs7O0dBT1Q7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzswQkF1QkksTUFBTTsyQkFBQyxtQkFBbUI7NEVBcEJ0QixJQUFJO3NCQURWLFdBQVc7dUJBQUMsV0FBVztnQkFJakIsR0FBRztzQkFEVCxLQUFLO2dCQUdDLFdBQVc7c0JBRGpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZGtDZWxsLCBDZGtDb2x1bW5EZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgUmVuZGVyZXIyLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTm92b0RhdGFUYWJsZVJlZiwgTk9WT19EQVRBX1RBQkxFX1JFRiB9IGZyb20gJy4uL2RhdGEtdGFibGUudG9rZW4nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWRhdGEtdGFibGUtY2hlY2tib3gtY2VsbCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImRhdGEtdGFibGUtY2hlY2tib3hcIiAoY2xpY2spPVwib25DbGljaygpXCIgW3Rvb2x0aXBdPVwiZ2V0VG9vbHRpcCgpXCIgdG9vbHRpcFBvc2l0aW9uPVwicmlnaHRcIj5cbiAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBbY2hlY2tlZF09XCJjaGVja2VkXCIgaGlkZGVuIC8+XG4gICAgICA8bGFiZWw+XG4gICAgICAgIDxpIFtjbGFzcy5iaGktY2hlY2tib3gtZGlzYWJsZWRdPVwiaXNBdExpbWl0XCIgW2NsYXNzLmJoaS1jaGVja2JveC1lbXB0eV09XCIhY2hlY2tlZFwiIFtjbGFzcy5iaGktY2hlY2tib3gtZmlsbGVkXT1cImNoZWNrZWRcIj48L2k+XG4gICAgICA8L2xhYmVsPlxuICAgIDwvZGl2PlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0RhdGFUYWJsZUNoZWNrYm94Q2VsbDxUPiBleHRlbmRzIENka0NlbGwgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBIb3N0QmluZGluZygnYXR0ci5yb2xlJylcbiAgcHVibGljIHJvbGUgPSAnZ3JpZGNlbGwnO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyByb3c6IFQ7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBtYXhTZWxlY3RlZDogbnVtYmVyID0gdW5kZWZpbmVkO1xuXG4gIHB1YmxpYyBjaGVja2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBzZWxlY3Rpb25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSByZXNldFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGdldCBpc0F0TGltaXQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubWF4U2VsZWN0ZWQgJiYgdGhpcy5kYXRhVGFibGUuc3RhdGUuc2VsZWN0ZWRSb3dzLnNpemUgPj0gdGhpcy5tYXhTZWxlY3RlZCAmJiAhdGhpcy5jaGVja2VkO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGNvbHVtbkRlZjogQ2RrQ29sdW1uRGVmLFxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBASW5qZWN0KE5PVk9fREFUQV9UQUJMRV9SRUYpIHByaXZhdGUgZGF0YVRhYmxlOiBOb3ZvRGF0YVRhYmxlUmVmLFxuICAgIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgKSB7XG4gICAgc3VwZXIoY29sdW1uRGVmLCBlbGVtZW50UmVmKTtcbiAgICByZW5kZXJlci5zZXRBdHRyaWJ1dGUoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnZGF0YS1hdXRvbWF0aW9uLWlkJywgYG5vdm8tY2hlY2tib3gtY29sdW1uLSR7Y29sdW1uRGVmLmNzc0NsYXNzRnJpZW5kbHlOYW1lfWApO1xuICAgIHJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgYG5vdm8tY2hlY2tib3gtY29sdW1uLSR7Y29sdW1uRGVmLmNzc0NsYXNzRnJpZW5kbHlOYW1lfWApO1xuICAgIHJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ25vdm8tZGF0YS10YWJsZS1jaGVja2JveC1jZWxsJyk7XG5cbiAgICB0aGlzLnNlbGVjdGlvblN1YnNjcmlwdGlvbiA9IHRoaXMuZGF0YVRhYmxlLnN0YXRlLnNlbGVjdGlvblNvdXJjZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5jaGVja2VkID0gdGhpcy5kYXRhVGFibGUuaXNTZWxlY3RlZCh0aGlzLnJvdykgfHwgKHRoaXMuZGF0YVRhYmxlPy5jYW5TZWxlY3RBbGwgJiYgdGhpcy5kYXRhVGFibGU/LmFsbE1hdGNoaW5nU2VsZWN0ZWQpO1xuICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gICAgdGhpcy5yZXNldFN1YnNjcmlwdGlvbiA9IHRoaXMuZGF0YVRhYmxlLnN0YXRlLnJlc2V0U291cmNlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tlZCA9IHRoaXMuZGF0YVRhYmxlLmlzU2VsZWN0ZWQodGhpcy5yb3cpIHx8ICh0aGlzLmRhdGFUYWJsZT8uY2FuU2VsZWN0QWxsICYmIHRoaXMuZGF0YVRhYmxlPy5hbGxNYXRjaGluZ1NlbGVjdGVkKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkNsaWNrKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pc0F0TGltaXQpIHtcbiAgICAgIHRoaXMuZGF0YVRhYmxlLnNlbGVjdFJvdyh0aGlzLnJvdywgJ29uQ2xpY2snKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0VG9vbHRpcCgpIHtcbiAgICByZXR1cm4gdGhpcy5pc0F0TGltaXQgPyAnTW9yZSB0aGFuICcgKyB0aGlzLm1heFNlbGVjdGVkICsgJyBpdGVtcyBhcmUgbm90IGFibGUgdG8gYmUgc2VsZWN0ZWQgYXQgb25lIHRpbWUnIDogJyc7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc2VsZWN0aW9uU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnNlbGVjdGlvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5yZXNldFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5yZXNldFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxufVxuIl19
import { CdkCell, CdkColumnDef } from '@angular/cdk/table';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Input, Renderer2, } from '@angular/core';
import { NovoDataTable } from '../data-table.component';
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
            this.checked = this.dataTable.isSelected(this.row);
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
        this.checked = this.dataTable.isSelected(this.row);
    }
    onClick() {
        if (!this.isAtLimit) {
            this.dataTable.selectRow(this.row);
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
NovoDataTableCheckboxCell.decorators = [
    { type: Component, args: [{
                selector: 'novo-data-table-checkbox-cell',
                template: `
    <div class="data-table-checkbox" (click)="onClick()" [tooltip]="getTooltip()" tooltipPosition="right">
      <input type="checkbox" [checked]="checked" />
      <label>
        <i [class.bhi-checkbox-disabled]="isAtLimit" [class.bhi-checkbox-empty]="!checked" [class.bhi-checkbox-filled]="checked"></i>
      </label>
    </div>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
NovoDataTableCheckboxCell.ctorParameters = () => [
    { type: CdkColumnDef },
    { type: ElementRef },
    { type: Renderer2 },
    { type: NovoDataTable },
    { type: ChangeDetectorRef }
];
NovoDataTableCheckboxCell.propDecorators = {
    role: [{ type: HostBinding, args: ['attr.role',] }],
    row: [{ type: Input }],
    maxSelected: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1jaGVja2JveC1jZWxsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9kYXRhLXRhYmxlL2NlbGxzL2RhdGEtdGFibGUtY2hlY2tib3gtY2VsbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMzRCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFdBQVcsRUFDWCxLQUFLLEVBR0wsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQWN4RCxNQUFNLE9BQU8seUJBQTZCLFNBQVEsT0FBTztJQWtCdkQsWUFDUyxTQUF1QixFQUM5QixVQUFzQixFQUN0QixRQUFtQixFQUNaLFNBQTJCLEVBQzFCLEdBQXNCO1FBRTlCLEtBQUssQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFOdEIsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUd2QixjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUMxQixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQXJCekIsU0FBSSxHQUFHLFVBQVUsQ0FBQztRQUtsQixnQkFBVyxHQUFXLFNBQVMsQ0FBQztRQUVoQyxZQUFPLEdBQVksS0FBSyxDQUFDO1FBaUI5QixRQUFRLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsb0JBQW9CLEVBQUUsd0JBQXdCLFNBQVMsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7UUFDaEksUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLHdCQUF3QixTQUFTLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO1FBQ3RHLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSwrQkFBK0IsQ0FBQyxDQUFDO1FBRTdFLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUMvRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ3ZFLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBeEJELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3pHLENBQUM7SUF3Qk0sUUFBUTtRQUNiLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3BDO0lBQ0gsQ0FBQztJQUVNLFVBQVU7UUFDZixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLGdEQUFnRCxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDbEgsQ0FBQztJQUVNLFdBQVc7UUFDaEIsSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDOUIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQzFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RDO0lBQ0gsQ0FBQzs7O1lBekVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsK0JBQStCO2dCQUN6QyxRQUFRLEVBQUU7Ozs7Ozs7R0FPVDtnQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7O1lBMUJpQixZQUFZO1lBSzVCLFVBQVU7WUFLVixTQUFTO1lBR0YsYUFBYTtZQVZwQixpQkFBaUI7OzttQkF5QmhCLFdBQVcsU0FBQyxXQUFXO2tCQUd2QixLQUFLOzBCQUVMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZGtDZWxsLCBDZGtDb2x1bW5EZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFJlbmRlcmVyMixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE5vdm9EYXRhVGFibGUgfSBmcm9tICcuLi9kYXRhLXRhYmxlLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tZGF0YS10YWJsZS1jaGVja2JveC1jZWxsJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiZGF0YS10YWJsZS1jaGVja2JveFwiIChjbGljayk9XCJvbkNsaWNrKClcIiBbdG9vbHRpcF09XCJnZXRUb29sdGlwKClcIiB0b29sdGlwUG9zaXRpb249XCJyaWdodFwiPlxuICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIFtjaGVja2VkXT1cImNoZWNrZWRcIiAvPlxuICAgICAgPGxhYmVsPlxuICAgICAgICA8aSBbY2xhc3MuYmhpLWNoZWNrYm94LWRpc2FibGVkXT1cImlzQXRMaW1pdFwiIFtjbGFzcy5iaGktY2hlY2tib3gtZW1wdHldPVwiIWNoZWNrZWRcIiBbY2xhc3MuYmhpLWNoZWNrYm94LWZpbGxlZF09XCJjaGVja2VkXCI+PC9pPlxuICAgICAgPC9sYWJlbD5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9EYXRhVGFibGVDaGVja2JveENlbGw8VD4gZXh0ZW5kcyBDZGtDZWxsIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASG9zdEJpbmRpbmcoJ2F0dHIucm9sZScpXG4gIHB1YmxpYyByb2xlID0gJ2dyaWRjZWxsJztcblxuICBASW5wdXQoKVxuICBwdWJsaWMgcm93OiBUO1xuICBASW5wdXQoKVxuICBwdWJsaWMgbWF4U2VsZWN0ZWQ6IG51bWJlciA9IHVuZGVmaW5lZDtcblxuICBwdWJsaWMgY2hlY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgc2VsZWN0aW9uU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgcmVzZXRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBnZXQgaXNBdExpbWl0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm1heFNlbGVjdGVkICYmIHRoaXMuZGF0YVRhYmxlLnN0YXRlLnNlbGVjdGVkUm93cy5zaXplID49IHRoaXMubWF4U2VsZWN0ZWQgJiYgIXRoaXMuY2hlY2tlZDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBjb2x1bW5EZWY6IENka0NvbHVtbkRlZixcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHVibGljIGRhdGFUYWJsZTogTm92b0RhdGFUYWJsZTxUPixcbiAgICBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICkge1xuICAgIHN1cGVyKGNvbHVtbkRlZiwgZWxlbWVudFJlZik7XG4gICAgcmVuZGVyZXIuc2V0QXR0cmlidXRlKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2RhdGEtYXV0b21hdGlvbi1pZCcsIGBub3ZvLWNoZWNrYm94LWNvbHVtbi0ke2NvbHVtbkRlZi5jc3NDbGFzc0ZyaWVuZGx5TmFtZX1gKTtcbiAgICByZW5kZXJlci5hZGRDbGFzcyhlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIGBub3ZvLWNoZWNrYm94LWNvbHVtbi0ke2NvbHVtbkRlZi5jc3NDbGFzc0ZyaWVuZGx5TmFtZX1gKTtcbiAgICByZW5kZXJlci5hZGRDbGFzcyhlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdub3ZvLWRhdGEtdGFibGUtY2hlY2tib3gtY2VsbCcpO1xuXG4gICAgdGhpcy5zZWxlY3Rpb25TdWJzY3JpcHRpb24gPSB0aGlzLmRhdGFUYWJsZS5zdGF0ZS5zZWxlY3Rpb25Tb3VyY2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuY2hlY2tlZCA9IHRoaXMuZGF0YVRhYmxlLmlzU2VsZWN0ZWQodGhpcy5yb3cpO1xuICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gICAgdGhpcy5yZXNldFN1YnNjcmlwdGlvbiA9IHRoaXMuZGF0YVRhYmxlLnN0YXRlLnJlc2V0U291cmNlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tlZCA9IHRoaXMuZGF0YVRhYmxlLmlzU2VsZWN0ZWQodGhpcy5yb3cpO1xuICB9XG5cbiAgcHVibGljIG9uQ2xpY2soKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzQXRMaW1pdCkge1xuICAgICAgdGhpcy5kYXRhVGFibGUuc2VsZWN0Um93KHRoaXMucm93KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0VG9vbHRpcCgpIHtcbiAgICByZXR1cm4gdGhpcy5pc0F0TGltaXQgPyAnTW9yZSB0aGFuICcgKyB0aGlzLm1heFNlbGVjdGVkICsgJyBpdGVtcyBhcmUgbm90IGFibGUgdG8gYmUgc2VsZWN0ZWQgYXQgb25lIHRpbWUnIDogJyc7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc2VsZWN0aW9uU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnNlbGVjdGlvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5yZXNldFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5yZXNldFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxufVxuIl19
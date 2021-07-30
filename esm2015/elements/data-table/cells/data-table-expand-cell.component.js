import { CdkCell, CdkColumnDef } from '@angular/cdk/table';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';
import { NovoDataTable } from '../data-table.component';
export class NovoDataTableExpandCell extends CdkCell {
    constructor(columnDef, elementRef, renderer, dataTable, ref) {
        super(columnDef, elementRef);
        this.columnDef = columnDef;
        this.dataTable = dataTable;
        this.ref = ref;
        this.role = 'gridcell';
        this.expanded = false;
        renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-expand-column-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, `novo-expand-column-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, 'novo-data-table-expand-cell');
        this.expandSubscription = this.dataTable.state.expandSource.subscribe(() => {
            this.expanded = this.dataTable.isExpanded(this.row);
            this.ref.markForCheck();
        });
    }
    ngOnInit() {
        this.expanded = this.dataTable.isExpanded(this.row);
    }
    onClick() {
        this.dataTable.expandRow(this.row);
    }
    ngOnDestroy() {
        if (this.expandSubscription) {
            this.expandSubscription.unsubscribe();
        }
    }
}
NovoDataTableExpandCell.decorators = [
    { type: Component, args: [{
                selector: 'novo-data-table-expand-cell',
                template: `
    <i class="bhi-next data-table-icon" novo-data-table-expander="true" [class.expanded]="expanded"></i>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
NovoDataTableExpandCell.ctorParameters = () => [
    { type: CdkColumnDef },
    { type: ElementRef },
    { type: Renderer2 },
    { type: NovoDataTable },
    { type: ChangeDetectorRef }
];
NovoDataTableExpandCell.propDecorators = {
    role: [{ type: HostBinding, args: ['attr.role',] }],
    row: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1leHBhbmQtY2VsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2RhdGEtdGFibGUvY2VsbHMvZGF0YS10YWJsZS1leHBhbmQtY2VsbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFxQixTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFcEosT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBVXhELE1BQU0sT0FBTyx1QkFBMkIsU0FBUSxPQUFPO0lBV3JELFlBQ1MsU0FBdUIsRUFDOUIsVUFBc0IsRUFDdEIsUUFBbUIsRUFDWixTQUEyQixFQUMxQixHQUFzQjtRQUU5QixLQUFLLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBTnRCLGNBQVMsR0FBVCxTQUFTLENBQWM7UUFHdkIsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFDMUIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFkekIsU0FBSSxHQUFHLFVBQVUsQ0FBQztRQUtsQixhQUFRLEdBQVksS0FBSyxDQUFDO1FBWS9CLFFBQVEsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxvQkFBb0IsRUFBRSxzQkFBc0IsU0FBUyxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztRQUM5SCxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsc0JBQXNCLFNBQVMsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7UUFDcEcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLDZCQUE2QixDQUFDLENBQUM7UUFFM0UsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ3pFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sUUFBUTtRQUNiLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFTSxXQUFXO1FBQ2hCLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQzNCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN2QztJQUNILENBQUM7OztZQWhERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDZCQUE2QjtnQkFDdkMsUUFBUSxFQUFFOztHQUVUO2dCQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7WUFaaUIsWUFBWTtZQUNrQyxVQUFVO1lBQXlDLFNBQVM7WUFFbkgsYUFBYTtZQUZZLGlCQUFpQjs7O21CQWFoRCxXQUFXLFNBQUMsV0FBVztrQkFHdkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENka0NlbGwsIENka0NvbHVtbkRlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XHJcbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE5vdm9EYXRhVGFibGUgfSBmcm9tICcuLi9kYXRhLXRhYmxlLmNvbXBvbmVudCc7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLWRhdGEtdGFibGUtZXhwYW5kLWNlbGwnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8aSBjbGFzcz1cImJoaS1uZXh0IGRhdGEtdGFibGUtaWNvblwiIG5vdm8tZGF0YS10YWJsZS1leHBhbmRlcj1cInRydWVcIiBbY2xhc3MuZXhwYW5kZWRdPVwiZXhwYW5kZWRcIj48L2k+XHJcbiAgYCxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9EYXRhVGFibGVFeHBhbmRDZWxsPFQ+IGV4dGVuZHMgQ2RrQ2VsbCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBASG9zdEJpbmRpbmcoJ2F0dHIucm9sZScpXHJcbiAgcHVibGljIHJvbGUgPSAnZ3JpZGNlbGwnO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHB1YmxpYyByb3c6IFQ7XHJcblxyXG4gIHB1YmxpYyBleHBhbmRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBwcml2YXRlIGV4cGFuZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBjb2x1bW5EZWY6IENka0NvbHVtbkRlZixcclxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXHJcbiAgICByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgcHVibGljIGRhdGFUYWJsZTogTm92b0RhdGFUYWJsZTxUPixcclxuICAgIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICApIHtcclxuICAgIHN1cGVyKGNvbHVtbkRlZiwgZWxlbWVudFJlZik7XHJcbiAgICByZW5kZXJlci5zZXRBdHRyaWJ1dGUoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnZGF0YS1hdXRvbWF0aW9uLWlkJywgYG5vdm8tZXhwYW5kLWNvbHVtbi0ke2NvbHVtbkRlZi5jc3NDbGFzc0ZyaWVuZGx5TmFtZX1gKTtcclxuICAgIHJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgYG5vdm8tZXhwYW5kLWNvbHVtbi0ke2NvbHVtbkRlZi5jc3NDbGFzc0ZyaWVuZGx5TmFtZX1gKTtcclxuICAgIHJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ25vdm8tZGF0YS10YWJsZS1leHBhbmQtY2VsbCcpO1xyXG5cclxuICAgIHRoaXMuZXhwYW5kU3Vic2NyaXB0aW9uID0gdGhpcy5kYXRhVGFibGUuc3RhdGUuZXhwYW5kU291cmNlLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMuZXhwYW5kZWQgPSB0aGlzLmRhdGFUYWJsZS5pc0V4cGFuZGVkKHRoaXMucm93KTtcclxuICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuZXhwYW5kZWQgPSB0aGlzLmRhdGFUYWJsZS5pc0V4cGFuZGVkKHRoaXMucm93KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbkNsaWNrKCk6IHZvaWQge1xyXG4gICAgdGhpcy5kYXRhVGFibGUuZXhwYW5kUm93KHRoaXMucm93KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmV4cGFuZFN1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLmV4cGFuZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=
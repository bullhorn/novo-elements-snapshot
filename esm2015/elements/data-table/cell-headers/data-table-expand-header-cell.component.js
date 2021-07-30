import { CdkColumnDef, CdkHeaderCell } from '@angular/cdk/table';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Renderer2 } from '@angular/core';
import { NovoDataTable } from '../data-table.component';
export class NovoDataTableExpandHeaderCell extends CdkHeaderCell {
    constructor(columnDef, elementRef, renderer, dataTable, ref) {
        super(columnDef, elementRef);
        this.dataTable = dataTable;
        this.ref = ref;
        this.role = 'columnheader';
        this.expanded = false;
        renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-expand-column-header-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, `novo-expand-column-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, 'novo-data-table-expand-header-cell');
        this.expandSubscription = this.dataTable.state.expandSource.subscribe(() => {
            this.expanded = this.dataTable.allCurrentRowsExpanded();
            this.ref.markForCheck();
        });
    }
    ngOnDestroy() {
        if (this.expandSubscription) {
            this.expandSubscription.unsubscribe();
        }
    }
    expandAll() {
        this.dataTable.expandRows(!this.expanded);
    }
}
NovoDataTableExpandHeaderCell.decorators = [
    { type: Component, args: [{
                selector: 'novo-data-table-expand-header-cell',
                template: `
    <i class="bhi-next data-table-icon" novo-data-table-expander="true" (click)="expandAll()" [class.expanded]="expanded"></i>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
NovoDataTableExpandHeaderCell.ctorParameters = () => [
    { type: CdkColumnDef },
    { type: ElementRef },
    { type: Renderer2 },
    { type: NovoDataTable },
    { type: ChangeDetectorRef }
];
NovoDataTableExpandHeaderCell.propDecorators = {
    role: [{ type: HostBinding, args: ['attr.role',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1leHBhbmQtaGVhZGVyLWNlbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9kZXZtYWNoaW5lL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9kYXRhLXRhYmxlL2NlbGwtaGVhZGVycy9kYXRhLXRhYmxlLWV4cGFuZC1oZWFkZXItY2VsbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQWEsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXJJLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQVV4RCxNQUFNLE9BQU8sNkJBQWlDLFNBQVEsYUFBYTtJQU9qRSxZQUNFLFNBQXVCLEVBQ3ZCLFVBQXNCLEVBQ3RCLFFBQW1CLEVBQ1gsU0FBMkIsRUFDM0IsR0FBc0I7UUFFOUIsS0FBSyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUhyQixjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUMzQixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQVZ6QixTQUFJLEdBQUcsY0FBYyxDQUFDO1FBRXRCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFXL0IsUUFBUSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLG9CQUFvQixFQUFFLDZCQUE2QixTQUFTLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO1FBQ3JJLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxzQkFBc0IsU0FBUyxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztRQUNwRyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsb0NBQW9DLENBQUMsQ0FBQztRQUVsRixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDekUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFDeEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxXQUFXO1FBQ2hCLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQzNCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN2QztJQUNILENBQUM7SUFFTSxTQUFTO1FBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUMsQ0FBQzs7O1lBeENGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0NBQW9DO2dCQUM5QyxRQUFRLEVBQUU7O0dBRVQ7Z0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7OztZQVpRLFlBQVk7WUFDMkMsVUFBVTtZQUEwQixTQUFTO1lBRXBHLGFBQWE7WUFGWSxpQkFBaUI7OzttQkFhaEQsV0FBVyxTQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZGtDb2x1bW5EZWYsIENka0hlYWRlckNlbGwgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xyXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIE9uRGVzdHJveSwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBOb3ZvRGF0YVRhYmxlIH0gZnJvbSAnLi4vZGF0YS10YWJsZS5jb21wb25lbnQnO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbm92by1kYXRhLXRhYmxlLWV4cGFuZC1oZWFkZXItY2VsbCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxpIGNsYXNzPVwiYmhpLW5leHQgZGF0YS10YWJsZS1pY29uXCIgbm92by1kYXRhLXRhYmxlLWV4cGFuZGVyPVwidHJ1ZVwiIChjbGljayk9XCJleHBhbmRBbGwoKVwiIFtjbGFzcy5leHBhbmRlZF09XCJleHBhbmRlZFwiPjwvaT5cclxuICBgLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b0RhdGFUYWJsZUV4cGFuZEhlYWRlckNlbGw8VD4gZXh0ZW5kcyBDZGtIZWFkZXJDZWxsIGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICBASG9zdEJpbmRpbmcoJ2F0dHIucm9sZScpXHJcbiAgcHVibGljIHJvbGUgPSAnY29sdW1uaGVhZGVyJztcclxuXHJcbiAgcHVibGljIGV4cGFuZGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBleHBhbmRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBjb2x1bW5EZWY6IENka0NvbHVtbkRlZixcclxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXHJcbiAgICByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgcHJpdmF0ZSBkYXRhVGFibGU6IE5vdm9EYXRhVGFibGU8VD4sXHJcbiAgICBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgKSB7XHJcbiAgICBzdXBlcihjb2x1bW5EZWYsIGVsZW1lbnRSZWYpO1xyXG4gICAgcmVuZGVyZXIuc2V0QXR0cmlidXRlKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2RhdGEtYXV0b21hdGlvbi1pZCcsIGBub3ZvLWV4cGFuZC1jb2x1bW4taGVhZGVyLSR7Y29sdW1uRGVmLmNzc0NsYXNzRnJpZW5kbHlOYW1lfWApO1xyXG4gICAgcmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBgbm92by1leHBhbmQtY29sdW1uLSR7Y29sdW1uRGVmLmNzc0NsYXNzRnJpZW5kbHlOYW1lfWApO1xyXG4gICAgcmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbm92by1kYXRhLXRhYmxlLWV4cGFuZC1oZWFkZXItY2VsbCcpO1xyXG5cclxuICAgIHRoaXMuZXhwYW5kU3Vic2NyaXB0aW9uID0gdGhpcy5kYXRhVGFibGUuc3RhdGUuZXhwYW5kU291cmNlLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMuZXhwYW5kZWQgPSB0aGlzLmRhdGFUYWJsZS5hbGxDdXJyZW50Um93c0V4cGFuZGVkKCk7XHJcbiAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5leHBhbmRTdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5leHBhbmRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBleHBhbmRBbGwoKTogdm9pZCB7XHJcbiAgICB0aGlzLmRhdGFUYWJsZS5leHBhbmRSb3dzKCF0aGlzLmV4cGFuZGVkKTtcclxuICB9XHJcbn1cclxuIl19
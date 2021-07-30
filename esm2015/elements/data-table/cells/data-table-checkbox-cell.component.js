import { ElementRef, Input, Renderer2, HostBinding, Component, ChangeDetectorRef, ChangeDetectionStrategy, } from '@angular/core';
import { CdkCell, CdkColumnDef } from '@angular/cdk/table';
import { NovoDataTable } from '../data-table.component';
export class NovoDataTableCheckboxCell extends CdkCell {
    constructor(columnDef, elementRef, renderer, dataTable, ref) {
        super(columnDef, elementRef);
        this.columnDef = columnDef;
        this.dataTable = dataTable;
        this.ref = ref;
        this.role = 'gridcell';
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
    ngOnInit() {
        this.checked = this.dataTable.isSelected(this.row);
    }
    onClick() {
        this.dataTable.selectRow(this.row);
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
    <div class="data-table-checkbox" (click)="onClick()">
      <input type="checkbox" [checked]="checked">
      <label>
        <i [class.bhi-checkbox-empty]="!checked"
          [class.bhi-checkbox-filled]="checked"></i>
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
    row: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1jaGVja2JveC1jZWxsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvZGF0YS10YWJsZS9jZWxscy9kYXRhLXRhYmxlLWNoZWNrYm94LWNlbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxVQUFVLEVBQ1YsS0FBSyxFQUNMLFNBQVMsRUFDVCxXQUFXLEVBQ1gsU0FBUyxFQUdULGlCQUFpQixFQUNqQix1QkFBdUIsR0FDeEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUczRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFleEQsTUFBTSxPQUFPLHlCQUE2QixTQUFRLE9BQU87SUFZdkQsWUFDUyxTQUF1QixFQUM5QixVQUFzQixFQUN0QixRQUFtQixFQUNaLFNBQTJCLEVBQzFCLEdBQXNCO1FBRTlCLEtBQUssQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFOdEIsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUd2QixjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUMxQixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQWZ6QixTQUFJLEdBQUcsVUFBVSxDQUFDO1FBS2xCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFhOUIsUUFBUSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLG9CQUFvQixFQUFFLHdCQUF3QixTQUFTLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO1FBQ2hJLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSx3QkFBd0IsU0FBUyxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztRQUN0RyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsK0JBQStCLENBQUMsQ0FBQztRQUU3RSxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDL0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUN2RSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLFFBQVE7UUFDYixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRU0sT0FBTztRQUNaLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRU0sV0FBVztRQUNoQixJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUM5QixJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDMUM7UUFDRCxJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUMxQixJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEM7SUFDSCxDQUFDOzs7WUE5REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwrQkFBK0I7Z0JBQ3pDLFFBQVEsRUFBRTs7Ozs7Ozs7S0FRUDtnQkFDSCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7O1lBakJpQixZQUFZO1lBVjVCLFVBQVU7WUFFVixTQUFTO1lBV0YsYUFBYTtZQU5wQixpQkFBaUI7OzttQkFzQmhCLFdBQVcsU0FBQyxXQUFXO2tCQUd2QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBFbGVtZW50UmVmLFxyXG4gIElucHV0LFxyXG4gIFJlbmRlcmVyMixcclxuICBIb3N0QmluZGluZyxcclxuICBDb21wb25lbnQsXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ2RrQ2VsbCwgQ2RrQ29sdW1uRGVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBOb3ZvRGF0YVRhYmxlIH0gZnJvbSAnLi4vZGF0YS10YWJsZS5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLWRhdGEtdGFibGUtY2hlY2tib3gtY2VsbCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJkYXRhLXRhYmxlLWNoZWNrYm94XCIgKGNsaWNrKT1cIm9uQ2xpY2soKVwiPlxyXG4gICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgW2NoZWNrZWRdPVwiY2hlY2tlZFwiPlxyXG4gICAgICA8bGFiZWw+XHJcbiAgICAgICAgPGkgW2NsYXNzLmJoaS1jaGVja2JveC1lbXB0eV09XCIhY2hlY2tlZFwiXHJcbiAgICAgICAgICBbY2xhc3MuYmhpLWNoZWNrYm94LWZpbGxlZF09XCJjaGVja2VkXCI+PC9pPlxyXG4gICAgICA8L2xhYmVsPlxyXG4gICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b0RhdGFUYWJsZUNoZWNrYm94Q2VsbDxUPiBleHRlbmRzIENka0NlbGwgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnJvbGUnKVxyXG4gIHB1YmxpYyByb2xlID0gJ2dyaWRjZWxsJztcclxuXHJcbiAgQElucHV0KClcclxuICBwdWJsaWMgcm93OiBUO1xyXG5cclxuICBwdWJsaWMgY2hlY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBwcml2YXRlIHNlbGVjdGlvblN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgcmVzZXRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgY29sdW1uRGVmOiBDZGtDb2x1bW5EZWYsXHJcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxyXG4gICAgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgIHB1YmxpYyBkYXRhVGFibGU6IE5vdm9EYXRhVGFibGU8VD4sXHJcbiAgICBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgKSB7XHJcbiAgICBzdXBlcihjb2x1bW5EZWYsIGVsZW1lbnRSZWYpO1xyXG4gICAgcmVuZGVyZXIuc2V0QXR0cmlidXRlKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2RhdGEtYXV0b21hdGlvbi1pZCcsIGBub3ZvLWNoZWNrYm94LWNvbHVtbi0ke2NvbHVtbkRlZi5jc3NDbGFzc0ZyaWVuZGx5TmFtZX1gKTtcclxuICAgIHJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgYG5vdm8tY2hlY2tib3gtY29sdW1uLSR7Y29sdW1uRGVmLmNzc0NsYXNzRnJpZW5kbHlOYW1lfWApO1xyXG4gICAgcmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbm92by1kYXRhLXRhYmxlLWNoZWNrYm94LWNlbGwnKTtcclxuXHJcbiAgICB0aGlzLnNlbGVjdGlvblN1YnNjcmlwdGlvbiA9IHRoaXMuZGF0YVRhYmxlLnN0YXRlLnNlbGVjdGlvblNvdXJjZS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLmNoZWNrZWQgPSB0aGlzLmRhdGFUYWJsZS5pc1NlbGVjdGVkKHRoaXMucm93KTtcclxuICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMucmVzZXRTdWJzY3JpcHRpb24gPSB0aGlzLmRhdGFUYWJsZS5zdGF0ZS5yZXNldFNvdXJjZS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLmNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuY2hlY2tlZCA9IHRoaXMuZGF0YVRhYmxlLmlzU2VsZWN0ZWQodGhpcy5yb3cpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uQ2xpY2soKTogdm9pZCB7XHJcbiAgICB0aGlzLmRhdGFUYWJsZS5zZWxlY3RSb3codGhpcy5yb3cpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0aW9uU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0aW9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5yZXNldFN1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLnJlc2V0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==
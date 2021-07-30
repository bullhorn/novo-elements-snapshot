import { CdkColumnDef, CdkHeaderCell } from '@angular/cdk/table';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Renderer2 } from '@angular/core';
import { NovoDataTable } from '../data-table.component';
export class NovoDataTableCheckboxHeaderCell extends CdkHeaderCell {
    constructor(columnDef, elementRef, renderer, dataTable, ref) {
        super(columnDef, elementRef);
        this.dataTable = dataTable;
        this.ref = ref;
        this.role = 'columnheader';
        this.checked = false;
        renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-checkbox-column-header-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, `novo-checkbox-column-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, 'novo-data-table-checkbox-header-cell');
        this.selectionSubscription = this.dataTable.state.selectionSource.subscribe(() => {
            this.checked = this.dataTable.allCurrentRowsSelected();
            this.ref.markForCheck();
        });
        this.paginationSubscription = this.dataTable.state.paginationSource.subscribe((event) => {
            if (event.isPageSizeChange) {
                this.checked = false;
                this.dataTable.selectRows(false);
            }
            else {
                this.checked = this.dataTable.allCurrentRowsSelected();
            }
            this.ref.markForCheck();
        });
        this.resetSubscription = this.dataTable.state.resetSource.subscribe(() => {
            this.checked = false;
            this.ref.markForCheck();
        });
    }
    ngOnDestroy() {
        if (this.selectionSubscription) {
            this.selectionSubscription.unsubscribe();
        }
        if (this.paginationSubscription) {
            this.paginationSubscription.unsubscribe();
        }
        if (this.resetSubscription) {
            this.resetSubscription.unsubscribe();
        }
    }
    onClick() {
        this.dataTable.selectRows(!this.checked);
    }
}
NovoDataTableCheckboxHeaderCell.decorators = [
    { type: Component, args: [{
                selector: 'novo-data-table-checkbox-header-cell',
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
NovoDataTableCheckboxHeaderCell.ctorParameters = () => [
    { type: CdkColumnDef },
    { type: ElementRef },
    { type: Renderer2 },
    { type: NovoDataTable },
    { type: ChangeDetectorRef }
];
NovoDataTableCheckboxHeaderCell.propDecorators = {
    role: [{ type: HostBinding, args: ['attr.role',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1jaGVja2JveC1oZWFkZXItY2VsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2RhdGEtdGFibGUvY2VsbC1oZWFkZXJzL2RhdGEtdGFibGUtY2hlY2tib3gtaGVhZGVyLWNlbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDakUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFhLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVySSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFnQnhELE1BQU0sT0FBTywrQkFBbUMsU0FBUSxhQUFhO0lBU25FLFlBQ0UsU0FBdUIsRUFDdkIsVUFBc0IsRUFDdEIsUUFBbUIsRUFDWCxTQUEyQixFQUMzQixHQUFzQjtRQUU5QixLQUFLLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBSHJCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQzNCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBWnpCLFNBQUksR0FBRyxjQUFjLENBQUM7UUFFdEIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQWE5QixRQUFRLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsb0JBQW9CLEVBQUUsK0JBQStCLFNBQVMsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7UUFDdkksUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLHdCQUF3QixTQUFTLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO1FBQ3RHLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxzQ0FBc0MsQ0FBQyxDQUFDO1FBRXBGLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUMvRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztZQUN2RCxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQW9DLEVBQUUsRUFBRTtZQUNySCxJQUFJLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2xDO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO2FBQ3hEO1lBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUN2RSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLFdBQVc7UUFDaEIsSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDOUIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQzFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsc0JBQXNCLEVBQUU7WUFDL0IsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQzNDO1FBQ0QsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RDO0lBQ0gsQ0FBQztJQUVNLE9BQU87UUFDWixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMzQyxDQUFDOzs7WUFuRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQ0FBc0M7Z0JBQ2hELFFBQVEsRUFBRTs7Ozs7Ozs7R0FRVDtnQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7O1lBbEJRLFlBQVk7WUFDMkMsVUFBVTtZQUEwQixTQUFTO1lBRXBHLGFBQWE7WUFGWSxpQkFBaUI7OzttQkFtQmhELFdBQVcsU0FBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2RrQ29sdW1uRGVmLCBDZGtIZWFkZXJDZWxsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcclxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBPbkRlc3Ryb3ksIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgTm92b0RhdGFUYWJsZSB9IGZyb20gJy4uL2RhdGEtdGFibGUuY29tcG9uZW50JztcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25vdm8tZGF0YS10YWJsZS1jaGVja2JveC1oZWFkZXItY2VsbCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJkYXRhLXRhYmxlLWNoZWNrYm94XCIgKGNsaWNrKT1cIm9uQ2xpY2soKVwiPlxyXG4gICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgW2NoZWNrZWRdPVwiY2hlY2tlZFwiPlxyXG4gICAgICA8bGFiZWw+XHJcbiAgICAgICAgPGkgW2NsYXNzLmJoaS1jaGVja2JveC1lbXB0eV09XCIhY2hlY2tlZFwiXHJcbiAgICAgICAgICBbY2xhc3MuYmhpLWNoZWNrYm94LWZpbGxlZF09XCJjaGVja2VkXCI+PC9pPlxyXG4gICAgICA8L2xhYmVsPlxyXG4gICAgPC9kaXY+XHJcbiAgYCxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9EYXRhVGFibGVDaGVja2JveEhlYWRlckNlbGw8VD4gZXh0ZW5kcyBDZGtIZWFkZXJDZWxsIGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICBASG9zdEJpbmRpbmcoJ2F0dHIucm9sZScpXHJcbiAgcHVibGljIHJvbGUgPSAnY29sdW1uaGVhZGVyJztcclxuXHJcbiAgcHVibGljIGNoZWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwcml2YXRlIHNlbGVjdGlvblN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgcGFnaW5hdGlvblN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgcmVzZXRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBjb2x1bW5EZWY6IENka0NvbHVtbkRlZixcclxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXHJcbiAgICByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgcHJpdmF0ZSBkYXRhVGFibGU6IE5vdm9EYXRhVGFibGU8VD4sXHJcbiAgICBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgKSB7XHJcbiAgICBzdXBlcihjb2x1bW5EZWYsIGVsZW1lbnRSZWYpO1xyXG4gICAgcmVuZGVyZXIuc2V0QXR0cmlidXRlKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2RhdGEtYXV0b21hdGlvbi1pZCcsIGBub3ZvLWNoZWNrYm94LWNvbHVtbi1oZWFkZXItJHtjb2x1bW5EZWYuY3NzQ2xhc3NGcmllbmRseU5hbWV9YCk7XHJcbiAgICByZW5kZXJlci5hZGRDbGFzcyhlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIGBub3ZvLWNoZWNrYm94LWNvbHVtbi0ke2NvbHVtbkRlZi5jc3NDbGFzc0ZyaWVuZGx5TmFtZX1gKTtcclxuICAgIHJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ25vdm8tZGF0YS10YWJsZS1jaGVja2JveC1oZWFkZXItY2VsbCcpO1xyXG5cclxuICAgIHRoaXMuc2VsZWN0aW9uU3Vic2NyaXB0aW9uID0gdGhpcy5kYXRhVGFibGUuc3RhdGUuc2VsZWN0aW9uU291cmNlLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMuY2hlY2tlZCA9IHRoaXMuZGF0YVRhYmxlLmFsbEN1cnJlbnRSb3dzU2VsZWN0ZWQoKTtcclxuICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMucGFnaW5hdGlvblN1YnNjcmlwdGlvbiA9IHRoaXMuZGF0YVRhYmxlLnN0YXRlLnBhZ2luYXRpb25Tb3VyY2Uuc3Vic2NyaWJlKChldmVudDogeyBpc1BhZ2VTaXplQ2hhbmdlOiBib29sZWFuIH0pID0+IHtcclxuICAgICAgaWYgKGV2ZW50LmlzUGFnZVNpemVDaGFuZ2UpIHtcclxuICAgICAgICB0aGlzLmNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmRhdGFUYWJsZS5zZWxlY3RSb3dzKGZhbHNlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmNoZWNrZWQgPSB0aGlzLmRhdGFUYWJsZS5hbGxDdXJyZW50Um93c1NlbGVjdGVkKCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMucmVzZXRTdWJzY3JpcHRpb24gPSB0aGlzLmRhdGFUYWJsZS5zdGF0ZS5yZXNldFNvdXJjZS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLmNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnNlbGVjdGlvblN1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLnNlbGVjdGlvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMucGFnaW5hdGlvblN1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLnBhZ2luYXRpb25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnJlc2V0U3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMucmVzZXRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbkNsaWNrKCk6IHZvaWQge1xyXG4gICAgdGhpcy5kYXRhVGFibGUuc2VsZWN0Um93cyghdGhpcy5jaGVja2VkKTtcclxuICB9XHJcbn1cclxuIl19
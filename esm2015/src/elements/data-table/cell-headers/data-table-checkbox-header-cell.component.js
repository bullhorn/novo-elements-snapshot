import { CdkColumnDef, CdkHeaderCell } from '@angular/cdk/table';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';
import { NovoToastService } from '../../toast/ToastService';
import { NovoDataTable } from '../data-table.component';
export class NovoDataTableCheckboxHeaderCell extends CdkHeaderCell {
    constructor(columnDef, elementRef, renderer, dataTable, ref, toaster) {
        super(columnDef, elementRef);
        this.dataTable = dataTable;
        this.ref = ref;
        this.toaster = toaster;
        this.role = 'columnheader';
        this.maxSelected = undefined;
        this.checked = false;
        renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-checkbox-column-header-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, `novo-checkbox-column-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, 'novo-data-table-checkbox-header-cell');
        this.selectionSubscription = this.dataTable.state.selectionSource.subscribe(() => {
            var _a, _b, _c;
            this.checked = this.dataTable.allCurrentRowsSelected() || (((_a = this.dataTable) === null || _a === void 0 ? void 0 : _a.canSelectAll) && ((_b = this.dataTable) === null || _b === void 0 ? void 0 : _b.allMatchingSelected));
            if ((_c = this.dataTable) === null || _c === void 0 ? void 0 : _c.canSelectAll) {
                this.selectAllChanged();
            }
            this.ref.markForCheck();
        });
        this.paginationSubscription = this.dataTable.state.paginationSource.subscribe((event) => {
            var _a, _b, _c, _d;
            if (event.isPageSizeChange) {
                this.checked = false;
                if ((_a = this.dataTable) === null || _a === void 0 ? void 0 : _a.canSelectAll) {
                    this.selectAllChanged();
                }
                this.dataTable.selectRows(false);
                this.dataTable.state.checkRetainment('pageSize');
                this.dataTable.state.reset(false, true);
            }
            else {
                this.checked = this.dataTable.allCurrentRowsSelected() || (((_b = this.dataTable) === null || _b === void 0 ? void 0 : _b.canSelectAll) && ((_c = this.dataTable) === null || _c === void 0 ? void 0 : _c.allMatchingSelected));
                if ((_d = this.dataTable) === null || _d === void 0 ? void 0 : _d.canSelectAll) {
                    this.selectAllChanged();
                }
            }
            this.ref.markForCheck();
        });
        this.resetSubscription = this.dataTable.state.resetSource.subscribe(() => {
            var _a;
            this.checked = false;
            if ((_a = this.dataTable) === null || _a === void 0 ? void 0 : _a.canSelectAll) {
                this.selectAllChanged();
            }
            this.ref.markForCheck();
        });
    }
    get isAtLimit() {
        return (this.maxSelected && this.dataTable.state.selectedRows.size + this.dataTable.dataSource.data.length > this.maxSelected && !this.checked);
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
        var _a;
        if (this.isAtLimit) {
            this.toaster.alert({
                theme: 'danger',
                position: 'fixedTop',
                message: 'Error, more than 500 items are not able to be selected at one time',
                icon: 'caution',
            });
        }
        else {
            this.dataTable.selectRows(!this.checked);
        }
        if ((_a = this.dataTable) === null || _a === void 0 ? void 0 : _a.canSelectAll) {
            this.selectAllChanged();
        }
    }
    selectAllChanged() {
        var _a, _b, _c, _d;
        const allSelectedEvent = {
            allSelected: this.checked,
            selectedCount: (_c = (_b = (_a = this.dataTable) === null || _a === void 0 ? void 0 : _a.state) === null || _b === void 0 ? void 0 : _b.selected) === null || _c === void 0 ? void 0 : _c.length,
            allMatchingSelected: (_d = this.dataTable) === null || _d === void 0 ? void 0 : _d.allMatchingSelected,
        };
        this.dataTable.allSelected.emit(allSelectedEvent);
    }
}
NovoDataTableCheckboxHeaderCell.decorators = [
    { type: Component, args: [{
                selector: 'novo-data-table-checkbox-header-cell',
                template: `
    <div class="data-table-checkbox" (click)="onClick()">
      <input type="checkbox" [checked]="checked" />
      <label>
        <i [class.bhi-checkbox-empty]="!checked" [class.bhi-checkbox-filled]="checked"></i>
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
    { type: ChangeDetectorRef },
    { type: NovoToastService }
];
NovoDataTableCheckboxHeaderCell.propDecorators = {
    role: [{ type: HostBinding, args: ['attr.role',] }],
    maxSelected: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1jaGVja2JveC1oZWFkZXItY2VsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvZGF0YS10YWJsZS9jZWxsLWhlYWRlcnMvZGF0YS10YWJsZS1jaGVja2JveC1oZWFkZXItY2VsbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFhLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1SSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFjeEQsTUFBTSxPQUFPLCtCQUFtQyxTQUFRLGFBQWE7SUFpQm5FLFlBQ0UsU0FBdUIsRUFDdkIsVUFBc0IsRUFDdEIsUUFBbUIsRUFDWCxTQUEyQixFQUMzQixHQUFzQixFQUN0QixPQUF5QjtRQUVqQyxLQUFLLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBSnJCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQzNCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3RCLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBckI1QixTQUFJLEdBQUcsY0FBYyxDQUFDO1FBRXRCLGdCQUFXLEdBQVcsU0FBUyxDQUFDO1FBRWhDLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFvQjlCLFFBQVEsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxvQkFBb0IsRUFBRSwrQkFBK0IsU0FBUyxD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RUFBRSxzQ0FBc0M7Z0JBQ2hELFFBQVEsRUFBRTs7Ozs7OztHQU9UO2dCQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7WUFqQlEsWUFBWTtZQUMyQyxVQUFVO1lBQWlDLFNBQVM7WUFHM0csYUFBYTtZQUhZLGlCQUFpQjtZQUUxQyxnQkFBZ0I7OzttQkFnQnRCLFdBQVcsU0FBQyxXQUFXOzBCQUV2QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2RrQ29sdW1uRGVmLCBDZGtIZWFkZXJDZWxsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXQsIE9uRGVzdHJveSwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE5vdm9Ub2FzdFNlcnZpY2UgfSBmcm9tICcuLi8uLi90b2FzdC9Ub2FzdFNlcnZpY2UnO1xuaW1wb3J0IHsgTm92b0RhdGFUYWJsZSB9IGZyb20gJy4uL2RhdGEtdGFibGUuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1kYXRhLXRhYmxlLWNoZWNrYm94LWhlYWRlci1jZWxsJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiZGF0YS10YWJsZS1jaGVja2JveFwiIChjbGljayk9XCJvbkNsaWNrKClcIj5cbiAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBbY2hlY2tlZF09XCJjaGVja2VkXCIgLz5cbiAgICAgIDxsYWJlbD5cbiAgICAgICAgPGkgW2NsYXNzLmJoaS1jaGVja2JveC1lbXB0eV09XCIhY2hlY2tlZFwiIFtjbGFzcy5iaGktY2hlY2tib3gtZmlsbGVkXT1cImNoZWNrZWRcIj48L2k+XG4gICAgICA8L2xhYmVsPlxuICAgIDwvZGl2PlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0RhdGFUYWJsZUNoZWNrYm94SGVhZGVyQ2VsbDxUPiBleHRlbmRzIENka0hlYWRlckNlbGwgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBASG9zdEJpbmRpbmcoJ2F0dHIucm9sZScpXG4gIHB1YmxpYyByb2xlID0gJ2NvbHVtbmhlYWRlcic7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBtYXhTZWxlY3RlZDogbnVtYmVyID0gdW5kZWZpbmVkO1xuXG4gIHB1YmxpYyBjaGVja2VkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgc2VsZWN0aW9uU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgcGFnaW5hdGlvblN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIHJlc2V0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgZ2V0IGlzQXRMaW1pdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5tYXhTZWxlY3RlZCAmJiB0aGlzLmRhdGFUYWJsZS5zdGF0ZS5zZWxlY3RlZFJvd3Muc2l6ZSArIHRoaXMuZGF0YVRhYmxlLmRhdGFTb3VyY2UuZGF0YS5sZW5ndGggPiB0aGlzLm1heFNlbGVjdGVkICYmICF0aGlzLmNoZWNrZWRcbiAgICApO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgY29sdW1uRGVmOiBDZGtDb2x1bW5EZWYsXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZGF0YVRhYmxlOiBOb3ZvRGF0YVRhYmxlPFQ+LFxuICAgIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIHRvYXN0ZXI6IE5vdm9Ub2FzdFNlcnZpY2UsXG4gICkge1xuICAgIHN1cGVyKGNvbHVtbkRlZiwgZWxlbWVudFJlZik7XG4gICAgcmVuZGVyZXIuc2V0QXR0cmlidXRlKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2RhdGEtYXV0b21hdGlvbi1pZCcsIGBub3ZvLWNoZWNrYm94LWNvbHVtbi1oZWFkZXItJHtjb2x1bW5EZWYuY3NzQ2xhc3NGcmllbmRseU5hbWV9YCk7XG4gICAgcmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBgbm92by1jaGVja2JveC1jb2x1bW4tJHtjb2x1bW5EZWYuY3NzQ2xhc3NGcmllbmRseU5hbWV9YCk7XG4gICAgcmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbm92by1kYXRhLXRhYmxlLWNoZWNrYm94LWhlYWRlci1jZWxsJyk7XG5cbiAgICB0aGlzLnNlbGVjdGlvblN1YnNjcmlwdGlvbiA9IHRoaXMuZGF0YVRhYmxlLnN0YXRlLnNlbGVjdGlvblNvdXJjZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5jaGVja2VkID0gdGhpcy5kYXRhVGFibGUuYWxsQ3VycmVudFJvd3NTZWxlY3RlZCgpIHx8ICh0aGlzLmRhdGFUYWJsZT8uY2FuU2VsZWN0QWxsICYmIHRoaXMuZGF0YVRhYmxlPy5hbGxNYXRjaGluZ1NlbGVjdGVkKTtcbiAgICAgIGlmICh0aGlzLmRhdGFUYWJsZT8uY2FuU2VsZWN0QWxsKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0QWxsQ2hhbmdlZCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gICAgdGhpcy5wYWdpbmF0aW9uU3Vic2NyaXB0aW9uID0gdGhpcy5kYXRhVGFibGUuc3RhdGUucGFnaW5hdGlvblNvdXJjZS5zdWJzY3JpYmUoKGV2ZW50OiB7IGlzUGFnZVNpemVDaGFuZ2U6IGJvb2xlYW4gfSkgPT4ge1xuICAgICAgaWYgKGV2ZW50LmlzUGFnZVNpemVDaGFuZ2UpIHtcbiAgICAgICAgdGhpcy5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLmRhdGFUYWJsZT8uY2FuU2VsZWN0QWxsKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RBbGxDaGFuZ2VkKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYXRhVGFibGUuc2VsZWN0Um93cyhmYWxzZSk7XG4gICAgICAgIHRoaXMuZGF0YVRhYmxlLnN0YXRlLmNoZWNrUmV0YWlubWVudCgncGFnZVNpemUnKTtcbiAgICAgICAgdGhpcy5kYXRhVGFibGUuc3RhdGUucmVzZXQoZmFsc2UsIHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jaGVja2VkID0gdGhpcy5kYXRhVGFibGUuYWxsQ3VycmVudFJvd3NTZWxlY3RlZCgpIHx8ICh0aGlzLmRhdGFUYWJsZT8uY2FuU2VsZWN0QWxsICYmIHRoaXMuZGF0YVRhYmxlPy5hbGxNYXRjaGluZ1NlbGVjdGVkKTtcbiAgICAgICAgaWYgKHRoaXMuZGF0YVRhYmxlPy5jYW5TZWxlY3RBbGwpIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdEFsbENoYW5nZWQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gICAgdGhpcy5yZXNldFN1YnNjcmlwdGlvbiA9IHRoaXMuZGF0YVRhYmxlLnN0YXRlLnJlc2V0U291cmNlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgIGlmICh0aGlzLmRhdGFUYWJsZT8uY2FuU2VsZWN0QWxsKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0QWxsQ2hhbmdlZCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc2VsZWN0aW9uU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnNlbGVjdGlvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wYWdpbmF0aW9uU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnBhZ2luYXRpb25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucmVzZXRTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMucmVzZXRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb25DbGljaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc0F0TGltaXQpIHtcbiAgICAgIHRoaXMudG9hc3Rlci5hbGVydCh7XG4gICAgICAgIHRoZW1lOiAnZGFuZ2VyJyxcbiAgICAgICAgcG9zaXRpb246ICdmaXhlZFRvcCcsXG4gICAgICAgIG1lc3NhZ2U6ICdFcnJvciwgbW9yZSB0aGFuIDUwMCBpdGVtcyBhcmUgbm90IGFibGUgdG8gYmUgc2VsZWN0ZWQgYXQgb25lIHRpbWUnLFxuICAgICAgICBpY29uOiAnY2F1dGlvbicsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kYXRhVGFibGUuc2VsZWN0Um93cyghdGhpcy5jaGVja2VkKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGF0YVRhYmxlPy5jYW5TZWxlY3RBbGwpIHtcbiAgICAgIHRoaXMuc2VsZWN0QWxsQ2hhbmdlZCgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RBbGxDaGFuZ2VkKCk6IHZvaWQge1xuICAgIGNvbnN0IGFsbFNlbGVjdGVkRXZlbnQgPSB7XG4gICAgICBhbGxTZWxlY3RlZDogdGhpcy5jaGVja2VkLFxuICAgICAgc2VsZWN0ZWRDb3VudDogdGhpcy5kYXRhVGFibGU/LnN0YXRlPy5zZWxlY3RlZD8ubGVuZ3RoLFxuICAgICAgYWxsTWF0Y2hpbmdTZWxlY3RlZDogdGhpcy5kYXRhVGFibGU/LmFsbE1hdGNoaW5nU2VsZWN0ZWQsXG4gICAgfTtcbiAgICB0aGlzLmRhdGFUYWJsZS5hbGxTZWxlY3RlZC5lbWl0KGFsbFNlbGVjdGVkRXZlbnQpO1xuICB9XG59XG4iXX0=
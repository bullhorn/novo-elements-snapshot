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
        this.canSelectAll = false;
        this.checked = false;
        renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-checkbox-column-header-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, `novo-checkbox-column-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, 'novo-data-table-checkbox-header-cell');
        this.selectionSubscription = this.dataTable.state.selectionSource.subscribe(() => {
            this.checked = this.dataTable.allCurrentRowsSelected();
            if (this.canSelectAll) {
                this.selectAllChanged();
            }
            this.ref.markForCheck();
        });
        this.paginationSubscription = this.dataTable.state.paginationSource.subscribe((event) => {
            if (event.isPageSizeChange) {
                this.checked = false;
                if (this.canSelectAll) {
                    this.selectAllChanged();
                }
                this.dataTable.selectRows(false);
                this.dataTable.state.checkRetainment('pageSize');
                this.dataTable.state.reset(false, true);
            }
            else {
                this.checked = this.dataTable.allCurrentRowsSelected();
                if (this.canSelectAll) {
                    this.selectAllChanged();
                }
            }
            this.ref.markForCheck();
        });
        this.resetSubscription = this.dataTable.state.resetSource.subscribe(() => {
            this.checked = false;
            if (this.canSelectAll) {
                this.selectAllChanged();
            }
            this.ref.markForCheck();
        });
    }
    get isAtLimit() {
        return this.maxSelected && this.dataTable.state.selectedRows.size + this.dataTable.dataSource.data.length > this.maxSelected && !this.checked;
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
        if (this.canSelectAll) {
            this.selectAllChanged();
        }
    }
    selectAllChanged() {
        var _a, _b, _c;
        const allSelectedEvent = {
            allSelected: this.checked,
            selectedCount: (_c = (_b = (_a = this.dataTable) === null || _a === void 0 ? void 0 : _a.state) === null || _b === void 0 ? void 0 : _b.selected) === null || _c === void 0 ? void 0 : _c.length,
        };
        this.dataTable.allSelected.emit(allSelectedEvent);
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
    { type: ChangeDetectorRef },
    { type: NovoToastService }
];
NovoDataTableCheckboxHeaderCell.propDecorators = {
    role: [{ type: HostBinding, args: ['attr.role',] }],
    maxSelected: [{ type: Input }],
    canSelectAll: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1jaGVja2JveC1oZWFkZXItY2VsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvZGF0YS10YWJsZS9jZWxsLWhlYWRlcnMvZGF0YS10YWJsZS1jaGVja2JveC1oZWFkZXItY2VsbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBZ0IsV0FBVyxFQUFFLEtBQUssRUFBcUIsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWxLLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQWdCeEQsTUFBTSxPQUFPLCtCQUFtQyxTQUFRLGFBQWE7SUFpQm5FLFlBQ0UsU0FBdUIsRUFDdkIsVUFBc0IsRUFDdEIsUUFBbUIsRUFDWCxTQUEyQixFQUMzQixHQUFzQixFQUN0QixPQUF5QjtRQUVqQyxLQUFLLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBSnJCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQzNCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3RCLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBckI1QixTQUFJLEdBQUcsY0FBYyxDQUFDO1FBRXRCLGdCQUFXLEdBQVcsU0FBUyxDQUFDO1FBRWhDLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBRTlCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFrQjlCLFFBQVEsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLGFBQWEs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bGwgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE5vdm9Ub2FzdFNlcnZpY2UgfSBmcm9tICcuLi8uLi90b2FzdC9Ub2FzdFNlcnZpY2UnO1xuaW1wb3J0IHsgTm92b0RhdGFUYWJsZSB9IGZyb20gJy4uL2RhdGEtdGFibGUuY29tcG9uZW50JztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWRhdGEtdGFibGUtY2hlY2tib3gtaGVhZGVyLWNlbGwnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJkYXRhLXRhYmxlLWNoZWNrYm94XCIgKGNsaWNrKT1cIm9uQ2xpY2soKVwiPlxuICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIFtjaGVja2VkXT1cImNoZWNrZWRcIj5cbiAgICAgIDxsYWJlbD5cbiAgICAgICAgPGkgW2NsYXNzLmJoaS1jaGVja2JveC1lbXB0eV09XCIhY2hlY2tlZFwiXG4gICAgICAgICAgW2NsYXNzLmJoaS1jaGVja2JveC1maWxsZWRdPVwiY2hlY2tlZFwiPjwvaT5cbiAgICAgIDwvbGFiZWw+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRGF0YVRhYmxlQ2hlY2tib3hIZWFkZXJDZWxsPFQ+IGV4dGVuZHMgQ2RrSGVhZGVyQ2VsbCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIEBIb3N0QmluZGluZygnYXR0ci5yb2xlJylcbiAgcHVibGljIHJvbGUgPSAnY29sdW1uaGVhZGVyJztcbiAgQElucHV0KClcbiAgcHVibGljIG1heFNlbGVjdGVkOiBudW1iZXIgPSB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBjYW5TZWxlY3RBbGw6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwdWJsaWMgY2hlY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIHNlbGVjdGlvblN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIHBhZ2luYXRpb25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSByZXNldFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGdldCBpc0F0TGltaXQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubWF4U2VsZWN0ZWQgJiYgdGhpcy5kYXRhVGFibGUuc3RhdGUuc2VsZWN0ZWRSb3dzLnNpemUgKyB0aGlzLmRhdGFUYWJsZS5kYXRhU291cmNlLmRhdGEubGVuZ3RoID4gdGhpcy5tYXhTZWxlY3RlZCAmJiAhdGhpcy5jaGVja2VkO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgY29sdW1uRGVmOiBDZGtDb2x1bW5EZWYsXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZGF0YVRhYmxlOiBOb3ZvRGF0YVRhYmxlPFQ+LFxuICAgIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIHRvYXN0ZXI6IE5vdm9Ub2FzdFNlcnZpY2UsXG4gICkge1xuICAgIHN1cGVyKGNvbHVtbkRlZiwgZWxlbWVudFJlZik7XG4gICAgcmVuZGVyZXIuc2V0QXR0cmlidXRlKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2RhdGEtYXV0b21hdGlvbi1pZCcsIGBub3ZvLWNoZWNrYm94LWNvbHVtbi1oZWFkZXItJHtjb2x1bW5EZWYuY3NzQ2xhc3NGcmllbmRseU5hbWV9YCk7XG4gICAgcmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBgbm92by1jaGVja2JveC1jb2x1bW4tJHtjb2x1bW5EZWYuY3NzQ2xhc3NGcmllbmRseU5hbWV9YCk7XG4gICAgcmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbm92by1kYXRhLXRhYmxlLWNoZWNrYm94LWhlYWRlci1jZWxsJyk7XG5cbiAgICB0aGlzLnNlbGVjdGlvblN1YnNjcmlwdGlvbiA9IHRoaXMuZGF0YVRhYmxlLnN0YXRlLnNlbGVjdGlvblNvdXJjZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5jaGVja2VkID0gdGhpcy5kYXRhVGFibGUuYWxsQ3VycmVudFJvd3NTZWxlY3RlZCgpO1xuICAgICAgaWYgKHRoaXMuY2FuU2VsZWN0QWxsKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0QWxsQ2hhbmdlZCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gICAgdGhpcy5wYWdpbmF0aW9uU3Vic2NyaXB0aW9uID0gdGhpcy5kYXRhVGFibGUuc3RhdGUucGFnaW5hdGlvblNvdXJjZS5zdWJzY3JpYmUoKGV2ZW50OiB7IGlzUGFnZVNpemVDaGFuZ2U6IGJvb2xlYW4gfSkgPT4ge1xuICAgICAgaWYgKGV2ZW50LmlzUGFnZVNpemVDaGFuZ2UpIHtcbiAgICAgICAgdGhpcy5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLmNhblNlbGVjdEFsbCkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0QWxsQ2hhbmdlZCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0YVRhYmxlLnNlbGVjdFJvd3MoZmFsc2UpO1xuICAgICAgICB0aGlzLmRhdGFUYWJsZS5zdGF0ZS5jaGVja1JldGFpbm1lbnQoJ3BhZ2VTaXplJyk7XG4gICAgICAgIHRoaXMuZGF0YVRhYmxlLnN0YXRlLnJlc2V0KGZhbHNlLCB0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2hlY2tlZCA9IHRoaXMuZGF0YVRhYmxlLmFsbEN1cnJlbnRSb3dzU2VsZWN0ZWQoKTtcbiAgICAgICAgaWYgKHRoaXMuY2FuU2VsZWN0QWxsKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RBbGxDaGFuZ2VkKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICAgIHRoaXMucmVzZXRTdWJzY3JpcHRpb24gPSB0aGlzLmRhdGFUYWJsZS5zdGF0ZS5yZXNldFNvdXJjZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5jaGVja2VkID0gZmFsc2U7XG4gICAgICBpZiAodGhpcy5jYW5TZWxlY3RBbGwpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RBbGxDaGFuZ2VkKCk7XG4gICAgICB9XG4gICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zZWxlY3Rpb25TdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnBhZ2luYXRpb25TdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMucGFnaW5hdGlvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5yZXNldFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5yZXNldFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBvbkNsaWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzQXRMaW1pdCkge1xuICAgICAgdGhpcy50b2FzdGVyLmFsZXJ0KHtcbiAgICAgICAgdGhlbWU6ICdkYW5nZXInLFxuICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkVG9wJyxcbiAgICAgICAgbWVzc2FnZTogJ0Vycm9yLCBtb3JlIHRoYW4gNTAwIGl0ZW1zIGFyZSBub3QgYWJsZSB0byBiZSBzZWxlY3RlZCBhdCBvbmUgdGltZScsXG4gICAgICAgIGljb246ICdjYXV0aW9uJyxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRhdGFUYWJsZS5zZWxlY3RSb3dzKCF0aGlzLmNoZWNrZWQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5jYW5TZWxlY3RBbGwpIHtcbiAgICAgIHRoaXMuc2VsZWN0QWxsQ2hhbmdlZCgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RBbGxDaGFuZ2VkKCk6IHZvaWQge1xuICAgIGNvbnN0IGFsbFNlbGVjdGVkRXZlbnQgPSB7XG4gICAgICBhbGxTZWxlY3RlZDogdGhpcy5jaGVja2VkLFxuICAgICAgc2VsZWN0ZWRDb3VudDogdGhpcy5kYXRhVGFibGU/LnN0YXRlPy5zZWxlY3RlZD8ubGVuZ3RoLFxuICAgIH07XG4gICAgdGhpcy5kYXRhVGFibGUuYWxsU2VsZWN0ZWQuZW1pdChhbGxTZWxlY3RlZEV2ZW50KTtcbiAgfVxufVxuIl19
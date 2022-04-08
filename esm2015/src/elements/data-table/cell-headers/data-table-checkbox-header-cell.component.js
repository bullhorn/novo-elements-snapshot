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
                this.resetAllMatchingSelected();
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
            if (this.checked) {
                this.resetAllMatchingSelected();
            }
            else {
                this.selectAllChanged();
            }
        }
    }
    resetAllMatchingSelected() {
        var _a, _b, _c;
        (_b = (_a = this.dataTable.state) === null || _a === void 0 ? void 0 : _a.allMatchingSelectedSource) === null || _b === void 0 ? void 0 : _b.next(false);
        (_c = this.dataTable.state) === null || _c === void 0 ? void 0 : _c.onSelectionChange();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1jaGVja2JveC1oZWFkZXItY2VsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvZGF0YS10YWJsZS9jZWxsLWhlYWRlcnMvZGF0YS10YWJsZS1jaGVja2JveC1oZWFkZXItY2VsbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFhLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1SSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFjeEQsTUFBTSxPQUFPLCtCQUFtQyxTQUFRLGFBQWE7SUFpQm5FLFlBQ0UsU0FBdUIsRUFDdkIsVUFBc0IsRUFDdEIsUUFBbUIsRUFDWCxTQUEyQixFQUMzQixHQUFzQixFQUN0QixPQUF5QjtRQUVqQyxLQUFLLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBSnJCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQzNCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3RCLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBckI1QixTQUFJLEdBQUcsY0FBYyxDQUFDO1FBRXRCLGdCQUFXLEdBQVcsU0FBUyxDQUFDO1FBRWhDLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFvQjlCLFFBQVEsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxvQkFBb0IsRUFBRSwrQkFBK0IsU0FBUyxD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LENBQUMsT0FBTztZQUN6QixhQUFhLG9CQUFFLElBQUksQ0FBQyxTQUFTLDBDQUFFLEtBQUssMENBQUUsUUFBUSwwQ0FBRSxNQUFNO1lBQ3RELG1CQUFtQixRQUFFLElBQUksQ0FBQyxTQUFTLDBDQUFFLG1CQUFtQjtTQUN6RCxDQUFDO1FBQ0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDcEQsQ0FBQzs7O1lBdkhGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsc0NBQXNDO2dCQUNoRCxRQUFRLEVBQUU7Ozs7Ozs7R0FPVDtnQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7O1lBakJRLFlBQVk7WUFDMkMsVUFBVTtZQUFpQyxTQUFTO1lBRzNHLGFBQWE7WUFIWSxpQkFBaUI7WUFFMUMsZ0JBQWdCOzs7bUJBZ0J0QixXQUFXLFNBQUMsV0FBVzswQkFFdkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENka0NvbHVtbkRlZiwgQ2RrSGVhZGVyQ2VsbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkRlc3Ryb3ksIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBOb3ZvVG9hc3RTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdG9hc3QvVG9hc3RTZXJ2aWNlJztcbmltcG9ydCB7IE5vdm9EYXRhVGFibGUgfSBmcm9tICcuLi9kYXRhLXRhYmxlLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tZGF0YS10YWJsZS1jaGVja2JveC1oZWFkZXItY2VsbCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImRhdGEtdGFibGUtY2hlY2tib3hcIiAoY2xpY2spPVwib25DbGljaygpXCI+XG4gICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgW2NoZWNrZWRdPVwiY2hlY2tlZFwiIC8+XG4gICAgICA8bGFiZWw+XG4gICAgICAgIDxpIFtjbGFzcy5iaGktY2hlY2tib3gtZW1wdHldPVwiIWNoZWNrZWRcIiBbY2xhc3MuYmhpLWNoZWNrYm94LWZpbGxlZF09XCJjaGVja2VkXCI+PC9pPlxuICAgICAgPC9sYWJlbD5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9EYXRhVGFibGVDaGVja2JveEhlYWRlckNlbGw8VD4gZXh0ZW5kcyBDZGtIZWFkZXJDZWxsIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnJvbGUnKVxuICBwdWJsaWMgcm9sZSA9ICdjb2x1bW5oZWFkZXInO1xuICBASW5wdXQoKVxuICBwdWJsaWMgbWF4U2VsZWN0ZWQ6IG51bWJlciA9IHVuZGVmaW5lZDtcblxuICBwdWJsaWMgY2hlY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIHNlbGVjdGlvblN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIHBhZ2luYXRpb25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSByZXNldFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGdldCBpc0F0TGltaXQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMubWF4U2VsZWN0ZWQgJiYgdGhpcy5kYXRhVGFibGUuc3RhdGUuc2VsZWN0ZWRSb3dzLnNpemUgKyB0aGlzLmRhdGFUYWJsZS5kYXRhU291cmNlLmRhdGEubGVuZ3RoID4gdGhpcy5tYXhTZWxlY3RlZCAmJiAhdGhpcy5jaGVja2VkXG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGNvbHVtbkRlZjogQ2RrQ29sdW1uRGVmLFxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGRhdGFUYWJsZTogTm92b0RhdGFUYWJsZTxUPixcbiAgICBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSB0b2FzdGVyOiBOb3ZvVG9hc3RTZXJ2aWNlLFxuICApIHtcbiAgICBzdXBlcihjb2x1bW5EZWYsIGVsZW1lbnRSZWYpO1xuICAgIHJlbmRlcmVyLnNldEF0dHJpYnV0ZShlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdkYXRhLWF1dG9tYXRpb24taWQnLCBgbm92by1jaGVja2JveC1jb2x1bW4taGVhZGVyLSR7Y29sdW1uRGVmLmNzc0NsYXNzRnJpZW5kbHlOYW1lfWApO1xuICAgIHJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgYG5vdm8tY2hlY2tib3gtY29sdW1uLSR7Y29sdW1uRGVmLmNzc0NsYXNzRnJpZW5kbHlOYW1lfWApO1xuICAgIHJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ25vdm8tZGF0YS10YWJsZS1jaGVja2JveC1oZWFkZXItY2VsbCcpO1xuXG4gICAgdGhpcy5zZWxlY3Rpb25TdWJzY3JpcHRpb24gPSB0aGlzLmRhdGFUYWJsZS5zdGF0ZS5zZWxlY3Rpb25Tb3VyY2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuY2hlY2tlZCA9IHRoaXMuZGF0YVRhYmxlLmFsbEN1cnJlbnRSb3dzU2VsZWN0ZWQoKSB8fCAodGhpcy5kYXRhVGFibGU/LmNhblNlbGVjdEFsbCAmJiB0aGlzLmRhdGFUYWJsZT8uYWxsTWF0Y2hpbmdTZWxlY3RlZCk7XG4gICAgICBpZiAodGhpcy5kYXRhVGFibGU/LmNhblNlbGVjdEFsbCkge1xuICAgICAgICB0aGlzLnNlbGVjdEFsbENoYW5nZWQoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICAgIHRoaXMucGFnaW5hdGlvblN1YnNjcmlwdGlvbiA9IHRoaXMuZGF0YVRhYmxlLnN0YXRlLnBhZ2luYXRpb25Tb3VyY2Uuc3Vic2NyaWJlKChldmVudDogeyBpc1BhZ2VTaXplQ2hhbmdlOiBib29sZWFuIH0pID0+IHtcbiAgICAgIGlmIChldmVudC5pc1BhZ2VTaXplQ2hhbmdlKSB7XG4gICAgICAgIHRoaXMuY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5kYXRhVGFibGU/LmNhblNlbGVjdEFsbCkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0QWxsQ2hhbmdlZCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0YVRhYmxlLnNlbGVjdFJvd3MoZmFsc2UpO1xuICAgICAgICB0aGlzLmRhdGFUYWJsZS5zdGF0ZS5jaGVja1JldGFpbm1lbnQoJ3BhZ2VTaXplJyk7XG4gICAgICAgIHRoaXMuZGF0YVRhYmxlLnN0YXRlLnJlc2V0KGZhbHNlLCB0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2hlY2tlZCA9IHRoaXMuZGF0YVRhYmxlLmFsbEN1cnJlbnRSb3dzU2VsZWN0ZWQoKSB8fCAodGhpcy5kYXRhVGFibGU/LmNhblNlbGVjdEFsbCAmJiB0aGlzLmRhdGFUYWJsZT8uYWxsTWF0Y2hpbmdTZWxlY3RlZCk7XG4gICAgICAgIGlmICh0aGlzLmRhdGFUYWJsZT8uY2FuU2VsZWN0QWxsKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RBbGxDaGFuZ2VkKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICAgIHRoaXMucmVzZXRTdWJzY3JpcHRpb24gPSB0aGlzLmRhdGFUYWJsZS5zdGF0ZS5yZXNldFNvdXJjZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5jaGVja2VkID0gZmFsc2U7XG4gICAgICBpZiAodGhpcy5kYXRhVGFibGU/LmNhblNlbGVjdEFsbCkge1xuICAgICAgICB0aGlzLnJlc2V0QWxsTWF0Y2hpbmdTZWxlY3RlZCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc2VsZWN0aW9uU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnNlbGVjdGlvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wYWdpbmF0aW9uU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnBhZ2luYXRpb25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucmVzZXRTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMucmVzZXRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb25DbGljaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc0F0TGltaXQpIHtcbiAgICAgIHRoaXMudG9hc3Rlci5hbGVydCh7XG4gICAgICAgIHRoZW1lOiAnZGFuZ2VyJyxcbiAgICAgICAgcG9zaXRpb246ICdmaXhlZFRvcCcsXG4gICAgICAgIG1lc3NhZ2U6ICdFcnJvciwgbW9yZSB0aGFuIDUwMCBpdGVtcyBhcmUgbm90IGFibGUgdG8gYmUgc2VsZWN0ZWQgYXQgb25lIHRpbWUnLFxuICAgICAgICBpY29uOiAnY2F1dGlvbicsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kYXRhVGFibGUuc2VsZWN0Um93cyghdGhpcy5jaGVja2VkKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGF0YVRhYmxlPy5jYW5TZWxlY3RBbGwpIHtcbiAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgdGhpcy5yZXNldEFsbE1hdGNoaW5nU2VsZWN0ZWQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2VsZWN0QWxsQ2hhbmdlZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRBbGxNYXRjaGluZ1NlbGVjdGVkKCk6IHZvaWQge1xuICAgIHRoaXMuZGF0YVRhYmxlLnN0YXRlPy5hbGxNYXRjaGluZ1NlbGVjdGVkU291cmNlPy5uZXh0KGZhbHNlKTtcbiAgICB0aGlzLmRhdGFUYWJsZS5zdGF0ZT8ub25TZWxlY3Rpb25DaGFuZ2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RBbGxDaGFuZ2VkKCk6IHZvaWQge1xuICAgIGNvbnN0IGFsbFNlbGVjdGVkRXZlbnQgPSB7XG4gICAgICBhbGxTZWxlY3RlZDogdGhpcy5jaGVja2VkLFxuICAgICAgc2VsZWN0ZWRDb3VudDogdGhpcy5kYXRhVGFibGU/LnN0YXRlPy5zZWxlY3RlZD8ubGVuZ3RoLFxuICAgICAgYWxsTWF0Y2hpbmdTZWxlY3RlZDogdGhpcy5kYXRhVGFibGU/LmFsbE1hdGNoaW5nU2VsZWN0ZWQsXG4gICAgfTtcbiAgICB0aGlzLmRhdGFUYWJsZS5hbGxTZWxlY3RlZC5lbWl0KGFsbFNlbGVjdGVkRXZlbnQpO1xuICB9XG59XG4iXX0=
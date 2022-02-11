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
    maxSelected: [{ type: Input }],
    canSelectAll: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1jaGVja2JveC1oZWFkZXItY2VsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvZGF0YS10YWJsZS9jZWxsLWhlYWRlcnMvZGF0YS10YWJsZS1jaGVja2JveC1oZWFkZXItY2VsbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFhLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1SSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFjeEQsTUFBTSxPQUFPLCtCQUFtQyxTQUFRLGFBQWE7SUFtQm5FLFlBQ0UsU0FBdUIsRUFDdkIsVUFBc0IsRUFDdEIsUUFBbUIsRUFDWCxTQUEyQixFQUMzQixHQUFzQixFQUN0QixPQUF5QjtRQUVqQyxLQUFLLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBSnJCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQzNCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3RCLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBdkI1QixTQUFJLEdBQUcsY0FBYyxDQUFDO1FBRXRCLGdCQUFXLEdBQVcsU0FBUyxDQUFDO1FBRWhDLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBRTlCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFvQjlCLFFBQVEsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFB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YWRlckNlbGwgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25EZXN0cm95LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTm92b1RvYXN0U2VydmljZSB9IGZyb20gJy4uLy4uL3RvYXN0L1RvYXN0U2VydmljZSc7XG5pbXBvcnQgeyBOb3ZvRGF0YVRhYmxlIH0gZnJvbSAnLi4vZGF0YS10YWJsZS5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWRhdGEtdGFibGUtY2hlY2tib3gtaGVhZGVyLWNlbGwnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJkYXRhLXRhYmxlLWNoZWNrYm94XCIgKGNsaWNrKT1cIm9uQ2xpY2soKVwiPlxuICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIFtjaGVja2VkXT1cImNoZWNrZWRcIiAvPlxuICAgICAgPGxhYmVsPlxuICAgICAgICA8aSBbY2xhc3MuYmhpLWNoZWNrYm94LWVtcHR5XT1cIiFjaGVja2VkXCIgW2NsYXNzLmJoaS1jaGVja2JveC1maWxsZWRdPVwiY2hlY2tlZFwiPjwvaT5cbiAgICAgIDwvbGFiZWw+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRGF0YVRhYmxlQ2hlY2tib3hIZWFkZXJDZWxsPFQ+IGV4dGVuZHMgQ2RrSGVhZGVyQ2VsbCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIEBIb3N0QmluZGluZygnYXR0ci5yb2xlJylcbiAgcHVibGljIHJvbGUgPSAnY29sdW1uaGVhZGVyJztcbiAgQElucHV0KClcbiAgcHVibGljIG1heFNlbGVjdGVkOiBudW1iZXIgPSB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBjYW5TZWxlY3RBbGw6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwdWJsaWMgY2hlY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIHNlbGVjdGlvblN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIHBhZ2luYXRpb25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSByZXNldFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGdldCBpc0F0TGltaXQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMubWF4U2VsZWN0ZWQgJiYgdGhpcy5kYXRhVGFibGUuc3RhdGUuc2VsZWN0ZWRSb3dzLnNpemUgKyB0aGlzLmRhdGFUYWJsZS5kYXRhU291cmNlLmRhdGEubGVuZ3RoID4gdGhpcy5tYXhTZWxlY3RlZCAmJiAhdGhpcy5jaGVja2VkXG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGNvbHVtbkRlZjogQ2RrQ29sdW1uRGVmLFxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGRhdGFUYWJsZTogTm92b0RhdGFUYWJsZTxUPixcbiAgICBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSB0b2FzdGVyOiBOb3ZvVG9hc3RTZXJ2aWNlLFxuICApIHtcbiAgICBzdXBlcihjb2x1bW5EZWYsIGVsZW1lbnRSZWYpO1xuICAgIHJlbmRlcmVyLnNldEF0dHJpYnV0ZShlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdkYXRhLWF1dG9tYXRpb24taWQnLCBgbm92by1jaGVja2JveC1jb2x1bW4taGVhZGVyLSR7Y29sdW1uRGVmLmNzc0NsYXNzRnJpZW5kbHlOYW1lfWApO1xuICAgIHJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgYG5vdm8tY2hlY2tib3gtY29sdW1uLSR7Y29sdW1uRGVmLmNzc0NsYXNzRnJpZW5kbHlOYW1lfWApO1xuICAgIHJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ25vdm8tZGF0YS10YWJsZS1jaGVja2JveC1oZWFkZXItY2VsbCcpO1xuXG4gICAgdGhpcy5zZWxlY3Rpb25TdWJzY3JpcHRpb24gPSB0aGlzLmRhdGFUYWJsZS5zdGF0ZS5zZWxlY3Rpb25Tb3VyY2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuY2hlY2tlZCA9IHRoaXMuZGF0YVRhYmxlLmFsbEN1cnJlbnRSb3dzU2VsZWN0ZWQoKTtcbiAgICAgIGlmICh0aGlzLmNhblNlbGVjdEFsbCkge1xuICAgICAgICB0aGlzLnNlbGVjdEFsbENoYW5nZWQoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICAgIHRoaXMucGFnaW5hdGlvblN1YnNjcmlwdGlvbiA9IHRoaXMuZGF0YVRhYmxlLnN0YXRlLnBhZ2luYXRpb25Tb3VyY2Uuc3Vic2NyaWJlKChldmVudDogeyBpc1BhZ2VTaXplQ2hhbmdlOiBib29sZWFuIH0pID0+IHtcbiAgICAgIGlmIChldmVudC5pc1BhZ2VTaXplQ2hhbmdlKSB7XG4gICAgICAgIHRoaXMuY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5jYW5TZWxlY3RBbGwpIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdEFsbENoYW5nZWQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGFUYWJsZS5zZWxlY3RSb3dzKGZhbHNlKTtcbiAgICAgICAgdGhpcy5kYXRhVGFibGUuc3RhdGUuY2hlY2tSZXRhaW5tZW50KCdwYWdlU2l6ZScpO1xuICAgICAgICB0aGlzLmRhdGFUYWJsZS5zdGF0ZS5yZXNldChmYWxzZSwgdHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNoZWNrZWQgPSB0aGlzLmRhdGFUYWJsZS5hbGxDdXJyZW50Um93c1NlbGVjdGVkKCk7XG4gICAgICAgIGlmICh0aGlzLmNhblNlbGVjdEFsbCkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0QWxsQ2hhbmdlZCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcbiAgICB0aGlzLnJlc2V0U3Vic2NyaXB0aW9uID0gdGhpcy5kYXRhVGFibGUuc3RhdGUucmVzZXRTb3VyY2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgaWYgKHRoaXMuY2FuU2VsZWN0QWxsKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0QWxsQ2hhbmdlZCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc2VsZWN0aW9uU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnNlbGVjdGlvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wYWdpbmF0aW9uU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnBhZ2luYXRpb25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucmVzZXRTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMucmVzZXRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb25DbGljaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc0F0TGltaXQpIHtcbiAgICAgIHRoaXMudG9hc3Rlci5hbGVydCh7XG4gICAgICAgIHRoZW1lOiAnZGFuZ2VyJyxcbiAgICAgICAgcG9zaXRpb246ICdmaXhlZFRvcCcsXG4gICAgICAgIG1lc3NhZ2U6ICdFcnJvciwgbW9yZSB0aGFuIDUwMCBpdGVtcyBhcmUgbm90IGFibGUgdG8gYmUgc2VsZWN0ZWQgYXQgb25lIHRpbWUnLFxuICAgICAgICBpY29uOiAnY2F1dGlvbicsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kYXRhVGFibGUuc2VsZWN0Um93cyghdGhpcy5jaGVja2VkKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY2FuU2VsZWN0QWxsKSB7XG4gICAgICB0aGlzLnNlbGVjdEFsbENoYW5nZWQoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0QWxsQ2hhbmdlZCgpOiB2b2lkIHtcbiAgICBjb25zdCBhbGxTZWxlY3RlZEV2ZW50ID0ge1xuICAgICAgYWxsU2VsZWN0ZWQ6IHRoaXMuY2hlY2tlZCxcbiAgICAgIHNlbGVjdGVkQ291bnQ6IHRoaXMuZGF0YVRhYmxlPy5zdGF0ZT8uc2VsZWN0ZWQ/Lmxlbmd0aCxcbiAgICB9O1xuICAgIHRoaXMuZGF0YVRhYmxlLmFsbFNlbGVjdGVkLmVtaXQoYWxsU2VsZWN0ZWRFdmVudCk7XG4gIH1cbn1cbiJdfQ==
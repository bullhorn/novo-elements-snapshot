/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ElementRef, Input, Renderer2, HostBinding, Component, ChangeDetectorRef, ChangeDetectionStrategy, } from '@angular/core';
import { CdkCell, CdkColumnDef } from '@angular/cdk/table';
import { NovoDataTable } from '../data-table.component';
/**
 * @template T
 */
export class NovoDataTableCheckboxCell extends CdkCell {
    /**
     * @param {?} columnDef
     * @param {?} elementRef
     * @param {?} renderer
     * @param {?} dataTable
     * @param {?} ref
     */
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
    /**
     * @return {?}
     */
    ngOnInit() {
        this.checked = this.dataTable.isSelected(this.row);
    }
    /**
     * @return {?}
     */
    onClick() {
        this.dataTable.selectRow(this.row);
    }
    /**
     * @return {?}
     */
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
            }] }
];
/** @nocollapse */
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
if (false) {
    /** @type {?} */
    NovoDataTableCheckboxCell.prototype.role;
    /** @type {?} */
    NovoDataTableCheckboxCell.prototype.row;
    /** @type {?} */
    NovoDataTableCheckboxCell.prototype.checked;
    /** @type {?} */
    NovoDataTableCheckboxCell.prototype.selectionSubscription;
    /** @type {?} */
    NovoDataTableCheckboxCell.prototype.resetSubscription;
    /** @type {?} */
    NovoDataTableCheckboxCell.prototype.columnDef;
    /** @type {?} */
    NovoDataTableCheckboxCell.prototype.dataTable;
    /** @type {?} */
    NovoDataTableCheckboxCell.prototype.ref;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1jaGVja2JveC1jZWxsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJlbGVtZW50cy9kYXRhLXRhYmxlL2NlbGxzL2RhdGEtdGFibGUtY2hlY2tib3gtY2VsbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxVQUFVLEVBQ1YsS0FBSyxFQUNMLFNBQVMsRUFDVCxXQUFXLEVBQ1gsU0FBUyxFQUdULGlCQUFpQixFQUNqQix1QkFBdUIsR0FDeEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUczRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7QUFnQnhELE1BQU0sT0FBTyx5QkFBNkIsU0FBUSxPQUFPOzs7Ozs7OztJQVl2RCxZQUNTLFNBQXVCLEVBQzlCLFVBQXNCLEVBQ3RCLFFBQW1CLEVBQ1osU0FBMkIsRUFDMUIsR0FBc0I7UUFFOUIsS0FBSyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQU50QixjQUFTLEdBQVQsU0FBUyxDQUFjO1FBR3ZCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQzFCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBZnpCLFNBQUksR0FBRyxVQUFVLENBQUM7UUFLbEIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQWE5QixRQUFRLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsb0JBQW9CLEVBQUUsd0JBQXdCLFNBQVMsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7UUFDaEksUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLHdCQUF3QixTQUFTLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO1FBQ3RHLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSwrQkFBK0IsQ0FBQyxDQUFDO1FBRTdFLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUMvRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ3ZFLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7O0lBRU0sUUFBUTtRQUNiLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JELENBQUM7Ozs7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Ozs7SUFFTSxXQUFXO1FBQ2hCLElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFFO1lBQzlCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUMxQztRQUNELElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzFCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QztJQUNILENBQUM7OztZQTlERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLCtCQUErQjtnQkFDekMsUUFBUSxFQUFFOzs7Ozs7OztLQVFQO2dCQUNILGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7O1lBbEJpQixZQUFZO1lBVjVCLFVBQVU7WUFFVixTQUFTO1lBV0YsYUFBYTtZQU5wQixpQkFBaUI7OzttQkF1QmhCLFdBQVcsU0FBQyxXQUFXO2tCQUd2QixLQUFLOzs7O0lBSE4seUNBQ3lCOztJQUV6Qix3Q0FDYzs7SUFFZCw0Q0FBZ0M7O0lBRWhDLDBEQUE0Qzs7SUFDNUMsc0RBQXdDOztJQUd0Qyw4Q0FBOEI7O0lBRzlCLDhDQUFrQzs7SUFDbEMsd0NBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIFJlbmRlcmVyMixcbiAgSG9zdEJpbmRpbmcsXG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDZGtDZWxsLCBDZGtDb2x1bW5EZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE5vdm9EYXRhVGFibGUgfSBmcm9tICcuLi9kYXRhLXRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRhVGFibGVTdGF0ZSB9IGZyb20gJy4uL3N0YXRlL2RhdGEtdGFibGUtc3RhdGUuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tZGF0YS10YWJsZS1jaGVja2JveC1jZWxsJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiZGF0YS10YWJsZS1jaGVja2JveFwiIChjbGljayk9XCJvbkNsaWNrKClcIj5cbiAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBbY2hlY2tlZF09XCJjaGVja2VkXCI+XG4gICAgICA8bGFiZWw+XG4gICAgICAgIDxpIFtjbGFzcy5iaGktY2hlY2tib3gtZW1wdHldPVwiIWNoZWNrZWRcIlxuICAgICAgICAgIFtjbGFzcy5iaGktY2hlY2tib3gtZmlsbGVkXT1cImNoZWNrZWRcIj48L2k+XG4gICAgICA8L2xhYmVsPlxuICAgIDwvZGl2PlxuICAgIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRGF0YVRhYmxlQ2hlY2tib3hDZWxsPFQ+IGV4dGVuZHMgQ2RrQ2VsbCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnJvbGUnKVxuICBwdWJsaWMgcm9sZSA9ICdncmlkY2VsbCc7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHJvdzogVDtcblxuICBwdWJsaWMgY2hlY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgc2VsZWN0aW9uU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgcmVzZXRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgY29sdW1uRGVmOiBDZGtDb2x1bW5EZWYsXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHB1YmxpYyBkYXRhVGFibGU6IE5vdm9EYXRhVGFibGU8VD4sXG4gICAgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICApIHtcbiAgICBzdXBlcihjb2x1bW5EZWYsIGVsZW1lbnRSZWYpO1xuICAgIHJlbmRlcmVyLnNldEF0dHJpYnV0ZShlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdkYXRhLWF1dG9tYXRpb24taWQnLCBgbm92by1jaGVja2JveC1jb2x1bW4tJHtjb2x1bW5EZWYuY3NzQ2xhc3NGcmllbmRseU5hbWV9YCk7XG4gICAgcmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBgbm92by1jaGVja2JveC1jb2x1bW4tJHtjb2x1bW5EZWYuY3NzQ2xhc3NGcmllbmRseU5hbWV9YCk7XG4gICAgcmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbm92by1kYXRhLXRhYmxlLWNoZWNrYm94LWNlbGwnKTtcblxuICAgIHRoaXMuc2VsZWN0aW9uU3Vic2NyaXB0aW9uID0gdGhpcy5kYXRhVGFibGUuc3RhdGUuc2VsZWN0aW9uU291cmNlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmNoZWNrZWQgPSB0aGlzLmRhdGFUYWJsZS5pc1NlbGVjdGVkKHRoaXMucm93KTtcbiAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICAgIHRoaXMucmVzZXRTdWJzY3JpcHRpb24gPSB0aGlzLmRhdGFUYWJsZS5zdGF0ZS5yZXNldFNvdXJjZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5jaGVja2VkID0gZmFsc2U7XG4gICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNoZWNrZWQgPSB0aGlzLmRhdGFUYWJsZS5pc1NlbGVjdGVkKHRoaXMucm93KTtcbiAgfVxuXG4gIHB1YmxpYyBvbkNsaWNrKCk6IHZvaWQge1xuICAgIHRoaXMuZGF0YVRhYmxlLnNlbGVjdFJvdyh0aGlzLnJvdyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc2VsZWN0aW9uU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnNlbGVjdGlvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5yZXNldFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5yZXNldFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxufVxuIl19
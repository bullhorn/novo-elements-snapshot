// NG2
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, Output } from '@angular/core';
// APP
import { NovoLabelService } from '../../../../services/novo-label-service';
export class Pagination {
    constructor(labels) {
        this.labels = labels;
        this.itemsPerPage = 10;
        this.pageChange = new EventEmitter();
        this.itemsPerPageChange = new EventEmitter();
        this.onPageChange = new EventEmitter();
        this.maxPagesDisplayed = 5;
    }
    get disablePageSelection() {
        return this.pageSelectDisabled;
    }
    set disablePageSelection(val) {
        this.pageSelectDisabled = coerceBooleanProperty(val);
    }
    ngOnInit() {
        this.label = this.label || this.labels.itemsPerPage;
        this.rowOptions = this.rowOptions || this.getDefaultRowOptions();
    }
    ngOnChanges(changes) {
        this.page = this.page || 1;
        this.totalPages = this.calculateTotalPages();
        this.pages = this.getPages(this.page, this.totalPages);
    }
    getDefaultRowOptions() {
        return [{ value: 10, label: '10' }, { value: 25, label: '25' }, { value: 50, label: '50' }, { value: 100, label: '100' }];
    }
    onPageSizeChanged(event) {
        this.page = 1;
        this.itemsPerPage = event.selected;
        this.totalPages = this.calculateTotalPages();
        this.pages = this.getPages(this.page, this.totalPages);
        this.pageChange.emit(this.page);
        this.itemsPerPageChange.emit(this.itemsPerPage);
        this.onPageChange.emit({
            page: this.page,
            itemsPerPage: this.itemsPerPage,
        });
    }
    selectPage(page, event) {
        if (event) {
            event.preventDefault();
        }
        this.page = page;
        this.pages = this.getPages(this.page, this.totalPages);
        this.pageChange.emit(this.page);
        this.onPageChange.emit({
            page: this.page,
            itemsPerPage: this.itemsPerPage,
        });
    }
    noPrevious() {
        return this.page === 1;
    }
    noNext() {
        return this.page === this.totalPages;
    }
    // Create page object used in template
    makePage(num, text, isActive) {
        return { num, text, active: isActive, };
    }
    getPages(currentPage, totalPages) {
        const pages = [];
        // Default page limits
        let startPage = 1;
        let endPage = totalPages;
        const isMaxSized = this.maxPagesDisplayed < totalPages;
        // recompute if maxPagesDisplayed
        if (isMaxSized) {
            // Current page is displayed in the middle of the visible ones
            startPage = Math.max(currentPage - Math.floor(this.maxPagesDisplayed / 2), 1);
            endPage = startPage + this.maxPagesDisplayed - 1;
            // Adjust if limit is exceeded
            if (endPage > totalPages) {
                endPage = totalPages;
                startPage = endPage - this.maxPagesDisplayed + 1;
            }
        }
        // Add page number links
        for (let num = startPage; num <= endPage; num++) {
            const page = this.makePage(num, num.toString(), num === currentPage);
            pages.push(page);
        }
        return pages;
    }
    calculateTotalPages() {
        const totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil(this.totalItems / this.itemsPerPage);
        return Math.max(totalPages || 0, 1);
    }
}
Pagination.decorators = [
    { type: Component, args: [{
                selector: 'novo-pagination',
                template: `
        <h5 class="rows">{{label}}</h5>
        <novo-select [options]="rowOptions" [placeholder]="labels.select" [(ngModel)]="itemsPerPage" (onSelect)="onPageSizeChanged($event)" data-automation-id="pager-select"></novo-select>
        <span class="spacer"></span>
        <ul class="pager" data-automation-id="pager">
            <li class="page" (click)="selectPage(page-1)" [ngClass]="{'disabled': noPrevious()}"><i class="bhi-previous" data-automation-id="pager-previous"></i></li>
            <li class="page" [ngClass]="{active: p.active}" [class.disabled]="disablePageSelection" *ngFor="let p of pages" (click)="selectPage(p.num, $event)">{{p.text}}</li>
            <li class="page" (click)="selectPage(page+1)" [ngClass]="{'disabled': noNext()}"><i class="bhi-next" data-automation-id="pager-next"></i></li>
        </ul>
  `
            },] }
];
Pagination.ctorParameters = () => [
    { type: NovoLabelService }
];
Pagination.propDecorators = {
    page: [{ type: Input }],
    totalItems: [{ type: Input }],
    itemsPerPage: [{ type: Input }],
    rowOptions: [{ type: Input }],
    label: [{ type: Input }],
    disablePageSelection: [{ type: Input }],
    pageChange: [{ type: Output }],
    itemsPerPageChange: [{ type: Output }],
    onPageChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvdGFibGUvZXh0cmFzL3BhZ2luYXRpb24vUGFnaW5hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3pHLE1BQU07QUFDTixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQW9CM0UsTUFBTSxPQUFPLFVBQVU7SUE4QnJCLFlBQW1CLE1BQXdCO1FBQXhCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBeEIzQyxpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQWFsQixlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVoQyx1QkFBa0IsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXhDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUdsQyxzQkFBaUIsR0FBRyxDQUFDLENBQUM7SUFJeUIsQ0FBQztJQW5CaEQsSUFDSSxvQkFBb0I7UUFDdEIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUM7SUFDakMsQ0FBQztJQUNELElBQUksb0JBQW9CLENBQUMsR0FBWTtRQUNuQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQWVELFFBQVE7UUFDTixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7UUFDcEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMs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QUFDLENBQUMsQ0FBQztJQUN0QyxDQUFDOzs7WUFuSUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFFBQVEsRUFBRTs7Ozs7Ozs7O0dBU1Q7YUFDRjs7O1lBbkJRLGdCQUFnQjs7O21CQXFCdEIsS0FBSzt5QkFFTCxLQUFLOzJCQUVMLEtBQUs7eUJBRUwsS0FBSztvQkFFTCxLQUFLO21DQUVMLEtBQUs7eUJBT0wsTUFBTTtpQ0FFTixNQUFNOzJCQUVOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcclxuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbi8vIEFQUFxyXG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2VydmljZXMvbm92by1sYWJlbC1zZXJ2aWNlJztcclxuXHJcbmludGVyZmFjZSBQYWdlIHtcclxuICBudW06IG51bWJlcjtcclxuICB0ZXh0OiBzdHJpbmc7XHJcbiAgYWN0aXZlOiBib29sZWFuO1xyXG59XHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbm92by1wYWdpbmF0aW9uJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxoNSBjbGFzcz1cInJvd3NcIj57e2xhYmVsfX08L2g1PlxyXG4gICAgICAgIDxub3ZvLXNlbGVjdCBbb3B0aW9uc109XCJyb3dPcHRpb25zXCIgW3BsYWNlaG9sZGVyXT1cImxhYmVscy5zZWxlY3RcIiBbKG5nTW9kZWwpXT1cIml0ZW1zUGVyUGFnZVwiIChvblNlbGVjdCk9XCJvblBhZ2VTaXplQ2hhbmdlZCgkZXZlbnQpXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwicGFnZXItc2VsZWN0XCI+PC9ub3ZvLXNlbGVjdD5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cInNwYWNlclwiPjwvc3Bhbj5cclxuICAgICAgICA8dWwgY2xhc3M9XCJwYWdlclwiIGRhdGEtYXV0b21hdGlvbi1pZD1cInBhZ2VyXCI+XHJcbiAgICAgICAgICAgIDxsaSBjbGFzcz1cInBhZ2VcIiAoY2xpY2spPVwic2VsZWN0UGFnZShwYWdlLTEpXCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IG5vUHJldmlvdXMoKX1cIj48aSBjbGFzcz1cImJoaS1wcmV2aW91c1wiIGRhdGEtYXV0b21hdGlvbi1pZD1cInBhZ2VyLXByZXZpb3VzXCI+PC9pPjwvbGk+XHJcbiAgICAgICAgICAgIDxsaSBjbGFzcz1cInBhZ2VcIiBbbmdDbGFzc109XCJ7YWN0aXZlOiBwLmFjdGl2ZX1cIiBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZVBhZ2VTZWxlY3Rpb25cIiAqbmdGb3I9XCJsZXQgcCBvZiBwYWdlc1wiIChjbGljayk9XCJzZWxlY3RQYWdlKHAubnVtLCAkZXZlbnQpXCI+e3twLnRleHR9fTwvbGk+XHJcbiAgICAgICAgICAgIDxsaSBjbGFzcz1cInBhZ2VcIiAoY2xpY2spPVwic2VsZWN0UGFnZShwYWdlKzEpXCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IG5vTmV4dCgpfVwiPjxpIGNsYXNzPVwiYmhpLW5leHRcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJwYWdlci1uZXh0XCI+PC9pPjwvbGk+XHJcbiAgICAgICAgPC91bD5cclxuICBgLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGFnaW5hdGlvbiBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKVxyXG4gIHBhZ2U6IG51bWJlcjtcclxuICBASW5wdXQoKVxyXG4gIHRvdGFsSXRlbXM6IG51bWJlcjtcclxuICBASW5wdXQoKVxyXG4gIGl0ZW1zUGVyUGFnZSA9IDEwO1xyXG4gIEBJbnB1dCgpXHJcbiAgcm93T3B0aW9ucztcclxuICBASW5wdXQoKVxyXG4gIGxhYmVsOiBzdHJpbmc7XHJcbiAgQElucHV0KClcclxuICBnZXQgZGlzYWJsZVBhZ2VTZWxlY3Rpb24oKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5wYWdlU2VsZWN0RGlzYWJsZWQ7XHJcbiAgfVxyXG4gIHNldCBkaXNhYmxlUGFnZVNlbGVjdGlvbih2YWw6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMucGFnZVNlbGVjdERpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbCk7XHJcbiAgfVxyXG4gIEBPdXRwdXQoKVxyXG4gIHBhZ2VDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpXHJcbiAgaXRlbXNQZXJQYWdlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKVxyXG4gIG9uUGFnZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgcHVibGljIHBhZ2VTZWxlY3REaXNhYmxlZDogYm9vbGVhbjtcclxuICBtYXhQYWdlc0Rpc3BsYXllZCA9IDU7XHJcbiAgdG90YWxQYWdlczogbnVtYmVyO1xyXG4gIHBhZ2VzOiBBcnJheTxQYWdlPjtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5sYWJlbCA9IHRoaXMubGFiZWwgfHwgdGhpcy5sYWJlbHMuaXRlbXNQZXJQYWdlO1xyXG4gICAgdGhpcy5yb3dPcHRpb25zID0gdGhpcy5yb3dPcHRpb25zIHx8IHRoaXMuZ2V0RGVmYXVsdFJvd09wdGlvbnMoKTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM/OiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICB0aGlzLnBhZ2UgPSB0aGlzLnBhZ2UgfHwgMTtcclxuICAgIHRoaXMudG90YWxQYWdlcyA9IHRoaXMuY2FsY3VsYXRlVG90YWxQYWdlcygpO1xyXG4gICAgdGhpcy5wYWdlcyA9IHRoaXMuZ2V0UGFnZXModGhpcy5wYWdlLCB0aGlzLnRvdGFsUGFnZXMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGVmYXVsdFJvd09wdGlvbnMoKSB7XHJcbiAgICByZXR1cm4gW3sgdmFsdWU6IDEwLCBsYWJlbDogJzEwJyB9LCB7IHZhbHVlOiAyNSwgbGFiZWw6ICcyNScgfSwgeyB2YWx1ZTogNTAsIGxhYmVsOiAnNTAnIH0sIHsgdmFsdWU6IDEwMCwgbGFiZWw6ICcxMDAnIH1dO1xyXG4gIH1cclxuXHJcbiAgb25QYWdlU2l6ZUNoYW5nZWQoZXZlbnQpIHtcclxuICAgIHRoaXMucGFnZSA9IDE7XHJcbiAgICB0aGlzLml0ZW1zUGVyUGFnZSA9IGV2ZW50LnNlbGVjdGVkO1xyXG4gICAgdGhpcy50b3RhbFBhZ2VzID0gdGhpcy5jYWxjdWxhdGVUb3RhbFBhZ2VzKCk7XHJcbiAgICB0aGlzLnBhZ2VzID0gdGhpcy5nZXRQYWdlcyh0aGlzLnBhZ2UsIHRoaXMudG90YWxQYWdlcyk7XHJcbiAgICB0aGlzLnBhZ2VDaGFuZ2UuZW1pdCh0aGlzLnBhZ2UpO1xyXG4gICAgdGhpcy5pdGVtc1BlclBhZ2VDaGFuZ2UuZW1pdCh0aGlzLml0ZW1zUGVyUGFnZSk7XHJcbiAgICB0aGlzLm9uUGFnZUNoYW5nZS5lbWl0KHtcclxuICAgICAgcGFnZTogdGhpcy5wYWdlLFxyXG4gICAgICBpdGVtc1BlclBhZ2U6IHRoaXMuaXRlbXNQZXJQYWdlLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZWxlY3RQYWdlKHBhZ2U6IG51bWJlciwgZXZlbnQ/OiBNb3VzZUV2ZW50KSB7XHJcbiAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnBhZ2UgPSBwYWdlO1xyXG4gICAgdGhpcy5wYWdlcyA9IHRoaXMuZ2V0UGFnZXModGhpcy5wYWdlLCB0aGlzLnRvdGFsUGFnZXMpO1xyXG4gICAgdGhpcy5wYWdlQ2hhbmdlLmVtaXQodGhpcy5wYWdlKTtcclxuICAgIHRoaXMub25QYWdlQ2hhbmdlLmVtaXQoe1xyXG4gICAgICBwYWdlOiB0aGlzLnBhZ2UsXHJcbiAgICAgIGl0ZW1zUGVyUGFnZTogdGhpcy5pdGVtc1BlclBhZ2UsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5vUHJldmlvdXMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wYWdlID09PSAxO1xyXG4gIH1cclxuXHJcbiAgbm9OZXh0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMucGFnZSA9PT0gdGhpcy50b3RhbFBhZ2VzO1xyXG4gIH1cclxuXHJcbiAgLy8gQ3JlYXRlIHBhZ2Ugb2JqZWN0IHVzZWQgaW4gdGVtcGxhdGVcclxuICBtYWtlUGFnZShudW06IG51bWJlciwgdGV4dDogc3RyaW5nLCBpc0FjdGl2ZTogYm9vbGVhbikge1xyXG4gICAgcmV0dXJuIHsgbnVtLCB0ZXh0LCBhY3RpdmU6IGlzQWN0aXZlLCB9IGFzIFBhZ2U7XHJcbiAgfVxyXG5cclxuICBnZXRQYWdlcyhjdXJyZW50UGFnZTogbnVtYmVyLCB0b3RhbFBhZ2VzOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHBhZ2VzOiBBcnJheTxQYWdlPiA9IFtdO1xyXG4gICAgLy8gRGVmYXVsdCBwYWdlIGxpbWl0c1xyXG4gICAgbGV0IHN0YXJ0UGFnZSA9IDE7XHJcbiAgICBsZXQgZW5kUGFnZSA9IHRvdGFsUGFnZXM7XHJcbiAgICBjb25zdCBpc01heFNpemVkID0gdGhpcy5tYXhQYWdlc0Rpc3BsYXllZCA8IHRvdGFsUGFnZXM7XHJcblxyXG4gICAgLy8gcmVjb21wdXRlIGlmIG1heFBhZ2VzRGlzcGxheWVkXHJcbiAgICBpZiAoaXNNYXhTaXplZCkge1xyXG4gICAgICAvLyBDdXJyZW50IHBhZ2UgaXMgZGlzcGxheWVkIGluIHRoZSBtaWRkbGUgb2YgdGhlIHZpc2libGUgb25lc1xyXG4gICAgICBzdGFydFBhZ2UgPSBNYXRoLm1heChjdXJyZW50UGFnZSAtIE1hdGguZmxvb3IodGhpcy5tYXhQYWdlc0Rpc3BsYXllZCAvIDIpLCAxKTtcclxuICAgICAgZW5kUGFnZSA9IHN0YXJ0UGFnZSArIHRoaXMubWF4UGFnZXNEaXNwbGF5ZWQgLSAxO1xyXG5cclxuICAgICAgLy8gQWRqdXN0IGlmIGxpbWl0IGlzIGV4Y2VlZGVkXHJcbiAgICAgIGlmIChlbmRQYWdlID4gdG90YWxQYWdlcykge1xyXG4gICAgICAgIGVuZFBhZ2UgPSB0b3RhbFBhZ2VzO1xyXG4gICAgICAgIHN0YXJ0UGFnZSA9IGVuZFBhZ2UgLSB0aGlzLm1heFBhZ2VzRGlzcGxheWVkICsgMTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEFkZCBwYWdlIG51bWJlciBsaW5rc1xyXG4gICAgZm9yIChsZXQgbnVtID0gc3RhcnRQYWdlOyBudW0gPD0gZW5kUGFnZTsgbnVtKyspIHtcclxuICAgICAgY29uc3QgcGFnZSA9IHRoaXMubWFrZVBhZ2UobnVtLCBudW0udG9TdHJpbmcoKSwgbnVtID09PSBjdXJyZW50UGFnZSk7XHJcbiAgICAgIHBhZ2VzLnB1c2gocGFnZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGFnZXM7XHJcbiAgfVxyXG5cclxuICBjYWxjdWxhdGVUb3RhbFBhZ2VzKCkge1xyXG4gICAgY29uc3QgdG90YWxQYWdlcyA9IHRoaXMuaXRlbXNQZXJQYWdlIDwgMSA/IDEgOiBNYXRoLmNlaWwodGhpcy50b3RhbEl0ZW1zIC8gdGhpcy5pdGVtc1BlclBhZ2UpO1xyXG4gICAgcmV0dXJuIE1hdGgubWF4KHRvdGFsUGFnZXMgfHwgMCwgMSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
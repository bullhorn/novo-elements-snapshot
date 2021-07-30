import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, HostBinding, } from '@angular/core';
import { NovoLabelService } from '../../../services/novo-label-service';
import { DataTableState } from '../state/data-table-state.service';
const MAX_PAGES_DISPLAYED = 5;
export class NovoDataTablePagination {
    constructor(changeDetectorRef, labels, state) {
        this.changeDetectorRef = changeDetectorRef;
        this.labels = labels;
        this.state = state;
        this.theme = 'standard';
        this._page = 0;
        this._pageSizeOptions = [];
        this._length = 0;
        this.pageChange = new EventEmitter();
        this.resetSubscription = this.state.resetSource.subscribe(() => {
            this.page = 0;
            this.changeDetectorRef.markForCheck();
        });
    }
    get page() {
        return this._page;
    }
    set page(page) {
        this._page = page;
        this.changeDetectorRef.markForCheck();
        this.longRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, false);
        this.shortRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, true);
        this.state.page = this._page;
    }
    get pageSize() {
        return this._pageSize;
    }
    set pageSize(pageSize) {
        this._pageSize = pageSize;
        this.updateDisplayedPageSizeOptions();
        this.state.pageSize = this._pageSize;
    }
    get pageSizeOptions() {
        return this._pageSizeOptions;
    }
    set pageSizeOptions(pageSizeOptions) {
        this._pageSizeOptions = pageSizeOptions;
        this.updateDisplayedPageSizeOptions();
    }
    get length() {
        return this._length;
    }
    set length(length) {
        this._length = length;
        this.changeDetectorRef.markForCheck();
        this.longRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, false);
        this.shortRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, true);
        this.totalPages = this.calculateTotalPages();
        this.pages = this.getPages(this.page, this.totalPages);
    }
    ngOnInit() {
        this._initialized = true;
        this.updateDisplayedPageSizeOptions();
    }
    ngOnDestroy() {
        this.resetSubscription.unsubscribe();
    }
    selectPage(page) {
        this.page = page;
        this.emitPageEvent();
    }
    nextPage() {
        if (!this.hasNextPage()) {
            return;
        }
        this.page++;
        this.pages = this.getPages(this.page, this.totalPages);
        this.emitPageEvent();
    }
    previousPage() {
        if (!this.hasPreviousPage()) {
            return;
        }
        this.page--;
        this.pages = this.getPages(this.page, this.totalPages);
        this.emitPageEvent();
    }
    hasPreviousPage() {
        return this.page >= 1 && this.pageSize !== 0;
    }
    hasNextPage() {
        const numberOfPages = Math.ceil(this.length / this.pageSize) - 1;
        return this.page < numberOfPages && this.pageSize !== 0;
    }
    changePageSize(pageSize) {
        this.page = 0;
        this.pageSize = pageSize;
        this.emitPageEvent(true);
    }
    updateDisplayedPageSizeOptions() {
        if (!this._initialized) {
            return;
        }
        if (!this.displayedPageSizeOptions) {
            this.displayedPageSizeOptions = [];
            this.pageSizeOptions.forEach((option) => {
                if (option.hasOwnProperty('value')) {
                    this.displayedPageSizeOptions.push(option);
                }
                else {
                    this.displayedPageSizeOptions.push({
                        value: option,
                        label: option,
                    });
                }
            });
        }
        this.longRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, false);
        this.shortRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, true);
        this.totalPages = this.calculateTotalPages();
        this.pages = this.getPages(this.page, this.totalPages);
        this.changeDetectorRef.detectChanges();
    }
    emitPageEvent(isPageSizeChange = false) {
        const event = {
            page: this.page,
            pageSize: this.pageSize,
            length: this.length,
            filter: this.state.filter,
            sort: this.state.sort,
        };
        this.pageChange.next(event);
        this.state.page = this.page;
        this.state.pageSize = this.pageSize;
        this.longRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, false);
        this.shortRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, true);
        this.totalPages = this.calculateTotalPages();
        this.pages = this.getPages(this.page, this.totalPages);
        this.state.updates.next(event);
        this.state.onPaginationChange(isPageSizeChange, this.pageSize);
    }
    calculateTotalPages() {
        const totalPages = this.pageSize < 1 ? 1 : Math.ceil(this.length / this.pageSize);
        return Math.max(totalPages || 0, 1);
    }
    makePage(number, text, isActive) {
        return {
            number,
            text,
            active: isActive,
        };
    }
    getPages(currentPage, totalPages) {
        const pages = [];
        // Default page limits
        let startPage = 1;
        let endPage = totalPages;
        const isMaxSized = MAX_PAGES_DISPLAYED < totalPages;
        // Recompute if maxPagesDisplayed
        if (isMaxSized) {
            // Current page is displayed in the middle of the visible ones
            startPage = Math.max(currentPage - Math.floor(MAX_PAGES_DISPLAYED / 2), 1);
            endPage = startPage + MAX_PAGES_DISPLAYED - 1;
            // Adjust if limit is exceeded
            if (endPage > totalPages) {
                endPage = totalPages;
                startPage = endPage - MAX_PAGES_DISPLAYED + 1;
            }
        }
        // Add page number links
        for (let number = startPage; number <= endPage; number++) {
            const page = this.makePage(number, number.toString(), number === currentPage);
            pages.push(page);
        }
        return pages;
    }
}
NovoDataTablePagination.decorators = [
    { type: Component, args: [{
                selector: 'novo-data-table-pagination',
                template: `
      <ng-container *ngIf="theme === 'basic' || theme === 'basic-wide'">
        <div class="novo-data-table-pagination-size">
            <novo-tiles *ngIf="displayedPageSizeOptions.length > 1"
                        [(ngModel)]="pageSize"
                        [options]="displayedPageSizeOptions"
                        (onChange)="changePageSize($event)"
                        data-automation-id="novo-data-table-pagination-tiles">
            </novo-tiles>
            <div *ngIf="displayedPageSizeOptions.length <= 1">{{ pageSize }}</div>
        </div>

        <div class="novo-data-table-range-label-long" data-automation-id="novo-data-table-pagination-range-label-long">
            {{ longRangeLabel }}
        </div>
        <div class="novo-data-table-range-label-short" data-automation-id="novo-data-table-pagination-range-label-short">
            {{ shortRangeLabel }}
        </div>
        <span class="spacer novo-data-table-spacer" *ngIf="theme === 'basic-wide'"></span>
        <button theme="dialogue" type="button"
                class="novo-data-table-pagination-navigation-previous"
                (click)="previousPage()"
                icon="previous"
                side="left"
                [disabled]="!hasPreviousPage()"
                data-automation-id="novo-data-table-pagination-previous">
            <span>{{ labels.previous }}</span>
        </button>
        <button theme="dialogue" type="button"
                class="novo-data-table-pagination-navigation-next"
                (click)="nextPage()"
                icon="next"
                side="right"
                [disabled]="!hasNextPage()"
                data-automation-id="novo-data-table-pagination-next">
            <span>{{ labels.next }}</span>
        </button>
      </ng-container>
      <ng-container *ngIf="theme === 'standard'">
        <h5 class="rows">{{ labels.itemsPerPage }}</h5>
        <novo-select
          [options]="displayedPageSizeOptions"
          [placeholder]="labels.select"
          [(ngModel)]="pageSize"
          (onSelect)="changePageSize($event.selected)"
          data-automation-id="pager-select"
          [attr.data-feature-id]="dataFeatureId">
        </novo-select>
        <span class="spacer"></span>
        <ul class="pager" data-automation-id="pager">
            <li class="page" (click)="selectPage(page - 1)" [ngClass]="{ 'disabled': page === 0 }"><i class="bhi-previous" data-automation-id="pager-previous"></i></li>
            <li class="page" [ngClass]="{active: p.number === page + 1}" *ngFor="let p of pages" (click)="selectPage(p.number - 1)">{{ p.text }}</li>
            <li class="page" (click)="selectPage(page + 1)" [ngClass]="{ 'disabled': page + 1 === totalPages }"><i class="bhi-next" data-automation-id="pager-next"></i></li>
        </ul>
      </ng-container>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
NovoDataTablePagination.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NovoLabelService },
    { type: DataTableState }
];
NovoDataTablePagination.propDecorators = {
    theme: [{ type: HostBinding, args: ['class',] }, { type: Input }],
    page: [{ type: Input }],
    pageSize: [{ type: Input }],
    dataFeatureId: [{ type: Input }],
    pageSizeOptions: [{ type: Input }],
    length: [{ type: Input }],
    pageChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1wYWdpbmF0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvZGF0YS10YWJsZS9wYWdpbmF0aW9uL2RhdGEtdGFibGUtcGFnaW5hdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUNOLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUl2QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFbkUsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLENBQUM7QUE4RDlCLE1BQU0sT0FBTyx1QkFBdUI7SUFpRWxDLFlBQW9CLGlCQUFvQyxFQUFTLE1BQXdCLEVBQVUsS0FBd0I7UUFBdkcsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUFTLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUE5RDNILFVBQUssR0FBVyxVQUFVLENBQUM7UUFhM0IsVUFBSyxHQUFXLENBQUMsQ0FBQztRQXNCVixxQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFjOUIsWUFBTyxHQUFXLENBQUMsQ0FBQztRQUVWLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBNkIsQ0FBQztRQVluRSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUM3RCxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztZQUNkLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZ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TUFBTSxFQUFFLEVBQUU7WUFDeEQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQztZQUM5RSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2xCO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7WUF0UUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw0QkFBNEI7Z0JBQ3RDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVEVDtnQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7O1lBNUVDLGlCQUFpQjtZQVlWLGdCQUFnQjtZQUNoQixjQUFjOzs7b0JBaUVwQixXQUFXLFNBQUMsT0FBTyxjQUNuQixLQUFLO21CQUdMLEtBQUs7dUJBYUwsS0FBSzs0QkFVTCxLQUFLOzhCQUVMLEtBQUs7cUJBVUwsS0FBSzt5QkFjTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDb21wb25lbnQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIElucHV0LFxyXG4gIE9uRGVzdHJveSxcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0LFxyXG4gIEhvc3RCaW5kaW5nLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IElEYXRhVGFibGVQYWdpbmF0aW9uRXZlbnQgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XHJcbmltcG9ydCB7IERhdGFUYWJsZVN0YXRlIH0gZnJvbSAnLi4vc3RhdGUvZGF0YS10YWJsZS1zdGF0ZS5zZXJ2aWNlJztcclxuXHJcbmNvbnN0IE1BWF9QQUdFU19ESVNQTEFZRUQgPSA1O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLWRhdGEtdGFibGUtcGFnaW5hdGlvbicsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInRoZW1lID09PSAnYmFzaWMnIHx8IHRoZW1lID09PSAnYmFzaWMtd2lkZSdcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibm92by1kYXRhLXRhYmxlLXBhZ2luYXRpb24tc2l6ZVwiPlxyXG4gICAgICAgICAgICA8bm92by10aWxlcyAqbmdJZj1cImRpc3BsYXllZFBhZ2VTaXplT3B0aW9ucy5sZW5ndGggPiAxXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJwYWdlU2l6ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtvcHRpb25zXT1cImRpc3BsYXllZFBhZ2VTaXplT3B0aW9uc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChvbkNoYW5nZSk9XCJjaGFuZ2VQYWdlU2l6ZSgkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by1kYXRhLXRhYmxlLXBhZ2luYXRpb24tdGlsZXNcIj5cclxuICAgICAgICAgICAgPC9ub3ZvLXRpbGVzPlxyXG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiZGlzcGxheWVkUGFnZVNpemVPcHRpb25zLmxlbmd0aCA8PSAxXCI+e3sgcGFnZVNpemUgfX08L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tZGF0YS10YWJsZS1yYW5nZS1sYWJlbC1sb25nXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by1kYXRhLXRhYmxlLXBhZ2luYXRpb24tcmFuZ2UtbGFiZWwtbG9uZ1wiPlxyXG4gICAgICAgICAgICB7eyBsb25nUmFuZ2VMYWJlbCB9fVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJub3ZvLWRhdGEtdGFibGUtcmFuZ2UtbGFiZWwtc2hvcnRcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLWRhdGEtdGFibGUtcGFnaW5hdGlvbi1yYW5nZS1sYWJlbC1zaG9ydFwiPlxyXG4gICAgICAgICAgICB7eyBzaG9ydFJhbmdlTGFiZWwgfX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cInNwYWNlciBub3ZvLWRhdGEtdGFibGUtc3BhY2VyXCIgKm5nSWY9XCJ0aGVtZSA9PT0gJ2Jhc2ljLXdpZGUnXCI+PC9zcGFuPlxyXG4gICAgICAgIDxidXR0b24gdGhlbWU9XCJkaWFsb2d1ZVwiIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJub3ZvLWRhdGEtdGFibGUtcGFnaW5hdGlvbi1uYXZpZ2F0aW9uLXByZXZpb3VzXCJcclxuICAgICAgICAgICAgICAgIChjbGljayk9XCJwcmV2aW91c1BhZ2UoKVwiXHJcbiAgICAgICAgICAgICAgICBpY29uPVwicHJldmlvdXNcIlxyXG4gICAgICAgICAgICAgICAgc2lkZT1cImxlZnRcIlxyXG4gICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cIiFoYXNQcmV2aW91c1BhZ2UoKVwiXHJcbiAgICAgICAgICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLWRhdGEtdGFibGUtcGFnaW5hdGlvbi1wcmV2aW91c1wiPlxyXG4gICAgICAgICAgICA8c3Bhbj57eyBsYWJlbHMucHJldmlvdXMgfX08L3NwYW4+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiB0aGVtZT1cImRpYWxvZ3VlXCIgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICBjbGFzcz1cIm5vdm8tZGF0YS10YWJsZS1wYWdpbmF0aW9uLW5hdmlnYXRpb24tbmV4dFwiXHJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwibmV4dFBhZ2UoKVwiXHJcbiAgICAgICAgICAgICAgICBpY29uPVwibmV4dFwiXHJcbiAgICAgICAgICAgICAgICBzaWRlPVwicmlnaHRcIlxyXG4gICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cIiFoYXNOZXh0UGFnZSgpXCJcclxuICAgICAgICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tZGF0YS10YWJsZS1wYWdpbmF0aW9uLW5leHRcIj5cclxuICAgICAgICAgICAgPHNwYW4+e3sgbGFiZWxzLm5leHQgfX08L3NwYW4+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwidGhlbWUgPT09ICdzdGFuZGFyZCdcIj5cclxuICAgICAgICA8aDUgY2xhc3M9XCJyb3dzXCI+e3sgbGFiZWxzLml0ZW1zUGVyUGFnZSB9fTwvaDU+XHJcbiAgICAgICAgPG5vdm8tc2VsZWN0XHJcbiAgICAgICAgICBbb3B0aW9uc109XCJkaXNwbGF5ZWRQYWdlU2l6ZU9wdGlvbnNcIlxyXG4gICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImxhYmVscy5zZWxlY3RcIlxyXG4gICAgICAgICAgWyhuZ01vZGVsKV09XCJwYWdlU2l6ZVwiXHJcbiAgICAgICAgICAob25TZWxlY3QpPVwiY2hhbmdlUGFnZVNpemUoJGV2ZW50LnNlbGVjdGVkKVwiXHJcbiAgICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJwYWdlci1zZWxlY3RcIlxyXG4gICAgICAgICAgW2F0dHIuZGF0YS1mZWF0dXJlLWlkXT1cImRhdGFGZWF0dXJlSWRcIj5cclxuICAgICAgICA8L25vdm8tc2VsZWN0PlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwic3BhY2VyXCI+PC9zcGFuPlxyXG4gICAgICAgIDx1bCBjbGFzcz1cInBhZ2VyXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwicGFnZXJcIj5cclxuICAgICAgICAgICAgPGxpIGNsYXNzPVwicGFnZVwiIChjbGljayk9XCJzZWxlY3RQYWdlKHBhZ2UgLSAxKVwiIFtuZ0NsYXNzXT1cInsgJ2Rpc2FibGVkJzogcGFnZSA9PT0gMCB9XCI+PGkgY2xhc3M9XCJiaGktcHJldmlvdXNcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJwYWdlci1wcmV2aW91c1wiPjwvaT48L2xpPlxyXG4gICAgICAgICAgICA8bGkgY2xhc3M9XCJwYWdlXCIgW25nQ2xhc3NdPVwie2FjdGl2ZTogcC5udW1iZXIgPT09IHBhZ2UgKyAxfVwiICpuZ0Zvcj1cImxldCBwIG9mIHBhZ2VzXCIgKGNsaWNrKT1cInNlbGVjdFBhZ2UocC5udW1iZXIgLSAxKVwiPnt7IHAudGV4dCB9fTwvbGk+XHJcbiAgICAgICAgICAgIDxsaSBjbGFzcz1cInBhZ2VcIiAoY2xpY2spPVwic2VsZWN0UGFnZShwYWdlICsgMSlcIiBbbmdDbGFzc109XCJ7ICdkaXNhYmxlZCc6IHBhZ2UgKyAxID09PSB0b3RhbFBhZ2VzIH1cIj48aSBjbGFzcz1cImJoaS1uZXh0XCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwicGFnZXItbmV4dFwiPjwvaT48L2xpPlxyXG4gICAgICAgIDwvdWw+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gIGAsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvRGF0YVRhYmxlUGFnaW5hdGlvbjxUPiBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcclxuICBASW5wdXQoKVxyXG4gIHRoZW1lOiBzdHJpbmcgPSAnc3RhbmRhcmQnO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBwYWdlKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fcGFnZTtcclxuICB9XHJcbiAgc2V0IHBhZ2UocGFnZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9wYWdlID0gcGFnZTtcclxuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICB0aGlzLmxvbmdSYW5nZUxhYmVsID0gdGhpcy5sYWJlbHMuZ2V0UmFuZ2VUZXh0KHRoaXMucGFnZSwgdGhpcy5wYWdlU2l6ZSwgdGhpcy5sZW5ndGgsIGZhbHNlKTtcclxuICAgIHRoaXMuc2hvcnRSYW5nZUxhYmVsID0gdGhpcy5sYWJlbHMuZ2V0UmFuZ2VUZXh0KHRoaXMucGFnZSwgdGhpcy5wYWdlU2l6ZSwgdGhpcy5sZW5ndGgsIHRydWUpO1xyXG4gICAgdGhpcy5zdGF0ZS5wYWdlID0gdGhpcy5fcGFnZTtcclxuICB9XHJcbiAgX3BhZ2U6IG51bWJlciA9IDA7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHBhZ2VTaXplKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fcGFnZVNpemU7XHJcbiAgfVxyXG4gIHNldCBwYWdlU2l6ZShwYWdlU2l6ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9wYWdlU2l6ZSA9IHBhZ2VTaXplO1xyXG4gICAgdGhpcy51cGRhdGVEaXNwbGF5ZWRQYWdlU2l6ZU9wdGlvbnMoKTtcclxuICAgIHRoaXMuc3RhdGUucGFnZVNpemUgPSB0aGlzLl9wYWdlU2l6ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfcGFnZVNpemU6IG51bWJlcjtcclxuICBASW5wdXQoKSBkYXRhRmVhdHVyZUlkOiBzdHJpbmc7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHBhZ2VTaXplT3B0aW9ucygpIHtcclxuICAgIHJldHVybiB0aGlzLl9wYWdlU2l6ZU9wdGlvbnM7XHJcbiAgfVxyXG4gIHNldCBwYWdlU2l6ZU9wdGlvbnMocGFnZVNpemVPcHRpb25zOiBhbnlbXSkge1xyXG4gICAgdGhpcy5fcGFnZVNpemVPcHRpb25zID0gcGFnZVNpemVPcHRpb25zO1xyXG4gICAgdGhpcy51cGRhdGVEaXNwbGF5ZWRQYWdlU2l6ZU9wdGlvbnMoKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfcGFnZVNpemVPcHRpb25zID0gW107XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGxlbmd0aCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xlbmd0aDtcclxuICB9XHJcbiAgc2V0IGxlbmd0aChsZW5ndGg6IG51bWJlcikge1xyXG4gICAgdGhpcy5fbGVuZ3RoID0gbGVuZ3RoO1xyXG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICAgIHRoaXMubG9uZ1JhbmdlTGFiZWwgPSB0aGlzLmxhYmVscy5nZXRSYW5nZVRleHQodGhpcy5wYWdlLCB0aGlzLnBhZ2VTaXplLCB0aGlzLmxlbmd0aCwgZmFsc2UpO1xyXG4gICAgdGhpcy5zaG9ydFJhbmdlTGFiZWwgPSB0aGlzLmxhYmVscy5nZXRSYW5nZVRleHQodGhpcy5wYWdlLCB0aGlzLnBhZ2VTaXplLCB0aGlzLmxlbmd0aCwgdHJ1ZSk7XHJcbiAgICB0aGlzLnRvdGFsUGFnZXMgPSB0aGlzLmNhbGN1bGF0ZVRvdGFsUGFnZXMoKTtcclxuICAgIHRoaXMucGFnZXMgPSB0aGlzLmdldFBhZ2VzKHRoaXMucGFnZSwgdGhpcy50b3RhbFBhZ2VzKTtcclxuICB9XHJcbiAgX2xlbmd0aDogbnVtYmVyID0gMDtcclxuXHJcbiAgQE91dHB1dCgpIHBhZ2VDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPElEYXRhVGFibGVQYWdpbmF0aW9uRXZlbnQ+KCk7XHJcblxyXG4gIHB1YmxpYyBkaXNwbGF5ZWRQYWdlU2l6ZU9wdGlvbnM6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZyB9W107XHJcbiAgcHVibGljIGxvbmdSYW5nZUxhYmVsOiBzdHJpbmc7XHJcbiAgcHVibGljIHNob3J0UmFuZ2VMYWJlbDogc3RyaW5nO1xyXG4gIHB1YmxpYyBwYWdlczogeyBudW1iZXI6IG51bWJlcjsgdGV4dDogc3RyaW5nOyBhY3RpdmU6IGJvb2xlYW4gfVtdO1xyXG5cclxuICBwcml2YXRlIHJlc2V0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcbiAgcHVibGljIHRvdGFsUGFnZXM6IG51bWJlcjtcclxuICBwcml2YXRlIF9pbml0aWFsaXplZDogYm9vbGVhbjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UsIHByaXZhdGUgc3RhdGU6IERhdGFUYWJsZVN0YXRlPFQ+KSB7XHJcbiAgICB0aGlzLnJlc2V0U3Vic2NyaXB0aW9uID0gdGhpcy5zdGF0ZS5yZXNldFNvdXJjZS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLnBhZ2UgPSAwO1xyXG4gICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICB0aGlzLnVwZGF0ZURpc3BsYXllZFBhZ2VTaXplT3B0aW9ucygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5yZXNldFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNlbGVjdFBhZ2UocGFnZSkge1xyXG4gICAgdGhpcy5wYWdlID0gcGFnZTtcclxuICAgIHRoaXMuZW1pdFBhZ2VFdmVudCgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5leHRQYWdlKCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmhhc05leHRQYWdlKCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5wYWdlKys7XHJcbiAgICB0aGlzLnBhZ2VzID0gdGhpcy5nZXRQYWdlcyh0aGlzLnBhZ2UsIHRoaXMudG90YWxQYWdlcyk7XHJcbiAgICB0aGlzLmVtaXRQYWdlRXZlbnQoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBwcmV2aW91c1BhZ2UoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuaGFzUHJldmlvdXNQYWdlKCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5wYWdlLS07XHJcbiAgICB0aGlzLnBhZ2VzID0gdGhpcy5nZXRQYWdlcyh0aGlzLnBhZ2UsIHRoaXMudG90YWxQYWdlcyk7XHJcbiAgICB0aGlzLmVtaXRQYWdlRXZlbnQoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBoYXNQcmV2aW91c1BhZ2UoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5wYWdlID49IDEgJiYgdGhpcy5wYWdlU2l6ZSAhPT0gMDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBoYXNOZXh0UGFnZSgpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IG51bWJlck9mUGFnZXMgPSBNYXRoLmNlaWwodGhpcy5sZW5ndGggLyB0aGlzLnBhZ2VTaXplKSAtIDE7XHJcbiAgICByZXR1cm4gdGhpcy5wYWdlIDwgbnVtYmVyT2ZQYWdlcyAmJiB0aGlzLnBhZ2VTaXplICE9PSAwO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNoYW5nZVBhZ2VTaXplKHBhZ2VTaXplOiBudW1iZXIpOiB2b2lkIHtcclxuICAgIHRoaXMucGFnZSA9IDA7XHJcbiAgICB0aGlzLnBhZ2VTaXplID0gcGFnZVNpemU7XHJcbiAgICB0aGlzLmVtaXRQYWdlRXZlbnQodHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZURpc3BsYXllZFBhZ2VTaXplT3B0aW9ucygpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5faW5pdGlhbGl6ZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLmRpc3BsYXllZFBhZ2VTaXplT3B0aW9ucykge1xyXG4gICAgICB0aGlzLmRpc3BsYXllZFBhZ2VTaXplT3B0aW9ucyA9IFtdO1xyXG4gICAgICB0aGlzLnBhZ2VTaXplT3B0aW9ucy5mb3JFYWNoKChvcHRpb246IGFueSkgPT4ge1xyXG4gICAgICAgIGlmIChvcHRpb24uaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykpIHtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheWVkUGFnZVNpemVPcHRpb25zLnB1c2gob3B0aW9uKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5ZWRQYWdlU2l6ZU9wdGlvbnMucHVzaCh7XHJcbiAgICAgICAgICAgIHZhbHVlOiBvcHRpb24sXHJcbiAgICAgICAgICAgIGxhYmVsOiBvcHRpb24sXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5sb25nUmFuZ2VMYWJlbCA9IHRoaXMubGFiZWxzLmdldFJhbmdlVGV4dCh0aGlzLnBhZ2UsIHRoaXMucGFnZVNpemUsIHRoaXMubGVuZ3RoLCBmYWxzZSk7XHJcbiAgICB0aGlzLnNob3J0UmFuZ2VMYWJlbCA9IHRoaXMubGFiZWxzLmdldFJhbmdlVGV4dCh0aGlzLnBhZ2UsIHRoaXMucGFnZVNpemUsIHRoaXMubGVuZ3RoLCB0cnVlKTtcclxuICAgIHRoaXMudG90YWxQYWdlcyA9IHRoaXMuY2FsY3VsYXRlVG90YWxQYWdlcygpO1xyXG4gICAgdGhpcy5wYWdlcyA9IHRoaXMuZ2V0UGFnZXModGhpcy5wYWdlLCB0aGlzLnRvdGFsUGFnZXMpO1xyXG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGVtaXRQYWdlRXZlbnQoaXNQYWdlU2l6ZUNoYW5nZTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XHJcbiAgICBjb25zdCBldmVudCA9IHtcclxuICAgICAgcGFnZTogdGhpcy5wYWdlLFxyXG4gICAgICBwYWdlU2l6ZTogdGhpcy5wYWdlU2l6ZSxcclxuICAgICAgbGVuZ3RoOiB0aGlzLmxlbmd0aCxcclxuICAgICAgZmlsdGVyOiB0aGlzLnN0YXRlLmZpbHRlcixcclxuICAgICAgc29ydDogdGhpcy5zdGF0ZS5zb3J0LFxyXG4gICAgfTtcclxuICAgIHRoaXMucGFnZUNoYW5nZS5uZXh0KGV2ZW50KTtcclxuICAgIHRoaXMuc3RhdGUucGFnZSA9IHRoaXMucGFnZTtcclxuICAgIHRoaXMuc3RhdGUucGFnZVNpemUgPSB0aGlzLnBhZ2VTaXplO1xyXG4gICAgdGhpcy5sb25nUmFuZ2VMYWJlbCA9IHRoaXMubGFiZWxzLmdldFJhbmdlVGV4dCh0aGlzLnBhZ2UsIHRoaXMucGFnZVNpemUsIHRoaXMubGVuZ3RoLCBmYWxzZSk7XHJcbiAgICB0aGlzLnNob3J0UmFuZ2VMYWJlbCA9IHRoaXMubGFiZWxzLmdldFJhbmdlVGV4dCh0aGlzLnBhZ2UsIHRoaXMucGFnZVNpemUsIHRoaXMubGVuZ3RoLCB0cnVlKTtcclxuICAgIHRoaXMudG90YWxQYWdlcyA9IHRoaXMuY2FsY3VsYXRlVG90YWxQYWdlcygpO1xyXG4gICAgdGhpcy5wYWdlcyA9IHRoaXMuZ2V0UGFnZXModGhpcy5wYWdlLCB0aGlzLnRvdGFsUGFnZXMpO1xyXG4gICAgdGhpcy5zdGF0ZS51cGRhdGVzLm5leHQoZXZlbnQpO1xyXG4gICAgdGhpcy5zdGF0ZS5vblBhZ2luYXRpb25DaGFuZ2UoaXNQYWdlU2l6ZUNoYW5nZSwgdGhpcy5wYWdlU2l6ZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNhbGN1bGF0ZVRvdGFsUGFnZXMoKSB7XHJcbiAgICBjb25zdCB0b3RhbFBhZ2VzID0gdGhpcy5wYWdlU2l6ZSA8IDEgPyAxIDogTWF0aC5jZWlsKHRoaXMubGVuZ3RoIC8gdGhpcy5wYWdlU2l6ZSk7XHJcbiAgICByZXR1cm4gTWF0aC5tYXgodG90YWxQYWdlcyB8fCAwLCAxKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbWFrZVBhZ2UobnVtYmVyOiBudW1iZXIsIHRleHQ6IHN0cmluZywgaXNBY3RpdmU6IGJvb2xlYW4pOiB7IG51bWJlcjogbnVtYmVyOyB0ZXh0OiBzdHJpbmc7IGFjdGl2ZTogYm9vbGVhbiB9IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG51bWJlcixcclxuICAgICAgdGV4dCxcclxuICAgICAgYWN0aXZlOiBpc0FjdGl2ZSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFBhZ2VzKGN1cnJlbnRQYWdlOiBudW1iZXIsIHRvdGFsUGFnZXM6IG51bWJlcik6IHsgbnVtYmVyOiBudW1iZXI7IHRleHQ6IHN0cmluZzsgYWN0aXZlOiBib29sZWFuIH1bXSB7XHJcbiAgICBjb25zdCBwYWdlcyA9IFtdO1xyXG5cclxuICAgIC8vIERlZmF1bHQgcGFnZSBsaW1pdHNcclxuICAgIGxldCBzdGFydFBhZ2UgPSAxO1xyXG4gICAgbGV0IGVuZFBhZ2UgPSB0b3RhbFBhZ2VzO1xyXG4gICAgY29uc3QgaXNNYXhTaXplZCA9IE1BWF9QQUdFU19ESVNQTEFZRUQgPCB0b3RhbFBhZ2VzO1xyXG5cclxuICAgIC8vIFJlY29tcHV0ZSBpZiBtYXhQYWdlc0Rpc3BsYXllZFxyXG4gICAgaWYgKGlzTWF4U2l6ZWQpIHtcclxuICAgICAgLy8gQ3VycmVudCBwYWdlIGlzIGRpc3BsYXllZCBpbiB0aGUgbWlkZGxlIG9mIHRoZSB2aXNpYmxlIG9uZXNcclxuICAgICAgc3RhcnRQYWdlID0gTWF0aC5tYXgoY3VycmVudFBhZ2UgLSBNYXRoLmZsb29yKE1BWF9QQUdFU19ESVNQTEFZRUQgLyAyKSwgMSk7XHJcbiAgICAgIGVuZFBhZ2UgPSBzdGFydFBhZ2UgKyBNQVhfUEFHRVNfRElTUExBWUVEIC0gMTtcclxuXHJcbiAgICAgIC8vIEFkanVzdCBpZiBsaW1pdCBpcyBleGNlZWRlZFxyXG4gICAgICBpZiAoZW5kUGFnZSA+IHRvdGFsUGFnZXMpIHtcclxuICAgICAgICBlbmRQYWdlID0gdG90YWxQYWdlcztcclxuICAgICAgICBzdGFydFBhZ2UgPSBlbmRQYWdlIC0gTUFYX1BBR0VTX0RJU1BMQVlFRCArIDE7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBBZGQgcGFnZSBudW1iZXIgbGlua3NcclxuICAgIGZvciAobGV0IG51bWJlciA9IHN0YXJ0UGFnZTsgbnVtYmVyIDw9IGVuZFBhZ2U7IG51bWJlcisrKSB7XHJcbiAgICAgIGNvbnN0IHBhZ2UgPSB0aGlzLm1ha2VQYWdlKG51bWJlciwgbnVtYmVyLnRvU3RyaW5nKCksIG51bWJlciA9PT0gY3VycmVudFBhZ2UpO1xyXG4gICAgICBwYWdlcy5wdXNoKHBhZ2UpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhZ2VzO1xyXG4gIH1cclxufVxyXG4iXX0=
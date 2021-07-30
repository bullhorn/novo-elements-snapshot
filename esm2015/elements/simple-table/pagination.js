import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { NovoLabelService } from '../../services/novo-label-service';
import { NovoActivityTableState } from './state';
const DEFAULT_PAGE_SIZE = 50;
export class NovoSimpleTablePagination {
    constructor(changeDetectorRef, labels, state) {
        this.changeDetectorRef = changeDetectorRef;
        this.labels = labels;
        this.state = state;
        this._page = 0;
        this._length = 0;
        this._pageSizeOptions = [];
        this.pageChange = new EventEmitter();
        if (state && state.onReset) {
            this.resetSubscription = this.state.onReset.subscribe((clear) => {
                if (clear) {
                    this.page = 0;
                    this.changeDetectorRef.markForCheck();
                }
            });
        }
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
    get length() {
        return this._length;
    }
    set length(length) {
        this._length = length;
        this.changeDetectorRef.markForCheck();
        this.longRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, false);
        this.shortRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, true);
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
    ngOnInit() {
        this._initialized = true;
        this.updateDisplayedPageSizeOptions();
    }
    ngOnDestroy() {
        this.resetSubscription.unsubscribe();
    }
    nextPage() {
        if (!this.hasNextPage()) {
            return;
        }
        this.page++;
        this.emitPageEvent();
    }
    previousPage() {
        if (!this.hasPreviousPage()) {
            return;
        }
        this.page--;
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
        this.emitPageEvent();
    }
    updateDisplayedPageSizeOptions() {
        if (!this._initialized) {
            return;
        }
        if (!this.pageSize) {
            this._pageSize = this.pageSizeOptions.length !== 0 ? this.pageSizeOptions[0] : DEFAULT_PAGE_SIZE;
        }
        this.displayedPageSizeOptions = this.pageSizeOptions.slice();
        if (this.displayedPageSizeOptions.indexOf(this.pageSize) === -1) {
            this.displayedPageSizeOptions.push(this.pageSize);
        }
        this.displayedPageSizeOptions.sort((a, b) => a - b);
        this.changeDetectorRef.markForCheck();
        this.longRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, false);
        this.shortRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, true);
    }
    emitPageEvent() {
        const event = {
            page: this.page,
            pageSize: this.pageSize,
            length: this.length,
        };
        this.pageChange.next(event);
        this.state.page = this.page;
        this.state.pageSize = this.pageSize;
        this.longRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, false);
        this.shortRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, true);
        this.state.updates.next(event);
    }
}
NovoSimpleTablePagination.decorators = [
    { type: Component, args: [{
                selector: 'novo-simple-table-pagination',
                template: `
        <div class="novo-simple-table-pagination-size">
            <novo-tiles *ngIf="displayedPageSizeOptions.length > 1"
                        [(ngModel)]="pageSize"
                        [options]="displayedPageSizeOptions"
                        (onChange)="changePageSize($event)"
                        data-automation-id="novo-simple-table-pagination-tiles">
            </novo-tiles>
            <div *ngIf="displayedPageSizeOptions.length <= 1">{{ pageSize }}</div>
        </div>

        <div class="novo-simple-table-range-label-long"data-automation-id="novo-simple-table-pagination-range-label-long">
            {{ longRangeLabel }}
        </div>
        <div class="novo-simple-table-range-label-short"data-automation-id="novo-simple-table-pagination-range-label-short">
            {{ shortRangeLabel }}
        </div>

        <button theme="dialogue" type="button"
                class="novo-simple-table-pagination-navigation-previous"
                (click)="previousPage()"
                icon="previous"
                side="left"
                [disabled]="!hasPreviousPage()"
                data-automation-id="novo-simple-table-pagination-previous">
            <span>{{ labels.previous }}</span>
        </button>
        <button theme="dialogue" type="button"
                class="novo-simple-table-pagination-navigation-next"
                (click)="nextPage()"
                icon="next"
                side="right"
                [disabled]="!hasNextPage()"
                data-automation-id="novo-simple-table-pagination-next">
            <span>{{ labels.next }}</span>
        </button>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
NovoSimpleTablePagination.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NovoLabelService },
    { type: NovoActivityTableState }
];
NovoSimpleTablePagination.propDecorators = {
    page: [{ type: Input }],
    length: [{ type: Input }],
    pageSize: [{ type: Input }],
    pageSizeOptions: [{ type: Input }],
    pageChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvc2ltcGxlLXRhYmxlL3BhZ2luYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJdEksT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDckUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRWpELE1BQU0saUJBQWlCLEdBQUcsRUFBRSxDQUFDO0FBMkM3QixNQUFNLE9BQU8seUJBQXlCO0lBMERwQyxZQUFvQixpQkFBb0MsRUFBUyxNQUF3QixFQUFVLEtBQTZCO1FBQTVHLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQXdCO1FBNUNoSSxVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBWWxCLFlBQU8sR0FBVyxDQUFDLENBQUM7UUFxQloscUJBQWdCLEdBQWEsRUFBRSxDQUFDO1FBR3hDLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBNkIsQ0FBQztRQVN6RCxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQzFCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFjLEVBQUUsRUFBRTtnQkFDdkUsSUFBSSxLQUFLLEVBQUU7b0JBQ1QsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7b0JBQ2QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO2lC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QUksQ0FBQyxDQUFDO1FBQzdGLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs7WUFuTEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw4QkFBOEI7Z0JBQ3hDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBb0NQO2dCQUNILGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7WUFqRGlDLGlCQUFpQjtZQUkxQyxnQkFBZ0I7WUFDaEIsc0JBQXNCOzs7bUJBZ0Q1QixLQUFLO3FCQWFMLEtBQUs7dUJBWUwsS0FBSzs4QkFXTCxLQUFLO3lCQVVMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IE5vdm9TaW1wbGVQYWdpbmF0aW9uRXZlbnQgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbm92by1sYWJlbC1zZXJ2aWNlJztcclxuaW1wb3J0IHsgTm92b0FjdGl2aXR5VGFibGVTdGF0ZSB9IGZyb20gJy4vc3RhdGUnO1xyXG5cclxuY29uc3QgREVGQVVMVF9QQUdFX1NJWkUgPSA1MDtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbm92by1zaW1wbGUtdGFibGUtcGFnaW5hdGlvbicsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwibm92by1zaW1wbGUtdGFibGUtcGFnaW5hdGlvbi1zaXplXCI+XHJcbiAgICAgICAgICAgIDxub3ZvLXRpbGVzICpuZ0lmPVwiZGlzcGxheWVkUGFnZVNpemVPcHRpb25zLmxlbmd0aCA+IDFcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cInBhZ2VTaXplXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW29wdGlvbnNdPVwiZGlzcGxheWVkUGFnZVNpemVPcHRpb25zXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgKG9uQ2hhbmdlKT1cImNoYW5nZVBhZ2VTaXplKCRldmVudClcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLXNpbXBsZS10YWJsZS1wYWdpbmF0aW9uLXRpbGVzXCI+XHJcbiAgICAgICAgICAgIDwvbm92by10aWxlcz5cclxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cImRpc3BsYXllZFBhZ2VTaXplT3B0aW9ucy5sZW5ndGggPD0gMVwiPnt7IHBhZ2VTaXplIH19PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJub3ZvLXNpbXBsZS10YWJsZS1yYW5nZS1sYWJlbC1sb25nXCJkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLXNpbXBsZS10YWJsZS1wYWdpbmF0aW9uLXJhbmdlLWxhYmVsLWxvbmdcIj5cclxuICAgICAgICAgICAge3sgbG9uZ1JhbmdlTGFiZWwgfX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibm92by1zaW1wbGUtdGFibGUtcmFuZ2UtbGFiZWwtc2hvcnRcImRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tc2ltcGxlLXRhYmxlLXBhZ2luYXRpb24tcmFuZ2UtbGFiZWwtc2hvcnRcIj5cclxuICAgICAgICAgICAge3sgc2hvcnRSYW5nZUxhYmVsIH19XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxidXR0b24gdGhlbWU9XCJkaWFsb2d1ZVwiIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJub3ZvLXNpbXBsZS10YWJsZS1wYWdpbmF0aW9uLW5hdmlnYXRpb24tcHJldmlvdXNcIlxyXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cInByZXZpb3VzUGFnZSgpXCJcclxuICAgICAgICAgICAgICAgIGljb249XCJwcmV2aW91c1wiXHJcbiAgICAgICAgICAgICAgICBzaWRlPVwibGVmdFwiXHJcbiAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiIWhhc1ByZXZpb3VzUGFnZSgpXCJcclxuICAgICAgICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tc2ltcGxlLXRhYmxlLXBhZ2luYXRpb24tcHJldmlvdXNcIj5cclxuICAgICAgICAgICAgPHNwYW4+e3sgbGFiZWxzLnByZXZpb3VzIH19PC9zcGFuPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDxidXR0b24gdGhlbWU9XCJkaWFsb2d1ZVwiIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJub3ZvLXNpbXBsZS10YWJsZS1wYWdpbmF0aW9uLW5hdmlnYXRpb24tbmV4dFwiXHJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwibmV4dFBhZ2UoKVwiXHJcbiAgICAgICAgICAgICAgICBpY29uPVwibmV4dFwiXHJcbiAgICAgICAgICAgICAgICBzaWRlPVwicmlnaHRcIlxyXG4gICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cIiFoYXNOZXh0UGFnZSgpXCJcclxuICAgICAgICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tc2ltcGxlLXRhYmxlLXBhZ2luYXRpb24tbmV4dFwiPlxyXG4gICAgICAgICAgICA8c3Bhbj57eyBsYWJlbHMubmV4dCB9fTwvc3Bhbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgIGAsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvU2ltcGxlVGFibGVQYWdpbmF0aW9uIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIHByaXZhdGUgX2luaXRpYWxpemVkOiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBwYWdlKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fcGFnZTtcclxuICB9XHJcbiAgc2V0IHBhZ2UocGFnZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9wYWdlID0gcGFnZTtcclxuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICB0aGlzLmxvbmdSYW5nZUxhYmVsID0gdGhpcy5sYWJlbHMuZ2V0UmFuZ2VUZXh0KHRoaXMucGFnZSwgdGhpcy5wYWdlU2l6ZSwgdGhpcy5sZW5ndGgsIGZhbHNlKTtcclxuICAgIHRoaXMuc2hvcnRSYW5nZUxhYmVsID0gdGhpcy5sYWJlbHMuZ2V0UmFuZ2VUZXh0KHRoaXMucGFnZSwgdGhpcy5wYWdlU2l6ZSwgdGhpcy5sZW5ndGgsIHRydWUpO1xyXG4gICAgdGhpcy5zdGF0ZS5wYWdlID0gdGhpcy5fcGFnZTtcclxuICB9XHJcbiAgX3BhZ2U6IG51bWJlciA9IDA7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGxlbmd0aCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xlbmd0aDtcclxuICB9XHJcbiAgc2V0IGxlbmd0aChsZW5ndGg6IG51bWJlcikge1xyXG4gICAgdGhpcy5fbGVuZ3RoID0gbGVuZ3RoO1xyXG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICAgIHRoaXMubG9uZ1JhbmdlTGFiZWwgPSB0aGlzLmxhYmVscy5nZXRSYW5nZVRleHQodGhpcy5wYWdlLCB0aGlzLnBhZ2VTaXplLCB0aGlzLmxlbmd0aCwgZmFsc2UpO1xyXG4gICAgdGhpcy5zaG9ydFJhbmdlTGFiZWwgPSB0aGlzLmxhYmVscy5nZXRSYW5nZVRleHQodGhpcy5wYWdlLCB0aGlzLnBhZ2VTaXplLCB0aGlzLmxlbmd0aCwgdHJ1ZSk7XHJcbiAgfVxyXG4gIF9sZW5ndGg6IG51bWJlciA9IDA7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHBhZ2VTaXplKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fcGFnZVNpemU7XHJcbiAgfVxyXG4gIHNldCBwYWdlU2l6ZShwYWdlU2l6ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9wYWdlU2l6ZSA9IHBhZ2VTaXplO1xyXG4gICAgdGhpcy51cGRhdGVEaXNwbGF5ZWRQYWdlU2l6ZU9wdGlvbnMoKTtcclxuICAgIHRoaXMuc3RhdGUucGFnZVNpemUgPSB0aGlzLl9wYWdlU2l6ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfcGFnZVNpemU6IG51bWJlcjtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgcGFnZVNpemVPcHRpb25zKCk6IG51bWJlcltdIHtcclxuICAgIHJldHVybiB0aGlzLl9wYWdlU2l6ZU9wdGlvbnM7XHJcbiAgfVxyXG4gIHNldCBwYWdlU2l6ZU9wdGlvbnMocGFnZVNpemVPcHRpb25zOiBudW1iZXJbXSkge1xyXG4gICAgdGhpcy5fcGFnZVNpemVPcHRpb25zID0gcGFnZVNpemVPcHRpb25zO1xyXG4gICAgdGhpcy51cGRhdGVEaXNwbGF5ZWRQYWdlU2l6ZU9wdGlvbnMoKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfcGFnZVNpemVPcHRpb25zOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICBAT3V0cHV0KClcclxuICBwYWdlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxOb3ZvU2ltcGxlUGFnaW5hdGlvbkV2ZW50PigpO1xyXG5cclxuICBwdWJsaWMgZGlzcGxheWVkUGFnZVNpemVPcHRpb25zOiBudW1iZXJbXTtcclxuICBwdWJsaWMgbG9uZ1JhbmdlTGFiZWw6IHN0cmluZztcclxuICBwdWJsaWMgc2hvcnRSYW5nZUxhYmVsOiBzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgcmVzZXRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UsIHByaXZhdGUgc3RhdGU6IE5vdm9BY3Rpdml0eVRhYmxlU3RhdGUpIHtcclxuICAgIGlmIChzdGF0ZSAmJiBzdGF0ZS5vblJlc2V0KSB7XHJcbiAgICAgIHRoaXMucmVzZXRTdWJzY3JpcHRpb24gPSB0aGlzLnN0YXRlLm9uUmVzZXQuc3Vic2NyaWJlKChjbGVhcjogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgIGlmIChjbGVhcikge1xyXG4gICAgICAgICAgdGhpcy5wYWdlID0gMDtcclxuICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuX2luaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgIHRoaXMudXBkYXRlRGlzcGxheWVkUGFnZVNpemVPcHRpb25zKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLnJlc2V0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmV4dFBhZ2UoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuaGFzTmV4dFBhZ2UoKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLnBhZ2UrKztcclxuICAgIHRoaXMuZW1pdFBhZ2VFdmVudCgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHByZXZpb3VzUGFnZSgpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5oYXNQcmV2aW91c1BhZ2UoKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLnBhZ2UtLTtcclxuICAgIHRoaXMuZW1pdFBhZ2VFdmVudCgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGhhc1ByZXZpb3VzUGFnZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnBhZ2UgPj0gMSAmJiB0aGlzLnBhZ2VTaXplICE9PSAwO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGhhc05leHRQYWdlKCk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgbnVtYmVyT2ZQYWdlcyA9IE1hdGguY2VpbCh0aGlzLmxlbmd0aCAvIHRoaXMucGFnZVNpemUpIC0gMTtcclxuICAgIHJldHVybiB0aGlzLnBhZ2UgPCBudW1iZXJPZlBhZ2VzICYmIHRoaXMucGFnZVNpemUgIT09IDA7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2hhbmdlUGFnZVNpemUocGFnZVNpemU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgdGhpcy5wYWdlID0gMDtcclxuICAgIHRoaXMucGFnZVNpemUgPSBwYWdlU2l6ZTtcclxuICAgIHRoaXMuZW1pdFBhZ2VFdmVudCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVEaXNwbGF5ZWRQYWdlU2l6ZU9wdGlvbnMoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuX2luaXRpYWxpemVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5wYWdlU2l6ZSkge1xyXG4gICAgICB0aGlzLl9wYWdlU2l6ZSA9IHRoaXMucGFnZVNpemVPcHRpb25zLmxlbmd0aCAhPT0gMCA/IHRoaXMucGFnZVNpemVPcHRpb25zWzBdIDogREVGQVVMVF9QQUdFX1NJWkU7XHJcbiAgICB9XHJcbiAgICB0aGlzLmRpc3BsYXllZFBhZ2VTaXplT3B0aW9ucyA9IHRoaXMucGFnZVNpemVPcHRpb25zLnNsaWNlKCk7XHJcbiAgICBpZiAodGhpcy5kaXNwbGF5ZWRQYWdlU2l6ZU9wdGlvbnMuaW5kZXhPZih0aGlzLnBhZ2VTaXplKSA9PT0gLTEpIHtcclxuICAgICAgdGhpcy5kaXNwbGF5ZWRQYWdlU2l6ZU9wdGlvbnMucHVzaCh0aGlzLnBhZ2VTaXplKTtcclxuICAgIH1cclxuICAgIHRoaXMuZGlzcGxheWVkUGFnZVNpemVPcHRpb25zLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcclxuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICB0aGlzLmxvbmdSYW5nZUxhYmVsID0gdGhpcy5sYWJlbHMuZ2V0UmFuZ2VUZXh0KHRoaXMucGFnZSwgdGhpcy5wYWdlU2l6ZSwgdGhpcy5sZW5ndGgsIGZhbHNlKTtcclxuICAgIHRoaXMuc2hvcnRSYW5nZUxhYmVsID0gdGhpcy5sYWJlbHMuZ2V0UmFuZ2VUZXh0KHRoaXMucGFnZSwgdGhpcy5wYWdlU2l6ZSwgdGhpcy5sZW5ndGgsIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBlbWl0UGFnZUV2ZW50KCk6IHZvaWQge1xyXG4gICAgY29uc3QgZXZlbnQgPSB7XHJcbiAgICAgIHBhZ2U6IHRoaXMucGFnZSxcclxuICAgICAgcGFnZVNpemU6IHRoaXMucGFnZVNpemUsXHJcbiAgICAgIGxlbmd0aDogdGhpcy5sZW5ndGgsXHJcbiAgICB9O1xyXG4gICAgdGhpcy5wYWdlQ2hhbmdlLm5leHQoZXZlbnQpO1xyXG4gICAgdGhpcy5zdGF0ZS5wYWdlID0gdGhpcy5wYWdlO1xyXG4gICAgdGhpcy5zdGF0ZS5wYWdlU2l6ZSA9IHRoaXMucGFnZVNpemU7XHJcbiAgICB0aGlzLmxvbmdSYW5nZUxhYmVsID0gdGhpcy5sYWJlbHMuZ2V0UmFuZ2VUZXh0KHRoaXMucGFnZSwgdGhpcy5wYWdlU2l6ZSwgdGhpcy5sZW5ndGgsIGZhbHNlKTtcclxuICAgIHRoaXMuc2hvcnRSYW5nZUxhYmVsID0gdGhpcy5sYWJlbHMuZ2V0UmFuZ2VUZXh0KHRoaXMucGFnZSwgdGhpcy5wYWdlU2l6ZSwgdGhpcy5sZW5ndGgsIHRydWUpO1xyXG4gICAgdGhpcy5zdGF0ZS51cGRhdGVzLm5leHQoZXZlbnQpO1xyXG4gIH1cclxufVxyXG4iXX0=
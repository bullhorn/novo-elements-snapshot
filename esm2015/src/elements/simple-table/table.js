import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkTable, CDK_TABLE_TEMPLATE } from '@angular/cdk/table';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, EventEmitter, HostBinding, Input, ViewEncapsulation, } from '@angular/core';
import { NovoLabelService } from '../../services/novo-label-service';
import { notify } from '../../utils/notifier/notifier.util';
import { NovoActivityTableState } from './state';
import { ActivityTableDataSource } from './table-source';
/** Workaround for https://github.com/angular/angular/issues/17849 */
export const _NovoTable = CdkTable;
export class NovoTable extends _NovoTable {
}
NovoTable.decorators = [
    { type: Component, args: [{
                selector: 'novo-simple-table',
                template: CDK_TABLE_TEMPLATE,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
export class NovoActivityTableActions {
}
NovoActivityTableActions.decorators = [
    { type: Directive, args: [{
                selector: 'novo-activity-table-actions',
            },] }
];
export class NovoActivityTableCustomHeader {
}
NovoActivityTableCustomHeader.decorators = [
    { type: Directive, args: [{
                selector: 'novo-activity-table-custom-header',
            },] }
];
export class NovoActivityTableCustomFilter {
}
NovoActivityTableCustomFilter.decorators = [
    { type: Directive, args: [{
                selector: 'novo-activity-table-custom-filter',
            },] }
];
export class NovoActivityTableEmptyMessage {
}
NovoActivityTableEmptyMessage.decorators = [
    { type: Directive, args: [{
                selector: 'novo-activity-table-empty-message',
            },] }
];
export class NovoActivityTableNoResultsMessage {
}
NovoActivityTableNoResultsMessage.decorators = [
    { type: Directive, args: [{
                selector: 'novo-activity-table-no-results-message',
            },] }
];
export class NovoActivityTable {
    constructor(labels, ref, state) {
        this.labels = labels;
        this.ref = ref;
        this.state = state;
        this.globalSearchHiddenClassToggle = false;
        this.loading = true;
        notify('[Deprecated]: The simple table is deprecated. Please migrate to novo-data-tables!');
    }
    set customFilter(v) {
        this._customFilter = coerceBooleanProperty(v);
    }
    get customFilter() {
        return this._customFilter;
    }
    set forceShowHeader(v) {
        this._forceShowHeader = coerceBooleanProperty(v);
    }
    get forceShowHeader() {
        return this._forceShowHeader;
    }
    set hideGlobalSearch(v) {
        this._hideGlobalSearch = coerceBooleanProperty(v);
        this.globalSearchHiddenClassToggle = this._hideGlobalSearch;
    }
    get hideGlobalSearch() {
        return this._hideGlobalSearch;
    }
    set debug(v) {
        this._debug = coerceBooleanProperty(v);
    }
    get debug() {
        return this._debug;
    }
    get empty() {
        return this.dataSource && this.dataSource.totallyEmpty;
    }
    get loadingClass() {
        return this.loading || (this.dataSource && this.dataSource.loading);
    }
    ngOnChanges(changes) {
        this.loading = changes.activityService && !changes.activityService.currentValue;
        this.ref.detectChanges();
        if (changes.activityService && changes.activityService.currentValue) {
            this.loading = false;
            this.dataSource = new ActivityTableDataSource(this.activityService, this.state, this.ref);
            this.ref.detectChanges();
        }
        if (changes.outsideFilter && changes.outsideFilter.currentValue) {
            if (!this.outsideFilterSubscription) {
                this.outsideFilterSubscription = this.outsideFilter.subscribe((filter) => {
                    this.state.outsideFilter = filter;
                    this.state.updates.next({ globalSearch: this.state.globalSearch, filter: this.state.filter, sort: this.state.sort });
                    this.ref.markForCheck();
                });
            }
        }
    }
    ngOnDestroy() {
        if (this.outsideFilterSubscription) {
            this.outsideFilterSubscription.unsubscribe();
        }
    }
    ngAfterContentInit() {
        if (this.paginationOptions && !this.paginationOptions.page) {
            this.paginationOptions.page = 0;
        }
        if (this.paginationOptions && !this.paginationOptions.pageSize) {
            this.paginationOptions.pageSize = 50;
        }
        if (this.paginationOptions && !this.paginationOptions.pageSizeOptions) {
            this.paginationOptions.pageSizeOptions = [10, 25, 50, 100];
        }
        this.state.page = this.paginationOptions ? this.paginationOptions.page : undefined;
        this.state.pageSize = this.paginationOptions ? this.paginationOptions.pageSize : undefined;
        this.ref.markForCheck();
    }
    onSearchChange(term) {
        this.state.globalSearch = term;
        this.state.reset(false, true);
        this.state.updates.next({ globalSearch: term, filter: this.state.filter, sort: this.state.sort });
    }
}
NovoActivityTable.decorators = [
    { type: Component, args: [{
                selector: 'novo-activity-table',
                template: `
    <div *ngIf="debug">
      <p>Total: {{ dataSource?.total }}</p>
      <p>Current: {{ dataSource?.current }}</p>
      <p>Totally Empty: {{ dataSource?.totallyEmpty }}</p>
      <p>Currently Empty: {{ dataSource?.currentlyEmpty }}</p>
      <p>Loading (DataSource): {{ dataSource?.loading }}</p>
      <p>User Filtered: {{ state.userFiltered }}</p>
      <p>Loading (Table): {{ loading }}</p>
    </div>
    <header *ngIf="(!(dataSource?.totallyEmpty && !state.userFiltered) && !loading) || forceShowHeader">
      <ng-content select="[novo-activity-table-custom-header]"></ng-content>
      <novo-search
        alwaysOpen="true"
        (searchChanged)="onSearchChange($event)"
        [(ngModel)]="state.globalSearch"
        *ngIf="!hideGlobalSearch"
        [placeholder]="searchOptions?.placeholder"
        [hint]="searchOptions?.tooltip"
      >
      </novo-search>
      <novo-simple-table-pagination
        *ngIf="paginationOptions"
        [length]="dataSource?.total"
        [page]="paginationOptions.page"
        [pageSize]="paginationOptions.pageSize"
        [pageSizeOptions]="paginationOptions.pageSizeOptions"
      >
      </novo-simple-table-pagination>
      <div class="novo-activity-table-actions">
        <ng-content select="[novo-activity-table-actions]"></ng-content>
      </div>
    </header>
    <div class="novo-activity-table-loading-mask" *ngIf="dataSource?.loading || loading" data-automation-id="novo-activity-table-loading">
      <novo-loading></novo-loading>
    </div>
    <div class="novo-activity-table-filter-container">
      <div class="novo-activity-table-custom-filter" *ngIf="customFilter">
        <ng-content select="[novo-activity-table-custom-filter]"></ng-content>
      </div>
      <div class="novo-activity-table-container">
        <novo-simple-table
          *ngIf="columns?.length > 0"
          [dataSource]="dataSource"
          novoSortFilter
          novoSelection
          [class.empty]="dataSource?.currentlyEmpty && state.userFiltered"
          [hidden]="dataSource?.totallyEmpty && !state.userFiltered"
        >
          <ng-content></ng-content>
          <ng-container novoSimpleColumnDef="selection">
            <novo-simple-checkbox-header-cell *novoSimpleHeaderCellDef></novo-simple-checkbox-header-cell>
            <novo-simple-checkbox-cell *novoSimpleCellDef="let row; let i = index" [row]="row" [index]="i"></novo-simple-checkbox-cell>
          </ng-container>
          <ng-container *ngFor="let column of actionColumns" [novoSimpleColumnDef]="column.id">
            <novo-simple-empty-header-cell
              [class.button-header-cell]="!column.options"
              [class.dropdown-header-cell]="column.options"
              *novoSimpleHeaderCellDef
            ></novo-simple-empty-header-cell>
            <novo-simple-action-cell *novoSimpleCellDef="let row; let i = index" [row]="row" [column]="column"></novo-simple-action-cell>
          </ng-container>
          <ng-container *ngFor="let column of columns" [novoSimpleColumnDef]="column.id">
            <novo-simple-header-cell
              *novoSimpleHeaderCellDef
              [column]="column"
              [novo-simple-cell-config]="column.config"
              [defaultSort]="defaultSort"
              >{{ column.label }}</novo-simple-header-cell
            >
            <novo-simple-cell *novoSimpleCellDef="let row" [column]="column" [row]="row"></novo-simple-cell>
          </ng-container>
          <novo-simple-header-row *novoSimpleHeaderRowDef="displayedColumns"></novo-simple-header-row>
          <novo-simple-row *novoSimpleRowDef="let row; columns: displayedColumns"></novo-simple-row>
        </novo-simple-table>
        <div
          class="novo-activity-table-no-results-container"
          *ngIf="dataSource?.currentlyEmpty && state.userFiltered && !dataSource?.loading && !loading && !dataSource.pristine"
        >
          <div #filtered><ng-content select="[novo-activity-table-no-results-message]"></ng-content></div>
          <div class="novo-activity-table-empty-message" *ngIf="filtered.childNodes.length == 0">
            <h4><i class="bhi-search-question"></i> {{ labels.noMatchingRecordsMessage }}</h4>
          </div>
        </div>
        <div
          class="novo-activity-table-empty-container"
          *ngIf="dataSource?.totallyEmpty && !dataSource?.loading && !loading && !state.userFiltered && !dataSource.pristine"
        >
          <div #empty><ng-content select="[novo-activity-table-empty-message]"></ng-content></div>
          <div class="novo-activity-table-empty-message" *ngIf="empty.childNodes.length == 0">
            <h4><i class="bhi-search-question"></i> {{ labels.emptyTableMessage }}</h4>
          </div>
        </div>
      </div>
    </div>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [NovoActivityTableState]
            },] }
];
NovoActivityTable.ctorParameters = () => [
    { type: NovoLabelService },
    { type: ChangeDetectorRef },
    { type: NovoActivityTableState }
];
NovoActivityTable.propDecorators = {
    globalSearchHiddenClassToggle: [{ type: HostBinding, args: ['class.global-search-hidden',] }],
    activityService: [{ type: Input }],
    columns: [{ type: Input }],
    displayedColumns: [{ type: Input }],
    actionColumns: [{ type: Input }],
    paginationOptions: [{ type: Input }],
    searchOptions: [{ type: Input }],
    defaultSort: [{ type: Input }],
    outsideFilter: [{ type: Input }],
    customFilter: [{ type: Input }],
    forceShowHeader: [{ type: Input }],
    hideGlobalSearch: [{ type: Input }],
    debug: [{ type: Input }],
    empty: [{ type: HostBinding, args: ['class.empty',] }],
    loadingClass: [{ type: HostBinding, args: ['class.loading',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvc2ltcGxlLXRhYmxlL3RhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxRQUFRLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRSxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsU0FBUyxFQUNULFlBQVksRUFDWixXQUFXLEVBQ1gsS0FBSyxFQUlMLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFNUQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2pELE9BQU8sRUFBRSx1QkFBdUIsRUFBd0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUUvRSxxRUFBcUU7QUFDckUsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQztBQVFuQyxNQUFNLE9BQU8sU0FBYSxTQUFRLFVBQWE7OztZQU45QyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOztBQVFELE1BQU0sT0FBTyx3QkFBd0I7OztZQUhwQyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDZCQUE2QjthQUN4Qzs7QUFNRCxNQUFNLE9BQU8sNkJBQTZC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aUJBQWlCO1lBZVYsc0JBQXNCOzs7NENBK0k1QixXQUFXLFNBQUMsNEJBQTRCOzhCQUd4QyxLQUFLO3NCQUVMLEtBQUs7K0JBRUwsS0FBSzs0QkFFTCxLQUFLO2dDQUVMLEtBQUs7NEJBRUwsS0FBSzswQkFFTCxLQUFLOzRCQUVMLEtBQUs7MkJBR0wsS0FBSzs4QkFTTCxLQUFLOytCQVNMLEtBQUs7b0JBVUwsS0FBSztvQkFjTCxXQUFXLFNBQUMsYUFBYTsyQkFLekIsV0FBVyxTQUFDLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgQ2RrVGFibGUsIENES19UQUJMRV9URU1QTEFURSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG5pbXBvcnQgeyBub3RpZnkgfSBmcm9tICcuLi8uLi91dGlscy9ub3RpZmllci9ub3RpZmllci51dGlsJztcbmltcG9ydCB7IFNpbXBsZVRhYmxlQWN0aW9uQ29sdW1uLCBTaW1wbGVUYWJsZUNvbHVtbiwgU2ltcGxlVGFibGVQYWdpbmF0aW9uT3B0aW9ucywgU2ltcGxlVGFibGVTZWFyY2hPcHRpb25zIH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IE5vdm9BY3Rpdml0eVRhYmxlU3RhdGUgfSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCB7IEFjdGl2aXR5VGFibGVEYXRhU291cmNlLCBBY3Rpdml0eVRhYmxlU2VydmljZSB9IGZyb20gJy4vdGFibGUtc291cmNlJztcblxuLyoqIFdvcmthcm91bmQgZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE3ODQ5ICovXG5leHBvcnQgY29uc3QgX05vdm9UYWJsZSA9IENka1RhYmxlO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXNpbXBsZS10YWJsZScsXG4gIHRlbXBsYXRlOiBDREtfVEFCTEVfVEVNUExBVEUsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvVGFibGU8VD4gZXh0ZW5kcyBfTm92b1RhYmxlPFQ+IHtcbiAgLy8gVE9ETzogYWRkIGV4cGxpY2l0IGNvbnN0cnVjdG9yXG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ25vdm8tYWN0aXZpdHktdGFibGUtYWN0aW9ucycsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9BY3Rpdml0eVRhYmxlQWN0aW9ucyB7fVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdub3ZvLWFjdGl2aXR5LXRhYmxlLWN1c3RvbS1oZWFkZXInLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQWN0aXZpdHlUYWJsZUN1c3RvbUhlYWRlciB7fVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdub3ZvLWFjdGl2aXR5LXRhYmxlLWN1c3RvbS1maWx0ZXInLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQWN0aXZpdHlUYWJsZUN1c3RvbUZpbHRlciB7fVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdub3ZvLWFjdGl2aXR5LXRhYmxlLWVtcHR5LW1lc3NhZ2UnLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQWN0aXZpdHlUYWJsZUVtcHR5TWVzc2FnZSB7fVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdub3ZvLWFjdGl2aXR5LXRhYmxlLW5vLXJlc3VsdHMtbWVzc2FnZScsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9BY3Rpdml0eVRhYmxlTm9SZXN1bHRzTWVzc2FnZSB7fVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWFjdGl2aXR5LXRhYmxlJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2ICpuZ0lmPVwiZGVidWdcIj5cbiAgICAgIDxwPlRvdGFsOiB7eyBkYXRhU291cmNlPy50b3RhbCB9fTwvcD5cbiAgICAgIDxwPkN1cnJlbnQ6IHt7IGRhdGFTb3VyY2U/LmN1cnJlbnQgfX08L3A+XG4gICAgICA8cD5Ub3RhbGx5IEVtcHR5OiB7eyBkYXRhU291cmNlPy50b3RhbGx5RW1wdHkgfX08L3A+XG4gICAgICA8cD5DdXJyZW50bHkgRW1wdHk6IHt7IGRhdGFTb3VyY2U/LmN1cnJlbnRseUVtcHR5IH19PC9wPlxuICAgICAgPHA+TG9hZGluZyAoRGF0YVNvdXJjZSk6IHt7IGRhdGFTb3VyY2U/LmxvYWRpbmcgfX08L3A+XG4gICAgICA8cD5Vc2VyIEZpbHRlcmVkOiB7eyBzdGF0ZS51c2VyRmlsdGVyZWQgfX08L3A+XG4gICAgICA8cD5Mb2FkaW5nIChUYWJsZSk6IHt7IGxvYWRpbmcgfX08L3A+XG4gICAgPC9kaXY+XG4gICAgPGhlYWRlciAqbmdJZj1cIighKGRhdGFTb3VyY2U/LnRvdGFsbHlFbXB0eSAmJiAhc3RhdGUudXNlckZpbHRlcmVkKSAmJiAhbG9hZGluZykgfHwgZm9yY2VTaG93SGVhZGVyXCI+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbbm92by1hY3Rpdml0eS10YWJsZS1jdXN0b20taGVhZGVyXVwiPjwvbmctY29udGVudD5cbiAgICAgIDxub3ZvLXNlYXJjaFxuICAgICAgICBhbHdheXNPcGVuPVwidHJ1ZVwiXG4gICAgICAgIChzZWFyY2hDaGFuZ2VkKT1cIm9uU2VhcmNoQ2hhbmdlKCRldmVudClcIlxuICAgICAgICBbKG5nTW9kZWwpXT1cInN0YXRlLmdsb2JhbFNlYXJjaFwiXG4gICAgICAgICpuZ0lmPVwiIWhpZGVHbG9iYWxTZWFyY2hcIlxuICAgICAgICBbcGxhY2Vob2xkZXJdPVwic2VhcmNoT3B0aW9ucz8ucGxhY2Vob2xkZXJcIlxuICAgICAgICBbaGludF09XCJzZWFyY2hPcHRpb25zPy50b29sdGlwXCJcbiAgICAgID5cbiAgICAgIDwvbm92by1zZWFyY2g+XG4gICAgICA8bm92by1zaW1wbGUtdGFibGUtcGFnaW5hdGlvblxuICAgICAgICAqbmdJZj1cInBhZ2luYXRpb25PcHRpb25zXCJcbiAgICAgICAgW2xlbmd0aF09XCJkYXRhU291cmNlPy50b3RhbFwiXG4gICAgICAgIFtwYWdlXT1cInBhZ2luYXRpb25PcHRpb25zLnBhZ2VcIlxuICAgICAgICBbcGFnZVNpemVdPVwicGFnaW5hdGlvbk9wdGlvbnMucGFnZVNpemVcIlxuICAgICAgICBbcGFnZVNpemVPcHRpb25zXT1cInBhZ2luYXRpb25PcHRpb25zLnBhZ2VTaXplT3B0aW9uc1wiXG4gICAgICA+XG4gICAgICA8L25vdm8tc2ltcGxlLXRhYmxlLXBhZ2luYXRpb24+XG4gICAgICA8ZGl2IGNsYXNzPVwibm92by1hY3Rpdml0eS10YWJsZS1hY3Rpb25zXCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltub3ZvLWFjdGl2aXR5LXRhYmxlLWFjdGlvbnNdXCI+PC9uZy1jb250ZW50PlxuICAgICAgPC9kaXY+XG4gICAgPC9oZWFkZXI+XG4gICAgPGRpdiBjbGFzcz1cIm5vdm8tYWN0aXZpdHktdGFibGUtbG9hZGluZy1tYXNrXCIgKm5nSWY9XCJkYXRhU291cmNlPy5sb2FkaW5nIHx8IGxvYWRpbmdcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLWFjdGl2aXR5LXRhYmxlLWxvYWRpbmdcIj5cbiAgICAgIDxub3ZvLWxvYWRpbmc+PC9ub3ZvLWxvYWRpbmc+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cIm5vdm8tYWN0aXZpdHktdGFibGUtZmlsdGVyLWNvbnRhaW5lclwiPlxuICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tYWN0aXZpdHktdGFibGUtY3VzdG9tLWZpbHRlclwiICpuZ0lmPVwiY3VzdG9tRmlsdGVyXCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltub3ZvLWFjdGl2aXR5LXRhYmxlLWN1c3RvbS1maWx0ZXJdXCI+PC9uZy1jb250ZW50PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwibm92by1hY3Rpdml0eS10YWJsZS1jb250YWluZXJcIj5cbiAgICAgICAgPG5vdm8tc2ltcGxlLXRhYmxlXG4gICAgICAgICAgKm5nSWY9XCJjb2x1bW5zPy5sZW5ndGggPiAwXCJcbiAgICAgICAgICBbZGF0YVNvdXJjZV09XCJkYXRhU291cmNlXCJcbiAgICAgICAgICBub3ZvU29ydEZpbHRlclxuICAgICAgICAgIG5vdm9TZWxlY3Rpb25cbiAgICAgICAgICBbY2xhc3MuZW1wdHldPVwiZGF0YVNvdXJjZT8uY3VycmVudGx5RW1wdHkgJiYgc3RhdGUudXNlckZpbHRlcmVkXCJcbiAgICAgICAgICBbaGlkZGVuXT1cImRhdGFTb3VyY2U/LnRvdGFsbHlFbXB0eSAmJiAhc3RhdGUudXNlckZpbHRlcmVkXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICA8bmctY29udGFpbmVyIG5vdm9TaW1wbGVDb2x1bW5EZWY9XCJzZWxlY3Rpb25cIj5cbiAgICAgICAgICAgIDxub3ZvLXNpbXBsZS1jaGVja2JveC1oZWFkZXItY2VsbCAqbm92b1NpbXBsZUhlYWRlckNlbGxEZWY+PC9ub3ZvLXNpbXBsZS1jaGVja2JveC1oZWFkZXItY2VsbD5cbiAgICAgICAgICAgIDxub3ZvLXNpbXBsZS1jaGVja2JveC1jZWxsICpub3ZvU2ltcGxlQ2VsbERlZj1cImxldCByb3c7IGxldCBpID0gaW5kZXhcIiBbcm93XT1cInJvd1wiIFtpbmRleF09XCJpXCI+PC9ub3ZvLXNpbXBsZS1jaGVja2JveC1jZWxsPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBhY3Rpb25Db2x1bW5zXCIgW25vdm9TaW1wbGVDb2x1bW5EZWZdPVwiY29sdW1uLmlkXCI+XG4gICAgICAgICAgICA8bm92by1zaW1wbGUtZW1wdHktaGVhZGVyLWNlbGxcbiAgICAgICAgICAgICAgW2NsYXNzLmJ1dHRvbi1oZWFkZXItY2VsbF09XCIhY29sdW1uLm9wdGlvbnNcIlxuICAgICAgICAgICAgICBbY2xhc3MuZHJvcGRvd24taGVhZGVyLWNlbGxdPVwiY29sdW1uLm9wdGlvbnNcIlxuICAgICAgICAgICAgICAqbm92b1NpbXBsZUhlYWRlckNlbGxEZWZcbiAgICAgICAgICAgID48L25vdm8tc2ltcGxlLWVtcHR5LWhlYWRlci1jZWxsPlxuICAgICAgICAgICAgPG5vdm8tc2ltcGxlLWFjdGlvbi1jZWxsICpub3ZvU2ltcGxlQ2VsbERlZj1cImxldCByb3c7IGxldCBpID0gaW5kZXhcIiBbcm93XT1cInJvd1wiIFtjb2x1bW5dPVwiY29sdW1uXCI+PC9ub3ZvLXNpbXBsZS1hY3Rpb24tY2VsbD5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgY29sdW1uc1wiIFtub3ZvU2ltcGxlQ29sdW1uRGVmXT1cImNvbHVtbi5pZFwiPlxuICAgICAgICAgICAgPG5vdm8tc2ltcGxlLWhlYWRlci1jZWxsXG4gICAgICAgICAgICAgICpub3ZvU2ltcGxlSGVhZGVyQ2VsbERlZlxuICAgICAgICAgICAgICBbY29sdW1uXT1cImNvbHVtblwiXG4gICAgICAgICAgICAgIFtub3ZvLXNpbXBsZS1jZWxsLWNvbmZpZ109XCJjb2x1bW4uY29uZmlnXCJcbiAgICAgICAgICAgICAgW2RlZmF1bHRTb3J0XT1cImRlZmF1bHRTb3J0XCJcbiAgICAgICAgICAgICAgPnt7IGNvbHVtbi5sYWJlbCB9fTwvbm92by1zaW1wbGUtaGVhZGVyLWNlbGxcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgIDxub3ZvLXNpbXBsZS1jZWxsICpub3ZvU2ltcGxlQ2VsbERlZj1cImxldCByb3dcIiBbY29sdW1uXT1cImNvbHVtblwiIFtyb3ddPVwicm93XCI+PC9ub3ZvLXNpbXBsZS1jZWxsPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDxub3ZvLXNpbXBsZS1oZWFkZXItcm93ICpub3ZvU2ltcGxlSGVhZGVyUm93RGVmPVwiZGlzcGxheWVkQ29sdW1uc1wiPjwvbm92by1zaW1wbGUtaGVhZGVyLXJvdz5cbiAgICAgICAgICA8bm92by1zaW1wbGUtcm93ICpub3ZvU2ltcGxlUm93RGVmPVwibGV0IHJvdzsgY29sdW1uczogZGlzcGxheWVkQ29sdW1uc1wiPjwvbm92by1zaW1wbGUtcm93PlxuICAgICAgICA8L25vdm8tc2ltcGxlLXRhYmxlPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJub3ZvLWFjdGl2aXR5LXRhYmxlLW5vLXJlc3VsdHMtY29udGFpbmVyXCJcbiAgICAgICAgICAqbmdJZj1cImRhdGFTb3VyY2U/LmN1cnJlbnRseUVtcHR5ICYmIHN0YXRlLnVzZXJGaWx0ZXJlZCAmJiAhZGF0YVNvdXJjZT8ubG9hZGluZyAmJiAhbG9hZGluZyAmJiAhZGF0YVNvdXJjZS5wcmlzdGluZVwiXG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2ICNmaWx0ZXJlZD48bmctY29udGVudCBzZWxlY3Q9XCJbbm92by1hY3Rpdml0eS10YWJsZS1uby1yZXN1bHRzLW1lc3NhZ2VdXCI+PC9uZy1jb250ZW50PjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJub3ZvLWFjdGl2aXR5LXRhYmxlLWVtcHR5LW1lc3NhZ2VcIiAqbmdJZj1cImZpbHRlcmVkLmNoaWxkTm9kZXMubGVuZ3RoID09IDBcIj5cbiAgICAgICAgICAgIDxoND48aSBjbGFzcz1cImJoaS1zZWFyY2gtcXVlc3Rpb25cIj48L2k+IHt7IGxhYmVscy5ub01hdGNoaW5nUmVjb3Jkc01lc3NhZ2UgfX08L2g0PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwibm92by1hY3Rpdml0eS10YWJsZS1lbXB0eS1jb250YWluZXJcIlxuICAgICAgICAgICpuZ0lmPVwiZGF0YVNvdXJjZT8udG90YWxseUVtcHR5ICYmICFkYXRhU291cmNlPy5sb2FkaW5nICYmICFsb2FkaW5nICYmICFzdGF0ZS51c2VyRmlsdGVyZWQgJiYgIWRhdGFTb3VyY2UucHJpc3RpbmVcIlxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiAjZW1wdHk+PG5nLWNvbnRlbnQgc2VsZWN0PVwiW25vdm8tYWN0aXZpdHktdGFibGUtZW1wdHktbWVzc2FnZV1cIj48L25nLWNvbnRlbnQ+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tYWN0aXZpdHktdGFibGUtZW1wdHktbWVzc2FnZVwiICpuZ0lmPVwiZW1wdHkuY2hpbGROb2Rlcy5sZW5ndGggPT0gMFwiPlxuICAgICAgICAgICAgPGg0PjxpIGNsYXNzPVwiYmhpLXNlYXJjaC1xdWVzdGlvblwiPjwvaT4ge3sgbGFiZWxzLmVtcHR5VGFibGVNZXNzYWdlIH19PC9oND5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW05vdm9BY3Rpdml0eVRhYmxlU3RhdGVdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQWN0aXZpdHlUYWJsZTxUPiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5nbG9iYWwtc2VhcmNoLWhpZGRlbicpXG4gIGdsb2JhbFNlYXJjaEhpZGRlbkNsYXNzVG9nZ2xlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgYWN0aXZpdHlTZXJ2aWNlOiBBY3Rpdml0eVRhYmxlU2VydmljZTxUPjtcbiAgQElucHV0KClcbiAgY29sdW1uczogU2ltcGxlVGFibGVDb2x1bW48VD5bXTtcbiAgQElucHV0KClcbiAgZGlzcGxheWVkQ29sdW1uczogc3RyaW5nW107XG4gIEBJbnB1dCgpXG4gIGFjdGlvbkNvbHVtbnM6IFNpbXBsZVRhYmxlQWN0aW9uQ29sdW1uPFQ+W107XG4gIEBJbnB1dCgpXG4gIHBhZ2luYXRpb25PcHRpb25zOiBTaW1wbGVUYWJsZVBhZ2luYXRpb25PcHRpb25zO1xuICBASW5wdXQoKVxuICBzZWFyY2hPcHRpb25zOiBTaW1wbGVUYWJsZVNlYXJjaE9wdGlvbnM7XG4gIEBJbnB1dCgpXG4gIGRlZmF1bHRTb3J0OiB7IGlkOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmcgfTtcbiAgQElucHV0KClcbiAgb3V0c2lkZUZpbHRlcjogRXZlbnRFbWl0dGVyPGFueT47XG5cbiAgQElucHV0KClcbiAgc2V0IGN1c3RvbUZpbHRlcih2OiBib29sZWFuKSB7XG4gICAgdGhpcy5fY3VzdG9tRmlsdGVyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHYpO1xuICB9XG4gIGdldCBjdXN0b21GaWx0ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1c3RvbUZpbHRlcjtcbiAgfVxuICBwcml2YXRlIF9jdXN0b21GaWx0ZXI6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgc2V0IGZvcmNlU2hvd0hlYWRlcih2OiBib29sZWFuKSB7XG4gICAgdGhpcy5fZm9yY2VTaG93SGVhZGVyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHYpO1xuICB9XG4gIGdldCBmb3JjZVNob3dIZWFkZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZvcmNlU2hvd0hlYWRlcjtcbiAgfVxuICBwcml2YXRlIF9mb3JjZVNob3dIZWFkZXI6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgc2V0IGhpZGVHbG9iYWxTZWFyY2godjogYm9vbGVhbikge1xuICAgIHRoaXMuX2hpZGVHbG9iYWxTZWFyY2ggPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodik7XG4gICAgdGhpcy5nbG9iYWxTZWFyY2hIaWRkZW5DbGFzc1RvZ2dsZSA9IHRoaXMuX2hpZGVHbG9iYWxTZWFyY2g7XG4gIH1cbiAgZ2V0IGhpZGVHbG9iYWxTZWFyY2goKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hpZGVHbG9iYWxTZWFyY2g7XG4gIH1cbiAgcHJpdmF0ZSBfaGlkZUdsb2JhbFNlYXJjaDogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBzZXQgZGVidWcodjogYm9vbGVhbikge1xuICAgIHRoaXMuX2RlYnVnID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHYpO1xuICB9XG4gIGdldCBkZWJ1ZygpIHtcbiAgICByZXR1cm4gdGhpcy5fZGVidWc7XG4gIH1cbiAgcHJpdmF0ZSBfZGVidWc6IGJvb2xlYW47XG5cbiAgcHVibGljIGRhdGFTb3VyY2U6IEFjdGl2aXR5VGFibGVEYXRhU291cmNlPFQ+O1xuICBwdWJsaWMgbG9hZGluZzogYm9vbGVhbiA9IHRydWU7XG5cbiAgcHJpdmF0ZSBvdXRzaWRlRmlsdGVyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5lbXB0eScpXG4gIGdldCBlbXB0eSgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhU291cmNlICYmIHRoaXMuZGF0YVNvdXJjZS50b3RhbGx5RW1wdHk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmxvYWRpbmcnKVxuICBnZXQgbG9hZGluZ0NsYXNzKCkge1xuICAgIHJldHVybiB0aGlzLmxvYWRpbmcgfHwgKHRoaXMuZGF0YVNvdXJjZSAmJiB0aGlzLmRhdGFTb3VyY2UubG9hZGluZyk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLCBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHB1YmxpYyBzdGF0ZTogTm92b0FjdGl2aXR5VGFibGVTdGF0ZSkge1xuICAgIG5vdGlmeSgnW0RlcHJlY2F0ZWRdOiBUaGUgc2ltcGxlIHRhYmxlIGlzIGRlcHJlY2F0ZWQuIFBsZWFzZSBtaWdyYXRlIHRvIG5vdm8tZGF0YS10YWJsZXMhJyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIHRoaXMubG9hZGluZyA9IGNoYW5nZXMuYWN0aXZpdHlTZXJ2aWNlICYmICFjaGFuZ2VzLmFjdGl2aXR5U2VydmljZS5jdXJyZW50VmFsdWU7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIGlmIChjaGFuZ2VzLmFjdGl2aXR5U2VydmljZSAmJiBjaGFuZ2VzLmFjdGl2aXR5U2VydmljZS5jdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5kYXRhU291cmNlID0gbmV3IEFjdGl2aXR5VGFibGVEYXRhU291cmNlPFQ+KHRoaXMuYWN0aXZpdHlTZXJ2aWNlLCB0aGlzLnN0YXRlLCB0aGlzLnJlZik7XG4gICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLm91dHNpZGVGaWx0ZXIgJiYgY2hhbmdlcy5vdXRzaWRlRmlsdGVyLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgaWYgKCF0aGlzLm91dHNpZGVGaWx0ZXJTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgdGhpcy5vdXRzaWRlRmlsdGVyU3Vic2NyaXB0aW9uID0gdGhpcy5vdXRzaWRlRmlsdGVyLnN1YnNjcmliZSgoZmlsdGVyOiBhbnkpID0+IHtcbiAgICAgICAgICB0aGlzLnN0YXRlLm91dHNpZGVGaWx0ZXIgPSBmaWx0ZXI7XG4gICAgICAgICAgdGhpcy5zdGF0ZS51cGRhdGVzLm5leHQoeyBnbG9iYWxTZWFyY2g6IHRoaXMuc3RhdGUuZ2xvYmFsU2VhcmNoLCBmaWx0ZXI6IHRoaXMuc3RhdGUuZmlsdGVyLCBzb3J0OiB0aGlzLnN0YXRlLnNvcnQgfSk7XG4gICAgICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vdXRzaWRlRmlsdGVyU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLm91dHNpZGVGaWx0ZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBhZ2luYXRpb25PcHRpb25zICYmICF0aGlzLnBhZ2luYXRpb25PcHRpb25zLnBhZ2UpIHtcbiAgICAgIHRoaXMucGFnaW5hdGlvbk9wdGlvbnMucGFnZSA9IDA7XG4gICAgfVxuICAgIGlmICh0aGlzLnBhZ2luYXRpb25PcHRpb25zICYmICF0aGlzLnBhZ2luYXRpb25PcHRpb25zLnBhZ2VTaXplKSB7XG4gICAgICB0aGlzLnBhZ2luYXRpb25PcHRpb25zLnBhZ2VTaXplID0gNTA7XG4gICAgfVxuICAgIGlmICh0aGlzLnBhZ2luYXRpb25PcHRpb25zICYmICF0aGlzLnBhZ2luYXRpb25PcHRpb25zLnBhZ2VTaXplT3B0aW9ucykge1xuICAgICAgdGhpcy5wYWdpbmF0aW9uT3B0aW9ucy5wYWdlU2l6ZU9wdGlvbnMgPSBbMTAsIDI1LCA1MCwgMTAwXTtcbiAgICB9XG4gICAgdGhpcy5zdGF0ZS5wYWdlID0gdGhpcy5wYWdpbmF0aW9uT3B0aW9ucyA/IHRoaXMucGFnaW5hdGlvbk9wdGlvbnMucGFnZSA6IHVuZGVmaW5lZDtcbiAgICB0aGlzLnN0YXRlLnBhZ2VTaXplID0gdGhpcy5wYWdpbmF0aW9uT3B0aW9ucyA/IHRoaXMucGFnaW5hdGlvbk9wdGlvbnMucGFnZVNpemUgOiB1bmRlZmluZWQ7XG4gICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwdWJsaWMgb25TZWFyY2hDaGFuZ2UodGVybTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0ZS5nbG9iYWxTZWFyY2ggPSB0ZXJtO1xuICAgIHRoaXMuc3RhdGUucmVzZXQoZmFsc2UsIHRydWUpO1xuICAgIHRoaXMuc3RhdGUudXBkYXRlcy5uZXh0KHsgZ2xvYmFsU2VhcmNoOiB0ZXJtLCBmaWx0ZXI6IHRoaXMuc3RhdGUuZmlsdGVyLCBzb3J0OiB0aGlzLnN0YXRlLnNvcnQgfSk7XG4gIH1cbn1cbiJdfQ==
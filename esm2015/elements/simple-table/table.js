import { ChangeDetectionStrategy, Component, ViewEncapsulation, HostBinding, Input, Directive, EventEmitter, ChangeDetectorRef, } from '@angular/core';
import { CDK_TABLE_TEMPLATE, CdkTable } from '@angular/cdk/table';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ActivityTableDataSource } from './table-source';
import { NovoLabelService } from '../../services/novo-label-service';
import { NovoActivityTableState } from './state';
import { notify } from '../../utils/notifier/notifier.util';
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
        this.loading = changes['activityService'] && !changes['activityService'].currentValue;
        this.ref.detectChanges();
        if (changes['activityService'] && changes['activityService'].currentValue) {
            this.loading = false;
            this.dataSource = new ActivityTableDataSource(this.activityService, this.state, this.ref);
            this.ref.detectChanges();
        }
        if (changes['outsideFilter'] && changes['outsideFilter'].currentValue) {
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
                [hint]="searchOptions?.tooltip">
            </novo-search>
            <novo-simple-table-pagination
                *ngIf="paginationOptions"
                [length]="dataSource?.total"
                [page]="paginationOptions.page"
                [pageSize]="paginationOptions.pageSize"
                [pageSizeOptions]="paginationOptions.pageSizeOptions">
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
                <novo-simple-table *ngIf="(columns?.length > 0)" [dataSource]="dataSource" novoSortFilter novoSelection [class.empty]="dataSource?.currentlyEmpty && state.userFiltered" [hidden]="dataSource?.totallyEmpty && !state.userFiltered">
                    <ng-content></ng-content>
                    <ng-container novoSimpleColumnDef="selection">
                        <novo-simple-checkbox-header-cell *novoSimpleHeaderCellDef></novo-simple-checkbox-header-cell>
                        <novo-simple-checkbox-cell *novoSimpleCellDef="let row; let i = index" [row]="row" [index]="i"></novo-simple-checkbox-cell>
                    </ng-container>
                    <ng-container *ngFor="let column of actionColumns" [novoSimpleColumnDef]="column.id">
                        <novo-simple-empty-header-cell [class.button-header-cell]="!column.options" [class.dropdown-header-cell]="column.options" *novoSimpleHeaderCellDef></novo-simple-empty-header-cell>
                        <novo-simple-action-cell *novoSimpleCellDef="let row; let i = index" [row]="row" [column]="column"></novo-simple-action-cell>
                    </ng-container>
                    <ng-container *ngFor="let column of columns" [novoSimpleColumnDef]="column.id">
                        <novo-simple-header-cell *novoSimpleHeaderCellDef [column]="column" [novo-simple-cell-config]="column.config" [defaultSort]="defaultSort">{{ column.label }}</novo-simple-header-cell>
                        <novo-simple-cell *novoSimpleCellDef="let row" [column]="column" [row]="row"></novo-simple-cell>
                    </ng-container>
                    <novo-simple-header-row *novoSimpleHeaderRowDef="displayedColumns"></novo-simple-header-row>
                    <novo-simple-row *novoSimpleRowDef="let row; columns: displayedColumns;"></novo-simple-row>
                </novo-simple-table>
                <div class="novo-activity-table-no-results-container" *ngIf="dataSource?.currentlyEmpty && state.userFiltered && !dataSource?.loading && !loading && !dataSource.pristine">
                    <div #filtered><ng-content select="[novo-activity-table-no-results-message]"></ng-content></div>
                    <div class="novo-activity-table-empty-message" *ngIf="filtered.childNodes.length == 0">
                        <h4><i class="bhi-search-question"></i> {{ labels.noMatchingRecordsMessage }}</h4>
                    </div>
                </div>
                <div class="novo-activity-table-empty-container" *ngIf="dataSource?.totallyEmpty && !dataSource?.loading && !loading && !state.userFiltered && !dataSource.pristine">
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL3NpbXBsZS10YWJsZS90YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsV0FBVyxFQUNYLEtBQUssRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUdaLGlCQUFpQixHQUdsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFJOUQsT0FBTyxFQUF3Qix1QkFBdUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQy9FLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNqRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFNUQscUVBQXFFO0FBQ3JFLE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUM7QUFRbkMsTUFBTSxPQUFPLFNBQWEsU0FBUSxVQUFhOzs7WUFOOUMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7QUFRRCxNQUFNLE9BQU8sd0JBQXdCOzs7WUFIcEMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw2QkFBNkI7YUFDeEM7O0FBTUQsTUFBTSxPQUFPLDZCQUE2Qjs7O1lBSHpDLFNBQVMs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QkFBaUI7WUFXVixzQkFBc0I7Ozs0Q0FzSDVCLFdBQVcsU0FBQyw0QkFBNEI7OEJBR3hDLEtBQUs7c0JBRUwsS0FBSzsrQkFFTCxLQUFLOzRCQUVMLEtBQUs7Z0NBRUwsS0FBSzs0QkFFTCxLQUFLOzBCQUVMLEtBQUs7NEJBRUwsS0FBSzsyQkFHTCxLQUFLOzhCQVNMLEtBQUs7K0JBU0wsS0FBSztvQkFVTCxLQUFLO29CQWNMLFdBQVcsU0FBQyxhQUFhOzJCQUt6QixXQUFXLFNBQUMsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ29tcG9uZW50LFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxyXG4gIEhvc3RCaW5kaW5nLFxyXG4gIElucHV0LFxyXG4gIERpcmVjdGl2ZSxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgQWZ0ZXJDb250ZW50SW5pdCxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkRlc3Ryb3ksXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENES19UQUJMRV9URU1QTEFURSwgQ2RrVGFibGUgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xyXG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IFNpbXBsZVRhYmxlQ29sdW1uLCBTaW1wbGVUYWJsZUFjdGlvbkNvbHVtbiwgU2ltcGxlVGFibGVQYWdpbmF0aW9uT3B0aW9ucywgU2ltcGxlVGFibGVTZWFyY2hPcHRpb25zIH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgQWN0aXZpdHlUYWJsZVNlcnZpY2UsIEFjdGl2aXR5VGFibGVEYXRhU291cmNlIH0gZnJvbSAnLi90YWJsZS1zb3VyY2UnO1xyXG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbm92by1sYWJlbC1zZXJ2aWNlJztcclxuaW1wb3J0IHsgTm92b0FjdGl2aXR5VGFibGVTdGF0ZSB9IGZyb20gJy4vc3RhdGUnO1xyXG5pbXBvcnQgeyBub3RpZnkgfSBmcm9tICcuLi8uLi91dGlscy9ub3RpZmllci9ub3RpZmllci51dGlsJztcclxuXHJcbi8qKiBXb3JrYXJvdW5kIGZvciBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xNzg0OSAqL1xyXG5leHBvcnQgY29uc3QgX05vdm9UYWJsZSA9IENka1RhYmxlO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLXNpbXBsZS10YWJsZScsXHJcbiAgdGVtcGxhdGU6IENES19UQUJMRV9URU1QTEFURSxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b1RhYmxlPFQ+IGV4dGVuZHMgX05vdm9UYWJsZTxUPiB7XHJcbiAgLy8gVE9ETzogYWRkIGV4cGxpY2l0IGNvbnN0cnVjdG9yXHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnbm92by1hY3Rpdml0eS10YWJsZS1hY3Rpb25zJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9BY3Rpdml0eVRhYmxlQWN0aW9ucyB7fVxyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLWFjdGl2aXR5LXRhYmxlLWN1c3RvbS1oZWFkZXInLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b0FjdGl2aXR5VGFibGVDdXN0b21IZWFkZXIge31cclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnbm92by1hY3Rpdml0eS10YWJsZS1jdXN0b20tZmlsdGVyJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9BY3Rpdml0eVRhYmxlQ3VzdG9tRmlsdGVyIHt9XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ25vdm8tYWN0aXZpdHktdGFibGUtZW1wdHktbWVzc2FnZScsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvQWN0aXZpdHlUYWJsZUVtcHR5TWVzc2FnZSB7fVxyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLWFjdGl2aXR5LXRhYmxlLW5vLXJlc3VsdHMtbWVzc2FnZScsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvQWN0aXZpdHlUYWJsZU5vUmVzdWx0c01lc3NhZ2Uge31cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbm92by1hY3Rpdml0eS10YWJsZScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2ICpuZ0lmPVwiZGVidWdcIj5cclxuICAgICAgICAgICAgPHA+VG90YWw6IHt7IGRhdGFTb3VyY2U/LnRvdGFsIH19PC9wPlxyXG4gICAgICAgICAgICA8cD5DdXJyZW50OiB7eyBkYXRhU291cmNlPy5jdXJyZW50IH19PC9wPlxyXG4gICAgICAgICAgICA8cD5Ub3RhbGx5IEVtcHR5OiB7eyBkYXRhU291cmNlPy50b3RhbGx5RW1wdHkgfX08L3A+XHJcbiAgICAgICAgICAgIDxwPkN1cnJlbnRseSBFbXB0eToge3sgZGF0YVNvdXJjZT8uY3VycmVudGx5RW1wdHkgfX08L3A+XHJcbiAgICAgICAgICAgIDxwPkxvYWRpbmcgKERhdGFTb3VyY2UpOiB7eyBkYXRhU291cmNlPy5sb2FkaW5nIH19PC9wPlxyXG4gICAgICAgICAgICA8cD5Vc2VyIEZpbHRlcmVkOiB7eyBzdGF0ZS51c2VyRmlsdGVyZWQgfX08L3A+XHJcbiAgICAgICAgICAgIDxwPkxvYWRpbmcgKFRhYmxlKToge3sgbG9hZGluZyB9fTwvcD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8aGVhZGVyICpuZ0lmPVwiKCEoZGF0YVNvdXJjZT8udG90YWxseUVtcHR5ICYmICFzdGF0ZS51c2VyRmlsdGVyZWQpICYmICFsb2FkaW5nKSB8fCBmb3JjZVNob3dIZWFkZXJcIj5cclxuICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW25vdm8tYWN0aXZpdHktdGFibGUtY3VzdG9tLWhlYWRlcl1cIj48L25nLWNvbnRlbnQ+XHJcbiAgICAgICAgICAgIDxub3ZvLXNlYXJjaFxyXG4gICAgICAgICAgICAgICAgYWx3YXlzT3Blbj1cInRydWVcIlxyXG4gICAgICAgICAgICAgICAgKHNlYXJjaENoYW5nZWQpPVwib25TZWFyY2hDaGFuZ2UoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cInN0YXRlLmdsb2JhbFNlYXJjaFwiXHJcbiAgICAgICAgICAgICAgICAqbmdJZj1cIiFoaWRlR2xvYmFsU2VhcmNoXCJcclxuICAgICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJzZWFyY2hPcHRpb25zPy5wbGFjZWhvbGRlclwiXHJcbiAgICAgICAgICAgICAgICBbaGludF09XCJzZWFyY2hPcHRpb25zPy50b29sdGlwXCI+XHJcbiAgICAgICAgICAgIDwvbm92by1zZWFyY2g+XHJcbiAgICAgICAgICAgIDxub3ZvLXNpbXBsZS10YWJsZS1wYWdpbmF0aW9uXHJcbiAgICAgICAgICAgICAgICAqbmdJZj1cInBhZ2luYXRpb25PcHRpb25zXCJcclxuICAgICAgICAgICAgICAgIFtsZW5ndGhdPVwiZGF0YVNvdXJjZT8udG90YWxcIlxyXG4gICAgICAgICAgICAgICAgW3BhZ2VdPVwicGFnaW5hdGlvbk9wdGlvbnMucGFnZVwiXHJcbiAgICAgICAgICAgICAgICBbcGFnZVNpemVdPVwicGFnaW5hdGlvbk9wdGlvbnMucGFnZVNpemVcIlxyXG4gICAgICAgICAgICAgICAgW3BhZ2VTaXplT3B0aW9uc109XCJwYWdpbmF0aW9uT3B0aW9ucy5wYWdlU2l6ZU9wdGlvbnNcIj5cclxuICAgICAgICAgICAgPC9ub3ZvLXNpbXBsZS10YWJsZS1wYWdpbmF0aW9uPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibm92by1hY3Rpdml0eS10YWJsZS1hY3Rpb25zXCI+XHJcbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbbm92by1hY3Rpdml0eS10YWJsZS1hY3Rpb25zXVwiPjwvbmctY29udGVudD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9oZWFkZXI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tYWN0aXZpdHktdGFibGUtbG9hZGluZy1tYXNrXCIgKm5nSWY9XCJkYXRhU291cmNlPy5sb2FkaW5nIHx8IGxvYWRpbmdcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLWFjdGl2aXR5LXRhYmxlLWxvYWRpbmdcIj5cclxuICAgICAgICAgICAgPG5vdm8tbG9hZGluZz48L25vdm8tbG9hZGluZz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibm92by1hY3Rpdml0eS10YWJsZS1maWx0ZXItY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJub3ZvLWFjdGl2aXR5LXRhYmxlLWN1c3RvbS1maWx0ZXJcIiAqbmdJZj1cImN1c3RvbUZpbHRlclwiPlxyXG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW25vdm8tYWN0aXZpdHktdGFibGUtY3VzdG9tLWZpbHRlcl1cIj48L25nLWNvbnRlbnQ+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibm92by1hY3Rpdml0eS10YWJsZS1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgIDxub3ZvLXNpbXBsZS10YWJsZSAqbmdJZj1cIihjb2x1bW5zPy5sZW5ndGggPiAwKVwiIFtkYXRhU291cmNlXT1cImRhdGFTb3VyY2VcIiBub3ZvU29ydEZpbHRlciBub3ZvU2VsZWN0aW9uIFtjbGFzcy5lbXB0eV09XCJkYXRhU291cmNlPy5jdXJyZW50bHlFbXB0eSAmJiBzdGF0ZS51c2VyRmlsdGVyZWRcIiBbaGlkZGVuXT1cImRhdGFTb3VyY2U/LnRvdGFsbHlFbXB0eSAmJiAhc3RhdGUudXNlckZpbHRlcmVkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgbm92b1NpbXBsZUNvbHVtbkRlZj1cInNlbGVjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bm92by1zaW1wbGUtY2hlY2tib3gtaGVhZGVyLWNlbGwgKm5vdm9TaW1wbGVIZWFkZXJDZWxsRGVmPjwvbm92by1zaW1wbGUtY2hlY2tib3gtaGVhZGVyLWNlbGw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxub3ZvLXNpbXBsZS1jaGVja2JveC1jZWxsICpub3ZvU2ltcGxlQ2VsbERlZj1cImxldCByb3c7IGxldCBpID0gaW5kZXhcIiBbcm93XT1cInJvd1wiIFtpbmRleF09XCJpXCI+PC9ub3ZvLXNpbXBsZS1jaGVja2JveC1jZWxsPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBhY3Rpb25Db2x1bW5zXCIgW25vdm9TaW1wbGVDb2x1bW5EZWZdPVwiY29sdW1uLmlkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxub3ZvLXNpbXBsZS1lbXB0eS1oZWFkZXItY2VsbCBbY2xhc3MuYnV0dG9uLWhlYWRlci1jZWxsXT1cIiFjb2x1bW4ub3B0aW9uc1wiIFtjbGFzcy5kcm9wZG93bi1oZWFkZXItY2VsbF09XCJjb2x1bW4ub3B0aW9uc1wiICpub3ZvU2ltcGxlSGVhZGVyQ2VsbERlZj48L25vdm8tc2ltcGxlLWVtcHR5LWhlYWRlci1jZWxsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bm92by1zaW1wbGUtYWN0aW9uLWNlbGwgKm5vdm9TaW1wbGVDZWxsRGVmPVwibGV0IHJvdzsgbGV0IGkgPSBpbmRleFwiIFtyb3ddPVwicm93XCIgW2NvbHVtbl09XCJjb2x1bW5cIj48L25vdm8tc2ltcGxlLWFjdGlvbi1jZWxsPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBjb2x1bW5zXCIgW25vdm9TaW1wbGVDb2x1bW5EZWZdPVwiY29sdW1uLmlkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxub3ZvLXNpbXBsZS1oZWFkZXItY2VsbCAqbm92b1NpbXBsZUhlYWRlckNlbGxEZWYgW2NvbHVtbl09XCJjb2x1bW5cIiBbbm92by1zaW1wbGUtY2VsbC1jb25maWddPVwiY29sdW1uLmNvbmZpZ1wiIFtkZWZhdWx0U29ydF09XCJkZWZhdWx0U29ydFwiPnt7IGNvbHVtbi5sYWJlbCB9fTwvbm92by1zaW1wbGUtaGVhZGVyLWNlbGw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxub3ZvLXNpbXBsZS1jZWxsICpub3ZvU2ltcGxlQ2VsbERlZj1cImxldCByb3dcIiBbY29sdW1uXT1cImNvbHVtblwiIFtyb3ddPVwicm93XCI+PC9ub3ZvLXNpbXBsZS1jZWxsPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgICAgIDxub3ZvLXNpbXBsZS1oZWFkZXItcm93ICpub3ZvU2ltcGxlSGVhZGVyUm93RGVmPVwiZGlzcGxheWVkQ29sdW1uc1wiPjwvbm92by1zaW1wbGUtaGVhZGVyLXJvdz5cclxuICAgICAgICAgICAgICAgICAgICA8bm92by1zaW1wbGUtcm93ICpub3ZvU2ltcGxlUm93RGVmPVwibGV0IHJvdzsgY29sdW1uczogZGlzcGxheWVkQ29sdW1ucztcIj48L25vdm8tc2ltcGxlLXJvdz5cclxuICAgICAgICAgICAgICAgIDwvbm92by1zaW1wbGUtdGFibGU+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibm92by1hY3Rpdml0eS10YWJsZS1uby1yZXN1bHRzLWNvbnRhaW5lclwiICpuZ0lmPVwiZGF0YVNvdXJjZT8uY3VycmVudGx5RW1wdHkgJiYgc3RhdGUudXNlckZpbHRlcmVkICYmICFkYXRhU291cmNlPy5sb2FkaW5nICYmICFsb2FkaW5nICYmICFkYXRhU291cmNlLnByaXN0aW5lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiAjZmlsdGVyZWQ+PG5nLWNvbnRlbnQgc2VsZWN0PVwiW25vdm8tYWN0aXZpdHktdGFibGUtbm8tcmVzdWx0cy1tZXNzYWdlXVwiPjwvbmctY29udGVudD48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibm92by1hY3Rpdml0eS10YWJsZS1lbXB0eS1tZXNzYWdlXCIgKm5nSWY9XCJmaWx0ZXJlZC5jaGlsZE5vZGVzLmxlbmd0aCA9PSAwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoND48aSBjbGFzcz1cImJoaS1zZWFyY2gtcXVlc3Rpb25cIj48L2k+IHt7IGxhYmVscy5ub01hdGNoaW5nUmVjb3Jkc01lc3NhZ2UgfX08L2g0PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibm92by1hY3Rpdml0eS10YWJsZS1lbXB0eS1jb250YWluZXJcIiAqbmdJZj1cImRhdGFTb3VyY2U/LnRvdGFsbHlFbXB0eSAmJiAhZGF0YVNvdXJjZT8ubG9hZGluZyAmJiAhbG9hZGluZyAmJiAhc3RhdGUudXNlckZpbHRlcmVkICYmICFkYXRhU291cmNlLnByaXN0aW5lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiAjZW1wdHk+PG5nLWNvbnRlbnQgc2VsZWN0PVwiW25vdm8tYWN0aXZpdHktdGFibGUtZW1wdHktbWVzc2FnZV1cIj48L25nLWNvbnRlbnQ+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tYWN0aXZpdHktdGFibGUtZW1wdHktbWVzc2FnZVwiICpuZ0lmPVwiZW1wdHkuY2hpbGROb2Rlcy5sZW5ndGggPT0gMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQ+PGkgY2xhc3M9XCJiaGktc2VhcmNoLXF1ZXN0aW9uXCI+PC9pPiB7eyBsYWJlbHMuZW1wdHlUYWJsZU1lc3NhZ2UgfX08L2g0PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBwcm92aWRlcnM6IFtOb3ZvQWN0aXZpdHlUYWJsZVN0YXRlXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9BY3Rpdml0eVRhYmxlPFQ+IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZ2xvYmFsLXNlYXJjaC1oaWRkZW4nKVxyXG4gIGdsb2JhbFNlYXJjaEhpZGRlbkNsYXNzVG9nZ2xlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgYWN0aXZpdHlTZXJ2aWNlOiBBY3Rpdml0eVRhYmxlU2VydmljZTxUPjtcclxuICBASW5wdXQoKVxyXG4gIGNvbHVtbnM6IFNpbXBsZVRhYmxlQ29sdW1uPFQ+W107XHJcbiAgQElucHV0KClcclxuICBkaXNwbGF5ZWRDb2x1bW5zOiBzdHJpbmdbXTtcclxuICBASW5wdXQoKVxyXG4gIGFjdGlvbkNvbHVtbnM6IFNpbXBsZVRhYmxlQWN0aW9uQ29sdW1uPFQ+W107XHJcbiAgQElucHV0KClcclxuICBwYWdpbmF0aW9uT3B0aW9uczogU2ltcGxlVGFibGVQYWdpbmF0aW9uT3B0aW9ucztcclxuICBASW5wdXQoKVxyXG4gIHNlYXJjaE9wdGlvbnM6IFNpbXBsZVRhYmxlU2VhcmNoT3B0aW9ucztcclxuICBASW5wdXQoKVxyXG4gIGRlZmF1bHRTb3J0OiB7IGlkOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmcgfTtcclxuICBASW5wdXQoKVxyXG4gIG91dHNpZGVGaWx0ZXI6IEV2ZW50RW1pdHRlcjxhbnk+O1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBjdXN0b21GaWx0ZXIodjogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fY3VzdG9tRmlsdGVyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHYpO1xyXG4gIH1cclxuICBnZXQgY3VzdG9tRmlsdGVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2N1c3RvbUZpbHRlcjtcclxuICB9XHJcbiAgcHJpdmF0ZSBfY3VzdG9tRmlsdGVyOiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBmb3JjZVNob3dIZWFkZXIodjogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fZm9yY2VTaG93SGVhZGVyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHYpO1xyXG4gIH1cclxuICBnZXQgZm9yY2VTaG93SGVhZGVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ZvcmNlU2hvd0hlYWRlcjtcclxuICB9XHJcbiAgcHJpdmF0ZSBfZm9yY2VTaG93SGVhZGVyOiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBoaWRlR2xvYmFsU2VhcmNoKHY6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2hpZGVHbG9iYWxTZWFyY2ggPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodik7XHJcbiAgICB0aGlzLmdsb2JhbFNlYXJjaEhpZGRlbkNsYXNzVG9nZ2xlID0gdGhpcy5faGlkZUdsb2JhbFNlYXJjaDtcclxuICB9XHJcbiAgZ2V0IGhpZGVHbG9iYWxTZWFyY2goKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faGlkZUdsb2JhbFNlYXJjaDtcclxuICB9XHJcbiAgcHJpdmF0ZSBfaGlkZUdsb2JhbFNlYXJjaDogYm9vbGVhbjtcclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgZGVidWcodjogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fZGVidWcgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodik7XHJcbiAgfVxyXG4gIGdldCBkZWJ1ZygpIHtcclxuICAgIHJldHVybiB0aGlzLl9kZWJ1ZztcclxuICB9XHJcbiAgcHJpdmF0ZSBfZGVidWc6IGJvb2xlYW47XHJcblxyXG4gIHB1YmxpYyBkYXRhU291cmNlOiBBY3Rpdml0eVRhYmxlRGF0YVNvdXJjZTxUPjtcclxuICBwdWJsaWMgbG9hZGluZzogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIHByaXZhdGUgb3V0c2lkZUZpbHRlclN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmVtcHR5JylcclxuICBnZXQgZW1wdHkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhU291cmNlICYmIHRoaXMuZGF0YVNvdXJjZS50b3RhbGx5RW1wdHk7XHJcbiAgfVxyXG5cclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmxvYWRpbmcnKVxyXG4gIGdldCBsb2FkaW5nQ2xhc3MoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sb2FkaW5nIHx8ICh0aGlzLmRhdGFTb3VyY2UgJiYgdGhpcy5kYXRhU291cmNlLmxvYWRpbmcpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSwgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmLCBwdWJsaWMgc3RhdGU6IE5vdm9BY3Rpdml0eVRhYmxlU3RhdGUpIHtcclxuICAgIG5vdGlmeSgnW0RlcHJlY2F0ZWRdOiBUaGUgc2ltcGxlIHRhYmxlIGlzIGRlcHJlY2F0ZWQuIFBsZWFzZSBtaWdyYXRlIHRvIG5vdm8tZGF0YS10YWJsZXMhJyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgdGhpcy5sb2FkaW5nID0gY2hhbmdlc1snYWN0aXZpdHlTZXJ2aWNlJ10gJiYgIWNoYW5nZXNbJ2FjdGl2aXR5U2VydmljZSddLmN1cnJlbnRWYWx1ZTtcclxuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcclxuICAgIGlmIChjaGFuZ2VzWydhY3Rpdml0eVNlcnZpY2UnXSAmJiBjaGFuZ2VzWydhY3Rpdml0eVNlcnZpY2UnXS5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuZGF0YVNvdXJjZSA9IG5ldyBBY3Rpdml0eVRhYmxlRGF0YVNvdXJjZTxUPih0aGlzLmFjdGl2aXR5U2VydmljZSwgdGhpcy5zdGF0ZSwgdGhpcy5yZWYpO1xyXG4gICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICB9XHJcbiAgICBpZiAoY2hhbmdlc1snb3V0c2lkZUZpbHRlciddICYmIGNoYW5nZXNbJ291dHNpZGVGaWx0ZXInXS5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgaWYgKCF0aGlzLm91dHNpZGVGaWx0ZXJTdWJzY3JpcHRpb24pIHtcclxuICAgICAgICB0aGlzLm91dHNpZGVGaWx0ZXJTdWJzY3JpcHRpb24gPSB0aGlzLm91dHNpZGVGaWx0ZXIuc3Vic2NyaWJlKChmaWx0ZXI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zdGF0ZS5vdXRzaWRlRmlsdGVyID0gZmlsdGVyO1xyXG4gICAgICAgICAgdGhpcy5zdGF0ZS51cGRhdGVzLm5leHQoeyBnbG9iYWxTZWFyY2g6IHRoaXMuc3RhdGUuZ2xvYmFsU2VhcmNoLCBmaWx0ZXI6IHRoaXMuc3RhdGUuZmlsdGVyLCBzb3J0OiB0aGlzLnN0YXRlLnNvcnQgfSk7XHJcbiAgICAgICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMub3V0c2lkZUZpbHRlclN1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLm91dHNpZGVGaWx0ZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5wYWdpbmF0aW9uT3B0aW9ucyAmJiAhdGhpcy5wYWdpbmF0aW9uT3B0aW9ucy5wYWdlKSB7XHJcbiAgICAgIHRoaXMucGFnaW5hdGlvbk9wdGlvbnMucGFnZSA9IDA7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5wYWdpbmF0aW9uT3B0aW9ucyAmJiAhdGhpcy5wYWdpbmF0aW9uT3B0aW9ucy5wYWdlU2l6ZSkge1xyXG4gICAgICB0aGlzLnBhZ2luYXRpb25PcHRpb25zLnBhZ2VTaXplID0gNTA7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5wYWdpbmF0aW9uT3B0aW9ucyAmJiAhdGhpcy5wYWdpbmF0aW9uT3B0aW9ucy5wYWdlU2l6ZU9wdGlvbnMpIHtcclxuICAgICAgdGhpcy5wYWdpbmF0aW9uT3B0aW9ucy5wYWdlU2l6ZU9wdGlvbnMgPSBbMTAsIDI1LCA1MCwgMTAwXTtcclxuICAgIH1cclxuICAgIHRoaXMuc3RhdGUucGFnZSA9IHRoaXMucGFnaW5hdGlvbk9wdGlvbnMgPyB0aGlzLnBhZ2luYXRpb25PcHRpb25zLnBhZ2UgOiB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLnN0YXRlLnBhZ2VTaXplID0gdGhpcy5wYWdpbmF0aW9uT3B0aW9ucyA/IHRoaXMucGFnaW5hdGlvbk9wdGlvbnMucGFnZVNpemUgOiB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvblNlYXJjaENoYW5nZSh0ZXJtOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHRoaXMuc3RhdGUuZ2xvYmFsU2VhcmNoID0gdGVybTtcclxuICAgIHRoaXMuc3RhdGUucmVzZXQoZmFsc2UsIHRydWUpO1xyXG4gICAgdGhpcy5zdGF0ZS51cGRhdGVzLm5leHQoeyBnbG9iYWxTZWFyY2g6IHRlcm0sIGZpbHRlcjogdGhpcy5zdGF0ZS5maWx0ZXIsIHNvcnQ6IHRoaXMuc3RhdGUuc29ydCB9KTtcclxuICB9XHJcbn1cclxuIl19
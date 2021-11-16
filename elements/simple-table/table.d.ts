import { EventEmitter, AfterContentInit, SimpleChanges, ChangeDetectorRef, OnChanges, OnDestroy } from '@angular/core';
import { CdkTable } from '@angular/cdk/table';
import { SimpleTableColumn, SimpleTableActionColumn, SimpleTablePaginationOptions, SimpleTableSearchOptions } from './interfaces';
import { ActivityTableService, ActivityTableDataSource } from './table-source';
import { NovoLabelService } from '../../services/novo-label-service';
import { NovoActivityTableState } from './state';
/** Workaround for https://github.com/angular/angular/issues/17849 */
import * as ɵngcc0 from '@angular/core';
export declare const _NovoTable: typeof CdkTable;
export declare class NovoTable<T> extends _NovoTable<T> {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoTable<any>, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoTable<any>, "novo-simple-table", never, {}, {}, never, ["caption", "colgroup, col"]>;
}
export declare class NovoActivityTableActions {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoActivityTableActions, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<NovoActivityTableActions, "novo-activity-table-actions", never, {}, {}, never>;
}
export declare class NovoActivityTableCustomHeader {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoActivityTableCustomHeader, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<NovoActivityTableCustomHeader, "novo-activity-table-custom-header", never, {}, {}, never>;
}
export declare class NovoActivityTableCustomFilter {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoActivityTableCustomFilter, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<NovoActivityTableCustomFilter, "novo-activity-table-custom-filter", never, {}, {}, never>;
}
export declare class NovoActivityTableEmptyMessage {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoActivityTableEmptyMessage, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<NovoActivityTableEmptyMessage, "novo-activity-table-empty-message", never, {}, {}, never>;
}
export declare class NovoActivityTableNoResultsMessage {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoActivityTableNoResultsMessage, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<NovoActivityTableNoResultsMessage, "novo-activity-table-no-results-message", never, {}, {}, never>;
}
export declare class NovoActivityTable<T> implements AfterContentInit, OnChanges, OnDestroy {
    labels: NovoLabelService;
    private ref;
    state: NovoActivityTableState;
    globalSearchHiddenClassToggle: boolean;
    activityService: ActivityTableService<T>;
    columns: SimpleTableColumn<T>[];
    displayedColumns: string[];
    actionColumns: SimpleTableActionColumn<T>[];
    paginationOptions: SimpleTablePaginationOptions;
    searchOptions: SimpleTableSearchOptions;
    defaultSort: {
        id: string;
        value: string;
    };
    outsideFilter: EventEmitter<any>;
    set customFilter(v: boolean);
    get customFilter(): boolean;
    private _customFilter;
    set forceShowHeader(v: boolean);
    get forceShowHeader(): boolean;
    private _forceShowHeader;
    set hideGlobalSearch(v: boolean);
    get hideGlobalSearch(): boolean;
    private _hideGlobalSearch;
    set debug(v: boolean);
    get debug(): boolean;
    private _debug;
    dataSource: ActivityTableDataSource<T>;
    loading: boolean;
    private outsideFilterSubscription;
    get empty(): boolean;
    get loadingClass(): boolean;
    constructor(labels: NovoLabelService, ref: ChangeDetectorRef, state: NovoActivityTableState);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    ngAfterContentInit(): void;
    onSearchChange(term: string): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoActivityTable<any>, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoActivityTable<any>, "novo-activity-table", never, { "customFilter": "customFilter"; "forceShowHeader": "forceShowHeader"; "hideGlobalSearch": "hideGlobalSearch"; "debug": "debug"; "activityService": "activityService"; "columns": "columns"; "displayedColumns": "displayedColumns"; "actionColumns": "actionColumns"; "paginationOptions": "paginationOptions"; "searchOptions": "searchOptions"; "defaultSort": "defaultSort"; "outsideFilter": "outsideFilter"; }, {}, never, ["[novo-activity-table-custom-header]", "[novo-activity-table-actions]", "[novo-activity-table-custom-filter]", "*", "[novo-activity-table-no-results-message]", "[novo-activity-table-empty-message]"]>;
}

//# sourceMappingURL=table.d.ts.map
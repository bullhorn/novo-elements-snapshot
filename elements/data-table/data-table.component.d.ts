import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, QueryList, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { NovoLabelService } from 'novo-elements/services';
import { NovoTemplate } from 'novo-elements/elements/common';
import { NovoDataTableCellHeader } from './cell-headers/data-table-header-cell.component';
import { DataTableSource } from './data-table.source';
import { IDataTableColumn, IDataTablePaginationOptions, IDataTablePreferences, IDataTableSearchOptions, IDataTableSelectionOption, IDataTableService } from './interfaces';
import { ListInteractionDictionary, ListInteractionEvent } from './ListInteractionTypes';
import { DataTableState } from './state/data-table-state.service';
import * as i0 from "@angular/core";
export declare class NovoDataTable<T> implements AfterContentInit, OnDestroy {
    labels: NovoLabelService;
    private ref;
    state: DataTableState<T>;
    globalSearchHiddenClassToggle: boolean;
    customTemplates: QueryList<NovoTemplate>;
    defaultTemplates: QueryList<NovoTemplate>;
    cellHeaders: QueryList<NovoDataTableCellHeader<T>>;
    novoDataTableContainer: ElementRef;
    resized: EventEmitter<IDataTableColumn<T>>;
    set displayedColumns(displayedColumns: string[]);
    get displayedColumns(): string[];
    private _disabledColumns;
    paginationOptions: IDataTablePaginationOptions;
    searchOptions: IDataTableSearchOptions;
    selectionOptions: IDataTableSelectionOption[];
    defaultSort: {
        id: string;
        value: string;
    };
    name: string;
    allowMultipleFilters: boolean;
    rowIdentifier: string;
    activeRowIdentifier: string;
    trackByFn: (index: any, item: any) => any;
    templates: {
        [key: string]: TemplateRef<any>;
    };
    fixedHeader: boolean;
    paginatorDataFeatureId: string;
    maxSelected: number;
    canSelectAll: boolean;
    allMatchingSelected: boolean;
    overrideTotal: number;
    paginationRefreshSubject: Subject<void>;
    set dataTableService(service: IDataTableService<T>);
    set rows(rows: T[]);
    set outsideFilter(outsideFilter: EventEmitter<any>);
    set refreshSubject(refreshSubject: EventEmitter<void>);
    set columns(columns: IDataTableColumn<T>[]);
    get columns(): IDataTableColumn<T>[];
    set customFilter(v: boolean);
    get customFilter(): boolean;
    private _customFilter;
    set hasExandedRows(v: boolean);
    get hasExandedRows(): boolean;
    private _hasExandedRows;
    set forceShowHeader(v: boolean);
    get forceShowHeader(): boolean;
    private _forceShowHeader;
    set hideGlobalSearch(v: boolean);
    get hideGlobalSearch(): boolean;
    private _hideGlobalSearch;
    preferencesChanged: EventEmitter<IDataTablePreferences>;
    allSelected: EventEmitter<{
        allSelected: boolean;
        selectedCount: number;
    }>;
    dataSource: DataTableSource<T>;
    loading: boolean;
    columnToTemplate: {
        [key: string]: TemplateRef<any>;
    };
    columnsLoaded: boolean;
    selection: Set<string>;
    scrollLeft: number;
    expandable: boolean;
    private outsideFilterSubscription;
    private refreshSubscription;
    private resetSubscription;
    private paginationSubscription;
    private sortFilterSubscription;
    private allMatchingSelectedSubscription;
    private _columns;
    private scrollListenerHandler;
    private initialized;
    get empty(): boolean;
    get loadingClass(): boolean;
    get useOverrideTotal(): boolean;
    listInteractions: ListInteractionDictionary;
    constructor(labels: NovoLabelService, ref: ChangeDetectorRef, state: DataTableState<T>);
    modifyCellHeaderMultiSelectFilterOptions(column: string, newOptions: {
        value: any;
        label: string;
    }[]): void;
    ngOnDestroy(): void;
    ngAfterContentInit(): void;
    onSearchChange(term: string): void;
    trackColumnsBy(index: number, item: IDataTableColumn<T>): string;
    isDisabled(check: any, row: T): boolean;
    isExpanded(row: T): boolean;
    expandRow(row: T): void;
    expandRows(expand: boolean): void;
    allCurrentRowsExpanded(): boolean;
    isSelected(row: T): boolean;
    selectRow(row: T, origin?: string): void;
    selectRows(selected: boolean): void;
    allCurrentRowsSelected(): boolean;
    private configureLastDisplayedColumn;
    private configureColumns;
    private scrollListener;
    performInteractions(event: ListInteractionEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDataTable<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDataTable<any>, "novo-data-table", never, { "displayedColumns": "displayedColumns"; "paginationOptions": "paginationOptions"; "searchOptions": "searchOptions"; "selectionOptions": "selectionOptions"; "defaultSort": "defaultSort"; "name": "name"; "allowMultipleFilters": "allowMultipleFilters"; "rowIdentifier": "rowIdentifier"; "activeRowIdentifier": "activeRowIdentifier"; "trackByFn": "trackByFn"; "templates": "templates"; "fixedHeader": "fixedHeader"; "paginatorDataFeatureId": "paginatorDataFeatureId"; "maxSelected": "maxSelected"; "canSelectAll": "canSelectAll"; "allMatchingSelected": "allMatchingSelected"; "overrideTotal": "overrideTotal"; "paginationRefreshSubject": "paginationRefreshSubject"; "dataTableService": "dataTableService"; "rows": "rows"; "outsideFilter": "outsideFilter"; "refreshSubject": "refreshSubject"; "columns": "columns"; "customFilter": "customFilter"; "hasExandedRows": "hasExandedRows"; "forceShowHeader": "forceShowHeader"; "hideGlobalSearch": "hideGlobalSearch"; "listInteractions": "listInteractions"; }, { "resized": "resized"; "preferencesChanged": "preferencesChanged"; "allSelected": "allSelected"; }, ["customTemplates"], ["*"]>;
}

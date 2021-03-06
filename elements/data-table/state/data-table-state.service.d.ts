import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { IDataTableChangeEvent, IDataTableFilter, IDataTableSort } from '../interfaces';
import * as ɵngcc0 from '@angular/core';
export declare class DataTableState<T> {
    selectionSource: Subject<unknown>;
    paginationSource: Subject<unknown>;
    sortFilterSource: Subject<unknown>;
    resetSource: Subject<unknown>;
    expandSource: Subject<unknown>;
    dataLoaded: Subject<unknown>;
    sort: IDataTableSort;
    filter: IDataTableFilter | IDataTableFilter[];
    page: number;
    pageSize: number;
    globalSearch: string;
    selectedRows: Map<string, T>;
    expandedRows: Set<string>;
    outsideFilter: any;
    isForceRefresh: boolean;
    updates: EventEmitter<IDataTableChangeEvent>;
    get userFiltered(): boolean;
    get userFilteredInternal(): boolean;
    get selected(): T[];
    reset(fireUpdate?: boolean, persistUserFilters?: boolean): void;
    clearSort(fireUpdate?: boolean): void;
    clearFilter(fireUpdate?: boolean): void;
    onSelectionChange(): void;
    onExpandChange(targetId?: number): void;
    onPaginationChange(isPageSizeChange: boolean, pageSize: number): void;
    onSortFilterChange(): void;
    setInitialSortFilter(preferences: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<DataTableState<any>, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<DataTableState<any>>;
}

//# sourceMappingURL=data-table-state.service.d.ts.map
import { ChangeDetectorRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { IDataTablePaginationEvent } from '../interfaces';
import { NovoLabelService } from '../../../services/novo-label-service';
import { DataTableState } from '../state/data-table-state.service';
import * as ɵngcc0 from '@angular/core';
export declare class NovoDataTablePagination<T> implements OnInit, OnDestroy {
    private changeDetectorRef;
    labels: NovoLabelService;
    private state;
    theme: string;
    get page(): number;
    set page(page: number);
    _page: number;
    get pageSize(): number;
    set pageSize(pageSize: number);
    private _pageSize;
    dataFeatureId: string;
    get pageSizeOptions(): any[];
    set pageSizeOptions(pageSizeOptions: any[]);
    private _pageSizeOptions;
    get length(): number;
    set length(length: number);
    _length: number;
    pageChange: EventEmitter<IDataTablePaginationEvent>;
    displayedPageSizeOptions: {
        value: string;
        label: string;
    }[];
    longRangeLabel: string;
    shortRangeLabel: string;
    pages: {
        number: number;
        text: string;
        active: boolean;
    }[];
    private resetSubscription;
    totalPages: number;
    private _initialized;
    constructor(changeDetectorRef: ChangeDetectorRef, labels: NovoLabelService, state: DataTableState<T>);
    ngOnInit(): void;
    ngOnDestroy(): void;
    selectPage(page: any): void;
    nextPage(): void;
    previousPage(): void;
    hasPreviousPage(): boolean;
    hasNextPage(): boolean;
    changePageSize(pageSize: number): void;
    private updateDisplayedPageSizeOptions;
    private emitPageEvent;
    private calculateTotalPages;
    private makePage;
    private getPages;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoDataTablePagination<any>, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoDataTablePagination<any>, "novo-data-table-pagination", never, { "theme": "theme"; "page": "page"; "pageSize": "pageSize"; "pageSizeOptions": "pageSizeOptions"; "length": "length"; "dataFeatureId": "dataFeatureId"; }, { "pageChange": "pageChange"; }, never, never>;
}

//# sourceMappingURL=data-table-pagination.component.d.ts.map
import { ChangeDetectorRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import { NovoPaginationEvent } from './interfaces';
import { NovoActivityTableState } from './state';
import * as i0 from "@angular/core";
export declare class NovoTablePagination implements OnInit, OnDestroy {
    private changeDetectorRef;
    labels: NovoLabelService;
    private state;
    private _initialized;
    get page(): number;
    set page(page: number);
    _page: number;
    get length(): number;
    set length(length: number);
    _length: number;
    get pageSize(): number;
    set pageSize(pageSize: number);
    private _pageSize;
    get pageSizeOptions(): number[];
    set pageSizeOptions(pageSizeOptions: number[]);
    private _pageSizeOptions;
    pageChange: EventEmitter<NovoPaginationEvent>;
    displayedPageSizeOptions: number[];
    longRangeLabel: string;
    shortRangeLabel: string;
    private resetSubscription;
    constructor(changeDetectorRef: ChangeDetectorRef, labels: NovoLabelService, state: NovoActivityTableState);
    ngOnInit(): void;
    ngOnDestroy(): void;
    nextPage(): void;
    previousPage(): void;
    hasPreviousPage(): boolean;
    hasNextPage(): boolean;
    changePageSize(pageSize: number): void;
    private updateDisplayedPageSizeOptions;
    private emitPageEvent;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoTablePagination, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoTablePagination, "novo-table-pagination", never, { "page": "page"; "length": "length"; "pageSize": "pageSize"; "pageSizeOptions": "pageSizeOptions"; }, { "pageChange": "pageChange"; }, never, never>;
}

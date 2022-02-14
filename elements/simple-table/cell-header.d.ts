import { CdkColumnDef } from '@angular/cdk/table';
import { AfterViewInit, ChangeDetectorRef, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NovoLabelService } from '../../services/novo-label-service';
import { NovoDropdownElement } from '../dropdown/Dropdown';
import { NovoSimpleSortFilter, SimpleTableColumnFilterConfig } from './interfaces';
import { NovoSortFilter } from './sort';
import { NovoActivityTableState } from './state';
import * as i0 from "@angular/core";
export declare class NovoSimpleFilterFocus implements AfterViewInit {
    private element;
    constructor(element: ElementRef);
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDef<NovoSimpleFilterFocus, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<NovoSimpleFilterFocus, "[novoSimpleFilterFocus]", never, {}, {}, never>;
}
export declare class NovoSimpleCellHeader implements NovoSimpleSortFilter, OnInit, OnDestroy {
    private changeDetectorRef;
    labels: NovoLabelService;
    private state;
    _sort: NovoSortFilter;
    _cdkColumnDef: CdkColumnDef;
    dropdown: NovoDropdownElement;
    defaultSort: {
        id: string;
        value: string;
    };
    get config(): {
        sortable: boolean;
        filterable: boolean;
        transforms?: {
            filter?: Function;
            sort?: Function;
        };
        filterConfig: SimpleTableColumnFilterConfig;
    };
    set config(v: {
        sortable: boolean;
        filterable: boolean;
        transforms?: {
            filter?: Function;
            sort?: Function;
        };
        filterConfig: SimpleTableColumnFilterConfig;
    });
    private _config;
    private _rerenderSubscription;
    private changeTimeout;
    icon: string;
    id: string;
    filter: string | boolean;
    direction: string;
    filterActive: boolean;
    sortActive: boolean;
    showCustomRange: boolean;
    activeDateFilter: string;
    constructor(changeDetectorRef: ChangeDetectorRef, labels: NovoLabelService, state: NovoActivityTableState, _sort: NovoSortFilter, _cdkColumnDef: CdkColumnDef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    sort(): void;
    toggleCustomRange(event: Event, value: boolean): void;
    filterData(filter?: any): void;
    clearFilter(): void;
    private getNextSortDirection;
    private getDefaultDateFilterOptions;
    static ɵfac: i0.ɵɵFactoryDef<NovoSimpleCellHeader, [null, null, null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoSimpleCellHeader, "[novo-simple-cell-config]", never, { "defaultSort": "defaultSort"; "config": "novo-simple-cell-config"; }, {}, never, ["*"]>;
}

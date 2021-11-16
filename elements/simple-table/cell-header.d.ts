import { AfterViewInit, ChangeDetectorRef, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { CdkColumnDef } from '@angular/cdk/table';
import { NovoDropdownElement } from '../dropdown/Dropdown';
import { NovoSimpleSortFilter, SimpleTableColumnFilterConfig } from './interfaces';
import { NovoSortFilter } from './sort';
import { NovoLabelService } from '../../services/novo-label-service';
import { NovoActivityTableState } from './state';
import * as ɵngcc0 from '@angular/core';
export declare class NovoSimpleFilterFocus implements AfterViewInit {
    private element;
    constructor(element: ElementRef);
    ngAfterViewInit(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoSimpleFilterFocus, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<NovoSimpleFilterFocus, "[novoSimpleFilterFocus]", never, {}, {}, never>;
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoSimpleCellHeader, [null, null, null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoSimpleCellHeader, "[novo-simple-cell-config]", never, { "config": "novo-simple-cell-config"; "defaultSort": "defaultSort"; }, {}, never, ["*"]>;
}

//# sourceMappingURL=cell-header.d.ts.map
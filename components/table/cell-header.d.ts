import { CdkColumnDef } from '@angular/cdk/table';
import { AfterViewInit, ChangeDetectorRef, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NovoDropdownElement } from 'novo-elements/components/dropdown';
import { NovoLabelService } from 'novo-elements/services';
import { TableColumnFilterConfig } from './interfaces';
import { NovoSortFilter } from './sort';
import { NovoActivityTableState } from './state';
import * as i0 from "@angular/core";
export declare class NovoFilterFocus implements AfterViewInit {
    private element;
    constructor(element: ElementRef);
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoFilterFocus, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoFilterFocus, "[novoFilterFocus]", never, {}, {}, never>;
}
export declare class NovoAdvancedHeaderCell implements OnInit, OnDestroy {
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
        filterConfig: TableColumnFilterConfig;
    };
    set config(v: {
        sortable: boolean;
        filterable: boolean;
        transforms?: {
            filter?: Function;
            sort?: Function;
        };
        filterConfig: TableColumnFilterConfig;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoAdvancedHeaderCell, [null, null, null, { optional: true; host: true; }, { optional: true; host: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoAdvancedHeaderCell, "novo-advanced-header-cell", never, { "defaultSort": "defaultSort"; "config": "novo-cell-config"; }, {}, never, ["*"]>;
}

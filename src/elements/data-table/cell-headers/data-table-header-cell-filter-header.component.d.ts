import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { NovoLabelService } from '../../../services/novo-label-service';
import * as i0 from "@angular/core";
export declare class NovoDataTableCellFilterHeader {
    changeDetectorRef: ChangeDetectorRef;
    labels: NovoLabelService;
    label: string | number;
    set filter(filter: any);
    get filter(): any;
    private _filter;
    hasFilter: boolean;
    clearFilter: EventEmitter<void>;
    constructor(changeDetectorRef: ChangeDetectorRef, labels: NovoLabelService);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDataTableCellFilterHeader, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDataTableCellFilterHeader, "novo-data-table-cell-filter-header", never, { "label": "label"; "filter": "filter"; }, { "clearFilter": "clearFilter"; }, never, never>;
}

import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { NovoLabelService } from '../../services/novo-label-service';
import { DataTableState } from './state/data-table-state.service';
import * as i0 from "@angular/core";
export declare class NovoDataTableClearButton<T> {
    state: DataTableState<T>;
    private ref;
    labels: NovoLabelService;
    sortClear: EventEmitter<boolean>;
    filterClear: EventEmitter<boolean>;
    allClear: EventEmitter<boolean>;
    constructor(state: DataTableState<T>, ref: ChangeDetectorRef, labels: NovoLabelService);
    clearSort(): void;
    clearFilter(): void;
    clearAll(): void;
    static ɵfac: i0.ɵɵFactoryDef<NovoDataTableClearButton<any>, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoDataTableClearButton<any>, "novo-data-table-clear-button", never, {}, { "sortClear": "sortClear"; "filterClear": "filterClear"; "allClear": "allClear"; }, never, never>;
}

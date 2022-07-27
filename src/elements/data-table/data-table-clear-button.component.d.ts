import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { NovoLabelService } from '../../services/novo-label-service';
import { DataTableState } from './state/data-table-state.service';
import * as i0 from "@angular/core";
export declare class NovoDataTableClearButton<T> {
    state: DataTableState<T>;
    private ref;
    labels: NovoLabelService;
    selectedClear: EventEmitter<boolean>;
    sortClear: EventEmitter<boolean>;
    filterClear: EventEmitter<boolean>;
    allClear: EventEmitter<boolean>;
    constructor(state: DataTableState<T>, ref: ChangeDetectorRef, labels: NovoLabelService);
    clearSort(): void;
    clearFilter(): void;
    clearSelected(): void;
    clearAll(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDataTableClearButton<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDataTableClearButton<any>, "novo-data-table-clear-button", never, {}, { "selectedClear": "selectedClear"; "sortClear": "sortClear"; "filterClear": "filterClear"; "allClear": "allClear"; }, never, never>;
}

import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import { DataTableState } from './state/data-table-state.service';
import { NovoLabelService } from '../../services/novo-label-service';
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
}

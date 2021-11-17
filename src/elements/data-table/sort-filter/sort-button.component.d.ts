import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { NovoLabelService } from '../../../services/novo-label-service';
import { DataTableState } from '../state/data-table-state.service';
import { SortDirection } from './sort-direction';
export declare class NovoDataTableSortButton<T> {
    state: DataTableState<T>;
    private ref;
    labels: NovoLabelService;
    sortChange: EventEmitter<SortDirection>;
    SortDirection: typeof SortDirection;
    get value(): SortDirection;
    set value(value: SortDirection);
    private _value;
    constructor(state: DataTableState<T>, ref: ChangeDetectorRef, labels: NovoLabelService);
    changeSort(dir: SortDirection): void;
    clearSort(): void;
}

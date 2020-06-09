import { ChangeDetectorRef } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { DataTableState } from './state/data-table-state.service';
import { IDataTableService } from './interfaces';
export declare class DataTableSource<T> extends DataSource<T> {
    private tableService;
    private state;
    private ref;
    total: number;
    currentTotal: number;
    current: number;
    loading: boolean;
    pristine: boolean;
    data: T[];
    private totalSet;
    get totallyEmpty(): boolean;
    get currentlyEmpty(): boolean;
    constructor(tableService: IDataTableService<T>, state: DataTableState<T>, ref: ChangeDetectorRef);
    connect(): Observable<any>;
    disconnect(): void;
}

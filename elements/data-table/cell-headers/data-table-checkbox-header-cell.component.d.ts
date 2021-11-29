import { CdkColumnDef, CdkHeaderCell } from '@angular/cdk/table';
import { ChangeDetectorRef, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { NovoToastService } from '../../toast/ToastService';
import { NovoDataTable } from '../data-table.component';
export declare class NovoDataTableCheckboxHeaderCell<T> extends CdkHeaderCell implements OnDestroy {
    private dataTable;
    private ref;
    private toaster;
    role: string;
    maxSelected: number;
    checked: boolean;
    private selectionSubscription;
    private paginationSubscription;
    private resetSubscription;
    get isAtLimit(): boolean;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2, dataTable: NovoDataTable<T>, ref: ChangeDetectorRef, toaster: NovoToastService);
    ngOnDestroy(): void;
    onClick(): void;
}

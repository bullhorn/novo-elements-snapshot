import { ElementRef, Renderer2, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CdkCell, CdkColumnDef } from '@angular/cdk/table';
import { NovoDataTable } from '../data-table.component';
export declare class NovoDataTableCheckboxCell<T> extends CdkCell implements OnInit, OnDestroy {
    columnDef: CdkColumnDef;
    dataTable: NovoDataTable<T>;
    private ref;
    role: string;
    row: T;
    checked: boolean;
    private selectionSubscription;
    private resetSubscription;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2, dataTable: NovoDataTable<T>, ref: ChangeDetectorRef);
    ngOnInit(): void;
    onClick(): void;
    ngOnDestroy(): void;
}

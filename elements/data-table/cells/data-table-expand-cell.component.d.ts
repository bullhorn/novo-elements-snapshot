import { CdkCell, CdkColumnDef } from '@angular/cdk/table';
import { ChangeDetectorRef, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NovoDataTableRef } from '../data-table.token';
import * as i0 from "@angular/core";
export declare class NovoDataTableExpandCell<T> extends CdkCell implements OnInit, OnDestroy {
    columnDef: CdkColumnDef;
    private dataTable;
    private ref;
    role: string;
    row: T;
    expanded: boolean;
    private expandSubscription;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2, dataTable: NovoDataTableRef, ref: ChangeDetectorRef);
    ngOnInit(): void;
    onClick(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDataTableExpandCell<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDataTableExpandCell<any>, "novo-data-table-expand-cell", never, { "row": { "alias": "row"; "required": false; }; }, {}, never, never, false, never>;
}

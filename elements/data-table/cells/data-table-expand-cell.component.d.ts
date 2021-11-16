import { CdkCell, CdkColumnDef } from '@angular/cdk/table';
import { ChangeDetectorRef, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NovoDataTable } from '../data-table.component';
import * as ɵngcc0 from '@angular/core';
export declare class NovoDataTableExpandCell<T> extends CdkCell implements OnInit, OnDestroy {
    columnDef: CdkColumnDef;
    dataTable: NovoDataTable<T>;
    private ref;
    role: string;
    row: T;
    expanded: boolean;
    private expandSubscription;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2, dataTable: NovoDataTable<T>, ref: ChangeDetectorRef);
    ngOnInit(): void;
    onClick(): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoDataTableExpandCell<any>, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoDataTableExpandCell<any>, "novo-data-table-expand-cell", never, { "row": "row"; }, {}, never, never>;
}

//# sourceMappingURL=data-table-expand-cell.component.d.ts.map
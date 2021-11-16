import { CdkColumnDef, CdkHeaderCell } from '@angular/cdk/table';
import { ChangeDetectorRef, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { NovoDataTable } from '../data-table.component';
import * as ɵngcc0 from '@angular/core';
export declare class NovoDataTableExpandHeaderCell<T> extends CdkHeaderCell implements OnDestroy {
    private dataTable;
    private ref;
    role: string;
    expanded: boolean;
    private expandSubscription;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2, dataTable: NovoDataTable<T>, ref: ChangeDetectorRef);
    ngOnDestroy(): void;
    expandAll(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoDataTableExpandHeaderCell<any>, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoDataTableExpandHeaderCell<any>, "novo-data-table-expand-header-cell", never, {}, {}, never, never>;
}

//# sourceMappingURL=data-table-expand-header-cell.component.d.ts.map
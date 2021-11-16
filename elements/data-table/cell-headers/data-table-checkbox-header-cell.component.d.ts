import { CdkColumnDef, CdkHeaderCell } from '@angular/cdk/table';
import { ChangeDetectorRef, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { NovoDataTable } from '../data-table.component';
import * as ɵngcc0 from '@angular/core';
export declare class NovoDataTableCheckboxHeaderCell<T> extends CdkHeaderCell implements OnDestroy {
    private dataTable;
    private ref;
    role: string;
    checked: boolean;
    private selectionSubscription;
    private paginationSubscription;
    private resetSubscription;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2, dataTable: NovoDataTable<T>, ref: ChangeDetectorRef);
    ngOnDestroy(): void;
    onClick(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoDataTableCheckboxHeaderCell<any>, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoDataTableCheckboxHeaderCell<any>, "novo-data-table-checkbox-header-cell", never, {}, {}, never, never>;
}

//# sourceMappingURL=data-table-checkbox-header-cell.component.d.ts.map
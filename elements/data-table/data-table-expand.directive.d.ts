import { TemplateRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { DataTableState } from './state/data-table-state.service';
import { NovoDataTable } from './data-table.component';
import * as ɵngcc0 from '@angular/core';
export declare class NovoDataTableExpandDirective<T> implements OnDestroy {
    vcRef: ViewContainerRef;
    private state;
    private dataTable;
    row: T;
    template: TemplateRef<any>;
    private subscription;
    constructor(vcRef: ViewContainerRef, state: DataTableState<T>, dataTable: NovoDataTable<T>);
    shouldExpandAllRows: (targetId: number) => boolean;
    shouldExpandOneRow: (targetId: number) => boolean;
    ngOnDestroy(): void;
    onClick(event: MouseEvent): void;
    private clear;
    private render;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoDataTableExpandDirective<any>, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<NovoDataTableExpandDirective<any>, "[novoDataTableExpand]", never, { "row": "row"; "template": "novoDataTableExpand"; }, {}, never>;
}

//# sourceMappingURL=data-table-expand.directive.d.ts.map
import { OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { NovoDataTable } from './data-table.component';
import { DataTableState } from './state/data-table-state.service';
import * as i0 from "@angular/core";
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
    static ɵfac: i0.ɵɵFactoryDef<NovoDataTableExpandDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<NovoDataTableExpandDirective<any>, "[novoDataTableExpand]", never, { "row": "row"; "template": "novoDataTableExpand"; }, {}, never>;
}

import { CdkCell, CdkCellDef, CdkColumnDef, CdkHeaderCell, CdkHeaderCellDef } from '@angular/cdk/table';
import { ChangeDetectorRef, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NovoLabelService } from '../../services/novo-label-service';
import { SimpleTableActionColumn, SimpleTableActionColumnOption, SimpleTableColumn } from './interfaces';
import { NovoSelection } from './sort';
/** Workaround for https://github.com/angular/angular/issues/17849 */
import * as ɵngcc0 from '@angular/core';
export declare const _NovoCellDef: typeof CdkCellDef;
export declare const _NovoHeaderCellDef: typeof CdkHeaderCellDef;
export declare const _NovoColumnDef: typeof CdkColumnDef;
export declare const _NovoHeaderCell: typeof CdkHeaderCell;
export declare const _NovoCell: typeof CdkCell;
export declare class NovoSimpleCellDef extends _NovoCellDef {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoSimpleCellDef, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<NovoSimpleCellDef, "[novoSimpleCellDef]", never, {}, {}, never>;
}
export declare class NovoSimpleHeaderCellDef extends _NovoHeaderCellDef {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoSimpleHeaderCellDef, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<NovoSimpleHeaderCellDef, "[novoSimpleHeaderCellDef]", never, {}, {}, never>;
}
export declare class NovoSimpleColumnDef extends _NovoColumnDef {
    name: string;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoSimpleColumnDef, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<NovoSimpleColumnDef, "[novoSimpleColumnDef]", never, { "name": "novoSimpleColumnDef"; }, {}, never>;
}
export declare class NovoSimpleHeaderCell<T> extends _NovoHeaderCell implements OnInit {
    private elementRef;
    private renderer;
    role: string;
    column: SimpleTableColumn<T>;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoSimpleHeaderCell<any>, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<NovoSimpleHeaderCell<any>, "novo-simple-header-cell", never, { "column": "column"; }, {}, never>;
}
export declare class NovoSimpleEmptyHeaderCell extends _NovoHeaderCell {
    role: string;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2);
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoSimpleEmptyHeaderCell, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<NovoSimpleEmptyHeaderCell, "novo-simple-empty-header-cell", never, {}, {}, never>;
}
export declare class NovoSimpleCheckboxHeaderCell extends _NovoHeaderCell implements OnDestroy {
    private _selection;
    role: string;
    selectAll: boolean;
    private selectAllSubscription;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2, ref: ChangeDetectorRef, _selection: NovoSelection);
    ngOnDestroy(): void;
    toggle(value: boolean): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoSimpleCheckboxHeaderCell, [null, null, null, null, { optional: true; }]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoSimpleCheckboxHeaderCell, "novo-simple-checkbox-header-cell", never, {}, {}, never, never>;
}
export declare class NovoSimpleCell<T> extends _NovoCell implements OnInit {
    private elementRef;
    private renderer;
    role: string;
    row: any;
    column: SimpleTableColumn<T>;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    onClick(event: MouseEvent): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoSimpleCell<any>, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoSimpleCell<any>, "novo-simple-cell", never, { "row": "row"; "column": "column"; }, {}, never, never>;
}
export declare class NovoSimpleCheckboxCell extends _NovoCell implements OnDestroy, OnInit {
    columnDef: CdkColumnDef;
    _selection: NovoSelection;
    role: string;
    row: any;
    index: any;
    selected: boolean;
    private selectAllSubscription;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2, _selection: NovoSelection);
    ngOnInit(): void;
    ngOnDestroy(): void;
    toggle(value: boolean): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoSimpleCheckboxCell, [null, null, null, { optional: true; }]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoSimpleCheckboxCell, "novo-simple-checkbox-cell", never, { "row": "row"; "index": "index"; }, {}, never, never>;
}
export declare class NovoSimpleActionCell<T> extends _NovoCell implements OnInit {
    private elementRef;
    private renderer;
    labels: NovoLabelService;
    role: string;
    row: T;
    column: SimpleTableActionColumn<T>;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2, labels: NovoLabelService);
    ngOnInit(): void;
    isDisabled(check: SimpleTableActionColumn<T> | SimpleTableActionColumnOption<T>, row: T): boolean;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoSimpleActionCell<any>, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoSimpleActionCell<any>, "novo-simple-action-cell", never, { "row": "row"; "column": "column"; }, {}, never, never>;
}

//# sourceMappingURL=cell.d.ts.map
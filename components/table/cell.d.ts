import { CdkCell, CdkCellDef, CdkColumnDef, CdkHeaderCell, CdkHeaderCellDef } from '@angular/cdk/table';
import { ChangeDetectorRef, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import { TableActionColumn, TableActionColumnOption, TableColumn } from './interfaces';
import { NovoSelection } from './sort';
import * as i0 from "@angular/core";
/** Workaround for https://github.com/angular/angular/issues/17849 */
export declare const _NovoCellDef: typeof CdkCellDef;
export declare const _NovoHeaderCellDef: typeof CdkHeaderCellDef;
export declare const _NovoColumnDef: typeof CdkColumnDef;
export declare const _NovoHeaderCell: typeof CdkHeaderCell;
export declare const _NovoCell: typeof CdkCell;
export declare class NovoCellDef extends _NovoCellDef {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoCellDef, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoCellDef, "[novoCellDef]", never, {}, {}, never>;
}
export declare class NovoHeaderCellDef extends _NovoHeaderCellDef {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoHeaderCellDef, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoHeaderCellDef, "[novoHeaderCellDef]", never, {}, {}, never>;
}
export declare class NovoColumnDef extends _NovoColumnDef {
    get name(): string;
    set name(name: string);
    /**
     * This has been extracted to a util because of TS 4 and VE.
     * View Engine doesn't support property rename inheritance.
     * TS 4.0 doesn't allow properties to override accessors or vice-versa.
     * @docs-private
     */
    protected _setNameInput(value: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoColumnDef, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoColumnDef, "[novoColumnDef]", never, { "name": "novoColumnDef"; }, {}, never>;
}
export declare class NovoHeaderCell<T> extends _NovoHeaderCell implements OnInit {
    private elementRef;
    private renderer;
    role: string;
    column: TableColumn<T>;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoHeaderCell<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoHeaderCell<any>, "novo-header-cell", never, { "column": "column"; }, {}, never>;
}
export declare class NovoEmptyHeaderCell extends _NovoHeaderCell {
    role: string;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoEmptyHeaderCell, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoEmptyHeaderCell, "novo-empty-header-cell", never, {}, {}, never>;
}
export declare class NovoCheckboxHeaderCell extends _NovoHeaderCell implements OnDestroy {
    private _selection;
    role: string;
    selectAll: boolean;
    private selectAllSubscription;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2, ref: ChangeDetectorRef, _selection: NovoSelection);
    ngOnDestroy(): void;
    toggle(value: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoCheckboxHeaderCell, [null, null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoCheckboxHeaderCell, "novo-checkbox-header-cell", never, {}, {}, never, never>;
}
export declare class NovoCell<T> extends _NovoCell implements OnInit {
    private elementRef;
    private renderer;
    role: string;
    row: any;
    column: TableColumn<T>;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    onClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoCell<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoCell<any>, "novo-cell", never, { "row": "row"; "column": "column"; }, {}, never, never>;
}
export declare class NovoCheckboxCell extends _NovoCell implements OnDestroy, OnInit {
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
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoCheckboxCell, [null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoCheckboxCell, "novo-checkbox-cell", never, { "row": "row"; "index": "index"; }, {}, never, never>;
}
export declare class NovoActionCell<T> extends _NovoCell implements OnInit {
    private elementRef;
    private renderer;
    labels: NovoLabelService;
    role: string;
    row: T;
    column: TableActionColumn<T>;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2, labels: NovoLabelService);
    ngOnInit(): void;
    isDisabled(check: TableActionColumn<T> | TableActionColumnOption<T>, row: T): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoActionCell<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoActionCell<any>, "novo-action-cell", never, { "row": "row"; "column": "column"; }, {}, never, never>;
}

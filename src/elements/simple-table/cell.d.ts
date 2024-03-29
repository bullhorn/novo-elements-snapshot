import { CdkCell, CdkCellDef, CdkColumnDef, CdkHeaderCell, CdkHeaderCellDef } from '@angular/cdk/table';
import { ChangeDetectorRef, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NovoLabelService } from '../../services/novo-label-service';
import { SimpleTableActionColumn, SimpleTableActionColumnOption, SimpleTableColumn } from './interfaces';
import { NovoSelection } from './sort';
/** Workaround for https://github.com/angular/angular/issues/17849 */
export declare const _NovoCellDef: typeof CdkCellDef;
export declare const _NovoHeaderCellDef: typeof CdkHeaderCellDef;
export declare const _NovoColumnDef: typeof CdkColumnDef;
export declare const _NovoHeaderCell: typeof CdkHeaderCell;
export declare const _NovoCell: typeof CdkCell;
export declare class NovoSimpleCellDef extends _NovoCellDef {
}
export declare class NovoSimpleHeaderCellDef extends _NovoHeaderCellDef {
}
export declare class NovoSimpleColumnDef extends _NovoColumnDef {
    get name(): string;
    set name(name: string);
    /**
     * This has been extracted to a util because of TS 4 and VE.
     * View Engine doesn't support property rename inheritance.
     * TS 4.0 doesn't allow properties to override accessors or vice-versa.
     * @docs-private
     */
    protected _setNameInput(value: string): void;
}
export declare class NovoSimpleHeaderCell<T> extends _NovoHeaderCell implements OnInit {
    private elementRef;
    private renderer;
    role: string;
    column: SimpleTableColumn<T>;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
}
export declare class NovoSimpleEmptyHeaderCell extends _NovoHeaderCell {
    role: string;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2);
}
export declare class NovoSimpleCheckboxHeaderCell extends _NovoHeaderCell implements OnDestroy {
    private _selection;
    role: string;
    selectAll: boolean;
    private selectAllSubscription;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2, ref: ChangeDetectorRef, _selection: NovoSelection);
    ngOnDestroy(): void;
    toggle(value: boolean): void;
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
}

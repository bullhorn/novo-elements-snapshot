import { CdkColumnDef, CdkHeaderCell } from '@angular/cdk/table';
import { ElementRef, OnInit, Renderer2 } from '@angular/core';
import { IDataTableColumn } from '../interfaces';
export declare class NovoDataTableHeaderCell<T> extends CdkHeaderCell implements OnInit {
    private elementRef;
    private renderer;
    role: string;
    column: IDataTableColumn<T>;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
}

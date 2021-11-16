import { ElementRef, Renderer2, OnInit, TemplateRef, EventEmitter, OnDestroy } from '@angular/core';
import { CdkCell, CdkColumnDef } from '@angular/cdk/table';
import { IDataTableColumn } from '../interfaces';
export declare class NovoDataTableCell<T> extends CdkCell implements OnInit, OnDestroy {
    private elementRef;
    private renderer;
    role: string;
    row: T;
    template: TemplateRef<any>;
    column: IDataTableColumn<T>;
    resized: EventEmitter<IDataTableColumn<T>>;
    private subscriptions;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private calculateWidths;
}

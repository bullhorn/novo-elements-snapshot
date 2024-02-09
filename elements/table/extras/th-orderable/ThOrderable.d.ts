import { ElementRef, EventEmitter, OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class ThOrderable implements OnInit {
    private element;
    column: any;
    onOrderChange: EventEmitter<any>;
    table: any;
    clone: any;
    target: any;
    constructor(element: ElementRef);
    get index(): number;
    ngOnInit(): void;
    onDragStart(event?: any): void;
    deleteColumns(table: {
        rows: Array<any>;
        deleteRow: Function;
    }): void;
    findTable(start: any): any;
    onDrag(event?: any): boolean;
    onDragEnd(event?: any): boolean;
    onDrop(event?: any): boolean;
    onDragOver(event: DragEvent): boolean;
    onDragEnter(event: Event): void;
    onDragLeave(event?: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ThOrderable, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ThOrderable, "[novoThOrderable]", never, { "column": "novoThOrderable"; }, { "onOrderChange": "onOrderChange"; }, never>;
}

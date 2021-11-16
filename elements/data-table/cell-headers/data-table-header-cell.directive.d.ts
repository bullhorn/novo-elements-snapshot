import { OnInit, ElementRef, Renderer2 } from '@angular/core';
import { CdkHeaderCell, CdkColumnDef } from '@angular/cdk/table';
import { IDataTableColumn } from '../interfaces';
import * as ɵngcc0 from '@angular/core';
export declare class NovoDataTableHeaderCell<T> extends CdkHeaderCell implements OnInit {
    private elementRef;
    private renderer;
    role: string;
    column: IDataTableColumn<T>;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoDataTableHeaderCell<any>, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<NovoDataTableHeaderCell<any>, "novo-data-table-header-cell", never, { "column": "column"; }, {}, never>;
}

//# sourceMappingURL=data-table-header-cell.directive.d.ts.map
import { ElementRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ComponentUtils } from './../../../../utils/component-utils/ComponentUtils';
import * as ɵngcc0 from '@angular/core';
export declare class TableCell implements OnInit, OnDestroy {
    private element;
    private componentUtils;
    container: ViewContainerRef;
    column: any;
    row: any;
    form: FormGroup;
    hasEditor: boolean;
    value: any;
    private valueChangeSubscription;
    constructor(element: ElementRef, componentUtils: ComponentUtils);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onClick(event: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<TableCell, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<TableCell, "novo-table-cell", never, { "column": "column"; "row": "row"; "form": "form"; "hasEditor": "hasEditor"; }, {}, never, never>;
}

//# sourceMappingURL=TableCell.d.ts.map
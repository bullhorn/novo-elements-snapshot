import { ElementRef, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ComponentUtils } from 'novo-elements/services';
import * as i0 from "@angular/core";
export declare class TableCell implements OnInit, OnDestroy {
    private element;
    private componentUtils;
    container: ViewContainerRef;
    column: any;
    row: any;
    form: UntypedFormGroup;
    hasEditor: boolean;
    value: any;
    private valueChangeSubscription;
    constructor(element: ElementRef, componentUtils: ComponentUtils);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onClick(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TableCell, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TableCell, "novo-table-cell", never, { "column": "column"; "row": "row"; "form": "form"; "hasEditor": "hasEditor"; }, {}, never, never, false, never>;
}

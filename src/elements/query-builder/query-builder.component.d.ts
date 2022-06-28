import { ChangeDetectorRef, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormBuilder } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class QueryBuilderComponent implements OnInit {
    private controlContainer;
    private formBuilder;
    private cdr;
    queryForm: AbstractControl;
    config: any;
    constructor(controlContainer: ControlContainer, formBuilder: FormBuilder, cdr: ChangeDetectorRef);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<QueryBuilderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QueryBuilderComponent, "novo-query-builder", never, {}, {}, never, never>;
}

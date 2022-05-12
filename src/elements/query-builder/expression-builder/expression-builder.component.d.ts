import { OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class ExpressionBuilderComponent implements OnInit {
    private controlContainer;
    private formBuilder;
    parentForm: AbstractControl;
    config: any;
    controlName: string;
    constructor(controlContainer: ControlContainer, formBuilder: FormBuilder);
    ngOnInit(): void;
    handleAddOrFilter(evt: any): void;
    handleAddAndFilter(evt: any): void;
    andGroups(): FormArray;
    newAndGroup(): FormGroup;
    addAndGroup(): void;
    removeAndGroup(index: number): void;
    orGroups(index: number): FormArray;
    newOrGroup(): FormGroup;
    addOrGroup(index: number): void;
    removeOrGroup(index: number, orIndex: number): void;
    canAddGroup(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ExpressionBuilderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ExpressionBuilderComponent, "novo-expression-builder", never, { "config": "config"; "controlName": "controlName"; }, {}, never, ["*"]>;
}

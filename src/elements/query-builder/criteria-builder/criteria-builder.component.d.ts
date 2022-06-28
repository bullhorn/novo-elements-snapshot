import { AfterContentChecked, OnDestroy, OnInit, QueryList, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, ControlContainer, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BaseConditionFieldDef, NovoConditionFieldDef } from '../query-builder.directives';
import { BaseFieldDef } from '../query-builder.types';
import * as i0 from "@angular/core";
export declare class CriteriaBuilderComponent implements OnInit, OnDestroy, AfterContentChecked {
    private controlContainer;
    private formBuilder;
    private cdr;
    parentForm: AbstractControl;
    config: any;
    controlName: string;
    orEnabled: boolean;
    addCriteriaLabel: string;
    editTypeFn: (field: BaseFieldDef) => string;
    _contentFieldDefs: QueryList<NovoConditionFieldDef>;
    private _customFieldDefs;
    private _fieldDefsByName;
    /** Subject that emits when the component has been destroyed. */
    private readonly _onDestroy;
    constructor(controlContainer: ControlContainer, formBuilder: FormBuilder, cdr: ChangeDetectorRef);
    ngOnInit(): void;
    ngAfterContentChecked(): void;
    ngOnDestroy(): void;
    handleAddOrFilter(evt: any): void;
    handleAddAndFilter(evt: any): void;
    andGroups(): FormArray;
    newAndGroup(data?: any): FormGroup;
    addAndGroup(data?: any): void;
    removeAndGroup(index: number): void;
    orGroups(index: number): FormArray;
    newOrGroup(data?: any): FormGroup;
    addOrGroup(index: number): void;
    removeOrGroup(index: number, orIndex: number): void;
    resetQueryForm(): void;
    canAddGroup(): boolean;
    /** Adds a field definition that was not included as part of the content children. */
    addFieldDef(fieldDef: BaseConditionFieldDef): void;
    /** Removes a field definition that was not included as part of the content children. */
    removeFieldDef(fieldDef: BaseConditionFieldDef): void;
    getFieldDefsByName(): Map<string, BaseConditionFieldDef>;
    private _cacheFieldDefs;
    static ɵfac: i0.ɵɵFactoryDeclaration<CriteriaBuilderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CriteriaBuilderComponent, "novo-criteria-builder", never, { "config": "config"; "controlName": "controlName"; "orEnabled": "orEnabled"; "addCriteriaLabel": "addCriteriaLabel"; "editTypeFn": "editTypeFn"; }, {}, ["_contentFieldDefs"], never>;
}

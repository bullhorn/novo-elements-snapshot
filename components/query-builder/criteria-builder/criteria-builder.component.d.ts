import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, OnDestroy, OnInit, QueryList } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BaseFieldDef, Condition, ConditionGroup, Conjunction } from '../query-builder.types';
import { QueryBuilderService } from '../query-builder.service';
import { NovoConditionFieldDef } from '../query-builder.directives';
import * as i0 from "@angular/core";
export declare class CriteriaBuilderComponent implements OnInit, OnDestroy, AfterContentChecked, AfterViewInit {
    private controlContainer;
    private formBuilder;
    private cdr;
    qbs: QueryBuilderService;
    config: any;
    controlName: string;
    allowedGroupings: Conjunction[];
    editTypeFn: (field: BaseFieldDef) => string;
    _contentFieldDefs: QueryList<NovoConditionFieldDef>;
    parentForm: FormGroup;
    innerForm: FormGroup;
    /** Subject that emits when the component has been destroyed. */
    private readonly _onDestroy;
    constructor(controlContainer: ControlContainer, formBuilder: FormBuilder, cdr: ChangeDetectorRef, qbs: QueryBuilderService);
    ngOnInit(): void;
    ngAfterContentChecked(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private isConditionGroup;
    private setInitalValue;
    get root(): FormArray;
    addConditionGroup(data?: any): void;
    newConditionGroup(data: ConditionGroup): FormGroup;
    newCondition({ field, operator, value }?: Condition): FormGroup;
    removeConditionGroupAt(index: number): void;
    clearAllConditions(): void;
    private _configureQueryBuilderService;
    private _registerFieldDefs;
    static ɵfac: i0.ɵɵFactoryDeclaration<CriteriaBuilderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CriteriaBuilderComponent, "novo-criteria-builder", never, { "config": "config"; "controlName": "controlName"; "allowedGroupings": "allowedGroupings"; "editTypeFn": "editTypeFn"; }, {}, ["_contentFieldDefs"], never>;
}

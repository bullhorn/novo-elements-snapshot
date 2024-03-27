import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, UntypedFormGroup } from '@angular/forms';
import { QueryBuilderService } from '../query-builder.service';
import { Condition } from '../query-builder.types';
import { NovoLabelService } from 'novo-elements/services';
import * as i0 from "@angular/core";
export declare class ConditionGroupComponent implements OnInit, OnDestroy {
    qbs: QueryBuilderService;
    labels: NovoLabelService;
    private controlContainer;
    private formBuilder;
    private cdr;
    controlName: string;
    groupIndex: number;
    parentForm: UntypedFormGroup;
    innerForm: UntypedFormGroup;
    /** Subject that emits when the component has been destroyed. */
    private readonly _onDestroy;
    constructor(qbs: QueryBuilderService, labels: NovoLabelService, controlContainer: ControlContainer, formBuilder: FormBuilder, cdr: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    updateControlName(value: string): void;
    get root(): FormArray;
    addCondition(data?: any): void;
    removeCondition(index: number): void;
    newCondition({ field, operator, value }?: Condition): UntypedFormGroup;
    cantRemoveRow(isFirst: boolean): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConditionGroupComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConditionGroupComponent, "novo-condition-group", never, { "controlName": { "alias": "controlName"; "required": false; }; "groupIndex": { "alias": "groupIndex"; "required": false; }; }, {}, never, never, false, never>;
}

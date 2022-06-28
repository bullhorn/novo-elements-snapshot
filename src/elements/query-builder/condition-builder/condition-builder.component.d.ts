import { AfterContentInit, AfterViewInit, ChangeDetectorRef, ElementRef, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { AbstractControl, ControlContainer, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import type { CriteriaBuilderComponent } from '../criteria-builder/criteria-builder.component';
import { BaseFieldDef, FieldConfig, QueryFilterOutlet } from '../query-builder.types';
import * as i0 from "@angular/core";
/**
 * Provides a handle for the table to grab the view container's ng-container to insert data rows.
 * @docs-private
 */
export declare class ConditionInputOutlet implements QueryFilterOutlet {
    viewContainer: ViewContainerRef;
    elementRef: ElementRef;
    constructor(viewContainer: ViewContainerRef, elementRef: ElementRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<ConditionInputOutlet, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ConditionInputOutlet, "[conditionInputOutlet]", never, {}, {}, never>;
}
/**
 * Provides a handle for the table to grab the view container's ng-container to insert data rows.
 * @docs-private
 */
export declare class ConditionOperatorOutlet implements QueryFilterOutlet {
    viewContainer: ViewContainerRef;
    elementRef: ElementRef;
    constructor(viewContainer: ViewContainerRef, elementRef: ElementRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<ConditionOperatorOutlet, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ConditionOperatorOutlet, "[conditionOperatorOutlet]", never, {}, {}, never>;
}
export declare const defaultEditTypeFn: (field: BaseFieldDef) => string;
export declare class ConditionBuilderComponent<T extends BaseFieldDef> implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
    private controlContainer;
    private cdr;
    _expressionBuilder?: CriteriaBuilderComponent;
    _operatorOutlet: ConditionOperatorOutlet;
    _inputOutlet: ConditionInputOutlet;
    label: any;
    config: {
        fields: FieldConfig<T>[];
    };
    editTypeFn: (field: BaseFieldDef) => string;
    parentForm: AbstractControl;
    fieldConfig: FieldConfig<T>;
    searches: Subscription;
    results$: Promise<any[]>;
    searchTerm: FormControl;
    fieldDisplayWith: any;
    private _lastContext;
    /** Subject that emits when the component has been destroyed. */
    private readonly _onDestroy;
    constructor(controlContainer: ControlContainer, cdr: ChangeDetectorRef, _expressionBuilder?: CriteriaBuilderComponent);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /**
     * Updates the Conditions "Field" Options to Change base on new Scope
     * @param fieldConfig
     */
    changeFieldOptions(fieldConfig: FieldConfig<T>): void;
    getField(): T;
    getDefaultField(): string;
    onFieldSelect(): void;
    private findDefinitionForField;
    private createFieldTemplates;
    private createFieldOperators;
    private createFieldInput;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConditionBuilderComponent<any>, [null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConditionBuilderComponent<any>, "novo-condition-builder", never, { "label": "label"; "config": "config"; "editTypeFn": "editTypeFn"; }, {}, never, ["*"]>;
}

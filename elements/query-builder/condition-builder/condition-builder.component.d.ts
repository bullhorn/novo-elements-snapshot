import { AfterContentInit, AfterViewInit, ChangeDetectorRef, ElementRef, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { AbstractControl, ControlContainer, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { QueryBuilderService } from '../query-builder.service';
import { BaseFieldDef, FieldConfig, QueryFilterOutlet } from '../query-builder.types';
import { NovoLabelService } from 'novo-elements/services';
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
export declare class ConditionBuilderComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
    labels: NovoLabelService;
    private cdr;
    private qbs;
    private controlContainer;
    _operatorOutlet: ConditionOperatorOutlet;
    _inputOutlet: ConditionInputOutlet;
    label: any;
    isFirst: boolean;
    andIndex: number;
    groupIndex: number;
    parentForm: AbstractControl;
    fieldConfig: FieldConfig<BaseFieldDef>;
    searches: Subscription;
    results$: Promise<any[]>;
    searchTerm: FormControl;
    fieldDisplayWith: any;
    private _lastContext;
    /** Subject that emits when the component has been destroyed. */
    private readonly _onDestroy;
    constructor(labels: NovoLabelService, cdr: ChangeDetectorRef, qbs: QueryBuilderService, controlContainer: ControlContainer);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /**
     * Updates the Conditions "Field" Options to Change base on new Scope
     * @param fieldConfig
     */
    changeFieldOptions(fieldConfig: FieldConfig<BaseFieldDef>): void;
    getField(): BaseFieldDef;
    getDefaultField(): string;
    onFieldSelect(): void;
    private findDefinitionForField;
    private createFieldTemplates;
    private createFieldOperators;
    private createFieldInput;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConditionBuilderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConditionBuilderComponent, "novo-condition-builder", never, { "label": "label"; "isFirst": "isFirst"; "andIndex": "andIndex"; "groupIndex": "groupIndex"; }, {}, never, ["*"]>;
}

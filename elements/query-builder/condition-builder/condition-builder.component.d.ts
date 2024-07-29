import { AfterContentInit, AfterViewInit, ChangeDetectorRef, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewContainerRef } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { NovoLabelService } from 'novo-elements/services';
import { Subscription } from 'rxjs';
import { QueryBuilderConfig, QueryBuilderService } from '../query-builder.service';
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
    static ɵdir: i0.ɵɵDirectiveDeclaration<ConditionInputOutlet, "[conditionInputOutlet]", never, {}, {}, never, never, false, never>;
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
    static ɵdir: i0.ɵɵDirectiveDeclaration<ConditionOperatorOutlet, "[conditionOperatorOutlet]", never, {}, {}, never, never, false, never>;
}
export declare class ConditionBuilderComponent implements OnInit, OnChanges, AfterContentInit, AfterViewInit, OnDestroy {
    labels: NovoLabelService;
    private cdr;
    private queryBuilderService;
    private controlContainer;
    _operatorOutlet: ConditionOperatorOutlet;
    _inputOutlet: ConditionInputOutlet;
    label: any;
    isFirst: import("@angular/core").InputSignal<boolean>;
    andIndex: number;
    groupIndex: number;
    inputConfig: import("@angular/core").InputSignal<QueryBuilderConfig>;
    inputEditTypeFn: import("@angular/core").InputSignal<(field: BaseFieldDef) => string>;
    private config;
    private editTypeFn;
    parentForm: FormGroup;
    fieldConfig: FieldConfig<BaseFieldDef>;
    searches: Subscription;
    results$: Promise<any[]>;
    searchTerm: FormControl;
    fieldDisplayWith: any;
    displayIcon: string;
    staticFieldSelection: import("@angular/core").Signal<string>;
    private _lastContext;
    isConditionHost: boolean;
    gridColumns: import("@angular/core").Signal<string>;
    /** Subject that emits when the component has been destroyed. */
    private readonly _onDestroy;
    constructor(labels: NovoLabelService, cdr: ChangeDetectorRef, queryBuilderService: QueryBuilderService, controlContainer: ControlContainer);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
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
    updateFieldSelection(): void;
    private findDefinitionForField;
    private createFieldTemplates;
    private createFieldOperators;
    private createFieldInput;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConditionBuilderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConditionBuilderComponent, "novo-condition-builder", never, { "label": { "alias": "label"; "required": false; }; "isFirst": { "alias": "isFirst"; "required": false; "isSignal": true; }; "andIndex": { "alias": "andIndex"; "required": false; }; "groupIndex": { "alias": "groupIndex"; "required": false; }; "inputConfig": { "alias": "config"; "required": false; "isSignal": true; }; "inputEditTypeFn": { "alias": "editTypeFn"; "required": false; "isSignal": true; }; }, {}, never, ["*"], false, never>;
}

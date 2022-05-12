import { AfterContentChecked, AfterContentInit, ChangeDetectorRef, ElementRef, OnDestroy, OnInit, QueryList, ViewContainerRef } from '@angular/core';
import { AbstractControl, ControlContainer, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BaseFilterFieldDef, NovoFilterFieldDef, NovoFilterFieldTypeDef } from './base-filter-field.definition';
import * as i0 from "@angular/core";
export interface Condition {
    field: string;
    operator: string;
    value: any;
}
export interface BaseFieldDef {
    name: string;
    label?: string;
    type: string;
    dataSpecialization?: string;
    optional?: boolean;
    multiValue?: boolean;
    inputType?: string;
    options?: {
        value: string | number;
        label: string;
        readOnly?: boolean;
    }[];
    optionsUrl?: string;
    optionsType?: string;
    dataType?: string;
}
export interface FieldConfig<T extends BaseFieldDef> {
    value: string;
    label: string;
    options: T[];
    search: (term: string) => T[];
    find: (name: string) => T;
}
/** Interface used to provide an outlet for rows to be inserted into. */
export interface QueryFilterOutlet {
    viewContainer: ViewContainerRef;
}
/**
 * Provides a handle for the table to grab the view container's ng-container to insert data rows.
 * @docs-private
 */
export declare class QueryFilterInputOutlet implements QueryFilterOutlet {
    viewContainer: ViewContainerRef;
    elementRef: ElementRef;
    constructor(viewContainer: ViewContainerRef, elementRef: ElementRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<QueryFilterInputOutlet, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<QueryFilterInputOutlet, "[queryFilterInputOutlet]", never, {}, {}, never>;
}
/**
 * Provides a handle for the table to grab the view container's ng-container to insert data rows.
 * @docs-private
 */
export declare class QueryFilterOperatorOutlet implements QueryFilterOutlet {
    viewContainer: ViewContainerRef;
    elementRef: ElementRef;
    constructor(viewContainer: ViewContainerRef, elementRef: ElementRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<QueryFilterOperatorOutlet, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<QueryFilterOperatorOutlet, "[queryFilterOperatorOutlet]", never, {}, {}, never>;
}
export declare const defaultEditTypeFn: (field: BaseFieldDef) => string;
export declare class FilterBuilderComponent<T extends BaseFieldDef> implements OnInit, AfterContentInit, AfterContentChecked, OnDestroy {
    private controlContainer;
    private cdr;
    _operatorOutlet: QueryFilterOperatorOutlet;
    _inputOutlet: QueryFilterInputOutlet;
    _contentFieldTypeDefs: QueryList<NovoFilterFieldTypeDef>;
    _contentFieldDefs: QueryList<NovoFilterFieldDef>;
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
    private _lastContext;
    private _customFieldDefs;
    private _fieldDefsByName;
    /** Subject that emits when the component has been destroyed. */
    private readonly _onDestroy;
    constructor(controlContainer: ControlContainer, cdr: ChangeDetectorRef);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngAfterContentChecked(): void;
    ngOnDestroy(): void;
    /**
     * Updates the Conditions "Field" Options to Change base on new Scope
     * @param fieldConfig
     */
    changeFieldOptions(fieldConfig: FieldConfig<T>): void;
    getField(): T;
    getDefaultField(): string;
    onFieldSelect(): void;
    /** Adds a field definition that was not included as part of the content children. */
    addFieldDef(fieldDef: BaseFilterFieldDef): void;
    /** Removes a field definition that was not included as part of the content children. */
    removeFieldDef(fieldDef: BaseFilterFieldDef): void;
    private _cacheFieldDefs;
    private findDefinitionForField;
    private createFieldTemplates;
    private createFieldOperators;
    private createFieldInput;
    static ɵfac: i0.ɵɵFactoryDeclaration<FilterBuilderComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FilterBuilderComponent<any>, "novo-filter-builder", never, { "label": "label"; "config": "config"; "editTypeFn": "editTypeFn"; }, {}, ["_contentFieldTypeDefs", "_contentFieldDefs"], never>;
}

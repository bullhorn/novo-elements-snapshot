import { OnDestroy, OnInit } from '@angular/core';
import { NovoFilterFieldInputDef, NovoFilterFieldOperatorsDef, NovoFilterFieldTypeDef } from '../base-filter-field.definition';
import { FilterBuilderComponent } from '../filter-builder.component';
import * as i0 from "@angular/core";
export declare class DefaultFilterFieldDef implements OnDestroy, OnInit {
    private _fb;
    /** Column name that should be used to reference this column. */
    get name(): string;
    set name(name: string);
    _name: string;
    defaultOperator: string;
    fieldDef: NovoFilterFieldTypeDef;
    /**
     * Reference to the defined input template for the field
     */
    inputDef: NovoFilterFieldInputDef;
    /**
     * Reference to the defined operator template for the field
     */
    operatorDef: NovoFilterFieldOperatorsDef;
    constructor(_fb: FilterBuilderComponent<any>);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /** Synchronizes the column definition name with the text column name. */
    private _syncFieldDefName;
    private _syncFieldDefOperatorValue;
    static ɵfac: i0.ɵɵFactoryDeclaration<DefaultFilterFieldDef, [{ optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DefaultFilterFieldDef, never, never, { "name": "name"; }, {}, never>;
}

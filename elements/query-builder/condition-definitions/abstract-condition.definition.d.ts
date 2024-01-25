import { OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { NovoLabelService } from 'novo-elements/services';
import { NovoConditionFieldDef } from '../query-builder.directives';
import * as i0 from "@angular/core";
export declare abstract class AbstractConditionFieldDef implements OnDestroy, OnInit {
    labels: NovoLabelService;
    /** Column name that should be used to reference this column. */
    get name(): string;
    set name(name: string);
    _name: string;
    defaultOperator: string;
    fieldDef: NovoConditionFieldDef;
    constructor(labels: NovoLabelService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onOperatorSelect(formGroup: UntypedFormGroup): void;
    /** Synchronizes the column definition name with the text column name. */
    private _syncFieldDefName;
    private _syncFieldDefOperatorValue;
    static ɵfac: i0.ɵɵFactoryDeclaration<AbstractConditionFieldDef, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AbstractConditionFieldDef, never, never, { "name": "name"; }, {}, never, never, false>;
}

import { Subject } from 'rxjs';
import { BaseFieldDef, Conjunction, FieldConfig } from './query-builder.types';
import { BaseConditionFieldDef } from './query-builder.directives';
import { NovoLabelService } from 'novo-elements/services';
import * as i0 from "@angular/core";
export declare const defaultEditTypeFn: (field: BaseFieldDef) => string;
export declare class QueryBuilderService {
    private labels;
    private _customFieldDefs;
    private _fieldDefsByName;
    /**
     * Will dispatch when properties changes, subscribe to this if component should
     * re-render when props are updated
     */
    readonly stateChanges: Subject<void>;
    /**
     * Function to determine operator and input templates for a field.  Value passed
     * through the criteria builder Input.
     */
    get editTypeFn(): (field: BaseFieldDef) => string;
    set editTypeFn(value: (field: BaseFieldDef) => string);
    private _editTypeFn;
    /**
     * The field configuration to control which types of fields are available to select
     * within the Condition Builder.
     */
    get config(): {
        fields: FieldConfig<BaseFieldDef>[];
    };
    set config(value: {
        fields: FieldConfig<BaseFieldDef>[];
    });
    private _config;
    /**
     * The configuration to control which types of conjuntions can be used in the query builder.
     * Value passed through the criteria builder Input
     * eg. and, or, not
     */
    get allowedGroupings(): Conjunction[];
    set allowedGroupings(value: Conjunction[]);
    private _allowedGroupings;
    constructor(labels: NovoLabelService);
    /** Adds a field definition that was not included as part of the content children. */
    registerFieldDef(fieldDef: BaseConditionFieldDef): void;
    /** Removes a field definition that was not included as part of the content children. */
    unregisterFieldDef(fieldDef: BaseConditionFieldDef): void;
    getFieldDefsByName(): Map<string, BaseConditionFieldDef>;
    getConjunctionLabel(conjunction: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<QueryBuilderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<QueryBuilderService>;
}

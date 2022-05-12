import { TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
/** Base interface for a cell definition. Captures a column's cell template definition. */
export interface FilterFieldDef {
    template: TemplateRef<any>;
}
/**
 * Cell definition for a CDK table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
export declare class NovoFilterFieldInputDef implements FilterFieldDef {
    template: TemplateRef<any>;
    constructor(/** @docs-private */ template: TemplateRef<any>);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoFilterFieldInputDef, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoFilterFieldInputDef, "[novoFilterFieldInputDef]", never, {}, {}, never>;
}
/**
 * Cell definition for a CDK table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
export declare class NovoFilterFieldOperatorsDef implements FilterFieldDef {
    template: TemplateRef<any>;
    constructor(/** @docs-private */ template: TemplateRef<any>);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoFilterFieldOperatorsDef, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoFilterFieldOperatorsDef, "[novoFilterFieldOperatorsDef]", never, {}, {}, never>;
}
/**
 * Field Field definition for the QueryBuilder.
 * Defines the inputType and operators to use for the query builder.
 */
export declare class BaseFilterFieldDef {
    /** Unique name for this field. */
    get name(): string;
    set name(name: string);
    protected _name: string;
    fieldInput: NovoFilterFieldInputDef;
    fieldOperators: NovoFilterFieldOperatorsDef;
    /**
     * Transformed version of the column name that can be used as part of a CSS classname. Excludes
     * all non-alphanumeric characters and the special characters '-' and '_'. Any characters that
     * do not match are replaced by the '-' character.
     */
    cssClassFriendlyName: string;
    _fieldCssClassName: string[];
    defaultOperator: string;
    constructor();
    /**
     * Overridable method that sets the css classes that will be added to every cell in this
     * column.
     * In the future, columnCssClassName will change from type string[] to string and this
     * will set a single string value.
     * @docs-private
     */
    protected _updateFieldCssClassName(): void;
    /**
     * This has been extracted to a util because of TS 4 and VE.
     * View Engine doesn't support property rename inheritance.
     * TS 4.0 doesn't allow properties to override accessors or vice-versa.
     * @docs-private
     */
    protected _setNameInput(value: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BaseFilterFieldDef, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BaseFilterFieldDef, never, never, { "name": "novoFilterFieldDef"; }, {}, ["fieldInput", "fieldOperators"]>;
}
export declare class NovoFilterFieldDef extends BaseFilterFieldDef {
    _filterBuilder?: any;
    constructor(_filterBuilder?: any);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoFilterFieldDef, [{ optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoFilterFieldDef, "[novoFilterFieldDef]", never, {}, {}, never>;
}
export declare class NovoFilterFieldTypeDef extends BaseFilterFieldDef {
    _filterBuilder?: any;
    constructor(_filterBuilder?: any);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoFilterFieldTypeDef, [{ optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoFilterFieldTypeDef, "[novoFilterFieldTypeDef]", never, {}, {}, never>;
}

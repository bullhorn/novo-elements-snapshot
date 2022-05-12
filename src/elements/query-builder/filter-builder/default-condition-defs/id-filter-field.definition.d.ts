import { FilterBuilderComponent } from '../filter-builder.component';
import { DefaultFilterFieldDef } from './default-filter-field.definition';
import * as i0 from "@angular/core";
/**
 * Any condition that has a type of ID usually only is queried by ID.
 */
export declare class NovoDefaultIdFilterFieldDef extends DefaultFilterFieldDef {
    defaultOperator: string;
    constructor(_fb: FilterBuilderComponent<any>);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDefaultIdFilterFieldDef, [{ optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDefaultIdFilterFieldDef, "novo-id-filter-field-def", never, {}, {}, never, ["*"]>;
}

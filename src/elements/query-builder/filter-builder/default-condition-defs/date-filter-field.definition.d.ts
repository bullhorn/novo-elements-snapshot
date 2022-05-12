import { FilterBuilderComponent } from '../filter-builder.component';
import { DefaultFilterFieldDef } from './default-filter-field.definition';
import * as i0 from "@angular/core";
/**
 * Most complicated of the default conditions defs, a date needs to provide a different
 * input type depending on the operator selected.
 */
export declare class NovoDefaultDateFilterFieldDef extends DefaultFilterFieldDef {
    defaultOperator: string;
    constructor(_fb: FilterBuilderComponent<any>);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDefaultDateFilterFieldDef, [{ optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDefaultDateFilterFieldDef, "novo-date-filter-field-def", never, {}, {}, never, never>;
}

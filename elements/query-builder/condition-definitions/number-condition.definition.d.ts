import { AbstractConditionFieldDef } from './abstract-condition.definition';
import * as i0 from "@angular/core";
/**
 * When constructing a query using a field that is an Int, Double, Number ...etc.
 * TODO: Do we implment currency formation here potentially>.?
 */
export declare class NovoDefaultNumberConditionDef extends AbstractConditionFieldDef {
    defaultOperator: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDefaultNumberConditionDef, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDefaultNumberConditionDef, "novo-number-condition-def", never, {}, {}, never, never, false>;
}

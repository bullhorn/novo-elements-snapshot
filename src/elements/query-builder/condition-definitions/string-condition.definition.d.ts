import { AbstractControl } from '@angular/forms';
import { AbstractConditionFieldDef } from './abstract-condition.definition';
import * as i0 from "@angular/core";
/**
 * Contruction filters against String fields can be complex. Each "chip" added to the
 * condition can be used to indendantly used to query a database.  Not all systems support
 * quering within a text column, ie sql unless LIKE is enabled. This could result in a
 * performance penalty.
 */
export declare class NovoDefaultStringConditionDef extends AbstractConditionFieldDef {
    separatorKeysCodes: number[];
    defaultOperator: string;
    getValue(formGroup: AbstractControl): any[];
    add(event: any, formGroup: AbstractControl): void;
    remove(valueToRemove: string, formGroup: AbstractControl): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDefaultStringConditionDef, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDefaultStringConditionDef, "novo-string-condition-def", never, {}, {}, never, never>;
}

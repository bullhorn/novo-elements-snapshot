import { AbstractControl, FormControl } from '@angular/forms';
import { FilterBuilderComponent } from '../filter-builder.component';
import { DefaultFilterFieldDef } from './default-filter-field.definition';
import * as i0 from "@angular/core";
/**
 * Contruction filters against String fields can be complex. Each "chip" added to the
 * condition can be used to indendantly used to query a database.  Not all systems support
 * quering within a text column, ie sql unless LIKE is enabled. This could result in a
 * performance penalty.
 */
export declare class NovoDefaultStringFilterFieldDef extends DefaultFilterFieldDef {
    inputCtrl: FormControl;
    separatorKeysCodes: number[];
    defaultOperator: string;
    constructor(_fb: FilterBuilderComponent<any>);
    getValue(formGroup: AbstractControl): any[];
    add(event: any, formGroup: AbstractControl): void;
    remove(valueToRemove: string, formGroup: AbstractControl): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDefaultStringFilterFieldDef, [{ optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDefaultStringFilterFieldDef, "novo-string-filter-field-def", never, {}, {}, never, never>;
}

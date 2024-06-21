import { QueryList } from '@angular/core';
import { NovoPickerToggleElement } from 'novo-elements/elements/field';
import { AbstractConditionFieldDef } from './abstract-condition.definition';
import { Operator } from '../query-builder.types';
import * as i0 from "@angular/core";
/**
 * Most complicated of the default conditions defs, a date needs to provide a different
 * input type depending on the operator selected.
 */
export declare class NovoDefaultDateTimeConditionDef extends AbstractConditionFieldDef {
    overlayChildren: QueryList<NovoPickerToggleElement>;
    defaultOperator: Operator;
    closePanel(event: any, viewIndex: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDefaultDateTimeConditionDef, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDefaultDateTimeConditionDef, "novo-date-time-condition-def", never, {}, {}, never, never, false, never>;
}

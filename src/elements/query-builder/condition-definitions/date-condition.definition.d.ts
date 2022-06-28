import { NovoPickerToggleElement } from './../../field/toggle/picker-toggle.component';
import { FormGroup } from '@angular/forms';
import { AbstractConditionFieldDef } from './abstract-condition.definition';
import * as i0 from "@angular/core";
/**
 * Most complicated of the default conditions defs, a date needs to provide a different
 * input type depending on the operator selected.
 */
export declare class NovoDefaultDateConditionDef extends AbstractConditionFieldDef {
    overlay: NovoPickerToggleElement;
    defaultOperator: string;
    onOperatorSelect(formGroup: FormGroup): void;
    togglePanel(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDefaultDateConditionDef, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDefaultDateConditionDef, "novo-date-condition-def", never, {}, {}, never, never>;
}

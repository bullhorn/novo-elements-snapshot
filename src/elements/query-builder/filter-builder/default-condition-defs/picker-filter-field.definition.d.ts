import { FilterBuilderComponent } from '../filter-builder.component';
import { DefaultFilterFieldDef } from './default-filter-field.definition';
import * as i0 from "@angular/core";
/**
 * Handle selection of field values when a list of options is provided.
 */
export declare class NovoDefaultPickerFilterFieldDef extends DefaultFilterFieldDef {
    defaultOperator: string;
    constructor(_fb: FilterBuilderComponent<any>);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDefaultPickerFilterFieldDef, [{ optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDefaultPickerFilterFieldDef, "novo-picker-filter-field-def", never, {}, {}, never, never>;
}

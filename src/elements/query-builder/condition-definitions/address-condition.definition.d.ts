import { ElementRef, QueryList } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { AbstractConditionFieldDef } from './abstract-condition.definition';
import { NovoPickerToggleElement } from './../../field/toggle/picker-toggle.component';
import { NovoLabelService } from '../../../services';
import * as i0 from "@angular/core";
/**
 * Handle selection of field values when a list of options is provided.
 */
export declare class NovoDefaultAddressConditionDef extends AbstractConditionFieldDef {
    element: ElementRef;
    labels: NovoLabelService;
    overlayChildren: QueryList<NovoPickerToggleElement>;
    inputChildren: QueryList<ElementRef>;
    defaultOperator: string;
    chipListModel: any;
    term: string;
    constructor(element: ElementRef, labels: NovoLabelService);
    onKeyup(event: any): void;
    getValue(formGroup: AbstractControl): any[];
    getCurrentOverlay(viewIndex: string): NovoPickerToggleElement<any>;
    selectPlace(event: any, formGroup: AbstractControl, viewIndex: string): void;
    remove(valueToRemove: any, formGroup: AbstractControl): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDefaultAddressConditionDef, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDefaultAddressConditionDef, "novo-address-condition-def", never, {}, {}, never, never>;
}

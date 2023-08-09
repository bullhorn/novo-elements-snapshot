import { ElementRef, QueryList } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { AbstractConditionFieldDef } from './abstract-condition.definition';
import { NovoPickerToggleElement } from 'novo-elements/elements/field';
import { PlacesListComponent } from 'novo-elements/elements/places';
import { NovoLabelService } from 'novo-elements/services';
import * as i0 from "@angular/core";
/**
 * Handle selection of field values when a list of options is provided.
 */
export declare class NovoDefaultAddressConditionDef extends AbstractConditionFieldDef {
    element: ElementRef;
    labels: NovoLabelService;
    overlayChildren: QueryList<NovoPickerToggleElement>;
    inputChildren: QueryList<ElementRef>;
    placesPicker: PlacesListComponent;
    defaultOperator: string;
    chipListModel: any;
    term: string;
    constructor(element: ElementRef, labels: NovoLabelService);
    onKeyup(event: any, viewIndex: any): void;
    onKeydown(event: any, viewIndex: any): void;
    getValue(formGroup: AbstractControl): any[];
    getCurrentOverlay(viewIndex: string): NovoPickerToggleElement;
    getCurrentInput(viewIndex: string): ElementRef;
    openPlacesList(viewIndex: any): void;
    closePlacesList(viewIndex: any): void;
    selectPlace(event: any, formGroup: AbstractControl, viewIndex: string): void;
    remove(valueToRemove: any, formGroup: AbstractControl, viewIndex: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDefaultAddressConditionDef, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDefaultAddressConditionDef, "novo-address-condition-def", never, {}, {}, never, never>;
}

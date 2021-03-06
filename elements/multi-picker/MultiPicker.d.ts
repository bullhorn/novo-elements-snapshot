import { ElementRef, EventEmitter, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { NovoLabelService } from '../../services/novo-label-service';
import * as ɵngcc0 from '@angular/core';
interface Item {
    type: any;
    label: any;
    value: any;
}
export declare class NovoMultiPickerElement implements OnInit {
    element: ElementRef;
    labels: NovoLabelService;
    source: {
        options: [];
        resultsTemplate: any;
        selectAllOption: boolean;
        chipsCount: any;
        strictRelationship: any;
    };
    placeholder: any;
    types: {
        value: any;
        singular: any;
        plural: any;
        isParentOf: any;
        isChildOf: any;
    }[];
    changed: EventEmitter<any>;
    focus: EventEmitter<any>;
    blur: EventEmitter<any>;
    get value(): {};
    set value(selectedItems: {});
    items: Item[];
    _items: ReplaySubject<Item[]>;
    options: any;
    _options: any;
    selected: any;
    config: any;
    chipsCount: number;
    selectAllOption: boolean;
    strictRelationship: boolean;
    _value: {};
    notShown: any;
    model: any;
    onModelChange: Function;
    onModelTouched: Function;
    constructor(element: ElementRef, labels: NovoLabelService);
    ngOnInit(): void;
    clearValue(): void;
    removeFromDisplay(event: any, item: any): void;
    setupOptions(): void;
    setupOptionsByType(section: any): any;
    formatOption(section: any, item: any): {
        value: any;
        label: any;
        type: any;
        checked: any;
        isParentOf: any;
        isChildOf: any;
    };
    createSelectAllOption(section: any): {
        value: string;
        label: string;
        type: any;
        checked: boolean;
        isParentOf: any;
        isChildOf: any;
    };
    deselectAll(): void;
    select(event: any, item: any): void;
    onFocus(e: any): void;
    clickOption(event: any): void;
    add(event: any): void;
    updateAllItemState(type: any): {
        allOfType: any;
        allOfTypeSelected: boolean;
    };
    setIndeterminateState(allOfType: any, status: any): void;
    updateDisplayItems(item: any, action: any): void;
    updateDisplayText(items: any): void;
    remove(event: any, item: any): void;
    removeItem(item: any, triggeredByEvent?: any): void;
    removeValue(item: any): void;
    onKeyDown(event: any): void;
    allOfTypeSelected(type: any): boolean;
    modifyAllOfType(type: any, action: any): void;
    triggerValueUpdate(): void;
    selectAll(allOfType: any, type: any): void;
    handleRemoveItemIfAllSelected(item: any): void;
    handleOutsideClick(event: any): void;
    getAllOfType(type: any): any;
    updateParentOrChildren(item: any, action: any): void;
    modifyAffectedParentsOrChildren(selecting: any, itemChanged: any): void;
    updateAllParentsOrChildren(allItem: any, action: any): void;
    updateAllChildrenValue(item: any, action: any): void;
    updateAllParentValue(item: any, action: any): void;
    updateIndeterminateStates(allParentType: any, allChildren: any, allCheckedChildren: any): void;
    updateChildrenValue(parent: any, action: any): void;
    updateParentValue(child: any, action: any): void;
    addIndividualChildren(children: any): void;
    setInitialValue(model: any): void;
    allItemsSelected(optionsByType: any, type: any): boolean;
    onTouched(e: any): void;
    writeValue(model: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoMultiPickerElement, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoMultiPickerElement, "multi-picker", never, { "placeholder": "placeholder"; "value": "value"; "source": "source"; "types": "types"; }, { "changed": "changed"; "focus": "focus"; "blur": "blur"; }, never, never>;
}
export {};

//# sourceMappingURL=MultiPicker.d.ts.map
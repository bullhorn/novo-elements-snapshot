// NG2
import { Component, ElementRef, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// Vendor
import { ReplaySubject } from 'rxjs';
import { NovoLabelService } from '../../services/novo-label-service';
import { Helpers } from '../../utils/Helpers';
import * as i0 from "@angular/core";
import * as i1 from "../../services/novo-label-service";
import * as i2 from "../chips/Chip";
import * as i3 from "../picker/Picker";
import * as i4 from "@angular/common";
// Value accessor for the component (supports ngModel)
const CHIPS_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoMultiPickerElement),
    multi: true,
};
export class NovoMultiPickerElement {
    constructor(element, labels) {
        this.element = element;
        this.labels = labels;
        this.placeholder = '';
        this.changed = new EventEmitter();
        this.focus = new EventEmitter();
        this.blur = new EventEmitter();
        this.items = [];
        this._items = new ReplaySubject(1);
        this.selected = null;
        this.config = {};
        // private data model
        this._value = {};
        this.notShown = {};
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
        this.chipsCount = 4;
    }
    get value() {
        return this._value;
    }
    set value(selectedItems) {
        if (selectedItems) {
            this.types.forEach((x) => (this._value[x.value] = selectedItems[x.value]));
        }
        else {
            this._value = {};
            this.types.forEach((x) => (this._value[x.value] = []));
        }
        this.changed.emit(selectedItems);
        this.onModelChange(selectedItems);
    }
    ngOnInit() {
        this.selectAllOption = this.source.selectAllOption || false;
        this.chipsCount = this.source.chipsCount || 4;
        this.strictRelationship = this.source.strictRelationship || false;
        this.setupOptions();
    }
    clearValue() {
        this.types.forEach((type) => this.modifyAllOfType(type.value, 'unselect'));
        this.items = [];
        this._items.next(this.items);
        this.setInitialValue(null);
        this.onModelChange(this.value);
    }
    removeFromDisplay(event, item) {
        this.remove(true, item);
        this.modifyAffectedParentsOrChildren(false, item);
    }
    setupOptions() {
        this.options = this.source.options || [];
        this._options = [];
        if (this.options) {
            this.options.forEach((option) => {
                const formattedOption = this.setupOptionsByType(option);
                this._options.push(formattedOption);
            });
        }
        this.source.options = this._options;
    }
    setupOptionsByType(section) {
        const formattedSection = {
            type: section.type,
            label: section.label || section.type,
        };
        formattedSection.data = section.data.map((item) => {
            return this.formatOption(section, item);
        });
        if (this.selectAllOption) {
            const selectAll = this.createSelectAllOption(section);
            formattedSection.data.splice(0, 0, selectAll);
        }
        formattedSection.originalData = formattedSection.data.slice();
        return formattedSection;
    }
    formatOption(section, item) {
        const obj = {
            value: section.field ? item[section.field] : item.value || item,
            label: section.format ? Helpers.interpolate(section.format, item) : item.label || String(item.value || item),
            type: section.type,
            checked: undefined,
            isParentOf: section.isParentOf,
            isChildOf: section.isChildOf,
        };
        if (obj.isChildOf) {
            obj[section.isChildOf] = item[section.isChildOf];
        }
        return obj;
    }
    createSelectAllOption(section) {
        const selectAll = {
            value: 'ALL',
            label: `All ${section.type}`,
            type: section.type,
            checked: this.model && this.model.length && this.model.indexOf('ALL') !== -1,
            isParentOf: section.isParentOf,
            isChildOf: section.isChildOf,
        };
        if (section.isChildOf) {
            const allParents = section.data.reduce((accum, next) => {
                return accum.concat(next[section.isChildOf]);
            }, []);
            selectAll[section.isChildOf] = allParents;
        }
        return selectAll;
    }
    deselectAll() {
        this.selected = null;
    }
    select(event, item) {
        this.blur.emit(event);
        this.deselectAll();
        this.selected = item;
    }
    onFocus(e) {
        this.element.nativeElement.classList.add('selected');
        this.focus.emit(e);
    }
    clickOption(event) {
        if (event && !(event instanceof Event)) {
            if (event.checked === false) {
                this.remove(null, event);
            }
            else {
                this.add(event);
            }
            this.modifyAffectedParentsOrChildren(event.checked, event);
            // Set focus on the picker
            const input = this.element.nativeElement.querySelector('novo-picker > input');
            if (input) {
                input.focus();
            }
        }
    }
    add(event) {
        if (event.value === 'ALL') {
            this.modifyAllOfType(event.type, 'select');
        }
        else {
            this.updateDisplayItems(event, 'add');
            this.value[event.type].push(event.value);
            this.updateAllItemState(event.type);
            this.triggerValueUpdate();
        }
        this.updateParentOrChildren(event, 'select');
        this.select(null, event);
    }
    updateAllItemState(type) {
        const allOfType = this.getAllOfType(type);
        const allOfTypeSelected = this.allItemsSelected(allOfType, type);
        if (allOfTypeSelected) {
            this.selectAll(allOfType, type);
        }
        return { allOfType, allOfTypeSelected };
    }
    setIndeterminateState(allOfType, status) {
        if (!this.selectAllOption) {
            return;
        }
        const allItem = allOfType[0];
        allItem.indeterminate = status;
    }
    updateDisplayItems(item, action) {
        const adding = action === 'add';
        if (adding) {
            this.items.push(item);
        }
        else {
            if (this.items.indexOf(item) > -1) {
                this.items.splice(this.items.indexOf(item), 1);
            }
        }
        this.updateDisplayText(this.items);
        this._items.next(this.items);
    }
    updateDisplayText(items) {
        this.notShown = [];
        const notShown = items.slice(this.chipsCount);
        if (notShown.length > 0) {
            this.types.forEach((type) => {
                let count;
                const selectedOfType = notShown.filter((x) => x.type === type.value);
                if (selectedOfType.length === 1 && selectedOfType[0].value === 'ALL') {
                    count = this.getAllOfType(type.value).length - 1;
                }
                else {
                    count = selectedOfType.length;
                }
                const displayType = count === 1 ? type.singular : type.plural || type.value;
                if (count > 0) {
                    this.notShown.push({ type: displayType, count });
                }
            });
        }
    }
    remove(event, item) {
        let triggeredByEvent;
        if (event) {
            triggeredByEvent = true;
        }
        const itemToRemove = item;
        if (itemToRemove.value === 'ALL') {
            triggeredByEvent = false;
            this.modifyAllOfType(itemToRemove.type, 'unselect');
        }
        else if (this.allOfTypeSelected(itemToRemove.type)) {
            this.handleRemoveItemIfAllSelected(itemToRemove);
        }
        this.removeItem(item, triggeredByEvent);
    }
    removeItem(item, triggeredByEvent) {
        item.checked = false;
        this.deselectAll();
        this.removeValue(item);
        if (item.value !== 'ALL') {
            this.updateParentOrChildren(item, 'unselect');
        }
        if (triggeredByEvent) {
            this.modifyAffectedParentsOrChildren(false, item);
        }
    }
    removeValue(item) {
        const updatedValues = this.value[item.type].filter((x) => x !== item.value);
        this.value[item.type] = updatedValues;
        this.triggerValueUpdate();
        this.updateDisplayItems(item, 'remove');
    }
    onKeyDown(event) {
        if (event.key === "Backspace" /* Backspace */) {
            if (event.target && event.target.value.length === 0 && this.items.length) {
                if (event) {
                    event.stopPropagation();
                    event.preventDefault();
                }
                if (this.selected) {
                    this.remove(null, this.selected);
                }
                else {
                    this.select(event, this.items[this.items.length - 1]);
                }
            }
        }
    }
    allOfTypeSelected(type) {
        return this.items.filter((x) => x.type === type && x.value === 'ALL').length > 0;
    }
    modifyAllOfType(type, action) {
        const selecting = action === 'select';
        const allOfType = this.getAllOfType(type);
        allOfType.forEach((item) => {
            item.checked = selecting;
            item.indeterminate = false;
        });
        if (selecting) {
            this.selectAll(allOfType, type);
        }
        else {
            this.items = [...this.items.filter((x) => x.type !== type)];
            this._items.next(this.items);
            this.value[type] = [];
        }
        if (this.selectAllOption) {
            this.updateAllParentsOrChildren(allOfType[0], action);
        }
        this.triggerValueUpdate();
    }
    triggerValueUpdate() {
        const updatedObject = {};
        this.types.forEach((x) => (updatedObject[x.value] = this.value[x.value]));
        this.value = updatedObject;
    }
    selectAll(allOfType, type) {
        if (!this.selectAllOption) {
            return;
        }
        allOfType[0].checked = true;
        const values = allOfType.map((i) => {
            return i.value;
        });
        // remove 'ALL' value
        values.splice(0, 1);
        this.value[type] = values;
        const updatedItems = this.items.filter((x) => x.type !== type);
        this.items = updatedItems;
        this.updateDisplayItems(allOfType[0], 'add');
    }
    handleRemoveItemIfAllSelected(item) {
        if (!this.selectAllOption) {
            return;
        }
        const type = item.type;
        const allOfType = this.getAllOfType(type);
        const allItem = allOfType[0];
        this.removeItem(allItem);
        allItem.indeterminate = true;
        const selectedItems = allOfType.filter((i) => i.checked === true);
        this.items = [...this.items, ...selectedItems];
        const values = selectedItems.map((i) => {
            return i.value;
        });
        this.value[type] = [...values];
    }
    handleOutsideClick(event) {
        // If the elements doesn't contain the target element, it is an outside click
        if (!this.element.nativeElement.contains(event.target)) {
            this.blur.emit(event);
            this.deselectAll();
        }
    }
    getAllOfType(type) {
        return this._options.filter((x) => x.type === type)[0].originalData;
    }
    updateParentOrChildren(item, action) {
        if (this.strictRelationship && item.isParentOf) {
            this.updateChildrenValue(item, action);
        }
        else if (item.isChildOf && this.selectAllOption) {
            this.updateParentValue(item, action);
        }
    }
    modifyAffectedParentsOrChildren(selecting, itemChanged) {
        if (!itemChanged.isChildOf && !itemChanged.isParentOf) {
            return;
        }
        const parent = this.types.filter((x) => !!x.isParentOf)[0];
        const parentType = parent.value;
        const allParentType = this.getAllOfType(parentType);
        const childType = allParentType[0].isParentOf;
        const allChildren = this.getAllOfType(childType);
        const allCheckedChildren = allChildren.filter((x) => !!x.checked);
        allParentType.forEach((obj) => {
            if (obj.value === 'ALL') {
                return;
            }
            const selectedChildrenOfParent = allCheckedChildren.filter((x) => {
                return x[parentType].filter((y) => y === obj.value).length > 0;
            });
            if (selecting) {
                if (obj.checked) {
                    return;
                }
                obj.indeterminate = selectedChildrenOfParent.length > 0;
            }
            else {
                const allChildrenOfParent = allChildren.filter((x) => {
                    return x.value !== 'ALL' && x[parentType].filter((y) => y === obj.value).length > 0;
                });
                if (selectedChildrenOfParent.length > 0) {
                    if (obj.checked) {
                        if (this.strictRelationship && allChildrenOfParent.length !== selectedChildrenOfParent.length) {
                            obj.indeterminate = true;
                            obj.checked = false;
                            this.removeValue(obj);
                            this.addIndividualChildren(selectedChildrenOfParent);
                        }
                    }
                    else {
                        obj.indeterminate = true;
                    }
                    if (this.strictRelationship && itemChanged.type !== parentType) {
                        if (obj.checked) {
                            obj.checked = false;
                            this.removeValue(obj);
                            this.addIndividualChildren(selectedChildrenOfParent);
                        }
                    }
                }
                else {
                    obj.indeterminate = false;
                    if (allChildrenOfParent.length === 0) {
                        // if it has no children and is checked, it should stay checked
                        return;
                    }
                    else if (this.strictRelationship && itemChanged.type !== parentType) {
                        this.remove(null, obj);
                    }
                }
            }
        });
        if (this.selectAllOption) {
            this.updateIndeterminateStates(allParentType, allChildren, allCheckedChildren);
        }
    }
    updateAllParentsOrChildren(allItem, action) {
        if (allItem.isParentOf) {
            this.updateAllChildrenValue(allItem, action);
        }
        else if (allItem.isChildOf) {
            this.updateAllParentValue(allItem, action);
        }
    }
    updateAllChildrenValue(item, action) {
        const selecting = action === 'select';
        const childType = item.isParentOf;
        const potentialChildren = this.getAllOfType(childType);
        if (this.selectAllOption && this.allOfTypeSelected(childType) && !selecting) {
            this.remove(null, potentialChildren[0]);
            return;
        }
        potentialChildren.forEach((x) => {
            if (x.value === 'ALL' && !x.checked) {
                if (selecting) {
                    x.checked = true;
                }
                x.indeterminate = selecting;
            }
            else {
                if (x.checked && !selecting) {
                    this.remove(null, x);
                }
                x.checked = selecting;
            }
        });
    }
    updateAllParentValue(item, action) {
        const selecting = action === 'select';
        const parentType = item.isChildOf;
        const potentialParents = this.getAllOfType(parentType);
        potentialParents.forEach((x) => {
            if (!x.checked) {
                x.indeterminate = selecting;
            }
        });
    }
    updateIndeterminateStates(allParentType, allChildren, allCheckedChildren) {
        const allCheckedOrIndeterminateParents = allParentType.filter((x) => (!!x.checked || !!x.indeterminate) && x.value !== 'ALL');
        const isParentIndeterminate = !!allParentType[0].checked ? false : allCheckedOrIndeterminateParents.length > 0;
        const isChildIndeterminate = !!allChildren[0].checked ? false : allCheckedChildren.length > 0;
        this.setIndeterminateState(allParentType, isParentIndeterminate);
        this.setIndeterminateState(allChildren, isChildIndeterminate);
    }
    updateChildrenValue(parent, action) {
        const selecting = action === 'select';
        const childType = parent.isParentOf;
        const potentialChildren = this.getAllOfType(childType);
        potentialChildren.forEach((x) => {
            if (x.value === 'ALL') {
                return;
            }
            if (x[parent.type].filter((y) => y === parent.value).length > 0) {
                if (x.checked && !selecting) {
                    x.checked = false;
                    if (this.allOfTypeSelected(childType)) {
                        this.handleRemoveItemIfAllSelected(x);
                    }
                    else {
                        this.removeValue(x);
                    }
                }
                x.checked = selecting;
            }
        });
    }
    updateParentValue(child, action) {
        const allParentType = this.getAllOfType(child.isChildOf);
        if (allParentType[0].checked && action !== 'select') {
            this.handleRemoveItemIfAllSelected(allParentType[0]);
        }
    }
    addIndividualChildren(children) {
        let parentAlreadySelected = false;
        children.forEach((x) => {
            if (x.isChildOf) {
                // only add children if their parents are not already selected
                x[x.isChildOf].forEach((parent) => {
                    if (this.value[x.isChildOf].filter((p) => p === parent).length > 0) {
                        parentAlreadySelected = true;
                    }
                });
            }
            if (this.value[x.type].filter((item) => item === x.value).length === 0 && !parentAlreadySelected) {
                this.add(x);
            }
        });
    }
    setInitialValue(model) {
        this.items = [];
        this.value = model || {};
        if (!this.types) {
            return;
        }
        this.types.forEach((typeObj) => {
            const type = typeObj.value;
            if (this.value[type]) {
                let indeterminateIsSet = false;
                const options = this.updateAllItemState(type);
                const optionsByType = options.allOfType;
                const allSelected = options.allOfTypeSelected;
                this.value[type].forEach((item) => {
                    if (!allSelected && !indeterminateIsSet) {
                        indeterminateIsSet = true;
                        this.setIndeterminateState(optionsByType, true);
                    }
                    const value = optionsByType.filter((x) => x.value === item)[0];
                    value.checked = true;
                    if (!allSelected) {
                        this.updateDisplayItems(value, 'add');
                    }
                    if (this.strictRelationship && value.isParentOf) {
                        this.updateChildrenValue(value, 'select');
                    }
                });
                if (typeObj.isChildOf) {
                    this.modifyAffectedParentsOrChildren(true, { value: type, isChildOf: true });
                }
            }
            else {
                this.value[type] = [];
            }
        });
    }
    allItemsSelected(optionsByType, type) {
        return this.value[type].length === optionsByType.length - 1;
    }
    // Set touched on blur
    onTouched(e) {
        this.element.nativeElement.classList.remove('selected');
        this.onModelTouched();
        this.blur.emit(e);
    }
    writeValue(model) {
        this.model = model;
        this.setInitialValue(model);
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
}
NovoMultiPickerElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoMultiPickerElement, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component });
NovoMultiPickerElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoMultiPickerElement, selector: "multi-picker", inputs: { source: "source", placeholder: "placeholder", types: "types", value: "value" }, outputs: { changed: "changed", focus: "focus", blur: "blur" }, host: { properties: { "class.with-value": "items.length > 0" } }, providers: [CHIPS_VALUE_ACCESSOR], ngImport: i0, template: `
    <novo-chip
      *ngFor="let item of _items | async | slice: 0:chipsCount"
      [type]="item.type"
      [class.selected]="item == selected"
      (removed)="removeFromDisplay($event, item)"
      (selectionChange)="select($event, item)"
    >
      {{ item.label }}
    </novo-chip>
    <div *ngIf="items.length > chipsCount">
      <ul class="summary">
        <li *ngFor="let type of notShown">+ {{ type.count }} {{ labels.more }} {{ type.type }}</li>
      </ul>
    </div>
    <div class="chip-input-container">
      <novo-picker
        clearValueOnSelect="true"
        [config]="source"
        [placeholder]="placeholder"
        (select)="clickOption($event)"
        (keydown)="onKeyDown($event)"
        (focus)="onFocus($event)"
        (blur)="onTouched($event)"
        [overrideElement]="element"
      >
      </novo-picker>
    </div>
    <i class="bhi-search" [class.has-value]="items.length"></i>
    <label class="clear-all" *ngIf="items.length" (click)="clearValue()">{{ labels.clearAll }} <i class="bhi-times"></i></label>
  `, isInline: true, components: [{ type: i2.NovoChipElement, selector: "novo-chip, [novo-chip]", inputs: ["color", "tabIndex", "size", "type", "selected", "value", "selectable", "disabled", "removable"], outputs: ["selectionChange", "destroyed", "removed"] }, { type: i3.NovoPickerElement, selector: "novo-picker", inputs: ["config", "placeholder", "clearValueOnSelect", "closeOnSelect", "selected", "appendToBody", "parentScrollSelector", "parentScrollAction", "containerClass", "side", "autoSelectFirstOption", "overrideElement", "maxlength", "disablePickerInput"], outputs: ["changed", "select", "focus", "blur", "typing"] }], directives: [{ type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "slice": i4.SlicePipe, "async": i4.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoMultiPickerElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'multi-picker',
                    providers: [CHIPS_VALUE_ACCESSOR],
                    template: `
    <novo-chip
      *ngFor="let item of _items | async | slice: 0:chipsCount"
      [type]="item.type"
      [class.selected]="item == selected"
      (removed)="removeFromDisplay($event, item)"
      (selectionChange)="select($event, item)"
    >
      {{ item.label }}
    </novo-chip>
    <div *ngIf="items.length > chipsCount">
      <ul class="summary">
        <li *ngFor="let type of notShown">+ {{ type.count }} {{ labels.more }} {{ type.type }}</li>
      </ul>
    </div>
    <div class="chip-input-container">
      <novo-picker
        clearValueOnSelect="true"
        [config]="source"
        [placeholder]="placeholder"
        (select)="clickOption($event)"
        (keydown)="onKeyDown($event)"
        (focus)="onFocus($event)"
        (blur)="onTouched($event)"
        [overrideElement]="element"
      >
      </novo-picker>
    </div>
    <i class="bhi-search" [class.has-value]="items.length"></i>
    <label class="clear-all" *ngIf="items.length" (click)="clearValue()">{{ labels.clearAll }} <i class="bhi-times"></i></label>
  `,
                    host: {
                        '[class.with-value]': 'items.length > 0',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NovoLabelService }]; }, propDecorators: { source: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], types: [{
                type: Input
            }], changed: [{
                type: Output
            }], focus: [{
                type: Output
            }], blur: [{
                type: Output
            }], value: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXVsdGlQaWNrZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9tdWx0aS1waWNrZXIvTXVsdGlQaWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxTQUFTO0FBQ1QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNyQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUVyRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7OztBQUU5QyxzREFBc0Q7QUFDdEQsTUFBTSxvQkFBb0IsR0FBRztJQUMzQixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsc0JBQXNCLENBQUM7SUFDckQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBOENGLE1BQU0sT0FBTyxzQkFBc0I7SUErQ2pDLFlBQW1CLE9BQW1CLEVBQVMsTUFBd0I7UUFBcEQsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFTLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBM0N2RSxnQkFBVyxHQUFRLEVBQUUsQ0FBQztRQUl0QixZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFaEQsVUFBSyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTlDLFNBQUksR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQWtCN0MsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUNuQixXQUFNLEdBQUcsSUFBSSxhQUFhLENBQVMsQ0FBQyxDQUFDLENBQUM7UUFHdEMsYUFBUSxHQUFRLElBQUksQ0FBQztRQUNyQixXQUFNLEdBQVEsRUFBRSxDQUFDO1FBSWpCLHFCQUFxQjtRQUNyQixXQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ1osYUFBUSxHQUFRLEVBQUUsQ0FBQztRQUduQixrQkFBYSxHQUFhLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUNuQyxtQkFBYyxHQUFhLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUdsQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBbkNELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFDSSxLQUFLLENBQUMsYUFBYTtRQUNyQixJQUFJLGFBQWEsRUFBRTtZQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM1RTthQUFNO1lBQ0wsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUN4RDtRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQXVCRCxRQUFRO1FBQ04sSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsSUFBSSxLQUFLLENBQUM7UUFDNUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLElBQUksS0FBSyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsVUFBVTtRQUNSLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsaUJBQWlCLENBQUMsS0FBSyxFQUFFLElBQUk7UUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLCtCQUErQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUM5QixNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3hELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3RDLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxPQUFPO1FBQ3hCLE1BQU0sZ0JBQWdCLEdBQVE7WUFDNUIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO1lBQ2xCLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxJQUFJO1NBQ3JDLENBQUM7UUFDRixnQkFBZ0IsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNoRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3hCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN0RCxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDL0M7UUFDRCxnQkFBZ0IsQ0FBQyxZQUFZLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzlELE9BQU8sZ0JBQWdCLENBQUM7SUFDMUIsQ0FBQztJQUVELFlBQVksQ0FBQyxPQUFPLEVBQUUsSUFBSTtRQUN4QixNQUFNLEdBQUcsR0FBRztZQUNWLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUk7WUFDL0QsS0FBSyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUM7WUFDNUcsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO1lBQ2xCLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLFVBQVUsRUFBRSxPQUFPLENBQUMsVUFBVTtZQUM5QixTQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVM7U0FDN0IsQ0FBQztRQUNGLElBQUksR0FBRyxDQUFDLFNBQVMsRUFBRTtZQUNqQixHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDbEQ7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxPQUFPO1FBQzNCLE1BQU0sU0FBUyxHQUFHO1lBQ2hCLEtBQUssRUFBRSxLQUFLO1lBQ1osS0FBSyxFQUFFLE9BQU8sT0FBTyxDQUFDLElBQUksRUFBRTtZQUM1QixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7WUFDbEIsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVFLFVBQVUsRUFBRSxPQUFPLENBQUMsVUFBVTtZQUM5QixTQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVM7U0FDN0IsQ0FBQztRQUNGLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTtZQUNyQixNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRTtnQkFDckQsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUMvQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDUCxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLFVBQVUsQ0FBQztTQUMzQztRQUNELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDdkIsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSTtRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDdkIsQ0FBQztJQUVELE9BQU8sQ0FBQyxDQUFDO1FBQ1AsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQUs7UUFDZixJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsS0FBSyxZQUFZLEtBQUssQ0FBQyxFQUFFO1lBQ3RDLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxLQUFLLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQzFCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDakI7WUFDRCxJQUFJLENBQUMsK0JBQStCLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMzRCwwQkFBMEI7WUFDMUIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDOUUsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ2Y7U0FDRjtJQUNILENBQUM7SUFFRCxHQUFHLENBQUMsS0FBSztRQUNQLElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxLQUFLLEVBQUU7WUFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQzVDO2FBQU07WUFDTCxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUMzQjtRQUNELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELGtCQUFrQixDQUFDLElBQUk7UUFDckIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDakUsSUFBSSxpQkFBaUIsRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNqQztRQUNELE9BQU8sRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQscUJBQXFCLENBQUMsU0FBUyxFQUFFLE1BQU07UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDekIsT0FBTztTQUNSO1FBQ0QsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLE9BQU8sQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsTUFBTTtRQUM3QixNQUFNLE1BQU0sR0FBRyxNQUFNLEtBQUssS0FBSyxDQUFDO1FBQ2hDLElBQUksTUFBTSxFQUFFO1lBQ1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdkI7YUFBTTtZQUNMLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ2hEO1NBQ0Y7UUFDRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsaUJBQWlCLENBQUMsS0FBSztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM5QyxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQzFCLElBQUksS0FBSyxDQUFDO2dCQUNWLE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNyRSxJQUFJLGNBQWMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssS0FBSyxFQUFFO29CQUNwRSxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztpQkFDbEQ7cUJBQU07b0JBQ0wsS0FBSyxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUM7aUJBQy9CO2dCQUNELE1BQU0sV0FBVyxHQUFHLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDNUUsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO29CQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO2lCQUNsRDtZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJO1FBQ2hCLElBQUksZ0JBQWdCLENBQUM7UUFDckIsSUFBSSxLQUFLLEVBQUU7WUFDVCxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7U0FDekI7UUFDRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxZQUFZLENBQUMsS0FBSyxLQUFLLEtBQUssRUFBRTtZQUNoQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7WUFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQ3JEO2FBQU0sSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3BELElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNsRDtRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFJLEVBQUUsZ0JBQXNCO1FBQ3JDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLEVBQUU7WUFDeEIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztTQUMvQztRQUNELElBQUksZ0JBQWdCLEVBQUU7WUFDcEIsSUFBSSxDQUFDLCtCQUErQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNuRDtJQUNILENBQUM7SUFFRCxXQUFXLENBQUMsSUFBSTtRQUNkLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1RSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxhQUFhLENBQUM7UUFDdEMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQUs7UUFDYixJQUFJLEtBQUssQ0FBQyxHQUFHLGdDQUFrQixFQUFFO1lBQy9CLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO2dCQUN4RSxJQUFJLEtBQUssRUFBRTtvQkFDVCxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7b0JBQ3hCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztpQkFDeEI7Z0JBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ2xDO3FCQUFNO29CQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDdkQ7YUFDRjtTQUNGO0lBQ0gsQ0FBQztJQUVELGlCQUFpQixDQUFDLElBQUk7UUFDcEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFFRCxlQUFlLENBQUMsSUFBSSxFQUFFLE1BQU07UUFDMUIsTUFBTSxTQUFTLEdBQUcsTUFBTSxLQUFLLFFBQVEsQ0FBQztRQUN0QyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztZQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksU0FBUyxFQUFFO1lBQ2IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDakM7YUFBTTtZQUNMLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ3ZCO1FBQ0QsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3hCLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDdkQ7UUFDRCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsa0JBQWtCO1FBQ2hCLE1BQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQztJQUM3QixDQUFDO0lBRUQsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3pCLE9BQU87U0FDUjtRQUNELFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQzVCLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNqQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7UUFDSCxxQkFBcUI7UUFDckIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUM7UUFDMUIsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7UUFDMUIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsNkJBQTZCLENBQUMsSUFBSTtRQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN6QixPQUFPO1NBQ1I7UUFDRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUMsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekIsT0FBTyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDN0IsTUFBTSxhQUFhLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsYUFBYSxDQUFDLENBQUM7UUFDL0MsTUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3JDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxLQUFLO1FBQ3RCLDZFQUE2RTtRQUM3RSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN0RCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDcEI7SUFDSCxDQUFDO0lBRUQsWUFBWSxDQUFDLElBQUk7UUFDZixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQztJQUN0RSxDQUFDO0lBRUQsc0JBQXNCLENBQUMsSUFBSSxFQUFFLE1BQU07UUFDakMsSUFBSSxJQUFJLENBQUMsa0JBQWtCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUM5QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3hDO2FBQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDakQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztTQUN0QztJQUNILENBQUM7SUFFRCwrQkFBK0IsQ0FBQyxTQUFTLEVBQUUsV0FBVztRQUNwRCxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUU7WUFDckQsT0FBTztTQUNSO1FBQ0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0QsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNoQyxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3BELE1BQU0sU0FBUyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7UUFDOUMsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqRCxNQUFNLGtCQUFrQixHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFbEUsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQzVCLElBQUksR0FBRyxDQUFDLEtBQUssS0FBSyxLQUFLLEVBQUU7Z0JBQ3ZCLE9BQU87YUFDUjtZQUNELE1BQU0sd0JBQXdCLEdBQUcsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQy9ELE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ2pFLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxTQUFTLEVBQUU7Z0JBQ2IsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO29CQUNmLE9BQU87aUJBQ1I7Z0JBQ0QsR0FBRyxDQUFDLGFBQWEsR0FBRyx3QkFBd0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2FBQ3pEO2lCQUFNO2dCQUNMLE1BQU0sbUJBQW1CLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO29CQUNuRCxPQUFPLENBQUMsQ0FBQyxLQUFLLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDdEYsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSx3QkFBd0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUN2QyxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7d0JBQ2YsSUFBSSxJQUFJLENBQUMsa0JBQWtCLElBQUksbUJBQW1CLENBQUMsTUFBTSxLQUFLLHdCQUF3QixDQUFDLE1BQU0sRUFBRTs0QkFDN0YsR0FBRyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7NEJBQ3pCLEdBQUcsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDOzRCQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUN0QixJQUFJLENBQUMscUJBQXFCLENBQUMsd0JBQXdCLENBQUMsQ0FBQzt5QkFDdEQ7cUJBQ0Y7eUJBQU07d0JBQ0wsR0FBRyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7cUJBQzFCO29CQUNELElBQUksSUFBSSxDQUFDLGtCQUFrQixJQUFJLFdBQVcsQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFFO3dCQUM5RCxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7NEJBQ2YsR0FBRyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7NEJBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ3RCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO3lCQUN0RDtxQkFDRjtpQkFDRjtxQkFBTTtvQkFDTCxHQUFHLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztvQkFDMUIsSUFBSSxtQkFBbUIsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO3dCQUNwQywrREFBK0Q7d0JBQy9ELE9BQU87cUJBQ1I7eUJBQU0sSUFBSSxJQUFJLENBQUMsa0JBQWtCLElBQUksV0FBVyxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUU7d0JBQ3JFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO3FCQUN4QjtpQkFDRjthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsSUFBSSxDQUFDLHlCQUF5QixDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztTQUNoRjtJQUNILENBQUM7SUFFRCwwQkFBMEIsQ0FBQyxPQUFPLEVBQUUsTUFBTTtRQUN4QyxJQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUU7WUFDdEIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztTQUM5QzthQUFNLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTtZQUM1QixJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQzVDO0lBQ0gsQ0FBQztJQUVELHNCQUFzQixDQUFDLElBQUksRUFBRSxNQUFNO1FBQ2pDLE1BQU0sU0FBUyxHQUFHLE1BQU0sS0FBSyxRQUFRLENBQUM7UUFDdEMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNsQyxNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkQsSUFBSSxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUMzRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLE9BQU87U0FDUjtRQUNELGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQzlCLElBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFO2dCQUNuQyxJQUFJLFNBQVMsRUFBRTtvQkFDYixDQUFDLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztpQkFDbEI7Z0JBQ0QsQ0FBQyxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7YUFDN0I7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsU0FBUyxFQUFFO29CQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDdEI7Z0JBQ0QsQ0FBQyxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7YUFDdkI7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsTUFBTTtRQUMvQixNQUFNLFNBQVMsR0FBRyxNQUFNLEtBQUssUUFBUSxDQUFDO1FBQ3RDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDbEMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZELGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQzdCLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFO2dCQUNkLENBQUMsQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO2FBQzdCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQseUJBQXlCLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxrQkFBa0I7UUFDdEUsTUFBTSxnQ0FBZ0MsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsQ0FBQztRQUM5SCxNQUFNLHFCQUFxQixHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGdDQUFnQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDL0csTUFBTSxvQkFBb0IsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQzlGLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxhQUFhLEVBQUUscUJBQXFCLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELG1CQUFtQixDQUFDLE1BQU0sRUFBRSxNQUFNO1FBQ2hDLE1BQU0sU0FBUyxHQUFHLE1BQU0sS0FBSyxRQUFRLENBQUM7UUFDdEMsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUNwQyxNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkQsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDOUIsSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFLLEtBQUssRUFBRTtnQkFDckIsT0FBTzthQUNSO1lBQ0QsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUMvRCxJQUFJLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxTQUFTLEVBQUU7b0JBQzNCLENBQUMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO29CQUNsQixJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsRUFBRTt3QkFDckMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUN2Qzt5QkFBTTt3QkFDTCxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUNyQjtpQkFDRjtnQkFDRCxDQUFDLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQzthQUN2QjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGlCQUFpQixDQUFDLEtBQUssRUFBRSxNQUFNO1FBQzdCLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pELElBQUksYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQ25ELElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0RDtJQUNILENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxRQUFRO1FBQzVCLElBQUkscUJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNyQixJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUU7Z0JBQ2YsOERBQThEO2dCQUM5RCxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO29CQUNoQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLE1BQU0sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7d0JBQ2xFLHFCQUFxQixHQUFHLElBQUksQ0FBQztxQkFDOUI7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7YUFDSjtZQUNELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtnQkFDaEcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNiO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsZUFBZSxDQUFDLEtBQUs7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2YsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUM3QixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQzNCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDcEIsSUFBSSxrQkFBa0IsR0FBRyxLQUFLLENBQUM7Z0JBQy9CLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDOUMsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQztnQkFDeEMsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO2dCQUM5QyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO29CQUNoQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsa0JBQWtCLEVBQUU7d0JBQ3ZDLGtCQUFrQixHQUFHLElBQUksQ0FBQzt3QkFDMUIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztxQkFDakQ7b0JBQ0QsTUFBTSxLQUFLLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDL0QsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxXQUFXLEVBQUU7d0JBQ2hCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7cUJBQ3ZDO29CQUNELElBQUksSUFBSSxDQUFDLGtCQUFrQixJQUFJLEtBQUssQ0FBQyxVQUFVLEVBQUU7d0JBQy9DLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7cUJBQzNDO2dCQUNILENBQUMsQ0FBQyxDQUFDO2dCQUNILElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTtvQkFDckIsSUFBSSxDQUFDLCtCQUErQixDQUFDLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7aUJBQzlFO2FBQ0Y7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDdkI7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsSUFBSTtRQUNsQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRCxzQkFBc0I7SUFDdEIsU0FBUyxDQUFDLENBQUM7UUFDVCxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQVU7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsRUFBWTtRQUMzQixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsaUJBQWlCLENBQUMsRUFBWTtRQUM1QixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztJQUMzQixDQUFDOztvSEEvakJVLHNCQUFzQjt3R0FBdEIsc0JBQXNCLGtRQXBDdEIsQ0FBQyxvQkFBb0IsQ0FBQywwQkFDdkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCVDs0RkFLVSxzQkFBc0I7a0JBdENsQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxjQUFjO29CQUN4QixTQUFTLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztvQkFDakMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4QlQ7b0JBQ0QsSUFBSSxFQUFFO3dCQUNKLG9CQUFvQixFQUFFLGtCQUFrQjtxQkFDekM7aUJBQ0Y7Z0lBR0MsTUFBTTtzQkFETCxLQUFLO2dCQUdOLFdBQVc7c0JBRFYsS0FBSztnQkFHTixLQUFLO3NCQURKLEtBQUs7Z0JBR04sT0FBTztzQkFETixNQUFNO2dCQUdQLEtBQUs7c0JBREosTUFBTTtnQkFHUCxJQUFJO3NCQURILE1BQU07Z0JBUUgsS0FBSztzQkFEUixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbi8vIFZlbmRvclxuaW1wb3J0IHsgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG5pbXBvcnQgeyBLZXkgfSBmcm9tICcuLi8uLi91dGlscyc7XG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vdXRpbHMvSGVscGVycyc7XG5cbi8vIFZhbHVlIGFjY2Vzc29yIGZvciB0aGUgY29tcG9uZW50IChzdXBwb3J0cyBuZ01vZGVsKVxuY29uc3QgQ0hJUFNfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOb3ZvTXVsdGlQaWNrZXJFbGVtZW50KSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG5pbnRlcmZhY2UgSXRlbSB7XG4gIHR5cGU7XG4gIGxhYmVsO1xuICB2YWx1ZTtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXVsdGktcGlja2VyJyxcbiAgcHJvdmlkZXJzOiBbQ0hJUFNfVkFMVUVfQUNDRVNTT1JdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxub3ZvLWNoaXBcbiAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIF9pdGVtcyB8IGFzeW5jIHwgc2xpY2U6IDA6Y2hpcHNDb3VudFwiXG4gICAgICBbdHlwZV09XCJpdGVtLnR5cGVcIlxuICAgICAgW2NsYXNzLnNlbGVjdGVkXT1cIml0ZW0gPT0gc2VsZWN0ZWRcIlxuICAgICAgKHJlbW92ZWQpPVwicmVtb3ZlRnJvbURpc3BsYXkoJGV2ZW50LCBpdGVtKVwiXG4gICAgICAoc2VsZWN0aW9uQ2hhbmdlKT1cInNlbGVjdCgkZXZlbnQsIGl0ZW0pXCJcbiAgICA+XG4gICAgICB7eyBpdGVtLmxhYmVsIH19XG4gICAgPC9ub3ZvLWNoaXA+XG4gICAgPGRpdiAqbmdJZj1cIml0ZW1zLmxlbmd0aCA+IGNoaXBzQ291bnRcIj5cbiAgICAgIDx1bCBjbGFzcz1cInN1bW1hcnlcIj5cbiAgICAgICAgPGxpICpuZ0Zvcj1cImxldCB0eXBlIG9mIG5vdFNob3duXCI+KyB7eyB0eXBlLmNvdW50IH19IHt7IGxhYmVscy5tb3JlIH19IHt7IHR5cGUudHlwZSB9fTwvbGk+XG4gICAgICA8L3VsPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJjaGlwLWlucHV0LWNvbnRhaW5lclwiPlxuICAgICAgPG5vdm8tcGlja2VyXG4gICAgICAgIGNsZWFyVmFsdWVPblNlbGVjdD1cInRydWVcIlxuICAgICAgICBbY29uZmlnXT1cInNvdXJjZVwiXG4gICAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gICAgICAgIChzZWxlY3QpPVwiY2xpY2tPcHRpb24oJGV2ZW50KVwiXG4gICAgICAgIChrZXlkb3duKT1cIm9uS2V5RG93bigkZXZlbnQpXCJcbiAgICAgICAgKGZvY3VzKT1cIm9uRm9jdXMoJGV2ZW50KVwiXG4gICAgICAgIChibHVyKT1cIm9uVG91Y2hlZCgkZXZlbnQpXCJcbiAgICAgICAgW292ZXJyaWRlRWxlbWVudF09XCJlbGVtZW50XCJcbiAgICAgID5cbiAgICAgIDwvbm92by1waWNrZXI+XG4gICAgPC9kaXY+XG4gICAgPGkgY2xhc3M9XCJiaGktc2VhcmNoXCIgW2NsYXNzLmhhcy12YWx1ZV09XCJpdGVtcy5sZW5ndGhcIj48L2k+XG4gICAgPGxhYmVsIGNsYXNzPVwiY2xlYXItYWxsXCIgKm5nSWY9XCJpdGVtcy5sZW5ndGhcIiAoY2xpY2spPVwiY2xlYXJWYWx1ZSgpXCI+e3sgbGFiZWxzLmNsZWFyQWxsIH19IDxpIGNsYXNzPVwiYmhpLXRpbWVzXCI+PC9pPjwvbGFiZWw+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLndpdGgtdmFsdWVdJzogJ2l0ZW1zLmxlbmd0aCA+IDAnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvTXVsdGlQaWNrZXJFbGVtZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KClcbiAgc291cmNlOiB7IG9wdGlvbnM6IFtdOyByZXN1bHRzVGVtcGxhdGU7IHNlbGVjdEFsbE9wdGlvbjogYm9vbGVhbjsgY2hpcHNDb3VudDsgc3RyaWN0UmVsYXRpb25zaGlwIH07XG4gIEBJbnB1dCgpXG4gIHBsYWNlaG9sZGVyOiBhbnkgPSAnJztcbiAgQElucHV0KClcbiAgdHlwZXM6IHsgdmFsdWU7IHNpbmd1bGFyOyBwbHVyYWw7IGlzUGFyZW50T2Y7IGlzQ2hpbGRPZiB9W107XG4gIEBPdXRwdXQoKVxuICBjaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIGZvY3VzOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgdmFsdWUoc2VsZWN0ZWRJdGVtcykge1xuICAgIGlmIChzZWxlY3RlZEl0ZW1zKSB7XG4gICAgICB0aGlzLnR5cGVzLmZvckVhY2goKHgpID0+ICh0aGlzLl92YWx1ZVt4LnZhbHVlXSA9IHNlbGVjdGVkSXRlbXNbeC52YWx1ZV0pKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fdmFsdWUgPSB7fTtcbiAgICAgIHRoaXMudHlwZXMuZm9yRWFjaCgoeCkgPT4gKHRoaXMuX3ZhbHVlW3gudmFsdWVdID0gW10pKTtcbiAgICB9XG4gICAgdGhpcy5jaGFuZ2VkLmVtaXQoc2VsZWN0ZWRJdGVtcyk7XG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHNlbGVjdGVkSXRlbXMpO1xuICB9XG5cbiAgaXRlbXM6IEl0ZW1bXSA9IFtdO1xuICBfaXRlbXMgPSBuZXcgUmVwbGF5U3ViamVjdDxJdGVtW10+KDEpO1xuICBvcHRpb25zOiBhbnk7XG4gIF9vcHRpb25zOiBhbnk7XG4gIHNlbGVjdGVkOiBhbnkgPSBudWxsO1xuICBjb25maWc6IGFueSA9IHt9O1xuICBjaGlwc0NvdW50OiBudW1iZXI7XG4gIHNlbGVjdEFsbE9wdGlvbjogYm9vbGVhbjtcbiAgc3RyaWN0UmVsYXRpb25zaGlwOiBib29sZWFuO1xuICAvLyBwcml2YXRlIGRhdGEgbW9kZWxcbiAgX3ZhbHVlID0ge307XG4gIG5vdFNob3duOiBhbnkgPSB7fTtcbiAgLy8gUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzXG4gIG1vZGVsOiBhbnk7XG4gIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG4gIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmLCBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlKSB7XG4gICAgdGhpcy5jaGlwc0NvdW50ID0gNDtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc2VsZWN0QWxsT3B0aW9uID0gdGhpcy5zb3VyY2Uuc2VsZWN0QWxsT3B0aW9uIHx8IGZhbHNlO1xuICAgIHRoaXMuY2hpcHNDb3VudCA9IHRoaXMuc291cmNlLmNoaXBzQ291bnQgfHwgNDtcbiAgICB0aGlzLnN0cmljdFJlbGF0aW9uc2hpcCA9IHRoaXMuc291cmNlLnN0cmljdFJlbGF0aW9uc2hpcCB8fCBmYWxzZTtcbiAgICB0aGlzLnNldHVwT3B0aW9ucygpO1xuICB9XG5cbiAgY2xlYXJWYWx1ZSgpIHtcbiAgICB0aGlzLnR5cGVzLmZvckVhY2goKHR5cGUpID0+IHRoaXMubW9kaWZ5QWxsT2ZUeXBlKHR5cGUudmFsdWUsICd1bnNlbGVjdCcpKTtcbiAgICB0aGlzLml0ZW1zID0gW107XG4gICAgdGhpcy5faXRlbXMubmV4dCh0aGlzLml0ZW1zKTtcbiAgICB0aGlzLnNldEluaXRpYWxWYWx1ZShudWxsKTtcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XG4gIH1cblxuICByZW1vdmVGcm9tRGlzcGxheShldmVudCwgaXRlbSkge1xuICAgIHRoaXMucmVtb3ZlKHRydWUsIGl0ZW0pO1xuICAgIHRoaXMubW9kaWZ5QWZmZWN0ZWRQYXJlbnRzT3JDaGlsZHJlbihmYWxzZSwgaXRlbSk7XG4gIH1cblxuICBzZXR1cE9wdGlvbnMoKSB7XG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5zb3VyY2Uub3B0aW9ucyB8fCBbXTtcbiAgICB0aGlzLl9vcHRpb25zID0gW107XG4gICAgaWYgKHRoaXMub3B0aW9ucykge1xuICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWRPcHRpb24gPSB0aGlzLnNldHVwT3B0aW9uc0J5VHlwZShvcHRpb24pO1xuICAgICAgICB0aGlzLl9vcHRpb25zLnB1c2goZm9ybWF0dGVkT3B0aW9uKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLnNvdXJjZS5vcHRpb25zID0gdGhpcy5fb3B0aW9ucztcbiAgfVxuXG4gIHNldHVwT3B0aW9uc0J5VHlwZShzZWN0aW9uKSB7XG4gICAgY29uc3QgZm9ybWF0dGVkU2VjdGlvbjogYW55ID0ge1xuICAgICAgdHlwZTogc2VjdGlvbi50eXBlLFxuICAgICAgbGFiZWw6IHNlY3Rpb24ubGFiZWwgfHwgc2VjdGlvbi50eXBlLFxuICAgIH07XG4gICAgZm9ybWF0dGVkU2VjdGlvbi5kYXRhID0gc2VjdGlvbi5kYXRhLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0T3B0aW9uKHNlY3Rpb24sIGl0ZW0pO1xuICAgIH0pO1xuICAgIGlmICh0aGlzLnNlbGVjdEFsbE9wdGlvbikge1xuICAgICAgY29uc3Qgc2VsZWN0QWxsID0gdGhpcy5jcmVhdGVTZWxlY3RBbGxPcHRpb24oc2VjdGlvbik7XG4gICAgICBmb3JtYXR0ZWRTZWN0aW9uLmRhdGEuc3BsaWNlKDAsIDAsIHNlbGVjdEFsbCk7XG4gICAgfVxuICAgIGZvcm1hdHRlZFNlY3Rpb24ub3JpZ2luYWxEYXRhID0gZm9ybWF0dGVkU2VjdGlvbi5kYXRhLnNsaWNlKCk7XG4gICAgcmV0dXJuIGZvcm1hdHRlZFNlY3Rpb247XG4gIH1cblxuICBmb3JtYXRPcHRpb24oc2VjdGlvbiwgaXRlbSkge1xuICAgIGNvbnN0IG9iaiA9IHtcbiAgICAgIHZhbHVlOiBzZWN0aW9uLmZpZWxkID8gaXRlbVtzZWN0aW9uLmZpZWxkXSA6IGl0ZW0udmFsdWUgfHwgaXRlbSxcbiAgICAgIGxhYmVsOiBzZWN0aW9uLmZvcm1hdCA/IEhlbHBlcnMuaW50ZXJwb2xhdGUoc2VjdGlvbi5mb3JtYXQsIGl0ZW0pIDogaXRlbS5sYWJlbCB8fCBTdHJpbmcoaXRlbS52YWx1ZSB8fCBpdGVtKSxcbiAgICAgIHR5cGU6IHNlY3Rpb24udHlwZSxcbiAgICAgIGNoZWNrZWQ6IHVuZGVmaW5lZCxcbiAgICAgIGlzUGFyZW50T2Y6IHNlY3Rpb24uaXNQYXJlbnRPZixcbiAgICAgIGlzQ2hpbGRPZjogc2VjdGlvbi5pc0NoaWxkT2YsXG4gICAgfTtcbiAgICBpZiAob2JqLmlzQ2hpbGRPZikge1xuICAgICAgb2JqW3NlY3Rpb24uaXNDaGlsZE9mXSA9IGl0ZW1bc2VjdGlvbi5pc0NoaWxkT2ZdO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgY3JlYXRlU2VsZWN0QWxsT3B0aW9uKHNlY3Rpb24pIHtcbiAgICBjb25zdCBzZWxlY3RBbGwgPSB7XG4gICAgICB2YWx1ZTogJ0FMTCcsXG4gICAgICBsYWJlbDogYEFsbCAke3NlY3Rpb24udHlwZX1gLFxuICAgICAgdHlwZTogc2VjdGlvbi50eXBlLFxuICAgICAgY2hlY2tlZDogdGhpcy5tb2RlbCAmJiB0aGlzLm1vZGVsLmxlbmd0aCAmJiB0aGlzLm1vZGVsLmluZGV4T2YoJ0FMTCcpICE9PSAtMSxcbiAgICAgIGlzUGFyZW50T2Y6IHNlY3Rpb24uaXNQYXJlbnRPZixcbiAgICAgIGlzQ2hpbGRPZjogc2VjdGlvbi5pc0NoaWxkT2YsXG4gICAgfTtcbiAgICBpZiAoc2VjdGlvbi5pc0NoaWxkT2YpIHtcbiAgICAgIGNvbnN0IGFsbFBhcmVudHMgPSBzZWN0aW9uLmRhdGEucmVkdWNlKChhY2N1bSwgbmV4dCkgPT4ge1xuICAgICAgICByZXR1cm4gYWNjdW0uY29uY2F0KG5leHRbc2VjdGlvbi5pc0NoaWxkT2ZdKTtcbiAgICAgIH0sIFtdKTtcbiAgICAgIHNlbGVjdEFsbFtzZWN0aW9uLmlzQ2hpbGRPZl0gPSBhbGxQYXJlbnRzO1xuICAgIH1cbiAgICByZXR1cm4gc2VsZWN0QWxsO1xuICB9XG5cbiAgZGVzZWxlY3RBbGwoKSB7XG4gICAgdGhpcy5zZWxlY3RlZCA9IG51bGw7XG4gIH1cblxuICBzZWxlY3QoZXZlbnQsIGl0ZW0pIHtcbiAgICB0aGlzLmJsdXIuZW1pdChldmVudCk7XG4gICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuICAgIHRoaXMuc2VsZWN0ZWQgPSBpdGVtO1xuICB9XG5cbiAgb25Gb2N1cyhlKSB7XG4gICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICB0aGlzLmZvY3VzLmVtaXQoZSk7XG4gIH1cblxuICBjbGlja09wdGlvbihldmVudCkge1xuICAgIGlmIChldmVudCAmJiAhKGV2ZW50IGluc3RhbmNlb2YgRXZlbnQpKSB7XG4gICAgICBpZiAoZXZlbnQuY2hlY2tlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5yZW1vdmUobnVsbCwgZXZlbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hZGQoZXZlbnQpO1xuICAgICAgfVxuICAgICAgdGhpcy5tb2RpZnlBZmZlY3RlZFBhcmVudHNPckNoaWxkcmVuKGV2ZW50LmNoZWNrZWQsIGV2ZW50KTtcbiAgICAgIC8vIFNldCBmb2N1cyBvbiB0aGUgcGlja2VyXG4gICAgICBjb25zdCBpbnB1dCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ25vdm8tcGlja2VyID4gaW5wdXQnKTtcbiAgICAgIGlmIChpbnB1dCkge1xuICAgICAgICBpbnB1dC5mb2N1cygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFkZChldmVudCkge1xuICAgIGlmIChldmVudC52YWx1ZSA9PT0gJ0FMTCcpIHtcbiAgICAgIHRoaXMubW9kaWZ5QWxsT2ZUeXBlKGV2ZW50LnR5cGUsICdzZWxlY3QnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cGRhdGVEaXNwbGF5SXRlbXMoZXZlbnQsICdhZGQnKTtcbiAgICAgIHRoaXMudmFsdWVbZXZlbnQudHlwZV0ucHVzaChldmVudC52YWx1ZSk7XG4gICAgICB0aGlzLnVwZGF0ZUFsbEl0ZW1TdGF0ZShldmVudC50eXBlKTtcbiAgICAgIHRoaXMudHJpZ2dlclZhbHVlVXBkYXRlKCk7XG4gICAgfVxuICAgIHRoaXMudXBkYXRlUGFyZW50T3JDaGlsZHJlbihldmVudCwgJ3NlbGVjdCcpO1xuICAgIHRoaXMuc2VsZWN0KG51bGwsIGV2ZW50KTtcbiAgfVxuXG4gIHVwZGF0ZUFsbEl0ZW1TdGF0ZSh0eXBlKSB7XG4gICAgY29uc3QgYWxsT2ZUeXBlID0gdGhpcy5nZXRBbGxPZlR5cGUodHlwZSk7XG4gICAgY29uc3QgYWxsT2ZUeXBlU2VsZWN0ZWQgPSB0aGlzLmFsbEl0ZW1zU2VsZWN0ZWQoYWxsT2ZUeXBlLCB0eXBlKTtcbiAgICBpZiAoYWxsT2ZUeXBlU2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuc2VsZWN0QWxsKGFsbE9mVHlwZSwgdHlwZSk7XG4gICAgfVxuICAgIHJldHVybiB7IGFsbE9mVHlwZSwgYWxsT2ZUeXBlU2VsZWN0ZWQgfTtcbiAgfVxuXG4gIHNldEluZGV0ZXJtaW5hdGVTdGF0ZShhbGxPZlR5cGUsIHN0YXR1cykge1xuICAgIGlmICghdGhpcy5zZWxlY3RBbGxPcHRpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgYWxsSXRlbSA9IGFsbE9mVHlwZVswXTtcbiAgICBhbGxJdGVtLmluZGV0ZXJtaW5hdGUgPSBzdGF0dXM7XG4gIH1cblxuICB1cGRhdGVEaXNwbGF5SXRlbXMoaXRlbSwgYWN0aW9uKSB7XG4gICAgY29uc3QgYWRkaW5nID0gYWN0aW9uID09PSAnYWRkJztcbiAgICBpZiAoYWRkaW5nKSB7XG4gICAgICB0aGlzLml0ZW1zLnB1c2goaXRlbSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLml0ZW1zLmluZGV4T2YoaXRlbSkgPiAtMSkge1xuICAgICAgICB0aGlzLml0ZW1zLnNwbGljZSh0aGlzLml0ZW1zLmluZGV4T2YoaXRlbSksIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnVwZGF0ZURpc3BsYXlUZXh0KHRoaXMuaXRlbXMpO1xuICAgIHRoaXMuX2l0ZW1zLm5leHQodGhpcy5pdGVtcyk7XG4gIH1cblxuICB1cGRhdGVEaXNwbGF5VGV4dChpdGVtcykge1xuICAgIHRoaXMubm90U2hvd24gPSBbXTtcbiAgICBjb25zdCBub3RTaG93biA9IGl0ZW1zLnNsaWNlKHRoaXMuY2hpcHNDb3VudCk7XG4gICAgaWYgKG5vdFNob3duLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMudHlwZXMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgICBsZXQgY291bnQ7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkT2ZUeXBlID0gbm90U2hvd24uZmlsdGVyKCh4KSA9PiB4LnR5cGUgPT09IHR5cGUudmFsdWUpO1xuICAgICAgICBpZiAoc2VsZWN0ZWRPZlR5cGUubGVuZ3RoID09PSAxICYmIHNlbGVjdGVkT2ZUeXBlWzBdLnZhbHVlID09PSAnQUxMJykge1xuICAgICAgICAgIGNvdW50ID0gdGhpcy5nZXRBbGxPZlR5cGUodHlwZS52YWx1ZSkubGVuZ3RoIC0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb3VudCA9IHNlbGVjdGVkT2ZUeXBlLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkaXNwbGF5VHlwZSA9IGNvdW50ID09PSAxID8gdHlwZS5zaW5ndWxhciA6IHR5cGUucGx1cmFsIHx8IHR5cGUudmFsdWU7XG4gICAgICAgIGlmIChjb3VudCA+IDApIHtcbiAgICAgICAgICB0aGlzLm5vdFNob3duLnB1c2goeyB0eXBlOiBkaXNwbGF5VHlwZSwgY291bnQgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZShldmVudCwgaXRlbSkge1xuICAgIGxldCB0cmlnZ2VyZWRCeUV2ZW50O1xuICAgIGlmIChldmVudCkge1xuICAgICAgdHJpZ2dlcmVkQnlFdmVudCA9IHRydWU7XG4gICAgfVxuICAgIGNvbnN0IGl0ZW1Ub1JlbW92ZSA9IGl0ZW07XG4gICAgaWYgKGl0ZW1Ub1JlbW92ZS52YWx1ZSA9PT0gJ0FMTCcpIHtcbiAgICAgIHRyaWdnZXJlZEJ5RXZlbnQgPSBmYWxzZTtcbiAgICAgIHRoaXMubW9kaWZ5QWxsT2ZUeXBlKGl0ZW1Ub1JlbW92ZS50eXBlLCAndW5zZWxlY3QnKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYWxsT2ZUeXBlU2VsZWN0ZWQoaXRlbVRvUmVtb3ZlLnR5cGUpKSB7XG4gICAgICB0aGlzLmhhbmRsZVJlbW92ZUl0ZW1JZkFsbFNlbGVjdGVkKGl0ZW1Ub1JlbW92ZSk7XG4gICAgfVxuICAgIHRoaXMucmVtb3ZlSXRlbShpdGVtLCB0cmlnZ2VyZWRCeUV2ZW50KTtcbiAgfVxuXG4gIHJlbW92ZUl0ZW0oaXRlbSwgdHJpZ2dlcmVkQnlFdmVudD86IGFueSkge1xuICAgIGl0ZW0uY2hlY2tlZCA9IGZhbHNlO1xuICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgICB0aGlzLnJlbW92ZVZhbHVlKGl0ZW0pO1xuICAgIGlmIChpdGVtLnZhbHVlICE9PSAnQUxMJykge1xuICAgICAgdGhpcy51cGRhdGVQYXJlbnRPckNoaWxkcmVuKGl0ZW0sICd1bnNlbGVjdCcpO1xuICAgIH1cbiAgICBpZiAodHJpZ2dlcmVkQnlFdmVudCkge1xuICAgICAgdGhpcy5tb2RpZnlBZmZlY3RlZFBhcmVudHNPckNoaWxkcmVuKGZhbHNlLCBpdGVtKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVWYWx1ZShpdGVtKSB7XG4gICAgY29uc3QgdXBkYXRlZFZhbHVlcyA9IHRoaXMudmFsdWVbaXRlbS50eXBlXS5maWx0ZXIoKHgpID0+IHggIT09IGl0ZW0udmFsdWUpO1xuICAgIHRoaXMudmFsdWVbaXRlbS50eXBlXSA9IHVwZGF0ZWRWYWx1ZXM7XG4gICAgdGhpcy50cmlnZ2VyVmFsdWVVcGRhdGUoKTtcbiAgICB0aGlzLnVwZGF0ZURpc3BsYXlJdGVtcyhpdGVtLCAncmVtb3ZlJyk7XG4gIH1cblxuICBvbktleURvd24oZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQua2V5ID09PSBLZXkuQmFja3NwYWNlKSB7XG4gICAgICBpZiAoZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC52YWx1ZS5sZW5ndGggPT09IDAgJiYgdGhpcy5pdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZCkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlKG51bGwsIHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2VsZWN0KGV2ZW50LCB0aGlzLml0ZW1zW3RoaXMuaXRlbXMubGVuZ3RoIC0gMV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWxsT2ZUeXBlU2VsZWN0ZWQodHlwZSkge1xuICAgIHJldHVybiB0aGlzLml0ZW1zLmZpbHRlcigoeCkgPT4geC50eXBlID09PSB0eXBlICYmIHgudmFsdWUgPT09ICdBTEwnKS5sZW5ndGggPiAwO1xuICB9XG5cbiAgbW9kaWZ5QWxsT2ZUeXBlKHR5cGUsIGFjdGlvbikge1xuICAgIGNvbnN0IHNlbGVjdGluZyA9IGFjdGlvbiA9PT0gJ3NlbGVjdCc7XG4gICAgY29uc3QgYWxsT2ZUeXBlID0gdGhpcy5nZXRBbGxPZlR5cGUodHlwZSk7XG4gICAgYWxsT2ZUeXBlLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGl0ZW0uY2hlY2tlZCA9IHNlbGVjdGluZztcbiAgICAgIGl0ZW0uaW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xuICAgIH0pO1xuICAgIGlmIChzZWxlY3RpbmcpIHtcbiAgICAgIHRoaXMuc2VsZWN0QWxsKGFsbE9mVHlwZSwgdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXRlbXMgPSBbLi4udGhpcy5pdGVtcy5maWx0ZXIoKHgpID0+IHgudHlwZSAhPT0gdHlwZSldO1xuICAgICAgdGhpcy5faXRlbXMubmV4dCh0aGlzLml0ZW1zKTtcbiAgICAgIHRoaXMudmFsdWVbdHlwZV0gPSBbXTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2VsZWN0QWxsT3B0aW9uKSB7XG4gICAgICB0aGlzLnVwZGF0ZUFsbFBhcmVudHNPckNoaWxkcmVuKGFsbE9mVHlwZVswXSwgYWN0aW9uKTtcbiAgICB9XG4gICAgdGhpcy50cmlnZ2VyVmFsdWVVcGRhdGUoKTtcbiAgfVxuXG4gIHRyaWdnZXJWYWx1ZVVwZGF0ZSgpIHtcbiAgICBjb25zdCB1cGRhdGVkT2JqZWN0ID0ge307XG4gICAgdGhpcy50eXBlcy5mb3JFYWNoKCh4KSA9PiAodXBkYXRlZE9iamVjdFt4LnZhbHVlXSA9IHRoaXMudmFsdWVbeC52YWx1ZV0pKTtcbiAgICB0aGlzLnZhbHVlID0gdXBkYXRlZE9iamVjdDtcbiAgfVxuXG4gIHNlbGVjdEFsbChhbGxPZlR5cGUsIHR5cGUpIHtcbiAgICBpZiAoIXRoaXMuc2VsZWN0QWxsT3B0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGFsbE9mVHlwZVswXS5jaGVja2VkID0gdHJ1ZTtcbiAgICBjb25zdCB2YWx1ZXMgPSBhbGxPZlR5cGUubWFwKChpKSA9PiB7XG4gICAgICByZXR1cm4gaS52YWx1ZTtcbiAgICB9KTtcbiAgICAvLyByZW1vdmUgJ0FMTCcgdmFsdWVcbiAgICB2YWx1ZXMuc3BsaWNlKDAsIDEpO1xuICAgIHRoaXMudmFsdWVbdHlwZV0gPSB2YWx1ZXM7XG4gICAgY29uc3QgdXBkYXRlZEl0ZW1zID0gdGhpcy5pdGVtcy5maWx0ZXIoKHgpID0+IHgudHlwZSAhPT0gdHlwZSk7XG4gICAgdGhpcy5pdGVtcyA9IHVwZGF0ZWRJdGVtcztcbiAgICB0aGlzLnVwZGF0ZURpc3BsYXlJdGVtcyhhbGxPZlR5cGVbMF0sICdhZGQnKTtcbiAgfVxuXG4gIGhhbmRsZVJlbW92ZUl0ZW1JZkFsbFNlbGVjdGVkKGl0ZW0pIHtcbiAgICBpZiAoIXRoaXMuc2VsZWN0QWxsT3B0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHR5cGUgPSBpdGVtLnR5cGU7XG4gICAgY29uc3QgYWxsT2ZUeXBlID0gdGhpcy5nZXRBbGxPZlR5cGUodHlwZSk7XG4gICAgY29uc3QgYWxsSXRlbSA9IGFsbE9mVHlwZVswXTtcbiAgICB0aGlzLnJlbW92ZUl0ZW0oYWxsSXRlbSk7XG4gICAgYWxsSXRlbS5pbmRldGVybWluYXRlID0gdHJ1ZTtcbiAgICBjb25zdCBzZWxlY3RlZEl0ZW1zID0gYWxsT2ZUeXBlLmZpbHRlcigoaSkgPT4gaS5jaGVja2VkID09PSB0cnVlKTtcbiAgICB0aGlzLml0ZW1zID0gWy4uLnRoaXMuaXRlbXMsIC4uLnNlbGVjdGVkSXRlbXNdO1xuICAgIGNvbnN0IHZhbHVlcyA9IHNlbGVjdGVkSXRlbXMubWFwKChpKSA9PiB7XG4gICAgICByZXR1cm4gaS52YWx1ZTtcbiAgICB9KTtcbiAgICB0aGlzLnZhbHVlW3R5cGVdID0gWy4uLnZhbHVlc107XG4gIH1cblxuICBoYW5kbGVPdXRzaWRlQ2xpY2soZXZlbnQpIHtcbiAgICAvLyBJZiB0aGUgZWxlbWVudHMgZG9lc24ndCBjb250YWluIHRoZSB0YXJnZXQgZWxlbWVudCwgaXQgaXMgYW4gb3V0c2lkZSBjbGlja1xuICAgIGlmICghdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgdGhpcy5ibHVyLmVtaXQoZXZlbnQpO1xuICAgICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuICAgIH1cbiAgfVxuXG4gIGdldEFsbE9mVHlwZSh0eXBlKSB7XG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbnMuZmlsdGVyKCh4KSA9PiB4LnR5cGUgPT09IHR5cGUpWzBdLm9yaWdpbmFsRGF0YTtcbiAgfVxuXG4gIHVwZGF0ZVBhcmVudE9yQ2hpbGRyZW4oaXRlbSwgYWN0aW9uKSB7XG4gICAgaWYgKHRoaXMuc3RyaWN0UmVsYXRpb25zaGlwICYmIGl0ZW0uaXNQYXJlbnRPZikge1xuICAgICAgdGhpcy51cGRhdGVDaGlsZHJlblZhbHVlKGl0ZW0sIGFjdGlvbik7XG4gICAgfSBlbHNlIGlmIChpdGVtLmlzQ2hpbGRPZiAmJiB0aGlzLnNlbGVjdEFsbE9wdGlvbikge1xuICAgICAgdGhpcy51cGRhdGVQYXJlbnRWYWx1ZShpdGVtLCBhY3Rpb24pO1xuICAgIH1cbiAgfVxuXG4gIG1vZGlmeUFmZmVjdGVkUGFyZW50c09yQ2hpbGRyZW4oc2VsZWN0aW5nLCBpdGVtQ2hhbmdlZCkge1xuICAgIGlmICghaXRlbUNoYW5nZWQuaXNDaGlsZE9mICYmICFpdGVtQ2hhbmdlZC5pc1BhcmVudE9mKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMudHlwZXMuZmlsdGVyKCh4KSA9PiAhIXguaXNQYXJlbnRPZilbMF07XG4gICAgY29uc3QgcGFyZW50VHlwZSA9IHBhcmVudC52YWx1ZTtcbiAgICBjb25zdCBhbGxQYXJlbnRUeXBlID0gdGhpcy5nZXRBbGxPZlR5cGUocGFyZW50VHlwZSk7XG4gICAgY29uc3QgY2hpbGRUeXBlID0gYWxsUGFyZW50VHlwZVswXS5pc1BhcmVudE9mO1xuICAgIGNvbnN0IGFsbENoaWxkcmVuID0gdGhpcy5nZXRBbGxPZlR5cGUoY2hpbGRUeXBlKTtcbiAgICBjb25zdCBhbGxDaGVja2VkQ2hpbGRyZW4gPSBhbGxDaGlsZHJlbi5maWx0ZXIoKHgpID0+ICEheC5jaGVja2VkKTtcblxuICAgIGFsbFBhcmVudFR5cGUuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICBpZiAob2JqLnZhbHVlID09PSAnQUxMJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBzZWxlY3RlZENoaWxkcmVuT2ZQYXJlbnQgPSBhbGxDaGVja2VkQ2hpbGRyZW4uZmlsdGVyKCh4KSA9PiB7XG4gICAgICAgIHJldHVybiB4W3BhcmVudFR5cGVdLmZpbHRlcigoeSkgPT4geSA9PT0gb2JqLnZhbHVlKS5sZW5ndGggPiAwO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChzZWxlY3RpbmcpIHtcbiAgICAgICAgaWYgKG9iai5jaGVja2VkKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIG9iai5pbmRldGVybWluYXRlID0gc2VsZWN0ZWRDaGlsZHJlbk9mUGFyZW50Lmxlbmd0aCA+IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBhbGxDaGlsZHJlbk9mUGFyZW50ID0gYWxsQ2hpbGRyZW4uZmlsdGVyKCh4KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHgudmFsdWUgIT09ICdBTEwnICYmIHhbcGFyZW50VHlwZV0uZmlsdGVyKCh5KSA9PiB5ID09PSBvYmoudmFsdWUpLmxlbmd0aCA+IDA7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoc2VsZWN0ZWRDaGlsZHJlbk9mUGFyZW50Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBpZiAob2JqLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0cmljdFJlbGF0aW9uc2hpcCAmJiBhbGxDaGlsZHJlbk9mUGFyZW50Lmxlbmd0aCAhPT0gc2VsZWN0ZWRDaGlsZHJlbk9mUGFyZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgICBvYmouaW5kZXRlcm1pbmF0ZSA9IHRydWU7XG4gICAgICAgICAgICAgIG9iai5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgIHRoaXMucmVtb3ZlVmFsdWUob2JqKTtcbiAgICAgICAgICAgICAgdGhpcy5hZGRJbmRpdmlkdWFsQ2hpbGRyZW4oc2VsZWN0ZWRDaGlsZHJlbk9mUGFyZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2JqLmluZGV0ZXJtaW5hdGUgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5zdHJpY3RSZWxhdGlvbnNoaXAgJiYgaXRlbUNoYW5nZWQudHlwZSAhPT0gcGFyZW50VHlwZSkge1xuICAgICAgICAgICAgaWYgKG9iai5jaGVja2VkKSB7XG4gICAgICAgICAgICAgIG9iai5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgIHRoaXMucmVtb3ZlVmFsdWUob2JqKTtcbiAgICAgICAgICAgICAgdGhpcy5hZGRJbmRpdmlkdWFsQ2hpbGRyZW4oc2VsZWN0ZWRDaGlsZHJlbk9mUGFyZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2JqLmluZGV0ZXJtaW5hdGUgPSBmYWxzZTtcbiAgICAgICAgICBpZiAoYWxsQ2hpbGRyZW5PZlBhcmVudC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIGlmIGl0IGhhcyBubyBjaGlsZHJlbiBhbmQgaXMgY2hlY2tlZCwgaXQgc2hvdWxkIHN0YXkgY2hlY2tlZFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdHJpY3RSZWxhdGlvbnNoaXAgJiYgaXRlbUNoYW5nZWQudHlwZSAhPT0gcGFyZW50VHlwZSkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmUobnVsbCwgb2JqKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAodGhpcy5zZWxlY3RBbGxPcHRpb24pIHtcbiAgICAgIHRoaXMudXBkYXRlSW5kZXRlcm1pbmF0ZVN0YXRlcyhhbGxQYXJlbnRUeXBlLCBhbGxDaGlsZHJlbiwgYWxsQ2hlY2tlZENoaWxkcmVuKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVBbGxQYXJlbnRzT3JDaGlsZHJlbihhbGxJdGVtLCBhY3Rpb24pIHtcbiAgICBpZiAoYWxsSXRlbS5pc1BhcmVudE9mKSB7XG4gICAgICB0aGlzLnVwZGF0ZUFsbENoaWxkcmVuVmFsdWUoYWxsSXRlbSwgYWN0aW9uKTtcbiAgICB9IGVsc2UgaWYgKGFsbEl0ZW0uaXNDaGlsZE9mKSB7XG4gICAgICB0aGlzLnVwZGF0ZUFsbFBhcmVudFZhbHVlKGFsbEl0ZW0sIGFjdGlvbik7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlQWxsQ2hpbGRyZW5WYWx1ZShpdGVtLCBhY3Rpb24pIHtcbiAgICBjb25zdCBzZWxlY3RpbmcgPSBhY3Rpb24gPT09ICdzZWxlY3QnO1xuICAgIGNvbnN0IGNoaWxkVHlwZSA9IGl0ZW0uaXNQYXJlbnRPZjtcbiAgICBjb25zdCBwb3RlbnRpYWxDaGlsZHJlbiA9IHRoaXMuZ2V0QWxsT2ZUeXBlKGNoaWxkVHlwZSk7XG4gICAgaWYgKHRoaXMuc2VsZWN0QWxsT3B0aW9uICYmIHRoaXMuYWxsT2ZUeXBlU2VsZWN0ZWQoY2hpbGRUeXBlKSAmJiAhc2VsZWN0aW5nKSB7XG4gICAgICB0aGlzLnJlbW92ZShudWxsLCBwb3RlbnRpYWxDaGlsZHJlblswXSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHBvdGVudGlhbENoaWxkcmVuLmZvckVhY2goKHgpID0+IHtcbiAgICAgIGlmICh4LnZhbHVlID09PSAnQUxMJyAmJiAheC5jaGVja2VkKSB7XG4gICAgICAgIGlmIChzZWxlY3RpbmcpIHtcbiAgICAgICAgICB4LmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHguaW5kZXRlcm1pbmF0ZSA9IHNlbGVjdGluZztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh4LmNoZWNrZWQgJiYgIXNlbGVjdGluZykge1xuICAgICAgICAgIHRoaXMucmVtb3ZlKG51bGwsIHgpO1xuICAgICAgICB9XG4gICAgICAgIHguY2hlY2tlZCA9IHNlbGVjdGluZztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZUFsbFBhcmVudFZhbHVlKGl0ZW0sIGFjdGlvbikge1xuICAgIGNvbnN0IHNlbGVjdGluZyA9IGFjdGlvbiA9PT0gJ3NlbGVjdCc7XG4gICAgY29uc3QgcGFyZW50VHlwZSA9IGl0ZW0uaXNDaGlsZE9mO1xuICAgIGNvbnN0IHBvdGVudGlhbFBhcmVudHMgPSB0aGlzLmdldEFsbE9mVHlwZShwYXJlbnRUeXBlKTtcbiAgICBwb3RlbnRpYWxQYXJlbnRzLmZvckVhY2goKHgpID0+IHtcbiAgICAgIGlmICgheC5jaGVja2VkKSB7XG4gICAgICAgIHguaW5kZXRlcm1pbmF0ZSA9IHNlbGVjdGluZztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZUluZGV0ZXJtaW5hdGVTdGF0ZXMoYWxsUGFyZW50VHlwZSwgYWxsQ2hpbGRyZW4sIGFsbENoZWNrZWRDaGlsZHJlbikge1xuICAgIGNvbnN0IGFsbENoZWNrZWRPckluZGV0ZXJtaW5hdGVQYXJlbnRzID0gYWxsUGFyZW50VHlwZS5maWx0ZXIoKHgpID0+ICghIXguY2hlY2tlZCB8fCAhIXguaW5kZXRlcm1pbmF0ZSkgJiYgeC52YWx1ZSAhPT0gJ0FMTCcpO1xuICAgIGNvbnN0IGlzUGFyZW50SW5kZXRlcm1pbmF0ZSA9ICEhYWxsUGFyZW50VHlwZVswXS5jaGVja2VkID8gZmFsc2UgOiBhbGxDaGVja2VkT3JJbmRldGVybWluYXRlUGFyZW50cy5sZW5ndGggPiAwO1xuICAgIGNvbnN0IGlzQ2hpbGRJbmRldGVybWluYXRlID0gISFhbGxDaGlsZHJlblswXS5jaGVja2VkID8gZmFsc2UgOiBhbGxDaGVja2VkQ2hpbGRyZW4ubGVuZ3RoID4gMDtcbiAgICB0aGlzLnNldEluZGV0ZXJtaW5hdGVTdGF0ZShhbGxQYXJlbnRUeXBlLCBpc1BhcmVudEluZGV0ZXJtaW5hdGUpO1xuICAgIHRoaXMuc2V0SW5kZXRlcm1pbmF0ZVN0YXRlKGFsbENoaWxkcmVuLCBpc0NoaWxkSW5kZXRlcm1pbmF0ZSk7XG4gIH1cblxuICB1cGRhdGVDaGlsZHJlblZhbHVlKHBhcmVudCwgYWN0aW9uKSB7XG4gICAgY29uc3Qgc2VsZWN0aW5nID0gYWN0aW9uID09PSAnc2VsZWN0JztcbiAgICBjb25zdCBjaGlsZFR5cGUgPSBwYXJlbnQuaXNQYXJlbnRPZjtcbiAgICBjb25zdCBwb3RlbnRpYWxDaGlsZHJlbiA9IHRoaXMuZ2V0QWxsT2ZUeXBlKGNoaWxkVHlwZSk7XG4gICAgcG90ZW50aWFsQ2hpbGRyZW4uZm9yRWFjaCgoeCkgPT4ge1xuICAgICAgaWYgKHgudmFsdWUgPT09ICdBTEwnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh4W3BhcmVudC50eXBlXS5maWx0ZXIoKHkpID0+IHkgPT09IHBhcmVudC52YWx1ZSkubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAoeC5jaGVja2VkICYmICFzZWxlY3RpbmcpIHtcbiAgICAgICAgICB4LmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICBpZiAodGhpcy5hbGxPZlR5cGVTZWxlY3RlZChjaGlsZFR5cGUpKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZVJlbW92ZUl0ZW1JZkFsbFNlbGVjdGVkKHgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVZhbHVlKHgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB4LmNoZWNrZWQgPSBzZWxlY3Rpbmc7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVQYXJlbnRWYWx1ZShjaGlsZCwgYWN0aW9uKSB7XG4gICAgY29uc3QgYWxsUGFyZW50VHlwZSA9IHRoaXMuZ2V0QWxsT2ZUeXBlKGNoaWxkLmlzQ2hpbGRPZik7XG4gICAgaWYgKGFsbFBhcmVudFR5cGVbMF0uY2hlY2tlZCAmJiBhY3Rpb24gIT09ICdzZWxlY3QnKSB7XG4gICAgICB0aGlzLmhhbmRsZVJlbW92ZUl0ZW1JZkFsbFNlbGVjdGVkKGFsbFBhcmVudFR5cGVbMF0pO1xuICAgIH1cbiAgfVxuXG4gIGFkZEluZGl2aWR1YWxDaGlsZHJlbihjaGlsZHJlbikge1xuICAgIGxldCBwYXJlbnRBbHJlYWR5U2VsZWN0ZWQgPSBmYWxzZTtcbiAgICBjaGlsZHJlbi5mb3JFYWNoKCh4KSA9PiB7XG4gICAgICBpZiAoeC5pc0NoaWxkT2YpIHtcbiAgICAgICAgLy8gb25seSBhZGQgY2hpbGRyZW4gaWYgdGhlaXIgcGFyZW50cyBhcmUgbm90IGFscmVhZHkgc2VsZWN0ZWRcbiAgICAgICAgeFt4LmlzQ2hpbGRPZl0uZm9yRWFjaCgocGFyZW50KSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMudmFsdWVbeC5pc0NoaWxkT2ZdLmZpbHRlcigocCkgPT4gcCA9PT0gcGFyZW50KS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBwYXJlbnRBbHJlYWR5U2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy52YWx1ZVt4LnR5cGVdLmZpbHRlcigoaXRlbSkgPT4gaXRlbSA9PT0geC52YWx1ZSkubGVuZ3RoID09PSAwICYmICFwYXJlbnRBbHJlYWR5U2VsZWN0ZWQpIHtcbiAgICAgICAgdGhpcy5hZGQoeCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzZXRJbml0aWFsVmFsdWUobW9kZWwpOiB2b2lkIHtcbiAgICB0aGlzLml0ZW1zID0gW107XG4gICAgdGhpcy52YWx1ZSA9IG1vZGVsIHx8IHt9O1xuICAgIGlmICghdGhpcy50eXBlcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnR5cGVzLmZvckVhY2goKHR5cGVPYmopID0+IHtcbiAgICAgIGNvbnN0IHR5cGUgPSB0eXBlT2JqLnZhbHVlO1xuICAgICAgaWYgKHRoaXMudmFsdWVbdHlwZV0pIHtcbiAgICAgICAgbGV0IGluZGV0ZXJtaW5hdGVJc1NldCA9IGZhbHNlO1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy51cGRhdGVBbGxJdGVtU3RhdGUodHlwZSk7XG4gICAgICAgIGNvbnN0IG9wdGlvbnNCeVR5cGUgPSBvcHRpb25zLmFsbE9mVHlwZTtcbiAgICAgICAgY29uc3QgYWxsU2VsZWN0ZWQgPSBvcHRpb25zLmFsbE9mVHlwZVNlbGVjdGVkO1xuICAgICAgICB0aGlzLnZhbHVlW3R5cGVdLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICBpZiAoIWFsbFNlbGVjdGVkICYmICFpbmRldGVybWluYXRlSXNTZXQpIHtcbiAgICAgICAgICAgIGluZGV0ZXJtaW5hdGVJc1NldCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNldEluZGV0ZXJtaW5hdGVTdGF0ZShvcHRpb25zQnlUeXBlLCB0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBvcHRpb25zQnlUeXBlLmZpbHRlcigoeCkgPT4geC52YWx1ZSA9PT0gaXRlbSlbMF07XG4gICAgICAgICAgdmFsdWUuY2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgaWYgKCFhbGxTZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVEaXNwbGF5SXRlbXModmFsdWUsICdhZGQnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRoaXMuc3RyaWN0UmVsYXRpb25zaGlwICYmIHZhbHVlLmlzUGFyZW50T2YpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hpbGRyZW5WYWx1ZSh2YWx1ZSwgJ3NlbGVjdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0eXBlT2JqLmlzQ2hpbGRPZikge1xuICAgICAgICAgIHRoaXMubW9kaWZ5QWZmZWN0ZWRQYXJlbnRzT3JDaGlsZHJlbih0cnVlLCB7IHZhbHVlOiB0eXBlLCBpc0NoaWxkT2Y6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudmFsdWVbdHlwZV0gPSBbXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGFsbEl0ZW1zU2VsZWN0ZWQob3B0aW9uc0J5VHlwZSwgdHlwZSkge1xuICAgIHJldHVybiB0aGlzLnZhbHVlW3R5cGVdLmxlbmd0aCA9PT0gb3B0aW9uc0J5VHlwZS5sZW5ndGggLSAxO1xuICB9XG5cbiAgLy8gU2V0IHRvdWNoZWQgb24gYmx1clxuICBvblRvdWNoZWQoZSkge1xuICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xuICAgIHRoaXMuYmx1ci5lbWl0KGUpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZShtb2RlbDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgIHRoaXMuc2V0SW5pdGlhbFZhbHVlKG1vZGVsKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gIH1cbn1cbiJdfQ==
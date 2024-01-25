// NG2
import { Component, ElementRef, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// Vendor
import { ReplaySubject } from 'rxjs';
import { NovoLabelService } from 'novo-elements/services';
import { Helpers } from 'novo-elements/utils';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "@angular/common";
import * as i3 from "novo-elements/elements/picker";
import * as i4 from "novo-elements/elements/chips";
// Value accessor for the component (supports ngModel)
const CHIPS_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoMultiPickerElement),
    multi: true,
};
export class NovoMultiPickerElement {
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
        if (event.key === "Backspace" /* Key.Backspace */) {
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
NovoMultiPickerElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoMultiPickerElement, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component });
NovoMultiPickerElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: NovoMultiPickerElement, selector: "multi-picker", inputs: { source: "source", placeholder: "placeholder", types: "types", value: "value" }, outputs: { changed: "changed", focus: "focus", blur: "blur" }, host: { properties: { "class.with-value": "items.length > 0" } }, providers: [CHIPS_VALUE_ACCESSOR], ngImport: i0, template: `
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
  `, isInline: true, styles: [":host{width:100%;display:flex;align-items:center;flex-wrap:wrap;justify-content:flex-start;border-bottom:1px solid #afb9c0;transition:all .2s ease-in-out;position:relative;padding:2px 0}:host.with-value{margin-bottom:20px}:host:hover{border-bottom:1px solid #5f6d78}:host.selected,:host.selected:hover{border-bottom:1px solid #4a89dc}:host.selected+i,:host.selected:hover+i{color:#4a89dc}:host.disabled{border-bottom-style:dashed!important}:host .chip-input-container{flex-grow:4}:host .chip-input-container input{padding-top:0;border:none;background:transparent!important;width:100%}:host .chip-input-container input:focus{outline:none}:host .novo-chip-container{display:flex;flex-flow:row wrap;gap:.4rem}:host label.clear-all{flex:1 100%;position:absolute;right:0;bottom:-20px;font-size:.9rem;color:#da4453;cursor:pointer;display:flex;align-items:center}:host label.clear-all i{font-size:.7rem;padding-bottom:2px;margin-left:5px}:host i.bhi-search{position:absolute;bottom:8px;right:0;font-size:1.1em;color:#3d464d}:host+i{position:absolute;right:0;bottom:7px}:host.with-value{margin-bottom:0}:host novo-picker{position:inherit;padding-bottom:0}:host novo-picker>::ng-deep input{border:none;border-bottom:none!important}:host novo-picker>::ng-deep input:disabled{border-bottom:none!important}:host novo-picker>::ng-deep i{display:none}:host novo-picker div.picker-results-container{left:0}:host picker-results{position:absolute;color:#000}:host picker-results novo-list{max-height:49vh;overflow:auto}:host picker-results novo-list novo-list-item{flex:0 0;transition:background-color .25s}:host picker-results novo-list novo-list-item>div{width:100%}:host picker-results novo-list novo-list-item.active{background-color:#e0ebf9}:host picker-results novo-list novo-list-item:hover{background-color:#e0ebf9}:host picker-results novo-list novo-list-item item-content{flex-flow:row wrap}:host picker-results novo-list novo-list-item item-content>*{flex:0 0 33%;white-space:nowrap}:host picker-results .error-results,:host picker-results .no-recents,:host picker-results .null-results{text-align:center;padding:1em 0 4em}:host picker-results .error-results>i,:host picker-results .no-recents>i,:host picker-results .null-results>i{font-size:3em;margin:.5em;color:#0000004d}:host picker-results .error-results>h4,:host picker-results .error-results>p,:host picker-results .no-recents>h4,:host picker-results .no-recents>p,:host picker-results .null-results>h4,:host picker-results .null-results>p{margin:0;max-width:none;padding:0}:host picker-results .error-results>h4,:host picker-results .no-recents>h4,:host picker-results .null-results>h4{font-weight:500}:host picker-results section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}:host .preview-container entity-picker-result{background:#ffffff;position:absolute;top:100%;left:0;width:100%;min-width:180px;max-height:49vh;overflow:auto;z-index:9001;border:1px solid #4a89dc;transition:all .2s ease-in-out}:host .preview-container entity-picker-result .novo-list-item{flex:0 0}:host .preview-container entity-picker-result .novo-list-item>div{width:100%}:host .preview-container entity-picker-result .novo-list-item .novo-item-content{flex-flow:row wrap}:host .preview-container entity-picker-result .novo-list-item .novo-item-content>*{flex:0 0 33%;white-space:nowrap}:host .preview-container entity-picker-result .novo-list-item .novo-item-content>p{min-width:15em;font-size:.9em;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;padding-right:1em}entity-chip-results{max-width:none!important}:host .chip-input-container{padding-top:10px}:host ul.summary{display:inline;list-style:none;color:#868686;padding:0 10px}:host ul.summary li{display:inline;padding:0 3px}:host ul.summary li:after{content:\", \"}:host ul.summary li:last-child:after{content:\" \"}:host novo-picker li.header{text-transform:uppercase;font-weight:400;border-top:1px solid #e8e8e8;padding-bottom:0}:host novo-picker li label{color:#9e9e9e;text-transform:capitalize}:host novo-picker li label:hover i.bhi-checkbox-empty,:host novo-picker li label:hover i.bhi-checkbox-indeterminate{color:#4a89dc}:host novo-picker li.checked label{color:#393939}:host novo-picker i{margin-right:5px}:host novo-picker i.bhi-checkbox-empty{color:#d2d2d2}:host novo-picker i.bhi-checkbox-filled,:host novo-picker i.bhi-checkbox-indeterminate{color:#4a89dc}:host chip span{text-transform:capitalize}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.NovoPickerElement, selector: "novo-picker", inputs: ["config", "placeholder", "clearValueOnSelect", "closeOnSelect", "selected", "appendToBody", "parentScrollSelector", "parentScrollAction", "containerClass", "side", "autoSelectFirstOption", "overrideElement", "maxlength", "allowCustomValues", "disablePickerInput"], outputs: ["changed", "select", "focus", "blur", "typing"] }, { kind: "component", type: i4.NovoChipElement, selector: "novo-chip, [novo-chip]", inputs: ["color", "tabIndex", "size", "type", "selected", "value", "selectable", "disabled", "removable"], outputs: ["selectionChange", "destroyed", "removed"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.SlicePipe, name: "slice" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoMultiPickerElement, decorators: [{
            type: Component,
            args: [{ selector: 'multi-picker', providers: [CHIPS_VALUE_ACCESSOR], template: `
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
  `, host: {
                        '[class.with-value]': 'items.length > 0',
                    }, styles: [":host{width:100%;display:flex;align-items:center;flex-wrap:wrap;justify-content:flex-start;border-bottom:1px solid #afb9c0;transition:all .2s ease-in-out;position:relative;padding:2px 0}:host.with-value{margin-bottom:20px}:host:hover{border-bottom:1px solid #5f6d78}:host.selected,:host.selected:hover{border-bottom:1px solid #4a89dc}:host.selected+i,:host.selected:hover+i{color:#4a89dc}:host.disabled{border-bottom-style:dashed!important}:host .chip-input-container{flex-grow:4}:host .chip-input-container input{padding-top:0;border:none;background:transparent!important;width:100%}:host .chip-input-container input:focus{outline:none}:host .novo-chip-container{display:flex;flex-flow:row wrap;gap:.4rem}:host label.clear-all{flex:1 100%;position:absolute;right:0;bottom:-20px;font-size:.9rem;color:#da4453;cursor:pointer;display:flex;align-items:center}:host label.clear-all i{font-size:.7rem;padding-bottom:2px;margin-left:5px}:host i.bhi-search{position:absolute;bottom:8px;right:0;font-size:1.1em;color:#3d464d}:host+i{position:absolute;right:0;bottom:7px}:host.with-value{margin-bottom:0}:host novo-picker{position:inherit;padding-bottom:0}:host novo-picker>::ng-deep input{border:none;border-bottom:none!important}:host novo-picker>::ng-deep input:disabled{border-bottom:none!important}:host novo-picker>::ng-deep i{display:none}:host novo-picker div.picker-results-container{left:0}:host picker-results{position:absolute;color:#000}:host picker-results novo-list{max-height:49vh;overflow:auto}:host picker-results novo-list novo-list-item{flex:0 0;transition:background-color .25s}:host picker-results novo-list novo-list-item>div{width:100%}:host picker-results novo-list novo-list-item.active{background-color:#e0ebf9}:host picker-results novo-list novo-list-item:hover{background-color:#e0ebf9}:host picker-results novo-list novo-list-item item-content{flex-flow:row wrap}:host picker-results novo-list novo-list-item item-content>*{flex:0 0 33%;white-space:nowrap}:host picker-results .error-results,:host picker-results .no-recents,:host picker-results .null-results{text-align:center;padding:1em 0 4em}:host picker-results .error-results>i,:host picker-results .no-recents>i,:host picker-results .null-results>i{font-size:3em;margin:.5em;color:#0000004d}:host picker-results .error-results>h4,:host picker-results .error-results>p,:host picker-results .no-recents>h4,:host picker-results .no-recents>p,:host picker-results .null-results>h4,:host picker-results .null-results>p{margin:0;max-width:none;padding:0}:host picker-results .error-results>h4,:host picker-results .no-recents>h4,:host picker-results .null-results>h4{font-weight:500}:host picker-results section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}:host .preview-container entity-picker-result{background:#ffffff;position:absolute;top:100%;left:0;width:100%;min-width:180px;max-height:49vh;overflow:auto;z-index:9001;border:1px solid #4a89dc;transition:all .2s ease-in-out}:host .preview-container entity-picker-result .novo-list-item{flex:0 0}:host .preview-container entity-picker-result .novo-list-item>div{width:100%}:host .preview-container entity-picker-result .novo-list-item .novo-item-content{flex-flow:row wrap}:host .preview-container entity-picker-result .novo-list-item .novo-item-content>*{flex:0 0 33%;white-space:nowrap}:host .preview-container entity-picker-result .novo-list-item .novo-item-content>p{min-width:15em;font-size:.9em;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;padding-right:1em}entity-chip-results{max-width:none!important}:host .chip-input-container{padding-top:10px}:host ul.summary{display:inline;list-style:none;color:#868686;padding:0 10px}:host ul.summary li{display:inline;padding:0 3px}:host ul.summary li:after{content:\", \"}:host ul.summary li:last-child:after{content:\" \"}:host novo-picker li.header{text-transform:uppercase;font-weight:400;border-top:1px solid #e8e8e8;padding-bottom:0}:host novo-picker li label{color:#9e9e9e;text-transform:capitalize}:host novo-picker li label:hover i.bhi-checkbox-empty,:host novo-picker li label:hover i.bhi-checkbox-indeterminate{color:#4a89dc}:host novo-picker li.checked label{color:#393939}:host novo-picker i{margin-right:5px}:host novo-picker i.bhi-checkbox-empty{color:#d2d2d2}:host novo-picker i.bhi-checkbox-filled,:host novo-picker i.bhi-checkbox-indeterminate{color:#4a89dc}:host chip span{text-transform:capitalize}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXVsdGlQaWNrZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9tdWx0aS1waWNrZXIvTXVsdGlQaWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxTQUFTO0FBQ1QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNyQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsT0FBTyxFQUFPLE1BQU0scUJBQXFCLENBQUM7Ozs7OztBQUVuRCxzREFBc0Q7QUFDdEQsTUFBTSxvQkFBb0IsR0FBRztJQUMzQixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsc0JBQXNCLENBQUM7SUFDckQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBK0NGLE1BQU0sT0FBTyxzQkFBc0I7SUFjakMsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxJQUNJLEtBQUssQ0FBQyxhQUFhO1FBQ3JCLElBQUksYUFBYSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzVFO2FBQU07WUFDTCxJ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LGdCQUFnQixDQUFDLEVBQVk7UUFDM0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELGlCQUFpQixDQUFDLEVBQVk7UUFDNUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7b0hBL2pCVSxzQkFBc0I7d0dBQXRCLHNCQUFzQixrUUFyQ3RCLENBQUMsb0JBQW9CLENBQUMsMEJBQ3ZCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4QlQ7NEZBTVUsc0JBQXNCO2tCQXZDbEMsU0FBUzsrQkFDRSxjQUFjLGFBQ2IsQ0FBQyxvQkFBb0IsQ0FBQyxZQUN2Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJULFFBRUs7d0JBQ0osb0JBQW9CLEVBQUUsa0JBQWtCO3FCQUN6QztnSUFJRCxNQUFNO3NCQURMLEtBQUs7Z0JBR04sV0FBVztzQkFEVixLQUFLO2dCQUdOLEtBQUs7c0JBREosS0FBSztnQkFHTixPQUFPO3NCQUROLE1BQU07Z0JBR1AsS0FBSztzQkFESixNQUFNO2dCQUdQLElBQUk7c0JBREgsTUFBTTtnQkFRSCxLQUFLO3NCQURSLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuLy8gVmVuZG9yXG5pbXBvcnQgeyBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBIZWxwZXJzLCBLZXkgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcblxuLy8gVmFsdWUgYWNjZXNzb3IgZm9yIHRoZSBjb21wb25lbnQgKHN1cHBvcnRzIG5nTW9kZWwpXG5jb25zdCBDSElQU19WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdm9NdWx0aVBpY2tlckVsZW1lbnQpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbmludGVyZmFjZSBJdGVtIHtcbiAgdHlwZTtcbiAgbGFiZWw7XG4gIHZhbHVlO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtdWx0aS1waWNrZXInLFxuICBwcm92aWRlcnM6IFtDSElQU19WQUxVRV9BQ0NFU1NPUl0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5vdm8tY2hpcFxuICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2YgX2l0ZW1zIHwgYXN5bmMgfCBzbGljZTogMDpjaGlwc0NvdW50XCJcbiAgICAgIFt0eXBlXT1cIml0ZW0udHlwZVwiXG4gICAgICBbY2xhc3Muc2VsZWN0ZWRdPVwiaXRlbSA9PSBzZWxlY3RlZFwiXG4gICAgICAocmVtb3ZlZCk9XCJyZW1vdmVGcm9tRGlzcGxheSgkZXZlbnQsIGl0ZW0pXCJcbiAgICAgIChzZWxlY3Rpb25DaGFuZ2UpPVwic2VsZWN0KCRldmVudCwgaXRlbSlcIlxuICAgID5cbiAgICAgIHt7IGl0ZW0ubGFiZWwgfX1cbiAgICA8L25vdm8tY2hpcD5cbiAgICA8ZGl2ICpuZ0lmPVwiaXRlbXMubGVuZ3RoID4gY2hpcHNDb3VudFwiPlxuICAgICAgPHVsIGNsYXNzPVwic3VtbWFyeVwiPlxuICAgICAgICA8bGkgKm5nRm9yPVwibGV0IHR5cGUgb2Ygbm90U2hvd25cIj4rIHt7IHR5cGUuY291bnQgfX0ge3sgbGFiZWxzLm1vcmUgfX0ge3sgdHlwZS50eXBlIH19PC9saT5cbiAgICAgIDwvdWw+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNoaXAtaW5wdXQtY29udGFpbmVyXCI+XG4gICAgICA8bm92by1waWNrZXJcbiAgICAgICAgY2xlYXJWYWx1ZU9uU2VsZWN0PVwidHJ1ZVwiXG4gICAgICAgIFtjb25maWddPVwic291cmNlXCJcbiAgICAgICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICAgICAgKHNlbGVjdCk9XCJjbGlja09wdGlvbigkZXZlbnQpXCJcbiAgICAgICAgKGtleWRvd24pPVwib25LZXlEb3duKCRldmVudClcIlxuICAgICAgICAoZm9jdXMpPVwib25Gb2N1cygkZXZlbnQpXCJcbiAgICAgICAgKGJsdXIpPVwib25Ub3VjaGVkKCRldmVudClcIlxuICAgICAgICBbb3ZlcnJpZGVFbGVtZW50XT1cImVsZW1lbnRcIlxuICAgICAgPlxuICAgICAgPC9ub3ZvLXBpY2tlcj5cbiAgICA8L2Rpdj5cbiAgICA8aSBjbGFzcz1cImJoaS1zZWFyY2hcIiBbY2xhc3MuaGFzLXZhbHVlXT1cIml0ZW1zLmxlbmd0aFwiPjwvaT5cbiAgICA8bGFiZWwgY2xhc3M9XCJjbGVhci1hbGxcIiAqbmdJZj1cIml0ZW1zLmxlbmd0aFwiIChjbGljayk9XCJjbGVhclZhbHVlKClcIj57eyBsYWJlbHMuY2xlYXJBbGwgfX0gPGkgY2xhc3M9XCJiaGktdGltZXNcIj48L2k+PC9sYWJlbD5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vX011bHRpUGlja2VyLnNjc3MnXSxcbiAgaG9zdDoge1xuICAgICdbY2xhc3Mud2l0aC12YWx1ZV0nOiAnaXRlbXMubGVuZ3RoID4gMCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9NdWx0aVBpY2tlckVsZW1lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKVxuICBzb3VyY2U6IHsgb3B0aW9uczogW107IHJlc3VsdHNUZW1wbGF0ZTsgc2VsZWN0QWxsT3B0aW9uOiBib29sZWFuOyBjaGlwc0NvdW50OyBzdHJpY3RSZWxhdGlvbnNoaXAgfTtcbiAgQElucHV0KClcbiAgcGxhY2Vob2xkZXI6IGFueSA9ICcnO1xuICBASW5wdXQoKVxuICB0eXBlczogeyB2YWx1ZTsgc2luZ3VsYXI7IHBsdXJhbDsgaXNQYXJlbnRPZjsgaXNDaGlsZE9mIH1bXTtcbiAgQE91dHB1dCgpXG4gIGNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgZm9jdXM6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgYmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCB2YWx1ZShzZWxlY3RlZEl0ZW1zKSB7XG4gICAgaWYgKHNlbGVjdGVkSXRlbXMpIHtcbiAgICAgIHRoaXMudHlwZXMuZm9yRWFjaCgoeCkgPT4gKHRoaXMuX3ZhbHVlW3gudmFsdWVdID0gc2VsZWN0ZWRJdGVtc1t4LnZhbHVlXSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IHt9O1xuICAgICAgdGhpcy50eXBlcy5mb3JFYWNoKCh4KSA9PiAodGhpcy5fdmFsdWVbeC52YWx1ZV0gPSBbXSkpO1xuICAgIH1cbiAgICB0aGlzLmNoYW5nZWQuZW1pdChzZWxlY3RlZEl0ZW1zKTtcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2Uoc2VsZWN0ZWRJdGVtcyk7XG4gIH1cblxuICBpdGVtczogSXRlbVtdID0gW107XG4gIF9pdGVtcyA9IG5ldyBSZXBsYXlTdWJqZWN0PEl0ZW1bXT4oMSk7XG4gIG9wdGlvbnM6IGFueTtcbiAgX29wdGlvbnM6IGFueTtcbiAgc2VsZWN0ZWQ6IGFueSA9IG51bGw7XG4gIGNvbmZpZzogYW55ID0ge307XG4gIGNoaXBzQ291bnQ6IG51bWJlcjtcbiAgc2VsZWN0QWxsT3B0aW9uOiBib29sZWFuO1xuICBzdHJpY3RSZWxhdGlvbnNoaXA6IGJvb2xlYW47XG4gIC8vIHByaXZhdGUgZGF0YSBtb2RlbFxuICBfdmFsdWUgPSB7fTtcbiAgbm90U2hvd246IGFueSA9IHt9O1xuICAvLyBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3NcbiAgbW9kZWw6IGFueTtcbiAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHtcbiAgICB0aGlzLmNoaXBzQ291bnQgPSA0O1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zZWxlY3RBbGxPcHRpb24gPSB0aGlzLnNvdXJjZS5zZWxlY3RBbGxPcHRpb24gfHwgZmFsc2U7XG4gICAgdGhpcy5jaGlwc0NvdW50ID0gdGhpcy5zb3VyY2UuY2hpcHNDb3VudCB8fCA0O1xuICAgIHRoaXMuc3RyaWN0UmVsYXRpb25zaGlwID0gdGhpcy5zb3VyY2Uuc3RyaWN0UmVsYXRpb25zaGlwIHx8IGZhbHNlO1xuICAgIHRoaXMuc2V0dXBPcHRpb25zKCk7XG4gIH1cblxuICBjbGVhclZhbHVlKCkge1xuICAgIHRoaXMudHlwZXMuZm9yRWFjaCgodHlwZSkgPT4gdGhpcy5tb2RpZnlBbGxPZlR5cGUodHlwZS52YWx1ZSwgJ3Vuc2VsZWN0JykpO1xuICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICB0aGlzLl9pdGVtcy5uZXh0KHRoaXMuaXRlbXMpO1xuICAgIHRoaXMuc2V0SW5pdGlhbFZhbHVlKG51bGwpO1xuICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIHJlbW92ZUZyb21EaXNwbGF5KGV2ZW50LCBpdGVtKSB7XG4gICAgdGhpcy5yZW1vdmUodHJ1ZSwgaXRlbSk7XG4gICAgdGhpcy5tb2RpZnlBZmZlY3RlZFBhcmVudHNPckNoaWxkcmVuKGZhbHNlLCBpdGVtKTtcbiAgfVxuXG4gIHNldHVwT3B0aW9ucygpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLnNvdXJjZS5vcHRpb25zIHx8IFtdO1xuICAgIHRoaXMuX29wdGlvbnMgPSBbXTtcbiAgICBpZiAodGhpcy5vcHRpb25zKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZE9wdGlvbiA9IHRoaXMuc2V0dXBPcHRpb25zQnlUeXBlKG9wdGlvbik7XG4gICAgICAgIHRoaXMuX29wdGlvbnMucHVzaChmb3JtYXR0ZWRPcHRpb24pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuc291cmNlLm9wdGlvbnMgPSB0aGlzLl9vcHRpb25zO1xuICB9XG5cbiAgc2V0dXBPcHRpb25zQnlUeXBlKHNlY3Rpb24pIHtcbiAgICBjb25zdCBmb3JtYXR0ZWRTZWN0aW9uOiBhbnkgPSB7XG4gICAgICB0eXBlOiBzZWN0aW9uLnR5cGUsXG4gICAgICBsYWJlbDogc2VjdGlvbi5sYWJlbCB8fCBzZWN0aW9uLnR5cGUsXG4gICAgfTtcbiAgICBmb3JtYXR0ZWRTZWN0aW9uLmRhdGEgPSBzZWN0aW9uLmRhdGEubWFwKChpdGVtKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5mb3JtYXRPcHRpb24oc2VjdGlvbiwgaXRlbSk7XG4gICAgfSk7XG4gICAgaWYgKHRoaXMuc2VsZWN0QWxsT3B0aW9uKSB7XG4gICAgICBjb25zdCBzZWxlY3RBbGwgPSB0aGlzLmNyZWF0ZVNlbGVjdEFsbE9wdGlvbihzZWN0aW9uKTtcbiAgICAgIGZvcm1hdHRlZFNlY3Rpb24uZGF0YS5zcGxpY2UoMCwgMCwgc2VsZWN0QWxsKTtcbiAgICB9XG4gICAgZm9ybWF0dGVkU2VjdGlvbi5vcmlnaW5hbERhdGEgPSBmb3JtYXR0ZWRTZWN0aW9uLmRhdGEuc2xpY2UoKTtcbiAgICByZXR1cm4gZm9ybWF0dGVkU2VjdGlvbjtcbiAgfVxuXG4gIGZvcm1hdE9wdGlvbihzZWN0aW9uLCBpdGVtKSB7XG4gICAgY29uc3Qgb2JqID0ge1xuICAgICAgdmFsdWU6IHNlY3Rpb24uZmllbGQgPyBpdGVtW3NlY3Rpb24uZmllbGRdIDogaXRlbS52YWx1ZSB8fCBpdGVtLFxuICAgICAgbGFiZWw6IHNlY3Rpb24uZm9ybWF0ID8gSGVscGVycy5pbnRlcnBvbGF0ZShzZWN0aW9uLmZvcm1hdCwgaXRlbSkgOiBpdGVtLmxhYmVsIHx8IFN0cmluZyhpdGVtLnZhbHVlIHx8IGl0ZW0pLFxuICAgICAgdHlwZTogc2VjdGlvbi50eXBlLFxuICAgICAgY2hlY2tlZDogdW5kZWZpbmVkLFxuICAgICAgaXNQYXJlbnRPZjogc2VjdGlvbi5pc1BhcmVudE9mLFxuICAgICAgaXNDaGlsZE9mOiBzZWN0aW9uLmlzQ2hpbGRPZixcbiAgICB9O1xuICAgIGlmIChvYmouaXNDaGlsZE9mKSB7XG4gICAgICBvYmpbc2VjdGlvbi5pc0NoaWxkT2ZdID0gaXRlbVtzZWN0aW9uLmlzQ2hpbGRPZl07XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBjcmVhdGVTZWxlY3RBbGxPcHRpb24oc2VjdGlvbikge1xuICAgIGNvbnN0IHNlbGVjdEFsbCA9IHtcbiAgICAgIHZhbHVlOiAnQUxMJyxcbiAgICAgIGxhYmVsOiBgQWxsICR7c2VjdGlvbi50eXBlfWAsXG4gICAgICB0eXBlOiBzZWN0aW9uLnR5cGUsXG4gICAgICBjaGVja2VkOiB0aGlzLm1vZGVsICYmIHRoaXMubW9kZWwubGVuZ3RoICYmIHRoaXMubW9kZWwuaW5kZXhPZignQUxMJykgIT09IC0xLFxuICAgICAgaXNQYXJlbnRPZjogc2VjdGlvbi5pc1BhcmVudE9mLFxuICAgICAgaXNDaGlsZE9mOiBzZWN0aW9uLmlzQ2hpbGRPZixcbiAgICB9O1xuICAgIGlmIChzZWN0aW9uLmlzQ2hpbGRPZikge1xuICAgICAgY29uc3QgYWxsUGFyZW50cyA9IHNlY3Rpb24uZGF0YS5yZWR1Y2UoKGFjY3VtLCBuZXh0KSA9PiB7XG4gICAgICAgIHJldHVybiBhY2N1bS5jb25jYXQobmV4dFtzZWN0aW9uLmlzQ2hpbGRPZl0pO1xuICAgICAgfSwgW10pO1xuICAgICAgc2VsZWN0QWxsW3NlY3Rpb24uaXNDaGlsZE9mXSA9IGFsbFBhcmVudHM7XG4gICAgfVxuICAgIHJldHVybiBzZWxlY3RBbGw7XG4gIH1cblxuICBkZXNlbGVjdEFsbCgpIHtcbiAgICB0aGlzLnNlbGVjdGVkID0gbnVsbDtcbiAgfVxuXG4gIHNlbGVjdChldmVudCwgaXRlbSkge1xuICAgIHRoaXMuYmx1ci5lbWl0KGV2ZW50KTtcbiAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XG4gICAgdGhpcy5zZWxlY3RlZCA9IGl0ZW07XG4gIH1cblxuICBvbkZvY3VzKGUpIHtcbiAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgIHRoaXMuZm9jdXMuZW1pdChlKTtcbiAgfVxuXG4gIGNsaWNrT3B0aW9uKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50ICYmICEoZXZlbnQgaW5zdGFuY2VvZiBFdmVudCkpIHtcbiAgICAgIGlmIChldmVudC5jaGVja2VkID09PSBmYWxzZSkge1xuICAgICAgICB0aGlzLnJlbW92ZShudWxsLCBldmVudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFkZChldmVudCk7XG4gICAgICB9XG4gICAgICB0aGlzLm1vZGlmeUFmZmVjdGVkUGFyZW50c09yQ2hpbGRyZW4oZXZlbnQuY2hlY2tlZCwgZXZlbnQpO1xuICAgICAgLy8gU2V0IGZvY3VzIG9uIHRoZSBwaWNrZXJcbiAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3Rvcignbm92by1waWNrZXIgPiBpbnB1dCcpO1xuICAgICAgaWYgKGlucHV0KSB7XG4gICAgICAgIGlucHV0LmZvY3VzKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWRkKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LnZhbHVlID09PSAnQUxMJykge1xuICAgICAgdGhpcy5tb2RpZnlBbGxPZlR5cGUoZXZlbnQudHlwZSwgJ3NlbGVjdCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVwZGF0ZURpc3BsYXlJdGVtcyhldmVudCwgJ2FkZCcpO1xuICAgICAgdGhpcy52YWx1ZVtldmVudC50eXBlXS5wdXNoKGV2ZW50LnZhbHVlKTtcbiAgICAgIHRoaXMudXBkYXRlQWxsSXRlbVN0YXRlKGV2ZW50LnR5cGUpO1xuICAgICAgdGhpcy50cmlnZ2VyVmFsdWVVcGRhdGUoKTtcbiAgICB9XG4gICAgdGhpcy51cGRhdGVQYXJlbnRPckNoaWxkcmVuKGV2ZW50LCAnc2VsZWN0Jyk7XG4gICAgdGhpcy5zZWxlY3QobnVsbCwgZXZlbnQpO1xuICB9XG5cbiAgdXBkYXRlQWxsSXRlbVN0YXRlKHR5cGUpIHtcbiAgICBjb25zdCBhbGxPZlR5cGUgPSB0aGlzLmdldEFsbE9mVHlwZSh0eXBlKTtcbiAgICBjb25zdCBhbGxPZlR5cGVTZWxlY3RlZCA9IHRoaXMuYWxsSXRlbXNTZWxlY3RlZChhbGxPZlR5cGUsIHR5cGUpO1xuICAgIGlmIChhbGxPZlR5cGVTZWxlY3RlZCkge1xuICAgICAgdGhpcy5zZWxlY3RBbGwoYWxsT2ZUeXBlLCB0eXBlKTtcbiAgICB9XG4gICAgcmV0dXJuIHsgYWxsT2ZUeXBlLCBhbGxPZlR5cGVTZWxlY3RlZCB9O1xuICB9XG5cbiAgc2V0SW5kZXRlcm1pbmF0ZVN0YXRlKGFsbE9mVHlwZSwgc3RhdHVzKSB7XG4gICAgaWYgKCF0aGlzLnNlbGVjdEFsbE9wdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBhbGxJdGVtID0gYWxsT2ZUeXBlWzBdO1xuICAgIGFsbEl0ZW0uaW5kZXRlcm1pbmF0ZSA9IHN0YXR1cztcbiAgfVxuXG4gIHVwZGF0ZURpc3BsYXlJdGVtcyhpdGVtLCBhY3Rpb24pIHtcbiAgICBjb25zdCBhZGRpbmcgPSBhY3Rpb24gPT09ICdhZGQnO1xuICAgIGlmIChhZGRpbmcpIHtcbiAgICAgIHRoaXMuaXRlbXMucHVzaChpdGVtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuaXRlbXMuaW5kZXhPZihpdGVtKSA+IC0xKSB7XG4gICAgICAgIHRoaXMuaXRlbXMuc3BsaWNlKHRoaXMuaXRlbXMuaW5kZXhPZihpdGVtKSwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMudXBkYXRlRGlzcGxheVRleHQodGhpcy5pdGVtcyk7XG4gICAgdGhpcy5faXRlbXMubmV4dCh0aGlzLml0ZW1zKTtcbiAgfVxuXG4gIHVwZGF0ZURpc3BsYXlUZXh0KGl0ZW1zKSB7XG4gICAgdGhpcy5ub3RTaG93biA9IFtdO1xuICAgIGNvbnN0IG5vdFNob3duID0gaXRlbXMuc2xpY2UodGhpcy5jaGlwc0NvdW50KTtcbiAgICBpZiAobm90U2hvd24ubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy50eXBlcy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICAgIGxldCBjb3VudDtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRPZlR5cGUgPSBub3RTaG93bi5maWx0ZXIoKHgpID0+IHgudHlwZSA9PT0gdHlwZS52YWx1ZSk7XG4gICAgICAgIGlmIChzZWxlY3RlZE9mVHlwZS5sZW5ndGggPT09IDEgJiYgc2VsZWN0ZWRPZlR5cGVbMF0udmFsdWUgPT09ICdBTEwnKSB7XG4gICAgICAgICAgY291bnQgPSB0aGlzLmdldEFsbE9mVHlwZSh0eXBlLnZhbHVlKS5sZW5ndGggLSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvdW50ID0gc2VsZWN0ZWRPZlR5cGUubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRpc3BsYXlUeXBlID0gY291bnQgPT09IDEgPyB0eXBlLnNpbmd1bGFyIDogdHlwZS5wbHVyYWwgfHwgdHlwZS52YWx1ZTtcbiAgICAgICAgaWYgKGNvdW50ID4gMCkge1xuICAgICAgICAgIHRoaXMubm90U2hvd24ucHVzaCh7IHR5cGU6IGRpc3BsYXlUeXBlLCBjb3VudCB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlKGV2ZW50LCBpdGVtKSB7XG4gICAgbGV0IHRyaWdnZXJlZEJ5RXZlbnQ7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICB0cmlnZ2VyZWRCeUV2ZW50ID0gdHJ1ZTtcbiAgICB9XG4gICAgY29uc3QgaXRlbVRvUmVtb3ZlID0gaXRlbTtcbiAgICBpZiAoaXRlbVRvUmVtb3ZlLnZhbHVlID09PSAnQUxMJykge1xuICAgICAgdHJpZ2dlcmVkQnlFdmVudCA9IGZhbHNlO1xuICAgICAgdGhpcy5tb2RpZnlBbGxPZlR5cGUoaXRlbVRvUmVtb3ZlLnR5cGUsICd1bnNlbGVjdCcpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5hbGxPZlR5cGVTZWxlY3RlZChpdGVtVG9SZW1vdmUudHlwZSkpIHtcbiAgICAgIHRoaXMuaGFuZGxlUmVtb3ZlSXRlbUlmQWxsU2VsZWN0ZWQoaXRlbVRvUmVtb3ZlKTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVJdGVtKGl0ZW0sIHRyaWdnZXJlZEJ5RXZlbnQpO1xuICB9XG5cbiAgcmVtb3ZlSXRlbShpdGVtLCB0cmlnZ2VyZWRCeUV2ZW50PzogYW55KSB7XG4gICAgaXRlbS5jaGVja2VkID0gZmFsc2U7XG4gICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuICAgIHRoaXMucmVtb3ZlVmFsdWUoaXRlbSk7XG4gICAgaWYgKGl0ZW0udmFsdWUgIT09ICdBTEwnKSB7XG4gICAgICB0aGlzLnVwZGF0ZVBhcmVudE9yQ2hpbGRyZW4oaXRlbSwgJ3Vuc2VsZWN0Jyk7XG4gICAgfVxuICAgIGlmICh0cmlnZ2VyZWRCeUV2ZW50KSB7XG4gICAgICB0aGlzLm1vZGlmeUFmZmVjdGVkUGFyZW50c09yQ2hpbGRyZW4oZmFsc2UsIGl0ZW0pO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZVZhbHVlKGl0ZW0pIHtcbiAgICBjb25zdCB1cGRhdGVkVmFsdWVzID0gdGhpcy52YWx1ZVtpdGVtLnR5cGVdLmZpbHRlcigoeCkgPT4geCAhPT0gaXRlbS52YWx1ZSk7XG4gICAgdGhpcy52YWx1ZVtpdGVtLnR5cGVdID0gdXBkYXRlZFZhbHVlcztcbiAgICB0aGlzLnRyaWdnZXJWYWx1ZVVwZGF0ZSgpO1xuICAgIHRoaXMudXBkYXRlRGlzcGxheUl0ZW1zKGl0ZW0sICdyZW1vdmUnKTtcbiAgfVxuXG4gIG9uS2V5RG93bihldmVudCkge1xuICAgIGlmIChldmVudC5rZXkgPT09IEtleS5CYWNrc3BhY2UpIHtcbiAgICAgIGlmIChldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnZhbHVlLmxlbmd0aCA9PT0gMCAmJiB0aGlzLml0ZW1zLmxlbmd0aCkge1xuICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmUobnVsbCwgdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3QoZXZlbnQsIHRoaXMuaXRlbXNbdGhpcy5pdGVtcy5sZW5ndGggLSAxXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhbGxPZlR5cGVTZWxlY3RlZCh0eXBlKSB7XG4gICAgcmV0dXJuIHRoaXMuaXRlbXMuZmlsdGVyKCh4KSA9PiB4LnR5cGUgPT09IHR5cGUgJiYgeC52YWx1ZSA9PT0gJ0FMTCcpLmxlbmd0aCA+IDA7XG4gIH1cblxuICBtb2RpZnlBbGxPZlR5cGUodHlwZSwgYWN0aW9uKSB7XG4gICAgY29uc3Qgc2VsZWN0aW5nID0gYWN0aW9uID09PSAnc2VsZWN0JztcbiAgICBjb25zdCBhbGxPZlR5cGUgPSB0aGlzLmdldEFsbE9mVHlwZSh0eXBlKTtcbiAgICBhbGxPZlR5cGUuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaXRlbS5jaGVja2VkID0gc2VsZWN0aW5nO1xuICAgICAgaXRlbS5pbmRldGVybWluYXRlID0gZmFsc2U7XG4gICAgfSk7XG4gICAgaWYgKHNlbGVjdGluZykge1xuICAgICAgdGhpcy5zZWxlY3RBbGwoYWxsT2ZUeXBlLCB0eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pdGVtcyA9IFsuLi50aGlzLml0ZW1zLmZpbHRlcigoeCkgPT4geC50eXBlICE9PSB0eXBlKV07XG4gICAgICB0aGlzLl9pdGVtcy5uZXh0KHRoaXMuaXRlbXMpO1xuICAgICAgdGhpcy52YWx1ZVt0eXBlXSA9IFtdO1xuICAgIH1cbiAgICBpZiAodGhpcy5zZWxlY3RBbGxPcHRpb24pIHtcbiAgICAgIHRoaXMudXBkYXRlQWxsUGFyZW50c09yQ2hpbGRyZW4oYWxsT2ZUeXBlWzBdLCBhY3Rpb24pO1xuICAgIH1cbiAgICB0aGlzLnRyaWdnZXJWYWx1ZVVwZGF0ZSgpO1xuICB9XG5cbiAgdHJpZ2dlclZhbHVlVXBkYXRlKCkge1xuICAgIGNvbnN0IHVwZGF0ZWRPYmplY3QgPSB7fTtcbiAgICB0aGlzLnR5cGVzLmZvckVhY2goKHgpID0+ICh1cGRhdGVkT2JqZWN0W3gudmFsdWVdID0gdGhpcy52YWx1ZVt4LnZhbHVlXSkpO1xuICAgIHRoaXMudmFsdWUgPSB1cGRhdGVkT2JqZWN0O1xuICB9XG5cbiAgc2VsZWN0QWxsKGFsbE9mVHlwZSwgdHlwZSkge1xuICAgIGlmICghdGhpcy5zZWxlY3RBbGxPcHRpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYWxsT2ZUeXBlWzBdLmNoZWNrZWQgPSB0cnVlO1xuICAgIGNvbnN0IHZhbHVlcyA9IGFsbE9mVHlwZS5tYXAoKGkpID0+IHtcbiAgICAgIHJldHVybiBpLnZhbHVlO1xuICAgIH0pO1xuICAgIC8vIHJlbW92ZSAnQUxMJyB2YWx1ZVxuICAgIHZhbHVlcy5zcGxpY2UoMCwgMSk7XG4gICAgdGhpcy52YWx1ZVt0eXBlXSA9IHZhbHVlcztcbiAgICBjb25zdCB1cGRhdGVkSXRlbXMgPSB0aGlzLml0ZW1zLmZpbHRlcigoeCkgPT4geC50eXBlICE9PSB0eXBlKTtcbiAgICB0aGlzLml0ZW1zID0gdXBkYXRlZEl0ZW1zO1xuICAgIHRoaXMudXBkYXRlRGlzcGxheUl0ZW1zKGFsbE9mVHlwZVswXSwgJ2FkZCcpO1xuICB9XG5cbiAgaGFuZGxlUmVtb3ZlSXRlbUlmQWxsU2VsZWN0ZWQoaXRlbSkge1xuICAgIGlmICghdGhpcy5zZWxlY3RBbGxPcHRpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgdHlwZSA9IGl0ZW0udHlwZTtcbiAgICBjb25zdCBhbGxPZlR5cGUgPSB0aGlzLmdldEFsbE9mVHlwZSh0eXBlKTtcbiAgICBjb25zdCBhbGxJdGVtID0gYWxsT2ZUeXBlWzBdO1xuICAgIHRoaXMucmVtb3ZlSXRlbShhbGxJdGVtKTtcbiAgICBhbGxJdGVtLmluZGV0ZXJtaW5hdGUgPSB0cnVlO1xuICAgIGNvbnN0IHNlbGVjdGVkSXRlbXMgPSBhbGxPZlR5cGUuZmlsdGVyKChpKSA9PiBpLmNoZWNrZWQgPT09IHRydWUpO1xuICAgIHRoaXMuaXRlbXMgPSBbLi4udGhpcy5pdGVtcywgLi4uc2VsZWN0ZWRJdGVtc107XG4gICAgY29uc3QgdmFsdWVzID0gc2VsZWN0ZWRJdGVtcy5tYXAoKGkpID0+IHtcbiAgICAgIHJldHVybiBpLnZhbHVlO1xuICAgIH0pO1xuICAgIHRoaXMudmFsdWVbdHlwZV0gPSBbLi4udmFsdWVzXTtcbiAgfVxuXG4gIGhhbmRsZU91dHNpZGVDbGljayhldmVudCkge1xuICAgIC8vIElmIHRoZSBlbGVtZW50cyBkb2Vzbid0IGNvbnRhaW4gdGhlIHRhcmdldCBlbGVtZW50LCBpdCBpcyBhbiBvdXRzaWRlIGNsaWNrXG4gICAgaWYgKCF0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICB0aGlzLmJsdXIuZW1pdChldmVudCk7XG4gICAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0QWxsT2ZUeXBlKHR5cGUpIHtcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9ucy5maWx0ZXIoKHgpID0+IHgudHlwZSA9PT0gdHlwZSlbMF0ub3JpZ2luYWxEYXRhO1xuICB9XG5cbiAgdXBkYXRlUGFyZW50T3JDaGlsZHJlbihpdGVtLCBhY3Rpb24pIHtcbiAgICBpZiAodGhpcy5zdHJpY3RSZWxhdGlvbnNoaXAgJiYgaXRlbS5pc1BhcmVudE9mKSB7XG4gICAgICB0aGlzLnVwZGF0ZUNoaWxkcmVuVmFsdWUoaXRlbSwgYWN0aW9uKTtcbiAgICB9IGVsc2UgaWYgKGl0ZW0uaXNDaGlsZE9mICYmIHRoaXMuc2VsZWN0QWxsT3B0aW9uKSB7XG4gICAgICB0aGlzLnVwZGF0ZVBhcmVudFZhbHVlKGl0ZW0sIGFjdGlvbik7XG4gICAgfVxuICB9XG5cbiAgbW9kaWZ5QWZmZWN0ZWRQYXJlbnRzT3JDaGlsZHJlbihzZWxlY3RpbmcsIGl0ZW1DaGFuZ2VkKSB7XG4gICAgaWYgKCFpdGVtQ2hhbmdlZC5pc0NoaWxkT2YgJiYgIWl0ZW1DaGFuZ2VkLmlzUGFyZW50T2YpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy50eXBlcy5maWx0ZXIoKHgpID0+ICEheC5pc1BhcmVudE9mKVswXTtcbiAgICBjb25zdCBwYXJlbnRUeXBlID0gcGFyZW50LnZhbHVlO1xuICAgIGNvbnN0IGFsbFBhcmVudFR5cGUgPSB0aGlzLmdldEFsbE9mVHlwZShwYXJlbnRUeXBlKTtcbiAgICBjb25zdCBjaGlsZFR5cGUgPSBhbGxQYXJlbnRUeXBlWzBdLmlzUGFyZW50T2Y7XG4gICAgY29uc3QgYWxsQ2hpbGRyZW4gPSB0aGlzLmdldEFsbE9mVHlwZShjaGlsZFR5cGUpO1xuICAgIGNvbnN0IGFsbENoZWNrZWRDaGlsZHJlbiA9IGFsbENoaWxkcmVuLmZpbHRlcigoeCkgPT4gISF4LmNoZWNrZWQpO1xuXG4gICAgYWxsUGFyZW50VHlwZS5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgIGlmIChvYmoudmFsdWUgPT09ICdBTEwnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHNlbGVjdGVkQ2hpbGRyZW5PZlBhcmVudCA9IGFsbENoZWNrZWRDaGlsZHJlbi5maWx0ZXIoKHgpID0+IHtcbiAgICAgICAgcmV0dXJuIHhbcGFyZW50VHlwZV0uZmlsdGVyKCh5KSA9PiB5ID09PSBvYmoudmFsdWUpLmxlbmd0aCA+IDA7XG4gICAgICB9KTtcblxuICAgICAgaWYgKHNlbGVjdGluZykge1xuICAgICAgICBpZiAob2JqLmNoZWNrZWQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgb2JqLmluZGV0ZXJtaW5hdGUgPSBzZWxlY3RlZENoaWxkcmVuT2ZQYXJlbnQubGVuZ3RoID4gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGFsbENoaWxkcmVuT2ZQYXJlbnQgPSBhbGxDaGlsZHJlbi5maWx0ZXIoKHgpID0+IHtcbiAgICAgICAgICByZXR1cm4geC52YWx1ZSAhPT0gJ0FMTCcgJiYgeFtwYXJlbnRUeXBlXS5maWx0ZXIoKHkpID0+IHkgPT09IG9iai52YWx1ZSkubGVuZ3RoID4gMDtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChzZWxlY3RlZENoaWxkcmVuT2ZQYXJlbnQubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGlmIChvYmouY2hlY2tlZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RyaWN0UmVsYXRpb25zaGlwICYmIGFsbENoaWxkcmVuT2ZQYXJlbnQubGVuZ3RoICE9PSBzZWxlY3RlZENoaWxkcmVuT2ZQYXJlbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIG9iai5pbmRldGVybWluYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgb2JqLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgdGhpcy5yZW1vdmVWYWx1ZShvYmopO1xuICAgICAgICAgICAgICB0aGlzLmFkZEluZGl2aWR1YWxDaGlsZHJlbihzZWxlY3RlZENoaWxkcmVuT2ZQYXJlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvYmouaW5kZXRlcm1pbmF0ZSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0aGlzLnN0cmljdFJlbGF0aW9uc2hpcCAmJiBpdGVtQ2hhbmdlZC50eXBlICE9PSBwYXJlbnRUeXBlKSB7XG4gICAgICAgICAgICBpZiAob2JqLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgb2JqLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgdGhpcy5yZW1vdmVWYWx1ZShvYmopO1xuICAgICAgICAgICAgICB0aGlzLmFkZEluZGl2aWR1YWxDaGlsZHJlbihzZWxlY3RlZENoaWxkcmVuT2ZQYXJlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvYmouaW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xuICAgICAgICAgIGlmIChhbGxDaGlsZHJlbk9mUGFyZW50Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gaWYgaXQgaGFzIG5vIGNoaWxkcmVuIGFuZCBpcyBjaGVja2VkLCBpdCBzaG91bGQgc3RheSBjaGVja2VkXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0cmljdFJlbGF0aW9uc2hpcCAmJiBpdGVtQ2hhbmdlZC50eXBlICE9PSBwYXJlbnRUeXBlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZShudWxsLCBvYmopO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICh0aGlzLnNlbGVjdEFsbE9wdGlvbikge1xuICAgICAgdGhpcy51cGRhdGVJbmRldGVybWluYXRlU3RhdGVzKGFsbFBhcmVudFR5cGUsIGFsbENoaWxkcmVuLCBhbGxDaGVja2VkQ2hpbGRyZW4pO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZUFsbFBhcmVudHNPckNoaWxkcmVuKGFsbEl0ZW0sIGFjdGlvbikge1xuICAgIGlmIChhbGxJdGVtLmlzUGFyZW50T2YpIHtcbiAgICAgIHRoaXMudXBkYXRlQWxsQ2hpbGRyZW5WYWx1ZShhbGxJdGVtLCBhY3Rpb24pO1xuICAgIH0gZWxzZSBpZiAoYWxsSXRlbS5pc0NoaWxkT2YpIHtcbiAgICAgIHRoaXMudXBkYXRlQWxsUGFyZW50VmFsdWUoYWxsSXRlbSwgYWN0aW9uKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVBbGxDaGlsZHJlblZhbHVlKGl0ZW0sIGFjdGlvbikge1xuICAgIGNvbnN0IHNlbGVjdGluZyA9IGFjdGlvbiA9PT0gJ3NlbGVjdCc7XG4gICAgY29uc3QgY2hpbGRUeXBlID0gaXRlbS5pc1BhcmVudE9mO1xuICAgIGNvbnN0IHBvdGVudGlhbENoaWxkcmVuID0gdGhpcy5nZXRBbGxPZlR5cGUoY2hpbGRUeXBlKTtcbiAgICBpZiAodGhpcy5zZWxlY3RBbGxPcHRpb24gJiYgdGhpcy5hbGxPZlR5cGVTZWxlY3RlZChjaGlsZFR5cGUpICYmICFzZWxlY3RpbmcpIHtcbiAgICAgIHRoaXMucmVtb3ZlKG51bGwsIHBvdGVudGlhbENoaWxkcmVuWzBdKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcG90ZW50aWFsQ2hpbGRyZW4uZm9yRWFjaCgoeCkgPT4ge1xuICAgICAgaWYgKHgudmFsdWUgPT09ICdBTEwnICYmICF4LmNoZWNrZWQpIHtcbiAgICAgICAgaWYgKHNlbGVjdGluZykge1xuICAgICAgICAgIHguY2hlY2tlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgeC5pbmRldGVybWluYXRlID0gc2VsZWN0aW5nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHguY2hlY2tlZCAmJiAhc2VsZWN0aW5nKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmUobnVsbCwgeCk7XG4gICAgICAgIH1cbiAgICAgICAgeC5jaGVja2VkID0gc2VsZWN0aW5nO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlQWxsUGFyZW50VmFsdWUoaXRlbSwgYWN0aW9uKSB7XG4gICAgY29uc3Qgc2VsZWN0aW5nID0gYWN0aW9uID09PSAnc2VsZWN0JztcbiAgICBjb25zdCBwYXJlbnRUeXBlID0gaXRlbS5pc0NoaWxkT2Y7XG4gICAgY29uc3QgcG90ZW50aWFsUGFyZW50cyA9IHRoaXMuZ2V0QWxsT2ZUeXBlKHBhcmVudFR5cGUpO1xuICAgIHBvdGVudGlhbFBhcmVudHMuZm9yRWFjaCgoeCkgPT4ge1xuICAgICAgaWYgKCF4LmNoZWNrZWQpIHtcbiAgICAgICAgeC5pbmRldGVybWluYXRlID0gc2VsZWN0aW5nO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlSW5kZXRlcm1pbmF0ZVN0YXRlcyhhbGxQYXJlbnRUeXBlLCBhbGxDaGlsZHJlbiwgYWxsQ2hlY2tlZENoaWxkcmVuKSB7XG4gICAgY29uc3QgYWxsQ2hlY2tlZE9ySW5kZXRlcm1pbmF0ZVBhcmVudHMgPSBhbGxQYXJlbnRUeXBlLmZpbHRlcigoeCkgPT4gKCEheC5jaGVja2VkIHx8ICEheC5pbmRldGVybWluYXRlKSAmJiB4LnZhbHVlICE9PSAnQUxMJyk7XG4gICAgY29uc3QgaXNQYXJlbnRJbmRldGVybWluYXRlID0gISFhbGxQYXJlbnRUeXBlWzBdLmNoZWNrZWQgPyBmYWxzZSA6IGFsbENoZWNrZWRPckluZGV0ZXJtaW5hdGVQYXJlbnRzLmxlbmd0aCA+IDA7XG4gICAgY29uc3QgaXNDaGlsZEluZGV0ZXJtaW5hdGUgPSAhIWFsbENoaWxkcmVuWzBdLmNoZWNrZWQgPyBmYWxzZSA6IGFsbENoZWNrZWRDaGlsZHJlbi5sZW5ndGggPiAwO1xuICAgIHRoaXMuc2V0SW5kZXRlcm1pbmF0ZVN0YXRlKGFsbFBhcmVudFR5cGUsIGlzUGFyZW50SW5kZXRlcm1pbmF0ZSk7XG4gICAgdGhpcy5zZXRJbmRldGVybWluYXRlU3RhdGUoYWxsQ2hpbGRyZW4sIGlzQ2hpbGRJbmRldGVybWluYXRlKTtcbiAgfVxuXG4gIHVwZGF0ZUNoaWxkcmVuVmFsdWUocGFyZW50LCBhY3Rpb24pIHtcbiAgICBjb25zdCBzZWxlY3RpbmcgPSBhY3Rpb24gPT09ICdzZWxlY3QnO1xuICAgIGNvbnN0IGNoaWxkVHlwZSA9IHBhcmVudC5pc1BhcmVudE9mO1xuICAgIGNvbnN0IHBvdGVudGlhbENoaWxkcmVuID0gdGhpcy5nZXRBbGxPZlR5cGUoY2hpbGRUeXBlKTtcbiAgICBwb3RlbnRpYWxDaGlsZHJlbi5mb3JFYWNoKCh4KSA9PiB7XG4gICAgICBpZiAoeC52YWx1ZSA9PT0gJ0FMTCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHhbcGFyZW50LnR5cGVdLmZpbHRlcigoeSkgPT4geSA9PT0gcGFyZW50LnZhbHVlKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmICh4LmNoZWNrZWQgJiYgIXNlbGVjdGluZykge1xuICAgICAgICAgIHguY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgIGlmICh0aGlzLmFsbE9mVHlwZVNlbGVjdGVkKGNoaWxkVHlwZSkpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlUmVtb3ZlSXRlbUlmQWxsU2VsZWN0ZWQoeCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlVmFsdWUoeCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHguY2hlY2tlZCA9IHNlbGVjdGluZztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZVBhcmVudFZhbHVlKGNoaWxkLCBhY3Rpb24pIHtcbiAgICBjb25zdCBhbGxQYXJlbnRUeXBlID0gdGhpcy5nZXRBbGxPZlR5cGUoY2hpbGQuaXNDaGlsZE9mKTtcbiAgICBpZiAoYWxsUGFyZW50VHlwZVswXS5jaGVja2VkICYmIGFjdGlvbiAhPT0gJ3NlbGVjdCcpIHtcbiAgICAgIHRoaXMuaGFuZGxlUmVtb3ZlSXRlbUlmQWxsU2VsZWN0ZWQoYWxsUGFyZW50VHlwZVswXSk7XG4gICAgfVxuICB9XG5cbiAgYWRkSW5kaXZpZHVhbENoaWxkcmVuKGNoaWxkcmVuKSB7XG4gICAgbGV0IHBhcmVudEFscmVhZHlTZWxlY3RlZCA9IGZhbHNlO1xuICAgIGNoaWxkcmVuLmZvckVhY2goKHgpID0+IHtcbiAgICAgIGlmICh4LmlzQ2hpbGRPZikge1xuICAgICAgICAvLyBvbmx5IGFkZCBjaGlsZHJlbiBpZiB0aGVpciBwYXJlbnRzIGFyZSBub3QgYWxyZWFkeSBzZWxlY3RlZFxuICAgICAgICB4W3guaXNDaGlsZE9mXS5mb3JFYWNoKChwYXJlbnQpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy52YWx1ZVt4LmlzQ2hpbGRPZl0uZmlsdGVyKChwKSA9PiBwID09PSBwYXJlbnQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHBhcmVudEFscmVhZHlTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnZhbHVlW3gudHlwZV0uZmlsdGVyKChpdGVtKSA9PiBpdGVtID09PSB4LnZhbHVlKS5sZW5ndGggPT09IDAgJiYgIXBhcmVudEFscmVhZHlTZWxlY3RlZCkge1xuICAgICAgICB0aGlzLmFkZCh4KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNldEluaXRpYWxWYWx1ZShtb2RlbCk6IHZvaWQge1xuICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICB0aGlzLnZhbHVlID0gbW9kZWwgfHwge307XG4gICAgaWYgKCF0aGlzLnR5cGVzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudHlwZXMuZm9yRWFjaCgodHlwZU9iaikgPT4ge1xuICAgICAgY29uc3QgdHlwZSA9IHR5cGVPYmoudmFsdWU7XG4gICAgICBpZiAodGhpcy52YWx1ZVt0eXBlXSkge1xuICAgICAgICBsZXQgaW5kZXRlcm1pbmF0ZUlzU2V0ID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLnVwZGF0ZUFsbEl0ZW1TdGF0ZSh0eXBlKTtcbiAgICAgICAgY29uc3Qgb3B0aW9uc0J5VHlwZSA9IG9wdGlvbnMuYWxsT2ZUeXBlO1xuICAgICAgICBjb25zdCBhbGxTZWxlY3RlZCA9IG9wdGlvbnMuYWxsT2ZUeXBlU2VsZWN0ZWQ7XG4gICAgICAgIHRoaXMudmFsdWVbdHlwZV0uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGlmICghYWxsU2VsZWN0ZWQgJiYgIWluZGV0ZXJtaW5hdGVJc1NldCkge1xuICAgICAgICAgICAgaW5kZXRlcm1pbmF0ZUlzU2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc2V0SW5kZXRlcm1pbmF0ZVN0YXRlKG9wdGlvbnNCeVR5cGUsIHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IG9wdGlvbnNCeVR5cGUuZmlsdGVyKCh4KSA9PiB4LnZhbHVlID09PSBpdGVtKVswXTtcbiAgICAgICAgICB2YWx1ZS5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICBpZiAoIWFsbFNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZURpc3BsYXlJdGVtcyh2YWx1ZSwgJ2FkZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5zdHJpY3RSZWxhdGlvbnNoaXAgJiYgdmFsdWUuaXNQYXJlbnRPZikge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVDaGlsZHJlblZhbHVlKHZhbHVlLCAnc2VsZWN0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHR5cGVPYmouaXNDaGlsZE9mKSB7XG4gICAgICAgICAgdGhpcy5tb2RpZnlBZmZlY3RlZFBhcmVudHNPckNoaWxkcmVuKHRydWUsIHsgdmFsdWU6IHR5cGUsIGlzQ2hpbGRPZjogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy52YWx1ZVt0eXBlXSA9IFtdO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYWxsSXRlbXNTZWxlY3RlZChvcHRpb25zQnlUeXBlLCB0eXBlKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWVbdHlwZV0ubGVuZ3RoID09PSBvcHRpb25zQnlUeXBlLmxlbmd0aCAtIDE7XG4gIH1cblxuICAvLyBTZXQgdG91Y2hlZCBvbiBibHVyXG4gIG9uVG91Y2hlZChlKSB7XG4gICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XG4gICAgdGhpcy5ibHVyLmVtaXQoZSk7XG4gIH1cblxuICB3cml0ZVZhbHVlKG1vZGVsOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG4gICAgdGhpcy5zZXRJbml0aWFsVmFsdWUobW9kZWwpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcbiAgfVxufVxuIl19
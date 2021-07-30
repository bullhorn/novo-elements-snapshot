// NG2
import { Component, ElementRef, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// Vendor
import { ReplaySubject } from 'rxjs';
import { NovoLabelService } from '../../services/novo-label-service';
import { Helpers } from '../../utils/Helpers';
import { KeyCodes } from '../../utils/key-codes/KeyCodes';
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
        if (event.keyCode === KeyCodes.BACKSPACE) {
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
NovoMultiPickerElement.decorators = [
    { type: Component, args: [{
                selector: 'multi-picker',
                providers: [CHIPS_VALUE_ACCESSOR],
                template: `
    <chip
      *ngFor="let item of (_items | async | slice: 0:chipsCount)"
      [type]="item.type"
      [class.selected]="item == selected"
      (remove)="removeFromDisplay($event, item)"
      (select)="select($event, item)"
    >
      {{ item.label }}
    </chip>
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
                }
            },] }
];
NovoMultiPickerElement.ctorParameters = () => [
    { type: ElementRef },
    { type: NovoLabelService }
];
NovoMultiPickerElement.propDecorators = {
    source: [{ type: Input }],
    placeholder: [{ type: Input }],
    types: [{ type: Input }],
    changed: [{ type: Output }],
    focus: [{ type: Output }],
    blur: [{ type: Output }],
    value: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXVsdGlQaWNrZXIuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL211bHRpLXBpY2tlci9NdWx0aVBpY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZHLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELFNBQVM7QUFDVCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFMUQsc0RBQXNEO0FBQ3RELE1BQU0sb0JBQW9CLEdBQUc7SUFDM0IsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHNCQUFzQixDQUFDO0lBQ3JELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQThDRixNQUFNLE9BQU8sc0JBQXNCO0lBK0NqQyxZQUFtQixPQUFtQixFQUFTLE1BQXdCO1FBQXBELFlBQU8sR0FBUCxPQUFPLENBQVk7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQTNDdkUsZ0JBQVcsR0FBUSxFQUFFLENBQUM7UUFJdEIsWUFBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWhELFVBQUssR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU5QyxTQUFJLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7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QUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxFQUFZO1FBQzNCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxFQUFZO1FBQzVCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO0lBQzNCLENBQUM7OztZQXJtQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4QixTQUFTLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztnQkFDakMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4QlQ7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLG9CQUFvQixFQUFFLGtCQUFrQjtpQkFDekM7YUFDRjs7O1lBMURtQixVQUFVO1lBSXJCLGdCQUFnQjs7O3FCQXdEdEIsS0FBSzswQkFFTCxLQUFLO29CQUVMLEtBQUs7c0JBRUwsTUFBTTtvQkFFTixNQUFNO21CQUVOLE1BQU07b0JBT04sS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxyXG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG4vLyBWZW5kb3JcclxuaW1wb3J0IHsgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbm92by1sYWJlbC1zZXJ2aWNlJztcclxuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJy4uLy4uL3V0aWxzL0hlbHBlcnMnO1xyXG5pbXBvcnQgeyBLZXlDb2RlcyB9IGZyb20gJy4uLy4uL3V0aWxzL2tleS1jb2Rlcy9LZXlDb2Rlcyc7XHJcblxyXG4vLyBWYWx1ZSBhY2Nlc3NvciBmb3IgdGhlIGNvbXBvbmVudCAoc3VwcG9ydHMgbmdNb2RlbClcclxuY29uc3QgQ0hJUFNfVkFMVUVfQUNDRVNTT1IgPSB7XHJcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm92b011bHRpUGlja2VyRWxlbWVudCksXHJcbiAgbXVsdGk6IHRydWUsXHJcbn07XHJcblxyXG5pbnRlcmZhY2UgSXRlbSB7XHJcbiAgdHlwZTtcclxuICBsYWJlbDtcclxuICB2YWx1ZTtcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtdWx0aS1waWNrZXInLFxyXG4gIHByb3ZpZGVyczogW0NISVBTX1ZBTFVFX0FDQ0VTU09SXSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGNoaXBcclxuICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2YgKF9pdGVtcyB8IGFzeW5jIHwgc2xpY2U6IDA6Y2hpcHNDb3VudClcIlxyXG4gICAgICBbdHlwZV09XCJpdGVtLnR5cGVcIlxyXG4gICAgICBbY2xhc3Muc2VsZWN0ZWRdPVwiaXRlbSA9PSBzZWxlY3RlZFwiXHJcbiAgICAgIChyZW1vdmUpPVwicmVtb3ZlRnJvbURpc3BsYXkoJGV2ZW50LCBpdGVtKVwiXHJcbiAgICAgIChzZWxlY3QpPVwic2VsZWN0KCRldmVudCwgaXRlbSlcIlxyXG4gICAgPlxyXG4gICAgICB7eyBpdGVtLmxhYmVsIH19XHJcbiAgICA8L2NoaXA+XHJcbiAgICA8ZGl2ICpuZ0lmPVwiaXRlbXMubGVuZ3RoID4gY2hpcHNDb3VudFwiPlxyXG4gICAgICA8dWwgY2xhc3M9XCJzdW1tYXJ5XCI+XHJcbiAgICAgICAgPGxpICpuZ0Zvcj1cImxldCB0eXBlIG9mIG5vdFNob3duXCI+KyB7eyB0eXBlLmNvdW50IH19IHt7IGxhYmVscy5tb3JlIH19IHt7IHR5cGUudHlwZSB9fTwvbGk+XHJcbiAgICAgIDwvdWw+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJjaGlwLWlucHV0LWNvbnRhaW5lclwiPlxyXG4gICAgICA8bm92by1waWNrZXJcclxuICAgICAgICBjbGVhclZhbHVlT25TZWxlY3Q9XCJ0cnVlXCJcclxuICAgICAgICBbY29uZmlnXT1cInNvdXJjZVwiXHJcbiAgICAgICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcclxuICAgICAgICAoc2VsZWN0KT1cImNsaWNrT3B0aW9uKCRldmVudClcIlxyXG4gICAgICAgIChrZXlkb3duKT1cIm9uS2V5RG93bigkZXZlbnQpXCJcclxuICAgICAgICAoZm9jdXMpPVwib25Gb2N1cygkZXZlbnQpXCJcclxuICAgICAgICAoYmx1cik9XCJvblRvdWNoZWQoJGV2ZW50KVwiXHJcbiAgICAgICAgW292ZXJyaWRlRWxlbWVudF09XCJlbGVtZW50XCJcclxuICAgICAgPlxyXG4gICAgICA8L25vdm8tcGlja2VyPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8aSBjbGFzcz1cImJoaS1zZWFyY2hcIiBbY2xhc3MuaGFzLXZhbHVlXT1cIml0ZW1zLmxlbmd0aFwiPjwvaT5cclxuICAgIDxsYWJlbCBjbGFzcz1cImNsZWFyLWFsbFwiICpuZ0lmPVwiaXRlbXMubGVuZ3RoXCIgKGNsaWNrKT1cImNsZWFyVmFsdWUoKVwiPnt7IGxhYmVscy5jbGVhckFsbCB9fSA8aSBjbGFzcz1cImJoaS10aW1lc1wiPjwvaT48L2xhYmVsPlxyXG4gIGAsXHJcbiAgaG9zdDoge1xyXG4gICAgJ1tjbGFzcy53aXRoLXZhbHVlXSc6ICdpdGVtcy5sZW5ndGggPiAwJyxcclxuICB9LFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b011bHRpUGlja2VyRWxlbWVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KClcclxuICBzb3VyY2U6IHsgb3B0aW9uczogW107IHJlc3VsdHNUZW1wbGF0ZTsgc2VsZWN0QWxsT3B0aW9uOiBib29sZWFuOyBjaGlwc0NvdW50OyBzdHJpY3RSZWxhdGlvbnNoaXAgfTtcclxuICBASW5wdXQoKVxyXG4gIHBsYWNlaG9sZGVyOiBhbnkgPSAnJztcclxuICBASW5wdXQoKVxyXG4gIHR5cGVzOiB7IHZhbHVlOyBzaW5ndWxhcjsgcGx1cmFsOyBpc1BhcmVudE9mOyBpc0NoaWxkT2YgfVtdO1xyXG4gIEBPdXRwdXQoKVxyXG4gIGNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKVxyXG4gIGZvY3VzOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KClcclxuICBibHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgZ2V0IHZhbHVlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgdmFsdWUoc2VsZWN0ZWRJdGVtcykge1xyXG4gICAgaWYgKHNlbGVjdGVkSXRlbXMpIHtcclxuICAgICAgdGhpcy50eXBlcy5mb3JFYWNoKCh4KSA9PiAodGhpcy5fdmFsdWVbeC52YWx1ZV0gPSBzZWxlY3RlZEl0ZW1zW3gudmFsdWVdKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl92YWx1ZSA9IHt9O1xyXG4gICAgICB0aGlzLnR5cGVzLmZvckVhY2goKHgpID0+ICh0aGlzLl92YWx1ZVt4LnZhbHVlXSA9IFtdKSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNoYW5nZWQuZW1pdChzZWxlY3RlZEl0ZW1zKTtcclxuICAgIHRoaXMub25Nb2RlbENoYW5nZShzZWxlY3RlZEl0ZW1zKTtcclxuICB9XHJcblxyXG4gIGl0ZW1zOiBJdGVtW10gPSBbXTtcclxuICBfaXRlbXMgPSBuZXcgUmVwbGF5U3ViamVjdDxJdGVtW10+KDEpO1xyXG4gIG9wdGlvbnM6IGFueTtcclxuICBfb3B0aW9uczogYW55O1xyXG4gIHNlbGVjdGVkOiBhbnkgPSBudWxsO1xyXG4gIGNvbmZpZzogYW55ID0ge307XHJcbiAgY2hpcHNDb3VudDogbnVtYmVyO1xyXG4gIHNlbGVjdEFsbE9wdGlvbjogYm9vbGVhbjtcclxuICBzdHJpY3RSZWxhdGlvbnNoaXA6IGJvb2xlYW47XHJcbiAgLy8gcHJpdmF0ZSBkYXRhIG1vZGVsXHJcbiAgX3ZhbHVlID0ge307XHJcbiAgbm90U2hvd246IGFueSA9IHt9O1xyXG4gIC8vIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrc1xyXG4gIG1vZGVsOiBhbnk7XHJcbiAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7IH07XHJcbiAgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4geyB9O1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZiwgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSkge1xyXG4gICAgdGhpcy5jaGlwc0NvdW50ID0gNDtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5zZWxlY3RBbGxPcHRpb24gPSB0aGlzLnNvdXJjZS5zZWxlY3RBbGxPcHRpb24gfHwgZmFsc2U7XHJcbiAgICB0aGlzLmNoaXBzQ291bnQgPSB0aGlzLnNvdXJjZS5jaGlwc0NvdW50IHx8IDQ7XHJcbiAgICB0aGlzLnN0cmljdFJlbGF0aW9uc2hpcCA9IHRoaXMuc291cmNlLnN0cmljdFJlbGF0aW9uc2hpcCB8fCBmYWxzZTtcclxuICAgIHRoaXMuc2V0dXBPcHRpb25zKCk7XHJcbiAgfVxyXG5cclxuICBjbGVhclZhbHVlKCkge1xyXG4gICAgdGhpcy50eXBlcy5mb3JFYWNoKCh0eXBlKSA9PiB0aGlzLm1vZGlmeUFsbE9mVHlwZSh0eXBlLnZhbHVlLCAndW5zZWxlY3QnKSk7XHJcbiAgICB0aGlzLml0ZW1zID0gW107XHJcbiAgICB0aGlzLl9pdGVtcy5uZXh0KHRoaXMuaXRlbXMpO1xyXG4gICAgdGhpcy5zZXRJbml0aWFsVmFsdWUobnVsbCk7XHJcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVGcm9tRGlzcGxheShldmVudCwgaXRlbSkge1xyXG4gICAgdGhpcy5yZW1vdmUodHJ1ZSwgaXRlbSk7XHJcbiAgICB0aGlzLm1vZGlmeUFmZmVjdGVkUGFyZW50c09yQ2hpbGRyZW4oZmFsc2UsIGl0ZW0pO1xyXG4gIH1cclxuXHJcbiAgc2V0dXBPcHRpb25zKCkge1xyXG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5zb3VyY2Uub3B0aW9ucyB8fCBbXTtcclxuICAgIHRoaXMuX29wdGlvbnMgPSBbXTtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcclxuICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZE9wdGlvbiA9IHRoaXMuc2V0dXBPcHRpb25zQnlUeXBlKG9wdGlvbik7XHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucy5wdXNoKGZvcm1hdHRlZE9wdGlvbik7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zb3VyY2Uub3B0aW9ucyA9IHRoaXMuX29wdGlvbnM7XHJcbiAgfVxyXG5cclxuICBzZXR1cE9wdGlvbnNCeVR5cGUoc2VjdGlvbikge1xyXG4gICAgY29uc3QgZm9ybWF0dGVkU2VjdGlvbjogYW55ID0ge1xyXG4gICAgICB0eXBlOiBzZWN0aW9uLnR5cGUsXHJcbiAgICAgIGxhYmVsOiBzZWN0aW9uLmxhYmVsIHx8IHNlY3Rpb24udHlwZSxcclxuICAgIH07XHJcbiAgICBmb3JtYXR0ZWRTZWN0aW9uLmRhdGEgPSBzZWN0aW9uLmRhdGEubWFwKChpdGVtKSA9PiB7XHJcbiAgICAgIHJldHVybiB0aGlzLmZvcm1hdE9wdGlvbihzZWN0aW9uLCBpdGVtKTtcclxuICAgIH0pO1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0QWxsT3B0aW9uKSB7XHJcbiAgICAgIGNvbnN0IHNlbGVjdEFsbCA9IHRoaXMuY3JlYXRlU2VsZWN0QWxsT3B0aW9uKHNlY3Rpb24pO1xyXG4gICAgICBmb3JtYXR0ZWRTZWN0aW9uLmRhdGEuc3BsaWNlKDAsIDAsIHNlbGVjdEFsbCk7XHJcbiAgICB9XHJcbiAgICBmb3JtYXR0ZWRTZWN0aW9uLm9yaWdpbmFsRGF0YSA9IGZvcm1hdHRlZFNlY3Rpb24uZGF0YS5zbGljZSgpO1xyXG4gICAgcmV0dXJuIGZvcm1hdHRlZFNlY3Rpb247XHJcbiAgfVxyXG5cclxuICBmb3JtYXRPcHRpb24oc2VjdGlvbiwgaXRlbSkge1xyXG4gICAgY29uc3Qgb2JqID0ge1xyXG4gICAgICB2YWx1ZTogc2VjdGlvbi5maWVsZCA/IGl0ZW1bc2VjdGlvbi5maWVsZF0gOiBpdGVtLnZhbHVlIHx8IGl0ZW0sXHJcbiAgICAgIGxhYmVsOiBzZWN0aW9uLmZvcm1hdCA/IEhlbHBlcnMuaW50ZXJwb2xhdGUoc2VjdGlvbi5mb3JtYXQsIGl0ZW0pIDogaXRlbS5sYWJlbCB8fCBTdHJpbmcoaXRlbS52YWx1ZSB8fCBpdGVtKSxcclxuICAgICAgdHlwZTogc2VjdGlvbi50eXBlLFxyXG4gICAgICBjaGVja2VkOiB1bmRlZmluZWQsXHJcbiAgICAgIGlzUGFyZW50T2Y6IHNlY3Rpb24uaXNQYXJlbnRPZixcclxuICAgICAgaXNDaGlsZE9mOiBzZWN0aW9uLmlzQ2hpbGRPZixcclxuICAgIH07XHJcbiAgICBpZiAob2JqLmlzQ2hpbGRPZikge1xyXG4gICAgICBvYmpbc2VjdGlvbi5pc0NoaWxkT2ZdID0gaXRlbVtzZWN0aW9uLmlzQ2hpbGRPZl07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2JqO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlU2VsZWN0QWxsT3B0aW9uKHNlY3Rpb24pIHtcclxuICAgIGNvbnN0IHNlbGVjdEFsbCA9IHtcclxuICAgICAgdmFsdWU6ICdBTEwnLFxyXG4gICAgICBsYWJlbDogYEFsbCAke3NlY3Rpb24udHlwZX1gLFxyXG4gICAgICB0eXBlOiBzZWN0aW9uLnR5cGUsXHJcbiAgICAgIGNoZWNrZWQ6IHRoaXMubW9kZWwgJiYgdGhpcy5tb2RlbC5sZW5ndGggJiYgdGhpcy5tb2RlbC5pbmRleE9mKCdBTEwnKSAhPT0gLTEsXHJcbiAgICAgIGlzUGFyZW50T2Y6IHNlY3Rpb24uaXNQYXJlbnRPZixcclxuICAgICAgaXNDaGlsZE9mOiBzZWN0aW9uLmlzQ2hpbGRPZixcclxuICAgIH07XHJcbiAgICBpZiAoc2VjdGlvbi5pc0NoaWxkT2YpIHtcclxuICAgICAgY29uc3QgYWxsUGFyZW50cyA9IHNlY3Rpb24uZGF0YS5yZWR1Y2UoKGFjY3VtLCBuZXh0KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGFjY3VtLmNvbmNhdChuZXh0W3NlY3Rpb24uaXNDaGlsZE9mXSk7XHJcbiAgICAgIH0sIFtdKTtcclxuICAgICAgc2VsZWN0QWxsW3NlY3Rpb24uaXNDaGlsZE9mXSA9IGFsbFBhcmVudHM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2VsZWN0QWxsO1xyXG4gIH1cclxuXHJcbiAgZGVzZWxlY3RBbGwoKSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkID0gbnVsbDtcclxuICB9XHJcblxyXG4gIHNlbGVjdChldmVudCwgaXRlbSkge1xyXG4gICAgdGhpcy5ibHVyLmVtaXQoZXZlbnQpO1xyXG4gICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xyXG4gICAgdGhpcy5zZWxlY3RlZCA9IGl0ZW07XHJcbiAgfVxyXG5cclxuICBvbkZvY3VzKGUpIHtcclxuICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICB0aGlzLmZvY3VzLmVtaXQoZSk7XHJcbiAgfVxyXG5cclxuICBjbGlja09wdGlvbihldmVudCkge1xyXG4gICAgaWYgKGV2ZW50ICYmICEoZXZlbnQgaW5zdGFuY2VvZiBFdmVudCkpIHtcclxuICAgICAgaWYgKGV2ZW50LmNoZWNrZWQgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmUobnVsbCwgZXZlbnQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuYWRkKGV2ZW50KTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLm1vZGlmeUFmZmVjdGVkUGFyZW50c09yQ2hpbGRyZW4oZXZlbnQuY2hlY2tlZCwgZXZlbnQpO1xyXG4gICAgICAvLyBTZXQgZm9jdXMgb24gdGhlIHBpY2tlclxyXG4gICAgICBjb25zdCBpbnB1dCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ25vdm8tcGlja2VyID4gaW5wdXQnKTtcclxuICAgICAgaWYgKGlucHV0KSB7XHJcbiAgICAgICAgaW5wdXQuZm9jdXMoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYWRkKGV2ZW50KSB7XHJcbiAgICBpZiAoZXZlbnQudmFsdWUgPT09ICdBTEwnKSB7XHJcbiAgICAgIHRoaXMubW9kaWZ5QWxsT2ZUeXBlKGV2ZW50LnR5cGUsICdzZWxlY3QnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudXBkYXRlRGlzcGxheUl0ZW1zKGV2ZW50LCAnYWRkJyk7XHJcbiAgICAgIHRoaXMudmFsdWVbZXZlbnQudHlwZV0ucHVzaChldmVudC52YWx1ZSk7XHJcbiAgICAgIHRoaXMudXBkYXRlQWxsSXRlbVN0YXRlKGV2ZW50LnR5cGUpO1xyXG4gICAgICB0aGlzLnRyaWdnZXJWYWx1ZVVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy51cGRhdGVQYXJlbnRPckNoaWxkcmVuKGV2ZW50LCAnc2VsZWN0Jyk7XHJcbiAgICB0aGlzLnNlbGVjdChudWxsLCBldmVudCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVBbGxJdGVtU3RhdGUodHlwZSkge1xyXG4gICAgY29uc3QgYWxsT2ZUeXBlID0gdGhpcy5nZXRBbGxPZlR5cGUodHlwZSk7XHJcbiAgICBjb25zdCBhbGxPZlR5cGVTZWxlY3RlZCA9IHRoaXMuYWxsSXRlbXNTZWxlY3RlZChhbGxPZlR5cGUsIHR5cGUpO1xyXG4gICAgaWYgKGFsbE9mVHlwZVNlbGVjdGVkKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0QWxsKGFsbE9mVHlwZSwgdHlwZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4geyBhbGxPZlR5cGUsIGFsbE9mVHlwZVNlbGVjdGVkIH07XHJcbiAgfVxyXG5cclxuICBzZXRJbmRldGVybWluYXRlU3RhdGUoYWxsT2ZUeXBlLCBzdGF0dXMpIHtcclxuICAgIGlmICghdGhpcy5zZWxlY3RBbGxPcHRpb24pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgYWxsSXRlbSA9IGFsbE9mVHlwZVswXTtcclxuICAgIGFsbEl0ZW0uaW5kZXRlcm1pbmF0ZSA9IHN0YXR1cztcclxuICB9XHJcblxyXG4gIHVwZGF0ZURpc3BsYXlJdGVtcyhpdGVtLCBhY3Rpb24pIHtcclxuICAgIGNvbnN0IGFkZGluZyA9IGFjdGlvbiA9PT0gJ2FkZCc7XHJcbiAgICBpZiAoYWRkaW5nKSB7XHJcbiAgICAgIHRoaXMuaXRlbXMucHVzaChpdGVtKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0aGlzLml0ZW1zLmluZGV4T2YoaXRlbSkgPiAtMSkge1xyXG4gICAgICAgIHRoaXMuaXRlbXMuc3BsaWNlKHRoaXMuaXRlbXMuaW5kZXhPZihpdGVtKSwgMSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMudXBkYXRlRGlzcGxheVRleHQodGhpcy5pdGVtcyk7XHJcbiAgICB0aGlzLl9pdGVtcy5uZXh0KHRoaXMuaXRlbXMpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlRGlzcGxheVRleHQoaXRlbXMpIHtcclxuICAgIHRoaXMubm90U2hvd24gPSBbXTtcclxuICAgIGNvbnN0IG5vdFNob3duID0gaXRlbXMuc2xpY2UodGhpcy5jaGlwc0NvdW50KTtcclxuICAgIGlmIChub3RTaG93bi5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHRoaXMudHlwZXMuZm9yRWFjaCgodHlwZSkgPT4ge1xyXG4gICAgICAgIGxldCBjb3VudDtcclxuICAgICAgICBjb25zdCBzZWxlY3RlZE9mVHlwZSA9IG5vdFNob3duLmZpbHRlcigoeCkgPT4geC50eXBlID09PSB0eXBlLnZhbHVlKTtcclxuICAgICAgICBpZiAoc2VsZWN0ZWRPZlR5cGUubGVuZ3RoID09PSAxICYmIHNlbGVjdGVkT2ZUeXBlWzBdLnZhbHVlID09PSAnQUxMJykge1xyXG4gICAgICAgICAgY291bnQgPSB0aGlzLmdldEFsbE9mVHlwZSh0eXBlLnZhbHVlKS5sZW5ndGggLSAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb3VudCA9IHNlbGVjdGVkT2ZUeXBlLmxlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZGlzcGxheVR5cGUgPSBjb3VudCA9PT0gMSA/IHR5cGUuc2luZ3VsYXIgOiB0eXBlLnBsdXJhbCB8fCB0eXBlLnZhbHVlO1xyXG4gICAgICAgIGlmIChjb3VudCA+IDApIHtcclxuICAgICAgICAgIHRoaXMubm90U2hvd24ucHVzaCh7IHR5cGU6IGRpc3BsYXlUeXBlLCBjb3VudCB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVtb3ZlKGV2ZW50LCBpdGVtKSB7XHJcbiAgICBsZXQgdHJpZ2dlcmVkQnlFdmVudDtcclxuICAgIGlmIChldmVudCkge1xyXG4gICAgICB0cmlnZ2VyZWRCeUV2ZW50ID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGNvbnN0IGl0ZW1Ub1JlbW92ZSA9IGl0ZW07XHJcbiAgICBpZiAoaXRlbVRvUmVtb3ZlLnZhbHVlID09PSAnQUxMJykge1xyXG4gICAgICB0cmlnZ2VyZWRCeUV2ZW50ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMubW9kaWZ5QWxsT2ZUeXBlKGl0ZW1Ub1JlbW92ZS50eXBlLCAndW5zZWxlY3QnKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5hbGxPZlR5cGVTZWxlY3RlZChpdGVtVG9SZW1vdmUudHlwZSkpIHtcclxuICAgICAgdGhpcy5oYW5kbGVSZW1vdmVJdGVtSWZBbGxTZWxlY3RlZChpdGVtVG9SZW1vdmUpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yZW1vdmVJdGVtKGl0ZW0sIHRyaWdnZXJlZEJ5RXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlSXRlbShpdGVtLCB0cmlnZ2VyZWRCeUV2ZW50PzogYW55KSB7XHJcbiAgICBpdGVtLmNoZWNrZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcclxuICAgIHRoaXMucmVtb3ZlVmFsdWUoaXRlbSk7XHJcbiAgICBpZiAoaXRlbS52YWx1ZSAhPT0gJ0FMTCcpIHtcclxuICAgICAgdGhpcy51cGRhdGVQYXJlbnRPckNoaWxkcmVuKGl0ZW0sICd1bnNlbGVjdCcpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRyaWdnZXJlZEJ5RXZlbnQpIHtcclxuICAgICAgdGhpcy5tb2RpZnlBZmZlY3RlZFBhcmVudHNPckNoaWxkcmVuKGZhbHNlLCBpdGVtKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbW92ZVZhbHVlKGl0ZW0pIHtcclxuICAgIGNvbnN0IHVwZGF0ZWRWYWx1ZXMgPSB0aGlzLnZhbHVlW2l0ZW0udHlwZV0uZmlsdGVyKCh4KSA9PiB4ICE9PSBpdGVtLnZhbHVlKTtcclxuICAgIHRoaXMudmFsdWVbaXRlbS50eXBlXSA9IHVwZGF0ZWRWYWx1ZXM7XHJcbiAgICB0aGlzLnRyaWdnZXJWYWx1ZVVwZGF0ZSgpO1xyXG4gICAgdGhpcy51cGRhdGVEaXNwbGF5SXRlbXMoaXRlbSwgJ3JlbW92ZScpO1xyXG4gIH1cclxuXHJcbiAgb25LZXlEb3duKGV2ZW50KSB7XHJcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gS2V5Q29kZXMuQkFDS1NQQUNFKSB7XHJcbiAgICAgIGlmIChldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnZhbHVlLmxlbmd0aCA9PT0gMCAmJiB0aGlzLml0ZW1zLmxlbmd0aCkge1xyXG4gICAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZCkge1xyXG4gICAgICAgICAgdGhpcy5yZW1vdmUobnVsbCwgdGhpcy5zZWxlY3RlZCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuc2VsZWN0KGV2ZW50LCB0aGlzLml0ZW1zW3RoaXMuaXRlbXMubGVuZ3RoIC0gMV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYWxsT2ZUeXBlU2VsZWN0ZWQodHlwZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaXRlbXMuZmlsdGVyKCh4KSA9PiB4LnR5cGUgPT09IHR5cGUgJiYgeC52YWx1ZSA9PT0gJ0FMTCcpLmxlbmd0aCA+IDA7XHJcbiAgfVxyXG5cclxuICBtb2RpZnlBbGxPZlR5cGUodHlwZSwgYWN0aW9uKSB7XHJcbiAgICBjb25zdCBzZWxlY3RpbmcgPSBhY3Rpb24gPT09ICdzZWxlY3QnO1xyXG4gICAgY29uc3QgYWxsT2ZUeXBlID0gdGhpcy5nZXRBbGxPZlR5cGUodHlwZSk7XHJcbiAgICBhbGxPZlR5cGUuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICBpdGVtLmNoZWNrZWQgPSBzZWxlY3Rpbmc7XHJcbiAgICAgIGl0ZW0uaW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgICBpZiAoc2VsZWN0aW5nKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0QWxsKGFsbE9mVHlwZSwgdHlwZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLml0ZW1zID0gWy4uLnRoaXMuaXRlbXMuZmlsdGVyKCh4KSA9PiB4LnR5cGUgIT09IHR5cGUpXTtcclxuICAgICAgdGhpcy5faXRlbXMubmV4dCh0aGlzLml0ZW1zKTtcclxuICAgICAgdGhpcy52YWx1ZVt0eXBlXSA9IFtdO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuc2VsZWN0QWxsT3B0aW9uKSB7XHJcbiAgICAgIHRoaXMudXBkYXRlQWxsUGFyZW50c09yQ2hpbGRyZW4oYWxsT2ZUeXBlWzBdLCBhY3Rpb24pO1xyXG4gICAgfVxyXG4gICAgdGhpcy50cmlnZ2VyVmFsdWVVcGRhdGUoKTtcclxuICB9XHJcblxyXG4gIHRyaWdnZXJWYWx1ZVVwZGF0ZSgpIHtcclxuICAgIGNvbnN0IHVwZGF0ZWRPYmplY3QgPSB7fTtcclxuICAgIHRoaXMudHlwZXMuZm9yRWFjaCgoeCkgPT4gKHVwZGF0ZWRPYmplY3RbeC52YWx1ZV0gPSB0aGlzLnZhbHVlW3gudmFsdWVdKSk7XHJcbiAgICB0aGlzLnZhbHVlID0gdXBkYXRlZE9iamVjdDtcclxuICB9XHJcblxyXG4gIHNlbGVjdEFsbChhbGxPZlR5cGUsIHR5cGUpIHtcclxuICAgIGlmICghdGhpcy5zZWxlY3RBbGxPcHRpb24pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgYWxsT2ZUeXBlWzBdLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgY29uc3QgdmFsdWVzID0gYWxsT2ZUeXBlLm1hcCgoaSkgPT4ge1xyXG4gICAgICByZXR1cm4gaS52YWx1ZTtcclxuICAgIH0pO1xyXG4gICAgLy8gcmVtb3ZlICdBTEwnIHZhbHVlXHJcbiAgICB2YWx1ZXMuc3BsaWNlKDAsIDEpO1xyXG4gICAgdGhpcy52YWx1ZVt0eXBlXSA9IHZhbHVlcztcclxuICAgIGNvbnN0IHVwZGF0ZWRJdGVtcyA9IHRoaXMuaXRlbXMuZmlsdGVyKCh4KSA9PiB4LnR5cGUgIT09IHR5cGUpO1xyXG4gICAgdGhpcy5pdGVtcyA9IHVwZGF0ZWRJdGVtcztcclxuICAgIHRoaXMudXBkYXRlRGlzcGxheUl0ZW1zKGFsbE9mVHlwZVswXSwgJ2FkZCcpO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlUmVtb3ZlSXRlbUlmQWxsU2VsZWN0ZWQoaXRlbSkge1xyXG4gICAgaWYgKCF0aGlzLnNlbGVjdEFsbE9wdGlvbikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCB0eXBlID0gaXRlbS50eXBlO1xyXG4gICAgY29uc3QgYWxsT2ZUeXBlID0gdGhpcy5nZXRBbGxPZlR5cGUodHlwZSk7XHJcbiAgICBjb25zdCBhbGxJdGVtID0gYWxsT2ZUeXBlWzBdO1xyXG4gICAgdGhpcy5yZW1vdmVJdGVtKGFsbEl0ZW0pO1xyXG4gICAgYWxsSXRlbS5pbmRldGVybWluYXRlID0gdHJ1ZTtcclxuICAgIGNvbnN0IHNlbGVjdGVkSXRlbXMgPSBhbGxPZlR5cGUuZmlsdGVyKChpKSA9PiBpLmNoZWNrZWQgPT09IHRydWUpO1xyXG4gICAgdGhpcy5pdGVtcyA9IFsuLi50aGlzLml0ZW1zLCAuLi5zZWxlY3RlZEl0ZW1zXTtcclxuICAgIGNvbnN0IHZhbHVlcyA9IHNlbGVjdGVkSXRlbXMubWFwKChpKSA9PiB7XHJcbiAgICAgIHJldHVybiBpLnZhbHVlO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnZhbHVlW3R5cGVdID0gWy4uLnZhbHVlc107XHJcbiAgfVxyXG5cclxuICBoYW5kbGVPdXRzaWRlQ2xpY2soZXZlbnQpIHtcclxuICAgIC8vIElmIHRoZSBlbGVtZW50cyBkb2Vzbid0IGNvbnRhaW4gdGhlIHRhcmdldCBlbGVtZW50LCBpdCBpcyBhbiBvdXRzaWRlIGNsaWNrXHJcbiAgICBpZiAoIXRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcclxuICAgICAgdGhpcy5ibHVyLmVtaXQoZXZlbnQpO1xyXG4gICAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRBbGxPZlR5cGUodHlwZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbnMuZmlsdGVyKCh4KSA9PiB4LnR5cGUgPT09IHR5cGUpWzBdLm9yaWdpbmFsRGF0YTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVBhcmVudE9yQ2hpbGRyZW4oaXRlbSwgYWN0aW9uKSB7XHJcbiAgICBpZiAodGhpcy5zdHJpY3RSZWxhdGlvbnNoaXAgJiYgaXRlbS5pc1BhcmVudE9mKSB7XHJcbiAgICAgIHRoaXMudXBkYXRlQ2hpbGRyZW5WYWx1ZShpdGVtLCBhY3Rpb24pO1xyXG4gICAgfSBlbHNlIGlmIChpdGVtLmlzQ2hpbGRPZiAmJiB0aGlzLnNlbGVjdEFsbE9wdGlvbikge1xyXG4gICAgICB0aGlzLnVwZGF0ZVBhcmVudFZhbHVlKGl0ZW0sIGFjdGlvbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBtb2RpZnlBZmZlY3RlZFBhcmVudHNPckNoaWxkcmVuKHNlbGVjdGluZywgaXRlbUNoYW5nZWQpIHtcclxuICAgIGlmICghaXRlbUNoYW5nZWQuaXNDaGlsZE9mICYmICFpdGVtQ2hhbmdlZC5pc1BhcmVudE9mKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMudHlwZXMuZmlsdGVyKCh4KSA9PiAhIXguaXNQYXJlbnRPZilbMF07XHJcbiAgICBjb25zdCBwYXJlbnRUeXBlID0gcGFyZW50LnZhbHVlO1xyXG4gICAgY29uc3QgYWxsUGFyZW50VHlwZSA9IHRoaXMuZ2V0QWxsT2ZUeXBlKHBhcmVudFR5cGUpO1xyXG4gICAgY29uc3QgY2hpbGRUeXBlID0gYWxsUGFyZW50VHlwZVswXS5pc1BhcmVudE9mO1xyXG4gICAgY29uc3QgYWxsQ2hpbGRyZW4gPSB0aGlzLmdldEFsbE9mVHlwZShjaGlsZFR5cGUpO1xyXG4gICAgY29uc3QgYWxsQ2hlY2tlZENoaWxkcmVuID0gYWxsQ2hpbGRyZW4uZmlsdGVyKCh4KSA9PiAhIXguY2hlY2tlZCk7XHJcblxyXG4gICAgYWxsUGFyZW50VHlwZS5mb3JFYWNoKChvYmopID0+IHtcclxuICAgICAgaWYgKG9iai52YWx1ZSA9PT0gJ0FMTCcpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgY29uc3Qgc2VsZWN0ZWRDaGlsZHJlbk9mUGFyZW50ID0gYWxsQ2hlY2tlZENoaWxkcmVuLmZpbHRlcigoeCkgPT4ge1xyXG4gICAgICAgIHJldHVybiB4W3BhcmVudFR5cGVdLmZpbHRlcigoeSkgPT4geSA9PT0gb2JqLnZhbHVlKS5sZW5ndGggPiAwO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChzZWxlY3RpbmcpIHtcclxuICAgICAgICBpZiAob2JqLmNoZWNrZWQpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgb2JqLmluZGV0ZXJtaW5hdGUgPSBzZWxlY3RlZENoaWxkcmVuT2ZQYXJlbnQubGVuZ3RoID4gMDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBhbGxDaGlsZHJlbk9mUGFyZW50ID0gYWxsQ2hpbGRyZW4uZmlsdGVyKCh4KSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4geC52YWx1ZSAhPT0gJ0FMTCcgJiYgeFtwYXJlbnRUeXBlXS5maWx0ZXIoKHkpID0+IHkgPT09IG9iai52YWx1ZSkubGVuZ3RoID4gMDtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoc2VsZWN0ZWRDaGlsZHJlbk9mUGFyZW50Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIGlmIChvYmouY2hlY2tlZCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zdHJpY3RSZWxhdGlvbnNoaXAgJiYgYWxsQ2hpbGRyZW5PZlBhcmVudC5sZW5ndGggIT09IHNlbGVjdGVkQ2hpbGRyZW5PZlBhcmVudC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICBvYmouaW5kZXRlcm1pbmF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgb2JqLmNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICB0aGlzLnJlbW92ZVZhbHVlKG9iaik7XHJcbiAgICAgICAgICAgICAgdGhpcy5hZGRJbmRpdmlkdWFsQ2hpbGRyZW4oc2VsZWN0ZWRDaGlsZHJlbk9mUGFyZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb2JqLmluZGV0ZXJtaW5hdGUgPSB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHRoaXMuc3RyaWN0UmVsYXRpb25zaGlwICYmIGl0ZW1DaGFuZ2VkLnR5cGUgIT09IHBhcmVudFR5cGUpIHtcclxuICAgICAgICAgICAgaWYgKG9iai5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgb2JqLmNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICB0aGlzLnJlbW92ZVZhbHVlKG9iaik7XHJcbiAgICAgICAgICAgICAgdGhpcy5hZGRJbmRpdmlkdWFsQ2hpbGRyZW4oc2VsZWN0ZWRDaGlsZHJlbk9mUGFyZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBvYmouaW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgaWYgKGFsbENoaWxkcmVuT2ZQYXJlbnQubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIC8vIGlmIGl0IGhhcyBubyBjaGlsZHJlbiBhbmQgaXMgY2hlY2tlZCwgaXQgc2hvdWxkIHN0YXkgY2hlY2tlZFxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RyaWN0UmVsYXRpb25zaGlwICYmIGl0ZW1DaGFuZ2VkLnR5cGUgIT09IHBhcmVudFR5cGUpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmUobnVsbCwgb2JqKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0QWxsT3B0aW9uKSB7XHJcbiAgICAgIHRoaXMudXBkYXRlSW5kZXRlcm1pbmF0ZVN0YXRlcyhhbGxQYXJlbnRUeXBlLCBhbGxDaGlsZHJlbiwgYWxsQ2hlY2tlZENoaWxkcmVuKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZUFsbFBhcmVudHNPckNoaWxkcmVuKGFsbEl0ZW0sIGFjdGlvbikge1xyXG4gICAgaWYgKGFsbEl0ZW0uaXNQYXJlbnRPZikge1xyXG4gICAgICB0aGlzLnVwZGF0ZUFsbENoaWxkcmVuVmFsdWUoYWxsSXRlbSwgYWN0aW9uKTtcclxuICAgIH0gZWxzZSBpZiAoYWxsSXRlbS5pc0NoaWxkT2YpIHtcclxuICAgICAgdGhpcy51cGRhdGVBbGxQYXJlbnRWYWx1ZShhbGxJdGVtLCBhY3Rpb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlQWxsQ2hpbGRyZW5WYWx1ZShpdGVtLCBhY3Rpb24pIHtcclxuICAgIGNvbnN0IHNlbGVjdGluZyA9IGFjdGlvbiA9PT0gJ3NlbGVjdCc7XHJcbiAgICBjb25zdCBjaGlsZFR5cGUgPSBpdGVtLmlzUGFyZW50T2Y7XHJcbiAgICBjb25zdCBwb3RlbnRpYWxDaGlsZHJlbiA9IHRoaXMuZ2V0QWxsT2ZUeXBlKGNoaWxkVHlwZSk7XHJcbiAgICBpZiAodGhpcy5zZWxlY3RBbGxPcHRpb24gJiYgdGhpcy5hbGxPZlR5cGVTZWxlY3RlZChjaGlsZFR5cGUpICYmICFzZWxlY3RpbmcpIHtcclxuICAgICAgdGhpcy5yZW1vdmUobnVsbCwgcG90ZW50aWFsQ2hpbGRyZW5bMF0pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBwb3RlbnRpYWxDaGlsZHJlbi5mb3JFYWNoKCh4KSA9PiB7XHJcbiAgICAgIGlmICh4LnZhbHVlID09PSAnQUxMJyAmJiAheC5jaGVja2VkKSB7XHJcbiAgICAgICAgaWYgKHNlbGVjdGluZykge1xyXG4gICAgICAgICAgeC5jaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgeC5pbmRldGVybWluYXRlID0gc2VsZWN0aW5nO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICh4LmNoZWNrZWQgJiYgIXNlbGVjdGluZykge1xyXG4gICAgICAgICAgdGhpcy5yZW1vdmUobnVsbCwgeCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHguY2hlY2tlZCA9IHNlbGVjdGluZztcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVBbGxQYXJlbnRWYWx1ZShpdGVtLCBhY3Rpb24pIHtcclxuICAgIGNvbnN0IHNlbGVjdGluZyA9IGFjdGlvbiA9PT0gJ3NlbGVjdCc7XHJcbiAgICBjb25zdCBwYXJlbnRUeXBlID0gaXRlbS5pc0NoaWxkT2Y7XHJcbiAgICBjb25zdCBwb3RlbnRpYWxQYXJlbnRzID0gdGhpcy5nZXRBbGxPZlR5cGUocGFyZW50VHlwZSk7XHJcbiAgICBwb3RlbnRpYWxQYXJlbnRzLmZvckVhY2goKHgpID0+IHtcclxuICAgICAgaWYgKCF4LmNoZWNrZWQpIHtcclxuICAgICAgICB4LmluZGV0ZXJtaW5hdGUgPSBzZWxlY3Rpbmc7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlSW5kZXRlcm1pbmF0ZVN0YXRlcyhhbGxQYXJlbnRUeXBlLCBhbGxDaGlsZHJlbiwgYWxsQ2hlY2tlZENoaWxkcmVuKSB7XHJcbiAgICBjb25zdCBhbGxDaGVja2VkT3JJbmRldGVybWluYXRlUGFyZW50cyA9IGFsbFBhcmVudFR5cGUuZmlsdGVyKCh4KSA9PiAoISF4LmNoZWNrZWQgfHwgISF4LmluZGV0ZXJtaW5hdGUpICYmIHgudmFsdWUgIT09ICdBTEwnKTtcclxuICAgIGNvbnN0IGlzUGFyZW50SW5kZXRlcm1pbmF0ZSA9ICEhYWxsUGFyZW50VHlwZVswXS5jaGVja2VkID8gZmFsc2UgOiBhbGxDaGVja2VkT3JJbmRldGVybWluYXRlUGFyZW50cy5sZW5ndGggPiAwO1xyXG4gICAgY29uc3QgaXNDaGlsZEluZGV0ZXJtaW5hdGUgPSAhIWFsbENoaWxkcmVuWzBdLmNoZWNrZWQgPyBmYWxzZSA6IGFsbENoZWNrZWRDaGlsZHJlbi5sZW5ndGggPiAwO1xyXG4gICAgdGhpcy5zZXRJbmRldGVybWluYXRlU3RhdGUoYWxsUGFyZW50VHlwZSwgaXNQYXJlbnRJbmRldGVybWluYXRlKTtcclxuICAgIHRoaXMuc2V0SW5kZXRlcm1pbmF0ZVN0YXRlKGFsbENoaWxkcmVuLCBpc0NoaWxkSW5kZXRlcm1pbmF0ZSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVDaGlsZHJlblZhbHVlKHBhcmVudCwgYWN0aW9uKSB7XHJcbiAgICBjb25zdCBzZWxlY3RpbmcgPSBhY3Rpb24gPT09ICdzZWxlY3QnO1xyXG4gICAgY29uc3QgY2hpbGRUeXBlID0gcGFyZW50LmlzUGFyZW50T2Y7XHJcbiAgICBjb25zdCBwb3RlbnRpYWxDaGlsZHJlbiA9IHRoaXMuZ2V0QWxsT2ZUeXBlKGNoaWxkVHlwZSk7XHJcbiAgICBwb3RlbnRpYWxDaGlsZHJlbi5mb3JFYWNoKCh4KSA9PiB7XHJcbiAgICAgIGlmICh4LnZhbHVlID09PSAnQUxMJykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoeFtwYXJlbnQudHlwZV0uZmlsdGVyKCh5KSA9PiB5ID09PSBwYXJlbnQudmFsdWUpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBpZiAoeC5jaGVja2VkICYmICFzZWxlY3RpbmcpIHtcclxuICAgICAgICAgIHguY2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgaWYgKHRoaXMuYWxsT2ZUeXBlU2VsZWN0ZWQoY2hpbGRUeXBlKSkge1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZVJlbW92ZUl0ZW1JZkFsbFNlbGVjdGVkKHgpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVWYWx1ZSh4KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgeC5jaGVja2VkID0gc2VsZWN0aW5nO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVBhcmVudFZhbHVlKGNoaWxkLCBhY3Rpb24pIHtcclxuICAgIGNvbnN0IGFsbFBhcmVudFR5cGUgPSB0aGlzLmdldEFsbE9mVHlwZShjaGlsZC5pc0NoaWxkT2YpO1xyXG4gICAgaWYgKGFsbFBhcmVudFR5cGVbMF0uY2hlY2tlZCAmJiBhY3Rpb24gIT09ICdzZWxlY3QnKSB7XHJcbiAgICAgIHRoaXMuaGFuZGxlUmVtb3ZlSXRlbUlmQWxsU2VsZWN0ZWQoYWxsUGFyZW50VHlwZVswXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhZGRJbmRpdmlkdWFsQ2hpbGRyZW4oY2hpbGRyZW4pIHtcclxuICAgIGxldCBwYXJlbnRBbHJlYWR5U2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgIGNoaWxkcmVuLmZvckVhY2goKHgpID0+IHtcclxuICAgICAgaWYgKHguaXNDaGlsZE9mKSB7XHJcbiAgICAgICAgLy8gb25seSBhZGQgY2hpbGRyZW4gaWYgdGhlaXIgcGFyZW50cyBhcmUgbm90IGFscmVhZHkgc2VsZWN0ZWRcclxuICAgICAgICB4W3guaXNDaGlsZE9mXS5mb3JFYWNoKChwYXJlbnQpID0+IHtcclxuICAgICAgICAgIGlmICh0aGlzLnZhbHVlW3guaXNDaGlsZE9mXS5maWx0ZXIoKHApID0+IHAgPT09IHBhcmVudCkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBwYXJlbnRBbHJlYWR5U2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLnZhbHVlW3gudHlwZV0uZmlsdGVyKChpdGVtKSA9PiBpdGVtID09PSB4LnZhbHVlKS5sZW5ndGggPT09IDAgJiYgIXBhcmVudEFscmVhZHlTZWxlY3RlZCkge1xyXG4gICAgICAgIHRoaXMuYWRkKHgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldEluaXRpYWxWYWx1ZShtb2RlbCk6IHZvaWQge1xyXG4gICAgdGhpcy5pdGVtcyA9IFtdO1xyXG4gICAgdGhpcy52YWx1ZSA9IG1vZGVsIHx8IHt9O1xyXG4gICAgaWYgKCF0aGlzLnR5cGVzKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMudHlwZXMuZm9yRWFjaCgodHlwZU9iaikgPT4ge1xyXG4gICAgICBjb25zdCB0eXBlID0gdHlwZU9iai52YWx1ZTtcclxuICAgICAgaWYgKHRoaXMudmFsdWVbdHlwZV0pIHtcclxuICAgICAgICBsZXQgaW5kZXRlcm1pbmF0ZUlzU2V0ID0gZmFsc2U7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMudXBkYXRlQWxsSXRlbVN0YXRlKHR5cGUpO1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnNCeVR5cGUgPSBvcHRpb25zLmFsbE9mVHlwZTtcclxuICAgICAgICBjb25zdCBhbGxTZWxlY3RlZCA9IG9wdGlvbnMuYWxsT2ZUeXBlU2VsZWN0ZWQ7XHJcbiAgICAgICAgdGhpcy52YWx1ZVt0eXBlXS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIWFsbFNlbGVjdGVkICYmICFpbmRldGVybWluYXRlSXNTZXQpIHtcclxuICAgICAgICAgICAgaW5kZXRlcm1pbmF0ZUlzU2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zZXRJbmRldGVybWluYXRlU3RhdGUob3B0aW9uc0J5VHlwZSwgdHJ1ZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IG9wdGlvbnNCeVR5cGUuZmlsdGVyKCh4KSA9PiB4LnZhbHVlID09PSBpdGVtKVswXTtcclxuICAgICAgICAgIHZhbHVlLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgaWYgKCFhbGxTZWxlY3RlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZURpc3BsYXlJdGVtcyh2YWx1ZSwgJ2FkZCcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHRoaXMuc3RyaWN0UmVsYXRpb25zaGlwICYmIHZhbHVlLmlzUGFyZW50T2YpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDaGlsZHJlblZhbHVlKHZhbHVlLCAnc2VsZWN0Jyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHR5cGVPYmouaXNDaGlsZE9mKSB7XHJcbiAgICAgICAgICB0aGlzLm1vZGlmeUFmZmVjdGVkUGFyZW50c09yQ2hpbGRyZW4odHJ1ZSwgeyB2YWx1ZTogdHlwZSwgaXNDaGlsZE9mOiB0cnVlIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnZhbHVlW3R5cGVdID0gW107XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYWxsSXRlbXNTZWxlY3RlZChvcHRpb25zQnlUeXBlLCB0eXBlKSB7XHJcbiAgICByZXR1cm4gdGhpcy52YWx1ZVt0eXBlXS5sZW5ndGggPT09IG9wdGlvbnNCeVR5cGUubGVuZ3RoIC0gMTtcclxuICB9XHJcblxyXG4gIC8vIFNldCB0b3VjaGVkIG9uIGJsdXJcclxuICBvblRvdWNoZWQoZSkge1xyXG4gICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcclxuICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcclxuICAgIHRoaXMuYmx1ci5lbWl0KGUpO1xyXG4gIH1cclxuXHJcbiAgd3JpdGVWYWx1ZShtb2RlbDogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLm1vZGVsID0gbW9kZWw7XHJcbiAgICB0aGlzLnNldEluaXRpYWxWYWx1ZShtb2RlbCk7XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcclxuICB9XHJcbn1cclxuIl19
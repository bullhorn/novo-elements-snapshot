import { EventEmitter } from '@angular/core';
import { Helpers } from 'novo-elements/utils';
import { CollectionEvent } from './collection-event';
/**
 * Base Class for all Collection based data providers
 *
 * @example
 *  var dp:DataProvider = new DataProvider();
 *  dp.addItem({label:"Item 1"});
 *  dp.addItem({label:"Item 2"});
 *  dp.addItem({label:"Item 3"});
 *  dp.addItem({label:"Item 4"});

 *  var myList:List = new List();
 *  myList.dataProvider = dp;
 */
export class ArrayCollection {
    constructor(source = []) {
        this.dataChange = new EventEmitter();
        this.source = [];
        this.editData = [];
        this.isEditing = false;
        this.filterData = [];
        this._filter = {};
        this._sort = [];
        this.source = source;
        this.editData = this.copy(this.source);
        this.filterData = this.source.slice();
    }
    get length() {
        return this.filterData.length;
    }
    get total() {
        return this.filterData.length;
    }
    get list() {
        return this.filterData;
    }
    isEmpty() {
        return this.length <= 0 && !this.isLoading() && !this.hasErrors();
    }
    hasErrors() {
        return false;
    }
    isLoading() {
        return false;
    }
    isFiltered() {
        return Object.keys(this._filter).length > 0;
    }
    /**
     * Method to switch the isEditingflag for the data source
     */
    edit() {
        this.isEditing = true;
        this.editData = this.copy(this.source);
    }
    /**
     * Method to leave edit mode and reset source
     */
    undo() {
        this.isEditing = false;
        this.source = this.copy(this.editData);
        this.refresh();
    }
    /**
     * Method to leave edit mode and save editData
     */
    commit() {
        this.isEditing = false;
        this.source = this.filterData.slice();
        this.refresh();
    }
    /**
     * Appends an item to the end of the data provider.
     *
     *
     * @memberOf ArrayCollection
     */
    addItem(item) {
        this.isEditing ? this.editData.push(item) : this.source.push(item);
        this.onDataChange(new CollectionEvent(CollectionEvent.ADD, [item]));
        this.refresh();
    }
    /**
     * Adds a new item to the data provider at the specified index.
     *
     *
     * @memberOf ArrayCollection
     */
    addItemAt(item, index) {
        this.isEditing ? this.editData.splice(index, 0, item) : this.source.splice(index, 0, item);
        this.onDataChange(new CollectionEvent(CollectionEvent.ADD, [item]));
        this.refresh();
    }
    /**
     *  Appends multiple items to the end of the DataProvider and dispatches a CollectionEvent.ADD event.
     *
     * @memberOf ArrayCollection
     */
    addItems(items) {
        this.isEditing ? this.editData.push(...items) : this.source.push(...items);
        this.onDataChange(new CollectionEvent(CollectionEvent.ADD, items));
        this.refresh();
    }
    /**
     * Adds several items to the data provider at the specified index and dispatches a CollectionEvent.ADD event.
     *
     * @memberOf ArrayCollection
     */
    addItemsAt(items, index) {
        this.isEditing ? this.editData.splice(index, 0, ...items) : this.source.splice(index, 0, ...items);
    }
    /**
     * Creates a copy of the current ArrayCollection any.
     *
     * @memberOf ArrayCollection
     */
    clone() {
        return new ArrayCollection(this.isEditing ? this.copy(this.editData) : this.copy(this.source));
    }
    /**
     * Creates a copy of the current ArrayCollection any.
     *
     * @memberOf ArrayCollection
     */
    copy(array) {
        return Helpers.deepClone(array);
    }
    /**
     * Concatenates the specified items to the end of the current data provider.
     *
     * @memberOf ArrayCollection
     */
    concat(items) {
        this.addItems(items);
    }
    /**
     * Returns the item at the specified index.
     *
     * @memberOf ArrayCollection
     */
    getItemAt(index) {
        return this.isEditing ? this.editData[index] : this.source[index];
    }
    /**
     *  Returns the index of the specified item.
     *
     * @memberOf ArrayCollection
     */
    getItemIndex(item) {
        return this.isEditing ? this.editData.indexOf(item) : this.source.indexOf(item);
    }
    /**
     * Invalidates all the data items that the DataProvider contains and dispatches a CollectionEvent.INVALIDATE_ALL event.
     *
     * @memberOf ArrayCollection
     */
    invalidate() {
        this.onDataChange(new CollectionEvent(CollectionEvent.INVALIDATE_ALL));
    }
    /**
     * Invalidates the specified item.
     *
     * @memberOf ArrayCollection
     */
    // invalidateItem(item:any):void {}
    /**
     * Invalidates the item at the specified index.
     *
     * @memberOf ArrayCollection
     */
    // invalidateItemAt(index:number):void {}
    /**
     * Appends the specified data into the data that the data provider contains and removes any duplicate items.
     *
     * @memberOf ArrayCollection
     */
    merge(newData) {
        for (const obj of newData) {
            const existing = ~this.getItemIndex(obj);
            if (existing) {
                this.replaceItem(obj, existing);
            }
            else {
                this.addItem(obj);
            }
        }
    }
    /**
     * Removes all items from the data provider and dispatches a CollectionEvent.REMOVE_ALL event.
     *
     * @memberOf ArrayCollection
     */
    removeAll() {
        this.source = [];
        this.editData = [];
        this.filterData = [];
        this.onDataChange(new CollectionEvent(CollectionEvent.REMOVE_ALL, []));
        this.refresh();
    }
    /**
     * Removes the specified item from the data provider and dispatches a CollectionEvent.REMOVE event.
     *
     * @memberOf ArrayCollection
     */
    removeItem(item) {
        const index = this.getItemIndex(item);
        return this.removeItemAt(index);
    }
    /**
     * Removes the item at the specified index and dispatches a CollectionEvent.REMOVE event.
     *
     * @memberOf ArrayCollection
     */
    removeItemAt(index) {
        const success = !!this.source.splice(index, 1);
        this.refresh();
        return success;
    }
    /**
     * Replaces an existing item with a new item and dispatches a CollectionEvent.REPLACE event.
     *
     * @memberOf ArrayCollection
     */
    replaceItem(newItem, oldItem) {
        const index = this.getItemIndex(oldItem);
        if (index >= 0) {
            this.replaceItemAt(newItem, index);
        }
    }
    /**
     * Replaces the item at the specified index and dispatches a CollectionEvent.REPLACE event.
     *
     * @memberOf ArrayCollection
     */
    replaceItemAt(newItem, index) {
        this.filterData.splice(index, 1, newItem);
    }
    /**
     * Sorts the items that the data provider contains and dispatches a CollectionEvent.SORT event.
     *
     * @memberOf ArrayCollection
     */
    get sort() {
        return this._sort;
    }
    set sort(value) {
        this._sort = value;
        this.refresh();
    }
    /**
     * Sorts the items that the data provider contains by the specified field and dispatches a CollectionEvent.SORT event.
     *
     * @memberOf ArrayCollection
     */
    sortOn(fieldName, reverse = false) {
        this.filterData = this.filterData.sort(Helpers.sortByField(fieldName, reverse));
        this.onDataChange(new CollectionEvent(CollectionEvent.SORT));
        return this.filterData;
    }
    get filter() {
        return this._filter;
    }
    set filter(value) {
        this._filter = value;
        this.refresh();
    }
    filterOn(fieldName, value = null) {
        this.filterData = this.filterData.filter(Helpers.filterByField(fieldName, value));
        return this.filterData;
    }
    onDataChange(event) {
        this.dataChange.emit(event);
    }
    refresh() {
        this.filterData = this.isEditing ? this.editData.slice() : this.source.slice();
        for (const item of this._sort.reverse()) {
            this.sortOn(item.field, item.reverse);
        }
        for (const key in this._filter) {
            if (key) {
                this.filterOn(key, this._filter[key]);
            }
        }
        this.onDataChange(new CollectionEvent(CollectionEvent.CHANGE, this.filterData));
    }
    /**
     * Creates an Array any representation of the data that the data provider contains.
     *
     * @memberOf ArrayCollection
     */
    toArray() {
        return this.isEditing ? this.editData : this.source;
    }
    toJSON() {
        return this.isEditing ? this.editData : this.source;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXktY29sbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL3NlcnZpY2VzL2RhdGEtcHJvdmlkZXIvYXJyYXktY29sbGVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUU5QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7OztHQVlHO0FBQ0gsTUFBTSxPQUFPLGVBQWU7SUFTMUIsWUFBWSxTQUFtQixFQUFFO1FBUmpDLGVBQVUsR0FBa0MsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFDaEYsV0FBTSxHQUFhLEVBQUUsQ0FBQztRQUN0QixhQUFRLEdBQWEsRUFBRSxDQUFDO1FBQ3hCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsZUFBVSxHQUFhLEVBQUUsQ0FBQztRQUMxQixZQUFPLEdBQVEsRUFBRSxDQUFDO1FBQ2xCLFVBQUssR0FBZSxFQUFFLENBQUM7UUFHckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7SUFDaEMsQ0FBQztJQUVELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7SUFDaEMsQ0FBQztJQUVELElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFD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SUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxPQUFPO1FBQ0wsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3RELENBQUM7SUFFRCxNQUFNO1FBQ0osT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3RELENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuaW1wb3J0IHsgQ29sbGVjdGlvbiB9IGZyb20gJy4vY29sbGVjdGlvbic7XG5pbXBvcnQgeyBDb2xsZWN0aW9uRXZlbnQgfSBmcm9tICcuL2NvbGxlY3Rpb24tZXZlbnQnO1xuXG4vKipcbiAqIEJhc2UgQ2xhc3MgZm9yIGFsbCBDb2xsZWN0aW9uIGJhc2VkIGRhdGEgcHJvdmlkZXJzXG4gKlxuICogQGV4YW1wbGVcbiAqICB2YXIgZHA6RGF0YVByb3ZpZGVyID0gbmV3IERhdGFQcm92aWRlcigpO1xuICogIGRwLmFkZEl0ZW0oe2xhYmVsOlwiSXRlbSAxXCJ9KTtcbiAqICBkcC5hZGRJdGVtKHtsYWJlbDpcIkl0ZW0gMlwifSk7XG4gKiAgZHAuYWRkSXRlbSh7bGFiZWw6XCJJdGVtIDNcIn0pO1xuICogIGRwLmFkZEl0ZW0oe2xhYmVsOlwiSXRlbSA0XCJ9KTtcblxuICogIHZhciBteUxpc3Q6TGlzdCA9IG5ldyBMaXN0KCk7XG4gKiAgbXlMaXN0LmRhdGFQcm92aWRlciA9IGRwO1xuICovXG5leHBvcnQgY2xhc3MgQXJyYXlDb2xsZWN0aW9uPFQ+IGltcGxlbWVudHMgQ29sbGVjdGlvbjxUPiB7XG4gIGRhdGFDaGFuZ2U6IEV2ZW50RW1pdHRlcjxDb2xsZWN0aW9uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxDb2xsZWN0aW9uRXZlbnQ+KCk7XG4gIHNvdXJjZTogQXJyYXk8VD4gPSBbXTtcbiAgZWRpdERhdGE6IEFycmF5PFQ+ID0gW107XG4gIGlzRWRpdGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBmaWx0ZXJEYXRhOiBBcnJheTxUPiA9IFtdO1xuICBfZmlsdGVyOiBhbnkgPSB7fTtcbiAgX3NvcnQ6IEFycmF5PGFueT4gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihzb3VyY2U6IEFycmF5PFQ+ID0gW10pIHtcbiAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcbiAgICB0aGlzLmVkaXREYXRhID0gdGhpcy5jb3B5KHRoaXMuc291cmNlKTtcbiAgICB0aGlzLmZpbHRlckRhdGEgPSB0aGlzLnNvdXJjZS5zbGljZSgpO1xuICB9XG5cbiAgZ2V0IGxlbmd0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXJEYXRhLmxlbmd0aDtcbiAgfVxuXG4gIGdldCB0b3RhbCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmZpbHRlckRhdGEubGVuZ3RoO1xuICB9XG5cbiAgZ2V0IGxpc3QoKTogQXJyYXk8VD4ge1xuICAgIHJldHVybiB0aGlzLmZpbHRlckRhdGE7XG4gIH1cblxuICBpc0VtcHR5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmxlbmd0aCA8PSAwICYmICF0aGlzLmlzTG9hZGluZygpICYmICF0aGlzLmhhc0Vycm9ycygpO1xuICB9XG5cbiAgaGFzRXJyb3JzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzTG9hZGluZygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc0ZpbHRlcmVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl9maWx0ZXIpLmxlbmd0aCA+IDA7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHRvIHN3aXRjaCB0aGUgaXNFZGl0aW5nZmxhZyBmb3IgdGhlIGRhdGEgc291cmNlXG4gICAqL1xuICBlZGl0KCkge1xuICAgIHRoaXMuaXNFZGl0aW5nID0gdHJ1ZTtcbiAgICB0aGlzLmVkaXREYXRhID0gdGhpcy5jb3B5KHRoaXMuc291cmNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gbGVhdmUgZWRpdCBtb2RlIGFuZCByZXNldCBzb3VyY2VcbiAgICovXG4gIHVuZG8oKSB7XG4gICAgdGhpcy5pc0VkaXRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnNvdXJjZSA9IHRoaXMuY29weSh0aGlzLmVkaXREYXRhKTtcbiAgICB0aGlzLnJlZnJlc2goKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gbGVhdmUgZWRpdCBtb2RlIGFuZCBzYXZlIGVkaXREYXRhXG4gICAqL1xuICBjb21taXQoKSB7XG4gICAgdGhpcy5pc0VkaXRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnNvdXJjZSA9IHRoaXMuZmlsdGVyRGF0YS5zbGljZSgpO1xuICAgIHRoaXMucmVmcmVzaCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGVuZHMgYW4gaXRlbSB0byB0aGUgZW5kIG9mIHRoZSBkYXRhIHByb3ZpZGVyLlxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQXJyYXlDb2xsZWN0aW9uXG4gICAqL1xuICBhZGRJdGVtKGl0ZW06IFQpOiB2b2lkIHtcbiAgICB0aGlzLmlzRWRpdGluZyA/IHRoaXMuZWRpdERhdGEucHVzaChpdGVtKSA6IHRoaXMuc291cmNlLnB1c2goaXRlbSk7XG4gICAgdGhpcy5vbkRhdGFDaGFuZ2UobmV3IENvbGxlY3Rpb25FdmVudChDb2xsZWN0aW9uRXZlbnQuQURELCBbaXRlbV0pKTtcbiAgICB0aGlzLnJlZnJlc2goKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgbmV3IGl0ZW0gdG8gdGhlIGRhdGEgcHJvdmlkZXIgYXQgdGhlIHNwZWNpZmllZCBpbmRleC5cbiAgICpcbiAgICpcbiAgICogQG1lbWJlck9mIEFycmF5Q29sbGVjdGlvblxuICAgKi9cbiAgYWRkSXRlbUF0KGl0ZW06IFQsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmlzRWRpdGluZyA/IHRoaXMuZWRpdERhdGEuc3BsaWNlKGluZGV4LCAwLCBpdGVtKSA6IHRoaXMuc291cmNlLnNwbGljZShpbmRleCwgMCwgaXRlbSk7XG4gICAgdGhpcy5vbkRhdGFDaGFuZ2UobmV3IENvbGxlY3Rpb25FdmVudChDb2xsZWN0aW9uRXZlbnQuQURELCBbaXRlbV0pKTtcbiAgICB0aGlzLnJlZnJlc2goKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgQXBwZW5kcyBtdWx0aXBsZSBpdGVtcyB0byB0aGUgZW5kIG9mIHRoZSBEYXRhUHJvdmlkZXIgYW5kIGRpc3BhdGNoZXMgYSBDb2xsZWN0aW9uRXZlbnQuQUREIGV2ZW50LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQXJyYXlDb2xsZWN0aW9uXG4gICAqL1xuICBhZGRJdGVtcyhpdGVtczogQXJyYXk8VD4pOiB2b2lkIHtcbiAgICB0aGlzLmlzRWRpdGluZyA/IHRoaXMuZWRpdERhdGEucHVzaCguLi5pdGVtcykgOiB0aGlzLnNvdXJjZS5wdXNoKC4uLml0ZW1zKTtcbiAgICB0aGlzLm9uRGF0YUNoYW5nZShuZXcgQ29sbGVjdGlvbkV2ZW50KENvbGxlY3Rpb25FdmVudC5BREQsIGl0ZW1zKSk7XG4gICAgdGhpcy5yZWZyZXNoKCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBzZXZlcmFsIGl0ZW1zIHRvIHRoZSBkYXRhIHByb3ZpZGVyIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXggYW5kIGRpc3BhdGNoZXMgYSBDb2xsZWN0aW9uRXZlbnQuQUREIGV2ZW50LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQXJyYXlDb2xsZWN0aW9uXG4gICAqL1xuICBhZGRJdGVtc0F0KGl0ZW1zOiBBcnJheTxUPiwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuaXNFZGl0aW5nID8gdGhpcy5lZGl0RGF0YS5zcGxpY2UoaW5kZXgsIDAsIC4uLml0ZW1zKSA6IHRoaXMuc291cmNlLnNwbGljZShpbmRleCwgMCwgLi4uaXRlbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBjb3B5IG9mIHRoZSBjdXJyZW50IEFycmF5Q29sbGVjdGlvbiBhbnkuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBcnJheUNvbGxlY3Rpb25cbiAgICovXG4gIGNsb25lKCk6IEFycmF5Q29sbGVjdGlvbjxUPiB7XG4gICAgcmV0dXJuIG5ldyBBcnJheUNvbGxlY3Rpb24odGhpcy5pc0VkaXRpbmcgPyB0aGlzLmNvcHkodGhpcy5lZGl0RGF0YSkgOiB0aGlzLmNvcHkodGhpcy5zb3VyY2UpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgY29weSBvZiB0aGUgY3VycmVudCBBcnJheUNvbGxlY3Rpb24gYW55LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQXJyYXlDb2xsZWN0aW9uXG4gICAqL1xuICBjb3B5KGFycmF5OiBhbnlbXSkge1xuICAgIHJldHVybiBIZWxwZXJzLmRlZXBDbG9uZShhcnJheSk7XG4gIH1cblxuICAvKipcbiAgICogQ29uY2F0ZW5hdGVzIHRoZSBzcGVjaWZpZWQgaXRlbXMgdG8gdGhlIGVuZCBvZiB0aGUgY3VycmVudCBkYXRhIHByb3ZpZGVyLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQXJyYXlDb2xsZWN0aW9uXG4gICAqL1xuICBjb25jYXQoaXRlbXM6IEFycmF5PFQ+KTogdm9pZCB7XG4gICAgdGhpcy5hZGRJdGVtcyhpdGVtcyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaXRlbSBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQXJyYXlDb2xsZWN0aW9uXG4gICAqL1xuICBnZXRJdGVtQXQoaW5kZXg6IG51bWJlcik6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaXNFZGl0aW5nID8gdGhpcy5lZGl0RGF0YVtpbmRleF0gOiB0aGlzLnNvdXJjZVtpbmRleF07XG4gIH1cblxuICAvKipcbiAgICogIFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBzcGVjaWZpZWQgaXRlbS5cbiAgICpcbiAgICogQG1lbWJlck9mIEFycmF5Q29sbGVjdGlvblxuICAgKi9cbiAgZ2V0SXRlbUluZGV4KGl0ZW06IFQpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmlzRWRpdGluZyA/IHRoaXMuZWRpdERhdGEuaW5kZXhPZihpdGVtKSA6IHRoaXMuc291cmNlLmluZGV4T2YoaXRlbSk7XG4gIH1cblxuICAvKipcbiAgICogSW52YWxpZGF0ZXMgYWxsIHRoZSBkYXRhIGl0ZW1zIHRoYXQgdGhlIERhdGFQcm92aWRlciBjb250YWlucyBhbmQgZGlzcGF0Y2hlcyBhIENvbGxlY3Rpb25FdmVudC5JTlZBTElEQVRFX0FMTCBldmVudC5cbiAgICpcbiAgICogQG1lbWJlck9mIEFycmF5Q29sbGVjdGlvblxuICAgKi9cbiAgaW52YWxpZGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLm9uRGF0YUNoYW5nZShuZXcgQ29sbGVjdGlvbkV2ZW50KENvbGxlY3Rpb25FdmVudC5JTlZBTElEQVRFX0FMTCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludmFsaWRhdGVzIHRoZSBzcGVjaWZpZWQgaXRlbS5cbiAgICpcbiAgICogQG1lbWJlck9mIEFycmF5Q29sbGVjdGlvblxuICAgKi9cbiAgLy8gaW52YWxpZGF0ZUl0ZW0oaXRlbTphbnkpOnZvaWQge31cblxuICAvKipcbiAgICogSW52YWxpZGF0ZXMgdGhlIGl0ZW0gYXQgdGhlIHNwZWNpZmllZCBpbmRleC5cbiAgICpcbiAgICogQG1lbWJlck9mIEFycmF5Q29sbGVjdGlvblxuICAgKi9cbiAgLy8gaW52YWxpZGF0ZUl0ZW1BdChpbmRleDpudW1iZXIpOnZvaWQge31cblxuICAvKipcbiAgICogQXBwZW5kcyB0aGUgc3BlY2lmaWVkIGRhdGEgaW50byB0aGUgZGF0YSB0aGF0IHRoZSBkYXRhIHByb3ZpZGVyIGNvbnRhaW5zIGFuZCByZW1vdmVzIGFueSBkdXBsaWNhdGUgaXRlbXMuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBcnJheUNvbGxlY3Rpb25cbiAgICovXG4gIG1lcmdlKG5ld0RhdGE6IEFycmF5PFQ+KTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBvYmogb2YgbmV3RGF0YSkge1xuICAgICAgY29uc3QgZXhpc3RpbmcgPSB+dGhpcy5nZXRJdGVtSW5kZXgob2JqKTtcbiAgICAgIGlmIChleGlzdGluZykge1xuICAgICAgICB0aGlzLnJlcGxhY2VJdGVtKG9iaiwgZXhpc3RpbmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hZGRJdGVtKG9iaik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIGl0ZW1zIGZyb20gdGhlIGRhdGEgcHJvdmlkZXIgYW5kIGRpc3BhdGNoZXMgYSBDb2xsZWN0aW9uRXZlbnQuUkVNT1ZFX0FMTCBldmVudC5cbiAgICpcbiAgICogQG1lbWJlck9mIEFycmF5Q29sbGVjdGlvblxuICAgKi9cbiAgcmVtb3ZlQWxsKCk6IHZvaWQge1xuICAgIHRoaXMuc291cmNlID0gW107XG4gICAgdGhpcy5lZGl0RGF0YSA9IFtdO1xuICAgIHRoaXMuZmlsdGVyRGF0YSA9IFtdO1xuICAgIHRoaXMub25EYXRhQ2hhbmdlKG5ldyBDb2xsZWN0aW9uRXZlbnQoQ29sbGVjdGlvbkV2ZW50LlJFTU9WRV9BTEwsIFtdKSk7XG4gICAgdGhpcy5yZWZyZXNoKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgc3BlY2lmaWVkIGl0ZW0gZnJvbSB0aGUgZGF0YSBwcm92aWRlciBhbmQgZGlzcGF0Y2hlcyBhIENvbGxlY3Rpb25FdmVudC5SRU1PVkUgZXZlbnQuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBcnJheUNvbGxlY3Rpb25cbiAgICovXG4gIHJlbW92ZUl0ZW0oaXRlbTogVCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRJdGVtSW5kZXgoaXRlbSk7XG4gICAgcmV0dXJuIHRoaXMucmVtb3ZlSXRlbUF0KGluZGV4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBpdGVtIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXggYW5kIGRpc3BhdGNoZXMgYSBDb2xsZWN0aW9uRXZlbnQuUkVNT1ZFIGV2ZW50LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQXJyYXlDb2xsZWN0aW9uXG4gICAqL1xuICByZW1vdmVJdGVtQXQoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHN1Y2Nlc3MgPSAhIXRoaXMuc291cmNlLnNwbGljZShpbmRleCwgMSk7XG4gICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgcmV0dXJuIHN1Y2Nlc3M7XG4gIH1cblxuICAvKipcbiAgICogUmVwbGFjZXMgYW4gZXhpc3RpbmcgaXRlbSB3aXRoIGEgbmV3IGl0ZW0gYW5kIGRpc3BhdGNoZXMgYSBDb2xsZWN0aW9uRXZlbnQuUkVQTEFDRSBldmVudC5cbiAgICpcbiAgICogQG1lbWJlck9mIEFycmF5Q29sbGVjdGlvblxuICAgKi9cbiAgcmVwbGFjZUl0ZW0obmV3SXRlbTogYW55LCBvbGRJdGVtOiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRJdGVtSW5kZXgob2xkSXRlbSk7XG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgIHRoaXMucmVwbGFjZUl0ZW1BdChuZXdJdGVtLCBpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2VzIHRoZSBpdGVtIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXggYW5kIGRpc3BhdGNoZXMgYSBDb2xsZWN0aW9uRXZlbnQuUkVQTEFDRSBldmVudC5cbiAgICpcbiAgICogQG1lbWJlck9mIEFycmF5Q29sbGVjdGlvblxuICAgKi9cbiAgcmVwbGFjZUl0ZW1BdChuZXdJdGVtOiBhbnksIGluZGV4OiBudW1iZXIpOiBhbnkge1xuICAgIHRoaXMuZmlsdGVyRGF0YS5zcGxpY2UoaW5kZXgsIDEsIG5ld0l0ZW0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNvcnRzIHRoZSBpdGVtcyB0aGF0IHRoZSBkYXRhIHByb3ZpZGVyIGNvbnRhaW5zIGFuZCBkaXNwYXRjaGVzIGEgQ29sbGVjdGlvbkV2ZW50LlNPUlQgZXZlbnQuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBcnJheUNvbGxlY3Rpb25cbiAgICovXG4gIGdldCBzb3J0KCk6IEFycmF5PGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9zb3J0O1xuICB9XG5cbiAgc2V0IHNvcnQodmFsdWU6IEFycmF5PGFueT4pIHtcbiAgICB0aGlzLl9zb3J0ID0gdmFsdWU7XG4gICAgdGhpcy5yZWZyZXNoKCk7XG4gIH1cblxuICAvKipcbiAgICogU29ydHMgdGhlIGl0ZW1zIHRoYXQgdGhlIGRhdGEgcHJvdmlkZXIgY29udGFpbnMgYnkgdGhlIHNwZWNpZmllZCBmaWVsZCBhbmQgZGlzcGF0Y2hlcyBhIENvbGxlY3Rpb25FdmVudC5TT1JUIGV2ZW50LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQXJyYXlDb2xsZWN0aW9uXG4gICAqL1xuICBzb3J0T24oZmllbGROYW1lOiBhbnksIHJldmVyc2UgPSBmYWxzZSk6IEFycmF5PFQ+IHtcbiAgICB0aGlzLmZpbHRlckRhdGEgPSB0aGlzLmZpbHRlckRhdGEuc29ydChIZWxwZXJzLnNvcnRCeUZpZWxkKGZpZWxkTmFtZSwgcmV2ZXJzZSkpO1xuICAgIHRoaXMub25EYXRhQ2hhbmdlKG5ldyBDb2xsZWN0aW9uRXZlbnQoQ29sbGVjdGlvbkV2ZW50LlNPUlQpKTtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXJEYXRhO1xuICB9XG5cbiAgZ2V0IGZpbHRlcigpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9maWx0ZXI7XG4gIH1cblxuICBzZXQgZmlsdGVyKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9maWx0ZXIgPSB2YWx1ZTtcbiAgICB0aGlzLnJlZnJlc2goKTtcbiAgfVxuXG4gIGZpbHRlck9uKGZpZWxkTmFtZTogYW55LCB2YWx1ZTogYW55ID0gbnVsbCk6IEFycmF5PFQ+IHtcbiAgICB0aGlzLmZpbHRlckRhdGEgPSB0aGlzLmZpbHRlckRhdGEuZmlsdGVyKEhlbHBlcnMuZmlsdGVyQnlGaWVsZChmaWVsZE5hbWUsIHZhbHVlKSk7XG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyRGF0YTtcbiAgfVxuXG4gIG9uRGF0YUNoYW5nZShldmVudDogQ29sbGVjdGlvbkV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5kYXRhQ2hhbmdlLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgcmVmcmVzaCgpOiB2b2lkIHtcbiAgICB0aGlzLmZpbHRlckRhdGEgPSB0aGlzLmlzRWRpdGluZyA/IHRoaXMuZWRpdERhdGEuc2xpY2UoKSA6IHRoaXMuc291cmNlLnNsaWNlKCk7XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMuX3NvcnQucmV2ZXJzZSgpKSB7XG4gICAgICB0aGlzLnNvcnRPbihpdGVtLmZpZWxkLCBpdGVtLnJldmVyc2UpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLl9maWx0ZXIpIHtcbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgdGhpcy5maWx0ZXJPbihrZXksIHRoaXMuX2ZpbHRlcltrZXldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5vbkRhdGFDaGFuZ2UobmV3IENvbGxlY3Rpb25FdmVudChDb2xsZWN0aW9uRXZlbnQuQ0hBTkdFLCB0aGlzLmZpbHRlckRhdGEpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIEFycmF5IGFueSByZXByZXNlbnRhdGlvbiBvZiB0aGUgZGF0YSB0aGF0IHRoZSBkYXRhIHByb3ZpZGVyIGNvbnRhaW5zLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQXJyYXlDb2xsZWN0aW9uXG4gICAqL1xuICB0b0FycmF5KCk6IEFycmF5PFQ+IHtcbiAgICByZXR1cm4gdGhpcy5pc0VkaXRpbmcgPyB0aGlzLmVkaXREYXRhIDogdGhpcy5zb3VyY2U7XG4gIH1cblxuICB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNFZGl0aW5nID8gdGhpcy5lZGl0RGF0YSA6IHRoaXMuc291cmNlO1xuICB9XG59XG4iXX0=
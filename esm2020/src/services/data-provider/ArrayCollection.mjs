// Ng
import { EventEmitter } from '@angular/core';
import { Helpers } from '../../utils/Helpers';
import { CollectionEvent } from './CollectionEvent';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJyYXlDb2xsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvc2VydmljZXMvZGF0YS1wcm92aWRlci9BcnJheUNvbGxlY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsS0FBSztBQUNMLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRzlDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVwRDs7Ozs7Ozs7Ozs7O0dBWUc7QUFDSCxNQUFNLE9BQU8sZUFBZTtJQVMxQixZQUFZLFNBQW1CLEVBQUU7UUFSakMsZUFBVSxHQUFrQyxJQUFJLFlBQVksRUFBbUIsQ0FBQztRQUNoRixXQUFNLEdBQWEsRUFBRSxDQUFDO1FBQ3RCLGFBQVEsR0FBYSxFQUFFLENBQUM7UUFDeEIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixlQUFVLEdBQWEsRUFBRSxDQUFDO1FBQzFCLFlBQU8sR0FBUSxFQUFFLENBQUM7UUFDbEIsVUFBSyxHQUFlLEVBQUUsQ0FBQztRQUdyQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztJQUNoQyxDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztJQUNoQyxDQUFDO0lBRUQsSUFBSSxJQUFJ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ZUFBZSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE9BQU87UUFDTCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdEQsQ0FBQztJQUVELE1BQU07UUFDSixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdEQsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTmdcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJy4uLy4uL3V0aWxzL0hlbHBlcnMnO1xuLy8gQXBwXG5pbXBvcnQgeyBDb2xsZWN0aW9uIH0gZnJvbSAnLi9Db2xsZWN0aW9uJztcbmltcG9ydCB7IENvbGxlY3Rpb25FdmVudCB9IGZyb20gJy4vQ29sbGVjdGlvbkV2ZW50JztcblxuLyoqXG4gKiBCYXNlIENsYXNzIGZvciBhbGwgQ29sbGVjdGlvbiBiYXNlZCBkYXRhIHByb3ZpZGVyc1xuICpcbiAqIEBleGFtcGxlXG4gKiAgdmFyIGRwOkRhdGFQcm92aWRlciA9IG5ldyBEYXRhUHJvdmlkZXIoKTtcbiAqICBkcC5hZGRJdGVtKHtsYWJlbDpcIkl0ZW0gMVwifSk7XG4gKiAgZHAuYWRkSXRlbSh7bGFiZWw6XCJJdGVtIDJcIn0pO1xuICogIGRwLmFkZEl0ZW0oe2xhYmVsOlwiSXRlbSAzXCJ9KTtcbiAqICBkcC5hZGRJdGVtKHtsYWJlbDpcIkl0ZW0gNFwifSk7XG5cbiAqICB2YXIgbXlMaXN0Okxpc3QgPSBuZXcgTGlzdCgpO1xuICogIG15TGlzdC5kYXRhUHJvdmlkZXIgPSBkcDtcbiAqL1xuZXhwb3J0IGNsYXNzIEFycmF5Q29sbGVjdGlvbjxUPiBpbXBsZW1lbnRzIENvbGxlY3Rpb248VD4ge1xuICBkYXRhQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Q29sbGVjdGlvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Q29sbGVjdGlvbkV2ZW50PigpO1xuICBzb3VyY2U6IEFycmF5PFQ+ID0gW107XG4gIGVkaXREYXRhOiBBcnJheTxUPiA9IFtdO1xuICBpc0VkaXRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZmlsdGVyRGF0YTogQXJyYXk8VD4gPSBbXTtcbiAgX2ZpbHRlcjogYW55ID0ge307XG4gIF9zb3J0OiBBcnJheTxhbnk+ID0gW107XG5cbiAgY29uc3RydWN0b3Ioc291cmNlOiBBcnJheTxUPiA9IFtdKSB7XG4gICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XG4gICAgdGhpcy5lZGl0RGF0YSA9IHRoaXMuY29weSh0aGlzLnNvdXJjZSk7XG4gICAgdGhpcy5maWx0ZXJEYXRhID0gdGhpcy5zb3VyY2Uuc2xpY2UoKTtcbiAgfVxuXG4gIGdldCBsZW5ndGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyRGF0YS5sZW5ndGg7XG4gIH1cblxuICBnZXQgdG90YWwoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXJEYXRhLmxlbmd0aDtcbiAgfVxuXG4gIGdldCBsaXN0KCk6IEFycmF5PFQ+IHtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXJEYXRhO1xuICB9XG5cbiAgaXNFbXB0eSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5sZW5ndGggPD0gMCAmJiAhdGhpcy5pc0xvYWRpbmcoKSAmJiAhdGhpcy5oYXNFcnJvcnMoKTtcbiAgfVxuXG4gIGhhc0Vycm9ycygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc0xvYWRpbmcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNGaWx0ZXJlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5fZmlsdGVyKS5sZW5ndGggPiAwO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byBzd2l0Y2ggdGhlIGlzRWRpdGluZ2ZsYWcgZm9yIHRoZSBkYXRhIHNvdXJjZVxuICAgKi9cbiAgZWRpdCgpIHtcbiAgICB0aGlzLmlzRWRpdGluZyA9IHRydWU7XG4gICAgdGhpcy5lZGl0RGF0YSA9IHRoaXMuY29weSh0aGlzLnNvdXJjZSk7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHRvIGxlYXZlIGVkaXQgbW9kZSBhbmQgcmVzZXQgc291cmNlXG4gICAqL1xuICB1bmRvKCkge1xuICAgIHRoaXMuaXNFZGl0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5zb3VyY2UgPSB0aGlzLmNvcHkodGhpcy5lZGl0RGF0YSk7XG4gICAgdGhpcy5yZWZyZXNoKCk7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHRvIGxlYXZlIGVkaXQgbW9kZSBhbmQgc2F2ZSBlZGl0RGF0YVxuICAgKi9cbiAgY29tbWl0KCkge1xuICAgIHRoaXMuaXNFZGl0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5zb3VyY2UgPSB0aGlzLmZpbHRlckRhdGEuc2xpY2UoKTtcbiAgICB0aGlzLnJlZnJlc2goKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBlbmRzIGFuIGl0ZW0gdG8gdGhlIGVuZCBvZiB0aGUgZGF0YSBwcm92aWRlci5cbiAgICpcbiAgICpcbiAgICogQG1lbWJlck9mIEFycmF5Q29sbGVjdGlvblxuICAgKi9cbiAgYWRkSXRlbShpdGVtOiBUKTogdm9pZCB7XG4gICAgdGhpcy5pc0VkaXRpbmcgPyB0aGlzLmVkaXREYXRhLnB1c2goaXRlbSkgOiB0aGlzLnNvdXJjZS5wdXNoKGl0ZW0pO1xuICAgIHRoaXMub25EYXRhQ2hhbmdlKG5ldyBDb2xsZWN0aW9uRXZlbnQoQ29sbGVjdGlvbkV2ZW50LkFERCwgW2l0ZW1dKSk7XG4gICAgdGhpcy5yZWZyZXNoKCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIG5ldyBpdGVtIHRvIHRoZSBkYXRhIHByb3ZpZGVyIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguXG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBcnJheUNvbGxlY3Rpb25cbiAgICovXG4gIGFkZEl0ZW1BdChpdGVtOiBULCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5pc0VkaXRpbmcgPyB0aGlzLmVkaXREYXRhLnNwbGljZShpbmRleCwgMCwgaXRlbSkgOiB0aGlzLnNvdXJjZS5zcGxpY2UoaW5kZXgsIDAsIGl0ZW0pO1xuICAgIHRoaXMub25EYXRhQ2hhbmdlKG5ldyBDb2xsZWN0aW9uRXZlbnQoQ29sbGVjdGlvbkV2ZW50LkFERCwgW2l0ZW1dKSk7XG4gICAgdGhpcy5yZWZyZXNoKCk7XG4gIH1cblxuICAvKipcbiAgICogIEFwcGVuZHMgbXVsdGlwbGUgaXRlbXMgdG8gdGhlIGVuZCBvZiB0aGUgRGF0YVByb3ZpZGVyIGFuZCBkaXNwYXRjaGVzIGEgQ29sbGVjdGlvbkV2ZW50LkFERCBldmVudC5cbiAgICpcbiAgICogQG1lbWJlck9mIEFycmF5Q29sbGVjdGlvblxuICAgKi9cbiAgYWRkSXRlbXMoaXRlbXM6IEFycmF5PFQ+KTogdm9pZCB7XG4gICAgdGhpcy5pc0VkaXRpbmcgPyB0aGlzLmVkaXREYXRhLnB1c2goLi4uaXRlbXMpIDogdGhpcy5zb3VyY2UucHVzaCguLi5pdGVtcyk7XG4gICAgdGhpcy5vbkRhdGFDaGFuZ2UobmV3IENvbGxlY3Rpb25FdmVudChDb2xsZWN0aW9uRXZlbnQuQURELCBpdGVtcykpO1xuICAgIHRoaXMucmVmcmVzaCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgc2V2ZXJhbCBpdGVtcyB0byB0aGUgZGF0YSBwcm92aWRlciBhdCB0aGUgc3BlY2lmaWVkIGluZGV4IGFuZCBkaXNwYXRjaGVzIGEgQ29sbGVjdGlvbkV2ZW50LkFERCBldmVudC5cbiAgICpcbiAgICogQG1lbWJlck9mIEFycmF5Q29sbGVjdGlvblxuICAgKi9cbiAgYWRkSXRlbXNBdChpdGVtczogQXJyYXk8VD4sIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmlzRWRpdGluZyA/IHRoaXMuZWRpdERhdGEuc3BsaWNlKGluZGV4LCAwLCAuLi5pdGVtcykgOiB0aGlzLnNvdXJjZS5zcGxpY2UoaW5kZXgsIDAsIC4uLml0ZW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgY29weSBvZiB0aGUgY3VycmVudCBBcnJheUNvbGxlY3Rpb24gYW55LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQXJyYXlDb2xsZWN0aW9uXG4gICAqL1xuICBjbG9uZSgpOiBBcnJheUNvbGxlY3Rpb248VD4ge1xuICAgIHJldHVybiBuZXcgQXJyYXlDb2xsZWN0aW9uKHRoaXMuaXNFZGl0aW5nID8gdGhpcy5jb3B5KHRoaXMuZWRpdERhdGEpIDogdGhpcy5jb3B5KHRoaXMuc291cmNlKSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGNvcHkgb2YgdGhlIGN1cnJlbnQgQXJyYXlDb2xsZWN0aW9uIGFueS5cbiAgICpcbiAgICogQG1lbWJlck9mIEFycmF5Q29sbGVjdGlvblxuICAgKi9cbiAgY29weShhcnJheTogYW55W10pIHtcbiAgICByZXR1cm4gSGVscGVycy5kZWVwQ2xvbmUoYXJyYXkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbmNhdGVuYXRlcyB0aGUgc3BlY2lmaWVkIGl0ZW1zIHRvIHRoZSBlbmQgb2YgdGhlIGN1cnJlbnQgZGF0YSBwcm92aWRlci5cbiAgICpcbiAgICogQG1lbWJlck9mIEFycmF5Q29sbGVjdGlvblxuICAgKi9cbiAgY29uY2F0KGl0ZW1zOiBBcnJheTxUPik6IHZvaWQge1xuICAgIHRoaXMuYWRkSXRlbXMoaXRlbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGl0ZW0gYXQgdGhlIHNwZWNpZmllZCBpbmRleC5cbiAgICpcbiAgICogQG1lbWJlck9mIEFycmF5Q29sbGVjdGlvblxuICAgKi9cbiAgZ2V0SXRlbUF0KGluZGV4OiBudW1iZXIpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmlzRWRpdGluZyA/IHRoaXMuZWRpdERhdGFbaW5kZXhdIDogdGhpcy5zb3VyY2VbaW5kZXhdO1xuICB9XG5cbiAgLyoqXG4gICAqICBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgc3BlY2lmaWVkIGl0ZW0uXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBcnJheUNvbGxlY3Rpb25cbiAgICovXG4gIGdldEl0ZW1JbmRleChpdGVtOiBUKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5pc0VkaXRpbmcgPyB0aGlzLmVkaXREYXRhLmluZGV4T2YoaXRlbSkgOiB0aGlzLnNvdXJjZS5pbmRleE9mKGl0ZW0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEludmFsaWRhdGVzIGFsbCB0aGUgZGF0YSBpdGVtcyB0aGF0IHRoZSBEYXRhUHJvdmlkZXIgY29udGFpbnMgYW5kIGRpc3BhdGNoZXMgYSBDb2xsZWN0aW9uRXZlbnQuSU5WQUxJREFURV9BTEwgZXZlbnQuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBcnJheUNvbGxlY3Rpb25cbiAgICovXG4gIGludmFsaWRhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5vbkRhdGFDaGFuZ2UobmV3IENvbGxlY3Rpb25FdmVudChDb2xsZWN0aW9uRXZlbnQuSU5WQUxJREFURV9BTEwpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnZhbGlkYXRlcyB0aGUgc3BlY2lmaWVkIGl0ZW0uXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBcnJheUNvbGxlY3Rpb25cbiAgICovXG4gIC8vIGludmFsaWRhdGVJdGVtKGl0ZW06YW55KTp2b2lkIHt9XG5cbiAgLyoqXG4gICAqIEludmFsaWRhdGVzIHRoZSBpdGVtIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBcnJheUNvbGxlY3Rpb25cbiAgICovXG4gIC8vIGludmFsaWRhdGVJdGVtQXQoaW5kZXg6bnVtYmVyKTp2b2lkIHt9XG5cbiAgLyoqXG4gICAqIEFwcGVuZHMgdGhlIHNwZWNpZmllZCBkYXRhIGludG8gdGhlIGRhdGEgdGhhdCB0aGUgZGF0YSBwcm92aWRlciBjb250YWlucyBhbmQgcmVtb3ZlcyBhbnkgZHVwbGljYXRlIGl0ZW1zLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQXJyYXlDb2xsZWN0aW9uXG4gICAqL1xuICBtZXJnZShuZXdEYXRhOiBBcnJheTxUPik6IHZvaWQge1xuICAgIGZvciAoY29uc3Qgb2JqIG9mIG5ld0RhdGEpIHtcbiAgICAgIGNvbnN0IGV4aXN0aW5nID0gfnRoaXMuZ2V0SXRlbUluZGV4KG9iaik7XG4gICAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgICAgdGhpcy5yZXBsYWNlSXRlbShvYmosIGV4aXN0aW5nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYWRkSXRlbShvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCBpdGVtcyBmcm9tIHRoZSBkYXRhIHByb3ZpZGVyIGFuZCBkaXNwYXRjaGVzIGEgQ29sbGVjdGlvbkV2ZW50LlJFTU9WRV9BTEwgZXZlbnQuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBcnJheUNvbGxlY3Rpb25cbiAgICovXG4gIHJlbW92ZUFsbCgpOiB2b2lkIHtcbiAgICB0aGlzLnNvdXJjZSA9IFtdO1xuICAgIHRoaXMuZWRpdERhdGEgPSBbXTtcbiAgICB0aGlzLmZpbHRlckRhdGEgPSBbXTtcbiAgICB0aGlzLm9uRGF0YUNoYW5nZShuZXcgQ29sbGVjdGlvbkV2ZW50KENvbGxlY3Rpb25FdmVudC5SRU1PVkVfQUxMLCBbXSkpO1xuICAgIHRoaXMucmVmcmVzaCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIHNwZWNpZmllZCBpdGVtIGZyb20gdGhlIGRhdGEgcHJvdmlkZXIgYW5kIGRpc3BhdGNoZXMgYSBDb2xsZWN0aW9uRXZlbnQuUkVNT1ZFIGV2ZW50LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQXJyYXlDb2xsZWN0aW9uXG4gICAqL1xuICByZW1vdmVJdGVtKGl0ZW06IFQpOiBib29sZWFuIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0SXRlbUluZGV4KGl0ZW0pO1xuICAgIHJldHVybiB0aGlzLnJlbW92ZUl0ZW1BdChpbmRleCk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgaXRlbSBhdCB0aGUgc3BlY2lmaWVkIGluZGV4IGFuZCBkaXNwYXRjaGVzIGEgQ29sbGVjdGlvbkV2ZW50LlJFTU9WRSBldmVudC5cbiAgICpcbiAgICogQG1lbWJlck9mIEFycmF5Q29sbGVjdGlvblxuICAgKi9cbiAgcmVtb3ZlSXRlbUF0KGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBjb25zdCBzdWNjZXNzID0gISF0aGlzLnNvdXJjZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRoaXMucmVmcmVzaCgpO1xuICAgIHJldHVybiBzdWNjZXNzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2VzIGFuIGV4aXN0aW5nIGl0ZW0gd2l0aCBhIG5ldyBpdGVtIGFuZCBkaXNwYXRjaGVzIGEgQ29sbGVjdGlvbkV2ZW50LlJFUExBQ0UgZXZlbnQuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBcnJheUNvbGxlY3Rpb25cbiAgICovXG4gIHJlcGxhY2VJdGVtKG5ld0l0ZW06IGFueSwgb2xkSXRlbTogYW55KTogYW55IHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0SXRlbUluZGV4KG9sZEl0ZW0pO1xuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICB0aGlzLnJlcGxhY2VJdGVtQXQobmV3SXRlbSwgaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlcyB0aGUgaXRlbSBhdCB0aGUgc3BlY2lmaWVkIGluZGV4IGFuZCBkaXNwYXRjaGVzIGEgQ29sbGVjdGlvbkV2ZW50LlJFUExBQ0UgZXZlbnQuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBcnJheUNvbGxlY3Rpb25cbiAgICovXG4gIHJlcGxhY2VJdGVtQXQobmV3SXRlbTogYW55LCBpbmRleDogbnVtYmVyKTogYW55IHtcbiAgICB0aGlzLmZpbHRlckRhdGEuc3BsaWNlKGluZGV4LCAxLCBuZXdJdGVtKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTb3J0cyB0aGUgaXRlbXMgdGhhdCB0aGUgZGF0YSBwcm92aWRlciBjb250YWlucyBhbmQgZGlzcGF0Y2hlcyBhIENvbGxlY3Rpb25FdmVudC5TT1JUIGV2ZW50LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQXJyYXlDb2xsZWN0aW9uXG4gICAqL1xuICBnZXQgc29ydCgpOiBBcnJheTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fc29ydDtcbiAgfVxuXG4gIHNldCBzb3J0KHZhbHVlOiBBcnJheTxhbnk+KSB7XG4gICAgdGhpcy5fc29ydCA9IHZhbHVlO1xuICAgIHRoaXMucmVmcmVzaCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNvcnRzIHRoZSBpdGVtcyB0aGF0IHRoZSBkYXRhIHByb3ZpZGVyIGNvbnRhaW5zIGJ5IHRoZSBzcGVjaWZpZWQgZmllbGQgYW5kIGRpc3BhdGNoZXMgYSBDb2xsZWN0aW9uRXZlbnQuU09SVCBldmVudC5cbiAgICpcbiAgICogQG1lbWJlck9mIEFycmF5Q29sbGVjdGlvblxuICAgKi9cbiAgc29ydE9uKGZpZWxkTmFtZTogYW55LCByZXZlcnNlID0gZmFsc2UpOiBBcnJheTxUPiB7XG4gICAgdGhpcy5maWx0ZXJEYXRhID0gdGhpcy5maWx0ZXJEYXRhLnNvcnQoSGVscGVycy5zb3J0QnlGaWVsZChmaWVsZE5hbWUsIHJldmVyc2UpKTtcbiAgICB0aGlzLm9uRGF0YUNoYW5nZShuZXcgQ29sbGVjdGlvbkV2ZW50KENvbGxlY3Rpb25FdmVudC5TT1JUKSk7XG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyRGF0YTtcbiAgfVxuXG4gIGdldCBmaWx0ZXIoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fZmlsdGVyO1xuICB9XG5cbiAgc2V0IGZpbHRlcih2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5fZmlsdGVyID0gdmFsdWU7XG4gICAgdGhpcy5yZWZyZXNoKCk7XG4gIH1cblxuICBmaWx0ZXJPbihmaWVsZE5hbWU6IGFueSwgdmFsdWU6IGFueSA9IG51bGwpOiBBcnJheTxUPiB7XG4gICAgdGhpcy5maWx0ZXJEYXRhID0gdGhpcy5maWx0ZXJEYXRhLmZpbHRlcihIZWxwZXJzLmZpbHRlckJ5RmllbGQoZmllbGROYW1lLCB2YWx1ZSkpO1xuICAgIHJldHVybiB0aGlzLmZpbHRlckRhdGE7XG4gIH1cblxuICBvbkRhdGFDaGFuZ2UoZXZlbnQ6IENvbGxlY3Rpb25FdmVudCk6IHZvaWQge1xuICAgIHRoaXMuZGF0YUNoYW5nZS5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIHJlZnJlc2goKTogdm9pZCB7XG4gICAgdGhpcy5maWx0ZXJEYXRhID0gdGhpcy5pc0VkaXRpbmcgPyB0aGlzLmVkaXREYXRhLnNsaWNlKCkgOiB0aGlzLnNvdXJjZS5zbGljZSgpO1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiB0aGlzLl9zb3J0LnJldmVyc2UoKSkge1xuICAgICAgdGhpcy5zb3J0T24oaXRlbS5maWVsZCwgaXRlbS5yZXZlcnNlKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5fZmlsdGVyKSB7XG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIHRoaXMuZmlsdGVyT24oa2V5LCB0aGlzLl9maWx0ZXJba2V5XSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMub25EYXRhQ2hhbmdlKG5ldyBDb2xsZWN0aW9uRXZlbnQoQ29sbGVjdGlvbkV2ZW50LkNIQU5HRSwgdGhpcy5maWx0ZXJEYXRhKSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBBcnJheSBhbnkgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRhdGEgdGhhdCB0aGUgZGF0YSBwcm92aWRlciBjb250YWlucy5cbiAgICpcbiAgICogQG1lbWJlck9mIEFycmF5Q29sbGVjdGlvblxuICAgKi9cbiAgdG9BcnJheSgpOiBBcnJheTxUPiB7XG4gICAgcmV0dXJuIHRoaXMuaXNFZGl0aW5nID8gdGhpcy5lZGl0RGF0YSA6IHRoaXMuc291cmNlO1xuICB9XG5cbiAgdG9KU09OKCkge1xuICAgIHJldHVybiB0aGlzLmlzRWRpdGluZyA/IHRoaXMuZWRpdERhdGEgOiB0aGlzLnNvdXJjZTtcbiAgfVxufVxuIl19
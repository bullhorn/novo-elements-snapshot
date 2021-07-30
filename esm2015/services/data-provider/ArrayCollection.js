// Ng
import { EventEmitter } from '@angular/core';
import { CollectionEvent } from './CollectionEvent';
import { Helpers } from '../../utils/Helpers';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJyYXlDb2xsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9kZXZtYWNoaW5lL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9kYXRhLXByb3ZpZGVyL0FycmF5Q29sbGVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxLQUFLO0FBQ0wsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUc3QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDcEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRTlDOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sT0FBTyxlQUFlO0lBUzFCLFlBQVksU0FBbUIsRUFBRTtRQVJqQyxlQUFVLEdBQWtDLElBQUksWUFBWSxFQUFtQixDQUFDO1FBQ2hGLFdBQU0sR0FBYSxFQUFFLENBQUM7UUFDdEIsYUFBUSxHQUFhLEVBQUUsQ0FBQztRQUN4QixjQUFTLEdBQVksS0FBSyxDQUFDO1FBQzNCLGVBQVUsR0FBYSxFQUFFLENBQUM7UUFDMUIsWUFBTyxHQUFRLEVBQUUsQ0FBQztRQUNsQixVQUFLLEdBQWUsRUFBRSxDQUFDO1FBR3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO0lBQ2hDLENBQUM7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QUFJLGVBQWUsQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsT0FBTztRQUNMLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN0RCxDQUFDO0lBRUQsTUFBTTtRQUNKLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN0RCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBOZ1xyXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuLy8gQXBwXHJcbmltcG9ydCB7IENvbGxlY3Rpb24gfSBmcm9tICcuL0NvbGxlY3Rpb24nO1xyXG5pbXBvcnQgeyBDb2xsZWN0aW9uRXZlbnQgfSBmcm9tICcuL0NvbGxlY3Rpb25FdmVudCc7XHJcbmltcG9ydCB7IEhlbHBlcnMgfSBmcm9tICcuLi8uLi91dGlscy9IZWxwZXJzJztcclxuXHJcbi8qKlxyXG4gKiBCYXNlIENsYXNzIGZvciBhbGwgQ29sbGVjdGlvbiBiYXNlZCBkYXRhIHByb3ZpZGVyc1xyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiAgdmFyIGRwOkRhdGFQcm92aWRlciA9IG5ldyBEYXRhUHJvdmlkZXIoKTtcclxuICogIGRwLmFkZEl0ZW0oe2xhYmVsOlwiSXRlbSAxXCJ9KTtcclxuICogIGRwLmFkZEl0ZW0oe2xhYmVsOlwiSXRlbSAyXCJ9KTtcclxuICogIGRwLmFkZEl0ZW0oe2xhYmVsOlwiSXRlbSAzXCJ9KTtcclxuICogIGRwLmFkZEl0ZW0oe2xhYmVsOlwiSXRlbSA0XCJ9KTtcclxuXHJcbiAqICB2YXIgbXlMaXN0Okxpc3QgPSBuZXcgTGlzdCgpO1xyXG4gKiAgbXlMaXN0LmRhdGFQcm92aWRlciA9IGRwO1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFycmF5Q29sbGVjdGlvbjxUPiBpbXBsZW1lbnRzIENvbGxlY3Rpb248VD4ge1xyXG4gIGRhdGFDaGFuZ2U6IEV2ZW50RW1pdHRlcjxDb2xsZWN0aW9uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxDb2xsZWN0aW9uRXZlbnQ+KCk7XHJcbiAgc291cmNlOiBBcnJheTxUPiA9IFtdO1xyXG4gIGVkaXREYXRhOiBBcnJheTxUPiA9IFtdO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGZpbHRlckRhdGE6IEFycmF5PFQ+ID0gW107XHJcbiAgX2ZpbHRlcjogYW55ID0ge307XHJcbiAgX3NvcnQ6IEFycmF5PGFueT4gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3Ioc291cmNlOiBBcnJheTxUPiA9IFtdKSB7XHJcbiAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcclxuICAgIHRoaXMuZWRpdERhdGEgPSB0aGlzLmNvcHkodGhpcy5zb3VyY2UpO1xyXG4gICAgdGhpcy5maWx0ZXJEYXRhID0gdGhpcy5zb3VyY2Uuc2xpY2UoKTtcclxuICB9XHJcblxyXG4gIGdldCBsZW5ndGgoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maWx0ZXJEYXRhLmxlbmd0aDtcclxuICB9XHJcblxyXG4gIGdldCB0b3RhbCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyRGF0YS5sZW5ndGg7XHJcbiAgfVxyXG5cclxuICBnZXQgbGlzdCgpOiBBcnJheTxUPiB7XHJcbiAgICByZXR1cm4gdGhpcy5maWx0ZXJEYXRhO1xyXG4gIH1cclxuXHJcbiAgaXNFbXB0eSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmxlbmd0aCA8PSAwICYmICF0aGlzLmlzTG9hZGluZygpICYmICF0aGlzLmhhc0Vycm9ycygpO1xyXG4gIH1cclxuXHJcbiAgaGFzRXJyb3JzKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaXNMb2FkaW5nKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaXNGaWx0ZXJlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl9maWx0ZXIpLmxlbmd0aCA+IDA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNZXRob2QgdG8gc3dpdGNoIHRoZSBpc0VkaXRpbmdmbGFnIGZvciB0aGUgZGF0YSBzb3VyY2VcclxuICAgKi9cclxuICBlZGl0KCkge1xyXG4gICAgdGhpcy5pc0VkaXRpbmcgPSB0cnVlO1xyXG4gICAgdGhpcy5lZGl0RGF0YSA9IHRoaXMuY29weSh0aGlzLnNvdXJjZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNZXRob2QgdG8gbGVhdmUgZWRpdCBtb2RlIGFuZCByZXNldCBzb3VyY2VcclxuICAgKi9cclxuICB1bmRvKCkge1xyXG4gICAgdGhpcy5pc0VkaXRpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuc291cmNlID0gdGhpcy5jb3B5KHRoaXMuZWRpdERhdGEpO1xyXG4gICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNZXRob2QgdG8gbGVhdmUgZWRpdCBtb2RlIGFuZCBzYXZlIGVkaXREYXRhXHJcbiAgICovXHJcbiAgY29tbWl0KCkge1xyXG4gICAgdGhpcy5pc0VkaXRpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuc291cmNlID0gdGhpcy5maWx0ZXJEYXRhLnNsaWNlKCk7XHJcbiAgICB0aGlzLnJlZnJlc2goKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFwcGVuZHMgYW4gaXRlbSB0byB0aGUgZW5kIG9mIHRoZSBkYXRhIHByb3ZpZGVyLlxyXG4gICAqXHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgQXJyYXlDb2xsZWN0aW9uXHJcbiAgICovXHJcbiAgYWRkSXRlbShpdGVtOiBUKTogdm9pZCB7XHJcbiAgICB0aGlzLmlzRWRpdGluZyA/IHRoaXMuZWRpdERhdGEucHVzaChpdGVtKSA6IHRoaXMuc291cmNlLnB1c2goaXRlbSk7XHJcbiAgICB0aGlzLm9uRGF0YUNoYW5nZShuZXcgQ29sbGVjdGlvbkV2ZW50KENvbGxlY3Rpb25FdmVudC5BREQsIFtpdGVtXSkpO1xyXG4gICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGRzIGEgbmV3IGl0ZW0gdG8gdGhlIGRhdGEgcHJvdmlkZXIgYXQgdGhlIHNwZWNpZmllZCBpbmRleC5cclxuICAgKlxyXG4gICAqXHJcbiAgICogQG1lbWJlck9mIEFycmF5Q29sbGVjdGlvblxyXG4gICAqL1xyXG4gIGFkZEl0ZW1BdChpdGVtOiBULCBpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICB0aGlzLmlzRWRpdGluZyA/IHRoaXMuZWRpdERhdGEuc3BsaWNlKGluZGV4LCAwLCBpdGVtKSA6IHRoaXMuc291cmNlLnNwbGljZShpbmRleCwgMCwgaXRlbSk7XHJcbiAgICB0aGlzLm9uRGF0YUNoYW5nZShuZXcgQ29sbGVjdGlvbkV2ZW50KENvbGxlY3Rpb25FdmVudC5BREQsIFtpdGVtXSkpO1xyXG4gICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiAgQXBwZW5kcyBtdWx0aXBsZSBpdGVtcyB0byB0aGUgZW5kIG9mIHRoZSBEYXRhUHJvdmlkZXIgYW5kIGRpc3BhdGNoZXMgYSBDb2xsZWN0aW9uRXZlbnQuQUREIGV2ZW50LlxyXG4gICAqXHJcbiAgICogQG1lbWJlck9mIEFycmF5Q29sbGVjdGlvblxyXG4gICAqL1xyXG4gIGFkZEl0ZW1zKGl0ZW1zOiBBcnJheTxUPik6IHZvaWQge1xyXG4gICAgdGhpcy5pc0VkaXRpbmcgPyB0aGlzLmVkaXREYXRhLnB1c2goLi4uaXRlbXMpIDogdGhpcy5zb3VyY2UucHVzaCguLi5pdGVtcyk7XHJcbiAgICB0aGlzLm9uRGF0YUNoYW5nZShuZXcgQ29sbGVjdGlvbkV2ZW50KENvbGxlY3Rpb25FdmVudC5BREQsIGl0ZW1zKSk7XHJcbiAgICB0aGlzLnJlZnJlc2goKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgc2V2ZXJhbCBpdGVtcyB0byB0aGUgZGF0YSBwcm92aWRlciBhdCB0aGUgc3BlY2lmaWVkIGluZGV4IGFuZCBkaXNwYXRjaGVzIGEgQ29sbGVjdGlvbkV2ZW50LkFERCBldmVudC5cclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBBcnJheUNvbGxlY3Rpb25cclxuICAgKi9cclxuICBhZGRJdGVtc0F0KGl0ZW1zOiBBcnJheTxUPiwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgdGhpcy5pc0VkaXRpbmcgPyB0aGlzLmVkaXREYXRhLnNwbGljZShpbmRleCwgMCwgLi4uaXRlbXMpIDogdGhpcy5zb3VyY2Uuc3BsaWNlKGluZGV4LCAwLCAuLi5pdGVtcyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgY29weSBvZiB0aGUgY3VycmVudCBBcnJheUNvbGxlY3Rpb24gYW55LlxyXG4gICAqXHJcbiAgICogQG1lbWJlck9mIEFycmF5Q29sbGVjdGlvblxyXG4gICAqL1xyXG4gIGNsb25lKCk6IEFycmF5Q29sbGVjdGlvbjxUPiB7XHJcbiAgICByZXR1cm4gbmV3IEFycmF5Q29sbGVjdGlvbih0aGlzLmlzRWRpdGluZyA/IHRoaXMuY29weSh0aGlzLmVkaXREYXRhKSA6IHRoaXMuY29weSh0aGlzLnNvdXJjZSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhIGNvcHkgb2YgdGhlIGN1cnJlbnQgQXJyYXlDb2xsZWN0aW9uIGFueS5cclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBBcnJheUNvbGxlY3Rpb25cclxuICAgKi9cclxuICBjb3B5KGFycmF5OiBhbnlbXSkge1xyXG4gICAgcmV0dXJuIEhlbHBlcnMuZGVlcENsb25lKGFycmF5KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbmNhdGVuYXRlcyB0aGUgc3BlY2lmaWVkIGl0ZW1zIHRvIHRoZSBlbmQgb2YgdGhlIGN1cnJlbnQgZGF0YSBwcm92aWRlci5cclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBBcnJheUNvbGxlY3Rpb25cclxuICAgKi9cclxuICBjb25jYXQoaXRlbXM6IEFycmF5PFQ+KTogdm9pZCB7XHJcbiAgICB0aGlzLmFkZEl0ZW1zKGl0ZW1zKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIGl0ZW0gYXQgdGhlIHNwZWNpZmllZCBpbmRleC5cclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBBcnJheUNvbGxlY3Rpb25cclxuICAgKi9cclxuICBnZXRJdGVtQXQoaW5kZXg6IG51bWJlcik6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5pc0VkaXRpbmcgPyB0aGlzLmVkaXREYXRhW2luZGV4XSA6IHRoaXMuc291cmNlW2luZGV4XTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqICBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgc3BlY2lmaWVkIGl0ZW0uXHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgQXJyYXlDb2xsZWN0aW9uXHJcbiAgICovXHJcbiAgZ2V0SXRlbUluZGV4KGl0ZW06IFQpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuaXNFZGl0aW5nID8gdGhpcy5lZGl0RGF0YS5pbmRleE9mKGl0ZW0pIDogdGhpcy5zb3VyY2UuaW5kZXhPZihpdGVtKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEludmFsaWRhdGVzIGFsbCB0aGUgZGF0YSBpdGVtcyB0aGF0IHRoZSBEYXRhUHJvdmlkZXIgY29udGFpbnMgYW5kIGRpc3BhdGNoZXMgYSBDb2xsZWN0aW9uRXZlbnQuSU5WQUxJREFURV9BTEwgZXZlbnQuXHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgQXJyYXlDb2xsZWN0aW9uXHJcbiAgICovXHJcbiAgaW52YWxpZGF0ZSgpOiB2b2lkIHtcclxuICAgIHRoaXMub25EYXRhQ2hhbmdlKG5ldyBDb2xsZWN0aW9uRXZlbnQoQ29sbGVjdGlvbkV2ZW50LklOVkFMSURBVEVfQUxMKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnZhbGlkYXRlcyB0aGUgc3BlY2lmaWVkIGl0ZW0uXHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgQXJyYXlDb2xsZWN0aW9uXHJcbiAgICovXHJcbiAgLy8gaW52YWxpZGF0ZUl0ZW0oaXRlbTphbnkpOnZvaWQge31cclxuXHJcbiAgLyoqXHJcbiAgICogSW52YWxpZGF0ZXMgdGhlIGl0ZW0gYXQgdGhlIHNwZWNpZmllZCBpbmRleC5cclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBBcnJheUNvbGxlY3Rpb25cclxuICAgKi9cclxuICAvLyBpbnZhbGlkYXRlSXRlbUF0KGluZGV4Om51bWJlcik6dm9pZCB7fVxyXG5cclxuICAvKipcclxuICAgKiBBcHBlbmRzIHRoZSBzcGVjaWZpZWQgZGF0YSBpbnRvIHRoZSBkYXRhIHRoYXQgdGhlIGRhdGEgcHJvdmlkZXIgY29udGFpbnMgYW5kIHJlbW92ZXMgYW55IGR1cGxpY2F0ZSBpdGVtcy5cclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBBcnJheUNvbGxlY3Rpb25cclxuICAgKi9cclxuICBtZXJnZShuZXdEYXRhOiBBcnJheTxUPik6IHZvaWQge1xyXG4gICAgZm9yIChjb25zdCBvYmogb2YgbmV3RGF0YSkge1xyXG4gICAgICBjb25zdCBleGlzdGluZyA9IH50aGlzLmdldEl0ZW1JbmRleChvYmopO1xyXG4gICAgICBpZiAoZXhpc3RpbmcpIHtcclxuICAgICAgICB0aGlzLnJlcGxhY2VJdGVtKG9iaiwgZXhpc3RpbmcpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuYWRkSXRlbShvYmopO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmVzIGFsbCBpdGVtcyBmcm9tIHRoZSBkYXRhIHByb3ZpZGVyIGFuZCBkaXNwYXRjaGVzIGEgQ29sbGVjdGlvbkV2ZW50LlJFTU9WRV9BTEwgZXZlbnQuXHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgQXJyYXlDb2xsZWN0aW9uXHJcbiAgICovXHJcbiAgcmVtb3ZlQWxsKCk6IHZvaWQge1xyXG4gICAgdGhpcy5zb3VyY2UgPSBbXTtcclxuICAgIHRoaXMuZWRpdERhdGEgPSBbXTtcclxuICAgIHRoaXMuZmlsdGVyRGF0YSA9IFtdO1xyXG4gICAgdGhpcy5vbkRhdGFDaGFuZ2UobmV3IENvbGxlY3Rpb25FdmVudChDb2xsZWN0aW9uRXZlbnQuUkVNT1ZFX0FMTCwgW10pKTtcclxuICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlcyB0aGUgc3BlY2lmaWVkIGl0ZW0gZnJvbSB0aGUgZGF0YSBwcm92aWRlciBhbmQgZGlzcGF0Y2hlcyBhIENvbGxlY3Rpb25FdmVudC5SRU1PVkUgZXZlbnQuXHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgQXJyYXlDb2xsZWN0aW9uXHJcbiAgICovXHJcbiAgcmVtb3ZlSXRlbShpdGVtOiBUKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0SXRlbUluZGV4KGl0ZW0pO1xyXG4gICAgcmV0dXJuIHRoaXMucmVtb3ZlSXRlbUF0KGluZGV4KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZXMgdGhlIGl0ZW0gYXQgdGhlIHNwZWNpZmllZCBpbmRleCBhbmQgZGlzcGF0Y2hlcyBhIENvbGxlY3Rpb25FdmVudC5SRU1PVkUgZXZlbnQuXHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgQXJyYXlDb2xsZWN0aW9uXHJcbiAgICovXHJcbiAgcmVtb3ZlSXRlbUF0KGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IHN1Y2Nlc3MgPSAhIXRoaXMuc291cmNlLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgIHJldHVybiBzdWNjZXNzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVwbGFjZXMgYW4gZXhpc3RpbmcgaXRlbSB3aXRoIGEgbmV3IGl0ZW0gYW5kIGRpc3BhdGNoZXMgYSBDb2xsZWN0aW9uRXZlbnQuUkVQTEFDRSBldmVudC5cclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBBcnJheUNvbGxlY3Rpb25cclxuICAgKi9cclxuICByZXBsYWNlSXRlbShuZXdJdGVtOiBhbnksIG9sZEl0ZW06IGFueSk6IGFueSB7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0SXRlbUluZGV4KG9sZEl0ZW0pO1xyXG4gICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgdGhpcy5yZXBsYWNlSXRlbUF0KG5ld0l0ZW0sIGluZGV4KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlcGxhY2VzIHRoZSBpdGVtIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXggYW5kIGRpc3BhdGNoZXMgYSBDb2xsZWN0aW9uRXZlbnQuUkVQTEFDRSBldmVudC5cclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBBcnJheUNvbGxlY3Rpb25cclxuICAgKi9cclxuICByZXBsYWNlSXRlbUF0KG5ld0l0ZW06IGFueSwgaW5kZXg6IG51bWJlcik6IGFueSB7XHJcbiAgICB0aGlzLmZpbHRlckRhdGEuc3BsaWNlKGluZGV4LCAxLCBuZXdJdGVtKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNvcnRzIHRoZSBpdGVtcyB0aGF0IHRoZSBkYXRhIHByb3ZpZGVyIGNvbnRhaW5zIGFuZCBkaXNwYXRjaGVzIGEgQ29sbGVjdGlvbkV2ZW50LlNPUlQgZXZlbnQuXHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgQXJyYXlDb2xsZWN0aW9uXHJcbiAgICovXHJcbiAgZ2V0IHNvcnQoKTogQXJyYXk8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5fc29ydDtcclxuICB9XHJcblxyXG4gIHNldCBzb3J0KHZhbHVlOiBBcnJheTxhbnk+KSB7XHJcbiAgICB0aGlzLl9zb3J0ID0gdmFsdWU7XHJcbiAgICB0aGlzLnJlZnJlc2goKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNvcnRzIHRoZSBpdGVtcyB0aGF0IHRoZSBkYXRhIHByb3ZpZGVyIGNvbnRhaW5zIGJ5IHRoZSBzcGVjaWZpZWQgZmllbGQgYW5kIGRpc3BhdGNoZXMgYSBDb2xsZWN0aW9uRXZlbnQuU09SVCBldmVudC5cclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBBcnJheUNvbGxlY3Rpb25cclxuICAgKi9cclxuICBzb3J0T24oZmllbGROYW1lOiBhbnksIHJldmVyc2UgPSBmYWxzZSk6IEFycmF5PFQ+IHtcclxuICAgIHRoaXMuZmlsdGVyRGF0YSA9IHRoaXMuZmlsdGVyRGF0YS5zb3J0KEhlbHBlcnMuc29ydEJ5RmllbGQoZmllbGROYW1lLCByZXZlcnNlKSk7XHJcbiAgICB0aGlzLm9uRGF0YUNoYW5nZShuZXcgQ29sbGVjdGlvbkV2ZW50KENvbGxlY3Rpb25FdmVudC5TT1JUKSk7XHJcbiAgICByZXR1cm4gdGhpcy5maWx0ZXJEYXRhO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGZpbHRlcigpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ZpbHRlcjtcclxuICB9XHJcblxyXG4gIHNldCBmaWx0ZXIodmFsdWU6IGFueSkge1xyXG4gICAgdGhpcy5fZmlsdGVyID0gdmFsdWU7XHJcbiAgICB0aGlzLnJlZnJlc2goKTtcclxuICB9XHJcblxyXG4gIGZpbHRlck9uKGZpZWxkTmFtZTogYW55LCB2YWx1ZTogYW55ID0gbnVsbCk6IEFycmF5PFQ+IHtcclxuICAgIHRoaXMuZmlsdGVyRGF0YSA9IHRoaXMuZmlsdGVyRGF0YS5maWx0ZXIoSGVscGVycy5maWx0ZXJCeUZpZWxkKGZpZWxkTmFtZSwgdmFsdWUpKTtcclxuICAgIHJldHVybiB0aGlzLmZpbHRlckRhdGE7XHJcbiAgfVxyXG5cclxuICBvbkRhdGFDaGFuZ2UoZXZlbnQ6IENvbGxlY3Rpb25FdmVudCk6IHZvaWQge1xyXG4gICAgdGhpcy5kYXRhQ2hhbmdlLmVtaXQoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgcmVmcmVzaCgpOiB2b2lkIHtcclxuICAgIHRoaXMuZmlsdGVyRGF0YSA9IHRoaXMuaXNFZGl0aW5nID8gdGhpcy5lZGl0RGF0YS5zbGljZSgpIDogdGhpcy5zb3VyY2Uuc2xpY2UoKTtcclxuICAgIGZvciAoY29uc3QgaXRlbSBvZiB0aGlzLl9zb3J0LnJldmVyc2UoKSkge1xyXG4gICAgICB0aGlzLnNvcnRPbihpdGVtLmZpZWxkLCBpdGVtLnJldmVyc2UpO1xyXG4gICAgfVxyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5fZmlsdGVyKSB7XHJcbiAgICAgIGlmIChrZXkpIHtcclxuICAgICAgICB0aGlzLmZpbHRlck9uKGtleSwgdGhpcy5fZmlsdGVyW2tleV0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLm9uRGF0YUNoYW5nZShuZXcgQ29sbGVjdGlvbkV2ZW50KENvbGxlY3Rpb25FdmVudC5DSEFOR0UsIHRoaXMuZmlsdGVyRGF0YSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhbiBBcnJheSBhbnkgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRhdGEgdGhhdCB0aGUgZGF0YSBwcm92aWRlciBjb250YWlucy5cclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBBcnJheUNvbGxlY3Rpb25cclxuICAgKi9cclxuICB0b0FycmF5KCk6IEFycmF5PFQ+IHtcclxuICAgIHJldHVybiB0aGlzLmlzRWRpdGluZyA/IHRoaXMuZWRpdERhdGEgOiB0aGlzLnNvdXJjZTtcclxuICB9XHJcblxyXG4gIHRvSlNPTigpIHtcclxuICAgIHJldHVybiB0aGlzLmlzRWRpdGluZyA/IHRoaXMuZWRpdERhdGEgOiB0aGlzLnNvdXJjZTtcclxuICB9XHJcbn1cclxuIl19
import { ArrayCollection } from './array-collection';
import { CollectionEvent } from './collection-event';
export class PagedArrayCollection extends ArrayCollection {
    constructor(source = []) {
        super(source);
        this._page = 1;
        this._numberOfPages = 1;
        this._pageSize = 10;
    }
    get numberOfPages() {
        let result = this.source.length / this.pageSize;
        result = Math.ceil(result);
        return result;
    }
    get page() {
        return this._page;
    }
    set page(value) {
        this._page = value;
        this.refresh();
    }
    get pageSize() {
        return this._pageSize;
    }
    set pageSize(value) {
        this._pageSize = value;
        this.refresh();
    }
    next() {
        if (this.page === this.numberOfPages) {
            return this.page;
        }
        this.page++;
        return this.page;
    }
    prev() {
        if (this._page === 1) {
            return this.page;
        }
        this.page--;
        return this.page;
    }
    first() {
        if (this.page === 1) {
            return this.page;
        }
        this.page = 1;
        return this.page;
    }
    last() {
        if (this.page === this.numberOfPages) {
            return this.page;
        }
        this.page = this.numberOfPages;
        return this.page;
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
        if (this.page >= 0) {
            const start = (this.page - 1) * this.pageSize;
            const end = start + this.pageSize;
            const result = this.filterData.slice(start, end);
            this.onDataChange(new CollectionEvent(CollectionEvent.CHANGE, result));
        }
        else {
            this.onDataChange(new CollectionEvent(CollectionEvent.CHANGE, this.filterData));
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZWQtYXJyYXktY29sbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL3NlcnZpY2VzL2RhdGEtcHJvdmlkZXIvcGFnZWQtYXJyYXktY29sbGVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBR3JELE1BQU0sT0FBTyxvQkFBd0IsU0FBUSxlQUFrQjtJQUs3RCxZQUFZLFNBQW1CLEVBQUU7UUFDL0IsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBTGhCLFVBQUssR0FBVyxDQUFDLENBQUM7UUFDbEIsbUJBQWMsR0FBVyxDQUFDLENBQUM7UUFDM0IsY0FBUyxHQUFXLEVBQUUsQ0FBQztJQUl2QixDQUFDO0lBRUQsSUFBSSxhQUFhO1FBQ2YsSUFBSSxNQUFNLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN4RCxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQixPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxJQUFJLElBQUksQ0FBQyxLQUFhO1FBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLFFBQVEsQ0FBQyxLQUFhO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsSUFBSTtRQUNGLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3BDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztTQUNsQjtRQUNELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRUQsSUFBSTtRQUNGLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLEVBQUU7WUFDcEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ2xCO1FBQ0QsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25CLENBQUM7SUFFRCxLQUFLO1FBQ0gsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTtZQUNuQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDbEI7UUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNkLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRUQsSUFBSTtRQUNGLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3BDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztTQUNsQjtRQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUMvQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDbkIsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDL0UsS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDdkM7UUFDRCxLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDOUIsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ3ZDO1NBQ0Y7UUFDRCxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFO1lBQ2xCLE1BQU0sS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQzlDLE1BQU0sR0FBRyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ2xDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksZUFBZSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUN4RTthQUFNO1lBQ0wsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLGVBQWUsQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1NBQ2pGO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXJyYXlDb2xsZWN0aW9uIH0gZnJvbSAnLi9hcnJheS1jb2xsZWN0aW9uJztcbmltcG9ydCB7IENvbGxlY3Rpb25FdmVudCB9IGZyb20gJy4vY29sbGVjdGlvbi1ldmVudCc7XG5pbXBvcnQgeyBQYWdlZENvbGxlY3Rpb24gfSBmcm9tICcuL3BhZ2VkLWNvbGxlY3Rpb24nO1xuXG5leHBvcnQgY2xhc3MgUGFnZWRBcnJheUNvbGxlY3Rpb248VD4gZXh0ZW5kcyBBcnJheUNvbGxlY3Rpb248VD4gaW1wbGVtZW50cyBQYWdlZENvbGxlY3Rpb248VD4ge1xuICBfcGFnZTogbnVtYmVyID0gMTtcbiAgX251bWJlck9mUGFnZXM6IG51bWJlciA9IDE7XG4gIF9wYWdlU2l6ZTogbnVtYmVyID0gMTA7XG5cbiAgY29uc3RydWN0b3Ioc291cmNlOiBBcnJheTxUPiA9IFtdKSB7XG4gICAgc3VwZXIoc291cmNlKTtcbiAgfVxuXG4gIGdldCBudW1iZXJPZlBhZ2VzKCk6IG51bWJlciB7XG4gICAgbGV0IHJlc3VsdDogbnVtYmVyID0gdGhpcy5zb3VyY2UubGVuZ3RoIC8gdGhpcy5wYWdlU2l6ZTtcbiAgICByZXN1bHQgPSBNYXRoLmNlaWwocmVzdWx0KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZ2V0IHBhZ2UoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fcGFnZTtcbiAgfVxuXG4gIHNldCBwYWdlKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9wYWdlID0gdmFsdWU7XG4gICAgdGhpcy5yZWZyZXNoKCk7XG4gIH1cblxuICBnZXQgcGFnZVNpemUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fcGFnZVNpemU7XG4gIH1cblxuICBzZXQgcGFnZVNpemUodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX3BhZ2VTaXplID0gdmFsdWU7XG4gICAgdGhpcy5yZWZyZXNoKCk7XG4gIH1cblxuICBuZXh0KCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMucGFnZSA9PT0gdGhpcy5udW1iZXJPZlBhZ2VzKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYWdlO1xuICAgIH1cbiAgICB0aGlzLnBhZ2UrKztcbiAgICByZXR1cm4gdGhpcy5wYWdlO1xuICB9XG5cbiAgcHJldigpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLl9wYWdlID09PSAxKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYWdlO1xuICAgIH1cbiAgICB0aGlzLnBhZ2UtLTtcbiAgICByZXR1cm4gdGhpcy5wYWdlO1xuICB9XG5cbiAgZmlyc3QoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5wYWdlID09PSAxKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYWdlO1xuICAgIH1cbiAgICB0aGlzLnBhZ2UgPSAxO1xuICAgIHJldHVybiB0aGlzLnBhZ2U7XG4gIH1cblxuICBsYXN0KCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMucGFnZSA9PT0gdGhpcy5udW1iZXJPZlBhZ2VzKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYWdlO1xuICAgIH1cbiAgICB0aGlzLnBhZ2UgPSB0aGlzLm51bWJlck9mUGFnZXM7XG4gICAgcmV0dXJuIHRoaXMucGFnZTtcbiAgfVxuXG4gIHJlZnJlc2goKTogdm9pZCB7XG4gICAgdGhpcy5maWx0ZXJEYXRhID0gdGhpcy5pc0VkaXRpbmcgPyB0aGlzLmVkaXREYXRhLnNsaWNlKCkgOiB0aGlzLnNvdXJjZS5zbGljZSgpO1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiB0aGlzLl9zb3J0LnJldmVyc2UoKSkge1xuICAgICAgdGhpcy5zb3J0T24oaXRlbS5maWVsZCwgaXRlbS5yZXZlcnNlKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5fZmlsdGVyKSB7XG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIHRoaXMuZmlsdGVyT24oa2V5LCB0aGlzLl9maWx0ZXJba2V5XSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnBhZ2UgPj0gMCkge1xuICAgICAgY29uc3Qgc3RhcnQgPSAodGhpcy5wYWdlIC0gMSkgKiB0aGlzLnBhZ2VTaXplO1xuICAgICAgY29uc3QgZW5kID0gc3RhcnQgKyB0aGlzLnBhZ2VTaXplO1xuICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5maWx0ZXJEYXRhLnNsaWNlKHN0YXJ0LCBlbmQpO1xuICAgICAgdGhpcy5vbkRhdGFDaGFuZ2UobmV3IENvbGxlY3Rpb25FdmVudChDb2xsZWN0aW9uRXZlbnQuQ0hBTkdFLCByZXN1bHQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vbkRhdGFDaGFuZ2UobmV3IENvbGxlY3Rpb25FdmVudChDb2xsZWN0aW9uRXZlbnQuQ0hBTkdFLCB0aGlzLmZpbHRlckRhdGEpKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
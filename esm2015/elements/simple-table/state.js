import { EventEmitter, Injectable } from '@angular/core';
export class NovoActivityTableState {
    constructor() {
        this.id = Math.random();
        this.sort = undefined;
        this.filter = undefined;
        this.page = 0;
        this.pageSize = undefined;
        this.globalSearch = undefined;
        this.selectedRows = new Map();
        this.updates = new EventEmitter();
        this.onReset = new EventEmitter();
    }
    get userFiltered() {
        return !!(this.filter || this.sort || this.globalSearch || this.outsideFilter);
    }
    reset(fireUpdate = true, persistUserFilters) {
        if (!persistUserFilters) {
            this.sort = undefined;
            this.globalSearch = undefined;
            this.filter = undefined;
        }
        this.page = 0;
        this.selectedRows.clear();
        this.onReset.emit(true);
        if (fireUpdate) {
            this.updates.emit({
                sort: this.sort,
                filter: this.filter,
                globalSearch: this.globalSearch,
            });
        }
    }
}
NovoActivityTableState.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL3NpbXBsZS10YWJsZS9zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUt6RCxNQUFNLE9BQU8sc0JBQXNCO0lBRG5DO1FBRUUsT0FBRSxHQUFXLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMzQixTQUFJLEdBQWtDLFNBQVMsQ0FBQztRQUNoRCxXQUFNLEdBQWtDLFNBQVMsQ0FBQztRQUNsRCxTQUFJLEdBQVcsQ0FBQyxDQUFDO1FBQ2pCLGFBQVEsR0FBVyxTQUFTLENBQUM7UUFDN0IsaUJBQVksR0FBVyxTQUFTLENBQUM7UUFDakMsaUJBQVksR0FBd0IsSUFBSSxHQUFHLEVBQWtCLENBQUM7UUFHOUQsWUFBTyxHQUF3QyxJQUFJLFlBQVksRUFBeUIsQ0FBQztRQUN6RixZQUFPLEdBQTBCLElBQUksWUFBWSxFQUFXLENBQUM7SUF1Qi9ELENBQUM7SUFyQkMsSUFBSSxZQUFZO1FBQ2QsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDakYsQ0FBQztJQUVNLEtBQUssQ0FBQyxhQUFzQixJQUFJLEVBQUUsa0JBQTRCO1FBQ25FLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztZQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQztZQUM5QixJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztTQUN6QjtRQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixJQUFJLFVBQVUsRUFBRTtZQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO2dCQUNoQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQ2YsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2dCQUNuQixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7YUFDaEMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOzs7WUFsQ0YsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTm92b1NpbXBsZVRhYmxlQ2hhbmdlIH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE5vdm9BY3Rpdml0eVRhYmxlU3RhdGUge1xyXG4gIGlkOiBudW1iZXIgPSBNYXRoLnJhbmRvbSgpO1xyXG4gIHNvcnQ6IHsgaWQ6IHN0cmluZzsgdmFsdWU6IHN0cmluZyB9ID0gdW5kZWZpbmVkO1xyXG4gIGZpbHRlcjogeyBpZDogc3RyaW5nOyB2YWx1ZTogc3RyaW5nIH0gPSB1bmRlZmluZWQ7XHJcbiAgcGFnZTogbnVtYmVyID0gMDtcclxuICBwYWdlU2l6ZTogbnVtYmVyID0gdW5kZWZpbmVkO1xyXG4gIGdsb2JhbFNlYXJjaDogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIHNlbGVjdGVkUm93czogTWFwPHN0cmluZywgb2JqZWN0PiA9IG5ldyBNYXA8c3RyaW5nLCBvYmplY3Q+KCk7XHJcbiAgb3V0c2lkZUZpbHRlcjogYW55O1xyXG5cclxuICB1cGRhdGVzOiBFdmVudEVtaXR0ZXI8Tm92b1NpbXBsZVRhYmxlQ2hhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8Tm92b1NpbXBsZVRhYmxlQ2hhbmdlPigpO1xyXG4gIG9uUmVzZXQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuXHJcbiAgZ2V0IHVzZXJGaWx0ZXJlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiAhISh0aGlzLmZpbHRlciB8fCB0aGlzLnNvcnQgfHwgdGhpcy5nbG9iYWxTZWFyY2ggfHwgdGhpcy5vdXRzaWRlRmlsdGVyKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZXNldChmaXJlVXBkYXRlOiBib29sZWFuID0gdHJ1ZSwgcGVyc2lzdFVzZXJGaWx0ZXJzPzogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgaWYgKCFwZXJzaXN0VXNlckZpbHRlcnMpIHtcclxuICAgICAgdGhpcy5zb3J0ID0gdW5kZWZpbmVkO1xyXG4gICAgICB0aGlzLmdsb2JhbFNlYXJjaCA9IHVuZGVmaW5lZDtcclxuICAgICAgdGhpcy5maWx0ZXIgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICB0aGlzLnBhZ2UgPSAwO1xyXG4gICAgdGhpcy5zZWxlY3RlZFJvd3MuY2xlYXIoKTtcclxuICAgIHRoaXMub25SZXNldC5lbWl0KHRydWUpO1xyXG4gICAgaWYgKGZpcmVVcGRhdGUpIHtcclxuICAgICAgdGhpcy51cGRhdGVzLmVtaXQoe1xyXG4gICAgICAgIHNvcnQ6IHRoaXMuc29ydCxcclxuICAgICAgICBmaWx0ZXI6IHRoaXMuZmlsdGVyLFxyXG4gICAgICAgIGdsb2JhbFNlYXJjaDogdGhpcy5nbG9iYWxTZWFyY2gsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=
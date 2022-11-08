import { EventEmitter, Injectable } from '@angular/core';
import { Helpers } from 'novo-elements/utils';
import { Subject } from 'rxjs';
import { NovoDataTableFilterUtils } from '../services/data-table-filter-utils';
import * as i0 from "@angular/core";
export class DataTableState {
    constructor() {
        this.selectionSource = new Subject();
        this.paginationSource = new Subject();
        this.sortFilterSource = new Subject();
        this.resetSource = new Subject();
        this.expandSource = new Subject();
        this.allMatchingSelectedSource = new Subject();
        this.dataLoaded = new Subject();
        this.dataLoadingSource = new Subject();
        this.sort = undefined;
        this.filter = undefined;
        this.where = undefined;
        this.page = 0;
        this.pageSize = undefined;
        this.globalSearch = undefined;
        this.selectedRows = new Map();
        this.expandedRows = new Set();
        this.isForceRefresh = false;
        this.updates = new EventEmitter();
        this.retainSelected = false;
        this.savedSearchName = undefined;
        this.displayedColumns = undefined;
    }
    get userFiltered() {
        return !!(this.filter || this.sort || this.globalSearch || this.outsideFilter || this.where);
    }
    get userFilteredInternal() {
        return !!(this.filter || this.sort || this.globalSearch || this.where);
    }
    get selected() {
        return Array.from(this.selectedRows.values());
    }
    reset(fireUpdate = true, persistUserFilters) {
        this.setState({}, fireUpdate, persistUserFilters);
    }
    clearSort(fireUpdate = true) {
        this.sort = undefined;
        this.page = 0;
        this.checkRetainment('sort');
        this.reset(fireUpdate, true);
        this.onSortFilterChange();
        if (fireUpdate) {
            this.updates.emit({
                sort: this.sort,
                filter: this.filter,
                globalSearch: this.globalSearch,
                where: this.where,
            });
        }
    }
    clearFilter(fireUpdate = true) {
        this.filter = undefined;
        this.globalSearch = undefined;
        this.page = 0;
        this.checkRetainment('filter');
        this.reset(fireUpdate, true);
        this.onSortFilterChange();
        if (fireUpdate) {
            this.updates.emit({
                sort: this.sort,
                filter: this.filter,
                globalSearch: this.globalSearch,
                where: this.where,
            });
        }
    }
    clearQuery(fireUpdate = true) {
        this.where = undefined;
        this.page = 0;
        this.checkRetainment('where');
        this.reset(fireUpdate, true);
        this.onSortFilterChange();
        if (fireUpdate) {
            this.updates.emit({
                sort: this.sort,
                filter: this.filter,
                globalSearch: this.globalSearch,
                where: this.where,
            });
        }
    }
    clearSelected(fireUpdate = true) {
        this.allMatchingSelectedSource.next(false);
        this.globalSearch = undefined;
        this.page = 0;
        this.reset(fireUpdate, true);
        this.onSelectionChange();
        if (fireUpdate) {
            this.updates.emit({
                sort: this.sort,
                filter: this.filter,
                globalSearch: this.globalSearch,
                where: this.where,
            });
        }
    }
    onSelectionChange() {
        this.selectionSource.next();
    }
    onExpandChange(targetId) {
        this.expandSource.next(targetId);
    }
    onPaginationChange(isPageSizeChange, pageSize) {
        this.checkRetainment('page');
        this.paginationSource.next({ isPageSizeChange, pageSize });
    }
    onSortFilterChange() {
        this.checkRetainment('sort');
        this.checkRetainment('filter');
        this.checkRetainment('where');
        this.sortFilterSource.next({
            sort: this.sort,
            filter: this.filter,
            globalSearch: this.globalSearch,
            where: this.where,
            savedSearchName: this.savedSearchName,
        });
    }
    setInitialSortFilter(preferences) {
        if (preferences) {
            if (preferences.where) {
                this.where = preferences.where;
            }
            if (preferences.sort) {
                this.sort = preferences.sort;
            }
            if (preferences.filter) {
                this.filter = this.transformFilters(preferences.filter);
            }
            if (preferences.globalSearch) {
                this.globalSearch = preferences.globalSearch;
            }
            if (preferences.savedSearchName) {
                this.savedSearchName = preferences.savedSearchName;
            }
        }
    }
    setState(preferences, fireUpdate = true, persistUserFilters = false) {
        if (!persistUserFilters) {
            this.where = preferences.where;
            this.sort = preferences.sort;
            this.filter = preferences.filter ? this.transformFilters(preferences.filter) : undefined;
            this.globalSearch = preferences.globalSearch;
            this.savedSearchName = preferences.savedSearchName;
            if (preferences.displayedColumns?.length) {
                this.displayedColumns = preferences.displayedColumns;
            }
        }
        this.page = 0;
        if (!this.retainSelected) {
            this.selectedRows.clear();
            this.resetSource.next();
        }
        this.onSortFilterChange();
        this.retainSelected = false;
        if (fireUpdate) {
            this.updates.emit({
                sort: this.sort,
                filter: this.filter,
                globalSearch: this.globalSearch,
                where: this.where,
                savedSearchName: this.savedSearchName,
                displayedColumns: this.displayedColumns,
            });
        }
    }
    checkRetainment(caller, allMatchingSelected = false) {
        this.retainSelected = this.selectionOptions?.some((option) => option.label === caller) || this.retainSelected || allMatchingSelected;
    }
    transformFilters(filters) {
        const filterArray = Helpers.convertToArray(filters);
        filterArray.forEach((filter) => {
            filter.value =
                filter.selectedOption && filter.type ? NovoDataTableFilterUtils.constructFilter(filter.selectedOption, filter.type) : filter.value;
        });
        return filterArray;
    }
}
DataTableState.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DataTableState, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
DataTableState.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DataTableState });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DataTableState, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1zdGF0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy9kYXRhLXRhYmxlL3N0YXRlL2RhdGEtdGFibGUtc3RhdGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDOUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvQixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQzs7QUFHL0UsTUFBTSxPQUFPLGNBQWM7SUFEM0I7UUFFUyxvQkFBZSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFDdEMscUJBQWdCLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNqQyxxQkFBZ0IsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ2pDLGdCQUFXLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUNsQyxpQkFBWSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDN0IsOEJBQXlCLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUMxQyxlQUFVLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUNqQyxzQkFBaUIsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBRXpDLFNBQUksR0FBbUIsU0FBUyxDQUFDO1FBQ2pDLFdBQU0sR0FBMEMsU0FBUyxDQUFDO1FBQzFELFVBQUssR0FBaUMsU0FBUyxDQUFDO1FBQ2hELFNBQUksR0FBVyxDQUFDLENBQUM7UUFDakIsYUFBUSxHQUFXLFNBQVMsQ0FBQztRQUM3QixpQkFBWSxHQUFXLFNBQVMsQ0FBQztRQUNqQyxpQkFBWSxHQUFtQixJQUFJLEdBQUcsRUFBYSxDQUFDO1FB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Q25CLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWTtnQkFDL0IsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUNqQixlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWU7Z0JBQ3JDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0I7YUFDeEMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRU0sZUFBZSxDQUFDLE1BQWMsRUFBRSxtQkFBbUIsR0FBRyxLQUFLO1FBQ2hFLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLG1CQUFtQixDQUFDO0lBQ3ZJLENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxPQUFPO1FBQzlCLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEQsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQzdCLE1BQU0sQ0FBQyxLQUFLO2dCQUNWLE1BQU0sQ0FBQyxjQUFjLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsd0JBQXdCLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ3ZJLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQzs7NEdBek1VLGNBQWM7Z0hBQWQsY0FBYzs0RkFBZCxjQUFjO2tCQUQxQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJRGF0YVRhYmxlQ2hhbmdlRXZlbnQsIElEYXRhVGFibGVGaWx0ZXIsIElEYXRhVGFibGVQcmVmZXJlbmNlcywgSURhdGFUYWJsZVNlbGVjdGlvbk9wdGlvbiwgSURhdGFUYWJsZVNvcnQgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IE5vdm9EYXRhVGFibGVGaWx0ZXJVdGlscyB9IGZyb20gJy4uL3NlcnZpY2VzL2RhdGEtdGFibGUtZmlsdGVyLXV0aWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGFUYWJsZVN0YXRlPFQ+IHtcbiAgcHVibGljIHNlbGVjdGlvblNvdXJjZSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHB1YmxpYyBwYWdpbmF0aW9uU291cmNlID0gbmV3IFN1YmplY3QoKTtcbiAgcHVibGljIHNvcnRGaWx0ZXJTb3VyY2UgPSBuZXcgU3ViamVjdCgpO1xuICBwdWJsaWMgcmVzZXRTb3VyY2UgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwdWJsaWMgZXhwYW5kU291cmNlID0gbmV3IFN1YmplY3QoKTtcbiAgcHVibGljIGFsbE1hdGNoaW5nU2VsZWN0ZWRTb3VyY2UgPSBuZXcgU3ViamVjdCgpO1xuICBwdWJsaWMgZGF0YUxvYWRlZCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHB1YmxpYyBkYXRhTG9hZGluZ1NvdXJjZSA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgc29ydDogSURhdGFUYWJsZVNvcnQgPSB1bmRlZmluZWQ7XG4gIGZpbHRlcjogSURhdGFUYWJsZUZpbHRlciB8IElEYXRhVGFibGVGaWx0ZXJbXSA9IHVuZGVmaW5lZDtcbiAgd2hlcmU6IHsgcXVlcnk6IHN0cmluZzsgZm9ybTogYW55IH0gPSB1bmRlZmluZWQ7XG4gIHBhZ2U6IG51bWJlciA9IDA7XG4gIHBhZ2VTaXplOiBudW1iZXIgPSB1bmRlZmluZWQ7XG4gIGdsb2JhbFNlYXJjaDogc3RyaW5nID0gdW5kZWZpbmVkO1xuICBzZWxlY3RlZFJvd3M6IE1hcDxzdHJpbmcsIFQ+ID0gbmV3IE1hcDxzdHJpbmcsIFQ+KCk7XG4gIGV4cGFuZGVkUm93czogU2V0PHN0cmluZz4gPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgb3V0c2lkZUZpbHRlcjogYW55O1xuICBpc0ZvcmNlUmVmcmVzaDogYm9vbGVhbiA9IGZhbHNlO1xuICBzZWxlY3Rpb25PcHRpb25zOiBJRGF0YVRhYmxlU2VsZWN0aW9uT3B0aW9uW107XG4gIHVwZGF0ZXM6IEV2ZW50RW1pdHRlcjxJRGF0YVRhYmxlQ2hhbmdlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJRGF0YVRhYmxlQ2hhbmdlRXZlbnQ+KCk7XG4gIHJldGFpblNlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHNhdmVkU2VhcmNoTmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuICBkaXNwbGF5ZWRDb2x1bW5zOiBzdHJpbmdbXSA9IHVuZGVmaW5lZDtcblxuICBnZXQgdXNlckZpbHRlcmVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhISh0aGlzLmZpbHRlciB8fCB0aGlzLnNvcnQgfHwgdGhpcy5nbG9iYWxTZWFyY2ggfHwgdGhpcy5vdXRzaWRlRmlsdGVyIHx8IHRoaXMud2hlcmUpO1xuICB9XG5cbiAgZ2V0IHVzZXJGaWx0ZXJlZEludGVybmFsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhISh0aGlzLmZpbHRlciB8fCB0aGlzLnNvcnQgfHwgdGhpcy5nbG9iYWxTZWFyY2ggfHwgdGhpcy53aGVyZSk7XG4gIH1cblxuICBnZXQgc2VsZWN0ZWQoKTogVFtdIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLnNlbGVjdGVkUm93cy52YWx1ZXMoKSk7XG4gIH1cblxuICBwdWJsaWMgcmVzZXQoZmlyZVVwZGF0ZTogYm9vbGVhbiA9IHRydWUsIHBlcnNpc3RVc2VyRmlsdGVycz8pOiB2b2lkIHtcbiAgICB0aGlzLnNldFN0YXRlKHt9IGFzIElEYXRhVGFibGVQcmVmZXJlbmNlcywgZmlyZVVwZGF0ZSwgcGVyc2lzdFVzZXJGaWx0ZXJzKTtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhclNvcnQoZmlyZVVwZGF0ZTogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICB0aGlzLnNvcnQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5wYWdlID0gMDtcbiAgICB0aGlzLmNoZWNrUmV0YWlubWVudCgnc29ydCcpO1xuICAgIHRoaXMucmVzZXQoZmlyZVVwZGF0ZSwgdHJ1ZSk7XG4gICAgdGhpcy5vblNvcnRGaWx0ZXJDaGFuZ2UoKTtcbiAgICBpZiAoZmlyZVVwZGF0ZSkge1xuICAgICAgdGhpcy51cGRhdGVzLmVtaXQoe1xuICAgICAgICBzb3J0OiB0aGlzLnNvcnQsXG4gICAgICAgIGZpbHRlcjogdGhpcy5maWx0ZXIsXG4gICAgICAgIGdsb2JhbFNlYXJjaDogdGhpcy5nbG9iYWxTZWFyY2gsXG4gICAgICAgIHdoZXJlOiB0aGlzLndoZXJlLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNsZWFyRmlsdGVyKGZpcmVVcGRhdGU6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgdGhpcy5maWx0ZXIgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5nbG9iYWxTZWFyY2ggPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5wYWdlID0gMDtcbiAgICB0aGlzLmNoZWNrUmV0YWlubWVudCgnZmlsdGVyJyk7XG4gICAgdGhpcy5yZXNldChmaXJlVXBkYXRlLCB0cnVlKTtcbiAgICB0aGlzLm9uU29ydEZpbHRlckNoYW5nZSgpO1xuICAgIGlmIChmaXJlVXBkYXRlKSB7XG4gICAgICB0aGlzLnVwZGF0ZXMuZW1pdCh7XG4gICAgICAgIHNvcnQ6IHRoaXMuc29ydCxcbiAgICAgICAgZmlsdGVyOiB0aGlzLmZpbHRlcixcbiAgICAgICAgZ2xvYmFsU2VhcmNoOiB0aGlzLmdsb2JhbFNlYXJjaCxcbiAgICAgICAgd2hlcmU6IHRoaXMud2hlcmUsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2xlYXJRdWVyeShmaXJlVXBkYXRlOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgIHRoaXMud2hlcmUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5wYWdlID0gMDtcbiAgICB0aGlzLmNoZWNrUmV0YWlubWVudCgnd2hlcmUnKTtcbiAgICB0aGlzLnJlc2V0KGZpcmVVcGRhdGUsIHRydWUpO1xuICAgIHRoaXMub25Tb3J0RmlsdGVyQ2hhbmdlKCk7XG4gICAgaWYgKGZpcmVVcGRhdGUpIHtcbiAgICAgIHRoaXMudXBkYXRlcy5lbWl0KHtcbiAgICAgICAgc29ydDogdGhpcy5zb3J0LFxuICAgICAgICBmaWx0ZXI6IHRoaXMuZmlsdGVyLFxuICAgICAgICBnbG9iYWxTZWFyY2g6IHRoaXMuZ2xvYmFsU2VhcmNoLFxuICAgICAgICB3aGVyZTogdGhpcy53aGVyZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjbGVhclNlbGVjdGVkKGZpcmVVcGRhdGU6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgdGhpcy5hbGxNYXRjaGluZ1NlbGVjdGVkU291cmNlLm5leHQoZmFsc2UpO1xuICAgIHRoaXMuZ2xvYmFsU2VhcmNoID0gdW5kZWZpbmVkO1xuICAgIHRoaXMucGFnZSA9IDA7XG4gICAgdGhpcy5yZXNldChmaXJlVXBkYXRlLCB0cnVlKTtcbiAgICB0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlKCk7XG4gICAgaWYgKGZpcmVVcGRhdGUpIHtcbiAgICAgIHRoaXMudXBkYXRlcy5lbWl0KHtcbiAgICAgICAgc29ydDogdGhpcy5zb3J0LFxuICAgICAgICBmaWx0ZXI6IHRoaXMuZmlsdGVyLFxuICAgICAgICBnbG9iYWxTZWFyY2g6IHRoaXMuZ2xvYmFsU2VhcmNoLFxuICAgICAgICB3aGVyZTogdGhpcy53aGVyZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBvblNlbGVjdGlvbkNoYW5nZSgpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGlvblNvdXJjZS5uZXh0KCk7XG4gIH1cblxuICBwdWJsaWMgb25FeHBhbmRDaGFuZ2UodGFyZ2V0SWQ/OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmV4cGFuZFNvdXJjZS5uZXh0KHRhcmdldElkKTtcbiAgfVxuXG4gIHB1YmxpYyBvblBhZ2luYXRpb25DaGFuZ2UoaXNQYWdlU2l6ZUNoYW5nZTogYm9vbGVhbiwgcGFnZVNpemU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tSZXRhaW5tZW50KCdwYWdlJyk7XG4gICAgdGhpcy5wYWdpbmF0aW9uU291cmNlLm5leHQoeyBpc1BhZ2VTaXplQ2hhbmdlLCBwYWdlU2l6ZSB9KTtcbiAgfVxuXG4gIHB1YmxpYyBvblNvcnRGaWx0ZXJDaGFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5jaGVja1JldGFpbm1lbnQoJ3NvcnQnKTtcbiAgICB0aGlzLmNoZWNrUmV0YWlubWVudCgnZmlsdGVyJyk7XG4gICAgdGhpcy5jaGVja1JldGFpbm1lbnQoJ3doZXJlJyk7XG4gICAgdGhpcy5zb3J0RmlsdGVyU291cmNlLm5leHQoe1xuICAgICAgc29ydDogdGhpcy5zb3J0LFxuICAgICAgZmlsdGVyOiB0aGlzLmZpbHRlcixcbiAgICAgIGdsb2JhbFNlYXJjaDogdGhpcy5nbG9iYWxTZWFyY2gsXG4gICAgICB3aGVyZTogdGhpcy53aGVyZSxcbiAgICAgIHNhdmVkU2VhcmNoTmFtZTogdGhpcy5zYXZlZFNlYXJjaE5hbWUsXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc2V0SW5pdGlhbFNvcnRGaWx0ZXIocHJlZmVyZW5jZXMpOiB2b2lkIHtcbiAgICBpZiAocHJlZmVyZW5jZXMpIHtcbiAgICAgIGlmIChwcmVmZXJlbmNlcy53aGVyZSkge1xuICAgICAgICB0aGlzLndoZXJlID0gcHJlZmVyZW5jZXMud2hlcmU7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcmVmZXJlbmNlcy5zb3J0KSB7XG4gICAgICAgIHRoaXMuc29ydCA9IHByZWZlcmVuY2VzLnNvcnQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcmVmZXJlbmNlcy5maWx0ZXIpIHtcbiAgICAgICAgdGhpcy5maWx0ZXIgPSB0aGlzLnRyYW5zZm9ybUZpbHRlcnMocHJlZmVyZW5jZXMuZmlsdGVyKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHByZWZlcmVuY2VzLmdsb2JhbFNlYXJjaCkge1xuICAgICAgICB0aGlzLmdsb2JhbFNlYXJjaCA9IHByZWZlcmVuY2VzLmdsb2JhbFNlYXJjaDtcbiAgICAgIH1cblxuICAgICAgaWYgKHByZWZlcmVuY2VzLnNhdmVkU2VhcmNoTmFtZSkge1xuICAgICAgICB0aGlzLnNhdmVkU2VhcmNoTmFtZSA9IHByZWZlcmVuY2VzLnNhdmVkU2VhcmNoTmFtZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0U3RhdGUocHJlZmVyZW5jZXM6IElEYXRhVGFibGVQcmVmZXJlbmNlcywgZmlyZVVwZGF0ZSA9IHRydWUsIHBlcnNpc3RVc2VyRmlsdGVycyA9IGZhbHNlKTogdm9pZCB7XG4gICAgaWYgKCFwZXJzaXN0VXNlckZpbHRlcnMpIHtcbiAgICAgIHRoaXMud2hlcmUgPSBwcmVmZXJlbmNlcy53aGVyZTtcbiAgICAgIHRoaXMuc29ydCA9IHByZWZlcmVuY2VzLnNvcnQ7XG4gICAgICB0aGlzLmZpbHRlciA9IHByZWZlcmVuY2VzLmZpbHRlciA/IHRoaXMudHJhbnNmb3JtRmlsdGVycyhwcmVmZXJlbmNlcy5maWx0ZXIpIDogdW5kZWZpbmVkO1xuICAgICAgdGhpcy5nbG9iYWxTZWFyY2ggPSBwcmVmZXJlbmNlcy5nbG9iYWxTZWFyY2g7XG4gICAgICB0aGlzLnNhdmVkU2VhcmNoTmFtZSA9IHByZWZlcmVuY2VzLnNhdmVkU2VhcmNoTmFtZTtcbiAgICAgIGlmIChwcmVmZXJlbmNlcy5kaXNwbGF5ZWRDb2x1bW5zPy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRDb2x1bW5zID0gcHJlZmVyZW5jZXMuZGlzcGxheWVkQ29sdW1ucztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnBhZ2UgPSAwO1xuICAgIGlmICghdGhpcy5yZXRhaW5TZWxlY3RlZCkge1xuICAgICAgdGhpcy5zZWxlY3RlZFJvd3MuY2xlYXIoKTtcbiAgICAgIHRoaXMucmVzZXRTb3VyY2UubmV4dCgpO1xuICAgIH1cblxuICAgIHRoaXMub25Tb3J0RmlsdGVyQ2hhbmdlKCk7XG4gICAgdGhpcy5yZXRhaW5TZWxlY3RlZCA9IGZhbHNlO1xuXG4gICAgaWYgKGZpcmVVcGRhdGUpIHtcbiAgICAgIHRoaXMudXBkYXRlcy5lbWl0KHtcbiAgICAgICAgc29ydDogdGhpcy5zb3J0LFxuICAgICAgICBmaWx0ZXI6IHRoaXMuZmlsdGVyLFxuICAgICAgICBnbG9iYWxTZWFyY2g6IHRoaXMuZ2xvYmFsU2VhcmNoLFxuICAgICAgICB3aGVyZTogdGhpcy53aGVyZSxcbiAgICAgICAgc2F2ZWRTZWFyY2hOYW1lOiB0aGlzLnNhdmVkU2VhcmNoTmFtZSxcbiAgICAgICAgZGlzcGxheWVkQ29sdW1uczogdGhpcy5kaXNwbGF5ZWRDb2x1bW5zLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNoZWNrUmV0YWlubWVudChjYWxsZXI6IHN0cmluZywgYWxsTWF0Y2hpbmdTZWxlY3RlZCA9IGZhbHNlKTogdm9pZCB7XG4gICAgdGhpcy5yZXRhaW5TZWxlY3RlZCA9IHRoaXMuc2VsZWN0aW9uT3B0aW9ucz8uc29tZSgob3B0aW9uKSA9PiBvcHRpb24ubGFiZWwgPT09IGNhbGxlcikgfHwgdGhpcy5yZXRhaW5TZWxlY3RlZCB8fCBhbGxNYXRjaGluZ1NlbGVjdGVkO1xuICB9XG5cbiAgcHJpdmF0ZSB0cmFuc2Zvcm1GaWx0ZXJzKGZpbHRlcnMpIHtcbiAgICBjb25zdCBmaWx0ZXJBcnJheSA9IEhlbHBlcnMuY29udmVydFRvQXJyYXkoZmlsdGVycyk7XG4gICAgZmlsdGVyQXJyYXkuZm9yRWFjaCgoZmlsdGVyKSA9PiB7XG4gICAgICBmaWx0ZXIudmFsdWUgPVxuICAgICAgICBmaWx0ZXIuc2VsZWN0ZWRPcHRpb24gJiYgZmlsdGVyLnR5cGUgPyBOb3ZvRGF0YVRhYmxlRmlsdGVyVXRpbHMuY29uc3RydWN0RmlsdGVyKGZpbHRlci5zZWxlY3RlZE9wdGlvbiwgZmlsdGVyLnR5cGUpIDogZmlsdGVyLnZhbHVlO1xuICAgIH0pO1xuICAgIHJldHVybiBmaWx0ZXJBcnJheTtcbiAgfVxufVxuIl19
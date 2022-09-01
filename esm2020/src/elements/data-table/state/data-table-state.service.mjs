import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Helpers } from '../../../utils/Helpers';
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
                filter.selectedOption && filter.type
                    ? NovoDataTableFilterUtils.constructFilter(filter.selectedOption, filter.type)
                    : filter.value;
        });
        return filterArray;
    }
}
DataTableState.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DataTableState, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
DataTableState.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DataTableState });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DataTableState, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1zdGF0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvZGF0YS10YWJsZS9zdGF0ZS9kYXRhLXRhYmxlLXN0YXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFakQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0scUNBQXFDLENBQUM7O0FBRy9FLE1BQU0sT0FBTyxjQUFjO0lBRDNCO1FBRVMsb0JBQWUsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ2hDLHFCQUFnQixHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDakMscUJBQWdCLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNqQyxnQkFBVyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDNUIsaUJBQVksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQzdCLDhCQUF5QixHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDMUMsZUFBVSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFFbEMsU0FBSSxHQUFtQixTQUFTLENBQUM7UUFDakMsV0FBTSxHQUEwQyxTQUFTLENBQUM7UUFDMUQsVUFBSyxHQUFpQyxTQUFTLENBQUM7UUFDaEQsU0FBSSxHQUFXLENBQUMsQ0FBQztRQUNqQixhQUFRLEdBQVcsU0FBUyxDQUFDO1FBQzdCLGlCQUFZLEdBQVcsU0FBUyxDQUFDO1FBQ2pDLGlCQUFZLEdBQW1CLElBQUksR0FBRyxFQUFhLENBQUM7UUFDcEQsaUJBQVksR0FBZ0IsSUFBSSxHQUFHLEVB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O2dCQUMvQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ2pCLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtnQkFDckMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjthQUN4QyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFTSxlQUFlLENBQUMsTUFBYyxFQUFFLG1CQUFtQixHQUFHLEtBQUs7UUFDaEUsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFLLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxjQUFjLElBQUksbUJBQW1CLENBQUM7SUFDdkksQ0FBQztJQUVPLGdCQUFnQixDQUFDLE9BQU87UUFDOUIsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwRCxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDN0IsTUFBTSxDQUFDLEtBQUs7Z0JBQ1YsTUFBTSxDQUFDLGNBQWMsSUFBSSxNQUFNLENBQUMsSUFBSTtvQkFDbEMsQ0FBQyxDQUFDLHdCQUF3QixDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQzlFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQzs7NEdBMU1VLGNBQWM7Z0hBQWQsY0FBYzs0RkFBZCxjQUFjO2tCQUQxQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvSGVscGVycyc7XG5pbXBvcnQgeyBJRGF0YVRhYmxlQ2hhbmdlRXZlbnQsIElEYXRhVGFibGVGaWx0ZXIsIElEYXRhVGFibGVQcmVmZXJlbmNlcywgSURhdGFUYWJsZVNlbGVjdGlvbk9wdGlvbiwgSURhdGFUYWJsZVNvcnQgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IE5vdm9EYXRhVGFibGVGaWx0ZXJVdGlscyB9IGZyb20gJy4uL3NlcnZpY2VzL2RhdGEtdGFibGUtZmlsdGVyLXV0aWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGFUYWJsZVN0YXRlPFQ+IHtcbiAgcHVibGljIHNlbGVjdGlvblNvdXJjZSA9IG5ldyBTdWJqZWN0KCk7XG4gIHB1YmxpYyBwYWdpbmF0aW9uU291cmNlID0gbmV3IFN1YmplY3QoKTtcbiAgcHVibGljIHNvcnRGaWx0ZXJTb3VyY2UgPSBuZXcgU3ViamVjdCgpO1xuICBwdWJsaWMgcmVzZXRTb3VyY2UgPSBuZXcgU3ViamVjdCgpO1xuICBwdWJsaWMgZXhwYW5kU291cmNlID0gbmV3IFN1YmplY3QoKTtcbiAgcHVibGljIGFsbE1hdGNoaW5nU2VsZWN0ZWRTb3VyY2UgPSBuZXcgU3ViamVjdCgpO1xuICBwdWJsaWMgZGF0YUxvYWRlZCA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgc29ydDogSURhdGFUYWJsZVNvcnQgPSB1bmRlZmluZWQ7XG4gIGZpbHRlcjogSURhdGFUYWJsZUZpbHRlciB8IElEYXRhVGFibGVGaWx0ZXJbXSA9IHVuZGVmaW5lZDtcbiAgd2hlcmU6IHsgcXVlcnk6IHN0cmluZzsgZm9ybTogYW55IH0gPSB1bmRlZmluZWQ7XG4gIHBhZ2U6IG51bWJlciA9IDA7XG4gIHBhZ2VTaXplOiBudW1iZXIgPSB1bmRlZmluZWQ7XG4gIGdsb2JhbFNlYXJjaDogc3RyaW5nID0gdW5kZWZpbmVkO1xuICBzZWxlY3RlZFJvd3M6IE1hcDxzdHJpbmcsIFQ+ID0gbmV3IE1hcDxzdHJpbmcsIFQ+KCk7XG4gIGV4cGFuZGVkUm93czogU2V0PHN0cmluZz4gPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgb3V0c2lkZUZpbHRlcjogYW55O1xuICBpc0ZvcmNlUmVmcmVzaDogYm9vbGVhbiA9IGZhbHNlO1xuICBzZWxlY3Rpb25PcHRpb25zOiBJRGF0YVRhYmxlU2VsZWN0aW9uT3B0aW9uW107XG4gIHVwZGF0ZXM6IEV2ZW50RW1pdHRlcjxJRGF0YVRhYmxlQ2hhbmdlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJRGF0YVRhYmxlQ2hhbmdlRXZlbnQ+KCk7XG4gIHJldGFpblNlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHNhdmVkU2VhcmNoTmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuICBkaXNwbGF5ZWRDb2x1bW5zOiBzdHJpbmdbXSA9IHVuZGVmaW5lZDtcblxuICBnZXQgdXNlckZpbHRlcmVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhISh0aGlzLmZpbHRlciB8fCB0aGlzLnNvcnQgfHwgdGhpcy5nbG9iYWxTZWFyY2ggfHwgdGhpcy5vdXRzaWRlRmlsdGVyIHx8IHRoaXMud2hlcmUpO1xuICB9XG5cbiAgZ2V0IHVzZXJGaWx0ZXJlZEludGVybmFsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhISh0aGlzLmZpbHRlciB8fCB0aGlzLnNvcnQgfHwgdGhpcy5nbG9iYWxTZWFyY2ggfHwgdGhpcy53aGVyZSk7XG4gIH1cblxuICBnZXQgc2VsZWN0ZWQoKTogVFtdIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLnNlbGVjdGVkUm93cy52YWx1ZXMoKSk7XG4gIH1cblxuICBwdWJsaWMgcmVzZXQoZmlyZVVwZGF0ZTogYm9vbGVhbiA9IHRydWUsIHBlcnNpc3RVc2VyRmlsdGVycz8pOiB2b2lkIHtcbiAgICB0aGlzLnNldFN0YXRlKHt9IGFzIElEYXRhVGFibGVQcmVmZXJlbmNlcywgZmlyZVVwZGF0ZSwgcGVyc2lzdFVzZXJGaWx0ZXJzKVxuICB9XG5cbiAgcHVibGljIGNsZWFyU29ydChmaXJlVXBkYXRlOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgIHRoaXMuc29ydCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnBhZ2UgPSAwO1xuICAgIHRoaXMuY2hlY2tSZXRhaW5tZW50KCdzb3J0Jyk7XG4gICAgdGhpcy5yZXNldChmaXJlVXBkYXRlLCB0cnVlKTtcbiAgICB0aGlzLm9uU29ydEZpbHRlckNoYW5nZSgpO1xuICAgIGlmIChmaXJlVXBkYXRlKSB7XG4gICAgICB0aGlzLnVwZGF0ZXMuZW1pdCh7XG4gICAgICAgIHNvcnQ6IHRoaXMuc29ydCxcbiAgICAgICAgZmlsdGVyOiB0aGlzLmZpbHRlcixcbiAgICAgICAgZ2xvYmFsU2VhcmNoOiB0aGlzLmdsb2JhbFNlYXJjaCxcbiAgICAgICAgd2hlcmU6IHRoaXMud2hlcmUsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2xlYXJGaWx0ZXIoZmlyZVVwZGF0ZTogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICB0aGlzLmZpbHRlciA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmdsb2JhbFNlYXJjaCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnBhZ2UgPSAwO1xuICAgIHRoaXMuY2hlY2tSZXRhaW5tZW50KCdmaWx0ZXInKTtcbiAgICB0aGlzLnJlc2V0KGZpcmVVcGRhdGUsIHRydWUpO1xuICAgIHRoaXMub25Tb3J0RmlsdGVyQ2hhbmdlKCk7XG4gICAgaWYgKGZpcmVVcGRhdGUpIHtcbiAgICAgIHRoaXMudXBkYXRlcy5lbWl0KHtcbiAgICAgICAgc29ydDogdGhpcy5zb3J0LFxuICAgICAgICBmaWx0ZXI6IHRoaXMuZmlsdGVyLFxuICAgICAgICBnbG9iYWxTZWFyY2g6IHRoaXMuZ2xvYmFsU2VhcmNoLFxuICAgICAgICB3aGVyZTogdGhpcy53aGVyZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjbGVhclF1ZXJ5KGZpcmVVcGRhdGU6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgdGhpcy53aGVyZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnBhZ2UgPSAwO1xuICAgIHRoaXMuY2hlY2tSZXRhaW5tZW50KCd3aGVyZScpO1xuICAgIHRoaXMucmVzZXQoZmlyZVVwZGF0ZSwgdHJ1ZSk7XG4gICAgdGhpcy5vblNvcnRGaWx0ZXJDaGFuZ2UoKTtcbiAgICBpZiAoZmlyZVVwZGF0ZSkge1xuICAgICAgdGhpcy51cGRhdGVzLmVtaXQoe1xuICAgICAgICBzb3J0OiB0aGlzLnNvcnQsXG4gICAgICAgIGZpbHRlcjogdGhpcy5maWx0ZXIsXG4gICAgICAgIGdsb2JhbFNlYXJjaDogdGhpcy5nbG9iYWxTZWFyY2gsXG4gICAgICAgIHdoZXJlOiB0aGlzLndoZXJlLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNsZWFyU2VsZWN0ZWQoZmlyZVVwZGF0ZTogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICB0aGlzLmFsbE1hdGNoaW5nU2VsZWN0ZWRTb3VyY2UubmV4dChmYWxzZSk7XG4gICAgdGhpcy5nbG9iYWxTZWFyY2ggPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5wYWdlID0gMDtcbiAgICB0aGlzLnJlc2V0KGZpcmVVcGRhdGUsIHRydWUpO1xuICAgIHRoaXMub25TZWxlY3Rpb25DaGFuZ2UoKTtcbiAgICBpZiAoZmlyZVVwZGF0ZSkge1xuICAgICAgdGhpcy51cGRhdGVzLmVtaXQoe1xuICAgICAgICBzb3J0OiB0aGlzLnNvcnQsXG4gICAgICAgIGZpbHRlcjogdGhpcy5maWx0ZXIsXG4gICAgICAgIGdsb2JhbFNlYXJjaDogdGhpcy5nbG9iYWxTZWFyY2gsXG4gICAgICAgIHdoZXJlOiB0aGlzLndoZXJlLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9uU2VsZWN0aW9uQ2hhbmdlKCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0aW9uU291cmNlLm5leHQoKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkV4cGFuZENoYW5nZSh0YXJnZXRJZD86IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuZXhwYW5kU291cmNlLm5leHQodGFyZ2V0SWQpO1xuICB9XG5cbiAgcHVibGljIG9uUGFnaW5hdGlvbkNoYW5nZShpc1BhZ2VTaXplQ2hhbmdlOiBib29sZWFuLCBwYWdlU2l6ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5jaGVja1JldGFpbm1lbnQoJ3BhZ2UnKTtcbiAgICB0aGlzLnBhZ2luYXRpb25Tb3VyY2UubmV4dCh7IGlzUGFnZVNpemVDaGFuZ2UsIHBhZ2VTaXplIH0pO1xuICB9XG5cbiAgcHVibGljIG9uU29ydEZpbHRlckNoYW5nZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNoZWNrUmV0YWlubWVudCgnc29ydCcpO1xuICAgIHRoaXMuY2hlY2tSZXRhaW5tZW50KCdmaWx0ZXInKTtcbiAgICB0aGlzLmNoZWNrUmV0YWlubWVudCgnd2hlcmUnKTtcbiAgICB0aGlzLnNvcnRGaWx0ZXJTb3VyY2UubmV4dCh7XG4gICAgICBzb3J0OiB0aGlzLnNvcnQsXG4gICAgICBmaWx0ZXI6IHRoaXMuZmlsdGVyLFxuICAgICAgZ2xvYmFsU2VhcmNoOiB0aGlzLmdsb2JhbFNlYXJjaCxcbiAgICAgIHdoZXJlOiB0aGlzLndoZXJlLFxuICAgICAgc2F2ZWRTZWFyY2hOYW1lOiB0aGlzLnNhdmVkU2VhcmNoTmFtZSxcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRJbml0aWFsU29ydEZpbHRlcihwcmVmZXJlbmNlcyk6IHZvaWQge1xuICAgIGlmIChwcmVmZXJlbmNlcykge1xuICAgICAgaWYgKHByZWZlcmVuY2VzLndoZXJlKSB7XG4gICAgICAgIHRoaXMud2hlcmUgPSBwcmVmZXJlbmNlcy53aGVyZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHByZWZlcmVuY2VzLnNvcnQpIHtcbiAgICAgICAgdGhpcy5zb3J0ID0gcHJlZmVyZW5jZXMuc29ydDtcbiAgICAgIH1cblxuICAgICAgaWYgKHByZWZlcmVuY2VzLmZpbHRlcikge1xuICAgICAgICB0aGlzLmZpbHRlciA9IHRoaXMudHJhbnNmb3JtRmlsdGVycyhwcmVmZXJlbmNlcy5maWx0ZXIpO1xuICAgICAgfVxuXG4gICAgICBpZiAocHJlZmVyZW5jZXMuZ2xvYmFsU2VhcmNoKSB7XG4gICAgICAgIHRoaXMuZ2xvYmFsU2VhcmNoID0gcHJlZmVyZW5jZXMuZ2xvYmFsU2VhcmNoO1xuICAgICAgfVxuXG4gICAgICBpZiAocHJlZmVyZW5jZXMuc2F2ZWRTZWFyY2hOYW1lKSB7XG4gICAgICAgIHRoaXMuc2F2ZWRTZWFyY2hOYW1lID0gcHJlZmVyZW5jZXMuc2F2ZWRTZWFyY2hOYW1lO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXRTdGF0ZShwcmVmZXJlbmNlczogSURhdGFUYWJsZVByZWZlcmVuY2VzLCBmaXJlVXBkYXRlID0gdHJ1ZSwgcGVyc2lzdFVzZXJGaWx0ZXJzID0gZmFsc2UpOiB2b2lkIHtcbiAgICBpZiAoIXBlcnNpc3RVc2VyRmlsdGVycykge1xuICAgICAgdGhpcy53aGVyZSA9IHByZWZlcmVuY2VzLndoZXJlO1xuICAgICAgdGhpcy5zb3J0ID0gcHJlZmVyZW5jZXMuc29ydDtcbiAgICAgIHRoaXMuZmlsdGVyID0gcHJlZmVyZW5jZXMuZmlsdGVyID8gdGhpcy50cmFuc2Zvcm1GaWx0ZXJzKHByZWZlcmVuY2VzLmZpbHRlcikgOiB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmdsb2JhbFNlYXJjaCA9IHByZWZlcmVuY2VzLmdsb2JhbFNlYXJjaDtcbiAgICAgIHRoaXMuc2F2ZWRTZWFyY2hOYW1lID0gcHJlZmVyZW5jZXMuc2F2ZWRTZWFyY2hOYW1lO1xuICAgICAgaWYgKHByZWZlcmVuY2VzLmRpc3BsYXllZENvbHVtbnM/Lmxlbmd0aCkge1xuICAgICAgICB0aGlzLmRpc3BsYXllZENvbHVtbnMgPSBwcmVmZXJlbmNlcy5kaXNwbGF5ZWRDb2x1bW5zO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucGFnZSA9IDA7XG4gICAgaWYgKCF0aGlzLnJldGFpblNlbGVjdGVkKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkUm93cy5jbGVhcigpO1xuICAgICAgdGhpcy5yZXNldFNvdXJjZS5uZXh0KCk7XG4gICAgfVxuXG4gICAgdGhpcy5vblNvcnRGaWx0ZXJDaGFuZ2UoKTtcbiAgICB0aGlzLnJldGFpblNlbGVjdGVkID0gZmFsc2U7XG5cbiAgICBpZiAoZmlyZVVwZGF0ZSkge1xuICAgICAgdGhpcy51cGRhdGVzLmVtaXQoe1xuICAgICAgICBzb3J0OiB0aGlzLnNvcnQsXG4gICAgICAgIGZpbHRlcjogdGhpcy5maWx0ZXIsXG4gICAgICAgIGdsb2JhbFNlYXJjaDogdGhpcy5nbG9iYWxTZWFyY2gsXG4gICAgICAgIHdoZXJlOiB0aGlzLndoZXJlLFxuICAgICAgICBzYXZlZFNlYXJjaE5hbWU6IHRoaXMuc2F2ZWRTZWFyY2hOYW1lLFxuICAgICAgICBkaXNwbGF5ZWRDb2x1bW5zOiB0aGlzLmRpc3BsYXllZENvbHVtbnMsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2hlY2tSZXRhaW5tZW50KGNhbGxlcjogc3RyaW5nLCBhbGxNYXRjaGluZ1NlbGVjdGVkID0gZmFsc2UpOiB2b2lkIHtcbiAgICB0aGlzLnJldGFpblNlbGVjdGVkID0gdGhpcy5zZWxlY3Rpb25PcHRpb25zPy5zb21lKChvcHRpb24pID0+IG9wdGlvbi5sYWJlbCA9PT0gY2FsbGVyKSB8fCB0aGlzLnJldGFpblNlbGVjdGVkIHx8IGFsbE1hdGNoaW5nU2VsZWN0ZWQ7XG4gIH1cblxuICBwcml2YXRlIHRyYW5zZm9ybUZpbHRlcnMoZmlsdGVycykge1xuICAgIGNvbnN0IGZpbHRlckFycmF5ID0gSGVscGVycy5jb252ZXJ0VG9BcnJheShmaWx0ZXJzKTtcbiAgICBmaWx0ZXJBcnJheS5mb3JFYWNoKChmaWx0ZXIpID0+IHtcbiAgICAgIGZpbHRlci52YWx1ZSA9XG4gICAgICAgIGZpbHRlci5zZWxlY3RlZE9wdGlvbiAmJiBmaWx0ZXIudHlwZVxuICAgICAgICAgID8gTm92b0RhdGFUYWJsZUZpbHRlclV0aWxzLmNvbnN0cnVjdEZpbHRlcihmaWx0ZXIuc2VsZWN0ZWRPcHRpb24sIGZpbHRlci50eXBlKVxuICAgICAgICAgIDogZmlsdGVyLnZhbHVlO1xuICAgIH0pO1xuICAgIHJldHVybiBmaWx0ZXJBcnJheTtcbiAgfVxufVxuIl19
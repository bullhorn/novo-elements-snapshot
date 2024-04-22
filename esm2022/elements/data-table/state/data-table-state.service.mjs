import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Helpers } from 'novo-elements/utils';
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
            appliedSearchType: this.appliedSearchType,
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
            if (preferences.appliedSearchType) {
                this.appliedSearchType = preferences.appliedSearchType;
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
            this.appliedSearchType = preferences.appliedSearchType;
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
                appliedSearchType: this.appliedSearchType,
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: DataTableState, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: DataTableState }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: DataTableState, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1zdGF0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvZGF0YS10YWJsZS9zdGF0ZS9kYXRhLXRhYmxlLXN0YXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFTOUMsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0scUNBQXFDLENBQUM7O0FBRy9FLE1BQU0sT0FBTyxjQUFjO0lBRDNCO1FBRVMsb0JBQWUsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBQ3RDLHFCQUFnQixHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDakMscUJBQWdCLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNqQyxnQkFBVyxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFDbEMsaUJBQVksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQzdCLDhCQUF5QixHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDMUMsZUFBVSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFDakMsc0JBQWlCLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUV6QyxTQUFJLEdBQW1CLFNBQVMsQ0FBQztRQUNqQyxXQUFNLEdBQTBDLFNBQVMsQ0FBQztRQUMxRCxVQUFLLEdBQWlDLFNBQVMsQ0FBQztRQUNoRCxTQUFJLEdBQVcsQ0FBQyxDQUFDO1FBQ2pCLGFBQVEsR0FBVyxTQUFTLENBQUM7UUFDN0IsaUJBQVksR0FBVyxTQUFTLENBQUM7UUFDakMsaUJBQVksR0FBbUIsSUFBSSxHQUFHLEVBQWEs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SSxNQUFNLENBQUMsSUFBSTtvQkFDbEMsQ0FBQyxDQUFDLHdCQUF3QixDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQzlFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQzs4R0FuTlUsY0FBYztrSEFBZCxjQUFjOzsyRkFBZCxjQUFjO2tCQUQxQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5pbXBvcnQge1xuICBBcHBsaWVkU2VhcmNoVHlwZSxcbiAgSURhdGFUYWJsZUNoYW5nZUV2ZW50LFxuICBJRGF0YVRhYmxlRmlsdGVyLFxuICBJRGF0YVRhYmxlUHJlZmVyZW5jZXMsXG4gIElEYXRhVGFibGVTZWxlY3Rpb25PcHRpb24sXG4gIElEYXRhVGFibGVTb3J0LFxufSBmcm9tICcuLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IE5vdm9EYXRhVGFibGVGaWx0ZXJVdGlscyB9IGZyb20gJy4uL3NlcnZpY2VzL2RhdGEtdGFibGUtZmlsdGVyLXV0aWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGFUYWJsZVN0YXRlPFQ+IHtcbiAgcHVibGljIHNlbGVjdGlvblNvdXJjZSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHB1YmxpYyBwYWdpbmF0aW9uU291cmNlID0gbmV3IFN1YmplY3QoKTtcbiAgcHVibGljIHNvcnRGaWx0ZXJTb3VyY2UgPSBuZXcgU3ViamVjdCgpO1xuICBwdWJsaWMgcmVzZXRTb3VyY2UgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwdWJsaWMgZXhwYW5kU291cmNlID0gbmV3IFN1YmplY3QoKTtcbiAgcHVibGljIGFsbE1hdGNoaW5nU2VsZWN0ZWRTb3VyY2UgPSBuZXcgU3ViamVjdCgpO1xuICBwdWJsaWMgZGF0YUxvYWRlZCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHB1YmxpYyBkYXRhTG9hZGluZ1NvdXJjZSA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgc29ydDogSURhdGFUYWJsZVNvcnQgPSB1bmRlZmluZWQ7XG4gIGZpbHRlcjogSURhdGFUYWJsZUZpbHRlciB8IElEYXRhVGFibGVGaWx0ZXJbXSA9IHVuZGVmaW5lZDtcbiAgd2hlcmU6IHsgcXVlcnk6IHN0cmluZzsgZm9ybTogYW55IH0gPSB1bmRlZmluZWQ7XG4gIHBhZ2U6IG51bWJlciA9IDA7XG4gIHBhZ2VTaXplOiBudW1iZXIgPSB1bmRlZmluZWQ7XG4gIGdsb2JhbFNlYXJjaDogc3RyaW5nID0gdW5kZWZpbmVkO1xuICBzZWxlY3RlZFJvd3M6IE1hcDxzdHJpbmcsIFQ+ID0gbmV3IE1hcDxzdHJpbmcsIFQ+KCk7XG4gIGV4cGFuZGVkUm93czogU2V0PHN0cmluZz4gPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgb3V0c2lkZUZpbHRlcjogYW55O1xuICBpc0ZvcmNlUmVmcmVzaDogYm9vbGVhbiA9IGZhbHNlO1xuICBzZWxlY3Rpb25PcHRpb25zOiBJRGF0YVRhYmxlU2VsZWN0aW9uT3B0aW9uW107XG4gIHVwZGF0ZXM6IEV2ZW50RW1pdHRlcjxJRGF0YVRhYmxlQ2hhbmdlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJRGF0YVRhYmxlQ2hhbmdlRXZlbnQ+KCk7XG4gIHJldGFpblNlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHNhdmVkU2VhcmNoTmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuICBhcHBsaWVkU2VhcmNoVHlwZTogQXBwbGllZFNlYXJjaFR5cGU7XG4gIGRpc3BsYXllZENvbHVtbnM6IHN0cmluZ1tdID0gdW5kZWZpbmVkO1xuXG4gIGdldCB1c2VyRmlsdGVyZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhKHRoaXMuZmlsdGVyIHx8IHRoaXMuc29ydCB8fCB0aGlzLmdsb2JhbFNlYXJjaCB8fCB0aGlzLm91dHNpZGVGaWx0ZXIgfHwgdGhpcy53aGVyZSk7XG4gIH1cblxuICBnZXQgdXNlckZpbHRlcmVkSW50ZXJuYWwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhKHRoaXMuZmlsdGVyIHx8IHRoaXMuc29ydCB8fCB0aGlzLmdsb2JhbFNlYXJjaCB8fCB0aGlzLndoZXJlKTtcbiAgfVxuXG4gIGdldCBzZWxlY3RlZCgpOiBUW10ge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuc2VsZWN0ZWRSb3dzLnZhbHVlcygpKTtcbiAgfVxuXG4gIHB1YmxpYyByZXNldChmaXJlVXBkYXRlOiBib29sZWFuID0gdHJ1ZSwgcGVyc2lzdFVzZXJGaWx0ZXJzPyk6IHZvaWQge1xuICAgIHRoaXMuc2V0U3RhdGUoe30gYXMgSURhdGFUYWJsZVByZWZlcmVuY2VzLCBmaXJlVXBkYXRlLCBwZXJzaXN0VXNlckZpbHRlcnMpXG4gIH1cblxuICBwdWJsaWMgY2xlYXJTb3J0KGZpcmVVcGRhdGU6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgdGhpcy5zb3J0ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMucGFnZSA9IDA7XG4gICAgdGhpcy5jaGVja1JldGFpbm1lbnQoJ3NvcnQnKTtcbiAgICB0aGlzLnJlc2V0KGZpcmVVcGRhdGUsIHRydWUpO1xuICAgIHRoaXMub25Tb3J0RmlsdGVyQ2hhbmdlKCk7XG4gICAgaWYgKGZpcmVVcGRhdGUpIHtcbiAgICAgIHRoaXMudXBkYXRlcy5lbWl0KHtcbiAgICAgICAgc29ydDogdGhpcy5zb3J0LFxuICAgICAgICBmaWx0ZXI6IHRoaXMuZmlsdGVyLFxuICAgICAgICBnbG9iYWxTZWFyY2g6IHRoaXMuZ2xvYmFsU2VhcmNoLFxuICAgICAgICB3aGVyZTogdGhpcy53aGVyZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjbGVhckZpbHRlcihmaXJlVXBkYXRlOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgIHRoaXMuZmlsdGVyID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuZ2xvYmFsU2VhcmNoID0gdW5kZWZpbmVkO1xuICAgIHRoaXMucGFnZSA9IDA7XG4gICAgdGhpcy5jaGVja1JldGFpbm1lbnQoJ2ZpbHRlcicpO1xuICAgIHRoaXMucmVzZXQoZmlyZVVwZGF0ZSwgdHJ1ZSk7XG4gICAgdGhpcy5vblNvcnRGaWx0ZXJDaGFuZ2UoKTtcbiAgICBpZiAoZmlyZVVwZGF0ZSkge1xuICAgICAgdGhpcy51cGRhdGVzLmVtaXQoe1xuICAgICAgICBzb3J0OiB0aGlzLnNvcnQsXG4gICAgICAgIGZpbHRlcjogdGhpcy5maWx0ZXIsXG4gICAgICAgIGdsb2JhbFNlYXJjaDogdGhpcy5nbG9iYWxTZWFyY2gsXG4gICAgICAgIHdoZXJlOiB0aGlzLndoZXJlLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNsZWFyUXVlcnkoZmlyZVVwZGF0ZTogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICB0aGlzLndoZXJlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMucGFnZSA9IDA7XG4gICAgdGhpcy5jaGVja1JldGFpbm1lbnQoJ3doZXJlJyk7XG4gICAgdGhpcy5yZXNldChmaXJlVXBkYXRlLCB0cnVlKTtcbiAgICB0aGlzLm9uU29ydEZpbHRlckNoYW5nZSgpO1xuICAgIGlmIChmaXJlVXBkYXRlKSB7XG4gICAgICB0aGlzLnVwZGF0ZXMuZW1pdCh7XG4gICAgICAgIHNvcnQ6IHRoaXMuc29ydCxcbiAgICAgICAgZmlsdGVyOiB0aGlzLmZpbHRlcixcbiAgICAgICAgZ2xvYmFsU2VhcmNoOiB0aGlzLmdsb2JhbFNlYXJjaCxcbiAgICAgICAgd2hlcmU6IHRoaXMud2hlcmUsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2xlYXJTZWxlY3RlZChmaXJlVXBkYXRlOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgIHRoaXMuYWxsTWF0Y2hpbmdTZWxlY3RlZFNvdXJjZS5uZXh0KGZhbHNlKTtcbiAgICB0aGlzLmdsb2JhbFNlYXJjaCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnBhZ2UgPSAwO1xuICAgIHRoaXMucmVzZXQoZmlyZVVwZGF0ZSwgdHJ1ZSk7XG4gICAgdGhpcy5vblNlbGVjdGlvbkNoYW5nZSgpO1xuICAgIGlmIChmaXJlVXBkYXRlKSB7XG4gICAgICB0aGlzLnVwZGF0ZXMuZW1pdCh7XG4gICAgICAgIHNvcnQ6IHRoaXMuc29ydCxcbiAgICAgICAgZmlsdGVyOiB0aGlzLmZpbHRlcixcbiAgICAgICAgZ2xvYmFsU2VhcmNoOiB0aGlzLmdsb2JhbFNlYXJjaCxcbiAgICAgICAgd2hlcmU6IHRoaXMud2hlcmUsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb25TZWxlY3Rpb25DaGFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3Rpb25Tb3VyY2UubmV4dCgpO1xuICB9XG5cbiAgcHVibGljIG9uRXhwYW5kQ2hhbmdlKHRhcmdldElkPzogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5leHBhbmRTb3VyY2UubmV4dCh0YXJnZXRJZCk7XG4gIH1cblxuICBwdWJsaWMgb25QYWdpbmF0aW9uQ2hhbmdlKGlzUGFnZVNpemVDaGFuZ2U6IGJvb2xlYW4sIHBhZ2VTaXplOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmNoZWNrUmV0YWlubWVudCgncGFnZScpO1xuICAgIHRoaXMucGFnaW5hdGlvblNvdXJjZS5uZXh0KHsgaXNQYWdlU2l6ZUNoYW5nZSwgcGFnZVNpemUgfSk7XG4gIH1cblxuICBwdWJsaWMgb25Tb3J0RmlsdGVyQ2hhbmdlKCk6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tSZXRhaW5tZW50KCdzb3J0Jyk7XG4gICAgdGhpcy5jaGVja1JldGFpbm1lbnQoJ2ZpbHRlcicpO1xuICAgIHRoaXMuY2hlY2tSZXRhaW5tZW50KCd3aGVyZScpO1xuICAgIHRoaXMuc29ydEZpbHRlclNvdXJjZS5uZXh0KHtcbiAgICAgIHNvcnQ6IHRoaXMuc29ydCxcbiAgICAgIGZpbHRlcjogdGhpcy5maWx0ZXIsXG4gICAgICBnbG9iYWxTZWFyY2g6IHRoaXMuZ2xvYmFsU2VhcmNoLFxuICAgICAgd2hlcmU6IHRoaXMud2hlcmUsXG4gICAgICBzYXZlZFNlYXJjaE5hbWU6IHRoaXMuc2F2ZWRTZWFyY2hOYW1lLFxuICAgICAgYXBwbGllZFNlYXJjaFR5cGU6IHRoaXMuYXBwbGllZFNlYXJjaFR5cGUsXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc2V0SW5pdGlhbFNvcnRGaWx0ZXIocHJlZmVyZW5jZXMpOiB2b2lkIHtcbiAgICBpZiAocHJlZmVyZW5jZXMpIHtcbiAgICAgIGlmIChwcmVmZXJlbmNlcy53aGVyZSkge1xuICAgICAgICB0aGlzLndoZXJlID0gcHJlZmVyZW5jZXMud2hlcmU7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcmVmZXJlbmNlcy5zb3J0KSB7XG4gICAgICAgIHRoaXMuc29ydCA9IHByZWZlcmVuY2VzLnNvcnQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcmVmZXJlbmNlcy5maWx0ZXIpIHtcbiAgICAgICAgdGhpcy5maWx0ZXIgPSB0aGlzLnRyYW5zZm9ybUZpbHRlcnMocHJlZmVyZW5jZXMuZmlsdGVyKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHByZWZlcmVuY2VzLmdsb2JhbFNlYXJjaCkge1xuICAgICAgICB0aGlzLmdsb2JhbFNlYXJjaCA9IHByZWZlcmVuY2VzLmdsb2JhbFNlYXJjaDtcbiAgICAgIH1cblxuICAgICAgaWYgKHByZWZlcmVuY2VzLnNhdmVkU2VhcmNoTmFtZSkge1xuICAgICAgICB0aGlzLnNhdmVkU2VhcmNoTmFtZSA9IHByZWZlcmVuY2VzLnNhdmVkU2VhcmNoTmFtZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHByZWZlcmVuY2VzLmFwcGxpZWRTZWFyY2hUeXBlKSB7XG4gICAgICAgIHRoaXMuYXBwbGllZFNlYXJjaFR5cGUgPSBwcmVmZXJlbmNlcy5hcHBsaWVkU2VhcmNoVHlwZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0U3RhdGUocHJlZmVyZW5jZXM6IElEYXRhVGFibGVQcmVmZXJlbmNlcywgZmlyZVVwZGF0ZSA9IHRydWUsIHBlcnNpc3RVc2VyRmlsdGVycyA9IGZhbHNlKTogdm9pZCB7XG4gICAgaWYgKCFwZXJzaXN0VXNlckZpbHRlcnMpIHtcbiAgICAgIHRoaXMud2hlcmUgPSBwcmVmZXJlbmNlcy53aGVyZTtcbiAgICAgIHRoaXMuc29ydCA9IHByZWZlcmVuY2VzLnNvcnQ7XG4gICAgICB0aGlzLmZpbHRlciA9IHByZWZlcmVuY2VzLmZpbHRlciA/IHRoaXMudHJhbnNmb3JtRmlsdGVycyhwcmVmZXJlbmNlcy5maWx0ZXIpIDogdW5kZWZpbmVkO1xuICAgICAgdGhpcy5nbG9iYWxTZWFyY2ggPSBwcmVmZXJlbmNlcy5nbG9iYWxTZWFyY2g7XG4gICAgICB0aGlzLnNhdmVkU2VhcmNoTmFtZSA9IHByZWZlcmVuY2VzLnNhdmVkU2VhcmNoTmFtZTtcbiAgICAgIGlmIChwcmVmZXJlbmNlcy5kaXNwbGF5ZWRDb2x1bW5zPy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRDb2x1bW5zID0gcHJlZmVyZW5jZXMuZGlzcGxheWVkQ29sdW1ucztcbiAgICAgIH1cbiAgICAgIHRoaXMuYXBwbGllZFNlYXJjaFR5cGUgPSBwcmVmZXJlbmNlcy5hcHBsaWVkU2VhcmNoVHlwZTtcbiAgICB9XG5cbiAgICB0aGlzLnBhZ2UgPSAwO1xuICAgIGlmICghdGhpcy5yZXRhaW5TZWxlY3RlZCkge1xuICAgICAgdGhpcy5zZWxlY3RlZFJvd3MuY2xlYXIoKTtcbiAgICAgIHRoaXMucmVzZXRTb3VyY2UubmV4dCgpO1xuICAgIH1cblxuICAgIHRoaXMub25Tb3J0RmlsdGVyQ2hhbmdlKCk7XG4gICAgdGhpcy5yZXRhaW5TZWxlY3RlZCA9IGZhbHNlO1xuXG4gICAgaWYgKGZpcmVVcGRhdGUpIHtcbiAgICAgIHRoaXMudXBkYXRlcy5lbWl0KHtcbiAgICAgICAgc29ydDogdGhpcy5zb3J0LFxuICAgICAgICBmaWx0ZXI6IHRoaXMuZmlsdGVyLFxuICAgICAgICBnbG9iYWxTZWFyY2g6IHRoaXMuZ2xvYmFsU2VhcmNoLFxuICAgICAgICB3aGVyZTogdGhpcy53aGVyZSxcbiAgICAgICAgc2F2ZWRTZWFyY2hOYW1lOiB0aGlzLnNhdmVkU2VhcmNoTmFtZSxcbiAgICAgICAgZGlzcGxheWVkQ29sdW1uczogdGhpcy5kaXNwbGF5ZWRDb2x1bW5zLFxuICAgICAgICBhcHBsaWVkU2VhcmNoVHlwZTogdGhpcy5hcHBsaWVkU2VhcmNoVHlwZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjaGVja1JldGFpbm1lbnQoY2FsbGVyOiBzdHJpbmcsIGFsbE1hdGNoaW5nU2VsZWN0ZWQgPSBmYWxzZSk6IHZvaWQge1xuICAgIHRoaXMucmV0YWluU2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGlvbk9wdGlvbnM/LnNvbWUoKG9wdGlvbikgPT4gb3B0aW9uLmxhYmVsID09PSBjYWxsZXIpIHx8IHRoaXMucmV0YWluU2VsZWN0ZWQgfHwgYWxsTWF0Y2hpbmdTZWxlY3RlZDtcbiAgfVxuXG4gIHByaXZhdGUgdHJhbnNmb3JtRmlsdGVycyhmaWx0ZXJzKSB7XG4gICAgY29uc3QgZmlsdGVyQXJyYXkgPSBIZWxwZXJzLmNvbnZlcnRUb0FycmF5KGZpbHRlcnMpO1xuICAgIGZpbHRlckFycmF5LmZvckVhY2goKGZpbHRlcikgPT4ge1xuICAgICAgZmlsdGVyLnZhbHVlID1cbiAgICAgICAgZmlsdGVyLnNlbGVjdGVkT3B0aW9uICYmIGZpbHRlci50eXBlXG4gICAgICAgICAgPyBOb3ZvRGF0YVRhYmxlRmlsdGVyVXRpbHMuY29uc3RydWN0RmlsdGVyKGZpbHRlci5zZWxlY3RlZE9wdGlvbiwgZmlsdGVyLnR5cGUpXG4gICAgICAgICAgOiBmaWx0ZXIudmFsdWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIGZpbHRlckFycmF5O1xuICB9XG59XG4iXX0=
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1zdGF0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvZGF0YS10YWJsZS9zdGF0ZS9kYXRhLXRhYmxlLXN0YXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFakQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0scUNBQXFDLENBQUM7O0FBRy9FLE1BQU0sT0FBTyxjQUFjO0lBRDNCO1FBRVMsb0JBQWUsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ2hDLHFCQUFnQixHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDakMscUJBQWdCLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNqQyxnQkFBVyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDNUIsaUJBQVksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQzdCLDhCQUF5QixHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDMUMsZUFBVSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDM0Isc0JBQWlCLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUV6QyxTQUFJLEdBQW1CLFNBQVMsQ0FBQztRQUNqQyxXQUFNLEdBQTBDLFNBQVMsQ0FBQztRQUMxRCxVQUFLLEdBQWlDLFNBQVMsQ0FBQztRQUNoRCxTQUFJLEdBQVcsQ0FBQyxDQUFDO1FBQ2pCLGFBQVEsR0FBVyxTQUFTLENBQUM7UUFDN0IsaUJBQVksR0FBVyxTQUFTLENBQUM7UUFDakMsaUJBQVksR0FBbUIsSUFBSSxHQUFHLEVB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QyxNQUFNO2dCQUNuQixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7Z0JBQy9CLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztnQkFDakIsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO2dCQUNyQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO2FBQ3hDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVNLGVBQWUsQ0FBQyxNQUFjLEVBQUUsbUJBQW1CLEdBQUcsS0FBSztRQUNoRSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsSUFBSSxtQkFBbUIsQ0FBQztJQUN2SSxDQUFDO0lBRU8sZ0JBQWdCLENBQUMsT0FBTztRQUM5QixNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BELFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUM3QixNQUFNLENBQUMsS0FBSztnQkFDVixNQUFNLENBQUMsY0FBYyxJQUFJLE1BQU0sQ0FBQyxJQUFJO29CQUNsQyxDQUFDLENBQUMsd0JBQXdCLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDOUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDOzs0R0EzTVUsY0FBYztnSEFBZCxjQUFjOzRGQUFkLGNBQWM7a0JBRDFCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEhlbHBlcnMgfSBmcm9tICcuLi8uLi8uLi91dGlscy9IZWxwZXJzJztcbmltcG9ydCB7IElEYXRhVGFibGVDaGFuZ2VFdmVudCwgSURhdGFUYWJsZUZpbHRlciwgSURhdGFUYWJsZVByZWZlcmVuY2VzLCBJRGF0YVRhYmxlU2VsZWN0aW9uT3B0aW9uLCBJRGF0YVRhYmxlU29ydCB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgTm92b0RhdGFUYWJsZUZpbHRlclV0aWxzIH0gZnJvbSAnLi4vc2VydmljZXMvZGF0YS10YWJsZS1maWx0ZXItdXRpbHMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGF0YVRhYmxlU3RhdGU8VD4ge1xuICBwdWJsaWMgc2VsZWN0aW9uU291cmNlID0gbmV3IFN1YmplY3QoKTtcbiAgcHVibGljIHBhZ2luYXRpb25Tb3VyY2UgPSBuZXcgU3ViamVjdCgpO1xuICBwdWJsaWMgc29ydEZpbHRlclNvdXJjZSA9IG5ldyBTdWJqZWN0KCk7XG4gIHB1YmxpYyByZXNldFNvdXJjZSA9IG5ldyBTdWJqZWN0KCk7XG4gIHB1YmxpYyBleHBhbmRTb3VyY2UgPSBuZXcgU3ViamVjdCgpO1xuICBwdWJsaWMgYWxsTWF0Y2hpbmdTZWxlY3RlZFNvdXJjZSA9IG5ldyBTdWJqZWN0KCk7XG4gIHB1YmxpYyBkYXRhTG9hZGVkID0gbmV3IFN1YmplY3QoKTtcbiAgcHVibGljIGRhdGFMb2FkaW5nU291cmNlID0gbmV3IFN1YmplY3QoKTtcblxuICBzb3J0OiBJRGF0YVRhYmxlU29ydCA9IHVuZGVmaW5lZDtcbiAgZmlsdGVyOiBJRGF0YVRhYmxlRmlsdGVyIHwgSURhdGFUYWJsZUZpbHRlcltdID0gdW5kZWZpbmVkO1xuICB3aGVyZTogeyBxdWVyeTogc3RyaW5nOyBmb3JtOiBhbnkgfSA9IHVuZGVmaW5lZDtcbiAgcGFnZTogbnVtYmVyID0gMDtcbiAgcGFnZVNpemU6IG51bWJlciA9IHVuZGVmaW5lZDtcbiAgZ2xvYmFsU2VhcmNoOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG4gIHNlbGVjdGVkUm93czogTWFwPHN0cmluZywgVD4gPSBuZXcgTWFwPHN0cmluZywgVD4oKTtcbiAgZXhwYW5kZWRSb3dzOiBTZXQ8c3RyaW5nPiA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICBvdXRzaWRlRmlsdGVyOiBhbnk7XG4gIGlzRm9yY2VSZWZyZXNoOiBib29sZWFuID0gZmFsc2U7XG4gIHNlbGVjdGlvbk9wdGlvbnM6IElEYXRhVGFibGVTZWxlY3Rpb25PcHRpb25bXTtcbiAgdXBkYXRlczogRXZlbnRFbWl0dGVyPElEYXRhVGFibGVDaGFuZ2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElEYXRhVGFibGVDaGFuZ2VFdmVudD4oKTtcbiAgcmV0YWluU2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgc2F2ZWRTZWFyY2hOYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG4gIGRpc3BsYXllZENvbHVtbnM6IHN0cmluZ1tdID0gdW5kZWZpbmVkO1xuXG4gIGdldCB1c2VyRmlsdGVyZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhKHRoaXMuZmlsdGVyIHx8IHRoaXMuc29ydCB8fCB0aGlzLmdsb2JhbFNlYXJjaCB8fCB0aGlzLm91dHNpZGVGaWx0ZXIgfHwgdGhpcy53aGVyZSk7XG4gIH1cblxuICBnZXQgdXNlckZpbHRlcmVkSW50ZXJuYWwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhKHRoaXMuZmlsdGVyIHx8IHRoaXMuc29ydCB8fCB0aGlzLmdsb2JhbFNlYXJjaCB8fCB0aGlzLndoZXJlKTtcbiAgfVxuXG4gIGdldCBzZWxlY3RlZCgpOiBUW10ge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuc2VsZWN0ZWRSb3dzLnZhbHVlcygpKTtcbiAgfVxuXG4gIHB1YmxpYyByZXNldChmaXJlVXBkYXRlOiBib29sZWFuID0gdHJ1ZSwgcGVyc2lzdFVzZXJGaWx0ZXJzPyk6IHZvaWQge1xuICAgIHRoaXMuc2V0U3RhdGUoe30gYXMgSURhdGFUYWJsZVByZWZlcmVuY2VzLCBmaXJlVXBkYXRlLCBwZXJzaXN0VXNlckZpbHRlcnMpXG4gIH1cblxuICBwdWJsaWMgY2xlYXJTb3J0KGZpcmVVcGRhdGU6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgdGhpcy5zb3J0ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMucGFnZSA9IDA7XG4gICAgdGhpcy5jaGVja1JldGFpbm1lbnQoJ3NvcnQnKTtcbiAgICB0aGlzLnJlc2V0KGZpcmVVcGRhdGUsIHRydWUpO1xuICAgIHRoaXMub25Tb3J0RmlsdGVyQ2hhbmdlKCk7XG4gICAgaWYgKGZpcmVVcGRhdGUpIHtcbiAgICAgIHRoaXMudXBkYXRlcy5lbWl0KHtcbiAgICAgICAgc29ydDogdGhpcy5zb3J0LFxuICAgICAgICBmaWx0ZXI6IHRoaXMuZmlsdGVyLFxuICAgICAgICBnbG9iYWxTZWFyY2g6IHRoaXMuZ2xvYmFsU2VhcmNoLFxuICAgICAgICB3aGVyZTogdGhpcy53aGVyZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjbGVhckZpbHRlcihmaXJlVXBkYXRlOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgIHRoaXMuZmlsdGVyID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuZ2xvYmFsU2VhcmNoID0gdW5kZWZpbmVkO1xuICAgIHRoaXMucGFnZSA9IDA7XG4gICAgdGhpcy5jaGVja1JldGFpbm1lbnQoJ2ZpbHRlcicpO1xuICAgIHRoaXMucmVzZXQoZmlyZVVwZGF0ZSwgdHJ1ZSk7XG4gICAgdGhpcy5vblNvcnRGaWx0ZXJDaGFuZ2UoKTtcbiAgICBpZiAoZmlyZVVwZGF0ZSkge1xuICAgICAgdGhpcy51cGRhdGVzLmVtaXQoe1xuICAgICAgICBzb3J0OiB0aGlzLnNvcnQsXG4gICAgICAgIGZpbHRlcjogdGhpcy5maWx0ZXIsXG4gICAgICAgIGdsb2JhbFNlYXJjaDogdGhpcy5nbG9iYWxTZWFyY2gsXG4gICAgICAgIHdoZXJlOiB0aGlzLndoZXJlLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNsZWFyUXVlcnkoZmlyZVVwZGF0ZTogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICB0aGlzLndoZXJlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMucGFnZSA9IDA7XG4gICAgdGhpcy5jaGVja1JldGFpbm1lbnQoJ3doZXJlJyk7XG4gICAgdGhpcy5yZXNldChmaXJlVXBkYXRlLCB0cnVlKTtcbiAgICB0aGlzLm9uU29ydEZpbHRlckNoYW5nZSgpO1xuICAgIGlmIChmaXJlVXBkYXRlKSB7XG4gICAgICB0aGlzLnVwZGF0ZXMuZW1pdCh7XG4gICAgICAgIHNvcnQ6IHRoaXMuc29ydCxcbiAgICAgICAgZmlsdGVyOiB0aGlzLmZpbHRlcixcbiAgICAgICAgZ2xvYmFsU2VhcmNoOiB0aGlzLmdsb2JhbFNlYXJjaCxcbiAgICAgICAgd2hlcmU6IHRoaXMud2hlcmUsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2xlYXJTZWxlY3RlZChmaXJlVXBkYXRlOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgIHRoaXMuYWxsTWF0Y2hpbmdTZWxlY3RlZFNvdXJjZS5uZXh0KGZhbHNlKTtcbiAgICB0aGlzLmdsb2JhbFNlYXJjaCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnBhZ2UgPSAwO1xuICAgIHRoaXMucmVzZXQoZmlyZVVwZGF0ZSwgdHJ1ZSk7XG4gICAgdGhpcy5vblNlbGVjdGlvbkNoYW5nZSgpO1xuICAgIGlmIChmaXJlVXBkYXRlKSB7XG4gICAgICB0aGlzLnVwZGF0ZXMuZW1pdCh7XG4gICAgICAgIHNvcnQ6IHRoaXMuc29ydCxcbiAgICAgICAgZmlsdGVyOiB0aGlzLmZpbHRlcixcbiAgICAgICAgZ2xvYmFsU2VhcmNoOiB0aGlzLmdsb2JhbFNlYXJjaCxcbiAgICAgICAgd2hlcmU6IHRoaXMud2hlcmUsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb25TZWxlY3Rpb25DaGFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3Rpb25Tb3VyY2UubmV4dCgpO1xuICB9XG5cbiAgcHVibGljIG9uRXhwYW5kQ2hhbmdlKHRhcmdldElkPzogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5leHBhbmRTb3VyY2UubmV4dCh0YXJnZXRJZCk7XG4gIH1cblxuICBwdWJsaWMgb25QYWdpbmF0aW9uQ2hhbmdlKGlzUGFnZVNpemVDaGFuZ2U6IGJvb2xlYW4sIHBhZ2VTaXplOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmNoZWNrUmV0YWlubWVudCgncGFnZScpO1xuICAgIHRoaXMucGFnaW5hdGlvblNvdXJjZS5uZXh0KHsgaXNQYWdlU2l6ZUNoYW5nZSwgcGFnZVNpemUgfSk7XG4gIH1cblxuICBwdWJsaWMgb25Tb3J0RmlsdGVyQ2hhbmdlKCk6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tSZXRhaW5tZW50KCdzb3J0Jyk7XG4gICAgdGhpcy5jaGVja1JldGFpbm1lbnQoJ2ZpbHRlcicpO1xuICAgIHRoaXMuY2hlY2tSZXRhaW5tZW50KCd3aGVyZScpO1xuICAgIHRoaXMuc29ydEZpbHRlclNvdXJjZS5uZXh0KHtcbiAgICAgIHNvcnQ6IHRoaXMuc29ydCxcbiAgICAgIGZpbHRlcjogdGhpcy5maWx0ZXIsXG4gICAgICBnbG9iYWxTZWFyY2g6IHRoaXMuZ2xvYmFsU2VhcmNoLFxuICAgICAgd2hlcmU6IHRoaXMud2hlcmUsXG4gICAgICBzYXZlZFNlYXJjaE5hbWU6IHRoaXMuc2F2ZWRTZWFyY2hOYW1lLFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHNldEluaXRpYWxTb3J0RmlsdGVyKHByZWZlcmVuY2VzKTogdm9pZCB7XG4gICAgaWYgKHByZWZlcmVuY2VzKSB7XG4gICAgICBpZiAocHJlZmVyZW5jZXMud2hlcmUpIHtcbiAgICAgICAgdGhpcy53aGVyZSA9IHByZWZlcmVuY2VzLndoZXJlO1xuICAgICAgfVxuXG4gICAgICBpZiAocHJlZmVyZW5jZXMuc29ydCkge1xuICAgICAgICB0aGlzLnNvcnQgPSBwcmVmZXJlbmNlcy5zb3J0O1xuICAgICAgfVxuXG4gICAgICBpZiAocHJlZmVyZW5jZXMuZmlsdGVyKSB7XG4gICAgICAgIHRoaXMuZmlsdGVyID0gdGhpcy50cmFuc2Zvcm1GaWx0ZXJzKHByZWZlcmVuY2VzLmZpbHRlcik7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcmVmZXJlbmNlcy5nbG9iYWxTZWFyY2gpIHtcbiAgICAgICAgdGhpcy5nbG9iYWxTZWFyY2ggPSBwcmVmZXJlbmNlcy5nbG9iYWxTZWFyY2g7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcmVmZXJlbmNlcy5zYXZlZFNlYXJjaE5hbWUpIHtcbiAgICAgICAgdGhpcy5zYXZlZFNlYXJjaE5hbWUgPSBwcmVmZXJlbmNlcy5zYXZlZFNlYXJjaE5hbWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldFN0YXRlKHByZWZlcmVuY2VzOiBJRGF0YVRhYmxlUHJlZmVyZW5jZXMsIGZpcmVVcGRhdGUgPSB0cnVlLCBwZXJzaXN0VXNlckZpbHRlcnMgPSBmYWxzZSk6IHZvaWQge1xuICAgIGlmICghcGVyc2lzdFVzZXJGaWx0ZXJzKSB7XG4gICAgICB0aGlzLndoZXJlID0gcHJlZmVyZW5jZXMud2hlcmU7XG4gICAgICB0aGlzLnNvcnQgPSBwcmVmZXJlbmNlcy5zb3J0O1xuICAgICAgdGhpcy5maWx0ZXIgPSBwcmVmZXJlbmNlcy5maWx0ZXIgPyB0aGlzLnRyYW5zZm9ybUZpbHRlcnMocHJlZmVyZW5jZXMuZmlsdGVyKSA6IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZ2xvYmFsU2VhcmNoID0gcHJlZmVyZW5jZXMuZ2xvYmFsU2VhcmNoO1xuICAgICAgdGhpcy5zYXZlZFNlYXJjaE5hbWUgPSBwcmVmZXJlbmNlcy5zYXZlZFNlYXJjaE5hbWU7XG4gICAgICBpZiAocHJlZmVyZW5jZXMuZGlzcGxheWVkQ29sdW1ucz8ubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheWVkQ29sdW1ucyA9IHByZWZlcmVuY2VzLmRpc3BsYXllZENvbHVtbnM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5wYWdlID0gMDtcbiAgICBpZiAoIXRoaXMucmV0YWluU2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRSb3dzLmNsZWFyKCk7XG4gICAgICB0aGlzLnJlc2V0U291cmNlLm5leHQoKTtcbiAgICB9XG5cbiAgICB0aGlzLm9uU29ydEZpbHRlckNoYW5nZSgpO1xuICAgIHRoaXMucmV0YWluU2VsZWN0ZWQgPSBmYWxzZTtcblxuICAgIGlmIChmaXJlVXBkYXRlKSB7XG4gICAgICB0aGlzLnVwZGF0ZXMuZW1pdCh7XG4gICAgICAgIHNvcnQ6IHRoaXMuc29ydCxcbiAgICAgICAgZmlsdGVyOiB0aGlzLmZpbHRlcixcbiAgICAgICAgZ2xvYmFsU2VhcmNoOiB0aGlzLmdsb2JhbFNlYXJjaCxcbiAgICAgICAgd2hlcmU6IHRoaXMud2hlcmUsXG4gICAgICAgIHNhdmVkU2VhcmNoTmFtZTogdGhpcy5zYXZlZFNlYXJjaE5hbWUsXG4gICAgICAgIGRpc3BsYXllZENvbHVtbnM6IHRoaXMuZGlzcGxheWVkQ29sdW1ucyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjaGVja1JldGFpbm1lbnQoY2FsbGVyOiBzdHJpbmcsIGFsbE1hdGNoaW5nU2VsZWN0ZWQgPSBmYWxzZSk6IHZvaWQge1xuICAgIHRoaXMucmV0YWluU2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGlvbk9wdGlvbnM/LnNvbWUoKG9wdGlvbikgPT4gb3B0aW9uLmxhYmVsID09PSBjYWxsZXIpIHx8IHRoaXMucmV0YWluU2VsZWN0ZWQgfHwgYWxsTWF0Y2hpbmdTZWxlY3RlZDtcbiAgfVxuXG4gIHByaXZhdGUgdHJhbnNmb3JtRmlsdGVycyhmaWx0ZXJzKSB7XG4gICAgY29uc3QgZmlsdGVyQXJyYXkgPSBIZWxwZXJzLmNvbnZlcnRUb0FycmF5KGZpbHRlcnMpO1xuICAgIGZpbHRlckFycmF5LmZvckVhY2goKGZpbHRlcikgPT4ge1xuICAgICAgZmlsdGVyLnZhbHVlID1cbiAgICAgICAgZmlsdGVyLnNlbGVjdGVkT3B0aW9uICYmIGZpbHRlci50eXBlXG4gICAgICAgICAgPyBOb3ZvRGF0YVRhYmxlRmlsdGVyVXRpbHMuY29uc3RydWN0RmlsdGVyKGZpbHRlci5zZWxlY3RlZE9wdGlvbiwgZmlsdGVyLnR5cGUpXG4gICAgICAgICAgOiBmaWx0ZXIudmFsdWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIGZpbHRlckFycmF5O1xuICB9XG59XG4iXX0=
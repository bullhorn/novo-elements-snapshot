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
        this.page = 0;
        this.pageSize = undefined;
        this.globalSearch = undefined;
        this.selectedRows = new Map();
        this.expandedRows = new Set();
        this.advancedFilter = undefined;
        this.isForceRefresh = false;
        this.updates = new EventEmitter();
        this.retainSelected = false;
    }
    get userFiltered() {
        return !!(this.filter || this.sort || this.globalSearch || this.outsideFilter || this.advancedFilter);
    }
    get userFilteredInternal() {
        return !!(this.filter || this.sort || this.globalSearch);
    }
    get selected() {
        return Array.from(this.selectedRows.values());
    }
    reset(fireUpdate = true, persistUserFilters) {
        if (!persistUserFilters) {
            this.sort = undefined;
            this.globalSearch = undefined;
            this.filter = undefined;
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
            });
        }
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
        this.sortFilterSource.next({
            sort: this.sort,
            filter: this.filter,
            globalSearch: this.globalSearch,
        });
    }
    setInitialSortFilter(preferences) {
        if (preferences) {
            if (preferences.sort) {
                this.sort = preferences.sort;
            }
            if (preferences.filter) {
                const filters = Helpers.convertToArray(preferences.filter);
                filters.forEach((filter) => {
                    filter.value =
                        filter.selectedOption && filter.type
                            ? NovoDataTableFilterUtils.constructFilter(filter.selectedOption, filter.type)
                            : filter.value;
                });
                this.filter = filters;
            }
            if (preferences.advancedFilter) {
                const advancedFilters = Helpers.convertToArray(preferences.advancedFilter);
                advancedFilters.forEach((filter) => {
                    filter.value =
                        filter.selectedOption && filter.type
                            ? NovoDataTableFilterUtils.constructFilter(filter.selectedOption, filter.type)
                            : filter.value;
                });
                this.advancedFilter = advancedFilters;
            }
            if (preferences.globalSearch) {
                this.globalSearch = preferences.globalSearch;
            }
        }
    }
    checkRetainment(caller, allMatchingSelected = false) {
        this.retainSelected = this.selectionOptions?.some((option) => option.label === caller) || this.retainSelected || allMatchingSelected;
    }
}
DataTableState.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: DataTableState, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
DataTableState.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: DataTableState });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: DataTableState, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1zdGF0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvZGF0YS10YWJsZS9zdGF0ZS9kYXRhLXRhYmxlLXN0YXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFakQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0scUNBQXFDLENBQUM7O0FBRy9FLE1BQU0sT0FBTyxjQUFjO0lBRDNCO1FBRVMsb0JBQWUsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ2hDLHFCQUFnQixHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDakMscUJBQWdCLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNqQyxnQkFBVyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDNUIsaUJBQVksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQzdCLDhCQUF5QixHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDMUMsZUFBVSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFFbEMsU0FBSSxHQUFtQixTQUFTLENBQUM7UUFDakMsV0FBTSxHQUEwQyxTQUFTLENBQUM7UUFDMUQsU0FBSSxHQUFXLENBQUMsQ0FBQztRQUNqQixhQUFRLEdBQVcsU0FBUyxDQUFDO1FBQzdCLGlCQUFZLEdBQVcsU0FBUyxDQUFDO1FBQ2pDLGlCQUFZLEdBQW1CLElBQUksR0FBRyxFQUFhLENBQUM7UUFDcEQsaUJBQVksR0FBZ0IsSUFBSSxHQUFHLEVBQVUsQ0FBQztRQUU5QyxtQkFBYyxHQUF1QixT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QyxJQUFJOzRCQUNsQyxDQUFDLENBQUMsd0JBQXdCLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQzs0QkFDOUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQ3JCLENBQUMsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxjQUFjLEdBQUcsZUFBZSxDQUFDO2FBQ3ZDO1lBRUQsSUFBSSxXQUFXLENBQUMsWUFBWSxFQUFFO2dCQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUM7YUFDOUM7U0FDRjtJQUNILENBQUM7SUFFTSxlQUFlLENBQUMsTUFBYyxFQUFFLG1CQUFtQixHQUFHLEtBQUs7UUFDaEUsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFLLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxjQUFjLElBQUksbUJBQW1CLENBQUM7SUFDdkksQ0FBQzs7MkdBbEtVLGNBQWM7K0dBQWQsY0FBYzsyRkFBZCxjQUFjO2tCQUQxQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvSGVscGVycyc7XG5pbXBvcnQgeyBJRGF0YVRhYmxlQ2hhbmdlRXZlbnQsIElEYXRhVGFibGVGaWx0ZXIsIElEYXRhVGFibGVTZWxlY3Rpb25PcHRpb24sIElEYXRhVGFibGVTb3J0IH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBOb3ZvRGF0YVRhYmxlRmlsdGVyVXRpbHMgfSBmcm9tICcuLi9zZXJ2aWNlcy9kYXRhLXRhYmxlLWZpbHRlci11dGlscyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVTdGF0ZTxUPiB7XG4gIHB1YmxpYyBzZWxlY3Rpb25Tb3VyY2UgPSBuZXcgU3ViamVjdCgpO1xuICBwdWJsaWMgcGFnaW5hdGlvblNvdXJjZSA9IG5ldyBTdWJqZWN0KCk7XG4gIHB1YmxpYyBzb3J0RmlsdGVyU291cmNlID0gbmV3IFN1YmplY3QoKTtcbiAgcHVibGljIHJlc2V0U291cmNlID0gbmV3IFN1YmplY3QoKTtcbiAgcHVibGljIGV4cGFuZFNvdXJjZSA9IG5ldyBTdWJqZWN0KCk7XG4gIHB1YmxpYyBhbGxNYXRjaGluZ1NlbGVjdGVkU291cmNlID0gbmV3IFN1YmplY3QoKTtcbiAgcHVibGljIGRhdGFMb2FkZWQgPSBuZXcgU3ViamVjdCgpO1xuXG4gIHNvcnQ6IElEYXRhVGFibGVTb3J0ID0gdW5kZWZpbmVkO1xuICBmaWx0ZXI6IElEYXRhVGFibGVGaWx0ZXIgfCBJRGF0YVRhYmxlRmlsdGVyW10gPSB1bmRlZmluZWQ7XG4gIHBhZ2U6IG51bWJlciA9IDA7XG4gIHBhZ2VTaXplOiBudW1iZXIgPSB1bmRlZmluZWQ7XG4gIGdsb2JhbFNlYXJjaDogc3RyaW5nID0gdW5kZWZpbmVkO1xuICBzZWxlY3RlZFJvd3M6IE1hcDxzdHJpbmcsIFQ+ID0gbmV3IE1hcDxzdHJpbmcsIFQ+KCk7XG4gIGV4cGFuZGVkUm93czogU2V0PHN0cmluZz4gPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgb3V0c2lkZUZpbHRlcjogYW55O1xuICBhZHZhbmNlZEZpbHRlcjogSURhdGFUYWJsZUZpbHRlcltdID0gdW5kZWZpbmVkO1xuICBpc0ZvcmNlUmVmcmVzaDogYm9vbGVhbiA9IGZhbHNlO1xuICBzZWxlY3Rpb25PcHRpb25zOiBJRGF0YVRhYmxlU2VsZWN0aW9uT3B0aW9uW107XG4gIHVwZGF0ZXM6IEV2ZW50RW1pdHRlcjxJRGF0YVRhYmxlQ2hhbmdlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJRGF0YVRhYmxlQ2hhbmdlRXZlbnQ+KCk7XG4gIHJldGFpblNlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgZ2V0IHVzZXJGaWx0ZXJlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISEodGhpcy5maWx0ZXIgfHwgdGhpcy5zb3J0IHx8IHRoaXMuZ2xvYmFsU2VhcmNoIHx8IHRoaXMub3V0c2lkZUZpbHRlciB8fCB0aGlzLmFkdmFuY2VkRmlsdGVyKTtcbiAgfVxuXG4gIGdldCB1c2VyRmlsdGVyZWRJbnRlcm5hbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISEodGhpcy5maWx0ZXIgfHwgdGhpcy5zb3J0IHx8IHRoaXMuZ2xvYmFsU2VhcmNoKTtcbiAgfVxuXG4gIGdldCBzZWxlY3RlZCgpOiBUW10ge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuc2VsZWN0ZWRSb3dzLnZhbHVlcygpKTtcbiAgfVxuXG4gIHB1YmxpYyByZXNldChmaXJlVXBkYXRlOiBib29sZWFuID0gdHJ1ZSwgcGVyc2lzdFVzZXJGaWx0ZXJzPyk6IHZvaWQge1xuICAgIGlmICghcGVyc2lzdFVzZXJGaWx0ZXJzKSB7XG4gICAgICB0aGlzLnNvcnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmdsb2JhbFNlYXJjaCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZmlsdGVyID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICB0aGlzLnBhZ2UgPSAwO1xuICAgIGlmICghdGhpcy5yZXRhaW5TZWxlY3RlZCkge1xuICAgICAgdGhpcy5zZWxlY3RlZFJvd3MuY2xlYXIoKTtcbiAgICAgIHRoaXMucmVzZXRTb3VyY2UubmV4dCgpO1xuICAgIH1cbiAgICB0aGlzLm9uU29ydEZpbHRlckNoYW5nZSgpO1xuICAgIHRoaXMucmV0YWluU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICBpZiAoZmlyZVVwZGF0ZSkge1xuICAgICAgdGhpcy51cGRhdGVzLmVtaXQoe1xuICAgICAgICBzb3J0OiB0aGlzLnNvcnQsXG4gICAgICAgIGZpbHRlcjogdGhpcy5maWx0ZXIsXG4gICAgICAgIGdsb2JhbFNlYXJjaDogdGhpcy5nbG9iYWxTZWFyY2gsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2xlYXJTb3J0KGZpcmVVcGRhdGU6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgdGhpcy5zb3J0ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMucGFnZSA9IDA7XG4gICAgdGhpcy5jaGVja1JldGFpbm1lbnQoJ3NvcnQnKTtcbiAgICB0aGlzLnJlc2V0KGZpcmVVcGRhdGUsIHRydWUpO1xuICAgIHRoaXMub25Tb3J0RmlsdGVyQ2hhbmdlKCk7XG4gICAgaWYgKGZpcmVVcGRhdGUpIHtcbiAgICAgIHRoaXMudXBkYXRlcy5lbWl0KHtcbiAgICAgICAgc29ydDogdGhpcy5zb3J0LFxuICAgICAgICBmaWx0ZXI6IHRoaXMuZmlsdGVyLFxuICAgICAgICBnbG9iYWxTZWFyY2g6IHRoaXMuZ2xvYmFsU2VhcmNoLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNsZWFyRmlsdGVyKGZpcmVVcGRhdGU6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgdGhpcy5maWx0ZXIgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5nbG9iYWxTZWFyY2ggPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5wYWdlID0gMDtcbiAgICB0aGlzLmNoZWNrUmV0YWlubWVudCgnZmlsdGVyJyk7XG4gICAgdGhpcy5yZXNldChmaXJlVXBkYXRlLCB0cnVlKTtcbiAgICB0aGlzLm9uU29ydEZpbHRlckNoYW5nZSgpO1xuICAgIGlmIChmaXJlVXBkYXRlKSB7XG4gICAgICB0aGlzLnVwZGF0ZXMuZW1pdCh7XG4gICAgICAgIHNvcnQ6IHRoaXMuc29ydCxcbiAgICAgICAgZmlsdGVyOiB0aGlzLmZpbHRlcixcbiAgICAgICAgZ2xvYmFsU2VhcmNoOiB0aGlzLmdsb2JhbFNlYXJjaCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjbGVhclNlbGVjdGVkKGZpcmVVcGRhdGU6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgdGhpcy5hbGxNYXRjaGluZ1NlbGVjdGVkU291cmNlLm5leHQoZmFsc2UpO1xuICAgIHRoaXMuZ2xvYmFsU2VhcmNoID0gdW5kZWZpbmVkO1xuICAgIHRoaXMucGFnZSA9IDA7XG4gICAgdGhpcy5yZXNldChmaXJlVXBkYXRlLCB0cnVlKTtcbiAgICB0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlKCk7XG4gICAgaWYgKGZpcmVVcGRhdGUpIHtcbiAgICAgIHRoaXMudXBkYXRlcy5lbWl0KHtcbiAgICAgICAgc29ydDogdGhpcy5zb3J0LFxuICAgICAgICBmaWx0ZXI6IHRoaXMuZmlsdGVyLFxuICAgICAgICBnbG9iYWxTZWFyY2g6IHRoaXMuZ2xvYmFsU2VhcmNoLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9uU2VsZWN0aW9uQ2hhbmdlKCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0aW9uU291cmNlLm5leHQoKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkV4cGFuZENoYW5nZSh0YXJnZXRJZD86IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuZXhwYW5kU291cmNlLm5leHQodGFyZ2V0SWQpO1xuICB9XG5cbiAgcHVibGljIG9uUGFnaW5hdGlvbkNoYW5nZShpc1BhZ2VTaXplQ2hhbmdlOiBib29sZWFuLCBwYWdlU2l6ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5jaGVja1JldGFpbm1lbnQoJ3BhZ2UnKTtcbiAgICB0aGlzLnBhZ2luYXRpb25Tb3VyY2UubmV4dCh7IGlzUGFnZVNpemVDaGFuZ2UsIHBhZ2VTaXplIH0pO1xuICB9XG5cbiAgcHVibGljIG9uU29ydEZpbHRlckNoYW5nZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNoZWNrUmV0YWlubWVudCgnc29ydCcpO1xuICAgIHRoaXMuY2hlY2tSZXRhaW5tZW50KCdmaWx0ZXInKTtcbiAgICB0aGlzLnNvcnRGaWx0ZXJTb3VyY2UubmV4dCh7XG4gICAgICBzb3J0OiB0aGlzLnNvcnQsXG4gICAgICBmaWx0ZXI6IHRoaXMuZmlsdGVyLFxuICAgICAgZ2xvYmFsU2VhcmNoOiB0aGlzLmdsb2JhbFNlYXJjaCxcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRJbml0aWFsU29ydEZpbHRlcihwcmVmZXJlbmNlcyk6IHZvaWQge1xuICAgIGlmIChwcmVmZXJlbmNlcykge1xuICAgICAgaWYgKHByZWZlcmVuY2VzLnNvcnQpIHtcbiAgICAgICAgdGhpcy5zb3J0ID0gcHJlZmVyZW5jZXMuc29ydDtcbiAgICAgIH1cblxuICAgICAgaWYgKHByZWZlcmVuY2VzLmZpbHRlcikge1xuICAgICAgICBjb25zdCBmaWx0ZXJzID0gSGVscGVycy5jb252ZXJ0VG9BcnJheShwcmVmZXJlbmNlcy5maWx0ZXIpO1xuICAgICAgICBmaWx0ZXJzLmZvckVhY2goKGZpbHRlcikgPT4ge1xuICAgICAgICAgIGZpbHRlci52YWx1ZSA9XG4gICAgICAgICAgICBmaWx0ZXIuc2VsZWN0ZWRPcHRpb24gJiYgZmlsdGVyLnR5cGVcbiAgICAgICAgICAgICAgPyBOb3ZvRGF0YVRhYmxlRmlsdGVyVXRpbHMuY29uc3RydWN0RmlsdGVyKGZpbHRlci5zZWxlY3RlZE9wdGlvbiwgZmlsdGVyLnR5cGUpXG4gICAgICAgICAgICAgIDogZmlsdGVyLnZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5maWx0ZXIgPSBmaWx0ZXJzO1xuICAgICAgfVxuXG4gICAgICBpZiAocHJlZmVyZW5jZXMuYWR2YW5jZWRGaWx0ZXIpIHtcbiAgICAgICAgY29uc3QgYWR2YW5jZWRGaWx0ZXJzID0gSGVscGVycy5jb252ZXJ0VG9BcnJheShwcmVmZXJlbmNlcy5hZHZhbmNlZEZpbHRlcik7XG4gICAgICAgIGFkdmFuY2VkRmlsdGVycy5mb3JFYWNoKChmaWx0ZXIpID0+IHtcbiAgICAgICAgICBmaWx0ZXIudmFsdWUgPVxuICAgICAgICAgICAgZmlsdGVyLnNlbGVjdGVkT3B0aW9uICYmIGZpbHRlci50eXBlXG4gICAgICAgICAgICAgID8gTm92b0RhdGFUYWJsZUZpbHRlclV0aWxzLmNvbnN0cnVjdEZpbHRlcihmaWx0ZXIuc2VsZWN0ZWRPcHRpb24sIGZpbHRlci50eXBlKVxuICAgICAgICAgICAgICA6IGZpbHRlci52YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYWR2YW5jZWRGaWx0ZXIgPSBhZHZhbmNlZEZpbHRlcnM7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcmVmZXJlbmNlcy5nbG9iYWxTZWFyY2gpIHtcbiAgICAgICAgdGhpcy5nbG9iYWxTZWFyY2ggPSBwcmVmZXJlbmNlcy5nbG9iYWxTZWFyY2g7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNoZWNrUmV0YWlubWVudChjYWxsZXI6IHN0cmluZywgYWxsTWF0Y2hpbmdTZWxlY3RlZCA9IGZhbHNlKTogdm9pZCB7XG4gICAgdGhpcy5yZXRhaW5TZWxlY3RlZCA9IHRoaXMuc2VsZWN0aW9uT3B0aW9ucz8uc29tZSgob3B0aW9uKSA9PiBvcHRpb24ubGFiZWwgPT09IGNhbGxlcikgfHwgdGhpcy5yZXRhaW5TZWxlY3RlZCB8fCBhbGxNYXRjaGluZ1NlbGVjdGVkO1xuICB9XG59XG4iXX0=
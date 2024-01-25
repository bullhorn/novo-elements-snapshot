import { Directive } from '@angular/core';
import { Helpers } from 'novo-elements/utils';
import { DataTableState } from '../state/data-table-state.service';
import * as i0 from "@angular/core";
import * as i1 from "../state/data-table-state.service";
export class NovoDataTableSortFilter {
    constructor(state) {
        this.state = state;
    }
    filter(id, type, value, transform, allowMultipleFilters = false, selectedOption) {
        let filter;
        if (allowMultipleFilters) {
            filter = this.resolveMultiFilter(id, type, value, transform, selectedOption);
        }
        else {
            if (!Helpers.isBlank(value)) {
                filter = { id, type, value, transform, ...(selectedOption && { selectedOption }) };
            }
            else {
                filter = undefined;
            }
        }
        this.state.filter = filter;
        this.state.checkRetainment('filter');
        this.state.reset(false, true);
        this.state.updates.next({ filter, sort: this.state.sort });
        this.state.onSortFilterChange();
    }
    sort(id, value, transform) {
        const sort = { id, value, transform };
        this.state.sort = sort;
        this.state.checkRetainment('sort');
        this.state.reset(false, true);
        this.state.updates.next({ sort, filter: this.state.filter });
        this.state.onSortFilterChange();
    }
    resolveMultiFilter(id, type, value, transform, selectedOption) {
        let filter;
        filter = Helpers.convertToArray(this.state.filter);
        const filterIndex = filter.findIndex((aFilter) => aFilter && aFilter.id === id);
        if (filterIndex > -1) {
            filter.splice(filterIndex, 1);
        }
        if (!Helpers.isBlank(value)) {
            filter = [...filter, { id, type, value, transform, ...(selectedOption && { selectedOption }) }];
        }
        if (filter.length < 1) {
            filter = undefined;
        }
        return filter;
    }
}
NovoDataTableSortFilter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoDataTableSortFilter, deps: [{ token: i1.DataTableState }], target: i0.ɵɵFactoryTarget.Directive });
NovoDataTableSortFilter.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: NovoDataTableSortFilter, selector: "[novoDataTableSortFilter]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoDataTableSortFilter, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoDataTableSortFilter]',
                }]
        }], ctorParameters: function () { return [{ type: i1.DataTableState }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC1maWx0ZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvZGF0YS10YWJsZS9zb3J0LWZpbHRlci9zb3J0LWZpbHRlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7QUFLbkUsTUFBTSxPQUFPLHVCQUF1QjtJQUNsQyxZQUFvQixLQUF3QjtRQUF4QixVQUFLLEdBQUwsS0FBSyxDQUFtQjtJQUFHLENBQUM7SUFFekMsTUFBTSxDQUNYLEVBQVUsRUFDVixJQUFZLEVBQ1osS0FBVSxFQUNWLFNBQW1CLEVBQ25CLHVCQUFnQyxLQUFLLEVBQ3JDLGNBQXVCO1FBRXZCLElBQUksTUFBTSxDQUFDO1FBRVgsSUFBSSxvQkFBb0IsRUFBRTtZQUN4QixNQUFNLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQztTQUM5RTthQUFNO1lBQ0wsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzNCLE1BQU0sR0FBRyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxHQUFHLENBQUMsY0FBYyxJQUFJLEVBQUUsY0FBYyxFQUFFLENBQUMsRUFBRSxDQUFDO2FBQ3BGO2lCQUFNO2dCQUNMLE1BQU0sR0FBRyxTQUFTLENBQUM7YUFDcEI7U0FDRjtRQUVELElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFTSxJQUFJLENBQUMsRUFBVSxFQUFFLEtBQWEsRUFBRSxTQUFtQjtRQUN4RCxNQUFNLElBQUksR0FBRyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVNLGtCQUFrQixDQUFDLEVBQVUsRUFBRSxJQUFZLEVBQUUsS0FBVSxFQUFFLFNBQW1CLEVBQUUsY0FBc0I7UUFDekcsSUFBSSxNQUFNLENBQUM7UUFFWCxNQUFNLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRW5ELE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ2hGLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQy9CO1FBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDM0IsTUFBTSxHQUFHLENBQUMsR0FBRyxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsR0FBRyxDQUFDLGNBQWMsSUFBSSxFQUFFLGNBQWMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2pHO1FBRUQsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNyQixNQUFNLEdBQUcsU0FBUyxDQUFDO1NBQ3BCO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7cUhBMURVLHVCQUF1Qjt5R0FBdkIsdUJBQXVCOzRGQUF2Qix1QkFBdUI7a0JBSG5DLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtpQkFDdEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhlbHBlcnMgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcbmltcG9ydCB7IERhdGFUYWJsZVN0YXRlIH0gZnJvbSAnLi4vc3RhdGUvZGF0YS10YWJsZS1zdGF0ZS5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25vdm9EYXRhVGFibGVTb3J0RmlsdGVyXScsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9EYXRhVGFibGVTb3J0RmlsdGVyPFQ+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdGF0ZTogRGF0YVRhYmxlU3RhdGU8VD4pIHt9XG5cbiAgcHVibGljIGZpbHRlcihcbiAgICBpZDogc3RyaW5nLFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICB2YWx1ZTogYW55LFxuICAgIHRyYW5zZm9ybTogRnVuY3Rpb24sXG4gICAgYWxsb3dNdWx0aXBsZUZpbHRlcnM6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICBzZWxlY3RlZE9wdGlvbj86IE9iamVjdCxcbiAgKTogdm9pZCB7XG4gICAgbGV0IGZpbHRlcjtcblxuICAgIGlmIChhbGxvd011bHRpcGxlRmlsdGVycykge1xuICAgICAgZmlsdGVyID0gdGhpcy5yZXNvbHZlTXVsdGlGaWx0ZXIoaWQsIHR5cGUsIHZhbHVlLCB0cmFuc2Zvcm0sIHNlbGVjdGVkT3B0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFIZWxwZXJzLmlzQmxhbmsodmFsdWUpKSB7XG4gICAgICAgIGZpbHRlciA9IHsgaWQsIHR5cGUsIHZhbHVlLCB0cmFuc2Zvcm0sIC4uLihzZWxlY3RlZE9wdGlvbiAmJiB7IHNlbGVjdGVkT3B0aW9uIH0pIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmaWx0ZXIgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zdGF0ZS5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgdGhpcy5zdGF0ZS5jaGVja1JldGFpbm1lbnQoJ2ZpbHRlcicpO1xuICAgIHRoaXMuc3RhdGUucmVzZXQoZmFsc2UsIHRydWUpO1xuICAgIHRoaXMuc3RhdGUudXBkYXRlcy5uZXh0KHsgZmlsdGVyLCBzb3J0OiB0aGlzLnN0YXRlLnNvcnQgfSk7XG4gICAgdGhpcy5zdGF0ZS5vblNvcnRGaWx0ZXJDaGFuZ2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBzb3J0KGlkOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIHRyYW5zZm9ybTogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICBjb25zdCBzb3J0ID0geyBpZCwgdmFsdWUsIHRyYW5zZm9ybSB9O1xuICAgIHRoaXMuc3RhdGUuc29ydCA9IHNvcnQ7XG4gICAgdGhpcy5zdGF0ZS5jaGVja1JldGFpbm1lbnQoJ3NvcnQnKTtcbiAgICB0aGlzLnN0YXRlLnJlc2V0KGZhbHNlLCB0cnVlKTtcbiAgICB0aGlzLnN0YXRlLnVwZGF0ZXMubmV4dCh7IHNvcnQsIGZpbHRlcjogdGhpcy5zdGF0ZS5maWx0ZXIgfSk7XG4gICAgdGhpcy5zdGF0ZS5vblNvcnRGaWx0ZXJDaGFuZ2UoKTtcbiAgfVxuXG4gIHB1YmxpYyByZXNvbHZlTXVsdGlGaWx0ZXIoaWQ6IHN0cmluZywgdHlwZTogc3RyaW5nLCB2YWx1ZTogYW55LCB0cmFuc2Zvcm06IEZ1bmN0aW9uLCBzZWxlY3RlZE9wdGlvbjogT2JqZWN0KSB7XG4gICAgbGV0IGZpbHRlcjtcblxuICAgIGZpbHRlciA9IEhlbHBlcnMuY29udmVydFRvQXJyYXkodGhpcy5zdGF0ZS5maWx0ZXIpO1xuXG4gICAgY29uc3QgZmlsdGVySW5kZXggPSBmaWx0ZXIuZmluZEluZGV4KChhRmlsdGVyKSA9PiBhRmlsdGVyICYmIGFGaWx0ZXIuaWQgPT09IGlkKTtcbiAgICBpZiAoZmlsdGVySW5kZXggPiAtMSkge1xuICAgICAgZmlsdGVyLnNwbGljZShmaWx0ZXJJbmRleCwgMSk7XG4gICAgfVxuXG4gICAgaWYgKCFIZWxwZXJzLmlzQmxhbmsodmFsdWUpKSB7XG4gICAgICBmaWx0ZXIgPSBbLi4uZmlsdGVyLCB7IGlkLCB0eXBlLCB2YWx1ZSwgdHJhbnNmb3JtLCAuLi4oc2VsZWN0ZWRPcHRpb24gJiYgeyBzZWxlY3RlZE9wdGlvbiB9KSB9XTtcbiAgICB9XG5cbiAgICBpZiAoZmlsdGVyLmxlbmd0aCA8IDEpIHtcbiAgICAgIGZpbHRlciA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gZmlsdGVyO1xuICB9XG59XG4iXX0=
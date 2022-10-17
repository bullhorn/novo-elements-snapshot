import { Directive } from '@angular/core';
import { DataTableState } from '../state/data-table-state.service';
import { Helpers } from 'novo-elements/utils';
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
NovoDataTableSortFilter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDataTableSortFilter, deps: [{ token: i1.DataTableState }], target: i0.ɵɵFactoryTarget.Directive });
NovoDataTableSortFilter.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoDataTableSortFilter, selector: "[novoDataTableSortFilter]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDataTableSortFilter, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoDataTableSortFilter]',
                }]
        }], ctorParameters: function () { return [{ type: i1.DataTableState }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC1maWx0ZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy9kYXRhLXRhYmxlL3NvcnQtZmlsdGVyL3NvcnQtZmlsdGVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNuRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7OztBQUs5QyxNQUFNLE9BQU8sdUJBQXVCO0lBQ2xDLFlBQW9CLEtBQXdCO1FBQXhCLFVBQUssR0FBTCxLQUFLLENBQW1CO0lBQUcsQ0FBQztJQUV6QyxNQUFNLENBQ1gsRUFBVSxFQUNWLElBQVksRUFDWixLQUFVLEVBQ1YsU0FBbUIsRUFDbkIsdUJBQWdDLEtBQUssRUFDckMsY0FBdUI7UUFFdkIsSUFBSSxNQUFNLENBQUM7UUFFWCxJQUFJLG9CQUFvQixFQUFFO1lBQ3hCLE1BQU0sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1NBQzlFO2FBQU07WUFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDM0IsTUFBTSxHQUFHLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEdBQUcsQ0FBQyxjQUFjLElBQUksRUFBRSxjQUFjLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDcEY7aUJBQU07Z0JBQ0wsTUFBTSxHQUFHLFNBQVMsQ0FBQzthQUNwQjtTQUNGO1FBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVNLElBQUksQ0FBQyxFQUFVLEVBQUUsS0FBYSxFQUFFLFNBQW1CO1FBQ3hELE1BQU0sSUFBSSxHQUFHLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRU0sa0JBQWtCLENBQUMsRUFBVSxFQUFFLElBQVksRUFBRSxLQUFVLEVBQUUsU0FBbUIsRUFBRSxjQUFzQjtRQUN6RyxJQUFJLE1BQU0sQ0FBQztRQUVYLE1BQU0sR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFbkQsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDaEYsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDcEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDL0I7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMzQixNQUFNLEdBQUcsQ0FBQyxHQUFHLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxHQUFHLENBQUMsY0FBYyxJQUFJLEVBQUUsY0FBYyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDakc7UUFFRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3JCLE1BQU0sR0FBRyxTQUFTLENBQUM7U0FDcEI7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOztxSEExRFUsdUJBQXVCO3lHQUF2Qix1QkFBdUI7NEZBQXZCLHVCQUF1QjtrQkFIbkMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsMkJBQTJCO2lCQUN0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YVRhYmxlU3RhdGUgfSBmcm9tICcuLi9zdGF0ZS9kYXRhLXRhYmxlLXN0YXRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbm92b0RhdGFUYWJsZVNvcnRGaWx0ZXJdJyxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0RhdGFUYWJsZVNvcnRGaWx0ZXI8VD4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0YXRlOiBEYXRhVGFibGVTdGF0ZTxUPikge31cblxuICBwdWJsaWMgZmlsdGVyKFxuICAgIGlkOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIHZhbHVlOiBhbnksXG4gICAgdHJhbnNmb3JtOiBGdW5jdGlvbixcbiAgICBhbGxvd011bHRpcGxlRmlsdGVyczogYm9vbGVhbiA9IGZhbHNlLFxuICAgIHNlbGVjdGVkT3B0aW9uPzogT2JqZWN0LFxuICApOiB2b2lkIHtcbiAgICBsZXQgZmlsdGVyO1xuXG4gICAgaWYgKGFsbG93TXVsdGlwbGVGaWx0ZXJzKSB7XG4gICAgICBmaWx0ZXIgPSB0aGlzLnJlc29sdmVNdWx0aUZpbHRlcihpZCwgdHlwZSwgdmFsdWUsIHRyYW5zZm9ybSwgc2VsZWN0ZWRPcHRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIUhlbHBlcnMuaXNCbGFuayh2YWx1ZSkpIHtcbiAgICAgICAgZmlsdGVyID0geyBpZCwgdHlwZSwgdmFsdWUsIHRyYW5zZm9ybSwgLi4uKHNlbGVjdGVkT3B0aW9uICYmIHsgc2VsZWN0ZWRPcHRpb24gfSkgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZpbHRlciA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnN0YXRlLmZpbHRlciA9IGZpbHRlcjtcbiAgICB0aGlzLnN0YXRlLmNoZWNrUmV0YWlubWVudCgnZmlsdGVyJyk7XG4gICAgdGhpcy5zdGF0ZS5yZXNldChmYWxzZSwgdHJ1ZSk7XG4gICAgdGhpcy5zdGF0ZS51cGRhdGVzLm5leHQoeyBmaWx0ZXIsIHNvcnQ6IHRoaXMuc3RhdGUuc29ydCB9KTtcbiAgICB0aGlzLnN0YXRlLm9uU29ydEZpbHRlckNoYW5nZSgpO1xuICB9XG5cbiAgcHVibGljIHNvcnQoaWQ6IHN0cmluZywgdmFsdWU6IHN0cmluZywgdHJhbnNmb3JtOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIGNvbnN0IHNvcnQgPSB7IGlkLCB2YWx1ZSwgdHJhbnNmb3JtIH07XG4gICAgdGhpcy5zdGF0ZS5zb3J0ID0gc29ydDtcbiAgICB0aGlzLnN0YXRlLmNoZWNrUmV0YWlubWVudCgnc29ydCcpO1xuICAgIHRoaXMuc3RhdGUucmVzZXQoZmFsc2UsIHRydWUpO1xuICAgIHRoaXMuc3RhdGUudXBkYXRlcy5uZXh0KHsgc29ydCwgZmlsdGVyOiB0aGlzLnN0YXRlLmZpbHRlciB9KTtcbiAgICB0aGlzLnN0YXRlLm9uU29ydEZpbHRlckNoYW5nZSgpO1xuICB9XG5cbiAgcHVibGljIHJlc29sdmVNdWx0aUZpbHRlcihpZDogc3RyaW5nLCB0eXBlOiBzdHJpbmcsIHZhbHVlOiBhbnksIHRyYW5zZm9ybTogRnVuY3Rpb24sIHNlbGVjdGVkT3B0aW9uOiBPYmplY3QpIHtcbiAgICBsZXQgZmlsdGVyO1xuXG4gICAgZmlsdGVyID0gSGVscGVycy5jb252ZXJ0VG9BcnJheSh0aGlzLnN0YXRlLmZpbHRlcik7XG5cbiAgICBjb25zdCBmaWx0ZXJJbmRleCA9IGZpbHRlci5maW5kSW5kZXgoKGFGaWx0ZXIpID0+IGFGaWx0ZXIgJiYgYUZpbHRlci5pZCA9PT0gaWQpO1xuICAgIGlmIChmaWx0ZXJJbmRleCA+IC0xKSB7XG4gICAgICBmaWx0ZXIuc3BsaWNlKGZpbHRlckluZGV4LCAxKTtcbiAgICB9XG5cbiAgICBpZiAoIUhlbHBlcnMuaXNCbGFuayh2YWx1ZSkpIHtcbiAgICAgIGZpbHRlciA9IFsuLi5maWx0ZXIsIHsgaWQsIHR5cGUsIHZhbHVlLCB0cmFuc2Zvcm0sIC4uLihzZWxlY3RlZE9wdGlvbiAmJiB7IHNlbGVjdGVkT3B0aW9uIH0pIH1dO1xuICAgIH1cblxuICAgIGlmIChmaWx0ZXIubGVuZ3RoIDwgMSkge1xuICAgICAgZmlsdGVyID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiBmaWx0ZXI7XG4gIH1cbn1cbiJdfQ==
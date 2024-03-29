import { Directive } from '@angular/core';
import { Helpers } from '../../../utils/Helpers';
import { DataTableState } from '../state/data-table-state.service';
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
                filter = Object.assign({ id, type, value, transform }, (selectedOption && { selectedOption }));
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
            filter = [...filter, Object.assign({ id, type, value, transform }, (selectedOption && { selectedOption }))];
        }
        if (filter.length < 1) {
            filter = undefined;
        }
        return filter;
    }
}
NovoDataTableSortFilter.decorators = [
    { type: Directive, args: [{
                selector: '[novoDataTableSortFilter]',
            },] }
];
NovoDataTableSortFilter.ctorParameters = () => [
    { type: DataTableState }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC1maWx0ZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL2RhdGEtdGFibGUvc29ydC1maWx0ZXIvc29ydC1maWx0ZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUtuRSxNQUFNLE9BQU8sdUJBQXVCO0lBQ2xDLFlBQW9CLEtBQXdCO1FBQXhCLFVBQUssR0FBTCxLQUFLLENBQW1CO0lBQUcsQ0FBQztJQUV6QyxNQUFNLENBQ1gsRUFBVSxFQUNWLElBQVksRUFDWixLQUFVLEVBQ1YsU0FBbUIsRUFDbkIsdUJBQWdDLEtBQUssRUFDckMsY0FBdUI7UUFFdkIsSUFBSSxNQUFNLENBQUM7UUFFWCxJQUFJLG9CQUFvQixFQUFFO1lBQ3hCLE1BQU0sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1NBQzlFO2FBQU07WUFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDM0IsTUFBTSxtQkFBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLElBQUssQ0FBQyxjQUFjLElBQUksRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFFLENBQUM7YUFDcEY7aUJBQU07Z0JBQ0wsTUFBTSxHQUFHLFNBQVMsQ0FBQzthQUNwQjtTQUNGO1FBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVNLElBQUksQ0FBQyxFQUFVLEVBQUUsS0FBYSxFQUFFLFNBQW1CO1FBQ3hELE1BQU0sSUFBSSxHQUFHLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRU0sa0JBQWtCLENBQUMsRUFBVSxFQUFFLElBQVksRUFBRSxLQUFVLEVBQUUsU0FBbUIsRUFBRSxjQUFzQjtRQUN6RyxJQUFJLE1BQU0sQ0FBQztRQUVYLE1BQU0sR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFbkQsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDaEYsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDcEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDL0I7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMzQixNQUFNLEdBQUcsQ0FBQyxHQUFHLE1BQU0sa0JBQUksRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxJQUFLLENBQUMsY0FBYyxJQUFJLEVBQUUsY0FBYyxFQUFFLENBQUMsRUFBRyxDQUFDO1NBQ2pHO1FBRUQsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNyQixNQUFNLEdBQUcsU0FBUyxDQUFDO1NBQ3BCO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7O1lBN0RGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsMkJBQTJCO2FBQ3RDOzs7WUFKUSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvSGVscGVycyc7XG5pbXBvcnQgeyBEYXRhVGFibGVTdGF0ZSB9IGZyb20gJy4uL3N0YXRlL2RhdGEtdGFibGUtc3RhdGUuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tub3ZvRGF0YVRhYmxlU29ydEZpbHRlcl0nLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRGF0YVRhYmxlU29ydEZpbHRlcjxUPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RhdGU6IERhdGFUYWJsZVN0YXRlPFQ+KSB7fVxuXG4gIHB1YmxpYyBmaWx0ZXIoXG4gICAgaWQ6IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgdmFsdWU6IGFueSxcbiAgICB0cmFuc2Zvcm06IEZ1bmN0aW9uLFxuICAgIGFsbG93TXVsdGlwbGVGaWx0ZXJzOiBib29sZWFuID0gZmFsc2UsXG4gICAgc2VsZWN0ZWRPcHRpb24/OiBPYmplY3QsXG4gICk6IHZvaWQge1xuICAgIGxldCBmaWx0ZXI7XG5cbiAgICBpZiAoYWxsb3dNdWx0aXBsZUZpbHRlcnMpIHtcbiAgICAgIGZpbHRlciA9IHRoaXMucmVzb2x2ZU11bHRpRmlsdGVyKGlkLCB0eXBlLCB2YWx1ZSwgdHJhbnNmb3JtLCBzZWxlY3RlZE9wdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghSGVscGVycy5pc0JsYW5rKHZhbHVlKSkge1xuICAgICAgICBmaWx0ZXIgPSB7IGlkLCB0eXBlLCB2YWx1ZSwgdHJhbnNmb3JtLCAuLi4oc2VsZWN0ZWRPcHRpb24gJiYgeyBzZWxlY3RlZE9wdGlvbiB9KSB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmlsdGVyID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc3RhdGUuZmlsdGVyID0gZmlsdGVyO1xuICAgIHRoaXMuc3RhdGUuY2hlY2tSZXRhaW5tZW50KCdmaWx0ZXInKTtcbiAgICB0aGlzLnN0YXRlLnJlc2V0KGZhbHNlLCB0cnVlKTtcbiAgICB0aGlzLnN0YXRlLnVwZGF0ZXMubmV4dCh7IGZpbHRlciwgc29ydDogdGhpcy5zdGF0ZS5zb3J0IH0pO1xuICAgIHRoaXMuc3RhdGUub25Tb3J0RmlsdGVyQ2hhbmdlKCk7XG4gIH1cblxuICBwdWJsaWMgc29ydChpZDogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCB0cmFuc2Zvcm06IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgY29uc3Qgc29ydCA9IHsgaWQsIHZhbHVlLCB0cmFuc2Zvcm0gfTtcbiAgICB0aGlzLnN0YXRlLnNvcnQgPSBzb3J0O1xuICAgIHRoaXMuc3RhdGUuY2hlY2tSZXRhaW5tZW50KCdzb3J0Jyk7XG4gICAgdGhpcy5zdGF0ZS5yZXNldChmYWxzZSwgdHJ1ZSk7XG4gICAgdGhpcy5zdGF0ZS51cGRhdGVzLm5leHQoeyBzb3J0LCBmaWx0ZXI6IHRoaXMuc3RhdGUuZmlsdGVyIH0pO1xuICAgIHRoaXMuc3RhdGUub25Tb3J0RmlsdGVyQ2hhbmdlKCk7XG4gIH1cblxuICBwdWJsaWMgcmVzb2x2ZU11bHRpRmlsdGVyKGlkOiBzdHJpbmcsIHR5cGU6IHN0cmluZywgdmFsdWU6IGFueSwgdHJhbnNmb3JtOiBGdW5jdGlvbiwgc2VsZWN0ZWRPcHRpb246IE9iamVjdCkge1xuICAgIGxldCBmaWx0ZXI7XG5cbiAgICBmaWx0ZXIgPSBIZWxwZXJzLmNvbnZlcnRUb0FycmF5KHRoaXMuc3RhdGUuZmlsdGVyKTtcblxuICAgIGNvbnN0IGZpbHRlckluZGV4ID0gZmlsdGVyLmZpbmRJbmRleCgoYUZpbHRlcikgPT4gYUZpbHRlciAmJiBhRmlsdGVyLmlkID09PSBpZCk7XG4gICAgaWYgKGZpbHRlckluZGV4ID4gLTEpIHtcbiAgICAgIGZpbHRlci5zcGxpY2UoZmlsdGVySW5kZXgsIDEpO1xuICAgIH1cblxuICAgIGlmICghSGVscGVycy5pc0JsYW5rKHZhbHVlKSkge1xuICAgICAgZmlsdGVyID0gWy4uLmZpbHRlciwgeyBpZCwgdHlwZSwgdmFsdWUsIHRyYW5zZm9ybSwgLi4uKHNlbGVjdGVkT3B0aW9uICYmIHsgc2VsZWN0ZWRPcHRpb24gfSkgfV07XG4gICAgfVxuXG4gICAgaWYgKGZpbHRlci5sZW5ndGggPCAxKSB7XG4gICAgICBmaWx0ZXIgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpbHRlcjtcbiAgfVxufVxuIl19
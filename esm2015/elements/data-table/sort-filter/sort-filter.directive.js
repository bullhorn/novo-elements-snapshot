import { Directive } from '@angular/core';
import { Helpers } from '../../../utils/Helpers';
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
                filter = Object.assign({ id, type, value, transform }, (selectedOption && { selectedOption }));
            }
            else {
                filter = undefined;
            }
        }
        this.state.filter = filter;
        this.state.reset(false, true);
        this.state.updates.next({ filter, sort: this.state.sort });
        this.state.onSortFilterChange();
    }
    sort(id, value, transform) {
        const sort = { id, value, transform };
        this.state.sort = sort;
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
NovoDataTableSortFilter.ɵfac = function NovoDataTableSortFilter_Factory(t) { return new (t || NovoDataTableSortFilter)(i0.ɵɵdirectiveInject(i1.DataTableState)); };
NovoDataTableSortFilter.ɵdir = i0.ɵɵdefineDirective({ type: NovoDataTableSortFilter, selectors: [["", "novoDataTableSortFilter", ""]] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoDataTableSortFilter, [{
        type: Directive,
        args: [{
                selector: '[novoDataTableSortFilter]',
            }]
    }], function () { return [{ type: i1.DataTableState }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC1maWx0ZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2RhdGEtdGFibGUvc29ydC1maWx0ZXIvc29ydC1maWx0ZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7O0FBS25FLE1BQU0sT0FBTyx1QkFBdUI7SUFDbEMsWUFBb0IsS0FBd0I7UUFBeEIsVUFBSyxHQUFMLEtBQUssQ0FBbUI7SUFBRyxDQUFDO0lBRXpDLE1BQU0sQ0FDWCxFQUFVLEVBQ1YsSUFBWSxFQUNaLEtBQVUsRUFDVixTQUFtQixFQUNuQix1QkFBZ0MsS0FBSyxFQUNyQyxjQUF1QjtRQUV2QixJQUFJLE1BQU0sQ0FBQztRQUVYLElBQUksb0JBQW9CLEVBQUU7WUFDeEIsTUFBTSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7U0FDOUU7YUFBTTtZQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUMzQixNQUFNLG1CQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsSUFBSyxDQUFDLGNBQWMsSUFBSSxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUUsQ0FBQzthQUNwRjtpQkFBTTtnQkFDTCxNQUFNLEdBQUcsU0FBUyxDQUFDO2FBQ3BCO1NBQ0Y7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRU0sSUFBSSxDQUFDLEVBQVUsRUFBRSxLQUFhLEVBQUUsU0FBbUI7UUFDeEQsTUFBTSxJQUFJLEdBQUcsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFTSxrQkFBa0IsQ0FBQyxFQUFVLEVBQUUsSUFBWSxFQUFFLEtBQVUsRUFBRSxTQUFtQixFQUFFLGNBQXNCO1FBQ3pHLElBQUksTUFBTSxDQUFDO1FBRVgsTUFBTSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVuRCxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNoRixJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNwQixNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMvQjtRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzNCLE1BQU0sR0FBRyxDQUFDLEdBQUcsTUFBTSxrQkFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLElBQUssQ0FBQyxjQUFjLElBQUksRUFBRSxjQUFjLEVBQUUsQ0FBQyxFQUFHLENBQUM7U0FDakc7UUFFRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3JCLE1BQU0sR0FBRyxTQUFTLENBQUM7U0FDcEI7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOzs4RkF4RFUsdUJBQXVCOzREQUF2Qix1QkFBdUI7a0RBQXZCLHVCQUF1QjtjQUhuQyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjthQUN0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL0hlbHBlcnMnO1xuaW1wb3J0IHsgRGF0YVRhYmxlU3RhdGUgfSBmcm9tICcuLi9zdGF0ZS9kYXRhLXRhYmxlLXN0YXRlLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbm92b0RhdGFUYWJsZVNvcnRGaWx0ZXJdJyxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0RhdGFUYWJsZVNvcnRGaWx0ZXI8VD4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0YXRlOiBEYXRhVGFibGVTdGF0ZTxUPikge31cblxuICBwdWJsaWMgZmlsdGVyKFxuICAgIGlkOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIHZhbHVlOiBhbnksXG4gICAgdHJhbnNmb3JtOiBGdW5jdGlvbixcbiAgICBhbGxvd011bHRpcGxlRmlsdGVyczogYm9vbGVhbiA9IGZhbHNlLFxuICAgIHNlbGVjdGVkT3B0aW9uPzogT2JqZWN0LFxuICApOiB2b2lkIHtcbiAgICBsZXQgZmlsdGVyO1xuXG4gICAgaWYgKGFsbG93TXVsdGlwbGVGaWx0ZXJzKSB7XG4gICAgICBmaWx0ZXIgPSB0aGlzLnJlc29sdmVNdWx0aUZpbHRlcihpZCwgdHlwZSwgdmFsdWUsIHRyYW5zZm9ybSwgc2VsZWN0ZWRPcHRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIUhlbHBlcnMuaXNCbGFuayh2YWx1ZSkpIHtcbiAgICAgICAgZmlsdGVyID0geyBpZCwgdHlwZSwgdmFsdWUsIHRyYW5zZm9ybSwgLi4uKHNlbGVjdGVkT3B0aW9uICYmIHsgc2VsZWN0ZWRPcHRpb24gfSkgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZpbHRlciA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnN0YXRlLmZpbHRlciA9IGZpbHRlcjtcbiAgICB0aGlzLnN0YXRlLnJlc2V0KGZhbHNlLCB0cnVlKTtcbiAgICB0aGlzLnN0YXRlLnVwZGF0ZXMubmV4dCh7IGZpbHRlciwgc29ydDogdGhpcy5zdGF0ZS5zb3J0IH0pO1xuICAgIHRoaXMuc3RhdGUub25Tb3J0RmlsdGVyQ2hhbmdlKCk7XG4gIH1cblxuICBwdWJsaWMgc29ydChpZDogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCB0cmFuc2Zvcm06IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgY29uc3Qgc29ydCA9IHsgaWQsIHZhbHVlLCB0cmFuc2Zvcm0gfTtcbiAgICB0aGlzLnN0YXRlLnNvcnQgPSBzb3J0O1xuICAgIHRoaXMuc3RhdGUucmVzZXQoZmFsc2UsIHRydWUpO1xuICAgIHRoaXMuc3RhdGUudXBkYXRlcy5uZXh0KHsgc29ydCwgZmlsdGVyOiB0aGlzLnN0YXRlLmZpbHRlciB9KTtcbiAgICB0aGlzLnN0YXRlLm9uU29ydEZpbHRlckNoYW5nZSgpO1xuICB9XG5cbiAgcHVibGljIHJlc29sdmVNdWx0aUZpbHRlcihpZDogc3RyaW5nLCB0eXBlOiBzdHJpbmcsIHZhbHVlOiBhbnksIHRyYW5zZm9ybTogRnVuY3Rpb24sIHNlbGVjdGVkT3B0aW9uOiBPYmplY3QpIHtcbiAgICBsZXQgZmlsdGVyO1xuXG4gICAgZmlsdGVyID0gSGVscGVycy5jb252ZXJ0VG9BcnJheSh0aGlzLnN0YXRlLmZpbHRlcik7XG5cbiAgICBjb25zdCBmaWx0ZXJJbmRleCA9IGZpbHRlci5maW5kSW5kZXgoKGFGaWx0ZXIpID0+IGFGaWx0ZXIgJiYgYUZpbHRlci5pZCA9PT0gaWQpO1xuICAgIGlmIChmaWx0ZXJJbmRleCA+IC0xKSB7XG4gICAgICBmaWx0ZXIuc3BsaWNlKGZpbHRlckluZGV4LCAxKTtcbiAgICB9XG5cbiAgICBpZiAoIUhlbHBlcnMuaXNCbGFuayh2YWx1ZSkpIHtcbiAgICAgIGZpbHRlciA9IFsuLi5maWx0ZXIsIHsgaWQsIHR5cGUsIHZhbHVlLCB0cmFuc2Zvcm0sIC4uLihzZWxlY3RlZE9wdGlvbiAmJiB7IHNlbGVjdGVkT3B0aW9uIH0pIH1dO1xuICAgIH1cblxuICAgIGlmIChmaWx0ZXIubGVuZ3RoIDwgMSkge1xuICAgICAgZmlsdGVyID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiBmaWx0ZXI7XG4gIH1cbn1cbiJdfQ==
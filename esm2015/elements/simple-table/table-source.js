import { DataSource } from '@angular/cdk/table';
import { merge, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Helpers } from '../../utils/Helpers';
export class RemoteActivityTableService {
}
export class StaticActivityTableService {
    constructor(data = []) {
        this.data = data;
    }
    getTableResults(sort, filter, page = 0, pageSize, globalSearch, outsideFilter) {
        let ret = Helpers.deepClone(this.data);
        if (ret.length !== 0) {
            if (globalSearch) {
                ret = ret.filter((item) => Object.keys(item).some((key) => `${item[key]}`.toLowerCase().includes(globalSearch.toLowerCase())));
            }
            if (filter) {
                const value = Helpers.isString(filter.value) ? filter.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : filter.value;
                ret = ret.filter(Helpers.filterByField(filter.id, value));
            }
            if (sort) {
                ret = ret.sort(Helpers.sortByField(sort.id, sort.value === 'desc'));
            }
            if (!Helpers.isBlank(page) && !Helpers.isBlank(pageSize)) {
                ret = ret.slice(page * pageSize, (page + 1) * pageSize);
            }
        }
        return of({ results: ret, total: this.data.length });
    }
}
export class ActivityTableDataSource extends DataSource {
    constructor(tableService, state, ref) {
        super();
        this.tableService = tableService;
        this.state = state;
        this.ref = ref;
        this.total = 0;
        this.current = 0;
        this.loading = false;
        this.pristine = true;
    }
    get totallyEmpty() {
        return this.total === 0;
    }
    get currentlyEmpty() {
        return this.current === 0;
    }
    connect() {
        const displayDataChanges = [this.state.updates];
        return merge(...displayDataChanges).pipe(startWith(null), switchMap(() => {
            this.pristine = false;
            this.loading = true;
            return this.tableService.getTableResults(this.state.sort, this.state.filter, this.state.page, this.state.pageSize, this.state.globalSearch, this.state.outsideFilter);
        }), map((data) => {
            this.loading = false;
            this.total = data.total;
            this.current = data.results.length;
            setTimeout(() => {
                this.ref.markForCheck();
            });
            return data.results;
        }), catchError((error) => {
            console.error(error); // tslint: disable-line
            this.loading = false;
            return of(null);
        }));
    }
    disconnect() { }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtc291cmNlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3RyYXZpcy9idWlsZC9idWxsaG9ybi9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvc2ltcGxlLXRhYmxlL3RhYmxlLXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFaEQsT0FBTyxFQUFFLEtBQUssRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQWM5QyxNQUFNLE9BQWdCLDBCQUEwQjtDQVMvQztBQUVELE1BQU0sT0FBTywwQkFBMEI7SUFDckMsWUFBb0IsT0FBWSxFQUFFO1FBQWQsU0FBSSxHQUFKLElBQUksQ0FBVTtJQUFHLENBQUM7SUFFL0IsZUFBZSxDQUNwQixJQUF5RCxFQUN6RCxNQUEyRCxFQUMzRCxPQUFlLENBQUMsRUFDaEIsUUFBZ0IsRUFDaEIsWUFBcUIsRUFDckIsYUFBbUI7UUFFbkIsSUFBSSxHQUFHLEdBQVEsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUMsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNwQixJQUFJLFlBQVksRUFBRTtnQkFDaEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFdB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Q0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ25DLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN0QixDQUFDLENBQUMsRUFDRixVQUFVLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNuQixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsdUJBQXVCO1lBQzdDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRU0sVUFBVSxLQUFVLENBQUM7Q0FDN0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtZXJnZSwgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCwgc3RhcnRXaXRoLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vdXRpbHMvSGVscGVycyc7XG5pbXBvcnQgeyBOb3ZvQWN0aXZpdHlUYWJsZVN0YXRlIH0gZnJvbSAnLi9zdGF0ZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWN0aXZpdHlUYWJsZVNlcnZpY2U8VD4ge1xuICBnZXRUYWJsZVJlc3VsdHMoXG4gICAgc29ydDogeyBpZDogc3RyaW5nOyB2YWx1ZTogc3RyaW5nOyB0cmFuc2Zvcm0/OiBGdW5jdGlvbiB9LFxuICAgIGZpbHRlcjogeyBpZDogc3RyaW5nOyB2YWx1ZTogc3RyaW5nOyB0cmFuc2Zvcm0/OiBGdW5jdGlvbiB9LFxuICAgIHBhZ2U6IG51bWJlcixcbiAgICBwYWdlU2l6ZTogbnVtYmVyLFxuICAgIGdsb2JhbFNlYXJjaD86IHN0cmluZyxcbiAgICBvdXRzaWRlRmlsdGVyPzogYW55LFxuICApOiBPYnNlcnZhYmxlPHsgcmVzdWx0czogVFtdOyB0b3RhbDogbnVtYmVyIH0+O1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVtb3RlQWN0aXZpdHlUYWJsZVNlcnZpY2U8VD4gaW1wbGVtZW50cyBBY3Rpdml0eVRhYmxlU2VydmljZTxUPiB7XG4gIGFic3RyYWN0IGdldFRhYmxlUmVzdWx0cyhcbiAgICBzb3J0OiB7IGlkOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmc7IHRyYW5zZm9ybT86IEZ1bmN0aW9uIH0sXG4gICAgZmlsdGVyOiB7IGlkOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmc7IHRyYW5zZm9ybT86IEZ1bmN0aW9uIH0sXG4gICAgcGFnZTogbnVtYmVyLFxuICAgIHBhZ2VTaXplOiBudW1iZXIsXG4gICAgZ2xvYmFsU2VhcmNoPzogc3RyaW5nLFxuICAgIG91dHNpZGVGaWx0ZXI/OiBhbnksXG4gICk6IE9ic2VydmFibGU8eyByZXN1bHRzOiBUW107IHRvdGFsOiBudW1iZXIgfT47XG59XG5cbmV4cG9ydCBjbGFzcyBTdGF0aWNBY3Rpdml0eVRhYmxlU2VydmljZTxUPiBpbXBsZW1lbnRzIEFjdGl2aXR5VGFibGVTZXJ2aWNlPFQ+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhOiBUW10gPSBbXSkge31cblxuICBwdWJsaWMgZ2V0VGFibGVSZXN1bHRzKFxuICAgIHNvcnQ6IHsgaWQ6IHN0cmluZzsgdmFsdWU6IHN0cmluZzsgdHJhbnNmb3JtPzogRnVuY3Rpb24gfSxcbiAgICBmaWx0ZXI6IHsgaWQ6IHN0cmluZzsgdmFsdWU6IHN0cmluZzsgdHJhbnNmb3JtPzogRnVuY3Rpb24gfSxcbiAgICBwYWdlOiBudW1iZXIgPSAwLFxuICAgIHBhZ2VTaXplOiBudW1iZXIsXG4gICAgZ2xvYmFsU2VhcmNoPzogc3RyaW5nLFxuICAgIG91dHNpZGVGaWx0ZXI/OiBhbnksXG4gICk6IE9ic2VydmFibGU8eyByZXN1bHRzOiBUW107IHRvdGFsOiBudW1iZXIgfT4ge1xuICAgIGxldCByZXQ6IFRbXSA9IEhlbHBlcnMuZGVlcENsb25lKHRoaXMuZGF0YSk7XG4gICAgaWYgKHJldC5sZW5ndGggIT09IDApIHtcbiAgICAgIGlmIChnbG9iYWxTZWFyY2gpIHtcbiAgICAgICAgcmV0ID0gcmV0LmZpbHRlcigoaXRlbSkgPT4gT2JqZWN0LmtleXMoaXRlbSkuc29tZSgoa2V5KSA9PiBgJHtpdGVtW2tleV19YC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGdsb2JhbFNlYXJjaC50b0xvd2VyQ2FzZSgpKSkpO1xuICAgICAgfVxuICAgICAgaWYgKGZpbHRlcikge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IEhlbHBlcnMuaXNTdHJpbmcoZmlsdGVyLnZhbHVlKSA/IGZpbHRlci52YWx1ZS5yZXBsYWNlKC9bLiorP14ke30oKXxbXFxdXFxcXF0vZywgJ1xcXFwkJicpIDogZmlsdGVyLnZhbHVlO1xuICAgICAgICByZXQgPSByZXQuZmlsdGVyKEhlbHBlcnMuZmlsdGVyQnlGaWVsZChmaWx0ZXIuaWQsIHZhbHVlKSk7XG4gICAgICB9XG4gICAgICBpZiAoc29ydCkge1xuICAgICAgICByZXQgPSByZXQuc29ydChIZWxwZXJzLnNvcnRCeUZpZWxkKHNvcnQuaWQsIHNvcnQudmFsdWUgPT09ICdkZXNjJykpO1xuICAgICAgfVxuICAgICAgaWYgKCFIZWxwZXJzLmlzQmxhbmsocGFnZSkgJiYgIUhlbHBlcnMuaXNCbGFuayhwYWdlU2l6ZSkpIHtcbiAgICAgICAgcmV0ID0gcmV0LnNsaWNlKHBhZ2UgKiBwYWdlU2l6ZSwgKHBhZ2UgKyAxKSAqIHBhZ2VTaXplKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9mKHsgcmVzdWx0czogcmV0LCB0b3RhbDogdGhpcy5kYXRhLmxlbmd0aCB9KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQWN0aXZpdHlUYWJsZURhdGFTb3VyY2U8VD4gZXh0ZW5kcyBEYXRhU291cmNlPFQ+IHtcbiAgcHVibGljIHRvdGFsID0gMDtcbiAgcHVibGljIGN1cnJlbnQgPSAwO1xuICBwdWJsaWMgbG9hZGluZyA9IGZhbHNlO1xuICBwdWJsaWMgcHJpc3RpbmUgPSB0cnVlO1xuXG4gIGdldCB0b3RhbGx5RW1wdHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudG90YWwgPT09IDA7XG4gIH1cblxuICBnZXQgY3VycmVudGx5RW1wdHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudCA9PT0gMDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdGFibGVTZXJ2aWNlOiBBY3Rpdml0eVRhYmxlU2VydmljZTxUPiwgcHJpdmF0ZSBzdGF0ZTogTm92b0FjdGl2aXR5VGFibGVTdGF0ZSwgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBjb25uZWN0KCk6IE9ic2VydmFibGU8YW55W10+IHtcbiAgICBjb25zdCBkaXNwbGF5RGF0YUNoYW5nZXM6IGFueSA9IFt0aGlzLnN0YXRlLnVwZGF0ZXNdO1xuICAgIHJldHVybiBtZXJnZSguLi5kaXNwbGF5RGF0YUNoYW5nZXMpLnBpcGUoXG4gICAgICBzdGFydFdpdGgobnVsbCksXG4gICAgICBzd2l0Y2hNYXAoKCkgPT4ge1xuICAgICAgICB0aGlzLnByaXN0aW5lID0gZmFsc2U7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgIHJldHVybiB0aGlzLnRhYmxlU2VydmljZS5nZXRUYWJsZVJlc3VsdHMoXG4gICAgICAgICAgdGhpcy5zdGF0ZS5zb3J0LFxuICAgICAgICAgIHRoaXMuc3RhdGUuZmlsdGVyLFxuICAgICAgICAgIHRoaXMuc3RhdGUucGFnZSxcbiAgICAgICAgICB0aGlzLnN0YXRlLnBhZ2VTaXplLFxuICAgICAgICAgIHRoaXMuc3RhdGUuZ2xvYmFsU2VhcmNoLFxuICAgICAgICAgIHRoaXMuc3RhdGUub3V0c2lkZUZpbHRlcixcbiAgICAgICAgKTtcbiAgICAgIH0pLFxuICAgICAgbWFwKChkYXRhOiB7IHJlc3VsdHM6IFRbXTsgdG90YWw6IG51bWJlciB9KSA9PiB7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRvdGFsID0gZGF0YS50b3RhbDtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gZGF0YS5yZXN1bHRzLmxlbmd0aDtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZGF0YS5yZXN1bHRzO1xuICAgICAgfSksXG4gICAgICBjYXRjaEVycm9yKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTsgLy8gdHNsaW50OiBkaXNhYmxlLWxpbmVcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBvZihudWxsKTtcbiAgICAgIH0pLFxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgZGlzY29ubmVjdCgpOiB2b2lkIHt9XG59XG4iXX0=
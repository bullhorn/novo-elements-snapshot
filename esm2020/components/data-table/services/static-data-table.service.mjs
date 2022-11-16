import { of } from 'rxjs';
import { Helpers } from 'novo-elements/utils';
export class StaticDataTableService {
    constructor(currentData = []) {
        this.currentData = currentData;
        this.originalData = [...currentData];
    }
    getTableResults(sort, filter, page = 0, pageSize, globalSearch, outsideFilter, where) {
        this.currentData = [...this.originalData];
        let total = this.originalData.length;
        if (this.currentData.length !== 0) {
            if (globalSearch) {
                this.currentData = this.currentData.filter((item) => Object.keys(item).some((key) => `${item[key]}`.toLowerCase().includes(globalSearch.toLowerCase())));
                total = this.currentData.length;
            }
            if (filter) {
                this.currentData = this.filterData(this.currentData, filter);
                total = this.currentData.length;
            }
            if (sort) {
                this.currentData = this.currentData.sort(Helpers.sortByField(sort.id, sort.value === 'desc'));
                total = this.currentData.length;
            }
            if (!sort && !filter && !globalSearch && !outsideFilter) {
                this.currentData = [...this.originalData];
            }
            if (!Helpers.isBlank(page) && !Helpers.isBlank(pageSize)) {
                this.currentData = this.currentData.slice(page * pageSize, (page + 1) * pageSize);
            }
        }
        return of({ results: this.currentData, total });
    }
    filterData(currentData, filter) {
        const filters = Helpers.convertToArray(filter);
        filters.forEach((aFilter) => {
            if (Array.isArray(aFilter.value)) {
                const values = Helpers.convertToArray(aFilter.value).map(Helpers.escapeString);
                currentData = currentData.filter(Helpers.filterByField(aFilter.id, values));
            }
            else {
                const value = Helpers.escapeString(aFilter.value);
                currentData = currentData.filter(Helpers.filterByField(aFilter.id, value));
            }
        });
        return currentData;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLWRhdGEtdGFibGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvZGF0YS10YWJsZS9zZXJ2aWNlcy9zdGF0aWMtZGF0YS10YWJsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFdEMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRTlDLE1BQU0sT0FBTyxzQkFBc0I7SUFHakMsWUFBb0IsY0FBbUIsRUFBRTtRQUFyQixnQkFBVyxHQUFYLFdBQVcsQ0FBVTtRQUN2QyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRU0sZUFBZSxDQUNwQixJQUFvQixFQUNwQixNQUE2QyxFQUM3QyxPQUFlLENBQUMsRUFDaEIsUUFBZ0IsRUFDaEIsWUFBcUIsRUFDckIsYUFBbUIsRUFDbkIsS0FBb0M7UUFFcEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzFDLElBQUksS0FBSyxHQUFXLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO1FBQzdDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ2pDLElBQUksWUFBWSxFQUFFO2dCQUNoQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FDbEQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQ25HLENBQUM7Z0JBQ0YsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO2FBQ2pDO1lBQ0QsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQzdELEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQzthQUNqQztZQUNELElBQUksSUFBSSxFQUFFO2dCQUNSLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDOUYsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO2FBQ2pDO1lBQ0QsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDdkQsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQzNDO1lBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUN4RCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUM7YUFDbkY7U0FDRjtRQUNELE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRU0sVUFBVSxDQUFDLFdBQWdCLEVBQUUsTUFBNkM7UUFDL0UsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDMUIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDaEMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDL0UsV0FBVyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7YUFDN0U7aUJBQU07Z0JBQ0wsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2xELFdBQVcsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQzVFO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSURhdGFUYWJsZUZpbHRlciwgSURhdGFUYWJsZVNlcnZpY2UsIElEYXRhVGFibGVTb3J0IH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5cbmV4cG9ydCBjbGFzcyBTdGF0aWNEYXRhVGFibGVTZXJ2aWNlPFQ+IGltcGxlbWVudHMgSURhdGFUYWJsZVNlcnZpY2U8VD4ge1xuICBvcmlnaW5hbERhdGE6IFRbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGN1cnJlbnREYXRhOiBUW10gPSBbXSkge1xuICAgIHRoaXMub3JpZ2luYWxEYXRhID0gWy4uLmN1cnJlbnREYXRhXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRUYWJsZVJlc3VsdHMoXG4gICAgc29ydDogSURhdGFUYWJsZVNvcnQsXG4gICAgZmlsdGVyOiBJRGF0YVRhYmxlRmlsdGVyIHwgSURhdGFUYWJsZUZpbHRlcltdLFxuICAgIHBhZ2U6IG51bWJlciA9IDAsXG4gICAgcGFnZVNpemU6IG51bWJlcixcbiAgICBnbG9iYWxTZWFyY2g/OiBzdHJpbmcsXG4gICAgb3V0c2lkZUZpbHRlcj86IGFueSxcbiAgICB3aGVyZT86IHsgcXVlcnk6IHN0cmluZzsgZm9ybTogYW55IH0sXG4gICk6IE9ic2VydmFibGU8eyByZXN1bHRzOiBUW107IHRvdGFsOiBudW1iZXIgfT4ge1xuICAgIHRoaXMuY3VycmVudERhdGEgPSBbLi4udGhpcy5vcmlnaW5hbERhdGFdO1xuICAgIGxldCB0b3RhbDogbnVtYmVyID0gdGhpcy5vcmlnaW5hbERhdGEubGVuZ3RoO1xuICAgIGlmICh0aGlzLmN1cnJlbnREYXRhLmxlbmd0aCAhPT0gMCkge1xuICAgICAgaWYgKGdsb2JhbFNlYXJjaCkge1xuICAgICAgICB0aGlzLmN1cnJlbnREYXRhID0gdGhpcy5jdXJyZW50RGF0YS5maWx0ZXIoKGl0ZW0pID0+XG4gICAgICAgICAgT2JqZWN0LmtleXMoaXRlbSkuc29tZSgoa2V5KSA9PiBgJHtpdGVtW2tleV19YC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGdsb2JhbFNlYXJjaC50b0xvd2VyQ2FzZSgpKSksXG4gICAgICAgICk7XG4gICAgICAgIHRvdGFsID0gdGhpcy5jdXJyZW50RGF0YS5sZW5ndGg7XG4gICAgICB9XG4gICAgICBpZiAoZmlsdGVyKSB7XG4gICAgICAgIHRoaXMuY3VycmVudERhdGEgPSB0aGlzLmZpbHRlckRhdGEodGhpcy5jdXJyZW50RGF0YSwgZmlsdGVyKTtcbiAgICAgICAgdG90YWwgPSB0aGlzLmN1cnJlbnREYXRhLmxlbmd0aDtcbiAgICAgIH1cbiAgICAgIGlmIChzb3J0KSB7XG4gICAgICAgIHRoaXMuY3VycmVudERhdGEgPSB0aGlzLmN1cnJlbnREYXRhLnNvcnQoSGVscGVycy5zb3J0QnlGaWVsZChzb3J0LmlkLCBzb3J0LnZhbHVlID09PSAnZGVzYycpKTtcbiAgICAgICAgdG90YWwgPSB0aGlzLmN1cnJlbnREYXRhLmxlbmd0aDtcbiAgICAgIH1cbiAgICAgIGlmICghc29ydCAmJiAhZmlsdGVyICYmICFnbG9iYWxTZWFyY2ggJiYgIW91dHNpZGVGaWx0ZXIpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50RGF0YSA9IFsuLi50aGlzLm9yaWdpbmFsRGF0YV07XG4gICAgICB9XG4gICAgICBpZiAoIUhlbHBlcnMuaXNCbGFuayhwYWdlKSAmJiAhSGVscGVycy5pc0JsYW5rKHBhZ2VTaXplKSkge1xuICAgICAgICB0aGlzLmN1cnJlbnREYXRhID0gdGhpcy5jdXJyZW50RGF0YS5zbGljZShwYWdlICogcGFnZVNpemUsIChwYWdlICsgMSkgKiBwYWdlU2l6ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvZih7IHJlc3VsdHM6IHRoaXMuY3VycmVudERhdGEsIHRvdGFsIH0pO1xuICB9XG5cbiAgcHVibGljIGZpbHRlckRhdGEoY3VycmVudERhdGE6IFRbXSwgZmlsdGVyOiBJRGF0YVRhYmxlRmlsdGVyIHwgSURhdGFUYWJsZUZpbHRlcltdKTogVFtdIHtcbiAgICBjb25zdCBmaWx0ZXJzID0gSGVscGVycy5jb252ZXJ0VG9BcnJheShmaWx0ZXIpO1xuICAgIGZpbHRlcnMuZm9yRWFjaCgoYUZpbHRlcikgPT4ge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYUZpbHRlci52YWx1ZSkpIHtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gSGVscGVycy5jb252ZXJ0VG9BcnJheShhRmlsdGVyLnZhbHVlKS5tYXAoSGVscGVycy5lc2NhcGVTdHJpbmcpO1xuICAgICAgICBjdXJyZW50RGF0YSA9IGN1cnJlbnREYXRhLmZpbHRlcihIZWxwZXJzLmZpbHRlckJ5RmllbGQoYUZpbHRlci5pZCwgdmFsdWVzKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IEhlbHBlcnMuZXNjYXBlU3RyaW5nKGFGaWx0ZXIudmFsdWUpO1xuICAgICAgICBjdXJyZW50RGF0YSA9IGN1cnJlbnREYXRhLmZpbHRlcihIZWxwZXJzLmZpbHRlckJ5RmllbGQoYUZpbHRlci5pZCwgdmFsdWUpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gY3VycmVudERhdGE7XG4gIH1cbn1cbiJdfQ==
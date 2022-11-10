import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class IsoDateRangePipe {
    constructor() { }
    transform(dates) {
        // TODO: Lookup Locale to convert to Users DateFormat
        const [start, end] = dates.map((date) => {
            if (date instanceof Date) {
                return date.toISOString().slice(0, 10);
            }
            return date.slice(0, 10);
        });
        return `${start} - ${end}`;
    }
}
IsoDateRangePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: IsoDateRangePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
IsoDateRangePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: IsoDateRangePipe, name: "isoDateRange" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: IsoDateRangePipe, decorators: [{
            type: Pipe,
            args: [{ name: 'isoDateRange' }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNvLWRhdGUtcmFuZ2UucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL3BpcGVzL2lzbzg2MDEvaXNvLWRhdGUtcmFuZ2UucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7QUFLcEQsTUFBTSxPQUFPLGdCQUFnQjtJQUMzQixnQkFBZSxDQUFDO0lBQ2hCLFNBQVMsQ0FBQyxLQUF1QjtRQUMvQixxREFBcUQ7UUFDckQsTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDdEMsSUFBSSxJQUFJLFlBQVksSUFBSSxFQUFFO2dCQUN4QixPQUFPLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ3hDO1lBQ0QsT0FBUSxJQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sR0FBRyxLQUFLLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDN0IsQ0FBQzs7OEdBWlUsZ0JBQWdCOzRHQUFoQixnQkFBZ0I7NEZBQWhCLGdCQUFnQjtrQkFENUIsSUFBSTttQkFBQyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbnR5cGUgSXNvRGF0ZVJhbmdlQXJncyA9IChzdHJpbmcgfCBEYXRlKVtdO1xuXG5AUGlwZSh7IG5hbWU6ICdpc29EYXRlUmFuZ2UnIH0pXG5leHBvcnQgY2xhc3MgSXNvRGF0ZVJhbmdlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBjb25zdHJ1Y3RvcigpIHt9XG4gIHRyYW5zZm9ybShkYXRlczogSXNvRGF0ZVJhbmdlQXJncyk6IHN0cmluZyB7XG4gICAgLy8gVE9ETzogTG9va3VwIExvY2FsZSB0byBjb252ZXJ0IHRvIFVzZXJzIERhdGVGb3JtYXRcbiAgICBjb25zdCBbc3RhcnQsIGVuZF0gPSBkYXRlcy5tYXAoKGRhdGUpID0+IHtcbiAgICAgIGlmIChkYXRlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICByZXR1cm4gZGF0ZS50b0lTT1N0cmluZygpLnNsaWNlKDAsIDEwKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoZGF0ZSBhcyBzdHJpbmcpLnNsaWNlKDAsIDEwKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBgJHtzdGFydH0gLSAke2VuZH1gO1xuICB9XG59XG4iXX0=
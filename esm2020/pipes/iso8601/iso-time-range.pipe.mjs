import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class IsoTimeRangePipe {
    constructor() { }
    transform(dates) {
        // TODO: Lookup Locale to convert to 12hour
        const [start, end] = dates.map((date) => {
            if (date instanceof Date) {
                return date.toISOString().slice(11, 16);
            }
            return date.slice(11, 16);
        });
        return `${start} - ${end}`;
    }
}
IsoTimeRangePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: IsoTimeRangePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
IsoTimeRangePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: IsoTimeRangePipe, name: "isoTimeRange" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: IsoTimeRangePipe, decorators: [{
            type: Pipe,
            args: [{ name: 'isoTimeRange' }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNvLXRpbWUtcmFuZ2UucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL3BpcGVzL2lzbzg2MDEvaXNvLXRpbWUtcmFuZ2UucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7QUFLcEQsTUFBTSxPQUFPLGdCQUFnQjtJQUMzQixnQkFBZSxDQUFDO0lBQ2hCLFNBQVMsQ0FBQyxLQUF1QjtRQUMvQiwyQ0FBMkM7UUFDM0MsTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDdEMsSUFBSSxJQUFJLFlBQVksSUFBSSxFQUFFO2dCQUN4QixPQUFPLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ3pDO1lBQ0QsT0FBUSxJQUFlLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sR0FBRyxLQUFLLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDN0IsQ0FBQzs7NkdBWlUsZ0JBQWdCOzJHQUFoQixnQkFBZ0I7MkZBQWhCLGdCQUFnQjtrQkFENUIsSUFBSTttQkFBQyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbnR5cGUgSXNvVGltZVJhbmdlQXJncyA9IChzdHJpbmcgfCBEYXRlKVtdO1xuXG5AUGlwZSh7IG5hbWU6ICdpc29UaW1lUmFuZ2UnIH0pXG5leHBvcnQgY2xhc3MgSXNvVGltZVJhbmdlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBjb25zdHJ1Y3RvcigpIHt9XG4gIHRyYW5zZm9ybShkYXRlczogSXNvVGltZVJhbmdlQXJncyk6IHN0cmluZyB7XG4gICAgLy8gVE9ETzogTG9va3VwIExvY2FsZSB0byBjb252ZXJ0IHRvIDEyaG91clxuICAgIGNvbnN0IFtzdGFydCwgZW5kXSA9IGRhdGVzLm1hcCgoZGF0ZSkgPT4ge1xuICAgICAgaWYgKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiBkYXRlLnRvSVNPU3RyaW5nKCkuc2xpY2UoMTEsIDE2KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoZGF0ZSBhcyBzdHJpbmcpLnNsaWNlKDExLCAxNik7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gYCR7c3RhcnR9IC0gJHtlbmR9YDtcbiAgfVxufVxuIl19
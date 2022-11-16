import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class IsoTimePipe {
    constructor() { }
    transform(date) {
        // TODO: Lookup Locale to convert to 12hour
        if (date instanceof Date) {
            return date.toISOString().slice(11, 16);
        }
        return date.slice(11, 16);
    }
}
IsoTimePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: IsoTimePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
IsoTimePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: IsoTimePipe, name: "isoTime" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: IsoTimePipe, decorators: [{
            type: Pipe,
            args: [{ name: 'isoTime' }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNvLXRpbWUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL3BpcGVzL2lzbzg2MDEvaXNvLXRpbWUucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7QUFHcEQsTUFBTSxPQUFPLFdBQVc7SUFDdEIsZ0JBQWUsQ0FBQztJQUNoQixTQUFTLENBQUMsSUFBbUI7UUFDM0IsMkNBQTJDO1FBQzNDLElBQUksSUFBSSxZQUFZLElBQUksRUFBRTtZQUN4QixPQUFPLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3pDO1FBQ0QsT0FBUSxJQUFlLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN4QyxDQUFDOzt5R0FSVSxXQUFXO3VHQUFYLFdBQVc7NEZBQVgsV0FBVztrQkFEdkIsSUFBSTttQkFBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHsgbmFtZTogJ2lzb1RpbWUnIH0pXG5leHBvcnQgY2xhc3MgSXNvVGltZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgY29uc3RydWN0b3IoKSB7fVxuICB0cmFuc2Zvcm0oZGF0ZTogc3RyaW5nIHwgRGF0ZSk6IHN0cmluZyB7XG4gICAgLy8gVE9ETzogTG9va3VwIExvY2FsZSB0byBjb252ZXJ0IHRvIDEyaG91clxuICAgIGlmIChkYXRlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgcmV0dXJuIGRhdGUudG9JU09TdHJpbmcoKS5zbGljZSgxMSwgMTYpO1xuICAgIH1cbiAgICByZXR1cm4gKGRhdGUgYXMgc3RyaW5nKS5zbGljZSgxMSwgMTYpO1xuICB9XG59XG4iXX0=
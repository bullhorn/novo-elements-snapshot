import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class IsoDatePipe {
    constructor() { }
    transform(date) {
        if (date instanceof Date) {
            return date.toISOString().slice(0, 10);
        }
        return date.slice(0, 10);
    }
}
IsoDatePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: IsoDatePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
IsoDatePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: IsoDatePipe, name: "isoDate" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: IsoDatePipe, decorators: [{
            type: Pipe,
            args: [{ name: 'isoDate' }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNvLWRhdGUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL3BpcGVzL2lzbzg2MDEvaXNvLWRhdGUucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7QUFHcEQsTUFBTSxPQUFPLFdBQVc7SUFDdEIsZ0JBQWUsQ0FBQztJQUNoQixTQUFTLENBQUMsSUFBbUI7UUFDM0IsSUFBSSxJQUFJLFlBQVksSUFBSSxFQUFFO1lBQ3hCLE9BQU8sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDeEM7UUFDRCxPQUFRLElBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7O3lHQVBVLFdBQVc7dUdBQVgsV0FBVzs0RkFBWCxXQUFXO2tCQUR2QixJQUFJO21CQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoeyBuYW1lOiAnaXNvRGF0ZScgfSlcbmV4cG9ydCBjbGFzcyBJc29EYXRlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBjb25zdHJ1Y3RvcigpIHt9XG4gIHRyYW5zZm9ybShkYXRlOiBzdHJpbmcgfCBEYXRlKTogc3RyaW5nIHtcbiAgICBpZiAoZGF0ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgIHJldHVybiBkYXRlLnRvSVNPU3RyaW5nKCkuc2xpY2UoMCwgMTApO1xuICAgIH1cbiAgICByZXR1cm4gKGRhdGUgYXMgc3RyaW5nKS5zbGljZSgwLCAxMCk7XG4gIH1cbn1cbiJdfQ==
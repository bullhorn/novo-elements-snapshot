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
IsoTimePipe.ɵfac = function IsoTimePipe_Factory(t) { return new (t || IsoTimePipe)(); };
IsoTimePipe.ɵpipe = i0.ɵɵdefinePipe({ name: "isoTime", type: IsoTimePipe, pure: true });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(IsoTimePipe, [{
        type: Pipe,
        args: [{ name: 'isoTime' }]
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNvLXRpbWUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJwaXBlcy9pc284NjAxL2lzby10aW1lLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7O0FBR3BELE1BQU0sT0FBTyxXQUFXO0lBQ3RCLGdCQUFlLENBQUM7SUFDaEIsU0FBUyxDQUFDLElBQW1CO1FBQzNCLDJDQUEyQztRQUMzQyxJQUFJLElBQUksWUFBWSxJQUFJLEVBQUU7WUFDeEIsT0FBTyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUN6QztRQUNELE9BQVEsSUFBZSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDeEMsQ0FBQzs7c0VBUlUsV0FBVzs2REFBWCxXQUFXO2tEQUFYLFdBQVc7Y0FEdkIsSUFBSTtlQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoeyBuYW1lOiAnaXNvVGltZScgfSlcbmV4cG9ydCBjbGFzcyBJc29UaW1lUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBjb25zdHJ1Y3RvcigpIHt9XG4gIHRyYW5zZm9ybShkYXRlOiBzdHJpbmcgfCBEYXRlKTogc3RyaW5nIHtcbiAgICAvLyBUT0RPOiBMb29rdXAgTG9jYWxlIHRvIGNvbnZlcnQgdG8gMTJob3VyXG4gICAgaWYgKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICByZXR1cm4gZGF0ZS50b0lTT1N0cmluZygpLnNsaWNlKDExLCAxNik7XG4gICAgfVxuICAgIHJldHVybiAoZGF0ZSBhcyBzdHJpbmcpLnNsaWNlKDExLCAxNik7XG4gIH1cbn1cbiJdfQ==
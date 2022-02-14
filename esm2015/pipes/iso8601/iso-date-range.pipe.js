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
IsoDateRangePipe.ɵfac = function IsoDateRangePipe_Factory(t) { return new (t || IsoDateRangePipe)(); };
IsoDateRangePipe.ɵpipe = i0.ɵɵdefinePipe({ name: "isoDateRange", type: IsoDateRangePipe, pure: true });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(IsoDateRangePipe, [{
        type: Pipe,
        args: [{ name: 'isoDateRange' }]
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNvLWRhdGUtcmFuZ2UucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJwaXBlcy9pc284NjAxL2lzby1kYXRlLXJhbmdlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7O0FBS3BELE1BQU0sT0FBTyxnQkFBZ0I7SUFDM0IsZ0JBQWUsQ0FBQztJQUNoQixTQUFTLENBQUMsS0FBdUI7UUFDL0IscURBQXFEO1FBQ3JELE1BQU0sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3RDLElBQUksSUFBSSxZQUFZLElBQUksRUFBRTtnQkFDeEIsT0FBTyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQzthQUN4QztZQUNELE9BQVEsSUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLEdBQUcsS0FBSyxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQzdCLENBQUM7O2dGQVpVLGdCQUFnQjt1RUFBaEIsZ0JBQWdCO2tEQUFoQixnQkFBZ0I7Y0FENUIsSUFBSTtlQUFDLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxudHlwZSBJc29EYXRlUmFuZ2VBcmdzID0gKHN0cmluZyB8IERhdGUpW107XG5cbkBQaXBlKHsgbmFtZTogJ2lzb0RhdGVSYW5nZScgfSlcbmV4cG9ydCBjbGFzcyBJc29EYXRlUmFuZ2VQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIGNvbnN0cnVjdG9yKCkge31cbiAgdHJhbnNmb3JtKGRhdGVzOiBJc29EYXRlUmFuZ2VBcmdzKTogc3RyaW5nIHtcbiAgICAvLyBUT0RPOiBMb29rdXAgTG9jYWxlIHRvIGNvbnZlcnQgdG8gVXNlcnMgRGF0ZUZvcm1hdFxuICAgIGNvbnN0IFtzdGFydCwgZW5kXSA9IGRhdGVzLm1hcCgoZGF0ZSkgPT4ge1xuICAgICAgaWYgKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiBkYXRlLnRvSVNPU3RyaW5nKCkuc2xpY2UoMCwgMTApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChkYXRlIGFzIHN0cmluZykuc2xpY2UoMCwgMTApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGAke3N0YXJ0fSAtICR7ZW5kfWA7XG4gIH1cbn1cbiJdfQ==
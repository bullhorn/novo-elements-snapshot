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
IsoTimeRangePipe.ɵfac = function IsoTimeRangePipe_Factory(t) { return new (t || IsoTimeRangePipe)(); };
IsoTimeRangePipe.ɵpipe = i0.ɵɵdefinePipe({ name: "isoTimeRange", type: IsoTimeRangePipe, pure: true });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(IsoTimeRangePipe, [{
        type: Pipe,
        args: [{ name: 'isoTimeRange' }]
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNvLXRpbWUtcmFuZ2UucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJwaXBlcy9pc284NjAxL2lzby10aW1lLXJhbmdlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7O0FBS3BELE1BQU0sT0FBTyxnQkFBZ0I7SUFDM0IsZ0JBQWUsQ0FBQztJQUNoQixTQUFTLENBQUMsS0FBdUI7UUFDL0IsMkNBQTJDO1FBQzNDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3RDLElBQUksSUFBSSxZQUFZLElBQUksRUFBRTtnQkFDeEIsT0FBTyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQzthQUN6QztZQUNELE9BQVEsSUFBZSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLEdBQUcsS0FBSyxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQzdCLENBQUM7O2dGQVpVLGdCQUFnQjt1RUFBaEIsZ0JBQWdCO2tEQUFoQixnQkFBZ0I7Y0FENUIsSUFBSTtlQUFDLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxudHlwZSBJc29UaW1lUmFuZ2VBcmdzID0gKHN0cmluZyB8IERhdGUpW107XG5cbkBQaXBlKHsgbmFtZTogJ2lzb1RpbWVSYW5nZScgfSlcbmV4cG9ydCBjbGFzcyBJc29UaW1lUmFuZ2VQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIGNvbnN0cnVjdG9yKCkge31cbiAgdHJhbnNmb3JtKGRhdGVzOiBJc29UaW1lUmFuZ2VBcmdzKTogc3RyaW5nIHtcbiAgICAvLyBUT0RPOiBMb29rdXAgTG9jYWxlIHRvIGNvbnZlcnQgdG8gMTJob3VyXG4gICAgY29uc3QgW3N0YXJ0LCBlbmRdID0gZGF0ZXMubWFwKChkYXRlKSA9PiB7XG4gICAgICBpZiAoZGF0ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgcmV0dXJuIGRhdGUudG9JU09TdHJpbmcoKS5zbGljZSgxMSwgMTYpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChkYXRlIGFzIHN0cmluZykuc2xpY2UoMTEsIDE2KTtcbiAgICB9KTtcblxuICAgIHJldHVybiBgJHtzdGFydH0gLSAke2VuZH1gO1xuICB9XG59XG4iXX0=
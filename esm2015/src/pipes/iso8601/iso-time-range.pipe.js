import { Pipe } from '@angular/core';
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
IsoTimeRangePipe.decorators = [
    { type: Pipe, args: [{ name: 'isoTimeRange' },] }
];
IsoTimeRangePipe.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNvLXRpbWUtcmFuZ2UucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9waXBlcy9pc284NjAxL2lzby10aW1lLXJhbmdlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFLcEQsTUFBTSxPQUFPLGdCQUFnQjtJQUMzQixnQkFBZSxDQUFDO0lBQ2hCLFNBQVMsQ0FBQyxLQUF1QjtRQUMvQiwyQ0FBMkM7UUFDM0MsTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDdEMsSUFBSSxJQUFJLFlBQVksSUFBSSxFQUFFO2dCQUN4QixPQUFPLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ3pDO1lBQ0QsT0FBUSxJQUFlLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sR0FBRyxLQUFLLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDN0IsQ0FBQzs7O1lBYkYsSUFBSSxTQUFDLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxudHlwZSBJc29UaW1lUmFuZ2VBcmdzID0gKHN0cmluZyB8IERhdGUpW107XG5cbkBQaXBlKHsgbmFtZTogJ2lzb1RpbWVSYW5nZScgfSlcbmV4cG9ydCBjbGFzcyBJc29UaW1lUmFuZ2VQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIGNvbnN0cnVjdG9yKCkge31cbiAgdHJhbnNmb3JtKGRhdGVzOiBJc29UaW1lUmFuZ2VBcmdzKTogc3RyaW5nIHtcbiAgICAvLyBUT0RPOiBMb29rdXAgTG9jYWxlIHRvIGNvbnZlcnQgdG8gMTJob3VyXG4gICAgY29uc3QgW3N0YXJ0LCBlbmRdID0gZGF0ZXMubWFwKChkYXRlKSA9PiB7XG4gICAgICBpZiAoZGF0ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgcmV0dXJuIGRhdGUudG9JU09TdHJpbmcoKS5zbGljZSgxMSwgMTYpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChkYXRlIGFzIHN0cmluZykuc2xpY2UoMTEsIDE2KTtcbiAgICB9KTtcblxuICAgIHJldHVybiBgJHtzdGFydH0gLSAke2VuZH1gO1xuICB9XG59XG4iXX0=
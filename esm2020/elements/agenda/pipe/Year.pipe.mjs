import { Inject, LOCALE_ID, Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class YearPipe {
    constructor(locale = 'en-US') {
        this.locale = locale;
    }
    transform(date, locale = this.locale, method = 'numeric') {
        return new Intl.DateTimeFormat(locale, { year: method }).format(date);
    }
}
YearPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: YearPipe, deps: [{ token: LOCALE_ID }], target: i0.ɵɵFactoryTarget.Pipe });
YearPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: YearPipe, name: "year" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: YearPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'year' }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [LOCALE_ID]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWWVhci5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvYWdlbmRhL3BpcGUvWWVhci5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7O0FBR3ZFLE1BQU0sT0FBTyxRQUFRO0lBQ25CLFlBQXVDLFNBQWlCLE9BQU87UUFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7SUFBRyxDQUFDO0lBQ25FLFNBQVMsQ0FBQyxJQUFVLEVBQUUsU0FBaUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFnQyxTQUFTO1FBQzNGLE9BQU8sSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4RSxDQUFDOztzR0FKVSxRQUFRLGtCQUNDLFNBQVM7b0dBRGxCLFFBQVE7NEZBQVIsUUFBUTtrQkFEcEIsSUFBSTttQkFBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7OzBCQUVQLE1BQU07MkJBQUMsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgTE9DQUxFX0lELCBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHsgbmFtZTogJ3llYXInIH0pXG5leHBvcnQgY2xhc3MgWWVhclBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgY29uc3RydWN0b3IoQEluamVjdChMT0NBTEVfSUQpIHByaXZhdGUgbG9jYWxlOiBzdHJpbmcgPSAnZW4tVVMnKSB7fVxuICB0cmFuc2Zvcm0oZGF0ZTogRGF0ZSwgbG9jYWxlOiBzdHJpbmcgPSB0aGlzLmxvY2FsZSwgbWV0aG9kOiAnbnVtZXJpYycgfCAnMi1kaWdpdCcgPSAnbnVtZXJpYycpOiBzdHJpbmcge1xuICAgIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChsb2NhbGUsIHsgeWVhcjogbWV0aG9kIH0pLmZvcm1hdChkYXRlKTtcbiAgfVxufVxuIl19
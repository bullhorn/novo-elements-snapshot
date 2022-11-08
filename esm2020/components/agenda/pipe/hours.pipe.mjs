import { Inject, LOCALE_ID, Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class HoursPipe {
    constructor(locale = 'en-US') {
        this.locale = locale;
    }
    transform(date, locale = this.locale, method = 'numeric') {
        return new Intl.DateTimeFormat(locale, { hour: method }).format(date);
    }
}
HoursPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: HoursPipe, deps: [{ token: LOCALE_ID }], target: i0.ɵɵFactoryTarget.Pipe });
HoursPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: HoursPipe, name: "hours" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: HoursPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'hours' }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [LOCALE_ID]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG91cnMucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvYWdlbmRhL3BpcGUvaG91cnMucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQUd2RSxNQUFNLE9BQU8sU0FBUztJQUNwQixZQUF1QyxTQUFpQixPQUFPO1FBQXhCLFdBQU0sR0FBTixNQUFNLENBQWtCO0lBQUcsQ0FBQztJQUNuRSxTQUFTLENBQUMsSUFBVSxFQUFFLFNBQWlCLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBZ0MsU0FBUztRQUMzRixPQUFPLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEUsQ0FBQzs7dUdBSlUsU0FBUyxrQkFDQSxTQUFTO3FHQURsQixTQUFTOzRGQUFULFNBQVM7a0JBRHJCLElBQUk7bUJBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFOzswQkFFUixNQUFNOzJCQUFDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIExPQ0FMRV9JRCwgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7IG5hbWU6ICdob3VycycgfSlcbmV4cG9ydCBjbGFzcyBIb3Vyc1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgY29uc3RydWN0b3IoQEluamVjdChMT0NBTEVfSUQpIHByaXZhdGUgbG9jYWxlOiBzdHJpbmcgPSAnZW4tVVMnKSB7fVxuICB0cmFuc2Zvcm0oZGF0ZTogRGF0ZSwgbG9jYWxlOiBzdHJpbmcgPSB0aGlzLmxvY2FsZSwgbWV0aG9kOiAnbnVtZXJpYycgfCAnMi1kaWdpdCcgPSAnbnVtZXJpYycpOiBzdHJpbmcge1xuICAgIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChsb2NhbGUsIHsgaG91cjogbWV0aG9kIH0pLmZvcm1hdChkYXRlKTtcbiAgfVxufVxuIl19
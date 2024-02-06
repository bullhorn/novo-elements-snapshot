import { Inject, LOCALE_ID, Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class EndOfWeekDisplayPipe {
    constructor(locale = 'en-US') {
        this.locale = locale;
    }
    transform(endOfWeek, startOfWeek, locale = this.locale, method = 'short') {
        if (endOfWeek.getMonth() === startOfWeek.getMonth()) {
            return new Intl.DateTimeFormat(locale, { day: 'numeric' }).format(endOfWeek);
        }
        return new Intl.DateTimeFormat(locale, { month: method, day: 'numeric' }).format(endOfWeek);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: EndOfWeekDisplayPipe, deps: [{ token: LOCALE_ID }], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: EndOfWeekDisplayPipe, name: "endofweekdisplay" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: EndOfWeekDisplayPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'endofweekdisplay' }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [LOCALE_ID]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW5kT2ZXZWVrRGlzcGxheVBpcGUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2FnZW5kYS9waXBlL0VuZE9mV2Vla0Rpc3BsYXlQaXBlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7QUFHdkUsTUFBTSxPQUFPLG9CQUFvQjtJQUMvQixZQUF1QyxTQUFpQixPQUFPO1FBQXhCLFdBQU0sR0FBTixNQUFNLENBQWtCO0lBQUcsQ0FBQztJQUVuRSxTQUFTLENBQ1AsU0FBZSxFQUNmLFdBQWlCLEVBQ2pCLFNBQWlCLElBQUksQ0FBQyxNQUFNLEVBQzVCLFNBQThELE9BQU87UUFFckUsSUFBSSxTQUFTLENBQUMsUUFBUSxFQUFFLEtBQUssV0FBVyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ25ELE9BQU8sSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUM5RTtRQUVELE9BQU8sSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzlGLENBQUM7K0dBZFUsb0JBQW9CLGtCQUNYLFNBQVM7NkdBRGxCLG9CQUFvQjs7NEZBQXBCLG9CQUFvQjtrQkFEaEMsSUFBSTttQkFBQyxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRTs7MEJBRW5CLE1BQU07MkJBQUMsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgTE9DQUxFX0lELCBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHsgbmFtZTogJ2VuZG9md2Vla2Rpc3BsYXknIH0pXG5leHBvcnQgY2xhc3MgRW5kT2ZXZWVrRGlzcGxheVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgY29uc3RydWN0b3IoQEluamVjdChMT0NBTEVfSUQpIHByaXZhdGUgbG9jYWxlOiBzdHJpbmcgPSAnZW4tVVMnKSB7fVxuXG4gIHRyYW5zZm9ybShcbiAgICBlbmRPZldlZWs6IERhdGUsXG4gICAgc3RhcnRPZldlZWs6IERhdGUsXG4gICAgbG9jYWxlOiBzdHJpbmcgPSB0aGlzLmxvY2FsZSxcbiAgICBtZXRob2Q6ICdudW1lcmljJyB8ICcyLWRpZ2l0JyB8ICdsb25nJyB8ICdzaG9ydCcgfCAnbmFycm93JyA9ICdzaG9ydCcsXG4gICk6IFN0cmluZyB7XG4gICAgaWYgKGVuZE9mV2Vlay5nZXRNb250aCgpID09PSBzdGFydE9mV2Vlay5nZXRNb250aCgpKSB7XG4gICAgICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQobG9jYWxlLCB7IGRheTogJ251bWVyaWMnIH0pLmZvcm1hdChlbmRPZldlZWspO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChsb2NhbGUsIHsgbW9udGg6IG1ldGhvZCwgZGF5OiAnbnVtZXJpYycgfSkuZm9ybWF0KGVuZE9mV2Vlayk7XG4gIH1cbn1cbiJdfQ==
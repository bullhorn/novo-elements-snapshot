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
}
EndOfWeekDisplayPipe.ɵfac = function EndOfWeekDisplayPipe_Factory(t) { return new (t || EndOfWeekDisplayPipe)(i0.ɵɵdirectiveInject(LOCALE_ID)); };
EndOfWeekDisplayPipe.ɵpipe = i0.ɵɵdefinePipe({ name: "endofweekdisplay", type: EndOfWeekDisplayPipe, pure: true });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(EndOfWeekDisplayPipe, [{
        type: Pipe,
        args: [{ name: 'endofweekdisplay' }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [LOCALE_ID]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW5kT2ZXZWVrRGlzcGxheVBpcGUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9jYWxlbmRhci9waXBlL0VuZE9mV2Vla0Rpc3BsYXlQaXBlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7QUFHdkUsTUFBTSxPQUFPLG9CQUFvQjtJQUMvQixZQUF1QyxTQUFpQixPQUFPO1FBQXhCLFdBQU0sR0FBTixNQUFNLENBQWtCO0lBQUcsQ0FBQztJQUVuRSxTQUFTLENBQUMsU0FBZSxFQUFFLFdBQWlCLEVBQUUsU0FBaUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFpQixPQUFPO1FBQ2xHLElBQUksU0FBUyxDQUFDLFFBQVEsRUFBRSxLQUFLLFdBQVcsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNuRCxPQUFPLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDOUU7UUFFRCxPQUFPLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM5RixDQUFDOzt3RkFUVSxvQkFBb0IsdUJBQ1gsU0FBUzsrRUFEbEIsb0JBQW9CO2tEQUFwQixvQkFBb0I7Y0FEaEMsSUFBSTtlQUFDLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFOztzQkFFbkIsTUFBTTt1QkFBQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBMT0NBTEVfSUQsIFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoeyBuYW1lOiAnZW5kb2Z3ZWVrZGlzcGxheScgfSlcbmV4cG9ydCBjbGFzcyBFbmRPZldlZWtEaXNwbGF5UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KExPQ0FMRV9JRCkgcHJpdmF0ZSBsb2NhbGU6IHN0cmluZyA9ICdlbi1VUycpIHt9XG5cbiAgdHJhbnNmb3JtKGVuZE9mV2VlazogRGF0ZSwgc3RhcnRPZldlZWs6IERhdGUsIGxvY2FsZTogc3RyaW5nID0gdGhpcy5sb2NhbGUsIG1ldGhvZDogc3RyaW5nID0gJ3Nob3J0Jyk6IFN0cmluZyB7XG4gICAgaWYgKGVuZE9mV2Vlay5nZXRNb250aCgpID09PSBzdGFydE9mV2Vlay5nZXRNb250aCgpKSB7XG4gICAgICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQobG9jYWxlLCB7IGRheTogJ251bWVyaWMnIH0pLmZvcm1hdChlbmRPZldlZWspO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChsb2NhbGUsIHsgbW9udGg6IG1ldGhvZCwgZGF5OiAnbnVtZXJpYycgfSkuZm9ybWF0KGVuZE9mV2Vlayk7XG4gIH1cbn1cbiJdfQ==
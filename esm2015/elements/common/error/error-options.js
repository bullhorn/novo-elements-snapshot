import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/** Error state matcher that matches when a control is invalid and dirty. */
export class ShowOnDirtyErrorStateMatcher {
    isErrorState(control, form) {
        return !!(control && control.invalid && (control.dirty || (form && form.submitted)));
    }
}
ShowOnDirtyErrorStateMatcher.ɵfac = function ShowOnDirtyErrorStateMatcher_Factory(t) { return new (t || ShowOnDirtyErrorStateMatcher)(); };
ShowOnDirtyErrorStateMatcher.ɵprov = i0.ɵɵdefineInjectable({ token: ShowOnDirtyErrorStateMatcher, factory: ShowOnDirtyErrorStateMatcher.ɵfac });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ShowOnDirtyErrorStateMatcher, [{
        type: Injectable
    }], null, null); })();
/** Provider that defines how form controls behave with regards to displaying error messages. */
export class ErrorStateMatcher {
    isErrorState(control, form) {
        return !!(control && control.invalid && (control.touched || (form && form.submitted)));
    }
}
ErrorStateMatcher.ɵfac = function ErrorStateMatcher_Factory(t) { return new (t || ErrorStateMatcher)(); };
ErrorStateMatcher.ɵprov = i0.ɵɵdefineInjectable({ token: ErrorStateMatcher, factory: ErrorStateMatcher.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ErrorStateMatcher, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3Itb3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9jb21tb24vZXJyb3IvZXJyb3Itb3B0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUczQyw0RUFBNEU7QUFFNUUsTUFBTSxPQUFPLDRCQUE0QjtJQUN2QyxZQUFZLENBQUMsT0FBMkIsRUFBRSxJQUF3QztRQUNoRixPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7O3dHQUhVLDRCQUE0QjtvRUFBNUIsNEJBQTRCLFdBQTVCLDRCQUE0QjtrREFBNUIsNEJBQTRCO2NBRHhDLFVBQVU7O0FBT1gsZ0dBQWdHO0FBRWhHLE1BQU0sT0FBTyxpQkFBaUI7SUFDNUIsWUFBWSxDQUFDLE9BQTJCLEVBQUUsSUFBd0M7UUFDaEYsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RixDQUFDOztrRkFIVSxpQkFBaUI7eURBQWpCLGlCQUFpQixXQUFqQixpQkFBaUIsbUJBREosTUFBTTtrREFDbkIsaUJBQWlCO2NBRDdCLFVBQVU7ZUFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgRm9ybUdyb3VwRGlyZWN0aXZlLCBOZ0Zvcm0gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbi8qKiBFcnJvciBzdGF0ZSBtYXRjaGVyIHRoYXQgbWF0Y2hlcyB3aGVuIGEgY29udHJvbCBpcyBpbnZhbGlkIGFuZCBkaXJ0eS4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTaG93T25EaXJ0eUVycm9yU3RhdGVNYXRjaGVyIGltcGxlbWVudHMgRXJyb3JTdGF0ZU1hdGNoZXIge1xuICBpc0Vycm9yU3RhdGUoY29udHJvbDogRm9ybUNvbnRyb2wgfCBudWxsLCBmb3JtOiBGb3JtR3JvdXBEaXJlY3RpdmUgfCBOZ0Zvcm0gfCBudWxsKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhKGNvbnRyb2wgJiYgY29udHJvbC5pbnZhbGlkICYmIChjb250cm9sLmRpcnR5IHx8IChmb3JtICYmIGZvcm0uc3VibWl0dGVkKSkpO1xuICB9XG59XG5cbi8qKiBQcm92aWRlciB0aGF0IGRlZmluZXMgaG93IGZvcm0gY29udHJvbHMgYmVoYXZlIHdpdGggcmVnYXJkcyB0byBkaXNwbGF5aW5nIGVycm9yIG1lc3NhZ2VzLiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBFcnJvclN0YXRlTWF0Y2hlciB7XG4gIGlzRXJyb3JTdGF0ZShjb250cm9sOiBGb3JtQ29udHJvbCB8IG51bGwsIGZvcm06IEZvcm1Hcm91cERpcmVjdGl2ZSB8IE5nRm9ybSB8IG51bGwpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISEoY29udHJvbCAmJiBjb250cm9sLmludmFsaWQgJiYgKGNvbnRyb2wudG91Y2hlZCB8fCAoZm9ybSAmJiBmb3JtLnN1Ym1pdHRlZCkpKTtcbiAgfVxufVxuIl19
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
EndOfWeekDisplayPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: EndOfWeekDisplayPipe, deps: [{ token: LOCALE_ID }], target: i0.ɵɵFactoryTarget.Pipe });
EndOfWeekDisplayPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: EndOfWeekDisplayPipe, name: "endofweekdisplay" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: EndOfWeekDisplayPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'endofweekdisplay' }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [LOCALE_ID]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kLW9mLXdlZWstZGlzcGxheS1waXBlLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21wb25lbnRzL2FnZW5kYS9waXBlL2VuZC1vZi13ZWVrLWRpc3BsYXktcGlwZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7O0FBR3ZFLE1BQU0sT0FBTyxvQkFBb0I7SUFDL0IsWUFBdUMsU0FBaUIsT0FBTztRQUF4QixXQUFNLEdBQU4sTUFBTSxDQUFrQjtJQUFHLENBQUM7SUFFbkUsU0FBUyxDQUNQLFNBQWUsRUFDZixXQUFpQixFQUNqQixTQUFpQixJQUFJLENBQUMsTUFBTSxFQUM1QixTQUE4RCxPQUFPO1FBRXJFLElBQUksU0FBUyxDQUFDLFFBQVEsRUFBRSxLQUFLLFdBQVcsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNuRCxPQUFPLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDOUU7UUFFRCxPQUFPLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM5RixDQUFDOztrSEFkVSxvQkFBb0Isa0JBQ1gsU0FBUztnSEFEbEIsb0JBQW9COzRGQUFwQixvQkFBb0I7a0JBRGhDLElBQUk7bUJBQUMsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUU7OzBCQUVuQixNQUFNOzJCQUFDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIExPQ0FMRV9JRCwgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7IG5hbWU6ICdlbmRvZndlZWtkaXNwbGF5JyB9KVxuZXhwb3J0IGNsYXNzIEVuZE9mV2Vla0Rpc3BsYXlQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoTE9DQUxFX0lEKSBwcml2YXRlIGxvY2FsZTogc3RyaW5nID0gJ2VuLVVTJykge31cblxuICB0cmFuc2Zvcm0oXG4gICAgZW5kT2ZXZWVrOiBEYXRlLFxuICAgIHN0YXJ0T2ZXZWVrOiBEYXRlLFxuICAgIGxvY2FsZTogc3RyaW5nID0gdGhpcy5sb2NhbGUsXG4gICAgbWV0aG9kOiAnbnVtZXJpYycgfCAnMi1kaWdpdCcgfCAnbG9uZycgfCAnc2hvcnQnIHwgJ25hcnJvdycgPSAnc2hvcnQnLFxuICApOiBTdHJpbmcge1xuICAgIGlmIChlbmRPZldlZWsuZ2V0TW9udGgoKSA9PT0gc3RhcnRPZldlZWsuZ2V0TW9udGgoKSkge1xuICAgICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KGxvY2FsZSwgeyBkYXk6ICdudW1lcmljJyB9KS5mb3JtYXQoZW5kT2ZXZWVrKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQobG9jYWxlLCB7IG1vbnRoOiBtZXRob2QsIGRheTogJ251bWVyaWMnIH0pLmZvcm1hdChlbmRPZldlZWspO1xuICB9XG59XG4iXX0=
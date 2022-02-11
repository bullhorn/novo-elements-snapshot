import { Inject, LOCALE_ID, Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class WeekdayPipe {
    constructor(locale = 'en-US') {
        this.locale = locale;
    }
    transform(date, locale = this.locale, method = 'short') {
        return new Intl.DateTimeFormat(locale, { weekday: method }).format(date);
    }
}
WeekdayPipe.ɵfac = function WeekdayPipe_Factory(t) { return new (t || WeekdayPipe)(i0.ɵɵdirectiveInject(LOCALE_ID)); };
WeekdayPipe.ɵpipe = i0.ɵɵdefinePipe({ name: "weekday", type: WeekdayPipe, pure: true });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(WeekdayPipe, [{
        type: Pipe,
        args: [{ name: 'weekday' }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [LOCALE_ID]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2Vla2RheS5waXBlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2NhbGVuZGFyL3BpcGUvV2Vla2RheS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7O0FBR3ZFLE1BQU0sT0FBTyxXQUFXO0lBQ3RCLFlBQXVDLFNBQWlCLE9BQU87UUFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7SUFBRyxDQUFDO0lBQ25FLFNBQVMsQ0FBQyxJQUFVLEVBQUUsU0FBaUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFpQixPQUFPO1FBQzFFLE9BQU8sSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzRSxDQUFDOztzRUFKVSxXQUFXLHVCQUNGLFNBQVM7NkRBRGxCLFdBQVc7a0RBQVgsV0FBVztjQUR2QixJQUFJO2VBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFOztzQkFFVixNQUFNO3VCQUFDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIExPQ0FMRV9JRCwgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7IG5hbWU6ICd3ZWVrZGF5JyB9KVxuZXhwb3J0IGNsYXNzIFdlZWtkYXlQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoTE9DQUxFX0lEKSBwcml2YXRlIGxvY2FsZTogc3RyaW5nID0gJ2VuLVVTJykge31cbiAgdHJhbnNmb3JtKGRhdGU6IERhdGUsIGxvY2FsZTogc3RyaW5nID0gdGhpcy5sb2NhbGUsIG1ldGhvZDogc3RyaW5nID0gJ3Nob3J0Jyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KGxvY2FsZSwgeyB3ZWVrZGF5OiBtZXRob2QgfSkuZm9ybWF0KGRhdGUpO1xuICB9XG59XG4iXX0=
// NG2
import { Injectable, Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class DefaultPipe {
    transform(value, defaultValue) {
        return value || defaultValue;
    }
}
DefaultPipe.ɵfac = function DefaultPipe_Factory(t) { return new (t || DefaultPipe)(); };
DefaultPipe.ɵpipe = i0.ɵɵdefinePipe({ name: "default", type: DefaultPipe, pure: true });
DefaultPipe.ɵprov = i0.ɵɵdefineInjectable({ token: DefaultPipe, factory: DefaultPipe.ɵfac });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(DefaultPipe, [{
        type: Pipe,
        args: [{ name: 'default', pure: true }]
    }, {
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVmYXVsdC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJwaXBlcy9kZWZhdWx0L0RlZmF1bHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7QUFJaEUsTUFBTSxPQUFPLFdBQVc7SUFDdEIsU0FBUyxDQUFDLEtBQVUsRUFBRSxZQUFpQjtRQUNyQyxPQUFPLEtBQUssSUFBSSxZQUFZLENBQUM7SUFDL0IsQ0FBQzs7c0VBSFUsV0FBVzs2REFBWCxXQUFXO21EQUFYLFdBQVcsV0FBWCxXQUFXO2tEQUFYLFdBQVc7Y0FGdkIsSUFBSTtlQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFOztjQUNwQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHsgbmFtZTogJ2RlZmF1bHQnLCBwdXJlOiB0cnVlIH0pXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGVmYXVsdFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIGRlZmF1bHRWYWx1ZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gdmFsdWUgfHwgZGVmYXVsdFZhbHVlO1xuICB9XG59XG4iXX0=
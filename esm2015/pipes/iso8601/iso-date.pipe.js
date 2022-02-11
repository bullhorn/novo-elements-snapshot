import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class IsoDatePipe {
    constructor() { }
    transform(date) {
        if (date instanceof Date) {
            return date.toISOString().slice(0, 10);
        }
        return date.slice(0, 10);
    }
}
IsoDatePipe.ɵfac = function IsoDatePipe_Factory(t) { return new (t || IsoDatePipe)(); };
IsoDatePipe.ɵpipe = i0.ɵɵdefinePipe({ name: "isoDate", type: IsoDatePipe, pure: true });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(IsoDatePipe, [{
        type: Pipe,
        args: [{ name: 'isoDate' }]
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNvLWRhdGUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJwaXBlcy9pc284NjAxL2lzby1kYXRlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7O0FBR3BELE1BQU0sT0FBTyxXQUFXO0lBQ3RCLGdCQUFlLENBQUM7SUFDaEIsU0FBUyxDQUFDLElBQW1CO1FBQzNCLElBQUksSUFBSSxZQUFZLElBQUksRUFBRTtZQUN4QixPQUFPLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3hDO1FBQ0QsT0FBUSxJQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN2QyxDQUFDOztzRUFQVSxXQUFXOzZEQUFYLFdBQVc7a0RBQVgsV0FBVztjQUR2QixJQUFJO2VBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7IG5hbWU6ICdpc29EYXRlJyB9KVxuZXhwb3J0IGNsYXNzIElzb0RhdGVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIGNvbnN0cnVjdG9yKCkge31cbiAgdHJhbnNmb3JtKGRhdGU6IHN0cmluZyB8IERhdGUpOiBzdHJpbmcge1xuICAgIGlmIChkYXRlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgcmV0dXJuIGRhdGUudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxMCk7XG4gICAgfVxuICAgIHJldHVybiAoZGF0ZSBhcyBzdHJpbmcpLnNsaWNlKDAsIDEwKTtcbiAgfVxufVxuIl19